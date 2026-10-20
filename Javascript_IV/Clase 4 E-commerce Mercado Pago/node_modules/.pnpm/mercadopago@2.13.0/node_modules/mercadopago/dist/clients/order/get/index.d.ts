/**
 * Get order operation -- sends `GET /v1/orders/{id}`.
 *
 * @module clients/order/get
 */
import { OrderGetClient } from './types';
import { OrderResponse } from '../commonTypes';
/**
 * Retrieve a single order by its unique identifier.
 *
 * @returns The full order representation including transactions and status.
 */
export default function get({ id, config }: OrderGetClient): Promise<OrderResponse>;
