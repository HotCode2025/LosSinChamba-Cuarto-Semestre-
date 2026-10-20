/**
 * Implementation of the get-payment-methods operation.
 *
 * Sends a `GET /v1/payment_methods` request to retrieve all payment
 * methods available for the authenticated seller's site/country.
 *
 * @module paymentMethod/get
 */
import type { PaymentMethodGetClient, PaymentMethodResponse } from './types';
/**
 * Retrieve the list of available payment methods.
 *
 * @returns An array of payment methods with their configuration and constraints.
 */
export default function get({ config }: PaymentMethodGetClient): Promise<PaymentMethodResponse[]>;
