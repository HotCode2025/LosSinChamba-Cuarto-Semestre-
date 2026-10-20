"use strict";
/**
 * Implementation of the "search subscription plans" operation.
 *
 * Sends a GET to `/preapproval_plan/search` with optional query
 * parameters and returns a paginated list of matching plans.
 *
 * @module clients/preApprovalPlan/search
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = search;
const restClient_1 = require("../../../utils/restClient");
/**
 * Search subscription plan templates using optional filters.
 *
 * @returns A paginated result containing matching plan records.
 */
function search({ options, config }) {
    return restClient_1.RestClient.fetch('/preapproval_plan/search', Object.assign({ headers: {
            'Authorization': `Bearer ${config.accessToken}`,
        }, queryParams: Object.assign({}, options) }, config.options));
}
