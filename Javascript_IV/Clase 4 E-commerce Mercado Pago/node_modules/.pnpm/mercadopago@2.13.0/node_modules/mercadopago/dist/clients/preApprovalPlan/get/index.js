"use strict";
/**
 * Implementation of the "get subscription plan" operation.
 *
 * Sends a GET to `/preapproval_plan/{id}` and returns the full
 * plan resource.
 *
 * @module clients/preApprovalPlan/get
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = get;
const restClient_1 = require("../../../utils/restClient");
/**
 * Retrieve an existing subscription plan by its unique identifier.
 *
 * @returns The full plan resource.
 */
function get({ id, config }) {
    return restClient_1.RestClient.fetch(`/preapproval_plan/${id}`, Object.assign({ headers: {
            'Authorization': `Bearer ${config.accessToken}`
        } }, config.options));
}
