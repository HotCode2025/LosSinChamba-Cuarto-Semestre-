"use strict";
/**
 * Implementation of the get-invoice operation.
 *
 * Sends a `GET /authorized_payments/{id}` request to retrieve a single
 * subscription invoice by its unique identifier.
 *
 * @module invoice/get
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = get;
const restClient_1 = require("../../../utils/restClient");
/**
 * Retrieve a subscription invoice (authorized payment) by ID.
 *
 * @returns The invoice details including status, amount, and payer information.
 */
function get({ id, config }) {
    return restClient_1.RestClient.fetch(`/authorized_payments/${id}`, Object.assign({ method: 'GET', headers: {
            'Authorization': `Bearer ${config.accessToken}`,
        } }, config.options));
}
