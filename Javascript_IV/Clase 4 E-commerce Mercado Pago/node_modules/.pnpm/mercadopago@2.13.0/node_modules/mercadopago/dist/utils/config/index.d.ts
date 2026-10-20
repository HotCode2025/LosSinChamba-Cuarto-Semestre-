/**
 * SDK-wide application configuration and HTTP header constants.
 *
 * Centralises every hard-coded value the SDK needs at runtime:
 * base URL, timeouts, retry policy, product/tracking identifiers,
 * and the standard header names required by the MercadoPago API.
 *
 * @module utils/config
 */
/**
 * Static configuration class consumed by {@link RestClient}.
 *
 * All members are static because the SDK is stateless — there is no
 * per-instance runtime that needs its own copy of these values.
 */
export declare class AppConfig {
    /** Default HTTP timeout in milliseconds applied when no override is provided. */
    static readonly DEFAULT_TIMEOUT = 10000;
    /** Default number of retry attempts for server errors (HTTP 5xx). */
    static readonly DEFAULT_RETRIES = 2;
    /** Base delay in milliseconds for exponential back-off between retries. */
    static readonly BASE_DELAY_MS = 1000;
    /** Root URL for all MercadoPago REST API calls. */
    static readonly BASE_URL = "https://api.mercadopago.com";
    /** Internal MercadoPago product identifier used for telemetry. */
    static readonly PRODUCT_ID = "bc32b6ntrpp001u8nhkg";
    /**
     * Current SDK version string.
     *
     * Embedded into the `User-Agent` and `X-Tracking-Id` headers so the
     * API can attribute traffic to a specific SDK release.
     */
    static SDK_VERSION: string;
    /**
     * Canonical HTTP header names used in every request to the MercadoPago API.
     *
     * Keeping them in one place prevents typos and makes it easy to audit
     * which custom headers the SDK sends.
     */
    static readonly Headers: {
        AUTHORIZATION: string;
        CONTENT_TYPE: string;
        USER_AGENT: string;
        /** Ensures write operations are executed at most once. */
        IDEMPOTENCY_KEY: string;
        /** Internal MercadoPago product identifier for telemetry. */
        PRODUCT_ID: string;
        /** SDK + Node.js version string for server-side analytics. */
        TRACKING_ID: string;
        /** Corporation identifier for multi-account setups. */
        CORPORATION_ID: string;
        /** Certified integrator identifier. */
        INTEGRATOR_ID: string;
        /** Platform identifier assigned by MercadoPago. */
        PLATFORM_ID: string;
        /** MELI session identifier for session-level tracking. */
        MELI_SESSION_ID: string;
        /** Comma-separated response nodes to expand. */
        EXPAND_RESPONDE_NODES: string;
        /** Card validation mode header. */
        CARD_VALIDATION: string;
        /** Signals the API to treat the request as a test transaction. */
        TEST_TOKEN: string;
    };
    /** Returns the running Node.js version (e.g. `v18.17.0`). */
    static getNodeVersion(): string;
    /** Returns the CPU architecture (e.g. `x64`, `arm64`). */
    static getNodeArchitecture(): string;
    /** Returns the operating system platform (e.g. `darwin`, `linux`). */
    static getNodePlatform(): string;
    /**
     * Builds the `X-Tracking-Id` header value.
     *
     * Encodes the Node.js major version, full version, and SDK version
     * so the API team can correlate requests with specific environments.
     */
    static getTrackingId(): string;
    /**
     * Builds the `User-Agent` header value.
     *
     * Follows the pattern:
     * `MercadoPago Node.js SDK v{SDK_VERSION} (node {version}-{arch}-{platform})`
     */
    static getUserAgent(): string;
}
