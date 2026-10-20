"use strict";
/**
 * Customer API client for the MercadoPago Node.js SDK.
 *
 * Provides a high-level facade for managing customers and their saved
 * payment cards through the `/v1/customers` resource.  Card-related
 * convenience methods delegate to the {@link CustomerCard} client
 * internally.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/online-payments/checkout-api/customers/create-customer/post MercadoPago Customers API reference}
 * @module clients/customer
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = void 0;
const get_1 = __importDefault(require("./get"));
const create_1 = __importDefault(require("./create"));
const remove_1 = __importDefault(require("./remove"));
const update_1 = __importDefault(require("./update"));
const search_1 = __importDefault(require("./search"));
const customerCard_1 = require("../../clients/customerCard");
/**
 * Client for the MercadoPago Customers API.
 *
 * Exposes CRUD operations on customers as well as convenience methods
 * for managing the saved payment cards associated with each customer.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/online-payments/checkout-api/customers/create-customer/post API reference}
 */
class Customer {
    constructor(mercadoPagoConfig) {
        this.config = mercadoPagoConfig;
        this.customerCard = new customerCard_1.CustomerCard(mercadoPagoConfig);
    }
    /**
     * Create a new customer in MercadoPago.
     *
     * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/customer/create.ts Usage Example  }.
     */
    create({ body, requestOptions }) {
        this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
        return (0, create_1.default)({ body, config: this.config });
    }
    /**
     * Retrieve a single customer by its unique identifier.
     *
     * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/customer/get.ts Usage Example  }.
     */
    get({ customerId, requestOptions }) {
        this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
        return (0, get_1.default)({ customerId, config: this.config });
    }
    /**
     * Remove an existing customer by its unique identifier.
     *
     * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/customer/remove.ts Usage Example  }.
     */
    remove({ customerId, requestOptions }) {
        this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
        return (0, remove_1.default)({ customerId, config: this.config });
    }
    /**
     * Update an existing customer's information.
     *
     * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/customer/update.ts Usage Example  }.
     */
    update({ customerId, body, requestOptions }) {
        this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
        return (0, update_1.default)({ customerId: customerId, body, config: this.config });
    }
    /**
     * Search for customers using optional filters and pagination.
     *
     * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/customer/search.ts Usage Example  }.
     */
    search(CustomerSearchOptions = {}) {
        const { options, requestOptions } = CustomerSearchOptions;
        this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
        return (0, search_1.default)({ options, config: this.config });
    }
    /**
     * Save a new payment card for a customer using a card token.
     *
     * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/customer/createCard.ts Usage Example  }.
     */
    createCard({ customerId, body, requestOptions }) {
        this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
        return this.customerCard.create({ customerId, body });
    }
    /**
     * Retrieve a specific saved card for a customer.
     *
     * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/customer/getCard.ts Usage Example  }.
     */
    getCard({ customerId, cardId, requestOptions }) {
        this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
        return this.customerCard.get({ customerId, cardId });
    }
    /**
     * Remove a saved card from a customer's account.
     *
     * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/customer/removeCard.ts Usage Example  }.
     */
    removeCard({ customerId, cardId, requestOptions }) {
        this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
        return this.customerCard.remove({ customerId, cardId: cardId });
    }
    /**
     * List all saved payment cards for a customer.
     *
     * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/customer/listCards.ts Usage Example  }.
     */
    listCards({ customerId, requestOptions }) {
        this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
        return this.customerCard.list({ customerId });
    }
}
exports.Customer = Customer;
