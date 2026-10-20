"use strict";
/**
 * Implementation of the customer search operation.
 *
 * Sends a GET request to `/v1/customers/search` with optional query
 * parameters to find customers matching the given filters.
 *
 * @module clients/customer/search
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = search;
const restClient_1 = require("../../../utils/restClient");
/**
 * Search for customers using optional filters and pagination.
 *
 * @returns A paginated page of customer results.
 */
function search({ options, config }) {
    return restClient_1.RestClient.fetch('/v1/customers/search', Object.assign({ headers: {
            'Authorization': `Bearer ${config.accessToken}`
        }, queryParams: Object.assign({}, options) }, config.options));
}
