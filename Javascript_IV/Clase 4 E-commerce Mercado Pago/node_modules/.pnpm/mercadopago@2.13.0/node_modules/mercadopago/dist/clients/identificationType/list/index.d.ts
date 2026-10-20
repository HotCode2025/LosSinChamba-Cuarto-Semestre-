/**
 * Implementation of the list-identification-types operation.
 *
 * Sends a `GET /v1/identification_types` request to retrieve the
 * accepted identification document types for the seller's country.
 *
 * @module identificationType/list
 */
import type { IdentificationTypeGet, IdentificationTypeResponse } from './types';
/**
 * Retrieve all accepted identification document types.
 *
 * @returns An array of identification types with their constraints.
 */
export default function list({ config }: IdentificationTypeGet): Promise<IdentificationTypeResponse[]>;
