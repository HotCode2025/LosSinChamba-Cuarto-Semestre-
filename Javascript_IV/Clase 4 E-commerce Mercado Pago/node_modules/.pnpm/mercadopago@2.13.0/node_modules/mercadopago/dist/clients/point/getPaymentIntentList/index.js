"use strict";
/**
 * Implementation of the get-payment-intent-list operation.
 *
 * Sends a `GET /point/integration-api/payment-intents/events` request
 * to retrieve lifecycle events for all payment intents.
 *
 * @module point/getPaymentIntentList
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getPaymentIntentList;
const restClient_1 = require("../../../utils/restClient");
/**
 * Retrieve payment intent events, optionally filtered by date range.
 *
 * @returns A list of payment intent lifecycle events.
 */
function getPaymentIntentList({ options, config }) {
    return restClient_1.RestClient.fetch('/point/integration-api/payment-intents/events', Object.assign({ method: 'GET', headers: {
            Authorization: `Bearer ${config.accessToken}`,
        }, queryParams: Object.assign({}, options) }, config.options));
}
