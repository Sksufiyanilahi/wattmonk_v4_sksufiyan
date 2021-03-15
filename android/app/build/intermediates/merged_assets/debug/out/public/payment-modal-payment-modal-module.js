(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["payment-modal-payment-modal-module"],{

/***/ "CRmG":
/*!*******************************************************!*\
  !*** ./src/app/payment-modal/payment-modal.module.ts ***!
  \*******************************************************/
/*! exports provided: PaymentModalPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PaymentModalPageModule", function() { return PaymentModalPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _payment_modal_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./payment-modal-routing.module */ "bIB2");
/* harmony import */ var _payment_modal_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./payment-modal.page */ "XSze");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../shared/shared.module */ "PCNd");
/* harmony import */ var _coupon_offers_modal_coupon_offers_modal_page__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../coupon-offers-modal/coupon-offers-modal.page */ "Ofye");
/* harmony import */ var ngx_paypal__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ngx-paypal */ "ejwX");










let PaymentModalPageModule = class PaymentModalPageModule {
};
PaymentModalPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        entryComponents: [_payment_modal_page__WEBPACK_IMPORTED_MODULE_6__["PaymentModalPage"], _coupon_offers_modal_coupon_offers_modal_page__WEBPACK_IMPORTED_MODULE_8__["CouponOffersModalPage"]],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _payment_modal_routing_module__WEBPACK_IMPORTED_MODULE_5__["PaymentModalPageRoutingModule"],
            _shared_shared_module__WEBPACK_IMPORTED_MODULE_7__["SharedModule"],
            ngx_paypal__WEBPACK_IMPORTED_MODULE_9__["NgxPayPalModule"]
        ],
        declarations: [_payment_modal_page__WEBPACK_IMPORTED_MODULE_6__["PaymentModalPage"]]
    })
], PaymentModalPageModule);



/***/ }),

/***/ "bIB2":
/*!***************************************************************!*\
  !*** ./src/app/payment-modal/payment-modal-routing.module.ts ***!
  \***************************************************************/
/*! exports provided: PaymentModalPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PaymentModalPageRoutingModule", function() { return PaymentModalPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _payment_modal_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./payment-modal.page */ "XSze");




const routes = [
    {
        path: '',
        component: _payment_modal_page__WEBPACK_IMPORTED_MODULE_3__["PaymentModalPage"]
    }
];
let PaymentModalPageRoutingModule = class PaymentModalPageRoutingModule {
};
PaymentModalPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], PaymentModalPageRoutingModule);



/***/ })

}]);
//# sourceMappingURL=payment-modal-payment-modal-module.js.map