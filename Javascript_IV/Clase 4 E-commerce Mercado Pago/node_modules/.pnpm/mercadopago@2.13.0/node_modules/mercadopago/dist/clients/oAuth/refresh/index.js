"use strict";
/**
 * Implementation of the OAuth token refresh operation.
 *
 * Sends a `POST /oauth/token` request with `grant_type=refresh_token`
 * to obtain a new access token without requiring the seller to re-authorize.
 *
 * @module oAuth/refresh
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = refresh;
const restClient_1 = require("../../../utils/restClient");
/**
 * Refresh an OAuth access token via `POST /oauth/token`.
 *
 * @returns The OAuth response containing the new access token, refresh token, and metadata.
 */
function refresh({ body, config }) {
    const defaultRequest = Object.assign(Object.assign({}, body), { 'grant_type': 'refresh_token' });
    return restClient_1.RestClient.fetch('/oauth/token', Object.assign({ method: 'POST', headers: {
            'Authorization': `Bearer ${config.accessToken}`,
        }, body: JSON.stringify(defaultRequest) }, config.options));
}
