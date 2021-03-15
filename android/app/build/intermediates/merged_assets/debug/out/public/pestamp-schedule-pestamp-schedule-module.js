(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pestamp-schedule-pestamp-schedule-module"],{

/***/ "/87C":
/*!***************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pestamp-schedule/pestamp-schedule.page.html ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- <ion-header>\r\n  <ion-toolbar>\r\n    <ion-buttons slot=\"start\">\r\n      <ion-menu-button></ion-menu-button>\r\n    </ion-buttons>\r\n    <ion-title>pestamp-schedule</ion-title>\r\n  </ion-toolbar>\r\n</ion-header> -->\r\n<ion-row>\r\n  <ion-col>\r\n    <h5 class=\"ion-no-margin ion-padding\" style=\"font-weight: bolder;padding-bottom: 2px;\">Add PE Stamp Request </h5>\r\n  </ion-col>\r\n  <ion-col size=\"auto\" style=\"align-self: center;\">\r\n    <ion-button fill=\"clear\" size=\"small\" class=\"ion-no-padding\" (click)=\"goBack()\">\r\n        <ion-icon name=\"close-outline\" style=\"color: dimgrey;\" size=\"large\"></ion-icon>\r\n    </ion-button>\r\n  </ion-col>\r\n</ion-row>\r\n\r\n<ion-content class=\"ion-padding-start ion-padding-end ion-padding-bottom\" style=\"height:650px\">\r\n  <form [formGroup]=\"firstFormGroup\" novalidate style=\"overflow:scroll\">\r\n    <ion-row>\r\n      <ion-col>\r\n        <ion-item class=\"ion-no-padding\">\r\n          <ion-label position=\"floating\" class=\"label\">Name*</ion-label>\r\n          <ion-input class=\"form_input\" type=\"name\" autocapitalize=\"none\" autocomplete=\"off\"\r\n          formControlName=\"name\"  ></ion-input>\r\n        </ion-item>\r\n        <div style=\"height: 5px;\">\r\n          <div *ngIf=\"firstFormGroup.get('name').hasError('pattern') && firstFormGroup.get('name').dirty\">\r\n              <span class=\"error\">{{nameError}}</span>\r\n          </div>\r\n          <div *ngIf=\"firstFormGroup.get('name').value === '' && firstFormGroup.get('name').dirty\">\r\n              <span class=\"error\">{{fieldRequired}}</span>\r\n          </div>\r\n      </div>\r\n      </ion-col>\r\n    </ion-row>\r\n    <ion-row>\r\n      <ion-col>\r\n        <ion-item class=\"ion-no-padding\">\r\n          <ion-label position=\"floating\" class=\"label\">Email*</ion-label>\r\n           <ion-input class=\"form_input\" type=\"email\" autocapitalize=\"none\" autocomplete=\"off\"\r\n          formControlName=\"email\" [disabled]=\"fieldDisabled\" ></ion-input>\r\n                  \r\n        </ion-item>\r\n        <div style=\"height: 5px;\">\r\n          <div *ngIf=\"firstFormGroup.get('email').hasError('pattern') && firstFormGroup.get('email').dirty\">\r\n              <span class=\"error\">{{emailError}}</span>\r\n          </div>\r\n          <div *ngIf=\"firstFormGroup.get('email').value === '' && firstFormGroup.get('email').dirty\">\r\n              <span class=\"error\">{{fieldRequired}}</span>\r\n          </div>\r\n      </div>\r\n      </ion-col>\r\n    </ion-row>\r\n    <ion-row style=\"margin-top: 20px;\">\r\n      <ion-label style=\"font-weight: bold;\">Mode of Stamping</ion-label>\r\n    </ion-row>\r\n    <ion-radio-group formControlName=\"stampingmode\" (ionChange)=\"stampingModeOption($event)\">\r\n      <ion-row >\r\n        <ion-col size=\"auto\">\r\n      <ion-item lines=\"none\">\r\n        <ion-label class=\"margin\" style=\"font-size: small;\">Email Copy</ion-label>\r\n        <ion-radio slot=\"start\" [disabled]=\"fieldDisabled\" value=\"ecopy\" ></ion-radio>\r\n      </ion-item>\r\n    </ion-col>\r\n    <ion-col size=\"auto\">\r\n      <ion-item lines=\"none\">\r\n        <ion-label class=\"margin\"   style=\"font-size: small;\">Hard Copy</ion-label>\r\n        <ion-radio slot=\"start\" [disabled]=\"fieldDisabled\" value=\"hardcopy\" ></ion-radio>\r\n      </ion-item>\r\n    </ion-col>\r\n    <ion-col size=\"auto\">\r\n      <ion-item lines=\"none\">\r\n        <ion-label class=\"margin\"   style=\"font-size: small;\">Both</ion-label>\r\n        <ion-radio slot=\"start\" [disabled]=\"fieldDisabled\"  value=\"both\" ></ion-radio>\r\n      </ion-item>\r\n    </ion-col>\r\n    </ion-row>\r\n    </ion-radio-group>\r\n    <!-- <ion-row *ngIf=\"!isECopy\"> -->\r\n      <ion-row *ngIf=\"stampingModeValue == 'hardcopy' || stampingModeValue == 'both'\">\r\n      <ion-col>\r\n          <ion-item class=\"ion-no-padding\">\r\n              <ion-label position=\"floating\" class=\"label\">No. of Hard Copies*</ion-label>\r\n              <ion-input type=\"cell\" class=\"form_input\" autocapitalize=\"words\"\r\n                          formControlName=\"numberofhardcopy\" autocomplete=\"off\" maxLength=\"4\"></ion-input>\r\n          </ion-item>\r\n          <div style=\"height: 5px;\">\r\n            <div *ngIf=\"firstFormGroup.get('numberofhardcopy').hasError('max') && firstFormGroup.get('numberofhardcopy').dirty\">\r\n                <span class=\"error\">{{hardCopiesError}}</span>\r\n            </div>\r\n            <div *ngIf=\"(firstFormGroup.get('numberofhardcopy').dirty && firstFormGroup.get('numberofhardcopy').hasError('pattern')) || (firstFormGroup.get('numberofhardcopy').hasError('min') && firstFormGroup.get('numberofhardcopy').dirty)\">\r\n              <span class=\"error\">{{hardCopiesPatternError}}</span>\r\n          </div>\r\n            <div *ngIf=\"firstFormGroup.get('numberofhardcopy').value === '' && firstFormGroup.get('numberofhardcopy').dirty\">\r\n                <span class=\"error\">{{fieldRequired}}</span>\r\n            </div>\r\n        </div>\r\n      </ion-col>  \r\n  </ion-row>\r\n  <ion-row *ngIf=\"stampingModeValue == 'hardcopy' || stampingModeValue == 'both'\">\r\n    <ion-col>\r\n      <!-- <ion-item class=\"ion-no-padding\">\r\n        <ion-label position=\"floating\" class=\"label\">Shipping Address*</ion-label>\r\n        <ion-input type=\"text\" class=\"form_input\" autocapitalize=\"words\"\r\n                    formControlName=\"shippingaddress\" autocomplete=\"off\"  (ionChange)=\"updateSearchResults($event)\"\r\n                    (ionClear)=\"onCancel()\" debounce=\"300\"\r\n                    (ionFocus)=\"forAutoComplete($event)\" (ionBlur)=\"onBlur()\"></ion-input>\r\n    </ion-item> -->\r\n    <ion-item class=\"ion-no-padding\">\r\n      <ion-label position=\"floating\" class=\"label\">Shipping Address*</ion-label>\r\n      <ion-input type=\"text\" class=\"form_input\" autocapitalize=\"words\"\r\n                  formControlName=\"shippingaddress\" autocomplete=\"off\"></ion-input>\r\n  </ion-item>\r\n    <!-- <ion-list *ngIf=\"autocompleteItems.length > 0 && autoCompleteOff\">\r\n      <ion-item *ngFor=\"let item of autocompleteItems\" tappable (click)=\"selectSearchResult(item)\">\r\n          <ion-label>\r\n              {{ item.description }}\r\n          </ion-label>\r\n      </ion-item>\r\n  </ion-list> -->\r\n  <div style=\"height: 5px;\">\r\n    <div *ngIf=\"firstFormGroup.get('shippingaddress').hasError('pattern') && firstFormGroup.get('shippingaddress').dirty\">\r\n        <span class=\"error\">{{addressError}}</span>\r\n    </div>\r\n    <div *ngIf=\"firstFormGroup.get('shippingaddress').value === '' && firstFormGroup.get('shippingaddress').dirty\">\r\n        <span class=\"error\">{{fieldRequired}}</span>\r\n    </div>\r\n</div>\r\n\r\n\r\n  <!-- <ion-item *ngIf=\"autocompleteItems.length === 0\" lines=\"none\">\r\n      <ion-label class=\"ion-text-center\">\r\n          Search for address\r\n      </ion-label>\r\n  </ion-item> -->\r\n    </ion-col>\r\n  </ion-row>\r\n  <ion-row *ngIf=\"stampingModeValue == 'hardcopy' || stampingModeValue == 'both'\">\r\n    <ion-col>\r\n      <ion-item class=\"ion-no-padding\">\r\n        <ion-label position=\"floating\" class=\"label\">Contact Number*</ion-label>\r\n        <ion-input type=\"tel\" class=\"form_input\" autocapitalize=\"none\"\r\n                    formControlName=\"contactnumber\" autocomplete=\"off\" maxLength=\"15\"></ion-input>\r\n    </ion-item>\r\n    <div style=\"height: 5px;\">\r\n      <div *ngIf=\"firstFormGroup.get('contactnumber').hasError('pattern') && firstFormGroup.get('contactnumber').dirty\">\r\n          <span class=\"error\">{{contactError}}</span>\r\n      </div>\r\n      <div *ngIf=\"firstFormGroup.get('contactnumber').value === '' && firstFormGroup.get('contactnumber').dirty\">\r\n          <span class=\"error\">{{fieldRequired}}</span>\r\n      </div>\r\n  </div>\r\n    </ion-col>\r\n  </ion-row>\r\n\r\n  <ion-row>\r\n    <ion-col size=\"6\">\r\n      <ion-item class=\"ion-no-padding\">\r\n          <!-- <ion-label style=\"display: none;\">Mounting Type*</ion-label> -->\r\n          <ion-label position=\"floating\">Property Type*</ion-label>\r\n          <!-- <ion-label position=\"floating\">mounting type</ion-label> -->\r\n          <ion-select class=\"form_input select_div\"\r\n                      ok-text=\"\" cancel-text=\"\"\r\n                      formControlName=\"propertytype\" [disabled]=\"fieldDisabled\" interface=\"popover\">\r\n              <ion-select-option value=\"residential\">Residential</ion-select-option>\r\n              <ion-select-option value=\"commercial\">Commercial</ion-select-option>\r\n          </ion-select>\r\n      </ion-item>\r\n  </ion-col>\r\n    <ion-col size=\"6\">\r\n      <ion-item class=\"ion-no-padding\">\r\n          <!-- <ion-label style=\"display: none;\">Mounting Type*</ion-label> -->\r\n          <ion-label position=\"floating\">Mounting Type*</ion-label>\r\n          <!-- <ion-label position=\"floating\">mounting type</ion-label> -->\r\n          <ion-select class=\"form_input select_div\"\r\n                      ok-text=\"\" cancel-text=\"\"\r\n                      formControlName=\"mountingtype\" [disabled]=\"fieldDisabled\" interface=\"popover\">\r\n              <ion-select-option value=\"roof\">Roof</ion-select-option>\r\n              <ion-select-option value=\"ground\">Ground</ion-select-option>\r\n              <ion-select-option value=\"both\">Both</ion-select-option>\r\n          </ion-select>\r\n      </ion-item>\r\n  </ion-col>\r\n  \r\n</ion-row>\r\n\r\n    <ion-row style=\"margin-top: 20px;\">\r\n    <ion-label style=\"font-weight: bold;\">Type of Stamping</ion-label>\r\n  </ion-row>\r\n  <ion-radio-group formControlName=\"stampingtype\" (ionChange)=\"stampingTypeOption($event)\">\r\n    <ion-row >\r\n      <ion-col size=\"auto\">\r\n    <ion-item lines=\"none\">\r\n      <ion-label class=\"margin\" style=\"font-size: small;\">Structural</ion-label>\r\n      <ion-radio slot=\"start\" [disabled]=\"fieldDisabled\" value=\"structural\"></ion-radio>\r\n    </ion-item>\r\n  </ion-col>\r\n  <ion-col size=\"auto\">\r\n    <ion-item lines=\"none\">\r\n      <ion-label class=\"margin\"   style=\"font-size: small;\">Electrical</ion-label>\r\n      <ion-radio slot=\"start\" [disabled]=\"fieldDisabled\" value=\"electrical\"></ion-radio>\r\n    </ion-item>\r\n  </ion-col>\r\n  <ion-col size=\"auto\">\r\n    <ion-item lines=\"none\">\r\n      <ion-label class=\"margin\"   style=\"font-size: small;\">Both</ion-label>\r\n      <ion-radio slot=\"start\" [disabled]=\"fieldDisabled\" value=\"both\"></ion-radio>\r\n    </ion-item>\r\n  </ion-col>\r\n  </ion-row>\r\n  </ion-radio-group>\r\n  <ion-row *ngIf=\"stampingTypeValue == 'electrical'\" class=\"ion-align-items-center ion-justify-content-center\">\r\n    <ion-col size=\"12\">\r\n      <ion-item class=\"ion-no-padding\">\r\n          <ion-label style=\"display: none;\">Job Type*</ion-label>\r\n          <ion-label position=\"floating\">Job Type*</ion-label>\r\n          <ion-select   [disabled] = \"nonEditableField\" class=\"form_input select_div\"\r\n                      ok-text=\"\"\r\n                      cancel-text=\"\"\r\n                      formControlName=\"jobtype\" interface=\"popover\">\r\n              <ion-select-option value=\"pvbattery\">PV+Battery</ion-select-option>\r\n              <ion-select-option value=\"battery\">Battery</ion-select-option>\r\n              <ion-select-option value=\"pv\">PV</ion-select-option>\r\n          </ion-select>\r\n      </ion-item>\r\n  </ion-col>\r\n  </ion-row>\r\n  <ion-row *ngIf=\"stampingTypeValue == 'structural' || stampingTypeValue =='both'\">\r\n    <ion-col size=\"12\">\r\n  \r\n        <ng-container>\r\n            <ion-item class=\"ion-no-padding\" (click)=\"attic.click()\">\r\n                <ion-label position=\"floating\" class=\"label\">Attic Photos*</ion-label>\r\n                    <input type=\"file\" #attic class=\"form_input\" (change)=\"atticFiles($event)\" style=\"margin-top: 12px;\" formControlName=\"atticphotos\" multiple>\r\n                    <ion-icon name=\"attach-outline\" slot=\"end\" style=\"margin-top:21px\"></ion-icon>\r\n                </ion-item>\r\n                <div *ngFor=\"let file of atticPhotosList;let i = index\">\r\n                    <ion-item>\r\n                        <ion-col size=\"11\">\r\n                            {{file.name}}\r\n                        </ion-col>\r\n                        <ion-col size=\"1\" (click)=\"removeArc(i,'attic')\">x</ion-col>\r\n                    </ion-item>\r\n                </div>\r\n                </ng-container>\r\n                \r\n            </ion-col>\r\n            <ng-container *ngIf=\"design && design.atticphotos !==null\">\r\n              <div *ngFor=\"let arc of design.atticphotos;let i=index\">\r\n                 <ion-item>\r\n                     <ion-col size=\"auto\"> {{arc.name}}{{arc.ext}}</ion-col>\r\n                     <!-- <ion-col size=\"1\" (click)=\"removeattachment(arc,i)\">x</ion-col> -->\r\n                     <ion-col size=\"1\" (click)=\"removeattachment(arc,i,'attic')\">x</ion-col> \r\n                    \r\n\r\n                 </ion-item>\r\n             \r\n                 \r\n             </div> \r\n          </ng-container>\r\n    \r\n  </ion-row>\r\n  <ion-row *ngIf=\"stampingTypeValue == 'structural' || stampingTypeValue =='both'\">\r\n    <ion-col size=\"12\">\r\n  \r\n        <ng-container>\r\n            <ion-item class=\"ion-no-padding\" (click)=\"roof.click()\">\r\n                <ion-label position=\"floating\" class=\"label\">Roof Photos*</ion-label>\r\n                    <input type=\"file\" #roof class=\"form_input\" (change)=\"roofFiles($event)\" style=\"margin-top: 12px;\" formControlName=\"roofphotos\" multiple>\r\n                    <ion-icon name=\"attach-outline\" slot=\"end\" style=\"margin-top:21px\"></ion-icon>\r\n                </ion-item>\r\n                <div *ngFor=\"let file of roofPhotosList;let i = index\">\r\n                    <ion-item>\r\n                        <ion-col size=\"11\">\r\n                            {{file.name}}\r\n                        </ion-col>\r\n                        <ion-col size=\"1\" (click)=\"removeArc(i,'roof')\">x</ion-col>\r\n                    </ion-item>\r\n                </div>\r\n                </ng-container>\r\n                \r\n            </ion-col>\r\n            <ng-container *ngIf=\"design && design.roofphotos !==null\">\r\n              <div *ngFor=\"let arc of design.roofphotos;let i=index\">\r\n                 <ion-item>\r\n                     <ion-col size=\"auto\"> {{arc.name}}{{arc.ext}}</ion-col>\r\n                     <!-- <ion-col size=\"1\" (click)=\"removeattachment(arc,i)\">x</ion-col> -->\r\n                     <ion-col size=\"1\" (click)=\"removeattachment(arc,i,'roof')\">x</ion-col> \r\n                    \r\n\r\n                 </ion-item>\r\n             \r\n                 \r\n             </div> \r\n          </ng-container>\r\n    \r\n  </ion-row>\r\n  <ion-row *ngIf=\"stampingTypeValue == 'structural' || stampingTypeValue =='both' || stampingTypeValue == 'electrical'\">\r\n    <ion-col size=\"12\">\r\n  \r\n        <ng-container>\r\n            <ion-item class=\"ion-no-padding\" (click)=\"permitplan.click()\">\r\n                <ion-label position=\"floating\" class=\"label\">Permit Plan*</ion-label>\r\n                    <input type=\"file\" #permitplan class=\"form_input\" (change)=\"permitPlanFiles($event)\" accept=\"application/pdf\" style=\"margin-top: 12px;\" formControlName=\"permitplanphotos\" multiple>\r\n                    <ion-icon name=\"attach-outline\" slot=\"end\" style=\"margin-top:21px\"></ion-icon>\r\n                </ion-item>\r\n                <div *ngFor=\"let file of permitPlanList;let i = index\">\r\n                    <ion-item>\r\n                        <ion-col size=\"11\">\r\n                            {{file.name}}\r\n                        </ion-col>\r\n                        <ion-col size=\"1\" (click)=\"removeArc(i,'permitplan')\">x</ion-col>\r\n                    </ion-item>\r\n                </div>\r\n                </ng-container>\r\n                \r\n            </ion-col>\r\n            <ng-container *ngIf=\"design && design.permitplan !==null\">\r\n              <div *ngFor=\"let arc of design.permitplan;let i=index\">\r\n                 <ion-item>\r\n                     <ion-col size=\"auto\" > {{arc.name}}{{arc.ext}}</ion-col>\r\n                     <!-- <ion-col size=\"1\" (click)=\"removePermitPlan(arc,i)\">x</ion-col> -->\r\n                     <ion-col size=\"1\" (click)=\"removeattachment(arc,i,'permitplan')\">x</ion-col> \r\n                    \r\n\r\n                 </ion-item>\r\n             \r\n                 \r\n             </div> \r\n          </ng-container>\r\n    \r\n  </ion-row>\r\n  <!-- <ion-row style=\"margin-top: 20px;\">\r\n    <ion-label style=\"font-weight: bold;\">Type of Stamping</ion-label>\r\n  </ion-row>\r\n  <ion-radio-group formControlName=\"stampingtype\" (ionChange)=\"stampingTypeOption($event)\">\r\n    <ion-row >\r\n      <ion-col size=\"auto\">\r\n    <ion-item lines=\"none\">\r\n      <ion-label class=\"margin\" style=\"font-size: small;\">Structural</ion-label>\r\n      <ion-radio slot=\"start\" value=\"structural\"></ion-radio>\r\n    </ion-item>\r\n  </ion-col>\r\n  <ion-col size=\"auto\">\r\n    <ion-item lines=\"none\">\r\n      <ion-label class=\"margin\"   style=\"font-size: small;\">Electrical</ion-label>\r\n      <ion-radio slot=\"start\"  value=\"electrical\"></ion-radio>\r\n    </ion-item>\r\n  </ion-col>\r\n  <ion-col size=\"auto\">\r\n    <ion-item lines=\"none\">\r\n      <ion-label class=\"margin\"   style=\"font-size: small;\">Both</ion-label>\r\n      <ion-radio slot=\"start\"  value=\"both\"></ion-radio>\r\n    </ion-item>\r\n  </ion-col>\r\n  </ion-row>\r\n  </ion-radio-group> -->\r\n\r\n  <ion-row style=\"margin-top: 16px;\">\r\n    <ion-col size=\"12\">\r\n        <span class=\"input-placeholder\">Comments</span>\r\n    </ion-col>\r\n    <ion-col size=\"12\" style=\"padding-top: 0px;\">\r\n        <ion-textarea style=\"max-width: 98%;\" class=\"ion-no-margin ion-no-padding comment_box\" rows=\"3\"\r\n         formControlName=\"comment\"></ion-textarea>\r\n    </ion-col>\r\n</ion-row>\r\n</form>\r\n<!-- <form [formGroup]=\"secondFormGroup\" novalidate style=\"overflow:scroll\">\r\n \r\n</form> -->\r\n</ion-content>\r\n<ion-row>\r\n  <ion-col></ion-col>\r\n  <ion-col size=\"auto\">\r\n      <ion-button class=\"action-button-color\" fill=\"clear\" (click)=\"submitForm('save')\">Save</ion-button>\r\n      <ion-button class=\"action-button-color\" *ngIf=\"userdata.role.type=='clientsuperadmin' || userdata.role.type=='clientadmin'\" fill=\"clear\" (click)=\"submitForm('send')\">Send to Wattmonk</ion-button>\r\n      </ion-col>\r\n      </ion-row>");

/***/ }),

/***/ "3p9n":
/*!*********************************************************************!*\
  !*** ./src/app/pestamp-schedule/pestamp-schedule-routing.module.ts ***!
  \*********************************************************************/
/*! exports provided: PestampSchedulePageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PestampSchedulePageRoutingModule", function() { return PestampSchedulePageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _pestamp_schedule_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pestamp-schedule.page */ "Y/Sg");




const routes = [
    {
        path: '',
        component: _pestamp_schedule_page__WEBPACK_IMPORTED_MODULE_3__["PestampSchedulePage"]
    }
];
let PestampSchedulePageRoutingModule = class PestampSchedulePageRoutingModule {
};
PestampSchedulePageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], PestampSchedulePageRoutingModule);



/***/ }),

/***/ "A7yG":
/*!*************************************************************!*\
  !*** ./src/app/pestamp-schedule/pestamp-schedule.page.scss ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("input[type=file] {\n  visibility: hidden;\n}\n\n.label {\n  color: #6C6C6C !important;\n  font-size: 15px;\n}\n\n.error {\n  color: #df3e3e;\n  font-size: 11px;\n}\n\n.select_div {\n  border-bottom: 1px solid #E1E1E1;\n}\n\nion-label {\n  color: #6C6C6C !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXHBlc3RhbXAtc2NoZWR1bGUucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksa0JBQUE7QUFDSjs7QUFFRTtFQUNFLHlCQUFBO0VBQ0EsZUFBQTtBQUNKOztBQUVFO0VBQ0UsY0FBQTtFQUNBLGVBQUE7QUFDSjs7QUFFRTtFQUNFLGdDQUFBO0FBQ0o7O0FBQ0U7RUFDRSx5QkFBQTtBQUVKIiwiZmlsZSI6InBlc3RhbXAtc2NoZWR1bGUucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiaW5wdXRbdHlwZT1cImZpbGVcIl17XHJcbiAgICB2aXNpYmlsaXR5OmhpZGRlbjtcclxuICB9XHJcblxyXG4gIC5sYWJlbCB7XHJcbiAgICBjb2xvcjogIzZDNkM2QyAhaW1wb3J0YW50O1xyXG4gICAgZm9udC1zaXplOiAxNXB4O1xyXG4gIH1cclxuXHJcbiAgLmVycm9yIHtcclxuICAgIGNvbG9yOiByZ2IoMjIzLCA2MiwgNjIpO1xyXG4gICAgZm9udC1zaXplOiAxMXB4O1xyXG4gIH1cclxuXHJcbiAgLnNlbGVjdF9kaXYge1xyXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNFMUUxRTE7XHJcbiAgfVxyXG4gIGlvbi1sYWJlbCB7XHJcbiAgICBjb2xvcjogIzZDNkM2QyAhaW1wb3J0YW50O1xyXG4gIH0iXX0= */");

/***/ }),

/***/ "FT9i":
/*!*************************************************************!*\
  !*** ./src/app/pestamp-schedule/pestamp-schedule.module.ts ***!
  \*************************************************************/
/*! exports provided: PestampSchedulePageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PestampSchedulePageModule", function() { return PestampSchedulePageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _pestamp_schedule_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./pestamp-schedule-routing.module */ "3p9n");
/* harmony import */ var _pestamp_schedule_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./pestamp-schedule.page */ "Y/Sg");
/* harmony import */ var _ionic_native_diagnostic_ngx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic-native/diagnostic/ngx */ "mtRb");
/* harmony import */ var _ionic_native_native_geocoder_ngx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic-native/native-geocoder/ngx */ "h+qT");









let PestampSchedulePageModule = class PestampSchedulePageModule {
};
PestampSchedulePageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _pestamp_schedule_routing_module__WEBPACK_IMPORTED_MODULE_5__["PestampSchedulePageRoutingModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"]
        ],
        declarations: [_pestamp_schedule_page__WEBPACK_IMPORTED_MODULE_6__["PestampSchedulePage"]],
        providers: [
            _ionic_native_diagnostic_ngx__WEBPACK_IMPORTED_MODULE_7__["Diagnostic"],
            _ionic_native_native_geocoder_ngx__WEBPACK_IMPORTED_MODULE_8__["NativeGeocoder"],
        ]
    })
], PestampSchedulePageModule);



/***/ }),

/***/ "Y/Sg":
/*!***********************************************************!*\
  !*** ./src/app/pestamp-schedule/pestamp-schedule.page.ts ***!
  \***********************************************************/
/*! exports provided: PestampSchedulePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PestampSchedulePage", function() { return PestampSchedulePage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_pestamp_schedule_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./pestamp-schedule.page.html */ "/87C");
/* harmony import */ var _pestamp_schedule_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pestamp-schedule.page.scss */ "A7yG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_native_native_geocoder_ngx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic-native/native-geocoder/ngx */ "h+qT");
/* harmony import */ var _storage_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../storage.service */ "qkCY");
/* harmony import */ var _utilities_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utilities.service */ "oTnF");
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../api.service */ "yTNM");
/* harmony import */ var _model_constants__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../model/constants */ "Kp5Z");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _networkdetect_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../networkdetect.service */ "UZ2B");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @cometchat-pro/cordova-ionic-chat */ "ujHh");
/* harmony import */ var _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _utilities_mixpanel_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../utilities/mixpanel.service */ "uKCw");















let PestampSchedulePage = class PestampSchedulePage {
    //user: User
    // isEditMode:boolean=false;
    // formatted_address:string;
    // map: any;
    // geoEncoderOptions: NativeGeocoderOptions = {
    //   useLocale: true,
    //   maxResults: 5
    // };
    // geocoder = new google.maps.Geocoder();
    constructor(formBuilder, storage, utils, zone, nativeGeocoder, apiService, route, network, navController, cdr, router, mixpanelService) {
        this.formBuilder = formBuilder;
        this.storage = storage;
        this.utils = utils;
        this.zone = zone;
        this.nativeGeocoder = nativeGeocoder;
        this.apiService = apiService;
        this.route = route;
        this.network = network;
        this.navController = navController;
        this.cdr = cdr;
        this.router = router;
        this.mixpanelService = mixpanelService;
        this.fieldRequired = _model_constants__WEBPACK_IMPORTED_MODULE_9__["FIELD_REQUIRED"];
        this.nameError = _model_constants__WEBPACK_IMPORTED_MODULE_9__["INVALID_NAME_MESSAGE"];
        this.emailError = _model_constants__WEBPACK_IMPORTED_MODULE_9__["INVALID_EMAIL_MESSAGE"];
        this.addressError = _model_constants__WEBPACK_IMPORTED_MODULE_9__["INVALID_ADDRESS"];
        this.contactError = _model_constants__WEBPACK_IMPORTED_MODULE_9__["INVALID_PHONE_NUMBER"];
        this.hardCopiesError = "Maximum value of hardcopy cannot exceed 10";
        this.hardCopiesPatternError = "Value of hardcopy should be a valid number";
        this.atticPhotosList = [];
        this.roofPhotosList = [];
        this.permitPlanList = [];
        this.isElectrical = false;
        this.isECopy = false;
        this.designId = 0;
        this.design = null;
        this.fieldDisabled = false;
        this.tabsDisabled = false;
        this.indexOfatticphotos = [];
        this.indexOfroofphotos = [];
        this.indexOfpermitPlanphotos = [];
        this.isRoofFileDelete = false;
        this.isAtticFileDelete = false;
        this.isPermitPlanFileDelete = false;
        // GoogleAutocomplete: google.maps.places.AutocompleteService;
        // autocompleteItems: any[];
        this.isAtticFileUpload = false;
        this.isRoofFileUpload = false;
        this.isPermitPlanFileUpload = false;
        const MAILFORMAT = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z]+(?:\.[a-zA-Z]+)*$/;
        this.firstFormGroup = this.formBuilder.group({
            name: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].pattern("^[a-zA-Z. ]{3,}$")]),
            email: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].pattern(MAILFORMAT)]),
            stampingmode: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](null, [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]),
            numberofhardcopy: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](null),
            shippingaddress: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](null),
            contactnumber: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](null),
            stampingtype: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](null, [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]),
            atticphotos: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](''),
            roofphotos: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](''),
            permitplanphotos: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](''),
            comment: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](''),
            latitude: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](''),
            longitude: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](''),
            country: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](''),
            state: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](''),
            city: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](''),
            postalcode: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](''),
            mountingtype: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]),
            propertytype: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]),
            jobtype: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('')
            // })
            // this.secondFormGroup = this.formBuilder.group({
        });
        this.designId = +this.route.snapshot.paramMap.get('id');
        // this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
        // this.autocompleteItems = [];
    }
    ionViewDidEnter() {
        this.deactivateNetworkSwitch = this.network.networkSwitch.subscribe(data => {
            this.netSwitch = data;
            console.log(this.netSwitch);
        });
    }
    ngOnInit() {
        this.fieldDisabled = false;
        this.userdata = this.storage.getUser();
        console.log(this.userdata);
        if (this.designId !== 0) {
            setTimeout(() => {
                this.getDesignDetails();
            }, 1000);
        }
    }
    /* Getting Design Details */
    getDesignDetails() {
        console.log(this.isAtticFileUpload);
        this.utils.showLoading('Getting Design Details').then(() => {
            this.apiService.getPestampDetails(this.designId).subscribe((result) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                yield this.utils.hideLoading().then(() => {
                    this.design = result;
                    console.log(this.design);
                    this.fieldDisabled = true;
                    this.atticData = this.design.atticphotos;
                    this.roofData = this.design.roofphotos;
                    this.permitPlanData = this.design.permitplan;
                    console.log(this.permitPlanData);
                    this.firstFormGroup.patchValue({
                        name: this.design.personname,
                        email: this.design.email,
                        stampingmode: this.design.modeofstamping,
                        atticphotos: this.design.atticphotos,
                        roofphotos: this.design.roofphotos,
                        permitplanphotos: this.design.permitplan,
                        stampingtype: this.design.type,
                        numberofhardcopy: this.design.hardcopies,
                        shippingaddress: this.design.deliveryaddress,
                        contactnumber: this.design.contactnumber,
                        createdby: this.design.createdby,
                        mountingtype: this.design.mountingtype,
                        propertytype: this.design.propertytype,
                        jobtype: this.design.jobtype,
                        // architecturaldesign:this.design.architecturaldesign,
                        comment: this.design.comments == '' ? '' : this.design.comments[0].message,
                        // type: this.design.type,
                        latitude: this.design.latitude,
                        longitude: this.design.longitude,
                        country: this.design.country,
                        state: this.design.state,
                        city: this.design.city,
                        postalcode: this.design.postalcode,
                    });
                });
            }), (error) => {
                this.utils.hideLoading();
            });
        });
    }
    /* FOR SELECT ATTIC FILES FROM DEVICE */
    atticFiles(event) {
        this.isAtticFileUpload = true;
        for (var i = 0; i < event.target.files.length; i++) {
            this.atticPhotosList.push(event.target.files[i]);
        }
        //this.architecturalFileUpload= true;
    }
    /* FOR UPLOAD ATTIC PHOTOS OR FILES */
    uploadAtticFiles(response) {
        console.log(this.isAtticFileUpload, "attic");
        if (!this.isAtticFileUpload) {
            this.uploadRoofFiles(response);
        }
        else {
            console.log("hello", response);
            const data = new FormData();
            for (var i = 0; i < this.atticPhotosList.length; i++) {
                data.append("files", this.atticPhotosList[i]);
                if (i == 0) {
                    //data.append('files', file);
                    data.append('path', "pestamp/" + response.id);
                    data.append('refId', "" + response.id);
                    data.append('ref', "pestamp");
                    data.append('field', "atticphotos");
                    console.log("file upload data---" + data);
                }
            }
            this.utils.showLoading("Attic File Uploading").then(() => {
                this.apiService.uploadFile(data).subscribe(res => {
                    this.utils.hideLoading();
                    this.uploadRoofFiles(response);
                    // else if(!this.isRoofFileUpload || (!this.isRoofFileUpload && !this.isPermitPlanFileUpload))
                    // {
                    // }
                }, responseError => {
                    this.utils.hideLoading();
                    const error = responseError.error;
                    this.utils.errorSnackBar(error.message[0].messages[0].message);
                });
            });
        }
    }
    /* FOR SELECT ROOF FILES OR PHOTOS FROM DEVICE */
    roofFiles(event) {
        console.log(event);
        console.log(event.target.files);
        this.isRoofFileUpload = true;
        for (var i = 0; i < event.target.files.length; i++) {
            this.roofPhotosList.push(event.target.files[i]);
        }
        //this.architecturalFileUpload= true;
        console.log(this.roofPhotosList);
    }
    /* FOR UPLOAD ROOF PHOTOS OR FILES */
    uploadRoofFiles(response) {
        console.log(this.isRoofFileUpload, "roof");
        if (!this.isRoofFileUpload) {
            this.uploadPermitPlanFiles(response);
        }
        else {
            const data = new FormData();
            for (var i = 0; i < this.roofPhotosList.length; i++) {
                data.append("files", this.roofPhotosList[i]);
                if (i == 0) {
                    //data.append('files', file);
                    data.append('path', "pestamp/" + response.id);
                    data.append('refId', "" + response.id);
                    data.append('ref', "pestamp");
                    data.append('field', "roofphotos");
                    console.log("file upload data---" + data);
                }
            }
            this.utils.showLoading("Roof File Uploading").then(() => {
                this.apiService.uploadFile(data).subscribe(res => {
                    this.utils.hideLoading();
                    this.uploadPermitPlanFiles(response);
                }, responseError => {
                    this.utils.hideLoading();
                    const error = responseError.error;
                    this.utils.errorSnackBar(error.message[0].messages[0].message);
                });
            });
        }
    }
    /* FOR SELECT PHOTOS OR FILES FOR PERMIT PLAN FROM DEVICE */
    permitPlanFiles(event) {
        console.log(event);
        console.log(event.target.files);
        this.isPermitPlanFileUpload = true;
        for (var i = 0; i < event.target.files.length; i++) {
            this.permitPlanList.push(event.target.files[i]);
        }
        //this.architecturalFileUpload= true;
        console.log(this.permitPlanList);
    }
    /* FOR UPLOAD PERMIT PLAN PHOTOS OR FILES */
    uploadPermitPlanFiles(response) {
        console.log(this.isPermitPlanFileUpload, 'permit');
        if (!this.isPermitPlanFileUpload) {
            console.log("checking...");
            this.router.navigate(['/pestamp-homepage']);
            this.utils.showSnackBar('Pe Stamp have been updated');
            this.utils.setPeStampRefresh(true);
        }
        else {
            const data = new FormData();
            for (var i = 0; i < this.permitPlanList.length; i++) {
                data.append("files", this.permitPlanList[i]);
                if (i == 0) {
                    //data.append('files', file);
                    data.append('path', "pestamp/" + response.id);
                    data.append('refId', "" + response.id);
                    data.append('ref', "pestamp");
                    data.append('field', "permitplan");
                    console.log("file upload data---" + data);
                }
            }
            this.utils.showLoading("Permit Plan Uploading").then(() => {
                this.apiService.uploadFile(data).subscribe(res => {
                    this.utils.hideLoading();
                    if (this.buttonValueCheck == 'save') {
                        this.router.navigate(['/pestamp-homepage']);
                        if (this.designId == 0) {
                            this.utils.showSnackBar('Pe Stamp have been Created');
                        }
                        else {
                            this.utils.showSnackBar('Pe Stamp have been updated');
                        }
                        // this.utils.showSnackBar('Design have been saved');
                        this.utils.setPeStampRefresh(true);
                    }
                    else {
                        let objToSend = {
                            queryParams: {
                                designData: response,
                                value: 'assign'
                            },
                            skipLocationChange: false,
                            fragment: 'top'
                        };
                        this.router.navigate(['/pestamp-payment-modal'], {
                            state: { productdetails: objToSend }
                        });
                    }
                }, responseError => {
                    this.utils.hideLoading();
                    const error = responseError.error;
                    this.utils.errorSnackBar(error.message[0].messages[0].message);
                });
            });
        }
    }
    /* FOR REMOVE SELECTED PHOTOS OR FILES */
    removeArc(i, value) {
        console.log(value);
        if (value == 'attic') {
            this.atticPhotosList.splice(i, 1);
        }
        else if (value == 'roof') {
            this.roofPhotosList.splice(i, 1);
        }
        else {
            this.permitPlanList.splice(i, 1);
        }
    }
    /* FOR TYPE OF STAMPING RADIO BUTTONS */
    stampingTypeOption(e) {
        console.log(e.target.value);
        this.stampingTypeValue = e.target.value;
        const attic = this.firstFormGroup.get('atticphotos');
        const roof = this.firstFormGroup.get('roofphotos');
        const permitplan = this.firstFormGroup.get('permitplanphotos');
        const job = this.firstFormGroup.get('jobtype');
        if (this.stampingTypeValue == 'structural' || this.stampingTypeValue == 'both') {
            attic.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]);
            roof.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]);
            permitplan.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]);
            job.clearValidators();
            job.reset();
        }
        else if (this.stampingTypeValue == 'electrical') {
            attic.clearValidators();
            attic.reset();
            roof.clearValidators();
            roof.reset();
            permitplan.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]);
            job.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]);
        }
        else {
            attic.clearValidators();
            attic.updateValueAndValidity();
            roof.clearValidators();
            roof.updateValueAndValidity();
            permitplan.clearValidators();
            permitplan.updateValueAndValidity();
            job.clearValidators();
            job.updateValueAndValidity();
        }
        // if(this.stampingTypeValue == 'electrical')
        // {
        //   this.isElectrical = true;
        // }
        // else{
        //   this.isElectrical = false;
        // }
    }
    // ngOnDestroy(): void {
    //   //this.subscription.unsubscribe();
    //   // if (this.designId === 0) {
    //     this.addressSubscription.unsubscribe();
    //   //}
    // }
    /* FOR MODE OF STAMPING RADIO BUTTONS*/
    stampingModeOption(e) {
        console.log(e);
        console.log(e.target.value);
        this.stampingModeValue = e.target.value;
        console.log(this.stampingModeValue);
        // if(this.stampingModeValue == 'ecopy')
        // {
        //   this.isECopy = true;
        // }
        // else{
        //   this.isECopy = false;
        // }
        const ADDRESSFORMAT = /^[#.0-9a-zA-Z\u00C0-\u1FFF\u2800-\uFFFD &_*#/'\s,-]+$/;
        const NUMBERPATTERN = '^[0-9]+$';
        const shipping = this.firstFormGroup.get('shippingaddress');
        const contact = this.firstFormGroup.get('contactnumber');
        const hardcopy = this.firstFormGroup.get('numberofhardcopy');
        console.log(shipping);
        console.log(contact);
        console.log(hardcopy);
        if (this.stampingModeValue == 'hardcopy' || this.stampingModeValue == 'both') {
            shipping.setValidators([
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required,
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].pattern(ADDRESSFORMAT)
            ]);
            // this.name.setValidators([
            //   Validators.required,
            //   Validators.min(1),
            //   Validators.pattern("^[a-zA-Z. ]{3,}$")]);
            contact.setValidators([
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required,
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].minLength(8),
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].maxLength(15),
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].pattern("^[0-9]{8,15}$")
            ]);
            hardcopy.setValidators([
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required,
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].min(1),
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].max(10),
                //Validators.pattern("^[0-4]+$")]);
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].pattern(NUMBERPATTERN)
            ]);
        }
        // else if(this.stampingModeValue == 'ecopy'){
        //   console.log("hello")
        //   contact.setValidators([
        //     Validators.required,
        //     Validators.minLength(8),
        //     Validators.maxLength(15),
        //     Validators.pattern("^[0-9]{8,15}$")]);
        //     shipping.clearValidators();
        //     shipping.reset();
        //     hardcopy.clearValidators();
        //     hardcopy.reset();
        // }
        else {
            shipping.clearValidators();
            shipping.updateValueAndValidity();
            contact.clearValidators();
            contact.updateValueAndValidity();
            hardcopy.clearValidators();
            hardcopy.updateValueAndValidity();
        }
    }
    goBack() {
        this.mixpanelService.track("PESTAMP_PAGE_CLOSE", {});
        this.navController.pop();
    }
    /* FOR SUBMIT FORM */
    submitForm(e) {
        console.log(e);
        this.buttonValueCheck = e;
        if (this.firstFormGroup.status == 'VALID') {
            var tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            let contactnumber = this.firstFormGroup.get('contactnumber').value;
            var stampingType = this.firstFormGroup.get('stampingtype').value;
            if (this.designId === 0) {
                if (e == 'save') {
                    this.mixpanelService.track("SAVEPESTAMP_PAGE", {});
                    //this.utils.showLoading('Saving').then(() => {
                    var data = {
                        personname: this.firstFormGroup.get('name').value,
                        email: this.firstFormGroup.get('email').value,
                        contactnumber: contactnumber,
                        hardcopies: parseInt(this.firstFormGroup.get('numberofhardcopy').value),
                        modeofstamping: this.firstFormGroup.get('stampingmode').value,
                        type: this.firstFormGroup.get('stampingtype').value,
                        mountingtype: this.firstFormGroup.get('mountingtype').value,
                        deliveryaddress: this.firstFormGroup.get('shippingaddress').value,
                        propertytype: this.firstFormGroup.get('propertytype').value,
                        comments: this.firstFormGroup.get('comment').value,
                        latitude: this.firstFormGroup.get('latitude').value,
                        longitude: this.firstFormGroup.get('longitude').value,
                        actualdelivereddate: tomorrow.toISOString(),
                        jobtype: this.firstFormGroup.get('jobtype').value,
                        source: "android",
                        createdby: this.userdata.id,
                        creatorparentid: this.userdata.parent.id,
                        status: "created",
                        outsourcedto: null,
                        //paymenttype: null,
                        paymentstatus: null
                    };
                    this.utils.showLoading('Saving').then(() => {
                        this.apiService.addSiteAssessment(data).subscribe(res => {
                            this.utils.hideLoading();
                            if (stampingType == 'structural' || stampingType == 'both') {
                                this.uploadAtticFiles(res);
                            }
                            //if(stampingType=='electrical')
                            else {
                                this.uploadPermitPlanFiles(res);
                            }
                        }, responseError => {
                            this.utils.hideLoading().then(() => {
                                const error = responseError.error;
                                this.utils.errorSnackBar(error.message[0].messages[0].message);
                            });
                            //
                        });
                    });
                }
                else if (e == 'send') {
                    this.mixpanelService.track("ORDER_PESTAMP_PAGE", {});
                    var postData = {
                        personname: this.firstFormGroup.get('name').value,
                        email: this.firstFormGroup.get('email').value,
                        contactnumber: this.firstFormGroup.get('contactnumber').value,
                        hardcopies: parseInt(this.firstFormGroup.get('numberofhardcopy').value),
                        modeofstamping: this.firstFormGroup.get('stampingmode').value,
                        type: this.firstFormGroup.get('stampingtype').value,
                        mountingtype: this.firstFormGroup.get('mountingtype').value,
                        propertytype: this.firstFormGroup.get('propertytype').value,
                        deliveryaddress: this.firstFormGroup.get('shippingaddress').value,
                        comments: this.firstFormGroup.get('comment').value,
                        latitude: this.firstFormGroup.get('latitude').value,
                        longitude: this.firstFormGroup.get('longitude').value,
                        actualdelivereddate: tomorrow.toISOString(),
                        jobtype: this.firstFormGroup.get('jobtype').value,
                        source: "android",
                        createdby: this.userdata.id,
                        creatorparentid: this.userdata.parent.id,
                        status: "created",
                        outsourcedto: null,
                        //paymenttype: null,
                        paymentstatus: null
                    };
                    this.apiService.addSiteAssessment(postData).subscribe((res) => {
                        console.log(res);
                        if (stampingType == 'structural' || stampingType == 'both') {
                            this.uploadAtticFiles(res);
                        }
                        //if(stampingType=='electrical')
                        else {
                            this.uploadPermitPlanFiles(res);
                        }
                        //this.router.navigate(['pestamp-payment-modal',{isConfirmed: false, isLater: false, ispestamp: true, pestampid: res.id}]);
                        //       let objToSend: NavigationExtras = {
                        //         queryParams: {
                        //         designData:res,
                        //         value:'assign'
                        //         },
                        //         skipLocationChange: false,
                        //         fragment: 'top'
                        //     };
                        // this.router.navigate(['/pestamp-payment-modal'], {
                        //   state: { productdetails: objToSend }
                        // });
                    }, responseError => {
                        this.utils.hideLoading().then(() => {
                            const error = responseError.error;
                            this.utils.errorSnackBar(error.message[0].messages[0].message);
                        });
                        //
                    });
                }
            }
            else {
                if (e == 'save') {
                    var data = {
                        personname: this.firstFormGroup.get('name').value,
                        email: this.firstFormGroup.get('email').value,
                        contactnumber: contactnumber,
                        hardcopies: parseInt(this.firstFormGroup.get('numberofhardcopy').value),
                        modeofstamping: this.firstFormGroup.get('stampingmode').value,
                        type: this.firstFormGroup.get('stampingtype').value,
                        mountingtype: this.firstFormGroup.get('mountingtype').value,
                        deliveryaddress: this.firstFormGroup.get('shippingaddress').value,
                        propertytype: this.firstFormGroup.get('propertytype').value,
                        comments: this.firstFormGroup.get('comment').value,
                        latitude: this.firstFormGroup.get('latitude').value,
                        longitude: this.firstFormGroup.get('longitude').value,
                        actualdelivereddate: tomorrow.toISOString(),
                        jobtype: this.firstFormGroup.get('jobtype').value,
                        source: "android",
                        createdby: this.userdata.id,
                        creatorparentid: this.userdata.parent.id,
                        status: "created",
                        outsourcedto: null,
                        //paymenttype: null,
                        paymentstatus: null
                    };
                    this.utils.showLoading('Saving').then(() => {
                        console.log(this.isAtticFileUpload);
                        this.apiService.updatePestamps(this.designId, data).subscribe(res => {
                            this.utils.hideLoading();
                            // if(stampingType=='structural' || stampingType == 'both')
                            console.log(this.isAtticFileUpload);
                            //  if(this.isAtticFileUploadEdit)
                            //         {
                            this.uploadAtticFiles(res);
                            // }
                            //if(stampingType=='electrical')
                            /*  if(this.isRoofFileUploadEdit)
                               {
                                 this.uploadRoofFiles(res);
                               }
                              if(this.isPermitPlanFileUploadEdit){
                                 this.uploadPermitPlanFiles(res);
                               }
                               if(!this.isAtticFileUploadEdit && !this.isRoofFileUploadEdit && !this.isPermitPlanFileUploadEdit){
                                 this.router.navigate(['/pestamp-homepage'])
                                this.utils.showSnackBar('Pe Stamp have been updated');
                           //     // this.utils.showSnackBar('Design have been saved');
                                this.utils.setPeStampRefresh(true);
                               }*/
                            // setTimeout(()=>{
                            //   this.utils.hideLoading().then(() => {
                            //     console.log('Res', res);
                            //     //this.createChatGroup(response);
                            //     this.router.navigate(['/pestamp-homepage'])
                            //     this.utils.showSnackBar('Pe Stamp have been updated');
                            //     // this.utils.showSnackBar('Design have been saved');
                            //     this.utils.setPeStampRefresh(true);
                            //     // this.navController.pop();
                            //     // this.utils.showSuccessModal('Desgin have been saved').then((modal) => {
                            //     //   modal.present();
                            //     //   modal.onWillDismiss().then((dismissed) => {
                            //         // this.utils.setHomepageDesignRefresh(true);
                            //     //     this.navController.pop();
                            //     //   });
                            //     // });
                            //   });
                            // },2000)
                        }, responseError => {
                            this.utils.hideLoading().then(() => {
                                const error = responseError.error;
                                this.utils.errorSnackBar(error.message[0].messages[0].message);
                            });
                            //
                        });
                    });
                }
                else if (e == 'send') {
                    var postData = {
                        personname: this.firstFormGroup.get('name').value,
                        email: this.firstFormGroup.get('email').value,
                        contactnumber: this.firstFormGroup.get('contactnumber').value,
                        hardcopies: parseInt(this.firstFormGroup.get('numberofhardcopy').value),
                        modeofstamping: this.firstFormGroup.get('stampingmode').value,
                        type: this.firstFormGroup.get('stampingtype').value,
                        mountingtype: this.firstFormGroup.get('mountingtype').value,
                        deliveryaddress: this.firstFormGroup.get('shippingaddress').value,
                        propertytype: this.firstFormGroup.get('propertytype').value,
                        comments: this.firstFormGroup.get('comment').value,
                        latitude: this.firstFormGroup.get('latitude').value,
                        longitude: this.firstFormGroup.get('longitude').value,
                        actualdelivereddate: tomorrow.toISOString(),
                        jobtype: this.firstFormGroup.get('jobtype').value,
                        source: "android",
                        createdby: this.userdata.id,
                        creatorparentid: this.userdata.parent.id,
                        status: "created",
                        outsourcedto: null,
                        //paymenttype: null,
                        paymentstatus: null
                    };
                    this.apiService.updatePestamps(this.designId, postData).subscribe(res => {
                        console.log(res);
                        if (stampingType == 'structural' || stampingType == 'both') {
                            this.uploadAtticFiles(res);
                        }
                        //if(stampingType=='electrical')
                        else {
                            this.uploadPermitPlanFiles(res);
                        }
                        //       let objToSend: NavigationExtras = {
                        //         queryParams: {
                        //         designData:res,
                        //         value:'assign'
                        //         },
                        //         skipLocationChange: false,
                        //         fragment: 'top'
                        //     };
                        // this.router.navigate(['/pestamp-payment-modal'], {
                        //   state: { productdetails: objToSend }
                        // });
                    }, responseError => {
                        this.utils.hideLoading().then(() => {
                            const error = responseError.error;
                            this.utils.errorSnackBar(error.message[0].messages[0].message);
                        });
                        //
                    });
                }
            }
        }
        else {
            if (this.firstFormGroup.value.name == '' || this.firstFormGroup.get('name').hasError('pattern')) {
                this.utils.errorSnackBar("Please check the field name");
            }
            else if (this.firstFormGroup.value.email == '' || this.firstFormGroup.get('email').hasError('pattern')) {
                this.utils.errorSnackBar("Please check the field email");
            }
            else if (this.firstFormGroup.value.stampingmode == null) {
                this.utils.errorSnackBar("Please select mode of stamping");
            }
            else if ((this.firstFormGroup.value.numberofhardcopy == null || this.firstFormGroup.value.numberofhardcopy == '') && (this.stampingModeValue == 'hardcopy' || this.stampingModeValue == 'both')) {
                this.utils.errorSnackBar("Please check the field no of hardcopies");
                console.log(this.stampingModeValue);
            }
            else if ((this.firstFormGroup.value.shippingaddress == null || this.firstFormGroup.value.shippingaddress == '' || this.firstFormGroup.get('shippingaddress').hasError('pattern')) && (this.stampingModeValue == 'hardcopy' || this.stampingModeValue == 'both')) {
                this.utils.errorSnackBar("Please check the field address");
            }
            else if ((this.firstFormGroup.value.contactnumber == null || this.firstFormGroup.get('contactnumber').hasError('pattern')) && (this.stampingModeValue == 'hardcopy' || this.stampingModeValue == 'both')) {
                this.utils.errorSnackBar("Please check the field contact number");
            }
            else if (this.firstFormGroup.value.propertytype == '') {
                this.utils.errorSnackBar("Please select property type");
            }
            else if (this.firstFormGroup.value.mountingtype == '') {
                this.utils.errorSnackBar("Please select mounting type");
            }
            else if (this.firstFormGroup.value.jobtype == '') {
                this.utils.errorSnackBar("Please select job type");
            }
            else if (this.firstFormGroup.value.atticphotos == '' && (this.stampingTypeValue == 'structural' || this.stampingTypeValue == 'both')) {
                this.utils.errorSnackBar("Please check the field attic photos");
            }
            else if (this.firstFormGroup.value.roofphotos == '' && (this.stampingTypeValue == 'structural' || this.stampingTypeValue == 'both')) {
                this.utils.errorSnackBar("Please check the field roof photos");
            }
            else if (this.firstFormGroup.value.permitplanphotos == '') {
                this.utils.errorSnackBar("Please check the field permit plan");
            }
            else {
                this.utils.errorSnackBar("Error");
            }
        }
    }
    //// For Address
    //   /* FOR SEARCH SHIPPING ADDRESS */
    //   updateSearchResults(event) {
    //     //this.autoCompleteOff = true;
    //     console.log(this.autoCompleteOff);
    //     const input = event.detail.value;
    //     if (input === '') {
    //       this.autocompleteItems = [];
    //       return;
    //     }
    //     this.GoogleAutocomplete.getPlacePredictions({ input, componentRestrictions: {
    //       country: 'us'
    //     }  },
    //       (predictions, status) => {
    //         this.autocompleteItems = [];
    //         this.zone.run(() => {
    //           predictions.forEach((prediction) => {
    //             this.autocompleteItems.push(prediction);
    //           });
    //         });
    //       });
    //   }
    //   forAutoComplete(e){
    //     console.log("hello",e);
    //     this.autoCompleteOff = true;
    //   }
    //   /* FOR SELECT SEARCH SHIPPING ADDRESS*/
    //   selectSearchResult(item) {
    //     console.log(item);
    //     this.geocoder.geocode({
    //       placeId: item.place_id
    //     }, (responses, status) => {
    //       console.log('respo', responses);
    //       this.getGeoEncoder(responses[0].geometry.location.lat(), responses[0].geometry.location.lng(), responses[0].formatted_address);
    //     });
    //   }
    //   getGeoEncoder(latitude, longitude, formattedAddress) {
    //     // // TODO remove later
    //     // const address: AddressModel = {
    //     //   address: 'Vasant Kunj, New Delhi, Delhi',
    //     //   lat: 28.5200491,
    //     //   long: 77.158687,
    //     //   country: 'India',
    //     //   state: 'Delhi',
    //     //   city: 'New Delhi',
    //     //   postalcode: '110070'
    //     // };
    //     // this.utilities.setAddress(address);
    //     // this.goBack();
    //     // return;
    //     this.utils.showLoading('Loading').then(() => {
    //       this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geoEncoderOptions)
    //         .then((result: NativeGeocoderResult[]) => {
    //           console.log(result)
    //           let add = '';
    //           if (formattedAddress === '') {
    //             add = this.generateAddress(result[0]);
    //           } else {
    //             add = formattedAddress;
    //           }
    //           this.utils.hideLoading().then(() => {
    //             console.log('resu', result);
    //             const address: AddressModel = {
    //               address: add,
    //               lat: latitude,
    //               long: longitude,
    //               country: result[0].countryName,
    //               state: result[0].administrativeArea,
    //               city: result[0].locality,
    //               postalcode: result[0].postalCode
    //             };
    //             this.utils.setAddress(address);
    //             this.addressValue();
    //             //this.goBack();
    //           });
    //         })
    //         .catch((error: any) => {
    //           this.utils.hideLoading().then(() => {
    //             alert('Error getting location' + JSON.stringify(error));
    //           });
    //         });
    //     });
    //   }
    //   generateAddress(addressObj) {
    //     const obj = [];
    //     let address = '';
    //     for (const key in addressObj) {
    //       obj.push(addressObj[key]);
    //     }
    //     obj.reverse();
    //     for (const val in obj) {
    //       if (obj[val].length) {
    //         address += obj[val] + ', ';
    //       }
    //     }
    //     return address.slice(0, -2);
    //   }
    //   onCancel() {
    //     console.log("hello");
    //     this.autocompleteItems = [];
    //     console.log(this.autocompleteItems)
    //   }
    //   addressValue(){
    //     // }
    //     this.addressSubscription = this.utils.getAddressObservable().subscribe((address) => {
    //       console.log(address,">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    //         // this.firstFormGroup.get('address').setValue('124/345');
    //         // this.firstFormGroup.get('latitude').setValue('24.553333');
    //         // this.firstFormGroup.get('longitude').setValue('80.5555555555');
    //         // this.firstFormGroup.get('country').setValue('india');
    //         // this.firstFormGroup.get('city').setValue('Lucknow');
    //         // this.firstFormGroup.get('state').setValue('UP');
    //         // this.firstFormGroup.get('postalcode').setValue(3232343);
    //        this.firstFormGroup.get('shippingaddress').setValue(address.address);
    //          this.firstFormGroup.get('latitude').setValue(address.lat);
    //          this.firstFormGroup.get('longitude').setValue(address.long);
    //          this.firstFormGroup.get('country').setValue(address.country);
    //        this.firstFormGroup.get('city').setValue(address.city);
    //          this.firstFormGroup.get('state').setValue(address.state);
    //          this.firstFormGroup.get('postalcode').setValue(address.postalcode);
    //     }, (error) => {
    //       this.firstFormGroup.get('address').setValue('');
    //       this.firstFormGroup.get('latitude').setValue('');
    //       this.firstFormGroup.get('longitude').setValue('');
    //       this.firstFormGroup.get('country').setValue('');
    //       this.firstFormGroup.get('city').setValue('');
    //       this.firstFormGroup.get('state').setValue('');
    //       this.firstFormGroup.get('postalcode').setValue('');
    //     });
    //     // this.firstFormGroup.patchValue({
    //     //   createdby: this.storage.getUserID()
    //     // });
    //  // this.autocompleteItems = [];
    //     this.autoCompleteOff = false;
    //     console.log(this.autoCompleteOff);
    //     //this.getSolarMake();
    //     }
    //     onBlur()
    //     {
    //       setTimeout(() => {
    //         this.autocompleteItems = [];
    //       }, 100);
    //     }
    //     uploadAtticphotos(recordid: number, fileobj: File, index){
    //     }
    removeattachment(arc, i, value) {
        console.log(arc, i, value);
        if (value == 'attic') {
            this.indexOfatticphotos.push(arc.id);
            console.log(this.indexOfatticphotos);
            this.atticData.splice(i, 1);
            // this.isAtticFileDelete=true;
            // console.log(this.isAtticFileDelete)
            this.deleteAtticFile(this.indexOfatticphotos);
        }
        else if (value == 'roof') {
            this.indexOfroofphotos.push(arc.id);
            console.log(this.indexOfroofphotos);
            this.roofData.splice(i, 1);
            // this.isRoofFileDelete=true;
            this.deleteRoofFile(this.indexOfroofphotos);
        }
        else {
            this.indexOfpermitPlanphotos.push(arc.id);
            console.log(this.indexOfpermitPlanphotos);
            this.permitPlanData.splice(i, 1);
            // this.isPermitPlanFileDelete=true;
            this.deletePermitPlan(this.indexOfpermitPlanphotos);
        }
    }
    deleteAtticFile(index) {
        for (var i = 0; i < index.length; i++) {
            var id = index[i];
            this.utils.showLoading("Deleting Attic File").then(() => {
                this.apiService.deletePestamp(id).subscribe(res => {
                    this.utils.hideLoading().then(() => {
                        console.log("hello", res);
                    });
                });
            });
            (error) => {
                this.utils.hideLoading().then(() => {
                    this.utils.errorSnackBar('some Error Occured');
                });
            };
        }
        //this.utils.setPermitDesignDetailsRefresh(true);
    }
    deleteRoofFile(index) {
        console.log(index);
        for (var i = 0; i < index.length; i++) {
            var id = index[i];
            console.log(id);
            this.utils.showLoading("Deleting Roof File").then(() => {
                this.apiService.deletePestamp(id).subscribe(res => {
                    this.utils.hideLoading().then(() => {
                        console.log("hello", res);
                    });
                });
            });
            (error) => {
                this.utils.hideLoading().then(() => {
                    this.utils.errorSnackBar('some Error Occured');
                });
            };
        }
        //this.utils.setPermitDesignDetailsRefresh(true);
    }
    deletePermitPlan(index) {
        console.log(index);
        for (var i = 0; i < index.length; i++) {
            var id = index[i];
            console.log(id);
            this.utils.showLoading("Deleting Permit Plan").then(() => {
                this.apiService.deletePestamp(id).subscribe(res => {
                    this.utils.hideLoading().then(() => {
                        console.log("hello", res);
                    });
                });
            });
            (error) => {
                this.utils.hideLoading().then(() => {
                    this.utils.errorSnackBar('some Error Occured');
                });
            };
        }
        //this.utils.setPermitDesignDetailsRefresh(true);
    }
    createChatGroup(design) {
        var GUID = 'permit' + "_" + new Date().getTime();
        // var address = design.address.substring(0, 90);
        var groupName = design.name;
        var groupType = _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_13__["CometChat"].GROUP_TYPE.PRIVATE;
        var password = "";
        var group = new _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_13__["CometChat"].Group(GUID, groupName, groupType, password);
        _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_13__["CometChat"].createGroup(group).then(group => {
            let membersList = [
                new _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_13__["CometChat"].GroupMember("" + design.createdby.id, _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_13__["CometChat"].GROUP_MEMBER_SCOPE.ADMIN)
            ];
            _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_13__["CometChat"].addMembersToGroup(group.getGuid(), membersList, []).then(response => {
                this.cdr.detectChanges();
            });
        });
    }
};
PestampSchedulePage.ctorParameters = () => [
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"] },
    { type: _storage_service__WEBPACK_IMPORTED_MODULE_6__["StorageService"] },
    { type: _utilities_service__WEBPACK_IMPORTED_MODULE_7__["UtilitiesService"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["NgZone"] },
    { type: _ionic_native_native_geocoder_ngx__WEBPACK_IMPORTED_MODULE_5__["NativeGeocoder"] },
    { type: _api_service__WEBPACK_IMPORTED_MODULE_8__["ApiService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_10__["ActivatedRoute"] },
    { type: _networkdetect_service__WEBPACK_IMPORTED_MODULE_11__["NetworkdetectService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_12__["NavController"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ChangeDetectorRef"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_10__["Router"] },
    { type: _utilities_mixpanel_service__WEBPACK_IMPORTED_MODULE_14__["MixpanelService"] }
];
PestampSchedulePage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-pestamp-schedule',
        template: _raw_loader_pestamp_schedule_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_pestamp_schedule_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], PestampSchedulePage);



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

/***/ })

}]);
//# sourceMappingURL=pestamp-schedule-pestamp-schedule-module.js.map