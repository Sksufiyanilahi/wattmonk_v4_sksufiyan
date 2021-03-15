(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["statistics-details-statistics-details-module"],{

/***/ "+KIM":
/*!***************************************************************!*\
  !*** ./src/app/statistics-details/statistics-details.page.ts ***!
  \***************************************************************/
/*! exports provided: StatisticsDetailsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StatisticsDetailsPage", function() { return StatisticsDetailsPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_statistics_details_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./statistics-details.page.html */ "Qq1S");
/* harmony import */ var _statistics_details_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./statistics-details.page.scss */ "36Hg");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");





let StatisticsDetailsPage = class StatisticsDetailsPage {
    constructor(nav, modalCtrl) {
        this.nav = nav;
        this.modalCtrl = modalCtrl;
    }
    ngOnInit() {
        this.designers = this.nav.get('designersValue');
        this.name = this.nav.get('name');
        //this.name = this.nav.get('name');
        console.log(this.name);
    }
    goBack() {
        this.modalCtrl.dismiss({
            'dismissed': true,
            cancel: 'cancel'
        });
    }
    ionViewWillleave() {
    }
};
StatisticsDetailsPage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["NavParams"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["ModalController"] }
];
StatisticsDetailsPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-statistics-details',
        template: _raw_loader_statistics_details_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_statistics_details_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], StatisticsDetailsPage);



/***/ }),

/***/ "36Hg":
/*!*****************************************************************!*\
  !*** ./src/app/statistics-details/statistics-details.page.scss ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".width {\n  width: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXHN0YXRpc3RpY3MtZGV0YWlscy5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxXQUFBO0FBQ0oiLCJmaWxlIjoic3RhdGlzdGljcy1kZXRhaWxzLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi53aWR0aHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG59Il19 */");

/***/ }),

/***/ "B5IH":
/*!*************************************************************************!*\
  !*** ./src/app/statistics-details/statistics-details-routing.module.ts ***!
  \*************************************************************************/
/*! exports provided: StatisticsDetailsPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StatisticsDetailsPageRoutingModule", function() { return StatisticsDetailsPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _statistics_details_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./statistics-details.page */ "+KIM");




const routes = [
    {
        path: '',
        component: _statistics_details_page__WEBPACK_IMPORTED_MODULE_3__["StatisticsDetailsPage"]
    }
];
let StatisticsDetailsPageRoutingModule = class StatisticsDetailsPageRoutingModule {
};
StatisticsDetailsPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], StatisticsDetailsPageRoutingModule);



/***/ }),

/***/ "Qq1S":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/statistics-details/statistics-details.page.html ***!
  \*******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header >\r\n  <ion-row>\r\n   <ion-col class=\"ion-padding\" style=\"margin-top: 4px; font-size: larger;\" *ngIf=\"name=='analystname'\" size=\"10\">{{designers.analyst}}</ion-col>\r\n    <ion-col class=\"ion-padding\" style=\"margin-top: 4px; font-size: larger;\" *ngIf=\"name=='designername'\" size=\"10\">{{designers.designer}}</ion-col>\r\n    <!-- <ion-col size=\"10\"></ion-col> -->\r\n  <ion-col size=\"auto\">\r\n    <ion-button fill=\"clear\" style=\"margin-top: 6px;\" size=\"small\" class=\"ion-no-padding\" (click)=\"goBack()\">\r\n        <ion-icon style=\"margin-top: 6px;\" name=\"close-outline\" style=\"color: dimgrey;\" size=\"large\"></ion-icon>\r\n    </ion-button>\r\n  </ion-col></ion-row>\r\n  </ion-header>\r\n  <ion-content style=\"height: 170px;\" [scrollEvents]=\"true\">\r\n  \r\n  \r\n    <!--<p>{{designers?.designer}}</p>-->\r\n  \r\n    <ion-list>\r\n      <ion-item>\r\n        <ion-row class=\"width\">\r\n          <ion-col style=\"float: left;\">\r\n            <ion-label style=\"font-size: 14px; float: left;\">Assigned</ion-label>\r\n          </ion-col>\r\n          <ion-col style=\"float: right;\">\r\n            <ion-label style=\"font-size: 14px; float:right\">{{designers.totaldesignscreated}}</ion-label>\r\n          </ion-col>\r\n        </ion-row>\r\n      </ion-item>\r\n      <ion-item>\r\n        <ion-row class=\"width\">\r\n          <ion-col style=\"float: left;\">\r\n            <ion-label style=\"font-size: 14px; float: left;\">On Time</ion-label>\r\n          </ion-col>\r\n          <ion-col style=\"float: right;\">\r\n            <ion-label style=\"font-size: 14px; float:right\">{{designers.ontimedesignscompleted}}</ion-label>\r\n          </ion-col>\r\n        </ion-row>\r\n      </ion-item>\r\n      <ion-item>\r\n        <ion-row class=\"width\">\r\n          <ion-col style=\"float: left;\">\r\n            <ion-label style=\"font-size: 14px; float: left;\">Delayed</ion-label>\r\n          </ion-col>\r\n          <ion-col style=\"float: right;\">\r\n            <ion-label style=\"font-size: 14px; float:right\">{{designers.latedesignscompleted}}</ion-label>\r\n          </ion-col>\r\n        </ion-row>\r\n      </ion-item>\r\n      <ion-item>\r\n        <ion-row class=\"width\">\r\n          <ion-col style=\"float: left;\">\r\n            <ion-label style=\"font-size: 14px; float: left;\">Avg Completion Time</ion-label>\r\n          </ion-col>\r\n          <ion-col style=\"float: right;\">\r\n            <ion-label style=\"font-size: 14px; float:right\">{{designers.avgdesigncompletiontimestamp}}</ion-label>\r\n          </ion-col>\r\n        </ion-row>\r\n      </ion-item>\r\n      <ion-item>\r\n        <ion-row class=\"width\">\r\n          <ion-col style=\"float: left;\">\r\n            <ion-label style=\"font-size: 14px; float: left;\">Avg Review Failure</ion-label>\r\n          </ion-col>\r\n          <ion-col style=\"float: right;\">\r\n            <ion-label style=\"font-size: 14px; float:right\">{{designers.avgreviewfailurecount}}</ion-label>\r\n          </ion-col>\r\n        </ion-row>\r\n      </ion-item>\r\n      <ion-item>\r\n        <ion-row class=\"width\">\r\n    <ion-col style=\"float: left;\">\r\n      <ion-label style=\"font-size: 14px; float: left;\">Monthly Rating</ion-label>\r\n    </ion-col>\r\n    <ion-col style=\"float: right;\">\r\n      <ion-label style=\"font-size: 14px; float:right\">{{designers.monthlyrating}}</ion-label>\r\n    </ion-col>\r\n  </ion-row>\r\n</ion-item>\r\n\r\n    </ion-list>\r\n  </ion-content>\r\n  ");

/***/ }),

/***/ "sjvO":
/*!*****************************************************************!*\
  !*** ./src/app/statistics-details/statistics-details.module.ts ***!
  \*****************************************************************/
/*! exports provided: StatisticsDetailsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StatisticsDetailsPageModule", function() { return StatisticsDetailsPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _statistics_details_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./statistics-details-routing.module */ "B5IH");
/* harmony import */ var _statistics_details_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./statistics-details.page */ "+KIM");







let StatisticsDetailsPageModule = class StatisticsDetailsPageModule {
};
StatisticsDetailsPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _statistics_details_routing_module__WEBPACK_IMPORTED_MODULE_5__["StatisticsDetailsPageRoutingModule"]
        ],
        declarations: [_statistics_details_page__WEBPACK_IMPORTED_MODULE_6__["StatisticsDetailsPage"]]
    })
], StatisticsDetailsPageModule);



/***/ })

}]);
//# sourceMappingURL=statistics-details-statistics-details-module.js.map