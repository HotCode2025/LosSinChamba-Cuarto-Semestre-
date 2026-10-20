"use strict";
/**
 * Update transaction operation -- sends `PUT /v1/orders/{id}/transactions/{transactionId}`.
 *
 * @module clients/order/transaction/update
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = updateTransaction;
const restClient_1 = require("../../../../utils/restClient");
/**
 * Update an existing payment transaction within an order.
 *
 * Replaces the transaction's payment data (amount, payment method)
 * with the values provided in the request body.
 *
 * @returns The updated payment method details.
 */
function updateTransaction({ id, transactionId, body, config }) {
    return restClient_1.RestClient.fetch(`/v1/orders/${id}/transactions/${transactionId}`, Object.assign({ method: 'PUT', headers: {
            'Authorization': `Bearer ${config.accessToken}`
        }, body: JSON.stringify(body) }, config.options));
}
