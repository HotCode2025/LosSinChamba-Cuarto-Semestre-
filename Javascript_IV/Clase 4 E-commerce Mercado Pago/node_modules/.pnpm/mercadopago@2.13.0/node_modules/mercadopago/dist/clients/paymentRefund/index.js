"use strict";
/**
 * Payment Refund client for the MercadoPago API.
 *
 * Provides methods to create partial or total refunds on a payment,
 * retrieve a specific refund, and list all refunds associated with a payment.
 *
 * @module paymentRefund
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRefund = void 0;
const get_1 = __importDefault(require("./get"));
const create_1 = __importDefault(require("./create"));
const list_1 = __importDefault(require("./list"));
const total_1 = __importDefault(require("./total"));
/**
 * Client facade for MercadoPago payment refund operations.
 *
 * Supports creating partial refunds (with a specified amount), total
 * refunds (full payment amount), retrieving individual refund details,
 * and listing all refunds for a given payment.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference Documentation }.
 */
class PaymentRefund {
    constructor(mercadoPagoConfig) {
        this.config = mercadoPagoConfig;
    }
    /**
     * Retrieve a specific refund by payment ID and refund ID.
     *
     * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/paymentRefund/get.ts Usage Example }.
     */
    get({ payment_id, refund_id, requestOptions }) {
        this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
        return (0, get_1.default)({ payment_id, refund_id, config: this.config });
    }
    /**
     * Create a partial refund on a payment.
     *
     * To refund a specific amount, include the `amount` field in the body.
     * For a full refund, use the {@link total} method instead.
     *
     * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/paymentRefund/create.ts Usage Example }.
     */
    create({ payment_id, body, requestOptions }) {
        this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
        return (0, create_1.default)({ payment_id, body, config: this.config });
    }
    /**
     * Create a total (full-amount) refund on a payment.
     *
     * Refunds the entire payment amount. No request body is required.
     *
     * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/paymentRefund/create.ts Usage Example }.
     */
    total({ payment_id, requestOptions }) {
        this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
        return (0, total_1.default)({ payment_id, config: this.config });
    }
    /**
     * List all refunds associated with a payment.
     *
     * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/paymentRefund/list.ts Usage Example }.
     */
    list({ payment_id, requestOptions }) {
        this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
        return (0, list_1.default)({ payment_id, config: this.config });
    }
}
exports.PaymentRefund = PaymentRefund;
