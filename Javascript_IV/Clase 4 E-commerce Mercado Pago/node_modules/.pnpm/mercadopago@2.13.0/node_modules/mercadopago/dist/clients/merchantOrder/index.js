"use strict";
/**
 * Merchant Order client for the MercadoPago API.
 *
 * Provides methods to create, retrieve, update, and search merchant orders.
 * A merchant order groups multiple payments, items, and shipments under
 * a single order entity, typically originating from a checkout preference.
 *
 * @module merchantOrder
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MerchantOrder = void 0;
const create_1 = __importDefault(require("./create"));
const get_1 = __importDefault(require("./get"));
const update_1 = __importDefault(require("./update"));
const search_1 = __importDefault(require("./search"));
/**
 * Client facade for MercadoPago Merchant Order operations.
 *
 * Use this class to manage orders that aggregate payments, items, and
 * shipments originating from checkout preferences or marketplace flows.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/online-payments/checkout-pro/merchant_orders/get-merchant-order/get Documentation }.
 */
class MerchantOrder {
    constructor(mercadoPagoConfig) {
        this.config = mercadoPagoConfig;
    }
    /**
     * Create a new merchant order.
     *
     * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/merchantOrder/create.ts Usage Example }.
     */
    create({ body, requestOptions }) {
        this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
        return (0, create_1.default)({ body, config: this.config });
    }
    /**
     * Retrieve a merchant order by its ID.
     *
     * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/merchantOrder/get.ts Usage Example }.
     */
    get({ merchantOrderId, requestOptions }) {
        this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
        return (0, get_1.default)({ merchantOrderId, config: this.config });
    }
    /**
     * Update an existing merchant order (items, shipments, notification URL, etc.).
     *
     * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/merchantOrder/update.ts Usage Example }.
     */
    update({ merchantOrderId, body, requestOptions }) {
        this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
        return (0, update_1.default)({ merchantOrderId, body, config: this.config });
    }
    /**
     * Search merchant orders with optional filters such as status, payer, or date range.
     *
     * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/merchantOrder/search.ts Usage Example }.
     */
    search(merchantOrderSearchOptions = {}) {
        const { options, requestOptions } = merchantOrderSearchOptions;
        this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
        return (0, search_1.default)({ options, config: this.config });
    }
}
exports.MerchantOrder = MerchantOrder;
