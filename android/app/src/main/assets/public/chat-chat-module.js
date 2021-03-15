(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chat-chat-module"],{

/***/ "2yxt":
/*!*************************************!*\
  !*** ./src/app/chat/chat.module.ts ***!
  \*************************************/
/*! exports provided: ChatPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatPageModule", function() { return ChatPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _chat_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./chat-routing.module */ "cC0O");
/* harmony import */ var _chat_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./chat.page */ "laW7");
/* harmony import */ var _image_viewer_image_viewer_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./image-viewer/image-viewer.component */ "caXV");
/* harmony import */ var _ionic_native_chooser_ngx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic-native/chooser/ngx */ "UWV4");
/* harmony import */ var _ionic_native_image_picker_ngx__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic-native/image-picker/ngx */ "tAfe");
/* harmony import */ var _ionic_native_in_app_browser_ngx__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ionic-native/in-app-browser/ngx */ "m/P+");
/* harmony import */ var _ionic_native_file_ngx__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ionic-native/file/ngx */ "FAH8");












let ChatPageModule = class ChatPageModule {
};
ChatPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _chat_routing_module__WEBPACK_IMPORTED_MODULE_5__["ChatPageRoutingModule"]
        ],
        declarations: [_chat_page__WEBPACK_IMPORTED_MODULE_6__["ChatPage"], _image_viewer_image_viewer_component__WEBPACK_IMPORTED_MODULE_7__["ImageViewerComponent"]],
        providers: [
            _ionic_native_chooser_ngx__WEBPACK_IMPORTED_MODULE_8__["Chooser"],
            _ionic_native_in_app_browser_ngx__WEBPACK_IMPORTED_MODULE_10__["InAppBrowser"],
            _ionic_native_image_picker_ngx__WEBPACK_IMPORTED_MODULE_9__["ImagePicker"],
            _ionic_native_file_ngx__WEBPACK_IMPORTED_MODULE_11__["File"]
        ]
    })
], ChatPageModule);



/***/ }),

/***/ "AADu":
/*!***************************************************************!*\
  !*** ./src/app/chat/image-viewer/image-viewer.component.scss ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("ion-slides {\n  height: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFxpbWFnZS12aWV3ZXIuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxZQUFBO0FBQ0YiLCJmaWxlIjoiaW1hZ2Utdmlld2VyLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiaW9uLXNsaWRlcyB7XHJcbiAgaGVpZ2h0OiAxMDAlO1xyXG59XHJcbiJdfQ== */");

/***/ }),

/***/ "N9oh":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/chat/image-viewer/image-viewer.component.html ***!
  \*****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\r\n    <ion-toolbar color=\"dark\">\r\n        <ion-buttons slot=\"start\">\r\n            <ion-button (click)=\"closeModal()\">\r\n                <ion-icon slot=\"icon-only\" name=\"close\"></ion-icon>\r\n            </ion-button>\r\n        </ion-buttons>\r\n        <ion-title>Image</ion-title>\r\n    </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content [forceOverscroll]=\"false\" color=\"dark\" fullscreen=\"true\">\r\n    <div class=\"swiper-zoom-container\" style=\"height: 100%;\"></div>\r\n</ion-content>\r\n");

/***/ }),

/***/ "SyIY":
/*!*************************************!*\
  !*** ./src/app/chat/chat.page.scss ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("ion-avatar {\n  max-width: 25px;\n  max-height: 25px;\n}\n\n.circular {\n  width: 24px;\n  height: 24px;\n  border-radius: 50%;\n}\n\n.Inline {\n  display: inline-flex;\n  vertical-align: middle;\n}\n\n.chat-box-container {\n  bottom: 2px;\n  display: inline-flex;\n  padding: 0 8px 0 8px;\n  background: white;\n  width: 100%;\n}\n\n.chat-editor-box {\n  display: inline-flex;\n  justify-items: center;\n  background: white;\n  align-content: center;\n  align-items: center;\n  border: 1px solid #ccc;\n  border-radius: 24px;\n  padding-left: 4px !important;\n  font-size: 14px;\n  min-height: 38px;\n  max-height: 100px;\n}\n\n.btnSendChatView, .btnAttachMediaView {\n  height: 38px;\n  width: 38px;\n  margin-left: 4px;\n  background: #3c78d8;\n  color: white;\n  display: flex;\n  justify-content: center;\n  align-content: center;\n  align-items: center;\n  vertical-align: middle;\n  border-radius: 50%;\n}\n\n.btnSendChat, .btnAttachMedia {\n  height: 24px;\n  width: 24px;\n}\n\n.chat {\n  font-family: sans-serif;\n  display: flex;\n  flex-direction: column;\n}\n\n.message {\n  margin: 0.2em 0;\n  padding: 0.5em;\n  max-width: 70%;\n}\n\n.me {\n  margin-left: 13px;\n  align-self: flex-start;\n  background-color: #F1F0F0;\n  color: black;\n  border-radius: 10px 10px 10px 0px;\n}\n\n.you {\n  align-self: flex-end;\n  background-color: #3c78d8;\n  color: white;\n  border-radius: 10px 10px 0px 10px;\n  display: inline-block;\n  margin-right: 13px;\n}\n\n.youMedia {\n  align-self: flex-end;\n  color: white;\n  display: inline-block;\n  margin-right: 13px;\n}\n\n.meMedia {\n  align-self: flex-start;\n  color: black;\n}\n\n.videoClass {\n  background-color: none;\n  border-radius: none;\n}\n\n.showTicks {\n  display: block;\n}\n\n.hideTicks {\n  display: none;\n}\n\n.imgSpan {\n  align-self: flex-end;\n  display: inline-block;\n  position: relative;\n  top: -15px;\n  left: 0px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXGNoYXQucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsZUFBQTtFQUNBLGdCQUFBO0FBQ0Y7O0FBQ0E7RUFDRSxXQUFBO0VBQ0EsWUFBQTtFQUVBLGtCQUFBO0FBRUY7O0FBQ0E7RUFFRSxvQkFBQTtFQUNBLHNCQUFBO0FBQ0Y7O0FBR0E7RUFDRSxXQUFBO0VBQ0Esb0JBQUE7RUFDQSxvQkFBQTtFQUNBLGlCQUFBO0VBQ0EsV0FBQTtBQUFGOztBQUVBO0VBQ0Usb0JBQUE7RUFDQSxxQkFBQTtFQUNBLGlCQUFBO0VBQ0EscUJBQUE7RUFDQSxtQkFBQTtFQUNBLHNCQUFBO0VBQ0EsbUJBQUE7RUFDQSw0QkFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGlCQUFBO0FBQ0Y7O0FBR0E7RUFDRSxZQUFBO0VBQ0EsV0FBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUNBLHVCQUFBO0VBQ0EscUJBQUE7RUFDQSxtQkFBQTtFQUNBLHNCQUFBO0VBQ0Esa0JBQUE7QUFBRjs7QUFHQTtFQUNFLFlBQUE7RUFDQSxXQUFBO0FBQUY7O0FBR0E7RUFDRSx1QkFBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtBQUFGOztBQUdBO0VBQ0UsZUFBQTtFQUNBLGNBQUE7RUFDQSxjQUFBO0FBQUY7O0FBR0E7RUFDRSxpQkFBQTtFQUNBLHNCQUFBO0VBQ0EseUJBQUE7RUFDQSxZQUFBO0VBQ0EsaUNBQUE7QUFBRjs7QUFHQTtFQUNFLG9CQUFBO0VBQ0EseUJBQUE7RUFDQSxZQUFBO0VBQ0EsaUNBQUE7RUFDQSxxQkFBQTtFQUNBLGtCQUFBO0FBQUY7O0FBR0E7RUFDRSxvQkFBQTtFQUNBLFlBQUE7RUFDQSxxQkFBQTtFQUNBLGtCQUFBO0FBQUY7O0FBR0E7RUFDRSxzQkFBQTtFQUNBLFlBQUE7QUFBRjs7QUFHQTtFQUNFLHNCQUFBO0VBQ0EsbUJBQUE7QUFBRjs7QUFHQTtFQUNFLGNBQUE7QUFBRjs7QUFHQTtFQUNFLGFBQUE7QUFBRjs7QUFHQTtFQUNFLG9CQUFBO0VBQ0EscUJBQUE7RUFDQSxrQkFBQTtFQUNBLFVBQUE7RUFDQSxTQUFBO0FBQUYiLCJmaWxlIjoiY2hhdC5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJpb24tYXZhdGFyIHtcclxuICBtYXgtd2lkdGg6IDI1cHg7XHJcbiAgbWF4LWhlaWdodDogMjVweDtcclxufVxyXG4uY2lyY3VsYXJ7XHJcbiAgd2lkdGg6MjRweDtcclxuICBoZWlnaHQ6MjRweDtcclxuICAtd2Via2l0LWJvcmRlci1yYWRpdXM6IDUwJTtcclxuICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbn1cclxuXHJcbi5JbmxpbmV7XHJcblxyXG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xyXG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XHJcblxyXG59XHJcblxyXG4uY2hhdC1ib3gtY29udGFpbmVye1xyXG4gIGJvdHRvbTogMnB4O1xyXG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xyXG4gIHBhZGRpbmc6IDAgOHB4IDAgOHB4O1xyXG4gIGJhY2tncm91bmQ6IHdoaXRlO1xyXG4gIHdpZHRoOiAxMDAlO1xyXG59XHJcbi5jaGF0LWVkaXRvci1ib3h7XHJcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XHJcbiAganVzdGlmeS1pdGVtczogY2VudGVyO1xyXG4gIGJhY2tncm91bmQ6IHdoaXRlO1xyXG4gIGFsaWduLWNvbnRlbnQ6IGNlbnRlcjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XHJcbiAgYm9yZGVyLXJhZGl1czogMjRweDtcclxuICBwYWRkaW5nLWxlZnQ6IDRweCAhaW1wb3J0YW50O1xyXG4gIGZvbnQtc2l6ZTogMTRweDtcclxuICBtaW4taGVpZ2h0OiAzOHB4O1xyXG4gIG1heC1oZWlnaHQ6IDEwMHB4O1xyXG59XHJcblxyXG5cclxuLmJ0blNlbmRDaGF0VmlldywgLmJ0bkF0dGFjaE1lZGlhVmlld3tcclxuICBoZWlnaHQ6IDM4cHg7XHJcbiAgd2lkdGg6IDM4cHg7XHJcbiAgbWFyZ2luLWxlZnQ6IDRweDtcclxuICBiYWNrZ3JvdW5kOiAjM2M3OGQ4O1xyXG4gIGNvbG9yOiB3aGl0ZTtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIGFsaWduLWNvbnRlbnQ6IGNlbnRlcjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XHJcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG59XHJcblxyXG4uYnRuU2VuZENoYXQsIC5idG5BdHRhY2hNZWRpYXtcclxuICBoZWlnaHQ6IDI0cHg7XHJcbiAgd2lkdGg6IDI0cHg7XHJcbn1cclxuXHJcbi5jaGF0IHtcclxuICBmb250LWZhbWlseTogc2Fucy1zZXJpZjtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbn1cclxuXHJcbi5tZXNzYWdlIHtcclxuICBtYXJnaW46IDAuMmVtIDA7XHJcbiAgcGFkZGluZzogMC41ZW07XHJcbiAgbWF4LXdpZHRoOiA3MCU7XHJcbn1cclxuXHJcbi5tZSB7XHJcbiAgbWFyZ2luLWxlZnQ6IDEzcHg7XHJcbiAgYWxpZ24tc2VsZjogZmxleC1zdGFydDtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRjFGMEYwO1xyXG4gIGNvbG9yOiBibGFjaztcclxuICBib3JkZXItcmFkaXVzOiAxMHB4IDEwcHggMTBweCAwcHg7XHJcbn1cclxuXHJcbi55b3Uge1xyXG4gIGFsaWduLXNlbGY6IGZsZXgtZW5kO1xyXG4gIGJhY2tncm91bmQtY29sb3I6IzNjNzhkODtcclxuICBjb2xvcjogd2hpdGU7XHJcbiAgYm9yZGVyLXJhZGl1czogMTBweCAxMHB4IDBweCAxMHB4O1xyXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICBtYXJnaW4tcmlnaHQ6IDEzcHg7XHJcbn1cclxuXHJcbi55b3VNZWRpYXtcclxuICBhbGlnbi1zZWxmOiBmbGV4LWVuZDtcclxuICBjb2xvcjogd2hpdGU7XHJcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gIG1hcmdpbi1yaWdodDogMTNweDtcclxufVxyXG5cclxuLm1lTWVkaWF7XHJcbiAgYWxpZ24tc2VsZjogZmxleC1zdGFydDtcclxuICBjb2xvcjogYmxhY2s7XHJcbn1cclxuXHJcbi52aWRlb0NsYXNze1xyXG4gIGJhY2tncm91bmQtY29sb3I6IG5vbmU7XHJcbiAgYm9yZGVyLXJhZGl1czogbm9uZTtcclxufVxyXG5cclxuLnNob3dUaWNrc3tcclxuICBkaXNwbGF5OiBibG9jaztcclxufVxyXG5cclxuLmhpZGVUaWNrc3tcclxuICBkaXNwbGF5OiBub25lO1xyXG59XHJcblxyXG4uaW1nU3BhbntcclxuICBhbGlnbi1zZWxmOiBmbGV4LWVuZDtcclxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIHRvcDogLTE1cHg7XHJcbiAgbGVmdDogMHB4O1xyXG59XHJcbiJdfQ== */");

/***/ }),

/***/ "UWV4":
/*!**********************************************************************!*\
  !*** ./node_modules/@ionic-native/chooser/__ivy_ngcc__/ngx/index.js ***!
  \**********************************************************************/
/*! exports provided: Chooser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Chooser", function() { return Chooser; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ionic_native_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic-native/core */ "C6fG");




var Chooser = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(Chooser, _super);
    function Chooser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Chooser.prototype.getFile = function (accept) { return Object(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["cordova"])(this, "getFile", {}, arguments); };
    Chooser.prototype.getFileMetadata = function (accept) { return Object(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["cordova"])(this, "getFileMetadata", {}, arguments); };
    Chooser.pluginName = "Chooser";
    Chooser.plugin = "cordova-plugin-chooser";
    Chooser.pluginRef = "chooser";
    Chooser.repo = "https://github.com/cyph/cordova-plugin-chooser";
    Chooser.platforms = ["Android", "iOS"];
Chooser.ɵfac = function Chooser_Factory(t) { return ɵChooser_BaseFactory(t || Chooser); };
Chooser.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: Chooser, factory: function (t) { return Chooser.ɵfac(t); } });
var ɵChooser_BaseFactory = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetInheritedFactory"](Chooser);
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](Chooser, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"]
    }], null, null); })();
    return Chooser;
}(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["IonicNativePlugin"]));


//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9AaW9uaWMtbmF0aXZlL3BsdWdpbnMvY2hvb3Nlci9uZ3gvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyw4QkFBc0MsTUFBTSxvQkFBb0IsQ0FBQzs7QUFDeEU7QUFFZSxJQW1EYywyQkFBaUI7QUFBQztBQUU5QjtBQUNrQjtBQUFNLElBS3ZDLHlCQUFPLGFBQUMsTUFBZTtBQUV0QixJQVNELGlDQUFlLGFBQUMsTUFBZTtBQUk1QjtBQUFvQztBQUErQztBQUFtQztBQUFxRTsyQ0F4Qi9MLFVBQVU7Ozs7OzBCQUNMO0FBQUMsa0JBdkRQO0FBQUUsRUF1RDJCLGlCQUFpQjtBQUM3QyxTQURZLE9BQU87QUFBSSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvcmRvdmEsIElvbmljTmF0aXZlUGx1Z2luLCBQbHVnaW4gfSBmcm9tICdAaW9uaWMtbmF0aXZlL2NvcmUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIENob29zZXJSZXN1bHQge1xuICBkYXRhPzogVWludDhBcnJheTtcbiAgZGF0YVVSST86IHN0cmluZztcbiAgbWVkaWFUeXBlOiBzdHJpbmc7XG4gIG5hbWU6IHN0cmluZztcbiAgdXJpOiBzdHJpbmc7XG59XG5cbi8qKlxuICogQG5hbWUgQ2hvb3NlclxuICogQGRlc2NyaXB0aW9uXG4gKiBGaWxlIGNob29zZXIgcGx1Z2luIGZvciBDb3Jkb3ZhLlxuICpcbiAqIFRoZSBmb2xsb3dpbmcgbXVzdCBiZSBhZGRlZCB0byBjb25maWcueG1sIHRvIHByZXZlbnQgY3Jhc2hpbmcgd2hlbiBzZWxlY3RpbmcgbGFyZ2UgZmlsZXMgb24gQW5kcm9pZDpcbiAqIGBgYHhtbFxuICogPHBsYXRmb3JtIG5hbWU9XCJhbmRyb2lkXCI+XG4gKiAgPGVkaXQtY29uZmlnXG4gKiAgICBmaWxlPVwiYXBwL3NyYy9tYWluL0FuZHJvaWRNYW5pZmVzdC54bWxcIlxuICogICAgbW9kZT1cIm1lcmdlXCJcbiAqICAgIHRhcmdldD1cIi9tYW5pZmVzdC9hcHBsaWNhdGlvblwiPlxuICogICAgPGFwcGxpY2F0aW9uIGFuZHJvaWQ6bGFyZ2VIZWFwPVwidHJ1ZVwiIC8+XG4gKiAgPC9lZGl0LWNvbmZpZz5cbiAqIDwvcGxhdGZvcm0+XG4gKiBgYGBcbiAqXG4gKiBAdXNhZ2VcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGltcG9ydCB7IENob29zZXIgfSBmcm9tICdAaW9uaWMtbmF0aXZlL2Nob29zZXIvbmd4JztcbiAqXG4gKlxuICogY29uc3RydWN0b3IocHJpdmF0ZSBjaG9vc2VyOiBDaG9vc2VyKSB7IH1cbiAqXG4gKiAuLi5cbiAqXG4gKlxuICogdGhpcy5jaG9vc2VyLmdldEZpbGUoKVxuICogICAudGhlbihmaWxlID0+IGNvbnNvbGUubG9nKGZpbGUgPyBmaWxlLm5hbWUgOiAnY2FuY2VsZWQnKSlcbiAqICAgLmNhdGNoKChlcnJvcjogYW55KSA9PiBjb25zb2xlLmVycm9yKGVycm9yKSk7XG4gKlxuICogYGBgXG4gKlxuICogQGludGVyZmFjZXNcbiAqIENob29zZXJSZXN1bHRcbiAqL1xuQFBsdWdpbih7XG4gIHBsdWdpbk5hbWU6ICdDaG9vc2VyJyxcbiAgcGx1Z2luOiAnY29yZG92YS1wbHVnaW4tY2hvb3NlcicsXG4gIHBsdWdpblJlZjogJ2Nob29zZXInLFxuICByZXBvOiAnaHR0cHM6Ly9naXRodWIuY29tL2N5cGgvY29yZG92YS1wbHVnaW4tY2hvb3NlcicsXG4gIHBsYXRmb3JtczogWydBbmRyb2lkJywgJ2lPUyddLFxufSlcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDaG9vc2VyIGV4dGVuZHMgSW9uaWNOYXRpdmVQbHVnaW4ge1xuICAvKipcbiAgICogRGlzcGxheXMgbmF0aXZlIHByb21wdCBmb3IgdXNlciB0byBzZWxlY3QgYSBmaWxlLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gW2FjY2VwdF0gT3B0aW9uYWwgTUlNRSB0eXBlIGZpbHRlciAoZS5nLiAnaW1hZ2UvZ2lmLHZpZGVvLyonKS5cbiAgICogQHJldHVybiB7UHJvbWlzZTxhbnk+fSBQcm9taXNlIGNvbnRhaW5pbmcgc2VsZWN0ZWQgZmlsZSdzIHJhdyBiaW5hcnkgZGF0YSxcbiAgICogYmFzZTY0LWVuY29kZWQgZGF0YTogVVJJLCBNSU1FIHR5cGUsIGRpc3BsYXkgbmFtZSwgYW5kIG9yaWdpbmFsIFVSSS5cbiAgICovXG4gIEBDb3Jkb3ZhKClcbiAgZ2V0RmlsZShhY2NlcHQ/OiBzdHJpbmcpOiBQcm9taXNlPENob29zZXJSZXN1bHQgfCB1bmRlZmluZWQ+IHtcbiAgICByZXR1cm47XG4gIH1cbiAgLyoqXG4gICAqIERpc3BsYXlzIG5hdGl2ZSBwcm9tcHQgZm9yIHVzZXIgdG8gc2VsZWN0IGEgZmlsZS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IFthY2NlcHRdIE9wdGlvbmFsIE1JTUUgdHlwZSBmaWx0ZXIgKGUuZy4gJ2ltYWdlL2dpZix2aWRlby8qJykuXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59IFByb21pc2UgY29udGFpbmluZyBzZWxlY3RlZCBmaWxlJ3MgTUlNRSB0eXBlLCBkaXNwbGF5IG5hbWUsIGFuZCBvcmlnaW5hbCBVUkkuXG4gICAqIElmIHVzZXIgY2FuY2VscywgcHJvbWlzZSB3aWxsIGJlIHJlc29sdmVkIGFzIHVuZGVmaW5lZC5cbiAgICogSWYgZXJyb3Igb2NjdXJzLCBwcm9taXNlIHdpbGwgYmUgcmVqZWN0ZWQuXG4gICAqL1xuICBAQ29yZG92YSgpXG4gIGdldEZpbGVNZXRhZGF0YShhY2NlcHQ/OiBzdHJpbmcpOiBQcm9taXNlPENob29zZXJSZXN1bHQgfCB1bmRlZmluZWQ+IHtcbiAgICByZXR1cm47XG4gIH1cbn1cbiJdfQ==

/***/ }),

/***/ "cC0O":
/*!*********************************************!*\
  !*** ./src/app/chat/chat-routing.module.ts ***!
  \*********************************************/
/*! exports provided: ChatPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatPageRoutingModule", function() { return ChatPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _chat_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./chat.page */ "laW7");




const routes = [
    {
        path: '',
        component: _chat_page__WEBPACK_IMPORTED_MODULE_3__["ChatPage"]
    }
];
let ChatPageRoutingModule = class ChatPageRoutingModule {
};
ChatPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], ChatPageRoutingModule);



/***/ }),

/***/ "caXV":
/*!*************************************************************!*\
  !*** ./src/app/chat/image-viewer/image-viewer.component.ts ***!
  \*************************************************************/
/*! exports provided: ImageViewerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImageViewerComponent", function() { return ImageViewerComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_image_viewer_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./image-viewer.component.html */ "N9oh");
/* harmony import */ var _image_viewer_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./image-viewer.component.scss */ "AADu");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");





let ImageViewerComponent = class ImageViewerComponent {
    constructor(modalController) {
        this.modalController = modalController;
    }
    ngOnInit() { }
    closeModal() {
        this.modalController.dismiss();
    }
};
ImageViewerComponent.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["ModalController"] }
];
ImageViewerComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-image-viewer',
        template: _raw_loader_image_viewer_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_image_viewer_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], ImageViewerComponent);



/***/ }),

/***/ "laW7":
/*!***********************************!*\
  !*** ./src/app/chat/chat.page.ts ***!
  \***********************************/
/*! exports provided: ChatPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatPage", function() { return ChatPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_chat_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./chat.page.html */ "n54z");
/* harmony import */ var _chat_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./chat.page.scss */ "SyIY");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _cometchat_pro_cordova_ionic_chat_CometChat__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @cometchat-pro/cordova-ionic-chat/CometChat */ "ujHh");
/* harmony import */ var _cometchat_pro_cordova_ionic_chat_CometChat__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_cometchat_pro_cordova_ionic_chat_CometChat__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _utilities_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utilities.service */ "oTnF");
/* harmony import */ var _storage_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../storage.service */ "qkCY");
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../api.service */ "yTNM");
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @capacitor/core */ "gcOT");











const { Keyboard } = _capacitor_core__WEBPACK_IMPORTED_MODULE_10__["Plugins"];
let ChatPage = class ChatPage {
    constructor(router, route, renderer2, navController, storageService, utils, apiService, navCtrl) {
        this.router = router;
        this.route = route;
        this.renderer2 = renderer2;
        this.navController = navController;
        this.storageService = storageService;
        this.utils = utils;
        this.apiService = apiService;
        this.navCtrl = navCtrl;
        const html = document.getElementsByTagName('html').item(0);
        Keyboard.addListener('keyboardWillHide', () => {
            this.moveToBottom();
        });
        Keyboard.addListener('keyboardWillShow', () => {
            this.moveToBottom();
        });
        // this.route.queryParams.subscribe(params => {
        // console.log('params: ', params);
        // if (this.router.getCurrentNavigation().extras.state) {
        this.currentGroupData = this.route.snapshot.paramMap.get('id');
        console.log(this.currentGroupData);
        localStorage.setItem('gid', this.currentGroupData);
        this.apiService.listencall(this.currentGroupData);
        // }
        // });
    }
    ionViewWillEnter() {
        this.ngOnInit();
        setTimeout(() => {
            console.log('scrolled caled');
            this.content.scrollToBottom(300);
        }, 2000);
    }
    ngOnInit() {
        this.userData = this.storageService.getUser();
        const limit = 30;
        console.log('data of currentGroupData is ', this.currentGroupData);
        const guid = this.currentGroupData;
        console.log('guid ', guid);
        this.messagesRequest = new _cometchat_pro_cordova_ionic_chat_CometChat__WEBPACK_IMPORTED_MODULE_6__["CometChat"].MessagesRequestBuilder()
            .setLimit(limit)
            .setGUID(this.currentGroupData)
            .build();
        this.loadMessages();
        this.addMessageEventListner();
        this.addTypingListner();
        this.currentTypingUserIndicator = '';
        _cometchat_pro_cordova_ionic_chat_CometChat__WEBPACK_IMPORTED_MODULE_6__["CometChat"].getLoggedinUser().then((user) => {
            console.log('user is ', user);
            this.loggedInUserData = user;
        }, (error) => {
            console.log('error getting details:', { error });
        });
    }
    loadMessages() {
        this.messagesRequest.fetchPrevious().then((messages) => {
            console.log('Message list fetched:', messages);
            // Handle the list of messages
            this.groupMessages = messages;
            // this.userMessages.prepend(messages);
            console.log('groupMessages are ', this.groupMessages);
            // this.content.scrollToBottom(1500);
            this.moveToBottom();
        }, (error) => {
            console.log('>>>>>');
            console.log('Message fetching failed with error:', error);
        }),
            (err) => {
                console.log(err, '<<');
            };
    }
    loadPreviousMessages() {
        this.messagesRequest.fetchPrevious().then((messages) => {
            console.log('Message list fetched:', messages);
            // Handle the list of messages
            const newMessages = messages;
            // this.userMessages = messages;
            // this.userMessages.prepend(messages);
            if (newMessages !== '') {
                this.groupMessages = newMessages.concat(this.groupMessages);
            }
            console.log('UserMessages are ', this.groupMessages);
            // this.content.scrollToBottom(1500);
        }, (error) => {
            console.log('Message fetching failed with error:', error);
        });
    }
    moveToBottom() {
        console.log('here moving to bottom');
        this.content.scrollToBottom(2000);
    }
    logScrollStart() {
        console.log('logScrollStart : When Scroll Starts');
    }
    logScrolling($event) {
        console.log('logScrolling : When Scrolling ', $event.detail.scrollTop);
        if ($event.detail.scrollTop === 0) {
            console.log('scroll reached to top');
            this.loadPreviousMessages();
        }
    }
    logScrollEnd() {
        console.log('logScrollEnd : When Scroll Ends');
    }
    addMessageEventListner() {
        const listenerID = 'GroupMessage';
        _cometchat_pro_cordova_ionic_chat_CometChat__WEBPACK_IMPORTED_MODULE_6__["CometChat"].addMessageListener(listenerID, new _cometchat_pro_cordova_ionic_chat_CometChat__WEBPACK_IMPORTED_MODULE_6__["CometChat"].MessageListener({
            onTextMessageReceived: (textMessage) => {
                console.log('Text message successfully', textMessage);
                if (textMessage.receiverID !== this.loggedInUserData.uid) {
                    this.groupMessages.push(textMessage);
                    this.moveToBottom();
                }
                console.log('here uid ', textMessage.sender.uid);
                console.log('logged userID ', this.loggedInUserData.uid);
                // Handle text message
            },
            onMediaMessageReceived: (mediaMessage) => {
                console.log('Media message received successfully', mediaMessage);
                // Handle media message
            },
            onCutomMessageReceived: (customMessage) => {
                console.log('Media message received successfully', customMessage);
                // Handle media message
            }
        }));
    }
    addTypingListner() {
        const listenerId = 'GroupTypingListner';
        _cometchat_pro_cordova_ionic_chat_CometChat__WEBPACK_IMPORTED_MODULE_6__["CometChat"].addMessageListener(listenerId, new _cometchat_pro_cordova_ionic_chat_CometChat__WEBPACK_IMPORTED_MODULE_6__["CometChat"].MessageListener({
            onTypingStarted: (typingIndicator) => {
                console.log('Typing started :', typingIndicator);
                console.log('Typing uid :', typingIndicator.sender.uid);
                if (typingIndicator.sender.uid !== this.loggedInUserData.uid) {
                    console.log('update the indicators');
                    const name = typingIndicator.sender.name + ' is typing...';
                    this.currentTypingUserIndicator = name;
                    // if (this.currentTypingUserIndicator != "") {
                    //   var name = typingIndicator.sender.name+", "+this.currentTypingUserIndicator;
                    //   this.currentTypingUserIndicator = name;
                    // }else{
                    //   var name = typingIndicator.sender.name+" is typing...";
                    //   this.currentTypingUserIndicator = name;
                    // }
                    // var name = typingIndicator.sender.name+" is typing...";
                    // this.currentTypingUserIndicator = name;
                }
            },
            onTypingEnded: (typingIndicator) => {
                console.log('Typing ended :', typingIndicator);
                console.log('onTypingEnded uid :', typingIndicator.sender.uid);
                if (typingIndicator.sender.uid !== this.loggedInUserData.uid) {
                    this.currentTypingUserIndicator = '';
                }
            }
        }));
    }
    sendMessage() {
        console.log('tapped on send Message ', this.messageText);
        if (this.messageText !== '') {
            const messageType = _cometchat_pro_cordova_ionic_chat_CometChat__WEBPACK_IMPORTED_MODULE_6__["CometChat"].MESSAGE_TYPE.TEXT;
            const receiverType = _cometchat_pro_cordova_ionic_chat_CometChat__WEBPACK_IMPORTED_MODULE_6__["CometChat"].RECEIVER_TYPE.GROUP;
            // debugger;
            const textMessage = new _cometchat_pro_cordova_ionic_chat_CometChat__WEBPACK_IMPORTED_MODULE_6__["CometChat"].TextMessage(this.currentGroupData, this.messageText, receiverType);
            _cometchat_pro_cordova_ionic_chat_CometChat__WEBPACK_IMPORTED_MODULE_6__["CometChat"].sendMessage(textMessage).then((message) => {
                console.log('Message sent successfully:', message);
                // Text Message Sent Successfully
                this.groupMessages.push(message);
                this.messageText = '';
                this.content.scrollToBottom(1500);
                this.moveToBottom();
            }, (error) => {
                console.log('Message sending failed with error:', error);
            });
        }
    }
    checkBlur() {
        console.log('checkBlur called');
        const receiverId = this.currentGroupData;
        const receiverType = _cometchat_pro_cordova_ionic_chat_CometChat__WEBPACK_IMPORTED_MODULE_6__["CometChat"].RECEIVER_TYPE.GROUP;
        const typingNotification = new _cometchat_pro_cordova_ionic_chat_CometChat__WEBPACK_IMPORTED_MODULE_6__["CometChat"].TypingIndicator(receiverId, receiverType);
        _cometchat_pro_cordova_ionic_chat_CometChat__WEBPACK_IMPORTED_MODULE_6__["CometChat"].endTyping(typingNotification);
    }
    checkFocus() {
        console.log('checkFocus called');
    }
    checkInput() {
        console.log('checkInput called');
        const receiverId = this.currentGroupData;
        const receiverType = _cometchat_pro_cordova_ionic_chat_CometChat__WEBPACK_IMPORTED_MODULE_6__["CometChat"].RECEIVER_TYPE.GROUP;
        const typingNotification = new _cometchat_pro_cordova_ionic_chat_CometChat__WEBPACK_IMPORTED_MODULE_6__["CometChat"].TypingIndicator(receiverId, receiverType);
        _cometchat_pro_cordova_ionic_chat_CometChat__WEBPACK_IMPORTED_MODULE_6__["CometChat"].startTyping(typingNotification);
    }
    ionViewWillLeave() {
    }
    goBack() {
        this.navController.pop();
    }
    listencall() {
        var listnerID = this.currentGroupData;
        const that = this;
        _cometchat_pro_cordova_ionic_chat_CometChat__WEBPACK_IMPORTED_MODULE_6__["CometChat"].addCallListener(listnerID, new _cometchat_pro_cordova_ionic_chat_CometChat__WEBPACK_IMPORTED_MODULE_6__["CometChat"].CallListener({
            onIncomingCallReceived(call) {
                this.sessionID = call.getSessionId();
                console.log('Incoming call:', call, this.sessionID);
                this.callingvariable = call;
                that.router.navigate(['/', 'callingscreen']);
                // Handle incoming call
            },
            onOutgoingCallAccepted(call) {
                console.log('Outgoing call accepted:', call);
                // Outgoing Call Accepted
            },
            onOutgoingCallRejected(call) {
                console.log('Outgoing call rejected:', call);
                // Outgoing Call Rejected
            },
            onIncomingCallCancelled(call) {
                console.log('Incoming call calcelled:', call);
            }
        }));
    }
    gotopage() {
        // console.log(this.callingvariable);
        // this.router.navigate([ '/callingscreen' ]);
    }
    dialcall() {
        var receiverID = this.currentGroupData;
        console.log(receiverID);
        var callType = _cometchat_pro_cordova_ionic_chat_CometChat__WEBPACK_IMPORTED_MODULE_6__["CometChat"].CALL_TYPE.AUDIO;
        console.log(callType);
        var receiverType = _cometchat_pro_cordova_ionic_chat_CometChat__WEBPACK_IMPORTED_MODULE_6__["CometChat"].RECEIVER_TYPE.GROUP;
        console.log(receiverType);
        var call = new _cometchat_pro_cordova_ionic_chat_CometChat__WEBPACK_IMPORTED_MODULE_6__["CometChat"].Call(receiverID, callType, receiverType);
        _cometchat_pro_cordova_ionic_chat_CometChat__WEBPACK_IMPORTED_MODULE_6__["CometChat"].initiateCall(call).then((outGoingCall) => {
            console.log('Call initiated successfully:', outGoingCall);
            this.sessionID = outGoingCall.getSessionId();
            console.log("Hello", this.sessionID);
            this.apiService.callData = outGoingCall;
            //this.apiService.callData = outGoingCall;
            localStorage.setItem('showHideButton', 'true');
            this.router.navigate(['/', 'callingscreen']);
            // perform action on success. Like show your calling screen.
        }, (error) => {
            console.log('Call initialization failed with exception:', error);
        });
    }
    videocall() {
        var receiverID = this.currentGroupData;
        var callType = _cometchat_pro_cordova_ionic_chat_CometChat__WEBPACK_IMPORTED_MODULE_6__["CometChat"].CALL_TYPE.VIDEO;
        var receiverType = _cometchat_pro_cordova_ionic_chat_CometChat__WEBPACK_IMPORTED_MODULE_6__["CometChat"].RECEIVER_TYPE.GROUP;
        var call = new _cometchat_pro_cordova_ionic_chat_CometChat__WEBPACK_IMPORTED_MODULE_6__["CometChat"].Call(receiverID, callType, receiverType);
        _cometchat_pro_cordova_ionic_chat_CometChat__WEBPACK_IMPORTED_MODULE_6__["CometChat"].initiateCall(call).then((outGoingCall) => {
            console.log('Call initiated successfully:', outGoingCall);
            //this.utils.callData = outGoingCall;
            this.apiService.callData = outGoingCall;
            localStorage.setItem('showHideButton', 'true');
            this.router.navigate(['/callingscreen']);
            // perform action on success. Like show your calling screen.
        }, (error) => {
            console.log('Call initialization failed with exception:', error);
        });
    }
    acceptcall() {
        var sessionID = this.sessionID;
        _cometchat_pro_cordova_ionic_chat_CometChat__WEBPACK_IMPORTED_MODULE_6__["CometChat"].acceptCall(sessionID).then((call) => {
            console.log('Call accepted successfully:', call);
            // start the call using the startCall() method
        }, (error) => {
            console.log('Call acceptance failed with error', error);
            // handle exception
        });
    }
    rejectincomingcall() {
        var sessionID = this.sessionID;
        var status = _cometchat_pro_cordova_ionic_chat_CometChat__WEBPACK_IMPORTED_MODULE_6__["CometChat"].CALL_STATUS.REJECTED;
        _cometchat_pro_cordova_ionic_chat_CometChat__WEBPACK_IMPORTED_MODULE_6__["CometChat"].rejectCall(sessionID, status).then((call) => {
            console.log('Call rejected successfully', call);
        }, (error) => {
            console.log('Call rejection failed with error:', error, status);
        });
    }
    pauseAudio() {
        this.audio.pause();
    }
};
ChatPage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Renderer2"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["NavController"] },
    { type: _storage_service__WEBPACK_IMPORTED_MODULE_8__["StorageService"] },
    { type: _utilities_service__WEBPACK_IMPORTED_MODULE_7__["UtilitiesService"] },
    { type: _api_service__WEBPACK_IMPORTED_MODULE_9__["ApiService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["NavController"] }
];
ChatPage.propDecorators = {
    content: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"], args: ['content', { static: false },] }]
};
ChatPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-chat',
        template: _raw_loader_chat_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_chat_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], ChatPage);



/***/ }),

/***/ "n54z":
/*!***************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/chat/chat.page.html ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\r\n    <ion-toolbar>\r\n        <ion-buttons slot=\"start\">\r\n            <ion-button fill=\"clear\" size=\"small\" class=\"ion-no-padding\" (click)=\"goBack()\">\r\n                <ion-img src=\"/assets/images/back.svg\" class=\"action-icon\"></ion-img>\r\n            </ion-button>\r\n        </ion-buttons>\r\n        <ion-buttons slot=\"end\" (click)=\"dialcall()\">\r\n            <ion-icon name=\"call\" style=\"color:#3c78d8;font-size: 20px;\"></ion-icon>&nbsp;&nbsp;\r\n          </ion-buttons>\r\n        <ion-buttons slot=\"end\" (click)=\"videocall()\">\r\n          <ion-icon name=\"videocam\" style=\"color:#3c78d8;font-size: 20px;\"></ion-icon>&nbsp;&nbsp;\r\n          </ion-buttons>\r\n        <ion-title *ngIf=\"currentGroupData\">\r\n            <div class=\"Inline\"><img\r\n                    src=\"{{currentGroupData.avatar || 'https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?resize=256%2C256&quality=100&ssl=1' }}\"\r\n                    class=\"circular\"></div>\r\n            <div class=\"Inline\"><span style=\"padding:5px;font-size: 9px;\">{{currentGroupData.name}}</span></div>\r\n            <!-- <p style=\"margin: 0px; font-size: small; padding-bottom: 2px;\">{{currentUserStatus}}</p> -->\r\n        </ion-title>\r\n    </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content padding #content [scrollEvents]=\"true\" (ionScrollStart)=\"logScrollStart()\" (ionScroll)=\"logScrolling($event)\" (ionScrollEnd)=\"logScrollEnd()\">\r\n    <ion-list>\r\n    <div class=\"chat\" *ngFor=\"let message of groupMessages\">\r\n          <span *ngIf=\"message.message\" style=\"text-align: center;color: dimgray;\"><b style=\"\r\n        font-size: 10px;text-align: center;color: dimgray;\"></b>{{message.message}}</span><br>\r\n      <div *ngIf=\"message.text\" [class]=\"message.sender?.uid === loggedInUserData?.uid ? 'message you' : 'message me'\">\r\n\r\n          <span *ngIf=\"message.text\"><b style=\"\r\n        font-size: 10px\">{{message.sender.name}}:</b></span><br>{{message.text}}</div>\r\n    </div> \r\n    </ion-list>\r\n</ion-content>\r\n\r\n<ion-footer no-border *ngIf=\"userData.role.type !=='designer' && userData.role.type !=='qcinspector'\">\r\n    <ion-toolbar>\r\n      <div class=\"bar bar-footer bar-balanced chat-box-container\">\r\n            <ion-input class=\"chat-editor-box\" placeholder=\"Type Your Message Here..\" type=\"text\" [(ngModel)]=\"messageText\" (ionBlur)=\"checkBlur()\"\r\n            (ionFocus)=\"checkFocus()\" (ionInput)=\"checkInput()\"></ion-input>\r\n            <div class=\"btnSendChatView\">\r\n          <button item-right clear (click)='sendMessage()' class = \"btnSendChatView\">\r\n            <ion-icon name=\"send\" class=\"btnSendChat\"></ion-icon>\r\n          </button>\r\n          </div>\r\n      </div>\r\n    </ion-toolbar>\r\n</ion-footer>\r\n");

/***/ }),

/***/ "tAfe":
/*!***************************************************************************!*\
  !*** ./node_modules/@ionic-native/image-picker/__ivy_ngcc__/ngx/index.js ***!
  \***************************************************************************/
/*! exports provided: OutputType, ImagePicker */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OutputType", function() { return OutputType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImagePicker", function() { return ImagePicker; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ionic_native_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic-native/core */ "C6fG");




var OutputType;
(function (OutputType) {
    OutputType[OutputType["FILE_URL"] = 0] = "FILE_URL";
    OutputType[OutputType["DATA_URL"] = 1] = "DATA_URL";
})(OutputType || (OutputType = {}));
var ImagePicker = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(ImagePicker, _super);
    function ImagePicker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ImagePicker.prototype.getPictures = function (options) { return Object(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["cordova"])(this, "getPictures", { "callbackOrder": "reverse" }, arguments); };
    ImagePicker.prototype.hasReadPermission = function () { return Object(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["cordova"])(this, "hasReadPermission", { "platforms": ["Android"] }, arguments); };
    ImagePicker.prototype.requestReadPermission = function () { return Object(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["cordova"])(this, "requestReadPermission", { "platforms": ["Android"] }, arguments); };
    ImagePicker.pluginName = "ImagePicker";
    ImagePicker.plugin = "cordova-plugin-telerik-imagepicker";
    ImagePicker.pluginRef = "window.imagePicker";
    ImagePicker.repo = "https://github.com/Telerik-Verified-Plugins/ImagePicker";
    ImagePicker.install = "ionic cordova plugin add cordova-plugin-telerik-imagepicker --variable PHOTO_LIBRARY_USAGE_DESCRIPTION=\"your usage message\"";
    ImagePicker.installVariables = ["PHOTO_LIBRARY_USAGE_DESCRIPTION"];
    ImagePicker.platforms = ["Android", "iOS"];
ImagePicker.ɵfac = function ImagePicker_Factory(t) { return ɵImagePicker_BaseFactory(t || ImagePicker); };
ImagePicker.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: ImagePicker, factory: function (t) { return ImagePicker.ɵfac(t); } });
var ɵImagePicker_BaseFactory = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetInheritedFactory"](ImagePicker);
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](ImagePicker, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"]
    }], null, null); })();
    return ImagePicker;
}(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["IonicNativePlugin"]));


//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9AaW9uaWMtbmF0aXZlL3BsdWdpbnMvaW1hZ2UtcGlja2VyL25neC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLDhCQUFzQyxNQUFNLG9CQUFvQixDQUFDOztBQW9EeEUsTUFBTSxDQUFOLElBQVksVUFHWDtBQUhELFdBQVksVUFBVTtBQUNyQixJQUFDLG1EQUFZLENBQUE7QUFBQyxJQUNiLG1EQUFRLENBQUE7QUFDVixDQUFDLEVBSFcsVUFBVSxLQUFWLFVBQVUsUUFHckI7QUFDRDtBQUlVLElBbUN1QiwrQkFBaUI7QUFBQztBQUU5QjtBQUVMO0FBQU0sSUFNcEIsaUNBQVcsYUFBQyxPQUEyQjtBQUtLLElBTTVDLHVDQUFpQjtBQU1BLElBS2pCLDJDQUFxQjtBQUlnRDtBQUE0QztBQUErRDtBQUFrRDtBQUFrRjtBQUEySjtBQUF3RTsrQ0FyQ3hoQixVQUFVOzs7OzswQkFDTDtBQUFDLHNCQWhHUDtBQUFFLEVBZ0crQixpQkFBaUI7QUFDakQsU0FEWSxXQUFXO0FBQUkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb3Jkb3ZhLCBJb25pY05hdGl2ZVBsdWdpbiwgUGx1Z2luIH0gZnJvbSAnQGlvbmljLW5hdGl2ZS9jb3JlJztcblxuZXhwb3J0IGludGVyZmFjZSBJbWFnZVBpY2tlck9wdGlvbnMge1xuICAvKipcbiAgICogbWF4IGltYWdlcyB0byBiZSBzZWxlY3RlZCwgZGVmYXVsdHMgdG8gMTUuIElmIHRoaXMgaXMgc2V0IHRvIDEsIHVwb24gc2VsZWN0aW9uIG9mIGEgc2luZ2xlIGltYWdlLCB0aGUgcGx1Z2luIHdpbGwgcmV0dXJuIGl0LiAoQW5kcm9pZCBvbmx5KVxuICAgKi9cbiAgbWF4aW11bUltYWdlc0NvdW50PzogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBNYXggd2lkdGggdG8gYWxsb3cgaW1hZ2VzIHRvIGJlXG4gICAqL1xuICB3aWR0aD86IG51bWJlcjtcblxuICAvKipcbiAgICogTWF4IGhlaWdodCB0byBhbGxvdyBpbWFnZXMgdG8gYmVcbiAgICovXG4gIGhlaWdodD86IG51bWJlcjtcblxuICAvKipcbiAgICogUXVhbGl0eSBvZiBpbWFnZXMsIGRlZmF1bHRzIHRvIDEwMFxuICAgKi9cbiAgcXVhbGl0eT86IG51bWJlcjtcblxuICAvKipcbiAgICogVmlkZW9zIGFsbG93ZWQ/XG4gICAqL1xuICBhbGxvd192aWRlbz86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIHRoZSBkZWZhdWx0IGlzIHRoZSBtZXNzYWdlIG9mIHRoZSBvbGQgcGx1Z2luIGltcGxcbiAgICovXG4gIHRpdGxlPzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiB0aGUgb2xkIHBsdWdpbiBpbXBsIGRpZG4ndCBoYXZlIGl0LCBzbyBwYXNzaW5nIG51bGwgYnkgZGVmYXVsdFxuICAgKi9cbiAgbWVzc2FnZT86IHN0cmluZztcblxuICAvKipcbiAgICogQ2hvb3NlIHRoZSBmb3JtYXQgb2YgdGhlIHJldHVybiB2YWx1ZS5cbiAgICogRGVmaW5lZCBpbiBJbWFnZVBpY2tlci5PdXRwdXRUeXBlLiBEZWZhdWx0IGlzIEZJTEVfVVJJLlxuICAgKiAgICAgIEZJTEVfVVJJIDogMCwgICBSZXR1cm4gaW1hZ2UgZmlsZSBVUkksXG4gICAqICAgICAgREFUQV9VUkwgOiAxLCAgIFJldHVybiBpbWFnZSBhcyBiYXNlNjQtZW5jb2RlZCBzdHJpbmdcbiAgICovXG4gIG91dHB1dFR5cGU/OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIERpc2FibGUgdGhlIGlPUyBwb3BvdmVyIGFzIHNlZW4gb24gaVBhZFxuICAgKi9cbiAgZGlzYWJsZV9wb3BvdmVyPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGVudW0gT3V0cHV0VHlwZSB7XG4gIEZJTEVfVVJMID0gMCxcbiAgREFUQV9VUkwsXG59XG5cbi8qKlxuICogQG5hbWUgSW1hZ2UgUGlja2VyXG4gKiBAZGVzY3JpcHRpb25cbiAqIENvcmRvdmEgUGx1Z2luIEZvciBNdWx0aXBsZSBJbWFnZSBTZWxlY3Rpb25cbiAqXG4gKiBSZXF1aXJlcyBDb3Jkb3ZhIHBsdWdpbjogYGNvcmRvdmEtcGx1Z2luLWltYWdlLXBpY2tlcmAuXG4gKiBGb3IgbW9yZSBpbmZvLCBwbGVhc2Ugc2VlIHRoZSBodHRwczovL2dpdGh1Yi5jb20vVGVsZXJpay1WZXJpZmllZC1QbHVnaW5zL0ltYWdlUGlja2VyXG4gKlxuICogQHVzYWdlXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBpbXBvcnQgeyBJbWFnZVBpY2tlciB9IGZyb20gJ0Bpb25pYy1uYXRpdmUvaW1hZ2UtcGlja2VyL25neCc7XG4gKlxuICpcbiAqIGNvbnN0cnVjdG9yKHByaXZhdGUgaW1hZ2VQaWNrZXI6IEltYWdlUGlja2VyKSB7IH1cbiAqXG4gKiAuLi5cbiAqXG4gKiB0aGlzLmltYWdlUGlja2VyLmdldFBpY3R1cmVzKG9wdGlvbnMpLnRoZW4oKHJlc3VsdHMpID0+IHtcbiAqICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXN1bHRzLmxlbmd0aDsgaSsrKSB7XG4gKiAgICAgICBjb25zb2xlLmxvZygnSW1hZ2UgVVJJOiAnICsgcmVzdWx0c1tpXSk7XG4gKiAgIH1cbiAqIH0sIChlcnIpID0+IHsgfSk7XG4gKlxuICogYGBgXG4gKiBAaW50ZXJmYWNlc1xuICogSW1hZ2VQaWNrZXJPcHRpb25zXG4gKi9cbkBQbHVnaW4oe1xuICBwbHVnaW5OYW1lOiAnSW1hZ2VQaWNrZXInLFxuICBwbHVnaW46ICdjb3Jkb3ZhLXBsdWdpbi10ZWxlcmlrLWltYWdlcGlja2VyJyxcbiAgcGx1Z2luUmVmOiAnd2luZG93LmltYWdlUGlja2VyJyxcbiAgcmVwbzogJ2h0dHBzOi8vZ2l0aHViLmNvbS9UZWxlcmlrLVZlcmlmaWVkLVBsdWdpbnMvSW1hZ2VQaWNrZXInLFxuICBpbnN0YWxsOlxuICAgICdpb25pYyBjb3Jkb3ZhIHBsdWdpbiBhZGQgY29yZG92YS1wbHVnaW4tdGVsZXJpay1pbWFnZXBpY2tlciAtLXZhcmlhYmxlIFBIT1RPX0xJQlJBUllfVVNBR0VfREVTQ1JJUFRJT049XCJ5b3VyIHVzYWdlIG1lc3NhZ2VcIicsXG4gIGluc3RhbGxWYXJpYWJsZXM6IFsnUEhPVE9fTElCUkFSWV9VU0FHRV9ERVNDUklQVElPTiddLFxuICBwbGF0Zm9ybXM6IFsnQW5kcm9pZCcsICdpT1MnXSxcbn0pXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSW1hZ2VQaWNrZXIgZXh0ZW5kcyBJb25pY05hdGl2ZVBsdWdpbiB7XG4gIC8qKlxuICAgKiBQaWNrIHBpY3R1cmVzIGZyb20gdGhlIGxpYnJhcnkuXG4gICAqIEBwYXJhbSB7SW1hZ2VQaWNrZXJPcHRpb25zfSBvcHRpb25zXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59IFJldHVybnMgYSBQcm9taXNlIHRoYXQgcmVzb2x2ZXMgdGhlIGltYWdlIGZpbGUgVVJJXG4gICAqIG90aGVyd2lzZSByZWplY3RzIHdpdGggYW4gZXJyb3IuXG4gICAqL1xuICBAQ29yZG92YSh7XG4gICAgY2FsbGJhY2tPcmRlcjogJ3JldmVyc2UnLFxuICB9KVxuICBnZXRQaWN0dXJlcyhvcHRpb25zOiBJbWFnZVBpY2tlck9wdGlvbnMpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiB3ZSBoYXZlIHBlcm1pc3Npb24gdG8gcmVhZCBpbWFnZXNcbiAgICogQHJldHVybnMge1Byb21pc2U8Ym9vbGVhbj59IFJldHVybnMgYSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCBhIGJvb2xlYW4gdGhhdCBpbmRpY2F0ZXMgd2hldGhlciB3ZSBoYXZlIHBlcm1pc3Npb25cbiAgICovXG4gIEBDb3Jkb3ZhKHtcbiAgICBwbGF0Zm9ybXM6IFsnQW5kcm9pZCddLFxuICB9KVxuICBoYXNSZWFkUGVybWlzc2lvbigpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvKipcbiAgICogUmVxdWVzdCBwZXJtaXNzaW9uIHRvIHJlYWQgaW1hZ2VzXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XG4gICAqL1xuICBAQ29yZG92YSh7XG4gICAgcGxhdGZvcm1zOiBbJ0FuZHJvaWQnXSxcbiAgfSlcbiAgcmVxdWVzdFJlYWRQZXJtaXNzaW9uKCk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuO1xuICB9XG59XG4iXX0=

/***/ })

}]);
//# sourceMappingURL=chat-chat-module.js.map