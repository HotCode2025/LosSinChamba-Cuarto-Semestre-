/**
 * Search orders operation -- sends `GET /v1/orders` with query parameters.
 *
 * @module clients/order/search
 */
import { OrderSearchClient, OrderSearchResponse } from './types';
/**
 * Search for orders matching the given filters and date range.
 *
 * Builds query-string parameters from the provided options and
 * returns a paginated list of matching orders.
 *
 * @returns A paginated response containing matching orders and paging metadata.
 */
export default function search({ options, config }: OrderSearchClient): Promise<OrderSearchResponse>;
