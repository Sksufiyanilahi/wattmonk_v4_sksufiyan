(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["onboarding-onboarding-module"],{

/***/ "Illq":
/*!*************************************************!*\
  !*** ./src/app/onboarding/onboarding.page.scss ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".margin {\n  margin-top: 0px;\n}\n\n.font {\n  font-size: 10px;\n}\n\nion-toggle {\n  padding-right: 14px;\n}\n\nion-radio {\n  margin-top: 0px;\n  margin-right: 5px;\n}\n\n.colorChange {\n  color: #3c78d8;\n}\n\n::ng-deep.mat-step-header .mat-step-label.mat-step-label-active {\n  color: rgba(0, 0, 0, 0.87) !important;\n  font-size: large !important;\n}\n\n.clickEnableCls {\n  pointer-events: visible !important;\n}\n\nion-label {\n  color: #6C6C6C !important;\n}\n\nion-card-content {\n  position: relative;\n  overflow: hidden;\n  overflow-y: auto;\n}\n\nion-card-content ::-webkit-scrollbar {\n  display: none;\n}\n\n.mat-stepper-horizontal {\n  margin-top: 8px;\n}\n\n.mat-form-field {\n  margin-top: 16px;\n}\n\n.bottomrow {\n  background: #3f51b5;\n  color: #fff;\n  padding: 5px;\n}\n\n.error {\n  color: #df3e3e;\n  font-size: 11px;\n}\n\ninput[type=file] {\n  visibility: hidden;\n}\n\nion-checkbox {\n  margin-top: 0px;\n  margin-right: 10px;\n  margin-bottom: 0px;\n}\n\n.alignment {\n  margin-top: 0.3rem;\n  font: -webkit-small-control;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXG9uYm9hcmRpbmcucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksZUFBQTtBQUNKOztBQUVBO0VBQ0UsZUFBQTtBQUNGOztBQUVBO0VBQ0UsbUJBQUE7QUFDRjs7QUFFQTtFQUNFLGVBQUE7RUFDQSxpQkFBQTtBQUNGOztBQUVBO0VBQ0UsY0FBQTtBQUNGOztBQUVBO0VBQ0UscUNBQUE7RUFDQSwyQkFBQTtBQUNGOztBQU9BO0VBQ0ksa0NBQUE7QUFKSjs7QUFNQztFQUNHLHlCQUFBO0FBSEo7O0FBTUU7RUFDRSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsZ0JBQUE7QUFISjs7QUFJSTtFQUNFLGFBQUE7QUFGTjs7QUFNRTtFQUNFLGVBQUE7QUFISjs7QUFNRTtFQUNFLGdCQUFBO0FBSEo7O0FBS0U7RUFDRSxtQkFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0FBRko7O0FBS0U7RUFDRSxjQUFBO0VBQ0EsZUFBQTtBQUZKOztBQUlFO0VBQ0Usa0JBQUE7QUFESjs7QUFHRTtFQUNFLGVBQUE7RUFDQSxrQkFBQTtFQUNBLGtCQUFBO0FBQUo7O0FBR0U7RUFDRSxrQkFBQTtFQUNBLDJCQUFBO0FBQUoiLCJmaWxlIjoib25ib2FyZGluZy5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubWFyZ2lue1xyXG4gICAgbWFyZ2luLXRvcDogMHB4O1xyXG5cclxufVxyXG4uZm9udHtcclxuICBmb250LXNpemU6IDEwcHg7XHJcbn1cclxuXHJcbmlvbi10b2dnbGV7XHJcbiAgcGFkZGluZy1yaWdodDogMTRweDtcclxufVxyXG5cclxuaW9uLXJhZGlve1xyXG4gIG1hcmdpbi10b3A6IDBweDtcclxuICBtYXJnaW4tcmlnaHQ6IDVweDtcclxufVxyXG5cclxuLmNvbG9yQ2hhbmdle1xyXG4gIGNvbG9yOiAjM2M3OGQ4O1xyXG59XHJcblxyXG46Om5nLWRlZXAubWF0LXN0ZXAtaGVhZGVyIC5tYXQtc3RlcC1sYWJlbC5tYXQtc3RlcC1sYWJlbC1hY3RpdmUge1xyXG4gIGNvbG9yOiByZ2JhKDAsMCwwLC44NykgIWltcG9ydGFudDtcclxuICBmb250LXNpemU6IGxhcmdlICFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbi8vIC5jYXJkLWNvbnRlbnR7XHJcbi8vICAgIC8vIHBhZGRpbmc6IDBweCAxNnB4O1xyXG4vLyAgICAgbWF4LWhlaWdodDogMHB4O1xyXG4vLyB9XHJcblxyXG4uY2xpY2tFbmFibGVDbHN7XHJcbiAgICBwb2ludGVyLWV2ZW50czogdmlzaWJsZSAhaW1wb3J0YW50O1xyXG4gfVxyXG4gaW9uLWxhYmVsIHtcclxuICAgIGNvbG9yOiAjNkM2QzZDICFpbXBvcnRhbnQ7XHJcbiAgfVxyXG5cclxuICBpb24tY2FyZC1jb250ZW50IHtcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICBvdmVyZmxvdy15OiBhdXRvO1xyXG4gICAgOjotd2Via2l0LXNjcm9sbGJhciB7XHJcbiAgICAgIGRpc3BsYXk6IG5vbmU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAubWF0LXN0ZXBwZXItaG9yaXpvbnRhbCB7XHJcbiAgICBtYXJnaW4tdG9wOiA4cHg7XHJcbiAgfVxyXG5cclxuICAubWF0LWZvcm0tZmllbGQge1xyXG4gICAgbWFyZ2luLXRvcDogMTZweDtcclxuICB9XHJcbiAgLmJvdHRvbXJvd3tcclxuICAgIGJhY2tncm91bmQ6ICMzZjUxYjU7XHJcbiAgICBjb2xvcjogI2ZmZjtcclxuICAgIHBhZGRpbmc6IDVweDtcclxuICB9XHJcblxyXG4gIC5lcnJvciB7XHJcbiAgICBjb2xvcjogcmdiKDIyMywgNjIsIDYyKTtcclxuICAgIGZvbnQtc2l6ZTogMTFweDtcclxuICB9XHJcbiAgaW5wdXRbdHlwZT1cImZpbGVcIl17XHJcbiAgICB2aXNpYmlsaXR5OmhpZGRlbjtcclxuICB9XHJcbiAgaW9uLWNoZWNrYm94e1xyXG4gICAgbWFyZ2luLXRvcDogMHB4O1xyXG4gICAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMHB4O1xyXG4gIH1cclxuXHJcbiAgLmFsaWdubWVudHtcclxuICAgIG1hcmdpbi10b3A6IDAuM3JlbTtcclxuICAgIGZvbnQ6IC13ZWJraXQtc21hbGwtY29udHJvbDtcclxuICB9XHJcbiJdfQ== */");

/***/ }),

/***/ "QKJs":
/*!***********************************************!*\
  !*** ./src/app/onboarding/onboarding.page.ts ***!
  \***********************************************/
/*! exports provided: OnboardingPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OnboardingPage", function() { return OnboardingPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_onboarding_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./onboarding.page.html */ "bcPs");
/* harmony import */ var _onboarding_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./onboarding.page.scss */ "Illq");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _contants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../contants */ "6qqZ");
/* harmony import */ var _model_constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../model/constants */ "Kp5Z");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../api.service */ "yTNM");
/* harmony import */ var _storage_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../storage.service */ "qkCY");
/* harmony import */ var _utilities_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../utilities.service */ "oTnF");












//import { Slides } from 'ionic-angular';
let OnboardingPage = class OnboardingPage {
    constructor(router, formBuilder, storage, apiService, menu, utils, navCtrl, cd) {
        this.router = router;
        this.formBuilder = formBuilder;
        this.storage = storage;
        this.apiService = apiService;
        this.menu = menu;
        this.utils = utils;
        this.navCtrl = navCtrl;
        this.cd = cd;
        this.notification = {};
        // buffer:any;
        // value=0.25;
        this.firstnameError = _model_constants__WEBPACK_IMPORTED_MODULE_5__["INVALID_FIRST_NAME"];
        this.lastnameError = _model_constants__WEBPACK_IMPORTED_MODULE_5__["INVALID_LAST_NAME"];
        this.fieldRequired = _model_constants__WEBPACK_IMPORTED_MODULE_5__["FIELD_REQUIRED"];
        this.emailError = _model_constants__WEBPACK_IMPORTED_MODULE_5__["INVALID_EMAIL_MESSAGE"];
        this.addressError = _model_constants__WEBPACK_IMPORTED_MODULE_5__["INVALID_ADDRESS"];
        this.registrationError = _model_constants__WEBPACK_IMPORTED_MODULE_5__["INVALID_REGISTRATION_NUMBER"];
        this.companyError = _model_constants__WEBPACK_IMPORTED_MODULE_5__["INVALID_COMPANY_NAME"];
        this.phoneError = _model_constants__WEBPACK_IMPORTED_MODULE_5__["INVALID_PHONE_NUMBER"];
        this.editFile = true;
        this.removeUpload = false;
        this.isCompany = false;
        this.teamMember = [];
        this.logoUploaded = false;
        this.logoSelected = false;
        const ADDRESSFORMAT = /^[#.0-9a-zA-Z\u00C0-\u1FFF\u2800-\uFFFD &_*#/'\s,-]+$/;
        const COMPANYFORMAT = '[a-zA-Z0-9. ]{3,}';
        this.firstFormGroup = this.formBuilder.group({
            usertype: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](null),
            billingaddress: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](null, [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].pattern(ADDRESSFORMAT)]),
            phone: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].minLength(8), _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].maxLength(15), _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].pattern("^[0-9]{8,15}$")]),
            //companyaddresssameasbilling:new FormControl(''),
            companyaddress: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](null, [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].pattern(ADDRESSFORMAT)]),
            company: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](null, [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].minLength(3), _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].pattern(COMPANYFORMAT)]),
            ispaymentmodeprepay: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](null),
            // logo:new FormControl(null, [Validators.required]),
            registrationnumber: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](null, [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].pattern('[a-zA-Z0-9-]*')]),
            isonboardingcompleted: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](true)
        });
        this.secondFormGroup = this.formBuilder.group({
            //For Emails
            designcompletedemail: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](false),
            designdeliveredemail: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](false),
            designmovedtoqcemail: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](false),
            designonholdemail: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](false),
            designreviewfailedemail: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](false),
            designreviewpassedemail: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](false),
            requestgeneratedemail: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](false),
            requestacknowledgementemail: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](false),
            requestindesigningemail: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](false),
            //For Notifications
            designcompletednotification: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](false),
            designdeliverednotification: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](false),
            designmovedtoqcnotification: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](false),
            designonholdnotification: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](false),
            designreviewfailednotification: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](false),
            designreviewpassednotification: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](false),
            requestgeneratednotification: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](false),
            requestacknowledgementnotification: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](false),
            requestindesigningnotification: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](false)
        });
        const EMAILPATTERN = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
        const NAMEPATTERN = /^[a-zA-Z]{3,}$/;
        this.thirdFormGroup = this.formBuilder.group({
            firstname: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].pattern(NAMEPATTERN)]),
            lastname: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].pattern(NAMEPATTERN)]),
            workemail: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].pattern(EMAILPATTERN)]),
            userrole: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]('')
        });
    }
    ngOnInit() {
        console.log("onboarding");
        this.menu.enable(false);
        this.user = this.storage.getUser();
        this.userId = this.storage.getUserID();
        console.log(this.prelimCharges);
        console.log(this.permitCharges);
        this.onboardingData();
        this.paymentCharges();
        this.apiService.emitUserNameAndRole(this.user);
        console.log(this.firstFormGroup.value);
        // this.buffer= this.value + 0.25;
        //     console.log(this.buffer);
        this.fetchTeamData();
    }
    ionViewDidEnter() {
        this.user = this.storage.getUser();
    }
    ngOnDestroy() {
    }
    ionViewWillLeave() {
        this.menu.enable(true);
    }
    onboardingData() {
        this.apiService.getUserData(this.userId).subscribe((res) => {
            console.log(res);
            //this.checkboxValue = res.companyaddresssameasbilling;
            if (res.usertype == 'company') {
                this.isCompany = true;
            }
            else {
                this.isCompany = false;
            }
            this.firstFormGroup.patchValue({
                usertype: res.usertype,
                billingaddress: res.billingaddress,
                phone: res.phone,
                companyaddresssameasbilling: res.companyaddresssameasbilling,
                companyaddress: res.companyaddress,
                company: res.company,
                ispaymentmodeprepay: res.ispaymentmodeprepay,
                registrationnumber: res.registrationnumber,
                logo: res.logo,
            });
            this.secondFormGroup.patchValue({
                //For Emails
                // designcompletedemail:res.designcompletedemail,
                designdeliveredemail: res.designdeliveredemail,
                designmovedtoqcemail: res.designmovedtoqcemail,
                //designonholdemail:res.designonholdemail,
                designreviewfailedemail: res.designreviewfailedemail,
                designreviewpassedemail: res.designreviewpassedemail,
                requestgeneratedemail: res.requestgeneratedemail,
                requestacknowledgementemail: res.requestacknowledgementemail,
                requestindesigningemail: res.requestindesigningemail,
                // For Notifications
                //designcompletednotification:res.designcompletednotification,
                designdeliverednotification: res.designdeliverednotification,
                designmovedtoqcnotification: res.designmovedtoqcnotification,
                //designonholdnotification:res.designonholdnotification,
                designreviewfailednotification: res.designreviewfailednotification,
                designreviewpassednotification: res.designreviewpassednotification,
                requestgeneratednotification: res.requestgeneratednotification,
                requestacknowledgementnotification: res.requestacknowledgementnotification,
                requestindesigningnotification: res.requestindesigningnotification
            });
        });
    }
    companyOptions(e) {
        console.log(e);
        this.radioValues = e.target.value;
        console.log(this.radioValues);
        if (this.radioValues === 'company') {
            this.isCompany = true;
            this.checkboxValue = false;
            this.firstFormGroup.patchValue({
                phone: '',
                billingaddress: '',
            });
        }
        else {
            this.isCompany = false;
            this.checkboxValue = false;
            this.firstFormGroup.patchValue({
                company: '',
                companyaddress: '',
                registrationnumber: '',
                phone: '',
                billingaddress: ''
            });
            this.firstFormGroup.get('companyaddress').clearValidators();
            this.firstFormGroup.get('company').clearValidators();
            //this.firstFormGroup.get('company').reset();
            this.firstFormGroup.get('registrationnumber').clearValidators();
            //this.firstFormGroup.get('registrationnumber').reset();
        }
        this.firstFormGroup.get('companyaddress').updateValueAndValidity();
        this.firstFormGroup.get('company').updateValueAndValidity();
        this.firstFormGroup.get('registrationnumber').updateValueAndValidity();
    }
    // addPrelim(){
    //   this.router.navigate(['/schedule/design']);
    // }
    // addPermit(){
    //   this.router.navigate(['/permitschedule']);
    // }
    fetchTeamData() {
        this.apiService.getTeamData().subscribe(response => {
            this.teamMember = response;
            console.log(this.teamMember);
        });
    }
    firstStepper() {
        // if(this.firstFormGroup.status === 'VALID')
        // {
        if (this.logoSelected) {
            this.updateLogo();
        }
        else {
            // if(this.logoUploaded){
            //   this.apiService.updateUser(this.userId,this.firstFormGroup.value).subscribe((res:any)=>{
            //     console.log('updated',res);
            //    let token=  this.storage.getJWTToken();
            //     this.storage.setUser(res,token);
            //   })
            // }
            // else{
            console.log(this.firstFormGroup.value);
            this.apiService.updateUser(this.userId, this.firstFormGroup.value).subscribe((res) => {
                console.log('updated', res);
                let token = this.storage.getJWTToken();
                this.storage.setUser(res, token);
            });
            // }
        }
        // }
        // else{
        //   if(this.firstFormGroup.value.billingaddress === ''){
        //     this.utils.errorSnackBar('Please Enter Billing Address');
        //   }
        //   else if(this.firstFormGroup.value.company === '')
        //   {
        //     this.utils.errorSnackBar('Please Enter Company Name');
        //   }
        //   else {
        //     this.utils.errorSnackBar('Please Check Fields');
        //   }
        // }
    }
    onChange(event, value) {
        console.log(event);
        if (value == 'requestgenerated') {
            this.secondFormGroup.patchValue({
                requestgeneratednotification: event.detail.checked
            });
        }
        else if (value == 'requestacknoledged') {
            this.secondFormGroup.patchValue({
                requestacknowledgementnotification: event.detail.checked
            });
        }
        // else if(value=='requestdesign'){
        //   this.secondFormGroup.patchValue({
        //     requestindesigningnotification:event.detail.checked
        //   })
        // }
        // else if(value=='onhold'){
        //   this.secondFormGroup.patchValue({
        //     designonholdnotification:event.detail.checked
        //   })
        // }
        else if (value == 'completedesign') {
            this.secondFormGroup.patchValue({
                designcompletednotification: event.detail.checked
            });
        }
        else if (value == 'qc') {
            this.secondFormGroup.patchValue({
                designmovedtoqcnotification: event.detail.checked
            });
        }
        else if (value == 'reviewfailed') {
            this.secondFormGroup.patchValue({
                designreviewfailednotification: event.detail.checked
            });
        }
        else if (value == 'reviewpassed') {
            this.secondFormGroup.patchValue({
                designreviewpassednotification: event.detail.checked
            });
        }
        else if (value == 'delivered') {
            this.secondFormGroup.patchValue({
                designdeliverednotification: event.detail.checked
            });
        }
    }
    onEmailChange(event, value) {
        console.log(event);
        if (value == 'requestgeneratedemail') {
            this.secondFormGroup.patchValue({
                requestgeneratedemail: event.detail.checked
            });
        }
        else if (value == 'requestacknoledgedemail') {
            this.secondFormGroup.patchValue({
                requestacknowledgementemail: event.detail.checked
            });
        }
        //  else if(value=='requestdesign'){
        //    this.secondFormGroup.patchValue({
        //      requestindesigningemail:event.detail.checked
        //    })
        //  }
        //  else if(value=='onhold'){
        //    this.secondFormGroup.patchValue({
        //      designonholdemail:event.detail.checked
        //    })
        //  }
        else if (value == 'completedesignemail') {
            this.secondFormGroup.patchValue({
                designcompletedemail: event.detail.checked
            });
        }
        else if (value == 'qcemail') {
            this.secondFormGroup.patchValue({
                designmovedtoqcemail: event.detail.checked
            });
        }
        else if (value == 'reviewfailedemail') {
            this.secondFormGroup.patchValue({
                designreviewfailedemail: event.detail.checked
            });
        }
        else if (value == 'reviewpassedemail') {
            this.secondFormGroup.patchValue({
                designreviewpassedemail: event.detail.checked
            });
        }
        else if (value == 'deliveredemail') {
            this.secondFormGroup.patchValue({
                designdeliveredemail: event.detail.checked
            });
        }
    }
    secondStepper() {
        console.log(this.secondFormGroup.value);
        this.apiService.updateUser(this.userId, this.secondFormGroup.value).subscribe((res) => {
            console.log('updated', res);
            let token = this.storage.getJWTToken();
            this.storage.setUser(res, token);
            //this.utils.showSnackBar('Changes saved successfully');
        });
    }
    thirdStepper() {
        console.log(this.thirdFormGroup.status);
        //  if (this.thirdFormGroup.status === 'VALID') {
        // $ev.preventDefault();
        let rolesel = parseInt(this.thirdFormGroup.get("userrole").value);
        var senddesignrequestpermission = false;
        if (rolesel == _contants__WEBPACK_IMPORTED_MODULE_4__["ROLES"].ContractorAdmin || rolesel == _contants__WEBPACK_IMPORTED_MODULE_4__["ROLES"].Admin || rolesel == _contants__WEBPACK_IMPORTED_MODULE_4__["ROLES"].BD) {
            senddesignrequestpermission = true;
        }
        this.apiService
            .addUser(this.thirdFormGroup.get("workemail").value, this.thirdFormGroup.get("firstname").value, this.thirdFormGroup.get("lastname").value, senddesignrequestpermission, parseInt(this.thirdFormGroup.get("userrole").value), this.user.parent.minpermitdesignaccess)
            .subscribe((response) => {
            this.utils.showSnackBar('Team created successfully');
            this.thirdFormGroup.reset();
        }, 
        // error => {
        //   this.utils.errorSnackBar(error);
        // }
        responseError => {
            const error = responseError.error;
            this.utils.errorSnackBar(error.message);
        });
        // }
        // else{
        //   if(this.thirdFormGroup.value.firstname =='' || this.thirdFormGroup.get('firstname').hasError('pattern')){
        //     this.utils.errorSnackBar('Please check the field first name');
        //   }
        //   else if(this.thirdFormGroup.value.lastname =='' || this.thirdFormGroup.get('lastname').hasError('pattern')){
        //     this.utils.errorSnackBar('Please check the field last name');
        //   }
        //   else if(this.thirdFormGroup.value.workemail =='' || this.thirdFormGroup.get('workemail').hasError('pattern')){
        //     this.utils.errorSnackBar('Please check the field email')
        //   }
        //   else{
        //     this.utils.errorSnackBar('Please check fields')
        //   }
        // }
    }
    goToWallet() {
        console.log("hello", this.user.amount);
        console.log("hello", this.user.isonboardingcompleted);
        if (this.user.amount == 0 && this.user.isonboardingcompleted == false) {
            //this.router.navigate(['/add-money',{mode:"wallet", onBoarding:"true"}]);
            let objToSend = {
                queryParams: {
                    mode: "wallet",
                    onBoarding: "true"
                },
                skipLocationChange: false,
                fragment: 'top'
            };
            this.router.navigate(['/add-money'], {
                state: { productdetails: objToSend }
            });
        }
        else {
            //this.router.navigate(['/add-money',{mode:"wallet", onBoarding:"false"}])
            let objToSend = {
                queryParams: {
                    mode: "wallet",
                    onBoarding: "false"
                },
                skipLocationChange: false,
                fragment: 'top'
            };
            this.router.navigate(['/add-money'], {
                state: { productdetails: objToSend }
            });
        }
    }
    paymentCharges() {
        console.log("hello");
        this.apiService.prelimCharges().subscribe(res => {
            // this.prelimCharge = res;
            // console.log(this.prelimCharge.settingvalue)
            // this.storage.setPrelimCharges(res);
            this.prelimCharges = res;
            this.prelimCharges.forEach(element => {
                this.prelimSettingValue = element.settingvalue;
            });
            console.log(this.prelimCharges);
            console.log('hello', this.prelimSettingValue);
        });
        this.apiService.permitinitcharges().subscribe(res => {
            // this.storage.setPermitCharges(res);
            this.permitCharges = res;
            this.permitCharges.forEach(element => {
                this.permitSettingValue = element.settingvalue;
            });
        });
    }
    uploadFile(event) {
        this.logoSelected = true;
        this.fileName = event.target.files[0].name;
        console.log(this.fileName);
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
                    logo: this.fileName
                });
                console.log(this.firstFormGroup.value);
                this.editFile = false;
                this.removeUpload = true;
            };
            // ChangeDetectorRef since file is loading outside the zone
            this.cd.markForCheck();
        }
    }
    updateLogo() {
        this.apiService.uploadlogo(this.blob, this.fileName).subscribe(res => {
            console.log(res);
            this.apiService.updateUser(this.userId, this.firstFormGroup.value).subscribe((res) => {
                console.log('updated', res);
                let token = this.storage.getJWTToken();
                this.storage.setUser(res, token);
            });
        });
    }
    move($event, index) {
        $event.stopPropagation();
        this.stepper.selectedIndex = index;
    }
    goBack() {
        this.navCtrl.pop();
    }
    change(e) {
        this.checkboxValue = e.detail.checked;
        console.log(this.checkboxValue);
        if (this.checkboxValue == true) {
            this.firstFormGroup.get("billingaddress").setValue(this.firstFormGroup.get("companyaddress").value);
            console.log(this.firstFormGroup.get("billingaddress").value);
        }
        else {
            this.firstFormGroup.get("billingaddress").setValue('');
        }
    }
};
OnboardingPage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_8__["Router"] },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"] },
    { type: _storage_service__WEBPACK_IMPORTED_MODULE_10__["StorageService"] },
    { type: _api_service__WEBPACK_IMPORTED_MODULE_9__["ApiService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["MenuController"] },
    { type: _utilities_service__WEBPACK_IMPORTED_MODULE_11__["UtilitiesService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["NavController"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_7__["ChangeDetectorRef"] }
];
OnboardingPage.propDecorators = {
    stepper: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_7__["ViewChild"], args: ['stepper', { static: true },] }],
    el: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_7__["ViewChild"], args: ['fileInput', { static: false },] }],
    slides: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_7__["ViewChild"], args: ["slidess", { static: true },] }]
};
OnboardingPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_7__["Component"])({
        selector: 'app-onboarding',
        template: _raw_loader_onboarding_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_onboarding_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], OnboardingPage);



/***/ }),

/***/ "bcPs":
/*!***************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/onboarding/onboarding.page.html ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (" <ion-header class=\"ion-no-border\">\r\n  <ion-toolbar>\r\n    <ion-buttons slot=\"start\">\r\n      <!-- <ion-menu-button></ion-menu-button> -->\r\n    </ion-buttons>\r\n    <ion-title>Dashboard</ion-title>\r\n    <ion-buttons slot=\"end\">\r\n      <ion-icon name=\"close-outline\" [routerLink]=\"['/permithomepage']\" routerDirection=\"back\" style=\"font-size: 25px;padding: 5px;\"></ion-icon>\r\n    </ion-buttons>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n<div style=\"text-align: center;\">\r\n  Welcome! Let's help you get started.\r\n</div>\r\n<!-- <mat-vertical-stepper labelPosition=\"bottom\" #stepper linear> -->\r\n  <mat-vertical-stepper labelPosition=\"bottom\" [linear]=\"isLinear\" #stepper>\r\n  <mat-step [stepControl]=\"firstFormGroup\">\r\n    <form [formGroup]=\"firstFormGroup\">\r\n\r\n      <ng-template matStepLabel>Profile Information <button class=\"action-button-color alignment\" *ngIf=\"this.stepper.selectedIndex==0\" style=\"float: right;\" mat-button (click)=\"move($event,1)\" matStepperNext>Skip</button></ng-template>\r\n\r\n      <div style=\"font-size: small;padding: 5px;\">\r\n    Please fill-in below mentioned details, to help you serve better\r\n    </div>\r\n        <mat-label>Type of User</mat-label>\r\n        <ion-radio-group formControlName=\"usertype\" >\r\n          <ion-row >\r\n            <ion-col size=\"6\">\r\n          <ion-item lines=\"none\">\r\n            <ion-label class=\"margin\" style=\"font-size: small;\">Individual</ion-label>\r\n            <ion-radio slot=\"start\" value=\"individual\" (click)=\"companyOptions($event)\"></ion-radio>\r\n          </ion-item>\r\n        </ion-col>\r\n        <ion-col size=\"6\">\r\n          <ion-item lines=\"none\">\r\n            <ion-label class=\"margin\"   style=\"font-size: small;\">Company</ion-label>\r\n            <ion-radio slot=\"start\"  value=\"company\" (click)=\"companyOptions($event)\"></ion-radio>\r\n          </ion-item>\r\n        </ion-col>\r\n        </ion-row>\r\n        </ion-radio-group>\r\n        <ion-row *ngIf=\"isCompany\">\r\n\r\n          <!--  -->\r\n          <ion-col >\r\n            <ion-item class=\"ion-no-padding\">\r\n                <ion-label position=\"floating\">Company Address*</ion-label>\r\n                <ion-input type=\"text\" class=\"form_input\" formControlName=\"companyaddress\" autocapitalize=\"words\"\r\n                            required></ion-input>\r\n            </ion-item>\r\n            <div style=\"height: 5px;\">\r\n              <div *ngIf=\"firstFormGroup.get('companyaddress').hasError('pattern') && firstFormGroup.get('companyaddress').dirty\">\r\n                <span class=\"error\">{{addressError}}</span>\r\n            </div>\r\n              <div *ngIf=\"firstFormGroup.get('companyaddress').value === '' && firstFormGroup.get('companyaddress').dirty\">\r\n                  <span class=\"error\">{{fieldRequired}}</span>\r\n              </div>\r\n          </div>\r\n        </ion-col>\r\n          <!--  -->\r\n      </ion-row>\r\n      <ion-row >\r\n        <ion-col>\r\n            <ion-item class=\"ion-no-padding\">\r\n                <ion-label position=\"floating\">Phone Number*</ion-label>\r\n                <ion-input type=\"text\" class=\"form_input\" formControlName=\"phone\"\r\n                            required></ion-input>\r\n            </ion-item>\r\n            <div style=\"height: 5px;\">\r\n              <div *ngIf=\"firstFormGroup.get('phone').hasError('pattern') && firstFormGroup.get('phone').dirty\">\r\n                <span class=\"error\">{{phoneError}}</span>\r\n            </div>\r\n              <div *ngIf=\"firstFormGroup.get('phone').value === '' && firstFormGroup.get('phone').dirty\">\r\n                  <span class=\"error\">{{fieldRequired}}</span>\r\n              </div>\r\n          </div>\r\n        </ion-col>\r\n    </ion-row>\r\n      <ion-row *ngIf=\"isCompany\">\r\n        <!--For Checkbox-->\r\n        <ion-col size=\"12\">\r\n          <ion-item class=\"ion-no-padding\" lines=\"none\">\r\n              <ion-label class=\"margin\"   style=\"font-size: small;margin-bottom: 0px;\">Is company address same as billing?</ion-label>\r\n              <ion-checkbox class=\"margin\" slot=\"start\" class=\"form_input\" (ionChange)=\"change($event)\"></ion-checkbox>\r\n          </ion-item>\r\n      </ion-col>\r\n      </ion-row>\r\n      <ion-row>\r\n      <ion-col *ngIf=\"!checkboxValue || !isCompany\">\r\n        <!-- <ion-col> -->\r\n        <ion-item class=\"ion-no-padding\">\r\n            <ion-label position=\"floating\">Billing Address*</ion-label>\r\n            <ion-input type=\"text\" class=\"form_input\" formControlName=\"billingaddress\" autocapitalize=\"words\"\r\n                        required></ion-input>\r\n        </ion-item>\r\n        <!-- <ion-item class=\"ion-no-padding\">\r\n          <ion-label position=\"floating\">Billing Address*</ion-label>\r\n          <ion-input type=\"text\" class=\"form_input\" formControlName=\"billingaddress\" autocapitalize=\"words\" [disabled]=\"checkboxValue\"\r\n                      required></ion-input>\r\n      </ion-item> -->\r\n        <div style=\"height: 5px;\">\r\n          <div *ngIf=\"firstFormGroup.get('billingaddress').hasError('pattern') && firstFormGroup.get('billingaddress').dirty\">\r\n            <span class=\"error\">{{addressError}}</span>\r\n        </div>\r\n          <div *ngIf=\"firstFormGroup.get('billingaddress').value === '' && firstFormGroup.get('billingaddress').dirty\">\r\n              <span class=\"error\">{{fieldRequired}}</span>\r\n          </div>\r\n      </div>\r\n    </ion-col>\r\n  </ion-row>\r\n\r\n        <!--End-->\r\n        <ion-row *ngIf=\"isCompany\">\r\n        <ion-col size=\"12\">\r\n            <ion-item class=\"ion-no-padding\">\r\n                <ion-label position=\"floating\">Company Name*</ion-label>\r\n                <ion-input type=\"text\" formControlName=\"company\" class=\"form_input\" autocapitalize=\"words\" minLength=\"3\" maxLength=\"50\"\r\n                            required></ion-input>\r\n            </ion-item>\r\n            <div style=\"height: 5px;\">\r\n              <div *ngIf=\"firstFormGroup.get('company').hasError('pattern') && firstFormGroup.get('company').dirty\">\r\n                <span class=\"error\">{{companyError}}</span>\r\n            </div>\r\n              <div *ngIf=\"firstFormGroup.get('company').value === '' && firstFormGroup.get('company').dirty\">\r\n                  <span class=\"error\">{{fieldRequired}}</span>\r\n              </div>\r\n          </div>\r\n        </ion-col>\r\n        <ion-col size=\"12\">\r\n            <ion-item class=\"ion-no-padding\">\r\n                <ion-label position=\"floating\">Licence No.</ion-label>\r\n                <ion-input type=\"text\" formControlName=\"registrationnumber\" class=\"form_input\" autocapitalize=\"words\" maxLength=\"16\"\r\n                            required></ion-input>\r\n            </ion-item>\r\n            <div style=\"height: 5px;\">\r\n              <div *ngIf=\"firstFormGroup.get('registrationnumber').hasError('pattern') && firstFormGroup.get('registrationnumber').dirty\">\r\n                <span class=\"error\">{{registrationError}}</span>\r\n            </div>\r\n              <div *ngIf=\"firstFormGroup.get('registrationnumber').value === '' && firstFormGroup.get('registrationnumber').dirty\">\r\n                  <span class=\"error\">{{fieldRequired}}</span>\r\n              </div>\r\n          </div>\r\n        </ion-col>\r\n        <ion-col size=\"12\" (click)=\"fileInput.click()\">\r\n              <ion-item  class=\"ion-no-padding\">\r\n                <ion-label position=\"floating\">Upload Logo</ion-label>\r\n                <input type='file' id=\"imageUpload\" placeholder=\"Upload logo\" accept=\"image/\" #fileInput (change)=\"uploadFile($event)\" />\r\n                </ion-item>\r\n\r\n                  <div *ngIf=\"logo !=null && logo !=''\" class=\"avatar-upload\" style=\"text-align: center;\">\r\n                      <img [src]=logo height=\"100px\" width=\"100px\" />\r\n                </div>\r\n\r\n            <!-- </ion-item> -->\r\n        </ion-col>\r\n    </ion-row>\r\n    <!-- <ion-row *ngIf=\"isCompany\">\r\n      <ion-col>\r\n          <ion-item class=\"ion-no-padding\">\r\n              <ion-label position=\"floating\">Lic No*</ion-label>\r\n              <ion-input type=\"text\" class=\"form_input\" autocapitalize=\"words\"\r\n                          ></ion-input>\r\n          </ion-item>\r\n      </ion-col>\r\n  </ion-row> -->\r\n  <br>\r\n  <!-- <mat-label>Payment</mat-label>\r\n  <ion-radio-group formControlName=\"ispaymentmodeprepay\">\r\n    <ion-row >\r\n      <ion-col size=\"6\">\r\n    <ion-item lines=\"none\">\r\n      <ion-label class=\"margin\" style=\"font-size: small;\">Prepaid</ion-label>\r\n      <ion-radio slot=\"start\" [value]=true></ion-radio>\r\n    </ion-item>\r\n  </ion-col>\r\n  <ion-col size=\"6\">\r\n    <ion-item lines=\"none\">\r\n      <ion-label class=\"margin\"   style=\"font-size: small;\">Postpaid</ion-label>\r\n      <ion-radio slot=\"start\"  [value]=false ></ion-radio>\r\n    </ion-item>\r\n  </ion-col>\r\n  </ion-row>\r\n  </ion-radio-group> -->\r\n\r\n\r\n    </form>\r\n    <div >\r\n      <button (click)=\"firstStepper()\" [ngClass]=\"{'colorChange':firstFormGroup.valid}\" mat-button style=\"float: right;\" (click)=\"$event.stopPropagation()\" matStepperNext [disabled]=\"!firstFormGroup.valid\">Next</button>\r\n      <!-- <ion-button  fill=\"clear\" style=\"float: right;font-size: 12px; height: 30px;color: #3c78d8;\">Update</ion-button> -->\r\n\r\n    </div>\r\n  </mat-step>\r\n  <mat-step [stepControl]=\"secondFormGroup\">\r\n    <form [formGroup]=\"secondFormGroup\">\r\n      <ng-template matStepLabel>Notifications <button class=\"action-button-color alignment\"  *ngIf=\"this.stepper.selectedIndex==1\" style=\"float: right;\" mat-button (click)=\"move($event,2)\" matStepperNext>Skip</button></ng-template>\r\n      <ion-row>\r\n        <span style=\"font-size: small;padding:5px\">\r\n      Personalize your platform updates, the way you want. Set when you would like to be notified.\r\n    </span>\r\n    </ion-row>\r\n     <!-- <ion-item>\r\n       <ion-label>Mails</ion-label>\r\n      <ion-toggle formControlName=\"mails\" (ionChange)=\"onChange($event,'mail')\"></ion-toggle>\r\n    </ion-item>\r\n    <ion-item>\r\n      <ion-label>Notifications</ion-label>\r\n     <ion-toggle formControlName=\"\" (ionChange)=\"onChange($event,'notification')\"></ion-toggle>\r\n   </ion-item> -->\r\n   <ion-row>\r\n     <ion-col style=\"text-align: center;font-size: 12px;\">Events</ion-col>\r\n     <ion-col style=\"text-align: right;font-size: 12px;\" >Mails</ion-col>\r\n     <ion-col style=\"text-align: right;font-size: 12px;\">Notifications</ion-col>\r\n   </ion-row>\r\n  <ion-item>\r\n    <ion-label class=\"font\" >Design Generated</ion-label>\r\n   <ion-toggle formControlName=\"requestgeneratedemail\" (ionChange)=\"onEmailChange($event,'requestgeneratedemail')\"  ></ion-toggle>\r\n   <ion-toggle formControlName=\"requestgeneratednotification\" (ionChange)=\"onChange($event,'requestgenerated')\"  ></ion-toggle>\r\n </ion-item>\r\n <ion-item>\r\n  <ion-label class=\"font\">Design Acknowledgement  (Accept/On Hold)</ion-label>\r\n <ion-toggle formControlName=\"requestacknowledgementemail\" (ionChange)=\"onEmailChange($event,'requestacknoledgedemail')\"></ion-toggle>\r\n <ion-toggle formControlName=\"requestacknowledgementnotification\" (ionChange)=\"onChange($event,'requestacknoledged')\"></ion-toggle>\r\n</ion-item>\r\n<!-- <ion-item>\r\n  <ion-label>Request in Designing Stage</ion-label>\r\n <ion-toggle formControlName=\"requestindesigningnotification\" (ionChange)=\"onChange($event,'requestdesign')\" ></ion-toggle>\r\n</ion-item> -->\r\n<!-- <ion-item>\r\n  <ion-label>Design on Hold</ion-label>\r\n <ion-toggle formControlName=\"designonholdnotification\" (ionChange)=\"onChange($event,'onhold')\" ></ion-toggle>\r\n</ion-item> -->\r\n<ion-item>\r\n  <ion-label class=\"font\">Design In-Designing</ion-label>\r\n <ion-toggle formControlName=\"requestindesigningemail\" (ionChange)=\"onEmailChange($event,'completedesignemail')\"></ion-toggle>\r\n <ion-toggle formControlName=\"requestindesigningnotification\" (ionChange)=\"onChange($event,'completedesign')\"></ion-toggle>\r\n</ion-item>\r\n<ion-item>\r\n  <ion-label class=\"font\">Design In-Review</ion-label>\r\n <ion-toggle formControlName=\"designmovedtoqcemail\" (ionChange)=\"onEmailChange($event,'qcemail')\"></ion-toggle>\r\n <ion-toggle formControlName=\"designmovedtoqcnotification\" (ionChange)=\"onChange($event,'qc')\"></ion-toggle>\r\n</ion-item>\r\n\r\n<ion-item>\r\n  <ion-label class=\"font\">Design Review Passed</ion-label>\r\n <ion-toggle formControlName=\"designreviewpassedemail\" (ionChange)=\"onEmailChange($event,'reviewpassedemail')\" ></ion-toggle>\r\n <ion-toggle formControlName=\"designreviewpassednotification\" (ionChange)=\"onChange($event,'reviewpassed')\" ></ion-toggle>\r\n</ion-item>\r\n<ion-item>\r\n  <ion-label class=\"font\">Design Review Failed</ion-label>\r\n <ion-toggle formControlName=\"designreviewfailedemail\" (ionChange)=\"onEmailChange($event,'reviewfailedemail')\" ></ion-toggle>\r\n <ion-toggle formControlName=\"designreviewfailednotification\" (ionChange)=\"onChange($event,'reviewfailed')\" ></ion-toggle>\r\n</ion-item>\r\n<ion-item>\r\n  <ion-label class=\"font\">Design Delivered</ion-label>\r\n <ion-toggle formControlName=\"designdeliveredemail\" (ionChange)=\"onEmailChange($event,'deliveredemail')\"></ion-toggle>\r\n <ion-toggle formControlName=\"designdeliverednotification\" (ionChange)=\"onChange($event,'delivered')\"></ion-toggle>\r\n</ion-item>\r\n\r\n\r\n    </form>\r\n    <div>\r\n      <button (click)=\"secondStepper()\" class=\"action-button-color\" mat-button style=\"float: right;\" (click)=\"$event.stopPropagation()\" matStepperNext>Next</button>\r\n      <!-- <ion-button (click)=\"secondStepper()\" fill=\"clear\" style=\"float: right;font-size: 12px; height: 30px;color: #3c78d8;\">Update</ion-button> -->\r\n      <!-- <button  class=\"action-button-color\" mat-button matStepperNext style=\"float: right;\">Next</button> -->\r\n      <!-- <button class=\"action-button-color\" mat-button matStepperPrevious style=\"float: right;\">Back</button> -->\r\n\r\n    </div>\r\n  </mat-step>\r\n  <mat-step *ngIf=\"isCompany\" [stepControl]=\"thirdFormGroup\">\r\n    <form [formGroup]=\"thirdFormGroup\">\r\n    <ng-template matStepLabel>Build your own team <button class=\"action-button-color alignment\" *ngIf=\"this.stepper.selectedIndex==2\" style=\"float: right;\" mat-button (click)=\"move($event,3)\" matStepperNext>Skip</button></ng-template>\r\n    <!-- <ion-row style=\" background-color: rgb(211,211,211); text-align: center;\">\r\n      <ion-col >\r\n      <ion-label position=\"fixed\">Name</ion-label>\r\n    </ion-col>\r\n    <ion-col>\r\n      <ion-label position=\"fixed\">Role</ion-label>\r\n    </ion-col>\r\n    <ion-col>\r\n      <ion-label position=\"fixed\" style=\"float: right;\">Email</ion-label>\r\n    </ion-col>\r\n  </ion-row>\r\n    <ion-content style=\"height: 160px;\" [scrollEvents]=\"true\">\r\n    <ion-list>\r\n\r\n      <ion-item  *ngFor=\"let team of teamMember;\" style=\"text-align: center; font-size: small;\" >\r\n         <ion-col size=\"4\">\r\n         <ion-label style=\"float: left\" >{{team.firstname}}<br>{{team.lastname}}</ion-label>\r\n        </ion-col>\r\n        <ion-col size=\"4\">\r\n          <ion-label style=\"float: left\">{{team.role.name}}</ion-label>\r\n         </ion-col>\r\n         <ion-col size=\"4\" style=\"max-width: 90px; word-wrap: break-word;\">\r\n          <ion-label text-wrap style=\"float: left;\" >{{team.email}}</ion-label>\r\n         </ion-col>\r\n      </ion-item>\r\n    </ion-list>\r\n    </ion-content> -->\r\n    <ion-row>\r\n      <ion-col size=\"6\">\r\n        <ion-item class=\"ion-no-padding\">\r\n        <ion-label position=\"floating\">First Name*</ion-label>\r\n                  <ion-input type=\"text\" class=\"form_input\" formControlName=\"firstname\" autocapitalize=\"words\"\r\n                              required></ion-input>\r\n                            </ion-item>\r\n                            <div style=\"height: 5px;\">\r\n                              <div *ngIf=\"thirdFormGroup.get('firstname').hasError('pattern') && thirdFormGroup.get('firstname').dirty\">\r\n                                  <span class=\"error\">{{firstnameError}}</span>\r\n                              </div>\r\n                              <div *ngIf=\"thirdFormGroup.get('firstname').value === '' && thirdFormGroup.get('firstname').dirty\">\r\n                                  <span class=\"error\">{{fieldRequired}}</span>\r\n                              </div>\r\n                          </div>\r\n      </ion-col>\r\n      <ion-col size=\"6\">\r\n        <ion-item class=\"ion-no-padding\">\r\n        <ion-label position=\"floating\">Last Name*</ion-label>\r\n                  <ion-input type=\"text\" class=\"form_input\" formControlName=\"lastname\" autocapitalize=\"words\"\r\n                              ></ion-input>\r\n                            </ion-item>\r\n                            <div style=\"height: 5px;\">\r\n                              <div *ngIf=\"thirdFormGroup.get('lastname').hasError('pattern') && thirdFormGroup.get('lastname').dirty\">\r\n                                  <span class=\"error\">{{lastnameError}}</span>\r\n                              </div>\r\n                              <div *ngIf=\"thirdFormGroup.get('lastname').value === '' && thirdFormGroup.get('lastname').dirty\">\r\n                                  <span class=\"error\">{{fieldRequired}}</span>\r\n                              </div>\r\n                          </div>\r\n      </ion-col>\r\n    </ion-row>\r\n    <ion-row >\r\n      <ion-col>\r\n          <ion-item class=\"ion-no-padding\">\r\n              <ion-label position=\"floating\">Work Email*</ion-label>\r\n              <ion-input type=\"text\" class=\"form_input\" formControlName=\"workemail\"\r\n                          ></ion-input>\r\n          </ion-item>\r\n          <div style=\"height: 5px;\">\r\n            <div *ngIf=\"thirdFormGroup.get('workemail').hasError('pattern') && thirdFormGroup.get('workemail').dirty\">\r\n                <span class=\"error\">{{emailError}}</span>\r\n            </div>\r\n            <div *ngIf=\"thirdFormGroup.get('workemail').value === '' && thirdFormGroup.get('workemail').dirty\">\r\n                <span class=\"error\">{{fieldRequired}}</span>\r\n            </div>\r\n        </div>\r\n      </ion-col>\r\n  </ion-row>\r\n  <br>\r\n  <mat-label>User Role</mat-label>\r\n        <ion-radio-group formControlName=\"userrole\" >\r\n          <ion-row >\r\n            <ion-col size=\"auto\">\r\n          <ion-item lines=\"none\">\r\n            <ion-label class=\"margin\" style=\"font-size: small;\">Admin</ion-label>\r\n            <ion-radio slot=\"start\" value=\"7\" ></ion-radio>\r\n          </ion-item>\r\n        </ion-col>\r\n        <ion-col size=\"auto\">\r\n          <ion-item lines=\"none\">\r\n            <ion-label class=\"margin\"   style=\"font-size: small;padding-left: 0%;\">Design Manager</ion-label>\r\n            <ion-radio slot=\"start\"  value=\"3\" ></ion-radio>\r\n          </ion-item>\r\n        </ion-col>\r\n        </ion-row>\r\n        </ion-radio-group>\r\n\r\n  </form>\r\n  <div>\r\n    <button class=\"action-button-color\" mat-button (click)=\"$event.stopPropagation()\" style=\"float: right;\" matStepperNext>Next</button>\r\n    <ion-button (click)=\"thirdStepper()\" [ngClass]=\"{'colorChange':thirdFormGroup.valid}\" fill='clear' style=\"float: left;font-size: 12px; height: 30px;color: #3c78d8;\" [disabled]=\"!thirdFormGroup.valid\">Save</ion-button>\r\n    <!-- <button class=\"action-button-color\" mat-button matStepperNext style=\"float: right;\">Skip</button>\r\n    <button class=\"action-button-color\" mat-button matStepperPrevious style=\"float: right;\">Back</button> -->\r\n    <!-- <button mat-button (click)=\"stepper.reset()\">Reset</button> -->\r\n  </div>\r\n  </mat-step>\r\n  <mat-step>\r\n    <ng-template matStepLabel>Request for Design</ng-template>\r\n    <div style=\"color: #111 !important;padding-left: 0px;\">\r\n      <ion-label style=\"color:#111 !important;\">Service Charges</ion-label>\r\n    </div>\r\n\r\n    <ion-row style=\"margin-top: 3%;\">\r\n      <ion-col><ion-label>Prelim Design</ion-label></ion-col>\r\n      <ion-col><ion-label>${{prelimSettingValue}}</ion-label></ion-col>\r\n    </ion-row>\r\n    <ion-row>\r\n      <ion-col><ion-label>Permit Design</ion-label></ion-col>\r\n      <ion-col><ion-label>${{permitSettingValue}}</ion-label></ion-col>\r\n    </ion-row>\r\n\r\n\r\n        <div *ngIf=\"firstFormGroup.get('ispaymentmodeprepay').value\">\r\n    <ion-row *ngIf=\"user.amount == 0\">\r\n      <ion-col>\r\n      <h6 style=\"font-size: small;color:#6C6C6C\">Recharge your wallet right now with more than $1000 and get an additional benefit of $100</h6>\r\n      </ion-col>\r\n    </ion-row>\r\n\r\n\r\n    <ion-row >\r\n      <ion-col style=\"text-align: center;\">\r\n        <ion-button style=\"height: 90%;\" (click)=\"goToWallet()\">Recharge Wallet</ion-button>\r\n      </ion-col>\r\n    </ion-row>\r\n  <hr style=\"background-color: lightgray;\"/>\r\n  </div>\r\n    <ion-row>\r\n      <ion-col size=\"6\">\r\n        <ion-card [routerLink]=\"['/schedule/design']\" style=\"border-radius: 20%;\">\r\n          <ion-card-header style=\"text-align: center;\">\r\n            <img src=\"/assets/images/design.svg\" alt=\"\" class=\"cardimg\">\r\n          </ion-card-header >\r\n          <ion-card-content class=\"ion-text-center bottomrow\">\r\n            Prelim\r\n          </ion-card-content>\r\n        </ion-card>\r\n    <!-- <ion-button style=\"height: 30px;\" (click)=\"addPrelim()\">Add Prelim</ion-button> -->\r\n  </ion-col>\r\n  <ion-col size=\"6\">\r\n    <ion-card [routerLink]=\"['/permitschedule']\" style=\"border-radius: 20%;\">\r\n      <ion-card-header style=\"text-align: center;\">\r\n        <img src=\"/assets/images/permit.svg\" alt=\"\" class=\"cardimg\">\r\n      </ion-card-header>\r\n      <ion-card-content class=\"ion-text-center bottomrow\">\r\n        Permit\r\n      </ion-card-content>\r\n    </ion-card>\r\n    <!-- <ion-button style=\"height: 30px;\" (click)=\"addPermit()\">Add Permit</ion-button> -->\r\n  </ion-col>\r\n  </ion-row>\r\n    <!-- <div> -->\r\n      <!-- <button class=\"action-button-color\" mat-button style=\"float: right;\">Save</button> -->\r\n      <!-- <button class=\"action-button-color\" mat-button matStepperPrevious style=\"float: right;\">Back</button>\r\n\r\n    </div> -->\r\n  </mat-step>\r\n</mat-vertical-stepper>\r\n\r\n<!-- <mat-horizontal-stepper>\r\n  <mat-step label=\"Step 1\" state=\"phone\">\r\n    <p>Put down your phones.</p>\r\n    <div>\r\n      <button mat-button matStepperNext>Next</button>\r\n    </div>\r\n  </mat-step>\r\n  <mat-step label=\"Step 2\" state=\"chat\">\r\n    <p>Socialize with each other.</p>\r\n    <div>\r\n      <button mat-button matStepperPrevious>Back</button>\r\n      <button mat-button matStepperNext>Next</button>\r\n    </div>\r\n  </mat-step>\r\n  <mat-step label=\"Step 3\">\r\n    <p>You're welcome.</p>\r\n  </mat-step>\r\n\r\n   Icon overrides. -->\r\n  <!--<ng-template matStepperIcon=\"phone\">\r\n    <mat-icon>call_end</mat-icon>\r\n  </ng-template>\r\n  <ng-template matStepperIcon=\"chat\">\r\n    <mat-icon>forum</mat-icon>\r\n  </ng-template>\r\n</mat-horizontal-stepper> -->\r\n\r\n</ion-content>\r\n");

/***/ }),

/***/ "eQKf":
/*!*********************************************************!*\
  !*** ./src/app/onboarding/onboarding-routing.module.ts ***!
  \*********************************************************/
/*! exports provided: OnboardingPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OnboardingPageRoutingModule", function() { return OnboardingPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _onboarding_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./onboarding.page */ "QKJs");




const routes = [
    {
        path: '',
        component: _onboarding_page__WEBPACK_IMPORTED_MODULE_3__["OnboardingPage"]
    }
];
let OnboardingPageRoutingModule = class OnboardingPageRoutingModule {
};
OnboardingPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], OnboardingPageRoutingModule);



/***/ }),

/***/ "tSXo":
/*!*************************************************!*\
  !*** ./src/app/onboarding/onboarding.module.ts ***!
  \*************************************************/
/*! exports provided: OnboardingPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OnboardingPageModule", function() { return OnboardingPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _onboarding_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./onboarding-routing.module */ "eQKf");
/* harmony import */ var _onboarding_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./onboarding.page */ "QKJs");
/* harmony import */ var _utilities_utilities_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utilities/utilities.module */ "egEE");
/* harmony import */ var _angular_material_stepper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/stepper */ "xHqg");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/autocomplete */ "/1cH");








//import { MatStepperModule, MatInputModule, MatButtonModule, MatAutocompleteModule } from '@angular/material';




let OnboardingPageModule = class OnboardingPageModule {
};
OnboardingPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _onboarding_routing_module__WEBPACK_IMPORTED_MODULE_5__["OnboardingPageRoutingModule"],
            _utilities_utilities_module__WEBPACK_IMPORTED_MODULE_7__["UtilitiesModule"],
            _angular_material_stepper__WEBPACK_IMPORTED_MODULE_8__["MatStepperModule"],
            _angular_material_input__WEBPACK_IMPORTED_MODULE_9__["MatInputModule"],
            _angular_material_button__WEBPACK_IMPORTED_MODULE_10__["MatButtonModule"],
            _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_11__["MatAutocompleteModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"]
        ],
        declarations: [_onboarding_page__WEBPACK_IMPORTED_MODULE_6__["OnboardingPage"]]
    })
], OnboardingPageModule);



/***/ })

}]);
//# sourceMappingURL=onboarding-onboarding-module.js.map