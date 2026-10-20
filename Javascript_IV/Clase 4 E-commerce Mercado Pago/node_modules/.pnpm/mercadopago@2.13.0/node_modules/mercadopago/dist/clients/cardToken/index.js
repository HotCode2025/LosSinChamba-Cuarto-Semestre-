"use strict";
/**
 * Card Token client for the MercadoPago API.
 *
 * Provides a method to tokenize card data, replacing sensitive card
 * numbers and security codes with a single-use token that can be safely
 * transmitted and used to create payments without handling raw PAN data.
 *
 * @module cardToken
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardToken = void 0;
const create_1 = __importDefault(require("./create"));
/**
 * Client facade for MercadoPago card tokenization operations.
 *
 * Use this class to create a temporary, single-use token from card
 * details or a previously saved card ID, ensuring PCI DSS compliance
 * by avoiding direct handling of full card numbers on the server side.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference Documentation }.
 */
class CardToken {
    constructor(mercadoPagoConfig) {
        this.config = mercadoPagoConfig;
    }
    /**
     * Create a card token from card details or a saved card ID.
     *
     * The returned token ID should be used in the `token` field when
     * creating a payment.
     *
     * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/examples/cardtoken/create.ts Usage Example }.
     */
    create({ body, requestOptions }) {
        this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
        return (0, create_1.default)({ body, config: this.config });
    }
}
exports.CardToken = CardToken;
