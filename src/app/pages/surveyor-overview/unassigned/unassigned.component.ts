import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, ViewChild, Input } from '@angular/core';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { LaunchNavigator, LaunchNavigatorOptions } from '@awesome-cordova-plugins/launch-navigator/ngx';
import { ActionSheetController, IonContent, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { ErrorModel } from 'src/app/models/error.model';
import { SurveyStorageModel } from 'src/app/models/survey-storage.model';
import { SurveyDataModel } from 'src/app/models/survey.model';
import { ApiService } from 'src/app/services/api/api.service';
import { CustomEventsService } from 'src/app/services/custom-events/custom-events.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { SurveyDataHelper } from '../../home/survey/survey.component';


@Component({
    selector: 'app-unassigned',
    templateUrl: './unassigned.component.html',
    styleUrls: ['./unassigned.component.scss'],
})
export class UnassignedComponent implements OnInit {

    @ViewChild(IonContent, { static: false }) content: IonContent;
    indexoftodayrow = -1;
    listOfSurveyData: SurveyDataModel[] = [];
    listOfSurveyDataHelper: SurveyDataHelper[] = [];
    private surveyRefreshSubscription: Subscription;
    private dataRefreshSubscription: Subscription;
    routeSubscription: Subscription;

    today: any;
    options: LaunchNavigatorOptions = {
        start: '',
        app: this.launchNavigator.APP.GOOGLE_MAPS
    };
    overdue: number;
    public surveyid: number;
    public surveyUploadImageCount: string = '';

    skip: number = 0;
    limit: number = 10;
    public lat: any = 28.588934586994323;
    public lon: any = -81.29652674200393;
    public startSyncSurvey: boolean = false;

    public userAccessRights: any = {};
    public noSurveyFound: string = '';
    iscomsurvey: boolean = false;
    public isClient: boolean = true;
    datetime: any;
    c_datetime: any;
    parentID: string;
    isunassignedsurvey: boolean = false;
    isunsurvey: boolean = false;
    private dateChangeSubscriptionus: Subscription;

    constructor(
        private launchNavigator: LaunchNavigator,
        private datePipe: DatePipe,
        private cdr: ChangeDetectorRef,
        public utils: UtilitiesService,
        private storage: Storage,
        private apiService: ApiService,
        private router: Router,
        private actionSheetController: ActionSheetController,
        private platform: Platform,
        private eventService: CustomEventsService,
        private activeRoute: ActivatedRoute

    ) {
        const latestDate = new Date();
        this.today = datePipe.transform(latestDate, 'M/dd/yy');
        // get access right permission data
        this.userAccessRights = this.utils.getUserAccessRights('survey');
        this.isClient = this.utils.isClient();
    }

    ngOnInit() {
        this.cdr.detectChanges();
    }

    ionViewWillEnter() {
        console.log('unassigned survey ionViewWillEnter');
        console.log('date', localStorage.getItem('selectedDate'));
        if (localStorage.getItem('selectedDate')) {
            this.c_datetime = localStorage.getItem('selectedDate');
            this.listOfSurveyDataHelper = [];
            this.listOfSurveyData = [];
            this.noSurveyFound = "";
            this.cdr.detectChanges();
        } else {
            this.datetime = moment().format('YYYY-MM-DDTHH:mm:ss');
            this.c_datetime = this.datetime;
            console.log("default date in unassigned", this.c_datetime);
            this.listOfSurveyDataHelper = [];
            this.listOfSurveyData = [];
            this.noSurveyFound = "";
            this.cdr.detectChanges();
        }
        this.dateChangeSubscriptionus = this.eventService.subscribe('update-survey-date', (data: any) => {
            console.log('eventService.subscribe', data);
            if (data.isUpdateSurveyDate) {
                this.c_datetime = data.C_date;
                this.listOfSurveyDataHelper = [];
                this.listOfSurveyData = [];
                this.noSurveyFound = "";
                this.cdr.detectChanges();
                this.getSurveys(null);
            }
        });
    }
    ionViewDidEnter() {
        this.surveyRefreshSubscription = this.utils.getHomepageSurveyRefresh().subscribe((result) => {
            this.getSurveys(null);
        });

        this.dataRefreshSubscription = this.utils.getDataRefresh().subscribe((result) => {
            if (this.listOfSurveyData != null && this.listOfSurveyData.length > 0) {
                this.formatSurveyData(this.listOfSurveyData);
            }
        });
    }

    ionViewWillLeave() {
        console.log('ionViewWillLeave');
        this.dateChangeSubscriptionus.unsubscribe();
        this.cdr.detach();
    }

    getSurveys(event) {

        console.log("get survey")

        let showLoader = true;
        this.skip = 0;
        if (event != null && event !== undefined) {
            showLoader = false;
        }
        this.fetchPendingSurveys(event, showLoader);
        this.eventService.publish('foo:update-survey-count', {
            isUpdateSurveyCount: true
        });
    }

    fetchPendingSurveys(event, showLoader: boolean,) {
        this.parentID = localStorage.getItem('parentId')
        console.log("parent id is", this.parentID);

        console.log("fetch pending survey")
        this.listOfSurveyData = [];
        this.listOfSurveyDataHelper = [];
        this.noSurveyFound = '';
        this.isunassignedsurvey = false;
        this.isunsurvey = false;
        this.apiService.getSurveyorSurveys("status=created", this.limit, this.skip, this.parentID, this.c_datetime).subscribe(response => {
            this.content.scrollToTop(10);

            this.isunsurvey = true;

            console.log("Response for unassigned is", response)

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
        this.parentID = localStorage.getItem('parentId')
        console.log("parent id in infinite is", this.parentID);
        this.skip = this.skip + 10;
        //   https://prelive.wattmonk.com/r1preliveserver/api/usersurveys?id=642&status=outsourced&limit=10&skip=0 
        this.apiService.getSurveyorSurveys("status=created", this.limit, this.skip, this.parentID, this.c_datetime).subscribe(response => {
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

    onMailClick(email: string, event): void {
        event.stopPropagation();
        window.location.href = "mailto:" + email;
    }
    oncallClick(email: string, event): void {
        event.stopPropagation();
        window.location.href = "tel:" + email;
    }
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

    scrollTo() {
        setTimeout(() => {
            let todaytitleElement = document.getElementById('' + this.indexoftodayrow);
            todaytitleElement ? this.content.scrollToPoint(0, todaytitleElement.offsetTop, 1000) : '';
        }, 2000)

    }


    loadPostsup(val) {




        var dat = val - 1;
        console.log(dat);
        document.querySelector('#div_focusedcomp' + dat).scrollIntoView(true);
    }

    loadPostsdown(val) {

        var dat = val + 1;

        console.log(dat);


        document.querySelector('#div_focusedcomp' + dat).scrollIntoView(true);
    }
    formatSurveyData(records: SurveyDataModel[]) {
        let list: SurveyDataModel[];

        list = this.fillinDynamicData(records);
        console.log('list', list);

        list.forEach(element => {
            this.listOfSurveyData.push(element);
        })
        if (list.length > 0) {
            list.forEach((surveyItem: any, i) => {
                const listOfSurvey = new SurveyDataHelper();

                listOfSurvey.date = moment(surveyItem.datetime).utc().format('M/D/YY');

                // listOfSurvey.date = this.datePipe.transform(surveyItem.datetime, 'M/dd/yy');
                listOfSurvey.listOfSurveys.push(surveyItem);
                var length_data = listOfSurvey.listOfSurveys.length;


                // listOfSurvey.count_data=length_data;
                this.listOfSurveyDataHelper.push(listOfSurvey);
            });

            this.listOfSurveyDataHelper.forEach((element, index) => {
                if (element.date == this.today) {
                    this.indexoftodayrow = index;
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
        //     if (tempData.length === 0) {
        //         const listOfSurvey = new SurveyDataHelper();
        //         // listOfSurvey.date = this.datePipe.transform(surveyItem.datetime, 'M/d/yy');
        //         listOfSurvey.listOfSurveys.push(surveyItem);
        //         tempData.push(listOfSurvey);
        //     } else {
        //         let added = false;
        //         tempData.forEach((surveyList) => {
        //             if (!added) {
        //                 if (surveyList.date === this.datePipe.transform(surveyItem.datetime, 'M/d/yy')) {
        //                     surveyList.listOfSurveys.push(surveyItem);
        //                     added = true;
        //                 }
        //             }
        //         });
        //         if (!added) {
        //             const listOfSurvey = new SurveyDataHelper();
        //             listOfSurvey.date = this.datePipe.transform(surveyItem.datetime, 'M/d/yy');
        //             listOfSurvey.listOfSurveys.push(surveyItem);
        //             tempData.push(listOfSurvey);
        //             added = true;
        //         }
        //     }
        // });
        // this.listOfSurveyDataHelper = tempData.sort(function (a, b) {
        //   var dateA = new Date(a.date).getTime(),
        //     dateB = new Date(b.date).getTime();
        //   return dateA - dateB;
        // });

        // this.listOfSurveyDataHelper.forEach((element, index) => {
        //     if (element.date == this.today) {
        //         this.indexoftodayrow = index;
        //     }
        // });

        // // this.scrollTo();
        // this.cdr.detectChanges();
    }

    fillinDynamicData(records: SurveyDataModel[]): SurveyDataModel[] {
        records.forEach(element => {
            element.formattedjobtype = this.utils.getJobTypeName(element.jobtype);
            element.recordupdatedon = this.utils.formatDateInTimeAgo(element.updated_at);
            this.storage.get('' + element.id).then((data: SurveyStorageModel) => {

                if (data) {
                    element.totalpercent = data.currentprogress;
                } else {
                    element.totalpercent = 0;
                }
            });
        });

        return records;
    }
    sDatePassed(datestring: any, i) {
        var checkdate = moment(datestring, "YYYYMMDD");
        var todaydate = moment(new Date(), "YYYYMMDD");
        var lateby = todaydate.diff(checkdate, "days");
        this.overdue = lateby;


    }

    ngOnDestroy(): void {
        // this.refreshSubscription.unsubscribe();
        // this.routeSubscription.unsubscribe();
        this.dataRefreshSubscription.unsubscribe();
        this.surveyRefreshSubscription.unsubscribe();
        this.cdr.detach();
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
        // this.router.navigate(['/survey-details/' + surveyData.id])
        this.utils.setPrelimId(surveyData)
        this.utils.setRequestType('survey')
        this.router.navigate(['/master-details/survey-details/' + surveyData.id])
    }

    gotoChats(surveyData, event) {

        event.stopPropagation();
        // this.router.navigate(['/chat/' + surveyData.chatid])
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
}
