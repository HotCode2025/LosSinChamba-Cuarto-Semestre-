"use strict";
/**
 * Implementation of the "create subscription" operation.
 *
 * Sends a POST to `/preapproval/` and returns the newly created
 * subscription, including the `init_point` authorization URL.
 *
 * @module clients/preApproval/create
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = create;
const restClient_1 = require("../../../utils/restClient");
/**
 * Create a new recurring subscription via the MercadoPago API.
 *
 * @returns The created subscription with its server-assigned `id` and `init_point`.
 */
function create({ body, config }) {
    return restClient_1.RestClient.fetch('/preapproval/', Object.assign({ method: 'POST', headers: {
            'Authorization': `Bearer ${config.accessToken}`,
        }, body: JSON.stringify(body) }, config.options));
}
