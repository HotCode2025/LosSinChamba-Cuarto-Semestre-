"use strict";
/**
 * Point (Smart POS) client for the MercadoPago API.
 *
 * Provides methods to manage payment intents on Point terminals and to
 * administer the registered Point devices (list, change operating mode).
 *
 * @module point
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Point = void 0;
const cancelPaymentIntent_1 = __importDefault(require("./cancelPaymentIntent"));
const changeDeviceOperatingMode_1 = __importDefault(require("./changeDeviceOperatingMode"));
const createPaymentIntent_1 = __importDefault(require("./createPaymentIntent"));
const getDevices_1 = __importDefault(require("./getDevices"));
const getPaymentIntentList_1 = __importDefault(require("./getPaymentIntentList"));
const getPaymentIntentStatus_1 = __importDefault(require("./getPaymentIntentStatus"));
const searchPaymentIntent_1 = __importDefault(require("./searchPaymentIntent"));
/**
 * Client facade for MercadoPago Point Integration API operations.
 *
 * Use this class to create, search, cancel, and list payment intents on
 * Point Smart POS terminals, as well as to query and configure the
 * registered devices.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference Documentation }.
 */
class Point {
    constructor(mercadoPagoConfig) {
        this.config = mercadoPagoConfig;
    }
    /**
     * Create a new payment intent on a specific Point device.
     *
     * The intent is sent to the terminal, which will prompt the buyer to
     * present a card or other payment method.
     *
     * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/point/createPaymentIntent.ts Usage Example }.
     */
    createPaymentIntent({ device_id, request, requestOptions }) {
        this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
        return (0, createPaymentIntent_1.default)({ device_id, request, config: this.config });
    }
    /**
     * Retrieve the details of an existing payment intent by its ID.
     *
     * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/point/searchPaymentIntent.ts Usage Example }.
     */
    searchPaymentIntent({ payment_intent_id, requestOptions }) {
        this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
        return (0, searchPaymentIntent_1.default)({ payment_intent_id: payment_intent_id, config: this.config });
    }
    /**
     * Cancel a pending payment intent on a specific Point device.
     *
     * Only intents that have not yet been completed can be cancelled.
     *
     * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/point/cancelPaymentIntent.ts Usage Example }.
     */
    cancelPaymentIntent({ device_id, payment_intent_id, requestOptions }) {
        this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
        return (0, cancelPaymentIntent_1.default)({ device_id, payment_intent_id, config: this.config });
    }
    /**
     * List payment intent events, optionally filtered by date range.
     *
     * Returns the lifecycle events (creation, completion, cancellation) for
     * all payment intents associated with the authenticated account.
     *
     * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/point/getPaymentIntentList.ts Usage Example }.
     */
    getPaymentIntentList(pointGetPaymentIntentListOptions = {}) {
        const { body, requestOptions } = pointGetPaymentIntentListOptions;
        this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
        return (0, getPaymentIntentList_1.default)({ options: body === null || body === void 0 ? void 0 : body.options, config: this.config });
    }
    /**
     * Get the latest status event for a specific payment intent.
     *
     * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/point/getPaymentIntentStatus.ts Usage Example }.
     */
    getPaymentIntentStatus({ payment_intent_id, requestOptions }) {
        this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
        return (0, getPaymentIntentStatus_1.default)({ payment_intent_id, config: this.config });
    }
    /**
     * List Point devices registered to the authenticated account.
     *
     * Results can be filtered by store and POS identifiers.
     *
     * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/point/getDevices.ts Usage Example }.
     */
    getDevices({ request, requestOptions }) {
        this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
        return (0, getDevices_1.default)({ options: request === null || request === void 0 ? void 0 : request.options, config: this.config });
    }
    /**
     * Change the operating mode of a Point device (e.g. `PDV` or `STANDALONE`).
     *
     * In `PDV` mode the device receives payment intents from the integration;
     * in `STANDALONE` mode the seller operates the device manually.
     *
     * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/point/changeDeviceOperatingMode.ts Usage Example }.
     */
    changeDeviceOperatingMode({ device_id, request, requestOptions }) {
        this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
        return (0, changeDeviceOperatingMode_1.default)({ device_id, request, config: this.config });
    }
}
exports.Point = Point;
