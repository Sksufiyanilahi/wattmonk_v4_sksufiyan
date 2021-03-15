(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["peengineer-peengineer-module"],{

/***/ "7UzT":
/*!*************************************************!*\
  !*** ./src/app/peengineer/peengineer.page.scss ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".notification-icon {\n  width: 24px;\n  height: 24px;\n}\n\n.home {\n  font-size: 22px;\n  margin-left: 6px;\n}\n\n.notification-badge {\n  font-size: 10px;\n  margin-left: -15px;\n  margin-top: -20px;\n}\n\n.notification-padding {\n  position: relative;\n  padding: 8px;\n}\n\n.badge {\n  width: 20px;\n  height: 20px;\n  position: absolute;\n  top: 0;\n  right: 0;\n  background: #3c78d8;\n  color: white;\n  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.5);\n  border-radius: 50%;\n  font-size: 0.6em;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: 1px solid white;\n}\n\nion-searchbar.custom {\n  --background: none;\n  --box-shadow: none;\n  background: white;\n  border-radius: 0.5em;\n  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);\n  max-height: 40px;\n}\n\n.titleTab {\n  text-align: center;\n  color: #898989;\n}\n\n.titleBorder {\n  width: 70px;\n  border-bottom: 3px solid #D9726D;\n  border-radius: 2px;\n}\n\n.cardText {\n  margin: 0px;\n}\n\n.card_detail {\n  margin: 0px;\n  color: #3960B8;\n}\n\n.tab {\n  padding-top: 1em;\n  padding-bottom: 1em;\n  padding-bottom: 1em;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.bottom-bar {\n  margin: 8px;\n  border-radius: 50px;\n  box-shadow: 0 -2px 8px 0 rgba(0, 0, 0, 0.1);\n  border: 2px solid white;\n  background: #FFFAEB;\n}\n\n.tabText {\n  margin-left: 8px;\n  font-size: 1em;\n}\n\n.tab-icon {\n  width: 24px;\n  height: 24px;\n}\n\n.fab-position {\n  bottom: 18px;\n}\n\n.ht_wt {\n  height: 62px;\n  width: 62px;\n}\n\nion-fab-button {\n  --border-width: 2px;\n  --border-style: solid;\n  --box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.3);\n  --border-color: white;\n  --background: #3c78d8;\n}\n\nion-tab-bar {\n  --border: none;\n}\n\nion-tab-button {\n  font-size: 1em;\n  --color: #9E9E9E;\n  --color-selected: #3c78d8;\n}\n\nion-tab-button[aria-selected=true] {\n  border-bottom: 3px solid #3c78d8;\n  border-bottom-left-radius: 2px;\n  border-bottom-right-radius: 2px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXHBlZW5naW5lZXIucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsV0FBQTtFQUNBLFlBQUE7QUFDRjs7QUFFQTtFQUNFLGVBQUE7RUFDQSxnQkFBQTtBQUNGOztBQUVBO0VBQ0UsZUFBQTtFQUNBLGtCQUFBO0VBQ0EsaUJBQUE7QUFDRjs7QUFFQTtFQUNFLGtCQUFBO0VBQ0EsWUFBQTtBQUNGOztBQUdBO0VBQ0UsV0FBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLE1BQUE7RUFDQSxRQUFBO0VBQ0EsbUJBQUE7RUFDQSxZQUFBO0VBQ0EsMENBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSx1QkFBQTtBQUFGOztBQUdBO0VBQ0Usa0JBQUE7RUFDQSxrQkFBQTtFQUNBLGlCQUFBO0VBQ0Esb0JBQUE7RUFDQSwwQ0FBQTtFQUNBLGdCQUFBO0FBQUY7O0FBSUE7RUFDRSxrQkFBQTtFQUNBLGNBQUE7QUFERjs7QUFLQTtFQUNFLFdBQUE7RUFDQSxnQ0FBQTtFQUNBLGtCQUFBO0FBRkY7O0FBS0E7RUFDRSxXQUFBO0FBRkY7O0FBS0E7RUFDRSxXQUFBO0VBQ0EsY0FBQTtBQUZGOztBQUtBO0VBQ0UsZ0JBQUE7RUFDQSxtQkFBQTtFQUNBLG1CQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7QUFGRjs7QUFLQTtFQUNFLFdBQUE7RUFDQSxtQkFBQTtFQUNBLDJDQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtBQUZGOztBQUtBO0VBQ0UsZ0JBQUE7RUFDQSxjQUFBO0FBRkY7O0FBS0E7RUFDRSxXQUFBO0VBQ0EsWUFBQTtBQUZGOztBQUtBO0VBQ0UsWUFBQTtBQUZGOztBQUtBO0VBQ0EsWUFBQTtFQUNBLFdBQUE7QUFGQTs7QUFLQTtFQUNFLG1CQUFBO0VBQ0EscUJBQUE7RUFDQSw0Q0FBQTtFQUNBLHFCQUFBO0VBQ0EscUJBQUE7QUFGRjs7QUFLQTtFQUNFLGNBQUE7QUFGRjs7QUFLQTtFQUNFLGNBQUE7RUFDQSxnQkFBQTtFQUNBLHlCQUFBO0FBRkY7O0FBS0E7RUFDRSxnQ0FBQTtFQUNBLDhCQUFBO0VBQ0EsK0JBQUE7QUFGRiIsImZpbGUiOiJwZWVuZ2luZWVyLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5ub3RpZmljYXRpb24taWNvbiB7XHJcbiAgd2lkdGg6IDI0cHg7XHJcbiAgaGVpZ2h0OiAyNHB4O1xyXG59XHJcblxyXG4uaG9tZXtcclxuICBmb250LXNpemU6IDIycHg7XHJcbiAgbWFyZ2luLWxlZnQ6IDZweDtcclxufVxyXG5cclxuLm5vdGlmaWNhdGlvbi1iYWRnZSB7XHJcbiAgZm9udC1zaXplOiAxMHB4O1xyXG4gIG1hcmdpbi1sZWZ0OiAtMTVweDtcclxuICBtYXJnaW4tdG9wOiAtMjBweDtcclxufVxyXG5cclxuLm5vdGlmaWNhdGlvbi1wYWRkaW5nIHtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgcGFkZGluZzogOHB4O1xyXG59XHJcblxyXG5cclxuLmJhZGdlIHtcclxuICB3aWR0aDogMjBweDtcclxuICBoZWlnaHQ6IDIwcHg7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIHRvcDogMDtcclxuICByaWdodDogMDtcclxuICBiYWNrZ3JvdW5kOiAjM2M3OGQ4O1xyXG4gIGNvbG9yOiB3aGl0ZTtcclxuICBib3gtc2hhZG93OiAwIDFweCAzcHggMCByZ2JhKDAsIDAsIDAsIDAuNSk7XHJcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG4gIGZvbnQtc2l6ZTogMC42ZW07XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkIHdoaXRlO1xyXG59XHJcblxyXG5pb24tc2VhcmNoYmFyLmN1c3RvbSB7XHJcbiAgLS1iYWNrZ3JvdW5kOiBub25lO1xyXG4gIC0tYm94LXNoYWRvdzogbm9uZTtcclxuICBiYWNrZ3JvdW5kOiB3aGl0ZTtcclxuICBib3JkZXItcmFkaXVzOiAwLjVlbTtcclxuICBib3gtc2hhZG93OiAwIDFweCAzcHggMCByZ2JhKDAsIDAsIDAsIDAuMSk7XHJcbiAgbWF4LWhlaWdodDogNDBweDtcclxufVxyXG5cclxuXHJcbi50aXRsZVRhYiB7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIGNvbG9yOiAjODk4OTg5O1xyXG4gIC8vICAgICBib3JkZXItYm90dG9tOiAycHggc29saWQgI0Q5NzI2RDtcclxufVxyXG5cclxuLnRpdGxlQm9yZGVyIHtcclxuICB3aWR0aDogNzBweDtcclxuICBib3JkZXItYm90dG9tOiAzcHggc29saWQgI0Q5NzI2RDtcclxuICBib3JkZXItcmFkaXVzOiAycHg7XHJcbn1cclxuXHJcbi5jYXJkVGV4dCB7XHJcbiAgbWFyZ2luOiAwcHg7XHJcbn1cclxuXHJcbi5jYXJkX2RldGFpbCB7XHJcbiAgbWFyZ2luOiAwcHg7XHJcbiAgY29sb3I6ICMzOTYwQjg7XHJcbn1cclxuXHJcbi50YWIge1xyXG4gIHBhZGRpbmctdG9wOiAxZW07XHJcbiAgcGFkZGluZy1ib3R0b206IDFlbTtcclxuICBwYWRkaW5nLWJvdHRvbTogMWVtO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxufVxyXG5cclxuLmJvdHRvbS1iYXIge1xyXG4gIG1hcmdpbjogOHB4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDUwcHg7XHJcbiAgYm94LXNoYWRvdzogMCAtMnB4IDhweCAwIHJnYmEoMCwgMCwgMCwgMC4xKTtcclxuICBib3JkZXI6IDJweCBzb2xpZCB3aGl0ZTtcclxuICBiYWNrZ3JvdW5kOiAjRkZGQUVCO1xyXG59XHJcblxyXG4udGFiVGV4dCB7XHJcbiAgbWFyZ2luLWxlZnQ6IDhweDtcclxuICBmb250LXNpemU6IDFlbTtcclxufVxyXG5cclxuLnRhYi1pY29uIHtcclxuICB3aWR0aDogMjRweDtcclxuICBoZWlnaHQ6IDI0cHg7XHJcbn1cclxuXHJcbi5mYWItcG9zaXRpb24ge1xyXG4gIGJvdHRvbTogMThweDtcclxufVxyXG5cclxuLmh0X3d0e1xyXG5oZWlnaHQ6NjJweDtcclxud2lkdGg6NjJweDtcclxufVxyXG5cclxuaW9uLWZhYi1idXR0b24ge1xyXG4gIC0tYm9yZGVyLXdpZHRoOiAycHg7XHJcbiAgLS1ib3JkZXItc3R5bGU6IHNvbGlkO1xyXG4gIC0tYm94LXNoYWRvdzogMCAwcHggOHB4IDAgcmdiYSgwLCAwLCAwLCAwLjMpO1xyXG4gIC0tYm9yZGVyLWNvbG9yOiB3aGl0ZTtcclxuICAtLWJhY2tncm91bmQ6ICMzYzc4ZDg7XHJcbn1cclxuXHJcbmlvbi10YWItYmFyIHtcclxuICAtLWJvcmRlcjogbm9uZTtcclxufVxyXG5cclxuaW9uLXRhYi1idXR0b24ge1xyXG4gIGZvbnQtc2l6ZTogMWVtO1xyXG4gIC0tY29sb3I6ICM5RTlFOUU7XHJcbiAgLS1jb2xvci1zZWxlY3RlZDogIzNjNzhkODtcclxufVxyXG5cclxuaW9uLXRhYi1idXR0b25bYXJpYS1zZWxlY3RlZD10cnVlXSB7XHJcbiAgYm9yZGVyLWJvdHRvbTogM3B4IHNvbGlkICMzYzc4ZDg7XHJcbiAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogMnB4O1xyXG4gIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAycHg7XHJcbn0iXX0= */");

/***/ }),

/***/ "Ar9c":
/*!***************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/peengineer/peengineer.page.html ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-content>\r\n    <!-- <ion-header class=\"ion-no-border white-bg\" style=\"position: relative;\">\r\n        <ion-toolbar> -->\r\n    <ion-grid>\r\n        <ion-row class=\"ion-align-items-center\">\r\n        <ion-toolbar>\r\n        <ion-buttons slot=\"start\">\r\n            <ion-menu-button></ion-menu-button>\r\n          </ion-buttons>\r\n        <ion-row class=\"ion-align-items-center\">\r\n            <ion-col >\r\n                <h1 class=\"ion-no-padding ion-no-margin home\">\r\n                    PE Engineer</h1>\r\n            </ion-col>\r\n            <!-- <ion-col *ngIf=\"showSearchBar === true\" >\r\n                <ion-searchbar debounce=\"0\" placeholder=\"home\" class=\"custom\"></ion-searchbar>\r\n            </ion-col> -->\r\n            <ion-col size=\"auto\" >\r\n                <div class=\"notification-padding\" (click)=\"searchbar()\">\r\n                    <ion-img src=\"/assets/images/icons8-search.svg\" class=\"notification-icon\"></ion-img>\r\n                </div>\r\n            </ion-col>\r\n            <ion-col size=\"auto\" style=\"position: relative;\">\r\n                <div class=\"notification-padding\" [routerLink]=\"['/notification']\" routerDirection=\"forward\" (click)=\"setzero()\">\r\n                    <ion-img src=\"/assets/images/notification.svg\" class=\"notification-icon\"></ion-img>\r\n                   <span class=\"badge\" *ngIf=\"unreadCount > 0\">\r\n                                {{unreadCount > 99 ? '99+' : unreadCount}}\r\n                            </span>\r\n                </div>\r\n            </ion-col>\r\n        </ion-row>\r\n    </ion-toolbar>\r\n    </ion-row>\r\n    </ion-grid>\r\n  \r\n  \r\n  </ion-content>\r\n  \r\n  <ion-tabs style=\"margin-top: 52px\">\r\n      <ion-tab-bar class=\"ion-no-border\">\r\n          <ion-tab-button tab=\"pestamp-design\">\r\n              <!-- <ion-label>Designs</ion-label> -->\r\n          </ion-tab-button>\r\n      </ion-tab-bar>\r\n  </ion-tabs>\r\n  <!-- <router-outlet></router-outlet> -->\r\n  \r\n  \r\n  \r\n  \r\n  <!-- <ion-footer class=\"ion-no-border white-bg\" *ngIf=\"showFooter\">\r\n    <div class=\"position-relative\">\r\n        <ion-fab horizontal=\"start\" class=\"fab-position position-absolute\">\r\n            <ion-fab-button (click)=\"scheduledPage()\" [disabled]='!netSwitch' routerDirection=\"forward\" mode=\"md\" class=\"ht_wt\">\r\n                <ion-icon name=\"add\"></ion-icon>\r\n            </ion-fab-button>\r\n        </ion-fab> -->\r\n        <!-- <ion-grid class=\"bottom-bar ion-no-margin ion-no-padding\">\r\n            <ion-row>\r\n                <ion-col size=\"4\">\r\n                    <div class=\"tab\">\r\n                        <ion-img src=\"/assets/images/home-outline.svg\" class=\"tab-icon\"></ion-img>\r\n                        <span class=\"tabText\">Home</span>\r\n                    </div>\r\n                </ion-col>\r\n                <ion-col size=\"4\" [routerLink]=\"['/groups']\">\r\n                    <div class=\"tab\">\r\n                        <ion-img src=\"/assets/images/message-outline.svg\" class=\"tab-icon\"></ion-img>\r\n                        <span class=\"tabText\">Messages</span>\r\n                    </div>\r\n                </ion-col>\r\n                <ion-col size=\"4\" [routerLink]=\"['/profile']\" routerDirection=\"forward\">\r\n                    <div class=\"tab\">\r\n                        <ion-img src=\"/assets/images/account-outline.svg\" class=\"tab-icon\"></ion-img>\r\n                        <span class=\"tabText\">Profile</span>\r\n                    </div>\r\n                </ion-col>\r\n            </ion-row>\r\n        </ion-grid> -->\r\n    <!-- </div>\r\n  \r\n  </ion-footer> -->\r\n  \r\n  ");

/***/ }),

/***/ "DHjX":
/*!*********************************************************!*\
  !*** ./src/app/peengineer/peengineer-routing.module.ts ***!
  \*********************************************************/
/*! exports provided: PEengineerPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PEengineerPageRoutingModule", function() { return PEengineerPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _peengineer_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./peengineer.page */ "ZxSS");
/* harmony import */ var _peengineerdesign_peengineerdesign_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./peengineerdesign/peengineerdesign.component */ "siDr");





const routes = [
    {
        path: '',
        component: _peengineer_page__WEBPACK_IMPORTED_MODULE_3__["PEengineerPage"],
        children: [
            {
                path: 'engineer',
                component: _peengineerdesign_peengineerdesign_component__WEBPACK_IMPORTED_MODULE_4__["PEengineerdesignComponent"]
            }
        ]
    }
];
let PEengineerPageRoutingModule = class PEengineerPageRoutingModule {
};
PEengineerPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], PEengineerPageRoutingModule);



/***/ }),

/***/ "Zhyi":
/*!*******************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/peengineer/peengineerdesign/peengineerdesign.component.html ***!
  \*******************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-segment scrollable (ionChange)=\"segmentChanged($event)\" value=\"InStamping\" mode=\"md\">\r\n  <ion-segment-button value=\"InStamping\">\r\n    <ion-label class=\"segment-btn\">In Stamping</ion-label>\r\n  </ion-segment-button>\r\n  <ion-segment-button value=\"completed\">\r\n    <ion-label class=\"segment-btn\">Completed</ion-label>\r\n  </ion-segment-button>\r\n  <ion-segment-button value=\"delivered\">\r\n    <ion-label class=\"segment-btn\">Delivered</ion-label>\r\n  </ion-segment-button>\r\n</ion-segment>\r\n<ion-content (click)=\"close()\" style=\"padding-bottom: 250px;position: sticky;\">\r\n  <ion-refresher slot=\"fixed\" (ionRefresh)=\"refreshDesigns($event)\">\r\n    <ion-refresher-content></ion-refresher-content>\r\n  </ion-refresher>\r\n<ion-grid *ngIf=\"listOfDesignsHelper.length !== 0 ;else nodesignFound\">\r\n\r\n          <ion-row *ngFor=\"let item of listOfDesignsHelper;let i = index\">\r\n      \r\n        <ion-col *ngFor=\"let designData of item.listOfDesigns;let j = index;trackBy: trackdesign\" size=\"12\">\r\n            <ion-card class=\"ion-no-padding custom-card ion-no-margin\" style=\"height: 100%;\" (click)=\"gotoDetails(designData,$event)\">\r\n                <p class=\"customer-name\" *ngIf=\"designData.personname != null && designData.personname != ''\"\r\n                routerDirection=\"forward\">{{designData.personname}}\r\n            \r\n             \r\n              <span fill=\"clear\" background-border=\"clear\" (click)=\"gotoDetails(designData,$event)\" class=\"imagebutton\"  size=\"small\"  ><img src=\"/assets/images/activitylist.png\" style=\"height: 20px;\" /></span>\r\n              <ng-container *ngIf=\"designData?.chatid!==null && designData?.addedtogroupchat\">\r\n                <span fill=\"clear\" background-border=\"clear\" (click)=\"gotoChats(designData,$event)\" class=\"chatbutton\"  size=\"small\"  ><img  style= \"height:20px\" src=\"assets/images/chat.svg\" /></span>\r\n              </ng-container>\r\n\r\n      </p>\r\n      <p style=\"margin:0px\">\r\n        <span class=\"chipdetail ml-1 ml-1\" style=\"background-color: #FA983A;\" \r\n        *ngIf=\"designData.isoutsourced == 'true'\">Wattmonk</span>\r\n        <span class=\"chipdetail\" style=\"background-color: rgb(246, 77, 10);\" *ngIf=\"designData.status == 'declined'\"  >On Hold</span>\r\n        <span class=\"chipdetail\" style=\"background-color: #1289A7;;\" *ngIf=\"designData.status == 'assigned'\" >Assigned</span>\r\n      <span class=\"chipdetail\" style=\"background-color: rgb(109, 187, 26);\"   *ngIf=\" designData.acceptedbypeengineer==true && designData.status == 'assigned'\" >Accepted</span>\r\n      <span class=\"chipdetail\" style=\"background-color: rgb(109, 187, 26);padding: 4px 5px;\" *ngIf=\"designData.status == 'completed'\" ><ion-icon name=\"checkmark-done-outline\" style=\"color: #fff;\"></ion-icon></span>\r\n      <span class=\"chipdetail\" style=\"background-color: rgb(183,21,64)\" *ngIf=\"designData.isinrevisionstate\"  >Revision</span>\r\n      </p>\r\n\r\n      <p style=\"margin:0px\">\r\n          <span class=\"customer-email\" \r\n                  routerDirection=\"forward\">{{designData.email}}</span>\r\n                  <span *ngIf=\"designData.isoverdue\" class=\"latebystyle\"><strong>Late by {{designData.lateby}}</strong></span>\r\n\r\n      </p>\r\n      <p style=\"margin:0px\"  >\r\n                <a href=\"tel:{{designData.contactnumber}}\" style=\"text-decoration: none;\" class=\"z-100\">\r\n                    <span class=\"customer-phone\" *ngIf=\"designData.contactnumber != null && designData.contactnumber != ''\">{{designData.contactnumber}}</span></a>\r\n                    <span class=\"recordupdatedon\">Updated {{designData.recordupdatedon}}</span>\r\n                  </p>\r\n                <span class=\"customer-address z-100\" *ngIf=\"designData.deliveryaddress != null && designData.deliveryaddress != ''\" \r\n                        (click)=\"openAddressOnMap(designData.address,$event)\">{{(designData.deliveryaddress | slice:0:60) + (designData.deliveryaddress.length > 60 ? '...' : '')}}\r\n\r\n                             <ion-col>\r\n\r\n                                </ion-col>\r\n\r\n                    </span>\r\n                    <ion-col *ngIf=\"designData.status=='assigned' || designData.status=='completed' || designData.status=='delivered'\" style=\"font-size: 0.8em;padding-right: 0px;padding-bottom: 18px;\">\r\n                      <span style=\" float:right\"><strong>Assigned to : {{designData.assignedto.firstname | titlecase}} {{designData.assignedto.lastname | titlecase}}</strong></span>\r\n                      </ion-col>\r\n\r\n                  <ion-row class=\"ion-no-margin ion-no-margin\" style=\"margin-bottom: 0px;\">\r\n                   <ion-col style=\"padding-left:0px\" >\r\n                    <span class=\"chipdetail\"  style=\"background-color: #95afc0;align-self: center;\" >{{designData?.source}}</span>\r\n                    <span class=\"chipdetail\"  style=\"background-color: #95afc0;align-self: center;\" >{{designData?.propertytype}}</span>\r\n                    <span class=\"chipdetail\"  style=\"background-color: #95afc0;align-self: center;\" >{{designData?.type}}</span>\r\n                </ion-col>\r\n\r\n\r\n                \r\n                    <ion-col *ngIf=\"segments=='status=assigned&status=declined'\">\r\n                                   <span style=\"float: right;\">\r\n                            <ng-container *ngIf=\"designData.status == 'assigned' && (designData.acceptedbypeengineer==false && designData.declinedbypeengineer==false)\" >\r\n                                <ion-col size=\"8\" class=\"ion-text-end action-button-color\" (click)=\"accept(designData.id,'accepted',$event)\">\r\n                                   Accept\r\n                                </ion-col>\r\n                                <ion-col size=\"4\" style=\"color:#dc6e67;\" class=\"ion-text-end\" (click)=\"decline(designData.id,'pestamp',$event)\">\r\n                                On Hold\r\n                                </ion-col>\r\n                            </ng-container>\r\n                        </span>\r\n                    </ion-col>\r\n\r\n                    <ion-col *ngIf=\"segments=='status=completed' && userData.role.type != 'clientsuperadmin' && userData.role.type !== 'clientadmin'\">\r\n                      <span style=\"float:right !important;\" class=\"ion-text-end action-button-color\" (click)=\"openreviewPassed(designData.id,designData,$event)\"\r\n                      >  &nbsp; Deliver</span>\r\n                      <!-- <span (click)=\"openDesigners(designData.id,designData)\" style=\"float:right !important;\" class=\"ion-text-end action-button-color\"\r\n                      >Reassign</span> -->\r\n                      <!-- <span *ngIf=\"userData.role.type!='clientsuperadmin' &&(designData.status =='reviewpassed'||designData.status=='reviewfailed'||designData.status=='reviewassigned')\" style=\"float:right !important;\" class=\"ion-text-end action-button-color\" (click)=\"openAnalysts(designData.id,designData)\"\r\n                      >Reassign Review</span> -->\r\n                  </ion-col>\r\n\r\n\r\n \r\n                </ion-row>\r\n\r\n        </ion-card>\r\n        </ion-col>\r\n    </ion-row>\r\n  </ion-grid>\r\n  <ng-template #nodesignFound>\r\n      <div *ngIf=\"listOfDesignsHelper.length === 0 \" class=\"h-100 d-flex flex-column align-center justify-center\">\r\n        \r\n                  \r\n                {{noDesignFound}}\r\n    \r\n          <ion-img src=\"/assets/images/blank.png\" class=\"placeholder\"></ion-img>\r\n      </div>\r\n  </ng-template>\r\n\r\n    \r\n</ion-content>");

/***/ }),

/***/ "ZxSS":
/*!***********************************************!*\
  !*** ./src/app/peengineer/peengineer.page.ts ***!
  \***********************************************/
/*! exports provided: PEengineerPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PEengineerPage", function() { return PEengineerPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_peengineer_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./peengineer.page.html */ "Ar9c");
/* harmony import */ var _peengineer_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./peengineer.page.scss */ "7UzT");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../api.service */ "yTNM");
/* harmony import */ var _contants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../contants */ "6qqZ");
/* harmony import */ var _networkdetect_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../networkdetect.service */ "UZ2B");
/* harmony import */ var _utilities_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../utilities.service */ "oTnF");
/* harmony import */ var _ionic_native_in_app_browser_ngx__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ionic-native/in-app-browser/ngx */ "m/P+");
/* harmony import */ var _storage_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../storage.service */ "qkCY");












let PEengineerPage = class PEengineerPage {
    constructor(network, platform, route, apiService, utils, iab, storageService) {
        this.network = network;
        this.platform = platform;
        this.route = route;
        this.apiService = apiService;
        this.utils = utils;
        this.iab = iab;
        this.storageService = storageService;
        this.version = _contants__WEBPACK_IMPORTED_MODULE_7__["version"];
        this.showSearchBar = false;
        this.showFooter = true;
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
        this.route.navigate(['peengineer/engineer']);
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
        this.route.navigate(['/pestamp-schedule']);
    }
    ngOndestroy() {
        this.deactivateNetworkSwitch.unsubscribe();
    }
};
PEengineerPage.ctorParameters = () => [
    { type: _networkdetect_service__WEBPACK_IMPORTED_MODULE_8__["NetworkdetectService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["Platform"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
    { type: _api_service__WEBPACK_IMPORTED_MODULE_6__["ApiService"] },
    { type: _utilities_service__WEBPACK_IMPORTED_MODULE_9__["UtilitiesService"] },
    { type: _ionic_native_in_app_browser_ngx__WEBPACK_IMPORTED_MODULE_10__["InAppBrowser"] },
    { type: _storage_service__WEBPACK_IMPORTED_MODULE_11__["StorageService"] }
];
PEengineerPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-peengineer',
        template: _raw_loader_peengineer_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_peengineer_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], PEengineerPage);



/***/ }),

/***/ "kRU8":
/*!*************************************************!*\
  !*** ./src/app/peengineer/peengineer.module.ts ***!
  \*************************************************/
/*! exports provided: PEengineerPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PEengineerPageModule", function() { return PEengineerPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _peengineer_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./peengineer-routing.module */ "DHjX");
/* harmony import */ var _peengineer_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./peengineer.page */ "ZxSS");
/* harmony import */ var _ionic_native_launch_navigator_ngx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic-native/launch-navigator/ngx */ "fGQ8");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../shared/shared.module */ "PCNd");
/* harmony import */ var _peengineerdesign_peengineerdesign_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./peengineerdesign/peengineerdesign.component */ "siDr");
/* harmony import */ var _ionic_native_local_notifications_ngx__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ionic-native/local-notifications/ngx */ "Bg0J");
/* harmony import */ var _ionic_native_chooser_ngx__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ionic-native/chooser/ngx */ "UWV4");
/* harmony import */ var _ionic_native_file_ngx__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ionic-native/file/ngx */ "FAH8");
/* harmony import */ var _ionic_native_network_ngx__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @ionic-native/network/ngx */ "kwrG");
/* harmony import */ var _ionic_native_file_transfer_ngx__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @ionic-native/file-transfer/ngx */ "B7Rs");















let PEengineerPageModule = class PEengineerPageModule {
};
PEengineerPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _peengineer_routing_module__WEBPACK_IMPORTED_MODULE_5__["PEengineerPageRoutingModule"],
            _shared_shared_module__WEBPACK_IMPORTED_MODULE_8__["SharedModule"]
        ],
        declarations: [_peengineer_page__WEBPACK_IMPORTED_MODULE_6__["PEengineerPage"], _peengineerdesign_peengineerdesign_component__WEBPACK_IMPORTED_MODULE_9__["PEengineerdesignComponent"]],
        providers: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["DatePipe"],
            _ionic_native_launch_navigator_ngx__WEBPACK_IMPORTED_MODULE_7__["LaunchNavigator"],
            _ionic_native_chooser_ngx__WEBPACK_IMPORTED_MODULE_11__["Chooser"],
            _ionic_native_file_ngx__WEBPACK_IMPORTED_MODULE_12__["File"],
            _ionic_native_network_ngx__WEBPACK_IMPORTED_MODULE_13__["Network"],
            _ionic_native_file_transfer_ngx__WEBPACK_IMPORTED_MODULE_14__["FileTransfer"],
            _ionic_native_local_notifications_ngx__WEBPACK_IMPORTED_MODULE_10__["LocalNotifications"]
        ]
    })
], PEengineerPageModule);



/***/ }),

/***/ "nybW":
/*!*****************************************************************************!*\
  !*** ./src/app/peengineer/peengineerdesign/peengineerdesign.component.scss ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".custom-card {\n  display: flex !important;\n  flex-direction: column !important;\n  background: white !important;\n  border-radius: 4px !important;\n  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.3) !important;\n  padding: 8px 12px;\n}\n\n.customer-name {\n  font-size: 1em;\n  color: #434343;\n  font-weight: bold;\n  display: table;\n  margin: 0px;\n}\n\n.customer-email {\n  font-size: 0.8em;\n  color: #B4B4B4;\n}\n\n.customer-phone {\n  font-size: 0.8em;\n  color: #4272B9;\n}\n\n.customer-address {\n  margin-top: 4px;\n  margin-bottom: 6px;\n  font-size: 0.8em;\n  color: #4272B9;\n}\n\n.timestamp {\n  font-size: 0.7em;\n}\n\n.chipdetail {\n  display: inline;\n  vertical-align: middle;\n  background-color: #95afc0;\n  font-size: 0.6em;\n  padding: 4px 10px;\n  border-radius: 10px;\n  text-align: center;\n  color: #fff;\n}\n\n.cssclass {\n  --max-height:100% !important;\n}\n\nion-bottom-drawer {\n  --padding: 0 !important;\n  padding: 0 !important;\n  --background: #F3F3F3 !important;\n  background: #F3F3F3 !important;\n}\n\nion-bottom-drawer ion-content {\n  --background: #F3F3F3 !important;\n}\n\n.segment-btn {\n  font-size: 10px !important;\n}\n\n.latebystyle {\n  float: right;\n  font-size: 10px;\n  color: #3C78DB;\n}\n\n.recordupdatedon {\n  float: right;\n  font-size: 10px;\n  font-style: italic;\n}\n\n.imagebutton {\n  float: right;\n  margin-top: 0px;\n}\n\n.alertClass {\n  background-color: wheat;\n}\n\n.chatbutton {\n  float: right;\n  margin-top: 0px;\n  margin-right: 5px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFxwZWVuZ2luZWVyZGVzaWduLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0Usd0JBQUE7RUFDQSxpQ0FBQTtFQUNBLDRCQUFBO0VBQ0EsNkJBQUE7RUFDQSxxREFBQTtFQUNBLGlCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxjQUFBO0VBQ0EsY0FBQTtFQUNBLGlCQUFBO0VBQ0EsY0FBQTtFQUNBLFdBQUE7QUFDRjs7QUFFQTtFQUNFLGdCQUFBO0VBQ0EsY0FBQTtBQUNGOztBQUVBO0VBQ0UsZ0JBQUE7RUFDQSxjQUFBO0FBQ0Y7O0FBRUE7RUFDRSxlQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLGNBQUE7QUFDRjs7QUFNQTtFQUNFLGdCQUFBO0FBSEY7O0FBT0E7RUFDRSxlQUFBO0VBQ0Esc0JBQUE7RUFDQSx5QkFBQTtFQUNBLGdCQUFBO0VBQ0EsaUJBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0VBQ0EsV0FBQTtBQUpGOztBQU1BO0VBQ0UsNEJBQUE7QUFIRjs7QUFrQkE7RUFFRSx1QkFBQTtFQUNBLHFCQUFBO0VBRUEsZ0NBQUE7RUFDQSw4QkFBQTtBQWpCRjs7QUFtQkU7RUFDRSxnQ0FBQTtBQWpCSjs7QUFzQkk7RUFDRSwwQkFBQTtBQW5CTjs7QUFzQkk7RUFDRSxZQUFBO0VBQ0EsZUFBQTtFQUNBLGNBQUE7QUFuQk47O0FBc0JJO0VBQ0UsWUFBQTtFQUNBLGVBQUE7RUFDQSxrQkFBQTtBQW5CTjs7QUFzQkE7RUFDRSxZQUFBO0VBQ0EsZUFBQTtBQW5CRjs7QUFzQkE7RUFDRSx1QkFBQTtBQW5CRjs7QUFxQkE7RUFDRSxZQUFBO0VBQ0EsZUFBQTtFQUNBLGlCQUFBO0FBbEJGIiwiZmlsZSI6InBlZW5naW5lZXJkZXNpZ24uY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuY3VzdG9tLWNhcmQge1xyXG4gIGRpc3BsYXk6IGZsZXggIWltcG9ydGFudDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uICFpbXBvcnRhbnQ7XHJcbiAgYmFja2dyb3VuZDogd2hpdGUgIWltcG9ydGFudDtcclxuICBib3JkZXItcmFkaXVzOiA0cHggIWltcG9ydGFudDtcclxuICBib3gtc2hhZG93OiAwIDFweCAycHggMCByZ2JhKDAsIDAsIDAsIDAuMykgIWltcG9ydGFudDtcclxuICBwYWRkaW5nOiA4cHggMTJweDtcclxufVxyXG5cclxuLmN1c3RvbWVyLW5hbWUge1xyXG4gIGZvbnQtc2l6ZTogMWVtO1xyXG4gIGNvbG9yOiAjNDM0MzQzO1xyXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gIGRpc3BsYXk6dGFibGU7XHJcbiAgbWFyZ2luOiAwcHg7XHJcbn1cclxuXHJcbi5jdXN0b21lci1lbWFpbCB7XHJcbiAgZm9udC1zaXplOiAwLjhlbTtcclxuICBjb2xvcjogI0I0QjRCNDtcclxufVxyXG5cclxuLmN1c3RvbWVyLXBob25lIHtcclxuICBmb250LXNpemU6IDAuOGVtO1xyXG4gIGNvbG9yOiAjNDI3MkI5O1xyXG59XHJcblxyXG4uY3VzdG9tZXItYWRkcmVzcyB7XHJcbiAgbWFyZ2luLXRvcDogNHB4O1xyXG4gIG1hcmdpbi1ib3R0b206IDZweDtcclxuICBmb250LXNpemU6IDAuOGVtO1xyXG4gIGNvbG9yOiAjNDI3MkI5O1xyXG59XHJcblxyXG4ucGxhY2Vob2xkZXIge1xyXG4gIC8vIHdpZHRoOiA1MHZ3ICFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbi50aW1lc3RhbXAge1xyXG4gIGZvbnQtc2l6ZTogMC43ZW07XHJcbiBcclxufVxyXG5cclxuLmNoaXBkZXRhaWx7XHJcbiAgZGlzcGxheTogaW5saW5lO1xyXG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzk1YWZjMDtcclxuICBmb250LXNpemU6IDAuNmVtO1xyXG4gIHBhZGRpbmc6IDRweCAxMHB4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIGNvbG9yOiAjZmZmO1xyXG59XHJcbi5jc3NjbGFzc3tcclxuICAtLW1heC1oZWlnaHQgOjEwMCUgIWltcG9ydGFudDtcclxuICAvLyBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgLy8gZGlzcGxheTogYmxvY2s7XHJcbn1cclxuXHJcblxyXG4vLy5kcmF3ZXIge1xyXG4vLyAgYmFja2dyb3VuZDogI0YzRjNGMztcclxuLy8gIC0tYmFja2dyb3VuZDogI0YzRjNGMztcclxuLy99XHJcbi8vXHJcbi8vLmlvbi1ib3R0b20tZHJhd2VyLXNjcm9sbGFibGUtY29udGVudCB7XHJcbi8vICBiYWNrZ3JvdW5kOiAjRjNGM0YzICFpbXBvcnRhbnQ7XHJcbi8vfVxyXG5cclxuaW9uLWJvdHRvbS1kcmF3ZXIge1xyXG5cclxuICAtLXBhZGRpbmc6IDAgIWltcG9ydGFudDtcclxuICBwYWRkaW5nOiAwICFpbXBvcnRhbnQ7XHJcblxyXG4gIC0tYmFja2dyb3VuZDogI0YzRjNGMyAhaW1wb3J0YW50O1xyXG4gIGJhY2tncm91bmQ6ICNGM0YzRjMgIWltcG9ydGFudDtcclxuXHJcbiAgaW9uLWNvbnRlbnQge1xyXG4gICAgLS1iYWNrZ3JvdW5kOiAjRjNGM0YzICFpbXBvcnRhbnQ7XHJcbiAgfVxyXG5cclxuICBcclxufVxyXG4gICAgLnNlZ21lbnQtYnRue1xyXG4gICAgICBmb250LXNpemU6IDEwcHggIWltcG9ydGFudDtcclxuICAgIH1cclxuXHJcbiAgICAubGF0ZWJ5c3R5bGV7XHJcbiAgICAgIGZsb2F0OiByaWdodDsgXHJcbiAgICAgIGZvbnQtc2l6ZTogMTBweDtcclxuICAgICAgY29sb3I6ICMzQzc4REI7XHJcbiAgICB9XHJcblxyXG4gICAgLnJlY29yZHVwZGF0ZWRvbntcclxuICAgICAgZmxvYXQ6IHJpZ2h0O1xyXG4gICAgICBmb250LXNpemU6IDEwcHg7XHJcbiAgICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcclxuICAgIH1cclxuXHJcbi5pbWFnZWJ1dHRvbntcclxuICBmbG9hdDpyaWdodDtcclxuICBtYXJnaW4tdG9wOiAwcHg7XHJcbn1cclxuXHJcbi5hbGVydENsYXNze1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHdoZWF0O1xyXG59XHJcbi5jaGF0YnV0dG9ue1xyXG4gIGZsb2F0OnJpZ2h0O1xyXG4gIG1hcmdpbi10b3A6IDBweDtcclxuICBtYXJnaW4tcmlnaHQ6NXB4O1xyXG59Il19 */");

/***/ }),

/***/ "siDr":
/*!***************************************************************************!*\
  !*** ./src/app/peengineer/peengineerdesign/peengineerdesign.component.ts ***!
  \***************************************************************************/
/*! exports provided: PEengineerdesignComponent, DesginDataHelper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PEengineerdesignComponent", function() { return PEengineerdesignComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DesginDataHelper", function() { return DesginDataHelper; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_peengineerdesign_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./peengineerdesign.component.html */ "Zhyi");
/* harmony import */ var _peengineerdesign_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./peengineerdesign.component.scss */ "nybW");
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
/* harmony import */ var src_app_pestampdelivermodal_pestampdelivermodal_page__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! src/app/pestampdelivermodal/pestampdelivermodal.page */ "9oDE");
/* harmony import */ var _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @cometchat-pro/cordova-ionic-chat */ "ujHh");
/* harmony import */ var _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_24___default = /*#__PURE__*/__webpack_require__.n(_cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_24__);
/* harmony import */ var src_app_contants__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! src/app/contants */ "6qqZ");
/* harmony import */ var src_app_utilities_mixpanel_service__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! src/app/utilities/mixpanel.service */ "uKCw");



























let PEengineerdesignComponent = class PEengineerdesignComponent {
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
        this.segments = "status=assigned&status=declined";
        this.noDesignFound = '';
        this.showBottomDraw = false;
        this.listOfAssignees = [];
        //listOfAssignees:any[];
        this.designId = 0;
        this.skip = 0;
        this.limit = 10;
        this.options = {
            start: '',
            app: this.launchNavigator.APP.GOOGLE_MAPS
        };
        this.userData = this.storageService.getUser();
        // if(this.userData.role.type=='peengineer'){
        //   this.segments= 'status=assigned&status=declined';
        // }
        // }else if(this.userData.role.type=='clientsuperadmin' || this.userData.role.name=='SuperAdmin' || this.userData.role.name=='ContractorSuperAdmin'){
        //   this.segments ='status=created&status=outsourced&status=accepted&&status=declined';
        // }
        const latestDate = new Date();
        this.today = datePipe.transform(latestDate, 'M/dd/yy');
        console.log('date', this.today);
        this.todaysdate = datePipe.transform(latestDate, 'yyyy-MM-dd');
        this.assignForm = this.formBuilder.group({
            assignedto: new _angular_forms__WEBPACK_IMPORTED_MODULE_11__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_11__["Validators"].required]),
            comment: new _angular_forms__WEBPACK_IMPORTED_MODULE_11__["FormControl"]('')
        });
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
        if (event.target.value == 'InStamping') {
            this.segments = "status=assigned&status=declined";
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
        this.chatIcon(list);
        console.log(this.listOfDesignsHelper);
        this.cdr.detectChanges();
    }
    ///chat icon
    chatIcon(list) {
        list.forEach(element => {
            var groupMembersRequest = new _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_24__["CometChat"].GroupMembersRequestBuilder(element.chatid)
                .setLimit(10)
                .build();
            groupMembersRequest.fetchNext().then(groupMembers => {
                console.log(groupMembers);
                element.addedtogroupchat = true;
            }, error => {
                console.log("Group Member list fetching failed with exception:", error);
            });
        });
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
                        this.utils.showSnackBar('successfully assigned to' + this.selectedPeEngineer.firstname + ' ' + this.selectedPeEngineer.lastname);
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
        // this.acceptid= id;
        this.mixpanelService.track("ACCEPT_PESTAMP_PAGE_OPEN", {});
        const postData = {
            acceptedbypeengineer: true,
            declinedbypeengineer: false
        };
        this.utils.showLoading("accepting").then(() => {
            this.apiService.assignPestamps(id, postData).subscribe((res) => {
                this.utils.hideLoading().then(() => {
                    this.utils.showSnackBar("PE stamp request has been accepted successfully.");
                    this.utils.setPeStampRefresh(true);
                });
            });
        });
    }
    openDesigners(id, designData) {
        debugger;
        this.listOfAssignees = [];
        console.log("this is", designData);
        this.designerData = designData;
        //this.reviewAssignedTo=designData.designassignedto;
        if ((this.userData.role.type == 'clientsuperadmin' || this.userData.role.type == 'clientadmin') && this.designerData.status == 'created') {
            //this.route.navigate(["pestamp-payment-modal",{id:id,designData:this.designerData.requesttype}])
            let objToSend = {
                queryParams: {
                    designData: designData
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
            this.mixpanelService.track("DECLINE_PESTAMP_PAGE_OPEN", {});
            let status = e;
            console.log(status);
            const modal = yield this.modalController.create({
                component: src_app_declinepage_declinepage_page__WEBPACK_IMPORTED_MODULE_15__["DeclinepagePage"],
                cssClass: 'my-custom-modal-css',
                componentProps: {
                    id: id,
                    value: status,
                    declinedbypeengineer: true
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
    openreviewPassed(id, designData) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.mixpanelService.track("DELIVER_PESTAMP_PAGE_OPEN", {});
            const modal = yield this.modalController.create({
                component: src_app_pestampdelivermodal_pestampdelivermodal_page__WEBPACK_IMPORTED_MODULE_23__["PestampdelivermodalPage"],
                cssClass: 'deliver-modal-css',
                componentProps: {
                    id: id,
                    designData: designData
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
    createChatGroup(design) {
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
    }
    // createNewDesignChatGroup(design:DesginDataModel) {
    //   var GUID = 'permit' + "_" + new Date().getTime();
    //   var address = design.address.substring(0, 60);
    //   var groupName = design.name + "_" + address;
    //   var groupType = CometChat.GROUP_TYPE.PRIVATE;
    //   var password = "";
    //   var group = new CometChat.Group(GUID, groupName, groupType, password);
    //   CometChat.createGroup(group).then(
    //     group => {
    //       let membersList = [
    //         new CometChat.GroupMember("" + design.createdby.id, CometChat.GROUP_MEMBER_SCOPE.ADMIN),
    //         new CometChat.GroupMember("" + this.userData.id, CometChat.GROUP_MEMBER_SCOPE.ADMIN)
    //       ];
    //       CometChat.addMembersToGroup(group.getGuid(), membersList, []).then(
    //         response => {
    //           if(design.requesttype == "permit"){
    //             let postdata={
    //               chatid:GUID
    //             }
    //             this.apiService.updateDesignForm(postdata,this.acceptid).subscribe(res=>{
    //               this.updatechat_id=true;
    //             })
    //             // this.updateItemInList(LISTTYPE.NEW, design);
    //           }else{
    //             // this.updateItemInPermitList(LISTTYPE.NEW, design);
    //           }
    //         },
    //         error => {
    //         }
    //       );
    //     },
    //     error => {
    //     }
    //   );
    // }
    //       addUserToGroupChat() {
    //         debugger;
    //       var GUID = this.designerData.chatid;
    //       var userscope = CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT;
    //       if (this.isclientassigning) {
    //         userscope = CometChat.GROUP_MEMBER_SCOPE.ADMIN;
    //       }
    //       let membersList = [
    //         new CometChat.GroupMember("" + this.selectedDesigner.id, userscope)
    //       ];
    //       CometChat.addMembersToGroup(GUID, membersList, []).then(
    //         response => {
    //         },
    //         error => {
    //         }
    //       );
    //       }
    setupCometChat() {
        let userId = this.storageService.getUserID();
        const user = new _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_24__["CometChat"].User(userId);
        user.setName(this.storageService.getUser().firstname + ' ' + this.storageService.getUser().lastname);
        const appSetting = new _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_24__["CometChat"].AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(src_app_contants__WEBPACK_IMPORTED_MODULE_25__["COMETCHAT_CONSTANTS"].REGION).build();
        _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_24__["CometChat"].init(src_app_contants__WEBPACK_IMPORTED_MODULE_25__["COMETCHAT_CONSTANTS"].APP_ID, appSetting).then(() => {
            console.log('Initialization completed successfully');
            // if(this.utilities.currentUserValue != null){
            // You can now call login function.
            _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_24__["CometChat"].login(userId, src_app_contants__WEBPACK_IMPORTED_MODULE_25__["COMETCHAT_CONSTANTS"].API_KEY).then((user) => {
                console.log('Login Successful:', { user });
            }, error => {
                console.log('Login failed with exception:', { error });
            });
            // }
        }, error => {
            console.log('Initialization failed with error:', error);
        });
    }
    directAssignToWattmonk(id) {
        // this.designId = id;
        // var postData = {};
        // var designacceptancestarttime = new Date();
        //     designacceptancestarttime.setMinutes(designacceptancestarttime.getMinutes() + 30);
        //       postData = {
        //         outsourcedto: 232,
        //         isoutsourced: "true",
        //         status: "outsourced",
        //         designacceptancestarttime: designacceptancestarttime
        //       };
        //       this.utils.showLoading('Assigning').then(()=>{
        //         this.apiService.updateDesignForm(postData, this.designId).subscribe((value) => {
        //           this.utils.hideLoading().then(()=>{
        //             ;
        //             console.log('reach ', value);
        //           //   if(this.userData.role.type==='clientsuperadmin' && this.designerData.status==='created')
        //           //  {
        //           //   this.utils.showSnackBar('Design request has been assigned to wattmonk successfully');
        //           //  }else{
        //             this.utils.showSnackBar('Design request has been reassigned to wattmonk successfully');
        //             //this.dismissBottomSheet();
        //             //this.showBottomDraw = false;
        //             this.utils.setHomepagePermitRefresh(true);
        //           })
        //         }, (error) => {
        //           this.utils.hideLoading();
        //          // this.dismissBottomSheet();
        //          // this.showBottomDraw = false;
        //         });
        //       })
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
PEengineerdesignComponent.ctorParameters = () => [
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
    { type: src_app_utilities_mixpanel_service__WEBPACK_IMPORTED_MODULE_26__["MixpanelService"] }
];
PEengineerdesignComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-peengineerdesign',
        template: _raw_loader_peengineerdesign_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_peengineerdesign_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], PEengineerdesignComponent);

class DesginDataHelper {
    constructor() {
        this.listOfDesigns = [];
    }
    shareDesign() {
    }
}


/***/ })

}]);
//# sourceMappingURL=peengineer-peengineer-module.js.map