"use strict";
/**
 * Implementation of the get-user operation.
 *
 * Sends a `GET /users/me` request to retrieve the profile of the
 * user authenticated by the current access token.
 *
 * @module user/get
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = get;
const restClient_1 = require("../../../utils/restClient");
/**
 * Retrieve the authenticated user's profile via `GET /users/me`.
 *
 * @returns The user profile with personal data, reputation, and account status.
 */
function get({ config }) {
    return restClient_1.RestClient.fetch('/users/me', Object.assign({ headers: {
            'Authorization': `Bearer ${config.accessToken}`
        } }, config.options));
}
