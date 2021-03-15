(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["add-money-add-money-module"],{

/***/ "2DXL":
/*!*************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/add-money/add-money.page.html ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header  class=\"ion-no-border white-bg\">\r\n  <ion-toolbar>\r\n    <ion-title></ion-title>\r\n    <ion-grid class=\"ion-padding-top ion-padding-start ion-padding-end header-bg\">\r\n      <ion-row  >\r\n    <ion-col size=\"1\">\r\n    <ion-button fill=\"clear\" size=\"small\" class=\"ion-no-padding\" (click)=\"goBack()\" >\r\n        <ion-img src=\"/assets/images/back.svg\" class=\"action-icon\"></ion-img>\r\n    </ion-button>\r\n</ion-col>\r\n<ion-col class=\"ion-text-center\" size=\"9\" style=\"padding-left: 27px; text-align: center;\">\r\n  <ion-grid class=\"ion-align-items-center ion-justify-content-center\">\r\n      <ion-row class=\"ion-align-items-center ion-justify-content-center ion-margin\">\r\n          <span *ngIf=\"mode=='wallet'\" class=\"survey-name ion-text-center\" style=\"font-size:x-large; text-align: center;\">Add Money</span>\r\n          <span *ngIf=\"mode=='card'\" class=\"survey-name ion-text-center\" style=\"font-size:x-large; text-align: center;\">Pay Via Card</span>\r\n      </ion-row>\r\n\r\n  </ion-grid>\r\n</ion-col>\r\n\r\n</ion-row>\r\n</ion-grid> <ion-grid class=\"position-relative ion-no-padding\">\r\n  <ion-row class=\"ion-no-padding border-header header-half-height\">\r\n  </ion-row>\r\n  <ion-row class=\"ion-no-padding header-half-height\">\r\n\r\n  </ion-row>\r\n\r\n<ion-row  class=\"ion-no-padding position-absolute header-icon-position full-width\">\r\n<ion-col class=\"flex-center\" >\r\n\r\n\r\n</ion-col></ion-row></ion-grid>\r\n\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content >\r\n <ion-img  src=\"\\assets\\images\\securedpayment.jpg\" style=\"height: 40%;\"></ion-img>\r\n\r\n<!--<form (ngSubmit)=\"addMoney(f)\" #f=\"ngForm\">\r\n\r\n\r\n  <ion-input  type=\"number\" name=\"cardNo\" ngModel #cardNo=\"ngModel\" placeholder=\"Enter Card Number\" placeholder-color= 'grey'\r\n  style='height: 50px; font-size:small; border-bottom:solid thin;font-weight: bolder;' ></ion-input>\r\n  <ion-input  type=\"number\" name=\"expYear\" ngModel #expYear=\"ngModel\" placeholder=\"Enter Expiry Year\" placeholder-color= 'grey'\r\n  style='height: 50px; font-size:small; border-bottom:solid thin;font-weight: bolder;' ></ion-input>\r\n  <ion-input  type=\"number\" name=\"expMonth\" ngModel #expMonth=\"ngModel\" placeholder=\"Enter Expiry Month\" placeholder-color= 'grey'\r\n  style='height: 50px; font-size:small; border-bottom:solid thin;font-weight: bolder;' ></ion-input>\r\n  <ion-input  type=\"number\" name=\"cvc\" ngModel #cvc=\"ngModel\" placeholder=\" Enter CVC\" placeholder-color= 'grey'\r\n  style='height: 50px; font-size:small; border-bottom:solid thin;font-weight: bolder;' ></ion-input>\r\n  <ion-input  type=\"number\" name=\"amount\" ngModel #amount=\"ngModel\" placeholder=\" Enter Amount\" placeholder-color= 'grey'\r\n  style='height: 50px; font-size:small; border-bottom:solid thin;font-weight: bolder;' ></ion-input>\r\n\r\n\r\n<ion-footer ><ion-button type=\"submit\" style=\"width: 100%; height: 50px; bottom: 20px;\">Proceed</ion-button></ion-footer>\r\n</form>-->\r\n<form [formGroup]=\"amountForm\" >\r\n  <ion-row class=\"ion-align-items-center ion-justify-content-center\">\r\n  <ion-col style=\"padding: 15px;\">\r\n      <ion-item class=\"ion-no-padding \" *ngIf=\"mode=='wallet'\">\r\n          <ion-label position=\"floating\"> Enter Amount*</ion-label>\r\n          <ion-input class=\"form_input\" type=\"number\" style=\"width: 330px;\" autocapitalize=\"none\" autocomplete=\"off\"\r\n                formControlName=\"amount\" (ionChange)=\"amountCheck($event)\"></ion-input>\r\n\r\n      </ion-item>\r\n      <ion-item class=\"ion-no-padding\" *ngIf=\"mode=='card'\">\r\n        <ion-label position=\"floating\"> Enter Amount*</ion-label>\r\n        <ion-input class=\"form_input\" type=\"number\" style=\"width: 330px;\" autocapitalize=\"none\" formControlName =\"amount\" autocomplete=\"off\"\r\n         [disabled]=true  ></ion-input>\r\n    </ion-item>\r\n    <div style=\"height: 5px;\">\r\n      <div *ngIf=\"amountChecking\">\r\n          <span class=\"error\">{{invalidAmount}}</span>\r\n      </div>\r\n      <div *ngIf=\"amountCheckingForOnboarding\">\r\n        <span class=\"error\">{{invalidAmountForOnboarding}}</span>\r\n    </div>\r\n  </div>\r\n\r\n  </ion-col>\r\n</ion-row>\r\n</form>\r\n<ion-row>\r\n<ion-col size=\"10\" offset=1>\r\n<ngx-paypal class=\"paypal-button\" [config]=\"payPalConfig\"></ngx-paypal>\r\n</ion-col>\r\n</ion-row>\r\n<!-- <form  id=\"payment-form\">\r\n  <div class=\"form-row\" style=\"padding: 15px;\">\r\n    <div id=\"card-element\"> -->\r\n       <!-- a Stripe Element will be inserted here. -->\r\n      <!-- </div> -->\r\n    <!-- Used to display Element errors -->\r\n    <!-- <div id=\"card-errors\" class=\"stripeerror\" role=\"alert\"></div>\r\n  </div>\r\n  <div class=\"ion-margin\" style=\"margin-top:30px ;\">\r\n\r\n      <ion-button type=\"submit\" color=\"success\" (click)=\"getSessionID()\" class=\"ion-padding\" expand=\"block\" fill=\"solid\" size=\"small\"><ion-label style=\"color: #fff;\">Make Payment</ion-label></ion-button>\r\n\r\n  </div>\r\n</form> -->\r\n</ion-content>\r\n");

/***/ }),

/***/ "XgBl":
/*!***********************************************!*\
  !*** ./src/app/add-money/add-money.page.scss ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("form.checkout {\n  max-width: 500px;\n  margin: 2rem auto;\n  text-align: center;\n  border: 2px solid #eee;\n  border-radius: 8px;\n  padding: 1rem 2rem;\n  background: white;\n  font-family: monospace;\n  color: #525252;\n  font-size: 1.1rem;\n}\n\nform.checkout button {\n  padding: 0.5rem 1rem;\n  color: white;\n  background: coral;\n  border: none;\n  border-radius: 4px;\n  margin-top: 1rem;\n}\n\n.error {\n  color: #df3e3e;\n  font-size: 11px;\n}\n\n.stripeerror {\n  color: #df3e3e;\n  font-size: 15px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXGFkZC1tb25leS5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxnQkFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxzQkFBQTtFQUNBLGtCQUFBO0VBQ0Esa0JBQUE7RUFDQSxpQkFBQTtFQUVBLHNCQUFBO0VBQ0EsY0FBQTtFQUNBLGlCQUFBO0FBQUY7O0FBR0E7RUFDRSxvQkFBQTtFQUNBLFlBQUE7RUFDQSxpQkFBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0FBQUY7O0FBR0E7RUFDRSxjQUFBO0VBQ0EsZUFBQTtBQUFGOztBQUVBO0VBQ0UsY0FBQTtFQUNBLGVBQUE7QUFDRiIsImZpbGUiOiJhZGQtbW9uZXkucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiZm9ybS5jaGVja291dCB7XHJcbiAgbWF4LXdpZHRoOiA1MDBweDtcclxuICBtYXJnaW46IDJyZW0gYXV0bztcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgYm9yZGVyOiAycHggc29saWQgI2VlZTtcclxuICBib3JkZXItcmFkaXVzOiA4cHg7XHJcbiAgcGFkZGluZzogMXJlbSAycmVtO1xyXG4gIGJhY2tncm91bmQ6IHdoaXRlO1xyXG5cclxuICBmb250LWZhbWlseTogbW9ub3NwYWNlO1xyXG4gIGNvbG9yOiAjNTI1MjUyO1xyXG4gIGZvbnQtc2l6ZTogMS4xcmVtO1xyXG59XHJcblxyXG5mb3JtLmNoZWNrb3V0IGJ1dHRvbiB7XHJcbiAgcGFkZGluZzogMC41cmVtIDFyZW07XHJcbiAgY29sb3I6IHdoaXRlO1xyXG4gIGJhY2tncm91bmQ6IGNvcmFsO1xyXG4gIGJvcmRlcjogbm9uZTtcclxuICBib3JkZXItcmFkaXVzOiA0cHg7XHJcbiAgbWFyZ2luLXRvcDogMXJlbTtcclxufVxyXG5cclxuLmVycm9yIHtcclxuICBjb2xvcjogcmdiKDIyMywgNjIsIDYyKTtcclxuICBmb250LXNpemU6IDExcHg7XHJcbn1cclxuLnN0cmlwZWVycm9yIHtcclxuICBjb2xvcjogcmdiKDIyMywgNjIsIDYyKTtcclxuICBmb250LXNpemU6IDE1cHg7XHJcbn0iXX0= */");

/***/ }),

/***/ "bcHw":
/*!*******************************************************!*\
  !*** ./src/app/add-money/add-money-routing.module.ts ***!
  \*******************************************************/
/*! exports provided: AddMoneyPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddMoneyPageRoutingModule", function() { return AddMoneyPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _add_money_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./add-money.page */ "m7as");




const routes = [
    {
        path: '',
        component: _add_money_page__WEBPACK_IMPORTED_MODULE_3__["AddMoneyPage"]
    }
];
let AddMoneyPageRoutingModule = class AddMoneyPageRoutingModule {
};
AddMoneyPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], AddMoneyPageRoutingModule);



/***/ }),

/***/ "m7as":
/*!*********************************************!*\
  !*** ./src/app/add-money/add-money.page.ts ***!
  \*********************************************/
/*! exports provided: AddMoneyPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddMoneyPage", function() { return AddMoneyPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_add_money_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./add-money.page.html */ "2DXL");
/* harmony import */ var _add_money_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./add-money.page.scss */ "XgBl");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../api.service */ "yTNM");
/* harmony import */ var _storage_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../storage.service */ "qkCY");
/* harmony import */ var _utilities_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utilities.service */ "oTnF");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _model_constants__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../model/constants */ "Kp5Z");
/* harmony import */ var _angular_fire_database__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/fire/database */ "sSZD");
/* harmony import */ var _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @cometchat-pro/cordova-ionic-chat */ "ujHh");
/* harmony import */ var _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _utilities_mixpanel_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../utilities/mixpanel.service */ "uKCw");
/* harmony import */ var _stripe_stripe_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @stripe/stripe-js */ "v4r+");





//import { Stripe } from '@ionic-native/stripe/ngx';










let AddMoneyPage = class AddMoneyPage {
    constructor(//private stripe:Stripe,
    apiService, storageService, utils, router, route, formBuilder, navController, db, cdr, mixpanelService
    //private stripe:Stripe
    ) {
        this.apiService = apiService;
        this.storageService = storageService;
        this.utils = utils;
        this.router = router;
        this.route = route;
        this.formBuilder = formBuilder;
        this.navController = navController;
        this.db = db;
        this.cdr = cdr;
        this.mixpanelService = mixpanelService;
        this.invalidAmount = _model_constants__WEBPACK_IMPORTED_MODULE_10__["INVALID_AMOUNT"];
        this.invalidAmountForOnboarding = _model_constants__WEBPACK_IMPORTED_MODULE_10__["INVALID_AMOUNT_FOR_ONBOARDING"];
        this.amountChecking = false;
        this.amountCheckingForOnboarding = false;
        this.stripe = Stripe('pk_test_51HQ4cGCd1aF9ZjVZMxEWHOTjNhLTRlhxM4SFLM0lvC0fWQjJ6sxF6LLCWVWUw1ElECj2tZQKHuKkLoYysfhsn6LL00IC6pVMat');
        this.newpermitscount = 0;
        //newprelimsRef:any;
        this.newprelimscount = 0;
        this.stripePromise = Object(_stripe_stripe_js__WEBPACK_IMPORTED_MODULE_14__["loadStripe"])('pk_test_51HQ4cGCd1aF9ZjVZMxEWHOTjNhLTRlhxM4SFLM0lvC0fWQjJ6sxF6LLCWVWUw1ElECj2tZQKHuKkLoYysfhsn6LL00IC6pVMat');
        this.newpestampscount = 0;
        this.paypalintegration();
        this.designData = this.router.getCurrentNavigation().extras.state;
        console.log(this.designData);
        this.mode = this.designData.productdetails.queryParams.mode;
        this.designId = this.designData.productdetails.queryParams.id;
        this.serviceAmount = this.designData.productdetails.queryParams.serviceAmount;
        this.design = this.designData.productdetails.queryParams.design;
        this.slabdiscount = this.designData.productdetails.queryParams.slabdiscount;
        this.slabtime = this.designData.productdetails.queryParams.slabtime;
        this.initialamount = this.designData.productdetails.queryParams.serviceinitialamount;
        // this.data = this.designData.productdetails.queryParams.data;
        this.fulldesigndata = this.designData.productdetails.queryParams.fulldesigndata;
        this.assignValue = this.designData.productdetails.queryParams.assignValue;
        console.log(this.fulldesigndata);
        console.log(this.design);
        this.amountForm = this.formBuilder.group({
            amount: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].min(1), _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].max(10000)]),
            card: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('')
        });
        //For Counts
        this.newpermitsRef = db.object('newpermitdesigns');
        this.newpermits = this.newpermitsRef.valueChanges();
        this.newpermits.subscribe((res) => {
            console.log(res);
            this.newpermitscount = res.count;
            cdr.detectChanges();
        }, (err) => console.log(err), () => console.log('done!'));
        //counts
        this.newprelimsRef = db.object('newprelimdesigns');
        this.newprelims = this.newprelimsRef.valueChanges();
        this.newprelims.subscribe((res) => {
            console.log(res);
            this.newprelimscount = res.count;
            cdr.detectChanges();
        }, (err) => console.log(err), () => console.log('done!'));
        //PESTAMP badge count
        this.newpestampRef = db.object('newpestamp');
        this.newpestamp = this.newpestampRef.valueChanges();
        this.newpestamp.subscribe((res) => {
            console.log(res);
            this.newpestampscount = res.count;
            console.log(res.count);
            cdr.detectChanges();
        }, (err) => console.log(err), () => console.log('done!'));
        //PESTAMP Payment
        this.designData = this.router.getCurrentNavigation().extras.state;
        console.log(this.designData);
        this.mode = this.designData.productdetails.queryParams.mode;
        this.designId = this.designData.productdetails.queryParams.id;
        this.serviceAmount = this.designData.productdetails.queryParams.serviceAmount;
        this.design = this.designData.productdetails.queryParams.design;
        this.data = this.designData.productdetails.queryParams.data;
        this.assignValue = this.designData.productdetails.queryParams.assignValue;
    }
    ngOnInit() {
        //   this.mode= this.route.snapshot.paramMap.get('mode');
        //  this.designId= this.route.snapshot.paramMap.get('id');
        //     this.serviceAmount = this.route.snapshot.paramMap.get('serviceAmount');
        //     this.design = this.route.snapshot.paramMap.get('design');
        //     this.onBoarding = this.route.snapshot.paramMap.get('onBoarding');
        //     this.assignValue = this.route.snapshot.paramMap.get('assignValue');
        //     this.data = this.route.snapshot.paramMap.get('data');
        this.userData = this.storageService.getUser();
        // this.setupStripe();
        console.log(this.mode);
        console.log(this.designId);
        console.log(this.design);
        this.mixpanelService.track("ADD_MONEY_PAGE_OPEN", {});
        if (this.mode == 'card') {
            this.amountForm.patchValue({ amount: this.serviceAmount });
        }
    }
    //  setupStripe() {
    //     let elements = this.stripe.elements();
    //     var style = {
    //       base: {
    //         color: '#32325d',
    //         lineHeight: '24px',
    //         fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    //         fontSmoothing: 'antialiased',
    //         fontSize: '16px',
    //         '::placeholder': {
    //           color: '#111'
    //         }
    //       },
    //       invalid: {
    //         color: '#fa755a',
    //         iconColor: '#fa755a'
    //       }
    //     };
    //     this.card = elements.create('card', { style: style });
    //     console.log(this.card);
    //     this.card.mount('#card-element');
    //     this.card.addEventListener('change', event => {
    //       var displayError = document.getElementById('card-errors');
    //       if (event.error) {
    //         displayError.textContent = event.error.message;
    //       } else {
    //         displayError.textContent = '';
    //       }
    //     });
    // var form = document.getElementById('payment-form');
    // form.addEventListener('submit', event => {
    //   event.preventDefault();
    //   console.log(event)
    // if(this.onBoarding == 'true' || this.onBoarding =='false'){
    //   if(this.amountForm.get('amount').value >=100 && this.amountForm.get('amount').value <= 5000)
    //   {
    //     this.stripe.createToken(this.card).then(result => {
    //       if (result.error) {
    //         var errorElement = document.getElementById('card-errors');
    //         errorElement.textContent = result.error.message;
    //       } else {
    //         console.log(result);
    //         this.token=result;
    //         console.log(this.token.token.id);
    //         this.addMoney();
    //       }
    //     });
    //   }else{
    //     this.utils.errorSnackBar("Please Enter Valid Amount");
    //   }
    // }
    // else{
    //   if(this.amountForm.get('amount').value >=1 && this.amountForm.get('amount').value <=10000)
    //   {
    //   this.stripe.createToken(this.card).then(result => {
    //     if (result.error) {
    //       var errorElement = document.getElementById('card-errors');
    //       errorElement.textContent = result.error.message;
    //     } else {
    //       console.log(result);
    //       this.token=result;
    //       console.log(this.token.token.id);
    //       this.addMoney();
    //     }
    //   });
    // }else{
    //   this.utils.errorSnackBar("Please Enter Valid Amount");
    // }
    //   //}
    // });
    // }
    getSessionID() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            var inputdata = {
                email: this.userData.email,
                userid: this.userData.id,
                amount: this.amountForm.get('amount').value
            };
            const stripe = yield this.stripePromise;
            this.apiService.getStripeSessionID(inputdata).subscribe(response => {
                console.log(response);
                return stripe.redirectToCheckout({ sessionId: response.id });
            }, error => {
                this.utils.errorSnackBar("error");
            });
        });
    }
    //  setupStripe() {
    //     let elements = this.stripe.elements();
    //     var style = {
    //       base: {
    //         color: '#32325d',
    //         lineHeight: '24px',
    //         fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    //         fontSmoothing: 'antialiased',
    //         fontSize: '16px',
    //         '::placeholder': {
    //           color: '#111'
    //         }
    //       },
    //       invalid: {
    //         color: '#fa755a',
    //         iconColor: '#fa755a'
    //       }
    //     };
    //     this.card = elements.create('card', { style: style });
    //     console.log(this.card);
    //     this.card.mount('#card-element');
    //   }
    goBack() {
        this.mixpanelService.track("ADD_MONEY_PAGE_CLOSE", {});
        this.navController.pop();
    }
    addMoney() {
        if (this.mode == 'wallet') {
            var data = {};
            var rechargeData = {};
            //console.log(form.value.cardNo);
            /* this.stripe.setPublishableKey('pk_test_51HQ4cGCd1aF9ZjVZMxEWHOTjNhLTRlhxM4SFLM0lvC0fWQjJ6sxF6LLCWVWUw1ElECj2tZQKHuKkLoYysfhsn6LL00IC6pVMat');
              let card:any= {
                number : form.value.cardNo,
      
                expYear : form.value.expYear,
                expMonth : form.value.expMonth,
                cvc : form.value.cvc,
                amount : form.value.amount,
      
              }
              console.log(card);*/
            this.utils.showLoading("Adding").then(() => {
                //this.stripe.createCardToken(card).then(token => {
                // console.log(token);
                // this.token=token.id
                //      if(this.onBoarding=='true' && this.amountForm.get('amount').value >= 500){
                //       data={
                //         amount:this.amountForm.get('amount').value + 100,
                //         email:this.userData.email,
                //         paymenttype: "wallet",
                //         token:this.token.token.id,
                //         user:this.userData.id
                //       }
                //       console.log(data);
                //      }
                //      else{
                //   data={
                //     amount:this.amountForm.get('amount').value,
                //     email:this.userData.email,
                //     paymenttype: "wallet",
                //     token:this.token.token.id,
                //     user:this.userData.id
                //   }
                // }
                //   console.log(data);
                // this.apiService.createPayment(data).subscribe(res=>{
                //   this.createPayment=res;
                //   this.utils.hideLoading().then(()=>{
                var dates = new Date();
                console.log(dates);
                if (this.onBoarding == 'true' && this.amountForm.get('amount').value > 1000) {
                    rechargeData = {
                        amount: this.amountForm.get('amount').value + 100,
                        datetime: dates,
                        paymenttype: "wallet",
                        type: "succeeded",
                        user: this.userData.id,
                        token: this.token.token.id,
                    };
                }
                else {
                    rechargeData = {
                        amount: this.amountForm.get('amount').value,
                        datetime: dates,
                        paymenttype: "wallet",
                        type: "succeeded",
                        user: this.userData.id,
                        token: this.token.token.id,
                    };
                }
                this.apiService.recharges(rechargeData).subscribe((res) => {
                    this.utils.hideLoading().then(() => {
                        this.responseData = res;
                        let token = this.storageService.getJWTToken();
                        this.storageService.setUser(res.user, token);
                        console.log(res);
                        this.utils.showSnackBar("$" + this.responseData.amount + " added in your wallet successfully");
                        this.goBack();
                        this.utils.setHomepageDesignRefresh(true);
                    }), error => {
                        this.utils.hideLoading().then(() => {
                            console.log("payment was unsuccessful");
                            this.utils.errorSnackBar(error);
                        });
                    };
                });
                this.token = '';
            });
        }
        if (this.mode == 'card') {
            var data = {};
            //console.log(form.value.cardNo);
            // this.stripe.setPublishableKey('pk_test_51HQ4cGCd1aF9ZjVZMxEWHOTjNhLTRlhxM4SFLM0lvC0fWQjJ6sxF6LLCWVWUw1ElECj2tZQKHuKkLoYysfhsn6LL00IC6pVMat');
            /* let card:any= {
               number : form.value.cardNo,
      
               expYear : form.value.expYear,
               expMonth : form.value.expMonth,
               cvc : form.value.cvc,
               amount : form.value.amount,
      
             }*/
            console.log("card");
            this.utils.showLoading("Adding").then(() => {
                // this.stripe.createCardToken(card).then(token => {
                //   console.log(token);
                // this.token=token.id
                var date = new Date();
                if (this.design == 'pestamp') {
                    if (this.assignValue == 'assign') {
                        data = {
                            datetime: date,
                            amount: this.amountForm.get('amount').value,
                            //email:this.userData.email,
                            // paymenttype: "direct",
                            token: this.token.token.id,
                            user: this.userData.id,
                            pestampid: this.designId
                        };
                        this.apiService.createdirectpayment(data).subscribe((res) => {
                            this.createDirectPayment = res;
                            this.utils.hideLoading().then(() => {
                                this.createChatGroup(this.fulldesigndata);
                                if (this.createDirectPayment.status == 'succeeded') {
                                    this.utils.showSnackBar("payment via card is successfull");
                                    var postData = {};
                                    var pestampacceptancestarttime = new Date();
                                    pestampacceptancestarttime.setMinutes(pestampacceptancestarttime.getMinutes() + 15);
                                    postData = {
                                        outsourcedto: 232,
                                        isoutsourced: "true",
                                        status: "outsourced",
                                        pestampacceptancestarttime: pestampacceptancestarttime,
                                        paymenttype: "direct",
                                    };
                                    this.apiService.updatePestamps(this.designId, postData).subscribe(value => {
                                        this.newpestampRef.update({ count: this.newpestampscount + 1 });
                                        console.log(this.newpestampscount);
                                        this.utils.showSnackBar("Pe Stamp request has been send to wattmonk successfully");
                                        this.router.navigate(['pestamp-homepage/pestamp-design']);
                                        this.utils.setPeStampRefresh(true);
                                    });
                                }
                                else {
                                    this.utils.errorSnackBar("payment was unsuccessfull");
                                    this.router.navigate(['pestamp-homepage/pestamp-design']);
                                    this.utils.setPeStampRefresh(true);
                                }
                            });
                        }, (error) => {
                            this.utils.hideLoading();
                            this.utils.errorSnackBar("Something went wrong");
                        });
                    }
                    else {
                        const inputData = {
                            paymenttype: "direct",
                            token: this.token.token.id,
                            pestampid: this.designId,
                            email: this.fulldesigndata.email,
                            amount: this.serviceAmount,
                            user: this.userData.id,
                        };
                        console.log(inputData);
                        if (this.fulldesigndata.propertytype == 'commercial' && (this.fulldesigndata.modeofstamping == 'hardcopy' || this.fulldesigndata.modeofstamping == 'both')) {
                            this.makeCommercialpayment(inputData);
                        }
                        else if (this.fulldesigndata.propertytype == 'commercial' && this.fulldesigndata.modeofstamping == 'ecopy') {
                            this.makeCommercialpayment(inputData);
                        }
                        else if (this.fulldesigndata.propertytype != 'commercial' && (this.fulldesigndata.modeofstamping == 'hardcopy' || this.fulldesigndata.modeofstamping == 'both')) {
                            this.makepayment(inputData);
                        }
                    }
                    this.token = '';
                }
                else {
                    var data = {};
                    if (this.design == 'permit') {
                        data = {
                            //designid:this.designId,
                            datetime: date,
                            amount: this.amountForm.get('amount').value,
                            email: this.userData.email,
                            paymenttype: "direct",
                            token: this.token.token.id,
                            user: this.userData.id,
                            couponid: this.utils.getCouponId().value,
                            designid: this.designId,
                            slabdiscount: this.slabdiscount,
                            serviceamount: this.initialamount
                            // datetime:date,
                            // type:"succeeded"
                        };
                    }
                    else {
                        data = {
                            //designid:this.designId,
                            datetime: date,
                            amount: this.amountForm.get('amount').value,
                            email: this.userData.email,
                            paymenttype: "direct",
                            token: this.token.token.id,
                            user: this.userData.id,
                            couponid: this.utils.getCouponId().value,
                            designid: this.designId,
                        };
                    }
                    console.log(data);
                    this.apiService.createPayment(data).subscribe((res) => {
                        this.createPayment = res;
                        debugger;
                        if (res) {
                            this.utils.hideLoading().then(() => {
                                this.createChatGroup(this.fulldesigndata);
                            });
                        }
                        if (this.createPayment.status == 'succeeded') {
                            this.utils.showSnackBar("payment via card is successfull");
                            if (this.designId === "null") {
                                if (this.design === 'prelim') {
                                    this.utils.setPaymentMode("direct");
                                    this.utils.setScheduleFormEvent(_model_constants__WEBPACK_IMPORTED_MODULE_10__["ScheduleFormEvent"].PAY_EVENT);
                                }
                                else {
                                    this.utils.setPaymentMode("direct");
                                    this.utils.setScheduleFormEvent(_model_constants__WEBPACK_IMPORTED_MODULE_10__["ScheduleFormEvent"].SEND_PERMIT_FORM);
                                }
                            }
                            else {
                                var postData = {};
                                var designacceptancestarttime = new Date();
                                if (this.design == 'prelim') {
                                    designacceptancestarttime.setMinutes(designacceptancestarttime.getMinutes() + 15);
                                    postData = {
                                        outsourcedto: 232,
                                        isoutsourced: "true",
                                        status: "outsourced",
                                        designacceptancestarttime: designacceptancestarttime,
                                        paymenttype: "direct",
                                        couponid: this.utils.getCouponId().value,
                                    };
                                }
                                else {
                                    designacceptancestarttime.setMinutes(designacceptancestarttime.getMinutes() + 30);
                                    postData = {
                                        outsourcedto: 232,
                                        isoutsourced: "true",
                                        status: "outsourced",
                                        designacceptancestarttime: designacceptancestarttime,
                                        paymenttype: "direct",
                                        couponid: this.utils.getCouponId().value,
                                        slabdiscount: this.slabdiscount,
                                        slabtime: this.slabtime,
                                        serviceamount: this.initialamount,
                                        amount: this.amountForm.get('amount').value
                                    };
                                }
                                this.apiService.updateDesignForm(postData, this.designId).subscribe(value => {
                                    if (this.design == 'prelim') {
                                        this.newprelimsRef.update({ count: this.newprelimscount + 1 });
                                        console.log("hello", this.newprelimscount);
                                    }
                                    else {
                                        this.newpermitsRef.update({ count: this.newpermitscount + 1 });
                                    }
                                    this.utils.showSnackBar("Design request has been send to wattmonk successfully");
                                    if (this.design == 'prelim') {
                                        this.router.navigate(['homepage/design']);
                                        this.utils.setHomepageDesignRefresh(true);
                                    }
                                    else {
                                        this.router.navigate(['permithomepage/permitdesign']);
                                        this.utils.setHomepagePermitRefresh(true);
                                    }
                                });
                            }
                        }
                        else {
                            this.utils.errorSnackBar("payment was unsuccessfull");
                            //   if(this.design=='pestamp')
                            //   {
                            // this.router.navigate(['pestamp-homepage/pestamp-design']);
                            // this.utils.setPeStampRefresh(true);
                            //   }
                            if (this.design == 'prelim') {
                                this.router.navigate(['homepage/design']);
                                this.utils.setHomepageDesignRefresh(true);
                            }
                            else {
                                this.router.navigate(['permithomepage/permitdesign']);
                                this.utils.setHomepagePermitRefresh(true);
                            }
                        }
                    }, (error) => {
                        this.utils.hideLoading();
                        this.utils.errorSnackBar("Something went wrong");
                    });
                    this.token = '';
                }
            });
        }
    }
    amountCheck(event) {
        console.log(event.target.value);
        //   if(this.onBoarding == 'true' || this.onBoarding == 'false')
        //   {
        //     if(event.target.value < 100 || event.target.value > 5000)
        // {
        //   this.amountCheckingForOnboarding = true;
        //   console.log(this.amountCheckingForOnboarding);
        // }else{
        //   this.amountCheckingForOnboarding = false;
        // }
        //   }
        //   else{
        if (event.target.value < 1 || event.target.value > 10000) {
            this.amountChecking = true;
            console.log(this.amountChecking);
        }
        else {
            this.amountChecking = false;
        }
        //}
    }
    makepayment(inputData) {
        console.log(inputData);
        this.apiService.createPestamppayment(inputData).subscribe(response => {
            console.log(response);
            this.createpayment = response;
            this.utils.hideLoading().then(() => {
                //if(this.createpayment.status=='succeeded'){
                this.utils.showSnackBar("payment successfull");
                //this.data.isConfirmed = true;
                // this.data.pestamp=response;
                //this.dialogRef.close(this.data);
                //this.notifyService.showSuccess("payment successfull", "success")
                this.router.navigate(['pestamp-homepage/pestamp-design']);
                this.utils.setPeStampRefresh(true);
                //}
                //else{
                //   this.utils.errorSnackBar("payment was unsuccessfull");
                // this.router.navigate(['pestamp-homepage/pestamp-design']);
                // this.utils.setPeStampRefresh(true);
                //}
            });
        }, (error) => {
            this.utils.hideLoading();
            this.utils.errorSnackBar("Something went wrong");
        });
    }
    makeCommercialpayment(inputData) {
        this.apiService.createCommercialPestamppayment(inputData).subscribe(response => {
            console.log(response);
            this.createpayment = response;
            this.utils.hideLoading().then(() => {
                //if(this.createpayment.status=='succeeded'){
                this.utils.showSnackBar("payment successfull");
                this.router.navigate(['pestamp-homepage/pestamp-design']);
                this.utils.setPeStampRefresh(true);
                //this.data.isConfirmed = true;
                // this.data.pestamp=response;
                //this.dialogRef.close(this.data);
                //this.notifyService.showSuccess("payment successfull", "success")
                // }
                // else{
                //   this.utils.errorSnackBar("payment was unsuccessfull");
                // this.router.navigate(['pestamp-homepage/pestamp-design']);
                // this.utils.setPeStampRefresh(true);
                // }
            });
        }, (error) => {
            this.utils.hideLoading();
            this.utils.errorSnackBar("Something went wrong");
        });
    }
    createChatGroup(design) {
        debugger;
        if (this.design == 'pestamp') {
            var GUID = 'pestamp' + "_" + new Date().getTime();
            //var address = design.address.substring(0, 60);
            var groupname = design.personname; // + "_" + address;
            var groupType = _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_12__["CometChat"].GROUP_TYPE.PRIVATE;
            var password = "";
            var group = new _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_12__["CometChat"].Group(GUID, groupname, groupType, password);
            _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_12__["CometChat"].createGroup(group).then(group => {
                let membersList = [
                    new _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_12__["CometChat"].GroupMember("" + design.createdby.id, _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_12__["CometChat"].GROUP_MEMBER_SCOPE.ADMIN)
                ];
                _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_12__["CometChat"].addMembersToGroup(group.getGuid(), membersList, []).then(response => {
                    this.cdr.detectChanges();
                });
            });
        }
        else {
            if (this.design == 'prelim') {
                var GUID = 'prelim' + "_" + new Date().getTime();
            }
            else if (this.design == 'permit') {
                var GUID = 'permit' + "_" + new Date().getTime();
            }
            var address = design.address.substring(0, 60);
            var groupName = design.name + "_" + address;
            var groupType = _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_12__["CometChat"].GROUP_TYPE.PRIVATE;
            var password = "";
            var group = new _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_12__["CometChat"].Group(GUID, groupName, groupType, password);
            _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_12__["CometChat"].createGroup(group).then(group => {
                let membersList = [
                    new _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_12__["CometChat"].GroupMember("" + design.createdby.id, _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_12__["CometChat"].GROUP_MEMBER_SCOPE.ADMIN)
                ];
                _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_12__["CometChat"].addMembersToGroup(group.getGuid(), membersList, []).then(response => {
                    this.cdr.detectChanges();
                });
            });
        }
    }
    paypalintegration() {
        this.payPalConfig = {
            currency: 'USD',
            //for testing
            clientId: 'AV1abOj-_YOVXq_Negcy7Fkc2Esj2GtpY2dRe3nrTwPl4HSX22jbXQ6KKhyJRO7JjPxP__sr7wqi57bg',
            // for live
            //  CLIENT_ID: 'AfKOgzK6Le8LRp8bN4vefjNqC9B7qArUHJt0U_wUmed6hlDHlP-TlHYG9olpqTX85VhHHOD3T9pkfKuP',
            createOrderOnClient: (data) => ({
                intent: 'CAPTURE',
                purchase_units: [{
                        amount: {
                            value: this.amountForm.get('amount').value
                        }
                    }]
            }),
            advanced: {
                extraQueryParams: [{ name: "disable-funding", value: "credit,card" }],
                commit: 'true'
            },
            style: {
                size: 'responsive',
                color: 'silver',
                shape: 'rect',
                label: 'paypal',
                tagline: false,
            },
            onApprove: (data, actions) => {
                console.log('onApprove - transaction was approved, but not authorized', data, actions);
                actions.order.get().then(details => {
                    console.log('onApprove - you can get full order details inside onApprove: ', details);
                    var rechargeData = {};
                    this.utils.showLoading("Adding").then(() => {
                        var sessionId;
                        var dates = new Date();
                        console.log(dates);
                        if (this.onBoarding == 'true' && this.amountForm.get('amount').value > 1000) {
                            rechargeData = {
                                amount: this.amountForm.get('amount').value + 100,
                                datetime: dates,
                                paymenttype: "paypal",
                                type: "succeeded",
                                user: this.userData.id,
                                sessionid: this.sessionId
                            };
                        }
                        else {
                            rechargeData = {
                                amount: this.amountForm.get('amount').value,
                                datetime: dates,
                                paymenttype: "paypal",
                                type: "succeeded",
                                user: this.userData.id,
                                sessionid: ''
                            };
                        }
                        this.apiService.recharges(rechargeData).subscribe((res) => {
                            this.utils.hideLoading().then(() => {
                                this.responseData = res;
                                let token = this.storageService.getJWTToken();
                                this.storageService.setUser(res.user, token);
                                console.log(res);
                                this.utils.showSnackBar("$" + this.responseData.amount + " added in your wallet successfully");
                                this.goBack();
                                this.utils.setHomepageDesignRefresh(true);
                            }), error => {
                                this.utils.hideLoading().then(() => {
                                    console.log("payment was unsuccessful");
                                    this.utils.errorSnackBar(error);
                                });
                            };
                        });
                        this.token = '';
                    });
                });
            },
            onClientAuthorization: (data) => {
                console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
                // this.showSuccess = true;
            },
            onCancel: (data, actions) => {
                console.log('OnCancel', data, actions);
                // this.showCancel = true;
            },
            onError: err => {
                console.log('OnError', err);
                // this.showError = true;
            },
            onClick: (data, actions) => {
                console.log('onClick', data, actions);
                // this.resetStatus();
            },
        };
    }
};
AddMoneyPage.ctorParameters = () => [
    { type: _api_service__WEBPACK_IMPORTED_MODULE_6__["ApiService"] },
    { type: _storage_service__WEBPACK_IMPORTED_MODULE_7__["StorageService"] },
    { type: _utilities_service__WEBPACK_IMPORTED_MODULE_8__["UtilitiesService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_9__["Router"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_9__["ActivatedRoute"] },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["NavController"] },
    { type: _angular_fire_database__WEBPACK_IMPORTED_MODULE_11__["AngularFireDatabase"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ChangeDetectorRef"] },
    { type: _utilities_mixpanel_service__WEBPACK_IMPORTED_MODULE_13__["MixpanelService"] }
];
AddMoneyPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-add-money',
        template: _raw_loader_add_money_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_add_money_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], AddMoneyPage);



/***/ }),

/***/ "v4r+":
/*!***********************************************************!*\
  !*** ./node_modules/@stripe/stripe-js/dist/stripe.esm.js ***!
  \***********************************************************/
/*! exports provided: loadStripe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadStripe", function() { return loadStripe; });
var V3_URL = 'https://js.stripe.com/v3';
var V3_URL_REGEX = /^https:\/\/js\.stripe\.com\/v3\/?(\?.*)?$/;
var EXISTING_SCRIPT_MESSAGE = 'loadStripe.setLoadParameters was called but an existing Stripe.js script already exists in the document; existing script parameters will be used';
var findScript = function findScript() {
  var scripts = document.querySelectorAll("script[src^=\"".concat(V3_URL, "\"]"));

  for (var i = 0; i < scripts.length; i++) {
    var script = scripts[i];

    if (!V3_URL_REGEX.test(script.src)) {
      continue;
    }

    return script;
  }

  return null;
};

var injectScript = function injectScript(params) {
  var queryString = params && !params.advancedFraudSignals ? '?advancedFraudSignals=false' : '';
  var script = document.createElement('script');
  script.src = "".concat(V3_URL).concat(queryString);
  var headOrBody = document.head || document.body;

  if (!headOrBody) {
    throw new Error('Expected document.body not to be null. Stripe.js requires a <body> element.');
  }

  headOrBody.appendChild(script);
  return script;
};

var registerWrapper = function registerWrapper(stripe, startTime) {
  if (!stripe || !stripe._registerWrapper) {
    return;
  }

  stripe._registerWrapper({
    name: 'stripe-js',
    version: "1.13.1",
    startTime: startTime
  });
};

var stripePromise = null;
var loadScript = function loadScript(params) {
  // Ensure that we only attempt to load Stripe.js at most once
  if (stripePromise !== null) {
    return stripePromise;
  }

  stripePromise = new Promise(function (resolve, reject) {
    if (typeof window === 'undefined') {
      // Resolve to null when imported server side. This makes the module
      // safe to import in an isomorphic code base.
      resolve(null);
      return;
    }

    if (window.Stripe && params) {
      console.warn(EXISTING_SCRIPT_MESSAGE);
    }

    if (window.Stripe) {
      resolve(window.Stripe);
      return;
    }

    try {
      var script = findScript();

      if (script && params) {
        console.warn(EXISTING_SCRIPT_MESSAGE);
      } else if (!script) {
        script = injectScript(params);
      }

      script.addEventListener('load', function () {
        if (window.Stripe) {
          resolve(window.Stripe);
        } else {
          reject(new Error('Stripe.js not available'));
        }
      });
      script.addEventListener('error', function () {
        reject(new Error('Failed to load Stripe.js'));
      });
    } catch (error) {
      reject(error);
      return;
    }
  });
  return stripePromise;
};
var initStripe = function initStripe(maybeStripe, args, startTime) {
  if (maybeStripe === null) {
    return null;
  }

  var stripe = maybeStripe.apply(undefined, args);
  registerWrapper(stripe, startTime);
  return stripe;
};

// own script injection.

var stripePromise$1 = Promise.resolve().then(function () {
  return loadScript(null);
});
var loadCalled = false;
stripePromise$1["catch"](function (err) {
  if (!loadCalled) {
    console.warn(err);
  }
});
var loadStripe = function loadStripe() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  loadCalled = true;
  var startTime = Date.now();
  return stripePromise$1.then(function (maybeStripe) {
    return initStripe(maybeStripe, args, startTime);
  });
};




/***/ }),

/***/ "xUdR":
/*!***********************************************!*\
  !*** ./src/app/add-money/add-money.module.ts ***!
  \***********************************************/
/*! exports provided: AddMoneyPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddMoneyPageModule", function() { return AddMoneyPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _add_money_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./add-money-routing.module */ "bcHw");
/* harmony import */ var _add_money_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./add-money.page */ "m7as");
/* harmony import */ var ngx_paypal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-paypal */ "ejwX");








let AddMoneyPageModule = class AddMoneyPageModule {
};
AddMoneyPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        entryComponents: [],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _add_money_routing_module__WEBPACK_IMPORTED_MODULE_5__["AddMoneyPageRoutingModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
            ngx_paypal__WEBPACK_IMPORTED_MODULE_7__["NgxPayPalModule"]
        ],
        declarations: [_add_money_page__WEBPACK_IMPORTED_MODULE_6__["AddMoneyPage"]]
    })
], AddMoneyPageModule);



/***/ })

}]);
//# sourceMappingURL=add-money-add-money-module.js.map