import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { LaunchNavigator, LaunchNavigatorOptions } from '@awesome-cordova-plugins/launch-navigator/ngx';
import { ActionSheetController, IonContent, NavController, Platform, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { CometChat } from '@cometchat-pro/cordova-ionic-chat';

import { ErrorModel } from 'src/app/models/error.model';
import { SurveyStorageModel } from 'src/app/models/survey-storage.model';
import { SurveyDataModel } from 'src/app/models/survey.model';
import { ApiService } from 'src/app/services/api/api.service';
import { CustomEventsService } from 'src/app/services/custom-events/custom-events.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { SurveyDataHelper } from '../../home/survey/survey.component';
import { COMETCHAT_CONSTANTS } from 'src/app/services/constants';

export interface FILE_ATTACHMENTS {
    file: File;
    fileurl: any;
    uploadstatus: boolean;
    controlname: string;
}

export interface CAPTUREDSHOT {
    menuindex: number;
    submenuindex: number;
    shotindex: number;
    shotimage: string;
    imagekey: string;
    imagename: string;
    imageuploadname: string;
    imagecleared: boolean;
    uploadstatus: boolean;
}

export enum VIEWMODE {
    NONE = -1,
    CAMERA = 0,
    FORM = 1
}

export enum CONTROLTYPE {
    CONTROL_INPUT_TEXT = 1,
    CONTROL_INPUT_NUMBER = 2,
    CONTROL_INPUT_SELECT = 3,
    CONTROL_INPUT_AUTOCOMPLETE = 4,
    CONTROL_INPUT_RADIO = 5,
    CONTROL_INPUT_CHECKBOX = 6,
    CONTROL_INPUT_TEXTAREA = 7,
    CONTROL_MULTIPLE_FILE_UPLOAD = 8,
    CONTROL_SINGLE_FILE_UPLOAD = 9
}

@Component({
    selector: 'app-new-surveys',
    templateUrl: './new-surveys.component.html',
    styleUrls: ['./new-surveys.component.scss'],
})
export class NewSurveysComponent implements OnInit {
    @ViewChild(IonContent, { static: false }) content: IonContent;
    indexoftodayrow = -1;
    listOfSurveyData: SurveyDataModel[] = [];
    listOfSurveyDataHelper: SurveyDataHelper[] = [];
    private surveyRefreshSubscription: Subscription;
    private dataRefreshSubscription: Subscription;
    private dateChangeSubscriptionns: Subscription;

    public startSyncSurvey: boolean = false;
    public surveyCounts: any = {};

    public listOfSurveysToSave: SurveyStorageModel[] = [];

    public filesarray: FILE_ATTACHMENTS[] = [];
    public imagesArray: CAPTUREDSHOT[] = [];
    public ControlTypes = CONTROLTYPE;

    public totalimagestoupload = 0;
    public totalfilestoupload = 0;

    public surveyid: number;
    public surveytype: string;
    public surveycity: string = "";
    public surveystate: string = "";

    public latitude: any = 0; //latitude
    public longitude: any = 0; //longitude

    public surveyUploadImageCount: string = '';
    public noSurveyFound: string = '';

    today: any;
    options: LaunchNavigatorOptions = {
        start: '',
        app: this.launchNavigator.APP.GOOGLE_MAPS
    };
    overdue: number;
    userData: any;

    skip: number = 0;
    limit: number = 10;
    datetime: any;
    c_datetime: any;
    lat: any;
    lon: any;
    parentID: any;

    public userAccessRights: any = {
        viewonly: true
    };
    isnewsurvey: boolean = false;
    public isClient: boolean = true;

    constructor(
        private launchNavigator: LaunchNavigator,
        private datePipe: DatePipe,
        private cdr: ChangeDetectorRef,
        public utils: UtilitiesService,
        private storage: Storage,
        private storageService: StorageService,
        private el: ElementRef,
        private router: Router,
        private apiService: ApiService,
        private actionSheetController: ActionSheetController,
        private platform: Platform,
        private geolocation: Geolocation,
        private toastController: ToastController,
        private navController: NavController,
        private eventService: CustomEventsService,
    ) {
        // get access right permission data
        setTimeout(() => {
            this.userAccessRights = this.utils.getUserAccessRights('survey');
        }, 1000);
        this.isClient = this.utils.isClient();
    }

    ngOnInit() {
        console.log("in oninit")
        // this.datetime = moment().format('YYYY-MM-DDTHH:mm:ss');

        // this.c_datetime = this.datetime;
        // console.log("default date in assigned", this.c_datetime);

        this.userData = this.storageService.getUser();
        // this.parentID = this.storag.getParentId();

        const latestDate = new Date();
        this.today = this.datePipe.transform(latestDate, 'M/dd/yy');
    }

    ionViewWillEnter() {
        console.log('new survey ionViewWillEnter');
        if (localStorage.getItem('selectedDate')) {
            console.log('localStorage');
            this.c_datetime = localStorage.getItem('selectedDate');
            console.log('this.c_datetime', this.c_datetime);
            this.listOfSurveyDataHelper = [];
            this.listOfSurveyData = [];
            this.noSurveyFound = "";
            this.cdr.detectChanges();
        } else {
            console.log('direct');
            this.datetime = moment().format('YYYY-MM-DDTHH:mm:ss');
            this.c_datetime = this.datetime;
            this.listOfSurveyDataHelper = [];
            this.listOfSurveyData = [];
            this.noSurveyFound = "";
            this.cdr.detectChanges();
        }

        this.dateChangeSubscriptionns = this.eventService.subscribe('update-survey-date', (data: any) => {
            console.log('eventService.subscribe', data);
            if (data.isUpdateSurveyDate) {
                this.c_datetime = data.C_date;
                this.listOfSurveyDataHelper = [];
                this.listOfSurveyData = [];
                this.noSurveyFound = "";
                this.isnewsurvey = false;
                this.cdr.detectChanges();
                this.getSurveys(null);
            }
        });
    }

    // getSurveycounts(event?, creatorParentId = null) {
    //     this.apiService.getSurveycounts(this.userData.id, creatorParentId, this.c_datetime).subscribe(res => {
    //         console.log('res', res);
    //         this.surveyCounts = res;
    //     })
    // }

    ionViewDidEnter() {
        //this.getSurveys(null);
        if (this.lat && this.lon) {

            console.log('ionViewDidEnter');
            this.surveyRefreshSubscription = this.utils.getHomepageSurveyRefresh().subscribe((result) => {
                this.getSurveys(null);
            });

            this.dataRefreshSubscription = this.utils.getDataRefresh().subscribe((result) => {
                if (this.listOfSurveyData != null && this.listOfSurveyData.length > 0) {
                    this.formatSurveyData(this.listOfSurveyData);
                }
            });
        } else {
            console.log('ionViewDidEnter');
            this.geolocation.getCurrentPosition().then((resp) => {
                this.lat = resp.coords.latitude;
                this.lon = resp.coords.longitude;
                // let address = this.utils.getAddressFromLatLng(this.latitude, this.longitude);
                console.log("lat is ", this.lat);
                console.log("lon is ", this.lon);

                this.surveyRefreshSubscription = this.utils.getHomepageSurveyRefresh().subscribe((result) => {
                    this.getSurveys(null);
                });

                this.dataRefreshSubscription = this.utils.getDataRefresh().subscribe((result) => {
                    if (this.listOfSurveyData != null && this.listOfSurveyData.length > 0) {
                        this.formatSurveyData(this.listOfSurveyData);
                    }
                });
            }).catch((error) => {
                // console.log('Error getting location', error);
            });
        }
    }

    getSurveys(event?) {
        console.log('getSurveys');

        console.log('hye');
        let showLoader = true;
        this.skip = 0;
        // this.getSurveycounts();
        if (event != null && event !== undefined) {
            showLoader = false;
        }
        this.fetchPendingSurveys(event, showLoader);
        this.autoSyncSurvey();
        this.eventService.publish('foo:update-survey-count', {
            isUpdateSurveyCount: true
        });
    }

    fetchPendingSurveys(event?, showLoader?: boolean) {
        console.log('surveyapi');
        this.listOfSurveyData = [];
        this.listOfSurveyDataHelper = [];
        this.noSurveyFound = "";
        this.isnewsurvey = false;
        //   this.ionViewWillEnter();
        // this.utils.showLoading('Getting Surveys').then(()=>{
        this.apiService.getSurveyorSurveys("status=assigned", this.limit, this.skip, '', this.c_datetime, this.lat, this.lon).subscribe(response => {
            // this.utils.hideLoading().then(()=>{
            this.content.scrollToTop(10);
            this.isnewsurvey = true;

            if (response.length) {

                this.formatSurveyData(response);
            } else {

                this.noSurveyFound = "No Survey Found";
            }
            if (event !== null) {
                event.target.complete();
            }

            // })
        }, responseError => {
            // this.utils.hideLoading();
            this.utils.hideLoadingWithPullRefreshSupport(showLoader).then(() => {
                if (event !== null) {
                    event.target.complete();
                }
                const error: ErrorModel = responseError.error;
                this.utils.errorSnackBar(error.message[0].messages[0].message);
            });
        });
        // });

    }


    loadPostsup(val) {




        var dat = val - 1;
        console.log(dat);
        document.querySelector('#div_focused' + dat).scrollIntoView(true);
    }

    loadPostsdown(val) {

        var dat = val + 1;

        console.log(dat);


        document.querySelector('#div_focused' + dat).scrollIntoView(true);
    }
    doInfinite(event) {
        this.skip = this.skip + 10;
        console.log("passing date in API in doinfinite", this.c_datetime)

        this.apiService.getSurveyorSurveys("status=assigned", this.limit, this.skip, ' ', this.c_datetime, this.lat, this.lon).subscribe(response => {
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

    formatSurveyData(records: SurveyDataModel[]) {
        console.log('formatSurveyData');

        let list: SurveyDataModel[] = [];

        list = this.fillinDynamicData(records);
        console.log('list', list);

        list.forEach(element => {
            this.listOfSurveyData.push(element);
        });

        console.log('list.length', list.length);

        if (list.length > 0) {
            list.forEach((surveyItem: any, i) => {
                console.log('surveyItem', surveyItem);
                console.log('listOfSurveyDataHelper', this.listOfSurveyDataHelper);
                const listOfSurvey = new SurveyDataHelper();
                listOfSurvey.date = this.datePipe.transform(surveyItem.datetime, 'M/dd/yy');

                listOfSurvey.listOfSurveys.push(surveyItem);
                var length_data = listOfSurvey.listOfSurveys.length;
                //listOfSurvey.count_data=length_data;
                this.listOfSurveyDataHelper.push(listOfSurvey);
            });

            this.listOfSurveyDataHelper.forEach((element, index) => {
                // console.log('element index', element.listOfSurveys, index);
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
        //         listOfSurvey.date = this.datePipe.transform(surveyItem.datetime, 'M/dd/yy');
        //         listOfSurvey.listOfSurveys.push(surveyItem);
        //         tempData.push(listOfSurvey);


        //     } else {
        //         let added = false;
        //         tempData.forEach((surveyList) => {
        //             if (!added) {
        //                 if (surveyList.date === this.datePipe.transform(surveyItem.datetime, 'M/dd/yy')) {
        //                     surveyList.listOfSurveys.push(surveyItem);
        //                     added = true;


        //                 }
        //             }
        //         });
        //         if (!added) {

        //             const listOfSurvey = new SurveyDataHelper();
        //             listOfSurvey.date = this.datePipe.transform(surveyItem.datetime, 'M/dd/yy');
        //             listOfSurvey.listOfSurveys.push(surveyItem);
        //             tempData.push(listOfSurvey);
        //             added = true;


        //         }
        //     }
        // });
        // this.listOfSurveyDataHelper = tempData.sort(function (a, b) {
        //     var dateA = new Date(a.date).getTime(),
        //         dateB = new Date(b.date).getTime();
        //     return dateA - dateB;
        // });

        // this.listOfSurveyDataHelper.forEach((element, index) => {
        //     console.log('element index', element.listOfSurveys, index);

        //     if (element.date == this.today) {
        //         this.indexoftodayrow = index;
        //     }
        // });
        // this.scrollTo();
        // this.cdr.detectChanges();
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
        });

        return records;
    }

    sDatePassed(datestring: any, i) {
        var checkdate = moment(datestring, "YYYYMMDD");
        var todaydate = moment(new Date(), "YYYYMMDD");
        var lateby = todaydate.diff(checkdate, "days");
        this.overdue = lateby;


    }

    ionViewWillLeave() {
        console.log('ionViewWillLeave');
        this.dateChangeSubscriptionns.unsubscribe();
        this.cdr.detach();
    }


    ngOnDestroy(): void {
        console.log('ngOnDestroy');

        // this.refreshSubscription.unsubscribe();
        // this.routeSubscription.unsubscribe();
        this.dataRefreshSubscription.unsubscribe();
        this.surveyRefreshSubscription.unsubscribe();

        this.cdr.detach();
    }

    setupCometChat() {
        let userId = this.storageService.getUserID();
        const user = new CometChat.User(userId);
        user.setName(this.storageService.getUser().firstname + ' ' + this.storageService.getUser().lastname);
        const appSetting = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(COMETCHAT_CONSTANTS.REGION).build();
        CometChat.init(COMETCHAT_CONSTANTS.APP_ID, appSetting).then(
            () => {

                // if(this.utils.currentUserValue != null){
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

    startsurvey(surveyData, event) {
        event.stopPropagation();
        // let postData = {
        //     assignedto: this.userData.id,
        //     status: "assigned"
        // };
        // this.apiService.updateSurveyForm(postData, surveyData.id).subscribe(res => {

        // })
        this.router.navigate(['/start-survey/' + surveyData.id + '/' + surveyData.jobtype]);

    }

    resumesurvey(surveyData, event) {
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
        this.router.navigate(['/chat/' + surveyData.chatid])
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

    // auto sync survey
    autoSyncSurvey(): void {
        this.storage.get('autoSyncSurvey').then((data) => {
            console.log('autoSyncSurvey data', data);
            let netWorkType = localStorage.getItem('networkType');
            console.log('netWorkType', netWorkType);
            if (data == true && netWorkType == 'wifi') {
                // this.startSyncSurvey = this.serveyUploadService.syncSurvey(false);
                this.syncSurvey(false);
            }
        });
    }

    syncSurvey(loading = null) {
        console.log('syncSurvey', loading);

        this.getCurrentCoordinates();
        this.listOfSurveysToSave = [];
        this.storage.keys().then((listOfKeys) => {
            listOfKeys.forEach((item) => {
                console.log('syncSurvey item', item);

                this.storage.get(item).then((data: SurveyStorageModel) => {
                    console.log('data.saved', data.saved);

                    if (data.saved) {
                        this.listOfSurveysToSave.push(data);
                    }
                });
            });
        });

        setTimeout(() => {
            console.log('this.listOfSurveysToSave', this.listOfSurveysToSave);
            if (this.listOfSurveysToSave.length > 0) {
                this.uploadAllSurvey(this.listOfSurveysToSave[0], loading);
            }
        }, 5000);
    }

    // send images or file to upload
    uploadAllSurvey(surveyData, loading = null) {
        this.startSyncSurvey = true;
        this.surveyid = surveyData.surveyid ? surveyData.surveyid : '';
        if (this.surveyid) {
            this.filesarray = [];
            surveyData.menuitems.forEach(mainmenu => {
                if (mainmenu.viewmode == VIEWMODE.FORM) {
                    mainmenu.children.forEach(child => {
                        if (child.formelements.length > 0) {
                            child.formelements.forEach(formelement => {
                                if (formelement.controltype == CONTROLTYPE.CONTROL_SINGLE_FILE_UPLOAD || formelement.controltype == CONTROLTYPE.CONTROL_MULTIPLE_FILE_UPLOAD) {
                                    formelement.attachments.forEach(attachment => {
                                        if (!attachment.uploadstatus) {
                                            this.filesarray.push(attachment);
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });

            this.totalfilestoupload = this.filesarray.length;
            if (this.totalfilestoupload > 0) {
                this.uploadfileattachment(0, loading, surveyData);
            } else {
                this.uploadImagesToServer(surveyData, loading);
            }
        }
    }

    // send single file to upload on server
    uploadfileattachment(index, loading = null, surveyData) {
        try {
            if (loading == null) {
                this.utils.setLoadingMessage('Uploading file ' + (index + 1) + ' of ' + this.filesarray.length);
            }

            const filedata = new FormData();
            filedata.append("files", this.filesarray[index].file);
            filedata.append('path', 'survey/' + this.surveyid);
            filedata.append('refId', this.surveyid + '');
            filedata.append('ref', 'survey');
            filedata.append('field', this.filesarray[index].controlname);
            this.apiService.uploaddesign(filedata).subscribe((data) => {
                this.filesarray[index].uploadstatus = true;
                if (index < this.filesarray.length - 1) {
                    this.uploadfileattachment(index + 1, loading, surveyData);
                } else {
                    this.uploadImagesToServer(surveyData, loading);
                }
            }, (error) => {
                this.startSyncSurvey = false;
                if (loading == null) {
                    this.utils.hideLoading().then(() => {
                        this.handleuploadfailure();
                    });
                }
            });
        } catch (error) {
            // console.log("uploadfileattachment--"+error);
        }
    }

    // send single image to upload
    uploadImagesToServer(surveyData, loading = null) {
        try {
            this.imagesArray = [];
            surveyData.menuitems.forEach(mainmenu => {
                mainmenu.children.forEach(child => {
                    child.capturedshots.forEach(shot => {
                        shot.imageuploadname ? shot.imageuploadname : shot.imageuploadname = shot.imagename;
                        if (!shot.imagecleared && !shot.uploadstatus) {
                            this.imagesArray.push(shot);
                        }
                    });
                });
            });

            this.totalimagestoupload = this.imagesArray.length;
            if (this.totalimagestoupload > 0) {
                this.uploadimages(0, loading, surveyData);
            } else {
                this.savedetailsformdata(loading, surveyData);
            }
        } catch (error) {
            // console.log("uploadImagesToServer---" + error);
        }
    }

    // upload image using API call on server
    uploadimages(index, loading = null, surveyData) {
        try {
            const blob = this.utils.getBlobFromImageData(this.imagesArray[index].shotimage);
            let filename = '';
            if (this.imagesArray[index].imageuploadname === '') {
                filename = Date.now().toString() + '.png';
            } else {
                filename = this.imagesArray[index].imageuploadname + '.png';
            }

            this.surveyUploadImageCount = 'Uploading image ' + (index + 1) + ' of ' + this.imagesArray.length;

            this.apiService.uploadImage(this.surveyid, this.imagesArray[index].imagekey, blob, filename).subscribe((data) => {
                this.imagesArray[index].uploadstatus = true;
                if (index < this.imagesArray.length - 1) {
                    this.uploadimages(index + 1, loading, surveyData);
                } else {
                    this.savedetailsformdata(loading, surveyData);
                }
            }, (error) => {
                this.startSyncSurvey = false;
                if (loading == null) {
                    this.utils.hideLoading().then(() => {
                        this.handleuploadfailure();
                    });
                }
            });
        } catch (error) {
            // console.log("uploadimages---" + error);
        }
    }

    // update survey using API call on server
    savedetailsformdata(loading = null, surveyData) {
        let tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate());
        let d_date = tomorrow.toISOString();
        try {
            if (loading == null) {
                this.utils.setLoadingMessage('Saving form data');
            }
            const data = surveyData.formdata;

            for (let key in data) {
                if (key === 'batterysystem') {
                    data[key] = data[key].toString();
                } else if (key === 'existingsolarsystem') {
                    data[key] = data[key].toString();
                } else if (key === 'esid_number') {
                    data['esid'] = data[key]
                }

                if (key === 'batterysystem') {
                    data[key] = data[key].toString();
                } else if (key === 'roofmaterial' || key === 'invertermake' || key === 'invertermodel') {
                    data[key] = data[key] ? data[key].id : null
                } else if (key === 'pvinverterlocation') {
                    data[key] = data[key] ? data[key] : null
                }
            }

            data['status'] = 'completed';
            data['latitude'] = this.latitude;
            data['longitude'] = this.longitude;
            data['deliverydate'] = d_date;

            this.apiService.updateSurveyForm(data, this.surveyid).subscribe((response) => {
                let userId = this.storageService.getUserID();

                this.storage.remove(userId + '-' + this.surveyid);
                this.listOfSurveysToSave.splice(0, 1);
                this.surveyUploadImageCount = '';
                if (this.listOfSurveysToSave.length > 0) {
                    this.uploadAllSurvey(this.listOfSurveysToSave[0], loading);
                } else {
                    this.startSyncSurvey = false;
                }

                this.listOfSurveyDataHelper.forEach((element, index) => {
                    let getIndex = element.listOfSurveys.findIndex((d) => d.id === this.surveyid);
                    console.log('getIndex', getIndex);
                    if (getIndex >= 0) {
                        element.listOfSurveys.splice(getIndex, 1);
                        this.eventService.publish('foo:update-survey-count', {
                            isUpdateSurveyCount: true
                        });
                    }
                });

                this.cdr.detectChanges();
            }, (error) => {
                console.log('updateSurveyForm error', error);
                this.startSyncSurvey = false;
                this.surveyid = 0;
                if (loading == null) {
                    this.utils.hideLoading().then(() => {
                        this.utils.errorSnackBar('There was some error in processing the request');
                    });
                }
            });
        } catch (error) {
            // console.log("savedetailsformdata---" + error);
        }
    }

    // use geolocation to get user's device coordinates
    getCurrentCoordinates() {
        this.geolocation.getCurrentPosition().then((resp) => {
            this.latitude = resp.coords.latitude;
            this.longitude = resp.coords.longitude;
            let address = this.utils.getAddressFromLatLng(this.latitude, this.longitude);
            this.surveystate = address.state;
            this.surveycity = address.city;
        }).catch((error) => {
            // console.log('Error getting location', error);
        });
    }

    async handleuploadfailure() {
        const toast = await this.toastController.create({
            message: 'Unable to upload data due to network failure. Please try after sometime.',
            duration: 3000
        });
        toast.present();
        this.handleSurveyExit();
    }

    handleSurveyExit() {
        let userData = this.storageService.getUser();
        if (userData.role.type == 'surveyors') {
            this.utils.sethomepageSurveyRefresh(true);
            this.navController.navigateBack('surveyor-overview');
        } else {
            this.utils.sethomepageSurveyRefresh(true);
            this.navController.navigateBack('/home/survey');
        }
    }
}
