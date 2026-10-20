import type { PaymentResponse } from './commonTypes';
import type { PaymentSearchData, PaymentSearch } from './search/types';
import type { MercadoPagoConfig } from '../../mercadoPagoConfig';
import type { PaymentCreateData } from './create/types';
import type { PaymentCaptureData } from './capture/types';
import type { PaymentCancelData } from './cancel/types';
import type { PaymentGetData } from './get/types';
/**
 * Client that exposes every operation available on the MercadoPago Payments API.
 *
 * Instantiate with a {@link MercadoPagoConfig} that holds the access token and
 * optional global request settings.  Per-call `requestOptions` are merged on
 * top of the global configuration for each request.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference Payments API reference}
 */
export declare class Payment {
    /** SDK configuration (access token, timeouts, headers). */
    private config;
    constructor(mercadoPagoConfig: MercadoPagoConfig);
    /**
     * Search payments that belong to the authenticated collector.
     *
     * Supports pagination, sorting, date-range filtering, and arbitrary
     * query-parameter filters forwarded to `GET /v1/payments/search`.
     *
     * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/payment/search.ts Usage Example}
     */
    search(paymentSearchOptions?: PaymentSearchData): Promise<PaymentSearch>;
    /**
     * Cancel a pending or in-process payment by setting its status to `cancelled`.
     *
     * Only payments that have not yet been approved can be cancelled.
     *
     * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/payment/cancel.ts Usage Example}
     */
    cancel({ id, requestOptions }: PaymentCancelData): Promise<PaymentResponse>;
    /**
     * Capture a previously authorized (pre-auth) payment.
     *
     * When the payment was created with `capture: false`, this method finalizes
     * the charge.  An optional `transaction_amount` allows partial captures.
     *
     * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/payment/capture.ts Usage Example}
     */
    capture({ id, transaction_amount, requestOptions }: PaymentCaptureData): Promise<PaymentResponse>;
    /**
     * Create a new payment via `POST /v1/payments`.
     *
     * The request body must contain at least a `transaction_amount`, a `payer`,
     * and a `payment_method_id` (or a card `token`).
     *
     * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/payment/create.ts Usage Example}
     */
    create({ body, requestOptions }: PaymentCreateData): Promise<PaymentResponse>;
    /**
     * Retrieve a single payment by its unique identifier.
     *
     * Calls `GET /v1/payments/:id` and returns the full payment resource.
     *
     * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/payment/get.ts Usage Example}
     */
    get({ id, requestOptions }: PaymentGetData): Promise<PaymentResponse>;
}
