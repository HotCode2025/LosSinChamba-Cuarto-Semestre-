"use strict";
/**
 * Implementation of the create-payment-intent operation for Point devices.
 *
 * Sends a `POST /point/integration-api/devices/{device_id}/payment-intents`
 * request to instruct the terminal to begin a new payment flow.
 *
 * @module point/createPaymentIntent
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createPaymentIntent;
const restClient_1 = require("../../../utils/restClient");
/**
 * Create a payment intent on the specified Point device.
 *
 * @returns The newly created payment intent with its current state.
 */
function createPaymentIntent({ device_id, request, config }) {
    return restClient_1.RestClient.fetch(`/point/integration-api/devices/${device_id}/payment-intents`, Object.assign({ method: 'POST', headers: {
            Authorization: `Bearer ${config.accessToken}`,
        }, body: JSON.stringify(request) }, config.options));
}
