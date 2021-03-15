(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! F:\mobileapp\src\main.ts */"zUnb");


/***/ }),

/***/ "1Pdp":
/*!************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/utilities/auto-complete/auto-complete.component.html ***!
  \************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-item class=\"ion-no-padding\" #searchBar>\r\n    <ng-content></ng-content>\r\n    <ion-input style=\"font-size: 12px;word-wrap: break-word;\" class=\"form_input\" (ionChange)=\"onValueChanged($event)\" (ionBlur)=\"onBlur($event)\" (ionFocus)=\"onFocus($event)\" \r\n               [(ngModel)]=\"selectedDataName\" autocomplete=\"off\"></ion-input>\r\n</ion-item>\r\n<ion-grid class=\"ion-no-padding popup-list\"\r\n          *ngIf=\"sortedList.length !== 0\">\r\n    <ion-row *ngFor=\"let data of sortedList\" (click)=\"selectOption(data)\">\r\n        <ion-col size=\"12\">\r\n            <ion-item>\r\n                <ion-label style=\"font-size: 10px;word-wrap: break-word;\">{{data.name}}</ion-label>\r\n            </ion-item>\r\n        </ion-col>\r\n    </ion-row>\r\n</ion-grid>\r\n");

/***/ }),

/***/ "1oiu":
/*!**********************************!*\
  !*** ./src/app/contants.prod.ts ***!
  \**********************************/
/*! exports provided: PlatformUpdateUrl, BaseUrl, intercomId, COMETCHAT_CONSTANTS, version, Mixpanel_CONSTANTS, ROLES */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlatformUpdateUrl", function() { return PlatformUpdateUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseUrl", function() { return BaseUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "intercomId", function() { return intercomId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COMETCHAT_CONSTANTS", function() { return COMETCHAT_CONSTANTS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "version", function() { return version; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Mixpanel_CONSTANTS", function() { return Mixpanel_CONSTANTS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ROLES", function() { return ROLES; });
//Live Server
// export const BaseUrl = 'http://ec2-3-17-28-7.us-east-2.compute.amazonaws.com:1337';
// export const COMETCHAT_CONSTANTS = {
//     APP_ID: '190385dcec51285',
//     REGION: 'US',
//     API_KEY: '5cafae1939d4fc620698c50ae3f25e727fc90213'
// }
// Production Server
// export const PlatformUpdateUrl =  'https://admin.wattmonk.com/api';
// export const PlatformUpdateUrl =  'https://webops.wattmonk.com/api';
// export const PlatformUpdateUrl =  ' http://ec2-52-15-220-175.us-east-2.compute.amazonaws.com:1802/';
// export const BaseUrl = 'http://ec2-52-15-220-175.us-east-2.compute.amazonaws.com:1802/';
// export const PlatformUpdateUrl = 'http://ec2-52-15-220-175.us-east-2.compute.amazonaws.com:1802/';
// export const intercomId = 'o52f08q6';
// export const COMETCHAT_CONSTANTS = {
//     APP_ID: '190385dcec51285',
//     REGION: 'US',
//     API_KEY: '5cafae1939d4fc620698c50ae3f25e727fc90213',
//     REST_API_KEY: "4f441010f9ace69fc5e2471c20e9f1c21ca56402"
// }
// export const version='1.1.3'
// export const Mixpanel_CONSTANTS ='e4b30b18d61b5abe078c2719911858cb';
// Test Server
// export const PlatformUpdateUrl = 'https://testorbit.wattmonk.com/api';
// export const BaseUrl = 'https://testorbit.wattmonk.com/api';
// export const COMETCHAT_CONSTANTS = {
//     APP_ID: '22738c62a78b107',
//      REGION: 'US',
//      API_KEY: '3afc04a7495edb03f4c7c802096a954faf7e3a27'
//  }
// export const version='1.1.3'
// export const Mixpanel_CONSTANTS ='e4b30b18d61b5abe078c2719911858cb';
//Development Server
const PlatformUpdateUrl = 'https://devspace.wattmonk.com/api';
const BaseUrl = 'https://devspace.wattmonk.com/api/';
const intercomId = 'c6w73e4e';
const COMETCHAT_CONSTANTS = {
    APP_ID: '2145560cac03137',
    REGION: 'US',
    API_KEY: '83ac811da8283c9e235ab912bf7a6213c207dd4d'
};
const version = '1.1.3';
const Mixpanel_CONSTANTS = 'e4b30b18d61b5abe078c2719911858cb';
var ROLES;
(function (ROLES) {
    ROLES[ROLES["SuperAdmin"] = 4] = "SuperAdmin";
    ROLES[ROLES["ContractorSuperAdmin"] = 6] = "ContractorSuperAdmin";
    ROLES[ROLES["ContractorAdmin"] = 7] = "ContractorAdmin";
    ROLES[ROLES["Admin"] = 5] = "Admin";
    ROLES[ROLES["BD"] = 3] = "BD";
    ROLES[ROLES["Designer"] = 8] = "Designer";
    ROLES[ROLES["Surveyor"] = 9] = "Surveyor";
    ROLES[ROLES["Analyst"] = 10] = "Analyst";
    ROLES[ROLES["Peengineer"] = 11] = "Peengineer";
})(ROLES || (ROLES = {}));


/***/ }),

/***/ "2d+1":
/*!**********************************************************************!*\
  !*** ./src/app/utilities/email-selector/email-selector.component.ts ***!
  \**********************************************************************/
/*! exports provided: EmailSelectorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmailSelectorComponent", function() { return EmailSelectorComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_email_selector_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./email-selector.component.html */ "P8Nm");
/* harmony import */ var _email_selector_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./email-selector.component.scss */ "A16T");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_contants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/contants */ "6qqZ");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var src_app_utilities_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/utilities.service */ "oTnF");
/* harmony import */ var src_app_storage_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/storage.service */ "qkCY");
/* harmony import */ var src_app_api_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/api.service */ "yTNM");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _user_selector_user_selector_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../user-selector/user-selector.component */ "bgR/");











let EmailSelectorComponent = class EmailSelectorComponent {
    constructor(util, cdr, http, storage, api) {
        this.util = util;
        this.cdr = cdr;
        this.http = http;
        this.storage = storage;
        this.api = api;
        this.example = [];
        this.teamMember = [];
        this.TeamData = [];
        this.bodyData = [];
        this.selectedEmails = [];
        this.resp = [];
    }
    validate(control) {
        throw new Error("Method not implemented.");
    }
    registerOnValidatorChange(fn) {
        throw new Error("Method not implemented.");
    }
    writeValue(obj) {
        throw new Error("Method not implemented.");
    }
    registerOnChange(fn) {
        throw new Error("Method not implemented.");
    }
    registerOnTouched(fn) {
        throw new Error("Method not implemented.");
    }
    setDisabledState(isDisabled) {
        throw new Error("Method not implemented.");
    }
    ngOnInit() {
        this.api.getTeamData().subscribe(response => {
            this.teamMember = response;
            this.example = response;
            this.example.push(this.design);
            this.TeamData = this.example;
        });
    }
    //onCloseClick(){
    // this.dialogRef.close(this.data);
    // }
    selectAll(event) {
        const checked = event.target.checked;
        this.TeamData.forEach(item => item.checked = checked);
    }
    SendMail() {
        var emails = document.getElementById("inputemails").value;
        this.emailArray = emails.split(',');
        this.emailArray.forEach(element => {
            this.selectedEmails.push(element);
        });
        this.bodyData = this.TeamData.filter(item => item.checked);
        this.bodyData.forEach(element => {
            this.selectedEmails.push(element.email);
        });
        this.selectedEmails.push();
        console.log(this.selectedEmails);
        let body = { emails: this.selectedEmails,
            id: this.design };
        return this.http.post(src_app_contants__WEBPACK_IMPORTED_MODULE_4__["BaseUrl"] + "designs/send-prelim-design", body, {
            headers: this.headers
        }).subscribe((response) => {
            this.resp = response;
            if (this.resp.status == 'success') {
                this.util.showSnackBar("Email Sent  Successfully");
                // this.dialogRef.close( );
            }
        }, error => {
            this.util.errorSnackBar("Something went wrong. Please try again.");
        });
    }
};
EmailSelectorComponent.ctorParameters = () => [
    { type: src_app_utilities_service__WEBPACK_IMPORTED_MODULE_6__["UtilitiesService"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ChangeDetectorRef"] },
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HttpClient"] },
    { type: src_app_storage_service__WEBPACK_IMPORTED_MODULE_7__["StorageService"] },
    { type: src_app_api_service__WEBPACK_IMPORTED_MODULE_8__["ApiService"] }
];
EmailSelectorComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-email-selector',
        template: _raw_loader_email_selector_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        providers: [
            {
                provide: _angular_forms__WEBPACK_IMPORTED_MODULE_9__["NG_VALUE_ACCESSOR"],
                multi: true,
                useExisting: _user_selector_user_selector_component__WEBPACK_IMPORTED_MODULE_10__["UserSelectorComponent"]
            },
            {
                provide: _angular_forms__WEBPACK_IMPORTED_MODULE_9__["NG_VALIDATORS"],
                multi: true,
                useExisting: _user_selector_user_selector_component__WEBPACK_IMPORTED_MODULE_10__["UserSelectorComponent"]
            }
        ],
        styles: [_email_selector_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], EmailSelectorComponent);



/***/ }),

/***/ "5nbR":
/*!***************************************!*\
  !*** ./src/app/auth-guard.service.ts ***!
  \***************************************/
/*! exports provided: AuthGuardService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthGuardService", function() { return AuthGuardService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _storage_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./storage.service */ "qkCY");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "TEn/");




let AuthGuardService = class AuthGuardService {
    constructor(storageService, navController) {
        this.storageService = storageService;
        this.navController = navController;
    }
    canActivate(route, state) {
        if (!this.storageService.isUserPresent()) {
            this.navController.navigateRoot('login');
            return false;
        }
        return true;
    }
};
AuthGuardService.ctorParameters = () => [
    { type: _storage_service__WEBPACK_IMPORTED_MODULE_2__["StorageService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["NavController"] }
];
AuthGuardService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], AuthGuardService);



/***/ }),

/***/ "69gq":
/*!********************************************************************!*\
  !*** ./src/app/utilities/auto-complete/auto-complete.component.ts ***!
  \********************************************************************/
/*! exports provided: AutoCompleteComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AutoCompleteComponent", function() { return AutoCompleteComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_auto_complete_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./auto-complete.component.html */ "1Pdp");
/* harmony import */ var _auto_complete_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./auto-complete.component.scss */ "WqJC");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var src_app_api_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/api.service */ "yTNM");
/* harmony import */ var src_app_utilities_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/utilities.service */ "oTnF");
var AutoCompleteComponent_1;







let AutoCompleteComponent = AutoCompleteComponent_1 = class AutoCompleteComponent {
    constructor(apiService, utility) {
        this.apiService = apiService;
        this.utility = utility;
        this.placeholder = '';
        this.mode = 'id'; //id or object
        this.name = '';
        this.modulename = new _angular_core__WEBPACK_IMPORTED_MODULE_3__["EventEmitter"]();
        this.sortedList = [];
        this.selectedDataId = 0;
        this.selectedDataName = '';
        this.manualinput = '';
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
    }
    validate(control) {
        if (this.selectedDataId !== 0) {
            return null;
        }
        return null;
        // return {
        //   error: 'No option selected'
        // };
    }
    writeValue(data) {
        if (data !== null && data !== undefined && data !== '') {
            this.selectedDataId = data;
            let selectedData;
            this.dataList.forEach((item) => {
                if (item.id === data) {
                    selectedData = item;
                }
            });
            if (selectedData) {
                this.sortedList = this.dataList.filter((item) => {
                    return (item.name.toLowerCase().indexOf(selectedData.name.toLowerCase()) > -1);
                });
            }
            if (this.sortedList.length === 1) {
                if (this.sortedList[0].name.toLowerCase() === selectedData.name.toLowerCase()) {
                    this.sortedList = [];
                }
            }
            if (selectedData) {
                this.selectOption(selectedData);
            }
        }
        else {
            this.selectedDataId = 0;
            this.selectedDataName = '';
            this.dataList = [];
        }
    }
    onValueChanged(event) {
        console.log('value changed');
        console.log(this.dataList);
        this.manualinput = event.detail.value;
        this.utility.manualInput.next(this.manualinput);
        // this.selectedDataName = event.detail.value;
        console.log(this.selectedDataName);
        this.sortedList = this.dataList.filter((item) => {
            if (item.name !== null) {
                return (item.name.toLowerCase().indexOf(event.detail.value.toLowerCase()) > -1);
            }
        });
        if (this.sortedList.length === 1) {
            if (this.sortedList[0].name.toLowerCase() === event.detail.value.toLowerCase()) {
                // this.onChange(event.target.value);
                this.sortedList = [];
            }
        }
        else {
            // this.selectedDataName= event.detail.value;
            // event.detail.value = this.selectedDataName;
            // this.onChange(this.selectedDataName);
        }
    }
    selectOption(data) {
        console.log('data changed');
        this.sortedList = [];
        this.selectedOption = data;
        this.selectedDataId = data.id;
        this.selectedDataName = data.name;
        console.log(data, "KK");
        if (this.mode === 'id') {
            this.onChange(data.id);
        }
        else {
            this.onChange(data);
        }
    }
    onFocus(event) {
        this.sortedList = [];
        // this.selectedDataName= event.detail.value;
        this.sortedList = this.dataList.filter((item) => {
            // console.log(item);
            if (item.name !== null) {
                return (item.name.toLowerCase().indexOf(this.selectedDataName) > -1);
            }
        });
        if (this.sortedList.length === 1) {
            this.selectedDataName = this.sortedList[0].name;
            // if (this.mode === 'id') {
            //   this.onChange(this.sortedList[0].id);
            // } else {
            // }
            if (this.sortedList[0].name.toLowerCase() === this.selectedDataName.toLowerCase()) {
                this.sortedList = [];
            }
        }
    }
    onBlur(event) {
        setTimeout(() => {
            this.sortedList = [];
        }, 100);
    }
};
AutoCompleteComponent.ctorParameters = () => [
    { type: src_app_api_service__WEBPACK_IMPORTED_MODULE_5__["ApiService"] },
    { type: src_app_utilities_service__WEBPACK_IMPORTED_MODULE_6__["UtilitiesService"] }
];
AutoCompleteComponent.propDecorators = {
    dataList: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
    placeholder: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
    mode: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
    name: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
    modulename: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Output"] }]
};
AutoCompleteComponent = AutoCompleteComponent_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-auto-complete',
        template: _raw_loader_auto_complete_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        providers: [
            {
                provide: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NG_VALUE_ACCESSOR"],
                multi: true,
                useExisting: AutoCompleteComponent_1
            },
            {
                provide: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NG_VALIDATORS"],
                multi: true,
                useExisting: AutoCompleteComponent_1
            }
        ],
        styles: [_auto_complete_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], AutoCompleteComponent);



/***/ }),

/***/ "6NCw":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/popover-component/popover-component.component.html ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-content>\r\n  <ion-item (click)=\"siteAssessment()\">\r\n    <ion-label>Site Assessment</ion-label>\r\n    <ion-icon class=\"green\" name=\"add-circle\"></ion-icon>\r\n  </ion-item>\r\n  <ion-item (click)=\"salesProposal()\">\r\n    <ion-label>Sales Proposal</ion-label>\r\n    <ion-icon class=\"green\" name=\"add-circle\"></ion-icon>\r\n  </ion-item>\r\n</ion-content>\r\n");

/***/ }),

/***/ "6qqZ":
/*!*****************************!*\
  !*** ./src/app/contants.ts ***!
  \*****************************/
/*! exports provided: PlatformUpdateUrl, BaseUrl, intercomId, COMETCHAT_CONSTANTS, version, Mixpanel_CONSTANTS, ROLES */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlatformUpdateUrl", function() { return PlatformUpdateUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseUrl", function() { return BaseUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "intercomId", function() { return intercomId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COMETCHAT_CONSTANTS", function() { return COMETCHAT_CONSTANTS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "version", function() { return version; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Mixpanel_CONSTANTS", function() { return Mixpanel_CONSTANTS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ROLES", function() { return ROLES; });
//Live Server
// export const BaseUrl = 'http://ec2-3-17-28-7.us-east-2.compute.amazonaws.com:1337';
// export const COMETCHAT_CONSTANTS = {
//     APP_ID: '190385dcec51285',
//     REGION: 'US',
//     API_KEY: '5cafae1939d4fc620698c50ae3f25e727fc90213'
// }
// Production Server
// export const PlatformUpdateUrl =  'https://admin.wattmonk.com/api';
// export const PlatformUpdateUrl =  'https://webops.wattmonk.com/api';
//  export const PlatformUpdateUrl =  'http://ec2-52-15-220-175.us-east-2.compute.amazonaws.com:1802/';
//   export const PlatformUpdateUrl = 'http://ec2-52-15-220-175.us-east-2.compute.amazonaws.com:1802/';
// export const BaseUrl = 'http://ec2-52-15-220-175.us-east-2.compute.amazonaws.com:1802/';
// export const intercomId = 'o52f08q6';
// export const COMETCHAT_CONSTANTS = {
//     APP_ID: '190385dcec51285',
//     REGION: 'US',
//     API_KEY: '5cafae1939d4fc620698c50ae3f25e727fc90213',
//     REST_API_KEY: "4f441010f9ace69fc5e2471c20e9f1c21ca56402"
// }
// export const version='1.1.3'
// export const Mixpanel_CONSTANTS ='e4b30b18d61b5abe078c2719911858cb';
// Test Server
//   export const PlatformUpdateUrl = 'https://testorbit.wattmonk.com/api';
//   export const BaseUrl = 'https://testorbit.wattmonk.com/api';
// export const intercomId = 'c6w73e4e';
//   export const COMETCHAT_CONSTANTS = {
//       APP_ID: '22738c62a78b107',
//        REGION: 'US',
//        API_KEY: '3afc04a7495edb03f4c7c802096a954faf7e3a27'
//    }
// export const version='1.1.3'
// export const Mixpanel_CONSTANTS ='e4b30b18d61b5abe078c2719911858cb';
// Test Server
//   export const PlatformUpdateUrl = 'https://testorbit.wattmonk.com/api';
//   export const BaseUrl = 'https://testorbit.wattmonk.com/api';
// export const intercomId = 'c6w73e4e';
//   export const COMETCHAT_CONSTANTS = {
//       APP_ID: '22738c62a78b107',
//        REGION: 'US',
//        API_KEY: '3afc04a7495edb03f4c7c802096a954faf7e3a27'
//    }
//Development Server
const PlatformUpdateUrl = 'https://devspace.wattmonk.com/api/';
const BaseUrl = 'https://devspace.wattmonk.com/api/';
const intercomId = 'c6w73e4e';
const COMETCHAT_CONSTANTS = {
    APP_ID: '2145560cac03137',
    REGION: 'US',
    API_KEY: '83ac811da8283c9e235ab912bf7a6213c207dd4d'
};
const version = '1.1.3';
const Mixpanel_CONSTANTS = 'e4b30b18d61b5abe078c2719911858cb';
var ROLES;
(function (ROLES) {
    ROLES[ROLES["Peengineer"] = 11] = "Peengineer";
    ROLES[ROLES["SuperAdmin"] = 4] = "SuperAdmin";
    ROLES[ROLES["ContractorSuperAdmin"] = 6] = "ContractorSuperAdmin";
    ROLES[ROLES["ContractorAdmin"] = 7] = "ContractorAdmin";
    ROLES[ROLES["Admin"] = 5] = "Admin";
    ROLES[ROLES["BD"] = 3] = "BD";
    ROLES[ROLES["Designer"] = 8] = "Designer";
    ROLES[ROLES["Surveyor"] = 9] = "Surveyor";
    ROLES[ROLES["Analyst"] = 10] = "Analyst";
})(ROLES || (ROLES = {}));


/***/ }),

/***/ "7GCl":
/*!**********************************************************************!*\
  !*** ./src/app/utilities/success-modal/success-modal.component.scss ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".success-image {\n  width: 8em;\n  height: 8em;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFxzdWNjZXNzLW1vZGFsLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsVUFBQTtFQUNBLFdBQUE7QUFDRiIsImZpbGUiOiJzdWNjZXNzLW1vZGFsLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnN1Y2Nlc3MtaW1hZ2Uge1xyXG4gIHdpZHRoOiA4ZW07XHJcbiAgaGVpZ2h0OiA4ZW07XHJcbn1cclxuIl19 */");

/***/ }),

/***/ "A16T":
/*!************************************************************************!*\
  !*** ./src/app/utilities/email-selector/email-selector.component.scss ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".even {\n  background-color: #ecf0f9ab;\n}\n\n.odd {\n  background-color: #ffffff;\n}\n\n.listitem {\n  display: flex;\n  font-size: 0.7em;\n  font-weight: 600;\n  margin: 0 10px;\n  color: black;\n}\n\n.selectall {\n  font-size: 0.9em;\n  font-weight: 700;\n  margin: 16px;\n}\n\n.matlist {\n  padding-top: 16px;\n  padding-left: 16px;\n}\n\n.sendButton {\n  margin-top: 16px;\n  text-align: center;\n  margin-left: 480px;\n}\n\n.item {\n  padding-bottom: 16px;\n}\n\n.close {\n  margin-left: 500px;\n}\n\n.listitem1 {\n  display: flex;\n  font-size: 0.7em;\n  font-weight: 600;\n  margin: 0 2px;\n  color: black;\n}\n\n.listitem2 {\n  display: flex;\n  font-size: 0.7em;\n  font-weight: 600;\n  margin: 0 2px;\n  color: black;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFxlbWFpbC1zZWxlY3Rvci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHRTtFQUNFLDJCQUFBO0FBRko7O0FBSUE7RUFDSSx5QkFBQTtBQURKOztBQUtBO0VBQ0UsYUFBQTtFQUNBLGdCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxjQUFBO0VBQ0EsWUFBQTtBQUZGOztBQUtBO0VBQ0UsZ0JBQUE7RUFDQSxnQkFBQTtFQUNBLFlBQUE7QUFGRjs7QUFJQTtFQUNFLGlCQUFBO0VBQ0Esa0JBQUE7QUFERjs7QUFJQTtFQUNFLGdCQUFBO0VBQ0Esa0JBQUE7RUFDQSxrQkFBQTtBQURGOztBQUdBO0VBQ0Usb0JBQUE7QUFBRjs7QUFFQTtFQUNFLGtCQUFBO0FBQ0Y7O0FBQ0E7RUFDRSxhQUFBO0VBQ0EsZ0JBQUE7RUFDQSxnQkFBQTtFQUNBLGFBQUE7RUFDQSxZQUFBO0FBRUY7O0FBQUE7RUFDRSxhQUFBO0VBQ0EsZ0JBQUE7RUFDQSxnQkFBQTtFQUNBLGFBQUE7RUFDQSxZQUFBO0FBR0YiLCJmaWxlIjoiZW1haWwtc2VsZWN0b3IuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuXHJcblxyXG4gIC5ldmVuIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNlY2YwZjlhYjtcclxufVxyXG4ub2RkIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XHJcbn1cclxuXHJcblxyXG4ubGlzdGl0ZW17XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmb250LXNpemU6IDAuN2VtO1xyXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgbWFyZ2luOiAwIDEwcHg7XHJcbiAgY29sb3I6IGJsYWNrO1xyXG59XHJcblxyXG4uc2VsZWN0YWxse1xyXG4gIGZvbnQtc2l6ZTogMC45ZW07XHJcbiAgZm9udC13ZWlnaHQ6IDcwMDtcclxuICBtYXJnaW46MTZweDtcclxufVxyXG4ubWF0bGlzdHtcclxuICBwYWRkaW5nLXRvcDogMTZweDtcclxuICBwYWRkaW5nLWxlZnQ6IDE2cHg7XHJcbn1cclxuXHJcbi5zZW5kQnV0dG9ue1xyXG4gIG1hcmdpbi10b3A6IDE2cHg7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIG1hcmdpbi1sZWZ0OiA0ODBweDtcclxufVxyXG4uaXRlbXtcclxuICBwYWRkaW5nLWJvdHRvbTogMTZweDtcclxufVxyXG4uY2xvc2V7XHJcbiAgbWFyZ2luLWxlZnQ6IDUwMHB4O1xyXG59XHJcbi5saXN0aXRlbTF7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmb250LXNpemU6IDAuN2VtO1xyXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgbWFyZ2luOiAwIDJweDtcclxuICBjb2xvcjogYmxhY2s7XHJcbn1cclxuLmxpc3RpdGVtMntcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZvbnQtc2l6ZTogMC43ZW07XHJcbiAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICBtYXJnaW46IDAgMnB4O1xyXG4gIGNvbG9yOiBibGFjaztcclxufVxyXG5cclxuXHJcblxyXG5cclxuIl19 */");

/***/ }),

/***/ "Awdc":
/*!****************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/utilities/date-time/date-time.component.html ***!
  \****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"d-flex flex-column\">\r\n  <span class=\"input-placeholder\">{{placeholder}}*</span>\r\n  <div class=\"main-background d-flex flex-row align-center justify-center\">\r\n    <div class=\"d-flex flex-column align-center justify-center ion-padding date-background\" (click)=\"changeDate()\">\r\n      <span class=\"month\">{{date | date: 'MMM'}}</span>\r\n      <span class=\"day\">{{date | date: 'dd'}}</span>\r\n    </div>\r\n    <div class=\"ion-padding\" (click)=\"changeTime()\">\r\n      <span class=\"time\">{{date | date: 'hh : mm a'}}</span>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n");

/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false,
    version: '1.1.3',
    firebase: {
        apiKey: "AIzaSyAcveVBoDUxk_VPNozqLR7ZZ4x1fyZoPxI",
        authDomain: "wattmonk-273002.firebaseapp.com",
        databaseURL: "https://wattmonk-273002.firebaseio.com",
        projectId: "wattmonk-273002",
        storageBucket: "wattmonk-273002.appspot.com",
        messagingSenderId: "554801985112",
        appId: "1:554801985112:web:4d1bd25b29924b9de53c2d",
        measurementId: "G-Y5FQXTC6DJ"
    }
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "HXA+":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/utilities/progress-bar/progress-bar.component.html ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\r\n<ion-list>\r\n  <ion-list-header>\r\n    \r\n  </ion-list-header>\r\n  <ion-progress-bar value={{value}} buffer=\"{{buffer}}\"></ion-progress-bar>\r\n</ion-list>");

/***/ }),

/***/ "J2fO":
/*!******************************************************************!*\
  !*** ./src/app/popover-component/popover-component.component.ts ***!
  \******************************************************************/
/*! exports provided: PopoverComponentComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PopoverComponentComponent", function() { return PopoverComponentComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_popover_component_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./popover-component.component.html */ "6NCw");
/* harmony import */ var _popover_component_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./popover-component.component.scss */ "e0VG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _utilities_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utilities.service */ "oTnF");






let PopoverComponentComponent = class PopoverComponentComponent {
    constructor(router, utilities) {
        this.router = router;
        this.utilities = utilities;
    }
    ngOnInit() { }
    siteAssessment() {
        this.router.navigate(['/schedule/design']);
        this.utilities.dismissPopover();
    }
    salesProposal() {
        this.router.navigate(['/schedule/salesproposal']);
        this.utilities.dismissPopover();
    }
};
PopoverComponentComponent.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
    { type: _utilities_service__WEBPACK_IMPORTED_MODULE_5__["UtilitiesService"] }
];
PopoverComponentComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-popover-component',
        template: _raw_loader_popover_component_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_popover_component_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], PopoverComponentComponent);



/***/ }),

/***/ "JJ/q":
/*!************************************************************!*\
  !*** ./src/app/utilities/date-time/date-time.component.ts ***!
  \************************************************************/
/*! exports provided: DateTimeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DateTimeComponent", function() { return DateTimeComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_date_time_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./date-time.component.html */ "Awdc");
/* harmony import */ var _date_time_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./date-time.component.scss */ "fYoh");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_native_date_picker_ngx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic-native/date-picker/ngx */ "ya1t");
/* harmony import */ var src_app_utilities_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/utilities.service */ "oTnF");
var DateTimeComponent_1;







let DateTimeComponent = DateTimeComponent_1 = class DateTimeComponent {
    constructor(datePicker, utilities) {
        this.datePicker = datePicker;
        this.utilities = utilities;
        this.placeholder = '';
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
    }
    writeValue(date) {
        this.date = date;
        console.log(this.date);
    }
    validate(control) {
        if (this.date !== null && this.date !== undefined && this.date !== 0 && this.date > new Date().getTime()) {
            return null;
        }
        if (this.date > 0 && this.date < new Date().getTime()) {
            return null;
            // return {
            //   error: 'Date must be a future date'
            // };
        }
        return {
            error: 'Please choose a date'
        };
    }
    changeDate() {
        const currentDate = new Date(this.date);
        console.log(currentDate);
        this.datePicker.show({
            date: new Date(this.date),
            minDate: new Date().getTime(),
            mode: 'date',
            androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
        }).then(date => {
            this.date = date.getTime();
            this.onChange(date);
        }, err => console.log('Error occurred while getting date: ', err));
    }
    changeTime() {
        const currentDate = new Date();
        console.log(currentDate);
        this.datePicker.show({
            date: new Date(this.date),
            minDate: new Date().getTime(),
            mode: 'time',
            androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
        }).then(date => {
            // if(this.date.getTime > currentDate.getTime()){
            // }
            const oldDate = new Date(this.date);
            oldDate.setHours(date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
            this.date = oldDate.getTime();
            var selected_date = oldDate.getDay();
            console.log(this.date, currentDate.getTime(), "time");
            this.onChange(oldDate);
            if (this.date < currentDate.getTime()) {
                this.utilities.showAlert("Invalid time");
                this.date = new Date().getTime();
            }
        }, err => console.log('Error occurred while getting date: ', err));
    }
};
DateTimeComponent.ctorParameters = () => [
    { type: _ionic_native_date_picker_ngx__WEBPACK_IMPORTED_MODULE_5__["DatePicker"] },
    { type: src_app_utilities_service__WEBPACK_IMPORTED_MODULE_6__["UtilitiesService"] }
];
DateTimeComponent.propDecorators = {
    date: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
    placeholder: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }]
};
DateTimeComponent = DateTimeComponent_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-date-time',
        template: _raw_loader_date_time_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        providers: [
            {
                provide: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NG_VALUE_ACCESSOR"],
                multi: true,
                useExisting: DateTimeComponent_1
            },
            {
                provide: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NG_VALIDATORS"],
                multi: true,
                useExisting: DateTimeComponent_1
            }
        ],
        styles: [_date_time_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], DateTimeComponent);



/***/ }),

/***/ "Kp5Z":
/*!************************************!*\
  !*** ./src/app/model/constants.ts ***!
  \************************************/
/*! exports provided: ScheduleFormEvent, UserRoles, MapPageType, INVALID_EMAIL_MESSAGE, FIELD_REQUIRED, INVALID_NAME_MESSAGE, INVALID_ANNUAL_UNIT, INVALID_TILT_FOR_GROUND_MOUNT, INVALID_PHONE_NUMBER, INVALID_AMOUNT, INVALID_AMOUNT_FOR_ONBOARDING, INVALID_MODULE_AND_INVERTER, INVALID_FIRST_NAME, INVALID_LAST_NAME, INVALID_ADDRESS, INVALID_REGISTRATION_NUMBER, INVALID_COMPANY_NAME, COMET_CHAT_APP_ID, COMET_CHAT_AUTH_KEY, COMET_CHAT_REGION, GOOGLE_API_KEY, ImageUploadModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScheduleFormEvent", function() { return ScheduleFormEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserRoles", function() { return UserRoles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MapPageType", function() { return MapPageType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INVALID_EMAIL_MESSAGE", function() { return INVALID_EMAIL_MESSAGE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FIELD_REQUIRED", function() { return FIELD_REQUIRED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INVALID_NAME_MESSAGE", function() { return INVALID_NAME_MESSAGE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INVALID_ANNUAL_UNIT", function() { return INVALID_ANNUAL_UNIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INVALID_TILT_FOR_GROUND_MOUNT", function() { return INVALID_TILT_FOR_GROUND_MOUNT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INVALID_PHONE_NUMBER", function() { return INVALID_PHONE_NUMBER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INVALID_AMOUNT", function() { return INVALID_AMOUNT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INVALID_AMOUNT_FOR_ONBOARDING", function() { return INVALID_AMOUNT_FOR_ONBOARDING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INVALID_MODULE_AND_INVERTER", function() { return INVALID_MODULE_AND_INVERTER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INVALID_FIRST_NAME", function() { return INVALID_FIRST_NAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INVALID_LAST_NAME", function() { return INVALID_LAST_NAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INVALID_ADDRESS", function() { return INVALID_ADDRESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INVALID_REGISTRATION_NUMBER", function() { return INVALID_REGISTRATION_NUMBER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INVALID_COMPANY_NAME", function() { return INVALID_COMPANY_NAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COMET_CHAT_APP_ID", function() { return COMET_CHAT_APP_ID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COMET_CHAT_AUTH_KEY", function() { return COMET_CHAT_AUTH_KEY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COMET_CHAT_REGION", function() { return COMET_CHAT_REGION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GOOGLE_API_KEY", function() { return GOOGLE_API_KEY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImageUploadModel", function() { return ImageUploadModel; });
var ScheduleFormEvent;
(function (ScheduleFormEvent) {
    ScheduleFormEvent[ScheduleFormEvent["NO_EVENT"] = 0] = "NO_EVENT";
    ScheduleFormEvent[ScheduleFormEvent["SAVE_DESIGN_FORM"] = 1] = "SAVE_DESIGN_FORM";
    ScheduleFormEvent[ScheduleFormEvent["SAVE_SURVEY_FORM"] = 2] = "SAVE_SURVEY_FORM";
    ScheduleFormEvent[ScheduleFormEvent["START_SURVEY"] = 3] = "START_SURVEY";
    ScheduleFormEvent[ScheduleFormEvent["SEND_DESIGN_FORM"] = 4] = "SEND_DESIGN_FORM";
    ScheduleFormEvent[ScheduleFormEvent["PAY_EVENT"] = 5] = "PAY_EVENT";
    ScheduleFormEvent[ScheduleFormEvent["SEND_VALUE"] = 6] = "SEND_VALUE";
    ScheduleFormEvent[ScheduleFormEvent["SEND_DESIGNERS_VALUE"] = 7] = "SEND_DESIGNERS_VALUE";
    ScheduleFormEvent[ScheduleFormEvent["SEND_ANALYSTS_VALUE"] = 8] = "SEND_ANALYSTS_VALUE";
    ScheduleFormEvent[ScheduleFormEvent["SEND_PERMIT_FORM"] = 9] = "SEND_PERMIT_FORM";
    ScheduleFormEvent[ScheduleFormEvent["SAVE_PERMIT_FORM"] = 10] = "SAVE_PERMIT_FORM";
    ScheduleFormEvent[ScheduleFormEvent["SAVE_SALES_FORM"] = 11] = "SAVE_SALES_FORM";
    ScheduleFormEvent[ScheduleFormEvent["SEND_SALES_FORM"] = 12] = "SEND_SALES_FORM";
})(ScheduleFormEvent || (ScheduleFormEvent = {}));
var UserRoles;
(function (UserRoles) {
    UserRoles[UserRoles["ADMIN"] = 5] = "ADMIN";
    UserRoles[UserRoles["BD"] = 3] = "BD";
    UserRoles[UserRoles["DESIGNER"] = 8] = "DESIGNER";
    UserRoles[UserRoles["SURVEYOR"] = 9] = "SURVEYOR";
    UserRoles[UserRoles["ANALYST"] = 10] = "ANALYST";
})(UserRoles || (UserRoles = {}));
var MapPageType;
(function (MapPageType) {
    MapPageType[MapPageType["CAMERA_INTERFACE"] = 0] = "CAMERA_INTERFACE";
    MapPageType[MapPageType["IMAGE_PREVIEW"] = 1] = "IMAGE_PREVIEW";
    MapPageType[MapPageType["IMAGE_PREVIEW_WITH_OPTIONS"] = 2] = "IMAGE_PREVIEW_WITH_OPTIONS";
    MapPageType[MapPageType["DETAILS_FORM"] = 3] = "DETAILS_FORM";
    MapPageType[MapPageType["NONE"] = 4] = "NONE";
    MapPageType[MapPageType["MAP_PAGE"] = 5] = "MAP_PAGE";
})(MapPageType || (MapPageType = {}));
const INVALID_EMAIL_MESSAGE = 'Invalid Email';
const FIELD_REQUIRED = 'This field is required';
const INVALID_NAME_MESSAGE = 'Invalid Name';
const INVALID_ANNUAL_UNIT = 'Invalid Annual Unit';
const INVALID_TILT_FOR_GROUND_MOUNT = 'Invalid Value';
const INVALID_PHONE_NUMBER = 'Phone number should be of min. 8 and max. 15 numbers.';
const INVALID_AMOUNT = 'Please enter an amount greater than $1 and less than $10000';
const INVALID_AMOUNT_FOR_ONBOARDING = 'Please enter an amount greater than 100 and less than 5000';
const INVALID_MODULE_AND_INVERTER = 'Please enter a valid format';
const INVALID_FIRST_NAME = 'Invalid First Name';
const INVALID_LAST_NAME = 'Invalid Last Name';
const INVALID_ADDRESS = "Invalid Address";
const INVALID_REGISTRATION_NUMBER = "Invalid Registration Number";
const INVALID_COMPANY_NAME = "Invalid Company Name";
const COMET_CHAT_APP_ID = '190385dcec51285';
const COMET_CHAT_AUTH_KEY = '5cafae1939d4fc620698c50ae3f25e727fc90213';
const COMET_CHAT_REGION = 'us';
const GOOGLE_API_KEY = 'AIzaSyCePxz4wA_knfjvNBhV0RKzrySsf4o8QFU';
// export const CAMERA_MODULE_MENU_BATTERY: MenuModel[] = [
//   {
//     name: 'Electricals',
//     isSelected: true,
//     imageModel: [],
//     subMenu: [
//       {
//         name: 'MSP',
//         isSelected: true,
//         allCaptured: false,
//         askBeforeImage: false,
//         answered: false,
//         questionToAsk: '',
//         formControlToUpdate: '',
//         images: [
//           {
//             image: '',
//             imageTitle: 'Long Shot',
//             popupTitle: 'Confirm',
//             showPopup: true,
//             popupQuestion: 'Is MSP location inside or outside of building?',
//             questionType: QuestionType.YES_NO,
//             questionOptions: ['Inside', 'Outside'],
//             givenAnswer: '',
//             formValueToUpdate: 'msplocation',
//             imageUploadTag: 'mspimages',
//             imageName: 'msplongshot'
//           },
//           {
//             image: '',
//             imageTitle: 'Open Shutter, Zoom Shot',
//             showPopup: true,
//             popupTitle: 'Confirm',
//             popupQuestion: 'Main Breaker Size',
//             questionType: QuestionType.INPUT_NUMBER,
//             questionOptions: [],
//             givenAnswer: '',
//             formValueToUpdate: 'mainbreakersize',
//             imageUploadTag: 'mspimages',
//             imageName: 'mspopenshutterzoomshot'
//           },
//           {
//             image: '',
//             imageTitle: 'Zoom Shot',
//             showPopup: true,
//             popupTitle: 'Confirm',
//             popupQuestion: 'MSP Rating',
//             questionType: QuestionType.INPUT_NUMBER,
//             questionOptions: ['MSP Rating', 'Bus Rating'],
//             givenAnswer: '',
//             formValueToUpdate: 'msprating',
//             imageUploadTag: 'mspimages',
//             imageName: 'mspzoomshot'
//           },
//           {
//             image: '',
//             imageTitle: 'Without Cover, Zoom shot',
//             showPopup: true,
//             popupTitle: 'Confirm',
//             popupQuestion: 'Main breaker location in MSP',
//             questionType: QuestionType.RADIO_BUTTON,
//             questionOptions: ['Top', 'Bottom', 'Center'],
//             givenAnswer: '',
//             formValueToUpdate: 'mspbreaker',
//             imageUploadTag: 'mspimages',
//             imageName: 'mspwithoutcovershot'
//           }
//         ]
//       },
//       {
//         name: 'PV Inverter',
//         isSelected: false,
//         allCaptured: false,
//         askBeforeImage: false,
//         answered: false,
//         questionToAsk: '',
//         formControlToUpdate: '',
//         images: [
//           {
//             image: '',
//             imageTitle: 'Wide angle shot',
//             showPopup: true,
//             popupTitle: 'Confirm',
//             popupQuestion: 'Inverter Location',
//             questionType: QuestionType.YES_NO,
//             questionOptions: ['Inside', 'Outside'],
//             givenAnswer: '',
//             formValueToUpdate: 'pvinverterlocation',
//             imageUploadTag: 'pvinverterimages',
//             imageName: 'pvinverterwideshoturl'
//           },
//           {
//             image: '',
//             imageTitle: 'Zoom shot',
//             showPopup: true,
//             popupTitle: 'Confirm',
//             popupQuestion: 'Inverter manufacture model',
//             questionType: QuestionType.INVERTER_MODEL,
//             questionOptions: [],
//             givenAnswer: '',
//             formValueToUpdate: '',
//             imageUploadTag: 'pvinverterimages',
//             imageName: 'pvinverterzoomshoturl'
//           }
//         ]
//       },
//       {
//         name: 'PV Meter',
//         isSelected: false,
//         allCaptured: false,
//         askBeforeImage: true,
//         answered: false,
//         questionToAsk: 'Is PV meter installed in premises',
//         formControlToUpdate: 'pvmeter',
//         images: [
//           {
//             image: '',
//             imageTitle: 'PV Meter',
//             showPopup: true,
//             popupTitle: 'Confirm',
//             popupQuestion: 'Inverter Location',
//             questionType: QuestionType.NONE,
//             questionOptions: [],
//             givenAnswer: '',
//             formValueToUpdate: '',
//             imageUploadTag: 'pvmeterimages',
//             imageName: 'pvmeterwideshoturl'
//           }
//         ]
//       },
//       {
//         name: 'AC Disconnect',
//         isSelected: false,
//         allCaptured: false,
//         askBeforeImage: true,
//         answered: false,
//         questionToAsk: 'Is AC disconnected?',
//         formControlToUpdate: 'acdisconnect',
//         images: [
//           {
//             image: '',
//             imageTitle: 'Wide Angle Shot',
//             showPopup: true,
//             popupTitle: 'Confirm',
//             popupQuestion: 'Inverter Location',
//             questionType: QuestionType.NONE,
//             questionOptions: [],
//             givenAnswer: '',
//             formValueToUpdate: '',
//             imageUploadTag: 'acdisconnectimages',
//             imageName: 'acdisconnectwideshoturl'
//           },
//           {
//             image: '',
//             imageTitle: 'Zoom Shot',
//             showPopup: true,
//             popupTitle: 'Confirm',
//             popupQuestion: 'Inverter Location',
//             questionType: QuestionType.NONE,
//             questionOptions: [],
//             givenAnswer: '',
//             formValueToUpdate: '',
//             imageUploadTag: 'acdisconnectimages',
//             imageName: 'acdisconnectzoomshoturl'
//           }
//         ]
//       },
//       {
//         name: 'Utility Meter',
//         isSelected: false,
//         allCaptured: false,
//         askBeforeImage: false,
//         answered: false,
//         questionToAsk: '',
//         formControlToUpdate: '',
//         images: [
//           {
//             image: '',
//             imageTitle: 'Wide angle shot',
//             showPopup: true,
//             popupTitle: 'Confirm',
//             popupQuestion: 'Is Utility meter is attached or detached with MSP?',
//             questionType: QuestionType.YES_NO,
//             questionOptions: ['Attach', 'Detach'],
//             givenAnswer: '',
//             formValueToUpdate: 'utilitymeter',
//             imageUploadTag: 'utilitymeterimages',
//             imageName: 'umwideshoturl'
//           },
//           {
//             image: '',
//             imageTitle: 'Zoom shot',
//             showPopup: true,
//             popupTitle: 'Confirm',
//             popupQuestion: 'Utility Name',
//             questionType: QuestionType.UTILITIES,
//             questionOptions: [],
//             givenAnswer: '',
//             formValueToUpdate: '',
//             imageUploadTag: 'utilitymeterimages',
//             imageName: 'umzoomshoturl'
//           }
//         ]
//       }
//     ]
//   },
//   {
//     name: 'Solar',
//     isSelected: false,
//     imageModel: [],
//     subMenu: [
//       {
//         name: 'Panels',
//         isSelected: true,
//         allCaptured: false,
//         askBeforeImage: false,
//         answered: false,
//         questionToAsk: '',
//         formControlToUpdate: '',
//         images: [{
//           image: '',
//           imageTitle: 'Wide angle shot',
//           showPopup: false,
//           popupTitle: 'Confirm',
//           popupQuestion: 'Number of Modules',
//           questionType: QuestionType.INPUT_NUMBER,
//           questionOptions: [],
//           givenAnswer: '',
//           formValueToUpdate: 'numberofmodules',
//           imageUploadTag: 'roofimages',
//           imageName: 'solarpanels'
//         }]
//       }
//     ]
//   },
//   {
//     name: 'Roof',
//     isSelected: false,
//     imageModel: [{
//       image: '',
//       imageTitle: '',
//       popupTitle: 'Confirm',
//       showPopup: false,
//       popupQuestion: '',
//       questionType: QuestionType.MORE_PHOTOS,
//       questionOptions: [],
//       givenAnswer: '',
//       formValueToUpdate: '',
//       imageUploadTag: 'roofimages',
//       imageName: 'modulewideshoturl1'
//     }],
//     subMenu: []
//   },
//   {
//     name: 'Appliances',
//     isSelected: false,
//     imageModel: [{
//       image: '',
//       imageTitle: '',
//       popupTitle: 'Appliance Name',
//       showPopup: false,
//       popupQuestion: 'Please enter appliance name',
//       questionType: QuestionType.MORE_PHOTOS_WITH_INPUT_STRING,
//       questionOptions: [],
//       givenAnswer: '',
//       formValueToUpdate: '',
//       imageUploadTag: 'appliancesimages',
//       imageName: 'appliances1'
//     }],
//     subMenu: []
//   },
//   {
//     name: 'Details',
//     isSelected: false,
//     imageModel: null,
//     subMenu: null
//   }
// ];
// export const CAMERA_MODULE_MENU_PV: MenuModel[] = [
//   {
//     name: 'Electricals',
//     isSelected: true,
//     imageModel: [],
//     subMenu: [
//       {
//         name: 'MSP',
//         isSelected: true,
//         allCaptured: false,
//         askBeforeImage: false,
//         answered: false,
//         questionToAsk: '',
//         formControlToUpdate: '',
//         images: [
//           {
//             image: '',
//             imageTitle: 'Long Shot',
//             popupTitle: 'Confirm',
//             showPopup: true,
//             popupQuestion: 'Is MSP location inside or outside of building?',
//             questionType: QuestionType.YES_NO,
//             questionOptions: ['Inside', 'Outside'],
//             givenAnswer: '',
//             formValueToUpdate: 'msplocation',
//             imageUploadTag: 'mspimages',
//             imageName: 'msplongshot'
//           },
//           {
//             image: '',
//             imageTitle: 'Open Shutter, Zoom Shot',
//             showPopup: true,
//             popupTitle: 'Confirm',
//             popupQuestion: 'Main Breaker Size',
//             questionType: QuestionType.INPUT_NUMBER,
//             questionOptions: [],
//             givenAnswer: '',
//             formValueToUpdate: 'mainbreakersize',
//             imageUploadTag: 'mspimages',
//             imageName: 'mspopenshutterzoomshot'
//           },
//           {
//             image: '',
//             imageTitle: 'Zoom Shot',
//             showPopup: true,
//             popupTitle: 'Confirm',
//             popupQuestion: 'MSP Rating',
//             questionType: QuestionType.INPUT_NUMBER,
//             questionOptions: ['MSP Rating', 'Bus Rating'],
//             givenAnswer: '',
//             formValueToUpdate: 'msprating',
//             imageUploadTag: 'mspimages',
//             imageName: 'mspzoomshot'
//           },
//           {
//             image: '',
//             imageTitle: 'Without Cover, Zoom shot',
//             showPopup: true,
//             popupTitle: 'Confirm',
//             popupQuestion: 'Main breaker location in MSP',
//             questionType: QuestionType.RADIO_BUTTON,
//             questionOptions: ['Top', 'Bottom', 'Center'],
//             givenAnswer: '',
//             formValueToUpdate: 'mspbreaker',
//             imageUploadTag: 'mspimages',
//             imageName: 'mspwithoutcovershot'
//           }
//         ]
//       },
//       {
//         name: 'Existing Sub Panel',
//         isSelected: false,
//         allCaptured: false,
//         askBeforeImage: false,
//         answered: false,
//         questionToAsk: '',
//         formControlToUpdate: '',
//         images: [
//           {
//             image: '',
//             imageTitle: '',
//             showPopup: true,
//             popupTitle: '',
//             popupQuestion: '',
//             questionType: QuestionType.NONE,
//             questionOptions: [],
//             givenAnswer: '',
//             formValueToUpdate: '',
//             imageUploadTag: 'existingsubpanelimages',
//             imageName: 'Existingsubpanelimages'
//           }
//         ]
//       },
//       {
//         name: 'Utility Meter',
//         isSelected: false,
//         allCaptured: false,
//         askBeforeImage: false,
//         answered: false,
//         questionToAsk: '',
//         formControlToUpdate: '',
//         images: [
//           {
//             image: '',
//             imageTitle: 'Wide angle shot',
//             showPopup: true,
//             popupTitle: 'Confirm',
//             popupQuestion: 'Is Utility meter is attached or detached with MSP?',
//             questionType: QuestionType.YES_NO,
//             questionOptions: ['Attach', 'Detach'],
//             givenAnswer: '',
//             formValueToUpdate: 'utilitymeter',
//             imageUploadTag: 'utilitymeterimages',
//             imageName: 'umwideshoturl'
//           },
//           {
//             image: '',
//             imageTitle: 'Zoom shot',
//             showPopup: true,
//             popupTitle: 'Confirm',
//             popupQuestion: 'Utility Name',
//             questionType: QuestionType.UTILITIES,
//             questionOptions: [],
//             givenAnswer: '',
//             formValueToUpdate: '',
//             imageUploadTag: 'utilitymeterimages',
//             imageName: 'umzoomshoturl'
//           }
//         ]
//       }
//     ]
//   },
//   {
//     name: 'Roof',
//     isSelected: false,
//     imageModel: [],
//     subMenu: [
//       {
//         name: 'Roof Photos',
//         isSelected: false,
//         allCaptured: false,
//         askBeforeImage: false,
//         answered: false,
//         questionToAsk: '',
//         formControlToUpdate: '',
//         images: [
//           {
//             image: '',
//             imageTitle: '',
//             showPopup: true,
//             popupTitle: '',
//             popupQuestion: '',
//             questionType: QuestionType.MORE_PHOTOS,
//             questionOptions: [],
//             givenAnswer: '',
//             formValueToUpdate: '',
//             imageUploadTag: 'roofimages',
//             imageName: 'moduleshot1'
//           }
//         ]
//       },
//       {
//         name: 'Roof Dimensions',
//         isSelected: false,
//         allCaptured: false,
//         askBeforeImage: false,
//         answered: false,
//         questionToAsk: '',
//         formControlToUpdate: '',
//         images: [
//           {
//             image: '',
//             imageTitle: '',
//             showPopup: true,
//             popupTitle: '',
//             popupQuestion: '',
//             questionType: QuestionType.MORE_PHOTOS,
//             questionOptions: [],
//             givenAnswer: '',
//             formValueToUpdate: '',
//             imageUploadTag: 'roofdimensionimages',
//             imageName: 'roofdimensions1'
//           }
//         ]
//       },
//       {
//         name: 'Obstacle Photos',
//         isSelected: false,
//         allCaptured: false,
//         askBeforeImage: false,
//         answered: false,
//         questionToAsk: '',
//         formControlToUpdate: '',
//         images: [
//           {
//             image: '',
//             imageTitle: '',
//             showPopup: true,
//             popupTitle: '',
//             popupQuestion: '',
//             questionType: QuestionType.MORE_PHOTOS,
//             questionOptions: [],
//             givenAnswer: '',
//             formValueToUpdate: '',
//             imageUploadTag: 'obstaclesimages',
//             imageName: 'obstaclesphotos1'
//           }
//         ]
//       },
//       {
//         name: 'Obstacle Dimensions',
//         isSelected: false,
//         allCaptured: false,
//         askBeforeImage: false,
//         answered: false,
//         questionToAsk: '',
//         formControlToUpdate: '',
//         images: [
//           {
//             image: '',
//             imageTitle: '',
//             showPopup: true,
//             popupTitle: '',
//             popupQuestion: '',
//             questionType: QuestionType.MORE_PHOTOS,
//             questionOptions: [],
//             givenAnswer: '',
//             formValueToUpdate: '',
//             imageUploadTag: 'obstaclesdimensionsimages',
//             imageName: 'obstaclesdimensions1'
//           }
//         ]
//       }
//     ]
//   },
//   {
//     name: 'Attic',
//     isSelected: false,
//     imageModel: [],
//     subMenu: [
//       {
//         name: 'Attic Photos',
//         isSelected: false,
//         allCaptured: false,
//         askBeforeImage: false,
//         answered: false,
//         questionToAsk: '',
//         formControlToUpdate: '',
//         images: [
//           {
//             image: '',
//             imageTitle: '',
//             showPopup: true,
//             popupTitle: '',
//             popupQuestion: '',
//             questionType: QuestionType.MORE_PHOTOS,
//             questionOptions: [],
//             givenAnswer: '',
//             formValueToUpdate: '',
//             imageUploadTag: 'atticimages',
//             imageName: 'atticphotos1'
//           }
//         ]
//       }
//     ]
//   },
//   {
//     name: 'Appliances',
//     isSelected: false,
//     imageModel: [{
//       image: '',
//       imageTitle: '',
//       popupTitle: 'Appliance Name',
//       showPopup: false,
//       popupQuestion: 'Please enter appliance name',
//       questionType: QuestionType.MORE_PHOTOS_WITH_INPUT_STRING,
//       questionOptions: [],
//       givenAnswer: '',
//       formValueToUpdate: '',
//       imageUploadTag: 'appliancesimages',
//       imageName: 'appliances1'
//     }],
//     subMenu: []
//   },
//   {
//     name: 'Details',
//     isSelected: false,
//     imageModel: null,
//     subMenu: null
//   }
// ];
// export const CAMERA_MODULE_MENU_PV_BATTERY: MenuModel[] = [
//   {
//     name: 'Electricals',
//     isSelected: true,
//     imageModel: [],
//     subMenu: [
//       {
//         name: 'MSP',
//         isSelected: true,
//         allCaptured: false,
//         askBeforeImage: false,
//         answered: false,
//         questionToAsk: '',
//         formControlToUpdate: '',
//         images: [
//           {
//             image: '',
//             imageTitle: 'Long Shot',
//             popupTitle: 'Confirm',
//             showPopup: true,
//             popupQuestion: 'Is MSP location inside or outside of building?',
//             questionType: QuestionType.YES_NO,
//             questionOptions: ['Inside', 'Outside'],
//             givenAnswer: '',
//             formValueToUpdate: 'msplocation',
//             imageUploadTag: 'mspimages',
//             imageName: 'msplongshot'
//           },
//           {
//             image: '',
//             imageTitle: 'Open Shutter, Zoom Shot',
//             showPopup: true,
//             popupTitle: 'Confirm',
//             popupQuestion: 'Main Breaker Size',
//             questionType: QuestionType.INPUT_NUMBER,
//             questionOptions: [],
//             givenAnswer: '',
//             formValueToUpdate: 'mainbreakersize',
//             imageUploadTag: 'mspimages',
//             imageName: 'mspopenshutterzoomshot'
//           },
//           {
//             image: '',
//             imageTitle: 'Zoom Shot',
//             showPopup: true,
//             popupTitle: 'Confirm',
//             popupQuestion: 'MSP Rating',
//             questionType: QuestionType.INPUT_NUMBER,
//             questionOptions: ['MSP Rating', 'Bus Rating'],
//             givenAnswer: '',
//             formValueToUpdate: 'msprating',
//             imageUploadTag: 'mspimages',
//             imageName: 'mspzoomshot'
//           },
//           {
//             image: '',
//             imageTitle: 'Without Cover, Zoom shot',
//             showPopup: true,
//             popupTitle: 'Confirm',
//             popupQuestion: 'Main breaker location in MSP',
//             questionType: QuestionType.RADIO_BUTTON,
//             questionOptions: ['Top', 'Bottom', 'Center'],
//             givenAnswer: '',
//             formValueToUpdate: 'mspbreaker',
//             imageUploadTag: 'mspimages',
//             imageName: 'mspwithoutcovershot'
//           }
//         ]
//       },
//       {
//         name: 'Existing Sub Panel',
//         isSelected: false,
//         allCaptured: false,
//         askBeforeImage: false,
//         answered: false,
//         questionToAsk: '',
//         formControlToUpdate: '',
//         images: [
//           {
//             image: '',
//             imageTitle: '',
//             showPopup: true,
//             popupTitle: '',
//             popupQuestion: '',
//             questionType: QuestionType.NONE,
//             questionOptions: [],
//             givenAnswer: '',
//             formValueToUpdate: '',
//             imageUploadTag: 'existingsubpanelimages',
//             imageName: 'existingsubpanelimages'
//           }
//         ]
//       },
//       {
//         name: 'Location of Battery',
//         isSelected: false,
//         allCaptured: false,
//         askBeforeImage: false,
//         answered: false,
//         questionToAsk: '',
//         formControlToUpdate: '',
//         images: [
//           {
//             image: '',
//             imageTitle: '',
//             showPopup: true,
//             popupTitle: '',
//             popupQuestion: '',
//             questionType: QuestionType.NONE,
//             questionOptions: [],
//             givenAnswer: '',
//             formValueToUpdate: '',
//             imageUploadTag: 'roofimages',
//             imageName: 'locationofbattery'
//           }
//         ]
//       },
//       {
//         name: 'Utility Meter',
//         isSelected: false,
//         allCaptured: false,
//         askBeforeImage: false,
//         answered: false,
//         questionToAsk: '',
//         formControlToUpdate: '',
//         images: [
//           {
//             image: '',
//             imageTitle: 'Wide angle shot',
//             showPopup: true,
//             popupTitle: 'Confirm',
//             popupQuestion: 'Is Utility meter is attached or detached with MSP?',
//             questionType: QuestionType.YES_NO,
//             questionOptions: ['Attach', 'Detach'],
//             givenAnswer: '',
//             formValueToUpdate: 'utilitymeter',
//             imageUploadTag: 'utilitymeterimages',
//             imageName: 'umwideshoturl'
//           },
//           {
//             image: '',
//             imageTitle: 'Zoom shot',
//             showPopup: true,
//             popupTitle: 'Confirm',
//             popupQuestion: 'Utility Name',
//             questionType: QuestionType.UTILITIES,
//             questionOptions: [],
//             givenAnswer: '',
//             formValueToUpdate: '',
//             imageUploadTag: 'utilitymeterimages',
//             imageName: 'umzoomshoturl'
//           }
//         ]
//       }
//     ]
//   },
//   {
//     name: 'Roof',
//     isSelected: false,
//     imageModel: [],
//     subMenu: [
//       {
//         name: 'Roof Photos',
//         isSelected: false,
//         allCaptured: false,
//         askBeforeImage: false,
//         answered: false,
//         questionToAsk: '',
//         formControlToUpdate: '',
//         images: [
//           {
//             image: '',
//             imageTitle: '',
//             showPopup: true,
//             popupTitle: '',
//             popupQuestion: '',
//             questionType: QuestionType.MORE_PHOTOS,
//             questionOptions: [],
//             givenAnswer: '',
//             formValueToUpdate: '',
//             imageUploadTag: 'roofimages',
//             imageName: 'moduleshot1'
//           }
//         ]
//       },
//       {
//         name: 'Roof Dimensions',
//         isSelected: false,
//         allCaptured: false,
//         askBeforeImage: false,
//         answered: false,
//         questionToAsk: '',
//         formControlToUpdate: '',
//         images: [
//           {
//             image: '',
//             imageTitle: '',
//             showPopup: true,
//             popupTitle: '',
//             popupQuestion: '',
//             questionType: QuestionType.MORE_PHOTOS,
//             questionOptions: [],
//             givenAnswer: '',
//             formValueToUpdate: '',
//             imageUploadTag: 'roofdimensionimages',
//             imageName: 'roofdimensions1'
//           }
//         ]
//       },
//       {
//         name: 'Obstacle Photos',
//         isSelected: false,
//         allCaptured: false,
//         askBeforeImage: false,
//         answered: false,
//         questionToAsk: '',
//         formControlToUpdate: '',
//         images: [
//           {
//             image: '',
//             imageTitle: '',
//             showPopup: true,
//             popupTitle: '',
//             popupQuestion: '',
//             questionType: QuestionType.MORE_PHOTOS,
//             questionOptions: [],
//             givenAnswer: '',
//             formValueToUpdate: '',
//             imageUploadTag: 'obstaclesimages',
//             imageName: 'obstaclephotos1'
//           }
//         ]
//       },
//       {
//         name: 'Obstacle Dimensions',
//         isSelected: false,
//         allCaptured: false,
//         askBeforeImage: false,
//         answered: false,
//         questionToAsk: '',
//         formControlToUpdate: '',
//         images: [
//           {
//             image: '',
//             imageTitle: '',
//             showPopup: true,
//             popupTitle: '',
//             popupQuestion: '',
//             questionType: QuestionType.MORE_PHOTOS,
//             questionOptions: [],
//             givenAnswer: '',
//             formValueToUpdate: '',
//             imageUploadTag: 'obstaclesdimensionsimages',
//             imageName: 'obstaclesdimensions1'
//           }
//         ]
//       }
//     ]
//   },
//   {
//     name: 'Attic',
//     isSelected: false,
//     imageModel: [],
//     subMenu: [
//       {
//         name: 'Attic Photos',
//         isSelected: false,
//         allCaptured: false,
//         askBeforeImage: false,
//         answered: false,
//         questionToAsk: '',
//         formControlToUpdate: '',
//         images: [
//           {
//             image: '',
//             imageTitle: '',
//             showPopup: true,
//             popupTitle: '',
//             popupQuestion: '',
//             questionType: QuestionType.MORE_PHOTOS,
//             questionOptions: [],
//             givenAnswer: '',
//             formValueToUpdate: '',
//             imageUploadTag: 'atticimages',
//             imageName: 'atticphotos1'
//           }
//         ]
//       }
//     ]
//   },
//   {
//     name: 'Appliances',
//     isSelected: false,
//     imageModel: [{
//       image: '',
//       imageTitle: '',
//       popupTitle: 'Appliance Name',
//       showPopup: false,
//       popupQuestion: 'Please enter appliance name',
//       questionType: QuestionType.MORE_PHOTOS_WITH_INPUT_STRING,
//       questionOptions: [],
//       givenAnswer: '',
//       formValueToUpdate: '',
//       imageUploadTag: 'appliancesimages',
//       imageName: 'appliances1'
//     }],
//     subMenu: []
//   },
//   {
//     name: 'Details',
//     isSelected: false,
//     imageModel: null,
//     subMenu: null
//   }
// ];
// export const EQUIPMENTS: Equipment[] = [
//   {
//     id: 1,
//     name: 'AC Disconnect',
//     color: '#FEC412',
//     disabledColor: '#fec41280',
//     enabled: true
//   }, {
//     id: 2,
//     name: 'PV Meter',
//     color: '#6AA84F',
//     disabledColor: '#6aa84f80',
//     enabled: true
//   }, {
//     id: 3,
//     name: 'MSP',
//     color: '#FF0000',
//     disabledColor: '#ff000080',
//     enabled: true
//   }, {
//     id: 4,
//     name: 'Inverter',
//     color: '#6D9EEB',
//     disabledColor: '#6d9eeb80',
//     enabled: true
//   }, {
//     id: 5,
//     name: 'Battery',
//     color: '#FF00FF',
//     disabledColor: '#ff00ff80',
//     enabled: true
//   }, {
//     id: 6,
//     name: 'GP',
//     color: '#00FFFF',
//     disabledColor: '#00ffff80',
//     enabled: true
//   }, {
//     id: 7,
//     name: 'Electrical Equipment',
//     color: '#FFFF00',
//     disabledColor: '#ffff0080',
//     enabled: true
//   }
// ];
class ImageUploadModel {
}


/***/ }),

/***/ "P8Nm":
/*!**************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/utilities/email-selector/email-selector.component.html ***!
  \**************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-card >\r\n<div class=\"row\">\r\n  <div class=\"col-11\">\r\n      <h4 class=\"dialogformtitle\">Select the Emails</h4>\r\n  </div>\r\n  <div class=\"col-1\">\r\n      <ion-button mat-icon-button>\r\n          <img class=\"dialogclose\" src=\"../../../../../assets/close.svg\" />\r\n      </ion-button>\r\n  </div>\r\n</div>\r\n<div mat-dialog-content>\r\n  \r\n<ion-list  class=\"matlist\">\r\n  \r\n  <ion-label class=\"selectall\">\r\n      <ion-input type=\"checkbox\"  name=\"selectall\" [value]=\"TeamData\" (change)=\"selectAll($event)\"></ion-input>&nbsp;&nbsp;\r\n       Select All\r\n    </ion-label>\r\n  <ion-item-option [ngClass]=\"[ i%2 == 0 ? 'itemcard even' : 'itemcard odd']\"\r\n   *ngFor=\"let item of example; let i = index \">\r\n      <input  type=\"checkbox\" [(ngModel)]=\"item.checked\"> \r\n      <a class=\"listitem1\">{{item.firstname}}</a>\r\n      <a class=\"listitem1\">{{item.lastname}}</a>\r\n      <a class=\"listitem2\">{{item.name}}</a>\r\n      <a class=\"listitem\">({{item.email}})</a>\r\n  </ion-item-option> \r\n  \r\n\r\n</ion-list>\r\n\r\n</div>\r\n<div style=\"padding-top: 16px; padding-left: 16px; \">\r\n<ion-textarea id=\"inputemails\" style=\"width: 50%; height: 60px; word-wrap: break-word;\" type=\"email\"  matInput multiple placeholder=\"john@gmail.com,troy@gmail.com\"></ion-textarea>\r\n</div>\r\n<ion-button mat-raised-button class=\"sendButton\" (click)=\"SendMail()\">Send</ion-button>\r\n</ion-card>\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n<!-- <form #f=\"ngForm\" (ngSubmit)=\"onSubmit(f)\">\r\n<mat-list-item class=\"primary-imenu-item\" role=\"listitem\">\r\n  <mat-form-field class=\"select-form\">  \r\n  <mat-select\r\n      placeholder=\"Emails\"\r\n      name=\"Emails\"\r\n      class=\"filter-select\" \r\n      multiple \r\n      #emailsSelect=\"ngModel\"\r\n       ngModel >\r\n      <mat-option disabled=\"disabled\" class=\"filter-option\">\r\n          <input type=\"checkbox\"(click)=\"selectAll(checkAll.checked, emailsSelect, teamMember)\" #checkAll>\r\n          {{Emails}}\r\n      </mat-option> \r\n      <mat-option >{{data.design.email}}</mat-option>\r\n  </mat-select>\r\n  </mat-form-field>\r\n</mat-list-item>\r\n<button mat-button>Submit</button>\r\n</form> -->");

/***/ }),

/***/ "Qry5":
/*!********************************************************************!*\
  !*** ./src/app/utilities/success-modal/success-modal.component.ts ***!
  \********************************************************************/
/*! exports provided: SuccessModalComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SuccessModalComponent", function() { return SuccessModalComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_success_modal_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./success-modal.component.html */ "ROS4");
/* harmony import */ var _success_modal_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./success-modal.component.scss */ "7GCl");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");





let SuccessModalComponent = class SuccessModalComponent {
    constructor(modalController) {
        this.modalController = modalController;
        this.message = '';
    }
    ngOnInit() { }
    closeModal() {
        this.modalController.dismiss();
    }
};
SuccessModalComponent.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["ModalController"] }
];
SuccessModalComponent.propDecorators = {
    message: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"], args: ['message',] }]
};
SuccessModalComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-success-modal',
        template: _raw_loader_success_modal_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_success_modal_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], SuccessModalComponent);



/***/ }),

/***/ "ROS4":
/*!************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/utilities/success-modal/success-modal.component.html ***!
  \************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-content>\r\n\r\n    <ion-grid>\r\n        <ion-row>\r\n          <ion-col size=\"12\" class=\"ion-text-end\">\r\n            <ion-button fill=\"clear\" size=\"small\" class=\"ion-no-padding\" (click)=\"closeModal()\">\r\n              <ion-icon name=\"close-outline\" style=\"color: dimgray;\" size=\"large\"></ion-icon>\r\n            </ion-button>\r\n          </ion-col>\r\n            <ion-col size=\"12\" class=\"ion-text-center\">\r\n                <img src=\"/assets/images/success.svg\" class=\"success-image\" />\r\n            </ion-col>\r\n            <ion-col size=\"12\" class=\"ion-text-center\">\r\n                <span>{{message}}</span>\r\n            </ion-col>\r\n        </ion-row>\r\n    </ion-grid>\r\n\r\n\r\n</ion-content>\r\n");

/***/ }),

/***/ "RnhZ":
/*!**************************************************!*\
  !*** ./node_modules/moment/locale sync ^\.\/.*$ ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": "K/tc",
	"./af.js": "K/tc",
	"./ar": "jnO4",
	"./ar-dz": "o1bE",
	"./ar-dz.js": "o1bE",
	"./ar-kw": "Qj4J",
	"./ar-kw.js": "Qj4J",
	"./ar-ly": "HP3h",
	"./ar-ly.js": "HP3h",
	"./ar-ma": "CoRJ",
	"./ar-ma.js": "CoRJ",
	"./ar-sa": "gjCT",
	"./ar-sa.js": "gjCT",
	"./ar-tn": "bYM6",
	"./ar-tn.js": "bYM6",
	"./ar.js": "jnO4",
	"./az": "SFxW",
	"./az.js": "SFxW",
	"./be": "H8ED",
	"./be.js": "H8ED",
	"./bg": "hKrs",
	"./bg.js": "hKrs",
	"./bm": "p/rL",
	"./bm.js": "p/rL",
	"./bn": "kEOa",
	"./bn-bd": "loYQ",
	"./bn-bd.js": "loYQ",
	"./bn.js": "kEOa",
	"./bo": "0mo+",
	"./bo.js": "0mo+",
	"./br": "aIdf",
	"./br.js": "aIdf",
	"./bs": "JVSJ",
	"./bs.js": "JVSJ",
	"./ca": "1xZ4",
	"./ca.js": "1xZ4",
	"./cs": "PA2r",
	"./cs.js": "PA2r",
	"./cv": "A+xa",
	"./cv.js": "A+xa",
	"./cy": "l5ep",
	"./cy.js": "l5ep",
	"./da": "DxQv",
	"./da.js": "DxQv",
	"./de": "tGlX",
	"./de-at": "s+uk",
	"./de-at.js": "s+uk",
	"./de-ch": "u3GI",
	"./de-ch.js": "u3GI",
	"./de.js": "tGlX",
	"./dv": "WYrj",
	"./dv.js": "WYrj",
	"./el": "jUeY",
	"./el.js": "jUeY",
	"./en-au": "Dmvi",
	"./en-au.js": "Dmvi",
	"./en-ca": "OIYi",
	"./en-ca.js": "OIYi",
	"./en-gb": "Oaa7",
	"./en-gb.js": "Oaa7",
	"./en-ie": "4dOw",
	"./en-ie.js": "4dOw",
	"./en-il": "czMo",
	"./en-il.js": "czMo",
	"./en-in": "7C5Q",
	"./en-in.js": "7C5Q",
	"./en-nz": "b1Dy",
	"./en-nz.js": "b1Dy",
	"./en-sg": "t+mt",
	"./en-sg.js": "t+mt",
	"./eo": "Zduo",
	"./eo.js": "Zduo",
	"./es": "iYuL",
	"./es-do": "CjzT",
	"./es-do.js": "CjzT",
	"./es-mx": "tbfe",
	"./es-mx.js": "tbfe",
	"./es-us": "Vclq",
	"./es-us.js": "Vclq",
	"./es.js": "iYuL",
	"./et": "7BjC",
	"./et.js": "7BjC",
	"./eu": "D/JM",
	"./eu.js": "D/JM",
	"./fa": "jfSC",
	"./fa.js": "jfSC",
	"./fi": "gekB",
	"./fi.js": "gekB",
	"./fil": "1ppg",
	"./fil.js": "1ppg",
	"./fo": "ByF4",
	"./fo.js": "ByF4",
	"./fr": "nyYc",
	"./fr-ca": "2fjn",
	"./fr-ca.js": "2fjn",
	"./fr-ch": "Dkky",
	"./fr-ch.js": "Dkky",
	"./fr.js": "nyYc",
	"./fy": "cRix",
	"./fy.js": "cRix",
	"./ga": "USCx",
	"./ga.js": "USCx",
	"./gd": "9rRi",
	"./gd.js": "9rRi",
	"./gl": "iEDd",
	"./gl.js": "iEDd",
	"./gom-deva": "qvJo",
	"./gom-deva.js": "qvJo",
	"./gom-latn": "DKr+",
	"./gom-latn.js": "DKr+",
	"./gu": "4MV3",
	"./gu.js": "4MV3",
	"./he": "x6pH",
	"./he.js": "x6pH",
	"./hi": "3E1r",
	"./hi.js": "3E1r",
	"./hr": "S6ln",
	"./hr.js": "S6ln",
	"./hu": "WxRl",
	"./hu.js": "WxRl",
	"./hy-am": "1rYy",
	"./hy-am.js": "1rYy",
	"./id": "UDhR",
	"./id.js": "UDhR",
	"./is": "BVg3",
	"./is.js": "BVg3",
	"./it": "bpih",
	"./it-ch": "bxKX",
	"./it-ch.js": "bxKX",
	"./it.js": "bpih",
	"./ja": "B55N",
	"./ja.js": "B55N",
	"./jv": "tUCv",
	"./jv.js": "tUCv",
	"./ka": "IBtZ",
	"./ka.js": "IBtZ",
	"./kk": "bXm7",
	"./kk.js": "bXm7",
	"./km": "6B0Y",
	"./km.js": "6B0Y",
	"./kn": "PpIw",
	"./kn.js": "PpIw",
	"./ko": "Ivi+",
	"./ko.js": "Ivi+",
	"./ku": "JCF/",
	"./ku.js": "JCF/",
	"./ky": "lgnt",
	"./ky.js": "lgnt",
	"./lb": "RAwQ",
	"./lb.js": "RAwQ",
	"./lo": "sp3z",
	"./lo.js": "sp3z",
	"./lt": "JvlW",
	"./lt.js": "JvlW",
	"./lv": "uXwI",
	"./lv.js": "uXwI",
	"./me": "KTz0",
	"./me.js": "KTz0",
	"./mi": "aIsn",
	"./mi.js": "aIsn",
	"./mk": "aQkU",
	"./mk.js": "aQkU",
	"./ml": "AvvY",
	"./ml.js": "AvvY",
	"./mn": "lYtQ",
	"./mn.js": "lYtQ",
	"./mr": "Ob0Z",
	"./mr.js": "Ob0Z",
	"./ms": "6+QB",
	"./ms-my": "ZAMP",
	"./ms-my.js": "ZAMP",
	"./ms.js": "6+QB",
	"./mt": "G0Uy",
	"./mt.js": "G0Uy",
	"./my": "honF",
	"./my.js": "honF",
	"./nb": "bOMt",
	"./nb.js": "bOMt",
	"./ne": "OjkT",
	"./ne.js": "OjkT",
	"./nl": "+s0g",
	"./nl-be": "2ykv",
	"./nl-be.js": "2ykv",
	"./nl.js": "+s0g",
	"./nn": "uEye",
	"./nn.js": "uEye",
	"./oc-lnc": "Fnuy",
	"./oc-lnc.js": "Fnuy",
	"./pa-in": "8/+R",
	"./pa-in.js": "8/+R",
	"./pl": "jVdC",
	"./pl.js": "jVdC",
	"./pt": "8mBD",
	"./pt-br": "0tRk",
	"./pt-br.js": "0tRk",
	"./pt.js": "8mBD",
	"./ro": "lyxo",
	"./ro.js": "lyxo",
	"./ru": "lXzo",
	"./ru.js": "lXzo",
	"./sd": "Z4QM",
	"./sd.js": "Z4QM",
	"./se": "//9w",
	"./se.js": "//9w",
	"./si": "7aV9",
	"./si.js": "7aV9",
	"./sk": "e+ae",
	"./sk.js": "e+ae",
	"./sl": "gVVK",
	"./sl.js": "gVVK",
	"./sq": "yPMs",
	"./sq.js": "yPMs",
	"./sr": "zx6S",
	"./sr-cyrl": "E+lV",
	"./sr-cyrl.js": "E+lV",
	"./sr.js": "zx6S",
	"./ss": "Ur1D",
	"./ss.js": "Ur1D",
	"./sv": "X709",
	"./sv.js": "X709",
	"./sw": "dNwA",
	"./sw.js": "dNwA",
	"./ta": "PeUW",
	"./ta.js": "PeUW",
	"./te": "XLvN",
	"./te.js": "XLvN",
	"./tet": "V2x9",
	"./tet.js": "V2x9",
	"./tg": "Oxv6",
	"./tg.js": "Oxv6",
	"./th": "EOgW",
	"./th.js": "EOgW",
	"./tk": "Wv91",
	"./tk.js": "Wv91",
	"./tl-ph": "Dzi0",
	"./tl-ph.js": "Dzi0",
	"./tlh": "z3Vd",
	"./tlh.js": "z3Vd",
	"./tr": "DoHr",
	"./tr.js": "DoHr",
	"./tzl": "z1FC",
	"./tzl.js": "z1FC",
	"./tzm": "wQk9",
	"./tzm-latn": "tT3J",
	"./tzm-latn.js": "tT3J",
	"./tzm.js": "wQk9",
	"./ug-cn": "YRex",
	"./ug-cn.js": "YRex",
	"./uk": "raLr",
	"./uk.js": "raLr",
	"./ur": "UpQW",
	"./ur.js": "UpQW",
	"./uz": "Loxo",
	"./uz-latn": "AQ68",
	"./uz-latn.js": "AQ68",
	"./uz.js": "Loxo",
	"./vi": "KSF8",
	"./vi.js": "KSF8",
	"./x-pseudo": "/X5v",
	"./x-pseudo.js": "/X5v",
	"./yo": "fzPg",
	"./yo.js": "fzPg",
	"./zh-cn": "XDpg",
	"./zh-cn.js": "XDpg",
	"./zh-hk": "SatO",
	"./zh-hk.js": "SatO",
	"./zh-mo": "OmwH",
	"./zh-mo.js": "OmwH",
	"./zh-tw": "kOpN",
	"./zh-tw.js": "kOpN"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "RnhZ";

/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_app_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./app.component.html */ "VzVu");
/* harmony import */ var _app_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.component.scss */ "ynWL");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _storage_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./storage.service */ "qkCY");
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./api.service */ "yTNM");
/* harmony import */ var _utilities_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utilities.service */ "oTnF");
/* harmony import */ var _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @cometchat-pro/cordova-ionic-chat */ "ujHh");
/* harmony import */ var _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _ionic_native_firebase_x_ngx__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic-native/firebase-x/ngx */ "E9qw");
/* harmony import */ var _networkdetect_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./networkdetect.service */ "UZ2B");
/* harmony import */ var _contants__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./contants */ "6qqZ");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_fire_database__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/fire/database */ "sSZD");
/* harmony import */ var _utilities_mixpanel_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./utilities/mixpanel.service */ "uKCw");
/* harmony import */ var _ionic_native_background_mode_ngx__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @ionic-native/background-mode/ngx */ "1xeP");
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @capacitor/core */ "gcOT");


















const { StatusBar, SplashScreen } = _capacitor_core__WEBPACK_IMPORTED_MODULE_17__["Plugins"];
let AppComponent = class AppComponent {
    constructor(platform, storageService, navController, 
    // private fcm: FCM,
    apiservice, utilitiesService, firebase, utilities, network, router, db, changeDetectorRef, mix, backgroundMode, alertController) {
        this.platform = platform;
        this.storageService = storageService;
        this.navController = navController;
        this.apiservice = apiservice;
        this.utilitiesService = utilitiesService;
        this.firebase = firebase;
        this.utilities = utilities;
        this.network = network;
        this.router = router;
        this.db = db;
        this.changeDetectorRef = changeDetectorRef;
        this.mix = mix;
        this.backgroundMode = backgroundMode;
        this.alertController = alertController;
        this.selectedIndex = 0;
        this.appPages = [
            {
                title: 'Home',
                url: '/homepage/design'
                //icon: 'home'
            },
            {
                title: 'Statistics',
                url: '/statistics'
                //icon: 'statistic'
            }
        ];
        this.ischatuserloggedin = false;
        this.onlineOffline = navigator.onLine;
        this.retryattempt = 2;
        //newprelimsRef:any;
        this.newprelimscounts = 0;
        //newpermitsRef:any;
        this.newpermitscounts = 0;
        this.newpestampscount = 0;
        this.initializeApp();
        if (!navigator.onLine) {
            // this.utilities.showSnackBar('No internet connection');
            //Do task when no internet connection
        }
        window.addEventListener('online', () => {
            //Do task when internet connection returns
        });
        window.addEventListener('offline', () => {
            //Do task when no internet connection
            setTimeout(() => {
                this.utilities.errorSnackBar('No internet connection');
            }, 2000);
        });
        //Counts in Sidemenu
        this.newprelimsRef = db.object('newprelimdesigns');
        this.newprelims = this.newprelimsRef.valueChanges();
        this.newprelims.subscribe((res) => {
            console.log(res);
            this.newprelimscounts = res.count;
            console.log(this.newprelimscounts);
            changeDetectorRef.detectChanges();
        }, (err) => console.log(err), () => console.log('done!'));
        this.newpermitsRef = db.object('newpermitdesigns');
        this.newpermits = this.newpermitsRef.valueChanges();
        this.newpermits.subscribe((res) => {
            this.newpermitscounts = res.count;
            changeDetectorRef.detectChanges();
        }, (err) => console.log(err), () => console.log('done!'));
        //For Pestamp Badges
        this.newpestampRef = db.object('newpestamp');
        this.newpestamp = this.newpestampRef.valueChanges();
        this.newpestamp.subscribe((res) => {
            this.newpestampscount = res.count;
            console.log(res.count);
            changeDetectorRef.detectChanges();
        }, (err) => console.log(err), () => console.log('done!'));
        // this.db.doc('/newprelimdesigns/1').valueChanges().subscribe((res:any)=>{
        //   this.newprelimscounts = res;
        //   console.log(this.newprelimscounts)
        // })
    }
    initializeApp() {
        this.platform.ready().then(() => {
            this.getFcmToken();
            this.handleBackbutton();
            this.getNotification();
            this.utilities.setupCometChat();
            this.mix.initializeMixPanel();
            this.backgroundMode.enable();
            SplashScreen.hide();
            StatusBar.setStyle({
                style: _capacitor_core__WEBPACK_IMPORTED_MODULE_17__["StatusBarStyle"].Dark
            });
            StatusBar.hide();
        });
    }
    isEmptyObject(obj) {
        return obj && Object.keys(obj).length === 0;
    }
    ngOnInit() {
        this.deactivateNetworkSwitch = this.network.networkSwitch.subscribe((data) => {
            this.netSwitch = data;
            console.log(this.netSwitch);
        });
        this.network.networkDisconnect();
        this.network.networkConnect();
        if (this.storageService.isUserPresent()) {
            this.apiservice.refreshHeader();
            this.user = JSON.parse(localStorage.getItem('user'));
            // console.log("???",this.user.role);
            console.log(this.user.role.type);
            if (this.user.role.type == 'surveyors') {
                this.navController.navigateRoot('surveyoroverview');
            }
            else if (this.user.role.type == 'designer') {
                this.navController.navigateRoot('permitdesignoverview');
            }
            else if (this.user.role.type === 'qcinspector') {
                console.log(this.user.role.type);
                this.navController.navigateRoot('analystoverview');
            }
            else if (this.user.role.type === 'clientsuperadmin' &&
                (this.user.isonboardingcompleted === null || this.user.isonboardingcompleted === false)) {
                this.navController.navigateRoot('onboarding');
            }
            else if (this.user.role.type === 'peengineer') {
                this.navController.navigateRoot('peengineer');
            }
            else {
                this.navController.navigateRoot('permithomepage');
            }
        }
        const path = window.location.pathname.split('/')[1];
        console.log(path);
        if (path !== undefined) {
            this.selectedIndex = this.appPages.findIndex((page) => page.title.toLowerCase() === path.toLowerCase());
        }
        this.deactivateGetUserData = this.apiservice.getUserName().subscribe((res) => {
            this.userData = res;
            debugger;
            if (res.role.name == 'ContractorSuperAdmin') {
                this.userData.role.name = 'SuperAdmin';
            }
            else if (res.role.name == 'WattmonkAdmin') {
                this.userData.role.name = 'Admin';
            }
        });
    }
    SwitchMenuAccordingtoRoles(type) {
        if (this.userData.role.type !== 'designer' && this.userData.role.type !== 'qcinspector' && type == 'prelim') {
            if (this.userData.role.type == 'wattmonkadmins' || this.userData.role.type == 'superadmin') {
                this.changeDetectorRef.detectChanges();
                this.newprelimsRef.update({ count: 0 });
            }
            this.router.navigate(['/homepage/design']);
        }
        else if (this.userData.role.type == 'designer' && type == 'prelim') {
            this.router.navigate(['/designoverview/newdesigns']);
        }
        else if (this.userData.role.type == 'qcinspector' && type == 'prelim') {
            this.router.navigate(['/analystoverview/design']);
        }
        else if (this.userData.role.type !== 'designer' &&
            this.userData.role.type !== 'qcinspector' &&
            type == 'permit') {
            if (this.userData.role.type == 'wattmonkadmins' || this.userData.role.type == 'superadmin') {
                this.changeDetectorRef.detectChanges();
                this.newpermitsRef.update({ count: 0 });
            }
            this.router.navigate(['/permithomepage/permitdesign']);
        }
        else if (this.userData.role.type == 'designer' && type == 'permit') {
            this.router.navigate(['/permitdesignoverview/permitnewdesign']);
        }
        else if (this.userData.role.type == 'qcinspector' && type == 'permit') {
            this.router.navigate(['/analystoverview/permitdesign']);
        }
        else if (this.userData.role.type !== 'designer' &&
            this.userData.role.type !== 'qcinspector' &&
            type == 'survey') {
            this.router.navigate(['/homepage/survey']);
        }
        else if (type == 'pestamp') {
            debugger;
            if (this.userData.role.type == 'peengineer') {
                this.router.navigate(['/peengineer']);
                //this.router.navigate(['/comingsoon']);
            }
            else {
                if (this.userData.role.type == 'wattmonkadmins' || this.userData.role.type == 'superadmin') {
                    this.changeDetectorRef.detectChanges();
                    this.newpestampRef.update({ count: 0 });
                }
                this.router.navigate(['/pestamp-homepage']);
                //this.router.navigate(['/comingsoon'])
            }
        }
        else if (this.userData.role.type == 'qcinspector' && type == 'survey') {
            this.router.navigate(['/analystoverview/survey']);
        }
        else if (this.userData.role.type !== 'clientsuperadmin' && type == 'statistics') {
            this.router.navigate(['/statistics']);
        }
        else if (this.userData.role.type !== 'designer' && this.userData.role.type !== 'qcinspector' && this.userData.role.type !== 'peengineer' && type == 'team') {
            this.router.navigate(['/teammodule']);
        }
    }
    getFcmToken() {
        this.firebase
            .getToken()
            .then((token) => {
            console.log(`The token is ${token}`);
            this.firebaseToken = token;
            localStorage.setItem('pushtoken', token);
        })
            .catch((error) => {
            //  console.error('Error getting token', error)
        });
    }
    updateApp() {
        setTimeout(() => {
            alert("hello");
        }, 2000);
    }
    getNotification() {
        this.firebase.onMessageReceived().subscribe((data) => {
            console.log(`User opened a notification ${data}`, data);
            this.apiservice.emitMessageReceived('pushNotification');
        });
    }
    setupCometChat() {
        const appSetting = new _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_8__["CometChat"].AppSettingsBuilder()
            .subscribePresenceForAllUsers()
            .setRegion(_contants__WEBPACK_IMPORTED_MODULE_11__["COMETCHAT_CONSTANTS"].REGION)
            .build();
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_12__["from"])(_cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_8__["CometChat"].init(_contants__WEBPACK_IMPORTED_MODULE_11__["COMETCHAT_CONSTANTS"].APP_ID, appSetting).then(() => {
            if (this.storageService.getUserID() !== '') {
                this.utilities.doCometUserLogin();
            }
            console.log('Initialization completed successfully');
            // if(this.utilities.currentUserValue != null){
            // You can now call login function.
            // }
        }, (error) => {
            console.log('Initialization failed with error:', error);
        }));
    }
    ngOndestroy() {
        this.deactivateGetUserData.unsubscribe();
        this.deactivateNetworkSwitch.unsubscribe();
    }
    handleBackbutton() {
        // this.platform.backButton.subscribeWithPriority(10, () => {
        //     console.log('Handler called to force close!');
        //     this.alertController.getTop().then(r => {
        //       if (r) {
        //         navigator['app'].exitApp();
        //       }
        //     }).catch(e => {
        //       console.log(e);
        //     })
        //   });
    }
};
AppComponent.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["Platform"] },
    { type: _storage_service__WEBPACK_IMPORTED_MODULE_5__["StorageService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["NavController"] },
    { type: _api_service__WEBPACK_IMPORTED_MODULE_6__["ApiService"] },
    { type: _utilities_service__WEBPACK_IMPORTED_MODULE_7__["UtilitiesService"] },
    { type: _ionic_native_firebase_x_ngx__WEBPACK_IMPORTED_MODULE_9__["FirebaseX"] },
    { type: _utilities_service__WEBPACK_IMPORTED_MODULE_7__["UtilitiesService"] },
    { type: _networkdetect_service__WEBPACK_IMPORTED_MODULE_10__["NetworkdetectService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_13__["Router"] },
    { type: _angular_fire_database__WEBPACK_IMPORTED_MODULE_14__["AngularFireDatabase"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ChangeDetectorRef"] },
    { type: _utilities_mixpanel_service__WEBPACK_IMPORTED_MODULE_15__["MixpanelService"] },
    { type: _ionic_native_background_mode_ngx__WEBPACK_IMPORTED_MODULE_16__["BackgroundMode"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["AlertController"] }
];
AppComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-root',
        template: _raw_loader_app_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_app_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], AppComponent);



/***/ }),

/***/ "UZ2B":
/*!******************************************!*\
  !*** ./src/app/networkdetect.service.ts ***!
  \******************************************/
/*! exports provided: NetworkdetectService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NetworkdetectService", function() { return NetworkdetectService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ionic_native_network_ngx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic-native/network/ngx */ "kwrG");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "qCKp");




let NetworkdetectService = class NetworkdetectService {
    constructor(network) {
        this.network = network;
        this.networkSwitch = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"](true);
    }
    networkDisconnect() {
        this.network.onDisconnect().subscribe(() => {
            console.log('network was disconnected :-(');
            this.networkSwitch.next(false);
            // netSwitch= this.networkSwitch;
        });
    }
    networkConnect() {
        let connectSubscription = this.network.onConnect().subscribe(() => {
            console.log('network connected!');
            this.networkSwitch.next(true);
            // netSwitch = this.networkSwitch;
            // We just got a connection but we need to wait briefly
            // before we determine the connection type. Might need to wait.
            // prior to doing any api requests as well.
            setTimeout(() => {
                if (this.network.type === 'wifi') {
                    console.log('we got a wifi connection, woohoo!');
                }
            }, 3000);
        });
    }
};
NetworkdetectService.ctorParameters = () => [
    { type: _ionic_native_network_ngx__WEBPACK_IMPORTED_MODULE_2__["Network"] }
];
NetworkdetectService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], NetworkdetectService);



/***/ }),

/***/ "VSZN":
/*!************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/utilities/user-selector/user-selector.component.html ***!
  \************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\r\n<div class=\"d-flex flex-column transparent-background margin\" style=\"overflow:scroll\">\r\n  <span class=\"input-placeholder\" style=\"margin-left: 8px; font-weight: bold;\">{{placeholder }}</span>\r\n  <span class=\"input-placeholder\" *ngIf=\"required\">*</span>\r\n  \r\n    <div>\r\n      <ion-searchbar class=\"searchbar-input-container.sc-ion-searchbar-md\" debounce=\"0\" placeholder=\"Search Here\" (ionChange)=\"filterUsers()\" [(ngModel)]=\"searchTerm\">\r\n    \r\n      </ion-searchbar>\r\n    </div>\r\n    <div scrollX=\"true\" style=\"margin-top: 4px;\">\r\n    <div class=\"d-flex flex-row\">\r\n      \r\n      <div *ngFor=\"let assignee of filteredAssignees\" class=\"assignee-margin \" (click)=\"selectAssignee(assignee)\">\r\n\r\n        <div class=\"preselected\" id=\"pre\" *ngIf=\"assignee.id==reviewAssigned?.id\"\r\n             [class.selected]=\"assignee.selected\" [class.normal]=\"!assignee.selected \" >\r\n             <ion-badge class=\"badge\" style=\"z-index:999\">{{assignee?.jobcount}}</ion-badge>\r\n          <img *ngIf=\"assignee.contractorlogo && assignee.contractorlogo.logo\" [src]=\"assignee.contractorlogo.logo.url\" class=\"assignee-image\"/>\r\n          <div *ngIf=\"!assignee.contractorlogo || !assignee.contractorlogo.logo\" class=\"assignee-image d-flex flex-row align-center justify-center\">\r\n            <div class=\"name_div\">\r\n            \r\n              <span style=\"text-transform: capitalize;\">{{assignee?.firstname?.substring(0, 1) | uppercase}}{{assignee?.lastname?.substring(0, 1) | uppercase}}</span>\r\n              </div>\r\n          </div>\r\n           </div>\r\n\r\n           <div class=\"selected d-flex\" *ngIf=\"assignee.id !=reviewAssigned?.id\"\r\n             [class.selected]=\"assignee.selected\" [class.normal]=\"!assignee.selected \" >\r\n             <ion-badge class=\"badge\" style=\"z-index:999\">{{assignee?.jobcount}}</ion-badge>\r\n          <img *ngIf=\"assignee.contractorlogo && assignee.contractorlogo.logo\" [src]=\"assignee.contractorlogo.logo.url\" class=\"assignee-image\"/>\r\n          <div *ngIf=\"!assignee.contractorlogo || !assignee.contractorlogo.logo\" class=\"assignee-image d-flex flex-row align-center justify-center\">\r\n            <div class=\"name_div\">\r\n            \r\n              <span style=\"text-transform: capitalize;\">{{assignee?.firstname?.substring(0, 1) | uppercase}}{{assignee?.lastname?.substring(0, 1) | uppercase}}</span>\r\n            </div>\r\n          </div>\r\n           </div>\r\n          <small style=\"font-size: 8px;\">{{assignee?.firstname=='Ankit' ? 'Wattmonk' : assignee?.firstname}} <br />{{assignee?.lastname==\"Sheoran\" ? '' : assignee?.lastname}}</small>\r\n         </div>\r\n        \r\n         </div>\r\n        </div>\r\n\r\n</div>\r\n\r\n");

/***/ }),

/***/ "VqpK":
/*!****************************************************!*\
  !*** ./src/app/utilities/date/date.component.scss ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".main-background {\n  margin-top: 8px;\n  background: #EFEFEF;\n  border-radius: 0.5em;\n  color: #656565;\n}\n\n.date-background {\n  width: 6em;\n  height: 2em;\n  border-radius: 0.5em;\n  color: black;\n}\n\n.year {\n  font-size: 1em;\n}\n\n.month {\n  font-size: 1em;\n}\n\n.day {\n  font-size: 1em;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFxkYXRlLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksZUFBQTtFQUNBLG1CQUFBO0VBQ0Esb0JBQUE7RUFDQSxjQUFBO0FBQ0o7O0FBRUU7RUFDRSxVQUFBO0VBQ0EsV0FBQTtFQUVBLG9CQUFBO0VBQ0EsWUFBQTtBQUFKOztBQUdFO0VBQ0ksY0FBQTtBQUFOOztBQUVFO0VBQ0UsY0FBQTtBQUNKOztBQUVFO0VBQ0UsY0FBQTtBQUNKIiwiZmlsZSI6ImRhdGUuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubWFpbi1iYWNrZ3JvdW5kIHtcclxuICAgIG1hcmdpbi10b3A6IDhweDtcclxuICAgIGJhY2tncm91bmQ6ICNFRkVGRUY7XHJcbiAgICBib3JkZXItcmFkaXVzOiAwLjVlbTtcclxuICAgIGNvbG9yOiAjNjU2NTY1O1xyXG4gIH1cclxuICBcclxuICAuZGF0ZS1iYWNrZ3JvdW5kIHtcclxuICAgIHdpZHRoOiA2ZW07XHJcbiAgICBoZWlnaHQ6IDJlbTtcclxuICAgIC8vYmFja2dyb3VuZDogIzNjNzhkODtcclxuICAgIGJvcmRlci1yYWRpdXM6IDAuNWVtO1xyXG4gICAgY29sb3I6IGJsYWNrO1xyXG4gIH1cclxuXHJcbiAgLnllYXJ7XHJcbiAgICAgIGZvbnQtc2l6ZTogMWVtO1xyXG4gIH1cclxuICAubW9udGgge1xyXG4gICAgZm9udC1zaXplOiAxZW07XHJcbiAgfVxyXG4gIFxyXG4gIC5kYXkge1xyXG4gICAgZm9udC1zaXplOiAxZW07XHJcbiAgICAvL2ZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gIH1cclxuICAiXX0= */");

/***/ }),

/***/ "VzVu":
/*!**************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-app>\r\n  <!-- <ion-router-outlet></ion-router-outlet>-->\r\n  <ion-split-pane contentId=\"main-content\">\r\n    <ion-menu contentId=\"main-content\" type=\"overlay\">\r\n      <ion-content>\r\n        <ion-menu-toggle>\r\n          <ion-header style=\"text-align: -webkit-center;\">\r\n            <ion-toolbar style=\"height: 130px;display: flex;justify-content: center;align-content: center;\"\r\n                         routerLink='/profile'>\r\n              <ion-card *ngIf=\"isEmptyObject(userData?.logo) || userData?.logo ==null\"\r\n                        style=\"height:50px;width:50px;display: flex;justify-content: center;align-items: center;\">{{userData?.firstname.slice(0, 1).toUpperCase() + userData?.lastname.slice(0, 1).toUpperCase()}}</ion-card>\r\n              <div *ngIf=\"!isEmptyObject(userData?.logo) && userData?.logo !==null\">\r\n                <img [src]=\"userData?.logo?.url\"\r\n                     style=\"height:50px;width:auto;display: flex;justify-content: center;align-items: center;\"/>\r\n              </div>\r\n              <ion-title><h4\r\n                style=\"text-align: center;font-weight: bold;margin: 1px;\">{{userData?.firstname.charAt(0).toUpperCase() + userData?.firstname.slice(1) + ' ' + userData?.lastname.charAt(0).toUpperCase() + userData?.lastname.slice(1)}}</h4>\r\n              </ion-title>\r\n              <small\r\n                style=\"text-align: center;\">{{userData?.role.name == 'Surveyors' ? 'Surveyor' : userData?.role.name}} </small>\r\n              <small style=\"text-align: center;\" *ngIf=\"userData?.role.type=='peengineer'\">({{userData?.peengineertype}}\r\n                ) </small>\r\n            </ion-toolbar>\r\n          </ion-header>\r\n        </ion-menu-toggle>\r\n            <!--  <ion-menu-toggle auto-hide=\"false\" *ngFor=\"let p of appPages; let i = index\">\r\n                  <ion-item (click)=\"selectedIndex = i\" routerDirection=\"root\" [routerLink]=\"[p.url]\" lines=\"none\"\r\n                            detail=\"false\" [class.selected]=\"selectedIndex == i\">\r\n                      <ion-icon slot=\"start\" [ios]=\"p.icon + '-outline'\" [md]=\"p.icon + '-sharp'\"></ion-icon>\r\n                      <ion-label>{{ p.title }}</ion-label>\r\n                  </ion-item>\r\n              </ion-menu-toggle>-->\r\n              <ion-list id=\"inbox-list\">\r\n              <ion-menu-toggle auto-hide=\"false\">\r\n                    <ion-item *ngIf=\"userData?.role.type !=='designer' && userData?.role.type !=='surveyors' && userData?.role.type !=='qcinspector' && userData?.role.type !== 'peengineer'\" [routerLink]=\"['/dashboard']\" routerDirection=\"forward\">\r\n                  <ion-img src=\"/assets/icon/dashboard.svg\" class=\"tab-icon\"></ion-img>&nbsp;&nbsp;Dashboard</ion-item>\r\n                <!-- <ion-item [routerLink]=\"['/onboarding']\" routerDirection=\"forward\">\r\n                  <ion-img src=\"/assets/images/dashboard.svg\" class=\"tab-icon\"></ion-img>&nbsp;&nbsp;Dashboard</ion-item> -->\r\n                    <ion-item  (click)=\"SwitchMenuAccordingtoRoles('prelim')\" *ngIf=\"userData?.role.type!=='surveyors'  && userData?.role.type!=='peengineer'\" routerDirection=\"forward\">\r\n                       <!-- <ion-img src=\"/assets/images/design.svg\" class=\"tab-icon\"></ion-img>&nbsp;&nbsp;Prelim</ion-item>  -->\r\n                      <ion-img src=\"/assets/icon/Prelim.svg\" class=\"tab-icon\"></ion-img>&nbsp;&nbsp;<p>Prelim\r\n                        <span class=\"matBadge\" *ngIf=\"(userData?.role.type=='wattmonkadmins' || userData?.role.type=='superadmin') && newprelimscounts > 0\">{{ newprelimscounts }}</span></p></ion-item>\r\n                     <ion-item  (click)=\"SwitchMenuAccordingtoRoles('permit')\" *ngIf=\"userData?.role.type!=='surveyors' && userData?.role.type!=='peengineer'\" routerDirection=\"forward\">\r\n                      <ion-img src=\"/assets/icon/Permit.svg\" class=\"tab-icon\"></ion-img>&nbsp;&nbsp;<p>Permit\r\n                        <span class=\"matBadge\" *ngIf=\"(userData?.role.type=='wattmonkadmins' || userData?.role.type=='superadmin') && newpermitscounts > 0\">{{ newpermitscounts }}</span></p>\r\n                      </ion-item>\r\n                     <ion-item *ngIf=\"userData?.role.type !=='designer' && userData?.role.type !=='surveyors' && userData?.role.type !=='peengineer' && userData?.role.type !=='qcinspector' \" (click)=\"SwitchMenuAccordingtoRoles('survey')\" routerDirection=\"forward\">\r\n                      <ion-img src=\"/assets/icon/Survey.svg\" class=\"tab-icon\"></ion-img>&nbsp;&nbsp;Survey</ion-item>\r\n                     <ion-item [routerLink]=\"['/groups']\" routerDirection=\"forward\">\r\n                      <ion-img src=\"/assets/icon/Inbox.svg\" class=\"tab-icon\"></ion-img>&nbsp;&nbsp;Inbox</ion-item>\r\n                      <!-- <ion-item  (click)=\"SwitchMenuAccordingtoRoles('statistics')\" *ngIf=\"userData?.role.type!='clientsuperadmin'\" routerDirection=\"forward\">\r\n                       <ion-img src=\"/assets/icon/Stats.svg\" class=\"tab-icon\"></ion-img>&nbsp;&nbsp;Statistics</ion-item> -->\r\n                       <ion-item  (click)=\"SwitchMenuAccordingtoRoles('pestamp')\" *ngIf=\"userData?.role.type!=='bd' && userData?.role.type !=='designer' && userData?.role.type !=='surveyors' && userData?.role.type !=='qcinspector'\" routerDirection=\"forward\">\r\n                        <ion-img src=\"/assets/icon/PEStamping.svg\" class=\"tab-icon\"></ion-img>&nbsp;&nbsp;<p>PE Stamps\r\n                        <span class=\"matBadge\" *ngIf=\"(userData?.role.type=='wattmonkadmins' || userData?.role.type=='superadmin') && newpestampscount > 0\">{{ newpestampscount }}</span></p>\r\n                      </ion-item>\r\n                      <ion-item  routerLink=\"/comingsoon\" *ngIf=\"userData?.role.type!=='bd' && userData?.role.type !=='designer' && userData?.role.type !=='surveyors' && userData?.role.type !=='qcinspector'\" routerDirection=\"forward\">\r\n                        <ion-img src=\"/assets/images/Team.svg\" class=\"tab-icon\"></ion-img>&nbsp;&nbsp;<p>Team\r\n                      </ion-item>\r\n                      <!-- <ion-item  (click)=\"SwitchMenuAccordingtoRoles('team')\" *ngIf=\"userData?.role.type!=='bd' && userData?.role.type !=='designer' && userData?.role.type !=='surveyors' && userData?.role.type !=='qcinspector'\" routerDirection=\"forward\">\r\n                        <ion-img src=\"/assets/images/Team.svg\" class=\"tab-icon\"></ion-img>&nbsp;&nbsp;<p>Team\r\n                      </ion-item> -->\r\n              </ion-menu-toggle>\r\n          </ion-list>\r\n      </ion-content>\r\n    </ion-menu>\r\n    <ion-router-outlet id=\"main-content\"></ion-router-outlet>\r\n  </ion-split-pane>\r\n\r\n  <!--\r\n  <ng-container *ngIf=\"userData.role.type === 'wattmonkadmins'\">\r\n    <ion-item routerDirection=\"forward\">\r\n      <ion-img src=\"/assets/images/permit.svg\" class=\"tab-icon\"></ion-img>&nbsp;&nbsp;<p>Permit\r\n        <span class=\"matBadge\" *ngIf=\"(userData?.role.type=='wattmonkadmins' || userData?.role.type=='superadmin') && newpermitscounts > 0\">{{ newpermitscounts }}</span></p>\r\n      </ion-item>\r\n  </ng-container> -->\r\n</ion-app>\r\n");

/***/ }),

/***/ "WqJC":
/*!**********************************************************************!*\
  !*** ./src/app/utilities/auto-complete/auto-complete.component.scss ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".popup-list {\n  height: 150px;\n  position: absolute;\n  z-index: 100;\n  overflow-y: scroll;\n  background: white;\n  border-radius: 4px;\n  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFxhdXRvLWNvbXBsZXRlLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsYUFBQTtFQUNBLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLDRFQUFBO0FBQ0YiLCJmaWxlIjoiYXV0by1jb21wbGV0ZS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5wb3B1cC1saXN0IHtcclxuICBoZWlnaHQ6IDE1MHB4O1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICB6LWluZGV4OiAxMDA7XHJcbiAgb3ZlcmZsb3cteTogc2Nyb2xsO1xyXG4gIGJhY2tncm91bmQ6IHdoaXRlO1xyXG4gIGJvcmRlci1yYWRpdXM6IDRweDtcclxuICBib3gtc2hhZG93OiAwIDRweCA4cHggMCByZ2JhKDAsIDAsIDAsIDAuMiksIDAgNnB4IDIwcHggMCByZ2JhKDAsIDAsIDAsIDAuMTkpO1xyXG59XHJcbiJdfQ== */");

/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _angular_fire__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/fire */ "spgP");
/* harmony import */ var _angular_fire_database__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/fire/database */ "sSZD");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/card */ "Wp6s");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/progress-bar */ "bv9b");
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/progress-spinner */ "Xa2L");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/platform-browser/animations */ "R1ws");
/* harmony import */ var _ionic_native_android_permissions_ngx__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @ionic-native/android-permissions/ngx */ "WOgW");
/* harmony import */ var _ionic_native_background_mode_ngx__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @ionic-native/background-mode/ngx */ "1xeP");
/* harmony import */ var _ionic_native_camera_ngx__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @ionic-native/camera/ngx */ "a/9d");
/* harmony import */ var _ionic_native_dialogs_ngx__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @ionic-native/dialogs/ngx */ "g7DU");
/* harmony import */ var _ionic_native_firebase_x_ngx__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @ionic-native/firebase-x/ngx */ "E9qw");
/* harmony import */ var _ionic_native_geolocation_ngx__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @ionic-native/geolocation/ngx */ "Bfh1");
/* harmony import */ var _ionic_native_in_app_browser_ngx__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @ionic-native/in-app-browser/ngx */ "m/P+");
/* harmony import */ var _ionic_native_mixpanel_ngx__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @ionic-native/mixpanel/ngx */ "wK57");
/* harmony import */ var _ionic_native_network_ngx__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @ionic-native/network/ngx */ "kwrG");
/* harmony import */ var _ionic_native_social_sharing_ngx__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @ionic-native/social-sharing/ngx */ "/XPu");
/* harmony import */ var _ionic_native_stripe_ngx__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @ionic-native/stripe/ngx */ "tF4M");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @ionic/storage */ "e8h1");
/* harmony import */ var ng2_charts__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ng2-charts */ "LPYB");
/* harmony import */ var ngx_image_compress__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ngx-image-compress */ "X9o6");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! src/environments/environment */ "AytR");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./app-routing.module */ "vY5A");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _auth_guard_service__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./auth-guard.service */ "5nbR");
/* harmony import */ var _storage_service__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./storage.service */ "qkCY");
/* harmony import */ var _utilities_success_modal_success_modal_component__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./utilities/success-modal/success-modal.component */ "Qry5");
/* harmony import */ var _utilities_utilities_module__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./utilities/utilities.module */ "egEE");
/* harmony import */ var _popover_component_popover_component_component__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./popover-component/popover-component.component */ "J2fO");





































let AppModule = class AppModule {
};
AppModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [_app_component__WEBPACK_IMPORTED_MODULE_31__["AppComponent"], _utilities_success_modal_success_modal_component__WEBPACK_IMPORTED_MODULE_34__["SuccessModalComponent"], _popover_component_popover_component_component__WEBPACK_IMPORTED_MODULE_36__["PopoverComponentComponent"]],
        entryComponents: [_utilities_success_modal_success_modal_component__WEBPACK_IMPORTED_MODULE_34__["SuccessModalComponent"], _popover_component_popover_component_component__WEBPACK_IMPORTED_MODULE_36__["PopoverComponentComponent"]],
        imports: [
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["BrowserModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"].forRoot(),
            _app_routing_module__WEBPACK_IMPORTED_MODULE_30__["AppRoutingModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HttpClientModule"],
            _utilities_utilities_module__WEBPACK_IMPORTED_MODULE_35__["UtilitiesModule"],
            _ionic_storage__WEBPACK_IMPORTED_MODULE_26__["IonicStorageModule"].forRoot(),
            ng2_charts__WEBPACK_IMPORTED_MODULE_27__["ChartsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_8__["FormsModule"],
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_14__["BrowserAnimationsModule"],
            _angular_material_card__WEBPACK_IMPORTED_MODULE_10__["MatCardModule"],
            _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_12__["MatProgressBarModule"],
            _angular_material_dialog__WEBPACK_IMPORTED_MODULE_11__["MatDialogModule"],
            _angular_material_button__WEBPACK_IMPORTED_MODULE_9__["MatButtonModule"],
            _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_13__["MatProgressSpinnerModule"],
            _angular_fire_database__WEBPACK_IMPORTED_MODULE_7__["AngularFireDatabaseModule"],
            _angular_fire__WEBPACK_IMPORTED_MODULE_6__["AngularFireModule"].initializeApp(src_environments_environment__WEBPACK_IMPORTED_MODULE_29__["environment"].firebase)
        ],
        providers: [
            // FCM,
            { provide: _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouteReuseStrategy"], useClass: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicRouteStrategy"] },
            _angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HttpClient"],
            _storage_service__WEBPACK_IMPORTED_MODULE_33__["StorageService"],
            _auth_guard_service__WEBPACK_IMPORTED_MODULE_32__["AuthGuardService"],
            _ionic_native_geolocation_ngx__WEBPACK_IMPORTED_MODULE_20__["Geolocation"],
            _ionic_native_firebase_x_ngx__WEBPACK_IMPORTED_MODULE_19__["FirebaseX"],
            ngx_image_compress__WEBPACK_IMPORTED_MODULE_28__["NgxImageCompressService"],
            _ionic_native_background_mode_ngx__WEBPACK_IMPORTED_MODULE_16__["BackgroundMode"],
            _ionic_native_camera_ngx__WEBPACK_IMPORTED_MODULE_17__["Camera"],
            _ionic_native_in_app_browser_ngx__WEBPACK_IMPORTED_MODULE_21__["InAppBrowser"],
            _ionic_native_network_ngx__WEBPACK_IMPORTED_MODULE_23__["Network"],
            _ionic_native_stripe_ngx__WEBPACK_IMPORTED_MODULE_25__["Stripe"],
            _ionic_native_social_sharing_ngx__WEBPACK_IMPORTED_MODULE_24__["SocialSharing"],
            _ionic_native_dialogs_ngx__WEBPACK_IMPORTED_MODULE_18__["Dialogs"],
            _ionic_native_android_permissions_ngx__WEBPACK_IMPORTED_MODULE_15__["AndroidPermissions"],
            _ionic_native_mixpanel_ngx__WEBPACK_IMPORTED_MODULE_22__["Mixpanel"],
            _ionic_native_mixpanel_ngx__WEBPACK_IMPORTED_MODULE_22__["MixpanelPeople"]
        ],
        exports: [
            _utilities_utilities_module__WEBPACK_IMPORTED_MODULE_35__["UtilitiesModule"]
        ],
        bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_31__["AppComponent"]]
    })
], AppModule);



/***/ }),

/***/ "bgR/":
/*!********************************************************************!*\
  !*** ./src/app/utilities/user-selector/user-selector.component.ts ***!
  \********************************************************************/
/*! exports provided: UserSelectorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserSelectorComponent", function() { return UserSelectorComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_user_selector_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./user-selector.component.html */ "VSZN");
/* harmony import */ var _user_selector_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./user-selector.component.scss */ "v3Vp");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var src_app_storage_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/storage.service */ "qkCY");
var UserSelectorComponent_1;






let UserSelectorComponent = UserSelectorComponent_1 = class UserSelectorComponent {
    // assignee: AssigneeModel;
    constructor(storage) {
        this.storage = storage;
        this.assignees = [];
        this.placeholder = 'Assign to';
        this.required = false;
        this.assigneeData = new _angular_core__WEBPACK_IMPORTED_MODULE_3__["EventEmitter"]();
        this.selectedUserId = null;
        this.searchTerm = '';
    }
    ngOnInit() {
        this.userId = this.storage.getUserID();
    }
    ngOnChanges() {
        this.filterUsers();
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
    }
    writeValue(assignee) {
        this.selectedUserId = assignee;
        this.assignees.forEach((item) => {
            item.selected = item.id === this.selectedUserId;
        });
    }
    validate(control) {
        if (this.required) {
            console.log(this.selectedUserId);
            if (this.selectedUserId !== null) {
                return null;
            }
            return {
                error: 'Assignee is required'
            };
        }
        console.log(this.reviewAssigned);
        return null;
    }
    selectAssignee(assignee) {
        console.log(this.userId);
        if (this.reviewAssigned != null && this.reviewAssigned.id != this.userId) {
            const element = document.getElementById('pre');
            element.className = 'afterselected';
        }
        console.log("this is", assignee);
        this.assigneeData.emit(assignee);
        this.assignees.forEach((item) => {
            item.selected = false;
        });
        if (assignee.id === this.selectedUserId) {
            this.selectedUserId = null;
            this.onChange(null);
        }
        else {
            assignee.selected = true;
            console.log(assignee);
            this.selectedUserId = assignee.id;
            this.onChange(assignee.id);
        }
    }
    selectSelf() {
    }
    filterUsers() {
        console.log('-------------------');
        console.log(this.searchTerm);
        this.filteredAssignees = this.assignees.filter(assignee => {
            return assignee.firstname.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1
                || assignee.lastname.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
        });
        console.log(this.filteredAssignees);
    }
};
UserSelectorComponent.ctorParameters = () => [
    { type: src_app_storage_service__WEBPACK_IMPORTED_MODULE_5__["StorageService"] }
];
UserSelectorComponent.propDecorators = {
    assignees: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
    placeholder: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
    required: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
    assigneeData: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Output"] }],
    reviewAssigned: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }]
};
UserSelectorComponent = UserSelectorComponent_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-user-selector',
        template: _raw_loader_user_selector_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        providers: [
            {
                provide: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NG_VALUE_ACCESSOR"],
                multi: true,
                useExisting: UserSelectorComponent_1
            },
            {
                provide: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NG_VALIDATORS"],
                multi: true,
                useExisting: UserSelectorComponent_1
            }
        ],
        styles: [_user_selector_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], UserSelectorComponent);



/***/ }),

/***/ "e0VG":
/*!********************************************************************!*\
  !*** ./src/app/popover-component/popover-component.component.scss ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".green {\n  color: green;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXHBvcG92ZXItY29tcG9uZW50LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksWUFBQTtBQUNKIiwiZmlsZSI6InBvcG92ZXItY29tcG9uZW50LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmdyZWVue1xyXG4gICAgY29sb3I6IGdyZWVuO1xyXG59Il19 */");

/***/ }),

/***/ "egEE":
/*!***********************************************!*\
  !*** ./src/app/utilities/utilities.module.ts ***!
  \***********************************************/
/*! exports provided: UtilitiesModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UtilitiesModule", function() { return UtilitiesModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _date_time_date_time_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./date-time/date-time.component */ "JJ/q");
/* harmony import */ var _user_selector_user_selector_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./user-selector/user-selector.component */ "bgR/");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _ionic_native_date_picker_ngx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic-native/date-picker/ngx */ "ya1t");
/* harmony import */ var _auto_complete_auto_complete_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./auto-complete/auto-complete.component */ "69gq");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _email_selector_email_selector_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./email-selector/email-selector.component */ "2d+1");
/* harmony import */ var _date_date_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./date/date.component */ "gmsq");
/* harmony import */ var _progress_bar_progress_bar_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./progress-bar/progress-bar.component */ "v7ha");












let UtilitiesModule = class UtilitiesModule {
};
UtilitiesModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [
            _date_time_date_time_component__WEBPACK_IMPORTED_MODULE_3__["DateTimeComponent"],
            _user_selector_user_selector_component__WEBPACK_IMPORTED_MODULE_4__["UserSelectorComponent"],
            _auto_complete_auto_complete_component__WEBPACK_IMPORTED_MODULE_7__["AutoCompleteComponent"],
            _email_selector_email_selector_component__WEBPACK_IMPORTED_MODULE_9__["EmailSelectorComponent"],
            _date_date_component__WEBPACK_IMPORTED_MODULE_10__["DateComponent"],
            _progress_bar_progress_bar_component__WEBPACK_IMPORTED_MODULE_11__["ProgressBarComponent"]
        ],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_8__["FormsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_8__["ReactiveFormsModule"]
        ],
        exports: [
            _date_time_date_time_component__WEBPACK_IMPORTED_MODULE_3__["DateTimeComponent"],
            _user_selector_user_selector_component__WEBPACK_IMPORTED_MODULE_4__["UserSelectorComponent"],
            _auto_complete_auto_complete_component__WEBPACK_IMPORTED_MODULE_7__["AutoCompleteComponent"],
            _email_selector_email_selector_component__WEBPACK_IMPORTED_MODULE_9__["EmailSelectorComponent"],
            _date_date_component__WEBPACK_IMPORTED_MODULE_10__["DateComponent"],
            _progress_bar_progress_bar_component__WEBPACK_IMPORTED_MODULE_11__["ProgressBarComponent"]
        ],
        providers: [
            _ionic_native_date_picker_ngx__WEBPACK_IMPORTED_MODULE_6__["DatePicker"]
        ]
    })
], UtilitiesModule);



/***/ }),

/***/ "fYoh":
/*!**************************************************************!*\
  !*** ./src/app/utilities/date-time/date-time.component.scss ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".main-background {\n  margin-top: 8px;\n  background: #EFEFEF;\n  border-radius: 0.5em;\n  color: #656565;\n}\n\n.date-background {\n  width: 4em;\n  height: 4em;\n  background: #3c78d8;\n  border-radius: 0.5em;\n  color: white;\n}\n\n.month {\n  font-size: 1em;\n}\n\n.day {\n  font-size: 1.5em;\n  font-weight: bold;\n}\n\n.time {\n  font-size: 1.5em;\n  font-weight: bold;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFxkYXRlLXRpbWUuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxlQUFBO0VBQ0EsbUJBQUE7RUFDQSxvQkFBQTtFQUNBLGNBQUE7QUFDRjs7QUFFQTtFQUNFLFVBQUE7RUFDQSxXQUFBO0VBQ0EsbUJBQUE7RUFDQSxvQkFBQTtFQUNBLFlBQUE7QUFDRjs7QUFFQTtFQUNFLGNBQUE7QUFDRjs7QUFFQTtFQUNFLGdCQUFBO0VBQ0EsaUJBQUE7QUFDRjs7QUFFQTtFQUNFLGdCQUFBO0VBQ0EsaUJBQUE7QUFDRiIsImZpbGUiOiJkYXRlLXRpbWUuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubWFpbi1iYWNrZ3JvdW5kIHtcclxuICBtYXJnaW4tdG9wOiA4cHg7XHJcbiAgYmFja2dyb3VuZDogI0VGRUZFRjtcclxuICBib3JkZXItcmFkaXVzOiAwLjVlbTtcclxuICBjb2xvcjogIzY1NjU2NTtcclxufVxyXG5cclxuLmRhdGUtYmFja2dyb3VuZCB7XHJcbiAgd2lkdGg6IDRlbTtcclxuICBoZWlnaHQ6IDRlbTtcclxuICBiYWNrZ3JvdW5kOiAjM2M3OGQ4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDAuNWVtO1xyXG4gIGNvbG9yOiB3aGl0ZTtcclxufVxyXG5cclxuLm1vbnRoIHtcclxuICBmb250LXNpemU6IDFlbTtcclxufVxyXG5cclxuLmRheSB7XHJcbiAgZm9udC1zaXplOiAxLjVlbTtcclxuICBmb250LXdlaWdodDogYm9sZDtcclxufVxyXG5cclxuLnRpbWUge1xyXG4gIGZvbnQtc2l6ZTogMS41ZW07XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbn1cclxuXHJcblxyXG4iXX0= */");

/***/ }),

/***/ "gmsq":
/*!**************************************************!*\
  !*** ./src/app/utilities/date/date.component.ts ***!
  \**************************************************/
/*! exports provided: DateComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DateComponent", function() { return DateComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_date_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./date.component.html */ "r06n");
/* harmony import */ var _date_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./date.component.scss */ "VqpK");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_native_date_picker_ngx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic-native/date-picker/ngx */ "ya1t");
var DateComponent_1;






let DateComponent = DateComponent_1 = class DateComponent {
    constructor(datePicker) {
        this.datePicker = datePicker;
        this.placeholder = '';
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
    }
    writeValue(date) {
        this.date = date;
    }
    validate(control) {
        if (this.date !== null && this.date !== undefined && this.date !== 0 && this.date > new Date().getTime()) {
            return null;
        }
        if (this.date > 0 && this.date < new Date().getTime()) {
            return null;
            // return {
            //   error: 'Date must be a future date'
            // };
        }
        return {
            error: 'Please choose a date'
        };
    }
    changeDate() {
        const currentDate = new Date(this.date);
        this.datePicker.show({
            date: new Date(this.date),
            //maxDate:new Date().getTime(),
            maxDate: new Date().getTime(),
            minDate: new Date(),
            mode: 'date',
            androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_LIGHT
        }).then(date => {
            this.date = date.getTime(); //date.getFullYear()+date.getMonth()+date.getDate()+date.getTime();//date.getFullYear()+date.getTime();
            this.onChange(date);
            this.newDate = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
        }, err => console.log('Error occurred while getting date: ', err));
    }
    ngOnInit() { }
};
DateComponent.ctorParameters = () => [
    { type: _ionic_native_date_picker_ngx__WEBPACK_IMPORTED_MODULE_5__["DatePicker"] }
];
DateComponent.propDecorators = {
    date: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
    placeholder: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }]
};
DateComponent = DateComponent_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-date',
        template: _raw_loader_date_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        providers: [
            {
                provide: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NG_VALUE_ACCESSOR"],
                multi: true,
                useExisting: DateComponent_1
            },
            {
                provide: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NG_VALIDATORS"],
                multi: true,
                useExisting: DateComponent_1
            }
        ],
        styles: [_date_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], DateComponent);



/***/ }),

/***/ "k6WE":
/*!********************************************************************!*\
  !*** ./src/app/utilities/progress-bar/progress-bar.component.scss ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwcm9ncmVzcy1iYXIuY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ "kLfG":
/*!*****************************************************************************************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm lazy ^\.\/.*\.entry\.js$ include: \.entry\.js$ exclude: \.system\.entry\.js$ namespace object ***!
  \*****************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./ion-action-sheet.entry.js": [
		"dUtr",
		"common",
		0
	],
	"./ion-alert.entry.js": [
		"Q8AI",
		"common",
		1
	],
	"./ion-app_8.entry.js": [
		"hgI1",
		"common",
		2
	],
	"./ion-avatar_3.entry.js": [
		"CfoV",
		"common",
		3
	],
	"./ion-back-button.entry.js": [
		"Nt02",
		"common",
		4
	],
	"./ion-backdrop.entry.js": [
		"Q2Bp",
		5
	],
	"./ion-button_2.entry.js": [
		"0Pbj",
		"common",
		6
	],
	"./ion-card_5.entry.js": [
		"ydQj",
		"common",
		7
	],
	"./ion-checkbox.entry.js": [
		"4fMi",
		"common",
		8
	],
	"./ion-chip.entry.js": [
		"czK9",
		"common",
		9
	],
	"./ion-col_3.entry.js": [
		"/CAe",
		10
	],
	"./ion-datetime_3.entry.js": [
		"WgF3",
		"common",
		11
	],
	"./ion-fab_3.entry.js": [
		"uQcF",
		"common",
		12
	],
	"./ion-img.entry.js": [
		"wHD8",
		13
	],
	"./ion-infinite-scroll_2.entry.js": [
		"2lz6",
		14
	],
	"./ion-input.entry.js": [
		"ercB",
		"common",
		15
	],
	"./ion-item-option_3.entry.js": [
		"MGMP",
		"common",
		16
	],
	"./ion-item_8.entry.js": [
		"9bur",
		"common",
		17
	],
	"./ion-loading.entry.js": [
		"cABk",
		"common",
		18
	],
	"./ion-menu_3.entry.js": [
		"kyFE",
		"common",
		19
	],
	"./ion-modal.entry.js": [
		"TvZU",
		"common",
		20
	],
	"./ion-nav_2.entry.js": [
		"vnES",
		"common",
		21
	],
	"./ion-popover.entry.js": [
		"qCuA",
		"common",
		22
	],
	"./ion-progress-bar.entry.js": [
		"0tOe",
		"common",
		23
	],
	"./ion-radio_2.entry.js": [
		"h11V",
		"common",
		24
	],
	"./ion-range.entry.js": [
		"XGij",
		"common",
		25
	],
	"./ion-refresher_2.entry.js": [
		"nYbb",
		"common",
		26
	],
	"./ion-reorder_2.entry.js": [
		"smMY",
		"common",
		27
	],
	"./ion-ripple-effect.entry.js": [
		"STjf",
		28
	],
	"./ion-route_4.entry.js": [
		"k5eQ",
		"common",
		29
	],
	"./ion-searchbar.entry.js": [
		"OR5t",
		"common",
		30
	],
	"./ion-segment_2.entry.js": [
		"fSgp",
		"common",
		31
	],
	"./ion-select_3.entry.js": [
		"lfGF",
		"common",
		32
	],
	"./ion-slide_2.entry.js": [
		"5xYT",
		33
	],
	"./ion-spinner.entry.js": [
		"nI0H",
		"common",
		34
	],
	"./ion-split-pane.entry.js": [
		"NAQR",
		35
	],
	"./ion-tab-bar_2.entry.js": [
		"knkW",
		"common",
		36
	],
	"./ion-tab_2.entry.js": [
		"TpdJ",
		"common",
		37
	],
	"./ion-text.entry.js": [
		"ISmu",
		"common",
		38
	],
	"./ion-textarea.entry.js": [
		"U7LX",
		"common",
		39
	],
	"./ion-toast.entry.js": [
		"L3sA",
		"common",
		40
	],
	"./ion-toggle.entry.js": [
		"IUOf",
		"common",
		41
	],
	"./ion-virtual-scroll.entry.js": [
		"8Mb5",
		42
	]
};
function webpackAsyncContext(req) {
	if(!__webpack_require__.o(map, req)) {
		return Promise.resolve().then(function() {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}

	var ids = map[req], id = ids[0];
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {
		return __webpack_require__(id);
	});
}
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = "kLfG";
module.exports = webpackAsyncContext;

/***/ }),

/***/ "oTnF":
/*!**************************************!*\
  !*** ./src/app/utilities.service.ts ***!
  \**************************************/
/*! exports provided: UtilitiesService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UtilitiesService", function() { return UtilitiesService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _utilities_success_modal_success_modal_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utilities/success-modal/success-modal.component */ "Qry5");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _model_constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./model/constants */ "Kp5Z");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! moment */ "wd/R");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _storage_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./storage.service */ "qkCY");
/* harmony import */ var _cometchat_pro_cordova_ionic_chat_CometChat__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @cometchat-pro/cordova-ionic-chat/CometChat */ "ujHh");
/* harmony import */ var _cometchat_pro_cordova_ionic_chat_CometChat__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_cometchat_pro_cordova_ionic_chat_CometChat__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _contants_prod__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./contants.prod */ "1oiu");
/* harmony import */ var _popover_component_popover_component_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./popover-component/popover-component.component */ "J2fO");













let UtilitiesService = class UtilitiesService {
    constructor(loadingController, toastController, alertController, modalController, storageService, router, navCtrl, location, popoverController) {
        this.loadingController = loadingController;
        this.toastController = toastController;
        this.alertController = alertController;
        this.modalController = modalController;
        this.storageService = storageService;
        this.router = router;
        this.navCtrl = navCtrl;
        this.location = location;
        this.popoverController = popoverController;
        this.myMethodSubject = new rxjs__WEBPACK_IMPORTED_MODULE_4__["Subject"]();
        this.isLoading = false;
        this.address = new rxjs__WEBPACK_IMPORTED_MODULE_4__["BehaviorSubject"]({
            address: '',
            lat: 0,
            long: 0,
            country: '',
            state: '',
            city: '',
            postalcode: ''
        });
        this.staticAddress = new rxjs__WEBPACK_IMPORTED_MODULE_4__["BehaviorSubject"]('');
        this.saveScheduleForm = new rxjs__WEBPACK_IMPORTED_MODULE_4__["BehaviorSubject"](_model_constants__WEBPACK_IMPORTED_MODULE_5__["ScheduleFormEvent"].NO_EVENT);
        this.homepageDesignRefresh = new rxjs__WEBPACK_IMPORTED_MODULE_4__["BehaviorSubject"](false);
        this.homepageSurveyRefresh = new rxjs__WEBPACK_IMPORTED_MODULE_4__["BehaviorSubject"](false);
        this.homepagePermitRefresh = new rxjs__WEBPACK_IMPORTED_MODULE_4__["BehaviorSubject"](false);
        this.surveyDetailsRefresh = new rxjs__WEBPACK_IMPORTED_MODULE_4__["BehaviorSubject"](false);
        this.designDetailsRefresh = new rxjs__WEBPACK_IMPORTED_MODULE_4__["BehaviorSubject"](false);
        this.peStampRefresh = new rxjs__WEBPACK_IMPORTED_MODULE_4__["BehaviorSubject"](false);
        this.permitdesignDetailsRefresh = new rxjs__WEBPACK_IMPORTED_MODULE_4__["BehaviorSubject"](false);
        //permitdesignDetailsRefresh = new BehaviorSubject<boolean>(false);
        this.showBottomBarHomepage = new rxjs__WEBPACK_IMPORTED_MODULE_4__["BehaviorSubject"](true);
        this.uploadfile = new rxjs__WEBPACK_IMPORTED_MODULE_4__["BehaviorSubject"]('');
        this.manualInput = new rxjs__WEBPACK_IMPORTED_MODULE_4__["BehaviorSubject"]('');
        this.paymentMode = new rxjs__WEBPACK_IMPORTED_MODULE_4__["BehaviorSubject"]('');
        this.couponid = new rxjs__WEBPACK_IMPORTED_MODULE_4__["BehaviorSubject"](null);
        this.dataRefresh = new rxjs__WEBPACK_IMPORTED_MODULE_4__["BehaviorSubject"](false);
        ////
        this.addUpper = true;
        this.addNumbers = true;
        this.addSymbols = false;
        this.passwordLength = 6;
        this.guid$ = this.myMethodSubject.asObservable();
        // this.listencall();
        this.user = this.storageService.getUser();
        this.currentUserSubject = new rxjs__WEBPACK_IMPORTED_MODULE_4__["BehaviorSubject"](this.user);
        this.currentUser = this.currentUserSubject.asObservable();
    }
    guid(data) {
        console.log(data); // I have data! Let's return it so subscribers can use it!
        // we can do stuff with data if we want
        this.groupid = data;
        this.myMethodSubject.next(data);
    }
    get currentUserValue() {
        return this.currentUserSubject.value;
    }
    getPaymentMode() {
        return this.paymentMode;
    }
    setPaymentMode(paymentMode) {
        this.paymentMode.next(paymentMode);
    }
    getCouponId() {
        return this.couponid;
    }
    setCouponId(couponId) {
        this.couponid.next(couponId);
    }
    getAddressObservable() {
        return this.address;
    }
    setAddress(address) {
        this.address.next(address);
    }
    getHomepageDesignRefresh() {
        return this.homepageDesignRefresh;
    }
    setHomepageDesignRefresh(refresh) {
        this.homepageDesignRefresh.next(refresh);
    }
    getHomepagePermitRefresh() {
        return this.homepagePermitRefresh;
    }
    setHomepagePermitRefresh(refresh) {
        this.homepagePermitRefresh.next(refresh);
    }
    getHomepageSurveyRefresh() {
        return this.homepageSurveyRefresh;
    }
    sethomepageSurveyRefresh(refresh) {
        this.homepageSurveyRefresh.next(refresh);
    }
    getPeStampRefresh() {
        return this.peStampRefresh;
    }
    setPeStampRefresh(refresh) {
        this.peStampRefresh.next(refresh);
    }
    getDataRefresh() {
        return this.dataRefresh;
    }
    setDataRefresh(refresh) {
        this.dataRefresh.next(refresh);
    }
    getSurveyDetailsRefresh() {
        return this.surveyDetailsRefresh;
    }
    setSurveyDetailsRefresh(refresh) {
        this.surveyDetailsRefresh.next(refresh);
    }
    getBottomBarHomepage() {
        return this.showBottomBarHomepage;
    }
    setBottomBarHomepage(value) {
        this.showBottomBarHomepage.next(value);
    }
    getDesignDetailsRefresh() {
        return this.designDetailsRefresh;
    }
    setDesignDetailsRefresh(value) {
        this.designDetailsRefresh.next(value);
    }
    getPermitDesignDetailsRefresh() {
        return this.permitdesignDetailsRefresh;
    }
    setPermitDesignDetailsRefresh(value) {
        this.permitdesignDetailsRefresh.next(value);
    }
    getdesignDetails() {
        return this.designlistofdesignDetail;
    }
    setDesignDetails(data) {
        this.designlistofdesignDetail = data;
    }
    // getPermitDesignDetailsRefresh(): BehaviorSubject<boolean> {
    //   return this.permitdesignDetailsRefresh;
    // }
    // setPermitDesignDetailsRefresh(value: boolean) {
    //   this.permitdesignDetailsRefresh.next(value);
    // }
    getScheduleFormEvent() {
        return this.saveScheduleForm;
    }
    setScheduleFormEvent(event) {
        this.saveScheduleForm.next(event);
        this.saveScheduleForm.next(_model_constants__WEBPACK_IMPORTED_MODULE_5__["ScheduleFormEvent"].NO_EVENT);
    }
    showLoading(message) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let finalMessage = '';
            if (message) {
                finalMessage = message;
            }
            else {
                finalMessage = 'Please Wait';
            }
            this.loading = yield this.loadingController.create({
                message: finalMessage
            });
            return yield this.loading.present();
        });
    }
    showLoadingWithPullRefreshSupport(showPopup, message) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (showPopup) {
                let finalMessage = '';
                if (message) {
                    finalMessage = message;
                }
                else {
                    finalMessage = 'Please Wait';
                }
                this.loading = yield this.loadingController.create({
                    message: finalMessage
                });
                return this.loading.present();
            }
            else {
                return Promise.resolve();
            }
        });
    }
    setLoadingMessage(message) {
        this.loading.message = message;
    }
    hideLoading() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            return yield this.loading.dismiss();
        });
    }
    hideLoadingWithPullRefreshSupport(showPopup) {
        if (showPopup) {
            return this.loading.dismiss();
        }
        else {
            return Promise.resolve(true);
        }
    }
    showAlert(message) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                header: 'Error',
                message,
                buttons: ['OK']
            });
            yield alert.present();
        });
    }
    showSuccessModal(successMessage) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const modal = yield this.modalController.create({
                component: _utilities_success_modal_success_modal_component__WEBPACK_IMPORTED_MODULE_3__["SuccessModalComponent"],
                cssClass: 'survey-modal-css',
                backdropDismiss: false,
                componentProps: {
                    message: successMessage
                }
            });
            return modal;
        });
    }
    capitalizeWord(word) {
        if (!word) {
            return word;
        }
        return word[0].toUpperCase() + word.substr(1).toLowerCase();
    }
    showSnackBar(message) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.hideLoading();
            const toast = yield this.toastController.create({
                message,
                duration: 2000,
                cssClass: 'my-custom-class'
            });
            yield toast.present();
        });
    }
    errorSnackBar(message) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.hideLoading();
            const toast = yield this.toastController.create({
                message,
                duration: 2000,
                cssClass: 'my-custom-error-class'
            });
            yield toast.present();
        });
    }
    uploadingSnackBar(message) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            //this.hideLoading();
            //const toast = await this.toastController.create({
            console.log("hii");
            this.toast = yield this.toastController.create({
                message,
                //duration: 2000,
                cssClass: 'my-custom-class'
            });
            yield this.toast.present();
        });
    }
    hideUploadingLoading() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            //that = this;
            console.log("hello");
            yield this.toast.dismiss();
        });
    }
    setStaticAddress(address) {
        this.staticAddress.next(address);
    }
    getStaticAddress() {
        return this.staticAddress;
    }
    getBlobFromImageData(dataURI) {
        // convert base64 to raw binary data held in a string
        const byteString = atob(dataURI.split(',')[1]);
        // separate out the mime component
        const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        // write the bytes of the string to an ArrayBuffer
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: mimeString });
    }
    getJobTypeName(type) {
        if (type == 'pvbattery') {
            return 'PV + Battery';
        }
        else if (type == 'battery') {
            return 'Battery';
        }
        else {
            return 'PV';
        }
    }
    getPestampTypeName(type) {
        if (type == 'structural') {
            return 'Structural';
        }
        else if (type == 'electrical') {
            return 'Electrical';
        }
        else {
            return 'Both';
        }
    }
    getRemainingTime(endtime) {
        var now = new Date();
        var t = Date.parse(endtime) - Date.parse(now.toString());
        var minutes = Math.floor((t / 1000 / 60) % 60);
        var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        if (hours > 0 || minutes > 0) {
            return '' + hours + 'h : ' + minutes + 'm';
        }
        else {
            return '0h : 0m';
        }
    }
    b64toBlob(b64Data) {
        let contentType = b64Data.split(',')[0].split(':')[1].split(';')[0] || '';
        var sliceSize = 256;
        var byteCharacters = atob(b64Data.split(',')[1]);
        var byteArrays = [];
        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);
            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            var byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        return new Blob(byteArrays, { type: contentType });
    }
    b64tBlob(b64Data) {
        let contentType = 'image/jpg';
        let sliceSize = 512;
        b64Data = b64Data.replace(/data\:image\/(jpeg|jpg|png)\;base64\,/gi, '');
        let byteCharacters = atob(b64Data);
        let byteArrays = [];
        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);
            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            var byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        return new Blob(byteArrays, { type: contentType });
    }
    showAlertBox(header, message, button) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                header: header,
                message: message,
                buttons: button,
                backdropDismiss: false
            });
            yield alert.present();
        });
    }
    presentPopover(ev) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            console.log(ev);
            this.popover = yield this.popoverController.create({
                component: _popover_component_popover_component_component__WEBPACK_IMPORTED_MODULE_12__["PopoverComponentComponent"],
                cssClass: 'my-custom',
                event: ev,
                translucent: true
            });
            return yield this.popover.present();
        });
    }
    dismissPopover() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.popover.dismiss();
        });
    }
    formatDateInTimeAgo(datestring) {
        return moment__WEBPACK_IMPORTED_MODULE_6__(datestring, 'YYYY-MM-DD HH:mm:ss GMT Z').fromNow();
    }
    isDatePassed(datestring) {
        var checkdate = moment__WEBPACK_IMPORTED_MODULE_6__(datestring, 'YYYYMMDD');
        var todaydate = moment__WEBPACK_IMPORTED_MODULE_6__(new Date(), 'YYYYMMDD');
        var lateby = todaydate.diff(checkdate, 'days');
        if (lateby > 0) {
            return true;
        }
        else {
            return false;
        }
    }
    getTheLatebyString(datestring) {
        var start = moment__WEBPACK_IMPORTED_MODULE_6__(datestring, 'YYYYMMDD');
        var end = moment__WEBPACK_IMPORTED_MODULE_6__(new Date(), 'YYYYMMDD');
        var lateby = end.diff(start, 'days');
        if (lateby == 0) {
            return 'few minutes';
        }
        else if (lateby == 1)
            return 'a day';
        else if (lateby < 30 && lateby > 0)
            return lateby + ' days';
        else if (lateby == 30)
            return 'a month';
        else if (lateby > 30 && lateby < 365)
            return lateby + ' months';
        else if (lateby == 365)
            return 'an year';
        else {
            return 'few minutes';
        }
    }
    getRoleNames(name) {
        if (this.user.role.name == 'ContractorSuperAdmin' || this.user.role.name == 'ContractorSuperAdmin') {
            name = 'SuperAdmin';
            return name;
        }
        else if (this.user.role.name == 'WattmonkAdmin') {
            name = 'Admin';
            return name;
        }
        else {
            return this.user.role.name;
        }
    }
    randomPass() {
        var lower = 'abcdefghijklmnopqrstuvwxyz';
        var upper = this.addUpper ? lower.toUpperCase() : '';
        var nums = this.addNumbers ? '0123456789' : '';
        var symbols = this.addSymbols ? "!#$%&'()*+,-./:;<=>?@[\\]^_`{|}~" : '';
        var all = lower + upper + nums + symbols;
        while (true) {
            var pass = '';
            for (var i = 0; i < this.passwordLength; i++) {
                pass += all[(Math.random() * all.length) | 0];
            }
            // criteria:
            if (!/[a-z]/.test(pass))
                continue; // lowercase is a must
            if (this.addUpper && !/[A-Z]/.test(pass))
                continue; // check uppercase
            if (this.addSymbols && !/\W/.test(pass))
                continue; // check symbols
            if (this.addNumbers && !/\d/.test(pass))
                continue; // check nums
            return pass; // all good
        }
    }
    // getNotificationCount(){
    //   this.apiService.getCountOfUnreadNotifications().subscribe( (count)=>{
    //     console.log("count",count);
    //     // this.unreadCount.next(count);
    //   });
    // this.unreadCount.subscribe(data=>{
    //   this.count = data;
    // })
    listencall() {
        var listnerID = this.groupid;
        const that = this;
        _cometchat_pro_cordova_ionic_chat_CometChat__WEBPACK_IMPORTED_MODULE_8__["CometChat"].addCallListener(listnerID, new _cometchat_pro_cordova_ionic_chat_CometChat__WEBPACK_IMPORTED_MODULE_8__["CometChat"].CallListener({
            onIncomingCallReceived(call) {
                console.log('Incoming call:', call);
                that.callData = call;
                // if(call.status=='initiated'){
                that.router.navigate(['/', 'callingscreen']);
                // }
                // Handle incoming call
            },
            onOutgoingCallAccepted(call) {
                console.log('Outgoing call accepted:', call);
                that.callData = call;
                // Outgoing Call Accepted
            },
            onOutgoingCallRejected(call) {
                console.log('Outgoing call rejected:', call);
                that.callData = call;
                // Outgoing Call Rejected
                that.navCtrl.pop();
            },
            onIncomingCallCancelled(call) {
                console.log('Incoming call calcelled:', call);
                that.callData = call;
                // that.location.back();
                that.navCtrl.pop();
            }
        }));
    }
    getCallData() {
        return this.callData;
    }
    static rejectCall(sessionId, rejectStatus) {
        let promise = new Promise((resolve, reject) => {
            _cometchat_pro_cordova_ionic_chat_CometChat__WEBPACK_IMPORTED_MODULE_8__["CometChat"].rejectCall(sessionId, rejectStatus).then((call) => resolve(call), (error) => reject(error));
        });
        return promise;
    }
    setupCometChat() {
        const appSetting = new _cometchat_pro_cordova_ionic_chat_CometChat__WEBPACK_IMPORTED_MODULE_8__["CometChat"].AppSettingsBuilder()
            .subscribePresenceForAllUsers()
            .setRegion(_contants_prod__WEBPACK_IMPORTED_MODULE_11__["COMETCHAT_CONSTANTS"].REGION)
            .build();
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["from"])(_cometchat_pro_cordova_ionic_chat_CometChat__WEBPACK_IMPORTED_MODULE_8__["CometChat"].init(_contants_prod__WEBPACK_IMPORTED_MODULE_11__["COMETCHAT_CONSTANTS"].APP_ID, appSetting).then(() => {
            if (this.storageService.getUserID() !== '') {
                this.doCometUserLogin();
            }
            console.log('Initialization completed successfully');
            // if(this.utilities.currentUserValue != null){
            // You can now call login function.
            // }
        }, (error) => {
            console.log('Initialization failed with error:', error);
        }));
    }
    doCometUserLogin() {
        let userId = this.storageService.getUserID();
        const user = new _cometchat_pro_cordova_ionic_chat_CometChat__WEBPACK_IMPORTED_MODULE_8__["CometChat"].User(userId);
        user.setName(this.storageService.getUser().firstname + ' ' + this.storageService.getUser().lastname);
        const appSetting = new _cometchat_pro_cordova_ionic_chat_CometChat__WEBPACK_IMPORTED_MODULE_8__["CometChat"].AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(_contants_prod__WEBPACK_IMPORTED_MODULE_11__["COMETCHAT_CONSTANTS"].REGION).build();
        _cometchat_pro_cordova_ionic_chat_CometChat__WEBPACK_IMPORTED_MODULE_8__["CometChat"].init(_contants_prod__WEBPACK_IMPORTED_MODULE_11__["COMETCHAT_CONSTANTS"].APP_ID, appSetting).then(() => {
            console.log('Initialization completed successfully');
            // if(this.utilities.currentUserValue != null){
            // You can now call login function.
            _cometchat_pro_cordova_ionic_chat_CometChat__WEBPACK_IMPORTED_MODULE_8__["CometChat"].login(userId, _contants_prod__WEBPACK_IMPORTED_MODULE_11__["COMETCHAT_CONSTANTS"].API_KEY).then((user) => {
                console.log('Login Successful:', { user });
            }, error => {
                console.log('Login failed with exception:', { error });
            });
            // }
        }, error => {
            console.log('Initialization failed with error:', error);
        });
    }
    formatTimeInDisplayFormat(datestring) {
        if (datestring != null) {
            var d = new Date(datestring);
            var offset = d.getTimezoneOffset();
            d.setMinutes(d.getMinutes() + offset);
            var formatted = new Intl.DateTimeFormat('en', {
                hour: 'numeric',
                minute: 'numeric'
            }).format(d);
            return formatted;
        }
        else {
            return "-";
        }
    }
    formatDateInDisplayFormat(datestring) {
        if (datestring != null) {
            const d = new Date(datestring);
            const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
            const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
            const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
            const today = new Date();
            if (d.setHours(0, 0, 0, 0) == today.setHours(0, 0, 0, 0)) {
                return "Today";
            }
            else {
                return (`${da} ${mo} ${ye}`);
            }
        }
        else {
            return "-";
        }
    }
    formatDate(date) {
        var d = new Date(date), hours = d.getHours(), mins = d.getMinutes(), seconds = d.getSeconds(), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();
        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;
        return [year, month, day].join('-') + ' ' + [(hours < 10 ? '0' : '') + hours, (mins < 10 ? '0' : '') + mins, (seconds < 10 ? '0' : '') + seconds].join(':');
    }
};
UtilitiesService.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ToastController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"] },
    { type: _storage_service__WEBPACK_IMPORTED_MODULE_7__["StorageService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_9__["Router"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["NavController"] },
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_10__["Location"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["PopoverController"] }
];
UtilitiesService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], UtilitiesService);

// getcount(){
//   return this.unreadCount.next(count);
// }


/***/ }),

/***/ "qkCY":
/*!************************************!*\
  !*** ./src/app/storage.service.ts ***!
  \************************************/
/*! exports provided: StorageService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StorageService", function() { return StorageService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");


let StorageService = class StorageService {
    constructor() {
    }
    isUserPresent() {
        return localStorage.getItem('user') !== null && localStorage.getItem('user') !== undefined;
    }
    setUser(user, jwt) {
        localStorage.setItem('user', JSON.stringify(user));
        this.setUserId(user.id);
        if (user.parent) {
            this.setParentId(user.parent.id);
        }
        this.setJWTToken(jwt);
        this.setLoggedInOnce();
    }
    getUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
    setDesgings(desgins) {
        localStorage.setItem('desgin', JSON.stringify(desgins));
    }
    getDesgins() {
        return JSON.parse(localStorage.getItem('desgin'));
    }
    setUserId(userId) {
        localStorage.setItem('userId', userId);
    }
    getUserID() {
        return localStorage.getItem('userId');
    }
    removeUser() {
        localStorage.removeItem('user');
    }
    setJWTToken(token) {
        localStorage.setItem('token', token);
        //console.log(token);
    }
    getJWTToken() {
        return localStorage.getItem('token');
    }
    isLocationAllowedOnIOS() {
        if (localStorage.getItem('ios_location_allowed') === null || localStorage.getItem('ios_location_allowed') === undefined) {
            return false;
        }
        else {
            return JSON.parse(localStorage.getItem('ios_location_allowed'));
        }
    }
    isLocationCheckedOnIOS() {
        if (localStorage.getItem('ios_location_checked') === null || localStorage.getItem('ios_location_checked') === undefined) {
            return false;
        }
        else {
            return JSON.parse(localStorage.getItem('ios_location_checked'));
        }
    }
    setLocationCheckedOnIOS(status) {
        localStorage.setItem('ios_location_checked', JSON.stringify(status));
    }
    setLocationAllowedOnIOS(status) {
        localStorage.setItem('ios_location_allowed', JSON.stringify(status));
    }
    setParentId(parentId) {
        localStorage.setItem('parentId', parentId);
    }
    getParentId() {
        return localStorage.getItem('parentId');
    }
    logout() {
        const username = this.getUserName();
        const password = this.getPassword();
        localStorage.clear();
        this.setLoggedInOnce();
        this.setUserName(username);
        this.setPassword(password);
    }
    setLoggedInOnce() {
        localStorage.setItem('loggedInOnce', 'yes');
    }
    isLoggedInOnce() {
        return localStorage.getItem('loggedInOnce') !== null && localStorage.getItem('loggedInOnce') !== undefined;
    }
    setUserName(username) {
        localStorage.setItem('username', username);
    }
    getUserName() {
        return this.checkKeyAndReturnValue('username');
    }
    setPassword(password) {
        localStorage.setItem('password', password);
    }
    getPassword() {
        return this.checkKeyAndReturnValue('password');
    }
    checkKeyAndReturnValue(key) {
        if (localStorage.getItem(key) === null || localStorage.getItem(key) === undefined) {
            return '';
        }
        else {
            return localStorage.getItem(key);
        }
    }
    setData(value) {
        this.data = value;
    }
    getData() {
        return this.data;
    }
    setPrelimCharges(value) {
        //this.prelimCharges = value;
        localStorage.setItem('prelimCharges', value);
    }
    getPrelimCharges() {
        //return this.prelimCharges;
        return localStorage.getItem('prelimCharges');
    }
    setPermitCharges(value) {
        //this.permitCharges = value;
        localStorage.setItem('permitCharges', value);
    }
    getPermitCharges() {
        //return this.permitCharges;
        return localStorage.getItem('permtCharges');
    }
};
StorageService.ctorParameters = () => [];
StorageService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], StorageService);



/***/ }),

/***/ "r06n":
/*!******************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/utilities/date/date.component.html ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"d-flex flex-column\">\r\n  <!--<span class=\"input-placeholder\">{{placeholder}}</span>-->\r\n  <!--<div class=\"main-background d-flex flex-row align-center justify-center\">-->\r\n    <div (click)=\"changeDate()\">\r\n    <!--  <span class=\"year\">{{date| date: 'yyyy'}}</span>\r\n      <span class=\"month\">{{date | date: 'MMM'}}</span>\r\n      <span class=\"day\">{{date | date: 'dd'}}</span>-->\r\n      <ion-input type=\"date\" [placeholder]=\"placeholder\" readonly>{{newDate}}</ion-input>\r\n      \r\n    </div>\r\n  </div>\r\n");

/***/ }),

/***/ "uKCw":
/*!***********************************************!*\
  !*** ./src/app/utilities/mixpanel.service.ts ***!
  \***********************************************/
/*! exports provided: MixpanelService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MixpanelService", function() { return MixpanelService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ionic_native_mixpanel_ngx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic-native/mixpanel/ngx */ "wK57");
/* harmony import */ var _contants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../contants */ "6qqZ");




let MixpanelService = class MixpanelService {
    constructor(mixpanel, mixpanelpeople) {
        this.mixpanel = mixpanel;
        this.mixpanelpeople = mixpanelpeople;
        this.usePeople = true;
    }
    initializeMixPanel() {
        this.mixpanel.init(_contants__WEBPACK_IMPORTED_MODULE_3__["Mixpanel_CONSTANTS"])
            .then((res) => { console.log('success', res); })
            .catch((res) => { console.log('failed', res); });
    }
    setUserDetails(email, name, userid) {
        var uid = userid.toString();
        this.mixpanel.identify(uid).then((res) => { console.log(res); }).catch((res) => { console.log(res); });
        this.mixpanelpeople.set({
            "$email": email,
            "$name": name,
            "USER_ID": userid,
        });
        console.log(email, name, userid);
    }
    /**
     * Push new action to mixpanel.
     *
     * @param {string} id Name of the action to track.
     * @param {*} [action={}] Actions object with custom properties.
     * @memberof MixpanelService
     */
    track(id, action = {}) {
        console.log(id, action);
        this.mixpanel.track(id, action).then((res) => { console.log(res); });
    }
};
MixpanelService.ctorParameters = () => [
    { type: _ionic_native_mixpanel_ngx__WEBPACK_IMPORTED_MODULE_2__["Mixpanel"] },
    { type: _ionic_native_mixpanel_ngx__WEBPACK_IMPORTED_MODULE_2__["MixpanelPeople"] }
];
MixpanelService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], MixpanelService);



/***/ }),

/***/ "v3Vp":
/*!**********************************************************************!*\
  !*** ./src/app/utilities/user-selector/user-selector.component.scss ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".transparent-background {\n  --background: transparent !important;\n  background: transparent !important;\n}\n\n.assignee-image {\n  width: 3.5em;\n  height: 3.5em;\n  border-radius: 50%;\n  object-fit: fill;\n  border: 2px solid white;\n  padding: 8px;\n  text-align: center;\n  background: #FFF1CF;\n}\n\n.assignee-margin {\n  margin: 4px;\n  text-align: center;\n}\n\n.selected {\n  border: 3px solid #3c78d8;\n  border-radius: 50%;\n}\n\n.normal {\n  border: 3px solid transparent;\n  border-radius: 50%;\n}\n\n.preselected {\n  display: flex;\n  border-color: #3c78d8;\n}\n\n.afterselected {\n  display: flex;\n}\n\ndiv[scrollx=true], div[scrolly=true] {\n  position: relative;\n  overflow: hidden;\n}\n\ndiv[scrollx=true] ::-webkit-scrollbar, div[scrolly=true] ::-webkit-scrollbar {\n  display: none;\n}\n\ndiv[scrollx=true] {\n  overflow-x: auto;\n}\n\ndiv[scrolly=true] {\n  overflow-y: auto;\n}\n\n.name_div {\n  font-size: 20px;\n}\n\n.badge {\n  position: absolute;\n  margin-left: 34px;\n  /* border-radius: 50%; */\n  padding-bottom: 1px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFx1c2VyLXNlbGVjdG9yLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0Usb0NBQUE7RUFDQSxrQ0FBQTtBQUNGOztBQUVBO0VBQ0UsWUFBQTtFQUNBLGFBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsdUJBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtBQUNGOztBQUVBO0VBQ0UsV0FBQTtFQUNBLGtCQUFBO0FBQ0Y7O0FBRUE7RUFDRSx5QkFBQTtFQUNBLGtCQUFBO0FBQ0Y7O0FBRUE7RUFDRSw2QkFBQTtFQUNBLGtCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxhQUFBO0VBQ0EscUJBQUE7QUFDRjs7QUFHQTtFQUNFLGFBQUE7QUFBRjs7QUFPQTtFQUNFLGtCQUFBO0VBQ0EsZ0JBQUE7QUFKRjs7QUFNRTtFQUNFLGFBQUE7QUFKSjs7QUFRQTtFQUNFLGdCQUFBO0FBTEY7O0FBUUE7RUFDRSxnQkFBQTtBQUxGOztBQVFBO0VBQ0UsZUFBQTtBQUxGOztBQU9BO0VBQ0Usa0JBQUE7RUFDQSxpQkFBQTtFQUNBLHdCQUFBO0VBQ0EsbUJBQUE7QUFKRiIsImZpbGUiOiJ1c2VyLXNlbGVjdG9yLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnRyYW5zcGFyZW50LWJhY2tncm91bmQge1xyXG4gIC0tYmFja2dyb3VuZDogdHJhbnNwYXJlbnQgIWltcG9ydGFudDtcclxuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudCAhaW1wb3J0YW50O1xyXG59XHJcblxyXG4uYXNzaWduZWUtaW1hZ2Uge1xyXG4gIHdpZHRoOiAzLjVlbTtcclxuICBoZWlnaHQ6IDMuNWVtO1xyXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICBvYmplY3QtZml0OiBmaWxsO1xyXG4gIGJvcmRlcjogMnB4IHNvbGlkIHdoaXRlO1xyXG4gIHBhZGRpbmc6IDhweDtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgYmFja2dyb3VuZDogI0ZGRjFDRjtcclxufVxyXG5cclxuLmFzc2lnbmVlLW1hcmdpbiB7XHJcbiAgbWFyZ2luOiA0cHg7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcblxyXG4uc2VsZWN0ZWQge1xyXG4gIGJvcmRlcjogM3B4IHNvbGlkICMzYzc4ZDg7XHJcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG59XHJcblxyXG4ubm9ybWFsIHtcclxuICBib3JkZXI6IDNweCBzb2xpZCB0cmFuc3BhcmVudDtcclxuICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbn1cclxuXHJcbi5wcmVzZWxlY3RlZHtcclxuICBkaXNwbGF5OmZsZXg7XHJcbiAgYm9yZGVyLWNvbG9yOiAgIzNjNzhkODtcclxuICBcclxufVxyXG5cclxuLmFmdGVyc2VsZWN0ZWR7XHJcbiAgZGlzcGxheTpmbGV4O1xyXG5cclxufVxyXG5cclxuXHJcblxyXG5cclxuZGl2W3Njcm9sbHg9dHJ1ZV0sIGRpdltzY3JvbGx5PXRydWVdIHtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuXHJcbiAgOjotd2Via2l0LXNjcm9sbGJhciB7XHJcbiAgICBkaXNwbGF5OiBub25lO1xyXG4gIH1cclxufVxyXG5cclxuZGl2W3Njcm9sbHg9dHJ1ZV0ge1xyXG4gIG92ZXJmbG93LXg6IGF1dG87XHJcbn1cclxuXHJcbmRpdltzY3JvbGx5PXRydWVdIHtcclxuICBvdmVyZmxvdy15OiBhdXRvO1xyXG59XHJcblxyXG4ubmFtZV9kaXYge1xyXG4gIGZvbnQtc2l6ZTogMjBweDtcclxufVxyXG4uYmFkZ2V7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIG1hcmdpbi1sZWZ0OiAzNHB4O1xyXG4gIC8qIGJvcmRlci1yYWRpdXM6IDUwJTsgKi9cclxuICBwYWRkaW5nLWJvdHRvbTogMXB4O1xyXG5cclxufVxyXG5cclxuLy8gLm1hcmdpbntcclxuLy8gICBtYXJnaW4tYm90dG9tOiA4MHB4OztcclxuLy8gfVxyXG5cclxuXHJcbiJdfQ== */");

/***/ }),

/***/ "v7ha":
/*!******************************************************************!*\
  !*** ./src/app/utilities/progress-bar/progress-bar.component.ts ***!
  \******************************************************************/
/*! exports provided: ProgressBarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProgressBarComponent", function() { return ProgressBarComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_progress_bar_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./progress-bar.component.html */ "HXA+");
/* harmony import */ var _progress_bar_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./progress-bar.component.scss */ "k6WE");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");




let ProgressBarComponent = class ProgressBarComponent {
    constructor() {
        this.value = 0.5;
    }
    ngOnInit() {
        this.buffer = this.value + 0.25;
        console.log(this.buffer);
    }
};
ProgressBarComponent.ctorParameters = () => [];
ProgressBarComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-progress-bar',
        template: _raw_loader_progress_bar_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_progress_bar_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], ProgressBarComponent);



/***/ }),

/***/ "vY5A":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _auth_guard_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./auth-guard.service */ "5nbR");




const routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {
        path: 'forgot-password',
        loadChildren: () => __webpack_require__.e(/*! import() | forgot-password-forgot-password-module */ "forgot-password-forgot-password-module").then(__webpack_require__.bind(null, /*! ./forgot-password/forgot-password.module */ "JgOp")).then(m => m.ForgotPasswordPageModule)
    },
    {
        path: 'login',
        loadChildren: () => Promise.all(/*! import() | login-login-module */[__webpack_require__.e("default~analystoverview-analystoverview-module~chat-chat-module~declinepage-declinepage-module~desig~8b909d05"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~bf251e5e"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~c7663126"), __webpack_require__.e("default~analystoverview-analystoverview-module~declinepage-declinepage-module~design-details-design-~964d4d61"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~8efce24e"), __webpack_require__.e("default~analystoverview-analystoverview-module~coupon-offers-modal-coupon-offers-modal-module~design~ffac05b6"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~9b796d06"), __webpack_require__.e("login-login-module")]).then(__webpack_require__.bind(null, /*! ./login/login.module */ "X3zk")).then(m => m.LoginPageModule)
    },
    {
        path: 'homepage',
        loadChildren: () => Promise.all(/*! import() | homepage-homepage-module */[__webpack_require__.e("default~analystoverview-analystoverview-module~chat-chat-module~declinepage-declinepage-module~desig~8b909d05"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~bf251e5e"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~c7663126"), __webpack_require__.e("default~analystoverview-analystoverview-module~declinepage-declinepage-module~design-details-design-~964d4d61"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~8efce24e"), __webpack_require__.e("default~analystoverview-analystoverview-module~coupon-offers-modal-coupon-offers-modal-module~design~ffac05b6"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~9b796d06"), __webpack_require__.e("default~analystoverview-analystoverview-module~designoverview-designoverview-module~homepage-homepag~d7159f3d"), __webpack_require__.e("default~analystoverview-analystoverview-module~designoverview-designoverview-module~homepage-homepag~78c51ad4"), __webpack_require__.e("default~designoverview-designoverview-module~homepage-homepage-module~onhold-onhold-module~peenginee~a4db8e48"), __webpack_require__.e("default~designoverview-designoverview-module~homepage-homepage-module~onhold-onhold-module~payment-m~b2fa51b1"), __webpack_require__.e("default~designoverview-designoverview-module~homepage-homepage-module~permitdesignoverview-permitdes~5d48a49b"), __webpack_require__.e("default~homepage-homepage-module~surveyoroverview-surveyoroverview-module"), __webpack_require__.e("homepage-homepage-module")]).then(__webpack_require__.bind(null, /*! ./homepage/homepage.module */ "myIj")).then(m => m.HomepagePageModule),
        canActivate: [_auth_guard_service__WEBPACK_IMPORTED_MODULE_3__["AuthGuardService"]]
    },
    {
        path: 'schedule',
        loadChildren: () => Promise.all(/*! import() | schedule-schedule-module */[__webpack_require__.e("default~analystoverview-analystoverview-module~chat-chat-module~declinepage-declinepage-module~desig~8b909d05"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~bf251e5e"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~c7663126"), __webpack_require__.e("default~analystoverview-analystoverview-module~declinepage-declinepage-module~design-details-design-~964d4d61"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~8efce24e"), __webpack_require__.e("default~analystoverview-analystoverview-module~coupon-offers-modal-coupon-offers-modal-module~design~ffac05b6"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~9b796d06"), __webpack_require__.e("default~analystoverview-analystoverview-module~designoverview-designoverview-module~homepage-homepag~d7159f3d"), __webpack_require__.e("default~onboarding-onboarding-module~permitschedule-permitschedule-module~sales-proposal-sales-propo~89cd319b"), __webpack_require__.e("schedule-schedule-module")]).then(__webpack_require__.bind(null, /*! ./schedule/schedule.module */ "L0xO")).then(m => m.SchedulePageModule),
        canActivate: [_auth_guard_service__WEBPACK_IMPORTED_MODULE_3__["AuthGuardService"]]
    },
    {
        path: 'profile',
        loadChildren: () => Promise.all(/*! import() | profile-profile-module */[__webpack_require__.e("default~analystoverview-analystoverview-module~chat-chat-module~declinepage-declinepage-module~desig~8b909d05"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~bf251e5e"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~c7663126"), __webpack_require__.e("default~analystoverview-analystoverview-module~declinepage-declinepage-module~design-details-design-~964d4d61"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~8efce24e"), __webpack_require__.e("default~analystoverview-analystoverview-module~coupon-offers-modal-coupon-offers-modal-module~design~ffac05b6"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~9b796d06"), __webpack_require__.e("default~add-money-add-money-module~payment-modal-payment-modal-module~paymentgateway-paymentgateway-~d58b2bb9"), __webpack_require__.e("common"), __webpack_require__.e("profile-profile-module")]).then(__webpack_require__.bind(null, /*! ./profile/profile.module */ "cRhG")).then(m => m.ProfilePageModule),
        canActivate: [_auth_guard_service__WEBPACK_IMPORTED_MODULE_3__["AuthGuardService"]]
    },
    {
        path: 'notification',
        loadChildren: () => __webpack_require__.e(/*! import() | notification-notification-module */ "notification-notification-module").then(__webpack_require__.bind(null, /*! ./notification/notification.module */ "TLzw")).then(m => m.NotificationPageModule),
        canActivate: [_auth_guard_service__WEBPACK_IMPORTED_MODULE_3__["AuthGuardService"]]
    },
    {
        path: 'map-page',
        loadChildren: () => Promise.all(/*! import() | map-page-map-page-module */[__webpack_require__.e("default~analystoverview-analystoverview-module~designoverview-designoverview-module~homepage-homepag~d7159f3d"), __webpack_require__.e("map-page-map-page-module")]).then(__webpack_require__.bind(null, /*! ./map-page/map-page.module */ "GUlE")).then(m => m.MapPagePageModule),
        canActivate: [_auth_guard_service__WEBPACK_IMPORTED_MODULE_3__["AuthGuardService"]]
    },
    {
        path: 'gallery/:id',
        loadChildren: () => Promise.all(/*! import() | gallery-gallery-module */[__webpack_require__.e("default~gallery-gallery-module~surveyprocess-surveyprocess-module"), __webpack_require__.e("gallery-gallery-module")]).then(__webpack_require__.bind(null, /*! ./gallery/gallery.module */ "3ros")).then(m => m.GalleryPageModule),
        canActivate: [_auth_guard_service__WEBPACK_IMPORTED_MODULE_3__["AuthGuardService"]]
    },
    {
        path: 'homepagedetail',
        loadChildren: () => __webpack_require__.e(/*! import() | homepagedetail-homepagedetail-module */ "homepagedetail-homepagedetail-module").then(__webpack_require__.bind(null, /*! ./homepagedetail/homepagedetail.module */ "v3vF")).then(m => m.HomepagedetailPageModule),
        canActivate: [_auth_guard_service__WEBPACK_IMPORTED_MODULE_3__["AuthGuardService"]]
    },
    {
        path: 'survey-detail/:id',
        loadChildren: () => Promise.all(/*! import() | survey-detail-survey-detail-module */[__webpack_require__.e("default~analystoverview-analystoverview-module~chat-chat-module~declinepage-declinepage-module~desig~8b909d05"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~bf251e5e"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~c7663126"), __webpack_require__.e("default~analystoverview-analystoverview-module~declinepage-declinepage-module~design-details-design-~964d4d61"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~8efce24e"), __webpack_require__.e("default~analystoverview-analystoverview-module~coupon-offers-modal-coupon-offers-modal-module~design~ffac05b6"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~9b796d06"), __webpack_require__.e("default~analystoverview-analystoverview-module~designoverview-designoverview-module~homepage-homepag~78c51ad4"), __webpack_require__.e("survey-detail-survey-detail-module")]).then(__webpack_require__.bind(null, /*! ./survey-detail/survey-detail.module */ "0/LW")).then(m => m.SurveyDetailPageModule),
        canActivate: [_auth_guard_service__WEBPACK_IMPORTED_MODULE_3__["AuthGuardService"]]
    },
    {
        path: 'design-details/:id',
        loadChildren: () => Promise.all(/*! import() | design-details-design-details-module */[__webpack_require__.e("default~analystoverview-analystoverview-module~chat-chat-module~declinepage-declinepage-module~desig~8b909d05"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~bf251e5e"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~c7663126"), __webpack_require__.e("default~analystoverview-analystoverview-module~declinepage-declinepage-module~design-details-design-~964d4d61"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~8efce24e"), __webpack_require__.e("default~analystoverview-analystoverview-module~coupon-offers-modal-coupon-offers-modal-module~design~ffac05b6"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~9b796d06"), __webpack_require__.e("default~design-details-design-details-module~permit-design-details-permit-design-details-module"), __webpack_require__.e("design-details-design-details-module")]).then(__webpack_require__.bind(null, /*! ./design-details/design-details.module */ "7X7n")).then(m => m.DesignDetailsPageModule),
        canActivate: [_auth_guard_service__WEBPACK_IMPORTED_MODULE_3__["AuthGuardService"]]
    },
    {
        path: 'activity/:id',
        loadChildren: () => __webpack_require__.e(/*! import() | activity-details-activity-details-module */ "activity-details-activity-details-module").then(__webpack_require__.bind(null, /*! ./activity-details/activity-details.module */ "FaAN")).then(m => m.ActivityDetailsPageModule),
        canActivate: [_auth_guard_service__WEBPACK_IMPORTED_MODULE_3__["AuthGuardService"]]
    },
    {
        path: 'message',
        loadChildren: () => __webpack_require__.e(/*! import() | message-message-module */ "message-message-module").then(__webpack_require__.bind(null, /*! ./message/message.module */ "3tpA")).then(m => m.MessagePageModule),
        canActivate: [_auth_guard_service__WEBPACK_IMPORTED_MODULE_3__["AuthGuardService"]]
    },
    {
        path: 'chat/:id',
        loadChildren: () => Promise.all(/*! import() | chat-chat-module */[__webpack_require__.e("default~analystoverview-analystoverview-module~chat-chat-module~declinepage-declinepage-module~desig~8b909d05"), __webpack_require__.e("chat-chat-module")]).then(__webpack_require__.bind(null, /*! ./chat/chat.module */ "2yxt")).then(m => m.ChatPageModule),
        canActivate: [_auth_guard_service__WEBPACK_IMPORTED_MODULE_3__["AuthGuardService"]]
    },
    {
        path: 'changepassword',
        loadChildren: () => __webpack_require__.e(/*! import() | change-password-change-password-module */ "change-password-change-password-module").then(__webpack_require__.bind(null, /*! ./change-password/change-password.module */ "8oFo")).then(m => m.ChangePasswordPageModule),
    },
    {
        path: 'surveyoroverview',
        loadChildren: () => Promise.all(/*! import() | surveyoroverview-surveyoroverview-module */[__webpack_require__.e("default~analystoverview-analystoverview-module~chat-chat-module~declinepage-declinepage-module~desig~8b909d05"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~bf251e5e"), __webpack_require__.e("default~analystoverview-analystoverview-module~designoverview-designoverview-module~homepage-homepag~d7159f3d"), __webpack_require__.e("default~analystoverview-analystoverview-module~designoverview-designoverview-module~homepage-homepag~78c51ad4"), __webpack_require__.e("default~designoverview-designoverview-module~homepage-homepage-module~onhold-onhold-module~peenginee~a4db8e48"), __webpack_require__.e("default~homepage-homepage-module~surveyoroverview-surveyoroverview-module"), __webpack_require__.e("common"), __webpack_require__.e("surveyoroverview-surveyoroverview-module")]).then(__webpack_require__.bind(null, /*! ./surveyoroverview/surveyoroverview.module */ "/dLQ")).then(m => m.SurveyoroverviewPageModule),
        canActivate: [_auth_guard_service__WEBPACK_IMPORTED_MODULE_3__["AuthGuardService"]]
    },
    {
        path: 'designoverview',
        loadChildren: () => Promise.all(/*! import() | designoverview-designoverview-module */[__webpack_require__.e("default~analystoverview-analystoverview-module~chat-chat-module~declinepage-declinepage-module~desig~8b909d05"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~bf251e5e"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~c7663126"), __webpack_require__.e("default~analystoverview-analystoverview-module~declinepage-declinepage-module~design-details-design-~964d4d61"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~8efce24e"), __webpack_require__.e("default~analystoverview-analystoverview-module~coupon-offers-modal-coupon-offers-modal-module~design~ffac05b6"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~9b796d06"), __webpack_require__.e("default~analystoverview-analystoverview-module~designoverview-designoverview-module~homepage-homepag~d7159f3d"), __webpack_require__.e("default~analystoverview-analystoverview-module~designoverview-designoverview-module~homepage-homepag~78c51ad4"), __webpack_require__.e("default~designoverview-designoverview-module~homepage-homepage-module~onhold-onhold-module~peenginee~a4db8e48"), __webpack_require__.e("default~designoverview-designoverview-module~homepage-homepage-module~onhold-onhold-module~payment-m~b2fa51b1"), __webpack_require__.e("default~designoverview-designoverview-module~homepage-homepage-module~permitdesignoverview-permitdes~5d48a49b"), __webpack_require__.e("designoverview-designoverview-module")]).then(__webpack_require__.bind(null, /*! ./designoverview/designoverview.module */ "cHfh")).then(m => m.DesignoverviewPageModule),
        canActivate: [_auth_guard_service__WEBPACK_IMPORTED_MODULE_3__["AuthGuardService"]]
    },
    {
        path: 'searchbar',
        loadChildren: () => Promise.all(/*! import() | searchbar-searchbar-module */[__webpack_require__.e("default~analystoverview-analystoverview-module~chat-chat-module~declinepage-declinepage-module~desig~8b909d05"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~bf251e5e"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~c7663126"), __webpack_require__.e("default~analystoverview-analystoverview-module~declinepage-declinepage-module~design-details-design-~964d4d61"), __webpack_require__.e("default~analystoverview-analystoverview-module~designoverview-designoverview-module~homepage-homepag~d7159f3d"), __webpack_require__.e("default~analystoverview-analystoverview-module~designoverview-designoverview-module~homepage-homepag~78c51ad4"), __webpack_require__.e("default~designoverview-designoverview-module~homepage-homepage-module~onhold-onhold-module~peenginee~a4db8e48"), __webpack_require__.e("default~designoverview-designoverview-module~homepage-homepage-module~onhold-onhold-module~payment-m~b2fa51b1"), __webpack_require__.e("default~designoverview-designoverview-module~homepage-homepage-module~permitdesignoverview-permitdes~5d48a49b"), __webpack_require__.e("searchbar-searchbar-module")]).then(__webpack_require__.bind(null, /*! ./searchbar/searchbar.module */ "rMjf")).then(m => m.SearchbarPageModule),
        canActivate: [_auth_guard_service__WEBPACK_IMPORTED_MODULE_3__["AuthGuardService"]]
    },
    {
        path: 'declinepage',
        loadChildren: () => Promise.all(/*! import() | declinepage-declinepage-module */[__webpack_require__.e("default~analystoverview-analystoverview-module~chat-chat-module~declinepage-declinepage-module~desig~8b909d05"), __webpack_require__.e("default~analystoverview-analystoverview-module~declinepage-declinepage-module~design-details-design-~964d4d61"), __webpack_require__.e("declinepage-declinepage-module")]).then(__webpack_require__.bind(null, /*! ./declinepage/declinepage.module */ "E8DV")).then(m => m.DeclinepagePageModule),
        canActivate: [_auth_guard_service__WEBPACK_IMPORTED_MODULE_3__["AuthGuardService"]]
    },
    {
        path: 'paymentgateway',
        loadChildren: () => Promise.all(/*! import() | paymentgateway-paymentgateway-module */[__webpack_require__.e("default~add-money-add-money-module~payment-modal-payment-modal-module~paymentgateway-paymentgateway-~d58b2bb9"), __webpack_require__.e("common")]).then(__webpack_require__.bind(null, /*! ./paymentgateway/paymentgateway.module */ "igVA")).then(m => m.PaymentgatewayPageModule),
        canActivate: [_auth_guard_service__WEBPACK_IMPORTED_MODULE_3__["AuthGuardService"]]
    },
    {
        path: 'activity/:id/:name',
        loadChildren: () => __webpack_require__.e(/*! import() | activity-details-activity-details-module */ "activity-details-activity-details-module").then(__webpack_require__.bind(null, /*! ./activity-details/activity-details.module */ "FaAN")).then(m => m.ActivityDetailsPageModule),
        canActivate: [_auth_guard_service__WEBPACK_IMPORTED_MODULE_3__["AuthGuardService"]]
    },
    {
        path: 'search-bar1',
        loadChildren: () => Promise.all(/*! import() | search-bar1-search-bar1-module */[__webpack_require__.e("default~analystoverview-analystoverview-module~chat-chat-module~declinepage-declinepage-module~desig~8b909d05"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~bf251e5e"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~c7663126"), __webpack_require__.e("default~analystoverview-analystoverview-module~declinepage-declinepage-module~design-details-design-~964d4d61"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~8efce24e"), __webpack_require__.e("default~analystoverview-analystoverview-module~coupon-offers-modal-coupon-offers-modal-module~design~ffac05b6"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~9b796d06"), __webpack_require__.e("default~analystoverview-analystoverview-module~designoverview-designoverview-module~homepage-homepag~d7159f3d"), __webpack_require__.e("default~analystoverview-analystoverview-module~designoverview-designoverview-module~homepage-homepag~78c51ad4"), __webpack_require__.e("search-bar1-search-bar1-module")]).then(__webpack_require__.bind(null, /*! ./search-bar1/search-bar1.module */ "YqUK")).then(m => m.SearchBar1PageModule),
        canActivate: [_auth_guard_service__WEBPACK_IMPORTED_MODULE_3__["AuthGuardService"]]
    }, {
        path: 'stripe',
        loadChildren: () => __webpack_require__.e(/*! import() | stripe-stripe-module */ "stripe-stripe-module").then(__webpack_require__.bind(null, /*! ./stripe/stripe.module */ "xF0s")).then(m => m.StripePageModule),
        canActivate: [_auth_guard_service__WEBPACK_IMPORTED_MODULE_3__["AuthGuardService"]]
    },
    {
        path: 'activity-details',
        loadChildren: () => __webpack_require__.e(/*! import() | activity-details-activity-details-module */ "activity-details-activity-details-module").then(__webpack_require__.bind(null, /*! ./activity-details/activity-details.module */ "FaAN")).then(m => m.ActivityDetailsPageModule),
        canActivate: [_auth_guard_service__WEBPACK_IMPORTED_MODULE_3__["AuthGuardService"]]
    },
    {
        path: 'analystoverview',
        loadChildren: () => Promise.all(/*! import() | analystoverview-analystoverview-module */[__webpack_require__.e("default~analystoverview-analystoverview-module~chat-chat-module~declinepage-declinepage-module~desig~8b909d05"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~bf251e5e"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~c7663126"), __webpack_require__.e("default~analystoverview-analystoverview-module~declinepage-declinepage-module~design-details-design-~964d4d61"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~8efce24e"), __webpack_require__.e("default~analystoverview-analystoverview-module~coupon-offers-modal-coupon-offers-modal-module~design~ffac05b6"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~9b796d06"), __webpack_require__.e("default~analystoverview-analystoverview-module~designoverview-designoverview-module~homepage-homepag~d7159f3d"), __webpack_require__.e("default~analystoverview-analystoverview-module~designoverview-designoverview-module~homepage-homepag~78c51ad4"), __webpack_require__.e("analystoverview-analystoverview-module")]).then(__webpack_require__.bind(null, /*! ./analystoverview/analystoverview.module */ "8Bcl")).then(m => m.AnalystoverviewPageModule),
        canActivate: [_auth_guard_service__WEBPACK_IMPORTED_MODULE_3__["AuthGuardService"]]
    },
    {
        path: 'add-money',
        loadChildren: () => Promise.all(/*! import() | add-money-add-money-module */[__webpack_require__.e("default~add-money-add-money-module~payment-modal-payment-modal-module~paymentgateway-paymentgateway-~d58b2bb9"), __webpack_require__.e("add-money-add-money-module")]).then(__webpack_require__.bind(null, /*! ./add-money/add-money.module */ "xUdR")).then(m => m.AddMoneyPageModule),
        canActivate: [_auth_guard_service__WEBPACK_IMPORTED_MODULE_3__["AuthGuardService"]]
    },
    {
        path: 'email-model',
        loadChildren: () => __webpack_require__.e(/*! import() | email-model-email-model-module */ "email-model-email-model-module").then(__webpack_require__.bind(null, /*! ./email-model/email-model.module */ "zdJr")).then(m => m.EmailModelPageModule),
        canActivate: [_auth_guard_service__WEBPACK_IMPORTED_MODULE_3__["AuthGuardService"]]
    },
    {
        path: 'resendpagedialog',
        loadChildren: () => Promise.all(/*! import() | resendpagedialog-resendpagedialog-module */[__webpack_require__.e("default~analystoverview-analystoverview-module~chat-chat-module~declinepage-declinepage-module~desig~8b909d05"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~c7663126"), __webpack_require__.e("resendpagedialog-resendpagedialog-module")]).then(__webpack_require__.bind(null, /*! ./resendpagedialog/resendpagedialog.module */ "kSEO")).then(m => m.ResendpagedialogPageModule),
        canActivate: [_auth_guard_service__WEBPACK_IMPORTED_MODULE_3__["AuthGuardService"]]
    },
    {
        path: 'chat-tabs',
        loadChildren: () => __webpack_require__.e(/*! import() | chat-tabs-chat-tabs-module */ "chat-tabs-chat-tabs-module").then(__webpack_require__.bind(null, /*! ./chat-tabs/chat-tabs.module */ "Dh0M")).then(m => m.ChatTabsPageModule),
        canActivate: [_auth_guard_service__WEBPACK_IMPORTED_MODULE_3__["AuthGuardService"]]
    },
    {
        path: 'groupchat',
        loadChildren: () => __webpack_require__.e(/*! import() | groupchat-groupchat-module */ "groupchat-groupchat-module").then(__webpack_require__.bind(null, /*! ./groupchat/groupchat.module */ "O8l0")).then(m => m.GroupchatPageModule),
        canActivate: [_auth_guard_service__WEBPACK_IMPORTED_MODULE_3__["AuthGuardService"]]
    },
    {
        path: 'groups',
        loadChildren: () => __webpack_require__.e(/*! import() | chat-tabs-groups-groups-module */ "groups-groups-module").then(__webpack_require__.bind(null, /*! ./chat-tabs/groups/groups.module */ "B0my")).then(m => m.GroupsPageModule),
        canActivate: [_auth_guard_service__WEBPACK_IMPORTED_MODULE_3__["AuthGuardService"]]
    },
    {
        path: 'payment-modal',
        loadChildren: () => Promise.all(/*! import() | payment-modal-payment-modal-module */[__webpack_require__.e("default~analystoverview-analystoverview-module~chat-chat-module~declinepage-declinepage-module~desig~8b909d05"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~bf251e5e"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~c7663126"), __webpack_require__.e("default~analystoverview-analystoverview-module~declinepage-declinepage-module~design-details-design-~964d4d61"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~8efce24e"), __webpack_require__.e("default~analystoverview-analystoverview-module~coupon-offers-modal-coupon-offers-modal-module~design~ffac05b6"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~9b796d06"), __webpack_require__.e("default~designoverview-designoverview-module~homepage-homepage-module~onhold-onhold-module~payment-m~b2fa51b1"), __webpack_require__.e("default~add-money-add-money-module~payment-modal-payment-modal-module~paymentgateway-paymentgateway-~d58b2bb9"), __webpack_require__.e("payment-modal-payment-modal-module")]).then(__webpack_require__.bind(null, /*! ./payment-modal/payment-modal.module */ "CRmG")).then(m => m.PaymentModalPageModule),
        canActivate: [_auth_guard_service__WEBPACK_IMPORTED_MODULE_3__["AuthGuardService"]]
    },
    {
        path: 'statistics',
        loadChildren: () => Promise.all(/*! import() | statistics-statistics-module */[__webpack_require__.e("default~analystoverview-analystoverview-module~chat-chat-module~declinepage-declinepage-module~desig~8b909d05"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~bf251e5e"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~c7663126"), __webpack_require__.e("default~analystoverview-analystoverview-module~declinepage-declinepage-module~design-details-design-~964d4d61"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~8efce24e"), __webpack_require__.e("default~analystoverview-analystoverview-module~coupon-offers-modal-coupon-offers-modal-module~design~ffac05b6"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~9b796d06"), __webpack_require__.e("statistics-statistics-module")]).then(__webpack_require__.bind(null, /*! ./statistics/statistics.module */ "9i+i")).then(m => m.StatisticsPageModule),
        canActivate: [_auth_guard_service__WEBPACK_IMPORTED_MODULE_3__["AuthGuardService"]]
    },
    {
        path: 'statistics-details',
        loadChildren: () => __webpack_require__.e(/*! import() | statistics-details-statistics-details-module */ "statistics-details-statistics-details-module").then(__webpack_require__.bind(null, /*! ./statistics-details/statistics-details.module */ "sjvO")).then(m => m.StatisticsDetailsPageModule),
        canActivate: [_auth_guard_service__WEBPACK_IMPORTED_MODULE_3__["AuthGuardService"]]
    },
    {
        path: 'permit-design-details/:id',
        loadChildren: () => Promise.all(/*! import() | permit-design-details-permit-design-details-module */[__webpack_require__.e("default~analystoverview-analystoverview-module~chat-chat-module~declinepage-declinepage-module~desig~8b909d05"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~bf251e5e"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~c7663126"), __webpack_require__.e("default~analystoverview-analystoverview-module~declinepage-declinepage-module~design-details-design-~964d4d61"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~8efce24e"), __webpack_require__.e("default~analystoverview-analystoverview-module~coupon-offers-modal-coupon-offers-modal-module~design~ffac05b6"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~9b796d06"), __webpack_require__.e("default~design-details-design-details-module~permit-design-details-permit-design-details-module"), __webpack_require__.e("permit-design-details-permit-design-details-module")]).then(__webpack_require__.bind(null, /*! ./permit-design-details/permit-design-details.module */ "/hsT")).then(m => m.PermitDesignDetailsPageModule),
        canActivate: [_auth_guard_service__WEBPACK_IMPORTED_MODULE_3__["AuthGuardService"]]
    },
    {
        path: 'permitschedule',
        loadChildren: () => Promise.all(/*! import() | permitschedule-permitschedule-module */[__webpack_require__.e("default~analystoverview-analystoverview-module~designoverview-designoverview-module~homepage-homepag~d7159f3d"), __webpack_require__.e("default~onboarding-onboarding-module~permitschedule-permitschedule-module~sales-proposal-sales-propo~89cd319b"), __webpack_require__.e("default~onboarding-onboarding-module~permitschedule-permitschedule-module~sales-proposal-sales-propo~3f3ec2ec"), __webpack_require__.e("permitschedule-permitschedule-module")]).then(__webpack_require__.bind(null, /*! ./permitschedule/permitschedule.module */ "7AUb")).then(m => m.PermitschedulePageModule),
        canActivate: [_auth_guard_service__WEBPACK_IMPORTED_MODULE_3__["AuthGuardService"]]
    },
    {
        path: 'permitschedule/:id',
        loadChildren: () => Promise.all(/*! import() | permitschedule-permitschedule-module */[__webpack_require__.e("default~analystoverview-analystoverview-module~designoverview-designoverview-module~homepage-homepag~d7159f3d"), __webpack_require__.e("default~onboarding-onboarding-module~permitschedule-permitschedule-module~sales-proposal-sales-propo~89cd319b"), __webpack_require__.e("default~onboarding-onboarding-module~permitschedule-permitschedule-module~sales-proposal-sales-propo~3f3ec2ec"), __webpack_require__.e("permitschedule-permitschedule-module")]).then(__webpack_require__.bind(null, /*! ./permitschedule/permitschedule.module */ "7AUb")).then(m => m.PermitschedulePageModule),
        canActivate: [_auth_guard_service__WEBPACK_IMPORTED_MODULE_3__["AuthGuardService"]]
    },
    {
        path: 'permithomepage',
        loadChildren: () => Promise.all(/*! import() | permithomepage-permithomepage-module */[__webpack_require__.e("default~analystoverview-analystoverview-module~chat-chat-module~declinepage-declinepage-module~desig~8b909d05"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~bf251e5e"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~c7663126"), __webpack_require__.e("default~analystoverview-analystoverview-module~declinepage-declinepage-module~design-details-design-~964d4d61"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~8efce24e"), __webpack_require__.e("default~analystoverview-analystoverview-module~coupon-offers-modal-coupon-offers-modal-module~design~ffac05b6"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~9b796d06"), __webpack_require__.e("default~analystoverview-analystoverview-module~designoverview-designoverview-module~homepage-homepag~d7159f3d"), __webpack_require__.e("default~analystoverview-analystoverview-module~designoverview-designoverview-module~homepage-homepag~78c51ad4"), __webpack_require__.e("default~designoverview-designoverview-module~homepage-homepage-module~onhold-onhold-module~peenginee~a4db8e48"), __webpack_require__.e("common"), __webpack_require__.e("permithomepage-permithomepage-module")]).then(__webpack_require__.bind(null, /*! ./permithomepage/permithomepage.module */ "80wK")).then(m => m.PermithomepagePageModule),
        canActivate: [_auth_guard_service__WEBPACK_IMPORTED_MODULE_3__["AuthGuardService"]]
    },
    {
        path: 'permitdesignoverview',
        loadChildren: () => Promise.all(/*! import() | permitdesignoverview-permitdesignoverview-module */[__webpack_require__.e("default~analystoverview-analystoverview-module~chat-chat-module~declinepage-declinepage-module~desig~8b909d05"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~bf251e5e"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~c7663126"), __webpack_require__.e("default~analystoverview-analystoverview-module~declinepage-declinepage-module~design-details-design-~964d4d61"), __webpack_require__.e("default~analystoverview-analystoverview-module~designoverview-designoverview-module~homepage-homepag~d7159f3d"), __webpack_require__.e("default~analystoverview-analystoverview-module~designoverview-designoverview-module~homepage-homepag~78c51ad4"), __webpack_require__.e("default~designoverview-designoverview-module~homepage-homepage-module~onhold-onhold-module~peenginee~a4db8e48"), __webpack_require__.e("default~designoverview-designoverview-module~homepage-homepage-module~onhold-onhold-module~payment-m~b2fa51b1"), __webpack_require__.e("default~designoverview-designoverview-module~homepage-homepage-module~permitdesignoverview-permitdes~5d48a49b"), __webpack_require__.e("common"), __webpack_require__.e("permitdesignoverview-permitdesignoverview-module")]).then(__webpack_require__.bind(null, /*! ./permitdesignoverview/permitdesignoverview.module */ "G593")).then(m => m.PermitdesignoverviewPageModule),
        canActivate: [_auth_guard_service__WEBPACK_IMPORTED_MODULE_3__["AuthGuardService"]]
    },
    {
        path: 'statsoverviewdetails',
        loadChildren: () => __webpack_require__.e(/*! import() | statsoverviewdetails-statsoverviewdetails-module */ "statsoverviewdetails-statsoverviewdetails-module").then(__webpack_require__.bind(null, /*! ./statsoverviewdetails/statsoverviewdetails.module */ "CY9Z")).then(m => m.StatsoverviewdetailsPageModule),
        canActivate: [_auth_guard_service__WEBPACK_IMPORTED_MODULE_3__["AuthGuardService"]]
    },
    {
        path: 'coupon-offers-modal',
        loadChildren: () => __webpack_require__.e(/*! import() | coupon-offers-modal-coupon-offers-modal-module */ "default~analystoverview-analystoverview-module~coupon-offers-modal-coupon-offers-modal-module~design~ffac05b6").then(__webpack_require__.bind(null, /*! ./coupon-offers-modal/coupon-offers-modal.module */ "P9aQ")).then(m => m.CouponOffersModalPageModule),
        canActivate: [_auth_guard_service__WEBPACK_IMPORTED_MODULE_3__["AuthGuardService"]]
    },
    {
        path: 'onboarding',
        loadChildren: () => Promise.all(/*! import() | onboarding-onboarding-module */[__webpack_require__.e("default~onboarding-onboarding-module~permitschedule-permitschedule-module~sales-proposal-sales-propo~89cd319b"), __webpack_require__.e("default~onboarding-onboarding-module~permitschedule-permitschedule-module~sales-proposal-sales-propo~3f3ec2ec"), __webpack_require__.e("onboarding-onboarding-module")]).then(__webpack_require__.bind(null, /*! ./onboarding/onboarding.module */ "tSXo")).then(m => m.OnboardingPageModule),
        canActivate: [_auth_guard_service__WEBPACK_IMPORTED_MODULE_3__["AuthGuardService"]]
    },
    {
        path: 'dashboard',
        loadChildren: () => __webpack_require__.e(/*! import() | dashboard-dashboard-module */ "dashboard-dashboard-module").then(__webpack_require__.bind(null, /*! ./dashboard/dashboard.module */ "TDBs")).then(m => m.DashboardPageModule),
        canActivate: [_auth_guard_service__WEBPACK_IMPORTED_MODULE_3__["AuthGuardService"]]
    },
    {
        path: 'onhold',
        loadChildren: () => Promise.all(/*! import() | onhold-onhold-module */[__webpack_require__.e("default~analystoverview-analystoverview-module~chat-chat-module~declinepage-declinepage-module~desig~8b909d05"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~bf251e5e"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~c7663126"), __webpack_require__.e("default~analystoverview-analystoverview-module~declinepage-declinepage-module~design-details-design-~964d4d61"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~8efce24e"), __webpack_require__.e("default~analystoverview-analystoverview-module~coupon-offers-modal-coupon-offers-modal-module~design~ffac05b6"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~9b796d06"), __webpack_require__.e("default~analystoverview-analystoverview-module~designoverview-designoverview-module~homepage-homepag~d7159f3d"), __webpack_require__.e("default~analystoverview-analystoverview-module~designoverview-designoverview-module~homepage-homepag~78c51ad4"), __webpack_require__.e("default~designoverview-designoverview-module~homepage-homepage-module~onhold-onhold-module~peenginee~a4db8e48"), __webpack_require__.e("default~designoverview-designoverview-module~homepage-homepage-module~onhold-onhold-module~payment-m~b2fa51b1"), __webpack_require__.e("onhold-onhold-module")]).then(__webpack_require__.bind(null, /*! ./onhold/onhold.module */ "JvVE")).then(m => m.OnholdPageModule)
    },
    {
        path: 'waitingforacceptance',
        loadChildren: () => Promise.all(/*! import() | waitingforacceptance-waitingforacceptance-module */[__webpack_require__.e("default~analystoverview-analystoverview-module~chat-chat-module~declinepage-declinepage-module~desig~8b909d05"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~bf251e5e"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~c7663126"), __webpack_require__.e("default~analystoverview-analystoverview-module~declinepage-declinepage-module~design-details-design-~964d4d61"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~8efce24e"), __webpack_require__.e("default~analystoverview-analystoverview-module~coupon-offers-modal-coupon-offers-modal-module~design~ffac05b6"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~9b796d06"), __webpack_require__.e("default~analystoverview-analystoverview-module~designoverview-designoverview-module~homepage-homepag~d7159f3d"), __webpack_require__.e("default~analystoverview-analystoverview-module~designoverview-designoverview-module~homepage-homepag~78c51ad4"), __webpack_require__.e("default~designoverview-designoverview-module~homepage-homepage-module~onhold-onhold-module~peenginee~a4db8e48"), __webpack_require__.e("default~designoverview-designoverview-module~homepage-homepage-module~onhold-onhold-module~payment-m~b2fa51b1"), __webpack_require__.e("waitingforacceptance-waitingforacceptance-module")]).then(__webpack_require__.bind(null, /*! ./waitingforacceptance/waitingforacceptance.module */ "Zly0")).then(m => m.WaitingforacceptancePageModule)
    },
    {
        path: 'unassigned',
        loadChildren: () => Promise.all(/*! import() | unassigned-unassigned-module */[__webpack_require__.e("default~analystoverview-analystoverview-module~chat-chat-module~declinepage-declinepage-module~desig~8b909d05"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~bf251e5e"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~c7663126"), __webpack_require__.e("default~analystoverview-analystoverview-module~declinepage-declinepage-module~design-details-design-~964d4d61"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~8efce24e"), __webpack_require__.e("default~analystoverview-analystoverview-module~coupon-offers-modal-coupon-offers-modal-module~design~ffac05b6"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~9b796d06"), __webpack_require__.e("default~analystoverview-analystoverview-module~designoverview-designoverview-module~homepage-homepag~d7159f3d"), __webpack_require__.e("default~analystoverview-analystoverview-module~designoverview-designoverview-module~homepage-homepag~78c51ad4"), __webpack_require__.e("default~designoverview-designoverview-module~homepage-homepage-module~onhold-onhold-module~peenginee~a4db8e48"), __webpack_require__.e("default~designoverview-designoverview-module~homepage-homepage-module~onhold-onhold-module~payment-m~b2fa51b1"), __webpack_require__.e("unassigned-unassigned-module")]).then(__webpack_require__.bind(null, /*! ./unassigned/unassigned.module */ "IldV")).then(m => m.UnassignedPageModule)
    },
    {
        path: 'revision',
        loadChildren: () => Promise.all(/*! import() | revision-revision-module */[__webpack_require__.e("default~analystoverview-analystoverview-module~chat-chat-module~declinepage-declinepage-module~desig~8b909d05"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~bf251e5e"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~c7663126"), __webpack_require__.e("default~analystoverview-analystoverview-module~declinepage-declinepage-module~design-details-design-~964d4d61"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~8efce24e"), __webpack_require__.e("default~analystoverview-analystoverview-module~coupon-offers-modal-coupon-offers-modal-module~design~ffac05b6"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~9b796d06"), __webpack_require__.e("default~analystoverview-analystoverview-module~designoverview-designoverview-module~homepage-homepag~d7159f3d"), __webpack_require__.e("default~analystoverview-analystoverview-module~designoverview-designoverview-module~homepage-homepag~78c51ad4"), __webpack_require__.e("default~designoverview-designoverview-module~homepage-homepage-module~onhold-onhold-module~peenginee~a4db8e48"), __webpack_require__.e("default~designoverview-designoverview-module~homepage-homepage-module~onhold-onhold-module~payment-m~b2fa51b1"), __webpack_require__.e("revision-revision-module")]).then(__webpack_require__.bind(null, /*! ./revision/revision.module */ "c6ci")).then(m => m.RevisionPageModule)
    },
    {
        path: 'pestamp-schedule',
        loadChildren: () => Promise.all(/*! import() | pestamp-schedule-pestamp-schedule-module */[__webpack_require__.e("default~analystoverview-analystoverview-module~designoverview-designoverview-module~homepage-homepag~d7159f3d"), __webpack_require__.e("pestamp-schedule-pestamp-schedule-module")]).then(__webpack_require__.bind(null, /*! ./pestamp-schedule/pestamp-schedule.module */ "FT9i")).then(m => m.PestampSchedulePageModule),
        canActivate: [_auth_guard_service__WEBPACK_IMPORTED_MODULE_3__["AuthGuardService"]]
    },
    {
        path: 'pestamp-schedule/:id',
        loadChildren: () => Promise.all(/*! import() | pestamp-schedule-pestamp-schedule-module */[__webpack_require__.e("default~analystoverview-analystoverview-module~designoverview-designoverview-module~homepage-homepag~d7159f3d"), __webpack_require__.e("pestamp-schedule-pestamp-schedule-module")]).then(__webpack_require__.bind(null, /*! ./pestamp-schedule/pestamp-schedule.module */ "FT9i")).then(m => m.PestampSchedulePageModule),
        canActivate: [_auth_guard_service__WEBPACK_IMPORTED_MODULE_3__["AuthGuardService"]]
    },
    {
        path: 'pestamp-homepage',
        loadChildren: () => Promise.all(/*! import() | pestamp-homepage-pestamp-homepage-module */[__webpack_require__.e("default~analystoverview-analystoverview-module~chat-chat-module~declinepage-declinepage-module~desig~8b909d05"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~bf251e5e"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~c7663126"), __webpack_require__.e("default~analystoverview-analystoverview-module~declinepage-declinepage-module~design-details-design-~964d4d61"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~8efce24e"), __webpack_require__.e("default~analystoverview-analystoverview-module~coupon-offers-modal-coupon-offers-modal-module~design~ffac05b6"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~9b796d06"), __webpack_require__.e("default~analystoverview-analystoverview-module~designoverview-designoverview-module~homepage-homepag~78c51ad4"), __webpack_require__.e("default~designoverview-designoverview-module~homepage-homepage-module~onhold-onhold-module~peenginee~a4db8e48"), __webpack_require__.e("pestamp-homepage-pestamp-homepage-module")]).then(__webpack_require__.bind(null, /*! ./pestamp-homepage/pestamp-homepage.module */ "wa2R")).then(m => m.PestampHomepagePageModule),
        canActivate: [_auth_guard_service__WEBPACK_IMPORTED_MODULE_3__["AuthGuardService"]]
    },
    {
        path: 'pestamp-design-details/:id',
        loadChildren: () => Promise.all(/*! import() | pestamp-design-details-pestamp-design-details-module */[__webpack_require__.e("default~analystoverview-analystoverview-module~chat-chat-module~declinepage-declinepage-module~desig~8b909d05"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~bf251e5e"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~c7663126"), __webpack_require__.e("default~analystoverview-analystoverview-module~declinepage-declinepage-module~design-details-design-~964d4d61"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~8efce24e"), __webpack_require__.e("default~analystoverview-analystoverview-module~coupon-offers-modal-coupon-offers-modal-module~design~ffac05b6"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~9b796d06"), __webpack_require__.e("pestamp-design-details-pestamp-design-details-module")]).then(__webpack_require__.bind(null, /*! ./pestamp-design-details/pestamp-design-details.module */ "O0Rn")).then(m => m.PestampDesignDetailsPageModule),
        canActivate: [_auth_guard_service__WEBPACK_IMPORTED_MODULE_3__["AuthGuardService"]]
    },
    {
        path: 'pestamp-payment-modal',
        loadChildren: () => Promise.all(/*! import() | pestamp-payment-modal-pestamp-payment-modal-module */[__webpack_require__.e("default~analystoverview-analystoverview-module~chat-chat-module~declinepage-declinepage-module~desig~8b909d05"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~bf251e5e"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~c7663126"), __webpack_require__.e("default~analystoverview-analystoverview-module~declinepage-declinepage-module~design-details-design-~964d4d61"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~8efce24e"), __webpack_require__.e("default~analystoverview-analystoverview-module~coupon-offers-modal-coupon-offers-modal-module~design~ffac05b6"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~9b796d06"), __webpack_require__.e("default~add-money-add-money-module~payment-modal-payment-modal-module~paymentgateway-paymentgateway-~d58b2bb9"), __webpack_require__.e("pestamp-payment-modal-pestamp-payment-modal-module")]).then(__webpack_require__.bind(null, /*! ./pestamp-payment-modal/pestamp-payment-modal.module */ "G+2u")).then(m => m.PestampPaymentModalPageModule),
        canActivate: [_auth_guard_service__WEBPACK_IMPORTED_MODULE_3__["AuthGuardService"]]
    },
    {
        path: 'camera/:id/:type/:city/:state/:lat/:long',
        loadChildren: () => Promise.all(/*! import() | surveyprocess-surveyprocess-module */[__webpack_require__.e("default~analystoverview-analystoverview-module~designoverview-designoverview-module~homepage-homepag~d7159f3d"), __webpack_require__.e("default~gallery-gallery-module~surveyprocess-surveyprocess-module"), __webpack_require__.e("surveyprocess-surveyprocess-module")]).then(__webpack_require__.bind(null, /*! ./surveyprocess/surveyprocess.module */ "jFmn")).then(m => m.SurveyprocessPageModule),
        canActivate: [_auth_guard_service__WEBPACK_IMPORTED_MODULE_3__["AuthGuardService"]]
    },
    {
        path: 'peengineer',
        loadChildren: () => Promise.all(/*! import() | peengineer-peengineer-module */[__webpack_require__.e("default~analystoverview-analystoverview-module~chat-chat-module~declinepage-declinepage-module~desig~8b909d05"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~bf251e5e"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~c7663126"), __webpack_require__.e("default~analystoverview-analystoverview-module~declinepage-declinepage-module~design-details-design-~964d4d61"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~8efce24e"), __webpack_require__.e("default~analystoverview-analystoverview-module~coupon-offers-modal-coupon-offers-modal-module~design~ffac05b6"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~9b796d06"), __webpack_require__.e("default~analystoverview-analystoverview-module~designoverview-designoverview-module~homepage-homepag~78c51ad4"), __webpack_require__.e("default~designoverview-designoverview-module~homepage-homepage-module~onhold-onhold-module~peenginee~a4db8e48"), __webpack_require__.e("peengineer-peengineer-module")]).then(__webpack_require__.bind(null, /*! ./peengineer/peengineer.module */ "kRU8")).then(m => m.PEengineerPageModule)
    },
    {
        path: 'comingsoon',
        loadChildren: () => __webpack_require__.e(/*! import() | comingsoon-comingsoon-module */ "comingsoon-comingsoon-module").then(__webpack_require__.bind(null, /*! ./comingsoon/comingsoon.module */ "CO2l")).then(m => m.ComingsoonPageModule)
    },
    {
        path: 'pestampdelivermodal',
        loadChildren: () => Promise.all(/*! import() | pestampdelivermodal-pestampdelivermodal-module */[__webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~bf251e5e"), __webpack_require__.e("default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~8efce24e")]).then(__webpack_require__.bind(null, /*! ./pestampdelivermodal/pestampdelivermodal.module */ "ucpL")).then(m => m.PestampdelivermodalPageModule)
    },
    {
        path: 'callingscreen',
        loadChildren: () => __webpack_require__.e(/*! import() | callingscreen-callingscreen-module */ "callingscreen-callingscreen-module").then(__webpack_require__.bind(null, /*! ./callingscreen/callingscreen.module */ "Hxug")).then(m => m.CallingscreenPageModule)
    },
    {
        path: 'teammodule',
        loadChildren: () => __webpack_require__.e(/*! import() | teammodule-teammodule-module */ "teammodule-teammodule-module").then(__webpack_require__.bind(null, /*! ./teammodule/teammodule.module */ "3Khb")).then(m => m.TeammodulePageModule)
    },
    {
        path: 'teamschedule',
        loadChildren: () => __webpack_require__.e(/*! import() | teamschedule-teamschedule-module */ "teamschedule-teamschedule-module").then(__webpack_require__.bind(null, /*! ./teamschedule/teamschedule.module */ "e/Kw")).then(m => m.TeamschedulePageModule)
    },
    {
        path: 'sales-proposal',
        loadChildren: () => Promise.all(/*! import() | sales-proposal-sales-proposal-module */[__webpack_require__.e("default~onboarding-onboarding-module~permitschedule-permitschedule-module~sales-proposal-sales-propo~89cd319b"), __webpack_require__.e("default~onboarding-onboarding-module~permitschedule-permitschedule-module~sales-proposal-sales-propo~3f3ec2ec"), __webpack_require__.e("sales-proposal-sales-proposal-module")]).then(__webpack_require__.bind(null, /*! ./sales-proposal/sales-proposal.module */ "QnOJ")).then(m => m.SalesProposalPageModule)
    },
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(routes, { preloadingStrategy: _angular_router__WEBPACK_IMPORTED_MODULE_2__["PreloadAllModules"], relativeLinkResolution: 'legacy' })
        ],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })
], AppRoutingModule);



/***/ }),

/***/ "yTNM":
/*!********************************!*\
  !*** ./src/app/api.service.ts ***!
  \********************************/
/*! exports provided: ApiService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApiService", function() { return ApiService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _storage_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./storage.service */ "qkCY");
/* harmony import */ var _contants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./contants */ "6qqZ");
/* harmony import */ var _model_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./model/constants */ "Kp5Z");
/* harmony import */ var _utilities_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utilities.service */ "oTnF");
/* harmony import */ var _auth_guard_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./auth-guard.service */ "5nbR");
/* harmony import */ var _cometchat_pro_cordova_ionic_chat_CometChat__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @cometchat-pro/cordova-ionic-chat/CometChat */ "ujHh");
/* harmony import */ var _cometchat_pro_cordova_ionic_chat_CometChat__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_cometchat_pro_cordova_ionic_chat_CometChat__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/router */ "tyNb");














let ApiService = class ApiService {
    constructor(http, storageService, utilities, auth, navCtrl, router) {
        this.http = http;
        this.storageService = storageService;
        this.utilities = utilities;
        this.auth = auth;
        this.navCtrl = navCtrl;
        this.router = router;
        this.onlineOffline = navigator.onLine;
        this.parentId = '';
        this.userId = '';
        this.searchbarElement = '';
        this.solarMakeValue = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"]('');
        this.version = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"]('');
        // this.listencall();
        this.getUpgradeMessage();
        if (!navigator.onLine) {
            // this.utilities.showSnackBar('No internet connection');
            //Do task when no internet connection
        }
        window.addEventListener('online', () => {
            //Do task when internet connection returns
        });
        window.addEventListener('offline', () => {
            //Do task when no internet connection
            this.utilities.errorSnackBar('No internet connection');
        });
        this.resetHeaders();
        this._OnMessageReceivedSubject = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        this.showUserName = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
    }
    /**
    * emits a message.
    */
    emitMessageReceived(msg) {
        this._OnMessageReceivedSubject.next(msg);
    }
    emitUserNameAndRole(data) {
        this.showUserName.next(data);
    }
    getUserName() {
        return this.showUserName;
    }
    login(data) {
        this.resetHeaders();
        return this.http.post(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + 'auth/local', data, { headers: this.headers });
    }
    sendForgotPasswordLink(data) {
        return this.http.post(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + 'auth/forgot-password', data, { headers: this.headers });
    }
    getSolarMake() {
        return this.http.get(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + 'modulemakes', { headers: this.headers });
    }
    postSolarMake(data) {
        return this.http.post(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + 'modulemakes', data, { headers: this.headers });
    }
    getRoofMaterial() {
        return this.http.get(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + 'roofmaterials', { headers: this.headers });
    }
    getSolarMade(id) {
        return this.http.get(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + 'modulemodels?modulemake.id_eq=' + id, { headers: this.headers });
    }
    postSolarMade(data) {
        return this.http.post(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + 'modulemodels', data, { headers: this.headers });
    }
    getInverterMake() {
        return this.http.get(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + 'invertermakes', { headers: this.headers });
    }
    postInverterMake(data) {
        return this.http.post(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + 'invertermakes', data, { headers: this.headers });
    }
    postInverterMade(data) {
        return this.http.post(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + 'invertermodels', data, { headers: this.headers });
    }
    getUtilities() {
        return this.http.get(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + 'utilities', { headers: this.headers });
    }
    addUtility(data) {
        return this.http.post(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + 'utilities', data, { headers: this.headers });
    }
    getRoofMaterials() {
        return this.http.get(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + 'roofmaterials', { headers: this.headers });
    }
    getInverterMade(id) {
        console.log(id);
        return this.http.get(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + 'invertermodels?invertermake.id_eq=' + id, { headers: this.headers });
    }
    addDesginForm(data) {
        return this.http.post(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + 'designs', data, { headers: this.headers });
    }
    updateDesignForm(data, id) {
        return this.http.put(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + 'designs/' + id, data, { headers: this.headers });
    }
    getDesgin() {
        return this.http.get(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + 'userdesigns?id=' + this.userId, { headers: this.headers });
    }
    getDesginDetail(id) {
        return this.http.get(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + 'designs/' + id, { headers: this.headers });
    }
    deleteDesign(id) {
        return this.http.delete(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + 'designs/' + id, { headers: this.headers });
    }
    getSurvey() {
        return this.http.get(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + 'usersurveys?id=' + this.userId, { headers: this.headers });
    }
    getSurveyDetail(id) {
        return this.http.get(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + 'surveys/' + id, { headers: this.headers });
    }
    deleteSurvey(id) {
        return this.http.delete(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + 'surveys/' + id, { headers: this.headers });
    }
    updateSurveyForm(data, id) {
        return this.http.put(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + 'surveys/' + id, data, { headers: this.headers });
    }
    getSurveyorSurveys(search) {
        return this.http.get(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + 'usersurveys?id=' + this.userId + '&' + search, { headers: this.headers });
    }
    getDesignSurveys(search, limit, skip) {
        return this.http.get(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + 'userdesigns?id=' + this.userId + '&' + search + '&limit=' + limit + '&skip=' + skip, { headers: this.headers });
    }
    getAnalystDesign(search) {
        return this.http.get(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + 'userdesign?id=' + this.userId + '&' + search, { headers: this.headers });
    }
    getProfileDetails() {
        return this.http.get(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + 'users/me', { headers: this.headers });
    }
    refreshHeader() {
        this.headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.storageService.getJWTToken()
        });
        this.uploadHeaders = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({
            Authorization: 'Bearer ' + this.storageService.getJWTToken()
        });
        this.parentId = this.storageService.getParentId();
        this.userId = this.storageService.getUserID();
    }
    resetHeaders() {
        this.headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({
            'Content-Type': 'application/json'
        });
        this.uploadHeaders = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]();
        this.parentId = '';
        this.userId = '';
    }
    saveSurvey(data) {
        return this.http.post(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + 'surveys', data, { headers: this.headers });
    }
    getSurveyors() {
        return this.http.get(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + 'surveyors?parent_eq=' + this.parentId, { headers: this.headers });
    }
    getAnalysts() {
        return this.http.get(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + 'analysts?parent_eq=' + this.parentId, { headers: this.headers });
    }
    searchAllDesgin(searchterm) {
        return this.http.get(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + 'globalsearch?term=' + searchterm + '&userid=' + this.userId, { headers: this.headers });
    }
    getDesigners() {
        return this.http.get(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + 'designers?parent_eq=' + this.parentId, { headers: this.headers });
    }
    uploadImage(surveyId, key, blob, fileName) {
        const data = new FormData();
        data.append('files', blob, fileName);
        data.append('path', 'survey/' + surveyId);
        data.append('refId', surveyId + '');
        data.append('ref', 'survey');
        data.append('field', key);
        console.log("file upload data---" + data);
        return this.http.post(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + 'upload', data, { headers: this.uploadHeaders });
    }
    uploadDeclineImage(designId, key, blob, fileName) {
        const data = new FormData();
        data.append('files', blob, fileName);
        data.append('path', 'designs/' + designId);
        data.append('refId', designId + '');
        data.append('ref', 'design');
        data.append('field', key);
        console.log("file upload data---" + data);
        return this.http.post(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + 'upload', data, { headers: this.uploadHeaders });
    }
    uploadlogo(blob, fileName) {
        const data = new FormData();
        data.append('files', blob, fileName);
        data.append('path', this.userId + '/logo');
        data.append('refId', '' + this.userId);
        data.append('ref', 'user');
        data.append('field', 'logo');
        data.append('source', 'users-permissions');
        return this.http.post(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + 'upload', data, { headers: this.uploadHeaders });
    }
    uploaddesign(data) {
        return this.http.post(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + 'upload', data, { headers: this.uploadHeaders });
    }
    resetpassword(data) {
        return this.http.post(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + 'auth/reset-password', data, { headers: this.uploadHeaders });
    }
    changepassword(data) {
        return this.http.post(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + 'auth/set-password', data, { headers: this.uploadHeaders });
    }
    updateresetpassword(userId, data) {
        return this.http.put(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + 'users/' + userId, data, { headers: this.uploadHeaders });
    }
    updateUser(id, data) {
        return this.http.put(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + 'users/' + id, data, { headers: this.uploadHeaders });
    }
    getCountOfUnreadNotifications() {
        return this.http.get(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + "Notifications/count?user=" + this.userId + "&status=unread", { headers: this.headers });
    }
    profileNotification() {
        return this.http.get(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + 'notifications?user=' + this.userId + "&_sort=created_at:DESC", { headers: this.headers });
    }
    updateNotification(id, status) {
        return this.http.put(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + 'notifications/' + id, status, { headers: this.headers });
    }
    getGoogleImage(lat, lng) {
        var imageurl = "https://maps.googleapis.com/maps/api/staticmap?zoom=19&size=1200x1600&scale=4&maptype=satellite&center=" + lat + "," + lng + "&key=" + _model_constants__WEBPACK_IMPORTED_MODULE_6__["GOOGLE_API_KEY"];
        return this.http.get(imageurl, { responseType: 'blob' });
    }
    deletePrelimImage(id) {
        return this.http.delete(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + "upload/files/" + id, { headers: this.headers });
    }
    rechargePost(data) {
        return this.http.post(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + "recharges/", data, { headers: this.headers });
    }
    design_activityDetails(designid) {
        return this.http.get(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + "designs/" + designid, { headers: this.headers });
    }
    pestamp_activityDetails(designid) {
        return this.http.get(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + "pestamps/" + designid, { headers: this.headers });
    }
    createPayment(data) {
        return this.http.post(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + 'createpayment', data, { headers: this.uploadHeaders });
    }
    recharges(data) {
        return this.http.post(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + 'recharges', data, { headers: this.uploadHeaders });
    }
    paymentDetail(C_id) {
        return this.http.get(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + "designs/count?createdby=" + C_id + "&isoutsourced=true&outsourcedto=232", { headers: this.headers });
    }
    prelimCharges() {
        return this.http.get(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + "commonsettings?settingname=prelimdesigncharges", { headers: this.headers });
    }
    prelimSalesCharges() {
        return this.http.get(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + "commonsettings?settingname=siteproposaldesigncharges", { headers: this.headers });
    }
    permitinitcharges() {
        return this.http.get(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + "commonsettings?settingname=permitdesigncharges", { headers: this.headers });
    }
    permitCharges(data) {
        return this.http.post(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + "getdesignservicecharge", data, { headers: this.headers });
    }
    freeCharges() {
        return this.http.get(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + "commonsettings?settingname=freedesigns ", { headers: this.headers });
    }
    survey_activityDetails(surveyid) {
        return this.http.get(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + "surveys/" + surveyid, { headers: this.headers });
    }
    publishSolarMake(value) {
        this.solarMakeValue.next(value);
    }
    editDesign(id, inputData) {
        return this.http
            .put(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + "designs/" + id, JSON.stringify(inputData), {
            headers: this.headers,
        });
    }
    pushtoken(id, data) {
        return this.http.put(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + 'users/pushtokens/' + id, data, { headers: this.uploadHeaders });
    }
    getTeamData() {
        return this.http.get(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + "users?_sort=created_at:desc&parent=" + this.parentId + "&id_ne=" + this.parentId, {
            headers: this.headers,
        });
    }
    update_message() {
        this.headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.storageService.getJWTToken()
        });
        console.log(this.headers);
        return this.http.get(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + 'platformupdates?status=true&_limit=1&_sort=id:desc&platformtype=app', { headers: this.headers });
    }
    getUpgradeMessage() {
        this.update_message().subscribe(res => {
            console.log(res);
            this.version.next(res[0].appversion);
        });
    }
    getStatistic(inputData) {
        return this.http.post(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + 'designanalytics', inputData, { headers: this.headers });
    }
    getClientSuperadmin() {
        // return this.http.get<User[]>(BaseUrl + "fetchsuperadmins", {
        //   headers: this.headers,
        //   observe: "response"
        // });
        return this.http.get(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + 'fetchsuperadmins', { headers: this.headers });
    }
    getDesignersDetails(starttime, endtime, requesttype) {
        return this.http.get(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + 'getdesignanalytics?starttime=' + starttime + '&endtime=' + endtime + '&companyid=232&requesttype=' + requesttype, { headers: this.headers });
    }
    getanalystanalytics(starttime, endtime, requesttype) {
        return this.http.get(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + 'getanalystanalytics?starttime=' + starttime + '&endtime=' + endtime + '&companyid=232&requesttype=' + requesttype, { headers: this.headers });
    }
    getDesignerDesignsForStats(startdate, enddate, requesttype, id) {
        return this.http.get(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + 'getdesignerdesigns?status=delivered&designerid=' + id + '&startdate=' + startdate + '&enddate=' + enddate + '&requesttype=' + requesttype, { headers: this.headers });
    }
    getAnalystDesignsForStats(startdate, enddate, requesttype, id) {
        return this.http.get(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + 'getanalystdesigns?status=delivered&analystid=' + id + '&startdate=' + startdate + '&enddate=' + enddate + '&requesttype=' + requesttype, { headers: this.headers });
    }
    sendPrelimEmails(data) {
        return this.http.post(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + "designs/send-prelim-design", data, { headers: this.headers });
    }
    sendPermitEmails(data) {
        return this.http.post(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + "designs/send-permit-design", data, { headers: this.headers });
    }
    getUserData(id) {
        return this.http.get(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + "users/" + id, { headers: this.headers });
    }
    getCoupons(data) {
        return this.http.get(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + "getCoupons?userid=" + this.userId + "&requesttype=" + data, { headers: this.headers });
    }
    sendCoupon(data) {
        return this.http.post(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + "getCoupon", data, { headers: this.headers });
    }
    addUser(workemail, firstname, lastname, permissiontomakedesign, role, minpermitaccess
    // address: String,
    // country: String,
    // callingcode: number
    ) {
        var randomPassword = this.utilities.randomPass();
        var parentid = 0;
        //this.parentId = this.storageService.getParentId();
        var user = this.storageService.getUser();
        if (user.role.id == _contants__WEBPACK_IMPORTED_MODULE_5__["ROLES"].SuperAdmin || user.role.id == _contants__WEBPACK_IMPORTED_MODULE_5__["ROLES"].ContractorSuperAdmin) {
            parentid = user.id;
        }
        else {
            parentid = user.parent.id;
        }
        const postData = {
            firstname: firstname,
            lastname: lastname,
            email: workemail,
            permissiontomakedesign: permissiontomakedesign,
            password: randomPassword,
            resetPasswordToken: randomPassword,
            source: "android",
            username: workemail,
            confirmed: true,
            isdefaultpassword: true,
            role: role,
            minpermitdesignaccess: minpermitaccess,
            provider: "local",
            parent: parentid,
            company: this.storageService.getUser().company,
            addedby: this.storageService.getUser().id //.currentUserValue.user.id
        };
        console.log(postData);
        return this.http
            .post(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + "users", JSON.stringify(postData), {
            headers: this.headers,
        });
        // .pipe(
        //   map(value => {
        //     const member: User = value.body;
        //     return member;
        //   }),
        //   catchError((err: HttpErrorResponse) => {
        //   if(err.error.error == "Unauthorized"){
        //     this.genericService.handleusersignout();
        //   }else{
        //     return throwError(err.error.message);
        //   }
        // })
        // );
    }
    getClients() {
        return this.http.get(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + "getclients", { headers: this.headers });
    }
    addSiteAssessment(postData) {
        return this.http.post(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + "pestamps", JSON.stringify(postData), { headers: this.headers });
    }
    uploadFile(data) {
        // const data = new FormData();
        // data.append('files', blob, file);
        // data.append('path', path);
        // data.append('refId', ""+recordid);
        // data.append('ref', ref);
        // data.append('field', field);
        // console.log("file upload data---"+data);
        return this.http.post(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + "upload", data, {
            headers: this.uploadHeaders,
        });
    }
    /* SEARCH PE STAMP DESIGNS */
    getFilteredDesigns(search) {
        return this.http.get(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + "userpestamps?id=" + this.storageService.getUser().id + "&" + search, {
            headers: this.headers,
        });
    }
    getPestampDetails(id) {
        return this.http.get(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + "pestamps/" + id, {
            headers: this.headers
        });
    }
    /* Get Pe Engineers */
    getPeEngineers(peenginertype) {
        console.log(peenginertype);
        return this.http.get(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + "peengineers?pestamptype=" + peenginertype + "&parent_eq=" + this.storageService.getUser().parent.id, {
            headers: this.headers,
        });
    }
    /* Assign to PeEngineer */
    assignPestamps(id, inputData) {
        return this.http.put(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + "pestamps/" + id, JSON.stringify(inputData), {
            headers: this.headers
        });
    }
    updatePestamps(id, inputData) {
        return this.http.put(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + "pestamps/" + id, JSON.stringify(inputData), {
            headers: this.headers
        });
    }
    deletePestamp(id) {
        console.log(id);
        return this.http.delete(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + "upload/files/" + id, {
            headers: this.headers
        });
    }
    getcounts(id) {
        return this.http.get(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + 'dashboarddesigncount?id=' + id, { headers: this.headers });
    }
    getPeStampCharges(searchData) {
        return this.http.get(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + 'commonsettings?settingname=' + searchData, { headers: this.headers });
    }
    createdirectpayment(inputData) {
        return this.http.post(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + "Pestampdirectpayment", inputData, {
            headers: this.uploadHeaders
        });
    }
    createPestamppayment(inputData) {
        return this.http.post(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + "pestampdeliverychargespayment", inputData, {
            headers: this.uploadHeaders
        });
    }
    createCommercialPestamppayment(inputData) {
        return this.http.post(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + "deliveredcommercialpestampayment", inputData, {
            headers: this.uploadHeaders
        });
    }
    getPendingPaymentstatus() {
        return this.http.get(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + "paymentpendingpestamps?creatorparentid=" + this.storageService.getUser().parent.id, {
            headers: this.headers
        });
    }
    generatePdf(id) {
        return this.http.get(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + "surveypdf?id=" + id, {
            headers: this.headers
        });
    }
    salesIncentives() {
        return this.http.get(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + 'incentives', {
            headers: this.headers
        });
    }
    utilitiesNames() {
        return this.http.get(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + 'utilities?_sort=name:ASC', {
            headers: this.headers
        });
    }
    utilitiesRate(utilityid) {
        return this.http.get(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + 'utilityrates?utility=' + utilityid, {
            headers: this.headers
        });
    }
    postUtilitiesNames(name) {
        return this.http.post(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + 'utilities', name, {
            headers: this.headers
        });
    }
    postUtilitiesRate(utilityid) {
        return this.http.post(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + 'utilityrates', utilityid, {
            headers: this.headers
        });
    }
    listencall(listnerID) {
        // let listnerID = localStorage.getItem('gid');
        const that = this;
        _cometchat_pro_cordova_ionic_chat_CometChat__WEBPACK_IMPORTED_MODULE_9__["CometChat"].addCallListener(listnerID, new _cometchat_pro_cordova_ionic_chat_CometChat__WEBPACK_IMPORTED_MODULE_9__["CometChat"].CallListener({
            onIncomingCallReceived(call) {
                console.log('Incoming call:', call);
                that.callData = call;
                // if(call.status=='initiated'){
                that.router.navigate(['/', 'callingscreen']);
                // }
                // Handle incoming call
            },
            onOutgoingCallAccepted(call) {
                console.log('Outgoing call accepted:', call);
                that.callData = call;
                // Outgoing Call Accepted
            },
            onOutgoingCallRejected(call) {
                console.log('Outgoing call rejected:', call);
                that.callData = call;
                // Outgoing Call Rejected
                that.navCtrl.pop();
            },
            onIncomingCallCancelled(call) {
                console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
                console.log('Incoming call calcelled:', call);
                console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
                that.callData = call;
                // that.location.back();
                that.navCtrl.pop();
            }
        }));
    }
    getCallData() {
        return this.callData;
    }
    getStripeSessionID(inputData) {
        return this.http.post(_contants__WEBPACK_IMPORTED_MODULE_5__["BaseUrl"] + "walletrecharge", inputData, {
            headers: this.uploadHeaders
        });
    }
};
ApiService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] },
    { type: _storage_service__WEBPACK_IMPORTED_MODULE_4__["StorageService"] },
    { type: _utilities_service__WEBPACK_IMPORTED_MODULE_7__["UtilitiesService"] },
    { type: _auth_guard_service__WEBPACK_IMPORTED_MODULE_8__["AuthGuardService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_10__["NavController"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_11__["Router"] }
];
ApiService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], ApiService);



/***/ }),

/***/ "ynWL":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("ion-item.selected {\n  --color: var(--ion-color-primary);\n}\n\n.matBadge {\n  top: 0;\n}\n\n.matBadge {\n  position: absolute;\n  top: 16px;\n  border: 1px solid #fff;\n  right: 30px;\n  font-size: 9px;\n  background: #f44336;\n  color: #fff;\n  min-width: 20px;\n  padding: 0 5px;\n  height: 20px;\n  border-radius: 10px;\n  text-align: center;\n  line-height: 19px;\n  display: block;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcYXBwLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksaUNBQUE7QUFDSjs7QUFFRTtFQUNFLE1BQUE7QUFDSjs7QUFFRTtFQUNFLGtCQUFBO0VBQ0EsU0FBQTtFQUNBLHNCQUFBO0VBQ0EsV0FBQTtFQUNBLGNBQUE7RUFDQSxtQkFBQTtFQUNBLFdBQUE7RUFDQSxlQUFBO0VBQ0EsY0FBQTtFQUNBLFlBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0VBQ0EsaUJBQUE7RUFDQSxjQUFBO0FBQ0oiLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiaW9uLWl0ZW0uc2VsZWN0ZWQge1xyXG4gICAgLS1jb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xyXG4gIH1cclxuXHJcbiAgLm1hdEJhZGdlIHtcclxuICAgIHRvcDogMDtcclxuICB9XHJcbiAgXHJcbiAgLm1hdEJhZGdlIHtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHRvcDogMTZweDtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNmZmY7XHJcbiAgICByaWdodDogMzBweDtcclxuICAgIGZvbnQtc2l6ZTogOXB4O1xyXG4gICAgYmFja2dyb3VuZDogI2Y0NDMzNjtcclxuICAgIGNvbG9yOiAjZmZmO1xyXG4gICAgbWluLXdpZHRoOiAyMHB4O1xyXG4gICAgcGFkZGluZzogMCA1cHg7XHJcbiAgICBoZWlnaHQ6IDIwcHg7XHJcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgbGluZS1oZWlnaHQ6IDE5cHg7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICB9Il19 */");

/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "a3Wg");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "AytR");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.log(err));


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map