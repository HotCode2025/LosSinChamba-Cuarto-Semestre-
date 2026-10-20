"use strict";
/**
 * Order API client -- facade for the MercadoPago Orders v1 endpoints.
 *
 * Exposes every order lifecycle operation (create, get, process, capture,
 * cancel, refund, search) as well as transaction-level management
 * (create, update, delete) on an existing order.
 *
 * @module clients/order
 * @see {@link https://mercadopago.com/developers/en/docs/order/landing Orders API Documentation}
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const create_1 = __importDefault(require("./create"));
const get_1 = __importDefault(require("./get"));
const process_1 = __importDefault(require("./process"));
const capture_1 = __importDefault(require("./capture"));
const cancel_1 = __importDefault(require("./cancel"));
const refund_1 = __importDefault(require("./refund"));
const search_1 = __importDefault(require("./search"));
const create_2 = __importDefault(require("./transaction/create"));
const update_1 = __importDefault(require("./transaction/update"));
const delete_1 = __importDefault(require("./transaction/delete"));
/**
 * Client for the MercadoPago Orders API.
 *
 * Each method maps 1-to-1 with an Orders REST endpoint and returns a
 * promise that resolves to the API response. Per-call `requestOptions`
 * are merged with the global {@link MercadoPagoConfig} options so
 * callers can override timeouts, idempotency keys, etc.
 *
 * @see {@link https://mercadopago.com/developers/en/docs/order/landing Documentation}
 */
class Order {
    constructor(mercadoPagoConfig) {
        this.config = mercadoPagoConfig;
    }
    /**
     * Create a new order.
     *
     * Sends a `POST /v1/orders` request with the provided order body.
     *
     * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/order/create.ts Usage Example}
     */
    create({ body, requestOptions }) {
        this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
        return (0, create_1.default)({ body, config: this.config });
    }
    /**
     * Retrieve an existing order by its ID.
     *
     * Sends a `GET /v1/orders/{id}` request.
     *
     * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/order/get.ts Usage Example}
     */
    get({ id, requestOptions }) {
        this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
        return (0, get_1.default)({ id, config: this.config });
    }
    /**
     * Process an order, triggering payment execution.
     *
     * Sends a `POST /v1/orders/{id}/process` request. The order must
     * already contain at least one payment transaction.
     *
     * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/order/process.ts Usage Example}
     */
    process({ id, requestOptions }) {
        this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
        return (0, process_1.default)({ id, config: this.config });
    }
    /**
     * Capture an authorized order, confirming the payment settlement.
     *
     * Sends a `POST /v1/orders/{id}/capture` request. Only applicable
     * to orders created with `capture_mode: "manual"`.
     *
     * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/order/capture.ts Usage Example}
     */
    capture({ id, requestOptions }) {
        this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
        return (0, capture_1.default)({ id, config: this.config });
    }
    /**
     * Cancel an order that has not yet been captured.
     *
     * Sends a `POST /v1/orders/{id}/cancel` request.
     *
     * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/order/cancel.ts Usage Example}
     */
    cancel({ id, requestOptions }) {
        this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
        return (0, cancel_1.default)({ id, config: this.config });
    }
    /**
     * Refund an order (total or partial).
     *
     * Sends a `POST /v1/orders/{id}/refund` request. Omit the body
     * for a full refund; provide specific transaction amounts for a
     * partial refund.
     *
     * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/order/refundTotal.ts Total Refund Example}
     * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/order/refundPartial.ts Partial Refund Example}
     */
    refund({ id, body, requestOptions }) {
        this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
        return (0, refund_1.default)({ id, body, config: this.config });
    }
    /**
     * Search orders by date range and optional filters.
     *
     * Sends a `GET /v1/orders` request with query parameters built from
     * the provided search options. Returns a paginated result set.
     *
     * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/order/search.ts Usage Example}
     */
    search(searchData) {
        const options = searchData === null || searchData === void 0 ? void 0 : searchData.options;
        const requestOptions = searchData === null || searchData === void 0 ? void 0 : searchData.requestOptions;
        this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
        return (0, search_1.default)({ options, config: this.config });
    }
    /**
     * Add a payment transaction to an existing order.
     *
     * Sends a `POST /v1/orders/{id}/transactions` request.
     *
     * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/order/transaction/create.ts Usage Example}
     */
    createTransaction({ id, body, requestOptions }) {
        this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
        return (0, create_2.default)({ id, body, config: this.config });
    }
    /**
     * Update an existing payment transaction within an order.
     *
     * Sends a `PUT /v1/orders/{id}/transactions/{transactionId}` request.
     *
     * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/order/transaction/update.ts Usage Example}
     */
    updateTransaction({ id, transactionId, body, requestOptions }) {
        this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
        return (0, update_1.default)({ id, transactionId, body, config: this.config });
    }
    /**
     * Remove a payment transaction from an order.
     *
     * Sends a `DELETE /v1/orders/{id}/transactions/{transactionId}` request.
     *
     * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/order/transaction/delete.ts Usage Example}
     */
    deleteTransaction({ id, transactionId, requestOptions }) {
        this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
        return (0, delete_1.default)({ id, transactionId, config: this.config });
    }
}
exports.Order = Order;
