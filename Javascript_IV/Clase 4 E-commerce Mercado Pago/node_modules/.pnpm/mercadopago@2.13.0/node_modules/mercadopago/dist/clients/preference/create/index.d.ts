/**
 * Implementation of the "create preference" operation.
 *
 * Sends a POST to `/checkout/preferences/` and returns the newly
 * created preference, including the `init_point` checkout URL.
 *
 * @module clients/preference/create
 */
import type { PreferenceCreateClient } from './types';
import type { PreferenceResponse } from '../../../clients/preference/commonTypes';
/**
 * Create a new Checkout Pro preference via the MercadoPago API.
 *
 * @returns The created preference with its server-assigned `id` and `init_point`.
 */
export default function create({ body, config }: PreferenceCreateClient): Promise<PreferenceResponse>;
