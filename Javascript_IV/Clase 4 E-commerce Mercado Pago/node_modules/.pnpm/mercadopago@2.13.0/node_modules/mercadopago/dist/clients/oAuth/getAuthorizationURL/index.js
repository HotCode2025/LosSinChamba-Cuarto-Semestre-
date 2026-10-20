"use strict";
/**
 * Implementation of the OAuth authorization URL builder.
 *
 * Constructs the full `https://auth.mercadopago.com/authorization` URL
 * with the required query parameters so the seller can grant permissions
 * to the integrator's application.
 *
 * @module oAuth/getAuthorizationURL
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getAuthorizationURL;
const restClient_1 = require("../../../utils/restClient");
/**
 * Build and return the MercadoPago OAuth authorization URL as a string.
 *
 * @returns Fully-qualified authorization URL including all query parameters.
 */
function getAuthorizationURL({ options }) {
    const defaultOptions = Object.assign(Object.assign({}, options), { response_type: 'code', platform_id: 'mp' });
    const AUTH_HOST = 'https://auth.mercadopago.com/authorization';
    return restClient_1.RestClient.appendQueryParamsToUrl(AUTH_HOST, defaultOptions);
}
