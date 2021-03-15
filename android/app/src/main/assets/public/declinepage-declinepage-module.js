(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["declinepage-declinepage-module"],{

/***/ "0RlQ":
/*!***********************************************************!*\
  !*** ./src/app/declinepage/declinepage-routing.module.ts ***!
  \***********************************************************/
/*! exports provided: DeclinepagePageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeclinepagePageRoutingModule", function() { return DeclinepagePageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _declinepage_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./declinepage.page */ "uPeJ");




const routes = [
    {
        path: '',
        component: _declinepage_page__WEBPACK_IMPORTED_MODULE_3__["DeclinepagePage"]
    }
];
let DeclinepagePageRoutingModule = class DeclinepagePageRoutingModule {
};
DeclinepagePageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], DeclinepagePageRoutingModule);



/***/ }),

/***/ "E8DV":
/*!***************************************************!*\
  !*** ./src/app/declinepage/declinepage.module.ts ***!
  \***************************************************/
/*! exports provided: DeclinepagePageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeclinepagePageModule", function() { return DeclinepagePageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _declinepage_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./declinepage-routing.module */ "0RlQ");
/* harmony import */ var _declinepage_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./declinepage.page */ "uPeJ");







// import { Chooser } from '@ionic-native/chooser/ngx';
let DeclinepagePageModule = class DeclinepagePageModule {
};
DeclinepagePageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        entryComponents: [_declinepage_page__WEBPACK_IMPORTED_MODULE_6__["DeclinepagePage"]],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _declinepage_routing_module__WEBPACK_IMPORTED_MODULE_5__["DeclinepagePageRoutingModule"]
        ],
        declarations: [_declinepage_page__WEBPACK_IMPORTED_MODULE_6__["DeclinepagePage"]],
    })
], DeclinepagePageModule);



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

/***/ })

}]);
//# sourceMappingURL=declinepage-declinepage-module.js.map