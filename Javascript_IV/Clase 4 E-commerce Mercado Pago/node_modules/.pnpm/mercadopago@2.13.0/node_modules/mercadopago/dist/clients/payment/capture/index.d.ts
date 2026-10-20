import type { PaymentResponse } from '../commonTypes';
import type { PaymentCaptureClient } from './types';
/**
 * Capture an authorized payment.
 *
 * @param id                 - Identifier of the authorized payment to capture.
 * @param transaction_amount - Amount to capture; omit for a full capture, provide a
 *                             lower value for a partial capture.
 * @param config             - SDK configuration including the access token.
 * @returns The updated payment resource with `captured: true`.
 */
export default function capture({ id, transaction_amount, config }: PaymentCaptureClient): Promise<PaymentResponse>;
