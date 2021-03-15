(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["searchbar-searchbar-module"],{

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

/***/ "0DA0":
/*!********************************************************!*\
  !*** ./src/app/searchbar/design/design.component.scss ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".custom-card {\n  display: flex;\n  flex-direction: column;\n  background: white;\n  border-radius: 12px;\n  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.3);\n  height: 100%;\n}\n\n.customer-name {\n  font-size: 1em;\n  color: #434343;\n  font-weight: bold;\n}\n\n.customer-email {\n  font-size: 0.8em;\n  color: #B4B4B4;\n}\n\n.customer-phone {\n  font-size: 0.8em;\n  color: #4272B9;\n}\n\n.customer-address {\n  margin-top: 16px;\n  margin-bottom: 16px;\n  font-size: 0.8em;\n  color: #4272B9;\n}\n\nion-bottom-drawer {\n  --padding: 0 !important;\n  padding: 0 !important;\n  --background: #F3F3F3 !important;\n  background: #F3F3F3 !important;\n}\n\nion-bottom-drawer ion-content {\n  --background: #F3F3F3 !important;\n}\n\n.timestamp {\n  font-size: 0.7em;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFxkZXNpZ24uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxpQkFBQTtFQUNBLG1CQUFBO0VBQ0EsMENBQUE7RUFDQSxZQUFBO0FBQ0o7O0FBRUU7RUFDRSxjQUFBO0VBQ0EsY0FBQTtFQUNBLGlCQUFBO0FBQ0o7O0FBRUU7RUFDRSxnQkFBQTtFQUNBLGNBQUE7QUFDSjs7QUFFRTtFQUNFLGdCQUFBO0VBQ0EsY0FBQTtBQUNKOztBQUVFO0VBQ0UsZ0JBQUE7RUFDQSxtQkFBQTtFQUNBLGdCQUFBO0VBQ0EsY0FBQTtBQUNKOztBQWVFO0VBRUUsdUJBQUE7RUFDQSxxQkFBQTtFQUVBLGdDQUFBO0VBQ0EsOEJBQUE7QUFkSjs7QUFnQkk7RUFDRSxnQ0FBQTtBQWROOztBQWtCRTtFQUNFLGdCQUFBO0FBZkoiLCJmaWxlIjoiZGVzaWduLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmN1c3RvbS1jYXJkIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgYmFja2dyb3VuZDogd2hpdGU7XHJcbiAgICBib3JkZXItcmFkaXVzOiAxMnB4O1xyXG4gICAgYm94LXNoYWRvdzogMCAxcHggMnB4IDAgcmdiYSgwLCAwLCAwLCAwLjMpO1xyXG4gICAgaGVpZ2h0OiAxMDAlO1xyXG4gIH1cclxuICBcclxuICAuY3VzdG9tZXItbmFtZSB7XHJcbiAgICBmb250LXNpemU6IDFlbTtcclxuICAgIGNvbG9yOiAjNDM0MzQzO1xyXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgfVxyXG4gIFxyXG4gIC5jdXN0b21lci1lbWFpbCB7XHJcbiAgICBmb250LXNpemU6IDAuOGVtO1xyXG4gICAgY29sb3I6ICNCNEI0QjQ7XHJcbiAgfVxyXG4gIFxyXG4gIC5jdXN0b21lci1waG9uZSB7XHJcbiAgICBmb250LXNpemU6IDAuOGVtO1xyXG4gICAgY29sb3I6ICM0MjcyQjk7XHJcbiAgfVxyXG4gIFxyXG4gIC5jdXN0b21lci1hZGRyZXNzIHtcclxuICAgIG1hcmdpbi10b3A6IDE2cHg7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAxNnB4O1xyXG4gICAgZm9udC1zaXplOiAwLjhlbTtcclxuICAgIGNvbG9yOiAjNDI3MkI5O1xyXG4gIH1cclxuICBcclxuICAucGxhY2Vob2xkZXIge1xyXG4gICAgLy8gd2lkdGg6IDUwdncgIWltcG9ydGFudDtcclxuICB9XHJcbiAgXHJcbiAgLy8uZHJhd2VyIHtcclxuICAvLyAgYmFja2dyb3VuZDogI0YzRjNGMztcclxuICAvLyAgLS1iYWNrZ3JvdW5kOiAjRjNGM0YzO1xyXG4gIC8vfVxyXG4gIC8vXHJcbiAgLy8uaW9uLWJvdHRvbS1kcmF3ZXItc2Nyb2xsYWJsZS1jb250ZW50IHtcclxuICAvLyAgYmFja2dyb3VuZDogI0YzRjNGMyAhaW1wb3J0YW50O1xyXG4gIC8vfVxyXG4gIFxyXG4gIGlvbi1ib3R0b20tZHJhd2VyIHtcclxuICBcclxuICAgIC0tcGFkZGluZzogMCAhaW1wb3J0YW50O1xyXG4gICAgcGFkZGluZzogMCAhaW1wb3J0YW50O1xyXG4gIFxyXG4gICAgLS1iYWNrZ3JvdW5kOiAjRjNGM0YzICFpbXBvcnRhbnQ7XHJcbiAgICBiYWNrZ3JvdW5kOiAjRjNGM0YzICFpbXBvcnRhbnQ7XHJcbiAgXHJcbiAgICBpb24tY29udGVudCB7XHJcbiAgICAgIC0tYmFja2dyb3VuZDogI0YzRjNGMyAhaW1wb3J0YW50O1xyXG4gICAgfVxyXG4gIH1cclxuICBcclxuICAudGltZXN0YW1wIHtcclxuICAgIGZvbnQtc2l6ZTogMC43ZW07XHJcbiAgfSJdfQ== */");

/***/ }),

/***/ "0Obt":
/*!********************************************************!*\
  !*** ./src/app/searchbar/survey/survey.component.scss ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".custom-card {\n  display: flex;\n  flex-direction: column;\n  background: white;\n  border-radius: 12px;\n  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.3);\n}\n\n.customer-name {\n  font-size: 1.2em;\n  color: #434343;\n  font-weight: bold;\n}\n\n.customer-email {\n  font-size: 0.8em;\n  color: #B4B4B4;\n}\n\n.customer-phone {\n  font-size: 0.8em;\n  color: #4272B9;\n}\n\n.customer-address {\n  margin-top: 16px;\n  margin-bottom: 16px;\n  font-size: 0.8em;\n  color: #4272B9;\n}\n\n.timestamp {\n  font-size: 0.7em;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFxzdXJ2ZXkuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxpQkFBQTtFQUNBLG1CQUFBO0VBQ0EsMENBQUE7QUFDSjs7QUFFRTtFQUNFLGdCQUFBO0VBQ0EsY0FBQTtFQUNBLGlCQUFBO0FBQ0o7O0FBRUU7RUFDRSxnQkFBQTtFQUNBLGNBQUE7QUFDSjs7QUFFRTtFQUNFLGdCQUFBO0VBQ0EsY0FBQTtBQUNKOztBQUVFO0VBQ0UsZ0JBQUE7RUFDQSxtQkFBQTtFQUNBLGdCQUFBO0VBQ0EsY0FBQTtBQUNKOztBQU1FO0VBQ0UsZ0JBQUE7QUFISiIsImZpbGUiOiJzdXJ2ZXkuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuY3VzdG9tLWNhcmQge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcclxuICAgIGJvcmRlci1yYWRpdXM6IDEycHg7XHJcbiAgICBib3gtc2hhZG93OiAwIDFweCAycHggMCByZ2JhKDAsIDAsIDAsIDAuMyk7XHJcbiAgfVxyXG4gIFxyXG4gIC5jdXN0b21lci1uYW1lIHtcclxuICAgIGZvbnQtc2l6ZTogMS4yZW07XHJcbiAgICBjb2xvcjogIzQzNDM0MztcclxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gIH1cclxuICBcclxuICAuY3VzdG9tZXItZW1haWwge1xyXG4gICAgZm9udC1zaXplOiAwLjhlbTtcclxuICAgIGNvbG9yOiAjQjRCNEI0O1xyXG4gIH1cclxuICBcclxuICAuY3VzdG9tZXItcGhvbmUge1xyXG4gICAgZm9udC1zaXplOiAwLjhlbTtcclxuICAgIGNvbG9yOiAjNDI3MkI5O1xyXG4gIH1cclxuICBcclxuICAuY3VzdG9tZXItYWRkcmVzcyB7XHJcbiAgICBtYXJnaW4tdG9wOiAxNnB4O1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMTZweDtcclxuICAgIGZvbnQtc2l6ZTogMC44ZW07XHJcbiAgICBjb2xvcjogIzQyNzJCOTtcclxuICB9XHJcbiAgXHJcbiAgLnBsYWNlaG9sZGVyIHtcclxuICAgIC8vIHdpZHRoOiA1MHZ3ICFpbXBvcnRhbnQ7XHJcbiAgfVxyXG4gIFxyXG4gIC50aW1lc3RhbXAge1xyXG4gICAgZm9udC1zaXplOiAwLjdlbTtcclxuICB9Il19 */");

/***/ }),

/***/ "4J4k":
/*!**********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/searchbar/survey/survey.component.html ***!
  \**********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-content>\r\n  <ion-refresher slot=\"fixed\" (ionRefresh)=\"getSurveys($event)\">\r\n      <ion-refresher-content></ion-refresher-content>\r\n  </ion-refresher>\r\n  <ion-grid *ngIf=\"listOfSurveyDataHelper.length !== 0\">\r\n      <ion-row *ngFor=\"let item of listOfSurveyDataHelper;let i = index\">\r\n          <ion-col size=\"12\" class=\"ion-margin-top\">\r\n                  <span class=\"ion-padding\" *ngIf=\"today === item.date\">\r\n                      Today\r\n                    </span>\r\n              <span class=\"ion-padding\" *ngIf=\"today !== item.date\">\r\n                        {{item.date | date: 'dd MMM yyyy'}}\r\n                  </span>\r\n          </ion-col>\r\n          <ion-col *ngFor=\"let surveyData of item.listOfSurveys;let i = index \" size=\"6\">\r\n              <div class=\"ion-padding custom-card\" style=\"height: 100%;\">\r\n                  <span class=\"customer-name\" [routerLink]=\"['/survey-detail/',surveyData.id]\"\r\n                        routerDirection=\"forward\">{{surveyData.name}}</span>\r\n                        <span style=\"float: right;\" class=\"ion-text-end timestamp\" [routerLink]=\"['/survey-detail/',surveyData.id]\" routerDirection=\"forward\">\r\n                            {{surveyData.datetime | date: 'hh:mm a'}}\r\n                        </span>\r\n                  <span class=\"customer-email\" [routerLink]=\"['/survey-detail/',surveyData.id]\"\r\n                        routerDirection=\"forward\">{{surveyData.email}}</span>\r\n                  <a href=\"tel:{{surveyData.phonenumber}}\" style=\"text-decoration: none;\" class=\"z-100\">\r\n                      <span class=\"customer-phone\">{{surveyData?.phonenumber}}</span></a>\r\n                  <span class=\"customer-address z-100\"\r\n                        (click)=\"openAddressOnMap(surveyData.address)\">{{(surveyData.address | slice:0:60) + (surveyData.address?.length > 60 ? '...' : '')}}</span>\r\n                  <ion-row class=\"ion-no-margin ion-no-margin\">\r\n                      <ion-col size=\"auto\" class=\"ion-no-margin ion-no-padding\"\r\n                               *ngIf=\"surveyData.status !== 'surveycompleted'\"\r\n                               [routerLink]=\"['/camera/' + surveyData.id + '/' + surveyData.jobtype + '/' + surveyData.city + '/' + surveyData.state + '/' + surveyData.latitude + '/' + surveyData.longitude]\"\r\n                               routerDirection=\"forward\">\r\n                          <span class=\"ion-text-end action-button-color\">Start Survey</span>\r\n                      </ion-col>\r\n                      <ion-col></ion-col>\r\n                      <ion-col size=\"auto\" class=\"ion-no-margin ion-no-padding\"\r\n                               *ngIf=\"surveyData.assignedto === null || surveyData.assignedto === undefined\">\r\n                               <span *ngIf=\"surveyData.status == 'created' || surveyData.status == 'requestaccepted'\" style=\"float:right !important;\" class=\"ion-text-end action-button-color\" (click)=\"openSurveyors(surveyData.id)\"\r\n                               >Assign</span>\r\n                               <span *ngIf=\"surveyData.status == 'outsourced'\" style=\"float:right !important;\" class=\"ion-text-end action-button-color\" (click)=\"openSurveyors(surveyData.id)\"\r\n                               >Decline</span>\r\n                               <span *ngIf=\"surveyData.status == 'outsourced'\" style=\"float:right !important;\" class=\"ion-text-end action-button-color\" (click)=\"openSurveyors(surveyData.id)\"\r\n                               >Accept</span>\r\n                               <span *ngIf=\"surveyData.status == 'requestdeclined'\"style=\"float:right !important;\" class=\"ion-text-end action-button-color\" (click)=\"openSurveyors(surveyData.id)\"\r\n                               >Reassign</span>\r\n                               <span *ngIf=\"surveyData.status == 'reviewpassed'\" style=\"float:right !important;\" class=\"ion-text-end action-button-color\" (click)=\"openSurveyors(surveyData.id)\"\r\n                               >Deliver</span>\r\n                      </ion-col>\r\n                  </ion-row>\r\n                  <!-- <span class=\"ion-text-end timestamp\" [routerLink]=\"['/survey-detail/',surveyData.id]\" routerDirection=\"forward\">\r\n                      {{surveyData.datetime | date: 'hh:mm a'}}\r\n                  </span> -->\r\n\r\n              </div>\r\n\r\n          </ion-col>\r\n      </ion-row>\r\n      <ion-row>\r\n          <ion-col size=\"12\" style=\"height: 100px;\">\r\n          </ion-col>\r\n      </ion-row>\r\n  </ion-grid>\r\n\r\n  <div *ngIf=\"listOfSurveyDataHelper.length === 0\" class=\"h-100 d-flex flex-column align-center justify-center\">\r\n      <ion-img src=\"/assets/images/blank.png\" class=\"placeholder\"></ion-img>\r\n  </div>\r\n\r\n</ion-content>\r\n\r\n<ion-bottom-drawer [(state)]=\"drawerState\" [minimumHeight]=\"0\" [dockedHeight]=\"320\" [draggable]=\"false\" [disableDrag]=\"true\"\r\n                 [shouldBounce]=\"false\" [distanceTop]=\"0\" class=\"drawer\" style=\"z-index: 9999 !important;\">\r\n  <form [formGroup]=\"assignForm\">\r\n      <ion-grid class=\"drawer\">\r\n          <ion-row>\r\n              <ion-col size=\"12\">\r\n                  <app-user-selector placeholder=\"Assign\" [assignees]=\"listOfAssignees\"\r\n                                     formControlName=\"assignedto\"></app-user-selector>\r\n              </ion-col>\r\n          </ion-row>\r\n          <ion-row>\r\n              <ion-col size=\"auto\">\r\n                  <ion-button class=\"buttom-drawer-button\" (click)=\"assignToSurveyor()\">\r\n                      Confirm\r\n                  </ion-button>\r\n              </ion-col>\r\n              <ion-col size=\"auto\">\r\n                  <ion-button class=\"buttom-drawer-button-cancel\" fill=\"clear\" (click)=\"dismissBottomSheet()\">\r\n                      Cancel\r\n                  </ion-button>\r\n              </ion-col>\r\n          </ion-row>\r\n      </ion-grid>\r\n  </form>\r\n\r\n</ion-bottom-drawer>\r\n");

/***/ }),

/***/ "D+e9":
/*!*************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/searchbar/searchbar.page.html ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-content style=\"position: relative;\">\r\n  <!-- <ion-header class=\"ion-no-border white-bg\" style=\"position: relative;\">\r\n      <ion-toolbar> -->\r\n  <ion-grid>\r\n      <ion-row class=\"ion-align-items-center\">\r\n          <ion-col *ngIf=\"showHome === true\">\r\n              <h1 class=\"ion-no-padding ion-no-margin home\">Search</h1>\r\n          </ion-col>\r\n          <ion-col *ngIf=\"showSearchBar === true\">\r\n              <ion-searchbar debounce=\"0\" placeholder=\"search\" (ionClear)=\"showHom()\" [(ngModel)]=\"searchbarElement\"\r\n                             (ionChange)=\"searchDesginAndSurvey($event)\" class=\"custom\"></ion-searchbar>\r\n          </ion-col>\r\n          <ion-col size=\"auto\" *ngIf=\"showHome === true\">\r\n              <div class=\"notification-padding\" (click)=\"onClick()\">\r\n                  <ion-img src=\"/assets/images/icons8-search.svg\" class=\"notification-icon\"></ion-img>\r\n              </div>\r\n          </ion-col>\r\n          <!-- <ion-col size=\"auto\" style=\"position: relative;\">\r\n              <div class=\"notification-padding\" [routerLink]=\"['/profile']\" routerDirection=\"forward\">\r\n                  <ion-img src=\"/assets/images/notification.svg\" class=\"notification-icon\"></ion-img>\r\n                \r\n              </div>\r\n          </ion-col> -->\r\n      </ion-row>\r\n  </ion-grid>\r\n  <!-- </ion-toolbar> -->\r\n  <!-- </ion-header> -->\r\n  <ion-tabs style=\"margin-top: 52px;\">\r\n      <ion-tab-bar slot=\"top\" class=\"ion-no-border\">\r\n          <ion-tab-button tab=\"design\" *ngIf=\"isUserDesigner\">\r\n              <ion-label>Designs</ion-label>\r\n          </ion-tab-button>\r\n          <ion-tab-button tab=\"survey\" *ngIf=\"isUserSurveyor\">\r\n              <ion-label>Surveys</ion-label>\r\n          </ion-tab-button>\r\n      </ion-tab-bar>\r\n  </ion-tabs>\r\n  <ion-grid style=\"position: absolute;\">\r\n      <div class=\"searchbar_div\">\r\n          <ion-grid *ngIf=\"searchDesginItem && searchDesginItem.length !== 0\">\r\n              <ion-row *ngFor=\"let searchitem of searchDesginItem;\" (click)=\"getdesigndata(searchitem)\">\r\n                  <ion-col size=\"2\">\r\n                      <ion-img class=\"profile-icon\" src=\"/assets/images/icons8-checked.svg\"></ion-img>\r\n                  </ion-col>\r\n                  <ion-col size=\"10\" style=\"margin-top: 6px;\">\r\n                      <div style=\"display: flex; justify-content: space-between;\">\r\n                          <span class=\"history-name\">{{searchitem.name}}</span>\r\n                          <span class=\"history-add\">{{searchitem.created_at | date:'dd/MM/yyyy'}}</span>\r\n                      </div>\r\n                      <div>\r\n                            <span class=\"history-add\">\r\n                              {{searchitem.address}}\r\n                            </span>\r\n                      </div>\r\n                      <!-- <div>\r\n                            <span class=\"assign\">\r\n                             desgined assign to.....\r\n                            </span>\r\n                      </div> -->\r\n                  </ion-col>\r\n              </ion-row>\r\n          </ion-grid>\r\n          <ion-grid *ngIf=\"(searchSurveyItem && searchSurveyItem.length !== 0)\">\r\n              <ion-row *ngFor=\"let searchitem of searchSurveyItem\" (click)=\"getdesigndata(searchitem)\">\r\n                  <ion-col size=\"2\">\r\n                      <ion-img class=\"profile-icon\" src=\"/assets/images/icons8-checked.svg\"></ion-img>\r\n                  </ion-col>\r\n                  <ion-col size=\"10\" style=\"margin-top: 6px;\">\r\n                      <div style=\"display: flex; justify-content: space-between;\">\r\n                          <span class=\"history-name\">{{searchitem.name}}</span>\r\n                          <span class=\"history-add\">{{searchitem.created_at | date:'dd/MM/yyyy'}}</span>\r\n                      </div>\r\n                      <div>\r\n                            <span class=\"history-add\">\r\n                              {{searchitem.address}}\r\n                            </span>\r\n                      </div>\r\n                      <!-- <div>\r\n                            <span class=\"assign\">\r\n                             desgined assign to.....\r\n                            </span>\r\n                      </div> -->\r\n                  </ion-col>\r\n              </ion-row>\r\n          </ion-grid>\r\n      </div>\r\n      <div class=\"searchbar_div nodata_div\">\r\n          <ng-template #noDesignandSurvey>\r\n              <ion-grid\r\n                      *ngIf=\"searchbarElement !== '' && (searchSurveyItem && searchSurveyItem.length === 0) && (searchDesginItem && searchDesginItem.length === 0)\">\r\n                  <div class=\"h-100 d-flex flex-column align-center justify-center\">\r\n                      <span>No desgin or survey found</span>\r\n                  </div>\r\n              </ion-grid>\r\n          </ng-template>\r\n      </div>\r\n  </ion-grid>\r\n\r\n</ion-content>\r\n\r\n\r\n\r\n");

/***/ }),

/***/ "Fv7t":
/*!******************************************************!*\
  !*** ./src/app/searchbar/design/design.component.ts ***!
  \******************************************************/
/*! exports provided: DesignComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DesignComponent", function() { return DesignComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_design_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./design.component.html */ "qTTa");
/* harmony import */ var _design_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./design.component.scss */ "0DA0");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_api_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/api.service */ "yTNM");
/* harmony import */ var src_app_utilities_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/utilities.service */ "oTnF");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var src_app_storage_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/storage.service */ "qkCY");
/* harmony import */ var _ionic_native_launch_navigator_ngx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic-native/launch-navigator/ngx */ "fGQ8");
/* harmony import */ var ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ion-bottom-drawer */ "rFvw");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var src_app_homepage_design_design_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/homepage/design/design.component */ "4JZt");













let DesignComponent = class DesignComponent {
    constructor(utils, apiService, datePipe, storage, cdr, launchNavigator, formBuilder, route, router) {
        this.utils = utils;
        this.apiService = apiService;
        this.datePipe = datePipe;
        this.storage = storage;
        this.cdr = cdr;
        this.launchNavigator = launchNavigator;
        this.formBuilder = formBuilder;
        this.route = route;
        this.router = router;
        this.listOfDesignDataHelper = [];
        this.listOfDesignsData = [];
        this.options = {
            start: '',
            app: this.launchNavigator.APP.GOOGLE_MAPS
        };
        this.drawerState = ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_9__["DrawerState"].Bottom;
        this.listOfAssignees = [];
        this.designId = 0;
        this.showBottomDraw = false;
        this.myFiles = [];
        this.isRequest = false;
        const latestDate = new Date();
        this.today = datePipe.transform(latestDate, 'M/dd/yy');
        console.log('date', this.today);
        this.assignForm = this.formBuilder.group({
            assignedto: new _angular_forms__WEBPACK_IMPORTED_MODULE_10__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_10__["Validators"].required]),
            comment: new _angular_forms__WEBPACK_IMPORTED_MODULE_10__["FormControl"]('')
        });
    }
    ionViewDidEnter() {
        // this.routeSubscription.unsubscribe();
    }
    ngOnInit() {
        // this.parentSubject.subscribe(event=>{
        //   this.filterData(event.serchTermData.id);
        // })
        // this.getDesign(event);
        this.routeSubscription = this.router.events.subscribe((event) => {
            console.log("//", event);
            console.log(this.router.url.indexOf('page'));
            if (event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_11__["NavigationEnd"]) {
                console.log(event.url);
                // Trick the Router into believing it's last link wasn't previously loaded
                if (this.router.url.indexOf('page') >= -1) {
                    this.router.navigated = false;
                    let data = this.route.queryParams.subscribe((_res) => {
                        console.log('Serach Term', _res);
                        if (Object.keys(_res).length !== 0) {
                            //  this.ApplysearchDesginAndSurvey(_res.serchTerm)
                            this.filterData(_res.serchTerm);
                        }
                        else {
                            // this.refreshSubscription = this.utils.getHomepageDesignRefresh().subscribe((result) => {
                            this.getDesign(null, false);
                            // });
                        }
                    });
                }
            }
        });
        this.getDesign(null, true);
    }
    ngOnDestroy() {
        //  this.refreshSubscription.unsubscribe();
        // this.routeSubscription.unsubscribe();
    }
    filterData(serchTerm) {
        console.log(this.listOfDesignsData);
        let filterDataArray = this.listOfDesignsData.filter(x => x.id == serchTerm);
        const tempData = [];
        filterDataArray.forEach((desginItem) => {
            if (tempData.length === 0) {
                const listOfDesign = new src_app_homepage_design_design_component__WEBPACK_IMPORTED_MODULE_12__["DesginDataHelper"]();
                listOfDesign.date = this.datePipe.transform(desginItem.created_at, 'M/d/yy');
                listOfDesign.listOfDesigns.push(desginItem);
                tempData.push(listOfDesign);
            }
            else {
                let added = false;
                tempData.forEach((desginList) => {
                    if (!added) {
                        if (desginList.date === this.datePipe.transform(desginItem.created_at, 'M/d/yy')) {
                            desginList.listOfDesigns.push(desginItem);
                            added = true;
                        }
                    }
                });
                if (!added) {
                    const listOfDesign = new src_app_homepage_design_design_component__WEBPACK_IMPORTED_MODULE_12__["DesginDataHelper"]();
                    listOfDesign.date = this.datePipe.transform(desginItem.created_at, 'M/d/yy');
                    listOfDesign.listOfDesigns.push(desginItem);
                    tempData.push(listOfDesign);
                    added = true;
                    this.listOfDesignDataHelper.push(listOfDesign);
                    console.log(this.listOfDesignDataHelper);
                }
            }
        });
        this.listOfDesignDataHelper = tempData;
        this.cdr.detectChanges();
    }
    getDesign(event, showLoader) {
        this.isRequest = true;
        this.listOfDesignsData = [];
        this.listOfDesignDataHelper = [];
        this.utils.showLoadingWithPullRefreshSupport(showLoader, 'Getting designs').then((success) => {
            // debugger;
            this.apiService.getDesgin().subscribe((response) => {
                this.utils.hideLoadingWithPullRefreshSupport(showLoader).then((loaderHidden) => {
                    // debugger;
                    if (event !== null) {
                        event.target.complete();
                    }
                    console.log(response, '>>');
                    this.listOfDesignsData = response;
                    response.forEach(element => {
                        this.roleType = element.type;
                    });
                    ;
                    console.log(this.roleType);
                    const tempData = [];
                    this.listOfDesignsData.forEach((desginItem) => {
                        if (tempData.length === 0) {
                            const listOfDesign = new src_app_homepage_design_design_component__WEBPACK_IMPORTED_MODULE_12__["DesginDataHelper"]();
                            listOfDesign.date = this.datePipe.transform(desginItem.created_at, 'M/d/yy');
                            listOfDesign.listOfDesigns.push(desginItem);
                            tempData.push(listOfDesign);
                        }
                        else {
                            let added = false;
                            tempData.forEach((desginList) => {
                                if (!added) {
                                    if (desginList.date === this.datePipe.transform(desginItem.created_at, 'M/d/yy')) {
                                        desginList.listOfDesigns.push(desginItem);
                                        added = true;
                                    }
                                }
                            });
                            if (!added) {
                                const listOfDesign = new src_app_homepage_design_design_component__WEBPACK_IMPORTED_MODULE_12__["DesginDataHelper"]();
                                listOfDesign.date = this.datePipe.transform(desginItem.created_at, 'M/d/yy');
                                listOfDesign.listOfDesigns.push(desginItem);
                                tempData.push(listOfDesign);
                                added = true;
                                this.listOfDesignDataHelper.push(listOfDesign);
                                console.log(this.listOfDesignDataHelper, "<<<<>>>>");
                            }
                        }
                    });
                    this.listOfDesignDataHelper = tempData;
                    this.cdr.detectChanges();
                }, responseError => {
                    this.utils.hideLoadingWithPullRefreshSupport(showLoader).then((loaderHidden) => {
                        if (event !== null) {
                            event.target.complete();
                        }
                        const error = responseError.error;
                        this.utils.errorSnackBar(error.message[0].messages[0].message);
                    });
                });
            }, responseError => {
                this.utils.hideLoadingWithPullRefreshSupport(showLoader).then((loaderHidden) => {
                    if (event !== null) {
                        event.target.complete();
                    }
                    const error = responseError.error;
                    this.utils.errorSnackBar(error.message[0].messages[0].message);
                });
            });
        }, (apiError) => {
            this.utils.hideLoadingWithPullRefreshSupport(showLoader).then(() => {
                if (event !== null) {
                    event.target.complete();
                }
            });
        });
    }
    openAddressOnMap(address) {
        this.launchNavigator.navigate(address, this.options);
    }
    dismissBottomSheet() {
        console.log('this', this.drawerState);
        this.drawerState = ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_9__["DrawerState"].Bottom;
        this.utils.setBottomBarHomepage(true);
    }
    assignToDesigner() {
        if (this.assignForm.status === 'INVALID') {
            this.utils.errorSnackBar('Please select a designer');
        }
        else {
            this.apiService.updateDesignForm(this.assignForm.value, this.designId).subscribe((value) => {
                console.log('reach ', value);
                this.utils.showSnackBar('Design request has been assigned to' + ' ' + value.name + ' ' + 'successfully');
                this.dismissBottomSheet();
                this.showBottomDraw = false;
                this.utils.setHomepageDesignRefresh(true);
            }, (error) => {
                this.dismissBottomSheet();
                this.showBottomDraw = false;
            });
        }
    }
    openDesigners(id) {
        if (this.listOfAssignees.length === 0) {
            this.utils.showLoading('Getting Designers').then(() => {
                this.apiService.getSurveyors().subscribe(assignees => {
                    this.utils.hideLoading().then(() => {
                        this.listOfAssignees = [];
                        // this.listOfAssignees.push(this.utils.getDefaultAssignee(this.storage.getUserID()));
                        assignees.forEach(item => this.listOfAssignees.push(item));
                        console.log(this.listOfAssignees);
                        this.showBottomDraw = true;
                        this.designId = id;
                        this.utils.setBottomBarHomepage(false);
                        this.drawerState = ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_9__["DrawerState"].Docked;
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
            this.drawerState = ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_9__["DrawerState"].Docked;
            this.assignForm.patchValue({
                assignedto: 0
            });
        }
    }
    close() {
        if (this.showBottomDraw === true) {
            this.showBottomDraw = false;
            this.drawerState = ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_9__["DrawerState"].Bottom;
            this.utils.setBottomBarHomepage(true);
        }
        else {
            this.showBottomDraw = true;
        }
    }
    refreshDesigns(event) {
        let showLoader = true;
        if (event !== null && event !== undefined) {
            showLoader = false;
        }
        this.getDesign(event, showLoader);
    }
};
DesignComponent.ctorParameters = () => [
    { type: src_app_utilities_service__WEBPACK_IMPORTED_MODULE_5__["UtilitiesService"] },
    { type: src_app_api_service__WEBPACK_IMPORTED_MODULE_4__["ApiService"] },
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_6__["DatePipe"] },
    { type: src_app_storage_service__WEBPACK_IMPORTED_MODULE_7__["StorageService"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ChangeDetectorRef"] },
    { type: _ionic_native_launch_navigator_ngx__WEBPACK_IMPORTED_MODULE_8__["LaunchNavigator"] },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_10__["FormBuilder"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_11__["ActivatedRoute"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_11__["Router"] }
];
DesignComponent.propDecorators = {
    parentSubject: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }]
};
DesignComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-design',
        template: _raw_loader_design_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_design_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], DesignComponent);

// export class DesginDataHelper {
//   listOfDesigns: DesginDataModel[];
//   date: any;
//   constructor() {
//     this.listOfDesigns = [];
//   }
// }


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

/***/ "W1J7":
/*!******************************************************!*\
  !*** ./src/app/searchbar/survey/survey.component.ts ***!
  \******************************************************/
/*! exports provided: SurveyComponent, SurveyDataHelper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SurveyComponent", function() { return SurveyComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SurveyDataHelper", function() { return SurveyDataHelper; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_survey_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./survey.component.html */ "4J4k");
/* harmony import */ var _survey_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./survey.component.scss */ "0Obt");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_utilities_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/utilities.service */ "oTnF");
/* harmony import */ var src_app_api_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/api.service */ "yTNM");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _ionic_native_launch_navigator_ngx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic-native/launch-navigator/ngx */ "fGQ8");
/* harmony import */ var ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ion-bottom-drawer */ "rFvw");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var src_app_storage_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/storage.service */ "qkCY");
/* harmony import */ var src_app_contants__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! src/app/contants */ "6qqZ");














let SurveyComponent = class SurveyComponent {
    constructor(utils, apiService, datePipe, navController, launchNavigator, formBuilder, cdr, router, route, storage) {
        this.utils = utils;
        this.apiService = apiService;
        this.datePipe = datePipe;
        this.navController = navController;
        this.launchNavigator = launchNavigator;
        this.formBuilder = formBuilder;
        this.cdr = cdr;
        this.router = router;
        this.route = route;
        this.storage = storage;
        this.listOfSurveyData = [];
        this.listOfSurveyDataHelper = [];
        this.options = {
            start: '',
            app: this.launchNavigator.APP.GOOGLE_MAPS
        };
        this.drawerState = ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_9__["DrawerState"].Bottom;
        this.surveyId = 0;
        this.listOfAssignees = [];
        const latestDate = new Date();
        this.today = datePipe.transform(latestDate, 'M/dd/yy');
        console.log('date', this.today);
        this.assignForm = this.formBuilder.group({
            assignedto: new _angular_forms__WEBPACK_IMPORTED_MODULE_10__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_10__["Validators"].required]),
            status: new _angular_forms__WEBPACK_IMPORTED_MODULE_10__["FormControl"]('surveyassigned', [_angular_forms__WEBPACK_IMPORTED_MODULE_10__["Validators"].required])
        });
    }
    ionViewDidEnter() {
        // this.routeSubscription.unsubscribe();
        this.getSurveys(null);
    }
    // ngOnInit() {
    //   this.surveyRefreshSubscription = this.utils.getHomepageSurveyRefresh().subscribe((result) => {
    //     this.getSurvey();
    //   });
    // }
    ngOnInit() {
        this.filterData(this.filterDataArray);
        this.routeSubscription = this.router.events.subscribe((event) => {
            console.log("//", event);
            console.log(this.router.url.indexOf('page'));
            if (event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_11__["NavigationEnd"]) {
                console.log(event.url);
                // Trick the Router into believing it's last link wasn't previously loaded
                if (this.router.url.indexOf('page') >= -1) {
                    this.router.navigated = false;
                    let data = this.route.queryParams.subscribe((_res) => {
                        console.log('Serach Term', _res);
                        if (Object.keys(_res).length !== 0) {
                            //  this.ApplysearchDesginAndSurvey(_res.serchTerm)
                            this.filterData(_res.serchTerm);
                        }
                        else {
                            // this.surveyRefreshSubscription = this.utils.getHomepageSurveyRefresh().subscribe((result) => {
                            // this.getSurveys(null);
                            // });
                        }
                    });
                }
            }
        });
        // console.log('inside init');
        // this.routeSubscription = this.router.events.subscribe((event) => {
        //   if (event instanceof NavigationEnd) {
        //     // Trick the Router into believing it's last link wasn't previously loaded
        //     if (this.router.url.indexOf('page') > -1) {
        //       this.router.navigated = false;
        //       const data = this.route.queryParams.subscribe((_res: any) => {
        //         console.log('Search Term', _res);
        //         if (Object.keys(_res).length !== 0) {
        //           //  this.ApplysearchDesginAndSurvey(_res.serchTerm)
        //           this.filterData(_res.serchTerm);
        //         } else {
        //           this.surveyRefreshSubscription = this.utils.getHomepageSurveyRefresh().subscribe((result) => {
        //             this.getSurveys(null);
        //           });
        //         }
        //       });
        //     }
        //   }
        // });
        // this.getSurveys(null);
    }
    filterData(serchTerm) {
        console.log(this.listOfSurveyData);
        this.filterDataArray = this.listOfSurveyData.filter(x => x.id == serchTerm);
        const tempData = [];
        this.filterDataArray.forEach((surveyItem) => {
            if (tempData.length === 0) {
                const listOfSurvey = new SurveyDataHelper();
                listOfSurvey.date = this.datePipe.transform(surveyItem.created_at, 'M/d/yy');
                listOfSurvey.listOfSurveys.push(surveyItem);
                tempData.push(listOfSurvey);
            }
            else {
                let added = false;
                tempData.forEach((surveyList) => {
                    if (!added) {
                        if (surveyList.date === this.datePipe.transform(surveyItem.created_at, 'M/d/yy')) {
                            surveyList.listOfSurveys.push(surveyItem);
                            added = true;
                        }
                    }
                });
                if (!added) {
                    const listOfSurvey = new SurveyDataHelper();
                    listOfSurvey.date = this.datePipe.transform(surveyItem.created_at, 'M/d/yy');
                    listOfSurvey.listOfSurveys.push(surveyItem);
                    tempData.push(listOfSurvey);
                    added = true;
                }
            }
        });
        this.listOfSurveyDataHelper = tempData;
        this.cdr.detectChanges();
    }
    ngOnDestroy() {
        this.surveyRefreshSubscription.unsubscribe();
    }
    getSurvey(event, showLoader) {
        this.listOfSurveyData = [];
        this.listOfSurveyDataHelper = [];
        this.utils.showLoadingWithPullRefreshSupport(showLoader, 'Getting Surveys').then((success) => {
            this.apiService.getSurvey().subscribe(response => {
                this.utils.hideLoadingWithPullRefreshSupport(showLoader).then(() => {
                    if (event !== null) {
                        event.target.complete();
                    }
                    console.log(response);
                    this.listOfSurveyData = response;
                    const tempData = [];
                    this.listOfSurveyData.forEach((surveyItem) => {
                        if (tempData.length === 0) {
                            const listOfSurvey = new SurveyDataHelper();
                            listOfSurvey.date = this.datePipe.transform(surveyItem.datetime, 'M/d/yy');
                            listOfSurvey.listOfSurveys.push(surveyItem);
                            tempData.push(listOfSurvey);
                        }
                        else {
                            let added = false;
                            tempData.forEach((surveyList) => {
                                if (!added) {
                                    if (surveyList.date === this.datePipe.transform(surveyItem.datetime, 'M/d/yy')) {
                                        surveyList.listOfSurveys.push(surveyItem);
                                        added = true;
                                    }
                                }
                            });
                            if (!added) {
                                const listOfSurvey = new SurveyDataHelper();
                                listOfSurvey.date = this.datePipe.transform(surveyItem.datetime, 'M/d/yy');
                                listOfSurvey.listOfSurveys.push(surveyItem);
                                tempData.push(listOfSurvey);
                                added = true;
                            }
                        }
                    });
                    this.listOfSurveyDataHelper = tempData;
                    this.cdr.detectChanges();
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
    getSurveyorSurveys(event, showLoader) {
        this.listOfSurveyData = [];
        this.listOfSurveyDataHelper = [];
        this.utils.showLoadingWithPullRefreshSupport(showLoader, 'Getting Surveys').then((success) => {
            this.apiService.getSurveyorSurveys("").subscribe(response => {
                this.utils.hideLoadingWithPullRefreshSupport(showLoader).then(() => {
                    if (event !== null) {
                        event.target.complete();
                    }
                    console.log(response);
                    this.listOfSurveyData = response;
                    const tempData = [];
                    this.listOfSurveyData.forEach((surveyItem) => {
                        if (tempData.length === 0) {
                            const listOfSurvey = new SurveyDataHelper();
                            listOfSurvey.date = this.datePipe.transform(surveyItem.datetime, 'M/d/yy');
                            listOfSurvey.listOfSurveys.push(surveyItem);
                            tempData.push(listOfSurvey);
                        }
                        else {
                            let added = false;
                            tempData.forEach((surveyList) => {
                                if (!added) {
                                    if (surveyList.date === this.datePipe.transform(surveyItem.datetime, 'M/d/yy')) {
                                        surveyList.listOfSurveys.push(surveyItem);
                                        added = true;
                                    }
                                }
                            });
                            if (!added) {
                                const listOfSurvey = new SurveyDataHelper();
                                listOfSurvey.date = this.datePipe.transform(surveyItem.datetime, 'M/d/yy');
                                listOfSurvey.listOfSurveys.push(surveyItem);
                                tempData.push(listOfSurvey);
                                added = true;
                            }
                        }
                    });
                    this.listOfSurveyDataHelper = tempData;
                    this.cdr.detectChanges();
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
    dismissBottomSheet() {
        this.drawerState = ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_9__["DrawerState"].Bottom;
        this.utils.setBottomBarHomepage(true);
    }
    assignToSurveyor() {
        if (this.assignForm.status === 'INVALID') {
            this.utils.errorSnackBar('Please select a surveyor');
        }
        else {
            this.apiService.updateSurveyForm(this.assignForm.value, this.surveyId).subscribe((value) => {
                this.dismissBottomSheet();
                this.utils.sethomepageSurveyRefresh(true);
            }, (error) => {
                this.dismissBottomSheet();
            });
        }
    }
    openSurveyors(id) {
        this.utils.showLoading('Getting Surveyors').then(() => {
            this.apiService.getSurveyors().subscribe(assignees => {
                this.utils.hideLoading().then(() => {
                    this.listOfAssignees = [];
                    assignees.forEach(item => this.listOfAssignees.push(item));
                    this.surveyId = id;
                    this.utils.setBottomBarHomepage(false);
                    this.drawerState = ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_9__["DrawerState"].Docked;
                    console.log(this.listOfAssignees);
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
    getSurveys(event) {
        let showLoader = true;
        if (event != null && event !== undefined) {
            showLoader = false;
        }
        if (this.storage.getUser().role.id === src_app_contants__WEBPACK_IMPORTED_MODULE_13__["ROLES"].Surveyor) {
            this.getSurveyorSurveys(event, showLoader);
        }
        else {
            this.getSurvey(event, showLoader);
        }
    }
};
SurveyComponent.ctorParameters = () => [
    { type: src_app_utilities_service__WEBPACK_IMPORTED_MODULE_4__["UtilitiesService"] },
    { type: src_app_api_service__WEBPACK_IMPORTED_MODULE_5__["ApiService"] },
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_6__["DatePipe"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_7__["NavController"] },
    { type: _ionic_native_launch_navigator_ngx__WEBPACK_IMPORTED_MODULE_8__["LaunchNavigator"] },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_10__["FormBuilder"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ChangeDetectorRef"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_11__["Router"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_11__["ActivatedRoute"] },
    { type: src_app_storage_service__WEBPACK_IMPORTED_MODULE_12__["StorageService"] }
];
SurveyComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-survey',
        template: _raw_loader_survey_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_survey_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], SurveyComponent);

class SurveyDataHelper {
    constructor() {
        this.listOfSurveys = [];
    }
}


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

/***/ "dSo1":
/*!*********************************************!*\
  !*** ./src/app/searchbar/searchbar.page.ts ***!
  \*********************************************/
/*! exports provided: SearchbarPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchbarPage", function() { return SearchbarPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_searchbar_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./searchbar.page.html */ "D+e9");
/* harmony import */ var _searchbar_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./searchbar.page.scss */ "yI5I");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _utilities_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utilities.service */ "oTnF");
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../api.service */ "yTNM");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _storage_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../storage.service */ "qkCY");
/* harmony import */ var _ionic_native_diagnostic_ngx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic-native/diagnostic/ngx */ "mtRb");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _ionic_native_geolocation_ngx__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ionic-native/geolocation/ngx */ "Bfh1");
/* harmony import */ var _ionic_native_native_geocoder_ngx__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ionic-native/native-geocoder/ngx */ "h+qT");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _contants__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../contants */ "6qqZ");
/* harmony import */ var _homepage_design_design_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../homepage/design/design.component */ "4JZt");
















let SearchbarPage = class SearchbarPage {
    constructor(utilities, apiService, nativeGeocoder, platform, datePipe, storage, diagnostic, alertController, geolocation, toastController, route) {
        this.utilities = utilities;
        this.apiService = apiService;
        this.nativeGeocoder = nativeGeocoder;
        this.platform = platform;
        this.datePipe = datePipe;
        this.storage = storage;
        this.diagnostic = diagnostic;
        this.alertController = alertController;
        this.geolocation = geolocation;
        this.toastController = toastController;
        this.route = route;
        this.parentSubject = new rxjs__WEBPACK_IMPORTED_MODULE_12__["Subject"]();
        this.ionInput = new _angular_core__WEBPACK_IMPORTED_MODULE_3__["EventEmitter"]();
        this.searchQuery = '';
        this.searchbarElement = '';
        this.isUserSurveyor = false;
        this.isUserDesigner = false;
        this.showSearchBar = false;
        this.showHome = true;
        this.showFooter = true;
        // Geocoder configuration
        this.geoEncoderOptions = {
            useLocale: true,
            maxResults: 5
        };
        this.searchDesginItem = [];
        this.searchSurveyItem = [];
        this.pageType = '';
    }
    ngOnInit() {
        // this.setupCometChatUser();
        // this.requestLocationPermission();
        // this.updateUserPushToken();
        // this.subscription = this.utilities.getBottomBarHomepage().subscribe((value) => {
        //   this.showFooter = value;
        // });
        if (this.storage.getUser().role.id === _contants__WEBPACK_IMPORTED_MODULE_14__["ROLES"].Surveyor) {
            // surveyor will only see survey tab
            this.isUserSurveyor = true;
            this.isUserDesigner = false;
            this.route.navigate(['searchbar/survey']);
        }
        else if (this.storage.getUser().role.id === _contants__WEBPACK_IMPORTED_MODULE_14__["ROLES"].Designer) {
            // designer will only see design tab
            this.isUserSurveyor = false;
            this.isUserDesigner = true;
            this.route.navigate(['searchbar/design']);
        }
        else if (this.storage.getUser().role.id === _contants__WEBPACK_IMPORTED_MODULE_14__["ROLES"].BD || this.storage.getUser().role.id === _contants__WEBPACK_IMPORTED_MODULE_14__["ROLES"].Admin || this.storage.getUser().role.id === _contants__WEBPACK_IMPORTED_MODULE_14__["ROLES"].ContractorAdmin) {
            // admin will see both tabs
            this.isUserSurveyor = true;
            this.isUserDesigner = true;
            this.route.navigate(['searchbar/design']);
        }
    }
    ngOnDestroy() {
        // this.subscription.unsubscribe();
    }
    getItems(ev) {
        // set val to the value of the searchbar
        const val = ev.target.value;
        // if the value is an empty string don't filter the items
        if (val && val.trim() !== '') {
            this.items = this.items.filter((item) => {
                return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }
    }
    searchDesginAndSurvey(event) {
        console.log(event, this.searchbarElement);
        if (this.searchbarElement !== '') {
            this.apiService.searchAllDesgin(this.searchbarElement).subscribe((searchModel) => {
                console.log(searchModel);
                // console.log(searchModel.design);
                // this.searchDesginItem = [];
                // this.searchSurveyItem = [];
                if (event.target.value !== '') {
                    // searchModel.filter((element: any) => {
                    // if (this == 'design') {
                    if (this.route.url == '/searchbar/design') {
                        this.searchDesginItem = searchModel.design;
                    }
                    else {
                        this.searchSurveyItem = searchModel.survey;
                    }
                    console.log(this.searchDesginItem);
                    // });
                    console.log(this.searchSurveyItem);
                }
                else {
                    this.searchDesginItem = [];
                    this.searchSurveyItem = [];
                }
            }, (error) => {
                console.log(error);
            });
        }
        else {
            this.route.navigate(['searchbar/design']);
        }
    }
    getdesigndata(serchTermData = { 'type': '' }) {
        console.log(serchTermData);
        this.name = serchTermData.name == undefined ? '' : serchTermData.name;
        this.searchbarElement = this.name;
        if (this.route.url == '/searchbar/design') {
            this.pageType = 'Design';
            // this.parentSubject.next(serchTermData.id);
            this.route.navigate(['searchbar/design'], { queryParams: { serchTerm: serchTermData.id } });
        }
        else if (this.route.url == '/searchbar/survey') {
            this.pageType = 'Survey';
            // this.parentSubject.next(serchTermData.id);
            this.route.navigate(['/searchbar/survey'], { queryParams: { serchTerm: serchTermData.id } });
        }
        else {
            if (this.pageType == 'Survey') {
                this.route.navigate(['searchbar/survey']);
            }
            else if (this.pageType == 'Design') {
                this.route.navigate(['searchbar/design']);
            }
        }
        this.searchDesginItem = [];
        this.searchSurveyItem = [];
    }
    searchbar() {
        this.route.navigate(['/searchbar/design']);
    }
    requestLocationPermission() {
        this.platform.ready().then(() => {
            this.diagnostic.requestLocationAuthorization(this.diagnostic.locationAuthorizationMode.WHEN_IN_USE).then((mode) => {
                console.log(mode);
                switch (mode) {
                    case this.diagnostic.permissionStatus.NOT_REQUESTED:
                        // this.goBack();
                        break;
                    case this.diagnostic.permissionStatus.DENIED_ALWAYS:
                        this.showLocationDenied();
                        break;
                    case this.diagnostic.permissionStatus.DENIED_ONCE:
                        // this.goBack();
                        break;
                    case this.diagnostic.permissionStatus.GRANTED:
                        this.fetchLocation();
                        break;
                    case this.diagnostic.permissionStatus.GRANTED_WHEN_IN_USE:
                        this.fetchLocation();
                        break;
                    case 'authorized_when_in_use':
                        this.fetchLocation();
                        break;
                }
            }, (rejection) => {
                console.log(rejection);
            });
        });
    }
    showLocationDenied() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const toast = yield this.toastController.create({
                header: 'Error',
                message: 'Location services denied, please enable them manually',
                cssClass: 'my-custom-class',
                buttons: [
                    {
                        text: 'OK',
                        handler: () => {
                        }
                    }
                ]
            });
            toast.present();
        });
    }
    fetchLocation() {
        this.diagnostic.isGpsLocationEnabled().then((status) => {
            if (status === true) {
                // this.utilities.showLoading('Getting Location').then(() => {
                this.getGeoLocation();
                // });
            }
            else {
                this.askToChangeSettings();
            }
        });
    }
    askToChangeSettings() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const toast = yield this.toastController.create({
                header: 'Location Disabled',
                message: 'Please enable location services',
                cssClass: 'my-custom-class',
                buttons: [
                    {
                        text: 'OK',
                        handler: () => {
                            this.changeLocationSettings();
                        }
                    }, {
                        text: 'Cancel',
                        handler: () => {
                        }
                    }
                ]
            });
            toast.present();
        });
    }
    getGeoLocation() {
        this.geolocation.getCurrentPosition().then((resp) => {
            console.log('resp', resp);
            this.getGeoEncoder(resp.coords.latitude, resp.coords.longitude);
        }).catch((error) => {
            this.utilities.errorSnackBar('Unable to get location');
            console.log('Error getting location', error);
            this.showNoLocation();
        });
    }
    getGeoEncoder(latitude, longitude) {
        // this.utilities.hideLoading().then((success) => {
        this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geoEncoderOptions)
            .then((result) => {
            console.log('resu', result);
            const address = {
                address: this.generateAddress(result[0]),
                lat: latitude,
                long: longitude,
                country: result[0].countryName,
                state: result[0].administrativeArea,
                city: result[0].locality,
                postalcode: result[0].postalCode
            };
            this.utilities.setAddress(address);
        })
            .catch((error) => {
            this.showNoLocation();
            alert('Error getting location' + JSON.stringify(error));
        });
    }
    generateAddress(addressObj) {
        const obj = [];
        let address = '';
        for (const key in addressObj) {
            obj.push(addressObj[key]);
        }
        obj.reverse();
        for (const val in obj) {
            if (obj[val].length) {
                address += obj[val] + ', ';
            }
        }
        return address.slice(0, -2);
    }
    changeLocationSettings() {
        this.diagnostic.switchToLocationSettings();
        this.diagnostic.registerLocationStateChangeHandler((state) => {
            console.log(state);
            if ((this.platform.is('android') && state !== this.diagnostic.locationMode.LOCATION_OFF)) {
                this.checkLocationAccess();
            }
        });
    }
    checkLocationAccess() {
        console.log('Getting location');
        this.diagnostic.isLocationAuthorized().then((success) => {
            this.fetchLocation();
        }, (error) => {
            this.utilities.errorSnackBar('GPS Not Allowed');
        });
    }
    showNoLocation() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                header: 'Error',
                subHeader: 'Unable to get location',
                buttons: [
                    {
                        text: 'OK',
                        handler: () => {
                            // this.goBack();
                        }
                    }
                ],
                backdropDismiss: false
            });
            yield alert.present();
        });
    }
    ionViewDidEnter() {
        this.subscription = this.platform.backButton.subscribe(() => {
            if (this.showSearchBar === true) {
                this.showSearchBar = false;
            }
            else {
                // (navigator as any).app.exitApp();
            }
        });
    }
    ionViewWillLeave() {
        this.subscription.unsubscribe();
    }
    showHom() {
        // this.someEvent.emit('cancle');
        this.showHome = true;
        this.showSearchBar = false;
        this.searchSurveyItem = [];
        this.searchDesginItem = [];
        this.searchbarElement = '';
        this.getdesigndata();
    }
    onClick() {
        this.showHome = false;
        this.showSearchBar = true;
    }
};
SearchbarPage.ctorParameters = () => [
    { type: _utilities_service__WEBPACK_IMPORTED_MODULE_4__["UtilitiesService"] },
    { type: _api_service__WEBPACK_IMPORTED_MODULE_5__["ApiService"] },
    { type: _ionic_native_native_geocoder_ngx__WEBPACK_IMPORTED_MODULE_11__["NativeGeocoder"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_9__["Platform"] },
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_6__["DatePipe"] },
    { type: _storage_service__WEBPACK_IMPORTED_MODULE_7__["StorageService"] },
    { type: _ionic_native_diagnostic_ngx__WEBPACK_IMPORTED_MODULE_8__["Diagnostic"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_9__["AlertController"] },
    { type: _ionic_native_geolocation_ngx__WEBPACK_IMPORTED_MODULE_10__["Geolocation"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_9__["ToastController"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_13__["Router"] }
];
SearchbarPage.propDecorators = {
    ionInput: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Output"] }],
    child: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"], args: [_homepage_design_design_component__WEBPACK_IMPORTED_MODULE_15__["DesignComponent"], { static: false },] }]
};
SearchbarPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-searchbar',
        template: _raw_loader_searchbar_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_searchbar_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], SearchbarPage);



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

/***/ "qTTa":
/*!**********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/searchbar/design/design.component.html ***!
  \**********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-content (click)=\"close()\" style=\"padding-bottom: 250px;\">\r\n  <ion-refresher slot=\"fixed\" (ionRefresh)=\"refreshDesigns($event)\">\r\n      <ion-refresher-content></ion-refresher-content>\r\n  </ion-refresher>\r\n  <ion-grid *ngIf=\"listOfDesignDataHelper.length !== 0\">\r\n      <ion-row *ngFor=\"let item of listOfDesignDataHelper;let i = index\" class=\"ion-margin-top\">\r\n          <ion-col size=\"12\">\r\n              <span class=\"ion-padding\" *ngIf=\"today === item.date\">\r\n                  Today\r\n                </span>\r\n              <span class=\"ion-padding\" *ngIf=\"today !== item.date\">\r\n                  {{item.date | date: 'dd MMM yyyy'}}\r\n              </span>\r\n          </ion-col>\r\n          <ion-col *ngFor=\"let designData of item.listOfDesigns;let i = index\" size=\"6\">\r\n            <div class=\"ion-padding custom-card\" style=\"height: 100%;\">\r\n                <span class=\"customer-name\" [routerLink]=\"['/design-details/',designData.id]\"\r\n                        routerDirection=\"forward\">{{designData.name}} </span>\r\n                        <span class=\"ion-text-end timestamp\" [routerLink]=\"['/design-details/',designData.id]\">\r\n                            {{designData.created_at | date: 'hh:mm a'}}\r\n                        </span>\r\n                <span class=\"customer-email\" [routerLink]=\"['/design-details/',designData.id]\"\r\n                        routerDirection=\"forward\">{{designData.email}}</span>\r\n                <a href=\"tel:{{designData.phonenumber}}\" style=\"text-decoration: none;\" class=\"z-100\">\r\n                    <span class=\"customer-phone\">{{designData.phonenumber}}</span></a>\r\n                <span class=\"customer-address z-100\"\r\n                        (click)=\"openAddressOnMap(designData.address)\">{{(designData.address | slice:0:60) + (designData.address.length > 60 ? '...' : '')}}</span>\r\n\r\n                <ion-row style=\"margin-bottom: 8px;\">\r\n                    <!-- <span class=\"chipdetail\" style=\"background-color: #95afc0;\" >Wattmonk</span> -->\r\n                    <!-- <span class=\"chipdetail\" style=\"background-color: #95afc0;\" >{{designData.formattedjobtype}}</span> -->\r\n                    <ion-col>\r\n                        <span class=\"chipdetail\" style=\"background-color: rgb(246, 77, 10);\" *ngIf=\"designData.status == 'reviewfailed'\">Failed</span>\r\n                        <span class=\"chipdetail\" style=\"background-color: rgb(109, 187, 26);\" *ngIf=\"designData.status == 'reviewpassed'\">Passed</span>\r\n                    </ion-col>\r\n                </ion-row>\r\n                <ion-row class=\"ion-no-margin ion-no-margin\">\r\n                    <ion-col>\r\n                        <span *ngIf=\"designData.status == 'created' || designData.status == 'requestaccepted'\" style=\"float:right !important;\" class=\"ion-text-end action-button-color\" (click)=\"openDesigners(designData.id)\"\r\n                        >Assign</span>\r\n                        <span *ngIf=\"designData.status == 'outsourced'\" style=\"float:right !important;\" class=\"ion-text-end action-button-color\" (click)=\"openDesigners(designData.id)\"\r\n                        >Decline</span>\r\n                        <span *ngIf=\"designData.status == 'outsourced'\" style=\"float:right !important;\" class=\"ion-text-end action-button-color\" (click)=\"openDesigners(designData.id)\"\r\n                        >Accept</span>\r\n                        <span *ngIf=\"designData.status == 'requestdeclined'\"style=\"float:right !important;\" class=\"ion-text-end action-button-color\" (click)=\"openDesigners(designData.id)\"\r\n                        >Reassign</span>\r\n                        <span *ngIf=\"designData.status == 'reviewpassed'\" style=\"float:right !important;\" class=\"ion-text-end action-button-color\" (click)=\"openDesigners(designData.id)\"\r\n                        >Deliver</span>\r\n\r\n                    </ion-col>\r\n                    <!-- <ion-col class=\"ion-no-margin ion-no-padding\">\r\n                        <ion-button class=\"ion-no-margin ion-no-padding\" fill=\"clear\" [routerLink]=\"['/surveyprocess/' + designData.id + '/' + designData.jobtype + '/' + designData.latitude + '/' + designData.longitude]\"\r\n                        routerDirection=\"forward\">\r\n                            Restart Survey\r\n                        </ion-button>\r\n                    </ion-col> -->\r\n                </ion-row>\r\n                <!-- <ion-progress-bar [value]=\"1\" mode=\"ios\" color=\"success\" class=\"progress-bar-height\"></ion-progress-bar> -->\r\n                  <!-- <span class=\"ion-text-end timestamp\" [routerLink]=\"['/design-details/',designData.id]\" routerDirection=\"forward\">\r\n                        {{designData.deliverydate | date: 'hh:mm a'}}\r\n\r\n            </span> -->\r\n            </div>\r\n        </ion-col>\r\n      </ion-row>\r\n      <ion-row>\r\n          <ion-col size=\"12\" style=\"height: 100px;\">\r\n          </ion-col>\r\n      </ion-row>\r\n  </ion-grid>\r\n\r\n  <div *ngIf=\"listOfDesignDataHelper.length === 0\" class=\"h-100 d-flex flex-column align-center justify-center\">\r\n      <ion-img src=\"/assets/images/blank.png\" class=\"placeholder\"></ion-img>\r\n  </div>\r\n\r\n</ion-content>\r\n\r\n<ion-bottom-drawer [(state)]=\"drawerState\" [minimumHeight]=\"0\" [dockedHeight]=\"320\" [draggable]=\"false\" [disableDrag]=\"true\"\r\n                 [shouldBounce]=\"true\" [distanceTop]=\"0\" class=\"drawer\" style=\"z-index: 9999 !important;\">\r\n  <form [formGroup]=\"assignForm\">\r\n      <ion-grid class=\"drawer\">\r\n          <ion-row>\r\n              <ion-col size=\"12\">\r\n                  <app-user-selector placeholder=\"Assign\" [assignees]=\"listOfAssignees\"\r\n                                     formControlName=\"assignedto\"></app-user-selector>\r\n              </ion-col>\r\n          </ion-row>\r\n          <ion-row style=\"margin-left: 8px;\">\r\n              <ion-col size=\"12\">\r\n                  <span class=\"input-placeholder\">comments</span>\r\n              </ion-col>\r\n              <ion-col size=\"12\" style=\"padding-top: 0px;\">\r\n                  <ion-textarea style=\"max-width: 98%;\" class=\"ion-no-margin ion-no-padding comment_box\" rows=\"3\"\r\n                                formControlName=\"comment\"></ion-textarea>\r\n              </ion-col>\r\n          </ion-row>\r\n          <ion-row style=\"justify-content: flex-end;\">\r\n              <ion-col size=\"auto\" style=\"padding-top: 0px; margin-right: 6px;\">\r\n                  <ion-button class=\"buttom-drawer-button\" (click)=\"assignToDesigner()\">\r\n                      Confirm\r\n                  </ion-button>\r\n              </ion-col>\r\n          </ion-row>\r\n      </ion-grid>\r\n  </form>\r\n\r\n</ion-bottom-drawer>\r\n");

/***/ }),

/***/ "rMjf":
/*!***********************************************!*\
  !*** ./src/app/searchbar/searchbar.module.ts ***!
  \***********************************************/
/*! exports provided: SearchbarPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchbarPageModule", function() { return SearchbarPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _searchbar_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./searchbar-routing.module */ "u9kb");
/* harmony import */ var _searchbar_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./searchbar.page */ "dSo1");
/* harmony import */ var _utilities_utilities_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utilities/utilities.module */ "egEE");
/* harmony import */ var _ionic_native_diagnostic_ngx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic-native/diagnostic/ngx */ "mtRb");
/* harmony import */ var _ionic_native_native_geocoder_ngx__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic-native/native-geocoder/ngx */ "h+qT");
/* harmony import */ var _ionic_native_launch_navigator_ngx__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ionic-native/launch-navigator/ngx */ "fGQ8");
/* harmony import */ var _design_design_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./design/design.component */ "Fv7t");
/* harmony import */ var _survey_survey_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./survey/survey.component */ "W1J7");
/* harmony import */ var ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ion-bottom-drawer */ "rFvw");














let SearchbarPageModule = class SearchbarPageModule {
};
SearchbarPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _searchbar_routing_module__WEBPACK_IMPORTED_MODULE_5__["SearchbarPageRoutingModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
            _utilities_utilities_module__WEBPACK_IMPORTED_MODULE_7__["UtilitiesModule"],
            ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_13__["IonBottomDrawerModule"],
        ],
        declarations: [_searchbar_page__WEBPACK_IMPORTED_MODULE_6__["SearchbarPage"], _design_design_component__WEBPACK_IMPORTED_MODULE_11__["DesignComponent"], _survey_survey_component__WEBPACK_IMPORTED_MODULE_12__["SurveyComponent"]],
        providers: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["DatePipe"],
            _ionic_native_diagnostic_ngx__WEBPACK_IMPORTED_MODULE_8__["Diagnostic"],
            _ionic_native_native_geocoder_ngx__WEBPACK_IMPORTED_MODULE_9__["NativeGeocoder"],
            _ionic_native_launch_navigator_ngx__WEBPACK_IMPORTED_MODULE_10__["LaunchNavigator"]
        ]
    })
], SearchbarPageModule);



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

/***/ "u9kb":
/*!*******************************************************!*\
  !*** ./src/app/searchbar/searchbar-routing.module.ts ***!
  \*******************************************************/
/*! exports provided: SearchbarPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchbarPageRoutingModule", function() { return SearchbarPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _searchbar_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./searchbar.page */ "dSo1");
/* harmony import */ var _design_design_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./design/design.component */ "Fv7t");
/* harmony import */ var _survey_survey_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./survey/survey.component */ "W1J7");






const routes = [
    {
        path: '',
        component: _searchbar_page__WEBPACK_IMPORTED_MODULE_3__["SearchbarPage"],
        children: [
            {
                path: 'design',
                component: _design_design_component__WEBPACK_IMPORTED_MODULE_4__["DesignComponent"]
            },
            {
                path: 'survey',
                component: _survey_survey_component__WEBPACK_IMPORTED_MODULE_5__["SurveyComponent"]
            }
        ]
    }
];
let SearchbarPageRoutingModule = class SearchbarPageRoutingModule {
};
SearchbarPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], SearchbarPageRoutingModule);



/***/ }),

/***/ "yI5I":
/*!***********************************************!*\
  !*** ./src/app/searchbar/searchbar.page.scss ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".notification-icon {\n  width: 24px;\n  height: 24px;\n}\n\n.home {\n  font-size: 22px;\n  margin-left: 6px;\n}\n\n.notification-badge {\n  font-size: 10px;\n  margin-left: -15px;\n  margin-top: -20px;\n}\n\n.notification-padding {\n  position: relative;\n  padding: 8px;\n}\n\n.badge {\n  width: 18px;\n  height: 18px;\n  position: absolute;\n  top: 0;\n  right: 0;\n  background: #3c78d8;\n  color: white;\n  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.5);\n  border-radius: 50%;\n  font-size: 0.5em;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: 1px solid white;\n}\n\nion-searchbar.custom {\n  --background: none;\n  --box-shadow: none;\n  background: white;\n  border-radius: 0.5em;\n  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);\n  max-height: 40px;\n}\n\n.titleTab {\n  text-align: center;\n  color: #898989;\n}\n\n.titleBorder {\n  width: 70px;\n  border-bottom: 3px solid #D9726D;\n  border-radius: 2px;\n}\n\n.cardText {\n  margin: 0px;\n}\n\n.card_detail {\n  margin: 0px;\n  color: #3960B8;\n}\n\n.search_loc {\n  font-size: 14px;\n  color: #3960B8;\n}\n\n.search_text_div {\n  display: flex;\n  justify-content: space-between;\n}\n\n.survey_div {\n  border: 1px solid #FAE0C3;\n  padding: 6px;\n  background-color: #FAE0C3;\n  border-radius: 5px;\n}\n\n.nodata_div {\n  max-width: 290px !important;\n  width: 290px !important;\n}\n\n.search_text {\n  color: #9E9E9E;\n}\n\n.tab {\n  padding-top: 1em;\n  padding-bottom: 1em;\n  padding-bottom: 1em;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.bottom-bar {\n  margin: 8px;\n  border-radius: 50px;\n  box-shadow: 0 -2px 8px 0 rgba(0, 0, 0, 0.1);\n  border: 2px solid white;\n  background: #FFFAEB;\n}\n\n.tabText {\n  margin-left: 8px;\n  font-size: 1em;\n}\n\n.tab-icon {\n  width: 24px;\n  height: 24px;\n}\n\n.fab-position {\n  bottom: 48px;\n}\n\nion-fab-button {\n  --border-width: 2px;\n  --border-style: solid;\n  --box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.3);\n  --border-color: white;\n  --background: #3c78d8;\n}\n\nion-tab-bar {\n  --border: none;\n}\n\nion-tab-button {\n  font-size: 1em;\n  --color: #9E9E9E;\n  --color-selected: #3c78d8;\n}\n\nion-tab-button[aria-selected=true] {\n  border-bottom: 3px solid #3c78d8;\n  border-bottom-left-radius: 2px;\n  border-bottom-right-radius: 2px;\n}\n\n.searchbar_div {\n  box-shadow: 0 4px 3px 0 rgba(0, 0, 0, 0.1);\n  border-radius: 4px;\n  margin-top: -24px;\n  width: 94%;\n  margin-left: 5px;\n  background: white;\n  max-width: 94%;\n}\n\n.profile-icon {\n  width: 50px;\n  height: 50px;\n  margin-right: 3px;\n  margin-left: -7px;\n}\n\n.history-name {\n  font-size: 16px;\n  color: #787574;\n}\n\n.history-add {\n  color: #CFCBCA;\n  font-size: 14px;\n}\n\n.assign {\n  font-size: 14px;\n  color: #878382;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXHNlYXJjaGJhci5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUE7RUFDSSxXQUFBO0VBQ0EsWUFBQTtBQURKOztBQUlBO0VBQ0ksZUFBQTtFQUNBLGdCQUFBO0FBREo7O0FBSUE7RUFDSSxlQUFBO0VBQ0Esa0JBQUE7RUFDQSxpQkFBQTtBQURKOztBQUlBO0VBQ0ksa0JBQUE7RUFDQSxZQUFBO0FBREo7O0FBSUE7RUFDSSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0EsTUFBQTtFQUNBLFFBQUE7RUFDQSxtQkFBQTtFQUNBLFlBQUE7RUFDQSwwQ0FBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLHVCQUFBO0FBREo7O0FBSUE7RUFDSSxrQkFBQTtFQUNBLGtCQUFBO0VBQ0EsaUJBQUE7RUFDQSxvQkFBQTtFQUNBLDBDQUFBO0VBQ0EsZ0JBQUE7QUFESjs7QUFLQTtFQUNJLGtCQUFBO0VBQ0EsY0FBQTtBQUZKOztBQU1BO0VBQ0ksV0FBQTtFQUNBLGdDQUFBO0VBQ0Esa0JBQUE7QUFISjs7QUFNQTtFQUNJLFdBQUE7QUFISjs7QUFNQTtFQUNJLFdBQUE7RUFDQSxjQUFBO0FBSEo7O0FBTUE7RUFDSSxlQUFBO0VBQ0EsY0FBQTtBQUhKOztBQU1BO0VBQ0ksYUFBQTtFQUNBLDhCQUFBO0FBSEo7O0FBTUE7RUFDSSx5QkFBQTtFQUNBLFlBQUE7RUFDQSx5QkFBQTtFQUNBLGtCQUFBO0FBSEo7O0FBTUE7RUFDSSwyQkFBQTtFQUNBLHVCQUFBO0FBSEo7O0FBTUE7RUFDSSxjQUFBO0FBSEo7O0FBYUE7RUFDSSxnQkFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtBQVZKOztBQWFBO0VBQ0ksV0FBQTtFQUNBLG1CQUFBO0VBQ0EsMkNBQUE7RUFDQSx1QkFBQTtFQUNBLG1CQUFBO0FBVko7O0FBYUE7RUFDSSxnQkFBQTtFQUNBLGNBQUE7QUFWSjs7QUFhQTtFQUNJLFdBQUE7RUFDQSxZQUFBO0FBVko7O0FBYUE7RUFDSSxZQUFBO0FBVko7O0FBYUE7RUFDSSxtQkFBQTtFQUNBLHFCQUFBO0VBQ0EsNENBQUE7RUFDQSxxQkFBQTtFQUNBLHFCQUFBO0FBVko7O0FBYUE7RUFDSSxjQUFBO0FBVko7O0FBYUE7RUFDSSxjQUFBO0VBQ0EsZ0JBQUE7RUFDQSx5QkFBQTtBQVZKOztBQWFBO0VBQ0ksZ0NBQUE7RUFDQSw4QkFBQTtFQUNBLCtCQUFBO0FBVko7O0FBYUE7RUFDSSwwQ0FBQTtFQUNBLGtCQUFBO0VBQ0EsaUJBQUE7RUFDQSxVQUFBO0VBQ0EsZ0JBQUE7RUFDQSxpQkFBQTtFQUNBLGNBQUE7QUFWSjs7QUFjQTtFQUNJLFdBQUE7RUFDQSxZQUFBO0VBQ0EsaUJBQUE7RUFDQSxpQkFBQTtBQVhKOztBQWVFO0VBQ0UsZUFBQTtFQUNBLGNBQUE7QUFaSjs7QUFlRTtFQUNFLGNBQUE7RUFDRSxlQUFBO0FBWk47O0FBZUU7RUFDSSxlQUFBO0VBQ0EsY0FBQTtBQVpOIiwiZmlsZSI6InNlYXJjaGJhci5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuXHJcbi5ub3RpZmljYXRpb24taWNvbiB7XHJcbiAgICB3aWR0aDogMjRweDtcclxuICAgIGhlaWdodDogMjRweDtcclxufVxyXG5cclxuLmhvbWV7XHJcbiAgICBmb250LXNpemU6IDIycHg7XHJcbiAgICBtYXJnaW4tbGVmdDogNnB4O1xyXG59XHJcblxyXG4ubm90aWZpY2F0aW9uLWJhZGdlIHtcclxuICAgIGZvbnQtc2l6ZTogMTBweDtcclxuICAgIG1hcmdpbi1sZWZ0OiAtMTVweDtcclxuICAgIG1hcmdpbi10b3A6IC0yMHB4O1xyXG59XHJcblxyXG4ubm90aWZpY2F0aW9uLXBhZGRpbmcge1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgcGFkZGluZzogOHB4O1xyXG59XHJcblxyXG4uYmFkZ2Uge1xyXG4gICAgd2lkdGg6IDE4cHg7XHJcbiAgICBoZWlnaHQ6IDE4cHg7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICB0b3A6IDA7XHJcbiAgICByaWdodDogMDtcclxuICAgIGJhY2tncm91bmQ6ICMzYzc4ZDg7XHJcbiAgICBjb2xvcjogd2hpdGU7XHJcbiAgICBib3gtc2hhZG93OiAwIDFweCAzcHggMCByZ2JhKDAsIDAsIDAsIDAuNSk7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgICBmb250LXNpemU6IDAuNWVtO1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkIHdoaXRlO1xyXG59XHJcblxyXG5pb24tc2VhcmNoYmFyLmN1c3RvbSB7XHJcbiAgICAtLWJhY2tncm91bmQ6IG5vbmU7XHJcbiAgICAtLWJveC1zaGFkb3c6IG5vbmU7XHJcbiAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcclxuICAgIGJvcmRlci1yYWRpdXM6IDAuNWVtO1xyXG4gICAgYm94LXNoYWRvdzogMCAxcHggM3B4IDAgcmdiYSgwLCAwLCAwLCAwLjEpO1xyXG4gICAgbWF4LWhlaWdodDogNDBweDtcclxufVxyXG5cclxuXHJcbi50aXRsZVRhYiB7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBjb2xvcjogIzg5ODk4OTtcclxuICAgIC8vICAgICBib3JkZXItYm90dG9tOiAycHggc29saWQgI0Q5NzI2RDtcclxufVxyXG5cclxuLnRpdGxlQm9yZGVyIHtcclxuICAgIHdpZHRoOiA3MHB4O1xyXG4gICAgYm9yZGVyLWJvdHRvbTogM3B4IHNvbGlkICNEOTcyNkQ7XHJcbiAgICBib3JkZXItcmFkaXVzOiAycHg7XHJcbn1cclxuXHJcbi5jYXJkVGV4dCB7XHJcbiAgICBtYXJnaW46IDBweDtcclxufVxyXG5cclxuLmNhcmRfZGV0YWlsIHtcclxuICAgIG1hcmdpbjogMHB4O1xyXG4gICAgY29sb3I6ICMzOTYwQjg7XHJcbn1cclxuXHJcbi5zZWFyY2hfbG9jIHtcclxuICAgIGZvbnQtc2l6ZTogMTRweDtcclxuICAgIGNvbG9yOiAjMzk2MEI4O1xyXG59XHJcblxyXG4uc2VhcmNoX3RleHRfZGl2IHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbn1cclxuXHJcbi5zdXJ2ZXlfZGl2IHtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNGQUUwQzM7XHJcbiAgICBwYWRkaW5nOiA2cHg7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkFFMEMzO1xyXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG59XHJcblxyXG4ubm9kYXRhX2RpdntcclxuICAgIG1heC13aWR0aDogMjkwcHggIWltcG9ydGFudDtcclxuICAgIHdpZHRoOiAyOTBweCAhaW1wb3J0YW50O1xyXG59XHJcblxyXG4uc2VhcmNoX3RleHQge1xyXG4gICAgY29sb3I6ICM5RTlFOUU7XHJcbn1cclxuXHJcbi8vLmlvbi10YWItYmFyLnRhYnN0eWxlIHtcclxuLy8gICAgLS1iYWNrZ3JvdW5kOiBub25lO1xyXG4vLyAgICAtLWJveC1zaGFkb3c6IG5vbmU7XHJcbi8vICAgIGJveC1zaGFkb3c6IDAgMXB4IDNweCAwIHJnYmEoMCwgMCwgMCwgMC41KTtcclxuLy8gICAgYmFja2dyb3VuZDogI0ZGRkFFQjtcclxuLy99XHJcblxyXG4udGFiIHtcclxuICAgIHBhZGRpbmctdG9wOiAxZW07XHJcbiAgICBwYWRkaW5nLWJvdHRvbTogMWVtO1xyXG4gICAgcGFkZGluZy1ib3R0b206IDFlbTtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbn1cclxuXHJcbi5ib3R0b20tYmFyIHtcclxuICAgIG1hcmdpbjogOHB4O1xyXG4gICAgYm9yZGVyLXJhZGl1czogNTBweDtcclxuICAgIGJveC1zaGFkb3c6IDAgLTJweCA4cHggMCByZ2JhKDAsIDAsIDAsIDAuMSk7XHJcbiAgICBib3JkZXI6IDJweCBzb2xpZCB3aGl0ZTtcclxuICAgIGJhY2tncm91bmQ6ICNGRkZBRUI7XHJcbn1cclxuXHJcbi50YWJUZXh0IHtcclxuICAgIG1hcmdpbi1sZWZ0OiA4cHg7XHJcbiAgICBmb250LXNpemU6IDFlbTtcclxufVxyXG5cclxuLnRhYi1pY29uIHtcclxuICAgIHdpZHRoOiAyNHB4O1xyXG4gICAgaGVpZ2h0OiAyNHB4O1xyXG59XHJcblxyXG4uZmFiLXBvc2l0aW9uIHtcclxuICAgIGJvdHRvbTogNDhweDtcclxufVxyXG5cclxuaW9uLWZhYi1idXR0b24ge1xyXG4gICAgLS1ib3JkZXItd2lkdGg6IDJweDtcclxuICAgIC0tYm9yZGVyLXN0eWxlOiBzb2xpZDtcclxuICAgIC0tYm94LXNoYWRvdzogMCAwcHggOHB4IDAgcmdiYSgwLCAwLCAwLCAwLjMpO1xyXG4gICAgLS1ib3JkZXItY29sb3I6IHdoaXRlO1xyXG4gICAgLS1iYWNrZ3JvdW5kOiAjM2M3OGQ4O1xyXG59XHJcblxyXG5pb24tdGFiLWJhciB7XHJcbiAgICAtLWJvcmRlcjogbm9uZTtcclxufVxyXG5cclxuaW9uLXRhYi1idXR0b24ge1xyXG4gICAgZm9udC1zaXplOiAxZW07XHJcbiAgICAtLWNvbG9yOiAjOUU5RTlFO1xyXG4gICAgLS1jb2xvci1zZWxlY3RlZDogIzNjNzhkODtcclxufVxyXG5cclxuaW9uLXRhYi1idXR0b25bYXJpYS1zZWxlY3RlZD10cnVlXSB7XHJcbiAgICBib3JkZXItYm90dG9tOiAzcHggc29saWQgIzNjNzhkODtcclxuICAgIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDJweDtcclxuICAgIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAycHg7XHJcbn1cclxuXHJcbi5zZWFyY2hiYXJfZGl2e1xyXG4gICAgYm94LXNoYWRvdzogMCA0cHggM3B4IDAgcmdiYSgwLCAwLCAwLCAwLjEpO1xyXG4gICAgYm9yZGVyLXJhZGl1czogNHB4O1xyXG4gICAgbWFyZ2luLXRvcDogLTI0cHg7XHJcbiAgICB3aWR0aDogOTQlO1xyXG4gICAgbWFyZ2luLWxlZnQ6IDVweDtcclxuICAgIGJhY2tncm91bmQ6IHdoaXRlO1xyXG4gICAgbWF4LXdpZHRoOiA5NCU7XHJcbn1cclxuXHJcblxyXG4ucHJvZmlsZS1pY29ue1xyXG4gICAgd2lkdGg6IDUwcHg7XHJcbiAgICBoZWlnaHQ6IDUwcHg7XHJcbiAgICBtYXJnaW4tcmlnaHQ6IDNweDtcclxuICAgIG1hcmdpbi1sZWZ0OiAtN3B4O1xyXG4gICBcclxuICB9XHJcblxyXG4gIC5oaXN0b3J5LW5hbWV7XHJcbiAgICBmb250LXNpemU6IDE2cHg7IFxyXG4gICAgY29sb3I6ICM3ODc1NzQ7XHJcbiAgfVxyXG5cclxuICAuaGlzdG9yeS1hZGR7XHJcbiAgICBjb2xvcjogI0NGQ0JDQTtcclxuICAgICAgZm9udC1zaXplOiAxNHB4O1xyXG4gIH1cclxuXHJcbiAgLmFzc2lnbntcclxuICAgICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgICBjb2xvcjogIzg3ODM4MjtcclxuICB9XHJcbiJdfQ== */");

/***/ })

}]);
//# sourceMappingURL=searchbar-searchbar-module.js.map