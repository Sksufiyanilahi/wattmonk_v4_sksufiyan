(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["design-details-design-details-module"],{

/***/ "7X7n":
/*!*********************************************************!*\
  !*** ./src/app/design-details/design-details.module.ts ***!
  \*********************************************************/
/*! exports provided: DesignDetailsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DesignDetailsPageModule", function() { return DesignDetailsPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _design_details_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./design-details-routing.module */ "xrjK");
/* harmony import */ var _design_details_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./design-details.page */ "SrmH");
/* harmony import */ var _utilities_utilities_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utilities/utilities.module */ "egEE");
/* harmony import */ var _ionic_native_launch_navigator_ngx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic-native/launch-navigator/ngx */ "fGQ8");
/* harmony import */ var ngx_timer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ngx-timer */ "06dE");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../shared/shared.module */ "PCNd");











let DesignDetailsPageModule = class DesignDetailsPageModule {
};
DesignDetailsPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _design_details_routing_module__WEBPACK_IMPORTED_MODULE_5__["DesignDetailsPageRoutingModule"],
            _utilities_utilities_module__WEBPACK_IMPORTED_MODULE_7__["UtilitiesModule"],
            ngx_timer__WEBPACK_IMPORTED_MODULE_9__["NgxTimerModule"],
            _shared_shared_module__WEBPACK_IMPORTED_MODULE_10__["SharedModule"]
        ],
        declarations: [_design_details_page__WEBPACK_IMPORTED_MODULE_6__["DesignDetailsPage"]],
        providers: [
            _ionic_native_launch_navigator_ngx__WEBPACK_IMPORTED_MODULE_8__["LaunchNavigator"]
        ]
    })
], DesignDetailsPageModule);



/***/ }),

/***/ "SrmH":
/*!*******************************************************!*\
  !*** ./src/app/design-details/design-details.page.ts ***!
  \*******************************************************/
/*! exports provided: DesignDetailsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DesignDetailsPage", function() { return DesignDetailsPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_design_details_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./design-details.page.html */ "Ti8s");
/* harmony import */ var _design_details_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./design-details.page.scss */ "T06W");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../api.service */ "yTNM");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _utilities_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utilities.service */ "oTnF");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _storage_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../storage.service */ "qkCY");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_native_launch_navigator_ngx__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ionic-native/launch-navigator/ngx */ "fGQ8");
/* harmony import */ var ngx_image_compress__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ngx-image-compress */ "X9o6");
/* harmony import */ var ngx_timer__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ngx-timer */ "06dE");
/* harmony import */ var _ionic_native_in_app_browser_ngx__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @ionic-native/in-app-browser/ngx */ "m/P+");
/* harmony import */ var _utilities_mixpanel_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../utilities/mixpanel.service */ "uKCw");















let DesignDetailsPage = class DesignDetailsPage {
    // user: import("j:/wattmonk/mobileapp/src/app/model/user.model").User;
    constructor(utilities, apiService, route, navController, alertController, storage, formBuilder, launchNavigator, toastController, imageCompress, countdownservice, iab, router, mixpanelService) {
        this.utilities = utilities;
        this.apiService = apiService;
        this.route = route;
        this.navController = navController;
        this.alertController = alertController;
        this.storage = storage;
        this.formBuilder = formBuilder;
        this.launchNavigator = launchNavigator;
        this.toastController = toastController;
        this.imageCompress = imageCompress;
        this.countdownservice = countdownservice;
        this.iab = iab;
        this.router = router;
        this.mixpanelService = mixpanelService;
        this.assigned = false;
        this.listOfAssignees = [];
        this.refreshDataOnPreviousPage = 0;
        this.imageName = [];
        this.imageName2 = [];
        this.imagebox = false;
        this.reviewIssues = '';
        this.enableDisable = false;
        // prelimFileType:any;
        this.options = {
            start: '',
            app: this.launchNavigator.APP.GOOGLE_MAPS
        };
        this.prelimFiles = [];
        this.b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
            const byteCharacters = atob(b64Data);
            const byteArrays = [];
            for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                const slice = byteCharacters.slice(offset, offset + sliceSize);
                const byteNumbers = new Array(slice.length);
                for (let i = 0; i < slice.length; i++) {
                    byteNumbers[i] = slice.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                byteArrays.push(byteArray);
            }
            const blob = new Blob(byteArrays, { type: contentType });
            return blob;
        };
        this.b64toBlobb = (b64Data, contentType = '', sliceSize = 512) => {
            const byteCharacters = atob(b64Data);
            const byteArrays = [];
            for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                const slice = byteCharacters.slice(offset, offset + sliceSize);
                const byteNumbers = new Array(slice.length);
                for (let i = 0; i < slice.length; i++) {
                    byteNumbers[i] = slice.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                byteArrays.push(byteArray);
            }
            const blob = new Blob(byteArrays, { type: contentType });
            return blob;
        };
        this.designId = +this.route.snapshot.paramMap.get('id');
        this.assigneeForm = this.formBuilder.group({
            designassignedto: new _angular_forms__WEBPACK_IMPORTED_MODULE_9__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_9__["Validators"].required]),
            status: new _angular_forms__WEBPACK_IMPORTED_MODULE_9__["FormControl"]('designassigned'),
        });
        this.commentsForm = this.formBuilder.group({
            comments: new _angular_forms__WEBPACK_IMPORTED_MODULE_9__["FormControl"](''),
            status: new _angular_forms__WEBPACK_IMPORTED_MODULE_9__["FormControl"]('designcompleted'),
            prelimdesign: new _angular_forms__WEBPACK_IMPORTED_MODULE_9__["FormControl"](null, [_angular_forms__WEBPACK_IMPORTED_MODULE_9__["Validators"].required])
        });
        this.reviewIssuesForm = this.formBuilder.group({
            reviewIssues: new _angular_forms__WEBPACK_IMPORTED_MODULE_9__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_9__["Validators"].required])
        });
    }
    ngOnInit() {
        this.enableDisable = false;
        console.log(this.imageName);
        this.user = this.storage.getUser();
        console.log(this.user);
        this.mixpanelService.track('PRELIM_DESIGN_DETAIL_PAGE_OPEN', {});
        this.dataSubscription = this.utilities.getDesignDetailsRefresh().subscribe((result) => {
            this.refreshDataOnPreviousPage++;
            this.getDesignDetails();
        });
    }
    showDesignImage() {
        const browser = this.iab.create(this.design.prelimdesign.url, '_system', 'location=yes,hardwareback=yes,hidden=yes');
    }
    showRevisionImage(attachmentFile) {
        console.log(attachmentFile);
        const browser = this.iab.create(attachmentFile.url, '_system', 'location=yes,hardwareback=yes,hidden=yes');
    }
    showreasonImage(attachmentFile) {
        const browser = this.iab.create(attachmentFile.url, '_system', 'location=yes,hardwareback=yes,hidden=yes');
    }
    showurl(i, value) {
        if (value == 'attachments') {
            this.browser = this.iab.create(this.design.attachments[i].url, '_system', 'location=yes,hardwareback=yes,hidden=yes');
        }
        else {
            this.browser = this.iab.create(this.design.architecturaldesign[i].url, '_system', 'location=yes,hardwareback=yes,hidden=yes');
        }
    }
    updatecomments() {
        if (this.commentsForm.status === 'INVALID') {
            this.utilities.errorSnackBar('Please select prelim design');
            return false;
        }
        else {
            if (this.exceedfileSize <= 25000000 || this.prelimFileSize <= 25000000) {
                var data = {};
                var date = Date.now();
                if (this.isprelimUpdate) {
                    data = {
                        status: "reviewassigned",
                        designendtime: date,
                        reviewstarttime: date,
                        comments: this.commentsForm.get('comments').value
                    };
                }
                else {
                    data = {
                        status: "designcompleted",
                        designendtime: date,
                        reviewstarttime: date,
                        comments: this.commentsForm.get('comments').value
                    };
                }
                this.utilities.showLoading('Submitting').then(() => {
                    this.apiService.updateDesignForm(data, this.designId).subscribe((success) => {
                        this.utilities.hideLoading().then(() => {
                            this.setData(success);
                            this.uploadpreliumdesign(this.designId, 'prelimdesign');
                            // this.utilities.hideLoading().then(() => {
                            console.log("suc", success);
                            // this.utilities.showSnackBar('Design request has been assigned to' + " " + success.name + " " +'successfully');
                            // this.utilities.setHomepageDesignRefresh(true);
                            //   this.utilities.getDesignDetailsRefresh();
                            //   if(this.isprelimUpdate){
                            //     this.utilities.setHomepageDesignRefresh(true);
                            //     // this.router.navigate(['designoverview/inreviewdesigns']);
                            //     this.navController.pop();
                            //   }
                            //   else
                            //   {
                            //     this.utilities.setHomepageDesignRefresh(true);
                            //     //this.router.navigate(['designoverview/completeddesigns'])
                            //   this.navController.pop();
                            // }
                            // this.navController.navigateRoot(['homepage']);
                        });
                    }, (error) => {
                        this.utilities.hideLoading().then(() => {
                            this.utilities.errorSnackBar('Some Error Occurred');
                        });
                    });
                });
            }
            else {
                this.utilities.errorSnackBar("File is greater than 25MB");
            }
        }
    }
    timer() {
        //countUpTimerConfigModel
        this.timerConfig = new ngx_timer__WEBPACK_IMPORTED_MODULE_12__["countDownTimerConfigModel"]();
        //custom class
        this.timerConfig.timerClass = 'remainingtimerclass';
        //timer text values  
        this.timerConfig.timerTexts = new ngx_timer__WEBPACK_IMPORTED_MODULE_12__["countDownTimerTexts"]();
        this.timerConfig.timerTexts.hourText = " :"; //default - hh
        this.timerConfig.timerTexts.minuteText = " :"; //default - mm
        this.timerConfig.timerTexts.secondsText = " "; //default - ss
        if (this.design.status == "designassigned") {
            let cdate = new Date(this.design.designstarttime);
            console.log(cdate);
            cdate.setHours(cdate.getHours() + 2);
            this.countdownservice.startTimer(cdate);
        }
        else if (this.design.status == "reviewassigned") {
            let cdate = new Date(this.design.reviewstarttime);
            cdate.setMinutes(cdate.getMinutes() + 15);
            this.countdownservice.startTimer(cdate);
        }
        else if (this.design.status == 'designcompleted') {
            this.countdownservice.stopTimer();
        }
    }
    ngOnDestroy() {
        this.dataSubscription.unsubscribe();
        if (this.refreshDataOnPreviousPage > 1) {
            this.utilities.setHomepageDesignRefresh(true);
        }
    }
    getDesignDetails() {
        this.getAssignees();
        this.utilities.showLoading('Getting Design Details').then((success) => {
            this.apiService.getDesginDetail(this.designId).subscribe((result) => {
                this.utilities.hideLoading();
                console.log('re', result);
                this.setData(result);
                this.utilities.setDesignDetails(result);
                this.timer();
            }, (error) => {
                this.utilities.hideLoading();
            });
        });
    }
    goBack() {
        this.mixpanelService.track("PRELIM_DESIGN_DETAIL_PAGE_CLOSE", {});
        this.navController.pop();
    }
    editDesign() {
    }
    scheduleRoute(design) {
        console.log("hello", design);
        if (design.requirementtype == "assessment") {
            this.router.navigate(['/schedule/design/' + design.id]);
        }
        else if (design.requirementtype == 'proposal') {
            this.router.navigate(['/schedule/salesproposal/' + design.id]);
        }
    }
    setData(result) {
        this.design = result;
        console.log(this.design, ">>>>>>>>>>>>>>>>");
        if (this.design.isinrevisionstate && this.design.status == 'designassigned') {
            this.imageName = [];
        }
        else {
            this.imageName = result.prelimdesign == null ? '' : result.prelimdesign.name + result.prelimdesign.ext;
            console.log(this.imageName);
        }
        if (this.design.newconstruction == true) {
            this.design.newconstruction = 'Yes';
        }
        else {
            this.design.newconstruction = 'No';
        }
        this.assigned = this.design.designassignedto !== null && this.design.designassignedto !== undefined;
    }
    deleteDesign() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.enableDisable = true;
            const toast = yield this.toastController.create({
                header: 'Delete Design',
                message: 'Are you sure you want to delete this design?',
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
            this.apiService.deleteDesign(this.designId).subscribe((result) => {
                console.log('result', result);
                this.utilities.hideLoading().then(() => {
                    this.utilities.showSnackBar(this.design.name + " " + 'has been deleted successfully');
                    this.navController.pop();
                    this.utilities.setHomepageDesignRefresh(true);
                });
            }, (error) => {
                this.utilities.hideLoading().then(() => {
                    this.utilities.errorSnackBar('Some Error Occurred');
                });
            });
        });
    }
    getAssignees() {
        this.apiService.getDesigners().subscribe(assignees => {
            this.listOfAssignees = [];
            assignees.forEach(item => this.listOfAssignees.push(item));
            console.log(this.listOfAssignees);
        });
    }
    updateAssignee() {
        if (this.assigneeForm.status === 'INVALID') {
            this.utilities.errorSnackBar('Please select an assignee');
        }
        else {
            this.utilities.showLoading('Updating').then(() => {
                this.apiService.updateDesignForm(this.assigneeForm.value, this.designId).subscribe((success) => {
                    this.utilities.hideLoading().then(() => {
                        console.log("suc", success);
                        this.setData(success);
                        this.utilities.showSnackBar('Design request has been assigned to' + " " + success.name + " " + 'successfully');
                        this.utilities.setHomepageDesignRefresh(true);
                        this.navController.navigateRoot(['homepage']);
                    });
                }, (error) => {
                    this.utilities.hideLoading().then(() => {
                        this.utilities.errorSnackBar('Some Error Occurred');
                    });
                });
            });
        }
    }
    openAddressOnMap(address) {
        this.launchNavigator.navigate(address, this.options);
    }
    showuploadbox() {
        // console.log(this.design.prelimdesign.id);
        this.apiService.deletePrelimImage(this.design.prelimdesign.id).subscribe(_res => { });
        console.log(this.imageName);
        this.imageName = [];
    }
    prelimfiles(event) {
        console.log(this.imageName);
        console.log(event.target.files);
        // for(var i=0; i< event.target.files.length;i++){
        // this.prelimFiles.push(event.target.files) 
        this.prelimFiles = event.target.files;
        this.imageName = event.target.files[0].name;
        this.imagebox = true;
        this.exceedfileSize = event.target.files[0].size;
        //this.prelimFileType = event.target.files[0].type;
        console.log(this.exceedfileSize);
        //console.log(this.prelimFileType)
        // }
        console.log(this.prelimFiles);
        this.targetLength = event.target.files.length;
        var reader = new FileReader();
        reader.onload = (event) => {
            var orientation = -1;
            let localUrl = event.target.result;
            // this.imageCompress.compressFile(localUrl,orientation, 1000, 1000).then(res=>{
            // console.log(res,">><><><");
            // this.image= res;  
            this.imageCompress.compressFile(localUrl, orientation, 500, 500).then(result => {
                this.image = result;
                console.warn('Size in bytes is now:', this.imageCompress.byteCount(result));
            });
            // })
        };
        reader.readAsDataURL(event.target.files[0]);
    }
    remove() {
        this.prelimFiles = [];
        this.imageName = [];
        this.imagebox = false;
        console.log(this.prelimFiles);
        console.log(this.imageName);
        this.commentsForm.get('prelimdesign').setValue('');
    }
    prelimupdate(event) {
        //console.log(this.imageName);
        //console.log(event.target.files);
        // for(var i=0; i< event.target.files.length;i++){
        // this.prelimFiles.push(event.target.files) 
        this.prelimFiles = event.target.files;
        this.prelimFileSize = event.target.files[0].size;
        console.log(this.prelimFileSize);
        //this.imageName= event.target.files[0].name;
        //this.imagebox= true;
        // }
        //console.log(this.prelimFiles);
        this.targetLength = event.target.files.length;
        var reader = new FileReader();
        reader.onload = (event) => {
            var orientation = -1;
            let localUrl = event.target.result;
            // this.imageCompress.compressFile(localUrl,orientation, 1000, 1000).then(res=>{
            // console.log(res,">><><><");
            // this.image= res;  
            this.imageCompress.compressFile(localUrl, orientation, 500, 500).then(result => {
                this.image = result;
                console.warn('Size in bytes is now:', this.imageCompress.byteCount(result));
            });
            // })
        };
        reader.readAsDataURL(event.target.files[0]);
    }
    uploadpreliumdesign(designId, key) {
        // else{
        // const blob = this.utilities.getBlobFromImageData(this.prelimFiles);
        // console.log(blob);
        //  let blob= this.utilities.b64toBlob(this.image);
        //   console.log(blob);
        // console.log(typeof(this.prelimFiles[0]));
        const imageData = new FormData();
        for (var i = 0; i < this.prelimFiles.length; i++) {
            imageData.append("files", this.prelimFiles[i]);
            // if(i ==0){
            imageData.append('path', 'design/' + designId);
            imageData.append('refId', designId + '');
            imageData.append('ref', 'design');
            imageData.append('field', key);
            // }
        }
        this.utilities.showLoading("Prelim File Uploading").then(() => {
            this.apiService.uploaddesign(imageData).subscribe(res => {
                // this.utilities.hideUploadingLoading();
                this.utilities.hideLoading().then(() => {
                    console.log(res);
                    this.imagebox = false;
                    // this.getDesignDetails();
                    // this.updatecomments();
                    // this.apiService.updateDesignForm({"status":'designcompleted'},this.designId).subscribe((res)=>{
                    //   this.utilities.getDesignDetailsRefresh();
                    //   console.log(res,">>");
                    // })
                    //this.utilities.getDesignDetailsRefresh();
                    if (this.isprelimUpdate) {
                        // this.router.navigate(['designoverview/inreviewdesigns']);
                        this.navController.pop();
                        this.utilities.setHomepageDesignRefresh(true);
                    }
                    else if (this.isSelfUpdate) {
                        this.reportDesignReviewSuccess();
                    }
                    else {
                        this.utilities.setHomepageDesignRefresh(true);
                        //this.router.navigate(['designoverview/completeddesigns'])
                        this.navController.pop();
                    }
                    //else{
                    // this.apiService.updateDesignForm({"status":'designcompleted'},this.designId).subscribe((res) =>{
                    // this.utilities.getDesignDetailsRefresh();
                    // });
                    //  }
                }, err => {
                    this.utilities.hideLoading().then(() => {
                        console.log(err);
                    });
                });
            }, responseError => {
                // this.utilities.hideLoading();
                this.utilities.hideUploadingLoading();
                const error = responseError.error;
                this.utilities.errorSnackBar(error.message[0].messages[0].message);
            });
            // })
            // }
        });
    }
    reportDesignReviewFailure() {
        //console.log("Value is" + this.reviewIssuesForm.value);
        if (this.reviewIssuesForm.valid) {
            this.countdownservice.stopTimer();
            let cdate = Date.now();
            this.reviewenddatetime = cdate;
            const postData = {
                status: "reviewfailed",
                reviewissues: this.reviewIssuesForm.get('reviewIssues').value,
                reviewstarttime: this.reviewstartdatetime,
                reviewendtime: this.reviewenddatetime,
            };
            console.log("this is" + this.design.reviewstarttime);
            // console.log("this is"+ this.reviewstartdatetime);
            this.apiService.editDesign(this.design.id, postData)
                .subscribe(response => {
                this.utilities.showSnackBar("Prelim design status has been updated successfully.");
                this.utilities.setHomepageDesignRefresh(true);
                if (this.user.role.type == 'qcinspector') {
                    this.navController.navigateRoot(['analystoverview/design']);
                }
                else {
                    this.navController.navigateRoot(['homepage/design']);
                }
                //this.data.triggerEditEvent = false;
                //this.dialogRef.close(this.data);
            }, error => {
                this.utilities.errorSnackBar("Error");
            });
        }
        else {
            this.utilities.errorSnackBar("Please enter issues");
            this.reviewIssuesForm.markAsTouched();
            this.reviewIssuesForm.markAsDirty();
        }
    }
    designReviewSuccess() {
        if (this.isSelfUpdate && this.prelimFiles.length > 0) {
            if (this.prelimFileSize <= 25000000) {
                // this.utilities.showLoading("Uploading").then(()=>
                this.uploadpreliumdesign(this.designId, 'permitdesign'); //})
            }
            else {
                this.utilities.errorSnackBar("File is greater than 25MB");
            }
        }
        else if (this.isSelfUpdate && this.prelimFiles.length == 0) {
            this.utilities.errorSnackBar("Please attach file");
        }
        else {
            this.reportDesignReviewSuccess();
        }
    }
    reportDesignReviewSuccess() {
        this.countdownservice.stopTimer();
        let cdate = Date.now();
        this.reviewenddatetime = cdate;
        const postData = {
            status: "reviewpassed",
            reviewissues: this.reviewIssuesForm.get('reviewIssues').value,
            reviewstarttime: this.reviewstartdatetime,
            reviewendtime: this.reviewenddatetime
        };
        this.apiService
            .editDesign(this.design.id, postData)
            .subscribe(response => {
            this.utilities.showSnackBar("Prelim design status has been updated successfully.");
            this.utilities.setHomepageDesignRefresh(true);
            if (this.user.role.type == 'qcinspector') {
                this.navController.navigateRoot(['analystoverview/design']);
            }
            else {
                this.navController.navigateRoot(['homepage/design']);
            }
            // this.triggerEditEvent = false;
            //this.dialogRef.close(this.data);
        }, error => {
            this.utilities.errorSnackBar("Error");
        });
    }
    ionViewWillLeave() {
    }
};
DesignDetailsPage.ctorParameters = () => [
    { type: _utilities_service__WEBPACK_IMPORTED_MODULE_6__["UtilitiesService"] },
    { type: _api_service__WEBPACK_IMPORTED_MODULE_4__["ApiService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_7__["ActivatedRoute"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["NavController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["AlertController"] },
    { type: _storage_service__WEBPACK_IMPORTED_MODULE_8__["StorageService"] },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_9__["FormBuilder"] },
    { type: _ionic_native_launch_navigator_ngx__WEBPACK_IMPORTED_MODULE_10__["LaunchNavigator"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["ToastController"] },
    { type: ngx_image_compress__WEBPACK_IMPORTED_MODULE_11__["NgxImageCompressService"] },
    { type: ngx_timer__WEBPACK_IMPORTED_MODULE_12__["CountdownTimerService"] },
    { type: _ionic_native_in_app_browser_ngx__WEBPACK_IMPORTED_MODULE_13__["InAppBrowser"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_7__["Router"] },
    { type: _utilities_mixpanel_service__WEBPACK_IMPORTED_MODULE_14__["MixpanelService"] }
];
DesignDetailsPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-design-details',
        template: _raw_loader_design_details_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_design_details_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], DesignDetailsPage);



/***/ }),

/***/ "T06W":
/*!*********************************************************!*\
  !*** ./src/app/design-details/design-details.page.scss ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".survey-email {\n  font-size: 0.8em;\n}\n\n.survey-name {\n  font-size: 1.7em;\n}\n\n.survey-phone {\n  font-size: 0.8em;\n}\n\nion-header {\n  color: #666666;\n}\n\n.page-text-color {\n  color: #666666 !important;\n}\n\n.image-count {\n  width: 48px;\n  height: 48px;\n}\n\n.data-header {\n  font-size: 0.9em;\n  color: #BFBFBF;\n}\n\n.data-point {\n  font-size: 1em;\n  color: black;\n}\n\n.address {\n  color: #3a7be0;\n}\n\n.models {\n  font-size: 18px;\n  color: #B6B6B6;\n}\n\n.model-type {\n  font-size: 18px;\n  color: #B6B6B6;\n}\n\n.model-name {\n  font-size: 15px;\n  text-transform: capitalize;\n}\n\n.model-space {\n  font-size: 15px;\n  text-transform: capitalize;\n  float: right;\n}\n\n.comment {\n  font-size: 18px;\n}\n\n.comment-by {\n  font-size: 10px;\n  font-style: italic;\n  color: #666666 !important;\n}\n\n.assignee-image {\n  width: 3.5em;\n  height: 3.5em;\n  border-radius: 50%;\n  object-fit: fill;\n  border: 2px solid white;\n  padding: 8px;\n  text-align: center;\n  background: #FFF1CF;\n}\n\n.assignee-margin {\n  margin: 8px;\n  text-align: center;\n}\n\n.selected {\n  border: 3px solid #3c78d8;\n  border-radius: 50%;\n}\n\n.normal {\n  border: 3px solid white;\n}\n\ndiv[scrollx=true], div[scrolly=true] {\n  position: relative;\n  overflow: hidden;\n}\n\ndiv[scrollx=true] ::-webkit-scrollbar, div[scrolly=true] ::-webkit-scrollbar {\n  display: none;\n}\n\ndiv[scrollx=true] {\n  overflow-x: auto;\n}\n\ndiv[scrolly=true] {\n  overflow-y: auto;\n}\n\n.name_div {\n  font-size: 20px;\n}\n\n.font {\n  font-size: 0.7rem;\n}\n\n.flx {\n  display: flex;\n  align-items: center;\n}\n\n.fontwt_size {\n  font-size: 17px;\n  font-weight: bolder;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXGRlc2lnbi1kZXRhaWxzLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGdCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxnQkFBQTtBQUNGOztBQUVBO0VBQ0UsZ0JBQUE7QUFDRjs7QUFFQTtFQUNFLGNBQUE7QUFDRjs7QUFFQTtFQUNFLHlCQUFBO0FBQ0Y7O0FBSUE7RUFDRSxXQUFBO0VBQ0EsWUFBQTtBQURGOztBQUlBO0VBQ0UsZ0JBQUE7RUFDQSxjQUFBO0FBREY7O0FBSUE7RUFDRSxjQUFBO0VBQ0EsWUFBQTtBQURGOztBQUlBO0VBQ0UsY0FBQTtBQURGOztBQUlBO0VBQ0UsZUFBQTtFQUNBLGNBQUE7QUFERjs7QUFJQTtFQUNFLGVBQUE7RUFDQSxjQUFBO0FBREY7O0FBSUE7RUFDRSxlQUFBO0VBQ0EsMEJBQUE7QUFERjs7QUFHQTtFQUNFLGVBQUE7RUFDQSwwQkFBQTtFQUNBLFlBQUE7QUFBRjs7QUFFQTtFQUNFLGVBQUE7QUFDRjs7QUFFQTtFQUNFLGVBQUE7RUFDQSxrQkFBQTtFQUNBLHlCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxZQUFBO0VBQ0EsYUFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSx1QkFBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLG1CQUFBO0FBQ0Y7O0FBRUE7RUFDRSxXQUFBO0VBQ0Esa0JBQUE7QUFDRjs7QUFFQTtFQUNFLHlCQUFBO0VBQ0Esa0JBQUE7QUFDRjs7QUFFQTtFQUNFLHVCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxrQkFBQTtFQUNBLGdCQUFBO0FBQ0Y7O0FBQ0U7RUFDRSxhQUFBO0FBQ0o7O0FBR0E7RUFDRSxnQkFBQTtBQUFGOztBQUdBO0VBQ0UsZ0JBQUE7QUFBRjs7QUFHQTtFQUNFLGVBQUE7QUFBRjs7QUFHQTtFQUNBLGlCQUFBO0FBQUE7O0FBR0E7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7QUFBRjs7QUFNQTtFQUNFLGVBQUE7RUFDQSxtQkFBQTtBQUhGIiwiZmlsZSI6ImRlc2lnbi1kZXRhaWxzLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5zdXJ2ZXktZW1haWwge1xyXG4gIGZvbnQtc2l6ZTogMC44ZW07XHJcbn1cclxuXHJcbi5zdXJ2ZXktbmFtZSB7XHJcbiAgZm9udC1zaXplOiAxLjdlbTtcclxufVxyXG5cclxuLnN1cnZleS1waG9uZSB7XHJcbiAgZm9udC1zaXplOiAwLjhlbTtcclxufVxyXG5cclxuaW9uLWhlYWRlciB7XHJcbiAgY29sb3I6ICM2NjY2NjY7XHJcbn1cclxuXHJcbi5wYWdlLXRleHQtY29sb3Ige1xyXG4gIGNvbG9yOiAjNjY2NjY2ICFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcblxyXG5cclxuLmltYWdlLWNvdW50IHtcclxuICB3aWR0aDogNDhweDtcclxuICBoZWlnaHQ6IDQ4cHg7XHJcbn1cclxuXHJcbi5kYXRhLWhlYWRlciB7XHJcbiAgZm9udC1zaXplOiAwLjllbTtcclxuICBjb2xvcjogI0JGQkZCRjtcclxufVxyXG5cclxuLmRhdGEtcG9pbnQge1xyXG4gIGZvbnQtc2l6ZTogMWVtO1xyXG4gIGNvbG9yOiBibGFjaztcclxufVxyXG5cclxuLmFkZHJlc3Mge1xyXG4gIGNvbG9yOiAjM2E3YmUwO1xyXG59XHJcblxyXG4ubW9kZWxzIHtcclxuICBmb250LXNpemU6IDE4cHg7XHJcbiAgY29sb3I6ICNCNkI2QjY7XHJcbn1cclxuXHJcbi5tb2RlbC10eXBlIHtcclxuICBmb250LXNpemU6IDE4cHg7XHJcbiAgY29sb3I6ICNCNkI2QjY7XHJcbn1cclxuXHJcbi5tb2RlbC1uYW1lIHtcclxuICBmb250LXNpemU6IDE1cHg7XHJcbiAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XHJcbn1cclxuLm1vZGVsLXNwYWNlIHtcclxuICBmb250LXNpemU6IDE1cHg7XHJcbiAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XHJcbiAgZmxvYXQ6cmlnaHQ7XHJcbn1cclxuLmNvbW1lbnQge1xyXG4gIGZvbnQtc2l6ZTogMThweDtcclxufVxyXG5cclxuLmNvbW1lbnQtYnkge1xyXG4gIGZvbnQtc2l6ZTogMTBweDtcclxuICBmb250LXN0eWxlOiBpdGFsaWM7XHJcbiAgY29sb3I6ICM2NjY2NjYgIWltcG9ydGFudDtcclxufVxyXG5cclxuLmFzc2lnbmVlLWltYWdlIHtcclxuICB3aWR0aDogMy41ZW07XHJcbiAgaGVpZ2h0OiAzLjVlbTtcclxuICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgb2JqZWN0LWZpdDogZmlsbDtcclxuICBib3JkZXI6IDJweCBzb2xpZCB3aGl0ZTtcclxuICBwYWRkaW5nOiA4cHg7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIGJhY2tncm91bmQ6ICNGRkYxQ0Y7XHJcbn1cclxuXHJcbi5hc3NpZ25lZS1tYXJnaW4ge1xyXG4gIG1hcmdpbjogOHB4O1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG5cclxuLnNlbGVjdGVkIHtcclxuICBib3JkZXI6IDNweCBzb2xpZCAjM2M3OGQ4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcclxufVxyXG5cclxuLm5vcm1hbCB7XHJcbiAgYm9yZGVyOiAzcHggc29saWQgd2hpdGU7XHJcbn1cclxuXHJcbmRpdltzY3JvbGx4PXRydWVdLCBkaXZbc2Nyb2xseT10cnVlXSB7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcblxyXG4gIDo6LXdlYmtpdC1zY3JvbGxiYXIge1xyXG4gICAgZGlzcGxheTogbm9uZTtcclxuICB9XHJcbn1cclxuXHJcbmRpdltzY3JvbGx4PXRydWVdIHtcclxuICBvdmVyZmxvdy14OiBhdXRvO1xyXG59XHJcblxyXG5kaXZbc2Nyb2xseT10cnVlXSB7XHJcbiAgb3ZlcmZsb3cteTogYXV0bztcclxufVxyXG5cclxuLm5hbWVfZGl2e1xyXG4gIGZvbnQtc2l6ZTogMjBweDtcclxufVxyXG5cclxuLmZvbnR7XHJcbmZvbnQtc2l6ZTogLjdyZW07XHJcbn1cclxuXHJcbi5mbHh7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG59XHJcblxyXG4vLyBpbnB1dFt0eXBlPVwiZmlsZVwiXXtcclxuLy8gICB2aXNpYmlsaXR5OmhpZGRlbjtcclxuLy8gfVxyXG4uZm9udHd0X3NpemV7XHJcbiAgZm9udC1zaXplOiAxN3B4O1xyXG4gIGZvbnQtd2VpZ2h0OiBib2xkZXI7XHJcbn1cclxuXHJcblxyXG5cclxuXHJcbiJdfQ== */");

/***/ }),

/***/ "Ti8s":
/*!***********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/design-details/design-details.page.html ***!
  \***********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header class=\"ion-no-border white-bg\" *ngIf=\"design\">\r\n    <ion-grid class=\"ion-padding-top ion-padding-start ion-padding-end header-bg\">\r\n        <ion-row>\r\n            <ion-col size=\"1\">\r\n                <ion-button fill=\"clear\" size=\"small\" class=\"ion-no-padding\" (click)=\"goBack()\" [disabled]=\"enableDisable\">\r\n                    <ion-img src=\"/assets/images/back.svg\" class=\"action-icon\"></ion-img>\r\n                </ion-button>\r\n            </ion-col>\r\n            <!-- <ion-col size=\"auto\">\r\n                <ion-button fill=\"clear\" disabled=\"true\" size=\"small\" class=\"ion-no-padding action-icon\">\r\n                </ion-button>\r\n            </ion-col> -->\r\n            <ion-col class=\"ion-text-center\" size=\"9\" style=\"padding-left: 27px;\">\r\n                <ion-grid class=\"ion-align-items-center ion-justify-content-center\">\r\n                    <ion-row class=\"ion-align-items-center ion-justify-content-center\">\r\n                        <span class=\"survey-name ion-text-center\">{{design?.name}}</span>\r\n                    </ion-row>\r\n                    <ion-row class=\"ion-align-items-center ion-justify-content-center\" *ngIf=\"user.designertype!='external'\" >\r\n                        <span class=\"survey-email ion-text-center\">{{design?.email}}</span>\r\n                    </ion-row>\r\n                </ion-grid>\r\n            </ion-col>\r\n            <ion-col size=\"1\" *ngIf=\"design.createdby.id == user.id && (design.status == 'created' || design.status == 'requestdeclined')\">\r\n                <ion-button fill=\"clear\" size=\"small\" class=\"ion-no-padding\"\r\n                     (click)=\"scheduleRoute(design)\"  routerDirection=\"forward\" [disabled]=enableDisable>\r\n                    <ion-img src=\"/assets/images/edit.svg\" class=\"action-icon\"></ion-img>\r\n                </ion-button>\r\n            </ion-col>\r\n            <ion-col size=\"1\" *ngIf=\"design.createdby.id == user.id && (design.status == 'created' || design.status == 'requestdeclined')\">\r\n                <ion-button fill=\"clear\" size=\"small\" class=\"ion-no-padding\" (click)=\"deleteDesign()\" [disabled]=enableDisable>\r\n                    <ion-img src=\"/assets/images/trash.svg\" class=\"action-icon\"></ion-img>\r\n                </ion-button>\r\n            </ion-col>\r\n        </ion-row>\r\n    </ion-grid>\r\n    <ion-grid class=\"position-relative ion-no-padding\">\r\n        <ion-row class=\"ion-no-padding border-header header-half-height\">\r\n        </ion-row>\r\n        <ion-row class=\"ion-no-padding header-half-height\">\r\n\r\n        </ion-row>\r\n        <ion-row class=\"ion-no-padding position-absolute header-icon-position full-width\">\r\n            <ion-col class=\"flex-center\">\r\n                <ion-img src=\"/assets/detailpage/Prelim.svg\" class=\"header-icon\"></ion-img>\r\n            </ion-col>\r\n        </ion-row>\r\n        <ion-row class=\"ion-no-padding\" *ngIf=\"user.role.type=='designer' || user.role.type=='qcinspector'||(design.status=='reviewassigned' && design.reviewassignedto.id==user.id)\">\r\n            <ion-col class=\"flex-center\">\r\n                <countdown-timer [countDownTimerConfig]=\"timerConfig\"></countdown-timer>\r\n            </ion-col>\r\n        </ion-row>\r\n    </ion-grid>\r\n</ion-header>\r\n\r\n<ion-content class=\"ion-padding page-text-color\" scrollY=\"true\">\r\n    <ion-grid *ngIf=\"design\" class=\"page-text-color\">\r\n        <ion-row *ngIf=\"user.designertype!='external'\">\r\n            <ion-col class=\"font\">\r\n                <span (click)=\"openAddressOnMap(design.address)\" class=\"address\">{{design?.address}}</span>\r\n            </ion-col>\r\n            <ion-col size=\"auto\" class=\"ion-text-end\">\r\n                <ion-grid class=\"ion-no-padding\">\r\n                    <ion-row>\r\n                        <ion-col><span class=\"data-header font\">annual units</span></ion-col>\r\n                    </ion-row>\r\n                    <ion-row>\r\n                        <ion-col class=\"font\"><span>{{design?.monthlybill}} kWh</span></ion-col>\r\n                    </ion-row>\r\n                </ion-grid>\r\n\r\n            </ion-col>\r\n        </ion-row>\r\n        <ion-row *ngIf=\"design.company!== null\" class=\"ion-no-padding\">\r\n            <ion-col><span class=\"model-type font\">Company</span></ion-col>\r\n            <ion-col size=\"auto\">\r\n                <span class=\"model-name font fontwt_size\"><strong>{{design?.company}}</strong></span>\r\n            </ion-col>\r\n        </ion-row>\r\n\r\n        <ion-row class=\"ion-margin-top\">\r\n            <ion-col size=\"12\">\r\n                <span class=\"models font\">Module Details</span>\r\n            </ion-col>\r\n            <ion-col>\r\n                <ion-grid class=\"ion-no-padding\">\r\n                    <ion-row class=\"ion-no-padding\">\r\n                        <ion-col><span class=\"model-type font\">make</span></ion-col>\r\n                        <ion-col size=\"auto\">\r\n                            <span class=\"model-name font\">{{design.solarmake?.name}}</span>\r\n                        </ion-col>\r\n                    </ion-row>\r\n                    <ion-row>\r\n                        <ion-col><span class=\"model-type font\">model</span></ion-col>\r\n                        <ion-col size=\"auto\">\r\n                            <span class=\"model-name font\">{{design.solarmodel?.name}}</span>\r\n                        </ion-col>\r\n                    </ion-row>\r\n                </ion-grid>\r\n            </ion-col>\r\n        </ion-row>\r\n\r\n        <ion-row class=\"ion-margin-top\">\r\n            <ion-col size=\"12\">\r\n                <span class=\"models font\">Inverter Details</span>\r\n            </ion-col>\r\n            <ion-col>\r\n                <ion-grid class=\"ion-no-padding\">\r\n                    <ion-row class=\"ion-no-padding\">\r\n                        <ion-col><span class=\"model-type font\">make</span></ion-col>\r\n                        <ion-col size=\"auto\">\r\n                            <span class=\"model-name font\">{{design.invertermake?.name}}</span>\r\n                        </ion-col>\r\n                    </ion-row>\r\n                    <ion-row>\r\n                        <ion-col><span class=\"model-type font\">model</span></ion-col>\r\n                        <ion-col size=\"auto\">\r\n                            <span class=\"model-name font\">{{design.invertermodel?.name}}</span>\r\n                        </ion-col>\r\n                    </ion-row>\r\n                </ion-grid>\r\n            </ion-col>\r\n        </ion-row>\r\n\r\n        <ion-row class=\"ion-margin-top\">\r\n            <ion-col>\r\n                <ion-grid class=\"ion-no-padding\">\r\n                    <ion-row class=\"ion-no-padding\">\r\n                        <ion-col><span class=\"model-type font\">new construction</span></ion-col>\r\n                        <ion-col size=\"auto\">\r\n                            <span class=\"model-name font\">{{design?.newconstruction}}</span>\r\n                        </ion-col>\r\n                    </ion-row>\r\n                    <ion-row class=\"ion-no-padding font\">\r\n                        <ng-container *ngIf=\"design.attachments.length > 0\">\r\n                            <ion-col><span class=\"model-type font\">Attachments</span></ion-col>\r\n                            <ion-col size=\"auto\" >\r\n                                <div *ngFor=\"let attachment of design.attachments;let i=index\" style=\"display: flex;justify-content: flex-end;\">\r\n                                    <span class=\"model-name font\" style=\"color:#3c78d8 !important\" (click)=\"showurl(i,'attachments')\">{{attachment?.name}}{{attachment?.ext}}</span>\r\n                                </div>\r\n                            </ion-col>\r\n                        </ng-container>\r\n                    </ion-row>\r\n                    <ion-row *ngIf=\"design.newconstruction=='Yes'\" class=\"ion-no-padding font\">\r\n                        <ng-container *ngIf=\"design.architecturaldesign !=[]\">\r\n                            <ion-col ><span class=\"model-type font\">Architectural design</span></ion-col>\r\n                            <ion-col   size=\"auto\">\r\n                                <div  *ngFor=\"let archdesign of design.architecturaldesign;let i=index\" style=\"display: flex;justify-content: flex-end;\">\r\n                                <span class=\"model-name font\" (click)=\"showurl(i,'architecturaldesign')\" style=\"color:#3c78d8 !important\">{{archdesign?.name}}{{archdesign?.ext}}</span>\r\n                            </div>\r\n                            </ion-col>\r\n                        </ng-container>\r\n                    </ion-row>\r\n                    <ion-row>\r\n                        <ion-col><span class=\"model-type font\">project type</span></ion-col>\r\n                        <ion-col size=\"auto\">\r\n                            <span class=\"model-name font\">{{design?.projecttype}}</span>\r\n                        </ion-col>\r\n                    </ion-row>\r\n                    <ion-row>\r\n                        <!-- <ion-col><span class=\"model-type\">job type</span></ion-col>\r\n                        <ion-col size=\"auto\">\r\n                            <span class=\"model-name\">{{design.jobtype}}</span>\r\n                        </ion-col> -->\r\n                    </ion-row>\r\n                    <ion-row>\r\n                        <ion-col><span class=\"model-type font\">Mounting Type</span></ion-col>\r\n                        <ion-col size=\"auto\">\r\n                            <span class=\"model-name font\">{{design?.mountingtype}}</span>\r\n                        </ion-col>\r\n                    </ion-row>\r\n                    <ion-row *ngIf=\"design.mountingtype == 'roof' || design.mountingtype =='both'\">\r\n                        <ion-col><span class=\"model-type font\">roof type</span></ion-col>\r\n                        <ion-col size=\"auto\">\r\n                            <span class=\"model-name font\">{{design?.rooftype}}</span>\r\n                        </ion-col>\r\n                    </ion-row>\r\n                    <ion-row *ngIf=\"design.mountingtype=='ground' || design.mountingtype == 'both'\">\r\n                        <ion-col><span class=\"model-type font\">tilt of ground mounting system</span></ion-col>\r\n                        <ion-col size=\"auto\">\r\n                            <span class=\"model-name font\">{{design?.tiltofgroundmountingsystem}}</span>\r\n                        </ion-col>\r\n                    </ion-row>\r\n        <ion-row *ngIf=\"design.status=='requestdeclined'\" class=\"ion-no-padding ion-margin-top\">\r\n            <ion-col size=\"6\"  >\r\n                <span class=\"model-type font\">Reason</span></ion-col>\r\n                <ion-col size=\"6\"  class=\"ion-no-padding\">\r\n                        <p class=\"model-name font\" style=\"text-align: right;margin:0px\">{{design.requestdeclinereason}}</p>\r\n                    </ion-col>\r\n            </ion-row>\r\n                <ion-row *ngIf=\"design.status=='requestdeclined' && design.requestdeclineattachment.length > 0\">\r\n                <ion-col > <span class=\"model-type font\">Reason Attachment</span></ion-col>\r\n                <ion-col size=\"6\"  style=\"float: right;\" *ngFor=\"let attachment of design.requestdeclineattachment\">\r\n                <span class=\"model-space font\" style=\"text-align:right;color:#3c78d8 !important\" (click)=\"showreasonImage(attachment)\">{{attachment.name.length > 40 ? (attachment.name | slice: 0:40) + '...' : attachment.name}}{{attachment.ext}}</span>\r\n                </ion-col>\r\n            </ion-row>\r\n                </ion-grid>\r\n            </ion-col>\r\n        </ion-row>\r\n        <ion-row *ngIf=\"design.costofsystem !== null\">\r\n            <ion-col><span class=\"model-type font\">Cost of System</span></ion-col>\r\n            <ion-col size=\"auto\">\r\n                <span class=\"model-name font\">{{design?.costofsystem}}</span>\r\n            </ion-col>\r\n        </ion-row>\r\n        <ion-row *ngIf=\"design.incentive !== null\">\r\n            <ion-col><span class=\"model-type font\">Incentive</span></ion-col>\r\n            <ion-col size=\"auto\">\r\n                <span class=\"model-name font\">{{design.incentive?.title}}</span>\r\n            </ion-col>\r\n        </ion-row>\r\n        <ion-row *ngIf=\"design.utility !== null\">\r\n            <ion-col><span class=\"model-type font\">Utility Name</span></ion-col>\r\n            <ion-col size=\"auto\">\r\n                <span class=\"model-name font\">{{design.utility?.name}}</span>\r\n            </ion-col>\r\n        </ion-row>\r\n        <ion-row *ngIf=\"design.utilityrate !== null\">\r\n            <ion-col><span class=\"model-type font\">Utility Rate</span></ion-col>\r\n            <ion-col size=\"auto\">\r\n                <span class=\"model-name font\">{{design.utilityrate?.rate}}</span>\r\n            </ion-col>\r\n        </ion-row>\r\n        <ion-row *ngIf=\"design.annualutilityescalation !== null\">\r\n            <ion-col><span class=\"model-type font\">Annual utility Escalation</span></ion-col>\r\n            <ion-col size=\"auto\">\r\n                <span class=\"model-name font\">{{design?.annualutilityescalation}}</span>\r\n            </ion-col>\r\n        </ion-row>\r\n\r\n        <ion-row *ngIf=\"design.comments && design.comments?.length !==0\" class=\"ion-no-padding ion-margin-top\">\r\n            <ion-col size=\"6\">\r\n                <span class=\"models font\">Comments</span>\r\n            </ion-col>\r\n            <!-- <div> -->\r\n\r\n            <ion-col size=\"6\"  class=\"ion-no-padding\">\r\n                <div *ngFor=\"let comment of design.comments\">\r\n                    <p  [innerHTML]=\"comment?.message | linkify\" class=\"comment font\" style=\"text-align: right;margin:0px\"></p>\r\n                    <p class=\"comment-by\" style=\"text-align: right;margin-top:0px\">Posted by {{comment.createdby?.firstname}}\r\n                        {{comment.createdby?.lastname}}</p>\r\n                </div>\r\n            </ion-col>\r\n            <!-- <ion-col size=\"12\" class=\"ion-no-padding ion-text-end\">\r\n\r\n                        </ion-col> -->\r\n\r\n            <!-- </div> -->\r\n\r\n        </ion-row>\r\n\r\n\r\n\r\n        <ion-row *ngIf=\"design.reviewissues || design.reviewissues !==null  \" class=\"ion-no-padding ion-margin-top\">\r\n            <ion-col size=\"6\">\r\n                <span class=\"models font\"> Review Comments</span>\r\n            </ion-col>\r\n            <!-- <div> -->\r\n\r\n            <ion-col size=\"6\"  class=\"ion-no-padding\">\r\n                <div >\r\n                    <p class=\"comment font\" style=\"text-align: right;margin:0px\">{{design?.reviewissues}}</p>\r\n                    <p class=\"comment-by\" style=\"text-align: right;margin-top:0px\">Posted by {{design.reviewassignedto?.firstname}}\r\n                        {{design.reviewassignedto?.lastname}}</p>\r\n                </div>\r\n            </ion-col>\r\n            <!-- <ion-col size=\"12\" class=\"ion-no-padding ion-text-end\">\r\n\r\n                        </ion-col> -->\r\n\r\n            <!-- </div> -->\r\n\r\n        </ion-row>\r\n\r\n        <ion-row>\r\n            <ion-col><span class=\"model-type font\">created at</span></ion-col>\r\n            <ion-col size=\"auto\">\r\n                <span class=\"model-name font\">{{design.created_at | date: 'dd/MM/yyyy hh:mm a'}}</span>\r\n            </ion-col>\r\n        </ion-row>\r\n        <div *ngIf=\"(user.role.type!='clientsuperadmin' || (user.role.type==='clientsuperadmin' && design.status==='delivered'))&&( design.prelimdesign!=null || user.role.type=='designer')\">\r\n            <form novalidate [formGroup]=\"commentsForm\">\r\n\r\n            <ion-row *ngIf=\"(design.status=='designassigned' ) && user.role.type=='designer'  ; else showimageName \">\r\n                <!-- <span> -->\r\n\r\n                        <ion-col size=\"3\" class=\"model-type font\">\r\n                           Prelim Design\r\n                        </ion-col>\r\n                            <ion-col size=\"9\"  class=\"model-name font flx\" style=\"justify-content: flex-end;\">\r\n\r\n\r\n                                  <input type=\"file\" *ngIf=\"imageName.length==0\"  (change)=\"prelimfiles($event)\" formControlName=\"prelimdesign\" style=\"width: 76px;\"/>\r\n                                   {{imageName}}&nbsp;\r\n                                   <ion-icon style=\"font-size: medium;\" name=\"close-circle-outline\" *ngIf=\"imageName.length>0 \" (click)=\"remove()\"></ion-icon>\r\n                                <!-- <ion-icon name=\"close-circle-outline\" *ngIf=\"imageName.length>0 && !imagebox\" (click)=\"showuploadbox()\" style=\"color:red;font-size: 20px;margin-left: 10px\"></ion-icon> -->\r\n                                <!-- <ion-icon name=\"cloud-upload-outline\" *ngIf=\"imageName.length>0 && imagebox\" (click)=\"uploadpreliumdesign(designId,'prelimdesign')\" style=\"font-size: 20px;margin-left: 10px;color:green\"></ion-icon> -->\r\n\r\n                            </ion-col>\r\n\r\n                        <!-- </span> -->\r\n                    </ion-row>\r\n                    <div *ngIf=\"user.role.type=='designer' && design.status=='reviewfailed'\">\r\n                        <ion-row *ngIf=\"isprelimUpdate\" style=\"width: 125%\">\r\n                             <!-- <span> -->\r\n                                         <ion-col size=\"9\" class=\"model-name font flx\" style=\"justify-content: flex-end;\">\r\n\r\n\r\n                                             <ion-input type=\"file\" formControlName=\"prelimdesign\" readonly (change)=\"prelimupdate($event)\" style=\"border-bottom:1px solid grey; width: max-content; flex: auto;\" multiple=\"false\"> <ion-icon name=\"attach-outline\" style=\"float: right;text-align:right ;\"></ion-icon></ion-input>\r\n\r\n\r\n\r\n\r\n\r\n                                         </ion-col>\r\n\r\n                                     <!-- </span> -->\r\n                                 </ion-row>\r\n                             </div>\r\n                    <div *ngIf=\"(user.role.type=='qcinspector' && design.status=='reviewassigned')||(design.status=='reviewassigned' && design.reviewassignedto.id==user.id)\">\r\n                        <ion-row *ngIf=\"isSelfUpdate\" style=\"width: 125%\">\r\n                             <!-- <span> -->\r\n                                         <ion-col size=\"9\" class=\"model-name font flx\" style=\"justify-content: flex-end;\">\r\n\r\n\r\n                                             <ion-input type=\"file\" readonly (change)=\"prelimupdate($event)\" style=\"border-bottom:1px solid grey; width: max-content; flex: auto;\" multiple=\"false\"> <ion-icon name=\"attach-outline\" style=\"float: right;text-align:right ;\"></ion-icon></ion-input>\r\n\r\n\r\n\r\n\r\n\r\n                                         </ion-col>\r\n\r\n                                     <!-- </span> -->\r\n                                 </ion-row>\r\n                             </div>\r\n                </form>\r\n                  <ng-template #showimageName >\r\n                <ion-col><span class=\"model-type font\">Prelim Design</span></ion-col>\r\n                <ion-button size=\"3\" style=\"width:72px;height: 20px;font-size: x-small;float: right;text-transform: none;\" *ngIf=\"(user.role.type=='qcinspector' && design.status=='reviewassigned')||(design.status=='reviewassigned' && design.reviewassignedto.id==user.id)\" (click)=\"isSelfUpdate = !isSelfUpdate\">Self Update</ion-button>\r\n                <ion-button size=\"2\" style=\"width:72px;height: 20px;font-size: x-small;float: right;text-transform: none;\" *ngIf=\"user.role.type=='designer' && design.status=='reviewfailed'\" (click)=\"isprelimUpdate = !isprelimUpdate\">Update</ion-button>\r\n                <ion-col size=\"auto\"  style=\"float: right;\">\r\n                    <span class=\"model-name font\" style=\"text-align:right;color:#3c78d8 !important\" (click)=\"showDesignImage()\">{{imageName.length > 40 ? (imageName | slice: 0:40) + '...': imageName}}</span>\r\n                        <!-- <ion-icon name=\"close-circle-outline\" *ngIf=\"imageName.length>0 \" (click)=\"showuploadbox()\" style=\"color:red;font-size: 20px;margin-left: 10px\"></ion-icon> -->\r\n                </ion-col>\r\n            </ng-template></div>\r\n           <!-- <ion-row *ngIf=\"(design.status=='reviewfailed') && user.role.type=='designer'\">\r\n                 <span> -->\r\n\r\n                       <!-- <ion-col size=\"4\" class=\"model-type font\">\r\n                          upload Prelim Design\r\n                        </ion-col>\r\n                            <ion-col size=\"9\"  class=\"model-name font flx\" style=\"justify-content: flex-end;\">\r\n\r\n\r\n                                  <input type=\"file\"  *ngIf=\"imageName.length==0\"  (change)=\"prelimfiles($event)\"  style=\"width: 76px;\"/>\r\n                                  {{imageName}}&nbsp;\r\n                                   <ion-icon style=\"font-size: medium;\" name=\"close-circle-outline\" *ngIf=\"imageName.length>0 && user.role.type !='qcinspector'\" (click)=\"remove()\"></ion-icon>\r\n                                 <ion-icon name=\"close-circle-outline\" *ngIf=\"imageName.length>0 && !imagebox\" (click)=\"showuploadbox()\" style=\"color:red;font-size: 20px;margin-left: 10px\"></ion-icon> -->\r\n                                <!-- <ion-icon name=\"cloud-upload-outline\" *ngIf=\"imageName.length>0 && imagebox\" (click)=\"uploadpreliumdesign(designId,'prelimdesign')\" style=\"font-size: 20px;margin-left: 10px;color:green\"></ion-icon> -->\r\n\r\n                           <!-- </ion-col>\r\n\r\n                       </span>\r\n                        </ion-row>-->\r\n            <ion-row *ngIf=\"design.isinrevisionstate\" class=\"ion-no-padding ion-margin-top\">\r\n            <ion-col size=\"6\"  >\r\n                <span class=\"models font\">Revision Comments</span></ion-col>\r\n                <ion-col size=\"6\"  class=\"ion-no-padding\">\r\n                    <div>\r\n                        <p class=\"comment font\" style=\"text-align: right;margin:0px\">{{design.revisioncomments}}</p>\r\n\r\n                    </div>\r\n\r\n                   </ion-col>\r\n            </ion-row>\r\n              <ion-row *ngIf=\"design.isinrevisionstate && design.revisionattachments.length > 0\">\r\n             <ion-col > <span class=\"model-type font\">Revision Attachments</span></ion-col>\r\n             <ion-col size=\"6\"  style=\"float: right;\" *ngFor=\"let attachmentfile of design.revisionattachments\">\r\n\r\n                <span class=\"model-space font\" style=\"text-align:right;color:#3c78d8 !important\" (click)=\"showRevisionImage(attachmentfile)\">{{attachmentfile.name.length > 40 ? (attachmentfile.name | slice: 0:40) + '...' : attachmentfile.name}}{{attachmentfile.ext}}</span>\r\n              </ion-col>\r\n\r\n            </ion-row>\r\n\r\n\r\n            <ion-row size=\"12\" class=\"ion-no-padding ion-margin-top ion-justify-content-center ion-align-items-center\"\r\n            *ngIf=\"design.status=='designassigned'||design.status=='completed'\">\r\n            <ion-col class=\"ion-justify-content-center ion-align-items-center\"><span class=\"model-type font\">assigned to</span></ion-col>\r\n            <ion-col size=\"auto\">\r\n                <div class=\"selected d-flex\">\r\n                    <img *ngIf=\"design.designassignedto.contractorlogo && design.designassignedto.contractorlogo.logo\"\r\n                        [src]=\"design.designassignedto.contractorlogo.logo.url\" class=\"assignee-image\" />\r\n                    <div *ngIf=\"!design.designassignedto.contractorlogo || !design.designassignedto.contractorlogo.logo\"\r\n                        class=\"assignee-image d-flex flex-row align-center justify-center\">\r\n                        <div class=\"name_div\">\r\n                            <span\r\n                                style=\"text-transform: capitalize;\">{{design.designassignedto.firstname.substring(0, 1)}}{{design.designassignedto.lastname.substring(0, 1)}}</span>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </ion-col>\r\n        </ion-row>\r\n\r\n\r\n        <ion-row style=\"margin-top: 40px !important;\" class=\"ion-no-padding ion-margin-top ion-justify-content-center ion-align-items-center\"\r\n        *ngIf=\"design.status=='reviewassigned'||design.status=='delivered'\">\r\n        <ion-col class=\"ion-justify-content-center ion-align-items-center\"><span class=\"model-type font\">assigned to</span></ion-col>\r\n        <ion-col size=\"auto\">\r\n            <div class=\"selected d-flex\">\r\n                <img *ngIf=\"design.designassignedto.contractorlogo && design.designassignedto.contractorlogo.logo\"\r\n                    [src]=\"design.designassignedto.contractorlogo.logo.url\" class=\"assignee-image\" />\r\n                <div *ngIf=\"!design.designassignedto.contractorlogo || !design.designassignedto.contractorlogo.logo\"\r\n                    class=\"assignee-image d-flex flex-row align-center justify-center\">\r\n                    <div class=\"name_div\">\r\n                        <span\r\n                            style=\"text-transform: capitalize;\">{{design.reviewassignedto.firstname.substring(0, 1)}}{{design.reviewassignedto.lastname.substring(0, 1)}}</span>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </ion-col>\r\n      </ion-row>\r\n\r\n\r\n    <!-- <ion-row class=\"ion-no-padding ion-margin-top ion-justify-content-center ion-align-items-center\"\r\n    *ngIf=\"design.status=='reviewassigned'||design.status=='delivered'\">\r\n    <ion-col class=\"ion-justify-content-center ion-align-items-center\"><span class=\"model-type font\">assigned\r\n            to</span></ion-col>\r\n    <ion-col size=\"auto\">\r\n        <div class=\"selected d-flex\">\r\n            <img *ngIf=\"design.designassignedto.contractorlogo && design.designassignedto.contractorlogo.logo\"\r\n                [src]=\"design.designassignedto.contractorlogo.logo.url\" class=\"assignee-image\" />\r\n            <div *ngIf=\"!design.designassignedto.contractorlogo || !design.designassignedto.contractorlogo.logo\"\r\n                class=\"assignee-image d-flex flex-row align-center justify-center\">\r\n                <div class=\"name_div\">\r\n                    <span\r\n                        style=\"text-transform: capitalize;\">{{design.reviewassignedto.firstname.substring(0, 1)}}{{design.reviewassignedto.lastname.substring(0, 1)}}</span>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </ion-col>\r\n</ion-row> -->\r\n\r\n\r\n        <ion-row class=\"ion-no-padding ion-margin-top\" *ngIf=\"design && design.type !=='design'\">\r\n            <ion-col size=\"12\">\r\n                <form novalidate [formGroup]=\"assigneeForm\">\r\n                    <ion-item class=\"ion-no-padding no-border\" lines=\"none\">\r\n                        <app-user-selector placeholder=\"Assign\" [assignees]=\"listOfAssignees\"\r\n                            formControlName=\"designassignedto\"></app-user-selector>\r\n                    </ion-item>\r\n                </form>\r\n            </ion-col>\r\n        </ion-row>\r\n        <ion-row class=\"ion-no-padding ion-margin-top\" *ngIf=\"user.role.type=='designer' && design && design.status =='designassigned'\">\r\n\r\n            <form novalidate [formGroup]=\"commentsForm\" style=\"width:100%\">\r\n                <ion-col size=\"12\">\r\n                    <span class=\"input-placeholder\">Comments</span>\r\n                </ion-col>\r\n                <ion-col size=\"12\" style=\"padding-top: 0px;\">\r\n                    <ion-textarea style=\"max-width: 98%;\" class=\"ion-no-margin ion-no-padding comment_box\" rows=\"3\"\r\n                                  formControlName=\"comments\"></ion-textarea>\r\n                </ion-col>\r\n                </form>\r\n        </ion-row>\r\n\r\n        <!-- For Analyst -->\r\n        <ion-row class=\"ion-no-padding ion-margin-top\" *ngIf=\"(user.role.type=='qcinspector' && design && design.status =='reviewassigned') || (design && design.status=='reviewassigned' && design.reviewassignedto.id==user.id)\">\r\n\r\n            <form  [formGroup]=\"reviewIssuesForm\" style=\"width:100%\">\r\n\r\n                    <ion-col size=\"12\" class=\"ion-no-padding\">\r\n                        <span class=\"input-placeholder\">Issues*</span>\r\n                    </ion-col>\r\n                    <ion-col size=\"12\" class=\"ion-no-padding\">\r\n                        <ion-textarea class=\"ion-no-margin ion-no-padding comment_box\" rows=\"3\"\r\n                                      formControlName=\"reviewIssues\" ></ion-textarea>\r\n                    </ion-col>\r\n\r\n                </form>\r\n        </ion-row>\r\n    </ion-grid>\r\n</ion-content>\r\n\r\n<ion-footer *ngIf=\"design && design.type !=='design'\" class=\"ion-no-border white-bg\">\r\n    <ion-grid>\r\n        <ion-row class=\"ion-text-end ion-align-items-end ion-justify-content-end\">\r\n            <ion-col size=\"auto\">\r\n                <ion-button class=\"action-button-color\" fill=\"clear\" (click)=\"updateAssignee()\">Save</ion-button>\r\n            </ion-col>\r\n        </ion-row>\r\n    </ion-grid>\r\n\r\n</ion-footer>\r\n<ion-footer *ngIf=\"user.role.type=='designer' && design && (design.status=='designassigned'||design.status=='reviewfailed')\" class=\"ion-no-border white-bg\">\r\n    <ion-grid>\r\n        <ion-row class=\"ion-text-end ion-align-items-end ion-justify-content-end\">\r\n            <ion-col size=\"auto\">\r\n                <ion-button class=\"action-button-color\" fill=\"clear\" (click)=\"updatecomments()\">Submit</ion-button>\r\n            </ion-col>\r\n        </ion-row>\r\n    </ion-grid>\r\n\r\n</ion-footer>\r\n<ion-footer *ngIf=\"(user.role.type=='qcinspector' && design && design.status=='reviewassigned')||(design && design.status=='reviewassigned' && design.reviewassignedto.id==user.id)\" class=\"ion-no-border white-bg\">\r\n    <ion-grid>\r\n        <ion-row class=\"ion-text-end ion-align-items-end ion-justify-content-end\">\r\n            <ion-col size=\"auto\">\r\n                <ion-button class=\"action-button-color\" *ngIf=\"!isSelfUpdate\" fill=\"clear\" style=\"float: left;\" (click)=\"reportDesignReviewFailure()\">Failed</ion-button>\r\n                <ion-button class=\"action-button-color\" fill=\"clear\" style=\"float: right ;\" (click)=\"designReviewSuccess()\">Passed</ion-button>\r\n            </ion-col>\r\n        </ion-row>\r\n    </ion-grid>\r\n\r\n</ion-footer>\r\n\r\n\r\n");

/***/ }),

/***/ "xrjK":
/*!*****************************************************************!*\
  !*** ./src/app/design-details/design-details-routing.module.ts ***!
  \*****************************************************************/
/*! exports provided: DesignDetailsPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DesignDetailsPageRoutingModule", function() { return DesignDetailsPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _design_details_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./design-details.page */ "SrmH");




const routes = [
    {
        path: '',
        component: _design_details_page__WEBPACK_IMPORTED_MODULE_3__["DesignDetailsPage"]
    }
];
let DesignDetailsPageRoutingModule = class DesignDetailsPageRoutingModule {
};
DesignDetailsPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], DesignDetailsPageRoutingModule);



/***/ })

}]);
//# sourceMappingURL=design-details-design-details-module.js.map