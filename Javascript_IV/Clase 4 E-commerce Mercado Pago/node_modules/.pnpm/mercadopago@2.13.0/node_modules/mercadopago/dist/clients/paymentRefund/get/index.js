"use strict";
/**
 * Implementation of the get-refund operation.
 *
 * Sends a `GET /v1/payments/{payment_id}/refunds/{refund_id}` request
 * to retrieve the details of a specific refund.
 *
 * @module paymentRefund/get
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = get;
const restClient_1 = require("../../../utils/restClient");
/**
 * Retrieve a specific refund by payment ID and refund ID.
 *
 * @returns The refund details including status, amount, and source.
 */
function get({ payment_id, refund_id, config }) {
    return restClient_1.RestClient.fetch(`/v1/payments/${payment_id}/refunds/${refund_id}`, Object.assign({ headers: {
            'Authorization': `Bearer ${config.accessToken}`
        } }, config.options));
}
