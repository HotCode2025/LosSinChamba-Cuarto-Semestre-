"use strict";
/**
 * Low-level HTTP client used by every API operation in the SDK.
 *
 * Wraps `node-fetch` and adds:
 * - Automatic header injection (auth, tracking, idempotency).
 * - Query-string serialisation.
 * - Exponential back-off retry for transient server errors (HTTP 5xx).
 * - Standard response envelope (`api_response`) appended to every result.
 *
 * No API client calls `fetch` directly — they all delegate to
 * {@link RestClient.fetch}.
 *
 * @module utils/restClient
 */
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestClient = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const config_1 = require("../config");
const uuid_1 = require("uuid");
/** HTTP 204 — the server processed the request but returns no body. */
const NO_CONTENT = 204;
/**
 * Static HTTP client — every SDK operation delegates to {@link RestClient.fetch}.
 *
 * Responsibilities:
 * 1. Build the full URL (base + endpoint + query string).
 * 2. Inject mandatory and optional HTTP headers.
 * 3. Add an idempotency key for non-GET methods.
 * 4. Execute the request with retry + exponential back-off.
 * 5. Normalise the response into `{ ...payload, api_response }`.
 */
class RestClient {
    /** Generates a UUID v4 idempotency key for write operations. */
    static generateIdempotencyKey() {
        return (0, uuid_1.v4)();
    }
    /**
     * Appends query-string parameters to a URL.
     *
     * Skips `undefined` values so callers don't need to pre-filter.
     * Handles URLs that already contain a `?` by appending with `&`.
     *
     * @param url - Base URL (may already include a query string).
     * @param queryParams - Key-value pairs to append.
     * @returns The URL with the encoded query string.
     */
    static appendQueryParamsToUrl(url, queryParams) {
        if (!queryParams)
            return url;
        const searchParams = new URLSearchParams();
        for (const key in queryParams) {
            if (Object.prototype.hasOwnProperty.call(queryParams, key) && typeof queryParams[key] !== 'undefined') {
                searchParams.append(key, queryParams[key].toString());
            }
        }
        return url.includes('?') ? `${url}&${searchParams.toString()}` : `${url}?${searchParams.toString()}`;
    }
    /**
     * Executes a function with exponential back-off on failure.
     *
     * Retries only when the error has an HTTP status >= 500 (server error).
     * Client errors (4xx) are thrown immediately.
     * The delay doubles on each attempt: `BASE_DELAY_MS * 2^attempt`.
     *
     * @typeParam T - Return type of the wrapped function.
     * @param fn - The async operation to execute and potentially retry.
     * @param retries - Maximum number of attempts before giving up.
     */
    static async retryWithExponentialBackoff(fn, retries) {
        let attempt = 1;
        const execute = async () => {
            try {
                return await fn();
            }
            catch (error) {
                if (attempt >= retries || (error.status < 500)) {
                    throw error;
                }
                const delayMs = config_1.AppConfig.BASE_DELAY_MS * 2 ** attempt;
                await new Promise((resolve) => setTimeout(resolve, delayMs));
                attempt++;
                return execute();
            }
        };
        return execute();
    }
    /**
     * Performs an HTTP request against the MercadoPago API.
     *
     * This is the single exit point for all network I/O in the SDK.
     * It merges SDK defaults with caller-provided overrides, injects
     * required headers, and normalises the JSON response.
     *
     * - **204 No Content** → returns `{ api_response }` with no body.
     * - **2xx with body** → returns the parsed JSON with `api_response` appended.
     * - **Non-2xx** → throws the parsed error body.
     *
     * @typeParam T - Expected shape of the parsed JSON response.
     * @param endpoint - API path relative to the base URL (e.g. `/v1/payments`).
     * @param config - Merged request settings (headers, body, method, options, etc.).
     * @returns Parsed API response with an `api_response` envelope.
     */
    static async fetch(endpoint, config) {
        const _a = config || {}, { timeout = config_1.AppConfig.DEFAULT_TIMEOUT, idempotencyKey = RestClient.generateIdempotencyKey(), queryParams, method = 'GET', retries = config_1.AppConfig.DEFAULT_RETRIES, corporationId, integratorId, platformId, meliSessionId, expandResponseNodes, cardValidation, testToken } = _a, customConfig = __rest(_a, ["timeout", "idempotencyKey", "queryParams", "method", "retries", "corporationId", "integratorId", "platformId", "meliSessionId", "expandResponseNodes", "cardValidation", "testToken"]);
        const url = RestClient.appendQueryParamsToUrl(`${config_1.AppConfig.BASE_URL}${endpoint}`, queryParams);
        customConfig.headers = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, customConfig.headers), { [config_1.AppConfig.Headers.CONTENT_TYPE]: 'application/json', [config_1.AppConfig.Headers.PRODUCT_ID]: config_1.AppConfig.PRODUCT_ID, [config_1.AppConfig.Headers.TRACKING_ID]: config_1.AppConfig.getTrackingId(), [config_1.AppConfig.Headers.USER_AGENT]: config_1.AppConfig.getUserAgent() }), (corporationId ? { [config_1.AppConfig.Headers.CORPORATION_ID]: corporationId } : {})), (integratorId ? { [config_1.AppConfig.Headers.INTEGRATOR_ID]: integratorId } : {})), (platformId ? { [config_1.AppConfig.Headers.PLATFORM_ID]: platformId } : {})), (meliSessionId ? { [config_1.AppConfig.Headers.MELI_SESSION_ID]: meliSessionId } : {})), (expandResponseNodes ? { [config_1.AppConfig.Headers.EXPAND_RESPONDE_NODES]: expandResponseNodes } : {})), (cardValidation ? { [config_1.AppConfig.Headers.CARD_VALIDATION]: cardValidation } : {})), (testToken ? { [config_1.AppConfig.Headers.TEST_TOKEN]: testToken.toString() } : {}));
        if (method && method !== 'GET') {
            customConfig.headers = Object.assign(Object.assign({}, customConfig.headers), { [config_1.AppConfig.Headers.IDEMPOTENCY_KEY]: idempotencyKey });
        }
        let response;
        const fetchFn = async () => {
            response = await (0, node_fetch_1.default)(url, Object.assign(Object.assign({}, customConfig), { method,
                timeout }));
            if (response.ok) {
                if (response.status === NO_CONTENT) {
                    return {
                        api_response: {
                            status: response.status,
                            headers: response.headers.raw(),
                        }
                    };
                }
                const data = await response.json();
                const api_response = {
                    status: response.status,
                    headers: response.headers.raw(),
                };
                data.api_response = api_response;
                return data;
            }
            else {
                throw await response.json();
            }
        };
        return await RestClient.retryWithExponentialBackoff(fetchFn, retries);
    }
}
exports.RestClient = RestClient;
