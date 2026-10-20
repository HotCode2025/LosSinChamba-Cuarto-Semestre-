"use strict";
/**
 * Implementation of the search-invoices operation.
 *
 * Sends a `GET /authorized_payments/search` request to query subscription
 * invoices matching the given filter criteria.
 *
 * @module invoice/search
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = search;
const restClient_1 = require("../../../utils/restClient");
/**
 * Search subscription invoices with optional filters.
 *
 * @returns A paginated response containing the matched invoices.
 */
function search({ options, config }) {
    return restClient_1.RestClient.fetch('/authorized_payments/search', Object.assign({ headers: {
            'Authorization': `Bearer ${config.accessToken}`,
        }, queryParams: Object.assign({}, options) }, config.options));
}
