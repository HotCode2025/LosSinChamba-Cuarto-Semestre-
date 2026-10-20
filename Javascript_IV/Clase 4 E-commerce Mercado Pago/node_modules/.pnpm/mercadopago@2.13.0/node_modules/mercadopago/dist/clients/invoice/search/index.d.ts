/**
 * Implementation of the search-invoices operation.
 *
 * Sends a `GET /authorized_payments/search` request to query subscription
 * invoices matching the given filter criteria.
 *
 * @module invoice/search
 */
import type { InvoiceSearchClient, InvoiceSearchResponse } from './types';
/**
 * Search subscription invoices with optional filters.
 *
 * @returns A paginated response containing the matched invoices.
 */
export default function search({ options, config }: InvoiceSearchClient): Promise<InvoiceSearchResponse>;
