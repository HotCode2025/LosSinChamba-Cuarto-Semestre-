"use strict";
/**
 * Implementation of the get-payment-methods operation.
 *
 * Sends a `GET /v1/payment_methods` request to retrieve all payment
 * methods available for the authenticated seller's site/country.
 *
 * @module paymentMethod/get
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = get;
const restClient_1 = require("../../../utils/restClient");
/**
 * Retrieve the list of available payment methods.
 *
 * @returns An array of payment methods with their configuration and constraints.
 */
function get({ config }) {
    return restClient_1.RestClient.fetch('/v1/payment_methods', Object.assign({ headers: {
            'Authorization': `Bearer ${config.accessToken}`
        } }, config.options));
}
