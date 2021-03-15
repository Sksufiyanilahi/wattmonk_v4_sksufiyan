(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["teammodule-teammodule-module"],{

/***/ "3Khb":
/*!*************************************************!*\
  !*** ./src/app/teammodule/teammodule.module.ts ***!
  \*************************************************/
/*! exports provided: TeammodulePageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TeammodulePageModule", function() { return TeammodulePageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _teammodule_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./teammodule-routing.module */ "90Pv");
/* harmony import */ var _teammodule_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./teammodule.page */ "hT6m");







let TeammodulePageModule = class TeammodulePageModule {
};
TeammodulePageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _teammodule_routing_module__WEBPACK_IMPORTED_MODULE_5__["TeammodulePageRoutingModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"]
        ],
        declarations: [_teammodule_page__WEBPACK_IMPORTED_MODULE_6__["TeammodulePage"]]
    })
], TeammodulePageModule);



/***/ }),

/***/ "90Pv":
/*!*********************************************************!*\
  !*** ./src/app/teammodule/teammodule-routing.module.ts ***!
  \*********************************************************/
/*! exports provided: TeammodulePageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TeammodulePageRoutingModule", function() { return TeammodulePageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _teammodule_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./teammodule.page */ "hT6m");




const routes = [
    {
        path: '',
        component: _teammodule_page__WEBPACK_IMPORTED_MODULE_3__["TeammodulePage"]
    }
];
let TeammodulePageRoutingModule = class TeammodulePageRoutingModule {
};
TeammodulePageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], TeammodulePageRoutingModule);



/***/ }),

/***/ "Byvr":
/*!***************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/teammodule/teammodule.page.html ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\r\n  <ion-toolbar>\r\n    <ion-buttons slot=\"start\">\r\n      <ion-menu-button></ion-menu-button>\r\n    </ion-buttons>\r\n    <ion-col >\r\n      <h1 class=\"ion-no-padding ion-no-margin home\">\r\n          Team</h1>\r\n  </ion-col>\r\n  </ion-toolbar>\r\n\r\n\r\n<ion-content style=\"padding-bottom: 250px;position: sticky;\">\r\n  <ion-refresher slot=\"fixed\">\r\n    <ion-refresher-content></ion-refresher-content>\r\n  </ion-refresher>\r\n<ion-grid >\r\n    <!-- <ion-row *ngFor=\"let item of listOfDesignsHelper;let i = index\"> -->\r\n      <!-- <ion-virtual-scroll [items]=\"listOfDesignsHelper\"> -->\r\n          <ion-row >\r\n              <!-- <ion-row *virtualItem=\"let item;let i = index\"> -->\r\n        <!-- <ion-col size=\"12\" class=\"ion-margin-top\">\r\n                <span class=\"ion-padding\" *ngIf=\"today === item.date\">\r\n                    Today\r\n                    </span>\r\n            <span class=\"ion-padding\" *ngIf=\"today !== item.date\">\r\n                        {{item.date | date: 'dd MMM yyyy'}}\r\n                </span>\r\n        </ion-col> -->\r\n        <ion-col *ngFor=\"let designData of teamData;let i = index;\" size=\"12\">\r\n            <ion-card class=\"ion-no-padding custom-card ion-no-margin\" style=\"height: 100%;\">\r\n                <p class=\"customer-name\"\r\n                routerDirection=\"forward\">{{designData.firstname}} {{designData.lastname}}\r\n                <!-- <span class=\"chipdetail\" style=\"background-color: #1289A7;\" [routerLink]=\"['/permit-design-details/',designData.id]\" routerDirection=\"forward\">\r\n                  {{designData.deliverydate | date: 'hh:mm a'}}\r\n              </span> -->\r\n\r\n      </p>\r\n\r\n      <p style=\"margin:0px\">\r\n          <span class=\"customer-email\" [routerLink]=\"['/pestamp-design-details/',designData.id]\"\r\n                  routerDirection=\"forward\">{{designData.role.name}}</span>\r\n                  <!-- <ion-col *ngIf=\"segments=='requesttype=permit&status=reviewassigned&status=reviewfailed&status=reviewpassed' && userData.role.type != 'clientsuperadmin' && userData.role.type !== 'clientadmin'\"  style=\"font-size: 0.8em;\"> -->\r\n                <!-- </ion-col> -->\r\n\r\n      </p>\r\n      <p style=\"margin:0px\">\r\n        <span class=\"customer-email\" [routerLink]=\"['/pestamp-design-details/',designData.id]\"\r\n                routerDirection=\"forward\">{{designData.email}}</span>\r\n                <!-- <ion-col *ngIf=\"segments=='requesttype=permit&status=reviewassigned&status=reviewfailed&status=reviewpassed' && userData.role.type != 'clientsuperadmin' && userData.role.type !== 'clientadmin'\"  style=\"font-size: 0.8em;\"> -->\r\n              <!-- </ion-col> -->\r\n\r\n    </p>\r\n    <p style=\"margin:0px\">\r\n      <span class=\"customer-phone\" [routerLink]=\"['/pestamp-design-details/',designData.id]\"\r\n              routerDirection=\"forward\">{{designData.phone}}</span>\r\n              <!-- <ion-col *ngIf=\"segments=='requesttype=permit&status=reviewassigned&status=reviewfailed&status=reviewpassed' && userData.role.type != 'clientsuperadmin' && userData.role.type !== 'clientadmin'\"  style=\"font-size: 0.8em;\"> -->\r\n            <!-- </ion-col> -->\r\n\r\n  </p>\r\n      <!-- <p style=\"margin:0px\"  >\r\n                <a href=\"tel:{{designData.contactnumber}}\" style=\"text-decoration: none;\" class=\"z-100\">\r\n                    <span class=\"customer-phone\" *ngIf=\"designData.contactnumber != null && designData.contactnumber != ''\">{{designData.contactnumber}}</span></a>\r\n                    <span class=\"recordupdatedon\">Updated {{designData.recordupdatedon}}</span>\r\n                  </p>\r\n                <span class=\"customer-address z-100\" *ngIf=\"designData.deliveryaddress != null && designData.deliveryaddress != ''\"\r\n                        (click)=\"openAddressOnMap(designData.address)\">{{(designData.deliveryaddress | slice:0:60) + (designData.deliveryaddress.length > 60 ? '...' : '')}}\r\n\r\n                             <ion-col>\r\n\r\n                                </ion-col>\r\n\r\n                    </span> -->\r\n                    <!-- <ion-row style=\"margin-bottom: 0px;\" [routerLink]=\"['/pestamp-design-details/',designData.id]\">\r\n                        <ion-col *ngIf=\"designData.status == 'assigned'&& userData.role.type!='clientsuperadmin' && userData.role.type!='clientadmin'\">\r\n                            <span *ngIf=\"designData.status == 'assigned'\" style=\"float:right;text-align: right;\">\r\n                                {{designData.designremainingtime}}</span></ion-col>\r\n                                <ion-col *ngIf=\"designData.status == 'outsourced'\">\r\n                                    <span *ngIf=\"designData.status == 'outsourced'\" style=\"float:right;text-align: right;\">\r\n                                        {{designData.pestampacceptanceremainingtime}}</span></ion-col>\r\n                    </ion-row> -->\r\n\r\n\r\n\r\n                <!-- <ion-progress-bar [value]=\"1\" mode=\"ios\" color=\"success\" class=\"progress-bar-height\"></ion-progress-bar> -->\r\n                  <!-- <span class=\"ion-text-end timestamp\" [routerLink]=\"['/permit-design-details/',designData.id]\" routerDirection=\"forward\">\r\n                        {{designData.deliverydate | date: 'hh:mm a'}}\r\n\r\n            </span> -->\r\n        </ion-card>\r\n        </ion-col>\r\n    </ion-row>\r\n    <!-- </ion-virtual-scroll> -->\r\n</ion-grid>\r\n<!-- <ng-template #nodesignFound>\r\n    <div *ngIf=\"teamData.length === 0 \" class=\"h-100 d-flex flex-column align-center justify-center\"> -->\r\n            <!-- <div *ngIf=\"!netSwitch\"> -->\r\n\r\n              <!-- {{noDesignFound}} -->\r\n            <!-- </div> -->\r\n\r\n        <!-- <ion-img src=\"/assets/images/blank.png\" class=\"placeholder\"></ion-img>\r\n    </div>\r\n</ng-template> -->\r\n\r\n\r\n\r\n</ion-content>\r\n\r\n<ion-footer class=\"ion-no-border white-bg\" *ngIf=\"showFooter\">\r\n  <div class=\"position-relative\">\r\n      <ion-fab horizontal=\"start\" class=\"fab-position position-absolute\">\r\n          <ion-fab-button (click)=\"teamScheduledPage()\" [disabled]='!netSwitch' routerDirection=\"forward\" mode=\"md\" class=\"ht_wt\">\r\n              <ion-icon name=\"add\"></ion-icon>\r\n          </ion-fab-button>\r\n      </ion-fab>\r\n      <!-- <ion-grid class=\"bottom-bar ion-no-margin ion-no-padding\">\r\n          <ion-row>\r\n              <ion-col size=\"4\">\r\n                  <div class=\"tab\">\r\n                      <ion-img src=\"/assets/images/home-outline.svg\" class=\"tab-icon\"></ion-img>\r\n                      <span class=\"tabText\">Home</span>\r\n                  </div>\r\n              </ion-col>\r\n              <ion-col size=\"4\" [routerLink]=\"['/groups']\">\r\n                  <div class=\"tab\">\r\n                      <ion-img src=\"/assets/images/message-outline.svg\" class=\"tab-icon\"></ion-img>\r\n                      <span class=\"tabText\">Messages</span>\r\n                  </div>\r\n              </ion-col>\r\n              <ion-col size=\"4\" [routerLink]=\"['/profile']\" routerDirection=\"forward\">\r\n                  <div class=\"tab\">\r\n                      <ion-img src=\"/assets/images/account-outline.svg\" class=\"tab-icon\"></ion-img>\r\n                      <span class=\"tabText\">Profile</span>\r\n                  </div>\r\n              </ion-col>\r\n          </ion-row>\r\n      </ion-grid> -->\r\n  </div>\r\n\r\n</ion-footer>\r\n");

/***/ }),

/***/ "a+ua":
/*!*************************************************!*\
  !*** ./src/app/teammodule/teammodule.page.scss ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".custom-card {\n  display: flex !important;\n  flex-direction: column !important;\n  background: white !important;\n  border-radius: 4px !important;\n  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.3) !important;\n  padding: 8px 12px;\n}\n\n.customer-name {\n  font-size: 1em;\n  color: #434343;\n  font-weight: bold;\n  display: table;\n  margin: 0px;\n}\n\n.customer-email {\n  font-size: 0.8em;\n  color: #B4B4B4;\n}\n\n.customer-phone {\n  font-size: 0.8em;\n  color: #4272B9;\n}\n\n.customer-address {\n  margin-top: 4px;\n  margin-bottom: 6px;\n  font-size: 0.8em;\n  color: #4272B9;\n}\n\n.timestamp {\n  font-size: 0.7em;\n}\n\n.chipdetail {\n  display: inline;\n  vertical-align: middle;\n  background-color: #95afc0;\n  font-size: 0.6em;\n  padding: 4px 10px;\n  border-radius: 10px;\n  text-align: center;\n  color: #fff;\n}\n\n.cssclass {\n  --max-height:100% !important;\n}\n\nion-bottom-drawer {\n  --padding: 0 !important;\n  padding: 0 !important;\n  --background: #F3F3F3 !important;\n  background: #F3F3F3 !important;\n}\n\nion-bottom-drawer ion-content {\n  --background: #F3F3F3 !important;\n}\n\n.segment-btn {\n  font-size: 10px !important;\n}\n\n.latebystyle {\n  float: right;\n  font-size: 10px;\n  color: #3C78DB;\n}\n\n.recordupdatedon {\n  float: right;\n  font-size: 10px;\n  font-style: italic;\n}\n\n.imagebutton {\n  float: right;\n  margin-top: 0px;\n}\n\n.alertClass {\n  background-color: wheat;\n}\n\n.chatbutton {\n  float: right;\n  margin-top: 0px;\n  margin-right: 5px;\n}\n\n.tab {\n  padding-top: 1em;\n  padding-bottom: 1em;\n  padding-bottom: 1em;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.bottom-bar {\n  margin: 8px;\n  border-radius: 50px;\n  box-shadow: 0 -2px 8px 0 rgba(0, 0, 0, 0.1);\n  border: 2px solid white;\n  background: #FFFAEB;\n}\n\n.tabText {\n  margin-left: 8px;\n  font-size: 1em;\n}\n\n.tab-icon {\n  width: 24px;\n  height: 24px;\n}\n\n.fab-position {\n  bottom: 18px;\n}\n\n.ht_wt {\n  height: 62px;\n  width: 62px;\n}\n\nion-fab-button {\n  --border-width: 2px;\n  --border-style: solid;\n  --box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.3);\n  --border-color: white;\n  --background: #3c78d8;\n}\n\nion-tab-bar {\n  --border: none;\n}\n\nion-tab-button {\n  font-size: 1em;\n  --color: #9E9E9E;\n  --color-selected: #3c78d8;\n}\n\nion-tab-button[aria-selected=true] {\n  border-bottom: 3px solid #3c78d8;\n  border-bottom-left-radius: 2px;\n  border-bottom-right-radius: 2px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXHRlYW1tb2R1bGUucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksd0JBQUE7RUFDQSxpQ0FBQTtFQUNBLDRCQUFBO0VBQ0EsNkJBQUE7RUFDQSxxREFBQTtFQUNBLGlCQUFBO0FBQ0o7O0FBRUU7RUFDRSxjQUFBO0VBQ0EsY0FBQTtFQUNBLGlCQUFBO0VBQ0EsY0FBQTtFQUNBLFdBQUE7QUFDSjs7QUFFRTtFQUNFLGdCQUFBO0VBQ0EsY0FBQTtBQUNKOztBQUVFO0VBQ0UsZ0JBQUE7RUFDQSxjQUFBO0FBQ0o7O0FBRUU7RUFDRSxlQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLGNBQUE7QUFDSjs7QUFNRTtFQUNFLGdCQUFBO0FBSEo7O0FBT0U7RUFDRSxlQUFBO0VBQ0Esc0JBQUE7RUFDQSx5QkFBQTtFQUNBLGdCQUFBO0VBQ0EsaUJBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0VBQ0EsV0FBQTtBQUpKOztBQU1FO0VBQ0UsNEJBQUE7QUFISjs7QUFrQkU7RUFFRSx1QkFBQTtFQUNBLHFCQUFBO0VBRUEsZ0NBQUE7RUFDQSw4QkFBQTtBQWpCSjs7QUFtQkk7RUFDRSxnQ0FBQTtBQWpCTjs7QUFzQk07RUFDRSwwQkFBQTtBQW5CUjs7QUFzQk07RUFDRSxZQUFBO0VBQ0EsZUFBQTtFQUNBLGNBQUE7QUFuQlI7O0FBc0JNO0VBQ0UsWUFBQTtFQUNBLGVBQUE7RUFDQSxrQkFBQTtBQW5CUjs7QUFzQkU7RUFDRSxZQUFBO0VBQ0EsZUFBQTtBQW5CSjs7QUFzQkU7RUFDRSx1QkFBQTtBQW5CSjs7QUFxQkU7RUFDRSxZQUFBO0VBQ0EsZUFBQTtFQUNBLGlCQUFBO0FBbEJKOztBQW9CRTtFQUNFLGdCQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0FBakJKOztBQW9CQTtFQUNJLFdBQUE7RUFDQSxtQkFBQTtFQUNBLDJDQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtBQWpCSjs7QUFvQkE7RUFDSSxnQkFBQTtFQUNBLGNBQUE7QUFqQko7O0FBb0JBO0VBQ0ksV0FBQTtFQUNBLFlBQUE7QUFqQko7O0FBb0JBO0VBQ0ksWUFBQTtBQWpCSjs7QUFvQkE7RUFDRSxZQUFBO0VBQ0EsV0FBQTtBQWpCRjs7QUFvQkE7RUFDSSxtQkFBQTtFQUNBLHFCQUFBO0VBQ0EsNENBQUE7RUFDQSxxQkFBQTtFQUNBLHFCQUFBO0FBakJKOztBQW9CQTtFQUNJLGNBQUE7QUFqQko7O0FBb0JBO0VBQ0ksY0FBQTtFQUNBLGdCQUFBO0VBQ0EseUJBQUE7QUFqQko7O0FBb0JBO0VBQ0ksZ0NBQUE7RUFDQSw4QkFBQTtFQUNBLCtCQUFBO0FBakJKIiwiZmlsZSI6InRlYW1tb2R1bGUucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmN1c3RvbS1jYXJkIHtcclxuICAgIGRpc3BsYXk6IGZsZXggIWltcG9ydGFudDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW4gIWltcG9ydGFudDtcclxuICAgIGJhY2tncm91bmQ6IHdoaXRlICFpbXBvcnRhbnQ7XHJcbiAgICBib3JkZXItcmFkaXVzOiA0cHggIWltcG9ydGFudDtcclxuICAgIGJveC1zaGFkb3c6IDAgMXB4IDJweCAwIHJnYmEoMCwgMCwgMCwgMC4zKSAhaW1wb3J0YW50O1xyXG4gICAgcGFkZGluZzogOHB4IDEycHg7XHJcbiAgfVxyXG4gIFxyXG4gIC5jdXN0b21lci1uYW1lIHtcclxuICAgIGZvbnQtc2l6ZTogMWVtO1xyXG4gICAgY29sb3I6ICM0MzQzNDM7XHJcbiAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgIGRpc3BsYXk6dGFibGU7XHJcbiAgICBtYXJnaW46IDBweDtcclxuICB9XHJcbiAgXHJcbiAgLmN1c3RvbWVyLWVtYWlsIHtcclxuICAgIGZvbnQtc2l6ZTogMC44ZW07XHJcbiAgICBjb2xvcjogI0I0QjRCNDtcclxuICB9XHJcbiAgXHJcbiAgLmN1c3RvbWVyLXBob25lIHtcclxuICAgIGZvbnQtc2l6ZTogMC44ZW07XHJcbiAgICBjb2xvcjogIzQyNzJCOTtcclxuICB9XHJcbiAgXHJcbiAgLmN1c3RvbWVyLWFkZHJlc3Mge1xyXG4gICAgbWFyZ2luLXRvcDogNHB4O1xyXG4gICAgbWFyZ2luLWJvdHRvbTogNnB4O1xyXG4gICAgZm9udC1zaXplOiAwLjhlbTtcclxuICAgIGNvbG9yOiAjNDI3MkI5O1xyXG4gIH1cclxuICBcclxuICAucGxhY2Vob2xkZXIge1xyXG4gICAgLy8gd2lkdGg6IDUwdncgIWltcG9ydGFudDtcclxuICB9XHJcbiAgXHJcbiAgLnRpbWVzdGFtcCB7XHJcbiAgICBmb250LXNpemU6IDAuN2VtO1xyXG4gICBcclxuICB9XHJcbiAgXHJcbiAgLmNoaXBkZXRhaWx7XHJcbiAgICBkaXNwbGF5OiBpbmxpbmU7XHJcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzk1YWZjMDtcclxuICAgIGZvbnQtc2l6ZTogMC42ZW07XHJcbiAgICBwYWRkaW5nOiA0cHggMTBweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBjb2xvcjogI2ZmZjtcclxuICB9XHJcbiAgLmNzc2NsYXNze1xyXG4gICAgLS1tYXgtaGVpZ2h0IDoxMDAlICFpbXBvcnRhbnQ7XHJcbiAgICAvLyBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAvLyBkaXNwbGF5OiBibG9jaztcclxuICB9XHJcbiAgXHJcbiAgXHJcbiAgLy8uZHJhd2VyIHtcclxuICAvLyAgYmFja2dyb3VuZDogI0YzRjNGMztcclxuICAvLyAgLS1iYWNrZ3JvdW5kOiAjRjNGM0YzO1xyXG4gIC8vfVxyXG4gIC8vXHJcbiAgLy8uaW9uLWJvdHRvbS1kcmF3ZXItc2Nyb2xsYWJsZS1jb250ZW50IHtcclxuICAvLyAgYmFja2dyb3VuZDogI0YzRjNGMyAhaW1wb3J0YW50O1xyXG4gIC8vfVxyXG4gIFxyXG4gIGlvbi1ib3R0b20tZHJhd2VyIHtcclxuICBcclxuICAgIC0tcGFkZGluZzogMCAhaW1wb3J0YW50O1xyXG4gICAgcGFkZGluZzogMCAhaW1wb3J0YW50O1xyXG4gIFxyXG4gICAgLS1iYWNrZ3JvdW5kOiAjRjNGM0YzICFpbXBvcnRhbnQ7XHJcbiAgICBiYWNrZ3JvdW5kOiAjRjNGM0YzICFpbXBvcnRhbnQ7XHJcbiAgXHJcbiAgICBpb24tY29udGVudCB7XHJcbiAgICAgIC0tYmFja2dyb3VuZDogI0YzRjNGMyAhaW1wb3J0YW50O1xyXG4gICAgfVxyXG4gIFxyXG4gICAgXHJcbiAgfVxyXG4gICAgICAuc2VnbWVudC1idG57XHJcbiAgICAgICAgZm9udC1zaXplOiAxMHB4ICFpbXBvcnRhbnQ7XHJcbiAgICAgIH1cclxuICBcclxuICAgICAgLmxhdGVieXN0eWxle1xyXG4gICAgICAgIGZsb2F0OiByaWdodDsgXHJcbiAgICAgICAgZm9udC1zaXplOiAxMHB4O1xyXG4gICAgICAgIGNvbG9yOiAjM0M3OERCO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAucmVjb3JkdXBkYXRlZG9ue1xyXG4gICAgICAgIGZsb2F0OiByaWdodDtcclxuICAgICAgICBmb250LXNpemU6IDEwcHg7XHJcbiAgICAgICAgZm9udC1zdHlsZTogaXRhbGljO1xyXG4gICAgICB9XHJcbiAgXHJcbiAgLmltYWdlYnV0dG9ue1xyXG4gICAgZmxvYXQ6cmlnaHQ7XHJcbiAgICBtYXJnaW4tdG9wOiAwcHg7XHJcbiAgfVxyXG4gIFxyXG4gIC5hbGVydENsYXNze1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hlYXQ7XHJcbiAgfVxyXG4gIC5jaGF0YnV0dG9ue1xyXG4gICAgZmxvYXQ6cmlnaHQ7XHJcbiAgICBtYXJnaW4tdG9wOiAwcHg7XHJcbiAgICBtYXJnaW4tcmlnaHQ6NXB4O1xyXG4gIH1cclxuICAudGFiIHtcclxuICAgIHBhZGRpbmctdG9wOiAxZW07XHJcbiAgICBwYWRkaW5nLWJvdHRvbTogMWVtO1xyXG4gICAgcGFkZGluZy1ib3R0b206IDFlbTtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbn1cclxuXHJcbi5ib3R0b20tYmFyIHtcclxuICAgIG1hcmdpbjogOHB4O1xyXG4gICAgYm9yZGVyLXJhZGl1czogNTBweDtcclxuICAgIGJveC1zaGFkb3c6IDAgLTJweCA4cHggMCByZ2JhKDAsIDAsIDAsIDAuMSk7XHJcbiAgICBib3JkZXI6IDJweCBzb2xpZCB3aGl0ZTtcclxuICAgIGJhY2tncm91bmQ6ICNGRkZBRUI7XHJcbn1cclxuXHJcbi50YWJUZXh0IHtcclxuICAgIG1hcmdpbi1sZWZ0OiA4cHg7XHJcbiAgICBmb250LXNpemU6IDFlbTtcclxufVxyXG5cclxuLnRhYi1pY29uIHtcclxuICAgIHdpZHRoOiAyNHB4O1xyXG4gICAgaGVpZ2h0OiAyNHB4O1xyXG59XHJcblxyXG4uZmFiLXBvc2l0aW9uIHtcclxuICAgIGJvdHRvbTogMThweDtcclxufVxyXG5cclxuLmh0X3d0e1xyXG4gIGhlaWdodDo2MnB4O1xyXG4gIHdpZHRoOjYycHg7XHJcbn1cclxuXHJcbmlvbi1mYWItYnV0dG9uIHtcclxuICAgIC0tYm9yZGVyLXdpZHRoOiAycHg7XHJcbiAgICAtLWJvcmRlci1zdHlsZTogc29saWQ7XHJcbiAgICAtLWJveC1zaGFkb3c6IDAgMHB4IDhweCAwIHJnYmEoMCwgMCwgMCwgMC4zKTtcclxuICAgIC0tYm9yZGVyLWNvbG9yOiB3aGl0ZTtcclxuICAgIC0tYmFja2dyb3VuZDogIzNjNzhkODtcclxufVxyXG5cclxuaW9uLXRhYi1iYXIge1xyXG4gICAgLS1ib3JkZXI6IG5vbmU7XHJcbn1cclxuXHJcbmlvbi10YWItYnV0dG9uIHtcclxuICAgIGZvbnQtc2l6ZTogMWVtO1xyXG4gICAgLS1jb2xvcjogIzlFOUU5RTtcclxuICAgIC0tY29sb3Itc2VsZWN0ZWQ6ICMzYzc4ZDg7XHJcbn1cclxuXHJcbmlvbi10YWItYnV0dG9uW2FyaWEtc2VsZWN0ZWQ9dHJ1ZV0ge1xyXG4gICAgYm9yZGVyLWJvdHRvbTogM3B4IHNvbGlkICMzYzc4ZDg7XHJcbiAgICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiAycHg7XHJcbiAgICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogMnB4O1xyXG59XHJcbiJdfQ== */");

/***/ }),

/***/ "hT6m":
/*!***********************************************!*\
  !*** ./src/app/teammodule/teammodule.page.ts ***!
  \***********************************************/
/*! exports provided: TeammodulePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TeammodulePage", function() { return TeammodulePage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_teammodule_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./teammodule.page.html */ "Byvr");
/* harmony import */ var _teammodule_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./teammodule.page.scss */ "a+ua");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../api.service */ "yTNM");
/* harmony import */ var _contants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../contants */ "6qqZ");
/* harmony import */ var _networkdetect_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../networkdetect.service */ "UZ2B");
/* harmony import */ var _storage_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../storage.service */ "qkCY");
/* harmony import */ var _utilities_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utilities.service */ "oTnF");
/* harmony import */ var _ionic_native_in_app_browser_ngx__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic-native/in-app-browser/ngx */ "m/P+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/router */ "tyNb");












let TeammodulePage = class TeammodulePage {
    constructor(apiService, utils, storageservice, network, iab, platform, route) {
        this.apiService = apiService;
        this.utils = utils;
        this.storageservice = storageservice;
        this.network = network;
        this.iab = iab;
        this.platform = platform;
        this.route = route;
        this.version = _contants__WEBPACK_IMPORTED_MODULE_5__["version"];
        this.showSearchBar = false;
        this.showFooter = true;
    }
    ngOnInit() {
        this.subscription = this.utils.getBottomBarHomepage().subscribe((value) => {
            this.showFooter = value;
        });
        console.log("hello team");
        this.getTeamData();
    }
    getTeamData() {
        this.utils.showLoading("Getting Data").then(() => {
            this.apiService.getTeamData().subscribe((res) => {
                console.log(res);
                this.utils.hideLoading().then(() => {
                    if (res.length > 0) {
                        // res.forEach(element=>{
                        //   this.teamData.push(element);
                        //   console.log(this.teamData)
                        // })
                        this.teamData = res;
                        console.log(this.teamData);
                    }
                });
            });
        });
    }
    ionViewDidEnter() {
        // debugger;
        // if(this.version !== this.update_version && this.update_version !==''){
        //   setTimeout(()=>{
        //     this.utils.showAlertBox('Update App','New version of app is available on Play Store. Please update now to get latest features and bug fixes.',[{
        //       text:'Ok',
        //       handler:()=>{
        //         this.iab.create('https://play.google.com/store/apps/details?id=com.solar.wattmonk',"_system");
        //        this.ionViewDidEnter();
        //       }
        //     }]);
        //   },2000)
        // }
        this.deactivateNetworkSwitch = this.network.networkSwitch.subscribe(data => {
            this.netSwitch = data;
            console.log(this.netSwitch);
            let user = this.storageservice.getUser();
            this.apiService.emitUserNameAndRole(user);
        });
        this.network.networkDisconnect();
        this.network.networkConnect();
        this.subscription = this.platform.backButton.subscribe(() => {
            if (this.showSearchBar === true) {
                this.showSearchBar = false;
            }
            else {
                navigator.app.exitApp();
            }
        });
        // this.mixpanelService.setUserDetails(this.userData.email,this.userData.firstname+" "+this.userData.lastname,this.userData.id)
        // this.mixpanelService.track("PERMITDESIGN_PAGE_OPEN", {
        //   $id: this.userData.id,
        //   $email: this.userData.email,
        //   $name: this.userData.firstname + this.userData.lastname
        // });
    }
    teamScheduledPage() {
        // this.mixpanelService.track("ADD_PERMITDESIGN_PAGE_OPEN", {
        // });
        this.route.navigate(['/teamschedule']);
    }
};
TeammodulePage.ctorParameters = () => [
    { type: _api_service__WEBPACK_IMPORTED_MODULE_4__["ApiService"] },
    { type: _utilities_service__WEBPACK_IMPORTED_MODULE_8__["UtilitiesService"] },
    { type: _storage_service__WEBPACK_IMPORTED_MODULE_7__["StorageService"] },
    { type: _networkdetect_service__WEBPACK_IMPORTED_MODULE_6__["NetworkdetectService"] },
    { type: _ionic_native_in_app_browser_ngx__WEBPACK_IMPORTED_MODULE_9__["InAppBrowser"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_10__["Platform"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_11__["Router"] }
];
TeammodulePage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-teammodule',
        template: _raw_loader_teammodule_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_teammodule_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], TeammodulePage);



/***/ })

}]);
//# sourceMappingURL=teammodule-teammodule-module.js.map