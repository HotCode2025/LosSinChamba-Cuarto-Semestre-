"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookSignatureValidator = exports.InvalidWebhookSignatureError = exports.SignatureFailureReason = void 0;
const crypto = __importStar(require("crypto"));
/**
 * MercadoPago webhook signature validator.
 *
 * Verifies the authenticity of incoming webhook notifications by recomputing
 * the HMAC-SHA256 signature locally and comparing it against the value carried
 * in the `x-signature` header. The implementation is stateless, performs no
 * outbound HTTP calls, and does not depend on `MercadoPagoConfig` — the
 * integrator passes the secret signature explicitly on every call.
 *
 * @module utils/webhook
 */
/**
 * Enumerates the reasons why {@link WebhookSignatureValidator} may reject a
 * MercadoPago webhook notification.
 *
 * Each value maps to a specific failure mode in the signature verification flow.
 * Integrators are encouraged to log this value alongside the
 * `x-request-id` for correlation against the MercadoPago notifications dashboard.
 */
var SignatureFailureReason;
(function (SignatureFailureReason) {
    /** The `x-signature` header was missing, empty, or whitespace. */
    SignatureFailureReason["MissingSignatureHeader"] = "MissingSignatureHeader";
    /**
     * The `x-signature` header did not match the expected `ts=...,vN=...`
     * format and could not be parsed.
     */
    SignatureFailureReason["MalformedSignatureHeader"] = "MalformedSignatureHeader";
    /** The header parsed correctly but no `ts=` component was present. */
    SignatureFailureReason["MissingTimestamp"] = "MissingTimestamp";
    /**
     * The header did not include a hash for any of the versions listed in
     * `supportedVersions`. Typically indicates that MercadoPago has migrated to
     * a new signature version (e.g. `v2`) and the SDK needs to be upgraded.
     */
    SignatureFailureReason["MissingHash"] = "MissingHash";
    /**
     * The HMAC computed locally did not match the hash provided in the header.
     * Most often caused by an incorrect secret signature or by a forged request.
     */
    SignatureFailureReason["SignatureMismatch"] = "SignatureMismatch";
    /**
     * The header timestamp was outside the configured `tolerance` window
     * against the current clock. May indicate clock drift on the integrator's
     * server or a replay attack.
     */
    SignatureFailureReason["TimestampOutOfTolerance"] = "TimestampOutOfTolerance";
})(SignatureFailureReason || (exports.SignatureFailureReason = SignatureFailureReason = {}));
/**
 * Error thrown by {@link WebhookSignatureValidator.validate} when a webhook
 * notification cannot be confirmed as originating from MercadoPago.
 *
 * The instance carries enough context to support structured logging without
 * exposing internal details in the HTTP response.
 */
class InvalidWebhookSignatureError extends Error {
    constructor(reason, requestId, timestamp) {
        super(`Invalid webhook signature: ${reason}`);
        this.name = 'InvalidWebhookSignatureError';
        this.reason = reason;
        this.requestId = requestId;
        this.timestamp = timestamp;
        Object.setPrototypeOf(this, InvalidWebhookSignatureError.prototype);
    }
}
exports.InvalidWebhookSignatureError = InvalidWebhookSignatureError;
const DEFAULT_VERSIONS = ['v1'];
const VERSION_KEY_REGEX = /^v\d+$/;
/**
 * Stateless utility that validates the signature of a MercadoPago webhook.
 *
 * On failure it throws {@link InvalidWebhookSignatureError}; on success it
 * returns nothing. The comparison is performed in constant time to mitigate
 * timing attacks.
 *
 * QR Code notifications are **not signed** by MercadoPago — do not call this
 * validator for those events; they will always fail signature verification.
 */
class WebhookSignatureValidator {
    /**
     * Validates the signature of a MercadoPago webhook notification.
     *
     * @param options - Validation inputs (see {@link ValidateOptions}).
     * @throws {@link InvalidWebhookSignatureError} when the signature is missing,
     *   malformed, or does not match the expected HMAC.
     */
    static validate(options) {
        var _a, _b;
        const xSignature = normalise(options.xSignature);
        const xRequestId = normalise(options.xRequestId);
        const dataId = normalise(options.dataId);
        const secret = options.secret;
        const supportedVersions = (_a = options.supportedVersions) !== null && _a !== void 0 ? _a : DEFAULT_VERSIONS;
        const toleranceSeconds = options.toleranceSeconds;
        const now = (_b = options.now) !== null && _b !== void 0 ? _b : (() => Date.now());
        if (!xSignature) {
            throw new InvalidWebhookSignatureError(SignatureFailureReason.MissingSignatureHeader, xRequestId);
        }
        const { ts, hashes } = parseSignatureHeader(xSignature);
        if (!ts && Object.keys(hashes).length === 0) {
            throw new InvalidWebhookSignatureError(SignatureFailureReason.MalformedSignatureHeader, xRequestId);
        }
        if (!ts) {
            throw new InvalidWebhookSignatureError(SignatureFailureReason.MissingTimestamp, xRequestId);
        }
        if (!/^\d+$/.test(ts)) {
            throw new InvalidWebhookSignatureError(SignatureFailureReason.MalformedSignatureHeader, xRequestId, ts);
        }
        let receivedHash;
        for (const version of supportedVersions) {
            if (hashes[version]) {
                receivedHash = hashes[version];
                break;
            }
        }
        if (!receivedHash) {
            throw new InvalidWebhookSignatureError(SignatureFailureReason.MissingHash, xRequestId, ts);
        }
        const manifest = buildManifest(dataId, xRequestId, ts);
        const computedHash = crypto.createHmac('sha256', secret).update(manifest).digest('hex');
        if (!constantTimeEquals(computedHash, receivedHash)) {
            throw new InvalidWebhookSignatureError(SignatureFailureReason.SignatureMismatch, xRequestId, ts);
        }
        if (toleranceSeconds !== undefined) {
            const tsMs = Number(ts);
            const driftSeconds = Math.abs(now() - tsMs) / 1000;
            if (driftSeconds > toleranceSeconds) {
                throw new InvalidWebhookSignatureError(SignatureFailureReason.TimestampOutOfTolerance, xRequestId, ts);
            }
        }
    }
}
exports.WebhookSignatureValidator = WebhookSignatureValidator;
/**
 * Coerces a header/query value (which may be string, array, null, or undefined)
 * into a trimmed non-empty string, or `undefined` when the value is missing.
 */
function normalise(value) {
    if (value === undefined || value === null)
        return undefined;
    const raw = Array.isArray(value) ? value[0] : value;
    if (raw === undefined || raw === null)
        return undefined;
    const trimmed = String(raw).trim();
    return trimmed.length > 0 ? trimmed : undefined;
}
/**
 * Parses the `x-signature` header into its `ts` and `vN` components.
 * Unknown keys are silently ignored.
 */
function parseSignatureHeader(header) {
    const hashes = {};
    let ts;
    for (const part of header.split(',')) {
        const eq = part.indexOf('=');
        if (eq === -1)
            continue;
        const key = part.substring(0, eq).trim().toLowerCase();
        const value = part.substring(eq + 1).trim();
        if (!key || !value)
            continue;
        if (key === 'ts') {
            ts = value;
        }
        else if (VERSION_KEY_REGEX.test(key)) {
            hashes[key] = value;
        }
    }
    return { ts, hashes };
}
/**
 * Builds the manifest string that will be fed into the HMAC.
 * Pairs whose value is missing are omitted, per the documented rule.
 */
function buildManifest(dataId, requestId, ts) {
    const parts = [];
    if (dataId)
        parts.push(`id:${dataId.toLowerCase()}`);
    if (requestId)
        parts.push(`request-id:${requestId}`);
    parts.push(`ts:${ts}`);
    return parts.join(';') + ';';
}
/**
 * Constant-time hex-string comparison. Returns `false` (without divulging
 * lengths via timing) when the strings differ in length.
 */
function constantTimeEquals(a, b) {
    if (a.length !== b.length)
        return false;
    return crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));
}
