(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["designoverview-designoverview-module"],{

/***/ "3aWu":
/*!*******************************************************!*\
  !*** ./src/app/designoverview/designoverview.page.ts ***!
  \*******************************************************/
/*! exports provided: DesignoverviewPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DesignoverviewPage", function() { return DesignoverviewPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_designoverview_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./designoverview.page.html */ "wpTt");
/* harmony import */ var _designoverview_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./designoverview.page.scss */ "RIsd");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @cometchat-pro/cordova-ionic-chat */ "ujHh");
/* harmony import */ var _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _storage_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../storage.service */ "qkCY");
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../api.service */ "yTNM");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _ionic_native_social_sharing_ngx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic-native/social-sharing/ngx */ "/XPu");
/* harmony import */ var src_app_email_model_email_model_page__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/email-model/email-model.page */ "+k72");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _utilities_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../utilities.service */ "oTnF");
/* harmony import */ var _networkdetect_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../networkdetect.service */ "UZ2B");
/* harmony import */ var _ionic_native_in_app_browser_ngx__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @ionic-native/in-app-browser/ngx */ "m/P+");
/* harmony import */ var _contants_prod__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../contants.prod */ "1oiu");















let DesignoverviewPage = class DesignoverviewPage {
    //showSearchBar = false;
    constructor(route, storage, modalController, apiService, socialSharing, utilities, network, platform, iab, router) {
        this.route = route;
        this.storage = storage;
        this.modalController = modalController;
        this.apiService = apiService;
        this.socialSharing = socialSharing;
        this.utilities = utilities;
        this.network = network;
        this.platform = platform;
        this.iab = iab;
        this.router = router;
        this.version = _contants_prod__WEBPACK_IMPORTED_MODULE_14__["version"];
        this.showSearchBar = false;
        let data = localStorage.getItem('type');
        console.log(data, "dataa");
    }
    ngOnInit() {
        this.userData = this.storage.getUser();
        this.apiService.emitUserNameAndRole(this.userData);
        this.apiService.version.subscribe(versionInfo => {
            this.update_version = versionInfo;
        });
        this.getNotificationCount();
        this.setupCometChat();
        this.updateUserPushToken();
        this.route.navigate(['designoverview/newdesigns']);
    }
    ngOnDestroy() {
        this.deactivateNetworkSwitch.unsubscribe();
    }
    setupCometChat() {
        let userId = this.storage.getUserID();
        const user = new _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_4__["CometChat"].User(userId);
        user.setName(this.storage.getUser().firstname + ' ' + this.storage.getUser().lastname);
        const appSetting = new _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_4__["CometChat"].AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(_contants_prod__WEBPACK_IMPORTED_MODULE_14__["COMETCHAT_CONSTANTS"].REGION).build();
        _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_4__["CometChat"].init(_contants_prod__WEBPACK_IMPORTED_MODULE_14__["COMETCHAT_CONSTANTS"].APP_ID, appSetting).then(() => {
            console.log('Initialization completed successfully');
            // if(this.utilities.currentUserValue != null){
            // You can now call login function.
            _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_4__["CometChat"].login(userId, _contants_prod__WEBPACK_IMPORTED_MODULE_14__["COMETCHAT_CONSTANTS"].API_KEY).then((user) => {
                console.log('Login Successful:', { user });
            }, error => {
                console.log('Login failed with exception:', { error });
            });
            // }
        }, error => {
            console.log('Initialization failed with error:', error);
        });
    }
    updateUserPushToken() {
        let token = localStorage.getItem('pushtoken');
        console.log(token);
        let userid = this.storage.getUserID();
        let tokendata = {
            pushtokens: token
        };
        this.apiService.pushtoken(userid, { "newpushtoken": token }).subscribe((data) => {
            console.log(data, "fcm data");
        }, (error) => {
        });
    }
    getDesigns(event) {
        let showLoader = true;
        if (event != null && event !== undefined) {
            showLoader = false;
        }
    }
    shareWhatsapp(designData) {
        this.socialSharing.share(designData.prelimdesign.url);
    }
    searchbar() {
        this.route.navigate(['/search-bar1']);
    }
    shareViaEmails(id, designData) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const modal = yield this.modalController.create({
                component: src_app_email_model_email_model_page__WEBPACK_IMPORTED_MODULE_9__["EmailModelPage"],
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
    ionViewDidEnter() {
        this.deactivateNetworkSwitch = this.network.networkSwitch.subscribe(data => {
            this.netSwitch = data;
            console.log(this.netSwitch);
        });
        this.network.networkDisconnect();
        this.network.networkConnect();
        // this.subscription = this.platform.backButton.subscribe(() => {
        //   if (this.showSearchBar === true) {
        //     this.showSearchBar = false;
        //   } else {
        //     (navigator as any).app.exitApp();
        //   }
        // });
    }
    getNotificationCount() {
        this.apiService.getCountOfUnreadNotifications().subscribe((count) => {
            console.log("count", count);
            this.unreadCount = count;
        });
    }
    setzero() {
        this.unreadCount = 0;
    }
    ionViewWillLeave() {
    }
};
DesignoverviewPage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_7__["Router"] },
    { type: _storage_service__WEBPACK_IMPORTED_MODULE_5__["StorageService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_10__["ModalController"] },
    { type: _api_service__WEBPACK_IMPORTED_MODULE_6__["ApiService"] },
    { type: _ionic_native_social_sharing_ngx__WEBPACK_IMPORTED_MODULE_8__["SocialSharing"] },
    { type: _utilities_service__WEBPACK_IMPORTED_MODULE_11__["UtilitiesService"] },
    { type: _networkdetect_service__WEBPACK_IMPORTED_MODULE_12__["NetworkdetectService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_10__["Platform"] },
    { type: _ionic_native_in_app_browser_ngx__WEBPACK_IMPORTED_MODULE_13__["InAppBrowser"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_7__["ActivatedRoute"] }
];
DesignoverviewPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-designoverview',
        template: _raw_loader_designoverview_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_designoverview_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], DesignoverviewPage);



/***/ }),

/***/ "4DmR":
/*!*****************************************************************************!*\
  !*** ./src/app/designoverview/completeddesign/completeddesign.component.ts ***!
  \*****************************************************************************/
/*! exports provided: CompleteddesignComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CompleteddesignComponent", function() { return CompleteddesignComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_completeddesign_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./completeddesign.component.html */ "XU+6");
/* harmony import */ var _completeddesign_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./completeddesign.component.scss */ "Rdyl");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ionic_native_launch_navigator_ngx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic-native/launch-navigator/ngx */ "fGQ8");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var src_app_utilities_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/utilities.service */ "oTnF");
/* harmony import */ var src_app_api_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/api.service */ "yTNM");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic/storage */ "e8h1");
/* harmony import */ var src_app_homepage_design_design_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/homepage/design/design.component */ "4JZt");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! moment */ "wd/R");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var src_app_storage_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/storage.service */ "qkCY");
/* harmony import */ var _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @cometchat-pro/cordova-ionic-chat */ "ujHh");
/* harmony import */ var _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_12__);













let CompleteddesignComponent = class CompleteddesignComponent {
    constructor(launchNavigator, datePipe, cdr, utils, storage, apiService, storageservice) {
        this.launchNavigator = launchNavigator;
        this.datePipe = datePipe;
        this.cdr = cdr;
        this.utils = utils;
        this.storage = storage;
        this.apiService = apiService;
        this.storageservice = storageservice;
        this.listOfDesignData = [];
        this.listOfDesignDataHelper = [];
        this.skip = 0;
        this.limit = 10;
        this.options = {
            start: '',
            app: this.launchNavigator.APP.GOOGLE_MAPS
        };
        this.user = this.storageservice.getUser();
        const latestDate = new Date();
        this.today = datePipe.transform(latestDate, 'M/dd/yy');
        console.log('date', this.today);
    }
    ngOnInit() {
        this.designRefreshSubscription = this.utils.getHomepageDesignRefresh().subscribe((result) => {
            this.skip = 0;
            this.getDesigns(null);
        });
        this.dataRefreshSubscription = this.utils.getDataRefresh().subscribe((result) => {
            if (this.listOfDesignData != null && this.listOfDesignData.length > 0) {
                this.formatDesignData(this.listOfDesignData);
            }
        });
    }
    getDesigns(event) {
        let showLoader = true;
        if (event != null && event !== undefined) {
            showLoader = false;
        }
        this.fetchPendingDesigns(event, showLoader);
    }
    fetchPendingDesigns(event, showLoader) {
        this.noDesignFound = "";
        console.log("inside fetch surveys");
        this.listOfDesignData = [];
        this.listOfDesignDataHelper = [];
        this.utils.showLoadingWithPullRefreshSupport(showLoader, 'Getting Designs').then((success) => {
            this.apiService.getDesignSurveys("requesttype=prelim&status=designcompleted", this.limit, this.skip).subscribe((response) => {
                this.utils.hideLoadingWithPullRefreshSupport(showLoader).then(() => {
                    console.log(response);
                    if (response.length) {
                        this.formatDesignData(response);
                    }
                    else {
                        this.noDesignFound = "No Designs Found";
                    }
                    if (event !== null) {
                        event.target.complete();
                    }
                });
            }, responseError => {
                this.utils.hideLoadingWithPullRefreshSupport(showLoader).then(() => {
                    if (event !== null) {
                        event.target.complete();
                    }
                    const error = responseError.error;
                    this.utils.errorSnackBar(error.message[0].messages[0].message);
                });
            });
        });
    }
    openAddressOnMap(address) {
        this.launchNavigator.navigate(address, this.options);
    }
    formatDesignData(records) {
        let list;
        list = this.fillinDynamicData(records);
        list.forEach(element => {
            this.listOfDesignData.push(element);
        });
        const tempData = [];
        this.listOfDesignData.forEach((designItem) => {
            if (tempData.length === 0) {
                this.sDatePassed(designItem.updated_at);
                const listOfDesign = new src_app_homepage_design_design_component__WEBPACK_IMPORTED_MODULE_9__["DesginDataHelper"]();
                listOfDesign.date = this.datePipe.transform(designItem.updated_at, 'M/dd/yy');
                listOfDesign.lateby = this.overdue;
                listOfDesign.listOfDesigns.push(designItem);
                tempData.push(listOfDesign);
            }
            else {
                let added = false;
                tempData.forEach((surveyList) => {
                    if (!added) {
                        if (surveyList.date === this.datePipe.transform(designItem.updated_at, 'M/d/yy')) {
                            surveyList.listOfDesigns.push(designItem);
                            this.sDatePassed(designItem.updated_at);
                            added = true;
                        }
                    }
                });
                if (!added) {
                    this.sDatePassed(designItem.updated_at);
                    const listOfDesign = new src_app_homepage_design_design_component__WEBPACK_IMPORTED_MODULE_9__["DesginDataHelper"]();
                    listOfDesign.date = this.datePipe.transform(designItem.updated_at, 'M/dd/yy');
                    listOfDesign.lateby = this.overdue;
                    listOfDesign.listOfDesigns.push(designItem);
                    tempData.push(listOfDesign);
                    added = true;
                }
            }
        });
        this.listOfDesignDataHelper = tempData.sort(function (a, b) {
            var dateA = new Date(a.date).getTime(), dateB = new Date(b.date).getTime();
            return dateB - dateA;
        });
        this.chatIcon(list);
        this.cdr.detectChanges();
    }
    ///chat icon
    chatIcon(list) {
        list.forEach(element => {
            var groupMembersRequest = new _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_12__["CometChat"].GroupMembersRequestBuilder(element.chatid)
                .setLimit(10)
                .build();
            groupMembersRequest.fetchNext().then(groupMembers => {
                console.log(groupMembers);
                element.addedtogroupchat = true;
            }, error => {
                console.log("Group Member list fetching failed with exception:", error);
            });
        });
    }
    fillinDynamicData(records) {
        records.forEach(element => {
            if (element.status != "delivered") {
                element.isoverdue = this.utils.isDatePassed(element.deliverydate);
            }
            else {
                element.isoverdue = false;
            }
            element.lateby = this.utils.getTheLatebyString(element.deliverydate);
            element.formattedjobtype = this.utils.getJobTypeName(element.jobtype);
            this.storage.get('' + element.id).then((data) => {
                console.log(data);
                if (data) {
                    element.totalpercent = data.currentprogress;
                }
                else {
                    element.totalpercent = 0;
                }
            });
        });
        return records;
    }
    doInfinite($event) {
        this.skip = this.skip + 10;
        this.apiService.getDesignSurveys("requesttype=prelim&status=designcompleted", this.limit, this.skip).subscribe((response) => {
            console.log(response);
            if (response.length) {
                this.formatDesignData(response);
            }
            else {
                this.noDesignFound = "No Designs Found";
            }
            if (event !== null) {
                $event.target.complete();
            }
        }, (responseError) => {
            if (event !== null) {
                $event.target.complete();
            }
            const error = responseError.error;
            this.utils.errorSnackBar(error.message[0].messages[0].message);
        });
    }
    sDatePassed(datestring) {
        var checkdate = moment__WEBPACK_IMPORTED_MODULE_10__(datestring, "YYYYMMDD");
        var todaydate = moment__WEBPACK_IMPORTED_MODULE_10__(new Date(), "YYYYMMDD");
        var lateby = todaydate.diff(checkdate, "days");
        this.overdue = lateby;
    }
    ngOnDestroy() {
        //Called once, before the instance is destroyed.
        //Add 'implements OnDestroy' to the class.
        this.designRefreshSubscription.unsubscribe();
        this.dataRefreshSubscription.unsubscribe();
        this.cdr.detach();
    }
    trackdesign(index, design) {
        return design.id;
    }
};
CompleteddesignComponent.ctorParameters = () => [
    { type: _ionic_native_launch_navigator_ngx__WEBPACK_IMPORTED_MODULE_4__["LaunchNavigator"] },
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_5__["DatePipe"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ChangeDetectorRef"] },
    { type: src_app_utilities_service__WEBPACK_IMPORTED_MODULE_6__["UtilitiesService"] },
    { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_8__["Storage"] },
    { type: src_app_api_service__WEBPACK_IMPORTED_MODULE_7__["ApiService"] },
    { type: src_app_storage_service__WEBPACK_IMPORTED_MODULE_11__["StorageService"] }
];
CompleteddesignComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-completeddesign',
        template: _raw_loader_completeddesign_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_completeddesign_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], CompleteddesignComponent);



/***/ }),

/***/ "GTKF":
/*!*****************************************************************!*\
  !*** ./src/app/designoverview/newdesign/newdesign.component.ts ***!
  \*****************************************************************/
/*! exports provided: NewdesignComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewdesignComponent", function() { return NewdesignComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_newdesign_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./newdesign.component.html */ "YEZt");
/* harmony import */ var _newdesign_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./newdesign.component.scss */ "euGZ");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_homepage_design_design_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/homepage/design/design.component */ "4JZt");
/* harmony import */ var _ionic_native_launch_navigator_ngx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic-native/launch-navigator/ngx */ "fGQ8");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var src_app_utilities_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/utilities.service */ "oTnF");
/* harmony import */ var src_app_api_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/api.service */ "yTNM");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic/storage */ "e8h1");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! moment */ "wd/R");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var src_app_storage_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/storage.service */ "qkCY");
/* harmony import */ var src_app_contants_prod__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/contants.prod */ "1oiu");
/* harmony import */ var _ionic_native_in_app_browser_ngx__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @ionic-native/in-app-browser/ngx */ "m/P+");
/* harmony import */ var _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @cometchat-pro/cordova-ionic-chat */ "ujHh");
/* harmony import */ var _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_14__);









// import { SurveyStorageModel } from 'src/app/model/survey-storage.model';






let NewdesignComponent = class NewdesignComponent {
    constructor(launchNavigator, datePipe, cdr, utils, storage, apiService, iab, storageservice) {
        this.launchNavigator = launchNavigator;
        this.datePipe = datePipe;
        this.cdr = cdr;
        this.utils = utils;
        this.storage = storage;
        this.apiService = apiService;
        this.iab = iab;
        this.storageservice = storageservice;
        this.version = src_app_contants_prod__WEBPACK_IMPORTED_MODULE_12__["version"];
        this.listOfDesignData = [];
        this.listOfDesignDataHelper = [];
        this.skip = 0;
        this.limit = 10;
        this.currentDate = new Date();
        this.options = {
            start: '',
            app: this.launchNavigator.APP.GOOGLE_MAPS
        };
        this.user = this.storageservice.getUser();
        const latestDate = new Date();
        this.today = datePipe.transform(latestDate, 'M/dd/yy');
        console.log('date', this.today);
        //  this.unsubscribeMessage=  this.apiService._OnMessageReceivedSubject.subscribe((r) => {
        //     console.log('message received! ', r);
        //     this.getDesigns();
        //   });
    }
    ngOnInit() {
        localStorage.setItem('type', 'prelim');
        console.log("ngoninit");
        console.log(this.currentDate.toISOString());
        this.apiService.version.subscribe(versionInfo => {
            this.update_version = versionInfo;
        });
    }
    ngOnDestroy() {
        //Called once, before the instance is destroyed.
        //Add 'implements OnDestroy' to the class.
        this.designRefreshSubscription.unsubscribe();
        this.dataRefreshSubscription.unsubscribe();
        // this.unsubscribeMessage.unsubscribe();
        this.cdr.detach();
    }
    ionViewDidEnter() {
        // if(this.version !== this.update_version && this.update_version !==''){
        //   setTimeout(()=>{
        //     this.utils.showAlertBox('Update App','New version of app is available on Play Store. Please update now to get latest features and bug fixes.',[{
        //       text:'Ok',
        //       handler:()=>{
        //         this.iab.create('https://play.google.com/store/apps/details?id=com.solar.wattmonk',"_system");
        //        this.ionViewDidEnter();
        //       }
        //     }]);
        //   },2000)
        // }
        this.designRefreshSubscription = this.utils.getHomepageDesignRefresh().subscribe((result) => {
            this.skip = 0;
            this.getDesigns(null);
        });
        this.dataRefreshSubscription = this.utils.getDataRefresh().subscribe((result) => {
            if (this.listOfDesignData != null && this.listOfDesignData.length > 0) {
                this.formatDesignData(this.listOfDesignData);
            }
        });
    }
    getDesigns(event) {
        this.skip = 0;
        let showLoader = true;
        if (event != null && event !== undefined) {
            showLoader = false;
        }
        this.fetchPendingDesigns(event);
    }
    fetchPendingDesigns(event, showLoader) {
        this.noDesignsFound = "";
        this.listOfDesignData = [];
        this.listOfDesignDataHelper = [];
        this.utils.showLoadingWithPullRefreshSupport(showLoader, 'Getting Designs').then((success) => {
            this.apiService.getDesignSurveys("requesttype=prelim&status=designassigned&status=designinprocess", this.limit, this.skip).subscribe((response) => {
                this.utils.hideLoadingWithPullRefreshSupport(showLoader).then(() => {
                    console.log(response);
                    if (response.length) {
                        this.formatDesignData(response);
                    }
                    else {
                        this.noDesignsFound = "No Design Found";
                    }
                    if (event !== null) {
                        event.target.complete();
                    }
                });
            }, responseError => {
                this.utils.hideLoadingWithPullRefreshSupport(showLoader).then(() => {
                    if (event !== null) {
                        event.target.complete();
                    }
                    const error = responseError.error;
                    this.utils.errorSnackBar(error.message[0].messages[0].message);
                });
            });
        });
    }
    openAddressOnMap(address) {
        this.launchNavigator.navigate(address, this.options);
    }
    formatDesignData(records) {
        this.overdue = [];
        let list;
        list = this.fillinDynamicData(records);
        list.forEach(element => {
            this.listOfDesignData.push(element);
        });
        console.log(this.listOfDesignData);
        const tempData = [];
        this.listOfDesignData.forEach((designItem) => {
            if (tempData.length === 0) {
                this.sDatePassed(designItem.updated_at);
                const listOfDesigns = new src_app_homepage_design_design_component__WEBPACK_IMPORTED_MODULE_4__["DesginDataHelper"]();
                listOfDesigns.date = this.datePipe.transform(designItem.updated_at, 'M/dd/yy');
                listOfDesigns.lateby = this.overdue;
                listOfDesigns.listOfDesigns.push(designItem);
                tempData.push(listOfDesigns);
            }
            else {
                let added = false;
                tempData.forEach((designList) => {
                    if (!added) {
                        if (designList.date === this.datePipe.transform(designItem.updated_at, 'M/dd/yy')) {
                            designList.listOfDesigns.push(designItem);
                            this.sDatePassed(designItem.updated_at);
                            added = true;
                        }
                    }
                });
                if (!added) {
                    this.sDatePassed(designItem.updated_at);
                    const listOfDesigns = new src_app_homepage_design_design_component__WEBPACK_IMPORTED_MODULE_4__["DesginDataHelper"]();
                    listOfDesigns.date = this.datePipe.transform(designItem.updated_at, 'M/dd/yy');
                    listOfDesigns.lateby = this.overdue;
                    listOfDesigns.listOfDesigns.push(designItem);
                    tempData.push(listOfDesigns);
                    added = true;
                }
            }
        });
        this.listOfDesignDataHelper = tempData.sort(function (a, b) {
            var dateA = new Date(a.date).getTime(), dateB = new Date(b.date).getTime();
            return dateB - dateA;
        });
        this.chatIcon(list);
        this.cdr.detectChanges();
        console.log(this.listOfDesignDataHelper);
    }
    ///chat icon
    chatIcon(list) {
        list.forEach(element => {
            var groupMembersRequest = new _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_14__["CometChat"].GroupMembersRequestBuilder(element.chatid)
                .setLimit(10)
                .build();
            groupMembersRequest.fetchNext().then(groupMembers => {
                console.log(groupMembers);
                element.addedtogroupchat = true;
            }, error => {
                console.log("Group Member list fetching failed with exception:", error);
            });
        });
    }
    fillinDynamicData(records) {
        records.forEach((element) => {
            if (element.status != "delivered") {
                element.isoverdue = this.utils.isDatePassed(element.deliverydate);
            }
            else {
                element.isoverdue = false;
            }
            element.lateby = this.utils.getTheLatebyString(element.deliverydate);
            element.formattedjobtype = this.utils.getJobTypeName(element.jobtype);
            var acceptancedate = new Date(element.designacceptancestarttime);
            element.designacceptanceremainingtime = this.utils.getRemainingTime(acceptancedate.toString());
            //Setting acceptance timer
            if (element.status == "outsourced") {
                if (element.requesttype == "permit") {
                    var acceptancedate = new Date(element.designacceptancestarttime);
                    element.designacceptanceremainingtime = this.utils.getRemainingTime(acceptancedate.toString());
                }
                else {
                    var acceptancedate = new Date(element.designacceptancestarttime);
                    element.designacceptanceremainingtime = this.utils.getRemainingTime(acceptancedate.toString());
                }
                if (element.designacceptanceremainingtime == "0h : 0m") {
                    element.isoverdue = true;
                }
            }
            //Setting design timer
            if (element.status == "designassigned" || element.status == "designcompleted") {
                if (element.requesttype == "permit") {
                    var acceptancedate = new Date(element.designstarttime);
                    acceptancedate.setHours(acceptancedate.getHours() + 6);
                    element.designremainingtime = this.utils.getRemainingTime(acceptancedate.toString());
                }
                else {
                    var acceptancedate = new Date(element.designstarttime);
                    acceptancedate.setHours(acceptancedate.getHours() + 2);
                    element.designremainingtime = this.utils.getRemainingTime(acceptancedate.toString());
                }
                if (element.designremainingtime == "0h : 0m") {
                    element.isoverdue = true;
                }
            }
            //Setting review timer
            if (element.status == "reviewassigned" || element.status == "reviewpassed" || element.status == "reviewfailed") {
                if (element.requesttype == "permit") {
                    var reviewdate = new Date(element.reviewstarttime);
                    reviewdate.setHours(reviewdate.getHours() + 2);
                    element.reviewremainingtime = this.utils.getRemainingTime(reviewdate.toString());
                }
                else {
                    var reviewdate = new Date(element.reviewstarttime);
                    reviewdate.setMinutes(reviewdate.getMinutes() + 15);
                    element.reviewremainingtime = this.utils.getRemainingTime(reviewdate.toString());
                }
                if (element.reviewremainingtime == "0h : 0m") {
                    element.isoverdue = true;
                }
            }
            this.storage.get('' + element.id).then((data) => {
                console.log(data);
                if (data) {
                    element.totalpercent = data.currentprogress;
                }
                else {
                    element.totalpercent = 0;
                }
                this.startAllTimers();
            });
        });
        return records;
    }
    doInfinite($event) {
        this.skip = this.skip + 10;
        this.apiService.getDesignSurveys("requesttype=prelim&status=designassigned&status=designinprocess", this.limit, this.skip).subscribe((response) => {
            console.log(response);
            if (response.length) {
                this.formatDesignData(response);
            }
            else {
                this.noDesignsFound = "No Designs Found";
            }
            if (event !== null) {
                $event.target.complete();
            }
        }, (responseError) => {
            if (event !== null) {
                $event.target.complete();
            }
            const error = responseError.error;
            this.utils.errorSnackBar(error.message[0].messages[0].message);
        });
    }
    sDatePassed(datestring) {
        var checkdate = moment__WEBPACK_IMPORTED_MODULE_10__(datestring, "YYYYMMDD");
        var todaydate = moment__WEBPACK_IMPORTED_MODULE_10__(new Date(), "YYYYMMDD");
        var lateby = todaydate.diff(checkdate, "days");
        this.overdue = lateby;
    }
    startAllTimers() {
        this.listOfDesignData.forEach(element => {
            var reviewdate = new Date(element.designstarttime);
            reviewdate.setHours(reviewdate.getHours() + 2);
            element.designremainingtime = this.utils.getRemainingTime(reviewdate.toString());
        });
    }
    trackdesign(index, design) {
        return design.id;
    }
};
NewdesignComponent.ctorParameters = () => [
    { type: _ionic_native_launch_navigator_ngx__WEBPACK_IMPORTED_MODULE_5__["LaunchNavigator"] },
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_6__["DatePipe"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ChangeDetectorRef"] },
    { type: src_app_utilities_service__WEBPACK_IMPORTED_MODULE_7__["UtilitiesService"] },
    { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_9__["Storage"] },
    { type: src_app_api_service__WEBPACK_IMPORTED_MODULE_8__["ApiService"] },
    { type: _ionic_native_in_app_browser_ngx__WEBPACK_IMPORTED_MODULE_13__["InAppBrowser"] },
    { type: src_app_storage_service__WEBPACK_IMPORTED_MODULE_11__["StorageService"] }
];
NewdesignComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-newdesign',
        template: _raw_loader_newdesign_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_newdesign_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], NewdesignComponent);



/***/ }),

/***/ "MkKN":
/*!***********************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/designoverview/delievereddesign/delievereddesign.component.html ***!
  \***********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-content>\r\n  <ion-refresher slot=\"fixed\" (ionRefresh)=\"getDesigns($event)\">\r\n    <ion-refresher-content pullingIcon=\"arrow-dropdown\" pullingText=\"Pull down to refresh\" refreshingSpinner=\"lines\"></ion-refresher-content>\r\n  </ion-refresher>\r\n  <ion-grid *ngIf=\"listofDesignDataHelper.length !== 0\">\r\n    <ion-row *ngFor=\"let item of listofDesignDataHelper;let i = index\">\r\n        <!-- <ion-virtual-scroll [items]=\"listOfDesignsHelper\"> -->\r\n            <!-- <ion-row *ngFor=\"let item of listOfDesignsHelper;let i = index\"> -->\r\n                <!-- <ion-row *virtualItem=\"let item;let i = index\"> -->\r\n        <!-- <ion-col size=\"12\" class=\"ion-margin-top\">\r\n                <span class=\"ion-padding\" *ngIf=\"today === item.date\">\r\n                    Today\r\n                  </span>\r\n            <span class=\"ion-padding\" *ngIf=\"today !== item.date\">\r\n                      {{item.date | date: 'dd MMM yyyy'}}\r\n                </span>\r\n        </ion-col> -->\r\n        <ion-col *ngFor=\"let designData of item.listOfDesigns;let i = index;trackBy: trackdesign \" size=\"12\">\r\n            <div class=\"ion-no-padding custom-card\" style=\"height: 100%;\">\r\n                <p class=\"customer-name\" >{{designData.name}}\r\n                      <!-- <span class=\"chipdetail\" style=\"background-color: #1289A7;\" [routerLink]=\"['/design-details/',designData.id]\" routerDirection=\"forward\">\r\n                        {{designData.deliverydate | date: 'hh:mm a'}}\r\n                    </span> -->\r\n                    <span  [routerLink]=\"['/design-details/',designData.id]\"\r\n                    routerDirection=\"forward\" class=\"chipdetail\" style=\"background-color: rgb(109, 187, 26);\" *ngIf=\"designData.status == 'delivered'\">Delivered</span>\r\n                    <span  [routerLink]=\"['/design-details/',designData.id]\"\r\n                    routerDirection=\"forward\" class=\"chipdetail\" style=\"background-color: rgb(246, 104, 10);\" *ngIf=\"designData.isoverdue\">Overdue</span>\r\n                    <span class=\"chipdetail\" style=\"background-color: rgb(183,21,64)\" *ngIf=\"designData.isinrevisionstate\"  [routerLink]=\"['/design-details/',designData.id]\">Revision</span>\r\n                    <span class=\"chipdetail ml-1 ml-1\" style=\"background-color: #FA983A;\"\r\n                    *ngIf=\"designData.isoutsourced == 'true'\">Wattmonk</span>\r\n                    <span fill=\"clear\" background-border=\"clear\" [routerLink]=\"['/','activity',designData.id,'design']\" class=\"imagebutton\"  size=\"small\"  ><ion-icon  src=\"/assets/images/activitylist.svg\" ></ion-icon></span> \r\n                    <ng-container *ngIf=\"designData?.chatid!==null && designData?.addedtogroupchat\">\r\n                        <span fill=\"clear\" background-border=\"clear\" [routerLink]=\"['/','chat',designData.chatid]\" class=\"chatbutton\"  size=\"small\"  ><img  style= \"height:20px\" src=\"assets/images/chat.svg\" /></span>\r\n                      </ng-container>        \r\n                </p>\r\n                <p style=\"margin:0px\">\r\n                <span class=\"customer-email\" [routerLink]=\"['/design-details/',designData.id]\"\r\n                      routerDirection=\"forward\" *ngIf=\"user.designertype!='external'\">{{designData.email}}</span>\r\n                      <span *ngIf=\"designData.isoverdue\" class=\"latebystyle\" style=\"float: right;font-size: 10px;\"><strong>Late by {{item.lateby}}</strong></span>\r\n                      \r\n            </p>\r\n          \r\n                <a href=\"tel:{{designData.phonenumber}}\" style=\"text-decoration: none;\" class=\"z-100\">\r\n                    <span class=\"customer-phone\" *ngIf=\"user.designertype!='external'\">{{designData.phonenumber}}</span></a>\r\n                <span style=\"margin:0px\" class=\"customer-address z-100\"\r\n                      (click)=\"openAddressOnMap(designData.address)\" *ngIf=\"user.designertype!='external'\">{{(designData.address | slice:0:50) + (designData.address.length > 50 ? '...' : '')}}</span>\r\n\r\n                <ion-row style=\"margin-bottom: 8px;\" [routerLink]=\"['/design-details/',designData.id]\" >\r\n                    <!-- <span class=\"chipdetail\" style=\"background-color: #95afc0;\" >Wattmonk</span> -->\r\n                    <span class=\"chipdetail\" style=\"background-color: #95afc0;\" >{{designData.source}}</span>\r\n                </ion-row>\r\n                <ion-row class=\"ion-no-margin ion-no-margin\">\r\n                    <ion-col >\r\n                        <span  style=\"float:right !important;\" class=\"ion-text-end action-button-color\" (click)=\"shareWhatsapp(designData)\">\r\n                            <ion-icon name=\"share-social-outline\"></ion-icon></span>&nbsp;\r\n                        <span style=\"float:right !important;margin-right: 8px;\" class=\"ion-text-end action-button-color\" (click)=\"shareViaEmails(designData.id,designData)\">\r\n                            <ion-icon name=\"mail\" ></ion-icon></span>\r\n                    </ion-col>\r\n                </ion-row>\r\n            </div>\r\n        </ion-col>\r\n    </ion-row>\r\n    <!-- </ion-virtual-scroll> -->\r\n    \r\n\r\n\r\n    <ion-row>\r\n        <ion-col size=\"12\" style=\"height: 100px;\">\r\n        </ion-col>\r\n    </ion-row>\r\n</ion-grid>\r\n\r\n<div *ngIf=\"listofDesignDataHelper.length === 0\" class=\"h-100 d-flex flex-column align-center justify-center\">\r\n    {{noDesignFound}}\r\n    <ion-img src=\"/assets/images/blank.png\" class=\"placeholder\"></ion-img>\r\n</div>\r\n\r\n<ion-infinite-scroll (ionInfinite)=\"doInfinite($event)\">\r\n    <ion-infinite-scroll-content\r\n      loadingSpinner=\"bubbles\"\r\n     >\r\n    </ion-infinite-scroll-content>\r\n  </ion-infinite-scroll>\r\n</ion-content>\r\n");

/***/ }),

/***/ "R4jy":
/*!*********************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/designoverview/inreview-design/inreview-design.component.html ***!
  \*********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-content>\r\n  <ion-refresher slot=\"fixed\" (ionRefresh)=\"getDesigns($event)\">\r\n    <ion-refresher-content pullingIcon=\"arrow-dropdown\" pullingText=\"Pull down to refresh\" refreshingSpinner=\"lines\"></ion-refresher-content>\r\n  </ion-refresher>\r\n  <ion-grid *ngIf=\"listOfDesignsHelper.length !== 0\">\r\n    <ion-row *ngFor=\"let item of listOfDesignsHelper;let i = index\">\r\n        <!-- <ion-virtual-scroll [items]=\"listOfDesignsHelper\"> -->\r\n            <!-- <ion-row *ngFor=\"let item of listOfDesignsHelper;let i = index\"> -->\r\n                <!-- <ion-row *virtualItem=\"let item;let i = index\"> -->\r\n        <!-- <ion-col size=\"12\" class=\"ion-margin-top\">\r\n                <span class=\"ion-padding\" *ngIf=\"today === item.date\">\r\n                    Today\r\n                  </span>\r\n            <span class=\"ion-padding\" *ngIf=\"today !== item.date\">\r\n                      {{item.date | date: 'dd MMM yyyy'}}\r\n                </span>\r\n        </ion-col> -->\r\n        <ion-col *ngFor=\"let designData of item.listOfDesigns;let i = index;trackBy: trackdesign \" size=\"12\">\r\n            <div class=\"ion-no-padding custom-card\" style=\"height: 100%;\">\r\n                <p class=\"customer-name\" >{{designData.name}}\r\n                      <!-- <span class=\"chipdetail\" style=\"background-color: #1289A7;\" [routerLink]=\"['/design-details/',designData.id]\" routerDirection=\"forward\">\r\n                        {{designData.deliverydate | date: 'hh:mm a'}}\r\n                    </span> -->\r\n                    <span [routerLink]=\"['/design-details/',designData.id]\"\r\n                    routerDirection=\"forward\" class=\"chipdetail\" style=\"background-color: #1289A7;\" *ngIf=\"designData.status == 'reviewassigned'\">In Review</span>\r\n                   \r\n                    <span [routerLink]=\"['/design-details/',designData.id]\"\r\n                    routerDirection=\"forward\" class=\"chipdetail\" style=\"background-color: rgb(246, 104, 10);\" *ngIf=\"designData.isoverdue\">Overdue</span>\r\n                    <span [routerLink]=\"['/design-details/',designData.id]\" routerDirection=\"forward\" class=\"chipdetail\" style=\"background-color: rgb(246, 77, 10);\" *ngIf=\"designData.status == 'reviewfailed'\">Review Failed</span>\r\n                    <span [routerLink]=\"['/design-details/',designData.id]\" routerDirection=\"forward\" class=\"chipdetail\" style=\"background-color: rgb(109, 187, 26);\" *ngIf=\"designData.status == 'reviewpassed'\"> Review Passed</span>\r\n                    <span class=\"chipdetail\" style=\"background-color: rgb(183,21,64)\" *ngIf=\"designData.isinrevisionstate\"  [routerLink]=\"['/design-details/',designData.id]\">Revision</span>\r\n                    <span class=\"chipdetail ml-1 ml-1\" style=\"background-color: #FA983A;\"\r\n                    *ngIf=\"designData.isoutsourced == 'true'\">Wattmonk</span>\r\n                    <span fill=\"clear\" background-border=\"clear\" [routerLink]=\"['/','activity',designData.id,'design']\" class=\"imagebutton\"  size=\"small\"  ><ion-icon  src=\"/assets/images/activitylist.svg\" ></ion-icon></span> \r\n                    <ng-container *ngIf=\"designData?.chatid!==null && designData?.addedtogroupchat\">\r\n                        <span fill=\"clear\" background-border=\"clear\" [routerLink]=\"['/','chat',designData.chatid]\" class=\"chatbutton\"  size=\"small\"  ><img  style= \"height:20px\" src=\"assets/images/chat.svg\" /></span>\r\n                      </ng-container> \r\n                </p>\r\n               <p style=\"margin: 0px;\"> <span class=\"customer-email\" [routerLink]=\"['/design-details/',designData.id]\"\r\n                      routerDirection=\"forward\" *ngIf=\"user.designertype!='external'\">{{designData.email}}</span>\r\n                      <span *ngIf=\"designData.isoverdue\" class=\"latebystyle\" style=\"float: right;font-size: 10px;\"><strong>Late by {{item.lateby}}</strong></span>\r\n                   \r\n            </p>\r\n            \r\n                       <a href=\"tel:{{designData.phonenumber}}\" style=\"text-decoration: none;\" class=\"z-100\">\r\n                    <span class=\"customer-phone\" *ngIf=\"user.designertype!='external'\">{{designData.phonenumber}}</span></a>\r\n                <span style=\"margin:0px\" class=\"customer-address z-100\"\r\n                      (click)=\"openAddressOnMap(designData.address)\" *ngIf=\"user.designertype!='external'\">{{(designData.address | slice:0:50) + (designData.address.length > 50 ? '...' : '')}}</span>\r\n\r\n                <ion-row style=\"margin-bottom: 8px;\" [routerLink]=\"['/design-details/',designData.id]\" >\r\n                    <!-- <span class=\"chipdetail\" style=\"background-color: #95afc0;\" >Wattmonk</span> -->\r\n                    <span class=\"chipdetail\" style=\"background-color: #95afc0;\" >{{designData.source}}</span>\r\n                      \r\n                </ion-row>\r\n                <ion-row class=\"ion-no-margin ion-no-margin\" *ngIf=\"designData.status == 'reviewfailed'\">\r\n                    <ion-col></ion-col>\r\n                    <!-- <ion-col class=\"ion-no-margin ion-no-padding\">\r\n                        <ion-button class=\"ion-no-margin ion-no-padding\" fill=\"clear\" [routerLink]=\"['/surveyprocess/' + designData.id + '/' + designData.jobtype + '/' + designData.latitude + '/' + designData.longitude]\"\r\n                        routerDirection=\"forward\">\r\n                            Restart Survey\r\n                        </ion-button>\r\n                    </ion-col> -->\r\n                </ion-row>\r\n                <ion-progress-bar [value]=\"1\" mode=\"ios\" color=\"success\" class=\"progress-bar-height\"></ion-progress-bar>\r\n            </div>\r\n        </ion-col>\r\n    </ion-row>\r\n    <!-- </ion-virtual-scroll> -->\r\n    <ion-row>\r\n        <ion-col size=\"12\" style=\"height: 100px;\">\r\n        </ion-col>\r\n    </ion-row>\r\n</ion-grid>\r\n\r\n<div *ngIf=\"listOfDesignsHelper.length === 0\" class=\"h-100 d-flex flex-column align-center justify-center\">\r\n        {{noDesignsFound}}\r\n    <ion-img src=\"/assets/images/blank.png\" class=\"placeholder\"></ion-img>\r\n</div>\r\n\r\n<ion-infinite-scroll (ionInfinite)=\"doInfinite($event)\">\r\n    <ion-infinite-scroll-content\r\n      loadingSpinner=\"bubbles\"\r\n     >\r\n    </ion-infinite-scroll-content>\r\n  </ion-infinite-scroll>\r\n \r\n</ion-content>\r\n");

/***/ }),

/***/ "RIsd":
/*!*********************************************************!*\
  !*** ./src/app/designoverview/designoverview.page.scss ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".bottom-bar {\n  margin: 8px;\n  border-radius: 50px;\n  box-shadow: 0 -2px 8px 0 rgba(0, 0, 0, 0.1);\n  border: 2px solid white;\n  background: #FFFAEB;\n}\n\n.tab {\n  padding-top: 1em;\n  padding-bottom: 1em;\n  padding-bottom: 1em;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.tabText {\n  margin-left: 8px;\n  font-size: 1em;\n}\n\n.tab-icon {\n  width: 24px;\n  height: 24px;\n}\n\nion-tab-button {\n  font-size: 14px;\n  --color: #9E9E9E;\n  --color-selected: #3c78d8;\n}\n\nion-tab-button[aria-selected=true] {\n  border-bottom: 3px solid #3c78d8;\n  border-bottom-left-radius: 2px;\n  border-bottom-right-radius: 2px;\n}\n\n.custombadge {\n  background-color: #3c78d8;\n  color: #ffffff;\n  border-radius: 50%;\n  width: 16px;\n  height: 16px;\n  font-size: 8px;\n  padding: 4px;\n  position: absolute;\n  margin-left: 4px;\n}\n\n.font {\n  font-size: 10px;\n}\n\n.notification-icon {\n  width: 24px;\n  height: 24px;\n}\n\n.home {\n  font-size: 22px;\n  margin-left: 6px;\n}\n\n.notification-badge {\n  font-size: 10px;\n  margin-left: -15px;\n  margin-top: -20px;\n}\n\n.notification-padding {\n  position: relative;\n  padding: 8px;\n}\n\n.badge {\n  width: 20px;\n  height: 20px;\n  position: absolute;\n  top: 0;\n  right: 0;\n  background: #3c78d8;\n  color: white;\n  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.5);\n  border-radius: 50%;\n  font-size: 0.6em;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: 1px solid white;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXGRlc2lnbm92ZXJ2aWV3LnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLFdBQUE7RUFDQSxtQkFBQTtFQUNBLDJDQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtBQUNKOztBQUVBO0VBQ0ksZ0JBQUE7RUFDQSxtQkFBQTtFQUNBLG1CQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7QUFDSjs7QUFFQTtFQUNJLGdCQUFBO0VBQ0EsY0FBQTtBQUNKOztBQUVBO0VBQ0ksV0FBQTtFQUNBLFlBQUE7QUFDSjs7QUFFQTtFQUNJLGVBQUE7RUFDQSxnQkFBQTtFQUNBLHlCQUFBO0FBQ0o7O0FBRUE7RUFDSSxnQ0FBQTtFQUNBLDhCQUFBO0VBQ0EsK0JBQUE7QUFDSjs7QUFFQTtFQUNJLHlCQUFBO0VBQ0EsY0FBQTtFQUNBLGtCQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxjQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7QUFDSjs7QUFFQTtFQUNJLGVBQUE7QUFDSjs7QUFFQTtFQUNJLFdBQUE7RUFDQSxZQUFBO0FBQ0o7O0FBRUE7RUFDSSxlQUFBO0VBQ0EsZ0JBQUE7QUFDSjs7QUFFQTtFQUNJLGVBQUE7RUFDQSxrQkFBQTtFQUNBLGlCQUFBO0FBQ0o7O0FBRUE7RUFDSSxrQkFBQTtFQUNBLFlBQUE7QUFDSjs7QUFFQTtFQUNJLFdBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxNQUFBO0VBQ0EsUUFBQTtFQUNBLG1CQUFBO0VBQ0EsWUFBQTtFQUNBLDBDQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsdUJBQUE7QUFDSiIsImZpbGUiOiJkZXNpZ25vdmVydmlldy5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuYm90dG9tLWJhciB7XHJcbiAgICBtYXJnaW46IDhweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDUwcHg7XHJcbiAgICBib3gtc2hhZG93OiAwIC0ycHggOHB4IDAgcmdiYSgwLCAwLCAwLCAwLjEpO1xyXG4gICAgYm9yZGVyOiAycHggc29saWQgd2hpdGU7XHJcbiAgICBiYWNrZ3JvdW5kOiAjRkZGQUVCO1xyXG59XHJcblxyXG4udGFiIHtcclxuICAgIHBhZGRpbmctdG9wOiAxZW07XHJcbiAgICBwYWRkaW5nLWJvdHRvbTogMWVtO1xyXG4gICAgcGFkZGluZy1ib3R0b206IDFlbTtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbn1cclxuXHJcbi50YWJUZXh0IHtcclxuICAgIG1hcmdpbi1sZWZ0OiA4cHg7XHJcbiAgICBmb250LXNpemU6IDFlbTtcclxufVxyXG5cclxuLnRhYi1pY29uIHtcclxuICAgIHdpZHRoOiAyNHB4O1xyXG4gICAgaGVpZ2h0OiAyNHB4O1xyXG59XHJcblxyXG5pb24tdGFiLWJ1dHRvbiB7XHJcbiAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgICAtLWNvbG9yOiAjOUU5RTlFO1xyXG4gICAgLS1jb2xvci1zZWxlY3RlZDogIzNjNzhkODtcclxufVxyXG5cclxuaW9uLXRhYi1idXR0b25bYXJpYS1zZWxlY3RlZD10cnVlXSB7XHJcbiAgICBib3JkZXItYm90dG9tOiAzcHggc29saWQgIzNjNzhkODtcclxuICAgIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDJweDtcclxuICAgIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAycHg7XHJcbn1cclxuXHJcbi5jdXN0b21iYWRnZXtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICMzYzc4ZDg7XHJcbiAgICBjb2xvcjogI2ZmZmZmZjtcclxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICAgIHdpZHRoOiAxNnB4O1xyXG4gICAgaGVpZ2h0OiAxNnB4O1xyXG4gICAgZm9udC1zaXplOiA4cHg7XHJcbiAgICBwYWRkaW5nOiA0cHg7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICBtYXJnaW4tbGVmdDogNHB4O1xyXG59XHJcblxyXG4uZm9udHtcclxuICAgIGZvbnQtc2l6ZTogMTBweDtcclxufVxyXG5cclxuLm5vdGlmaWNhdGlvbi1pY29uIHtcclxuICAgIHdpZHRoOiAyNHB4O1xyXG4gICAgaGVpZ2h0OiAyNHB4O1xyXG59XHJcblxyXG4uaG9tZXtcclxuICAgIGZvbnQtc2l6ZTogMjJweDtcclxuICAgIG1hcmdpbi1sZWZ0OiA2cHg7XHJcbn1cclxuXHJcbi5ub3RpZmljYXRpb24tYmFkZ2Uge1xyXG4gICAgZm9udC1zaXplOiAxMHB4O1xyXG4gICAgbWFyZ2luLWxlZnQ6IC0xNXB4O1xyXG4gICAgbWFyZ2luLXRvcDogLTIwcHg7XHJcbn1cclxuXHJcbi5ub3RpZmljYXRpb24tcGFkZGluZyB7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICBwYWRkaW5nOiA4cHg7XHJcbn1cclxuXHJcbi5iYWRnZSB7XHJcbiAgICB3aWR0aDogMjBweDtcclxuICAgIGhlaWdodDogMjBweDtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHRvcDogMDtcclxuICAgIHJpZ2h0OiAwO1xyXG4gICAgYmFja2dyb3VuZDogIzNjNzhkODtcclxuICAgIGNvbG9yOiB3aGl0ZTtcclxuICAgIGJveC1zaGFkb3c6IDAgMXB4IDNweCAwIHJnYmEoMCwgMCwgMCwgMC41KTtcclxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICAgIGZvbnQtc2l6ZTogMC42ZW07XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgd2hpdGU7XHJcbiAgfVxyXG4iXX0= */");

/***/ }),

/***/ "Rdyl":
/*!*******************************************************************************!*\
  !*** ./src/app/designoverview/completeddesign/completeddesign.component.scss ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".custom-card {\n  display: flex;\n  flex-direction: column;\n  background: white;\n  border-radius: 4px;\n  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.3);\n  padding: 8px 12px;\n}\n\n.customer-name {\n  font-size: 1em;\n  color: #434343;\n  font-weight: bold;\n  display: table;\n  margin: 0px;\n}\n\n.customer-email {\n  font-size: 0.8em;\n  color: #B4B4B4;\n}\n\n.customer-phone {\n  font-size: 0.8em;\n  color: #4272B9;\n}\n\n.customer-address {\n  margin-top: 16px;\n  margin-bottom: 16px;\n  font-size: 0.8em;\n  color: #4272B9;\n}\n\n.timestamp {\n  font-size: 0.7em;\n}\n\n.chipdetail {\n  display: inline;\n  vertical-align: middle;\n  background-color: #95afc0;\n  font-size: 0.6em;\n  padding: 4px 10px;\n  border-radius: 10px;\n  text-align: center;\n  color: #fff;\n}\n\n.imagebutton {\n  float: right;\n  margin-top: 0px;\n}\n\n.chatbutton {\n  float: right;\n  margin-top: 0px;\n  margin-right: 5px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFxjb21wbGV0ZWRkZXNpZ24uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0VBQ0EsMENBQUE7RUFDQSxpQkFBQTtBQUNKOztBQUVFO0VBQ0UsY0FBQTtFQUNBLGNBQUE7RUFDQSxpQkFBQTtFQUNBLGNBQUE7RUFDQSxXQUFBO0FBQ0o7O0FBRUU7RUFDRSxnQkFBQTtFQUNBLGNBQUE7QUFDSjs7QUFFRTtFQUNFLGdCQUFBO0VBQ0EsY0FBQTtBQUNKOztBQUVFO0VBQ0UsZ0JBQUE7RUFDQSxtQkFBQTtFQUNBLGdCQUFBO0VBQ0EsY0FBQTtBQUNKOztBQUVFO0VBQ0UsZ0JBQUE7QUFDSjs7QUFFRTtFQUNFLGVBQUE7RUFDQSxzQkFBQTtFQUNBLHlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxpQkFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxXQUFBO0FBQ0o7O0FBQ0E7RUFDRSxZQUFBO0VBQ0EsZUFBQTtBQUVGOztBQUVBO0VBQ0UsWUFBQTtFQUNBLGVBQUE7RUFDQSxpQkFBQTtBQUNGIiwiZmlsZSI6ImNvbXBsZXRlZGRlc2lnbi5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jdXN0b20tY2FyZCB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIGJhY2tncm91bmQ6IHdoaXRlO1xyXG4gICAgYm9yZGVyLXJhZGl1czogNHB4O1xyXG4gICAgYm94LXNoYWRvdzogMCAxcHggMnB4IDAgcmdiYSgwLCAwLCAwLCAwLjMpO1xyXG4gICAgcGFkZGluZzogOHB4IDEycHg7XHJcbiAgfVxyXG4gIFxyXG4gIC5jdXN0b21lci1uYW1lIHtcclxuICAgIGZvbnQtc2l6ZTogMWVtO1xyXG4gICAgY29sb3I6ICM0MzQzNDM7XHJcbiAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgIGRpc3BsYXk6dGFibGU7XHJcbiAgICBtYXJnaW46IDBweDtcclxuICB9XHJcbiAgXHJcbiAgLmN1c3RvbWVyLWVtYWlsIHtcclxuICAgIGZvbnQtc2l6ZTogMC44ZW07XHJcbiAgICBjb2xvcjogI0I0QjRCNDtcclxuICB9XHJcbiAgXHJcbiAgLmN1c3RvbWVyLXBob25lIHtcclxuICAgIGZvbnQtc2l6ZTogMC44ZW07XHJcbiAgICBjb2xvcjogIzQyNzJCOTtcclxuICB9XHJcbiAgXHJcbiAgLmN1c3RvbWVyLWFkZHJlc3Mge1xyXG4gICAgbWFyZ2luLXRvcDogMTZweDtcclxuICAgIG1hcmdpbi1ib3R0b206IDE2cHg7XHJcbiAgICBmb250LXNpemU6IDAuOGVtO1xyXG4gICAgY29sb3I6ICM0MjcyQjk7XHJcbiAgfVxyXG4gIFxyXG4gIC50aW1lc3RhbXAge1xyXG4gICAgZm9udC1zaXplOiAwLjdlbTtcclxuICB9XHJcbiAgXHJcbiAgLmNoaXBkZXRhaWx7XHJcbiAgICBkaXNwbGF5OiBpbmxpbmU7XHJcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzk1YWZjMDtcclxuICAgIGZvbnQtc2l6ZTogMC42ZW07XHJcbiAgICBwYWRkaW5nOiA0cHggMTBweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBjb2xvcjogI2ZmZjtcclxufVxyXG4uaW1hZ2VidXR0b257XHJcbiAgZmxvYXQ6cmlnaHQ7XHJcbiAgbWFyZ2luLXRvcDogMHB4O1xyXG4gIFxyXG4gIFxyXG59XHJcbi5jaGF0YnV0dG9ue1xyXG4gIGZsb2F0OnJpZ2h0O1xyXG4gIG1hcmdpbi10b3A6IDBweDtcclxuICBtYXJnaW4tcmlnaHQ6NXB4O1xyXG59XHJcblxyXG4iXX0= */");

/***/ }),

/***/ "TYS/":
/*!*********************************************************************************!*\
  !*** ./src/app/designoverview/delievereddesign/delievereddesign.component.scss ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".custom-card {\n  display: flex;\n  flex-direction: column;\n  background: white;\n  border-radius: 4px;\n  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.3);\n  padding: 8px 12px;\n}\n\n.customer-name {\n  font-size: 1em;\n  color: #434343;\n  font-weight: bold;\n  display: table;\n  margin: 0px;\n}\n\n.customer-email {\n  font-size: 0.8em;\n  color: #B4B4B4;\n}\n\n.customer-phone {\n  font-size: 0.8em;\n  color: #4272B9;\n}\n\n.customer-address {\n  margin-top: 16px;\n  margin-bottom: 16px;\n  font-size: 0.8em;\n  color: #4272B9;\n}\n\n.timestamp {\n  font-size: 0.7em;\n}\n\n.chipdetail {\n  display: inline;\n  vertical-align: middle;\n  background-color: #95afc0;\n  font-size: 0.6em;\n  padding: 4px 10px;\n  border-radius: 10px;\n  text-align: center;\n  color: #fff;\n}\n\n.imagebutton {\n  float: right;\n  margin-top: 0px;\n}\n\n.chatbutton {\n  float: right;\n  margin-top: 0px;\n  margin-right: 5px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFxkZWxpZXZlcmVkZGVzaWduLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksYUFBQTtFQUNBLHNCQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLDBDQUFBO0VBQ0EsaUJBQUE7QUFDSjs7QUFFRTtFQUNFLGNBQUE7RUFDQSxjQUFBO0VBQ0EsaUJBQUE7RUFDQSxjQUFBO0VBQ0EsV0FBQTtBQUNKOztBQUVFO0VBQ0UsZ0JBQUE7RUFDQSxjQUFBO0FBQ0o7O0FBRUU7RUFDRSxnQkFBQTtFQUNBLGNBQUE7QUFDSjs7QUFFRTtFQUNFLGdCQUFBO0VBQ0EsbUJBQUE7RUFDQSxnQkFBQTtFQUNBLGNBQUE7QUFDSjs7QUFFRTtFQUNFLGdCQUFBO0FBQ0o7O0FBRUU7RUFDRSxlQUFBO0VBQ0Esc0JBQUE7RUFDQSx5QkFBQTtFQUNBLGdCQUFBO0VBQ0EsaUJBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0VBQ0EsV0FBQTtBQUNKOztBQUNBO0VBQ0UsWUFBQTtFQUNBLGVBQUE7QUFFRjs7QUFFQTtFQUNFLFlBQUE7RUFDQSxlQUFBO0VBQ0EsaUJBQUE7QUFDRiIsImZpbGUiOiJkZWxpZXZlcmVkZGVzaWduLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmN1c3RvbS1jYXJkIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgYmFja2dyb3VuZDogd2hpdGU7XHJcbiAgICBib3JkZXItcmFkaXVzOiA0cHg7XHJcbiAgICBib3gtc2hhZG93OiAwIDFweCAycHggMCByZ2JhKDAsIDAsIDAsIDAuMyk7XHJcbiAgICBwYWRkaW5nOiA4cHggMTJweDtcclxuICB9XHJcbiAgXHJcbiAgLmN1c3RvbWVyLW5hbWUge1xyXG4gICAgZm9udC1zaXplOiAxZW07XHJcbiAgICBjb2xvcjogIzQzNDM0MztcclxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gICAgZGlzcGxheTp0YWJsZTtcclxuICAgIG1hcmdpbjogMHB4O1xyXG4gIH1cclxuICBcclxuICAuY3VzdG9tZXItZW1haWwge1xyXG4gICAgZm9udC1zaXplOiAwLjhlbTtcclxuICAgIGNvbG9yOiAjQjRCNEI0O1xyXG4gIH1cclxuICBcclxuICAuY3VzdG9tZXItcGhvbmUge1xyXG4gICAgZm9udC1zaXplOiAwLjhlbTtcclxuICAgIGNvbG9yOiAjNDI3MkI5O1xyXG4gIH1cclxuICBcclxuICAuY3VzdG9tZXItYWRkcmVzcyB7XHJcbiAgICBtYXJnaW4tdG9wOiAxNnB4O1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMTZweDtcclxuICAgIGZvbnQtc2l6ZTogMC44ZW07XHJcbiAgICBjb2xvcjogIzQyNzJCOTtcclxuICB9XHJcbiAgXHJcbiAgLnRpbWVzdGFtcCB7XHJcbiAgICBmb250LXNpemU6IDAuN2VtO1xyXG4gIH1cclxuICBcclxuICAuY2hpcGRldGFpbHtcclxuICAgIGRpc3BsYXk6IGlubGluZTtcclxuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjOTVhZmMwO1xyXG4gICAgZm9udC1zaXplOiAwLjZlbTtcclxuICAgIHBhZGRpbmc6IDRweCAxMHB4O1xyXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIGNvbG9yOiAjZmZmO1xyXG59XHJcbi5pbWFnZWJ1dHRvbntcclxuICBmbG9hdDpyaWdodDtcclxuICBtYXJnaW4tdG9wOiAwcHg7XHJcbiAgXHJcbiAgXHJcbn1cclxuLmNoYXRidXR0b257XHJcbiAgZmxvYXQ6cmlnaHQ7XHJcbiAgbWFyZ2luLXRvcDogMHB4O1xyXG4gIG1hcmdpbi1yaWdodDo1cHg7XHJcbn0iXX0= */");

/***/ }),

/***/ "TiSb":
/*!*******************************************************************************!*\
  !*** ./src/app/designoverview/delievereddesign/delievereddesign.component.ts ***!
  \*******************************************************************************/
/*! exports provided: DelievereddesignComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DelievereddesignComponent", function() { return DelievereddesignComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_delievereddesign_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./delievereddesign.component.html */ "MkKN");
/* harmony import */ var _delievereddesign_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./delievereddesign.component.scss */ "TYS/");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ionic_native_launch_navigator_ngx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic-native/launch-navigator/ngx */ "fGQ8");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var src_app_utilities_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/utilities.service */ "oTnF");
/* harmony import */ var src_app_api_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/api.service */ "yTNM");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic/storage */ "e8h1");
/* harmony import */ var src_app_homepage_design_design_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/homepage/design/design.component */ "4JZt");
/* harmony import */ var src_app_email_model_email_model_page__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/email-model/email-model.page */ "+k72");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! moment */ "wd/R");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _ionic_native_social_sharing_ngx__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @ionic-native/social-sharing/ngx */ "/XPu");
/* harmony import */ var src_app_storage_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! src/app/storage.service */ "qkCY");
/* harmony import */ var _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @cometchat-pro/cordova-ionic-chat */ "ujHh");
/* harmony import */ var _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_15__);
















let DelievereddesignComponent = class DelievereddesignComponent {
    constructor(launchNavigator, datePipe, cdr, utils, storage, apiService, socialsharing, modalController, storageservice) {
        this.launchNavigator = launchNavigator;
        this.datePipe = datePipe;
        this.cdr = cdr;
        this.utils = utils;
        this.storage = storage;
        this.apiService = apiService;
        this.socialsharing = socialsharing;
        this.modalController = modalController;
        this.storageservice = storageservice;
        this.listofDesignData = [];
        this.listofDesignDataHelper = [];
        this.skip = 0;
        this.limit = 10;
        this.options = {
            start: '',
            app: this.launchNavigator.APP.GOOGLE_MAPS
        };
        this.user = this.storageservice.getUser();
        console.log("inside new surveys");
        const latestDate = new Date();
        this.today = datePipe.transform(latestDate, 'M/dd/yy');
        console.log('date', this.today);
    }
    ngOnInit() {
        this.designRefreshSubscription = this.utils.getHomepageDesignRefresh().subscribe((result) => {
            this.utils.setHomepagePermitRefresh(true);
            this.getDesigns(null);
        });
        this.dataRefreshSubscription = this.utils.getDataRefresh().subscribe((result) => {
            if (this.listofDesignData != null && this.listofDesignData.length > 0) {
                this.formatDesignData(this.listofDesignData);
            }
        });
    }
    ngOnDestroy() {
        //Called once, before the instance is destroyed.
        //Add 'implements OnDestroy' to the class.
        this.designRefreshSubscription.unsubscribe();
        this.dataRefreshSubscription.unsubscribe();
        this.cdr.detach();
    }
    getDesigns(event) {
        this.skip = 0;
        let showLoader = true;
        if (event != null && event !== undefined) {
            showLoader = false;
        }
        this.fetchPendingDesigns(event, showLoader);
    }
    fetchPendingDesigns(event, showLoader) {
        this.noDesignFound = "";
        this.listofDesignData = [];
        this.listofDesignDataHelper = [];
        this.utils.showLoadingWithPullRefreshSupport(showLoader, 'Getting Designs').then((success) => {
            this.apiService.getDesignSurveys("requesttype=prelim&status=delivered", this.limit, this.skip).subscribe((response) => {
                this.utils.hideLoadingWithPullRefreshSupport(showLoader).then(() => {
                    console.log(response);
                    if (response.length) {
                        this.formatDesignData(response);
                    }
                    else {
                        this.noDesignFound = "No Designs Found";
                    }
                    if (event !== null) {
                        event.target.complete();
                    }
                });
            }, responseError => {
                this.utils.hideLoadingWithPullRefreshSupport(showLoader).then(() => {
                    if (event !== null) {
                        event.target.complete();
                    }
                    const error = responseError.error;
                    this.utils.errorSnackBar(error.message[0].messages[0].message);
                });
            });
        });
    }
    openAddressOnMap(address) {
        this.launchNavigator.navigate(address, this.options);
    }
    formatDesignData(records) {
        let list;
        list = this.fillinDynamicData(records);
        list.forEach(element => {
            this.listofDesignData.push(element);
        });
        const tempData = [];
        this.listofDesignData.forEach((designItem) => {
            if (tempData.length === 0) {
                this.sDatePassed(designItem.updated_at);
                const listOfDesign = new src_app_homepage_design_design_component__WEBPACK_IMPORTED_MODULE_9__["DesginDataHelper"]();
                listOfDesign.date = this.datePipe.transform(designItem.updated_at, 'M/dd/yy');
                listOfDesign.lateby = this.overdue;
                listOfDesign.listOfDesigns.push(designItem);
                tempData.push(listOfDesign);
            }
            else {
                let added = false;
                tempData.forEach((designList) => {
                    if (!added) {
                        if (designList.date === this.datePipe.transform(designItem.updated_at, 'M/dd/yy')) {
                            designList.listOfDesigns.push(designItem);
                            this.sDatePassed(designItem.updated_at);
                            added = true;
                        }
                    }
                });
                if (!added) {
                    this.sDatePassed(designItem.updated_at);
                    const listOfDesign = new src_app_homepage_design_design_component__WEBPACK_IMPORTED_MODULE_9__["DesginDataHelper"]();
                    listOfDesign.date = this.datePipe.transform(designItem.updated_at, 'M/dd/yy');
                    listOfDesign.lateby = this.overdue;
                    listOfDesign.listOfDesigns.push(designItem);
                    tempData.push(listOfDesign);
                    added = true;
                }
            }
        });
        this.listofDesignDataHelper = tempData.sort(function (a, b) {
            var dateA = new Date(a.date).getTime(), dateB = new Date(b.date).getTime();
            return dateB - dateA;
        });
        this.chatIcon(list);
        this.cdr.detectChanges();
    }
    ///chat icon
    chatIcon(list) {
        list.forEach(element => {
            var groupMembersRequest = new _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_15__["CometChat"].GroupMembersRequestBuilder(element.chatid)
                .setLimit(10)
                .build();
            groupMembersRequest.fetchNext().then(groupMembers => {
                console.log(groupMembers);
                element.addedtogroupchat = true;
            }, error => {
                console.log("Group Member list fetching failed with exception:", error);
            });
        });
    }
    fillinDynamicData(records) {
        records.forEach(element => {
            if (element.status != "delivered") {
                element.isoverdue = this.utils.isDatePassed(element.deliverydate);
            }
            else {
                element.isoverdue = false;
            }
            element.lateby = this.utils.getTheLatebyString(element.deliverydate);
            element.formattedjobtype = this.utils.getJobTypeName(element.jobtype);
            this.storage.get('' + element.id).then((data) => {
                console.log(data);
                if (data) {
                    element.totalpercent = data.currentprogress;
                }
                else {
                    element.totalpercent = 0;
                }
            });
        });
        return records;
    }
    sDatePassed(datestring) {
        var checkdate = moment__WEBPACK_IMPORTED_MODULE_11__(datestring, "YYYYMMDD");
        var todaydate = moment__WEBPACK_IMPORTED_MODULE_11__(new Date(), "YYYYMMDD");
        var lateby = todaydate.diff(checkdate, "days");
        this.overdue = lateby;
    }
    shareWhatsapp(designData) {
        this.socialsharing.share(designData.prelimdesign.url);
    }
    doInfinite($event) {
        this.skip = this.skip + 10;
        this.apiService.getDesignSurveys("requesttype=prelim&status=delivered", this.limit, this.skip).subscribe((response) => {
            console.log(response);
            if (response.length) {
                this.formatDesignData(response);
            }
            else {
                this.noDesignFound = "No Designs Found";
            }
            if (event !== null) {
                $event.target.complete();
            }
        }, (responseError) => {
            if (event !== null) {
                $event.target.complete();
            }
            const error = responseError.error;
            this.utils.errorSnackBar(error.message[0].messages[0].message);
        });
    }
    shareViaEmails(id, designData) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const modal = yield this.modalController.create({
                component: src_app_email_model_email_model_page__WEBPACK_IMPORTED_MODULE_10__["EmailModelPage"],
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
    trackdesign(index, design) {
        return design.id;
    }
};
DelievereddesignComponent.ctorParameters = () => [
    { type: _ionic_native_launch_navigator_ngx__WEBPACK_IMPORTED_MODULE_4__["LaunchNavigator"] },
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_5__["DatePipe"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ChangeDetectorRef"] },
    { type: src_app_utilities_service__WEBPACK_IMPORTED_MODULE_6__["UtilitiesService"] },
    { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_8__["Storage"] },
    { type: src_app_api_service__WEBPACK_IMPORTED_MODULE_7__["ApiService"] },
    { type: _ionic_native_social_sharing_ngx__WEBPACK_IMPORTED_MODULE_13__["SocialSharing"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_12__["ModalController"] },
    { type: src_app_storage_service__WEBPACK_IMPORTED_MODULE_14__["StorageService"] }
];
DelievereddesignComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-delievereddesign',
        template: _raw_loader_delievereddesign_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_delievereddesign_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], DelievereddesignComponent);



/***/ }),

/***/ "XU+6":
/*!*********************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/designoverview/completeddesign/completeddesign.component.html ***!
  \*********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-content>\r\n  <ion-refresher slot=\"fixed\" (ionRefresh)=\"getDesigns($event)\">\r\n    <ion-refresher-content pullingIcon=\"arrow-dropdown\" pullingText=\"Pull down to refresh\" refreshingSpinner=\"lines\"></ion-refresher-content>\r\n  </ion-refresher>\r\n  <ion-grid *ngIf=\"listOfDesignDataHelper.length !==0\">\r\n    <ion-row *ngFor=\"let item of listOfDesignDataHelper;let i = index\">\r\n        <!-- <ion-virtual-scroll [items]=\"listOfDesignsHelper\"> -->\r\n            <!-- <ion-row *ngFor=\"let item of listOfDesignsHelper;let i = index\"> -->\r\n                <!-- <ion-row *virtualItem=\"let item;let i = index\"> -->\r\n        <!-- <ion-col size=\"12\" class=\"ion-margin-top\">\r\n                <span class=\"ion-padding\" *ngIf=\"today === item.date\">\r\n                    Today\r\n                  </span>\r\n            <span class=\"ion-padding\" *ngIf=\"today !== item.date\">\r\n                      {{item.date | date: 'dd MMM yyyy'}}\r\n                </span>\r\n        </ion-col> -->\r\n        <ion-col *ngFor=\"let designData of item.listOfDesigns;let i = index;trackBy: trackdesign \" size=\"12\">\r\n            <div class=\"ion-no-padding custom-card\" style=\"height: 100%;\">\r\n                <p class=\"customer-name\" >{{designData.name}}\r\n                      <!-- <span class=\"chipdetail\" style=\"background-color: #1289A7;\" [routerLink]=\"['/survey-detail/',designData.id]\" routerDirection=\"forward\">\r\n                        {{designData.deliverydate | date: 'hh:mm a'}}\r\n                    </span> -->\r\n                    <span [routerLink]=\"['/design-details/',designData.id]\"\r\n                    routerDirection=\"forward\" class=\"chipdetail\" style=\"background-color: rgb(109, 187, 26);border-radius: 50%;padding: 4px 5px;\" *ngIf=\"designData.status == 'designcompleted'\"><ion-icon name=\"checkmark-done-outline\" style=\"color: #fff;\"></ion-icon></span>\r\n                    <span [routerLink]=\"['/design-details/',designData.id]\"\r\n                    routerDirection=\"forward\" class=\"chipdetail\" style=\"background-color: rgb(246, 104, 10);\" *ngIf=\"designData.isoverdue\">Overdue</span>\r\n                    <span class=\"chipdetail\" style=\"background-color: rgb(183,21,64)\" *ngIf=\"designData.isinrevisionstate\"  [routerLink]=\"['/design-details/',designData.id]\">Revision</span>\r\n                    <span class=\"chipdetail ml-1 ml-1\" style=\"background-color: #FA983A;\"\r\n                    *ngIf=\"designData.isoutsourced == 'true'\">Wattmonk</span>\r\n                    <span fill=\"clear\" background-border=\"clear\" [routerLink]=\"['/','activity',designData.id,'design']\" class=\"imagebutton\"  size=\"small\"  ><ion-icon  src=\"/assets/images/activitylist.svg\" ></ion-icon></span>           \r\n                    <ng-container *ngIf=\"designData?.chatid!==null && designData?.addedtogroupchat\">\r\n                        <span fill=\"clear\" background-border=\"clear\" [routerLink]=\"['/','chat',designData.chatid]\" class=\"chatbutton\"  size=\"small\"  ><img  style= \"height:20px\" src=\"assets/images/chat.svg\" /></span>\r\n                      </ng-container> \r\n                </p>\r\n                <p style=\"margin:0px\"><span class=\"customer-email\" [routerLink]=\"['/survey-detail/',designData.id]\"\r\n                      routerDirection=\"forward\" *ngIf=\"user.designertype!='external'\">{{designData.email}}</span>\r\n                      <span *ngIf=\"designData.isoverdue\" class=\"latebystyle\" style=\"float: right;font-size: 10px;\"><strong>Late by {{item.lateby}}</strong></span>\r\n                      \r\n            </p>\r\n                <a href=\"tel:{{designData.phonenumber}}\" style=\"text-decoration: none;\" class=\"z-100\">\r\n                    <span class=\"customer-phone\" *ngIf=\"user.designertype!='external'\">{{designData.phonenumber}}</span></a>\r\n                <span style=\"margin:0px\" class=\"customer-address z-100\"\r\n                      (click)=\"openAddressOnMap(designData.address)\" *ngIf=\"user.designertype!='external'\">{{(designData.address | slice:0:50) + (designData.address.length > 50 ? '...' : '')}}</span>\r\n\r\n                <ion-row style=\"margin-bottom: 8px;\" [routerLink]=\"['/design-details/',designData.id]\" >\r\n                    <!-- <span class=\"chipdetail\" style=\"background-color: #95afc0;\" >Wattmonk</span> -->\r\n                    <span class=\"chipdetail\" style=\"background-color: #95afc0;\" >{{designData.source}}</span>\r\n                </ion-row>\r\n                <ion-progress-bar [value]=\"1\" mode=\"ios\" color=\"success\" class=\"progress-bar-height\"></ion-progress-bar>\r\n            </div>\r\n        </ion-col>\r\n    </ion-row>\r\n    <!-- </ion-virtual-scroll> -->\r\n    <ion-row>\r\n        <ion-col size=\"12\" style=\"height: 100px;\">\r\n        </ion-col>\r\n    </ion-row>\r\n</ion-grid>\r\n\r\n<div *ngIf=\"listOfDesignDataHelper.length===0\" class=\"h-100 d-flex flex-column align-center justify-center\">\r\n    {{noDesignFound}}\r\n    <ion-img src=\"/assets/images/blank.png\" class=\"placeholder\"></ion-img>\r\n</div>\r\n\r\n<ion-infinite-scroll (ionInfinite)=\"doInfinite($event)\">\r\n    <ion-infinite-scroll-content\r\n      loadingSpinner=\"bubbles\"\r\n      >\r\n    </ion-infinite-scroll-content>\r\n  </ion-infinite-scroll>\r\n</ion-content>\r\n");

/***/ }),

/***/ "YEZt":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/designoverview/newdesign/newdesign.component.html ***!
  \*********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-content>\r\n    <ion-refresher slot=\"fixed\" (ionRefresh)=\"getDesigns($event)\">\r\n      <ion-refresher-content pullingIcon=\"arrow-dropdown\" pullingText=\"Pull down to refresh\" refreshingSpinner=\"lines\"></ion-refresher-content>\r\n    </ion-refresher>\r\n    <ion-grid *ngIf=\"listOfDesignDataHelper.length !== 0\">\r\n     <ion-row *ngFor=\"let item of listOfDesignDataHelper;let i = index\"> \r\n          <!-- <ion-virtual-scroll [items]=\"listOfDesignsHelper\"> -->\r\n              <!-- <ion-row *ngFor=\"let item of listOfDesignsHelper;let i = index\"> -->\r\n                  <!-- <ion-row *virtualItem=\"let item;let i = index\"> -->\r\n          <!-- <ion-col size=\"12\" class=\"ion-margin-top\">\r\n                  <span class=\"ion-padding\" *ngIf=\"today === item.date\">\r\n                      Today\r\n                    </span>\r\n              <span class=\"ion-padding\" *ngIf=\"today !== item.date\">\r\n                        {{item.date | date: 'dd MMM yyyy'}}\r\n                  </span>\r\n            <span class=\"ion-padding\" *ngIf=\"today !== item.date\">\r\n                      {{item.date | date: 'dd MMM yyyy'}}\r\n                </span>\r\n        </ion-col> -->\r\n        <ion-col *ngFor=\"let designData of item.listOfDesigns;let i = index;trackBy: trackdesign \" size=\"12\">\r\n            <div class=\"ion-no-padding custom-card\" style=\"height: 100%;\">\r\n                <p class=\"customer-name\">{{designData.name}}\r\n                      <!-- <span class=\"chipdetail\" style=\"background-color: #1289A7;\" [routerLink]=\"['/design-details/',designData.id]\" routerDirection=\"forward\">\r\n                        {{designData.deliverydate | date: 'hh:mm a'}}\r\n                    </span> -->\r\n                    <span [routerLink]=\"['/design-details/',designData.id]\"\r\n                    routerDirection=\"forward\" class=\"chipdetail\" style=\"background-color: #1289A7;;\" *ngIf=\"designData.status == 'designassigned'\">Assigned</span>\r\n                    <span [routerLink]=\"['/design-details/',designData.id]\"\r\n                    routerDirection=\"forward\" class=\"chipdetail\" style=\"background-color: rgb(246, 104, 10);\" *ngIf=\"designData.isoverdue > 0\">Overdue</span>\r\n                    <span class=\"chipdetail\" style=\"background-color: rgb(183,21,64)\" *ngIf=\"designData.isinrevisionstate\"  [routerLink]=\"['/design-details/',designData.id]\">Revision</span>\r\n                    <span class=\"chipdetail ml-1 ml-1\" style=\"background-color: #FA983A;\"\r\n                            *ngIf=\"designData.isoutsourced == 'true'\">Wattmonk</span>\r\n                    <span fill=\"clear\" background-border=\"clear\" [routerLink]=\"['/','activity',designData.id,'design']\" class=\"imagebutton\"  size=\"small\"  ><ion-icon  src=\"/assets/images/activitylist.svg\" ></ion-icon></span>\r\n                    <ng-container *ngIf=\"designData?.chatid!==null && designData?.addedtogroupchat\">\r\n                        <span fill=\"clear\" background-border=\"clear\" [routerLink]=\"['/','chat',designData?.chatid]\" class=\"chatbutton\"  size=\"small\"  ><img  style= \"height:20px\" src=\"assets/images/chat.svg\" /></span>\r\n                      </ng-container> \r\n                </p>\r\n               <p style=\"margin: 0px;\"> <span class=\"customer-email\" [routerLink]=\"['/design-details/',designData.id]\"\r\n                      routerDirection=\"forward\" *ngIf=\"user.designertype!='external'\">{{designData.email}}</span>\r\n                      <span *ngIf=\"designData.isoverdue\" class=\"latebystyle\" style=\"float: right;font-size: 10px;\"><strong>Late by {{designData.lateby}}</strong></span>\r\n                     </p>\r\n                <a href=\"tel:{{designData.phonenumber}}\" style=\"text-decoration: none;\" class=\"z-100\">\r\n                    <span class=\"customer-phone\" *ngIf=\"user.designertype!='external'\">{{designData.phonenumber}}</span></a>\r\n                <span style=\"margin:0px\" class=\"customer-address z-100\"\r\n                      (click)=\"openAddressOnMap(designData.address)\" *ngIf=\"user.designertype!='external'\">{{(designData.address | slice:0:50) + (designData.address.length > 50 ? '...' : '')}}</span>\r\n\r\n                <ion-row style=\"margin-bottom: 8px;\" [routerLink]=\"['/design-details/',designData.id]\">\r\n                    <!-- <span class=\"chipdetail\" style=\"background-color: #95afc0;\" >Wattmonk</span> -->\r\n                    <span class=\"chipdetail\" style=\"background-color: #95afc0;\" >{{designData?.source}}</span>\r\n                    <ion-col style=\"color: #737373; font-size: 14px;\">\r\n                        <span style=\"float: right;\" >{{designData.designremainingtime}}</span>\r\n                    </ion-col>\r\n                   \r\n                      <!-- <span class=\"chipdetail\" style=\"background-color: rgb(246, 77, 10);\" *ngIf=\"designData.isoverdue\">Overdue</span> -->\r\n                </ion-row>\r\n                <ion-row class=\"ion-no-margin ion-no-margin\">\r\n                    <ion-col></ion-col>\r\n                    <!-- <ion-col class=\"ion-no-margin ion-no-padding\"> -->\r\n                    <!-- <ion-col class=\"ion-no-margin ion-no-padding\" *ngIf=\"designData.deliverydate == currentDate\"> -->\r\n                        <!-- <ion-button class=\"ion-no-margin ion-no-padding\" fill=\"clear\" [routerLink]=\"['/surveyprocess/' + designData.id + '/' + designData.jobtype + '/' + designData.latitude + '/' + designData.longitude + '/' + designData.city + '/' + designData.state]\"\r\n                        routerDirection=\"forward\">\r\n                            Start Survey\r\n                        </ion-button> -->\r\n                    <!-- </ion-col> -->\r\n                </ion-row>\r\n                <ion-progress-bar [value]=\"designData.totalpercent\" mode=\"ios\" color=\"success\" class=\"progress-bar-height\"></ion-progress-bar>\r\n            </div>\r\n        </ion-col>\r\n    </ion-row>\r\n    <!-- </ion-virtual-scroll> -->\r\n    <!-- <ion-row>\r\n        <ion-col size=\"12\" style=\"height: 100px;\">\r\n        </ion-col>\r\n    </ion-row> -->\r\n</ion-grid>\r\n\r\n<div *ngIf=\"listOfDesignDataHelper.length === 0\" class=\"h-100 d-flex flex-column align-center justify-center\">\r\n    {{noDesignsFound}}\r\n    <ion-img src=\"/assets/images/blank.png\" class=\"placeholder\"></ion-img>\r\n</div>\r\n\r\n<ion-infinite-scroll (ionInfinite)=\"doInfinite($event)\">\r\n    <ion-infinite-scroll-content\r\n      loadingSpinner=\"bubbles\"\r\n      >\r\n    </ion-infinite-scroll-content>\r\n  </ion-infinite-scroll>\r\n \r\n</ion-content>\r\n");

/***/ }),

/***/ "cHfh":
/*!*********************************************************!*\
  !*** ./src/app/designoverview/designoverview.module.ts ***!
  \*********************************************************/
/*! exports provided: DesignoverviewPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DesignoverviewPageModule", function() { return DesignoverviewPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _designoverview_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./designoverview-routing.module */ "laZG");
/* harmony import */ var _designoverview_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./designoverview.page */ "3aWu");
/* harmony import */ var _ionic_native_diagnostic_ngx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic-native/diagnostic/ngx */ "mtRb");
/* harmony import */ var _ionic_native_native_geocoder_ngx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic-native/native-geocoder/ngx */ "h+qT");
/* harmony import */ var _ionic_native_launch_navigator_ngx__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic-native/launch-navigator/ngx */ "fGQ8");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../shared/shared.module */ "PCNd");
/* harmony import */ var _newdesign_newdesign_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./newdesign/newdesign.component */ "GTKF");
/* harmony import */ var _completeddesign_completeddesign_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./completeddesign/completeddesign.component */ "4DmR");
/* harmony import */ var _inreview_design_inreview_design_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./inreview-design/inreview-design.component */ "ijD8");
/* harmony import */ var _delievereddesign_delievereddesign_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./delievereddesign/delievereddesign.component */ "TiSb");















let DesignoverviewPageModule = class DesignoverviewPageModule {
};
DesignoverviewPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _designoverview_routing_module__WEBPACK_IMPORTED_MODULE_5__["DesignoverviewPageRoutingModule"],
            _shared_shared_module__WEBPACK_IMPORTED_MODULE_10__["SharedModule"]
        ],
        declarations: [_designoverview_page__WEBPACK_IMPORTED_MODULE_6__["DesignoverviewPage"], _newdesign_newdesign_component__WEBPACK_IMPORTED_MODULE_11__["NewdesignComponent"], _completeddesign_completeddesign_component__WEBPACK_IMPORTED_MODULE_12__["CompleteddesignComponent"], _inreview_design_inreview_design_component__WEBPACK_IMPORTED_MODULE_13__["InreviewDesignComponent"], _delievereddesign_delievereddesign_component__WEBPACK_IMPORTED_MODULE_14__["DelievereddesignComponent"]],
        providers: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["DatePipe"],
            _ionic_native_diagnostic_ngx__WEBPACK_IMPORTED_MODULE_7__["Diagnostic"],
            _ionic_native_native_geocoder_ngx__WEBPACK_IMPORTED_MODULE_8__["NativeGeocoder"],
            _ionic_native_launch_navigator_ngx__WEBPACK_IMPORTED_MODULE_9__["LaunchNavigator"]
        ]
    })
], DesignoverviewPageModule);



/***/ }),

/***/ "euGZ":
/*!*******************************************************************!*\
  !*** ./src/app/designoverview/newdesign/newdesign.component.scss ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".custom-card {\n  display: flex;\n  flex-direction: column;\n  background: #fff;\n  border-radius: 4px;\n  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.3);\n  padding: 8px 12px;\n}\n\n.customer-name {\n  font-size: 1em;\n  color: #434343;\n  font-weight: bold;\n  display: table;\n  margin: 0px;\n}\n\n.customer-email {\n  font-size: 0.8em;\n  color: #B4B4B4;\n}\n\n.customer-phone {\n  font-size: 0.8em;\n  color: #4272B9;\n}\n\n.customer-address {\n  margin-top: 16px;\n  margin-bottom: 16px;\n  font-size: 0.8em;\n  color: #4272B9;\n}\n\n.timestamp {\n  font-size: 0.7em;\n}\n\n.chipdetail {\n  display: inline;\n  vertical-align: middle;\n  background-color: #95afc0;\n  font-size: 0.6em;\n  padding: 4px 10px;\n  border-radius: 10px;\n  text-align: center;\n  color: #fff;\n}\n\n.imagebutton {\n  float: right;\n  margin-top: 0px;\n}\n\n.chatbutton {\n  float: right;\n  margin-top: 0px;\n  margin-right: 5px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFxuZXdkZXNpZ24uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0EsMENBQUE7RUFDQSxpQkFBQTtBQUNKOztBQUVFO0VBQ0UsY0FBQTtFQUNBLGNBQUE7RUFDQSxpQkFBQTtFQUNBLGNBQUE7RUFDQSxXQUFBO0FBQ0o7O0FBRUU7RUFDRSxnQkFBQTtFQUNBLGNBQUE7QUFDSjs7QUFFRTtFQUNFLGdCQUFBO0VBQ0EsY0FBQTtBQUNKOztBQUVFO0VBQ0UsZ0JBQUE7RUFDQSxtQkFBQTtFQUNBLGdCQUFBO0VBQ0EsY0FBQTtBQUNKOztBQUVFO0VBQ0UsZ0JBQUE7QUFDSjs7QUFFRTtFQUNFLGVBQUE7RUFDQSxzQkFBQTtFQUNBLHlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxpQkFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxXQUFBO0FBQ0o7O0FBQ0E7RUFDRSxZQUFBO0VBQ0EsZUFBQTtBQUVGOztBQUVBO0VBQ0UsWUFBQTtFQUNBLGVBQUE7RUFDQSxpQkFBQTtBQUNGIiwiZmlsZSI6Im5ld2Rlc2lnbi5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jdXN0b20tY2FyZCB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIGJhY2tncm91bmQ6ICNmZmY7XHJcbiAgICBib3JkZXItcmFkaXVzOiA0cHg7XHJcbiAgICBib3gtc2hhZG93OiAwIDFweCAycHggMCByZ2JhKDAsIDAsIDAsIDAuMyk7XHJcbiAgICBwYWRkaW5nOiA4cHggMTJweDtcclxuICB9XHJcbiAgXHJcbiAgLmN1c3RvbWVyLW5hbWUge1xyXG4gICAgZm9udC1zaXplOiAxZW07XHJcbiAgICBjb2xvcjogIzQzNDM0MztcclxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gICAgZGlzcGxheTp0YWJsZTtcclxuICAgIG1hcmdpbjogMHB4O1xyXG4gIH1cclxuICBcclxuICAuY3VzdG9tZXItZW1haWwge1xyXG4gICAgZm9udC1zaXplOiAwLjhlbTtcclxuICAgIGNvbG9yOiAjQjRCNEI0O1xyXG4gIH1cclxuICBcclxuICAuY3VzdG9tZXItcGhvbmUge1xyXG4gICAgZm9udC1zaXplOiAwLjhlbTtcclxuICAgIGNvbG9yOiAjNDI3MkI5O1xyXG4gIH1cclxuICBcclxuICAuY3VzdG9tZXItYWRkcmVzcyB7XHJcbiAgICBtYXJnaW4tdG9wOiAxNnB4O1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMTZweDtcclxuICAgIGZvbnQtc2l6ZTogMC44ZW07XHJcbiAgICBjb2xvcjogIzQyNzJCOTtcclxuICB9XHJcbiAgXHJcbiAgLnRpbWVzdGFtcCB7XHJcbiAgICBmb250LXNpemU6IDAuN2VtO1xyXG4gIH1cclxuICBcclxuICAuY2hpcGRldGFpbHtcclxuICAgIGRpc3BsYXk6IGlubGluZTtcclxuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjOTVhZmMwO1xyXG4gICAgZm9udC1zaXplOiAwLjZlbTtcclxuICAgIHBhZGRpbmc6IDRweCAxMHB4O1xyXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIGNvbG9yOiAjZmZmO1xyXG59XHJcbi5pbWFnZWJ1dHRvbntcclxuICBmbG9hdDpyaWdodDtcclxuICBtYXJnaW4tdG9wOiAwcHg7XHJcbiAgXHJcbiAgXHJcbn1cclxuLmNoYXRidXR0b257XHJcbiAgZmxvYXQ6cmlnaHQ7XHJcbiAgbWFyZ2luLXRvcDogMHB4O1xyXG4gIG1hcmdpbi1yaWdodDo1cHg7XHJcbn0iXX0= */");

/***/ }),

/***/ "ijD8":
/*!*****************************************************************************!*\
  !*** ./src/app/designoverview/inreview-design/inreview-design.component.ts ***!
  \*****************************************************************************/
/*! exports provided: InreviewDesignComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InreviewDesignComponent", function() { return InreviewDesignComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_inreview_design_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./inreview-design.component.html */ "R4jy");
/* harmony import */ var _inreview_design_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./inreview-design.component.scss */ "s/Hm");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ionic_native_launch_navigator_ngx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic-native/launch-navigator/ngx */ "fGQ8");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var src_app_utilities_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/utilities.service */ "oTnF");
/* harmony import */ var src_app_api_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/api.service */ "yTNM");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic/storage */ "e8h1");
/* harmony import */ var src_app_homepage_design_design_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/homepage/design/design.component */ "4JZt");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! moment */ "wd/R");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var src_app_storage_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/storage.service */ "qkCY");
/* harmony import */ var _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @cometchat-pro/cordova-ionic-chat */ "ujHh");
/* harmony import */ var _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_12__);








// import { DesignStorageModel } from 'src/app/model/Design-storage.model';





let InreviewDesignComponent = class InreviewDesignComponent {
    constructor(launchNavigator, datePipe, cdr, utils, storage, apiService, storageservice) {
        this.launchNavigator = launchNavigator;
        this.datePipe = datePipe;
        this.cdr = cdr;
        this.utils = utils;
        this.storage = storage;
        this.apiService = apiService;
        this.storageservice = storageservice;
        this.listOfDesigns = [];
        this.listOfDesignsHelper = [];
        this.limit = 10;
        this.skip = 0;
        this.options = {
            start: '',
            app: this.launchNavigator.APP.GOOGLE_MAPS
        };
        this.user = this.storageservice.getUser();
        const latestDate = new Date();
        this.today = datePipe.transform(latestDate, 'M/dd/yy');
        console.log('date', this.today);
    }
    ngOnInit() {
        this.DesignRefreshSubscription = this.utils.getHomepageDesignRefresh().subscribe((result) => {
            this.skip = 0;
            this.getDesigns(null);
        });
        this.dataRefreshSubscription = this.utils.getDataRefresh().subscribe((result) => {
            if (this.listOfDesigns != null && this.listOfDesigns.length > 0) {
                this.formatDesignData(this.listOfDesigns);
            }
        });
    }
    ngOnDestroy() {
        //Called once, before the instance is destroyed.
        //Add 'implements OnDestroy' to the class.
        this.DesignRefreshSubscription.unsubscribe();
        this.dataRefreshSubscription.unsubscribe();
        this.cdr.detach();
    }
    getDesigns(event) {
        this.skip = 0;
        let showLoader = true;
        if (event != null && event !== undefined) {
            showLoader = false;
        }
        this.fetchPendingDesigns(event, showLoader);
    }
    fetchPendingDesigns(event, showLoader) {
        this.noDesignsFound = "";
        console.log("inside fetch Designs");
        this.listOfDesigns = [];
        this.listOfDesignsHelper = [];
        this.utils.showLoadingWithPullRefreshSupport(showLoader, 'Getting Designs').then((success) => {
            this.apiService.getDesignSurveys("requesttype=prelim&status=reviewassigned&status=reviewfailed&status=reviewpassed", this.limit, this.skip).subscribe((response) => {
                this.utils.hideLoadingWithPullRefreshSupport(showLoader).then(() => {
                    console.log(response);
                    if (response.length) {
                        this.formatDesignData(response);
                    }
                    else {
                        this.noDesignsFound = "No Designs Found";
                    }
                    if (event !== null) {
                        event.target.complete();
                    }
                });
            }, responseError => {
                this.utils.hideLoadingWithPullRefreshSupport(showLoader).then(() => {
                    if (event !== null) {
                        event.target.complete();
                    }
                    const error = responseError.error;
                    this.utils.errorSnackBar(error.message[0].messages[0].message);
                });
            });
        });
    }
    openAddressOnMap(address) {
        this.launchNavigator.navigate(address, this.options);
    }
    formatDesignData(records) {
        let list;
        list = this.fillinDynamicData(records);
        list.forEach(element => {
            this.listOfDesigns.push(element);
        });
        const tempData = [];
        this.listOfDesigns.forEach((designItem) => {
            if (tempData.length === 0) {
                this.sDatePassed(designItem.updated_at);
                const listOfDesign = new src_app_homepage_design_design_component__WEBPACK_IMPORTED_MODULE_9__["DesginDataHelper"]();
                listOfDesign.date = this.datePipe.transform(designItem.updated_at, 'M/dd/yy');
                listOfDesign.lateby = this.overdue;
                listOfDesign.listOfDesigns.push(designItem);
                tempData.push(listOfDesign);
            }
            else {
                let added = false;
                tempData.forEach((DesignList) => {
                    if (!added) {
                        if (DesignList.date === this.datePipe.transform(designItem.updated_at, 'M/dd/yy')) {
                            DesignList.listOfDesigns.push(designItem);
                            this.sDatePassed(designItem.updated_at);
                            added = true;
                        }
                    }
                });
                if (!added) {
                    this.sDatePassed(designItem.updated_at);
                    const listOfDesign = new src_app_homepage_design_design_component__WEBPACK_IMPORTED_MODULE_9__["DesginDataHelper"]();
                    listOfDesign.date = this.datePipe.transform(designItem.updated_at, 'M/dd/yy');
                    listOfDesign.lateby = this.overdue;
                    listOfDesign.listOfDesigns.push(designItem);
                    tempData.push(listOfDesign);
                    added = true;
                }
            }
        });
        this.listOfDesignsHelper = tempData.sort(function (a, b) {
            var dateA = new Date(a.date).getTime(), dateB = new Date(b.date).getTime();
            return dateB - dateA;
        });
        this.chatIcon(list);
        this.cdr.detectChanges();
    }
    ///chat icon
    chatIcon(list) {
        list.forEach(element => {
            var groupMembersRequest = new _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_12__["CometChat"].GroupMembersRequestBuilder(element.chatid)
                .setLimit(10)
                .build();
            groupMembersRequest.fetchNext().then(groupMembers => {
                console.log(groupMembers);
                element.addedtogroupchat = true;
            }, error => {
                console.log("Group Member list fetching failed with exception:", error);
            });
        });
    }
    fillinDynamicData(records) {
        records.forEach((element) => {
            if (element.status != "delivered") {
                element.isoverdue = this.utils.isDatePassed(element.deliverydate);
            }
            else {
                element.isoverdue = false;
            }
            element.lateby = this.utils.getTheLatebyString(element.deliverydate);
            element.formattedjobtype = this.utils.getJobTypeName(element.jobtype);
            this.storage.get('' + element.id).then((data) => {
                console.log(data);
                if (data) {
                    element.totalpercent = data.currentprogress;
                }
                else {
                    element.totalpercent = 0;
                }
            });
        });
        return records;
    }
    doInfinite($event) {
        this.skip = this.skip + 10;
        this.apiService.getDesignSurveys("requesttype=prelim&status=reviewassigned&status=reviewfailed&status=reviewpassed", this.limit, this.skip).subscribe((response) => {
            console.log(response);
            if (response.length) {
                this.formatDesignData(response);
            }
            else {
                this.noDesignsFound = "No Designs Found";
            }
            if (event !== null) {
                $event.target.complete();
            }
        }, (responseError) => {
            if (event !== null) {
                $event.target.complete();
            }
            const error = responseError.error;
            this.utils.errorSnackBar(error.message[0].messages[0].message);
        });
    }
    sDatePassed(datestring) {
        var checkdate = moment__WEBPACK_IMPORTED_MODULE_10__(datestring, "YYYYMMDD");
        var todaydate = moment__WEBPACK_IMPORTED_MODULE_10__(new Date(), "YYYYMMDD");
        var lateby = todaydate.diff(checkdate, "days");
        this.overdue = lateby;
    }
    trackdesign(index, design) {
        return design.id;
    }
};
InreviewDesignComponent.ctorParameters = () => [
    { type: _ionic_native_launch_navigator_ngx__WEBPACK_IMPORTED_MODULE_4__["LaunchNavigator"] },
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_5__["DatePipe"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ChangeDetectorRef"] },
    { type: src_app_utilities_service__WEBPACK_IMPORTED_MODULE_6__["UtilitiesService"] },
    { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_8__["Storage"] },
    { type: src_app_api_service__WEBPACK_IMPORTED_MODULE_7__["ApiService"] },
    { type: src_app_storage_service__WEBPACK_IMPORTED_MODULE_11__["StorageService"] }
];
InreviewDesignComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-inreview-design',
        template: _raw_loader_inreview_design_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_inreview_design_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], InreviewDesignComponent);



/***/ }),

/***/ "laZG":
/*!*****************************************************************!*\
  !*** ./src/app/designoverview/designoverview-routing.module.ts ***!
  \*****************************************************************/
/*! exports provided: DesignoverviewPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DesignoverviewPageRoutingModule", function() { return DesignoverviewPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _designoverview_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./designoverview.page */ "3aWu");
/* harmony import */ var _newdesign_newdesign_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./newdesign/newdesign.component */ "GTKF");
/* harmony import */ var _completeddesign_completeddesign_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./completeddesign/completeddesign.component */ "4DmR");
/* harmony import */ var _inreview_design_inreview_design_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./inreview-design/inreview-design.component */ "ijD8");
/* harmony import */ var _delievereddesign_delievereddesign_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./delievereddesign/delievereddesign.component */ "TiSb");








const routes = [
    {
        path: '',
        component: _designoverview_page__WEBPACK_IMPORTED_MODULE_3__["DesignoverviewPage"],
        children: [
            {
                path: 'newdesigns',
                component: _newdesign_newdesign_component__WEBPACK_IMPORTED_MODULE_4__["NewdesignComponent"]
            },
            {
                path: 'completeddesigns',
                component: _completeddesign_completeddesign_component__WEBPACK_IMPORTED_MODULE_5__["CompleteddesignComponent"]
            },
            {
                path: 'inreviewdesigns',
                component: _inreview_design_inreview_design_component__WEBPACK_IMPORTED_MODULE_6__["InreviewDesignComponent"]
            },
            {
                path: 'delivereddesigns',
                component: _delievereddesign_delievereddesign_component__WEBPACK_IMPORTED_MODULE_7__["DelievereddesignComponent"]
            }
        ]
    }
];
let DesignoverviewPageRoutingModule = class DesignoverviewPageRoutingModule {
};
DesignoverviewPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], DesignoverviewPageRoutingModule);



/***/ }),

/***/ "s/Hm":
/*!*******************************************************************************!*\
  !*** ./src/app/designoverview/inreview-design/inreview-design.component.scss ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".custom-card {\n  display: flex;\n  flex-direction: column;\n  background: white;\n  border-radius: 4px;\n  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.3);\n  padding: 8px 12px;\n}\n\n.customer-name {\n  font-size: 1em;\n  color: #434343;\n  font-weight: bold;\n  display: table;\n  margin: 0px;\n}\n\n.customer-email {\n  font-size: 0.8em;\n  color: #B4B4B4;\n}\n\n.customer-phone {\n  font-size: 0.8em;\n  color: #4272B9;\n}\n\n.customer-address {\n  margin-top: 16px;\n  margin-bottom: 16px;\n  font-size: 0.8em;\n  color: #4272B9;\n}\n\n.timestamp {\n  font-size: 0.7em;\n}\n\n.chipdetail {\n  display: inline;\n  vertical-align: middle;\n  background-color: #95afc0;\n  font-size: 0.6em;\n  padding: 4px 10px;\n  border-radius: 10px;\n  text-align: center;\n  color: #fff;\n}\n\n.imagebutton {\n  float: right;\n  margin-top: 0px;\n}\n\n.chatbutton {\n  float: right;\n  margin-top: 0px;\n  margin-right: 5px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFxpbnJldmlldy1kZXNpZ24uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0VBQ0EsMENBQUE7RUFDQSxpQkFBQTtBQUNKOztBQUVFO0VBQ0UsY0FBQTtFQUNBLGNBQUE7RUFDQSxpQkFBQTtFQUNBLGNBQUE7RUFDQSxXQUFBO0FBQ0o7O0FBRUU7RUFDRSxnQkFBQTtFQUNBLGNBQUE7QUFDSjs7QUFFRTtFQUNFLGdCQUFBO0VBQ0EsY0FBQTtBQUNKOztBQUVFO0VBQ0UsZ0JBQUE7RUFDQSxtQkFBQTtFQUNBLGdCQUFBO0VBQ0EsY0FBQTtBQUNKOztBQUVFO0VBQ0UsZ0JBQUE7QUFDSjs7QUFFRTtFQUNFLGVBQUE7RUFDQSxzQkFBQTtFQUNBLHlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxpQkFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxXQUFBO0FBQ0o7O0FBQ0E7RUFDRSxZQUFBO0VBQ0EsZUFBQTtBQUVGOztBQUVBO0VBQ0UsWUFBQTtFQUNBLGVBQUE7RUFDQSxpQkFBQTtBQUNGIiwiZmlsZSI6ImlucmV2aWV3LWRlc2lnbi5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jdXN0b20tY2FyZCB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIGJhY2tncm91bmQ6IHdoaXRlO1xyXG4gICAgYm9yZGVyLXJhZGl1czogNHB4O1xyXG4gICAgYm94LXNoYWRvdzogMCAxcHggMnB4IDAgcmdiYSgwLCAwLCAwLCAwLjMpO1xyXG4gICAgcGFkZGluZzogOHB4IDEycHg7XHJcbiAgfVxyXG4gIFxyXG4gIC5jdXN0b21lci1uYW1lIHtcclxuICAgIGZvbnQtc2l6ZTogMWVtO1xyXG4gICAgY29sb3I6ICM0MzQzNDM7XHJcbiAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgIGRpc3BsYXk6dGFibGU7XHJcbiAgICBtYXJnaW46IDBweDtcclxuICB9XHJcbiAgXHJcbiAgLmN1c3RvbWVyLWVtYWlsIHtcclxuICAgIGZvbnQtc2l6ZTogMC44ZW07XHJcbiAgICBjb2xvcjogI0I0QjRCNDtcclxuICB9XHJcbiAgXHJcbiAgLmN1c3RvbWVyLXBob25lIHtcclxuICAgIGZvbnQtc2l6ZTogMC44ZW07XHJcbiAgICBjb2xvcjogIzQyNzJCOTtcclxuICB9XHJcbiAgXHJcbiAgLmN1c3RvbWVyLWFkZHJlc3Mge1xyXG4gICAgbWFyZ2luLXRvcDogMTZweDtcclxuICAgIG1hcmdpbi1ib3R0b206IDE2cHg7XHJcbiAgICBmb250LXNpemU6IDAuOGVtO1xyXG4gICAgY29sb3I6ICM0MjcyQjk7XHJcbiAgfVxyXG4gIFxyXG4gIC50aW1lc3RhbXAge1xyXG4gICAgZm9udC1zaXplOiAwLjdlbTtcclxuICB9XHJcbiAgXHJcbiAgLmNoaXBkZXRhaWx7XHJcbiAgICBkaXNwbGF5OiBpbmxpbmU7XHJcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzk1YWZjMDtcclxuICAgIGZvbnQtc2l6ZTogMC42ZW07XHJcbiAgICBwYWRkaW5nOiA0cHggMTBweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBjb2xvcjogI2ZmZjtcclxufVxyXG4uaW1hZ2VidXR0b257XHJcbiAgZmxvYXQ6cmlnaHQ7XHJcbiAgbWFyZ2luLXRvcDogMHB4O1xyXG4gIFxyXG4gIFxyXG59XHJcbi5jaGF0YnV0dG9ue1xyXG4gIGZsb2F0OnJpZ2h0O1xyXG4gIG1hcmdpbi10b3A6IDBweDtcclxuICBtYXJnaW4tcmlnaHQ6NXB4O1xyXG59Il19 */");

/***/ }),

/***/ "wpTt":
/*!***********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/designoverview/designoverview.page.html ***!
  \***********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!--<ion-header>\r\n  <ion-toolbar>\r\n    <ion-title>Home\r\n      <div style=\"float: right;display: flex; width:30%\">\r\n     <div ><ion-img src=\"/assets/images/icons8-search.svg\" class=\"notification-icon\" ></ion-img></div>\r\n     <div  style=\"float: right;\" [routerLink]=\"['/profile']\" routerDirection=\"forward\">\r\n      <ion-img src=\"/assets/images/notification.svg\" class=\"notification-icon\"></ion-img>\r\n       <span class=\"badge\">\r\n                  4\r\n              </span>\r\n  </div></div>\r\n    </ion-title>\r\n    </ion-toolbar>\r\n\r\n</ion-header>-->\r\n\r\n<ion-content style=\"position: relative;\">\r\n  <ion-grid>\r\n    <ion-row class=\"ion-align-items-center\">\r\n    <ion-toolbar>\r\n    <ion-buttons slot=\"start\">\r\n        <ion-menu-button></ion-menu-button>\r\n      </ion-buttons>\r\n    <ion-row class=\"ion-align-items-center\">\r\n        <ion-col>\r\n            <h1 class=\"ion-no-padding ion-no-margin home\">Prelim</h1>\r\n        </ion-col>\r\n        <!-- <ion-col *ngIf=\"showSearchBar === true\" >\r\n            <ion-searchbar debounce=\"0\" placeholder=\"home\" class=\"custom\"></ion-searchbar>\r\n        </ion-col> -->\r\n        <ion-col size=\"auto\">\r\n            <div class=\"notification-padding\" (click)=\"searchbar()\">\r\n                <ion-img src=\"/assets/images/icons8-search.svg\" class=\"notification-icon\"></ion-img>\r\n            </div>\r\n        </ion-col>\r\n        <ion-col size=\"auto\" style=\"position: relative;\">\r\n            <div class=\"notification-padding\" [routerLink]=\"['/notification']\" routerDirection=\"forward\" (click)=\"setzero()\">\r\n                <ion-img src=\"/assets/images/notification.svg\" class=\"notification-icon\"></ion-img>\r\n               <span class=\"badge\" *ngIf=\"unreadCount > 0\">\r\n                            {{unreadCount > 99 ? '99+' : unreadCount }}\r\n                        </span>\r\n            </div>\r\n        </ion-col>\r\n    </ion-row>\r\n</ion-toolbar>\r\n</ion-row>\r\n</ion-grid>\r\n\r\n\r\n\r\n</ion-content>\r\n<ion-tabs style=\"margin-top: 52px;\">\r\n  <ion-tab-bar slot=\"top\">\r\n    <ion-tab-button tab=\"newdesigns\">\r\n      <ion-label class=\"font\">In Designing</ion-label>\r\n    </ion-tab-button>\r\n    <ion-tab-button tab=\"completeddesigns\">\r\n      <ion-label class=\"font\">Completed</ion-label>\r\n    </ion-tab-button>\r\n    <ion-tab-button tab=\"inreviewdesigns\">\r\n      <ion-label class=\"font\">In Review</ion-label>\r\n    </ion-tab-button>\r\n    <ion-tab-button tab=\"delivereddesigns\">\r\n      <ion-label class=\"font\">Delivered</ion-label>\r\n    </ion-tab-button>\r\n  </ion-tab-bar>\r\n</ion-tabs>\r\n\r\n<!-- <ion-footer class=\"ion-no-border white-bg\">\r\n  <div class=\"position-relative\">\r\n    <ion-grid class=\"bottom-bar ion-no-margin ion-no-padding\">\r\n      <ion-row>\r\n        <ion-col size=\"6\">\r\n          <div class=\"tab\">\r\n            <ion-img src=\"/assets/images/home-outline.svg\" class=\"tab-icon\"></ion-img>\r\n            <span class=\"tabText\">Home</span>\r\n          </div>\r\n        </ion-col>\r\n\r\n        <ion-col size=\"6\" [routerLink]=\"['/profile']\" routerDirection=\"forward\">\r\n          <div class=\"tab\">\r\n            <ion-img src=\"/assets/images/account-outline.svg\" class=\"tab-icon\"></ion-img>\r\n            <span class=\"tabText\">Profile</span>\r\n          </div>\r\n        </ion-col>\r\n      </ion-row>\r\n    </ion-grid>\r\n  </div>\r\n</ion-footer> -->\r\n");

/***/ })

}]);
//# sourceMappingURL=designoverview-designoverview-module.js.map