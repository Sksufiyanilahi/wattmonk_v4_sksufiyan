(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["profile-profile-module"],{

/***/ "/5sG":
/*!********************************************************************************!*\
  !*** ./src/app/profile/profile-notification/profile-notification.component.ts ***!
  \********************************************************************************/
/*! exports provided: ProfileNotificationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfileNotificationComponent", function() { return ProfileNotificationComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_profile_notification_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./profile-notification.component.html */ "oZmb");
/* harmony import */ var _profile_notification_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./profile-notification.component.scss */ "0svw");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_api_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/api.service */ "yTNM");
/* harmony import */ var src_app_utilities_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/utilities.service */ "oTnF");






let ProfileNotificationComponent = class ProfileNotificationComponent {
    constructor(apiservice, utilities) {
        this.apiservice = apiservice;
        this.utilities = utilities;
        this.notification = [];
        this.showLoader = false;
        this.disableContent = false;
    }
    ngOnInit() {
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
};
ProfileNotificationComponent.ctorParameters = () => [
    { type: src_app_api_service__WEBPACK_IMPORTED_MODULE_4__["ApiService"] },
    { type: src_app_utilities_service__WEBPACK_IMPORTED_MODULE_5__["UtilitiesService"] }
];
ProfileNotificationComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-profile-notification',
        template: _raw_loader_profile_notification_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_profile_notification_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], ProfileNotificationComponent);



/***/ }),

/***/ "0svw":
/*!**********************************************************************************!*\
  !*** ./src/app/profile/profile-notification/profile-notification.component.scss ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".profile-icon {\n  width: 50px;\n  height: 50px;\n  margin-right: 4px;\n}\n\n.padding_adjust {\n  padding-left: 0px !important;\n  padding-right: 0px !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFxwcm9maWxlLW5vdGlmaWNhdGlvbi5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQTtFQUNJLFdBQUE7RUFDQSxZQUFBO0VBQ0EsaUJBQUE7QUFBSjs7QUFJRTtFQUNFLDRCQUFBO0VBQ0EsNkJBQUE7QUFESiIsImZpbGUiOiJwcm9maWxlLW5vdGlmaWNhdGlvbi5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4ucHJvZmlsZS1pY29ue1xyXG4gICAgd2lkdGg6IDUwcHg7XHJcbiAgICBoZWlnaHQ6IDUwcHg7XHJcbiAgICBtYXJnaW4tcmlnaHQ6IDRweDtcclxuICAgXHJcbiAgfVxyXG5cclxuICAucGFkZGluZ19hZGp1c3R7XHJcbiAgICBwYWRkaW5nLWxlZnQ6IDBweCAhaW1wb3J0YW50O1xyXG4gICAgcGFkZGluZy1yaWdodDogMHB4ICFpbXBvcnRhbnQ7XHJcbiAgfSJdfQ== */");

/***/ }),

/***/ "CMKO":
/*!************************************************************************!*\
  !*** ./src/app/profile/profile-history/profile-history.component.scss ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".profile-icon {\n  width: 50px;\n  height: 50px;\n  margin-right: 4px;\n}\n\n.history-name {\n  font-size: 16px;\n  color: #787574;\n}\n\n.history-add {\n  color: #CFCBCA;\n  font-size: 14px;\n}\n\n.assign {\n  font-size: 14px;\n  color: #878382;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFxwcm9maWxlLWhpc3RvcnkuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0E7RUFDSSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGlCQUFBO0FBQUo7O0FBSUU7RUFDRSxlQUFBO0VBQ0EsY0FBQTtBQURKOztBQUlFO0VBQ0UsY0FBQTtFQUNFLGVBQUE7QUFETjs7QUFJRTtFQUNJLGVBQUE7RUFDQSxjQUFBO0FBRE4iLCJmaWxlIjoicHJvZmlsZS1oaXN0b3J5LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbi5wcm9maWxlLWljb257XHJcbiAgICB3aWR0aDogNTBweDtcclxuICAgIGhlaWdodDogNTBweDtcclxuICAgIG1hcmdpbi1yaWdodDogNHB4O1xyXG4gICBcclxuICB9XHJcblxyXG4gIC5oaXN0b3J5LW5hbWV7XHJcbiAgICBmb250LXNpemU6IDE2cHg7IFxyXG4gICAgY29sb3I6ICM3ODc1NzQ7XHJcbiAgfVxyXG5cclxuICAuaGlzdG9yeS1hZGR7XHJcbiAgICBjb2xvcjogI0NGQ0JDQTtcclxuICAgICAgZm9udC1zaXplOiAxNHB4O1xyXG4gIH1cclxuXHJcbiAgLmFzc2lnbntcclxuICAgICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgICBjb2xvcjogIzg3ODM4MjtcclxuICB9Il19 */");

/***/ }),

/***/ "Foxe":
/*!**********************************************************************!*\
  !*** ./src/app/profile/profile-history/profile-history.component.ts ***!
  \**********************************************************************/
/*! exports provided: ProfileHistoryComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfileHistoryComponent", function() { return ProfileHistoryComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_profile_history_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./profile-history.component.html */ "ZYpL");
/* harmony import */ var _profile_history_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./profile-history.component.scss */ "CMKO");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");




let ProfileHistoryComponent = class ProfileHistoryComponent {
    constructor() { }
    ngOnInit() { }
};
ProfileHistoryComponent.ctorParameters = () => [];
ProfileHistoryComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-profile-history',
        template: _raw_loader_profile_history_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_profile_history_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], ProfileHistoryComponent);



/***/ }),

/***/ "ZYpL":
/*!**************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/profile/profile-history/profile-history.component.html ***!
  \**************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-content style=\"--background: #FEF8F8;\">\r\n   <ion-grid>\r\n    <ion-row >\r\n      <ion-col size=\"2\">\r\n        <ion-img class=\"profile-icon\" src=\"/assets/images/icons8-checked.svg\"></ion-img>\r\n      </ion-col>\r\n      <ion-col size=\"10\" style=\"margin-top: 6px;\">\r\n        <div style=\"display: flex; justify-content: space-between;\">\r\n          <span class=\"history-name\" >Will Smith</span>\r\n          <span class=\"history-add\" >updated May 2,2020</span>\r\n        </div>\r\n        <div>\r\n          <span class=\"history-add\" >\r\n            25,Wanright,St Providence Road USA\r\n          </span>\r\n        </div>\r\n        <div>\r\n          <span class=\"assign\">\r\n           desgined assign to.....\r\n          </span>\r\n        </div>\r\n      </ion-col>\r\n    </ion-row>\r\n  </ion-grid>\r\n</ion-content>");

/***/ }),

/***/ "cRhG":
/*!*******************************************!*\
  !*** ./src/app/profile/profile.module.ts ***!
  \*******************************************/
/*! exports provided: ProfilePageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfilePageModule", function() { return ProfilePageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _profile_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./profile-routing.module */ "v+7O");
/* harmony import */ var _profile_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./profile.page */ "ncJE");
/* harmony import */ var _profile_notification_profile_notification_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./profile-notification/profile-notification.component */ "/5sG");
/* harmony import */ var _profile_history_profile_history_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./profile-history/profile-history.component */ "Foxe");
/* harmony import */ var _paymentgateway_paymentgateway_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../paymentgateway/paymentgateway.module */ "igVA");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../shared/shared.module */ "PCNd");











let ProfilePageModule = class ProfilePageModule {
};
ProfilePageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        entryComponents: [],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _profile_routing_module__WEBPACK_IMPORTED_MODULE_5__["ProfilePageRoutingModule"],
            _paymentgateway_paymentgateway_module__WEBPACK_IMPORTED_MODULE_9__["PaymentgatewayPageModule"],
            _shared_shared_module__WEBPACK_IMPORTED_MODULE_10__["SharedModule"]
        ],
        declarations: [_profile_page__WEBPACK_IMPORTED_MODULE_6__["ProfilePage"], _profile_notification_profile_notification_component__WEBPACK_IMPORTED_MODULE_7__["ProfileNotificationComponent"], _profile_history_profile_history_component__WEBPACK_IMPORTED_MODULE_8__["ProfileHistoryComponent"],]
    })
], ProfilePageModule);



/***/ }),

/***/ "ncJE":
/*!*****************************************!*\
  !*** ./src/app/profile/profile.page.ts ***!
  \*****************************************/
/*! exports provided: ProfilePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfilePage", function() { return ProfilePage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_profile_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./profile.page.html */ "tXh8");
/* harmony import */ var _profile_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./profile.page.scss */ "zxxS");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _storage_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../storage.service */ "qkCY");
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../api.service */ "yTNM");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/storage */ "e8h1");
/* harmony import */ var _model_constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../model/constants */ "Kp5Z");
/* harmony import */ var _utilities_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../utilities.service */ "oTnF");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @cometchat-pro/cordova-ionic-chat */ "ujHh");
/* harmony import */ var _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _utilities_mixpanel_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../utilities/mixpanel.service */ "uKCw");













let ProfilePage = class ProfilePage {
    constructor(navController, apiService, storage, deviceStorage, utilities, toastController, modalController, router, route, mixpanelService) {
        this.navController = navController;
        this.apiService = apiService;
        this.storage = storage;
        this.deviceStorage = deviceStorage;
        this.utilities = utilities;
        this.toastController = toastController;
        this.modalController = modalController;
        this.router = router;
        this.route = route;
        this.mixpanelService = mixpanelService;
        this.imageUploadIndex = 1;
        this.totalImagesToUpload = 0;
        this.totalSurveys = 0;
        this.surveyIndex = 1;
        this.listOfSurveysToSave = [];
        this.enableDisable = false;
    }
    ngOnInit() {
        this.user = this.storage.getUser(); // get data from resolver
        console.log(this.user);
        this.mixpanelService.track("PROFILE_PAGE_OPEN", {
            $id: this.user.id,
            $email: this.user.email,
            $name: this.user.firstname + this.user.lastname
        });
        this.enableDisable = false;
        // this.user = this.storage.getUser();
        // console.log(this.user);
        this.getProfileData();
    }
    ionViewDidEnter() {
        this.getProfileData();
    }
    goBack() {
        this.mixpanelService.track("PROFILE_PAGE_CLOSE", {});
        this.navController.pop();
    }
    getProfileData() {
        this.apiService.getProfileDetails().subscribe(res => {
            console.log(res);
            this.profile = res;
        });
    }
    isEmptyObject(obj) {
        return (obj && (Object.keys(obj).length === 0));
    }
    AddWallet() {
        // this.router.navigate(['add-money',{mode:'wallet'}]);
        let objToSend = {
            queryParams: {
                //id:response.id,
                mode: 'wallet'
            },
            skipLocationChange: false,
            fragment: 'top'
        };
        this.router.navigate(['/add-money'], {
            state: { productdetails: objToSend }
        });
    }
    logout() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.mixpanelService.track("SIGNOUT", {
                $id: this.user.id,
                $email: this.user.email,
                $name: this.user.firstname + this.user.lastname
            });
            this.enableDisable = true;
            const toast = yield this.toastController.create({
                header: 'Please confirm',
                message: 'Are you sure you want to logout?',
                cssClass: 'my-custom-class',
                buttons: [
                    {
                        text: 'Yes',
                        handler: () => {
                            this.utilities.showLoading('Logging Out').then(() => {
                                _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_11__["CometChat"].logout().then(() => {
                                    this.utilities.hideLoading().then(() => {
                                        this.storage.logout();
                                        this.deviceStorage.clear();
                                        this.apiService.resetHeaders();
                                        this.navController.navigateRoot('login');
                                    });
                                }, err => {
                                    this.storage.logout();
                                    this.deviceStorage.clear();
                                    this.apiService.resetHeaders();
                                    this.utilities.hideLoading();
                                    this.navController.navigateRoot('login');
                                });
                            }, err => {
                                console.log(err);
                                this.utilities.hideLoading();
                            });
                        }
                    }, {
                        text: 'No',
                        handler: () => {
                            this.enableDisable = false;
                        }
                    }
                ]
            });
            yield toast.present();
        });
    }
    syncSurvey() {
        this.listOfSurveysToSave = [];
        this.deviceStorage.keys().then((listOfKeys) => {
            listOfKeys.forEach((item) => {
                this.deviceStorage.get(item).then((data) => {
                    if (data.saved) {
                        this.listOfSurveysToSave.push(data);
                    }
                });
            });
        });
        this.utilities.showLoading('Uploading Images').then(() => {
            this.totalSurveys = this.listOfSurveysToSave.length;
            this.uploadAllSurveys();
        });
    }
    uploadAllSurveys() {
        if (this.listOfSurveysToSave.length !== 0) {
            this.uploadAllImagesOfSurvey(this.listOfSurveysToSave[0]);
        }
        else {
            this.utilities.hideLoading().then(() => {
                this.utilities.showSuccessModal('Survey images have been uploaded').then((modal) => {
                    modal.present();
                });
            });
        }
    }
    uploadAllImagesOfSurvey(surveyData) {
        const mapOfImages = [];
        surveyData.surveyMenu.forEach((mainMenu) => {
            if (mainMenu.imageModel !== null && mainMenu.imageModel !== undefined) {
                mainMenu.imageModel.forEach((imageModel) => {
                    if (imageModel.image !== '') {
                        const image = new _model_constants__WEBPACK_IMPORTED_MODULE_8__["ImageUploadModel"]();
                        image.key = imageModel.imageUploadTag;
                        image.imageData = imageModel.image;
                        image.imagename = imageModel.imageName;
                        mapOfImages.push(image);
                    }
                });
            }
            if (mainMenu.subMenu !== null && mainMenu.subMenu !== undefined) {
                mainMenu.subMenu.forEach((submenu) => {
                    submenu.images.forEach((imageModel) => {
                        if (imageModel.image !== '') {
                            const image = new _model_constants__WEBPACK_IMPORTED_MODULE_8__["ImageUploadModel"]();
                            image.key = imageModel.imageUploadTag;
                            image.imageData = imageModel.image;
                            image.imagename = imageModel.imageName;
                            mapOfImages.push(image);
                        }
                    });
                });
            }
        });
        const image = new _model_constants__WEBPACK_IMPORTED_MODULE_8__["ImageUploadModel"]();
        image.key = 'electricalslocation';
        image.imageData = surveyData.canvasImage;
        image.imagename = 'electricalslocation';
        mapOfImages.push(image);
        this.imageUploadIndex = 1;
        this.totalImagesToUpload = mapOfImages.length;
        this.uploadImageByIndex(mapOfImages, surveyData.surveyid);
    }
    uploadImageByIndex(mapOfImages, surveyId) {
        if (mapOfImages.length !== 0) {
            const imageToUpload = mapOfImages[0];
            const blob = this.utilities.getBlobFromImageData(imageToUpload.imageData);
            let filename = '';
            if (imageToUpload.imagename === '') {
                filename = Date.now().toString() + '.png';
            }
            else {
                filename = imageToUpload.imagename + '.png';
            }
            this.utilities.setLoadingMessage('Uploading Image ' + this.imageUploadIndex + '/' + this.totalImagesToUpload + ' of survey ' + this.surveyIndex + '/' + this.totalSurveys);
            this.apiService.uploadImage(surveyId, imageToUpload.key, blob, filename).subscribe((data) => {
                this.imageUploadIndex++;
                mapOfImages.splice(0, 1);
                this.uploadImageByIndex(mapOfImages, surveyId);
            }, (error) => {
                this.imageUploadIndex++;
                mapOfImages.splice(0, 1);
                this.uploadImageByIndex(mapOfImages, surveyId);
            });
        }
        else {
            this.deviceStorage.remove(surveyId + '');
            this.surveyIndex++;
            this.listOfSurveysToSave.splice(0, 1);
            this.uploadAllSurveys();
        }
    }
    addPoints() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.navController.navigateForward('/paymentgateway');
        });
    }
    ngOnDestroy() {
        //Called once, before the instance is destroyed.
        //Add 'implements OnDestroy' to the class.
    }
};
ProfilePage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["NavController"] },
    { type: _api_service__WEBPACK_IMPORTED_MODULE_6__["ApiService"] },
    { type: _storage_service__WEBPACK_IMPORTED_MODULE_5__["StorageService"] },
    { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_7__["Storage"] },
    { type: _utilities_service__WEBPACK_IMPORTED_MODULE_9__["UtilitiesService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["ToastController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["ModalController"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_10__["Router"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_10__["ActivatedRoute"] },
    { type: _utilities_mixpanel_service__WEBPACK_IMPORTED_MODULE_12__["MixpanelService"] }
];
ProfilePage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-profile',
        template: _raw_loader_profile_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_profile_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], ProfilePage);



/***/ }),

/***/ "oZmb":
/*!************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/profile/profile-notification/profile-notification.component.html ***!
  \************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-content style=\"--background: #e9f1ff;\">\r\n   <ion-grid style=\"text-align: center;\">\r\n       <ion-spinner name=\"dots\" *ngIf=\"!showLoader\"></ion-spinner>\r\n    <ion-row *ngIf=\"notification.length>0;else noNotification\">\r\n      <ion-col class=\"padding_adjust\">\r\n        <ion-item lines=\"none\" style=\"--background: #e9f1ff;\" *ngFor=\"let notifications of notification\">\r\n          <ion-img class=\"profile-icon\" src=\"/assets/images/icons8-checked.svg\"></ion-img>\r\n          <ion-label>\r\n            <h2 style=\"white-space: normal;font-size:14px !important\">{{notifications.message}}</h2>\r\n            <p>{{notifications.created_at | date:'dd/MM/yyyy'}}</p>\r\n          </ion-label>\r\n        </ion-item>\r\n      </ion-col>\r\n    </ion-row>\r\n    <ng-template #noNotification>\r\n      <ion-row>\r\n        <ion-col *ngIf=\"disableContent\" style=\"text-align: center;margin-top: 50%;\"> \r\n          No Notification Found\r\n        </ion-col>\r\n      </ion-row>\r\n    </ng-template>\r\n  </ion-grid>\r\n</ion-content>");

/***/ }),

/***/ "tXh8":
/*!*********************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/profile/profile.page.html ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header class=\"ion-no-border\">\r\n    <ion-grid>\r\n        <ion-row>\r\n            <ion-col size=\"2\">\r\n                <!-- <ion-button  (click)=\"goBack()\" style=\"width: 55px !important; height:20px !important\"> -->\r\n                  <ion-button fill=\"clear\" (click)=\"goBack()\" [disabled]='enableDisable'>\r\n                    <ion-img fill=\"clear\" src=\"assets/images/back.svg\" class=\"action-icon\"></ion-img>\r\n                  </ion-button>\r\n                <!-- </ion-button> -->\r\n            </ion-col>\r\n            <ion-col size=\"8\" ></ion-col>\r\n            <ion-col size=\"2\">\r\n                <ion-button fill=\"clear\" (click)=\"logout()\" [disabled]='enableDisable'>\r\n                    <ion-icon class=\"text-center\" class=\"_color\" name=\"log-out-outline\" style=\"font-size: 26px;width:48px;text-align: center;\"></ion-icon>\r\n                  </ion-button>\r\n                    <!-- <ion-icon class=\"action-button-color\" style=\"font-size: 26px;\"\r\n                              name=\"settings-outline\"></ion-icon> -->\r\n                <!-- </ion-button> -->\r\n            </ion-col>\r\n        </ion-row>\r\n    </ion-grid>\r\n</ion-header>\r\n<ion-content style=\"--background: #fff;\">\r\n\r\n    <ion-grid class=\"profile-background\">\r\n        <ion-row>\r\n            <ion-col size=\"12\">\r\n                <div style=\"display:flex;justify-content: center;\">\r\n                    <ion-card *ngIf=\"isEmptyObject(user?.logo) || user?.logo ==null\" class=\"profile_img\">{{user?.firstname.slice(0,1).toUpperCase() + user?.lastname.slice(0,1).toUpperCase()}}</ion-card>\r\n                    <div *ngIf=\"!isEmptyObject(user?.logo) && user?.logo !==null\">\r\n                      <img [src]=\"user?.logo?.url\" class=\"profile_image\"/>\r\n                    </div>\r\n                    <!-- <img src=\"assets/images/user_placeholder.jpg\" alt=\"User Image\" class=\"user-image\"> -->\r\n                </div>\r\n            </ion-col>\r\n        </ion-row>\r\n        <ion-row>\r\n            <ion-col size=\"12\" class=\"ion-no-padding\">\r\n                <div style=\"text-align: center\">\r\n                    <span class=\"profile-name\">{{user?.firstname}} {{user?.lastname}}</span>\r\n                </div>\r\n            </ion-col>\r\n\r\n            <ion-col size=\"12\" class=\"ion-no-padding\">\r\n                <div style=\"text-align: center\">\r\n                    <span class=\"profile-email\">{{user?.email}}</span>\r\n                </div>\r\n            </ion-col>\r\n            <ion-col size=\"12\" class=\"ion-no-padding\">\r\n                <div style=\"text-align: center\">\r\n                    <span class=\"profile-email\" *ngIf=\"user.role.name=='WattmonkAdmin' || user.role.name=='ContratorAdmin';else role\">{{\"Admin\"}}</span>\r\n                    <ng-template #role>\r\n                      <span class=\"profile-email\" *ngIf=\"user.role.name=='WattmonkAdmin' || user.role.name=='ContratorAdmin'\">{{user.role.name}}</span>\r\n                    </ng-template>\r\n                </div>\r\n            </ion-col>\r\n            <ion-col size=\"12\" class=\"ion-no-padding\" *ngIf=\"(user.role.type=='clientsuperadmin' && profile?.ispaymentmodeprepay)|| user.designertype=='external'\">\r\n              <div style=\"text-align: center\">\r\n                <span>$ {{profile?.amount}}</span><br>\r\n                 <ion-label>Wallet</ion-label>\r\n              </div>\r\n          </ion-col> \r\n          <ion-col style=\"text-align: center;\" *ngIf=\"user.role.type=='clientsuperadmin' && profile?.ispaymentmodeprepay\">\r\n            <ion-button (click)='AddWallet()' fill='clear'>Add money</ion-button> \r\n          </ion-col>\r\n            <!-- <ion-col size=\"12\" class=\"ion-no-padding\">\r\n                <div style=\"text-align: center\">\r\n                    <span class=\"profile-amount\">Total points: {{user.amount}}</span>\r\n                </div>\r\n                <div style=\"text-align: center;color:#4272B9\" (click)=\"addPoints()\">Add points</div>\r\n            </ion-col> -->\r\n\r\n            <!-- <ion-col size=\"12\" class=\"ion-no-padding\">\r\n                <div style=\"text-align: center\">\r\n                    <span style=\"color: #BCBCBC;\">Male</span>\r\n                </div>\r\n            </ion-col> -->\r\n            <!-- <ion-col size=\"12\">\r\n                <div style=\"text-align: center\">\r\n                    <ion-badge class=\"badge-container\">\r\n                        <div class=\"dollar-badge\">\r\n                            <span style=\"color: grey;\">$50</span>\r\n                        </div>\r\n                    </ion-badge>\r\n                </div>\r\n            </ion-col> -->\r\n            <!-- <ion-col class=\"ion-align-items-center ion-text-center\">\r\n                <ion-button fill=\"clear\" class=\"action-button-color\" (click)=\"logout()\">Logout</ion-button>\r\n            </ion-col>\r\n            <ion-col class=\"ion-align-items-center ion-text-center\">\r\n                <ion-button fill=\"clear\" class=\"action-button-color\" (click)=\"syncSurvey()\">Sync Surveys</ion-button>\r\n            </ion-col> -->\r\n        </ion-row>\r\n        <!-- <ion-row> -->\r\n      \r\n        <!-- </ion-row> -->\r\n\r\n        <!-- <ion-row class=\"ion-justify-content-center\">\r\n          <ion-col size=\"6\">\r\n            <div style=\"text-align: center\">\r\n              <span>Notifications</span>\r\n            </div>\r\n\r\n          </ion-col>\r\n          <ion-col size=\"6\">\r\n            <div style=\"text-align: center\">\r\n              <span>History</span>\r\n            </div>\r\n\r\n          </ion-col>\r\n        </ion-row> -->\r\n    </ion-grid>\r\n    <!-- <ion-content style=\"--background: #FEF8F8;\">\r\n         <ion-tabs style=\"\r\n  position: inherit;\">\r\n           <ion-tab-bar slot=\"top\" class=\"ion-no-border\" class=\"profile-tab\">\r\n                <ion-tab-button tab=\"profile-notification\">\r\n                    <ion-label style=\"font-size: 16px;color:#4272B9\">Notifications</ion-label>\r\n                </ion-tab-button>\r\n            </ion-tab-bar>\r\n        </ion-tabs>\r\n\r\n        </ion-content> -->\r\n\r\n    <!-- </ion-content> -->\r\n\r\n</ion-content>\r\n");

/***/ }),

/***/ "v+7O":
/*!***************************************************!*\
  !*** ./src/app/profile/profile-routing.module.ts ***!
  \***************************************************/
/*! exports provided: ProfilePageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfilePageRoutingModule", function() { return ProfilePageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _profile_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./profile.page */ "ncJE");
/* harmony import */ var _profile_notification_profile_notification_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./profile-notification/profile-notification.component */ "/5sG");
/* harmony import */ var _profile_history_profile_history_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./profile-history/profile-history.component */ "Foxe");
/* harmony import */ var _data_resolver_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../data-resolver.service */ "RfyM");







const routes = [
    {
        path: '',
        component: _profile_page__WEBPACK_IMPORTED_MODULE_3__["ProfilePage"],
        resolve: {
            userdata: _data_resolver_service__WEBPACK_IMPORTED_MODULE_6__["DataResolverService"]
        },
        children: [
            {
                path: 'profile-notification',
                component: _profile_notification_profile_notification_component__WEBPACK_IMPORTED_MODULE_4__["ProfileNotificationComponent"],
            },
            {
                path: 'history',
                component: _profile_history_profile_history_component__WEBPACK_IMPORTED_MODULE_5__["ProfileHistoryComponent"]
            },
            {
                path: '',
                redirectTo: 'profile-notification',
                pathMatch: 'full'
            }
        ],
    }
];
let ProfilePageRoutingModule = class ProfilePageRoutingModule {
};
ProfilePageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], ProfilePageRoutingModule);



/***/ }),

/***/ "zxxS":
/*!*******************************************!*\
  !*** ./src/app/profile/profile.page.scss ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".profile-background {\n  width: 100%;\n  border-radius: 50% px;\n  background: white;\n}\n\n.user-image {\n  width: 120px;\n  height: 120px;\n  object-fit: cover;\n  border: 4px solid #4c8dff;\n}\n\n.profile_img {\n  height: 100px;\n  width: 100px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 30px;\n  color: #fff;\n  /* background: blue; */\n  background: #266eef;\n  background: 4c8dff;\n  border: 4px solid #4c8dff;\n  border-radius: 50%;\n}\n\n.profile_image {\n  height: 100px;\n  width: 130px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 30px;\n  color: #fff;\n  /* background: blue; */\n  background: 4c8dff;\n  border: 4px solid #4c8dff;\n}\n\n.profile-name {\n  color: #8B8B8B;\n  font-size: 20px;\n}\n\n.profile-amount {\n  color: #8B8B8B;\n  font-size: 20px;\n}\n\n.profile-email {\n  color: #7B7B7B;\n}\n\n.dollar-badge {\n  margin-top: 6px;\n  width: 60px;\n  height: 13px;\n}\n\n.profile-icon {\n  width: 50px;\n  height: 50px;\n  margin-right: 4px;\n}\n\n.badge-container {\n  background: #e9f1ff;\n  border-radius: 10px;\n}\n\n.profile-tab {\n  border-bottom-left-radius: 32px;\n  border-bottom-right-radius: 32px;\n}\n\nion-tab-bar {\n  --border: none;\n}\n\nion-tab-button {\n  font-size: 1em;\n  --color: #9E9E9E;\n  --color-selected: #3c78d8;\n}\n\n._color {\n  color: #6e6e6e;\n}\n\n.my-custom-modal-css .modal-wrapper {\n  height: 20%;\n  top: 80%;\n  position: absolute;\n  display: block;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXHByb2ZpbGUucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsV0FBQTtFQUNBLHFCQUFBO0VBR0EsaUJBQUE7QUFERjs7QUFLQTtFQUNFLFlBQUE7RUFDQSxhQUFBO0VBQ0EsaUJBQUE7RUFFQSx5QkFBQTtBQUhGOztBQU9BO0VBQ0UsYUFBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtFQUNBLGVBQUE7RUFDQSxXQUFBO0VBRUEsc0JBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0VBQ0EseUJBQUE7RUFDQSxrQkFBQTtBQUxGOztBQVFBO0VBQ0ksYUFBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtFQUNBLGVBQUE7RUFDQSxXQUFBO0VBRUEsc0JBQUE7RUFFQSxrQkFBQTtFQUNBLHlCQUFBO0FBUEo7O0FBWUE7RUFDRSxjQUFBO0VBQ0EsZUFBQTtBQVRGOztBQVdBO0VBQ0UsY0FBQTtFQUNBLGVBQUE7QUFSRjs7QUFXQTtFQUNFLGNBQUE7QUFSRjs7QUFXQTtFQUNFLGVBQUE7RUFDRSxXQUFBO0VBQ0EsWUFBQTtBQVJKOztBQVdBO0VBQ0UsV0FBQTtFQUNBLFlBQUE7RUFDQSxpQkFBQTtBQVJGOztBQVlBO0VBQ0UsbUJBQUE7RUFDQSxtQkFBQTtBQVRGOztBQVlBO0VBQ0UsK0JBQUE7RUFDRSxnQ0FBQTtBQVRKOztBQWFBO0VBQ0UsY0FBQTtBQVZGOztBQWFBO0VBQ0UsY0FBQTtFQUNBLGdCQUFBO0VBQ0EseUJBQUE7QUFWRjs7QUFtQkE7RUFDRSxjQUFBO0FBaEJGOztBQW1CQTtFQUNFLFdBQUE7RUFDQSxRQUFBO0VBQ0Esa0JBQUE7RUFDQSxjQUFBO0FBaEJGIiwiZmlsZSI6InByb2ZpbGUucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnByb2ZpbGUtYmFja2dyb3VuZCB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgYm9yZGVyLXJhZGl1czogNTAlcHg7XHJcbiAgLy8gYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogMzJweDtcclxuICAvLyBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogMzJweDtcclxuICBiYWNrZ3JvdW5kOiB3aGl0ZTtcclxuXHJcbn1cclxuXHJcbi51c2VyLWltYWdlIHtcclxuICB3aWR0aDogMTIwcHg7XHJcbiAgaGVpZ2h0OiAxMjBweDtcclxuICBvYmplY3QtZml0OiBjb3ZlcjtcclxuICAvLyBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgYm9yZGVyOiA0cHggc29saWQgIzRjOGRmZjtcclxuXHJcbn1cclxuXHJcbi5wcm9maWxlX2ltZ3tcclxuICBoZWlnaHQ6IDEwMHB4O1xyXG4gIHdpZHRoOiAxMDBweDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgZm9udC1zaXplOiAzMHB4O1xyXG4gIGNvbG9yOiAjZmZmO1xyXG4gIC8vIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICAvKiBiYWNrZ3JvdW5kOiBibHVlOyAqL1xyXG4gIGJhY2tncm91bmQ6ICMyNjZlZWY7XHJcbiAgYmFja2dyb3VuZDogNGM4ZGZmO1xyXG4gIGJvcmRlcjogNHB4IHNvbGlkICM0YzhkZmY7XHJcbiAgYm9yZGVyLXJhZGl1czo1MCU7XHJcblxyXG59XHJcbi5wcm9maWxlX2ltYWdle1xyXG4gICAgaGVpZ2h0OiAxMDBweDtcclxuICAgIHdpZHRoOiAxMzBweDtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBmb250LXNpemU6IDMwcHg7XHJcbiAgICBjb2xvcjogI2ZmZjtcclxuICAgIC8vIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICAgIC8qIGJhY2tncm91bmQ6IGJsdWU7ICovXHJcbiAgICAvL2JhY2tncm91bmQ6ICMyNjZlZWY7XHJcbiAgICBiYWNrZ3JvdW5kOiA0YzhkZmY7XHJcbiAgICBib3JkZXI6IDRweCBzb2xpZCAjNGM4ZGZmO1xyXG4gICAgLy8gYm9yZGVyLXJhZGl1czo1MCU7c1xyXG5cclxufVxyXG5cclxuLnByb2ZpbGUtbmFtZXtcclxuICBjb2xvcjogIzhCOEI4QjtcclxuICBmb250LXNpemU6IDIwcHg7XHJcbn1cclxuLnByb2ZpbGUtYW1vdW50e1xyXG4gIGNvbG9yOiAjOEI4QjhCO1xyXG4gIGZvbnQtc2l6ZTogMjBweDtcclxufVxyXG5cclxuLnByb2ZpbGUtZW1haWx7XHJcbiAgY29sb3I6ICM3QjdCN0I7XHJcbn1cclxuXHJcbi5kb2xsYXItYmFkZ2V7XHJcbiAgbWFyZ2luLXRvcDogNnB4O1xyXG4gICAgd2lkdGg6IDYwcHg7XHJcbiAgICBoZWlnaHQ6IDEzcHg7XHJcbn1cclxuXHJcbi5wcm9maWxlLWljb257XHJcbiAgd2lkdGg6IDUwcHg7XHJcbiAgaGVpZ2h0OiA1MHB4O1xyXG4gIG1hcmdpbi1yaWdodDogNHB4O1xyXG4gXHJcbn1cclxuXHJcbi5iYWRnZS1jb250YWluZXJ7XHJcbiAgYmFja2dyb3VuZDogI2U5ZjFmZjtcclxuICBib3JkZXItcmFkaXVzOiAxMHB4O1xyXG59XHJcblxyXG4ucHJvZmlsZS10YWJ7XHJcbiAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogMzJweDtcclxuICAgIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAzMnB4O1xyXG59XHJcblxyXG5cclxuaW9uLXRhYi1iYXIge1xyXG4gIC0tYm9yZGVyOiBub25lO1xyXG59XHJcblxyXG5pb24tdGFiLWJ1dHRvbiB7XHJcbiAgZm9udC1zaXplOiAxZW07XHJcbiAgLS1jb2xvcjogIzlFOUU5RTtcclxuICAtLWNvbG9yLXNlbGVjdGVkOiAjM2M3OGQ4O1xyXG59XHJcblxyXG4vLyBpb24tdGFiLWJ1dHRvblthcmlhLXNlbGVjdGVkPXRydWVdIHtcclxuLy8gICBib3JkZXItYm90dG9tOiAzcHggc29saWQgIzNjNzhkODtcclxuLy8gICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiAycHg7XHJcbi8vICAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDJweDtcclxuLy8gfVxyXG5cclxuLl9jb2xvcntcclxuICBjb2xvcjogIzZlNmU2ZTtcclxufVxyXG5cclxuLm15LWN1c3RvbS1tb2RhbC1jc3MgLm1vZGFsLXdyYXBwZXIge1xyXG4gIGhlaWdodDogMjAlO1xyXG4gIHRvcDogODAlO1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTsgXHJcbiAgZGlzcGxheTogYmxvY2s7ICBcclxufVxyXG5cclxuXHJcbiJdfQ== */");

/***/ })

}]);
//# sourceMappingURL=profile-profile-module.js.map