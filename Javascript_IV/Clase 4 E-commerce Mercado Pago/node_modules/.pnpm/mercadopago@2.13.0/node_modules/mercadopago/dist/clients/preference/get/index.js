"use strict";
/**
 * Implementation of the "get preference" operation.
 *
 * Sends a GET to `/checkout/preferences/{id}` and returns the full
 * preference resource.
 *
 * @module clients/preference/get
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = get;
const restClient_1 = require("../../../utils/restClient");
/**
 * Retrieve an existing Checkout Pro preference by its unique identifier.
 *
 * @returns The full preference resource.
 */
function get({ id, config }) {
    return restClient_1.RestClient.fetch(`/checkout/preferences/${id}`, Object.assign({ headers: {
            'Authorization': `Bearer ${config.accessToken}`
        } }, config.options));
}
