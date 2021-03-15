(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["statsoverviewdetails-statsoverviewdetails-module"],{

/***/ "CY9Z":
/*!*********************************************************************!*\
  !*** ./src/app/statsoverviewdetails/statsoverviewdetails.module.ts ***!
  \*********************************************************************/
/*! exports provided: StatsoverviewdetailsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StatsoverviewdetailsPageModule", function() { return StatsoverviewdetailsPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _statsoverviewdetails_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./statsoverviewdetails-routing.module */ "zUb9");
/* harmony import */ var _statsoverviewdetails_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./statsoverviewdetails.page */ "w3Lq");







let StatsoverviewdetailsPageModule = class StatsoverviewdetailsPageModule {
};
StatsoverviewdetailsPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _statsoverviewdetails_routing_module__WEBPACK_IMPORTED_MODULE_5__["StatsoverviewdetailsPageRoutingModule"]
        ],
        declarations: [_statsoverviewdetails_page__WEBPACK_IMPORTED_MODULE_6__["StatsoverviewdetailsPage"]]
    })
], StatsoverviewdetailsPageModule);



/***/ }),

/***/ "SYbx":
/*!*********************************************************************!*\
  !*** ./src/app/statsoverviewdetails/statsoverviewdetails.page.scss ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".custom-card {\n  flex-direction: column !important;\n  background: white !important;\n  border-radius: 4px !important;\n  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.3) !important;\n  padding: 8px 12px;\n}\n\nion-content {\n  --background:white !important;\n}\n\n.file-name {\n  font-size: 1.2em;\n  color: #434343;\n  font-weight: bold;\n  display: table;\n  margin: 0px;\n}\n\n.details {\n  font-size: 1em;\n  color: #434343;\n  display: table;\n}\n\n.address {\n  margin-top: 4px;\n  margin-bottom: 6px;\n  font-size: 0.8em;\n  color: #4272B9;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXHN0YXRzb3ZlcnZpZXdkZXRhaWxzLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGlDQUFBO0VBQ0EsNEJBQUE7RUFDQSw2QkFBQTtFQUNBLHFEQUFBO0VBQ0EsaUJBQUE7QUFDSjs7QUFFRTtFQUNFLDZCQUFBO0FBQ0o7O0FBRUU7RUFDRSxnQkFBQTtFQUNBLGNBQUE7RUFDQSxpQkFBQTtFQUNBLGNBQUE7RUFDQSxXQUFBO0FBQ0o7O0FBRUU7RUFFRSxjQUFBO0VBQ0EsY0FBQTtFQUNBLGNBQUE7QUFBSjs7QUFJRTtFQUNFLGVBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsY0FBQTtBQURKIiwiZmlsZSI6InN0YXRzb3ZlcnZpZXdkZXRhaWxzLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jdXN0b20tY2FyZCB7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uICFpbXBvcnRhbnQ7XHJcbiAgICBiYWNrZ3JvdW5kOiB3aGl0ZSAhaW1wb3J0YW50O1xyXG4gICAgYm9yZGVyLXJhZGl1czogNHB4ICFpbXBvcnRhbnQ7XHJcbiAgICBib3gtc2hhZG93OiAwIDFweCAycHggMCByZ2JhKDAsIDAsIDAsIDAuMykgIWltcG9ydGFudDtcclxuICAgIHBhZGRpbmc6IDhweCAxMnB4O1xyXG4gIH1cclxuXHJcbiAgaW9uLWNvbnRlbnQge1xyXG4gICAgLS1iYWNrZ3JvdW5kOndoaXRlICFpbXBvcnRhbnQ7XHJcbiAgfVxyXG5cclxuICAuZmlsZS1uYW1lIHtcclxuICAgIGZvbnQtc2l6ZTogMS4yZW07XHJcbiAgICBjb2xvcjogIzQzNDM0MztcclxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gICAgZGlzcGxheTp0YWJsZTtcclxuICAgIG1hcmdpbjogMHB4O1xyXG4gIH1cclxuXHJcbiAgLmRldGFpbHMge1xyXG4gICAgXHJcbiAgICBmb250LXNpemU6IDFlbTtcclxuICAgIGNvbG9yOiAjNDM0MzQzO1xyXG4gICAgZGlzcGxheTp0YWJsZTtcclxuICB9XHJcbiAgXHJcbiAgXHJcbiAgLmFkZHJlc3Mge1xyXG4gICAgbWFyZ2luLXRvcDogNHB4O1xyXG4gICAgbWFyZ2luLWJvdHRvbTogNnB4O1xyXG4gICAgZm9udC1zaXplOiAwLjhlbTtcclxuICAgIGNvbG9yOiAjNDI3MkI5O1xyXG4gIH0iXX0= */");

/***/ }),

/***/ "X9w6":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/statsoverviewdetails/statsoverviewdetails.page.html ***!
  \***********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\r\n\r\n  <ion-toolbar>\r\n    <ion-buttons slot=\"start\">\r\n      <ion-menu-button></ion-menu-button>\r\n    </ion-buttons>\r\n    <ion-row>\r\n    <ion-col>\r\n      <h1 class=\"notification-padding ion-no-margin home\">Statistics Details</h1>\r\n  </ion-col>\r\n</ion-row>\r\n    </ion-toolbar>\r\n\r\n    <!--<div style=\"margin-top: 30px;\">\r\n      <ion-row style=\" background-color: rgb(211,211,211); text-align: center;\" >\r\n        <ion-col>\r\n        <ion-label position=\"fixed\" style=\"float: left;\">Filename</ion-label>\r\n      </ion-col>\r\n        <ion-col>\r\n          <ion-label position=\"fixed\" style=\"float: right;\">Status</ion-label>\r\n        </ion-col>\r\n        <ion-col>\r\n          <ion-label position=\"fixed\" style=\"float: right;\">Delivery Date</ion-label>\r\n        </ion-col>\r\n    </ion-row>\r\n  </div>-->\r\n  <ion-content class=\"ion-padding padding-bottom: 250px;position: sticky;\">\r\n    <!--<ion-list><ion-card style=\" background-color: rgb(211,211,211);\">-->\r\n      \r\n    \r\n      \r\n     <!-- <ion-item  *ngFor=\"let data of dataList;\" style=\"text-align: center; font-size: small;\" >\r\n         <ion-col size=\"4\">\r\n       \r\n        <ion-label style=\"float: left\" class=\"item-input ion-label\" >{{data.filename}}</ion-label>\r\n      </ion-col>\r\n        <ion-col size=\"4\">\r\n          <ion-label class=\"item-input ion-label\">{{data.status}}</ion-label>\r\n        </ion-col>\r\n        <ion-col size=\"4\">\r\n          <ion-label style=\"float: right;\" class=\"item-input ion-label\">{{data.deliverydate}}</ion-label>\r\n        </ion-col>\r\n        </ion-item>-->\r\n        <ion-grid>\r\n          <ion-row>\r\n            <ion-col *ngFor=\"let data of dataList;\" size=\"12\">\r\n          <ion-card class=\"ion-no-padding custom-card ion-no-margin\" style=\"height: 100%;\">\r\n            <p class=\"file-name\">{{data.filename}}\r\n            </p>\r\n            <p class=\"address\">{{data.address}}</p>\r\n            <p><span class=\"details\">Designer - {{data.designername}}</span>\r\n              <ion-row>\r\n              <ion-col size=\"5\">End Time : {{data.designingendtime}}</ion-col>\r\n              <ion-col size=\"7\">Start Time : {{data.designingstarttime}}</ion-col>\r\n            </ion-row>\r\n            <ion-row>\r\n              <ion-col size=\"5\">Total Time : {{data.designingtotaltime}}</ion-col>\r\n              <ion-col size=\"7\">Received Date : {{data.designreceiveddate}}</ion-col>\r\n            </ion-row>\r\n            </p>\r\n            <p ><span class=\"details\">Qcuser - {{data.qcuser}}</span>\r\n              <ion-row>\r\n                <ion-col size=\"5\">End Time : {{data.qcendtime}}</ion-col>\r\n                <ion-col size=\"7\">Start Time : {{data.qcstarttime}}</ion-col>\r\n              </ion-row>\r\n              <ion-row>\r\n                <ion-col size=\"5\">Total Time : {{data.qctotaltime}}</ion-col>\r\n                <ion-col size=\"7\">Received Date : {{data.qcdate}}</ion-col>\r\n              </ion-row>\r\n            </p>\r\n            <p>\r\n              <ion-row><ion-col size=\"5\">Status : {{data.status}}</ion-col>\r\n              <ion-col size=\"7\">Delivery Date : {{data.deliverydate}}</ion-col>\r\n              </ion-row>\r\n              <ion-row><ion-col size=\"5\">Error Count : {{data.errorcount}}</ion-col>\r\n                <ion-col size=\"7\">Mounting Type : {{data.mountingtype}}</ion-col>\r\n                </ion-row>\r\n            </p>\r\n           \r\n          </ion-card>\r\n        </ion-col>\r\n        </ion-row>\r\n        </ion-grid>\r\n        \r\n       \r\n  \r\n  </ion-content>");

/***/ }),

/***/ "w3Lq":
/*!*******************************************************************!*\
  !*** ./src/app/statsoverviewdetails/statsoverviewdetails.page.ts ***!
  \*******************************************************************/
/*! exports provided: StatsoverviewdetailsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StatsoverviewdetailsPage", function() { return StatsoverviewdetailsPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_statsoverviewdetails_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./statsoverviewdetails.page.html */ "X9w6");
/* harmony import */ var _statsoverviewdetails_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./statsoverviewdetails.page.scss */ "SYbx");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../api.service */ "yTNM");
/* harmony import */ var _storage_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../storage.service */ "qkCY");
/* harmony import */ var _utilities_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../utilities.service */ "oTnF");










let StatsoverviewdetailsPage = class StatsoverviewdetailsPage {
    constructor(apiService, storageService, utils, router, route, formBuilder, navController) {
        this.apiService = apiService;
        this.storageService = storageService;
        this.utils = utils;
        this.router = router;
        this.route = route;
        this.formBuilder = formBuilder;
        this.navController = navController;
    }
    ngOnInit() {
        this.startDate = this.route.snapshot.paramMap.get('starttime');
        this.endDate = this.route.snapshot.paramMap.get('endtime');
        this.requestType = this.route.snapshot.paramMap.get('requesttype');
        this.id = this.route.snapshot.paramMap.get('id');
        this.name = this.route.snapshot.paramMap.get('name');
        console.log(this.id);
        console.log(this.name);
        if (this.name === 'designer') {
            this.getDesignerDesigns();
        }
        else if (this.name === 'analyst') {
            this.getAnalystDesigns();
        }
        // console.log(this.requestType)
    }
    getDesignerDesigns() {
        this.apiService.getDesignerDesignsForStats(this.startDate, this.endDate, this.requestType, this.id).subscribe(response => {
            this.dataList = response;
            console.log(this.dataList);
        });
    }
    getAnalystDesigns() {
        this.apiService.getAnalystDesignsForStats(this.startDate, this.endDate, this.requestType, this.id).subscribe(response => {
            this.dataList = response;
            console.log(this.dataList);
        });
    }
    ionViewWillLeave() {
    }
};
StatsoverviewdetailsPage.ctorParameters = () => [
    { type: _api_service__WEBPACK_IMPORTED_MODULE_7__["ApiService"] },
    { type: _storage_service__WEBPACK_IMPORTED_MODULE_8__["StorageService"] },
    { type: _utilities_service__WEBPACK_IMPORTED_MODULE_9__["UtilitiesService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"] },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["NavController"] }
];
StatsoverviewdetailsPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-statsoverviewdetails',
        template: _raw_loader_statsoverviewdetails_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_statsoverviewdetails_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], StatsoverviewdetailsPage);



/***/ }),

/***/ "zUb9":
/*!*****************************************************************************!*\
  !*** ./src/app/statsoverviewdetails/statsoverviewdetails-routing.module.ts ***!
  \*****************************************************************************/
/*! exports provided: StatsoverviewdetailsPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StatsoverviewdetailsPageRoutingModule", function() { return StatsoverviewdetailsPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _statsoverviewdetails_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./statsoverviewdetails.page */ "w3Lq");




const routes = [
    {
        path: '',
        component: _statsoverviewdetails_page__WEBPACK_IMPORTED_MODULE_3__["StatsoverviewdetailsPage"]
    }
];
let StatsoverviewdetailsPageRoutingModule = class StatsoverviewdetailsPageRoutingModule {
};
StatsoverviewdetailsPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], StatsoverviewdetailsPageRoutingModule);



/***/ })

}]);
//# sourceMappingURL=statsoverviewdetails-statsoverviewdetails-module.js.map