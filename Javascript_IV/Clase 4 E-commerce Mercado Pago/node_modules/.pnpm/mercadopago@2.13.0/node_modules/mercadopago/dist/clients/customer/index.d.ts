/**
 * Customer API client for the MercadoPago Node.js SDK.
 *
 * Provides a high-level facade for managing customers and their saved
 * payment cards through the `/v1/customers` resource.  Card-related
 * convenience methods delegate to the {@link CustomerCard} client
 * internally.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/online-payments/checkout-api/customers/create-customer/post MercadoPago Customers API reference}
 * @module clients/customer
 */
import type { MercadoPagoConfig } from '../../mercadoPagoConfig';
import type { CustomerGetRemoveData, CustomerResponse } from './commonTypes';
import type { CustomerUpdateData } from './update/types';
import type { CustomerSearchData, CustomerSearchResultsPage } from './search/types';
import type { CustomerCardResponse, CustomerCardGetRemoveData } from '../customerCard/commonTypes';
import type { CustomerCardListData } from '../customerCard/list/types';
import type { CustomerCreateData } from './create/types';
import type { CustomerCardCreateData } from '../customerCard/create/types';
/**
 * Client for the MercadoPago Customers API.
 *
 * Exposes CRUD operations on customers as well as convenience methods
 * for managing the saved payment cards associated with each customer.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/online-payments/checkout-api/customers/create-customer/post API reference}
 */
export declare class Customer {
    private config;
    private customerCard;
    constructor(mercadoPagoConfig: MercadoPagoConfig);
    /**
     * Create a new customer in MercadoPago.
     *
     * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/customer/create.ts Usage Example  }.
     */
    create({ body, requestOptions }: CustomerCreateData): Promise<CustomerResponse>;
    /**
     * Retrieve a single customer by its unique identifier.
     *
     * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/customer/get.ts Usage Example  }.
     */
    get({ customerId, requestOptions }: CustomerGetRemoveData): Promise<CustomerResponse>;
    /**
     * Remove an existing customer by its unique identifier.
     *
     * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/customer/remove.ts Usage Example  }.
     */
    remove({ customerId, requestOptions }: CustomerGetRemoveData): Promise<CustomerResponse>;
    /**
     * Update an existing customer's information.
     *
     * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/customer/update.ts Usage Example  }.
     */
    update({ customerId, body, requestOptions }: CustomerUpdateData): Promise<CustomerResponse>;
    /**
     * Search for customers using optional filters and pagination.
     *
     * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/customer/search.ts Usage Example  }.
     */
    search(CustomerSearchOptions?: CustomerSearchData): Promise<CustomerSearchResultsPage>;
    /**
     * Save a new payment card for a customer using a card token.
     *
     * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/customer/createCard.ts Usage Example  }.
     */
    createCard({ customerId, body, requestOptions }: CustomerCardCreateData): Promise<CustomerCardResponse>;
    /**
     * Retrieve a specific saved card for a customer.
     *
     * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/customer/getCard.ts Usage Example  }.
     */
    getCard({ customerId, cardId, requestOptions }: CustomerCardGetRemoveData): Promise<CustomerCardResponse>;
    /**
     * Remove a saved card from a customer's account.
     *
     * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/customer/removeCard.ts Usage Example  }.
     */
    removeCard({ customerId, cardId, requestOptions }: CustomerCardGetRemoveData): Promise<CustomerCardResponse>;
    /**
     * List all saved payment cards for a customer.
     *
     * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/customer/listCards.ts Usage Example  }.
     */
    listCards({ customerId, requestOptions }: CustomerCardListData): Promise<CustomerCardResponse[]>;
}
