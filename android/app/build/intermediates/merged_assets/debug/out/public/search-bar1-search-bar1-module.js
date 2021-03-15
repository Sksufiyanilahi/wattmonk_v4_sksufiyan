(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["search-bar1-search-bar1-module"],{

/***/ "/2sm":
/*!***************************************************!*\
  !*** ./src/app/search-bar1/search-bar1.page.scss ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".searchStyle {\n  border-radius: 20px;\n}\n\n.chipdetail {\n  display: inline;\n  vertical-align: middle;\n  background-color: #95afc0;\n  font-size: 0.6em;\n  padding: 4px 10px;\n  border-radius: 10px;\n  text-align: center;\n  color: #fff;\n}\n\n.custom-card {\n  background: white !important;\n  border-radius: 4px !important;\n  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.3) !important;\n  padding: 8px 12px;\n}\n\n.alertClass {\n  background-color: wheat;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXHNlYXJjaC1iYXIxLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLG1CQUFBO0FBQ0o7O0FBRUE7RUFDSSxlQUFBO0VBQ0Esc0JBQUE7RUFDQSx5QkFBQTtFQUNBLGdCQUFBO0VBQ0EsaUJBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0VBQ0EsV0FBQTtBQUNKOztBQUNFO0VBRUUsNEJBQUE7RUFDQSw2QkFBQTtFQUNBLHFEQUFBO0VBQ0EsaUJBQUE7QUFDSjs7QUFDRTtFQUNFLHVCQUFBO0FBRUoiLCJmaWxlIjoic2VhcmNoLWJhcjEucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnNlYXJjaFN0eWxle1xyXG4gICAgYm9yZGVyLXJhZGl1czogMjBweDtcclxufVxyXG5cclxuLmNoaXBkZXRhaWx7XHJcbiAgICBkaXNwbGF5OiBpbmxpbmU7XHJcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzk1YWZjMDtcclxuICAgIGZvbnQtc2l6ZTogMC42ZW07XHJcbiAgICBwYWRkaW5nOiA0cHggMTBweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBjb2xvcjogI2ZmZjtcclxuICB9XHJcbiAgLmN1c3RvbS1jYXJkIHtcclxuICAgIFxyXG4gICAgYmFja2dyb3VuZDogd2hpdGUgIWltcG9ydGFudDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDRweCAhaW1wb3J0YW50O1xyXG4gICAgYm94LXNoYWRvdzogMCAxcHggMnB4IDAgcmdiYSgwLCAwLCAwLCAwLjMpICFpbXBvcnRhbnQ7XHJcbiAgICBwYWRkaW5nOiA4cHggMTJweDtcclxuICB9XHJcbiAgLmFsZXJ0Q2xhc3N7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGVhdDtcclxuICB9XHJcbiBcclxuICAiXX0= */");

/***/ }),

/***/ "2jl0":
/*!***********************************************************!*\
  !*** ./src/app/search-bar1/search-bar1-routing.module.ts ***!
  \***********************************************************/
/*! exports provided: SearchBar1PageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchBar1PageRoutingModule", function() { return SearchBar1PageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _search_bar1_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./search-bar1.page */ "bOXI");




const routes = [
    {
        path: '',
        component: _search_bar1_page__WEBPACK_IMPORTED_MODULE_3__["SearchBar1Page"]
    }
];
let SearchBar1PageRoutingModule = class SearchBar1PageRoutingModule {
};
SearchBar1PageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], SearchBar1PageRoutingModule);



/***/ }),

/***/ "YqUK":
/*!***************************************************!*\
  !*** ./src/app/search-bar1/search-bar1.module.ts ***!
  \***************************************************/
/*! exports provided: SearchBar1PageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchBar1PageModule", function() { return SearchBar1PageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _search_bar1_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./search-bar1-routing.module */ "2jl0");
/* harmony import */ var _search_bar1_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./search-bar1.page */ "bOXI");
/* harmony import */ var ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ion-bottom-drawer */ "rFvw");
/* harmony import */ var _utilities_utilities_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utilities/utilities.module */ "egEE");
/* harmony import */ var _ionic_native_diagnostic_ngx__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic-native/diagnostic/ngx */ "mtRb");
/* harmony import */ var _ionic_native_native_geocoder_ngx__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ionic-native/native-geocoder/ngx */ "h+qT");
/* harmony import */ var _ionic_native_launch_navigator_ngx__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ionic-native/launch-navigator/ngx */ "fGQ8");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../shared/shared.module */ "PCNd");
/* harmony import */ var _ionic_native_chooser_ngx__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @ionic-native/chooser/ngx */ "UWV4");
/* harmony import */ var _ionic_native_file_ngx__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @ionic-native/file/ngx */ "FAH8");















let SearchBar1PageModule = class SearchBar1PageModule {
};
SearchBar1PageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _search_bar1_routing_module__WEBPACK_IMPORTED_MODULE_5__["SearchBar1PageRoutingModule"],
            ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_7__["IonBottomDrawerModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
            _utilities_utilities_module__WEBPACK_IMPORTED_MODULE_8__["UtilitiesModule"],
            _shared_shared_module__WEBPACK_IMPORTED_MODULE_12__["SharedModule"],
        ],
        declarations: [_search_bar1_page__WEBPACK_IMPORTED_MODULE_6__["SearchBar1Page"]],
        providers: [
            _ionic_native_diagnostic_ngx__WEBPACK_IMPORTED_MODULE_9__["Diagnostic"],
            _ionic_native_native_geocoder_ngx__WEBPACK_IMPORTED_MODULE_10__["NativeGeocoder"],
            _ionic_native_launch_navigator_ngx__WEBPACK_IMPORTED_MODULE_11__["LaunchNavigator"],
            _ionic_native_chooser_ngx__WEBPACK_IMPORTED_MODULE_13__["Chooser"],
            _ionic_native_file_ngx__WEBPACK_IMPORTED_MODULE_14__["File"]
        ]
    })
], SearchBar1PageModule);



/***/ }),

/***/ "bOXI":
/*!*************************************************!*\
  !*** ./src/app/search-bar1/search-bar1.page.ts ***!
  \*************************************************/
/*! exports provided: SearchBar1Page, DesginDataHelper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchBar1Page", function() { return SearchBar1Page; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DesginDataHelper", function() { return DesginDataHelper; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_search_bar1_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./search-bar1.page.html */ "ttAe");
/* harmony import */ var _search_bar1_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./search-bar1.page.scss */ "/2sm");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../api.service */ "yTNM");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _utilities_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utilities.service */ "oTnF");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/storage */ "e8h1");
/* harmony import */ var ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ion-bottom-drawer */ "rFvw");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _storage_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../storage.service */ "qkCY");
/* harmony import */ var src_app_declinepage_declinepage_page__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/declinepage/declinepage.page */ "uPeJ");
/* harmony import */ var src_app_email_model_email_model_page__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/email-model/email-model.page */ "+k72");
/* harmony import */ var _ionic_native_social_sharing_ngx__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @ionic-native/social-sharing/ngx */ "/XPu");
/* harmony import */ var _utilities_mixpanel_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../utilities/mixpanel.service */ "uKCw");















let SearchBar1Page = class SearchBar1Page {
    constructor(apiService, navController, formBuilder, storage, storageService, socialsharing, utils, alertController, modalController, mixpanelService) {
        this.apiService = apiService;
        this.navController = navController;
        this.formBuilder = formBuilder;
        this.storage = storage;
        this.storageService = storageService;
        this.socialsharing = socialsharing;
        this.utils = utils;
        this.alertController = alertController;
        this.modalController = modalController;
        this.mixpanelService = mixpanelService;
        this.searchElement = '';
        this.surveyId = 0;
        this.segments = 'requesttype=prelim&status=created&status=outsourced&status=requestaccepted';
        this.Type = 'both';
        this.listOfAssignees = [];
        this.listOfAssignees2 = [];
        this.drawerState = ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_8__["DrawerState"].Bottom;
        this.showBottomDraw = false;
        this.designId = 0;
        this.assignForm = this.formBuilder.group({
            assignedto: new _angular_forms__WEBPACK_IMPORTED_MODULE_9__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_9__["Validators"].required]),
            comment: new _angular_forms__WEBPACK_IMPORTED_MODULE_9__["FormControl"]('')
        });
    }
    ngOnInit() {
        this.userData = this.storageService.getUser();
        console.log(this.userData);
        this.mixpanelService.track("SEARCH_PAGE_OPEN", {});
    }
    searchfor(event) {
        if (this.searchElement !== '') {
            this.apiService.searchAllDesgin(this.searchElement).subscribe((dataModel) => {
                console.log("inside this", dataModel);
                if (this.Type == "survey") {
                    this.sample = this.fillinDynamicData(dataModel.survey);
                    this.SurveyModel = this.sample;
                    this.SortedModel = this.SurveyModel;
                }
                if (this.Type == "design") {
                    this.sample = this.fillinDynamicData(dataModel.design);
                    this.DesignModel = this.sample;
                    this.SortedModel = this.DesignModel;
                }
                if (this.Type == "both") {
                    this.sample = this.fillinDynamicData(dataModel.survey);
                    this.SurveyModel = this.sample;
                    this.sample1 = this.fillinDynamicData(dataModel.design);
                    this.DesignModel = this.sample1;
                    //this.MixModel=this.SurveyModel.concat(this.DesignModel);
                    this.MixModel = dataModel.survey.concat(dataModel.design);
                    console.log("welcome", this.MixModel);
                    //this.SortedModel=this.MixModel.sort((a,b) => a.id.localecompare(b.id));
                    this.SortedModel = this.MixModel.sort((a, b) => b.id - a.id);
                }
            });
        }
    }
    fillinDynamicData(records) {
        console.log("that", records);
        records.forEach(element => {
            element.formattedjobtype = this.utils.getJobTypeName(element.jobtype);
        });
        return records;
    }
    goBack() {
        this.mixpanelService.track("SEARCH_PAGE_CLOSE", {});
        this.navController.pop();
    }
    getDesigns(event) {
        debugger;
        let showLoader = true;
        if (event != null && event !== undefined) {
            showLoader = false;
        }
        this.fetchPendingDesigns(event, showLoader);
    }
    fetchPendingDesigns(event, showLoader) {
        console.log("inside fetch Designs");
        this.listOfDesigns = [];
        this.listOfDesignsHelper = [];
        this.utils.showLoadingWithPullRefreshSupport(showLoader, 'Getting Designs').then((success) => {
            // this.apiService.getDesignSurveys(this.segments).subscribe((response:any) => {
            //   this.utils.hideLoadingWithPullRefreshSupport(showLoader).then(() => {
            //     console.log(response);
            //     if (event !== null) {
            //       event.target.complete();
            //     }
            //   });
            // }, responseError => {
            //   this.utils.hideLoadingWithPullRefreshSupport(showLoader).then(() => {
            //     if (event !== null) {
            //       event.target.complete();
            //     }
            //     const error: ErrorModel = responseError.error;
            //     this.utils.errorSnackBar(error.message[0].messages[0].message);
            //   });
            // });
        });
    }
    openDesigners(id, designData) {
        console.log(designData);
        this.designerData = designData;
        this.SearchData = designData;
        console.log(designData);
        if (this.listOfAssignees.length === 0) {
            this.utils.showLoading('Getting Designers').then(() => {
                this.apiService.getDesigners().subscribe(assignees => {
                    this.utils.hideLoading().then(() => {
                        this.listOfAssignees = [];
                        // this.listOfAssignees.push(this.utils.getDefaultAssignee(this.storage.getUserID()));
                        assignees.forEach(item => this.listOfAssignees.push(item));
                        console.log(this.listOfAssignees);
                        this.showBottomDraw = true;
                        this.designId = id;
                        this.utils.setBottomBarHomepage(false);
                        this.drawerState = ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_8__["DrawerState"].Docked;
                        this.assignForm.patchValue({
                            assignedto: 0
                        });
                    });
                }, (error) => {
                    this.utils.hideLoading().then(() => {
                        this.utils.errorSnackBar('Some error occurred. Please try again later');
                    });
                });
            });
        }
        else {
            this.designId = id;
            this.utils.setBottomBarHomepage(false);
            this.drawerState = ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_8__["DrawerState"].Docked;
            this.assignForm.patchValue({
                assignedto: 0
            });
        }
    }
    openSurveyors(id, surveyData) {
        this.surveyData = surveyData;
        this.SearchData = surveyData;
        if (this.listOfAssignees.length === 0) {
            this.utils.showLoading('Getting Surveyors').then(() => {
                this.apiService.getSurveyors().subscribe(assignees => {
                    this.utils.hideLoading().then(() => {
                        this.listOfAssignees = [];
                        // this.listOfAssignees.push(this.utils.getDefaultAssignee(this.storage.getUserID()));
                        assignees.forEach(item => this.listOfAssignees.push(item));
                        console.log(this.listOfAssignees);
                        this.showBottomDraw = true;
                        this.surveyId = id;
                        this.utils.setBottomBarHomepage(false);
                        this.drawerState = ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_8__["DrawerState"].Docked;
                        this.assignForm.patchValue({
                            assignedto: ''
                        });
                    });
                }, (error) => {
                    this.utils.hideLoading().then(() => {
                        this.utils.errorSnackBar('Some error occurred. Please try again later');
                    });
                });
            });
        }
        else {
            this.surveyId = id;
            this.utils.setBottomBarHomepage(false);
            this.drawerState = ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_8__["DrawerState"].Docked;
            this.assignForm.patchValue({
                assignedto: ''
            });
        }
    }
    openAnalysts(id, designData) {
        console.log("this is", designData);
        this.designerData = designData;
        this.SearchData = designData;
        if (this.listOfAssignees.length === 0) {
            this.utils.showLoading('Getting Analysts').then(() => {
                this.apiService.getAnalysts().subscribe(assignees => {
                    this.utils.hideLoading().then(() => {
                        this.listOfAssignees = [];
                        // this.listOfAssignees.push(this.utils.getDefaultAssignee(this.storage.getUserID()));
                        assignees.forEach(item => this.listOfAssignees.push(item));
                        console.log(this.listOfAssignees);
                        this.showBottomDraw = true;
                        this.designId = id;
                        this.utils.setBottomBarHomepage(false);
                        this.drawerState = ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_8__["DrawerState"].Docked;
                        this.assignForm.patchValue({
                            assignedto: 0
                        });
                    });
                }, (error) => {
                    this.utils.hideLoading().then(() => {
                        this.utils.errorSnackBar('Some error occurred. Please try again later');
                    });
                });
            });
        }
        else {
            this.designId = id;
            this.utils.setBottomBarHomepage(false);
            this.drawerState = ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_8__["DrawerState"].Docked;
            this.assignForm.patchValue({
                assignedto: 0
            });
        }
    }
    openreviewPassed(id, designData) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.designId = id;
            let data = designData;
            const alert = yield this.alertController.create({
                cssClass: 'alertClass',
                header: 'Confirm!',
                message: 'Would you like to  Add Comments!!',
                inputs: [{ name: 'comment',
                        id: 'comment',
                        type: 'textarea',
                        placeholder: 'Enter Comment' }
                ],
                buttons: [
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: (blah) => {
                            console.log('Confirm Cancel: blah');
                        }
                    }, {
                        text: 'deliver',
                        handler: (alertData) => {
                            var postData = {};
                            postData = {
                                status: "delivered",
                                comments: alertData.comment,
                            };
                            console.log(postData);
                            if (data.type == "design") {
                                this.apiService.updateDesignForm(postData, this.designId).subscribe((value) => {
                                    this.utils.hideLoading().then(() => {
                                        ;
                                        console.log('reach ', value);
                                        this.utils.showSnackBar('Design request has been delivered successfully');
                                        this.utils.setHomepageDesignRefresh(true);
                                    });
                                }, (error) => {
                                    this.utils.hideLoading();
                                    ;
                                });
                            }
                            if (data.type == "survey") {
                                this.apiService.updateSurveyForm(postData, this.designId).subscribe((value) => {
                                    this.utils.hideLoading().then(() => {
                                        ;
                                        console.log('reach ', value);
                                        this.utils.showSnackBar('Survey request has been delivered successfully');
                                        this.utils.setHomepageDesignRefresh(true);
                                    });
                                }, (error) => {
                                    this.utils.hideLoading();
                                    ;
                                });
                            }
                        }
                    }
                ]
            });
            yield alert.present();
        });
    }
    close() {
        if (this.showBottomDraw === true) {
            this.showBottomDraw = false;
            this.drawerState = ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_8__["DrawerState"].Bottom;
            this.utils.setBottomBarHomepage(true);
        }
        else {
            this.showBottomDraw = true;
        }
    }
    getassignedata(asssignedata) {
        this.selectedDesigner = asssignedata;
    }
    accept(id, data) {
        let event = null;
        let status = {
            status: data
        };
        this.apiService.updateDesignForm(status, id).subscribe((res) => {
        });
        this.searchfor(event);
    }
    decline(id) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const modal = yield this.modalController.create({
                component: src_app_declinepage_declinepage_page__WEBPACK_IMPORTED_MODULE_11__["DeclinepagePage"],
                cssClass: 'my-custom-modal-css',
                componentProps: {
                    id: id
                },
                backdropDismiss: false
            });
            modal.onDidDismiss().then((data) => {
                console.log(data);
                if (data.data.cancel == 'cancel') {
                }
                else {
                    this.getDesigns(null);
                }
            });
            // modal.dismiss(() => {
            //   ;
            //   this.getDesigns(null);
            // });
            return yield modal.present();
        });
    }
    dismissBottomSheet() {
        console.log('this', this.drawerState);
        this.drawerState = ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_8__["DrawerState"].Bottom;
        this.utils.setBottomBarHomepage(true);
        this.listOfAssignees = [];
    }
    //assigning to surveyor
    assignToSurveyor() {
        if (this.assignForm.status === 'INVALID') {
            this.utils.errorSnackBar('Please select a surveyor');
        }
        else {
            var designstarttime = new Date();
            var milisecond = designstarttime.getTime();
            var additonalhours = 0;
            if (this.surveyData.requesttype == "prelim") {
                console.log(parseInt(this.selectedDesigner.jobcount));
                additonalhours = parseInt(this.selectedDesigner.jobcount) * 2;
                designstarttime.setHours(designstarttime.getHours() + additonalhours);
            }
            else {
                additonalhours = parseInt(this.selectedDesigner.jobcount) * 6;
                designstarttime.setHours(designstarttime.getHours() + additonalhours);
            }
            console.log(this.selectedDesigner);
            var postData = {};
            if (this.surveyData.createdby.id == this.userData.id) {
                if (this.selectedDesigner.company == this.userData.company) {
                    if (this.selectedDesigner.role.type == "qcinspector") {
                        postData = {
                            reviewassignedto: this.selectedDesigner.id,
                            status: "reviewassigned",
                            reviewstarttime: milisecond
                        };
                    }
                    if (this.selectedDesigner.role.type == "surveyor") {
                        postData = {
                            designassignedto: this.selectedDesigner.id,
                            isoutsourced: "false",
                            status: "surveyassigned",
                            designstarttime: designstarttime
                        };
                    }
                }
                else {
                    postData = {
                        outsourcedto: this.selectedDesigner.id,
                        isoutsourced: "true",
                        status: "outsourced"
                    };
                }
            }
            else {
                if (this.selectedDesigner.role.type == "surveyor") {
                    postData = {
                        designassignedto: this.selectedDesigner.id,
                        status: "surveyassigned",
                        designstarttime: designstarttime
                    };
                }
                if (this.selectedDesigner.role.type == "qcinspector") {
                    postData = {
                        reviewassignedto: this.selectedDesigner.id,
                        status: "reviewassigned",
                        reviewstarttime: milisecond
                    };
                }
            }
            this.utils.showLoading('Assigning').then(() => {
                this.apiService.updateSurveyForm(postData, this.surveyId).subscribe((value) => {
                    this.utils.hideLoading().then(() => {
                        ;
                        console.log('reach ', value);
                        this.utils.showSnackBar('Survey request has been assigned to' + ' ' + this.selectedDesigner.firstname + ' ' + this.selectedDesigner.lastname + ' ' + 'successfully');
                        this.dismissBottomSheet();
                        this.showBottomDraw = false;
                        this.utils.setHomepageDesignRefresh(true);
                    });
                }, (error) => {
                    this.utils.hideLoading();
                    this.dismissBottomSheet();
                    this.showBottomDraw = false;
                });
            });
        }
    }
    //assigning to designer
    assignToDesigner() {
        console.log(this.designerData.createdby.id);
        if (this.assignForm.status === 'INVALID' && (this.designerData.status === 'designcompleted' || this.designerData.status === 'reviewassigned' || this.designerData.status === 'reviewfailed' || this.designerData.status === 'reviewpassed')) {
            this.utils.errorSnackBar('Please select a analyst');
        }
        else if (this.assignForm.status === 'INVALID' && (this.designerData.status === 'created' || this.designerData.status === 'requestaccepted' || this.designerData.status === 'designassigned')) {
            this.utils.errorSnackBar('Please select a designer');
        }
        else {
            var designstarttime = new Date();
            var milisecond = designstarttime.getTime();
            var additonalhours = 0;
            if (this.designerData.requesttype == "prelim") {
                additonalhours = this.selectedDesigner.jobcount * 2;
                designstarttime.setHours(designstarttime.getHours() + additonalhours);
            }
            else {
                additonalhours = this.selectedDesigner.jobcount * 6;
                designstarttime.setHours(designstarttime.getHours() + additonalhours);
            }
            var postData = {};
            if (this.designerData.createdby.id == this.userData.id) {
                if (this.selectedDesigner.company == this.userData.company) {
                    if (this.selectedDesigner.role.type == "qcinspector") {
                        postData = {
                            reviewassignedto: this.selectedDesigner.id,
                            status: "reviewassigned",
                            reviewstarttime: milisecond
                        };
                    }
                    if (this.selectedDesigner.role.type == "designer") {
                        postData = {
                            designassignedto: this.selectedDesigner.id,
                            isoutsourced: "false",
                            status: "designassigned",
                            designstarttime: designstarttime
                        };
                    }
                }
                else {
                    postData = {
                        outsourcedto: this.selectedDesigner.id,
                        isoutsourced: "true",
                        status: "outsourced"
                    };
                }
            }
            else {
                if (this.selectedDesigner.role.type == "designer") {
                    postData = {
                        designassignedto: this.selectedDesigner.id,
                        status: "designassigned",
                        designstarttime: designstarttime
                    };
                }
                if (this.selectedDesigner.role.type == "qcinspector") {
                    postData = {
                        reviewassignedto: this.selectedDesigner.id,
                        status: "reviewassigned",
                        reviewstarttime: milisecond
                    };
                }
            }
            this.utils.showLoading('Assigning').then(() => {
                this.apiService.updateDesignForm(postData, this.designId).subscribe((value) => {
                    this.utils.hideLoading().then(() => {
                        ;
                        console.log('reach ', value);
                        this.utils.showSnackBar('Design request has been assigned to' + ' ' + this.selectedDesigner.firstname + ' ' + this.selectedDesigner.lastname + ' ' + 'successfully');
                        this.dismissBottomSheet();
                        this.showBottomDraw = false;
                        this.utils.setHomepageDesignRefresh(true);
                    });
                }, (error) => {
                    this.utils.hideLoading();
                    this.dismissBottomSheet();
                    this.showBottomDraw = false;
                });
            });
        }
    }
    //method for bottom drawer confirm
    assign() {
        if (this.assignForm.status == 'INVALID') {
            this.utils.errorSnackBar('Please select a analyst');
        }
        else {
            if (this.selectedDesigner.role.type == "designer") {
                this.assignToDesigner();
            }
            else if (this.selectedDesigner.role.type == "surveyor") {
                this.assignToSurveyor();
            }
            else if (this.selectedDesigner.role.type == "qcinspector") {
                console.log(this.SearchData);
                if (this.SearchData.type == "design") {
                    this.assignToDesigner();
                }
                if (this.SearchData.type == "survey") {
                    this.assignToSurveyor();
                }
            }
        }
    }
    shareWhatsapp(designData) {
        this.socialsharing.share(designData.prelimdesign.url);
    }
    shareViaEmails(id, designData) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const modal = yield this.modalController.create({
                component: src_app_email_model_email_model_page__WEBPACK_IMPORTED_MODULE_12__["EmailModelPage"],
                cssClass: 'email-modal-css',
                componentProps: {
                    id: id,
                    designData: designData
                },
            });
            modal.onDidDismiss().then((data) => {
                console.log(data);
                if (data.data.cancel == 'cancel') {
                }
                else {
                    this.getDesigns(null);
                }
            });
            return yield modal.present();
        });
    }
    refreshData(event) {
        let showLoader = true;
        if (event !== null && event !== undefined) {
            showLoader = false;
        }
        this.fetchPendingDesigns(event, showLoader);
    }
};
SearchBar1Page.ctorParameters = () => [
    { type: _api_service__WEBPACK_IMPORTED_MODULE_4__["ApiService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["NavController"] },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_9__["FormBuilder"] },
    { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_7__["Storage"] },
    { type: _storage_service__WEBPACK_IMPORTED_MODULE_10__["StorageService"] },
    { type: _ionic_native_social_sharing_ngx__WEBPACK_IMPORTED_MODULE_13__["SocialSharing"] },
    { type: _utilities_service__WEBPACK_IMPORTED_MODULE_6__["UtilitiesService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["AlertController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["ModalController"] },
    { type: _utilities_mixpanel_service__WEBPACK_IMPORTED_MODULE_14__["MixpanelService"] }
];
SearchBar1Page = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-search-bar1',
        template: _raw_loader_search_bar1_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_search_bar1_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], SearchBar1Page);

class DesginDataHelper {
    constructor() {
        this.listOfDesigns = [];
    }
}


/***/ }),

/***/ "h+qT":
/*!******************************************************************************!*\
  !*** ./node_modules/@ionic-native/native-geocoder/__ivy_ngcc__/ngx/index.js ***!
  \******************************************************************************/
/*! exports provided: NativeGeocoder */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NativeGeocoder", function() { return NativeGeocoder; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ionic_native_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic-native/core */ "C6fG");




var NativeGeocoder = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(NativeGeocoder, _super);
    function NativeGeocoder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NativeGeocoder.prototype.reverseGeocode = function (latitude, longitude, options) { return Object(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["cordova"])(this, "reverseGeocode", { "callbackOrder": "reverse" }, arguments); };
    NativeGeocoder.prototype.forwardGeocode = function (addressString, options) { return Object(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["cordova"])(this, "forwardGeocode", { "callbackOrder": "reverse" }, arguments); };
    NativeGeocoder.pluginName = "NativeGeocoder";
    NativeGeocoder.plugin = "cordova-plugin-nativegeocoder";
    NativeGeocoder.pluginRef = "nativegeocoder";
    NativeGeocoder.repo = "https://github.com/sebastianbaar/cordova-plugin-nativegeocoder";
    NativeGeocoder.platforms = ["iOS", "Android"];
NativeGeocoder.ɵfac = function NativeGeocoder_Factory(t) { return ɵNativeGeocoder_BaseFactory(t || NativeGeocoder); };
NativeGeocoder.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: NativeGeocoder, factory: function (t) { return NativeGeocoder.ɵfac(t); } });
var ɵNativeGeocoder_BaseFactory = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetInheritedFactory"](NativeGeocoder);
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](NativeGeocoder, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"]
    }], null, null); })();
    return NativeGeocoder;
}(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["IonicNativePlugin"]));


//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9AaW9uaWMtbmF0aXZlL3BsdWdpbnMvbmF0aXZlLWdlb2NvZGVyL25neC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLDhCQUFzQyxNQUFNLG9CQUFvQixDQUFDOztBQUN4RTtBQUlVLElBbUMwQixrQ0FBaUI7QUFBQztBQUU5QjtBQUNKO0FBQU0sSUFReEIsdUNBQWMsYUFDWixRQUFnQixFQUNoQixTQUFpQixFQUNqQixPQUErQjtBQU1SLElBUXpCLHVDQUFjLGFBQUMsYUFBcUIsRUFBRSxPQUErQjtBQU16QztBQUV6QjtBQUE2RDtBQUN4QjtBQUlsQztrREExQ1AsVUFBVTs7Ozs7MEJBQ0w7QUFBQyx5QkF6Q1A7QUFBRSxFQXlDa0MsaUJBQWlCO0FBQ3BELFNBRFksY0FBYztBQUFJIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29yZG92YSwgSW9uaWNOYXRpdmVQbHVnaW4sIFBsdWdpbiB9IGZyb20gJ0Bpb25pYy1uYXRpdmUvY29yZSc7XG5cbi8qKlxuICogQG5hbWUgTmF0aXZlIEdlb2NvZGVyXG4gKiBAZGVzY3JpcHRpb25cbiAqIENvcmRvdmEgcGx1Z2luIGZvciBuYXRpdmUgZm9yd2FyZCBhbmQgcmV2ZXJzZSBnZW9jb2RpbmdcbiAqXG4gKiBAdXNhZ2VcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGltcG9ydCB7IE5hdGl2ZUdlb2NvZGVyLCBOYXRpdmVHZW9jb2RlclJlc3VsdCwgTmF0aXZlR2VvY29kZXJPcHRpb25zIH0gZnJvbSAnQGlvbmljLW5hdGl2ZS9uYXRpdmUtZ2VvY29kZXIvbmd4JztcbiAqXG4gKiBjb25zdHJ1Y3Rvcihwcml2YXRlIG5hdGl2ZUdlb2NvZGVyOiBOYXRpdmVHZW9jb2RlcikgeyB9XG4gKlxuICogLi4uXG4gKlxuICogbGV0IG9wdGlvbnM6IE5hdGl2ZUdlb2NvZGVyT3B0aW9ucyA9IHtcbiAqICAgICB1c2VMb2NhbGU6IHRydWUsXG4gKiAgICAgbWF4UmVzdWx0czogNVxuICogfTtcbiAqXG4gKiB0aGlzLm5hdGl2ZUdlb2NvZGVyLnJldmVyc2VHZW9jb2RlKDUyLjUwNzIwOTUsIDEzLjE0NTI4MTgsIG9wdGlvbnMpXG4gKiAgIC50aGVuKChyZXN1bHQ6IE5hdGl2ZUdlb2NvZGVyUmVzdWx0W10pID0+IGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHJlc3VsdFswXSkpKVxuICogICAuY2F0Y2goKGVycm9yOiBhbnkpID0+IGNvbnNvbGUubG9nKGVycm9yKSk7XG4gKlxuICogdGhpcy5uYXRpdmVHZW9jb2Rlci5mb3J3YXJkR2VvY29kZSgnQmVybGluJywgb3B0aW9ucylcbiAqICAgLnRoZW4oKHJlc3VsdDogTmF0aXZlR2VvY29kZXJSZXN1bHRbXSkgPT4gY29uc29sZS5sb2coJ1RoZSBjb29yZGluYXRlcyBhcmUgbGF0aXR1ZGU9JyArIHJlc3VsdFswXS5sYXRpdHVkZSArICcgYW5kIGxvbmdpdHVkZT0nICsgcmVzdWx0WzBdLmxvbmdpdHVkZSkpXG4gKiAgIC5jYXRjaCgoZXJyb3I6IGFueSkgPT4gY29uc29sZS5sb2coZXJyb3IpKTtcbiAqIGBgYFxuICogQGludGVyZmFjZXNcbiAqIE5hdGl2ZUdlb2NvZGVyUmVzdWx0XG4gKiBOYXRpdmVHZW9jb2Rlck9wdGlvbnNcbiAqL1xuQFBsdWdpbih7XG4gIHBsdWdpbk5hbWU6ICdOYXRpdmVHZW9jb2RlcicsXG4gIHBsdWdpbjogJ2NvcmRvdmEtcGx1Z2luLW5hdGl2ZWdlb2NvZGVyJyxcbiAgcGx1Z2luUmVmOiAnbmF0aXZlZ2VvY29kZXInLFxuICByZXBvOiAnaHR0cHM6Ly9naXRodWIuY29tL3NlYmFzdGlhbmJhYXIvY29yZG92YS1wbHVnaW4tbmF0aXZlZ2VvY29kZXInLFxuICBwbGF0Zm9ybXM6IFsnaU9TJywgJ0FuZHJvaWQnXSxcbn0pXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTmF0aXZlR2VvY29kZXIgZXh0ZW5kcyBJb25pY05hdGl2ZVBsdWdpbiB7XG4gIC8qKlxuICAgKiBSZXZlcnNlIGdlb2NvZGUgYSBnaXZlbiBsYXRpdHVkZSBhbmQgbG9uZ2l0dWRlIHRvIGZpbmQgbG9jYXRpb24gYWRkcmVzc1xuICAgKiBAcGFyYW0gbGF0aXR1ZGUge251bWJlcn0gVGhlIGxhdGl0dWRlXG4gICAqIEBwYXJhbSBsb25naXR1ZGUge251bWJlcn0gVGhlIGxvbmdpdHVkZVxuICAgKiBAcGFyYW0gb3B0aW9ucyB7TmF0aXZlR2VvY29kZXJPcHRpb25zfSBUaGUgb3B0aW9uc1xuICAgKiBAcmV0dXJuIHtQcm9taXNlPE5hdGl2ZUdlb2NvZGVyUmVzdWx0W10+fVxuICAgKi9cbiAgQENvcmRvdmEoe1xuICAgIGNhbGxiYWNrT3JkZXI6ICdyZXZlcnNlJyxcbiAgfSlcbiAgcmV2ZXJzZUdlb2NvZGUoXG4gICAgbGF0aXR1ZGU6IG51bWJlcixcbiAgICBsb25naXR1ZGU6IG51bWJlcixcbiAgICBvcHRpb25zPzogTmF0aXZlR2VvY29kZXJPcHRpb25zXG4gICk6IFByb21pc2U8TmF0aXZlR2VvY29kZXJSZXN1bHRbXT4ge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8qKlxuICAgKiBGb3J3YXJkIGdlb2NvZGUgYSBnaXZlbiBhZGRyZXNzIHRvIGZpbmQgY29vcmRpbmF0ZXNcbiAgICogQHBhcmFtIGFkZHJlc3NTdHJpbmcge3N0cmluZ30gVGhlIGFkZHJlc3MgdG8gYmUgZ2VvY29kZWRcbiAgICogQHBhcmFtIG9wdGlvbnMge05hdGl2ZUdlb2NvZGVyT3B0aW9uc30gVGhlIG9wdGlvbnNcbiAgICogQHJldHVybiB7UHJvbWlzZTxOYXRpdmVHZW9jb2RlclJlc3VsdFtdPn1cbiAgICovXG4gIEBDb3Jkb3ZhKHtcbiAgICBjYWxsYmFja09yZGVyOiAncmV2ZXJzZScsXG4gIH0pXG4gIGZvcndhcmRHZW9jb2RlKGFkZHJlc3NTdHJpbmc6IHN0cmluZywgb3B0aW9ucz86IE5hdGl2ZUdlb2NvZGVyT3B0aW9ucyk6IFByb21pc2U8TmF0aXZlR2VvY29kZXJSZXN1bHRbXT4ge1xuICAgIHJldHVybjtcbiAgfVxufVxuXG4vKipcbiAqIEVuY2Fwc3VsYXRlcyBmb3JtYXQgaW5mb3JtYXRpb24gYWJvdXQgYSBnZW9jb2RpbmcgcmVzdWx0LlxuICogbW9yZSBJbmZvOlxuICogIC0gaHR0cHM6Ly9kZXZlbG9wZXIuYXBwbGUuY29tL2RvY3VtZW50YXRpb24vY29yZWxvY2F0aW9uL2NscGxhY2VtYXJrXG4gKiAgLSBodHRwczovL2RldmVsb3Blci5hbmRyb2lkLmNvbS9yZWZlcmVuY2UvYW5kcm9pZC9sb2NhdGlvbi9BZGRyZXNzLmh0bWxcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBOYXRpdmVHZW9jb2RlclJlc3VsdCB7XG4gIC8qKlxuICAgKiBUaGUgbGF0aXR1ZGUuXG4gICAqL1xuICBsYXRpdHVkZTogc3RyaW5nO1xuICAvKipcbiAgICogVGhlIGxvbmdpdHVkZS5cbiAgICovXG4gIGxvbmdpdHVkZTogc3RyaW5nO1xuICAvKipcbiAgICogVGhlIGNvdW50cnkgY29kZS5cbiAgICovXG4gIGNvdW50cnlDb2RlOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBUaGUgY291bnRyeSBuYW1lLlxuICAgKi9cbiAgY291bnRyeU5hbWU6IHN0cmluZztcbiAgLyoqXG4gICAqIFRoZSBwb3N0YWwgY29kZS5cbiAgICovXG4gIHBvc3RhbENvZGU6IHN0cmluZztcbiAgLyoqXG4gICAqIFRoZSBhZG1pbmlzdHJhdGl2ZUFyZWEuXG4gICAqL1xuICBhZG1pbmlzdHJhdGl2ZUFyZWE6IHN0cmluZztcbiAgLyoqXG4gICAqIFRoZSBzdWJBZG1pbmlzdHJhdGl2ZUFyZWEuXG4gICAqL1xuICBzdWJBZG1pbmlzdHJhdGl2ZUFyZWE6IHN0cmluZztcbiAgLyoqXG4gICAqIFRoZSBsb2NhbGl0eS5cbiAgICovXG4gIGxvY2FsaXR5OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBUaGUgc3ViTG9jYWxpdHkuXG4gICAqL1xuICBzdWJMb2NhbGl0eTogc3RyaW5nO1xuICAvKipcbiAgICogVGhlIHRob3JvdWdoZmFyZS5cbiAgICovXG4gIHRob3JvdWdoZmFyZTogc3RyaW5nO1xuICAvKipcbiAgICogVGhlIHN1YlRob3JvdWdoZmFyZS5cbiAgICovXG4gIHN1YlRob3JvdWdoZmFyZTogc3RyaW5nO1xuICAvKipcbiAgICogVGhlIGFyZWFzT2ZJbnRlcmVzdFxuICAgKi9cbiAgYXJlYXNPZkludGVyZXN0OiBzdHJpbmdbXTtcbn1cblxuLyoqXG4gKiBPcHRpb25zIGZvciByZXZlcnNlIGFuZCBmb3J3YXJkIGdlb2NvZGluZy5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBOYXRpdmVHZW9jb2Rlck9wdGlvbnMge1xuICAvKipcbiAgICogVGhlIGxvY2FsZSB0byB1c2Ugd2hlbiByZXR1cm5pbmcgdGhlIGFkZHJlc3MgaW5mb3JtYXRpb24uXG4gICAqIElmIHNldCB0byAnZmFsc2UnIHRoZSBsb2NhbGUgd2lsbCBhbHdheXMgYmUgJ2VuX1VTJy5cbiAgICogRGVmYXVsdCBpcyAndHJ1ZSdcbiAgICovXG4gIHVzZUxvY2FsZTogYm9vbGVhbjtcbiAgLyoqXG4gICAqIFRoZSBkZWZhdWx0IGxvY2FsZSB0byB1c2Ugd2hlbiByZXR1cm5pbmcgdGhlIGFkZHJlc3MgaW5mb3JtYXRpb24uXG4gICAqIGUuZy46ICdmYS1JUicgb3IgJ2RlX0RFJy5cbiAgICovXG4gIGRlZmF1bHRMb2NhbGU/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBUaGUgbWF4aW11bSBudW1iZXIgb2YgcmVzdWx0IHRvIHJldHVybiAobWF4IGlzIDUpLlxuICAgKiBEZWZhdWx0IGlzIDFcbiAgICovXG4gIG1heFJlc3VsdHM6IG51bWJlcjtcbn1cbiJdfQ==

/***/ }),

/***/ "ttAe":
/*!*****************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/search-bar1/search-bar1.page.html ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header class=\"ion-no-border grey-bg;\">  <ion-toolbar>\r\n    <ion-title ></ion-title>\r\n    <ion-col size=\"1\">\r\n      <ion-button fill=\"clear\" size=\"small\" class=\"ion-no-padding\" (click)=\"goBack()\">\r\n          <ion-img src=\"/assets/images/back.svg\" class=\"action-icon\"></ion-img></ion-button></ion-col>\r\n          <ion-col  size=\"9\" style=\"text-align:center;font-size: x-large;position: absolute;\">Search</ion-col>\r\n\r\n <ion-button style=\"float: right;\" fill=\"clear\" ><ion-icon name=\"filter-outline\"></ion-icon>&nbsp;<ion-select value=\"both\" (ionChange)=\"searchfor($event)\" style=\"padding-left: 0px;text-transform: none;\" interface=\"popover\"  [(ngModel)]=\"Type\">\r\n   <ion-select-option  #d name=\"Designs\" value=\"design\" >{{'Designs' | lowercase}}</ion-select-option>\r\n   <ion-select-option #s  name=\"Surveys\" value=\"survey\">{{'Surveys' | lowercase}}</ion-select-option>\r\n   <ion-select-option  value=\"both\">{{'Both' | lowercase}}</ion-select-option>\r\n </ion-select></ion-button>\r\n\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n<ion-searchbar class=\"searchStyle\" debounce=\"0\" placeholder=\"Search Here\" (ionChange)=\"searchfor($event)\" [(ngModel)]=\"searchElement\"></ion-searchbar>\r\n<ion-refresher slot=\"fixed\" (ionRefresh)=\"refreshData($event)\">\r\n    <ion-refresher-content></ion-refresher-content>\r\n  </ion-refresher>\r\n<ion-card *ngFor=\"let search of SortedModel\" class=\"custom-card\">\r\n   <p *ngIf=\"search?.type=='design'\">\r\n    <span style=\"float: left;font-size: medium;color: black;font-size: medium;font-weight: 100; \"  [routerLink]=\"['/design-details/',search?.id]\">{{search?.name}}</span>\r\n    <span class=\"chipdetail\" style=\"background-color:rgb(228, 77, 102);\"  [routerLink]=\"['/design-details/',search?.id]\" >design</span>\r\n    <span class=\"chipdetail\" style=\"background-color:rgb(228, 77, 102);\"  [routerLink]=\"['/design-details/',search?.id]\">{{search?.requesttype}}</span>\r\n    <span class=\"chipdetail\" style=\"background-color: rgb(246, 77, 10);\" *ngIf=\"search?.status == 'requestdeclined'\"  [routerLink]=\"['/design-details/',search?.id]\">Declined</span>\r\n    <span class=\"chipdetail\" style=\"background-color: rgb(246, 104, 10);\" *ngIf=\"search?.deliverydate > 0\"  [routerLink]=\"['/design-details/',search?.id]\">Overdue</span>\r\n    <span class=\"chipdetail\" style=\"background-color: rgb(109, 187, 26);\" *ngIf=\"search?.status == 'requestaccepted'\"  [routerLink]=\"['/design-details/',search?.id]\">Accepted</span>\r\n    <span class=\"chipdetail\" style=\"background-color: rgb(109, 187, 26);\" *ngIf=\"search?.status == 'reviewpassed'\"  [routerLink]=\"['/design-details/',search?.id]\">Review Passed</span>\r\n    <span class=\"chipdetail\" style=\"background-color: rgb(109, 187, 26);\" *ngIf=\"search?.status == 'delivered'\"  [routerLink]=\"['/design-details/',search?.id]\">Delivered</span>\r\n    <span class=\"chipdetail\" style=\"background-color: rgb(109, 187, 26);\" *ngIf=\"search?.status == 'designcompleted'\"  [routerLink]=\"['/design-details/',search?.id]\">Completed</span>\r\n    <span class=\"chipdetail\" style=\"background-color: rgb(109, 187, 26);\" *ngIf=\"search?.status == 'reviewfailed'\"  [routerLink]=\"['/design-details/',search?.id]\">Review Failed</span>\r\n    <span class=\"chipdetail\" style=\"background-color: #1289A7;\" *ngIf=\"search?.status == 'created'\"  [routerLink]=\"['/design-details/',search?.id]\">Unassigned</span>\r\n    <span class=\"chipdetail\" style=\"background-color: #1289A7;\" *ngIf=\"search?.status == 'designassigned'\"  [routerLink]=\"['/design-details/',search?.id]\">Design Assigned</span>\r\n    <span class=\"chipdetail\" style=\"background-color: #1289A7;\" *ngIf=\"search?.status == 'reviewassigned'\"  [routerLink]=\"['/design-details/',search?.id]\">In Review</span>\r\n    <span class=\"chipdetail\" *ngIf=\"search?.isoutsourced == 'true'\" style=\"background-color: rgb(246, 104, 10);\"  [routerLink]=\"['/design-details/',search?.id]\">Outsourced</span>\r\n    <span *ngIf=\"search?.status=='surveyassigned'\" class=\"chipdetail\" style=\"background-color: #3C78D8;\"  [routerLink]=\"['/design-details/',search?.id]\">\r\n     pending\r\n   </span>\r\n   <span fill=\"clear\" background-border=\"clear\" [routerLink]=\"['/','activity',search?.id,'design']\" style=\"float: right;\"  size=\"small\"  ><ion-icon  src=\"/assets/images/activitylist.svg\" ></ion-icon></span>\r\n   <br><br>\r\n     <span style=\"float:left;font-size: smaller;\">{{search?.email}}</span><br>\r\n     <span style=\"float:left;text-align:left;font-size: smaller;\"> {{search?.address}}</span><br>\r\n     <span style=\"font-size:small ;float:right;font-style: italic;\"> {{search?.updated_at|date: 'dd MMM yyyy'}}</span><br>\r\n     <!-- <span class=\"chipdetail\" style=\"background-color: #95afc0;\"  [routerLink]=\"['/design-details/',search?.id]\">{{search?.company}}</span> -->\r\n     <span class=\"chipdetail\" style=\"background-color: #95afc0;\"  [routerLink]=\"['/design-details/',search?.id]\">{{search?.requesttype}}</span>\r\n     <span *ngIf=\"search?.requesttype=='permit'\" class=\"chipdetail\" style=\"background-color: #95afc0;\"  [routerLink]=\"['/design-details/',search?.id]\">{{search?.jobtype=='pvbattery' ? 'PV + Battery' : search?.jobtype}}</span>\r\n     <span class=\"chipdetail\" style=\"background-color: #95afc0;\"  [routerLink]=\"['/design-details/',search?.id]\">{{search?.source}}</span>\r\n     <ion-row class=\"ion-no-margin ion-no-margin\">\r\n      <!-- <ion-col *ngIf=\"segments=='requesttype=prelim&status=created&status=outsourced&status=requestaccepted'\">\r\n          <span *ngIf=\"search?.status == 'created' || search?.status == 'requestaccepted'\" style=\"float:right !important;\" class=\"ion-text-end action-button-color\" (click)=\"openDesigners(search?.id,search)\"\r\n          >Assign</span>\r\n          <span style=\"float: right;\">\r\n\r\n              <ion-col size=\"8\"  *ngIf=\"search?.status == 'outsourced'\"  class=\"ion-text-end action-button-color\" (click)=\"accept(search?.id,'requestaccepted')\">\r\n                 Accept\r\n              </ion-col>\r\n              <ion-col size=\"4\" *ngIf=\"search?.status == 'outsourced'\"  class=\"ion-text-end action-button-color\" (click)=\"decline(search?.id)\">\r\n              On Hold\r\n              </ion-col>\r\n          </span>\r\n\r\n          <span *ngIf=\"search?.status == 'requestdeclined'\"style=\"float:right !important;\" class=\"ion-text-end action-button-color\" (click)=\"openDesigners(search?.id,search)\"\r\n          >Reassign</span>\r\n      </ion-col>\r\n\r\n\r\n      <ion-col *ngIf=\"search?.requesttype=='prelim'&& search?.status=='designcompleted'\">\r\n          <span  style=\"float:right !important;\" class=\"ion-text-end action-button-color\" (click)=\"openAnalysts(search?.id,search)\"\r\n          >Assign Review</span>\r\n      </ion-col>\r\n      <ion-col *ngIf=\"search?.status == 'reviewpassed' || search?.status == 'reviewfailed'|| search?.status == 'reviewassigned'\">\r\n          <span *ngIf=\"search?.status == 'reviewpassed'\" style=\"float:right !important;\" class=\"ion-text-end action-button-color\" (click)=\"openreviewPassed(search?.id,search)\"\r\n          >&nbsp;Deliver</span>\r\n          <span  style=\"float:right !important;\" class=\"ion-text-end action-button-color\" (click)=\"openAnalysts(search?.id,search)\">\r\n            Reassign Review</span>\r\n      </ion-col>\r\n      <ion-col *ngIf=\"search?.requesttype=='prelim'&& search?.status=='delivered'\" >\r\n        <span  style=\"float:right !important;\" class=\"ion-text-end action-button-color\" (click)=\"shareWhatsapp(search)\">\r\n            <ion-icon name=\"share-social-outline\"></ion-icon></span>&nbsp;\r\n        <span style=\"float:right !important;margin-right: 8px;\" class=\"ion-text-end action-button-color\" (click)=\"shareViaEmails(search?.id,search)\">\r\n            <ion-icon name=\"mail\" ></ion-icon></span>\r\n      </ion-col>\r\n       -->\r\n  </ion-row>\r\n\r\n    </p>\r\n    <p *ngIf=\"search?.type=='survey'\">\r\n      <span style=\"float: left;font-size: medium;color: black;font-size: medium;font-weight: 100; \">{{search?.name}}</span>\r\n      <span class=\"chipdetail\" style=\"background-color:rgb(228, 77, 102);\"  [routerLink]=\"['/survey-detail/',search?.id]\" routerDirection=\"forward\">survey</span>\r\n      <span class=\"chipdetail\" style=\"background-color: rgb(246, 77, 10);\" *ngIf=\"search?.status == 'requestdeclined'\" [routerLink]=\"['/survey-detail/',search?.id]\" routerDirection=\"forward\">Declined</span>\r\n      <span class=\"chipdetail\" style=\"background-color: rgb(246, 104, 10);\" *ngIf=\"search?.deliverydate > 0\" [routerLink]=\"['/survey-detail/',search?.id]\" routerDirection=\"forward\">Overdue</span>\r\n      <span class=\"chipdetail\" style=\"background-color: rgb(109, 187, 26);\" *ngIf=\"search?.status == 'requestaccepted'\"\r\n      [routerLink]=\"['/survey-detail/',search?.id]\" routerDirection=\"forward\">Accepted</span>\r\n      <span class=\"chipdetail\" style=\"background-color: rgb(109, 187, 26);\" *ngIf=\"search?.status == 'reviewpassed'\" [routerLink]=\"['/survey-detail/',search?.id]\" routerDirection=\"forward\">Review Passed</span>\r\n      <span class=\"chipdetail\" style=\"background-color: rgb(109, 187, 26);\" *ngIf=\"search?.status == 'delivered'\" [routerLink]=\"['/survey-detail/',search?.id]\" routerDirection=\"forward\">Delivered</span>\r\n      <span class=\"chipdetail\" style=\"background-color: rgb(109, 187, 26);\" *ngIf=\"search?.status == 'designcompleted'\" [routerLink]=\"['/survey-detail/',search?.id]\" routerDirection=\"forward\">Completed</span>\r\n      <span class=\"chipdetail\" style=\"background-color: #1289A7;\" *ngIf=\"search?.status == 'created'\"  [routerLink]=\"['/survey-detail/',search?.id]\" routerDirection=\"forward\">Unassigned</span>\r\n      <span class=\"chipdetail\" style=\"background-color: #1289A7;\" *ngIf=\"search?.status == 'designassigned'\" [routerLink]=\"['/survey-detail/',search?.id]\" routerDirection=\"forward\">Design Assigned</span>\r\n      <span class=\"chipdetail\" style=\"background-color: #1289A7;\" *ngIf=\"search?.status == 'reviewassigned'\" [routerLink]=\"['/survey-detail/',search?.id]\" routerDirection=\"forward\">In Review</span>\r\n      <span class=\"chipdetail\" *ngIf=\"search?.isoutsourced == 'true'\" style=\"background-color: #95AFC0;\" [routerLink]=\"['/survey-detail/',search?.id]\" routerDirection=\"forward\" >Waiting for acceptance</span>\r\n      <span *ngIf=\"search?.status=='surveyassigned'\" class=\"chipdetail\" style=\"background-color: #3C78D8;\" [routerLink]=\"['/survey-detail/',search?.id]\" routerDirection=\"forward\">\r\n       pending\r\n     </span>\r\n     <span fill=\"clear\" background-border=\"clear\" [routerLink]=\"['/','activity',search?.id,'survey']\" style=\"float: right;\"  size=\"small\"  ><ion-icon  src=\"/assets/images/activitylist.svg\" ></ion-icon></span><br><br>\r\n       <span style=\"float:left;font-size: smaller;\">{{search?.email}}</span><br>\r\n       <span style=\"float:left;font-size: smaller;\"> {{search?.address}}</span><br>\r\n       <span style=\"font-size:small ;float:right;font-style: italic;\">{{search?.updated_at|date: 'dd MMM yyyy'}}</span><br>\r\n       <!-- <span class=\"chipdetail\" style=\"background-color: #95afc0;\"[routerLink]=\"['/survey-detail/',search?.id]\" routerDirection=\"forward\">{{search?.company}}</span> -->\r\n       <span class=\"chipdetail\" style=\"background-color: #95afc0;\"[routerLink]=\"['/survey-detail/',search?.id]\" routerDirection=\"forward\">{{search?.jobtype=='pvbattery' ? 'PV + Battery' : search?.jobtype}}</span>\r\n       <span class=\"chipdetail\" style=\"background-color: #95afc0;\"[routerLink]=\"['/survey-detail/',search?.id]\" routerDirection=\"forward\">{{search?.source}}</span>\r\n       <ion-row class=\"ion-no-margin ion-no-margin\">\r\n        <!-- <ion-col *ngIf=\"segments=='requesttype=prelim&status=created&status=outsourced&status=requestaccepted'\">\r\n            <span *ngIf=\"search?.status == 'created' || search?.status == 'requestaccepted'\" style=\"float:right !important;\" class=\"ion-text-end action-button-color\" (click)=\"openSurveyors(search?.id,search)\"\r\n            >Assign</span>\r\n            <span style=\"float: right;\">\r\n\r\n                <ion-col size=\"8\"  *ngIf=\"search?.status == 'outsourced'\"  class=\"ion-text-end action-button-color\" (click)=\"accept(search?.id,'requestaccepted')\">\r\n                   Accept\r\n                </ion-col>\r\n                <ion-col size=\"4\" *ngIf=\"search?.status == 'outsourced'\"  class=\"ion-text-end action-button-color\" (click)=\"decline(search?.id)\">\r\n                Decline\r\n                </ion-col>\r\n            </span>\r\n\r\n            <span *ngIf=\"search?.status == 'requestdeclined'\"style=\"float:right !important;\" class=\"ion-text-end action-button-color\" (click)=\"openDesigners(search?.id,search)\"\r\n            >Reassign</span>\r\n        </ion-col>\r\n\r\n\r\n        <ion-col *ngIf=\"search?.requesttype=='prelim'&& search?.status=='designcompleted'\">\r\n            <span  style=\"float:right !important;\" class=\"ion-text-end action-button-color\" (click)=\"openAnalysts(search?.id,search)\"\r\n            >Assign Review</span>\r\n        </ion-col>\r\n        <ion-col *ngIf=\"search?.status == 'reviewpassed' || search?.status == 'reviewfailed'|| search?.status == 'reviewassigned'\">\r\n            <span *ngIf=\"search?.status == 'reviewpassed'\" style=\"float:right !important;\" class=\"ion-text-end action-button-color\" (click)=\"openreviewPassed(search?.id,search)\">\r\n            &nbsp;Deliver</span>\r\n            <span  style=\"float:right !important;\" class=\"ion-text-end action-button-color\" (click)=\"openreviewPassed(search?.id,search)\">\r\n            Reassign Review</span>\r\n        </ion-col>\r\n        <ion-col *ngIf=\"search?.requesttype=='prelim'&& search?.status=='delivered'\" >\r\n            <span  style=\"float:right !important;\" class=\"ion-text-end action-button-color\" (click)=\"shareWhatsapp(search)\">\r\n                <ion-icon name=\"share-social-outline\"></ion-icon></span>&nbsp;\r\n            <span style=\"float:right !important;margin-right: 8px;\" class=\"ion-text-end action-button-color\" (click)=\"shareViaEmails(search?.id,search)\">\r\n                <ion-icon name=\"mail\" ></ion-icon></span>\r\n          </ion-col>\r\n         -->\r\n    </ion-row>\r\n      </p>\r\n\r\n</ion-card>\r\n\r\n</ion-content>\r\n<ion-bottom-drawer [(state)]=\"drawerState\" [minimumHeight]=\"0\" [dockedHeight]=\"320\" [draggable]=\"false\" [disableDrag]=\"true\"\r\n                   [shouldBounce]=\"true\" [distanceTop]=\"0\" class=\"drawer\" style=\"z-index: 9999 !important;\">\r\n    <form [formGroup]=\"assignForm\">\r\n        <ion-grid class=\"drawer\">\r\n            <ion-row>\r\n                <ion-col size=\"12\">\r\n                    <app-user-selector (assigneeData)=getassignedata($event) placeholder=\"Assign\" [assignees]=\"listOfAssignees\"\r\n                                       formControlName=\"assignedto\"></app-user-selector>\r\n                </ion-col>\r\n            </ion-row>\r\n           <!-- <ion-row style=\"margin-left: 8px;\">\r\n                <ion-col size=\"12\">\r\n                    <span class=\"input-placeholder\">comments</span>\r\n                </ion-col>\r\n                <ion-col size=\"12\" style=\"padding-top: 0px;\">\r\n                    <ion-textarea style=\"max-width: 98%;\" class=\"ion-no-margin ion-no-padding comment_box\" rows=\"3\"\r\n                                  formControlName=\"comment\"></ion-textarea>\r\n                </ion-col>\r\n            </ion-row>-->\r\n            <ion-row style=\"justify-content: flex-end;\">\r\n                <ion-col size=\"auto\" style=\"padding-top: 0px; margin-right: 6px;\">\r\n                    <ion-button class=\"buttom-drawer-button\" fill=\"clear\" (click)=\"assign()\">\r\n                        Confirm\r\n                    </ion-button>\r\n                </ion-col>\r\n                <ion-col size=\"auto\">\r\n                    <ion-button class=\"buttom-drawer-button-cancel\" fill=\"clear\" (click)=\"dismissBottomSheet()\">\r\n                        Cancel\r\n                    </ion-button>\r\n                </ion-col>\r\n            </ion-row>\r\n        </ion-grid>\r\n    </form>\r\n\r\n</ion-bottom-drawer>\r\n");

/***/ })

}]);
//# sourceMappingURL=search-bar1-search-bar1-module.js.map