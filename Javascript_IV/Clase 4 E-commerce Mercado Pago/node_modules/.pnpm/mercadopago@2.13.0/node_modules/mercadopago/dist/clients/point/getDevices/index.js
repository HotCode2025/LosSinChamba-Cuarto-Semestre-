"use strict";
/**
 * Implementation of the get-devices operation for Point terminals.
 *
 * Sends a `GET /point/integration-api/devices` request to retrieve the
 * list of Point devices registered to the authenticated seller.
 *
 * @module point/getDevices
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getDevices;
const restClient_1 = require("../../../utils/restClient");
/**
 * Retrieve the paginated list of Point devices.
 *
 * @returns A paginated response containing the matched devices.
 */
function getDevices({ options, config }) {
    return restClient_1.RestClient.fetch('/point/integration-api/devices', Object.assign({ method: 'GET', headers: {
            Authorization: `Bearer ${config.accessToken}`,
        }, queryParams: Object.assign({}, options) }, config.options));
}
