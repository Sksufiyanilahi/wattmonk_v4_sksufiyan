(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["permitdesignoverview-permitdesignoverview-module"],{

/***/ "+8JW":
/*!*************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/permitdesignoverview/permitdeliver-design/permitdeliver-design.component.html ***!
  \*************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-content>\r\n  <ion-refresher slot=\"fixed\" (ionRefresh)=\"getDesigns($event)\">\r\n    <ion-refresher-content pullingIcon=\"arrow-dropdown\" pullingText=\"Pull down to refresh\" refreshingSpinner=\"lines\"></ion-refresher-content>\r\n  </ion-refresher>\r\n  <ion-grid *ngIf=\"listofDesignDataHelper.length !== 0\">\r\n    <ion-row *ngFor=\"let item of listofDesignDataHelper;let i = index\">\r\n        <!-- <ion-virtual-scroll [items]=\"listOfDesignsHelper\"> -->\r\n            <!-- <ion-row *ngFor=\"let item of listOfDesignsHelper;let i = index\"> -->\r\n                <!-- <ion-row *virtualItem=\"let item;let i = index\"> -->\r\n        <!-- <ion-col size=\"12\" class=\"ion-margin-top\">\r\n                <span class=\"ion-padding\" *ngIf=\"today === item.date\">\r\n                    Today\r\n                  </span>\r\n            <span class=\"ion-padding\" *ngIf=\"today !== item.date\">\r\n                      {{item.date | date: 'dd MMM yyyy'}}\r\n                </span>\r\n        </ion-col> -->\r\n        <ion-col *ngFor=\"let designData of item.listOfDesigns;let i = index;trackBy: trackdesign \" size=\"12\">\r\n            <div class=\"ion-no-padding custom-card\" style=\"height: 100%;\">\r\n                <p class=\"customer-name\" >{{designData.name}}\r\n                      <!-- <span class=\"chipdetail\" style=\"background-color: #1289A7;\" [routerLink]=\"['/design-details/',designData.id]\" routerDirection=\"forward\">\r\n                        {{designData.deliverydate | date: 'hh:mm a'}}\r\n                    </span> -->\r\n                    <span [routerLink]=\"['/permit-design-details/',designData.id]\"\r\n                    routerDirection=\"forward\" class=\"chipdetail\" style=\"background-color: rgb(109, 187, 26);\" *ngIf=\"designData.status == 'delivered'\">Delivered</span>\r\n                    <span   [routerLink]=\"['/permit-design-details/',designData.id]\"\r\n                    routerDirection=\"forward\" class=\"chipdetail\" style=\"background-color: rgb(246, 104, 10);\" *ngIf=\"designData.isoverdue\">Overdue</span>\r\n                    <span class=\"chipdetail\" style=\"background-color: rgb(183,21,64)\" *ngIf=\"designData.isinrevisionstate\"  [routerLink]=\"['/permit-design-details/',designData.id]\">Revision</span>\r\n                    <span class=\"chipdetail ml-1 ml-1\" style=\"background-color: #FA983A;\"\r\n                    *ngIf=\"designData.isoutsourced == 'true'\">Wattmonk</span>\r\n                    <span fill=\"clear\" background-border=\"clear\" [routerLink]=\"['/','activity',designData.id,'design']\" class=\"imagebutton\"  size=\"small\"  ><ion-icon  src=\"/assets/images/activitylist.svg\" ></ion-icon></span>\r\n                    <ng-container *ngIf=\"designData?.chatid!==null && designData?.addedtogroupchat\">\r\n                        <span fill=\"clear\" background-border=\"clear\" [routerLink]=\"['/','chat',designData.chatid]\" class=\"chatbutton\"  size=\"small\"  ><img  style= \"height:20px\" src=\"assets/images/chat.svg\" /></span>\r\n                      </ng-container>\r\n                </p>\r\n                <p style=\"margin:0px\">\r\n                <span class=\"customer-email\"  [routerLink]=\"['/permit-design-details/',designData.id]\" *ngIf=\"userData.designertype!='external'\"\r\n                      routerDirection=\"forward\">{{designData.email}}</span>\r\n                      <span *ngIf=\"designData.isoverdue\" class=\"latebystyle\" style=\"float: right;font-size: 10px;\"><strong>Late by {{item.lateby}}</strong></span>\r\n\r\n            </p>\r\n\r\n                <a href=\"tel:{{designData.phonenumber}}\" style=\"text-decoration: none;\" class=\"z-100\">\r\n                    <span class=\"customer-phone\" *ngIf=\"userData.designertype!='external'\">{{designData.phonenumber}}</span></a>\r\n                <span style=\"margin:0px\" class=\"customer-address z-100\" *ngIf=\"userData.designertype!='external'\"\r\n                      (click)=\"openAddressOnMap(designData.address)\">{{(designData.address | slice:0:50) + (designData.address.length > 50 ? '...' : '')}}</span>\r\n\r\n                <ion-row style=\"margin-bottom: 8px;\"  [routerLink]=\"['/permit-design-details/',designData.id]\" >\r\n                    <!-- <span class=\"chipdetail\" style=\"background-color: #95afc0;\" >Wattmonk</span> -->\r\n                    <span class=\"chipdetail\" style=\"background-color: #95afc0;align-self: center;\" >{{designData.source}}</span>\r\n                    <span class=\"chipdetail\" style=\"background-color: #95afc0;align-self: center;\" >{{designData?.jobtype=='pvbattery' ? 'PV + Battery' : designData?.jobtype}}</span>\r\n                </ion-row>\r\n                <ion-row class=\"ion-no-margin ion-no-margin\">\r\n                    <ion-col >\r\n                        <span  style=\"float:right !important;\" class=\"ion-text-end action-button-color\" (click)=\"shareWhatsapp(designData)\">\r\n                            <ion-icon name=\"share-social-outline\"></ion-icon></span>&nbsp;\r\n                        <span style=\"float:right !important;margin-right: 8px;\" class=\"ion-text-end action-button-color\" (click)=\"shareViaEmails(designData.id,designData)\">\r\n                            <ion-icon name=\"mail\" ></ion-icon></span>\r\n                    </ion-col>\r\n                </ion-row>\r\n            </div>\r\n        </ion-col>\r\n    </ion-row>\r\n    <!-- </ion-virtual-scroll> -->\r\n\r\n\r\n\r\n    <!-- <ion-row>\r\n        <ion-col size=\"12\" style=\"height: 100px;\">\r\n        </ion-col>\r\n    </ion-row> -->\r\n</ion-grid>\r\n\r\n<div *ngIf=\"listofDesignDataHelper.length === 0\" class=\"h-100 d-flex flex-column align-center justify-center\">\r\n    {{noDesignsFound}}\r\n    <ion-img src=\"/assets/images/blank.png\" class=\"placeholder\"></ion-img>\r\n</div>\r\n<ion-infinite-scroll (ionInfinite)=\"doInfinite($event)\">\r\n    <ion-infinite-scroll-content\r\n      loadingSpinner=\"bubbles\"\r\n     >\r\n    </ion-infinite-scroll-content>\r\n  </ion-infinite-scroll>\r\n</ion-content>\r\n");

/***/ }),

/***/ "+k72":
/*!*************************************************!*\
  !*** ./src/app/email-model/email-model.page.ts ***!
  \*************************************************/
/*! exports provided: EmailModelPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmailModelPage", function() { return EmailModelPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_email_model_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./email-model.page.html */ "XnSu");
/* harmony import */ var _email_model_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./email-model.page.scss */ "sjP1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var src_app_utilities_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/utilities.service */ "oTnF");
/* harmony import */ var src_app_storage_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/storage.service */ "qkCY");
/* harmony import */ var src_app_api_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/api.service */ "yTNM");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic/angular */ "TEn/");









let EmailModelPage = class EmailModelPage {
    constructor(util, http, storage, api, modalctrl, nav) {
        this.util = util;
        this.http = http;
        this.storage = storage;
        this.api = api;
        this.modalctrl = modalctrl;
        this.nav = nav;
        this.example = [];
        this.teamMember = [];
        this.TeamData = [];
        this.bodyData = [];
        this.selectedEmails = [];
        this.resp = [];
        this.emails = '';
        this.checkedEmailIds = false;
        this.getTeamData();
    }
    validate(control) {
        throw new Error("Method not implemented.");
    }
    registerOnValidatorChange(fn) {
        throw new Error("Method not implemented.");
    }
    writeValue(obj) {
        throw new Error("Method not implemented.");
    }
    registerOnChange(fn) {
        throw new Error("Method not implemented.");
    }
    registerOnTouched(fn) {
        throw new Error("Method not implemented.");
    }
    setDisabledState(isDisabled) {
        throw new Error("Method not implemented.");
    }
    ngOnInit() {
        this.id = this.nav.get('id');
        this.data = this.nav.get('designData');
        console.log("hello", this.data);
    }
    getTeamData() {
        this.util.showLoading('Loading emails').then(() => {
            this.api.getTeamData().subscribe(response => {
                this.util.hideLoading().then(() => {
                    this.teamMember = response;
                    this.example = response;
                    this.TeamData = this.example;
                });
            });
        });
    }
    //onCloseClick(){
    // this.dialogRef.close(this.data);
    // }
    selectAll(event) {
        const Checked = event.target.checked;
        this.TeamData.forEach(item => item.Checked = Checked);
        console.log(this.TeamData.Checked);
    }
    checkedMails(event) {
        const Checked = event.target.checked;
        this.checkedEmailIds = event.target.checked;
    }
    SendMail() {
        var emails = document.getElementById("inputemails").value;
        this.emailArray = emails.split(',');
        this.emailArray.forEach(element => {
            this.selectedEmails.push(element);
        });
        this.bodyData = this.TeamData.filter(item => item.Checked);
        this.bodyData.forEach(element => {
            this.selectedEmails.push(element.email);
        });
        console.log(this.selectedEmails);
        // if(this.selectedEmails.length > 1){
        let body = { emails: this.selectedEmails,
            id: this.id };
        if (this.data.requesttype === 'prelim') {
            this.api.sendPrelimEmails(body).subscribe((response) => {
                this.resp = response;
                if (this.resp.status == 'success') {
                    this.util.showSnackBar("Email Sent  Successfully");
                    this.modalctrl.dismiss({
                        'dismissed': true
                    });
                    // this.dialogRef.close( );
                }
                this.selectedEmails = [];
            }, error => {
                this.util.errorSnackBar("Something went wrong. Please try again.");
                this.selectedEmails = [];
            });
        }
        else {
            this.api.sendPermitEmails(body).subscribe((response) => {
                this.resp = response;
                if (this.resp.status == 'success') {
                    this.util.showSnackBar("Email Sent  Successfully");
                    this.modalctrl.dismiss({
                        'dismissed': true
                    });
                    // this.dialogRef.close( );
                }
                this.selectedEmails = [];
            }, error => {
                this.util.errorSnackBar("Something went wrong. Please try again.");
                this.selectedEmails = [];
            });
        }
        // }
        //   else{
        //     this.util.errorSnackBar("Please Select the Email");
        //   }
    }
    cancel() {
        this.modalctrl.dismiss({
            'dismissed': true,
            cancel: 'cancel'
        });
    }
    checkedData(event) {
        console.log(event.target.checked);
    }
};
EmailModelPage.ctorParameters = () => [
    { type: src_app_utilities_service__WEBPACK_IMPORTED_MODULE_5__["UtilitiesService"] },
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"] },
    { type: src_app_storage_service__WEBPACK_IMPORTED_MODULE_6__["StorageService"] },
    { type: src_app_api_service__WEBPACK_IMPORTED_MODULE_7__["ApiService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_8__["ModalController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_8__["NavParams"] }
];
EmailModelPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-email-model',
        template: _raw_loader_email_model_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_email_model_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], EmailModelPage);



/***/ }),

/***/ "3SHV":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/permitdesignoverview/permitdesignoverview.page.html ***!
  \***********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!--<ion-header>\r\n  <ion-toolbar>\r\n    <ion-title>Home\r\n      <div style=\"float: right;display: flex; width:30%\">\r\n     <div ><ion-img src=\"/assets/images/icons8-search.svg\" class=\"notification-icon\" ></ion-img></div>\r\n     <div  style=\"float: right;\" [routerLink]=\"['/profile']\" routerDirection=\"forward\">\r\n      <ion-img src=\"/assets/images/notification.svg\" class=\"notification-icon\"></ion-img>\r\n       <span class=\"badge\">\r\n                  4\r\n              </span>\r\n  </div></div>\r\n    </ion-title>\r\n    </ion-toolbar>\r\n\r\n</ion-header>-->\r\n\r\n<ion-content style=\"position: relative;\">\r\n  <ion-grid>\r\n    <ion-row class=\"ion-align-items-center\">\r\n    <ion-toolbar>\r\n    <ion-buttons slot=\"start\">\r\n        <ion-menu-button></ion-menu-button>\r\n      </ion-buttons>\r\n    <ion-row class=\"ion-align-items-center\">\r\n        <ion-col>\r\n            <h1 class=\"ion-no-padding ion-no-margin home\">Permit</h1>\r\n        </ion-col>\r\n        <!-- <ion-col *ngIf=\"showSearchBar === true\" >\r\n            <ion-searchbar debounce=\"0\" placeholder=\"home\" class=\"custom\"></ion-searchbar>\r\n        </ion-col> -->\r\n        <ion-col size=\"auto\">\r\n            <div class=\"notification-padding\" (click)=\"searchbar()\">\r\n                <ion-img src=\"/assets/images/icons8-search.svg\" class=\"notification-icon\"></ion-img>\r\n            </div>\r\n        </ion-col>\r\n        <ion-col size=\"auto\" style=\"position: relative;\">\r\n            <div class=\"notification-padding\" [routerLink]=\"['/notification']\" routerDirection=\"forward\" (click)=\"setzero()\">\r\n                <ion-img src=\"/assets/images/notification.svg\" class=\"notification-icon\"></ion-img>\r\n               <span class=\"badge\" *ngIf=\"unreadCount > 0\">\r\n                            {{unreadCount > 99 ? '99+' : unreadCount }}\r\n                        </span>\r\n            </div>\r\n        </ion-col>\r\n    </ion-row>\r\n</ion-toolbar>\r\n</ion-row>\r\n</ion-grid>\r\n\r\n\r\n\r\n</ion-content>\r\n<ion-tabs style=\"margin-top: 52px;\">\r\n  <ion-tab-bar slot=\"top\">\r\n    <ion-tab-button tab=\"permitnewdesign\">\r\n      <ion-label class=\"font\">In Designing</ion-label>\r\n    </ion-tab-button>\r\n    <ion-tab-button tab=\"permitcompleted\">\r\n      <ion-label class=\"font\">Completed</ion-label>\r\n    </ion-tab-button>\r\n    <ion-tab-button tab=\"permitInreview\">\r\n      <ion-label class=\"font\">In Review</ion-label>\r\n    </ion-tab-button>\r\n    <ion-tab-button tab=\"permitdelivered\">\r\n      <ion-label class=\"font\">Delivered</ion-label>\r\n    </ion-tab-button>\r\n  </ion-tab-bar>\r\n</ion-tabs>\r\n<!--\r\n<ion-footer class=\"ion-no-border white-bg\">\r\n  <div class=\"position-relative\">\r\n    <ion-grid class=\"bottom-bar ion-no-margin ion-no-padding\">\r\n      <ion-row>\r\n        <ion-col size=\"6\">\r\n          <div class=\"tab\">\r\n            <ion-img src=\"/assets/images/home-outline.svg\" class=\"tab-icon\"></ion-img>\r\n            <span class=\"tabText\">Home</span>\r\n          </div>\r\n        </ion-col>\r\n        <ion-col size=\"4\" [routerLink]=\"['/message']\">\r\n          <div class=\"tab\">\r\n            <ion-img src=\"/assets/images/message-outline.svg\" class=\"tab-icon\"></ion-img>\r\n            <span class=\"tabText\">Messages</span>\r\n          </div>\r\n        </ion-col>\r\n        <ion-col size=\"6\" [routerLink]=\"['/profile']\" routerDirection=\"forward\">\r\n          <div class=\"tab\">\r\n            <ion-img src=\"/assets/images/account-outline.svg\" class=\"tab-icon\"></ion-img>\r\n            <span class=\"tabText\">Profile</span>\r\n          </div>\r\n        </ion-col>\r\n      </ion-row>\r\n    </ion-grid>\r\n  </div>\r\n</ion-footer> -->\r\n");

/***/ }),

/***/ "4v3I":
/*!*********************************************************************************************!*\
  !*** ./src/app/permitdesignoverview/permitdeliver-design/permitdeliver-design.component.ts ***!
  \*********************************************************************************************/
/*! exports provided: PermitdeliverDesignComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PermitdeliverDesignComponent", function() { return PermitdeliverDesignComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_permitdeliver_design_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./permitdeliver-design.component.html */ "+8JW");
/* harmony import */ var _permitdeliver_design_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./permitdeliver-design.component.scss */ "EQ3D");
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
















let PermitdeliverDesignComponent = class PermitdeliverDesignComponent {
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
        this.userData = this.storageservice.getUser();
        console.log("inside new surveys");
        const latestDate = new Date();
        this.today = datePipe.transform(latestDate, 'M/dd/yy');
        console.log('date', this.today);
    }
    ngOnInit() {
        this.designRefreshSubscription = this.utils.getHomepagePermitRefresh().subscribe((result) => {
            this.skip = 0;
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
        this.noDesignsFound = "";
        this.listofDesignData = [];
        this.listofDesignDataHelper = [];
        this.utils.showLoadingWithPullRefreshSupport(showLoader, 'Getting Designs').then((success) => {
            this.apiService.getDesignSurveys("requesttype=permit&status=delivered", this.limit, this.skip).subscribe((response) => {
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
    doInfinite($event) {
        this.skip = this.skip + 10;
        this.apiService.getDesignSurveys("requesttype=permit&status=delivered", this.limit, this.skip).subscribe((response) => {
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
        var checkdate = moment__WEBPACK_IMPORTED_MODULE_11__(datestring, "YYYYMMDD");
        var todaydate = moment__WEBPACK_IMPORTED_MODULE_11__(new Date(), "YYYYMMDD");
        var lateby = todaydate.diff(checkdate, "days");
        this.overdue = lateby;
    }
    shareWhatsapp(designData) {
        this.socialsharing.share(designData.permitdesign.url);
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
PermitdeliverDesignComponent.ctorParameters = () => [
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
PermitdeliverDesignComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-permitdeliver-design',
        template: _raw_loader_permitdeliver_design_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_permitdeliver_design_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], PermitdeliverDesignComponent);



/***/ }),

/***/ "B+52":
/*!*************************************************************************************!*\
  !*** ./src/app/permitdesignoverview/permitnewdesign/permitnewdesign.component.scss ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".custom-card {\n  display: flex;\n  flex-direction: column;\n  background: #fff;\n  border-radius: 4px;\n  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.3);\n  padding: 8px 12px;\n}\n\n.customer-name {\n  font-size: 1em;\n  color: #434343;\n  font-weight: bold;\n  display: table;\n  margin: 0px;\n}\n\n.customer-email {\n  font-size: 0.8em;\n  color: #B4B4B4;\n}\n\n.customer-phone {\n  font-size: 0.8em;\n  color: #4272B9;\n}\n\n.customer-address {\n  margin-top: 16px;\n  margin-bottom: 16px;\n  font-size: 0.8em;\n  color: #4272B9;\n}\n\n.timestamp {\n  font-size: 0.7em;\n}\n\n.chipdetail {\n  display: inline;\n  vertical-align: middle;\n  background-color: #95afc0;\n  font-size: 0.6em;\n  padding: 4px 10px;\n  border-radius: 10px;\n  text-align: center;\n  color: #fff;\n}\n\n.imagebutton {\n  float: right;\n  margin-top: 0px;\n}\n\n.chatbutton {\n  float: right;\n  margin-top: 0px;\n  margin-right: 5px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFxwZXJtaXRuZXdkZXNpZ24uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0EsMENBQUE7RUFDQSxpQkFBQTtBQUNKOztBQUVFO0VBQ0UsY0FBQTtFQUNBLGNBQUE7RUFDQSxpQkFBQTtFQUNBLGNBQUE7RUFDQSxXQUFBO0FBQ0o7O0FBRUU7RUFDRSxnQkFBQTtFQUNBLGNBQUE7QUFDSjs7QUFFRTtFQUNFLGdCQUFBO0VBQ0EsY0FBQTtBQUNKOztBQUVFO0VBQ0UsZ0JBQUE7RUFDQSxtQkFBQTtFQUNBLGdCQUFBO0VBQ0EsY0FBQTtBQUNKOztBQUVFO0VBQ0UsZ0JBQUE7QUFDSjs7QUFFRTtFQUNFLGVBQUE7RUFDQSxzQkFBQTtFQUNBLHlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxpQkFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxXQUFBO0FBQ0o7O0FBQ0E7RUFDRSxZQUFBO0VBQ0EsZUFBQTtBQUVGOztBQUVBO0VBQ0UsWUFBQTtFQUNBLGVBQUE7RUFDQSxpQkFBQTtBQUNGIiwiZmlsZSI6InBlcm1pdG5ld2Rlc2lnbi5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jdXN0b20tY2FyZCB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIGJhY2tncm91bmQ6ICNmZmY7XHJcbiAgICBib3JkZXItcmFkaXVzOiA0cHg7XHJcbiAgICBib3gtc2hhZG93OiAwIDFweCAycHggMCByZ2JhKDAsIDAsIDAsIDAuMyk7XHJcbiAgICBwYWRkaW5nOiA4cHggMTJweDtcclxuICB9XHJcbiAgXHJcbiAgLmN1c3RvbWVyLW5hbWUge1xyXG4gICAgZm9udC1zaXplOiAxZW07XHJcbiAgICBjb2xvcjogIzQzNDM0MztcclxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gICAgZGlzcGxheTp0YWJsZTtcclxuICAgIG1hcmdpbjogMHB4O1xyXG4gIH1cclxuICBcclxuICAuY3VzdG9tZXItZW1haWwge1xyXG4gICAgZm9udC1zaXplOiAwLjhlbTtcclxuICAgIGNvbG9yOiAjQjRCNEI0O1xyXG4gIH1cclxuICBcclxuICAuY3VzdG9tZXItcGhvbmUge1xyXG4gICAgZm9udC1zaXplOiAwLjhlbTtcclxuICAgIGNvbG9yOiAjNDI3MkI5O1xyXG4gIH1cclxuICBcclxuICAuY3VzdG9tZXItYWRkcmVzcyB7XHJcbiAgICBtYXJnaW4tdG9wOiAxNnB4O1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMTZweDtcclxuICAgIGZvbnQtc2l6ZTogMC44ZW07XHJcbiAgICBjb2xvcjogIzQyNzJCOTtcclxuICB9XHJcbiAgXHJcbiAgLnRpbWVzdGFtcCB7XHJcbiAgICBmb250LXNpemU6IDAuN2VtO1xyXG4gIH1cclxuICBcclxuICAuY2hpcGRldGFpbHtcclxuICAgIGRpc3BsYXk6IGlubGluZTtcclxuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjOTVhZmMwO1xyXG4gICAgZm9udC1zaXplOiAwLjZlbTtcclxuICAgIHBhZGRpbmc6IDRweCAxMHB4O1xyXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIGNvbG9yOiAjZmZmO1xyXG59XHJcbi5pbWFnZWJ1dHRvbntcclxuICBmbG9hdDpyaWdodDtcclxuICBtYXJnaW4tdG9wOiAwcHg7XHJcbiAgXHJcbiAgXHJcbn1cclxuLmNoYXRidXR0b257XHJcbiAgZmxvYXQ6cmlnaHQ7XHJcbiAgbWFyZ2luLXRvcDogMHB4O1xyXG4gIG1hcmdpbi1yaWdodDo1cHg7XHJcbn0iXX0= */");

/***/ }),

/***/ "EQ3D":
/*!***********************************************************************************************!*\
  !*** ./src/app/permitdesignoverview/permitdeliver-design/permitdeliver-design.component.scss ***!
  \***********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".custom-card {\n  display: flex;\n  flex-direction: column;\n  background: white;\n  border-radius: 4px;\n  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.3);\n  padding: 8px 12px;\n}\n\n.customer-name {\n  font-size: 1em;\n  color: #434343;\n  font-weight: bold;\n  display: table;\n  margin: 0px;\n}\n\n.customer-email {\n  font-size: 0.8em;\n  color: #B4B4B4;\n}\n\n.customer-phone {\n  font-size: 0.8em;\n  color: #4272B9;\n}\n\n.customer-address {\n  margin-top: 16px;\n  margin-bottom: 16px;\n  font-size: 0.8em;\n  color: #4272B9;\n}\n\n.timestamp {\n  font-size: 0.7em;\n}\n\n.chipdetail {\n  display: inline;\n  vertical-align: middle;\n  background-color: #95afc0;\n  font-size: 0.6em;\n  padding: 4px 10px;\n  border-radius: 10px;\n  text-align: center;\n  color: #fff;\n}\n\n.imagebutton {\n  float: right;\n  margin-top: 0px;\n}\n\n.chatbutton {\n  float: right;\n  margin-top: 0px;\n  margin-right: 5px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFxwZXJtaXRkZWxpdmVyLWRlc2lnbi5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGFBQUE7RUFDQSxzQkFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSwwQ0FBQTtFQUNBLGlCQUFBO0FBQ0o7O0FBRUU7RUFDRSxjQUFBO0VBQ0EsY0FBQTtFQUNBLGlCQUFBO0VBQ0EsY0FBQTtFQUNBLFdBQUE7QUFDSjs7QUFFRTtFQUNFLGdCQUFBO0VBQ0EsY0FBQTtBQUNKOztBQUVFO0VBQ0UsZ0JBQUE7RUFDQSxjQUFBO0FBQ0o7O0FBRUU7RUFDRSxnQkFBQTtFQUNBLG1CQUFBO0VBQ0EsZ0JBQUE7RUFDQSxjQUFBO0FBQ0o7O0FBRUU7RUFDRSxnQkFBQTtBQUNKOztBQUVFO0VBQ0UsZUFBQTtFQUNBLHNCQUFBO0VBQ0EseUJBQUE7RUFDQSxnQkFBQTtFQUNBLGlCQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtFQUNBLFdBQUE7QUFDSjs7QUFDQTtFQUNFLFlBQUE7RUFDQSxlQUFBO0FBRUY7O0FBRUE7RUFDRSxZQUFBO0VBQ0EsZUFBQTtFQUNBLGlCQUFBO0FBQ0YiLCJmaWxlIjoicGVybWl0ZGVsaXZlci1kZXNpZ24uY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuY3VzdG9tLWNhcmQge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcclxuICAgIGJvcmRlci1yYWRpdXM6IDRweDtcclxuICAgIGJveC1zaGFkb3c6IDAgMXB4IDJweCAwIHJnYmEoMCwgMCwgMCwgMC4zKTtcclxuICAgIHBhZGRpbmc6IDhweCAxMnB4O1xyXG4gIH1cclxuICBcclxuICAuY3VzdG9tZXItbmFtZSB7XHJcbiAgICBmb250LXNpemU6IDFlbTtcclxuICAgIGNvbG9yOiAjNDM0MzQzO1xyXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgICBkaXNwbGF5OnRhYmxlO1xyXG4gICAgbWFyZ2luOiAwcHg7XHJcbiAgfVxyXG4gIFxyXG4gIC5jdXN0b21lci1lbWFpbCB7XHJcbiAgICBmb250LXNpemU6IDAuOGVtO1xyXG4gICAgY29sb3I6ICNCNEI0QjQ7XHJcbiAgfVxyXG4gIFxyXG4gIC5jdXN0b21lci1waG9uZSB7XHJcbiAgICBmb250LXNpemU6IDAuOGVtO1xyXG4gICAgY29sb3I6ICM0MjcyQjk7XHJcbiAgfVxyXG4gIFxyXG4gIC5jdXN0b21lci1hZGRyZXNzIHtcclxuICAgIG1hcmdpbi10b3A6IDE2cHg7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAxNnB4O1xyXG4gICAgZm9udC1zaXplOiAwLjhlbTtcclxuICAgIGNvbG9yOiAjNDI3MkI5O1xyXG4gIH1cclxuICBcclxuICAudGltZXN0YW1wIHtcclxuICAgIGZvbnQtc2l6ZTogMC43ZW07XHJcbiAgfVxyXG4gIFxyXG4gIC5jaGlwZGV0YWlse1xyXG4gICAgZGlzcGxheTogaW5saW5lO1xyXG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICM5NWFmYzA7XHJcbiAgICBmb250LXNpemU6IDAuNmVtO1xyXG4gICAgcGFkZGluZzogNHB4IDEwcHg7XHJcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgY29sb3I6ICNmZmY7XHJcbn1cclxuLmltYWdlYnV0dG9ue1xyXG4gIGZsb2F0OnJpZ2h0O1xyXG4gIG1hcmdpbi10b3A6IDBweDtcclxuICBcclxuICBcclxufVxyXG4uY2hhdGJ1dHRvbntcclxuICBmbG9hdDpyaWdodDtcclxuICBtYXJnaW4tdG9wOiAwcHg7XHJcbiAgbWFyZ2luLXJpZ2h0OjVweDtcclxufSJdfQ== */");

/***/ }),

/***/ "G593":
/*!*********************************************************************!*\
  !*** ./src/app/permitdesignoverview/permitdesignoverview.module.ts ***!
  \*********************************************************************/
/*! exports provided: PermitdesignoverviewPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PermitdesignoverviewPageModule", function() { return PermitdesignoverviewPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _permitdesignoverview_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./permitdesignoverview-routing.module */ "gC+l");
/* harmony import */ var _permitdesignoverview_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./permitdesignoverview.page */ "KzfF");
/* harmony import */ var _ionic_native_diagnostic_ngx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic-native/diagnostic/ngx */ "mtRb");
/* harmony import */ var _ionic_native_native_geocoder_ngx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic-native/native-geocoder/ngx */ "h+qT");
/* harmony import */ var _ionic_native_launch_navigator_ngx__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic-native/launch-navigator/ngx */ "fGQ8");
/* harmony import */ var _permitdeliver_design_permitdeliver_design_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./permitdeliver-design/permitdeliver-design.component */ "4v3I");
/* harmony import */ var _permitcompleteddesign_permitcompleteddesign_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./permitcompleteddesign/permitcompleteddesign.component */ "Ow9J");
/* harmony import */ var _permitnewdesign_permitnewdesign_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./permitnewdesign/permitnewdesign.component */ "gZsM");
/* harmony import */ var _permit_inreview_design_permit_inreview_design_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./permit-inreview-design/permit-inreview-design.component */ "gt5a");














let PermitdesignoverviewPageModule = class PermitdesignoverviewPageModule {
};
PermitdesignoverviewPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _permitdesignoverview_routing_module__WEBPACK_IMPORTED_MODULE_5__["PermitdesignoverviewPageRoutingModule"]
        ],
        declarations: [_permitdesignoverview_page__WEBPACK_IMPORTED_MODULE_6__["PermitdesignoverviewPage"], _permit_inreview_design_permit_inreview_design_component__WEBPACK_IMPORTED_MODULE_13__["PermitInreviewDesignComponent"], _permitdeliver_design_permitdeliver_design_component__WEBPACK_IMPORTED_MODULE_10__["PermitdeliverDesignComponent"], _permitcompleteddesign_permitcompleteddesign_component__WEBPACK_IMPORTED_MODULE_11__["PermitcompleteddesignComponent"], _permitnewdesign_permitnewdesign_component__WEBPACK_IMPORTED_MODULE_12__["PermitnewdesignComponent"]],
        providers: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["DatePipe"],
            _ionic_native_diagnostic_ngx__WEBPACK_IMPORTED_MODULE_7__["Diagnostic"],
            _ionic_native_native_geocoder_ngx__WEBPACK_IMPORTED_MODULE_8__["NativeGeocoder"],
            _ionic_native_launch_navigator_ngx__WEBPACK_IMPORTED_MODULE_9__["LaunchNavigator"]
        ]
    })
], PermitdesignoverviewPageModule);



/***/ }),

/***/ "KzfF":
/*!*******************************************************************!*\
  !*** ./src/app/permitdesignoverview/permitdesignoverview.page.ts ***!
  \*******************************************************************/
/*! exports provided: PermitdesignoverviewPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PermitdesignoverviewPage", function() { return PermitdesignoverviewPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_permitdesignoverview_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./permitdesignoverview.page.html */ "3SHV");
/* harmony import */ var _permitdesignoverview_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./permitdesignoverview.page.scss */ "fO1t");
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
/* harmony import */ var _contants__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../contants */ "6qqZ");
/* harmony import */ var _appversion__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../appversion */ "E8lG");
















let PermitdesignoverviewPage = class PermitdesignoverviewPage {
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
        this.version = _appversion__WEBPACK_IMPORTED_MODULE_15__["Appversion"].version;
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
        if (this.userData) {
            this.setupCometChatUser();
        }
        this.updateUserPushToken();
        this.route.navigate(['permitdesignoverview/permitnewdesign']);
    }
    ngOnDestroy() {
        this.deactivateNetworkSwitch.unsubscribe();
    }
    setupCometChatUser() {
        let userId = this.storage.getUserID();
        const user = new _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_4__["CometChat"].User(userId);
        user.setName(this.storage.getUser().firstname + ' ' + this.storage.getUser().lastname);
        const appSetting = new _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_4__["CometChat"].AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(_contants__WEBPACK_IMPORTED_MODULE_14__["COMETCHAT_CONSTANTS"].REGION).build();
        _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_4__["CometChat"].init(_contants__WEBPACK_IMPORTED_MODULE_14__["COMETCHAT_CONSTANTS"].APP_ID, appSetting).then(() => {
            console.log('Initialization completed successfully');
            // if(this.utilities.currentUserValue != null){
            // You can now call login function.
            _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_4__["CometChat"].login(userId, _contants__WEBPACK_IMPORTED_MODULE_14__["COMETCHAT_CONSTANTS"].API_KEY).then((user) => {
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
        if (this.version !== this.update_version && this.update_version !== '') {
            setTimeout(() => {
                this.utilities.showAlertBox('Update App', 'New version of app is available on Play Store. Please update now to get latest features and bug fixes.', [{
                        text: 'Ok',
                        handler: () => {
                            this.iab.create('https://play.google.com/store/apps/details?id=com.solar.wattmonk', "_system");
                            this.ionViewDidEnter();
                        }
                    }]);
            }, 2000);
        }
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
PermitdesignoverviewPage.ctorParameters = () => [
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
PermitdesignoverviewPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-permitdesignoverview',
        template: _raw_loader_permitdesignoverview_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_permitdesignoverview_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], PermitdesignoverviewPage);



/***/ }),

/***/ "Ofye":
/*!*****************************************************************!*\
  !*** ./src/app/coupon-offers-modal/coupon-offers-modal.page.ts ***!
  \*****************************************************************/
/*! exports provided: CouponOffersModalPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CouponOffersModalPage", function() { return CouponOffersModalPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_coupon_offers_modal_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./coupon-offers-modal.page.html */ "Z7Sw");
/* harmony import */ var _coupon_offers_modal_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./coupon-offers-modal.page.scss */ "dyyn");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../api.service */ "yTNM");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _utilities_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utilities.service */ "oTnF");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _storage_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../storage.service */ "qkCY");
/* harmony import */ var _utilities_mixpanel_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../utilities/mixpanel.service */ "uKCw");










let CouponOffersModalPage = class CouponOffersModalPage {
    constructor(apiservice, modalctrl, utils, formBuilder, storageService, nav, mixpanelService) {
        this.apiservice = apiservice;
        this.modalctrl = modalctrl;
        this.utils = utils;
        this.formBuilder = formBuilder;
        this.storageService = storageService;
        this.nav = nav;
        this.mixpanelService = mixpanelService;
        this.selecteduserId = null;
        this.couponForm = this.formBuilder.group({
            couponInput: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"]('')
        });
    }
    ngOnInit() {
        this.requesttype = this.nav.get('request');
        this.apiservice.getCoupons(this.requesttype).subscribe((res) => {
            this.Coupons = res;
            console.log(this.Coupons);
        }, (error) => {
        });
        this.user = this.storageService.getUser();
        this.mixpanelService.track("COUPON_OFFER_PAGE_OPEN", {});
    }
    selectCoupon(coupondata) {
        console.log(this.couponForm.get('couponInput').value);
        console.log("this is", coupondata);
        // this.assigneeData.emit(assignee);
        this.Coupons.forEach((item) => {
            item.selected = false;
        });
        if (coupondata.id === this.selecteduserId) {
            this.selecteduserId = null;
            this.selectedCoupon = null;
            this.couponForm.patchValue({
                couponInput: ""
            });
            console.log(this.selectedCoupon);
        }
        else {
            coupondata.selected = true;
            console.log(coupondata);
            this.selectedCoupon = coupondata;
            this.couponForm.patchValue({
                couponInput: coupondata.code
            });
            this.selecteduserId = coupondata.id;
            this.error = null;
            console.log(this.selectedCoupon);
        }
    }
    changeInput() {
        this.error = null;
    }
    applycode() {
        if (this.couponForm.get('couponInput').value != '') {
            this.utils.showLoading("Applying").then(() => {
                const postData = {
                    couponcode: this.couponForm.get('couponInput').value,
                    userid: this.user.parent.id,
                    requesttype: this.requesttype
                };
                this.apiservice.sendCoupon(postData).subscribe((res) => {
                    console.log(res);
                    this.selectedCoupon = res;
                    if (this.selectedCoupon.error) {
                        this.error = this.selectedCoupon.message;
                        this.selectedCoupon = null;
                    }
                    else {
                        this.modalctrl.dismiss({
                            'dismissed': true,
                            data: this.selectedCoupon
                        });
                    }
                }, (error) => { this.utils.errorSnackBar("Invalid Coupon Code"); });
                this.utils.hideLoading();
            });
        }
        else if (this.selectedCoupon != null) {
            this.utils.showLoading("Applying").then(() => {
                this.modalctrl.dismiss({
                    'dismissed': true,
                    data: this.selectedCoupon
                });
                this.utils.hideLoading();
            });
        }
        else {
            this.utils.errorSnackBar("Please select or enter a promo code");
        }
    }
    cancel() {
        this.modalctrl.dismiss({
            'dismissed': true,
            cancel: 'cancel'
        });
    }
};
CouponOffersModalPage.ctorParameters = () => [
    { type: _api_service__WEBPACK_IMPORTED_MODULE_4__["ApiService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["ModalController"] },
    { type: _utilities_service__WEBPACK_IMPORTED_MODULE_6__["UtilitiesService"] },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormBuilder"] },
    { type: _storage_service__WEBPACK_IMPORTED_MODULE_8__["StorageService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["NavParams"] },
    { type: _utilities_mixpanel_service__WEBPACK_IMPORTED_MODULE_9__["MixpanelService"] }
];
CouponOffersModalPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-coupon-offers-modal',
        template: _raw_loader_coupon_offers_modal_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_coupon_offers_modal_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], CouponOffersModalPage);



/***/ }),

/***/ "Ow9J":
/*!***********************************************************************************************!*\
  !*** ./src/app/permitdesignoverview/permitcompleteddesign/permitcompleteddesign.component.ts ***!
  \***********************************************************************************************/
/*! exports provided: PermitcompleteddesignComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PermitcompleteddesignComponent", function() { return PermitcompleteddesignComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_permitcompleteddesign_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./permitcompleteddesign.component.html */ "UL9M");
/* harmony import */ var _permitcompleteddesign_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./permitcompleteddesign.component.scss */ "d04a");
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













let PermitcompleteddesignComponent = class PermitcompleteddesignComponent {
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
        this.userData = this.storageservice.getUser();
        const latestDate = new Date();
        this.today = datePipe.transform(latestDate, 'M/dd/yy');
        console.log('date', this.today);
    }
    ngOnInit() {
        this.designRefreshSubscription = this.utils.getHomepagePermitRefresh().subscribe((result) => {
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
        this.fetchPendingDesigns(event, showLoader);
    }
    fetchPendingDesigns(event, showLoader) {
        this.noDesignsFound = "";
        console.log("inside fetch surveys");
        this.listOfDesignData = [];
        this.listOfDesignDataHelper = [];
        this.utils.showLoadingWithPullRefreshSupport(showLoader, 'Getting Designs').then((success) => {
            this.apiService.getDesignSurveys("requesttype=permit&status=designcompleted", this.limit, this.skip).subscribe((response) => {
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
        this.apiService.getDesignSurveys("requesttype=permit&status=designcompleted", this.limit, this.skip).subscribe((response) => {
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
PermitcompleteddesignComponent.ctorParameters = () => [
    { type: _ionic_native_launch_navigator_ngx__WEBPACK_IMPORTED_MODULE_4__["LaunchNavigator"] },
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_5__["DatePipe"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ChangeDetectorRef"] },
    { type: src_app_utilities_service__WEBPACK_IMPORTED_MODULE_6__["UtilitiesService"] },
    { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_8__["Storage"] },
    { type: src_app_api_service__WEBPACK_IMPORTED_MODULE_7__["ApiService"] },
    { type: src_app_storage_service__WEBPACK_IMPORTED_MODULE_11__["StorageService"] }
];
PermitcompleteddesignComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-permitcompleteddesign',
        template: _raw_loader_permitcompleteddesign_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_permitcompleteddesign_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], PermitcompleteddesignComponent);



/***/ }),

/***/ "UL9M":
/*!***************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/permitdesignoverview/permitcompleteddesign/permitcompleteddesign.component.html ***!
  \***************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-content>\r\n  <ion-refresher slot=\"fixed\" (ionRefresh)=\"getDesigns($event)\">\r\n    <ion-refresher-content pullingIcon=\"arrow-dropdown\" pullingText=\"Pull down to refresh\" refreshingSpinner=\"lines\"></ion-refresher-content>\r\n  </ion-refresher>\r\n  <ion-grid *ngIf=\"listOfDesignDataHelper.length !==0\">\r\n    <ion-row *ngFor=\"let item of listOfDesignDataHelper;let i = index\">\r\n        <!-- <ion-virtual-scroll [items]=\"listOfDesignsHelper\"> -->\r\n            <!-- <ion-row *ngFor=\"let item of listOfDesignsHelper;let i = index\"> -->\r\n                <!-- <ion-row *virtualItem=\"let item;let i = index\"> -->\r\n        <!-- <ion-col size=\"12\" class=\"ion-margin-top\">\r\n                <span class=\"ion-padding\" *ngIf=\"today === item.date\">\r\n                    Today\r\n                  </span>\r\n            <span class=\"ion-padding\" *ngIf=\"today !== item.date\">\r\n                      {{item.date | date: 'dd MMM yyyy'}}\r\n                </span>\r\n        </ion-col> -->\r\n        <ion-col *ngFor=\"let designData of item.listOfDesigns;let i = index ;trackBy: trackdesign\" size=\"12\">\r\n            <div class=\"ion-no-padding custom-card\" style=\"height: 100%;\">\r\n                <p class=\"customer-name\" >{{designData.name}}\r\n                      <!-- <span class=\"chipdetail\" style=\"background-color: #1289A7;\" [routerLink]=\"['/survey-detail/',designData.id]\" routerDirection=\"forward\">\r\n                        {{designData.deliverydate | date: 'hh:mm a'}}\r\n                    </span> -->\r\n                    <span  [routerLink]=\"['/permit-design-details/',designData.id]\"\r\n                    routerDirection=\"forward\" class=\"chipdetail\" style=\"background-color: rgb(109, 187, 26);border-radius: 50%;padding: 4px 5px;\" *ngIf=\"designData.status == 'designcompleted'\"><ion-icon name=\"checkmark-done-outline\" style=\"color: #fff;\"></ion-icon></span>\r\n                    <span [routerLink]=\"['/permit-design-details/',designData.id]\"\r\n                    routerDirection=\"forward\" class=\"chipdetail\" style=\"background-color: rgb(246, 104, 10);\" *ngIf=\"designData.isoverdue\">Overdue</span>\r\n                    <span class=\"chipdetail\" style=\"background-color: rgb(183,21,64)\" *ngIf=\"designData.isinrevisionstate\"   [routerLink]=\"['/permit-design-details/',designData.id]\">Revision</span>\r\n                    <span class=\"chipdetail ml-1 ml-1\" style=\"background-color: #FA983A;\"\r\n                    *ngIf=\"designData.isoutsourced == 'true'\">Wattmonk</span>\r\n                    <span fill=\"clear\" background-border=\"clear\" [routerLink]=\"['/','activity',designData.id,'design']\" class=\"imagebutton\"  size=\"small\"  ><ion-icon  src=\"/assets/images/activitylist.svg\" ></ion-icon></span>\r\n                    <ng-container *ngIf=\"designData?.chatid!==null && designData?.addedtogroupchat\">\r\n                        <span fill=\"clear\" background-border=\"clear\" [routerLink]=\"['/','chat',designData.chatid]\" class=\"chatbutton\"  size=\"small\"  ><img  style= \"height:20px\" src=\"assets/images/chat.svg\" /></span>\r\n                      </ng-container>\r\n                </p>\r\n                <p style=\"margin:0px\"><span class=\"customer-email\"  [routerLink]=\"['/permit-design-details/',designData.id]\" *ngIf=\"userData.designertype!='external'\"\r\n                      routerDirection=\"forward\">{{designData.email}}</span>\r\n                      <span *ngIf=\"designData.isoverdue\" class=\"latebystyle\" style=\"float: right;font-size: 10px;\"><strong>Late by {{item.lateby}}</strong></span>\r\n\r\n            </p>\r\n                <a href=\"tel:{{designData.phonenumber}}\" style=\"text-decoration: none;\" class=\"z-100\">\r\n                    <span class=\"customer-phone\" *ngIf=\"userData.designertype!='external'\">{{designData.phonenumber}}</span></a>\r\n                <span style=\"margin:0px\" class=\"customer-address z-100\" *ngIf=\"userData.designertype!='external'\"\r\n                      (click)=\"openAddressOnMap(designData.address)\">{{(designData.address | slice:0:50) + (designData.address.length > 50 ? '...' : '')}}</span>\r\n\r\n                <ion-row style=\"margin-bottom: 8px;\"  [routerLink]=\"['/permit-design-details/',designData.id]\" >\r\n                    <!-- <span class=\"chipdetail\" style=\"background-color: #95afc0;\" >Wattmonk</span> -->\r\n                    <span class=\"chipdetail\" style=\"background-color: #95afc0;align-self: center;\" >{{designData.source}}</span>\r\n                    <span class=\"chipdetail\" style=\"background-color: #95afc0;align-self: center;\" >{{designData?.jobtype=='pvbattery' ? 'PV + Battery' : designData?.jobtype}}</span>\r\n                </ion-row>\r\n                <ion-progress-bar [value]=\"1\" mode=\"ios\" color=\"success\" class=\"progress-bar-height\"></ion-progress-bar>\r\n            </div>\r\n        </ion-col>\r\n    </ion-row>\r\n    <!-- </ion-virtual-scroll> -->\r\n    <!-- <ion-row>\r\n        <ion-col size=\"12\" style=\"height: 100px;\">\r\n        </ion-col>\r\n    </ion-row> -->\r\n</ion-grid>\r\n\r\n<div *ngIf=\"listOfDesignDataHelper.length===0\" class=\"h-100 d-flex flex-column align-center justify-center\">\r\n    {{noDesignsFound}}\r\n    <ion-img src=\"/assets/images/blank.png\" class=\"placeholder\"></ion-img>\r\n</div>\r\n<ion-infinite-scroll (ionInfinite)=\"doInfinite($event)\">\r\n    <ion-infinite-scroll-content\r\n      loadingSpinner=\"bubbles\"\r\n     >\r\n    </ion-infinite-scroll-content>\r\n  </ion-infinite-scroll>\r\n</ion-content>\r\n");

/***/ }),

/***/ "Vu9q":
/*!*****************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/permitdesignoverview/permit-inreview-design/permit-inreview-design.component.html ***!
  \*****************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-content>\r\n  <ion-refresher slot=\"fixed\" (ionRefresh)=\"getDesigns($event)\">\r\n    <ion-refresher-content pullingIcon=\"arrow-dropdown\" pullingText=\"Pull down to refresh\" refreshingSpinner=\"lines\"></ion-refresher-content>\r\n  </ion-refresher>\r\n  <ion-grid *ngIf=\"listOfDesignsHelper.length !== 0\">\r\n    <ion-row *ngFor=\"let item of listOfDesignsHelper;let i = index\">\r\n        <!-- <ion-virtual-scroll [items]=\"listOfDesignsHelper\"> -->\r\n            <!-- <ion-row *ngFor=\"let item of listOfDesignsHelper;let i = index\"> -->\r\n                <!-- <ion-row *virtualItem=\"let item;let i = index\"> -->\r\n        <!-- <ion-col size=\"12\" class=\"ion-margin-top\">\r\n                <span class=\"ion-padding\" *ngIf=\"today === item.date\">\r\n                    Today\r\n                  </span>\r\n            <span class=\"ion-padding\" *ngIf=\"today !== item.date\">\r\n                      {{item.date | date: 'dd MMM yyyy'}}\r\n                </span>\r\n        </ion-col> -->\r\n        <ion-col *ngFor=\"let designData of item.listOfDesigns;let i = index;trackBy: trackdesign \" size=\"12\">\r\n            <div class=\"ion-no-padding custom-card\" style=\"height: 100%;\">\r\n                <p class=\"customer-name\" >{{designData.name}}\r\n                      <!-- <span class=\"chipdetail\" style=\"background-color: #1289A7;\" [routerLink]=\"['/design-details/',designData.id]\" routerDirection=\"forward\">\r\n                        {{designData.deliverydate | date: 'hh:mm a'}}\r\n                    </span> -->\r\n                    <span  [routerLink]=\"['/permit-design-details/',designData.id]\"\r\n                    routerDirection=\"forward\" class=\"chipdetail\" style=\"background-color: #1289A7;\" *ngIf=\"designData.status == 'reviewassigned'\">In Review</span>\r\n\r\n                    <span [routerLink]=\"['/permit-design-details/',designData.id]\"\r\n                    routerDirection=\"forward\" class=\"chipdetail\" style=\"background-color: rgb(246, 104, 10);\" *ngIf=\"designData.isoverdue\">Overdue</span>\r\n                    <span  [routerLink]=\"['/permit-design-details/',designData.id]\" routerDirection=\"forward\" class=\"chipdetail\" style=\"background-color: rgb(246, 77, 10);\" *ngIf=\"designData.status == 'reviewfailed'\">Review Failed</span>\r\n                    <span  [routerLink]=\"['/permit-design-details/',designData.id]\" routerDirection=\"forward\" class=\"chipdetail\" style=\"background-color: rgb(109, 187, 26);\" *ngIf=\"designData.status == 'reviewpassed'\"> Review Passed</span>\r\n                    <span class=\"chipdetail\" style=\"background-color: rgb(183,21,64)\" *ngIf=\"designData.isinrevisionstate\"  [routerLink]=\"['/design-details/',designData.id]\">Revision</span>\r\n                    <span class=\"chipdetail ml-1 ml-1\" style=\"background-color: #FA983A;\"\r\n                    *ngIf=\"designData.isoutsourced == 'true'\">Wattmonk</span>\r\n                    <span fill=\"clear\" background-border=\"clear\" [routerLink]=\"['/','activity',designData.id,'design']\" class=\"imagebutton\"  size=\"small\"  ><ion-icon  src=\"/assets/images/activitylist.svg\" ></ion-icon></span>\r\n                    <ng-container *ngIf=\"designData?.chatid!==null && designData?.addedtogroupchat\">\r\n                        <span fill=\"clear\" background-border=\"clear\" [routerLink]=\"['/','chat',designData.chatid]\" class=\"chatbutton\"  size=\"small\"  ><img  style= \"height:20px\" src=\"assets/images/chat.svg\" /></span>\r\n                      </ng-container>\r\n                </p>\r\n               <p style=\"margin: 0px;\"> <span class=\"customer-email\"  [routerLink]=\"['/permit-design-details/',designData.id]\"\r\n                      routerDirection=\"forward\"  *ngIf=\"userData.designertype!='external'\">{{designData.email}}</span>\r\n                      <span *ngIf=\"designData.isoverdue\" class=\"latebystyle\" style=\"float: right;font-size: 10px;\"><strong>Late by {{item.lateby}}</strong></span>\r\n\r\n            </p>\r\n\r\n                       <a href=\"tel:{{designData.phonenumber}}\" style=\"text-decoration: none;\" class=\"z-100\">\r\n                    <span class=\"customer-phone\" *ngIf=\"userData.designertype!='external'\">{{designData.phonenumber}}</span></a>\r\n                <span style=\"margin:0px\" class=\"customer-address z-100\" *ngIf=\"userData.designertype!='external'\"\r\n                      (click)=\"openAddressOnMap(designData.address)\">{{(designData.address | slice:0:50) + (designData.address.length > 50 ? '...' : '')}}</span>\r\n\r\n                <ion-row style=\"margin-bottom: 8px;\" [routerLink]=\"['/design-details/',designData.id]\" >\r\n                    <!-- <span class=\"chipdetail\" style=\"background-color: #95afc0;\" >Wattmonk</span> -->\r\n                    <span class=\"chipdetail\" style=\"background-color: #95afc0;align-self: center;\" >{{designData.source}}</span>\r\n                    <span class=\"chipdetail\" style=\"background-color: #95afc0;align-self: center;\" >{{designData?.jobtype=='pvbattery' ? 'PV + Battery' : designData?.jobtype}}</span>\r\n\r\n                </ion-row>\r\n                <ion-row class=\"ion-no-margin ion-no-margin\" *ngIf=\"designData.status == 'reviewfailed'\">\r\n                    <ion-col></ion-col>\r\n                    <!-- <ion-col class=\"ion-no-margin ion-no-padding\">\r\n                        <ion-button class=\"ion-no-margin ion-no-padding\" fill=\"clear\" [routerLink]=\"['/surveyprocess/' + designData.id + '/' + designData.jobtype + '/' + designData.latitude + '/' + designData.longitude]\"\r\n                        routerDirection=\"forward\">\r\n                            Restart Survey\r\n                        </ion-button>\r\n                    </ion-col> -->\r\n                </ion-row>\r\n                <ion-progress-bar [value]=\"1\" mode=\"ios\" color=\"success\" class=\"progress-bar-height\"></ion-progress-bar>\r\n            </div>\r\n        </ion-col>\r\n    </ion-row>\r\n    <!-- </ion-virtual-scroll>\r\n    <ion-row>\r\n        <ion-col size=\"12\" style=\"height: 100px;\">\r\n        </ion-col>\r\n    </ion-row> -->\r\n</ion-grid>\r\n\r\n<div *ngIf=\"listOfDesignsHelper.length === 0\" class=\"h-100 d-flex flex-column align-center justify-center\">\r\n        {{noDesignsFound}}\r\n    <ion-img src=\"/assets/images/blank.png\" class=\"placeholder\"></ion-img>\r\n</div>\r\n\r\n<ion-infinite-scroll (ionInfinite)=\"doInfinite($event)\">\r\n    <ion-infinite-scroll-content\r\n      loadingSpinner=\"bubbles\"\r\n      >\r\n    </ion-infinite-scroll-content>\r\n  </ion-infinite-scroll>\r\n</ion-content>\r\n");

/***/ }),

/***/ "XnSu":
/*!*****************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/email-model/email-model.page.html ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\r\n  <h4 style=\"font-weight: bold;margin-bottom:0px !important;padding: 10px;\">Select the Emails</h4>\r\n  \r\n  <ion-content>\r\n    <ion-list>\r\n     <ion-item>\r\n       <ion-label>\r\n       <input type=\"checkbox\" name=\"selectall\" [value]=\"TeamData\" (change)=\"selectAll($event)\" style=\"height: 17px;width: 28px;\">\r\n       Select All</ion-label>\r\n     </ion-item>\r\n     <ion-list>\r\n     <ion-item\r\n      *ngFor=\"let item of example; let i = index \">\r\n         <!-- <input type=\"checkbox\" [(ngModel)]=\"item.Checked\">&nbsp;  -->\r\n         <p class=\"listitem\">{{item?.firstname}}</p>\r\n         <p class=\"listitem\">{{item?.lastname}}</p>\r\n         <p class=\"listitem\">({{item?.email}})</p>\r\n         <ion-checkbox slot=\"start\" [(ngModel)]=\"item.Checked\" (ionChange)=\"checkedMails($event)\"></ion-checkbox>\r\n         \r\n     \r\n     </ion-item>\r\n     </ion-list>\r\n   </ion-list>\r\n   <ion-grid>\r\n         <ion-row>\r\n           <ion-col>\r\n             <h6 style=\"margin-top:0px;padding: 2px;\"></h6>\r\n             <textarea id=\"inputemails\" placeholder=\"eg : john@gmail.com\" type=\"emails\" multiple style=\"width: 100%;\" [(ngModel)]='emails'></textarea>\r\n           </ion-col>\r\n         </ion-row>\r\n        <!-- <ion-row>\r\n           <ion-col>\r\n             <h6 style=\"margin:0px 0 0px 0;\">Attachment</h6>\r\n           \r\n               <ion-input type=\"text\" placeholder=\"Select Attachment\" [(ngModel)]=\"filename\" readonly (click)=\"selectAttachment()\" style=\"border-bottom:1px solid grey\"  > <ion-icon name=\"attach-outline\" style=\"float: right;text-align:right ;\"></ion-icon></ion-input>\r\n              \r\n            <small *ngIf=\"exceedfileSize > 0\" style=\"color:red\">File size should not be greater than 25MB.</small>\r\n           </ion-col>\r\n         </ion-row>-->\r\n       </ion-grid>\r\n  </ion-content>\r\n    <footer style=\"text-align: right;margin:12px;\">\r\n      <ion-button fill=\"clear\" (click)=\"cancel()\">Cancel</ion-button>\r\n      <ion-button fill=\"clear\" (click)=\"SendMail()\" [disabled]='emails ==\"\" && !checkedEmailIds'>Send</ion-button>\r\n    </footer>\r\n  <!-- <div class=_padding>\r\n    <p>Decline the design Request</p>\r\n    <textarea placeholder=\"Reason*\" style=\"width: 100%;\"></textarea>\r\n  </div> -->\r\n\r\n");

/***/ }),

/***/ "Z7Sw":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/coupon-offers-modal/coupon-offers-modal.page.html ***!
  \*********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\r\n\r\n\r\n  \r\n  <ion-row><ion-col size=\"0\"> </ion-col>\r\n    <ion-col size=\"9\" style=\"align-self: center; font-size: larger;font-weight: bolder;\"> Apply Coupon</ion-col>\r\n    <ion-col><ion-button fill=\"clear\" size=\"small\" class=\"ion-no-padding\" style=\"float:right\" (click)=\"cancel()\">\r\n      <ion-icon name=\"close-outline\" style=\"color: dimgrey;\" size=\"large\"></ion-icon>\r\n  </ion-button></ion-col>\r\n  \r\n  </ion-row>\r\n  \r\n  <div style=\"height:17%;width: 100%;background-color:gainsboro;align-self: center;\"><br>\r\n    <form [formGroup]=\"couponForm\">\r\n<ion-row><ion-col size='12' style=\"padding-bottom: 4px;\" class=\"ion-padding\"><ion-input type=\"text\" class=\"input_class\" autocapitalize=\"words\"\r\n  style=\"font-size: small;\" placeholder=\"Have a promocode?Enter here\" formControlName=\"couponInput\" maxlength=\"15\"  (ionChange)=\"changeInput()\"></ion-input>\r\n</ion-col></ion-row>\r\n<ion-row *ngIf=\"error!==null\" style=\"margin-left: 19px;\"><span class=\"error\">{{error}}</span></ion-row></form></div>\r\n\r\n\r\n<ion-row style=\"margin-top: 10px;margin-left:5%\">\r\n<span style=\"text-align: center; font-size: initial;font-weight: bold;\">AVAILABLE COUPONS</span>\r\n</ion-row>\r\n<ion-content [scrollEvents]=\"true\">\r\n<div *ngFor=\"let coupon of Coupons\" (click)=\"selectCoupon(coupon)\" style=\"padding: 2px;\" >\r\n<ion-card   [class.selected]=\"coupon.selected\" [class.normal]=\"!coupon.selected \" ><ion-row style=\"margin-top: 5px;\"><ion-col size=\"8\">\r\n  <span style=\"font-weight: bold;font-size: revert; margin-left: 10px;color: black;\">{{coupon.title}}</span></ion-col>\r\n <ion-col><span style=\"font-weight: bold;float:right;background-color: green;color: white;height:100%;width:100%;text-align: center;\">{{coupon.code}}</span> </ion-col>\r\n</ion-row>\r\n  <ion-row> <span style=\"margin-left: 10px;margin-top: 7px;margin-bottom: 5px;\">{{coupon.description}}</span></ion-row>\r\n</ion-card>\r\n</div>\r\n\r\n</ion-content>\r\n<ion-footer class=\"ion-padding ion-no-border\" ><ion-button  expand=\"full\" shape=\"block\" (click)=\"applycode()\">Apply</ion-button></ion-footer>");

/***/ }),

/***/ "d04a":
/*!*************************************************************************************************!*\
  !*** ./src/app/permitdesignoverview/permitcompleteddesign/permitcompleteddesign.component.scss ***!
  \*************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".custom-card {\n  display: flex;\n  flex-direction: column;\n  background: white;\n  border-radius: 4px;\n  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.3);\n  padding: 8px 12px;\n}\n\n.customer-name {\n  font-size: 1em;\n  color: #434343;\n  font-weight: bold;\n  display: table;\n  margin: 0px;\n}\n\n.customer-email {\n  font-size: 0.8em;\n  color: #B4B4B4;\n}\n\n.customer-phone {\n  font-size: 0.8em;\n  color: #4272B9;\n}\n\n.customer-address {\n  margin-top: 16px;\n  margin-bottom: 16px;\n  font-size: 0.8em;\n  color: #4272B9;\n}\n\n.timestamp {\n  font-size: 0.7em;\n}\n\n.chipdetail {\n  display: inline;\n  vertical-align: middle;\n  background-color: #95afc0;\n  font-size: 0.6em;\n  padding: 4px 10px;\n  border-radius: 10px;\n  text-align: center;\n  color: #fff;\n}\n\n.imagebutton {\n  float: right;\n  margin-top: 0px;\n}\n\n.chatbutton {\n  float: right;\n  margin-top: 0px;\n  margin-right: 5px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFxwZXJtaXRjb21wbGV0ZWRkZXNpZ24uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0VBQ0EsMENBQUE7RUFDQSxpQkFBQTtBQUNKOztBQUVFO0VBQ0UsY0FBQTtFQUNBLGNBQUE7RUFDQSxpQkFBQTtFQUNBLGNBQUE7RUFDQSxXQUFBO0FBQ0o7O0FBRUU7RUFDRSxnQkFBQTtFQUNBLGNBQUE7QUFDSjs7QUFFRTtFQUNFLGdCQUFBO0VBQ0EsY0FBQTtBQUNKOztBQUVFO0VBQ0UsZ0JBQUE7RUFDQSxtQkFBQTtFQUNBLGdCQUFBO0VBQ0EsY0FBQTtBQUNKOztBQUVFO0VBQ0UsZ0JBQUE7QUFDSjs7QUFFRTtFQUNFLGVBQUE7RUFDQSxzQkFBQTtFQUNBLHlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxpQkFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxXQUFBO0FBQ0o7O0FBQ0E7RUFDRSxZQUFBO0VBQ0EsZUFBQTtBQUVGOztBQUVBO0VBQ0UsWUFBQTtFQUNBLGVBQUE7RUFDQSxpQkFBQTtBQUNGIiwiZmlsZSI6InBlcm1pdGNvbXBsZXRlZGRlc2lnbi5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jdXN0b20tY2FyZCB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIGJhY2tncm91bmQ6IHdoaXRlO1xyXG4gICAgYm9yZGVyLXJhZGl1czogNHB4O1xyXG4gICAgYm94LXNoYWRvdzogMCAxcHggMnB4IDAgcmdiYSgwLCAwLCAwLCAwLjMpO1xyXG4gICAgcGFkZGluZzogOHB4IDEycHg7XHJcbiAgfVxyXG4gIFxyXG4gIC5jdXN0b21lci1uYW1lIHtcclxuICAgIGZvbnQtc2l6ZTogMWVtO1xyXG4gICAgY29sb3I6ICM0MzQzNDM7XHJcbiAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgIGRpc3BsYXk6dGFibGU7XHJcbiAgICBtYXJnaW46IDBweDtcclxuICB9XHJcbiAgXHJcbiAgLmN1c3RvbWVyLWVtYWlsIHtcclxuICAgIGZvbnQtc2l6ZTogMC44ZW07XHJcbiAgICBjb2xvcjogI0I0QjRCNDtcclxuICB9XHJcbiAgXHJcbiAgLmN1c3RvbWVyLXBob25lIHtcclxuICAgIGZvbnQtc2l6ZTogMC44ZW07XHJcbiAgICBjb2xvcjogIzQyNzJCOTtcclxuICB9XHJcbiAgXHJcbiAgLmN1c3RvbWVyLWFkZHJlc3Mge1xyXG4gICAgbWFyZ2luLXRvcDogMTZweDtcclxuICAgIG1hcmdpbi1ib3R0b206IDE2cHg7XHJcbiAgICBmb250LXNpemU6IDAuOGVtO1xyXG4gICAgY29sb3I6ICM0MjcyQjk7XHJcbiAgfVxyXG4gIFxyXG4gIC50aW1lc3RhbXAge1xyXG4gICAgZm9udC1zaXplOiAwLjdlbTtcclxuICB9XHJcbiAgXHJcbiAgLmNoaXBkZXRhaWx7XHJcbiAgICBkaXNwbGF5OiBpbmxpbmU7XHJcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzk1YWZjMDtcclxuICAgIGZvbnQtc2l6ZTogMC42ZW07XHJcbiAgICBwYWRkaW5nOiA0cHggMTBweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBjb2xvcjogI2ZmZjtcclxufVxyXG4uaW1hZ2VidXR0b257XHJcbiAgZmxvYXQ6cmlnaHQ7XHJcbiAgbWFyZ2luLXRvcDogMHB4O1xyXG4gIFxyXG4gIFxyXG59XHJcbi5jaGF0YnV0dG9ue1xyXG4gIGZsb2F0OnJpZ2h0O1xyXG4gIG1hcmdpbi10b3A6IDBweDtcclxuICBtYXJnaW4tcmlnaHQ6NXB4O1xyXG59XHJcblxyXG4iXX0= */");

/***/ }),

/***/ "dyyn":
/*!*******************************************************************!*\
  !*** ./src/app/coupon-offers-modal/coupon-offers-modal.page.scss ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".clickEnableCls {\n  pointer-events: visible !important;\n}\n\n.input_class {\n  background-color: white;\n  font-size: initial;\n  border-width: 2px 4px;\n  align-self: center;\n}\n\n.selected {\n  border: dotted;\n  border-color: limegreen;\n  background: aliceblue;\n}\n\n.normal {\n  border: dotted;\n  border-color: lightgrey;\n}\n\n.error {\n  color: #df3e3e;\n  font-size: 14px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXGNvdXBvbi1vZmZlcnMtbW9kYWwucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksa0NBQUE7QUFDSjs7QUFDQztFQUNHLHVCQUFBO0VBQ0Esa0JBQUE7RUFDQSxxQkFBQTtFQUVGLGtCQUFBO0FBQ0Y7O0FBR0M7RUFDRyxjQUFBO0VBQ0EsdUJBQUE7RUFDQSxxQkFBQTtBQUFKOztBQUdFO0VBQ0UsY0FBQTtFQUNBLHVCQUFBO0FBQUo7O0FBRUU7RUFDRSxjQUFBO0VBQ0EsZUFBQTtBQUNKIiwiZmlsZSI6ImNvdXBvbi1vZmZlcnMtbW9kYWwucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNsaWNrRW5hYmxlQ2xze1xyXG4gICAgcG9pbnRlci1ldmVudHM6IHZpc2libGUgIWltcG9ydGFudDtcclxuIH1cclxuIC5pbnB1dF9jbGFzc3tcclxuICAgIGJhY2tncm91bmQtY29sb3I6d2hpdGU7XHJcbiAgICBmb250LXNpemU6aW5pdGlhbDtcclxuICAgIGJvcmRlci13aWR0aDogMnB4IDRweDtcclxuICAvLyBib3JkZXItcmFkaXVzOiAxNXB4O1xyXG4gIGFsaWduLXNlbGY6IGNlbnRlcjtcclxuIH1cclxuXHJcblxyXG4gLnNlbGVjdGVkIHtcclxuICAgIGJvcmRlcjogZG90dGVkO1xyXG4gICAgYm9yZGVyLWNvbG9yOmxpbWVncmVlbjtcclxuICAgIGJhY2tncm91bmQ6IGFsaWNlYmx1ZTtcclxuICB9XHJcbiAgXHJcbiAgLm5vcm1hbCB7XHJcbiAgICBib3JkZXI6IGRvdHRlZDtcclxuICAgIGJvcmRlci1jb2xvcjogbGlnaHRncmV5O1xyXG4gIH1cclxuICAuZXJyb3Ige1xyXG4gICAgY29sb3I6IHJnYigyMjMsIDYyLCA2Mik7XHJcbiAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgfSJdfQ== */");

/***/ }),

/***/ "fO1t":
/*!*********************************************************************!*\
  !*** ./src/app/permitdesignoverview/permitdesignoverview.page.scss ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".bottom-bar {\n  margin: 8px;\n  border-radius: 50px;\n  box-shadow: 0 -2px 8px 0 rgba(0, 0, 0, 0.1);\n  border: 2px solid white;\n  background: #FFFAEB;\n}\n\n.tab {\n  padding-top: 1em;\n  padding-bottom: 1em;\n  padding-bottom: 1em;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.tabText {\n  margin-left: 8px;\n  font-size: 1em;\n}\n\n.tab-icon {\n  width: 24px;\n  height: 24px;\n}\n\nion-tab-button {\n  font-size: 14px;\n  --color: #9E9E9E;\n  --color-selected: #3c78d8;\n}\n\nion-tab-button[aria-selected=true] {\n  border-bottom: 3px solid #3c78d8;\n  border-bottom-left-radius: 2px;\n  border-bottom-right-radius: 2px;\n}\n\n.custombadge {\n  background-color: #3c78d8;\n  color: #ffffff;\n  border-radius: 50%;\n  width: 16px;\n  height: 16px;\n  font-size: 8px;\n  padding: 4px;\n  position: absolute;\n  margin-left: 4px;\n}\n\n.font {\n  font-size: 10px;\n}\n\n.notification-icon {\n  width: 24px;\n  height: 24px;\n}\n\n.home {\n  font-size: 22px;\n  margin-left: 6px;\n}\n\n.notification-badge {\n  font-size: 10px;\n  margin-left: -15px;\n  margin-top: -20px;\n}\n\n.notification-padding {\n  position: relative;\n  padding: 8px;\n}\n\n.badge {\n  width: 20px;\n  height: 20px;\n  position: absolute;\n  top: 0;\n  right: 0;\n  background: #3c78d8;\n  color: white;\n  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.5);\n  border-radius: 50%;\n  font-size: 0.6em;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: 1px solid white;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXHBlcm1pdGRlc2lnbm92ZXJ2aWV3LnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLFdBQUE7RUFDQSxtQkFBQTtFQUNBLDJDQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtBQUNKOztBQUVBO0VBQ0ksZ0JBQUE7RUFDQSxtQkFBQTtFQUNBLG1CQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7QUFDSjs7QUFFQTtFQUNJLGdCQUFBO0VBQ0EsY0FBQTtBQUNKOztBQUVBO0VBQ0ksV0FBQTtFQUNBLFlBQUE7QUFDSjs7QUFFQTtFQUNJLGVBQUE7RUFDQSxnQkFBQTtFQUNBLHlCQUFBO0FBQ0o7O0FBRUE7RUFDSSxnQ0FBQTtFQUNBLDhCQUFBO0VBQ0EsK0JBQUE7QUFDSjs7QUFFQTtFQUNJLHlCQUFBO0VBQ0EsY0FBQTtFQUNBLGtCQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxjQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7QUFDSjs7QUFFQTtFQUNJLGVBQUE7QUFDSjs7QUFFQTtFQUNJLFdBQUE7RUFDQSxZQUFBO0FBQ0o7O0FBRUE7RUFDSSxlQUFBO0VBQ0EsZ0JBQUE7QUFDSjs7QUFFQTtFQUNJLGVBQUE7RUFDQSxrQkFBQTtFQUNBLGlCQUFBO0FBQ0o7O0FBRUE7RUFDSSxrQkFBQTtFQUNBLFlBQUE7QUFDSjs7QUFFQTtFQUNJLFdBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxNQUFBO0VBQ0EsUUFBQTtFQUNBLG1CQUFBO0VBQ0EsWUFBQTtFQUNBLDBDQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsdUJBQUE7QUFDSiIsImZpbGUiOiJwZXJtaXRkZXNpZ25vdmVydmlldy5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuYm90dG9tLWJhciB7XHJcbiAgICBtYXJnaW46IDhweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDUwcHg7XHJcbiAgICBib3gtc2hhZG93OiAwIC0ycHggOHB4IDAgcmdiYSgwLCAwLCAwLCAwLjEpO1xyXG4gICAgYm9yZGVyOiAycHggc29saWQgd2hpdGU7XHJcbiAgICBiYWNrZ3JvdW5kOiAjRkZGQUVCO1xyXG59XHJcblxyXG4udGFiIHtcclxuICAgIHBhZGRpbmctdG9wOiAxZW07XHJcbiAgICBwYWRkaW5nLWJvdHRvbTogMWVtO1xyXG4gICAgcGFkZGluZy1ib3R0b206IDFlbTtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbn1cclxuXHJcbi50YWJUZXh0IHtcclxuICAgIG1hcmdpbi1sZWZ0OiA4cHg7XHJcbiAgICBmb250LXNpemU6IDFlbTtcclxufVxyXG5cclxuLnRhYi1pY29uIHtcclxuICAgIHdpZHRoOiAyNHB4O1xyXG4gICAgaGVpZ2h0OiAyNHB4O1xyXG59XHJcblxyXG5pb24tdGFiLWJ1dHRvbiB7XHJcbiAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgICAtLWNvbG9yOiAjOUU5RTlFO1xyXG4gICAgLS1jb2xvci1zZWxlY3RlZDogIzNjNzhkODtcclxufVxyXG5cclxuaW9uLXRhYi1idXR0b25bYXJpYS1zZWxlY3RlZD10cnVlXSB7XHJcbiAgICBib3JkZXItYm90dG9tOiAzcHggc29saWQgIzNjNzhkODtcclxuICAgIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDJweDtcclxuICAgIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAycHg7XHJcbn1cclxuXHJcbi5jdXN0b21iYWRnZXtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICMzYzc4ZDg7XHJcbiAgICBjb2xvcjogI2ZmZmZmZjtcclxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICAgIHdpZHRoOiAxNnB4O1xyXG4gICAgaGVpZ2h0OiAxNnB4O1xyXG4gICAgZm9udC1zaXplOiA4cHg7XHJcbiAgICBwYWRkaW5nOiA0cHg7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICBtYXJnaW4tbGVmdDogNHB4O1xyXG59XHJcblxyXG4uZm9udHtcclxuICAgIGZvbnQtc2l6ZTogMTBweDtcclxufVxyXG5cclxuLm5vdGlmaWNhdGlvbi1pY29uIHtcclxuICAgIHdpZHRoOiAyNHB4O1xyXG4gICAgaGVpZ2h0OiAyNHB4O1xyXG59XHJcblxyXG4uaG9tZXtcclxuICAgIGZvbnQtc2l6ZTogMjJweDtcclxuICAgIG1hcmdpbi1sZWZ0OiA2cHg7XHJcbn1cclxuXHJcbi5ub3RpZmljYXRpb24tYmFkZ2Uge1xyXG4gICAgZm9udC1zaXplOiAxMHB4O1xyXG4gICAgbWFyZ2luLWxlZnQ6IC0xNXB4O1xyXG4gICAgbWFyZ2luLXRvcDogLTIwcHg7XHJcbn1cclxuXHJcbi5ub3RpZmljYXRpb24tcGFkZGluZyB7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICBwYWRkaW5nOiA4cHg7XHJcbn1cclxuXHJcbi5iYWRnZSB7XHJcbiAgICB3aWR0aDogMjBweDtcclxuICAgIGhlaWdodDogMjBweDtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHRvcDogMDtcclxuICAgIHJpZ2h0OiAwO1xyXG4gICAgYmFja2dyb3VuZDogIzNjNzhkODtcclxuICAgIGNvbG9yOiB3aGl0ZTtcclxuICAgIGJveC1zaGFkb3c6IDAgMXB4IDNweCAwIHJnYmEoMCwgMCwgMCwgMC41KTtcclxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICAgIGZvbnQtc2l6ZTogMC42ZW07XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgd2hpdGU7XHJcbiAgfVxyXG4iXX0= */");

/***/ }),

/***/ "gC+l":
/*!*****************************************************************************!*\
  !*** ./src/app/permitdesignoverview/permitdesignoverview-routing.module.ts ***!
  \*****************************************************************************/
/*! exports provided: PermitdesignoverviewPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PermitdesignoverviewPageRoutingModule", function() { return PermitdesignoverviewPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _permit_inreview_design_permit_inreview_design_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./permit-inreview-design/permit-inreview-design.component */ "gt5a");
/* harmony import */ var _permitcompleteddesign_permitcompleteddesign_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./permitcompleteddesign/permitcompleteddesign.component */ "Ow9J");
/* harmony import */ var _permitdeliver_design_permitdeliver_design_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./permitdeliver-design/permitdeliver-design.component */ "4v3I");
/* harmony import */ var _permitdesignoverview_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./permitdesignoverview.page */ "KzfF");
/* harmony import */ var _permitnewdesign_permitnewdesign_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./permitnewdesign/permitnewdesign.component */ "gZsM");








const routes = [
    {
        path: '',
        component: _permitdesignoverview_page__WEBPACK_IMPORTED_MODULE_6__["PermitdesignoverviewPage"],
        children: [
            {
                path: 'permitnewdesign',
                component: _permitnewdesign_permitnewdesign_component__WEBPACK_IMPORTED_MODULE_7__["PermitnewdesignComponent"]
            },
            {
                path: 'permitcompleted',
                component: _permitcompleteddesign_permitcompleteddesign_component__WEBPACK_IMPORTED_MODULE_4__["PermitcompleteddesignComponent"]
            },
            {
                path: 'permitdelivered',
                component: _permitdeliver_design_permitdeliver_design_component__WEBPACK_IMPORTED_MODULE_5__["PermitdeliverDesignComponent"]
            },
            {
                path: 'permitInreview',
                component: _permit_inreview_design_permit_inreview_design_component__WEBPACK_IMPORTED_MODULE_3__["PermitInreviewDesignComponent"]
            }
        ]
    }
];
let PermitdesignoverviewPageRoutingModule = class PermitdesignoverviewPageRoutingModule {
};
PermitdesignoverviewPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], PermitdesignoverviewPageRoutingModule);



/***/ }),

/***/ "gZsM":
/*!***********************************************************************************!*\
  !*** ./src/app/permitdesignoverview/permitnewdesign/permitnewdesign.component.ts ***!
  \***********************************************************************************/
/*! exports provided: PermitnewdesignComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PermitnewdesignComponent", function() { return PermitnewdesignComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_permitnewdesign_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./permitnewdesign.component.html */ "l1jB");
/* harmony import */ var _permitnewdesign_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./permitnewdesign.component.scss */ "B+52");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_homepage_design_design_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/homepage/design/design.component */ "4JZt");
/* harmony import */ var _ionic_native_launch_navigator_ngx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic-native/launch-navigator/ngx */ "fGQ8");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var src_app_utilities_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/utilities.service */ "oTnF");
/* harmony import */ var src_app_api_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/api.service */ "yTNM");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic/storage */ "e8h1");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! moment */ "wd/R");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var src_app_storage_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/storage.service */ "qkCY");
/* harmony import */ var _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @cometchat-pro/cordova-ionic-chat */ "ujHh");
/* harmony import */ var _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_13__);









// import { SurveyStorageModel } from 'src/app/model/survey-storage.model';





let PermitnewdesignComponent = class PermitnewdesignComponent {
    constructor(launchNavigator, datePipe, cdr, utils, storage, apiService, router, storageservice) {
        this.launchNavigator = launchNavigator;
        this.datePipe = datePipe;
        this.cdr = cdr;
        this.utils = utils;
        this.storage = storage;
        this.apiService = apiService;
        this.router = router;
        this.storageservice = storageservice;
        this.listOfDesignData = [];
        this.listOfDesignDataHelper = [];
        this.currentDate = new Date();
        this.skip = 0;
        this.limit = 10;
        this.options = {
            start: '',
            app: this.launchNavigator.APP.GOOGLE_MAPS
        };
        this.userData = this.storageservice.getUser();
        const latestDate = new Date();
        this.today = datePipe.transform(latestDate, 'M/dd/yy');
        console.log('date', this.today);
        //  this.unsubscribeMessage=  this.apiService._OnMessageReceivedSubject.subscribe((r) => {
        //     console.log('message received! ', r);
        //     this.getDesigns();
        //   });
    }
    ngOnInit() {
    }
    trackdesign(index, design) {
        return design.id;
    }
    ngOnDestroy() {
        //Called once, before the instance is destroyed.
        //Add 'implements OnDestroy' to the class.
        this.designRefreshSubscription.unsubscribe();
        // this.dataRefreshSubscription.unsubscribe();
        // this.unsubscribeMessage.unsubscribe();
        this.cdr.detach();
    }
    ionViewDidEnter() {
        this.designRefreshSubscription = this.utils.getHomepagePermitRefresh().subscribe((result) => {
            this.skip = 0;
            this.getDesigns(null);
        });
        // this.dataRefreshSubscription = this.utils.getDataRefresh().subscribe((result) => {
        //   if(this.listOfDesignData != null && this.listOfDesignData.length > 0){
        //     this.formatDesignData(this.listOfDesignData);
        //   }
        // });
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
            this.apiService.getDesignSurveys("requesttype=permit&status=designassigned&status=designinprocess", this.limit, this.skip).subscribe((response) => {
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
    }
    ///chat icon
    chatIcon(list) {
        list.forEach(element => {
            var groupMembersRequest = new _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_13__["CometChat"].GroupMembersRequestBuilder(element.chatid)
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
        this.apiService.getDesignSurveys("requesttype=permit&status=designassigned&status=designinprocess", this.limit, this.skip).subscribe((response) => {
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
            reviewdate.setHours(reviewdate.getHours() + 6);
            element.designremainingtime = this.utils.getRemainingTime(reviewdate.toString());
        });
    }
};
PermitnewdesignComponent.ctorParameters = () => [
    { type: _ionic_native_launch_navigator_ngx__WEBPACK_IMPORTED_MODULE_5__["LaunchNavigator"] },
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_6__["DatePipe"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ChangeDetectorRef"] },
    { type: src_app_utilities_service__WEBPACK_IMPORTED_MODULE_7__["UtilitiesService"] },
    { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_9__["Storage"] },
    { type: src_app_api_service__WEBPACK_IMPORTED_MODULE_8__["ApiService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_11__["ActivatedRoute"] },
    { type: src_app_storage_service__WEBPACK_IMPORTED_MODULE_12__["StorageService"] }
];
PermitnewdesignComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-permitnewdesign',
        template: _raw_loader_permitnewdesign_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_permitnewdesign_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], PermitnewdesignComponent);



/***/ }),

/***/ "gt5a":
/*!*************************************************************************************************!*\
  !*** ./src/app/permitdesignoverview/permit-inreview-design/permit-inreview-design.component.ts ***!
  \*************************************************************************************************/
/*! exports provided: PermitInreviewDesignComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PermitInreviewDesignComponent", function() { return PermitInreviewDesignComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_permit_inreview_design_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./permit-inreview-design.component.html */ "Vu9q");
/* harmony import */ var _permit_inreview_design_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./permit-inreview-design.component.scss */ "wSu4");
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





let PermitInreviewDesignComponent = class PermitInreviewDesignComponent {
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
        this.skip = 0;
        this.limit = 10;
        this.options = {
            start: '',
            app: this.launchNavigator.APP.GOOGLE_MAPS
        };
        this.userData = this.storageservice.getUser();
        const latestDate = new Date();
        this.today = datePipe.transform(latestDate, 'M/dd/yy');
        console.log('date', this.today);
    }
    ngOnInit() {
        this.DesignRefreshSubscription = this.utils.getHomepagePermitRefresh().subscribe((result) => {
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
            this.apiService.getDesignSurveys("requesttype=permit&status=reviewassigned&status=reviewfailed&status=reviewpassed", this.limit, this.skip).subscribe((response) => {
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
        this.apiService.getDesignSurveys("requesttype=permit&status=reviewassigned&status=reviewfailed&status=reviewpassed", this.limit, this.skip).subscribe((response) => {
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
PermitInreviewDesignComponent.ctorParameters = () => [
    { type: _ionic_native_launch_navigator_ngx__WEBPACK_IMPORTED_MODULE_4__["LaunchNavigator"] },
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_5__["DatePipe"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ChangeDetectorRef"] },
    { type: src_app_utilities_service__WEBPACK_IMPORTED_MODULE_6__["UtilitiesService"] },
    { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_8__["Storage"] },
    { type: src_app_api_service__WEBPACK_IMPORTED_MODULE_7__["ApiService"] },
    { type: src_app_storage_service__WEBPACK_IMPORTED_MODULE_11__["StorageService"] }
];
PermitInreviewDesignComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-permit-inreview-design',
        template: _raw_loader_permit_inreview_design_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_permit_inreview_design_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], PermitInreviewDesignComponent);



/***/ }),

/***/ "l1jB":
/*!***************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/permitdesignoverview/permitnewdesign/permitnewdesign.component.html ***!
  \***************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-content>\r\n  <ion-refresher slot=\"fixed\" (ionRefresh)=\"getDesigns($event)\">\r\n    <ion-refresher-content pullingIcon=\"arrow-dropdown\" pullingText=\"Pull down to refresh\" refreshingSpinner=\"lines\"></ion-refresher-content>\r\n  </ion-refresher>\r\n  <ion-grid *ngIf=\"listOfDesignDataHelper.length !== 0\">\r\n    <ion-row *ngFor=\"let item of listOfDesignDataHelper;let i = index\">\r\n        <!-- <ion-virtual-scroll [items]=\"listOfDesignsHelper\"> -->\r\n            <!-- <ion-row *ngFor=\"let item of listOfDesignsHelper;let i = index\"> -->\r\n                <!-- <ion-row *virtualItem=\"let item;let i = index\"> -->\r\n        <!-- <ion-col size=\"12\" class=\"ion-margin-top\">\r\n                <span class=\"ion-padding\" *ngIf=\"today === item.date\">\r\n                    Today\r\n                  </span>\r\n            <span class=\"ion-padding\" *ngIf=\"today !== item.date\">\r\n                      {{item.date | date: 'dd MMM yyyy'}}\r\n                </span>\r\n        </ion-col> -->\r\n        <ion-col *ngFor=\"let designData of item.listOfDesigns;let i = index ;trackBy: trackdesign\" size=\"12\">\r\n            <div class=\"ion-no-padding custom-card\" style=\"height: 100%;\">\r\n                <p class=\"customer-name\">{{designData.name}}\r\n                      <!-- <span class=\"chipdetail\" style=\"background-color: #1289A7;\" [routerLink]=\"['/permit-design-details/',designData.id]\" routerDirection=\"forward\">\r\n                        {{designData.deliverydate | date: 'hh:mm a'}}\r\n                    </span> -->\r\n                    <span [routerLink]=\"['/permit-design-details/',designData.id]\"\r\n                    routerDirection=\"forward\" class=\"chipdetail\" style=\"background-color: #1289A7;;\" *ngIf=\"designData.status == 'designassigned'\">Assigned</span>\r\n                    <span [routerLink]=\"['/permit-design-details/',designData.id]\"\r\n                    routerDirection=\"forward\" class=\"chipdetail\" style=\"background-color: rgb(246, 104, 10);\" *ngIf=\"designData.isoverdue > 0\">Overdue</span>\r\n                    <span class=\"chipdetail\" style=\"background-color: rgb(183,21,64)\" *ngIf=\"designData.isinrevisionstate\"  [routerLink]=\"['/permit-design-details/',designData.id]\">Revision</span>\r\n                    <span class=\"chipdetail ml-1 ml-1\" style=\"background-color: #FA983A;\"\r\n                            *ngIf=\"designData.isoutsourced == 'true'\">Wattmonk</span>\r\n                    <span fill=\"clear\" background-border=\"clear\" [routerLink]=\"['/','activity',designData.id,'design']\" class=\"imagebutton\"  size=\"small\"  ><ion-icon  src=\"/assets/images/activitylist.svg\" ></ion-icon></span>\r\n                    <ng-container *ngIf=\"designData?.chatid!==null && designData?.addedtogroupchat\">\r\n                        <span fill=\"clear\" background-border=\"clear\" [routerLink]=\"['/','chat',designData.chatid]\" class=\"chatbutton\"  size=\"small\"  ><img  style= \"height:20px\" src=\"assets/images/chat.svg\" /></span>\r\n                      </ng-container>\r\n                </p>\r\n               <p style=\"margin: 0px;\"> <span class=\"customer-email\" [routerLink]=\"['/permit-design-details/',designData.id]\" *ngIf=\"userData.designertype!='external'\"\r\n                      routerDirection=\"forward\">{{designData.email}}</span>\r\n                      <span *ngIf=\"designData.isoverdue\" class=\"latebystyle\" style=\"float: right;font-size: 10px;\"><strong>Late by {{designData.lateby}}</strong></span>\r\n                     </p>\r\n                <a href=\"tel:{{designData.phonenumber}}\" style=\"text-decoration: none;\" class=\"z-100\">\r\n                    <span class=\"customer-phone\"  *ngIf=\"userData.designertype!='external'\">{{designData.phonenumber}}</span></a>\r\n                <span style=\"margin:0px\" class=\"customer-address z-100\"  *ngIf=\"userData.designertype!='external'\"\r\n                      (click)=\"openAddressOnMap(designData.address)\">{{(designData.address | slice:0:50) + (designData.address.length > 50 ? '...' : '')}}</span>\r\n\r\n                <ion-row style=\"margin-bottom: 8px;\" [routerLink]=\"['/permit-design-details/',designData.id]\">\r\n                    <!-- <span class=\"chipdetail\" style=\"background-color: #95afc0;\" >Wattmonk</span> -->\r\n                    <span class=\"chipdetail\" style=\"background-color: #95afc0;align-self: center;\" >{{designData?.source}}</span>\r\n                    <span class=\"chipdetail\" style=\"background-color: #95afc0;align-self: center;\" >{{designData?.jobtype=='pvbattery' ? 'PV + Battery' : designData?.jobtype}}</span>\r\n                    <ion-col style=\"color: #737373; font-size: 14px;\">\r\n                        <span style=\"float: right;\" >{{designData.designremainingtime}}</span>\r\n                    </ion-col>\r\n\r\n                      <!-- <span class=\"chipdetail\" style=\"background-color: rgb(246, 77, 10);\" *ngIf=\"designData.isoverdue\">Overdue</span> -->\r\n                </ion-row>\r\n                <ion-row class=\"ion-no-margin ion-no-margin\">\r\n                    <ion-col></ion-col>\r\n                    <!-- <ion-col class=\"ion-no-margin ion-no-padding\"> -->\r\n                    <!-- <ion-col class=\"ion-no-margin ion-no-padding\" *ngIf=\"designData.deliverydate == currentDate\"> -->\r\n                        <!-- <ion-button class=\"ion-no-margin ion-no-padding\" fill=\"clear\" [routerLink]=\"['/surveyprocess/' + designData.id + '/' + designData.jobtype + '/' + designData.latitude + '/' + designData.longitude + '/' + designData.city + '/' + designData.state]\"\r\n                        routerDirection=\"forward\">\r\n                            Start Survey\r\n                        </ion-button> -->\r\n                    <!-- </ion-col> -->\r\n                </ion-row>\r\n                <ion-progress-bar [value]=\"designData.totalpercent\" mode=\"ios\" color=\"success\" class=\"progress-bar-height\"></ion-progress-bar>\r\n            </div>\r\n        </ion-col>\r\n    </ion-row>\r\n    <!-- </ion-virtual-scroll>\r\n    <ion-row>\r\n        <ion-col size=\"12\" style=\"height: 100px;\">\r\n        </ion-col>\r\n    </ion-row> -->\r\n</ion-grid>\r\n\r\n<div *ngIf=\"listOfDesignDataHelper.length === 0\" class=\"h-100 d-flex flex-column align-center justify-center\">\r\n    {{noDesignsFound}}\r\n    <ion-img src=\"/assets/images/blank.png\" class=\"placeholder\"></ion-img>\r\n</div>\r\n<ion-infinite-scroll (ionInfinite)=\"doInfinite($event)\">\r\n    <ion-infinite-scroll-content\r\n      loadingSpinner=\"bubbles\"\r\n      >\r\n    </ion-infinite-scroll-content>\r\n  </ion-infinite-scroll>\r\n</ion-content>\r\n");

/***/ }),

/***/ "sjP1":
/*!***************************************************!*\
  !*** ./src/app/email-model/email-model.page.scss ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".listitem {\n  font-size: 12px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXGVtYWlsLW1vZGVsLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGVBQUE7QUFDSiIsImZpbGUiOiJlbWFpbC1tb2RlbC5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubGlzdGl0ZW17XHJcbiAgICBmb250LXNpemU6IDEycHg7XHJcbn0iXX0= */");

/***/ }),

/***/ "wSu4":
/*!***************************************************************************************************!*\
  !*** ./src/app/permitdesignoverview/permit-inreview-design/permit-inreview-design.component.scss ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".custom-card {\n  display: flex;\n  flex-direction: column;\n  background: white;\n  border-radius: 4px;\n  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.3);\n  padding: 8px 12px;\n}\n\n.customer-name {\n  font-size: 1em;\n  color: #434343;\n  font-weight: bold;\n  display: table;\n  margin: 0px;\n}\n\n.customer-email {\n  font-size: 0.8em;\n  color: #B4B4B4;\n}\n\n.customer-phone {\n  font-size: 0.8em;\n  color: #4272B9;\n}\n\n.customer-address {\n  margin-top: 16px;\n  margin-bottom: 16px;\n  font-size: 0.8em;\n  color: #4272B9;\n}\n\n.timestamp {\n  font-size: 0.7em;\n}\n\n.chipdetail {\n  display: inline;\n  vertical-align: middle;\n  background-color: #95afc0;\n  font-size: 0.6em;\n  padding: 4px 10px;\n  border-radius: 10px;\n  text-align: center;\n  color: #fff;\n}\n\n.imagebutton {\n  float: right;\n  margin-top: 0px;\n}\n\n.chatbutton {\n  float: right;\n  margin-top: 0px;\n  margin-right: 5px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFxwZXJtaXQtaW5yZXZpZXctZGVzaWduLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksYUFBQTtFQUNBLHNCQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLDBDQUFBO0VBQ0EsaUJBQUE7QUFDSjs7QUFFRTtFQUNFLGNBQUE7RUFDQSxjQUFBO0VBQ0EsaUJBQUE7RUFDQSxjQUFBO0VBQ0EsV0FBQTtBQUNKOztBQUVFO0VBQ0UsZ0JBQUE7RUFDQSxjQUFBO0FBQ0o7O0FBRUU7RUFDRSxnQkFBQTtFQUNBLGNBQUE7QUFDSjs7QUFFRTtFQUNFLGdCQUFBO0VBQ0EsbUJBQUE7RUFDQSxnQkFBQTtFQUNBLGNBQUE7QUFDSjs7QUFFRTtFQUNFLGdCQUFBO0FBQ0o7O0FBRUU7RUFDRSxlQUFBO0VBQ0Esc0JBQUE7RUFDQSx5QkFBQTtFQUNBLGdCQUFBO0VBQ0EsaUJBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0VBQ0EsV0FBQTtBQUNKOztBQUNBO0VBQ0UsWUFBQTtFQUNBLGVBQUE7QUFFRjs7QUFFQTtFQUNFLFlBQUE7RUFDQSxlQUFBO0VBQ0EsaUJBQUE7QUFDRiIsImZpbGUiOiJwZXJtaXQtaW5yZXZpZXctZGVzaWduLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmN1c3RvbS1jYXJkIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgYmFja2dyb3VuZDogd2hpdGU7XHJcbiAgICBib3JkZXItcmFkaXVzOiA0cHg7XHJcbiAgICBib3gtc2hhZG93OiAwIDFweCAycHggMCByZ2JhKDAsIDAsIDAsIDAuMyk7XHJcbiAgICBwYWRkaW5nOiA4cHggMTJweDtcclxuICB9XHJcbiAgXHJcbiAgLmN1c3RvbWVyLW5hbWUge1xyXG4gICAgZm9udC1zaXplOiAxZW07XHJcbiAgICBjb2xvcjogIzQzNDM0MztcclxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gICAgZGlzcGxheTp0YWJsZTtcclxuICAgIG1hcmdpbjogMHB4O1xyXG4gIH1cclxuICBcclxuICAuY3VzdG9tZXItZW1haWwge1xyXG4gICAgZm9udC1zaXplOiAwLjhlbTtcclxuICAgIGNvbG9yOiAjQjRCNEI0O1xyXG4gIH1cclxuICBcclxuICAuY3VzdG9tZXItcGhvbmUge1xyXG4gICAgZm9udC1zaXplOiAwLjhlbTtcclxuICAgIGNvbG9yOiAjNDI3MkI5O1xyXG4gIH1cclxuICBcclxuICAuY3VzdG9tZXItYWRkcmVzcyB7XHJcbiAgICBtYXJnaW4tdG9wOiAxNnB4O1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMTZweDtcclxuICAgIGZvbnQtc2l6ZTogMC44ZW07XHJcbiAgICBjb2xvcjogIzQyNzJCOTtcclxuICB9XHJcbiAgXHJcbiAgLnRpbWVzdGFtcCB7XHJcbiAgICBmb250LXNpemU6IDAuN2VtO1xyXG4gIH1cclxuICBcclxuICAuY2hpcGRldGFpbHtcclxuICAgIGRpc3BsYXk6IGlubGluZTtcclxuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjOTVhZmMwO1xyXG4gICAgZm9udC1zaXplOiAwLjZlbTtcclxuICAgIHBhZGRpbmc6IDRweCAxMHB4O1xyXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIGNvbG9yOiAjZmZmO1xyXG59XHJcbi5pbWFnZWJ1dHRvbntcclxuICBmbG9hdDpyaWdodDtcclxuICBtYXJnaW4tdG9wOiAwcHg7XHJcbiAgXHJcbiAgXHJcbn1cclxuLmNoYXRidXR0b257XHJcbiAgZmxvYXQ6cmlnaHQ7XHJcbiAgbWFyZ2luLXRvcDogMHB4O1xyXG4gIG1hcmdpbi1yaWdodDo1cHg7XHJcbn0iXX0= */");

/***/ })

}]);
//# sourceMappingURL=permitdesignoverview-permitdesignoverview-module.js.map