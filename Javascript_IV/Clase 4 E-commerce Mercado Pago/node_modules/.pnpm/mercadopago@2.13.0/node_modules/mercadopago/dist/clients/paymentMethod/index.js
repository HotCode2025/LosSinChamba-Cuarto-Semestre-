"use strict";
/**
 * Payment Method client for the MercadoPago API.
 *
 * Provides a method to retrieve the list of payment methods available
 * for the authenticated account's country/site, including card brands,
 * bank transfers, and off-line payment options.
 *
 * @module paymentMethod
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentMethod = void 0;
const get_1 = __importDefault(require("./get"));
/**
 * Client facade for querying available MercadoPago payment methods.
 *
 * Use this class to discover which payment methods (credit cards, debit
 * cards, bank transfers, tickets, etc.) are accepted for the seller's
 * site and country.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference Documentation }.
 */
class PaymentMethod {
    constructor(mercadoPagoConfig) {
        this.config = mercadoPagoConfig;
    }
    /**
     * Retrieve all payment methods available for the authenticated account.
     *
     * Returns an array of payment methods with their settings, amount
     * constraints, and processing modes.
     *
     * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/examples/paymentmethod/get.ts Usage Example }.
     */
    get(paymentMethodsGetOptions = {}) {
        const { requestOptions } = paymentMethodsGetOptions;
        this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
        return (0, get_1.default)({ config: this.config });
    }
}
exports.PaymentMethod = PaymentMethod;
