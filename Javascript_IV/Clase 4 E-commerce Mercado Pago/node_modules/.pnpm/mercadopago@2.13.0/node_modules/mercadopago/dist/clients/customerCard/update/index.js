"use strict";
/**
 * Implementation of the customer card update operation.
 *
 * Sends a PUT request to `/v1/customers/:id/cards/:card_id` to modify
 * an existing saved card (e.g. expiration date or cardholder details).
 *
 * @module clients/customerCard/update
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = update;
const restClient_1 = require("../../../utils/restClient");
/**
 * Update an existing saved card for a customer.
 *
 * @returns The updated card record.
 */
function update({ customerId, cardId, body, config }) {
    return restClient_1.RestClient.fetch(`/v1/customers/${customerId}/cards/${cardId}`, Object.assign({ headers: {
            'Authorization': `Bearer ${config.accessToken}`
        }, body: JSON.stringify(body), method: 'PUT' }, config.options));
}
