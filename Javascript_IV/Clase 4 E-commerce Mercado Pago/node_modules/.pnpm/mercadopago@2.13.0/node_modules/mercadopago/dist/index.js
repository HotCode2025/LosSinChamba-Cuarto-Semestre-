"use strict";
/**
 * MercadoPago Node.js SDK — public API surface.
 *
 * Re-exports every client class and the SDK configuration object so
 * consumers can import everything from a single entry point:
 *
 * ```ts
 * import MercadoPagoConfig, { Payment, Order } from 'mercadopago';
 * ```
 *
 * @module mercadopago
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignatureFailureReason = exports.InvalidWebhookSignatureError = exports.WebhookSignatureValidator = exports.Order = exports.User = exports.MerchantOrder = exports.OAuth = exports.Preference = exports.Point = exports.PreApprovalPlan = exports.PreApproval = exports.Payment = exports.PaymentMethod = exports.PaymentRefund = exports.IdentificationType = exports.Invoice = exports.Customer = exports.CustomerCard = exports.CardToken = exports.MercadoPagoConfig = void 0;
const mercadoPagoConfig_1 = require("./mercadoPagoConfig");
Object.defineProperty(exports, "MercadoPagoConfig", { enumerable: true, get: function () { return mercadoPagoConfig_1.MercadoPagoConfig; } });
exports.default = mercadoPagoConfig_1.MercadoPagoConfig;
/** Tokenization client — creates secure, single-use card tokens for PCI compliance. */
var cardToken_1 = require("./clients/cardToken");
Object.defineProperty(exports, "CardToken", { enumerable: true, get: function () { return cardToken_1.CardToken; } });
/** Customer-card client — manages saved payment cards linked to a customer. */
var customerCard_1 = require("./clients/customerCard");
Object.defineProperty(exports, "CustomerCard", { enumerable: true, get: function () { return customerCard_1.CustomerCard; } });
/** Customer client — CRUD operations on buyer profiles stored in MercadoPago. */
var customer_1 = require("./clients/customer");
Object.defineProperty(exports, "Customer", { enumerable: true, get: function () { return customer_1.Customer; } });
/** Invoice client — retrieves and searches subscription-generated invoices. */
var invoice_1 = require("./clients/invoice");
Object.defineProperty(exports, "Invoice", { enumerable: true, get: function () { return invoice_1.Invoice; } });
/** Identification-type client — lists accepted ID document types per country. */
var identificationType_1 = require("./clients/identificationType");
Object.defineProperty(exports, "IdentificationType", { enumerable: true, get: function () { return identificationType_1.IdentificationType; } });
/** Payment-refund client — creates, retrieves, and lists refunds on a payment. */
var paymentRefund_1 = require("./clients/paymentRefund");
Object.defineProperty(exports, "PaymentRefund", { enumerable: true, get: function () { return paymentRefund_1.PaymentRefund; } });
/** Payment-method client — lists available payment methods for a given country/site. */
var paymentMethod_1 = require("./clients/paymentMethod");
Object.defineProperty(exports, "PaymentMethod", { enumerable: true, get: function () { return paymentMethod_1.PaymentMethod; } });
/** Payment client — creates, retrieves, searches, captures, and cancels payments. */
var payment_1 = require("./clients/payment");
Object.defineProperty(exports, "Payment", { enumerable: true, get: function () { return payment_1.Payment; } });
/** Pre-approval (subscription) client — manages recurring billing agreements. */
var preApproval_1 = require("./clients/preApproval");
Object.defineProperty(exports, "PreApproval", { enumerable: true, get: function () { return preApproval_1.PreApproval; } });
/** Pre-approval plan client — manages subscription plan templates. */
var preApprovalPlan_1 = require("./clients/preApprovalPlan");
Object.defineProperty(exports, "PreApprovalPlan", { enumerable: true, get: function () { return preApprovalPlan_1.PreApprovalPlan; } });
/** Point (Smart POS) client — manages in-person payment intents and devices. */
var point_1 = require("./clients/point");
Object.defineProperty(exports, "Point", { enumerable: true, get: function () { return point_1.Point; } });
/** Preference client — creates and manages Checkout Pro payment preferences. */
var preference_1 = require("./clients/preference");
Object.defineProperty(exports, "Preference", { enumerable: true, get: function () { return preference_1.Preference; } });
/** OAuth client — handles authorization code exchange, token refresh, and auth URL generation. */
var oAuth_1 = require("./clients/oAuth");
Object.defineProperty(exports, "OAuth", { enumerable: true, get: function () { return oAuth_1.OAuth; } });
/** Merchant-order client — groups multiple payments under a single commercial order. */
var merchantOrder_1 = require("./clients/merchantOrder");
Object.defineProperty(exports, "MerchantOrder", { enumerable: true, get: function () { return merchantOrder_1.MerchantOrder; } });
/** User client — retrieves the authenticated MercadoPago account profile. */
var user_1 = require("./clients/user");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return user_1.User; } });
/** Order client — creates, processes, captures, cancels, and refunds orders (v2 API). */
var order_1 = require("./clients/order");
Object.defineProperty(exports, "Order", { enumerable: true, get: function () { return order_1.Order; } });
var webhook_1 = require("./utils/webhook");
Object.defineProperty(exports, "WebhookSignatureValidator", { enumerable: true, get: function () { return webhook_1.WebhookSignatureValidator; } });
Object.defineProperty(exports, "InvalidWebhookSignatureError", { enumerable: true, get: function () { return webhook_1.InvalidWebhookSignatureError; } });
Object.defineProperty(exports, "SignatureFailureReason", { enumerable: true, get: function () { return webhook_1.SignatureFailureReason; } });
