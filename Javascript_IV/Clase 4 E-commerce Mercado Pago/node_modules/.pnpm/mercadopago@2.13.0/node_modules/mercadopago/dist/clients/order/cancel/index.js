"use strict";
/**
 * Cancel order operation -- sends `POST /v1/orders/{id}/cancel`.
 *
 * @module clients/order/cancel
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = cancel;
const restClient_1 = require("../../../utils/restClient");
/**
 * Cancel an order that has not yet been captured.
 *
 * @returns The updated order with a `cancelled` status.
 */
function cancel({ id, config }) {
    return restClient_1.RestClient.fetch(`/v1/orders/${id}/cancel`, Object.assign({ method: 'POST', headers: {
            'Authorization': `Bearer ${config.accessToken}`,
        } }, config.options));
}
