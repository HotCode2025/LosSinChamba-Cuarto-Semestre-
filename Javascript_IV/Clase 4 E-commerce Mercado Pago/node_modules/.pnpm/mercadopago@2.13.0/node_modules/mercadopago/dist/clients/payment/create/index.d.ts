import type { PaymentCreateClient } from './types';
import type { PaymentResponse } from '../commonTypes';
/**
 * Create a new payment.
 *
 * @param body   - Payment creation payload (amount, payer, method, etc.).
 * @param config - SDK configuration including the access token.
 * @returns The full payment resource as persisted by the API.
 */
export default function create({ body, config }: PaymentCreateClient): Promise<PaymentResponse>;
