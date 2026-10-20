"use strict";
/**
 * Implementation of the "create subscription plan" operation.
 *
 * Sends a POST to `/preapproval_plan/` and returns the newly created
 * plan template, including the `init_point` subscription URL.
 *
 * @module clients/preApprovalPlan/create
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = create;
const restClient_1 = require("../../../utils/restClient");
/**
 * Create a new subscription plan template via the MercadoPago API.
 *
 * @returns The created plan with its server-assigned `id` and `init_point`.
 */
function create({ body, config }) {
    return restClient_1.RestClient.fetch('/preapproval_plan/', Object.assign({ method: 'POST', headers: {
            'Authorization': `Bearer ${config.accessToken}`,
        }, body: JSON.stringify(body) }, config.options));
}
