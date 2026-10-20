"use strict";
/**
 * Search orders operation -- sends `GET /v1/orders` with query parameters.
 *
 * @module clients/order/search
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = search;
const restClient_1 = require("../../../utils/restClient");
/**
 * Search for orders matching the given filters and date range.
 *
 * Builds query-string parameters from the provided options and
 * returns a paginated list of matching orders.
 *
 * @returns A paginated response containing matching orders and paging metadata.
 */
function search({ options, config }) {
    const queryParams = {};
    if (options) {
        for (const [key, value] of Object.entries(options)) {
            if (typeof value !== 'undefined') {
                queryParams[key] = value;
            }
        }
    }
    return restClient_1.RestClient.fetch('/v1/orders', Object.assign({ method: 'GET', headers: {
            'Authorization': `Bearer ${config.accessToken}`,
        }, queryParams }, config.options));
}
