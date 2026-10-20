"use strict";
/**
 * Implementation of the "update subscription plan" operation.
 *
 * Sends a PUT to `/preapproval_plan/{id}` with the modified fields
 * and returns the updated plan resource.
 *
 * @module clients/preApprovalPlan/update
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = update;
const restClient_1 = require("../../../utils/restClient");
/**
 * Update an existing subscription plan template.
 *
 * @returns The updated plan resource.
 */
function update({ id, updatePreApprovalPlanRequest, config }) {
    return restClient_1.RestClient.fetch(`/preapproval_plan/${id}`, Object.assign({ method: 'PUT', headers: {
            'Authorization': `Bearer ${config.accessToken}`,
        }, body: JSON.stringify(updatePreApprovalPlanRequest) }, config.options));
}
