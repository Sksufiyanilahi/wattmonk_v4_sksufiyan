(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["groups-groups-module"],{

/***/ "B0my":
/*!***************************************************!*\
  !*** ./src/app/chat-tabs/groups/groups.module.ts ***!
  \***************************************************/
/*! exports provided: GroupsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GroupsPageModule", function() { return GroupsPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _groups_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./groups-routing.module */ "SwXs");
/* harmony import */ var _groups_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./groups.page */ "Cj4/");







let GroupsPageModule = class GroupsPageModule {
};
GroupsPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _groups_routing_module__WEBPACK_IMPORTED_MODULE_5__["GroupsPageRoutingModule"]
        ],
        declarations: [_groups_page__WEBPACK_IMPORTED_MODULE_6__["GroupsPage"]]
    })
], GroupsPageModule);



/***/ }),

/***/ "Cj4/":
/*!*************************************************!*\
  !*** ./src/app/chat-tabs/groups/groups.page.ts ***!
  \*************************************************/
/*! exports provided: GroupsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GroupsPage", function() { return GroupsPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_groups_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./groups.page.html */ "Kxi9");
/* harmony import */ var _groups_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./groups.page.scss */ "sujf");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _cometchat_pro_cordova_ionic_chat_CometChat__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @cometchat-pro/cordova-ionic-chat/CometChat */ "ujHh");
/* harmony import */ var _cometchat_pro_cordova_ionic_chat_CometChat__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_cometchat_pro_cordova_ionic_chat_CometChat__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var src_app_utilities_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/utilities.service */ "oTnF");







let GroupsPage = class GroupsPage {
    constructor(navController, utilities) {
        this.navController = navController;
        this.utilities = utilities;
        this.conversations = [];
        this.userListArray = [];
    }
    ngOnInit() {
        this.conversationsRequest = new _cometchat_pro_cordova_ionic_chat_CometChat__WEBPACK_IMPORTED_MODULE_5__["CometChat"].ConversationsRequestBuilder()
            .setLimit(50)
            .setConversationType('group')
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
        this.navController.navigateForward(['chat/' + conversation.getConversationWith().getGuid(), { 'key': 'group' }]);
    }
    ionViewWillLeave() {
    }
};
GroupsPage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["NavController"] },
    { type: src_app_utilities_service__WEBPACK_IMPORTED_MODULE_6__["UtilitiesService"] }
];
GroupsPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-groups',
        template: _raw_loader_groups_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_groups_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], GroupsPage);



/***/ }),

/***/ "Kxi9":
/*!*****************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/chat-tabs/groups/groups.page.html ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header class=\"ion-no-border\">\r\n    <ion-grid class=\"ion-padding-top ion-padding-start ion-padding-end header-bg\">\r\n        <ion-row>\r\n            <ion-col size=\"auto\">\r\n                <ion-button fill=\"clear\" size=\"small\" class=\"ion-no-padding\" (click)=\"goBack()\">\r\n                    <ion-img src=\"/assets/images/back.svg\" class=\"action-icon\"></ion-img>\r\n                </ion-button>\r\n            </ion-col>\r\n            <ion-col>\r\n                <ion-grid class=\"ion-align-items-center ion-justify-content-center\">\r\n                    <ion-row class=\"ion-align-items-center ion-justify-content-center\">\r\n                        <span class=\"survey-name ion-text-center\">Chats</span>\r\n                    </ion-row>\r\n                </ion-grid>\r\n            </ion-col>\r\n            <ion-col size=\"auto\">\r\n            </ion-col>\r\n            <ion-col size=\"auto\">\r\n            </ion-col>\r\n        </ion-row>\r\n    </ion-grid>\r\n    <ion-grid class=\"position-relative ion-no-padding\">\r\n        <ion-row class=\"ion-no-padding border-header header-half-height\">\r\n        </ion-row>\r\n        <ion-row class=\"ion-no-padding header-half-height\">\r\n\r\n        </ion-row>\r\n        <ion-row class=\"ion-no-padding position-absolute header-icon-position full-width\">\r\n            <ion-col class=\"flex-center\">\r\n                <ion-img src=\"/assets/detailpage/Inbox.svg\" class=\"header-icon\"></ion-img>\r\n            </ion-col>\r\n        </ion-row>\r\n    </ion-grid>\r\n</ion-header>\r\n\r\n<ion-content>\r\n    <ion-grid *ngIf=\"conversations.length === 0\">\r\n        <ion-row class=\"ion-align-items-center ion-justify-content-center\">\r\n            <ion-col size=\"12\" class=\"ion-align-items-center ion-justify-content-center\" style=\"text-align: center;\">\r\n                No Messages\r\n            </ion-col>\r\n        </ion-row>\r\n    </ion-grid>\r\n\r\n    <ion-list *ngIf=\"conversations.length !== 0\">\r\n        <ion-item *ngFor=\"let conversation of conversations\" (click)=\"openConversation(conversation)\">\r\n            <ion-avatar slot=\"start\">\r\n                <!-- <img *ngIf=\"conversation.getConversationWith().getAvatar()\" [src]=\"conversation.getConversationWith().getAvatar()\"> -->\r\n                <img  src=\"/assets/images/user_placeholder.jpg\">\r\n            </ion-avatar>\r\n            <ion-label>\r\n                <h2>{{conversation.getConversationWith().getName()}}</h2>\r\n                <p *ngIf=\"conversation.getLastMessage()?.type=='text'\">{{conversation.getLastMessage()?.text}}</p>\r\n                <p *ngIf=\"conversation.getLastMessage()?.type =='file'\">{{\"File Message\"}}</p>\r\n                <p *ngIf=\"conversation.getLastMessage()?.action\">{{conversation.getLastMessage()?.message}}</p>\r\n            </ion-label>\r\n        </ion-item>\r\n\r\n    </ion-list>\r\n\r\n    <ion-infinite-scroll threshold=\"100px\" (ionInfinite)=\"loadData($event)\">\r\n        <ion-infinite-scroll-content\r\n                loadingSpinner=\"bubbles\"\r\n                loadingText=\"Loading more data...\">\r\n        </ion-infinite-scroll-content>\r\n    </ion-infinite-scroll>\r\n\r\n\r\n</ion-content>\r\n");

/***/ }),

/***/ "SwXs":
/*!***********************************************************!*\
  !*** ./src/app/chat-tabs/groups/groups-routing.module.ts ***!
  \***********************************************************/
/*! exports provided: GroupsPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GroupsPageRoutingModule", function() { return GroupsPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _groups_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./groups.page */ "Cj4/");




const routes = [
    {
        path: '',
        component: _groups_page__WEBPACK_IMPORTED_MODULE_3__["GroupsPage"]
    }
];
let GroupsPageRoutingModule = class GroupsPageRoutingModule {
};
GroupsPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], GroupsPageRoutingModule);



/***/ }),

/***/ "sujf":
/*!***************************************************!*\
  !*** ./src/app/chat-tabs/groups/groups.page.scss ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("ion-avatar {\n  max-width: 25px;\n  max-height: 25px;\n}\n\n.circular {\n  width: 24px;\n  height: 24px;\n  border-radius: 50%;\n}\n\n.Inline {\n  display: inline-flex;\n  vertical-align: middle;\n}\n\n.chat-box-container {\n  bottom: 2px;\n  display: inline-flex;\n  padding: 0 8px 0 8px;\n  background: white;\n  width: 100%;\n}\n\n.chat-editor-box {\n  display: inline-flex;\n  justify-items: center;\n  background: white;\n  align-content: center;\n  align-items: center;\n  border: 1px solid #ccc;\n  border-radius: 24px;\n  padding-left: 4px !important;\n  font-size: 14px;\n  min-height: 38px;\n  max-height: 100px;\n}\n\n.btnSendChatView, .btnAttachMediaView {\n  height: 38px;\n  width: 38px;\n  margin-left: 4px;\n  background: #3c78d8;\n  color: white;\n  display: flex;\n  justify-content: center;\n  align-content: center;\n  align-items: center;\n  vertical-align: middle;\n  border-radius: 50%;\n}\n\n.btnSendChat, .btnAttachMedia {\n  height: 24px;\n  width: 24px;\n}\n\n.chat {\n  font-family: sans-serif;\n  display: flex;\n  flex-direction: column;\n}\n\n.message {\n  margin: 0.2em 0;\n  padding: 0.5em;\n  max-width: 70%;\n}\n\n.me {\n  margin-left: 13px;\n  align-self: flex-start;\n  background-color: #F1F0F0;\n  color: black;\n  border-radius: 10px 10px 10px 0px;\n}\n\n.you {\n  align-self: flex-end;\n  background-color: #3c78d8;\n  color: white;\n  border-radius: 10px 10px 0px 10px;\n  display: inline-block;\n  margin-right: 13px;\n}\n\n.youMedia {\n  align-self: flex-end;\n  color: white;\n  display: inline-block;\n  margin-right: 13px;\n}\n\n.meMedia {\n  align-self: flex-start;\n  color: black;\n}\n\n.videoClass {\n  background-color: none;\n  border-radius: none;\n}\n\n.showTicks {\n  display: block;\n}\n\n.hideTicks {\n  display: none;\n}\n\n.imgSpan {\n  align-self: flex-end;\n  display: inline-block;\n  position: relative;\n  top: -15px;\n  left: 0px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFxncm91cHMucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksZUFBQTtFQUNBLGdCQUFBO0FBQ0o7O0FBQ0U7RUFDRSxXQUFBO0VBQ0EsWUFBQTtFQUVBLGtCQUFBO0FBRUo7O0FBQ0U7RUFFRSxvQkFBQTtFQUNBLHNCQUFBO0FBQ0o7O0FBR0U7RUFDRSxXQUFBO0VBQ0Esb0JBQUE7RUFDQSxvQkFBQTtFQUNBLGlCQUFBO0VBQ0EsV0FBQTtBQUFKOztBQUVFO0VBQ0Usb0JBQUE7RUFDQSxxQkFBQTtFQUNBLGlCQUFBO0VBQ0EscUJBQUE7RUFDQSxtQkFBQTtFQUNBLHNCQUFBO0VBQ0EsbUJBQUE7RUFDQSw0QkFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGlCQUFBO0FBQ0o7O0FBR0U7RUFDRSxZQUFBO0VBQ0EsV0FBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUNBLHVCQUFBO0VBQ0EscUJBQUE7RUFDQSxtQkFBQTtFQUNBLHNCQUFBO0VBQ0Esa0JBQUE7QUFBSjs7QUFHRTtFQUNFLFlBQUE7RUFDQSxXQUFBO0FBQUo7O0FBR0U7RUFDRSx1QkFBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtBQUFKOztBQUdFO0VBQ0UsZUFBQTtFQUNBLGNBQUE7RUFDQSxjQUFBO0FBQUo7O0FBR0U7RUFDRSxpQkFBQTtFQUNBLHNCQUFBO0VBQ0EseUJBQUE7RUFDQSxZQUFBO0VBQ0EsaUNBQUE7QUFBSjs7QUFHRTtFQUNFLG9CQUFBO0VBQ0EseUJBQUE7RUFDQSxZQUFBO0VBQ0EsaUNBQUE7RUFDQSxxQkFBQTtFQUNBLGtCQUFBO0FBQUo7O0FBR0U7RUFDRSxvQkFBQTtFQUNBLFlBQUE7RUFDQSxxQkFBQTtFQUNBLGtCQUFBO0FBQUo7O0FBR0U7RUFDRSxzQkFBQTtFQUNBLFlBQUE7QUFBSjs7QUFHRTtFQUNFLHNCQUFBO0VBQ0EsbUJBQUE7QUFBSjs7QUFHRTtFQUNFLGNBQUE7QUFBSjs7QUFHRTtFQUNFLGFBQUE7QUFBSjs7QUFHRTtFQUNFLG9CQUFBO0VBQ0EscUJBQUE7RUFDQSxrQkFBQTtFQUNBLFVBQUE7RUFDQSxTQUFBO0FBQUoiLCJmaWxlIjoiZ3JvdXBzLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImlvbi1hdmF0YXIge1xyXG4gICAgbWF4LXdpZHRoOiAyNXB4O1xyXG4gICAgbWF4LWhlaWdodDogMjVweDtcclxuICB9XHJcbiAgLmNpcmN1bGFye1xyXG4gICAgd2lkdGg6MjRweDtcclxuICAgIGhlaWdodDoyNHB4O1xyXG4gICAgLXdlYmtpdC1ib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgfVxyXG4gIFxyXG4gIC5JbmxpbmV7XHJcbiAgXHJcbiAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcclxuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XHJcbiAgXHJcbiAgfVxyXG4gIFxyXG4gIC5jaGF0LWJveC1jb250YWluZXJ7XHJcbiAgICBib3R0b206IDJweDtcclxuICAgIGRpc3BsYXk6IGlubGluZS1mbGV4O1xyXG4gICAgcGFkZGluZzogMCA4cHggMCA4cHg7XHJcbiAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gIH1cclxuICAuY2hhdC1lZGl0b3ItYm94e1xyXG4gICAgZGlzcGxheTogaW5saW5lLWZsZXg7XHJcbiAgICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcclxuICAgIGFsaWduLWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xyXG4gICAgYm9yZGVyLXJhZGl1czogMjRweDtcclxuICAgIHBhZGRpbmctbGVmdDogNHB4ICFpbXBvcnRhbnQ7XHJcbiAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgICBtaW4taGVpZ2h0OiAzOHB4O1xyXG4gICAgbWF4LWhlaWdodDogMTAwcHg7XHJcbiAgfVxyXG4gIFxyXG4gIFxyXG4gIC5idG5TZW5kQ2hhdFZpZXcsIC5idG5BdHRhY2hNZWRpYVZpZXd7XHJcbiAgICBoZWlnaHQ6IDM4cHg7XHJcbiAgICB3aWR0aDogMzhweDtcclxuICAgIG1hcmdpbi1sZWZ0OiA0cHg7XHJcbiAgICBiYWNrZ3JvdW5kOiAjM2M3OGQ4O1xyXG4gICAgY29sb3I6IHdoaXRlO1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgYWxpZ24tY29udGVudDogY2VudGVyO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgfVxyXG4gIFxyXG4gIC5idG5TZW5kQ2hhdCwgLmJ0bkF0dGFjaE1lZGlhe1xyXG4gICAgaGVpZ2h0OiAyNHB4O1xyXG4gICAgd2lkdGg6IDI0cHg7XHJcbiAgfVxyXG4gIFxyXG4gIC5jaGF0IHtcclxuICAgIGZvbnQtZmFtaWx5OiBzYW5zLXNlcmlmO1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgfVxyXG4gIFxyXG4gIC5tZXNzYWdlIHtcclxuICAgIG1hcmdpbjogMC4yZW0gMDtcclxuICAgIHBhZGRpbmc6IDAuNWVtO1xyXG4gICAgbWF4LXdpZHRoOiA3MCU7XHJcbiAgfVxyXG4gIFxyXG4gIC5tZSB7XHJcbiAgICBtYXJnaW4tbGVmdDogMTNweDtcclxuICAgIGFsaWduLXNlbGY6IGZsZXgtc3RhcnQ7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRjFGMEYwO1xyXG4gICAgY29sb3I6IGJsYWNrO1xyXG4gICAgYm9yZGVyLXJhZGl1czogMTBweCAxMHB4IDEwcHggMHB4O1xyXG4gIH1cclxuICBcclxuICAueW91IHtcclxuICAgIGFsaWduLXNlbGY6IGZsZXgtZW5kO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjojM2M3OGQ4O1xyXG4gICAgY29sb3I6IHdoaXRlO1xyXG4gICAgYm9yZGVyLXJhZGl1czogMTBweCAxMHB4IDBweCAxMHB4O1xyXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgbWFyZ2luLXJpZ2h0OiAxM3B4O1xyXG4gIH1cclxuICBcclxuICAueW91TWVkaWF7XHJcbiAgICBhbGlnbi1zZWxmOiBmbGV4LWVuZDtcclxuICAgIGNvbG9yOiB3aGl0ZTtcclxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgIG1hcmdpbi1yaWdodDogMTNweDtcclxuICB9XHJcbiAgXHJcbiAgLm1lTWVkaWF7XHJcbiAgICBhbGlnbi1zZWxmOiBmbGV4LXN0YXJ0O1xyXG4gICAgY29sb3I6IGJsYWNrO1xyXG4gIH1cclxuICBcclxuICAudmlkZW9DbGFzc3tcclxuICAgIGJhY2tncm91bmQtY29sb3I6IG5vbmU7XHJcbiAgICBib3JkZXItcmFkaXVzOiBub25lO1xyXG4gIH1cclxuICBcclxuICAuc2hvd1RpY2tze1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbiAgfVxyXG4gIFxyXG4gIC5oaWRlVGlja3N7XHJcbiAgICBkaXNwbGF5OiBub25lO1xyXG4gIH1cclxuICBcclxuICAuaW1nU3BhbntcclxuICAgIGFsaWduLXNlbGY6IGZsZXgtZW5kO1xyXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgdG9wOiAtMTVweDtcclxuICAgIGxlZnQ6IDBweDtcclxuICB9XHJcbiAgIl19 */");

/***/ })

}]);
//# sourceMappingURL=groups-groups-module.js.map