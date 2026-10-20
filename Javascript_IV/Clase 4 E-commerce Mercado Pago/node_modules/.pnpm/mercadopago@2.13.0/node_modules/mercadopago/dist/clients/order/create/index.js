"use strict";
/**
 * Create order operation -- sends `POST /v1/orders`.
 *
 * @module clients/order/create
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = create;
const restClient_1 = require("../../../utils/restClient");
/**
 * Create a new order via the MercadoPago Orders API.
 *
 * @returns The newly created order including its server-assigned `id` and initial `status`.
 */
function create({ body, config }) {
    return restClient_1.RestClient.fetch('/v1/orders', Object.assign({ method: 'POST', headers: {
            'Authorization': `Bearer ${config.accessToken}`
        }, body: JSON.stringify(body) }, config.options));
}
