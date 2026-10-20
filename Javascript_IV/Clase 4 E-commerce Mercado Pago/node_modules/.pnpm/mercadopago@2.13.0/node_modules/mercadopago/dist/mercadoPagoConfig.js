"use strict";
/**
 * SDK configuration module.
 *
 * Holds the {@link MercadoPagoConfig} class, which every API client
 * requires as its constructor argument. It stores the OAuth access token
 * and optional request-level settings (timeout, idempotency, platform IDs, etc.).
 *
 * @module mercadoPagoConfig
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MercadoPagoConfig = void 0;
/**
 * Central configuration object for the MercadoPago Node.js SDK.
 *
 * Every API client (Payment, Order, Customer, etc.) receives an instance
 * of this class and reads the access token and request options from it.
 *
 * ```ts
 * const config = new MercadoPagoConfig({
 *   accessToken: 'APP_USR-...',
 *   options: { timeout: 5000, idempotencyKey: 'unique-key' },
 * });
 * const payment = new Payment(config);
 * ```
 *
 * @see {@link https://github.com/mercadopago/sdk-nodejs Documentation}
 */
class MercadoPagoConfig {
    /**
     * Creates a new SDK configuration.
     *
     * @param config - Access token and optional global request settings.
     */
    constructor(config) {
        this.accessToken = config.accessToken;
        this.options = config.options;
    }
}
exports.MercadoPagoConfig = MercadoPagoConfig;
