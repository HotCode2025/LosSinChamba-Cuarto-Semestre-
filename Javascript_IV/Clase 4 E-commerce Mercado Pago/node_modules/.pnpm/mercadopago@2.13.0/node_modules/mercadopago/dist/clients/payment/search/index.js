"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = search;
/**
 * Search-payments operation.
 *
 * Sends a `GET /v1/payments/search` request with the supplied query
 * parameters and returns a paginated list of matching payments.
 *
 * @module clients/payment/search
 */
const restClient_1 = require("../../../utils/restClient");
/**
 * Search for payments belonging to the authenticated collector.
 *
 * All properties in `options` are forwarded as query-string parameters,
 * allowing pagination, sorting, date-range filtering, and custom filters.
 *
 * @param options - Search filters, sorting, and pagination parameters.
 * @param config  - SDK configuration including the access token.
 * @returns Paginated search results with paging metadata.
 */
function search({ options, config }) {
    return restClient_1.RestClient.fetch('/v1/payments/search', Object.assign({ headers: {
            'Authorization': `Bearer ${config.accessToken}`
        }, queryParams: Object.assign({}, options) }, config.options));
}
