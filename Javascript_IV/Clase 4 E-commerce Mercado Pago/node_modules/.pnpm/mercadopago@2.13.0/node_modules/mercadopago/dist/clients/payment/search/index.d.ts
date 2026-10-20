import type { PaymentSearch, PaymentSearchClient } from './types';
/**
 * Search for payments belonging to the authenticated collector.
 *
 * All properties in `options` are forwarded as query-string parameters,
 * allowing pagination, sorting, date-range filtering, and custom filters.
 *
 * @param options - Search filters, sorting, and pagination parameters.
 * @param config  - SDK configuration including the access token.
 * @returns Paginated search results with paging metadata.
 */
export default function search({ options, config }: PaymentSearchClient): Promise<PaymentSearch>;
