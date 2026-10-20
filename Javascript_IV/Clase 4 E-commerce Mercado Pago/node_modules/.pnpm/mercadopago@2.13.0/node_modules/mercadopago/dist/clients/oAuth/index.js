"use strict";
/**
 * OAuth client for the MercadoPago API.
 *
 * Provides methods for the full OAuth 2.0 authorization-code flow:
 * generating the authorization URL, exchanging an authorization code for
 * tokens, and refreshing expired access tokens.
 *
 * @module oAuth
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OAuth = void 0;
const create_1 = __importDefault(require("./create"));
const refresh_1 = __importDefault(require("./refresh"));
const getAuthorizationURL_1 = __importDefault(require("./getAuthorizationURL"));
/**
 * Client facade for MercadoPago OAuth operations.
 *
 * Use this class to authenticate third-party sellers via the OAuth 2.0
 * authorization-code grant, obtain access/refresh token pairs, and
 * refresh tokens before they expire.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/authentication/oauth/_oauth_token/post Documentation }.
 */
class OAuth {
    constructor(mercadoPagoConfig) {
        this.config = mercadoPagoConfig;
    }
    /**
     * Exchange an authorization code for an access token and refresh token.
     *
     * Call this after the seller is redirected back to your `redirect_uri`
     * with a temporary `code` query parameter.
     *
     * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/oauth/create.ts Usage Example }.
     */
    create({ body, requestOptions }) {
        this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
        return (0, create_1.default)({ body, config: this.config });
    }
    /**
     * Obtain a new access token using a previously issued refresh token.
     *
     * Access tokens have a limited lifetime; call this method to rotate
     * credentials without requiring the seller to re-authorize.
     *
     * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/oauth/refresh.ts Usage Example }.
     */
    refresh({ body, requestOptions }) {
        this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
        return (0, refresh_1.default)({ body, config: this.config });
    }
    /**
     * Build the MercadoPago authorization URL to which the seller should be redirected.
     *
     * The returned URL points to `auth.mercadopago.com` and includes the
     * required OAuth query parameters. Redirect the seller to this URL so
     * they can grant your application the requested permissions.
     *
     * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/oauth/getAuthorizationURL.ts Usage Example }.
     */
    getAuthorizationURL({ options }) {
        return (0, getAuthorizationURL_1.default)({ options });
    }
}
exports.OAuth = OAuth;
