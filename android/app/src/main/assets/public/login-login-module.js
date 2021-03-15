(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["login-login-module"],{

/***/ "34Y5":
/*!*************************************!*\
  !*** ./src/app/login/login.page.ts ***!
  \*************************************/
/*! exports provided: LoginPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginPage", function() { return LoginPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_login_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./login.page.html */ "V6Ie");
/* harmony import */ var _login_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./login.page.scss */ "r67e");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../api.service */ "yTNM");
/* harmony import */ var _utilities_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utilities.service */ "oTnF");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _storage_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../storage.service */ "qkCY");
/* harmony import */ var _model_constants__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../model/constants */ "Kp5Z");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _contants__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../contants */ "6qqZ");
/* harmony import */ var _networkdetect_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../networkdetect.service */ "UZ2B");
/* harmony import */ var _utilities_mixpanel_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../utilities/mixpanel.service */ "uKCw");














let LoginPage = class LoginPage {
    constructor(formBuilder, utils, apiService, storageService, router, network, navController, mixpanelService) {
        this.formBuilder = formBuilder;
        this.utils = utils;
        this.apiService = apiService;
        this.storageService = storageService;
        this.router = router;
        this.network = network;
        this.navController = navController;
        this.mixpanelService = mixpanelService;
        this.isActiveToggleTextPassword = true;
        this.emailError = _model_constants__WEBPACK_IMPORTED_MODULE_9__["INVALID_EMAIL_MESSAGE"];
        this.fieldRequired = _model_constants__WEBPACK_IMPORTED_MODULE_9__["FIELD_REQUIRED"];
        this.isLoggedInOnce = false;
        this.isLoggedInOnce = this.storageService.isLoggedInOnce();
    }
    ngOnInit() {
        const EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
        this.loginForm = this.formBuilder.group({
            identifier: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](this.storageService.getUserName(), [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].pattern(EMAILPATTERN)]),
            password: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](this.storageService.getPassword(), [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].minLength(6)])
        });
    }
    ionViewDidEnter() {
        this.network.networkSwitch.subscribe(data => {
            this.netSwitch = data;
            console.log(this.netSwitch);
        });
        this.network.networkDisconnect();
        this.network.networkConnect();
    }
    login() {
        if (!this.netSwitch) {
            this.utils.errorSnackBar('No internet connection');
        }
        else {
            console.log(this.loginForm);
            if (this.loginForm.status === 'VALID') {
                this.utils.showLoading('Logging In').then(() => {
                    this.apiService.login(this.loginForm.value).subscribe(response => {
                        this.utils.hideLoading().then(() => {
                            console.log('Res', response);
                            console.log(response);
                            this.mixpanelService.track("USER_LOGIN", {
                                $id: response.user.id,
                                $email: response.user.email,
                                $name: response.user.firstname + response.user.lastname
                            });
                            if (response.user.role.id == _contants__WEBPACK_IMPORTED_MODULE_11__["ROLES"].Surveyor) {
                                this.storageService.setUserName(this.loginForm.get('identifier').value);
                                this.storageService.setPassword(this.loginForm.get('password').value);
                                // this.storageService.setUser(response.user, response.jwt);
                                if (response.user.isdefaultpassword) {
                                    this.storageService.setJWTToken(response.jwt);
                                    this.apiService.refreshHeader();
                                    this.navController.navigateRoot(['changepassword']);
                                }
                                else {
                                    this.storageService.setUser(response.user, response.jwt);
                                    this.apiService.refreshHeader();
                                    // this.navController.navigateRoot(['homepage']);
                                    this.navController.navigateRoot(['surveyoroverview']);
                                    if (response.user) {
                                        this.utils.doCometUserLogin();
                                    }
                                }
                            }
                            else if (response.user.role.id == _contants__WEBPACK_IMPORTED_MODULE_11__["ROLES"].Designer) {
                                // this.utils.errorSnackBar("Access Denied!! Soon we will be coming up with our platform accessibility.");
                                this.storageService.setUserName(this.loginForm.get('identifier').value);
                                this.storageService.setPassword(this.loginForm.get('password').value);
                                if (response.user.isdefaultpassword) {
                                    this.storageService.setJWTToken(response.jwt);
                                    this.apiService.refreshHeader();
                                    this.navController.navigateRoot(['changepassword']);
                                }
                                else {
                                    this.storageService.setUser(response.user, response.jwt);
                                    this.apiService.refreshHeader();
                                    this.navController.navigateRoot(['permitdesignoverview']);
                                    if (response.user) {
                                        this.utils.doCometUserLogin();
                                    }
                                }
                            }
                            else if (response.user.role.id == _contants__WEBPACK_IMPORTED_MODULE_11__["ROLES"].Analyst) {
                                this.storageService.setUserName(this.loginForm.get('identifier').value);
                                this.storageService.setPassword(this.loginForm.get('password').value);
                                if (response.user.isdefaultpassword) {
                                    this.storageService.setJWTToken(response.jwt);
                                    this.apiService.refreshHeader();
                                    this.navController.navigateRoot(['changepassword']);
                                }
                                else {
                                    this.storageService.setUser(response.user, response.jwt);
                                    this.apiService.refreshHeader();
                                    this.navController.navigateRoot(['analystoverview']);
                                    if (response.user) {
                                        this.utils.doCometUserLogin();
                                    }
                                }
                            }
                            else if (response.user.role.id == _contants__WEBPACK_IMPORTED_MODULE_11__["ROLES"].Peengineer) {
                                this.storageService.setUserName(this.loginForm.get('identifier').value);
                                this.storageService.setPassword(this.loginForm.get('password').value);
                                if (response.user.isdefaultpassword) {
                                    this.storageService.setJWTToken(response.jwt);
                                    this.apiService.refreshHeader();
                                    this.navController.navigateRoot(['changepassword']);
                                }
                                else {
                                    this.storageService.setUser(response.user, response.jwt);
                                    this.apiService.refreshHeader();
                                    this.navController.navigateRoot(['peengineer']);
                                    if (response.user) {
                                        this.utils.doCometUserLogin();
                                    }
                                }
                            }
                            else {
                                // this.utils.errorSnackBar("Access Denied!! Soon we will be coming up with our platform accessibility.");
                                this.storageService.setUserName(this.loginForm.get('identifier').value);
                                this.storageService.setPassword(this.loginForm.get('password').value);
                                this.storageService.setUser(response.user, response.jwt);
                                this.apiService.refreshHeader();
                                if (response.user.isdefaultpassword) {
                                    this.storageService.setJWTToken(response.jwt);
                                    this.apiService.refreshHeader();
                                    this.navController.navigateRoot(['changepassword']);
                                }
                                else {
                                    if (response.user.role.type === 'clientsuperadmin' && (response.user.isonboardingcompleted == null || response.user.isonboardingcompleted == false)) {
                                        this.navController.navigateRoot('onboarding');
                                        if (response.user) {
                                            this.utils.doCometUserLogin();
                                        }
                                    }
                                    else {
                                        this.navController.navigateRoot(['/dashboard']);
                                        if (response.user) {
                                            this.utils.doCometUserLogin();
                                        }
                                    }
                                }
                            }
                        });
                        this.apiService.emitUserNameAndRole(response.user);
                    }, responseError => {
                        this.utils.hideLoading().then(() => {
                            this.apiService.resetHeaders();
                            const error = responseError.error;
                            // this.utils.errorSnackBar(error);
                            this.utils.errorSnackBar("Entered email and password combination doesn't match any of our records. Please try again.");
                        });
                    });
                });
            }
            else {
                this.apiService.resetHeaders();
                this.utils.errorSnackBar("Entered email and password combination doesn't match any of our records. Please try again.");
            }
        }
    }
    toggleTextPassword() {
        this.isActiveToggleTextPassword = (this.isActiveToggleTextPassword == true) ? false : true;
    }
    getType() {
        return this.isActiveToggleTextPassword ? 'password' : 'text';
    }
    get password() {
        return this.loginForm.get('password');
    }
    changepassword() {
        console.log('rrrrrrrrrrrrrrr');
        this.router.navigate(['/changepassword']);
    }
};
LoginPage.ctorParameters = () => [
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"] },
    { type: _utilities_service__WEBPACK_IMPORTED_MODULE_6__["UtilitiesService"] },
    { type: _api_service__WEBPACK_IMPORTED_MODULE_5__["ApiService"] },
    { type: _storage_service__WEBPACK_IMPORTED_MODULE_8__["StorageService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_10__["Router"] },
    { type: _networkdetect_service__WEBPACK_IMPORTED_MODULE_12__["NetworkdetectService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_7__["NavController"] },
    { type: _utilities_mixpanel_service__WEBPACK_IMPORTED_MODULE_13__["MixpanelService"] }
];
LoginPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-login',
        template: _raw_loader_login_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_login_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], LoginPage);



/***/ }),

/***/ "V6Ie":
/*!*****************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/login/login.page.html ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-content class=\"ion-padding login-background\">\r\n    <ion-grid class=\"ion-padding\">\r\n        <ion-row class=\"ion-margin-top\">\r\n            <ion-col size=\"12\" class=\"ion-no-margin ion-no-padding\">\r\n                <span class=\"title text-bold\">\r\n                    Wattmonk\r\n                </span>\r\n            </ion-col>\r\n        </ion-row>\r\n\r\n    </ion-grid>\r\n\r\n    <ion-grid class=\"ion-padding form-background\">\r\n        <ion-row class=\"ion-margin-top\">\r\n            <ion-col size=\"12\" class=\"ion-no-margin ion-no-padding\">\r\n                <span class=\"subtitle\">\r\n                    Welcome\r\n                </span>\r\n                <span class=\"subtitle\" *ngIf=\"isLoggedInOnce\">\r\n                    back\r\n                </span>\r\n            </ion-col>\r\n            <ion-col size=\"12\" class=\"ion-no-margin ion-no-padding\">\r\n                <span class=\"subtitle-sub-text subtitle-dim-color\">\r\n                    sign in to continue\r\n                </span>\r\n            </ion-col>\r\n        </ion-row>\r\n        <ion-row class=\"ion-margin-top\">\r\n            <ion-col size=\"12\" class=\"ion-no-padding\">\r\n                <form [formGroup]=\"loginForm\" novalidate>\r\n                    <ion-grid class=\"ion-no-padding\">\r\n                        <ion-row class=\"ion-margin-top\">\r\n                            <ion-col size=\"12\">\r\n                                <ion-input type=\"email\" placeholder=\"your email address\" class=\"form-control\" autocomplete=\"off\"\r\n                                    formControlName=\"identifier\">\r\n                                </ion-input>\r\n                                <div class=\"error_div\">\r\n                                    <div *ngIf=\"loginForm.get('identifier').hasError('pattern') && loginForm.get('identifier').dirty\" >\r\n                                        <span class=\"error\">{{emailError}}</span>\r\n                                    </div> \r\n                                    <div *ngIf=\"loginForm.get('identifier').value === '' && loginForm.get('identifier').dirty\" >\r\n                                        <span class=\"error\">{{fieldRequired}}</span>\r\n                                    </div>      \r\n                                </div>  \r\n                            </ion-col>\r\n\r\n                            <ion-col size=\"12\" class=\"ion-margin-top\">\r\n                                <div class=\"password_box\">\r\n                                    <ion-input type=\"password\" class=\"password_input\" [type]=\"getType()\" placeholder=\"your password\" formControlName=\"password\">\r\n                                    </ion-input>\r\n                                    <div class=\"eye_box\">\r\n                                        <ion-icon name=\"eye\" *ngIf=\"!this.isActiveToggleTextPassword\" (click)=\"toggleTextPassword()\" slot=\"end\"></ion-icon>\r\n                                        <ion-icon name=\"eye-off\" *ngIf=\"this.isActiveToggleTextPassword\" (click)=\"toggleTextPassword()\" slot=\"end\"></ion-icon>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"error_div\">\r\n                                    <div *ngIf=\"password.errors?.minlength\">\r\n                                        <span class=\"error\">Invalid password</span>\r\n                                    </div>       \r\n                                </div>  \r\n                            </ion-col>\r\n\r\n                            <ion-col size=\"12\" class=\"forgot-password-text\">\r\n                                <p style=\"text-align: end\" class=\"ion-padding\" [routerLink]=\"['/forgot-password']\"\r\n                                    routerDirection=\"forward\">Forgot your password?</p>\r\n                            </ion-col>\r\n\r\n                            <ion-col size=\"12\" class=\"ion-margin-top\">\r\n                                <h1 class=\"ion-no-margin ion-no-padding action-button-color\" (click)=\"login()\">\r\n                                    Login\r\n                                </h1>\r\n                            </ion-col>\r\n                        </ion-row>\r\n                    </ion-grid>\r\n                </form>\r\n            </ion-col>\r\n        </ion-row>\r\n    </ion-grid>\r\n\r\n\r\n</ion-content>\r\n");

/***/ }),

/***/ "X3zk":
/*!***************************************!*\
  !*** ./src/app/login/login.module.ts ***!
  \***************************************/
/*! exports provided: LoginPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginPageModule", function() { return LoginPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _login_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./login-routing.module */ "euwS");
/* harmony import */ var _login_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./login.page */ "34Y5");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../shared/shared.module */ "PCNd");








let LoginPageModule = class LoginPageModule {
};
LoginPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _login_routing_module__WEBPACK_IMPORTED_MODULE_5__["LoginPageRoutingModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
            _shared_shared_module__WEBPACK_IMPORTED_MODULE_7__["SharedModule"]
        ],
        declarations: [_login_page__WEBPACK_IMPORTED_MODULE_6__["LoginPage"]]
    })
], LoginPageModule);



/***/ }),

/***/ "euwS":
/*!***********************************************!*\
  !*** ./src/app/login/login-routing.module.ts ***!
  \***********************************************/
/*! exports provided: LoginPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginPageRoutingModule", function() { return LoginPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _login_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./login.page */ "34Y5");




const routes = [
    {
        path: '',
        component: _login_page__WEBPACK_IMPORTED_MODULE_3__["LoginPage"]
    }
];
let LoginPageRoutingModule = class LoginPageRoutingModule {
};
LoginPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], LoginPageRoutingModule);



/***/ }),

/***/ "r67e":
/*!***************************************!*\
  !*** ./src/app/login/login.page.scss ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".title {\n  font-size: 3em;\n}\n\n.text-bold {\n  font-weight: bold;\n}\n\n.subtitle {\n  font-size: 2em;\n  color: #434343;\n}\n\nion-content.login-background {\n  --background: white;\n  background: linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url(\"/assets/images/login_background.png\");\n  background-position: bottom;\n  background-repeat: no-repeat;\n  background-size: contain;\n}\n\n.form-background {\n  background: linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url(\"/assets/images/wattmonk_logo.png\");\n  background-position: top;\n  background-repeat: no-repeat;\n  background-size: contain;\n}\n\n.subtitle-sub-text {\n  font-size: 1.8em;\n  color: #A5A095;\n}\n\n.forgot-password-text {\n  color: #7DA4DD;\n}\n\n.email_valid {\n  color: #495057 !important;\n}\n\n.password_box {\n  display: flex;\n  border-bottom: 1px solid #ced4da !important;\n}\n\n.password_input {\n  margin-bottom: -5px;\n  font-size: 14px;\n}\n\n.eye_box {\n  display: flex;\n  align-items: center;\n}\n\n.error {\n  color: #df3e3e;\n  font-size: 11px;\n  margin-left: 5px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXGxvZ2luLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGNBQUE7QUFDRjs7QUFFQTtFQUNFLGlCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxjQUFBO0VBQ0EsY0FBQTtBQUNGOztBQUVBO0VBQ0UsbUJBQUE7RUFDQSwySEFBQTtFQUNBLDJCQUFBO0VBQ0EsNEJBQUE7RUFDQSx3QkFBQTtBQUNGOztBQUVBO0VBQ0Usd0hBQUE7RUFDQSx3QkFBQTtFQUNBLDRCQUFBO0VBQ0Esd0JBQUE7QUFDRjs7QUFJQTtFQUNFLGdCQUFBO0VBQ0EsY0FBQTtBQURGOztBQUlBO0VBQ0UsY0FBQTtBQURGOztBQUlBO0VBQ0UseUJBQUE7QUFERjs7QUFJQTtFQUNFLGFBQUE7RUFDQSwyQ0FBQTtBQURGOztBQUtBO0VBQ0UsbUJBQUE7RUFDQSxlQUFBO0FBRkY7O0FBS0E7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7QUFGRjs7QUFLQTtFQUNFLGNBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7QUFGRiIsImZpbGUiOiJsb2dpbi5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIudGl0bGUge1xyXG4gIGZvbnQtc2l6ZTogM2VtO1xyXG59XHJcblxyXG4udGV4dC1ib2xkIHtcclxuICBmb250LXdlaWdodDogYm9sZDtcclxufVxyXG5cclxuLnN1YnRpdGxlIHtcclxuICBmb250LXNpemU6IDJlbTtcclxuICBjb2xvcjogIzQzNDM0MztcclxufVxyXG5cclxuaW9uLWNvbnRlbnQubG9naW4tYmFja2dyb3VuZCB7XHJcbiAgLS1iYWNrZ3JvdW5kOiB3aGl0ZTtcclxuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQocmdiYSgyNTUsIDI1NSwgMjU1LCAwLjkpLCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuOSkpLCB1cmwoXCIvYXNzZXRzL2ltYWdlcy9sb2dpbl9iYWNrZ3JvdW5kLnBuZ1wiKTtcclxuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBib3R0b207XHJcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcclxuICBiYWNrZ3JvdW5kLXNpemU6IGNvbnRhaW47XHJcbn1cclxuXHJcbi5mb3JtLWJhY2tncm91bmQge1xyXG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudChyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuOSksIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC45KSksIHVybChcIi9hc3NldHMvaW1hZ2VzL3dhdHRtb25rX2xvZ28ucG5nXCIpO1xyXG4gIGJhY2tncm91bmQtcG9zaXRpb246IHRvcDtcclxuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xyXG4gIGJhY2tncm91bmQtc2l6ZTogY29udGFpbjtcclxufVxyXG5cclxuXHJcblxyXG4uc3VidGl0bGUtc3ViLXRleHQge1xyXG4gIGZvbnQtc2l6ZTogMS44ZW07XHJcbiAgY29sb3I6ICNBNUEwOTU7XHJcbn1cclxuXHJcbi5mb3Jnb3QtcGFzc3dvcmQtdGV4dCB7XHJcbiAgY29sb3I6ICM3REE0REQ7XHJcbn1cclxuXHJcbi5lbWFpbF92YWxpZCB7XHJcbiAgY29sb3I6ICM0OTUwNTcgIWltcG9ydGFudDtcclxufVxyXG5cclxuLnBhc3N3b3JkX2JveCB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2NlZDRkYSAhaW1wb3J0YW50O1xyXG5cclxufVxyXG5cclxuLnBhc3N3b3JkX2lucHV0IHtcclxuICBtYXJnaW4tYm90dG9tOiAtNXB4O1xyXG4gIGZvbnQtc2l6ZTogMTRweDtcclxufVxyXG5cclxuLmV5ZV9ib3gge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxufVxyXG5cclxuLmVycm9yIHtcclxuICBjb2xvcjogcmdiKDIyMywgNjIsIDYyKTtcclxuICBmb250LXNpemU6IDExcHg7XHJcbiAgbWFyZ2luLWxlZnQ6IDVweDtcclxufVxyXG4iXX0= */");

/***/ })

}]);
//# sourceMappingURL=login-login-module.js.map