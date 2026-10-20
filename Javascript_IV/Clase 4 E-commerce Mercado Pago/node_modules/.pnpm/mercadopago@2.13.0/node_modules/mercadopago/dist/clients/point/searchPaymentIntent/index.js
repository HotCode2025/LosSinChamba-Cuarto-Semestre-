"use strict";
/**
 * Implementation of the search-payment-intent operation.
 *
 * Sends a `GET /point/integration-api/payment-intents/{id}` request to
 * retrieve the full details of a specific payment intent.
 *
 * @module point/searchPaymentIntent
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = searchPaymentIntent;
const restClient_1 = require("../../../utils/restClient");
/**
 * Retrieve the details of a payment intent by its ID.
 *
 * @returns The payment intent details including state, amount, and device info.
 */
function searchPaymentIntent({ payment_intent_id, config }) {
    return restClient_1.RestClient.fetch(`/point/integration-api/payment-intents/${payment_intent_id}`, Object.assign({ method: 'GET', headers: {
            Authorization: `Bearer ${config.accessToken}`,
        } }, config.options));
}
