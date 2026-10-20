"use strict";
/**
 * Implementation of the change-device-operating-mode operation.
 *
 * Sends a `PATCH /point/integration-api/devices/{device_id}` request to
 * switch a Point terminal between integrated (PDV) and standalone modes.
 *
 * @module point/changeDeviceOperatingMode
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = changeDeviceOperatingMode;
const restClient_1 = require("../../../utils/restClient");
/**
 * Change the operating mode of a Point device.
 *
 * @returns Confirmation containing the new operating mode.
 */
function changeDeviceOperatingMode({ device_id, request, config }) {
    return restClient_1.RestClient.fetch(`/point/integration-api/devices/${device_id}`, Object.assign({ method: 'PATCH', headers: {
            Authorization: `Bearer ${config.accessToken}`,
        }, body: JSON.stringify(request) }, config.options));
}
