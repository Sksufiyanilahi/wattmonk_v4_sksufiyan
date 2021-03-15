(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["sales-proposal-sales-proposal-module"],{

/***/ "46Uc":
/*!***********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/sales-proposal/sales-proposal.page.html ***!
  \***********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\r\n  <ion-toolbar>\r\n    <ion-buttons slot=\"start\">\r\n      <ion-back-button></ion-back-button>\r\n    </ion-buttons>\r\n    <ion-title>\r\n      Sales Proposal\r\n    </ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n  <ion-content class=\"ion-padding-start ion-padding-end ion-padding-bottom\" >\r\n    \r\n            <form [formGroup]=\"salesProposal\" style=\"overflow:scroll\">\r\n              <ion-grid style=\"position: relative;\">\r\n                  <ion-row class=\"ion-align-items-center ion-justify-content-center\">\r\n                      <ion-col size=\"12\">\r\n                          <ion-item class=\"ion-no-padding\">\r\n                              <mat-form-field style=\"width: 100%; height: 45px;\" class=\"ion-no-padding\">\r\n                                <mat-label>Utility Name</mat-label>\r\n                                <input type=\"text\" class=\"form_input font-size\" matInput [matAutocomplete]=\"auto\" autocomplete=\"off\" formControlName=\"utilityName\" required>\r\n                                <mat-autocomplete #auto=\"matAutocomplete\">\r\n                                  <mat-option class=\"font\"></mat-option>\r\n                                </mat-autocomplete>\r\n                              </mat-form-field>\r\n                          </ion-item>\r\n                      </ion-col>    \r\n                    </ion-row >\r\n\r\n                <ion-row>\r\n                  <ion-col>\r\n                      <ion-item class=\"ion-no-padding\">\r\n                          <mat-form-field style=\"width: 100%; height: 45px;\" class=\"ion-no-padding\">\r\n                            <mat-label>Utility Rate</mat-label>\r\n                            <input type=\"text\" class=\"form_input font-size\" matInput [matAutocomplete]=\"auto\" autocomplete=\"off\" formControlName=\"utilityRate\" required>\r\n                            <mat-autocomplete #auto=\"matAutocomplete\">\r\n                              <mat-option class=\"font\"></mat-option>\r\n                            </mat-autocomplete>\r\n                          </mat-form-field>\r\n                      </ion-item>\r\n                  </ion-col>\r\n              </ion-row>\r\n\r\n              <ion-row class=\"ion-align-items-center ion-justify-content-center\">\r\n                  <ion-col style=\"margin-top: 15px;\">\r\n                      <ion-label>Annual Utility Escalation*</ion-label>\r\n                      <ion-range [color]=\"color\"\r\n                      class=\"ion-no-padding\" min=\"0\" max=\"5\" formControlName=\"annualUtilityEscalation\" pin=\"true\"  (ionChange)=\"onRangeChangeHandler()\">\r\n                        <ion-label slot=\"start\">0.0%</ion-label>\r\n                        <ion-label slot=\"end\">5.0%</ion-label>\r\n                      </ion-range>\r\n                  </ion-col>\r\n            </ion-row>\r\n\r\n              <ion-row class=\"ion-align-items-center ion-justify-content-center\">\r\n                <ion-col>\r\n                      <ion-item class=\"ion-no-padding\">\r\n                          <ion-label position=\"floating\">Any Incentives*</ion-label>\r\n                          <ion-select class=\"form_input select_div\"\r\n                          ok-text=\"\" cancel-text=\"\"\r\n                          formControlName=\"incentives\" interface=\"popover\" >\r\n                  <ion-select-option></ion-select-option>\r\n            </ion-select>\r\n                    </ion-item>\r\n                </ion-col>\r\n            </ion-row>\r\n\r\n              <ion-row class=\"ion-align-items-center ion-justify-content-center\">\r\n                  <ion-col>\r\n                      <ion-item class=\"ion-no-padding\">\r\n                          <ion-label position=\"floating\">Cost of system* (Watt)</ion-label>\r\n                          <ion-input type=\"text\" class=\"form_input\" autocapitalize=\"words\"\r\n                          formControlName=\"costOfSystem\"></ion-input>\r\n                      </ion-item>\r\n                  </ion-col>\r\n              </ion-row>  \r\n\r\n              <ion-row class=\"ion-align-items-center ion-justify-content-center\">\r\n                  <ion-col>\r\n                      <ion-item class=\"ion-no-padding\">\r\n                          <ion-label position=\"floating\">Name*</ion-label>\r\n                          <ion-input type=\"text\" class=\"form_input\" autocapitalize=\"words\"\r\n                          formControlName=\"name\"></ion-input>\r\n                      </ion-item>\r\n                  </ion-col>\r\n              </ion-row>  \r\n\r\n              <ion-row class=\"ion-align-items-center ion-justify-content-center\">\r\n                  <ion-col>\r\n                      <ion-item class=\"ion-no-padding\">\r\n                          <ion-label position=\"floating\">Client Logo</ion-label>\r\n                          <ion-input  type=\"text\" class=\"form_input\" autocapitalize=\"words\"\r\n                          formControlName=\"logo\"></ion-input>\r\n                      </ion-item>\r\n                  </ion-col>\r\n              </ion-row>  \r\n\r\n              <ion-row class=\"ion-align-items-center ion-justify-content-center\">\r\n                  <ion-col>\r\n                      <ion-item class=\"ion-no-padding\">\r\n                          <ion-label position=\"floating\">Company Name</ion-label>\r\n                          <ion-input  type=\"text\" class=\"form_input\" autocapitalize=\"words\"\r\n                          formControlName=\"companyName\"></ion-input>\r\n                      </ion-item>\r\n                  </ion-col>\r\n              </ion-row>  \r\n              </ion-grid>\r\n        </form>\r\n        </ion-content>\r\n\r\n        <ion-row>\r\n          <ion-col size=\"auto\">\r\n            <ion-button class=\"action-button-color\" fill=\"clear\">Save</ion-button>\r\n            <ion-button class=\"action-button-color\" fill=\"clear\">Send to Wattmonk</ion-button>\r\n          </ion-col>\r\n        </ion-row>\r\n");

/***/ }),

/***/ "QnOJ":
/*!*********************************************************!*\
  !*** ./src/app/sales-proposal/sales-proposal.module.ts ***!
  \*********************************************************/
/*! exports provided: SalesProposalPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SalesProposalPageModule", function() { return SalesProposalPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _sales_proposal_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./sales-proposal-routing.module */ "iyVF");
/* harmony import */ var _sales_proposal_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./sales-proposal.page */ "Up8T");
/* harmony import */ var _angular_material_stepper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/stepper */ "xHqg");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/autocomplete */ "/1cH");











let SalesProposalPageModule = class SalesProposalPageModule {
};
SalesProposalPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _sales_proposal_routing_module__WEBPACK_IMPORTED_MODULE_5__["SalesProposalPageRoutingModule"],
            _angular_material_stepper__WEBPACK_IMPORTED_MODULE_7__["MatStepperModule"],
            _angular_material_input__WEBPACK_IMPORTED_MODULE_8__["MatInputModule"],
            _angular_material_button__WEBPACK_IMPORTED_MODULE_9__["MatButtonModule"],
            _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_10__["MatAutocompleteModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"]
        ],
        declarations: [_sales_proposal_page__WEBPACK_IMPORTED_MODULE_6__["SalesProposalPage"]]
    })
], SalesProposalPageModule);



/***/ }),

/***/ "Up8T":
/*!*******************************************************!*\
  !*** ./src/app/sales-proposal/sales-proposal.page.ts ***!
  \*******************************************************/
/*! exports provided: SalesProposalPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SalesProposalPage", function() { return SalesProposalPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_sales_proposal_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./sales-proposal.page.html */ "46Uc");
/* harmony import */ var _sales_proposal_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sales-proposal.page.scss */ "jCka");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "3Pt+");





let SalesProposalPage = class SalesProposalPage {
    constructor(formBuilder) {
        this.formBuilder = formBuilder;
        this.salesProposal = this.formBuilder.group({
            utilityName: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](null, [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]),
            utilityRate: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](null, [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]),
            annualUtilityEscalation: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](3, [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]),
            incentives: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](null, [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]),
            costOfSystem: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](null, [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]),
            name: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](null, [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]),
            logo: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](null, [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]),
            companyName: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](null, [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required])
        });
    }
    ngOnInit() {
    }
    onRangeChangeHandler() {
        this.number = this.salesProposal.get('annualUtilityEscalation').value;
        console.log(this.number);
        if (this.salesProposal.get('annualUtilityEscalation').value > 0 && this.salesProposal.get('annualUtilityEscalation').value < 1) {
            this.color = 'dark';
        }
        else if (this.salesProposal.get('annualUtilityEscalation').value > 2 && this.salesProposal.get('annualUtilityEscalation').value < 3) {
            this.color = 'primary';
        }
        else if (this.salesProposal.get('annualUtilityEscalation').value > 3 && this.salesProposal.get('annualUtilityEscalation').value < 4) {
            this.color = 'secondary';
        }
        else {
            this.color = 'danger';
        }
    }
};
SalesProposalPage.ctorParameters = () => [
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"] }
];
SalesProposalPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-sales-proposal',
        template: _raw_loader_sales_proposal_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_sales_proposal_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], SalesProposalPage);



/***/ }),

/***/ "iyVF":
/*!*****************************************************************!*\
  !*** ./src/app/sales-proposal/sales-proposal-routing.module.ts ***!
  \*****************************************************************/
/*! exports provided: SalesProposalPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SalesProposalPageRoutingModule", function() { return SalesProposalPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _sales_proposal_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./sales-proposal.page */ "Up8T");




const routes = [
    {
        path: '',
        component: _sales_proposal_page__WEBPACK_IMPORTED_MODULE_3__["SalesProposalPage"]
    }
];
let SalesProposalPageRoutingModule = class SalesProposalPageRoutingModule {
};
SalesProposalPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], SalesProposalPageRoutingModule);



/***/ }),

/***/ "jCka":
/*!*********************************************************!*\
  !*** ./src/app/sales-proposal/sales-proposal.page.scss ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".designdialogcontent {\n  max-height: 80vh;\n  height: 80vh;\n}\n\n.designdialogcontent .mat-expansion-panel-header-title {\n  font-size: 12px;\n  font-weight: 600;\n}\n\n.designdialogcontent .mat-expansion-panel-header {\n  padding: 0 14px;\n  height: 44px !important;\n}\n\n.designdialogcontent .mat-expansion-panel-body {\n  padding: 0 14px 2px;\n}\n\n.designdialogcontent textarea {\n  min-height: 42px !important;\n  height: 42px !important;\n}\n\n.designform {\n  width: 98%;\n  margin-left: 10px;\n}\n\n.designrow {\n  margin-left: 14px;\n  margin-right: 14px;\n}\n\n.designrow p {\n  font-size: 0.8em;\n  color: #000000;\n  font-weight: 600;\n}\n\n.designform .formradiogroup {\n  width: 100%;\n}\n\n.architectureuploadcol {\n  padding-left: 0px;\n  padding-right: 0px;\n}\n\n.prioritybutton {\n  margin-top: 0.5rem;\n  font-size: 0.7em;\n}\n\n.pdfselectionpreview img {\n  width: 40px;\n}\n\n.pdfselectionpreview p {\n  margin-bottom: 0px;\n  color: #000000;\n  font-size: 0.7rem;\n}\n\n.pdfpreviewcol {\n  padding-left: 0px;\n  padding-right: 0px;\n}\n\n.back {\n  border: red;\n  margin-top: 6px;\n  background: bottom;\n}\n\n.valid {\n  color: #000000;\n}\n\n.invalid {\n  color: red;\n}\n\n.loader {\n  width: 100px;\n  left: 45%;\n  height: 100px;\n  top: 50%;\n}\n\n.spinnertext {\n  margin-top: 16px !important;\n  color: #3c78d8;\n}\n\n.spinnercard {\n  width: 26%;\n  position: absolute;\n  left: 34%;\n  top: 36%;\n}\n\n.word {\n  -webkit-font-kerning: normal;\n          font-kerning: normal;\n}\n\n/* Chrome, Safari, Edge, Opera */\n\ninput::-webkit-outer-spin-button,\ninput::-webkit-inner-spin-button {\n  -webkit-appearance: none;\n  margin: 0;\n}\n\n/* Firefox */\n\ninput[type=number] {\n  -moz-appearance: textfield;\n}\n\n.list-border {\n  padding: 10px 0 10px 0px;\n}\n\n.delete-btn {\n  cursor: pointer;\n}\n\n.file-icon {\n  width: 20px !important;\n}\n\n/* Chrome, Safari, Edge, Opera */\n\ninput::-webkit-outer-spin-button,\ninput::-webkit-inner-spin-button {\n  -webkit-appearance: none;\n  margin: 0;\n}\n\n/* Firefox */\n\ninput[type=number] {\n  -moz-appearance: textfield;\n}\n\n.list-border {\n  padding: 10px 0 10px 0px;\n}\n\n.delete-btn {\n  cursor: pointer;\n}\n\nion-label {\n  color: #6C6C6C !important;\n}\n\n.error {\n  color: #df3e3e;\n  font-size: 11px;\n}\n\n.select_div {\n  border-bottom: 1px solid #E1E1E1;\n}\n\nion-select {\n  max-width: 100% !important;\n  width: 100% !important;\n  padding-left: 0px !important;\n}\n\ninput[type=file] {\n  visibility: hidden;\n}\n\n.mrT {\n  margin-top: -11px !important;\n  font-size: 10px !important;\n}\n\n.font {\n  font-size: 10px;\n}\n\n.font-size {\n  font-size: 12px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXHNhbGVzLXByb3Bvc2FsLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGdCQUFBO0VBQ0EsWUFBQTtBQUNGOztBQUNBO0VBQ0UsZUFBQTtFQUNBLGdCQUFBO0FBRUY7O0FBQUE7RUFDRSxlQUFBO0VBQ0EsdUJBQUE7QUFHRjs7QUFEQTtFQUNFLG1CQUFBO0FBSUY7O0FBRkE7RUFDRSwyQkFBQTtFQUNBLHVCQUFBO0FBS0Y7O0FBSEE7RUFDRSxVQUFBO0VBQ0EsaUJBQUE7QUFNRjs7QUFKQTtFQUNFLGlCQUFBO0VBQ0Esa0JBQUE7QUFPRjs7QUFMQTtFQUNFLGdCQUFBO0VBQ0EsY0FBQTtFQUNBLGdCQUFBO0FBUUY7O0FBTkE7RUFDRSxXQUFBO0FBU0Y7O0FBTkE7RUFDRSxpQkFBQTtFQUNBLGtCQUFBO0FBU0Y7O0FBTkE7RUFDRSxrQkFBQTtFQUNBLGdCQUFBO0FBU0Y7O0FBTkE7RUFDRSxXQUFBO0FBU0Y7O0FBTkE7RUFDRSxrQkFBQTtFQUNBLGNBQUE7RUFDQSxpQkFBQTtBQVNGOztBQU5BO0VBQ0UsaUJBQUE7RUFDQSxrQkFBQTtBQVNGOztBQVBBO0VBQ0UsV0FBQTtFQUNBLGVBQUE7RUFDQSxrQkFBQTtBQVVGOztBQVJBO0VBQ0UsY0FBQTtBQVdGOztBQVRBO0VBQ0UsVUFBQTtBQVlGOztBQVZBO0VBQ0UsWUFBQTtFQUNBLFNBQUE7RUFDQSxhQUFBO0VBQ0EsUUFBQTtBQWFGOztBQVZBO0VBQ0UsMkJBQUE7RUFDQSxjQUFBO0FBYUY7O0FBVkE7RUFDRSxVQUFBO0VBQ0Esa0JBQUE7RUFDQSxTQUFBO0VBQ0EsUUFBQTtBQWFGOztBQVhBO0VBQ0UsNEJBQUE7VUFBQSxvQkFBQTtBQWNGOztBQVhBLGdDQUFBOztBQUNBOztFQUVFLHdCQUFBO0VBQ0EsU0FBQTtBQWNGOztBQVhBLFlBQUE7O0FBQ0E7RUFDRSwwQkFBQTtBQWNGOztBQVhBO0VBQ0Usd0JBQUE7QUFjRjs7QUFaQTtFQUNFLGVBQUE7QUFlRjs7QUFHQTtFQUNFLHNCQUFBO0FBQUY7O0FBR0EsZ0NBQUE7O0FBQ0E7O0VBRUUsd0JBQUE7RUFDQSxTQUFBO0FBQUY7O0FBR0EsWUFBQTs7QUFDQTtFQUNFLDBCQUFBO0FBQUY7O0FBR0E7RUFDRSx3QkFBQTtBQUFGOztBQUVBO0VBQ0UsZUFBQTtBQUNGOztBQUdBO0VBQ0UseUJBQUE7QUFBRjs7QUFHQTtFQUNFLGNBQUE7RUFDQSxlQUFBO0FBQUY7O0FBR0E7RUFDRSxnQ0FBQTtBQUFGOztBQUdBO0VBQ0UsMEJBQUE7RUFDQSxzQkFBQTtFQUNBLDRCQUFBO0FBQUY7O0FBRUE7RUFDRSxrQkFBQTtBQUNGOztBQUVBO0VBQ0UsNEJBQUE7RUFBNEIsMEJBQUE7QUFFOUI7O0FBQ0E7RUFDRSxlQUFBO0FBRUY7O0FBQ0E7RUFDRSxlQUFBO0FBRUYiLCJmaWxlIjoic2FsZXMtcHJvcG9zYWwucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmRlc2lnbmRpYWxvZ2NvbnRlbnQge1xyXG4gIG1heC1oZWlnaHQ6IDgwdmg7XHJcbiAgaGVpZ2h0OiA4MHZoO1xyXG59XHJcbi5kZXNpZ25kaWFsb2djb250ZW50IC5tYXQtZXhwYW5zaW9uLXBhbmVsLWhlYWRlci10aXRsZSB7XHJcbiAgZm9udC1zaXplOiAxMnB4O1xyXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbn1cclxuLmRlc2lnbmRpYWxvZ2NvbnRlbnQgLm1hdC1leHBhbnNpb24tcGFuZWwtaGVhZGVyIHtcclxuICBwYWRkaW5nOiAwIDE0cHg7XHJcbiAgaGVpZ2h0OiA0NHB4ICFpbXBvcnRhbnQ7XHJcbn1cclxuLmRlc2lnbmRpYWxvZ2NvbnRlbnQgLm1hdC1leHBhbnNpb24tcGFuZWwtYm9keSB7XHJcbiAgcGFkZGluZzogMCAxNHB4IDJweDtcclxufVxyXG4uZGVzaWduZGlhbG9nY29udGVudCB0ZXh0YXJlYSB7XHJcbiAgbWluLWhlaWdodDogNDJweCAhaW1wb3J0YW50O1xyXG4gIGhlaWdodDogNDJweCAhaW1wb3J0YW50O1xyXG59XHJcbi5kZXNpZ25mb3JtIHtcclxuICB3aWR0aDogOTglO1xyXG4gIG1hcmdpbi1sZWZ0OiAxMHB4O1xyXG59XHJcbi5kZXNpZ25yb3cge1xyXG4gIG1hcmdpbi1sZWZ0OiAxNHB4O1xyXG4gIG1hcmdpbi1yaWdodDogMTRweDtcclxufVxyXG4uZGVzaWducm93IHAge1xyXG4gIGZvbnQtc2l6ZTogMC44ZW07XHJcbiAgY29sb3I6ICMwMDAwMDA7XHJcbiAgZm9udC13ZWlnaHQ6IDYwMDtcclxufVxyXG4uZGVzaWduZm9ybSAuZm9ybXJhZGlvZ3JvdXAge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG59XHJcblxyXG4uYXJjaGl0ZWN0dXJldXBsb2FkY29sIHtcclxuICBwYWRkaW5nLWxlZnQ6IDBweDtcclxuICBwYWRkaW5nLXJpZ2h0OiAwcHg7XHJcbn1cclxuXHJcbi5wcmlvcml0eWJ1dHRvbiB7XHJcbiAgbWFyZ2luLXRvcDogMC41cmVtO1xyXG4gIGZvbnQtc2l6ZTogMC43ZW07XHJcbn1cclxuXHJcbi5wZGZzZWxlY3Rpb25wcmV2aWV3IGltZyB7XHJcbiAgd2lkdGg6IDQwcHg7XHJcbn1cclxuXHJcbi5wZGZzZWxlY3Rpb25wcmV2aWV3IHAge1xyXG4gIG1hcmdpbi1ib3R0b206IDBweDtcclxuICBjb2xvcjogIzAwMDAwMDtcclxuICBmb250LXNpemU6IDAuN3JlbTtcclxufVxyXG5cclxuLnBkZnByZXZpZXdjb2wge1xyXG4gIHBhZGRpbmctbGVmdDogMHB4O1xyXG4gIHBhZGRpbmctcmlnaHQ6IDBweDtcclxufVxyXG4uYmFjayB7XHJcbiAgYm9yZGVyOiByZWQ7XHJcbiAgbWFyZ2luLXRvcDogNnB4O1xyXG4gIGJhY2tncm91bmQ6IGJvdHRvbTtcclxufVxyXG4udmFsaWQge1xyXG4gIGNvbG9yOiAjMDAwMDAwO1xyXG59XHJcbi5pbnZhbGlkIHtcclxuICBjb2xvcjogcmVkO1xyXG59XHJcbi5sb2FkZXIge1xyXG4gIHdpZHRoOiAxMDBweDtcclxuICBsZWZ0OiA0NSU7XHJcbiAgaGVpZ2h0OiAxMDBweDtcclxuICB0b3A6IDUwJTtcclxufVxyXG5cclxuLnNwaW5uZXJ0ZXh0IHtcclxuICBtYXJnaW4tdG9wOiAxNnB4ICFpbXBvcnRhbnQ7XHJcbiAgY29sb3I6ICMzYzc4ZDg7XHJcbn1cclxuXHJcbi5zcGlubmVyY2FyZCB7XHJcbiAgd2lkdGg6IDI2JTtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgbGVmdDogMzQlO1xyXG4gIHRvcDogMzYlO1xyXG59XHJcbi53b3JkIHtcclxuICBmb250LWtlcm5pbmc6IG5vcm1hbDtcclxufVxyXG5cclxuLyogQ2hyb21lLCBTYWZhcmksIEVkZ2UsIE9wZXJhICovXHJcbmlucHV0Ojotd2Via2l0LW91dGVyLXNwaW4tYnV0dG9uLFxyXG5pbnB1dDo6LXdlYmtpdC1pbm5lci1zcGluLWJ1dHRvbiB7XHJcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xyXG4gIG1hcmdpbjogMDtcclxufVxyXG5cclxuLyogRmlyZWZveCAqL1xyXG5pbnB1dFt0eXBlPVwibnVtYmVyXCJdIHtcclxuICAtbW96LWFwcGVhcmFuY2U6IHRleHRmaWVsZDtcclxufVxyXG5cclxuLmxpc3QtYm9yZGVyIHtcclxuICBwYWRkaW5nOiAxMHB4IDAgMTBweCAwcHg7XHJcbn1cclxuLmRlbGV0ZS1idG4ge1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxufVxyXG5cclxuLy8gLm1hdC1mb3JtLWZpZWxkLWF1dG9maWxsLWNvbnRyb2x7XHJcbi8vICAgd2lkdGg6IDIwMCUgIWltcG9ydGFudDtcclxuLy8gICBtYXgtd2lkdGg6IDIwMCUgIWltcG9ydGFudDtcclxuLy8gfVxyXG5cclxuLy8gLm1hdC1mb3JtLWZpZWxkLWF1dG9maWxsLWNvbnRyb2x7XHJcbi8vICAgd2lkdGg6IDIwMCUgIWltcG9ydGFudDtcclxuLy8gICBtYXgtd2lkdGg6IDIwMCUgIWltcG9ydGFudDtcclxuLy8gfVxyXG5cclxuLy8gLnBhYy1jb250YWluZXIge1xyXG4vLyAgIGJveC1zaXppbmc6IGNvbnRlbnQtYm94O1xyXG4vLyAgIHBhZGRpbmctcmlnaHQ6IDRweDtcclxuLy8gfVxyXG5cclxuLmZpbGUtaWNvbiB7XHJcbiAgd2lkdGg6IDIwcHggIWltcG9ydGFudDtcclxufVxyXG5cclxuLyogQ2hyb21lLCBTYWZhcmksIEVkZ2UsIE9wZXJhICovXHJcbmlucHV0Ojotd2Via2l0LW91dGVyLXNwaW4tYnV0dG9uLFxyXG5pbnB1dDo6LXdlYmtpdC1pbm5lci1zcGluLWJ1dHRvbiB7XHJcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xyXG4gIG1hcmdpbjogMDtcclxufVxyXG5cclxuLyogRmlyZWZveCAqL1xyXG5pbnB1dFt0eXBlPVwibnVtYmVyXCJdIHtcclxuICAtbW96LWFwcGVhcmFuY2U6IHRleHRmaWVsZDtcclxufVxyXG5cclxuLmxpc3QtYm9yZGVyIHtcclxuICBwYWRkaW5nOiAxMHB4IDAgMTBweCAwcHg7XHJcbn1cclxuLmRlbGV0ZS1idG4ge1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxufVxyXG5cclxuXHJcbmlvbi1sYWJlbCB7XHJcbiAgY29sb3I6ICM2QzZDNkMgIWltcG9ydGFudDtcclxufVxyXG5cclxuLmVycm9yIHtcclxuICBjb2xvcjogcmdiKDIyMywgNjIsIDYyKTtcclxuICBmb250LXNpemU6IDExcHg7XHJcbn1cclxuXHJcbi5zZWxlY3RfZGl2IHtcclxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI0UxRTFFMTtcclxufVxyXG5cclxuaW9uLXNlbGVjdHtcclxuICBtYXgtd2lkdGg6IDEwMCUgIWltcG9ydGFudDtcclxuICB3aWR0aDogMTAwJSAhaW1wb3J0YW50O1xyXG4gIHBhZGRpbmctbGVmdDogMHB4ICFpbXBvcnRhbnQ7XHJcbn1cclxuaW5wdXRbdHlwZT1cImZpbGVcIl17XHJcbiAgdmlzaWJpbGl0eTpoaWRkZW47XHJcbn1cclxuXHJcbi5tclR7XHJcbiAgbWFyZ2luLXRvcDotMTFweCAhaW1wb3J0YW50O2ZvbnQtc2l6ZTogMTBweCFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbi5mb250e1xyXG4gIGZvbnQtc2l6ZTogMTBweDtcclxufVxyXG5cclxuLmZvbnQtc2l6ZXtcclxuICBmb250LXNpemU6IDEycHg7XHJcbn1cclxuIl19 */");

/***/ })

}]);
//# sourceMappingURL=sales-proposal-sales-proposal-module.js.map