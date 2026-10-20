"use strict";
/**
 * Implementation of the cancel-payment-intent operation for Point devices.
 *
 * Sends a `DELETE /point/integration-api/devices/{device_id}/payment-intents/{id}`
 * request to abort a pending payment intent on the terminal.
 *
 * @module point/cancelPaymentIntent
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = cancelPaymentIntent;
const restClient_1 = require("../../../utils/restClient");
/**
 * Cancel a pending payment intent on the specified Point device.
 *
 * @returns Confirmation containing the cancelled payment intent ID.
 */
function cancelPaymentIntent({ device_id, payment_intent_id, config }) {
    return restClient_1.RestClient.fetch(`/point/integration-api/devices/${device_id}/payment-intents/${payment_intent_id}`, Object.assign({ method: 'DELETE', headers: {
            Authorization: `Bearer ${config.accessToken}`,
        } }, config.options));
}
