(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["schedule-schedule-module"],{

/***/ "1dhX":
/*!*****************************************************!*\
  !*** ./src/app/schedule/survey/survey.component.ts ***!
  \*****************************************************/
/*! exports provided: SurveyComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SurveyComponent", function() { return SurveyComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_survey_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./survey.component.html */ "rAzX");
/* harmony import */ var _survey_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./survey.component.scss */ "54DF");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _utilities_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../utilities.service */ "oTnF");
/* harmony import */ var _model_constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../model/constants */ "Kp5Z");
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../api.service */ "yTNM");
/* harmony import */ var _storage_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../storage.service */ "qkCY");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/router */ "tyNb");











let SurveyComponent = class SurveyComponent {
    constructor(formBuilder, navController, utilities, platform, apiService, storage, route, router) {
        this.formBuilder = formBuilder;
        this.navController = navController;
        this.utilities = utilities;
        this.platform = platform;
        this.apiService = apiService;
        this.storage = storage;
        this.route = route;
        this.router = router;
        this.listOfAssignees = [];
        this.nameError = _model_constants__WEBPACK_IMPORTED_MODULE_7__["INVALID_NAME_MESSAGE"];
        this.emailError = _model_constants__WEBPACK_IMPORTED_MODULE_7__["INVALID_EMAIL_MESSAGE"];
        this.phoneError = _model_constants__WEBPACK_IMPORTED_MODULE_7__["INVALID_PHONE_NUMBER"];
        this.fieldRequired = _model_constants__WEBPACK_IMPORTED_MODULE_7__["FIELD_REQUIRED"];
        this.surveyId = 0;
        this.surveyId = +this.route.snapshot.paramMap.get('id');
        const NAMEPATTERN = /^[a-zA-Z. ]{3,}$/;
        const EMAILPATTERN = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        const mydate = new Date().getTime();
        this.surveyForm = this.formBuilder.group({
            name: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].pattern(NAMEPATTERN)]),
            email: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].pattern(EMAILPATTERN)]),
            phonenumber: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].minLength(8), _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].maxLength(15), _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].pattern('^[0-9]{8,15}$')]),
            jobtype: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]),
            surveydatetime: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](mydate),
            datetime: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](''),
            comments: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](''),
            address: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]),
            source: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('android', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]),
            assignedto: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](null),
            createdby: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](this.storage.getUserID(), [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]),
            latitude: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](''),
            longitude: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](''),
            country: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](''),
            state: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](''),
            city: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](''),
            postalcode: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](''),
            status: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('created'),
            chatid: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](null)
        });
    }
    ngOnInit() {
        this.userData = this.storage.getUser();
        // this.address= this.storage.getData();
        this.subscription = this.utilities.getScheduleFormEvent().subscribe((event) => {
            switch (event) {
                case _model_constants__WEBPACK_IMPORTED_MODULE_7__["ScheduleFormEvent"].SAVE_SURVEY_FORM:
                    this.saveSurvey();
                    break;
                case _model_constants__WEBPACK_IMPORTED_MODULE_7__["ScheduleFormEvent"].START_SURVEY:
                    this.startSurvey();
                    break;
            }
        });
        if (this.surveyId !== 0) {
            this.getSurveyDetails();
        }
        else {
            this.addressSubscription = this.utilities.getAddressObservable().subscribe((address) => {
                // this.surveyForm.get('address').setValue("sdck");
                // this.surveyForm.get('latitude').setValue('1111111');
                // this.surveyForm.get('longitude').setValue('222222222');
                // this.surveyForm.get('country').setValue('India');
                // this.surveyForm.get('city').setValue('delhi');
                // this.surveyForm.get('state').setValue('up');
                //  this.surveyForm.get('postalcode').setValue(777777777);
                this.surveyForm.get('address').setValue(address.address);
                this.surveyForm.get('latitude').setValue(address.lat);
                this.surveyForm.get('longitude').setValue(address.long);
                this.surveyForm.get('country').setValue(address.country);
                this.surveyForm.get('city').setValue(address.city);
                this.surveyForm.get('state').setValue(address.state);
                this.surveyForm.get('postalcode').setValue(address.postalcode);
            }, (error) => {
                this.surveyForm.get('address').setValue('');
                this.surveyForm.get('latitude').setValue('');
                this.surveyForm.get('longitude').setValue('');
                this.surveyForm.get('country').setValue('');
                this.surveyForm.get('city').setValue('');
                this.surveyForm.get('state').setValue('');
                this.surveyForm.get('postalcode').setValue('');
            });
        }
        this.getAssignees();
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
        if (this.surveyId === 0) {
            this.addressSubscription.unsubscribe();
        }
        // this.utilities.getScheduleFormEvent().unsubscribe();
    }
    startSurvey() {
        if (this.surveyForm.status === 'INVALID') {
            this.showInvalidFormAlert();
        }
        else {
            this.utilities.showLoading('Saving Survey').then(() => {
                this.surveyForm.get('status').setValue('surveyinprocess');
                if (this.surveyId !== 0) {
                    this.surveyForm.get('chatid').setValue(this.survey.chatid);
                    this.apiService.updateSurveyForm(this.surveyForm.value, this.surveyId).subscribe(survey => {
                        this.utilities.hideLoading().then(() => {
                            this.utilities.setDesignDetailsRefresh(true);
                            this.navController.navigateForward('camera/' + survey.id + '/' + survey.jobtype + '/' + survey.city + '/' + survey.state + '/' + survey.latitude + '/' + survey.longitude);
                        });
                    }, responseError => {
                        this.utilities.hideLoading().then(() => {
                            const error = responseError.error;
                            this.utilities.errorSnackBar(error.message);
                        });
                        //
                    });
                }
                else {
                    // if starting survey directly, assign the survey to yourself
                    this.surveyForm.get('assignedto').setValue(this.storage.getUserID());
                    this.surveyForm.get('status').setValue('surveyinprocess');
                    console.log(this.surveyForm.value);
                    this.surveyForm.get('chatid').setValue('survey' + "_" + new Date().getTime());
                    this.apiService.saveSurvey(this.surveyForm.value).subscribe(survey => {
                        this.utilities.hideLoading().then(() => {
                            this.utilities.setDesignDetailsRefresh(true);
                            this.navController.navigateForward('camera/' + survey.id + '/' + survey.jobtype + '/' + survey.city + '/' + survey.state + '/' + survey.latitude + '/' + survey.longitude);
                        });
                    }, responseError => {
                        this.utilities.hideLoading().then(() => {
                            const error = responseError.error;
                            this.utilities.errorSnackBar(error.message);
                        });
                        //
                    });
                }
            });
        }
    }
    saveSurvey() {
        const invalid = [];
        const controls = this.surveyForm.controls;
        for (const name in controls) {
            if (controls[name].invalid) {
                invalid.push(name);
            }
        }
        console.log(invalid);
        if (this.surveyForm.status === 'INVALID') {
            console.log(this.surveyForm.value);
            if (this.surveyForm.value.name == '') {
                this.utilities.errorSnackBar('Please enter name.');
            }
            else if (this.surveyForm.value.phonenumber == '') {
                this.utilities.errorSnackBar('Please enter phone number.');
            }
            else if (this.surveyForm.value.jobtype == '') {
                this.utilities.errorSnackBar('Please enter job type.');
            }
            else {
                this.utilities.errorSnackBar('Address not found. Make sure your location is on in device.');
            }
        }
        else {
            this.utilities.showLoading('Saving Survey').then(() => {
                this.surveyForm.get('datetime').setValue(this.utilities.formatDate(this.surveyForm.get('surveydatetime').value));
                if (this.surveyId !== 0) {
                    this.surveyForm.get('chatid').setValue(this.survey.chatid);
                    this.apiService.updateSurveyForm(this.surveyForm.value, this.surveyId).subscribe(survey => {
                        this.utilities.hideLoading().then(() => {
                            this.utilities.showSnackBar('Survey has been updated');
                            this.utilities.setSurveyDetailsRefresh(true);
                            // this.navController.navigateRoot('homepage/survey');
                            this.navController.pop();
                        });
                    }, responseError => {
                        this.utilities.hideLoading().then(() => {
                            const error = responseError.error;
                            this.utilities.errorSnackBar(error.message);
                        });
                        //
                    });
                }
                else {
                    if (this.surveyForm.get('assignedto').value !== ''
                        && this.surveyForm.get('assignedto').value !== null
                        && this.surveyForm.get('assignedto').value !== undefined
                        && this.surveyForm.get('assignedto').value !== 0) {
                        this.surveyForm.get('status').setValue('surveyassigned');
                    }
                    console.log(this.surveyForm.value);
                    this.surveyForm.get('chatid').setValue('survey' + "_" + new Date().getTime());
                    this.apiService.saveSurvey(this.surveyForm.value).subscribe(survey => {
                        this.utilities.showSuccessModal('Survey have been saved').then((modal) => {
                            this.utilities.hideLoading();
                            // this.navController.pop();
                            modal.present();
                            modal.onWillDismiss().then((dismissed) => {
                                this.utilities.sethomepageSurveyRefresh(true);
                                this.navController.navigateRoot('homepage/survey');
                            });
                            // });
                        });
                    }, responseError => {
                        this.utilities.hideLoading().then(() => {
                            const error = responseError.error;
                            this.utilities.errorSnackBar(error.message);
                        });
                        //
                    });
                }
            });
        }
    }
    showInvalidFormAlert() {
        let error = '';
        Object.keys(this.surveyForm.controls).forEach((key) => {
            const control = this.surveyForm.get(key);
            if (control.invalid) {
                if (error !== '') {
                    error = error + '<br/>';
                }
                if (control.errors.required === true) {
                    error = error + this.utilities.capitalizeWord(key) + ' is required';
                }
                if (control.errors.email === true) {
                    error = error + 'Invalid email';
                }
                if (control.errors.error !== null && control.errors.error !== undefined) {
                    error = error + control.errors.error;
                }
            }
        });
        console.log(this.surveyForm.value);
        this.utilities.showAlert(error);
    }
    getAssignees() {
        this.apiService.getSurveyors().subscribe(assignees => {
            this.listOfAssignees = [];
            assignees.forEach(item => this.listOfAssignees.push(item));
            console.log(this.listOfAssignees);
        });
    }
    getSurveyDetails() {
        this.utilities.showLoading('Getting Survey Details').then((success) => {
            this.apiService.getSurveyDetail(this.surveyId).subscribe((result) => {
                this.utilities.hideLoading().then(() => {
                    this.survey = result;
                    const date = new Date(this.survey.datetime);
                    this.surveyForm.patchValue({
                        name: this.survey.name,
                        email: this.survey.email,
                        jobtype: this.survey.jobtype,
                        phonenumber: this.survey.phonenumber,
                        surveydatetime: date.getTime(),
                        datetime: date,
                        comments: this.survey.comments == '' ? '' : this.survey.comments[0].message,
                        address: this.survey.address,
                        source: this.survey.source,
                        createdby: this.survey.createdby.id,
                        latitude: this.survey.latitude,
                        longitude: this.survey.longitude,
                        country: this.survey.country,
                        state: this.survey.state,
                        city: this.survey.city,
                        postalcode: this.survey.postalcode,
                    });
                    if (this.survey.assignedto !== null && this.survey.assignedto !== undefined) {
                        this.surveyForm.patchValue({
                            assignedto: this.survey.assignedto.id,
                            status: 'surveyassigned'
                        });
                    }
                    this.utilities.setStaticAddress(this.survey.address);
                });
            }, (error) => {
                this.utilities.hideLoading();
            });
        });
    }
    assignedTo(surveyData) {
        let postData = {
            assignedto: this.userData.id,
            status: "surveyassigned"
        };
        this.apiService.updateSurveyForm(postData, surveyData.id).subscribe(res => {
            console.log(res);
            this.router.navigate(['/camera/' + surveyData.id + '/' + surveyData.jobtype + '/' + surveyData.city + '/' + surveyData.state + '/' + surveyData.latitude + '/' + surveyData.longitude]);
        });
    }
};
SurveyComponent.ctorParameters = () => [
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["NavController"] },
    { type: _utilities_service__WEBPACK_IMPORTED_MODULE_6__["UtilitiesService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["Platform"] },
    { type: _api_service__WEBPACK_IMPORTED_MODULE_8__["ApiService"] },
    { type: _storage_service__WEBPACK_IMPORTED_MODULE_9__["StorageService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_10__["ActivatedRoute"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_10__["Router"] }
];
SurveyComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-survey',
        template: _raw_loader_survey_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_survey_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], SurveyComponent);



/***/ }),

/***/ "3aXv":
/*!*********************************************!*\
  !*** ./src/app/schedule/schedule.page.scss ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".segments {\n  height: 40px;\n}\n\nion-segment {\n  --background: #EFEFEF;\n}\n\nion-segment-button {\n  --indicator-color: #3c78d8;\n  --color-checked: white;\n}\n\nhtml, body {\n  background-color: white !important;\n}\n\nion-app {\n  --background: white !important;\n}\n\nion-content {\n  --background: white !important;\n}\n\napp-ar ion-content {\n  --background: white;\n}\n\n.schedule-area-border {\n  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.3);\n  border-top-left-radius: 2em;\n  border-top-right-radius: 2em;\n}\n\n.margin-top {\n  margin-top: 16px;\n}\n\n.edit_span {\n  color: gray;\n  pointer-events: none;\n}\n\n.mrT {\n  margin-top: -11px !important;\n  font-size: 10px !important;\n}\n\n.font_10 {\n  font-size: 10px;\n}\n\n.font_12 {\n  font-size: small;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXHNjaGVkdWxlLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFlBQUE7QUFDRjs7QUFFQTtFQUNFLHFCQUFBO0FBQ0Y7O0FBRUE7RUFDRSwwQkFBQTtFQUNBLHNCQUFBO0FBQ0Y7O0FBRUE7RUFDSSxrQ0FBQTtBQUNKOztBQUVBO0VBQ0ksOEJBQUE7QUFDSjs7QUFFQTtFQUNJLDhCQUFBO0FBQ0o7O0FBRUE7RUFDSSxtQkFBQTtBQUNKOztBQUVBO0VBQ0UsMENBQUE7RUFDQSwyQkFBQTtFQUNBLDRCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxnQkFBQTtBQUNGOztBQUVBO0VBQ0UsV0FBQTtFQUNBLG9CQUFBO0FBQ0Y7O0FBTUE7RUFDRSw0QkFBQTtFQUE0QiwwQkFBQTtBQUY5Qjs7QUFLQTtFQUNFLGVBQUE7QUFGRjs7QUFLQTtFQUNFLGdCQUFBO0FBRkYiLCJmaWxlIjoic2NoZWR1bGUucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnNlZ21lbnRzIHtcclxuICBoZWlnaHQ6IDQwcHg7XHJcbn1cclxuXHJcbmlvbi1zZWdtZW50IHtcclxuICAtLWJhY2tncm91bmQ6ICNFRkVGRUY7XHJcbn1cclxuXHJcbmlvbi1zZWdtZW50LWJ1dHRvbiB7XHJcbiAgLS1pbmRpY2F0b3ItY29sb3I6ICMzYzc4ZDg7XHJcbiAgLS1jb2xvci1jaGVja2VkOiB3aGl0ZTtcclxufVxyXG5cclxuaHRtbCwgYm9keSB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZSAhaW1wb3J0YW50O1xyXG59XHJcblxyXG5pb24tYXBwIHtcclxuICAgIC0tYmFja2dyb3VuZDogd2hpdGUgIWltcG9ydGFudDtcclxufVxyXG5cclxuaW9uLWNvbnRlbnQge1xyXG4gICAgLS1iYWNrZ3JvdW5kOiB3aGl0ZSAhaW1wb3J0YW50O1xyXG59XHJcblxyXG5hcHAtYXIgaW9uLWNvbnRlbnQge1xyXG4gICAgLS1iYWNrZ3JvdW5kOiB3aGl0ZTtcclxufVxyXG5cclxuLnNjaGVkdWxlLWFyZWEtYm9yZGVyIHtcclxuICBib3gtc2hhZG93OiAwIDFweCAycHggMCByZ2JhKDAsIDAsIDAsIDAuMyk7XHJcbiAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogMmVtO1xyXG4gIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAyZW07XHJcbn1cclxuXHJcbi5tYXJnaW4tdG9wIHtcclxuICBtYXJnaW4tdG9wOiAxNnB4O1xyXG59XHJcblxyXG4uZWRpdF9zcGFue1xyXG4gIGNvbG9yOiBncmF5O1xyXG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xyXG59XHJcblxyXG4vLyAuYWRkcmVzcy10ZXh0IHtcclxuLy8gICBmb250LXNpemU6IDEuMmVtO1xyXG4vLyAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4vLyB9XHJcbi5tclR7XHJcbiAgbWFyZ2luLXRvcDotMTFweCAhaW1wb3J0YW50O2ZvbnQtc2l6ZTogMTBweCFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbi5mb250XzEwe1xyXG4gIGZvbnQtc2l6ZTogMTBweDtcclxufVxyXG5cclxuLmZvbnRfMTJ7XHJcbiAgZm9udC1zaXplOnNtYWxsO1xyXG59XHJcbiJdfQ== */");

/***/ }),

/***/ "54DF":
/*!*******************************************************!*\
  !*** ./src/app/schedule/survey/survey.component.scss ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".error {\n  color: #df3e3e;\n  font-size: 11px;\n}\n\nion-select {\n  max-width: 100% !important;\n  width: 100% !important;\n  padding-left: 0px !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFxzdXJ2ZXkuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxjQUFBO0VBQ0EsZUFBQTtBQUNGOztBQUVBO0VBQ0UsMEJBQUE7RUFDQSxzQkFBQTtFQUNBLDRCQUFBO0FBQ0YiLCJmaWxlIjoic3VydmV5LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmVycm9yIHtcclxuICBjb2xvcjogcmdiKDIyMywgNjIsIDYyKTtcclxuICBmb250LXNpemU6IDExcHg7XHJcbn1cclxuXHJcbmlvbi1zZWxlY3R7XHJcbiAgbWF4LXdpZHRoOiAxMDAlICFpbXBvcnRhbnQ7XHJcbiAgd2lkdGg6IDEwMCUgIWltcG9ydGFudDtcclxuICBwYWRkaW5nLWxlZnQ6IDBweCAhaW1wb3J0YW50O1xyXG59XHJcbiJdfQ== */");

/***/ }),

/***/ "5mh3":
/*!*****************************************************!*\
  !*** ./src/app/schedule/design/design.component.ts ***!
  \*****************************************************/
/*! exports provided: DesignComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DesignComponent", function() { return DesignComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_design_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./design.component.html */ "cDDn");
/* harmony import */ var _design_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./design.component.scss */ "Fi72");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var src_app_api_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/api.service */ "yTNM");
/* harmony import */ var src_app_utilities_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/utilities.service */ "oTnF");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _model_constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../model/constants */ "Kp5Z");
/* harmony import */ var _storage_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../storage.service */ "qkCY");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _ionic_native_Camera_ngx__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ionic-native/Camera/ngx */ "a/9d");
/* harmony import */ var _ionic_native_file_ngx__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ionic-native/file/ngx */ "FAH8");
/* harmony import */ var _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @cometchat-pro/cordova-ionic-chat */ "ujHh");
/* harmony import */ var _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _ionic_native_native_geocoder_ngx__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @ionic-native/native-geocoder/ngx */ "h+qT");
/* harmony import */ var _ionic_native_diagnostic_ngx__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @ionic-native/diagnostic/ngx */ "mtRb");
/* harmony import */ var _ionic_native_geolocation_ngx__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @ionic-native/geolocation/ngx */ "Bfh1");


















//import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
//import { AngularFirestore} from '@angular/fire/firestore';
let DesignComponent = class DesignComponent {
    constructor(formBuilder, apiService, utils, navController, storage, route, camera, file, router, cdr, zone, nativeGeocoder, diagnostic, geolocation, platform, toastController
    //private db: AngularFireDatabase
    ) {
        this.formBuilder = formBuilder;
        this.apiService = apiService;
        this.utils = utils;
        this.navController = navController;
        this.storage = storage;
        this.route = route;
        this.camera = camera;
        this.file = file;
        this.router = router;
        this.cdr = cdr;
        this.zone = zone;
        this.nativeGeocoder = nativeGeocoder;
        this.diagnostic = diagnostic;
        this.geolocation = geolocation;
        this.platform = platform;
        this.toastController = toastController;
        this.listOfAssignees = [];
        this.listOfSolarMake = [];
        this.listOfSolarMade = [];
        this.listOfInverterMade = [];
        this.listOfInverterMake = [];
        this.getCompanies = [];
        this.emailError = _model_constants__WEBPACK_IMPORTED_MODULE_8__["INVALID_EMAIL_MESSAGE"];
        this.nameError = _model_constants__WEBPACK_IMPORTED_MODULE_8__["INVALID_NAME_MESSAGE"];
        this.annualunitError = _model_constants__WEBPACK_IMPORTED_MODULE_8__["INVALID_ANNUAL_UNIT"];
        this.tiltforgroundError = _model_constants__WEBPACK_IMPORTED_MODULE_8__["INVALID_TILT_FOR_GROUND_MOUNT"];
        this.companyError = _model_constants__WEBPACK_IMPORTED_MODULE_8__["INVALID_COMPANY_NAME"];
        this.addressError = _model_constants__WEBPACK_IMPORTED_MODULE_8__["INVALID_ADDRESS"];
        this.fieldRequired = _model_constants__WEBPACK_IMPORTED_MODULE_8__["FIELD_REQUIRED"];
        this.designId = 0;
        this.design = null;
        this.archFiles = [];
        this.prelimFiles = [];
        this.indexOfArcFiles = [];
        this.isArcFileDelete = false;
        //attachmentName = this.desginForm.get('attachments').value;
        this.options = {
            quality: 30,
            targetWidth: 600,
            targetHeight: 300,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.PNG,
            mediaType: this.camera.MediaType.PICTURE
        };
        this.onFormSubmit = true;
        this.fieldDisabled = false;
        this.attachmentFileUpload = false;
        // newprelims: Observable<any>;
        // newprelimsRef: AngularFireObject<any>;
        // //newprelimsRef:any;
        // newprelimscount = 0;
        //for address
        //user: User
        this.isEditMode = false;
        this.geoEncoderOptions = {
            useLocale: true,
            maxResults: 5
        };
        this.geocoder = new google.maps.Geocoder();
        this.autoCompleteOff = false;
        this.isSelectSearchResult = false;
        // onProjectChange(event){
        // console.log("eve",this.desginForm);
        // }
        this.getclass = () => {
            return this.address == "" ? "0px" : "50px";
        };
        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var d_date = tomorrow.toISOString();
        const EMAILPATTERN = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z]+(?:\.[a-zA-Z]+)*$/;
        const NAMEPATTERN = /^[a-zA-Z. ]{3,}$/;
        const NUMBERPATTERN = '^[0-9]*$';
        const COMPANYFORMAT = '[a-zA-Z0-9. ]{3,}';
        this.desginForm = this.formBuilder.group({
            companyname: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](''),
            name: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].pattern(NAMEPATTERN)]),
            email: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].pattern(EMAILPATTERN)]),
            solarmake: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]),
            solarmodel: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]),
            invertermake: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]),
            invertermodel: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]),
            monthlybill: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].min(0), _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].pattern(NUMBERPATTERN)]),
            //address: new FormControl('',[Validators.required]),
            address: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]),
            createdby: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](''),
            assignedto: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](''),
            rooftype: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](''),
            //prelimdesign: new FormControl(null),
            architecturaldesign: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](''),
            tiltofgroundmountingsystem: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](''),
            mountingtype: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]),
            // jobtype: new FormControl('', [Validators.required]),
            projecttype: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]),
            newconstruction: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](false),
            source: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('android', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]),
            comments: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](''),
            requesttype: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('prelim'),
            latitude: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](null),
            longitude: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](null),
            country: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](''),
            state: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](''),
            city: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](''),
            postalcode: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](null),
            status: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('created'),
            attachments: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]([]),
            deliverydate: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](d_date, []),
            outsourcedto: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](null),
            isoutsourced: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('false'),
            designacceptancestarttime: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](null),
            creatorparentid: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](this.storage.getParentId()),
            //isonpriority:new FormControl('false'),
            paymentstatus: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](null),
            paymenttype: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](null),
            requirementtype: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('assessment')
            // uploadbox:new FormControl('')
        });
        // this.newprelimsRef = db.object('newprelimdesigns');
        // this.newprelims = this.newprelimsRef.valueChanges();
        // this.newprelims.subscribe(
        //   (res) => {
        //     console.log(res);
        //     this.newprelimscount = res.count;
        //     cdr.detectChanges();
        //   },
        //   (err) => console.log(err),
        //   () => console.log('done!')
        // )
        //this.newprelims = this.newprelimsRef.valueChanges();
        // this.db.doc('newprelimdesigns').valueChanges().subscribe((res:any)=>{
        //   this.newprelimscount = res;
        //   console.log(this.newprelimscount)
        // })
        // this.newprelims.subscribe(
        //   (res) => {
        //     console.log(res);
        //     this.newprelimscount = res.count;
        //   },
        //   (err) => console.log(err),
        //   () => console.log('done!')
        // )
        this.designId = +this.route.snapshot.paramMap.get('id');
        this.getAssignees();
        this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
        this.autocompleteItems = [];
    }
    numberfield(event) {
        console.log(event);
    }
    ionViewDidEnter() {
    }
    // getmodulename(event){
    //     this.modulename= event;
    //     console.log(this.modulename);
    // }
    // logScrolling(e){
    // }
    // record(){
    //   this.filterrecord= this.listOfSolarMake.filter(x=>
    // }
    ngOnInit() {
        this.fieldDisabled = false;
        this.userdata = this.storage.getUser();
        // this.utils.manualInput.subscribe(data=>{
        //     if(this.modulename=='solarmake'){
        //       this.solarmake=data;
        // this.solarMakeDisposable.unsubscribe();
        // this.desginForm.patchValue({
        //   solarmake:data
        // });
        // this.solarMakeDisposable = this.desginForm.get('solarmake').valueChanges.subscribe(val => {
        //   this.getSolarMade();
        // });
        // }else if(this.modulename=='solarmade'){
        // this.solarmade=data;
        // }else if(this.modulename=='invertermake'){
        //   this.invertermake = data;
        // }else if(this.modulename=='invertermade'){
        //   this.invertermade= data;
        // }
        // })
        this.address = this.storage.getData();
        this.subscription = this.utils.getScheduleFormEvent().subscribe((event) => {
            if (event === _model_constants__WEBPACK_IMPORTED_MODULE_8__["ScheduleFormEvent"].SAVE_DESIGN_FORM || event === _model_constants__WEBPACK_IMPORTED_MODULE_8__["ScheduleFormEvent"].SEND_DESIGN_FORM) {
                this.send = event;
                this.addForm();
            }
            if (event === _model_constants__WEBPACK_IMPORTED_MODULE_8__["ScheduleFormEvent"].PAY_EVENT) {
                this.sendtowattmonk();
            }
        });
        this.gettingClients();
        if (this.designId !== 0) {
            setTimeout(() => {
                this.getDesignDetails();
            }, 1000);
        }
        else {
            // if(this.onFormSubmit){
            this.solarMakeDisposable = this.desginForm.get('solarmake').valueChanges.subscribe(val => {
                this.getSolarMade();
            });
            this.desginForm.get('invertermake').valueChanges.subscribe(val => {
                this.getInverterMade();
            });
            // }
            // this.addressSubscription = this.utils.getAddressObservable().subscribe((address) => {
            //   // console.log(address,">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
            //    // this.desginForm.get('address').setValue('124/345');
            //    // this.desginForm.get('latitude').setValue('24.553333');
            //    // this.desginForm.get('longitude').setValue('80.5555555555');
            //    // this.desginForm.get('country').setValue('india');
            //    // this.desginForm.get('city').setValue('Lucknow');
            //    // this.desginForm.get('state').setValue('UP');
            //    // this.desginForm.get('postalcode').setValue(3232343);
            //    this.desginForm.get('address').setValue(address.address);
            //      this.desginForm.get('latitude').setValue(address.lat);
            //      this.desginForm.get('longitude').setValue(address.long);
            //      this.desginForm.get('country').setValue(address.country);
            //    this.desginForm.get('city').setValue(address.city);
            //      this.desginForm.get('state').setValue(address.state);
            //      this.desginForm.get('postalcode').setValue(address.postalcode);
            // }, (error) => {
            //   this.desginForm.get('address').setValue('');
            //   this.desginForm.get('latitude').setValue('');
            //   this.desginForm.get('longitude').setValue('');
            //   this.desginForm.get('country').setValue('');
            //   this.desginForm.get('city').setValue('');
            //   this.desginForm.get('state').setValue('');
            //   this.desginForm.get('postalcode').setValue('');
            // });
            this.desginForm.patchValue({
                createdby: this.storage.getUserID()
            });
            this.getSolarMake();
        }
        this.formControlValueChanged();
        this.uploadcontrolvalidation();
    }
    formControlValueChanged() {
        const NUMBERPATTERN = '^[0-9]*$';
        const tiltControl = this.desginForm.get('tiltofgroundmountingsystem');
        const roofcontrol = this.desginForm.get('rooftype');
        this.desginForm.get('mountingtype').valueChanges.subscribe((mode) => {
            console.log(mode);
            if (mode === 'ground') {
                tiltControl.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].pattern(NUMBERPATTERN)]);
                roofcontrol.clearValidators();
                roofcontrol.reset();
            }
            else if (mode === 'both') {
                tiltControl.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required, , _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].min(0), _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].pattern(NUMBERPATTERN)]);
                roofcontrol.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]);
            }
            else if (mode === 'roof') {
                roofcontrol.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]);
                tiltControl.clearValidators();
                tiltControl.reset();
            }
            else {
                tiltControl.clearValidators();
                roofcontrol.clearValidators();
            }
            tiltControl.updateValueAndValidity();
            roofcontrol.updateValueAndValidity();
        });
    }
    uploadcontrolvalidation() {
        const uploadboxcontrol = this.desginForm.get('architecturaldesign');
        this.desginForm.get('newconstruction').valueChanges.subscribe((uploadmode) => {
            console.log(uploadmode);
            if (uploadmode == 'true') {
                uploadboxcontrol.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]);
            }
            else if (uploadmode == 'false') {
                uploadboxcontrol.clearValidators();
                uploadboxcontrol.reset();
            }
            uploadboxcontrol.updateValueAndValidity();
        });
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
        if (this.designId === 0) {
            this.addressSubscription.unsubscribe();
        }
    }
    getDesignDetails() {
        this.utils.showLoading('Getting Design Details').then(() => {
            this.apiService.getDesginDetail(this.designId).subscribe((result) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                yield this.utils.hideLoading().then(() => {
                    this.design = result;
                    console.log(this.design);
                    this.fieldDisabled = true;
                    this.attachmentData = this.design.attachments;
                    this.architecturalData = this.design.architecturaldesign;
                    console.log("hello", this.design.attachments);
                    this.desginForm.patchValue({
                        name: this.design.name,
                        email: this.design.email,
                        monthlybill: this.design.monthlybill,
                        address: this.design.address,
                        createdby: this.design.createdby,
                        rooftype: this.design.rooftype,
                        mountingtype: this.design.mountingtype,
                        architecturaldesign: this.design.architecturaldesign,
                        // jobtype: this.design.jobtype,
                        tiltofgroundmountingsystem: this.design.tiltofgroundmountingsystem,
                        comments: this.design.comments == '' ? '' : this.design.comments[0].message,
                        projecttype: this.design.projecttype,
                        latitude: this.design.latitude,
                        longitude: this.design.longitude,
                        country: this.design.country,
                        state: this.design.state,
                        city: this.design.city,
                        postalcode: this.design.postalcode,
                        newconstruction: this.design.newconstruction + '',
                        prelimdesign: null,
                        //attachments:this.design.attachments,
                        attachments: this.design.attachments,
                        solarmake: this.design.solarmake,
                        solarmodel: this.design.solarmodel,
                        invertermake: this.design.invertermake,
                        invertermodel: this.design.invertermodel,
                        status: this.design.status
                    });
                    //console.log("attachments",this.desginForm.get('attachments').value)
                    this.utils.setStaticAddress(this.design.address);
                    //  this.attachmentData=this.design.attachments.length==1 ? this.design.attachments[0].name + this.design.attachments[0].ext : this.design.attachments.length;
                    if (this.design.assignedto !== null && this.design.assignedto !== undefined) {
                        this.desginForm.patchValue({
                            assignedto: this.design.assignedto.id
                        });
                    }
                    setTimeout(() => {
                        this.getSolarMakeForForm();
                        this.getInverterMakeForForm();
                    }, 500);
                });
            }), (error) => {
                this.utils.hideLoading();
            });
        });
    }
    getSolarMakeForForm() {
        this.apiService.getSolarMake().subscribe(response => {
            this.listOfSolarMake = response;
            this.apiService.getSolarMade(this.design.solarmake.id).subscribe(solarresponse => {
                // this.utils.hideLoading().then(()=>{
                this.listOfSolarMade = solarresponse;
                console.log(solarresponse);
                console.log('patching solar');
                setTimeout(() => {
                    this.desginForm.patchValue({
                        solarmake: this.design.solarmake.id,
                        solarmodel: this.design.solarmodel.id
                    });
                    // if(this.onFormSubmit){
                    this.desginForm.get('solarmake').valueChanges.subscribe(val => {
                        this.getSolarMade();
                    });
                    // }
                }, 500);
                // });
            }, solarResponseError => {
                const error = solarResponseError.error;
                if (error.message instanceof String) {
                    this.utils.errorSnackBar(error.message);
                }
                else if (error.message instanceof Array) {
                    this.utils.errorSnackBar(error.message[0].messages[0].message);
                }
            });
        }, responseError => {
            const error = responseError.error;
            if (error.message instanceof String) {
                this.utils.errorSnackBar(error.message);
            }
            else if (error.message instanceof Array) {
                this.utils.errorSnackBar(error.message[0].messages[0].message);
            }
        });
    }
    getInverterMakeForForm() {
        this.apiService.getInverterMake().subscribe(response => {
            console.log(response);
            this.listOfInverterMake = response;
            this.apiService.getInverterMade(this.design.invertermake.id).subscribe(makeResponse => {
                // this.utils.hideLoading();
                console.log('patching inverter');
                this.listOfInverterMade = makeResponse;
                setTimeout(() => {
                    this.desginForm.patchValue({
                        invertermake: this.design.invertermake.id,
                        invertermodel: this.design.invertermodel.id
                    });
                    // if(this.onFormSubmit){
                    this.desginForm.get('invertermake').valueChanges.subscribe(val => {
                        this.getInverterMade();
                    });
                    // }
                }, 500);
            }, makeResponseError => {
                const error = makeResponseError.error;
                if (error.message instanceof String) {
                    this.utils.errorSnackBar(error.message);
                }
                else if (error.message instanceof Array) {
                    this.utils.errorSnackBar(error.message[0].messages[0].message);
                }
            });
        }, responseError => {
            const error = responseError.error;
            if (error.message instanceof String) {
                this.utils.errorSnackBar(error.message);
            }
            else if (error.message instanceof Array) {
                this.utils.errorSnackBar(error.message[0].messages[0].message);
            }
        });
    }
    saveModuleMake() {
        const found = this.listOfSolarMake.some((el) => el.name === this.solarmake);
        console.log(found);
        if (!found) {
            let solarmakedata = {
                name: this.solarmake
            };
            this.apiService.postSolarMake(solarmakedata).subscribe((response) => {
                this.desginForm.patchValue({
                    solarmake: response.id
                });
                this.saveModuleModel();
            }, err => {
                console.log(err, 'err in savemodulemake');
            });
        }
        else {
            this.saveModuleModel();
        }
    }
    saveModuleModel() {
        const ismakefound = this.listOfSolarMake.some(el => el.name === this.solarmake);
        const found = this.listOfSolarMade.some((el) => el.name === this.solarmade);
        if (!ismakefound || !found) {
            let solarmadedata = {
                solarmade: this.solarmade,
                solarmake: this.desginForm.get('solarmake').value
            };
            console.log(solarmadedata);
            this.apiService.postSolarMade(solarmadedata).subscribe((response) => {
                this.desginForm.patchValue({
                    solarmade: response.id
                });
                this.saveInvertermake();
            });
        }
        else {
            this.saveInvertermake();
        }
    }
    saveInvertermake() {
        const found = this.listOfInverterMake.some(el => el.name === this.invertermake);
        if (!found) {
            let invertermakedata = {
                invertermake: this.invertermake
            };
            this.apiService.postInverterMake(invertermakedata).subscribe((response) => {
                this.desginForm.patchValue({
                    invertermake: response.id
                });
                this.saveInverterMade();
            });
        }
        else {
            this.saveInverterMade();
        }
    }
    saveInverterMade() {
        const ismakefound = this.listOfInverterMake.some(el => el.name === this.invertermake);
        const found = this.listOfInverterMade.some(el => el.name === this.invertermade);
        if (!ismakefound || !found) {
            let invertermadedata = {
                invertermade: this.invertermade,
                invertermake: this.desginForm.get('invertermake').value
            };
            console.log(invertermadedata);
            this.apiService.postInverterMade(invertermadedata).subscribe((response) => {
                this.desginForm.patchValue({
                    invertermade: response.id
                });
                this.submitform();
            });
        }
        else {
            this.submitform();
        }
    }
    remove(arc, i) {
        //   this.utils.showLoading('Deleting Architecture Design').then((success)=>{
        //     this.apiService.deletePrelimImage(index).subscribe(res=>{console.log("hello",res)
        //   this.utils.hideLoading().then(()=>{
        //     this.utils.showSnackBar('File deleted successfully');
        //     this.navController.navigateRoot(["/schedule/design/",{id:this.designId}]);
        //     //this.utils.setHomepageDesignRefresh(true);
        //   });
        //   },
        // (error)=>{
        //   this.utils.hideLoading().then(()=> {
        //     this.utils.errorSnackBar('some Error Occured');
        //   });
        // });
        // });
        console.log(arc);
        this.indexOfArcFiles.push(arc.id);
        this.isArcFileDelete = true;
        console.log(this.isArcFileDelete);
        console.log(this.indexOfArcFiles);
        console.log(this.architecturalData);
        this.architecturalData.splice(i, 1);
    }
    removeattachment(attachment, i) {
        this.indexOfArcFiles.push(attachment.id);
        this.isArcFileDelete = true;
        console.log(this.isArcFileDelete);
        console.log(this.indexOfArcFiles);
        console.log(this.attachmentData);
        console.log(i);
        this.attachmentData.splice(i, 1);
    }
    deleteArcFile(index) {
        // this.utils.showLoading('Deleting Architecture Design').then((success)=>{
        for (var i = 0; i < index.length; i++) {
            var id = index[i];
            this.apiService.deletePrelimImage(id).subscribe(res => {
                console.log("hello", res);
            });
            // this.utils.hideLoading().then(()=>{
            //   //   this.utils.showSnackBar('File deleted successfully');
            //     // this.navController.navigateRoot(["/permitschedule",{id:this.designId}]);
            //    // this.utils.setPermitDesignDetailsRefresh(true);
            //  // });
            //   },
            (error) => {
                this.utils.hideLoading().then(() => {
                    this.utils.errorSnackBar('some Error Occured');
                });
            };
        }
        // });
        //this.utils.setHomepageDesignRefresh(true);
    }
    addForm() {
        this.onFormSubmit = false;
        // this.saveModuleMake();
        debugger;
        console.log('Reach', this.desginForm);
        // debugger;
        // this.saveModuleMake();
        // if(!this.isSelectSearchResult)
        // {
        //   this.desginForm.get('latitude').setValue(null);
        //   this.desginForm.get('longitude').setValue(null);
        //   this.desginForm.get('postalcode').setValue(null);
        // }
        this.submitform();
    }
    submitform() {
        if (this.desginForm.status === 'VALID') {
            var newConstruction = this.desginForm.get("newconstruction").value;
            if (this.designId === 0) {
                if (this.send === _model_constants__WEBPACK_IMPORTED_MODULE_8__["ScheduleFormEvent"].SAVE_DESIGN_FORM) {
                    debugger;
                    this.utils.showLoading('Saving').then(() => {
                        this.apiService.addDesginForm(this.desginForm.value).subscribe((response) => {
                            // this.uploaarchitecturedesign(response.id,'architecturaldesign');
                            // this.uploadpreliumdesign(response.id,'attachments')
                            this.utils.hideLoading().then(() => {
                                if (newConstruction == 'true') {
                                    // if(this.architecturalFileUpload){
                                    this.uploaarchitecturedesign(response, 'architecturaldesign');
                                    // }
                                }
                                else {
                                    if (this.attachmentFileUpload) {
                                        this.uploadpreliumdesign(response, 'attachments');
                                    }
                                    else {
                                        this.router.navigate(['/homepage/design']);
                                        // this.utils.showSnackBar('Design have been saved');
                                        this.utils.setHomepageDesignRefresh(true);
                                    }
                                }
                                // this.utils.hideLoading().then(() => {
                                //   console.log('Res', response);
                                //   this.createChatGroup(response);
                                //   this.router.navigate(['/homepage/design'])
                                //   // this.utils.showSnackBar('Design have been saved');
                                //   this.utils.setHomepageDesignRefresh(true);
                                //   // this.navController.pop();
                                //   // this.utils.showSuccessModal('Desgin have been saved').then((modal) => {
                                //   //   modal.present();
                                //   //   modal.onWillDismiss().then((dismissed) => {
                                //       // this.utils.setHomepageDesignRefresh(true);
                                //   //     this.navController.pop();
                                //   //   });
                                //   // });
                            });
                        }, responseError => {
                            this.utils.hideLoading();
                            const error = responseError.error;
                            this.utils.errorSnackBar(error.message);
                        });
                    });
                }
                else if (this.send === _model_constants__WEBPACK_IMPORTED_MODULE_8__["ScheduleFormEvent"].SEND_DESIGN_FORM) {
                    this.apiService.addDesginForm(this.desginForm.value).subscribe((response) => {
                        console.log(response.id);
                        this.utils.hideLoading().then(() => {
                            if (newConstruction == 'true') {
                                this.uploaarchitecturedesign(response, 'architecturaldesign');
                            }
                            else {
                                if (this.attachmentFileUpload) {
                                    this.uploadpreliumdesign(response, 'attachments');
                                }
                                else {
                                    let objToSend = {
                                        queryParams: {
                                            id: response.id,
                                            designData: "prelim",
                                            fulldesigndata: response,
                                            designType: "siteassesment"
                                        },
                                        skipLocationChange: false,
                                        fragment: 'top'
                                    };
                                    this.router.navigate(['/payment-modal'], {
                                        state: { productdetails: objToSend }
                                    });
                                }
                            }
                        });
                    }, responseError => {
                        this.utils.hideLoading();
                        const error = responseError.error;
                        this.utils.errorSnackBar(error.message);
                    });
                }
            }
            else {
                if (this.send === _model_constants__WEBPACK_IMPORTED_MODULE_8__["ScheduleFormEvent"].SAVE_DESIGN_FORM) {
                    this.utils.showLoading('Saving').then(() => {
                        this.apiService.updateDesignForm(this.desginForm.value, this.designId).subscribe(response => {
                            this.utils.hideLoading().then(() => {
                                if (newConstruction == 'true') {
                                    this.uploaarchitecturedesign(response, 'architecturaldesign');
                                }
                                else {
                                    if (this.attachmentFileUpload) {
                                        this.uploadpreliumdesign(response, 'attachments');
                                    }
                                    else {
                                        this.utils.showSnackBar('Design have been updated');
                                        this.utils.setDesignDetailsRefresh(true);
                                        this.navController.pop();
                                    }
                                }
                                if (this.isArcFileDelete) {
                                    this.deleteArcFile(this.indexOfArcFiles);
                                }
                            });
                        }, responseError => {
                            this.utils.hideLoading().then(() => {
                                const error = responseError.error;
                                this.utils.errorSnackBar(error.message[0].messages[0].message);
                            });
                        });
                    });
                }
                else if (this.send === _model_constants__WEBPACK_IMPORTED_MODULE_8__["ScheduleFormEvent"].SEND_DESIGN_FORM) {
                    this.apiService.updateDesignForm(this.desginForm.value, this.designId).subscribe(response => {
                        this.utils.hideLoading().then(() => {
                            if (newConstruction == 'true') {
                                this.uploaarchitecturedesign(response, 'architecturaldesign');
                            }
                            else {
                                if (this.attachmentFileUpload) {
                                    this.uploadpreliumdesign(response, 'attachments');
                                }
                                else {
                                    let objToSend = {
                                        queryParams: {
                                            id: response.id,
                                            designData: "prelim",
                                            fulldesigndata: response
                                        },
                                        skipLocationChange: false,
                                        fragment: 'top'
                                    };
                                    this.router.navigate(['/payment-modal'], {
                                        state: { productdetails: objToSend }
                                    });
                                }
                            }
                            if (this.isArcFileDelete) {
                                console.log("hello");
                                this.deleteArcFile(this.indexOfArcFiles);
                            }
                            // this.utils.hideLoading().then(() => {
                            //   console.log('Res', response);
                            //   this.value=response.id;
                            //   this.utils.showSnackBar('Design have been updated');
                            //   //this.router.navigate(["payment-modal",{id:response.id,designData:"prelim"}]);
                        });
                    }, responseError => {
                        this.utils.hideLoading().then(() => {
                            const error = responseError.error;
                            this.utils.errorSnackBar(error.message[0].messages[0].message);
                        });
                    });
                }
            }
        }
        else {
            if (this.desginForm.value.name == '' || this.desginForm.get('name').hasError('pattern')) {
                this.utils.errorSnackBar('Please check the field name.');
            }
            else if (this.desginForm.value.email == '' || this.desginForm.get('email').hasError('pattern')) {
                this.utils.errorSnackBar('Please check the field email.');
            }
            else if (this.desginForm.value.monthlybill == '' || this.desginForm.get('monthlybill').hasError('pattern')) {
                this.utils.errorSnackBar('Please check the field annual units.');
            }
            else if (this.desginForm.value.solarmake == '' || this.desginForm.get('solarmake').hasError('pattern')) {
                this.utils.errorSnackBar('Please check the field module make.');
            }
            else if (this.desginForm.value.solarmodel == '' || this.desginForm.get('solarmodel').hasError('pattern')) {
                this.utils.errorSnackBar('Please check the field module model.');
            }
            else if (this.desginForm.value.invertermake == '' || this.desginForm.get('invertermake').hasError('pattern')) {
                this.utils.errorSnackBar('Please check the field inverter make.');
            }
            else if (this.desginForm.value.invertermodel == '' || this.desginForm.get('invertermodel').hasError('pattern')) {
                this.utils.errorSnackBar('Please check the field inverter model.');
            }
            else if (this.desginForm.value.mountingtype == '') {
                this.utils.errorSnackBar('Please fill the mounting type.');
            }
            else if (this.desginForm.value.projecttype == '') {
                this.utils.errorSnackBar('Please fill the project type.');
            }
            else if (this.desginForm.value.tiltofgroundmountingsystem == '' || this.desginForm.get('tiltofgroundmountingsystem').hasError('pattern')) {
                this.utils.errorSnackBar('Please check the field tilt for ground mount.');
            }
            else if (this.desginForm.value.rooftype == '') {
                this.utils.errorSnackBar('Please fill the rooftype.');
            }
            else if (this.desginForm.value.architecturaldesign == '') {
                this.utils.errorSnackBar('Please attach architectural design.');
            }
            else {
                this.utils.errorSnackBar('Address not found. Make sure location is on on device.');
            }
        }
    }
    showInvalidFormAlert() {
        let error = '';
        Object.keys(this.desginForm.controls).forEach((key) => {
            const control = this.desginForm.get(key);
            if (control.invalid) {
                if (error !== '') {
                    error = error + '<br/>';
                }
                if (control.errors.required === true) {
                    error = error + this.utils.capitalizeWord(key) + ' is required';
                }
                if (control.errors.email === true) {
                    error = error + 'Invalid email';
                }
                if (control.errors.error !== null && control.errors.error !== undefined) {
                    error = error + control.errors.error;
                }
            }
        });
        console.log(this.desginForm.value);
        this.utils.showAlert(error);
    }
    getAssignees() {
        this.apiService.getDesigners().subscribe(assignees => {
            this.listOfAssignees = [];
            // this.listOfAssignees.push(this.utils.getDefaultAssignee(this.storage.getUserID()));
            assignees.forEach(item => this.listOfAssignees.push(item));
            console.log(this.listOfAssignees);
        });
    }
    getSolarMade() {
        this.utils.showLoading('Getting module models').then((success) => {
            this.apiService.getSolarMade(this.desginForm.get('solarmake').value).subscribe(response => {
                this.utils.hideLoading().then(() => {
                    console.log(response);
                    this.listOfSolarMade = response;
                    this.desginForm.patchValue({
                        solarmodel: ''
                    });
                });
            }, responseError => {
                this.utils.hideLoading();
                const error = responseError.error;
                this.utils.errorSnackBar(error.message[0].messages[0].message);
            });
            // }, (error) => {
        });
    }
    ioniViewDidEnter() {
    }
    getSolarMake() {
        this.getInverterMake();
        this.apiService.getSolarMake().subscribe(response => {
            this.listOfSolarMake = response;
        }, responseError => {
            const error = responseError.error;
            console.log(error);
            this.utils.errorSnackBar(error.message[0].messages[0].message);
        });
    }
    getInverterMade() {
        console.log(this.desginForm.get('invertermake').value);
        this.utils.showLoading('Getting inverter models').then((success) => {
            this.apiService.getInverterMade(this.desginForm.get('invertermake').value).subscribe(response => {
                this.utils.hideLoading().then(() => {
                    console.log(response);
                    this.listOfInverterMade = response;
                    this.desginForm.patchValue({
                        invertermodel: ''
                    });
                });
            }, responseError => {
                this.utils.hideLoading();
                const error = responseError.error;
                this.utils.errorSnackBar(error.message[0].messages[0].message);
            });
            // }, (reject) => {
        });
    }
    getInverterMake() {
        this.apiService.getInverterMake().subscribe(response => {
            console.log(response);
            this.listOfInverterMake = response;
        }, responseError => {
            const error = responseError.error;
            this.utils.errorSnackBar(error.message[0].messages[0].message);
        });
    }
    eventcheck(e) {
        this.showValue = e.target.value;
        console.log(this.showValue);
    }
    showUpload(e) {
        this.uploadbox = e.target.value;
    }
    files(event) {
        console.log(event.target.files);
        for (var i = 0; i < event.target.files.length; i++) {
            this.archFiles.push(event.target.files[i]);
        }
        console.log(this.archFiles);
    }
    prelimfiles(event) {
        console.log(event.target.files);
        for (var i = 0; i < event.target.files.length; i++) {
            this.prelimFiles.push(event.target.files[i]);
        }
        this.attachmentFileUpload = true;
        if (this.prelimFiles.length == 1) {
            this.fileName = event.target.files[0].name;
            console.log(this.fileName);
        }
        else if (this.prelimFiles.length > 1) {
            this.fileName = this.prelimFiles.length;
        }
        else {
            this.fileName = '';
        }
    }
    uploaarchitecturedesign(response, key) {
        console.log(this.archFiles);
        const imageData = new FormData();
        for (var i = 0; i < this.archFiles.length; i++) {
            imageData.append("files", this.archFiles[i]);
            if (i == 0) {
                imageData.append('path', 'designs/' + response.id);
                imageData.append('refId', response.id + '');
                imageData.append('ref', 'design');
                imageData.append('field', key);
            }
        }
        this.utils.showLoading("Architectural File Uploading").then(() => {
            this.apiService.uploaddesign(imageData).subscribe(res => {
                console.log(res);
                this.utils.hideLoading();
                if (this.attachmentFileUpload) {
                    this.uploadpreliumdesign(response, 'attachments');
                }
                else {
                    if (this.send === _model_constants__WEBPACK_IMPORTED_MODULE_8__["ScheduleFormEvent"].SAVE_DESIGN_FORM) {
                        this.router.navigate(['/homepage/design']);
                        if (this.designId == 0) {
                            this.utils.showSnackBar('Design have been saved');
                        }
                        else {
                            this.utils.showSnackBar('Design have been updated');
                        }
                        this.utils.setHomepageDesignRefresh(true);
                    }
                    else {
                        let objToSend = {
                            queryParams: {
                                id: response.id,
                                designData: "prelim",
                                fulldesigndata: response
                            },
                            skipLocationChange: false,
                            fragment: 'top'
                        };
                        this.router.navigate(['/payment-modal'], {
                            state: { productdetails: objToSend }
                        });
                    }
                }
            }, responseError => {
                this.utils.hideLoading();
                const error = responseError.error;
                this.utils.errorSnackBar(error.message[0].messages[0].message);
            });
        });
    }
    uploadpreliumdesign(response, key, filearray) {
        console.log(this.prelimFiles);
        const imageData = new FormData();
        for (var i = 0; i < this.prelimFiles.length; i++) {
            imageData.append("files", this.prelimFiles[i]);
            if (i == 0) {
                imageData.append('path', 'designs/' + response.id);
                imageData.append('refId', response.id + '');
                imageData.append('ref', 'design');
                imageData.append('field', key);
            }
        }
        this.utils.showLoading("Attachment File Uploading").then(() => {
            this.apiService.uploaddesign(imageData).subscribe(res => {
                console.log(res);
                this.utils.hideLoading();
                if (this.send === _model_constants__WEBPACK_IMPORTED_MODULE_8__["ScheduleFormEvent"].SAVE_DESIGN_FORM) {
                    this.router.navigate(['/homepage/design']);
                    if (this.designId == 0) {
                        this.utils.showSnackBar('Design have been saved');
                    }
                    else {
                        this.utils.showSnackBar('Design have been updated');
                    }
                    this.utils.setHomepageDesignRefresh(true);
                }
                else {
                    let objToSend = {
                        queryParams: {
                            id: response.id,
                            designData: "prelim",
                            fulldesigndata: response
                        },
                        skipLocationChange: false,
                        fragment: 'top'
                    };
                    this.router.navigate(['/payment-modal'], {
                        state: { productdetails: objToSend }
                    });
                }
            }, responseError => {
                this.utils.hideLoading();
                //this.utils.hideUploadingLoading();
                const error = responseError.error;
                this.utils.errorSnackBar(error.message[0].messages[0].message);
            });
        });
    }
    // pickarchitecturaldesign(){
    //   this.camera.getPicture(this.options).then((imageData) => {
    //     let base64Image = 'data:image/jpeg;base64,' + imageData;
    //     let blob = this.utils.b64tBlob(base64Image);
    //     let filename = Date.now().toString() + '.png';
    //     this.utils.showLoading('Uploading').then(()=>{
    //       this.apiService.uploaddesign(designId, key, blob, filename).subscribe(()=>{
    //       })
    //     })
    //   })
    // }
    removeArc(i) {
        this.archFiles.splice(i, 1);
    }
    removePrelim(i) {
        this.prelimFiles.splice(i, 1);
    }
    sendtowattmonk() {
        var designacceptancestarttime = new Date();
        designacceptancestarttime.setMinutes(designacceptancestarttime.getMinutes() + 15);
        const postData = {
            outsourcedto: 232,
            isoutsourced: "true",
            status: "outsourced",
            designacceptancestarttime: designacceptancestarttime,
            paymenttype: this.utils.getPaymentMode().value,
            couponid: this.utils.getCouponId().value
        };
        this.utils.showLoading('Assigning').then(() => {
            //this.newprelimsRef.update({ count: this.newprelimscount + 1});
            this.apiService.updateDesignForm(postData, /*this.desginForm.get('id').value*/ this.value).subscribe((value) => {
                this.utils.hideLoading().then(() => {
                    ;
                    console.log('reach ', value);
                    this.utils.showSnackBar('Design request has been assigned to wattmonk successfully'); //.firstname +" "+this.selectedDesigner.lastname + ' ' + 'successfully');
                    this.router.navigate(['/homepage/design']);
                    this.utils.setHomepageDesignRefresh(true);
                });
            }, (error) => {
                this.utils.hideLoading();
            });
        });
    }
    Pay() {
        if (this.desginForm.status === 'VALID') {
            //this.router.navigate(["payment-modal",{designData:"prelim"}]);
            let objToSend = {
                queryParams: {
                    //id:response.id,
                    designData: "prelim"
                },
                skipLocationChange: false,
                fragment: 'top'
            };
            this.router.navigate(['/payment-modal'], {
                state: { productdetails: objToSend }
            });
        }
        else {
            if (this.desginForm.value.name == '' || this.desginForm.get('name').hasError('pattern')) {
                this.utils.errorSnackBar('Please check the field name.');
            }
            else if (this.desginForm.value.email == '' || this.desginForm.get('email').hasError('pattern')) {
                this.utils.errorSnackBar('Please check the field email.');
            }
            else if (this.desginForm.value.monthlybill == '' || this.desginForm.get('monthlybill').hasError('pattern')) {
                this.utils.errorSnackBar('Please check the field annual units.');
            }
            else if (this.desginForm.value.address == '' || this.desginForm.value.address == null) {
                this.utils.errorSnackBar('Please check the field address');
            }
            else if (this.desginForm.value.modulemake == '' || this.desginForm.get('modulemake').hasError('pattern')) {
                this.utils.errorSnackBar('Please check the field module make.');
            }
            else if (this.desginForm.value.modulemodel == '' || this.desginForm.get('modulemodel').hasError('pattern')) {
                this.utils.errorSnackBar('Please check the field module model.');
            }
            else if (this.desginForm.value.invertermake == '' || this.desginForm.get('invertermake').hasError('pattern')) {
                this.utils.errorSnackBar('Please check the field inverter make.');
            }
            else if (this.desginForm.value.invertermodel == '' || this.desginForm.get('invertermodel').hasError('pattern')) {
                this.utils.errorSnackBar('Please check the field inverter model.');
            }
            else if (this.desginForm.value.mountingtype == '') {
                this.utils.errorSnackBar('Please fill the mounting type.');
            }
            else if (this.desginForm.value.projecttype == '') {
                this.utils.errorSnackBar('Please fill the project type.');
            }
            else if (this.desginForm.value.tiltofgroundmountingsystem == '' || this.desginForm.get('tiltofgroundmountingsystem').hasError('pattern')) {
                this.utils.errorSnackBar('Please check the field tilt for ground mount.');
            }
            else if (this.desginForm.value.rooftype == '') {
                this.utils.errorSnackBar('Please fill the rooftype.');
            }
            else if (this.desginForm.value.architecturaldesign == []) {
                this.utils.errorSnackBar('Please attach architectural design.');
            }
            else {
                this.utils.errorSnackBar('Address not found. Make sure location is on on device.');
            }
        }
    }
    createChatGroup(design) {
        var GUID = 'prelim' + "_" + new Date().getTime();
        var address = design.address.substring(0, 60);
        var groupName = design.name + "_" + address;
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
    gettingClients() {
        this.apiService.getClients().subscribe(res => {
            this.getCompanies = res;
            console.log(this.getCompanies);
            this.filteredCompanies = this.desginForm.get('companyname').valueChanges.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_14__["startWith"])(""), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_14__["map"])(value => (typeof value === "string" ? value : value.companyid)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_14__["map"])(companyname => (companyname ? this._filterCompanies(companyname) : this.getCompanies.slice())));
        }, error => {
            // this.utils.errorSnackBar("Error");
        });
    }
    onCompanyChanged(event$) {
        console.log(event$);
        this.proxyValue = event$.detail.value.companyname;
        this.designCreatedBy = event$.detail.value.companyid;
        this.designCreatedByUserParent = event$.detail.value.parentid;
        if (this.designCreatedBy !== null && this.designCreatedByUserParent !== null) {
            var designacceptancestarttime = new Date();
            designacceptancestarttime.setMinutes(designacceptancestarttime.getMinutes() + 15);
            console.log(designacceptancestarttime);
            this.desginForm.patchValue({ createdby: this.designCreatedBy,
                creatorparentid: this.designCreatedByUserParent,
                status: "outsourced",
                outsourcedto: "232",
                isoutsourced: "true",
                designacceptancestarttime: designacceptancestarttime });
        }
    }
    _filterCompanies(companyname) {
        return this.getCompanies.filter(company => company.companyname.toLowerCase().indexOf(companyname) != -1);
    }
    //// For Address
    /* FOR SEARCH SHIPPING ADDRESS */
    updateSearchResults(event) {
        //this.autoCompleteOff = true;
        console.log(this.autoCompleteOff);
        const input = event.detail.value;
        console.log(input);
        if (input === '') {
            this.autocompleteItems = [];
            return;
        }
        this.GoogleAutocomplete.getPlacePredictions({ input, componentRestrictions: {
                country: 'us'
            } }, (predictions, status) => {
            this.autocompleteItems = [];
            this.zone.run(() => {
                predictions.forEach((prediction) => {
                    this.autocompleteItems.push(prediction);
                });
            });
        });
    }
    forAutoComplete(e) {
        console.log("hello", e);
        this.autoCompleteOff = true;
    }
    //   /* FOR SELECT SEARCH SHIPPING ADDRESS*/
    selectSearchResult(item) {
        console.log(item);
        this.isSelectSearchResult = true;
        this.geocoder.geocode({
            placeId: item.place_id
        }, (responses, status) => {
            console.log('respo', responses);
            this.getGeoEncoder(responses[0].geometry.location.lat(), responses[0].geometry.location.lng(), responses[0].formatted_address);
        });
        this.autocompleteItems = [];
    }
    getGeoEncoder(latitude, longitude, formattedAddress) {
        // // TODO remove later
        // const address: AddressModel = {
        //   address: 'Vasant Kunj, New Delhi, Delhi',
        //   lat: 28.5200491,
        //   long: 77.158687,
        //   country: 'India',
        //   state: 'Delhi',
        //   city: 'New Delhi',
        //   postalcode: '110070'
        // };
        // this.utilities.setAddress(address);
        // this.goBack();
        // return;
        this.utils.showLoading('Loading').then(() => {
            this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geoEncoderOptions)
                .then((result) => {
                console.log(result);
                let add = '';
                if (formattedAddress === '') {
                    add = this.generateAddress(result[0]);
                }
                else {
                    add = formattedAddress;
                }
                this.utils.hideLoading().then(() => {
                    console.log('resu', result);
                    const address = {
                        address: add,
                        lat: latitude,
                        long: longitude,
                        country: result[0].countryName,
                        state: result[0].administrativeArea,
                        city: result[0].locality,
                        postalcode: result[0].postalCode
                    };
                    this.utils.setAddress(address);
                    this.addressValue();
                    //this.goBack();
                });
            })
                .catch((error) => {
                this.utils.hideLoading().then(() => {
                    alert('Error getting location' + JSON.stringify(error));
                });
            });
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
    onCancel() {
        console.log("hello");
        this.autocompleteItems = [];
        console.log(this.autocompleteItems);
    }
    addressValue() {
        // }
        this.addressSubscription = this.utils.getAddressObservable().subscribe((address) => {
            console.log(address, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
            // this.firstFormGroup.get('address').setValue('124/345');
            // this.firstFormGroup.get('latitude').setValue('24.553333');
            // this.firstFormGroup.get('longitude').setValue('80.5555555555');
            // this.firstFormGroup.get('country').setValue('india');
            // this.firstFormGroup.get('city').setValue('Lucknow');
            // this.firstFormGroup.get('state').setValue('UP');
            // this.firstFormGroup.get('postalcode').setValue(3232343);
            debugger;
            this.desginForm.get('address').setValue(address.address);
            this.desginForm.get('latitude').setValue(address.lat);
            this.desginForm.get('longitude').setValue(address.long);
            this.desginForm.get('country').setValue(address.country);
            this.desginForm.get('city').setValue(address.city);
            this.desginForm.get('state').setValue(address.state);
            this.desginForm.get('postalcode').setValue(address.postalcode);
        }, (error) => {
            this.desginForm.get('address').setValue('');
            this.desginForm.get('latitude').setValue(null);
            this.desginForm.get('longitude').setValue(null);
            this.desginForm.get('country').setValue('');
            this.desginForm.get('city').setValue('');
            this.desginForm.get('state').setValue('');
            this.desginForm.get('postalcode').setValue(null);
        });
        // this.firstFormGroup.patchValue({
        //   createdby: this.storage.getUserID()
        // });
        // this.autocompleteItems = [];
        this.autoCompleteOff = false;
        console.log(this.autoCompleteOff);
        //this.getSolarMake();
    }
    onBlur() {
        setTimeout(() => {
            this.autocompleteItems = [];
        }, 100);
    }
};
DesignComponent.ctorParameters = () => [
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"] },
    { type: src_app_api_service__WEBPACK_IMPORTED_MODULE_5__["ApiService"] },
    { type: src_app_utilities_service__WEBPACK_IMPORTED_MODULE_6__["UtilitiesService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_7__["NavController"] },
    { type: _storage_service__WEBPACK_IMPORTED_MODULE_9__["StorageService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_10__["ActivatedRoute"] },
    { type: _ionic_native_Camera_ngx__WEBPACK_IMPORTED_MODULE_11__["Camera"] },
    { type: _ionic_native_file_ngx__WEBPACK_IMPORTED_MODULE_12__["File"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_10__["Router"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ChangeDetectorRef"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["NgZone"] },
    { type: _ionic_native_native_geocoder_ngx__WEBPACK_IMPORTED_MODULE_15__["NativeGeocoder"] },
    { type: _ionic_native_diagnostic_ngx__WEBPACK_IMPORTED_MODULE_16__["Diagnostic"] },
    { type: _ionic_native_geolocation_ngx__WEBPACK_IMPORTED_MODULE_17__["Geolocation"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_7__["Platform"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_7__["ToastController"] }
];
DesignComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-design',
        template: _raw_loader_design_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_design_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], DesignComponent);



/***/ }),

/***/ "7pXw":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/schedule/salesproposal/salesproposal.component.html ***!
  \***********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-content class=\"ion-padding-start ion-padding-end ion-padding-bottom\" style=\"height:650px\">\r\n  <form [formGroup]=\"desginForm\" novalidate style=\"overflow:scroll\">\r\n      <ion-grid style=\"position: relative;margin-top: 30px;\">\r\n          <!-- <ion-row *ngIf=\"address !== ''\">\r\n              <ion-col>\r\n                  {{address}}\r\n              </ion-col>\r\n\r\n          </ion-row>\r\n          <ion-row *ngIf=\"address == ''\">\r\n              <ion-col>\r\n              Address not found.\r\n              </ion-col>\r\n\r\n          </ion-row> -->\r\n          <ion-row >\r\n              <ion-col>\r\n                  <ion-item class=\"ion-no-padding\">\r\n                      <ion-label position=\"floating\">name*</ion-label>\r\n                      <ion-input type=\"text\" class=\"form_input\" autocapitalize=\"words\"\r\n                                  formControlName=\"name\"></ion-input>\r\n                  </ion-item>\r\n                  <div style=\"height: 5px;\">\r\n                      <div *ngIf=\"desginForm.get('name').hasError('pattern') && desginForm.get('name').dirty\">\r\n                          <span class=\"error\">{{nameError}}</span>\r\n                      </div>\r\n                      <div *ngIf=\"desginForm.get('name').value === '' && desginForm.get('name').dirty\">\r\n                          <span class=\"error\">{{fieldRequired}}</span>\r\n                      </div>\r\n                  </div>\r\n              </ion-col>\r\n          </ion-row>\r\n          <ion-row class=\"ion-align-items-center ion-justify-content-center\">\r\n              <ion-col>\r\n                  <ion-item class=\"ion-no-padding\">\r\n                      <ion-label position=\"floating\">email*</ion-label>\r\n                      <ion-input class=\"form_input\" type=\"email\" autocapitalize=\"none\" autocomplete=\"off\"\r\n                                  formControlName=\"email\" [disabled]=\"fieldDisabled\"></ion-input>\r\n                  </ion-item>\r\n                  <div style=\"height: 5px;\">\r\n                      <div *ngIf=\"desginForm.get('email').hasError('pattern') && desginForm.get('email').dirty\">\r\n                          <span class=\"error\">{{emailError}}</span>\r\n                      </div>\r\n                      <div *ngIf=\"desginForm.get('email').value === '' && desginForm.get('email').dirty\">\r\n                          <span class=\"error\">{{fieldRequired}}</span>\r\n                      </div>\r\n                  </div>\r\n              </ion-col>\r\n          </ion-row>\r\n          <ion-row class=\"ion-align-items-center ion-justify-content-center\">\r\n              <ion-col>\r\n                  <ion-item class=\"ion-no-padding\">\r\n                      <ion-label position=\"floating\">annual units (Kwh)*</ion-label>\r\n                      <ion-input class=\"form_input\"  type=\"tel\" (ionInput)=\"numberfield($event)\"\r\n                                  formControlName=\"monthlybill\" maxLength=\"5\"></ion-input>\r\n                  </ion-item>\r\n                  <div style=\"height: 5px;\">\r\n                      <div *ngIf=\"desginForm.get('monthlybill').dirty && desginForm.get('monthlybill').hasError('pattern')\">\r\n                          <span class=\"error\">{{\"Annual units should be a valid number\"}}</span>\r\n                      </div>\r\n                      <!-- <div *ngIf=\"desginForm.get('monthlybill').hasError('pattern') && desginForm.get('monthlybill').dirty\">\r\n                          <span class=\"error\">{{annualunitError}}</span>\r\n                      </div> -->\r\n                  </div>\r\n              </ion-col>\r\n          </ion-row>\r\n\r\n          <!-- <ion-row class=\"ion-margin-top\">\r\n              <ion-col>\r\n                  <ion-range [min]=\"minRange\" [max]=\"maxRange\" formControlName=\"monthlybill\" mode=\"ios\" pin=\"true\"\r\n                              class=\"ion-no-padding\">\r\n                      <ion-label slot=\"start\">{{minRange | currency :'USD':'symbol':'1.0-0'}}</ion-label>\r\n                      <ion-label slot=\"end\">{{maxRange | currency :'USD':'symbol':'1.0-0'  }} <span style=\"color:red\">*</span></ion-label>\r\n\r\n                  </ion-range>\r\n\r\n              </ion-col>\r\n          </ion-row> -->\r\n\r\n          <ion-row>\r\n              <ion-col size=\"6\">\r\n                  <!-- <ion-label position=\"floating\">module make*</ion-label> -->\r\n                  <app-auto-complete #myinput style=\"font-size: 14px;\" [dataList]=\"listOfSolarMake\"\r\n                formControlName=\"solarmake\"><ion-label position=\"floating\" >Module make*</ion-label></app-auto-complete>\r\n\r\n              </ion-col>\r\n              <ion-col size=\"6\">\r\n                  <!-- <ion-label position=\"floating\">module model*</ion-label> -->\r\n                  <app-auto-complete style=\"font-size: 14px;\"  [dataList]=\"listOfSolarMade\"\r\n                                      formControlName=\"solarmodel\" ><ion-label position=\"floating\" >Module model*</ion-label></app-auto-complete>\r\n\r\n              </ion-col>\r\n          </ion-row>\r\n\r\n          <ion-row>\r\n              <ion-col size=\"6\">\r\n                  <!-- <ion-label position=\"floating\">inverter make*</ion-label> -->\r\n                  <app-auto-complete style=\"font-size: 12px;\" [dataList]=\"listOfInverterMake\"\r\n                                      formControlName=\"invertermake\"><ion-label position=\"floating\" >Inverter make*</ion-label></app-auto-complete>\r\n              </ion-col>\r\n              <ion-col size=\"6\">\r\n                  <!-- <ion-label position=\"floating\">invertor model*</ion-label> -->\r\n                  <app-auto-complete style=\"font-size: 10px;\" [dataList]=\"listOfInverterMade\"\r\n                                      formControlName=\"invertermodel\" ><ion-label position=\"floating\" >Inverter model*</ion-label></app-auto-complete>\r\n              </ion-col>\r\n          </ion-row>\r\n\r\n          <ion-row class=\"ion-align-items-center ion-justify-content-center\">\r\n              <ion-col size=\"6\">\r\n                  <ion-item class=\"ion-no-padding\">\r\n                      <ion-label style=\"display: none;\">project type*</ion-label>\r\n                      <ion-label position=\"floating\">Project type*</ion-label>\r\n                      <!-- <ion-label style=\"display: none;\">Project Type</ion-label> -->\r\n                      <!-- <ion-label position=\"floating\">project type</ion-label> -->\r\n                      <ion-select class=\"form_input\" ok-text=\"\"\r\n                                  cancel-text=\"\"\r\n                                  formControlName=\"projecttype\" interface=\"popover\">\r\n                          <ion-select-option value=\"residential\">Residential</ion-select-option>\r\n                          <ion-select-option value=\"commercial\">Commercial</ion-select-option>\r\n                      </ion-select>\r\n                  </ion-item>\r\n\r\n              </ion-col>\r\n\r\n              <!-- <ion-col size=\"6\">\r\n                  <ion-item class=\"ion-no-padding\">\r\n                      <ion-label style=\"display: none;\">Job Type</ion-label>\r\n                      <ion-select class=\"form_input select_div\" placeholder=\"job type\"\r\n                                  ok-text=\"\"\r\n                                  cancel-text=\"\"\r\n                                  formControlName=\"jobtype\" interface=\"popover\">\r\n                          <ion-select-option value=\"pvbattery\">PV+Battery</ion-select-option>\r\n                          <ion-select-option value=\"battery\">Battery</ion-select-option>\r\n                          <ion-select-option value=\"pv\">PV</ion-select-option>\r\n                      </ion-select>\r\n                  </ion-item>\r\n              </ion-col> -->\r\n              <ion-col size=\"6\">\r\n                  <ion-item class=\"ion-no-padding\">\r\n                      <ion-label position=\"floating\">New Construction*</ion-label>\r\n\r\n                      <!-- <ion-label style=\"display: none;\">New construction</ion-label> -->\r\n                      <!-- <ion-label position=\"floating\">new construction</ion-label> -->\r\n                      <ion-select  (ionChange)=\"showUpload($event)\" class=\"form_input select_div\"\r\n                                      ok-text=\"\"\r\n                                  cancel-text=\"\"\r\n                                  formControlName=\"newconstruction\" interface=\"popover\" value=\"false\"  >\r\n                          <ion-select-option  value=\"true\">Yes</ion-select-option>\r\n                          <ion-select-option  value=\"false\">No</ion-select-option>\r\n                      </ion-select>\r\n                  </ion-item>\r\n              </ion-col>\r\n          </ion-row>\r\n          <ion-row class=\"ion-align-items-center ion-justify-content-center\">\r\n            <ion-col size=\"12\">\r\n                <ion-item class=\"ion-no-padding\">\r\n                    <mat-form-field style=\"width: 100%; height: 45px;\" class=\"ion-no-padding\">\r\n                        <mat-label>Utility Name</mat-label>\r\n                        <input type=\"text\" class=\"form_input font-size\" matInput [matAutocomplete]=\"auto\" autocomplete=\"off\" formControlName=\"utility\" required>\r\n\r\n                        <mat-autocomplete #auto=\"matAutocomplete\">\r\n                          <mat-option *ngFor=\"let utility of filteredModuleMakes | async\" [value]=\"utility.name\"\r\n                          (onSelectionChange)=\"fetchUtilityData($event,utility)\" class=\"font\">{{utility.name}}</mat-option>\r\n                        </mat-autocomplete>\r\n                      </mat-form-field>\r\n                </ion-item>\r\n                <div style=\"height: 5px;\">\r\n                    <div *ngIf=\"desginForm.get('utility').hasError('pattern') && desginForm.get('utility').dirty\">\r\n                        <span class=\"error\">{{moduleAndInverterError}}</span>\r\n                    </div>\r\n                </div>\r\n            </ion-col>\r\n          </ion-row >\r\n          <ion-row>\r\n            <ion-col>\r\n                <ion-item class=\"ion-no-padding\">\r\n                    <mat-form-field style=\"width: 100%; height: 45px;\" class=\"ion-no-padding\">\r\n                      <mat-label>Utility Rate</mat-label>\r\n                      <input type=\"text\" class=\"form_input font-size\" matInput [matAutocomplete]=\"auto1\" autocomplete=\"off\" formControlName=\"utilityrate\" required>\r\n                      <mat-autocomplete #auto1=\"matAutocomplete\">\r\n                        <mat-option *ngFor=\"let module of filteredModuleModels | async\" [value]=\"module.rate\"\r\n                        (onSelectionChange)=\"setSelectedUtilityRate(module)\" class=\"font\">{{module.rate}}</mat-option>\r\n                      </mat-autocomplete>\r\n                    </mat-form-field>\r\n                </ion-item>\r\n                <div style=\"height: 5px;\">\r\n                    <div *ngIf=\"desginForm.get('utilityrate').hasError('pattern') && desginForm.get('utilityrate').dirty\">\r\n                        <span class=\"error\">{{moduleAndInverterError}}</span>\r\n                    </div>\r\n                </div>\r\n            </ion-col>\r\n        </ion-row>\r\n\r\n        <!-- <ion-row class=\"ion-align-items-center ion-justify-content-center\">\r\n          <ion-col style=\"margin-top: 15px;\">\r\n              <ion-label>Annual Utility Escalation*</ion-label>\r\n              <ion-range [color]=\"color\"\r\n              class=\"ion-no-padding\" min=\"0\" max=\"5\" formControlName=\"annualutilityescalation\" pin=\"true\"  (ionChange)=\"onRangeChangeHandler()\">\r\n                <ion-label slot=\"start\">0.0%</ion-label>\r\n                <ion-label slot=\"end\">5.0%</ion-label>\r\n              </ion-range>\r\n          </ion-col>\r\n    </ion-row> -->\r\n    <ion-row class=\"ion-align-items-center ion-justify-content-center\">\r\n        <ion-col>\r\n            <ion-item class=\"ion-no-padding\">\r\n            <ion-label position=\"floating\">Annual Utility Escalation*</ion-label>\r\n            <ion-select  class=\"form_input select_div\"\r\n            ok-text=\"\"\r\n        cancel-text=\"\"\r\n        formControlName=\"annualutilityescalation\" interface=\"popover\" [value]=\"3.5\">\r\n        <ion-select-option  [value]=\"0\">0 %</ion-select-option>\r\n<ion-select-option [value]=\"0.5\">0.5 %</ion-select-option>\r\n<ion-select-option  [value]=\"1\">1 %</ion-select-option>\r\n<ion-select-option  [value]=\"1.5\">1.5 %</ion-select-option>\r\n<ion-select-option  [value]=\"2\">2 %</ion-select-option>\r\n<ion-select-option  [value]=\"2.5\">2.5 %</ion-select-option>\r\n<ion-select-option  [value]=\"3\">3 %</ion-select-option>\r\n<ion-select-option  [value]=\"3.5\">3.5 %</ion-select-option>\r\n<ion-select-option  [value]=\"4\">4 %</ion-select-option>\r\n<ion-select-option  [value]=\"4.5\">4.5 %</ion-select-option>\r\n<ion-select-option  [value]=\"5\">5 %</ion-select-option>\r\n</ion-select>\r\n</ion-item>\r\n        </ion-col>\r\n  </ion-row>\r\n    <ion-row class=\"ion-align-items-center ion-justify-content-center\">\r\n      <ion-col>\r\n            <ion-item class=\"ion-no-padding\">\r\n                <ion-label position=\"floating\">Any Incentives*</ion-label>\r\n                <ion-select class=\"form_input select_div\"\r\n                ok-text=\"\" cancel-text=\"\"\r\n                formControlName=\"incentive\" interface=\"popover\" [value]= 'incentives'>\r\n        <ion-select-option *ngFor=\"let incentive of incentives\" [value]=\"incentive.id\">{{incentive.title}}</ion-select-option>\r\n  </ion-select>\r\n          </ion-item>\r\n      </ion-col>\r\n  </ion-row>\r\n  <ion-row class=\"ion-align-items-center ion-justify-content-center\">\r\n    <ion-col size=\"6\">\r\n        <ion-item class=\"ion-no-padding\">\r\n            <ion-label position=\"floating\">Cost of System* (Watt)</ion-label>\r\n            <ion-input type=\"text\" class=\"form_input\"\r\n            formControlName=\"costofsystem\"></ion-input>\r\n        </ion-item>\r\n    </ion-col>\r\n<!-- </ion-row>\r\n\r\n<ion-row class=\"ion-align-items-center ion-justify-content-center\"> -->\r\n  <ion-col size=\"6\">\r\n      <ion-item class=\"ion-no-padding\">\r\n          <ion-label position=\"floating\">Representative Name*</ion-label>\r\n          <ion-input type=\"text\" class=\"form_input\" autocapitalize=\"words\"\r\n          formControlName=\"personname\"></ion-input>\r\n      </ion-item>\r\n      <div style=\"height: 5px;\">\r\n        <div *ngIf=\"desginForm.get('personname').hasError('pattern') && desginForm.get('personname').dirty\">\r\n            <span class=\"error\">{{nameError}}</span>\r\n        </div>\r\n        <div *ngIf=\"desginForm.get('personname').value === '' && desginForm.get('personname').dirty\">\r\n            <span class=\"error\">{{fieldRequired}}</span>\r\n        </div>\r\n    </div>\r\n  </ion-col>\r\n</ion-row>\r\n<ion-row class=\"ion-align-items-center ion-justify-content-center\">\r\n  <ion-col>\r\n      <ion-item class=\"ion-no-padding\">\r\n          <ion-label position=\"floating\">Company Name</ion-label>\r\n          <ion-input  type=\"text\" class=\"form_input\" autocapitalize=\"words\"\r\n          formControlName=\"company\"></ion-input>\r\n      </ion-item>\r\n      <div style=\"height: 5px;\">\r\n        <div *ngIf=\"desginForm.get('company').hasError('pattern') && desginForm.get('company').dirty\">\r\n            <span class=\"error\">{{companyError}}</span>\r\n        </div>\r\n    </div>\r\n  </ion-col>\r\n</ion-row>\r\n\r\n<ion-row class=\"ion-align-items-center ion-justify-content-center\">\r\n  <!-- <ion-col>\r\n      <ion-item class=\"ion-no-padding\">\r\n          <ion-label position=\"floating\">Company Logo</ion-label>\r\n          <ion-input  type=\"text\" class=\"form_input\" autocapitalize=\"words\"\r\n          formControlName=\"companylogo\"></ion-input>\r\n      </ion-item>\r\n  </ion-col> -->\r\n  <ion-col size=\"12\" (click)=\"fileInput.click()\">\r\n    <ion-item  class=\"ion-no-padding\">\r\n      <ion-label position=\"floating\">Upload Logo</ion-label>\r\n      <input type='file' id=\"imageUpload\" placeholder=\"Upload logo\" accept=\"image/\" #fileInput (change)=\"uploadFile($event)\" />\r\n      </ion-item>\r\n\r\n        <div *ngIf=\"logo !=null && logo !=''\" class=\"avatar-upload\" style=\"text-align: center;\">\r\n            <img [src]=logo height=\"100px\" width=\"100px\"  />\r\n      </div>\r\n\r\n  <!-- </ion-item> -->\r\n</ion-col>\r\n</ion-row>\r\n\r\n          <ion-row class=\"ion-align-items-center ion-justify-content-center\">\r\n\r\n              <ion-col size=\"12\">\r\n                  <ion-item class=\"ion-no-padding\">\r\n                      <ion-label style=\"display: none;\">Mounting Type*</ion-label>\r\n                      <ion-label position=\"floating\">Mounting Type*</ion-label>\r\n                      <!-- <ion-label position=\"floating\">mounting type</ion-label> -->\r\n                      <ion-select class=\"form_input select_div\" (ionChange)=\"eventcheck($event)\"\r\n                                  ok-text=\"\" cancel-text=\"\"\r\n                                  formControlName=\"mountingtype\" interface=\"popover\">\r\n                          <ion-select-option value=\"roof\">Roof</ion-select-option>\r\n                          <ion-select-option value=\"ground\">Ground</ion-select-option>\r\n                          <ion-select-option value=\"both\">Both</ion-select-option>\r\n                      </ion-select>\r\n                  </ion-item>\r\n              </ion-col>\r\n          </ion-row>\r\n\r\n          <!-- condition base roof type-->\r\n          <ion-row>\r\n              <ion-col size=\"6\" *ngIf='(showValue==\"roof\" ||showValue== \"both\")'>\r\n                  <ion-item class=\"ion-no-padding\">\r\n                      <ion-label style=\"display: none;\">Roof Type</ion-label>\r\n                      <ion-label position=\"floating\">Roof type*</ion-label>\r\n                      <ion-select class=\"form_input select_div\"\r\n                                  ok-text=\"\" cancel-text=\"\"\r\n                                  formControlName=\"rooftype\" interface=\"popover\">\r\n                          <ion-select-option value=\"flat\">Flat</ion-select-option>\r\n                          <ion-select-option value=\"pitch\">Pitch</ion-select-option>\r\n                          <ion-select-option value=\"both\">Both</ion-select-option>\r\n                      </ion-select>\r\n                  </ion-item>\r\n              </ion-col>\r\n              <ion-col size=\"6\" *ngIf='(showValue==\"ground\" || showValue==\"both\")'>\r\n                      <ion-item class=\"ion-no-padding\">\r\n                          <ion-label position=\"floating\" style=\"font-size: 13px;\">Tilt for ground mount*</ion-label>\r\n                          <ion-input class=\"form_input\"  type=\"tel\" formControlName=\"tiltgroundmount\" maxlength=\"5\"></ion-input>\r\n                      </ion-item>\r\n                      <div style=\"height: 5px;\">\r\n                          <div *ngIf=\"desginForm.get('tiltgroundmount').dirty && desginForm.get('tiltgroundmount').hasError('pattern')\">\r\n                              <span class=\"error\">{{\"It should be a valid number\"}}</span>\r\n                          </div>\r\n                          <div *ngIf=\"desginForm.get('tiltgroundmount').hasError('pattern') && desginForm.get('tiltgroundmount').dirty\">\r\n                              <span class=\"error\">{{tiltforgroundError}}</span>\r\n                          </div>\r\n                      </div>\r\n              </ion-col>\r\n          </ion-row>\r\n              <!--upload box-->\r\n  <ion-row *ngIf='uploadbox==\"true\"'>\r\n      <ion-col size=\"12\">\r\n\r\n          <ng-container>\r\n              <ion-item class=\"ion-no-padding\" (click)=\"f.click()\">\r\n                  <ion-label position=\"floating\">Architectural design*</ion-label>\r\n                      <input type=\"file\" #f class=\"form_input\"  (change)=\"files($event)\" style=\"margin-top: 12px;\" formControlName=\"architecturaldesign\" multiple>\r\n                      <ion-icon name=\"attach-outline\" slot=\"end\" style=\"margin-top:21px\"></ion-icon>\r\n                  </ion-item>\r\n                  <div *ngFor=\"let file of archFiles;let i = index\">\r\n                      <ion-item>\r\n                          <ion-col size=\"11\">\r\n                              {{file.name}}\r\n                          </ion-col>\r\n                          <ion-col size=\"1\" (click)=\"removeArc(i)\">x</ion-col>\r\n                      </ion-item>\r\n                  </div>\r\n                  </ng-container>\r\n          <!-- <ion-item class=\"ion-no-padding\"> -->\r\n              <!-- <ion-input class=\"form_input\" type=\"file\" placeholder=\"Upload Architectural design\"\r\n                      (ionChange)=\"files($event)\"  multiple></ion-input> -->\r\n                      <!-- <ion-label position=\"floating\">architectural design*</ion-label>\r\n                      <p style=\"margin-top: 10px;\" *ngFor=\"let architecture of architecturalData;let i=index\"><ion-row style=\"display:flex;align-items: flex-end;\" ><ion-col style=\"display:flex;align-items: flex-end;\"><ion-label style=\"-webkit-text-stroke: thin;\" *ngIf=\"architecture.value!=''\" position=\"floating\">{{architecture?.name}}</ion-label></ion-col>\r\n                          <ion-col style=\"display:flex;align-items: flex-end;\"> <ion-icon name=\"close-circle-outline\" *ngIf=\"architecture.name!=''\" (click)=\"remove(architecture,architecture?.id)\"></ion-icon></ion-col></ion-row></p>\r\n                      <ion-input type=\"file\"  class=\"form_input\"  (change)=\"files($event)\" style=\"margin-top: 12px;\" formControlName=\"architecturaldesign\" placeholder=\"Upload Architectural design\" multiple></ion-input>\r\n                  </ion-item> -->\r\n\r\n              </ion-col>\r\n                           <!-- <ion-item> -->\r\n                           <!-- <ion-label position=\"floating\">architectural design*</ion-label> -->\r\n                                  <ng-container *ngIf=\"design && design.architecturaldesign !==null\">\r\n                                      <div *ngFor=\"let arc of design.architecturaldesign; let i = index\">\r\n                                         <ion-item>\r\n                                             <ion-col size=\"11\"> {{arc.name}}{{arc.ext}}</ion-col>\r\n                                             <ion-col size=\"1\" (click)=\"remove(arc, i)\">x</ion-col>\r\n\r\n\r\n                                         </ion-item>\r\n\r\n\r\n                                     </div>\r\n                                  </ng-container>\r\n                           <!-- </ion-item> -->\r\n\r\n  </ion-row>\r\n\r\n              <ion-row>\r\n                  <ion-col size=\"12\">\r\n                      <ng-container>\r\n                      <ion-item class=\"ion-no-padding\" (click)=\"d.click()\">\r\n                      <ion-label position=\"floating\">Attachments</ion-label>\r\n\r\n\r\n                                  <input #d type=\"file\"  class=\"form_input\"  (change)=\"prelimfiles($event)\" style=\"margin-top: 12px;\" formArrayName=\"architecturaldesign\" multiple>\r\n                                  <ion-icon name=\"attach-outline\" slot=\"end\" style=\"margin-top:21px\"></ion-icon>\r\n                              </ion-item>\r\n                              <div *ngFor=\"let file of prelimFiles;let i = index\">\r\n                                  <ion-item>\r\n                                      <ion-col size=\"11\">\r\n                                          {{file.name}}\r\n                                      </ion-col>\r\n                                      <ion-col size=\"1\" (click)=\"removePrelim(i)\">x</ion-col>\r\n                                  </ion-item>\r\n                              </div>\r\n                              </ng-container>\r\n                      <!-- <ion-item class=\"ion-no-padding\"> -->\r\n                          <!-- <ion-input class=\"form_input\" type=\"file\" placeholder=\"Upload Architectural design\"\r\n                                  (ionChange)=\"files($event)\"  multiple></ion-input> -->\r\n                                  <!-- <ion-label position=\"floating\">architectural design*</ion-label>\r\n                                  <p style=\"margin-top: 10px;\" *ngFor=\"let architecture of architecturalData;let i=index\"><ion-row style=\"display:flex;align-items: flex-end;\" ><ion-col style=\"display:flex;align-items: flex-end;\"><ion-label style=\"-webkit-text-stroke: thin;\" *ngIf=\"architecture.value!=''\" position=\"floating\">{{architecture?.name}}</ion-label></ion-col>\r\n                                      <ion-col style=\"display:flex;align-items: flex-end;\"> <ion-icon name=\"close-circle-outline\" *ngIf=\"architecture.name!=''\" (click)=\"remove(architecture,architecture?.id)\"></ion-icon></ion-col></ion-row></p>\r\n                                  <ion-input type=\"file\"  class=\"form_input\"  (change)=\"files($event)\" style=\"margin-top: 12px;\" formControlName=\"architecturaldesign\" placeholder=\"Upload Architectural design\" multiple></ion-input>\r\n                              </ion-item> -->\r\n\r\n                          </ion-col>\r\n                                       <!-- <ion-item> -->\r\n                                       <!-- <ion-label position=\"floating\">architectural design*</ion-label> -->\r\n                                              <ng-container *ngIf=\"design && design.attachments !==null\">\r\n                                                  <div *ngFor=\"let arc of design.attachments;let i=index\">\r\n                                                     <ion-item>\r\n                                                         <ion-col size=\"11\"> {{arc.name}}{{arc.ext}}</ion-col>\r\n                                                         <ion-col size=\"1\" (click)=\"removeattachment(arc,i)\">x</ion-col>\r\n\r\n\r\n                                                     </ion-item>\r\n\r\n\r\n                                                 </div>\r\n                                              </ng-container>\r\n              </ion-row>\r\n\r\n          <ion-row class=\"ion-margin-top\">\r\n              <ion-label position=\"floating\">Comments</ion-label></ion-row>\r\n             <ion-row class=\"ion-margin-top\"> <ion-col size=\"12\" class=\"ion-no-padding\">\r\n                  <ion-textarea class=\"ion-no-margin ion-no-padding comment_box\" rows=\"3\"\r\n                                  formControlName=\"comments\"></ion-textarea>\r\n              </ion-col>\r\n          </ion-row>\r\n  <!--\r\n          <ion-row class=\"ion-margin-top\">\r\n              <ion-col>\r\n                  <ion-item class=\" ion-no-padding no-border\" lines=\"none\" style=\"padding: 30px 0px;\">\r\n                      <app-user-selector style=\"overflow:scroll;\" placeholder=\"assign\" [assignees]=\"listOfAssignees\"\r\n                                          formControlName=\"assignedto\"></app-user-selector>\r\n                  </ion-item>\r\n              </ion-col>\r\n          </ion-row> -->\r\n      </ion-grid>\r\n  </form>\r\n\r\n  </ion-content>\r\n");

/***/ }),

/***/ "A67w":
/*!*********************************************************************!*\
  !*** ./src/app/schedule/salesproposal/salesproposal.component.scss ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".user-image {\n  width: 50px;\n  height: 50px;\n  object-fit: cover;\n  border-radius: 50%;\n}\n\nion-range {\n  --bar-background: #CBCBCB;\n  --bar-background-active: #CBCBCB;\n  --knob-background: #3c78d8;\n  --knob-border-radius: 2px solid white;\n  --knob-size: 20px;\n  --knob-border-radius: 50%;\n  --pin-color: #E1E1E1;\n}\n\n.solar-data {\n  position: absolute;\n  margin-top: 50px;\n  width: 146px;\n  max-width: 150px;\n  z-index: 3;\n  margin-left: 0px;\n  max-height: 200px;\n  overflow: auto;\n}\n\n.solar-made {\n  position: absolute;\n  width: 172px;\n  max-width: 175px;\n  z-index: 3;\n  margin-left: 0px;\n  max-height: 200px;\n  overflow: auto;\n  margin-top: 2px;\n}\n\nion-label {\n  color: #6C6C6C !important;\n}\n\n.error {\n  color: #df3e3e;\n  font-size: 11px;\n}\n\n.select_div {\n  border-bottom: 1px solid #E1E1E1;\n}\n\nion-select {\n  max-width: 100% !important;\n  width: 100% !important;\n  padding-left: 0px !important;\n}\n\ninput[type=file] {\n  visibility: hidden;\n}\n\n.font {\n  font-size: 10px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFxzYWxlc3Byb3Bvc2FsLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksV0FBQTtFQUNBLFlBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0FBQ0o7O0FBRUU7RUFDRSx5QkFBQTtFQUNBLGdDQUFBO0VBQ0EsMEJBQUE7RUFDQSxxQ0FBQTtFQUNBLGlCQUFBO0VBQ0EseUJBQUE7RUFDQSxvQkFBQTtBQUNKOztBQUVFO0VBQ0Usa0JBQUE7RUFDQSxnQkFBQTtFQUNBLFlBQUE7RUFDQSxnQkFBQTtFQUNBLFVBQUE7RUFDQSxnQkFBQTtFQUNBLGlCQUFBO0VBQ0EsY0FBQTtBQUNKOztBQUVFO0VBQ0Usa0JBQUE7RUFDQSxZQUFBO0VBQ0EsZ0JBQUE7RUFDQSxVQUFBO0VBQ0EsZ0JBQUE7RUFDQSxpQkFBQTtFQUNBLGNBQUE7RUFDQSxlQUFBO0FBQ0o7O0FBRUU7RUFDRSx5QkFBQTtBQUNKOztBQUVFO0VBQ0UsY0FBQTtFQUNBLGVBQUE7QUFDSjs7QUFFRTtFQUNFLGdDQUFBO0FBQ0o7O0FBRUU7RUFDRSwwQkFBQTtFQUNBLHNCQUFBO0VBQ0EsNEJBQUE7QUFDSjs7QUFDRTtFQUNFLGtCQUFBO0FBRUo7O0FBQUU7RUFDRSxlQUFBO0FBR0oiLCJmaWxlIjoic2FsZXNwcm9wb3NhbC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi51c2VyLWltYWdlIHtcclxuICAgIHdpZHRoOiA1MHB4O1xyXG4gICAgaGVpZ2h0OiA1MHB4O1xyXG4gICAgb2JqZWN0LWZpdDogY292ZXI7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgfVxyXG4gIFxyXG4gIGlvbi1yYW5nZSB7XHJcbiAgICAtLWJhci1iYWNrZ3JvdW5kOiAjQ0JDQkNCO1xyXG4gICAgLS1iYXItYmFja2dyb3VuZC1hY3RpdmU6ICNDQkNCQ0I7XHJcbiAgICAtLWtub2ItYmFja2dyb3VuZDogIzNjNzhkODtcclxuICAgIC0ta25vYi1ib3JkZXItcmFkaXVzOiAycHggc29saWQgd2hpdGU7XHJcbiAgICAtLWtub2Itc2l6ZTogMjBweDtcclxuICAgIC0ta25vYi1ib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgICAtLXBpbi1jb2xvcjogI0UxRTFFMTtcclxuICB9XHJcbiAgXHJcbiAgLnNvbGFyLWRhdGEge1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgbWFyZ2luLXRvcDogNTBweDtcclxuICAgIHdpZHRoOiAxNDZweDtcclxuICAgIG1heC13aWR0aDogMTUwcHg7XHJcbiAgICB6LWluZGV4OiAzO1xyXG4gICAgbWFyZ2luLWxlZnQ6IDBweDtcclxuICAgIG1heC1oZWlnaHQ6IDIwMHB4O1xyXG4gICAgb3ZlcmZsb3c6IGF1dG87XHJcbiAgfVxyXG4gIFxyXG4gIC5zb2xhci1tYWRlIHtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHdpZHRoOiAxNzJweDtcclxuICAgIG1heC13aWR0aDogMTc1cHg7XHJcbiAgICB6LWluZGV4OiAzO1xyXG4gICAgbWFyZ2luLWxlZnQ6IDBweDtcclxuICAgIG1heC1oZWlnaHQ6IDIwMHB4O1xyXG4gICAgb3ZlcmZsb3c6IGF1dG87XHJcbiAgICBtYXJnaW4tdG9wOiAycHg7XHJcbiAgfVxyXG4gIFxyXG4gIGlvbi1sYWJlbCB7XHJcbiAgICBjb2xvcjogIzZDNkM2QyAhaW1wb3J0YW50O1xyXG4gIH1cclxuICBcclxuICAuZXJyb3Ige1xyXG4gICAgY29sb3I6IHJnYigyMjMsIDYyLCA2Mik7XHJcbiAgICBmb250LXNpemU6IDExcHg7XHJcbiAgfVxyXG4gIFxyXG4gIC5zZWxlY3RfZGl2IHtcclxuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjRTFFMUUxO1xyXG4gIH1cclxuICBcclxuICBpb24tc2VsZWN0e1xyXG4gICAgbWF4LXdpZHRoOiAxMDAlICFpbXBvcnRhbnQ7XHJcbiAgICB3aWR0aDogMTAwJSAhaW1wb3J0YW50O1xyXG4gICAgcGFkZGluZy1sZWZ0OiAwcHggIWltcG9ydGFudDtcclxuICB9XHJcbiAgaW5wdXRbdHlwZT1cImZpbGVcIl17XHJcbiAgICB2aXNpYmlsaXR5OmhpZGRlbjtcclxuICB9XHJcbiAgLmZvbnR7XHJcbiAgICBmb250LXNpemU6IDEwcHg7XHJcbiAgfVxyXG4gIFxyXG4gIFxyXG4gICJdfQ== */");

/***/ }),

/***/ "Fi72":
/*!*******************************************************!*\
  !*** ./src/app/schedule/design/design.component.scss ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".user-image {\n  width: 50px;\n  height: 50px;\n  object-fit: cover;\n  border-radius: 50%;\n}\n\nion-range {\n  --bar-background: #CBCBCB;\n  --bar-background-active: #CBCBCB;\n  --knob-background: #3c78d8;\n  --knob-border-radius: 2px solid white;\n  --knob-size: 20px;\n  --knob-border-radius: 50%;\n  --pin-color: #E1E1E1;\n}\n\n.solar-data {\n  position: absolute;\n  margin-top: 50px;\n  width: 146px;\n  max-width: 150px;\n  z-index: 3;\n  margin-left: 0px;\n  max-height: 200px;\n  overflow: auto;\n}\n\n.solar-made {\n  position: absolute;\n  width: 172px;\n  max-width: 175px;\n  z-index: 3;\n  margin-left: 0px;\n  max-height: 200px;\n  overflow: auto;\n  margin-top: 2px;\n}\n\nion-label {\n  color: #6C6C6C !important;\n}\n\n.error {\n  color: #df3e3e;\n  font-size: 11px;\n}\n\n.select_div {\n  border-bottom: 1px solid #E1E1E1;\n}\n\nion-select {\n  max-width: 100% !important;\n  width: 100% !important;\n  padding-left: 0px !important;\n}\n\ninput[type=file] {\n  visibility: hidden;\n}\n\n.font {\n  font-size: 10px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFxkZXNpZ24uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7QUFDRjs7QUFFQTtFQUNFLHlCQUFBO0VBQ0EsZ0NBQUE7RUFDQSwwQkFBQTtFQUNBLHFDQUFBO0VBQ0EsaUJBQUE7RUFDQSx5QkFBQTtFQUNBLG9CQUFBO0FBQ0Y7O0FBRUE7RUFDRSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsWUFBQTtFQUNBLGdCQUFBO0VBQ0EsVUFBQTtFQUNBLGdCQUFBO0VBQ0EsaUJBQUE7RUFDQSxjQUFBO0FBQ0Y7O0FBRUE7RUFDRSxrQkFBQTtFQUNBLFlBQUE7RUFDQSxnQkFBQTtFQUNBLFVBQUE7RUFDQSxnQkFBQTtFQUNBLGlCQUFBO0VBQ0EsY0FBQTtFQUNBLGVBQUE7QUFDRjs7QUFFQTtFQUNFLHlCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxjQUFBO0VBQ0EsZUFBQTtBQUNGOztBQUVBO0VBQ0UsZ0NBQUE7QUFDRjs7QUFFQTtFQUNFLDBCQUFBO0VBQ0Esc0JBQUE7RUFDQSw0QkFBQTtBQUNGOztBQUNBO0VBQ0Usa0JBQUE7QUFFRjs7QUFBQTtFQUNFLGVBQUE7QUFHRiIsImZpbGUiOiJkZXNpZ24uY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIudXNlci1pbWFnZSB7XHJcbiAgd2lkdGg6IDUwcHg7XHJcbiAgaGVpZ2h0OiA1MHB4O1xyXG4gIG9iamVjdC1maXQ6IGNvdmVyO1xyXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcclxufVxyXG5cclxuaW9uLXJhbmdlIHtcclxuICAtLWJhci1iYWNrZ3JvdW5kOiAjQ0JDQkNCO1xyXG4gIC0tYmFyLWJhY2tncm91bmQtYWN0aXZlOiAjQ0JDQkNCO1xyXG4gIC0ta25vYi1iYWNrZ3JvdW5kOiAjM2M3OGQ4O1xyXG4gIC0ta25vYi1ib3JkZXItcmFkaXVzOiAycHggc29saWQgd2hpdGU7XHJcbiAgLS1rbm9iLXNpemU6IDIwcHg7XHJcbiAgLS1rbm9iLWJvcmRlci1yYWRpdXM6IDUwJTtcclxuICAtLXBpbi1jb2xvcjogI0UxRTFFMTtcclxufVxyXG5cclxuLnNvbGFyLWRhdGEge1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICBtYXJnaW4tdG9wOiA1MHB4O1xyXG4gIHdpZHRoOiAxNDZweDtcclxuICBtYXgtd2lkdGg6IDE1MHB4O1xyXG4gIHotaW5kZXg6IDM7XHJcbiAgbWFyZ2luLWxlZnQ6IDBweDtcclxuICBtYXgtaGVpZ2h0OiAyMDBweDtcclxuICBvdmVyZmxvdzogYXV0bztcclxufVxyXG5cclxuLnNvbGFyLW1hZGUge1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICB3aWR0aDogMTcycHg7XHJcbiAgbWF4LXdpZHRoOiAxNzVweDtcclxuICB6LWluZGV4OiAzO1xyXG4gIG1hcmdpbi1sZWZ0OiAwcHg7XHJcbiAgbWF4LWhlaWdodDogMjAwcHg7XHJcbiAgb3ZlcmZsb3c6IGF1dG87XHJcbiAgbWFyZ2luLXRvcDogMnB4O1xyXG59XHJcblxyXG5pb24tbGFiZWwge1xyXG4gIGNvbG9yOiAjNkM2QzZDICFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbi5lcnJvciB7XHJcbiAgY29sb3I6IHJnYigyMjMsIDYyLCA2Mik7XHJcbiAgZm9udC1zaXplOiAxMXB4O1xyXG59XHJcblxyXG4uc2VsZWN0X2RpdiB7XHJcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNFMUUxRTE7XHJcbn1cclxuXHJcbmlvbi1zZWxlY3R7XHJcbiAgbWF4LXdpZHRoOiAxMDAlICFpbXBvcnRhbnQ7XHJcbiAgd2lkdGg6IDEwMCUgIWltcG9ydGFudDtcclxuICBwYWRkaW5nLWxlZnQ6IDBweCAhaW1wb3J0YW50O1xyXG59XHJcbmlucHV0W3R5cGU9XCJmaWxlXCJde1xyXG4gIHZpc2liaWxpdHk6aGlkZGVuO1xyXG59XHJcbi5mb250e1xyXG4gIGZvbnQtc2l6ZTogMTBweDtcclxufVxyXG5cclxuXHJcbiJdfQ== */");

/***/ }),

/***/ "L0xO":
/*!*********************************************!*\
  !*** ./src/app/schedule/schedule.module.ts ***!
  \*********************************************/
/*! exports provided: SchedulePageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SchedulePageModule", function() { return SchedulePageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _schedule_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./schedule-routing.module */ "R8YS");
/* harmony import */ var _schedule_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./schedule.page */ "Nnbm");
/* harmony import */ var _survey_survey_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./survey/survey.component */ "1dhX");
/* harmony import */ var _design_design_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./design/design.component */ "5mh3");
/* harmony import */ var _utilities_utilities_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../utilities/utilities.module */ "egEE");
/* harmony import */ var _ionic_native_diagnostic_ngx__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ionic-native/diagnostic/ngx */ "mtRb");
/* harmony import */ var _ionic_native_native_geocoder_ngx__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ionic-native/native-geocoder/ngx */ "h+qT");
/* harmony import */ var _number_directive__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./number.directive */ "gQGA");
/* harmony import */ var _ionic_native_Camera_ngx__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @ionic-native/Camera/ngx */ "a/9d");
/* harmony import */ var _ionic_native_file_ngx__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @ionic-native/file/ngx */ "FAH8");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../shared/shared.module */ "PCNd");
/* harmony import */ var _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/autocomplete */ "/1cH");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _salesproposal_salesproposal_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./salesproposal/salesproposal.component */ "nVRx");




















let SchedulePageModule = class SchedulePageModule {
};
SchedulePageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _schedule_routing_module__WEBPACK_IMPORTED_MODULE_5__["SchedulePageRoutingModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
            _utilities_utilities_module__WEBPACK_IMPORTED_MODULE_9__["UtilitiesModule"],
            _shared_shared_module__WEBPACK_IMPORTED_MODULE_15__["SharedModule"],
            _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_16__["MatAutocompleteModule"],
            _angular_material_form_field__WEBPACK_IMPORTED_MODULE_17__["MatFormFieldModule"],
            _angular_material_input__WEBPACK_IMPORTED_MODULE_18__["MatInputModule"]
        ],
        declarations: [
            _schedule_page__WEBPACK_IMPORTED_MODULE_6__["SchedulePage"],
            _survey_survey_component__WEBPACK_IMPORTED_MODULE_7__["SurveyComponent"],
            _design_design_component__WEBPACK_IMPORTED_MODULE_8__["DesignComponent"],
            _number_directive__WEBPACK_IMPORTED_MODULE_12__["NumberOnlyDirective"],
            _salesproposal_salesproposal_component__WEBPACK_IMPORTED_MODULE_19__["SalesproposalComponent"]
        ],
        providers: [
            _ionic_native_diagnostic_ngx__WEBPACK_IMPORTED_MODULE_10__["Diagnostic"],
            _ionic_native_native_geocoder_ngx__WEBPACK_IMPORTED_MODULE_11__["NativeGeocoder"],
            _ionic_native_Camera_ngx__WEBPACK_IMPORTED_MODULE_13__["Camera"],
            _ionic_native_file_ngx__WEBPACK_IMPORTED_MODULE_14__["File"]
        ]
    })
], SchedulePageModule);



/***/ }),

/***/ "Nnbm":
/*!*******************************************!*\
  !*** ./src/app/schedule/schedule.page.ts ***!
  \*******************************************/
/*! exports provided: SchedulePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SchedulePage", function() { return SchedulePage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_schedule_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./schedule.page.html */ "sZ5U");
/* harmony import */ var _schedule_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./schedule.page.scss */ "3aXv");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _ionic_native_native_geocoder_ngx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic-native/native-geocoder/ngx */ "h+qT");
/* harmony import */ var _ionic_native_geolocation_ngx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic-native/geolocation/ngx */ "Bfh1");
/* harmony import */ var _storage_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../storage.service */ "qkCY");
/* harmony import */ var _utilities_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utilities.service */ "oTnF");
/* harmony import */ var _ionic_native_diagnostic_ngx__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic-native/diagnostic/ngx */ "mtRb");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _model_constants__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../model/constants */ "Kp5Z");
/* harmony import */ var _networkdetect_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../networkdetect.service */ "UZ2B");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/common */ "ofXK");














let SchedulePage = class SchedulePage {
    constructor(navController, nativeGeocoder, diagnostic, geolocation, platform, storage, utilities, router, alertController, toastController, network, location) {
        this.navController = navController;
        this.nativeGeocoder = nativeGeocoder;
        this.diagnostic = diagnostic;
        this.geolocation = geolocation;
        this.platform = platform;
        this.storage = storage;
        this.utilities = utilities;
        this.router = router;
        this.alertController = alertController;
        this.toastController = toastController;
        this.network = network;
        this.location = location;
        this.address = '';
        this.currentTab = 'design';
        this.tabsDisabled = false;
        // Geocoder configuration
        this.geoEncoderOptions = {
            useLocale: true,
            maxResults: 5
        };
        this.locationAllowed = false;
        this.gpsActive = false;
        const url = this.router.url;
        const splittedUrl = url.split('/');
        console.log(splittedUrl);
        this.tabsDisabled = splittedUrl.length === 4;
        this.currentTab = splittedUrl[2];
    }
    ionViewDidEnter() {
        this.deactivateNetworkSwitch = this.network.networkSwitch.subscribe(data => {
            this.netSwitch = data;
            console.log(this.netSwitch);
        });
    }
    ngOnInit() {
        this.network.networkDisconnect();
        this.network.networkConnect();
        this.userdata = this.storage.getUser();
        this.requestLocationPermission();
        if (this.tabsDisabled) {
            this.subscription = this.utilities.getStaticAddress().subscribe((address) => {
                this.address = address;
                this.storage.setData(this.address);
            });
        }
        else {
            // await this.getGeoLocation();
            this.subscription = this.utilities.getAddressObservable().subscribe((address) => {
                console.log(address);
                this.address = address.address;
                this.storage.setData(this.address);
            });
        }
        this.designs = this.utilities.getdesignDetails();
        //console.log(this.designs.status);
    }
    goBack() {
        this.navController.pop();
        // this.location.back();
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.utilities.setStaticAddress('');
        this.deactivateNetworkSwitch.unsubscribe();
    }
    segmentChanged(event) {
        console.log(event);
        this.currentTab = event.detail.value;
        this.tabs.select(event.detail.value);
    }
    getGeoLocation() {
        // this.utilities.showLoading('Getting Location').then(()=>{
        // setTimeout(()=>{
        //   this.utilities.hideLoading();
        // },1000)
        this.geolocation.getCurrentPosition().then((resp) => {
            this.utilities.hideLoading();
            // .then(()=>{
            console.log('resp', resp);
            this.getGeoEncoder(resp.coords.latitude, resp.coords.longitude);
            this.utilities.hideLoading();
            // });
        }, err => {
            this.utilities.hideLoading();
            this.utilities.errorSnackBar('Unable to get location');
        }).catch((error) => {
            this.utilities.hideLoading();
            this.utilities.errorSnackBar('Unable to get location');
            console.log('Error getting location', error);
            this.showNoLocation();
        });
        // },err=>{
        //   this.utilities.hideLoading();
        // });
    }
    showNoLocation() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const toast = yield this.toastController.create({
                header: 'Error',
                message: 'Unable to get location',
                cssClass: 'my-custom-class',
                buttons: [
                    {
                        text: 'OK',
                        handler: () => {
                            this.goBack();
                        }
                    }
                ]
            });
            toast.present();
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
                            this.goBack();
                        }
                    }
                ]
            });
            toast.present();
        });
    }
    getGeoEncoder(latitude, longitude) {
        // this.utilities.hideLoading().then((success) => {
        this.utilities.showLoading('Getting Location').then(() => {
            this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geoEncoderOptions)
                .then((result) => {
                console.log(result);
                this.utilities.hideLoading();
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
                this.utilities.hideLoading();
                alert('Error getting location' + JSON.stringify(error));
            });
        });
        // }, (error) => {
        // }
        // );
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
    requestLocationPermission() {
        this.diagnostic.requestLocationAuthorization(this.diagnostic.locationAuthorizationMode.WHEN_IN_USE).then((mode) => {
            console.log(mode);
            switch (mode) {
                case this.diagnostic.permissionStatus.NOT_REQUESTED:
                    this.goBack();
                    break;
                case this.diagnostic.permissionStatus.DENIED_ALWAYS:
                    this.showLocationDenied();
                    break;
                case this.diagnostic.permissionStatus.DENIED_ONCE:
                    this.goBack();
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
            // this.goBack();
        });
        // if (this.platform.is('ios')) {
        //   if (this.storage.isLocationAllowedOnIOS()) {
        //     this.fetchLocation();
        //   } else {
        //     if (!this.storage.isLocationCheckedOnIOS()) {
        //       this.storage.setLocationCheckedOnIOS(true);
        //       this.diagnostic.requestLocationAuthorization(this.diagnostic.locationAuthorizationMode.WHEN_IN_USE).then((mode) => {
        //         switch (mode) {
        //           case this.diagnostic.permissionStatus.NOT_REQUESTED:
        //             this.storage.setLocationAllowedOnIOS(false);
        //             break;
        //           case this.diagnostic.permissionStatus.DENIED_ALWAYS:
        //             this.storage.setLocationAllowedOnIOS(false);
        //             break;
        //           case this.diagnostic.permissionStatus.GRANTED:
        //             this.storage.setLocationAllowedOnIOS(true);
        //             this.fetchLocation();
        //             break;
        //           case this.diagnostic.permissionStatus.GRANTED_WHEN_IN_USE:
        //             this.storage.setLocationAllowedOnIOS(true);
        //             this.fetchLocation();
        //             break;
        //           case 'authorized_when_in_use':
        //             this.storage.setLocationAllowedOnIOS(true);
        //             this.fetchLocation();
        //             break;
        //         }
        //       }, (rejection) => {
        //         this.locationAllowed = false;
        //         this.storage.setLocationAllowedOnIOS(false);
        //       });
        //     }
        //   }
        // } else {
        //
        // }
    }
    fetchLocation() {
        if (this.platform.is('ios')) {
            this.getGeoLocation();
        }
        else {
            this.diagnostic.isGpsLocationEnabled().then((status) => {
                if (status === true) {
                    this.getGeoLocation();
                    // this.utilities.showLoading('Getting Location').then(() => {
                    // });
                }
                else {
                    this.askToChangeSettings();
                }
            });
        }
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
                            this.goBack();
                        }
                    }
                ]
            });
            toast.present();
        });
    }
    changeLocationSettings() {
        this.diagnostic.switchToLocationSettings();
        this.diagnostic.registerLocationStateChangeHandler((state) => {
            if ((this.platform.is('android') && state !== this.diagnostic.locationMode.LOCATION_OFF) ||
                (this.platform.is('ios')) && (state === this.diagnostic.permissionStatus.GRANTED ||
                    state === this.diagnostic.permissionStatus.GRANTED_WHEN_IN_USE)) {
                this.checkLocationAccess();
            }
        });
    }
    checkLocationAccess() {
        this.diagnostic.isLocationAuthorized().then((success) => {
            this.fetchLocation();
        }, (error) => {
            this.utilities.showSnackBar('GPS Not Allowed');
        });
    }
    goTo() {
        this.router.navigate(['/mappage']);
    }
    saveDesignForm() {
        console.log('posting value');
        console.log(this.router.url);
        if (this.router.url == '/schedule/design') {
            this.utilities.setScheduleFormEvent(_model_constants__WEBPACK_IMPORTED_MODULE_11__["ScheduleFormEvent"].SAVE_DESIGN_FORM);
        }
        else {
            this.utilities.setScheduleFormEvent(_model_constants__WEBPACK_IMPORTED_MODULE_11__["ScheduleFormEvent"].SAVE_SALES_FORM);
        }
    }
    saveSurveyForm() {
        console.log('posting value');
        this.utilities.setScheduleFormEvent(_model_constants__WEBPACK_IMPORTED_MODULE_11__["ScheduleFormEvent"].SAVE_SURVEY_FORM);
    }
    startSurvey() {
        console.log('posting value');
        this.utilities.setScheduleFormEvent(_model_constants__WEBPACK_IMPORTED_MODULE_11__["ScheduleFormEvent"].START_SURVEY);
    }
    sendDesignForm() {
        if (this.router.url == '/schedule/design') {
            this.utilities.setScheduleFormEvent(_model_constants__WEBPACK_IMPORTED_MODULE_11__["ScheduleFormEvent"].SEND_DESIGN_FORM);
        }
        else {
            this.utilities.setScheduleFormEvent(_model_constants__WEBPACK_IMPORTED_MODULE_11__["ScheduleFormEvent"].SEND_SALES_FORM);
        }
    }
};
SchedulePage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["NavController"] },
    { type: _ionic_native_native_geocoder_ngx__WEBPACK_IMPORTED_MODULE_5__["NativeGeocoder"] },
    { type: _ionic_native_diagnostic_ngx__WEBPACK_IMPORTED_MODULE_9__["Diagnostic"] },
    { type: _ionic_native_geolocation_ngx__WEBPACK_IMPORTED_MODULE_6__["Geolocation"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["Platform"] },
    { type: _storage_service__WEBPACK_IMPORTED_MODULE_7__["StorageService"] },
    { type: _utilities_service__WEBPACK_IMPORTED_MODULE_8__["UtilitiesService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_10__["Router"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["AlertController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["ToastController"] },
    { type: _networkdetect_service__WEBPACK_IMPORTED_MODULE_12__["NetworkdetectService"] },
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_13__["Location"] }
];
SchedulePage.propDecorators = {
    tabs: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"], args: ['tabs', { static: true },] }]
};
SchedulePage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-schedule',
        template: _raw_loader_schedule_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_schedule_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], SchedulePage);



/***/ }),

/***/ "R8YS":
/*!*****************************************************!*\
  !*** ./src/app/schedule/schedule-routing.module.ts ***!
  \*****************************************************/
/*! exports provided: SchedulePageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SchedulePageRoutingModule", function() { return SchedulePageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _schedule_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./schedule.page */ "Nnbm");
/* harmony import */ var _design_design_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./design/design.component */ "5mh3");
/* harmony import */ var _survey_survey_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./survey/survey.component */ "1dhX");
/* harmony import */ var _ionic_native_geolocation_ngx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic-native/geolocation/ngx */ "Bfh1");
/* harmony import */ var _salesproposal_salesproposal_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./salesproposal/salesproposal.component */ "nVRx");








const routes = [
    {
        path: '',
        component: _schedule_page__WEBPACK_IMPORTED_MODULE_3__["SchedulePage"],
        children: [
            {
                path: 'design/:id',
                component: _design_design_component__WEBPACK_IMPORTED_MODULE_4__["DesignComponent"]
            },
            {
                path: 'design',
                component: _design_design_component__WEBPACK_IMPORTED_MODULE_4__["DesignComponent"]
            },
            {
                path: 'survey/:id',
                component: _survey_survey_component__WEBPACK_IMPORTED_MODULE_5__["SurveyComponent"]
            },
            {
                path: 'survey',
                component: _survey_survey_component__WEBPACK_IMPORTED_MODULE_5__["SurveyComponent"]
            },
            {
                path: 'salesproposal',
                component: _salesproposal_salesproposal_component__WEBPACK_IMPORTED_MODULE_7__["SalesproposalComponent"]
            },
            {
                path: 'salesproposal/:id',
                component: _salesproposal_salesproposal_component__WEBPACK_IMPORTED_MODULE_7__["SalesproposalComponent"]
            },
            {
                path: '',
                redirectTo: 'design',
                pathMatch: 'full'
            }
        ]
    }
];
let SchedulePageRoutingModule = class SchedulePageRoutingModule {
};
SchedulePageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
        providers: [
            _ionic_native_geolocation_ngx__WEBPACK_IMPORTED_MODULE_6__["Geolocation"]
        ]
    })
], SchedulePageRoutingModule);



/***/ }),

/***/ "cDDn":
/*!*********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/schedule/design/design.component.html ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-content class=\"ion-padding-start ion-padding-end ion-padding-bottom\" style=\"height:650px\">\r\n<form [formGroup]=\"desginForm\" novalidate style=\"overflow:scroll\">\r\n    <ion-grid style=\"position: relative;\">\r\n        <!-- <ion-row *ngIf=\"address !== ''\">\r\n            <ion-col>\r\n                {{address}}\r\n            </ion-col>\r\n        \r\n        </ion-row>\r\n        <ion-row *ngIf=\"address == ''\">\r\n            <ion-col>\r\n            Address not found.\r\n            </ion-col>\r\n        \r\n        </ion-row> -->\r\n        <ion-row class=\"ion-align-items-center ion-justify-content-center\" *ngIf=\"userdata.role.type=='wattmonkadmins' || userdata.role.type=='superadmin'\">\r\n       <ion-col>\r\n            <ion-item class=\"ion-no-padding\">\r\n                           \r\n                            <ion-label position=\"floating\">Company Name</ion-label>\r\n                            <ion-select  (ionChange)=\"onCompanyChanged($event)\" class=\"form_input select_div\"\r\n                                        ok-text=\"\" cancel-text=\"\"\r\n                                        formControlName=\"companyname\" interface=\"popover\" >\r\n                                <ion-select-option *ngFor=\"let company of getCompanies\" [value]=\"company\">{{company.companyname}}</ion-select-option>\r\n                               \r\n                            </ion-select>\r\n                        </ion-item>\r\n                        <!-- <mat-form-field style=\"width: 100%; height: 45px;\" class=\"ion-no-padding\">\r\n                            <mat-label style=\"font-size: smaller;color: #6C6C6C;\">Company Name</mat-label>\r\n                            <input [(ngModel)]=\"proxyValue\" type=\"text\" class=\"form_input font-size\" matInput [matAutocomplete]=\"auto11\" formControlName=\"companyname\">\r\n                            <mat-autocomplete #auto11=\"matAutocomplete\" (optionSelected)=\"onCompanyChanged($event)\">\r\n                              <mat-option *ngFor=\"let company of filteredCompanies | async\" [value]=\"company\"\r\n                              class=\"font\">{{company.companyname}}</mat-option>\r\n                            </mat-autocomplete>\r\n                          </mat-form-field>\r\n                      <div style=\"height: 5px;\">\r\n                          <div *ngIf=\"desginForm.get('companyname').hasError('pattern') && desginForm.get('companyname').dirty\">\r\n                              <span class=\"error\">{{companyError}}</span>\r\n                          </div>\r\n                      </div> -->\r\n                    </ion-col>\r\n            <!-- <ion-col size=\"12\">\r\n                <mat-form-field style=\"width: 100%; height: 45px;\" class=\"ion-no-padding\">\r\n                    <mat-label style=\"font-size: smaller;color: #6C6C6C;\">Company Name</mat-label>\r\n                    <input [(ngModel)]=\"proxyValue\" type=\"text\" class=\"form_input font-size\" matInput [matAutocomplete]=\"auto11\" formControlName=\"companyname\">\r\n                    <mat-autocomplete #auto11=\"matAutocomplete\" (optionSelected)=\"onCompanyChanged($event)\">\r\n                      <mat-option *ngFor=\"let company of filteredCompanies | async\" [value]=\"company\"\r\n                      class=\"font\">{{company.companyname}}</mat-option>\r\n                    </mat-autocomplete>\r\n                  </mat-form-field>\r\n              <div style=\"height: 5px;\">\r\n                  <div *ngIf=\"desginForm.get('companyname').hasError('pattern') && desginForm.get('companyname').dirty\">\r\n                      <span class=\"error\">{{companyError}}</span>\r\n                  </div>\r\n              </div>\r\n            </ion-col> -->\r\n            \r\n          </ion-row >\r\n        <ion-row >\r\n            <ion-col>\r\n                <ion-item class=\"ion-no-padding\">\r\n                    <ion-label position=\"floating\">name*</ion-label>\r\n                    <ion-input type=\"text\" class=\"form_input\" autocapitalize=\"words\"\r\n                                formControlName=\"name\"></ion-input>\r\n                </ion-item>\r\n                <div style=\"height: 5px;\">\r\n                    <div *ngIf=\"desginForm.get('name').hasError('pattern') && desginForm.get('name').dirty\">\r\n                        <span class=\"error\">{{nameError}}</span>\r\n                    </div>\r\n                    <div *ngIf=\"desginForm.get('name').value === '' && desginForm.get('name').dirty\">\r\n                        <span class=\"error\">{{fieldRequired}}</span>\r\n                    </div>\r\n                </div>\r\n            </ion-col>\r\n        </ion-row>\r\n        <ion-row class=\"ion-align-items-center ion-justify-content-center\">\r\n            <ion-col>\r\n                <ion-item class=\"ion-no-padding\">\r\n                    <ion-label position=\"floating\">email*</ion-label>\r\n                    <ion-input class=\"form_input\" type=\"email\" autocapitalize=\"none\" autocomplete=\"off\"\r\n                                formControlName=\"email\" [disabled]=\"fieldDisabled\"></ion-input>\r\n                </ion-item>\r\n                <div style=\"height: 5px;\">\r\n                    <div *ngIf=\"desginForm.get('email').hasError('pattern') && desginForm.get('email').dirty\">\r\n                        <span class=\"error\">{{emailError}}</span>\r\n                    </div>\r\n                    <div *ngIf=\"desginForm.get('email').value === '' && desginForm.get('email').dirty\">\r\n                        <span class=\"error\">{{fieldRequired}}</span>\r\n                    </div>\r\n                </div>\r\n            </ion-col>\r\n        </ion-row>\r\n        <ion-row class=\"ion-align-items-center ion-justify-content-center\">\r\n            <ion-col>\r\n                <ion-item class=\"ion-no-padding\">\r\n                    <ion-label position=\"floating\">annual units (Kwh)*</ion-label>\r\n                    <ion-input class=\"form_input\"  type=\"tel\" (ionInput)=\"numberfield($event)\"\r\n                                formControlName=\"monthlybill\" maxLength=\"5\"></ion-input>\r\n                </ion-item>\r\n                <div style=\"height: 5px;\">\r\n                    <div *ngIf=\"desginForm.get('monthlybill').dirty && desginForm.get('monthlybill').hasError('pattern')\">\r\n                        <span class=\"error\">{{\"Annual units should be a valid number\"}}</span>\r\n                    </div>\r\n                    <!-- <div *ngIf=\"desginForm.get('monthlybill').hasError('pattern') && desginForm.get('monthlybill').dirty\">\r\n                        <span class=\"error\">{{annualunitError}}</span>\r\n                    </div> -->\r\n                </div>\r\n            </ion-col>\r\n        </ion-row>\r\n\r\n        <!-- Address -->\r\n        <ion-row>\r\n            <ion-col>\r\n              <ion-item class=\"ion-no-padding\">\r\n                <ion-label position=\"floating\" class=\"label\">Address*</ion-label>\r\n                <ion-input type=\"text\" class=\"form_input\" autocapitalize=\"words\"\r\n                            formControlName=\"address\" autocomplete=\"off\"  (ionChange)=\"updateSearchResults($event)\"\r\n                            (ionClear)=\"onCancel()\" debounce=\"300\"\r\n                            (ionFocus)=\"forAutoComplete($event)\" (ionBlur)=\"onBlur()\"></ion-input>\r\n            </ion-item>\r\n            <!-- <ion-item class=\"ion-no-padding\">\r\n              <ion-label position=\"floating\" class=\"label\">Shipping Address*</ion-label>\r\n              <ion-input type=\"text\" class=\"form_input\" autocapitalize=\"words\"\r\n                          formControlName=\"shippingaddress\" autocomplete=\"off\"></ion-input>\r\n          </ion-item> -->\r\n            <!-- <ion-list *ngIf=\"autocompleteItems.length > 0 && autoCompleteOff\"> -->\r\n                <ion-list>\r\n              <ion-item *ngFor=\"let item of autocompleteItems\" tappable (click)=\"selectSearchResult(item)\">\r\n                  <ion-label>\r\n                      {{ item.description }}\r\n                  </ion-label>\r\n              </ion-item>\r\n          </ion-list>\r\n          <div style=\"height: 5px;\">\r\n            <div *ngIf=\"desginForm.get('address').hasError('pattern') && desginForm.get('address').dirty\">\r\n                <span class=\"error\">{{addressError}}</span>\r\n            </div>\r\n            <div *ngIf=\"desginForm.get('address').value === '' && desginForm.get('address').dirty\">\r\n                <span class=\"error\">{{fieldRequired}}</span>\r\n            </div>\r\n        </div>\r\n        \r\n        \r\n          <!-- <ion-item *ngIf=\"autocompleteItems.length === 0\" lines=\"none\">\r\n              <ion-label class=\"ion-text-center\">\r\n                  Search for address\r\n              </ion-label>\r\n          </ion-item> -->\r\n            </ion-col>\r\n          </ion-row>\r\n\r\n        <!-- <ion-row class=\"ion-margin-top\">\r\n            <ion-col>\r\n                <ion-range [min]=\"minRange\" [max]=\"maxRange\" formControlName=\"monthlybill\" mode=\"ios\" pin=\"true\"\r\n                            class=\"ion-no-padding\">\r\n                    <ion-label slot=\"start\">{{minRange | currency :'USD':'symbol':'1.0-0'}}</ion-label>\r\n                    <ion-label slot=\"end\">{{maxRange | currency :'USD':'symbol':'1.0-0'  }} <span style=\"color:red\">*</span></ion-label>\r\n                    \r\n                </ion-range>\r\n                \r\n            </ion-col>\r\n        </ion-row> -->\r\n\r\n        <ion-row>\r\n            <ion-col size=\"6\">\r\n                <!-- <ion-label position=\"floating\">module make*</ion-label> -->\r\n                <app-auto-complete #myinput style=\"font-size: 14px;\" [dataList]=\"listOfSolarMake\"\r\n              formControlName=\"solarmake\"><ion-label position=\"floating\" >Module make*</ion-label></app-auto-complete>\r\n\r\n            </ion-col>\r\n            <ion-col size=\"6\">\r\n                <!-- <ion-label position=\"floating\">module model*</ion-label> -->\r\n                <app-auto-complete style=\"font-size: 14px;\"  [dataList]=\"listOfSolarMade\" \r\n                                    formControlName=\"solarmodel\" ><ion-label position=\"floating\" >Module model*</ion-label></app-auto-complete>\r\n\r\n            </ion-col>\r\n        </ion-row>\r\n\r\n        <ion-row>\r\n            <ion-col size=\"6\">\r\n                <!-- <ion-label position=\"floating\">inverter make*</ion-label> -->\r\n                <app-auto-complete style=\"font-size: 12px;\" [dataList]=\"listOfInverterMake\" \r\n                                    formControlName=\"invertermake\"><ion-label position=\"floating\" >Inverter make*</ion-label></app-auto-complete>\r\n            </ion-col>\r\n            <ion-col size=\"6\">\r\n                <!-- <ion-label position=\"floating\">invertor model*</ion-label> -->\r\n                <app-auto-complete style=\"font-size: 10px;\" [dataList]=\"listOfInverterMade\" \r\n                                    formControlName=\"invertermodel\" ><ion-label position=\"floating\" >Inverter model*</ion-label></app-auto-complete>\r\n            </ion-col>\r\n        </ion-row>\r\n\r\n        <ion-row class=\"ion-align-items-center ion-justify-content-center\">\r\n            <ion-col size=\"6\">\r\n                <ion-item class=\"ion-no-padding\">\r\n                    <ion-label style=\"display: none;\">project type*</ion-label>\r\n                    <ion-label position=\"floating\">Project type*</ion-label>\r\n                    <!-- <ion-label style=\"display: none;\">Project Type</ion-label> -->\r\n                    <!-- <ion-label position=\"floating\">project type</ion-label> -->\r\n                    <ion-select class=\"form_input\" ok-text=\"\" \r\n                                cancel-text=\"\"\r\n                                formControlName=\"projecttype\" interface=\"popover\">\r\n                        <ion-select-option value=\"residential\">Residential</ion-select-option>\r\n                        <ion-select-option value=\"commercial\">Commercial</ion-select-option>\r\n                    </ion-select>\r\n                </ion-item>\r\n\r\n            </ion-col>\r\n        \r\n            <!-- <ion-col size=\"6\">\r\n                <ion-item class=\"ion-no-padding\">\r\n                    <ion-label style=\"display: none;\">Job Type</ion-label>\r\n                    <ion-select class=\"form_input select_div\" placeholder=\"job type\"\r\n                                ok-text=\"\"\r\n                                cancel-text=\"\"\r\n                                formControlName=\"jobtype\" interface=\"popover\">\r\n                        <ion-select-option value=\"pvbattery\">PV+Battery</ion-select-option>\r\n                        <ion-select-option value=\"battery\">Battery</ion-select-option>\r\n                        <ion-select-option value=\"pv\">PV</ion-select-option>\r\n                    </ion-select>\r\n                </ion-item>\r\n            </ion-col> -->\r\n            <ion-col size=\"6\">\r\n                <ion-item class=\"ion-no-padding\">\r\n                    <ion-label position=\"floating\">New Construction*</ion-label>\r\n                    \r\n                    <!-- <ion-label style=\"display: none;\">New construction</ion-label> -->\r\n                    <!-- <ion-label position=\"floating\">new construction</ion-label> -->\r\n                    <ion-select  (ionChange)=\"showUpload($event)\" class=\"form_input select_div\" \r\n                                    ok-text=\"\"\r\n                                cancel-text=\"\"\r\n                                formControlName=\"newconstruction\" interface=\"popover\" value=\"false\"  >\r\n                        <ion-select-option  value=\"true\">Yes</ion-select-option>\r\n                        <ion-select-option  value=\"false\">No</ion-select-option>\r\n                    </ion-select>\r\n                </ion-item>\r\n            </ion-col>\r\n        </ion-row>\r\n\r\n        <ion-row class=\"ion-align-items-center ion-justify-content-center\">\r\n        \r\n            <ion-col size=\"12\">\r\n                <ion-item class=\"ion-no-padding\">\r\n                    <ion-label style=\"display: none;\">Mounting Type*</ion-label>\r\n                    <ion-label position=\"floating\">Mounting Type*</ion-label>\r\n                    <!-- <ion-label position=\"floating\">mounting type</ion-label> -->\r\n                    <ion-select class=\"form_input select_div\" (ionChange)=\"eventcheck($event)\" \r\n                                ok-text=\"\" cancel-text=\"\"\r\n                                formControlName=\"mountingtype\" interface=\"popover\">\r\n                        <ion-select-option value=\"roof\">Roof</ion-select-option>\r\n                        <ion-select-option value=\"ground\">Ground</ion-select-option>\r\n                        <ion-select-option value=\"both\">Both</ion-select-option>\r\n                    </ion-select>\r\n                </ion-item>\r\n            </ion-col>\r\n        </ion-row>\r\n        \r\n        <!-- condition base roof type-->\r\n        <ion-row>\r\n            <ion-col size=\"6\" *ngIf='(showValue==\"roof\" ||showValue== \"both\")'>\r\n                <ion-item class=\"ion-no-padding\">\r\n                    <ion-label style=\"display: none;\">Roof Type</ion-label>\r\n                    <ion-label position=\"floating\">Roof type*</ion-label>\r\n                    <ion-select class=\"form_input select_div\"\r\n                                ok-text=\"\" cancel-text=\"\"\r\n                                formControlName=\"rooftype\" interface=\"popover\">\r\n                        <ion-select-option value=\"flat\">Flat</ion-select-option>\r\n                        <ion-select-option value=\"pitch\">Pitch</ion-select-option>\r\n                        <ion-select-option value=\"both\">Both</ion-select-option>\r\n                    </ion-select>\r\n                </ion-item>\r\n            </ion-col>\r\n            <ion-col size=\"6\" *ngIf='(showValue==\"ground\" || showValue==\"both\")'>\r\n                    <ion-item class=\"ion-no-padding\">\r\n                        <ion-label position=\"floating\" style=\"font-size: 13px;\">Tilt for ground mount*</ion-label>\r\n                        <ion-input class=\"form_input\"  type=\"tel\" formControlName=\"tiltofgroundmountingsystem\" maxlength=\"5\"></ion-input>\r\n                    </ion-item>\r\n                    <div style=\"height: 5px;\">\r\n                        <div *ngIf=\"desginForm.get('tiltofgroundmountingsystem').dirty && desginForm.get('tiltofgroundmountingsystem').hasError('pattern')\">\r\n                            <span class=\"error\">{{\"It should be a valid number\"}}</span>\r\n                        </div>\r\n                        <div *ngIf=\"desginForm.get('tiltofgroundmountingsystem').hasError('pattern') && desginForm.get('tiltofgroundmountingsystem').dirty\">\r\n                            <span class=\"error\">{{tiltforgroundError}}</span>\r\n                        </div>\r\n                    </div>\r\n            </ion-col>\r\n        </ion-row>\r\n            <!--upload box-->\r\n<ion-row *ngIf='uploadbox==\"true\"'>\r\n    <ion-col size=\"12\">\r\n\r\n        <ng-container>\r\n            <ion-item class=\"ion-no-padding\" (click)=\"f.click()\">\r\n                <ion-label position=\"floating\">Architectural design*</ion-label>\r\n                    <input type=\"file\" #f class=\"form_input\"  (change)=\"files($event)\" style=\"margin-top: 12px;\" formControlName=\"architecturaldesign\" multiple>\r\n                    <ion-icon name=\"attach-outline\" slot=\"end\" style=\"margin-top:21px\"></ion-icon>\r\n                </ion-item>\r\n                <div *ngFor=\"let file of archFiles;let i = index\">\r\n                    <ion-item>\r\n                        <ion-col size=\"11\">\r\n                            {{file.name}}\r\n                        </ion-col>\r\n                        <ion-col size=\"1\" (click)=\"removeArc(i)\">x</ion-col>\r\n                    </ion-item>\r\n                </div>\r\n                </ng-container>\r\n        <!-- <ion-item class=\"ion-no-padding\"> -->\r\n            <!-- <ion-input class=\"form_input\" type=\"file\" placeholder=\"Upload Architectural design\" \r\n                    (ionChange)=\"files($event)\"  multiple></ion-input> -->\r\n                    <!-- <ion-label position=\"floating\">architectural design*</ion-label>\r\n                    <p style=\"margin-top: 10px;\" *ngFor=\"let architecture of architecturalData;let i=index\"><ion-row style=\"display:flex;align-items: flex-end;\" ><ion-col style=\"display:flex;align-items: flex-end;\"><ion-label style=\"-webkit-text-stroke: thin;\" *ngIf=\"architecture.value!=''\" position=\"floating\">{{architecture?.name}}</ion-label></ion-col>\r\n                        <ion-col style=\"display:flex;align-items: flex-end;\"> <ion-icon name=\"close-circle-outline\" *ngIf=\"architecture.name!=''\" (click)=\"remove(architecture,architecture?.id)\"></ion-icon></ion-col></ion-row></p>\r\n                    <ion-input type=\"file\"  class=\"form_input\"  (change)=\"files($event)\" style=\"margin-top: 12px;\" formControlName=\"architecturaldesign\" placeholder=\"Upload Architectural design\" multiple></ion-input>\r\n                </ion-item> -->\r\n                \r\n            </ion-col>\r\n                         <!-- <ion-item> -->\r\n                         <!-- <ion-label position=\"floating\">architectural design*</ion-label> -->\r\n                                <ng-container *ngIf=\"design && design.architecturaldesign !==null\">\r\n                                    <div *ngFor=\"let arc of design.architecturaldesign; let i = index\">\r\n                                       <ion-item>\r\n                                           <ion-col size=\"11\"> {{arc.name}}{{arc.ext}}</ion-col>\r\n                                           <ion-col size=\"1\" (click)=\"remove(arc, i)\">x</ion-col>\r\n                                          \r\n      \r\n                                       </ion-item>\r\n                                   \r\n                                       \r\n                                   </div> \r\n                                </ng-container>\r\n                         <!-- </ion-item> -->\r\n    \r\n</ion-row>\r\n\r\n            <ion-row>\r\n                <ion-col size=\"12\">\r\n                    <ng-container>\r\n                    <ion-item class=\"ion-no-padding\" (click)=\"d.click()\">\r\n                    <ion-label position=\"floating\">Attachments</ion-label>\r\n                   \r\n                               \r\n                                <input #d type=\"file\"  class=\"form_input\"  (change)=\"prelimfiles($event)\" style=\"margin-top: 12px;\" formArrayName=\"architecturaldesign\" multiple>\r\n                                <ion-icon name=\"attach-outline\" slot=\"end\" style=\"margin-top:21px\"></ion-icon>\r\n                            </ion-item>\r\n                            <div *ngFor=\"let file of prelimFiles;let i = index\">\r\n                                <ion-item>\r\n                                    <ion-col size=\"11\">\r\n                                        {{file.name}}\r\n                                    </ion-col>\r\n                                    <ion-col size=\"1\" (click)=\"removePrelim(i)\">x</ion-col>\r\n                                </ion-item>\r\n                            </div>\r\n                            </ng-container>\r\n                    <!-- <ion-item class=\"ion-no-padding\"> -->\r\n                        <!-- <ion-input class=\"form_input\" type=\"file\" placeholder=\"Upload Architectural design\" \r\n                                (ionChange)=\"files($event)\"  multiple></ion-input> -->\r\n                                <!-- <ion-label position=\"floating\">architectural design*</ion-label>\r\n                                <p style=\"margin-top: 10px;\" *ngFor=\"let architecture of architecturalData;let i=index\"><ion-row style=\"display:flex;align-items: flex-end;\" ><ion-col style=\"display:flex;align-items: flex-end;\"><ion-label style=\"-webkit-text-stroke: thin;\" *ngIf=\"architecture.value!=''\" position=\"floating\">{{architecture?.name}}</ion-label></ion-col>\r\n                                    <ion-col style=\"display:flex;align-items: flex-end;\"> <ion-icon name=\"close-circle-outline\" *ngIf=\"architecture.name!=''\" (click)=\"remove(architecture,architecture?.id)\"></ion-icon></ion-col></ion-row></p>\r\n                                <ion-input type=\"file\"  class=\"form_input\"  (change)=\"files($event)\" style=\"margin-top: 12px;\" formControlName=\"architecturaldesign\" placeholder=\"Upload Architectural design\" multiple></ion-input>\r\n                            </ion-item> -->\r\n                            \r\n                        </ion-col>\r\n                                     <!-- <ion-item> -->\r\n                                     <!-- <ion-label position=\"floating\">architectural design*</ion-label> -->\r\n                                            <ng-container *ngIf=\"design && design.attachments !==null\">\r\n                                                <div *ngFor=\"let arc of design.attachments;let i=index\">\r\n                                                   <ion-item>\r\n                                                       <ion-col size=\"11\"> {{arc.name}}{{arc.ext}}</ion-col>\r\n                                                       <ion-col size=\"1\" (click)=\"removeattachment(arc,i)\">x</ion-col>\r\n                                                      \r\n                  \r\n                                                   </ion-item>\r\n                                               \r\n                                                   \r\n                                               </div> \r\n                                            </ng-container>\r\n            </ion-row>\r\n\r\n        <ion-row class=\"ion-margin-top\">\r\n            <ion-label position=\"floating\">Comments</ion-label></ion-row>\r\n           <ion-row class=\"ion-margin-top\"> <ion-col size=\"12\" class=\"ion-no-padding\">\r\n                <ion-textarea class=\"ion-no-margin ion-no-padding comment_box\" rows=\"3\"\r\n                                formControlName=\"comments\"></ion-textarea>\r\n            </ion-col>\r\n        </ion-row>\r\n<!-- \r\n        <ion-row class=\"ion-margin-top\">\r\n            <ion-col>\r\n                <ion-item class=\" ion-no-padding no-border\" lines=\"none\" style=\"padding: 30px 0px;\">\r\n                    <app-user-selector style=\"overflow:scroll;\" placeholder=\"assign\" [assignees]=\"listOfAssignees\"\r\n                                        formControlName=\"assignedto\"></app-user-selector>\r\n                </ion-item>\r\n            </ion-col>\r\n        </ion-row> -->\r\n    </ion-grid>\r\n</form>\r\n\r\n</ion-content>\r\n");

/***/ }),

/***/ "gQGA":
/*!**********************************************!*\
  !*** ./src/app/schedule/number.directive.ts ***!
  \**********************************************/
/*! exports provided: NumberOnlyDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NumberOnlyDirective", function() { return NumberOnlyDirective; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");


let NumberOnlyDirective = class NumberOnlyDirective {
    constructor(el) {
        this.el = el;
        // Allow decimal numbers and negative values
        this.regex = new RegExp(/^[0-9]+(\.[0-9]*){0,1}$/g);
        // Allow key codes for special events. Reflect :
        // Backspace, tab, end, home
        this.specialKeys = ['Backspace', 'Tab', 'End', 'Home', '-'];
    }
    onKeyDown(event) {
        // Allow Backspace, tab, end, and home keys
        if (this.specialKeys.indexOf(event.key) !== -1) {
            return;
        }
        const current = this.el.nativeElement.value;
        const next = current.concat(event.key);
        if (next && !String(next).match(this.regex)) {
            event.preventDefault();
        }
    }
};
NumberOnlyDirective.ctorParameters = () => [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"] }
];
NumberOnlyDirective.propDecorators = {
    onKeyDown: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"], args: ['keydown', ['$event'],] }]
};
NumberOnlyDirective = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"])({
        selector: '[numberOnly]'
    })
], NumberOnlyDirective);



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

/***/ "nVRx":
/*!*******************************************************************!*\
  !*** ./src/app/schedule/salesproposal/salesproposal.component.ts ***!
  \*******************************************************************/
/*! exports provided: SalesproposalComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SalesproposalComponent", function() { return SalesproposalComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_salesproposal_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./salesproposal.component.html */ "7pXw");
/* harmony import */ var _salesproposal_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./salesproposal.component.scss */ "A67w");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var src_app_api_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/api.service */ "yTNM");
/* harmony import */ var src_app_utilities_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/utilities.service */ "oTnF");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _model_constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../model/constants */ "Kp5Z");
/* harmony import */ var _storage_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../storage.service */ "qkCY");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _ionic_native_Camera_ngx__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ionic-native/Camera/ngx */ "a/9d");
/* harmony import */ var _ionic_native_file_ngx__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ionic-native/file/ngx */ "FAH8");
/* harmony import */ var _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @cometchat-pro/cordova-ionic-chat */ "ujHh");
/* harmony import */ var _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! rxjs/operators */ "kU1M");















//import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
//import { AngularFirestore} from '@angular/fire/firestore';
let SalesproposalComponent = class SalesproposalComponent {
    constructor(formBuilder, apiService, utils, navController, storage, route, camera, file, router, cdr) {
        this.formBuilder = formBuilder;
        this.apiService = apiService;
        this.utils = utils;
        this.navController = navController;
        this.storage = storage;
        this.route = route;
        this.camera = camera;
        this.file = file;
        this.router = router;
        this.cdr = cdr;
        this.myControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]();
        this.listOfAssignees = [];
        this.listOfSolarMake = [];
        this.listOfSolarMade = [];
        this.listOfInverterMade = [];
        this.listOfInverterMake = [];
        this.getCompanies = [];
        this.emailError = _model_constants__WEBPACK_IMPORTED_MODULE_8__["INVALID_EMAIL_MESSAGE"];
        this.nameError = _model_constants__WEBPACK_IMPORTED_MODULE_8__["INVALID_NAME_MESSAGE"];
        this.annualunitError = _model_constants__WEBPACK_IMPORTED_MODULE_8__["INVALID_ANNUAL_UNIT"];
        this.tiltforgroundError = _model_constants__WEBPACK_IMPORTED_MODULE_8__["INVALID_TILT_FOR_GROUND_MOUNT"];
        this.companyError = _model_constants__WEBPACK_IMPORTED_MODULE_8__["INVALID_COMPANY_NAME"];
        this.moduleAndInverterError = _model_constants__WEBPACK_IMPORTED_MODULE_8__["INVALID_MODULE_AND_INVERTER"];
        this.fieldRequired = _model_constants__WEBPACK_IMPORTED_MODULE_8__["FIELD_REQUIRED"];
        this.designId = 0;
        this.design = null;
        this.archFiles = [];
        this.prelimFiles = [];
        this.indexOfArcFiles = [];
        this.isArcFileDelete = false;
        //attachmentName = this.desginForm.get('attachments').value;
        this.options = {
            quality: 30,
            targetWidth: 600,
            targetHeight: 300,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.PNG,
            mediaType: this.camera.MediaType.PICTURE
        };
        this.onFormSubmit = true;
        this.fieldDisabled = false;
        this.attachmentFileUpload = false;
        this.incentives = [];
        this.modulemakes = [];
        this.modulemodels = [];
        this.isEditMode = false;
        this.logoSelected = false;
        // onProjectChange(event){
        // console.log("eve",this.desginForm);
        // }
        this.getclass = () => {
            return this.address == "" ? "0px" : "50px";
        };
        // this.utils.showHideIntercom(true);
        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var d_date = tomorrow.toISOString();
        const EMAILPATTERN = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z]+(?:\.[a-zA-Z]+)*$/;
        const NAMEPATTERN = /^[a-zA-Z. ]{3,}$/;
        const NUMBERPATTERN = '^[0-9]*$';
        const COMPANYFORMAT = '[a-zA-Z0-9. ]{3,}';
        this.firstFormGroup = this.formBuilder.group({});
        this.desginForm = this.formBuilder.group({
            company: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].pattern(COMPANYFORMAT)]),
            name: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].pattern(NAMEPATTERN)]),
            email: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].pattern(EMAILPATTERN)]),
            solarmake: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]),
            solarmodel: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]),
            invertermake: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]),
            invertermodel: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]),
            monthlybill: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].min(0), _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].pattern(NUMBERPATTERN)]),
            address: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]),
            createdby: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](''),
            assignedto: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](''),
            rooftype: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](''),
            //prelimdesign: new FormControl(null),
            architecturaldesign: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](''),
            tiltgroundmount: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](''),
            mountingtype: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]),
            // jobtype: new FormControl('', [Validators.required]),
            projecttype: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]),
            newconstruction: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](false),
            source: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('android', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]),
            comments: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](''),
            requesttype: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('prelim'),
            latitude: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](''),
            longitude: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](''),
            country: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](''),
            state: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](''),
            city: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](''),
            postalcode: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](''),
            status: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('created'),
            attachments: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]([]),
            deliverydate: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](d_date, []),
            outsourcedto: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](null),
            isoutsourced: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('false'),
            designacceptancestarttime: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](null),
            creatorparentid: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](this.storage.getParentId()),
            //isonpriority:new FormControl('false'),
            paymentstatus: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](null),
            paymenttype: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](null),
            utility: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]("", [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].pattern("^[a-zA-Z-_ ]{3,}$")]),
            //utility: new FormControl("",[Validators.pattern("^[a-zA-Z-_ ]{3,}$")]),
            //utilityrate : new FormControl("",[Validators.pattern("^[a-zA-Z-_ ]{3,}$")]),
            utilityrate: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]("", [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].pattern("^[a-zA-Z-_ ]{3,}$")]),
            annualutilityescalation: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]),
            incentive: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]),
            costofsystem: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](null, [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]),
            personname: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](null, [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].pattern(NAMEPATTERN)]),
            // companylogo : new FormControl(null),
            requirementtype: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('proposal')
            // uploadbox:new FormControl('')
        });
        // this.newprelimsRef = db.object('newprelimdesigns');
        // this.newprelims = this.newprelimsRef.valueChanges();
        // this.newprelims.subscribe(
        //   (res) => {
        //     console.log(res);
        //     this.newprelimscount = res.count;
        //     cdr.detectChanges();
        //   },
        //   (err) => console.log(err),
        //   () => console.log('done!')
        // )
        //this.newprelims = this.newprelimsRef.valueChanges();
        // this.db.doc('newprelimdesigns').valueChanges().subscribe((res:any)=>{
        //   this.newprelimscount = res;
        //   console.log(this.newprelimscount)
        // })
        // this.newprelims.subscribe(
        //   (res) => {
        //     console.log(res);
        //     this.newprelimscount = res.count;
        //   },
        //   (err) => console.log(err),
        //   () => console.log('done!')
        // )
        this.designId = +this.route.snapshot.paramMap.get('id');
        this.getAssignees();
    }
    numberfield(event) {
        console.log(event);
    }
    ionViewDidEnter() {
        // this.utils.showHideIntercom(true);
        // this.getincentives();
        // this.getutilitiesName();
        this.fetchIncentive();
    }
    getincentives() {
        this.apiService.salesIncentives().subscribe(res => {
            console.log(res, "salesinc");
            // this.incentives  = res;
        });
    }
    getutilitiesName() {
        this.apiService.utilitiesNames().subscribe(res => {
            console.log(res, "utilityname");
            this.utilitiesName = res;
        });
    }
    fetchModuleMakesData() {
        this.apiService.utilitiesNames().subscribe((response) => {
            console.log("Hiii");
            this.modulemakes = response;
            this.filteredModuleMakes = this.desginForm.get('utility').valueChanges.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_14__["startWith"])(""), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_14__["map"])(value => (typeof value === "string" ? value : value.name)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_14__["map"])(name => (name ? this._filterModuleMake(name) : this.modulemakes.slice())));
        }, error => {
            this.utils.errorSnackBar("Error");
        });
    }
    fetchIncentive() {
        this.apiService.salesIncentives().subscribe((response) => {
            console.log("Hiii");
            this.incentives = response;
            // this.filterIncentive = this.desginForm.get('utility').valueChanges.pipe(
            //   startWith(""),
            //   map(value => (typeof value === "string" ? value : value.title)),
            //   map(title => (title ? this._filterincentive(title) : this.incentives.slice()))
            // );
        }, error => {
            this.utils.errorSnackBar("Error");
        });
    }
    _filterModuleMake(name) {
        const filterValue = name.toLowerCase();
        return this.modulemakes.filter(modulemake => modulemake.name.toLowerCase().indexOf(filterValue) != -1);
    }
    fetchUtilityData(_event, make) {
        //this.desginForm.patchValue({ uti: " " })
        this.desginForm.patchValue({ utilityrate: " " });
        if (_event.isUserInput) {
            console.log(_event, "hello");
            this.desginForm.get('utilityrate').setValue("");
            if (this.isEditMode) {
                this.selectedUtilityRateId = null;
            }
            this.modulemodels = [];
            this.selectedUtilityId = make.id;
            this.apiService.utilitiesRate(make.id).subscribe((response) => {
                console.log("Hiii", response);
                this.modulemodels = response;
                console.log(this.modulemodels);
                this.filteredModuleModels = this.desginForm.get('utilityrate').valueChanges.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_14__["startWith"])(""), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_14__["map"])(value => (typeof value === "string" ? value : value.rate)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_14__["map"])(rate => (rate ? this._filterModuleModel(rate) : this.modulemodels.slice())));
            }, error => {
                this.utils.errorSnackBar("Error");
            });
        }
    }
    setSelectedUtilityRate(module) {
        console.log(module);
        this.selectedUtilityRateId = module.id;
    }
    displayFnModuleModel(modulemodel) {
        return modulemodel && modulemodel.name ? modulemodel.name : "";
    }
    _filterModuleModel(rate) {
        const filterValue = rate.toLowerCase();
        return this.modulemodels.filter(modulemodel => modulemodel.rate.toLowerCase().indexOf(filterValue) != -1);
    }
    saveUtilityName() {
        console.log(this.modulemakes);
        console.log("g", this.desginForm.get("utility").value);
        const found = this.modulemakes.some(el => el.name === this.desginForm.get("utility").value);
        if (!found) {
            console.log("hello");
            let data = {
                name: this.desginForm.get('utility').value
            };
            this.apiService
                .postUtilitiesNames(data)
                .subscribe((response) => {
                console.log(response);
                this.selectedUtilityId = response.id;
                this.saveUtilityRate();
            }, error => {
                this.utils.errorSnackBar("Error");
            });
        }
        else {
            this.saveUtilityRate();
        }
    }
    saveUtilityRate() {
        console.log(this.modulemodels);
        console.log(this.desginForm.get("utilityrate").value);
        const ismakefound = this.modulemakes.some(el => el.name === this.desginForm.get("utility").value);
        console.log(ismakefound);
        const found = this.modulemodels.some(el => el.rate === this.desginForm.get("utilityrate").value);
        console.log(found);
        if (!ismakefound || !found) {
            let data = {
                utility: this.selectedUtilityId,
                rate: this.desginForm.get('utilityrate').value
            };
            this.apiService
                .postUtilitiesRate(data)
                .subscribe((response) => {
                this.selectedUtilityRateId = response.id;
                this.submitform();
            }, error => {
                this.utils.errorSnackBar("Error");
            });
        }
        else {
            this.submitform();
        }
    }
    uploadFile(event) {
        this.logoSelected = true;
        this.uploadLogo = event.target.files[0].name;
        console.log(this.uploadLogo);
        let reader = new FileReader(); // HTML5 FileReader API
        let file = event.target.files[0];
        if (event.target.files && event.target.files[0]) {
            reader.readAsDataURL(file);
            // When file uploads set it to file formcontrol
            reader.onload = () => {
                this.logo = reader.result;
                this.blob = this.utils.b64toBlob(this.logo);
                console.log(this.blob);
                this.firstFormGroup.patchValue({
                    logo: this.uploadLogo
                });
            };
            // ChangeDetectorRef since file is loading outside the zone
            this.cdr.markForCheck();
        }
    }
    // getmodulename(event){
    //     this.modulename= event;
    //     console.log(this.modulename);
    // }
    // logScrolling(e){
    // }
    // record(){
    //   this.filterrecord= this.listOfSolarMake.filter(x=>
    // }
    ngOnInit() {
        this.userId = this.storage.getUserID();
        this.fieldDisabled = false;
        this.userdata = this.storage.getUser();
        this.byDefaultData();
        //this.fetchModuleMakesData();
        // this.intercom.update({
        //   "hide_default_launcher": true
        // });
        // this.utils.manualInput.subscribe(data=>{
        //     if(this.modulename=='solarmake'){
        //       this.solarmake=data;
        // this.solarMakeDisposable.unsubscribe();
        // this.desginForm.patchValue({
        //   solarmake:data
        // });
        // this.solarMakeDisposable = this.desginForm.get('solarmake').valueChanges.subscribe(val => {
        //   this.getSolarMade();
        // });
        // }else if(this.modulename=='solarmade'){
        // this.solarmade=data;
        // }else if(this.modulename=='invertermake'){
        //   this.invertermake = data;
        // }else if(this.modulename=='invertermade'){
        //   this.invertermade= data;
        // }
        // })
        this.address = this.storage.getData();
        this.subscription = this.utils.getScheduleFormEvent().subscribe((event) => {
            if (event === _model_constants__WEBPACK_IMPORTED_MODULE_8__["ScheduleFormEvent"].SAVE_SALES_FORM || event === _model_constants__WEBPACK_IMPORTED_MODULE_8__["ScheduleFormEvent"].SEND_SALES_FORM) {
                this.send = event;
                this.addForm();
            }
            if (event === _model_constants__WEBPACK_IMPORTED_MODULE_8__["ScheduleFormEvent"].PAY_EVENT) {
                this.sendtowattmonk();
            }
        });
        this.gettingClients();
        if (this.designId !== 0) {
            setTimeout(() => {
                this.getDesignDetails();
            }, 1000);
        }
        else {
            // if(this.onFormSubmit){
            this.solarMakeDisposable = this.desginForm.get('solarmake').valueChanges.subscribe(val => {
                this.getSolarMade();
            });
            this.desginForm.get('invertermake').valueChanges.subscribe(val => {
                this.getInverterMade();
            });
            // }
            this.addressSubscription = this.utils.getAddressObservable().subscribe((address) => {
                // console.log(address,">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
                this.desginForm.get('address').setValue('124/345');
                this.desginForm.get('latitude').setValue('24.553333');
                this.desginForm.get('longitude').setValue('80.5555555555');
                this.desginForm.get('country').setValue('india');
                this.desginForm.get('city').setValue('Lucknow');
                this.desginForm.get('state').setValue('UP');
                this.desginForm.get('postalcode').setValue(3232343);
                //  this.desginForm.get('address').setValue(address.address);
                //    this.desginForm.get('latitude').setValue(address.lat);
                //    this.desginForm.get('longitude').setValue(address.long);
                //    this.desginForm.get('country').setValue(address.country);
                //  this.desginForm.get('city').setValue(address.city);
                //    this.desginForm.get('state').setValue(address.state);
                //    this.desginForm.get('postalcode').setValue(address.postalcode);
            }, (error) => {
                this.desginForm.get('address').setValue('');
                this.desginForm.get('latitude').setValue('');
                this.desginForm.get('longitude').setValue('');
                this.desginForm.get('country').setValue('');
                this.desginForm.get('city').setValue('');
                this.desginForm.get('state').setValue('');
                this.desginForm.get('postalcode').setValue('');
            });
            this.desginForm.patchValue({
                createdby: this.storage.getUserID()
            });
            this.getSolarMake();
        }
        setTimeout(() => {
            this.fetchModuleMakesData();
            if (this.designId !== 0) {
                this.loadModuleModelsData();
                this.byDefaultData();
            }
        });
        this.formControlValueChanged();
        this.uploadcontrolvalidation();
    }
    byDefaultData() {
        console.log(this.userdata);
        this.desginForm.patchValue({
            company: this.userdata.company
        });
        if (this.userdata.logo != null) {
            this.logo = this.userdata.logo.url;
        }
    }
    formControlValueChanged() {
        const NUMBERPATTERN = '^[0-9]*$';
        const tiltControl = this.desginForm.get('tiltgroundmount');
        const roofcontrol = this.desginForm.get('rooftype');
        this.desginForm.get('mountingtype').valueChanges.subscribe((mode) => {
            console.log(mode);
            if (mode === 'ground') {
                tiltControl.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].pattern(NUMBERPATTERN)]);
                roofcontrol.clearValidators();
                roofcontrol.reset();
            }
            else if (mode === 'both') {
                tiltControl.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required, , _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].min(0), _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].pattern(NUMBERPATTERN)]);
                roofcontrol.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]);
            }
            else if (mode === 'roof') {
                roofcontrol.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]);
                tiltControl.clearValidators();
                tiltControl.reset();
            }
            else {
                tiltControl.clearValidators();
                roofcontrol.clearValidators();
            }
            tiltControl.updateValueAndValidity();
            roofcontrol.updateValueAndValidity();
        });
    }
    uploadcontrolvalidation() {
        const uploadboxcontrol = this.desginForm.get('architecturaldesign');
        this.desginForm.get('newconstruction').valueChanges.subscribe((uploadmode) => {
            console.log(uploadmode);
            if (uploadmode == 'true') {
                uploadboxcontrol.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]);
            }
            else if (uploadmode == 'false') {
                uploadboxcontrol.clearValidators();
                uploadboxcontrol.reset();
            }
            uploadboxcontrol.updateValueAndValidity();
        });
    }
    loadModuleModelsData() {
        this.modulemodels = [];
        this.apiService.utilitiesRate(this.selectedUtilityId).subscribe((response) => {
            console.log("Hiii");
            this.modulemodels = response;
            this.filteredModuleModels = this.desginForm.get('utilityrate').valueChanges.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_14__["startWith"])(""), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_14__["map"])(value => (typeof value === "string" ? value : value.rate)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_14__["map"])(rate => (rate ? this._filterModuleModel(rate) : this.modulemodels.slice())));
        }, error => {
            this.utils.errorSnackBar("Error");
        });
    }
    ngOnDestroy() {
        // this.utils.showHideIntercom(false);
        this.subscription.unsubscribe();
        if (this.designId === 0) {
            this.addressSubscription.unsubscribe();
        }
    }
    getDesignDetails() {
        this.utils.showLoading('Getting Design Details').then(() => {
            this.apiService.getDesginDetail(this.designId).subscribe((result) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                yield this.utils.hideLoading().then(() => {
                    // this.utils.showHideIntercom(true);
                    this.design = result;
                    console.log(this.design);
                    this.fieldDisabled = true;
                    this.attachmentData = this.design.attachments;
                    this.architecturalData = this.design.architecturaldesign;
                    console.log("hello", this.design.attachments);
                    this.desginForm.patchValue({
                        name: this.design.name,
                        email: this.design.email,
                        monthlybill: this.design.monthlybill,
                        address: this.design.address,
                        createdby: this.design.createdby,
                        rooftype: this.design.rooftype,
                        mountingtype: this.design.mountingtype,
                        architecturaldesign: this.design.architecturaldesign,
                        // jobtype: this.design.jobtype,
                        tiltgroundmount: this.design.tiltgroundmount,
                        comments: this.design.comments == '' ? '' : this.design.comments[0].message,
                        projecttype: this.design.projecttype,
                        latitude: this.design.latitude,
                        longitude: this.design.longitude,
                        country: this.design.country,
                        state: this.design.state,
                        city: this.design.city,
                        postalcode: this.design.postalcode,
                        newconstruction: this.design.newconstruction + '',
                        prelimdesign: null,
                        //attachments:this.design.attachments,
                        attachments: this.design.attachments,
                        solarmake: this.design.solarmake,
                        solarmodel: this.design.solarmodel,
                        invertermake: this.design.invertermake,
                        invertermodel: this.design.invertermodel,
                        status: this.design.status,
                        utility: this.design.utility.name,
                        utilityrate: this.design.utilityrate.rate,
                        annualutilityescalation: this.design.annualutilityescalation,
                        incentive: this.design.incentive.id,
                        costofsystem: this.design.costofsystem,
                        personname: this.design.personname,
                        requirementtype: this.design.requirementtype
                    });
                    //console.log("attachments",this.desginForm.get('attachments').value)
                    this.utils.setStaticAddress(this.design.address);
                    //  this.attachmentData=this.design.attachments.length==1 ? this.design.attachments[0].name + this.design.attachments[0].ext : this.design.attachments.length;
                    if (this.design.assignedto !== null && this.design.assignedto !== undefined) {
                        this.desginForm.patchValue({
                            assignedto: this.design.assignedto.id
                        });
                    }
                    setTimeout(() => {
                        this.getSolarMakeForForm();
                        this.getInverterMakeForForm();
                    }, 500);
                });
            }), (error) => {
                this.utils.hideLoading();
            });
        });
    }
    getSolarMakeForForm() {
        this.apiService.getSolarMake().subscribe(response => {
            this.listOfSolarMake = response;
            this.apiService.getSolarMade(this.design.solarmake.id).subscribe(solarresponse => {
                // this.utils.hideLoading().then(()=>{
                this.listOfSolarMade = solarresponse;
                console.log(solarresponse);
                console.log('patching solar');
                setTimeout(() => {
                    this.desginForm.patchValue({
                        solarmake: this.design.solarmake.id,
                        solarmodel: this.design.solarmodel.id
                    });
                    // if(this.onFormSubmit){
                    this.desginForm.get('solarmake').valueChanges.subscribe(val => {
                        this.getSolarMade();
                    });
                    // }
                }, 500);
                // });
            }, solarResponseError => {
                const error = solarResponseError.error;
                if (error.message instanceof String) {
                    this.utils.errorSnackBar(error.message);
                }
                else if (error.message instanceof Array) {
                    this.utils.errorSnackBar(error.message[0].messages[0].message);
                }
            });
        }, responseError => {
            const error = responseError.error;
            if (error.message instanceof String) {
                this.utils.errorSnackBar(error.message);
            }
            else if (error.message instanceof Array) {
                this.utils.errorSnackBar(error.message[0].messages[0].message);
            }
        });
    }
    getInverterMakeForForm() {
        this.apiService.getInverterMake().subscribe(response => {
            console.log(response);
            this.listOfInverterMake = response;
            this.apiService.getInverterMade(this.design.invertermake.id).subscribe(makeResponse => {
                // this.utils.hideLoading();
                console.log('patching inverter');
                this.listOfInverterMade = makeResponse;
                setTimeout(() => {
                    this.desginForm.patchValue({
                        invertermake: this.design.invertermake.id,
                        invertermodel: this.design.invertermodel.id
                    });
                    // if(this.onFormSubmit){
                    this.desginForm.get('invertermake').valueChanges.subscribe(val => {
                        this.getInverterMade();
                    });
                    // }
                }, 500);
            }, makeResponseError => {
                const error = makeResponseError.error;
                if (error.message instanceof String) {
                    this.utils.errorSnackBar(error.message);
                }
                else if (error.message instanceof Array) {
                    this.utils.errorSnackBar(error.message[0].messages[0].message);
                }
            });
        }, responseError => {
            const error = responseError.error;
            if (error.message instanceof String) {
                this.utils.errorSnackBar(error.message);
            }
            else if (error.message instanceof Array) {
                this.utils.errorSnackBar(error.message[0].messages[0].message);
            }
        });
    }
    saveModuleMake() {
        const found = this.listOfSolarMake.some((el) => el.name === this.solarmake);
        console.log(found);
        if (!found) {
            let solarmakedata = {
                name: this.solarmake
            };
            this.apiService.postSolarMake(solarmakedata).subscribe((response) => {
                this.desginForm.patchValue({
                    solarmake: response.id
                });
                this.saveModuleModel();
            }, err => {
                console.log(err, 'err in savemodulemake');
            });
        }
        else {
            this.saveModuleModel();
        }
    }
    saveModuleModel() {
        const ismakefound = this.listOfSolarMake.some(el => el.name === this.solarmake);
        const found = this.listOfSolarMade.some((el) => el.name === this.solarmade);
        if (!ismakefound || !found) {
            let solarmadedata = {
                solarmade: this.solarmade,
                solarmake: this.desginForm.get('solarmake').value
            };
            console.log(solarmadedata);
            this.apiService.postSolarMade(solarmadedata).subscribe((response) => {
                this.desginForm.patchValue({
                    solarmade: response.id
                });
                this.saveInvertermake();
            });
        }
        else {
            this.saveInvertermake();
        }
    }
    saveInvertermake() {
        const found = this.listOfInverterMake.some(el => el.name === this.invertermake);
        if (!found) {
            let invertermakedata = {
                invertermake: this.invertermake
            };
            this.apiService.postInverterMake(invertermakedata).subscribe((response) => {
                this.desginForm.patchValue({
                    invertermake: response.id
                });
                this.saveInverterMade();
            });
        }
        else {
            this.saveInverterMade();
        }
    }
    saveInverterMade() {
        const ismakefound = this.listOfInverterMake.some(el => el.name === this.invertermake);
        const found = this.listOfInverterMade.some(el => el.name === this.invertermade);
        if (!ismakefound || !found) {
            let invertermadedata = {
                invertermade: this.invertermade,
                invertermake: this.desginForm.get('invertermake').value
            };
            console.log(invertermadedata);
            this.apiService.postInverterMade(invertermadedata).subscribe((response) => {
                this.desginForm.patchValue({
                    invertermade: response.id
                });
                this.submitform();
            });
        }
        else {
            this.submitform();
        }
    }
    remove(arc, i) {
        //   this.utils.showLoading('Deleting Architecture Design').then((success)=>{
        //     this.apiService.deletePrelimImage(index).subscribe(res=>{console.log("hello",res)
        //   this.utils.hideLoading().then(()=>{
        //     this.utils.showSnackBar('File deleted successfully');
        //     this.navController.navigateRoot(["/schedule/design/",{id:this.designId}]);
        //     //this.utils.setHomepageDesignRefresh(true);
        //   });
        //   },
        // (error)=>{
        //   this.utils.hideLoading().then(()=> {
        //     this.utils.errorSnackBar('some Error Occured');
        //   });
        // });
        // });
        console.log(arc);
        this.indexOfArcFiles.push(arc.id);
        this.isArcFileDelete = true;
        console.log(this.isArcFileDelete);
        console.log(this.indexOfArcFiles);
        console.log(this.architecturalData);
        this.architecturalData.splice(i, 1);
    }
    removeattachment(attachment, i) {
        this.indexOfArcFiles.push(attachment.id);
        this.isArcFileDelete = true;
        console.log(this.isArcFileDelete);
        console.log(this.indexOfArcFiles);
        console.log(this.attachmentData);
        console.log(i);
        this.attachmentData.splice(i, 1);
    }
    deleteArcFile(index) {
        // this.utils.showLoading('Deleting Architecture Design').then((success)=>{
        for (var i = 0; i < index.length; i++) {
            var id = index[i];
            this.apiService.deletePrelimImage(id).subscribe(res => {
                console.log("hello", res);
            });
            // this.utils.hideLoading().then(()=>{
            //   //   this.utils.showSnackBar('File deleted successfully');
            //     // this.navController.navigateRoot(["/permitschedule",{id:this.designId}]);
            //    // this.utils.setPermitDesignDetailsRefresh(true);
            //  // });
            //   },
            (error) => {
                this.utils.hideLoading().then(() => {
                    this.utils.errorSnackBar('some Error Occured');
                });
            };
        }
        // });
        //this.utils.setHomepageDesignRefresh(true);
    }
    addForm() {
        this.onFormSubmit = false;
        // this.saveModuleMake();
        debugger;
        console.log('Reach', this.desginForm.value);
        // debugger;
        // this.saveModuleMake();
        this.saveUtilityName();
    }
    submitform() {
        console.log(this.desginForm);
        // const invalid = [];
        // const controls = this.desginForm.controls;
        // for (const name in controls) {
        //     if (controls[name].invalid) {
        //         invalid.push(name);
        //     }
        // }
        // console.log('hey',invalid)
        // return invalid;
        if (this.desginForm.status == 'VALID') {
            var newConstruction = this.desginForm.get("newconstruction").value;
            console.log(this.selectedUtilityId);
            // this.desginForm.get('utilityrate').setValue(this.selectedUtilityRateId);
            // this.desginForm.get('utility').setValue(this.selectedUtilityId);
            let postData;
            if (this.designId === 0) {
                if (this.send === _model_constants__WEBPACK_IMPORTED_MODULE_8__["ScheduleFormEvent"].SAVE_SALES_FORM) {
                    debugger;
                    postData = {
                        company: this.desginForm.get('company').value,
                        name: this.desginForm.get('name').value,
                        email: this.desginForm.get('email').value,
                        solarmake: this.desginForm.get('solarmake').value,
                        solarmodel: this.desginForm.get('solarmodel').value,
                        invertermake: this.desginForm.get('invertermake').value,
                        invertermodel: this.desginForm.get('invertermodel').value,
                        monthlybill: this.desginForm.get('monthlybill').value,
                        address: this.desginForm.get('address').value,
                        createdby: this.desginForm.get('createdby').value,
                        assignedto: this.desginForm.get('assignedto').value,
                        rooftype: this.desginForm.get('rooftype').value,
                        //prelimdesign: new FormControl(null),
                        architecturaldesign: this.desginForm.get('architecturaldesign').value,
                        tiltgroundmount: this.desginForm.get('tiltgroundmount').value,
                        mountingtype: this.desginForm.get('mountingtype').value,
                        // jobtype: new FormControl('', [Validators.required]),
                        projecttype: this.desginForm.get('projecttype').value,
                        newconstruction: this.desginForm.get('newconstruction').value,
                        source: this.desginForm.get('source').value,
                        comments: this.desginForm.get('comments').value,
                        requesttype: this.desginForm.get('requesttype').value,
                        latitude: this.desginForm.get('latitude').value,
                        longitude: this.desginForm.get('longitude').value,
                        country: this.desginForm.get('country').value,
                        state: this.desginForm.get('state').value,
                        city: this.desginForm.get('city').value,
                        postalcode: this.desginForm.get('postalcode').value,
                        status: this.desginForm.get('status').value,
                        attachments: this.desginForm.get('attachments').value,
                        deliverydate: this.desginForm.get('deliverydate').value,
                        outsourcedto: this.desginForm.get('outsourcedto').value,
                        isoutsourced: this.desginForm.get('isoutsourced').value,
                        designacceptancestarttime: this.desginForm.get('designacceptancestarttime').value,
                        creatorparentid: this.desginForm.get('creatorparentid').value,
                        //isonpriority:new FormControl('false'),
                        paymentstatus: this.desginForm.get('paymentstatus').value,
                        paymenttype: this.desginForm.get('paymenttype').value,
                        utility: this.selectedUtilityId,
                        utilityrate: this.selectedUtilityRateId,
                        annualutilityescalation: this.desginForm.get('annualutilityescalation').value,
                        incentive: this.desginForm.get('incentive').value,
                        costofsystem: this.desginForm.get('costofsystem').value,
                        personname: this.desginForm.get('personname').value,
                        requirementtype: this.desginForm.get('requirementtype').value,
                    };
                    this.utils.showLoading('Saving').then(() => {
                        // this.apiService.addDesginForm(this.desginForm.value).subscribe((response) => {
                        this.apiService.addDesginForm(postData).subscribe((response) => {
                            // this.uploaarchitecturedesign(response.id,'architecturaldesign');
                            // this.uploadpreliumdesign(response.id,'attachments')
                            this.utils.hideLoading().then(() => {
                                if (this.logoSelected) {
                                    this.updateLogo();
                                }
                                if (newConstruction == 'true') {
                                    // if(this.architecturalFileUpload){
                                    this.uploaarchitecturedesign(response, 'architecturaldesign');
                                    // }
                                }
                                else {
                                    if (this.attachmentFileUpload) {
                                        this.uploadpreliumdesign(response, 'attachments');
                                    }
                                    else {
                                        console.log('Redirect.....');
                                        this.router.navigate(['/homepage/design']);
                                        // this.utils.showSnackBar('Design have been saved');
                                        this.utils.setHomepageDesignRefresh(true);
                                    }
                                }
                                // this.utils.hideLoading().then(() => {
                                //   console.log('Res', response);
                                //   this.createChatGroup(response);
                                //   this.router.navigate(['/homepage/design'])
                                //   // this.utils.showSnackBar('Design have been saved');
                                //   this.utils.setHomepageDesignRefresh(true);
                                //   // this.navController.pop();
                                //   // this.utils.showSuccessModal('Desgin have been saved').then((modal) => {
                                //   //   modal.present();
                                //   //   modal.onWillDismiss().then((dismissed) => {
                                //       // this.utils.setHomepageDesignRefresh(true);
                                //   //     this.navController.pop();
                                //   //   });
                                //   // });
                            });
                        }, responseError => {
                            this.utils.hideLoading();
                            const error = responseError.error;
                            this.utils.errorSnackBar(error.message);
                        });
                    });
                }
                else if (this.send === _model_constants__WEBPACK_IMPORTED_MODULE_8__["ScheduleFormEvent"].SEND_SALES_FORM) {
                    postData = {
                        company: this.desginForm.get('company').value,
                        name: this.desginForm.get('name').value,
                        email: this.desginForm.get('email').value,
                        solarmake: this.desginForm.get('solarmake').value,
                        solarmodel: this.desginForm.get('solarmodel').value,
                        invertermake: this.desginForm.get('invertermake').value,
                        invertermodel: this.desginForm.get('invertermodel').value,
                        monthlybill: this.desginForm.get('monthlybill').value,
                        address: this.desginForm.get('address').value,
                        createdby: this.desginForm.get('createdby').value,
                        assignedto: this.desginForm.get('assignedto').value,
                        rooftype: this.desginForm.get('rooftype').value,
                        //prelimdesign: new FormControl(null),
                        architecturaldesign: this.desginForm.get('architecturaldesign').value,
                        tiltgroundmount: this.desginForm.get('tiltgroundmount').value,
                        mountingtype: this.desginForm.get('mountingtype').value,
                        // jobtype: new FormControl('', [Validators.required]),
                        projecttype: this.desginForm.get('projecttype').value,
                        newconstruction: this.desginForm.get('newconstruction').value,
                        source: this.desginForm.get('source').value,
                        comments: this.desginForm.get('comments').value,
                        requesttype: this.desginForm.get('requesttype').value,
                        latitude: this.desginForm.get('latitude').value,
                        longitude: this.desginForm.get('longitude').value,
                        country: this.desginForm.get('country').value,
                        state: this.desginForm.get('state').value,
                        city: this.desginForm.get('city').value,
                        postalcode: this.desginForm.get('postalcode').value,
                        status: this.desginForm.get('status').value,
                        attachments: this.desginForm.get('attachments').value,
                        deliverydate: this.desginForm.get('deliverydate').value,
                        outsourcedto: this.desginForm.get('outsourcedto').value,
                        isoutsourced: this.desginForm.get('isoutsourced').value,
                        designacceptancestarttime: this.desginForm.get('designacceptancestarttime').value,
                        creatorparentid: this.desginForm.get('creatorparentid').value,
                        //isonpriority:new FormControl('false'),
                        paymentstatus: this.desginForm.get('paymentstatus').value,
                        paymenttype: this.desginForm.get('paymenttype').value,
                        utility: this.selectedUtilityId,
                        utilityrate: this.selectedUtilityRateId,
                        annualutilityescalation: this.desginForm.get('annualutilityescalation').value,
                        incentive: this.desginForm.get('incentive').value,
                        costofsystem: this.desginForm.get('costofsystem').value,
                        personname: this.desginForm.get('personname').value,
                        requirementtype: this.desginForm.get('requirementtype').value,
                    };
                    this.apiService.addDesginForm(postData).subscribe((response) => {
                        console.log(response.id);
                        this.utils.hideLoading().then(() => {
                            if (this.logoSelected) {
                                this.updateLogo();
                            }
                            if (newConstruction == 'true') {
                                this.uploaarchitecturedesign(response, 'architecturaldesign');
                            }
                            else {
                                if (this.attachmentFileUpload) {
                                    this.uploadpreliumdesign(response, 'attachments');
                                }
                                else {
                                    let objToSend = {
                                        queryParams: {
                                            id: response.id,
                                            designData: "prelim",
                                            fulldesigndata: response,
                                        },
                                        skipLocationChange: false,
                                        fragment: 'top'
                                    };
                                    this.router.navigate(['/payment-modal'], {
                                        state: { productdetails: objToSend }
                                    });
                                }
                            }
                        });
                    }, responseError => {
                        this.utils.hideLoading();
                        const error = responseError.error;
                        this.utils.errorSnackBar(error.message);
                    });
                }
            }
            else {
                if (this.send === _model_constants__WEBPACK_IMPORTED_MODULE_8__["ScheduleFormEvent"].SAVE_SALES_FORM) {
                    postData = {
                        company: this.desginForm.get('company').value,
                        name: this.desginForm.get('name').value,
                        email: this.desginForm.get('email').value,
                        solarmake: this.desginForm.get('solarmake').value,
                        solarmodel: this.desginForm.get('solarmodel').value,
                        invertermake: this.desginForm.get('invertermake').value,
                        invertermodel: this.desginForm.get('invertermodel').value,
                        monthlybill: this.desginForm.get('monthlybill').value,
                        address: this.desginForm.get('address').value,
                        createdby: this.desginForm.get('createdby').value,
                        assignedto: this.desginForm.get('assignedto').value,
                        rooftype: this.desginForm.get('rooftype').value,
                        //prelimdesign: new FormControl(null),
                        architecturaldesign: this.desginForm.get('architecturaldesign').value,
                        tiltgroundmount: this.desginForm.get('tiltgroundmount').value,
                        mountingtype: this.desginForm.get('mountingtype').value,
                        // jobtype: new FormControl('', [Validators.required]),
                        projecttype: this.desginForm.get('projecttype').value,
                        newconstruction: this.desginForm.get('newconstruction').value,
                        source: this.desginForm.get('source').value,
                        comments: this.desginForm.get('comments').value,
                        requesttype: this.desginForm.get('requesttype').value,
                        latitude: this.desginForm.get('latitude').value,
                        longitude: this.desginForm.get('longitude').value,
                        country: this.desginForm.get('country').value,
                        state: this.desginForm.get('state').value,
                        city: this.desginForm.get('city').value,
                        postalcode: this.desginForm.get('postalcode').value,
                        status: this.desginForm.get('status').value,
                        attachments: this.desginForm.get('attachments').value,
                        deliverydate: this.desginForm.get('deliverydate').value,
                        outsourcedto: this.desginForm.get('outsourcedto').value,
                        isoutsourced: this.desginForm.get('isoutsourced').value,
                        designacceptancestarttime: this.desginForm.get('designacceptancestarttime').value,
                        creatorparentid: this.desginForm.get('creatorparentid').value,
                        //isonpriority:new FormControl('false'),
                        paymentstatus: this.desginForm.get('paymentstatus').value,
                        paymenttype: this.desginForm.get('paymenttype').value,
                        utility: this.selectedUtilityId,
                        utilityrate: this.selectedUtilityRateId,
                        annualutilityescalation: this.desginForm.get('annualutilityescalation').value,
                        incentive: this.desginForm.get('incentive').value,
                        costofsystem: this.desginForm.get('costofsystem').value,
                        personname: this.desginForm.get('personname').value,
                        requirementtype: this.desginForm.get('requirementtype').value,
                    };
                    this.utils.showLoading('Saving').then(() => {
                        this.apiService.updateDesignForm(postData, this.designId).subscribe(response => {
                            this.utils.hideLoading().then(() => {
                                if (this.logoSelected) {
                                    this.updateLogo();
                                }
                                if (newConstruction == 'true') {
                                    this.uploaarchitecturedesign(response, 'architecturaldesign');
                                }
                                else {
                                    if (this.attachmentFileUpload) {
                                        this.uploadpreliumdesign(response, 'attachments');
                                    }
                                    else {
                                        this.utils.showSnackBar('Design have been updated');
                                        this.utils.setDesignDetailsRefresh(true);
                                        this.navController.pop();
                                    }
                                }
                                if (this.isArcFileDelete) {
                                    this.deleteArcFile(this.indexOfArcFiles);
                                }
                            });
                        }, responseError => {
                            this.utils.hideLoading().then(() => {
                                const error = responseError.error;
                                this.utils.errorSnackBar(error.message[0].messages[0].message);
                            });
                        });
                    });
                }
                else if (this.send === _model_constants__WEBPACK_IMPORTED_MODULE_8__["ScheduleFormEvent"].SEND_SALES_FORM) {
                    postData = {
                        company: this.desginForm.get('company').value,
                        name: this.desginForm.get('name').value,
                        email: this.desginForm.get('email').value,
                        solarmake: this.desginForm.get('solarmake').value,
                        solarmodel: this.desginForm.get('solarmodel').value,
                        invertermake: this.desginForm.get('invertermake').value,
                        invertermodel: this.desginForm.get('invertermodel').value,
                        monthlybill: this.desginForm.get('monthlybill').value,
                        address: this.desginForm.get('address').value,
                        createdby: this.desginForm.get('createdby').value,
                        assignedto: this.desginForm.get('assignedto').value,
                        rooftype: this.desginForm.get('rooftype').value,
                        //prelimdesign: new FormControl(null),
                        architecturaldesign: this.desginForm.get('architecturaldesign').value,
                        tiltgroundmount: this.desginForm.get('tiltgroundmount').value,
                        mountingtype: this.desginForm.get('mountingtype').value,
                        // jobtype: new FormControl('', [Validators.required]),
                        projecttype: this.desginForm.get('projecttype').value,
                        newconstruction: this.desginForm.get('newconstruction').value,
                        source: this.desginForm.get('source').value,
                        comments: this.desginForm.get('comments').value,
                        requesttype: this.desginForm.get('requesttype').value,
                        latitude: this.desginForm.get('latitude').value,
                        longitude: this.desginForm.get('longitude').value,
                        country: this.desginForm.get('country').value,
                        state: this.desginForm.get('state').value,
                        city: this.desginForm.get('city').value,
                        postalcode: this.desginForm.get('postalcode').value,
                        status: this.desginForm.get('status').value,
                        attachments: this.desginForm.get('attachments').value,
                        deliverydate: this.desginForm.get('deliverydate').value,
                        outsourcedto: this.desginForm.get('outsourcedto').value,
                        isoutsourced: this.desginForm.get('isoutsourced').value,
                        designacceptancestarttime: this.desginForm.get('designacceptancestarttime').value,
                        creatorparentid: this.desginForm.get('creatorparentid').value,
                        //isonpriority:new FormControl('false'),
                        paymentstatus: this.desginForm.get('paymentstatus').value,
                        paymenttype: this.desginForm.get('paymenttype').value,
                        utility: this.selectedUtilityId,
                        utilityrate: this.selectedUtilityRateId,
                        annualutilityescalation: this.desginForm.get('annualutilityescalation').value,
                        incentive: this.desginForm.get('incentive').value,
                        costofsystem: this.desginForm.get('costofsystem').value,
                        personname: this.desginForm.get('personname').value,
                        requirementtype: this.desginForm.get('requirementtype').value,
                    };
                    this.apiService.updateDesignForm(postData, this.designId).subscribe(response => {
                        this.utils.hideLoading().then(() => {
                            if (this.logoSelected) {
                                this.updateLogo();
                            }
                            if (newConstruction == 'true') {
                                this.uploaarchitecturedesign(response, 'architecturaldesign');
                            }
                            else {
                                if (this.attachmentFileUpload) {
                                    this.uploadpreliumdesign(response, 'attachments');
                                }
                                else {
                                    let objToSend = {
                                        queryParams: {
                                            id: response.id,
                                            designData: "prelim",
                                            fulldesigndata: response,
                                        },
                                        skipLocationChange: false,
                                        fragment: 'top'
                                    };
                                    this.router.navigate(['/payment-modal'], {
                                        state: { productdetails: objToSend }
                                    });
                                }
                            }
                            if (this.isArcFileDelete) {
                                console.log("hello");
                                this.deleteArcFile(this.indexOfArcFiles);
                            }
                            // this.utils.hideLoading().then(() => {
                            //   console.log('Res', response);
                            //   this.value=response.id;
                            //   this.utils.showSnackBar('Design have been updated');
                            //   //this.router.navigate(["payment-modal",{id:response.id,designData:"prelim"}]);
                        });
                    }, responseError => {
                        this.utils.hideLoading().then(() => {
                            const error = responseError.error;
                            this.utils.errorSnackBar(error.message[0].messages[0].message);
                        });
                    });
                }
            }
        }
        else {
            if (this.desginForm.value.name == '' || this.desginForm.get('name').hasError('pattern')) {
                this.utils.errorSnackBar('Please check the field name.');
            }
            else if (this.desginForm.value.email == '' || this.desginForm.get('email').hasError('pattern')) {
                this.utils.errorSnackBar('Please check the field email.');
            }
            else if (this.desginForm.value.monthlybill == '' || this.desginForm.get('monthlybill').hasError('pattern')) {
                this.utils.errorSnackBar('Please check the field annual units.');
            }
            else if (this.desginForm.value.solarmake == '' || this.desginForm.get('solarmake').hasError('pattern')) {
                this.utils.errorSnackBar('Please check the field module make.');
            }
            else if (this.desginForm.value.solarmodel == '' || this.desginForm.get('solarmodel').hasError('pattern')) {
                this.utils.errorSnackBar('Please check the field module model.');
            }
            else if (this.desginForm.value.invertermake == '' || this.desginForm.get('invertermake').hasError('pattern')) {
                this.utils.errorSnackBar('Please check the field inverter make.');
            }
            else if (this.desginForm.value.invertermodel == '' || this.desginForm.get('invertermodel').hasError('pattern')) {
                this.utils.errorSnackBar('Please check the field inverter model.');
            }
            else if (this.desginForm.value.utility == '' || this.desginForm.get('utility').hasError('pattern')) {
                this.utils.errorSnackBar('Please check the field utility name.');
            }
            else if (this.desginForm.value.utilityrate == '' || this.desginForm.get('utilityrate').hasError('pattern')) {
                this.utils.errorSnackBar('Please check the field utility rate.');
            }
            else if (this.desginForm.value.mountingtype == '') {
                this.utils.errorSnackBar('Please fill the mounting type.');
            }
            else if (this.desginForm.value.annualutilityescalation == '') {
                this.utils.errorSnackBar('Please fill the annual utility escalation.');
            }
            else if (this.desginForm.value.incentive == '') {
                this.utils.errorSnackBar('Please fill the incentive.');
            }
            else if (this.desginForm.value.costofsystem == '') {
                this.utils.errorSnackBar('Please fill the cost of system');
            }
            else if (this.desginForm.value.personname == '') {
                this.utils.errorSnackBar('Please fill the representative name.');
            }
            else if (this.desginForm.value.mountingtype == '') {
                this.utils.errorSnackBar('Please fill the mounting type.');
            }
            else if (this.desginForm.value.projecttype == '') {
                this.utils.errorSnackBar('Please fill the project type.');
            }
            else if (this.desginForm.value.tiltgroundmount == '' || this.desginForm.get('tiltgroundmount').hasError('pattern')) {
                this.utils.errorSnackBar('Please check the field tilt for ground mount.');
            }
            else if (this.desginForm.value.rooftype == '') {
                this.utils.errorSnackBar('Please fill the rooftype.');
            }
            else if (this.desginForm.value.architecturaldesign == '') {
                this.utils.errorSnackBar('Please attach architectural design.');
            }
            else {
                this.utils.errorSnackBar('Address not found. Make sure location is on on device.');
            }
        }
    }
    showInvalidFormAlert() {
        let error = '';
        Object.keys(this.desginForm.controls).forEach((key) => {
            const control = this.desginForm.get(key);
            if (control.invalid) {
                if (error !== '') {
                    error = error + '<br/>';
                }
                if (control.errors.required === true) {
                    error = error + this.utils.capitalizeWord(key) + ' is required';
                }
                if (control.errors.email === true) {
                    error = error + 'Invalid email';
                }
                if (control.errors.error !== null && control.errors.error !== undefined) {
                    error = error + control.errors.error;
                }
            }
        });
        console.log(this.desginForm.value);
        this.utils.showAlert(error);
    }
    getAssignees() {
        this.apiService.getDesigners().subscribe(assignees => {
            this.listOfAssignees = [];
            // this.listOfAssignees.push(this.utils.getDefaultAssignee(this.storage.getUserID()));
            assignees.forEach(item => this.listOfAssignees.push(item));
            console.log(this.listOfAssignees);
        });
    }
    getSolarMade() {
        this.utils.showLoading('Getting module models').then((success) => {
            this.apiService.getSolarMade(this.desginForm.get('solarmake').value).subscribe(response => {
                this.utils.hideLoading().then(() => {
                    console.log(response);
                    this.listOfSolarMade = response;
                    this.desginForm.patchValue({
                        solarmodel: ''
                    });
                });
            }, responseError => {
                this.utils.hideLoading();
                const error = responseError.error;
                this.utils.errorSnackBar(error.message[0].messages[0].message);
            });
            // }, (error) => {
        });
    }
    ioniViewDidEnter() {
    }
    getSolarMake() {
        this.getInverterMake();
        this.apiService.getSolarMake().subscribe(response => {
            this.listOfSolarMake = response;
        }, responseError => {
            const error = responseError.error;
            console.log(error);
            this.utils.errorSnackBar(error.message[0].messages[0].message);
        });
    }
    getInverterMade() {
        console.log(this.desginForm.get('invertermake').value);
        this.utils.showLoading('Getting inverter models').then((success) => {
            this.apiService.getInverterMade(this.desginForm.get('invertermake').value).subscribe(response => {
                this.utils.hideLoading().then(() => {
                    console.log(response);
                    this.listOfInverterMade = response;
                    this.desginForm.patchValue({
                        invertermodel: ''
                    });
                });
            }, responseError => {
                this.utils.hideLoading();
                const error = responseError.error;
                this.utils.errorSnackBar(error.message[0].messages[0].message);
            });
            // }, (reject) => {
        });
    }
    getInverterMake() {
        this.apiService.getInverterMake().subscribe(response => {
            console.log(response);
            this.listOfInverterMake = response;
        }, responseError => {
            const error = responseError.error;
            this.utils.errorSnackBar(error.message[0].messages[0].message);
        });
    }
    eventcheck(e) {
        this.showValue = e.target.value;
        console.log(this.showValue);
    }
    showUpload(e) {
        this.uploadbox = e.target.value;
    }
    files(event) {
        console.log(event.target.files);
        for (var i = 0; i < event.target.files.length; i++) {
            this.archFiles.push(event.target.files[i]);
        }
        console.log(this.archFiles);
    }
    prelimfiles(event) {
        console.log(event.target.files);
        for (var i = 0; i < event.target.files.length; i++) {
            this.prelimFiles.push(event.target.files[i]);
        }
        this.attachmentFileUpload = true;
        if (this.prelimFiles.length == 1) {
            this.fileName = event.target.files[0].name;
            console.log(this.fileName);
        }
        else if (this.prelimFiles.length > 1) {
            this.fileName = this.prelimFiles.length;
        }
        else {
            this.fileName = '';
        }
    }
    uploaarchitecturedesign(response, key) {
        console.log(this.archFiles);
        const imageData = new FormData();
        for (var i = 0; i < this.archFiles.length; i++) {
            imageData.append("files", this.archFiles[i]);
            if (i == 0) {
                imageData.append('path', 'designs/' + response.id);
                imageData.append('refId', response.id + '');
                imageData.append('ref', 'design');
                imageData.append('field', key);
            }
        }
        this.utils.showLoading("Architectural File Uploading").then(() => {
            this.apiService.uploaddesign(imageData).subscribe(res => {
                console.log(res);
                this.utils.hideLoading();
                if (this.attachmentFileUpload) {
                    this.uploadpreliumdesign(response, 'attachments');
                }
                else {
                    if (this.send === _model_constants__WEBPACK_IMPORTED_MODULE_8__["ScheduleFormEvent"].SAVE_DESIGN_FORM) {
                        this.router.navigate(['/homepage/design']);
                        if (this.designId == 0) {
                            this.utils.showSnackBar('Design have been saved');
                        }
                        else {
                            this.utils.showSnackBar('Design have been updated');
                        }
                        this.utils.setHomepageDesignRefresh(true);
                    }
                    else {
                        let objToSend = {
                            queryParams: {
                                id: response.id,
                                designData: "prelim",
                                fulldesigndata: response
                            },
                            skipLocationChange: false,
                            fragment: 'top'
                        };
                        this.router.navigate(['/payment-modal'], {
                            state: { productdetails: objToSend }
                        });
                    }
                }
            }, responseError => {
                this.utils.hideLoading();
                const error = responseError.error;
                this.utils.errorSnackBar(error.message[0].messages[0].message);
            });
        });
    }
    uploadpreliumdesign(response, key, filearray) {
        console.log(this.prelimFiles);
        const imageData = new FormData();
        for (var i = 0; i < this.prelimFiles.length; i++) {
            imageData.append("files", this.prelimFiles[i]);
            if (i == 0) {
                imageData.append('path', 'designs/' + response.id);
                imageData.append('refId', response.id + '');
                imageData.append('ref', 'design');
                imageData.append('field', key);
            }
        }
        this.utils.showLoading("Attachment File Uploading").then(() => {
            this.apiService.uploaddesign(imageData).subscribe(res => {
                console.log(res);
                this.utils.hideLoading();
                if (this.send === _model_constants__WEBPACK_IMPORTED_MODULE_8__["ScheduleFormEvent"].SAVE_DESIGN_FORM) {
                    this.router.navigate(['/homepage/design']);
                    if (this.designId == 0) {
                        this.utils.showSnackBar('Design have been saved');
                    }
                    else {
                        this.utils.showSnackBar('Design have been updated');
                    }
                    this.utils.setHomepageDesignRefresh(true);
                }
                else {
                    let objToSend = {
                        queryParams: {
                            id: response.id,
                            designData: "prelim",
                            fulldesigndata: response
                        },
                        skipLocationChange: false,
                        fragment: 'top'
                    };
                    this.router.navigate(['/payment-modal'], {
                        state: { productdetails: objToSend }
                    });
                }
            }, responseError => {
                this.utils.hideLoading();
                //this.utils.hideUploadingLoading();
                const error = responseError.error;
                this.utils.errorSnackBar(error.message[0].messages[0].message);
            });
        });
    }
    updateLogo() {
        this.apiService.uploadlogo(this.blob, this.uploadLogo).subscribe(res => {
            console.log(res);
            this.apiService.updateUser(this.userId, this.uploadLogo).subscribe((res) => {
                console.log('updated', res);
                let token = this.storage.getJWTToken();
                this.storage.setUser(res, token);
            });
        });
    }
    // pickarchitecturaldesign(){
    //   this.camera.getPicture(this.options).then((imageData) => {
    //     let base64Image = 'data:image/jpeg;base64,' + imageData;
    //     let blob = this.utils.b64tBlob(base64Image);
    //     let filename = Date.now().toString() + '.png';
    //     this.utils.showLoading('Uploading').then(()=>{
    //       this.apiService.uploaddesign(designId, key, blob, filename).subscribe(()=>{
    //       })
    //     })
    //   })
    // }
    removeArc(i) {
        this.archFiles.splice(i, 1);
    }
    removePrelim(i) {
        this.prelimFiles.splice(i, 1);
    }
    sendtowattmonk() {
        var designacceptancestarttime = new Date();
        designacceptancestarttime.setMinutes(designacceptancestarttime.getMinutes() + 15);
        const postData = {
            outsourcedto: 232,
            isoutsourced: "true",
            status: "outsourced",
            designacceptancestarttime: designacceptancestarttime,
            paymenttype: this.utils.getPaymentMode().value,
            couponid: this.utils.getCouponId().value
        };
        this.utils.showLoading('Assigning').then(() => {
            //this.newprelimsRef.update({ count: this.newprelimscount + 1});
            this.apiService.updateDesignForm(postData, /*this.desginForm.get('id').value*/ this.value).subscribe((value) => {
                this.utils.hideLoading().then(() => {
                    ;
                    console.log('reach ', value);
                    this.utils.showSnackBar('Design request has been assigned to wattmonk successfully'); //.firstname +" "+this.selectedDesigner.lastname + ' ' + 'successfully');
                    this.router.navigate(['/homepage/design']);
                    this.utils.setHomepageDesignRefresh(true);
                });
            }, (error) => {
                this.utils.hideLoading();
            });
        });
    }
    Pay() {
        if (this.desginForm.status === 'VALID') {
            //this.router.navigate(["payment-modal",{designData:"prelim"}]);
            let objToSend = {
                queryParams: {
                    //id:response.id,
                    designData: "prelim"
                },
                skipLocationChange: false,
                fragment: 'top'
            };
            this.router.navigate(['/payment-modal'], {
                state: { productdetails: objToSend }
            });
        }
        else {
            if (this.desginForm.value.name == '' || this.desginForm.get('name').hasError('pattern')) {
                this.utils.errorSnackBar('Please check the field name.');
            }
            else if (this.desginForm.value.email == '' || this.desginForm.get('email').hasError('pattern')) {
                this.utils.errorSnackBar('Please check the field email.');
            }
            else if (this.desginForm.value.monthlybill == '' || this.desginForm.get('monthlybill').hasError('pattern')) {
                this.utils.errorSnackBar('Please check the field annual units.');
            }
            else if (this.desginForm.value.modulemake == '' || this.desginForm.get('modulemake').hasError('pattern')) {
                this.utils.errorSnackBar('Please check the field module make.');
            }
            else if (this.desginForm.value.modulemodel == '' || this.desginForm.get('modulemodel').hasError('pattern')) {
                this.utils.errorSnackBar('Please check the field module model.');
            }
            else if (this.desginForm.value.invertermake == '' || this.desginForm.get('invertermake').hasError('pattern')) {
                this.utils.errorSnackBar('Please check the field inverter make.');
            }
            else if (this.desginForm.value.invertermodel == '' || this.desginForm.get('invertermodel').hasError('pattern')) {
                this.utils.errorSnackBar('Please check the field inverter model.');
            }
            else if (this.desginForm.value.mountingtype == '') {
                this.utils.errorSnackBar('Please fill the mounting type.');
            }
            else if (this.desginForm.value.projecttype == '') {
                this.utils.errorSnackBar('Please fill the project type.');
            }
            else if (this.desginForm.value.tiltgroundmount == '' || this.desginForm.get('tiltgroundmount').hasError('pattern')) {
                this.utils.errorSnackBar('Please check the field tilt for ground mount.');
            }
            else if (this.desginForm.value.rooftype == '') {
                this.utils.errorSnackBar('Please fill the rooftype.');
            }
            else if (this.desginForm.value.architecturaldesign == []) {
                this.utils.errorSnackBar('Please attach architectural design.');
            }
            else {
                this.utils.errorSnackBar('Address not found. Make sure location is on on device.');
            }
        }
    }
    createChatGroup(design) {
        var GUID = 'prelim' + "_" + new Date().getTime();
        var address = design.address.substring(0, 60);
        var groupName = design.name + "_" + address;
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
    gettingClients() {
        this.apiService.getClients().subscribe(res => {
            this.getCompanies = res;
            console.log(this.getCompanies);
            this.filteredCompanies = this.desginForm.get('companyname').valueChanges.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_14__["startWith"])(""), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_14__["map"])(value => (typeof value === "string" ? value : value.companyid)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_14__["map"])(companyname => (companyname ? this._filterCompanies(companyname) : this.getCompanies.slice())));
        }, error => {
            this.utils.errorSnackBar("Error");
        });
    }
    onCompanyChanged(event$) {
        console.log(event$);
        this.proxyValue = event$.detail.value.companyname;
        this.designCreatedBy = event$.detail.value.companyid;
        this.designCreatedByUserParent = event$.detail.value.parentid;
        if (this.designCreatedBy !== null && this.designCreatedByUserParent !== null) {
            var designacceptancestarttime = new Date();
            designacceptancestarttime.setMinutes(designacceptancestarttime.getMinutes() + 15);
            console.log(designacceptancestarttime);
            this.desginForm.patchValue({ createdby: this.designCreatedBy,
                creatorparentid: this.designCreatedByUserParent,
                status: "outsourced",
                outsourcedto: "232",
                isoutsourced: "true",
                designacceptancestarttime: designacceptancestarttime });
        }
    }
    _filterCompanies(companyname) {
        return this.getCompanies.filter(company => company.companyname.toLowerCase().indexOf(companyname) != -1);
    }
    onRangeChangeHandler() {
        this.number = this.desginForm.get('annualutilityescalation').value;
        console.log(this.number);
        if (this.desginForm.get('annualutilityescalation').value > 0 && this.desginForm.get('annualutilityescalation').value < 1) {
            this.color = 'dark';
        }
        else if (this.desginForm.get('annualutilityescalation').value > 2 && this.desginForm.get('annualutilityescalation').value < 3) {
            this.color = 'primary';
        }
        else if (this.desginForm.get('annualutilityescalation').value > 3 && this.desginForm.get('annualutilityescalation').value < 4) {
            this.color = 'secondary';
        }
        else {
            this.color = 'danger';
        }
    }
};
SalesproposalComponent.ctorParameters = () => [
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"] },
    { type: src_app_api_service__WEBPACK_IMPORTED_MODULE_5__["ApiService"] },
    { type: src_app_utilities_service__WEBPACK_IMPORTED_MODULE_6__["UtilitiesService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_7__["NavController"] },
    { type: _storage_service__WEBPACK_IMPORTED_MODULE_9__["StorageService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_10__["ActivatedRoute"] },
    { type: _ionic_native_Camera_ngx__WEBPACK_IMPORTED_MODULE_11__["Camera"] },
    { type: _ionic_native_file_ngx__WEBPACK_IMPORTED_MODULE_12__["File"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_10__["Router"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ChangeDetectorRef"] }
];
SalesproposalComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-salesproposal',
        template: _raw_loader_salesproposal_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_salesproposal_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], SalesproposalComponent);



/***/ }),

/***/ "rAzX":
/*!*********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/schedule/survey/survey.component.html ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-content class=\"ion-padding-start ion-padding-end ion-padding-bottom\" style=\"height:650px\" >\r\n    <form [formGroup]=\"surveyForm\">\r\n        <ion-grid style=\"position: relative;margin-top: 30px;\">\r\n            <!-- <ion-row *ngIf=\"address !== ''\">\r\n                <ion-col>\r\n                    {{address}}\r\n                </ion-col>\r\n         \r\n            </ion-row>\r\n            <ion-row *ngIf=\"address == ''\">\r\n                <ion-col>\r\n                Address not found.\r\n                </ion-col>\r\n         \r\n            </ion-row> -->\r\n            <ion-row>\r\n                <ion-col>\r\n                    <ion-item class=\"ion-no-padding\">\r\n                        <ion-label position=\"floating\">Name*</ion-label>\r\n                        <ion-input type=\"text\" class=\"form_input\" autocapitalize=\"words\"\r\n                                   formControlName=\"name\"></ion-input>\r\n                    </ion-item>\r\n                    <div style=\"height: 5px;\">\r\n                        <div *ngIf=\"surveyForm.get('name').hasError('pattern') && surveyForm.get('name').dirty\">\r\n                            <span class=\"error\">{{nameError}}</span>\r\n                        </div>\r\n                        <div *ngIf=\"surveyForm.get('name').value === '' && surveyForm.get('name').dirty\">\r\n                            <span class=\"error\">{{fieldRequired}}</span>\r\n                        </div>\r\n                    </div>\r\n                </ion-col>\r\n            </ion-row>\r\n            <ion-row>\r\n                <ion-col>\r\n                    <ion-item class=\"ion-no-padding\">\r\n                        <ion-label position=\"floating\">Email</ion-label>\r\n                        <ion-input autocapitalize=\"none\" formControlName=\"email\" email=\"true\"\r\n                                   type=\"email\" autocomplete=\"off\"\r\n                                   class=\"form_input\"></ion-input>\r\n                    </ion-item>\r\n                    <div style=\"height: 5px;\">\r\n                        <div *ngIf=\"surveyForm.get('email').hasError('pattern') && surveyForm.get('email').dirty\">\r\n                            <span class=\"error\">{{emailError}}</span>\r\n                        </div>\r\n                        <!--<div *ngIf=\"surveyForm.get('email').value === '' && surveyForm.get('email').dirty\">\r\n                            <span class=\"error\">{{fieldRequired}}</span>\r\n                        </div>-->\r\n                    </div>\r\n                </ion-col>\r\n            </ion-row>\r\n\r\n            <ion-row>\r\n                <ion-col>\r\n                    <ion-item class=\"ion-no-padding\">\r\n                        <ion-label position=\"floating\">Phone*</ion-label>\r\n                        <ion-input formControlName=\"phonenumber\" type=\"tel\"\r\n                                   class=\"form_input\" maxLength=\"15\"></ion-input>\r\n                    </ion-item>\r\n                    <div style=\"height: 5px;\">\r\n                        <div *ngIf=\"surveyForm.get('phonenumber').hasError('pattern') && surveyForm.get('phonenumber').dirty\">\r\n                            <span class=\"error\">{{phoneError}}</span>\r\n                        </div>\r\n                    <!--    <div *ngIf=\"surveyForm.get('phone').value === '' && surveyForm.get('phone').dirty\">\r\n                            <span class=\"error\">{{fieldRequired}}</span>\r\n                        </div>-->\r\n                    </div>\r\n                </ion-col>\r\n            </ion-row>\r\n\r\n            <ion-row>\r\n                <ion-col>\r\n                    <ion-item class=\"ion-no-padding\">\r\n                        <ion-label style=\"display: none;\">Job Type</ion-label>\r\n                        <ion-select class=\"form_input select_div\" placeholder=\"job type\"\r\n                                    ok-text=\"\"\r\n                                    cancel-text=\"\"\r\n                                    formControlName=\"jobtype\" interface=\"popover\">\r\n<!--                            <ion-select-option value=\"pvbattery\">PV+Battery</ion-select-option>-->\r\n<!--                            <ion-select-option value=\"battery\">Battery</ion-select-option>-->\r\n                            <ion-select-option value=\"pv\">PV</ion-select-option>\r\n                        </ion-select>\r\n                    </ion-item>\r\n                </ion-col>\r\n            </ion-row>\r\n\r\n            <ion-row class=\"ion-margin-top\">\r\n                <ion-col>\r\n                    <ion-item class=\"ion-no-padding no-border\" lines=\"none\">\r\n                        <app-date-time formControlName=\"surveydatetime\" placeholder=\"date and time\"\r\n                                       required=\"false\"></app-date-time>\r\n                    </ion-item>\r\n                </ion-col>\r\n            </ion-row>\r\n\r\n            <ion-row class=\"ion-margin-top\">\r\n                <ion-col size=\"12\" class=\"ion-no-padding\">\r\n                    <span class=\"input-placeholder\">comments</span>\r\n                </ion-col>\r\n                <ion-col size=\"12\" class=\"ion-no-padding\">\r\n                    <ion-textarea class=\"ion-no-margin ion-no-padding comment_box\" rows=\"3\"\r\n                                  formControlName=\"comments\"></ion-textarea>\r\n                </ion-col>\r\n            </ion-row>\r\n\r\n            <!-- <ion-row class=\"ion-margin-top\">\r\n                <ion-col>\r\n                    <ion-item class=\"ion-no-padding no-border\" lines=\"none\">\r\n                        <app-user-selector formControlName=\"assignedto\" placeholder=\"assign\"\r\n                                           [assignees]=\"listOfAssignees\"></app-user-selector>\r\n                    </ion-item>\r\n                </ion-col>\r\n            </ion-row> -->\r\n\r\n        </ion-grid>\r\n    </form>\r\n\r\n</ion-content>\r\n");

/***/ }),

/***/ "sZ5U":
/*!***********************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/schedule/schedule.page.html ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- <ion-content scroll=\"false\"> -->\r\n    <!-- <ion-grid style=\"overflow:hidden;\" scroll=\"false\"> -->\r\n        <ion-row class=\"ion-align-items-center ion-padding-start\">\r\n            <ion-col>\r\n                <h5 class=\"ion-no-padding ion-no-margin\" style=\"font-weight: bolder;\" *ngIf=\"!tabsDisabled && router.url=='/schedule/design'\">Add Site Assessment</h5>\r\n                <h5 class=\"ion-no-padding ion-no-margin\" style=\"font-weight: bolder;\" *ngIf=\"!tabsDisabled && router.url=='/schedule/salesproposal'\">Add Sales Proposal</h5>\r\n                <h5 class=\"ion-no-padding ion-no-margin\" style=\"font-weight: bolder;\" *ngIf=\"!tabsDisabled && router.url=='/schedule/survey'\">Schedule Survey</h5>\r\n                <h4 class=\"ion-no-padding ion-no-margin\" *ngIf=\"tabsDisabled\">Edit </h4>\r\n            </ion-col>\r\n            <ion-col size=\"auto\">\r\n                <ion-button fill=\"clear\" size=\"small\" class=\"ion-no-padding\" (click)=\"goBack()\">\r\n                    <ion-icon name=\"close-outline\" style=\"color: dimgrey;\" size=\"large\"></ion-icon>\r\n                </ion-button>\r\n                <!-- <ion-buttons slot=\"start\">\r\n                    <ion-back-button></ion-back-button>\r\n                </ion-buttons> -->\r\n            </ion-col>\r\n        </ion-row>\r\n        <!-- <ion-row class=\"ion-padding-start ion-padding-end\">\r\n            <ion-col *ngIf=\"address !== '' \">\r\n                <span class=\"address-text\">\r\n                    {{address}}\r\n                </span>\r\n            </ion-col>\r\n            <ion-col *ngIf=\"address === '' \">\r\n                <span>\r\n                    No address found\r\n                </span>\r\n            </ion-col>\r\n        </ion-row> -->\r\n        <!-- <ion-row class=\"ion-padding-start ion-padding-end\">\r\n            <ion-col class=\"ion-text-end\" *ngIf=\"!tabsDisabled\">\r\n                <span [routerLink]=\"['/map-page']\" routerDirection=\"forward\" style=\"color: #4E6FB0;\">\r\n                    Change\r\n                </span>\r\n            </ion-col>\r\n            <ion-col class=\"ion-text-end\" *ngIf=\"tabsDisabled\">\r\n                <span class=\"edit_span\">\r\n                    Change\r\n                </span>\r\n            </ion-col>\r\n        </ion-row> -->\r\n    <!-- </ion-grid> -->\r\n\r\n    <!-- <ion-grid class=\"ion-margin-start ion-margin-end\" style=\"overflow:hidden;\" scroll=\"false\"> -->\r\n        <!-- <ion-segment mode=\"ios\" class=\"segments\" (ionChange)=\"segmentChanged($event)\" [value]=\"currentTab\"\r\n            [disabled]=\"tabsDisabled\">\r\n            <ion-segment-button value=\"design\">\r\n                <ion-label>Design</ion-label>\r\n            </ion-segment-button>\r\n            <ion-segment-button value=\"survey\">\r\n                <ion-label>Survey</ion-label>\r\n            </ion-segment-button>\r\n        </ion-segment> -->\r\n    <!-- </ion-grid> -->\r\n    <ion-content >\r\n        <ion-tabs #tabs>\r\n            <!-- <ion-tab-bar slot=\"top\" style=\"display:none;\" >\r\n                <ion-tab-button tab=\"design\">\r\n                    <ion-label>Design</ion-label>\r\n                </ion-tab-button>\r\n\r\n                <ion-tab-button tab=\"survey\">\r\n                    <ion-label>Survey</ion-label>\r\n                </ion-tab-button>\r\n            </ion-tab-bar> -->\r\n        </ion-tabs>\r\n        <!-- <ion-grid> -->\r\n            <!-- <ion-row class=\"ion-padding-start ion-padding-end mrT\"  style=\"background: #ffffff;\">\r\n                <ion-col size=\"9\" [ngClass]=\"address.length > 20 ? 'font_10' : 'font_12'\" style=\"background: #ffffff;\">\r\n                    <p></p>\r\n                    \r\n                    <b>{{address == \"\" ? \"No Address Found\" : address}}</b>\r\n                    \r\n                </ion-col>\r\n              \r\n                <ion-col class=\"ion-text-end\" *ngIf=\"!tabsDisabled\" size=\"3\">\r\n                    <p></p>\r\n                    <span [routerLink]=\"['/map-page']\" routerDirection=\"forward\" style=\"color: #4E6FB0;\">\r\n                        Change\r\n                    </span>\r\n                </ion-col>\r\n                <ion-col class=\"ion-text-end\" *ngIf=\"tabsDisabled\" size=\"3\">\r\n                    <p></p>\r\n                    <span   style=\"color:grey;\">\r\n                        Change\r\n                    </span>\r\n                </ion-col>\r\n            </ion-row> -->\r\n\r\n        <!-- </ion-grid> -->\r\n    </ion-content>\r\n<!-- </ion-content> -->\r\n\r\n<ion-footer class=\"ion-no-border white-bg\">\r\n    <ion-grid *ngIf=\"currentTab === 'design' || currentTab==='salesproposal'\">\r\n        <ion-row>\r\n            <ion-col></ion-col>\r\n            <ion-col size=\"auto\">\r\n                <ion-button class=\"action-button-color\" fill=\"clear\" (click)=\"saveDesignForm()\">Save</ion-button>\r\n                <ion-button class=\"action-button-color\" *ngIf=\"(userdata.role.type=='clientsuperadmin' || userdata.role.type=='clientadmin')&& ((designs && designs.status != 'requestdeclined') || designs==null)\" fill=\"clear\" (click)=\"sendDesignForm()\">Send to Wattmonk</ion-button>\r\n            </ion-col>\r\n        </ion-row>\r\n    </ion-grid>\r\n    <ion-grid *ngIf=\"currentTab === 'survey'\">\r\n        <ion-row>\r\n            <ion-col size=\"auto\">\r\n                <ion-button class=\"action-button-color\" fill=\"clear\" (click)=\"saveSurveyForm()\">Save</ion-button>\r\n            </ion-col>\r\n            <ion-col></ion-col>\r\n            <ion-col size=\"auto\" *ngIf=\"userdata.role.type !=='wattmonkadmins' && userdata.role.type !=='clientsuperadmin'\">\r\n                <ion-button class=\"action-button-color\" fill=\"clear\" (click)=\"startSurvey()\">Start Survey</ion-button>\r\n            </ion-col>\r\n        </ion-row>\r\n    </ion-grid>\r\n</ion-footer>\r\n");

/***/ })

}]);
//# sourceMappingURL=schedule-schedule-module.js.map