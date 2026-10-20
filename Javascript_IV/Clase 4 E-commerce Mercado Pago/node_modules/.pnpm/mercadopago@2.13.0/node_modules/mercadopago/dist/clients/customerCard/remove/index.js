"use strict";
/**
 * Implementation of the customer card removal operation.
 *
 * Sends a DELETE request to `/v1/customers/:id/cards/:card_id` to
 * remove a saved payment card from a customer's wallet.
 *
 * @module clients/customerCard/remove
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = remove;
const restClient_1 = require("../../../utils/restClient");
/**
 * Remove a saved card from a customer's wallet.
 *
 * @returns The card record that was deleted.
 */
function remove({ customerId, cardId, config }) {
    return restClient_1.RestClient.fetch(`/v1/customers/${customerId}/cards/${cardId}`, Object.assign({ headers: {
            'Authorization': `Bearer ${config.accessToken}`
        }, method: 'DELETE' }, config.options));
}
