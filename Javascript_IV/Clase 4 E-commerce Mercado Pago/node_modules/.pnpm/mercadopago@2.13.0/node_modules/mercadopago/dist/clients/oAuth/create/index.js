"use strict";
/**
 * Implementation of the OAuth token creation (authorization-code exchange).
 *
 * Sends a `POST /oauth/token` request with `grant_type=authorization_code`
 * to exchange a temporary authorization code for an access/refresh token pair.
 *
 * @module oAuth/create
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = create;
const restClient_1 = require("../../../utils/restClient");
/**
 * Exchange an authorization code for OAuth tokens via `POST /oauth/token`.
 *
 * @returns The OAuth response containing the new access token, refresh token, and metadata.
 */
function create({ body, config }) {
    const defaultRequest = Object.assign(Object.assign({}, body), { 'grant_type': 'authorization_code' });
    return restClient_1.RestClient.fetch('/oauth/token', Object.assign({ method: 'POST', headers: {
            'Authorization': `Bearer ${config.accessToken}`,
        }, body: JSON.stringify(defaultRequest) }, config.options));
}
