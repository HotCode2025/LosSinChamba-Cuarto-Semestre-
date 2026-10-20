"use strict";
/**
 * Implementation of the customer creation operation.
 *
 * Sends a POST request to `/v1/customers` to register a new customer
 * in MercadoPago.
 *
 * @module clients/customer/create
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = create;
const restClient_1 = require("../../../utils/restClient");
/**
 * Create a new customer via the MercadoPago API.
 *
 * @returns The newly created customer record.
 */
function create({ body, config }) {
    return restClient_1.RestClient.fetch('/v1/customers', Object.assign({ headers: {
            'Authorization': `Bearer ${config.accessToken}`
        }, body: JSON.stringify(body), method: 'POST' }, config.options));
}
