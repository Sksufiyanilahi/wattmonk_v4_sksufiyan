(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pestamp-homepage-pestamp-homepage-module"],{

/***/ "40Qx":
/*!*********************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pestamp-homepage/pestamp-design/pestamp-design.component.html ***!
  \*********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-segment scrollable (ionChange)=\"segmentChanged($event)\" value=\"newpestamp\" mode=\"md\">\r\n  <ion-segment-button value=\"newpestamp\">\r\n    <ion-label class=\"segment-btn\">New</ion-label>\r\n  </ion-segment-button>\r\n  <ion-segment-button value=\"InStamping\">\r\n    <ion-label class=\"segment-btn\">In Stamping</ion-label>\r\n  </ion-segment-button>\r\n  <ion-segment-button value=\"completed\">\r\n    <ion-label class=\"segment-btn\">Completed</ion-label>\r\n  </ion-segment-button>\r\n  <!-- <ion-segment-button value=\"InReview\">\r\n    <ion-label class=\"segment-btn\"> In Review</ion-label>\r\n  </ion-segment-button> -->\r\n  <ion-segment-button value=\"delivered\">\r\n    <ion-label class=\"segment-btn\">Delivered</ion-label>\r\n  </ion-segment-button>\r\n</ion-segment>\r\n<ion-content (click)=\"close()\" style=\"padding-bottom: 250px;position: sticky;\">\r\n  <ion-refresher slot=\"fixed\" (ionRefresh)=\"refreshDesigns($event)\">\r\n    <ion-refresher-content></ion-refresher-content>\r\n  </ion-refresher>\r\n<ion-grid *ngIf=\"listOfDesignsHelper.length !== 0 ;else nodesignFound\">\r\n    <!-- <ion-row *ngFor=\"let item of listOfDesignsHelper;let i = index\"> -->\r\n      <!-- <ion-virtual-scroll [items]=\"listOfDesignsHelper\"> -->\r\n          <ion-row *ngFor=\"let item of listOfDesignsHelper;let i = index\">\r\n              <!-- <ion-row *virtualItem=\"let item;let i = index\"> -->\r\n        <!-- <ion-col size=\"12\" class=\"ion-margin-top\">\r\n                <span class=\"ion-padding\" *ngIf=\"today === item.date\">\r\n                    Today\r\n                    </span>\r\n            <span class=\"ion-padding\" *ngIf=\"today !== item.date\">\r\n                        {{item.date | date: 'dd MMM yyyy'}}\r\n                </span>\r\n        </ion-col> -->\r\n        <ion-col *ngFor=\"let designData of item.listOfDesigns;let j = index;trackBy: trackdesign\" size=\"12\">\r\n            <ion-card class=\"ion-no-padding custom-card ion-no-margin\" style=\"height: 100%;\" (click)=\"gotoDetails(designData,$event)\">\r\n                <p class=\"customer-name\" *ngIf=\"designData.personname != null && designData.personname != ''\"\r\n                routerDirection=\"forward\">{{designData.personname}}\r\n                <!-- <span class=\"chipdetail\" style=\"background-color: #1289A7;\" [routerLink]=\"['/permit-design-details/',designData.id]\" routerDirection=\"forward\">\r\n                  {{designData.deliverydate | date: 'hh:mm a'}}\r\n              </span> -->\r\n              <span class=\"chipdetail ml-1 ml-1\" style=\"background-color: #FA983A;\" \r\n                    *ngIf=\"designData.isoutsourced == 'true'\">Wattmonk</span>\r\n              <span class=\"chipdetail\" style=\"background-color: rgb(246, 77, 10);\" *ngIf=\"designData.status == 'declined'\"  >On Hold</span>\r\n\r\n              <!-- <span class=\"chipdetail\" style=\"background-color: rgb(246, 77, 10);\" *ngIf=\"designData.status == 'reviewfailed'\"  >Review Failed</span> -->\r\n              <!-- <span class=\"chipdetail\" style=\"background-color: rgb(246, 104, 10);\" *ngIf=\"designData.isoverdue\" >Overdue</span> -->\r\n              <span class=\"chipdetail\" style=\"background-color: rgb(109, 187, 26);\" *ngIf=\"designData.status == 'accepted'\" >Accepted</span>\r\n              <!-- <span class=\"chipdetail\" style=\"background-color: rgb(109, 187, 26);\" *ngIf=\"designData.status == 'reviewpassed'\" >Review Passed</span> -->\r\n              <span class=\"chipdetail\" style=\"background-color: rgb(109, 187, 26);\" *ngIf=\"designData.status == 'delivered'\" >Delivered</span>\r\n              <span class=\"chipdetail\" style=\"background-color: rgb(109, 187, 26);padding: 4px 5px;\" *ngIf=\"designData.status == 'completed'\" ><ion-icon name=\"checkmark-done-outline\" style=\"color: #fff;\"></ion-icon></span>\r\n              <span class=\"chipdetail\" style=\"background-color: #1289A7;;\" *ngIf=\"designData.status == 'created'\" >Unassigned</span>\r\n              <span class=\"chipdetail\" style=\"background-color: #1289A7;;\" *ngIf=\"designData.status == 'assigned'\" >Assigned</span>\r\n              <!-- <span class=\"chipdetail\" style=\"background-color: #1289A7;;\" *ngIf=\"designData.status == 'reviewassigned'\" >In Review</span> -->\r\n              <span class=\"chipdetail\" *ngIf=\"designData.status == 'outsourced' && (userData.role.type=='clientadmin'|| userData.role.type=='clientsuperadmin')\" style=\"background-color: #95afc0;\" >Waiting for acceptance</span>\r\n              <span class=\"chipdetail\" style=\"background-color: rgb(183,21,64)\" *ngIf=\"designData.isinrevisionstate\"  >Revision</span>\r\n\r\n              <span fill=\"clear\" background-border=\"clear\" (click)=\"gotoActivity(designData,$event)\" class=\"imagebutton\"  size=\"small\"  ><img  style= \"height:20px\" src=\"assets/images/activitylist.png\" /></span>\r\n              <ng-container *ngIf=\"designData?.chatid!==null && designData?.addedtogroupchat\">\r\n                <span fill=\"clear\" background-border=\"clear\" (click)=\"gotoChats(designData,$event)\" class=\"chatbutton\"  size=\"small\"  ><img  style= \"height:20px\" src=\"assets/images/chat.svg\" /></span>\r\n              </ng-container>\r\n\r\n      </p>\r\n\r\n      <p style=\"margin:0px\">\r\n          <span class=\"customer-email\" \r\n                  routerDirection=\"forward\">{{designData.email}}</span>\r\n                  <span *ngIf=\"designData.isoverdue\" class=\"latebystyle\"><strong>Late by {{designData.lateby}}</strong></span>\r\n                  <!-- <ion-col *ngIf=\"segments=='requesttype=permit&status=reviewassigned&status=reviewfailed&status=reviewpassed' && userData.role.type != 'clientsuperadmin' && userData.role.type !== 'clientadmin'\"  style=\"font-size: 0.8em;\"> -->\r\n                <!-- </ion-col> -->\r\n\r\n      </p>\r\n      <p style=\"margin:0px\"  >\r\n                <a href=\"tel:{{designData.contactnumber}}\" style=\"text-decoration: none;\" class=\"z-100\">\r\n                    <span class=\"customer-phone\" *ngIf=\"designData.contactnumber != null && designData.contactnumber != ''\">{{designData.contactnumber}}</span></a>\r\n                    <span class=\"recordupdatedon\">Updated {{designData.recordupdatedon}}</span>\r\n                  </p>\r\n                <span class=\"customer-address z-100\" *ngIf=\"designData.deliveryaddress != null && designData.deliveryaddress != ''\"\r\n                        (click)=\"openAddressOnMap(designData.address,$event)\">{{(designData.deliveryaddress | slice:0:60) + (designData.deliveryaddress.length > 60 ? '...' : '')}}\r\n\r\n                             <ion-col>\r\n\r\n                                </ion-col>\r\n\r\n                    </span>\r\n                    <ion-col *ngIf=\"designData.status=='assigned' || designData.status=='completed' || designData.status=='delivered'\" style=\"font-size: 0.8em;padding-right: 0px;\">\r\n                    <span style=\" float:right\"><strong>Assigned to : {{designData.assignedto.firstname | titlecase}} {{designData.assignedto.lastname | titlecase}}</strong></span>\r\n                    </ion-col>\r\n                    <!-- <ion-row style=\"margin-bottom: 0px;\" >\r\n                        <ion-col *ngIf=\"designData.status == 'assigned'&& userData.role.type!='clientsuperadmin' && userData.role.type!='clientadmin'\">\r\n                            <span *ngIf=\"designData.status == 'assigned'\" style=\"float:right;text-align: right;\">\r\n                                {{designData.designremainingtime}}</span></ion-col>\r\n                                <ion-col *ngIf=\"designData.status == 'outsourced'\">\r\n                                    <span *ngIf=\"designData.status == 'outsourced'\" style=\"float:right;text-align: right;\">\r\n                                        {{designData.pestampacceptanceremainingtime}}</span></ion-col>\r\n                    </ion-row> -->\r\n                    <ion-row class=\"ion-no-margin ion-no-margin\">\r\n                <!-- <ion-row style=\"margin-bottom: 0px;\" [routerLink]=\"['/permit-design-details/',designData.id]\"> -->\r\n                  <!-- <ion-row style=\"margin-bottom: 0px;\" > -->\r\n                   <ion-col style=\"padding-left:0px\" >\r\n                    <span class=\"chipdetail\"  style=\"background-color: #95afc0;align-self: center;\" >{{designData?.source | titlecase}}</span>\r\n                    <span class=\"chipdetail\"  style=\"background-color: #95afc0;align-self: center;\" >{{designData?.propertytype | titlecase}}</span>\r\n                    <span class=\"chipdetail\"  style=\"background-color: #95afc0;align-self: center;\" >{{designData?.type | titlecase}}</span>\r\n                    <!-- <span class=\"chipdetail\" style=\"background-color: #95afc0;align-self: center;\" >{{designData?.jobtype=='pvbattery' ? 'PV + Battery' : designData?.jobtype}}</span> -->\r\n                </ion-col>\r\n                </ion-row>\r\n\r\n\r\n                <ion-row class=\"ion-no-margin ion-no-margin\">\r\n\r\n                    <ion-col *ngIf=\"segments=='status=created&status=outsourced&status=accepted&status=declined' || segments=='status=created&status=outsourced&status=accepted&&status=declined'\">\r\n                        <span *ngIf=\"designData.status == 'created' || (designData.status == 'accepted' && (userData.role.type !== 'clientsuperadmin' && userData.role.type !== 'clientadmin')) \" style=\"float:right !important;\" class=\"ion-text-end action-button-color\" (click)=\"openDesigners(designData.id,designData,$event)\"\r\n                        >Assign</span>\r\n                        <span style=\"float: right;\">\r\n                            <ng-container *ngIf=\"userData.role.type !=='clientsuperadmin' && userData.role.type !== 'clientadmin'\">\r\n                                <ion-col size=\"8\"  *ngIf=\"designData.status == 'outsourced'\"  class=\"ion-text-end action-button-color\" (click)=\"accept(designData.id,'accepted',$event)\">\r\n                                   Accept\r\n                                </ion-col>\r\n                                <ion-col size=\"4\" *ngIf=\"designData.status == 'outsourced'\" style=\"color:#dc6e67;\" class=\"ion-text-end\" (click)=\"decline(designData.id,'pestamp',$event)\">\r\n                                On Hold\r\n                                </ion-col>\r\n                            </ng-container>\r\n                        </span>\r\n\r\n                        <span  *ngIf=\"designData.status == 'declined' && (userData.role.type=='clientsuperadmin' || userData.role.type=='clientadmin')\" style=\"float:right !important;\" class=\"ion-text-end action-button-color\" (click)=\"directAssignToWattmonk(designData.id,designData,$event)\"\r\n                        >Reassign</span>\r\n                    </ion-col>\r\n\r\n\r\n                    <!-- <ion-col *ngIf=\"segments=='status=completed' && userData.role.type != 'clientsuperadmin' && userData.role.type !== 'clientadmin'\">\r\n                        <span (click)=\"openDesigners(designData.id,designData)\" class=\"ion-text-end action-button-color\"\r\n                        >Reassign</span>\r\n                    </ion-col> -->\r\n\r\n                    <!-- <ion-col *ngIf=\"segments=='status=completed' && userData.role.type != 'clientsuperadmin' && userData.role.type !== 'clientadmin'\">\r\n                        <span style=\"float:right !important;\" class=\"ion-text-end action-button-color\" (click)=\"openreviewPassed(designData.id,designData)\"\r\n                        >  &nbsp; Deliver</span></ion-col> -->\r\n                        <!-- <span (click)=\"openDesigners(designData.id,designData)\" style=\"float:right !important;\" class=\"ion-text-end action-button-color\"\r\n                        >Reassign</span> -->\r\n                        <!-- <span *ngIf=\"userData.role.type!='clientsuperadmin' &&(designData.status =='reviewpassed'||designData.status=='reviewfailed'||designData.status=='reviewassigned')\" style=\"float:right !important;\" class=\"ion-text-end action-button-color\" (click)=\"openAnalysts(designData.id,designData)\"\r\n                        >Reassign Review</span> -->\r\n\r\n\r\n                    <ion-col *ngIf=\"segments=='status=delivered'\">\r\n                      <span  style=\"float:right !important;\" class=\"ion-text-end action-button-color\" (click)=\"designDownload(designData,$event)\">\r\n                          <ion-icon name=\"cloud-download-outline\"></ion-icon></span>&nbsp;\r\n                        <!-- <span  style=\"float:right !important;margin-right: 8px;\" class=\"ion-text-end action-button-color\" (click)=\"shareWhatsapp(designData,$event)\">\r\n                            <ion-icon name=\"share-social-outline\"></ion-icon></span>&nbsp;\r\n                        <span style=\"float:right !important;margin-right: 8px;\" class=\"ion-text-end action-button-color\" (click)=\"shareViaEmails(designData.id,designData,$event)\">\r\n                            <ion-icon name=\"mail\" ></ion-icon></span> -->\r\n                            <span *ngIf=\"(userData.role.type=='clientsuperadmin' || userData.role.type=='clientadmin')  && (designData.deliverychargespaymentstatus=='pending' || designData.paymentstatus =='pending') && userData?.ispaymentmodeprepay!=='false'\" style=\"float:right !important;margin-right: 8px;\" class=\"ion-text-end action-button-color\" (click)=\"Resend(designData.id, 'pestamp',$event)\">\r\n                                Resend</span>\r\n                                <span *ngIf=\"(userData.role.type=='clientsuperadmin' || userData.role.type=='clientadmin') && (designData.deliverychargespaymentstatus=='pending' || designData.paymentstatus =='pending') && userData?.ispaymentmodeprepay!=='false'\" style=\"float:right !important;margin-right: 8px;\" class=\"ion-text-end action-button-color\" (click)=\"clearPendingPayments(designData,$event)\">\r\n                                    Make Payment</span>\r\n                    </ion-col>\r\n                    <!-- <ion-col class=\"ion-no-margin ion-no-padding\">\r\n                        <ion-button class=\"ion-no-margin ion-no-padding\" fill=\"clear\" [routerLink]=\"['/surveyprocess/' + designData.id + '/' + designData.jobtype + '/' + designData.latitude + '/' + designData.longitude]\"\r\n                        routerDirection=\"forward\">\r\n                            Restart Survey\r\n                        </ion-button>\r\n                    </ion-col> -->\r\n                </ion-row>\r\n                <!-- <ion-progress-bar [value]=\"1\" mode=\"ios\" color=\"success\" class=\"progress-bar-height\"></ion-progress-bar> -->\r\n                  <!-- <span class=\"ion-text-end timestamp\" [routerLink]=\"['/permit-design-details/',designData.id]\" routerDirection=\"forward\">\r\n                        {{designData.deliverydate | date: 'hh:mm a'}}\r\n\r\n            </span> -->\r\n        </ion-card>\r\n        </ion-col>\r\n    </ion-row>\r\n    <!-- </ion-virtual-scroll> -->\r\n</ion-grid>\r\n<ng-template #nodesignFound>\r\n    <div *ngIf=\"listOfDesignsHelper.length === 0 \" class=\"h-100 d-flex flex-column align-center justify-center\">\r\n            <!-- <div *ngIf=\"!netSwitch\"> -->\r\n\r\n              {{noDesignFound}}\r\n            <!-- </div> -->\r\n\r\n        <ion-img src=\"/assets/images/blank.png\" class=\"placeholder\"></ion-img>\r\n    </div>\r\n</ng-template>\r\n\r\n\r\n\r\n</ion-content>\r\n[\r\n<ion-bottom-drawer [(state)]=\"drawerState\" [minimumHeight]=\"0\" [dockedHeight]=\"320\" [draggable]=\"false\" [disableDrag]=\"true\"\r\n           [shouldBounce]=\"true\" [distanceTop]=\"0\" class=\"drawer\" style=\"z-index: 9999 !important;\">\r\n<form [formGroup]=\"assignForm\">\r\n<ion-grid class=\"drawer\">\r\n    <ion-row>\r\n       <ion-col size=\"12\">\r\n            <app-user-selector  (assigneeData)=getassignedata($event) placeholder=\"Assign\" [assignees]=\"listOfAssignees\"\r\n                               formControlName=\"assignedto\"></app-user-selector>\r\n\r\n        </ion-col>\r\n    </ion-row>\r\n    <!-- <ion-row style=\"margin-left: 8px;\">\r\n        <ion-col size=\"12\">\r\n            <span class=\"input-placeholder\">comments</span>\r\n        </ion-col>\r\n        <ion-col size=\"12\" style=\"padding-top: 0px;\">\r\n            <ion-textarea style=\"max-width: 98%;\" class=\"ion-no-margin ion-no-padding comment_box\" rows=\"3\"\r\n                          formControlName=\"comment\"></ion-textarea>\r\n        </ion-col>\r\n    </ion-row> -->\r\n    <ion-row style=\"justify-content: flex-end;\">\r\n        <ion-col size=\"auto\" style=\"padding-top: 0px; margin-right: 6px;\">\r\n            <ion-button class=\"buttom-drawer-button\" fill=\"clear\" (click)=\"assignToPeEngineer()\">\r\n                Confirm\r\n            </ion-button>\r\n        </ion-col>\r\n        <ion-col size=\"auto\">\r\n            <ion-button class=\"buttom-drawer-button-cancel\" fill=\"clear\" (click)=\"dismissBottomSheet()\">\r\n                Cancel\r\n            </ion-button>\r\n        </ion-col>\r\n    </ion-row>\r\n</ion-grid>\r\n</form>\r\n\r\n</ion-bottom-drawer>\r\n");

/***/ }),

/***/ "B9b1":
/*!*********************************************************************!*\
  !*** ./src/app/pestamp-homepage/pestamp-homepage-routing.module.ts ***!
  \*********************************************************************/
/*! exports provided: PestampHomepagePageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PestampHomepagePageRoutingModule", function() { return PestampHomepagePageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _pestamp_design_pestamp_design_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pestamp-design/pestamp-design.component */ "tsB5");
/* harmony import */ var _pestamp_homepage_page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pestamp-homepage.page */ "HhBl");





const routes = [
    {
        path: '',
        component: _pestamp_homepage_page__WEBPACK_IMPORTED_MODULE_4__["PestampHomepagePage"],
        children: [
            // { path: 'design', loadChildren: () => import(`./design/design.module`).then(m => m.DesignModule) },
            {
                path: 'pestamp-design',
                component: _pestamp_design_pestamp_design_component__WEBPACK_IMPORTED_MODULE_3__["PestampDesignComponent"]
            }
        ]
    }
];
let PestampHomepagePageRoutingModule = class PestampHomepagePageRoutingModule {
};
PestampHomepagePageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], PestampHomepagePageRoutingModule);



/***/ }),

/***/ "GEyq":
/*!***************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pestamp-homepage/pestamp-homepage.page.html ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-content>\n  <!-- <ion-header class=\"ion-no-border white-bg\" style=\"position: relative;\">\n      <ion-toolbar> -->\n  <ion-grid>\n      <ion-row class=\"ion-align-items-center\">\n      <ion-toolbar>\n      <ion-buttons slot=\"start\">\n          <ion-menu-button></ion-menu-button>\n        </ion-buttons>\n      <ion-row class=\"ion-align-items-center\">\n          <ion-col >\n              <h1 class=\"ion-no-padding ion-no-margin home\">\n                  PE Stamps</h1>\n          </ion-col>\n          <!-- <ion-col *ngIf=\"showSearchBar === true\" >\n              <ion-searchbar debounce=\"0\" placeholder=\"home\" class=\"custom\"></ion-searchbar>\n          </ion-col> -->\n          <ion-col size=\"auto\" >\n              <div class=\"notification-padding\" (click)=\"searchbar()\">\n                  <ion-img src=\"/assets/images/icons8-search.svg\" class=\"notification-icon\"></ion-img>\n              </div>\n          </ion-col>\n          <ion-col size=\"auto\" style=\"position: relative;\">\n              <div class=\"notification-padding\" [routerLink]=\"['/notification']\" routerDirection=\"forward\" (click)=\"setzero()\">\n                  <ion-img src=\"/assets/images/notification.svg\" class=\"notification-icon\"></ion-img>\n                 <span class=\"badge\" *ngIf=\"unreadCount > 0\">\n                              {{unreadCount > 99 ? '99+' : unreadCount}}\n                          </span>\n              </div>\n          </ion-col>\n      </ion-row>\n  </ion-toolbar>\n  </ion-row>\n  </ion-grid>\n\n\n</ion-content>\n\n<ion-tabs style=\"margin-top: 52px\">\n    <ion-tab-bar class=\"ion-no-border\">\n        <ion-tab-button tab=\"pestamp-design\">\n            <!-- <ion-label>Designs</ion-label> -->\n        </ion-tab-button>\n    </ion-tab-bar>\n</ion-tabs>\n<!-- <router-outlet></router-outlet> -->\n\n\n\n\n<ion-footer class=\"ion-no-border white-bg\" *ngIf=\"showFooter && userData?.parent.id != 232\">\n  <div class=\"position-relative\">\n      <ion-fab horizontal=\"start\" class=\"fab-position position-absolute\">\n          <ion-fab-button (click)=\"scheduledPage()\" [disabled]='!netSwitch' routerDirection=\"forward\" mode=\"md\" class=\"ht_wt\">\n              <ion-icon name=\"add\"></ion-icon>\n          </ion-fab-button>\n      </ion-fab>\n      <!-- <ion-grid class=\"bottom-bar ion-no-margin ion-no-padding\">\n          <ion-row>\n              <ion-col size=\"4\">\n                  <div class=\"tab\">\n                      <ion-img src=\"/assets/images/home-outline.svg\" class=\"tab-icon\"></ion-img>\n                      <span class=\"tabText\">Home</span>\n                  </div>\n              </ion-col>\n              <ion-col size=\"4\" [routerLink]=\"['/groups']\">\n                  <div class=\"tab\">\n                      <ion-img src=\"/assets/images/message-outline.svg\" class=\"tab-icon\"></ion-img>\n                      <span class=\"tabText\">Messages</span>\n                  </div>\n              </ion-col>\n              <ion-col size=\"4\" [routerLink]=\"['/profile']\" routerDirection=\"forward\">\n                  <div class=\"tab\">\n                      <ion-img src=\"/assets/images/account-outline.svg\" class=\"tab-icon\"></ion-img>\n                      <span class=\"tabText\">Profile</span>\n                  </div>\n              </ion-col>\n          </ion-row>\n      </ion-grid> -->\n  </div>\n\n</ion-footer>\n\n");

/***/ }),

/***/ "HhBl":
/*!***********************************************************!*\
  !*** ./src/app/pestamp-homepage/pestamp-homepage.page.ts ***!
  \***********************************************************/
/*! exports provided: PestampHomepagePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PestampHomepagePage", function() { return PestampHomepagePage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_pestamp_homepage_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./pestamp-homepage.page.html */ "GEyq");
/* harmony import */ var _pestamp_homepage_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pestamp-homepage.page.scss */ "i+8d");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../api.service */ "yTNM");
/* harmony import */ var _contants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../contants */ "6qqZ");
/* harmony import */ var _networkdetect_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../networkdetect.service */ "UZ2B");
/* harmony import */ var _utilities_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../utilities.service */ "oTnF");
/* harmony import */ var _ionic_native_in_app_browser_ngx__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ionic-native/in-app-browser/ngx */ "m/P+");
/* harmony import */ var _storage_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../storage.service */ "qkCY");
/* harmony import */ var _utilities_mixpanel_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../utilities/mixpanel.service */ "uKCw");













let PestampHomepagePage = class PestampHomepagePage {
    constructor(network, platform, route, apiService, utils, iab, storageService, mixpanelService) {
        this.network = network;
        this.platform = platform;
        this.route = route;
        this.apiService = apiService;
        this.utils = utils;
        this.iab = iab;
        this.storageService = storageService;
        this.mixpanelService = mixpanelService;
        this.version = _contants__WEBPACK_IMPORTED_MODULE_7__["version"];
        this.showSearchBar = false;
        this.showFooter = true;
        this.userData = this.storageService.getUser();
    }
    getNotificationCount() {
        this.apiService.getCountOfUnreadNotifications().subscribe((count) => {
            console.log("count", count);
            this.unreadCount = count;
        });
    }
    ngOnInit() {
        this.getNotificationCount();
        this.apiService.version.subscribe(versionInfo => {
            this.update_version = versionInfo;
        });
        this.route.navigate(['pestamp-homepage/pestamp-design']);
        this.subscription = this.utils.getBottomBarHomepage().subscribe((value) => {
            this.showFooter = value;
        });
    }
    ionViewDidEnter() {
        if (this.version !== this.update_version && this.update_version !== '') {
            setTimeout(() => {
                this.utils.showAlertBox('Update App', 'New version of app is available on Play Store. Please update now to get latest features and bug fixes.', [{
                        text: 'Ok',
                        handler: () => {
                            this.iab.create('https://play.google.com/store/apps/details?id=com.solar.wattmonk', "_system");
                            this.ionViewDidEnter();
                        }
                    }]);
            }, 2000);
        }
        this.deactivateNetworkSwitch = this.network.networkSwitch.subscribe(data => {
            this.netSwitch = data;
            console.log(this.netSwitch);
            let user = this.storageService.getUser();
            this.apiService.emitUserNameAndRole(user);
        });
        this.network.networkDisconnect();
        this.network.networkConnect();
        // this.subscription = this.platform.backButton.subscribe(() => {
        //   if (this.showSearchBar === true) {
        //     this.showSearchBar = false;
        //   } else {
        //     (navigator as any).app.exitApp();
        //   }
        // });
    }
    searchbar() {
        this.route.navigate(['/search-bar1']);
    }
    setzero() {
        this.unreadCount = 0;
    }
    scheduledPage() {
        // if(this.userData.ispaymentmodeprepay){
        //   this.apiService.getPendingPaymentstatus().subscribe((res:any)=>{
        //     console.log(res);
        //     if(res.length>0){
        //       this.utils.errorSnackBar("Please clear your pending dues from the delivered section");
        //     } 
        //     else{
        //       this.route.navigate(['/pestamp-schedule']);
        //     }
        //   },
        //     error => {
        //       this.utils.errorSnackBar("Error");
        //     })
        // }
        // else{
        this.mixpanelService.track("ADD_PESTAMP_PAGE_OPEN", {});
        this.route.navigate(['/pestamp-schedule']);
        //}
    }
    ngOndestroy() {
        this.deactivateNetworkSwitch.unsubscribe();
    }
};
PestampHomepagePage.ctorParameters = () => [
    { type: _networkdetect_service__WEBPACK_IMPORTED_MODULE_8__["NetworkdetectService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["Platform"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
    { type: _api_service__WEBPACK_IMPORTED_MODULE_6__["ApiService"] },
    { type: _utilities_service__WEBPACK_IMPORTED_MODULE_9__["UtilitiesService"] },
    { type: _ionic_native_in_app_browser_ngx__WEBPACK_IMPORTED_MODULE_10__["InAppBrowser"] },
    { type: _storage_service__WEBPACK_IMPORTED_MODULE_11__["StorageService"] },
    { type: _utilities_mixpanel_service__WEBPACK_IMPORTED_MODULE_12__["MixpanelService"] }
];
PestampHomepagePage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-pestamp-homepage',
        template: _raw_loader_pestamp_homepage_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_pestamp_homepage_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], PestampHomepagePage);



/***/ }),

/***/ "i+8d":
/*!*************************************************************!*\
  !*** ./src/app/pestamp-homepage/pestamp-homepage.page.scss ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".notification-icon {\n  width: 24px;\n  height: 24px;\n}\n\n.home {\n  font-size: 22px;\n  margin-left: 6px;\n}\n\n.notification-badge {\n  font-size: 10px;\n  margin-left: -15px;\n  margin-top: -20px;\n}\n\n.notification-padding {\n  position: relative;\n  padding: 8px;\n}\n\n.badge {\n  width: 20px;\n  height: 20px;\n  position: absolute;\n  top: 0;\n  right: 0;\n  background: #3c78d8;\n  color: white;\n  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.5);\n  border-radius: 50%;\n  font-size: 0.6em;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: 1px solid white;\n}\n\nion-searchbar.custom {\n  --background: none;\n  --box-shadow: none;\n  background: white;\n  border-radius: 0.5em;\n  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);\n  max-height: 40px;\n}\n\n.titleTab {\n  text-align: center;\n  color: #898989;\n}\n\n.titleBorder {\n  width: 70px;\n  border-bottom: 3px solid #D9726D;\n  border-radius: 2px;\n}\n\n.cardText {\n  margin: 0px;\n}\n\n.card_detail {\n  margin: 0px;\n  color: #3960B8;\n}\n\n.tab {\n  padding-top: 1em;\n  padding-bottom: 1em;\n  padding-bottom: 1em;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.bottom-bar {\n  margin: 8px;\n  border-radius: 50px;\n  box-shadow: 0 -2px 8px 0 rgba(0, 0, 0, 0.1);\n  border: 2px solid white;\n  background: #FFFAEB;\n}\n\n.tabText {\n  margin-left: 8px;\n  font-size: 1em;\n}\n\n.tab-icon {\n  width: 24px;\n  height: 24px;\n}\n\n.fab-position {\n  bottom: 18px;\n}\n\n.ht_wt {\n  height: 62px;\n  width: 62px;\n}\n\nion-fab-button {\n  --border-width: 2px;\n  --border-style: solid;\n  --box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.3);\n  --border-color: white;\n  --background: #3c78d8;\n}\n\nion-tab-bar {\n  --border: none;\n}\n\nion-tab-button {\n  font-size: 1em;\n  --color: #9E9E9E;\n  --color-selected: #3c78d8;\n}\n\nion-tab-button[aria-selected=true] {\n  border-bottom: 3px solid #3c78d8;\n  border-bottom-left-radius: 2px;\n  border-bottom-right-radius: 2px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXHBlc3RhbXAtaG9tZXBhZ2UucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksV0FBQTtFQUNBLFlBQUE7QUFDSjs7QUFFQTtFQUNJLGVBQUE7RUFDQSxnQkFBQTtBQUNKOztBQUVBO0VBQ0ksZUFBQTtFQUNBLGtCQUFBO0VBQ0EsaUJBQUE7QUFDSjs7QUFFQTtFQUNJLGtCQUFBO0VBQ0EsWUFBQTtBQUNKOztBQUdBO0VBQ0ksV0FBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLE1BQUE7RUFDQSxRQUFBO0VBQ0EsbUJBQUE7RUFDQSxZQUFBO0VBQ0EsMENBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSx1QkFBQTtBQUFKOztBQUdBO0VBQ0ksa0JBQUE7RUFDQSxrQkFBQTtFQUNBLGlCQUFBO0VBQ0Esb0JBQUE7RUFDQSwwQ0FBQTtFQUNBLGdCQUFBO0FBQUo7O0FBSUE7RUFDSSxrQkFBQTtFQUNBLGNBQUE7QUFESjs7QUFLQTtFQUNJLFdBQUE7RUFDQSxnQ0FBQTtFQUNBLGtCQUFBO0FBRko7O0FBS0E7RUFDSSxXQUFBO0FBRko7O0FBS0E7RUFDSSxXQUFBO0VBQ0EsY0FBQTtBQUZKOztBQUtBO0VBQ0ksZ0JBQUE7RUFDQSxtQkFBQTtFQUNBLG1CQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7QUFGSjs7QUFLQTtFQUNJLFdBQUE7RUFDQSxtQkFBQTtFQUNBLDJDQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtBQUZKOztBQUtBO0VBQ0ksZ0JBQUE7RUFDQSxjQUFBO0FBRko7O0FBS0E7RUFDSSxXQUFBO0VBQ0EsWUFBQTtBQUZKOztBQUtBO0VBQ0ksWUFBQTtBQUZKOztBQUtBO0VBQ0UsWUFBQTtFQUNBLFdBQUE7QUFGRjs7QUFLQTtFQUNJLG1CQUFBO0VBQ0EscUJBQUE7RUFDQSw0Q0FBQTtFQUNBLHFCQUFBO0VBQ0EscUJBQUE7QUFGSjs7QUFLQTtFQUNJLGNBQUE7QUFGSjs7QUFLQTtFQUNJLGNBQUE7RUFDQSxnQkFBQTtFQUNBLHlCQUFBO0FBRko7O0FBS0E7RUFDSSxnQ0FBQTtFQUNBLDhCQUFBO0VBQ0EsK0JBQUE7QUFGSiIsImZpbGUiOiJwZXN0YW1wLWhvbWVwYWdlLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5ub3RpZmljYXRpb24taWNvbiB7XHJcbiAgICB3aWR0aDogMjRweDtcclxuICAgIGhlaWdodDogMjRweDtcclxufVxyXG5cclxuLmhvbWV7XHJcbiAgICBmb250LXNpemU6IDIycHg7XHJcbiAgICBtYXJnaW4tbGVmdDogNnB4O1xyXG59XHJcblxyXG4ubm90aWZpY2F0aW9uLWJhZGdlIHtcclxuICAgIGZvbnQtc2l6ZTogMTBweDtcclxuICAgIG1hcmdpbi1sZWZ0OiAtMTVweDtcclxuICAgIG1hcmdpbi10b3A6IC0yMHB4O1xyXG59XHJcblxyXG4ubm90aWZpY2F0aW9uLXBhZGRpbmcge1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgcGFkZGluZzogOHB4O1xyXG59XHJcblxyXG5cclxuLmJhZGdlIHtcclxuICAgIHdpZHRoOiAyMHB4O1xyXG4gICAgaGVpZ2h0OiAyMHB4O1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgdG9wOiAwO1xyXG4gICAgcmlnaHQ6IDA7XHJcbiAgICBiYWNrZ3JvdW5kOiAjM2M3OGQ4O1xyXG4gICAgY29sb3I6IHdoaXRlO1xyXG4gICAgYm94LXNoYWRvdzogMCAxcHggM3B4IDAgcmdiYSgwLCAwLCAwLCAwLjUpO1xyXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG4gICAgZm9udC1zaXplOiAwLjZlbTtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCB3aGl0ZTtcclxufVxyXG5cclxuaW9uLXNlYXJjaGJhci5jdXN0b20ge1xyXG4gICAgLS1iYWNrZ3JvdW5kOiBub25lO1xyXG4gICAgLS1ib3gtc2hhZG93OiBub25lO1xyXG4gICAgYmFja2dyb3VuZDogd2hpdGU7XHJcbiAgICBib3JkZXItcmFkaXVzOiAwLjVlbTtcclxuICAgIGJveC1zaGFkb3c6IDAgMXB4IDNweCAwIHJnYmEoMCwgMCwgMCwgMC4xKTtcclxuICAgIG1heC1oZWlnaHQ6IDQwcHg7XHJcbn1cclxuXHJcblxyXG4udGl0bGVUYWIge1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgY29sb3I6ICM4OTg5ODk7XHJcbiAgICAvLyAgICAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkICNEOTcyNkQ7XHJcbn1cclxuXHJcbi50aXRsZUJvcmRlciB7XHJcbiAgICB3aWR0aDogNzBweDtcclxuICAgIGJvcmRlci1ib3R0b206IDNweCBzb2xpZCAjRDk3MjZEO1xyXG4gICAgYm9yZGVyLXJhZGl1czogMnB4O1xyXG59XHJcblxyXG4uY2FyZFRleHQge1xyXG4gICAgbWFyZ2luOiAwcHg7XHJcbn1cclxuXHJcbi5jYXJkX2RldGFpbCB7XHJcbiAgICBtYXJnaW46IDBweDtcclxuICAgIGNvbG9yOiAjMzk2MEI4O1xyXG59XHJcblxyXG4udGFiIHtcclxuICAgIHBhZGRpbmctdG9wOiAxZW07XHJcbiAgICBwYWRkaW5nLWJvdHRvbTogMWVtO1xyXG4gICAgcGFkZGluZy1ib3R0b206IDFlbTtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbn1cclxuXHJcbi5ib3R0b20tYmFyIHtcclxuICAgIG1hcmdpbjogOHB4O1xyXG4gICAgYm9yZGVyLXJhZGl1czogNTBweDtcclxuICAgIGJveC1zaGFkb3c6IDAgLTJweCA4cHggMCByZ2JhKDAsIDAsIDAsIDAuMSk7XHJcbiAgICBib3JkZXI6IDJweCBzb2xpZCB3aGl0ZTtcclxuICAgIGJhY2tncm91bmQ6ICNGRkZBRUI7XHJcbn1cclxuXHJcbi50YWJUZXh0IHtcclxuICAgIG1hcmdpbi1sZWZ0OiA4cHg7XHJcbiAgICBmb250LXNpemU6IDFlbTtcclxufVxyXG5cclxuLnRhYi1pY29uIHtcclxuICAgIHdpZHRoOiAyNHB4O1xyXG4gICAgaGVpZ2h0OiAyNHB4O1xyXG59XHJcblxyXG4uZmFiLXBvc2l0aW9uIHtcclxuICAgIGJvdHRvbTogMThweDtcclxufVxyXG5cclxuLmh0X3d0e1xyXG4gIGhlaWdodDo2MnB4O1xyXG4gIHdpZHRoOjYycHg7XHJcbn1cclxuXHJcbmlvbi1mYWItYnV0dG9uIHtcclxuICAgIC0tYm9yZGVyLXdpZHRoOiAycHg7XHJcbiAgICAtLWJvcmRlci1zdHlsZTogc29saWQ7XHJcbiAgICAtLWJveC1zaGFkb3c6IDAgMHB4IDhweCAwIHJnYmEoMCwgMCwgMCwgMC4zKTtcclxuICAgIC0tYm9yZGVyLWNvbG9yOiB3aGl0ZTtcclxuICAgIC0tYmFja2dyb3VuZDogIzNjNzhkODtcclxufVxyXG5cclxuaW9uLXRhYi1iYXIge1xyXG4gICAgLS1ib3JkZXI6IG5vbmU7XHJcbn1cclxuXHJcbmlvbi10YWItYnV0dG9uIHtcclxuICAgIGZvbnQtc2l6ZTogMWVtO1xyXG4gICAgLS1jb2xvcjogIzlFOUU5RTtcclxuICAgIC0tY29sb3Itc2VsZWN0ZWQ6ICMzYzc4ZDg7XHJcbn1cclxuXHJcbmlvbi10YWItYnV0dG9uW2FyaWEtc2VsZWN0ZWQ9dHJ1ZV0ge1xyXG4gICAgYm9yZGVyLWJvdHRvbTogM3B4IHNvbGlkICMzYzc4ZDg7XHJcbiAgICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiAycHg7XHJcbiAgICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogMnB4O1xyXG59Il19 */");

/***/ }),

/***/ "tsB5":
/*!*****************************************************************************!*\
  !*** ./src/app/pestamp-homepage/pestamp-design/pestamp-design.component.ts ***!
  \*****************************************************************************/
/*! exports provided: PestampDesignComponent, DesginDataHelper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PestampDesignComponent", function() { return PestampDesignComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DesginDataHelper", function() { return DesginDataHelper; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_pestamp_design_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./pestamp-design.component.html */ "40Qx");
/* harmony import */ var _pestamp_design_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pestamp-design.component.scss */ "wiNJ");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ion-bottom-drawer */ "rFvw");
/* harmony import */ var src_app_api_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/api.service */ "yTNM");
/* harmony import */ var src_app_storage_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/storage.service */ "qkCY");
/* harmony import */ var src_app_utilities_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/utilities.service */ "oTnF");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! moment */ "wd/R");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _ionic_native_launch_navigator_ngx__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ionic-native/launch-navigator/ngx */ "fGQ8");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var src_app_networkdetect_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! src/app/networkdetect.service */ "UZ2B");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var src_app_declinepage_declinepage_page__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! src/app/declinepage/declinepage.page */ "uPeJ");
/* harmony import */ var _ionic_native_social_sharing_ngx__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @ionic-native/social-sharing/ngx */ "/XPu");
/* harmony import */ var src_app_email_model_email_model_page__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! src/app/email-model/email-model.page */ "+k72");
/* harmony import */ var _ionic_native_android_permissions_ngx__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @ionic-native/android-permissions/ngx */ "WOgW");
/* harmony import */ var _ionic_native_local_notifications_ngx__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @ionic-native/local-notifications/ngx */ "Bg0J");
/* harmony import */ var _ionic_native_file_ngx__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @ionic-native/file/ngx */ "FAH8");
/* harmony import */ var _ionic_native_file_transfer_ngx__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @ionic-native/file-transfer/ngx */ "B7Rs");
/* harmony import */ var src_app_resendpagedialog_resendpagedialog_page__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! src/app/resendpagedialog/resendpagedialog.page */ "R1eT");
/* harmony import */ var _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @cometchat-pro/cordova-ionic-chat */ "ujHh");
/* harmony import */ var _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(_cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_23__);
/* harmony import */ var src_app_contants__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! src/app/contants */ "6qqZ");
/* harmony import */ var src_app_utilities_mixpanel_service__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! src/app/utilities/mixpanel.service */ "uKCw");


























let PestampDesignComponent = class PestampDesignComponent {
    //showLoader= true;
    constructor(storageService, utils, apiService, datePipe, cdr, launchNavigator, formBuilder, route, network, modalController, socialsharing, platform, androidPermissions, localnotification, file, transfer, alertController, mixpanelService) {
        this.storageService = storageService;
        this.utils = utils;
        this.apiService = apiService;
        this.datePipe = datePipe;
        this.cdr = cdr;
        this.launchNavigator = launchNavigator;
        this.formBuilder = formBuilder;
        this.route = route;
        this.network = network;
        this.modalController = modalController;
        this.socialsharing = socialsharing;
        this.platform = platform;
        this.androidPermissions = androidPermissions;
        this.localnotification = localnotification;
        this.file = file;
        this.transfer = transfer;
        this.alertController = alertController;
        this.mixpanelService = mixpanelService;
        this.drawerState = ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_4__["DrawerState"].Bottom;
        this.noDesignFound = '';
        this.showBottomDraw = false;
        //assignedTo:any;
        this.listOfAssignees = [];
        //listOfAssignees:any[];
        this.designId = 0;
        this.skip = 0;
        this.limit = 10;
        this.updatechat_id = false;
        this.isclientassigning = false;
        this.options = {
            start: '',
            app: this.launchNavigator.APP.GOOGLE_MAPS
        };
        this.userData = this.storageService.getUser();
        if (this.userData.role.type == 'wattmonkadmins' || this.userData.role.name == 'Admin' || this.userData.role.name == 'ContractorAdmin' || this.userData.role.name == 'BD') {
            this.segments = 'status=created&status=outsourced&status=accepted&status=declined';
        }
        else if (this.userData.role.type == 'clientsuperadmin' || this.userData.role.name == 'SuperAdmin' || this.userData.role.name == 'ContractorSuperAdmin') {
            this.segments = 'status=created&status=outsourced&status=accepted&&status=declined';
        }
        const latestDate = new Date();
        this.today = datePipe.transform(latestDate, 'M/dd/yy');
        console.log('date', this.today);
        this.todaysdate = datePipe.transform(latestDate, 'yyyy-MM-dd');
        this.assignForm = this.formBuilder.group({
            assignedto: new _angular_forms__WEBPACK_IMPORTED_MODULE_11__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_11__["Validators"].required]),
            comment: new _angular_forms__WEBPACK_IMPORTED_MODULE_11__["FormControl"]('')
        });
        //this.mixpanelService.setUserDetails(this.userData.email,this.userData.firstname+" "+this.userData.lastname,this.userData.id)
    }
    ionViewDidEnter() {
        this.apiService.emitUserNameAndRole(this.userData);
        this.deactivateNetworkSwitch = this.network.networkSwitch.subscribe(data => {
            this.netSwitch = data;
            console.log(this.netSwitch);
            //this.newpermitsRef.update({ count: 0 });
        });
        this.network.networkDisconnect();
        this.network.networkConnect();
        this.deactivateNetworkSwitch.unsubscribe();
    }
    segmentChanged(event) {
        // this.skip=0;
        if (this.userData.role.type == 'wattmonkadmins' || this.userData.role.name == 'Admin' || this.userData.role.name == 'ContractorAdmin' || this.userData.role.name == 'BD') {
            if (event.target.value == 'newpestamp') {
                this.segments = 'status=created&status=outsourced&status=accepted&status=declined';
                // return this.segments;
            }
            else if (event.target.value == 'InStamping') {
                this.segments = "status=assigned";
                // return this.segments;
            }
            else if (event.target.value == 'completed') {
                this.segments = "status=completed";
                // return this.segments;
            }
            //  else if(event.target.value=='InReview'){
            //    this.segments ="requesttype=permit&status=reviewassigned&status=reviewfailed&status=reviewpassed";
            //    // return this.segments;
            //  }
            else if (event.target.value == 'delivered') {
                this.segments = "status=delivered";
            }
            this.getDesigns(null);
            // return this.segments;
        }
        else if (this.userData.role.type == 'clientsuperadmin' || this.userData.role.name == 'SuperAdmin' || this.userData.role.name == 'ContractorSuperAdmin') {
            if (event.target.value == 'newpestamp') {
                this.segments = 'status=created&status=outsourced&status=accepted&&status=declined';
                // return this.segments;
            }
            else if (event.target.value == 'InStamping') {
                this.segments = "status=assigned";
                // return this.segments;
            }
            else if (event.target.value == 'completed') {
                this.segments = "status=completed";
                // return this.segments;
            }
            //  else if(event.target.value=='InReview'){
            //    this.segments ="requesttype=permit&status=reviewassigned&status=reviewfailed&status=reviewpassed";
            //    // return this.segments;
            //  }
            else if (event.target.value == 'delivered') {
                this.segments = "status=delivered";
            }
            this.getDesigns(null);
        }
        // this.getsegmentdata(event.target.value);
        console.log((event.target.value));
        // this.segments = event.target.value;
        // this.DesignRefreshSubscription = this.utils.getHomepageDesignRefresh().subscribe((result) => {
        // });
        // this.dataRefreshSubscription = this.utils.getDataRefresh().subscribe((result) => {
        //   if(this.listOfDesigns != null && this.listOfDesigns.length > 0){
        //     this.formatDesignData(this.listOfDesigns);
        //   }
        // });
    }
    ngOnInit() {
        //this.userData = this.storageService.getUser();
        this.mixpanelService.track("PESTAMP_PAGE_OPEN", {});
        this.makeDirectory();
        this.setupCometChat();
        this.PeStampRefreshSubscription = this.utils.getPeStampRefresh().subscribe((result) => {
            this.getDesigns(null);
        });
    }
    getDesigns(event) {
        this.skip = 0;
        let showLoader = true;
        if (event != null && event !== undefined) {
            showLoader = false;
        }
        this.fetchPendingDesigns(event, showLoader);
    }
    ngOnDestroy() {
        this.PeStampRefreshSubscription.unsubscribe();
    }
    fetchPendingDesigns(event, showLoader) {
        this.noDesignFound = "";
        console.log("inside fetch Designs");
        this.listOfDesigns = [];
        this.listOfDesignsHelper = [];
        //this.newpermitsRef.update({ count: 0 });
        this.utils.showLoadingWithPullRefreshSupport(showLoader, 'Getting Designs').then((success) => {
            this.apiService.getFilteredDesigns(this.segments).subscribe((response) => {
                this.utils.hideLoadingWithPullRefreshSupport(showLoader).then(() => {
                    console.log(response);
                    if (response.length) {
                        this.formatDesignData(response);
                    }
                    else {
                        this.noDesignFound = "No PE Stamp Found";
                    }
                    if (event !== null) {
                        event.target.complete();
                    }
                });
            }, responseError => {
                this.utils.hideLoadingWithPullRefreshSupport(showLoader).then(() => {
                    if (event !== null) {
                        event.target.complete();
                    }
                    const error = responseError.error;
                    this.utils.errorSnackBar(error.message);
                });
            });
        });
    }
    formatDesignData(records) {
        this.overdue = [];
        let list;
        console.log(records);
        list = this.fillinDynamicData(records);
        list.forEach(element => {
            this.listOfDesigns.push(element);
        });
        console.log(this.listOfDesigns);
        const tempData = [];
        this.listOfDesigns.forEach((designItem, i) => {
            console.log(i);
            if (tempData.length === 0) {
                this.sDatePassed(designItem.updated_at, i);
                const listOfDesign = new DesginDataHelper();
                listOfDesign.date = this.datePipe.transform(designItem.updated_at, 'M/dd/yy');
                listOfDesign.lateby = this.overdue;
                listOfDesign.listOfDesigns.push(designItem);
                tempData.push(listOfDesign);
                console.log(tempData);
                ;
            }
            else {
                let added = false;
                tempData.forEach((DesignList) => {
                    // DesignList['listOfDesigns'].forEach(element=>{
                    //   console.log(element.deliverydate,":::::::::::::");
                    //   this.sDatePassed(element.deliverydate);
                    // })
                    if (!added) {
                        if (DesignList.date === this.datePipe.transform(designItem.updated_at, 'M/dd/yy')) {
                            DesignList.listOfDesigns.push(designItem);
                            this.sDatePassed(designItem.updated_at, i);
                            added = true;
                        }
                    }
                });
                if (!added) {
                    ;
                    this.sDatePassed(designItem.updated_at, i);
                    const listOfDesign = new DesginDataHelper();
                    listOfDesign.date = this.datePipe.transform(designItem.updated_at, 'M/dd/yy');
                    listOfDesign.lateby = this.overdue;
                    listOfDesign.listOfDesigns.push(designItem);
                    tempData.push(listOfDesign);
                    added = true;
                }
            }
        });
        this.listOfDesignsHelper = tempData.sort(function (a, b) {
            var dateA = new Date(a.date).getTime(), dateB = new Date(b.date).getTime();
            return dateB - dateA;
        });
        console.log(this.listOfDesignsHelper);
        this.chatIcon(list);
        this.cdr.detectChanges();
    }
    ///chat icon
    chatIcon(list) {
        list.forEach(element => {
            console.log(element);
            var groupMembersRequest = new _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_23__["CometChat"].GroupMembersRequestBuilder(element.chatid)
                .setLimit(10)
                .build();
            groupMembersRequest.fetchNext().then(groupMembers => {
                console.log(groupMembers);
                element.addedtogroupchat = true;
            }, error => {
                console.log("Group Member list fetching failed with exception:", error);
            });
        });
        // setTimeout(() => {
        // console.log("hello loader");
        // this.utils.hideLoadingWithPullRefreshSupport(this.showLoader);
        // }, 2000);
    }
    fillinDynamicData(records) {
        records.forEach((element) => {
            if (element.status != "delivered") {
                element.isoverdue = this.utils.isDatePassed(element.actualdelivereddate);
            }
            else {
                element.isoverdue = false;
            }
            // var reviewdate = new Date(element.reviewstarttime)
            // reviewdate.setHours(reviewdate.getHours()+2)
            // element.reviewremainingtime = this.utils.getRemainingTime(reviewdate.toString());
            element.lateby = this.utils.getTheLatebyString(element.actualdelivereddate);
            element.recordupdatedon = this.utils.formatDateInTimeAgo(element.updated_at);
            element.formattedpestamptype = this.utils.getPestampTypeName(element.type);
            // var acceptancedate = new Date(element.designacceptancestarttime);
            // element.designacceptanceremainingtime = this.utils.getRemainingTime(acceptancedate.toString());
            // var indesigndate = new Date(element.designstarttime);
            // indesigndate.setHours(indesigndate.getHours() + 6);
            // element.designremainingtime = this.utils.getRemainingTime(indesigndate.toString());
            if (element.email != null && element.hardcopies != null && element.type != null && element.shippingaddress != null && element.roofphotos.length > 0 && element.atticphotos.length > 0 && element.permitplan.length > 0) {
                element.isrecordcomplete = true;
            }
            //Setting acceptance timer
            if (element.status == "outsourced") {
                var acceptancedate = new Date(element.pestampacceptancestarttime);
                element.pestampacceptanceremainingtime = this.utils.getRemainingTime(acceptancedate.toString());
                console.log(element.pestampacceptancestarttime);
                console.log(element.pestampacceptanceremainingtime);
                if (element.pestampacceptanceremainingtime == "0h : 0m") {
                    element.isoverdue = true;
                }
            }
            //Setting design timer
            if (element.status == "assigned" || element.status == "completed") {
                var acceptancedate = new Date(element.pestampstarttime);
                acceptancedate.setHours(acceptancedate.getHours() + 2);
                element.designremainingtime = this.utils.getRemainingTime(acceptancedate.toString());
                if (element.designremainingtime == "0h : 0m") {
                    element.isoverdue = true;
                }
            }
        });
        return records;
    }
    openAddressOnMap(address, event) {
        event.stopPropagation();
        this.launchNavigator.navigate(address, this.options);
    }
    dismissBottomSheet() {
        console.log('this', this.drawerState);
        this.drawerState = ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_4__["DrawerState"].Bottom;
        this.utils.setBottomBarHomepage(true);
        this.assignForm.get('comment').setValue("");
        this.listOfAssignees = [];
        console.log("this works", this.listOfAssignees);
    }
    assignToPeEngineer() {
        console.log(this.designerData.createdby.id);
        console.log(this.selectedPeEngineer);
        //if(this.assignForm.status === 'INVALID' && (  this.designerData.status === 'designcompleted' ||this.designerData.status === 'reviewassigned' || this.designerData.status === 'reviewfailed' || this.designerData.status === 'reviewpassed')){
        if (this.assignForm.status === 'INVALID') {
            this.utils.errorSnackBar('Please select a pe engineer');
        }
        // else if( this.assignedTo!=null && (this.selectedPeEngineer.id==this.assignedTo.id)){
        //   this.utils.errorSnackBar("This design request has been already assigned to"+" "+this.selectedPeEngineer.firstname+" "+this.selectedPeEngineer.lastname)
        // }
        else {
            var pestampstarttime = new Date();
            var pestampacceptancestarttime = new Date();
            var additonalhours = 0;
            additonalhours = this.selectedPeEngineer.jobcount * 2;
            pestampstarttime.setHours(pestampstarttime.getHours() + additonalhours);
            pestampacceptancestarttime.setMinutes(pestampacceptancestarttime.getMinutes() + 15);
            console.log(this.designId);
            var postData = {
                assignedto: this.selectedPeEngineer.id,
                status: "assigned",
                pestampstarttime: pestampstarttime
            };
            this.utils.showLoading('assigning').then(() => {
                this.apiService.assignPestamps(this.designId, postData).subscribe(res => {
                    console.log(res);
                    this.utils.hideLoading().then(() => {
                        this.addUserToGroupChat(res.chatid);
                        this.utils.showSnackBar('successfully assigned to' + ' ' + this.selectedPeEngineer.firstname + ' ' + this.selectedPeEngineer.lastname);
                        this.route.navigate(["pestamp-homepage/pestamp-design"]);
                        this.dismissBottomSheet();
                        this.showBottomDraw = false;
                        this.utils.setPeStampRefresh(true);
                    });
                }, (error) => {
                    this.utils.hideLoading().then(() => {
                        this.utils.errorSnackBar('Some error occurred. Please try again later');
                        this.dismissBottomSheet();
                        this.showBottomDraw = false;
                    });
                });
            });
        }
    }
    accept(id, data, event) {
        event.stopPropagation();
        this.mixpanelService.track("ACCEPT_PESTAMP_DESIGN_PAGE_OPEN", {});
        this.acceptid = id;
        let status = {
            status: data
        };
        this.utils.showLoading("accepting").then(() => {
            this.apiService.assignPestamps(id, status).subscribe((res) => {
                this.createNewDesignChatGroup(res);
                this.utils.hideLoading().then(() => {
                    if (this.updatechat_id) {
                        this.utils.setPeStampRefresh(true);
                    }
                    else {
                        this.utils.setPeStampRefresh(true);
                    }
                    // this.utils.showSnackBar("Design request has been accepted successfully.")
                    // this.utils.setPeStampRefresh(true);
                });
            });
        });
    }
    openDesigners(id, designData, event) {
        event.stopPropagation();
        debugger;
        this.mixpanelService.track("ASSIGN_PESTAMP_DESIGN_PAGE_OPEN", {});
        this.listOfAssignees = [];
        console.log("this is", designData);
        this.designerData = designData;
        //this.assignedTo=designData.assignedto;
        if ((this.userData.role.type == 'clientsuperadmin' || this.userData.role.type == 'clientadmin') && this.designerData.status == 'created') {
            //this.route.navigate(["pestamp-payment-modal",{id:id,designData:this.designerData.requesttype}])
            let objToSend = {
                queryParams: {
                    designData: designData,
                    value: 'assign'
                },
                skipLocationChange: false,
                fragment: 'top'
            };
            this.route.navigate(['/pestamp-payment-modal'], {
                state: { productdetails: objToSend }
            });
        }
        else {
            if (this.listOfAssignees.length === 0) {
                this.utils.showLoading('Getting Pe Engineers').then(() => {
                    this.apiService.getPeEngineers(designData.type).subscribe((assignees) => {
                        this.utils.hideLoading().then(() => {
                            this.listOfAssignees = [];
                            //   // this.listOfAssignees.push(this.utils.getDefaultAssignee(this.storage.getUserID()));
                            assignees.forEach(item => this.listOfAssignees.push(item));
                            console.log(this.listOfAssignees);
                            this.showBottomDraw = true;
                            this.designId = id;
                            this.utils.setBottomBarHomepage(false);
                            this.drawerState = ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_4__["DrawerState"].Docked;
                            this.assignForm.patchValue({
                                assignedto: ''
                            });
                        });
                        console.log(assignees);
                    }, (error) => {
                        this.utils.hideLoading().then(() => {
                            this.utils.errorSnackBar('Some error occurred. Please try again later');
                        });
                    });
                });
            }
            else {
                this.designId = id;
                this.utils.setBottomBarHomepage(false);
                this.drawerState = ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_4__["DrawerState"].Docked;
                this.assignForm.patchValue({
                    assignedto: ''
                });
            }
        }
    }
    close() {
        if (this.showBottomDraw === true) {
            this.showBottomDraw = false;
            this.drawerState = ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_4__["DrawerState"].Bottom;
            this.utils.setBottomBarHomepage(true);
        }
        else {
            this.showBottomDraw = true;
        }
    }
    refreshDesigns(event) {
        //this.skip=0;
        let showLoader = true;
        if (event !== null && event !== undefined) {
            showLoader = false;
        }
        this.fetchPendingDesigns(event, showLoader);
    }
    /*async OpenPaymentmodal(id){
  
    const modal = await this.modalController.create({
      component: PaymentModalPage,
      cssClass: 'my-custom-modal-css',
      componentProps: {
        id:id,
        designData:this.designerData
      },
      backdropDismiss:false
    });
    modal.onDidDismiss().then((data) => {
      console.log(data)
      if(data.data.cancel=='cancel'){
      }else{
        this.getDesigns(null)
      }
  });
    // modal.dismiss(() => {
    //   ;
    //   this.getDesigns(null);
    // });
    return await modal.present();
  
    }
  */
    decline(id, e, event) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            event.stopPropagation();
            this.mixpanelService.track("DECLINE_PESTAMP_DESIGN_PAGE_OPEN", {});
            let status = e;
            console.log(status);
            const modal = yield this.modalController.create({
                component: src_app_declinepage_declinepage_page__WEBPACK_IMPORTED_MODULE_15__["DeclinepagePage"],
                cssClass: 'my-custom-modal-css',
                componentProps: {
                    id: id,
                    value: status
                },
                backdropDismiss: false
            });
            modal.onDidDismiss().then((data) => {
                console.log(data);
                if (data.data.cancel == 'cancel') {
                }
                else {
                    this.getDesigns(null);
                }
            });
            // modal.dismiss(() => {
            //   ;
            //   this.getDesigns(null);
            // });
            return yield modal.present();
        });
    }
    Resend(id, type, event) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            event.stopPropagation();
            this.mixpanelService.track("RESEND_PESTAMP_DESIGN_PAGE_OPEN", {});
            console.log(type);
            const modal = yield this.modalController.create({
                component: src_app_resendpagedialog_resendpagedialog_page__WEBPACK_IMPORTED_MODULE_22__["ResendpagedialogPage"],
                cssClass: 'my-custom-modal-css',
                componentProps: {
                    id: id,
                    requesttype: type
                },
                backdropDismiss: false
            });
            modal.onDidDismiss().then((data) => {
                console.log(data);
                if (data.data.cancel == 'cancel') {
                }
                else {
                    this.getDesigns(null);
                }
            });
            // modal.dismiss(() => {
            //   ;
            //   this.getDesigns(null);
            // });
            return yield modal.present();
        });
    }
    sDatePassed(datestring, i) {
        var checkdate = moment__WEBPACK_IMPORTED_MODULE_8__(datestring, "YYYYMMDD");
        var todaydate = moment__WEBPACK_IMPORTED_MODULE_8__(new Date(), "YYYYMMDD");
        var lateby = todaydate.diff(checkdate, "days");
        this.overdue = lateby;
    }
    // pending(value){
    //   ;
    //   if(this.userData.role.type=='SuperAdmin'){
    //       value= "requesttype=permit&status=created&status=outsourced&status=accepted&status=declined"
    //   }else{
    //     value= "requesttype=permit&status=created&status=outsourced&status=accepted"
    //   }
    // }
    getassignedata(asssignedata) {
        this.selectedPeEngineer = asssignedata;
    }
    shareWhatsapp(designData) {
        this.socialsharing.share(designData.permitdesign.url);
    }
    shareViaEmails(id, designData) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const modal = yield this.modalController.create({
                component: src_app_email_model_email_model_page__WEBPACK_IMPORTED_MODULE_17__["EmailModelPage"],
                cssClass: 'email-modal-css',
                componentProps: {
                    id: id,
                    designData: designData
                },
            });
            modal.onDidDismiss().then((data) => {
                console.log(data);
                if (data.data.cancel == 'cancel') {
                }
                else {
                    this.getDesigns(null);
                }
            });
            return yield modal.present();
        });
    }
    makeDirectory() {
        this.platform.ready().then(() => {
            if (this.platform.is('ios')) {
                this.storageDirectory = this.file.externalRootDirectory + '/Wattmonk/';
            }
            else if (this.platform.is('android')) {
                this.storageDirectory = this.file.externalRootDirectory + '/Wattmonk/';
            }
            else {
                this.storageDirectory = this.file.cacheDirectory;
            }
        });
    }
    designDownload(designData, event) {
        event.stopPropagation();
        this.mixpanelService.track("DOWNLOAD_PESTAMP_PAGE_OPEN", {});
        this.platform.ready().then(() => {
            this.file.resolveDirectoryUrl(this.storageDirectory).then(resolvedDirectory => {
                this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then(result => console.log('Has permission?', result.hasPermission), err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE));
                this.file.checkFile(resolvedDirectory.nativeURL, designData.stampedfiles.hash).then(data => {
                    console.log(data);
                    if (data == true) {
                    }
                    else {
                        console.log('not found!');
                        throw { code: 1, message: 'NOT_FOUND_ERR' };
                    }
                }).catch((err) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                    console.log('Error occurred while checking local files:');
                    console.log(err);
                    if (err.code == 1) {
                        const fileTransfer = this.transfer.create();
                        this.utils.showLoading('Downloading').then(() => {
                            fileTransfer.download(url, this.storageDirectory + designData.stampedfiles.hash + designData.stampedfiles.ext).then((entry) => {
                                this.utils.hideLoading().then(() => {
                                    console.log('download complete: ' + entry.toURL());
                                    this.utils.showSnackBar("Stamped File Downloaded Successfully");
                                    // this.clickSub = this.localnotification.on('click').subscribe(data => {
                                    //   console.log(data)
                                    //   path;
                                    // })
                                    this.localnotification.schedule({ text: 'Stamped File Downloaded Successfully', foreground: true, vibrate: true });
                                }, (error) => {
                                    // handle error
                                    console.log(error);
                                });
                            });
                        });
                    }
                }));
            });
        });
        let dir_name = 'Wattmonk';
        let path = '';
        const url = designData.stampedfiles.url;
        const fileTransfer = this.transfer.create();
        let result = this.file.createDir(this.file.externalRootDirectory, dir_name, true);
        result.then((resp) => {
            path = resp.toURL();
            console.log(path);
            fileTransfer.download(url, path + designData.stampedfiles.hash + designData.stampedfiles.ext).then((entry) => {
                console.log('download complete: ' + entry.toURL());
                this.utils.showSnackBar("Stamped File Downloaded Successfully");
                // this.clickSub = this.localnotification.on('click').subscribe(data => {
                //   console.log(data)
                //   path;
                // })
                this.localnotification.schedule({ text: 'Downloaded Successfully', foreground: true, vibrate: true });
            }, (error) => {
                // handle error
            });
        });
    }
    // async openreviewPassed(id,designData){
    //   const modal = await this.modalController.create({
    //     component: PestampdelivermodalPage,
    //     cssClass: 'deliver-modal-css',
    //     componentProps: {
    //       id:id,
    //       designData:designData
    //     },
    //     backdropDismiss:false
    //   });
    //   modal.onDidDismiss().then((data) => {
    //     console.log(data)
    //     if(data.data.cancel=='cancel'){
    //     }else{
    //       this.getDesigns(null)
    //     }
    // });
    //   // modal.dismiss(() => {
    //   //   ;
    //   //   this.getDesigns(null);
    //   // });
    //   return await modal.present();
    // this.designId=id
    // const alert = await this.alertController.create({
    //   cssClass: 'alertClass',
    //   header: 'Confirm!',
    //  // message:'Would you like to  Add Comments!!',
    //   inputs:
    //    [
    //      {name:'charges',
    //    id:'charges',
    //    type:'text',
    //    placeholder:'Enter Delivery Charges'
    //     },
    //      {name:'comment',
    //    id:'comment',
    //       type:'textarea',
    //       //label:'Would you like to  Add Comments!!',
    //     placeholder:'Enter Comment'}
    //     ] ,
    //   buttons: [
    //     {
    //       text: 'Cancel',
    //       role: 'cancel',
    //       cssClass: 'secondary',
    //       handler: (blah) => {
    //         console.log('Confirm Cancel: blah');
    //       }
    //     }, {
    //       text: 'deliver',
    //       handler: (alertData) => {
    //         var postData= {};
    //         var deliverycharges;
    // if(designData.modeofstamping == 'hardcopy' || designData.modeofstamping =='both' ){
    //   console.log("harddcopy");
    //   if(alertData.charges ==='undefined' || alertData.charges ==='' || alertData.charges === null){
    //     console.log("error");
    //     //alertData.deliverycharges.setValidators([Validators.required]);
    //     this.utils.errorSnackBar("Please Enter Delivery Charges");
    //     return;
    //   }
    //   console.log(alertData.charges);
    //   deliverycharges = alertData.charges;
    // } else {
    //   deliverycharges = 0;
    // }
    // console.log("this is",deliverycharges)
    //         if(alertData.comment!=""){
    //          postData = {
    //           status: "delivered",
    //           deliverycharges: deliverycharges,
    //           comments: alertData.comment ,
    //            };}
    //            else{
    //             postData = {
    //               status: "delivered",
    //               deliverycharges: deliverycharges
    //                };
    //            }
    //            console.log(postData);
    //            this.apiService.updatePestamps(this.designId,postData).subscribe((value) => {
    //             this.utils.hideLoading().then(()=>{
    //               ;
    //               console.log('reach ', value);
    //              this.utils.showSnackBar('Pe Stamp request has been delivered successfully');
    //               this.utils.setPeStampRefresh(true);
    //             })
    //           }, (error) => {
    //             this.utils.hideLoading();
    //             ;
    //           });
    //       }
    //     }
    //   ]
    // });
    // await alert.present();
    //}
    clearPendingPayments(designData, event) {
        event.stopPropagation();
        this.mixpanelService.track("PESTAMP_PENDING_PAYMENTS_PAGE_OPEN", {});
        let objToSend = {
            queryParams: {
                designData: designData,
                value: 'clearDues'
            },
            skipLocationChange: false,
            fragment: 'top'
        };
        this.route.navigate(['/pestamp-payment-modal'], {
            state: { productdetails: objToSend }
        });
    }
    //createChatGroup(design:DesginDataModel){
    // var GUID = 'permit' + "_" + new Date().getTime();
    // var address = design.address.substring(0, 90);
    // var groupName = design.name + "_" + address;
    // var groupType = CometChat.GROUP_TYPE.PRIVATE;
    // var password = "";
    // var group = new CometChat.Group(GUID, groupName, groupType, password);
    // CometChat.createGroup(group).then(group=>{
    //   let membersList = [
    //     new CometChat.GroupMember("" + design.createdby.id, CometChat.GROUP_MEMBER_SCOPE.ADMIN)
    //   ];
    //   CometChat.addMembersToGroup(group.getGuid(),membersList,[]).then(response=>{
    //     this.cdr.detectChanges();
    //   })
    // })
    //}
    createNewDesignChatGroup(design) {
        var GUID = 'pestamp' + "_" + new Date().getTime();
        //var address = design.deliveryaddress.substring(0, 60);
        var groupName = design.type + "_" + design.personname + "_" + design.email;
        var groupType = _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_23__["CometChat"].GROUP_TYPE.PRIVATE;
        var password = "";
        var group = new _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_23__["CometChat"].Group(GUID, groupName, groupType, password);
        _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_23__["CometChat"].createGroup(group).then(group => {
            let membersList = [
                new _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_23__["CometChat"].GroupMember("" + design.createdby.id, _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_23__["CometChat"].GROUP_MEMBER_SCOPE.ADMIN),
                new _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_23__["CometChat"].GroupMember("" + this.userData.id, _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_23__["CometChat"].GROUP_MEMBER_SCOPE.ADMIN)
            ];
            _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_23__["CometChat"].addMembersToGroup(group.getGuid(), membersList, []).then(response => {
                //if(design.requesttype == "permit"){
                debugger;
                let postdata = {
                    chatid: GUID
                };
                console.log(postdata);
                this.apiService.assignPestamps(this.acceptid, postdata).subscribe(res => {
                    this.updatechat_id = true;
                });
                // this.updateItemInList(LISTTYPE.NEW, design);
                // }else{
                //   // this.updateItemInPermitList(LISTTYPE.NEW, design);
                // }
            }, error => {
            });
        }, error => {
        });
    }
    addUserToGroupChat(chatid) {
        debugger;
        var GUID = chatid;
        var userscope = _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_23__["CometChat"].GROUP_MEMBER_SCOPE.PARTICIPANT;
        // if (this.isclientassigning) {
        //   userscope = CometChat.GROUP_MEMBER_SCOPE.ADMIN;
        // }
        let membersList = [
            new _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_23__["CometChat"].GroupMember("" + this.selectedPeEngineer.id, userscope)
        ];
        _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_23__["CometChat"].addMembersToGroup(GUID, membersList, []).then(response => {
        }, error => {
        });
    }
    setupCometChat() {
        let userId = this.storageService.getUserID();
        const user = new _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_23__["CometChat"].User(userId);
        user.setName(this.storageService.getUser().firstname + ' ' + this.storageService.getUser().lastname);
        const appSetting = new _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_23__["CometChat"].AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(src_app_contants__WEBPACK_IMPORTED_MODULE_24__["COMETCHAT_CONSTANTS"].REGION).build();
        _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_23__["CometChat"].init(src_app_contants__WEBPACK_IMPORTED_MODULE_24__["COMETCHAT_CONSTANTS"].APP_ID, appSetting).then(() => {
            console.log('Initialization completed successfully');
            // if(this.utilities.currentUserValue != null){
            // You can now call login function.
            _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_23__["CometChat"].login(userId, src_app_contants__WEBPACK_IMPORTED_MODULE_24__["COMETCHAT_CONSTANTS"].API_KEY).then((user) => {
                console.log('Login Successful:', { user });
            }, error => {
                console.log('Login failed with exception:', { error });
            });
            // }
        }, error => {
            console.log('Initialization failed with error:', error);
        });
    }
    directAssignToWattmonk(id, design, event) {
        event.stopPropagation();
        this.mixpanelService.track("REASSIGN_PESTAMP_DESIGN_PAGE_OPEN", {});
        this.designId = id;
        console.log(design);
        var postData = {};
        var pestampacceptancestarttime = new Date();
        pestampacceptancestarttime.setMinutes(pestampacceptancestarttime.getMinutes() + 15);
        if (design.declinedbypeengineer == true) {
            postData = {
                isoutsourced: "true",
                status: "assigned",
                declinedbypeengineer: 'false'
            };
        }
        else {
            postData = {
                //outsourcedto: 232,
                isoutsourced: "true",
                status: "outsourced",
                pestampacceptancestarttime: pestampacceptancestarttime
            };
        }
        this.utils.showLoading('Assigning').then(() => {
            this.apiService.updatePestamps(this.designId, postData).subscribe((value) => {
                this.utils.hideLoading().then(() => {
                    ;
                    console.log('reach ', value);
                    //   if(this.userData.role.type==='clientsuperadmin' && this.designerData.status==='created')
                    //  {
                    //   this.utils.showSnackBar('Design request has been assigned to wattmonk successfully');
                    //  }else{
                    this.utils.showSnackBar('Pe Stamp request has been reassigned to wattmonk successfully');
                    //this.dismissBottomSheet();
                    //this.showBottomDraw = false;
                    this.utils.setPeStampRefresh(true);
                });
            }, (error) => {
                this.utils.hideLoading();
                // this.dismissBottomSheet();
                // this.showBottomDraw = false;
            });
        });
    }
    trackdesign(index, design) {
        return design.id;
    }
    gotoActivity(designData, event) {
        console.log(event);
        event.stopPropagation();
        this.route.navigate(['/activity' + '/' + designData.id + '/pestamp']);
    }
    gotoDetails(designData, $event) {
        // $event.preventDefault();
        // $event.stopPropagation();
        this.route.navigate(['/pestamp-design-details/' + designData.id]);
    }
    gotoChats(designData, event) {
        event.stopPropagation();
        this.route.navigate(['/chat/' + designData.chatid]);
    }
};
PestampDesignComponent.ctorParameters = () => [
    { type: src_app_storage_service__WEBPACK_IMPORTED_MODULE_6__["StorageService"] },
    { type: src_app_utilities_service__WEBPACK_IMPORTED_MODULE_7__["UtilitiesService"] },
    { type: src_app_api_service__WEBPACK_IMPORTED_MODULE_5__["ApiService"] },
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_9__["DatePipe"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ChangeDetectorRef"] },
    { type: _ionic_native_launch_navigator_ngx__WEBPACK_IMPORTED_MODULE_10__["LaunchNavigator"] },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_11__["FormBuilder"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_12__["Router"] },
    { type: src_app_networkdetect_service__WEBPACK_IMPORTED_MODULE_13__["NetworkdetectService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_14__["ModalController"] },
    { type: _ionic_native_social_sharing_ngx__WEBPACK_IMPORTED_MODULE_16__["SocialSharing"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_14__["Platform"] },
    { type: _ionic_native_android_permissions_ngx__WEBPACK_IMPORTED_MODULE_18__["AndroidPermissions"] },
    { type: _ionic_native_local_notifications_ngx__WEBPACK_IMPORTED_MODULE_19__["LocalNotifications"] },
    { type: _ionic_native_file_ngx__WEBPACK_IMPORTED_MODULE_20__["File"] },
    { type: _ionic_native_file_transfer_ngx__WEBPACK_IMPORTED_MODULE_21__["FileTransfer"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_14__["AlertController"] },
    { type: src_app_utilities_mixpanel_service__WEBPACK_IMPORTED_MODULE_25__["MixpanelService"] }
];
PestampDesignComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-pestamp-design',
        template: _raw_loader_pestamp_design_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_pestamp_design_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], PestampDesignComponent);

class DesginDataHelper {
    constructor() {
        this.listOfDesigns = [];
    }
    shareDesign() {
    }
}


/***/ }),

/***/ "wa2R":
/*!*************************************************************!*\
  !*** ./src/app/pestamp-homepage/pestamp-homepage.module.ts ***!
  \*************************************************************/
/*! exports provided: PestampHomepagePageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PestampHomepagePageModule", function() { return PestampHomepagePageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _pestamp_homepage_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./pestamp-homepage-routing.module */ "B9b1");
/* harmony import */ var _pestamp_homepage_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./pestamp-homepage.page */ "HhBl");
/* harmony import */ var _pestamp_design_pestamp_design_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./pestamp-design/pestamp-design.component */ "tsB5");
/* harmony import */ var ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ion-bottom-drawer */ "rFvw");
/* harmony import */ var _utilities_utilities_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../utilities/utilities.module */ "egEE");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../shared/shared.module */ "PCNd");
/* harmony import */ var _ionic_native_launch_navigator_ngx__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ionic-native/launch-navigator/ngx */ "fGQ8");
/* harmony import */ var _declinepage_declinepage_page__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../declinepage/declinepage.page */ "uPeJ");
/* harmony import */ var _email_model_email_model_page__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../email-model/email-model.page */ "+k72");
/* harmony import */ var _ionic_native_chooser_ngx__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @ionic-native/chooser/ngx */ "UWV4");
/* harmony import */ var _ionic_native_file_ngx__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @ionic-native/file/ngx */ "FAH8");
/* harmony import */ var _ionic_native_network_ngx__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @ionic-native/network/ngx */ "kwrG");
/* harmony import */ var _ionic_native_file_transfer_ngx__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @ionic-native/file-transfer/ngx */ "B7Rs");
/* harmony import */ var _ionic_native_local_notifications_ngx__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @ionic-native/local-notifications/ngx */ "Bg0J");



















let PestampHomepagePageModule = class PestampHomepagePageModule {
};
PestampHomepagePageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        entryComponents: [_declinepage_declinepage_page__WEBPACK_IMPORTED_MODULE_12__["DeclinepagePage"], _email_model_email_model_page__WEBPACK_IMPORTED_MODULE_13__["EmailModelPage"]],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _pestamp_homepage_routing_module__WEBPACK_IMPORTED_MODULE_5__["PestampHomepagePageRoutingModule"],
            ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_8__["IonBottomDrawerModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
            _utilities_utilities_module__WEBPACK_IMPORTED_MODULE_9__["UtilitiesModule"],
            _shared_shared_module__WEBPACK_IMPORTED_MODULE_10__["SharedModule"]
        ],
        declarations: [_pestamp_homepage_page__WEBPACK_IMPORTED_MODULE_6__["PestampHomepagePage"], _pestamp_design_pestamp_design_component__WEBPACK_IMPORTED_MODULE_7__["PestampDesignComponent"]],
        providers: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["DatePipe"],
            _ionic_native_launch_navigator_ngx__WEBPACK_IMPORTED_MODULE_11__["LaunchNavigator"],
            _ionic_native_chooser_ngx__WEBPACK_IMPORTED_MODULE_14__["Chooser"],
            _ionic_native_file_ngx__WEBPACK_IMPORTED_MODULE_15__["File"],
            _ionic_native_network_ngx__WEBPACK_IMPORTED_MODULE_16__["Network"],
            _ionic_native_file_transfer_ngx__WEBPACK_IMPORTED_MODULE_17__["FileTransfer"],
            _ionic_native_local_notifications_ngx__WEBPACK_IMPORTED_MODULE_18__["LocalNotifications"]
        ]
    })
], PestampHomepagePageModule);



/***/ }),

/***/ "wiNJ":
/*!*******************************************************************************!*\
  !*** ./src/app/pestamp-homepage/pestamp-design/pestamp-design.component.scss ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".custom-card {\n  display: flex !important;\n  flex-direction: column !important;\n  background: white !important;\n  border-radius: 4px !important;\n  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.3) !important;\n  padding: 8px 12px;\n}\n\n.customer-name {\n  font-size: 1em;\n  color: #434343;\n  font-weight: bold;\n  display: table;\n  margin: 0px;\n}\n\n.customer-email {\n  font-size: 0.8em;\n  color: #B4B4B4;\n}\n\n.customer-phone {\n  font-size: 0.8em;\n  color: #4272B9;\n}\n\n.customer-address {\n  margin-top: 4px;\n  margin-bottom: 6px;\n  font-size: 0.8em;\n  color: #4272B9;\n}\n\n.timestamp {\n  font-size: 0.7em;\n}\n\n.chipdetail {\n  display: inline;\n  vertical-align: middle;\n  background-color: #95afc0;\n  font-size: 0.6em;\n  padding: 4px 10px;\n  border-radius: 10px;\n  text-align: center;\n  color: #fff;\n}\n\n.cssclass {\n  --max-height:100% !important;\n}\n\nion-bottom-drawer {\n  --padding: 0 !important;\n  padding: 0 !important;\n  --background: #F3F3F3 !important;\n  background: #F3F3F3 !important;\n}\n\nion-bottom-drawer ion-content {\n  --background: #F3F3F3 !important;\n}\n\n.segment-btn {\n  font-size: 10px !important;\n}\n\n.latebystyle {\n  float: right;\n  font-size: 10px;\n  color: #3C78DB;\n}\n\n.recordupdatedon {\n  float: right;\n  font-size: 10px;\n  font-style: italic;\n}\n\n.imagebutton {\n  float: right;\n  margin-top: 0px;\n}\n\n.alertClass {\n  background-color: wheat;\n}\n\n.chatbutton {\n  float: right;\n  margin-top: 0px;\n  margin-right: 5px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFxwZXN0YW1wLWRlc2lnbi5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLHdCQUFBO0VBQ0EsaUNBQUE7RUFDQSw0QkFBQTtFQUNBLDZCQUFBO0VBQ0EscURBQUE7RUFDQSxpQkFBQTtBQUNKOztBQUVFO0VBQ0UsY0FBQTtFQUNBLGNBQUE7RUFDQSxpQkFBQTtFQUNBLGNBQUE7RUFDQSxXQUFBO0FBQ0o7O0FBRUU7RUFDRSxnQkFBQTtFQUNBLGNBQUE7QUFDSjs7QUFFRTtFQUNFLGdCQUFBO0VBQ0EsY0FBQTtBQUNKOztBQUVFO0VBQ0UsZUFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxjQUFBO0FBQ0o7O0FBTUU7RUFDRSxnQkFBQTtBQUhKOztBQU9FO0VBQ0UsZUFBQTtFQUNBLHNCQUFBO0VBQ0EseUJBQUE7RUFDQSxnQkFBQTtFQUNBLGlCQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtFQUNBLFdBQUE7QUFKSjs7QUFNRTtFQUNFLDRCQUFBO0FBSEo7O0FBa0JFO0VBRUUsdUJBQUE7RUFDQSxxQkFBQTtFQUVBLGdDQUFBO0VBQ0EsOEJBQUE7QUFqQko7O0FBbUJJO0VBQ0UsZ0NBQUE7QUFqQk47O0FBc0JNO0VBQ0UsMEJBQUE7QUFuQlI7O0FBc0JNO0VBQ0UsWUFBQTtFQUNBLGVBQUE7RUFDQSxjQUFBO0FBbkJSOztBQXNCTTtFQUNFLFlBQUE7RUFDQSxlQUFBO0VBQ0Esa0JBQUE7QUFuQlI7O0FBc0JFO0VBQ0UsWUFBQTtFQUNBLGVBQUE7QUFuQko7O0FBc0JFO0VBQ0UsdUJBQUE7QUFuQko7O0FBc0JFO0VBQ0UsWUFBQTtFQUNBLGVBQUE7RUFDQSxpQkFBQTtBQW5CSiIsImZpbGUiOiJwZXN0YW1wLWRlc2lnbi5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jdXN0b20tY2FyZCB7XHJcbiAgICBkaXNwbGF5OiBmbGV4ICFpbXBvcnRhbnQ7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uICFpbXBvcnRhbnQ7XHJcbiAgICBiYWNrZ3JvdW5kOiB3aGl0ZSAhaW1wb3J0YW50O1xyXG4gICAgYm9yZGVyLXJhZGl1czogNHB4ICFpbXBvcnRhbnQ7XHJcbiAgICBib3gtc2hhZG93OiAwIDFweCAycHggMCByZ2JhKDAsIDAsIDAsIDAuMykgIWltcG9ydGFudDtcclxuICAgIHBhZGRpbmc6IDhweCAxMnB4O1xyXG4gIH1cclxuICBcclxuICAuY3VzdG9tZXItbmFtZSB7XHJcbiAgICBmb250LXNpemU6IDFlbTtcclxuICAgIGNvbG9yOiAjNDM0MzQzO1xyXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgICBkaXNwbGF5OnRhYmxlO1xyXG4gICAgbWFyZ2luOiAwcHg7XHJcbiAgfVxyXG4gIFxyXG4gIC5jdXN0b21lci1lbWFpbCB7XHJcbiAgICBmb250LXNpemU6IDAuOGVtO1xyXG4gICAgY29sb3I6ICNCNEI0QjQ7XHJcbiAgfVxyXG4gIFxyXG4gIC5jdXN0b21lci1waG9uZSB7XHJcbiAgICBmb250LXNpemU6IDAuOGVtO1xyXG4gICAgY29sb3I6ICM0MjcyQjk7XHJcbiAgfVxyXG4gIFxyXG4gIC5jdXN0b21lci1hZGRyZXNzIHtcclxuICAgIG1hcmdpbi10b3A6IDRweDtcclxuICAgIG1hcmdpbi1ib3R0b206IDZweDtcclxuICAgIGZvbnQtc2l6ZTogMC44ZW07XHJcbiAgICBjb2xvcjogIzQyNzJCOTtcclxuICB9XHJcbiAgXHJcbiAgLnBsYWNlaG9sZGVyIHtcclxuICAgIC8vIHdpZHRoOiA1MHZ3ICFpbXBvcnRhbnQ7XHJcbiAgfVxyXG4gIFxyXG4gIC50aW1lc3RhbXAge1xyXG4gICAgZm9udC1zaXplOiAwLjdlbTtcclxuICAgXHJcbiAgfVxyXG4gIFxyXG4gIC5jaGlwZGV0YWlse1xyXG4gICAgZGlzcGxheTogaW5saW5lO1xyXG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICM5NWFmYzA7XHJcbiAgICBmb250LXNpemU6IDAuNmVtO1xyXG4gICAgcGFkZGluZzogNHB4IDEwcHg7XHJcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgY29sb3I6ICNmZmY7XHJcbiAgfVxyXG4gIC5jc3NjbGFzc3tcclxuICAgIC0tbWF4LWhlaWdodCA6MTAwJSAhaW1wb3J0YW50O1xyXG4gICAgLy8gcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgLy8gZGlzcGxheTogYmxvY2s7XHJcbiAgfVxyXG4gIFxyXG4gIFxyXG4gIC8vLmRyYXdlciB7XHJcbiAgLy8gIGJhY2tncm91bmQ6ICNGM0YzRjM7XHJcbiAgLy8gIC0tYmFja2dyb3VuZDogI0YzRjNGMztcclxuICAvL31cclxuICAvL1xyXG4gIC8vLmlvbi1ib3R0b20tZHJhd2VyLXNjcm9sbGFibGUtY29udGVudCB7XHJcbiAgLy8gIGJhY2tncm91bmQ6ICNGM0YzRjMgIWltcG9ydGFudDtcclxuICAvL31cclxuICBcclxuICBpb24tYm90dG9tLWRyYXdlciB7XHJcbiAgXHJcbiAgICAtLXBhZGRpbmc6IDAgIWltcG9ydGFudDtcclxuICAgIHBhZGRpbmc6IDAgIWltcG9ydGFudDtcclxuICBcclxuICAgIC0tYmFja2dyb3VuZDogI0YzRjNGMyAhaW1wb3J0YW50O1xyXG4gICAgYmFja2dyb3VuZDogI0YzRjNGMyAhaW1wb3J0YW50O1xyXG4gIFxyXG4gICAgaW9uLWNvbnRlbnQge1xyXG4gICAgICAtLWJhY2tncm91bmQ6ICNGM0YzRjMgIWltcG9ydGFudDtcclxuICAgIH1cclxuICBcclxuICAgIFxyXG4gIH1cclxuICAgICAgLnNlZ21lbnQtYnRue1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMTBweCAhaW1wb3J0YW50O1xyXG4gICAgICB9XHJcbiAgXHJcbiAgICAgIC5sYXRlYnlzdHlsZXtcclxuICAgICAgICBmbG9hdDogcmlnaHQ7IFxyXG4gICAgICAgIGZvbnQtc2l6ZTogMTBweDtcclxuICAgICAgICBjb2xvcjogIzNDNzhEQjtcclxuICAgICAgfVxyXG5cclxuICAgICAgLnJlY29yZHVwZGF0ZWRvbntcclxuICAgICAgICBmbG9hdDogcmlnaHQ7XHJcbiAgICAgICAgZm9udC1zaXplOiAxMHB4O1xyXG4gICAgICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcclxuICAgICAgfVxyXG4gIFxyXG4gIC5pbWFnZWJ1dHRvbntcclxuICAgIGZsb2F0OnJpZ2h0O1xyXG4gICAgbWFyZ2luLXRvcDogMHB4O1xyXG4gIH1cclxuICBcclxuICAuYWxlcnRDbGFzc3tcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHdoZWF0O1xyXG4gIH1cclxuXHJcbiAgLmNoYXRidXR0b257XHJcbiAgICBmbG9hdDpyaWdodDtcclxuICAgIG1hcmdpbi10b3A6IDBweDtcclxuICAgIG1hcmdpbi1yaWdodDo1cHg7XHJcbiAgfSJdfQ== */");

/***/ })

}]);
//# sourceMappingURL=pestamp-homepage-pestamp-homepage-module.js.map