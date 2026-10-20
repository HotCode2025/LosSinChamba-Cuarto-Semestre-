/**
 * Implementation of the "create subscription" operation.
 *
 * Sends a POST to `/preapproval/` and returns the newly created
 * subscription, including the `init_point` authorization URL.
 *
 * @module clients/preApproval/create
 */
import type { PreApprovalCreateClient } from './types';
import type { PreApprovalResponse } from '../../../clients/preApproval/commonTypes';
/**
 * Create a new recurring subscription via the MercadoPago API.
 *
 * @returns The created subscription with its server-assigned `id` and `init_point`.
 */
export default function create({ body, config }: PreApprovalCreateClient): Promise<PreApprovalResponse>;
