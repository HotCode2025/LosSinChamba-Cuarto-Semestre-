"use strict";
/**
 * Implementation of the customer update operation.
 *
 * Sends a PUT request to `/v1/customers/:id` to modify an existing
 * customer record in MercadoPago.
 *
 * @module clients/customer/update
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = update;
const restClient_1 = require("../../../utils/restClient");
/**
 * Update an existing customer's information.
 *
 * @returns The updated customer record.
 */
function update({ customerId, body, config }) {
    return restClient_1.RestClient.fetch(`/v1/customers/${customerId}`, Object.assign({ headers: {
            'Authorization': `Bearer ${config.accessToken}`
        }, body: JSON.stringify(body), method: 'PUT' }, config.options));
}
