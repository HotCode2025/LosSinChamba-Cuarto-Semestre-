/**
 * Refund order operation -- sends `POST /v1/orders/{id}/refund`.
 *
 * @module clients/order/refund
 */
import { OrderRefundClient } from './types';
import { OrderResponse } from '../commonTypes';
/**
 * Refund an order (total or partial).
 *
 * Omit the body for a full refund of all transactions. Provide
 * specific transaction IDs and amounts for a partial refund.
 *
 * @returns The updated order including the new refund records.
 */
export default function refund({ id, body, config }: OrderRefundClient): Promise<OrderResponse>;
