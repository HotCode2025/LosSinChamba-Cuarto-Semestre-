/**
 * Implementation of the get-devices operation for Point terminals.
 *
 * Sends a `GET /point/integration-api/devices` request to retrieve the
 * list of Point devices registered to the authenticated seller.
 *
 * @module point/getDevices
 */
import type { GetDevicesResponse } from '../commonTypes';
import type { PointGetDevicesClient } from './types';
/**
 * Retrieve the paginated list of Point devices.
 *
 * @returns A paginated response containing the matched devices.
 */
export default function getDevices({ options, config }: PointGetDevicesClient): Promise<GetDevicesResponse>;
