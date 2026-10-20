"use strict";
/**
 * Delete transaction operation -- sends `DELETE /v1/orders/{id}/transactions/{transactionId}`.
 *
 * @module clients/order/transaction/delete
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = deleteTransaction;
const restClient_1 = require("../../../../utils/restClient");
/**
 * Remove a payment transaction from an order.
 *
 * @returns A bare API response (status and headers only; no body).
 */
function deleteTransaction({ id, transactionId, config }) {
    return restClient_1.RestClient.fetch(`/v1/orders/${id}/transactions/${transactionId}`, Object.assign({ method: 'DELETE', headers: {
            'Authorization': `Bearer ${config.accessToken}`
        } }, config.options));
}
