(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~homepage-homepage-module~surveyoroverview-surveyoroverview-module"],{

/***/ "3Z0f":
/*!*****************************************************!*\
  !*** ./src/app/homepage/survey/survey.component.ts ***!
  \*****************************************************/
/*! exports provided: SurveyComponent, SurveyDataHelper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SurveyComponent", function() { return SurveyComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SurveyDataHelper", function() { return SurveyDataHelper; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_survey_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./survey.component.html */ "GBAM");
/* harmony import */ var _survey_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./survey.component.scss */ "YsmE");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_utilities_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/utilities.service */ "oTnF");
/* harmony import */ var src_app_api_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/api.service */ "yTNM");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _ionic_native_launch_navigator_ngx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic-native/launch-navigator/ngx */ "fGQ8");
/* harmony import */ var ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ion-bottom-drawer */ "rFvw");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _contants__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../contants */ "6qqZ");
/* harmony import */ var src_app_storage_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! src/app/storage.service */ "qkCY");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @ionic/storage */ "e8h1");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! moment */ "wd/R");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var src_app_networkdetect_service__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! src/app/networkdetect.service */ "UZ2B");
/* harmony import */ var _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @cometchat-pro/cordova-ionic-chat */ "ujHh");
/* harmony import */ var _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(_cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var src_app_email_model_email_model_page__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! src/app/email-model/email-model.page */ "+k72");
/* harmony import */ var _ionic_native_social_sharing_ngx__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @ionic-native/social-sharing/ngx */ "/XPu");
/* harmony import */ var _ionic_native_file_transfer_ngx__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @ionic-native/file-transfer/ngx */ "B7Rs");
/* harmony import */ var _ionic_native_file_ngx__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @ionic-native/file/ngx */ "FAH8");
/* harmony import */ var _ionic_native_android_permissions_ngx__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @ionic-native/android-permissions/ngx */ "WOgW");
/* harmony import */ var _ionic_native_local_notifications_ngx__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @ionic-native/local-notifications/ngx */ "Bg0J");
























let SurveyComponent = class SurveyComponent {
    constructor(utils, alertController, socialsharing, modalController, apiService, datePipe, navController, launchNavigator, formBuilder, cdr, renderer, router, route, storage, storageService, network, platform, file, androidPermissions, transfer, localnotification, el) {
        this.utils = utils;
        this.alertController = alertController;
        this.socialsharing = socialsharing;
        this.modalController = modalController;
        this.apiService = apiService;
        this.datePipe = datePipe;
        this.navController = navController;
        this.launchNavigator = launchNavigator;
        this.formBuilder = formBuilder;
        this.cdr = cdr;
        this.renderer = renderer;
        this.router = router;
        this.route = route;
        this.storage = storage;
        this.storageService = storageService;
        this.network = network;
        this.platform = platform;
        this.file = file;
        this.androidPermissions = androidPermissions;
        this.transfer = transfer;
        this.localnotification = localnotification;
        this.el = el;
        this.listOfSurveyData = [];
        this.listOfSurveyDataHelper = [];
        this.options = {
            start: '',
            app: this.launchNavigator.APP.GOOGLE_MAPS
        };
        this.drawerState = ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_9__["DrawerState"].Bottom;
        this.surveyId = 0;
        this.showBottomDraw = false;
        this.listOfAssignees = [];
        this.segments = 'status=created&status=outsourced&status=requestaccepted';
        this.updatechat_id = false;
        const latestDate = new Date();
        this.today = datePipe.transform(latestDate, 'M/dd/yy');
        console.log('date', this.today);
        this.assignForm = this.formBuilder.group({
            assignedto: new _angular_forms__WEBPACK_IMPORTED_MODULE_10__["FormControl"](0, [_angular_forms__WEBPACK_IMPORTED_MODULE_10__["Validators"].required]),
            status: new _angular_forms__WEBPACK_IMPORTED_MODULE_10__["FormControl"]('surveyassigned', [_angular_forms__WEBPACK_IMPORTED_MODULE_10__["Validators"].required])
        });
    }
    segmentChanged(event) {
        this.segments = event.target.value;
        // this.getSurveys(event);
        // this.surveyRefreshSubscription = this.utils.getHomepageSurveyRefresh().subscribe((result) => {
        this.getSurveys(null);
        // });
        // this.dataRefreshSubscription = this.utils.getDataRefresh().subscribe((result) => {
        //   if(this.listOfSurveyData != null && this.listOfSurveyData.length > 0){
        //     this.formatSurveyData(this.listOfSurveyData);
        //   }
        // });
    }
    ionViewDidEnter() {
        this.makeDirectory();
        this.network.networkDisconnect();
        this.network.networkConnect();
        this.deactivateNetworkSwitch = this.network.networkSwitch.subscribe(data => {
            this.netSwitch = data;
            console.log(this.netSwitch);
            //  this.scrollTo();
        });
        // this.surveyRefreshSubscription = this.utils.getHomepageSurveyRefresh().subscribe((result) => {
        //   this.getSurveys(null);
        // });
        // this.dataRefreshSubscription = this.utils.getDataRefresh().subscribe((result) => {
        //   if(this.listOfSurveyData != null && this.listOfSurveyData.length > 0){
        //     this.formatSurveyData(this.listOfSurveyData);
        //   }
        // });
        // debugger;
        // this.routeSubscription.unsubscribe();
    }
    ngOnInit() {
        this.userData = this.storageService.getUser();
        console.log(this.userData);
        this.setupCometChat();
        this.surveyRefreshSubscription = this.utils.getHomepageSurveyRefresh().subscribe((result) => {
            this.getSurveys(null);
        });
    }
    // ngOnInit() {
    //   // this.filterData(this.filterDataArray);
    //   // this.routeSubscription = this.router.events.subscribe((event) => {
    //   //   if (event instanceof NavigationEnd) {
    //   //     // Trick the Router into believing it's last link wasn't previously loaded
    //   //     if (this.router.url.indexOf('page') > -1) {
    //   //       this.router.navigated = false;
    //   //       let data = this.route.queryParams.subscribe((_res: any) => {
    //   //         console.log('Serach Term', _res);
    //   //         if (Object.keys(_res).length !== 0) {
    //   //           //  this.ApplysearchDesginAndSurvey(_res.serchTerm)
    //   //           this.filterData(_res.serchTerm);
    //   //         } else {
    //   //           // this.refreshSubscription = this.utils.getHomepageDesignRefresh().subscribe((result) => {
    //   //             // debugger;
    //   //             this.getSurveys(null);
    //   //           // });
    //   //         }
    //   //       });
    //   //     }
    //   //   }
    //   // });
    //   // console.log('inside init');
    //   // this.routeSubscription = this.router.events.subscribe((event) => {
    //   //   if (event instanceof NavigationEnd) {
    //   //     // Trick the Router into believing it's last link wasn't previously loaded
    //   //     if (this.router.url.indexOf('page') > -1) {
    //   //       this.router.navigated = false;
    //   //       const data = this.route.queryParams.subscribe((_res: any) => {
    //   //         console.log('Search Term', _res);
    //   //         if (Object.keys(_res).length !== 0) {
    //   //           //  this.ApplysearchDesginAndSurvey(_res.serchTerm)
    //   //           this.filterData(_res.serchTerm);
    //   //         } else {
    //   //           this.surveyRefreshSubscription = this.utils.getHomepageSurveyRefresh().subscribe((result) => {
    //   //             this.getSurveys(null);
    //   //           });
    //   //         }
    //   //       });
    //   //     }
    //   //   }
    //   // });
    // }
    getSurveys(event) {
        let showLoader = true;
        if (event != null && event !== undefined) {
            showLoader = false;
        }
        this.fetchPendingSurveys(event, showLoader);
    }
    fetchPendingSurveys(event, showLoader) {
        this.listOfSurveyData = [];
        this.listOfSurveyDataHelper = [];
        console.log("data", this.segments);
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
    // scrollTo() {
    //   setTimeout(() => {
    //     console.log(this.el.nativeElement)
    //     let sectionOffset = document.getElementById('todaydate');
    //     console.log("sectionOffset == ", sectionOffset);
    //     sectionOffset.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
    //   }, 2000)
    // }
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
        this.listOfSurveyDataHelper = tempData;
        // this.listOfSurveyDataHelper = tempData.sort(function (a, b) {
        //   var dateA = new Date(a.date).getTime(),
        //     dateB = new Date(b.date).getTime();
        //   return dateB - dateA;
        // });
        this.cdr.detectChanges();
    }
    fillinDynamicData(records) {
        records.forEach(element => {
            element.formattedjobtype = this.utils.getJobTypeName(element.jobtype);
            element.recordupdatedon = this.utils.formatDateInTimeAgo(element.updated_at);
            this.storage.get('' + element.id).then((data) => {
                console.log(data);
                if (data) {
                    element.totalpercent = data.currentprogress;
                    console.log(element);
                }
                else {
                    element.totalpercent = 0;
                    console.log(element);
                }
            });
        });
        return records;
    }
    ngOnDestroy() {
        this.deactivateNetworkSwitch.unsubscribe();
        this.surveyRefreshSubscription.unsubscribe();
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
    openAddressOnMap(address, event) {
        event.stopPropagation();
        this.launchNavigator.navigate(address, this.options);
    }
    dismissBottomSheet() {
        console.log("hello cancel");
        this.drawerState = ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_9__["DrawerState"].Bottom;
        this.utils.setBottomBarHomepage(true);
        this.listOfAssignees = [];
        // this.assignForm.get('comment').setValue("");
    }
    assignToSurveyor() {
        debugger;
        console.log("hello");
        console.log(this.surveyData.createdby.id);
        if (this.assignForm.status === 'INVALID' && (this.surveyData.status === 'reviewassigned' || this.surveyData.status === 'reviewfailed' || this.surveyData.status === 'reviewpassed')) {
            this.utils.errorSnackBar('Please select a analyst');
        }
        else if (this.assignForm.status === 'INVALID') {
            this.utils.errorSnackBar('Please select a surveyor');
        }
        else if (this.reviewAssignedTo != null && (this.selectedDesigner.id == this.reviewAssignedTo.id)) {
            this.utils.errorSnackBar("This survey request has been already assigned to" + " " + this.selectedDesigner.firstname + " " + this.selectedDesigner.lastname);
        }
        else {
            var surveystarttime = new Date();
            var milisecond = surveystarttime.getTime();
            var additonalhours = 0;
            if (this.surveyData.requesttype == "prelim") {
                console.log(parseInt(this.selectedDesigner.jobcount));
                additonalhours = parseInt(this.selectedDesigner.jobcount) * 2;
                surveystarttime.setHours(surveystarttime.getHours() + additonalhours);
            }
            else {
                additonalhours = parseInt(this.selectedDesigner.jobcount) * 6;
                surveystarttime.setHours(surveystarttime.getHours() + additonalhours);
            }
            console.log(this.selectedDesigner);
            var postData = {};
            if (this.surveyData.createdby.id == this.userData.id) {
                debugger;
                if (this.selectedDesigner.parent.id == this.userData.parent.id) {
                    if (this.selectedDesigner.role.type == "qcinspector") {
                        postData = {
                            reviewassignedto: this.selectedDesigner.id,
                            status: "reviewassigned",
                            reviewstarttime: milisecond
                        };
                    }
                    if (this.selectedDesigner.role.type == "surveyors") {
                        postData = {
                            assignedto: this.selectedDesigner.id,
                            isoutsourced: "false",
                            status: "surveyassigned",
                            surveystarttime: surveystarttime
                        };
                    }
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
                if (this.selectedDesigner.role.type == "surveyors") {
                    postData = {
                        assignedto: this.selectedDesigner.id,
                        status: "surveyassigned",
                        surveystarttime: surveystarttime
                    };
                }
                if (this.selectedDesigner.role.type == "qcinspector") {
                    postData = {
                        reviewassignedto: this.selectedDesigner.id,
                        status: "reviewassigned",
                        reviewstarttime: milisecond
                    };
                }
            }
            this.utils.showLoading('Assigning').then(() => {
                this.apiService.updateSurveyForm(postData, this.surveyId).subscribe((value) => {
                    this.utils.hideLoading().then(() => {
                        ;
                        this.createNewDesignChatGroup(value);
                        console.log('reach ', value);
                        this.utils.showSnackBar('Survey request has been assigned to' + ' ' + this.selectedDesigner.firstname + " " + this.selectedDesigner.lastname + ' ' + 'successfully');
                        this.dismissBottomSheet();
                        this.showBottomDraw = false;
                        this.utils.sethomepageSurveyRefresh(true);
                    });
                }, (error) => {
                    this.utils.hideLoading();
                    this.dismissBottomSheet();
                    this.showBottomDraw = false;
                });
            });
        }
    }
    generatePdf(id, event) {
        event.stopPropagation();
        this.utils.showLoading('Generating PDF').then(() => {
            this.apiService.generatePdf(id).subscribe(res => {
                this.utils.hideLoading();
                console.log(res);
                this.utils.sethomepageSurveyRefresh(true);
            }, err => {
                this.utils.hideLoading();
                this.utils.showSnackBar('Error in generating PDF');
            });
        });
    }
    openAnalysts(id, surveyData) {
        this.listOfAssignees = [];
        console.log(this.listOfAssignees);
        this.surveyData = surveyData;
        console.log(surveyData);
        this.reviewAssignedTo = surveyData.reviewassignedto;
        console.log(this.reviewAssignedTo);
        if (this.listOfAssignees.length === 0) {
            this.utils.showLoading('Getting Analysts').then(() => {
                this.apiService.getAnalysts().subscribe(assignees => {
                    this.utils.hideLoading().then(() => {
                        this.listOfAssignees = [];
                        // this.listOfAssignees.push(this.utils.getDefaultAssignee(this.storage.getUserID()));
                        assignees.forEach(item => this.listOfAssignees.push(item));
                        console.log(this.listOfAssignees);
                        this.showBottomDraw = true;
                        this.surveyId = id;
                        this.utils.setBottomBarHomepage(false);
                        this.drawerState = ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_9__["DrawerState"].Docked;
                        this.assignForm.patchValue({
                            assignedto: ''
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
            this.surveyId = id;
            this.utils.setBottomBarHomepage(false);
            this.drawerState = ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_9__["DrawerState"].Docked;
            this.assignForm.patchValue({
                assignedto: ''
            });
        }
    }
    openSurveyors(id, surveyData, event) {
        event.stopPropagation();
        this.listOfAssignees = [];
        console.log(surveyData);
        console.log(this.listOfAssignees);
        this.surveyData = surveyData;
        this.reviewAssignedTo = surveyData.assignedto;
        if (this.listOfAssignees.length === 0) {
            this.utils.showLoading('Getting Surveyors').then(() => {
                this.apiService.getSurveyors().subscribe(assignees => {
                    this.utils.hideLoading().then(() => {
                        this.listOfAssignees = [];
                        // this.listOfAssignees.push(this.utils.getDefaultAssignee(this.storage.getUserID()));
                        assignees.forEach(item => this.listOfAssignees.push(item));
                        console.log(this.listOfAssignees);
                        this.showBottomDraw = true;
                        this.surveyId = id;
                        this.utils.setBottomBarHomepage(false);
                        this.drawerState = ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_9__["DrawerState"].Docked;
                        this.assignForm.patchValue({
                            assignedto: ''
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
            this.surveyId = id;
            this.utils.setBottomBarHomepage(false);
            this.drawerState = ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_9__["DrawerState"].Docked;
            this.assignForm.patchValue({
                assignedto: ''
            });
        }
    }
    selfAssign(id, surveyData) {
        var designstarttime = new Date();
        var milisecond = designstarttime.getTime();
        var postData = {};
        postData = {
            reviewassignedto: this.userData.id,
            status: "reviewassigned",
            reviewstarttime: milisecond
        };
        this.utils.showLoading('Assigning').then(() => {
            this.apiService.updateSurveyForm(postData, id).subscribe((value) => {
                this.utils.hideLoading().then(() => {
                    ;
                    console.log('reach ', value);
                    this.utils.showSnackBar('Design request has been assigned to you successfully');
                    this.utils.sethomepageSurveyRefresh(true);
                });
            }, (error) => {
                this.utils.hideLoading();
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
        var checkdate = moment__WEBPACK_IMPORTED_MODULE_15__(datestring, "YYYYMMDD");
        var todaydate = moment__WEBPACK_IMPORTED_MODULE_15__(new Date(), "YYYYMMDD");
        var lateby = todaydate.diff(checkdate, "days");
        this.overdue = lateby;
        console.log(this.overdue, ">>>>>>>>>>>>>>>>>.");
    }
    getassignedata(asssignedata) {
        this.selectedDesigner = asssignedata;
    }
    raisepermit(data, event) {
        event.stopPropagation();
        let objToSend = {
            queryParams: {
                surveyData: data,
                tabsDisabled: true,
                nonEditableField: true
            },
            skipLocationChange: false,
            fragment: 'top'
        };
        console.log(objToSend);
        this.router.navigate(['/permitschedule/'], {
            state: { productdetails: objToSend }
        });
    }
    openreviewPassed(id, designData) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.surveyId = id;
            const alert = yield this.alertController.create({
                cssClass: 'alertClass',
                header: 'Confirm!',
                message: 'Would you like to  Add Comments!!',
                inputs: [{ name: 'comment',
                        id: 'comment',
                        type: 'textarea',
                        placeholder: 'Enter Comment' }
                ],
                buttons: [
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: (blah) => {
                            console.log('Confirm Cancel: blah');
                        }
                    }, {
                        text: 'deliver',
                        handler: (alertData) => {
                            var postData = {};
                            if (alertData.comment != "") {
                                postData = {
                                    status: "delivered",
                                    comments: alertData.comment,
                                };
                            }
                            else {
                                postData = {
                                    status: "delivered",
                                };
                            }
                            console.log(postData);
                            this.apiService.updateSurveyForm(postData, this.surveyId).subscribe((value) => {
                                this.utils.hideLoading().then(() => {
                                    ;
                                    console.log('reach ', value);
                                    this.utils.showSnackBar('Survey request has been delivered successfully');
                                    this.utils.setHomepageDesignRefresh(true);
                                });
                            }, (error) => {
                                this.utils.hideLoading();
                                ;
                            });
                        }
                    }
                ]
            });
            yield alert.present();
        });
    }
    createNewDesignChatGroup(survey) {
        var GUID = survey.chatid;
        var address = survey.address.substring(0, 60);
        var groupName = survey.name + "_" + address;
        var groupType = _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_17__["CometChat"].GROUP_TYPE.PRIVATE;
        var password = "";
        var group = new _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_17__["CometChat"].Group(GUID, groupName, groupType, password);
        _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_17__["CometChat"].createGroup(group).then(group => {
            let membersList = [
                new _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_17__["CometChat"].GroupMember("" + survey.createdby.id, _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_17__["CometChat"].GROUP_MEMBER_SCOPE.ADMIN),
                new _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_17__["CometChat"].GroupMember("" + this.userData.id, _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_17__["CometChat"].GROUP_MEMBER_SCOPE.ADMIN)
            ];
            _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_17__["CometChat"].addMembersToGroup(group.getGuid(), membersList, []).then(response => {
                // if(design.requesttype == "permit"){
                //   let postdata={
                //     chatid:GUID
                //   // }
                // }
                // this.apiService.updateSurveyForm(postdata,this.surveyId).subscribe(res=>{
                // console.log(res);
                // this.chatid=res.chatid;
                // console.log(this.chatid);
                this.updatechat_id = true;
                this.addUserToGroupChat(GUID);
                // })
                // this.updateItemInList(LISTTYPE.NEW, design);
                // }else{
                // this.updateItemInPermitList(LISTTYPE.NEW, design);
                // }
            }, error => {
            });
        }, error => {
        });
    }
    addUserToGroupChat(GUID) {
        var userscope = _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_17__["CometChat"].GROUP_MEMBER_SCOPE.PARTICIPANT;
        // userscope = CometChat.GROUP_MEMBER_SCOPE.ADMIN;
        let membersList = [
            new _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_17__["CometChat"].GroupMember("" + this.selectedDesigner.id, userscope)
        ];
        _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_17__["CometChat"].addMembersToGroup(GUID, membersList, []).then(response => {
        }, error => {
        });
    }
    setupCometChat() {
        let userId = this.storageService.getUserID();
        const user = new _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_17__["CometChat"].User(userId);
        user.setName(this.storageService.getUser().firstname + ' ' + this.storageService.getUser().lastname);
        const appSetting = new _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_17__["CometChat"].AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(_contants__WEBPACK_IMPORTED_MODULE_12__["COMETCHAT_CONSTANTS"].REGION).build();
        _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_17__["CometChat"].init(_contants__WEBPACK_IMPORTED_MODULE_12__["COMETCHAT_CONSTANTS"].APP_ID, appSetting).then(() => {
            console.log('Initialization completed successfully');
            // if(this.utilities.currentUserValue != null){
            // You can now call login function.
            _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_17__["CometChat"].login(userId, _contants__WEBPACK_IMPORTED_MODULE_12__["COMETCHAT_CONSTANTS"].API_KEY).then((user) => {
                console.log('Login Successful:', { user });
            }, error => {
                console.log('Login failed with exception:', { error });
            });
            // }
        }, error => {
            console.log('Initialization failed with error:', error);
        });
    }
    close() {
        if (this.showBottomDraw === true) {
            this.showBottomDraw = false;
            this.drawerState = ion_bottom_drawer__WEBPACK_IMPORTED_MODULE_9__["DrawerState"].Bottom;
            this.utils.setBottomBarHomepage(true);
        }
        else {
            this.showBottomDraw = true;
        }
    }
    shareWhatsapp(designData) {
        this.socialsharing.share(designData.prelimdesign.url);
    }
    shareViaEmails(id, designData) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
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
                    this.getSurveys(null);
                }
            });
            return yield modal.present();
        });
    }
    assignedTo(surveyData, event) {
        event.stopPropagation();
        let postData = {
            assignedto: this.userData.id,
            status: "surveyinprocess"
        };
        this.apiService.updateSurveyForm(postData, surveyData.id).subscribe(res => {
            console.log(res);
        });
        this.router.navigate(['/camera/' + surveyData.id + '/' + surveyData.jobtype + '/' + surveyData.city + '/' + surveyData.state + '/' + surveyData.latitude + '/' + surveyData.longitude]);
    }
    makeDirectory() {
        this.platform.ready().then(() => {
            if (this.platform.is('ios')) {
                this.storageDirectory = this.file.externalRootDirectory + '/Wattmonk/';
            }
            else if (this.platform.is('android')) {
                this.storageDirectory = this.file.externalRootDirectory + '/Wattmonk/';
            }
            else {
                this.storageDirectory = this.file.cacheDirectory;
            }
        });
    }
    designDownload(designData) {
        let pdf = designData.surveypdf == null ? '' : designData.surveypdf;
        this.platform.ready().then(() => {
            this.file.resolveDirectoryUrl(this.storageDirectory).then(resolvedDirectory => {
                this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then(result => console.log('Has permission?', result.hasPermission), err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE));
                this.file.checkFile(resolvedDirectory.nativeURL, pdf.url).then(data => {
                    console.log(data);
                    if (data == true) {
                    }
                    else {
                        console.log('not found!');
                        throw { code: 1, message: 'NOT_FOUND_ERR' };
                    }
                }).catch((err) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                    console.log('Error occurred while checking local files:');
                    console.log(err);
                    if (err.code == 1) {
                        const fileTransfer = this.transfer.create();
                        // this.utils.showLoading('Downloading').then(()=>{
                        fileTransfer.download(url, this.storageDirectory + pdf.url).then((entry) => {
                            // this.utils.hideLoading().then(()=>{
                            console.log('download complete: ' + entry.toURL());
                            this.utils.showSnackBar("Survey File Downloaded Successfully");
                            // this.clickSub = this.localnotification.on('click').subscribe(data => {
                            //   console.log(data)
                            //   path;
                            // })
                            this.localnotification.schedule({ text: 'Survey File Downloaded Successfully', foreground: true, vibrate: true });
                            // }, (error) => {
                            //   // handle error
                            //   console.log(error);
                            // });
                        });
                        // })
                    }
                }));
            });
        });
        let dir_name = 'Wattmonk';
        let path = '';
        const url = designData.surveypdf.url;
        const fileTransfer = this.transfer.create();
        let result = this.file.createDir(this.file.externalRootDirectory, dir_name, true);
        result.then((resp) => {
            path = resp.toURL();
            console.log(path);
            fileTransfer.download(url, path + designData.surveypdf.hash + designData.surveypdf.ext).then((entry) => {
                console.log('download complete: ' + entry.toURL());
                this.utils.showSnackBar("Survey File Downloaded Successfully");
                // this.clickSub = this.localnotification.on('click').subscribe(data => {
                //   console.log(data)
                //   path;
                // })
                this.localnotification.schedule({ text: 'Downloaded Successfully', foreground: true, vibrate: true });
            }, (error) => {
                // handle error
            });
        });
    }
    resumeSurvey(surveyData, event) {
        event.stopPropagation();
        this.router.navigate(['/camera/' + surveyData.id + '/' + surveyData.jobtype + '/' + surveyData.city + '/' + surveyData.state + '/' + surveyData.latitude + '/' + surveyData.longitude]);
    }
    gotoActivity(surveyData, event) {
        console.log(event);
        event.stopPropagation();
        this.router.navigate(['/activity' + '/' + surveyData.id + '/survey']);
    }
    gotoDetails(surveyData, $event) {
        // $event.preventDefault();
        // $event.stopPropagation();
        this.router.navigate(['/survey-detail/' + surveyData.id]);
    }
};
SurveyComponent.ctorParameters = () => [
    { type: src_app_utilities_service__WEBPACK_IMPORTED_MODULE_4__["UtilitiesService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_7__["AlertController"] },
    { type: _ionic_native_social_sharing_ngx__WEBPACK_IMPORTED_MODULE_19__["SocialSharing"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_7__["ModalController"] },
    { type: src_app_api_service__WEBPACK_IMPORTED_MODULE_5__["ApiService"] },
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_6__["DatePipe"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_7__["NavController"] },
    { type: _ionic_native_launch_navigator_ngx__WEBPACK_IMPORTED_MODULE_8__["LaunchNavigator"] },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_10__["FormBuilder"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ChangeDetectorRef"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Renderer2"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_11__["Router"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_11__["ActivatedRoute"] },
    { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_14__["Storage"] },
    { type: src_app_storage_service__WEBPACK_IMPORTED_MODULE_13__["StorageService"] },
    { type: src_app_networkdetect_service__WEBPACK_IMPORTED_MODULE_16__["NetworkdetectService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_7__["Platform"] },
    { type: _ionic_native_file_ngx__WEBPACK_IMPORTED_MODULE_21__["File"] },
    { type: _ionic_native_android_permissions_ngx__WEBPACK_IMPORTED_MODULE_22__["AndroidPermissions"] },
    { type: _ionic_native_file_transfer_ngx__WEBPACK_IMPORTED_MODULE_20__["FileTransfer"] },
    { type: _ionic_native_local_notifications_ngx__WEBPACK_IMPORTED_MODULE_23__["LocalNotifications"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ElementRef"] }
];
SurveyComponent.propDecorators = {
    content: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"], args: ['content', { static: true },] }]
};
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

/***/ "GBAM":
/*!*********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/homepage/survey/survey.component.html ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-segment scrollable (ionChange)=\"segmentChanged($event)\"\r\n    value=\"status=created&status=outsourced&status=requestaccepted\">\r\n    <ion-segment-button value=\"status=created&status=outsourced&status=requestaccepted\">\r\n        <ion-label class=\"segment-btn\">New</ion-label>\r\n    </ion-segment-button>\r\n    <ion-segment-button value=\"status=surveyassigned&status=surveyinprocess\">\r\n        <ion-label class=\"segment-btn\">In Progress</ion-label>\r\n    </ion-segment-button>\r\n    <ion-segment-button value=\"status=surveycompleted\">\r\n        <ion-label class=\"segment-btn\">Completed</ion-label>\r\n    </ion-segment-button>\r\n    <!-- <ion-segment-button value=\"status=reviewassigned&status=reviewpassed&status=reviewfailed\">\r\n        <ion-label class=\"segment-btn\">Review</ion-label>\r\n    </ion-segment-button>\r\n    <ion-segment-button value=\"status=delivered\">\r\n        <ion-label class=\"segment-btn\">Delivered</ion-label>\r\n    </ion-segment-button> -->\r\n</ion-segment>\r\n\r\n<ion-content (click)=\"close()\" style=\"padding-bottom: 250px;\">\r\n    <ion-refresher slot=\"fixed\" (ionRefresh)=\"getSurveys($event)\">\r\n        <ion-refresher-content></ion-refresher-content>\r\n    </ion-refresher>\r\n    <ion-grid *ngIf=\"listOfSurveyDataHelper.length !== 0\">\r\n        <ion-row *ngFor=\"let item of listOfSurveyDataHelper;let i = index\">\r\n            <ion-col size=\"12\" class=\"ion-margin-top\">\r\n                            <span  class=\"ion-padding\" *ngIf=\"today === item.date\" id='todaydate' >\r\n                                Today\r\n                              </span>\r\n                        <span class=\"ion-padding\" *ngIf=\"today !== item.date\">\r\n                                  {{item.date | date: 'dd MMM yyyy'}}\r\n                            </span>\r\n                    </ion-col>\r\n            <ion-col *ngFor=\"let surveyData of item.listOfSurveys;let i = index \" size=\"12\">\r\n                <ion-card class=\"ion-no-padding custom-card ion-no-margin\" style=\"height: 100%;\" (click)=\"gotoDetails(surveyData,$event)\">\r\n                    <p class=\"customer-name\"><span  routerDirection=\"forward\">{{surveyData.name}}</span>\r\n                        <span fill=\"clear\" background-border=\"clear\"   (click)=\"gotoActivity(surveyData,$event)\"  class=\"imagebutton\"  size=\"small\"  ><img src=\"/assets/images/activitylist.png\" style=\"height: 20px;\" /></span>\r\n                    </p>\r\n                    <p style=\"margin:0px\">\r\n                        <span  routerDirection=\"forward\"\r\n                        class=\"chipdetail\" style=\"background-color: #1289A7;\"\r\n                        [routerLink]=\"['/design-details/',surveyData.id]\" routerDirection=\"forward\">\r\n                        {{utils.formatTimeInDisplayFormat(surveyData.datetime)}}\r\n                    </span>\r\n                        <span  routerDirection=\"forward\"\r\n                        *ngIf=\"surveyData.status=='surveyassigned'\" class=\"chipdetail\"\r\n                        style=\"background-color: #3C78D8;\"\r\n                        routerDirection=\"forward\">\r\n                        pending\r\n                    </span>\r\n                    <span  routerDirection=\"forward\"\r\n                        class=\"chipdetail\" style=\"background-color: rgb(246, 77, 10);\"\r\n                        *ngIf=\"surveyData.lateby > 0\">Overdue</span>\r\n                        <span class=\"chipdetail\" style=\"background-color: #1289A7;;\" *ngIf=\"surveyData.status == 'created'\">Unassigned</span>\r\n                    </p>\r\n                    <p style=\"margin:0px\">\r\n\r\n                        <span class=\"customer-email\"\r\n                            routerDirection=\"forward\">{{surveyData.email}}</span>\r\n                        <span *ngIf=\"surveyData.lateby > 1\" class=\"latebystyle\"><strong>Late by {{surveyData.lateby}}\r\n                                days</strong></span>\r\n                        <span *ngIf=\"surveyData.lateby == 1\" class=\"latebystyle\"><strong>Late by a day</strong></span>\r\n                    </p>\r\n                    <span class=\"recordupdatedon\">Updated {{surveyData.recordupdatedon}}</span>\r\n                    <a href=\"tel:{{surveyData.phonenumber}}\" style=\"text-decoration: none;\" class=\"z-100\">\r\n                        <span class=\"customer-phone\">{{surveyData?.phonenumber}}</span></a>\r\n                    <span class=\"customer-address z-100 m-0\"\r\n                        (click)=\"openAddressOnMap(surveyData.address,$event)\">{{(surveyData.address | slice:0:60) + (surveyData.address?.length > 60 ? '...' : '')}}</span>\r\n                    <p style=\"margin: 0px;\" class=\"ion-no-padding\" *ngIf=\"segments=='status=surveyassigned&status=surveyinprocess' || segments=='status=surveycompleted'\">\r\n                        <!-- <ion-col style=\"font-size: 0.8em;\"> -->\r\n                            <span><strong>Assigned to : {{surveyData.assignedto.firstname | titlecase}} {{surveyData.assignedto.lastname | titlecase}}</strong></span>\r\n                        <!-- </ion-col> -->\r\n                    </p>\r\n                    <ion-row style=\"margin-bottom: 8px;\"  class=\"m-0\">\r\n\r\n                        <span class=\"chipdetail\" style=\"background-color: #95afc0;\">{{surveyData.source}}</span>\r\n                        <span class=\"chipdetail\" style=\"background-color: #95afc0;align-self: center;\" >{{surveyData?.jobtype=='pvbattery' ? 'PV + Battery' : surveyData?.jobtype | uppercase}}</span>\r\n\r\n\r\n                    </ion-row>\r\n                    <ion-row class=\"ion-no-margin\">\r\n                        <ion-col><span\r\n                                *ngIf=\"surveyData.status == 'created' || (surveyData.status == 'requestaccepted' && userData.role.type !== 'clientsuperadmin') || surveyData.status=='requestdeclined'\"\r\n                                style=\"float:right !important;\" class=\"ion-text-end action-button-color z-100\"\r\n                                (click)=\"openSurveyors(surveyData.id,surveyData,$event)\">Assign</span>\r\n                            <!-- <ion-col size=\"auto\" class=\"ion-no-margin ion-no-padding\" *ngIf=\"today==item.date && userData.role.type =='surveyor'\"> -->\r\n                            <span\r\n                            *ngIf=\"surveyData.status == 'created' && userData.role.type !== 'clientsuperadmin'\"\r\n                                style=\"float:right !important;\" class=\"ion-text-end action-button-color z-100\" (click)=\"assignedTo(surveyData,$event)\">\r\n                                Start Survey &nbsp;\r\n                            </span>\r\n                            <!-- <span class=\"ion-text-end action-button-color\" >Start Survey</span> -->\r\n                        </ion-col>\r\n                        <!-- <ion-col></ion-col> -->\r\n                        <!-- <ion-col  size=\"auto\" class=\"ion-no-margin ion-no-padding\" style=\"margin-bottom: 5px;\"> -->\r\n\r\n                        <!-- <span *ngIf=\"surveyData.status == 'outsourced'\" style=\"float:right !important;\" class=\"ion-text-end action-button-color\" (click)=\"openSurveyors(surveyData.id)\"\r\n                        >Decline</span>\r\n                        <span *ngIf=\"surveyData.status == 'outsourced'\" style=\"float:right !important;\" class=\"ion-text-end action-button-color\" (click)=\"openSurveyors(surveyData.id)\"\r\n                        >Accept</span> -->\r\n                        <!-- <span style=\"float: right;\">\r\n                            <ng-container *ngIf=\"userData.role.type !=='clientsuperadmin'\">\r\n                            <ion-col size=\"8\"  *ngIf=\"surveyData.status == 'outsourced'\"  class=\"ion-text-end action-button-color z-100\" (click)=\"openSurveyors(surveyData.id,surveyData)\">\r\n                               Accept\r\n                            </ion-col>\r\n                            <ion-col size=\"4\" *ngIf=\"surveyData.status == 'outsourced'\"  class=\"ion-text-end action-button-color z-100\" (click)=\"openSurveyors(surveyData.id,surveyData)\">\r\n                            Decline\r\n                            </ion-col></ng-container>\r\n                        </span> -->\r\n                        <!-- <span *ngIf=\"surveyData.status == 'requestdeclined' && userData.role.type=='clientsuperadmin'\"style=\"float:right !important;\" class=\"ion-text-end action-button-color z-100\" (click)=\"openSurveyors(surveyData.id)\"\r\n                        >Reassign</span>\r\n                        </ion-col> -->\r\n\r\n                        <!-- <span *ngIf=\"(designData.isoutsourced=='true' && designData.outsourcedcompany=='Wattmonk' && (userData.role.type=='wattmonkadmins'|| userData.role.type=='superadmin')) || (designData.isoutsourced=='false' && designData.outsourcedcompany==null && (userData.role.type=='wattmonkadmins'|| userData.role.type=='superadmin'|| userData.role.type=='clientsuperadmin'))\" style=\"float:right !important;\" class=\"ion-text-end action-button-color\" (click)=\"openAnalysts(designData.id,designData)\"\r\n                            >Assign Review</span> -->\r\n\r\n                        <ion-col size=\"auto\" class=\"ion-no-margin ion-no-padding\"\r\n                            *ngIf=\"segments=='status=surveyassigned&status=surveyinprocess'\"\r\n                            style=\"margin-bottom: 5px;\">\r\n                            <span *ngIf=\"surveyData.status !=='surveyinprocess'\" class=\"ion-text-end action-button-color z-100\"\r\n                                (click)=\"openSurveyors(surveyData.id,surveyData,$event)\">Reassign</span>\r\n                                <span  class=\"ion-text-end action-button-color z-100\" style=\"float:right !important;\" *ngIf=\"userData.id==surveyData.assignedto?.id\" (click)=\"resumeSurvey(surveyData,$event)\"\r\n                                routerDirection=\"forward\">\r\n                                &nbsp;    Resume Survey\r\n                                </span>\r\n                        </ion-col>\r\n                        <ion-col size=\"auto\" class=\" \"\r\n                            *ngIf=\"segments=='status=surveycompleted'\" style=\"margin-bottom: 5px;\">\r\n                            <span *ngIf=\"surveyData.surveypdf!== null\" style=\"float:right !important;\" class=\"ion-text-end action-button-color\" (click)=\"designDownload(surveyData)\">\r\n                                <ion-icon name=\"cloud-download-outline\"></ion-icon></span>\r\n                            <span *ngIf=\"(userData.role.type=='clientsuperadmin' || userData.role.type=='clientadmin') && (surveyData.surveypdf== null)\" style=\"float:right !important;\" class=\"ion-text-end action-button-color\" (click)=\"generatePdf(surveyData.id,$event)\">\r\n                                    Generate PDF  &nbsp; &nbsp;</span>\r\n                                <span *ngIf=\"(userData.role.type=='clientsuperadmin' || userData.role.type=='clientadmin') && (surveyData.isdesignraised==false || surveyData.isdesignraised==null)\" style=\"float:right !important;\" class=\"ion-text-end action-button-color\" (click)=\"raisepermit(surveyData,$event)\">\r\n                                    Raise Permit  &nbsp; &nbsp;</span>\r\n\r\n                            <!-- <span *ngIf=\"userData.role.type !='clientsuperadmin'\" style=\"float:right !important;\"\r\n                                class=\"ion-text-end action-button-color\" (click)=\"selfAssign(surveyData.id,surveyData)\">\r\n                                &nbsp; Self Assign</span>\r\n                            <span *ngIf=\"userData.role.type!=='clientsuperadmin'\"\r\n                                class=\"ion-text-end action-button-color z-100\"\r\n                                (click)=\"openAnalysts(surveyData.id,surveyData)\">Assign Review</span> -->\r\n                        </ion-col>\r\n                        <ion-col size=\"auto\" class=\"ion-no-margin ion-no-padding\"\r\n                            *ngIf=\"segments=='status=reviewassigned&status=reviewpassed&status=reviewfailed'\">\r\n                            <span *ngIf=\"surveyData.status == 'reviewpassed'\"\r\n                                class=\"ion-text-end action-button-color z-100\"\r\n                                (click)=\"openreviewPassed(surveyData.id,surveyData)\">&nbsp; Deliver</span>\r\n                            <span style=\"float:right !important;\" class=\"ion-text-end action-button-color\"\r\n                                (click)=\"openAnalysts(surveyData.id,surveyData)\">&nbsp;Reassign Review</span>\r\n                        </ion-col>\r\n                                <span  class=\"ion-text-end action-button-color z-100\" style=\"float:right !important;\" *ngIf=\"userData.id==surveyData.assignedto?.id && surveyData.status=='reviewfailed'\"  [routerLink]=\"['/camera/' + surveyData.id + '/' + surveyData.jobtype + '/' + surveyData.city + '/' + surveyData.state + '/' + surveyData.latitude + '/' + surveyData.longitude]\"\r\n                                routerDirection=\"forward\">\r\n                                    Redo Survey\r\n                                </span>\r\n\r\n                        <ion-col *ngIf=\"segments=='status=delivered'\">\r\n                            <span style=\"float:right !important;\" class=\"ion-text-end action-button-color\"\r\n                                (click)=\"shareWhatsapp(surveyData)\">\r\n                                <ion-icon name=\"share-social-outline\"></ion-icon>\r\n                            </span>&nbsp;\r\n                            <span style=\"float:right !important;margin-right: 8px;\"\r\n                                class=\"ion-text-end action-button-color\"\r\n                                (click)=\"shareViaEmails(surveyData.id,surveyData)\">\r\n                                <ion-icon name=\"mail\"></ion-icon>\r\n                            </span>\r\n                        </ion-col>\r\n                    </ion-row>\r\n                    <ng-container  *ngIf=\"userData.id==surveyData.assignedto?.id && surveyData.status =='surveyassigned'\">\r\n                        <ion-progress-bar [value]=\"surveyData.totalpercent\" mode=\"ios\" color=\"success\" class=\"progress-bar-height\"></ion-progress-bar>\r\n                    </ng-container>\r\n                    <!-- <span class=\"ion-text-end timestamp\"  routerDirection=\"forward\">\r\n                                {{surveyData.datetime | date: 'hh:mm a'}}\r\n                            </span> -->\r\n\r\n                </ion-card>\r\n\r\n            </ion-col>\r\n        </ion-row>\r\n        <ion-row>\r\n            <ion-col size=\"12\" style=\"height: 100px;\">\r\n            </ion-col>\r\n        </ion-row>\r\n    </ion-grid>\r\n\r\n    <div *ngIf=\"listOfSurveyDataHelper.length === 0\" class=\"h-100 d-flex flex-column align-center justify-center\">\r\n        <!-- <div *ngIf=\"!netSwitch\"> -->\r\n        No Surveys found\r\n        <!-- </div> -->\r\n        <ion-img src=\"/assets/images/blank.png\" class=\"placeholder\"></ion-img>\r\n    </div>\r\n\r\n\r\n</ion-content>\r\n\r\n<ion-bottom-drawer [(state)]=\"drawerState\" [minimumHeight]=\"0\" [dockedHeight]=\"320\" [draggable]=\"false\" [disableDrag]=\"true\"\r\n    [shouldBounce]=\"false\" [distanceTop]=\"0\" class=\"drawer\" style=\"z-index: 9999 !important;\">\r\n    <form [formGroup]=\"assignForm\">\r\n        <ion-grid class=\"drawer\">\r\n            <ion-row>\r\n                <ion-col size=\"12\">\r\n                    <app-user-selector (assigneeData)=getassignedata($event) placeholder=\"Assign\"\r\n                        [assignees]=\"listOfAssignees\" formControlName=\"assignedto\"></app-user-selector>\r\n                </ion-col>\r\n            </ion-row>\r\n            <ion-row style=\"justify-content: flex-end;\">\r\n                <ion-col size=\"auto\" style=\"padding-top: 0px; margin-right: 6px;\">\r\n                    <ion-button class=\"buttom-drawer-button\" fill=\"clear\" (click)=\"assignToSurveyor()\">\r\n                        Confirm\r\n                    </ion-button>\r\n                </ion-col>\r\n                <ion-col size=\"auto\">\r\n                    <ion-button class=\"buttom-drawer-button-cancel\" fill=\"clear\" (click)=\"dismissBottomSheet()\">\r\n                        Cancel\r\n                    </ion-button>\r\n                </ion-col>\r\n            </ion-row>\r\n        </ion-grid>\r\n    </form>\r\n\r\n</ion-bottom-drawer>\r\n");

/***/ }),

/***/ "YsmE":
/*!*******************************************************!*\
  !*** ./src/app/homepage/survey/survey.component.scss ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".custom-card {\n  display: flex !important;\n  flex-direction: column !important;\n  background: white !important;\n  border-radius: 4px !important;\n  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.3) !important;\n  padding: 8px 12px;\n}\n\n.customer-name {\n  font-size: 1em;\n  color: #434343;\n  font-weight: bold;\n  display: table;\n  margin: 0px;\n}\n\n.customer-email {\n  font-size: 0.8em;\n  color: #B4B4B4;\n}\n\n.customer-phone {\n  font-size: 0.8em;\n  color: #4272B9;\n}\n\n.customer-address {\n  margin-top: 4px;\n  margin-bottom: 6px;\n  font-size: 0.8em;\n  color: #4272B9;\n}\n\n.timestamp {\n  font-size: 0.7em;\n}\n\n.chipdetail {\n  display: inline;\n  vertical-align: middle;\n  background-color: #95afc0;\n  font-size: 0.6em;\n  padding: 4px 10px;\n  border-radius: 10px;\n  text-align: center;\n  color: #fff;\n}\n\n.cssclass {\n  --max-height:100% !important;\n}\n\nion-bottom-drawer {\n  --padding: 0 !important;\n  padding: 0 !important;\n  --background: #F3F3F3 !important;\n  background: #F3F3F3 !important;\n}\n\nion-bottom-drawer ion-content {\n  --background: #F3F3F3 !important;\n}\n\n.segment-btn {\n  font-size: 10px !important;\n}\n\n.latebystyle {\n  float: right;\n  font-size: 10px;\n  color: #3C78DB;\n}\n\n.imagebutton {\n  float: right;\n  margin-top: 0px;\n}\n\n.alertClass {\n  background-color: wheat;\n}\n\n.recordupdatedon {\n  float: right;\n  font-size: 10px;\n  font-style: italic;\n  text-align: right;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFxzdXJ2ZXkuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSx3QkFBQTtFQUNBLGlDQUFBO0VBQ0EsNEJBQUE7RUFDQSw2QkFBQTtFQUNBLHFEQUFBO0VBQ0EsaUJBQUE7QUFDRjs7QUFFQTtFQUNFLGNBQUE7RUFDQSxjQUFBO0VBQ0EsaUJBQUE7RUFDQSxjQUFBO0VBQ0EsV0FBQTtBQUNGOztBQUVBO0VBQ0UsZ0JBQUE7RUFDQSxjQUFBO0FBQ0Y7O0FBRUE7RUFDRSxnQkFBQTtFQUNBLGNBQUE7QUFDRjs7QUFFQTtFQUNFLGVBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsY0FBQTtBQUNGOztBQU1BO0VBQ0UsZ0JBQUE7QUFIRjs7QUFPQTtFQUNFLGVBQUE7RUFDQSxzQkFBQTtFQUNBLHlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxpQkFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxXQUFBO0FBSkY7O0FBTUE7RUFDRSw0QkFBQTtBQUhGOztBQWtCQTtFQUVFLHVCQUFBO0VBQ0EscUJBQUE7RUFFQSxnQ0FBQTtFQUNBLDhCQUFBO0FBakJGOztBQW1CRTtFQUNFLGdDQUFBO0FBakJKOztBQXNCSTtFQUNFLDBCQUFBO0FBbkJOOztBQXNCSTtFQUNFLFlBQUE7RUFDQSxlQUFBO0VBQ0EsY0FBQTtBQW5CTjs7QUFzQkE7RUFDRSxZQUFBO0VBQ0EsZUFBQTtBQW5CRjs7QUFzQkE7RUFDRSx1QkFBQTtBQW5CRjs7QUFzQkE7RUFDRSxZQUFBO0VBQ0EsZUFBQTtFQUNBLGtCQUFBO0VBQ0EsaUJBQUE7QUFuQkYiLCJmaWxlIjoic3VydmV5LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmN1c3RvbS1jYXJkIHtcclxuICBkaXNwbGF5OiBmbGV4ICFpbXBvcnRhbnQ7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbiAhaW1wb3J0YW50O1xyXG4gIGJhY2tncm91bmQ6IHdoaXRlICFpbXBvcnRhbnQ7XHJcbiAgYm9yZGVyLXJhZGl1czogNHB4ICFpbXBvcnRhbnQ7XHJcbiAgYm94LXNoYWRvdzogMCAxcHggMnB4IDAgcmdiYSgwLCAwLCAwLCAwLjMpICFpbXBvcnRhbnQ7XHJcbiAgcGFkZGluZzogOHB4IDEycHg7XHJcbn1cclxuXHJcbi5jdXN0b21lci1uYW1lIHtcclxuICBmb250LXNpemU6IDFlbTtcclxuICBjb2xvcjogIzQzNDM0MztcclxuICBmb250LXdlaWdodDogYm9sZDtcclxuICBkaXNwbGF5OnRhYmxlO1xyXG4gIG1hcmdpbjogMHB4O1xyXG59XHJcblxyXG4uY3VzdG9tZXItZW1haWwge1xyXG4gIGZvbnQtc2l6ZTogMC44ZW07XHJcbiAgY29sb3I6ICNCNEI0QjQ7XHJcbn1cclxuXHJcbi5jdXN0b21lci1waG9uZSB7XHJcbiAgZm9udC1zaXplOiAwLjhlbTtcclxuICBjb2xvcjogIzQyNzJCOTtcclxufVxyXG5cclxuLmN1c3RvbWVyLWFkZHJlc3Mge1xyXG4gIG1hcmdpbi10b3A6IDRweDtcclxuICBtYXJnaW4tYm90dG9tOiA2cHg7XHJcbiAgZm9udC1zaXplOiAwLjhlbTtcclxuICBjb2xvcjogIzQyNzJCOTtcclxufVxyXG5cclxuLnBsYWNlaG9sZGVyIHtcclxuICAvLyB3aWR0aDogNTB2dyAhaW1wb3J0YW50O1xyXG59XHJcblxyXG4udGltZXN0YW1wIHtcclxuICBmb250LXNpemU6IDAuN2VtO1xyXG4gXHJcbn1cclxuXHJcbi5jaGlwZGV0YWlse1xyXG4gIGRpc3BsYXk6IGlubGluZTtcclxuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICM5NWFmYzA7XHJcbiAgZm9udC1zaXplOiAwLjZlbTtcclxuICBwYWRkaW5nOiA0cHggMTBweDtcclxuICBib3JkZXItcmFkaXVzOiAxMHB4O1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBjb2xvcjogI2ZmZjtcclxufVxyXG4uY3NzY2xhc3N7XHJcbiAgLS1tYXgtaGVpZ2h0IDoxMDAlICFpbXBvcnRhbnQ7XHJcbiAgLy8gcG9zaXRpb246IGFic29sdXRlO1xyXG4gIC8vIGRpc3BsYXk6IGJsb2NrO1xyXG59XHJcblxyXG5cclxuLy8uZHJhd2VyIHtcclxuLy8gIGJhY2tncm91bmQ6ICNGM0YzRjM7XHJcbi8vICAtLWJhY2tncm91bmQ6ICNGM0YzRjM7XHJcbi8vfVxyXG4vL1xyXG4vLy5pb24tYm90dG9tLWRyYXdlci1zY3JvbGxhYmxlLWNvbnRlbnQge1xyXG4vLyAgYmFja2dyb3VuZDogI0YzRjNGMyAhaW1wb3J0YW50O1xyXG4vL31cclxuXHJcbmlvbi1ib3R0b20tZHJhd2VyIHtcclxuXHJcbiAgLS1wYWRkaW5nOiAwICFpbXBvcnRhbnQ7XHJcbiAgcGFkZGluZzogMCAhaW1wb3J0YW50O1xyXG5cclxuICAtLWJhY2tncm91bmQ6ICNGM0YzRjMgIWltcG9ydGFudDtcclxuICBiYWNrZ3JvdW5kOiAjRjNGM0YzICFpbXBvcnRhbnQ7XHJcblxyXG4gIGlvbi1jb250ZW50IHtcclxuICAgIC0tYmFja2dyb3VuZDogI0YzRjNGMyAhaW1wb3J0YW50O1xyXG4gIH1cclxuXHJcbiAgXHJcbn1cclxuICAgIC5zZWdtZW50LWJ0bntcclxuICAgICAgZm9udC1zaXplOiAxMHB4ICFpbXBvcnRhbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgLmxhdGVieXN0eWxle1xyXG4gICAgICBmbG9hdDogcmlnaHQ7IFxyXG4gICAgICBmb250LXNpemU6IDEwcHg7XHJcbiAgICAgIGNvbG9yOiAjM0M3OERCO1xyXG4gICAgfVxyXG5cclxuLmltYWdlYnV0dG9ue1xyXG4gIGZsb2F0OnJpZ2h0O1xyXG4gIG1hcmdpbi10b3A6IDBweDtcclxufVxyXG5cclxuLmFsZXJ0Q2xhc3N7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hlYXQ7XHJcbn1cclxuXHJcbi5yZWNvcmR1cGRhdGVkb257XHJcbiAgZmxvYXQ6IHJpZ2h0O1xyXG4gIGZvbnQtc2l6ZTogMTBweDtcclxuICBmb250LXN0eWxlOiBpdGFsaWM7XHJcbiAgdGV4dC1hbGlnbjogcmlnaHQ7XHJcbn0iXX0= */");

/***/ })

}]);
//# sourceMappingURL=default~homepage-homepage-module~surveyoroverview-surveyoroverview-module.js.map