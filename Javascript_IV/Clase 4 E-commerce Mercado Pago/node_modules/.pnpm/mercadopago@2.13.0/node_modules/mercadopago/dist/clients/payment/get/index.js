"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = get;
/**
 * Get-payment operation.
 *
 * Sends a `GET /v1/payments/:id` request to the MercadoPago API and
 * returns the full {@link PaymentResponse} for the given payment.
 *
 * @module clients/payment/get
 */
const restClient_1 = require("../../../utils/restClient");
/**
 * Retrieve a single payment by its unique identifier.
 *
 * @param id     - Payment identifier to look up.
 * @param config - SDK configuration including the access token.
 * @returns The full payment resource.
 */
function get({ id, config }) {
    return restClient_1.RestClient.fetch(`/v1/payments/${id}`, Object.assign({ headers: {
            'Authorization': `Bearer ${config.accessToken}`,
        } }, config.options));
}
