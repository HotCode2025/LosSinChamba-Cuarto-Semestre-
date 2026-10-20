/**
 * Create transaction operation -- sends `POST /v1/orders/{id}/transactions`.
 *
 * @module clients/order/transaction/create
 */
import { TransactionsApiResponse } from '../../commonTypes';
import { OrderCreateTransactionClient } from './types';
/**
 * Add one or more payment transactions to an existing order.
 *
 * @returns The created payment transactions.
 */
export default function createTransaction({ id, body, config }: OrderCreateTransactionClient): Promise<TransactionsApiResponse>;
