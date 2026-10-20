/**
 * Implementation of the get-merchant-order operation.
 *
 * Sends a `GET /merchant_orders/{id}` request to retrieve a single
 * merchant order by its unique identifier.
 *
 * @module merchantOrder/get
 */
import type { MerchantOrderResponse } from '../commonTypes';
import type { MerchantOrderGetClient } from './types';
/**
 * Retrieve a merchant order by its ID.
 *
 * @returns The full merchant order including items, payments, and shipments.
 */
export default function get({ merchantOrderId, config }: MerchantOrderGetClient): Promise<MerchantOrderResponse>;
