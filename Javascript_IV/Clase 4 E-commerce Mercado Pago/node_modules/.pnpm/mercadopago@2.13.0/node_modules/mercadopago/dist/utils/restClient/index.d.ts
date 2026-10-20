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
import { RequestInit } from 'node-fetch';
import type { Options } from '../../types';
/**
 * Merged configuration for a single REST call.
 *
 * Combines the global SDK {@link Options} with per-request overrides
 * such as query parameters and retry count.
 */
interface RestClientConfig extends Options {
    /** Key-value pairs appended to the URL as query-string parameters. */
    queryParams?: Record<string, string | number>;
    /** Number of retry attempts for HTTP 5xx errors (default: {@link AppConfig.DEFAULT_RETRIES}). */
    retries?: number;
}
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
declare class RestClient {
    /** Generates a UUID v4 idempotency key for write operations. */
    private static generateIdempotencyKey;
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
    static appendQueryParamsToUrl(url: string, queryParams?: Record<string, string | number>): string;
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
    private static retryWithExponentialBackoff;
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
    static fetch<T>(endpoint: string, config?: RestClientConfig & RequestInit): Promise<T>;
}
export { RestClient };
