"use strict";
/**
 * Implementation of the "search preferences" operation.
 *
 * Sends a GET to `/checkout/preferences/search` with optional query
 * parameters and returns a paginated list of matching preferences.
 *
 * @module clients/preference/search
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = search;
const restClient_1 = require("../../../utils/restClient");
/**
 * Search Checkout Pro preferences using optional filters.
 *
 * @returns A paginated result containing matching preference summaries.
 */
function search({ options, config }) {
    return restClient_1.RestClient.fetch('/checkout/preferences/search', Object.assign({ headers: {
            'Authorization': `Bearer ${config.accessToken}`,
        }, queryParams: Object.assign({}, options) }, config.options));
}
