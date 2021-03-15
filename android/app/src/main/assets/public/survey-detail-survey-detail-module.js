(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["survey-detail-survey-detail-module"],{

/***/ "0/LW":
/*!*******************************************************!*\
  !*** ./src/app/survey-detail/survey-detail.module.ts ***!
  \*******************************************************/
/*! exports provided: SurveyDetailPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SurveyDetailPageModule", function() { return SurveyDetailPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _survey_detail_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./survey-detail-routing.module */ "5M7h");
/* harmony import */ var _survey_detail_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./survey-detail.page */ "XP+U");
/* harmony import */ var ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ion-bottom-drawer */ "rFvw");
/* harmony import */ var _utilities_utilities_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utilities/utilities.module */ "egEE");
/* harmony import */ var _ionic_native_launch_navigator_ngx__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic-native/launch-navigator/ngx */ "fGQ8");
/* harmony import */ var _modal_page_modal_page_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./modal-page/modal-page.component */ "NKu0");
/* harmony import */ var _ionic_native_photo_viewer_ngx__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ionic-native/photo-viewer/ngx */ "U3FU");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../shared/shared.module */ "PCNd");













let SurveyDetailPageModule = class SurveyDetailPageModule {
};
SurveyDetailPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_7__["IonBottomDrawerModule"],
            _survey_detail_routing_module__WEBPACK_IMPORTED_MODULE_5__["SurveyDetailPageRoutingModule"],
            _utilities_utilities_module__WEBPACK_IMPORTED_MODULE_8__["UtilitiesModule"],
            _shared_shared_module__WEBPACK_IMPORTED_MODULE_12__["SharedModule"]
        ],
        declarations: [_survey_detail_page__WEBPACK_IMPORTED_MODULE_6__["SurveyDetailPage"], _modal_page_modal_page_component__WEBPACK_IMPORTED_MODULE_10__["ModalPageComponent"]],
        providers: [
            _ionic_native_launch_navigator_ngx__WEBPACK_IMPORTED_MODULE_9__["LaunchNavigator"],
            _ionic_native_photo_viewer_ngx__WEBPACK_IMPORTED_MODULE_11__["PhotoViewer"]
        ],
        entryComponents: [_modal_page_modal_page_component__WEBPACK_IMPORTED_MODULE_10__["ModalPageComponent"]],
    })
], SurveyDetailPageModule);



/***/ }),

/***/ "5M7h":
/*!***************************************************************!*\
  !*** ./src/app/survey-detail/survey-detail-routing.module.ts ***!
  \***************************************************************/
/*! exports provided: SurveyDetailPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SurveyDetailPageRoutingModule", function() { return SurveyDetailPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _survey_detail_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./survey-detail.page */ "XP+U");




const routes = [
    {
        path: '',
        component: _survey_detail_page__WEBPACK_IMPORTED_MODULE_3__["SurveyDetailPage"]
    }
];
let SurveyDetailPageRoutingModule = class SurveyDetailPageRoutingModule {
};
SurveyDetailPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], SurveyDetailPageRoutingModule);



/***/ }),

/***/ "6tPc":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/survey-detail/modal-page/modal-page.component.html ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<p>\r\n  modal-page works!\r\n</p>\r\n");

/***/ }),

/***/ "LDBz":
/*!*********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/survey-detail/survey-detail.page.html ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header class=\"ion-no-border white-bg\" *ngIf=\"survey\">\r\n    <ion-grid class=\"ion-padding-top ion-padding-start ion-padding-end header-bg\">\r\n        <ion-row>\r\n            <ion-col size=\"2\">\r\n                <ion-button fill=\"clear\" size=\"small\" class=\"ion-no-padding\" (click)=\"goBack()\">\r\n                    <ion-img src=\"/assets/images/back.svg\" class=\"action-icon\"></ion-img>\r\n                </ion-button>\r\n            </ion-col>\r\n            <ion-col size=\"6\" *ngIf=\"iseditable\">\r\n                <ion-button fill=\"clear\" disabled=\"true\" size=\"small\" class=\"ion-no-padding action-icon\">\r\n                </ion-button>\r\n            </ion-col>\r\n            <!-- <ion-col>\r\n                <ion-grid class=\"ion-align-items-center ion-justify-content-center\">\r\n                    <ion-row class=\"ion-align-items-center ion-justify-content-center\">\r\n                        <span class=\"survey-name ion-text-center\">{{survey.name}}</span>\r\n                    </ion-row>\r\n                    <ion-row class=\"ion-align-items-center ion-justify-content-center\">\r\n                        <span class=\"survey-email ion-text-center\">{{survey.email}}</span>\r\n                    </ion-row>\r\n                </ion-grid>\r\n            </ion-col> -->\r\n            <ion-col  size=\"2\" *ngIf=\"survey.createdby.id == user.id && (survey.status == 'created' || survey.status == 'requestdeclined')\" style=\"text-align: right !important;\">\r\n                <ion-button fill=\"clear\" size=\"small\" class=\"ion-no-padding\"\r\n                            [routerLink]=\"['/schedule/survey/',surveyId]\"\r\n                            routerDirection=\"forward\">\r\n                    <ion-img src=\"/assets/images/edit.svg\" class=\"action-icon\"></ion-img>\r\n                </ion-button>\r\n            </ion-col>\r\n            <ion-col size=\"2\" *ngIf=\"survey.createdby.id == user.id && (survey.status == 'created' || survey.status == 'requestdeclined')\" style=\"text-align: right !important;\"\r\n            size=\"2\" >\r\n                <ion-button fill=\"clear\" size=\"small\" class=\"ion-no-padding\" (click)=\"deleteSurvey()\">\r\n                    <ion-img src=\"/assets/images/trash.svg\" class=\"action-icon\"></ion-img>\r\n                </ion-button>\r\n            </ion-col>\r\n            <ion-col size=\"auto\" *ngIf=\"!iseditable\">\r\n                <ion-button fill=\"clear\" disabled=\"true\" size=\"small\" class=\"ion-no-padding action-icon\">\r\n                </ion-button>\r\n            </ion-col>\r\n        </ion-row>\r\n    </ion-grid>\r\n    <ion-grid class=\"position-relative ion-no-padding\">\r\n        <ion-row class=\"ion-no-padding border-header header-half-height\">\r\n        </ion-row>\r\n        <ion-row class=\"ion-no-padding header-half-height\">\r\n\r\n        </ion-row>\r\n        <ion-row class=\"ion-no-padding position-absolute header-icon-position full-width\">\r\n            <ion-col class=\"flex-center\">\r\n                <ion-img src=\"/assets/detailpage/Survey.svg\" class=\"header-icon\"></ion-img>\r\n            </ion-col>\r\n        </ion-row>\r\n    </ion-grid>\r\n</ion-header>\r\n\r\n<ion-content class=\"ion-padding page-text-color\" *ngIf='survey' >\r\n    <!-- <ion-grid fixed> -->\r\n        <!-- <ion-row> -->\r\n            <!-- <ion-col> -->\r\n                <ion-segment scrollable [(ngModel)]=\"segments\" class=\"wd140 colorwht\" *ngIf='survey.status ==\"surveycompleted\"' mode=\"md\">\r\n                <ion-segment-button value=\"SiteDetils\" class=\"wd140 colorwht\">\r\n                    <ion-label>\r\n                        Site Details\r\n                    </ion-label>\r\n                </ion-segment-button>\r\n                <ion-segment-button value=\"electricals\" class=\"wd140 colorwht\">\r\n                    <ion-label>\r\n                        Electrical\r\n                    </ion-label>\r\n                </ion-segment-button>\r\n                <!-- <ion-segment-button value=\"solarPanel\" class=\"wd140 colorwht\">\r\n                    <ion-label>\r\n                        Solar Panel\r\n                    </ion-label>\r\n                </ion-segment-button> -->\r\n                <ion-segment-button value=\"roof\" class=\"wd140 colorwht\">\r\n                    <ion-label>\r\n                        Roof\r\n                    </ion-label>\r\n                </ion-segment-button>\r\n                <ion-segment-button value=\"attic\" class=\"wd140 colorwht\">\r\n                    <ion-label>\r\n                        Attic\r\n                    </ion-label>\r\n                </ion-segment-button>\r\n                <ion-segment-button value=\"appliances\" class=\"wd140 colorwht\">\r\n                    <ion-label>\r\n                        Appliances\r\n                    </ion-label>\r\n                </ion-segment-button>\r\n                <!-- <ion-segment-button value=\"equipmentMarketing\" class=\"wd140 colorwht\">\r\n                    <ion-label style=\"width:100%\">\r\n                        Equipment Marking\r\n                    </ion-label>\r\n                </ion-segment-button> -->\r\n                <ion-segment-button value=\"generalInfo\" class=\"wd140 colorwht\">\r\n                    <ion-label>\r\n                        General information\r\n                    </ion-label>\r\n                </ion-segment-button>\r\n                </ion-segment>\r\n                <div [ngSwitch]=\"segments\">\r\n                    <ion-grid *ngSwitchCase=\"'SiteDetils'\">\r\n                        <ion-row class=\"bkg\">\r\n                            <ion-col class=\"hgt-margin\">\r\n                                <!-- <ion-item> -->\r\n                                    <label>Customer Details</label>\r\n                                <!-- </ion-item> -->\r\n                            </ion-col>\r\n                        </ion-row>\r\n                        <ion-row>\r\n                            <ion-col size=\"6\">Name</ion-col>\r\n                            <ion-col size=\"6\">{{survey.name}}</ion-col>\r\n                        </ion-row>\r\n                        <ion-row>\r\n                            <ion-col size=\"6\">Address</ion-col>\r\n                            <ion-col size=\"6\">{{survey.address}}</ion-col>\r\n                        </ion-row>\r\n                        <ion-row>\r\n                            <ion-col size=\"6\">Email</ion-col>\r\n                            <ion-col size=\"6\">{{survey.email}}</ion-col>\r\n                        </ion-row>\r\n\r\n                        <ion-row class=\"bkg\">\r\n                            <ion-col class=\"hgt-margin\">\r\n                                <!-- <ion-item> -->\r\n                                    <label>Job Details</label>\r\n                                <!-- </ion-item> -->\r\n                            </ion-col>\r\n                        </ion-row>\r\n                        <ion-row>\r\n                            <ion-col size=\"6\">Job</ion-col>\r\n                            <ion-col size=\"6\">{{survey.jobtype}}</ion-col>\r\n                        </ion-row>\r\n                        <ion-row>\r\n                            <ion-col size=\"6\">Scheduled On</ion-col>\r\n                            <ion-col size=\"6\">{{utilities.formatDateInDisplayFormat(survey.datetime)}} {{utilities.formatTimeInDisplayFormat(survey.datetime)}}</ion-col>\r\n                        </ion-row>\r\n\r\n                        <ion-row class=\"bkg\">\r\n                            <ion-col size=\"6\" class=\"hgt-margin\">\r\n                                <!-- <ion-item> -->\r\n                                    <label>Comments</label>\r\n                                <!-- </ion-item> -->\r\n                            </ion-col>\r\n\r\n                            <ion-col size=\"6\" *ngFor=\"let comment of survey.comments\">\r\n                                <p  [innerHTML]=\"comment?.message | linkify\" class=\"comment font\" style=\"text-align:left;margin:0px\"></p>\r\n                                <p class=\"comment-by\" style=\"text-align:left;margin-top:0px\">Posted by {{comment.createdby?.firstname}}\r\n                                    {{comment.createdby?.lastname}}</p>\r\n                            </ion-col>\r\n                            <!-- <ion-col style=\"text-align: right;\">{{comments.createdBy.firstname}} &nbsp;{{comments.createdBy.lastname}} </ion-col>\r\n                            <ion-col style=\"text-align: right;\">{{comments.createdBy.updated_at | date:'dd/MM/yyyy'}}</ion-col> -->\r\n                        </ion-row>\r\n\r\n                        <ion-row *ngIf=\"survey.reviewissues || survey.reviewissues !==null  \" class=\"ion-no-padding ion-margin-top\">\r\n                            <ion-col size=\"6\">\r\n                                <span class=\"models font\"> Review Comments</span>\r\n                            </ion-col>\r\n                            <!-- <div> -->\r\n\r\n                            <ion-col size=\"6\"  class=\"ion-no-padding\">\r\n                                <div >\r\n                                    <p class=\"comment font\" style=\"text-align: right;margin:0px\">{{survey?.reviewissues}}</p>\r\n                                    <p class=\"comment-by\" style=\"text-align: right;margin-top:0px\">Posted by {{survey.reviewassignedto?.firstname}}\r\n                                        {{survey.reviewassignedto?.lastname}}</p>\r\n                                </div>\r\n                            </ion-col>\r\n                            <!-- <ion-col size=\"12\" class=\"ion-no-padding ion-text-end\">\r\n\r\n                                        </ion-col> -->\r\n\r\n                            <!-- </div> -->\r\n\r\n                        </ion-row>\r\n\r\n                        <ion-row class=\"bkg\" *ngIf=\"survey.assignedto!== null\">\r\n                            <ion-col class=\"hgt-margin\">\r\n                                <!-- <ion-item> -->\r\n                                    <label>Assignee Details</label>\r\n                                <!-- </ion-item> -->\r\n                            </ion-col>\r\n                        </ion-row>\r\n                        <ion-row *ngIf=\"survey.assignedto!== null\">\r\n                            <ion-col size=\"6\">Assigned To</ion-col>\r\n                            <ion-col size=\"6\">{{survey.assignedto?.firstname}} &nbsp; {{survey.assignedto?.lastname}}</ion-col>\r\n                        </ion-row>\r\n                    </ion-grid>\r\n\r\n                   <ion-grid *ngSwitchCase=\"'electricals'\">\r\n                    <ion-row>\r\n                        <ion-col>\r\n                            <ion-segment scrollable [(ngModel)]=\"electricals\" class=\"segment-btn\">\r\n                                <ion-segment-button class=\"wd140\" value=\"MSB\">\r\n                                    <ion-label>MSP</ion-label>\r\n                                </ion-segment-button>\r\n                                <ion-segment-button value=\"utilityMeter\" class=\"wd140\">\r\n                                    <ion-label>Utility Meter</ion-label>\r\n                                </ion-segment-button>\r\n                                <ion-segment-button *ngIf=\"survey.existingsolarsystem\" value=\"pvMeter\" class=\"wd140\">\r\n                                    <ion-label>PV Inverter</ion-label>\r\n                                </ion-segment-button>\r\n                                <ion-segment-button value=\"acDisconnect\" class=\"wd140\" *ngIf=\"survey.existingsolarsystem\">\r\n                                    <ion-label>AC Disconnected</ion-label>\r\n                                </ion-segment-button>\r\n                            </ion-segment>\r\n                        </ion-col>\r\n                    </ion-row>\r\n                            <div [ngSwitch]=\"electricals\">\r\n                                <div *ngSwitchCase=\"'MSB'\">\r\n\r\n\r\n                                    <ion-slides pager=\"true\" zoom [options]=\"slideOpts\" class=\"image-slider\">\r\n\r\n                                        <ion-slide *ngFor=\"let elecmsb of survey.mspimages,let i=index\">\r\n                                            <ion-row><ion-col size=\"12\" *ngIf=\"i==0\"><span>MSP is located :</span>&nbsp;<span>{{survey.msplocation | titlecase}} for this site</span></ion-col>\r\n                                                <ion-col size=\"12\" *ngIf=\"i==1\"><span>MSP/BUS Rating is :</span>&nbsp;<span>{{survey.msprating}} </span></ion-col>\r\n                                                <ion-col size=\"12\" *ngIf=\"i==2\"><span>Main breaker size is :</span>&nbsp;<span>{{survey.mainbreakersize}} for this site </span></ion-col>\r\n                                                <ion-col size=\"12\" *ngIf=\"i==3\"><span>Main Breaker location in MSP is :</span>&nbsp;<span>{{survey.mspbreaker | titlecase}} for this site </span></ion-col>\r\n                                            <div class=\"swiper-zoom-container\">\r\n\r\n                                                <img [src]=\"elecmsb.url\" (click)=\"showimage(elecmsb.url)\" />\r\n                                            </div>\r\n                                        </ion-row>\r\n                                        </ion-slide>\r\n                                    </ion-slides>\r\n                                </div>\r\n                                <div *ngSwitchCase=\"'utilityMeter'\">\r\n                                    <ion-slides pager=\"true\" [options]=\"slideOpts\" zoom=\"true\">\r\n                                        <ion-slide *ngFor=\"let elecutility of survey.utilitymeterimages,let i=index\">\r\n                                            <ion-row><ion-col size=\"12\" *ngIf=\"i==0\"><span>Utility meter is :</span>&nbsp;<span>{{survey.utilitymeter | titlecase}} to MSP </span></ion-col>\r\n                                            <div class=\"swiper-zoom-container\">\r\n                                                <img [src]=\"elecutility.url\" (click)=\"showimage(elecutility.url)\" width='100%'/>\r\n                                            </div>\r\n                                        </ion-row>\r\n                                        </ion-slide>\r\n                                    </ion-slides>\r\n                                </div>\r\n                                <div *ngSwitchCase=\"'pvMeter'\">\r\n                                    <ion-slides pager=\"true\" [options]=\"slideOpts\" zom=\"true\">\r\n\r\n                                        <ion-slide *ngFor=\"let elecpvmeter of survey.pvmeterimages,let i=index\">\r\n                                            <ion-row><ion-col size =\"12\"><span>PV inverter is located :</span>&nbsp;<span>{{survey.pvinverterlocation | titlecase}} the site </span></ion-col>\r\n                                                <ion-col size =\"12\"><span>Inverter manufacturer and Model is :</span>&nbsp;<span>{{survey.invertermake | titlecase}} {{survey.invertermodel | titlecase}}</span></ion-col>\r\n\r\n                                            <div class=\"swiper-zoom-container\">\r\n                                                <img [src]=\"elecpvmeter.url\" (click)=\"showimage(elecpvmeter.url)\" width='100%'/>\r\n                                            </div>\r\n                                        </ion-row>\r\n                                        </ion-slide>\r\n                                    </ion-slides>\r\n                                </div>\r\n                                <div *ngSwitchCase=\"'acDisconnect'\">\r\n                                    <ion-slides pager=\"true\" [options]=\"slideOpts\" zoom=\"true\">\r\n                                        <ion-slide *ngFor=\"let elecacdisconnect of survey.acdisconnectimages\">\r\n                                            <div class=\"swiper-zoom-container\">\r\n                                                <img [src]=\"elecacdisconnect.url\" (click)=\"showimage(elecacdisconnect.url)\" width='100%'/>\r\n                                            </div>\r\n\r\n                                        </ion-slide>\r\n                                    </ion-slides>\r\n                                </div>\r\n                            </div>\r\n\r\n                 </ion-grid>\r\n                   <ion-grid *ngSwitchCase=\"'solarPanel'\">\r\n                    <ion-slides pager=\"true\" [options]=\"slideOpts\" zoom=\"true\">\r\n                        <ion-slide *ngFor=\"let solarpanel of survey.solarpanelsimages\">\r\n                            <div class=\"swiper-zoom-container\">\r\n                            <h2 class=\"position-fix\">{{solarpanel.name}}</h2>\r\n                                <img [src]=\"solarpanel.url\" (click)=\"showimage(solarpanel.url)\"/>\r\n                            </div>\r\n                        </ion-slide>\r\n                    </ion-slides>\r\n                 </ion-grid>\r\n                   <ion-grid *ngSwitchCase=\"'roof'\">\r\n                    <ion-slides pager=\"true\" [options]=\"slideOpts\" zoom=\"true\">\r\n                        <ion-slide *ngFor=\"let roof of survey.roofimages,let i=index\">\r\n                            <ion-row>\r\n                                <ion-col size =\"12\"><span *ngIf=\"i==0\">Roof Tilt :</span>&nbsp;<span>{{survey.rooftilt + ' ' + 'degrees'}} </span></ion-col>\r\n                            <div class=\"swiper-zoom-container\">\r\n                                <h2 class=\"position-fix\">{{roof.name}}</h2>\r\n                                <img [src]=\"roof.url\" (click)=\"showimage(roof.url)\" />\r\n                            </div>\r\n                        </ion-row>\r\n\r\n                        </ion-slide>\r\n                        <ion-slide *ngFor=\"let roofdimension of survey.roofdimensionimages,let i=index\">\r\n                            <ion-row>\r\n                                <!-- <ion-col size =\"12\"><span *ngIf=\"i=='0'\">Roof Dimension :</span>&nbsp;<span>{{survey.numberofmodules}} </span></ion-col> -->\r\n                            <div class=\"swiper-zoom-container\">\r\n                                <h2 class=\"position-fix\">{{roofdimension?.name}}</h2>\r\n                                <img [src]=\"roofdimension.url\" (click)=\"showimage(roofdimension.url)\" />\r\n                            </div>\r\n                        </ion-row>\r\n\r\n                        </ion-slide>\r\n                        <ion-slide *ngFor=\"let roofobstacle of survey.obstaclesimages,let i=index\">\r\n                            <ion-row>\r\n                                <!-- <ion-col size =\"12\"><span *ngIf=\"i=='0'\">Roof Dimension :</span>&nbsp;<span>{{survey.numberofmodules}} </span></ion-col> -->\r\n                            <div class=\"swiper-zoom-container\">\r\n                                <h2 class=\"position-fix\">{{roofobstacle?.name}}</h2>\r\n                                <img [src]=\"roofobstacle.url\" (click)=\"showimage(roofobstacle.url)\" />\r\n                            </div>\r\n                        </ion-row>\r\n\r\n                        </ion-slide>\r\n                        <ion-slide *ngFor=\"let roofobstacledimension of survey.obstaclesdimensionsimages,let i=index\">\r\n                            <ion-row>\r\n                                <!-- <ion-col size =\"12\"><span *ngIf=\"i=='0'\">Roof Dimension :</span>&nbsp;<span>{{survey.numberofmodules}} </span></ion-col> -->\r\n                            <div class=\"swiper-zoom-container\">\r\n                                <h2 class=\"position-fix\">{{roofobstacledimension?.name}}</h2>\r\n                                <img [src]=\"roofobstacledimension.url\" (click)=\"showimage(roofobstacledimension.url)\" />\r\n                            </div>\r\n                        </ion-row>\r\n\r\n                        </ion-slide>\r\n                    </ion-slides>\r\n                 </ion-grid>\r\n                 <ion-grid *ngSwitchCase=\"'attic'\">\r\n                    <ion-slides pager=\"true\" [options]=\"slideOpts\" zoom=\"true\">\r\n                        <ion-slide *ngFor=\"let attic of survey.atticimages,let i=index\">\r\n                            <ion-row>\r\n                                <ion-col size =\"12\" *ngIf=\"i==0\"><span >Framing is :</span>&nbsp;<span>{{survey.framing}} </span></ion-col>\r\n                                <ion-col size =\"12\" *ngIf=\"i==1\"><span >Framing size is : </span>&nbsp;<span>{{survey.framingsize}} </span></ion-col>\r\n                                <ion-col size =\"12\" *ngIf=\"i==2\"><span >Distance between two rafts : </span>&nbsp;<span>{{survey.distancebetweentworafts}} </span></ion-col>\r\n                            <div class=\"swiper-zoom-container\">\r\n\r\n                                <img [src]=\"attic.url\" (click)=\"showimage(attic.url)\" />\r\n                            </div>\r\n                        </ion-row>\r\n\r\n                        </ion-slide>\r\n                    </ion-slides>\r\n                 </ion-grid>\r\n                   <ion-grid *ngSwitchCase=\"'appliances'\">\r\n                    <ion-slides pager=\"true\" [options]=\"slideOpts\" zoom=\"true\">\r\n                        <ion-slide *ngFor=\"let appliance of survey.appliancesimages\">\r\n                            <ion-row>\r\n                                <ion-col size=\"12\"><span>Appliance name is:</span>&nbsp;<span>{{appliance.name}}</span> </ion-col>\r\n                            <div class=\"swiper-zoom-container\">\r\n                                <h2 class=\"position-fix\">{{appliance.name}}</h2>\r\n                                <img [src]=\"appliance.url\"  (click)=\"showimage(appliance.url)\"/>\r\n                            </div>\r\n                        </ion-row>\r\n                        </ion-slide>\r\n                    </ion-slides>\r\n                 </ion-grid>\r\n                   <ion-grid *ngSwitchCase=\"'equipmentMarketing'\">\r\n                    <ion-slides pager=\"true\" [options]=\"slideOpts\" zoom=\"true\">\r\n                        <ion-slide >\r\n                            <div class=\"swiper-zoom-container\">\r\n                                <h2 class=\"position-fix\">{{survey.electricalslocation.name}}</h2>\r\n                                <img [src]=\"survey.electricalslocation.url\"  (click)=\"showimage(survey.electricalslocation.url)\"/>\r\n                            </div>\r\n                        </ion-slide>\r\n                    </ion-slides>\r\n                 </ion-grid>\r\n                   <ion-grid *ngSwitchCase=\"'generalInfo'\">\r\n                    <ion-row class=\"bkg\">\r\n                        <ion-col class=\"hgt-margin\">\r\n                            <!-- <ion-item> -->\r\n                                <label>Details</label>\r\n                            <!-- </ion-item> -->\r\n                        </ion-col>\r\n                    </ion-row>\r\n                    <!-- <ion-row>\r\n                        <ion-col size=\"6\">Existing Modules Brand</ion-col>\r\n                        <ion-col size=\"6\">{{survey.modulemake.name}}</ion-col>\r\n                    </ion-row>\r\n                    <ion-row>\r\n                        <ion-col size=\"6\">Existing Modules Model</ion-col>\r\n                        <ion-col size=\"6\">{{survey.modulemodel.name}}</ion-col>\r\n                    </ion-row> -->\r\n                    <ion-row>\r\n                        <ion-col size=\"6\">Battery System</ion-col>\r\n                        <ion-col size=\"6\">{{survey.batterysystem}}</ion-col>\r\n                    </ion-row>\r\n                    <ion-row *ngIf=\"survey.batterysystem=='true'\">\r\n                        <ion-col size=\"6\">Comments</ion-col>\r\n                        <ion-col size=\"6\">{{survey.comments[0]?.message}}</ion-col>\r\n                    </ion-row>\r\n                    <ion-row>\r\n                        <ion-col size=\"6\">Existing Solar System</ion-col>\r\n                        <ion-col size=\"6\">{{survey.existingsolarsystem}}</ion-col>\r\n                    </ion-row>\r\n                    <ion-row>\r\n                        <ion-col size=\"6\">Interconnection</ion-col>\r\n                        <ion-col size=\"6\">{{survey.interconnection}}</ion-col>\r\n                    </ion-row>\r\n                    <ion-row>\r\n                        <ion-col size=\"6\">Service Feed Source</ion-col>\r\n                        <ion-col size=\"6\">{{survey?.servicefeedsource}}</ion-col>\r\n                    </ion-row>\r\n\r\n                 </ion-grid>\r\n                </div>\r\n\r\n\r\n                <!-- <ion-content [fullscreen]=\"true\" class=\"ion-padding\"> -->\r\n\r\n\r\n                <!-- </ion-content> -->\r\n            <!-- </ion-col> -->\r\n        <!-- </ion-row> -->\r\n    <!-- </ion-grid> -->\r\n    <!-- <ion-grid *ngIf=\"survey\" class=\"page-text-color\">\r\n        <ion-row>\r\n            <ion-col size=\"12\">\r\n                <span (click)=\"openAddressOnMap(survey.address)\" class=\"address\">{{survey.address}}</span>\r\n            </ion-col>\r\n        </ion-row>\r\n        <ion-row class=\"ion-margin-top\">\r\n            <ion-col size=\"12\">\r\n                <span class=\"input-placeholder\">date and time</span>\r\n            </ion-col>\r\n            <ion-col>\r\n                <div class=\"d-flex\">\r\n                    <div class=\"d-flex flex-column\">\r\n                        <div class=\"main-background d-flex flex-row align-center justify-center\">\r\n                            <div class=\"d-flex flex-column align-center justify-center ion-padding date-background\">\r\n                                <span class=\"month\">{{survey.datetime | date: 'MMM'}}</span>\r\n                                <span class=\"day\">{{survey.datetime | date: 'dd'}}</span>\r\n                            </div>\r\n                            <div class=\"ion-padding\">\r\n                                <span class=\"time\">{{survey.datetime | date: 'hh : mm a'}}</span>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </ion-col>\r\n            <ion-col size=\"auto\" *ngIf=\"iseditable\">\r\n                <div class=\"d-flex flex-column align-center justify-center\" (click)=\"reschedule()\">\r\n                    <ion-img src=\"/assets/images/schedule.svg\" class=\"reschedule-icon\"></ion-img>\r\n                    <span>Reschedule</span>\r\n                </div>\r\n            </ion-col>\r\n        </ion-row>\r\n        <ion-row class=\"ion-no-padding\">\r\n            <ion-col><span class=\"model-type\">jobtype</span></ion-col>\r\n            <ion-col size=\"auto\">\r\n                <span class=\"model-name\">{{survey.jobtype}}</span>\r\n            </ion-col>\r\n        </ion-row>\r\n        <ion-row class=\"ion-margin-top\">\r\n            <ion-col size=\"12\">\r\n                <span class=\"models\">Solar Details</span>\r\n            </ion-col>\r\n            <ion-col>\r\n                <ion-grid class=\"ion-no-padding\">\r\n                    <ion-row class=\"ion-no-padding\">\r\n                        <ion-col><span class=\"model-type\">make</span></ion-col>\r\n                        <ion-col size=\"auto\">\r\n                            <span class=\"model-name\" *ngIf=\"survey.modulemake\">{{survey.modulemake.name}}</span>\r\n                            <span class=\"model-name\" *ngIf=\"!survey.modulemake\">n/a</span>\r\n                        </ion-col>\r\n                    </ion-row>\r\n                    <ion-row>\r\n                        <ion-col><span class=\"model-type\">model</span></ion-col>\r\n                        <ion-col size=\"auto\">\r\n                            <span class=\"model-name\" *ngIf=\"survey.modulemodel\">{{survey.modulemodel.name}}</span>\r\n                            <span class=\"model-name\" *ngIf=\"!survey.modulemodel\">n/a</span>\r\n                        </ion-col>\r\n                    </ion-row>\r\n                </ion-grid>\r\n            </ion-col>\r\n        </ion-row>\r\n        <ion-row class=\"ion-margin-top\">\r\n            <ion-col size=\"12\">\r\n                <span class=\"models\">Inverter Details</span>\r\n            </ion-col>\r\n            <ion-col>\r\n                <ion-grid class=\"ion-no-padding\">\r\n                    <ion-row class=\"ion-no-padding\">\r\n                        <ion-col><span class=\"model-type\">make</span></ion-col>\r\n                        <ion-col size=\"auto\">\r\n                            <span class=\"model-name\" *ngIf=\"survey.invertermake\">{{survey.invertermake}}</span>\r\n                            <span class=\"model-name\" *ngIf=\"!survey.invertermake\">n/a</span>\r\n                        </ion-col>\r\n                    </ion-row>\r\n                    <ion-row>\r\n                        <ion-col><span class=\"model-type\">model</span></ion-col>\r\n                        <ion-col size=\"auto\">\r\n                            <span class=\"model-name\" *ngIf=\"survey.invertermodel\">{{survey.invertermodel}}</span>\r\n                            <span class=\"model-name\" *ngIf=\"!survey.invertermodel\">n/a</span>\r\n                        </ion-col>\r\n                    </ion-row>\r\n                </ion-grid>\r\n            </ion-col>\r\n        </ion-row>\r\n        <ion-row class=\"ion-margin-top\">\r\n            <ion-col>\r\n                <ion-grid class=\"ion-no-padding\">\r\n                    <ion-row class=\"ion-no-padding\">\r\n                        <ion-col><span class=\"model-type\">utility</span></ion-col>\r\n                        <ion-col size=\"auto\">\r\n                            <span class=\"model-name\" *ngIf=\"survey.utility\">{{survey.utility.name}}</span>\r\n                            <span class=\"model-name\" *ngIf=\"!survey.utility\">n/a</span>\r\n                        </ion-col>\r\n                    </ion-row>\r\n                    <ion-row class=\"ion-no-padding\">\r\n                        <ion-col><span class=\"model-type\">msp location</span></ion-col>\r\n                        <ion-col size=\"auto\">\r\n                            <span class=\"model-name\" *ngIf=\"survey.msplocation\">{{survey.msplocation}}</span>\r\n                            <span class=\"model-name\" *ngIf=\"!survey.msplocation\">n/a</span>\r\n                        </ion-col>\r\n                    </ion-row>\r\n                    <ion-row>\r\n                        <ion-col><span class=\"model-type\">msp breaker</span></ion-col>\r\n                        <ion-col size=\"auto\">\r\n                            <span class=\"model-name\" *ngIf=\"survey.mspbreaker\">{{survey.mspbreaker}}</span>\r\n                            <span class=\"model-name\" *ngIf=\"!survey.mspbreaker\">n/a</span>\r\n                        </ion-col>\r\n                    </ion-row>\r\n                    <ion-row>\r\n                        <ion-col><span class=\"model-type\">msp rating</span></ion-col>\r\n                        <ion-col size=\"auto\">\r\n                            <span class=\"model-name\" *ngIf=\"survey.msprating\">{{survey.msprating}}</span>\r\n                            <span class=\"model-name\" *ngIf=\"!survey.msprating\">n/a</span>\r\n                        </ion-col>\r\n                    </ion-row>\r\n                    <ion-row>\r\n                        <ion-col><span class=\"model-type\">main breaker size</span></ion-col>\r\n                        <ion-col size=\"auto\">\r\n                            <span class=\"model-name\" *ngIf=\"survey.mainbreakersize\">{{survey.mainbreakersize}}</span>\r\n                            <span class=\"model-name\" *ngIf=\"!survey.mainbreakersize\">n/a</span>\r\n                        </ion-col>\r\n                    </ion-row>\r\n                </ion-grid>\r\n            </ion-col>\r\n        </ion-row>\r\n        <ion-row class=\"ion-margin-top\">\r\n            <ion-col>\r\n                <ion-grid class=\"ion-no-padding\">\r\n                    <ion-row class=\"ion-no-padding\">\r\n                        <ion-col><span class=\"model-type\">pv meter</span></ion-col>\r\n                        <ion-col size=\"auto\">\r\n                            <span class=\"model-name\" *ngIf=\"survey.pvmeter\">{{survey.pvmeter}}</span>\r\n                            <span class=\"model-name\" *ngIf=\"!survey.pvmeter\">n/a</span>\r\n                        </ion-col>\r\n                    </ion-row>\r\n                    <ion-row>\r\n                        <ion-col><span class=\"model-type\">pv inverter location</span></ion-col>\r\n                        <ion-col size=\"auto\">\r\n                            <span class=\"model-name\"\r\n                                  *ngIf=\"survey.pvinverterlocation\">{{survey.pvinverterlocation}}</span>\r\n                            <span class=\"model-name\" *ngIf=\"!survey.pvinverterlocation\">n/a</span>\r\n                        </ion-col>\r\n                    </ion-row>\r\n                </ion-grid>\r\n            </ion-col>\r\n        </ion-row>\r\n        <ion-row class=\"ion-margin-top\">\r\n            <ion-col>\r\n                <ion-grid class=\"ion-no-padding\">\r\n                    <ion-row class=\"ion-no-padding\">\r\n                        <ion-col><span class=\"model-type\">utility meter</span></ion-col>\r\n                        <ion-col size=\"auto\">\r\n                            <span class=\"model-name\" *ngIf=\"survey.utilitymeter\">{{survey.utilitymeter}}</span>\r\n                            <span class=\"model-name\" *ngIf=\"!survey.utilitymeter\">n/a</span>\r\n                        </ion-col>\r\n                    </ion-row>\r\n                    <ion-row>\r\n                        <ion-col><span class=\"model-type\">ac disconnect</span></ion-col>\r\n                        <ion-col size=\"auto\">\r\n                            <span class=\"model-name\" *ngIf=\"survey.acdisconnect\">{{survey.acdisconnect}}</span>\r\n                            <span class=\"model-name\" *ngIf=\"!survey.acdisconnect\">n/a</span>\r\n                        </ion-col>\r\n                    </ion-row>\r\n                    <ion-row>\r\n                        <ion-col><span class=\"model-type\">no of modules</span></ion-col>\r\n                        <ion-col size=\"auto\">\r\n                            <span class=\"model-name\" *ngIf=\"survey.numberofmodules\">{{survey.numberofmodules}}</span>\r\n                            <span class=\"model-name\" *ngIf=\"!survey.numberofmodules\">n/a</span>\r\n                        </ion-col>\r\n                    </ion-row>\r\n                    <ion-row>\r\n                        <ion-col><span class=\"model-type\">service feed source</span></ion-col>\r\n                        <ion-col size=\"auto\">\r\n                            <span class=\"model-name\"\r\n                                  *ngIf=\"survey.servicefeedsource\">{{survey.servicefeedsource}}</span>\r\n                            <span class=\"model-name\" *ngIf=\"!survey.servicefeedsource\">n/a</span>\r\n                        </ion-col>\r\n                    </ion-row>\r\n                    <ion-row>\r\n                        <ion-col><span class=\"model-type\">service feed source</span></ion-col>\r\n                        <ion-col size=\"auto\">\r\n                            <span class=\"model-name\"\r\n                                  *ngIf=\"survey.interconnection\">{{survey.interconnection}}</span>\r\n                            <span class=\"model-name\" *ngIf=\"!survey.interconnection\">n/a</span>\r\n                        </ion-col>\r\n                    </ion-row>\r\n                </ion-grid>\r\n            </ion-col>\r\n        </ion-row>\r\n        <ion-row class=\"ion-align-items-center ion-justify-content-center ion-margin-top\">\r\n            <ion-col class=\"ion-no-padding\">\r\n                <span class=\"data-header\">gallery</span>\r\n            </ion-col>\r\n            <ion-col size=\"auto\" [routerLink]=\"['/gallery/', surveyId]\"\r\n                     routerDirection=\"forward\">\r\n                <span>View all</span>\r\n            </ion-col>\r\n            <ion-col class=\"ion-align-items-center d-flex\" size=\"12\">\r\n                <img src=\"/assets/images/images.svg\" class=\"image-count\">\r\n                <span>{{getSurveyImages()}} images</span>\r\n            </ion-col>\r\n        </ion-row>\r\n        <ion-row class=\"ion-no-padding ion-margin-top\">\r\n            <ion-col size=\"12\" class=\"ion-no-padding\">\r\n                <span class=\"data-header\">comments</span>\r\n            </ion-col>\r\n            <ion-col size=\"12\" class=\"ion-no-padding\">\r\n                <span class=\"data-point\">\"{{survey.comments}}\"</span>\r\n            </ion-col>\r\n            <ion-col size=\"12\" class=\"ion-no-padding ion-text-end\">\r\n                <span class=\"comment-by\">Posted by {{survey.createdby.firstname}} {{survey.createdby.lastname}}</span>\r\n            </ion-col>\r\n        </ion-row>\r\n        <ion-row>\r\n            <ion-col><span class=\"model-type\">created at</span></ion-col>\r\n            <ion-col size=\"auto\">\r\n                <span class=\"model-name\">{{survey.created_at | date: 'dd/MM/yyyy hh:mm a'}}</span>\r\n            </ion-col>\r\n        </ion-row>\r\n        <ion-row class=\"ion-no-padding ion-margin-top ion-justify-content-center ion-align-items-center\"\r\n                 *ngIf=\"assigned\">\r\n            <ion-col class=\"ion-justify-content-center ion-align-items-center\"><span\r\n                    class=\"model-type\">assigned to</span></ion-col>\r\n            <ion-col size=\"auto\">\r\n                <div class=\"selected d-flex\">\r\n                    <img *ngIf=\"survey.assignedto.contractorlogo && survey.assignedto.contractorlogo.logo\" [src]=\"survey.assignedto.contractorlogo.logo.url\"\r\n                         class=\"assignee-image\"/>\r\n                    <div *ngIf=\"!survey.assignedto.contractorlogo || !survey.assignedto.contractorlogo.logo\"\r\n                         class=\"assignee-image d-flex flex-row align-center justify-center\">\r\n                        <div class=\"name_div\">\r\n                            <span style=\"text-transform: capitalize;\">{{survey.assignedto.firstname.substring(0, 1)}}{{survey.assignedto.lastname.substring(0, 1)}}</span>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </ion-col>\r\n        </ion-row>\r\n        <ion-row class=\"ion-no-padding ion-margin-top\" *ngIf=\"!assigned\">\r\n            <ion-col size=\"12\">\r\n                <form novalidate [formGroup]=\"assigneeForm\">\r\n                    <ion-item class=\"ion-no-padding no-border\" lines=\"none\">\r\n                        <app-user-selector placeholder=\"assign\" [assignees]=\"listOfAssignees\"\r\n                                           formControlName=\"assignto\"></app-user-selector>\r\n                    </ion-item>\r\n                </form>\r\n            </ion-col>\r\n        </ion-row>\r\n    </ion-grid> -->\r\n</ion-content>\r\n<ion-footer *ngIf=\"((user.role.type=='clientadmin' || user.role.type=='bd')&& survey && survey.status=='created')||(user.role.type=='clientadmin' && survey && survey.status=='surveyassigned')\" class=\"ion-no-border white-bg\">\r\n    <ion-grid>\r\n        <ion-row class=\"ion-text-end ion-align-items-end ion-justify-content-end\">\r\n            <ion-col class=\"ion-no-margin ion-no-padding\">\r\n                <!--  <ion-col class=\"ion-no-margin ion-no-padding ion-text-end\" *ngIf=\"today==item.date\"> -->\r\n                     <ion-button class=\"ion-no-margin ion-no-padding\" style=\"float: right;margin-right: 10%;\r\n                     margin-bottom: 5%;\" fill=\"clear\"  (click)=\"assignedTo(survey)\">\r\n                     Start Survey\r\n                 </ion-button>\r\n                 </ion-col>\r\n        </ion-row>\r\n    </ion-grid>\r\n\r\n</ion-footer>\r\n<ion-footer *ngIf=\"(user.role.type=='qcinspector'&& survey && survey.status=='reviewassigned')||(survey && survey.status=='reviewassigned' && survey.reviewassignedto.id==user.id)\" class=\"ion-no-border white-bg\">\r\n    <ion-grid>\r\n        <ion-row class=\"ion-text-end ion-align-items-end ion-justify-content-end\">\r\n            <ion-col size=\"auto\">\r\n                <ion-button class=\"action-button-color\" fill=\"clear\" style=\"float: left;\" (click)=\"openreviewPassed('fail')\">Failed</ion-button>\r\n                <ion-button class=\"action-button-color\" fill=\"clear\" style=\"float: right ;\" (click)=\"openreviewPassed('pass')\">Passed</ion-button>\r\n            </ion-col>\r\n        </ion-row>\r\n    </ion-grid>\r\n\r\n</ion-footer>\r\n\r\n<!-- <ion-footer *ngIf=\"!assigned && survey\" class=\"ion-no-border white-bg\">\r\n    <ion-grid>\r\n        <ion-row class=\"ion-text-end ion-align-items-end ion-justify-content-end\">\r\n            <ion-col size=\"auto\">\r\n                <ion-button class=\"action-button-color\" fill=\"clear\" (click)=\"updateAssignee()\">Done</ion-button>\r\n            </ion-col>\r\n        </ion-row>\r\n    </ion-grid>\r\n</ion-footer> -->\r\n\r\n<!-- <ion-bottom-drawer [(state)]=\"drawerState\" minimumHeight=\"0\" dockedHeight=\"300\" draggable=\"false\" disableDrag=\"true\"\r\n                   shouldBounce=\"false\" distanceTop=\"0\" class=\"drawer\">\r\n    <form [formGroup]=\"rescheduleForm\">\r\n        <ion-grid class=\"drawer\">\r\n            <ion-row>\r\n                <ion-col size=\"12\">\r\n                    <span>date and time</span>\r\n                </ion-col>\r\n                <ion-col *ngIf=\"survey\" size=\"auto\">\r\n                    <ion-item lines=\"none\" class=\"date-picker\" (click)=\"changeDate()\">\r\n                        {{date | date: 'dd MMM'}}\r\n                    </ion-item>\r\n                </ion-col>\r\n                <ion-col *ngIf=\"survey\" size=\"auto\">\r\n                    <ion-item lines=\"none\" class=\"date-picker\" (click)=\"changeTime()\">\r\n                        {{date | date: 'hh:mm a'}}\r\n                    </ion-item>\r\n                </ion-col>\r\n            </ion-row>\r\n            <ion-row>\r\n                <ion-col size=\"12\">\r\n                    <span>comments</span>\r\n                </ion-col>\r\n                <ion-col size=\"12\">\r\n                    <ion-textarea class=\"ion-no-margin ion-no-padding comment_box\" formControlName=\"comments\"\r\n                                  rows=\"3\"></ion-textarea>\r\n                </ion-col>\r\n            </ion-row>\r\n            <ion-row>\r\n                <ion-col size=\"auto\">\r\n                    <ion-button class=\"buttom-drawer-button\" (click)=\"rescheduleSurvey()\">\r\n                        Confirm\r\n                    </ion-button>\r\n                </ion-col>\r\n                <ion-col size=\"auto\">\r\n                    <ion-button class=\"buttom-drawer-button-cancel\" fill=\"clear\" (click)=\"dismissBottomSheet()\">\r\n                        Cancel\r\n                    </ion-button>\r\n                </ion-col>\r\n            </ion-row>\r\n        </ion-grid>\r\n    </form>\r\n</ion-bottom-drawer> -->\r\n\r\n\r\n");

/***/ }),

/***/ "NKu0":
/*!******************************************************************!*\
  !*** ./src/app/survey-detail/modal-page/modal-page.component.ts ***!
  \******************************************************************/
/*! exports provided: ModalPageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModalPageComponent", function() { return ModalPageComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_modal_page_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./modal-page.component.html */ "6tPc");
/* harmony import */ var _modal_page_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modal-page.component.scss */ "pbHB");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");





let ModalPageComponent = class ModalPageComponent {
    constructor(navParam) {
        this.navParam = navParam;
    }
    ngOnInit() {
        let image = this.navParam.get('image_url');
        console.log(image);
    }
};
ModalPageComponent.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["NavParams"] }
];
ModalPageComponent.propDecorators = {
    image_url: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }]
};
ModalPageComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-modal-page',
        template: _raw_loader_modal_page_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_modal_page_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], ModalPageComponent);



/***/ }),

/***/ "U3FU":
/*!***************************************************************************!*\
  !*** ./node_modules/@ionic-native/photo-viewer/__ivy_ngcc__/ngx/index.js ***!
  \***************************************************************************/
/*! exports provided: PhotoViewer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PhotoViewer", function() { return PhotoViewer; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ionic_native_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic-native/core */ "C6fG");




var PhotoViewer = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(PhotoViewer, _super);
    function PhotoViewer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PhotoViewer.prototype.show = function (url, title, options) { return Object(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["cordova"])(this, "show", { "sync": true }, arguments); };
    PhotoViewer.pluginName = "PhotoViewer";
    PhotoViewer.plugin = "com-sarriaroman-photoviewer";
    PhotoViewer.pluginRef = "PhotoViewer";
    PhotoViewer.repo = "https://github.com/sarriaroman/photoviewer";
    PhotoViewer.platforms = ["Android", "iOS"];
PhotoViewer.ɵfac = function PhotoViewer_Factory(t) { return ɵPhotoViewer_BaseFactory(t || PhotoViewer); };
PhotoViewer.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: PhotoViewer, factory: function (t) { return PhotoViewer.ɵfac(t); } });
var ɵPhotoViewer_BaseFactory = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetInheritedFactory"](PhotoViewer);
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](PhotoViewer, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"]
    }], null, null); })();
    return PhotoViewer;
}(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["IonicNativePlugin"]));


//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9AaW9uaWMtbmF0aXZlL3BsdWdpbnMvcGhvdG8tdmlld2VyL25neC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLDhCQUFzQyxNQUFNLG9CQUFvQixDQUFDOztBQUN4RTtBQUdRLElBb0R5QiwrQkFBaUI7QUFBQztBQUU5QjtBQUVSO0FBQU0sSUFJakIsMEJBQUksYUFBQyxHQUFXLEVBQUUsS0FBYyxFQUFFLE9BQTRCO0FBRVg7QUFBNEM7QUFBd0Q7QUFBMkM7QUFBcUU7K0NBWHhRLFVBQVU7Ozs7OzBCQUNMO0FBQUMsc0JBekRQO0FBQUUsRUF5RCtCLGlCQUFpQjtBQUNqRCxTQURZLFdBQVc7QUFBSSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvcmRvdmEsIElvbmljTmF0aXZlUGx1Z2luLCBQbHVnaW4gfSBmcm9tICdAaW9uaWMtbmF0aXZlL2NvcmUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFBob3RvVmlld2VyT3B0aW9ucyB7XG4gIC8qKlxuICAgKiBTZXQgdG8gZmFsc2UgdG8gZGlzYWJsZSB0aGUgc2hhcmUgYnV0dG9uIChBbmRyb2lkIG9ubHkpLiBEZWZhdWx0OiB0cnVlXG4gICAqL1xuICBzaGFyZT86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBBZGQgSFRUUCBoZWFkZXJzIHRvIHRoZSByZXF1ZXN0LiAgVXNlZnVsIGZvciBhdXRoZW50aWNhdGVkIHBhZ2VzLlxuICAgKiBUaGUgdmFsdWUgaXMgYSBzdHJpbmcgaW4gYSBKU09OIGZvcm1hdC4gIERlZmF1bHQ6ICcnXG4gICAqL1xuICBoZWFkZXJzPzogc3RyaW5nO1xuICAvKipcbiAgICogT3B0aW9uIGZvciBjbG9zZSBidXR0b24gdmlzaWJpbGl0eSB3aGVuIHNoYXJlIGZhbHNlIFtPTkxZIEZPUiBpT1NdXG4gICAqL1xuICBjbG9zZUJ1dHRvbj86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBJZiB5b3UgbmVlZCB0byBjb3B5IGltYWdlIHRvIHJlZmVyZW5jZSBiZWZvcmUgc2hvdyB0aGVuIHNldCBpdCB0cnVlIFtPTkxZIEZPUiBpT1NdXG4gICAqL1xuICBjb3B5VG9SZWZlcmVuY2U/OiBib29sZWFuO1xuICAvKipcbiAgICogRW5hYmxlIG9yIERpc2FibGUgUGljYXNzbyBPcHRpb25zICggT25seSBBbmRyb2lkICk6IGZpdCwgY2VudGVySW5zaWRlLCBjZW50ZXJDcm9wLlxuICAgKi9cbiAgcGljY2Fzb09wdGlvbnM/OiB7XG4gICAgZml0PzogYm9vbGVhbjtcbiAgICBjZW50ZXJJbnNpZGU/OiBib29sZWFuO1xuICAgIGNlbnRlckNyb3A/OiBib29sZWFuO1xuICB9O1xufVxuXG4vKipcbiAqIEBuYW1lIFBob3RvIFZpZXdlclxuICogQGRlc2NyaXB0aW9uIFRoaXMgcGx1Z2luIGNhbiBkaXNwbGF5IHlvdXIgaW1hZ2UgaW4gZnVsbCBzY3JlZW4gd2l0aCB0aGUgYWJpbGl0eSB0byBwYW4sIHpvb20sIGFuZCBzaGFyZSB0aGUgaW1hZ2UuXG4gKiBAdXNhZ2VcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGltcG9ydCB7IFBob3RvVmlld2VyIH0gZnJvbSAnQGlvbmljLW5hdGl2ZS9waG90by12aWV3ZXIvbmd4JztcbiAqXG4gKiBjb25zdHJ1Y3Rvcihwcml2YXRlIHBob3RvVmlld2VyOiBQaG90b1ZpZXdlcikgeyB9XG4gKlxuICogLi4uXG4gKlxuICogdGhpcy5waG90b1ZpZXdlci5zaG93KCdodHRwczovL215c2l0ZS5jb20vcGF0aC90by9pbWFnZS5qcGcnKTtcbiAqXG4gKiB0aGlzLnBob3RvVmlld2VyLnNob3coJ2h0dHBzOi8vbXlzaXRlLmNvbS9wYXRoL3RvL2ltYWdlLmpwZycsICdNeSBpbWFnZSB0aXRsZScsIHtzaGFyZTogZmFsc2V9KTtcbiAqXG4gKiB0aGlzLnBob3RvVmlld2VyLnNob3coJ2h0dHBzOi8vbXlzZWN1cmVzaXRlLmNvbS9wYXRoL3RvL2ltYWdlLmpwZycsICdNeSBpbWFnZSB0aXRsZScsIHtzaGFyZTogZmFsc2UsIGhlYWRlcnM6ICd7dXNlcm5hbWU6Zm9vLHBhc3N3b3JkOmJhcn0nfSk7XG4gKiBgYGBcbiAqL1xuQFBsdWdpbih7XG4gIHBsdWdpbk5hbWU6ICdQaG90b1ZpZXdlcicsXG4gIHBsdWdpbjogJ2NvbS1zYXJyaWFyb21hbi1waG90b3ZpZXdlcicsXG4gIHBsdWdpblJlZjogJ1Bob3RvVmlld2VyJyxcbiAgcmVwbzogJ2h0dHBzOi8vZ2l0aHViLmNvbS9zYXJyaWFyb21hbi9waG90b3ZpZXdlcicsXG4gIHBsYXRmb3JtczogWydBbmRyb2lkJywgJ2lPUyddLFxufSlcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBQaG90b1ZpZXdlciBleHRlbmRzIElvbmljTmF0aXZlUGx1Z2luIHtcbiAgLyoqXG4gICAqIFNob3dzIGFuIGltYWdlIGluIGZ1bGwgc2NyZWVuXG4gICAqIEBwYXJhbSB1cmwge3N0cmluZ30gVVJMIG9yIHBhdGggdG8gaW1hZ2VcbiAgICogQHBhcmFtIHRpdGxlIHtzdHJpbmd9XG4gICAqIEBwYXJhbSBvcHRpb25zIHtQaG90b1ZpZXdlck9wdGlvbnN9XG4gICAqL1xuICBAQ29yZG92YSh7IHN5bmM6IHRydWUgfSlcbiAgc2hvdyh1cmw6IHN0cmluZywgdGl0bGU/OiBzdHJpbmcsIG9wdGlvbnM/OiBQaG90b1ZpZXdlck9wdGlvbnMpOiB2b2lkIHt9XG59XG4iXX0=

/***/ }),

/***/ "Uf8Y":
/*!*******************************************************!*\
  !*** ./src/app/survey-detail/survey-detail.page.scss ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".survey-email {\n  font-size: 0.8em;\n}\n\n.survey-name {\n  font-size: 1.7em;\n}\n\n.survey-phone {\n  font-size: 0.8em;\n}\n\nion-header {\n  color: #666666;\n}\n\n.image-count {\n  width: 48px;\n  height: 48px;\n}\n\n.data-header {\n  font-size: 0.9em;\n  color: #BFBFBF;\n}\n\n.data-point {\n  font-size: 1em;\n  color: black;\n}\n\n.address {\n  color: #3a7be0;\n}\n\n.comment-by {\n  font-size: 10px;\n  font-style: italic;\n  color: #666666 !important;\n}\n\n.main-background {\n  background: #EFEFEF;\n  border-radius: 0.5em;\n  color: #656565;\n}\n\n.date-background {\n  width: 4em;\n  height: 4em;\n  background: #3c78d8;\n  border-radius: 0.5em;\n  color: white;\n}\n\n.month {\n  font-size: 1em;\n}\n\n.day {\n  font-size: 1.5em;\n  font-weight: bold;\n}\n\n.time {\n  font-size: 1.5em;\n  font-weight: bold;\n}\n\n.reschedule-icon {\n  width: 48px;\n  height: 48px;\n}\n\n.assignee-image {\n  width: 3.5em;\n  height: 3.5em;\n  border-radius: 50%;\n  object-fit: fill;\n  border: 2px solid white;\n  padding: 8px;\n  text-align: center;\n  background: #FFF1CF;\n}\n\n.assignee-margin {\n  margin: 8px;\n}\n\n.selected {\n  border: 3px solid #3c78d8;\n  border-radius: 50%;\n}\n\n.normal {\n  border: 3px solid white;\n}\n\ndiv[scrollx=true], div[scrolly=true] {\n  position: relative;\n  overflow: hidden;\n}\n\ndiv[scrollx=true] ::-webkit-scrollbar, div[scrolly=true] ::-webkit-scrollbar {\n  display: none;\n}\n\ndiv[scrollx=true] {\n  overflow-x: auto;\n}\n\ndiv[scrolly=true] {\n  overflow-y: auto;\n}\n\n.date-picker {\n  --background: #E1E1E1;\n  --border: 2px solid #666666;\n}\n\n.picker-button {\n  --background: #3c78d8;\n  --color: white;\n}\n\n.name_div {\n  font-size: 20px;\n}\n\n.page-text-color {\n  color: #666666 !important;\n}\n\n.segments {\n  height: 40px;\n}\n\nion-segment-button {\n  width: calc(100% / 4);\n}\n\nion-segment-button ion-label {\n  max-width: calc(90vw / 4);\n}\n\n.bkg {\n  color: #666;\n  background-color: #f9f9f9;\n}\n\nion-slides {\n  height: 100%;\n}\n\n.position-fix {\n  position: absolute;\n  z-index: 999;\n  transform: translateY(-1000%);\n}\n\n.segment-btn {\n  background: blue !important;\n  color: #fff !important;\n}\n\n.wd140 {\n  min-width: auto;\n  max-width: 100%;\n  width: auto !important;\n  color: #fff;\n}\n\n.wd140 ion-label {\n  width: auto !important;\n  max-width: 100%;\n}\n\n.colorwht {\n  color: #111 !important;\n  background: #fff !important;\n}\n\nmain inner-scroll scroll-y {\n  padding: 0px !important;\n}\n\nion-slides {\n  padding: 0px !important;\n}\n\nion-content main {\n  padding: 0px !important;\n}\n\nbutton {\n  background: blue !important;\n}\n\n.hgt-margin {\n  height: 39px;\n  margin-top: 10px;\n}\n\nion-grid {\n  padding: 0px !important;\n}\n\nion-content main {\n  padding: 0px !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXHN1cnZleS1kZXRhaWwucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsZ0JBQUE7QUFDRjs7QUFFQTtFQUNFLGdCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxnQkFBQTtBQUNGOztBQUVBO0VBQ0UsY0FBQTtBQUNGOztBQUVBO0VBQ0UsV0FBQTtFQUNBLFlBQUE7QUFDRjs7QUFFQTtFQUNFLGdCQUFBO0VBQ0EsY0FBQTtBQUNGOztBQUVBO0VBQ0UsY0FBQTtFQUNBLFlBQUE7QUFDRjs7QUFFQTtFQUNFLGNBQUE7QUFDRjs7QUFFQTtFQUNFLGVBQUE7RUFDQSxrQkFBQTtFQUNBLHlCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxtQkFBQTtFQUNBLG9CQUFBO0VBQ0EsY0FBQTtBQUNGOztBQUVBO0VBQ0UsVUFBQTtFQUNBLFdBQUE7RUFDQSxtQkFBQTtFQUNBLG9CQUFBO0VBQ0EsWUFBQTtBQUNGOztBQUVBO0VBQ0UsY0FBQTtBQUNGOztBQUVBO0VBQ0UsZ0JBQUE7RUFDQSxpQkFBQTtBQUNGOztBQUVBO0VBQ0UsZ0JBQUE7RUFDQSxpQkFBQTtBQUNGOztBQUVBO0VBQ0UsV0FBQTtFQUNBLFlBQUE7QUFDRjs7QUFFQTtFQUNFLFlBQUE7RUFDQSxhQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLHVCQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7QUFDRjs7QUFFQTtFQUNFLFdBQUE7QUFDRjs7QUFFQTtFQUNFLHlCQUFBO0VBQ0Esa0JBQUE7QUFDRjs7QUFFQTtFQUNFLHVCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxrQkFBQTtFQUNBLGdCQUFBO0FBQ0Y7O0FBQ0U7RUFDRSxhQUFBO0FBQ0o7O0FBR0E7RUFDRSxnQkFBQTtBQUFGOztBQUdBO0VBQ0UsZ0JBQUE7QUFBRjs7QUFHQTtFQUNFLHFCQUFBO0VBQ0EsMkJBQUE7QUFBRjs7QUFHQTtFQUNHLHFCQUFBO0VBQ0EsY0FBQTtBQUFIOztBQUdBO0VBQ0UsZUFBQTtBQUFGOztBQUdBO0VBQ0UseUJBQUE7QUFBRjs7QUFHQTtFQUNFLFlBQUE7QUFBRjs7QUFHQTtFQUNFLHFCQUFBO0FBQUY7O0FBRUU7RUFDSSx5QkFBQTtBQUFOOztBQUtBO0VBQ0UsV0FBQTtFQUNBLHlCQUFBO0FBRkY7O0FBSUE7RUFDRSxZQUFBO0FBREY7O0FBSUE7RUFDRSxrQkFBQTtFQUNBLFlBQUE7RUFDQSw2QkFBQTtBQURGOztBQUlBO0VBQ0EsMkJBQUE7RUFDQSxzQkFBQTtBQURBOztBQUdBO0VBQ0EsZUFBQTtFQUNBLGVBQUE7RUFBZ0Isc0JBQUE7RUFDaEIsV0FBQTtBQUNBOztBQUNBO0VBQWlCLHNCQUFBO0VBQXVCLGVBQUE7QUFJeEM7O0FBRkE7RUFDRSxzQkFBQTtFQUNBLDJCQUFBO0FBS0Y7O0FBRkE7RUFDQSx1QkFBQTtBQUtBOztBQUhBO0VBQ0UsdUJBQUE7QUFNRjs7QUFGRTtFQUNFLHVCQUFBO0FBS0o7O0FBREE7RUFDRSwyQkFBQTtBQUlGOztBQURBO0VBQ0UsWUFBQTtFQUNBLGdCQUFBO0FBSUY7O0FBRkE7RUFDRSx1QkFBQTtBQUtGOztBQUZFO0VBQ0UsdUJBQUE7QUFLSiIsImZpbGUiOiJzdXJ2ZXktZGV0YWlsLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5zdXJ2ZXktZW1haWwge1xyXG4gIGZvbnQtc2l6ZTogMC44ZW07XHJcbn1cclxuXHJcbi5zdXJ2ZXktbmFtZSB7XHJcbiAgZm9udC1zaXplOiAxLjdlbTtcclxufVxyXG5cclxuLnN1cnZleS1waG9uZSB7XHJcbiAgZm9udC1zaXplOiAwLjhlbTtcclxufVxyXG5cclxuaW9uLWhlYWRlciB7XHJcbiAgY29sb3I6ICM2NjY2NjY7XHJcbn1cclxuXHJcbi5pbWFnZS1jb3VudCB7XHJcbiAgd2lkdGg6IDQ4cHg7XHJcbiAgaGVpZ2h0OiA0OHB4O1xyXG59XHJcblxyXG4uZGF0YS1oZWFkZXIge1xyXG4gIGZvbnQtc2l6ZTogMC45ZW07XHJcbiAgY29sb3I6ICNCRkJGQkY7XHJcbn1cclxuXHJcbi5kYXRhLXBvaW50IHtcclxuICBmb250LXNpemU6IDFlbTtcclxuICBjb2xvcjogYmxhY2s7XHJcbn1cclxuXHJcbi5hZGRyZXNzIHtcclxuICBjb2xvcjogIzNhN2JlMDtcclxufVxyXG5cclxuLmNvbW1lbnQtYnkge1xyXG4gIGZvbnQtc2l6ZTogMTBweDtcclxuICBmb250LXN0eWxlOiBpdGFsaWM7XHJcbiAgY29sb3I6ICM2NjY2NjYgIWltcG9ydGFudDtcclxufVxyXG5cclxuLm1haW4tYmFja2dyb3VuZCB7XHJcbiAgYmFja2dyb3VuZDogI0VGRUZFRjtcclxuICBib3JkZXItcmFkaXVzOiAwLjVlbTtcclxuICBjb2xvcjogIzY1NjU2NTtcclxufVxyXG5cclxuLmRhdGUtYmFja2dyb3VuZCB7XHJcbiAgd2lkdGg6IDRlbTtcclxuICBoZWlnaHQ6IDRlbTtcclxuICBiYWNrZ3JvdW5kOiAjM2M3OGQ4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDAuNWVtO1xyXG4gIGNvbG9yOiB3aGl0ZTtcclxufVxyXG5cclxuLm1vbnRoIHtcclxuICBmb250LXNpemU6IDFlbTtcclxufVxyXG5cclxuLmRheSB7XHJcbiAgZm9udC1zaXplOiAxLjVlbTtcclxuICBmb250LXdlaWdodDogYm9sZDtcclxufVxyXG5cclxuLnRpbWUge1xyXG4gIGZvbnQtc2l6ZTogMS41ZW07XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbn1cclxuXHJcbi5yZXNjaGVkdWxlLWljb24ge1xyXG4gIHdpZHRoOiA0OHB4O1xyXG4gIGhlaWdodDogNDhweDtcclxufVxyXG5cclxuLmFzc2lnbmVlLWltYWdlIHtcclxuICB3aWR0aDogMy41ZW07XHJcbiAgaGVpZ2h0OiAzLjVlbTtcclxuICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgb2JqZWN0LWZpdDogZmlsbDtcclxuICBib3JkZXI6IDJweCBzb2xpZCB3aGl0ZTtcclxuICBwYWRkaW5nOiA4cHg7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIGJhY2tncm91bmQ6ICNGRkYxQ0Y7XHJcbn1cclxuXHJcbi5hc3NpZ25lZS1tYXJnaW4ge1xyXG4gIG1hcmdpbjogOHB4O1xyXG59XHJcblxyXG4uc2VsZWN0ZWQge1xyXG4gIGJvcmRlcjogM3B4IHNvbGlkICMzYzc4ZDg7XHJcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG59XHJcblxyXG4ubm9ybWFsIHtcclxuICBib3JkZXI6IDNweCBzb2xpZCB3aGl0ZTtcclxufVxyXG5cclxuZGl2W3Njcm9sbHg9dHJ1ZV0sIGRpdltzY3JvbGx5PXRydWVdIHtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuXHJcbiAgOjotd2Via2l0LXNjcm9sbGJhciB7XHJcbiAgICBkaXNwbGF5OiBub25lO1xyXG4gIH1cclxufVxyXG5cclxuZGl2W3Njcm9sbHg9dHJ1ZV0ge1xyXG4gIG92ZXJmbG93LXg6IGF1dG87XHJcbn1cclxuXHJcbmRpdltzY3JvbGx5PXRydWVdIHtcclxuICBvdmVyZmxvdy15OiBhdXRvO1xyXG59XHJcblxyXG4uZGF0ZS1waWNrZXIge1xyXG4gIC0tYmFja2dyb3VuZDogI0UxRTFFMTtcclxuICAtLWJvcmRlcjogMnB4IHNvbGlkICM2NjY2NjY7XHJcbn1cclxuXHJcbi5waWNrZXItYnV0dG9uIHtcclxuICAgLS1iYWNrZ3JvdW5kOiAjM2M3OGQ4O1xyXG4gICAtLWNvbG9yOiB3aGl0ZTtcclxuIH1cclxuXHJcbi5uYW1lX2RpdntcclxuICBmb250LXNpemU6IDIwcHg7XHJcbn1cclxuXHJcbi5wYWdlLXRleHQtY29sb3Ige1xyXG4gIGNvbG9yOiAjNjY2NjY2ICFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbi5zZWdtZW50c3tcclxuICBoZWlnaHQ6NDBweDtcclxufVxyXG5cclxuaW9uLXNlZ21lbnQtYnV0dG9uIHtcclxuICB3aWR0aDogY2FsYygxMDAlIC8gNCk7XHJcblxyXG4gIGlvbi1sYWJlbCB7XHJcbiAgICAgIG1heC13aWR0aDogY2FsYyg5MHZ3IC8gNCk7XHJcbiAgfVxyXG59XHJcblxyXG5cclxuLmJrZ3tcclxuICBjb2xvcjogIzY2NjtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjlmOWY5O1xyXG59XHJcbmlvbi1zbGlkZXMge1xyXG4gIGhlaWdodDogMTAwJTtcclxufVxyXG5cclxuLnBvc2l0aW9uLWZpeHtcclxuICBwb3NpdGlvbjphYnNvbHV0ZTtcclxuICB6LWluZGV4Ojk5OTtcclxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTEwMDAlKTtcclxufVxyXG5cclxuLnNlZ21lbnQtYnRue1xyXG5iYWNrZ3JvdW5kOiBibHVlICFpbXBvcnRhbnQ7XHJcbmNvbG9yOiNmZmYgIWltcG9ydGFudDtcclxufVxyXG4ud2QxNDB7XHJcbm1pbi13aWR0aDogYXV0bztcclxubWF4LXdpZHRoOiAxMDAlO3dpZHRoOiBhdXRvICFpbXBvcnRhbnQ7XHJcbmNvbG9yOiNmZmY7XHJcbn1cclxuLndkMTQwIGlvbi1sYWJlbHt3aWR0aDogYXV0byAhaW1wb3J0YW50O21heC13aWR0aDogMTAwJTt9XHJcblxyXG4uY29sb3J3aHR7XHJcbiAgY29sb3I6IzExMSAhaW1wb3J0YW50O1xyXG4gIGJhY2tncm91bmQ6ICNmZmYgIWltcG9ydGFudDtcclxufVxyXG5cclxubWFpbiBpbm5lci1zY3JvbGwgc2Nyb2xsLXl7XHJcbnBhZGRpbmc6MHB4ICFpbXBvcnRhbnQ7fVxyXG5cclxuaW9uLXNsaWRlc3tcclxuICBwYWRkaW5nOjBweCAhaW1wb3J0YW50O1xyXG59XHJcblxyXG5pb24tY29udGVudHtcclxuICBtYWlue1xyXG4gICAgcGFkZGluZzowcHggIWltcG9ydGFudDtcclxuICB9XHJcbn1cclxuXHJcbmJ1dHRvbntcclxuICBiYWNrZ3JvdW5kOiBibHVlICFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbi5oZ3QtbWFyZ2lue1xyXG4gIGhlaWdodDogMzlweDtcclxuICBtYXJnaW4tdG9wOiAxMHB4O1xyXG59XHJcbmlvbi1ncmlke1xyXG4gIHBhZGRpbmc6MHB4ICFpbXBvcnRhbnQ7XHJcbn1cclxuaW9uLWNvbnRlbnR7XHJcbiAgbWFpbntcclxuICAgIHBhZGRpbmc6MHB4ICFpbXBvcnRhbnQ7XHJcbiAgfVxyXG59XHJcblxyXG4iXX0= */");

/***/ }),

/***/ "XP+U":
/*!*****************************************************!*\
  !*** ./src/app/survey-detail/survey-detail.page.ts ***!
  \*****************************************************/
/*! exports provided: SurveyDetailPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SurveyDetailPage", function() { return SurveyDetailPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_survey_detail_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./survey-detail.page.html */ "LDBz");
/* harmony import */ var _survey_detail_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./survey-detail.page.scss */ "Uf8Y");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _utilities_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utilities.service */ "oTnF");
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../api.service */ "yTNM");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _storage_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../storage.service */ "qkCY");
/* harmony import */ var ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ion-bottom-drawer */ "rFvw");
/* harmony import */ var _ionic_native_date_picker_ngx__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ionic-native/date-picker/ngx */ "ya1t");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_native_launch_navigator_ngx__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ionic-native/launch-navigator/ngx */ "fGQ8");
/* harmony import */ var _contants__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../contants */ "6qqZ");
/* harmony import */ var _modal_page_modal_page_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./modal-page/modal-page.component */ "NKu0");
/* harmony import */ var _ionic_native_photo_viewer_ngx__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @ionic-native/photo-viewer/ngx */ "U3FU");
















let SurveyDetailPage = class SurveyDetailPage {
    constructor(utilities, apiService, route, navController, alertController, storage, datePicker, formBuilder, launchNavigator, toastController, modalController, photoViewer, router) {
        this.utilities = utilities;
        this.apiService = apiService;
        this.route = route;
        this.navController = navController;
        this.alertController = alertController;
        this.storage = storage;
        this.datePicker = datePicker;
        this.formBuilder = formBuilder;
        this.launchNavigator = launchNavigator;
        this.toastController = toastController;
        this.modalController = modalController;
        this.photoViewer = photoViewer;
        this.router = router;
        this.slideOpts = {
            initialSlide: 1,
            speed: 400
        };
        this.listOfAssignees = [];
        this.drawerState = ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_9__["DrawerState"].Bottom;
        this.assigned = false;
        this.refreshDataOnPreviousPage = 0;
        this.segments = 'SiteDetils';
        this.electricals = 'MSB';
        this.options = {
            start: '',
            app: this.launchNavigator.APP.GOOGLE_MAPS
        };
        this.iseditable = true;
        this.surveyId = +this.route.snapshot.paramMap.get('id');
        this.rescheduleForm = this.formBuilder.group({
            datetime: new _angular_forms__WEBPACK_IMPORTED_MODULE_11__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_11__["Validators"].required]),
            comments: new _angular_forms__WEBPACK_IMPORTED_MODULE_11__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_11__["Validators"].required])
        });
        this.assigneeForm = this.formBuilder.group({
            assignedto: new _angular_forms__WEBPACK_IMPORTED_MODULE_11__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_11__["Validators"].required])
        });
        if (this.storage.getUser().role.id == _contants__WEBPACK_IMPORTED_MODULE_13__["ROLES"].Surveyor) {
            this.iseditable = false;
        }
    }
    ngOnInit() {
        this.user = this.storage.getUser();
        console.log(this.user);
        this.dataSubscription = this.utilities.getSurveyDetailsRefresh().subscribe((result) => {
            this.refreshDataOnPreviousPage++;
            this.getSurveyDetails();
            this.getAssignees();
        });
    }
    ngOnDestroy() {
        this.dataSubscription.unsubscribe();
        if (this.refreshDataOnPreviousPage > 1) {
            this.utilities.sethomepageSurveyRefresh(true);
        }
    }
    getSurveyDetails() {
        this.utilities.showLoading('Getting Survey Details').then((success) => {
            this.apiService.getSurveyDetail(this.surveyId).subscribe((result) => {
                this.utilities.hideLoading().then(() => {
                    this.setData(result);
                    console.log(">>>", result);
                });
            }, (error) => {
                this.utilities.hideLoading();
            });
        });
    }
    setData(result) {
        console.log(result);
        this.survey = result;
        if (this.survey.acdisconnect) {
            if (this.survey.acdisconnect === 'true') {
                this.survey.acdisconnect = 'yes';
            }
            else {
                this.survey.acdisconnect = 'no';
            }
        }
        if (this.survey.pvmeter) {
            if (this.survey.pvmeter === 'true') {
                this.survey.pvmeter = 'yes';
            }
            else {
                this.survey.pvmeter = 'no';
            }
        }
        this.assigned = this.survey.assignedto !== null && this.survey.assignedto !== undefined;
        this.rescheduleForm.patchValue({
            datetime: this.survey.datetime
        });
    }
    chat() {
    }
    goBack() {
        this.navController.pop();
    }
    getSurveyImages() {
        return this.survey.mspimages.length
            + this.survey.utilitymeterimages.length
            + this.survey.pvinverterimages.length
            + this.survey.pvmeterimages.length
            + this.survey.roofimages.length
            + this.survey.acdisconnectimages.length
            + this.survey.existingsubpanelimages.length
            + this.survey.appliancesimages.length
            + this.survey.atticimages.length
            + this.survey.roofdimensionimages.length
            + this.survey.obstaclesimages.length
            + this.survey.obstaclesdimensionsimages.length;
    }
    deleteSurvey() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const toast = yield this.toastController.create({
                header: 'Delete Survey',
                message: 'Are you sure you want to delete this survey?',
                cssClass: 'my-custom-class',
                buttons: [
                    {
                        text: 'Yes',
                        handler: () => {
                            this.deleteSurveyFromServer();
                        }
                    }, {
                        text: 'No'
                    }
                ]
            });
            toast.present();
        });
    }
    assignedTo(surveyData) {
        let postData = {
            assignedto: this.user.id,
            status: "surveyinprocess"
        };
        this.apiService.updateSurveyForm(postData, surveyData.id).subscribe(res => {
            console.log(res);
        });
        this.router.navigate(['/camera/' + surveyData.id + '/' + surveyData.jobtype + '/' + surveyData.city + '/' + surveyData.state + '/' + surveyData.latitude + '/' + surveyData.longitude]);
    }
    deleteSurveyFromServer() {
        this.utilities.showLoading('Deleting Survey').then((success) => {
            this.apiService.deleteSurvey(this.surveyId).subscribe((result) => {
                this.utilities.hideLoading().then(() => {
                    this.utilities.showSnackBar('Survey deleted successfully');
                    this.navController.pop();
                    this.utilities.sethomepageSurveyRefresh(true);
                });
            }, (error) => {
                this.utilities.hideLoading().then(() => {
                    this.utilities.errorSnackBar('Some Error Occurred');
                });
            });
        });
    }
    getAssignees() {
        this.apiService.getSurveyors().subscribe(assignees => {
            this.listOfAssignees = [];
            assignees.forEach(item => this.listOfAssignees.push(item));
            console.log(this.listOfAssignees);
        });
    }
    reschedule() {
        this.drawerState = ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_9__["DrawerState"].Docked;
        this.date = this.survey.datetime;
    }
    changeDate() {
        const currentDate = new Date(this.date);
        console.log(currentDate);
        this.datePicker.show({
            date: new Date(this.date),
            minDate: new Date(),
            mode: 'date',
            androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
        }).then(date => {
            this.date = date;
            this.rescheduleForm.patchValue({
                datetime: this.date.getTime()
            });
        }, err => console.log('Error occurred while getting date: ', err));
    }
    changeTime() {
        const currentDate = new Date(this.date);
        console.log(currentDate);
        this.datePicker.show({
            date: new Date(this.date),
            mode: 'time',
            minDate: new Date(),
            androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
        }).then(date => {
            const oldDate = new Date(this.date);
            oldDate.setHours(date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
            this.date = oldDate;
            this.rescheduleForm.patchValue({
                datetime: this.date.getTime()
            });
        }, err => console.log('Error occurred while getting date: ', err));
    }
    rescheduleSurvey() {
        if (this.rescheduleForm.status === 'INVALID') {
            this.utilities.errorSnackBar('Invalid Data');
        }
        else {
            this.utilities.showLoading('Updating').then(() => {
                this.apiService.updateSurveyForm(this.rescheduleForm.value, this.surveyId).subscribe(response => {
                    this.utilities.hideLoading().then(() => {
                        this.survey = response;
                        this.drawerState = ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_9__["DrawerState"].Bottom;
                    });
                }, responseError => {
                    this.utilities.hideLoading().then(() => {
                        const error = responseError.error;
                        if (error.message instanceof String) {
                            this.utilities.errorSnackBar(error.message);
                        }
                        else if (error.message instanceof Array) {
                            this.utilities.errorSnackBar(error.message[0].messages[0].message);
                        }
                    });
                });
            });
        }
    }
    dismissBottomSheet() {
        this.drawerState = ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_9__["DrawerState"].Bottom;
    }
    updateAssignee() {
        if (this.assigneeForm.status === 'INVALID') {
            this.utilities.errorSnackBar('Please select an assignee');
        }
        else {
            this.utilities.showLoading('Updating').then(() => {
                this.apiService.updateSurveyForm(this.assigneeForm.value, this.surveyId).subscribe((success) => {
                    this.utilities.hideLoading().then(() => {
                        this.utilities.showSnackBar('Assignee selected');
                        this.setData(success);
                        this.refreshDataOnPreviousPage++;
                    });
                }, (error) => {
                    this.utilities.hideLoading().then(() => {
                        this.utilities.errorSnackBar('Some Error Occurred');
                    });
                });
            });
        }
    }
    openAddressOnMap(address) {
        this.launchNavigator.navigate(address, this.options);
    }
    openModal(image) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            console.log(image);
            const modal = yield this.modalController.create({
                component: _modal_page_modal_page_component__WEBPACK_IMPORTED_MODULE_14__["ModalPageComponent"],
                showBackdrop: true,
                backdropDismiss: true,
                componentProps: {
                    image_url: image,
                },
            });
            return yield modal.present();
        });
    }
    reportDesignReviewFailure() {
        console.log("fail");
        //console.log("Value is" + this.reviewIssuesForm.value);
        let cdate = Date.now();
        this.reviewenddatetime = cdate;
        const postData = {
            status: "reviewfailed",
            reviewissues: this.reviewcomments,
            reviewendtime: this.reviewenddatetime,
        };
        //console.log("this is" + this.survey.reviewstarttime);
        // console.log("this is"+ this.reviewstartdatetime);
        this.apiService.updateSurveyForm(postData, this.survey.id)
            .subscribe(response => {
            this.utilities.showSnackBar("Survey status has been updated successfully.");
            this.utilities.sethomepageSurveyRefresh(true);
            if (this.user.role.type == 'qcinspector') {
                this.navController.navigateRoot(['analystoverview/survey']);
            }
            else {
                this.navController.navigateRoot(['homepage/survey']);
            }
            //this.data.triggerEditEvent = false;
            //this.dialogRef.close(this.data);
        }, error => {
            this.utilities.errorSnackBar("Error");
        });
    }
    reportDesignReviewSuccess() {
        // this.countdownservice.stopTimer();
        let cdate = Date.now();
        this.reviewenddatetime = cdate;
        const postData = {
            status: "reviewpassed",
            //reviewissues : this.reviewIssuesForm.get('reviewIssues').value,
            //reviewstarttime : this.reviewstartdatetime,
            reviewissues: this.reviewcomments,
            reviewendtime: this.reviewenddatetime
        };
        this.apiService
            .updateSurveyForm(postData, this.survey.id)
            .subscribe(response => {
            this.utilities.showSnackBar("Survey status has been updated successfully.");
            this.utilities.sethomepageSurveyRefresh(true);
            if (this.user.role.type == 'qcinspector') {
                this.navController.navigateRoot(['analystoverview/survey']);
            }
            else {
                this.navController.navigateRoot(['homepage/survey']);
            }
            // this.triggerEditEvent = false;
            //this.dialogRef.close(this.data);
        }, error => {
            this.utilities.errorSnackBar("Error");
        });
    }
    openreviewPassed(value) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            var checkValue = value;
            console.log(checkValue);
            if (checkValue == 'pass') {
                const alert = yield this.alertController.create({
                    cssClass: 'alertClass',
                    header: 'Confirm!',
                    message: 'Would you like to  Add Comments!!',
                    inputs: [{ name: 'comment',
                            id: 'comment',
                            type: 'textarea',
                            placeholder: 'Enter Comment' }
                    ],
                    buttons: [
                        {
                            text: 'Passed',
                            cssClass: 'secondary',
                            handler: (alertData) => {
                                console.log('Confirm Cancel: blah');
                                this.reviewcomments = alertData.comment;
                                this.reportDesignReviewSuccess();
                                // if(checkValue == 'pass'){
                                // this.reportDesignReviewSuccess();
                                // }
                                // else if(checkValue == 'fail')
                                // {
                                //   if(this.reviewcomments !== "")
                                // {
                                // this.reportDesignReviewFailure();
                                // }
                                // else{
                                //   this.utilities.errorSnackBar("Please Enter Issues");
                                // }
                            }
                        }
                    ]
                });
                yield alert.present();
            }
            else if (checkValue == 'fail') {
                const alert = yield this.alertController.create({
                    cssClass: 'alertClass',
                    header: 'Confirm!',
                    message: 'Would you like to  Add Comments!!',
                    inputs: [{ name: 'comment',
                            id: 'comment',
                            type: 'textarea',
                            placeholder: 'Enter Comment' }
                    ],
                    buttons: [
                        {
                            text: 'Failed',
                            cssClass: 'secondary',
                            handler: (alertData) => {
                                console.log('Confirm Cancel: blah');
                                this.reviewcomments = alertData.comment;
                                if (this.reviewcomments !== "") {
                                    this.reportDesignReviewFailure();
                                }
                                else {
                                    this.utilities.errorSnackBar("Please Enter Issues");
                                }
                                // if(checkValue == 'pass'){
                                // this.reportDesignReviewSuccess();
                                // }
                                // else if(checkValue == 'fail')
                                // {
                                //   if(this.reviewcomments !== "")
                                //   {
                                //   this.reportDesignReviewFailure();
                                //   }
                                //   else{
                                //     this.utilities.errorSnackBar("Please Enter Issues");
                                //   }
                                // }
                            }
                        }
                    ]
                });
                yield alert.present();
            }
        });
    }
    showimage(url) {
        this.photoViewer.show(url);
    }
};
SurveyDetailPage.ctorParameters = () => [
    { type: _utilities_service__WEBPACK_IMPORTED_MODULE_4__["UtilitiesService"] },
    { type: _api_service__WEBPACK_IMPORTED_MODULE_5__["ApiService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__["ActivatedRoute"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_7__["NavController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_7__["AlertController"] },
    { type: _storage_service__WEBPACK_IMPORTED_MODULE_8__["StorageService"] },
    { type: _ionic_native_date_picker_ngx__WEBPACK_IMPORTED_MODULE_10__["DatePicker"] },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_11__["FormBuilder"] },
    { type: _ionic_native_launch_navigator_ngx__WEBPACK_IMPORTED_MODULE_12__["LaunchNavigator"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_7__["ToastController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_7__["ModalController"] },
    { type: _ionic_native_photo_viewer_ngx__WEBPACK_IMPORTED_MODULE_15__["PhotoViewer"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"] }
];
SurveyDetailPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-survey-detail',
        template: _raw_loader_survey_detail_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_survey_detail_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], SurveyDetailPage);



/***/ }),

/***/ "pbHB":
/*!********************************************************************!*\
  !*** ./src/app/survey-detail/modal-page/modal-page.component.scss ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".modal-wrapper.sc-ion-modal-ios {\n  height: 100% !important;\n  width: 100% !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFxtb2RhbC1wYWdlLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksdUJBQUE7RUFDQSxzQkFBQTtBQUNKIiwiZmlsZSI6Im1vZGFsLXBhZ2UuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubW9kYWwtd3JhcHBlci5zYy1pb24tbW9kYWwtaW9zIHtcclxuICAgIGhlaWdodDoxMDAlICFpbXBvcnRhbnQ7XHJcbiAgICB3aWR0aDoxMDAlICFpbXBvcnRhbnQ7XHJcbn0iXX0= */");

/***/ })

}]);
//# sourceMappingURL=survey-detail-survey-detail-module.js.map