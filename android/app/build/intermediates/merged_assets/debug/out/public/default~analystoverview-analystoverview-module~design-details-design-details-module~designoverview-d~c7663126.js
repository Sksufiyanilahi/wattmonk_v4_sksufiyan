(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~c7663126"],{

/***/ "C2Ol":
/*!*************************************************************!*\
  !*** ./src/app/resendpagedialog/resendpagedialog.page.scss ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("._padding {\n  padding: 12px;\n}\n\n.modal-wrapper.sc-ion-modal-md {\n  transform: translate3d(0, 40px, 0) !important;\n  opacity: 0.01 !important;\n  height: 50% !important;\n}\n\ntextarea {\n  height: 100px;\n  padding: 7px;\n}\n\nion-grid {\n  padding: 14px;\n}\n\ninput[type=file] {\n  visibility: hidden;\n}\n\n.label {\n  color: #6C6C6C !important;\n  font-size: 15px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXHJlc2VuZHBhZ2VkaWFsb2cucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksYUFBQTtBQUNKOztBQUdBO0VBRUksNkNBQUE7RUFDQSx3QkFBQTtFQUNBLHNCQUFBO0FBQUo7O0FBR0E7RUFDSSxhQUFBO0VBQ0EsWUFBQTtBQUFKOztBQUdBO0VBQ0ksYUFBQTtBQUFKOztBQUdBO0VBQ0ksa0JBQUE7QUFBSjs7QUFHRTtFQUNFLHlCQUFBO0VBQ0EsZUFBQTtBQUFKIiwiZmlsZSI6InJlc2VuZHBhZ2VkaWFsb2cucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLl9wYWRkaW5ne1xyXG4gICAgcGFkZGluZzoxMnB4O1xyXG59XHJcblxyXG5cclxuLm1vZGFsLXdyYXBwZXIuc2MtaW9uLW1vZGFsLW1kIHtcclxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwLCA0MHB4LCAwKSAhaW1wb3J0YW50O1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwLCA0MHB4LCAwKSAhaW1wb3J0YW50O1xyXG4gICAgb3BhY2l0eTogMC4wMSAhaW1wb3J0YW50O1xyXG4gICAgaGVpZ2h0OiA1MCUgIWltcG9ydGFudDtcclxufVxyXG5cclxudGV4dGFyZWF7XHJcbiAgICBoZWlnaHQ6IDEwMHB4O1xyXG4gICAgcGFkZGluZzogN3B4O1xyXG59XHJcblxyXG5pb24tZ3JpZHtcclxuICAgIHBhZGRpbmc6IDE0cHg7XHJcbn1cclxuXHJcbmlucHV0W3R5cGU9XCJmaWxlXCJde1xyXG4gICAgdmlzaWJpbGl0eTpoaWRkZW47XHJcbiAgfVxyXG5cclxuICAubGFiZWwge1xyXG4gICAgY29sb3I6ICM2QzZDNkMgIWltcG9ydGFudDtcclxuICAgIGZvbnQtc2l6ZTogMTVweDtcclxuICB9Il19 */");

/***/ }),

/***/ "R1eT":
/*!***********************************************************!*\
  !*** ./src/app/resendpagedialog/resendpagedialog.page.ts ***!
  \***********************************************************/
/*! exports provided: ResendpagedialogPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResendpagedialogPage", function() { return ResendpagedialogPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_resendpagedialog_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./resendpagedialog.page.html */ "mCCE");
/* harmony import */ var _resendpagedialog_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./resendpagedialog.page.scss */ "C2Ol");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ionic_native_camera_ngx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic-native/camera/ngx */ "a/9d");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../api.service */ "yTNM");
/* harmony import */ var _utilities_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utilities.service */ "oTnF");
/* harmony import */ var _ionic_native_chooser_ngx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic-native/chooser/ngx */ "UWV4");
/* harmony import */ var _ionic_native_file_ngx__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic-native/file/ngx */ "FAH8");
/* harmony import */ var _storage_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../storage.service */ "qkCY");











let ResendpagedialogPage = class ResendpagedialogPage {
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
        this.pestampResendList = [];
        this.pestampResendFileUpload = false;
    }
    ngOnInit() {
        this.userData = this.storageService.getUser();
        this.id = this.nav.get('id');
        console.log(this.id);
        this.requestType = this.nav.get('requesttype');
        console.log(this.requestType);
    }
    selectAttachment() {
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
            console.log(file, 'canceled');
            this.filename = file.name;
            this.file.resolveLocalFilesystemUrl(file.uri).then((fileentry) => {
                fileentry.file(fileObj => {
                    console.log(fileObj);
                    this.blob = fileObj;
                    console.log(fileObj.size);
                    if (fileObj.size > 1024 * 1024 * 1) {
                        this.exceedfileSize = fileObj.size;
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
        })
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
            if (this.pestampResendFileUpload) {
                this.pestampResendFile();
            }
            else {
                this.uploadFile();
            }
        }
        else if (this.filename !== '' && this.exceedfileSize > 1048576) {
            console.log('could not submit');
        }
        else {
            if (this.requestType == 'pestamp') {
                let cdate = Date.now();
                var pestampacceptancestarttime = new Date();
                pestampacceptancestarttime.setMinutes(pestampacceptancestarttime.getMinutes() + 15);
                const postData = {
                    // status: "accepted",
                    // isoutsourced: "true",
                    // isinrevisionstate : "true",
                    // revisioncomments: this.reason,
                    // pestampacceptancestarttime: pestampacceptancestarttime,
                    // actualdelivereddate: null
                    status: "assigned",
                    isoutsourced: "true",
                    isinrevisionstate: "true",
                    revisioncomments: this.reason,
                    pestampacceptancestarttime: pestampacceptancestarttime,
                    actualdelivereddate: null,
                    acceptedbypeengineer: false,
                    declinedbypeengineer: false
                };
                this.apiservice.assignPestamps(this.id, postData).subscribe((res) => {
                    this.utilities.showSnackBar("Pestamp request has been send for revision successfully.");
                    this.modalCtrl.dismiss({
                        'dismissed': true
                    });
                });
            }
            else {
                var data = {};
                if (this.requestType == 'prelim') {
                    var tomorrow = new Date();
                    tomorrow.setDate(tomorrow.getDate() + 1);
                    var designacceptancestarttime = new Date();
                    designacceptancestarttime.setMinutes(designacceptancestarttime.getMinutes() + 15);
                    data = {
                        deliverydate: tomorrow.toISOString(),
                        designacceptancestarttime: designacceptancestarttime,
                        isinrevisionstate: "true",
                        isoutsourced: "true",
                        revisioncomments: this.reason,
                        status: "outsourced"
                    };
                }
                else {
                    var tomorrow = new Date();
                    tomorrow.setDate(tomorrow.getDate() + 2);
                    var designacceptancestarttime = new Date();
                    designacceptancestarttime.setMinutes(designacceptancestarttime.getMinutes() + 30);
                    data = {
                        deliverydate: tomorrow.toISOString(),
                        designacceptancestarttime: designacceptancestarttime,
                        isinrevisionstate: "true",
                        isoutsourced: "true",
                        revisioncomments: this.reason,
                        status: "outsourced"
                    };
                }
                console.log(data);
                this.apiservice.updateDesignForm(data, this.id).subscribe((res) => {
                    this.modalCtrl.dismiss({
                        'dismissed': true
                    });
                });
            }
        }
    }
    uploadPestamResendFile(event) {
        console.log(event);
        console.log(event.target.files);
        this.exceedfileSize = event.target.files[0].size;
        console.log(this.exceedfileSize);
        //this.isPermitPlanFileUpload = true;
        for (var i = 0; i < event.target.files.length; i++) {
            this.pestampResendList.push(event.target.files[i]);
        }
        this.pestampResendFileUpload = true;
        console.log(this.pestampResendList);
    }
    removeArc(i) {
        this.pestampResendList.splice(i, 1);
    }
    pestampResendFile() {
        console.log("Hello pestamp");
        const data = new FormData();
        for (var i = 0; i < this.pestampResendList.length; i++) {
            data.append("files", this.pestampResendList[i]);
            if (i == 0) {
                //data.append('files', file);
                data.append('path', "pestamp/" + this.id);
                data.append('refId', "" + this.id);
                data.append('ref', "pestamp");
                data.append('field', "revisionattachments");
                console.log("file upload data---" + data);
            }
        }
        this.utilities.showLoading('Uploading').then(() => {
            this.apiservice.uploadFile(data).subscribe((res) => {
                this.utilities.hideLoading().then(() => {
                    //     var declinedbypeengineer;
                    //  if(this.declinedbypeengineer == true)
                    //   {
                    //   declinedbypeengineer = true;
                    //   }
                    //   else{
                    //   declinedbypeengineer = false;
                    //   }
                    var pestampacceptancestarttime = new Date();
                    pestampacceptancestarttime.setMinutes(pestampacceptancestarttime.getMinutes() + 15);
                    var postData = {
                        // status: 'accepted',
                        // revisioncomments: this.reason,
                        // isoutsourced : "true",
                        // isinrevisionstate: "true",
                        // pestampacceptancestarttime: pestampacceptancestarttime,
                        // actualdelivereddate: null,
                        status: "assigned",
                        isoutsourced: "true",
                        isinrevisionstate: "true",
                        revisioncomments: this.reason,
                        pestampacceptancestarttime: pestampacceptancestarttime,
                        actualdelivereddate: null,
                        acceptedbypeengineer: false,
                        declinedbypeengineer: false
                    };
                    this.apiservice.assignPestamps(this.id, postData).subscribe((res) => {
                        //this.createNewDesignChatGroup(res);
                        console.log(res);
                        this.utilities.showSnackBar("Pestamp request has been send for revision successfully.");
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
        var designacceptancestarttime = new Date();
        designacceptancestarttime.setMinutes(designacceptancestarttime.getMinutes() + 15);
        this.utilities.showLoading('Uploading').then(() => {
            this.apiservice.uploadDeclineImage(this.id, 'revisionattachments', this.blob, this.filename).subscribe((res) => {
                this.utilities.hideLoading().then(() => {
                    let data = {
                        deliverydate: null,
                        designacceptancestarttime: designacceptancestarttime,
                        isinrevisionstate: "true",
                        isoutsourced: "true",
                        revisioncomments: this.reason,
                        status: "outsourced"
                    };
                    console.log(data);
                    this.apiservice.updateDesignForm(data, this.id).subscribe((res) => {
                        this.utilities.showSnackBar("Design request has been send for revision successfully.");
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
};
ResendpagedialogPage.ctorParameters = () => [
    { type: _ionic_native_camera_ngx__WEBPACK_IMPORTED_MODULE_4__["Camera"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["ModalController"] },
    { type: _api_service__WEBPACK_IMPORTED_MODULE_6__["ApiService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["NavParams"] },
    { type: _utilities_service__WEBPACK_IMPORTED_MODULE_7__["UtilitiesService"] },
    { type: _ionic_native_chooser_ngx__WEBPACK_IMPORTED_MODULE_8__["Chooser"] },
    { type: _ionic_native_file_ngx__WEBPACK_IMPORTED_MODULE_9__["File"] },
    { type: _storage_service__WEBPACK_IMPORTED_MODULE_10__["StorageService"] }
];
ResendpagedialogPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-resendpagedialog',
        template: _raw_loader_resendpagedialog_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_resendpagedialog_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], ResendpagedialogPage);



/***/ }),

/***/ "UWV4":
/*!**********************************************************************!*\
  !*** ./node_modules/@ionic-native/chooser/__ivy_ngcc__/ngx/index.js ***!
  \**********************************************************************/
/*! exports provided: Chooser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Chooser", function() { return Chooser; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ionic_native_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic-native/core */ "C6fG");




var Chooser = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(Chooser, _super);
    function Chooser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Chooser.prototype.getFile = function (accept) { return Object(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["cordova"])(this, "getFile", {}, arguments); };
    Chooser.prototype.getFileMetadata = function (accept) { return Object(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["cordova"])(this, "getFileMetadata", {}, arguments); };
    Chooser.pluginName = "Chooser";
    Chooser.plugin = "cordova-plugin-chooser";
    Chooser.pluginRef = "chooser";
    Chooser.repo = "https://github.com/cyph/cordova-plugin-chooser";
    Chooser.platforms = ["Android", "iOS"];
Chooser.ɵfac = function Chooser_Factory(t) { return ɵChooser_BaseFactory(t || Chooser); };
Chooser.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: Chooser, factory: function (t) { return Chooser.ɵfac(t); } });
var ɵChooser_BaseFactory = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetInheritedFactory"](Chooser);
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](Chooser, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"]
    }], null, null); })();
    return Chooser;
}(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["IonicNativePlugin"]));


//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9AaW9uaWMtbmF0aXZlL3BsdWdpbnMvY2hvb3Nlci9uZ3gvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyw4QkFBc0MsTUFBTSxvQkFBb0IsQ0FBQzs7QUFDeEU7QUFFZSxJQW1EYywyQkFBaUI7QUFBQztBQUU5QjtBQUNrQjtBQUFNLElBS3ZDLHlCQUFPLGFBQUMsTUFBZTtBQUV0QixJQVNELGlDQUFlLGFBQUMsTUFBZTtBQUk1QjtBQUFvQztBQUErQztBQUFtQztBQUFxRTsyQ0F4Qi9MLFVBQVU7Ozs7OzBCQUNMO0FBQUMsa0JBdkRQO0FBQUUsRUF1RDJCLGlCQUFpQjtBQUM3QyxTQURZLE9BQU87QUFBSSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvcmRvdmEsIElvbmljTmF0aXZlUGx1Z2luLCBQbHVnaW4gfSBmcm9tICdAaW9uaWMtbmF0aXZlL2NvcmUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIENob29zZXJSZXN1bHQge1xuICBkYXRhPzogVWludDhBcnJheTtcbiAgZGF0YVVSST86IHN0cmluZztcbiAgbWVkaWFUeXBlOiBzdHJpbmc7XG4gIG5hbWU6IHN0cmluZztcbiAgdXJpOiBzdHJpbmc7XG59XG5cbi8qKlxuICogQG5hbWUgQ2hvb3NlclxuICogQGRlc2NyaXB0aW9uXG4gKiBGaWxlIGNob29zZXIgcGx1Z2luIGZvciBDb3Jkb3ZhLlxuICpcbiAqIFRoZSBmb2xsb3dpbmcgbXVzdCBiZSBhZGRlZCB0byBjb25maWcueG1sIHRvIHByZXZlbnQgY3Jhc2hpbmcgd2hlbiBzZWxlY3RpbmcgbGFyZ2UgZmlsZXMgb24gQW5kcm9pZDpcbiAqIGBgYHhtbFxuICogPHBsYXRmb3JtIG5hbWU9XCJhbmRyb2lkXCI+XG4gKiAgPGVkaXQtY29uZmlnXG4gKiAgICBmaWxlPVwiYXBwL3NyYy9tYWluL0FuZHJvaWRNYW5pZmVzdC54bWxcIlxuICogICAgbW9kZT1cIm1lcmdlXCJcbiAqICAgIHRhcmdldD1cIi9tYW5pZmVzdC9hcHBsaWNhdGlvblwiPlxuICogICAgPGFwcGxpY2F0aW9uIGFuZHJvaWQ6bGFyZ2VIZWFwPVwidHJ1ZVwiIC8+XG4gKiAgPC9lZGl0LWNvbmZpZz5cbiAqIDwvcGxhdGZvcm0+XG4gKiBgYGBcbiAqXG4gKiBAdXNhZ2VcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGltcG9ydCB7IENob29zZXIgfSBmcm9tICdAaW9uaWMtbmF0aXZlL2Nob29zZXIvbmd4JztcbiAqXG4gKlxuICogY29uc3RydWN0b3IocHJpdmF0ZSBjaG9vc2VyOiBDaG9vc2VyKSB7IH1cbiAqXG4gKiAuLi5cbiAqXG4gKlxuICogdGhpcy5jaG9vc2VyLmdldEZpbGUoKVxuICogICAudGhlbihmaWxlID0+IGNvbnNvbGUubG9nKGZpbGUgPyBmaWxlLm5hbWUgOiAnY2FuY2VsZWQnKSlcbiAqICAgLmNhdGNoKChlcnJvcjogYW55KSA9PiBjb25zb2xlLmVycm9yKGVycm9yKSk7XG4gKlxuICogYGBgXG4gKlxuICogQGludGVyZmFjZXNcbiAqIENob29zZXJSZXN1bHRcbiAqL1xuQFBsdWdpbih7XG4gIHBsdWdpbk5hbWU6ICdDaG9vc2VyJyxcbiAgcGx1Z2luOiAnY29yZG92YS1wbHVnaW4tY2hvb3NlcicsXG4gIHBsdWdpblJlZjogJ2Nob29zZXInLFxuICByZXBvOiAnaHR0cHM6Ly9naXRodWIuY29tL2N5cGgvY29yZG92YS1wbHVnaW4tY2hvb3NlcicsXG4gIHBsYXRmb3JtczogWydBbmRyb2lkJywgJ2lPUyddLFxufSlcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDaG9vc2VyIGV4dGVuZHMgSW9uaWNOYXRpdmVQbHVnaW4ge1xuICAvKipcbiAgICogRGlzcGxheXMgbmF0aXZlIHByb21wdCBmb3IgdXNlciB0byBzZWxlY3QgYSBmaWxlLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gW2FjY2VwdF0gT3B0aW9uYWwgTUlNRSB0eXBlIGZpbHRlciAoZS5nLiAnaW1hZ2UvZ2lmLHZpZGVvLyonKS5cbiAgICogQHJldHVybiB7UHJvbWlzZTxhbnk+fSBQcm9taXNlIGNvbnRhaW5pbmcgc2VsZWN0ZWQgZmlsZSdzIHJhdyBiaW5hcnkgZGF0YSxcbiAgICogYmFzZTY0LWVuY29kZWQgZGF0YTogVVJJLCBNSU1FIHR5cGUsIGRpc3BsYXkgbmFtZSwgYW5kIG9yaWdpbmFsIFVSSS5cbiAgICovXG4gIEBDb3Jkb3ZhKClcbiAgZ2V0RmlsZShhY2NlcHQ/OiBzdHJpbmcpOiBQcm9taXNlPENob29zZXJSZXN1bHQgfCB1bmRlZmluZWQ+IHtcbiAgICByZXR1cm47XG4gIH1cbiAgLyoqXG4gICAqIERpc3BsYXlzIG5hdGl2ZSBwcm9tcHQgZm9yIHVzZXIgdG8gc2VsZWN0IGEgZmlsZS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IFthY2NlcHRdIE9wdGlvbmFsIE1JTUUgdHlwZSBmaWx0ZXIgKGUuZy4gJ2ltYWdlL2dpZix2aWRlby8qJykuXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59IFByb21pc2UgY29udGFpbmluZyBzZWxlY3RlZCBmaWxlJ3MgTUlNRSB0eXBlLCBkaXNwbGF5IG5hbWUsIGFuZCBvcmlnaW5hbCBVUkkuXG4gICAqIElmIHVzZXIgY2FuY2VscywgcHJvbWlzZSB3aWxsIGJlIHJlc29sdmVkIGFzIHVuZGVmaW5lZC5cbiAgICogSWYgZXJyb3Igb2NjdXJzLCBwcm9taXNlIHdpbGwgYmUgcmVqZWN0ZWQuXG4gICAqL1xuICBAQ29yZG92YSgpXG4gIGdldEZpbGVNZXRhZGF0YShhY2NlcHQ/OiBzdHJpbmcpOiBQcm9taXNlPENob29zZXJSZXN1bHQgfCB1bmRlZmluZWQ+IHtcbiAgICByZXR1cm47XG4gIH1cbn1cbiJdfQ==

/***/ }),

/***/ "mCCE":
/*!***************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/resendpagedialog/resendpagedialog.page.html ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-content>\r\n  <ion-grid>\r\n  <h4 style=\"font-weight: bold;margin-bottom:0px !important;padding: 10px;\">Send design for revision</h4>\r\n      <ion-row>\r\n        <ion-col>\r\n          <h6 style=\"margin-top:0px;padding: 2px;\">Please specify the reason</h6>\r\n          <textarea placeholder=\"Reason*\" [(ngModel)]=\"reason\" (input)=\"detectchange()\" style=\"width: 100%;\" required></textarea>\r\n        </ion-col>\r\n      </ion-row>\r\n      <ion-row *ngIf=\"requestType!='pestamp'\">\r\n        <ion-col>\r\n          <h6 style=\"margin:0px 0 0px 0;\">Attachment</h6>\r\n        \r\n            <ion-input type=\"text\" placeholder=\"Select Attachment\" [(ngModel)]=\"filename\" readonly (click)=\"selectAttachment()\" style=\"border-bottom:1px solid grey\"  > <ion-icon name=\"attach-outline\" style=\"float: right;text-align:right ;\"></ion-icon></ion-input>\r\n           \r\n         <small *ngIf=\"exceedfileSize > 0\" style=\"color:red\">File size should not be greater than 25MB.</small>\r\n        </ion-col>\r\n      </ion-row>\r\n      <ion-row *ngIf=\"requestType=='pestamp'\">\r\n        <ion-col size=\"12\">\r\n      \r\n            <ng-container>\r\n                <ion-item class=\"ion-no-padding\" (click)=\"resend.click()\">\r\n                    <ion-label position=\"floating\" class=\"label\">Attachment</ion-label>\r\n                        <input type=\"file\" #resend class=\"form_input\"  (change)=\"uploadPestamResendFile($event)\" style=\"margin-top: 12px;\">\r\n                        <ion-icon name=\"attach-outline\" slot=\"end\" style=\"margin-top:21px\"></ion-icon>\r\n                    </ion-item>\r\n                    <div *ngFor=\"let file of pestampResendList;let i = index\">\r\n                        <ion-item>\r\n                            <ion-col size=\"11\">\r\n                                {{file.name}}\r\n                            </ion-col>\r\n                            <ion-col size=\"1\" (click)=\"removeArc(i)\">x</ion-col>\r\n                        </ion-item>\r\n                    </div>\r\n                    </ng-container>\r\n                    \r\n                </ion-col>\r\n                <!-- <ng-container *ngIf=\"design && design.atticphotos !==null\">\r\n                  <div *ngFor=\"let arc of design.atticphotos;let i=index\">\r\n                     <ion-item>\r\n                         <ion-col size=\"auto\"> {{arc.name}}{{arc.ext}}</ion-col>\r\n                         \r\n                        \r\n    \r\n                     </ion-item>\r\n                 \r\n                     \r\n                 </div> \r\n              </ng-container> -->\r\n        \r\n      </ion-row>\r\n    </ion-grid>\r\n    <footer style=\"text-align: right;margin:12px;\">\r\n      <ion-button fill=\"clear\" (click)=\"cancel()\">Cancel</ion-button>\r\n      <ion-button fill=\"clear\" (click)=\"submit()\" [disabled]=\"enableDisable\">Submit</ion-button>\r\n    </footer>\r\n  <!-- <div class=_padding>\r\n    <p>Decline the design Request</p>\r\n    <textarea placeholder=\"Reason*\" style=\"width: 100%;\"></textarea>\r\n  </div> -->\r\n</ion-content>\r\n");

/***/ })

}]);
//# sourceMappingURL=default~analystoverview-analystoverview-module~design-details-design-details-module~designoverview-d~c7663126.js.map