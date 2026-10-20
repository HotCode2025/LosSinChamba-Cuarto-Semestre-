"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = void 0;
/**
 * Payment API client -- facade for the MercadoPago Payments v1 endpoints.
 *
 * Provides high-level methods to create, retrieve, search, capture, and
 * cancel payments.  Each method delegates to a dedicated operation module
 * that calls the underlying {@link RestClient}.
 *
 * @module clients/payment
 * @see {@link https://www.mercadopago.com/developers/en/reference/online-payments/checkout-api-payments/create-payment/post Payments API reference}
 */
const capture_1 = __importDefault(require("./capture"));
const search_1 = __importDefault(require("./search"));
const cancel_1 = __importDefault(require("./cancel"));
const create_1 = __importDefault(require("./create"));
const get_1 = __importDefault(require("./get"));
/**
 * Client that exposes every operation available on the MercadoPago Payments API.
 *
 * Instantiate with a {@link MercadoPagoConfig} that holds the access token and
 * optional global request settings.  Per-call `requestOptions` are merged on
 * top of the global configuration for each request.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference Payments API reference}
 */
class Payment {
    constructor(mercadoPagoConfig) {
        this.config = mercadoPagoConfig;
    }
    /**
     * Search payments that belong to the authenticated collector.
     *
     * Supports pagination, sorting, date-range filtering, and arbitrary
     * query-parameter filters forwarded to `GET /v1/payments/search`.
     *
     * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/payment/search.ts Usage Example}
     */
    search(paymentSearchOptions = {}) {
        const { options, requestOptions } = paymentSearchOptions;
        this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
        return (0, search_1.default)({ options, config: this.config });
    }
    /**
     * Cancel a pending or in-process payment by setting its status to `cancelled`.
     *
     * Only payments that have not yet been approved can be cancelled.
     *
     * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/payment/cancel.ts Usage Example}
     */
    cancel({ id, requestOptions }) {
        this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
        return (0, cancel_1.default)({ id, config: this.config });
    }
    /**
     * Capture a previously authorized (pre-auth) payment.
     *
     * When the payment was created with `capture: false`, this method finalizes
     * the charge.  An optional `transaction_amount` allows partial captures.
     *
     * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/payment/capture.ts Usage Example}
     */
    capture({ id, transaction_amount, requestOptions }) {
        this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
        return (0, capture_1.default)({ id, transaction_amount, config: this.config });
    }
    /**
     * Create a new payment via `POST /v1/payments`.
     *
     * The request body must contain at least a `transaction_amount`, a `payer`,
     * and a `payment_method_id` (or a card `token`).
     *
     * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/payment/create.ts Usage Example}
     */
    create({ body, requestOptions }) {
        this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
        return (0, create_1.default)({ body, config: this.config });
    }
    /**
     * Retrieve a single payment by its unique identifier.
     *
     * Calls `GET /v1/payments/:id` and returns the full payment resource.
     *
     * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/payment/get.ts Usage Example}
     */
    get({ id, requestOptions }) {
        this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
        return (0, get_1.default)({ id, config: this.config });
    }
}
exports.Payment = Payment;
