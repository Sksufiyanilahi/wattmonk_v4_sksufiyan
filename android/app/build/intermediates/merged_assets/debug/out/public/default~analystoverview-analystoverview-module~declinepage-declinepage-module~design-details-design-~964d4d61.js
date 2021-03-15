(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~analystoverview-analystoverview-module~declinepage-declinepage-module~design-details-design-~964d4d61"],{

/***/ "uPeJ":
/*!*************************************************!*\
  !*** ./src/app/declinepage/declinepage.page.ts ***!
  \*************************************************/
/*! exports provided: DeclinepagePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeclinepagePage", function() { return DeclinepagePage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_declinepage_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./declinepage.page.html */ "ufz+");
/* harmony import */ var _declinepage_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./declinepage.page.scss */ "wN7F");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ionic_native_camera_ngx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic-native/camera/ngx */ "a/9d");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../api.service */ "yTNM");
/* harmony import */ var _utilities_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utilities.service */ "oTnF");
/* harmony import */ var _ionic_native_chooser_ngx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic-native/chooser/ngx */ "UWV4");
/* harmony import */ var _ionic_native_file_ngx__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic-native/file/ngx */ "FAH8");
/* harmony import */ var _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @cometchat-pro/cordova-ionic-chat */ "ujHh");
/* harmony import */ var _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _storage_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../storage.service */ "qkCY");












let DeclinepagePage = class DeclinepagePage {
    constructor(camera, modalCtrl, apiservice, nav, utilities, chooser, file, storageService) {
        this.camera = camera;
        this.modalCtrl = modalCtrl;
        this.apiservice = apiservice;
        this.nav = nav;
        this.utilities = utilities;
        this.chooser = chooser;
        this.file = file;
        this.storageService = storageService;
        this.exceedfileSize = 0;
        this.enableDisable = true;
        this.pestampDeclineList = [];
        this.pestampDeclineFileUpload = false;
    }
    ngOnInit() {
        this.id = this.nav.get('id');
        this.value = this.nav.get('value');
        this.declinedbypeengineer = this.nav.get('declinedbypeengineer');
        console.log(this.declinedbypeengineer);
        console.log(this.id);
        console.log(this.value);
        this.pestampDeclineFileUpload = false;
        this.userData = this.storageService.getUser();
    }
    selectAttachment() {
        //else{
        this.exceedfileSize = 0;
        // const options: CameraOptions = {
        //   quality: 30,
        //   targetWidth:600,
        //   targetHeight:300,
        //   sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        //   destinationType: this.camera.DestinationType.DATA_URL,
        //   encodingType: this.camera.EncodingType.PNG,
        //   mediaType: this.camera.MediaType.PICTURE
        // }
        this.chooser.getFile()
            .then((file) => {
            console.log(file);
            // if(this.value == 'pestamp'){
            //   for(var i=0; i< e.target.files.length;i++){
            //     this.pestampDeclineList.push(e.target.files[i])
            //   }
            // }
            // else{
            console.log(file, 'canceled');
            this.filename = file.name;
            this.file.resolveLocalFilesystemUrl(file.uri).then((fileentry) => {
                fileentry.file(fileObj => {
                    console.log(fileObj);
                    this.blob = fileObj;
                    console.log(fileObj.size);
                    this.exceedfileSize = fileObj.size;
                    if (fileObj.size > 1024 * 1024 * 25) {
                        this.enableDisable = true;
                    }
                    else {
                        //  this.enableDisable = false;
                        this.getBase64(fileObj).then(res => {
                            let base64file = file.dataURI + res;
                            this.blob = this.utilities.b64toBlob(base64file);
                            console.log(this.blob);
                        });
                    }
                });
            });
        }
        //}
        )
            .catch((error) => console.error(error));
        // this.camera.getPicture(options).then((imageData) => {
        //   // imageData is either a base64 encoded string or a file URI
        //   // If it's base64 (DATA_URL):
        //   let base64Image = 'data:image/jpeg;base64,' + imageData;
        //   this.blob = this.utilities.b64tBlob(base64Image);
        //   console.log(this.blob);
        //   this.filename = Date.now().toString() + '.png';
        //   if(this.blob){
        //     this.uploadFile();
        //   }
        //  }, (err) => {
        //   // Handle error
        //  })
    }
    cancel() {
        this.modalCtrl.dismiss({
            'dismissed': true,
            cancel: 'cancel'
        });
    }
    detectchange() {
        // 26214400
        if (this.reason == undefined || this.reason == '') {
            this.enableDisable = true;
        }
        else {
            this.enableDisable = false;
        }
    }
    submit() {
        if (this.exceedfileSize < 1048576 && this.exceedfileSize != 0) {
            if (this.pestampDeclineFileUpload) {
                this.pestampDeclineFile();
            }
            else {
                this.uploadFile();
            }
        }
        else if (this.filename !== '' && this.exceedfileSize > 1048576) {
            console.log('could not submit');
        }
        else {
            var designstarttime = new Date();
            var milisecond = designstarttime.getTime();
            if (this.value == 'pestamp') {
                var declinedbypeengineer;
                if (this.declinedbypeengineer == true) {
                    declinedbypeengineer = true;
                }
                else {
                    declinedbypeengineer = false;
                }
                var cdate = Date.now();
                var postData = {
                    status: 'declined',
                    requestdeclinereason: this.reason,
                    isoutsourced: "false",
                    pestampacceptancestarttime: cdate,
                    acknowledgedby: this.userData.id,
                    declinedbypeengineer: declinedbypeengineer
                };
                this.apiservice.assignPestamps(this.id, postData).subscribe((res) => {
                    //this.createNewDesignChatGroup(res);
                    console.log(res);
                    this.modalCtrl.dismiss({
                        'dismissed': true
                    });
                });
            }
            else {
                var data = {
                    status: 'requestdeclined',
                    requestdeclinereason: this.reason,
                    isoutsourced: "false",
                    designacceptanceendtime: milisecond,
                };
                console.log(data);
                this.apiservice.updateDesignForm(data, this.id).subscribe((res) => {
                    this.createNewDesignChatGroup(res);
                    this.modalCtrl.dismiss({
                        'dismissed': true
                    });
                });
            }
        }
    }
    uploadPestampDeclineFile(event) {
        console.log(event);
        console.log(event.target.files);
        this.exceedfileSize = event.target.files[0].size;
        console.log(this.exceedfileSize);
        //this.isPermitPlanFileUpload = true;
        for (var i = 0; i < event.target.files.length; i++) {
            this.pestampDeclineList.push(event.target.files[i]);
        }
        this.pestampDeclineFileUpload = true;
        console.log(this.pestampDeclineList);
    }
    removeArc(i) {
        this.pestampDeclineList.splice(i, 1);
    }
    pestampDeclineFile() {
        console.log("Hello pestamp");
        const data = new FormData();
        for (var i = 0; i < this.pestampDeclineList.length; i++) {
            data.append("files", this.pestampDeclineList[i]);
            if (i == 0) {
                //data.append('files', file);
                data.append('path', "pestamp/" + this.id);
                data.append('refId', "" + this.id);
                data.append('ref', "pestamp");
                data.append('field', "requestdeclineattachment");
                console.log("file upload data---" + data);
            }
        }
        this.utilities.showLoading('Uploading').then(() => {
            this.apiservice.uploadFile(data).subscribe((res) => {
                this.utilities.hideLoading().then(() => {
                    var declinedbypeengineer;
                    if (this.declinedbypeengineer == true) {
                        declinedbypeengineer = true;
                    }
                    else {
                        declinedbypeengineer = false;
                    }
                    var cdate = Date.now();
                    var postData = {
                        status: 'declined',
                        requestdeclinereason: this.reason,
                        isoutsourced: "false",
                        pestampacceptancestarttime: cdate,
                        acknowledgedby: this.userData.id,
                        declinedbypeengineer: declinedbypeengineer
                    };
                    this.apiservice.assignPestamps(this.id, postData).subscribe((res) => {
                        //this.createNewDesignChatGroup(res);
                        console.log(res);
                        this.modalCtrl.dismiss({
                            'dismissed': true
                        });
                    });
                });
            }, err => {
                this.utilities.errorSnackBar(err.error);
                this.utilities.hideLoading();
            });
        });
    }
    uploadFile() {
        this.utilities.showLoading('Uploading').then(() => {
            this.apiservice.uploadDeclineImage(this.id, 'requestdeclineattachment', this.blob, this.filename).subscribe((res) => {
                this.utilities.hideLoading().then(() => {
                    let data = {
                        status: 'requestdeclined',
                        requestdeclinereason: this.reason,
                        outsourcedto: null,
                        isoutsourced: "false"
                    };
                    console.log(data);
                    this.apiservice.updateDesignForm(data, this.id).subscribe((res) => {
                        this.modalCtrl.dismiss({
                            'dismissed': true
                        });
                    });
                });
            }, err => {
                this.utilities.errorSnackBar(err.error);
                this.utilities.hideLoading();
            });
        });
    }
    getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                let encoded = reader.result.toString().replace(/^data:(.*,)?/, '');
                if ((encoded.length % 4) > 0) {
                    encoded += '='.repeat(4 - (encoded.length % 4));
                }
                resolve(encoded);
            };
            reader.onerror = error => reject(error);
        });
    }
    createNewDesignChatGroup(design) {
        debugger;
        var GUID = 'prelim' + "_" + new Date().getTime();
        var address = design.address.substring(0, 60);
        var groupName = design.name + "_" + address;
        var groupType = _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_10__["CometChat"].GROUP_TYPE.PRIVATE;
        var password = "";
        var group = new _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_10__["CometChat"].Group(GUID, groupName, groupType, password);
        _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_10__["CometChat"].createGroup(group).then(group => {
            debugger;
            let membersList = [
                new _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_10__["CometChat"].GroupMember("" + design.createdby.id, _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_10__["CometChat"].GROUP_MEMBER_SCOPE.ADMIN),
                new _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_10__["CometChat"].GroupMember("" + this.userData.id, _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_10__["CometChat"].GROUP_MEMBER_SCOPE.ADMIN)
            ];
            _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_10__["CometChat"].addMembersToGroup(group.getGuid(), membersList, []).then(response => {
                if (design.requesttype == "prelim") {
                    let postdata = {
                        chatid: GUID
                    };
                    this.apiservice.updateDesignForm(postdata, this.id).subscribe(res => {
                        console.log(res);
                    });
                    // this.updateItemInList(LISTTYPE.NEW, design);
                }
                else {
                    // this.updateItemInPermitList(LISTTYPE.NEW, design);
                }
            }, error => {
                console.log(error);
            });
        }, error => {
            console.log(error);
        });
    }
};
DeclinepagePage.ctorParameters = () => [
    { type: _ionic_native_camera_ngx__WEBPACK_IMPORTED_MODULE_4__["Camera"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["ModalController"] },
    { type: _api_service__WEBPACK_IMPORTED_MODULE_6__["ApiService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["NavParams"] },
    { type: _utilities_service__WEBPACK_IMPORTED_MODULE_7__["UtilitiesService"] },
    { type: _ionic_native_chooser_ngx__WEBPACK_IMPORTED_MODULE_8__["Chooser"] },
    { type: _ionic_native_file_ngx__WEBPACK_IMPORTED_MODULE_9__["File"] },
    { type: _storage_service__WEBPACK_IMPORTED_MODULE_11__["StorageService"] }
];
DeclinepagePage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-declinepage',
        template: _raw_loader_declinepage_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_declinepage_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], DeclinepagePage);



/***/ }),

/***/ "ufz+":
/*!*****************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/declinepage/declinepage.page.html ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- <ion-header>\r\n  <ion-toolbar>\r\n    <ion-title>Confirm</ion-title>\r\n  </ion-toolbar>\r\n</ion-header> -->\r\n\r\n<ion-content>\r\n  <ion-grid>\r\n  <h4 style=\"font-weight: bold;margin-bottom:0px !important;padding: 10px;\">Are you sure?</h4>\r\n      <ion-row>\r\n        <ion-col>\r\n          <h6 style=\"margin-top:0px;padding: 2px;\">Please specify the reason</h6>\r\n          <textarea placeholder=\"Reason*\" [(ngModel)]=\"reason\" (input)=\"detectchange()\" style=\"width: 100%;\" required></textarea>\r\n        </ion-col>\r\n      </ion-row>\r\n      <ion-row *ngIf=\"value!='pestamp'\">\r\n        <ion-col>\r\n          <h6 style=\"margin:0px 0 0px 0;\">Attachment</h6>\r\n\r\n            <ion-input type=\"text\" placeholder=\"Select Attachment\" [(ngModel)]=\"filename\" readonly (click)=\"selectAttachment()\" style=\"border-bottom:1px solid grey\"  > <ion-icon name=\"attach-outline\" style=\"float: right;text-align:right ;\"></ion-icon></ion-input>\r\n\r\n         <small *ngIf=\"exceedfileSize > 26214400\" style=\"color:red\">File size should not be greater than 25MB.</small>\r\n        </ion-col>\r\n      </ion-row>\r\n      <ion-row *ngIf=\"value=='pestamp'\">\r\n        <ion-col size=\"12\">\r\n      \r\n            <ng-container>\r\n                <ion-item class=\"ion-no-padding\" (click)=\"decline.click()\">\r\n                    <ion-label position=\"floating\" class=\"label\">Attachment</ion-label>\r\n                        <input type=\"file\" #decline class=\"form_input\"  (change)=\"uploadPestampDeclineFile($event)\" style=\"margin-top: 12px;\">\r\n                        <ion-icon name=\"attach-outline\" slot=\"end\" style=\"margin-top:21px\"></ion-icon>\r\n                    </ion-item>\r\n                    <div *ngFor=\"let file of pestampDeclineList;let i = index\">\r\n                        <ion-item>\r\n                            <ion-col size=\"11\">\r\n                                {{file.name}}\r\n                            </ion-col>\r\n                            <ion-col size=\"1\" (click)=\"removeArc(i)\">x</ion-col>\r\n                        </ion-item>\r\n                    </div>\r\n                    </ng-container>\r\n                    \r\n                </ion-col>\r\n                <!-- <ng-container *ngIf=\"design && design.atticphotos !==null\">\r\n                  <div *ngFor=\"let arc of design.atticphotos;let i=index\">\r\n                     <ion-item>\r\n                         <ion-col size=\"auto\"> {{arc.name}}{{arc.ext}}</ion-col>\r\n                         \r\n                        \r\n    \r\n                     </ion-item>\r\n                 \r\n                     \r\n                 </div> \r\n              </ng-container> -->\r\n        \r\n      </ion-row>\r\n    </ion-grid>\r\n    <footer style=\"text-align: right;margin:12px;\">\r\n      <ion-button fill=\"clear\" (click)=\"cancel()\">Cancel</ion-button>\r\n      <ion-button fill=\"clear\" (click)=\"submit()\" [disabled]=\"enableDisable\">Submit</ion-button>\r\n    </footer>\r\n  <!-- <div class=_padding>\r\n    <p>Decline the design Request</p>\r\n    <textarea placeholder=\"Reason*\" style=\"width: 100%;\"></textarea>\r\n  </div> -->\r\n</ion-content>\r\n");

/***/ }),

/***/ "wN7F":
/*!***************************************************!*\
  !*** ./src/app/declinepage/declinepage.page.scss ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("._padding {\n  padding: 12px;\n}\n\n.modal-wrapper.sc-ion-modal-md {\n  transform: translate3d(0, 40px, 0) !important;\n  opacity: 0.01 !important;\n  height: 50% !important;\n}\n\ntextarea {\n  height: 100px;\n  padding: 7px;\n}\n\nion-grid {\n  padding: 14px;\n}\n\ninput[type=file] {\n  visibility: hidden;\n}\n\n.label {\n  color: #6C6C6C !important;\n  font-size: 15px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXGRlY2xpbmVwYWdlLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGFBQUE7QUFDSjs7QUFHQTtFQUVJLDZDQUFBO0VBQ0Esd0JBQUE7RUFDQSxzQkFBQTtBQUFKOztBQUdBO0VBQ0ksYUFBQTtFQUNBLFlBQUE7QUFBSjs7QUFHQTtFQUNJLGFBQUE7QUFBSjs7QUFHQTtFQUNJLGtCQUFBO0FBQUo7O0FBR0U7RUFDRSx5QkFBQTtFQUNBLGVBQUE7QUFBSiIsImZpbGUiOiJkZWNsaW5lcGFnZS5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuX3BhZGRpbmd7XHJcbiAgICBwYWRkaW5nOjEycHg7XHJcbn1cclxuXHJcblxyXG4ubW9kYWwtd3JhcHBlci5zYy1pb24tbW9kYWwtbWQge1xyXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDAsIDQwcHgsIDApICFpbXBvcnRhbnQ7XHJcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDAsIDQwcHgsIDApICFpbXBvcnRhbnQ7XHJcbiAgICBvcGFjaXR5OiAwLjAxICFpbXBvcnRhbnQ7XHJcbiAgICBoZWlnaHQ6IDUwJSAhaW1wb3J0YW50O1xyXG59XHJcblxyXG50ZXh0YXJlYXtcclxuICAgIGhlaWdodDogMTAwcHg7XHJcbiAgICBwYWRkaW5nOiA3cHg7XHJcbn1cclxuXHJcbmlvbi1ncmlke1xyXG4gICAgcGFkZGluZzogMTRweDtcclxufVxyXG5cclxuaW5wdXRbdHlwZT1cImZpbGVcIl17XHJcbiAgICB2aXNpYmlsaXR5OmhpZGRlbjtcclxuICB9XHJcblxyXG4gIC5sYWJlbCB7XHJcbiAgICBjb2xvcjogIzZDNkM2QyAhaW1wb3J0YW50O1xyXG4gICAgZm9udC1zaXplOiAxNXB4O1xyXG4gIH0iXX0= */");

/***/ })

}]);
//# sourceMappingURL=default~analystoverview-analystoverview-module~declinepage-declinepage-module~design-details-design-~964d4d61.js.map