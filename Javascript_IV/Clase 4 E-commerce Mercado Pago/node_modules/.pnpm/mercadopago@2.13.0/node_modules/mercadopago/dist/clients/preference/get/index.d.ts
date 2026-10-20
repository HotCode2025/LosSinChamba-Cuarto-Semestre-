/**
 * Implementation of the "get preference" operation.
 *
 * Sends a GET to `/checkout/preferences/{id}` and returns the full
 * preference resource.
 *
 * @module clients/preference/get
 */
import type { PreferenceGetClient } from './types';
import type { PreferenceResponse } from '../../../clients/preference/commonTypes';
/**
 * Retrieve an existing Checkout Pro preference by its unique identifier.
 *
 * @returns The full preference resource.
 */
export default function get({ id, config }: PreferenceGetClient): Promise<PreferenceResponse>;
