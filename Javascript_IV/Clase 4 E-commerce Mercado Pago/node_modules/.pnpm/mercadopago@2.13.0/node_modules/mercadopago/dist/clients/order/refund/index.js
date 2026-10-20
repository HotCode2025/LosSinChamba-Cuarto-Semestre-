"use strict";
/**
 * Refund order operation -- sends `POST /v1/orders/{id}/refund`.
 *
 * @module clients/order/refund
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = refund;
const restClient_1 = require("../../../utils/restClient");
/**
 * Refund an order (total or partial).
 *
 * Omit the body for a full refund of all transactions. Provide
 * specific transaction IDs and amounts for a partial refund.
 *
 * @returns The updated order including the new refund records.
 */
function refund({ id, body, config }) {
    return restClient_1.RestClient.fetch(`/v1/orders/${id}/refund`, Object.assign({ method: 'POST', headers: {
            'Authorization': `Bearer ${config.accessToken}`
        }, body: JSON.stringify(body) }, config.options));
}
