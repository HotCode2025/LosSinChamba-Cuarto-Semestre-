"use strict";
/**
 * Implementation of the list-identification-types operation.
 *
 * Sends a `GET /v1/identification_types` request to retrieve the
 * accepted identification document types for the seller's country.
 *
 * @module identificationType/list
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = list;
const restClient_1 = require("../../../utils/restClient");
/**
 * Retrieve all accepted identification document types.
 *
 * @returns An array of identification types with their constraints.
 */
function list({ config }) {
    return restClient_1.RestClient.fetch('/v1/identification_types', Object.assign({ headers: {
            'Authorization': `Bearer ${config.accessToken}`
        } }, config.options));
}
