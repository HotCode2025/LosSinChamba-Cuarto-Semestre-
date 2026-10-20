"use strict";
/**
 * Implementation of the "get subscription" operation.
 *
 * Sends a GET to `/preapproval/{id}` and returns the full
 * subscription resource.
 *
 * @module clients/preApproval/get
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = get;
const restClient_1 = require("../../../utils/restClient");
/**
 * Retrieve an existing subscription by its unique identifier.
 *
 * @returns The full subscription resource.
 */
function get({ id, config }) {
    return restClient_1.RestClient.fetch(`/preapproval/${id}`, Object.assign({ method: 'GET', headers: {
            'Authorization': `Bearer ${config.accessToken}`,
        } }, config.options));
}
