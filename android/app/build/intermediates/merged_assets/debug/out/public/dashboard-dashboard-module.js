(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["dashboard-dashboard-module"],{

/***/ "B3xu":
/*!***********************************************!*\
  !*** ./src/app/dashboard/dashboard.page.scss ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".card {\n  height: 135px;\n  border-radius: 15%;\n  text-align: center;\n  box-shadow: 6px 0px 8px 7px #4443;\n}\n\n.top {\n  top: 20px;\n}\n\nion-badge {\n  border-radius: 50%;\n  margin-top: 10px;\n  padding: 8px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXGRhc2hib2FyZC5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxhQUFBO0VBQ0Esa0JBQUE7RUFDQSxrQkFBQTtFQUNBLGlDQUFBO0FBQ0o7O0FBRUE7RUFDSSxTQUFBO0FBQ0o7O0FBRUE7RUFDSSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsWUFBQTtBQUNKIiwiZmlsZSI6ImRhc2hib2FyZC5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuY2FyZHtcclxuICAgIGhlaWdodDogMTM1cHg7XHJcbiAgICBib3JkZXItcmFkaXVzOiAxNSU7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBib3gtc2hhZG93OiA2cHggMHB4IDhweCA3cHggIzQ0NDM7XHJcbn1cclxuXHJcbi50b3B7XHJcbiAgICB0b3A6MjBweDtcclxufVxyXG5cclxuaW9uLWJhZGdle1xyXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG4gICAgbWFyZ2luLXRvcDogMTBweDtcclxuICAgIHBhZGRpbmc6IDhweDtcclxufSJdfQ== */");

/***/ }),

/***/ "KR73":
/*!*************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/dashboard/dashboard.page.html ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\r\n  <ion-toolbar>\r\n    <ion-buttons slot=\"start\">\r\n      <ion-menu-button></ion-menu-button>\r\n    </ion-buttons>\r\n    <ion-title>Dashboard</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n<ion-grid>\r\n  <ion-row>\r\n    <ion-col size=\"6\">\r\n      <ion-card class=\" card\" [routerLink]=\"['/onhold']\">\r\n        <ion-card-header class=\"top\">\r\n          On Hold\r\n        </ion-card-header>\r\n        <ion-badge color=\"success\">{{count.putonhold}}</ion-badge>  \r\n        <ion-card-content></ion-card-content>\r\n      </ion-card>\r\n    </ion-col>\r\n    <ion-col size=\"6\">\r\n      <ion-card class=\" card\" [routerLink]=\"['/revision']\">\r\n        <ion-card-header class=\"top\">\r\n          Revision\r\n        </ion-card-header>  \r\n        <ion-badge color=\"success\">{{count.isinrevisionstatecount}}</ion-badge>\r\n        <ion-card-content></ion-card-content>\r\n      </ion-card>\r\n    </ion-col>\r\n  </ion-row>\r\n  <ion-row> \r\n    <ion-col size=\"6\" *ngIf=\"userData.role.name=='ContractorAdmin' || userData.role.name=='ContractorSuperAdmin' || userData.role.name=='SuperAdmin' || userData.role.type=='wattmonkadmins'\">\r\n      <ion-card class=\" card\"  [routerLink]=\"['/waitingforacceptance']\">\r\n        <ion-card-header class=\"top\">\r\n          Waiting for acceptance\r\n        </ion-card-header>  \r\n        <ion-badge color=\"success\">{{count.waitingforacceptance}}</ion-badge>  \r\n        <ion-card-content></ion-card-content>\r\n      </ion-card>\r\n    </ion-col>\r\n    <ion-col size=\"6\">\r\n      <ion-card class=\" card\"  [routerLink]=\"['/unassigned']\">\r\n        <ion-card-header class=\"top\">\r\n          Unassigned\r\n        </ion-card-header>  \r\n        <ion-badge color=\"success\">{{count.unassigned}}</ion-badge>\r\n        <ion-card-content></ion-card-content>\r\n      </ion-card>\r\n    </ion-col>\r\n  </ion-row>\r\n</ion-grid>\r\n</ion-content>\r\n");

/***/ }),

/***/ "NcNw":
/*!*********************************************!*\
  !*** ./src/app/dashboard/dashboard.page.ts ***!
  \*********************************************/
/*! exports provided: DashboardPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardPage", function() { return DashboardPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_dashboard_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./dashboard.page.html */ "KR73");
/* harmony import */ var _dashboard_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dashboard.page.scss */ "B3xu");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../api.service */ "yTNM");
/* harmony import */ var _storage_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../storage.service */ "qkCY");
/* harmony import */ var _utilities_mixpanel_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utilities/mixpanel.service */ "uKCw");








let DashboardPage = class DashboardPage {
    constructor(apiService, route, storage, mixpanelService) {
        this.apiService = apiService;
        this.route = route;
        this.storage = storage;
        this.mixpanelService = mixpanelService;
        this.count = {
            isinrevisionstatecount: '',
            putonhold: '',
            unassiigned: '',
            waitingforacceptance: ''
        };
    }
    ngOnInit() {
        this.userId = this.storage.getUserID();
        this.userData = this.storage.getUser();
        //  let data = this.route.snapshot.data.userdata; // get data from resolver
        //  console.log(data);
        //this.getCount();
        this.mixpanelService.track('DASHBOARD_PAGE_OPEN', {});
    }
    ionViewDidEnter() {
        this.getCount();
        this.apiService.emitUserNameAndRole(this.userData);
    }
    getCount() {
        this.apiService.getcounts(this.userId).subscribe(res => {
            this.count = res;
            console.log(this.count);
        });
    }
};
DashboardPage.ctorParameters = () => [
    { type: _api_service__WEBPACK_IMPORTED_MODULE_5__["ApiService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"] },
    { type: _storage_service__WEBPACK_IMPORTED_MODULE_6__["StorageService"] },
    { type: _utilities_mixpanel_service__WEBPACK_IMPORTED_MODULE_7__["MixpanelService"] }
];
DashboardPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-dashboard',
        template: _raw_loader_dashboard_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_dashboard_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], DashboardPage);



/***/ }),

/***/ "Oy4E":
/*!*******************************************************!*\
  !*** ./src/app/dashboard/dashboard-routing.module.ts ***!
  \*******************************************************/
/*! exports provided: DashboardPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardPageRoutingModule", function() { return DashboardPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _dashboard_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dashboard.page */ "NcNw");




const routes = [
    {
        path: '',
        component: _dashboard_page__WEBPACK_IMPORTED_MODULE_3__["DashboardPage"]
    }
];
let DashboardPageRoutingModule = class DashboardPageRoutingModule {
};
DashboardPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], DashboardPageRoutingModule);



/***/ }),

/***/ "TDBs":
/*!***********************************************!*\
  !*** ./src/app/dashboard/dashboard.module.ts ***!
  \***********************************************/
/*! exports provided: DashboardPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardPageModule", function() { return DashboardPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _dashboard_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./dashboard-routing.module */ "Oy4E");
/* harmony import */ var _dashboard_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./dashboard.page */ "NcNw");







let DashboardPageModule = class DashboardPageModule {
};
DashboardPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _dashboard_routing_module__WEBPACK_IMPORTED_MODULE_5__["DashboardPageRoutingModule"]
        ],
        declarations: [_dashboard_page__WEBPACK_IMPORTED_MODULE_6__["DashboardPage"]]
    })
], DashboardPageModule);



/***/ })

}]);
//# sourceMappingURL=dashboard-dashboard-module.js.map