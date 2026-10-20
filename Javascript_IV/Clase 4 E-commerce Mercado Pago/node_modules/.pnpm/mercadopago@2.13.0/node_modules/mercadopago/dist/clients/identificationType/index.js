"use strict";
/**
 * Identification Type client for the MercadoPago API.
 *
 * Provides a method to list the accepted identification document types
 * (e.g. CPF, DNI, CURP) for the seller's country, which are required
 * when collecting payer or cardholder information.
 *
 * @module identificationType
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdentificationType = void 0;
const list_1 = __importDefault(require("./list"));
/**
 * Client facade for querying accepted identification document types.
 *
 * Each MercadoPago country/site accepts a specific set of ID document
 * types. Use this class to retrieve them so you can present the correct
 * options to the buyer during checkout.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/online-payments/checkout-api/identification-types/get Documentation }.
 */
class IdentificationType {
    constructor(mercadoPagoConfig) {
        this.config = mercadoPagoConfig;
    }
    /**
     * List all accepted identification document types for the account's country.
     *
     * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/examples/identificationtype/list.ts Usage Example }.
     */
    list(identificationTypeListOptions = {}) {
        const { requestOptions } = identificationTypeListOptions;
        this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
        return (0, list_1.default)({ config: this.config });
    }
}
exports.IdentificationType = IdentificationType;
