"use strict";
/**
 * Implementation of the list-refunds operation.
 *
 * Sends a `GET /v1/payments/{payment_id}/refunds/` request to retrieve
 * all refunds associated with the specified payment.
 *
 * @module paymentRefund/list
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = list;
const restClient_1 = require("../../../utils/restClient");
/**
 * List all refunds for the specified payment.
 *
 * @returns An array of refund records for the payment.
 */
function list({ payment_id, config }) {
    return restClient_1.RestClient.fetch(`/v1/payments/${payment_id}/refunds/`, Object.assign({ headers: {
            'Authorization': `Bearer ${config.accessToken}`
        } }, config.options));
}
