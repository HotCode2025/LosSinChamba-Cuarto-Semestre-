"use strict";
/**
 * Implementation of the get-payment-intent-status operation.
 *
 * Sends a `GET /point/integration-api/payment-intents/{id}/events` request
 * to retrieve the latest status event for a specific payment intent.
 *
 * @module point/getPaymentIntentStatus
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getPaymentIntentStatus;
const restClient_1 = require("../../../utils/restClient");
/**
 * Retrieve the current status of a payment intent.
 *
 * @returns The status and creation timestamp of the latest event.
 */
function getPaymentIntentStatus({ payment_intent_id, config }) {
    return restClient_1.RestClient.fetch(`/point/integration-api/payment-intents/${payment_intent_id}/events`, Object.assign({ method: 'GET', headers: {
            Authorization: `Bearer ${config.accessToken}`,
        } }, config.options));
}
