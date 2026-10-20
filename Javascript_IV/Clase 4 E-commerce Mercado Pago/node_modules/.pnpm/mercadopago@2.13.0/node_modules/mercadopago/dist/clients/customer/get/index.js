"use strict";
/**
 * Implementation of the customer retrieval operation.
 *
 * Sends a GET request to `/v1/customers/:id` to fetch a single
 * customer record from MercadoPago.
 *
 * @module clients/customer/get
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = get;
const restClient_1 = require("../../../utils/restClient");
/**
 * Retrieve a customer by its unique identifier.
 *
 * @returns The customer record matching the given ID.
 */
function get({ customerId, config }) {
    return restClient_1.RestClient.fetch(`/v1/customers/${customerId}`, Object.assign({ headers: {
            'Authorization': `Bearer ${config.accessToken}`
        } }, config.options));
}
