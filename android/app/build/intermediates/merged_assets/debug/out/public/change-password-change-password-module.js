(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["change-password-change-password-module"],{

/***/ "/ujS":
/*!*********************************************************!*\
  !*** ./src/app/change-password/change-password.page.ts ***!
  \*********************************************************/
/*! exports provided: ChangePasswordPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChangePasswordPage", function() { return ChangePasswordPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_change_password_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./change-password.page.html */ "YQwf");
/* harmony import */ var _change_password_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./change-password.page.scss */ "Gr1o");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/storage */ "e8h1");
/* harmony import */ var _storage_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../storage.service */ "qkCY");
/* harmony import */ var _utilities_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utilities.service */ "oTnF");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../api.service */ "yTNM");
/* harmony import */ var _model_constants__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../model/constants */ "Kp5Z");











let ChangePasswordPage = class ChangePasswordPage {
    constructor(formBuilder, utils, navController, apiService, storage, deviceStorage) {
        this.formBuilder = formBuilder;
        this.utils = utils;
        this.navController = navController;
        this.apiService = apiService;
        this.storage = storage;
        this.deviceStorage = deviceStorage;
        // error messages from constants
        this.emailError = _model_constants__WEBPACK_IMPORTED_MODULE_10__["INVALID_EMAIL_MESSAGE"];
        this.fieldRequired = _model_constants__WEBPACK_IMPORTED_MODULE_10__["FIELD_REQUIRED"];
        this.isActiveToggleTextPassword = false;
        this.isActiveToggleTextnewPassword = false;
    }
    ngOnInit() {
        this.password = localStorage.getItem('password');
        this.changepassword = this.formBuilder.group({
            newpassword: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].minLength(6)]),
            oldpassword: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].minLength(6)),
            confirmpassword: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].minLength(6))
        });
    }
    toggleTextPassword() {
        this.isActiveToggleTextPassword = (this.isActiveToggleTextPassword == true) ? false : true;
    }
    toggleTextnewPassword() {
        this.isActiveToggleTextnewPassword = (this.isActiveToggleTextnewPassword == true) ? false : true;
    }
    getType() {
        return this.isActiveToggleTextPassword ? 'text' : 'password';
    }
    getnewType() {
        return this.isActiveToggleTextnewPassword ? 'text' : 'password';
    }
    resetPassword() {
        let data = {
            newpassword: this.changepassword.controls.newpassword.value,
            confirmpassword: this.changepassword.controls.confirmpassword.value,
            oldpassword: this.password
        };
        console.log(data, ">>>>>>>>>>>>>>>>.");
        if (this.changepassword.status === 'VALID') {
            console.log(this.changepassword.value);
            this.utils.showLoading('Resetting password').then(() => {
                this.apiService.changepassword(data).subscribe((response) => {
                    console.log(response);
                    let postdata = {
                        isdefaultpassword: false
                    };
                    this.utils.hideLoading().then(() => {
                        this.utils.showSnackBar('Your password has been changed successfully!');
                        //  this.utils.showSuccessModal('User password changed successfully!').then((modal) => {
                        //  this.apiService.updateresetpassword(response.user.id,postdata).subscribe(res=>{
                        //   console.log(res,"ressss");
                        //  },err=>{
                        //       console.log(err,"errr");
                        //  })
                        //  modal.present();
                        //  modal.onWillDismiss().then((dismissed) => {
                        // this.goBack();
                        this.storage.logout();
                        this.deviceStorage.clear();
                        this.navController.navigateBack('login');
                        //  });
                        //  }, (responseError) => {
                        //   const error: ErrorModel = responseError.error;
                        //   this.utils.errorSnackBar(error.message[0].messages[0].message);
                        //  });
                    });
                }, (responseError) => {
                    const error = responseError.error;
                    this.utils.hideLoading().then(() => {
                        this.utils.errorSnackBar(error.message[0].messages[0].message);
                    });
                });
            });
        }
        else {
            this.utils.errorSnackBar('Invalid Password entered.');
        }
    }
    goBack() {
        this.navController.pop();
    }
    ionViewWillLeave() {
    }
};
ChangePasswordPage.ctorParameters = () => [
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"] },
    { type: _utilities_service__WEBPACK_IMPORTED_MODULE_7__["UtilitiesService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_8__["NavController"] },
    { type: _api_service__WEBPACK_IMPORTED_MODULE_9__["ApiService"] },
    { type: _storage_service__WEBPACK_IMPORTED_MODULE_6__["StorageService"] },
    { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_5__["Storage"] }
];
ChangePasswordPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-change-password',
        template: _raw_loader_change_password_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_change_password_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], ChangePasswordPage);



/***/ }),

/***/ "6+Cs":
/*!*******************************************************************!*\
  !*** ./src/app/change-password/change-password-routing.module.ts ***!
  \*******************************************************************/
/*! exports provided: ChangePasswordPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChangePasswordPageRoutingModule", function() { return ChangePasswordPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _change_password_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./change-password.page */ "/ujS");




const routes = [
    {
        path: '',
        component: _change_password_page__WEBPACK_IMPORTED_MODULE_3__["ChangePasswordPage"]
    }
];
let ChangePasswordPageRoutingModule = class ChangePasswordPageRoutingModule {
};
ChangePasswordPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], ChangePasswordPageRoutingModule);



/***/ }),

/***/ "8oFo":
/*!***********************************************************!*\
  !*** ./src/app/change-password/change-password.module.ts ***!
  \***********************************************************/
/*! exports provided: ChangePasswordPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChangePasswordPageModule", function() { return ChangePasswordPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _change_password_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./change-password-routing.module */ "6+Cs");
/* harmony import */ var _change_password_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./change-password.page */ "/ujS");







let ChangePasswordPageModule = class ChangePasswordPageModule {
};
ChangePasswordPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _change_password_routing_module__WEBPACK_IMPORTED_MODULE_5__["ChangePasswordPageRoutingModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"]
        ],
        declarations: [_change_password_page__WEBPACK_IMPORTED_MODULE_6__["ChangePasswordPage"]]
    })
], ChangePasswordPageModule);



/***/ }),

/***/ "Gr1o":
/*!***********************************************************!*\
  !*** ./src/app/change-password/change-password.page.scss ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".title {\n  font-size: 22px;\n  text-align: center;\n  color: #666666;\n}\n\n* {\n  color: #9A9A9A;\n}\n\n.password_box {\n  display: flex;\n  border-bottom: 1px solid #ced4da !important;\n}\n\n.eye_box {\n  display: flex;\n  align-items: center;\n}\n\n.password_input {\n  margin-bottom: -5px;\n}\n\n.image-area {\n  margin-top: 1em;\n  width: 3em;\n  height: 3em;\n  background: white;\n  border-radius: 0.5em;\n  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.5);\n}\n\n.small-padding {\n  padding: 8px;\n}\n\n.title-text {\n  font-size: 25px;\n}\n\n.normal-text {\n  font-size: 1em;\n}\n\n.large-margin {\n  margin-top: 3em;\n}\n\n.small-text {\n  font-size: 0.95em;\n}\n\n.smaller-text {\n  font-size: 0.85em;\n}\n\n.submit-text {\n  font-size: 1.5em;\n}\n\nol {\n  padding-inline-start: 20px;\n  margin-block-start: 0;\n  margin-block-end: 0;\n}\n\n.error {\n  color: #df3e3e;\n  font-size: 11px;\n}\n\n.error1 {\n  color: #4b4b4b;\n  border-bottom: 1px solid #ff0000;\n}\n\n.font-color {\n  color: #111;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXGNoYW5nZS1wYXNzd29yZC5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxlQUFBO0VBQ0Esa0JBQUE7RUFDQSxjQUFBO0FBQ0o7O0FBRUU7RUFDRSxjQUFBO0FBQ0o7O0FBQ0U7RUFDRSxhQUFBO0VBQ0EsMkNBQUE7QUFFSjs7QUFFRTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtBQUNKOztBQUVFO0VBQ0UsbUJBQUE7QUFDSjs7QUFFRTtFQUNFLGVBQUE7RUFDQSxVQUFBO0VBQ0EsV0FBQTtFQUNBLGlCQUFBO0VBQ0Esb0JBQUE7RUFDQSwwQ0FBQTtBQUNKOztBQUVFO0VBQ0UsWUFBQTtBQUNKOztBQUVFO0VBQ0UsZUFBQTtBQUNKOztBQUVFO0VBQ0UsY0FBQTtBQUNKOztBQUVFO0VBQ0UsZUFBQTtBQUNKOztBQUVFO0VBQ0UsaUJBQUE7QUFDSjs7QUFFRTtFQUNFLGlCQUFBO0FBQ0o7O0FBRUU7RUFDRSxnQkFBQTtBQUNKOztBQUVFO0VBQ0UsMEJBQUE7RUFDQSxxQkFBQTtFQUNBLG1CQUFBO0FBQ0o7O0FBRUU7RUFDRSxjQUFBO0VBQ0EsZUFBQTtBQUNKOztBQUVFO0VBQ0UsY0FBQTtFQUNBLGdDQUFBO0FBQ0o7O0FBRUU7RUFDRSxXQUFBO0FBQ0oiLCJmaWxlIjoiY2hhbmdlLXBhc3N3b3JkLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi50aXRsZSB7XHJcbiAgICBmb250LXNpemU6IDIycHg7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBjb2xvcjogIzY2NjY2NjtcclxuICB9XHJcbiAgXHJcbiAgKiB7XHJcbiAgICBjb2xvcjogIzlBOUE5QTtcclxuICB9XHJcbiAgLnBhc3N3b3JkX2JveCB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNjZWQ0ZGEgIWltcG9ydGFudDtcclxuICBcclxuICB9XHJcblxyXG4gIC5leWVfYm94IHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIH1cclxuICBcclxuICAucGFzc3dvcmRfaW5wdXQge1xyXG4gICAgbWFyZ2luLWJvdHRvbTogLTVweDtcclxuICB9XHJcbiAgXHJcbiAgLmltYWdlLWFyZWEge1xyXG4gICAgbWFyZ2luLXRvcDogMWVtO1xyXG4gICAgd2lkdGg6IDNlbTtcclxuICAgIGhlaWdodDogM2VtO1xyXG4gICAgYmFja2dyb3VuZDogd2hpdGU7XHJcbiAgICBib3JkZXItcmFkaXVzOiAwLjVlbTtcclxuICAgIGJveC1zaGFkb3c6IDAgMXB4IDNweCAwIHJnYmEoMCwgMCwgMCwgMC41KTtcclxuICB9XHJcbiAgXHJcbiAgLnNtYWxsLXBhZGRpbmcge1xyXG4gICAgcGFkZGluZzogOHB4O1xyXG4gIH1cclxuICBcclxuICAudGl0bGUtdGV4dCB7XHJcbiAgICBmb250LXNpemU6IDI1cHg7XHJcbiAgfVxyXG4gIFxyXG4gIC5ub3JtYWwtdGV4dCB7XHJcbiAgICBmb250LXNpemU6IDFlbTtcclxuICB9XHJcbiAgXHJcbiAgLmxhcmdlLW1hcmdpbiB7XHJcbiAgICBtYXJnaW4tdG9wOiAzZW07XHJcbiAgfVxyXG4gIFxyXG4gIC5zbWFsbC10ZXh0IHtcclxuICAgIGZvbnQtc2l6ZTogMC45NWVtO1xyXG4gIH1cclxuICBcclxuICAuc21hbGxlci10ZXh0IHtcclxuICAgIGZvbnQtc2l6ZTogMC44NWVtO1xyXG4gIH1cclxuICBcclxuICAuc3VibWl0LXRleHQge1xyXG4gICAgZm9udC1zaXplOiAxLjVlbTtcclxuICB9XHJcbiAgXHJcbiAgb2wge1xyXG4gICAgcGFkZGluZy1pbmxpbmUtc3RhcnQ6IDIwcHg7XHJcbiAgICBtYXJnaW4tYmxvY2stc3RhcnQ6IDA7XHJcbiAgICBtYXJnaW4tYmxvY2stZW5kOiAwO1xyXG4gIH1cclxuICBcclxuICAuZXJyb3Ige1xyXG4gICAgY29sb3I6IHJnYigyMjMsIDYyLCA2Mik7XHJcbiAgICBmb250LXNpemU6IDExcHg7XHJcbiAgfVxyXG4gIFxyXG4gIC5lcnJvcjEge1xyXG4gICAgY29sb3I6IHJnYig3NSwgNzUsIDc1KTtcclxuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZmYwMDAwO1xyXG4gIH1cclxuXHJcbiAgLmZvbnQtY29sb3J7XHJcbiAgICBjb2xvcjojMTExO1xyXG4gIH1cclxuICAiXX0= */");

/***/ }),

/***/ "YQwf":
/*!*************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/change-password/change-password.page.html ***!
  \*************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header class=\"ion-no-border\">\r\n    <ion-grid class=\"ion-padding header-bg\">\r\n        <ion-row>\r\n            <!-- <ion-col size=\"auto\">\r\n                <ion-button fill=\"clear\" size=\"small\" class=\"ion-no-padding\" (click)=\"goBack()\">\r\n                    <ion-img src=\"/assets/images/back.svg\" class=\"action-icon\"></ion-img>\r\n                </ion-button>\r\n            </ion-col> -->\r\n            <ion-col>\r\n                <ion-grid class=\"ion-align-items-center ion-justify-content-center\">\r\n                    <ion-row class=\"ion-align-items-center ion-justify-content-center\">\r\n                        <span class=\"title\">Change password</span>\r\n                    </ion-row>\r\n                </ion-grid>\r\n            </ion-col>\r\n            <!-- <ion-col size=\"auto\">\r\n                <ion-button fill=\"clear\" disabled=\"true\" size=\"small\" class=\"ion-no-padding action-icon\">\r\n                </ion-button>\r\n            </ion-col> -->\r\n        </ion-row>\r\n    </ion-grid>\r\n\r\n    <ion-grid class=\"position-relative ion-no-padding\">\r\n        <ion-row class=\"ion-no-padding border-header header-half-height\">\r\n        </ion-row>\r\n        <ion-row class=\"ion-no-padding header-half-height\">\r\n        </ion-row>\r\n        <ion-row class=\"ion-no-padding position-absolute header-icon-position full-width\">\r\n        </ion-row>\r\n    </ion-grid>\r\n</ion-header>\r\n<ion-content>\r\n    <div class=\"ion-padding\">\r\n        <ion-grid class=\"ion-padding\">\r\n            <form [formGroup]=\"changepassword\" novalidate>\r\n                <ion-row>\r\n                    <ion-col size=\"12\">\r\n                        <span class=\"title-text font-color\">Welcome!</span>\r\n                    </ion-col>\r\n                    <ion-col size=\"12\">\r\n                        <span class=\"normal-text font-color\">Let us help you yo set a new password instead of using a default one.</span>\r\n                    </ion-col>\r\n\r\n                    <ion-col size=\"12\" class=\"ion-margin-top ion-no-padding\">\r\n                        <ion-item class=\"ion-no-padding\">\r\n                            <!-- <div class=\"password_box\"> -->\r\n                                <ion-input type=\"password\" class=\"password_input font-color\" [type]=\"getType()\" placeholder=\"new password*\" formControlName=\"newpassword\">\r\n                                </ion-input>\r\n                                <div class=\"eye_box\">\r\n                                    <ion-icon name=\"eye\" *ngIf=\"isActiveToggleTextPassword\" (click)=\"toggleTextPassword()\" slot=\"end\"></ion-icon>\r\n                                    <ion-icon name=\"eye-off\" *ngIf=\"!isActiveToggleTextPassword\" (click)=\"toggleTextPassword()\" slot=\"end\"></ion-icon>\r\n                                </div>\r\n                            <!-- </div> -->\r\n                        </ion-item>\r\n                        <ion-item class=\"ion-no-padding\">\r\n                            <!-- <div class=\"password_box\"> -->\r\n                                <ion-input type=\"password\" class=\"password_input font-color\" [type]=\"getnewType()\" placeholder=\"confirm password*\" formControlName=\"confirmpassword\">\r\n                                </ion-input>\r\n                                <div class=\"eye_box\">\r\n                                    <ion-icon name=\"eye\" *ngIf=\"isActiveToggleTextnewPassword\" (click)=\"toggleTextnewPassword()\" slot=\"end\"></ion-icon>\r\n                                    <ion-icon name=\"eye-off\" *ngIf=\"!isActiveToggleTextnewPassword\" (click)=\"toggleTextnewPassword()\" slot=\"end\"></ion-icon>\r\n                                </div>\r\n                            <!-- </div> -->\r\n                        </ion-item>\r\n                    </ion-col>\r\n              \r\n                      <!-- <ion-row> -->\r\n                        <ion-col size=\"12\" class=\"large-margin\">\r\n                            <span class=\"ion-padding-top ion-padding-bottom submit-text action-button-color\"\r\n                                  (click)=\"resetPassword()\">Continue</span>\r\n                        </ion-col>\r\n                      <!-- </ion-row> -->\r\n\r\n                </ion-row>\r\n            </form>\r\n        </ion-grid>\r\n    </div>\r\n\r\n</ion-content>\r\n");

/***/ })

}]);
//# sourceMappingURL=change-password-change-password-module.js.map