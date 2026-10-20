"use strict";
/**
 * Implementation of the update-merchant-order operation.
 *
 * Sends a `PUT /merchant_orders/{id}` request to modify an existing
 * merchant order's items, shipments, or metadata.
 *
 * @module merchantOrder/update
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = update;
const restClient_1 = require("../../../utils/restClient");
/**
 * Update an existing merchant order via `PUT /merchant_orders/{id}`.
 *
 * @returns The updated merchant order with all its details.
 */
function update({ merchantOrderId, body, config }) {
    return restClient_1.RestClient.fetch(`/merchant_orders/${merchantOrderId}`, Object.assign({ headers: {
            'Authorization': `Bearer ${config.accessToken}`
        }, body: JSON.stringify(body), method: 'PUT' }, config.options));
}
