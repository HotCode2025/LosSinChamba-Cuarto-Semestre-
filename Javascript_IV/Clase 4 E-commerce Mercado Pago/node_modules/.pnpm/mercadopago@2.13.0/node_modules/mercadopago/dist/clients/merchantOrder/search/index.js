"use strict";
/**
 * Implementation of the search-merchant-orders operation.
 *
 * Sends a `GET /merchant_orders/search` request to query orders
 * matching the given filter criteria.
 *
 * @module merchantOrder/search
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = search;
const restClient_1 = require("../../../utils/restClient");
/**
 * Search merchant orders with optional filters.
 *
 * @returns A paginated page of merchant orders matching the criteria.
 */
function search({ options, config }) {
    return restClient_1.RestClient.fetch('/merchant_orders/search', Object.assign({ headers: {
            'Authorization': `Bearer ${config.accessToken}`
        }, queryParams: Object.assign({}, options) }, config.options));
}
