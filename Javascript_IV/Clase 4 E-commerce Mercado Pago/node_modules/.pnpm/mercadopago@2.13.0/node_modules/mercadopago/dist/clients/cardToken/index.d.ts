/**
 * Card Token client for the MercadoPago API.
 *
 * Provides a method to tokenize card data, replacing sensitive card
 * numbers and security codes with a single-use token that can be safely
 * transmitted and used to create payments without handling raw PAN data.
 *
 * @module cardToken
 */
import type { CardTokenCreateData } from './create/types';
import type { MercadoPagoConfig } from '../../mercadoPagoConfig';
import type { CardTokenResponse } from './commonTypes';
/**
 * Client facade for MercadoPago card tokenization operations.
 *
 * Use this class to create a temporary, single-use token from card
 * details or a previously saved card ID, ensuring PCI DSS compliance
 * by avoiding direct handling of full card numbers on the server side.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference Documentation }.
 */
export declare class CardToken {
    /** SDK configuration providing credentials and HTTP options. */
    private config;
    constructor(mercadoPagoConfig: MercadoPagoConfig);
    /**
     * Create a card token from card details or a saved card ID.
     *
     * The returned token ID should be used in the `token` field when
     * creating a payment.
     *
     * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/examples/cardtoken/create.ts Usage Example }.
     */
    create({ body, requestOptions }: CardTokenCreateData): Promise<CardTokenResponse>;
}
