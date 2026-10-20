"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = capture;
/**
 * Capture-payment operation.
 *
 * Sends a `PUT /v1/payments/:id` request with `{ capture: true }` to
 * finalize a previously authorized (pre-auth) payment.  An optional
 * `transaction_amount` enables partial captures.
 *
 * @module clients/payment/capture
 */
const restClient_1 = require("../../../utils/restClient");
/**
 * Capture an authorized payment.
 *
 * @param id                 - Identifier of the authorized payment to capture.
 * @param transaction_amount - Amount to capture; omit for a full capture, provide a
 *                             lower value for a partial capture.
 * @param config             - SDK configuration including the access token.
 * @returns The updated payment resource with `captured: true`.
 */
function capture({ id, transaction_amount, config }) {
    const captureBody = {
        capture: true,
        transaction_amount
    };
    return restClient_1.RestClient.fetch(`/v1/payments/${id}`, Object.assign({ method: 'PUT', headers: {
            'Authorization': `Bearer ${config.accessToken}`,
        }, body: JSON.stringify(captureBody) }, config.options));
}
