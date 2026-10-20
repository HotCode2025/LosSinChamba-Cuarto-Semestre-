/**
 * Types for the "update preference" operation.
 *
 * @module clients/preference/update/types
 */
import type { MercadoPagoConfig } from '../../../mercadoPagoConfig';
import type { PreferenceRequest } from '../../../clients/preference/commonTypes';
import type { Options } from '../../../types';
/**
 * Simple wrapper carrying just the preference identifier.
 */
export declare type PreferenceId = {
    /** Unique preference identifier. */
    preferenceId: string;
};
/**
 * Internal payload passed to the update REST call.
 */
export declare type PreferenceUpdateClient = {
    /** Unique preference identifier to update. */
    id: string;
    /** Fields to modify on the preference. */
    updatePreferenceRequest: PreferenceRequest;
    /** SDK configuration (access token, options). */
    config: MercadoPagoConfig;
};
/**
 * Public-facing input for {@link Preference.update}.
 */
export declare type PreferenceUpdateData = {
    /** Unique preference identifier to update. */
    id: string;
    /** Fields to modify on the preference. */
    updatePreferenceRequest: PreferenceRequest;
    /** Per-request option overrides (timeout, idempotency key, etc.). */
    requestOptions?: Options;
};
