"use strict";
/**
 * Implementation of the "search subscriptions" operation.
 *
 * Sends a GET to `/preapproval/search` with optional query parameters
 * and returns a paginated list of matching subscriptions.
 *
 * @module clients/preApproval/search
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = search;
const restClient_1 = require("../../../utils/restClient");
/**
 * Search recurring subscriptions using optional filters.
 *
 * @returns A paginated result containing matching subscription records.
 */
function search({ options, config }) {
    return restClient_1.RestClient.fetch('/preapproval/search', Object.assign({ headers: {
            'Authorization': `Bearer ${config.accessToken}`,
        }, queryParams: Object.assign({}, options) }, config.options));
}
