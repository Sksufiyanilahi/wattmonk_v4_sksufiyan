(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["statistics-statistics-module"],{

/***/ "5aHE":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/statistics/designers/designers.component.html ***!
  \*****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-content class=\"ion-padding\">\r\n  <h4 style=\"color: gray; text-align: center;\">Designers Statistics</h4>\r\n  <!--<form [formGroup]=\"desginForm\" novalidate style=\"overflow:scroll\">\r\n  <ion-row style=\"margin-top: 10px;\"><ion-col size=\"6\">\r\n    <ion-item class=\"ion-no-padding\">\r\n  <ion-label position=\"floating\">Company Name</ion-label><ion-select interface='popover'  formControlName=\"companyNames\" (ionChange)=\"eventChange($event)\">\r\n    <ion-select-option *ngFor=\"let data of companyList\" [value]=\"data\">{{data.company}}</ion-select-option>\r\n    \r\n  </ion-select></ion-item></ion-col></ion-row></form>-->\r\n  <form [formGroup]=\"desginForm\" novalidate style=\"overflow:scroll\">\r\n    \r\n    <ion-row class=\"ion-margin-top\">\r\n      <ion-col size=\"6\">\r\n          <ion-item class=\"ion-no-padding\">\r\n            <ion-label position=\"floating\" style=\"width: 280px;\">From Date*</ion-label>\r\n              <app-date style=\"width: 180px;\" formControlName=\"startdate\"  required=\"false\"></app-date>\r\n          </ion-item>\r\n      </ion-col>\r\n      \r\n      <ion-col size=\"6\">\r\n        <ion-item class=\"ion-no-padding\">\r\n          <ion-label position=\"floating\">To Date*</ion-label>\r\n            <app-date style=\"width: 180px;\"  formControlName=\"enddate\"  required=\"false\"></app-date>\r\n        </ion-item>\r\n      </ion-col>\r\n      </ion-row>\r\n      <ion-row style=\"margin-top: 30px;\">\r\n        <ion-col ><ion-button color=\"primary\" size=\"small\"  class=\"button-inner\" style=\"min-width: 10em; margin-left: 30%;\" (click)=\"sendValue()\" >Search</ion-button></ion-col>\r\n        </ion-row>\r\n      <ion-row style=\"margin-top: 20px;\">\r\n        <ion-col size=\"4\">\r\n          <ion-item class=\"ion-no-padding\">\r\n            <ion-label position=\"floating\" style=\"font-size: 13px;\">Type</ion-label>\r\n            <ion-select interface=\"popover\" (ionChange)=\"eventTypeChange($event)\" formControlName=\"requesttype\" style=\"font-size:14px;\" value=\"prelim\" >\r\n              <ion-select-option value=\"prelim\" >Prelim</ion-select-option>\r\n              <ion-select-option value=\"permit\">Permit</ion-select-option>\r\n            </ion-select>\r\n          </ion-item>\r\n        </ion-col>\r\n        <ion-col size=\"5\">\r\n        <ion-item class=\"ion-no-padding\">\r\n      <ion-label position=\"floating\" style=\"font-size:13px;\">Select Field</ion-label>\r\n      <ion-select interface='popover' (ionChange)=\"eventFieldsChange($event)\" formControlName=\"filterFields\" style=\"font-size:14px;\" >\r\n      <ion-select-option value=\"Avg Comp Time\">Avg Comp Time</ion-select-option>\r\n      <ion-select-option value=\"Avg Review Failure\">Avg Review Failure</ion-select-option>\r\n      <ion-select-option value=\"Delayed\">Delayed</ion-select-option>\r\n      <ion-select-option value=\"Monthly Rating\">Monthly Rating</ion-select-option> \r\n      <ion-select-option value=\"On Time\">On Time</ion-select-option> \r\n      <ion-select-option value=\"Assigned\">Assigned</ion-select-option> \r\n      </ion-select>\r\n    </ion-item></ion-col>\r\n    \r\n    <ion-col size=\"3\">\r\n      <ion-item class=\"ion-no-padding\">\r\n        <ion-label position=\"floating\" style=\"font-size: 13px;\">Sort</ion-label>\r\n        <ion-select interface=\"popover\" (ionChange)=\"eventSortChange()\" formControlName=\"sort\" style=\"font-size:14px;\" >\r\n          <ion-select-option value=\"hightolow\">High to Low</ion-select-option>\r\n          <ion-select-option value=\"lowtohigh\">Low to High</ion-select-option>\r\n        </ion-select>\r\n      </ion-item>\r\n    </ion-col>\r\n    \r\n      </ion-row>\r\n      <div>\r\n      <ion-row style=\" background-color: rgb(211,211,211); text-align: center;\" >\r\n        <ion-col size=\"6\">\r\n        <ion-label position=\"fixed\" style=\"float: left;\">Designer</ion-label>\r\n      </ion-col>\r\n        <ion-col *ngIf=\"isSelected\">\r\n          <ion-label position=\"fixed\" style=\"float: right;\">{{fieldChangeValue}}</ion-label>\r\n        </ion-col>\r\n        <ion-col></ion-col>\r\n    </ion-row>\r\n  </div>\r\n  <ion-content style=\"height: 140px;\" [scrollEvents]=\"true\" >\r\n    \r\n    \r\n  <ion-list><!--<ion-card style=\" background-color: rgb(211,211,211);\">-->\r\n    \r\n  \r\n    \r\n      <ion-item  *ngFor=\"let designers of designersList;\" style=\"text-align: center; font-size: small;\" >\r\n         <ion-col size=\"7\" >\r\n         <ion-label style=\"float: left\" class=\"clickEnableCls\" (click)=\"details(designers, 'designername')\" >{{designers.designer}}</ion-label>\r\n        </ion-col>\r\n        <ion-col *ngIf=\"isSelected && fieldChangeValue=='Avg Comp Time'\">\r\n          <ion-label style=\"float: right;\" class=\"item-input ion-label\">{{designers.avgdesigncompletiontimestamp}}</ion-label>\r\n        </ion-col>\r\n        <ion-col *ngIf=\"isSelected && fieldChangeValue=='Avg Review Failure'\">\r\n          <ion-label style=\"float: right;\" class=\"item-input ion-label\">{{designers.avgreviewfailurecount}}</ion-label>\r\n        </ion-col>\r\n        <ion-col *ngIf=\"isSelected && fieldChangeValue=='Delayed'\">\r\n          <ion-label style=\"float: right;\" class=\"item-input ion-label\">{{designers.latedesignscompleted}}</ion-label>\r\n        </ion-col>\r\n        <ion-col *ngIf=\"isSelected && fieldChangeValue=='Monthly Rating'\">\r\n          <ion-label style=\"float: right;\" class=\"item-input ion-label\">{{designers.monthlyrating.toFixed()}}</ion-label>\r\n        </ion-col>\r\n        <ion-col *ngIf=\"isSelected && fieldChangeValue=='On Time'\">\r\n          <ion-label style=\"float: right;\" class=\"item-input ion-label\">{{designers.ontimedesignscompleted}}</ion-label>\r\n        </ion-col>\r\n        <ion-col *ngIf=\"isSelected && fieldChangeValue=='Assigned'\">\r\n          <ion-label style=\"float: right;\" class=\"item-input ion-label\">{{designers.totaldesignscreated}}</ion-label>\r\n        </ion-col>\r\n        <ion-col></ion-col>\r\n        <a (click)=\"statsDetails(designers.id)\" style=\"border-bottom: 1px solid skyblue;\">Details</a>\r\n        </ion-item>\r\n       \r\n  </ion-list>\r\n</ion-content>\r\n\r\n\r\n <!-- <div class=\"ion-padding\" style=\"margin-top: 30px;\">\r\n    <ion-card style=\"background-color: white; border-color: white;\">\r\n      <ion-card-header>\r\n        Line Chart\r\n      </ion-card-header>\r\n      <ion-card-content>\r\n        <canvas baseChart  height=\"300vh\"\r\n          [datasets]=\"designersBarChartData\"\r\n          [labels]=\"designersBarChartLabels\"\r\n          [options]=\"designersBarChartOptions\"\r\n          [colors]=\"designersBarChartColors\"\r\n          [plugins]=\"designersBarChartPlugins\"\r\n          [legend]=\"designersBarChartLegend\"\r\n          [chartType]=\"designersBarChartType\">\r\n        </canvas>\r\n      </ion-card-content>\r\n    </ion-card>\r\n    </div>-->\r\n  <!--  <h3 style=\"text-align: center; margin-top: 52px;\">Top Analysts Performer</h3>\r\n    \r\n    <ion-row style=\"margin-top: 20px;\"><ion-col size=\"6\">\r\n      <ion-item class=\"ion-no-padding\">\r\n    <ion-label position=\"floating\">Analysts Name</ion-label><ion-select interface='popover'>\r\n      <ion-select-option *ngFor=\"let analyst of analystList\" [value]=\"data\">{{analyst.prelimAnalysts}}</ion-select-option>\r\n      \r\n    </ion-select></ion-item></ion-col>\r\n    </ion-row>-->\r\n    \r\n    </form>\r\n</ion-content>");

/***/ }),

/***/ "7REG":
/*!***********************************************************!*\
  !*** ./src/app/statistics/designs/designs.component.scss ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("ion-select {\n  max-width: 100% !important;\n  width: 100% !important;\n  padding-left: 0px !important;\n}\n\n.select_div {\n  border-bottom: 1px solid #E1E1E1;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFxkZXNpZ25zLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksMEJBQUE7RUFDQSxzQkFBQTtFQUNBLDRCQUFBO0FBQ0o7O0FBRUU7RUFDRSxnQ0FBQTtBQUNKIiwiZmlsZSI6ImRlc2lnbnMuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJpb24tc2VsZWN0e1xyXG4gICAgbWF4LXdpZHRoOiAxMDAlICFpbXBvcnRhbnQ7XHJcbiAgICB3aWR0aDogMTAwJSAhaW1wb3J0YW50O1xyXG4gICAgcGFkZGluZy1sZWZ0OiAwcHggIWltcG9ydGFudDtcclxuICB9XHJcblxyXG4gIC5zZWxlY3RfZGl2IHtcclxuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjRTFFMUUxO1xyXG4gIH0iXX0= */");

/***/ }),

/***/ "9i+i":
/*!*************************************************!*\
  !*** ./src/app/statistics/statistics.module.ts ***!
  \*************************************************/
/*! exports provided: StatisticsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StatisticsPageModule", function() { return StatisticsPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _statistics_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./statistics-routing.module */ "dKn9");
/* harmony import */ var _statistics_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./statistics.page */ "JMmn");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../shared/shared.module */ "PCNd");
/* harmony import */ var _utilities_utilities_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utilities/utilities.module */ "egEE");
/* harmony import */ var _ionic_native_date_picker_ngx__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic-native/date-picker/ngx */ "ya1t");
/* harmony import */ var _designs_designs_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./designs/designs.component */ "lk6+");
/* harmony import */ var _designers_designers_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./designers/designers.component */ "VS8y");
/* harmony import */ var _analysts_analysts_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./analysts/analysts.component */ "L//P");
/* harmony import */ var ng2_charts__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ng2-charts */ "LPYB");














let StatisticsPageModule = class StatisticsPageModule {
};
StatisticsPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _statistics_routing_module__WEBPACK_IMPORTED_MODULE_5__["StatisticsPageRoutingModule"],
            ng2_charts__WEBPACK_IMPORTED_MODULE_13__["ChartsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
            _shared_shared_module__WEBPACK_IMPORTED_MODULE_7__["SharedModule"],
            _utilities_utilities_module__WEBPACK_IMPORTED_MODULE_8__["UtilitiesModule"]
        ],
        providers: [ng2_charts__WEBPACK_IMPORTED_MODULE_13__["ThemeService"], _ionic_native_date_picker_ngx__WEBPACK_IMPORTED_MODULE_9__["DatePicker"]],
        declarations: [_statistics_page__WEBPACK_IMPORTED_MODULE_6__["StatisticsPage"], _designs_designs_component__WEBPACK_IMPORTED_MODULE_10__["DesignsComponent"], _designers_designers_component__WEBPACK_IMPORTED_MODULE_11__["DesignersComponent"], _analysts_analysts_component__WEBPACK_IMPORTED_MODULE_12__["AnalystsComponent"]]
    })
], StatisticsPageModule);



/***/ }),

/***/ "Bhle":
/*!***************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/statistics/analysts/analysts.component.html ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-content class=\"ion-padding\">\r\n\r\n  <h4 style=\"color: gray; text-align: center;\">Analysts Statistics</h4>\r\n  <form [formGroup]=\"desginForm\" novalidate style=\"overflow:scroll\">\r\n    <ion-row class=\"ion-margin-top\">\r\n      <ion-col size=\"6\">\r\n          <ion-item class=\"ion-no-padding\">\r\n            <ion-label position=\"floating\" style=\"width: 280px;\">From Date*</ion-label>\r\n              <app-date style=\"width: 180px;\" #startdate placeholder=\"DD/MM/YY\" formControlName=\"startdate\"  readonly></app-date>\r\n          </ion-item>\r\n      </ion-col>\r\n      \r\n      <ion-col size=\"6\">\r\n        <ion-item class=\"ion-no-padding\">\r\n          <ion-label position=\"floating\">To Date*</ion-label>\r\n            <app-date style=\"width: 180px;\" #enddate placeholder=\"DD/MM/YY\" formControlName=\"enddate\"  readonly></app-date>\r\n        </ion-item>\r\n      </ion-col>\r\n      </ion-row>\r\n      <ion-row style=\"margin-top: 30px;\">\r\n        <ion-col ><ion-button color=\"primary\" size=\"small\"  class=\"button-inner\" style=\"min-width: 10em; margin-left: 30%;\" (click)=\"sendValue()\" >Search</ion-button></ion-col>\r\n        </ion-row>\r\n      <ion-row style=\"margin-top: 20px;\">\r\n        <ion-col size=\"4\">\r\n          <ion-item class=\"ion-no-padding\">\r\n            <ion-label position=\"floating\" style=\"font-size: 13px;\">Type</ion-label>\r\n            <ion-select interface=\"popover\" (ionChange)=\"eventTypeChange($event)\" formControlName=\"requesttype\" style=\"font-size:14px;\" value=\"prelim\" >\r\n              <ion-select-option value=\"prelim\" >Prelim</ion-select-option>\r\n              <ion-select-option value=\"permit\">Permit</ion-select-option>\r\n            </ion-select>\r\n          </ion-item>\r\n        </ion-col>\r\n        <ion-col size=\"5\">\r\n        <ion-item class=\"ion-no-padding\">\r\n      <ion-label position=\"floating\">Select Field</ion-label>\r\n      <ion-select interface='popover' (ionChange)=\"eventFieldChange($event)\" formControlName=\"filterFields\">\r\n      <ion-select-option value=\"Avg Comp Time\">Avg Comp Time</ion-select-option>\r\n      <ion-select-option value=\"Avg Review Failure\">Avg Review Failure</ion-select-option>\r\n      <ion-select-option value=\"Delayed\">Delayed</ion-select-option>\r\n      <ion-select-option value=\"Monthly Rating\">Monthly Rating</ion-select-option> \r\n      <ion-select-option value=\"On Time\">On Time</ion-select-option> \r\n      <ion-select-option value=\"Assigned\">Assigned</ion-select-option> \r\n      </ion-select>\r\n    </ion-item></ion-col>\r\n    <ion-col size=\"3\">\r\n      <ion-item class=\"ion-no-padding\">\r\n        <ion-label position=\"floating\">Sort</ion-label>\r\n        <ion-select interface=\"popover\" (ionChange)=\"eventSortChange()\" formControlName=\"sort\">\r\n          <ion-select-option value=\"hightolow\">High to Low</ion-select-option>\r\n          <ion-select-option value=\"lowtohigh\">Low to High</ion-select-option>\r\n        </ion-select>\r\n      </ion-item>\r\n    </ion-col>\r\n      </ion-row>\r\n\r\n      <ion-row style=\" background-color: rgb(211,211,211); text-align: center;\">\r\n        <ion-col >\r\n        <ion-label position=\"fixed\" style=\"float: left;\">Analysts</ion-label>\r\n      </ion-col>\r\n      <ion-col *ngIf=\"isSelected\" >\r\n        <ion-label position=\"fixed\" style=\"float: right;\">{{fieldChangeValue}}</ion-label>\r\n      </ion-col>\r\n    </ion-row>\r\n  <ion-content style=\"height: 140px;\" [scrollEvents]=\"true\">\r\n    \r\n    \r\n    <ion-list><!--<ion-card style=\" background-color: rgb(211,211,211);\">-->\r\n      \r\n    \r\n      \r\n        <ion-item  *ngFor=\"let analysts of analystsList;\" style=\"text-align: center; font-size: small;\" >\r\n           <ion-col>\r\n           <ion-label style=\"float: left\" class=\"clickEnableCls\" (click)=\"details(analysts, 'analystname')\" >{{analysts.analyst}}</ion-label>\r\n          </ion-col>\r\n          <ion-col *ngIf=\"isSelected && fieldChangeValue=='Avg Comp Time'\">\r\n            <ion-label style=\"float: right;\" class=\"item-input ion-label\">{{analysts.avgdesigncompletiontime}}</ion-label>\r\n          </ion-col>\r\n          <ion-col *ngIf=\"isSelected && fieldChangeValue=='Avg Review Failure'\">\r\n            <ion-label style=\"float: right;\" class=\"item-input ion-label\">{{analysts.avgreviewfailurecount}}</ion-label>\r\n          </ion-col>\r\n          <ion-col *ngIf=\"isSelected && fieldChangeValue=='Delayed'\">\r\n            <ion-label style=\"float: right;\" class=\"item-input ion-label\">{{analysts.latedesignscompleted}}</ion-label>\r\n          </ion-col>\r\n          <ion-col *ngIf=\"isSelected && fieldChangeValue=='Monthly Rating'\">\r\n            <ion-label style=\"float: right;\" class=\"item-input ion-label\">{{analysts.monthlyrating}}</ion-label>\r\n          </ion-col>\r\n          <ion-col *ngIf=\"isSelected && fieldChangeValue=='On Time'\">\r\n            <ion-label style=\"float: right;\" class=\"item-input ion-label\">{{analysts.ontimedesignscompleted}}</ion-label>\r\n          </ion-col>\r\n          <ion-col *ngIf=\"isSelected && fieldChangeValue=='Assigned'\">\r\n            <ion-label style=\"float: right;\" class=\"item-input ion-label\">{{analysts.totaldesignscreated}}</ion-label>\r\n          </ion-col>\r\n          <ion-col></ion-col>\r\n        <a (click)=\"statsDetails(analysts.id)\" style=\"border-bottom: 1px solid skyblue;\">Details</a>\r\n          </ion-item>\r\n          </ion-list>\r\n          </ion-content>\r\n          </form>\r\n</ion-content>");

/***/ }),

/***/ "Do7N":
/*!*************************************************!*\
  !*** ./src/app/statistics/statistics.page.scss ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".notification-padding {\n  position: relative;\n  padding: 8px;\n}\n\n* {\n  font-family: Arial;\n}\n\nh1 {\n  font-size: 16px;\n}\n\n.select_div {\n  border-bottom: 1px solid #E1E1E1;\n}\n\nion-tab-bar {\n  --border: none;\n}\n\nion-tab-button {\n  font-size: 1em;\n  --color: #9E9E9E;\n  --color-selected: #3c78d8;\n}\n\nion-tab-button[aria-selected=true] {\n  border-bottom: 3px solid #3c78d8;\n  border-bottom-left-radius: 2px;\n  border-bottom-right-radius: 2px;\n}\n\n.tabText {\n  margin-left: 8px;\n  font-size: 1em;\n}\n\n.tab-icon {\n  width: 24px;\n  height: 24px;\n}\n\n.tab {\n  padding-top: 1em;\n  padding-bottom: 1em;\n  padding-bottom: 1em;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.titleTab {\n  text-align: center;\n  color: #898989;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXHN0YXRpc3RpY3MucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksa0JBQUE7RUFDQSxZQUFBO0FBQ0o7O0FBQ0E7RUFDSSxrQkFBQTtBQUVKOztBQUNFO0VBQ0UsZUFBQTtBQUVKOztBQUNFO0VBQ0UsZ0NBQUE7QUFFSjs7QUFBQTtFQUNJLGNBQUE7QUFHSjs7QUFBRTtFQUNFLGNBQUE7RUFDQSxnQkFBQTtFQUNBLHlCQUFBO0FBR0o7O0FBQUE7RUFDSSxnQ0FBQTtFQUNBLDhCQUFBO0VBQ0EsK0JBQUE7QUFHSjs7QUFBQTtFQUNFLGdCQUFBO0VBQ0EsY0FBQTtBQUdGOztBQUFBO0VBQ0UsV0FBQTtFQUNBLFlBQUE7QUFHRjs7QUFEQTtFQUNFLGdCQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0FBSUY7O0FBREE7RUFDRSxrQkFBQTtFQUNBLGNBQUE7QUFJRiIsImZpbGUiOiJzdGF0aXN0aWNzLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5ub3RpZmljYXRpb24tcGFkZGluZyB7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICBwYWRkaW5nOiA4cHg7XHJcbn1cclxuKiB7XHJcbiAgICBmb250LWZhbWlseTogQXJpYWw7XHJcbiAgfVxyXG4gIFxyXG4gIGgxIHtcclxuICAgIGZvbnQtc2l6ZTogMTZweDtcclxuICB9XHJcblxyXG4gIC5zZWxlY3RfZGl2IHtcclxuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjRTFFMUUxO1xyXG4gIH1cclxuaW9uLXRhYi1iYXIge1xyXG4gICAgLS1ib3JkZXI6IG5vbmU7XHJcbn1cclxuXHJcbiAgaW9uLXRhYi1idXR0b24ge1xyXG4gICAgZm9udC1zaXplOiAxZW07XHJcbiAgICAtLWNvbG9yOiAjOUU5RTlFO1xyXG4gICAgLS1jb2xvci1zZWxlY3RlZDogIzNjNzhkODtcclxufVxyXG5cclxuaW9uLXRhYi1idXR0b25bYXJpYS1zZWxlY3RlZD10cnVlXSB7XHJcbiAgICBib3JkZXItYm90dG9tOiAzcHggc29saWQgIzNjNzhkODtcclxuICAgIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDJweDtcclxuICAgIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAycHg7XHJcbn1cclxuICBcclxuLnRhYlRleHQge1xyXG4gIG1hcmdpbi1sZWZ0OiA4cHg7XHJcbiAgZm9udC1zaXplOiAxZW07XHJcbn1cclxuXHJcbi50YWItaWNvbiB7XHJcbiAgd2lkdGg6IDI0cHg7XHJcbiAgaGVpZ2h0OiAyNHB4O1xyXG59XHJcbi50YWIge1xyXG4gIHBhZGRpbmctdG9wOiAxZW07XHJcbiAgcGFkZGluZy1ib3R0b206IDFlbTtcclxuICBwYWRkaW5nLWJvdHRvbTogMWVtO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxufVxyXG5cclxuLnRpdGxlVGFiIHtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgY29sb3I6ICM4OTg5ODk7XHJcbiAgLy8gICAgIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCAjRDk3MjZEO1xyXG59XHJcbiJdfQ== */");

/***/ }),

/***/ "JMmn":
/*!***********************************************!*\
  !*** ./src/app/statistics/statistics.page.ts ***!
  \***********************************************/
/*! exports provided: StatisticsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StatisticsPage", function() { return StatisticsPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_statistics_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./statistics.page.html */ "bgkC");
/* harmony import */ var _statistics_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./statistics.page.scss */ "Do7N");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "tyNb");





let StatisticsPage = class StatisticsPage {
    constructor(route) {
        this.route = route;
        this.isSelected = false;
    }
    ngOnInit() {
        this.isSelected = true;
        this.route.navigate(['statistics/designs']);
    }
    segmentChanged(event) {
        //if(this.userData.role.type=='wattmonkadmins' || this.userData.role.name=='Admin'  || this.userData.role.name=='ContractorAdmin' || this.userData.role.name=='BD' ){
        console.log(event);
        if (event.target.value == 'designs') {
            this.route.navigate(['statistics/designs']);
            // return this.segments;
        }
        else if (event.target.value == 'designers') {
            this.route.navigate(['statistics/designers']);
            // return this.segments;
        }
        else if (event.target.value == 'analysts') {
            this.route.navigate(['statistics/analysts']);
            // return this.segments;
        }
    }
    ngOnDestroy() {
        //Called once, before the instance is destroyed.
    }
};
StatisticsPage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] }
];
StatisticsPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-statistics',
        template: _raw_loader_statistics_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_statistics_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], StatisticsPage);



/***/ }),

/***/ "L//P":
/*!***********************************************************!*\
  !*** ./src/app/statistics/analysts/analysts.component.ts ***!
  \***********************************************************/
/*! exports provided: AnalystsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnalystsComponent", function() { return AnalystsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_analysts_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./analysts.component.html */ "Bhle");
/* harmony import */ var _analysts_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./analysts.component.scss */ "tWH0");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var src_app_api_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/api.service */ "yTNM");
/* harmony import */ var src_app_model_constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/model/constants */ "Kp5Z");
/* harmony import */ var src_app_statistics_details_statistics_details_page__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/statistics-details/statistics-details.page */ "+KIM");
/* harmony import */ var src_app_utilities_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/utilities.service */ "oTnF");











let AnalystsComponent = class AnalystsComponent {
    constructor(service, modalController, formBuilder, utilities, router) {
        this.service = service;
        this.modalController = modalController;
        this.formBuilder = formBuilder;
        this.utilities = utilities;
        this.router = router;
        this.isSelected = false;
        //public analystValue:analysts[]=[];
        this.analystsList = [];
        this.desginForm = this.formBuilder.group({
            startdate: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](''),
            enddate: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](''),
            filterFields: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](''),
            sort: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](''),
            requesttype: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('prelim')
        });
    }
    ngOnInit() {
        this.getAnalystsPerformer();
        this.isSelected = true;
        this.subscription = this.utilities.getScheduleFormEvent().subscribe((event) => {
            if (event === src_app_model_constants__WEBPACK_IMPORTED_MODULE_8__["ScheduleFormEvent"].SEND_ANALYSTS_VALUE) {
                console.log(event);
                this.fetchFilteredStatisticsAnalysts();
            }
        });
    }
    // getAnalystsPerformer(){
    //   const date = new Date();
    //       const starttime=date.getFullYear()+'-01-01T06:30:00.000Z'.toString();
    //       const endtime = date.getFullYear()+'-12-31T06:30:00.000Z'.toString();
    //   this.service.getanalystanalytics(starttime, endtime).subscribe(
    //     response => {
    //       this.analystsList = response;
    //     })
    // }
    getAnalystsPerformer() {
        const date = new Date();
        this.starttime = date.getFullYear() + '-01-01T06:30:00.000Z'.toString();
        this.endtime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-0' + date.getDate() + 'T06:30:00.000Z'.toString(); //'-12-31T06:30:00.000Z'.toString();
        var requesttype = this.desginForm.get('requesttype').value;
        this.service.getanalystanalytics(this.starttime, this.endtime, requesttype).subscribe(response => {
            this.analystsList = response;
        });
    }
    fetchFilteredStatisticsAnalysts() {
        var startDate = new Date(this.desginForm.get('startdate').value);
        startDate.setDate(startDate.getDate() + 1);
        console.log("date", startDate);
        var endDate = new Date(this.desginForm.get('enddate').value);
        endDate.setDate(endDate.getDate() + 1);
        this.starttime = startDate.toISOString();
        this.endtime = endDate.toISOString();
        var requesttype = this.desginForm.get('requesttype').value;
        this.service.getanalystanalytics(this.starttime, this.endtime, requesttype).subscribe(response => {
            this.analystsList = response;
            /*  this.designers=response;
              this.designers.forEach(element =>{
                this.designerValue.push({designer:element.designer,avgdesigncompletiontime:element.avgdesigncompletiontime,avgreviewfailurecount:element.avgreviewfailurecount,
                  latedesignscompleted:element.latedesignscompleted, monthlyrating:element.monthlyrating, ontimedesignscompleted:element.ontimedesignscompleted,totaldesignscreated:element.totaldesignscreated})
              })*/
            // this.changeDetectorRef.detectChanges();
        });
    }
    details(value, name) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let designers = value;
            let analystName = name;
            const modal = yield this.modalController.create({
                component: src_app_statistics_details_statistics_details_page__WEBPACK_IMPORTED_MODULE_9__["StatisticsDetailsPage"],
                cssClass: 'my-custom-modal-css',
                componentProps: {
                    // id:id
                    designersValue: designers,
                    name: analystName
                },
                backdropDismiss: false
            });
            modal.onDidDismiss().then((data) => {
                console.log(data);
                if (data.data.cancel == 'cancel') {
                } //else{
                // this.getDesigns(null)
                // }
            });
            // modal.dismiss(() => {
            //   ;
            //   this.getDesigns(null);
            // });
            return yield modal.present();
        });
    }
    eventFieldChange(event) {
        this.isSelected = true;
        this.fieldChangeValue = event.target.value;
        this.eventSortChange();
        console.log("hg", this.isSelected);
    }
    eventSortChange() {
        this.sortChangeValue = this.desginForm.get('sort').value;
        console.log(this.sortChangeValue);
        if (this.sortChangeValue == 'lowtohigh') {
            if (this.fieldChangeValue == 'Avg Comp Time') {
                this.analystsList = this.analystsList.sort((a, b) => a.avgdesigncompletiontime - b.avgdesigncompletiontime);
                // console.log("Average");
            }
            else if (this.fieldChangeValue == 'Avg Review Failure') {
                this.analystsList = this.analystsList.sort((a, b) => a.avgreviewfailurecount - b.avgreviewfailurecount);
                console.log("Average Review");
            }
            else if (this.fieldChangeValue == 'Delayed') {
                this.analystsList = this.analystsList.sort((a, b) => a.latedesignscompleted - b.latedesignscompleted);
            }
            else if (this.fieldChangeValue == 'Monthly Rating') {
                this.analystsList = this.analystsList.sort((a, b) => a.monthlyrating - b.monthlyrating);
            }
            else if (this.fieldChangeValue == 'On Time') {
                this.analystsList = this.analystsList.sort((a, b) => a.ontimedesignscompleted - b.ontimedesignscompleted);
            }
            else if (this.fieldChangeValue == 'Assigned') {
                this.analystsList = this.analystsList.sort((a, b) => a.totaldesignscreated - b.totaldesignscreated);
            }
            //this.designersList = this.designersList.sort((a:any,b:any)  => a.i-b.i);
        }
        else if (this.sortChangeValue == 'hightolow') {
            if (this.fieldChangeValue == 'Avg Comp Time') {
                this.analystsList = this.analystsList.sort((a, b) => b.avgdesigncompletiontime - a.avgdesigncompletiontime);
                console.log("Average");
            }
            else if (this.fieldChangeValue == 'Avg Review Failure') {
                this.analystsList = this.analystsList.sort((a, b) => b.avgreviewfailurecount - a.avgreviewfailurecount);
                console.log("Average Review");
            }
            else if (this.fieldChangeValue == 'Delayed') {
                this.analystsList = this.analystsList.sort((a, b) => b.latedesignscompleted - a.latedesignscompleted);
            }
            else if (this.fieldChangeValue == 'Monthly Rating') {
                this.analystsList = this.analystsList.sort((a, b) => b.monthlyrating - a.monthlyrating);
            }
            else if (this.fieldChangeValue == 'On Time') {
                this.analystsList = this.analystsList.sort((a, b) => b.ontimedesignscompleted - a.ontimedesignscompleted);
            }
            else if (this.fieldChangeValue == 'Assigned') {
                this.analystsList = this.analystsList.sort((a, b) => b.totaldesignscreated - a.totaldesignscreated);
            }
        }
    }
    sendValue() {
        if (this.desginForm.get('enddate').value > this.desginForm.get('startdate').value) {
            this.utilities.setScheduleFormEvent(src_app_model_constants__WEBPACK_IMPORTED_MODULE_8__["ScheduleFormEvent"].SEND_ANALYSTS_VALUE);
        }
        else if (this.desginForm.get('startdate').value == '') {
            this.utilities.errorSnackBar("Please fill Start Date");
        }
        else if (this.desginForm.get('enddate').value == '') {
            this.utilities.errorSnackBar("Please fill End Date");
        }
        else {
            this.utilities.errorSnackBar("Invalid End Date");
        }
    }
    eventTypeChange(event) {
        this.requestTypeValue = event.target.value;
        console.log(this.requestTypeValue);
        this.getAnalystsPerformer();
    }
    statsDetails(e) {
        console.log("Hello");
        this.analystId = e;
        this.router.navigate(['/statsoverviewdetails', { starttime: this.starttime, endtime: this.endtime, requesttype: this.desginForm.get('requesttype').value, id: this.analystId, name: 'analyst' }]);
    }
};
AnalystsComponent.ctorParameters = () => [
    { type: src_app_api_service__WEBPACK_IMPORTED_MODULE_7__["ApiService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["ModalController"] },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"] },
    { type: src_app_utilities_service__WEBPACK_IMPORTED_MODULE_10__["UtilitiesService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"] }
];
AnalystsComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-analysts',
        template: _raw_loader_analysts_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_analysts_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], AnalystsComponent);



/***/ }),

/***/ "VS8y":
/*!*************************************************************!*\
  !*** ./src/app/statistics/designers/designers.component.ts ***!
  \*************************************************************/
/*! exports provided: DesignersComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DesignersComponent", function() { return DesignersComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_designers_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./designers.component.html */ "5aHE");
/* harmony import */ var _designers_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./designers.component.scss */ "ZBWI");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _ionic_native_date_picker_ngx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic-native/date-picker/ngx */ "ya1t");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var src_app_api_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/api.service */ "yTNM");
/* harmony import */ var src_app_model_constants__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/model/constants */ "Kp5Z");
/* harmony import */ var src_app_statistics_details_statistics_details_page__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/statistics-details/statistics-details.page */ "+KIM");
/* harmony import */ var src_app_utilities_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/utilities.service */ "oTnF");












let DesignersComponent = class DesignersComponent {
    constructor(service, datePicker, modalController, formBuilder, utilities, router) {
        this.service = service;
        this.datePicker = datePicker;
        this.modalController = modalController;
        this.formBuilder = formBuilder;
        this.utilities = utilities;
        this.router = router;
        //designers:any=[];
        this.designersList = [];
        this.isSelected = false;
        this.topAnalyst = [];
        this.analystCount = [];
        this.desginForm = this.formBuilder.group({
            startdate: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](new Date().getTime(), [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]),
            enddate: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](new Date().getTime(), [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]),
            filterFields: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](''),
            sort: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](''),
            requesttype: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('prelim')
        });
    }
    ngOnInit() {
        this.fetchStatisticsDesigners();
        this.isSelected = false;
        this.subscription = this.utilities.getScheduleFormEvent().subscribe((event) => {
            if (event === src_app_model_constants__WEBPACK_IMPORTED_MODULE_9__["ScheduleFormEvent"].SEND_DESIGNERS_VALUE) {
                console.log(event);
                this.fetchFilteredStatisticsDesigners();
            }
        });
    }
    //   fetchStatisticsDesigners(){
    //     const date = new Date();
    //       const starttime=date.getFullYear()+'-01-01T06:30:00.000Z'.toString();
    //       const endtime = date.getFullYear()+'-12-31T06:30:00.000Z'.toString();
    //     this.service.getDesignersDetails(starttime, endtime).subscribe(
    //       response =>{
    //         this.designersList = response;// = response;
    //         /*this.designers=response;
    //         this.designers.forEach(element =>{
    //           this.designerValue.push({designer:element.designer,avgdesigncompletiontime:element.avgdesigncompletiontime,avgreviewfailurecount:element.avgreviewfailurecount,
    //             latedesignscompleted:element.latedesignscompleted, monthlyrating:element.monthlyrating, ontimedesignscompleted:element.ontimedesignscompleted,totaldesignscreated:element.totaldesignscreated})
    //         })*/
    //        // this.changeDetectorRef.detectChanges();
    //       }
    //     )
    // }
    fetchStatisticsDesigners() {
        const date = new Date();
        this.starttime = date.getFullYear() + '-01-01T06:30:00.000Z'.toString();
        this.endtime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-0' + date.getDate() + 'T06:30:00.000Z'.toString();
        var requesttype = this.desginForm.get('requesttype').value;
        this.service.getDesignersDetails(this.starttime, this.endtime, requesttype).subscribe(response => {
            this.designersList = response; // = response;
            /*this.designers=response;
            this.designers.forEach(element =>{
              this.designerValue.push({designer:element.designer,avgdesigncompletiontime:element.avgdesigncompletiontime,avgreviewfailurecount:element.avgreviewfailurecount,
                latedesignscompleted:element.latedesignscompleted, monthlyrating:element.monthlyrating, ontimedesignscompleted:element.ontimedesignscompleted,totaldesignscreated:element.totaldesignscreated})
            })*/
            // this.changeDetectorRef.detectChanges();
        });
    }
    fetchFilteredStatisticsDesigners() {
        var startDate = new Date(this.desginForm.get('startdate').value);
        startDate.setDate(startDate.getDate() + 1);
        console.log("date", startDate);
        var endDate = new Date(this.desginForm.get('enddate').value);
        endDate.setDate(endDate.getDate() + 1);
        this.starttime = startDate.toISOString();
        this.endtime = endDate.toISOString();
        var requesttype = this.desginForm.get('requesttype').value;
        this.service.getDesignersDetails(this.starttime, this.endtime, requesttype).subscribe(response => {
            this.designersList = response;
            /*  this.designers=response;
              this.designers.forEach(element =>{
                this.designerValue.push({designer:element.designer,avgdesigncompletiontime:element.avgdesigncompletiontime,avgreviewfailurecount:element.avgreviewfailurecount,
                  latedesignscompleted:element.latedesignscompleted, monthlyrating:element.monthlyrating, ontimedesignscompleted:element.ontimedesignscompleted,totaldesignscreated:element.totaldesignscreated})
              })
              */
            // this.changeDetectorRef.detectChanges();
        });
    }
    details(value, name) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let designers = value;
            let designerName = name;
            const modal = yield this.modalController.create({
                component: src_app_statistics_details_statistics_details_page__WEBPACK_IMPORTED_MODULE_10__["StatisticsDetailsPage"],
                cssClass: 'my-custom-modal-css',
                componentProps: {
                    // id:id
                    designersValue: designers,
                    name: designerName
                },
                backdropDismiss: false
            });
            modal.onDidDismiss().then((data) => {
                console.log(data);
                if (data.data.cancel == 'cancel') {
                } //else{
                // this.getDesigns(null)
                // }
            });
            // modal.dismiss(() => {
            //   ;
            //   this.getDesigns(null);
            // });
            return yield modal.present();
        });
    }
    eventFieldsChange(event) {
        this.isSelected = true;
        this.fieldChangeValue = event.target.value;
        this.eventSortChange();
    }
    eventTypeChange(event) {
        this.requestTypeValue = event.target.value;
        console.log(this.requestTypeValue);
        this.fetchStatisticsDesigners();
    }
    eventSortChange() {
        this.sortChangeValue = this.desginForm.get('sort').value;
        console.log(this.sortChangeValue);
        if (this.sortChangeValue == 'lowtohigh') {
            if (this.fieldChangeValue == 'Avg Comp Time') {
                this.designersList = this.designersList.sort((a, b) => a.avgdesigncompletiontime - b.avgdesigncompletiontime);
                console.log("Average");
            }
            else if (this.fieldChangeValue == 'Avg Review Failure') {
                this.designersList = this.designersList.sort((a, b) => a.avgreviewfailurecount - b.avgreviewfailurecount);
                console.log("Average Review");
            }
            else if (this.fieldChangeValue == 'Delayed') {
                this.designersList = this.designersList.sort((a, b) => a.latedesignscompleted - b.latedesignscompleted);
            }
            else if (this.fieldChangeValue == 'Monthly Rating') {
                this.designersList = this.designersList.sort((a, b) => a.monthlyrating - b.monthlyrating);
            }
            else if (this.fieldChangeValue == 'On Time') {
                this.designersList = this.designersList.sort((a, b) => a.ontimedesignscompleted - b.ontimedesignscompleted);
            }
            else if (this.fieldChangeValue == 'Assigned') {
                this.designersList = this.designersList.sort((a, b) => a.totaldesignscreated - b.totaldesignscreated);
            }
            //this.designersList = this.designersList.sort((a:any,b:any)  => a.i-b.i);
        }
        else if (this.sortChangeValue == 'hightolow') {
            if (this.fieldChangeValue == 'Avg Comp Time') {
                this.designersList = this.designersList.sort((a, b) => b.avgdesigncompletiontime - a.avgdesigncompletiontime);
                console.log("Average");
            }
            else if (this.fieldChangeValue == 'Avg Review Failure') {
                this.designersList = this.designersList.sort((a, b) => b.avgreviewfailurecount - a.avgreviewfailurecount);
                console.log("Average Review");
            }
            else if (this.fieldChangeValue == 'Delayed') {
                this.designersList = this.designersList.sort((a, b) => b.latedesignscompleted - a.latedesignscompleted);
            }
            else if (this.fieldChangeValue == 'Monthly Rating') {
                this.designersList = this.designersList.sort((a, b) => b.monthlyrating - a.monthlyrating);
            }
            else if (this.fieldChangeValue == 'On Time') {
                this.designersList = this.designersList.sort((a, b) => b.ontimedesignscompleted - a.ontimedesignscompleted);
            }
            else if (this.fieldChangeValue == 'Assigned') {
                this.designersList = this.designersList.sort((a, b) => b.totaldesignscreated - a.totaldesignscreated);
            }
        }
    }
    sendValue() {
        if (this.desginForm.get('enddate').value >= this.desginForm.get('startdate').value) {
            this.utilities.setScheduleFormEvent(src_app_model_constants__WEBPACK_IMPORTED_MODULE_9__["ScheduleFormEvent"].SEND_DESIGNERS_VALUE);
        }
        else if (this.desginForm.get('startdate').value == '') {
            this.utilities.errorSnackBar("Please fill Start Date");
        }
        else if (this.desginForm.get('enddate').value == '') {
            this.utilities.errorSnackBar("Please fill End Date");
        }
        else {
            this.utilities.errorSnackBar("Invalid End Date");
        }
    }
    statsDetails(e) {
        console.log("Hello");
        this.designerId = e;
        console.log("Hello", this.designerId);
        this.router.navigate(['/statsoverviewdetails', {
                starttime: this.starttime,
                endtime: this.endtime,
                requesttype: this.desginForm.get('requesttype').value,
                id: this.designerId,
                name: 'designer'
            }]);
    }
};
DesignersComponent.ctorParameters = () => [
    { type: src_app_api_service__WEBPACK_IMPORTED_MODULE_8__["ApiService"] },
    { type: _ionic_native_date_picker_ngx__WEBPACK_IMPORTED_MODULE_6__["DatePicker"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_7__["ModalController"] },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"] },
    { type: src_app_utilities_service__WEBPACK_IMPORTED_MODULE_11__["UtilitiesService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"] }
];
DesignersComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-designers',
        template: _raw_loader_designers_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_designers_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], DesignersComponent);



/***/ }),

/***/ "ZBWI":
/*!***************************************************************!*\
  !*** ./src/app/statistics/designers/designers.component.scss ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".text {\n  word-wrap: break-word;\n  /* IE 5.5-7 */\n  white-space: pre-wrap;\n}\n\n.verticalLine {\n  width: 1%;\n  height: 50px;\n  background: green;\n  margin-top: 0;\n  position: relative;\n  margin-left: 10%;\n}\n\n.container {\n  width: 400px;\n  background-color: green;\n  overflow: hidden;\n  white-space: nowrap;\n}\n\n.container ::-webkit-scrollbar {\n  display: none;\n}\n\n.container .scroll {\n  overflow: auto;\n}\n\n.container .clickEnableCls {\n  pointer-events: visible !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFxkZXNpZ25lcnMuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxxQkFBQTtFQUE0QixhQUFBO0VBQzVCLHFCQUFBO0FBRUo7O0FBQ0E7RUFDSSxTQUFBO0VBQ0EsWUFBQTtFQUNBLGlCQUFBO0VBQ0EsYUFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7QUFFSjs7QUFDRTtFQUNFLFlBQUE7RUFDQSx1QkFBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7QUFFSjs7QUFESTtFQUNFLGFBQUE7QUFHTjs7QUFBSTtFQUNFLGNBQUE7QUFFTjs7QUFBSTtFQUNFLGtDQUFBO0FBRU4iLCJmaWxlIjoiZGVzaWduZXJzLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnRleHR7XHJcbiAgICB3b3JkLXdyYXA6IGJyZWFrLXdvcmQ7ICAgICAgLyogSUUgNS41LTcgKi9cclxuICAgIHdoaXRlLXNwYWNlOiBwcmUtd3JhcDsgICBcclxufVxyXG5cclxuLnZlcnRpY2FsTGluZSB7XHJcbiAgICB3aWR0aDoxJTtcclxuICAgIGhlaWdodDo1MHB4O1xyXG4gICAgYmFja2dyb3VuZDpncmVlbjtcclxuICAgIG1hcmdpbi10b3A6IDA7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICBtYXJnaW4tbGVmdDogMTAlO1xyXG4gIH1cclxuXHJcbiAgLmNvbnRhaW5lciB7XHJcbiAgICB3aWR0aDogNDAwcHg7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBncmVlbjtcclxuICAgIG92ZXJmbG93OiBoaWRkZW47IFxyXG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcclxuICAgIDo6LXdlYmtpdC1zY3JvbGxiYXIge1xyXG4gICAgICBkaXNwbGF5OiBub25lO1xyXG4gICAgfVxyXG5cclxuICAgIC5zY3JvbGwge1xyXG4gICAgICBvdmVyZmxvdzogYXV0bztcclxuICAgIH1cclxuICAgIC5jbGlja0VuYWJsZUNsc3tcclxuICAgICAgcG9pbnRlci1ldmVudHM6IHZpc2libGUgIWltcG9ydGFudDtcclxuICAgfVxyXG4gIH0iXX0= */");

/***/ }),

/***/ "bgkC":
/*!***************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/statistics/statistics.page.html ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (" <!--<ion-header>-->\r\n    \r\n      <ion-toolbar>\r\n        <ion-buttons slot=\"start\">\r\n          <ion-menu-button></ion-menu-button>\r\n        </ion-buttons>\r\n        <ion-row>\r\n        <ion-col>\r\n          <h1 class=\"notification-padding ion-no-margin home\">Statistics</h1>\r\n      </ion-col>\r\n    </ion-row>\r\n        </ion-toolbar>\r\n       <!-- <ion-grid> <ion-grid> -->\r\n       <!-- </ion-header>-->\r\n       <ion-content style=\"position: relative;\">    <ion-grid>\r\n       <ion-tabs (click)=\"segmentChanged($event)\" value=\"Prelim\">\r\n          <ion-tab-bar slot=\"top\" class=\"ion-no-border\">\r\n              <ion-tab-button tab=\"designs\" *ngIf=\"isSelected\">\r\n                  <ion-label>Companies</ion-label>\r\n              </ion-tab-button>\r\n              <ion-tab-button tab=\"designers\">\r\n                  <ion-label>Designers</ion-label>\r\n              </ion-tab-button>\r\n              <ion-tab-button tab=\"analysts\">\r\n                <ion-label>Analysts</ion-label>\r\n            </ion-tab-button>\r\n          </ion-tab-bar>\r\n        </ion-tabs>\r\n  \r\n      </ion-grid>\r\n      \r\n       \r\n          \r\n </ion-content>\r\n");

/***/ }),

/***/ "dKn9":
/*!*********************************************************!*\
  !*** ./src/app/statistics/statistics-routing.module.ts ***!
  \*********************************************************/
/*! exports provided: StatisticsPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StatisticsPageRoutingModule", function() { return StatisticsPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _analysts_analysts_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./analysts/analysts.component */ "L//P");
/* harmony import */ var _designers_designers_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./designers/designers.component */ "VS8y");
/* harmony import */ var _designs_designs_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./designs/designs.component */ "lk6+");
/* harmony import */ var _statistics_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./statistics.page */ "JMmn");







const routes = [
    {
        path: '',
        component: _statistics_page__WEBPACK_IMPORTED_MODULE_6__["StatisticsPage"],
        children: [
            // { path: 'design', loadChildren: () => import(`./design/design.module`).then(m => m.DesignModule) },
            {
                path: 'designs',
                component: _designs_designs_component__WEBPACK_IMPORTED_MODULE_5__["DesignsComponent"]
            },
            {
                path: 'designers',
                component: _designers_designers_component__WEBPACK_IMPORTED_MODULE_4__["DesignersComponent"]
            },
            {
                path: 'analysts',
                component: _analysts_analysts_component__WEBPACK_IMPORTED_MODULE_3__["AnalystsComponent"]
            }
        ]
    }
];
let StatisticsPageRoutingModule = class StatisticsPageRoutingModule {
};
StatisticsPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], StatisticsPageRoutingModule);



/***/ }),

/***/ "kXvU":
/*!*************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/statistics/designs/designs.component.html ***!
  \*************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-content >\r\n  <form [formGroup]=\"desginForm\" novalidate style=\"overflow:scroll\" class=\"ion-padding\">\r\n    <ion-row style=\"margin-top: 20px;\"><ion-col size=\"6\">\r\n    <ion-item class=\"ion-no-padding\">\r\n  <ion-label position=\"floating\">Company Name</ion-label><ion-select class=\"form_input select_div\" interface='popover'  formControlName=\"company\" (ionChange)=\"eventCompanyChange($event)\">\r\n    <ion-select-option *ngFor=\"let data of companyList\" [value]=\"data\">{{data.company}}</ion-select-option>\r\n    \r\n  </ion-select></ion-item></ion-col>\r\n  <ion-col>\r\n  <ion-item class=\"ion-no-padding\">\r\n  <ion-label position=\"floating\">Filter Dates</ion-label>\r\n  <!-- <ion-select interface='popover' formControlName=\"filterDates\">\r\n    \r\n  <ion-select-option *ngFor=\"let filter of filteredList\" [value]=\"filter\">{{filter}}</ion-select-option>-->\r\n  <ion-select class=\"form_input select_div\" interface='popover' (ionChange)=\"eventDatesChange($event)\" formControlName=\"filterDates\" value=\"current\">\r\n    <ion-select-option value=\"current\">Current Month</ion-select-option>\r\n  <ion-select-option value=\"previous\">Previous Month</ion-select-option>\r\n  <ion-select-option value=\"quarter\">Previous Quarter</ion-select-option>\r\n  <ion-select-option value=\"customs\">Customs Dates</ion-select-option> \r\n  </ion-select>\r\n  </ion-item>\r\n  </ion-col>\r\n  \r\n  <!--<ion-row class=\"ion-margin-top\" *ngIf=\"showValue=='customs'\">\r\n  <ion-col size=\"6\">\r\n      <ion-item class=\"ion-no-padding\">\r\n        <ion-label position=\"floating\" style=\"width: 280px;\">From</ion-label>\r\n          <ion-input style=\"width: 180px;\" type=\"date\" placeholder=\"YY/MM/DD\" (click)=\"showDate()\" formControlName=\"startdate\" readonly>{{myDate}}</ion-input>\r\n      </ion-item>\r\n  </ion-col>\r\n  \r\n  <ion-col size=\"6\">\r\n    <ion-item class=\"ion-no-padding\">\r\n      <ion-label position=\"floating\">To</ion-label>\r\n        <ion-input style=\"width: 180px;\" type=\"date\"  placeholder=\"YY/MM/DD\" (click)=\"showDateValue()\" formControlName=\"enddate\" readonly>{{mydates}}</ion-input>\r\n    </ion-item>\r\n  </ion-col>\r\n  </ion-row>-->\r\n  \r\n  <ion-row class=\"ion-margin-top\" *ngIf=\"dateChangeValue=='customs'\">\r\n    <ion-col size=\"6\">\r\n        <ion-item class=\"ion-no-padding\">\r\n          <ion-label position=\"floating\" style=\"width: 280px;\">From Date*</ion-label>\r\n            <app-date style=\"width: 180px;\" formControlName=\"startdate\" readonly></app-date>\r\n        </ion-item>\r\n    </ion-col>\r\n    \r\n    <ion-col size=\"6\">\r\n      <ion-item class=\"ion-no-padding\">\r\n        <ion-label position=\"floating\">To Date*</ion-label>\r\n          <app-date style=\"width: 180px;\"   formControlName=\"enddate\" readonly></app-date>\r\n      </ion-item>\r\n    </ion-col>\r\n    </ion-row>\r\n  </ion-row>\r\n  \r\n  </form>\r\n  <ion-row style=\"margin-top: 30px;\" *ngIf=\"dateChangeValue=='customs'\">\r\n  <ion-col ><ion-button color=\"primary\" size=\"small\"  class=\"button-inner\" style=\"min-width: 10em; margin-left: 30%;\" (click)=\"sendValue()\" >Search</ion-button></ion-col>\r\n  </ion-row>\r\n   <!--<form [formGroup]=\"desginForm\" novalidate style=\"overflow:scroll\">\r\n   <ion-row>\r\n   <ion-col size=\"6\">\r\n    <ion-item class=\"ion-no-padding\">\r\n        <ion-label position=\"floating\">Company Name</ion-label>\r\n        <ion-select class=\"form_input select_div\" placeholder=\"company name\"\r\n                        ok-text=\"\"\r\n                    cancel-text=\"\"\r\n                    formControlName=\"companyName\" interface=\"popover\" value=\"false\"  >\r\n            <ion-select-option  value=\"true\">Yes</ion-select-option>\r\n        </ion-select>\r\n    </ion-item>\r\n  </ion-col>\r\n  </ion-row>\r\n  </form>--> \r\n    <h3></h3>\r\n    <div class=\"ion-padding\" style=\"margin-top: 30px;\">\r\n      <ion-card style=\"background-color: white; border-color: white;\">\r\n        <ion-card-header>\r\n          Bar Chart\r\n        </ion-card-header>\r\n        <ion-card-content>\r\n          <canvas baseChart  height=\"350vh\"\r\n            [datasets]=\"barChartData\"\r\n            [labels]=\"barChartLabels\"\r\n            [options]=\"barChartOptions\"\r\n            [colors]=\"lineChartColors\"\r\n            [plugins]=\"barChartPlugins\"\r\n            [legend]=\"barChartLegend\"\r\n            [chartType]=\"barChartType\">\r\n          </canvas>\r\n        </ion-card-content>\r\n      </ion-card>\r\n      </div>\r\n  \r\n    </ion-content>");

/***/ }),

/***/ "lk6+":
/*!*********************************************************!*\
  !*** ./src/app/statistics/designs/designs.component.ts ***!
  \*********************************************************/
/*! exports provided: DesignsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DesignsComponent", function() { return DesignsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_designs_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./designs.component.html */ "kXvU");
/* harmony import */ var _designs_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./designs.component.scss */ "7REG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var src_app_storage_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/storage.service */ "qkCY");
/* harmony import */ var src_app_api_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/api.service */ "yTNM");
/* harmony import */ var src_app_utilities_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/utilities.service */ "oTnF");
/* harmony import */ var _ionic_native_date_picker_ngx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic-native/date-picker/ngx */ "ya1t");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var src_app_model_constants__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/model/constants */ "Kp5Z");











let DesignsComponent = class DesignsComponent {
    constructor(storage, service, formBuilder, utilities, datePicker, route) {
        this.storage = storage;
        this.service = service;
        this.formBuilder = formBuilder;
        this.utilities = utilities;
        this.datePicker = datePicker;
        this.route = route;
        this.statistic = [];
        this.prelimcount = [];
        this.permitCount = [];
        this.clientcompany = [];
        this.companyList = this.clientcompany;
        this.barChartOptions = {
            responsive: true,
            scales: {
                xAxes: [{}], yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            stepSize: 1
                        }
                    }]
            },
            plugins: {
                datalabels: {
                    anchor: 'end',
                    align: 'end',
                    font: {
                        size: 10,
                    }
                }
            }
        };
        this.barChartLabels = ['New', 'On Hold', 'Accepted', 'In Designing', 'Completed', 'Review Failed', 'Review Passed', 'Delivered', 'Overdue'];
        this.barChartType = 'bar';
        this.barChartLegend = true;
        this.barChartPlugins = []; //pluginDataLabels];
        this.lineChartColors = [
            {
                borderColor: 'black',
                backgroundColor: 'lightpink',
            },
        ];
        this.barChartData = [
            { data: this.prelimcount, label: 'Prelim Design' },
            { data: this.permitCount, label: 'Permit Design' }
            //{ data: [12,23,97,102,34,78,23,54,6], label: 'Permit Design' }
        ];
        this.desginForm = this.formBuilder.group({
            company: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](''),
            filterDates: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('current'),
            datetime: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](new Date().getTime()),
            startdate: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]("", [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]),
            enddate: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]("", [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required])
        });
        // this.startdate = new Date(this.myDate);
        // this.enddate = new Date(this.mydates).toISOString();
        this.maxDate = new Date();
    }
    ngOnInit() {
        this.user = this.storage.getUser();
        this.getStatistic();
        this.fetchClientSuperamin();
        //this.getFilteredStatistic();
        this.subscription = this.utilities.getScheduleFormEvent().subscribe((event) => {
            if (event === src_app_model_constants__WEBPACK_IMPORTED_MODULE_10__["ScheduleFormEvent"].SEND_VALUE) {
                this.getFilteredStatistic();
            }
        });
    }
    getStatistic() {
        var starttime = new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + '01T06:30:00.000Z';
        var endtime = new Date();
        const data = {
            "starttime": starttime.toString(),
            "endtime": endtime.toISOString(),
            "creatorparentid": null
        };
        this.service.getStatistic(data).subscribe(response => {
            this.statistic = response;
            this.statistic.forEach(element => {
                this.prelimcount.push(element.prelim);
                this.permitCount.push(element.permit);
            });
        });
    }
    getFilteredStatistic() {
        //if(this.desginForm.status === 'VALID'){
        var starttime;
        var endtime;
        var text = this.desginForm.get('filterDates').value;
        //var nn=(this.newDate)+"-"+'01T06:30:00.000Z';
        //var rr = (this.newdates)+"-"+'31T06:30:00.000Z';
        /* switch(this.desginForm.get('filterDates').value)
    
         {
           case 'Current Month':
             var date=new Date().getFullYear()+"-"+(new Date().getMonth()+1)+"-"+'01T06:30:00.000Z'
             starttime=date.toString();
             endtime=new Date().toISOString();
             break;
           case 'Previous Month' :
             var date=new Date().getFullYear()+"-"+(new Date().getMonth())+"-"+'01T06:30:00.000Z'
             starttime=date.toString();
            // endtime=new Date().toISOString();
             endtime=new Date().getFullYear()+"-"+(new Date().getMonth())+"-"+'31T06:30:00.000Z'
             break;
           case 'Previous Quater' :
             var date=new Date().getFullYear()+"-"+(new Date().getMonth()-2)+"-"+'01T06:30:00.000Z'
             starttime=date.toString();
             //endtime=new Date().toISOString();
             endtime=new Date().getFullYear()+"-"+(new Date().getMonth()-3)+"-"+'31T06:30:00.000Z'
             break;
          // case 'Customs Dates':
          //   starttime=this.startDate.value.toISOString();
          //   endtime=this.endDate.value.toISOString();
          //   break;
         }*/
        if (text == 'current') {
            var date = new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + '01T06:30:00.000Z';
            starttime = date.toString();
            endtime = new Date().toISOString();
        }
        else if (text == 'previous') {
            var date = new Date().getFullYear() + "-" + (new Date().getMonth()) + "-" + '01T06:30:00.000Z';
            starttime = date.toString();
            endtime = new Date().getFullYear() + "-" + (new Date().getMonth()) + "-" + '31T06:30:00.000Z';
        }
        else if (text == 'quarter') {
            var date = new Date().getFullYear() + "-" + (new Date().getMonth() - 2) + "-" + '01T06:30:00.000Z';
            starttime = date.toString();
            endtime = new Date().getFullYear() + "-" + (new Date().getMonth() - 3) + "-" + '31T06:30:00.000Z';
        }
        else if (text == 'customs') {
            var startDate = new Date(this.desginForm.get('startdate').value);
            startDate.setDate(startDate.getDate() + 1);
            var endDate = new Date(this.desginForm.get('enddate').value);
            endDate.setDate(endDate.getDate() + 1);
            starttime = startDate.toISOString();
            endtime = endDate.toISOString();
        }
        this.prelimcount.length = 0;
        this.permitCount.length = 0;
        const data = {
            "starttime": starttime,
            "endtime": endtime,
            //"creatorparentid": this.user.id
            "creatorparentid": this.desginForm.get('company').value.id
        };
        this.service.getStatistic(data).subscribe(response => {
            this.statistic = response;
            this.statistic.forEach(element => {
                this.prelimcount.push(element.prelim);
                this.permitCount.push(element.permit);
            });
            // this.changeDetectorRef.detectChanges();
        });
        //}
        //else{
        //  if(this.desginForm.value.startdate == ''){
        //      this.utilities.errorSnackBar("Please fill Start Date");
        //  }
        //  else if(this.desginForm.value.enddate == ''){
        //     this.utilities.errorSnackBar("Please fill End Date");
        // }
        //}
    }
    fetchClientSuperamin() {
        this.service.getClientSuperadmin().subscribe((response) => {
            response.forEach(element => {
                if (element.company != null) {
                    this.clientcompany.push({ id: element.id, company: element.company });
                }
                if (element.company == null) {
                    this.clientcompany.push({ id: element.id, company: element.email });
                }
            });
        }, error => {
            console.log(error);
        });
    }
    sendValue() {
        if (this.desginForm.status == 'VALID') {
            if (this.desginForm.get('enddate').value > this.desginForm.get('startdate').value) {
                this.utilities.setScheduleFormEvent(src_app_model_constants__WEBPACK_IMPORTED_MODULE_10__["ScheduleFormEvent"].SEND_VALUE);
            }
            else {
                this.utilities.errorSnackBar("Invalid End Date");
            }
        }
        else {
            if (this.desginForm.value.startdate == '') {
                this.utilities.errorSnackBar("Please fill Start Date");
            }
            else if (this.desginForm.value.enddate == '') {
                this.utilities.errorSnackBar("Please fill End Date");
            }
        }
    }
    eventDatesChange(e) {
        this.dateChangeValue = e.target.value;
        //  console.log(this.showValue);
        if (this.dateChangeValue != 'customs') {
            this.getFilteredStatistic();
        }
    }
    eventCompanyChange(e) {
        this.companyChangeValue = e.target.value;
        // console.log(this.value);
        this.getFilteredStatistic();
    }
};
DesignsComponent.ctorParameters = () => [
    { type: src_app_storage_service__WEBPACK_IMPORTED_MODULE_5__["StorageService"] },
    { type: src_app_api_service__WEBPACK_IMPORTED_MODULE_6__["ApiService"] },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"] },
    { type: src_app_utilities_service__WEBPACK_IMPORTED_MODULE_7__["UtilitiesService"] },
    { type: _ionic_native_date_picker_ngx__WEBPACK_IMPORTED_MODULE_8__["DatePicker"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_9__["Router"] }
];
DesignsComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-designs',
        template: _raw_loader_designs_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_designs_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], DesignsComponent);



/***/ }),

/***/ "tWH0":
/*!*************************************************************!*\
  !*** ./src/app/statistics/analysts/analysts.component.scss ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".clickEnableCls {\n  pointer-events: visible !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFxhbmFseXN0cy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGtDQUFBO0FBQ0oiLCJmaWxlIjoiYW5hbHlzdHMuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuY2xpY2tFbmFibGVDbHN7XHJcbiAgICBwb2ludGVyLWV2ZW50czogdmlzaWJsZSAhaW1wb3J0YW50O1xyXG4gfSJdfQ== */");

/***/ })

}]);
//# sourceMappingURL=statistics-statistics-module.js.map