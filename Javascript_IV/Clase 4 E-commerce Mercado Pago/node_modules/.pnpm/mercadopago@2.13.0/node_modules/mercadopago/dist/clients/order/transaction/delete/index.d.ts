/**
 * Delete transaction operation -- sends `DELETE /v1/orders/{id}/transactions/{transactionId}`.
 *
 * @module clients/order/transaction/delete
 */
import { OrderDeleteTransactionClient } from './types';
import { ApiResponse } from '../../../../types';
/**
 * Remove a payment transaction from an order.
 *
 * @returns A bare API response (status and headers only; no body).
 */
export default function deleteTransaction({ id, transactionId, config }: OrderDeleteTransactionClient): Promise<ApiResponse>;
