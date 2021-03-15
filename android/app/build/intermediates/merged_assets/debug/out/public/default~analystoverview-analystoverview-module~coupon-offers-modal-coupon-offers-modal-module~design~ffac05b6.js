(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~analystoverview-analystoverview-module~coupon-offers-modal-coupon-offers-modal-module~design~ffac05b6"],{

/***/ "Nmol":
/*!***************************************************************************!*\
  !*** ./src/app/coupon-offers-modal/coupon-offers-modal-routing.module.ts ***!
  \***************************************************************************/
/*! exports provided: CouponOffersModalPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CouponOffersModalPageRoutingModule", function() { return CouponOffersModalPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _coupon_offers_modal_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./coupon-offers-modal.page */ "Ofye");




const routes = [
    {
        path: '',
        component: _coupon_offers_modal_page__WEBPACK_IMPORTED_MODULE_3__["CouponOffersModalPage"]
    }
];
let CouponOffersModalPageRoutingModule = class CouponOffersModalPageRoutingModule {
};
CouponOffersModalPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], CouponOffersModalPageRoutingModule);



/***/ }),

/***/ "Ofye":
/*!*****************************************************************!*\
  !*** ./src/app/coupon-offers-modal/coupon-offers-modal.page.ts ***!
  \*****************************************************************/
/*! exports provided: CouponOffersModalPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CouponOffersModalPage", function() { return CouponOffersModalPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_coupon_offers_modal_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./coupon-offers-modal.page.html */ "Z7Sw");
/* harmony import */ var _coupon_offers_modal_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./coupon-offers-modal.page.scss */ "dyyn");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../api.service */ "yTNM");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _utilities_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utilities.service */ "oTnF");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _storage_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../storage.service */ "qkCY");
/* harmony import */ var _utilities_mixpanel_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../utilities/mixpanel.service */ "uKCw");










let CouponOffersModalPage = class CouponOffersModalPage {
    constructor(apiservice, modalctrl, utils, formBuilder, storageService, nav, mixpanelService) {
        this.apiservice = apiservice;
        this.modalctrl = modalctrl;
        this.utils = utils;
        this.formBuilder = formBuilder;
        this.storageService = storageService;
        this.nav = nav;
        this.mixpanelService = mixpanelService;
        this.selecteduserId = null;
        this.couponForm = this.formBuilder.group({
            couponInput: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"]('')
        });
    }
    ngOnInit() {
        this.requesttype = this.nav.get('request');
        this.apiservice.getCoupons(this.requesttype).subscribe((res) => {
            this.Coupons = res;
            console.log(this.Coupons);
        }, (error) => {
        });
        this.user = this.storageService.getUser();
        this.mixpanelService.track("COUPON_OFFER_PAGE_OPEN", {});
    }
    selectCoupon(coupondata) {
        console.log(this.couponForm.get('couponInput').value);
        console.log("this is", coupondata);
        // this.assigneeData.emit(assignee);
        this.Coupons.forEach((item) => {
            item.selected = false;
        });
        if (coupondata.id === this.selecteduserId) {
            this.selecteduserId = null;
            this.selectedCoupon = null;
            this.couponForm.patchValue({
                couponInput: ""
            });
            console.log(this.selectedCoupon);
        }
        else {
            coupondata.selected = true;
            console.log(coupondata);
            this.selectedCoupon = coupondata;
            this.couponForm.patchValue({
                couponInput: coupondata.code
            });
            this.selecteduserId = coupondata.id;
            this.error = null;
            console.log(this.selectedCoupon);
        }
    }
    changeInput() {
        this.error = null;
    }
    applycode() {
        if (this.couponForm.get('couponInput').value != '') {
            this.utils.showLoading("Applying").then(() => {
                const postData = {
                    couponcode: this.couponForm.get('couponInput').value,
                    userid: this.user.parent.id,
                    requesttype: this.requesttype
                };
                this.apiservice.sendCoupon(postData).subscribe((res) => {
                    console.log(res);
                    this.selectedCoupon = res;
                    if (this.selectedCoupon.error) {
                        this.error = this.selectedCoupon.message;
                        this.selectedCoupon = null;
                    }
                    else {
                        this.modalctrl.dismiss({
                            'dismissed': true,
                            data: this.selectedCoupon
                        });
                    }
                }, (error) => { this.utils.errorSnackBar("Invalid Coupon Code"); });
                this.utils.hideLoading();
            });
        }
        else if (this.selectedCoupon != null) {
            this.utils.showLoading("Applying").then(() => {
                this.modalctrl.dismiss({
                    'dismissed': true,
                    data: this.selectedCoupon
                });
                this.utils.hideLoading();
            });
        }
        else {
            this.utils.errorSnackBar("Please select or enter a promo code");
        }
    }
    cancel() {
        this.modalctrl.dismiss({
            'dismissed': true,
            cancel: 'cancel'
        });
    }
};
CouponOffersModalPage.ctorParameters = () => [
    { type: _api_service__WEBPACK_IMPORTED_MODULE_4__["ApiService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["ModalController"] },
    { type: _utilities_service__WEBPACK_IMPORTED_MODULE_6__["UtilitiesService"] },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormBuilder"] },
    { type: _storage_service__WEBPACK_IMPORTED_MODULE_8__["StorageService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["NavParams"] },
    { type: _utilities_mixpanel_service__WEBPACK_IMPORTED_MODULE_9__["MixpanelService"] }
];
CouponOffersModalPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-coupon-offers-modal',
        template: _raw_loader_coupon_offers_modal_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_coupon_offers_modal_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], CouponOffersModalPage);



/***/ }),

/***/ "P9aQ":
/*!*******************************************************************!*\
  !*** ./src/app/coupon-offers-modal/coupon-offers-modal.module.ts ***!
  \*******************************************************************/
/*! exports provided: CouponOffersModalPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CouponOffersModalPageModule", function() { return CouponOffersModalPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _coupon_offers_modal_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./coupon-offers-modal-routing.module */ "Nmol");
/* harmony import */ var _coupon_offers_modal_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./coupon-offers-modal.page */ "Ofye");







let CouponOffersModalPageModule = class CouponOffersModalPageModule {
};
CouponOffersModalPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _coupon_offers_modal_routing_module__WEBPACK_IMPORTED_MODULE_5__["CouponOffersModalPageRoutingModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"]
        ],
        declarations: [_coupon_offers_modal_page__WEBPACK_IMPORTED_MODULE_6__["CouponOffersModalPage"]]
    })
], CouponOffersModalPageModule);



/***/ }),

/***/ "Z7Sw":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/coupon-offers-modal/coupon-offers-modal.page.html ***!
  \*********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\r\n\r\n\r\n  \r\n  <ion-row><ion-col size=\"0\"> </ion-col>\r\n    <ion-col size=\"9\" style=\"align-self: center; font-size: larger;font-weight: bolder;\"> Apply Coupon</ion-col>\r\n    <ion-col><ion-button fill=\"clear\" size=\"small\" class=\"ion-no-padding\" style=\"float:right\" (click)=\"cancel()\">\r\n      <ion-icon name=\"close-outline\" style=\"color: dimgrey;\" size=\"large\"></ion-icon>\r\n  </ion-button></ion-col>\r\n  \r\n  </ion-row>\r\n  \r\n  <div style=\"height:17%;width: 100%;background-color:gainsboro;align-self: center;\"><br>\r\n    <form [formGroup]=\"couponForm\">\r\n<ion-row><ion-col size='12' style=\"padding-bottom: 4px;\" class=\"ion-padding\"><ion-input type=\"text\" class=\"input_class\" autocapitalize=\"words\"\r\n  style=\"font-size: small;\" placeholder=\"Have a promocode?Enter here\" formControlName=\"couponInput\" maxlength=\"15\"  (ionChange)=\"changeInput()\"></ion-input>\r\n</ion-col></ion-row>\r\n<ion-row *ngIf=\"error!==null\" style=\"margin-left: 19px;\"><span class=\"error\">{{error}}</span></ion-row></form></div>\r\n\r\n\r\n<ion-row style=\"margin-top: 10px;margin-left:5%\">\r\n<span style=\"text-align: center; font-size: initial;font-weight: bold;\">AVAILABLE COUPONS</span>\r\n</ion-row>\r\n<ion-content [scrollEvents]=\"true\">\r\n<div *ngFor=\"let coupon of Coupons\" (click)=\"selectCoupon(coupon)\" style=\"padding: 2px;\" >\r\n<ion-card   [class.selected]=\"coupon.selected\" [class.normal]=\"!coupon.selected \" ><ion-row style=\"margin-top: 5px;\"><ion-col size=\"8\">\r\n  <span style=\"font-weight: bold;font-size: revert; margin-left: 10px;color: black;\">{{coupon.title}}</span></ion-col>\r\n <ion-col><span style=\"font-weight: bold;float:right;background-color: green;color: white;height:100%;width:100%;text-align: center;\">{{coupon.code}}</span> </ion-col>\r\n</ion-row>\r\n  <ion-row> <span style=\"margin-left: 10px;margin-top: 7px;margin-bottom: 5px;\">{{coupon.description}}</span></ion-row>\r\n</ion-card>\r\n</div>\r\n\r\n</ion-content>\r\n<ion-footer class=\"ion-padding ion-no-border\" ><ion-button  expand=\"full\" shape=\"block\" (click)=\"applycode()\">Apply</ion-button></ion-footer>");

/***/ }),

/***/ "dyyn":
/*!*******************************************************************!*\
  !*** ./src/app/coupon-offers-modal/coupon-offers-modal.page.scss ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".clickEnableCls {\n  pointer-events: visible !important;\n}\n\n.input_class {\n  background-color: white;\n  font-size: initial;\n  border-width: 2px 4px;\n  align-self: center;\n}\n\n.selected {\n  border: dotted;\n  border-color: limegreen;\n  background: aliceblue;\n}\n\n.normal {\n  border: dotted;\n  border-color: lightgrey;\n}\n\n.error {\n  color: #df3e3e;\n  font-size: 14px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXGNvdXBvbi1vZmZlcnMtbW9kYWwucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksa0NBQUE7QUFDSjs7QUFDQztFQUNHLHVCQUFBO0VBQ0Esa0JBQUE7RUFDQSxxQkFBQTtFQUVGLGtCQUFBO0FBQ0Y7O0FBR0M7RUFDRyxjQUFBO0VBQ0EsdUJBQUE7RUFDQSxxQkFBQTtBQUFKOztBQUdFO0VBQ0UsY0FBQTtFQUNBLHVCQUFBO0FBQUo7O0FBRUU7RUFDRSxjQUFBO0VBQ0EsZUFBQTtBQUNKIiwiZmlsZSI6ImNvdXBvbi1vZmZlcnMtbW9kYWwucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNsaWNrRW5hYmxlQ2xze1xyXG4gICAgcG9pbnRlci1ldmVudHM6IHZpc2libGUgIWltcG9ydGFudDtcclxuIH1cclxuIC5pbnB1dF9jbGFzc3tcclxuICAgIGJhY2tncm91bmQtY29sb3I6d2hpdGU7XHJcbiAgICBmb250LXNpemU6aW5pdGlhbDtcclxuICAgIGJvcmRlci13aWR0aDogMnB4IDRweDtcclxuICAvLyBib3JkZXItcmFkaXVzOiAxNXB4O1xyXG4gIGFsaWduLXNlbGY6IGNlbnRlcjtcclxuIH1cclxuXHJcblxyXG4gLnNlbGVjdGVkIHtcclxuICAgIGJvcmRlcjogZG90dGVkO1xyXG4gICAgYm9yZGVyLWNvbG9yOmxpbWVncmVlbjtcclxuICAgIGJhY2tncm91bmQ6IGFsaWNlYmx1ZTtcclxuICB9XHJcbiAgXHJcbiAgLm5vcm1hbCB7XHJcbiAgICBib3JkZXI6IGRvdHRlZDtcclxuICAgIGJvcmRlci1jb2xvcjogbGlnaHRncmV5O1xyXG4gIH1cclxuICAuZXJyb3Ige1xyXG4gICAgY29sb3I6IHJnYigyMjMsIDYyLCA2Mik7XHJcbiAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgfSJdfQ== */");

/***/ })

}]);
//# sourceMappingURL=default~analystoverview-analystoverview-module~coupon-offers-modal-coupon-offers-modal-module~design~ffac05b6.js.map