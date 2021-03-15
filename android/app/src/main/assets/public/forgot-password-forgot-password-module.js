(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["forgot-password-forgot-password-module"],{

/***/ "2bN1":
/*!*********************************************************!*\
  !*** ./src/app/forgot-password/forgot-password.page.ts ***!
  \*********************************************************/
/*! exports provided: ForgotPasswordPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ForgotPasswordPage", function() { return ForgotPasswordPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_forgot_password_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./forgot-password.page.html */ "l7ks");
/* harmony import */ var _forgot_password_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./forgot-password.page.scss */ "hxgU");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _utilities_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utilities.service */ "oTnF");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../api.service */ "yTNM");
/* harmony import */ var _model_constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../model/constants */ "Kp5Z");









let ForgotPasswordPage = class ForgotPasswordPage {
    constructor(formBuilder, utils, navController, apiService) {
        this.formBuilder = formBuilder;
        this.utils = utils;
        this.navController = navController;
        this.apiService = apiService;
        // error messages from constants
        this.emailError = _model_constants__WEBPACK_IMPORTED_MODULE_8__["INVALID_EMAIL_MESSAGE"];
        this.fieldRequired = _model_constants__WEBPACK_IMPORTED_MODULE_8__["FIELD_REQUIRED"];
    }
    ngOnInit() {
        const EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
        this.forgotPasswordForm = this.formBuilder.group({
            email: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].pattern(EMAILPATTERN)]),
        });
    }
    resendPassword() {
        if (this.forgotPasswordForm.status === 'VALID') {
            this.utils.showLoading('Sending password Link').then(() => {
                this.apiService.sendForgotPasswordLink(this.forgotPasswordForm.value).subscribe((response) => {
                    this.utils.hideLoading().then(() => {
                        this.utils.showSuccessModal('Password link sent successfully').then((modal) => {
                            modal.present();
                            modal.onWillDismiss().then((dismissed) => {
                                this.goBack();
                            });
                        }, (error) => {
                        });
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
            this.utils.errorSnackBar('Invalid Email address');
        }
    }
    goBack() {
        this.navController.navigateBack('login');
    }
    ionVieWillLeave() {
    }
};
ForgotPasswordPage.ctorParameters = () => [
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"] },
    { type: _utilities_service__WEBPACK_IMPORTED_MODULE_5__["UtilitiesService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["NavController"] },
    { type: _api_service__WEBPACK_IMPORTED_MODULE_7__["ApiService"] }
];
ForgotPasswordPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-forgot-password',
        template: _raw_loader_forgot_password_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_forgot_password_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], ForgotPasswordPage);



/***/ }),

/***/ "JgOp":
/*!***********************************************************!*\
  !*** ./src/app/forgot-password/forgot-password.module.ts ***!
  \***********************************************************/
/*! exports provided: ForgotPasswordPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ForgotPasswordPageModule", function() { return ForgotPasswordPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _forgot_password_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./forgot-password-routing.module */ "RtEn");
/* harmony import */ var _forgot_password_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./forgot-password.page */ "2bN1");







let ForgotPasswordPageModule = class ForgotPasswordPageModule {
};
ForgotPasswordPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _forgot_password_routing_module__WEBPACK_IMPORTED_MODULE_5__["ForgotPasswordPageRoutingModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"]
        ],
        declarations: [_forgot_password_page__WEBPACK_IMPORTED_MODULE_6__["ForgotPasswordPage"]]
    })
], ForgotPasswordPageModule);



/***/ }),

/***/ "RtEn":
/*!*******************************************************************!*\
  !*** ./src/app/forgot-password/forgot-password-routing.module.ts ***!
  \*******************************************************************/
/*! exports provided: ForgotPasswordPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ForgotPasswordPageRoutingModule", function() { return ForgotPasswordPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _forgot_password_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./forgot-password.page */ "2bN1");




const routes = [
    {
        path: '',
        component: _forgot_password_page__WEBPACK_IMPORTED_MODULE_3__["ForgotPasswordPage"]
    }
];
let ForgotPasswordPageRoutingModule = class ForgotPasswordPageRoutingModule {
};
ForgotPasswordPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], ForgotPasswordPageRoutingModule);



/***/ }),

/***/ "hxgU":
/*!***********************************************************!*\
  !*** ./src/app/forgot-password/forgot-password.page.scss ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".title {\n  font-size: 22px;\n  text-align: center;\n  color: #666666;\n}\n\n* {\n  color: #9A9A9A;\n}\n\n.image-area {\n  margin-top: 1em;\n  width: 3em;\n  height: 3em;\n  background: white;\n  border-radius: 0.5em;\n  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.5);\n}\n\n.small-padding {\n  padding: 8px;\n}\n\n.title-text {\n  font-size: 1.3em;\n}\n\n.normal-text {\n  font-size: 1em;\n}\n\n.large-margin {\n  margin-top: 3em;\n}\n\n.small-text {\n  font-size: 0.95em;\n}\n\n.smaller-text {\n  font-size: 0.85em;\n}\n\n.submit-text {\n  font-size: 1.5em;\n}\n\nol {\n  padding-inline-start: 20px;\n  margin-block-start: 0;\n  margin-block-end: 0;\n}\n\n.error {\n  color: #df3e3e;\n  font-size: 11px;\n}\n\n.error1 {\n  color: #4b4b4b;\n  border-bottom: 1px solid #ff0000;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXGZvcmdvdC1wYXNzd29yZC5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxlQUFBO0VBQ0Esa0JBQUE7RUFDQSxjQUFBO0FBQ0Y7O0FBRUE7RUFDRSxjQUFBO0FBQ0Y7O0FBRUE7RUFDRSxlQUFBO0VBQ0EsVUFBQTtFQUNBLFdBQUE7RUFDQSxpQkFBQTtFQUNBLG9CQUFBO0VBQ0EsMENBQUE7QUFDRjs7QUFFQTtFQUNFLFlBQUE7QUFDRjs7QUFFQTtFQUNFLGdCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxjQUFBO0FBQ0Y7O0FBRUE7RUFDRSxlQUFBO0FBQ0Y7O0FBRUE7RUFDRSxpQkFBQTtBQUNGOztBQUVBO0VBQ0UsaUJBQUE7QUFDRjs7QUFFQTtFQUNFLGdCQUFBO0FBQ0Y7O0FBRUE7RUFDRSwwQkFBQTtFQUNBLHFCQUFBO0VBQ0EsbUJBQUE7QUFDRjs7QUFFQTtFQUNFLGNBQUE7RUFDQSxlQUFBO0FBQ0Y7O0FBRUE7RUFDRSxjQUFBO0VBQ0EsZ0NBQUE7QUFDRiIsImZpbGUiOiJmb3Jnb3QtcGFzc3dvcmQucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnRpdGxlIHtcclxuICBmb250LXNpemU6IDIycHg7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIGNvbG9yOiAjNjY2NjY2O1xyXG59XHJcblxyXG4qIHtcclxuICBjb2xvcjogIzlBOUE5QTtcclxufVxyXG5cclxuLmltYWdlLWFyZWEge1xyXG4gIG1hcmdpbi10b3A6IDFlbTtcclxuICB3aWR0aDogM2VtO1xyXG4gIGhlaWdodDogM2VtO1xyXG4gIGJhY2tncm91bmQ6IHdoaXRlO1xyXG4gIGJvcmRlci1yYWRpdXM6IDAuNWVtO1xyXG4gIGJveC1zaGFkb3c6IDAgMXB4IDNweCAwIHJnYmEoMCwgMCwgMCwgMC41KTtcclxufVxyXG5cclxuLnNtYWxsLXBhZGRpbmcge1xyXG4gIHBhZGRpbmc6IDhweDtcclxufVxyXG5cclxuLnRpdGxlLXRleHQge1xyXG4gIGZvbnQtc2l6ZTogMS4zZW07XHJcbn1cclxuXHJcbi5ub3JtYWwtdGV4dCB7XHJcbiAgZm9udC1zaXplOiAxZW07XHJcbn1cclxuXHJcbi5sYXJnZS1tYXJnaW4ge1xyXG4gIG1hcmdpbi10b3A6IDNlbTtcclxufVxyXG5cclxuLnNtYWxsLXRleHQge1xyXG4gIGZvbnQtc2l6ZTogMC45NWVtO1xyXG59XHJcblxyXG4uc21hbGxlci10ZXh0IHtcclxuICBmb250LXNpemU6IDAuODVlbTtcclxufVxyXG5cclxuLnN1Ym1pdC10ZXh0IHtcclxuICBmb250LXNpemU6IDEuNWVtO1xyXG59XHJcblxyXG5vbCB7XHJcbiAgcGFkZGluZy1pbmxpbmUtc3RhcnQ6IDIwcHg7XHJcbiAgbWFyZ2luLWJsb2NrLXN0YXJ0OiAwO1xyXG4gIG1hcmdpbi1ibG9jay1lbmQ6IDA7XHJcbn1cclxuXHJcbi5lcnJvciB7XHJcbiAgY29sb3I6IHJnYigyMjMsIDYyLCA2Mik7XHJcbiAgZm9udC1zaXplOiAxMXB4O1xyXG59XHJcblxyXG4uZXJyb3IxIHtcclxuICBjb2xvcjogcmdiKDc1LCA3NSwgNzUpO1xyXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZmYwMDAwO1xyXG59XHJcbiJdfQ== */");

/***/ }),

/***/ "l7ks":
/*!*************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/forgot-password/forgot-password.page.html ***!
  \*************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header class=\"ion-no-border\">\r\n    <ion-grid class=\"ion-padding header-bg\">\r\n        <ion-row class=\"ion-margin-top\">\r\n            <ion-col size=\"auto\">\r\n                <ion-button fill=\"clear\" size=\"small\" class=\"ion-no-padding\" (click)=\"goBack()\">\r\n                    <ion-img src=\"/assets/images/back.svg\" class=\"action-icon\"></ion-img>\r\n                </ion-button>\r\n            </ion-col>\r\n            <ion-col>\r\n                <ion-grid class=\"ion-align-items-center ion-justify-content-center\">\r\n                    <ion-row class=\"ion-align-items-center ion-justify-content-center\">\r\n                        <span class=\"title\">Forgot password</span>\r\n                    </ion-row>\r\n                </ion-grid>\r\n            </ion-col>\r\n            <ion-col size=\"auto\">\r\n                <ion-button fill=\"clear\" disabled=\"true\" size=\"small\" class=\"ion-no-padding action-icon\">\r\n                </ion-button>\r\n            </ion-col>\r\n        </ion-row>\r\n    </ion-grid>\r\n\r\n    <ion-grid class=\"position-relative ion-no-padding\">\r\n        <ion-row class=\"ion-no-padding border-header header-half-height\">\r\n        </ion-row>\r\n        <ion-row class=\"ion-no-padding header-half-height\">\r\n        </ion-row>\r\n        <ion-row class=\"ion-no-padding position-absolute header-icon-position full-width\">\r\n            <ion-col class=\"flex-center\">\r\n                <ion-img src=\"/assets/images/forgot.svg\" class=\"header-icon\"></ion-img>\r\n            </ion-col>\r\n        </ion-row>\r\n    </ion-grid>\r\n</ion-header>\r\n<ion-content>\r\n    <div class=\"ion-padding\">\r\n        <ion-grid class=\"ion-padding\">\r\n            <form [formGroup]=\"forgotPasswordForm\" novalidate>\r\n                <ion-row>\r\n                    <ion-col size=\"12\">\r\n                        <span class=\"title-text\">Having trouble logging in?</span>\r\n                    </ion-col>\r\n                    <ion-col size=\"12\">\r\n                        <span class=\"normal-text\">To reset your password, enter your wattmonk registered email\r\n                            address.</span>\r\n                    </ion-col>\r\n\r\n                    <ion-col size=\"12\" class=\"ion-margin-top ion-no-padding\">\r\n                        <ion-item class=\"ion-no-padding\">\r\n                            <ion-input type=\"email\" placeholder=\"your email address\"\r\n                                       class=\"form_input\" autocomplete=\"off\"\r\n                                       formControlName=\"email\">\r\n                            </ion-input>\r\n                        </ion-item>\r\n                        <div class=\"error_div\">\r\n                            <div  *ngIf=\"forgotPasswordForm.get('email').hasError('pattern') && forgotPasswordForm.get('email').dirty\">\r\n                                <span class=\"error\">{{emailError}}</span>\r\n                            </div>       \r\n                        </div>  \r\n                        <div class=\"error_div\">\r\n                            <div *ngIf=\"forgotPasswordForm.get('email').value === '' && forgotPasswordForm.get('email').dirty\">\r\n                                <span class=\"error\">{{fieldRequired}}</span>\r\n                            </div>       \r\n                        </div>  \r\n\r\n                    </ion-col>\r\n                    <ion-col size=\"12\" class=\"large-margin\">\r\n                        <span class=\"small-text\">Steps to follow:-</span>\r\n                    </ion-col>\r\n                    <ion-col size=\"12\" class=\"ion-no-margin ion-no-padding\">\r\n                        <ol class=\"smaller-text\">\r\n                            <li>Reset password link will be shared to your registered email.</li>\r\n                            <li>Click on the link to reset your password instantly.</li>\r\n                            <li>The link is valid for 24 hours.</li>\r\n                        </ol>\r\n                    </ion-col>\r\n\r\n                    <ion-col size=\"12\" class=\"large-margin\">\r\n                        <span class=\"ion-padding-top ion-padding-bottom submit-text action-button-color\"\r\n                              (click)=\"resendPassword()\">Continue</span>\r\n                    </ion-col>\r\n\r\n                </ion-row>\r\n            </form>\r\n        </ion-grid>\r\n    </div>\r\n\r\n</ion-content>\r\n");

/***/ })

}]);
//# sourceMappingURL=forgot-password-forgot-password-module.js.map