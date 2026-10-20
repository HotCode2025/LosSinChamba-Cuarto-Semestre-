import type { PaymentResponse } from '../commonTypes';
import type { PaymentGetClient } from './types';
/**
 * Retrieve a single payment by its unique identifier.
 *
 * @param id     - Payment identifier to look up.
 * @param config - SDK configuration including the access token.
 * @returns The full payment resource.
 */
export default function get({ id, config }: PaymentGetClient): Promise<PaymentResponse>;
