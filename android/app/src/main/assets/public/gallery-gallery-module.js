(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["gallery-gallery-module"],{

/***/ "3ros":
/*!*******************************************!*\
  !*** ./src/app/gallery/gallery.module.ts ***!
  \*******************************************/
/*! exports provided: GalleryPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GalleryPageModule", function() { return GalleryPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _gallery_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./gallery-routing.module */ "Fjtg");
/* harmony import */ var _gallery_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./gallery.page */ "vl1N");
/* harmony import */ var _menu_popup_menu_popup_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./menu-popup/menu-popup.component */ "BURQ");
/* harmony import */ var ngx_pinch_zoom__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-pinch-zoom */ "bznP");









let GalleryPageModule = class GalleryPageModule {
};
GalleryPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _gallery_routing_module__WEBPACK_IMPORTED_MODULE_5__["GalleryPageRoutingModule"],
            ngx_pinch_zoom__WEBPACK_IMPORTED_MODULE_8__["PinchZoomModule"]
        ],
        declarations: [_gallery_page__WEBPACK_IMPORTED_MODULE_6__["GalleryPage"], _menu_popup_menu_popup_component__WEBPACK_IMPORTED_MODULE_7__["MenuPopupComponent"]],
        entryComponents: [_gallery_page__WEBPACK_IMPORTED_MODULE_6__["GalleryPage"], _menu_popup_menu_popup_component__WEBPACK_IMPORTED_MODULE_7__["MenuPopupComponent"]]
    })
], GalleryPageModule);



/***/ }),

/***/ "BURQ":
/*!************************************************************!*\
  !*** ./src/app/gallery/menu-popup/menu-popup.component.ts ***!
  \************************************************************/
/*! exports provided: MenuPopupComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MenuPopupComponent", function() { return MenuPopupComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_menu_popup_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./menu-popup.component.html */ "MhB9");
/* harmony import */ var _menu_popup_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./menu-popup.component.scss */ "IECa");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");





let MenuPopupComponent = class MenuPopupComponent {
    constructor(popoverController) {
        this.popoverController = popoverController;
    }
    ngOnInit() {
    }
    showImages(keyname) {
        this.popoverController.dismiss(keyname);
    }
};
MenuPopupComponent.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["PopoverController"] }
];
MenuPopupComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-menu-popup',
        template: _raw_loader_menu_popup_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_menu_popup_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], MenuPopupComponent);



/***/ }),

/***/ "Fjtg":
/*!***************************************************!*\
  !*** ./src/app/gallery/gallery-routing.module.ts ***!
  \***************************************************/
/*! exports provided: GalleryPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GalleryPageRoutingModule", function() { return GalleryPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _gallery_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./gallery.page */ "vl1N");




const routes = [
    {
        path: '',
        component: _gallery_page__WEBPACK_IMPORTED_MODULE_3__["GalleryPage"]
    }
];
let GalleryPageRoutingModule = class GalleryPageRoutingModule {
};
GalleryPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], GalleryPageRoutingModule);



/***/ }),

/***/ "GVE3":
/*!*******************************************!*\
  !*** ./src/app/gallery/gallery.page.scss ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".full-image {\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n  position: absolute;\n  top: 0;\n  left: 0;\n}\n\nion-content {\n  --background: transparent !important;\n}\n\n.white-background {\n  background: white !important;\n  color: black;\n  border-top-left-radius: 4px;\n}\n\nion-segment {\n  --background: #EFEFEF;\n}\n\nion-segment-button {\n  --indicator-color: #FFFFFF;\n  --color-checked: black;\n}\n\n.segments {\n  height: 40px;\n}\n\nion-button {\n  --background: white;\n  height: 40px;\n  width: 40px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXGdhbGxlcnkucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsV0FBQTtFQUNBLFlBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0VBQ0EsTUFBQTtFQUNBLE9BQUE7QUFDRjs7QUFFQTtFQUNFLG9DQUFBO0FBQ0Y7O0FBRUE7RUFDRSw0QkFBQTtFQUNBLFlBQUE7RUFDQSwyQkFBQTtBQUNGOztBQUVBO0VBQ0UscUJBQUE7QUFDRjs7QUFFQTtFQUNFLDBCQUFBO0VBQ0Esc0JBQUE7QUFDRjs7QUFFQTtFQUNFLFlBQUE7QUFDRjs7QUFFQTtFQUNFLG1CQUFBO0VBQ0EsWUFBQTtFQUNBLFdBQUE7QUFDRiIsImZpbGUiOiJnYWxsZXJ5LnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5mdWxsLWltYWdlIHtcclxuICB3aWR0aDogMTAwJTtcclxuICBoZWlnaHQ6IDEwMCU7XHJcbiAgb2JqZWN0LWZpdDogY29udGFpbjtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgdG9wOiAwO1xyXG4gIGxlZnQ6IDA7XHJcbn1cclxuXHJcbmlvbi1jb250ZW50IHtcclxuICAtLWJhY2tncm91bmQ6IHRyYW5zcGFyZW50ICFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbi53aGl0ZS1iYWNrZ3JvdW5kIHtcclxuICBiYWNrZ3JvdW5kOiB3aGl0ZSAhaW1wb3J0YW50O1xyXG4gIGNvbG9yOiBibGFjaztcclxuICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiA0cHg7XHJcbn1cclxuXHJcbmlvbi1zZWdtZW50IHtcclxuICAtLWJhY2tncm91bmQ6ICNFRkVGRUY7XHJcbn1cclxuXHJcbmlvbi1zZWdtZW50LWJ1dHRvbiB7XHJcbiAgLS1pbmRpY2F0b3ItY29sb3I6ICNGRkZGRkY7XHJcbiAgLS1jb2xvci1jaGVja2VkOiBibGFjaztcclxufVxyXG5cclxuLnNlZ21lbnRzIHtcclxuICBoZWlnaHQ6IDQwcHg7XHJcbn1cclxuXHJcbmlvbi1idXR0b24ge1xyXG4gIC0tYmFja2dyb3VuZDogd2hpdGU7XHJcbiAgaGVpZ2h0OiA0MHB4O1xyXG4gIHdpZHRoOiA0MHB4O1xyXG59XHJcblxyXG4iXX0= */");

/***/ }),

/***/ "IECa":
/*!**************************************************************!*\
  !*** ./src/app/gallery/menu-popup/menu-popup.component.scss ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJtZW51LXBvcHVwLmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "MhB9":
/*!****************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/gallery/menu-popup/menu-popup.component.html ***!
  \****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-content>\r\n    <ion-list>\r\n        <ion-item button lines=\"none\" (click)=\"showImages('electrical')\">\r\n            Electricals\r\n        </ion-item>\r\n        <ion-item button lines=\"none\" (click)=\"showImages('roof')\">\r\n            Roof\r\n        </ion-item>\r\n        <ion-item button lines=\"none\" (click)=\"showImages('roofdimensionimages')\">\r\n            Roofdimensionimages\r\n        </ion-item>\r\n        <ion-item button lines=\"none\" (click)=\"showImages('appliancesimages')\">\r\n            Appliancesimages\r\n        </ion-item>\r\n        <ion-item button lines=\"none\" (click)=\"showImages('atticimages')\">\r\n            Atticimages\r\n        </ion-item>\r\n        <ion-item button lines=\"none\" (click)=\"showImages('obstaclesimages')\">\r\n            Obstaclesimages\r\n        </ion-item>\r\n        <ion-item button lines=\"none\" (click)=\"showImages('obstaclesdimensionsimages')\">\r\n            Obstaclesdimensionsimages\r\n        </ion-item>\r\n    </ion-list>\r\n\r\n</ion-content>\r\n");

/***/ }),

/***/ "XHaQ":
/*!*********************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/gallery/gallery.page.html ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-content class=\"white-bg\">\r\n    <ion-grid slot=\"fixed\" style=\"top: 0; width: 100vw;\">\r\n        <ion-row class=\"ion-justify-content-center ion-align-items-center\">\r\n            <ion-col size=\"auto\">\r\n                <ion-button fill=\"clear\" size=\"small\" (click)=\"goBack()\">\r\n                    <ion-icon name=\"chevron-back-outline\" color=\"dark\"></ion-icon>\r\n                </ion-button>\r\n            </ion-col>\r\n            <ion-col class=\"ion-text-center\">\r\n                <span>{{menuName}}</span>\r\n            </ion-col>\r\n            <ion-col size=\"auto\">\r\n                <ion-button fill=\"light\" size=\"small\" (click)=\"showMenu($event)\">\r\n                    <ion-icon name=\"grid-outline\" color=\"dark\"></ion-icon>\r\n                </ion-button>\r\n            </ion-col>\r\n\r\n        </ion-row>\r\n        <ion-row *ngIf=\"menuName === 'Electricals'\">\r\n            <ion-col>\r\n                <ion-segment mode=\"ios\" class=\"segments\" (ionChange)=\"onTabSelected($event)\">\r\n                    <ion-segment-button value=\"mspimages\">\r\n                        <ion-label>MSP</ion-label>\r\n                    </ion-segment-button>\r\n                    <ion-segment-button value=\"utilitymeterimages\">\r\n                        <ion-label>Utility Meter</ion-label>\r\n                    </ion-segment-button>\r\n                    <ion-segment-button value=\"pvinverterimages\">\r\n                        <ion-label>Pv Inverter</ion-label>\r\n                    </ion-segment-button>\r\n                    <ion-segment-button value=\"pvmeterimages\">\r\n                        <ion-label>Pv Meter</ion-label>\r\n                    </ion-segment-button>\r\n                    <ion-segment-button value=\"acdisconnectimages\">\r\n                        <ion-label>Ac Disconnect</ion-label>\r\n                    </ion-segment-button>\r\n                </ion-segment>\r\n            </ion-col>\r\n        </ion-row>\r\n    </ion-grid>\r\n\r\n    <ion-grid class=\"ion-no-padding\" slot=\"fixed\" style=\"bottom: 0; width: 100vw;\" *ngIf=\"listOfImages.length !== 0\">\r\n        <ion-row class=\"ion-justify-content-center ion-align-items-center\">\r\n            <ion-col></ion-col>\r\n            <ion-col size=\"auto\"\r\n                     class=\"white-background ion-align-items-center ion-justify-content-center\" style=\"padding: 8px;\">\r\n                <ion-row class=\"ion-justify-content-center ion-align-items-center\">\r\n                    <ion-col>\r\n                        <ion-button fill=\"clear\" size=\"small\" (click)=\"previousImage()\">\r\n                            <ion-icon name=\"chevron-back-outline\" color=\"dark\"></ion-icon>\r\n                        </ion-button>\r\n                    </ion-col>\r\n                    <ion-col>\r\n                        <ion-label>\r\n                            {{currentPosition + 1}}/{{listOfImages.length}}\r\n                        </ion-label>\r\n                    </ion-col>\r\n                    <ion-col>\r\n                        <ion-button fill=\"clear\" size=\"small\" (click)=\"nextImage()\">\r\n                            <ion-icon name=\"chevron-forward-outline\" color=\"dark\"></ion-icon>\r\n                        </ion-button>\r\n                    </ion-col>\r\n                </ion-row>\r\n            </ion-col>\r\n        </ion-row>\r\n    </ion-grid>\r\n\r\n    <pinch-zoom *ngIf=\"image\" class=\"full-image white-bg\">\r\n        <ion-img [src]=\"image.url\" class=\"full-image\"></ion-img>\r\n    </pinch-zoom>\r\n    <div *ngIf=\"!image\" class=\"d-flex flex-row align-center justify-center full-image\">\r\n        <h1>No image available</h1>\r\n    </div>\r\n\r\n</ion-content>\r\n\r\n\r\n");

/***/ }),

/***/ "vl1N":
/*!*****************************************!*\
  !*** ./src/app/gallery/gallery.page.ts ***!
  \*****************************************/
/*! exports provided: GalleryPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GalleryPage", function() { return GalleryPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_gallery_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./gallery.page.html */ "XHaQ");
/* harmony import */ var _gallery_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gallery.page.scss */ "GVE3");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _menu_popup_menu_popup_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./menu-popup/menu-popup.component */ "BURQ");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _utilities_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utilities.service */ "oTnF");
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../api.service */ "yTNM");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic/storage */ "e8h1");










let GalleryPage = class GalleryPage {
    constructor(popoverController, navController, route, utilities, apiService, storage) {
        this.popoverController = popoverController;
        this.navController = navController;
        this.route = route;
        this.utilities = utilities;
        this.apiService = apiService;
        this.storage = storage;
        this.currentPosition = 0;
        this.listOfImages = [];
        this.menuName = 'Electricals';
        this.selectedTab = 'mspimages';
        this.surveyId = +this.route.snapshot.paramMap.get('id');
    }
    ngOnInit() {
        this.getSurveyDetails();
    }
    // setDataToDataModel(data: MenuModel[]) {
    //   console.log(this.survey);
    //   data.forEach((mainMenu) => {
    //     if (mainMenu.imageModel !== null && mainMenu.imageModel !== undefined) {
    //       mainMenu.imageModel.forEach((imageModel) => {
    //         if (imageModel.image !== '') {
    //           const image = new Image();
    //           image.url = imageModel.image;
    //           this.survey[imageModel.imageUploadTag].push(image);
    //         }
    //       });
    //     }
    //     if (mainMenu.subMenu !== null && mainMenu.subMenu !== undefined) {
    //       mainMenu.subMenu.forEach((submenu) => {
    //         submenu.images.forEach((imageModel) => {
    //           if (imageModel.image !== '') {
    //             const image = new Image();
    //             image.url = imageModel.image;
    //             this.survey[imageModel.imageUploadTag].push(image);
    //           }
    //         });
    //       });
    //     }
    //   });
    //   this.listOfImages = this.survey.mspimages;
    //   this.setImage();
    // }
    getSurveyDetails() {
        this.utilities.showLoading('Getting Survey Details').then((success) => {
            this.apiService.getSurveyDetail(this.surveyId).subscribe((result) => {
                this.utilities.hideLoading().then(() => {
                    this.survey = result;
                    this.listOfImages = this.survey.mspimages;
                    this.currentPosition = 0;
                    this.setImage();
                });
            }, (error) => {
                this.utilities.hideLoading();
            });
        });
    }
    previousImage() {
        if (this.currentPosition > 0) {
            this.currentPosition--;
            this.setImage();
        }
    }
    nextImage() {
        if (this.currentPosition < this.listOfImages.length - 1) {
            this.currentPosition++;
            this.setImage();
        }
    }
    showMenu(event) {
        this.presentPopover(event);
    }
    presentPopover(buttonEvent) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const popover = yield this.popoverController.create({
                component: _menu_popup_menu_popup_component__WEBPACK_IMPORTED_MODULE_4__["MenuPopupComponent"],
                event: buttonEvent,
                translucent: true
            });
            popover.onWillDismiss().then((data) => {
                switch (data.data) {
                    case 'electrical':
                        this.menuName = 'Electricals';
                        this.setImageSource();
                        break;
                    case 'roof':
                        this.menuName = 'Roof';
                        this.listOfImages = this.survey.roofimages;
                        this.currentPosition = 0;
                        this.setImage();
                        break;
                    default:
                        this.menuName = data.data;
                        this.listOfImages = this.survey[data.data];
                        this.currentPosition = 0;
                        this.setImage();
                        break;
                }
            });
            return yield popover.present();
        });
    }
    goBack() {
        this.navController.pop();
    }
    setImage() {
        this.image = this.listOfImages[this.currentPosition];
        console.log(this.image);
    }
    onTabSelected(event) {
        console.log(event.detail.value);
        this.selectedTab = event.detail.value;
        this.setImageSource();
    }
    setImageSource() {
        this.listOfImages = this.survey[this.selectedTab];
        this.currentPosition = 0;
        this.setImage();
    }
};
GalleryPage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["PopoverController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["NavController"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__["ActivatedRoute"] },
    { type: _utilities_service__WEBPACK_IMPORTED_MODULE_7__["UtilitiesService"] },
    { type: _api_service__WEBPACK_IMPORTED_MODULE_8__["ApiService"] },
    { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_9__["Storage"] }
];
GalleryPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-gallery',
        template: _raw_loader_gallery_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_gallery_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], GalleryPage);



/***/ })

}]);
//# sourceMappingURL=gallery-gallery-module.js.map