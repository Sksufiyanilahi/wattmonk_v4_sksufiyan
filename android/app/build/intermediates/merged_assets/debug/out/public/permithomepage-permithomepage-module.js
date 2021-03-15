(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["permithomepage-permithomepage-module"],{

/***/ "+682":
/*!***********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/permithomepage/permithomepage.page.html ***!
  \***********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-content>\r\n  <!-- <ion-header class=\"ion-no-border white-bg\" style=\"position: relative;\">\r\n      <ion-toolbar> -->\r\n  <ion-grid>\r\n      <ion-row class=\"ion-align-items-center\">\r\n      <ion-toolbar>\r\n      <ion-buttons slot=\"start\">\r\n          <ion-menu-button></ion-menu-button>\r\n        </ion-buttons>\r\n      <ion-row class=\"ion-align-items-center\">\r\n          <ion-col >\r\n              <h1 class=\"ion-no-padding ion-no-margin home\">\r\n                  Permit</h1>\r\n          </ion-col>\r\n          <!-- <ion-col *ngIf=\"showSearchBar === true\" >\r\n              <ion-searchbar debounce=\"0\" placeholder=\"home\" class=\"custom\"></ion-searchbar>\r\n          </ion-col> -->\r\n          <ion-col size=\"auto\" >\r\n              <div class=\"notification-padding\" (click)=\"searchbar()\">\r\n                  <ion-img src=\"/assets/images/icons8-search.svg\" class=\"notification-icon\"></ion-img>\r\n              </div>\r\n          </ion-col>\r\n          <ion-col size=\"auto\"  *ngIf=\"showFooter\">\r\n            <div class=\"notification-padding\" (click)=\"scheduledPage()\">\r\n                <ion-icon name=\"add-circle\"></ion-icon>\r\n            </div>\r\n        </ion-col>\r\n          <ion-col size=\"auto\" style=\"position: relative;\">\r\n              <div class=\"notification-padding\" [routerLink]=\"['/notification']\" routerDirection=\"forward\" (click)=\"setzero()\">\r\n                  <ion-img src=\"/assets/images/notification.svg\" class=\"notification-icon\"></ion-img>\r\n                 <span class=\"badge\" *ngIf=\"unreadCount > 0\">\r\n                              {{unreadCount > 99 ? '99+' : unreadCount}}\r\n                          </span>\r\n              </div>\r\n          </ion-col>\r\n      </ion-row>\r\n  </ion-toolbar>\r\n  </ion-row>\r\n  </ion-grid>\r\n\r\n\r\n</ion-content>\r\n\r\n<ion-tabs style=\"margin-top: 52px\">\r\n    <ion-tab-bar class=\"ion-no-border\">\r\n        <ion-tab-button tab=\"permitdesign\">\r\n            <!-- <ion-label>Designs</ion-label> -->\r\n        </ion-tab-button>\r\n    </ion-tab-bar>\r\n</ion-tabs>\r\n<!-- <router-outlet></router-outlet> -->\r\n\r\n\r\n\r\n\r\n<ion-footer class=\"ion-no-border white-bg\" *ngIf=\"showFooter\">\r\n  <div class=\"position-relative\">\r\n      <!-- <ion-fab horizontal=\"start\" class=\"fab-position position-absolute\">\r\n          <ion-fab-button (click)=\"scheduledPage()\" [disabled]='!netSwitch' routerDirection=\"forward\" mode=\"md\" class=\"ht_wt\">\r\n              <ion-icon name=\"add\"></ion-icon>\r\n          </ion-fab-button>\r\n      </ion-fab> -->\r\n      <!-- <ion-grid class=\"bottom-bar ion-no-margin ion-no-padding\">\r\n          <ion-row>\r\n              <ion-col size=\"4\">\r\n                  <div class=\"tab\">\r\n                      <ion-img src=\"/assets/images/home-outline.svg\" class=\"tab-icon\"></ion-img>\r\n                      <span class=\"tabText\">Home</span>\r\n                  </div>\r\n              </ion-col>\r\n              <ion-col size=\"4\" [routerLink]=\"['/groups']\">\r\n                  <div class=\"tab\">\r\n                      <ion-img src=\"/assets/images/message-outline.svg\" class=\"tab-icon\"></ion-img>\r\n                      <span class=\"tabText\">Messages</span>\r\n                  </div>\r\n              </ion-col>\r\n              <ion-col size=\"4\" [routerLink]=\"['/profile']\" routerDirection=\"forward\">\r\n                  <div class=\"tab\">\r\n                      <ion-img src=\"/assets/images/account-outline.svg\" class=\"tab-icon\"></ion-img>\r\n                      <span class=\"tabText\">Profile</span>\r\n                  </div>\r\n              </ion-col>\r\n          </ion-row>\r\n      </ion-grid> -->\r\n  </div>\r\n\r\n</ion-footer>\r\n\r\n");

/***/ }),

/***/ "/k6U":
/*!*****************************************************************!*\
  !*** ./src/app/permithomepage/permithomepage-routing.module.ts ***!
  \*****************************************************************/
/*! exports provided: PermithomepagePageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PermithomepagePageRoutingModule", function() { return PermithomepagePageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _data_resolver_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../data-resolver.service */ "RfyM");
/* harmony import */ var _permitdesign_permitdesign_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./permitdesign/permitdesign.component */ "Tds8");
/* harmony import */ var _permithomepage_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./permithomepage.page */ "dleu");






const routes = [
    {
        path: '',
        component: _permithomepage_page__WEBPACK_IMPORTED_MODULE_5__["PermithomepagePage"],
        resolve: {
            userdata: _data_resolver_service__WEBPACK_IMPORTED_MODULE_3__["DataResolverService"]
        },
        children: [
            // { path: 'design', loadChildren: () => import(`./design/design.module`).then(m => m.DesignModule) },
            {
                path: 'permitdesign',
                component: _permitdesign_permitdesign_component__WEBPACK_IMPORTED_MODULE_4__["PermitdesignComponent"],
                resolve: {
                    userdata: _data_resolver_service__WEBPACK_IMPORTED_MODULE_3__["DataResolverService"]
                },
            }
        ]
    }
];
let PermithomepagePageRoutingModule = class PermithomepagePageRoutingModule {
};
PermithomepagePageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], PermithomepagePageRoutingModule);



/***/ }),

/***/ "80wK":
/*!*********************************************************!*\
  !*** ./src/app/permithomepage/permithomepage.module.ts ***!
  \*********************************************************/
/*! exports provided: PermithomepagePageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PermithomepagePageModule", function() { return PermithomepagePageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _permithomepage_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./permithomepage-routing.module */ "/k6U");
/* harmony import */ var _permithomepage_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./permithomepage.page */ "dleu");
/* harmony import */ var ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ion-bottom-drawer */ "rFvw");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../shared/shared.module */ "PCNd");
/* harmony import */ var _utilities_utilities_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../utilities/utilities.module */ "egEE");
/* harmony import */ var _ionic_native_diagnostic_ngx__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ionic-native/diagnostic/ngx */ "mtRb");
/* harmony import */ var _ionic_native_native_geocoder_ngx__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ionic-native/native-geocoder/ngx */ "h+qT");
/* harmony import */ var _ionic_native_launch_navigator_ngx__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ionic-native/launch-navigator/ngx */ "fGQ8");
/* harmony import */ var _ionic_native_chooser_ngx__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @ionic-native/chooser/ngx */ "UWV4");
/* harmony import */ var _ionic_native_network_ngx__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @ionic-native/network/ngx */ "kwrG");
/* harmony import */ var _declinepage_declinepage_page__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../declinepage/declinepage.page */ "uPeJ");
/* harmony import */ var _email_model_email_model_page__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../email-model/email-model.page */ "+k72");
/* harmony import */ var _ionic_native_file_ngx__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @ionic-native/file/ngx */ "FAH8");
/* harmony import */ var _permitdesign_permitdesign_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./permitdesign/permitdesign.component */ "Tds8");
/* harmony import */ var _ionic_native_file_transfer_ngx__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @ionic-native/file-transfer/ngx */ "B7Rs");
/* harmony import */ var _ionic_native_local_notifications_ngx__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @ionic-native/local-notifications/ngx */ "Bg0J");
/* harmony import */ var _ionic_native_file_opener_ngx__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @ionic-native/file-opener/ngx */ "te5A");

















//import { ResendpagedialogPage } from '../resendpagedialog/resendpagedialog.page';





let PermithomepagePageModule = class PermithomepagePageModule {
};
PermithomepagePageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        entryComponents: [_declinepage_declinepage_page__WEBPACK_IMPORTED_MODULE_15__["DeclinepagePage"], _email_model_email_model_page__WEBPACK_IMPORTED_MODULE_16__["EmailModelPage"]],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _permithomepage_routing_module__WEBPACK_IMPORTED_MODULE_5__["PermithomepagePageRoutingModule"],
            ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_7__["IonBottomDrawerModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
            _utilities_utilities_module__WEBPACK_IMPORTED_MODULE_9__["UtilitiesModule"],
            _shared_shared_module__WEBPACK_IMPORTED_MODULE_8__["SharedModule"]
        ],
        declarations: [_permithomepage_page__WEBPACK_IMPORTED_MODULE_6__["PermithomepagePage"], _permitdesign_permitdesign_component__WEBPACK_IMPORTED_MODULE_18__["PermitdesignComponent"]],
        providers: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["DatePipe"],
            _ionic_native_diagnostic_ngx__WEBPACK_IMPORTED_MODULE_10__["Diagnostic"],
            _ionic_native_native_geocoder_ngx__WEBPACK_IMPORTED_MODULE_11__["NativeGeocoder"],
            _ionic_native_launch_navigator_ngx__WEBPACK_IMPORTED_MODULE_12__["LaunchNavigator"],
            _ionic_native_chooser_ngx__WEBPACK_IMPORTED_MODULE_13__["Chooser"],
            _ionic_native_file_ngx__WEBPACK_IMPORTED_MODULE_17__["File"],
            _ionic_native_network_ngx__WEBPACK_IMPORTED_MODULE_14__["Network"],
            _ionic_native_file_transfer_ngx__WEBPACK_IMPORTED_MODULE_19__["FileTransfer"],
            _ionic_native_local_notifications_ngx__WEBPACK_IMPORTED_MODULE_20__["LocalNotifications"],
            _ionic_native_file_opener_ngx__WEBPACK_IMPORTED_MODULE_21__["FileOpener"]
        ]
    })
], PermithomepagePageModule);



/***/ }),

/***/ "Stgh":
/*!*************************************************************************!*\
  !*** ./src/app/permithomepage/permitdesign/permitdesign.component.scss ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".custom-card {\n  display: flex !important;\n  flex-direction: column !important;\n  background: white !important;\n  border-radius: 4px !important;\n  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.3) !important;\n  padding: 8px 12px;\n}\n\n.customer-name {\n  font-size: 1em;\n  color: #434343;\n  font-weight: bold;\n  display: table;\n  margin: 0px;\n}\n\n.customer-email {\n  font-size: 0.8em;\n  color: #B4B4B4;\n}\n\n.customer-phone {\n  font-size: 0.8em;\n  color: #4272B9;\n}\n\n.customer-address {\n  margin-top: 4px;\n  margin-bottom: 6px;\n  font-size: 0.8em;\n  color: #4272B9;\n}\n\n.timestamp {\n  font-size: 0.7em;\n}\n\n.chipdetail {\n  display: inline;\n  vertical-align: middle;\n  background-color: #95afc0;\n  font-size: 0.6em;\n  padding: 4px 10px;\n  border-radius: 10px;\n  text-align: center;\n  color: #fff;\n}\n\n.cssclass {\n  --max-height:100% !important;\n}\n\nion-bottom-drawer {\n  --padding: 0 !important;\n  padding: 0 !important;\n  --background: #F3F3F3 !important;\n  background: #F3F3F3 !important;\n}\n\nion-bottom-drawer ion-content {\n  --background: #F3F3F3 !important;\n}\n\n.segment-btn {\n  font-size: 10px !important;\n}\n\n.latebystyle {\n  float: right;\n  font-size: 10px;\n  color: #3C78DB;\n}\n\n.recordupdatedon {\n  float: right;\n  font-size: 10px;\n  font-style: italic;\n}\n\n.imagebutton {\n  float: right;\n  margin-top: 0px;\n}\n\n.alertClass {\n  background-color: wheat;\n}\n\n.chatbutton {\n  float: right;\n  margin-top: 0px;\n  margin-right: 5px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFxwZXJtaXRkZXNpZ24uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSx3QkFBQTtFQUNBLGlDQUFBO0VBQ0EsNEJBQUE7RUFDQSw2QkFBQTtFQUNBLHFEQUFBO0VBQ0EsaUJBQUE7QUFDSjs7QUFFRTtFQUNFLGNBQUE7RUFDQSxjQUFBO0VBQ0EsaUJBQUE7RUFDQSxjQUFBO0VBQ0EsV0FBQTtBQUNKOztBQUVFO0VBQ0UsZ0JBQUE7RUFDQSxjQUFBO0FBQ0o7O0FBRUU7RUFDRSxnQkFBQTtFQUNBLGNBQUE7QUFDSjs7QUFFRTtFQUNFLGVBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsY0FBQTtBQUNKOztBQU1FO0VBQ0UsZ0JBQUE7QUFISjs7QUFPRTtFQUNFLGVBQUE7RUFDQSxzQkFBQTtFQUNBLHlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxpQkFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxXQUFBO0FBSko7O0FBTUU7RUFDRSw0QkFBQTtBQUhKOztBQWtCRTtFQUVFLHVCQUFBO0VBQ0EscUJBQUE7RUFFQSxnQ0FBQTtFQUNBLDhCQUFBO0FBakJKOztBQW1CSTtFQUNFLGdDQUFBO0FBakJOOztBQXNCTTtFQUNFLDBCQUFBO0FBbkJSOztBQXNCTTtFQUNFLFlBQUE7RUFDQSxlQUFBO0VBQ0EsY0FBQTtBQW5CUjs7QUFzQk07RUFDRSxZQUFBO0VBQ0EsZUFBQTtFQUNBLGtCQUFBO0FBbkJSOztBQXNCRTtFQUNFLFlBQUE7RUFDQSxlQUFBO0FBbkJKOztBQXNCRTtFQUNFLHVCQUFBO0FBbkJKOztBQXFCRTtFQUNFLFlBQUE7RUFDQSxlQUFBO0VBQ0EsaUJBQUE7QUFsQkoiLCJmaWxlIjoicGVybWl0ZGVzaWduLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmN1c3RvbS1jYXJkIHtcclxuICAgIGRpc3BsYXk6IGZsZXggIWltcG9ydGFudDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW4gIWltcG9ydGFudDtcclxuICAgIGJhY2tncm91bmQ6IHdoaXRlICFpbXBvcnRhbnQ7XHJcbiAgICBib3JkZXItcmFkaXVzOiA0cHggIWltcG9ydGFudDtcclxuICAgIGJveC1zaGFkb3c6IDAgMXB4IDJweCAwIHJnYmEoMCwgMCwgMCwgMC4zKSAhaW1wb3J0YW50O1xyXG4gICAgcGFkZGluZzogOHB4IDEycHg7XHJcbiAgfVxyXG4gIFxyXG4gIC5jdXN0b21lci1uYW1lIHtcclxuICAgIGZvbnQtc2l6ZTogMWVtO1xyXG4gICAgY29sb3I6ICM0MzQzNDM7XHJcbiAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgIGRpc3BsYXk6dGFibGU7XHJcbiAgICBtYXJnaW46IDBweDtcclxuICB9XHJcbiAgXHJcbiAgLmN1c3RvbWVyLWVtYWlsIHtcclxuICAgIGZvbnQtc2l6ZTogMC44ZW07XHJcbiAgICBjb2xvcjogI0I0QjRCNDtcclxuICB9XHJcbiAgXHJcbiAgLmN1c3RvbWVyLXBob25lIHtcclxuICAgIGZvbnQtc2l6ZTogMC44ZW07XHJcbiAgICBjb2xvcjogIzQyNzJCOTtcclxuICB9XHJcbiAgXHJcbiAgLmN1c3RvbWVyLWFkZHJlc3Mge1xyXG4gICAgbWFyZ2luLXRvcDogNHB4O1xyXG4gICAgbWFyZ2luLWJvdHRvbTogNnB4O1xyXG4gICAgZm9udC1zaXplOiAwLjhlbTtcclxuICAgIGNvbG9yOiAjNDI3MkI5O1xyXG4gIH1cclxuICBcclxuICAucGxhY2Vob2xkZXIge1xyXG4gICAgLy8gd2lkdGg6IDUwdncgIWltcG9ydGFudDtcclxuICB9XHJcbiAgXHJcbiAgLnRpbWVzdGFtcCB7XHJcbiAgICBmb250LXNpemU6IDAuN2VtO1xyXG4gICBcclxuICB9XHJcbiAgXHJcbiAgLmNoaXBkZXRhaWx7XHJcbiAgICBkaXNwbGF5OiBpbmxpbmU7XHJcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzk1YWZjMDtcclxuICAgIGZvbnQtc2l6ZTogMC42ZW07XHJcbiAgICBwYWRkaW5nOiA0cHggMTBweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBjb2xvcjogI2ZmZjtcclxuICB9XHJcbiAgLmNzc2NsYXNze1xyXG4gICAgLS1tYXgtaGVpZ2h0IDoxMDAlICFpbXBvcnRhbnQ7XHJcbiAgICAvLyBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAvLyBkaXNwbGF5OiBibG9jaztcclxuICB9XHJcbiAgXHJcbiAgXHJcbiAgLy8uZHJhd2VyIHtcclxuICAvLyAgYmFja2dyb3VuZDogI0YzRjNGMztcclxuICAvLyAgLS1iYWNrZ3JvdW5kOiAjRjNGM0YzO1xyXG4gIC8vfVxyXG4gIC8vXHJcbiAgLy8uaW9uLWJvdHRvbS1kcmF3ZXItc2Nyb2xsYWJsZS1jb250ZW50IHtcclxuICAvLyAgYmFja2dyb3VuZDogI0YzRjNGMyAhaW1wb3J0YW50O1xyXG4gIC8vfVxyXG4gIFxyXG4gIGlvbi1ib3R0b20tZHJhd2VyIHtcclxuICBcclxuICAgIC0tcGFkZGluZzogMCAhaW1wb3J0YW50O1xyXG4gICAgcGFkZGluZzogMCAhaW1wb3J0YW50O1xyXG4gIFxyXG4gICAgLS1iYWNrZ3JvdW5kOiAjRjNGM0YzICFpbXBvcnRhbnQ7XHJcbiAgICBiYWNrZ3JvdW5kOiAjRjNGM0YzICFpbXBvcnRhbnQ7XHJcbiAgXHJcbiAgICBpb24tY29udGVudCB7XHJcbiAgICAgIC0tYmFja2dyb3VuZDogI0YzRjNGMyAhaW1wb3J0YW50O1xyXG4gICAgfVxyXG4gIFxyXG4gICAgXHJcbiAgfVxyXG4gICAgICAuc2VnbWVudC1idG57XHJcbiAgICAgICAgZm9udC1zaXplOiAxMHB4ICFpbXBvcnRhbnQ7XHJcbiAgICAgIH1cclxuICBcclxuICAgICAgLmxhdGVieXN0eWxle1xyXG4gICAgICAgIGZsb2F0OiByaWdodDsgXHJcbiAgICAgICAgZm9udC1zaXplOiAxMHB4O1xyXG4gICAgICAgIGNvbG9yOiAjM0M3OERCO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAucmVjb3JkdXBkYXRlZG9ue1xyXG4gICAgICAgIGZsb2F0OiByaWdodDtcclxuICAgICAgICBmb250LXNpemU6IDEwcHg7XHJcbiAgICAgICAgZm9udC1zdHlsZTogaXRhbGljO1xyXG4gICAgICB9XHJcbiAgXHJcbiAgLmltYWdlYnV0dG9ue1xyXG4gICAgZmxvYXQ6cmlnaHQ7XHJcbiAgICBtYXJnaW4tdG9wOiAwcHg7XHJcbiAgfVxyXG4gIFxyXG4gIC5hbGVydENsYXNze1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hlYXQ7XHJcbiAgfVxyXG4gIC5jaGF0YnV0dG9ue1xyXG4gICAgZmxvYXQ6cmlnaHQ7XHJcbiAgICBtYXJnaW4tdG9wOiAwcHg7XHJcbiAgICBtYXJnaW4tcmlnaHQ6NXB4O1xyXG4gIH0iXX0= */");

/***/ }),

/***/ "Tds8":
/*!***********************************************************************!*\
  !*** ./src/app/permithomepage/permitdesign/permitdesign.component.ts ***!
  \***********************************************************************/
/*! exports provided: PermitdesignComponent, DesginDataHelper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PermitdesignComponent", function() { return PermitdesignComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DesginDataHelper", function() { return DesginDataHelper; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_permitdesign_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./permitdesign.component.html */ "fLZi");
/* harmony import */ var _permitdesign_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./permitdesign.component.scss */ "Stgh");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var src_app_api_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/api.service */ "yTNM");
/* harmony import */ var src_app_networkdetect_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/networkdetect.service */ "UZ2B");
/* harmony import */ var src_app_storage_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/storage.service */ "qkCY");
/* harmony import */ var src_app_utilities_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/utilities.service */ "oTnF");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ionic/storage */ "e8h1");
/* harmony import */ var _ionic_native_social_sharing_ngx__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @ionic-native/social-sharing/ngx */ "/XPu");
/* harmony import */ var _ionic_native_launch_navigator_ngx__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @ionic-native/launch-navigator/ngx */ "fGQ8");
/* harmony import */ var ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ion-bottom-drawer */ "rFvw");
/* harmony import */ var src_app_declinepage_declinepage_page__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! src/app/declinepage/declinepage.page */ "uPeJ");
/* harmony import */ var src_app_resendpagedialog_resendpagedialog_page__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! src/app/resendpagedialog/resendpagedialog.page */ "R1eT");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! moment */ "wd/R");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var src_app_email_model_email_model_page__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! src/app/email-model/email-model.page */ "+k72");
/* harmony import */ var _contants__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../contants */ "6qqZ");
/* harmony import */ var _ionic_native_file_transfer_ngx__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @ionic-native/file-transfer/ngx */ "B7Rs");
/* harmony import */ var _ionic_native_file_ngx__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @ionic-native/file/ngx */ "FAH8");
/* harmony import */ var _ionic_native_local_notifications_ngx__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @ionic-native/local-notifications/ngx */ "Bg0J");
/* harmony import */ var _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @cometchat-pro/cordova-ionic-chat */ "ujHh");
/* harmony import */ var _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_24___default = /*#__PURE__*/__webpack_require__.n(_cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_24__);
/* harmony import */ var _ionic_native_android_permissions_ngx__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @ionic-native/android-permissions/ngx */ "WOgW");
/* harmony import */ var src_app_utilities_mixpanel_service__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! src/app/utilities/mixpanel.service */ "uKCw");



























//import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
let PermitdesignComponent = class PermitdesignComponent {
    constructor(apiService, utils, network, route, launchNavigator, datePipe, cdr, storageservice, storage, alertController, modalController, socialsharing, formBuilder, transfer, file, platform, androidPermissions, localnotification, router, mixpanel) {
        this.apiService = apiService;
        this.utils = utils;
        this.network = network;
        this.route = route;
        this.launchNavigator = launchNavigator;
        this.datePipe = datePipe;
        this.cdr = cdr;
        this.storageservice = storageservice;
        this.storage = storage;
        this.alertController = alertController;
        this.modalController = modalController;
        this.socialsharing = socialsharing;
        this.formBuilder = formBuilder;
        this.transfer = transfer;
        this.file = file;
        this.platform = platform;
        this.androidPermissions = androidPermissions;
        this.localnotification = localnotification;
        this.router = router;
        this.mixpanel = mixpanel;
        this.drawerState = ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_15__["DrawerState"].Bottom;
        this.showSearchBar = false;
        this.listOfDesignDataHelper = [];
        this.listOfDesignsData = [];
        this.options = {
            start: '',
            app: this.launchNavigator.APP.GOOGLE_MAPS
        };
        this.listOfAssignees = [];
        this.listOfAssignees2 = [];
        this.designId = 0;
        this.disableAccept = "true";
        this.showBottomDraw = false;
        this.myFiles = [];
        this.skip = 0;
        this.limit = 10;
        this.isclientassigning = false;
        this.noDesignFound = '';
        this.infinitescroll = false;
        //counts
        //  newpermits: Observable<any>;
        //  newpermitsRef: AngularFireObject<any>;
        //  newpermitscount = 0;
        this.updatechat_id = false;
        this.userData = this.storageservice.getUser(); // get data from resolver
        if (this.userData.role.type == 'wattmonkadmins' || this.userData.role.name == 'Admin' || this.userData.role.name == 'ContractorAdmin' || this.userData.role.name == 'BD') {
            this.segments = 'requesttype=permit&status=created&status=outsourced&status=requestaccepted&status=requestdeclined';
        }
        else if (this.userData.role.type == 'clientsuperadmin' || this.userData.role.name == 'SuperAdmin' || this.userData.role.name == 'ContractorSuperAdmin') {
            this.segments = 'requesttype=permit&status=created&status=outsourced&status=requestaccepted&&status=requestdeclined';
        }
        const latestDate = new Date();
        this.today = datePipe.transform(latestDate, 'M/dd/yy');
        console.log('date', this.today);
        this.todaysdate = datePipe.transform(latestDate, 'yyyy-MM-dd');
        this.assignForm = this.formBuilder.group({
            assignedto: new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required]),
            comment: new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"]('')
        });
        //For Counts
        //  this.newpermitsRef = db.object('newpermitdesigns');
        //  this.newpermits = this.newpermitsRef.valueChanges();
        //  this.newpermits.subscribe(
        //    (res) => {
        //      console.log(res);
        //      this.newpermitscount = res.count;
        //      cdr.detectChanges();
        //    },
        //    (err) => console.log(err),
        //    () => console.log('done!')
        //  )
    }
    ionViewDidEnter() {
        this.apiService.emitUserNameAndRole(this.userData);
        this.deactivateNetworkSwitch = this.network.networkSwitch.subscribe(data => {
            this.netSwitch = data;
            console.log(this.netSwitch);
            //this.newpermitsRef.update({ count: 0 });
            // this.mixpanel.track("PERMITDESIGN_PAGE_OPEN", {
            //   $id: this.userData.id,
            //   $email: this.userData.email,
            //   $name: this.userData.firstname + this.userData.lastname
            // });
        });
        this.network.networkDisconnect();
        this.network.networkConnect();
        this.deactivateNetworkSwitch.unsubscribe();
    }
    segmentChanged(event) {
        if (this.userData.role.type == 'wattmonkadmins' || this.userData.role.name == 'Admin' || this.userData.role.name == 'ContractorAdmin' || this.userData.role.name == 'BD') {
            if (event.target.value == 'newDesign') {
                this.segments = 'requesttype=permit&status=created&status=outsourced&status=requestaccepted&status=requestdeclined';
                // return this.segments;
            }
            else if (event.target.value == 'InDesign') {
                this.segments = "requesttype=permit&status=designassigned";
                // return this.segments;
            }
            else if (event.target.value == 'completed') {
                this.segments = "requesttype=permit&status=designcompleted";
                // return this.segments;
            }
            else if (event.target.value == 'InReview') {
                this.segments = "requesttype=permit&status=reviewassigned&status=reviewfailed&status=reviewpassed";
                // return this.segments;
            }
            else if (event.target.value == 'delivered') {
                this.segments = "requesttype=permit&status=delivered";
            }
            this.getDesigns(null);
            // return this.segments;
        }
        else if (this.userData.role.type == 'clientsuperadmin' || this.userData.role.name == 'SuperAdmin' || this.userData.role.name == 'ContractorSuperAdmin') {
            if (event.target.value == 'newDesign') {
                this.segments = 'requesttype=permit&status=created&status=outsourced&status=requestaccepted&&status=requestdeclined';
                // return this.segments;
            }
            else if (event.target.value == 'InDesign') {
                this.segments = "requesttype=permit&status=designassigned";
                // return this.segments;
            }
            else if (event.target.value == 'completed') {
                this.segments = "requesttype=permit&status=designcompleted";
                // return this.segments;
            }
            else if (event.target.value == 'InReview') {
                this.segments = "requesttype=permit&status=reviewassigned&status=reviewfailed&status=reviewpassed";
                // return this.segments;
            }
            else if (event.target.value == 'delivered') {
                this.segments = "requesttype=permit&status=delivered";
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
        this.makeDirectory();
        this.setupCometChat();
        this.DesignRefreshSubscription = this.utils.getHomepagePermitRefresh().subscribe((result) => {
            this.getDesigns(null);
        });
        // this.dataRefreshSubscription = this.utils.getDataRefresh().subscribe((result) => {
        //   if(this.listOfDesigns != null && this.listOfDesigns.length > 0){
        //     this.formatDesignData(this.listOfDesigns);
        //   }
        // });
    }
    getDesigns(event) {
        this.skip = 0;
        let showLoader = true;
        if (event != null && event !== undefined) {
            showLoader = false;
        }
        this.fetchPendingDesigns(event, showLoader);
    }
    accept(id, data, event) {
        event.stopPropagation();
        this.mixpanel.track("ACCEPT_PERMIT_DESIGN_PAGE_OPEN", {});
        this.acceptid = id;
        let status = {
            status: data
        };
        this.utils.showLoading("accepting").then(() => {
            this.apiService.updateDesignForm(status, id).subscribe((res) => {
                this.createNewDesignChatGroup(res);
                this.utils.hideLoading().then(() => {
                    if (this.updatechat_id) {
                        this.utils.setHomepagePermitRefresh(true);
                    }
                    else {
                        this.utils.setHomepagePermitRefresh(true);
                    }
                });
            });
        });
    }
    fetchPendingDesigns(event, showLoader) {
        // this.infinitescroll=false;
        this.noDesignFound = "";
        console.log("inside fetch Designs");
        this.listOfDesigns = [];
        this.listOfDesignsHelper = [];
        //this.newpermitsRef.update({ count: 0 });
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
        this.chatIcon(list);
        console.log(list);
        this.cdr.detectChanges();
    }
    ///chat icon
    chatIcon(list) {
        list.forEach(element => {
            console.log(element);
            var groupMembersRequest = new _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_24__["CometChat"].GroupMembersRequestBuilder(element.chatid)
                .setLimit(10)
                .build();
            groupMembersRequest.fetchNext().then(groupMembers => {
                console.log(groupMembers);
                element.addedtogroupchat = true;
            }, error => {
                // this.utils.hideLoadingWithPullRefreshSupport(this.showLoader).then(() => {
                // })
                console.log("Group Member list fetching failed with exception:", error);
            });
            // this.utils.hideLoadingWithPullRefreshSupport(this.showLoader).then(() => {
            //})
        });
    }
    ngOnDestroy() {
        // this.refreshSubscription.unsubscribe();
        // this.routeSubscription.unsubscribe();
        // this.dataRefreshSubscription.unsubscribe();
        this.DesignRefreshSubscription.unsubscribe();
    }
    // filterData(records : DesginDataModel[]) {
    //   console.log(this.listOfDesignsData);
    //   this.listOfDesigns = this.fillinDynamicData(records);
    //   // let filterDataArray: any = this.listOfDesignsData.filter(x => x.id == serchTerm);
    //   const tempData: DesginDataHelper[] = [];
    //   this.listOfDesigns.forEach((desginItem) => {
    //     if (tempData.length === 0) {
    //       const listOfDesign = new DesginDataHelper();
    //       listOfDesign.date = this.datePipe.transform(desginItem.updated_at, 'M/d/yy');
    //       listOfDesign.listOfDesigns.push(desginItem);
    //       tempData.push(listOfDesign);
    //     } else {
    //       let added = false;
    //       tempData.forEach((desginList) => {
    //         if (!added) {
    //           if (desginList.date === this.datePipe.transform(desginItem.updated_at, 'M/d/yy')) {
    //             desginList.listOfDesigns.push(desginItem);
    //             added = true;
    //           }
    //         }
    //       });
    //       if (!added) {
    //         const listOfDesign = new DesginDataHelper();
    //         listOfDesign.date = this.datePipe.transform(desginItem.updated_at, 'M/d/yy');
    //         listOfDesign.listOfDesigns.push(desginItem);
    //         tempData.push(listOfDesign);
    //         added = true;
    //         this.listOfDesignDataHelper.push(listOfDesign);
    //         console.log(this.listOfDesignDataHelper);
    //       }
    //     }
    //   });
    //   this.listOfDesignDataHelper = tempData;
    //   this.cdr.detectChanges();
    // }
    fillinDynamicData(records) {
        records.forEach((element) => {
            if (element.status != "delivered") {
                element.isoverdue = this.utils.isDatePassed(element.deliverydate);
            }
            else {
                element.isoverdue = false;
            }
            var reviewdate = new Date(element.reviewstarttime);
            reviewdate.setHours(reviewdate.getHours() + 2);
            element.reviewremainingtime = this.utils.getRemainingTime(reviewdate.toString());
            element.lateby = this.utils.getTheLatebyString(element.deliverydate);
            element.recordupdatedon = this.utils.formatDateInTimeAgo(element.updated_at);
            element.formattedjobtype = this.utils.getJobTypeName(element.jobtype);
            var acceptancedate = new Date(element.designacceptancestarttime);
            element.designacceptanceremainingtime = this.utils.getRemainingTime(acceptancedate.toString());
            var indesigndate = new Date(element.designstarttime);
            indesigndate.setHours(indesigndate.getHours() + 6);
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
            //   console.log(data);
            //   if (data) {
            //     element.totalperceznt = data.currentprogress;
            //   }else{
            //     element.totalpercent = 0;
            //   }
            // });
        });
        return records;
    }
    // getDesign(event, showLoader: boolean) {
    //   this.listOfDesignsData = [];
    //   this.listOfDesignDataHelper = [];
    //   this.utils.showLoadingWithPullRefreshSupport(showLoader, 'Getting designs').then((success) => {
    //     // ;
    //     this.apiService.getDesignSurveys(this.segments).subscribe((response:any) => {
    //       this.utils.hideLoadingWithPullRefreshSupport(showLoader).then((loaderHidden) => {
    //         // ;
    //         if (event !== null) {
    //           event.target.complete();
    //         }
    //         console.log(response, '>>');
    //         this.listOfDesignsData = response;
    //          response.forEach(element => {
    //             this.roleType = element.type;
    //         });;
    //         console.log(this.roleType);
    //         const tempData: DesginDataHelper[] = [];
    //         this.listOfDesignsData.forEach((desginItem) => {
    //           if (tempData.length === 0) {
    //             const listOfDesign = new DesginDataHelper();
    //             listOfDesign.date = this.datePipe.transform(desginItem.updated_at, 'M/d/yy');
    //             listOfDesign.listOfDesigns.push(desginItem);
    //             tempData.push(listOfDesign);
    //           } else {
    //             let added = false;
    //             tempData.forEach((desginList) => {
    //               if (!added) {
    //                 if (desginList.date === this.datePipe.transform(desginItem.updated_at, 'M/d/yy')) {
    //                   desginList.listOfDesigns.push(desginItem);
    //                   added = true;
    //                 }
    //               }
    //             });
    //             if (!added) {
    //               const listOfDesign = new DesginDataHelper();
    //               listOfDesign.date = this.datePipe.transform(desginItem.updated_at, 'M/d/yy');
    //               listOfDesign.listOfDesigns.push(desginItem);
    //               tempData.push(listOfDesign);
    //               added = true;
    //               this.listOfDesignDataHelper.push(listOfDesign);
    //               console.log(this.listOfDesignDataHelper,"<<<<>>>>");
    //             }
    //           }
    //         });
    //         this.listOfDesignDataHelper = tempData;
    //         this.cdr.detectChanges();
    //       },responseError=>{
    //         this.utils.hideLoadingWithPullRefreshSupport(showLoader).then((loaderHidden) => {
    //           if (event !== null) {
    //             event.target.complete();
    //           }
    //           const error: ErrorModel = responseError.error;
    //           this.utils.errorSnackBar(error.message[0].messages[0].message);
    //         });
    //       });
    //     }, responseError => {
    //       this.utils.hideLoadingWithPullRefreshSupport(showLoader).then((loaderHidden) => {
    //         if (event !== null) {
    //           event.target.complete();
    //         }
    //         const error: ErrorModel = responseError.error;
    //         this.utils.errorSnackBar(error.message);
    //       });
    //     });
    //   }, (apiError) => {
    //     this.utils.hideLoadingWithPullRefreshSupport(showLoader).then(() => {
    //       if (event !== null) {
    //         event.target.complete();
    //       }
    //     });
    //   });
    // }
    openAddressOnMap(address, event) {
        event.stopPropagation();
        this.launchNavigator.navigate(address, this.options);
    }
    dismissBottomSheet() {
        console.log('this', this.drawerState);
        this.drawerState = ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_15__["DrawerState"].Bottom;
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
                // if(this.designerData.requesttype == "permit"){
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
                debugger;
                console.log(this.userData);
                // if (this.selectedDesigner.company == this.userData.company) {
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
                    designacceptancestarttime.setMinutes(designacceptancestarttime.getMinutes() + 30);
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
                        this.utils.setHomepagePermitRefresh(true);
                    });
                }, (error) => {
                    this.utils.hideLoading();
                    this.dismissBottomSheet();
                    this.showBottomDraw = false;
                });
            });
        }
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
            // if(response.length<10){
            //   this.infinitescroll=true
            // }else{this.infinitescroll=false}
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
    openDesigners(id, designData, event) {
        event.stopPropagation();
        debugger;
        this.mixpanel.track("ASSIGN_PERMIT_DESIGN_PAGE_OPEN", {});
        this.listOfAssignees = [];
        console.log("this is", designData);
        this.designerData = designData;
        this.reviewAssignedTo = designData.designassignedto;
        if ((this.userData.role.type == 'clientsuperadmin' || this.userData.role.type == 'clientadmin') && this.designerData.status == 'created') {
            //this.route.navigate(["payment-modal",{id:id,designData:this.designerData.requesttype}])
            let objToSend = {
                queryParams: {
                    id: id,
                    designData: this.designerData.requesttype,
                    fulldesigndata: this.designerData
                },
                skipLocationChange: false,
                fragment: 'top'
            };
            this.route.navigate(['/payment-modal'], {
                state: { productdetails: objToSend }
            });
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
                            this.drawerState = ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_15__["DrawerState"].Docked;
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
                this.drawerState = ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_15__["DrawerState"].Docked;
                this.assignForm.patchValue({
                    assignedto: ''
                });
            }
        }
    }
    openAnalysts(id, designData, event) {
        event.stopPropagation();
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
                        this.drawerState = ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_15__["DrawerState"].Docked;
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
            this.drawerState = ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_15__["DrawerState"].Docked;
            this.assignForm.patchValue({
                assignedto: ''
            });
        }
    }
    close() {
        if (this.showBottomDraw === true) {
            this.showBottomDraw = false;
            this.drawerState = ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_15__["DrawerState"].Bottom;
            this.utils.setBottomBarHomepage(true);
        }
        else {
            this.showBottomDraw = true;
        }
    }
    openreviewPassed(id, designData, event) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            event.stopPropagation();
            this.mixpanel.track("DELIVER_PERMIT_PAGE_OPEN", {});
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
                                    this.utils.setHomepagePermitRefresh(true);
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
    refreshDesigns(event) {
        this.skip = 0;
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
    decline(id, event) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            event.stopPropagation();
            this.mixpanel.track("DECLINE_PERMIT_DESIGN_PAGE_OPEN", {});
            const modal = yield this.modalController.create({
                component: src_app_declinepage_declinepage_page__WEBPACK_IMPORTED_MODULE_16__["DeclinepagePage"],
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
    Resend(id, type, event) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            event.stopPropagation();
            this.mixpanel.track("RESEND_PERMIT_DESIGN_PAGE_OPEN", {});
            const modal = yield this.modalController.create({
                component: src_app_resendpagedialog_resendpagedialog_page__WEBPACK_IMPORTED_MODULE_17__["ResendpagedialogPage"],
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
        var checkdate = moment__WEBPACK_IMPORTED_MODULE_18__(datestring, "YYYYMMDD");
        var todaydate = moment__WEBPACK_IMPORTED_MODULE_18__(new Date(), "YYYYMMDD");
        var lateby = todaydate.diff(checkdate, "days");
        this.overdue = lateby;
    }
    selfAssign(id, designData, event) {
        event.stopPropagation();
        // this.mixpanel.track("SelfAssign_Permit_Design_PAGE_OPEN", {
        // });
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
                    this.utils.setHomepagePermitRefresh(true);
                });
            }, (error) => {
                this.utils.hideLoading();
            });
        });
    }
    pending(value) {
        ;
        if (this.userData.role.type == 'SuperAdmin') {
            value = "requesttype=permit&status=created&status=outsourced&status=requestaccepted&status=requestdeclined";
        }
        else {
            value = "requesttype=permit&status=created&status=outsourced&status=requestaccepted";
        }
    }
    getassignedata(asssignedata) {
        this.selectedDesigner = asssignedata;
    }
    shareWhatsapp(designData, event) {
        event.stopPropagation();
        this.socialsharing.share(designData.permitdesign.url);
    }
    shareViaEmails(id, designData, event) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            event.stopPropagation();
            const modal = yield this.modalController.create({
                component: src_app_email_model_email_model_page__WEBPACK_IMPORTED_MODULE_19__["EmailModelPage"],
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
        this.mixpanel.track("DOWNLOAD_PERMIT_PAGE_OPEN", {});
        this.platform.ready().then(() => {
            this.file.resolveDirectoryUrl(this.storageDirectory).then(resolvedDirectory => {
                this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then(result => console.log('Has permission?', result.hasPermission), err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE));
                this.file.checkFile(resolvedDirectory.nativeURL, designData.permitdesign.hash).then(data => {
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
                            fileTransfer.download(url, this.storageDirectory + designData.permitdesign.hash + designData.permitdesign.ext).then((entry) => {
                                this.utils.hideLoading().then(() => {
                                    console.log('download complete: ' + entry.toURL());
                                    this.utils.showSnackBar("Permit Design Downloaded Successfully");
                                    // this.clickSub = this.localnotification.on('click').subscribe(data => {
                                    //   console.log(data)
                                    //   path;
                                    // })
                                    this.localnotification.schedule({ text: 'Permit Design Downloaded Successfully', foreground: true, vibrate: true });
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
        const url = designData.permitdesign.url;
        const fileTransfer = this.transfer.create();
        let result = this.file.createDir(this.file.externalRootDirectory, dir_name, true);
        result.then((resp) => {
            path = resp.toURL();
            console.log(path);
            fileTransfer.download(url, path + designData.permitdesign.hash + designData.permitdesign.ext).then((entry) => {
                console.log('download complete: ' + entry.toURL());
                this.utils.showSnackBar("Permit Design Downloaded Successfully");
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
    createChatGroup(design) {
        var GUID = 'permit' + "_" + new Date().getTime();
        var address = design.address.substring(0, 90);
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
    createNewDesignChatGroup(design) {
        var GUID = 'permit' + "_" + new Date().getTime();
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
                if (design.requesttype == "permit") {
                    let postdata = {
                        chatid: GUID
                    };
                    this.apiService.updateDesignForm(postdata, this.acceptid).subscribe(res => {
                        this.updatechat_id = true;
                    });
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
    addUserToGroupChat() {
        debugger;
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
    setupCometChat() {
        let userId = this.storageservice.getUserID();
        const user = new _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_24__["CometChat"].User(userId);
        user.setName(this.storageservice.getUser().firstname + ' ' + this.storageservice.getUser().lastname);
        const appSetting = new _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_24__["CometChat"].AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(_contants__WEBPACK_IMPORTED_MODULE_20__["COMETCHAT_CONSTANTS"].REGION).build();
        _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_24__["CometChat"].init(_contants__WEBPACK_IMPORTED_MODULE_20__["COMETCHAT_CONSTANTS"].APP_ID, appSetting).then(() => {
            console.log('Initialization completed successfully');
            // if(this.utilities.currentUserValue != null){
            // You can now call login function.
            _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_24__["CometChat"].login(userId, _contants__WEBPACK_IMPORTED_MODULE_20__["COMETCHAT_CONSTANTS"].API_KEY).then((user) => {
                console.log('Login Successful:', { user });
            }, error => {
                console.log('Login failed with exception:', { error });
            });
            // }
        }, error => {
            console.log('Initialization failed with error:', error);
        });
    }
    directAssignToWattmonk(id, event) {
        event.stopPropagation();
        this.mixpanel.track("REASSIGN_PERMIT_DESIGN_PAGE_OPEN", {});
        this.designId = id;
        var postData = {};
        var designacceptancestarttime = new Date();
        designacceptancestarttime.setMinutes(designacceptancestarttime.getMinutes() + 30);
        postData = {
            //outsourcedto: 232,
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
                    this.utils.setHomepagePermitRefresh(true);
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
        this.route.navigate(['/activity' + '/' + designData.id + '/design']);
    }
    gotoDetails(designData, $event) {
        // $event.preventDefault();
        // $event.stopPropagation();
        this.route.navigate(['/design-details/' + designData.id]);
    }
};
PermitdesignComponent.ctorParameters = () => [
    { type: src_app_api_service__WEBPACK_IMPORTED_MODULE_8__["ApiService"] },
    { type: src_app_utilities_service__WEBPACK_IMPORTED_MODULE_11__["UtilitiesService"] },
    { type: src_app_networkdetect_service__WEBPACK_IMPORTED_MODULE_9__["NetworkdetectService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"] },
    { type: _ionic_native_launch_navigator_ngx__WEBPACK_IMPORTED_MODULE_14__["LaunchNavigator"] },
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_3__["DatePipe"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["ChangeDetectorRef"] },
    { type: src_app_storage_service__WEBPACK_IMPORTED_MODULE_10__["StorageService"] },
    { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_12__["Storage"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_7__["AlertController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_7__["ModalController"] },
    { type: _ionic_native_social_sharing_ngx__WEBPACK_IMPORTED_MODULE_13__["SocialSharing"] },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormBuilder"] },
    { type: _ionic_native_file_transfer_ngx__WEBPACK_IMPORTED_MODULE_21__["FileTransfer"] },
    { type: _ionic_native_file_ngx__WEBPACK_IMPORTED_MODULE_22__["File"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_7__["Platform"] },
    { type: _ionic_native_android_permissions_ngx__WEBPACK_IMPORTED_MODULE_25__["AndroidPermissions"] },
    { type: _ionic_native_local_notifications_ngx__WEBPACK_IMPORTED_MODULE_23__["LocalNotifications"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__["ActivatedRoute"] },
    { type: src_app_utilities_mixpanel_service__WEBPACK_IMPORTED_MODULE_26__["MixpanelService"] }
];
PermitdesignComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_4__["Component"])({
        selector: 'app-permitdesign',
        template: _raw_loader_permitdesign_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_permitdesign_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], PermitdesignComponent);

class DesginDataHelper {
    constructor() {
        this.listOfDesigns = [];
    }
    shareDesign() {
    }
}


/***/ }),

/***/ "dleu":
/*!*******************************************************!*\
  !*** ./src/app/permithomepage/permithomepage.page.ts ***!
  \*******************************************************/
/*! exports provided: PermithomepagePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PermithomepagePage", function() { return PermithomepagePage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_permithomepage_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./permithomepage.page.html */ "+682");
/* harmony import */ var _permithomepage_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./permithomepage.page.scss */ "nBMq");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../api.service */ "yTNM");
/* harmony import */ var _utilities_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utilities.service */ "oTnF");
/* harmony import */ var _ionic_native_in_app_browser_ngx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic-native/in-app-browser/ngx */ "m/P+");
/* harmony import */ var _networkdetect_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../networkdetect.service */ "UZ2B");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ion-bottom-drawer */ "rFvw");
/* harmony import */ var _ionic_native_launch_navigator_ngx__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ionic-native/launch-navigator/ngx */ "fGQ8");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _storage_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../storage.service */ "qkCY");
/* harmony import */ var _ionic_native_social_sharing_ngx__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @ionic-native/social-sharing/ngx */ "/XPu");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @ionic/storage */ "e8h1");
/* harmony import */ var _ionic_native_diagnostic_ngx__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @ionic-native/diagnostic/ngx */ "mtRb");
/* harmony import */ var _ionic_native_geolocation_ngx__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @ionic-native/geolocation/ngx */ "Bfh1");
/* harmony import */ var _ionic_native_native_geocoder_ngx__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @ionic-native/native-geocoder/ngx */ "h+qT");
/* harmony import */ var _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @cometchat-pro/cordova-ionic-chat */ "ujHh");
/* harmony import */ var _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(_cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var _contants__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../contants */ "6qqZ");
/* harmony import */ var _utilities_mixpanel_service__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../utilities/mixpanel.service */ "uKCw");























let PermithomepagePage = class PermithomepagePage {
    constructor(apiService, utils, iab, network, platform, route, launchNavigator, datePipe, cdr, storageservice, storage, alertController, modalController, socialsharing, formBuilder, diagnostic, toastController, geolocation, nativeGeocoder, mixpanelService) {
        this.apiService = apiService;
        this.utils = utils;
        this.iab = iab;
        this.network = network;
        this.platform = platform;
        this.route = route;
        this.launchNavigator = launchNavigator;
        this.datePipe = datePipe;
        this.cdr = cdr;
        this.storageservice = storageservice;
        this.storage = storage;
        this.alertController = alertController;
        this.modalController = modalController;
        this.socialsharing = socialsharing;
        this.formBuilder = formBuilder;
        this.diagnostic = diagnostic;
        this.toastController = toastController;
        this.geolocation = geolocation;
        this.nativeGeocoder = nativeGeocoder;
        this.mixpanelService = mixpanelService;
        this.version = _contants__WEBPACK_IMPORTED_MODULE_21__["version"];
        this.drawerState = ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_10__["DrawerState"].Bottom;
        this.showSearchBar = false;
        this.geoEncoderOptions = {
            useLocale: true,
            maxResults: 5
        };
        //listOfDesignDataHelper: DesginDataHelper[] = [];
        this.listOfDesignsData = [];
        this.options = {
            start: '',
            app: this.launchNavigator.APP.GOOGLE_MAPS
        };
        this.listOfAssignees = [];
        this.listOfAssignees2 = [];
        this.designId = 0;
        this.disableAccept = "true";
        this.showBottomDraw = false;
        this.myFiles = [];
        this.showFooter = true;
        this.setupCometChatUser();
    }
    getNotificationCount() {
        this.apiService.getCountOfUnreadNotifications().subscribe((count) => {
            console.log("count", count);
            this.unreadCount = count;
        });
    }
    ngOnInit() {
        this.setupCometChatUser();
        this.getNotificationCount();
        this.apiService.version.subscribe(versionInfo => {
            this.update_version = versionInfo;
        });
        this.route.navigate(['permithomepage/permitdesign']);
        this.subscription = this.utils.getBottomBarHomepage().subscribe((value) => {
            this.showFooter = value;
        });
    }
    setupCometChatUser() {
        debugger;
        let userId = this.storageservice.getUserID();
        this.userData = this.storageservice.getUser();
        const user = new _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_20__["CometChat"].User(userId);
        user.setName(this.storageservice.getUser().firstname + ' ' + this.storageservice.getUser().lastname);
        const appSetting = new _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_20__["CometChat"].AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(_contants__WEBPACK_IMPORTED_MODULE_21__["COMETCHAT_CONSTANTS"].REGION).build();
        _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_20__["CometChat"].init(_contants__WEBPACK_IMPORTED_MODULE_21__["COMETCHAT_CONSTANTS"].APP_ID, appSetting).then(() => {
            console.log('Initialization completed successfully');
            // if(this.utilities.currentUserValue != null){
            // You can now call login function.
            _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_20__["CometChat"].login(userId, _contants__WEBPACK_IMPORTED_MODULE_21__["COMETCHAT_CONSTANTS"].API_KEY).then((user) => {
                console.log('Login Successful:', { user });
            }, error => {
                console.log('Login failed with exception:', { error });
            });
            // }
        }, error => {
            console.log('Initialization failed with error:', error);
        });
    }
    ionViewDidEnter() {
        debugger;
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
            let user = this.storageservice.getUser();
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
        this.mixpanelService.setUserDetails(this.userData.email, this.userData.firstname + " " + this.userData.lastname, this.userData.id);
        this.mixpanelService.track("PERMITDESIGN_PAGE_OPEN", {
            $id: this.userData.id,
            $email: this.userData.email,
            $name: this.userData.firstname + this.userData.lastname
        });
    }
    scheduledPage() {
        this.mixpanelService.track("ADD_PERMITDESIGN_PAGE_OPEN", {});
        this.route.navigate(['/permitschedule']);
    }
    searchbar() {
        this.route.navigate(['/search-bar1']);
    }
    setzero() {
        this.unreadCount = 0;
    }
    ////////////////////////////////////////////////
    requestLocationPermission() {
        this.platform.ready().then(() => {
            this.diagnostic.requestLocationAuthorization(this.diagnostic.locationAuthorizationMode.WHEN_IN_USE).then((mode) => {
                console.log(mode);
                switch (mode) {
                    case this.diagnostic.permissionStatus.NOT_REQUESTED:
                        // this.goBack();
                        break;
                    case this.diagnostic.permissionStatus.DENIED_ALWAYS:
                        this.showLocationDenied();
                        break;
                    case this.diagnostic.permissionStatus.DENIED_ONCE:
                        // this.goBack();
                        break;
                    case this.diagnostic.permissionStatus.GRANTED:
                        this.fetchLocation();
                        break;
                    case this.diagnostic.permissionStatus.GRANTED_WHEN_IN_USE:
                        this.fetchLocation();
                        break;
                    case 'authorized_when_in_use':
                        this.fetchLocation();
                        break;
                }
            }, (rejection) => {
                console.log(rejection);
            });
        });
    }
    showLocationDenied() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const toast = yield this.toastController.create({
                header: 'Error',
                message: 'Location services denied, please enable them manually',
                cssClass: 'my-custom-class',
                buttons: [
                    {
                        text: 'OK',
                        handler: () => {
                        }
                    }
                ]
            });
            toast.present();
        });
    }
    fetchLocation() {
        this.diagnostic.isGpsLocationEnabled().then((status) => {
            if (status === true) {
                // this.utilities.showLoading('Getting Location').then(() => {
                this.getGeoLocation();
                // });
            }
            else {
                this.askToChangeSettings();
            }
        });
    }
    askToChangeSettings() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const toast = yield this.toastController.create({
                header: 'Location Disabled',
                message: 'Please enable location services',
                cssClass: 'my-custom-class',
                buttons: [
                    {
                        text: 'OK',
                        handler: () => {
                            this.changeLocationSettings();
                        }
                    }, {
                        text: 'Cancel',
                        handler: () => {
                        }
                    }
                ]
            });
            toast.present();
        });
    }
    getGeoLocation() {
        this.geolocation.getCurrentPosition().then((resp) => {
            console.log('resp', resp);
            this.getGeoEncoder(resp.coords.latitude, resp.coords.longitude);
        }).catch((error) => {
            this.utils.errorSnackBar('Unable to get location');
            console.log('Error getting location', error);
            this.showNoLocation();
        });
    }
    getGeoEncoder(latitude, longitude) {
        // this.utilities.hideLoading().then((success) => {
        this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geoEncoderOptions)
            .then((result) => {
            console.log('resu', result);
            const address = {
                address: this.generateAddress(result[0]),
                lat: latitude,
                long: longitude,
                country: result[0].countryName,
                state: result[0].administrativeArea,
                city: result[0].locality,
                postalcode: result[0].postalCode
            };
            this.utils.setAddress(address);
        })
            .catch((error) => {
            this.showNoLocation();
            alert('Error getting location' + JSON.stringify(error));
        });
    }
    generateAddress(addressObj) {
        const obj = [];
        let address = '';
        for (const key in addressObj) {
            obj.push(addressObj[key]);
        }
        obj.reverse();
        for (const val in obj) {
            if (obj[val].length) {
                address += obj[val] + ', ';
            }
        }
        return address.slice(0, -2);
    }
    changeLocationSettings() {
        this.diagnostic.switchToLocationSettings();
        this.diagnostic.registerLocationStateChangeHandler((state) => {
            console.log(state);
            if ((this.platform.is('android') && state !== this.diagnostic.locationMode.LOCATION_OFF)) {
                this.checkLocationAccess();
            }
        });
    }
    checkLocationAccess() {
        console.log('Getting location');
        this.diagnostic.isLocationAuthorized().then((success) => {
            this.fetchLocation();
        }, (error) => {
            this.utils.errorSnackBar('GPS Not Allowed');
        });
    }
    showNoLocation() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                header: 'Error',
                subHeader: 'Unable to get location',
                buttons: [
                    {
                        text: 'OK',
                        handler: () => {
                            // this.goBack();
                        }
                    }
                ],
                backdropDismiss: false
            });
            yield alert.present();
        });
    }
    ngOndestroy() {
        this.deactivateNetworkSwitch.unsubscribe();
    }
};
PermithomepagePage.ctorParameters = () => [
    { type: _api_service__WEBPACK_IMPORTED_MODULE_4__["ApiService"] },
    { type: _utilities_service__WEBPACK_IMPORTED_MODULE_5__["UtilitiesService"] },
    { type: _ionic_native_in_app_browser_ngx__WEBPACK_IMPORTED_MODULE_6__["InAppBrowser"] },
    { type: _networkdetect_service__WEBPACK_IMPORTED_MODULE_7__["NetworkdetectService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_8__["Platform"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_9__["Router"] },
    { type: _ionic_native_launch_navigator_ngx__WEBPACK_IMPORTED_MODULE_11__["LaunchNavigator"] },
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_13__["DatePipe"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ChangeDetectorRef"] },
    { type: _storage_service__WEBPACK_IMPORTED_MODULE_14__["StorageService"] },
    { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_16__["Storage"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_8__["AlertController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_8__["ModalController"] },
    { type: _ionic_native_social_sharing_ngx__WEBPACK_IMPORTED_MODULE_15__["SocialSharing"] },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_12__["FormBuilder"] },
    { type: _ionic_native_diagnostic_ngx__WEBPACK_IMPORTED_MODULE_17__["Diagnostic"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_8__["ToastController"] },
    { type: _ionic_native_geolocation_ngx__WEBPACK_IMPORTED_MODULE_18__["Geolocation"] },
    { type: _ionic_native_native_geocoder_ngx__WEBPACK_IMPORTED_MODULE_19__["NativeGeocoder"] },
    { type: _utilities_mixpanel_service__WEBPACK_IMPORTED_MODULE_22__["MixpanelService"] }
];
PermithomepagePage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-permithomepage',
        template: _raw_loader_permithomepage_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_permithomepage_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], PermithomepagePage);



/***/ }),

/***/ "fLZi":
/*!***************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/permithomepage/permitdesign/permitdesign.component.html ***!
  \***************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-segment scrollable (ionChange)=\"segmentChanged($event)\" value=\"newDesign\" mode=\"md\">\r\n  <ion-segment-button value=\"newDesign\">\r\n    <ion-label class=\"segment-btn\">New Designs</ion-label>\r\n  </ion-segment-button>\r\n  <ion-segment-button value=\"InDesign\">\r\n    <ion-label class=\"segment-btn\">In Designing</ion-label>\r\n  </ion-segment-button>\r\n  <ion-segment-button value=\"completed\">\r\n    <ion-label class=\"segment-btn\">Completed</ion-label>\r\n  </ion-segment-button>\r\n  <ion-segment-button value=\"InReview\">\r\n    <ion-label class=\"segment-btn\"> In Review</ion-label>\r\n  </ion-segment-button>\r\n  <ion-segment-button value=\"delivered\">\r\n    <ion-label class=\"segment-btn\">Delivered</ion-label>\r\n  </ion-segment-button>\r\n</ion-segment>\r\n\r\n\r\n  <ion-content (click)=\"close()\" style=\"padding-bottom: 250px;position: sticky;\">\r\n    <ion-refresher slot=\"fixed\" (ionRefresh)=\"refreshDesigns($event)\">\r\n      <ion-refresher-content></ion-refresher-content>\r\n    </ion-refresher>\r\n  <ion-grid *ngIf=\"listOfDesignsHelper.length !== 0 ;else nodesignFound\">\r\n      <!-- <ion-row *ngFor=\"let item of listOfDesignsHelper;let i = index\"> -->\r\n        <!-- <ion-virtual-scroll [items]=\"listOfDesignsHelper\"> -->\r\n            <ion-row *ngFor=\"let item of listOfDesignsHelper;let i = index\">\r\n                <!-- <ion-row *virtualItem=\"let item;let i = index\"> -->\r\n          <!-- <ion-col size=\"12\" class=\"ion-margin-top\">\r\n                  <span class=\"ion-padding\" *ngIf=\"today === item.date\">\r\n                      Today\r\n                      </span>\r\n              <span class=\"ion-padding\" *ngIf=\"today !== item.date\">\r\n                          {{item.date | date: 'dd MMM yyyy'}}\r\n                  </span>\r\n          </ion-col> -->\r\n          <ion-col *ngFor=\"let designData of item.listOfDesigns;let j = index;trackBy: trackdesign\" size=\"12\">\r\n              <ion-card class=\"ion-no-padding custom-card ion-no-margin\" style=\"height: 100%;\" (click)=\"gotoDetails(designData,$event)\">\r\n                  <p class=\"customer-name\"\r\n                  routerDirection=\"forward\">{{designData.name}}\r\n                  <!-- <span class=\"chipdetail\" style=\"background-color: #1289A7;\"  routerDirection=\"forward\">\r\n                    {{designData.deliverydate | date: 'hh:mm a'}}\r\n                </span> -->\r\n\r\n                <span fill=\"clear\" background-border=\"clear\" (click)=\"gotoActivity(designData,$event)\" class=\"imagebutton\"  size=\"small\"  ><img  style= \"height:20px\" src=\"assets/images/activitylist.png\" /></span>\r\n                <ng-container *ngIf=\"designData?.chatid!==null && designData?.addedtogroupchat\">\r\n                  <span fill=\"clear\" background-border=\"clear\" [routerLink]=\"['/','chat',designData.chatid]\" class=\"chatbutton\"  size=\"small\"  ><img  style= \"height:20px\" src=\"assets/images/chat.svg\" /></span>\r\n                </ng-container>\r\n              </p>\r\n              <p style=\"margin:0px\">\r\n          <span class=\"chipdetail\" style=\"background-color: rgb(246, 77, 10);\" *ngIf=\"designData.status == 'requestdeclined'\"  >On Hold</span>\r\n\r\n          <span class=\"chipdetail\" style=\"background-color: rgb(246, 77, 10);\" *ngIf=\"designData.status == 'reviewfailed'\"  >Review Failed</span>\r\n          <span class=\"chipdetail\" style=\"background-color: rgb(246, 104, 10);\" *ngIf=\"designData.isoverdue\" >Overdue</span>\r\n          <span class=\"chipdetail\" style=\"background-color: rgb(109, 187, 26);\" *ngIf=\"designData.status == 'requestaccepted'\" >Accepted</span>\r\n          <span class=\"chipdetail\" style=\"background-color: rgb(109, 187, 26);\" *ngIf=\"designData.status == 'reviewpassed'\" >Review Passed</span>\r\n          <span class=\"chipdetail\" style=\"background-color: rgb(109, 187, 26);\" *ngIf=\"designData.status == 'delivered'\" >Delivered</span>\r\n          <span class=\"chipdetail\" style=\"background-color: rgb(109, 187, 26);padding: 4px 5px;\" *ngIf=\"designData.status == 'designcompleted'\" ><ion-icon name=\"checkmark-done-outline\" style=\"color: #fff;\"></ion-icon></span>\r\n          <span class=\"chipdetail\" style=\"background-color: #1289A7;;\" *ngIf=\"designData.status == 'created'\" >Unassigned</span>\r\n          <span class=\"chipdetail\" style=\"background-color: #1289A7;;\" *ngIf=\"designData.status == 'designassigned'\" >Design Assigned</span>\r\n          <span class=\"chipdetail\" style=\"background-color: #1289A7;;\" *ngIf=\"designData.status == 'reviewassigned'\" >In Review</span>\r\n          <span class=\"chipdetail\" *ngIf=\"designData.status == 'outsourced' && (userData.role.type=='clientadmin' || userData.role.type=='clientsuperadmin')\" style=\"background-color: #95afc0;\" >Waiting for acceptance</span>\r\n          <span class=\"chipdetail\" style=\"background-color: rgb(183,21,64)\" *ngIf=\"designData.isinrevisionstate\"  >Revision</span>\r\n          <span class=\"chipdetail ml-1 ml-1\" style=\"background-color: #FA983A;\"\r\n                *ngIf=\"designData.isoutsourced == 'true'\">Wattmonk</span>\r\n\r\n\r\n        </p>\r\n\r\n        <p style=\"margin:0px\">\r\n            <span class=\"customer-email\" \r\n                    routerDirection=\"forward\">{{designData.email}}</span>\r\n                    <span *ngIf=\"designData.isoverdue\" class=\"latebystyle\"><strong>Late by {{designData.lateby}}</strong></span>\r\n\r\n        </p>\r\n        <p style=\"margin:0px\">\r\n                  <a href=\"tel:{{designData.phonenumber}}\" style=\"text-decoration: none;\" class=\"z-100\">\r\n                      <span class=\"customer-phone\">{{designData.phonenumber}}</span></a>\r\n                      <span class=\"recordupdatedon\">Updated {{designData.recordupdatedon}}</span>\r\n                    </p>\r\n                  <span class=\"customer-address z-100\"\r\n                          (click)=\"openAddressOnMap(designData.address,$event)\">{{(designData.address | slice:0:60) + (designData.address.length > 60 ? '...' : '')}}\r\n\r\n                               <ion-col>\r\n\r\n                                  </ion-col>\r\n\r\n                      </span>\r\n\r\n                  <ion-row style=\"margin-bottom: 0px;\" >\r\n                    <ion-col *ngIf=\"segments=='requesttype=permit&status=reviewassigned&status=reviewfailed&status=reviewpassed' && userData.role.type != 'clientsuperadmin' && userData.role.type !== 'clientadmin'\"  style=\"font-size: 0.8em;\">\r\n                      <span><strong>Assigned to : {{designData.reviewassignedto.firstname | titlecase}} {{designData.reviewassignedto.lastname | titlecase}}</strong></span>\r\n                  </ion-col>\r\n\r\n\r\n\r\n                  <ion-col *ngIf=\"designData.status == 'designassigned'&& userData.role.type!='clientsuperadmin' && userData.role.type!='clientadmin'\">\r\n                          <span *ngIf=\"designData.status == 'designassigned'\" style=\"float:right;text-align: right;\">\r\n                              {{designData.designremainingtime}}</span></ion-col>\r\n                              <ion-col *ngIf=\"designData.status == 'outsourced'\">\r\n                                  <span *ngIf=\"designData.status == 'outsourced'\" style=\"float:right;text-align: right;\">\r\n                                      {{designData.designacceptanceremainingtime}}</span></ion-col>\r\n                                      <ion-col *ngIf=\"designData.status == 'reviewassigned' && designData.reviewassignedto.id==userData.id\" style=\"color: #737373; font-size: 14px;\">\r\n                                          <span style=\"float: right;\">{{designData.reviewremainingtime}}</span>\r\n                                        </ion-col>\r\n                  </ion-row>\r\n\r\n                  <ion-row class=\"ion-no-margin ion-no-margin\">\r\n                    <ion-col style=\"padding-left:0px\" >\r\n                      <span class=\"chipdetail\" style=\"background-color: #95afc0;align-self: center;\" >{{designData?.source}}</span>\r\n                      <span class=\"chipdetail\" style=\"background-color: #95afc0;align-self: center;\" >{{designData?.jobtype=='pvbattery' ? 'PV + Battery' : designData?.jobtype}}</span>\r\n                  </ion-col>\r\n                      <ion-col *ngIf=\"segments=='requesttype=permit&status=created&status=outsourced&status=requestaccepted&status=requestdeclined' || segments=='requesttype=permit&status=created&status=outsourced&status=requestaccepted&&status=requestdeclined'\">\r\n                          <span *ngIf=\"designData.status == 'created' || (designData.status == 'requestaccepted' && (userData.role.type !== 'clientsuperadmin' && userData.role.type !== 'clientadmin')) \" style=\"float:right !important;\" class=\"ion-text-end action-button-color\" (click)=\"openDesigners(designData.id,designData,$event)\"\r\n                          >Assign</span>\r\n                          <span style=\"float: right;\">\r\n                              <ng-container *ngIf=\"userData.role.type !=='clientsuperadmin' && userData.role.type !== 'clientadmin'\">\r\n                                  <ion-col size=\"8\"  *ngIf=\"designData.status == 'outsourced'\"  class=\"ion-text-end action-button-color\" (click)=\"accept(designData.id,'requestaccepted',$event)\">\r\n                                     Accept\r\n                                  </ion-col>\r\n                                  <ion-col size=\"4\" *ngIf=\"designData.status == 'outsourced'\" style=\"color:#dc6e67;\"  class=\"ion-text-end\" (click)=\"decline(designData.id,$event)\">\r\n                                  On Hold\r\n                                  </ion-col>\r\n                              </ng-container>\r\n                          </span>\r\n\r\n                          <span  *ngIf=\"designData.status == 'requestdeclined' && (userData.role.type=='clientsuperadmin' || userData.role.type=='clientadmin')\" style=\"float:right !important;\" class=\"ion-text-end action-button-color\" (click)=\"directAssignToWattmonk(designData.id,$event)\"\r\n                          >Reassign</span>\r\n                      </ion-col>\r\n\r\n\r\n                      <ion-col *ngIf=\"segments=='requesttype=permit&status=designassigned'\">\r\n                          <span *ngIf= \"(designData.status =='designassigned') && userData.role.type !='clientsuperadmin' && userData.role.type !='clientadmin'\" (click)=\"openDesigners(designData.id,designData,$event)\" style=\"float:right !important\" class=\"ion-text-end action-button-color\"\r\n                          >Reassign</span>\r\n                      </ion-col>\r\n\r\n                      <ion-col size=\"12\" *ngIf=\"segments=='requesttype=permit&status=designcompleted'\">\r\n                          <!-- <span *ngIf=\"(designData.isoutsourced=='true' && designData.outsourcedcompany=='Wattmonk' && (userData.role.type=='wattmonkadmins'|| userData.role.type=='superadmin')) || (designData.isoutsourced=='false' && designData.outsourcedcompany==null && (userData.role.type=='wattmonkadmins'|| userData.role.type=='superadmin'|| userData.role.type=='clientsuperadmin'))\" style=\"float:right !important;\" class=\"ion-text-end action-button-color\" (click)=\"openAnalysts(designData.id,designData)\"\r\n                          >Assign Review</span> -->\r\n                          <span size=\"12\" *ngIf=\"userData.role.type !='clientsuperadmin' && userData.role.type != 'clientadmin'\" style=\"float:right !important;\" class=\"ion-text-end action-button-color\" (click)=\"selfAssign(designData.id,designData,$event)\"\r\n                          > &nbsp; Self Assign</span>\r\n\r\n                          <span *ngIf=\"userData.role.type !='clientsuperadmin' && userData.role.type != 'clientadmin'\" style=\"float:right !important;\" class=\"ion-text-end action-button-color\" (click)=\"openAnalysts(designData.id,designData,$event)\"\r\n                          >Assign Review</span>\r\n                      </ion-col>\r\n                      <ion-col *ngIf=\"segments=='requesttype=permit&status=reviewassigned&status=reviewfailed&status=reviewpassed' && userData.role.type != 'clientsuperadmin' && userData.role.type !== 'clientadmin'\" size=\"7\">\r\n                          <span *ngIf=\"designData.status =='reviewpassed'\" style=\"float:right !important;\" class=\"ion-text-end action-button-color\" (click)=\"openreviewPassed(designData.id,designData,$event)\"\r\n                          >  &nbsp; Deliver</span>\r\n                          <span *ngIf=\"userData.role.type!='clientsuperadmin' &&(designData.status =='reviewpassed'||designData.status=='reviewfailed'||designData.status=='reviewassigned')\" style=\"float:right !important;\" class=\"ion-text-end action-button-color\" (click)=\"openAnalysts(designData.id,designData,$event)\"\r\n                          >Reassign Review</span>\r\n                      </ion-col>\r\n\r\n                      <ion-col *ngIf=\"segments=='requesttype=permit&status=delivered'\">\r\n                        <span  style=\"float:right !important;\" class=\"ion-text-end action-button-color\" (click)=\"designDownload(designData,$event)\">\r\n                            <ion-icon name=\"cloud-download-outline\"></ion-icon></span>&nbsp;\r\n                          <span  style=\"float:right !important;margin-right: 8px;\" class=\"ion-text-end action-button-color\" (click)=\"shareWhatsapp(designData,$event)\">\r\n                              <ion-icon name=\"share-social-outline\"></ion-icon></span>&nbsp;\r\n                          <span style=\"float:right !important;margin-right: 8px;\" class=\"ion-text-end action-button-color\" (click)=\"shareViaEmails(designData.id,designData,$event)\">\r\n                              <ion-icon name=\"mail\" ></ion-icon></span>\r\n                              <span *ngIf=\"userData.role.type=='clientsuperadmin' || userData.role.type=='clientadmin'\" style=\"float:right !important;margin-right: 8px;\" class=\"ion-text-end action-button-color\" (click)=\"Resend(designData.id, designData.requesttype,$event)\">\r\n                                  Resend</span>\r\n                      </ion-col>\r\n                      <!-- <ion-col class=\"ion-no-margin ion-no-padding\">\r\n                          <ion-button class=\"ion-no-margin ion-no-padding\" fill=\"clear\" [routerLink]=\"['/surveyprocess/' + designData.id + '/' + designData.jobtype + '/' + designData.latitude + '/' + designData.longitude]\"\r\n                          routerDirection=\"forward\">\r\n                              Restart Survey\r\n                          </ion-button>\r\n                      </ion-col> -->\r\n                  </ion-row>\r\n                  <!-- <ion-progress-bar [value]=\"1\" mode=\"ios\" color=\"success\" class=\"progress-bar-height\"></ion-progress-bar> -->\r\n                    <!-- <span class=\"ion-text-end timestamp\"  routerDirection=\"forward\">\r\n                          {{designData.deliverydate | date: 'hh:mm a'}}\r\n\r\n              </span> -->\r\n          </ion-card>\r\n          </ion-col>\r\n      </ion-row>\r\n      <!-- </ion-virtual-scroll> -->\r\n\r\n\r\n\r\n      <!-- <ion-row>\r\n          <ion-col size=\"12\" style=\"height: 100px;\">\r\n\r\n          </ion-col>\r\n      </ion-row>  -->\r\n    </ion-grid>\r\n    <ng-template #nodesignFound>\r\n        <div *ngIf=\"listOfDesignsHelper.length === 0 \" class=\"h-100 d-flex flex-column align-center justify-center\">\r\n                <!-- <div *ngIf=\"!netSwitch\"> -->\r\n\r\n                  {{noDesignFound}}\r\n                <!-- </div> -->\r\n\r\n            <ion-img src=\"/assets/images/blank.png\" class=\"placeholder\"></ion-img>\r\n        </div>\r\n    </ng-template>\r\n\r\n    <ion-infinite-scroll (ionInfinite)=\"doInfinite($event)\" >\r\n        <ion-infinite-scroll-content\r\n          loadingSpinner=\"bubbles\"\r\n         >\r\n        </ion-infinite-scroll-content>\r\n      </ion-infinite-scroll>\r\n\r\n</ion-content>\r\n\r\n<ion-bottom-drawer [(state)]=\"drawerState\" [minimumHeight]=\"0\" [dockedHeight]=\"320\" [draggable]=\"false\" [disableDrag]=\"true\"\r\n             [shouldBounce]=\"true\" [distanceTop]=\"0\" class=\"drawer\" style=\"z-index: 9999 !important;\">\r\n<form [formGroup]=\"assignForm\">\r\n  <ion-grid class=\"drawer\">\r\n      <ion-row>\r\n         <ion-col size=\"12\">\r\n              <app-user-selector  (assigneeData)=getassignedata($event) placeholder=\"Assign\" [assignees]=\"listOfAssignees\"  [reviewAssigned]=reviewAssignedTo\r\n                                 formControlName=\"assignedto\"></app-user-selector>\r\n\r\n          </ion-col>\r\n      </ion-row>\r\n      <!--<ion-row style=\"margin-left: 8px;\">\r\n          <ion-col size=\"12\">\r\n              <span class=\"input-placeholder\">comments</span>\r\n          </ion-col>\r\n          <ion-col size=\"12\" style=\"padding-top: 0px;\">\r\n              <ion-textarea style=\"max-width: 98%;\" class=\"ion-no-margin ion-no-padding comment_box\" rows=\"3\"\r\n                            formControlName=\"comment\"></ion-textarea>\r\n          </ion-col>\r\n      </ion-row>-->\r\n      <ion-row style=\"justify-content: flex-end;\">\r\n          <ion-col size=\"auto\" style=\"padding-top: 0px; margin-right: 6px;\">\r\n              <ion-button class=\"buttom-drawer-button\" fill=\"clear\" (click)=\"assignToDesigner()\">\r\n                  Confirm\r\n              </ion-button>\r\n          </ion-col>\r\n          <ion-col size=\"auto\">\r\n              <ion-button class=\"buttom-drawer-button-cancel\" fill=\"clear\" (click)=\"dismissBottomSheet()\">\r\n                  Cancel\r\n              </ion-button>\r\n          </ion-col>\r\n      </ion-row>\r\n  </ion-grid>\r\n</form>\r\n\r\n</ion-bottom-drawer>\r\n");

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

/***/ }),

/***/ "nBMq":
/*!*********************************************************!*\
  !*** ./src/app/permithomepage/permithomepage.page.scss ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".custom-card {\n  display: flex !important;\n  flex-direction: column !important;\n  background: white !important;\n  border-radius: 4px !important;\n  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.3) !important;\n  padding: 8px 12px;\n}\n\n.customer-name {\n  font-size: 1em;\n  color: #434343;\n  font-weight: bold;\n  display: table;\n  margin: 0px;\n}\n\n.customer-email {\n  font-size: 0.8em;\n  color: #B4B4B4;\n}\n\n.customer-phone {\n  font-size: 0.8em;\n  color: #4272B9;\n}\n\n.customer-address {\n  margin-top: 4px;\n  margin-bottom: 6px;\n  font-size: 0.8em;\n  color: #4272B9;\n}\n\n.timestamp {\n  font-size: 0.7em;\n}\n\n.chipdetail {\n  display: inline;\n  vertical-align: middle;\n  background-color: #95afc0;\n  font-size: 0.6em;\n  padding: 4px 10px;\n  border-radius: 10px;\n  text-align: center;\n  color: #fff;\n}\n\n.cssclass {\n  --max-height:100% !important;\n}\n\nion-bottom-drawer {\n  --padding: 0 !important;\n  padding: 0 !important;\n  --background: #F3F3F3 !important;\n  background: #F3F3F3 !important;\n}\n\nion-bottom-drawer ion-content {\n  --background: #F3F3F3 !important;\n}\n\n.segment-btn {\n  font-size: 10px !important;\n}\n\n.latebystyle {\n  float: right;\n  font-size: 10px;\n  color: #3C78DB;\n}\n\n.imagebutton {\n  float: right;\n  margin-top: 0px;\n}\n\n.alertClass {\n  background-color: wheat;\n}\n\n.notification-icon {\n  width: 24px;\n  height: 24px;\n}\n\n.home {\n  font-size: 22px;\n  margin-left: 6px;\n}\n\n.notification-badge {\n  font-size: 10px;\n  margin-left: -15px;\n  margin-top: -20px;\n}\n\n.notification-padding {\n  position: relative;\n  padding: 4px;\n  font-size: 21px;\n}\n\n.badge {\n  width: 20px;\n  height: 20px;\n  position: absolute;\n  top: 0;\n  right: 0;\n  background: #3c78d8;\n  color: white;\n  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.5);\n  border-radius: 50%;\n  font-size: 0.6em;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: 1px solid white;\n}\n\nion-searchbar.custom {\n  --background: none;\n  --box-shadow: none;\n  background: white;\n  border-radius: 0.5em;\n  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);\n  max-height: 40px;\n}\n\n.titleTab {\n  text-align: center;\n  color: #898989;\n}\n\n.titleBorder {\n  width: 70px;\n  border-bottom: 3px solid #D9726D;\n  border-radius: 2px;\n}\n\n.cardText {\n  margin: 0px;\n}\n\n.card_detail {\n  margin: 0px;\n  color: #3960B8;\n}\n\n.tab {\n  padding-top: 1em;\n  padding-bottom: 1em;\n  padding-bottom: 1em;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.bottom-bar {\n  margin: 8px;\n  border-radius: 50px;\n  box-shadow: 0 -2px 8px 0 rgba(0, 0, 0, 0.1);\n  border: 2px solid white;\n  background: #FFFAEB;\n}\n\n.tabText {\n  margin-left: 8px;\n  font-size: 1em;\n}\n\n.tab-icon {\n  width: 24px;\n  height: 24px;\n}\n\n.fab-position {\n  bottom: 18px;\n}\n\n.ht_wt {\n  height: 62px;\n  width: 62px;\n}\n\nion-fab-button {\n  --border-width: 2px;\n  --border-style: solid;\n  --box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.3);\n  --border-color: white;\n  --background: #3c78d8;\n}\n\nion-tab-bar {\n  --border: none;\n}\n\nion-tab-button {\n  font-size: 1em;\n  --color: #9E9E9E;\n  --color-selected: #3c78d8;\n}\n\nion-tab-button[aria-selected=true] {\n  border-bottom: 3px solid #3c78d8;\n  border-bottom-left-radius: 2px;\n  border-bottom-right-radius: 2px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXHBlcm1pdGhvbWVwYWdlLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLHdCQUFBO0VBQ0EsaUNBQUE7RUFDQSw0QkFBQTtFQUNBLDZCQUFBO0VBQ0EscURBQUE7RUFDQSxpQkFBQTtBQUNKOztBQUVFO0VBQ0UsY0FBQTtFQUNBLGNBQUE7RUFDQSxpQkFBQTtFQUNBLGNBQUE7RUFDQSxXQUFBO0FBQ0o7O0FBRUU7RUFDRSxnQkFBQTtFQUNBLGNBQUE7QUFDSjs7QUFFRTtFQUNFLGdCQUFBO0VBQ0EsY0FBQTtBQUNKOztBQUVFO0VBQ0UsZUFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxjQUFBO0FBQ0o7O0FBTUU7RUFDRSxnQkFBQTtBQUhKOztBQU9FO0VBQ0UsZUFBQTtFQUNBLHNCQUFBO0VBQ0EseUJBQUE7RUFDQSxnQkFBQTtFQUNBLGlCQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtFQUNBLFdBQUE7QUFKSjs7QUFNRTtFQUNFLDRCQUFBO0FBSEo7O0FBa0JFO0VBRUUsdUJBQUE7RUFDQSxxQkFBQTtFQUVBLGdDQUFBO0VBQ0EsOEJBQUE7QUFqQko7O0FBbUJJO0VBQ0UsZ0NBQUE7QUFqQk47O0FBc0JNO0VBQ0UsMEJBQUE7QUFuQlI7O0FBc0JNO0VBQ0UsWUFBQTtFQUNBLGVBQUE7RUFDQSxjQUFBO0FBbkJSOztBQXNCRTtFQUNFLFlBQUE7RUFDQSxlQUFBO0FBbkJKOztBQXNCRTtFQUNFLHVCQUFBO0FBbkJKOztBQXFCQTtFQUNJLFdBQUE7RUFDQSxZQUFBO0FBbEJKOztBQXFCQTtFQUNJLGVBQUE7RUFDQSxnQkFBQTtBQWxCSjs7QUFxQkE7RUFDSSxlQUFBO0VBQ0Esa0JBQUE7RUFDQSxpQkFBQTtBQWxCSjs7QUFxQkE7RUFDSSxrQkFBQTtFQUNBLFlBQUE7RUFDQSxlQUFBO0FBbEJKOztBQXNCQTtFQUNJLFdBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxNQUFBO0VBQ0EsUUFBQTtFQUNBLG1CQUFBO0VBQ0EsWUFBQTtFQUNBLDBDQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsdUJBQUE7QUFuQko7O0FBc0JBO0VBQ0ksa0JBQUE7RUFDQSxrQkFBQTtFQUNBLGlCQUFBO0VBQ0Esb0JBQUE7RUFDQSwwQ0FBQTtFQUNBLGdCQUFBO0FBbkJKOztBQXVCQTtFQUNJLGtCQUFBO0VBQ0EsY0FBQTtBQXBCSjs7QUF3QkE7RUFDSSxXQUFBO0VBQ0EsZ0NBQUE7RUFDQSxrQkFBQTtBQXJCSjs7QUF3QkE7RUFDSSxXQUFBO0FBckJKOztBQXdCQTtFQUNJLFdBQUE7RUFDQSxjQUFBO0FBckJKOztBQXdCQTtFQUNJLGdCQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0FBckJKOztBQXdCQTtFQUNJLFdBQUE7RUFDQSxtQkFBQTtFQUNBLDJDQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtBQXJCSjs7QUF3QkE7RUFDSSxnQkFBQTtFQUNBLGNBQUE7QUFyQko7O0FBd0JBO0VBQ0ksV0FBQTtFQUNBLFlBQUE7QUFyQko7O0FBd0JBO0VBQ0ksWUFBQTtBQXJCSjs7QUF3QkE7RUFDRSxZQUFBO0VBQ0EsV0FBQTtBQXJCRjs7QUF3QkE7RUFDSSxtQkFBQTtFQUNBLHFCQUFBO0VBQ0EsNENBQUE7RUFDQSxxQkFBQTtFQUNBLHFCQUFBO0FBckJKOztBQXdCQTtFQUNJLGNBQUE7QUFyQko7O0FBd0JBO0VBQ0ksY0FBQTtFQUNBLGdCQUFBO0VBQ0EseUJBQUE7QUFyQko7O0FBd0JBO0VBQ0ksZ0NBQUE7RUFDQSw4QkFBQTtFQUNBLCtCQUFBO0FBckJKIiwiZmlsZSI6InBlcm1pdGhvbWVwYWdlLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jdXN0b20tY2FyZCB7XHJcbiAgICBkaXNwbGF5OiBmbGV4ICFpbXBvcnRhbnQ7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uICFpbXBvcnRhbnQ7XHJcbiAgICBiYWNrZ3JvdW5kOiB3aGl0ZSAhaW1wb3J0YW50O1xyXG4gICAgYm9yZGVyLXJhZGl1czogNHB4ICFpbXBvcnRhbnQ7XHJcbiAgICBib3gtc2hhZG93OiAwIDFweCAycHggMCByZ2JhKDAsIDAsIDAsIDAuMykgIWltcG9ydGFudDtcclxuICAgIHBhZGRpbmc6IDhweCAxMnB4O1xyXG4gIH1cclxuXHJcbiAgLmN1c3RvbWVyLW5hbWUge1xyXG4gICAgZm9udC1zaXplOiAxZW07XHJcbiAgICBjb2xvcjogIzQzNDM0MztcclxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gICAgZGlzcGxheTp0YWJsZTtcclxuICAgIG1hcmdpbjogMHB4O1xyXG4gIH1cclxuXHJcbiAgLmN1c3RvbWVyLWVtYWlsIHtcclxuICAgIGZvbnQtc2l6ZTogMC44ZW07XHJcbiAgICBjb2xvcjogI0I0QjRCNDtcclxuICB9XHJcblxyXG4gIC5jdXN0b21lci1waG9uZSB7XHJcbiAgICBmb250LXNpemU6IDAuOGVtO1xyXG4gICAgY29sb3I6ICM0MjcyQjk7XHJcbiAgfVxyXG5cclxuICAuY3VzdG9tZXItYWRkcmVzcyB7XHJcbiAgICBtYXJnaW4tdG9wOiA0cHg7XHJcbiAgICBtYXJnaW4tYm90dG9tOiA2cHg7XHJcbiAgICBmb250LXNpemU6IDAuOGVtO1xyXG4gICAgY29sb3I6ICM0MjcyQjk7XHJcbiAgfVxyXG5cclxuICAucGxhY2Vob2xkZXIge1xyXG4gICAgLy8gd2lkdGg6IDUwdncgIWltcG9ydGFudDtcclxuICB9XHJcblxyXG4gIC50aW1lc3RhbXAge1xyXG4gICAgZm9udC1zaXplOiAwLjdlbTtcclxuXHJcbiAgfVxyXG5cclxuICAuY2hpcGRldGFpbHtcclxuICAgIGRpc3BsYXk6IGlubGluZTtcclxuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjOTVhZmMwO1xyXG4gICAgZm9udC1zaXplOiAwLjZlbTtcclxuICAgIHBhZGRpbmc6IDRweCAxMHB4O1xyXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIGNvbG9yOiAjZmZmO1xyXG4gIH1cclxuICAuY3NzY2xhc3N7XHJcbiAgICAtLW1heC1oZWlnaHQgOjEwMCUgIWltcG9ydGFudDtcclxuICAgIC8vIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIC8vIGRpc3BsYXk6IGJsb2NrO1xyXG4gIH1cclxuXHJcblxyXG4gIC8vLmRyYXdlciB7XHJcbiAgLy8gIGJhY2tncm91bmQ6ICNGM0YzRjM7XHJcbiAgLy8gIC0tYmFja2dyb3VuZDogI0YzRjNGMztcclxuICAvL31cclxuICAvL1xyXG4gIC8vLmlvbi1ib3R0b20tZHJhd2VyLXNjcm9sbGFibGUtY29udGVudCB7XHJcbiAgLy8gIGJhY2tncm91bmQ6ICNGM0YzRjMgIWltcG9ydGFudDtcclxuICAvL31cclxuXHJcbiAgaW9uLWJvdHRvbS1kcmF3ZXIge1xyXG5cclxuICAgIC0tcGFkZGluZzogMCAhaW1wb3J0YW50O1xyXG4gICAgcGFkZGluZzogMCAhaW1wb3J0YW50O1xyXG5cclxuICAgIC0tYmFja2dyb3VuZDogI0YzRjNGMyAhaW1wb3J0YW50O1xyXG4gICAgYmFja2dyb3VuZDogI0YzRjNGMyAhaW1wb3J0YW50O1xyXG5cclxuICAgIGlvbi1jb250ZW50IHtcclxuICAgICAgLS1iYWNrZ3JvdW5kOiAjRjNGM0YzICFpbXBvcnRhbnQ7XHJcbiAgICB9XHJcblxyXG5cclxuICB9XHJcbiAgICAgIC5zZWdtZW50LWJ0bntcclxuICAgICAgICBmb250LXNpemU6IDEwcHggIWltcG9ydGFudDtcclxuICAgICAgfVxyXG5cclxuICAgICAgLmxhdGVieXN0eWxle1xyXG4gICAgICAgIGZsb2F0OiByaWdodDtcclxuICAgICAgICBmb250LXNpemU6IDEwcHg7XHJcbiAgICAgICAgY29sb3I6ICMzQzc4REI7XHJcbiAgICAgIH1cclxuXHJcbiAgLmltYWdlYnV0dG9ue1xyXG4gICAgZmxvYXQ6cmlnaHQ7XHJcbiAgICBtYXJnaW4tdG9wOiAwcHg7XHJcbiAgfVxyXG5cclxuICAuYWxlcnRDbGFzc3tcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHdoZWF0O1xyXG4gIH1cclxuLm5vdGlmaWNhdGlvbi1pY29uIHtcclxuICAgIHdpZHRoOiAyNHB4O1xyXG4gICAgaGVpZ2h0OiAyNHB4O1xyXG59XHJcblxyXG4uaG9tZXtcclxuICAgIGZvbnQtc2l6ZTogMjJweDtcclxuICAgIG1hcmdpbi1sZWZ0OiA2cHg7XHJcbn1cclxuXHJcbi5ub3RpZmljYXRpb24tYmFkZ2Uge1xyXG4gICAgZm9udC1zaXplOiAxMHB4O1xyXG4gICAgbWFyZ2luLWxlZnQ6IC0xNXB4O1xyXG4gICAgbWFyZ2luLXRvcDogLTIwcHg7XHJcbn1cclxuXHJcbi5ub3RpZmljYXRpb24tcGFkZGluZyB7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICBwYWRkaW5nOiA0cHg7XHJcbiAgICBmb250LXNpemU6IDIxcHg7XHJcbn1cclxuXHJcblxyXG4uYmFkZ2Uge1xyXG4gICAgd2lkdGg6IDIwcHg7XHJcbiAgICBoZWlnaHQ6IDIwcHg7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICB0b3A6IDA7XHJcbiAgICByaWdodDogMDtcclxuICAgIGJhY2tncm91bmQ6ICMzYzc4ZDg7XHJcbiAgICBjb2xvcjogd2hpdGU7XHJcbiAgICBib3gtc2hhZG93OiAwIDFweCAzcHggMCByZ2JhKDAsIDAsIDAsIDAuNSk7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgICBmb250LXNpemU6IDAuNmVtO1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkIHdoaXRlO1xyXG59XHJcblxyXG5pb24tc2VhcmNoYmFyLmN1c3RvbSB7XHJcbiAgICAtLWJhY2tncm91bmQ6IG5vbmU7XHJcbiAgICAtLWJveC1zaGFkb3c6IG5vbmU7XHJcbiAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcclxuICAgIGJvcmRlci1yYWRpdXM6IDAuNWVtO1xyXG4gICAgYm94LXNoYWRvdzogMCAxcHggM3B4IDAgcmdiYSgwLCAwLCAwLCAwLjEpO1xyXG4gICAgbWF4LWhlaWdodDogNDBweDtcclxufVxyXG5cclxuXHJcbi50aXRsZVRhYiB7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBjb2xvcjogIzg5ODk4OTtcclxuICAgIC8vICAgICBib3JkZXItYm90dG9tOiAycHggc29saWQgI0Q5NzI2RDtcclxufVxyXG5cclxuLnRpdGxlQm9yZGVyIHtcclxuICAgIHdpZHRoOiA3MHB4O1xyXG4gICAgYm9yZGVyLWJvdHRvbTogM3B4IHNvbGlkICNEOTcyNkQ7XHJcbiAgICBib3JkZXItcmFkaXVzOiAycHg7XHJcbn1cclxuXHJcbi5jYXJkVGV4dCB7XHJcbiAgICBtYXJnaW46IDBweDtcclxufVxyXG5cclxuLmNhcmRfZGV0YWlsIHtcclxuICAgIG1hcmdpbjogMHB4O1xyXG4gICAgY29sb3I6ICMzOTYwQjg7XHJcbn1cclxuXHJcbi50YWIge1xyXG4gICAgcGFkZGluZy10b3A6IDFlbTtcclxuICAgIHBhZGRpbmctYm90dG9tOiAxZW07XHJcbiAgICBwYWRkaW5nLWJvdHRvbTogMWVtO1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxufVxyXG5cclxuLmJvdHRvbS1iYXIge1xyXG4gICAgbWFyZ2luOiA4cHg7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1MHB4O1xyXG4gICAgYm94LXNoYWRvdzogMCAtMnB4IDhweCAwIHJnYmEoMCwgMCwgMCwgMC4xKTtcclxuICAgIGJvcmRlcjogMnB4IHNvbGlkIHdoaXRlO1xyXG4gICAgYmFja2dyb3VuZDogI0ZGRkFFQjtcclxufVxyXG5cclxuLnRhYlRleHQge1xyXG4gICAgbWFyZ2luLWxlZnQ6IDhweDtcclxuICAgIGZvbnQtc2l6ZTogMWVtO1xyXG59XHJcblxyXG4udGFiLWljb24ge1xyXG4gICAgd2lkdGg6IDI0cHg7XHJcbiAgICBoZWlnaHQ6IDI0cHg7XHJcbn1cclxuXHJcbi5mYWItcG9zaXRpb24ge1xyXG4gICAgYm90dG9tOiAxOHB4O1xyXG59XHJcblxyXG4uaHRfd3R7XHJcbiAgaGVpZ2h0OjYycHg7XHJcbiAgd2lkdGg6NjJweDtcclxufVxyXG5cclxuaW9uLWZhYi1idXR0b24ge1xyXG4gICAgLS1ib3JkZXItd2lkdGg6IDJweDtcclxuICAgIC0tYm9yZGVyLXN0eWxlOiBzb2xpZDtcclxuICAgIC0tYm94LXNoYWRvdzogMCAwcHggOHB4IDAgcmdiYSgwLCAwLCAwLCAwLjMpO1xyXG4gICAgLS1ib3JkZXItY29sb3I6IHdoaXRlO1xyXG4gICAgLS1iYWNrZ3JvdW5kOiAjM2M3OGQ4O1xyXG59XHJcblxyXG5pb24tdGFiLWJhciB7XHJcbiAgICAtLWJvcmRlcjogbm9uZTtcclxufVxyXG5cclxuaW9uLXRhYi1idXR0b24ge1xyXG4gICAgZm9udC1zaXplOiAxZW07XHJcbiAgICAtLWNvbG9yOiAjOUU5RTlFO1xyXG4gICAgLS1jb2xvci1zZWxlY3RlZDogIzNjNzhkODtcclxufVxyXG5cclxuaW9uLXRhYi1idXR0b25bYXJpYS1zZWxlY3RlZD10cnVlXSB7XHJcbiAgICBib3JkZXItYm90dG9tOiAzcHggc29saWQgIzNjNzhkODtcclxuICAgIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDJweDtcclxuICAgIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAycHg7XHJcbn1cclxuIl19 */");

/***/ }),

/***/ "te5A":
/*!**************************************************************************!*\
  !*** ./node_modules/@ionic-native/file-opener/__ivy_ngcc__/ngx/index.js ***!
  \**************************************************************************/
/*! exports provided: FileOpener */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FileOpener", function() { return FileOpener; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ionic_native_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic-native/core */ "C6fG");




var FileOpener = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(FileOpener, _super);
    function FileOpener() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FileOpener.prototype.open = function (filePath, fileMIMEType) { return Object(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["cordova"])(this, "open", { "callbackStyle": "object", "successName": "success", "errorName": "error" }, arguments); };
    FileOpener.prototype.uninstall = function (packageId) { return Object(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["cordova"])(this, "uninstall", { "callbackStyle": "object", "successName": "success", "errorName": "error" }, arguments); };
    FileOpener.prototype.appIsInstalled = function (packageId) { return Object(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["cordova"])(this, "appIsInstalled", { "callbackStyle": "object", "successName": "success", "errorName": "error" }, arguments); };
    FileOpener.prototype.showOpenWithDialog = function (filePath, fileMIMEType) { return Object(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["cordova"])(this, "showOpenWithDialog", { "callbackStyle": "object", "successName": "success", "errorName": "error" }, arguments); };
    FileOpener.pluginName = "FileOpener";
    FileOpener.plugin = "cordova-plugin-file-opener2";
    FileOpener.pluginRef = "cordova.plugins.fileOpener2";
    FileOpener.repo = "https://github.com/pwlin/cordova-plugin-file-opener2";
    FileOpener.platforms = ["Android", "iOS", "Windows", "Windows Phone 8"];
FileOpener.ɵfac = function FileOpener_Factory(t) { return ɵFileOpener_BaseFactory(t || FileOpener); };
FileOpener.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: FileOpener, factory: function (t) { return FileOpener.ɵfac(t); } });
var ɵFileOpener_BaseFactory = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetInheritedFactory"](FileOpener);
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](FileOpener, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"]
    }], null, null); })();
    return FileOpener;
}(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["IonicNativePlugin"]));


//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9AaW9uaWMtbmF0aXZlL3BsdWdpbnMvZmlsZS1vcGVuZXIvbmd4L2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sOEJBQXNDLE1BQU0sb0JBQW9CLENBQUM7O0FBQ3hFO0FBSVUsSUE0QnNCLDhCQUFpQjtBQUFDO0FBR2hEO0FBQ2lDO0FBQU0sSUFRdkMseUJBQUksYUFBQyxRQUFnQixFQUFFLFlBQW9CO0FBTzNCLElBT2hCLDhCQUFTLGFBQUMsU0FBaUI7QUFPdEIsSUFPTCxtQ0FBYyxhQUFDLFNBQWlCO0FBTVgsSUFTckIsdUNBQWtCLGFBQUMsUUFBZ0IsRUFBRSxZQUFvQjtBQUk4QztBQUEwQztBQUF1RDtBQUEwRDtBQUE4RTs4Q0E1RGpWLFVBQVU7Ozs7OzBCQUNMO0FBQUMscUJBbENQO0FBQUUsRUFrQzhCLGlCQUFpQjtBQUNoRCxTQURZLFVBQVU7QUFBSSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvcmRvdmEsIElvbmljTmF0aXZlUGx1Z2luLCBQbHVnaW4gfSBmcm9tICdAaW9uaWMtbmF0aXZlL2NvcmUnO1xuXG4vKipcbiAqIEBuYW1lIEZpbGUgT3BlbmVyXG4gKiBAZGVzY3JpcHRpb25cbiAqIFRoaXMgcGx1Z2luIHdpbGwgb3BlbiBhIGZpbGUgb24geW91ciBkZXZpY2UgZmlsZSBzeXN0ZW0gd2l0aCBpdHMgZGVmYXVsdCBhcHBsaWNhdGlvbi5cbiAqXG4gKiBAdXNhZ2VcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGltcG9ydCB7IEZpbGVPcGVuZXIgfSBmcm9tICdAaW9uaWMtbmF0aXZlL2ZpbGUtb3BlbmVyL25neCc7XG4gKlxuICogY29uc3RydWN0b3IocHJpdmF0ZSBmaWxlT3BlbmVyOiBGaWxlT3BlbmVyKSB7IH1cbiAqXG4gKiAuLi5cbiAqXG4gKiB0aGlzLmZpbGVPcGVuZXIub3BlbigncGF0aC90by9maWxlLnBkZicsICdhcHBsaWNhdGlvbi9wZGYnKVxuICogICAudGhlbigoKSA9PiBjb25zb2xlLmxvZygnRmlsZSBpcyBvcGVuZWQnKSlcbiAqICAgLmNhdGNoKGUgPT4gY29uc29sZS5sb2coJ0Vycm9yIG9wZW5pbmcgZmlsZScsIGUpKTtcbiAqXG4gKiB0aGlzLmZpbGVPcGVuZXIuc2hvd09wZW5XaXRoRGlhbG9nKCdwYXRoL3RvL2ZpbGUucGRmJywgJ2FwcGxpY2F0aW9uL3BkZicpXG4gKiAgIC50aGVuKCgpID0+IGNvbnNvbGUubG9nKCdGaWxlIGlzIG9wZW5lZCcpKVxuICogICAuY2F0Y2goZSA9PiBjb25zb2xlLmxvZygnRXJyb3Igb3BlbmluZyBmaWxlJywgZSkpO1xuICpcbiAqIGBgYFxuICovXG5AUGx1Z2luKHtcbiAgcGx1Z2luTmFtZTogJ0ZpbGVPcGVuZXInLFxuICBwbHVnaW46ICdjb3Jkb3ZhLXBsdWdpbi1maWxlLW9wZW5lcjInLFxuICBwbHVnaW5SZWY6ICdjb3Jkb3ZhLnBsdWdpbnMuZmlsZU9wZW5lcjInLFxuICByZXBvOiAnaHR0cHM6Ly9naXRodWIuY29tL3B3bGluL2NvcmRvdmEtcGx1Z2luLWZpbGUtb3BlbmVyMicsXG4gIHBsYXRmb3JtczogWydBbmRyb2lkJywgJ2lPUycsICdXaW5kb3dzJywgJ1dpbmRvd3MgUGhvbmUgOCddLFxufSlcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBGaWxlT3BlbmVyIGV4dGVuZHMgSW9uaWNOYXRpdmVQbHVnaW4ge1xuICAvKipcbiAgICogT3BlbiBhbiBmaWxlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBmaWxlUGF0aCBGaWxlIFBhdGhcbiAgICogQHBhcmFtIHtzdHJpbmd9IGZpbGVNSU1FVHlwZSBGaWxlIE1JTUUgVHlwZVxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fVxuICAgKi9cbiAgQENvcmRvdmEoe1xuICAgIGNhbGxiYWNrU3R5bGU6ICdvYmplY3QnLFxuICAgIHN1Y2Nlc3NOYW1lOiAnc3VjY2VzcycsXG4gICAgZXJyb3JOYW1lOiAnZXJyb3InLFxuICB9KVxuICBvcGVuKGZpbGVQYXRoOiBzdHJpbmcsIGZpbGVNSU1FVHlwZTogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvKipcbiAgICogVW5pbnN0YWxscyBhIHBhY2thZ2VcbiAgICogQHBhcmFtIHtzdHJpbmd9IHBhY2thZ2VJZCBQYWNrYWdlIElEXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XG4gICAqL1xuICBAQ29yZG92YSh7XG4gICAgY2FsbGJhY2tTdHlsZTogJ29iamVjdCcsXG4gICAgc3VjY2Vzc05hbWU6ICdzdWNjZXNzJyxcbiAgICBlcnJvck5hbWU6ICdlcnJvcicsXG4gIH0pXG4gIHVuaW5zdGFsbChwYWNrYWdlSWQ6IHN0cmluZyk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIGFuIGFwcCBpcyBhbHJlYWR5IGluc3RhbGxlZFxuICAgKiBAcGFyYW0ge3N0cmluZ30gcGFja2FnZUlkIFBhY2thZ2UgSURcbiAgICogQHJldHVybnMge1Byb21pc2U8YW55Pn1cbiAgICovXG4gIEBDb3Jkb3ZhKHtcbiAgICBjYWxsYmFja1N0eWxlOiAnb2JqZWN0JyxcbiAgICBzdWNjZXNzTmFtZTogJ3N1Y2Nlc3MnLFxuICAgIGVycm9yTmFtZTogJ2Vycm9yJyxcbiAgfSlcbiAgYXBwSXNJbnN0YWxsZWQocGFja2FnZUlkOiBzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8qKlxuICAgKiBPcGVucyB3aXRoIHN5c3RlbSBtb2RhbCB0byBvcGVuIGZpbGUgd2l0aCBhbiBhbHJlYWR5IGluc3RhbGxlZCBhcHAuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBmaWxlUGF0aCBGaWxlIFBhdGhcbiAgICogQHBhcmFtIHtzdHJpbmd9IGZpbGVNSU1FVHlwZSBGaWxlIE1JTUUgVHlwZVxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fVxuICAgKi9cbiAgQENvcmRvdmEoe1xuICAgIGNhbGxiYWNrU3R5bGU6ICdvYmplY3QnLFxuICAgIHN1Y2Nlc3NOYW1lOiAnc3VjY2VzcycsXG4gICAgZXJyb3JOYW1lOiAnZXJyb3InLFxuICB9KVxuICBzaG93T3BlbldpdGhEaWFsb2coZmlsZVBhdGg6IHN0cmluZywgZmlsZU1JTUVUeXBlOiBzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybjtcbiAgfVxufVxuIl19

/***/ })

}]);
//# sourceMappingURL=permithomepage-permithomepage-module.js.map