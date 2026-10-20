"use strict";
/**
 * Get order operation -- sends `GET /v1/orders/{id}`.
 *
 * @module clients/order/get
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = get;
const restClient_1 = require("../../../utils/restClient");
/**
 * Retrieve a single order by its unique identifier.
 *
 * @returns The full order representation including transactions and status.
 */
function get({ id, config }) {
    return restClient_1.RestClient.fetch(`/v1/orders/${id}`, Object.assign({ method: 'GET', headers: {
            'Authorization': `Bearer ${config.accessToken}`,
        } }, config.options));
}
