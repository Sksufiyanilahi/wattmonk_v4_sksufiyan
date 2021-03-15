(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["message-message-module"],{

/***/ "3tpA":
/*!*******************************************!*\
  !*** ./src/app/message/message.module.ts ***!
  \*******************************************/
/*! exports provided: MessagePageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessagePageModule", function() { return MessagePageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _message_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./message-routing.module */ "DEAg");
/* harmony import */ var _message_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./message.page */ "46tz");







let MessagePageModule = class MessagePageModule {
};
MessagePageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _message_routing_module__WEBPACK_IMPORTED_MODULE_5__["MessagePageRoutingModule"]
        ],
        declarations: [_message_page__WEBPACK_IMPORTED_MODULE_6__["MessagePage"]]
    })
], MessagePageModule);



/***/ }),

/***/ "46tz":
/*!*****************************************!*\
  !*** ./src/app/message/message.page.ts ***!
  \*****************************************/
/*! exports provided: MessagePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessagePage", function() { return MessagePage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_message_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./message.page.html */ "Fyet");
/* harmony import */ var _message_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./message.page.scss */ "zaat");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _cometchat_pro_cordova_ionic_chat_CometChat__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @cometchat-pro/cordova-ionic-chat/CometChat */ "ujHh");
/* harmony import */ var _cometchat_pro_cordova_ionic_chat_CometChat__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_cometchat_pro_cordova_ionic_chat_CometChat__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _utilities_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utilities.service */ "oTnF");







let MessagePage = class MessagePage {
    constructor(navController, utilities) {
        this.navController = navController;
        this.utilities = utilities;
        this.conversations = [];
        this.userListArray = [];
    }
    ngOnInit() {
        this.conversationsRequest = new _cometchat_pro_cordova_ionic_chat_CometChat__WEBPACK_IMPORTED_MODULE_5__["CometChat"].ConversationsRequestBuilder()
            .setLimit(50)
            .setConversationType('user')
            .build();
        this.loadData(null);
    }
    goBack() {
        this.navController.pop();
    }
    loadData(event) {
        this.utilities.showLoading('Getting Conversations').then(() => {
            this.conversationsRequest.fetchNext().then((conversationList) => {
                this.utilities.hideLoading().then(() => {
                    // if(conversationList.length > 0){
                    //   CometChat.getUnreadMessageCountForAllUsers().then(array=>{
                    //     const unread  =Object.keys(array);
                    //     if(unread.length>0){
                    //       unread.map(uid=>{
                    //         const index= conversationList.findIndex(user=>user.uid===uid);
                    //         if(index !==-1){
                    //           conversationList[index].unreadCount = array[uid];
                    //         }
                    //       })
                    //     }
                    //     this.conversations = conversationList;
                    // console.log('UserList Array :', this.conversations);
                    //   })
                    // }
                    console.log('Conversations list received:', conversationList);
                    conversationList.forEach((item) => {
                        console.log('item', item);
                        this.conversations.push(item);
                    });
                    console.log(this.conversations);
                    if (event !== null) {
                        event.target.complete();
                    }
                });
            }, error => {
                this.utilities.hideLoading().then(() => {
                    if (event !== null) {
                        event.target.complete();
                    }
                    console.log('Conversations list fetching failed with error:', error);
                });
            });
        });
    }
    openConversation(conversation) {
        this.navController.navigateForward(['chat/' + conversation.getConversationWith().getUid()]);
    }
};
MessagePage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["NavController"] },
    { type: _utilities_service__WEBPACK_IMPORTED_MODULE_6__["UtilitiesService"] }
];
MessagePage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-message',
        template: _raw_loader_message_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_message_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], MessagePage);



/***/ }),

/***/ "DEAg":
/*!***************************************************!*\
  !*** ./src/app/message/message-routing.module.ts ***!
  \***************************************************/
/*! exports provided: MessagePageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessagePageRoutingModule", function() { return MessagePageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _message_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./message.page */ "46tz");




const routes = [
    {
        path: '',
        component: _message_page__WEBPACK_IMPORTED_MODULE_3__["MessagePage"]
    }
];
let MessagePageRoutingModule = class MessagePageRoutingModule {
};
MessagePageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], MessagePageRoutingModule);



/***/ }),

/***/ "Fyet":
/*!*********************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/message/message.page.html ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header class=\"ion-no-border\">\r\n    <ion-grid class=\"ion-padding-top ion-padding-start ion-padding-end header-bg\">\r\n        <ion-row>\r\n            <ion-col size=\"auto\">\r\n                <ion-button fill=\"clear\" size=\"small\" class=\"ion-no-padding\" (click)=\"goBack()\">\r\n                    <ion-img src=\"/assets/images/back.svg\" class=\"action-icon\"></ion-img>\r\n                </ion-button>\r\n            </ion-col>\r\n            <ion-col>\r\n                <ion-grid class=\"ion-align-items-center ion-justify-content-center\">\r\n                    <ion-row class=\"ion-align-items-center ion-justify-content-center\">\r\n                        <span class=\"survey-name ion-text-center\">Chats</span>\r\n                    </ion-row>\r\n                </ion-grid>\r\n            </ion-col>\r\n            <ion-col size=\"auto\">\r\n            </ion-col>\r\n            <ion-col size=\"auto\">\r\n            </ion-col>\r\n        </ion-row>\r\n    </ion-grid>\r\n    <ion-grid class=\"position-relative ion-no-padding\">\r\n        <ion-row class=\"ion-no-padding border-header header-half-height\">\r\n        </ion-row>\r\n        <ion-row class=\"ion-no-padding header-half-height\">\r\n\r\n        </ion-row>\r\n        <ion-row class=\"ion-no-padding position-absolute header-icon-position full-width\">\r\n            <ion-col class=\"flex-center\">\r\n                <ion-img src=\"/assets/images/icons8-chat-room.svg\" class=\"header-icon\"></ion-img>\r\n            </ion-col>\r\n        </ion-row>\r\n    </ion-grid>\r\n</ion-header>\r\n\r\n<ion-content>\r\n    <ion-grid *ngIf=\"conversations.length === 0\">\r\n        <ion-row class=\"ion-align-items-center ion-justify-content-center\">\r\n            <ion-col size=\"12\" class=\"ion-align-items-center ion-justify-content-center\">\r\n                No Messages\r\n            </ion-col>\r\n        </ion-row>\r\n    </ion-grid>\r\n\r\n    <ion-list *ngIf=\"conversations.length !== 0\">\r\n        <ion-item *ngFor=\"let conversation of conversations\" (click)=\"openConversation(conversation)\">\r\n            <ion-avatar slot=\"start\">\r\n<!--                <img *ngIf=\"conversation.getConversationWith().getAvatar()\" [src]=\"conversation.getConversationWith().getAvatar()\">-->\r\n<!--                <img *ngIf=\"!conversation.getConversationWith().getAvatar()\" src=\"/assets/images/user_placeholder.jpg\">-->\r\n            </ion-avatar>\r\n            <ion-label>\r\n                <h2>{{conversation.getConversationWith().getName()}}</h2>\r\n                <p *ngIf=\"conversation.getLastMessage().getType() === 'text'\">{{conversation.getLastMessage().getText()}}</p>\r\n                <p *ngIf=\"conversation.getLastMessage().getType() !== 'text'\">Media Message</p>\r\n            </ion-label>\r\n        </ion-item>\r\n\r\n    </ion-list>\r\n\r\n    <ion-infinite-scroll threshold=\"100px\" (ionInfinite)=\"loadData($event)\">\r\n        <ion-infinite-scroll-content\r\n                loadingSpinner=\"bubbles\"\r\n                loadingText=\"Loading more data...\">\r\n        </ion-infinite-scroll-content>\r\n    </ion-infinite-scroll>\r\n\r\n\r\n</ion-content>\r\n");

/***/ }),

/***/ "zaat":
/*!*******************************************!*\
  !*** ./src/app/message/message.page.scss ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("ion-header {\n  color: #666666;\n}\n\n.survey-name {\n  font-size: 1.7em;\n  margin-right: 18px;\n}\n\n.profile-icon {\n  width: 50px;\n  height: 50px;\n  margin-right: 4px;\n}\n\n.history-name {\n  font-size: 16px;\n  color: #636363;\n  font-weight: bold;\n}\n\n.history-add {\n  color: #9D9D9D;\n  font-size: 14px;\n}\n\n.history-time {\n  color: #9D9D9D;\n  font-size: 14px;\n}\n\n.assign {\n  font-size: 14px;\n  color: #878382;\n}\n\n.message-box {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXG1lc3NhZ2UucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksY0FBQTtBQUNKOztBQUNBO0VBQ0ksZ0JBQUE7RUFDQSxrQkFBQTtBQUVKOztBQUFBO0VBQ0ksV0FBQTtFQUNBLFlBQUE7RUFDQSxpQkFBQTtBQUdKOztBQUNFO0VBQ0UsZUFBQTtFQUNBLGNBQUE7RUFDQSxpQkFBQTtBQUVKOztBQUNFO0VBQ0UsY0FBQTtFQUNFLGVBQUE7QUFFTjs7QUFDRTtFQUNFLGNBQUE7RUFDQSxlQUFBO0FBRUo7O0FBQ0U7RUFDSSxlQUFBO0VBQ0EsY0FBQTtBQUVOOztBQUNFO0VBQ0UsYUFBQTtFQUNBLDhCQUFBO0VBQ0EsbUJBQUE7QUFFSiIsImZpbGUiOiJtZXNzYWdlLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImlvbi1oZWFkZXIge1xyXG4gICAgY29sb3I6ICM2NjY2NjY7XHJcbiAgfSBcclxuLnN1cnZleS1uYW1lIHtcclxuICAgIGZvbnQtc2l6ZTogMS43ZW07XHJcbiAgICBtYXJnaW4tcmlnaHQ6IDE4cHhcclxuICB9IFxyXG4ucHJvZmlsZS1pY29ue1xyXG4gICAgd2lkdGg6IDUwcHg7XHJcbiAgICBoZWlnaHQ6IDUwcHg7XHJcbiAgICBtYXJnaW4tcmlnaHQ6IDRweDtcclxuICAgXHJcbiAgfVxyXG5cclxuICAuaGlzdG9yeS1uYW1le1xyXG4gICAgZm9udC1zaXplOiAxNnB4OyBcclxuICAgIGNvbG9yOiAjNjM2MzYzO1xyXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgfVxyXG5cclxuICAuaGlzdG9yeS1hZGR7XHJcbiAgICBjb2xvcjogIzlEOUQ5RDtcclxuICAgICAgZm9udC1zaXplOiAxNHB4O1xyXG4gIH1cclxuXHJcbiAgLmhpc3RvcnktdGltZXtcclxuICAgIGNvbG9yOiAjOUQ5RDlEO1xyXG4gICAgZm9udC1zaXplOiAxNHB4O1xyXG4gIH1cclxuXHJcbiAgLmFzc2lnbntcclxuICAgICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgICBjb2xvcjogIzg3ODM4MjtcclxuICB9XHJcblxyXG4gIC5tZXNzYWdlLWJveHtcclxuICAgIGRpc3BsYXk6IGZsZXg7IFxyXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICB9Il19 */");

/***/ })

}]);
//# sourceMappingURL=message-message-module.js.map