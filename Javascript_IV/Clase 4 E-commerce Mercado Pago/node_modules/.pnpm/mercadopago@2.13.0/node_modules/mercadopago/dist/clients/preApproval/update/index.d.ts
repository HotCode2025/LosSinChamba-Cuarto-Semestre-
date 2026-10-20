/**
 * Implementation of the "update subscription" operation.
 *
 * Sends a PUT to `/preapproval/{id}` with the modified fields
 * and returns the updated subscription resource.
 *
 * @module clients/preApproval/update
 */
import type { PreApprovalUpdateClient, PreApprovalUpdateResponse } from './types';
/**
 * Update an existing subscription (e.g. change status, amount, or card token).
 *
 * @returns The updated subscription resource.
 */
export default function update({ id, body, config }: PreApprovalUpdateClient): Promise<PreApprovalUpdateResponse>;
