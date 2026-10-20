/**
 * Update transaction operation -- sends `PUT /v1/orders/{id}/transactions/{transactionId}`.
 *
 * @module clients/order/transaction/update
 */
import { OrderUpdateTransactionClient } from './types';
import { PaymentApiResponse } from '../../commonTypes';
/**
 * Update an existing payment transaction within an order.
 *
 * Replaces the transaction's payment data (amount, payment method)
 * with the values provided in the request body.
 *
 * @returns The updated payment method details.
 */
export default function updateTransaction({ id, transactionId, body, config }: OrderUpdateTransactionClient): Promise<PaymentApiResponse>;
