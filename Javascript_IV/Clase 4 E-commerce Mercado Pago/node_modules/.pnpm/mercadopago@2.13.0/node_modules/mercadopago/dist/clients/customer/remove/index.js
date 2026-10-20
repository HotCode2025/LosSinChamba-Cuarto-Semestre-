"use strict";
/**
 * Implementation of the customer removal operation.
 *
 * Sends a DELETE request to `/v1/customers/:id` to remove an existing
 * customer from MercadoPago.
 *
 * @module clients/customer/remove
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = remove;
const restClient_1 = require("../../../utils/restClient");
/**
 * Remove a customer by its unique identifier.
 *
 * @returns The customer record that was deleted.
 */
function remove({ customerId, config }) {
    return restClient_1.RestClient.fetch(`/v1/customers/${customerId}`, Object.assign({ headers: {
            'Authorization': `Bearer ${config.accessToken}`
        }, method: 'DELETE' }, config.options));
}
