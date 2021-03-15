(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["notification-notification-module"],{

/***/ "LcRc":
/*!*******************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/notification/notification.page.html ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\r\n  <ion-toolbar>\r\n    <ion-back-button slot=\"start\"></ion-back-button>\r\n    <ion-title>Notifications</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n  <ion-grid style=\"text-align: center;\">\r\n      <ion-spinner name=\"dots\" *ngIf=\"!showLoader\"></ion-spinner>\r\n   <ion-row *ngIf=\"notification.length>0;else noNotification\">\r\n     <ion-col class=\"padding_adjust\">\r\n       <!-- <ion-item  lines=\"none\" > -->\r\n         <ng-container  *ngFor=\"let notifications of notification\">\r\n\r\n           <ion-card class=\"ion-padding mg\" (click)=\"updateNotificationStatus(notifications.id)\" [ngClass]=\"notifications.status=='unread'? 'black': 'grey'\">\r\n             <span >\r\n               <img class=\"profile-icon\" src=\"/assets/images/icons8-checked.svg\">\r\n               \r\n               <p style=\"white-space: normal;font-size:14px !important;text-align: justify;margin: 0px;\">{{notifications.message}}\r\n                 <!-- <small style=\"color: mediumblue;float:right;\">.</small> -->\r\n               </p>\r\n            \r\n             </span>\r\n              <small style=\"float: right;\">{{notifications.created_at | date:'dd/MM/yyyy'}}</small>\r\n           </ion-card>\r\n         </ng-container>\r\n       <!-- </ion-item> -->\r\n     </ion-col>\r\n   </ion-row>\r\n   <ng-template #noNotification>\r\n     <ion-row>\r\n       <ion-col *ngIf=\"disableContent\" style=\"text-align: center;margin-top: 50%;\"> \r\n         No Notification Found\r\n       </ion-col>\r\n     </ion-row>\r\n   </ng-template>\r\n </ion-grid>\r\n</ion-content>\r\n");

/***/ }),

/***/ "TLzw":
/*!*****************************************************!*\
  !*** ./src/app/notification/notification.module.ts ***!
  \*****************************************************/
/*! exports provided: NotificationPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotificationPageModule", function() { return NotificationPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _notification_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./notification-routing.module */ "mhdW");
/* harmony import */ var _notification_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./notification.page */ "dOoZ");







let NotificationPageModule = class NotificationPageModule {
};
NotificationPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _notification_routing_module__WEBPACK_IMPORTED_MODULE_5__["NotificationPageRoutingModule"]
        ],
        declarations: [_notification_page__WEBPACK_IMPORTED_MODULE_6__["NotificationPage"]]
    })
], NotificationPageModule);



/***/ }),

/***/ "Z9r7":
/*!*****************************************************!*\
  !*** ./src/app/notification/notification.page.scss ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".profile-icon {\n  width: 50px;\n  height: 50px;\n  margin-right: 4px;\n  float: left;\n}\n\n.padding_adjust {\n  padding-left: 0px !important;\n  padding-right: 0px !important;\n}\n\n.mg {\n  margin-right: 4px;\n  margin-top: 4px;\n  margin-left: 4px;\n  margin-bottom: 4px;\n}\n\n.black {\n  color: #111;\n  background: #e9f1ff;\n}\n\n.grey {\n  color: #737373;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXG5vdGlmaWNhdGlvbi5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0E7RUFDSSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGlCQUFBO0VBQ0EsV0FBQTtBQUFKOztBQUlFO0VBQ0UsNEJBQUE7RUFDQSw2QkFBQTtBQURKOztBQUlFO0VBQ0ksaUJBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtBQUROOztBQUdFO0VBQ0ksV0FBQTtFQUNGLG1CQUFBO0FBQUo7O0FBRUU7RUFDSSxjQUFBO0FBQ04iLCJmaWxlIjoibm90aWZpY2F0aW9uLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4ucHJvZmlsZS1pY29ue1xyXG4gICAgd2lkdGg6IDUwcHg7XHJcbiAgICBoZWlnaHQ6IDUwcHg7XHJcbiAgICBtYXJnaW4tcmlnaHQ6IDRweDtcclxuICAgIGZsb2F0OiBsZWZ0O1xyXG4gICBcclxuICB9XHJcblxyXG4gIC5wYWRkaW5nX2FkanVzdHtcclxuICAgIHBhZGRpbmctbGVmdDogMHB4ICFpbXBvcnRhbnQ7XHJcbiAgICBwYWRkaW5nLXJpZ2h0OiAwcHggIWltcG9ydGFudDtcclxuICB9XHJcblxyXG4gIC5tZ3tcclxuICAgICAgbWFyZ2luLXJpZ2h0OiA0cHg7XHJcbiAgICAgIG1hcmdpbi10b3A6IDRweDtcclxuICAgICAgbWFyZ2luLWxlZnQ6IDRweDtcclxuICAgICAgbWFyZ2luLWJvdHRvbTogNHB4O1xyXG4gIH1cclxuICAuYmxhY2t7XHJcbiAgICAgIGNvbG9yOiMxMTE7XHJcbiAgICBiYWNrZ3JvdW5kOiAjZTlmMWZmO1xyXG4gIH1cclxuICAuZ3JleXtcclxuICAgICAgY29sb3I6IzczNzM3MztcclxuICB9Il19 */");

/***/ }),

/***/ "dOoZ":
/*!***************************************************!*\
  !*** ./src/app/notification/notification.page.ts ***!
  \***************************************************/
/*! exports provided: NotificationPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotificationPage", function() { return NotificationPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_notification_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./notification.page.html */ "LcRc");
/* harmony import */ var _notification_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./notification.page.scss */ "Z9r7");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../api.service */ "yTNM");
/* harmony import */ var _utilities_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utilities.service */ "oTnF");
/* harmony import */ var _utilities_mixpanel_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utilities/mixpanel.service */ "uKCw");







let NotificationPage = class NotificationPage {
    constructor(apiservice, utilities, mixpanelService) {
        this.apiservice = apiservice;
        this.utilities = utilities;
        this.mixpanelService = mixpanelService;
        this.notification = [];
        this.showLoader = false;
        this.disableContent = false;
    }
    ngOnInit() {
        this.mixpanelService.track("NOTIFICATION_PAGE_OPEN", {});
        this.getNotification();
    }
    getNotification() {
        this.apiservice.profileNotification().subscribe(res => {
            this.notification = res;
            this.showLoader = true;
            console.log(this.notification);
            console.log(this.notification.length);
            if (res !== []) {
                this.disableContent = true;
            }
        });
    }
    updateNotificationStatus(id) {
        let Notificationstatus = {
            status: 'read'
        };
        this.apiservice.updateNotification(id, Notificationstatus).subscribe(() => {
            this.getNotification();
        });
    }
    ionViewWillLeave() {
    }
};
NotificationPage.ctorParameters = () => [
    { type: _api_service__WEBPACK_IMPORTED_MODULE_4__["ApiService"] },
    { type: _utilities_service__WEBPACK_IMPORTED_MODULE_5__["UtilitiesService"] },
    { type: _utilities_mixpanel_service__WEBPACK_IMPORTED_MODULE_6__["MixpanelService"] }
];
NotificationPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-notification',
        template: _raw_loader_notification_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_notification_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], NotificationPage);



/***/ }),

/***/ "mhdW":
/*!*************************************************************!*\
  !*** ./src/app/notification/notification-routing.module.ts ***!
  \*************************************************************/
/*! exports provided: NotificationPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotificationPageRoutingModule", function() { return NotificationPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _notification_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./notification.page */ "dOoZ");




const routes = [
    {
        path: '',
        component: _notification_page__WEBPACK_IMPORTED_MODULE_3__["NotificationPage"]
    }
];
let NotificationPageRoutingModule = class NotificationPageRoutingModule {
};
NotificationPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], NotificationPageRoutingModule);



/***/ })

}]);
//# sourceMappingURL=notification-notification-module.js.map