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
import type { PreApprovalCreateData } from './create/types';
import type { PreApprovalGetData } from './get/types';
import type { PreApprovalResponse } from './commonTypes';
import type { PreApprovalSearchData, PreApprovalSearchResponse } from './search/types';
import type { PreApprovalUpdateData, PreApprovalUpdateResponse } from './update/types';
import type { MercadoPagoConfig } from '../../mercadoPagoConfig';
/**
 * Client for managing recurring subscriptions (pre-approvals).
 *
 * Each subscription ties a payer to a recurring billing schedule.
 * The `init_point` URL redirects the buyer to authorize the
 * recurring charge.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/online-payments/subscriptions/create-preapproval/post Documentation }.
 */
export declare class PreApproval {
    private config;
    constructor(mercadoPagoConfig: MercadoPagoConfig);
    /**
     * Create a new subscription for a buyer.
     *
     * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/preApproval/create.ts Usage Example }.
     */
    create({ body, requestOptions }: PreApprovalCreateData): Promise<PreApprovalResponse>;
    /**
     * Retrieve an existing subscription by its unique identifier.
     *
     * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/preApproval/get.ts Usage Example }.
     */
    get({ id, requestOptions }: PreApprovalGetData): Promise<PreApprovalResponse>;
    /**
     * Search subscriptions using filters such as status, payer, or plan.
     *
     * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/preApproval/search.ts Usage Example }.
     */
    search(preApprovalSearchData?: PreApprovalSearchData): Promise<PreApprovalSearchResponse>;
    /**
     * Update an existing subscription (e.g. change status, amount, or card token).
     *
     * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/preApproval/update.ts Usage Example }.
     */
    update({ id, body, requestOptions }: PreApprovalUpdateData): Promise<PreApprovalUpdateResponse>;
}
