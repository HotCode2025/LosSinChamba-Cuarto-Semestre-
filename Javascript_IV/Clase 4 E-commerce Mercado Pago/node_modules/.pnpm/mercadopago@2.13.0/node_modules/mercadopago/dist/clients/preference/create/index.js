"use strict";
/**
 * Implementation of the "create preference" operation.
 *
 * Sends a POST to `/checkout/preferences/` and returns the newly
 * created preference, including the `init_point` checkout URL.
 *
 * @module clients/preference/create
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = create;
const restClient_1 = require("../../../utils/restClient");
/**
 * Create a new Checkout Pro preference via the MercadoPago API.
 *
 * @returns The created preference with its server-assigned `id` and `init_point`.
 */
function create({ body, config }) {
    return restClient_1.RestClient.fetch('/checkout/preferences/', Object.assign({ method: 'POST', headers: {
            'Authorization': `Bearer ${config.accessToken}`,
        }, body: JSON.stringify(body) }, config.options));
}
