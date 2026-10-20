"use strict";
/**
 * Implementation of the "update preference" operation.
 *
 * Sends a PUT to `/checkout/preferences/{id}` with the modified fields
 * and returns the updated preference resource.
 *
 * @module clients/preference/update
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = update;
const restClient_1 = require("../../../utils/restClient");
/**
 * Update an existing Checkout Pro preference.
 *
 * @returns The updated preference resource.
 */
function update({ id, updatePreferenceRequest, config }) {
    return restClient_1.RestClient.fetch(`/checkout/preferences/${id}`, Object.assign({ method: 'PUT', headers: {
            'Authorization': `Bearer ${config.accessToken}`,
        }, body: JSON.stringify(updatePreferenceRequest) }, config.options));
}
