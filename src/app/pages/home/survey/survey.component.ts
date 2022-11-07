import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { FileTransfer, FileTransferObject } from '@awesome-cordova-plugins/file-transfer/ngx';
import { LaunchNavigator, LaunchNavigatorOptions } from '@awesome-cordova-plugins/launch-navigator/ngx';
import { ActionSheetController, AlertController, IonContent, ModalController, NavController, Platform } from '@ionic/angular';
import { DrawerState } from 'ion-bottom-drawer';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { CometChat } from '@cometchat-pro/cordova-ionic-chat';
import { AssigneeModel } from 'src/app/models/assignee.model';
import { ErrorModel } from 'src/app/models/error.model';
import { SurveyCount, SurveyDataModel } from 'src/app/models/survey.model';
import { User } from 'src/app/models/user.model';
import { ApiService } from 'src/app/services/api/api.service';
import { CustomEventsService } from 'src/app/services/custom-events/custom-events.service';
import { NetworkDetectService } from 'src/app/services/network-detect/network-detect.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { SurveyStorageModel } from 'src/app/models/survey-storage.model';
import { AssignPage } from '../../assign/assign.page';
import { COMETCHAT_CONSTANTS } from 'src/app/services/constants';
import { EmailModelPage } from '../../email-model/email-model.page';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { FilterPage } from '../../filter/filter.page';
import { Storage } from '@ionic/storage';
import { PaypalPaymentPage } from '../../paypal-payment/paypal-payment.page';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import {
    Downloader, DownloadRequest,
    NotificationVisibility,
} from '@ionic-native/downloader/ngx';
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { resolve } from 'dns';
import { rejects } from 'assert';

export class SurveyDataHelper {
    listOfSurveys: SurveyDataModel[];
    date: any;
    lateby: any;

    constructor() {
        this.listOfSurveys = [];
    }
}

@Component({
    selector: 'app-survey',
    templateUrl: './survey.component.html',
    styleUrls: ['./survey.component.scss'],
})
export class SurveyComponent implements OnInit {
    @ViewChild(IonContent, { static: false }) content: IonContent;
    indexoftodayrow = -1;
    public surveyid: number;
    public startSyncSurvey: boolean = false;

    public surveyUploadImageCount: string = '';
    listOfSurveyData: SurveyDataModel[] = [];
    listOfSurveyDataHelper: SurveyDataHelper[] = [];
    private surveyRefreshSubscription: Subscription;
    private dataRefreshSubscription: Subscription;

    today: any;

    options: LaunchNavigatorOptions = {
        start: '',
        app: this.launchNavigator.APP.GOOGLE_MAPS
    };
    drawerState = DrawerState.Bottom;
    surveyId = 0;
    showBottomDraw: boolean = false;
    isModalOpen: boolean = false;
    enableBackdropDismiss: boolean = false;
    showBackdrop: boolean = true;
    shouldPropagate: boolean = false;

    surveyData: any;
    selectedDesigner: User;
    assignForm: FormGroup;
    listOfAssignees: AssigneeModel[] = [];
    routeSubscription: Subscription;
    filterDataArray: SurveyDataModel[];
    // segments: any = 'status=created&status=outsourced&status=requestaccepted';
    segments: any = 'status=created';
    overdue: number;
    userData: User;
    netSwitch: any;
    reviewAssignedTo: any;
    chatid: any

    updatechat_id: boolean = false;
    deactivateNetworkSwitch: Subscription;
    storageDirectory: string;
    surveyCounts: SurveyCount = <SurveyCount>{};

    skip: number = 0;
    limit: number = 10;

    public userAccessRights: any = {};
    public noSurveyFound: string = '';

    public memberId: string;
    public isFilterApplied: boolean = false;
    public isClient: boolean = true;
    public getFilterData: any = {};
    public getuserData: any = {};

    isSurvey: boolean = false;
    public isWattmonkUser: boolean = false;
    public schedule: boolean = false;
    public schedulet: boolean = true;
    public dateExample = new Date().toISOString();
    public dateModal: any;
    my_datetime: any;
    datetime: string;
    data: any;
    public sourceType: string = '';
    isclientassigning: boolean = false;
    constructor(
        public utils: UtilitiesService,
        private alertController: AlertController,
        private socialsharing: SocialSharing,
        public modalController: ModalController,
        private apiService: ApiService,
        private datePipe: DatePipe,
        private navController: NavController,
        private launchNavigator: LaunchNavigator,
        private formBuilder: FormBuilder,
        private cdr: ChangeDetectorRef,
        private renderer: Renderer2,
        private router: Router,
        private route: ActivatedRoute,
        private storage: Storage,
        private storageService: StorageService,
        private network: NetworkDetectService,
        private platform: Platform,
        private file: File,
        private androidPermissions: AndroidPermissions,
        private transfer: FileTransfer,
        // private localnotification: LocalNotifications,
        private el: ElementRef,
        private actionSheetController: ActionSheetController,
        private eventService: CustomEventsService,
        private downloader: Downloader,
        private fileOpener: FileOpener,
        private http: HttpClient
    ) {
        const latestDate = new Date();
        this.today = moment(latestDate).utc().format('M/D/YY');
        // this.today = datePipe.transform(latestDate, 'M/dd/yy','0');

        this.assignForm = this.formBuilder.group({
            assignedto: new FormControl(0, [Validators.required]),
            status: new FormControl('assigned', [Validators.required])
        });

        // get access right permission data
        this.userAccessRights = this.utils.getUserAccessRights('survey');




        this.isClient = this.utils.isClient();
    }

    segmentChanged(event?) {
        console.log('segmentChanged');
        https://testorbit.wattmonk.com/api/usersurveys?id=1679&status=assigned&filter=delayed
        this.segments = event.target.value;

        if (this.segments == 'status=scheduled') {
            this.schedule = true;
            this.segments = 'status=assigned&filter=incomplete'
            this.schedulet = false;

        }

        else if
            (this.segments == 'status=created') {
            this.schedulet = true;
            this.segments = 'status=created'
            this.schedule = false;

        }
        else {
            this.schedule = false;
            this.schedulet = false;

        }

        // this.surveyRefreshSubscription = this.utils.getHomepageSurveyRefresh().subscribe((result) => {
        this.getSurveys(null, this.getFilterData.id);
        // });


    }
    SubsegmentChanged(event?) {
        console.log('SubsegmentChanged');
        https://testorbit.wattmonk.com/api/usersurveys?id=1679&status=assigned&filter=delayed
        this.segments = event.target.value;
        // this.getSurveys(event);

        // this.surveyRefreshSubscription = this.utils.getHomepageSurveyRefresh().subscribe((result) => {
        this.getSurveys(null, this.getFilterData.id);
        // });


    }

    SubsegmentChangedT(event?) {
        console.log('Subsegment Two Changed');
        https://testorbit.wattmonk.com/api/usersurveys?id=1679&status=assigned&filter=delayed
        this.segments = event.target.value;
        // this.getSurveys(event);

        // this.surveyRefreshSubscription = this.utils.getHomepageSurveyRefresh().subscribe((result) => {
        this.getSurveys(null, this.getFilterData.id);
        // });

    }

    ionViewDidEnter() {
        this.makeDirectory();
        this.network.networkDisconnect();
        this.network.networkConnect();
        this.deactivateNetworkSwitch = this.network.networkSwitch.subscribe(data => {
            this.netSwitch = data;

        })
        // this.surveyRefreshSubscription = this.utils.getHomepageSurveyRefresh().subscribe((result) => {

        //   this.getSurveys(null);
        // });

        // this.dataRefreshSubscription = this.utils.getDataRefresh().subscribe((result) => {
        //   if(this.listOfSurveyData != null && this.listOfSurveyData.length > 0){
        //     this.formatSurveyData(this.listOfSurveyData);
        //   }
        // });
        //  ;
        // this.routeSubscription.unsubscribe();
    }

    ngOnInit() {
        console.log(this.dateExample, "is date")
        this.dateExample = moment().format('YYYY-MM-DDTHH:mm:ss');
        this.datetime = moment().format('YYYY-MM-DDTHH:mm:ss');
        this.datetime = this.dateExample;
        console.log(this.datetime, "is formatted original datetime")
        // localStorage.setItem('datetime',this.datetime)
        this.my_datetime = this.datetime;
        console.log('ngOnInit');
        this.isWattmonkUser = this.utils.isWattmonkUser();
        this.userData = this.storageService.getUser();
        this.sourceType = this.storageService.getSourceType();

        this.setupCometChat();

        this.surveyRefreshSubscription = this.utils.getHomepageSurveyRefresh().subscribe((result) => {
            // this.getSurveys(null);
        });

        this.getSurveys(null);
        let unScb = this.eventService.subscribe('foo:get-survey', (data: any) => {
            console.log('in', data);

            if (data.getSurvey) {
                this.getSurveys(null);
                unScb.unsubscribe();
            }
        });



        console.log("list of survey data", this.listOfSurveyData)


    }
    getSurveycounts(creatorParentId = null): void {
        this.apiService.getSurveycounts(this.userData.id, creatorParentId, this.my_datetime).subscribe(res => {
            this.surveyCounts = res;
            console.log("survey counts", this.surveyCounts);
        });
    }

    modalOpen() {
        console.log('modalOpen');

        this.dateModal = true;
        console.log('this.dateModal', this.dateModal);

    }

    dismissModal() {
        console.log('dismissModal');

        this.dateModal = false;
        console.log('this.dateModal', this.dateModal);
    }

    changeDateTime(event) {
        this.my_datetime = moment(event.detail.value).format('YYYY-MM-DDTHH:mm:ss');
        console.log("selected time is", this.my_datetime)
        this.getSurveys();
        this.getSurveycounts();
        console.log("getting surveys")
        this.eventService.publish('update-admin-survey-date', {
            isUpdateSurveyDate: true,
            // date:this.datetime,
            C_date: this.my_datetime

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

    //   //         if (Object.keys(_res).length !== 0) {
    //   //           //  this.ApplysearchDesginAndSurvey(_res.serchTerm)

    //   //           this.filterData(_res.serchTerm);
    //   //         } else {
    //   //           // this.refreshSubscription = this.utils.getHomepageDesignRefresh().subscribe((result) => {
    //   //             //  ;
    //   //             this.getSurveys(null);
    //   //           // });
    //   //         }
    //   //       });
    //   //     }
    //   //   }
    //   // });

    //   // this.routeSubscription = this.router.events.subscribe((event) => {
    //   //   if (event instanceof NavigationEnd) {
    //   //     // Trick the Router into believing it's last link wasn't previously loaded
    //   //     if (this.router.url.indexOf('page') > -1) {
    //   //       this.router.navigated = false;
    //   //       const data = this.route.queryParams.subscribe((_res: any) => {

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
    getSurveys(event?, creatorParentId?: string) {
        console.log('getSurveys');
        this.getSurveycounts();
        this.skip = 0;
        let showLoader = true;
        if (event != null && event !== undefined) {
            showLoader = false;
        }
        this.fetchPendingSurveys(event, showLoader, creatorParentId);
    }

    fetchPendingSurveys(event, showLoader: boolean, creatorParentId?: string) {
        this.listOfSurveyData = [];
        this.listOfSurveyDataHelper = [];
        this.noSurveyFound = "";
        this.isSurvey = false;
        console.log('fetchPendingSurveys this.segments', this.segments);

        this.apiService.getSurveyorSurveys(this.segments, this.limit, this.skip, creatorParentId, this.my_datetime).subscribe(response => {
            this.content.scrollToTop(10);
            this.isSurvey = true;

            if (response.length) {
                this.formatSurveyData(response);
            } else {
                this.noSurveyFound = "No Survey Found";
            }
            if (event !== null) {
                event.target.complete();
            }

        }, responseError => {
            this.utils.hideLoadingWithPullRefreshSupport(showLoader).then(() => {
                if (event !== null) {
                    event.target.complete();
                }
                const error: ErrorModel = responseError.error;
                this.utils.errorSnackBar(error.message[0].messages[0].message);

            });
        });

    }

    doInfinite(event) {
        this.skip = this.skip + 10;
        this.apiService.getSurveyorSurveys(this.segments, this.limit, this.skip, this.getFilterData.id ? this.getFilterData.id : '', this.my_datetime).subscribe(response => {
            if (response.length) {
                this.formatSurveyData(response);
            } else {
                this.noSurveyFound = "No Survey Found";
            }
            if (event !== null) {
                event.target.complete();
            }
        }, responseError => {
            if (event !== null) {
                event.target.complete();
            }
            const error: ErrorModel = responseError.error;
            this.utils.errorSnackBar(error.message[0].messages[0].message);
        });
    }


    scrollTo() {
        setTimeout(() => {
            let todaytitleElement = document.getElementById('' + this.indexoftodayrow);
            todaytitleElement ? this.content.scrollToPoint(0, todaytitleElement.offsetTop, 500) : ''
        }, 2000)
    }


    // filterData(serchTerm: any) {

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

    formatSurveyData(records: SurveyDataModel[]) {
        let list: SurveyDataModel[];

        list = this.fillinDynamicData(records);
        console.log('list', list);

        list.forEach(element => {
            this.listOfSurveyData.push(element);
        })
        if (list.length > 0) {
            list.forEach((surveyItem: any, i) => {
                if (this.segments == 'status=completed') {
                    const listOfSurvey = new SurveyDataHelper();
                    listOfSurvey.date = moment(surveyItem.datetime).utc().format('M/D/YY');
                    listOfSurvey.listOfSurveys.push(surveyItem);
                    this.listOfSurveyDataHelper.push(listOfSurvey);
                } else {
                    const listOfSurvey = new SurveyDataHelper();
                    listOfSurvey.date = moment(surveyItem.datetime).utc().format('M/D/YY');
                    // listOfSurvey.date = this.datePipe.transform(surveyItem.datetime, 'M/dd/yy','0');
                    listOfSurvey.listOfSurveys.push(surveyItem);
                    this.listOfSurveyDataHelper.push(listOfSurvey);
                }
            });
            this.cdr.detectChanges();
        }

        // comment on 20220311
        // let list: SurveyDataModel[];
        // list = this.fillinDynamicData(records);
        // list.forEach(element => {
        //     this.listOfSurveyData.push(element);
        // });
        // const tempData: SurveyDataHelper[] = [];
        // this.listOfSurveyData.forEach((surveyItem, i) => {
        //     this.sDatePassed(surveyItem.datetime, i);
        //     surveyItem.lateby = this.overdue;
        //     if (this.segments == 'status=completed') {
        //         const listOfSurvey = new SurveyDataHelper();
        //         listOfSurvey.listOfSurveys.push(surveyItem);
        //         tempData.push(listOfSurvey);
        //     }
        //     else if (tempData.length === 0) {
        //         const listOfSurvey = new SurveyDataHelper();
        //         listOfSurvey.date = moment(surveyItem.datetime).utc().format('M/D/YY');
        //         // listOfSurvey.date = this.datePipe.transform(surveyItem.datetime, 'M/dd/yy','0');
        //         listOfSurvey.listOfSurveys.push(surveyItem);
        //         tempData.push(listOfSurvey);
        //     } else {
        //         let added = false;
        //         tempData.forEach((surveyList) => {
        //             if (!added) {
        //                 if (surveyList.date === moment(surveyItem.datetime).utc().format('M/D/YY')) {
        //                     surveyList.listOfSurveys.push(surveyItem);
        //                     added = true;
        //                 }
        //             }
        //         });
        //         if (!added) {
        //             const listOfSurvey = new SurveyDataHelper();
        //             listOfSurvey.date = moment(surveyItem.datetime).utc().format('M/D/YY');
        //             listOfSurvey.listOfSurveys.push(surveyItem);
        //             tempData.push(listOfSurvey);
        //             added = true;
        //         }
        //     }
        // });
        // //  this.listOfSurveyDataHelper = tempData;
        // if (this.segments == 'status=completed') {
        //     this.listOfSurveyDataHelper = tempData;
        // }
        // else {

        //     this.listOfSurveyDataHelper = tempData.sort(function (a, b) {
        //         var dateA = new Date(a.date).getTime(),
        //             dateB = new Date(b.date).getTime();
        //         return dateA - dateB;
        //     });

        //     //Code to get index of today date element
        //     this.listOfSurveyDataHelper.forEach((element, index) => {
        //         if (element.date == this.today) {
        //             this.indexoftodayrow = index;
        //         }
        //     });
        // }

        // this.cdr.detectChanges();
        // if (this.segments != 'status=completed') {
        //     this.scrollTo();
        // }
    }

    fillinDynamicData(records: SurveyDataModel[]): SurveyDataModel[] {
        records.forEach(element => {
            element.formattedjobtype = this.utils.getJobTypeName(element.jobtype);
            element.recordupdatedon = this.utils.formatDateInTimeAgo(element.updated_at);
            this.storage.get(this.storageService.getUserID() + '-' + element.id).then((data: SurveyStorageModel) => {
                if (data) {
                    element.remainingfilestoupload = data.remainingfilestoupload;
                    element.totalpercent = data.currentprogress;
                } else {
                    element.totalpercent = 0;
                }
            });

            var groupMembersRequest = new CometChat.GroupMembersRequestBuilder(element.chatid)
                .setLimit(10)
                .build();
            groupMembersRequest.fetchNext().then(
                groupMembers => {

                    element.addedtogroupchat = true;
                },
                error => {

                }
            );
        });

        return records;
    }

    ngOnDestroy(): void {
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

    openAddressOnMap(address: string, event, latitude, longitude) {
        event.stopPropagation();


        if (this.platform.is('ios')) {
            //try google maps first
            this.launchNavigator.isAppAvailable(this.launchNavigator.APP.GOOGLE_MAPS).then(
                response => {
                    if (response) {
                        this.launchNavigator.navigate(address, this.options);
                    } else {
                        window.open('maps://?q=' + latitude + ',' + longitude, '_system');
                    }
                },
                failure => {
                    //check failed;
                }
            );
        } else {
            this.launchNavigator.navigate(address, this.options);
        }

        //this.launchNavigator.navigate(address, this.options);
    }

    async presentActionSheet(address) {
        const actionSheet = await this.actionSheetController.create({
            header: 'Launch Directions',
            buttons: [
                {
                    text: 'Apple Maps',
                    role: 'apple-maps',
                    handler: () => {
                        this.options = {
                            start: '',
                            app: this.launchNavigator.APP.APPLE_MAPS
                        };
                        this.launchNavigator.navigate(address, this.options);
                    }
                },
                {
                    text: 'Google Maps',
                    role: 'google-maps',
                    handler: () => {
                        this.options = {
                            start: '',
                            app: this.launchNavigator.APP.GOOGLE_MAPS
                        };
                        this.launchNavigator.navigate(address, this.options);
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {

                    }
                }
            ]
        });
        await actionSheet.present();
    }

    dismissBottomSheet() {
        this.showBottomDraw = false;

        this.drawerState = DrawerState.Bottom;
        this.utils.setBottomBarHomepage(true);
        this.listOfAssignees = [];
        // this.assignForm.get('comment').setValue("");
    }

    assignToSurveyor() {

        console.log('assignToSurveyor');
        if (this.assignForm.status === 'INVALID' && (this.surveyData.status === 'reviewassigned' || this.surveyData.status === 'reviewfailed' || this.surveyData.status === 'reviewpassed')) {
            this.utils.errorSnackBar('Please select a analyst');
        } else if (this.assignForm.status === 'INVALID') {
            this.utils.errorSnackBar('Please select a surveyor');
        } else if (this.reviewAssignedTo != null && (this.selectedDesigner.id == this.reviewAssignedTo.id)) {
            this.utils.errorSnackBar("This survey request has been already assigned to" + " " + this.selectedDesigner.firstname + " " + this.selectedDesigner.lastname)

        } else {


            var surveystarttime = new Date();
            var milisecond = surveystarttime.getTime();
            var additonalhours = 0;
            if (this.surveyData.requesttype == "prelim") {

                additonalhours = this.selectedDesigner.jobcount * 2;

                surveystarttime.setHours(surveystarttime.getHours() + additonalhours);
            } else {
                additonalhours = this.selectedDesigner.jobcount * 6;
                surveystarttime.setHours(surveystarttime.getHours() + additonalhours);
            }

            var postData = {};
            if (this.surveyData.createdby.id == this.userData.id) {
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
                            status: "assigned",
                            surveystarttime: surveystarttime
                        };

                    }

                } else {
                    postData = {
                        outsourcedto: this.selectedDesigner.id,
                        isoutsourced: "true",
                        status: "outsourced"
                    };
                }
            } else {
                if (this.selectedDesigner.role.type == "surveyors") {
                    postData = {
                        assignedto: this.selectedDesigner.id,
                        status: "assigned",
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
                        // this.createNewDesignChatGroup(value);
                        this.addUserToGroupChat();
                        this.isclientassigning = true;
                        this.utils.showSnackBar('Survey request has been assigned to' + ' ' + this.selectedDesigner.firstname + " " + this.selectedDesigner.lastname + ' ' + 'successfully');

                        this.dismissBottomSheet();
                        this.showBottomDraw = false;
                        this.utils.sethomepageSurveyRefresh(true);

                        this.getSurveys(null);
                    })
                }, (error) => {
                    this.utils.hideLoading();
                    this.dismissBottomSheet();
                    this.showBottomDraw = false;
                });
            });
        }
    }

    addUserToGroupChat(): void {

        let GUID: string = this.surveyData.chatid;
        let UID = this.selectedDesigner.cometchatuid;
        console.log('GUID', GUID);
        console.log('UID', UID);
        
        let membersList: CometChat.GroupMember[] = [
            new CometChat.GroupMember(UID, CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT)
        ];

        CometChat.addMembersToGroup(GUID, membersList, []).then(
            (response: Object) => {
                console.log("response", response);
            }, (error: CometChat.CometChatException) => {
                console.log("Something went wrong", error);
            }
        );

        // let GUID: string = this.surveyData.chatid;
        // console.log('GUID', GUID);
        // let UID = this.selectedDesigner.cometchatuid;
        // console.log('UID', UID);



        // let userscope = CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT;
        // if (this.isclientassigning) {
        //     userscope = CometChat.GROUP_MEMBER_SCOPE.ADMIN;
        // }
        // let membersList = [
        //     new CometChat.GroupMember(
        //         "" + this.selectedDesigner.cometchatuid,
        //         userscope
        //     ),
        // ];
        // CometChat.addMembersToGroup(GUID, membersList, []).then(
        //     (response: Object) => {
        //         console.log("response", response);
        //     }, (error: CometChat.CometChatException) => {
        //         console.log("Something went wrong", error);
        //     }
        // );
    }

    generatePdf(id, event) {
        event.stopPropagation();
        this.utils.showLoading('Generating PDF').then(() => {
            this.apiService.generatePdf(id).subscribe(res => {
                this.utils.hideLoading();

                this.utils.sethomepageSurveyRefresh(true);

            }, err => {
                this.utils.hideLoading();
                this.utils.showSnackBar('Error in generating PDF');
            })
        });
    }

    onMailClick(email: string, event): void {
        event.stopPropagation();
        window.location.href = "mailto:" + email;
    }
    oncallClick(email: string, event): void {
        event.stopPropagation();
        window.location.href = "tel:" + email;
    }
    openAnalysts(id: number, surveyData) {
        this.listOfAssignees = [];

        this.surveyData = surveyData;

        this.reviewAssignedTo = surveyData.reviewassignedto;

        if (this.listOfAssignees.length === 0) {
            this.utils.showLoading('Getting Analysts').then(() => {
                this.apiService.getAnalysts().subscribe(assignees => {
                    this.utils.hideLoading().then(() => {
                        this.listOfAssignees = [];
                        // this.listOfAssignees.push(this.utils.getDefaultAssignee(this.storage.getUserID()));
                        assignees.forEach(item => this.listOfAssignees.push(item));

                        this.showBottomDraw = true;
                        this.surveyId = id;
                        this.utils.setBottomBarHomepage(false);
                        this.drawerState = DrawerState.Docked;
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

        } else {
            this.surveyId = id;
            this.utils.setBottomBarHomepage(false);
            this.drawerState = DrawerState.Docked;
            this.assignForm.patchValue({
                assignedto: ''
            });
        }

    }

    ionViewWillEnter() {
        this.showBottomDraw = false;
        console.log('showBottomDraw', this.showBottomDraw);
    }

    async openSurveyors(id: number, surveyData, event) {
        event.stopPropagation();
        console.log('openSurveyors');
        this.listOfAssignees = [];
        this.enableBackdropDismiss = false;
        this.showBackdrop = false;
        this.shouldPropagate = false;
        this.surveyData = surveyData;
        this.reviewAssignedTo = surveyData.assignedto;
        if (this.listOfAssignees.length === 0) {
            this.utils.showLoading('Getting Surveyors').then(() => {
                this.apiService.getSurveyors().subscribe(assignees => {
                    this.utils.hideLoading().then(async () => {
                        this.listOfAssignees = [];
                        // this.listOfAssignees.push(this.utils.getDefaultAssignee(this.storage.getUserID()));
                        assignees.forEach(item => this.listOfAssignees.push(item));
                        const modal = await this.modalController.create({
                            component: AssignPage,
                            cssClass: 'small-modal',
                            componentProps: {
                                assignedDateTime: surveyData.datetime,
                                surveyData: assignees,
                                memberid: id
                            },
                            backdropDismiss: false,
                            showBackdrop: true,

                        });
                        modal.onDidDismiss().then((data) => {
                            console.log('user data', data)
                            this.getuserData = data.data;
                            if (this.getuserData != null || this.getuserData != undefined) {
                                if (this.getuserData.id != null) {

                                    this.selectedDesigner = this.getuserData.uData;
                                    this.surveyId = surveyData.id;
                                    this.assignToSurveyor();
                                }
                            }
                        });
                        return await modal.present();
                        // this.showBottomDraw = true;
                        // this.surveyId = id;
                        // this.utils.setBottomBarHomepage(false);
                        // this.drawerState = DrawerState.Docked;
                        // this.assignForm.patchValue({
                        //     assignedto: ''
                        // });
                    });
                }, (error) => {
                    this.utils.hideLoading().then(() => {
                        this.utils.errorSnackBar('Some error occurred. Please try again later');
                    });
                });
            });

        } else {
            this.surveyId = id;
            this.utils.setBottomBarHomepage(false);
            this.drawerState = DrawerState.Docked;
            this.assignForm.patchValue({
                assignedto: ''
            });
        }
    }

    selfAssign(id: number, surveyData) {
        var designstarttime = new Date();
        var milisecond = designstarttime.getTime();
        var postData = {}
        postData = {
            reviewassignedto: this.userData.id,
            status: "reviewassigned",
            reviewstarttime: milisecond
        };
        this.utils.showLoading('Assigning').then(() => {
            this.apiService.updateSurveyForm(postData, id).subscribe((value) => {
                this.utils.hideLoading().then(() => {
                    ;

                    this.utils.showSnackBar('Design request has been assigned to you successfully');
                    this.utils.sethomepageSurveyRefresh(true);

                })
            }, (error) => {
                this.utils.hideLoading();

            });
        })

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

    sDatePassed(datestring: any, i) {
        var checkdate = moment(datestring, "YYYYMMDD");
        var todaydate = moment(new Date(), "YYYYMMDD");
        var lateby = todaydate.diff(checkdate, "days");
        this.overdue = lateby;


    }

    getassignedata(asssignedata) {
        this.selectedDesigner = asssignedata;
        console.log('this.selectedDesigner', this.selectedDesigner);


    }


    raisepermit(data: any, event) {
        event.stopPropagation();
        let objToSend: NavigationExtras = {
            queryParams: {
                surveyData: data,
                // tabsDisabled: true,
                // nonEditableField: true
            },
            skipLocationChange: false,
            fragment: 'top'
        };


        this.router.navigate(['/permit-schedule/'], {
            state: { productdetails: objToSend }
        });
    }

    async openreviewPassed(id, designData) {
        this.surveyId = id
        const alert = await this.alertController.create({
            cssClass: 'alertClass',
            header: 'Confirm!',
            message: 'Would you like to  Add Comments!!',
            inputs:
                [{
                    name: 'comment',
                    id: 'comment',
                    type: 'textarea',
                    placeholder: 'Enter Comment'
                }
                ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: (blah) => {

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
                        } else {
                            postData = {
                                status: "delivered",
                            };
                        }

                        this.apiService.updateSurveyForm(postData, this.surveyId).subscribe((value) => {
                            this.utils.hideLoading().then(() => {
                                ;

                                this.utils.showSnackBar('Survey request has been delivered successfully');

                                this.utils.setHomepageDesignRefresh(true);
                            })
                        }, (error) => {
                            this.utils.hideLoading();
                            ;
                        });
                    }
                }
            ]
        });

        await alert.present();


    }

    createNewDesignChatGroup(survey: SurveyDataModel) {
        var GUID = survey.chatid;
        var address = survey.address.substring(0, 60);
        var groupName = survey.name + "_" + address;

        var groupType = CometChat.GROUP_TYPE.PASSWORD;
        var password = survey.groupchatpassword;

        var group = new CometChat.Group(GUID, groupName, groupType, password);

        CometChat.createGroup(group).then(
            group => {
                let membersList = [
                    new CometChat.GroupMember("" + survey.createdby.cometchatuid, CometChat.GROUP_MEMBER_SCOPE.ADMIN),
                    new CometChat.GroupMember("" + this.userData.cometchatuid, CometChat.GROUP_MEMBER_SCOPE.ADMIN),
                    new CometChat.GroupMember("" + this.selectedDesigner.cometchatuid, CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT)
                ];
                CometChat.addMembersToGroup(group.getGuid(), membersList, []).then(
                    response => {
                        this.updatechat_id = true;
                        let chatgroupusers = [];
                        chatgroupusers.push(survey.createdby.cometchatuid, this.userData.cometchatuid, this.selectedDesigner.cometchatuid);
                        let inputData = {
                            title: groupName,
                            guid: GUID,
                            parentid: survey.createdby?.parent,
                            chatgroupusers: chatgroupusers
                        }
                        this.apiService.addChatGroup(inputData).subscribe(response => {
                        })
                    },
                    error => {
                    }
                );
            },
            error => {

            }
        );

    }

    setupCometChat() {
        let userId = this.storageService.getUserID()
        const user = new CometChat.User(userId);
        user.setName(this.storageService.getUser().firstname + ' ' + this.storageService.getUser().lastname);
        const appSetting = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(COMETCHAT_CONSTANTS.REGION).build();
        CometChat.init(COMETCHAT_CONSTANTS.APP_ID, appSetting).then(
            () => {

                // if(this.utilities.currentUserValue != null){
                // You can now call login function.
                CometChat.login(userId, COMETCHAT_CONSTANTS.API_KEY).then(
                    (user) => {

                    },
                    error => {

                    }
                );
                // }
            },
            error => {

            }
        );
    }


    close() {
        if (this.showBottomDraw === true) {
            this.showBottomDraw = false;
            this.drawerState = DrawerState.Bottom;
            this.utils.setBottomBarHomepage(true);
        } else {
            this.showBottomDraw = true;
        }
    }

    shareWhatsapp(designData) {
        this.socialsharing.share(designData.prelimdesign.url);
    }

    async shareViaEmails(id, designData) {
        const modal = await this.modalController.create({
            component: EmailModelPage,
            cssClass: 'email-modal-css',
            componentProps: {
                id: id,
                designData: designData
            },

        });
        modal.onDidDismiss().then((data) => {

            if (data.data.cancel == 'cancel') {
            } else {
                this.getSurveys(null, this.getFilterData.id)
            }
        });
        return await modal.present();
    }

    assignedTo(surveyData, event) {
        event.stopPropagation();
        let postData = {
            assignedto: this.userData.id,
            status: "assigned"
        };
        this.apiService.updateSurveyForm(postData, surveyData.id).subscribe(res => {

        })
        this.router.navigate(['/start-survey/' + surveyData.id + '/' + surveyData.jobtype]);
    }

    makeDirectory() {
        this.platform.ready().then(() => {
            if (this.platform.is('ios')) {
                this.storageDirectory = this.file.externalRootDirectory + '/Wattmonk/';
            } else if (this.platform.is('android')) {
                this.storageDirectory = this.file.externalRootDirectory + '/Wattmonk/';
            } else {
                this.storageDirectory = this.file.cacheDirectory;
            }
        });
    }

    designDownload(designData, event) {
        event.stopPropagation();
        let pdf = designData.surveypdf == null ? '' : designData.surveypdf;
        this.platform.ready().then(() => {
            this.file.resolveDirectoryUrl(this.storageDirectory).then(resolvedDirectory => {
                this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then(

                    err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE)
                );
                this.file.checkFile(resolvedDirectory.nativeURL, pdf.url).then(data => {


                    if (data == true) {

                    } else {

                        throw { code: 1, message: 'NOT_FOUND_ERR' };
                    }

                }).catch(async err => {


                    if (err.code == 1) {
                        const fileTransfer: FileTransferObject = this.transfer.create();
                        // this.utils.showLoading('Downloading').then(()=>{
                        fileTransfer.download(url, this.storageDirectory + pdf.url).then((entry) => {
                            // this.utils.hideLoading().then(()=>{

                            this.utils.showSnackBar("Survey File Downloaded Successfully");

                            // this.clickSub = this.localnotification.on('click').subscribe(data => {

                            //   path;
                            // })
                            // this.localnotification.schedule({
                            //     text: 'Survey File Downloaded Successfully',
                            //     foreground: true,
                            //     vibrate: true
                            // })
                            // }, (error) => {
                            //   // handle error


                            // });
                        })
                        // })
                    }
                })
            })
        })


        let dir_name = 'WattMonk';
        let path = '';
        const url = designData.surveypdf.url;
        const fileTransfer: FileTransferObject = this.transfer.create();


        let result = this.file.createDir(this.file.externalRootDirectory, dir_name, true);
        result.then((resp) => {
            path = resp.toURL();


            fileTransfer.download(url, path + designData.surveypdf.hash + designData.surveypdf.ext).then((entry) => {

                this.utils.showSnackBar("Survey File Downloaded Successfully");

                // this.clickSub = this.localnotification.on('click').subscribe(data => {

                //   path;
                // })
                // this.localnotification.schedule({ text: 'Downloaded Successfully', foreground: true, vibrate: true })
            }, (error) => {
                // handle error
            });
        })


    }

    resumeSurvey(surveyData, event) {
        event.stopPropagation();
        this.router.navigate(['/start-survey/' + surveyData.id + '/' + surveyData.jobtype]);
    }

    gotoActivity(surveyData, event) {

        event.stopPropagation();
        this.router.navigate(['/activity-details' + '/' + surveyData.id + '/survey'])

    }

    gotoDetails(surveyData, $event) {
        // $event.preventDefault();
        // $event.stopPropagation();
        // this.router.navigate(['/survey-detail/' + surveyData.id])
        this.utils.setPrelimId(surveyData)
        this.utils.setRequestType('survey')
        this.router.navigate(['/master-details/survey-details/' + surveyData.id])
    }

    gotoChats(surveyData, event) {
        event.stopPropagation();
        let objToSend: NavigationExtras = {
            queryParams: {
                name: surveyData.name + '_' + surveyData.address,
                guid: surveyData.chatid
            },
            skipLocationChange: false,
            fragment: 'top'
        };


        this.router.navigate(['chat/' + surveyData.chatid], {
            state: { productdetails: objToSend }
        });
    }

    // present company filter
    async presentFilterModal() {
        console.log("hello")
        const modal = await this.modalController.create({
            component: FilterPage,
            cssClass: 'small-modal',
            componentProps: {
                requesttype: 'pestamp',
                isFilterApplied: this.isFilterApplied,
                memberid: this.memberId
            },
            backdropDismiss: false,
            showBackdrop: true,
        });
        modal.onDidDismiss().then((data) => {
            console.log('filter data', data)
            this.getFilterData = data.data;
            if (this.getFilterData != null || this.getFilterData != undefined) {
                if (this.getFilterData.id != null) {
                    this.isFilterApplied = true;
                    this.memberId = this.getFilterData.id;
                    this.filterApplied(this.getFilterData);
                } else {
                    this.removeFilter();
                }
            } else {
                this.removeFilter();
            }
        })
        return await modal.present();
    }


    filterApplied(filterData) {
        this.skip = 0;
        if (this.memberId !== null && this.memberId !== '') {
            let creatorParentId = this.memberId;

            this.getSurveycounts(creatorParentId);
            this.getSurveys(null, filterData.id);
        }
    }

    // remove filter when click on filtered data
    removeFilter(): void {
        this.getFilterData = '';
        this.skip = 0;
        this.isFilterApplied = false;
        this.memberId = null;
        this.getSurveys(null);
        this.getSurveycounts();
    }

    dateback() {
        var date = this.my_datetime;
        var tempDate = moment(date).subtract(1, 'days');
        const datodate = moment(tempDate).format('YYYY-MM-DDTHH:mm:ss');
        console.log(datodate);
        this.my_datetime = datodate;
        this.dateExample = datodate;
        this.getSurveys();
    }

    datenext() {
        var date = this.my_datetime;
        var tempDate = moment(date).add(1, 'days');
        const datodate = moment(tempDate).format('YYYY-MM-DDTHH:mm:ss');
        console.log(datodate);
        this.my_datetime = datodate;
        this.dateExample = datodate;
        this.getSurveys();
    }

    async openPaymentModal(event, surveyData, type) {
        console.log('openPaymentModal', type);
        event.stopPropagation();
        this.utils.showLoading('Please wait...').then(() => {
            let surveyPDF;
            if (surveyData.surveypdf == null) {
                console.log('if null');

                this.apiService.generatePdf(surveyData.id).subscribe((data) => {
                    console.log('generatePdf data', data);
                    let getData: any = data;
                    surveyData.surveypdf = getData.surveypdf;

                    surveyPDF = getData.surveypdf;
                    surveyPDF.address = getData.address;
                    surveyPDF.surveypdf_payment = getData.surveypdf_payment;

                    console.log('surveyPDF', surveyPDF);
                    if (surveyPDF?.surveypdf_payment == true) {
                        this.utils.hideLoading().then(() => {
                            if (type == 'share') {
                                this.utils.socialShare(surveyPDF);
                            } else if (type == 'download') {
                                this.utils.fileDownload(surveyPDF);
                            }
                        });
                    } else {
                        this.utils.hideLoading().then(async () => {
                            const modal = await this.modalController.create({
                                component: PaypalPaymentPage,
                                cssClass: 'paypal-payment-modal',
                                componentProps: {
                                    id: surveyData.id
                                },
                                backdropDismiss: false
                            });
                            modal.onDidDismiss().then((data) => {
                                if (data.data.success) {
                                    if (type == 'share') {
                                        this.utils.socialShare(surveyPDF);
                                    } else if (type == 'download') {
                                        this.utils.fileDownload(surveyPDF);
                                    }
                                }

                            });
                            return await modal.present();
                        });
                    }
                }, (error) => {
                    console.log('error', error);
                    this.utils.hideLoading();
                });
            } else {
                console.log('if else');
                surveyPDF = surveyData.surveypdf;
                surveyPDF.address = surveyData.address;
                surveyPDF.surveypdf_payment = surveyData.surveypdf_payment;

                console.log('surveyPDF', surveyPDF);
                if (surveyPDF?.surveypdf_payment == true) {
                    this.utils.hideLoading().then(() => {
                        if (type == 'share') {
                            this.utils.socialShare(surveyPDF);
                        } else if (type == 'download') {
                            this.utils.fileDownload(surveyPDF);
                        }
                    });
                } else {
                    this.utils.hideLoading().then(async () => {
                        const modal = await this.modalController.create({
                            component: PaypalPaymentPage,
                            cssClass: 'paypal-payment-modal',
                            componentProps: {
                                id: surveyData.id
                            },
                            backdropDismiss: false
                        });
                        modal.onDidDismiss().then((data) => {
                            if (data.data.success) {
                                if (type == 'share') {
                                    this.utils.socialShare(surveyPDF);
                                } else if (type == 'download') {
                                    this.utils.fileDownload(surveyPDF);
                                }
                            }

                        });
                        return await modal.present();
                    });
                }
            }
        }, (error) => {
            console.log('error', error);
            this.utils.hideLoading();
        });
    }


}