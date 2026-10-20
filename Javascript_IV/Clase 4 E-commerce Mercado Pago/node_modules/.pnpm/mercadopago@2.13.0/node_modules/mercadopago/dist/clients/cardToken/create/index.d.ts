/**
 * Implementation of the create-card-token operation.
 *
 * Sends a `POST /v1/card_tokens` request to tokenize card data and
 * return a single-use token for PCI-compliant payment creation.
 *
 * @module cardToken/create
 */
import type { CardTokenCreateClient } from './types';
import type { CardTokenResponse } from '../commonTypes';
/**
 * Create a card token via `POST /v1/card_tokens`.
 *
 * @returns The card token response containing the token ID and card metadata.
 */
export default function create({ body, config }: CardTokenCreateClient): Promise<CardTokenResponse>;
