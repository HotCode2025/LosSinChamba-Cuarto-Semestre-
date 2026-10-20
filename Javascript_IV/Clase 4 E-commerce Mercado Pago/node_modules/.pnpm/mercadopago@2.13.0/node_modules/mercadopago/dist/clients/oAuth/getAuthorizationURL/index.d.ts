/**
 * Implementation of the OAuth authorization URL builder.
 *
 * Constructs the full `https://auth.mercadopago.com/authorization` URL
 * with the required query parameters so the seller can grant permissions
 * to the integrator's application.
 *
 * @module oAuth/getAuthorizationURL
 */
import type { OAuthGetAuthorizationURLClient } from './types';
/**
 * Build and return the MercadoPago OAuth authorization URL as a string.
 *
 * @returns Fully-qualified authorization URL including all query parameters.
 */
export default function getAuthorizationURL({ options }: OAuthGetAuthorizationURLClient): string;
