"use strict";
/**
 * Subscription Plan (PreApprovalPlan) client for the MercadoPago Node SDK.
 *
 * A PreApprovalPlan is a reusable template that defines the billing terms
 * (frequency, amount, free trial, allowed payment methods) for recurring
 * subscriptions. Individual {@link PreApproval} subscriptions can reference
 * a plan so they inherit its configuration. This module exposes CRUD + search
 * operations against the `/preapproval_plan` endpoint.
 *
 * @module clients/preApprovalPlan
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreApprovalPlan = void 0;
const get_1 = __importDefault(require("./get"));
const create_1 = __importDefault(require("./create"));
const update_1 = __importDefault(require("./update"));
const search_1 = __importDefault(require("./search"));
/**
 * Client for managing subscription plan templates.
 *
 * Plans define billing rules (frequency, amount, trial) that are shared
 * across many individual subscriptions. The `init_point` URL lets
 * buyers subscribe to a plan directly.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference Documentation }.
 */
class PreApprovalPlan {
    constructor(mercadoPagoConfig) {
        this.config = mercadoPagoConfig;
    }
    /**
     * Create a new subscription plan template.
     *
     * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/preapprovalplan/create.ts Usage Example }.
     */
    create({ body, requestOptions }) {
        this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
        return (0, create_1.default)({ body, config: this.config });
    }
    /**
     * Retrieve an existing subscription plan by its unique identifier.
     *
     * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/preapprovalplan/get.ts Usage Example }.
     */
    get({ preApprovalPlanId, requestOptions }) {
        this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
        return (0, get_1.default)({ id: preApprovalPlanId, config: this.config });
    }
    /**
     * Update an existing subscription plan (e.g. change amount, status, or allowed payment methods).
     *
     * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/preapprovalplan/update.ts Usage Example }.
     */
    update({ id, updatePreApprovalPlanRequest, requestOptions }) {
        this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
        return (0, update_1.default)({ id, updatePreApprovalPlanRequest, config: this.config });
    }
    /**
     * Search subscription plans using filters such as status or free-text query.
     *
     * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/preapprovalplan/search.ts Usage Example }.
     */
    search(preApprovalPlanSearchData = {}) {
        const { options, requestOptions } = preApprovalPlanSearchData;
        this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
        return (0, search_1.default)({ options, config: this.config });
    }
}
exports.PreApprovalPlan = PreApprovalPlan;
