(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["comingsoon-comingsoon-module"],{

/***/ "CO2l":
/*!*************************************************!*\
  !*** ./src/app/comingsoon/comingsoon.module.ts ***!
  \*************************************************/
/*! exports provided: ComingsoonPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComingsoonPageModule", function() { return ComingsoonPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _comingsoon_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./comingsoon-routing.module */ "QOdb");
/* harmony import */ var _comingsoon_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./comingsoon.page */ "kItr");







let ComingsoonPageModule = class ComingsoonPageModule {
};
ComingsoonPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _comingsoon_routing_module__WEBPACK_IMPORTED_MODULE_5__["ComingsoonPageRoutingModule"]
        ],
        declarations: [_comingsoon_page__WEBPACK_IMPORTED_MODULE_6__["ComingsoonPage"]]
    })
], ComingsoonPageModule);



/***/ }),

/***/ "GNbn":
/*!*************************************************!*\
  !*** ./src/app/comingsoon/comingsoon.page.scss ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".mt {\n  margin-top: 50%;\n  text-align: center;\n  font-family: inherit;\n  font-size: 25px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXGNvbWluZ3Nvb24ucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksZUFBQTtFQUNBLGtCQUFBO0VBQ0Esb0JBQUE7RUFDQSxlQUFBO0FBQ0oiLCJmaWxlIjoiY29taW5nc29vbi5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubXR7XHJcbiAgICBtYXJnaW4tdG9wOiA1MCU7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBmb250LWZhbWlseTogaW5oZXJpdDtcclxuICAgIGZvbnQtc2l6ZTogMjVweDtcclxufSJdfQ== */");

/***/ }),

/***/ "QOdb":
/*!*********************************************************!*\
  !*** ./src/app/comingsoon/comingsoon-routing.module.ts ***!
  \*********************************************************/
/*! exports provided: ComingsoonPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComingsoonPageRoutingModule", function() { return ComingsoonPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _comingsoon_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./comingsoon.page */ "kItr");




const routes = [
    {
        path: '',
        component: _comingsoon_page__WEBPACK_IMPORTED_MODULE_3__["ComingsoonPage"]
    }
];
let ComingsoonPageRoutingModule = class ComingsoonPageRoutingModule {
};
ComingsoonPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], ComingsoonPageRoutingModule);



/***/ }),

/***/ "kItr":
/*!***********************************************!*\
  !*** ./src/app/comingsoon/comingsoon.page.ts ***!
  \***********************************************/
/*! exports provided: ComingsoonPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComingsoonPage", function() { return ComingsoonPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_comingsoon_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./comingsoon.page.html */ "vgTk");
/* harmony import */ var _comingsoon_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./comingsoon.page.scss */ "GNbn");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");




let ComingsoonPage = class ComingsoonPage {
    constructor() { }
    ngOnInit() {
    }
};
ComingsoonPage.ctorParameters = () => [];
ComingsoonPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-comingsoon',
        template: _raw_loader_comingsoon_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_comingsoon_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], ComingsoonPage);



/***/ }),

/***/ "vgTk":
/*!***************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/comingsoon/comingsoon.page.html ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\r\n  <ion-toolbar>\r\n    <ion-buttons slot=\"start\">\r\n      <ion-back-button></ion-back-button>\r\n    </ion-buttons>\r\n    <!-- <ion-title>comingsoon</ion-title> -->\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n<div class=\"mt\">\r\n  <label>Coming Soon</label>\r\n  <img src=\"assets/images/comingsoon.png\" />\r\n</div>\r\n</ion-content>\r\n");

/***/ })

}]);
//# sourceMappingURL=comingsoon-comingsoon-module.js.map