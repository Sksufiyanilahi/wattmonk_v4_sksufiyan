(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pestamp-design-details-pestamp-design-details-module"],{

/***/ "7QjB":
/*!***********************************************************************!*\
  !*** ./src/app/pestamp-design-details/pestamp-design-details.page.ts ***!
  \***********************************************************************/
/*! exports provided: PestampDesignDetailsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PestampDesignDetailsPage", function() { return PestampDesignDetailsPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_pestamp_design_details_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./pestamp-design-details.page.html */ "8JoP");
/* harmony import */ var _pestamp_design_details_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pestamp-design-details.page.scss */ "BuCH");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _ionic_native_launch_navigator_ngx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic-native/launch-navigator/ngx */ "fGQ8");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../api.service */ "yTNM");
/* harmony import */ var _storage_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../storage.service */ "qkCY");
/* harmony import */ var _utilities_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../utilities.service */ "oTnF");
/* harmony import */ var _ionic_native_in_app_browser_ngx__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ionic-native/in-app-browser/ngx */ "m/P+");
/* harmony import */ var _utilities_mixpanel_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../utilities/mixpanel.service */ "uKCw");













let PestampDesignDetailsPage = class PestampDesignDetailsPage {
    constructor(router, route, utilities, apiService, navController, toastController, storage, formbuilder, cdr, navctrl, iab, launchNavigator, mixpanelService) {
        this.router = router;
        this.route = route;
        this.utilities = utilities;
        this.apiService = apiService;
        this.navController = navController;
        this.toastController = toastController;
        this.storage = storage;
        this.formbuilder = formbuilder;
        this.cdr = cdr;
        this.navctrl = navctrl;
        this.iab = iab;
        this.launchNavigator = launchNavigator;
        this.mixpanelService = mixpanelService;
        this.enableDisable = false;
        this.stampfile = [];
        this.options = {
            start: '',
            app: this.launchNavigator.APP.GOOGLE_MAPS
        };
        this.pestampForm = this.formbuilder.group({
            workinghours: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](null, [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]),
            // comments:new FormControl(null),
            status: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('completed'),
            stampedfiles: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]),
        });
        this.commentform = this.formbuilder.group({
            comments: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](null)
        });
        this.designId = +this.route.snapshot.paramMap.get('id');
        console.log(this.designId);
    }
    ngOnInit() {
        this.user = this.storage.getUser();
        console.log(this.user);
        this.mixpanelService.track('PESTAMP_DESIGN_DETAIL_PAGE_OPEN', {});
        this.getDesignDetails();
    }
    getDesignDetails() {
        //this.getAssignees();
        this.utilities.showLoading('Getting Design Details').then((success) => {
            this.apiService.getPestampDetails(this.designId).subscribe((result) => {
                this.utilities.hideLoading();
                console.log('re', result);
                //this.setData(result);
                //this.timer();
                this.design = result;
                this.validations();
            }, (error) => {
                this.utilities.hideLoading();
            });
        });
    }
    goBack() {
        this.mixpanelService.track("PESTAMP_DESIGN_DETAIL_PAGE_CLOSE", {});
        this.navController.pop();
    }
    deleteDesign() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.enableDisable = true;
            const toast = yield this.toastController.create({
                header: 'Delete Design',
                message: 'Are you sure you want to delete this PE Stamp?',
                cssClass: 'my-custom-delete-class',
                buttons: [
                    {
                        text: 'Yes',
                        handler: () => {
                            this.deleteDesignFromServer();
                        }
                    }, {
                        text: 'No',
                        handler: () => {
                            this.enableDisable = false;
                        }
                    }
                ]
            });
            toast.present();
        });
    }
    deleteDesignFromServer() {
        this.utilities.showLoading('Deleting Design').then((success) => {
            this.apiService.deletePestamp(this.designId).subscribe((result) => {
                console.log('result', result);
                this.utilities.hideLoading().then(() => {
                    this.utilities.showSnackBar(this.design.personname + " " + 'has been deleted successfully');
                    this.navController.pop();
                    this.utilities.setPeStampRefresh(true);
                });
            }, (error) => {
                this.utilities.hideLoading().then(() => {
                    this.utilities.errorSnackBar('Some Error Occurred');
                });
            });
        });
    }
    openAddressOnMap(address) {
        this.launchNavigator.navigate(address, this.options);
    }
    validations() {
        const working = this.pestampForm.get('workinghours');
        const stamped = this.pestampForm.get('stampedfiles');
        const NUMBERPATTERN = '^[0-9]+$';
        if (this.design.propertytype == 'commercial') {
            stamped.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]);
            working.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].min(1), _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].max(48), _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].pattern(NUMBERPATTERN)]);
        }
        else {
            stamped.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]);
            working.clearValidators();
            working.reset();
        }
        working.updateValueAndValidity();
        stamped.updateValueAndValidity();
    }
    submit() {
        //this.validations();
        debugger;
        if (this.pestampForm.status == 'INVALID') {
            // if(this.design.propertytype=='commercial'){
            //   console.log("Hello Commercial",this.design.propertytype)
            //   if(this.pestampForm.get('stampedfiles').value=='')
            //   {
            //     console.log("Hello Stampedfiles")
            //     this.utilities.errorSnackBar('Please attach stamped file');
            //   }else if(this.pestampForm.get('workinghours').value==null){
            //     console.log("Hello Working HOurs");
            // this.utilities.errorSnackBar('Please add working hours');
            //   }
            // }
            // else{
            //   this.utilities.errorSnackBar('Please attach stamped file');
            // }
            if (this.pestampForm.get('stampedfiles').value == '') {
                this.utilities.errorSnackBar('Please attach stamped file');
            }
            else if (this.pestampForm.get('workinghours').value == null) {
                this.utilities.errorSnackBar('Please add working hours');
            }
            else if (this.pestampForm.get('workinghours').hasError('max') || this.pestampForm.get('workinghours').hasError('min') || this.pestampForm.get('workinghours').hasError('pattern')) {
                // this.utilities.errorSnackBar('Maximum working hours should be 48');
                this.utilities.errorSnackBar('Please enter a valid working hours');
            }
            return false;
        }
        else {
            let cdate = Date.now();
            this.designenddatetime = cdate;
            const postData = {
                status: "completed",
                pestampstarttime: this.designstartdatetime,
                pestampendtime: this.designenddatetime,
                comments: this.commentform.get('comments').value,
                workinghours: this.pestampForm.get('workinghours').value
            };
            this.utilities.showLoading('Submitting').then(() => {
                // this.apiService.updatePestamps(this.designId,this.pestampForm.value).subscribe(res=>{
                this.apiService.updatePestamps(this.designId, postData).subscribe(res => {
                    this.utilities.hideLoading().then(() => {
                        this.uploadStampedFiles(res.id, this.stampfile[0]);
                        console.log(res);
                        // this.navController.pop();
                        // this.utilities.setPeStampRefresh(true);
                    });
                }, err => {
                    console.log(err);
                });
            });
        }
    }
    removeArc(i) {
        this.stampfile.splice(i, 1);
    }
    remove(stamp, i) {
        console.log(stamp);
        this.indexOfstampFiles.push(stamp.id);
        console.log(i);
        this.stampfile.splice(i, 1);
    }
    files(event) {
        console.log(event.target.files);
        //  for(var i=0; i< event.target.files.length;i++){
        //    this.stampfile.push(event.target.files[i])
        //  }
        this.stampfile = event.target.files;
        console.log(this.stampfile);
    }
    /* FOR UPLOAD Stamped FILES */
    uploadStampedFiles(recordid, file) {
        // console.log(this.archFiles);
        console.log(file);
        const data = new FormData();
        for (var i = 0; i < this.stampfile.length; i++) {
            data.append("files", this.stampfile[i]);
            if (i == 0) {
                //data.append('files', file);
                data.append('path', "pestamp/" + recordid);
                data.append('refId', "" + recordid);
                data.append('ref', "pestamp");
                data.append('field', "stampedfiles");
                console.log("file upload data---" + data);
            }
        }
        this.utilities.showLoading("Stamped File Uploading").then(() => {
            this.apiService.uploadFile(data).subscribe(res => {
                this.utilities.hideLoading();
                console.log(res);
                this.navController.pop();
                this.utilities.setPeStampRefresh(true);
            }, responseError => {
                this.utilities.hideLoading();
                const error = responseError.error;
                this.utilities.errorSnackBar(error.message[0].messages[0].message);
            });
        });
    }
    showreasonImage(attachmentFile) {
        const browser = this.iab.create(attachmentFile.url, '_system', 'location=yes,hardwareback=yes,hidden=yes');
    }
    showAtticImage(attachmentFile) {
        const browser = this.iab.create(attachmentFile.url, '_system', 'location=yes,hardwareback=yes,hidden=yes');
    }
    showRoofImage(attachmentFile) {
        const browser = this.iab.create(attachmentFile.url, '_system', 'location=yes,hardwareback=yes,hidden=yes');
    }
    showPermitPlan(attachmentFile) {
        const browser = this.iab.create(attachmentFile.url, '_system', 'location=yes,hardwareback=yes,hidden=yes');
    }
    showStampedFile(attachmentFile) {
        console.log(attachmentFile);
        const browser = this.iab.create(attachmentFile.url, '_system', 'location=yes,hardwareback=yes,hidden=yes');
    }
    showRevisionImage(revisionattachment) {
        console.log(revisionattachment);
        const browser = this.iab.create(revisionattachment.url, '_system', 'location=yes,hardwareback=yes,hidden=yes');
    }
};
PestampDesignDetailsPage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"] },
    { type: _utilities_service__WEBPACK_IMPORTED_MODULE_10__["UtilitiesService"] },
    { type: _api_service__WEBPACK_IMPORTED_MODULE_8__["ApiService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_7__["NavController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_7__["ToastController"] },
    { type: _storage_service__WEBPACK_IMPORTED_MODULE_9__["StorageService"] },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ChangeDetectorRef"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_7__["NavController"] },
    { type: _ionic_native_in_app_browser_ngx__WEBPACK_IMPORTED_MODULE_11__["InAppBrowser"] },
    { type: _ionic_native_launch_navigator_ngx__WEBPACK_IMPORTED_MODULE_6__["LaunchNavigator"] },
    { type: _utilities_mixpanel_service__WEBPACK_IMPORTED_MODULE_12__["MixpanelService"] }
];
PestampDesignDetailsPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-pestamp-design-details',
        template: _raw_loader_pestamp_design_details_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_pestamp_design_details_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], PestampDesignDetailsPage);



/***/ }),

/***/ "8JoP":
/*!***************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pestamp-design-details/pestamp-design-details.page.html ***!
  \***************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header class=\"ion-no-border white-bg\" *ngIf=\"design\">\r\n  <ion-grid class=\"ion-padding-top ion-padding-start ion-padding-end header-bg\">\r\n      <ion-row>\r\n          <ion-col size=\"1\">\r\n              <ion-button fill=\"clear\" size=\"small\" class=\"ion-no-padding\" (click)=\"goBack()\" [disabled]=enableDisable>\r\n                  <ion-img src=\"/assets/images/back.svg\" class=\"action-icon\"></ion-img>\r\n              </ion-button>\r\n          </ion-col>\r\n          <!-- <ion-col size=\"auto\">\r\n              <ion-button fill=\"clear\" disabled=\"true\" size=\"small\" class=\"ion-no-padding action-icon\">\r\n              </ion-button>\r\n          </ion-col> -->\r\n          <ion-col class=\"ion-text-center\" size=\"9\" style=\"padding-left: 27px;\">\r\n              <ion-grid class=\"ion-align-items-center ion-justify-content-center\">\r\n                  <ion-row class=\"ion-align-items-center ion-justify-content-center\">\r\n                      <span class=\"survey-name ion-text-center\">{{design?.personname}}</span>\r\n                  </ion-row>\r\n                  <ion-row class=\"ion-align-items-center ion-justify-content-center\">\r\n                      <span class=\"survey-email ion-text-center\">{{design?.email}}</span>\r\n                  </ion-row>\r\n              </ion-grid>\r\n          </ion-col>\r\n          <ion-col size=\"1\" *ngIf=\"design.createdby.id == user.id && (design.status == 'created' || design.status == 'declined')\">\r\n              <ion-button fill=\"clear\" size=\"small\" class=\"ion-no-padding\"\r\n                  [routerLink]=\"['/pestamp-schedule/',designId]\"  routerDirection=\"forward\" [disabled]=enableDisable>\r\n                  <ion-img src=\"/assets/images/edit.svg\" class=\"action-icon\"></ion-img>\r\n              </ion-button>\r\n          </ion-col>\r\n          <ion-col size=\"1\" *ngIf=\"design.createdby.id == user.id && (design.status == 'created' || design.status == 'declined')\">\r\n              <ion-button fill=\"clear\" size=\"small\" class=\"ion-no-padding\" (click)=\"deleteDesign()\" [disabled]=enableDisable>\r\n                  <ion-img src=\"/assets/images/trash.svg\" class=\"action-icon\"></ion-img>\r\n              </ion-button>\r\n          </ion-col>\r\n      </ion-row>\r\n  </ion-grid>\r\n  <ion-grid class=\"position-relative ion-no-padding\">\r\n      <ion-row class=\"ion-no-padding border-header header-half-height\">\r\n      </ion-row>\r\n      <ion-row class=\"ion-no-padding header-half-height\">\r\n\r\n      </ion-row>\r\n      <ion-row class=\"ion-no-padding position-absolute header-icon-position full-width\">\r\n          <ion-col class=\"flex-center\">\r\n              <ion-img src=\"/assets/detailpage/PEStamping.svg\" class=\"header-icon\"></ion-img>\r\n          </ion-col>\r\n      </ion-row>\r\n  </ion-grid>\r\n</ion-header>\r\n<ion-content class=\"ion-padding page-text-color\" scrollY=\"true\">\r\n  <ion-grid *ngIf=\"design\" class=\"page-text-color\">\r\n      <ion-row *ngIf=\"design.deliveryaddress != null && design.deliveryaddress != ''\" >\r\n          <ion-col class=\"font\">\r\n              <span (click)=\"openAddressOnMap(design.deliveryaddress)\" class=\"address\">{{design?.deliveryaddress}}</span>\r\n          </ion-col>\r\n      </ion-row>\r\n\r\n      <ion-row class=\"ion-no-padding\" *ngIf=\"design.contactnumber != null\">\r\n        <ion-col><span class=\"model-type font\">Phone Number</span></ion-col>\r\n        <ion-col size=\"auto\">\r\n            <span class=\"model-name font\">{{design?.contactnumber}}</span>\r\n        </ion-col>\r\n    </ion-row>\r\n\r\n    <ion-row class=\"ion-no-padding\">\r\n        <ion-col><span class=\"model-type font\">Stamping Mode</span></ion-col>\r\n        <ion-col size=\"auto\">\r\n            <span class=\"model-name font\">{{design?.modeofstamping}}</span>\r\n        </ion-col>\r\n    </ion-row>\r\n\r\n    <ion-row class=\"ion-no-padding\" *ngIf=\"design.hardcopies != null\">\r\n        <ion-col><span class=\"model-type font\">Hard Copies</span></ion-col>\r\n        <ion-col size=\"auto\">\r\n            <span class=\"model-name font\">{{design?.hardcopies}}</span>\r\n        </ion-col>\r\n    </ion-row>\r\n\r\n    <ion-row class=\"ion-no-padding\">\r\n        <ion-col><span class=\"model-type font\">Property Type</span></ion-col>\r\n        <ion-col size=\"auto\">\r\n            <span class=\"model-name font\">{{design?.propertytype}}</span>\r\n        </ion-col>\r\n    </ion-row>\r\n    \r\n    <ion-row>\r\n        <ion-col><span class=\"model-type font\">Mounting Type</span></ion-col>\r\n        <ion-col size=\"auto\">\r\n            <span class=\"model-name font\">{{design?.mountingtype}}</span>\r\n        </ion-col>\r\n    </ion-row>\r\n\r\n    <ion-row class=\"ion-no-padding\" *ngIf=\"design.jobtype != null\">\r\n        <ion-col><span class=\"model-type font\">Job Type</span></ion-col>\r\n        <ion-col size=\"auto\">\r\n            <span class=\"model-name font\">{{design?.jobtype}}</span>\r\n        </ion-col>\r\n    </ion-row>\r\n\r\n    <ion-row class=\"ion-no-padding\">\r\n        <ion-col><span class=\"model-type font\">Stamping Type</span></ion-col>\r\n        <ion-col size=\"auto\">\r\n            <span class=\"model-name font\">{{design?.type}}</span>\r\n        </ion-col>\r\n    </ion-row>\r\n\r\n    <ion-row class=\"ion-no-padding font\">\r\n        <ng-container *ngIf=\"design.atticphotos.length > 0\">\r\n            <ion-col><span class=\"model-type font\">Attic Photos</span></ion-col>\r\n            <ion-col size=\"auto\" >\r\n                <div *ngFor=\"let attic of design.atticphotos;let i=index\" style=\"display: flex;justify-content: flex-end;\">\r\n                    <span class=\"model-name font\" style=\"color:#3c78d8 !important\" (click)=\"showAtticImage(attic)\">{{attic?.name}}{{attic?.ext}}</span>\r\n                </div>\r\n            </ion-col>\r\n        </ng-container>\r\n    </ion-row>\r\n\r\n    <ion-row class=\"ion-no-padding font\">\r\n        <ng-container *ngIf=\"design.roofphotos.length > 0\">\r\n            <ion-col><span class=\"model-type font\">Roof Photos</span></ion-col>\r\n            <ion-col size=\"auto\" >\r\n                <div *ngFor=\"let roof of design.roofphotos;let i=index\" style=\"display: flex;justify-content: flex-end;\">\r\n                    <span class=\"model-name font\" style=\"color:#3c78d8 !important\" (click)=\"showRoofImage(roof)\">{{roof?.name}}{{roof?.ext}}</span>\r\n                </div>\r\n            </ion-col>\r\n        </ng-container>\r\n    </ion-row>\r\n\r\n    <ion-row class=\"ion-no-padding font\">\r\n        <ng-container *ngIf=\"design.permitplan.length > 0\">\r\n            <ion-col><span class=\"model-type font\">Permit Plan</span></ion-col>\r\n            <ion-col size=\"auto\" >\r\n                <div *ngFor=\"let permitplan of design.permitplan;let i=index\" style=\"display: flex;justify-content: flex-end;\">\r\n                    <span class=\"model-name font\" style=\"color:#3c78d8 !important\" (click)=\"showPermitPlan(permitplan)\">{{permitplan?.name}}{{permitplan?.ext}}</span>\r\n                </div>\r\n            </ion-col>\r\n        </ng-container>\r\n    </ion-row>\r\n\r\n    <ion-row class=\"ion-no-padding font\" *ngIf=\"((user.role.type!='clientsuperadmin' && user.role.type!='clientadmin') || ((user.role.type==='clientsuperadmin' || user.role.type === 'clientadmin') && design.status==='delivered'))\">\r\n        <ng-container *ngIf=\"design.stampedfiles != null\">\r\n            <ion-col><span class=\"model-type font\">Stamped Files</span></ion-col>\r\n            <ion-col size=\"auto\" >\r\n                    <span class=\"model-name font\" style=\"color:#3c78d8 !important\" (click)=\"showStampedFile(design.stampedfiles)\">{{design.stampedfiles.name}}{{design.stampedfiles.ext}}</span>\r\n                <!-- </div> -->\r\n            </ion-col>\r\n        </ng-container>\r\n    </ion-row>\r\n\r\n    <ion-row class=\"ion-no-padding\" *ngIf=\"((design.status == 'completed' || design.status == 'delivered') && design.propertytype == 'commercial') && (user.role.type !='clientadmin' && user.role.type !='clientsuperadmin')\">\r\n        <ion-col><span class=\"model-type font\">Working Hours</span></ion-col>\r\n        <ion-col size=\"auto\">\r\n            <span class=\"model-name font\">{{design?.workinghours}}</span>\r\n        </ion-col>\r\n    </ion-row>\r\n\r\n    <ion-row *ngIf=\"design.comments || design.comments !=null  \" class=\"ion-no-padding ion-margin-top\">\r\n        <ion-col size=\"6\">\r\n            <span class=\"models font\">Comments</span>\r\n        </ion-col>\r\n        <!-- <div> -->\r\n\r\n        <ion-col size=\"6\"  class=\"ion-no-padding\">\r\n            <div *ngFor=\"let comment of design.comments\">\r\n                <!-- <span [innerHTML]=\"comment?.message | linky\"></span> -->\r\n                <p  [innerHTML]=\"comment?.message | linkify\" class=\"comment font\" style=\"text-align: right;margin:0px\">}</p>\r\n                <p class=\"comment-by\" style=\"text-align: right;margin-top:0px\">Posted by {{comment.createdby?.firstname}}\r\n                    {{comment.createdby?.lastname}}</p>\r\n            </div>\r\n        </ion-col>\r\n        </ion-row>\r\n\r\n        <ion-row *ngIf=\"design.isinrevisionstate\" class=\"ion-no-padding ion-margin-top font\">\r\n            <ion-col size=\"6\"  >\r\n                <span class=\"model-type font\">Revision Comments</span></ion-col>\r\n                <ion-col size=\"6\" >\r\n                    <div>\r\n                        <p class=\"model-space font\" style=\"text-align: right;\">{{design.revisioncomments}}</p>\r\n  \r\n                    </div>\r\n  \r\n                   </ion-col>\r\n            </ion-row>\r\n              <ion-row class=\"ion-no-padding font\" *ngIf=\"design.isinrevisionstate && design.revisionattachments.length > 0\">\r\n             <ion-col > <span class=\"model-type font\">Revision Attachments</span></ion-col>\r\n             <ion-col size=\"6\"  style=\"float: right;\" *ngFor=\"let attachmentfile of design.revisionattachments\">\r\n  \r\n                <span class=\"model-space font\" style=\"text-align:right;color:#3c78d8 !important\" (click)=\"showRevisionImage(attachmentfile)\">{{attachmentfile.name.length > 40 ? (attachmentfile.name | slice: 0:40) + '...' : attachmentfile.name}}{{attachmentfile.ext}}</span>\r\n              </ion-col>\r\n  \r\n            </ion-row>\r\n\r\n        <ion-row>\r\n            <ion-col><span class=\"model-type font\">Created at</span></ion-col>\r\n            <ion-col size=\"auto\">\r\n                <span class=\"model-name font\">{{design.created_at | date: 'dd/MM/yyyy hh:mm a'}}</span>\r\n            </ion-col>\r\n        </ion-row>\r\n    <form novalidate [formGroup]=\"pestampForm\">\r\n        <ion-grid *ngIf=\"(design.status=='assigned' && design.acceptedbypeengineer==true) && user.role.type=='peengineer'\">\r\n        <ion-row >\r\n            <ion-col size=\"12\">\r\n        \r\n                <ng-container>\r\n                    <ion-item class=\"ion-no-padding\" (click)=\"f.click()\">\r\n                        <ion-label class=\"model-type font\" position=\"floating\">Stamped Files*</ion-label>\r\n                            <input type=\"file\" #f class=\"form_input\"  (change)=\"files($event)\" style=\"margin-top: 12px;\" formControlName=\"stampedfiles\">\r\n                            <ion-icon name=\"attach-outline\" slot=\"end\" style=\"margin-top:21px\"></ion-icon>\r\n                        </ion-item>\r\n                        <div *ngFor=\"let file of stampfile;let i = index\">\r\n                            <ion-item>\r\n                                <ion-col size=\"11\">\r\n                                    {{file.name}}\r\n                                </ion-col>\r\n                                <ion-col size=\"1\" (click)=\"removeArc(i)\">x</ion-col>\r\n                            </ion-item>\r\n                        </div>\r\n                        </ng-container>\r\n                        \r\n                    </ion-col>\r\n                                 <!-- <ion-item> -->\r\n                                 <!-- <ion-label position=\"floating\">architectural design*</ion-label> -->\r\n                                        <ng-container *ngIf=\"design && design.stampedfiles !==null\">\r\n                                            <div *ngFor=\"let stamp of design.stampedfiles; let i = index\">\r\n                                               <ion-item>\r\n                                                   <ion-col size=\"11\"> {{stamp.name}}{{stamp.ext}}</ion-col>\r\n                                                   <ion-col size=\"1\" (click)=\"remove(stamp, i)\">x</ion-col>\r\n                                                  \r\n              \r\n                                               </ion-item>\r\n                                           \r\n                                               \r\n                                           </div> \r\n                                        </ng-container>\r\n                                 <!-- </ion-item> -->\r\n            \r\n        </ion-row>\r\n    <ion-row class=\"ion-no-padding workinghours\" *ngIf=\"design.propertytype=='commercial'\">\r\n        <ng-container>\r\n            <ion-col><span class=\"model-type workinghours\">Working Hours</span></ion-col>\r\n            <ion-col size=\"auto\" >\r\n                <!-- <ion-input *ngIf=\"design.workinghours == '0' \" class=\"ht_wt\" type=\"tel\" min=\"1\" maxLength=\"2\" formControlName=\"workinghours\" ></ion-input> -->\r\n                <ion-input class=\"ht_wt\" type=\"tel\" min=\"1\" formControlName=\"workinghours\" ></ion-input>\r\n                <!-- </div> -->\r\n                <!-- <span *ngIf=\"pestampForm.get('workinghours').dirty && pestampForm.get('workinghours').hasError('max')\"class=\"model-name font\" style=\"color: red;font-size: 8px;\">Maximum hours should be 48</span>\r\n                <span *ngIf=\"pestampForm.get('workinghours').dirty && pestampForm.get('workinghours').hasError('min')\"class=\"model-name font\" style=\"color: red;font-size: 8px;\">Minimum hours should be 1</span>\r\n                <span *ngIf=\"pestampForm.get('workinghours').dirty && pestampForm.get('workinghours').hasError('pattern')\"class=\"model-name font\" style=\"color: red;font-size: 8px;\">Please enter valid numbers</span> -->\r\n                <div style=\"height: 5px;\">\r\n                    <div *ngIf=\"pestampForm.get('workinghours').hasError('max') && pestampForm.get('workinghours').dirty\">\r\n                        <span class=\"model-name font\" style=\"color: red;font-size: 8px;\">Maximum hours should be 48</span>\r\n                    </div>\r\n                    <!-- <div *ngIf=\"pestampForm.get('workinghours').dirty && pestampForm.get('workinghours').hasError('pattern')\">\r\n                      <span class=\"model-name font\" style=\"color: red;font-size: 8px;\">Please enter valid numbers</span>\r\n                  </div> -->\r\n                    <div *ngIf=\"pestampForm.get('workinghours').hasError('min') && pestampForm.get('workinghours').dirty\">\r\n                        <span class=\"model-name font\" style=\"color: red;font-size: 8px;\">Minimum hours should be 1</span>\r\n                    </div>\r\n                </div>\r\n            </ion-col>\r\n        </ng-container>\r\n    </ion-row>\r\n</ion-grid>\r\n    </form>\r\n\r\n    <!-- <ion-row *ngIf=\"design.comments !=[] || design.comments !==null  \" class=\"ion-no-padding ion-margin-top\"> -->\r\n        <ion-row *ngIf=\"design.status=='declined'\" class=\"ion-no-padding font\">\r\n            <ion-col size=\"6\"  >\r\n                <span class=\"model-type font\">Reason</span></ion-col>\r\n                <ion-col size=\"6\" >\r\n                        <span class=\"model-name font\" style=\"float: right !important\">{{design.requestdeclinereason}}</span>\r\n                    </ion-col>\r\n            </ion-row>\r\n                <ion-row *ngIf=\"design.status=='declined' && design.requestdeclineattachment.length > 0\">\r\n                <ion-col > <span class=\"model-type font\">Reason Attachment</span></ion-col>\r\n                <ion-col size=\"6\"  style=\"float: right;\" *ngFor=\"let attachment of design.requestdeclineattachment\">\r\n                <span class=\"model-space font\" style=\"text-align:right;color:#3c78d8 !important\" (click)=\"showreasonImage(attachment)\">{{attachment.name.length > 40 ? (attachment.name | slice: 0:40) + '...' : attachment.name}}{{attachment.ext}}</span>\r\n                </ion-col>\r\n            </ion-row>\r\n        <!-- </ion-row> -->\r\n    \r\n\r\n    <ion-row size=\"12\" class=\"ion-no-padding ion-margin-top ion-justify-content-center ion-align-items-center\"\r\n      *ngIf=\"design.status=='assigned'||design.status=='completed'\">\r\n      <ion-col class=\"ion-justify-content-center ion-align-items-center\"><span class=\"model-type font\">Assigned to</span></ion-col>\r\n      <ion-col size=\"auto\">\r\n          <div class=\"selected d-flex\">\r\n              <img *ngIf=\"design.assignedto.contractorlogo && design.assignedto.contractorlogo.logo\"\r\n                  [src]=\"design.assignedto.contractorlogo.logo.url\" class=\"assignee-image\" />\r\n              <div *ngIf=\"!design.assignedto.contractorlogo || !design.assignedto.contractorlogo.logo\"\r\n                  class=\"assignee-image d-flex flex-row align-center justify-center\">\r\n                  <div class=\"name_div\">\r\n                      <span\r\n                          style=\"text-transform: capitalize;\">{{design.assignedto.firstname.substring(0, 1)}}{{design.assignedto.lastname.substring(0, 1)}}</span>\r\n                  </div>\r\n              </div>\r\n          </div>\r\n      </ion-col>\r\n  </ion-row>\r\n  <form novalidate [formGroup]=\"commentform\">\r\n    <ion-row *ngIf=\"(design.status=='assigned' && design.acceptedbypeengineer==true) && user.role.type=='peengineer'\">\r\n        <ion-col size=\"12\" *ngIf=\"design.status =='assigned'\">\r\n            <span class=\"input-placeholder\">Comments</span>\r\n        </ion-col>\r\n        <ion-col size=\"12\" *ngIf=\"design.status =='assigned'\" style=\"padding-top: 0px;\">\r\n            <ion-textarea style=\"max-width: 98%;\" class=\"ion-no-margin ion-no-padding comment_box\" rows=\"3\"\r\n                          formControlName=\"comments\"></ion-textarea>\r\n        </ion-col>\r\n\r\n    </ion-row>\r\n  </form>\r\n      </ion-grid>\r\n      </ion-content>\r\n\r\n      <ion-footer  class=\"ion-no-border white-bg\" *ngIf=\"design && design.status =='assigned'\">\r\n        <ion-grid>\r\n            <ion-row class=\"ion-text-end ion-align-items-end ion-justify-content-end\" *ngIf=\"(design.status=='assigned' && design.acceptedbypeengineer==true) && user.role.type=='peengineer'\">\r\n                <ion-col size=\"auto\">\r\n                    <ion-button class=\"action-button-color\" fill=\"clear\" (click)=\"submit()\">Submit</ion-button>\r\n                </ion-col>\r\n            </ion-row>\r\n        </ion-grid>\r\n    \r\n    </ion-footer>\r\n");

/***/ }),

/***/ "BuCH":
/*!*************************************************************************!*\
  !*** ./src/app/pestamp-design-details/pestamp-design-details.page.scss ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".survey-email {\n  font-size: 0.8em;\n}\n\n.survey-name {\n  font-size: 1.7em;\n}\n\n.survey-phone {\n  font-size: 0.8em;\n}\n\nion-header {\n  color: #666666;\n}\n\n.page-text-color {\n  color: #666666 !important;\n}\n\n.image-count {\n  width: 48px;\n  height: 48px;\n}\n\n.data-header {\n  font-size: 0.9em;\n  color: #BFBFBF;\n}\n\n.data-point {\n  font-size: 1em;\n  color: black;\n}\n\n.address {\n  color: #3a7be0;\n}\n\n.models {\n  font-size: 18px;\n  color: #B6B6B6;\n}\n\n.model-type {\n  font-size: 18px;\n  color: #B6B6B6;\n}\n\n.model-name {\n  font-size: 15px;\n  text-transform: capitalize;\n}\n\n.model-space {\n  font-size: 15px;\n  text-transform: capitalize;\n  float: right;\n}\n\n.comment {\n  font-size: 18px;\n}\n\n.comment-by {\n  font-size: 10px;\n  font-style: italic;\n  color: #666666 !important;\n}\n\n.assignee-image {\n  width: 3.5em;\n  height: 3.5em;\n  border-radius: 50%;\n  object-fit: fill;\n  border: 2px solid white;\n  padding: 8px;\n  text-align: center;\n  background: #FFF1CF;\n}\n\n.assignee-margin {\n  margin: 8px;\n  text-align: center;\n}\n\n.selected {\n  border: 3px solid #3c78d8;\n  border-radius: 50%;\n}\n\n.normal {\n  border: 3px solid white;\n}\n\ndiv[scrollx=true], div[scrolly=true] {\n  position: relative;\n  overflow: hidden;\n}\n\ndiv[scrollx=true] ::-webkit-scrollbar, div[scrolly=true] ::-webkit-scrollbar {\n  display: none;\n}\n\ndiv[scrollx=true] {\n  overflow-x: auto;\n}\n\ndiv[scrolly=true] {\n  overflow-y: auto;\n}\n\n.name_div {\n  font-size: 20px;\n}\n\n.font {\n  font-size: 0.7rem;\n}\n\n.workinghours {\n  font-size: 0.7rem;\n  margin-top: 12px !important;\n}\n\n.flx {\n  display: flex;\n  align-items: center;\n}\n\n.ht_wt {\n  border: 1px solid;\n  height: 28px;\n  width: 105px;\n}\n\ninput[type=file] {\n  visibility: hidden;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXHBlc3RhbXAtZGVzaWduLWRldGFpbHMucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksZ0JBQUE7QUFDSjs7QUFFRTtFQUNFLGdCQUFBO0FBQ0o7O0FBRUU7RUFDRSxnQkFBQTtBQUNKOztBQUVFO0VBQ0UsY0FBQTtBQUNKOztBQUVFO0VBQ0UseUJBQUE7QUFDSjs7QUFJRTtFQUNFLFdBQUE7RUFDQSxZQUFBO0FBREo7O0FBSUU7RUFDRSxnQkFBQTtFQUNBLGNBQUE7QUFESjs7QUFJRTtFQUNFLGNBQUE7RUFDQSxZQUFBO0FBREo7O0FBSUU7RUFDRSxjQUFBO0FBREo7O0FBSUU7RUFDRSxlQUFBO0VBQ0EsY0FBQTtBQURKOztBQUlFO0VBQ0UsZUFBQTtFQUNBLGNBQUE7QUFESjs7QUFJRTtFQUNFLGVBQUE7RUFDQSwwQkFBQTtBQURKOztBQUdFO0VBQ0UsZUFBQTtFQUNBLDBCQUFBO0VBQ0EsWUFBQTtBQUFKOztBQUVFO0VBQ0UsZUFBQTtBQUNKOztBQUVFO0VBQ0UsZUFBQTtFQUNBLGtCQUFBO0VBQ0EseUJBQUE7QUFDSjs7QUFFRTtFQUNFLFlBQUE7RUFDQSxhQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLHVCQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7QUFDSjs7QUFFRTtFQUNFLFdBQUE7RUFDQSxrQkFBQTtBQUNKOztBQUVFO0VBQ0UseUJBQUE7RUFDQSxrQkFBQTtBQUNKOztBQUVFO0VBQ0UsdUJBQUE7QUFDSjs7QUFFRTtFQUNFLGtCQUFBO0VBQ0EsZ0JBQUE7QUFDSjs7QUFDSTtFQUNFLGFBQUE7QUFDTjs7QUFHRTtFQUNFLGdCQUFBO0FBQUo7O0FBR0U7RUFDRSxnQkFBQTtBQUFKOztBQUdFO0VBQ0UsZUFBQTtBQUFKOztBQUdFO0VBQ0EsaUJBQUE7QUFBRjs7QUFHRTtFQUNFLGlCQUFBO0VBQ0EsMkJBQUE7QUFBSjs7QUFHRTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtBQUFKOztBQU1FO0VBRUUsaUJBQUE7RUFDQSxZQUFBO0VBQ0EsWUFBQTtBQUpKOztBQVFFO0VBQ0Usa0JBQUE7QUFMSiIsImZpbGUiOiJwZXN0YW1wLWRlc2lnbi1kZXRhaWxzLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5zdXJ2ZXktZW1haWwge1xyXG4gICAgZm9udC1zaXplOiAwLjhlbTtcclxuICB9XHJcbiAgXHJcbiAgLnN1cnZleS1uYW1lIHtcclxuICAgIGZvbnQtc2l6ZTogMS43ZW07XHJcbiAgfVxyXG4gIFxyXG4gIC5zdXJ2ZXktcGhvbmUge1xyXG4gICAgZm9udC1zaXplOiAwLjhlbTtcclxuICB9XHJcbiAgXHJcbiAgaW9uLWhlYWRlciB7XHJcbiAgICBjb2xvcjogIzY2NjY2NjtcclxuICB9XHJcbiAgXHJcbiAgLnBhZ2UtdGV4dC1jb2xvciB7XHJcbiAgICBjb2xvcjogIzY2NjY2NiAhaW1wb3J0YW50OztcclxuICB9XHJcbiAgXHJcbiAgXHJcbiAgXHJcbiAgLmltYWdlLWNvdW50IHtcclxuICAgIHdpZHRoOiA0OHB4O1xyXG4gICAgaGVpZ2h0OiA0OHB4O1xyXG4gIH1cclxuICBcclxuICAuZGF0YS1oZWFkZXIge1xyXG4gICAgZm9udC1zaXplOiAwLjllbTtcclxuICAgIGNvbG9yOiAjQkZCRkJGO1xyXG4gIH1cclxuICBcclxuICAuZGF0YS1wb2ludCB7XHJcbiAgICBmb250LXNpemU6IDFlbTtcclxuICAgIGNvbG9yOiBibGFjaztcclxuICB9XHJcbiAgXHJcbiAgLmFkZHJlc3Mge1xyXG4gICAgY29sb3I6ICMzYTdiZTA7XHJcbiAgfVxyXG4gIFxyXG4gIC5tb2RlbHMge1xyXG4gICAgZm9udC1zaXplOiAxOHB4O1xyXG4gICAgY29sb3I6ICNCNkI2QjY7XHJcbiAgfVxyXG4gIFxyXG4gIC5tb2RlbC10eXBlIHtcclxuICAgIGZvbnQtc2l6ZTogMThweDtcclxuICAgIGNvbG9yOiAjQjZCNkI2O1xyXG4gIH1cclxuICBcclxuICAubW9kZWwtbmFtZSB7XHJcbiAgICBmb250LXNpemU6IDE1cHg7XHJcbiAgICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTtcclxuICB9XHJcbiAgLm1vZGVsLXNwYWNlIHtcclxuICAgIGZvbnQtc2l6ZTogMTVweDtcclxuICAgIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1xyXG4gICAgZmxvYXQ6cmlnaHQ7XHJcbiAgfVxyXG4gIC5jb21tZW50IHtcclxuICAgIGZvbnQtc2l6ZTogMThweDtcclxuICB9XHJcbiAgXHJcbiAgLmNvbW1lbnQtYnkge1xyXG4gICAgZm9udC1zaXplOiAxMHB4O1xyXG4gICAgZm9udC1zdHlsZTogaXRhbGljO1xyXG4gICAgY29sb3I6ICM2NjY2NjYgIWltcG9ydGFudDtcclxuICB9XHJcbiAgXHJcbiAgLmFzc2lnbmVlLWltYWdlIHtcclxuICAgIHdpZHRoOiAzLjVlbTtcclxuICAgIGhlaWdodDogMy41ZW07XHJcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgICBvYmplY3QtZml0OiBmaWxsO1xyXG4gICAgYm9yZGVyOiAycHggc29saWQgd2hpdGU7XHJcbiAgICBwYWRkaW5nOiA4cHg7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBiYWNrZ3JvdW5kOiAjRkZGMUNGO1xyXG4gIH1cclxuICBcclxuICAuYXNzaWduZWUtbWFyZ2luIHtcclxuICAgIG1hcmdpbjogOHB4O1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIH1cclxuICBcclxuICAuc2VsZWN0ZWQge1xyXG4gICAgYm9yZGVyOiAzcHggc29saWQgIzNjNzhkODtcclxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICB9XHJcbiAgXHJcbiAgLm5vcm1hbCB7XHJcbiAgICBib3JkZXI6IDNweCBzb2xpZCB3aGl0ZTtcclxuICB9XHJcbiAgXHJcbiAgZGl2W3Njcm9sbHg9dHJ1ZV0sIGRpdltzY3JvbGx5PXRydWVdIHtcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgXHJcbiAgICA6Oi13ZWJraXQtc2Nyb2xsYmFyIHtcclxuICAgICAgZGlzcGxheTogbm9uZTtcclxuICAgIH1cclxuICB9XHJcbiAgXHJcbiAgZGl2W3Njcm9sbHg9dHJ1ZV0ge1xyXG4gICAgb3ZlcmZsb3cteDogYXV0bztcclxuICB9XHJcbiAgXHJcbiAgZGl2W3Njcm9sbHk9dHJ1ZV0ge1xyXG4gICAgb3ZlcmZsb3cteTogYXV0bztcclxuICB9XHJcbiAgXHJcbiAgLm5hbWVfZGl2e1xyXG4gICAgZm9udC1zaXplOiAyMHB4O1xyXG4gIH1cclxuICBcclxuICAuZm9udHtcclxuICBmb250LXNpemU6IC43cmVtO1xyXG4gIH1cclxuICBcclxuICAud29ya2luZ2hvdXJze1xyXG4gICAgZm9udC1zaXplOiAuN3JlbTtcclxuICAgIG1hcmdpbi10b3A6IDEycHggIWltcG9ydGFudDtcclxuICAgIH1cclxuXHJcbiAgLmZseHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIH1cclxuICBcclxuICAvLyBpbnB1dFt0eXBlPVwiZmlsZVwiXXtcclxuICAvLyAgIHZpc2liaWxpdHk6aGlkZGVuO1xyXG4gIC8vIH1cclxuICAuaHRfd3R7XHJcbiAgICBcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkO1xyXG4gICAgaGVpZ2h0OiAyOHB4O1xyXG4gICAgd2lkdGg6IDEwNXB4O1xyXG5cclxuICB9XHJcblxyXG4gIGlucHV0W3R5cGU9XCJmaWxlXCJde1xyXG4gICAgdmlzaWJpbGl0eTpoaWRkZW47XHJcbiAgfVxyXG4gIFxyXG4gIFxyXG4gIFxyXG4gIFxyXG4gIFxyXG4gICJdfQ== */");

/***/ }),

/***/ "O0Rn":
/*!*************************************************************************!*\
  !*** ./src/app/pestamp-design-details/pestamp-design-details.module.ts ***!
  \*************************************************************************/
/*! exports provided: PestampDesignDetailsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PestampDesignDetailsPageModule", function() { return PestampDesignDetailsPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _pestamp_design_details_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./pestamp-design-details-routing.module */ "P+dQ");
/* harmony import */ var _pestamp_design_details_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./pestamp-design-details.page */ "7QjB");
/* harmony import */ var _ionic_native_launch_navigator_ngx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic-native/launch-navigator/ngx */ "fGQ8");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../shared/shared.module */ "PCNd");









let PestampDesignDetailsPageModule = class PestampDesignDetailsPageModule {
};
PestampDesignDetailsPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
            _pestamp_design_details_routing_module__WEBPACK_IMPORTED_MODULE_5__["PestampDesignDetailsPageRoutingModule"],
            _shared_shared_module__WEBPACK_IMPORTED_MODULE_8__["SharedModule"]
        ],
        declarations: [_pestamp_design_details_page__WEBPACK_IMPORTED_MODULE_6__["PestampDesignDetailsPage"]],
        providers: [
            _ionic_native_launch_navigator_ngx__WEBPACK_IMPORTED_MODULE_7__["LaunchNavigator"]
        ]
    })
], PestampDesignDetailsPageModule);



/***/ }),

/***/ "P+dQ":
/*!*********************************************************************************!*\
  !*** ./src/app/pestamp-design-details/pestamp-design-details-routing.module.ts ***!
  \*********************************************************************************/
/*! exports provided: PestampDesignDetailsPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PestampDesignDetailsPageRoutingModule", function() { return PestampDesignDetailsPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _pestamp_design_details_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pestamp-design-details.page */ "7QjB");




const routes = [
    {
        path: '',
        component: _pestamp_design_details_page__WEBPACK_IMPORTED_MODULE_3__["PestampDesignDetailsPage"]
    }
];
let PestampDesignDetailsPageRoutingModule = class PestampDesignDetailsPageRoutingModule {
};
PestampDesignDetailsPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], PestampDesignDetailsPageRoutingModule);



/***/ })

}]);
//# sourceMappingURL=pestamp-design-details-pestamp-design-details-module.js.map