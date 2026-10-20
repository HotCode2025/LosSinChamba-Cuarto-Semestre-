"use strict";
/**
 * Capture order operation -- sends `POST /v1/orders/{id}/capture`.
 *
 * @module clients/order/capture
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = capture;
const restClient_1 = require("../../../utils/restClient");
/**
 * Capture an authorized order, confirming the payment settlement.
 *
 * Only applicable to orders created with `capture_mode: "manual"`.
 *
 * @returns The updated order with captured payment status.
 */
function capture({ id, config }) {
    return restClient_1.RestClient.fetch(`/v1/orders/${id}/capture`, Object.assign({ method: 'POST', headers: {
            'Authorization': `Bearer ${config.accessToken}`,
        } }, config.options));
}
