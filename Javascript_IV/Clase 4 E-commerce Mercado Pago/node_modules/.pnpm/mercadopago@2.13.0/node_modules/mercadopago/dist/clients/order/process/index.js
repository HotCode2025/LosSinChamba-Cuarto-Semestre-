"use strict";
/**
 * Process order operation -- sends `POST /v1/orders/{id}/process`.
 *
 * @module clients/order/process
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = process;
const restClient_1 = require("../../../utils/restClient");
/**
 * Process an order, triggering payment execution for its transactions.
 *
 * The order must already contain at least one payment transaction
 * before it can be processed.
 *
 * @returns The updated order with the resulting payment statuses.
 */
function process({ id, config }) {
    return restClient_1.RestClient.fetch(`/v1/orders/${id}/process`, Object.assign({ method: 'POST', headers: {
            'Authorization': `Bearer ${config.accessToken}`,
        } }, config.options));
}
