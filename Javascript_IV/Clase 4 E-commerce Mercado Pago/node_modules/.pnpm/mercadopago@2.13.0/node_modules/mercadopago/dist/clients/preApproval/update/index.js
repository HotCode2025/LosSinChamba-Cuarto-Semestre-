"use strict";
/**
 * Implementation of the "update subscription" operation.
 *
 * Sends a PUT to `/preapproval/{id}` with the modified fields
 * and returns the updated subscription resource.
 *
 * @module clients/preApproval/update
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = update;
const restClient_1 = require("../../../utils/restClient");
/**
 * Update an existing subscription (e.g. change status, amount, or card token).
 *
 * @returns The updated subscription resource.
 */
function update({ id, body, config }) {
    return restClient_1.RestClient.fetch(`/preapproval/${id}`, Object.assign({ method: 'PUT', headers: {
            'Authorization': `Bearer ${config.accessToken}`,
        }, body: JSON.stringify(body) }, config.options));
}
