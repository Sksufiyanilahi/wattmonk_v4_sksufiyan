import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { IonTabs, NavController, Platform, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Subscription } from 'rxjs';
import { CometChat } from '@cometchat-pro/cordova-ionic-chat';

import { SurveyStorageModel } from 'src/app/models/survey-storage.model';
import { ApiService } from 'src/app/services/api/api.service';
import { Appversion } from 'src/app/services/appversion';
import { CustomEventsService } from 'src/app/services/custom-events/custom-events.service';
import { NetworkDetectService } from 'src/app/services/network-detect/network-detect.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { COMETCHAT_CONSTANTS } from 'src/app/services/constants';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import * as moment from 'moment';

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
    selector: 'app-surveyor-overview',
    templateUrl: './surveyor-overview.page.html',
    styleUrls: ['./surveyor-overview.page.scss'],
})
export class SurveyorOverviewPage implements OnInit {
    @ViewChild('tabs', { static: true }) tabs: IonTabs;
    private version = Appversion.version;
    private subscription: Subscription;
    update_version: string;
    netSwitch: any;
    showSearchBar = false;
    userData: any;
    deactivateNetworkSwitch: Subscription;
    unreadCount: Object;
    // public startSyncSurvey: boolean;
    public startSyncSurvey: any;
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

    public dateExample = new Date().toISOString();
    public dateModal: any;

    public userAccessRights: any = {
        viewonly: true
    };
    formwidth = 0;
    my_datetime: any;
    datetime: any;
    is_Date_Changed: boolean = false;
    constructor(
        public route: Router,
        private storage: StorageService,
        private apiService: ApiService,
        private utilities: UtilitiesService,
        private platform: Platform,
        private iab: InAppBrowser,
        private network: NetworkDetectService,
        private datastorage: Storage,
        private geolocation: Geolocation,
        private toastController: ToastController,
        private navController: NavController,
        private eventService: CustomEventsService,
    ) { }

    ngOnInit() {
        console.log(this.dateExample, "is date")
        this.datetime = moment().format('YYYY-MM-DDTHH:mm:ss');
        this.datetime = this.dateExample;
        console.log(this.datetime, "is formatted original datetime")
        // localStorage.setItem('datetime',this.datetime)
        this.my_datetime = this.datetime;
        localStorage.setItem('selectedDate', this.my_datetime);
        localStorage.getItem('selectedDate')
        this.formwidth = this.platform.width() - 86;

        this.fetchsurveyprocessjsons();
        this.userData = this.storage.getUser();
        this.apiService.version.subscribe(versionInfo => {
            this.update_version = versionInfo;
        })
        this.apiService.emitUserNameAndRole(this.userData);
        this.setupCometChat();
        this.updateUserPushToken();
        this.getNotificationCount();
        this.getSurveycounts();

        this.route.navigate(['surveyor-overview/new-surveys']);

        // this.eventService.subscribe('foo:update-survey-count', (data: any) => {
        //     console.log('data', data);
        //     console.log('data.isUpdateSurveyCount', data.isUpdateSurveyCount);

        //     if (data.isUpdateSurveyCount) {
        //         this.getSurveycounts();
        //     }
        // });

        // get access right permission data
        setTimeout(() => {
            this.userAccessRights = this.utilities.getUserAccessRights('survey');
        }, 1000);

        // this.datastorage.get('autoSyncSurvey').then((data) => {
        //     console.log('autoSyncSurvey data', data);
        //     let netWorkType = localStorage.getItem('networkType');
        //     console.log('netWorkType', netWorkType);
        //     if (data == true && netWorkType == 'wifi') {
        //         // this.startSyncSurvey = this.serveyUploadService.syncSurvey(false);
        //         this.syncSurvey(false);
        //     }
        // });
    }

    getSurveycounts(event?,) {
        this.apiService.getSurveycounts(this.userData.id, '', this.my_datetime).subscribe(res => {
            console.log('res', res);
            this.surveyCounts = res;
        })
    }

    searchbar() {
        this.route.navigate(['/search-bar']);
    }

    modalOpen() {
        this.dateModal = true;
        // console.log(this.dateExample,"is date")
    }
    dismissModal() {
        this.dateModal = false;
        console.log('this.route.url', this.route.url);

        this.eventService.publish('update-survey-date', {
            isUpdateSurveyDate: true,
            C_date: this.my_datetime
        });

        // if (this.route.url == '/surveyor-overview/new-surveys') {
        //     this.eventService.publish('foo:isNewSurvey', {
        //         isNewSurvey: true,
        //         C_date: this.my_datetime
        //     });
        // } else if (this.route.url == '/surveyor-overview/unassigned') {
        //     this.eventService.publish('foo:isUnassignedSurvey', {
        //         isUnassignedSurvey: true,
        //         C_date: this.my_datetime
        //     });
        // } else if (this.route.url == '/surveyor-overview/completed-surveys') {
        //     this.eventService.publish('foo:isCompletedSurvey', {
        //         isCompletedSurvey: true,
        //         C_date: this.my_datetime
        //     });
        // }

    }

    changeDateTime(event) {
        this.my_datetime = moment(event.detail.value).format('YYYY-MM-DDTHH:mm:ss');
        this.getSurveycounts();

        // this.surveyForm.get('surveydatetime').setValue(new Date(this.my_date + ' ' + this.my_time).getTime());
    }

    fetchsurveyprocessjsons() {
        this.datastorage.get('pvsurveyjson').then((data) => {
            // console.log(data);
            if (!data) {
                this.apiService.fetchJSON(this.storage.getParentId(), 'pv').subscribe((response: any) => {
                    // console.log(response);
                    this.datastorage.set('pvsurveyjson', response);
                });
            }
        });
    }

    getNotificationCount() {
        this.apiService.getCountOfUnreadNotifications().subscribe((count) => {

            this.unreadCount = count;
        });


    }

    ngOnDestroy() {
        this.deactivateNetworkSwitch.unsubscribe();
    }

    setupCometChat() {
        let userId = this.storage.getUserID();
        const user = new CometChat.User(userId);
        user.setName(this.storage.getUser().firstname + ' ' + this.storage.getUser().lastname);
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

    updateUserPushToken() {
        this.apiService.pushtoken(this.storage.getUserID(), { "newpushtoken": localStorage.getItem("pushtoken") }).subscribe((data) => {


        }, (error) => {
        });
    }

    ionViewDidEnter() {

        if (this.version !== this.update_version && this.update_version !== '') {

            setTimeout(() => {

                this.utilities.showAlertBox('Update App', 'New version of app is available on Play Store. Please update now to get latest features and bug fixes.', [{
                    text: 'Ok',

                    handler: () => {
                        this.iab.create('https://play.google.com/store/apps/details?id=com.solar.wattmonk', "_system");
                        this.ionViewDidEnter();
                    }
                }]);
            }, 2000)
        }
        this.deactivateNetworkSwitch = this.network.networkSwitch.subscribe(data => {
            this.netSwitch = data;


        })

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

    setzero() {
        this.unreadCount = 0;
    }

    scheduledPage() {

        this.route.navigate(['/schedule/survey']);
        this.utilities.setDesignDetails(null);
    }

    changeToggle(pageName) {
        localStorage.setItem('selectedDate', this.my_datetime);
        this.getSurveycounts();
        // this.eventService.publish('update-survey-date', {
        //     isUpdateSurveyDate: true,
        //     C_date: this.my_datetime
        // });

    }

    dateback() {
        var date = this.my_datetime;
        var tempDate = moment(date).subtract(1, 'days');

        const datodate = moment(tempDate).format('YYYY-MM-DDTHH:mm:ss');
        console.log(datodate);
        this.my_datetime = datodate;
        this.dateExample = datodate;
        this.eventService.publish('update-survey-date', {
            isUpdateSurveyDate: true,
            C_date: this.my_datetime
        });

        // if (this.route.url == '/surveyor-overview/new-surveys') {
        //     this.eventService.publish('foo:isNewSurvey', {
        //         isNewSurvey: true,
        //         C_date: this.my_datetime
        //     });
        // } else if (this.route.url == '/surveyor-overview/unassigned') {
        //     this.eventService.publish('foo:isUnassignedSurvey', {
        //         isUnassignedSurvey: true,
        //         C_date: this.my_datetime
        //     });
        // } else if (this.route.url == '/surveyor-overview/completed-surveys') {
        //     this.eventService.publish('foo:isCompletedSurvey', {
        //         isCompletedSurvey: true,
        //         C_date: this.my_datetime
        //     });
        // }
        this.getSurveycounts();

    }

    datenext() {
        var date = this.my_datetime;
        var tempDate = moment(date).add(1, 'days');
        const datodate = moment(tempDate).format('YYYY-MM-DDTHH:mm:ss');
        console.log(datodate);
        this.my_datetime = datodate;
        this.dateExample = datodate;
        this.eventService.publish('update-survey-date', {
            isUpdateSurveyDate: true,
            C_date: this.my_datetime
        });

        // if (this.route.url == '/surveyor-overview/new-surveys') {
        //     this.eventService.publish('foo:isNewSurvey', {
        //         isNewSurvey: true,
        //         C_date: this.my_datetime
        //     });
        // } else if (this.route.url == '/surveyor-overview/unassigned') {
        //     this.eventService.publish('foo:isUnassignedSurvey', {
        //         isUnassignedSurvey: true,
        //         C_date: this.my_datetime
        //     });
        // } else if (this.route.url == '/surveyor-overview/completed-surveys') {
        //     this.eventService.publish('foo:isCompletedSurvey', {
        //         isCompletedSurvey: true,
        //         C_date: this.my_datetime
        //     });
        // }

        this.getSurveycounts();
    }

}
