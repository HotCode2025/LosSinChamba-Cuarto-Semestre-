"use strict";
/**
 * CustomerCard API client for the MercadoPago Node.js SDK.
 *
 * Provides a high-level facade for managing the saved payment cards
 * associated with a customer through the
 * `/v1/customers/:customer_id/cards` resource.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/online-payments/checkout-api/cards/save-card/post MercadoPago Customer Cards API reference}
 * @module clients/customerCard
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerCard = void 0;
const get_1 = __importDefault(require("./get"));
const create_1 = __importDefault(require("./create"));
const remove_1 = __importDefault(require("./remove"));
const update_1 = __importDefault(require("./update"));
const list_1 = __importDefault(require("./list"));
/**
 * Client for the MercadoPago Customer Cards API.
 *
 * Exposes CRUD and list operations on the saved payment cards that
 * belong to a specific customer.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/online-payments/checkout-api/cards/save-card/post API reference}
 */
class CustomerCard {
    constructor(mercadoPagoConfig) {
        this.config = mercadoPagoConfig;
    }
    /**
     * Save a new payment card for a customer using a card token.
     *
     * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/customer/create.ts Usage Example  }.
     */
    create({ customerId, body, requestOptions }) {
        this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
        return (0, create_1.default)({ customerId: customerId, body, config: this.config });
    }
    /**
     * Retrieve a specific saved card for a customer.
     *
     * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/customer/get.ts Usage Example  }.
    */
    get({ customerId, cardId, requestOptions }) {
        this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
        return (0, get_1.default)({ customerId: customerId, cardId: cardId, config: this.config });
    }
    /**
     * Remove a saved card from a customer's wallet.
     *
     * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/customer/remove.ts Usage Example  }.
     */
    remove({ customerId, cardId, requestOptions }) {
        this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
        return (0, remove_1.default)({ customerId: customerId, cardId: cardId, config: this.config });
    }
    /**
     * Update the details of an existing saved card (e.g. expiration date or cardholder info).
     *
     * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/customer/update.ts Usage Example  }.
     */
    update({ customerId, cardId, body, requestOptions }) {
        this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
        return (0, update_1.default)({ customerId: customerId, cardId: cardId, body, config: this.config });
    }
    /**
     * List all saved payment cards for a customer.
     *
     * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/customer/list.ts Usage Example  }.
     */
    list({ customerId, requestOptions }) {
        this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
        return (0, list_1.default)({ customerId: customerId, config: this.config });
    }
}
exports.CustomerCard = CustomerCard;
