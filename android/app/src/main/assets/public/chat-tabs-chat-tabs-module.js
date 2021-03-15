(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chat-tabs-chat-tabs-module"],{

/***/ "CZxu":
/*!*******************************************************!*\
  !*** ./src/app/chat-tabs/chat-tabs-routing.module.ts ***!
  \*******************************************************/
/*! exports provided: ChatTabsPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatTabsPageRoutingModule", function() { return ChatTabsPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _chat_tabs_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./chat-tabs.page */ "Tw/e");




const routes = [
    {
        path: 'chat',
        component: _chat_tabs_page__WEBPACK_IMPORTED_MODULE_3__["ChatTabsPage"],
        children: [
            {
                path: 'message',
                loadChildren: () => __webpack_require__.e(/*! import() | message-message-module */ "message-message-module").then(__webpack_require__.bind(null, /*! ./../message/message.module */ "3tpA")).then(m => m.MessagePageModule)
            },
            {
                path: 'groups',
                loadChildren: () => __webpack_require__.e(/*! import() | groups-groups-module */ "groups-groups-module").then(__webpack_require__.bind(null, /*! ./groups/groups.module */ "B0my")).then(m => m.GroupsPageModule)
            },
        ]
    }, {
        path: '',
        redirectTo: 'chat/groups',
        pathMatch: 'full'
    },
];
let ChatTabsPageRoutingModule = class ChatTabsPageRoutingModule {
};
ChatTabsPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], ChatTabsPageRoutingModule);



/***/ }),

/***/ "Dh0M":
/*!***********************************************!*\
  !*** ./src/app/chat-tabs/chat-tabs.module.ts ***!
  \***********************************************/
/*! exports provided: ChatTabsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatTabsPageModule", function() { return ChatTabsPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _chat_tabs_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./chat-tabs-routing.module */ "CZxu");
/* harmony import */ var _chat_tabs_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./chat-tabs.page */ "Tw/e");







let ChatTabsPageModule = class ChatTabsPageModule {
};
ChatTabsPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _chat_tabs_routing_module__WEBPACK_IMPORTED_MODULE_5__["ChatTabsPageRoutingModule"]
        ],
        declarations: [_chat_tabs_page__WEBPACK_IMPORTED_MODULE_6__["ChatTabsPage"]]
    })
], ChatTabsPageModule);



/***/ }),

/***/ "F87y":
/*!***********************************************!*\
  !*** ./src/app/chat-tabs/chat-tabs.page.scss ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjaGF0LXRhYnMucGFnZS5zY3NzIn0= */");

/***/ }),

/***/ "Tw/e":
/*!*********************************************!*\
  !*** ./src/app/chat-tabs/chat-tabs.page.ts ***!
  \*********************************************/
/*! exports provided: ChatTabsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatTabsPage", function() { return ChatTabsPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_chat_tabs_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./chat-tabs.page.html */ "j4vE");
/* harmony import */ var _chat_tabs_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./chat-tabs.page.scss */ "F87y");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");




let ChatTabsPage = class ChatTabsPage {
    constructor() { }
    ngOnInit() {
    }
};
ChatTabsPage.ctorParameters = () => [];
ChatTabsPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-chat-tabs',
        template: _raw_loader_chat_tabs_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_chat_tabs_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], ChatTabsPage);



/***/ }),

/***/ "j4vE":
/*!*************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/chat-tabs/chat-tabs.page.html ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- <ion-tabs>\r\n  <ion-tab-bar slot=\"bottom\">\r\n\r\n    <ion-tab-button tab=\"message\">\r\n      <ion-icon name=\"person\"></ion-icon>\r\n      <ion-label>Chats</ion-label>\r\n    </ion-tab-button>\r\n\r\n    <ion-tab-button tab=\"groups\">\r\n        <ion-icon name=\"people\"></ion-icon>\r\n        <ion-label>Groups</ion-label>\r\n      </ion-tab-button>\r\n\r\n  </ion-tab-bar>\r\n</ion-tabs> -->\r\n");

/***/ })

}]);
//# sourceMappingURL=chat-tabs-chat-tabs-module.js.map