"use strict";
/**
 * Implementation of the get-merchant-order operation.
 *
 * Sends a `GET /merchant_orders/{id}` request to retrieve a single
 * merchant order by its unique identifier.
 *
 * @module merchantOrder/get
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = get;
const restClient_1 = require("../../../utils/restClient");
/**
 * Retrieve a merchant order by its ID.
 *
 * @returns The full merchant order including items, payments, and shipments.
 */
function get({ merchantOrderId, config }) {
    return restClient_1.RestClient.fetch(`/merchant_orders/${merchantOrderId}`, Object.assign({ headers: {
            'Authorization': `Bearer ${config.accessToken}`
        } }, config.options));
}
