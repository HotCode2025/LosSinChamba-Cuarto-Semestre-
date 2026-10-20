/**
 * Request and internal-client types for the create transaction operation.
 *
 * @module clients/order/transaction/create/types
 */
import { MercadoPagoConfig } from '../../../../mercadoPagoConfig';
import type { Options } from '../../../../types';
import { PaymentRequest } from '../../commonTypes';
/**
 * Internal client payload passed to the create transaction REST call.
 */
export declare type OrderCreateTransactionClient = {
    /** Unique order identifier to add transactions to. */
    id: string;
    /** Transaction creation request body. */
    body: OrderCreateTransactionRequest;
    /** SDK configuration (access token, default options). */
    config: MercadoPagoConfig;
};
/**
 * Public-facing input for {@link Order.createTransaction}.
 */
export declare type OrderCreateTransactionData = {
    /** Unique order identifier to add transactions to. */
    id: string;
    /** Transaction creation request body. */
    body: OrderCreateTransactionRequest;
    /** Per-call request options (timeout, idempotency key, etc.). */
    requestOptions?: Options;
};
/**
 * Request body for adding payment transactions to an existing order.
 */
export declare type OrderCreateTransactionRequest = {
    /** One or more payment entries to add to the order. */
    payments?: PaymentRequest[];
};
