(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["teamschedule-teamschedule-module"],{

/***/ "+FmX":
/*!***************************************************!*\
  !*** ./src/app/teamschedule/teamschedule.page.ts ***!
  \***************************************************/
/*! exports provided: TeamschedulePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TeamschedulePage", function() { return TeamschedulePage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_teamschedule_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./teamschedule.page.html */ "m5NY");
/* harmony import */ var _teamschedule_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./teamschedule.page.scss */ "+tf7");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "TEn/");






let TeamschedulePage = class TeamschedulePage {
    constructor(navController, formBuilder) {
        this.navController = navController;
        this.formBuilder = formBuilder;
        this.teamForm = this.formBuilder.group({
            firstname: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](''),
            lastname: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](''),
            workemail: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](''),
            userrole: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('')
        });
    }
    ngOnInit() {
    }
    goBack() {
        // this.mixpanelService.track("PERMITDESIGN_PAGE_CLOSE", {
        // });
        this.navController.pop();
    }
};
TeamschedulePage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["NavController"] },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"] }
];
TeamschedulePage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-teamschedule',
        template: _raw_loader_teamschedule_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_teamschedule_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], TeamschedulePage);



/***/ }),

/***/ "+tf7":
/*!*****************************************************!*\
  !*** ./src/app/teamschedule/teamschedule.page.scss ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".designdialogcontent {\n  max-height: 80vh;\n  height: 80vh;\n}\n\n.designdialogcontent .mat-expansion-panel-header-title {\n  font-size: 12px;\n  font-weight: 600;\n}\n\n.designdialogcontent .mat-expansion-panel-header {\n  padding: 0 14px;\n  height: 44px !important;\n}\n\n.designdialogcontent .mat-expansion-panel-body {\n  padding: 0 14px 2px;\n}\n\n.designdialogcontent textarea {\n  min-height: 42px !important;\n  height: 42px !important;\n}\n\n.designform {\n  width: 98%;\n  margin-left: 10px;\n}\n\n.designrow {\n  margin-left: 14px;\n  margin-right: 14px;\n}\n\n.designrow p {\n  font-size: 0.8em;\n  color: #000000;\n  font-weight: 600;\n}\n\n.designform .formradiogroup {\n  width: 100%;\n}\n\n.architectureuploadcol {\n  padding-left: 0px;\n  padding-right: 0px;\n}\n\n.prioritybutton {\n  margin-top: 0.5rem;\n  font-size: 0.7em;\n}\n\n.pdfselectionpreview img {\n  width: 40px;\n}\n\n.pdfselectionpreview p {\n  margin-bottom: 0px;\n  color: #000000;\n  font-size: 0.7rem;\n}\n\n.pdfpreviewcol {\n  padding-left: 0px;\n  padding-right: 0px;\n}\n\n.back {\n  border: red;\n  margin-top: 6px;\n  background: bottom;\n}\n\n.valid {\n  color: #000000;\n}\n\n.invalid {\n  color: red;\n}\n\n.loader {\n  width: 100px;\n  left: 45%;\n  height: 100px;\n  top: 50%;\n}\n\n.spinnertext {\n  margin-top: 16px !important;\n  color: #3c78d8;\n}\n\n.spinnercard {\n  width: 26%;\n  position: absolute;\n  left: 34%;\n  top: 36%;\n}\n\n.word {\n  -webkit-font-kerning: normal;\n          font-kerning: normal;\n}\n\n/* Chrome, Safari, Edge, Opera */\n\ninput::-webkit-outer-spin-button,\ninput::-webkit-inner-spin-button {\n  -webkit-appearance: none;\n  margin: 0;\n}\n\n/* Firefox */\n\ninput[type=number] {\n  -moz-appearance: textfield;\n}\n\n.list-border {\n  padding: 10px 0 10px 0px;\n}\n\n.delete-btn {\n  cursor: pointer;\n}\n\n.file-icon {\n  width: 20px !important;\n}\n\n/* Chrome, Safari, Edge, Opera */\n\ninput::-webkit-outer-spin-button,\ninput::-webkit-inner-spin-button {\n  -webkit-appearance: none;\n  margin: 0;\n}\n\n/* Firefox */\n\ninput[type=number] {\n  -moz-appearance: textfield;\n}\n\n.list-border {\n  padding: 10px 0 10px 0px;\n}\n\n.delete-btn {\n  cursor: pointer;\n}\n\nion-label {\n  color: #6C6C6C !important;\n}\n\n.error {\n  color: #df3e3e;\n  font-size: 11px;\n}\n\n.select_div {\n  border-bottom: 1px solid #E1E1E1;\n}\n\nion-select {\n  max-width: 100% !important;\n  width: 100% !important;\n  padding-left: 0px !important;\n}\n\ninput[type=file] {\n  visibility: hidden;\n}\n\n.mrT {\n  margin-top: -11px !important;\n  font-size: 10px !important;\n}\n\n.font {\n  font-size: 10px;\n}\n\n.font-size {\n  font-size: 12px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXHRlYW1zY2hlZHVsZS5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxnQkFBQTtFQUNBLFlBQUE7QUFDSjs7QUFDRTtFQUNFLGVBQUE7RUFDQSxnQkFBQTtBQUVKOztBQUFFO0VBQ0UsZUFBQTtFQUNBLHVCQUFBO0FBR0o7O0FBREU7RUFDRSxtQkFBQTtBQUlKOztBQUZFO0VBQ0UsMkJBQUE7RUFDQSx1QkFBQTtBQUtKOztBQUhFO0VBQ0UsVUFBQTtFQUNBLGlCQUFBO0FBTUo7O0FBSkU7RUFDRSxpQkFBQTtFQUNBLGtCQUFBO0FBT0o7O0FBTEU7RUFDRSxnQkFBQTtFQUNBLGNBQUE7RUFDQSxnQkFBQTtBQVFKOztBQU5FO0VBQ0UsV0FBQTtBQVNKOztBQU5FO0VBQ0UsaUJBQUE7RUFDQSxrQkFBQTtBQVNKOztBQU5FO0VBQ0Usa0JBQUE7RUFDQSxnQkFBQTtBQVNKOztBQU5FO0VBQ0UsV0FBQTtBQVNKOztBQU5FO0VBQ0Usa0JBQUE7RUFDQSxjQUFBO0VBQ0EsaUJBQUE7QUFTSjs7QUFORTtFQUNFLGlCQUFBO0VBQ0Esa0JBQUE7QUFTSjs7QUFQRTtFQUNFLFdBQUE7RUFDQSxlQUFBO0VBQ0Esa0JBQUE7QUFVSjs7QUFSRTtFQUNFLGNBQUE7QUFXSjs7QUFURTtFQUNFLFVBQUE7QUFZSjs7QUFWRTtFQUNFLFlBQUE7RUFDQSxTQUFBO0VBQ0EsYUFBQTtFQUNBLFFBQUE7QUFhSjs7QUFWRTtFQUNFLDJCQUFBO0VBQ0EsY0FBQTtBQWFKOztBQVZFO0VBQ0UsVUFBQTtFQUNBLGtCQUFBO0VBQ0EsU0FBQTtFQUNBLFFBQUE7QUFhSjs7QUFYRTtFQUNFLDRCQUFBO1VBQUEsb0JBQUE7QUFjSjs7QUFYRSxnQ0FBQTs7QUFDQTs7RUFFRSx3QkFBQTtFQUNBLFNBQUE7QUFjSjs7QUFYRSxZQUFBOztBQUNBO0VBQ0UsMEJBQUE7QUFjSjs7QUFYRTtFQUNFLHdCQUFBO0FBY0o7O0FBWkU7RUFDRSxlQUFBO0FBZUo7O0FBR0U7RUFDRSxzQkFBQTtBQUFKOztBQUdFLGdDQUFBOztBQUNBOztFQUVFLHdCQUFBO0VBQ0EsU0FBQTtBQUFKOztBQUdFLFlBQUE7O0FBQ0E7RUFDRSwwQkFBQTtBQUFKOztBQUdFO0VBQ0Usd0JBQUE7QUFBSjs7QUFFRTtFQUNFLGVBQUE7QUFDSjs7QUFHRTtFQUNFLHlCQUFBO0FBQUo7O0FBR0U7RUFDRSxjQUFBO0VBQ0EsZUFBQTtBQUFKOztBQUdFO0VBQ0UsZ0NBQUE7QUFBSjs7QUFHRTtFQUNFLDBCQUFBO0VBQ0Esc0JBQUE7RUFDQSw0QkFBQTtBQUFKOztBQUVFO0VBQ0Usa0JBQUE7QUFDSjs7QUFFRTtFQUNFLDRCQUFBO0VBQTRCLDBCQUFBO0FBRWhDOztBQUNFO0VBQ0UsZUFBQTtBQUVKOztBQUNFO0VBQ0UsZUFBQTtBQUVKIiwiZmlsZSI6InRlYW1zY2hlZHVsZS5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuZGVzaWduZGlhbG9nY29udGVudCB7XHJcbiAgICBtYXgtaGVpZ2h0OiA4MHZoO1xyXG4gICAgaGVpZ2h0OiA4MHZoO1xyXG4gIH1cclxuICAuZGVzaWduZGlhbG9nY29udGVudCAubWF0LWV4cGFuc2lvbi1wYW5lbC1oZWFkZXItdGl0bGUge1xyXG4gICAgZm9udC1zaXplOiAxMnB4O1xyXG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICB9XHJcbiAgLmRlc2lnbmRpYWxvZ2NvbnRlbnQgLm1hdC1leHBhbnNpb24tcGFuZWwtaGVhZGVyIHtcclxuICAgIHBhZGRpbmc6IDAgMTRweDtcclxuICAgIGhlaWdodDogNDRweCAhaW1wb3J0YW50O1xyXG4gIH1cclxuICAuZGVzaWduZGlhbG9nY29udGVudCAubWF0LWV4cGFuc2lvbi1wYW5lbC1ib2R5IHtcclxuICAgIHBhZGRpbmc6IDAgMTRweCAycHg7XHJcbiAgfVxyXG4gIC5kZXNpZ25kaWFsb2djb250ZW50IHRleHRhcmVhIHtcclxuICAgIG1pbi1oZWlnaHQ6IDQycHggIWltcG9ydGFudDtcclxuICAgIGhlaWdodDogNDJweCAhaW1wb3J0YW50O1xyXG4gIH1cclxuICAuZGVzaWduZm9ybSB7XHJcbiAgICB3aWR0aDogOTglO1xyXG4gICAgbWFyZ2luLWxlZnQ6IDEwcHg7XHJcbiAgfVxyXG4gIC5kZXNpZ25yb3cge1xyXG4gICAgbWFyZ2luLWxlZnQ6IDE0cHg7XHJcbiAgICBtYXJnaW4tcmlnaHQ6IDE0cHg7XHJcbiAgfVxyXG4gIC5kZXNpZ25yb3cgcCB7XHJcbiAgICBmb250LXNpemU6IDAuOGVtO1xyXG4gICAgY29sb3I6ICMwMDAwMDA7XHJcbiAgICBmb250LXdlaWdodDogNjAwO1xyXG4gIH1cclxuICAuZGVzaWduZm9ybSAuZm9ybXJhZGlvZ3JvdXAge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgfVxyXG4gIFxyXG4gIC5hcmNoaXRlY3R1cmV1cGxvYWRjb2wge1xyXG4gICAgcGFkZGluZy1sZWZ0OiAwcHg7XHJcbiAgICBwYWRkaW5nLXJpZ2h0OiAwcHg7XHJcbiAgfVxyXG4gIFxyXG4gIC5wcmlvcml0eWJ1dHRvbiB7XHJcbiAgICBtYXJnaW4tdG9wOiAwLjVyZW07XHJcbiAgICBmb250LXNpemU6IDAuN2VtO1xyXG4gIH1cclxuICBcclxuICAucGRmc2VsZWN0aW9ucHJldmlldyBpbWcge1xyXG4gICAgd2lkdGg6IDQwcHg7XHJcbiAgfVxyXG4gIFxyXG4gIC5wZGZzZWxlY3Rpb25wcmV2aWV3IHAge1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMHB4O1xyXG4gICAgY29sb3I6ICMwMDAwMDA7XHJcbiAgICBmb250LXNpemU6IDAuN3JlbTtcclxuICB9XHJcbiAgXHJcbiAgLnBkZnByZXZpZXdjb2wge1xyXG4gICAgcGFkZGluZy1sZWZ0OiAwcHg7XHJcbiAgICBwYWRkaW5nLXJpZ2h0OiAwcHg7XHJcbiAgfVxyXG4gIC5iYWNrIHtcclxuICAgIGJvcmRlcjogcmVkO1xyXG4gICAgbWFyZ2luLXRvcDogNnB4O1xyXG4gICAgYmFja2dyb3VuZDogYm90dG9tO1xyXG4gIH1cclxuICAudmFsaWQge1xyXG4gICAgY29sb3I6ICMwMDAwMDA7XHJcbiAgfVxyXG4gIC5pbnZhbGlkIHtcclxuICAgIGNvbG9yOiByZWQ7XHJcbiAgfVxyXG4gIC5sb2FkZXIge1xyXG4gICAgd2lkdGg6IDEwMHB4O1xyXG4gICAgbGVmdDogNDUlO1xyXG4gICAgaGVpZ2h0OiAxMDBweDtcclxuICAgIHRvcDogNTAlO1xyXG4gIH1cclxuICBcclxuICAuc3Bpbm5lcnRleHQge1xyXG4gICAgbWFyZ2luLXRvcDogMTZweCAhaW1wb3J0YW50O1xyXG4gICAgY29sb3I6ICMzYzc4ZDg7XHJcbiAgfVxyXG4gIFxyXG4gIC5zcGlubmVyY2FyZCB7XHJcbiAgICB3aWR0aDogMjYlO1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgbGVmdDogMzQlO1xyXG4gICAgdG9wOiAzNiU7XHJcbiAgfVxyXG4gIC53b3JkIHtcclxuICAgIGZvbnQta2VybmluZzogbm9ybWFsO1xyXG4gIH1cclxuICBcclxuICAvKiBDaHJvbWUsIFNhZmFyaSwgRWRnZSwgT3BlcmEgKi9cclxuICBpbnB1dDo6LXdlYmtpdC1vdXRlci1zcGluLWJ1dHRvbixcclxuICBpbnB1dDo6LXdlYmtpdC1pbm5lci1zcGluLWJ1dHRvbiB7XHJcbiAgICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XHJcbiAgICBtYXJnaW46IDA7XHJcbiAgfVxyXG4gIFxyXG4gIC8qIEZpcmVmb3ggKi9cclxuICBpbnB1dFt0eXBlPVwibnVtYmVyXCJdIHtcclxuICAgIC1tb3otYXBwZWFyYW5jZTogdGV4dGZpZWxkO1xyXG4gIH1cclxuICBcclxuICAubGlzdC1ib3JkZXIge1xyXG4gICAgcGFkZGluZzogMTBweCAwIDEwcHggMHB4O1xyXG4gIH1cclxuICAuZGVsZXRlLWJ0biB7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgfVxyXG4gIFxyXG4gIC8vIC5tYXQtZm9ybS1maWVsZC1hdXRvZmlsbC1jb250cm9se1xyXG4gIC8vICAgd2lkdGg6IDIwMCUgIWltcG9ydGFudDtcclxuICAvLyAgIG1heC13aWR0aDogMjAwJSAhaW1wb3J0YW50O1xyXG4gIC8vIH1cclxuICBcclxuICAvLyAubWF0LWZvcm0tZmllbGQtYXV0b2ZpbGwtY29udHJvbHtcclxuICAvLyAgIHdpZHRoOiAyMDAlICFpbXBvcnRhbnQ7XHJcbiAgLy8gICBtYXgtd2lkdGg6IDIwMCUgIWltcG9ydGFudDtcclxuICAvLyB9XHJcbiAgXHJcbiAgLy8gLnBhYy1jb250YWluZXIge1xyXG4gIC8vICAgYm94LXNpemluZzogY29udGVudC1ib3g7XHJcbiAgLy8gICBwYWRkaW5nLXJpZ2h0OiA0cHg7XHJcbiAgLy8gfVxyXG4gIFxyXG4gIC5maWxlLWljb24ge1xyXG4gICAgd2lkdGg6IDIwcHggIWltcG9ydGFudDtcclxuICB9XHJcbiAgXHJcbiAgLyogQ2hyb21lLCBTYWZhcmksIEVkZ2UsIE9wZXJhICovXHJcbiAgaW5wdXQ6Oi13ZWJraXQtb3V0ZXItc3Bpbi1idXR0b24sXHJcbiAgaW5wdXQ6Oi13ZWJraXQtaW5uZXItc3Bpbi1idXR0b24ge1xyXG4gICAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xyXG4gICAgbWFyZ2luOiAwO1xyXG4gIH1cclxuICBcclxuICAvKiBGaXJlZm94ICovXHJcbiAgaW5wdXRbdHlwZT1cIm51bWJlclwiXSB7XHJcbiAgICAtbW96LWFwcGVhcmFuY2U6IHRleHRmaWVsZDtcclxuICB9XHJcbiAgXHJcbiAgLmxpc3QtYm9yZGVyIHtcclxuICAgIHBhZGRpbmc6IDEwcHggMCAxMHB4IDBweDtcclxuICB9XHJcbiAgLmRlbGV0ZS1idG4ge1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIH1cclxuICBcclxuXHJcbiAgaW9uLWxhYmVsIHtcclxuICAgIGNvbG9yOiAjNkM2QzZDICFpbXBvcnRhbnQ7XHJcbiAgfVxyXG4gIFxyXG4gIC5lcnJvciB7XHJcbiAgICBjb2xvcjogcmdiKDIyMywgNjIsIDYyKTtcclxuICAgIGZvbnQtc2l6ZTogMTFweDtcclxuICB9XHJcbiAgXHJcbiAgLnNlbGVjdF9kaXYge1xyXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNFMUUxRTE7XHJcbiAgfVxyXG4gIFxyXG4gIGlvbi1zZWxlY3R7XHJcbiAgICBtYXgtd2lkdGg6IDEwMCUgIWltcG9ydGFudDtcclxuICAgIHdpZHRoOiAxMDAlICFpbXBvcnRhbnQ7XHJcbiAgICBwYWRkaW5nLWxlZnQ6IDBweCAhaW1wb3J0YW50O1xyXG4gIH1cclxuICBpbnB1dFt0eXBlPVwiZmlsZVwiXXtcclxuICAgIHZpc2liaWxpdHk6aGlkZGVuO1xyXG4gIH1cclxuICBcclxuICAubXJUe1xyXG4gICAgbWFyZ2luLXRvcDotMTFweCAhaW1wb3J0YW50O2ZvbnQtc2l6ZTogMTBweCFpbXBvcnRhbnQ7XHJcbiAgfVxyXG5cclxuICAuZm9udHtcclxuICAgIGZvbnQtc2l6ZTogMTBweDtcclxuICB9XHJcblxyXG4gIC5mb250LXNpemV7XHJcbiAgICBmb250LXNpemU6IDEycHg7XHJcbiAgfVxyXG4gICJdfQ== */");

/***/ }),

/***/ "e/Kw":
/*!*****************************************************!*\
  !*** ./src/app/teamschedule/teamschedule.module.ts ***!
  \*****************************************************/
/*! exports provided: TeamschedulePageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TeamschedulePageModule", function() { return TeamschedulePageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _teamschedule_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./teamschedule-routing.module */ "wbK2");
/* harmony import */ var _teamschedule_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./teamschedule.page */ "+FmX");







let TeamschedulePageModule = class TeamschedulePageModule {
};
TeamschedulePageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _teamschedule_routing_module__WEBPACK_IMPORTED_MODULE_5__["TeamschedulePageRoutingModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"]
        ],
        declarations: [_teamschedule_page__WEBPACK_IMPORTED_MODULE_6__["TeamschedulePage"]]
    })
], TeamschedulePageModule);



/***/ }),

/***/ "m5NY":
/*!*******************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/teamschedule/teamschedule.page.html ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\r\n<ion-row>\r\n  <ion-col>\r\n    <h5 class=\"ion-no-margin ion-padding\" style=\"font-weight: bolder;padding-bottom: 2px;\">Add Team Member </h5>\r\n  </ion-col>\r\n<ion-col size=\"auto\" style=\"align-self: center;\">\r\n  <ion-button fill=\"clear\" size=\"small\" class=\"ion-no-padding\" (click)=\"goBack()\">\r\n      <ion-icon name=\"close-outline\" style=\"color: dimgrey;\" size=\"large\"></ion-icon>\r\n  </ion-button>\r\n</ion-col>\r\n</ion-row>\r\n\r\n\r\n<ion-content>\r\n  <form [formGroup]=\"teamForm\" novalidate style=\"overflow:scroll\">\r\n    <ion-grid style=\"position: relative;\">\r\n      <ion-row>\r\n        <ion-col size=\"12\">\r\n          <ion-item class=\"ion-no-padding\">\r\n          <ion-label position=\"floating\">First Name*</ion-label>\r\n                    <ion-input type=\"text\" class=\"form_input\" formControlName=\"firstname\" autocapitalize=\"words\"\r\n                                required></ion-input>\r\n                              </ion-item>\r\n                              <!-- <div style=\"height: 5px;\">\r\n                                <div *ngIf=\"thirdFormGroup.get('firstname').hasError('pattern') && thirdFormGroup.get('firstname').dirty\">\r\n                                    <span class=\"error\">{{firstnameError}}</span>\r\n                                </div>\r\n                                <div *ngIf=\"thirdFormGroup.get('firstname').value === '' && thirdFormGroup.get('firstname').dirty\">\r\n                                    <span class=\"error\">{{fieldRequired}}</span>\r\n                                </div>\r\n                            </div> -->\r\n        </ion-col>\r\n        <ion-col size=\"12\">\r\n          <ion-item class=\"ion-no-padding\">\r\n          <ion-label position=\"floating\">Last Name*</ion-label>\r\n                    <ion-input type=\"text\" class=\"form_input\" formControlName=\"lastname\" autocapitalize=\"words\"\r\n                                ></ion-input>\r\n                              </ion-item>\r\n                              <!-- <div style=\"height: 5px;\">\r\n                                <div *ngIf=\"thirdFormGroup.get('lastname').hasError('pattern') && thirdFormGroup.get('lastname').dirty\">\r\n                                    <span class=\"error\">{{lastnameError}}</span>\r\n                                </div>\r\n                                <div *ngIf=\"thirdFormGroup.get('lastname').value === '' && thirdFormGroup.get('lastname').dirty\">\r\n                                    <span class=\"error\">{{fieldRequired}}</span>\r\n                                </div>\r\n                            </div> -->\r\n        </ion-col>\r\n      </ion-row>\r\n      <ion-row >\r\n        <ion-col>\r\n            <ion-item class=\"ion-no-padding\">\r\n                <ion-label position=\"floating\">Work Email*</ion-label>\r\n                <ion-input type=\"text\" class=\"form_input\" formControlName=\"workemail\"\r\n                            ></ion-input>\r\n            </ion-item>\r\n            <!-- <div style=\"height: 5px;\">\r\n              <div *ngIf=\"thirdFormGroup.get('workemail').hasError('pattern') && thirdFormGroup.get('workemail').dirty\">\r\n                  <span class=\"error\">{{emailError}}</span>\r\n              </div>\r\n              <div *ngIf=\"thirdFormGroup.get('workemail').value === '' && thirdFormGroup.get('workemail').dirty\">\r\n                  <span class=\"error\">{{fieldRequired}}</span>\r\n              </div>\r\n          </div> -->\r\n        </ion-col>\r\n    </ion-row>\r\n    <br>\r\n    <ion-label>User Role</ion-label>\r\n          <ion-radio-group formControlName=\"userrole\" >\r\n            <ion-row >\r\n              <ion-col size=\"6\">\r\n            <ion-item lines=\"none\">\r\n              <ion-label class=\"margin\" style=\"font-size: small;\">Admin</ion-label>\r\n              <ion-radio slot=\"start\" value=\"7\" ></ion-radio>\r\n            </ion-item>\r\n          </ion-col>\r\n          <ion-col size=\"6\">\r\n            <ion-item lines=\"none\">\r\n              <ion-label class=\"margin\"   style=\"font-size: small;padding-left: 0%;\">Design Manager</ion-label>\r\n              <ion-radio slot=\"start\"  value=\"3\" ></ion-radio>\r\n            </ion-item>\r\n          </ion-col>\r\n          <ion-col size=\"6\">\r\n            <ion-item lines=\"none\">\r\n              <ion-label class=\"margin\"   style=\"font-size: small;padding-left: 0%;\">Designer</ion-label>\r\n              <ion-radio slot=\"start\"  value=\"8\" ></ion-radio>\r\n            </ion-item>\r\n          </ion-col>\r\n          <ion-col size=\"6\">\r\n            <ion-item lines=\"none\">\r\n              <ion-label class=\"margin\"   style=\"font-size: small;padding-left: 0%;\">Surveyor</ion-label>\r\n              <ion-radio slot=\"start\"  value=\"9\" ></ion-radio>\r\n            </ion-item>\r\n          </ion-col>\r\n          <ion-col size=\"6\">\r\n            <ion-item lines=\"none\">\r\n              <ion-label class=\"margin\"   style=\"font-size: small;padding-left: 0%;\">Analyst</ion-label>\r\n              <ion-radio slot=\"start\"  value=\"10\" ></ion-radio>\r\n            </ion-item>\r\n          </ion-col>\r\n          <ion-col size=\"6\">\r\n            <ion-item lines=\"none\">\r\n              <ion-label class=\"margin\"   style=\"font-size: small;padding-left: 0%;\">Pe Engineer</ion-label>\r\n              <ion-radio slot=\"start\"  value=\"11\" ></ion-radio>\r\n            </ion-item>\r\n          </ion-col>\r\n          </ion-row>\r\n          </ion-radio-group>\r\n    </ion-grid>\r\n    </form>\r\n</ion-content>\r\n<ion-row>\r\n  <ion-col></ion-col>\r\n  <ion-col size=\"auto\">\r\n      <ion-button class=\"action-button-color\" fill=\"clear\">Confirm</ion-button>\r\n      </ion-col>\r\n      </ion-row>  \r\n");

/***/ }),

/***/ "wbK2":
/*!*************************************************************!*\
  !*** ./src/app/teamschedule/teamschedule-routing.module.ts ***!
  \*************************************************************/
/*! exports provided: TeamschedulePageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TeamschedulePageRoutingModule", function() { return TeamschedulePageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _teamschedule_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./teamschedule.page */ "+FmX");




const routes = [
    {
        path: '',
        component: _teamschedule_page__WEBPACK_IMPORTED_MODULE_3__["TeamschedulePage"]
    }
];
let TeamschedulePageRoutingModule = class TeamschedulePageRoutingModule {
};
TeamschedulePageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], TeamschedulePageRoutingModule);



/***/ })

}]);
//# sourceMappingURL=teamschedule-teamschedule-module.js.map