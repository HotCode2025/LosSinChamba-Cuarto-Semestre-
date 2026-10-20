"use strict";
/**
 * Subscription (PreApproval) client for the MercadoPago Node SDK.
 *
 * A PreApproval represents an individual recurring subscription that
 * charges a buyer on a regular schedule. It is optionally linked to a
 * {@link PreApprovalPlan} template that defines the billing terms.
 * This module exposes CRUD + search operations against the
 * `/preapproval` endpoint.
 *
 * @module clients/preApproval
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreApproval = void 0;
const create_1 = __importDefault(require("./create"));
const get_1 = __importDefault(require("./get"));
const search_1 = __importDefault(require("./search"));
const update_1 = __importDefault(require("./update"));
/**
 * Client for managing recurring subscriptions (pre-approvals).
 *
 * Each subscription ties a payer to a recurring billing schedule.
 * The `init_point` URL redirects the buyer to authorize the
 * recurring charge.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/online-payments/subscriptions/create-preapproval/post Documentation }.
 */
class PreApproval {
    constructor(mercadoPagoConfig) {
        this.config = mercadoPagoConfig;
    }
    /**
     * Create a new subscription for a buyer.
     *
     * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/preApproval/create.ts Usage Example }.
     */
    create({ body, requestOptions }) {
        this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
        return (0, create_1.default)({ body, config: this.config });
    }
    /**
     * Retrieve an existing subscription by its unique identifier.
     *
     * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/preApproval/get.ts Usage Example }.
     */
    get({ id, requestOptions }) {
        this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
        return (0, get_1.default)({ id, config: this.config });
    }
    /**
     * Search subscriptions using filters such as status, payer, or plan.
     *
     * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/preApproval/search.ts Usage Example }.
     */
    search(preApprovalSearchData = {}) {
        const { options, requestOptions } = preApprovalSearchData;
        this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
        return (0, search_1.default)({ options, config: this.config });
    }
    /**
     * Update an existing subscription (e.g. change status, amount, or card token).
     *
     * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/preApproval/update.ts Usage Example }.
     */
    update({ id, body, requestOptions }) {
        this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
        return (0, update_1.default)({ id, body, config: this.config });
    }
}
exports.PreApproval = PreApproval;
