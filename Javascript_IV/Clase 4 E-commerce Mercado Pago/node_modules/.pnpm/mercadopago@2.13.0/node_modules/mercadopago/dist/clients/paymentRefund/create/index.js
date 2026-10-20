"use strict";
/**
 * Implementation of the create-refund operation.
 *
 * Sends a `POST /v1/payments/{payment_id}/refunds` request to create a
 * partial refund on the specified payment.
 *
 * @module paymentRefund/create
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = create;
const restClient_1 = require("../../../utils/restClient");
/**
 * Create a partial refund on the specified payment.
 *
 * @returns The newly created refund with its status and amount.
 */
function create({ payment_id, body, config }) {
    return restClient_1.RestClient.fetch(`/v1/payments/${payment_id}/refunds`, Object.assign({ method: 'POST', headers: {
            'Authorization': `Bearer ${config.accessToken}`,
        }, body: JSON.stringify(body) }, config.options));
}
