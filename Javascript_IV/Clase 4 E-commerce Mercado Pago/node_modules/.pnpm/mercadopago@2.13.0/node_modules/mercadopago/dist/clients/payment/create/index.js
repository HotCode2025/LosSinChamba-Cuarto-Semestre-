"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = create;
/**
 * Create-payment operation.
 *
 * Sends a `POST /v1/payments` request to the MercadoPago API and returns
 * the newly created {@link PaymentResponse}.
 *
 * @module clients/payment/create
 */
const restClient_1 = require("../../../utils/restClient");
/**
 * Create a new payment.
 *
 * @param body   - Payment creation payload (amount, payer, method, etc.).
 * @param config - SDK configuration including the access token.
 * @returns The full payment resource as persisted by the API.
 */
function create({ body, config }) {
    return restClient_1.RestClient.fetch('/v1/payments', Object.assign({ method: 'POST', headers: {
            'Authorization': `Bearer ${config.accessToken}`
        }, body: JSON.stringify(body) }, config.options));
}
