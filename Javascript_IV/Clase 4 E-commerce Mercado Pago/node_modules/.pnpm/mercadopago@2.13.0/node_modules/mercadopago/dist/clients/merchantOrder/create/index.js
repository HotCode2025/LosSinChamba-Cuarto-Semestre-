"use strict";
/**
 * Implementation of the create-merchant-order operation.
 *
 * Sends a `POST /merchant_orders` request to create a new order that
 * groups items, payments, and shipments.
 *
 * @module merchantOrder/create
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = create;
const restClient_1 = require("../../../utils/restClient");
/**
 * Create a new merchant order via `POST /merchant_orders`.
 *
 * @returns The newly created merchant order with all its details.
 */
function create({ body, config }) {
    return restClient_1.RestClient.fetch('/merchant_orders', Object.assign({ headers: {
            'Authorization': `Bearer ${config.accessToken}`
        }, body: JSON.stringify(body), method: 'POST' }, config.options));
}
