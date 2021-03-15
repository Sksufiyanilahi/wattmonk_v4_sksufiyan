(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["analystoverview-analystoverview-module"],{

/***/ "+Z2m":
/*!************************************************************************!*\
  !*** ./src/app/analystoverview/permitdesign/permitdesign.component.ts ***!
  \************************************************************************/
/*! exports provided: PermitdesignComponent, DesginDataHelper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PermitdesignComponent", function() { return PermitdesignComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DesginDataHelper", function() { return DesginDataHelper; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_permitdesign_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./permitdesign.component.html */ "9Ftw");
/* harmony import */ var _permitdesign_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./permitdesign.component.scss */ "RqZp");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_api_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/api.service */ "yTNM");
/* harmony import */ var src_app_utilities_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/utilities.service */ "oTnF");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _ionic_native_launch_navigator_ngx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic-native/launch-navigator/ngx */ "fGQ8");
/* harmony import */ var ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ion-bottom-drawer */ "rFvw");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ionic/storage */ "e8h1");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var src_app_declinepage_declinepage_page__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! src/app/declinepage/declinepage.page */ "uPeJ");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! moment */ "wd/R");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var src_app_storage_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! src/app/storage.service */ "qkCY");
/* harmony import */ var src_app_networkdetect_service__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! src/app/networkdetect.service */ "UZ2B");
/* harmony import */ var _ionic_native_social_sharing_ngx__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @ionic-native/social-sharing/ngx */ "/XPu");
/* harmony import */ var src_app_email_model_email_model_page__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! src/app/email-model/email-model.page */ "+k72");
/* harmony import */ var src_app_contants_prod__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! src/app/contants.prod */ "1oiu");
/* harmony import */ var _ionic_native_in_app_browser_ngx__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @ionic-native/in-app-browser/ngx */ "m/P+");





















let PermitdesignComponent = class PermitdesignComponent {
    constructor(utils, apiService, datePipe, storage, cdr, launchNavigator, formBuilder, route, router, modalController, storageService, network, socialsharing, iab, social) {
        this.utils = utils;
        this.apiService = apiService;
        this.datePipe = datePipe;
        this.storage = storage;
        this.cdr = cdr;
        this.launchNavigator = launchNavigator;
        this.formBuilder = formBuilder;
        this.route = route;
        this.router = router;
        this.modalController = modalController;
        this.storageService = storageService;
        this.network = network;
        this.socialsharing = socialsharing;
        this.iab = iab;
        this.social = social;
        this.version = src_app_contants_prod__WEBPACK_IMPORTED_MODULE_19__["version"];
        this.listOfDesignDataHelper = [];
        this.listOfDesignsData = [];
        this.options = {
            start: '',
            app: this.launchNavigator.APP.GOOGLE_MAPS
        };
        this.drawerState = ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_8__["DrawerState"].Bottom;
        this.listOfAssignees = [];
        this.designId = 0;
        this.showBottomDraw = false;
        this.myFiles = [];
        this.skip = 0;
        this.limit = 10;
        this.segments = 'requesttype=permit&status=reviewassigned&status=reviewfailed&status=reviewpassed';
        const latestDate = new Date();
        this.today = datePipe.transform(latestDate, 'M/dd/yy');
        console.log('date', this.today);
        this.todaysdate = datePipe.transform(latestDate, 'yyyy-MM-dd');
        this.assignForm = this.formBuilder.group({
            assignedto: new _angular_forms__WEBPACK_IMPORTED_MODULE_9__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_9__["Validators"].required]),
            comment: new _angular_forms__WEBPACK_IMPORTED_MODULE_9__["FormControl"]('')
        });
    }
    ionViewDidEnter() {
        // if(this.version !== this.update_version && this.update_version !==''){
        //   setTimeout(()=>{
        //     this.utils.showAlertBox('Update App','New version of app is available on Play Store. Please update now to get latest features and bug fixes.',[{
        //       text:'Ok',
        //       handler:()=>{
        //         this.iab.create('https://play.google.com/store/apps/details?id=com.solar.wattmonk',"_system");
        //        this.ionViewDidEnter();
        //       }
        //     }]);
        //   },2000)
        // }
        this.deactivateNetworkSwitch = this.network.networkSwitch.subscribe(data => {
            this.netSwitch = data;
            console.log(this.netSwitch);
        });
        this.network.networkDisconnect();
        this.network.networkConnect();
    }
    segmentChanged(event) {
        if (this.userData.role.type == 'qcinspector') {
            if (event.target.value == 'InReview') {
                this.segments = "requesttype=permit&status=reviewassigned&status=reviewfailed&status=reviewpassed";
                // return this.segments;
            }
            else if (event.target.value == 'delivered') {
                this.segments = "requesttype=permit&status=delivered";
            }
            this.getDesigns(null);
            // return this.segments;
        }
        // this.getsegmentdata(event.target.value);
        console.log((event.target.value));
        // console.log((event.target.value));
        // this.pending(event.target.value);
        // this.segments = event.target.value;
        //this.DesignRefreshSubscription = this.utils.getHomepageDesignRefresh().subscribe((result) => {
        //  this.getDesigns(null);
        //});
        //this.dataRefreshSubscription = this.utils.getDataRefresh().subscribe((result) => {
        // if(this.listOfDesigns != null && this.listOfDesigns.length > 0){
        //  this.formatDesignData(this.listOfDesigns);
        // }
        //});
    }
    ngOnInit() {
        this.userData = this.storageService.getUser();
        this.apiService.version.subscribe(versionInfo => {
            this.update_version = versionInfo;
        });
        console.log(this.userData);
        // this.router.navigate(['homepage/design/pending']);
        // this.routeSubscription = this.router.events.subscribe((event) => {
        //   if (event instanceof NavigationEnd) {
        //     // Trick the Router into believing it's last link wasn't previously loaded
        //     if (this.router.url.indexOf('page') > -1) {
        //       this.router.navigated = false;
        //       let data = this.route.queryParams.subscribe((_res: any) => {
        //         console.log('Serach Term', _res);
        //         if (Object.keys(_res).length !== 0) {
        //           //  this.ApplysearchDesginAndSurvey(_res.serchTerm)
        //           this.filterData(_res.serchTerm);
        //         } else {
        //           // this.refreshSubscription = this.utils.getHomepageDesignRefresh().subscribe((result) => {
        //             // debugger;
        //             this.getDesign(null, true);
        //           // });
        //         }
        //       });
        //     }
        //   }
        // });
        this.PermitRefreshSubscription = this.utils.getHomepagePermitRefresh().subscribe((result) => {
            this.skip = 0;
            this.getDesigns(null);
        });
        this.dataRefreshSubscription = this.utils.getDataRefresh().subscribe((result) => {
            if (this.listOfDesigns != null && this.listOfDesigns.length > 0) {
                this.formatDesignData(this.listOfDesigns);
            }
        });
    }
    getDesigns(event) {
        //debugger;
        let showLoader = true;
        if (event != null && event !== undefined) {
            showLoader = false;
        }
        this.fetchPendingDesigns(event, showLoader);
    }
    fetchPendingDesigns(event, showLoader) {
        this.noDesignsFound = "";
        console.log("inside fetch Designs");
        this.listOfDesigns = [];
        this.listOfDesignsHelper = [];
        this.utils.showLoadingWithPullRefreshSupport(showLoader, 'Getting Designs').then((success) => {
            this.apiService.getDesignSurveys(this.segments, this.limit, this.skip).subscribe((response) => {
                this.utils.hideLoadingWithPullRefreshSupport(showLoader).then(() => {
                    console.log(response);
                    if (response.length) {
                        this.formatDesignData(response);
                    }
                    else {
                        this.noDesignsFound = "No Designs Found";
                    }
                    if (event !== null) {
                        event.target.complete();
                    }
                });
            }, responseError => {
                this.utils.hideLoadingWithPullRefreshSupport(showLoader).then(() => {
                    if (event !== null) {
                        event.target.complete();
                    }
                    const error = responseError.error;
                    this.utils.errorSnackBar(error.message[0].messages[0].message);
                });
            });
        });
    }
    // formatDesignData(records : DesginDataModel[]){
    //   this.overdue=[];
    //   this.listOfDesigns = this.fillinDynamicData(records);
    //   console.log(this.listOfDesigns);
    //   const tempData: DesginDataHelper[] = [];
    //         this.listOfDesigns.forEach((designItem:any,i) => {
    //           console.log(i);
    //           if (tempData.length === 0) {
    //             this.sDatePassed(designItem.deliverydate,i);
    //             const listOfDesign = new DesginDataHelper();
    //             listOfDesign.date = this.datePipe.transform(designItem.deliverydate, 'M/dd/yy');
    //               listOfDesign.lateby = this.overdue;
    //             listOfDesign.listOfDesigns.push(designItem);
    //             tempData.push(listOfDesign);
    //             console.log(tempData);
    //           } else {
    //             let added = false;
    //             tempData.forEach((DesignList) => {
    //               // DesignList['listOfDesigns'].forEach(element=>{
    //               //   console.log(element.deliverydate,":::::::::::::");
    //               //   this.sDatePassed(element.deliverydate);
    //               // })
    //               if (!added) {
    //                 if (DesignList.date === this.datePipe.transform(designItem.deliverydate, 'M/dd/yy')) {
    //                   DesignList.listOfDesigns.push(designItem);
    //                   this.sDatePassed(designItem.deliverydate,i);
    //                   added = true;
    //                 }
    //               }
    //             });
    //             if (!added) {
    //               //debugger;
    //               this.sDatePassed(designItem.deliverydate,i);
    //               const listOfDesign = new DesginDataHelper();
    //               listOfDesign.date = this.datePipe.transform(designItem.deliverydate, 'M/dd/yy');
    //               listOfDesign.lateby = this.overdue;
    //               listOfDesign.listOfDesigns.push(designItem);
    //               tempData.push(listOfDesign);
    //               added = true;
    //             }
    //           }
    //         });
    //         this.listOfDesignsHelper = tempData.sort(function (a, b) {
    //           var dateA = new Date(a.date).getTime(),
    //             dateB = new Date(b.date).getTime();
    //           return dateB - dateA;
    //         });
    //         this.cdr.detectChanges();
    // }
    formatDesignData(records) {
        this.overdue = [];
        this.listOfDesigns = this.fillinDynamicData(records);
        console.log(this.listOfDesigns);
        const tempData = [];
        this.listOfDesigns.forEach((designItem, i) => {
            console.log(i);
            designItem.lateby = this.utils.getTheLatebyString(designItem.deliverydate);
            if (tempData.length === 0) {
                const listOfDesign = new DesginDataHelper();
                listOfDesign.date = this.datePipe.transform(designItem.updated_at, 'M/dd/yy');
                listOfDesign.listOfDesigns.push(designItem);
                tempData.push(listOfDesign);
                console.log(tempData);
                ;
            }
            else {
                let added = false;
                tempData.forEach((DesignList) => {
                    // DesignList['listOfDesigns'].forEach(element=>{
                    //   console.log(element.deliverydate,":::::::::::::");
                    //   this.sDatePassed(element.deliverydate);
                    // })
                    if (!added) {
                        if (DesignList.date === this.datePipe.transform(designItem.updated_at, 'M/dd/yy')) {
                            DesignList.listOfDesigns.push(designItem);
                            // this.sDatePassed(designItem.updated_at,i);
                            added = true;
                        }
                    }
                });
                if (!added) {
                    ;
                    // this.sDatePassed(designItem.updated_at,i);
                    const listOfDesign = new DesginDataHelper();
                    listOfDesign.date = this.datePipe.transform(designItem.updated_at, 'M/dd/yy');
                    listOfDesign.listOfDesigns.push(designItem);
                    tempData.push(listOfDesign);
                    added = true;
                }
            }
        });
        this.listOfDesignsHelper = tempData.sort(function (a, b) {
            var dateA = new Date(a.date).getTime(), dateB = new Date(b.date).getTime();
            return dateB - dateA;
        });
        this.cdr.detectChanges();
    }
    ngOnDestroy() {
        // this.refreshSubscription.unsubscribe();
        // this.routeSubscription.unsubscribe();
        this.dataRefreshSubscription.unsubscribe();
        this.PermitRefreshSubscription.unsubscribe();
        this.deactivateNetworkSwitch.unsubscribe();
        this.cdr.detach();
    }
    // filterData(records : DesginDataModel[]) {
    //   console.log(this.listOfDesignsData);
    //   this.listOfDesigns = this.fillinDynamicData(records);
    //   // let filterDataArray: any = this.listOfDesignsData.filter(x => x.id == serchTerm);
    //   const tempData: DesginDataHelper[] = [];
    //   this.listOfDesigns.forEach((desginItem) => {
    //     if (tempData.length === 0) {
    //       const listOfDesign = new DesginDataHelper();
    //       listOfDesign.date = this.datePipe.transform(desginItem.created_at, 'M/d/yy');
    //       listOfDesign.listOfDesigns.push(desginItem);
    //       tempData.push(listOfDesign);
    //     } else {
    //       let added = false;
    //       tempData.forEach((desginList) => {
    //         if (!added) {
    //           if (desginList.date === this.datePipe.transform(desginItem.created_at, 'M/d/yy')) {
    //             desginList.listOfDesigns.push(desginItem);
    //             added = true;
    //           }
    //         }
    //       });
    //       if (!added) {
    //         const listOfDesign = new DesginDataHelper();
    //         listOfDesign.date = this.datePipe.transform(desginItem.created_at, 'M/d/yy');
    //         listOfDesign.listOfDesigns.push(desginItem);
    //         tempData.push(listOfDesign);
    //         added = true;
    //         this.listOfDesignDataHelper.push(listOfDesign);
    //         console.log(this.listOfDesignDataHelper);
    //       }
    //     }
    //   });
    //   this.listOfDesignDataHelper = tempData;
    //   this.cdr.detectChanges();
    // }
    fillinDynamicData(records) {
        records.forEach((element) => {
            if (element.status != "delivered") {
                element.isoverdue = this.utils.isDatePassed(element.deliverydate);
            }
            else {
                element.isoverdue = false;
            }
            var reviewdate = new Date(element.reviewstarttime);
            reviewdate.setHours(reviewdate.getHours() + 2);
            element.reviewremainingtime = this.utils.getRemainingTime(reviewdate.toString());
            element.lateby = this.utils.getTheLatebyString(element.deliverydate);
            element.formattedjobtype = this.utils.getJobTypeName(element.jobtype);
            this.storage.get('' + element.id).then((data) => {
                console.log(data);
                if (data) {
                    element.totalpercent = data.currentprogress;
                }
                else {
                    element.totalpercent = 0;
                }
            });
        });
        return records;
    }
    // getDesign(event, showLoader: boolean) {
    //   this.listOfDesignsData = [];
    //   this.listOfDesignDataHelper = [];
    //   this.utils.showLoadingWithPullRefreshSupport(showLoader, 'Getting designs').then((success) => {
    //     // debugger;
    //     this.apiService.getDesignSurveys(this.segments).subscribe((response:any) => {
    //       this.utils.hideLoadingWithPullRefreshSupport(showLoader).then((loaderHidden) => {
    //         // debugger;
    //         if (event !== null) {
    //           event.target.complete();
    //         }
    //         console.log(response, '>>');
    //         this.listOfDesignsData = response;
    //          response.forEach(element => {
    //             this.roleType = element.type;
    //         });;
    //         console.log(this.roleType);
    //         const tempData: DesginDataHelper[] = [];
    //         this.listOfDesignsData.forEach((desginItem) => {
    //           if (tempData.length === 0) {
    //             const listOfDesign = new DesginDataHelper();
    //             listOfDesign.date = this.datePipe.transform(desginItem.created_at, 'M/d/yy');
    //             listOfDesign.listOfDesigns.push(desginItem);
    //             tempData.push(listOfDesign);
    //           } else {
    //             let added = false;
    //             tempData.forEach((desginList) => {
    //               if (!added) {
    //                 if (desginList.date === this.datePipe.transform(desginItem.created_at, 'M/d/yy')) {
    //                   desginList.listOfDesigns.push(desginItem);
    //                   added = true;
    //                 }
    //               }
    //             });
    //             if (!added) {
    //               const listOfDesign = new DesginDataHelper();
    //               listOfDesign.date = this.datePipe.transform(desginItem.created_at, 'M/d/yy');
    //               listOfDesign.listOfDesigns.push(desginItem);
    //               tempData.push(listOfDesign);
    //               added = true;
    //               this.listOfDesignDataHelper.push(listOfDesign);
    //               console.log(this.listOfDesignDataHelper,"<<<<>>>>");
    //             }
    //           }
    //         });
    //         this.listOfDesignDataHelper = tempData;
    //         this.cdr.detectChanges();
    //       },responseError=>{
    //         this.utils.hideLoadingWithPullRefreshSupport(showLoader).then((loaderHidden) => {
    //           if (event !== null) {
    //             event.target.complete();
    //           }
    //           const error: ErrorModel = responseError.error;
    //           this.utils.errorSnackBar(error.message[0].messages[0].message);
    //         });
    //       });
    //     }, responseError => {
    //       this.utils.hideLoadingWithPullRefreshSupport(showLoader).then((loaderHidden) => {
    //         if (event !== null) {
    //           event.target.complete();
    //         }
    //         const error: ErrorModel = responseError.error;
    //         this.utils.errorSnackBar(error.message);
    //       });
    //     });
    //   }, (apiError) => {
    //     this.utils.hideLoadingWithPullRefreshSupport(showLoader).then(() => {
    //       if (event !== null) {
    //         event.target.complete();
    //       }
    //     });
    //   });
    // }
    openAddressOnMap(address, event) {
        event.stopPropagation();
        this.launchNavigator.navigate(address, this.options);
    }
    dismissBottomSheet() {
        console.log('this', this.drawerState);
        this.drawerState = ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_8__["DrawerState"].Bottom;
        this.utils.setBottomBarHomepage(true);
    }
    assignToDesigner() {
        console.log(this.designerData.createdby.id);
        if (this.assignForm.status === 'INVALID') {
            this.utils.errorSnackBar('Please select a designer');
        }
        else {
            var designstarttime = new Date();
            var additonalhours = 0;
            if (this.designerData.requesttype == "permit") {
                additonalhours = this.selectedDesigner.jobcount * 2;
                designstarttime.setHours(designstarttime.getHours() + additonalhours);
            }
            else {
                additonalhours = this.selectedDesigner.jobcount * 6;
                designstarttime.setHours(designstarttime.getHours() + additonalhours);
            }
            var postData = {};
            if (this.designerData.createdby.id == this.userData.id) {
                if (this.selectedDesigner.company == this.userData.company) {
                    postData = {
                        designassignedto: this.selectedDesigner.id,
                        isoutsourced: "false",
                        status: "designassigned",
                        designstarttime: designstarttime
                    };
                }
                else {
                    postData = {
                        outsourcedto: this.selectedDesigner.id,
                        isoutsourced: "true",
                        status: "outsourced"
                    };
                }
            }
            else {
                postData = {
                    designassignedto: this.selectedDesigner.id,
                    status: "designassigned",
                    designstarttime: designstarttime
                };
            }
            this.utils.showLoading('Assigning').then(() => {
                this.apiService.updateDesignForm(postData, this.designId).subscribe((value) => {
                    this.utils.hideLoading().then(() => {
                        debugger;
                        console.log('reach ', value);
                        this.utils.showSnackBar('Design request has been assigned to' + ' ' + value.name + ' ' + 'successfully');
                        this.dismissBottomSheet();
                        this.showBottomDraw = false;
                        this.utils.setHomepageDesignRefresh(true);
                    });
                }, (error) => {
                    this.utils.hideLoading();
                    this.dismissBottomSheet();
                    this.showBottomDraw = false;
                });
            });
        }
    }
    openDesigners(id, designData) {
        console.log(designData);
        this.designerData = designData;
        if (this.listOfAssignees.length === 0) {
            this.utils.showLoading('Getting Designers').then(() => {
                this.apiService.getDesigners().subscribe(assignees => {
                    this.utils.hideLoading().then(() => {
                        this.listOfAssignees = [];
                        // this.listOfAssignees.push(this.utils.getDefaultAssignee(this.storage.getUserID()));
                        assignees.forEach(item => this.listOfAssignees.push(item));
                        console.log(this.listOfAssignees);
                        this.showBottomDraw = true;
                        this.designId = id;
                        this.utils.setBottomBarHomepage(false);
                        this.drawerState = ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_8__["DrawerState"].Docked;
                        this.assignForm.patchValue({
                            assignedto: 0
                        });
                    });
                }, (error) => {
                    this.utils.hideLoading().then(() => {
                        this.utils.errorSnackBar('Some error occurred. Please try again later');
                    });
                });
            });
        }
        else {
            this.designId = id;
            this.utils.setBottomBarHomepage(false);
            this.drawerState = ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_8__["DrawerState"].Docked;
            this.assignForm.patchValue({
                assignedto: 0
            });
        }
    }
    close() {
        if (this.showBottomDraw === true) {
            this.showBottomDraw = false;
            this.drawerState = ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_8__["DrawerState"].Bottom;
            this.utils.setBottomBarHomepage(true);
        }
        else {
            this.showBottomDraw = true;
        }
    }
    refreshDesigns(event) {
        let showLoader = true;
        if (event !== null && event !== undefined) {
            showLoader = false;
        }
        this.fetchPendingDesigns(event, showLoader);
    }
    accept(id, data) {
        let status = {
            status: data
        };
        this.apiService.updateDesignForm(status, id).subscribe((res) => {
            this.getDesigns(null);
        });
    }
    decline(id) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const modal = yield this.modalController.create({
                component: src_app_declinepage_declinepage_page__WEBPACK_IMPORTED_MODULE_13__["DeclinepagePage"],
                cssClass: 'my-custom-modal-css',
                componentProps: {
                    id: id
                },
            });
            modal.onDidDismiss().then((data) => {
                console.log(data);
                if (data.data.cancel == 'cancel') {
                }
                else {
                    this.getDesigns(null);
                }
            });
            // modal.dismiss(() => {
            //   debugger;
            //   this.getDesigns(null);
            // });
            return yield modal.present();
        });
    }
    sDatePassed(datestring, i) {
        var checkdate = moment__WEBPACK_IMPORTED_MODULE_14__(datestring, "YYYYMMDD");
        var todaydate = moment__WEBPACK_IMPORTED_MODULE_14__(new Date(), "YYYYMMDD");
        var lateby = todaydate.diff(checkdate, "days");
        this.overdue = lateby;
    }
    pending(value) {
        //debugger;
        if (this.userData.role.type == 'SuperAdmin') {
            value = "requesttype=permit&status=created&status=outsourced&status=requestaccepted&status=requestdeclined";
        }
        else {
            value = "requesttype=permit&status=created&status=outsourced&status=requestaccepted";
        }
    }
    getassignedata(asssignedata) {
        this.selectedDesigner = asssignedata;
    }
    gotoActivity(designData, event) {
        console.log(event);
        event.stopPropagation();
        this.router.navigate(['/activity' + '/' + designData.id + '/design']);
    }
    gotoDetails(designData, $event) {
        // $event.preventDefault();
        // $event.stopPropagation();
        this.router.navigate(['/design-details/' + designData.id]);
    }
    gotoChats(designData, event) {
        event.stopPropagation();
        this.router.navigate(['/chat/' + designData.chatid]);
    }
    shareWhatsapp(designData, event) {
        event.stopPropagation();
        this.socialsharing.share(designData.permitdesign.url);
    }
    doInfinite($event) {
        this.skip = this.skip + 10;
        this.apiService.getDesignSurveys(this.segments, this.limit, this.skip).subscribe((response) => {
            console.log(response);
            if (response.length) {
                this.formatDesignData(response);
            }
            else {
                this.noDesignsFound = "No Designs Found";
            }
            if (event !== null) {
                $event.target.complete();
            }
        }, (responseError) => {
            if (event !== null) {
                $event.target.complete();
            }
            const error = responseError.error;
            this.utils.errorSnackBar(error.message[0].messages[0].message);
        });
    }
    shareViaEmails(id, designData, event) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            event.stopPropagation();
            const modal = yield this.modalController.create({
                component: src_app_email_model_email_model_page__WEBPACK_IMPORTED_MODULE_18__["EmailModelPage"],
                cssClass: 'email-modal-css',
                componentProps: {
                    id: id,
                    designData: designData
                },
            });
            modal.onDidDismiss().then((data) => {
                console.log(data);
                if (data.data.cancel == 'cancel') {
                }
                else {
                    this.getDesigns(null);
                }
            });
            return yield modal.present();
        });
    }
    trackdesign(index, design) {
        return design.id;
    }
};
PermitdesignComponent.ctorParameters = () => [
    { type: src_app_utilities_service__WEBPACK_IMPORTED_MODULE_5__["UtilitiesService"] },
    { type: src_app_api_service__WEBPACK_IMPORTED_MODULE_4__["ApiService"] },
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_6__["DatePipe"] },
    { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_11__["Storage"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ChangeDetectorRef"] },
    { type: _ionic_native_launch_navigator_ngx__WEBPACK_IMPORTED_MODULE_7__["LaunchNavigator"] },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_9__["FormBuilder"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_10__["ActivatedRoute"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_10__["Router"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_12__["ModalController"] },
    { type: src_app_storage_service__WEBPACK_IMPORTED_MODULE_15__["StorageService"] },
    { type: src_app_networkdetect_service__WEBPACK_IMPORTED_MODULE_16__["NetworkdetectService"] },
    { type: _ionic_native_social_sharing_ngx__WEBPACK_IMPORTED_MODULE_17__["SocialSharing"] },
    { type: _ionic_native_in_app_browser_ngx__WEBPACK_IMPORTED_MODULE_20__["InAppBrowser"] },
    { type: _ionic_native_social_sharing_ngx__WEBPACK_IMPORTED_MODULE_17__["SocialSharing"] }
];
PermitdesignComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-permitdesign',
        template: _raw_loader_permitdesign_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_permitdesign_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], PermitdesignComponent);

class DesginDataHelper {
    constructor() {
        this.listOfDesigns = [];
    }
}


/***/ }),

/***/ "8Bcl":
/*!***********************************************************!*\
  !*** ./src/app/analystoverview/analystoverview.module.ts ***!
  \***********************************************************/
/*! exports provided: AnalystoverviewPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnalystoverviewPageModule", function() { return AnalystoverviewPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _analystoverview_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./analystoverview-routing.module */ "wt3f");
/* harmony import */ var _analystoverview_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./analystoverview.page */ "PJ6l");
/* harmony import */ var _survey_survey_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./survey/survey.component */ "huC7");
/* harmony import */ var _design_design_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./design/design.component */ "saI5");
/* harmony import */ var _ionic_native_diagnostic_ngx__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic-native/diagnostic/ngx */ "mtRb");
/* harmony import */ var _ionic_native_native_geocoder_ngx__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ionic-native/native-geocoder/ngx */ "h+qT");
/* harmony import */ var _ionic_native_launch_navigator_ngx__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ionic-native/launch-navigator/ngx */ "fGQ8");
/* harmony import */ var ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ion-bottom-drawer */ "rFvw");
/* harmony import */ var _utilities_utilities_module__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../utilities/utilities.module */ "egEE");
/* harmony import */ var _ionic_native_chooser_ngx__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @ionic-native/chooser/ngx */ "UWV4");
/* harmony import */ var _ionic_native_file_ngx__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @ionic-native/file/ngx */ "FAH8");
/* harmony import */ var _ionic_native_network_ngx__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @ionic-native/network/ngx */ "kwrG");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../shared/shared.module */ "PCNd");
/* harmony import */ var _permitdesign_permitdesign_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./permitdesign/permitdesign.component */ "+Z2m");



















let AnalystoverviewPageModule = class AnalystoverviewPageModule {
};
AnalystoverviewPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _analystoverview_routing_module__WEBPACK_IMPORTED_MODULE_5__["AnalystoverviewPageRoutingModule"],
            ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_12__["IonBottomDrawerModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
            _utilities_utilities_module__WEBPACK_IMPORTED_MODULE_13__["UtilitiesModule"],
            _shared_shared_module__WEBPACK_IMPORTED_MODULE_17__["SharedModule"]
        ],
        declarations: [_analystoverview_page__WEBPACK_IMPORTED_MODULE_6__["AnalystoverviewPage"], _survey_survey_component__WEBPACK_IMPORTED_MODULE_7__["SurveyComponent"], _design_design_component__WEBPACK_IMPORTED_MODULE_8__["DesignComponent"], _permitdesign_permitdesign_component__WEBPACK_IMPORTED_MODULE_18__["PermitdesignComponent"]],
        providers: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["DatePipe"],
            _ionic_native_diagnostic_ngx__WEBPACK_IMPORTED_MODULE_9__["Diagnostic"],
            _ionic_native_native_geocoder_ngx__WEBPACK_IMPORTED_MODULE_10__["NativeGeocoder"],
            _ionic_native_launch_navigator_ngx__WEBPACK_IMPORTED_MODULE_11__["LaunchNavigator"],
            _ionic_native_chooser_ngx__WEBPACK_IMPORTED_MODULE_14__["Chooser"],
            _ionic_native_file_ngx__WEBPACK_IMPORTED_MODULE_15__["File"],
            _ionic_native_network_ngx__WEBPACK_IMPORTED_MODULE_16__["Network"]
        ]
    })
], AnalystoverviewPageModule);



/***/ }),

/***/ "9Ftw":
/*!****************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/analystoverview/permitdesign/permitdesign.component.html ***!
  \****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\r\n\r\n  <!--<ion-segment scrollable (ionChange)=\"segmentChanged($event)\" value=\"requesttype=prelim&status=created&status=outsourced&status=requestaccepted\">-->\r\n    <ion-segment scrollable (ionChange)=\"segmentChanged($event)\" value=\"InReview\" mode=\"md\">\r\n     <!-- <ion-segment-button *ngIf=\"userData.role.type !=='SuperAdmin'\"  value=\"requesttype=prelim&status=created&status=outsourced&status=requestaccepted\">\r\n        <ion-label class=\"segment-btn\">Pending</ion-label>\r\n      </ion-segment-button>\r\n     <ion-segment-button value=\"requesttype=prelim&status=designassigned\">\r\n        <ion-label class=\"segment-btn\">In Designing</ion-label>\r\n      </ion-segment-button>\r\n      <ion-segment-button value=\"requesttype=prelim&status=designcompleted\">\r\n        <ion-label class=\"segment-btn\">Completed</ion-label>\r\n      </ion-segment-button>-->\r\n      <!--<ion-segment-button value=\"requesttype=prelim&status=reviewassigned&status=reviewfailed&status=reviewpassed\">-->\r\n        <ion-segment-button value=\"InReview\">\r\n        <ion-label class=\"segment-btn\"> In Review</ion-label>\r\n      </ion-segment-button>\r\n      <ion-segment-button value=\"delivered\">\r\n        <ion-label class=\"segment-btn\">Delivered Designs</ion-label>\r\n      </ion-segment-button>\r\n    </ion-segment>\r\n    <ion-content (click)=\"close()\" style=\"padding-bottom: 250px;\">\r\n    <ion-refresher slot=\"fixed\" (ionRefresh)=\"refreshDesigns($event)\">\r\n        <ion-refresher-content></ion-refresher-content>\r\n      </ion-refresher>\r\n\r\n\r\n      <ion-grid *ngIf=\"listOfDesignsHelper.length !== 0\">\r\n          <ion-row *ngFor=\"let item of listOfDesignsHelper;let i = index\">\r\n            <!-- <ion-virtual-scroll [items]=\"listOfDesignsHelper\"> -->\r\n                <!-- <ion-row *ngFor=\"let item of listOfDesignsHelper;let i = index\"> -->\r\n                    <!-- <ion-row *virtualItem=\"let item;let i = index\"> -->\r\n              <!-- <ion-col size=\"12\" class=\"ion-margin-top\">\r\n                      <span class=\"ion-padding\" *ngIf=\"today === item.date\">\r\n                          Today\r\n                          </span>\r\n                  <span class=\"ion-padding\" *ngIf=\"today !== item.date\">\r\n                              {{item.date | date: 'dd MMM yyyy'}}\r\n                      </span>\r\n              </ion-col> -->\r\n              <ion-col *ngFor=\"let designData of item.listOfDesigns;let j = index;trackBy: trackdesign \" size=\"12\">\r\n                  <ion-card class=\"ion-no-padding custom-card ion-no-margin\" style=\"height: 100%;\" (click)=\"gotoDetails(designData,$event)\">\r\n                      <p class=\"customer-name\"\r\n                      routerDirection=\"forward\">{{designData.name}}\r\n                      <!-- <span class=\"chipdetail\" style=\"background-color: #1289A7;\" [routerLink]=\"['/design-details/',designData.id]\" routerDirection=\"forward\">\r\n                        {{designData.deliverydate | date: 'hh:mm a'}}\r\n                    </span> -->\r\n\r\n                   <span fill=\"clear\" background-border=\"clear\" (click)=\"gotoActivity(designData,$event)\" class=\"imagebutton\"  size=\"small\"  ><ion-icon src=\"/assets/images/activitylist.png\" style=\"height: 20px;\" ></ion-icon></span>\r\n                   <ng-container *ngIf=\"designData?.chatid!==null && designData?.addedtogroupchat\">\r\n                    <span fill=\"clear\" background-border=\"clear\" (click)=\"gotoChats(designData,$event)\" class=\"chatbutton\"  size=\"small\"  ><img  style= \"height:20px\" src=\"assets/images/chat.svg\" /></span>\r\n                  </ng-container>\r\n            </p>\r\n            <p style=\"margin:0px\">\r\n                <span class=\"chipdetail\" style=\"background-color: rgb(246, 77, 10);\" *ngIf=\"designData.status == 'requestdeclined'\" >Declined</span>\r\n                <span class=\"chipdetail\" style=\"background-color: rgb(246, 104, 10);\" *ngIf=\"item.lateby > 0\">Overdue</span>\r\n                <span class=\"chipdetail\" style=\"background-color: rgb(109, 187, 26);\" *ngIf=\"designData.status == 'requestaccepted'\">Accepted</span>\r\n                <span class=\"chipdetail\" style=\"background-color: rgb(109, 187, 26); cursor: pointer;\" *ngIf=\"designData.status == 'delivered'\" [routerLink]=\"['/design-details/',designData.id]\">Delivered</span>\r\n                <span class=\"chipdetail\" style=\"background-color: rgb(109, 187, 26);\" *ngIf=\"designData.status == 'designcompleted'\" >Completed</span>\r\n                <span class=\"chipdetail\" style=\"background-color: #1289A7;;\" *ngIf=\"designData.status == 'created'\">Unassigned</span>\r\n                <span class=\"chipdetail\" style=\"background-color: #1289A7;;\" *ngIf=\"designData.status == 'designassigned'\" >Design Assigned</span>\r\n                <span class=\"chipdetail\" style=\"background-color: #1289A7;; cursor: pointer;\" *ngIf=\"designData.status == 'reviewassigned'\">In Review</span>\r\n                <span class=\"chipdetail\" *ngIf=\"designData.status == 'outsourced' && (userData.role.name=='ContractorAdmin' || userData.role.name=='ContractorSuperAdmin')\" style=\"background-color: #95afc0;\">Waiting for acceptance</span>\r\n                <span class=\"chipdetail\" style=\"background-color: rgb(109, 187, 26) ;\" *ngIf=\"designData.status == 'reviewpassed'\" >Review Passed</span>\r\n                <span class=\"chipdetail\" style=\"background-color: rgb(246, 77, 10) ;\" *ngIf=\"designData.status == 'reviewfailed'\" >Review Failed</span>\r\n                <span class=\"chipdetail\" style=\"background-color: rgb(183,21,64)\" *ngIf=\"designData.isinrevisionstate\" >Revision</span>\r\n                <span class=\"chipdetail ml-1 ml-1\" style=\"background-color: #FA983A;\"\r\n                *ngIf=\"designData.isoutsourced == 'true'\">Wattmonk</span>\r\n            </p>\r\n\r\n            <p style=\"margin:0px\">\r\n                <span class=\"customer-email\" \r\n                        routerDirection=\"forward\">{{designData.email}}</span>\r\n                        <span *ngIf=\"item.lateby > 1\" class=\"latebystyle\"><strong>Late by {{item.lateby}} days</strong></span>\r\n                        <span *ngIf=\"item.lateby == 1\" class=\"latebystyle\"><strong>Late by a day</strong></span>\r\n            </p>\r\n                      <a href=\"tel:{{designData.phonenumber}}\" style=\"text-decoration: none;\" class=\"z-100\">\r\n                          <span class=\"customer-phone\">{{designData.phonenumber}}</span></a>\r\n                      <span class=\"customer-address z-100\"\r\n                              (click)=\"openAddressOnMap(designData.address,$event)\">{{(designData.address | slice:0:60) + (designData.address.length > 60 ? '...' : '')}}</span>\r\n\r\n                      <ion-row style=\"margin-bottom: 8px;\">\r\n                          <!-- <span class=\"chipdetail\" style=\"background-color: #95afc0; cursor: pointer;\" >Wattmonk</span> -->\r\n                          <ion-col>\r\n                          <span class=\"chipdetail\" style=\"background-color: #95afc0; cursor: pointer;\" >{{designData?.source}}</span></ion-col>\r\n                          <ion-col *ngIf=\"designData.status == 'reviewassigned'\" style=\"color: #737373; font-size: 14px;\">\r\n                            <span style=\"float: right;\">{{designData?.reviewremainingtime}}</span>\r\n                          </ion-col>\r\n                      </ion-row>\r\n\r\n\r\n\r\n                      <ion-row class=\"ion-no-margin ion-no-margin\">\r\n                      <ion-col *ngIf=\"segments=='requesttype=permit&status=delivered'\">\r\n                        <span  style=\"float:right !important;\" class=\"ion-text-end action-button-color\" (click)=\"shareWhatsapp(designData,$event)\">\r\n                            <ion-icon name=\"share-social-outline\"></ion-icon></span>&nbsp;\r\n                        <span style=\"float:right !important;margin-right: 8px;\" class=\"ion-text-end action-button-color\" (click)=\"shareViaEmails(designData.id,designData,$event)\">\r\n                            <ion-icon name=\"mail\" ></ion-icon></span>\r\n                    </ion-col></ion-row>\r\n                  <!-- <ion-row class=\"ion-no-margin ion-no-margin\">\r\n                          <ion-col *ngIf=\"segments=='requesttype=prelim&status=created&status=outsourced&status=requestaccepted'\">\r\n                              <span *ngIf=\"designData.status == 'created' || designData.status == 'requestaccepted'\" style=\"float:right !important;\" class=\"ion-text-end action-button-color\" (click)=\"openDesigners(designData.id,designData)\"\r\n                              >Assign</span>\r\n                              <span style=\"float: right;\">\r\n\r\n                                  <ion-col size=\"8\"  *ngIf=\"designData.status == 'outsourced'\"  class=\"ion-text-end action-button-color\" (click)=\"accept(designData.id,'requestaccepted')\">\r\n                                     Accept\r\n                                  </ion-col>\r\n                                  <ion-col size=\"4\" *ngIf=\"designData.status == 'outsourced'\"  class=\"ion-text-end action-button-color\" (click)=\"decline(designData.id)\">\r\n                                  Decline\r\n                                  </ion-col>\r\n                              </span>\r\n\r\n                              <span *ngIf=\"designData.status == 'requestdeclined'\"style=\"float:right !important;\" class=\"ion-text-end action-button-color\" (click)=\"openDesigners(designData.id)\"\r\n                              >Reassign</span>\r\n                          </ion-col>\r\n\r\n\r\n                          <ion-col *ngIf=\"segments=='requesttype=prelim&status=designcompleted'\">\r\n                              <span  style=\"float:right !important;\" class=\"ion-text-end action-button-color\" (click)=\"openDesigners(designData.id)\"\r\n                              >Assign Review</span>\r\n                          </ion-col>\r\n                          <ion-col *ngIf=\"segments=='requesttype=prelim&status=designassigned'\">\r\n                              <span *ngIf=\"designData.status == 'reviewpassed'\" style=\"float:right !important;\" class=\"ion-text-end action-button-color\" (click)=\"openDesigners(designData.id)\"\r\n                              >Deliver</span>\r\n                          </ion-col>-->\r\n                          <!-- <ion-col class=\"ion-no-margin ion-no-padding\">\r\n                              <ion-button class=\"ion-no-margin ion-no-padding\" fill=\"clear\" [routerLink]=\"['/surveyprocess/' + designData.id + '/' + designData.jobtype + '/' + designData.latitude + '/' + designData.longitude]\"\r\n                              routerDirection=\"forward\">\r\n                                  Restart Survey\r\n                              </ion-button>\r\n                          </ion-col> -->\r\n                     <!-- </ion-row>-->\r\n                      <!-- <ion-progress-bar [value]=\"1\" mode=\"ios\" color=\"success\" class=\"progress-bar-height\"></ion-progress-bar> -->\r\n                        <!-- <span class=\"ion-text-end timestamp\" [routerLink]=\"['/design-details/',designData.id]\" routerDirection=\"forward\">\r\n                              {{designData.deliverydate | date: 'hh:mm a'}}\r\n                         <ion-col *ngIf=\"segments=='requesttype=prelim&status=delivered'\">\r\n                                <span  style=\"float:right !important;\" class=\"ion-text-end action-button-color\" (click)=\"shareWhatsapp(designData)\">\r\n                                    <ion-icon name=\"share-social-outline\"></ion-icon></span>&nbsp;\r\n                                    <ion-icon name=\"mail\" ></ion-icon></span>\r\n                            </ion-col>\r\n                  </span> -->\r\n               <!--   <ion-col *ngIf=\"requesttype=prelim&status=delivered\">\r\n                    <span  style=\"float:right !important;\" class=\"ion-text-end action-button-color\" (click)=\"shareWhatsapp()\">\r\n                    <ion-icon name=\"logo-whatsapp\"></ion-icon></span>\r\n                </ion-col>-->\r\n                </ion-card>\r\n              </ion-col>\r\n          </ion-row>\r\n          <!-- </ion-virtual-scroll>\r\n          <ion-row>\r\n              <ion-col size=\"12\" style=\"height: 100px;\">\r\n\r\n              </ion-col>\r\n          </ion-row> -->\r\n      </ion-grid>\r\n\r\n      <div *ngIf=\"listOfDesignsHelper.length === 0 \" class=\"h-100 d-flex flex-column align-center justify-center\">\r\n              <!-- <div *ngIf=\"!netSwitch\">\r\n                  No internet Connection\r\n              </div> -->\r\n             {{noDesignsFound}}\r\n\r\n          <ion-img src=\"/assets/images/blank.png\" class=\"placeholder\"></ion-img>\r\n      </div>\r\n\r\n\r\n      <ion-infinite-scroll (ionInfinite)=\"doInfinite($event)\">\r\n        <ion-infinite-scroll-content\r\n          loadingSpinner=\"bubbles\"\r\n          >\r\n        </ion-infinite-scroll-content>\r\n      </ion-infinite-scroll>\r\n\r\n</ion-content>\r\n\r\n<ion-bottom-drawer [(state)]=\"drawerState\" [minimumHeight]=\"0\" [dockedHeight]=\"320\" [draggable]=\"false\" [disableDrag]=\"true\"\r\n                 [shouldBounce]=\"true\" [distanceTop]=\"0\" class=\"drawer\" style=\"z-index: 9999 !important;\">\r\n  <form [formGroup]=\"assignForm\">\r\n      <ion-grid class=\"drawer\">\r\n          <ion-row>\r\n              <ion-col size=\"12\">\r\n                  <app-user-selector (assigneeData)=getassignedata($event) placeholder=\"Assign\" [assignees]=\"listOfAssignees\"\r\n                                     formControlName=\"assignedto\"></app-user-selector>\r\n              </ion-col>\r\n          </ion-row>\r\n          <ion-row style=\"margin-left: 8px;\">\r\n              <ion-col size=\"12\">\r\n                  <span class=\"input-placeholder\">comments</span>\r\n              </ion-col>\r\n              <ion-col size=\"12\" style=\"padding-top: 0px;\">\r\n                  <ion-textarea style=\"max-width: 98%;\" class=\"ion-no-margin ion-no-padding comment_box\" rows=\"3\"\r\n                                formControlName=\"comment\"></ion-textarea>\r\n              </ion-col>\r\n          </ion-row>\r\n          <ion-row style=\"justify-content: flex-end;\">\r\n              <ion-col size=\"auto\" style=\"padding-top: 0px; margin-right: 6px;\">\r\n                  <ion-button class=\"buttom-drawer-button\" fill=\"clear\" (click)=\"assignToDesigner()\">\r\n                      Confirm\r\n                  </ion-button>\r\n              </ion-col>\r\n              <ion-col size=\"auto\">\r\n                  <ion-button class=\"buttom-drawer-button-cancel\" fill=\"clear\" (click)=\"dismissBottomSheet()\">\r\n                      Cancel\r\n                  </ion-button>\r\n              </ion-col>\r\n          </ion-row>\r\n      </ion-grid>\r\n  </form>\r\n\r\n</ion-bottom-drawer>\r\n");

/***/ }),

/***/ "G7uj":
/*!**************************************************************!*\
  !*** ./src/app/analystoverview/survey/survey.component.scss ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".custom-card {\n  display: flex;\n  flex-direction: column;\n  background: white;\n  border-radius: 4px !important;\n  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.3) !important;\n  padding: 8px 12px;\n}\n\n.customer-name {\n  font-size: 1em;\n  color: #434343;\n  font-weight: bold;\n  display: table;\n  margin: 0px;\n}\n\n.customer-email {\n  font-size: 0.8em;\n  color: #B4B4B4;\n}\n\n.customer-phone {\n  font-size: 0.8em;\n  color: #4272B9;\n}\n\n.customer-address {\n  margin-top: 16px;\n  margin-bottom: 16px;\n  font-size: 0.8em;\n  color: #4272B9;\n}\n\n.timestamp {\n  font-size: 0.7em;\n}\n\n.chipdetail {\n  display: inline;\n  vertical-align: middle;\n  background-color: #95afc0;\n  font-size: 0.6em;\n  padding: 4px 10px;\n  border-radius: 10px;\n  text-align: center;\n  color: #fff;\n}\n\n.segment-btn {\n  font-size: 10px !important;\n  position: absolute;\n}\n\n.latebystyle {\n  float: right;\n  font-size: 10px;\n  color: #3C78DB;\n  text-align: right;\n}\n\n.imagebutton {\n  float: right;\n  margin-top: 0px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFxzdXJ2ZXkuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxpQkFBQTtFQUNBLDZCQUFBO0VBQ0EscURBQUE7RUFDQSxpQkFBQTtBQUNKOztBQUVFO0VBQ0UsY0FBQTtFQUNBLGNBQUE7RUFDQSxpQkFBQTtFQUNBLGNBQUE7RUFDQSxXQUFBO0FBQ0o7O0FBRUU7RUFDRSxnQkFBQTtFQUNBLGNBQUE7QUFDSjs7QUFFRTtFQUNFLGdCQUFBO0VBQ0EsY0FBQTtBQUNKOztBQUVFO0VBQ0UsZ0JBQUE7RUFDQSxtQkFBQTtFQUNBLGdCQUFBO0VBQ0EsY0FBQTtBQUNKOztBQU1FO0VBQ0UsZ0JBQUE7QUFISjs7QUFNRTtFQUNFLGVBQUE7RUFDQSxzQkFBQTtFQUNBLHlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxpQkFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxXQUFBO0FBSEo7O0FBTUU7RUFDRSwwQkFBQTtFQUNBLGtCQUFBO0FBSEo7O0FBTUU7RUFDRSxZQUFBO0VBQ0EsZUFBQTtFQUNBLGNBQUE7RUFDQSxpQkFBQTtBQUhKOztBQU1FO0VBQ0UsWUFBQTtFQUNBLGVBQUE7QUFISiIsImZpbGUiOiJzdXJ2ZXkuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuY3VzdG9tLWNhcmQge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcclxuICAgIGJvcmRlci1yYWRpdXM6IDRweCAhaW1wb3J0YW50O1xyXG4gICAgYm94LXNoYWRvdzogMCAxcHggMnB4IDAgcmdiYSgwLCAwLCAwLCAwLjMpICFpbXBvcnRhbnQ7XHJcbiAgICBwYWRkaW5nOiA4cHggMTJweDtcclxuICB9XHJcbiAgXHJcbiAgLmN1c3RvbWVyLW5hbWUge1xyXG4gICAgZm9udC1zaXplOiAxZW07XHJcbiAgICBjb2xvcjogIzQzNDM0MztcclxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gICAgZGlzcGxheTp0YWJsZTtcclxuICAgIG1hcmdpbjogMHB4O1xyXG4gIH1cclxuICBcclxuICAuY3VzdG9tZXItZW1haWwge1xyXG4gICAgZm9udC1zaXplOiAwLjhlbTtcclxuICAgIGNvbG9yOiAjQjRCNEI0O1xyXG4gIH1cclxuICBcclxuICAuY3VzdG9tZXItcGhvbmUge1xyXG4gICAgZm9udC1zaXplOiAwLjhlbTtcclxuICAgIGNvbG9yOiAjNDI3MkI5O1xyXG4gIH1cclxuICBcclxuICAuY3VzdG9tZXItYWRkcmVzcyB7XHJcbiAgICBtYXJnaW4tdG9wOiAxNnB4O1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMTZweDtcclxuICAgIGZvbnQtc2l6ZTogMC44ZW07XHJcbiAgICBjb2xvcjogIzQyNzJCOTtcclxuICB9XHJcbiAgXHJcbiAgLnBsYWNlaG9sZGVyIHtcclxuICAgIC8vd2lkdGg6IDUwdncgIWltcG9ydGFudDtcclxuICB9XHJcbiAgXHJcbiAgLnRpbWVzdGFtcCB7XHJcbiAgICBmb250LXNpemU6IDAuN2VtO1xyXG4gIH1cclxuICBcclxuICAuY2hpcGRldGFpbHtcclxuICAgIGRpc3BsYXk6IGlubGluZTtcclxuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjOTVhZmMwO1xyXG4gICAgZm9udC1zaXplOiAwLjZlbTtcclxuICAgIHBhZGRpbmc6IDRweCAxMHB4O1xyXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIGNvbG9yOiAjZmZmO1xyXG4gIH1cclxuICBcclxuICAuc2VnbWVudC1idG57XHJcbiAgICBmb250LXNpemU6IDEwcHggIWltcG9ydGFudDtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICB9XHJcbiAgXHJcbiAgLmxhdGVieXN0eWxle1xyXG4gICAgZmxvYXQ6IHJpZ2h0OyBcclxuICAgIGZvbnQtc2l6ZTogMTBweDtcclxuICAgIGNvbG9yOiAjM0M3OERCO1xyXG4gICAgdGV4dC1hbGlnbjogcmlnaHQ7XHJcbiAgfVxyXG4gIFxyXG4gIC5pbWFnZWJ1dHRvbntcclxuICAgIGZsb2F0OnJpZ2h0O1xyXG4gICAgbWFyZ2luLXRvcDogMHB4O1xyXG4gICAgXHJcbiAgICBcclxuICB9Il19 */");

/***/ }),

/***/ "M5GZ":
/*!*************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/analystoverview/analystoverview.page.html ***!
  \*************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-content style=\"position: relative;\">\r\n  <!-- <ion-header class=\"ion-no-border white-bg\" style=\"position: relative;\">\r\n      <ion-toolbar> -->\r\n  <ion-grid>\r\n      <ion-row class=\"ion-align-items-center\">\r\n          <ion-toolbar>\r\n            <ion-buttons slot=\"start\">\r\n                <ion-menu-button></ion-menu-button>\r\n              </ion-buttons>\r\n              <ion-row class=\"ion-align-items-center\">\r\n          <ion-col *ngIf=\"showHome === true\">\r\n              <h1 class=\"ion-no-padding ion-no-margin home\" *ngIf=\"route.url=='/analystoverview/permitdesign'\">Permit</h1>\r\n              <h1 class=\"ion-no-padding ion-no-margin home\" *ngIf=\"route.url=='/analystoverview/design'\">Prelim</h1>\r\n              <h1 class=\"ion-no-padding ion-no-margin home\" *ngIf=\"route.url=='/analystoverview/survey'\">Survey</h1>\r\n          </ion-col>\r\n          <!-- <ion-col *ngIf=\"showSearchBar === true\" >\r\n              <ion-searchbar debounce=\"0\" placeholder=\"home\" class=\"custom\"></ion-searchbar>\r\n          </ion-col> -->\r\n          <ion-col size=\"auto\" *ngIf=\"showHome === true\">\r\n              <div class=\"notification-padding\" (click)=\"searchbar()\">\r\n                  <ion-img src=\"/assets/images/icons8-search.svg\" class=\"notification-icon\"></ion-img>\r\n              </div>\r\n          </ion-col>\r\n          <ion-col size=\"auto\" style=\"position: relative;\">\r\n              <div class=\"notification-padding\" [routerLink]=\"['/notification']\" routerDirection=\"forward\"  (click)=\"setzero()\">\r\n                  <ion-img src=\"/assets/images/notification.svg\" class=\"notification-icon\"></ion-img>\r\n                  <span class=\"badge\" *ngIf=\"unreadCount > 0\">\r\n                    {{unreadCount}}\r\n                          </span>\r\n                          \r\n              </div>\r\n          </ion-col></ion-row>\r\n        </ion-toolbar>\r\n        </ion-row>\r\n    </ion-grid>\r\n\r\n  <!-- </ion-toolbar> -->\r\n  <!-- </ion-header> -->\r\n  <ion-tabs style=\"margin-top: 52px;\">\r\n    <!--  <ion-tab-bar slot=\"top\" class=\"ion-no-border\">\r\n          <ion-tab-button tab=\"design\" *ngIf=\"isUserAnalyst\">\r\n              <ion-label>Designs</ion-label>\r\n          </ion-tab-button>\r\n          <ion-tab-button tab=\"survey\" *ngIf=\"isUserAnalyst\">\r\n              <ion-label>Surveys</ion-label>\r\n          </ion-tab-button>\r\n      </ion-tab-bar>-->\r\n  </ion-tabs>\r\n\r\n  <!-- <ion-tabs style=\"margin-top: 20%;\">\r\n      <ion-tab-bar slot=\"top\">\r\n        <ion-tab-button tab=\"pending\">\r\n          <ion-label>Pending</ion-label>\r\n        </ion-tab-button>\r\n        <ion-tab-button tab=\"completed\">\r\n          <ion-label>Completed</ion-label>\r\n        </ion-tab-button>\r\n        <ion-tab-button tab=\"inreview\">\r\n          <ion-label>Review</ion-label>\r\n        </ion-tab-button>\r\n        <ion-tab-button tab=\"delivered\">\r\n          <ion-label>Delivered</ion-label>\r\n        </ion-tab-button>\r\n      </ion-tab-bar>\r\n    </ion-tabs> -->\r\n\r\n  <ion-grid style=\"position: absolute;\">\r\n      <div class=\"searchbar_div\">\r\n          <ion-grid *ngIf=\"searchDesginItem && searchDesginItem.length !== 0\">\r\n              <ion-row *ngFor=\"let searchitem of searchDesginItem;\" (click)=\"getdesigndata(searchitem)\">\r\n                  <ion-col size=\"2\">\r\n                      <ion-img class=\"profile-icon\" src=\"/assets/images/icons8-checked.svg\"></ion-img>\r\n                  </ion-col>\r\n                  <ion-col size=\"10\" style=\"margin-top: 6px;\">\r\n                      <div style=\"display: flex; justify-content: space-between;\">\r\n                          <span class=\"history-name\">{{searchitem.name}}</span>\r\n                          <span class=\"history-add\">{{searchitem.created_at | date:'dd/MM/yyyy'}}</span>\r\n                      </div>\r\n                      <div>\r\n                            <span class=\"history-add\">\r\n                              {{searchitem.address}}\r\n                            </span>\r\n                      </div>\r\n                      <!-- <div>\r\n                            <span class=\"assign\">\r\n                             desgined assign to.....\r\n                            </span>\r\n                      </div> -->\r\n                  </ion-col>\r\n              </ion-row>\r\n          </ion-grid>\r\n          <ion-grid *ngIf=\"(searchSurveyItem && searchSurveyItem.length !== 0)\">\r\n              <ion-row *ngFor=\"let searchitem of searchSurveyItem\" (click)=\"getdesigndata(searchitem)\">\r\n                  <ion-col size=\"2\">\r\n                      <ion-img class=\"profile-icon\" src=\"/assets/images/icons8-checked.svg\"></ion-img>\r\n                  </ion-col>\r\n                  <ion-col size=\"10\" style=\"margin-top: 6px;\">\r\n                      <div style=\"display: flex; justify-content: space-between;\">\r\n                          <span class=\"history-name\">{{searchitem.name}}</span>\r\n                          <span class=\"history-add\">{{searchitem.created_at | date:'dd/MM/yyyy'}}</span>\r\n                      </div>\r\n                      <div>\r\n                            <span class=\"history-add\">\r\n                              {{searchitem.address}}\r\n                            </span>\r\n                      </div>\r\n                      <!-- <div>\r\n                            <span class=\"assign\">\r\n                             desgined assign to.....\r\n                            </span>\r\n                      </div> -->\r\n                  </ion-col>\r\n              </ion-row>\r\n          </ion-grid>\r\n      </div>\r\n      <div class=\"searchbar_div nodata_div\">\r\n          <ng-template #noDesignandSurvey>\r\n              <ion-grid\r\n                      *ngIf=\"searchbarElement !== '' && (searchSurveyItem && searchSurveyItem.length === 0) && (searchDesginItem && searchDesginItem.length === 0)\">\r\n                  <div class=\"h-100 d-flex flex-column align-center justify-center\">\r\n                      <span>No design or survey found</span>\r\n                  </div>\r\n              </ion-grid>\r\n          </ng-template>\r\n      </div>\r\n  </ion-grid>\r\n\r\n</ion-content>\r\n<ion-tabs style=\"margin-top: 52px;\">\r\n    <!-- <ion-tab-bar slot=\"top\" class=\"ion-no-border\">\r\n        <ion-tab-button tab=\"design\" *ngIf=\"isUserAnalyst\">\r\n            <ion-label>Designs</ion-label>\r\n        </ion-tab-button>\r\n        <ion-tab-button tab=\"survey\" *ngIf=\"isUserAnalyst\">\r\n            <ion-label>Surveys</ion-label>\r\n        </ion-tab-button>\r\n    </ion-tab-bar> -->\r\n</ion-tabs>\r\n\r\n<!-- <ion-footer class=\"ion-no-border white-bg\" *ngIf=\"showFooter\">\r\n  <div class=\"position-relative\">\r\n\r\n      <ion-grid class=\"bottom-bar ion-no-margin ion-no-padding\">\r\n          <ion-row>\r\n              <ion-col size=\"6\" [routerLink]=\"['/analystoverview/design']\">\r\n                  <div class=\"tab\"  style=\"cursor: pointer;\">\r\n                      <ion-img src=\"/assets/images/home-outline.svg\" class=\"tab-icon\"></ion-img>\r\n                      <span class=\"tabText\">Home</span>\r\n                  </div>\r\n              </ion-col>\r\n\r\n              <ion-col size=\"6\" [routerLink]=\"['/profile']\" routerDirection=\"forward\">\r\n                  <div class=\"tab\" style=\"cursor:pointer\">\r\n                      <ion-img src=\"/assets/images/account-outline.svg\" class=\"tab-icon\"></ion-img>\r\n                      <span class=\"tabText\">Profile</span>\r\n                  </div>\r\n              </ion-col>\r\n          </ion-row>\r\n      </ion-grid>\r\n  </div>\r\n\r\n</ion-footer> -->\r\n");

/***/ }),

/***/ "PJ6l":
/*!*********************************************************!*\
  !*** ./src/app/analystoverview/analystoverview.page.ts ***!
  \*********************************************************/
/*! exports provided: AnalystoverviewPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnalystoverviewPage", function() { return AnalystoverviewPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_analystoverview_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./analystoverview.page.html */ "M5GZ");
/* harmony import */ var _analystoverview_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./analystoverview.page.scss */ "vjfi");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _utilities_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utilities.service */ "oTnF");
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../api.service */ "yTNM");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _storage_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../storage.service */ "qkCY");
/* harmony import */ var _ionic_native_diagnostic_ngx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic-native/diagnostic/ngx */ "mtRb");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _ionic_native_geolocation_ngx__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ionic-native/geolocation/ngx */ "Bfh1");
/* harmony import */ var _ionic_native_native_geocoder_ngx__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ionic-native/native-geocoder/ngx */ "h+qT");
/* harmony import */ var ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ion-bottom-drawer */ "rFvw");
/* harmony import */ var _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @cometchat-pro/cordova-ionic-chat */ "ujHh");
/* harmony import */ var _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _contants__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../contants */ "6qqZ");
/* harmony import */ var _networkdetect_service__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../networkdetect.service */ "UZ2B");
/* harmony import */ var _ionic_native_in_app_browser_ngx__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @ionic-native/in-app-browser/ngx */ "m/P+");


















let AnalystoverviewPage = class AnalystoverviewPage {
    constructor(utilities, apiService, nativeGeocoder, platform, datePipe, storage, diagnostic, alertController, geolocation, toastController, route, network, iab) {
        this.utilities = utilities;
        this.apiService = apiService;
        this.nativeGeocoder = nativeGeocoder;
        this.platform = platform;
        this.datePipe = datePipe;
        this.storage = storage;
        this.diagnostic = diagnostic;
        this.alertController = alertController;
        this.geolocation = geolocation;
        this.toastController = toastController;
        this.route = route;
        this.network = network;
        this.iab = iab;
        this.version = _contants__WEBPACK_IMPORTED_MODULE_15__["version"];
        this.ionInput = new _angular_core__WEBPACK_IMPORTED_MODULE_3__["EventEmitter"]();
        this.searchQuery = '';
        this.searchbarElement = '';
        //isUserSurveyor = false ;
        //isUserDesigner= false ;
        //isUserAnalyst = false;
        this.showSearchBar = false;
        this.showHome = true;
        this.showFooter = true;
        // Geocoder configuration
        this.geoEncoderOptions = {
            useLocale: true,
            maxResults: 5
        };
        this.searchDesginItem = [];
        this.searchSurveyItem = [];
        this.drawerState = ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_12__["DrawerState"].Docked;
    }
    getNotificationCount() {
        this.apiService.getCountOfUnreadNotifications().subscribe((count) => {
            console.log("count", count);
            this.unreadCount = count;
        });
    }
    ngOnInit() {
        this.userData = this.storage.getUser();
        this.apiService.emitUserNameAndRole(this.userData);
        this.getNotificationCount();
        this.setupCometChat();
        this.requestLocationPermission();
        this.updateUserPushToken();
        this.route.navigate(['analystoverview/permitdesign']);
        this.subscription = this.utilities.getBottomBarHomepage().subscribe((value) => {
            this.showFooter = value;
        });
        //  this.isUserAnalyst = true;
        //  // this.isUserSurveyor = true;
        //   //this.isUserDesigner = true;
    }
    updateUserPushToken() {
        this.apiService.pushtoken(this.storage.getUserID(), { "newpushtoken": localStorage.getItem("pushtoken") }).subscribe((data) => {
        }, (error) => {
        });
    }
    setzero() {
        this.unreadCount = 0;
    }
    ngOnDestroy() {
        // this.subscription.unsubscribe();
        this.deacctivateNetworkSwitch.unsubscribe();
    }
    initializeItems() {
        this.items = [
            'Amsterdam',
            'Bogota'
        ];
    }
    setupCometChat() {
        let userId = this.storage.getUserID();
        const user = new _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_13__["CometChat"].User(userId);
        user.setName(this.storage.getUser().firstname + ' ' + this.storage.getUser().lastname);
        const appSetting = new _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_13__["CometChat"].AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(_contants__WEBPACK_IMPORTED_MODULE_15__["COMETCHAT_CONSTANTS"].REGION).build();
        _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_13__["CometChat"].init(_contants__WEBPACK_IMPORTED_MODULE_15__["COMETCHAT_CONSTANTS"].APP_ID, appSetting).then(() => {
            console.log('Initialization completed successfully');
            // if(this.utilities.currentUserValue != null){
            // You can now call login function.
            _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_13__["CometChat"].login(userId, _contants__WEBPACK_IMPORTED_MODULE_15__["COMETCHAT_CONSTANTS"].API_KEY).then((user) => {
                console.log('Login Successful:', { user });
            }, error => {
                console.log('Login failed with exception:', { error });
            });
            // }
        }, error => {
            console.log('Initialization failed with error:', error);
        });
    }
    getItems(ev) {
        // Reset items back to all of the items
        this.initializeItems();
        // set val to the value of the searchbar
        const val = ev.target.value;
        // if the value is an empty string don't filter the items
        if (val && val.trim() !== '') {
            this.items = this.items.filter((item) => {
                return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }
    }
    searchDesginAndSurvey(event) {
        console.log(event, this.searchbarElement);
        if (this.searchbarElement !== '') {
            this.apiService.searchAllDesgin(this.searchbarElement).subscribe((searchModel) => {
                // console.log(searchModel);
                this.searchDesginItem = [];
                this.searchSurveyItem = [];
                if (event.target.value !== '') {
                    searchModel.filter((element) => {
                        if (element.type == 'design') {
                            this.searchDesginItem = searchModel;
                            // console.log(this.searchDesginItem);
                        }
                        else {
                            this.searchSurveyItem = searchModel;
                        }
                    });
                    console.log(this.searchDesginItem);
                }
                else {
                    this.searchDesginItem = [];
                    this.searchSurveyItem = [];
                }
            }, (error) => {
                console.log(error);
            });
        }
        else {
            this.route.navigate(['homepage/design']);
        }
    }
    getdesigndata(serchTermData = { 'type': '' }) {
        console.log(serchTermData.name);
        this.name = serchTermData.name;
        this.searchbarElement = this.name;
        if (serchTermData.type == 'design') {
            this.route.navigate(['homepage/design'], { queryParams: { serchTerm: serchTermData.id } });
        }
        else if (serchTermData.type == 'survey') {
            this.route.navigate(['homepage/survey'], { queryParams: { serchTerm: serchTermData.id } });
        }
        else {
            this.route.navigate(['homepage/design']);
        }
        this.searchDesginItem = [];
        this.searchSurveyItem = [];
    }
    searchbar() {
        this.route.navigate(['/search-bar1']);
    }
    requestLocationPermission() {
        this.platform.ready().then(() => {
            this.diagnostic.requestLocationAuthorization(this.diagnostic.locationAuthorizationMode.WHEN_IN_USE).then((mode) => {
                console.log(mode);
                switch (mode) {
                    case this.diagnostic.permissionStatus.NOT_REQUESTED:
                        // this.goBack();
                        break;
                    case this.diagnostic.permissionStatus.DENIED_ALWAYS:
                        this.showLocationDenied();
                        break;
                    case this.diagnostic.permissionStatus.DENIED_ONCE:
                        // this.goBack();
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
            });
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
                        }
                    }
                ]
            });
            toast.present();
        });
    }
    fetchLocation() {
        this.diagnostic.isGpsLocationEnabled().then((status) => {
            if (status === true) {
                // this.utilities.showLoading('Getting Location').then(() => {
                this.getGeoLocation();
                // });
            }
            else {
                this.askToChangeSettings();
            }
        });
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
                        }
                    }
                ]
            });
            toast.present();
        });
    }
    getGeoLocation() {
        this.geolocation.getCurrentPosition().then((resp) => {
            console.log('resp', resp);
            this.getGeoEncoder(resp.coords.latitude, resp.coords.longitude);
        }).catch((error) => {
            this.utilities.errorSnackBar('Unable to get location');
            console.log('Error getting location', error);
            this.showNoLocation();
        });
    }
    getGeoEncoder(latitude, longitude) {
        // this.utilities.hideLoading().then((success) => {
        this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geoEncoderOptions)
            .then((result) => {
            console.log('resu', result);
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
            alert('Error getting location' + JSON.stringify(error));
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
    changeLocationSettings() {
        this.diagnostic.switchToLocationSettings();
        this.diagnostic.registerLocationStateChangeHandler((state) => {
            console.log(state);
            if ((this.platform.is('android') && state !== this.diagnostic.locationMode.LOCATION_OFF)) {
                this.checkLocationAccess();
            }
        });
    }
    checkLocationAccess() {
        console.log('Getting location');
        this.diagnostic.isLocationAuthorized().then((success) => {
            this.fetchLocation();
        }, (error) => {
            this.utilities.errorSnackBar('GPS Not Allowed');
        });
    }
    showNoLocation() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                header: 'Error',
                subHeader: 'Unable to get location',
                buttons: [
                    {
                        text: 'OK',
                        handler: () => {
                            // this.goBack();
                        }
                    }
                ],
                backdropDismiss: false
            });
            yield alert.present();
        });
    }
    ionViewDidEnter() {
        this.deacctivateNetworkSwitch = this.network.networkSwitch.subscribe(data => {
            this.netSwitch = data;
            console.log(this.netSwitch);
        });
        this.network.networkDisconnect();
        this.network.networkConnect();
        // this.subscription = this.platform.backButton.subscribe(() => {
        //   if (this.showSearchBar === true) {
        //     this.showSearchBar = false;
        //   } else {
        //     (navigator as any).app.exitApp();
        //   }
        // });
    }
    ionViewWillLeave() {
        this.subscription.unsubscribe();
    }
    scheduledPage() {
        if (this.route.url == '/analystoverview/design') {
            this.route.navigate(['/schedule/design']);
        }
        else {
            this.route.navigate(['/schedule/survey']);
        }
    }
    showHom() {
        this.showHome = true;
        this.showSearchBar = false;
        this.searchSurveyItem = [];
        this.searchDesginItem = [];
        this.searchbarElement = '';
        this.getdesigndata();
    }
    onClick() {
        this.showHome = false;
        this.showSearchBar = true;
    }
};
AnalystoverviewPage.ctorParameters = () => [
    { type: _utilities_service__WEBPACK_IMPORTED_MODULE_4__["UtilitiesService"] },
    { type: _api_service__WEBPACK_IMPORTED_MODULE_5__["ApiService"] },
    { type: _ionic_native_native_geocoder_ngx__WEBPACK_IMPORTED_MODULE_11__["NativeGeocoder"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_9__["Platform"] },
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_6__["DatePipe"] },
    { type: _storage_service__WEBPACK_IMPORTED_MODULE_7__["StorageService"] },
    { type: _ionic_native_diagnostic_ngx__WEBPACK_IMPORTED_MODULE_8__["Diagnostic"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_9__["AlertController"] },
    { type: _ionic_native_geolocation_ngx__WEBPACK_IMPORTED_MODULE_10__["Geolocation"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_9__["ToastController"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_14__["Router"] },
    { type: _networkdetect_service__WEBPACK_IMPORTED_MODULE_16__["NetworkdetectService"] },
    { type: _ionic_native_in_app_browser_ngx__WEBPACK_IMPORTED_MODULE_17__["InAppBrowser"] }
];
AnalystoverviewPage.propDecorators = {
    ionInput: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Output"] }]
};
AnalystoverviewPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-analystoverview',
        template: _raw_loader_analystoverview_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_analystoverview_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], AnalystoverviewPage);



/***/ }),

/***/ "QNKs":
/*!****************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/analystoverview/design/design.component.html ***!
  \****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\r\n\r\n  <!--<ion-segment scrollable (ionChange)=\"segmentChanged($event)\" value=\"requesttype=prelim&status=created&status=outsourced&status=requestaccepted\">-->\r\n    <ion-segment scrollable (ionChange)=\"segmentChanged($event)\" value=\"InReview\" mode=\"md\">\r\n     <!-- <ion-segment-button *ngIf=\"userData.role.type !=='SuperAdmin'\"  value=\"requesttype=prelim&status=created&status=outsourced&status=requestaccepted\">\r\n        <ion-label class=\"segment-btn\">Pending</ion-label>\r\n      </ion-segment-button>\r\n     <ion-segment-button value=\"requesttype=prelim&status=designassigned\">\r\n        <ion-label class=\"segment-btn\">In Designing</ion-label>\r\n      </ion-segment-button>\r\n      <ion-segment-button value=\"requesttype=prelim&status=designcompleted\">\r\n        <ion-label class=\"segment-btn\">Completed</ion-label>\r\n      </ion-segment-button>-->\r\n      <!--<ion-segment-button value=\"requesttype=prelim&status=reviewassigned&status=reviewfailed&status=reviewpassed\">-->\r\n        <ion-segment-button value=\"InReview\">\r\n        <ion-label class=\"segment-btn\"> In Review</ion-label>\r\n      </ion-segment-button>\r\n      <ion-segment-button value=\"delivered\">\r\n        <ion-label class=\"segment-btn\">Delivered Designs</ion-label>\r\n      </ion-segment-button>\r\n    </ion-segment>\r\n    <ion-content (click)=\"close()\" style=\"padding-bottom: 250px;\">\r\n    <ion-refresher slot=\"fixed\" (ionRefresh)=\"refreshDesigns($event)\">\r\n        <ion-refresher-content></ion-refresher-content>\r\n      </ion-refresher>\r\n\r\n\r\n      <ion-grid *ngIf=\"listOfDesignsHelper.length !== 0\">\r\n          <!-- <ion-row *ngFor=\"let item of listOfDesignsHelper;let i = index\"> -->\r\n            <!-- <ion-virtual-scroll [items]=\"listOfDesignsHelper\"> -->\r\n                <ion-row *ngFor=\"let item of listOfDesignsHelper;let i = index\">\r\n                    <!-- <ion-row *virtualItem=\"let item;let i = index\"> -->\r\n              <!-- <ion-col size=\"12\" class=\"ion-margin-top\">\r\n                      <span class=\"ion-padding\" *ngIf=\"today === item.date\">\r\n                          Today\r\n                          </span>\r\n                  <span class=\"ion-padding\" *ngIf=\"today !== item.date\">\r\n                              {{item.date | date: 'dd MMM yyyy'}}\r\n                      </span>\r\n              </ion-col> -->\r\n              <ion-col *ngFor=\"let designData of item.listOfDesigns;let j = index;trackBy: trackdesign \" size=\"12\">\r\n                  <ion-card class=\"ion-no-padding custom-card ion-no-margin\" style=\"height: 100%;\" (click)=\"gotoDetails(designData,$event)\">\r\n                      <p class=\"customer-name\"\r\n                      routerDirection=\"forward\">{{designData.name}}\r\n                      <!-- <span class=\"chipdetail\" style=\"background-color: #1289A7;\"  routerDirection=\"forward\">\r\n                        {{designData.deliverydate | date: 'hh:mm a'}}\r\n                    </span> -->\r\n\r\n                    <span fill=\"clear\" background-border=\"clear\"  class=\"imagebutton\" (click)=\"gotoActivity(designData,$event)\" size=\"small\"  ><img src=\"/assets/images/activitylist.png\" style=\"height:20px\"/></span>\r\n                    <ng-container *ngIf=\"designData?.chatid!==null && designData?.addedtogroupchat\">\r\n                        <span fill=\"clear\" background-border=\"clear\" (click)=\"gotoChats(designData,$event)\" class=\"chatbutton\"  size=\"small\"  ><img  style= \"height:20px\" src=\"assets/images/chat.svg\" /></span>\r\n                      </ng-container>\r\n            </p>\r\n            <p style=\"margin:0px\">\r\n\r\n                <span class=\"chipdetail\" style=\"background-color: rgb(246, 77, 10);\" *ngIf=\"designData.status == 'requestdeclined'\"  >Declined</span>\r\n                <span class=\"chipdetail\" style=\"background-color: rgb(246, 104, 10);\" *ngIf=\"item.lateby > 0\" >Overdue</span>\r\n                <span class=\"chipdetail\" style=\"background-color: rgb(109, 187, 26);\" *ngIf=\"designData.status == 'requestaccepted'\" >Accepted</span>\r\n                <span class=\"chipdetail\" style=\"background-color: rgb(109, 187, 26); cursor: pointer;\" *ngIf=\"designData.status == 'delivered'\" >Delivered</span>\r\n                <span class=\"chipdetail\" style=\"background-color: rgb(109, 187, 26);\" *ngIf=\"designData.status == 'designcompleted'\" >Completed</span>\r\n                <span class=\"chipdetail\" style=\"background-color: #1289A7;;\" *ngIf=\"designData.status == 'created'\" >Unassigned</span>\r\n                <span class=\"chipdetail\" style=\"background-color: #1289A7;;\" *ngIf=\"designData.status == 'designassigned'\" >Design Assigned</span>\r\n                <span class=\"chipdetail\" style=\"background-color: #1289A7;; cursor: pointer;\" *ngIf=\"designData.status == 'reviewassigned'\" >In Review</span>\r\n                <span class=\"chipdetail\" *ngIf=\"designData.status == 'outsourced' && (userData.role.name=='ContractorAdmin' || userData.role.name=='ContractorSuperAdmin')\" style=\"background-color: #95afc0;\" >Waiting for acceptance</span>\r\n\r\n                <span class=\"chipdetail\" style=\"background-color: rgb(109, 187, 26) ;\" *ngIf=\"designData.status == 'reviewpassed'\" >Review Passed</span>\r\n                <span class=\"chipdetail\" style=\"background-color: rgb(246, 77, 10) ;\" *ngIf=\"designData.status == 'reviewfailed'\" >Review Failed</span>\r\n                <span class=\"chipdetail\" style=\"background-color: rgb(183,21,64)\" *ngIf=\"designData.isinrevisionstate\"  >Revision</span>\r\n                <span class=\"chipdetail ml-1 ml-1\" style=\"background-color: #FA983A;\"\r\n                *ngIf=\"designData.isoutsourced == 'true'\">Wattmonk</span>\r\n            </p>\r\n\r\n            <p style=\"margin:0px\">\r\n                <span class=\"customer-email\" \r\n                        routerDirection=\"forward\">{{designData.email}}</span>\r\n                        <span *ngIf=\"item.lateby > 1\" class=\"latebystyle\"><strong>Late by {{item.lateby}} days</strong></span>\r\n                        <span *ngIf=\"item.lateby == 1\" class=\"latebystyle\"><strong>Late by a day</strong></span>\r\n            </p>\r\n                      <a href=\"tel:{{designData.phonenumber}}\" style=\"text-decoration: none;\" class=\"z-100\">\r\n                          <span class=\"customer-phone\">{{designData.phonenumber}}</span></a>\r\n                      <span class=\"customer-address z-100\"\r\n                              (click)=\"openAddressOnMap(designData.address,$event)\">{{(designData.address | slice:0:60) + (designData.address.length > 60 ? '...' : '')}}</span>\r\n\r\n                      <ion-row style=\"margin-bottom: 8px;\" >\r\n                          <!-- <span class=\"chipdetail\" style=\"background-color: #95afc0; cursor: pointer;\" >Wattmonk</span> -->\r\n                          <ion-col>\r\n                          <span class=\"chipdetail\" style=\"background-color: #95afc0; cursor: pointer;\" >{{designData?.source}}</span></ion-col>\r\n                          <ion-col *ngIf=\"designData.status == 'reviewassigned'\" style=\"color: #737373; font-size: 14px;\">\r\n                            <span style=\"float: right;\">{{designData?.reviewremainingtime}}</span>\r\n                          </ion-col>\r\n                      </ion-row>\r\n\r\n\r\n\r\n                      <ion-row class=\"ion-no-margin ion-no-margin\">\r\n                      <ion-col *ngIf=\"segments=='requesttype=prelim&status=delivered'\">\r\n                        <span  style=\"float:right !important;\" class=\"ion-text-end action-button-color\" (click)=\"shareWhatsapp(designData,$event)\">\r\n                            <ion-icon name=\"share-social-outline\"></ion-icon></span>&nbsp;\r\n                        <span style=\"float:right !important;margin-right: 8px;\" class=\"ion-text-end action-button-color\" (click)=\"shareViaEmails(designData.id,designData,$event)\">\r\n                            <ion-icon name=\"mail\" ></ion-icon></span>\r\n                    </ion-col></ion-row>\r\n                  <!-- <ion-row class=\"ion-no-margin ion-no-margin\">\r\n                          <ion-col *ngIf=\"segments=='requesttype=prelim&status=created&status=outsourced&status=requestaccepted'\">\r\n                              <span *ngIf=\"designData.status == 'created' || designData.status == 'requestaccepted'\" style=\"float:right !important;\" class=\"ion-text-end action-button-color\" (click)=\"openDesigners(designData.id,designData)\"\r\n                              >Assign</span>\r\n                              <span style=\"float: right;\">\r\n\r\n                                  <ion-col size=\"8\"  *ngIf=\"designData.status == 'outsourced'\"  class=\"ion-text-end action-button-color\" (click)=\"accept(designData.id,'requestaccepted')\">\r\n                                     Accept\r\n                                  </ion-col>\r\n                                  <ion-col size=\"4\" *ngIf=\"designData.status == 'outsourced'\"  class=\"ion-text-end action-button-color\" (click)=\"decline(designData.id)\">\r\n                                  Decline\r\n                                  </ion-col>\r\n                              </span>\r\n\r\n                              <span *ngIf=\"designData.status == 'requestdeclined'\"style=\"float:right !important;\" class=\"ion-text-end action-button-color\" (click)=\"openDesigners(designData.id)\"\r\n                              >Reassign</span>\r\n                          </ion-col>\r\n\r\n\r\n                          <ion-col *ngIf=\"segments=='requesttype=prelim&status=designcompleted'\">\r\n                              <span  style=\"float:right !important;\" class=\"ion-text-end action-button-color\" (click)=\"openDesigners(designData.id)\"\r\n                              >Assign Review</span>\r\n                          </ion-col>\r\n                          <ion-col *ngIf=\"segments=='requesttype=prelim&status=designassigned'\">\r\n                              <span *ngIf=\"designData.status == 'reviewpassed'\" style=\"float:right !important;\" class=\"ion-text-end action-button-color\" (click)=\"openDesigners(designData.id)\"\r\n                              >Deliver</span>\r\n                          </ion-col>-->\r\n                          <!-- <ion-col class=\"ion-no-margin ion-no-padding\">\r\n                              <ion-button class=\"ion-no-margin ion-no-padding\" fill=\"clear\" [routerLink]=\"['/surveyprocess/' + designData.id + '/' + designData.jobtype + '/' + designData.latitude + '/' + designData.longitude]\"\r\n                              routerDirection=\"forward\">\r\n                                  Restart Survey\r\n                              </ion-button>\r\n                          </ion-col> -->\r\n                     <!-- </ion-row>-->\r\n                      <!-- <ion-progress-bar [value]=\"1\" mode=\"ios\" color=\"success\" class=\"progress-bar-height\"></ion-progress-bar> -->\r\n                        <!-- <span class=\"ion-text-end timestamp\"  routerDirection=\"forward\">\r\n                              {{designData.deliverydate | date: 'hh:mm a'}}\r\n                         <ion-col *ngIf=\"segments=='requesttype=prelim&status=delivered'\">\r\n                                <span  style=\"float:right !important;\" class=\"ion-text-end action-button-color\" (click)=\"shareWhatsapp(designData)\">\r\n                                    <ion-icon name=\"share-social-outline\"></ion-icon></span>&nbsp;\r\n                                    <ion-icon name=\"mail\" ></ion-icon></span>\r\n                            </ion-col>\r\n                  </span> -->\r\n               <!--   <ion-col *ngIf=\"requesttype=prelim&status=delivered\">\r\n                    <span  style=\"float:right !important;\" class=\"ion-text-end action-button-color\" (click)=\"shareWhatsapp()\">\r\n                    <ion-icon name=\"logo-whatsapp\"></ion-icon></span>\r\n                </ion-col>-->\r\n                </ion-card>\r\n              </ion-col>\r\n          </ion-row>\r\n          <!-- </ion-virtual-scroll> -->\r\n          <!-- <ion-row>\r\n              <ion-col size=\"12\" style=\"height: 100px;\">\r\n\r\n              </ion-col>\r\n          </ion-row> -->\r\n      </ion-grid>\r\n\r\n      <div *ngIf=\"listOfDesignsHelper.length === 0 \" class=\"h-100 d-flex flex-column align-center justify-center\">\r\n              <!-- <div *ngIf=\"!netSwitch\">\r\n                  No internet Connection\r\n              </div> -->\r\n              {{noDesignFound}}\r\n\r\n          <ion-img src=\"/assets/images/blank.png\" class=\"placeholder\"></ion-img>\r\n      </div>\r\n      <ion-infinite-scroll (ionInfinite)=\"doInfinite($event)\">\r\n        <ion-infinite-scroll-content\r\n          loadingSpinner=\"bubbles\"\r\n         >\r\n        </ion-infinite-scroll-content>\r\n      </ion-infinite-scroll>\r\n\r\n\r\n\r\n</ion-content>\r\n\r\n<ion-bottom-drawer [(state)]=\"drawerState\" [minimumHeight]=\"0\" [dockedHeight]=\"320\" [draggable]=\"false\" [disableDrag]=\"true\"\r\n                 [shouldBounce]=\"true\" [distanceTop]=\"0\" class=\"drawer\" style=\"z-index: 9999 !important;\">\r\n  <form [formGroup]=\"assignForm\">\r\n      <ion-grid class=\"drawer\">\r\n          <ion-row>\r\n              <ion-col size=\"12\">\r\n                  <app-user-selector (assigneeData)=getassignedata($event) placeholder=\"Assign\" [assignees]=\"listOfAssignees\"\r\n                                     formControlName=\"assignedto\"></app-user-selector>\r\n              </ion-col>\r\n          </ion-row>\r\n          <ion-row style=\"margin-left: 8px;\">\r\n              <ion-col size=\"12\">\r\n                  <span class=\"input-placeholder\">comments</span>\r\n              </ion-col>\r\n              <ion-col size=\"12\" style=\"padding-top: 0px;\">\r\n                  <ion-textarea style=\"max-width: 98%;\" class=\"ion-no-margin ion-no-padding comment_box\" rows=\"3\"\r\n                                formControlName=\"comment\"></ion-textarea>\r\n              </ion-col>\r\n          </ion-row>\r\n          <ion-row style=\"justify-content: flex-end;\">\r\n              <ion-col size=\"auto\" style=\"padding-top: 0px; margin-right: 6px;\">\r\n                  <ion-button class=\"buttom-drawer-button\" fill=\"clear\" (click)=\"assignToDesigner()\">\r\n                      Confirm\r\n                  </ion-button>\r\n              </ion-col>\r\n              <ion-col size=\"auto\">\r\n                  <ion-button class=\"buttom-drawer-button-cancel\" fill=\"clear\" (click)=\"dismissBottomSheet()\">\r\n                      Cancel\r\n                  </ion-button>\r\n              </ion-col>\r\n          </ion-row>\r\n      </ion-grid>\r\n  </form>\r\n\r\n</ion-bottom-drawer>\r\n\r\n<!-- <router-outlet></router-outlet> -->\r\n");

/***/ }),

/***/ "RqZp":
/*!**************************************************************************!*\
  !*** ./src/app/analystoverview/permitdesign/permitdesign.component.scss ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".custom-card {\n  display: flex !important;\n  flex-direction: column !important;\n  background: white !important;\n  border-radius: 4px !important;\n  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.3) !important;\n  padding: 8px 12px;\n}\n\n.customer-name {\n  font-size: 1em;\n  color: #434343;\n  font-weight: bold;\n  display: table;\n  margin: 0px;\n}\n\n.customer-email {\n  font-size: 0.8em;\n  color: #B4B4B4;\n}\n\n.customer-phone {\n  font-size: 0.8em;\n  color: #4272B9;\n}\n\n.customer-address {\n  margin-top: 4px;\n  margin-bottom: 6px;\n  font-size: 0.8em;\n  color: #4272B9;\n}\n\n.timestamp {\n  font-size: 0.7em;\n}\n\n.chipdetail {\n  display: inline;\n  vertical-align: middle;\n  background-color: #95afc0;\n  font-size: 0.6em;\n  padding: 4px 10px;\n  border-radius: 10px;\n  text-align: center;\n  color: #fff;\n}\n\n.cssclass {\n  --max-height:100% !important;\n}\n\nion-bottom-drawer {\n  --padding: 0 !important;\n  padding: 0 !important;\n  --background: #F3F3F3 !important;\n  background: #F3F3F3 !important;\n}\n\nion-bottom-drawer ion-content {\n  --background: #F3F3F3 !important;\n}\n\n.segment-btn {\n  font-size: 10px !important;\n  position: absolute;\n}\n\n.latebystyle {\n  float: right;\n  font-size: 10px;\n  color: #3C78DB;\n}\n\n.imagebutton {\n  float: right;\n  margin-top: 0px;\n}\n\n.pointer {\n  cursor: pointer;\n}\n\n.chatbutton {\n  float: right;\n  margin-top: 0px;\n  margin-right: 5px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFxwZXJtaXRkZXNpZ24uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSx3QkFBQTtFQUNBLGlDQUFBO0VBQ0EsNEJBQUE7RUFDQSw2QkFBQTtFQUNBLHFEQUFBO0VBQ0EsaUJBQUE7QUFDSjs7QUFFRTtFQUNFLGNBQUE7RUFDQSxjQUFBO0VBQ0EsaUJBQUE7RUFDQSxjQUFBO0VBQ0EsV0FBQTtBQUNKOztBQUVFO0VBQ0UsZ0JBQUE7RUFDQSxjQUFBO0FBQ0o7O0FBRUU7RUFDRSxnQkFBQTtFQUNBLGNBQUE7QUFDSjs7QUFFRTtFQUNFLGVBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsY0FBQTtBQUNKOztBQUlFO0VBQ0UsZ0JBQUE7QUFESjs7QUFLRTtFQUNFLGVBQUE7RUFDQSxzQkFBQTtFQUNBLHlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxpQkFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxXQUFBO0FBRko7O0FBSUU7RUFDRSw0QkFBQTtBQURKOztBQWdCRTtFQUVFLHVCQUFBO0VBQ0EscUJBQUE7RUFFQSxnQ0FBQTtFQUNBLDhCQUFBO0FBZko7O0FBaUJJO0VBQ0UsZ0NBQUE7QUFmTjs7QUFvQk07RUFDRSwwQkFBQTtFQUNBLGtCQUFBO0FBakJSOztBQXNCTTtFQUNFLFlBQUE7RUFDQSxlQUFBO0VBQ0EsY0FBQTtBQW5CUjs7QUFzQkU7RUFDRSxZQUFBO0VBQ0EsZUFBQTtBQW5CSjs7QUF1QkU7RUFBUyxlQUFBO0FBbkJYOztBQW9CRTtFQUNFLFlBQUE7RUFDQSxlQUFBO0VBQ0EsaUJBQUE7QUFqQkoiLCJmaWxlIjoicGVybWl0ZGVzaWduLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmN1c3RvbS1jYXJkIHtcclxuICAgIGRpc3BsYXk6IGZsZXggIWltcG9ydGFudDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW4gIWltcG9ydGFudDtcclxuICAgIGJhY2tncm91bmQ6IHdoaXRlICFpbXBvcnRhbnQ7XHJcbiAgICBib3JkZXItcmFkaXVzOiA0cHggIWltcG9ydGFudDtcclxuICAgIGJveC1zaGFkb3c6IDAgMXB4IDJweCAwIHJnYmEoMCwgMCwgMCwgMC4zKSAhaW1wb3J0YW50O1xyXG4gICAgcGFkZGluZzogOHB4IDEycHg7XHJcbiAgfVxyXG4gIFxyXG4gIC5jdXN0b21lci1uYW1lIHtcclxuICAgIGZvbnQtc2l6ZTogMWVtO1xyXG4gICAgY29sb3I6ICM0MzQzNDM7XHJcbiAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgIGRpc3BsYXk6dGFibGU7XHJcbiAgICBtYXJnaW46IDBweDtcclxuICB9XHJcbiAgXHJcbiAgLmN1c3RvbWVyLWVtYWlsIHtcclxuICAgIGZvbnQtc2l6ZTogMC44ZW07XHJcbiAgICBjb2xvcjogI0I0QjRCNDtcclxuICB9XHJcbiAgXHJcbiAgLmN1c3RvbWVyLXBob25lIHtcclxuICAgIGZvbnQtc2l6ZTogMC44ZW07XHJcbiAgICBjb2xvcjogIzQyNzJCOTtcclxuICB9XHJcbiAgXHJcbiAgLmN1c3RvbWVyLWFkZHJlc3Mge1xyXG4gICAgbWFyZ2luLXRvcDogNHB4O1xyXG4gICAgbWFyZ2luLWJvdHRvbTogNnB4O1xyXG4gICAgZm9udC1zaXplOiAwLjhlbTtcclxuICAgIGNvbG9yOiAjNDI3MkI5O1xyXG4gIH1cclxuICBcclxuICBcclxuICBcclxuICAudGltZXN0YW1wIHtcclxuICAgIGZvbnQtc2l6ZTogMC43ZW07XHJcbiAgIFxyXG4gIH1cclxuICBcclxuICAuY2hpcGRldGFpbHtcclxuICAgIGRpc3BsYXk6IGlubGluZTtcclxuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjOTVhZmMwO1xyXG4gICAgZm9udC1zaXplOiAwLjZlbTtcclxuICAgIHBhZGRpbmc6IDRweCAxMHB4O1xyXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIGNvbG9yOiAjZmZmO1xyXG4gIH1cclxuICAuY3NzY2xhc3N7XHJcbiAgICAtLW1heC1oZWlnaHQgOjEwMCUgIWltcG9ydGFudDtcclxuICAgIC8vIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIC8vIGRpc3BsYXk6IGJsb2NrO1xyXG4gIH1cclxuICBcclxuICBcclxuICAvLy5kcmF3ZXIge1xyXG4gIC8vICBiYWNrZ3JvdW5kOiAjRjNGM0YzO1xyXG4gIC8vICAtLWJhY2tncm91bmQ6ICNGM0YzRjM7XHJcbiAgLy99XHJcbiAgLy9cclxuICAvLy5pb24tYm90dG9tLWRyYXdlci1zY3JvbGxhYmxlLWNvbnRlbnQge1xyXG4gIC8vICBiYWNrZ3JvdW5kOiAjRjNGM0YzICFpbXBvcnRhbnQ7XHJcbiAgLy99XHJcbiAgXHJcbiAgaW9uLWJvdHRvbS1kcmF3ZXIge1xyXG4gIFxyXG4gICAgLS1wYWRkaW5nOiAwICFpbXBvcnRhbnQ7XHJcbiAgICBwYWRkaW5nOiAwICFpbXBvcnRhbnQ7XHJcbiAgXHJcbiAgICAtLWJhY2tncm91bmQ6ICNGM0YzRjMgIWltcG9ydGFudDtcclxuICAgIGJhY2tncm91bmQ6ICNGM0YzRjMgIWltcG9ydGFudDtcclxuICBcclxuICAgIGlvbi1jb250ZW50IHtcclxuICAgICAgLS1iYWNrZ3JvdW5kOiAjRjNGM0YzICFpbXBvcnRhbnQ7XHJcbiAgICB9XHJcbiAgXHJcbiAgICBcclxuICB9XHJcbiAgICAgIC5zZWdtZW50LWJ0bntcclxuICAgICAgICBmb250LXNpemU6IDEwcHggIWltcG9ydGFudDtcclxuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgICAgXHJcblxyXG4gICAgICB9XHJcbiAgXHJcbiAgICAgIC5sYXRlYnlzdHlsZXtcclxuICAgICAgICBmbG9hdDogcmlnaHQ7IFxyXG4gICAgICAgIGZvbnQtc2l6ZTogMTBweDtcclxuICAgICAgICBjb2xvcjogIzNDNzhEQjtcclxuICAgICAgfVxyXG4gIFxyXG4gIC5pbWFnZWJ1dHRvbntcclxuICAgIGZsb2F0OnJpZ2h0O1xyXG4gICAgbWFyZ2luLXRvcDogMHB4O1xyXG4gICAgXHJcbiAgICBcclxuICB9XHJcbiAgLnBvaW50ZXJ7Y3Vyc29yOnBvaW50ZXJ9XHJcbiAgLmNoYXRidXR0b257XHJcbiAgICBmbG9hdDpyaWdodDtcclxuICAgIG1hcmdpbi10b3A6IDBweDtcclxuICAgIG1hcmdpbi1yaWdodDo1cHg7XHJcbiAgfVxyXG4gICJdfQ== */");

/***/ }),

/***/ "TcbN":
/*!****************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/analystoverview/survey/survey.component.html ***!
  \****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-content>\r\n  <ion-segment scrollable (ionChange)=\"segmentChanged($event)\" value=\"InReview\">\r\n     <!-- <ion-segment-button value=\"status=created&status=outsourced&status=requestaccepted\">\r\n        <ion-label class=\"segment-btn\">Pending</ion-label>\r\n      </ion-segment-button>\r\n      <ion-segment-button value=\"status=surveyassigned&status=surveyinprocess\">\r\n        <ion-label class=\"segment-btn\">In Progress</ion-label>\r\n      </ion-segment-button>\r\n      <ion-segment-button value=\"status=surveycompleted\">\r\n        <ion-label class=\"segment-btn\">Completed</ion-label>\r\n      </ion-segment-button>-->\r\n     <!-- <ion-segment-button value=\"status=reviewassigned&status=reviewpassed&status=reviewfailed\">-->\r\n      <ion-segment-button value=\"InReview\">\r\n        <ion-label class=\"segment-btn\">In Review</ion-label>\r\n      </ion-segment-button>\r\n      <ion-segment-button value=\"delivered\">\r\n        <ion-label class=\"segment-btn\">Delivered Designs</ion-label>\r\n      </ion-segment-button>\r\n    </ion-segment>\r\n  <ion-refresher slot=\"fixed\" (ionRefresh)=\"getSurveys($event)\">\r\n      <ion-refresher-content></ion-refresher-content>\r\n  </ion-refresher>\r\n\r\n\r\n          <ion-grid *ngIf=\"listOfSurveyDataHelper.length !== 0\">\r\n              <ion-row *ngFor=\"let item of listOfSurveyDataHelper;let i = index\">\r\n                  <ion-col size=\"12\" class=\"ion-margin-top\">\r\n                          <span class=\"ion-padding\" *ngIf=\"today === item.date\">\r\n                              Today\r\n                            </span>\r\n                      <span class=\"ion-padding\" *ngIf=\"today !== item.date\">\r\n                                {{item.date | date: 'dd MMM yyyy'}}\r\n                          </span>\r\n                  </ion-col>\r\n                  <ion-col *ngFor=\"let surveyData of item.listOfSurveys;let i = index \" size=\"12\">\r\n                      <div class=\"ion-no-padding custom-card\" style=\"height: 100%;\">\r\n                          <!-- <p class=\"customer-name\" [routerLink]=\"['/survey-detail/',surveyData.id]\" -->\r\n                            <p class=\"customer-name\"\r\n                          routerDirection=\"forward\">{{surveyData.name}}\r\n                          <span class=\"chipdetail\" style=\"background-color: #1289A7;\" [routerLink]=\"['/survey-detail/',surveyData.id]\" routerDirection=\"forward\">\r\n                            {{surveyData.datetime | date: 'hh:mm a'}}\r\n                        </span>\r\n                        <span *ngIf=\"surveyData.status=='surveyassigned'\" class=\"chipdetail\" style=\"background-color: #3C78D8;\" [routerLink]=\"['/survey-detail/',surveyData.id]\" routerDirection=\"forward\">\r\n                          pending\r\n                      </span>\r\n                        <span class=\"chipdetail\" style=\"background-color: rgb(246, 77, 10);\" [routerLink]=\"['/survey-detail/',surveyData.id]\" *ngIf=\"surveyData.lateby > 0\">Overdue</span>\r\n                        <span fill=\"clear\" background-border=\"clear\" [routerLink]=\"['/','activity',surveyData.id,'survey']\" class=\"imagebutton\"  size=\"small\"  ><ion-icon src=\"/assets/images/activitylist.svg\" ></ion-icon></span>\r\n                        <span class=\"chipdetail\" style=\"background-color: rgb(109, 187, 26) ;\" *ngIf=\"surveyData.status == 'reviewpassed'\" [routerLink]=\"['/survey-detail/',surveyData.id]\">Review Passed</span>\r\n                    <span class=\"chipdetail\" style=\"background-color: rgb(246, 77, 10) ;\" *ngIf=\"surveyData.status == 'reviewfailed'\" [routerLink]=\"['/survey-detail/',surveyData.id]\">Review Failed</span>\r\n                    </p>\r\n                <p style=\"margin:0px\">\r\n\r\n                  <span class=\"customer-email\" [routerLink]=\"['/survey-detail/',surveyData.id]\"\r\n                        routerDirection=\"forward\">{{surveyData.email}}</span>\r\n                        <span *ngIf=\"surveyData.lateby > 1\" class=\"latebystyle\"><strong>Late by {{surveyData.lateby}} days</strong></span>\r\n                        <span *ngIf=\"surveyData.lateby == 1\" class=\"latebystyle\"><strong>Late by a day</strong></span>\r\n              </p>\r\n                          <a href=\"tel:{{surveyData.phonenumber}}\" style=\"text-decoration: none;\" class=\"z-100\">\r\n                              <span class=\"customer-phone\">{{surveyData?.phonenumber}}</span></a>\r\n                          <span class=\"customer-address z-100 m-0\"\r\n                                (click)=\"openAddressOnMap(surveyData.address)\">{{(surveyData.address | slice:0:60) + (surveyData.address?.length > 60 ? '...' : '')}}</span>\r\n                                <ion-row style=\"margin-bottom: 8px;\"  [routerLink]=\"['/survey-detail/',surveyData.id]\" class=\"m-0\">\r\n                                  <span class=\"chipdetail\" style=\"background-color: #95afc0;\" >Wattmonk</span>\r\n                                  <span class=\"chipdetail\" style=\"background-color: #95afc0;\" >{{surveyData.formattedjobtype}}</span>\r\n\r\n                              </ion-row>\r\n                          <ion-row class=\"ion-no-margin\">\r\n                              <ion-col></ion-col>\r\n                              <!-- <ion-col size=\"auto\" class=\"ion-no-margin ion-no-padding\" *ngIf=\"today==item.date && userData.role.type !=='wattmonkadmins'\">\r\n                                       <ion-button  class=\"ion-no-margin ion-no-padding z-100\" fill=\"clear\"\r\n                                       [routerLink]=\"['/surveyprocess/' + surveyData.id + '/' + surveyData.jobtype + '/' + surveyData.latitude + '/' + surveyData.longitude]\"\r\n                                       routerDirection=\"forward\">\r\n                                       Start Survey\r\n                                       </ion-button>\r\n                                  <span class=\"ion-text-end action-button-color\" >Start Survey</span>\r\n                               </ion-col>  <ion-col size=\"auto\" class=\"ion-no-margin ion-no-padding\" *ngIf=\"today==item.date && userData.role.type !=='wattmonkadmins'\"> -->\r\n                                       <!-- <ion-button  class=\"ion-no-margin ion-no-padding z-100\" fill=\"clear\"\r\n                                       [routerLink]=\"['/surveyprocess/' + surveyData.id + '/' + surveyData.jobtype + '/' + surveyData.latitude + '/' + surveyData.longitude]\"\r\n                                       routerDirection=\"forward\">\r\n                                       Start Survey\r\n                                       </ion-button> -->\r\n                                  <!-- <span class=\"ion-text-end action-button-color\" >Start Survey</span> -->\r\n                              <!-- </ion-col> -->\r\n                      <!-- <ion-col></ion-col> -->\r\n                      <!-- <ion-col *ngIf=\"segments=='status=created&status=outsourced&status=requestaccepted'\" size=\"auto\" class=\"ion-no-margin ion-no-padding\" style=\"margin-bottom: 5px;\">\r\n                                  <span *ngIf=\"surveyData.status == 'created' || surveyData.status == 'requestaccepted'\" style=\"float:right !important;\" class=\"ion-text-end action-button-color z-100\" (click)=\"openSurveyors(surveyData.id)\"\r\n                      >Assign</span>  <ion-col *ngIf=\"segments=='status=created&status=outsourced&status=requestaccepted'\" size=\"auto\" class=\"ion-no-margin ion-no-padding\" style=\"margin-bottom: 5px;\">\r\n                                  <span *ngIf=\"surveyData.status == 'created' || surveyData.status == 'requestaccepted'\" style=\"float:right !important;\" class=\"ion-text-end action-button-color z-100\" (click)=\"openSurveyors(surveyData.id)\"\r\n                      >Assign</span> -->\r\n                      <!-- <span *ngIf=\"surveyData.status == 'outsourced'\" style=\"float:right !important;\" class=\"ion-text-end action-button-color\" (click)=\"openSurveyors(surveyData.id)\"\r\n                      >Decline</span>\r\n                      <span *ngIf=\"surveyData.status == 'outsourced'\" style=\"float:right !important;\" class=\"ion-text-end action-button-color\" (click)=\"openSurveyors(surveyData.id)\"\r\n                      >Accept</span> -->\r\n                      <!-- <span style=\"float: right;\"></span> -->\r\n\r\n                          <!-- <ion-col size=\"8\"  *ngIf=\"surveyData.status == 'outsourced'\"  class=\"ion-text-end action-button-color z-100\" (click)=\"openSurveyors(surveyData.id)\">\r\n                             Accept\r\n                          </ion-col>\r\n                          <ion-col size=\"4\" *ngIf=\"surveyData.status == 'outsourced'\"  class=\"ion-text-end action-button-color z-100\" (click)=\"openSurveyors(surveyData.id)\">\r\n                          Decline\r\n                          </ion-col>\r\n                      </span>\r\n                      <span *ngIf=\"surveyData.status == 'requestdeclined'\"style=\"float:right !important;\" class=\"ion-text-end action-button-color z-100\" (click)=\"openSurveyors(surveyData.id)\"\r\n                      >Reassign</span>\r\n                      </ion-col>\r\n                      <ion-col size=\"auto\" class=\"ion-no-margin ion-no-padding\"\r\n                                  *ngIf=\"segments=='status=surveycompleted'\" style=\"margin-bottom: 5px;\">\r\n                          <span *ngIf=\"surveyData.status == 'created' || surveyData.status == 'requestaccepted'\" class=\"ion-text-end action-button-color z-100\"\r\n                                  (click)=\"openSurveyors(surveyData.id)\">Assign Review</span>\r\n                      </ion-col>\r\n                      <ion-col size=\"auto\" class=\"ion-no-margin ion-no-padding\"\r\n                                  *ngIf=\"surveyData.status == 'reviewpassed'\">\r\n                          <span class=\"ion-text-end action-button-color z-100\"\r\n                                  (click)=\"openSurveyors(surveyData.id)\">Deliver</span>\r\n                      </ion-col> -->\r\n                  </ion-row>\r\n                  <!-- <ion-progress-bar [value]=\"1\" mode=\"ios\" color=\"success\" class=\"progress-bar-height\"></ion-progress-bar> -->\r\n                          <!-- <span class=\"ion-text-end timestamp\" [routerLink]=\"['/survey-detail/',surveyData.id]\" routerDirection=\"forward\">\r\n                              {{surveyData.datetime | date: 'hh:mm a'}}\r\n                          </span> -->\r\n\r\n                      </div>\r\n\r\n                  </ion-col>\r\n              </ion-row>\r\n              <ion-row>\r\n                  <ion-col size=\"12\" style=\"height: 100px;\">\r\n                  </ion-col>\r\n              </ion-row>\r\n          </ion-grid>\r\n\r\n          <div *ngIf=\"listOfSurveyDataHelper.length === 0\" class=\"h-100 d-flex flex-column align-center justify-center\">\r\n              <div *ngIf=\"!netSwitch\">\r\n                  No internet Connection\r\n              </div>\r\n              <ion-img src=\"/assets/images/blank.png\" class=\"placeholder\"></ion-img>\r\n          </div>\r\n\r\n\r\n</ion-content>\r\n\r\n<ion-bottom-drawer [(state)]=\"drawerState\" [minimumHeight]=\"0\" [dockedHeight]=\"320\" [draggable]=\"false\" [disableDrag]=\"true\"\r\n                 [shouldBounce]=\"false\" [distanceTop]=\"0\" class=\"drawer\" style=\"z-index: 9999 !important;\">\r\n  <form [formGroup]=\"assignForm\">\r\n      <ion-grid class=\"drawer\">\r\n          <ion-row>\r\n              <ion-col size=\"12\">\r\n                  <app-user-selector placeholder=\"Assign\" [assignees]=\"listOfAssignees\"\r\n                                     formControlName=\"assignedto\"></app-user-selector>\r\n              </ion-col>\r\n          </ion-row>\r\n          <ion-row style=\"justify-content: flex-end;\">\r\n              <ion-col size=\"auto\" style=\"padding-top: 0px; margin-right: 6px;\">\r\n                  <ion-button class=\"buttom-drawer-button\"  fill=\"clear\" (click)=\"assignToSurveyor()\" >\r\n                      Confirm\r\n                  </ion-button>\r\n              </ion-col>\r\n              <ion-col size=\"auto\">\r\n                  <ion-button class=\"buttom-drawer-button-cancel\" fill=\"clear\" (click)=\"dismissBottomSheet()\">\r\n                      Cancel\r\n                  </ion-button>\r\n              </ion-col>\r\n          </ion-row>\r\n      </ion-grid>\r\n  </form>\r\n\r\n</ion-bottom-drawer>\r\n\r\n");

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

/***/ "huC7":
/*!************************************************************!*\
  !*** ./src/app/analystoverview/survey/survey.component.ts ***!
  \************************************************************/
/*! exports provided: SurveyComponent, SurveyDataHelper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SurveyComponent", function() { return SurveyComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SurveyDataHelper", function() { return SurveyDataHelper; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_survey_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./survey.component.html */ "TcbN");
/* harmony import */ var _survey_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./survey.component.scss */ "G7uj");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_utilities_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/utilities.service */ "oTnF");
/* harmony import */ var src_app_api_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/api.service */ "yTNM");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _ionic_native_launch_navigator_ngx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic-native/launch-navigator/ngx */ "fGQ8");
/* harmony import */ var ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ion-bottom-drawer */ "rFvw");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var src_app_storage_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/storage.service */ "qkCY");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @ionic/storage */ "e8h1");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! moment */ "wd/R");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var src_app_networkdetect_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! src/app/networkdetect.service */ "UZ2B");
















let SurveyComponent = class SurveyComponent {
    constructor(utils, apiService, datePipe, navController, launchNavigator, formBuilder, cdr, router, route, storage, storageService, network) {
        this.utils = utils;
        this.apiService = apiService;
        this.datePipe = datePipe;
        this.navController = navController;
        this.launchNavigator = launchNavigator;
        this.formBuilder = formBuilder;
        this.cdr = cdr;
        this.router = router;
        this.route = route;
        this.storage = storage;
        this.storageService = storageService;
        this.network = network;
        this.listOfSurveyData = [];
        this.listOfSurveyDataHelper = [];
        this.options = {
            start: '',
            app: this.launchNavigator.APP.GOOGLE_MAPS
        };
        this.drawerState = ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_9__["DrawerState"].Bottom;
        this.surveyId = 0;
        this.listOfAssignees = [];
        this.segments = 'status=reviewassigned&status=reviewpassed&status=reviewfailed';
        const latestDate = new Date();
        this.today = datePipe.transform(latestDate, 'M/dd/yy');
        console.log('date', this.today);
        this.assignForm = this.formBuilder.group({
            assignedto: new _angular_forms__WEBPACK_IMPORTED_MODULE_10__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_10__["Validators"].required]),
            status: new _angular_forms__WEBPACK_IMPORTED_MODULE_10__["FormControl"]('surveyassigned', [_angular_forms__WEBPACK_IMPORTED_MODULE_10__["Validators"].required])
        });
    }
    segmentChanged(event) {
        if (this.userData.role.type == 'qcinspector') {
            if (event.target.value == 'InReview') {
                this.segments = "status=reviewassigned&status=reviewpassed&status=reviewfailed";
                // return this.segments;
            }
            else if (event.target.value == 'delivered') {
                this.segments = "status=delivered";
            }
            this.getSurveys(null);
            // return this.segments;
        }
        // this.getsegmentdata(event.target.value);
        console.log((event.target.value));
        // this.segments= event.target.value;
        // this.getSurveys(event);
        // this.surveyRefreshSubscription = this.utils.getHomepageSurveyRefresh().subscribe((result) => {
        //   this.getSurveys(null);
        // });
        // this.dataRefreshSubscription = this.utils.getDataRefresh().subscribe((result) => {
        //   if(this.listOfSurveyData != null && this.listOfSurveyData.length > 0){
        //     this.formatSurveyData(this.listOfSurveyData);
        //   }
        // });
    }
    ionViewDidEnter() {
        this.network.networkDisconnect();
        this.network.networkConnect();
        this.deactivateNetworkSwitch = this.network.networkSwitch.subscribe(data => {
            this.netSwitch = data;
            console.log(this.netSwitch);
        });
        this.surveyRefreshSubscription = this.utils.getHomepageSurveyRefresh().subscribe((result) => {
            this.getSurveys(null);
        });
        this.dataRefreshSubscription = this.utils.getDataRefresh().subscribe((result) => {
            if (this.listOfSurveyData != null && this.listOfSurveyData.length > 0) {
                this.formatSurveyData(this.listOfSurveyData);
            }
        });
        // debugger;
        // this.routeSubscription.unsubscribe();
    }
    ngOnInit() {
        this.userData = this.storageService.getUser();
        console.log(this.userData);
    }
    getSurveys(event) {
        let showLoader = true;
        if (event != null && event !== undefined) {
            showLoader = false;
        }
        this.fetchPendingSurveys(event, showLoader);
    }
    fetchPendingSurveys(event, showLoader) {
        console.log(this.segments);
        this.listOfSurveyData = [];
        this.listOfSurveyDataHelper = [];
        this.utils.showLoadingWithPullRefreshSupport(showLoader, 'Getting Surveys').then((success) => {
            this.apiService.getSurveyorSurveys(this.segments).subscribe(response => {
                this.utils.hideLoadingWithPullRefreshSupport(showLoader).then(() => {
                    console.log(response);
                    this.formatSurveyData(response);
                    if (event !== null) {
                        event.target.complete();
                    }
                });
            }, responseError => {
                this.utils.hideLoadingWithPullRefreshSupport(showLoader).then(() => {
                    if (event !== null) {
                        event.target.complete();
                    }
                    const error = responseError.error;
                    this.utils.errorSnackBar(error.message[0].messages[0].message);
                });
            });
        });
    }
    // filterData(serchTerm: any) {
    //   console.log(this.listOfSurveyData);
    //   this.filterDataArray = this.listOfSurveyData.filter(x => x.id == serchTerm);
    //   const tempData: SurveyDataHelper[] = [];
    //   this.filterDataArray.forEach((surveyItem) => {
    //     if (tempData.length === 0) {
    //       const listOfSurvey = new SurveyDataHelper();
    //       listOfSurvey.date = this.datePipe.transform(surveyItem.created_at, 'M/d/yy');
    //       listOfSurvey.listOfSurveys.push(surveyItem);
    //       tempData.push(listOfSurvey);
    //     } else {
    //       let added = false;
    //       tempData.forEach((surveyList) => {
    //         if (!added) {
    //           if (surveyList.date === this.datePipe.transform(surveyItem.created_at, 'M/d/yy')) {
    //             surveyList.listOfSurveys.push(surveyItem);
    //             added = true;
    //           }
    //         }
    //       });
    //       if (!added) {
    //         const listOfSurvey = new SurveyDataHelper();
    //         listOfSurvey.date = this.datePipe.transform(surveyItem.created_at, 'M/d/yy');
    //         listOfSurvey.listOfSurveys.push(surveyItem);
    //         tempData.push(listOfSurvey);
    //         added = true;
    //       }
    //     }
    //   });
    //   this.listOfSurveyDataHelper = tempData;
    //   this.cdr.detectChanges();
    // }
    formatSurveyData(records) {
        this.listOfSurveyData = this.fillinDynamicData(records);
        console.log(this.listOfSurveyData);
        const tempData = [];
        this.listOfSurveyData.forEach((surveyItem, i) => {
            this.sDatePassed(surveyItem.datetime, i);
            surveyItem.lateby = this.overdue;
            if (tempData.length === 0) {
                const listOfSurvey = new SurveyDataHelper();
                listOfSurvey.date = this.datePipe.transform(surveyItem.datetime, 'M/dd/yy');
                listOfSurvey.listOfSurveys.push(surveyItem);
                tempData.push(listOfSurvey);
            }
            else {
                let added = false;
                tempData.forEach((surveyList) => {
                    if (!added) {
                        if (surveyList.date === this.datePipe.transform(surveyItem.datetime, 'M/dd/yy')) {
                            surveyList.listOfSurveys.push(surveyItem);
                            added = true;
                        }
                    }
                });
                if (!added) {
                    const listOfSurvey = new SurveyDataHelper();
                    listOfSurvey.date = this.datePipe.transform(surveyItem.datetime, 'M/dd/yy');
                    listOfSurvey.listOfSurveys.push(surveyItem);
                    tempData.push(listOfSurvey);
                    added = true;
                }
            }
        });
        this.listOfSurveyDataHelper = tempData.sort(function (a, b) {
            var dateA = new Date(a.date).getTime(), dateB = new Date(b.date).getTime();
            return dateB - dateA;
        });
        this.cdr.detectChanges();
    }
    fillinDynamicData(records) {
        records.forEach(element => {
            element.formattedjobtype = this.utils.getJobTypeName(element.jobtype);
            this.storage.get('' + element.id).then((data) => {
                console.log(data);
                if (data) {
                    element.totalpercent = data.currentprogress;
                }
                else {
                    element.totalpercent = 0;
                }
            });
        });
        return records;
    }
    ngOnDestroy() {
        this.surveyRefreshSubscription.unsubscribe();
        this.deactivateNetworkSwitch.unsubscribe();
    }
    // getSurvey(event, showLoader: boolean) {
    //   this.listOfSurveyData = [];
    //   this.listOfSurveyDataHelper = [];
    //   this.utils.showLoadingWithPullRefreshSupport(showLoader, 'Getting Surveys').then((success) => {
    //     this.apiService.getSurvey().subscribe(response => {
    //       this.utils.hideLoadingWithPullRefreshSupport(showLoader).then(() => {
    //         if (event !== null) {
    //           event.target.complete();
    //         }
    //         console.log(response);
    //         this.listOfSurveyData = response;
    //         const tempData: SurveyDataHelper[] = [];
    //         this.listOfSurveyData.forEach((surveyItem) => {
    //           if (tempData.length === 0) {
    //             const listOfSurvey = new SurveyDataHelper();
    //             listOfSurvey.date = this.datePipe.transform(surveyItem.datetime, 'M/d/yy');
    //             listOfSurvey.listOfSurveys.push(surveyItem);
    //             tempData.push(listOfSurvey);
    //           } else {
    //             let added = false;
    //             tempData.forEach((surveyList) => {
    //               if (!added) {
    //                 if (surveyList.date === this.datePipe.transform(surveyItem.datetime, 'M/d/yy')) {
    //                   surveyList.listOfSurveys.push(surveyItem);
    //                   added = true;
    //                 }
    //               }
    //             });
    //             if (!added) {
    //               const listOfSurvey = new SurveyDataHelper();
    //               listOfSurvey.date = this.datePipe.transform(surveyItem.datetime, 'M/d/yy');
    //               listOfSurvey.listOfSurveys.push(surveyItem);
    //               tempData.push(listOfSurvey);
    //               added = true;
    //             }
    //           }
    //         });
    //         this.listOfSurveyDataHelper = tempData;
    //         this.cdr.detectChanges();
    //       });
    //     }, responseError => {
    //       this.utils.hideLoadingWithPullRefreshSupport(showLoader).then(() => {
    //         if (event !== null) {
    //           event.target.complete();
    //         }
    //         const error: ErrorModel = responseError.error;
    //         this.utils.errorSnackBar(error.message[0].messages[0].message);
    //       });
    //     });
    //   });
    // }
    // getSurveyorSurveys(event, showLoader: boolean) {
    //   this.listOfSurveyData = [];
    //   this.listOfSurveyDataHelper = [];
    //   this.utils.showLoadingWithPullRefreshSupport(showLoader, 'Getting Surveys').then((success) => {
    //     this.apiService.getSurveyorSurveys("").subscribe(response => {
    //       this.utils.hideLoadingWithPullRefreshSupport(showLoader).then(() => {
    //         if (event !== null) {
    //           event.target.complete();
    //         }
    //         console.log(response);
    //         this.listOfSurveyData = response;
    //         const tempData: SurveyDataHelper[] = [];
    //         this.listOfSurveyData.forEach((surveyItem) => {
    //           if (tempData.length === 0) {
    //             const listOfSurvey = new SurveyDataHelper();
    //             listOfSurvey.date = this.datePipe.transform(surveyItem.datetime, 'M/d/yy');
    //             listOfSurvey.listOfSurveys.push(surveyItem);
    //             tempData.push(listOfSurvey);
    //           } else {
    //             let added = false;
    //             tempData.forEach((surveyList) => {
    //               if (!added) {
    //                 if (surveyList.date === this.datePipe.transform(surveyItem.datetime, 'M/d/yy')) {
    //                   surveyList.listOfSurveys.push(surveyItem);
    //                   added = true;
    //                 }
    //               }
    //             });
    //             if (!added) {
    //               const listOfSurvey = new SurveyDataHelper();
    //               listOfSurvey.date = this.datePipe.transform(surveyItem.datetime, 'M/d/yy');
    //               listOfSurvey.listOfSurveys.push(surveyItem);
    //               tempData.push(listOfSurvey);
    //               added = true;
    //             }
    //           }
    //         });
    //         this.listOfSurveyDataHelper = tempData;
    //         this.cdr.detectChanges();
    //       });
    //     }, responseError => {
    //       this.utils.hideLoadingWithPullRefreshSupport(showLoader).then(() => {
    //         if (event !== null) {
    //           event.target.complete();
    //         }
    //         const error: ErrorModel = responseError.error;
    //         this.utils.errorSnackBar(error.message[0].messages[0].message);
    //       });
    //     });
    //   });
    // }
    openAddressOnMap(address) {
        this.launchNavigator.navigate(address, this.options);
    }
    dismissBottomSheet() {
        this.drawerState = ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_9__["DrawerState"].Bottom;
        this.utils.setBottomBarHomepage(true);
    }
    assignToSurveyor() {
        if (this.assignForm.status === 'INVALID') {
            this.utils.errorSnackBar('Please select a surveyor');
        }
        else {
            this.apiService.updateSurveyForm(this.assignForm.value, this.surveyId).subscribe((value) => {
                this.dismissBottomSheet();
                this.utils.sethomepageSurveyRefresh(true);
            }, (error) => {
                this.dismissBottomSheet();
            });
        }
    }
    openSurveyors(id) {
        this.utils.showLoading('Getting Surveyors').then(() => {
            this.apiService.getSurveyors().subscribe(assignees => {
                this.utils.hideLoading().then(() => {
                    this.listOfAssignees = [];
                    assignees.forEach(item => this.listOfAssignees.push(item));
                    this.surveyId = id;
                    this.utils.setBottomBarHomepage(false);
                    this.drawerState = ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_9__["DrawerState"].Docked;
                    console.log(this.listOfAssignees);
                    this.assignForm.patchValue({
                        assignedto: 0
                    });
                });
            }, (error) => {
                this.utils.hideLoading().then(() => {
                    this.utils.errorSnackBar('Some error occurred. Please try again later');
                });
            });
        });
    }
    // getSurveys(event) {
    //   let showLoader = true;
    //   if (event != null && event !== undefined) {
    //     showLoader = false;
    //   }
    //   if (this.storage.getUser().role.id === ROLES.Surveyor) {
    //     this.getSurveyorSurveys(event, showLoader);
    //   } else {
    //     this.getSurvey(event, showLoader);
    //   }
    // }
    sDatePassed(datestring, i) {
        var checkdate = moment__WEBPACK_IMPORTED_MODULE_14__(datestring, "YYYYMMDD");
        var todaydate = moment__WEBPACK_IMPORTED_MODULE_14__(new Date(), "YYYYMMDD");
        var lateby = todaydate.diff(checkdate, "days");
        this.overdue = lateby;
        debugger;
        console.log(this.overdue, ">>>>>>>>>>>>>>>>>.");
    }
};
SurveyComponent.ctorParameters = () => [
    { type: src_app_utilities_service__WEBPACK_IMPORTED_MODULE_4__["UtilitiesService"] },
    { type: src_app_api_service__WEBPACK_IMPORTED_MODULE_5__["ApiService"] },
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_6__["DatePipe"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_7__["NavController"] },
    { type: _ionic_native_launch_navigator_ngx__WEBPACK_IMPORTED_MODULE_8__["LaunchNavigator"] },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_10__["FormBuilder"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ChangeDetectorRef"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_11__["Router"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_11__["ActivatedRoute"] },
    { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_13__["Storage"] },
    { type: src_app_storage_service__WEBPACK_IMPORTED_MODULE_12__["StorageService"] },
    { type: src_app_networkdetect_service__WEBPACK_IMPORTED_MODULE_15__["NetworkdetectService"] }
];
SurveyComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-survey',
        template: _raw_loader_survey_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_survey_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], SurveyComponent);

class SurveyDataHelper {
    constructor() {
        this.listOfSurveys = [];
    }
}


/***/ }),

/***/ "ot8Z":
/*!**************************************************************!*\
  !*** ./src/app/analystoverview/design/design.component.scss ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".custom-card {\n  display: flex !important;\n  flex-direction: column !important;\n  background: white !important;\n  border-radius: 4px !important;\n  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.3) !important;\n  padding: 8px 12px;\n}\n\n.customer-name {\n  font-size: 1em;\n  color: #434343;\n  font-weight: bold;\n  display: table;\n  margin: 0px;\n}\n\n.customer-email {\n  font-size: 0.8em;\n  color: #B4B4B4;\n}\n\n.customer-phone {\n  font-size: 0.8em;\n  color: #4272B9;\n}\n\n.customer-address {\n  margin-top: 4px;\n  margin-bottom: 6px;\n  font-size: 0.8em;\n  color: #4272B9;\n}\n\n.timestamp {\n  font-size: 0.7em;\n}\n\n.chipdetail {\n  display: inline;\n  vertical-align: middle;\n  background-color: #95afc0;\n  font-size: 0.6em;\n  padding: 4px 10px;\n  border-radius: 10px;\n  text-align: center;\n  color: #fff;\n}\n\n.cssclass {\n  --max-height:100% !important;\n}\n\nion-bottom-drawer {\n  --padding: 0 !important;\n  padding: 0 !important;\n  --background: #F3F3F3 !important;\n  background: #F3F3F3 !important;\n}\n\nion-bottom-drawer ion-content {\n  --background: #F3F3F3 !important;\n}\n\n.segment-btn {\n  font-size: 10px !important;\n  position: absolute;\n}\n\n.latebystyle {\n  float: right;\n  font-size: 10px;\n  color: #3C78DB;\n}\n\n.imagebutton {\n  float: right;\n  margin-top: 0px;\n}\n\n.pointer {\n  cursor: pointer;\n}\n\n.chatbutton {\n  float: right;\n  margin-top: 0px;\n  margin-right: 5px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFxkZXNpZ24uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSx3QkFBQTtFQUNBLGlDQUFBO0VBQ0EsNEJBQUE7RUFDQSw2QkFBQTtFQUNBLHFEQUFBO0VBQ0EsaUJBQUE7QUFDSjs7QUFFRTtFQUNFLGNBQUE7RUFDQSxjQUFBO0VBQ0EsaUJBQUE7RUFDQSxjQUFBO0VBQ0EsV0FBQTtBQUNKOztBQUVFO0VBQ0UsZ0JBQUE7RUFDQSxjQUFBO0FBQ0o7O0FBRUU7RUFDRSxnQkFBQTtFQUNBLGNBQUE7QUFDSjs7QUFFRTtFQUNFLGVBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsY0FBQTtBQUNKOztBQU1FO0VBQ0UsZ0JBQUE7QUFISjs7QUFPRTtFQUNFLGVBQUE7RUFDQSxzQkFBQTtFQUNBLHlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxpQkFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxXQUFBO0FBSko7O0FBTUU7RUFDRSw0QkFBQTtBQUhKOztBQWtCRTtFQUVFLHVCQUFBO0VBQ0EscUJBQUE7RUFFQSxnQ0FBQTtFQUNBLDhCQUFBO0FBakJKOztBQW1CSTtFQUNFLGdDQUFBO0FBakJOOztBQXNCTTtFQUNFLDBCQUFBO0VBQ0Esa0JBQUE7QUFuQlI7O0FBd0JNO0VBQ0UsWUFBQTtFQUNBLGVBQUE7RUFDQSxjQUFBO0FBckJSOztBQXdCRTtFQUNFLFlBQUE7RUFDQSxlQUFBO0FBckJKOztBQXlCRTtFQUFTLGVBQUE7QUFyQlg7O0FBc0JFO0VBQ0UsWUFBQTtFQUNBLGVBQUE7RUFDQSxpQkFBQTtBQW5CSiIsImZpbGUiOiJkZXNpZ24uY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuY3VzdG9tLWNhcmQge1xyXG4gICAgZGlzcGxheTogZmxleCAhaW1wb3J0YW50O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbiAhaW1wb3J0YW50O1xyXG4gICAgYmFja2dyb3VuZDogd2hpdGUgIWltcG9ydGFudDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDRweCAhaW1wb3J0YW50O1xyXG4gICAgYm94LXNoYWRvdzogMCAxcHggMnB4IDAgcmdiYSgwLCAwLCAwLCAwLjMpICFpbXBvcnRhbnQ7XHJcbiAgICBwYWRkaW5nOiA4cHggMTJweDtcclxuICB9XHJcbiAgXHJcbiAgLmN1c3RvbWVyLW5hbWUge1xyXG4gICAgZm9udC1zaXplOiAxZW07XHJcbiAgICBjb2xvcjogIzQzNDM0MztcclxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gICAgZGlzcGxheTp0YWJsZTtcclxuICAgIG1hcmdpbjogMHB4O1xyXG4gIH1cclxuICBcclxuICAuY3VzdG9tZXItZW1haWwge1xyXG4gICAgZm9udC1zaXplOiAwLjhlbTtcclxuICAgIGNvbG9yOiAjQjRCNEI0O1xyXG4gIH1cclxuICBcclxuICAuY3VzdG9tZXItcGhvbmUge1xyXG4gICAgZm9udC1zaXplOiAwLjhlbTtcclxuICAgIGNvbG9yOiAjNDI3MkI5O1xyXG4gIH1cclxuICBcclxuICAuY3VzdG9tZXItYWRkcmVzcyB7XHJcbiAgICBtYXJnaW4tdG9wOiA0cHg7XHJcbiAgICBtYXJnaW4tYm90dG9tOiA2cHg7XHJcbiAgICBmb250LXNpemU6IDAuOGVtO1xyXG4gICAgY29sb3I6ICM0MjcyQjk7XHJcbiAgfVxyXG4gIFxyXG4gIC5wbGFjZWhvbGRlciB7XHJcbiAgICAvLyB3aWR0aDogNTB2dyAhaW1wb3J0YW50O1xyXG4gIH1cclxuICBcclxuICAudGltZXN0YW1wIHtcclxuICAgIGZvbnQtc2l6ZTogMC43ZW07XHJcbiAgIFxyXG4gIH1cclxuICBcclxuICAuY2hpcGRldGFpbHtcclxuICAgIGRpc3BsYXk6IGlubGluZTtcclxuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjOTVhZmMwO1xyXG4gICAgZm9udC1zaXplOiAwLjZlbTtcclxuICAgIHBhZGRpbmc6IDRweCAxMHB4O1xyXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIGNvbG9yOiAjZmZmO1xyXG4gIH1cclxuICAuY3NzY2xhc3N7XHJcbiAgICAtLW1heC1oZWlnaHQgOjEwMCUgIWltcG9ydGFudDtcclxuICAgIC8vIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIC8vIGRpc3BsYXk6IGJsb2NrO1xyXG4gIH1cclxuICBcclxuICBcclxuICAvLy5kcmF3ZXIge1xyXG4gIC8vICBiYWNrZ3JvdW5kOiAjRjNGM0YzO1xyXG4gIC8vICAtLWJhY2tncm91bmQ6ICNGM0YzRjM7XHJcbiAgLy99XHJcbiAgLy9cclxuICAvLy5pb24tYm90dG9tLWRyYXdlci1zY3JvbGxhYmxlLWNvbnRlbnQge1xyXG4gIC8vICBiYWNrZ3JvdW5kOiAjRjNGM0YzICFpbXBvcnRhbnQ7XHJcbiAgLy99XHJcbiAgXHJcbiAgaW9uLWJvdHRvbS1kcmF3ZXIge1xyXG4gIFxyXG4gICAgLS1wYWRkaW5nOiAwICFpbXBvcnRhbnQ7XHJcbiAgICBwYWRkaW5nOiAwICFpbXBvcnRhbnQ7XHJcbiAgXHJcbiAgICAtLWJhY2tncm91bmQ6ICNGM0YzRjMgIWltcG9ydGFudDtcclxuICAgIGJhY2tncm91bmQ6ICNGM0YzRjMgIWltcG9ydGFudDtcclxuICBcclxuICAgIGlvbi1jb250ZW50IHtcclxuICAgICAgLS1iYWNrZ3JvdW5kOiAjRjNGM0YzICFpbXBvcnRhbnQ7XHJcbiAgICB9XHJcbiAgXHJcbiAgICBcclxuICB9XHJcbiAgICAgIC5zZWdtZW50LWJ0bntcclxuICAgICAgICBmb250LXNpemU6IDEwcHggIWltcG9ydGFudDtcclxuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgICAgXHJcblxyXG4gICAgICB9XHJcbiAgXHJcbiAgICAgIC5sYXRlYnlzdHlsZXtcclxuICAgICAgICBmbG9hdDogcmlnaHQ7IFxyXG4gICAgICAgIGZvbnQtc2l6ZTogMTBweDtcclxuICAgICAgICBjb2xvcjogIzNDNzhEQjtcclxuICAgICAgfVxyXG4gIFxyXG4gIC5pbWFnZWJ1dHRvbntcclxuICAgIGZsb2F0OnJpZ2h0O1xyXG4gICAgbWFyZ2luLXRvcDogMHB4O1xyXG4gICAgXHJcbiAgICBcclxuICB9XHJcbiAgLnBvaW50ZXJ7Y3Vyc29yOnBvaW50ZXJ9XHJcbiAgLmNoYXRidXR0b257XHJcbiAgICBmbG9hdDpyaWdodDtcclxuICAgIG1hcmdpbi10b3A6IDBweDtcclxuICAgIG1hcmdpbi1yaWdodDo1cHg7XHJcbiAgfVxyXG4gICJdfQ== */");

/***/ }),

/***/ "saI5":
/*!************************************************************!*\
  !*** ./src/app/analystoverview/design/design.component.ts ***!
  \************************************************************/
/*! exports provided: DesignComponent, DesginDataHelper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DesignComponent", function() { return DesignComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DesginDataHelper", function() { return DesginDataHelper; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_design_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./design.component.html */ "QNKs");
/* harmony import */ var _design_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./design.component.scss */ "ot8Z");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_api_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/api.service */ "yTNM");
/* harmony import */ var src_app_utilities_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/utilities.service */ "oTnF");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _ionic_native_launch_navigator_ngx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic-native/launch-navigator/ngx */ "fGQ8");
/* harmony import */ var ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ion-bottom-drawer */ "rFvw");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ionic/storage */ "e8h1");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var src_app_declinepage_declinepage_page__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! src/app/declinepage/declinepage.page */ "uPeJ");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! moment */ "wd/R");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var src_app_storage_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! src/app/storage.service */ "qkCY");
/* harmony import */ var src_app_networkdetect_service__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! src/app/networkdetect.service */ "UZ2B");
/* harmony import */ var _ionic_native_social_sharing_ngx__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @ionic-native/social-sharing/ngx */ "/XPu");
/* harmony import */ var src_app_email_model_email_model_page__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! src/app/email-model/email-model.page */ "+k72");



















let DesignComponent = class DesignComponent {
    constructor(utils, apiService, datePipe, storage, cdr, launchNavigator, formBuilder, route, router, modalController, storageService, network, socialsharing, social) {
        this.utils = utils;
        this.apiService = apiService;
        this.datePipe = datePipe;
        this.storage = storage;
        this.cdr = cdr;
        this.launchNavigator = launchNavigator;
        this.formBuilder = formBuilder;
        this.route = route;
        this.router = router;
        this.modalController = modalController;
        this.storageService = storageService;
        this.network = network;
        this.socialsharing = socialsharing;
        this.social = social;
        this.listOfDesignDataHelper = [];
        this.listOfDesignsData = [];
        this.options = {
            start: '',
            app: this.launchNavigator.APP.GOOGLE_MAPS
        };
        this.drawerState = ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_8__["DrawerState"].Bottom;
        this.listOfAssignees = [];
        this.designId = 0;
        this.showBottomDraw = false;
        this.myFiles = [];
        this.limit = 10;
        this.skip = 0;
        this.segments = 'requesttype=prelim&status=reviewassigned&status=reviewfailed&status=reviewpassed';
        const latestDate = new Date();
        this.today = datePipe.transform(latestDate, 'M/dd/yy');
        console.log('date', this.today);
        this.todaysdate = datePipe.transform(latestDate, 'yyyy-MM-dd');
        this.assignForm = this.formBuilder.group({
            assignedto: new _angular_forms__WEBPACK_IMPORTED_MODULE_9__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_9__["Validators"].required]),
            comment: new _angular_forms__WEBPACK_IMPORTED_MODULE_9__["FormControl"]('')
        });
    }
    ionViewDidEnter() {
        this.deactivateNetworkSwitch = this.network.networkSwitch.subscribe(data => {
            this.netSwitch = data;
            console.log(this.netSwitch);
        });
        this.network.networkDisconnect();
        this.network.networkConnect();
    }
    segmentChanged(event) {
        this.skip = 0;
        if (this.userData.role.type == 'qcinspector') {
            if (event.target.value == 'InReview') {
                this.segments = "requesttype=prelim&status=reviewassigned&status=reviewfailed&status=reviewpassed";
                // return this.segments;
            }
            else if (event.target.value == 'delivered') {
                this.segments = "requesttype=prelim&status=delivered";
            }
            this.getDesigns(null);
            // return this.segments;
        }
        // this.getsegmentdata(event.target.value);
        console.log((event.target.value));
        // console.log((event.target.value));
        // this.pending(event.target.value);
        // this.segments = event.target.value;
        //this.DesignRefreshSubscription = this.utils.getHomepageDesignRefresh().subscribe((result) => {
        //  this.getDesigns(null);
        //});
        //this.dataRefreshSubscription = this.utils.getDataRefresh().subscribe((result) => {
        // if(this.listOfDesigns != null && this.listOfDesigns.length > 0){
        //  this.formatDesignData(this.listOfDesigns);
        // }
        //});
    }
    ngOnInit() {
        this.userData = this.storageService.getUser();
        console.log(this.userData);
        // this.router.navigate(['homepage/design/pending']);
        // this.routeSubscription = this.router.events.subscribe((event) => {
        //   if (event instanceof NavigationEnd) {
        //     // Trick the Router into believing it's last link wasn't previously loaded
        //     if (this.router.url.indexOf('page') > -1) {
        //       this.router.navigated = false;
        //       let data = this.route.queryParams.subscribe((_res: any) => {
        //         console.log('Serach Term', _res);
        //         if (Object.keys(_res).length !== 0) {
        //           //  this.ApplysearchDesginAndSurvey(_res.serchTerm)
        //           this.filterData(_res.serchTerm);
        //         } else {
        //           // this.refreshSubscription = this.utils.getHomepageDesignRefresh().subscribe((result) => {
        //             // debugger;
        //             this.getDesign(null, true);
        //           // });
        //         }
        //       });
        //     }
        //   }
        // });
        this.DesignRefreshSubscription = this.utils.getHomepageDesignRefresh().subscribe((result) => {
            this.skip = 0;
            this.getDesigns(null);
        });
        this.dataRefreshSubscription = this.utils.getDataRefresh().subscribe((result) => {
            if (this.listOfDesigns != null && this.listOfDesigns.length > 0) {
                this.formatDesignData(this.listOfDesigns);
            }
        });
    }
    getDesigns(event) {
        //debugger;
        let showLoader = true;
        if (event != null && event !== undefined) {
            showLoader = false;
        }
        this.fetchPendingDesigns(event, showLoader);
    }
    fetchPendingDesigns(event, showLoader) {
        this.noDesignFound = "";
        console.log("inside fetch Designs");
        this.listOfDesigns = [];
        this.listOfDesignsHelper = [];
        this.utils.showLoadingWithPullRefreshSupport(showLoader, 'Getting Designs').then((success) => {
            this.apiService.getDesignSurveys(this.segments, this.limit, this.skip).subscribe((response) => {
                this.utils.hideLoadingWithPullRefreshSupport(showLoader).then(() => {
                    console.log(response);
                    if (response.length) {
                        this.formatDesignData(response);
                    }
                    else {
                        this.noDesignFound = "No Designs Found";
                    }
                    if (event !== null) {
                        event.target.complete();
                    }
                });
            }, responseError => {
                this.utils.hideLoadingWithPullRefreshSupport(showLoader).then(() => {
                    if (event !== null) {
                        event.target.complete();
                    }
                    const error = responseError.error;
                    this.utils.errorSnackBar(error.message[0].messages[0].message);
                });
            });
        });
    }
    // formatDesignData(records : DesginDataModel[]){
    //   this.overdue=[];
    //   this.listOfDesigns = this.fillinDynamicData(records);
    //   console.log(this.listOfDesigns);
    //   const tempData: DesginDataHelper[] = [];
    //         this.listOfDesigns.forEach((designItem:any,i) => {
    //           console.log(i);
    //           if (tempData.length === 0) {
    //             this.sDatePassed(designItem.deliverydate,i);
    //             const listOfDesign = new DesginDataHelper();
    //             listOfDesign.date = this.datePipe.transform(designItem.deliverydate, 'M/dd/yy');
    //               listOfDesign.lateby = this.overdue;
    //             listOfDesign.listOfDesigns.push(designItem);
    //             tempData.push(listOfDesign);
    //             console.log(tempData);
    //           } else {
    //             let added = false;
    //             tempData.forEach((DesignList) => {
    //               // DesignList['listOfDesigns'].forEach(element=>{
    //               //   console.log(element.deliverydate,":::::::::::::");
    //               //   this.sDatePassed(element.deliverydate);
    //               // })
    //               if (!added) {
    //                 if (DesignList.date === this.datePipe.transform(designItem.deliverydate, 'M/dd/yy')) {
    //                   DesignList.listOfDesigns.push(designItem);
    //                   this.sDatePassed(designItem.deliverydate,i);
    //                   added = true;
    //                 }
    //               }
    //             });
    //             if (!added) {
    //               //debugger;
    //               this.sDatePassed(designItem.deliverydate,i);
    //               const listOfDesign = new DesginDataHelper();
    //               listOfDesign.date = this.datePipe.transform(designItem.deliverydate, 'M/dd/yy');
    //               listOfDesign.lateby = this.overdue;
    //               listOfDesign.listOfDesigns.push(designItem);
    //               tempData.push(listOfDesign);
    //               added = true;
    //             }
    //           }
    //         });
    //         this.listOfDesignsHelper = tempData.sort(function (a, b) {
    //           var dateA = new Date(a.date).getTime(),
    //             dateB = new Date(b.date).getTime();
    //           return dateB - dateA;
    //         });
    //         this.cdr.detectChanges();
    // }
    formatDesignData(records) {
        this.overdue = [];
        this.listOfDesigns = this.fillinDynamicData(records);
        console.log(this.listOfDesigns);
        const tempData = [];
        this.listOfDesigns.forEach((designItem, i) => {
            console.log(i);
            designItem.lateby = this.utils.getTheLatebyString(designItem.deliverydate);
            if (tempData.length === 0) {
                const listOfDesign = new DesginDataHelper();
                listOfDesign.date = this.datePipe.transform(designItem.updated_at, 'M/dd/yy');
                listOfDesign.listOfDesigns.push(designItem);
                tempData.push(listOfDesign);
                console.log(tempData);
                ;
            }
            else {
                let added = false;
                tempData.forEach((DesignList) => {
                    // DesignList['listOfDesigns'].forEach(element=>{
                    //   console.log(element.deliverydate,":::::::::::::");
                    //   this.sDatePassed(element.deliverydate);
                    // })
                    if (!added) {
                        if (DesignList.date === this.datePipe.transform(designItem.updated_at, 'M/dd/yy')) {
                            DesignList.listOfDesigns.push(designItem);
                            // this.sDatePassed(designItem.updated_at,i);
                            added = true;
                        }
                    }
                });
                if (!added) {
                    ;
                    // this.sDatePassed(designItem.updated_at,i);
                    const listOfDesign = new DesginDataHelper();
                    listOfDesign.date = this.datePipe.transform(designItem.updated_at, 'M/dd/yy');
                    listOfDesign.listOfDesigns.push(designItem);
                    tempData.push(listOfDesign);
                    added = true;
                }
            }
        });
        this.listOfDesignsHelper = tempData.sort(function (a, b) {
            var dateA = new Date(a.date).getTime(), dateB = new Date(b.date).getTime();
            return dateB - dateA;
        });
        this.cdr.detectChanges();
    }
    ngOnDestroy() {
        // this.refreshSubscription.unsubscribe();
        // this.routeSubscription.unsubscribe();
        this.dataRefreshSubscription.unsubscribe();
        this.DesignRefreshSubscription.unsubscribe();
        this.deactivateNetworkSwitch.unsubscribe();
        this.cdr.detach();
    }
    // filterData(records : DesginDataModel[]) {
    //   console.log(this.listOfDesignsData);
    //   this.listOfDesigns = this.fillinDynamicData(records);
    //   // let filterDataArray: any = this.listOfDesignsData.filter(x => x.id == serchTerm);
    //   const tempData: DesginDataHelper[] = [];
    //   this.listOfDesigns.forEach((desginItem) => {
    //     if (tempData.length === 0) {
    //       const listOfDesign = new DesginDataHelper();
    //       listOfDesign.date = this.datePipe.transform(desginItem.created_at, 'M/d/yy');
    //       listOfDesign.listOfDesigns.push(desginItem);
    //       tempData.push(listOfDesign);
    //     } else {
    //       let added = false;
    //       tempData.forEach((desginList) => {
    //         if (!added) {
    //           if (desginList.date === this.datePipe.transform(desginItem.created_at, 'M/d/yy')) {
    //             desginList.listOfDesigns.push(desginItem);
    //             added = true;
    //           }
    //         }
    //       });
    //       if (!added) {
    //         const listOfDesign = new DesginDataHelper();
    //         listOfDesign.date = this.datePipe.transform(desginItem.created_at, 'M/d/yy');
    //         listOfDesign.listOfDesigns.push(desginItem);
    //         tempData.push(listOfDesign);
    //         added = true;
    //         this.listOfDesignDataHelper.push(listOfDesign);
    //         console.log(this.listOfDesignDataHelper);
    //       }
    //     }
    //   });
    //   this.listOfDesignDataHelper = tempData;
    //   this.cdr.detectChanges();
    // }
    fillinDynamicData(records) {
        records.forEach((element) => {
            if (element.status != "delivered") {
                element.isoverdue = this.utils.isDatePassed(element.deliverydate);
            }
            else {
                element.isoverdue = false;
            }
            var reviewdate = new Date(element.reviewstarttime);
            reviewdate.setMinutes(reviewdate.getMinutes() + 15);
            element.reviewremainingtime = this.utils.getRemainingTime(reviewdate.toString());
            element.lateby = this.utils.getTheLatebyString(element.deliverydate);
            element.formattedjobtype = this.utils.getJobTypeName(element.jobtype);
            this.storage.get('' + element.id).then((data) => {
                console.log(data);
                if (data) {
                    element.totalpercent = data.currentprogress;
                }
                else {
                    element.totalpercent = 0;
                }
            });
        });
        return records;
    }
    // getDesign(event, showLoader: boolean) {
    //   this.listOfDesignsData = [];
    //   this.listOfDesignDataHelper = [];
    //   this.utils.showLoadingWithPullRefreshSupport(showLoader, 'Getting designs').then((success) => {
    //     // debugger;
    //     this.apiService.getDesignSurveys(this.segments).subscribe((response:any) => {
    //       this.utils.hideLoadingWithPullRefreshSupport(showLoader).then((loaderHidden) => {
    //         // debugger;
    //         if (event !== null) {
    //           event.target.complete();
    //         }
    //         console.log(response, '>>');
    //         this.listOfDesignsData = response;
    //          response.forEach(element => {
    //             this.roleType = element.type;
    //         });;
    //         console.log(this.roleType);
    //         const tempData: DesginDataHelper[] = [];
    //         this.listOfDesignsData.forEach((desginItem) => {
    //           if (tempData.length === 0) {
    //             const listOfDesign = new DesginDataHelper();
    //             listOfDesign.date = this.datePipe.transform(desginItem.created_at, 'M/d/yy');
    //             listOfDesign.listOfDesigns.push(desginItem);
    //             tempData.push(listOfDesign);
    //           } else {
    //             let added = false;
    //             tempData.forEach((desginList) => {
    //               if (!added) {
    //                 if (desginList.date === this.datePipe.transform(desginItem.created_at, 'M/d/yy')) {
    //                   desginList.listOfDesigns.push(desginItem);
    //                   added = true;
    //                 }
    //               }
    //             });
    //             if (!added) {
    //               const listOfDesign = new DesginDataHelper();
    //               listOfDesign.date = this.datePipe.transform(desginItem.created_at, 'M/d/yy');
    //               listOfDesign.listOfDesigns.push(desginItem);
    //               tempData.push(listOfDesign);
    //               added = true;
    //               this.listOfDesignDataHelper.push(listOfDesign);
    //               console.log(this.listOfDesignDataHelper,"<<<<>>>>");
    //             }
    //           }
    //         });
    //         this.listOfDesignDataHelper = tempData;
    //         this.cdr.detectChanges();
    //       },responseError=>{
    //         this.utils.hideLoadingWithPullRefreshSupport(showLoader).then((loaderHidden) => {
    //           if (event !== null) {
    //             event.target.complete();
    //           }
    //           const error: ErrorModel = responseError.error;
    //           this.utils.errorSnackBar(error.message[0].messages[0].message);
    //         });
    //       });
    //     }, responseError => {
    //       this.utils.hideLoadingWithPullRefreshSupport(showLoader).then((loaderHidden) => {
    //         if (event !== null) {
    //           event.target.complete();
    //         }
    //         const error: ErrorModel = responseError.error;
    //         this.utils.errorSnackBar(error.message);
    //       });
    //     });
    //   }, (apiError) => {
    //     this.utils.hideLoadingWithPullRefreshSupport(showLoader).then(() => {
    //       if (event !== null) {
    //         event.target.complete();
    //       }
    //     });
    //   });
    // }
    openAddressOnMap(address, event) {
        event.stopPropagation();
        this.launchNavigator.navigate(address, this.options);
    }
    doInfinite($event) {
        this.skip = this.skip + 10;
        this.apiService.getDesignSurveys(this.segments, this.limit, this.skip).subscribe((response) => {
            console.log(response);
            if (response.length) {
                this.formatDesignData(response);
            }
            else {
                this.noDesignFound = "No Designs Found";
            }
            if (event !== null) {
                $event.target.complete();
            }
        }, (responseError) => {
            if (event !== null) {
                $event.target.complete();
            }
            const error = responseError.error;
            this.utils.errorSnackBar(error.message[0].messages[0].message);
        });
    }
    dismissBottomSheet() {
        console.log('this', this.drawerState);
        this.drawerState = ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_8__["DrawerState"].Bottom;
        this.utils.setBottomBarHomepage(true);
    }
    assignToDesigner() {
        console.log(this.designerData.createdby.id);
        if (this.assignForm.status === 'INVALID') {
            this.utils.errorSnackBar('Please select a designer');
        }
        else {
            var designstarttime = new Date();
            var additonalhours = 0;
            if (this.designerData.requesttype == "prelim") {
                additonalhours = this.selectedDesigner.jobcount * 2;
                designstarttime.setHours(designstarttime.getHours() + additonalhours);
            }
            else {
                additonalhours = this.selectedDesigner.jobcount * 6;
                designstarttime.setHours(designstarttime.getHours() + additonalhours);
            }
            var postData = {};
            if (this.designerData.createdby.id == this.userData.id) {
                if (this.selectedDesigner.company == this.userData.company) {
                    postData = {
                        designassignedto: this.selectedDesigner.id,
                        isoutsourced: "false",
                        status: "designassigned",
                        designstarttime: designstarttime
                    };
                }
                else {
                    postData = {
                        outsourcedto: this.selectedDesigner.id,
                        isoutsourced: "true",
                        status: "outsourced"
                    };
                }
            }
            else {
                postData = {
                    designassignedto: this.selectedDesigner.id,
                    status: "designassigned",
                    designstarttime: designstarttime
                };
            }
            this.utils.showLoading('Assigning').then(() => {
                this.apiService.updateDesignForm(postData, this.designId).subscribe((value) => {
                    this.utils.hideLoading().then(() => {
                        debugger;
                        console.log('reach ', value);
                        this.utils.showSnackBar('Design request has been assigned to' + ' ' + value.name + ' ' + 'successfully');
                        this.dismissBottomSheet();
                        this.showBottomDraw = false;
                        this.utils.setHomepageDesignRefresh(true);
                    });
                }, (error) => {
                    this.utils.hideLoading();
                    this.dismissBottomSheet();
                    this.showBottomDraw = false;
                });
            });
        }
    }
    openDesigners(id, designData) {
        console.log(designData);
        this.designerData = designData;
        if (this.listOfAssignees.length === 0) {
            this.utils.showLoading('Getting Designers').then(() => {
                this.apiService.getDesigners().subscribe(assignees => {
                    this.utils.hideLoading().then(() => {
                        this.listOfAssignees = [];
                        // this.listOfAssignees.push(this.utils.getDefaultAssignee(this.storage.getUserID()));
                        assignees.forEach(item => this.listOfAssignees.push(item));
                        console.log(this.listOfAssignees);
                        this.showBottomDraw = true;
                        this.designId = id;
                        this.utils.setBottomBarHomepage(false);
                        this.drawerState = ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_8__["DrawerState"].Docked;
                        this.assignForm.patchValue({
                            assignedto: 0
                        });
                    });
                }, (error) => {
                    this.utils.hideLoading().then(() => {
                        this.utils.errorSnackBar('Some error occurred. Please try again later');
                    });
                });
            });
        }
        else {
            this.designId = id;
            this.utils.setBottomBarHomepage(false);
            this.drawerState = ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_8__["DrawerState"].Docked;
            this.assignForm.patchValue({
                assignedto: 0
            });
        }
    }
    close() {
        if (this.showBottomDraw === true) {
            this.showBottomDraw = false;
            this.drawerState = ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_8__["DrawerState"].Bottom;
            this.utils.setBottomBarHomepage(true);
        }
        else {
            this.showBottomDraw = true;
        }
    }
    refreshDesigns(event) {
        this.skip = 0;
        let showLoader = true;
        if (event !== null && event !== undefined) {
            showLoader = false;
        }
        this.fetchPendingDesigns(event, showLoader);
    }
    accept(id, data) {
        let status = {
            status: data
        };
        this.apiService.updateDesignForm(status, id).subscribe((res) => {
            this.getDesigns(null);
        });
    }
    decline(id) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const modal = yield this.modalController.create({
                component: src_app_declinepage_declinepage_page__WEBPACK_IMPORTED_MODULE_13__["DeclinepagePage"],
                cssClass: 'my-custom-modal-css',
                componentProps: {
                    id: id
                },
            });
            modal.onDidDismiss().then((data) => {
                console.log(data);
                if (data.data.cancel == 'cancel') {
                }
                else {
                    this.getDesigns(null);
                }
            });
            // modal.dismiss(() => {
            //   debugger;
            //   this.getDesigns(null);
            // });
            return yield modal.present();
        });
    }
    sDatePassed(datestring, i) {
        var checkdate = moment__WEBPACK_IMPORTED_MODULE_14__(datestring, "YYYYMMDD");
        var todaydate = moment__WEBPACK_IMPORTED_MODULE_14__(new Date(), "YYYYMMDD");
        var lateby = todaydate.diff(checkdate, "days");
        this.overdue = lateby;
    }
    pending(value) {
        //debugger;
        if (this.userData.role.type == 'SuperAdmin') {
            value = "requesttype=prelim&status=created&status=outsourced&status=requestaccepted&status=requestdeclined";
        }
        else {
            value = "requesttype=prelim&status=created&status=outsourced&status=requestaccepted";
        }
    }
    gotoActivity(designData, event) {
        console.log(event);
        event.stopPropagation();
        this.router.navigate(['/activity' + '/' + designData.id + '/design']);
    }
    gotoDetails(designData, $event) {
        // $event.preventDefault();
        // $event.stopPropagation();
        this.router.navigate(['/design-details/' + designData.id]);
    }
    gotoChats(designData, event) {
        event.stopPropagation();
        this.router.navigate(['/chat/' + designData.chatid]);
    }
    getassignedata(asssignedata) {
        this.selectedDesigner = asssignedata;
    }
    shareWhatsapp(designData, event) {
        event.stopPropagation();
        this.socialsharing.share(designData.prelimdesign.url);
    }
    shareViaEmails(id, designData, event) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            event.stopPropagation();
            const modal = yield this.modalController.create({
                component: src_app_email_model_email_model_page__WEBPACK_IMPORTED_MODULE_18__["EmailModelPage"],
                cssClass: 'email-modal-css',
                componentProps: {
                    id: id,
                    designData: designData
                },
            });
            modal.onDidDismiss().then((data) => {
                console.log(data);
                if (data.data.cancel == 'cancel') {
                }
                else {
                    this.getDesigns(null);
                }
            });
            return yield modal.present();
        });
    }
    trackdesign(index, design) {
        return design.id;
    }
};
DesignComponent.ctorParameters = () => [
    { type: src_app_utilities_service__WEBPACK_IMPORTED_MODULE_5__["UtilitiesService"] },
    { type: src_app_api_service__WEBPACK_IMPORTED_MODULE_4__["ApiService"] },
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_6__["DatePipe"] },
    { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_11__["Storage"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ChangeDetectorRef"] },
    { type: _ionic_native_launch_navigator_ngx__WEBPACK_IMPORTED_MODULE_7__["LaunchNavigator"] },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_9__["FormBuilder"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_10__["ActivatedRoute"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_10__["Router"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_12__["ModalController"] },
    { type: src_app_storage_service__WEBPACK_IMPORTED_MODULE_15__["StorageService"] },
    { type: src_app_networkdetect_service__WEBPACK_IMPORTED_MODULE_16__["NetworkdetectService"] },
    { type: _ionic_native_social_sharing_ngx__WEBPACK_IMPORTED_MODULE_17__["SocialSharing"] },
    { type: _ionic_native_social_sharing_ngx__WEBPACK_IMPORTED_MODULE_17__["SocialSharing"] }
];
DesignComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-design',
        template: _raw_loader_design_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_design_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], DesignComponent);

class DesginDataHelper {
    constructor() {
        this.listOfDesigns = [];
    }
}


/***/ }),

/***/ "vjfi":
/*!***********************************************************!*\
  !*** ./src/app/analystoverview/analystoverview.page.scss ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".notification-icon {\n  width: 24px;\n  height: 24px;\n}\n\n.home {\n  font-size: 22px;\n  margin-left: 6px;\n}\n\n.notification-badge {\n  font-size: 10px;\n  margin-left: -15px;\n  margin-top: -20px;\n}\n\n.notification-padding {\n  position: relative;\n  padding: 8px;\n}\n\n.badge {\n  width: 18px;\n  height: 18px;\n  position: absolute;\n  top: 0;\n  right: 0;\n  background: #3c78d8;\n  color: white;\n  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.5);\n  border-radius: 50%;\n  font-size: 0.5em;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: 1px solid white;\n}\n\nion-searchbar.custom {\n  --background: none;\n  --box-shadow: none;\n  background: white;\n  border-radius: 0.5em;\n  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);\n  max-height: 40px;\n}\n\n.titleTab {\n  text-align: center;\n  color: #898989;\n}\n\n.titleBorder {\n  width: 70px;\n  border-bottom: 3px solid #D9726D;\n  border-radius: 2px;\n}\n\n.cardText {\n  margin: 0px;\n}\n\n.card_detail {\n  margin: 0px;\n  color: #3960B8;\n}\n\n.search_loc {\n  font-size: 14px;\n  color: #3960B8;\n}\n\n.search_text_div {\n  display: flex;\n  justify-content: space-between;\n}\n\n.survey_div {\n  border: 1px solid #FAE0C3;\n  padding: 6px;\n  background-color: #FAE0C3;\n  border-radius: 5px;\n}\n\n.nodata_div {\n  max-width: 290px !important;\n  width: 290px !important;\n}\n\n.search_text {\n  color: #9E9E9E;\n}\n\n.tab {\n  padding-top: 1em;\n  padding-bottom: 1em;\n  padding-bottom: 1em;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.bottom-bar {\n  margin: 8px;\n  border-radius: 50px;\n  box-shadow: 0 -2px 8px 0 rgba(0, 0, 0, 0.1);\n  border: 2px solid white;\n  background: #FFFAEB;\n}\n\n.tabText {\n  margin-left: 8px;\n  font-size: 1em;\n}\n\n.tab-icon {\n  width: 24px;\n  height: 24px;\n}\n\n.fab-position {\n  bottom: 48px;\n}\n\nion-fab-button {\n  --border-width: 2px;\n  --border-style: solid;\n  --box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.3);\n  --border-color: white;\n  --background: #3c78d8;\n}\n\nion-tab-bar {\n  --border: none;\n}\n\nion-tab-button {\n  font-size: 1em;\n  --color: #9E9E9E;\n  --color-selected: #3c78d8;\n}\n\nion-tab-button[aria-selected=true] {\n  border-bottom: 3px solid #3c78d8;\n  border-bottom-left-radius: 2px;\n  border-bottom-right-radius: 2px;\n}\n\n.searchbar_div {\n  box-shadow: 0 4px 3px 0 rgba(0, 0, 0, 0.1);\n  border-radius: 4px;\n  margin-top: -24px;\n  width: 94%;\n  margin-left: 5px;\n  background: white;\n  max-width: 94%;\n}\n\n.profile-icon {\n  width: 50px;\n  height: 50px;\n  margin-right: 3px;\n  margin-left: -7px;\n}\n\n.history-name {\n  font-size: 16px;\n  color: #787574;\n}\n\n.history-add {\n  color: #CFCBCA;\n  font-size: 14px;\n}\n\n.assign {\n  font-size: 14px;\n  color: #878382;\n}\n\n.pointer {\n  cursor: pointer;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXGFuYWx5c3RvdmVydmlldy5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUE7RUFDRSxXQUFBO0VBQ0EsWUFBQTtBQURGOztBQUlBO0VBQ0UsZUFBQTtFQUNBLGdCQUFBO0FBREY7O0FBSUE7RUFDRSxlQUFBO0VBQ0Esa0JBQUE7RUFDQSxpQkFBQTtBQURGOztBQUlBO0VBQ0Usa0JBQUE7RUFDQSxZQUFBO0FBREY7O0FBSUE7RUFDRSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0EsTUFBQTtFQUNBLFFBQUE7RUFDQSxtQkFBQTtFQUNBLFlBQUE7RUFDQSwwQ0FBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLHVCQUFBO0FBREY7O0FBSUE7RUFDRSxrQkFBQTtFQUNBLGtCQUFBO0VBQ0EsaUJBQUE7RUFDQSxvQkFBQTtFQUNBLDBDQUFBO0VBQ0EsZ0JBQUE7QUFERjs7QUFLQTtFQUNFLGtCQUFBO0VBQ0EsY0FBQTtBQUZGOztBQU1BO0VBQ0UsV0FBQTtFQUNBLGdDQUFBO0VBQ0Esa0JBQUE7QUFIRjs7QUFNQTtFQUNFLFdBQUE7QUFIRjs7QUFNQTtFQUNFLFdBQUE7RUFDQSxjQUFBO0FBSEY7O0FBTUE7RUFDRSxlQUFBO0VBQ0EsY0FBQTtBQUhGOztBQU1BO0VBQ0UsYUFBQTtFQUNBLDhCQUFBO0FBSEY7O0FBTUE7RUFDRSx5QkFBQTtFQUNBLFlBQUE7RUFDQSx5QkFBQTtFQUNBLGtCQUFBO0FBSEY7O0FBTUE7RUFDRSwyQkFBQTtFQUNBLHVCQUFBO0FBSEY7O0FBTUE7RUFDRSxjQUFBO0FBSEY7O0FBYUE7RUFDRSxnQkFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtBQVZGOztBQWFBO0VBQ0UsV0FBQTtFQUNBLG1CQUFBO0VBQ0EsMkNBQUE7RUFDQSx1QkFBQTtFQUNBLG1CQUFBO0FBVkY7O0FBYUE7RUFDRSxnQkFBQTtFQUNBLGNBQUE7QUFWRjs7QUFhQTtFQUNFLFdBQUE7RUFDQSxZQUFBO0FBVkY7O0FBYUE7RUFDRSxZQUFBO0FBVkY7O0FBYUE7RUFDRSxtQkFBQTtFQUNBLHFCQUFBO0VBQ0EsNENBQUE7RUFDQSxxQkFBQTtFQUNBLHFCQUFBO0FBVkY7O0FBYUE7RUFDRSxjQUFBO0FBVkY7O0FBYUE7RUFDRSxjQUFBO0VBQ0EsZ0JBQUE7RUFDQSx5QkFBQTtBQVZGOztBQWFBO0VBQ0UsZ0NBQUE7RUFDQSw4QkFBQTtFQUNBLCtCQUFBO0FBVkY7O0FBYUE7RUFDRSwwQ0FBQTtFQUNBLGtCQUFBO0VBQ0EsaUJBQUE7RUFDQSxVQUFBO0VBQ0EsZ0JBQUE7RUFDQSxpQkFBQTtFQUNBLGNBQUE7QUFWRjs7QUFjQTtFQUNFLFdBQUE7RUFDQSxZQUFBO0VBQ0EsaUJBQUE7RUFDQSxpQkFBQTtBQVhGOztBQWVBO0VBQ0UsZUFBQTtFQUNBLGNBQUE7QUFaRjs7QUFlQTtFQUNFLGNBQUE7RUFDRSxlQUFBO0FBWko7O0FBZUE7RUFDSSxlQUFBO0VBQ0EsY0FBQTtBQVpKOztBQWVBO0VBQ0UsZUFBQTtBQVpGIiwiZmlsZSI6ImFuYWx5c3RvdmVydmlldy5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuXHJcbi5ub3RpZmljYXRpb24taWNvbiB7XHJcbiAgd2lkdGg6IDI0cHg7XHJcbiAgaGVpZ2h0OiAyNHB4O1xyXG59XHJcblxyXG4uaG9tZXtcclxuICBmb250LXNpemU6IDIycHg7XHJcbiAgbWFyZ2luLWxlZnQ6IDZweDtcclxufVxyXG5cclxuLm5vdGlmaWNhdGlvbi1iYWRnZSB7XHJcbiAgZm9udC1zaXplOiAxMHB4O1xyXG4gIG1hcmdpbi1sZWZ0OiAtMTVweDtcclxuICBtYXJnaW4tdG9wOiAtMjBweDtcclxufVxyXG5cclxuLm5vdGlmaWNhdGlvbi1wYWRkaW5nIHtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgcGFkZGluZzogOHB4O1xyXG59XHJcblxyXG4uYmFkZ2Uge1xyXG4gIHdpZHRoOiAxOHB4O1xyXG4gIGhlaWdodDogMThweDtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgdG9wOiAwO1xyXG4gIHJpZ2h0OiAwO1xyXG4gIGJhY2tncm91bmQ6ICMzYzc4ZDg7XHJcbiAgY29sb3I6IHdoaXRlO1xyXG4gIGJveC1zaGFkb3c6IDAgMXB4IDNweCAwIHJnYmEoMCwgMCwgMCwgMC41KTtcclxuICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgZm9udC1zaXplOiAwLjVlbTtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgYm9yZGVyOiAxcHggc29saWQgd2hpdGU7XHJcbn1cclxuXHJcbmlvbi1zZWFyY2hiYXIuY3VzdG9tIHtcclxuICAtLWJhY2tncm91bmQ6IG5vbmU7XHJcbiAgLS1ib3gtc2hhZG93OiBub25lO1xyXG4gIGJhY2tncm91bmQ6IHdoaXRlO1xyXG4gIGJvcmRlci1yYWRpdXM6IDAuNWVtO1xyXG4gIGJveC1zaGFkb3c6IDAgMXB4IDNweCAwIHJnYmEoMCwgMCwgMCwgMC4xKTtcclxuICBtYXgtaGVpZ2h0OiA0MHB4O1xyXG59XHJcblxyXG5cclxuLnRpdGxlVGFiIHtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgY29sb3I6ICM4OTg5ODk7XHJcbiAgLy8gICAgIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCAjRDk3MjZEO1xyXG59XHJcblxyXG4udGl0bGVCb3JkZXIge1xyXG4gIHdpZHRoOiA3MHB4O1xyXG4gIGJvcmRlci1ib3R0b206IDNweCBzb2xpZCAjRDk3MjZEO1xyXG4gIGJvcmRlci1yYWRpdXM6IDJweDtcclxufVxyXG5cclxuLmNhcmRUZXh0IHtcclxuICBtYXJnaW46IDBweDtcclxufVxyXG5cclxuLmNhcmRfZGV0YWlsIHtcclxuICBtYXJnaW46IDBweDtcclxuICBjb2xvcjogIzM5NjBCODtcclxufVxyXG5cclxuLnNlYXJjaF9sb2Mge1xyXG4gIGZvbnQtc2l6ZTogMTRweDtcclxuICBjb2xvcjogIzM5NjBCODtcclxufVxyXG5cclxuLnNlYXJjaF90ZXh0X2RpdiB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbn1cclxuXHJcbi5zdXJ2ZXlfZGl2IHtcclxuICBib3JkZXI6IDFweCBzb2xpZCAjRkFFMEMzO1xyXG4gIHBhZGRpbmc6IDZweDtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkFFMEMzO1xyXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcclxufVxyXG5cclxuLm5vZGF0YV9kaXZ7XHJcbiAgbWF4LXdpZHRoOiAyOTBweCAhaW1wb3J0YW50O1xyXG4gIHdpZHRoOiAyOTBweCAhaW1wb3J0YW50O1xyXG59XHJcblxyXG4uc2VhcmNoX3RleHQge1xyXG4gIGNvbG9yOiAjOUU5RTlFO1xyXG59XHJcblxyXG4vLy5pb24tdGFiLWJhci50YWJzdHlsZSB7XHJcbi8vICAgIC0tYmFja2dyb3VuZDogbm9uZTtcclxuLy8gICAgLS1ib3gtc2hhZG93OiBub25lO1xyXG4vLyAgICBib3gtc2hhZG93OiAwIDFweCAzcHggMCByZ2JhKDAsIDAsIDAsIDAuNSk7XHJcbi8vICAgIGJhY2tncm91bmQ6ICNGRkZBRUI7XHJcbi8vfVxyXG5cclxuLnRhYiB7XHJcbiAgcGFkZGluZy10b3A6IDFlbTtcclxuICBwYWRkaW5nLWJvdHRvbTogMWVtO1xyXG4gIHBhZGRpbmctYm90dG9tOiAxZW07XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG59XHJcblxyXG4uYm90dG9tLWJhciB7XHJcbiAgbWFyZ2luOiA4cHg7XHJcbiAgYm9yZGVyLXJhZGl1czogNTBweDtcclxuICBib3gtc2hhZG93OiAwIC0ycHggOHB4IDAgcmdiYSgwLCAwLCAwLCAwLjEpO1xyXG4gIGJvcmRlcjogMnB4IHNvbGlkIHdoaXRlO1xyXG4gIGJhY2tncm91bmQ6ICNGRkZBRUI7XHJcbn1cclxuXHJcbi50YWJUZXh0IHtcclxuICBtYXJnaW4tbGVmdDogOHB4O1xyXG4gIGZvbnQtc2l6ZTogMWVtO1xyXG59XHJcblxyXG4udGFiLWljb24ge1xyXG4gIHdpZHRoOiAyNHB4O1xyXG4gIGhlaWdodDogMjRweDtcclxufVxyXG5cclxuLmZhYi1wb3NpdGlvbiB7XHJcbiAgYm90dG9tOiA0OHB4O1xyXG59XHJcblxyXG5pb24tZmFiLWJ1dHRvbiB7XHJcbiAgLS1ib3JkZXItd2lkdGg6IDJweDtcclxuICAtLWJvcmRlci1zdHlsZTogc29saWQ7XHJcbiAgLS1ib3gtc2hhZG93OiAwIDBweCA4cHggMCByZ2JhKDAsIDAsIDAsIDAuMyk7XHJcbiAgLS1ib3JkZXItY29sb3I6IHdoaXRlO1xyXG4gIC0tYmFja2dyb3VuZDogIzNjNzhkODtcclxufVxyXG5cclxuaW9uLXRhYi1iYXIge1xyXG4gIC0tYm9yZGVyOiBub25lO1xyXG59XHJcblxyXG5pb24tdGFiLWJ1dHRvbiB7XHJcbiAgZm9udC1zaXplOiAxZW07XHJcbiAgLS1jb2xvcjogIzlFOUU5RTtcclxuICAtLWNvbG9yLXNlbGVjdGVkOiAjM2M3OGQ4O1xyXG59XHJcblxyXG5pb24tdGFiLWJ1dHRvblthcmlhLXNlbGVjdGVkPXRydWVdIHtcclxuICBib3JkZXItYm90dG9tOiAzcHggc29saWQgIzNjNzhkODtcclxuICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiAycHg7XHJcbiAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDJweDtcclxufVxyXG5cclxuLnNlYXJjaGJhcl9kaXZ7XHJcbiAgYm94LXNoYWRvdzogMCA0cHggM3B4IDAgcmdiYSgwLCAwLCAwLCAwLjEpO1xyXG4gIGJvcmRlci1yYWRpdXM6IDRweDtcclxuICBtYXJnaW4tdG9wOiAtMjRweDtcclxuICB3aWR0aDogOTQlO1xyXG4gIG1hcmdpbi1sZWZ0OiA1cHg7XHJcbiAgYmFja2dyb3VuZDogd2hpdGU7XHJcbiAgbWF4LXdpZHRoOiA5NCU7XHJcbn1cclxuXHJcblxyXG4ucHJvZmlsZS1pY29ue1xyXG4gIHdpZHRoOiA1MHB4O1xyXG4gIGhlaWdodDogNTBweDtcclxuICBtYXJnaW4tcmlnaHQ6IDNweDtcclxuICBtYXJnaW4tbGVmdDogLTdweDtcclxuIFxyXG59XHJcblxyXG4uaGlzdG9yeS1uYW1le1xyXG4gIGZvbnQtc2l6ZTogMTZweDsgXHJcbiAgY29sb3I6ICM3ODc1NzQ7XHJcbn1cclxuXHJcbi5oaXN0b3J5LWFkZHtcclxuICBjb2xvcjogI0NGQ0JDQTtcclxuICAgIGZvbnQtc2l6ZTogMTRweDtcclxufVxyXG5cclxuLmFzc2lnbntcclxuICAgIGZvbnQtc2l6ZTogMTRweDtcclxuICAgIGNvbG9yOiAjODc4MzgyO1xyXG59XHJcblxyXG4ucG9pbnRlcntcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbn1cclxuIl19 */");

/***/ }),

/***/ "wt3f":
/*!*******************************************************************!*\
  !*** ./src/app/analystoverview/analystoverview-routing.module.ts ***!
  \*******************************************************************/
/*! exports provided: AnalystoverviewPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnalystoverviewPageRoutingModule", function() { return AnalystoverviewPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _analystoverview_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./analystoverview.page */ "PJ6l");
/* harmony import */ var _design_design_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./design/design.component */ "saI5");
/* harmony import */ var _survey_survey_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./survey/survey.component */ "huC7");
/* harmony import */ var src_app_analystoverview_permitdesign_permitdesign_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/analystoverview/permitdesign/permitdesign.component */ "+Z2m");







const routes = [
    {
        path: '',
        component: _analystoverview_page__WEBPACK_IMPORTED_MODULE_3__["AnalystoverviewPage"],
        children: [
            {
                path: 'design',
                //loadChildren: () => import('./design/design.component').then( m => m.DesignComponent)
                component: _design_design_component__WEBPACK_IMPORTED_MODULE_4__["DesignComponent"]
            },
            {
                path: 'survey',
                //loadChildren: () => import('./survey/survey.component').then( m => m.SurveyComponent)
                component: _survey_survey_component__WEBPACK_IMPORTED_MODULE_5__["SurveyComponent"]
            },
            {
                path: 'permitdesign',
                //loadChildren: () => import('./survey/survey.component').then( m => m.SurveyComponent)
                component: src_app_analystoverview_permitdesign_permitdesign_component__WEBPACK_IMPORTED_MODULE_6__["PermitdesignComponent"]
            }
        ]
    }
];
let AnalystoverviewPageRoutingModule = class AnalystoverviewPageRoutingModule {
};
AnalystoverviewPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], AnalystoverviewPageRoutingModule);



/***/ })

}]);
//# sourceMappingURL=analystoverview-analystoverview-module.js.map