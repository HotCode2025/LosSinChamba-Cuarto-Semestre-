"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = cancel;
/**
 * Cancel-payment operation.
 *
 * Sends a `PUT /v1/payments/:id` request with `{ status: "cancelled" }`
 * to transition a pending or in-process payment into the `cancelled` state.
 *
 * @module clients/payment/cancel
 */
const restClient_1 = require("../../../utils/restClient");
/**
 * Cancel a payment that has not yet been approved.
 *
 * @param id     - Identifier of the payment to cancel.
 * @param config - SDK configuration including the access token.
 * @returns The updated payment resource with status `cancelled`.
 */
function cancel({ id, config }) {
    const cancelBody = {
        status: 'cancelled'
    };
    return restClient_1.RestClient.fetch(`/v1/payments/${id}`, Object.assign({ method: 'PUT', headers: {
            'Authorization': `Bearer ${config.accessToken}`,
        }, body: JSON.stringify(cancelBody) }, config.options));
}
