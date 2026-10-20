/**
 * Implementation of the customer removal operation.
 *
 * Sends a DELETE request to `/v1/customers/:id` to remove an existing
 * customer from MercadoPago.
 *
 * @module clients/customer/remove
 */
import type { CustomerResponse } from '../commonTypes';
import type { CustomerRemoveClient } from './types';
/**
 * Remove a customer by its unique identifier.
 *
 * @returns The customer record that was deleted.
 */
export default function remove({ customerId, config }: CustomerRemoveClient): Promise<CustomerResponse>;
