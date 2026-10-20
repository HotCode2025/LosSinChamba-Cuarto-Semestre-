/**
 * Create order operation -- sends `POST /v1/orders`.
 *
 * @module clients/order/create
 */
import { OrderCreateClient } from './types';
import { OrderResponse } from '../commonTypes';
/**
 * Create a new order via the MercadoPago Orders API.
 *
 * @returns The newly created order including its server-assigned `id` and initial `status`.
 */
export default function create({ body, config }: OrderCreateClient): Promise<OrderResponse>;
