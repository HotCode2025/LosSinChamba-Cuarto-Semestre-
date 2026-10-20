"use strict";
/**
 * Implementation of the customer card retrieval operation.
 *
 * Sends a GET request to `/v1/customers/:id/cards/:card_id` to fetch
 * a single saved card belonging to a customer.
 *
 * @module clients/customerCard/get
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = get;
const restClient_1 = require("../../../utils/restClient");
/**
 * Retrieve a specific saved card for a customer.
 *
 * @returns The card record matching the given customer and card IDs.
 */
function get({ customerId, cardId, config }) {
    return restClient_1.RestClient.fetch(`/v1/customers/${customerId}/cards/${cardId}`, Object.assign({ headers: {
            'Authorization': `Bearer ${config.accessToken}`
        } }, config.options));
}
