"use strict";
/**
 * Implementation of the create-card-token operation.
 *
 * Sends a `POST /v1/card_tokens` request to tokenize card data and
 * return a single-use token for PCI-compliant payment creation.
 *
 * @module cardToken/create
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = create;
const restClient_1 = require("../../../utils/restClient");
/**
 * Create a card token via `POST /v1/card_tokens`.
 *
 * @returns The card token response containing the token ID and card metadata.
 */
function create({ body, config }) {
    return restClient_1.RestClient.fetch('/v1/card_tokens', Object.assign({ headers: {
            'Authorization': `Bearer ${config.accessToken}`
        }, body: JSON.stringify(body), method: 'POST' }, config.options));
}
