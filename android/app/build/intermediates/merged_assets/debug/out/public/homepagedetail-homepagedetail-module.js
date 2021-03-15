(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["homepagedetail-homepagedetail-module"],{

/***/ "FrXw":
/*!*******************************************************!*\
  !*** ./src/app/homepagedetail/homepagedetail.page.ts ***!
  \*******************************************************/
/*! exports provided: HomepagedetailPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomepagedetailPage", function() { return HomepagedetailPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_homepagedetail_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./homepagedetail.page.html */ "Wvvi");
/* harmony import */ var _homepagedetail_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./homepagedetail.page.scss */ "rr7M");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _model_design_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../model/design.model */ "QYji");
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../api.service */ "yTNM");
/* harmony import */ var _utilities_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utilities.service */ "oTnF");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic/angular */ "TEn/");









let HomepagedetailPage = class HomepagedetailPage {
    constructor(route, apiservice, utils, navController) {
        this.route = route;
        this.apiservice = apiservice;
        this.utils = utils;
        this.navController = navController;
        this.myId = null;
    }
    ngOnInit() {
        this.myId = this.route.snapshot.paramMap.get('id');
        console.log(this.myId);
        this.desginData = new _model_design_model__WEBPACK_IMPORTED_MODULE_5__["DesginDataModel"]();
        this.getDesginDetail();
        console.log("re", this.desginData.phonenumber);
    }
    getDesginDetail() {
        this.utils.showLoading('loading').then((success) => {
            this.apiservice.getDesginDetail(this.myId).subscribe(response => {
                this.utils.hideLoading();
                this.desginData = response[0];
                console.log("reach", this.desginData);
            }, responseError => {
                this.utils.hideLoading();
                const error = responseError.error;
                this.utils.errorSnackBar(error.message[0].messages[0].message);
            });
        });
    }
    goBack() {
        this.navController.pop();
    }
};
HomepagedetailPage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"] },
    { type: _api_service__WEBPACK_IMPORTED_MODULE_6__["ApiService"] },
    { type: _utilities_service__WEBPACK_IMPORTED_MODULE_7__["UtilitiesService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_8__["NavController"] }
];
HomepagedetailPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-homepagedetail',
        template: _raw_loader_homepagedetail_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_homepagedetail_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], HomepagedetailPage);



/***/ }),

/***/ "QWnb":
/*!*****************************************************************!*\
  !*** ./src/app/homepagedetail/homepagedetail-routing.module.ts ***!
  \*****************************************************************/
/*! exports provided: HomepagedetailPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomepagedetailPageRoutingModule", function() { return HomepagedetailPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _homepagedetail_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./homepagedetail.page */ "FrXw");




const routes = [
    {
        path: ':id',
        component: _homepagedetail_page__WEBPACK_IMPORTED_MODULE_3__["HomepagedetailPage"]
    }
];
let HomepagedetailPageRoutingModule = class HomepagedetailPageRoutingModule {
};
HomepagedetailPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], HomepagedetailPageRoutingModule);



/***/ }),

/***/ "QYji":
/*!***************************************!*\
  !*** ./src/app/model/design.model.ts ***!
  \***************************************/
/*! exports provided: DesignModel, DesignDetails, Solarmake, Solarmodel, Invertermake, Invertermodel, DesginDataModel, PrelimDesign, activities, arcFile */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DesignModel", function() { return DesignModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DesignDetails", function() { return DesignDetails; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Solarmake", function() { return Solarmake; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Solarmodel", function() { return Solarmodel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Invertermake", function() { return Invertermake; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Invertermodel", function() { return Invertermodel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DesginDataModel", function() { return DesginDataModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PrelimDesign", function() { return PrelimDesign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "activities", function() { return activities; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "arcFile", function() { return arcFile; });
class DesignModel {
}
class DesignDetails {
}
class Solarmake {
}
class Solarmodel {
}
class Invertermake {
}
class Invertermodel {
}
class DesginDataModel {
    constructor() {
        this.architecturaldesign = [];
        this.attachments = [];
        this.isoverdue = false;
    }
}
class PrelimDesign {
}
class activities {
}
class arcFile {
}


/***/ }),

/***/ "Wvvi":
/*!***********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/homepagedetail/homepagedetail.page.html ***!
  \***********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-content>\r\n  <ion-grid class=\"detail_box\">\r\n    <ion-row class=\"ion-align-items-center ion-padding-start\">\r\n      <ion-col>\r\n        <ion-button fill=\"clear\" size=\"small\" class=\"ion-no-padding\" (click)=\"goBack()\">\r\n          <ion-icon name=\"arrow-back-outline\" color=\"dark\" size=\"large\"></ion-icon>\r\n      </ion-button>     \r\n      </ion-col>\r\n      <ion-col size=\"5\">\r\n        <h1 class=\"title\">{{desginData.name}}</h1>\r\n    </ion-col>\r\n      <ion-col size=\"auto\">\r\n        <ion-button fill=\"clear\" size=\"small\" class=\"ion-no-padding\">\r\n          <img class=\"edit-icon\"  src=\"assets/images/edit.svg\">\r\n        </ion-button>\r\n    </ion-col>\r\n      <ion-col size=\"auto\">\r\n          <ion-button fill=\"clear\" size=\"small\" class=\"ion-no-padding\">\r\n            <img class=\"delete-icon\"  src=\"assets/images/trash.svg\">\r\n          </ion-button>\r\n      </ion-col>\r\n  </ion-row>\r\n  <ion-row>\r\n    <ion-col size=\"12\" class=\"ion-no-padding\">\r\n      <div style=\"text-align: center\">\r\n        <span class=\"customer-email\">{{desginData.email}}</span>\r\n      </div>\r\n    </ion-col>\r\n\r\n    <ion-col size=\"12\" class=\"ion-no-padding\">\r\n      <div style=\"text-align: center\">\r\n        <span class=\"customer-phone\" *ngIf=\"desginData.phonenumber === undefined\">+91-6272567676</span>\r\n        <span class=\"customer-phone\" *ngIf=\"desginData.phonenumber !== undefined\">{{desginData.phonenumber}}</span>     \r\n      </div>\r\n    </ion-col>\r\n    </ion-row>\r\n  <ion-row class=\"ion-justify-content-center\">\r\n    <ion-col size=\"auto\">\r\n        <div class=\"image-area small-padding\">\r\n            <img  src=\"assets/images/blueprint.svg\">\r\n        </div>\r\n    </ion-col>\r\n</ion-row>\r\n  </ion-grid>\r\n\r\n \r\n  \r\n</ion-content>\r\n");

/***/ }),

/***/ "rr7M":
/*!*********************************************************!*\
  !*** ./src/app/homepagedetail/homepagedetail.page.scss ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".detail_box {\n  border-bottom-left-radius: 40%;\n  border-bottom-right-radius: 40%;\n  background-color: #F9F9F9;\n}\n\n.title {\n  font-size: 22px;\n  color: #666666;\n}\n\n.image-area {\n  margin-top: 1em;\n  width: 3em;\n  height: 3em;\n  background: white;\n  border-radius: 0.5em;\n  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.5);\n}\n\n.image-area img {\n  margin-left: 2px;\n  margin-top: 3px;\n}\n\n.small-padding {\n  padding: 8px;\n}\n\n.profile-name {\n  color: #8B8B8B;\n  font-size: 20px;\n}\n\n.customer-phone {\n  font-size: 0.8em;\n  color: #4272B9;\n}\n\n.customer-email {\n  font-size: 16px;\n  color: #B4B4B4;\n}\n\n.edit-icon {\n  width: 24px;\n  height: 24px;\n}\n\n.delete-icon {\n  width: 22px;\n  height: 22px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXGhvbWVwYWdlZGV0YWlsLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLDhCQUFBO0VBQ0EsK0JBQUE7RUFDQSx5QkFBQTtBQUNKOztBQUVFO0VBQ0UsZUFBQTtFQUNBLGNBQUE7QUFDSjs7QUFFRTtFQUNFLGVBQUE7RUFDQSxVQUFBO0VBQ0EsV0FBQTtFQUNBLGlCQUFBO0VBQ0Esb0JBQUE7RUFDQSwwQ0FBQTtBQUNKOztBQUFJO0VBQ0ksZ0JBQUE7RUFDSixlQUFBO0FBRUo7O0FBRUU7RUFDRSxZQUFBO0FBQ0o7O0FBQ0U7RUFDRSxjQUFBO0VBQ0EsZUFBQTtBQUVKOztBQUFFO0VBQ0UsZ0JBQUE7RUFDQSxjQUFBO0FBR0o7O0FBQUU7RUFDRSxlQUFBO0VBQ0EsY0FBQTtBQUdKOztBQUFFO0VBQ0UsV0FBQTtFQUNBLFlBQUE7QUFHSjs7QUFDQTtFQUNJLFdBQUE7RUFDQSxZQUFBO0FBRUoiLCJmaWxlIjoiaG9tZXBhZ2VkZXRhaWwucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmRldGFpbF9ib3gge1xyXG4gICAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogNDAlO1xyXG4gICAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDQwJTtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNGOUY5Rjk7XHJcbiAgfVxyXG5cclxuICAudGl0bGUge1xyXG4gICAgZm9udC1zaXplOiAyMnB4O1xyXG4gICAgY29sb3I6ICM2NjY2NjY7XHJcbiAgfVxyXG5cclxuICAuaW1hZ2UtYXJlYSB7XHJcbiAgICBtYXJnaW4tdG9wOiAxZW07XHJcbiAgICB3aWR0aDogM2VtO1xyXG4gICAgaGVpZ2h0OiAzZW07XHJcbiAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcclxuICAgIGJvcmRlci1yYWRpdXM6IDAuNWVtO1xyXG4gICAgYm94LXNoYWRvdzogMCAxcHggM3B4IDAgcmdiYSgwLCAwLCAwLCAwLjUpO1xyXG4gICAgaW1ne1xyXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAycHg7XHJcbiAgICBtYXJnaW4tdG9wOiAzcHg7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAuc21hbGwtcGFkZGluZyB7XHJcbiAgICBwYWRkaW5nOiA4cHg7XHJcbiAgfVxyXG4gIC5wcm9maWxlLW5hbWV7XHJcbiAgICBjb2xvcjogIzhCOEI4QjtcclxuICAgIGZvbnQtc2l6ZTogMjBweDtcclxuICB9XHJcbiAgLmN1c3RvbWVyLXBob25lIHtcclxuICAgIGZvbnQtc2l6ZTogMC44ZW07XHJcbiAgICBjb2xvcjogIzQyNzJCOTtcclxuICB9XHJcblxyXG4gIC5jdXN0b21lci1lbWFpbCB7XHJcbiAgICBmb250LXNpemU6IDE2cHg7XHJcbiAgICBjb2xvcjogI0I0QjRCNDtcclxuICB9XHJcblxyXG4gIC5lZGl0LWljb257XHJcbiAgICB3aWR0aDogMjRweDtcclxuICAgIGhlaWdodDogMjRweDtcclxuICB9XHJcblxyXG4gIFxyXG4uZGVsZXRlLWljb24ge1xyXG4gICAgd2lkdGg6IDIycHg7XHJcbiAgICBoZWlnaHQ6IDIycHg7XHJcbn1cclxuICAiXX0= */");

/***/ }),

/***/ "v3vF":
/*!*********************************************************!*\
  !*** ./src/app/homepagedetail/homepagedetail.module.ts ***!
  \*********************************************************/
/*! exports provided: HomepagedetailPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomepagedetailPageModule", function() { return HomepagedetailPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _homepagedetail_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./homepagedetail-routing.module */ "QWnb");
/* harmony import */ var _homepagedetail_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./homepagedetail.page */ "FrXw");







let HomepagedetailPageModule = class HomepagedetailPageModule {
};
HomepagedetailPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _homepagedetail_routing_module__WEBPACK_IMPORTED_MODULE_5__["HomepagedetailPageRoutingModule"]
        ],
        declarations: [_homepagedetail_page__WEBPACK_IMPORTED_MODULE_6__["HomepagedetailPage"]]
    })
], HomepagedetailPageModule);



/***/ })

}]);
//# sourceMappingURL=homepagedetail-homepagedetail-module.js.map