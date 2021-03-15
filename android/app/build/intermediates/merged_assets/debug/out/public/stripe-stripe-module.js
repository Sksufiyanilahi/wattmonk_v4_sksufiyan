(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["stripe-stripe-module"],{

/***/ "0f5b":
/*!*****************************************!*\
  !*** ./src/app/stripe/stripe.page.scss ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzdHJpcGUucGFnZS5zY3NzIn0= */");

/***/ }),

/***/ "FHeX":
/*!***************************************!*\
  !*** ./src/app/stripe/stripe.page.ts ***!
  \***************************************/
/*! exports provided: StripePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StripePage", function() { return StripePage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_stripe_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./stripe.page.html */ "fvE9");
/* harmony import */ var _stripe_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./stripe.page.scss */ "0f5b");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ionic_native_stripe_ngx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic-native/stripe/ngx */ "tF4M");





let StripePage = class StripePage {
    constructor(stripe) {
        this.stripe = stripe;
    }
    ngOnInit() {
    }
    stripepayment() {
        this.stripe.setPublishableKey("pk_test_51HUoT7EmzMn44Mbmtqd3Sfx1knRySaWxgTuOAbVlsGFmS0zVpfLnkpzDL32sZcV116MCpI3vKA2E3Zw9WEopsnFu00pyCDs0sq");
        let card = {
            number: '4242424242424242',
            expMonth: 12,
            expYear: 2020,
            cvc: '220'
        };
        this.stripe.createCardToken(this.card)
            .then(token => console.log(token.id))
            .catch(error => console.error(error));
    }
};
StripePage.ctorParameters = () => [
    { type: _ionic_native_stripe_ngx__WEBPACK_IMPORTED_MODULE_4__["Stripe"] }
];
StripePage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-stripe',
        template: _raw_loader_stripe_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_stripe_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], StripePage);



/***/ }),

/***/ "fvE9":
/*!*******************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/stripe/stripe.page.html ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\r\n  <ion-toolbar>\r\n    <ion-title>Payment</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n  <ion-grid>\r\n    <ion-row>\r\n      <ion-col>\r\n        <ion-label>Debit/Credit Card Details</ion-label>\r\n        <ion-input type=\"number\" [(ngModel)]=\"card.number\" style=\"border: 1px solid black;\"></ion-input>\r\n      </ion-col>\r\n    </ion-row>\r\n    <ion-row>\r\n      <ion-col size=\"1\">\r\n      </ion-col>\r\n      <ion-col size=\"3\">\r\n        <ion-label style=\"font-size: 13px;\">Expiry Month</ion-label>\r\n        <ion-input type=\"number\" [(ngModel)]=\"card.expMonth\" style=\"border: 1px solid black;\" max=\"2\" [maxlength]=\"2\"></ion-input>\r\n      </ion-col>\r\n      <ion-col size=\"1\"  style=\"text-align: center;display: flex;align-self: flex-end;justify-content: center;font-size: 40px;\">\r\n        <ion-label>/</ion-label>\r\n      </ion-col>\r\n      <ion-col size=\"3\" style=\"text-align: center;\">\r\n        <ion-label >Year</ion-label>\r\n        <ion-input type=\"number\" [(ngModel)]=\"card.expYear\" style=\"border: 1px solid black;\" max=\"4\" [maxlength]=\"4\"></ion-input>\r\n      </ion-col>\r\n      <ion-col size=\"3\" style=\"text-align: center;\">\r\n        <ion-label>CVV</ion-label>\r\n        <ion-input type=\"number\" [(ngModel)]=\"card.cvc\" style=\"border: 1px solid black;\" max=\"3\" [maxlength]=\"3\"></ion-input>\r\n      </ion-col>\r\n      <ion-col size=\"2\">\r\n     \r\n      </ion-col>\r\n\r\n    </ion-row>\r\n  </ion-grid>\r\n\r\n</ion-content>\r\n");

/***/ }),

/***/ "jV2/":
/*!*************************************************!*\
  !*** ./src/app/stripe/stripe-routing.module.ts ***!
  \*************************************************/
/*! exports provided: StripePageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StripePageRoutingModule", function() { return StripePageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _stripe_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./stripe.page */ "FHeX");




const routes = [
    {
        path: '',
        component: _stripe_page__WEBPACK_IMPORTED_MODULE_3__["StripePage"]
    }
];
let StripePageRoutingModule = class StripePageRoutingModule {
};
StripePageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], StripePageRoutingModule);



/***/ }),

/***/ "xF0s":
/*!*****************************************!*\
  !*** ./src/app/stripe/stripe.module.ts ***!
  \*****************************************/
/*! exports provided: StripePageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StripePageModule", function() { return StripePageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _stripe_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./stripe-routing.module */ "jV2/");
/* harmony import */ var _stripe_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./stripe.page */ "FHeX");







let StripePageModule = class StripePageModule {
};
StripePageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _stripe_routing_module__WEBPACK_IMPORTED_MODULE_5__["StripePageRoutingModule"]
        ],
        declarations: [_stripe_page__WEBPACK_IMPORTED_MODULE_6__["StripePage"]]
    })
], StripePageModule);



/***/ })

}]);
//# sourceMappingURL=stripe-stripe-module.js.map