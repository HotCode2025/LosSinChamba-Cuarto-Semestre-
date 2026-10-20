"use strict";
/**
 * Checkout Pro Preference client for the MercadoPago Node SDK.
 *
 * A Preference defines everything the buyer sees in the Checkout Pro
 * payment flow: items, payer details, back URLs, shipping, payment
 * methods, and expiration rules. This module exposes CRUD + search
 * operations against the `/checkout/preferences` endpoint.
 *
 * @module clients/preference
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Preference = void 0;
const get_1 = __importDefault(require("./get"));
const create_1 = __importDefault(require("./create"));
const update_1 = __importDefault(require("./update"));
const search_1 = __importDefault(require("./search"));
/**
 * Client for managing Checkout Pro payment preferences.
 *
 * Each preference generates an `init_point` URL that redirects buyers
 * to MercadoPago's hosted checkout. Use this client to create, retrieve,
 * update, and search preferences.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference Documentation }.
 */
class Preference {
    constructor(mercadoPagoConfig) {
        this.config = mercadoPagoConfig;
    }
    /**
     * Retrieve a single preference by its unique identifier.
     *
     * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/preference/get.ts Usage Example }.
     */
    get({ preferenceId, requestOptions }) {
        this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
        return (0, get_1.default)({ id: preferenceId, config: this.config });
    }
    /**
     * Create a new Checkout Pro preference and obtain an `init_point` URL.
     *
     * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/preference/create.ts Usage Example }.
     */
    create({ body, requestOptions }) {
        this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
        return (0, create_1.default)({ body, config: this.config });
    }
    /**
     * Update an existing preference (e.g. change items, amounts, or expiration).
     *
     * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/preference/update.ts Usage Example }.
     */
    update({ id, updatePreferenceRequest, requestOptions }) {
        this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
        return (0, update_1.default)({ id, updatePreferenceRequest, config: this.config });
    }
    /**
     * Search preferences using filters such as external reference or sponsor.
     *
     * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/preference/search.ts Usage Example }.
     */
    search(preferenceSearchData = {}) {
        const { options, requestOptions } = preferenceSearchData;
        this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
        return (0, search_1.default)({ options, config: this.config });
    }
}
exports.Preference = Preference;
