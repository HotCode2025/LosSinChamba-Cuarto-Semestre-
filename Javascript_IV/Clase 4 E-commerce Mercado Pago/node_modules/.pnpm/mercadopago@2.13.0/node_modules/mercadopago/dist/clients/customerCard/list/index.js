"use strict";
/**
 * Implementation of the customer card list operation.
 *
 * Sends a GET request to `/v1/customers/:id/cards` to retrieve all
 * saved payment cards for a customer.
 *
 * @module clients/customerCard/list
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = list;
const restClient_1 = require("../../../utils/restClient");
/**
 * List all saved payment cards for a customer.
 *
 * @returns An array of card records belonging to the customer.
 */
function list({ customerId, config }) {
    return restClient_1.RestClient.fetch(`/v1/customers/${customerId}/cards`, Object.assign({ headers: {
            'Authorization': `Bearer ${config.accessToken}`
        } }, config.options));
}
