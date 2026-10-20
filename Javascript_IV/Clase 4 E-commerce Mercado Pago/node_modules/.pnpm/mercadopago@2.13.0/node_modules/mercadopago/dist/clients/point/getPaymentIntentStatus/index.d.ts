/**
 * Implementation of the get-payment-intent-status operation.
 *
 * Sends a `GET /point/integration-api/payment-intents/{id}/events` request
 * to retrieve the latest status event for a specific payment intent.
 *
 * @module point/getPaymentIntentStatus
 */
import type { PaymentIntentStatusResponse } from '../commonTypes';
import type { PointGetPaymentIntentStatusClient } from './types';
/**
 * Retrieve the current status of a payment intent.
 *
 * @returns The status and creation timestamp of the latest event.
 */
export default function getPaymentIntentStatus({ payment_intent_id, config }: PointGetPaymentIntentStatusClient): Promise<PaymentIntentStatusResponse>;
