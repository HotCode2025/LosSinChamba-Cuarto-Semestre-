/**
 * Implementation of the search-payment-intent operation.
 *
 * Sends a `GET /point/integration-api/payment-intents/{id}` request to
 * retrieve the full details of a specific payment intent.
 *
 * @module point/searchPaymentIntent
 */
import type { PaymentIntentResponse } from '../commonTypes';
import type { PointSearchPaymentIntentClient } from './types';
/**
 * Retrieve the details of a payment intent by its ID.
 *
 * @returns The payment intent details including state, amount, and device info.
 */
export default function searchPaymentIntent({ payment_intent_id, config }: PointSearchPaymentIntentClient): Promise<PaymentIntentResponse>;
