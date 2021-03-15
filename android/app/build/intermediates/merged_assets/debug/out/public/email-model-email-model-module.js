(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["email-model-email-model-module"],{

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

/***/ "Rmqf":
/*!***********************************************************!*\
  !*** ./src/app/email-model/email-model-routing.module.ts ***!
  \***********************************************************/
/*! exports provided: EmailModelPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmailModelPageRoutingModule", function() { return EmailModelPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _email_model_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./email-model.page */ "+k72");




const routes = [
    {
        path: '',
        component: _email_model_page__WEBPACK_IMPORTED_MODULE_3__["EmailModelPage"]
    }
];
let EmailModelPageRoutingModule = class EmailModelPageRoutingModule {
};
EmailModelPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], EmailModelPageRoutingModule);



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

/***/ "zdJr":
/*!***************************************************!*\
  !*** ./src/app/email-model/email-model.module.ts ***!
  \***************************************************/
/*! exports provided: EmailModelPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmailModelPageModule", function() { return EmailModelPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _email_model_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./email-model-routing.module */ "Rmqf");
/* harmony import */ var _email_model_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./email-model.page */ "+k72");







let EmailModelPageModule = class EmailModelPageModule {
};
EmailModelPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        entryComponents: [_email_model_page__WEBPACK_IMPORTED_MODULE_6__["EmailModelPage"]],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _email_model_routing_module__WEBPACK_IMPORTED_MODULE_5__["EmailModelPageRoutingModule"]
        ],
        declarations: [_email_model_page__WEBPACK_IMPORTED_MODULE_6__["EmailModelPage"]]
    })
], EmailModelPageModule);



/***/ })

}]);
//# sourceMappingURL=email-model-email-model-module.js.map