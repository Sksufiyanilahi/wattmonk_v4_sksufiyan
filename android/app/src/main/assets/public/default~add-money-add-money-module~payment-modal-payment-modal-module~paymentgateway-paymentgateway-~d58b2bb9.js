(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~add-money-add-money-module~payment-modal-payment-modal-module~paymentgateway-paymentgateway-~d58b2bb9"],{

/***/ "ejwX":
/*!*********************************************************************!*\
  !*** ./node_modules/ngx-paypal/__ivy_ngcc__/fesm2015/ngx-paypal.js ***!
  \*********************************************************************/
/*! exports provided: NgxPayPalModule, NgxPaypalComponent, PayPalScriptService, ɵa */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgxPayPalModule", function() { return NgxPayPalModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgxPaypalComponent", function() { return NgxPaypalComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PayPalScriptService", function() { return PayPalScriptService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵa", function() { return ScriptService; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "qCKp");




/**
 * @fileoverview added by tsickle
 * Generated from: lib/services/script.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */


const _c0 = ["payPalButtonContainer"];
class ScriptService {
    /**
     * @param {?} zone
     */
    constructor(zone) {
        this.zone = zone;
    }
    /**
     * @param {?} url
     * @param {?} globalVar
     * @param {?} onReady
     * @return {?}
     */
    registerScript(url, globalVar, onReady) {
        /** @type {?} */
        const existingGlobalVar = ((/** @type {?} */ (window)))[globalVar];
        if (existingGlobalVar) {
            // global variable is present = script was already loaded
            this.zone.run((/**
             * @return {?}
             */
            () => {
                onReady(existingGlobalVar);
            }));
            return;
        }
        // prepare script elem
        /** @type {?} */
        const scriptElem = document.createElement('script');
        scriptElem.id = this.getElemId(globalVar);
        scriptElem.innerHTML = '';
        scriptElem.onload = (/**
         * @return {?}
         */
        () => {
            this.zone.run((/**
             * @return {?}
             */
            () => {
                onReady(((/** @type {?} */ (window)))[globalVar]);
            }));
        });
        scriptElem.src = url;
        scriptElem.async = true;
        scriptElem.defer = true;
        // add script to header
        document.getElementsByTagName('head')[0].appendChild(scriptElem);
    }
    /**
     * @param {?} globalVar
     * @return {?}
     */
    cleanup(globalVar) {
        // remove script from DOM
        /** @type {?} */
        const scriptElem = document.getElementById(this.getElemId(globalVar));
        if (scriptElem) {
            scriptElem.remove();
        }
    }
    /**
     * @private
     * @param {?} globalVar
     * @return {?}
     */
    getElemId(globalVar) {
        return `ngx-paypal-script-elem-${globalVar}`;
    }
}
ScriptService.ɵfac = function ScriptService_Factory(t) { return new (t || ScriptService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"])); };
ScriptService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: ScriptService, factory: ScriptService.ɵfac });
/** @nocollapse */
ScriptService.ctorParameters = () => [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"] }
];
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](ScriptService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"]
    }], function () { return [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"] }]; }, null); })();
if (false) {}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/services/paypal-script.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class PayPalScriptService {
    /**
     * @param {?} scriptService
     */
    constructor(scriptService) {
        this.scriptService = scriptService;
        this.paypalWindowName = 'paypal';
    }
    /**
     * @param {?} config
     * @param {?} onReady
     * @return {?}
     */
    registerPayPalScript(config, onReady) {
        this.scriptService.registerScript(this.getUrlForConfig(config), this.paypalWindowName, onReady);
    }
    /**
     * @return {?}
     */
    destroyPayPalScript() {
        this.scriptService.cleanup(this.paypalWindowName);
    }
    /**
     * @private
     * @param {?} config
     * @return {?}
     */
    getUrlForConfig(config) {
        /** @type {?} */
        const params = [
            {
                name: 'client-id',
                value: config.clientId
            }
        ];
        if (config.currency) {
            params.push({
                name: 'currency',
                value: config.currency
            });
        }
        if (config.commit) {
            params.push({
                name: 'commit',
                value: config.commit
            });
        }
        if (config.vault) {
            params.push({
                name: 'vault',
                value: config.vault
            });
        }
        if (config.extraParams) {
            params.push(...config.extraParams);
        }
        return `https://www.paypal.com/sdk/js${this.getQueryString(params)}`;
    }
    /**
     * @private
     * @param {?} queryParams
     * @return {?}
     */
    getQueryString(queryParams) {
        /** @type {?} */
        let queryString = '';
        for (let i = 0; i < queryParams.length; i++) {
            /** @type {?} */
            const queryParam = queryParams[i];
            if (i === 0) {
                queryString += '?';
            }
            else {
                queryString += '&';
            }
            queryString += `${queryParam.name}=${queryParam.value}`;
        }
        return queryString;
    }
}
PayPalScriptService.ɵfac = function PayPalScriptService_Factory(t) { return new (t || PayPalScriptService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](ScriptService)); };
PayPalScriptService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: PayPalScriptService, factory: PayPalScriptService.ɵfac });
/** @nocollapse */
PayPalScriptService.ctorParameters = () => [
    { type: ScriptService }
];
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](PayPalScriptService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"]
    }], function () { return [{ type: ScriptService }]; }, null); })();
if (false) {}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/components/paypal.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxPaypalComponent {
    /**
     * @param {?} paypalScriptService
     * @param {?} cdr
     * @param {?} ngZone
     */
    constructor(paypalScriptService, cdr, ngZone) {
        this.paypalScriptService = paypalScriptService;
        this.cdr = cdr;
        this.ngZone = ngZone;
        /**
         * If enabled, paypal SDK script will be loaded. Useful if you want to have multiple PayPal components on the same page
         * sharing base configuration. In such a case only a single component may register script.
         */
        this.registerScript = true;
        /**
         * Emitted when paypal script is loaded
         */
        this.scriptLoaded = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.ngUnsubscribe = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        /**
         * Flag that indicates if paypal should be initialized (required for handling script load events and availability of DOM element)
         */
        this.initializePayPal = true;
    }
    /**
     * @param {?} content
     * @return {?}
     */
    set payPalButtonContainer(content) {
        this.payPalButtonContainerElem = content;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (!this.payPalButtonContainerId) {
            this.payPalButtonContainerId = this.generateElementId();
        }
        // first time config setup
        /** @type {?} */
        const config = this.config;
        if (changes.config.isFirstChange()) {
            if (config && this.registerScript) {
                this.initPayPalScript(config, (/**
                 * @param {?} payPal
                 * @return {?}
                 */
                (payPal) => {
                    // store reference to paypal global script
                    this.payPal = payPal;
                    this.doPayPalCheck();
                }));
            }
        }
        // changes to config
        if (!changes.config.isFirstChange()) {
            this.reinitialize(config);
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.paypalScriptService.destroyPayPalScript();
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.doPayPalCheck();
    }
    /**
     * @param {?} payPal
     * @return {?}
     */
    customInit(payPal) {
        this.payPal = payPal;
        this.doPayPalCheck();
    }
    /**
     * @param {?} config
     * @return {?}
     */
    reinitialize(config) {
        this.config = config;
        this.payPal = undefined;
        this.paypalScriptService.destroyPayPalScript();
        this.payPalButtonContainerId = this.generateElementId();
        this.initializePayPal = true;
        if (this.payPalButtonContainerElem) {
            while (this.payPalButtonContainerElem.nativeElement.firstChild) {
                this.payPalButtonContainerElem.nativeElement.removeChild(this.payPalButtonContainerElem.nativeElement.firstChild);
            }
        }
        this.cdr.detectChanges();
        if (this.config) {
            if (!this.payPal) {
                this.initPayPalScript(this.config, (/**
                 * @param {?} payPal
                 * @return {?}
                 */
                (payPal) => {
                    // store reference to paypal global script
                    this.payPal = payPal;
                    this.doPayPalCheck();
                }));
            }
            else {
                this.doPayPalCheck();
            }
        }
    }
    /**
     * @private
     * @return {?}
     */
    doPayPalCheck() {
        if (this.initializePayPal && this.config && this.payPal && this.payPalButtonContainerElem) {
            // make sure that id is also set
            if (this.payPalButtonContainerElem.nativeElement.id) {
                this.initializePayPal = false;
                this.initPayPal(this.config, this.payPal);
            }
        }
    }
    /**
     * @private
     * @param {?} config
     * @param {?} initPayPal
     * @return {?}
     */
    initPayPalScript(config, initPayPal) {
        this.paypalScriptService.registerPayPalScript({
            clientId: config.clientId,
            commit: config.advanced && config.advanced.commit ? config.advanced.commit : undefined,
            currency: config.currency,
            vault: config.vault,
            extraParams: config.advanced && config.advanced.extraQueryParams ? config.advanced.extraQueryParams : []
        }, (/**
         * @param {?} paypal
         * @return {?}
         */
        (paypal) => {
            this.scriptLoaded.next(paypal);
            initPayPal(paypal);
        }));
    }
    /**
     * @private
     * @return {?}
     */
    generateElementId() {
        return `ngx-captcha-id-${new Date().valueOf()}`;
    }
    /**
     * @private
     * @param {?} config
     * @param {?} paypal
     * @return {?}
     */
    initPayPal(config, paypal) {
        // Running outside angular zone prevents infinite ngDoCheck lifecycle calls
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            // https://developer.paypal.com/docs/checkout/integrate/#2-add-the-paypal-script-to-your-web-page
            /** @type {?} */
            const createOrder = (/**
             * @param {?} data
             * @param {?} actions
             * @return {?}
             */
            (data, actions) => {
                return this.ngZone.run((/**
                 * @return {?}
                 */
                () => {
                    if (config.createOrderOnClient && config.createOrderOnServer) {
                        throw Error(`Both 'createOrderOnClient' and 'createOrderOnServer' are defined.
                    Please choose one or the other.`);
                    }
                    if (!config.createOrderOnClient && !config.createOrderOnServer) {
                        throw Error(`Neither 'createOrderOnClient' or 'createOrderOnServer' are defined.
                    Please define one of these to create order.`);
                    }
                    if (config.createOrderOnClient) {
                        return actions.order.create(config.createOrderOnClient(data));
                    }
                    if (config.createOrderOnServer) {
                        return config.createOrderOnServer(data);
                    }
                    throw Error(`Invalid state for 'createOrder'.`);
                }));
            });
            /** @type {?} */
            const createSubscription = (/**
             * @param {?} data
             * @param {?} actions
             * @return {?}
             */
            (data, actions) => {
                return this.ngZone.run((/**
                 * @return {?}
                 */
                () => {
                    if (config.createSubscription) {
                        return config.createSubscription(data, actions);
                    }
                }));
            });
            /** @type {?} */
            const onShippingChange = (/**
             * @param {?} data
             * @param {?} actions
             * @return {?}
             */
            (data, actions) => {
                return this.ngZone.run((/**
                 * @return {?}
                 */
                () => {
                    if (config.onShippingChange) {
                        return config.onShippingChange(data, actions);
                    }
                }));
            });
            /** @type {?} */
            const buttonsConfig = Object.assign(Object.assign(Object.assign({ style: config.style, onApprove: (/**
                 * @param {?} data
                 * @param {?} actions
                 * @return {?}
                 */
                (data, actions) => {
                    return this.ngZone.run((/**
                     * @return {?}
                     */
                    () => {
                        if (config.onApprove) {
                            config.onApprove(data, actions);
                        }
                        // capture on server
                        if (config.authorizeOnServer) {
                            return config.authorizeOnServer(data, actions);
                        }
                        // capture on client
                        /** @type {?} */
                        const onClientAuthorization = config.onClientAuthorization;
                        if (onClientAuthorization) {
                            actions.order.capture().then((/**
                             * @param {?} details
                             * @return {?}
                             */
                            (details) => {
                                this.ngZone.run((/**
                                 * @return {?}
                                 */
                                () => {
                                    onClientAuthorization(details);
                                }));
                            }));
                            return;
                        }
                    }));
                }), onError: (/**
                 * @param {?} error
                 * @return {?}
                 */
                (error) => {
                    this.ngZone.run((/**
                     * @return {?}
                     */
                    () => {
                        if (config.onError) {
                            config.onError(error);
                        }
                    }));
                }), onCancel: (/**
                 * @param {?} data
                 * @param {?} actions
                 * @return {?}
                 */
                (data, actions) => {
                    this.ngZone.run((/**
                     * @return {?}
                     */
                    () => {
                        if (config.onCancel) {
                            config.onCancel(data, actions);
                        }
                    }));
                }), onClick: (/**
                 * @param {?} data
                 * @param {?} actions
                 * @return {?}
                 */
                (data, actions) => {
                    this.ngZone.run((/**
                     * @return {?}
                     */
                    () => {
                        if (config.onClick) {
                            config.onClick(data, actions);
                        }
                    }));
                }), onInit: (/**
                 * @param {?} data
                 * @param {?} actions
                 * @return {?}
                 */
                (data, actions) => {
                    this.ngZone.run((/**
                     * @return {?}
                     */
                    () => {
                        if (config.onInit) {
                            config.onInit(data, actions);
                        }
                    }));
                }) }, ((config.createOrderOnClient || config.createOrderOnServer) && { createOrder })), (config.createSubscription && { createSubscription })), (config.onShippingChange && { onShippingChange }));
            paypal.Buttons(buttonsConfig).render(`#${this.payPalButtonContainerId}`);
        }));
    }
}
NgxPaypalComponent.ɵfac = function NgxPaypalComponent_Factory(t) { return new (t || NgxPaypalComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](PayPalScriptService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"])); };
NgxPaypalComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: NgxPaypalComponent, selectors: [["ngx-paypal"]], viewQuery: function NgxPaypalComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](_c0, true);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.payPalButtonContainer = _t.first);
    } }, inputs: { registerScript: "registerScript", config: "config" }, outputs: { scriptLoaded: "scriptLoaded" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵNgOnChangesFeature"]], decls: 2, vars: 1, consts: [[3, "id"], ["payPalButtonContainer", ""]], template: function NgxPaypalComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "div", 0, 1);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("id", ctx.payPalButtonContainerId);
    } }, encapsulation: 2, changeDetection: 0 });
/** @nocollapse */
NgxPaypalComponent.ctorParameters = () => [
    { type: PayPalScriptService },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"] }
];
NgxPaypalComponent.propDecorators = {
    config: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
    registerScript: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
    scriptLoaded: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }],
    payPalButtonContainer: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"], args: ['payPalButtonContainer', { static: false },] }]
};
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](NgxPaypalComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"],
        args: [{
                changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
                selector: 'ngx-paypal',
                template: `
    <div #payPalButtonContainer [id]="payPalButtonContainerId"></div>
    `
            }]
    }], function () { return [{ type: PayPalScriptService }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"] }]; }, { registerScript: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }], scriptLoaded: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"]
        }], payPalButtonContainer: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"],
            args: ['payPalButtonContainer', { static: false }]
        }], config: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }] }); })();
if (false) {}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/ngx-paypal.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxPayPalModule {
}
NgxPayPalModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: NgxPayPalModule });
NgxPayPalModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function NgxPayPalModule_Factory(t) { return new (t || NgxPayPalModule)(); }, providers: [
        ScriptService,
        PayPalScriptService
    ], imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](NgxPayPalModule, { declarations: function () { return [NgxPaypalComponent]; }, imports: function () { return [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"]]; }, exports: function () { return [NgxPaypalComponent]; } }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](NgxPayPalModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                imports: [
                    _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"]
                ],
                declarations: [
                    NgxPaypalComponent,
                ],
                exports: [
                    NgxPaypalComponent,
                ],
                providers: [
                    ScriptService,
                    PayPalScriptService
                ]
            }]
    }], null, null); })();

/**
 * @fileoverview added by tsickle
 * Generated from: lib/models/paypal-models.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function IPayPalConfig() { }
if (false) {}
/**
 * @record
 */
function IPayPalUrlConfig() { }
if (false) {}
/**
 * @record
 */
function IOrderDetails() { }
if (false) {}
/**
 * @record
 */
function IClientAuthorizeCallbackData() { }
if (false) {}
/**
 * @record
 */
function ILinkDescription() { }
if (false) {}
/**
 * @record
 */
function IQueryParam() { }
if (false) {}
/**
 * @record
 */
function IOnShippingChangeData() { }
if (false) {}
/**
 * @record
 */
function IOnShippingChangeActions() { }
if (false) {}
/**
 * @record
 */
function IAdvancedConfiguration() { }
if (false) {}
/**
 * @record
 */
function IOnApproveCallbackData() { }
if (false) {}
/**
 * @record
 */
function ICreateOrderCallbackActions() { }
if (false) {}
/**
 * @record
 */
function ICancelCallbackData() { }
if (false) {}
/**
 * @record
 */
function IOnApproveCallbackActions() { }
if (false) {}
/**
 * @record
 */
function IOnInitCallbackActions() { }
if (false) {}
/**
 * @record
 */
function ICreateSubscriptionCallbackActions() { }
if (false) {}
/**
 * @record
 */
function IInitCallbackData() { }
/**
 * @record
 */
function ICreateSubscriptionCallbackData() { }
/**
 * @record
 */
function IOnClickCallbackActions() { }
if (false) {}
/**
 * @record
 */
function IPayPalButtonStyle() { }
if (false) {}
/**
 * @record
 */
function ICreateOrderRequest() { }
if (false) {}
/**
 * @record
 */
function ICreateSubscriptionRequest() { }
if (false) {}
/**
 * @record
 */
function IPayer() { }
if (false) {}
/**
 * @record
 */
function IApplicationContext() { }
if (false) {}
/**
 * @record
 */
function IPaymentMethod() { }
if (false) {}
/**
 * @record
 */
function IPhone() { }
if (false) {}
/**
 * @record
 */
function ITaxInfo() { }
if (false) {}
/**
 * @record
 */
function IPhoneNumber() { }
if (false) {}
/**
 * @record
 */
function IPurchaseUnit() { }
if (false) {}
/**
 * @record
 */
function IPayee() { }
if (false) {}
/**
 * @record
 */
function IPaymentInstructions() { }
if (false) {}
/**
 * @record
 */
function IPlatformFee() { }
if (false) {}
/**
 * @record
 */
function ITransactionItem() { }
if (false) {}
/**
 * @record
 */
function ITax() { }
if (false) {}
/**
 * @record
 */
function IUnitAmount() { }
if (false) {}
/**
 * @record
 */
function IMoney() { }
if (false) {}
/**
 * @record
 */
function IUnitBreakdown() { }
if (false) {}
/**
 * @record
 */
function IPartyName() { }
if (false) {}
/**
 * @record
 */
function IAddressPortable() { }
if (false) {}
/**
 * @record
 */
function IShipping() { }
if (false) {}

/**
 * @fileoverview added by tsickle
 * Generated from: public_api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: ngx-paypal.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */



//# sourceMappingURL=ngx-paypal.js.map

/***/ })

}]);
//# sourceMappingURL=default~add-money-add-money-module~payment-modal-payment-modal-module~paymentgateway-paymentgateway-~d58b2bb9.js.map