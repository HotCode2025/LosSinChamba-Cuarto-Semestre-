"use strict";
/**
 * Implementation of the customer card creation operation.
 *
 * Sends a POST request to `/v1/customers/:id/cards` to save a new
 * payment card for a customer using a previously generated card token.
 *
 * @module clients/customerCard/create
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = create;
const restClient_1 = require("../../../utils/restClient");
/**
 * Save a new payment card for a customer.
 *
 * @returns The newly created card record.
 */
function create({ customerId, body, config }) {
    return restClient_1.RestClient.fetch(`/v1/customers/${customerId}/cards`, Object.assign({ headers: {
            'Authorization': `Bearer ${config.accessToken}`
        }, body: JSON.stringify(body), method: 'POST' }, config.options));
}
