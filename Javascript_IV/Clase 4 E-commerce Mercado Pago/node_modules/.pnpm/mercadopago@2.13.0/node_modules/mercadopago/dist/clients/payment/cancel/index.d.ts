import type { PaymentResponse } from '../commonTypes';
import type { PaymentCancelClient } from './types';
/**
 * Cancel a payment that has not yet been approved.
 *
 * @param id     - Identifier of the payment to cancel.
 * @param config - SDK configuration including the access token.
 * @returns The updated payment resource with status `cancelled`.
 */
export default function cancel({ id, config }: PaymentCancelClient): Promise<PaymentResponse>;
