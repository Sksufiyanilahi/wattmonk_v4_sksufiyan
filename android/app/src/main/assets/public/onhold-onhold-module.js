(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["onhold-onhold-module"],{

/***/ "/NMm":
/*!*************************************************!*\
  !*** ./src/app/onhold/onhold-routing.module.ts ***!
  \*************************************************/
/*! exports provided: OnholdPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OnholdPageRoutingModule", function() { return OnholdPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _onhold_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./onhold.page */ "Vyn/");




const routes = [
    {
        path: '',
        component: _onhold_page__WEBPACK_IMPORTED_MODULE_3__["OnholdPage"]
    }
];
let OnholdPageRoutingModule = class OnholdPageRoutingModule {
};
OnholdPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], OnholdPageRoutingModule);



/***/ }),

/***/ "/YfI":
/*!*******************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/onhold/onhold.page.html ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\r\n  <ion-toolbar>\r\n    <ion-buttons slot=\"start\">\r\n     <ion-back-button></ion-back-button>\r\n    </ion-buttons>\r\n    <ion-title>On Hold</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n\r\n\r\n<!-- <ion-segment scrollable (ionChange)=\"segmentChanged($event)\" value=\"newDesign\" mode=\"md\">\r\n  <ion-segment-button value=\"newDesign\">\r\n    <ion-label class=\"segment-btn\">New Designs</ion-label>\r\n  </ion-segment-button>\r\n  <ion-segment-button value=\"InDesign\">\r\n    <ion-label class=\"segment-btn\">In Designing</ion-label>\r\n  </ion-segment-button>\r\n  <ion-segment-button value=\"completed\">\r\n    <ion-label class=\"segment-btn\">Completed</ion-label>\r\n  </ion-segment-button>\r\n  <ion-segment-button value=\"InReview\">\r\n    <ion-label class=\"segment-btn\"> In Review</ion-label>\r\n  </ion-segment-button>\r\n  <ion-segment-button value=\"delivered\">\r\n    <ion-label class=\"segment-btn\">Delivered</ion-label>\r\n  </ion-segment-button>\r\n</ion-segment> -->\r\n\r\n<ion-content (click)=\"close()\" >\r\n  <!-- <ion-refresher slot=\"fixed\" (ionRefresh)=\"refreshDesigns($event)\">\r\n      <ion-refresher-content></ion-refresher-content>\r\n    </ion-refresher> -->\r\n  <ion-grid *ngIf=\"listOfDesignsHelper.length !== 0 ;else nodesignFound\">\r\n\r\n      <ion-row *ngFor=\"let item of listOfDesignsHelper;let i = index\">\r\n             <ion-col *ngFor=\"let designData of item.listOfDesigns;let j = index;trackBy: trackdesign\" size=\"12\">\r\n              <ion-card class=\"ion-no-padding custom-card ion-no-margin\" style=\"height: 100%;\" (click)=\"gotoDetails(designData,$event)\">\r\n                  <p class=\"customer-name\"\r\n                  routerDirection=\"forward\">{{designData.name}}\r\n\r\n                <span class=\"chipdetail\" style=\"background-color: rgb(246, 77, 10);\" *ngIf=\"designData.status == 'requestdeclined'\"  >On Hold</span>\r\n                <span fill=\"clear\" background-border=\"clear\" (click)=\"gotoActivity(designData,$event)\" class=\"imagebutton\"  size=\"small\"  ><img src=\"/assets/images/activitylist.png\" style=\"height: 20px;\" /></span>\r\n\r\n        </p>\r\n\r\n        <p style=\"margin:0px\">\r\n            <span class=\"customer-email\" \r\n                    routerDirection=\"forward\">{{designData.email}}</span>\r\n                    <span *ngIf=\"designData.isoverdue\" class=\"latebystyle\"><strong>Late by {{designData.lateby}}</strong></span>\r\n\r\n        </p>\r\n                          <span class=\"recordupdatedon\">Updated {{designData.recordupdatedon}}</span>\r\n\r\n                  <span class=\"customer-address z-100\"\r\n                          (click)=\"openAddressOnMap(designData.address,$event)\">{{(designData.address | slice:0:60) + (designData.address.length > 60 ? '...' : '')}}\r\n\r\n                               <ion-col>\r\n\r\n                                  </ion-col>\r\n\r\n                      </span>\r\n\r\n                  <ion-row style=\"margin-bottom: 0px;\" >\r\n                     <ion-col style=\"padding-left:0px\" >\r\n                      <span class=\"chipdetail\" style=\"background-color: #95afc0;align-self: center;\" >{{designData?.source}}</span>\r\n                      <span class=\"chipdetail\" style=\"background-color: #95afc0;align-self: center;\" >{{designData?.requesttype}}</span>\r\n                  </ion-col>\r\n                  <ion-col *ngIf=\"designData.status == 'designassigned'&& userData.role.type!='clientsuperadmin' && userData.role.type!='clientadmin'\">\r\n                          <span *ngIf=\"designData.status == 'designassigned'\" style=\"float:right;text-align: right;\">\r\n                              {{designData.designremainingtime}}</span></ion-col>\r\n                              <ion-col *ngIf=\"designData.status == 'outsourced'\">\r\n                                  <span *ngIf=\"designData.status == 'outsourced'\" style=\"float:right;text-align: right;\">\r\n                                      {{designData.designacceptanceremainingtime}}</span></ion-col>\r\n                                      <ion-col *ngIf=\"designData.status == 'reviewassigned' && designData.reviewassignedto.id==userData.id\" style=\"color: #737373; font-size: 14px;\">\r\n                                          <span style=\"float: right;\">{{designData.reviewremainingtime}}</span>\r\n                                        </ion-col>\r\n                  </ion-row>\r\n\r\n                  <ion-row class=\"ion-no-margin ion-no-margin\">\r\n                      <ion-col *ngIf=\"segments=='status=requestdeclined'\">\r\n                          <span *ngIf=\"designData.status == 'created' || (designData.status == 'requestaccepted' && (userData.role.type !== 'clientsuperadmin' && userData.role.type !== 'clientadmin')) \" style=\"float:right !important;\" class=\"ion-text-end action-button-color\" (click)=\"openDesigners(designData.id,designData)\"\r\n                          >Assign</span>\r\n                          <span style=\"float: right;\">\r\n                              <ng-container *ngIf=\"userData.role.type !=='clientsuperadmin' && userData.role.type !== 'clientadmin'\">\r\n                                  <ion-col size=\"8\"  *ngIf=\"designData.status == 'outsourced'\"  class=\"ion-text-end action-button-color\" (click)=\"accept(designData.id,'requestaccepted')\">\r\n                                     Accept\r\n                                  </ion-col>\r\n                                  <ion-col size=\"4\" *ngIf=\"designData.status == 'outsourced'\"  class=\"ion-text-end action-button-color\" (click)=\"decline(designData.id)\">\r\n                                  On Hold\r\n                                  </ion-col>\r\n                              </ng-container>\r\n                          </span>\r\n\r\n                          <span *ngIf=\"designData.status == 'requestdeclined' && (userData.role.type=='clientsuperadmin' || userData.role.type=='clientadmin')\"style=\"float:right !important;\" class=\"ion-text-end action-button-color\" (click)=\"directAssignToWattmonk(designData.id,$event)\"\r\n                          >Reassign</span>\r\n                      </ion-col>\r\n                  </ion-row>\r\n\r\n          </ion-card>\r\n          </ion-col>\r\n\r\n      </ion-row>\r\n\r\n\r\n\r\n  </ion-grid>\r\n<ng-template #nodesignFound>\r\n  <div *ngIf=\"listOfDesignsHelper.length === 0 \" class=\"h-100 d-flex flex-column align-center justify-center\">\r\n          <!-- <div *ngIf=\"!netSwitch\"> -->\r\n             {{noDesignFound}}\r\n          <!-- </div> -->\r\n\r\n      <ion-img src=\"/assets/images/blank.png\" class=\"placeholder\"></ion-img>\r\n  </div></ng-template>\r\n\r\n\r\n  <ion-infinite-scroll (ionInfinite)=\"doInfinite($event)\" >\r\n      <ion-infinite-scroll-content\r\n        loadingSpinner=\"bubbles\"\r\n        >\r\n      </ion-infinite-scroll-content>\r\n    </ion-infinite-scroll>\r\n\r\n</ion-content>\r\n\r\n<ion-bottom-drawer [(state)]=\"drawerState\" [minimumHeight]=\"0\" [dockedHeight]=\"300\" [draggable]=\"false\" [disableDrag]=\"true\"\r\n             [shouldBounce]=\"true\" [distanceTop]=\"0\" class=\"drawer\" style=\"z-index: 9999 !important;\">\r\n<form [formGroup]=\"assignForm\">\r\n  <ion-grid class=\"drawer\">\r\n      <ion-row>\r\n         <ion-col size=\"12\">\r\n              <app-user-selector  (assigneeData)=getassignedata($event) placeholder=\"Assign\" [assignees]=\"listOfAssignees\"  [reviewAssigned]=reviewAssignedTo\r\n                                 formControlName=\"assignedto\"></app-user-selector>\r\n\r\n          </ion-col>\r\n      </ion-row>\r\n      <!--<ion-row style=\"margin-left: 8px;\">\r\n          <ion-col size=\"12\">\r\n              <span class=\"input-placeholder\">comments</span>\r\n          </ion-col>\r\n          <ion-col size=\"12\" style=\"padding-top: 0px;\">\r\n              <ion-textarea style=\"max-width: 98%;\" class=\"ion-no-margin ion-no-padding comment_box\" rows=\"3\"\r\n                            formControlName=\"comment\"></ion-textarea>\r\n          </ion-col>\r\n      </ion-row>-->\r\n      <ion-row style=\"justify-content: flex-end;\">\r\n          <ion-col size=\"auto\" style=\"padding-top: 0px; margin-right: 6px;\">\r\n              <ion-button class=\"buttom-drawer-button\" fill=\"clear\" (click)=\"assignToDesigner()\">\r\n                  Confirm\r\n              </ion-button>\r\n          </ion-col>\r\n          <ion-col size=\"auto\">\r\n              <ion-button class=\"buttom-drawer-button-cancel\" fill=\"clear\" (click)=\"dismissBottomSheet()\">\r\n                  Cancel\r\n              </ion-button>\r\n          </ion-col>\r\n      </ion-row>\r\n  </ion-grid>\r\n</form>\r\n\r\n</ion-bottom-drawer>\r\n");

/***/ }),

/***/ "JvVE":
/*!*****************************************!*\
  !*** ./src/app/onhold/onhold.module.ts ***!
  \*****************************************/
/*! exports provided: OnholdPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OnholdPageModule", function() { return OnholdPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _onhold_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./onhold-routing.module */ "/NMm");
/* harmony import */ var _onhold_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./onhold.page */ "Vyn/");
/* harmony import */ var ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ion-bottom-drawer */ "rFvw");
/* harmony import */ var _utilities_utilities_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utilities/utilities.module */ "egEE");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../shared/shared.module */ "PCNd");
/* harmony import */ var _ionic_native_diagnostic_ngx__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ionic-native/diagnostic/ngx */ "mtRb");
/* harmony import */ var _ionic_native_native_geocoder_ngx__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ionic-native/native-geocoder/ngx */ "h+qT");
/* harmony import */ var _ionic_native_launch_navigator_ngx__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ionic-native/launch-navigator/ngx */ "fGQ8");
/* harmony import */ var _declinepage_declinepage_page__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../declinepage/declinepage.page */ "uPeJ");
/* harmony import */ var _ionic_native_chooser_ngx__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @ionic-native/chooser/ngx */ "UWV4");
/* harmony import */ var _ionic_native_file_ngx__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @ionic-native/file/ngx */ "FAH8");
/* harmony import */ var _ionic_native_network_ngx__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @ionic-native/network/ngx */ "kwrG");
/* harmony import */ var _email_model_email_model_page__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../email-model/email-model.page */ "+k72");
/* harmony import */ var _ionic_native_local_notifications_ngx__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @ionic-native/local-notifications/ngx */ "Bg0J");
/* harmony import */ var _ionic_native_file_transfer_ngx__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @ionic-native/file-transfer/ngx */ "B7Rs");




















let OnholdPageModule = class OnholdPageModule {
};
OnholdPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        entryComponents: [_declinepage_declinepage_page__WEBPACK_IMPORTED_MODULE_13__["DeclinepagePage"], _email_model_email_model_page__WEBPACK_IMPORTED_MODULE_17__["EmailModelPage"]],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _onhold_routing_module__WEBPACK_IMPORTED_MODULE_5__["OnholdPageRoutingModule"],
            ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_7__["IonBottomDrawerModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
            _utilities_utilities_module__WEBPACK_IMPORTED_MODULE_8__["UtilitiesModule"],
            _shared_shared_module__WEBPACK_IMPORTED_MODULE_9__["SharedModule"]
        ],
        declarations: [_onhold_page__WEBPACK_IMPORTED_MODULE_6__["OnholdPage"]],
        providers: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["DatePipe"],
            _ionic_native_diagnostic_ngx__WEBPACK_IMPORTED_MODULE_10__["Diagnostic"],
            _ionic_native_native_geocoder_ngx__WEBPACK_IMPORTED_MODULE_11__["NativeGeocoder"],
            _ionic_native_launch_navigator_ngx__WEBPACK_IMPORTED_MODULE_12__["LaunchNavigator"],
            _ionic_native_chooser_ngx__WEBPACK_IMPORTED_MODULE_14__["Chooser"],
            _ionic_native_file_ngx__WEBPACK_IMPORTED_MODULE_15__["File"],
            _ionic_native_network_ngx__WEBPACK_IMPORTED_MODULE_16__["Network"],
            _ionic_native_file_transfer_ngx__WEBPACK_IMPORTED_MODULE_19__["FileTransfer"],
            _ionic_native_local_notifications_ngx__WEBPACK_IMPORTED_MODULE_18__["LocalNotifications"]
        ]
    })
], OnholdPageModule);



/***/ }),

/***/ "Qiel":
/*!*****************************************!*\
  !*** ./src/app/onhold/onhold.page.scss ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".custom-card {\n  display: flex !important;\n  flex-direction: column !important;\n  background: white !important;\n  border-radius: 4px !important;\n  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.3) !important;\n  padding: 8px 12px;\n}\n\n.customer-name {\n  font-size: 1em;\n  color: #434343;\n  font-weight: bold;\n  display: table;\n  margin: 0px;\n}\n\n.customer-email {\n  font-size: 0.8em;\n  color: #B4B4B4;\n}\n\n.customer-phone {\n  font-size: 0.8em;\n  color: #4272B9;\n}\n\n.customer-address {\n  margin-top: 4px;\n  margin-bottom: 6px;\n  font-size: 0.8em;\n  color: #4272B9;\n}\n\n.timestamp {\n  font-size: 0.7em;\n}\n\n.chipdetail {\n  display: inline;\n  vertical-align: middle;\n  background-color: #95afc0;\n  font-size: 0.6em;\n  padding: 4px 10px;\n  border-radius: 10px;\n  text-align: center;\n  color: #fff;\n}\n\n.cssclass {\n  --max-height:100% !important;\n}\n\nion-bottom-drawer {\n  --padding: 0 !important;\n  padding: 0 !important;\n  --background: #F3F3F3 !important;\n  background: #F3F3F3 !important;\n}\n\nion-bottom-drawer ion-content {\n  --background: #F3F3F3 !important;\n}\n\n.segment-btn {\n  font-size: 10px !important;\n}\n\n.latebystyle {\n  float: right;\n  font-size: 10px;\n  color: #3C78DB;\n}\n\n.imagebutton {\n  float: right;\n  margin-top: 0px;\n}\n\n.alertClass {\n  background-color: wheat;\n}\n\n.recordupdatedon {\n  float: right;\n  font-size: 10px;\n  font-style: italic;\n  text-align: right;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXG9uaG9sZC5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSx3QkFBQTtFQUNBLGlDQUFBO0VBQ0EsNEJBQUE7RUFDQSw2QkFBQTtFQUNBLHFEQUFBO0VBQ0EsaUJBQUE7QUFDSjs7QUFFRTtFQUNFLGNBQUE7RUFDQSxjQUFBO0VBQ0EsaUJBQUE7RUFDQSxjQUFBO0VBQ0EsV0FBQTtBQUNKOztBQUVFO0VBQ0UsZ0JBQUE7RUFDQSxjQUFBO0FBQ0o7O0FBRUU7RUFDRSxnQkFBQTtFQUNBLGNBQUE7QUFDSjs7QUFFRTtFQUNFLGVBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsY0FBQTtBQUNKOztBQU1FO0VBQ0UsZ0JBQUE7QUFISjs7QUFPRTtFQUNFLGVBQUE7RUFDQSxzQkFBQTtFQUNBLHlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxpQkFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxXQUFBO0FBSko7O0FBTUU7RUFDRSw0QkFBQTtBQUhKOztBQWtCRTtFQUVFLHVCQUFBO0VBQ0EscUJBQUE7RUFFQSxnQ0FBQTtFQUNBLDhCQUFBO0FBakJKOztBQW1CSTtFQUNFLGdDQUFBO0FBakJOOztBQXNCTTtFQUNFLDBCQUFBO0FBbkJSOztBQXNCTTtFQUNFLFlBQUE7RUFDQSxlQUFBO0VBQ0EsY0FBQTtBQW5CUjs7QUFzQkU7RUFDRSxZQUFBO0VBQ0EsZUFBQTtBQW5CSjs7QUFzQkU7RUFDRSx1QkFBQTtBQW5CSjs7QUFzQkU7RUFDRSxZQUFBO0VBQ0EsZUFBQTtFQUNBLGtCQUFBO0VBQ0EsaUJBQUE7QUFuQkoiLCJmaWxlIjoib25ob2xkLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jdXN0b20tY2FyZCB7XHJcbiAgICBkaXNwbGF5OiBmbGV4ICFpbXBvcnRhbnQ7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uICFpbXBvcnRhbnQ7XHJcbiAgICBiYWNrZ3JvdW5kOiB3aGl0ZSAhaW1wb3J0YW50O1xyXG4gICAgYm9yZGVyLXJhZGl1czogNHB4ICFpbXBvcnRhbnQ7XHJcbiAgICBib3gtc2hhZG93OiAwIDFweCAycHggMCByZ2JhKDAsIDAsIDAsIDAuMykgIWltcG9ydGFudDtcclxuICAgIHBhZGRpbmc6IDhweCAxMnB4O1xyXG4gIH1cclxuICBcclxuICAuY3VzdG9tZXItbmFtZSB7XHJcbiAgICBmb250LXNpemU6IDFlbTtcclxuICAgIGNvbG9yOiAjNDM0MzQzO1xyXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgICBkaXNwbGF5OnRhYmxlO1xyXG4gICAgbWFyZ2luOiAwcHg7XHJcbiAgfVxyXG4gIFxyXG4gIC5jdXN0b21lci1lbWFpbCB7XHJcbiAgICBmb250LXNpemU6IDAuOGVtO1xyXG4gICAgY29sb3I6ICNCNEI0QjQ7XHJcbiAgfVxyXG4gIFxyXG4gIC5jdXN0b21lci1waG9uZSB7XHJcbiAgICBmb250LXNpemU6IDAuOGVtO1xyXG4gICAgY29sb3I6ICM0MjcyQjk7XHJcbiAgfVxyXG4gIFxyXG4gIC5jdXN0b21lci1hZGRyZXNzIHtcclxuICAgIG1hcmdpbi10b3A6IDRweDtcclxuICAgIG1hcmdpbi1ib3R0b206IDZweDtcclxuICAgIGZvbnQtc2l6ZTogMC44ZW07XHJcbiAgICBjb2xvcjogIzQyNzJCOTtcclxuICB9XHJcbiAgXHJcbiAgLnBsYWNlaG9sZGVyIHtcclxuICAgIC8vIHdpZHRoOiA1MHZ3ICFpbXBvcnRhbnQ7XHJcbiAgfVxyXG4gIFxyXG4gIC50aW1lc3RhbXAge1xyXG4gICAgZm9udC1zaXplOiAwLjdlbTtcclxuICAgXHJcbiAgfVxyXG4gIFxyXG4gIC5jaGlwZGV0YWlse1xyXG4gICAgZGlzcGxheTogaW5saW5lO1xyXG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICM5NWFmYzA7XHJcbiAgICBmb250LXNpemU6IDAuNmVtO1xyXG4gICAgcGFkZGluZzogNHB4IDEwcHg7XHJcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgY29sb3I6ICNmZmY7XHJcbiAgfVxyXG4gIC5jc3NjbGFzc3tcclxuICAgIC0tbWF4LWhlaWdodCA6MTAwJSAhaW1wb3J0YW50O1xyXG4gICAgLy8gcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgLy8gZGlzcGxheTogYmxvY2s7XHJcbiAgfVxyXG4gIFxyXG4gIFxyXG4gIC8vLmRyYXdlciB7XHJcbiAgLy8gIGJhY2tncm91bmQ6ICNGM0YzRjM7XHJcbiAgLy8gIC0tYmFja2dyb3VuZDogI0YzRjNGMztcclxuICAvL31cclxuICAvL1xyXG4gIC8vLmlvbi1ib3R0b20tZHJhd2VyLXNjcm9sbGFibGUtY29udGVudCB7XHJcbiAgLy8gIGJhY2tncm91bmQ6ICNGM0YzRjMgIWltcG9ydGFudDtcclxuICAvL31cclxuICBcclxuICBpb24tYm90dG9tLWRyYXdlciB7XHJcbiAgXHJcbiAgICAtLXBhZGRpbmc6IDAgIWltcG9ydGFudDtcclxuICAgIHBhZGRpbmc6IDAgIWltcG9ydGFudDtcclxuICBcclxuICAgIC0tYmFja2dyb3VuZDogI0YzRjNGMyAhaW1wb3J0YW50O1xyXG4gICAgYmFja2dyb3VuZDogI0YzRjNGMyAhaW1wb3J0YW50O1xyXG4gIFxyXG4gICAgaW9uLWNvbnRlbnQge1xyXG4gICAgICAtLWJhY2tncm91bmQ6ICNGM0YzRjMgIWltcG9ydGFudDtcclxuICAgIH1cclxuICBcclxuICAgIFxyXG4gIH1cclxuICAgICAgLnNlZ21lbnQtYnRue1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMTBweCAhaW1wb3J0YW50O1xyXG4gICAgICB9XHJcbiAgXHJcbiAgICAgIC5sYXRlYnlzdHlsZXtcclxuICAgICAgICBmbG9hdDogcmlnaHQ7IFxyXG4gICAgICAgIGZvbnQtc2l6ZTogMTBweDtcclxuICAgICAgICBjb2xvcjogIzNDNzhEQjtcclxuICAgICAgfVxyXG4gIFxyXG4gIC5pbWFnZWJ1dHRvbntcclxuICAgIGZsb2F0OnJpZ2h0O1xyXG4gICAgbWFyZ2luLXRvcDogMHB4O1xyXG4gIH1cclxuICBcclxuICAuYWxlcnRDbGFzc3tcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHdoZWF0O1xyXG4gIH1cclxuICBcclxuICAucmVjb3JkdXBkYXRlZG9ue1xyXG4gICAgZmxvYXQ6IHJpZ2h0O1xyXG4gICAgZm9udC1zaXplOiAxMHB4O1xyXG4gICAgZm9udC1zdHlsZTogaXRhbGljO1xyXG4gICAgdGV4dC1hbGlnbjogcmlnaHQ7XHJcbiAgfSJdfQ== */");

/***/ }),

/***/ "Vyn/":
/*!***************************************!*\
  !*** ./src/app/onhold/onhold.page.ts ***!
  \***************************************/
/*! exports provided: OnholdPage, DesginDataHelper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OnholdPage", function() { return OnholdPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DesginDataHelper", function() { return DesginDataHelper; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_onhold_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./onhold.page.html */ "/YfI");
/* harmony import */ var _onhold_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./onhold.page.scss */ "Qiel");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_api_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/api.service */ "yTNM");
/* harmony import */ var src_app_utilities_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/utilities.service */ "oTnF");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _ionic_native_launch_navigator_ngx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic-native/launch-navigator/ngx */ "fGQ8");
/* harmony import */ var ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ion-bottom-drawer */ "rFvw");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ionic/storage */ "e8h1");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var src_app_declinepage_declinepage_page__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! src/app/declinepage/declinepage.page */ "uPeJ");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! moment */ "wd/R");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var src_app_storage_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! src/app/storage.service */ "qkCY");
/* harmony import */ var src_app_networkdetect_service__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! src/app/networkdetect.service */ "UZ2B");
/* harmony import */ var _ionic_native_social_sharing_ngx__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @ionic-native/social-sharing/ngx */ "/XPu");
/* harmony import */ var src_app_email_model_email_model_page__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! src/app/email-model/email-model.page */ "+k72");
/* harmony import */ var src_app_resendpagedialog_resendpagedialog_page__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! src/app/resendpagedialog/resendpagedialog.page */ "R1eT");
/* harmony import */ var src_app_payment_modal_payment_modal_page__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! src/app/payment-modal/payment-modal.page */ "XSze");
/* harmony import */ var _ionic_native_file_transfer_ngx__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @ionic-native/file-transfer/ngx */ "B7Rs");
/* harmony import */ var _ionic_native_file_ngx__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @ionic-native/file/ngx */ "FAH8");
/* harmony import */ var _ionic_native_local_notifications_ngx__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @ionic-native/local-notifications/ngx */ "Bg0J");
/* harmony import */ var _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @cometchat-pro/cordova-ionic-chat */ "ujHh");
/* harmony import */ var _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_24___default = /*#__PURE__*/__webpack_require__.n(_cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_24__);
/* harmony import */ var _ionic_native_android_permissions_ngx__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @ionic-native/android-permissions/ngx */ "WOgW");


























let OnholdPage = class OnholdPage {
    //counts
    // newprelims: Observable<any>;
    // newprelimsRef: AngularFireObject<any>;
    // //newprelimsRef:any;
    // newprelimscount = 0;
    constructor(utils, apiService, datePipe, storage, cdr, launchNavigator, formBuilder, route, router, modalController, storageService, network, alertController, socialsharing, file, localnotification, platform, androidPermissions, transfer) {
        this.utils = utils;
        this.apiService = apiService;
        this.datePipe = datePipe;
        this.storage = storage;
        this.cdr = cdr;
        this.launchNavigator = launchNavigator;
        this.formBuilder = formBuilder;
        this.route = route;
        this.router = router;
        this.modalController = modalController;
        this.storageService = storageService;
        this.network = network;
        this.alertController = alertController;
        this.socialsharing = socialsharing;
        this.file = file;
        this.localnotification = localnotification;
        this.platform = platform;
        this.androidPermissions = androidPermissions;
        this.transfer = transfer;
        this.listOfDesignDataHelper = [];
        this.options = {
            start: '',
            app: this.launchNavigator.APP.GOOGLE_MAPS
        };
        this.drawerState = ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_8__["DrawerState"].Bottom;
        this.listOfAssignees = [];
        this.listOfAssignees2 = [];
        this.designId = 0;
        this.disableAccept = "true";
        this.showBottomDraw = false;
        this.myFiles = [];
        this.skip = 0;
        this.limit = 10;
        this.isclientassigning = false;
        this.userData = this.storageService.getUser();
        this.segments = 'status=requestdeclined';
        const latestDate = new Date();
        this.today = datePipe.transform(latestDate, 'M/dd/yy');
        console.log('date', this.today);
        this.todaysdate = datePipe.transform(latestDate, 'yyyy-MM-dd');
        this.assignForm = this.formBuilder.group({
            assignedto: new _angular_forms__WEBPACK_IMPORTED_MODULE_9__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_9__["Validators"].required]),
            comment: new _angular_forms__WEBPACK_IMPORTED_MODULE_9__["FormControl"]('')
        });
        //counts
        // this.newprelimsRef = db.object('newprelimdesigns');
        // this.newprelims = this.newprelimsRef.valueChanges();
        // this.newprelims.subscribe(
        //   (res) => {
        //     console.log(res);
        //     this.newprelimscount = res.count;
        //     cdr.detectChanges();
        //   },
        //   (err) => console.log(err),
        //   () => console.log('done!')
        // )
    }
    createChatGroup(design) {
        var GUID = 'prelim' + "_" + new Date().getTime();
        var address = design.address.substring(0, 60);
        var groupName = design.name + "_" + address;
        var groupType = _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_24__["CometChat"].GROUP_TYPE.PRIVATE;
        var password = "";
        var group = new _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_24__["CometChat"].Group(GUID, groupName, groupType, password);
        _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_24__["CometChat"].createGroup(group).then(group => {
            let membersList = [
                new _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_24__["CometChat"].GroupMember("" + design.createdby.id, _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_24__["CometChat"].GROUP_MEMBER_SCOPE.ADMIN)
            ];
            _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_24__["CometChat"].addMembersToGroup(group.getGuid(), membersList, []).then(response => {
                this.cdr.detectChanges();
            });
        });
    }
    ionViewDidEnter() {
        this.deactivateNetworkSwitch = this.network.networkSwitch.subscribe(data => {
            this.netSwitch = data;
            console.log(this.netSwitch);
        });
        this.network.networkDisconnect();
        this.network.networkConnect();
    }
    ngOnInit() {
        this.apiService.emitUserNameAndRole(this.userData);
        // this.userData = this.storageService.getUser();
        console.log(this.userData);
        this.DesignRefreshSubscription = this.utils.getHomepageDesignRefresh().subscribe((result) => {
            this.skip = 0;
            this.getDesigns(null);
        });
        this.dataRefreshSubscription = this.utils.getDataRefresh().subscribe((result) => {
            if (this.listOfDesigns != null && this.listOfDesigns.length > 0) {
                this.formatDesignData(this.listOfDesigns);
            }
        });
    }
    getDesigns(event) {
        let showLoader = true;
        if (event != null && event !== undefined) {
            showLoader = false;
        }
        this.fetchPendingDesigns(event, showLoader);
    }
    accept(id, data) {
        this.acceptid = id;
        let status = {
            status: data
        };
        this.utils.showLoading("accepting").then(() => {
            this.apiService.updateDesignForm(status, id).subscribe((res) => {
                if (!res.isinrevisionstate) {
                    this.createNewDesignChatGroup(res);
                }
                this.utils.hideLoading().then(() => {
                    this.utils.setHomepageDesignRefresh(true);
                });
            });
        });
    }
    addUserToGroupChat() {
        var GUID = this.designerData.chatid;
        var userscope = _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_24__["CometChat"].GROUP_MEMBER_SCOPE.PARTICIPANT;
        if (this.isclientassigning) {
            userscope = _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_24__["CometChat"].GROUP_MEMBER_SCOPE.ADMIN;
        }
        let membersList = [
            new _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_24__["CometChat"].GroupMember("" + this.selectedDesigner.id, userscope)
        ];
        _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_24__["CometChat"].addMembersToGroup(GUID, membersList, []).then(response => {
        }, error => {
        });
    }
    fetchPendingDesigns(event, showLoader) {
        this.noDesignFound = "";
        console.log("inside fetch Designs");
        this.listOfDesigns = [];
        this.listOfDesignsHelper = [];
        this.utils.showLoadingWithPullRefreshSupport(showLoader, 'Getting Designs').then((success) => {
            this.apiService.getDesignSurveys(this.segments, this.limit, this.skip).subscribe((response) => {
                this.utils.hideLoadingWithPullRefreshSupport(showLoader).then(() => {
                    console.log(response);
                    if (response.length) {
                        this.formatDesignData(response);
                    }
                    else {
                        this.noDesignFound = "No Designs Found";
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
                    this.utils.errorSnackBar(error.message[0].messages[0].message);
                });
            });
        });
    }
    formatDesignData(records) {
        this.overdue = [];
        let list;
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
        this.cdr.detectChanges();
    }
    ngOnDestroy() {
        // this.refreshSubscription.unsubscribe();
        // this.routeSubscription.unsubscribe();
        this.dataRefreshSubscription.unsubscribe();
        this.DesignRefreshSubscription.unsubscribe();
    }
    fillinDynamicData(records) {
        records.forEach((element) => {
            if (element.status != "delivered") {
                element.isoverdue = this.utils.isDatePassed(element.deliverydate);
            }
            else {
                element.isoverdue = false;
            }
            var reviewdate = new Date(element.reviewstarttime);
            reviewdate.setMinutes(reviewdate.getMinutes() + 15);
            element.reviewremainingtime = this.utils.getRemainingTime(reviewdate.toString());
            element.lateby = this.utils.getTheLatebyString(element.deliverydate);
            element.recordupdatedon = this.utils.formatDateInTimeAgo(element.updated_at);
            element.formattedjobtype = this.utils.getJobTypeName(element.jobtype);
            var acceptancedate = new Date(element.designacceptancestarttime);
            element.designacceptanceremainingtime = this.utils.getRemainingTime(acceptancedate.toString());
            var indesigndate = new Date(element.designstarttime);
            indesigndate.setHours(indesigndate.getHours() + 2);
            element.designremainingtime = this.utils.getRemainingTime(indesigndate.toString());
            //Setting acceptance timer
            if (element.status == "outsourced") {
                if (element.requesttype == "permit") {
                    var acceptancedate = new Date(element.designacceptancestarttime);
                    element.designacceptanceremainingtime = this.utils.getRemainingTime(acceptancedate.toString());
                }
                else {
                    var acceptancedate = new Date(element.designacceptancestarttime);
                    element.designacceptanceremainingtime = this.utils.getRemainingTime(acceptancedate.toString());
                }
                if (element.designacceptanceremainingtime == "0h : 0m") {
                    element.isoverdue = true;
                }
            }
            //Setting design timer
            if (element.status == "designassigned" || element.status == "designcompleted") {
                if (element.requesttype == "permit") {
                    var acceptancedate = new Date(element.designstarttime);
                    acceptancedate.setHours(acceptancedate.getHours() + 6);
                    element.designremainingtime = this.utils.getRemainingTime(acceptancedate.toString());
                }
                else {
                    var acceptancedate = new Date(element.designstarttime);
                    acceptancedate.setHours(acceptancedate.getHours() + 2);
                    element.designremainingtime = this.utils.getRemainingTime(acceptancedate.toString());
                }
                if (element.designremainingtime == "0h : 0m") {
                    element.isoverdue = true;
                }
            }
            //Setting review timer
            if (element.status == "reviewassigned" || element.status == "reviewpassed" || element.status == "reviewfailed") {
                if (element.requesttype == "permit") {
                    var reviewdate = new Date(element.reviewstarttime);
                    reviewdate.setHours(reviewdate.getHours() + 2);
                    element.reviewremainingtime = this.utils.getRemainingTime(reviewdate.toString());
                }
                else {
                    var reviewdate = new Date(element.reviewstarttime);
                    reviewdate.setMinutes(reviewdate.getMinutes() + 15);
                    element.reviewremainingtime = this.utils.getRemainingTime(reviewdate.toString());
                }
                if (element.reviewremainingtime == "0h : 0m") {
                    element.isoverdue = true;
                }
            }
            // this.storage.get(''+element.id).then((data: any) => {
            //   console.log(data,">>>");
            //   if (data) {
            //     element.totalpercent = data.currentprogress;
            //   }else{
            //     element.totalpercent = 0;
            //   }
            // });
        });
        return records;
    }
    trackdesign(index, design) {
        return design.id;
    }
    openAddressOnMap(address, event) {
        event.stopPropagation();
        this.launchNavigator.navigate(address, this.options);
    }
    dismissBottomSheet() {
        console.log('this', this.drawerState);
        this.drawerState = ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_8__["DrawerState"].Bottom;
        this.utils.setBottomBarHomepage(true);
        this.assignForm.get('comment').setValue("");
        this.listOfAssignees = [];
        // console.log("this works",this.listOfAssignees)
    }
    assignToDesigner() {
        console.log(this.designerData.createdby.id);
        if (this.assignForm.status === 'INVALID' && (this.designerData.status === 'designcompleted' || this.designerData.status === 'reviewassigned' || this.designerData.status === 'reviewfailed' || this.designerData.status === 'reviewpassed')) {
            this.utils.errorSnackBar('Please select a analyst');
        }
        else if (this.assignForm.status === 'INVALID' && (this.designerData.status === 'created' || this.designerData.status === 'requestaccepted' || this.designerData.status === 'designassigned')) {
            if (this.userData.role.type == 'clientsuperadmin') {
                this.utils.errorSnackBar('Please select the wattmonk admin');
            }
            else {
                this.utils.errorSnackBar('Please select a designer');
            }
        }
        else if (this.reviewAssignedTo != null && (this.selectedDesigner.id == this.reviewAssignedTo.id)) {
            this.utils.errorSnackBar("This design request has been already assigned to" + " " + this.selectedDesigner.firstname + " " + this.selectedDesigner.lastname);
        }
        else {
            var designstarttime = new Date();
            var milisecond = designstarttime.getTime();
            var additonalhours = 0;
            if (this.designerData.requesttype == "prelim") {
                console.log(parseInt(this.selectedDesigner.jobcount));
                additonalhours = parseInt(this.selectedDesigner.jobcount) * 2;
                designstarttime.setHours(designstarttime.getHours() + additonalhours);
            }
            else {
                additonalhours = parseInt(this.selectedDesigner.jobcount) * 6;
                designstarttime.setHours(designstarttime.getHours() + additonalhours);
            }
            console.log(this.selectedDesigner);
            var postData = {};
            if (this.designerData.createdby.id == this.userData.id) {
                if (this.selectedDesigner.parent.id == this.userData.parent.id) {
                    if (this.selectedDesigner.role.type == "qcinspector") {
                        postData = {
                            reviewassignedto: this.selectedDesigner.id,
                            status: "reviewassigned",
                            reviewstarttime: milisecond
                        };
                    }
                    if (this.selectedDesigner.role.type == "designer") {
                        postData = {
                            designassignedto: this.selectedDesigner.id,
                            isoutsourced: "false",
                            status: "designassigned",
                            designstarttime: designstarttime
                        };
                    }
                }
                else {
                    var designacceptancestarttime = new Date();
                    designacceptancestarttime.setMinutes(designacceptancestarttime.getMinutes() + 15);
                    postData = {
                        outsourcedto: this.selectedDesigner.id,
                        isoutsourced: "true",
                        status: "outsourced",
                        designacceptancestarttime: designacceptancestarttime
                    };
                }
            }
            else {
                if (this.selectedDesigner.role.type == "designer") {
                    postData = {
                        designassignedto: this.selectedDesigner.id,
                        status: "designassigned",
                        designstarttime: designstarttime
                    };
                }
                if (this.selectedDesigner.role.type == "qcinspector") {
                    postData = {
                        reviewassignedto: this.selectedDesigner.id,
                        status: "reviewassigned",
                        reviewstarttime: milisecond
                    };
                }
            }
            this.utils.showLoading('Assigning').then(() => {
                this.apiService.updateDesignForm(postData, this.designId).subscribe((value) => {
                    this.utils.hideLoading().then(() => {
                        ;
                        console.log('reach ', value);
                        if (this.userData.role.type === 'clientsuperadmin' && this.designerData.status === 'created') {
                            this.isclientassigning = true;
                            this.utils.showSnackBar('Design request has been assigned to wattmonk successfully');
                            this.addUserToGroupChat();
                        }
                        else {
                            this.addUserToGroupChat();
                            this.utils.showSnackBar('Design request has been assigned to' + ' ' + this.selectedDesigner.firstname + " " + this.selectedDesigner.lastname + ' ' + 'successfully');
                        }
                        this.dismissBottomSheet();
                        this.showBottomDraw = false;
                        this.utils.setHomepageDesignRefresh(true);
                    });
                }, (error) => {
                    this.utils.hideLoading();
                    this.dismissBottomSheet();
                    this.showBottomDraw = false;
                });
            });
        }
    }
    openDesigners(id, designData) {
        this.listOfAssignees = [];
        console.log("this is", designData);
        this.designerData = designData;
        this.reviewAssignedTo = designData.designassignedto;
        if ((this.userData.role.type == 'clientsuperadmin' || this.userData.role.type == 'clientadmin') && this.designerData.status == 'created') {
            this.router.navigate(["payment-modal", { id: id, designData: this.designerData.requesttype }]);
        }
        else {
            if (this.listOfAssignees.length === 0) {
                this.utils.showLoading('Getting Designers').then(() => {
                    this.apiService.getDesigners().subscribe(assignees => {
                        this.utils.hideLoading().then(() => {
                            this.listOfAssignees = [];
                            // this.listOfAssignees.push(this.utils.getDefaultAssignee(this.storage.getUserID()));
                            assignees.forEach(item => this.listOfAssignees.push(item));
                            console.log(this.listOfAssignees);
                            this.showBottomDraw = true;
                            this.designId = id;
                            this.utils.setBottomBarHomepage(false);
                            this.drawerState = ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_8__["DrawerState"].Docked;
                            this.assignForm.patchValue({
                                assignedto: ''
                            });
                        });
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
                this.drawerState = ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_8__["DrawerState"].Docked;
                this.assignForm.patchValue({
                    assignedto: ''
                });
            }
        }
    }
    openAnalysts(id, designData) {
        this.listOfAssignees = [];
        console.log("this is", designData);
        this.designerData = designData;
        this.reviewAssignedTo = designData.reviewassignedto;
        if (this.listOfAssignees.length === 0) {
            this.utils.showLoading('Getting Analysts').then(() => {
                this.apiService.getAnalysts().subscribe(assignees => {
                    this.utils.hideLoading().then(() => {
                        this.listOfAssignees = [];
                        // this.listOfAssignees.push(this.utils.getDefaultAssignee(this.storage.getUserID()));
                        assignees.forEach(item => this.listOfAssignees.push(item));
                        console.log(this.listOfAssignees);
                        this.showBottomDraw = true;
                        this.designId = id;
                        this.utils.setBottomBarHomepage(false);
                        this.drawerState = ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_8__["DrawerState"].Docked;
                        this.assignForm.patchValue({
                            assignedto: ''
                        });
                    });
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
            this.drawerState = ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_8__["DrawerState"].Docked;
            this.assignForm.patchValue({
                assignedto: ''
            });
        }
    }
    close() {
        if (this.showBottomDraw === true) {
            this.showBottomDraw = false;
            this.drawerState = ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_8__["DrawerState"].Bottom;
            this.utils.setBottomBarHomepage(true);
        }
        else {
            this.showBottomDraw = true;
        }
    }
    openreviewPassed(id, designData) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.designId = id;
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
                        text: 'Cancel',
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: (blah) => {
                            console.log('Confirm Cancel: blah');
                        }
                    }, {
                        text: 'deliver',
                        handler: (alertData) => {
                            var postData = {};
                            if (alertData.comment != "") {
                                postData = {
                                    status: "delivered",
                                    comments: alertData.comment,
                                };
                            }
                            else {
                                postData = {
                                    status: "delivered",
                                };
                            }
                            console.log(postData);
                            this.apiService.updateDesignForm(postData, this.designId).subscribe((value) => {
                                this.utils.hideLoading().then(() => {
                                    ;
                                    console.log('reach ', value);
                                    this.utils.showSnackBar('Design request has been delivered successfully');
                                    this.utils.setHomepageDesignRefresh(true);
                                });
                            }, (error) => {
                                this.utils.hideLoading();
                                ;
                            });
                        }
                    }
                ]
            });
            yield alert.present();
        });
    }
    doInfinite($event) {
        console.log($event);
        this.skip = this.skip + 10;
        this.apiService.getDesignSurveys(this.segments, this.limit, this.skip).subscribe((response) => {
            console.log(response);
            if (response.length) {
                this.formatDesignData(response);
            }
            else {
                this.noDesignFound = "No Designs Found";
            }
            if ($event !== null) {
                $event.target.complete();
            }
        }, (responseError) => {
            if ($event !== null) {
                $event.target.complete();
            }
            const error = responseError.error;
            this.utils.errorSnackBar(error.message[0].messages[0].message);
        });
    }
    refreshDesigns(event) {
        this.skip = 0;
        let showLoader = true;
        if (event !== null && event !== undefined) {
            showLoader = false;
        }
        this.fetchPendingDesigns(event, showLoader);
    }
    OpenPaymentmodal(id) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const modal = yield this.modalController.create({
                component: src_app_payment_modal_payment_modal_page__WEBPACK_IMPORTED_MODULE_20__["PaymentModalPage"],
                cssClass: 'my-custom-modal-css',
                componentProps: {
                    id: id,
                    designData: this.designerData
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
    decline(id) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const modal = yield this.modalController.create({
                component: src_app_declinepage_declinepage_page__WEBPACK_IMPORTED_MODULE_13__["DeclinepagePage"],
                cssClass: 'my-custom-modal-css',
                componentProps: {
                    id: id
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
    Resend(id, type) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const modal = yield this.modalController.create({
                component: src_app_resendpagedialog_resendpagedialog_page__WEBPACK_IMPORTED_MODULE_19__["ResendpagedialogPage"],
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
        var checkdate = moment__WEBPACK_IMPORTED_MODULE_14__(datestring, "YYYYMMDD");
        var todaydate = moment__WEBPACK_IMPORTED_MODULE_14__(new Date(), "YYYYMMDD");
        var lateby = todaydate.diff(checkdate, "days");
        this.overdue = lateby;
    }
    selfAssign(id, designData) {
        var designstarttime = new Date();
        var milisecond = designstarttime.getTime();
        var postData = {};
        postData = {
            reviewassignedto: this.userData.id,
            status: "reviewassigned",
            reviewstarttime: milisecond
        };
        this.utils.showLoading('Assigning').then(() => {
            this.apiService.updateDesignForm(postData, id).subscribe((value) => {
                this.utils.hideLoading().then(() => {
                    ;
                    console.log('reach ', value);
                    this.utils.showSnackBar('Design request has been assigned to you successfully');
                    this.utils.setHomepageDesignRefresh(true);
                });
            }, (error) => {
                this.utils.hideLoading();
            });
        });
    }
    getassignedata(asssignedata) {
        this.selectedDesigner = asssignedata;
        console.log("dholak is", this.selectedDesigner);
    }
    gotoActivity(designData, event) {
        console.log(event);
        event.stopPropagation();
        this.router.navigate(['/activity' + '/' + designData.id + '/design']);
    }
    gotoDetails(designData, $event) {
        // $event.preventDefault();
        // $event.stopPropagation();
        this.router.navigate(['/permit-design-details/' + designData.id]);
    }
    shareWhatsapp(designData) {
        this.socialsharing.share(designData.prelimdesign.url);
    }
    shareViaEmails(id, designData) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const modal = yield this.modalController.create({
                component: src_app_email_model_email_model_page__WEBPACK_IMPORTED_MODULE_18__["EmailModelPage"],
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
    designDownload(designData) {
        this.platform.ready().then(() => {
            this.file.resolveDirectoryUrl(this.storageDirectory).then(resolvedDirectory => {
                this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then(result => console.log('Has permission?', result.hasPermission), err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE));
                this.file.checkFile(resolvedDirectory.nativeURL, designData.prelimdesign.hash).then(data => {
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
                            fileTransfer.download(url, this.storageDirectory + designData.prelimdesign.hash + designData.prelimdesign.ext).then((entry) => {
                                this.utils.hideLoading().then(() => {
                                    console.log('download complete: ' + entry.toURL());
                                    this.utils.showSnackBar("Prelim Design Downloaded Successfully");
                                    // this.clickSub = this.localnotification.on('click').subscribe(data => {
                                    //   console.log(data)
                                    //   path;
                                    // })
                                    this.localnotification.schedule({ text: 'Prelim Design Downloaded Successfully', foreground: true, vibrate: true });
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
        const url = designData.prelimdesign.url;
        const fileTransfer = this.transfer.create();
        let result = this.file.createDir(this.file.externalRootDirectory, dir_name, true);
        result.then((resp) => {
            path = resp.toURL();
            console.log(path);
            fileTransfer.download(url, path + designData.prelimdesign.hash + designData.prelimdesign.ext).then((entry) => {
                console.log('download complete: ' + entry.toURL());
                this.utils.showSnackBar("Prelim Design Downloaded Successfully");
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
    createNewDesignChatGroup(design) {
        var GUID = 'prelim' + "_" + new Date().getTime();
        var address = design.address.substring(0, 60);
        var groupName = design.name + "_" + address;
        var groupType = _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_24__["CometChat"].GROUP_TYPE.PRIVATE;
        var password = "";
        var group = new _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_24__["CometChat"].Group(GUID, groupName, groupType, password);
        _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_24__["CometChat"].createGroup(group).then(group => {
            let membersList = [
                new _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_24__["CometChat"].GroupMember("" + design.createdby.id, _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_24__["CometChat"].GROUP_MEMBER_SCOPE.ADMIN),
                new _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_24__["CometChat"].GroupMember("" + this.userData.id, _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_24__["CometChat"].GROUP_MEMBER_SCOPE.ADMIN)
            ];
            _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_24__["CometChat"].addMembersToGroup(group.getGuid(), membersList, []).then(response => {
                if (design.requesttype == "prelim") {
                    let postdata = {
                        chatid: GUID
                    };
                    this.apiService.updateDesignForm(postdata, this.acceptid).subscribe(res => { });
                    // this.updateItemInList(LISTTYPE.NEW, design);
                }
                else {
                    // this.updateItemInPermitList(LISTTYPE.NEW, design);
                }
            }, error => {
            });
        }, error => {
        });
    }
    directAssignToWattmonk(id, event) {
        event.stopPropagation();
        this.designId = id;
        var postData = {};
        var designacceptancestarttime = new Date();
        designacceptancestarttime.setMinutes(designacceptancestarttime.getMinutes() + 15);
        postData = {
            outsourcedto: 232,
            isoutsourced: "true",
            status: "outsourced",
            designacceptancestarttime: designacceptancestarttime
        };
        this.utils.showLoading('Assigning').then(() => {
            this.apiService.updateDesignForm(postData, this.designId).subscribe((value) => {
                this.utils.hideLoading().then(() => {
                    ;
                    console.log('reach ', value);
                    //   if(this.userData.role.type==='clientsuperadmin' && this.designerData.status==='created')
                    //  {
                    //   this.utils.showSnackBar('Design request has been assigned to wattmonk successfully');
                    //  }else{
                    this.utils.showSnackBar('Design request has been reassigned to wattmonk successfully');
                    //this.dismissBottomSheet();
                    //this.showBottomDraw = false;
                    this.utils.setHomepageDesignRefresh(true);
                });
            }, (error) => {
                this.utils.hideLoading();
                // this.dismissBottomSheet();
                // this.showBottomDraw = false;
            });
        });
    }
};
OnholdPage.ctorParameters = () => [
    { type: src_app_utilities_service__WEBPACK_IMPORTED_MODULE_5__["UtilitiesService"] },
    { type: src_app_api_service__WEBPACK_IMPORTED_MODULE_4__["ApiService"] },
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_6__["DatePipe"] },
    { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_11__["Storage"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ChangeDetectorRef"] },
    { type: _ionic_native_launch_navigator_ngx__WEBPACK_IMPORTED_MODULE_7__["LaunchNavigator"] },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_9__["FormBuilder"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_10__["ActivatedRoute"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_10__["Router"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_12__["ModalController"] },
    { type: src_app_storage_service__WEBPACK_IMPORTED_MODULE_15__["StorageService"] },
    { type: src_app_networkdetect_service__WEBPACK_IMPORTED_MODULE_16__["NetworkdetectService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_12__["AlertController"] },
    { type: _ionic_native_social_sharing_ngx__WEBPACK_IMPORTED_MODULE_17__["SocialSharing"] },
    { type: _ionic_native_file_ngx__WEBPACK_IMPORTED_MODULE_22__["File"] },
    { type: _ionic_native_local_notifications_ngx__WEBPACK_IMPORTED_MODULE_23__["LocalNotifications"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_12__["Platform"] },
    { type: _ionic_native_android_permissions_ngx__WEBPACK_IMPORTED_MODULE_25__["AndroidPermissions"] },
    { type: _ionic_native_file_transfer_ngx__WEBPACK_IMPORTED_MODULE_21__["FileTransfer"] }
];
OnholdPage.propDecorators = {
    infinitescroll: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"], args: [_ionic_angular__WEBPACK_IMPORTED_MODULE_12__["IonInfiniteScroll"], { static: false },] }]
};
OnholdPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-onhold',
        template: _raw_loader_onhold_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_onhold_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], OnholdPage);

class DesginDataHelper {
    constructor() {
        this.listOfDesigns = [];
    }
}


/***/ }),

/***/ "h+qT":
/*!******************************************************************************!*\
  !*** ./node_modules/@ionic-native/native-geocoder/__ivy_ngcc__/ngx/index.js ***!
  \******************************************************************************/
/*! exports provided: NativeGeocoder */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NativeGeocoder", function() { return NativeGeocoder; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ionic_native_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic-native/core */ "C6fG");




var NativeGeocoder = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(NativeGeocoder, _super);
    function NativeGeocoder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NativeGeocoder.prototype.reverseGeocode = function (latitude, longitude, options) { return Object(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["cordova"])(this, "reverseGeocode", { "callbackOrder": "reverse" }, arguments); };
    NativeGeocoder.prototype.forwardGeocode = function (addressString, options) { return Object(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["cordova"])(this, "forwardGeocode", { "callbackOrder": "reverse" }, arguments); };
    NativeGeocoder.pluginName = "NativeGeocoder";
    NativeGeocoder.plugin = "cordova-plugin-nativegeocoder";
    NativeGeocoder.pluginRef = "nativegeocoder";
    NativeGeocoder.repo = "https://github.com/sebastianbaar/cordova-plugin-nativegeocoder";
    NativeGeocoder.platforms = ["iOS", "Android"];
NativeGeocoder.ɵfac = function NativeGeocoder_Factory(t) { return ɵNativeGeocoder_BaseFactory(t || NativeGeocoder); };
NativeGeocoder.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: NativeGeocoder, factory: function (t) { return NativeGeocoder.ɵfac(t); } });
var ɵNativeGeocoder_BaseFactory = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetInheritedFactory"](NativeGeocoder);
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](NativeGeocoder, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"]
    }], null, null); })();
    return NativeGeocoder;
}(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["IonicNativePlugin"]));


//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9AaW9uaWMtbmF0aXZlL3BsdWdpbnMvbmF0aXZlLWdlb2NvZGVyL25neC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLDhCQUFzQyxNQUFNLG9CQUFvQixDQUFDOztBQUN4RTtBQUlVLElBbUMwQixrQ0FBaUI7QUFBQztBQUU5QjtBQUNKO0FBQU0sSUFReEIsdUNBQWMsYUFDWixRQUFnQixFQUNoQixTQUFpQixFQUNqQixPQUErQjtBQU1SLElBUXpCLHVDQUFjLGFBQUMsYUFBcUIsRUFBRSxPQUErQjtBQU16QztBQUV6QjtBQUE2RDtBQUN4QjtBQUlsQztrREExQ1AsVUFBVTs7Ozs7MEJBQ0w7QUFBQyx5QkF6Q1A7QUFBRSxFQXlDa0MsaUJBQWlCO0FBQ3BELFNBRFksY0FBYztBQUFJIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29yZG92YSwgSW9uaWNOYXRpdmVQbHVnaW4sIFBsdWdpbiB9IGZyb20gJ0Bpb25pYy1uYXRpdmUvY29yZSc7XG5cbi8qKlxuICogQG5hbWUgTmF0aXZlIEdlb2NvZGVyXG4gKiBAZGVzY3JpcHRpb25cbiAqIENvcmRvdmEgcGx1Z2luIGZvciBuYXRpdmUgZm9yd2FyZCBhbmQgcmV2ZXJzZSBnZW9jb2RpbmdcbiAqXG4gKiBAdXNhZ2VcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGltcG9ydCB7IE5hdGl2ZUdlb2NvZGVyLCBOYXRpdmVHZW9jb2RlclJlc3VsdCwgTmF0aXZlR2VvY29kZXJPcHRpb25zIH0gZnJvbSAnQGlvbmljLW5hdGl2ZS9uYXRpdmUtZ2VvY29kZXIvbmd4JztcbiAqXG4gKiBjb25zdHJ1Y3Rvcihwcml2YXRlIG5hdGl2ZUdlb2NvZGVyOiBOYXRpdmVHZW9jb2RlcikgeyB9XG4gKlxuICogLi4uXG4gKlxuICogbGV0IG9wdGlvbnM6IE5hdGl2ZUdlb2NvZGVyT3B0aW9ucyA9IHtcbiAqICAgICB1c2VMb2NhbGU6IHRydWUsXG4gKiAgICAgbWF4UmVzdWx0czogNVxuICogfTtcbiAqXG4gKiB0aGlzLm5hdGl2ZUdlb2NvZGVyLnJldmVyc2VHZW9jb2RlKDUyLjUwNzIwOTUsIDEzLjE0NTI4MTgsIG9wdGlvbnMpXG4gKiAgIC50aGVuKChyZXN1bHQ6IE5hdGl2ZUdlb2NvZGVyUmVzdWx0W10pID0+IGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHJlc3VsdFswXSkpKVxuICogICAuY2F0Y2goKGVycm9yOiBhbnkpID0+IGNvbnNvbGUubG9nKGVycm9yKSk7XG4gKlxuICogdGhpcy5uYXRpdmVHZW9jb2Rlci5mb3J3YXJkR2VvY29kZSgnQmVybGluJywgb3B0aW9ucylcbiAqICAgLnRoZW4oKHJlc3VsdDogTmF0aXZlR2VvY29kZXJSZXN1bHRbXSkgPT4gY29uc29sZS5sb2coJ1RoZSBjb29yZGluYXRlcyBhcmUgbGF0aXR1ZGU9JyArIHJlc3VsdFswXS5sYXRpdHVkZSArICcgYW5kIGxvbmdpdHVkZT0nICsgcmVzdWx0WzBdLmxvbmdpdHVkZSkpXG4gKiAgIC5jYXRjaCgoZXJyb3I6IGFueSkgPT4gY29uc29sZS5sb2coZXJyb3IpKTtcbiAqIGBgYFxuICogQGludGVyZmFjZXNcbiAqIE5hdGl2ZUdlb2NvZGVyUmVzdWx0XG4gKiBOYXRpdmVHZW9jb2Rlck9wdGlvbnNcbiAqL1xuQFBsdWdpbih7XG4gIHBsdWdpbk5hbWU6ICdOYXRpdmVHZW9jb2RlcicsXG4gIHBsdWdpbjogJ2NvcmRvdmEtcGx1Z2luLW5hdGl2ZWdlb2NvZGVyJyxcbiAgcGx1Z2luUmVmOiAnbmF0aXZlZ2VvY29kZXInLFxuICByZXBvOiAnaHR0cHM6Ly9naXRodWIuY29tL3NlYmFzdGlhbmJhYXIvY29yZG92YS1wbHVnaW4tbmF0aXZlZ2VvY29kZXInLFxuICBwbGF0Zm9ybXM6IFsnaU9TJywgJ0FuZHJvaWQnXSxcbn0pXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTmF0aXZlR2VvY29kZXIgZXh0ZW5kcyBJb25pY05hdGl2ZVBsdWdpbiB7XG4gIC8qKlxuICAgKiBSZXZlcnNlIGdlb2NvZGUgYSBnaXZlbiBsYXRpdHVkZSBhbmQgbG9uZ2l0dWRlIHRvIGZpbmQgbG9jYXRpb24gYWRkcmVzc1xuICAgKiBAcGFyYW0gbGF0aXR1ZGUge251bWJlcn0gVGhlIGxhdGl0dWRlXG4gICAqIEBwYXJhbSBsb25naXR1ZGUge251bWJlcn0gVGhlIGxvbmdpdHVkZVxuICAgKiBAcGFyYW0gb3B0aW9ucyB7TmF0aXZlR2VvY29kZXJPcHRpb25zfSBUaGUgb3B0aW9uc1xuICAgKiBAcmV0dXJuIHtQcm9taXNlPE5hdGl2ZUdlb2NvZGVyUmVzdWx0W10+fVxuICAgKi9cbiAgQENvcmRvdmEoe1xuICAgIGNhbGxiYWNrT3JkZXI6ICdyZXZlcnNlJyxcbiAgfSlcbiAgcmV2ZXJzZUdlb2NvZGUoXG4gICAgbGF0aXR1ZGU6IG51bWJlcixcbiAgICBsb25naXR1ZGU6IG51bWJlcixcbiAgICBvcHRpb25zPzogTmF0aXZlR2VvY29kZXJPcHRpb25zXG4gICk6IFByb21pc2U8TmF0aXZlR2VvY29kZXJSZXN1bHRbXT4ge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8qKlxuICAgKiBGb3J3YXJkIGdlb2NvZGUgYSBnaXZlbiBhZGRyZXNzIHRvIGZpbmQgY29vcmRpbmF0ZXNcbiAgICogQHBhcmFtIGFkZHJlc3NTdHJpbmcge3N0cmluZ30gVGhlIGFkZHJlc3MgdG8gYmUgZ2VvY29kZWRcbiAgICogQHBhcmFtIG9wdGlvbnMge05hdGl2ZUdlb2NvZGVyT3B0aW9uc30gVGhlIG9wdGlvbnNcbiAgICogQHJldHVybiB7UHJvbWlzZTxOYXRpdmVHZW9jb2RlclJlc3VsdFtdPn1cbiAgICovXG4gIEBDb3Jkb3ZhKHtcbiAgICBjYWxsYmFja09yZGVyOiAncmV2ZXJzZScsXG4gIH0pXG4gIGZvcndhcmRHZW9jb2RlKGFkZHJlc3NTdHJpbmc6IHN0cmluZywgb3B0aW9ucz86IE5hdGl2ZUdlb2NvZGVyT3B0aW9ucyk6IFByb21pc2U8TmF0aXZlR2VvY29kZXJSZXN1bHRbXT4ge1xuICAgIHJldHVybjtcbiAgfVxufVxuXG4vKipcbiAqIEVuY2Fwc3VsYXRlcyBmb3JtYXQgaW5mb3JtYXRpb24gYWJvdXQgYSBnZW9jb2RpbmcgcmVzdWx0LlxuICogbW9yZSBJbmZvOlxuICogIC0gaHR0cHM6Ly9kZXZlbG9wZXIuYXBwbGUuY29tL2RvY3VtZW50YXRpb24vY29yZWxvY2F0aW9uL2NscGxhY2VtYXJrXG4gKiAgLSBodHRwczovL2RldmVsb3Blci5hbmRyb2lkLmNvbS9yZWZlcmVuY2UvYW5kcm9pZC9sb2NhdGlvbi9BZGRyZXNzLmh0bWxcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBOYXRpdmVHZW9jb2RlclJlc3VsdCB7XG4gIC8qKlxuICAgKiBUaGUgbGF0aXR1ZGUuXG4gICAqL1xuICBsYXRpdHVkZTogc3RyaW5nO1xuICAvKipcbiAgICogVGhlIGxvbmdpdHVkZS5cbiAgICovXG4gIGxvbmdpdHVkZTogc3RyaW5nO1xuICAvKipcbiAgICogVGhlIGNvdW50cnkgY29kZS5cbiAgICovXG4gIGNvdW50cnlDb2RlOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBUaGUgY291bnRyeSBuYW1lLlxuICAgKi9cbiAgY291bnRyeU5hbWU6IHN0cmluZztcbiAgLyoqXG4gICAqIFRoZSBwb3N0YWwgY29kZS5cbiAgICovXG4gIHBvc3RhbENvZGU6IHN0cmluZztcbiAgLyoqXG4gICAqIFRoZSBhZG1pbmlzdHJhdGl2ZUFyZWEuXG4gICAqL1xuICBhZG1pbmlzdHJhdGl2ZUFyZWE6IHN0cmluZztcbiAgLyoqXG4gICAqIFRoZSBzdWJBZG1pbmlzdHJhdGl2ZUFyZWEuXG4gICAqL1xuICBzdWJBZG1pbmlzdHJhdGl2ZUFyZWE6IHN0cmluZztcbiAgLyoqXG4gICAqIFRoZSBsb2NhbGl0eS5cbiAgICovXG4gIGxvY2FsaXR5OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBUaGUgc3ViTG9jYWxpdHkuXG4gICAqL1xuICBzdWJMb2NhbGl0eTogc3RyaW5nO1xuICAvKipcbiAgICogVGhlIHRob3JvdWdoZmFyZS5cbiAgICovXG4gIHRob3JvdWdoZmFyZTogc3RyaW5nO1xuICAvKipcbiAgICogVGhlIHN1YlRob3JvdWdoZmFyZS5cbiAgICovXG4gIHN1YlRob3JvdWdoZmFyZTogc3RyaW5nO1xuICAvKipcbiAgICogVGhlIGFyZWFzT2ZJbnRlcmVzdFxuICAgKi9cbiAgYXJlYXNPZkludGVyZXN0OiBzdHJpbmdbXTtcbn1cblxuLyoqXG4gKiBPcHRpb25zIGZvciByZXZlcnNlIGFuZCBmb3J3YXJkIGdlb2NvZGluZy5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBOYXRpdmVHZW9jb2Rlck9wdGlvbnMge1xuICAvKipcbiAgICogVGhlIGxvY2FsZSB0byB1c2Ugd2hlbiByZXR1cm5pbmcgdGhlIGFkZHJlc3MgaW5mb3JtYXRpb24uXG4gICAqIElmIHNldCB0byAnZmFsc2UnIHRoZSBsb2NhbGUgd2lsbCBhbHdheXMgYmUgJ2VuX1VTJy5cbiAgICogRGVmYXVsdCBpcyAndHJ1ZSdcbiAgICovXG4gIHVzZUxvY2FsZTogYm9vbGVhbjtcbiAgLyoqXG4gICAqIFRoZSBkZWZhdWx0IGxvY2FsZSB0byB1c2Ugd2hlbiByZXR1cm5pbmcgdGhlIGFkZHJlc3MgaW5mb3JtYXRpb24uXG4gICAqIGUuZy46ICdmYS1JUicgb3IgJ2RlX0RFJy5cbiAgICovXG4gIGRlZmF1bHRMb2NhbGU/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBUaGUgbWF4aW11bSBudW1iZXIgb2YgcmVzdWx0IHRvIHJldHVybiAobWF4IGlzIDUpLlxuICAgKiBEZWZhdWx0IGlzIDFcbiAgICovXG4gIG1heFJlc3VsdHM6IG51bWJlcjtcbn1cbiJdfQ==

/***/ })

}]);
//# sourceMappingURL=onhold-onhold-module.js.map