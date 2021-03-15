(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~8efce24e"],{

/***/ "8VxT":
/*!*******************************************************************!*\
  !*** ./src/app/pestampdelivermodal/pestampdelivermodal.page.scss ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".address {\n  color: #3a7be0;\n  margin-left: 2%;\n}\n\n.font {\n  font-size: 1.1rem;\n  margin-left: 3%;\n}\n\n.error {\n  color: #df3e3e;\n  font-size: 11px;\n}\n\n._padding {\n  padding: 12px;\n}\n\nion-grid {\n  padding-top: 0px;\n  padding: 14px;\n}\n\nion-label {\n  color: #6C6C6C !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXHBlc3RhbXBkZWxpdmVybW9kYWwucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksY0FBQTtFQUNBLGVBQUE7QUFDSjs7QUFDQTtFQUNJLGlCQUFBO0VBQ0EsZUFBQTtBQUVKOztBQUFBO0VBQ1EsY0FBQTtFQUNBLGVBQUE7QUFHUjs7QUFBQTtFQUNRLGFBQUE7QUFHUjs7QUFBSTtFQUNJLGdCQUFBO0VBQ0EsYUFBQTtBQUdSOztBQUFJO0VBQ0kseUJBQUE7QUFHUiIsImZpbGUiOiJwZXN0YW1wZGVsaXZlcm1vZGFsLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5hZGRyZXNzIHtcclxuICAgIGNvbG9yOiAjM2E3YmUwO1xyXG4gICAgbWFyZ2luLWxlZnQ6IDIlO1xyXG4gIH1cclxuLmZvbnR7XHJcbiAgICBmb250LXNpemU6IDEuMXJlbTtcclxuICAgIG1hcmdpbi1sZWZ0OiAzJTtcclxuICAgIH1cclxuLmVycm9yIHtcclxuICAgICAgICBjb2xvcjogcmdiKDIyMywgNjIsIDYyKTtcclxuICAgICAgICBmb250LXNpemU6IDExcHg7XHJcbiAgICAgIH1cclxuXHJcbi5fcGFkZGluZ3tcclxuICAgICAgICBwYWRkaW5nOjEycHg7XHJcbiAgICB9XHJcblxyXG4gICAgaW9uLWdyaWR7XHJcbiAgICAgICAgcGFkZGluZy10b3A6IDBweDtcclxuICAgICAgICBwYWRkaW5nOiAxNHB4O1xyXG4gICAgfVxyXG5cclxuICAgIGlvbi1sYWJlbCB7XHJcbiAgICAgICAgY29sb3I6ICM2QzZDNkMgIWltcG9ydGFudDtcclxuICAgICAgfSJdfQ== */");

/***/ }),

/***/ "9oDE":
/*!*****************************************************************!*\
  !*** ./src/app/pestampdelivermodal/pestampdelivermodal.page.ts ***!
  \*****************************************************************/
/*! exports provided: PestampdelivermodalPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PestampdelivermodalPage", function() { return PestampdelivermodalPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_pestampdelivermodal_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./pestampdelivermodal.page.html */ "jdjk");
/* harmony import */ var _pestampdelivermodal_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pestampdelivermodal.page.scss */ "8VxT");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_native_launch_navigator_ngx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic-native/launch-navigator/ngx */ "fGQ8");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../api.service */ "yTNM");
/* harmony import */ var _utilities_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utilities.service */ "oTnF");









let PestampdelivermodalPage = class PestampdelivermodalPage {
    constructor(formBuilder, nav, utils, apiService, navController, modalCtrl, launchNavigator) {
        this.formBuilder = formBuilder;
        this.nav = nav;
        this.utils = utils;
        this.apiService = apiService;
        this.navController = navController;
        this.modalCtrl = modalCtrl;
        this.launchNavigator = launchNavigator;
        this.amountError = 'Please enter an amount less than $5000';
        //minAmountError = 'Please enter an amount greater than $0'
        this.fieldRequired = "Delivery Charges should be minimum $1";
        this.chargesError = null;
        this.options = {
            start: '',
            app: this.launchNavigator.APP.GOOGLE_MAPS
        };
        this.deliverForm = formBuilder.group({
            delivercharges: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]("", [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].min(1),
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].max(5000)]),
            comments: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]("")
        });
    }
    ngOnInit() {
        this.id = this.nav.get('id');
        this.data = this.nav.get('designData');
        console.log(this.id, this.data);
    }
    deliver() {
        console.log("Hello", this.data);
        console.log(this.deliverForm.get('delivercharges').value);
        var deliverycharges;
        if (this.data.modeofstamping == 'hardcopy' || this.data.modeofstamping == 'both') {
            console.log("harddcopy");
            if (this.deliverForm.get('delivercharges').value === 'undefined' || this.deliverForm.get('delivercharges').value === '' || this.deliverForm.get('delivercharges').value === null || this.deliverForm.get('delivercharges').invalid) {
                console.log("error");
                //alertData.deliverycharges.setValidators([Validators.required]);
                //this.chargesError = "Please Enter Delivery Charges";
                this.utils.errorSnackBar("Please Enter Valid Delivery Charges");
                return;
            }
            deliverycharges = this.deliverForm.get('delivercharges').value;
        }
        else {
            deliverycharges = 0;
            // }
        }
        //if(this.deliverForm.status=='VALID'){
        var postData = {};
        if (this.deliverForm.get("comments").value != "") {
            postData = {
                status: "delivered",
                deliverycharges: deliverycharges,
                comments: this.deliverForm.get("comments").value,
            };
        }
        else {
            postData = {
                status: "delivered",
                deliverycharges: deliverycharges,
                comments: ""
            };
        }
        console.log(postData);
        this.apiService.updatePestamps(this.id, postData).subscribe((value) => {
            this.utils.hideLoading().then(() => {
                ;
                console.log('reach ', value);
                this.utils.showSnackBar('Pe Stamp request has been delivered successfully');
                this.modalCtrl.dismiss({
                    'dismissed': true
                });
                // this.utils.setPeStampRefresh(true);
            });
        }, (error) => {
            this.utils.hideLoading().then(() => {
                // this.modalCtrl.dismiss({
                //   'dismissed': true
                // });
                this.utils.errorSnackBar("Error");
            });
            ;
        });
    }
    goBack() {
        this.modalCtrl.dismiss({
            'dismissed': true,
            cancel: 'cancel'
        });
    }
    openAddressOnMap(address) {
        this.launchNavigator.navigate(address, this.options);
    }
};
PestampdelivermodalPage.ctorParameters = () => [
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["NavParams"] },
    { type: _utilities_service__WEBPACK_IMPORTED_MODULE_8__["UtilitiesService"] },
    { type: _api_service__WEBPACK_IMPORTED_MODULE_7__["ApiService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["NavController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["ModalController"] },
    { type: _ionic_native_launch_navigator_ngx__WEBPACK_IMPORTED_MODULE_5__["LaunchNavigator"] }
];
PestampdelivermodalPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-pestampdelivermodal',
        template: _raw_loader_pestampdelivermodal_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_pestampdelivermodal_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], PestampdelivermodalPage);



/***/ }),

/***/ "jdjk":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pestampdelivermodal/pestampdelivermodal.page.html ***!
  \*********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- <ion-header>\r\n  <ion-toolbar>\r\n    <ion-title>pestampdelivermodal</ion-title>\r\n  </ion-toolbar>\r\n</ion-header> -->\r\n<ion-content>\r\n  <ion-grid>\r\n<ion-row>\r\n  <ion-col>\r\n<h4 style=\"font-weight: bold;margin-bottom:0px !important;margin-top: 0%;\">Confirm!</h4>\r\n</ion-col>\r\n<ion-col size=\"auto\" style=\"align-self: center;padding-top: 0%;\">\r\n  <ion-button fill=\"clear\" size=\"small\" class=\"ion-no-padding\" (click)=\"goBack()\">\r\n      <ion-icon name=\"close-outline\" style=\"color: dimgrey;\" size=\"large\"></ion-icon>\r\n  </ion-button>\r\n</ion-col>\r\n</ion-row>\r\n\r\n  <form [formGroup]=\"deliverForm\" novalidate>\r\n    <ion-row *ngIf=\"data.modeofstamping == 'hardcopy' || data.modeofstamping =='both'\">\r\n    <ion-col>\r\n      <ion-icon name=\"location-outline\"></ion-icon>\r\n      <span (click)=\"openAddressOnMap(data.deliveryaddress)\" class=\"address\">{{data.deliveryaddress}}</span>\r\n  </ion-col>\r\n</ion-row>\r\n  <ion-row *ngIf=\"data.modeofstamping == 'hardcopy' || data.modeofstamping =='both'\">\r\n    <ion-col>\r\n  <ion-item class=\"ion-no-padding\">\r\n    <ion-label position=\"floating\">Enter Shipping Charges</ion-label>\r\n  <ion-input type=\"tel\" class=\"form_input\" formControlName=\"delivercharges\" min=\"1\" max=\"5000\"></ion-input>\r\n</ion-item>\r\n<div style=\"height: 6px;\">\r\n  <!-- <div *ngIf=\"chargesError!=null\">\r\n      <span class=\"error\">{{chargesError}}</span>\r\n  </div> -->\r\n  <!-- <div *ngIf=\"deliverForm.get('delivercharges').hasError('max') && deliverForm.get('delivercharges').dirty\">\r\n    <span class=\"error\">{{amountError}}</span>\r\n</div> -->\r\n\r\n  <div *ngIf=\"deliverForm.get('delivercharges').value === '' && deliverForm.get('delivercharges').dirty\">\r\n    <span class=\"error\">{{fieldRequired}}</span>\r\n</div>\r\n<div *ngIf=\"deliverForm.get('delivercharges').hasError('max') && deliverForm.get('delivercharges').dirty\">\r\n  <span class=\"error\">{{amountError}}</span>\r\n</div>\r\n<div *ngIf=\"deliverForm.get('delivercharges').hasError('min') && deliverForm.get('delivercharges').dirty\">\r\n  <span class=\"error\">{{fieldRequired}}</span>\r\n</div>\r\n</div>\r\n</ion-col>\r\n</ion-row>\r\n<ion-row>\r\n  <h6 style=\"margin-left:3%\">Would you like to add comments?</h6>\r\n</ion-row>\r\n<ion-row>\r\n  <ion-col>\r\n  <ion-item class=\"ion-no-padding\">\r\n    <ion-label position=\"floating\">Enter Comments</ion-label>\r\n  <ion-input type=\"text\" class=\"form_input\" formControlName=\"comments\"></ion-input>\r\n</ion-item>\r\n</ion-col>\r\n</ion-row>\r\n</form>\r\n<ion-row>\r\n  <ion-col>\r\n    <ion-button fill=\"clear\" style=\"float: right !important\" (click)=\"deliver()\">Deliver</ion-button>\r\n  </ion-col>\r\n</ion-row>\r\n</ion-grid>\r\n</ion-content>\r\n");

/***/ }),

/***/ "su4w":
/*!***************************************************************************!*\
  !*** ./src/app/pestampdelivermodal/pestampdelivermodal-routing.module.ts ***!
  \***************************************************************************/
/*! exports provided: PestampdelivermodalPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PestampdelivermodalPageRoutingModule", function() { return PestampdelivermodalPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _pestampdelivermodal_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pestampdelivermodal.page */ "9oDE");




const routes = [
    {
        path: '',
        component: _pestampdelivermodal_page__WEBPACK_IMPORTED_MODULE_3__["PestampdelivermodalPage"]
    }
];
let PestampdelivermodalPageRoutingModule = class PestampdelivermodalPageRoutingModule {
};
PestampdelivermodalPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], PestampdelivermodalPageRoutingModule);



/***/ }),

/***/ "ucpL":
/*!*******************************************************************!*\
  !*** ./src/app/pestampdelivermodal/pestampdelivermodal.module.ts ***!
  \*******************************************************************/
/*! exports provided: PestampdelivermodalPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PestampdelivermodalPageModule", function() { return PestampdelivermodalPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _pestampdelivermodal_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./pestampdelivermodal-routing.module */ "su4w");
/* harmony import */ var _pestampdelivermodal_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./pestampdelivermodal.page */ "9oDE");







let PestampdelivermodalPageModule = class PestampdelivermodalPageModule {
};
PestampdelivermodalPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _pestampdelivermodal_routing_module__WEBPACK_IMPORTED_MODULE_5__["PestampdelivermodalPageRoutingModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"]
        ],
        declarations: [_pestampdelivermodal_page__WEBPACK_IMPORTED_MODULE_6__["PestampdelivermodalPage"]]
    })
], PestampdelivermodalPageModule);



/***/ })

}]);
//# sourceMappingURL=default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~8efce24e.js.map