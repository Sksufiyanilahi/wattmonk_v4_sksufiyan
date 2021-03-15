(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["surveyoroverview-surveyoroverview-module"],{

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

/***/ "/dLQ":
/*!*************************************************************!*\
  !*** ./src/app/surveyoroverview/surveyoroverview.module.ts ***!
  \*************************************************************/
/*! exports provided: SurveyoroverviewPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SurveyoroverviewPageModule", function() { return SurveyoroverviewPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _surveyoroverview_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./surveyoroverview-routing.module */ "rQG+");
/* harmony import */ var _surveyoroverview_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./surveyoroverview.page */ "R8mZ");
/* harmony import */ var _newsurveys_newsurveys_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./newsurveys/newsurveys.component */ "xlbG");
/* harmony import */ var _completedsurveys_completedsurveys_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./completedsurveys/completedsurveys.component */ "Tt43");
/* harmony import */ var _inreviewsurveys_inreviewsurveys_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./inreviewsurveys/inreviewsurveys.component */ "ig5R");
/* harmony import */ var _deliveredsurveys_deliveredsurveys_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./deliveredsurveys/deliveredsurveys.component */ "fZ9P");
/* harmony import */ var _ionic_native_diagnostic_ngx__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ionic-native/diagnostic/ngx */ "mtRb");
/* harmony import */ var _ionic_native_native_geocoder_ngx__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ionic-native/native-geocoder/ngx */ "h+qT");
/* harmony import */ var _ionic_native_launch_navigator_ngx__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @ionic-native/launch-navigator/ngx */ "fGQ8");














let SurveyoroverviewPageModule = class SurveyoroverviewPageModule {
};
SurveyoroverviewPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _surveyoroverview_routing_module__WEBPACK_IMPORTED_MODULE_5__["SurveyoroverviewPageRoutingModule"]
        ],
        declarations: [_surveyoroverview_page__WEBPACK_IMPORTED_MODULE_6__["SurveyoroverviewPage"], _newsurveys_newsurveys_component__WEBPACK_IMPORTED_MODULE_7__["NewsurveysComponent"], _completedsurveys_completedsurveys_component__WEBPACK_IMPORTED_MODULE_8__["CompletedsurveysComponent"], _inreviewsurveys_inreviewsurveys_component__WEBPACK_IMPORTED_MODULE_9__["InreviewsurveysComponent"], _deliveredsurveys_deliveredsurveys_component__WEBPACK_IMPORTED_MODULE_10__["DeliveredsurveysComponent"]],
        providers: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["DatePipe"],
            _ionic_native_diagnostic_ngx__WEBPACK_IMPORTED_MODULE_11__["Diagnostic"],
            _ionic_native_native_geocoder_ngx__WEBPACK_IMPORTED_MODULE_12__["NativeGeocoder"],
            _ionic_native_launch_navigator_ngx__WEBPACK_IMPORTED_MODULE_13__["LaunchNavigator"]
        ]
    })
], SurveyoroverviewPageModule);



/***/ }),

/***/ "0Lav":
/*!***********************************************************************************!*\
  !*** ./src/app/surveyoroverview/completedsurveys/completedsurveys.component.scss ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".custom-card {\n  display: flex;\n  flex-direction: column;\n  background: white;\n  border-radius: 4px;\n  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.3);\n  padding: 8px 12px;\n}\n\n.customer-name {\n  font-size: 1em;\n  color: #434343;\n  font-weight: bold;\n  display: table;\n  margin: 0px;\n}\n\n.customer-email {\n  font-size: 0.8em;\n  color: #B4B4B4;\n}\n\n.customer-phone {\n  font-size: 0.8em;\n  color: #4272B9;\n}\n\n.customer-address {\n  margin-top: 16px;\n  margin-bottom: 16px;\n  font-size: 0.8em;\n  color: #4272B9;\n}\n\n.timestamp {\n  font-size: 0.7em;\n}\n\n.latebystyle {\n  float: right;\n  font-size: 10px;\n  color: #3C78DB;\n}\n\n.chipdetail {\n  display: inline;\n  vertical-align: middle;\n  background-color: #95afc0;\n  font-size: 0.6em;\n  padding: 4px 10px;\n  border-radius: 10px;\n  text-align: center;\n  color: #fff;\n}\n\n.imagebutton {\n  float: right;\n  margin-top: 0px;\n}\n\n.recordupdatedon {\n  float: right;\n  font-size: 10px;\n  font-style: italic;\n  text-align: right;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFxjb21wbGV0ZWRzdXJ2ZXlzLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksYUFBQTtFQUNBLHNCQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLDBDQUFBO0VBQ0EsaUJBQUE7QUFDSjs7QUFFRTtFQUNFLGNBQUE7RUFDQSxjQUFBO0VBQ0EsaUJBQUE7RUFDQSxjQUFBO0VBQ0EsV0FBQTtBQUNKOztBQUVFO0VBQ0UsZ0JBQUE7RUFDQSxjQUFBO0FBQ0o7O0FBRUU7RUFDRSxnQkFBQTtFQUNBLGNBQUE7QUFDSjs7QUFFRTtFQUNFLGdCQUFBO0VBQ0EsbUJBQUE7RUFDQSxnQkFBQTtFQUNBLGNBQUE7QUFDSjs7QUFFRTtFQUNFLGdCQUFBO0FBQ0o7O0FBRUU7RUFDRSxZQUFBO0VBQ0EsZUFBQTtFQUNBLGNBQUE7QUFDSjs7QUFFRTtFQUNFLGVBQUE7RUFDQSxzQkFBQTtFQUNBLHlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxpQkFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxXQUFBO0FBQ0o7O0FBQ0E7RUFDRSxZQUFBO0VBQ0EsZUFBQTtBQUVGOztBQUFBO0VBQ0UsWUFBQTtFQUNBLGVBQUE7RUFDQSxrQkFBQTtFQUNBLGlCQUFBO0FBR0YiLCJmaWxlIjoiY29tcGxldGVkc3VydmV5cy5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jdXN0b20tY2FyZCB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIGJhY2tncm91bmQ6IHdoaXRlO1xyXG4gICAgYm9yZGVyLXJhZGl1czogNHB4O1xyXG4gICAgYm94LXNoYWRvdzogMCAxcHggMnB4IDAgcmdiYSgwLCAwLCAwLCAwLjMpO1xyXG4gICAgcGFkZGluZzogOHB4IDEycHg7XHJcbiAgfVxyXG4gIFxyXG4gIC5jdXN0b21lci1uYW1lIHtcclxuICAgIGZvbnQtc2l6ZTogMWVtO1xyXG4gICAgY29sb3I6ICM0MzQzNDM7XHJcbiAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgIGRpc3BsYXk6dGFibGU7XHJcbiAgICBtYXJnaW46IDBweDtcclxuICB9XHJcbiAgXHJcbiAgLmN1c3RvbWVyLWVtYWlsIHtcclxuICAgIGZvbnQtc2l6ZTogMC44ZW07XHJcbiAgICBjb2xvcjogI0I0QjRCNDtcclxuICB9XHJcbiAgXHJcbiAgLmN1c3RvbWVyLXBob25lIHtcclxuICAgIGZvbnQtc2l6ZTogMC44ZW07XHJcbiAgICBjb2xvcjogIzQyNzJCOTtcclxuICB9XHJcbiAgXHJcbiAgLmN1c3RvbWVyLWFkZHJlc3Mge1xyXG4gICAgbWFyZ2luLXRvcDogMTZweDtcclxuICAgIG1hcmdpbi1ib3R0b206IDE2cHg7XHJcbiAgICBmb250LXNpemU6IDAuOGVtO1xyXG4gICAgY29sb3I6ICM0MjcyQjk7XHJcbiAgfVxyXG4gIFxyXG4gIC50aW1lc3RhbXAge1xyXG4gICAgZm9udC1zaXplOiAwLjdlbTtcclxuICB9XHJcbiAgXHJcbiAgLmxhdGVieXN0eWxle1xyXG4gICAgZmxvYXQ6IHJpZ2h0OyBcclxuICAgIGZvbnQtc2l6ZTogMTBweDtcclxuICAgIGNvbG9yOiAjM0M3OERCO1xyXG4gIH1cclxuICBcclxuICAuY2hpcGRldGFpbHtcclxuICAgIGRpc3BsYXk6IGlubGluZTtcclxuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjOTVhZmMwO1xyXG4gICAgZm9udC1zaXplOiAwLjZlbTtcclxuICAgIHBhZGRpbmc6IDRweCAxMHB4O1xyXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIGNvbG9yOiAjZmZmO1xyXG59XHJcbi5pbWFnZWJ1dHRvbntcclxuICBmbG9hdDpyaWdodDtcclxuICBtYXJnaW4tdG9wOiAwcHg7XHJcbn1cclxuLnJlY29yZHVwZGF0ZWRvbntcclxuICBmbG9hdDogcmlnaHQ7XHJcbiAgZm9udC1zaXplOiAxMHB4O1xyXG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcclxuICB0ZXh0LWFsaWduOiByaWdodDtcclxufSJdfQ== */");

/***/ }),

/***/ "67Ak":
/*!*********************************************************************************!*\
  !*** ./src/app/surveyoroverview/inreviewsurveys/inreviewsurveys.component.scss ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".custom-card {\n  display: flex;\n  flex-direction: column;\n  background: white;\n  border-radius: 4px;\n  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.3);\n  padding: 8px 12px;\n}\n\n.customer-name {\n  font-size: 1em;\n  color: #434343;\n  font-weight: bold;\n  display: table;\n  margin: 0px;\n}\n\n.customer-email {\n  font-size: 0.8em;\n  color: #B4B4B4;\n}\n\n.customer-phone {\n  font-size: 0.8em;\n  color: #4272B9;\n}\n\n.customer-address {\n  margin-top: 16px;\n  margin-bottom: 16px;\n  font-size: 0.8em;\n  color: #4272B9;\n}\n\n.timestamp {\n  font-size: 0.7em;\n}\n\n.chipdetail {\n  display: inline;\n  vertical-align: middle;\n  background-color: #95afc0;\n  font-size: 0.6em;\n  padding: 4px 10px;\n  border-radius: 10px;\n  text-align: center;\n  color: #fff;\n}\n\n.imagebutton {\n  float: right;\n  margin-top: 0px;\n}\n\n.recordupdatedon {\n  float: right;\n  font-size: 10px;\n  font-style: italic;\n  text-align: right;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFxpbnJldmlld3N1cnZleXMuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0VBQ0EsMENBQUE7RUFDQSxpQkFBQTtBQUNKOztBQUVFO0VBQ0UsY0FBQTtFQUNBLGNBQUE7RUFDQSxpQkFBQTtFQUNBLGNBQUE7RUFDQSxXQUFBO0FBQ0o7O0FBRUU7RUFDRSxnQkFBQTtFQUNBLGNBQUE7QUFDSjs7QUFFRTtFQUNFLGdCQUFBO0VBQ0EsY0FBQTtBQUNKOztBQUVFO0VBQ0UsZ0JBQUE7RUFDQSxtQkFBQTtFQUNBLGdCQUFBO0VBQ0EsY0FBQTtBQUNKOztBQUVFO0VBQ0UsZ0JBQUE7QUFDSjs7QUFFRTtFQUNFLGVBQUE7RUFDQSxzQkFBQTtFQUNBLHlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxpQkFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxXQUFBO0FBQ0o7O0FBQ0E7RUFDRSxZQUFBO0VBQ0EsZUFBQTtBQUVGOztBQUdBO0VBQ0UsWUFBQTtFQUNBLGVBQUE7RUFDQSxrQkFBQTtFQUNBLGlCQUFBO0FBQUYiLCJmaWxlIjoiaW5yZXZpZXdzdXJ2ZXlzLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmN1c3RvbS1jYXJkIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgYmFja2dyb3VuZDogd2hpdGU7XHJcbiAgICBib3JkZXItcmFkaXVzOiA0cHg7XHJcbiAgICBib3gtc2hhZG93OiAwIDFweCAycHggMCByZ2JhKDAsIDAsIDAsIDAuMyk7XHJcbiAgICBwYWRkaW5nOiA4cHggMTJweDtcclxuICB9XHJcbiAgXHJcbiAgLmN1c3RvbWVyLW5hbWUge1xyXG4gICAgZm9udC1zaXplOiAxZW07XHJcbiAgICBjb2xvcjogIzQzNDM0MztcclxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gICAgZGlzcGxheTp0YWJsZTtcclxuICAgIG1hcmdpbjogMHB4O1xyXG4gIH1cclxuICBcclxuICAuY3VzdG9tZXItZW1haWwge1xyXG4gICAgZm9udC1zaXplOiAwLjhlbTtcclxuICAgIGNvbG9yOiAjQjRCNEI0O1xyXG4gIH1cclxuICBcclxuICAuY3VzdG9tZXItcGhvbmUge1xyXG4gICAgZm9udC1zaXplOiAwLjhlbTtcclxuICAgIGNvbG9yOiAjNDI3MkI5O1xyXG4gIH1cclxuICBcclxuICAuY3VzdG9tZXItYWRkcmVzcyB7XHJcbiAgICBtYXJnaW4tdG9wOiAxNnB4O1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMTZweDtcclxuICAgIGZvbnQtc2l6ZTogMC44ZW07XHJcbiAgICBjb2xvcjogIzQyNzJCOTtcclxuICB9XHJcbiAgXHJcbiAgLnRpbWVzdGFtcCB7XHJcbiAgICBmb250LXNpemU6IDAuN2VtO1xyXG4gIH1cclxuICBcclxuICAuY2hpcGRldGFpbHtcclxuICAgIGRpc3BsYXk6IGlubGluZTtcclxuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjOTVhZmMwO1xyXG4gICAgZm9udC1zaXplOiAwLjZlbTtcclxuICAgIHBhZGRpbmc6IDRweCAxMHB4O1xyXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIGNvbG9yOiAjZmZmO1xyXG59XHJcbi5pbWFnZWJ1dHRvbntcclxuICBmbG9hdDpyaWdodDtcclxuICBtYXJnaW4tdG9wOiAwcHg7XHJcbiAgXHJcbiAgXHJcbn1cclxuXHJcbi5yZWNvcmR1cGRhdGVkb257XHJcbiAgZmxvYXQ6IHJpZ2h0O1xyXG4gIGZvbnQtc2l6ZTogMTBweDtcclxuICBmb250LXN0eWxlOiBpdGFsaWM7XHJcbiAgdGV4dC1hbGlnbjogcmlnaHQ7XHJcbn0iXX0= */");

/***/ }),

/***/ "6rIk":
/*!***********************************************************************!*\
  !*** ./src/app/surveyoroverview/newsurveys/newsurveys.component.scss ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".custom-card {\n  display: flex;\n  flex-direction: column;\n  background: #fff;\n  border-radius: 4px;\n  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.3);\n  padding: 8px 12px;\n}\n\n.customer-name {\n  font-size: 1em;\n  color: #434343;\n  font-weight: bold;\n  display: table;\n  margin: 0px;\n}\n\n.customer-email {\n  font-size: 0.8em;\n  color: #B4B4B4;\n}\n\n.customer-phone {\n  font-size: 0.8em;\n  color: #4272B9;\n}\n\n.customer-address {\n  margin-top: 8px;\n  margin-bottom: 8px;\n  font-size: 0.8em;\n  color: #4272B9;\n}\n\n.timestamp {\n  font-size: 0.7em;\n}\n\n.chipdetail {\n  display: inline;\n  vertical-align: middle;\n  background-color: #95afc0;\n  font-size: 0.6em;\n  padding: 4px 10px;\n  border-radius: 10px;\n  text-align: center;\n  color: #fff;\n}\n\n.latebystyle {\n  float: right;\n  font-size: 10px;\n  color: #3C78DB;\n  text-align: right;\n}\n\n.imagebutton {\n  float: right;\n  margin-top: 0px;\n}\n\n.recordupdatedon {\n  float: right;\n  font-size: 10px;\n  font-style: italic;\n  text-align: right;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFxuZXdzdXJ2ZXlzLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksYUFBQTtFQUNBLHNCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtFQUNBLDBDQUFBO0VBQ0EsaUJBQUE7QUFDSjs7QUFFRTtFQUNFLGNBQUE7RUFDQSxjQUFBO0VBQ0EsaUJBQUE7RUFDQSxjQUFBO0VBQ0EsV0FBQTtBQUNKOztBQUVFO0VBQ0UsZ0JBQUE7RUFDQSxjQUFBO0FBQ0o7O0FBRUU7RUFDRSxnQkFBQTtFQUNBLGNBQUE7QUFDSjs7QUFFRTtFQUNFLGVBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsY0FBQTtBQUNKOztBQUVFO0VBQ0UsZ0JBQUE7QUFDSjs7QUFFRTtFQUNFLGVBQUE7RUFDQSxzQkFBQTtFQUNBLHlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxpQkFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxXQUFBO0FBQ0o7O0FBRUE7RUFDRSxZQUFBO0VBQ0EsZUFBQTtFQUNBLGNBQUE7RUFDQSxpQkFBQTtBQUNGOztBQUNBO0VBQ0UsWUFBQTtFQUNBLGVBQUE7QUFFRjs7QUFHQTtFQUNFLFlBQUE7RUFDQSxlQUFBO0VBQ0Esa0JBQUE7RUFDQSxpQkFBQTtBQUFGIiwiZmlsZSI6Im5ld3N1cnZleXMuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuY3VzdG9tLWNhcmQge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBiYWNrZ3JvdW5kOiAjZmZmO1xyXG4gICAgYm9yZGVyLXJhZGl1czogNHB4O1xyXG4gICAgYm94LXNoYWRvdzogMCAxcHggMnB4IDAgcmdiYSgwLCAwLCAwLCAwLjMpO1xyXG4gICAgcGFkZGluZzogOHB4IDEycHg7XHJcbiAgfVxyXG4gIFxyXG4gIC5jdXN0b21lci1uYW1lIHtcclxuICAgIGZvbnQtc2l6ZTogMWVtO1xyXG4gICAgY29sb3I6ICM0MzQzNDM7XHJcbiAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgIGRpc3BsYXk6dGFibGU7XHJcbiAgICBtYXJnaW46IDBweDtcclxuICB9XHJcbiAgXHJcbiAgLmN1c3RvbWVyLWVtYWlsIHtcclxuICAgIGZvbnQtc2l6ZTogMC44ZW07XHJcbiAgICBjb2xvcjogI0I0QjRCNDtcclxuICB9XHJcbiAgXHJcbiAgLmN1c3RvbWVyLXBob25lIHtcclxuICAgIGZvbnQtc2l6ZTogMC44ZW07XHJcbiAgICBjb2xvcjogIzQyNzJCOTtcclxuICB9XHJcbiAgXHJcbiAgLmN1c3RvbWVyLWFkZHJlc3Mge1xyXG4gICAgbWFyZ2luLXRvcDogOHB4O1xyXG4gICAgbWFyZ2luLWJvdHRvbTogOHB4O1xyXG4gICAgZm9udC1zaXplOiAwLjhlbTtcclxuICAgIGNvbG9yOiAjNDI3MkI5O1xyXG4gIH1cclxuICBcclxuICAudGltZXN0YW1wIHtcclxuICAgIGZvbnQtc2l6ZTogMC43ZW07XHJcbiAgfVxyXG4gIFxyXG4gIC5jaGlwZGV0YWlse1xyXG4gICAgZGlzcGxheTogaW5saW5lO1xyXG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICM5NWFmYzA7XHJcbiAgICBmb250LXNpemU6IDAuNmVtO1xyXG4gICAgcGFkZGluZzogNHB4IDEwcHg7XHJcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgY29sb3I6ICNmZmY7XHJcbn1cclxuXHJcbi5sYXRlYnlzdHlsZXtcclxuICBmbG9hdDogcmlnaHQ7IFxyXG4gIGZvbnQtc2l6ZTogMTBweDtcclxuICBjb2xvcjogIzNDNzhEQjtcclxuICB0ZXh0LWFsaWduOiByaWdodDtcclxufVxyXG4uaW1hZ2VidXR0b257XHJcbiAgZmxvYXQ6cmlnaHQ7XHJcbiAgbWFyZ2luLXRvcDogMHB4O1xyXG4gIFxyXG4gIFxyXG59XHJcblxyXG4ucmVjb3JkdXBkYXRlZG9ue1xyXG4gIGZsb2F0OiByaWdodDtcclxuICBmb250LXNpemU6IDEwcHg7XHJcbiAgZm9udC1zdHlsZTogaXRhbGljO1xyXG4gIHRleHQtYWxpZ246IHJpZ2h0O1xyXG59Il19 */");

/***/ }),

/***/ "DXKp":
/*!*************************************************************!*\
  !*** ./src/app/surveyoroverview/surveyoroverview.page.scss ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".bottom-bar {\n  margin: 8px;\n  border-radius: 50px;\n  box-shadow: 0 -2px 8px 0 rgba(0, 0, 0, 0.1);\n  border: 2px solid white;\n  background: #FFFAEB;\n}\n\n.tab {\n  padding-top: 1em;\n  padding-bottom: 1em;\n  padding-bottom: 1em;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.tabText {\n  margin-left: 8px;\n  font-size: 1em;\n}\n\n.tab-icon {\n  width: 24px;\n  height: 24px;\n}\n\nion-tab-button {\n  font-size: 14px;\n  --color: #9E9E9E;\n  --color-selected: #3c78d8;\n}\n\nion-tab-button[aria-selected=true] {\n  border-bottom: 3px solid #3c78d8;\n  border-bottom-left-radius: 2px;\n  border-bottom-right-radius: 2px;\n}\n\n.custombadge {\n  background-color: #3c78d8;\n  color: #ffffff;\n  border-radius: 50%;\n  width: 16px;\n  height: 16px;\n  font-size: 8px;\n  padding: 4px;\n  position: absolute;\n  margin-left: 4px;\n}\n\n.font {\n  font-size: 10px;\n}\n\n.notification-icon {\n  width: 24px;\n  height: 24px;\n}\n\n.home {\n  font-size: 22px;\n  margin-left: 6px;\n}\n\n.notification-badge {\n  font-size: 10px;\n  margin-left: -15px;\n  margin-top: -20px;\n}\n\n.notification-padding {\n  position: relative;\n  padding: 8px;\n}\n\n.badge {\n  width: 20px;\n  height: 20px;\n  position: absolute;\n  top: 0;\n  right: 0;\n  background: #3c78d8;\n  color: white;\n  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.5);\n  border-radius: 50%;\n  font-size: 0.6em;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: 1px solid white;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXHN1cnZleW9yb3ZlcnZpZXcucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksV0FBQTtFQUNBLG1CQUFBO0VBQ0EsMkNBQUE7RUFDQSx1QkFBQTtFQUNBLG1CQUFBO0FBQ0o7O0FBRUE7RUFDSSxnQkFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtBQUNKOztBQUVBO0VBQ0ksZ0JBQUE7RUFDQSxjQUFBO0FBQ0o7O0FBRUE7RUFDSSxXQUFBO0VBQ0EsWUFBQTtBQUNKOztBQUVBO0VBQ0ksZUFBQTtFQUNBLGdCQUFBO0VBQ0EseUJBQUE7QUFDSjs7QUFFQTtFQUNJLGdDQUFBO0VBQ0EsOEJBQUE7RUFDQSwrQkFBQTtBQUNKOztBQUVBO0VBQ0kseUJBQUE7RUFDQSxjQUFBO0VBQ0Esa0JBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGNBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtBQUNKOztBQUVBO0VBQ0ksZUFBQTtBQUNKOztBQUVBO0VBQ0ksV0FBQTtFQUNBLFlBQUE7QUFDSjs7QUFFQTtFQUNJLGVBQUE7RUFDQSxnQkFBQTtBQUNKOztBQUVBO0VBQ0ksZUFBQTtFQUNBLGtCQUFBO0VBQ0EsaUJBQUE7QUFDSjs7QUFFQTtFQUNJLGtCQUFBO0VBQ0EsWUFBQTtBQUNKOztBQUVBO0VBQ0ksV0FBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLE1BQUE7RUFDQSxRQUFBO0VBQ0EsbUJBQUE7RUFDQSxZQUFBO0VBQ0EsMENBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSx1QkFBQTtBQUNKIiwiZmlsZSI6InN1cnZleW9yb3ZlcnZpZXcucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmJvdHRvbS1iYXIge1xyXG4gICAgbWFyZ2luOiA4cHg7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1MHB4O1xyXG4gICAgYm94LXNoYWRvdzogMCAtMnB4IDhweCAwIHJnYmEoMCwgMCwgMCwgMC4xKTtcclxuICAgIGJvcmRlcjogMnB4IHNvbGlkIHdoaXRlO1xyXG4gICAgYmFja2dyb3VuZDogI0ZGRkFFQjtcclxufVxyXG5cclxuLnRhYiB7XHJcbiAgICBwYWRkaW5nLXRvcDogMWVtO1xyXG4gICAgcGFkZGluZy1ib3R0b206IDFlbTtcclxuICAgIHBhZGRpbmctYm90dG9tOiAxZW07XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG59XHJcblxyXG4udGFiVGV4dCB7XHJcbiAgICBtYXJnaW4tbGVmdDogOHB4O1xyXG4gICAgZm9udC1zaXplOiAxZW07XHJcbn1cclxuXHJcbi50YWItaWNvbiB7XHJcbiAgICB3aWR0aDogMjRweDtcclxuICAgIGhlaWdodDogMjRweDtcclxufVxyXG5cclxuaW9uLXRhYi1idXR0b24ge1xyXG4gICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgLS1jb2xvcjogIzlFOUU5RTtcclxuICAgIC0tY29sb3Itc2VsZWN0ZWQ6ICMzYzc4ZDg7XHJcbn1cclxuXHJcbmlvbi10YWItYnV0dG9uW2FyaWEtc2VsZWN0ZWQ9dHJ1ZV0ge1xyXG4gICAgYm9yZGVyLWJvdHRvbTogM3B4IHNvbGlkICMzYzc4ZDg7XHJcbiAgICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiAycHg7XHJcbiAgICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogMnB4O1xyXG59XHJcblxyXG4uY3VzdG9tYmFkZ2V7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjM2M3OGQ4O1xyXG4gICAgY29sb3I6ICNmZmZmZmY7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgICB3aWR0aDogMTZweDtcclxuICAgIGhlaWdodDogMTZweDtcclxuICAgIGZvbnQtc2l6ZTogOHB4O1xyXG4gICAgcGFkZGluZzogNHB4O1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgbWFyZ2luLWxlZnQ6IDRweDtcclxufVxyXG5cclxuLmZvbnR7XHJcbiAgICBmb250LXNpemU6IDEwcHg7XHJcbn1cclxuXHJcbi5ub3RpZmljYXRpb24taWNvbiB7XHJcbiAgICB3aWR0aDogMjRweDtcclxuICAgIGhlaWdodDogMjRweDtcclxufVxyXG5cclxuLmhvbWV7XHJcbiAgICBmb250LXNpemU6IDIycHg7XHJcbiAgICBtYXJnaW4tbGVmdDogNnB4O1xyXG59XHJcblxyXG4ubm90aWZpY2F0aW9uLWJhZGdlIHtcclxuICAgIGZvbnQtc2l6ZTogMTBweDtcclxuICAgIG1hcmdpbi1sZWZ0OiAtMTVweDtcclxuICAgIG1hcmdpbi10b3A6IC0yMHB4O1xyXG59XHJcblxyXG4ubm90aWZpY2F0aW9uLXBhZGRpbmcge1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgcGFkZGluZzogOHB4O1xyXG59XHJcblxyXG4uYmFkZ2Uge1xyXG4gICAgd2lkdGg6IDIwcHg7XHJcbiAgICBoZWlnaHQ6IDIwcHg7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICB0b3A6IDA7XHJcbiAgICByaWdodDogMDtcclxuICAgIGJhY2tncm91bmQ6ICMzYzc4ZDg7XHJcbiAgICBjb2xvcjogd2hpdGU7XHJcbiAgICBib3gtc2hhZG93OiAwIDFweCAzcHggMCByZ2JhKDAsIDAsIDAsIDAuNSk7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgICBmb250LXNpemU6IDAuNmVtO1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkIHdoaXRlO1xyXG4gIH1cclxuIl19 */");

/***/ }),

/***/ "DZpN":
/*!***********************************************************************************!*\
  !*** ./src/app/surveyoroverview/deliveredsurveys/deliveredsurveys.component.scss ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".custom-card {\n  display: flex;\n  flex-direction: column;\n  background: white;\n  border-radius: 4px;\n  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.3);\n  padding: 8px 12px;\n}\n\n.customer-name {\n  font-size: 1em;\n  color: #434343;\n  font-weight: bold;\n  display: table;\n  margin: 0px;\n}\n\n.customer-email {\n  font-size: 0.8em;\n  color: #B4B4B4;\n}\n\n.customer-phone {\n  font-size: 0.8em;\n  color: #4272B9;\n}\n\n.customer-address {\n  margin-top: 16px;\n  margin-bottom: 16px;\n  font-size: 0.8em;\n  color: #4272B9;\n}\n\n.timestamp {\n  font-size: 0.7em;\n}\n\n.chipdetail {\n  display: inline;\n  vertical-align: middle;\n  background-color: #95afc0;\n  font-size: 0.6em;\n  padding: 4px 10px;\n  border-radius: 10px;\n  text-align: center;\n  color: #fff;\n}\n\n.imagebutton {\n  float: right;\n  margin-top: 0px;\n}\n\n.recordupdatedon {\n  float: right;\n  font-size: 10px;\n  font-style: italic;\n  text-align: right;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFxkZWxpdmVyZWRzdXJ2ZXlzLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksYUFBQTtFQUNBLHNCQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLDBDQUFBO0VBQ0EsaUJBQUE7QUFDSjs7QUFFRTtFQUNFLGNBQUE7RUFDQSxjQUFBO0VBQ0EsaUJBQUE7RUFDQSxjQUFBO0VBQ0EsV0FBQTtBQUNKOztBQUVFO0VBQ0UsZ0JBQUE7RUFDQSxjQUFBO0FBQ0o7O0FBRUU7RUFDRSxnQkFBQTtFQUNBLGNBQUE7QUFDSjs7QUFFRTtFQUNFLGdCQUFBO0VBQ0EsbUJBQUE7RUFDQSxnQkFBQTtFQUNBLGNBQUE7QUFDSjs7QUFFRTtFQUNFLGdCQUFBO0FBQ0o7O0FBRUU7RUFDRSxlQUFBO0VBQ0Esc0JBQUE7RUFDQSx5QkFBQTtFQUNBLGdCQUFBO0VBQ0EsaUJBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0VBQ0EsV0FBQTtBQUNKOztBQUNBO0VBQ0UsWUFBQTtFQUNBLGVBQUE7QUFFRjs7QUFHQTtFQUNFLFlBQUE7RUFDQSxlQUFBO0VBQ0Esa0JBQUE7RUFDQSxpQkFBQTtBQUFGIiwiZmlsZSI6ImRlbGl2ZXJlZHN1cnZleXMuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuY3VzdG9tLWNhcmQge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcclxuICAgIGJvcmRlci1yYWRpdXM6IDRweDtcclxuICAgIGJveC1zaGFkb3c6IDAgMXB4IDJweCAwIHJnYmEoMCwgMCwgMCwgMC4zKTtcclxuICAgIHBhZGRpbmc6IDhweCAxMnB4O1xyXG4gIH1cclxuICBcclxuICAuY3VzdG9tZXItbmFtZSB7XHJcbiAgICBmb250LXNpemU6IDFlbTtcclxuICAgIGNvbG9yOiAjNDM0MzQzO1xyXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgICBkaXNwbGF5OnRhYmxlO1xyXG4gICAgbWFyZ2luOiAwcHg7XHJcbiAgfVxyXG4gIFxyXG4gIC5jdXN0b21lci1lbWFpbCB7XHJcbiAgICBmb250LXNpemU6IDAuOGVtO1xyXG4gICAgY29sb3I6ICNCNEI0QjQ7XHJcbiAgfVxyXG4gIFxyXG4gIC5jdXN0b21lci1waG9uZSB7XHJcbiAgICBmb250LXNpemU6IDAuOGVtO1xyXG4gICAgY29sb3I6ICM0MjcyQjk7XHJcbiAgfVxyXG4gIFxyXG4gIC5jdXN0b21lci1hZGRyZXNzIHtcclxuICAgIG1hcmdpbi10b3A6IDE2cHg7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAxNnB4O1xyXG4gICAgZm9udC1zaXplOiAwLjhlbTtcclxuICAgIGNvbG9yOiAjNDI3MkI5O1xyXG4gIH1cclxuICBcclxuICAudGltZXN0YW1wIHtcclxuICAgIGZvbnQtc2l6ZTogMC43ZW07XHJcbiAgfVxyXG4gIFxyXG4gIC5jaGlwZGV0YWlse1xyXG4gICAgZGlzcGxheTogaW5saW5lO1xyXG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICM5NWFmYzA7XHJcbiAgICBmb250LXNpemU6IDAuNmVtO1xyXG4gICAgcGFkZGluZzogNHB4IDEwcHg7XHJcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgY29sb3I6ICNmZmY7XHJcbn1cclxuLmltYWdlYnV0dG9ue1xyXG4gIGZsb2F0OnJpZ2h0O1xyXG4gIG1hcmdpbi10b3A6IDBweDtcclxuICBcclxuICBcclxufVxyXG5cclxuLnJlY29yZHVwZGF0ZWRvbntcclxuICBmbG9hdDogcmlnaHQ7XHJcbiAgZm9udC1zaXplOiAxMHB4O1xyXG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcclxuICB0ZXh0LWFsaWduOiByaWdodDtcclxufSJdfQ== */");

/***/ }),

/***/ "MrQC":
/*!***************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/surveyoroverview/surveyoroverview.page.html ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\r\n  <!-- <ion-toolbar>\r\n    <ion-buttons slot=\"start\">\r\n      <ion-menu-button></ion-menu-button>\r\n    </ion-buttons>\r\n    <ion-title>Survey</ion-title>\r\n  </ion-toolbar> -->\r\n\r\n\r\n<ion-content [forceOverscroll]=\"false\">\r\n  <ion-grid>\r\n    <ion-row class=\"ion-align-items-center\">\r\n    <ion-toolbar>\r\n    <ion-buttons slot=\"start\">\r\n        <ion-menu-button></ion-menu-button>\r\n      </ion-buttons>\r\n    <ion-row class=\"ion-align-items-center\">\r\n        <ion-col>\r\n            <h1 class=\"ion-no-padding ion-no-margin home\">Survey</h1>\r\n        </ion-col>\r\n        <!-- <ion-col *ngIf=\"showSearchBar === true\" >\r\n            <ion-searchbar debounce=\"0\" placeholder=\"home\" class=\"custom\"></ion-searchbar>\r\n        </ion-col> -->\r\n        <ion-col size=\"auto\">\r\n            <div class=\"notification-padding\" (click)=\"searchbar()\">\r\n                <ion-img src=\"/assets/images/icons8-search.svg\" class=\"notification-icon\"></ion-img>\r\n            </div>\r\n        </ion-col>\r\n        <ion-col size=\"auto\" style=\"position: relative;\">\r\n            <div class=\"notification-padding\" [routerLink]=\"['/notification']\" routerDirection=\"forward\" (click)=\"setzero()\">\r\n                <ion-img src=\"/assets/images/notification.svg\" class=\"notification-icon\"></ion-img>\r\n               <span class=\"badge\" *ngIf=\"unreadCount > 0\">\r\n                            {{unreadCount > 99 ? '99+' : unreadCount }}\r\n                        </span>\r\n            </div>\r\n        </ion-col>\r\n    </ion-row>\r\n</ion-toolbar>\r\n</ion-row>\r\n</ion-grid>\r\n</ion-content>\r\n  <ion-tabs style=\"margin-top: 52px;\">\r\n    <ion-tab-bar slot=\"top\">\r\n      <ion-tab-button tab=\"newsurveys\">\r\n        <ion-label>New</ion-label>\r\n      </ion-tab-button>\r\n      <ion-tab-button tab=\"inreviewsurveys\">\r\n        <ion-label>In Progress</ion-label>\r\n      </ion-tab-button>\r\n      <ion-tab-button tab=\"completedsurveys\">\r\n        <ion-label>Completed</ion-label>\r\n      </ion-tab-button>\r\n\r\n      <!-- <ion-tab-button tab=\"deliveredsurveys\">\r\n        <ion-label>Delivered</ion-label>\r\n      </ion-tab-button> -->\r\n    </ion-tab-bar>\r\n  </ion-tabs>\r\n\r\n\r\n<!-- <ion-footer class=\"ion-no-border white-bg\">\r\n  <div class=\"position-relative\">\r\n    <ion-grid class=\"bottom-bar ion-no-margin ion-no-padding\">\r\n      <ion-row>\r\n        <ion-col size=\"4\">\r\n          <div class=\"tab\">\r\n            <ion-img src=\"/assets/images/home-outline.svg\" class=\"tab-icon\"></ion-img>\r\n            <span class=\"tabText\">Home</span>\r\n          </div>\r\n        </ion-col>\r\n        <ion-col size=\"4\" [routerLink]=\"['/message']\">\r\n          <div class=\"tab\">\r\n            <ion-img src=\"/assets/images/message-outline.svg\" class=\"tab-icon\"></ion-img>\r\n            <span class=\"tabText\">Messages</span>\r\n          </div>\r\n        </ion-col>\r\n        <ion-col size=\"4\" [routerLink]=\"['/profile']\" routerDirection=\"forward\">\r\n          <div class=\"tab\">\r\n            <ion-img src=\"/assets/images/account-outline.svg\" class=\"tab-icon\"></ion-img>\r\n            <span class=\"tabText\">Profile</span>\r\n          </div>\r\n        </ion-col>\r\n      </ion-row>\r\n    </ion-grid>\r\n  </div>\r\n</ion-footer> -->");

/***/ }),

/***/ "OUkB":
/*!*************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/surveyoroverview/deliveredsurveys/deliveredsurveys.component.html ***!
  \*************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-content>\r\n  <ion-refresher slot=\"fixed\" (ionRefresh)=\"getSurveys($event)\">\r\n    <ion-refresher-content pullingIcon=\"arrow-dropdown\" pullingText=\"Pull down to refresh\" refreshingSpinner=\"lines\"></ion-refresher-content>\r\n  </ion-refresher>\r\n  <ion-grid *ngIf=\"listOfSurveyDataHelper.length !== 0\">\r\n    <ion-row *ngFor=\"let item of listOfSurveyDataHelper;let i = index\">\r\n        <ion-col size=\"12\" class=\"ion-margin-top\">\r\n                <span class=\"ion-padding\" *ngIf=\"today === item.date\">\r\n                    Today\r\n                  </span>\r\n            <span class=\"ion-padding\" *ngIf=\"today !== item.date\">\r\n                      {{item.date | date: 'dd MMM yyyy'}}\r\n                </span>\r\n        </ion-col>\r\n        <ion-col *ngFor=\"let surveyData of item.listOfSurveys;let i = index \" size=\"12\">\r\n            <div class=\"ion-no-padding custom-card\" style=\"height: 100%;\">\r\n                <p class=\"customer-name\" >{{surveyData.name}}\r\n                      <span class=\"chipdetail\" style=\"background-color: #1289A7;\" [routerLink]=\"['/survey-detail/',surveyData.id]\" routerDirection=\"forward\">\r\n                        {{surveyData.datetime | date: 'hh:mm a'}}\r\n                    </span>\r\n                    <span fill=\"clear\" background-border=\"clear\" [routerLink]=\"['/','activity',surveyData.id,'survey']\" class=\"imagebutton\"  size=\"small\"  ><ion-icon  src=\"/assets/images/activitylist.svg\" ></ion-icon></span>\r\n                    <span *ngIf=\"surveyData.status=='delivered'\" class=\"chipdetail\" style=\"background-color:rgb(109, 187, 26);\" [routerLink]=\"['/survey-detail/',surveyData.id]\" routerDirection=\"forward\">\r\n                        delivered\r\n                    </span>\r\n                    <span class=\"chipdetail\" style=\"background-color: rgb(246, 77, 10);\" *ngIf=\"surveyData.lateby > 0\">Overdue</span>\r\n            </p>\r\n            <p style=\"margin:0px\">\r\n\r\n                <span class=\"customer-email\" [routerLink]=\"['/survey-detail/',surveyData.id]\"\r\n                      routerDirection=\"forward\">{{surveyData.email}}</span>\r\n                      <span *ngIf=\"surveyData.lateby > 1\" class=\"latebystyle\" style=\"font-size: 10px;\"><strong>Late by {{surveyData.lateby}} days</strong></span>\r\n                      <span *ngIf=\"surveyData.lateby == 1\" class=\"latebystyle\" style=\"font-size: 10px;\"><strong>Late by a day</strong></span>\r\n            </p>\r\n            <span class=\"recordupdatedon\">Updated {{surveyData.recordupdatedon}}</span>\r\n                <a href=\"tel:{{surveyData.phonenumber}}\" style=\"text-decoration: none;\" class=\"z-100\">\r\n                    <span class=\"customer-phone\">{{surveyData.phonenumber}}</span></a>\r\n                <span class=\"customer-address z-100\"\r\n                      (click)=\"openAddressOnMap(surveyData.address)\">{{(surveyData.address | slice:0:60) + (surveyData.address.length > 60 ? '...' : '')}}</span>\r\n\r\n                <ion-row style=\"margin-bottom: 8px;\"  [routerLink]=\"['/survey-detail/',surveyData.id]\">\r\n                    <span class=\"chipdetail\" style=\"background-color: #95afc0;\" >Wattmonk</span>\r\n                    <span class=\"chipdetail\" style=\"background-color: #95afc0;\" >{{surveyData.formattedjobtype}}</span>\r\n                </ion-row>\r\n            </div>\r\n        </ion-col>\r\n    </ion-row>\r\n    <ion-row>\r\n        <ion-col size=\"12\" style=\"height: 100px;\">\r\n        </ion-col>\r\n    </ion-row>\r\n</ion-grid>\r\n\r\n<div *ngIf=\"listOfSurveyDataHelper.length === 0\" class=\"h-100 d-flex flex-column align-center justify-center\">\r\n    <ion-img src=\"/assets/images/blank.png\" class=\"placeholder\"></ion-img>\r\n</div>\r\n</ion-content>\r\n");

/***/ }),

/***/ "R8mZ":
/*!***********************************************************!*\
  !*** ./src/app/surveyoroverview/surveyoroverview.page.ts ***!
  \***********************************************************/
/*! exports provided: SurveyoroverviewPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SurveyoroverviewPage", function() { return SurveyoroverviewPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_surveyoroverview_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./surveyoroverview.page.html */ "MrQC");
/* harmony import */ var _surveyoroverview_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./surveyoroverview.page.scss */ "DXKp");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @cometchat-pro/cordova-ionic-chat */ "ujHh");
/* harmony import */ var _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _storage_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../storage.service */ "qkCY");
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../api.service */ "yTNM");
/* harmony import */ var _ionic_native_in_app_browser_ngx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic-native/in-app-browser/ngx */ "m/P+");
/* harmony import */ var _utilities_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../utilities.service */ "oTnF");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _networkdetect_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../networkdetect.service */ "UZ2B");
/* harmony import */ var _contants__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../contants */ "6qqZ");
/* harmony import */ var _appversion__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../appversion */ "E8lG");














let SurveyoroverviewPage = class SurveyoroverviewPage {
    constructor(route, storage, apiService, utilities, platform, iab, network) {
        this.route = route;
        this.storage = storage;
        this.apiService = apiService;
        this.utilities = utilities;
        this.platform = platform;
        this.iab = iab;
        this.network = network;
        this.version = _appversion__WEBPACK_IMPORTED_MODULE_13__["Appversion"].version;
        this.showSearchBar = false;
    }
    ngOnInit() {
        this.userData = this.storage.getUser();
        this.apiService.version.subscribe(versionInfo => {
            this.update_version = versionInfo;
        });
        this.apiService.emitUserNameAndRole(this.userData);
        this.setupCometChat();
        this.updateUserPushToken();
        this.getNotificationCount();
        this.route.navigate(['surveyoroverview/newsurveys']);
    }
    searchbar() {
        this.route.navigate(['/search-bar1']);
    }
    getNotificationCount() {
        this.apiService.getCountOfUnreadNotifications().subscribe((count) => {
            console.log("count", count);
            this.unreadCount = count;
        });
    }
    ngOnDestroy() {
        this.deactivateNetworkSwitch.unsubscribe();
    }
    setupCometChat() {
        let userId = this.storage.getUserID();
        const user = new _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_5__["CometChat"].User(userId);
        user.setName(this.storage.getUser().firstname + ' ' + this.storage.getUser().lastname);
        const appSetting = new _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_5__["CometChat"].AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(_contants__WEBPACK_IMPORTED_MODULE_12__["COMETCHAT_CONSTANTS"].REGION).build();
        _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_5__["CometChat"].init(_contants__WEBPACK_IMPORTED_MODULE_12__["COMETCHAT_CONSTANTS"].APP_ID, appSetting).then(() => {
            console.log('Initialization completed successfully');
            // if(this.utilities.currentUserValue != null){
            // You can now call login function.
            _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_5__["CometChat"].login(userId, _contants__WEBPACK_IMPORTED_MODULE_12__["COMETCHAT_CONSTANTS"].API_KEY).then((user) => {
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
        this.apiService.pushtoken(this.storage.getUserID(), { "newpushtoken": localStorage.getItem("pushtoken") }).subscribe((data) => {
            console.log(data, "fcm data");
        }, (error) => {
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
    setzero() {
        this.unreadCount = 0;
    }
};
SurveyoroverviewPage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
    { type: _storage_service__WEBPACK_IMPORTED_MODULE_6__["StorageService"] },
    { type: _api_service__WEBPACK_IMPORTED_MODULE_7__["ApiService"] },
    { type: _utilities_service__WEBPACK_IMPORTED_MODULE_9__["UtilitiesService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_10__["Platform"] },
    { type: _ionic_native_in_app_browser_ngx__WEBPACK_IMPORTED_MODULE_8__["InAppBrowser"] },
    { type: _networkdetect_service__WEBPACK_IMPORTED_MODULE_11__["NetworkdetectService"] }
];
SurveyoroverviewPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-surveyoroverview',
        template: _raw_loader_surveyoroverview_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_surveyoroverview_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], SurveyoroverviewPage);



/***/ }),

/***/ "Tt43":
/*!*********************************************************************************!*\
  !*** ./src/app/surveyoroverview/completedsurveys/completedsurveys.component.ts ***!
  \*********************************************************************************/
/*! exports provided: CompletedsurveysComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CompletedsurveysComponent", function() { return CompletedsurveysComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_completedsurveys_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./completedsurveys.component.html */ "qloF");
/* harmony import */ var _completedsurveys_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./completedsurveys.component.scss */ "0Lav");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_homepage_survey_survey_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/homepage/survey/survey.component */ "3Z0f");
/* harmony import */ var _ionic_native_launch_navigator_ngx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic-native/launch-navigator/ngx */ "fGQ8");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var src_app_utilities_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/utilities.service */ "oTnF");
/* harmony import */ var src_app_api_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/api.service */ "yTNM");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic/storage */ "e8h1");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! moment */ "wd/R");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_10__);











let CompletedsurveysComponent = class CompletedsurveysComponent {
    constructor(launchNavigator, datePipe, cdr, utils, storage, apiService) {
        this.launchNavigator = launchNavigator;
        this.datePipe = datePipe;
        this.cdr = cdr;
        this.utils = utils;
        this.storage = storage;
        this.apiService = apiService;
        this.listOfSurveyData = [];
        this.listOfSurveyDataHelper = [];
        this.options = {
            start: '',
            app: this.launchNavigator.APP.GOOGLE_MAPS
        };
        console.log("inside new surveys");
        const latestDate = new Date();
        this.today = datePipe.transform(latestDate, 'M/dd/yy');
        console.log('date', this.today);
    }
    ngOnInit() {
        this.surveyRefreshSubscription = this.utils.getHomepageSurveyRefresh().subscribe((result) => {
            this.getSurveys(null);
        });
        this.dataRefreshSubscription = this.utils.getDataRefresh().subscribe((result) => {
            if (this.listOfSurveyData != null && this.listOfSurveyData.length > 0) {
                this.formatSurveyData(this.listOfSurveyData);
            }
        });
    }
    getSurveys(event) {
        let showLoader = true;
        if (event != null && event !== undefined) {
            showLoader = false;
        }
        this.fetchPendingSurveys(event, showLoader);
    }
    fetchPendingSurveys(event, showLoader) {
        console.log("inside fetch surveys");
        this.listOfSurveyData = [];
        this.listOfSurveyDataHelper = [];
        this.utils.showLoadingWithPullRefreshSupport(showLoader, 'Getting Surveys').then((success) => {
            this.apiService.getSurveyorSurveys("status=surveycompleted").subscribe(response => {
                this.utils.hideLoadingWithPullRefreshSupport(showLoader).then(() => {
                    console.log(response);
                    this.formatSurveyData(response);
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
    formatSurveyData(records) {
        this.listOfSurveyData = this.fillinDynamicData(records);
        const tempData = [];
        this.listOfSurveyData.forEach((surveyItem, i) => {
            this.sDatePassed(surveyItem.datetime, i);
            surveyItem.lateby = this.overdue;
            if (tempData.length === 0) {
                const listOfSurvey = new src_app_homepage_survey_survey_component__WEBPACK_IMPORTED_MODULE_4__["SurveyDataHelper"]();
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
                    const listOfSurvey = new src_app_homepage_survey_survey_component__WEBPACK_IMPORTED_MODULE_4__["SurveyDataHelper"]();
                    listOfSurvey.date = this.datePipe.transform(surveyItem.datetime, 'M/d/yy');
                    listOfSurvey.listOfSurveys.push(surveyItem);
                    tempData.push(listOfSurvey);
                    added = true;
                }
            }
        });
        this.listOfSurveyDataHelper = tempData;
        // .sort(function (a, b) {
        //   var dateA = new Date(a.date).getTime(),
        //     dateB = new Date(b.date).getTime();
        //   return dateA - dateB;
        // });
        this.cdr.detectChanges();
    }
    fillinDynamicData(records) {
        records.forEach(element => {
            element.formattedjobtype = this.utils.getJobTypeName(element.jobtype);
            element.recordupdatedon = this.utils.formatDateInTimeAgo(element.updated_at);
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
    sDatePassed(datestring, i) {
        var checkdate = moment__WEBPACK_IMPORTED_MODULE_10__(datestring, "YYYYMMDD");
        var todaydate = moment__WEBPACK_IMPORTED_MODULE_10__(new Date(), "YYYYMMDD");
        var lateby = todaydate.diff(checkdate, "days");
        this.overdue = lateby;
        console.log(this.overdue, ">>>>>>>>>>>>>>>>>.");
    }
    ngOnDestroy() {
        // this.refreshSubscription.unsubscribe();
        // this.routeSubscription.unsubscribe();
        this.dataRefreshSubscription.unsubscribe();
        this.surveyRefreshSubscription.unsubscribe();
        this.cdr.detach();
    }
};
CompletedsurveysComponent.ctorParameters = () => [
    { type: _ionic_native_launch_navigator_ngx__WEBPACK_IMPORTED_MODULE_5__["LaunchNavigator"] },
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_6__["DatePipe"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ChangeDetectorRef"] },
    { type: src_app_utilities_service__WEBPACK_IMPORTED_MODULE_7__["UtilitiesService"] },
    { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_9__["Storage"] },
    { type: src_app_api_service__WEBPACK_IMPORTED_MODULE_8__["ApiService"] }
];
CompletedsurveysComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-completedsurveys',
        template: _raw_loader_completedsurveys_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_completedsurveys_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], CompletedsurveysComponent);



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

/***/ "fZ9P":
/*!*********************************************************************************!*\
  !*** ./src/app/surveyoroverview/deliveredsurveys/deliveredsurveys.component.ts ***!
  \*********************************************************************************/
/*! exports provided: DeliveredsurveysComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeliveredsurveysComponent", function() { return DeliveredsurveysComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_deliveredsurveys_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./deliveredsurveys.component.html */ "OUkB");
/* harmony import */ var _deliveredsurveys_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./deliveredsurveys.component.scss */ "DZpN");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_homepage_survey_survey_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/homepage/survey/survey.component */ "3Z0f");
/* harmony import */ var _ionic_native_launch_navigator_ngx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic-native/launch-navigator/ngx */ "fGQ8");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var src_app_utilities_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/utilities.service */ "oTnF");
/* harmony import */ var src_app_api_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/api.service */ "yTNM");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic/storage */ "e8h1");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! moment */ "wd/R");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_10__);











let DeliveredsurveysComponent = class DeliveredsurveysComponent {
    constructor(launchNavigator, datePipe, cdr, utils, storage, apiService) {
        this.launchNavigator = launchNavigator;
        this.datePipe = datePipe;
        this.cdr = cdr;
        this.utils = utils;
        this.storage = storage;
        this.apiService = apiService;
        this.listOfSurveyData = [];
        this.listOfSurveyDataHelper = [];
        this.options = {
            start: '',
            app: this.launchNavigator.APP.GOOGLE_MAPS
        };
        console.log("inside new surveys");
        const latestDate = new Date();
        this.today = datePipe.transform(latestDate, 'M/dd/yy');
        console.log('date', this.today);
    }
    ngOnInit() {
        this.surveyRefreshSubscription = this.utils.getHomepageSurveyRefresh().subscribe((result) => {
            this.getSurveys(null);
        });
        this.dataRefreshSubscription = this.utils.getDataRefresh().subscribe((result) => {
            if (this.listOfSurveyData != null && this.listOfSurveyData.length > 0) {
                this.formatSurveyData(this.listOfSurveyData);
            }
        });
    }
    getSurveys(event) {
        let showLoader = true;
        if (event != null && event !== undefined) {
            showLoader = false;
        }
        this.fetchPendingSurveys(event, showLoader);
    }
    fetchPendingSurveys(event, showLoader) {
        console.log("inside fetch surveys");
        this.listOfSurveyData = [];
        this.listOfSurveyDataHelper = [];
        this.utils.showLoadingWithPullRefreshSupport(showLoader, 'Getting Surveys').then((success) => {
            this.apiService.getSurveyorSurveys("status=delivered").subscribe(response => {
                this.utils.hideLoadingWithPullRefreshSupport(showLoader).then(() => {
                    console.log(response);
                    this.formatSurveyData(response);
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
    formatSurveyData(records) {
        this.listOfSurveyData = this.fillinDynamicData(records);
        const tempData = [];
        this.listOfSurveyData.forEach((surveyItem, i) => {
            this.sDatePassed(surveyItem.datetime, i);
            surveyItem.lateby = this.overdue;
            if (tempData.length === 0) {
                const listOfSurvey = new src_app_homepage_survey_survey_component__WEBPACK_IMPORTED_MODULE_4__["SurveyDataHelper"]();
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
                    const listOfSurvey = new src_app_homepage_survey_survey_component__WEBPACK_IMPORTED_MODULE_4__["SurveyDataHelper"]();
                    listOfSurvey.date = this.datePipe.transform(surveyItem.datetime, 'M/d/yy');
                    listOfSurvey.listOfSurveys.push(surveyItem);
                    tempData.push(listOfSurvey);
                    added = true;
                }
            }
        });
        this.listOfSurveyDataHelper = tempData.sort(function (a, b) {
            var dateA = new Date(a.date).getTime(), dateB = new Date(b.date).getTime();
            return dateA - dateB;
        });
        this.cdr.detectChanges();
    }
    fillinDynamicData(records) {
        records.forEach(element => {
            element.formattedjobtype = this.utils.getJobTypeName(element.jobtype);
            element.recordupdatedon = this.utils.formatDateInTimeAgo(element.updated_at);
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
    sDatePassed(datestring, i) {
        var checkdate = moment__WEBPACK_IMPORTED_MODULE_10__(datestring, "YYYYMMDD");
        var todaydate = moment__WEBPACK_IMPORTED_MODULE_10__(new Date(), "YYYYMMDD");
        var lateby = todaydate.diff(checkdate, "days");
        this.overdue = lateby;
        console.log(this.overdue, ">>>>>>>>>>>>>>>>>.");
    }
    ngOnDestroy() {
        // this.refreshSubscription.unsubscribe();
        // this.routeSubscription.unsubscribe();
        this.dataRefreshSubscription.unsubscribe();
        this.surveyRefreshSubscription.unsubscribe();
        this.cdr.detach();
    }
};
DeliveredsurveysComponent.ctorParameters = () => [
    { type: _ionic_native_launch_navigator_ngx__WEBPACK_IMPORTED_MODULE_5__["LaunchNavigator"] },
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_6__["DatePipe"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ChangeDetectorRef"] },
    { type: src_app_utilities_service__WEBPACK_IMPORTED_MODULE_7__["UtilitiesService"] },
    { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_9__["Storage"] },
    { type: src_app_api_service__WEBPACK_IMPORTED_MODULE_8__["ApiService"] }
];
DeliveredsurveysComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-deliveredsurveys',
        template: _raw_loader_deliveredsurveys_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_deliveredsurveys_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], DeliveredsurveysComponent);



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

/***/ "ig5R":
/*!*******************************************************************************!*\
  !*** ./src/app/surveyoroverview/inreviewsurveys/inreviewsurveys.component.ts ***!
  \*******************************************************************************/
/*! exports provided: InreviewsurveysComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InreviewsurveysComponent", function() { return InreviewsurveysComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_inreviewsurveys_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./inreviewsurveys.component.html */ "pUmg");
/* harmony import */ var _inreviewsurveys_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./inreviewsurveys.component.scss */ "67Ak");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_homepage_survey_survey_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/homepage/survey/survey.component */ "3Z0f");
/* harmony import */ var _ionic_native_launch_navigator_ngx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic-native/launch-navigator/ngx */ "fGQ8");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var src_app_utilities_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/utilities.service */ "oTnF");
/* harmony import */ var src_app_api_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/api.service */ "yTNM");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic/storage */ "e8h1");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! moment */ "wd/R");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var src_app_storage_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/storage.service */ "qkCY");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @ionic/angular */ "TEn/");














let InreviewsurveysComponent = class InreviewsurveysComponent {
    constructor(launchNavigator, datePipe, cdr, utils, storage, storageService, el, router, apiService) {
        this.launchNavigator = launchNavigator;
        this.datePipe = datePipe;
        this.cdr = cdr;
        this.utils = utils;
        this.storage = storage;
        this.storageService = storageService;
        this.el = el;
        this.router = router;
        this.apiService = apiService;
        this.listOfSurveyData = [];
        this.listOfSurveyDataHelper = [];
        this.options = {
            start: '',
            app: this.launchNavigator.APP.GOOGLE_MAPS
        };
    }
    ngOnInit() {
        this.userData = this.storageService.getUser();
        const latestDate = new Date();
        this.today = this.datePipe.transform(latestDate, 'M/dd/yy');
        console.log('date', this.today);
        this.apiService._OnMessageReceivedSubject.subscribe((r) => {
            console.log('message received! ', r);
            this.getSurveys();
        });
    }
    scrollTo(offsetTop, date) {
        setTimeout(() => {
            let sectionOffset = this.el.nativeElement.getElementsByTagName('ion-grid')[date].offsetTop;
            console.log("sectionOffset == ", sectionOffset);
            this.content.scrollToPoint(0, sectionOffset, 1000);
        }, 500);
    }
    ionViewDidEnter() {
        this.surveyRefreshSubscription = this.utils.getHomepageSurveyRefresh().subscribe((result) => {
            this.getSurveys(null);
        });
        this.dataRefreshSubscription = this.utils.getDataRefresh().subscribe((result) => {
            if (this.listOfSurveyData != null && this.listOfSurveyData.length > 0) {
                this.formatSurveyData(this.listOfSurveyData);
            }
        });
    }
    getSurveys(event) {
        let showLoader = true;
        if (event != null && event !== undefined) {
            showLoader = false;
        }
        this.fetchPendingSurveys(event);
    }
    fetchPendingSurveys(event, showLoader) {
        this.listOfSurveyData = [];
        this.listOfSurveyDataHelper = [];
        this.utils.showLoadingWithPullRefreshSupport(showLoader, 'Getting Surveys').then((success) => {
            // this.utils.showLoading('Getting Surveys').then(()=>{
            this.apiService.getSurveyorSurveys("status=surveyinprocess").subscribe(response => {
                // this.utils.hideLoading().then(()=>{
                this.utils.hideLoadingWithPullRefreshSupport(showLoader).then(() => {
                    console.log(response);
                    this.formatSurveyData(response);
                    if (event !== null) {
                        event.target.complete();
                    }
                });
                // })
            }, responseError => {
                this.utils.hideLoading();
                this.utils.hideLoadingWithPullRefreshSupport(showLoader).then(() => {
                    if (event !== null) {
                        event.target.complete();
                    }
                    const error = responseError.error;
                    this.utils.errorSnackBar(error.message[0].messages[0].message);
                });
            });
            // });
        });
    }
    openAddressOnMap(address) {
        this.launchNavigator.navigate(address, this.options);
    }
    formatSurveyData(records) {
        this.listOfSurveyData = this.fillinDynamicData(records);
        const tempData = [];
        this.listOfSurveyData.forEach((surveyItem, i) => {
            this.sDatePassed(surveyItem.datetime, i);
            surveyItem.lateby = this.overdue;
            if (tempData.length === 0) {
                const listOfSurvey = new src_app_homepage_survey_survey_component__WEBPACK_IMPORTED_MODULE_4__["SurveyDataHelper"]();
                listOfSurvey.date = this.datePipe.transform(surveyItem.datetime, 'M/dd/yy');
                listOfSurvey.listOfSurveys.push(surveyItem);
                tempData.push(listOfSurvey);
                console.log(tempData);
            }
            else {
                let added = false;
                tempData.forEach((surveyList) => {
                    if (!added) {
                        if (surveyList.date === this.datePipe.transform(surveyItem.datetime, 'M/dd/yy')) {
                            surveyList.listOfSurveys.push(surveyItem);
                            added = true;
                            console.log(surveyList.listOfSurveys);
                        }
                    }
                });
                if (!added) {
                    const listOfSurvey = new src_app_homepage_survey_survey_component__WEBPACK_IMPORTED_MODULE_4__["SurveyDataHelper"]();
                    listOfSurvey.date = this.datePipe.transform(surveyItem.datetime, 'M/dd/yy');
                    listOfSurvey.listOfSurveys.push(surveyItem);
                    tempData.push(listOfSurvey);
                    added = true;
                    console.log(tempData);
                }
            }
        });
        this.listOfSurveyDataHelper = tempData.sort(function (a, b) {
            var dateA = new Date(a.date).getTime(), dateB = new Date(b.date).getTime();
            return dateB - dateA;
        });
        this.cdr.detectChanges();
    }
    fillinDynamicData(records) {
        records.forEach(element => {
            element.formattedjobtype = this.utils.getJobTypeName(element.jobtype);
            element.recordupdatedon = this.utils.formatDateInTimeAgo(element.updated_at);
            this.storage.get('' + element.id).then((data) => {
                console.log(data);
                if (data) {
                    element.totalpercent = data.currentprogress;
                    console.log(element);
                }
                else {
                    element.totalpercent = 0;
                    console.log(element);
                }
            });
        });
        return records;
    }
    sDatePassed(datestring, i) {
        var checkdate = moment__WEBPACK_IMPORTED_MODULE_10__(datestring, "YYYYMMDD");
        var todaydate = moment__WEBPACK_IMPORTED_MODULE_10__(new Date(), "YYYYMMDD");
        var lateby = todaydate.diff(checkdate, "days");
        this.overdue = lateby;
        console.log(this.overdue, ">>>>>>>>>>>>>>>>>.");
    }
    ngOnDestroy() {
        // this.refreshSubscription.unsubscribe();
        // this.routeSubscription.unsubscribe();
        this.dataRefreshSubscription.unsubscribe();
        this.surveyRefreshSubscription.unsubscribe();
        this.cdr.detach();
    }
    setupCometChat() {
        // let userId = this.storageService.getUserID();
        // const user = new CometChat.User(userId);
        // user.setName(this.storageService.getUser().firstname + ' ' + this.storageService.getUser().lastname);
        // const appSetting = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(COMETCHAT_CONSTANTS.REGION).build();
        // CometChat.init(COMETCHAT_CONSTANTS.APP_ID, appSetting).then(
        //   () => {
        //     console.log('Initialization completed successfully');
        //     // if(this.utilities.currentUserValue != null){
        //       // You can now call login function.
        //       CometChat.login(userId,  COMETCHAT_CONSTANTS.API_KEY).then(
        //         (user) => {
        //           console.log('Login Successful:', { user });
        //         },
        //         error => {
        //           console.log('Login failed with exception:', { error });
        //         }
        //       );
        //   // }
        //   },
        //   error => {
        //     console.log('Initialization failed with error:', error);
        //   }
        // );
    }
    assignedTo(surveyData) {
        let postData = {
            assignedto: this.userData.id,
            status: "surveyinprocess"
        };
        this.apiService.updateSurveyForm(postData, surveyData.id).subscribe(res => {
            console.log(res);
        });
        this.router.navigate(['/camera/' + surveyData.id + '/' + surveyData.jobtype + '/' + surveyData.city + '/' + surveyData.state + '/' + surveyData.latitude + '/' + surveyData.longitude]);
    }
};
InreviewsurveysComponent.ctorParameters = () => [
    { type: _ionic_native_launch_navigator_ngx__WEBPACK_IMPORTED_MODULE_5__["LaunchNavigator"] },
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_6__["DatePipe"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ChangeDetectorRef"] },
    { type: src_app_utilities_service__WEBPACK_IMPORTED_MODULE_7__["UtilitiesService"] },
    { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_9__["Storage"] },
    { type: src_app_storage_service__WEBPACK_IMPORTED_MODULE_11__["StorageService"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ElementRef"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_12__["Router"] },
    { type: src_app_api_service__WEBPACK_IMPORTED_MODULE_8__["ApiService"] }
];
InreviewsurveysComponent.propDecorators = {
    content: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"], args: [_ionic_angular__WEBPACK_IMPORTED_MODULE_13__["IonContent"], { static: false },] }]
};
InreviewsurveysComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-inreviewsurveys',
        template: _raw_loader_inreviewsurveys_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_inreviewsurveys_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], InreviewsurveysComponent);



/***/ }),

/***/ "mFq1":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/surveyoroverview/newsurveys/newsurveys.component.html ***!
  \*************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-content [scrollEvents]=\"true\">\r\n  <ion-refresher slot=\"fixed\" (ionRefresh)=\"getSurveys($event)\">\r\n    <ion-refresher-content pullingIcon=\"arrow-dropdown\" pullingText=\"Pull down to refresh\" refreshingSpinner=\"lines\"></ion-refresher-content>\r\n  </ion-refresher>\r\n  <ion-grid *ngIf=\"listOfSurveyDataHelper.length !== 0\">\r\n    <ion-row *ngFor=\"let item of listOfSurveyDataHelper;let i = index\">\r\n        <ion-col size=\"12\" class=\"ion-margin-top\">\r\n                <span class=\"ion-padding\" *ngIf=\"today == item.date\">\r\n                    Today\r\n                  </span>\r\n            <span class=\"ion-padding\" *ngIf=\"today != item.date\">\r\n                      {{item.date | date: 'dd MMM yyyy'}}\r\n                </span>\r\n        </ion-col>\r\n        <ion-col *ngFor=\"let surveyData of item.listOfSurveys;let i = index \" size=\"12\">\r\n            <div class=\"ion-no-padding custom-card\" style=\"height: 100%;\" (click)=\"gotoDetails(surveyData,$event)\">\r\n                <p class=\"customer-name\" >{{surveyData.name}}\r\n                      <span class=\"chipdetail\" style=\"background-color: #1289A7;\"  routerDirection=\"forward\">\r\n                        {{utils.formatTimeInDisplayFormat(surveyData.datetime)}}\r\n                    </span>\r\n                      <span *ngIf=\"surveyData.status=='surveyassigned'\" class=\"chipdetail\" style=\"background-color: #3C78D8;\"  routerDirection=\"forward\">\r\n                        Pending\r\n                    </span>\r\n                    <!-- <span class=\"chipdetail\" style=\"background-color: rgb(246, 77, 10);\" *ngIf=\"surveyData.lateby > 0\">Overdue</span> -->\r\n                    <span fill=\"clear\" background-border=\"clear\"    (click)=\"gotoActivity(surveyData,$event)\"  class=\"imagebutton\"  size=\"small\"  ><img src=\"/assets/images/activitylist.png\" style=\"height: 20px;\" /></span>\r\n                </p>\r\n            <p style=\"margin:0px\">\r\n\r\n                <span class=\"customer-email\" \r\n                      routerDirection=\"forward\">{{surveyData.email}}</span>\r\n                      <!-- <span *ngIf=\"surveyData.lateby > 1\" class=\"latebystyle\" style=\"font-size: 10px;\"><strong>Late by {{surveyData.lateby}} days</strong></span>\r\n                      <span *ngIf=\"surveyData.lateby == 1\" class=\"latebystyle\" style=\"font-size: 10px;\"><strong>Late by a day</strong></span> -->\r\n            </p>\r\n            <span class=\"recordupdatedon\">Updated {{surveyData.recordupdatedon}}</span>\r\n                <a href=\"tel:{{surveyData?.phonenumber}}\" style=\"text-decoration: none;\" class=\"z-100\">\r\n                    <span class=\"customer-phone\">{{surveyData?.phonenumber}}</span></a>\r\n                <span class=\"customer-address z-100\"\r\n                      (click)=\"openAddressOnMap(surveyData.address,$event)\">{{(surveyData.address | slice:0:60) + (surveyData.address?.length > 60 ? '...' : '')}}</span>\r\n\r\n                <ion-row class=\"ion-no-margin ion-no-margin\"  >\r\n                    <!-- <span class=\"chipdetail\" style=\"background-color: #95afc0;\" >Wattmonk</span> -->\r\n                    \r\n                    <span class=\"chipdetail\" style=\"background-color: #95afc0;\" >{{surveyData.source}}</span>\r\n                    <span class=\"chipdetail\" style=\"background-color: #95afc0;align-self: center;\" >{{surveyData?.jobtype=='pvbattery' ? 'PV + Battery' : surveyData?.jobtype}}</span>\r\n                \r\n                <!-- <ion-col>\r\n                    \r\n                </ion-col> -->\r\n                </ion-row>\r\n                 <ion-row class=\"ion-no-margin ion-no-margin\">\r\n                    <ion-col></ion-col>\r\n                    <ion-col class=\"ion-no-margin ion-no-padding\">\r\n                   <!--  <ion-col class=\"ion-no-margin ion-no-padding ion-text-end\" *ngIf=\"today==item.date\"> -->\r\n                        <ion-button *ngIf=\"surveyData.status=='surveyassigned'\" class=\"ion-no-margin ion-no-padding\" style=\"float: right;\" fill=\"clear\" (click)=\"assignedTo(surveyData,$event)\">\r\n                        Start Survey\r\n                    </ion-button>\r\n                        <!-- <ion-button *ngIf=\"surveyData.status=='surveyinprocess'\"  class=\"ion-no-margin ion-no-padding\" style=\"float: right;\" fill=\"clear\" [routerLink]=\"['/camera/' + surveyData.id + '/' + surveyData.jobtype + '/' + surveyData.city + '/' + surveyData.state + '/' + surveyData.latitude + '/' + surveyData.longitude]\">\r\n                        Resume Survey\r\n                    </ion-button> -->\r\n                    </ion-col>\r\n                </ion-row> \r\n                <ion-progress-bar [value]=\"surveyData.totalpercent\" mode=\"ios\" color=\"success\" class=\"progress-bar-height\"></ion-progress-bar>\r\n            </div>\r\n        </ion-col>\r\n    </ion-row>\r\n    <ion-row>\r\n        <ion-col size=\"12\" style=\"height: 100px;\">\r\n        </ion-col>\r\n    </ion-row>\r\n</ion-grid>\r\n\r\n<div *ngIf=\"listOfSurveyDataHelper.length === 0\" class=\"h-100 d-flex flex-column align-center justify-center\">\r\n    <ion-img src=\"/assets/images/blank.png\" class=\"placeholder\"></ion-img>\r\n</div>\r\n</ion-content>\r\n");

/***/ }),

/***/ "pUmg":
/*!***********************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/surveyoroverview/inreviewsurveys/inreviewsurveys.component.html ***!
  \***********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-content [scrollEvents]=\"true\">\r\n    <ion-refresher slot=\"fixed\" (ionRefresh)=\"getSurveys($event)\">\r\n      <ion-refresher-content pullingIcon=\"arrow-dropdown\" pullingText=\"Pull down to refresh\" refreshingSpinner=\"lines\"></ion-refresher-content>\r\n    </ion-refresher>\r\n    <ion-grid *ngIf=\"listOfSurveyDataHelper.length !== 0\">\r\n      <ion-row *ngFor=\"let item of listOfSurveyDataHelper;let i = index\">\r\n          <ion-col size=\"12\" class=\"ion-margin-top\">\r\n                  <span class=\"ion-padding\" *ngIf=\"today == item.date\">\r\n                      Today\r\n                    </span>\r\n              <span class=\"ion-padding\" *ngIf=\"today != item.date\">\r\n                        {{item.date | date: 'dd MMM yyyy'}}\r\n                  </span>\r\n          </ion-col>\r\n          <ion-col *ngFor=\"let surveyData of item.listOfSurveys;let i = index \" size=\"12\">\r\n              <div class=\"ion-no-padding custom-card\" style=\"height: 100%;\">\r\n                  <p class=\"customer-name\" >{{surveyData.name}}\r\n                        <span class=\"chipdetail\" style=\"background-color: #1289A7;\" [routerLink]=\"['/survey-detail/',surveyData.id]\" routerDirection=\"forward\">\r\n                          {{utils.formatTimeInDisplayFormat(surveyData.datetime)}}\r\n                      </span>\r\n                        <span *ngIf=\"surveyData.status=='surveyassigned'\" class=\"chipdetail\" style=\"background-color: #3C78D8;\" [routerLink]=\"['/survey-detail/',surveyData.id]\" routerDirection=\"forward\">\r\n                          Pending\r\n                      </span>\r\n                      <!-- <span class=\"chipdetail\" style=\"background-color: rgb(246, 77, 10);\" *ngIf=\"surveyData.lateby > 0\">Overdue</span> -->\r\n                      <span fill=\"clear\" background-border=\"clear\"    [routerLink]=\"['/','activity',surveyData.id,'survey']\"  class=\"imagebutton\"  size=\"small\"  ><img src=\"/assets/images/activitylist.png\" style=\"height: 20px;\" /></span>\r\n                  </p>\r\n              <p style=\"margin:0px\">\r\n  \r\n                  <span class=\"customer-email\" [routerLink]=\"['/survey-detail/',surveyData.id]\"\r\n                        routerDirection=\"forward\">{{surveyData.email}}</span>\r\n                        <!-- <span *ngIf=\"surveyData.lateby > 1\" class=\"latebystyle\" style=\"font-size: 10px;\"><strong>Late by {{surveyData.lateby}} days</strong></span>\r\n                        <span *ngIf=\"surveyData.lateby == 1\" class=\"latebystyle\" style=\"font-size: 10px;\"><strong>Late by a day</strong></span> -->\r\n              </p>\r\n              <span class=\"recordupdatedon\">Updated {{surveyData.recordupdatedon}}</span>\r\n                  <a href=\"tel:{{surveyData?.phonenumber}}\" style=\"text-decoration: none;\" class=\"z-100\">\r\n                      <span class=\"customer-phone\">{{surveyData?.phonenumber}}</span></a>\r\n                  <span class=\"customer-address z-100\"\r\n                        (click)=\"openAddressOnMap(surveyData.address)\">{{(surveyData.address | slice:0:60) + (surveyData.address?.length > 60 ? '...' : '')}}</span>\r\n  \r\n                  <ion-row class=\"ion-no-margin ion-no-margin\"  >\r\n                      <!-- <span class=\"chipdetail\" style=\"background-color: #95afc0;\" >Wattmonk</span> -->\r\n                      \r\n                      <span class=\"chipdetail\" style=\"background-color: #95afc0;\" [routerLink]=\"['/survey-detail/',surveyData.id]\">{{surveyData.source}}</span>\r\n                      <span class=\"chipdetail\" style=\"background-color: #95afc0;align-self: center;\" >{{surveyData?.jobtype=='pvbattery' ? 'PV + Battery' : surveyData?.jobtype}}</span>\r\n                  \r\n                  <!-- <ion-col>\r\n                      \r\n                  </ion-col> -->\r\n                  </ion-row>\r\n                   <ion-row class=\"ion-no-margin ion-no-margin\">\r\n                      <ion-col></ion-col>\r\n                      <ion-col class=\"ion-no-margin ion-no-padding\">\r\n                     <!--  <ion-col class=\"ion-no-margin ion-no-padding ion-text-end\" *ngIf=\"today==item.date\"> -->\r\n                          <!-- <ion-button *ngIf=\"surveyData.status=='surveyassigned'\" class=\"ion-no-margin ion-no-padding\" style=\"float: right;\" fill=\"clear\" (click)=\"assignedTo(surveyData)\">\r\n                          Start Survey\r\n                      </ion-button> -->\r\n                          <ion-button *ngIf=\"surveyData.status=='surveyinprocess'\"  class=\"ion-no-margin ion-no-padding\" style=\"float: right;\" fill=\"clear\" [routerLink]=\"['/camera/' + surveyData.id + '/' + surveyData.jobtype + '/' + surveyData.city + '/' + surveyData.state + '/' + surveyData.latitude + '/' + surveyData.longitude]\">\r\n                          Resume Survey\r\n                      </ion-button>\r\n                      </ion-col>\r\n                  </ion-row> \r\n                  <ion-progress-bar [value]=\"surveyData.totalpercent\" mode=\"ios\" color=\"success\" class=\"progress-bar-height\"></ion-progress-bar>\r\n              </div>\r\n          </ion-col>\r\n      </ion-row>\r\n      <ion-row>\r\n          <ion-col size=\"12\" style=\"height: 100px;\">\r\n          </ion-col>\r\n      </ion-row>\r\n  </ion-grid>\r\n  \r\n  <div *ngIf=\"listOfSurveyDataHelper.length === 0\" class=\"h-100 d-flex flex-column align-center justify-center\">\r\n      <ion-img src=\"/assets/images/blank.png\" class=\"placeholder\"></ion-img>\r\n  </div>\r\n  </ion-content>\r\n  ");

/***/ }),

/***/ "qloF":
/*!*************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/surveyoroverview/completedsurveys/completedsurveys.component.html ***!
  \*************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-content>\r\n  <ion-refresher slot=\"fixed\" (ionRefresh)=\"getSurveys($event)\">\r\n    <ion-refresher-content pullingIcon=\"arrow-dropdown\" pullingText=\"Pull down to refresh\" refreshingSpinner=\"lines\"></ion-refresher-content>\r\n  </ion-refresher>\r\n  <ion-grid *ngIf=\"listOfSurveyDataHelper.length !== 0\">\r\n    <ion-row *ngFor=\"let item of listOfSurveyDataHelper;let i = index\">\r\n        <ion-col size=\"12\" class=\"ion-margin-top\">\r\n                <span class=\"ion-padding\" *ngIf=\"today === item.date\">\r\n                    Today\r\n                  </span>\r\n            <span class=\"ion-padding\" *ngIf=\"today !== item.date\">\r\n                      {{item.date | date: 'dd MMM yyyy'}}\r\n                </span>\r\n        </ion-col>\r\n        <ion-col *ngFor=\"let surveyData of item.listOfSurveys;let i = index \" size=\"12\">\r\n            <div class=\"ion-no-padding custom-card\" style=\"height: 100%;\">\r\n                <p class=\"customer-name\" >{{surveyData.name}}\r\n                      <span class=\"chipdetail\" style=\"background-color: #1289A7;\" [routerLink]=\"['/survey-detail/',surveyData.id]\" routerDirection=\"forward\">\r\n                       {{utils.formatTimeInDisplayFormat(surveyData.datetime)}}\r\n                    </span>\r\n                    <span fill=\"clear\" background-border=\"clear\"    [routerLink]=\"['/','activity',surveyData.id,'survey']\"  class=\"imagebutton\"  size=\"small\"  ><img src=\"/assets/images/activitylist.png\" style=\"height: 20px;\" /></span>\r\n                    <span *ngIf=\"surveyData.status=='surveycompleted'\" class=\"chipdetail\" style=\"background-color: rgb(109, 187, 26);\" [routerLink]=\"['/survey-detail/',surveyData.id]\" routerDirection=\"forward\">\r\n                        completed\r\n                    </span>\r\n                    <span class=\"chipdetail\" style=\"background-color: rgb(246, 77, 10);\" *ngIf=\"surveyData.lateby > 0\">Overdue</span>\r\n            </p>\r\n            <p style=\"margin:0px\">\r\n\r\n                <span class=\"customer-email\" [routerLink]=\"['/survey-detail/',surveyData.id]\"\r\n                      routerDirection=\"forward\">{{surveyData.email}}</span>\r\n                      <span *ngIf=\"surveyData.lateby > 1\" class=\"latebystyle\" style=\"font-size: 10px;\"><strong>Late by {{surveyData.lateby}} days</strong></span>\r\n                      <span *ngIf=\"surveyData.lateby == 1\" class=\"latebystyle\" style=\"font-size: 10px;\"><strong>Late by a day</strong></span>\r\n            </p>\r\n            <span class=\"recordupdatedon\">Updated {{surveyData.recordupdatedon}}</span>\r\n                <a href=\"tel:{{surveyData.phonenumber}}\" style=\"text-decoration: none;\" class=\"z-100\">\r\n                    <span class=\"customer-phone\">{{surveyData.phonenumber}}</span></a>\r\n                <span class=\"customer-address z-100\"\r\n                      (click)=\"openAddressOnMap(surveyData.address)\">{{(surveyData.address | slice:0:60) + (surveyData.address.length > 60 ? '...' : '')}}</span>\r\n\r\n                <ion-row style=\"margin-bottom: 8px;\"  [routerLink]=\"['/survey-detail/',surveyData.id]\">\r\n                    <span class=\"chipdetail\" style=\"background-color: #95afc0;\" >Wattmonk</span>\r\n                    <span class=\"chipdetail\" style=\"background-color: #95afc0;\" >{{surveyData.formattedjobtype}}</span>\r\n                </ion-row>\r\n                <ion-progress-bar [value]=\"1\" mode=\"ios\" color=\"success\" class=\"progress-bar-height\"></ion-progress-bar>\r\n            </div>\r\n        </ion-col>\r\n    </ion-row>\r\n    <ion-row>\r\n        <ion-col size=\"12\" style=\"height: 100px;\">\r\n        </ion-col>\r\n    </ion-row>\r\n</ion-grid>\r\n\r\n<div *ngIf=\"listOfSurveyDataHelper.length === 0\" class=\"h-100 d-flex flex-column align-center justify-center\">\r\n    <ion-img src=\"/assets/images/blank.png\" class=\"placeholder\"></ion-img>\r\n</div>\r\n</ion-content>\r\n");

/***/ }),

/***/ "rQG+":
/*!*********************************************************************!*\
  !*** ./src/app/surveyoroverview/surveyoroverview-routing.module.ts ***!
  \*********************************************************************/
/*! exports provided: SurveyoroverviewPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SurveyoroverviewPageRoutingModule", function() { return SurveyoroverviewPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _surveyoroverview_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./surveyoroverview.page */ "R8mZ");
/* harmony import */ var _newsurveys_newsurveys_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./newsurveys/newsurveys.component */ "xlbG");
/* harmony import */ var _completedsurveys_completedsurveys_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./completedsurveys/completedsurveys.component */ "Tt43");
/* harmony import */ var _inreviewsurveys_inreviewsurveys_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./inreviewsurveys/inreviewsurveys.component */ "ig5R");







const routes = [
    {
        path: '',
        component: _surveyoroverview_page__WEBPACK_IMPORTED_MODULE_3__["SurveyoroverviewPage"],
        children: [
            {
                path: 'newsurveys',
                component: _newsurveys_newsurveys_component__WEBPACK_IMPORTED_MODULE_4__["NewsurveysComponent"]
            },
            {
                path: 'completedsurveys',
                component: _completedsurveys_completedsurveys_component__WEBPACK_IMPORTED_MODULE_5__["CompletedsurveysComponent"]
            },
            {
                path: 'inreviewsurveys',
                component: _inreviewsurveys_inreviewsurveys_component__WEBPACK_IMPORTED_MODULE_6__["InreviewsurveysComponent"]
            },
        ]
    }
];
let SurveyoroverviewPageRoutingModule = class SurveyoroverviewPageRoutingModule {
};
SurveyoroverviewPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], SurveyoroverviewPageRoutingModule);



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

/***/ "xlbG":
/*!*********************************************************************!*\
  !*** ./src/app/surveyoroverview/newsurveys/newsurveys.component.ts ***!
  \*********************************************************************/
/*! exports provided: NewsurveysComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewsurveysComponent", function() { return NewsurveysComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_newsurveys_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./newsurveys.component.html */ "mFq1");
/* harmony import */ var _newsurveys_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./newsurveys.component.scss */ "6rIk");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_homepage_survey_survey_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/homepage/survey/survey.component */ "3Z0f");
/* harmony import */ var _ionic_native_launch_navigator_ngx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic-native/launch-navigator/ngx */ "fGQ8");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var src_app_utilities_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/utilities.service */ "oTnF");
/* harmony import */ var src_app_api_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/api.service */ "yTNM");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic/storage */ "e8h1");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! moment */ "wd/R");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var src_app_storage_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/storage.service */ "qkCY");
/* harmony import */ var _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @cometchat-pro/cordova-ionic-chat */ "ujHh");
/* harmony import */ var _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var src_app_contants__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! src/app/contants */ "6qqZ");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/router */ "tyNb");
















let NewsurveysComponent = class NewsurveysComponent {
    constructor(launchNavigator, datePipe, cdr, utils, storage, storageService, el, router, apiService) {
        this.launchNavigator = launchNavigator;
        this.datePipe = datePipe;
        this.cdr = cdr;
        this.utils = utils;
        this.storage = storage;
        this.storageService = storageService;
        this.el = el;
        this.router = router;
        this.apiService = apiService;
        this.listOfSurveyData = [];
        this.listOfSurveyDataHelper = [];
        this.options = {
            start: '',
            app: this.launchNavigator.APP.GOOGLE_MAPS
        };
    }
    ngOnInit() {
        this.userData = this.storageService.getUser();
        const latestDate = new Date();
        this.today = this.datePipe.transform(latestDate, 'M/dd/yy');
        console.log('date', this.today);
        this.apiService._OnMessageReceivedSubject.subscribe((r) => {
            console.log('message received! ', r);
            this.getSurveys();
        });
    }
    scrollTo(offsetTop, date) {
        setTimeout(() => {
            let sectionOffset = this.el.nativeElement.getElementsByTagName('ion-grid')[date].offsetTop;
            console.log("sectionOffset == ", sectionOffset);
            this.content.scrollToPoint(0, sectionOffset, 1000);
        }, 500);
    }
    ionViewDidEnter() {
        this.surveyRefreshSubscription = this.utils.getHomepageSurveyRefresh().subscribe((result) => {
            this.getSurveys(null);
        });
        this.dataRefreshSubscription = this.utils.getDataRefresh().subscribe((result) => {
            if (this.listOfSurveyData != null && this.listOfSurveyData.length > 0) {
                this.formatSurveyData(this.listOfSurveyData);
            }
        });
    }
    getSurveys(event) {
        let showLoader = true;
        if (event != null && event !== undefined) {
            showLoader = false;
        }
        this.fetchPendingSurveys(event);
    }
    fetchPendingSurveys(event, showLoader) {
        this.listOfSurveyData = [];
        this.listOfSurveyDataHelper = [];
        this.utils.showLoadingWithPullRefreshSupport(showLoader, 'Getting Surveys').then((success) => {
            // this.utils.showLoading('Getting Surveys').then(()=>{
            this.apiService.getSurveyorSurveys("status=surveyassigned").subscribe(response => {
                // this.utils.hideLoading().then(()=>{
                this.utils.hideLoadingWithPullRefreshSupport(showLoader).then(() => {
                    console.log(response);
                    this.formatSurveyData(response);
                    if (event !== null) {
                        event.target.complete();
                    }
                });
                // })
            }, responseError => {
                this.utils.hideLoading();
                this.utils.hideLoadingWithPullRefreshSupport(showLoader).then(() => {
                    if (event !== null) {
                        event.target.complete();
                    }
                    const error = responseError.error;
                    this.utils.errorSnackBar(error.message[0].messages[0].message);
                });
            });
            // });
        });
    }
    openAddressOnMap(address, event) {
        event.stopPropagation();
        this.launchNavigator.navigate(address, this.options);
    }
    formatSurveyData(records) {
        this.listOfSurveyData = this.fillinDynamicData(records);
        const tempData = [];
        this.listOfSurveyData.forEach((surveyItem, i) => {
            this.sDatePassed(surveyItem.datetime, i);
            surveyItem.lateby = this.overdue;
            if (tempData.length === 0) {
                const listOfSurvey = new src_app_homepage_survey_survey_component__WEBPACK_IMPORTED_MODULE_4__["SurveyDataHelper"]();
                listOfSurvey.date = this.datePipe.transform(surveyItem.datetime, 'M/dd/yy');
                listOfSurvey.listOfSurveys.push(surveyItem);
                tempData.push(listOfSurvey);
                console.log(tempData);
            }
            else {
                let added = false;
                tempData.forEach((surveyList) => {
                    if (!added) {
                        if (surveyList.date === this.datePipe.transform(surveyItem.datetime, 'M/dd/yy')) {
                            surveyList.listOfSurveys.push(surveyItem);
                            added = true;
                            console.log(surveyList.listOfSurveys);
                        }
                    }
                });
                if (!added) {
                    const listOfSurvey = new src_app_homepage_survey_survey_component__WEBPACK_IMPORTED_MODULE_4__["SurveyDataHelper"]();
                    listOfSurvey.date = this.datePipe.transform(surveyItem.datetime, 'M/dd/yy');
                    listOfSurvey.listOfSurveys.push(surveyItem);
                    tempData.push(listOfSurvey);
                    added = true;
                    console.log(tempData);
                }
            }
        });
        this.listOfSurveyDataHelper = tempData.sort(function (a, b) {
            var dateA = new Date(a.date).getTime(), dateB = new Date(b.date).getTime();
            return dateB - dateA;
        });
        this.cdr.detectChanges();
    }
    fillinDynamicData(records) {
        records.forEach(element => {
            element.formattedjobtype = this.utils.getJobTypeName(element.jobtype);
            element.recordupdatedon = this.utils.formatDateInTimeAgo(element.updated_at);
            this.storage.get('' + element.id).then((data) => {
                console.log(data);
                if (data) {
                    element.totalpercent = data.currentprogress;
                    console.log(element);
                }
                else {
                    element.totalpercent = 0;
                    console.log(element);
                }
            });
        });
        return records;
    }
    sDatePassed(datestring, i) {
        var checkdate = moment__WEBPACK_IMPORTED_MODULE_10__(datestring, "YYYYMMDD");
        var todaydate = moment__WEBPACK_IMPORTED_MODULE_10__(new Date(), "YYYYMMDD");
        var lateby = todaydate.diff(checkdate, "days");
        this.overdue = lateby;
        console.log(this.overdue, ">>>>>>>>>>>>>>>>>.");
    }
    ngOnDestroy() {
        // this.refreshSubscription.unsubscribe();
        // this.routeSubscription.unsubscribe();
        this.dataRefreshSubscription.unsubscribe();
        this.surveyRefreshSubscription.unsubscribe();
        this.cdr.detach();
    }
    setupCometChat() {
        let userId = this.storageService.getUserID();
        const user = new _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_13__["CometChat"].User(userId);
        user.setName(this.storageService.getUser().firstname + ' ' + this.storageService.getUser().lastname);
        const appSetting = new _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_13__["CometChat"].AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(src_app_contants__WEBPACK_IMPORTED_MODULE_14__["COMETCHAT_CONSTANTS"].REGION).build();
        _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_13__["CometChat"].init(src_app_contants__WEBPACK_IMPORTED_MODULE_14__["COMETCHAT_CONSTANTS"].APP_ID, appSetting).then(() => {
            console.log('Initialization completed successfully');
            // if(this.utilities.currentUserValue != null){
            // You can now call login function.
            _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_13__["CometChat"].login(userId, src_app_contants__WEBPACK_IMPORTED_MODULE_14__["COMETCHAT_CONSTANTS"].API_KEY).then((user) => {
                console.log('Login Successful:', { user });
            }, error => {
                console.log('Login failed with exception:', { error });
            });
            // }
        }, error => {
            console.log('Initialization failed with error:', error);
        });
    }
    assignedTo(surveyData, event) {
        event.stopPropagation();
        let postData = {
            assignedto: this.userData.id,
            status: "surveyinprocess"
        };
        this.apiService.updateSurveyForm(postData, surveyData.id).subscribe(res => {
            console.log(res);
        });
        this.router.navigate(['/camera/' + surveyData.id + '/' + surveyData.jobtype + '/' + surveyData.city + '/' + surveyData.state + '/' + surveyData.latitude + '/' + surveyData.longitude]);
    }
    resumeSurvey(surveyData, event) {
        event.stopPropagation();
        this.router.navigate(['/camera/' + surveyData.id + '/' + surveyData.jobtype + '/' + surveyData.city + '/' + surveyData.state + '/' + surveyData.latitude + '/' + surveyData.longitude]);
    }
    gotoActivity(surveyData, event) {
        console.log(event);
        event.stopPropagation();
        this.router.navigate(['/activity' + '/' + surveyData.id + '/survey']);
    }
    gotoDetails(surveyData, $event) {
        // $event.preventDefault();
        // $event.stopPropagation();
        this.router.navigate(['/survey-detail/' + surveyData.id]);
    }
};
NewsurveysComponent.ctorParameters = () => [
    { type: _ionic_native_launch_navigator_ngx__WEBPACK_IMPORTED_MODULE_5__["LaunchNavigator"] },
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_6__["DatePipe"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ChangeDetectorRef"] },
    { type: src_app_utilities_service__WEBPACK_IMPORTED_MODULE_7__["UtilitiesService"] },
    { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_9__["Storage"] },
    { type: src_app_storage_service__WEBPACK_IMPORTED_MODULE_12__["StorageService"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ElementRef"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_15__["Router"] },
    { type: src_app_api_service__WEBPACK_IMPORTED_MODULE_8__["ApiService"] }
];
NewsurveysComponent.propDecorators = {
    content: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"], args: [_ionic_angular__WEBPACK_IMPORTED_MODULE_11__["IonContent"], { static: false },] }]
};
NewsurveysComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-newsurveys',
        template: _raw_loader_newsurveys_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_newsurveys_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], NewsurveysComponent);



/***/ })

}]);
//# sourceMappingURL=surveyoroverview-surveyoroverview-module.js.map