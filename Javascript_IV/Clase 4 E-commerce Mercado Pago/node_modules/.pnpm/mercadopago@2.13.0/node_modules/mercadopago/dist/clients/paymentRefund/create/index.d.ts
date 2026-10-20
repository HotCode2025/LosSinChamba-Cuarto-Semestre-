/**
 * Implementation of the create-refund operation.
 *
 * Sends a `POST /v1/payments/{payment_id}/refunds` request to create a
 * partial refund on the specified payment.
 *
 * @module paymentRefund/create
 */
import type { PaymentRefundCreateClient } from './types';
import type { RefundResponse } from '../commonTypes';
/**
 * Create a partial refund on the specified payment.
 *
 * @returns The newly created refund with its status and amount.
 */
export default function create({ payment_id, body, config }: PaymentRefundCreateClient): Promise<RefundResponse>;
