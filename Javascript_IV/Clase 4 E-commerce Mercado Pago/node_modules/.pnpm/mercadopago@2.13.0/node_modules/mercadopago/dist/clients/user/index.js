"use strict";
/**
 * User client for the MercadoPago API.
 *
 * Provides a method to retrieve the profile of the user (seller)
 * authenticated by the current access token.
 *
 * @module user
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const get_1 = __importDefault(require("./get"));
/**
 * Client facade for retrieving the authenticated MercadoPago user profile.
 *
 * Use this class to obtain account details such as name, email, site,
 * reputation scores, and account status for the user who owns the
 * current access token.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference Documentation }.
 */
class User {
    constructor(mercadoPagoConfig) {
        this.config = mercadoPagoConfig;
    }
    /**
     * Retrieve the profile of the authenticated user.
     *
     * Calls the `GET /users/me` endpoint and returns comprehensive account
     * information including personal data, reputation, and status.
     *
     * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/examples/user/get/get.ts Usage Example }.
     */
    get(userGetData = {}) {
        const { requestOptions } = userGetData;
        this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
        return (0, get_1.default)({ config: this.config });
    }
}
exports.User = User;
