(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["activity-details-activity-details-module"],{

/***/ "FaAN":
/*!*************************************************************!*\
  !*** ./src/app/activity-details/activity-details.module.ts ***!
  \*************************************************************/
/*! exports provided: ActivityDetailsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActivityDetailsPageModule", function() { return ActivityDetailsPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _activity_details_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./activity-details-routing.module */ "HspK");
/* harmony import */ var _activity_details_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./activity-details.page */ "b9HL");







let ActivityDetailsPageModule = class ActivityDetailsPageModule {
};
ActivityDetailsPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _activity_details_routing_module__WEBPACK_IMPORTED_MODULE_5__["ActivityDetailsPageRoutingModule"]
        ],
        declarations: [_activity_details_page__WEBPACK_IMPORTED_MODULE_6__["ActivityDetailsPage"]],
        providers: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["DatePipe"]]
    })
], ActivityDetailsPageModule);



/***/ }),

/***/ "HspK":
/*!*********************************************************************!*\
  !*** ./src/app/activity-details/activity-details-routing.module.ts ***!
  \*********************************************************************/
/*! exports provided: ActivityDetailsPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActivityDetailsPageRoutingModule", function() { return ActivityDetailsPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _activity_details_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./activity-details.page */ "b9HL");




const routes = [
    {
        path: '',
        component: _activity_details_page__WEBPACK_IMPORTED_MODULE_3__["ActivityDetailsPage"]
    }
];
let ActivityDetailsPageRoutingModule = class ActivityDetailsPageRoutingModule {
};
ActivityDetailsPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], ActivityDetailsPageRoutingModule);



/***/ }),

/***/ "b9HL":
/*!***********************************************************!*\
  !*** ./src/app/activity-details/activity-details.page.ts ***!
  \***********************************************************/
/*! exports provided: ActivityDetailsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActivityDetailsPage", function() { return ActivityDetailsPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_activity_details_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./activity-details.page.html */ "e+VE");
/* harmony import */ var _activity_details_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./activity-details.page.scss */ "o3v5");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_api_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/api.service */ "yTNM");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! moment */ "wd/R");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _storage_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../storage.service */ "qkCY");
/* harmony import */ var _utilities_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../utilities.service */ "oTnF");
/* harmony import */ var _utilities_mixpanel_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../utilities/mixpanel.service */ "uKCw");












let ActivityDetailsPage = class ActivityDetailsPage {
    constructor(apiservice, route, storageService, navController, datepipe, utilities, mixpanelService) {
        this.apiservice = apiservice;
        this.route = route;
        this.storageService = storageService;
        this.navController = navController;
        this.datepipe = datepipe;
        this.utilities = utilities;
        this.mixpanelService = mixpanelService;
        this.route.paramMap.subscribe(params => {
            this.designId = params.get('id');
            this.name = params.get('name');
        });
        console.log(this.name);
    }
    ngOnInit() {
        this.mixpanelService.track("ACTIVITY_BAR_TOGGLE_PAGE_OPEN", {});
        this.userData = this.storageService.getUser();
        console.log(this.userData);
        this.activitiesList();
    }
    activitiesList() {
        this.utilities.showLoading('Please wait...').then(() => {
            console.log(this.name);
            if (this.name == "design") {
                this.apiservice.design_activityDetails(this.designId).subscribe(response => {
                    this.utilities.hideLoading().then(() => {
                        this.activity_details = response;
                    });
                });
            }
            if (this.name == "survey") {
                this.apiservice.survey_activityDetails(this.designId).subscribe(response => {
                    this.utilities.hideLoading().then(() => {
                        this.activity_details = response;
                    });
                });
            }
            if (this.name == "pestamp") {
                this.apiservice.pestamp_activityDetails(this.designId).subscribe(response => {
                    this.utilities.hideLoading().then(() => {
                        this.activity_details = response;
                        console.log(this.activity_details);
                    });
                });
            }
        });
    }
    goBack() {
        this.mixpanelService.track("ACTIVITY_BAR_TOGGLE_PAGE_CLOSE", {});
        this.navController.pop();
    }
    isDatePassed(datestring) {
        var checkdate = moment__WEBPACK_IMPORTED_MODULE_8__(datestring, "YYYYMMDD");
        var todaydate = moment__WEBPACK_IMPORTED_MODULE_8__(new Date(), "YYYYMMDD");
        var lateby = todaydate.diff(checkdate, "days");
        if (lateby > 0) {
            return lateby;
        }
        else {
            return false;
        }
    }
    ionViewWillLeave() {
    }
};
ActivityDetailsPage.ctorParameters = () => [
    { type: src_app_api_service__WEBPACK_IMPORTED_MODULE_4__["ApiService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"] },
    { type: _storage_service__WEBPACK_IMPORTED_MODULE_9__["StorageService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["NavController"] },
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_7__["DatePipe"] },
    { type: _utilities_service__WEBPACK_IMPORTED_MODULE_10__["UtilitiesService"] },
    { type: _utilities_mixpanel_service__WEBPACK_IMPORTED_MODULE_11__["MixpanelService"] }
];
ActivityDetailsPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-activity-details',
        template: _raw_loader_activity_details_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_activity_details_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], ActivityDetailsPage);



/***/ }),

/***/ "e+VE":
/*!***************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/activity-details/activity-details.page.html ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header  class=\"ion-no-border white-bg\">\r\n  <ion-toolbar>\r\n    <ion-title></ion-title>\r\n    <ion-grid class=\"ion-padding-top ion-padding-start ion-padding-end header-bg\">\r\n      <ion-row  >\r\n    <ion-col size=\"1\">\r\n    <ion-button fill=\"clear\" size=\"small\" class=\"ion-no-padding\" (click)=\"goBack()\">\r\n        <ion-img src=\"/assets/images/back.svg\" class=\"action-icon\"></ion-img>\r\n    </ion-button> \r\n</ion-col>\r\n<ion-col class=\"ion-text-center\" size=\"9\" style=\"padding-left: 27px; text-align: center;\">\r\n  <ion-grid class=\"ion-align-items-center ion-justify-content-center\">\r\n      <ion-row class=\"ion-align-items-center ion-justify-content-center\">\r\n          <span class=\"survey-name ion-text-center\" style=\"font-size:x-large; text-align: center;\">{{activity_details?.name}}</span>\r\n          <span class=\"survey-name ion-text-center\" *ngIf=\"name=='pestamp'\" style=\"font-size:x-large; text-align: center;\">{{activity_details?.personname}}</span>\r\n      </ion-row>\r\n     \r\n  </ion-grid>\r\n</ion-col>\r\n\r\n</ion-row>\r\n</ion-grid> <ion-grid class=\"position-relative ion-no-padding\">\r\n  <ion-row class=\"ion-no-padding border-header header-half-height\">\r\n  </ion-row>\r\n  <ion-row class=\"ion-no-padding header-half-height\">\r\n\r\n  </ion-row>\r\n\r\n<ion-row  class=\"ion-no-padding position-absolute header-icon-position full-width\">\r\n<ion-col class=\"flex-center\" *ngIf=\"activity_details?.requesttype=='prelim'\">\r\n\r\n  <ion-img src=\"/assets/detailpage/Prelim.svg\" class=\"header-icon\"></ion-img>\r\n</ion-col>\r\n<ion-col class=\"flex-center\" *ngIf=\"activity_details?.requesttype=='permit'\">\r\n\r\n  <ion-img src=\"/assets/detailpage/Permit.svg\" class=\"header-icon\"></ion-img>\r\n</ion-col>\r\n<ion-col class=\"flex-center\" *ngIf=\"activity_details?.type=='survey'\">\r\n\r\n  <ion-img src=\"/assets/detailpage/Survey.svg\" class=\"header-icon\"></ion-img>\r\n</ion-col>\r\n<ion-col class=\"flex-center\" *ngIf=\"name=='pestamp'\">\r\n\r\n  <ion-img src=\"/assets/detailpage/PEStamping.svg\" class=\"header-icon\"></ion-img>\r\n</ion-col>\r\n</ion-row></ion-grid>\r\n\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content><p style=\"text-align: center; font-size:large; color:black; border:none;margin-bottom:0px ;\"> Activities</p>\r\n <p  style=\"text-align: center; margin-top: 0px;\"><span class=\"chipdetail\" style=\"background-color: rgb(246, 77, 10);\" *ngIf=\"activity_details?.status == 'requestdeclined'\">On Hold</span>\r\n <!-- <span class=\"chipdetail\" style=\"background-color: rgb(246, 104, 10);\" >--------{{isDatePassed()}}Overdue</span> -->\r\n <span class=\"chipdetail\" style=\"background-color: rgb(109, 187, 26);\" *ngIf=\"activity_details?.status == 'requestaccepted' || activity_details?.status == 'accepted'\">Accepted</span>\r\n <span class=\"chipdetail\" style=\"background-color: rgb(246, 77, 10);\" *ngIf=\"activity_details?.status == 'reviewfailed'\" >Review Failed</span>\r\n <span class=\"chipdetail\" style=\"background-color: rgb(109, 187, 26);\" *ngIf=\"activity_details?.status == 'reviewpassed'\">Review Passed</span>\r\n <span class=\"chipdetail\" style=\"background-color: rgb(109, 187, 26);\" *ngIf=\"activity_details?.status == 'delivered'\">Delivered</span>\r\n <span class=\"chipdetail\" style=\"background-color: rgb(109, 187, 26);\" *ngIf=\"activity_details?.status == 'designcompleted' || activity_details?.status == 'completed'\">Completed</span>\r\n <span class=\"chipdetail\" style=\"background-color: #1289A7;;\" *ngIf=\"activity_details?.status == 'created'\">Unassigned</span>\r\n <span class=\"chipdetail\" style=\"background-color: #1289A7;;\" *ngIf=\"activity_details?.status == 'designassigned'\">Design Assigned</span>\r\n <span class=\"chipdetail\" style=\"background-color: #1289A7;;\" *ngIf=\"activity_details?.status == 'reviewassigned'\">In Review</span>\r\n <span class=\"chipdetail\" style=\"background-color: #1289A7;;\" *ngIf=\"activity_details?.status == 'assigned'\">In Stamping</span>\r\n <span class=\"chipdetail\" *ngIf=\"activity_details?.status == 'outsourced' && (userData.role.name=='ContractorAdmin' || userData.role.name=='ContractorSuperAdmin')\" style=\"background-color: #95afc0;\">Waiting for acceptance</span>\r\n <span *ngIf=\"activity_details?.status=='surveyassigned'\" class=\"chipdetail\" style=\"background-color: #3C78D8;\">\r\n  pending\r\n</span>\r\n</p>\r\n<ion-virtual-scroll [items]=\"activity_details?.activities\" approxItemHeight=\"320\">\r\n  <ion-card  *virtualItem=\"let activities\" class=\"custom-card\"  >\r\n  <span style=\"float: left; font-size: smaller;\">{{activities.updated_at | date: 'dd MMM yyyy'}}</span><br><br>\r\n  <span style=\"font-size:medium; float:left; color: black;\">{{activities.activity}}</span><br><br>\r\n<!--<span style=\"float: right !important; font-size: small; font-style: italic;\" *ngIf=\"activities.performer!=null\">{{activities.performer.firstname}} {{activities.performer.lastname}}</span>-->\r\n<span style=\"float: right !important; font-size: small; font-style: italic;\" *ngIf=\"activities.performer!=null && userData.role.type!='clientsuperadmin'\">{{activities.performer.firstname}} {{activities.performer.lastname}}</span>\r\n<span *ngIf=\"userData.role.type=='clientsuperadmin' && activities.performer.parent != userData.parent.id\" style=\"float: right !important; font-size: small; font-style: italic;\" >Wattmonk</span>\r\n<span *ngIf=\"userData.role.type=='clientsuperadmin' && activities.performer.parent == userData.parent.id\" style=\"float: right !important; font-size: small; font-style: italic;\" >{{activities.performer.firstname}} {{activities.performer.lastname}}</span>\r\n</ion-card>\r\n</ion-virtual-scroll>\r\n</ion-content>\r\n");

/***/ }),

/***/ "o3v5":
/*!*************************************************************!*\
  !*** ./src/app/activity-details/activity-details.page.scss ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".chipdetail {\n  display: inline;\n  vertical-align: middle;\n  background-color: #95afc0;\n  font-size: 0.6em;\n  padding: 4px 10px;\n  border-radius: 10px;\n  text-align: center;\n  color: #fff;\n}\n\n.cssclass {\n  --max-height:100% !important;\n}\n\n.custom-card {\n  background: white !important;\n  border-radius: 4px !important;\n  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.3) !important;\n  padding: 8px 12px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXGFjdGl2aXR5LWRldGFpbHMucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksZUFBQTtFQUNBLHNCQUFBO0VBQ0EseUJBQUE7RUFDQSxnQkFBQTtFQUNBLGlCQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtFQUNBLFdBQUE7QUFDSjs7QUFDRTtFQUNFLDRCQUFBO0FBRUo7O0FBR0U7RUFFRSw0QkFBQTtFQUNBLDZCQUFBO0VBQ0EscURBQUE7RUFDQSxpQkFBQTtBQURKIiwiZmlsZSI6ImFjdGl2aXR5LWRldGFpbHMucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNoaXBkZXRhaWx7XHJcbiAgICBkaXNwbGF5OiBpbmxpbmU7XHJcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzk1YWZjMDtcclxuICAgIGZvbnQtc2l6ZTogMC42ZW07XHJcbiAgICBwYWRkaW5nOiA0cHggMTBweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBjb2xvcjogI2ZmZjtcclxuICB9XHJcbiAgLmNzc2NsYXNze1xyXG4gICAgLS1tYXgtaGVpZ2h0IDoxMDAlICFpbXBvcnRhbnQ7XHJcbiAgICAvLyBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAvLyBkaXNwbGF5OiBibG9jaztcclxuICB9XHJcblxyXG4gIC5jdXN0b20tY2FyZCB7XHJcbiAgICBcclxuICAgIGJhY2tncm91bmQ6IHdoaXRlICFpbXBvcnRhbnQ7XHJcbiAgICBib3JkZXItcmFkaXVzOiA0cHggIWltcG9ydGFudDtcclxuICAgIGJveC1zaGFkb3c6IDAgMXB4IDJweCAwIHJnYmEoMCwgMCwgMCwgMC4zKSAhaW1wb3J0YW50O1xyXG4gICAgcGFkZGluZzogOHB4IDEycHg7XHJcbiAgfSJdfQ== */");

/***/ })

}]);
//# sourceMappingURL=activity-details-activity-details-module.js.map