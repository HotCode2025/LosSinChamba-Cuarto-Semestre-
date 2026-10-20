"use strict";
/**
 * Implementation of the total-refund operation.
 *
 * Sends a `POST /v1/payments/{payment_id}/refunds` with an empty body
 * to refund the full amount of the specified payment.
 *
 * @module paymentRefund/total
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = total;
const restClient_1 = require("../../../utils/restClient");
/**
 * Create a total (full-amount) refund on the specified payment.
 *
 * @returns The newly created refund covering the full payment amount.
 */
function total({ payment_id, config }) {
    return restClient_1.RestClient.fetch(`/v1/payments/${payment_id}/refunds`, Object.assign({ method: 'POST', headers: {
            'Authorization': `Bearer ${config.accessToken}`,
        }, body: JSON.stringify({}) }, config.options));
}
