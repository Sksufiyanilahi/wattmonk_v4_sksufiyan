import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController, NavController, Platform, PopoverController, ToastController } from '@ionic/angular';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@awesome-cordova-plugins/native-geocoder/ngx';
import * as moment from 'moment';
import { CometChat } from '@cometchat-pro/cordova-ionic-chat/CometChat';
import { Location } from '@angular/common';

// model import
import { AddressModel } from 'src/app/models/address.model';
import { ScheduleFormEvent } from 'src/app/models/constants';
import { LoginModel } from 'src/app/models/login.model';

// service import
import { CustomEventsService } from '../custom-events/custom-events.service';
import { StorageService } from '../storage/storage.service';

// component import
import { SuccessModalComponent } from 'src/app/components/utilities/success-modal/success-modal.component';
import { PopoverComponent } from 'src/app/components/popover/popover.component';
import { COMETCHAT_CONSTANTS, ROLES } from '../constants';
import { FormGroup } from '@angular/forms';
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
import { Downloader, DownloadRequest, NotificationVisibility } from '@ionic-native/downloader/ngx';
import { FileTransfer, FileTransferObject } from '@awesome-cordova-plugins/file-transfer/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';

@Injectable({
    providedIn: 'root'
})
export class UtilitiesService {
    guid$: Observable<any>;
    private myMethodSubject = new Subject<any>();
    isspecificClient: boolean;
    loading: HTMLIonLoadingElement;
    isLoading = false;
    address = new BehaviorSubject<AddressModel>({
        address: '',
        lat: 0,
        long: 0,
        country: '',
        state: '',
        city: '',
        postalcode: ''
    });
    staticAddress = new BehaviorSubject<string>('');
    saveScheduleForm = new BehaviorSubject<ScheduleFormEvent>(ScheduleFormEvent.NO_EVENT);
    homepageDesignRefresh = new BehaviorSubject<boolean>(false);
    homepageSurveyRefresh = new BehaviorSubject<boolean>(false);
    homepagePermitRefresh = new BehaviorSubject<boolean>(false);
    surveyDetailsRefresh = new BehaviorSubject<boolean>(false);
    designDetailsRefresh = new BehaviorSubject<boolean>(false);
    peStampRefresh = new BehaviorSubject<boolean>(false);
    teamModuleRefresh = new BehaviorSubject<boolean>(false);
    permitdesignDetailsRefresh = new BehaviorSubject<boolean>(false);
    //permitdesignDetailsRefresh = new BehaviorSubject<boolean>(false);
    showBottomBarHomepage = new BehaviorSubject<boolean>(true);
    uploadfile = new BehaviorSubject<string>('');
    manualInput = new BehaviorSubject<string>('');
    paymentMode = new BehaviorSubject<string>('');
    couponid = new BehaviorSubject<number>(null);

    dataRefresh = new BehaviorSubject<boolean>(false);
    private currentUserSubject: BehaviorSubject<LoginModel>;
    public currentUser: Observable<LoginModel>;
    user: any;
    ////
    private addUpper = true;
    private addNumbers = true;
    private addSymbols = false;
    private passwordLength = 6;
    designlistofdesignDetail: any;
    groupid: any;
    callData: any;

    toast: any;
    popover: HTMLIonPopoverElement;
    platformname: any;
    prelimId = new BehaviorSubject<string>('');
    requesttype = new BehaviorSubject<string>('');
    requirementtype = new BehaviorSubject<string>('');
    public isChatUserLoggedin: boolean = false;
    public retryAttempt: number = 2;
    public fcmPushToken: string;
    public totalCountsForAllGroups;

    constructor(
        public loadingController: LoadingController,
        private toastController: ToastController,
        private alertController: AlertController,
        private modalController: ModalController,
        private storageService: StorageService,
        private router: Router,
        private socialsharing: SocialSharing,
        private navCtrl: NavController,
        private location: Location,
        private popoverController: PopoverController,
        private platform: Platform,
        private nativeGeocoder: NativeGeocoder,
        private eventService: CustomEventsService,
        private downloader: Downloader,
        private fileOpener: FileOpener,
        private file: File,
        private transfer: FileTransfer,
    ) {
        this.guid$ = this.myMethodSubject.asObservable();
        // this.listencall();
        this.user = this.storageService.getUser();
        this.currentUserSubject = new BehaviorSubject<LoginModel>(this.user);
        this.currentUser = this.currentUserSubject.asObservable();
    }

    guid(data) {

        // we can do stuff with data if we want

        this.groupid = data;
        this.myMethodSubject.next(data);
    }

    public get currentUserValue(): LoginModel {
        return this.currentUserSubject.value;
    }

    getPaymentMode(): BehaviorSubject<string> {
        return this.paymentMode;
    }

    setPaymentMode(paymentMode: string) {
        this.paymentMode.next(paymentMode);
    }

    getCouponId(): BehaviorSubject<number> {
        return this.couponid;
    }

    setCouponId(couponId: number) {
        this.couponid.next(couponId);
    }

    getAddressObservable(): BehaviorSubject<AddressModel> {
        return this.address;
    }

    setAddress(address: AddressModel) {
        this.address.next(address);
    }

    getHomepageDesignRefresh(): BehaviorSubject<boolean> {
        return this.homepageDesignRefresh;
    }

    setHomepageDesignRefresh(refresh: boolean) {
        this.homepageDesignRefresh.next(refresh);
    }

    getHomepagePermitRefresh(): BehaviorSubject<boolean> {
        return this.homepagePermitRefresh;
    }

    setHomepagePermitRefresh(refresh: boolean) {
        this.homepagePermitRefresh.next(refresh);
    }

    getHomepageSurveyRefresh(): BehaviorSubject<boolean> {
        return this.homepageSurveyRefresh;
    }

    sethomepageSurveyRefresh(refresh: boolean) {
        this.homepageSurveyRefresh.next(refresh);
    }

    getPeStampRefresh(): BehaviorSubject<boolean> {
        return this.peStampRefresh;
    }

    setPeStampRefresh(refresh: boolean) {
        this.peStampRefresh.next(refresh);
    }

    getteamModuleRefresh(): BehaviorSubject<boolean> {
        return this.teamModuleRefresh;
    }

    setteamModuleRefresh(refresh: boolean) {
        this.teamModuleRefresh.next(refresh);
    }

    getDataRefresh(): BehaviorSubject<boolean> {
        return this.dataRefresh;
    }

    setDataRefresh(refresh: boolean) {
        this.dataRefresh.next(refresh);
    }

    getSurveyDetailsRefresh(): BehaviorSubject<boolean> {
        return this.surveyDetailsRefresh;
    }

    setSurveyDetailsRefresh(refresh: boolean) {
        this.surveyDetailsRefresh.next(refresh);
    }

    getBottomBarHomepage(): BehaviorSubject<boolean> {
        return this.showBottomBarHomepage;
    }

    setBottomBarHomepage(value: boolean) {
        this.showBottomBarHomepage.next(value);
    }

    getDesignDetailsRefresh(): BehaviorSubject<boolean> {
        return this.designDetailsRefresh;
    }

    setDesignDetailsRefresh(value: boolean) {
        this.designDetailsRefresh.next(value);
    }

    getPermitDesignDetailsRefresh(): BehaviorSubject<boolean> {
        return this.permitdesignDetailsRefresh;
    }
    setPermitDesignDetailsRefresh(value: boolean) {
        this.permitdesignDetailsRefresh.next(value);
    }

    getdesignDetails() {
        return this.designlistofdesignDetail;
    }

    setDesignDetails(data) {
        this.designlistofdesignDetail = data;
    }
    // getPermitDesignDetailsRefresh(): BehaviorSubject<boolean> {
    //   return this.permitdesignDetailsRefresh;
    // }

    // setPermitDesignDetailsRefresh(value: boolean) {
    //   this.permitdesignDetailsRefresh.next(value);
    // }

    getPrelimId(): BehaviorSubject<string> {
        return this.prelimId;
    }

    setPrelimId(data: string) {
        this.prelimId.next(data);
    }

    getRequestType(): BehaviorSubject<string> {
        return this.requesttype;
    }
    getrequirementtype(): BehaviorSubject<string> {
        return this.requirementtype;
    }
    setRequestType(requesttype: string) {
        this.requesttype.next(requesttype);
    }

    getScheduleFormEvent(): BehaviorSubject<ScheduleFormEvent> {
        return this.saveScheduleForm;
    }

    setScheduleFormEvent(event: ScheduleFormEvent) {
        this.saveScheduleForm.next(event);
        this.saveScheduleForm.next(ScheduleFormEvent.NO_EVENT);
    }

    async showLoading(message?: string) {
        let finalMessage = '';
        if (message) {
            finalMessage = message;
        } else {
            finalMessage = 'Please Wait';
        }
        this.loading = await this.loadingController.create({
            message: finalMessage
        });
        return await this.loading.present();
    }

    async showLoadingWithPullRefreshSupport(showPopup: boolean, message?: string) {
        if (showPopup) {
            let finalMessage = '';
            if (message) {
                finalMessage = message;
            } else {
                finalMessage = 'Please Wait';
            }
            this.loading = await this.loadingController.create({
                message: finalMessage
            });
            return this.loading.present();
        } else {
            return Promise.resolve();
        }
    }

    setLoadingMessage(message: string) {
        this.loading.message = message;
    }

    async hideLoading() {
        return await this.loading.dismiss();

        //this.isLoading = false;
        //return await this.loadingController.dismiss().then(() => console.log('dismissed'));



    }

    hideLoadingWithPullRefreshSupport(showPopup: boolean): Promise<boolean> {
        if (showPopup) {
            return this.loading.dismiss();
        } else {
            return Promise.resolve(true);
        }
    }

    async showAlert(message) {
        const alert = await this.alertController.create({
            header: 'Error',
            message,
            buttons: ['OK']
        });

        await alert.present();
    }

    async showSuccessModal(successMessage: string): Promise<HTMLIonModalElement> {
        const modal = await this.modalController.create({
            component: SuccessModalComponent,
            cssClass: 'survey-modal-css',
            backdropDismiss: false,
            componentProps: {
                message: successMessage
            }
        });
        return modal;
    }

    capitalizeWord(word: string): string {
        if (!word) {
            return word;
        }
        return word[0].toUpperCase() + word.substr(1).toLowerCase();
    }

    async showSnackBar(message) {
        this.hideLoading();
        const toast = await this.toastController.create({
            message,
            duration: 2000,
            cssClass: 'my-custom-class'
        });
        await toast.present();
    }

    async errorSnackBar(message) {
        this.hideLoading();
        const toast = await this.toastController.create({
            message,
            duration: 2000,
            cssClass: 'my-custom-error-class'
        });
        await toast.present();
    }

    async uploadingSnackBar(message) {
        //this.hideLoading();
        //const toast = await this.toastController.create({

        this.toast = await this.toastController.create({
            message,
            //duration: 2000,
            cssClass: 'my-custom-class'
        });
        await this.toast.present();
    }

    async hideUploadingLoading() {
        //that = this;

        await this.toast.dismiss();
    }

    setStaticAddress(address: string) {
        this.staticAddress.next(address);
    }

    getStaticAddress(): BehaviorSubject<string> {
        return this.staticAddress;
    }

    getBlobFromImageData(dataURI): Blob {
        // convert base64 to raw binary data held in a string
        const byteString = atob(dataURI.split(',')[1]);
        // separate out the mime component
        const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

        // write the bytes of the string to an ArrayBuffer
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        return new Blob([ab], { type: mimeString });
    }

    getJobTypeName(type) {
        if (type == 'pvbattery') {
            return 'PV+Battery';
        } else if (type == 'battery') {
            return 'Battery';
        } else {
            return 'PV';
        }
    }

    getPestampTypeName(type) {
        if (type == 'structural') {
            return 'Structural';
        } else if (type == 'electrical') {
            return 'Electrical';
        } else {
            return 'Both';
        }
    }

    getRemainingTime(endtime: string) {
        var now = new Date();
        var t = Date.parse(endtime) - Date.parse(now.toString());
        var minutes = Math.floor((t / 1000 / 60) % 60);
        var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        if (hours > 0 || minutes > 0) {
            return '' + hours + 'h : ' + minutes + 'm';
        } else {
            return '0h : 0m';
        }
    }

    b64toBlob(b64Data) {
        let contentType = b64Data.split(',')[0].split(':')[1].split(';')[0] || '';
        var sliceSize = 256;

        var byteCharacters = atob(b64Data.split(',')[1]);
        var byteArrays = [];

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);
            var byteNumbers = new Array(slice.length);

            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

        return new Blob(byteArrays, { type: contentType });
    }

    b64tBlob(b64Data) {
        let contentType = 'image/jpg';
        let sliceSize = 512;
        b64Data = b64Data.replace(/data\:image\/(jpeg|jpg|png)\;base64\,/gi, '');
        let byteCharacters = atob(b64Data);
        let byteArrays = [];

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);
            var byteNumbers = new Array(slice.length);

            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

        return new Blob(byteArrays, { type: contentType });
    }

    async showAlertBox(header, message, button?) {
        const alert = await this.alertController.create({
            header: header,
            message: message,
            buttons: button,
            backdropDismiss: false
        });

        await alert.present();
    }

    async presentPopover(ev: any) {


        this.popover = await this.popoverController.create({
            component: PopoverComponent,
            cssClass: 'my-custom',
            event: ev,
            translucent: true
        });
        return await this.popover.present();
    }

    async dismissPopover() {
        this.popover.dismiss();
    }

    formatDateInTimeAgo(datestring: any) {
        return moment(datestring, 'YYYY-MM-DD HH:mm:ss GMT Z').fromNow();
    }

    isDatePassed(datestring: string) {
        var checkdate = moment(datestring, 'YYYYMMDD');
        var todaydate = moment(new Date(), 'YYYYMMDD');
        var lateby = todaydate.diff(checkdate, 'days');
        if (lateby > 0) {
            return true;
        } else {
            return false;
        }
    }

    getTheLatebyString(datestring: string) {
        var start = moment(datestring, 'YYYYMMDD');
        var end = moment(new Date(), 'YYYYMMDD');
        var lateby = end.diff(start, 'days');
        if (lateby == 0) {
            return 'few minutes';
        } else if (lateby == 1) return 'a day';
        else if (lateby < 30 && lateby > 0) return lateby + ' days';
        else if (lateby == 30) return 'a month';
        else if (lateby > 30 && lateby < 365) return lateby + ' months';
        else if (lateby == 365) return 'an year';
        else {
            return 'few minutes';
        }
    }

    getRoleNames(name) {
        if (this.user.role.name == 'ContractorSuperAdmin' || this.user.role.name == 'ContractorSuperAdmin') {
            name = 'SuperAdmin';
            return name;
        } else if (this.user.role.name == 'WattmonkAdmin') {
            name = 'Admin';
            return name;
        } else {
            return this.user.role.name;
        }
    }

    randomPass() {
        var lower = 'abcdefghijklmnopqrstuvwxyz';
        var upper = this.addUpper ? lower.toUpperCase() : '';
        var nums = this.addNumbers ? '0123456789' : '';
        var symbols = this.addSymbols ? "!#$%&'()*+,-./:;<=>?@[\\]^_`{|}~" : '';
        var all = lower + upper + nums + symbols;
        while (true) {
            var pass = '';
            for (var i = 0; i < this.passwordLength; i++) {
                pass += all[(Math.random() * all.length) | 0];
            }
            // criteria:
            if (!/[a-z]/.test(pass)) continue; // lowercase is a must
            if (this.addUpper && !/[A-Z]/.test(pass)) continue; // check uppercase
            if (this.addSymbols && !/\W/.test(pass)) continue; // check symbols
            if (this.addNumbers && !/\d/.test(pass)) continue; // check nums
            return pass; // all good
        }
    }

    // getNotificationCount(){
    //   this.apiService.getCountOfUnreadNotifications().subscribe( (count)=>{

    //     // this.unreadCount.next(count);
    //   });

    // this.unreadCount.subscribe(data=>{
    //   this.count = data;
    // })

    listencall() {
        var listnerID = this.groupid;
        const that = this;
        CometChat.addCallListener(
            listnerID,
            new CometChat.CallListener({
                onIncomingCallReceived(call) {

                    that.callData = call;
                    // if(call.status=='initiated'){
                    that.router.navigate(['/', 'calling-screen']);
                    // }
                    // Handle incoming call
                },
                onOutgoingCallAccepted(call) {

                    that.callData = call;
                    // Outgoing Call Accepted
                },
                onOutgoingCallRejected(call) {

                    that.callData = call;
                    // Outgoing Call Rejected
                    that.navCtrl.pop();
                },
                onIncomingCallCancelled(call) {

                    that.callData = call;

                    // that.location.back();
                    that.navCtrl.pop();
                }
            })
        );
    }

    getCallData(): Observable<any> {
        return this.callData;
    }

    static rejectCall(sessionId, rejectStatus) {
        let promise = new Promise((resolve, reject) => {
            CometChat.rejectCall(sessionId, rejectStatus).then((call) => resolve(call), (error) => reject(error));
        });

        return promise;
    }
    setupCometChat(): Observable<any> {
        const appID = COMETCHAT_CONSTANTS.APP_ID;
        const region = COMETCHAT_CONSTANTS.REGION;
        const appSetting = new CometChat.AppSettingsBuilder()
            .subscribePresenceForAllUsers()
            .setRegion(region)
            .autoEstablishSocketConnection(true)
            .build();

        return from(CometChat.init(appID, appSetting).then(
            () => {
                if (this.storageService.getUserID() !== '') {
                    this.doCometUserLogin();
                }

                // if(this.utilities.currentUserValue != null){
                // You can now call login function.

                // }
            },
            (error) => {

            }
        ));
    }

    async presentAlert(title, msg) {
        // const alert = await this.alertController.create({
        //     cssClass: 'my-custom-class',
        //     header: title,
        //     subHeader: 'Subtitle',
        //     message: msg,
        //     buttons: ['OK']
        // });

        // await alert.present();

        // const { role } = await alert.onDidDismiss();
        // console.log('onDidDismiss resolved with role', role);
    }

    doCometUserLogin() {
        // this.presentAlert('doCometUserLogin', 'in function');
        // new code
        const appID = COMETCHAT_CONSTANTS.APP_ID;
        const region = COMETCHAT_CONSTANTS.REGION;
        const appSetting: CometChat.AppSettings = new CometChat.AppSettingsBuilder()
            .subscribePresenceForAllUsers()
            .setRegion(region)
            // .autoEstablishSocketConnection(true)
            .build();
        CometChat.init(appID, appSetting).then(
            (initialized: boolean) => {
                setTimeout(() => {
                    let uData = this.storageService.getUser();
                    if (uData?.cometchatuid) {
                        this.getLoggedinCometChatUser(uData.cometchatuid);
                    }
                }, 1000);
            }, (error: CometChat.CometChatException) => {
                console.log("Initialization failed with error:", error);
            }
        );

        // old code comment on 20220322
        // let userId = this.storageService.getUserID() + COMETCHAT_CONSTANTS.UNIQUE_CODE;
        // const user = new CometChat.User(userId);
        // user.setName(this.storageService.getUser().firstname + ' ' + this.storageService.getUser().lastname);
        // const appSetting = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(COMETCHAT_CONSTANTS.REGION).build();
        // CometChat.init(COMETCHAT_CONSTANTS.APP_ID, appSetting).then(
        //     () => {

        //         // if(this.utilities.currentUserValue != null){
        //         // You can now call login function.
        //         CometChat.login(userId, COMETCHAT_CONSTANTS.API_KEY).then(
        //             (user) => {
        //                 console.log('user', user);

        //             },
        //             error => {

        //             }
        //         );
        //         // }
        //     },
        //     error => {

        //     }
        // );

    }

    // get Logged in CometChat User if not then login
    getLoggedinCometChatUser(cometchatuid) {
        // this.presentAlert('getLoggedinCometChatUser', cometchatuid);
        // const UID = this.storageService.getUserID() + COMETCHAT_CONSTANTS.UNIQUE_CODE;
        // const UID = this.user.cometchatuid;
        let pushToken = '';
        if (localStorage.getItem('pushtoken')) {
            pushToken = localStorage.getItem('pushtoken');
        }

        const apiKey = COMETCHAT_CONSTANTS.API_KEY;
        CometChat.getLoggedinUser().then(
            (user: CometChat.User) => {
                if (!user) {
                    // this.presentAlert('getLoggedinUser', '!user');
                    CometChat.login(cometchatuid, apiKey).then(
                        (user: CometChat.User) => {
                            console.log("CometChat Login Successful:", { user });
                            this.isChatUserLoggedin = true;
                            // this.presentAlert('CometChat.login', 'CometChat Login Successful:');

                            this.updateFcmTokenOnCometChat(pushToken);
                            this.getUnreadMessageCountForGroups();
                        }, (error: CometChat.CometChatException) => {
                            console.log('getLoggedinCometChatUser error', error);
                            // this.presentAlert('CometChat.login', 'error');
                            if (!this.isChatUserLoggedin && this.retryAttempt > 0) {
                                this.retryAttempt -= 1;
                                // this.getLoggedinCometChatUser(this.storageService.getUserID());
                                this.doCometUserLogin();

                                // this.createCometChatUser();
                            }
                        }
                    );
                } else {
                    // this.presentAlert('getLoggedinUser', 'else !user');
                    this.updateFcmTokenOnCometChat(pushToken);
                    this.getUnreadMessageCountForGroups();
                }
            }, (error: CometChat.CometChatException) => {
                console.log("getLoggedinUser Some Error Occured", { error });
                // this.presentAlert('getLoggedinUser', 'getLoggedinUser Some Error Occured');
            }
        );
    }

    // create CometChat user
    // createCometChatUser() {
    //     // const UID = this.storageService.getUserID();// + COMETCHAT_CONSTANTS.UNIQUE_CODE;
    //     const UID = this.storageService.getUserID();
    //     const apiKey = COMETCHAT_CONSTANTS.API_KEY;

    //     const user = new CometChat.User(UID);
    //     user.setName(this.user.firstname + ' ' + this.user.lastname);
    //     CometChat.createUser(user, apiKey).then(
    //         (user: CometChat.User) => {
    //             console.log('createCometChatUser user', user);

    //             this.getLoggedinCometChatUser('');
    //         }, (error: CometChat.CometChatException) => {
    //             console.log("createCometChatUser error", error);
    //         }
    //     )
    // }

    // update fcm token on ComentChat
    updateFcmTokenOnCometChat(pushToken) {
        // if platform ios then pass - {"voip":false}
        let passParams: any = {};
        if (this.platform.is('ios')) {
            passParams = { "voip": false }
        }
        // this.presentAlert('updateFcmTokenOnCometChat', pushToken);
        CometChat.registerTokenForPushNotification(pushToken, passParams).then(
            (res) => {
                console.log('CometChat registered token successfully', res);
                // this.presentAlert('updateFcmTokenOnCometChat', 'CometChat registered token successfully');
            }, (error) => {
                console.log('error in register token', error);
            }
        );
        // const appID = COMETCHAT_CONSTANTS.APP_ID;
        // const userUID = this.storageService.getUserID();
        // let appToken;

        // CometChat.getAppSettings().then((settings) => {
        //     console.log('settings', settings);
        //     const appsettings: any = settings;
        //     appsettings?.extensions?.forEach((ext) => {
        //         console.log('ext', ext);
        //         if (ext.id == "push-notification") {
        //             appToken = ext.appToken;
        //             console.log('appToken', appToken);
        //         }
        //     });
        //     if (appToken) {
        //         const url = "https://push-notification-us.cometchat.io/v1/subscribetomany?appToken=" + appToken;
        //         fetch(url, {
        //             method: "POST",
        //             headers: new Headers({
        //                 "Content-Type": "application/json",
        //             }),
        //             body: JSON.stringify({
        //                 appId: appID,
        //                 fcmToken: this.fcmPushToken,
        //                 uid: userUID,
        //                 groups: "groups",
        //                 platform: "javascript",
        //             }),
        //         }).then((response) => {
        //             console.log('response', response);

        //             // if (response.status < 200 || response.status >= 400) {
        //             // } else {
        //             // }
        //         }).catch((error) => {
        //             console.log('error', error);

        //             // do nothing.
        //         });
        //     }
        // });
    }

    // get unread message count for groups
    getUnreadMessageCountForGroups() {
        CometChat.getUnreadMessageCountForAllGroups().then((array) => {
            let totalcount: any = 0;
            const user = array;
            const entries = Object.entries(user);
            for (const val of entries) {
                totalcount += val[1];
            }
            this.totalCountsForAllGroups = totalcount;

            this.eventService.publish('foo:update-unread-msg-count', {
                unreadMessageCount: totalcount
            });


            // return totalcount;
        }, (error) => {
            // do nothing.
            console.log('error', error);
        });
    }

    // async get unread message count for groups
    async getUnreadMessageCountForGroupsAsyc() {

        await CometChat.getUnreadMessageCountForAllGroups().then(
            (array) => {
                let totalcount: any = 0;
                const user = array;
                const entries = Object.entries(user);
                for (const val of entries) {
                    totalcount += val[1];
                }
                this.totalCountsForAllGroups = totalcount;
                this.eventService.publish('foo:update-unread-msg-count', {
                    unreadMessageCount: totalcount
                });
                //console.log('inbox',totalcount);

                return totalcount;
            },
            () => {
                // do nothing.
            }
        );
    }

    formatTimeInDisplayFormat(datestring: any) {
        if (datestring != null) {
            var d = new Date(datestring);
            var offset = d.getTimezoneOffset();
            d.setMinutes(d.getMinutes() + offset);
            var formatted = new Intl.DateTimeFormat('en', {
                hour: 'numeric',
                minute: 'numeric'
            }).format(d);
            return formatted;
        } else {
            return "-";
        }
    }

    formatDateInDisplayFormat(datestring: any) {
        if (datestring != null) {
            // var d= moment(datestring).utc().format();
            const d = moment(datestring).utc().format('M/D/YY');
            const ye = moment(datestring).utc().format('YYYY');
            const mo = moment(datestring).utc().format('M');
            const da = moment(datestring).utc().format('D');
            const today = moment().utc().format('M/D/YY');
            if (d == today) {
                return "Today";
            } else {
                return (`${da}/${mo}/${ye}`);
            }
        } else {
            return "-";
        }
    }

    formatDate(date) {
        var d = new Date(date),
            hours = d.getHours(),
            mins = d.getMinutes(),
            seconds = d.getSeconds(),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;



        return [year, month, day].join('-') + ' ' + [(hours < 10 ? '0' : '') + hours, (mins < 10 ? '0' : '') + mins, (seconds < 10 ? '0' : '') + seconds].join(':');
    }

    checkPlatform() {
        if (this.platform.is('ios')) {
            this.platformname = 'iphone';
        } else if (this.platform.is('android')) {
            this.platformname = 'android';
        } else {
            this.platformname = 'web';
        }

        return this.platformname;
    }

    findInvalidControls(form: FormGroup) {
        const invalid = [];
        const controls = form.controls;
        for (const name in controls) {
            if (controls[name].invalid) {
                invalid.push(name);
            }
        }
        return invalid;
    }

    getAddressFromLatLng(latitude, longitude): AddressModel {
        let defaultaddress: AddressModel = {
            address: '',
            lat: 0,
            long: 0,
            country: '',
            state: '',
            city: '',
            postalcode: ''
        };
        let geoencoderoptions: NativeGeocoderOptions = {
            useLocale: true,
            maxResults: 5
        };
        this.nativeGeocoder.reverseGeocode(latitude, longitude, geoencoderoptions)
            .then((result: NativeGeocoderResult[]) => {
                defaultaddress = {
                    address: '',
                    lat: latitude,
                    long: longitude,
                    country: result[0].countryName,
                    state: result[0].administrativeArea,
                    city: result[0].locality,
                    postalcode: result[0].postalCode
                };
                return defaultaddress;
            })
            .catch((error: any) => {
                return defaultaddress;
            });
        return defaultaddress;
    }

    async showAlertBoxForForgot(message, button?) {
        const alert = await this.alertController.create({
            cssClass: 'reset-button',
            message: message,
            buttons: button,
            backdropDismiss: false
        });

        await alert.present();
    }

    getMimetype(extension) {

        var mimetype;

        switch (extension) {
            case '.gif':
                // Graphics Interchange Format
                mimetype = 'image/gif';
                break;
            case '.jpm':
                // JPEG 2000 Compound Image File Format
                mimetype = 'video/jpm';
                break;
            case '.jpeg':
            case '.jpg':
                // JPEG Image
                mimetype = 'image/jpeg';
                break;
            case '.jpgv':
                // JPGVideo
                mimetype = 'video/jpeg';
                break;
            case '.png':
                // Portable Network Graphics (PNG)
                mimetype = 'image/png';
                break;
            case '.ppm':
                // Portable Pixmap Format
                mimetype = 'image/x-portable-pixmap';
                break;
            case '.svg':
                // Scalable Vector Graphics (SVG)
                mimetype = 'image/svg+xml';
                break;
            case '.tiff':
                // Tagged Image File Format
                mimetype = 'image/tiff';
                break;
            case '.xbm':
                // X BitMap
                mimetype = 'image/x-xbitmap';
                break;
            case '.xpm':
                // X PixMap
                mimetype = 'image/x-xpixmap';
                break;
            case '.xwd':
                // X Window Dump
                mimetype = 'image/x-xwindowdump';
                break;
            case '.mdb':
                // Microsoft Access
                mimetype = 'application/x-msaccess';
                break;
            case '.xls':
                // Microsoft Excel
                mimetype = 'application/vnd.ms-excel';
                break;
            case '.xlam':
                // Microsoft Excel - Add-In File
                mimetype = 'application/vnd.ms-excel.addin.macroenabled.12';
                break;
            case '.xlsb':
                // Microsoft Excel - Binary Workbook
                mimetype = 'application/vnd.ms-excel.sheet.binary.macroenabled.12';
                break;
            case '.xltm':
                // Microsoft Excel - Macro-Enabled Template File
                mimetype = 'application/vnd.ms-excel.template.macroenabled.12';
                break;
            case '.xlsm':
                // Microsoft Excel - Macro-Enabled Workbook
                mimetype = 'application/vnd.ms-excel.sheet.macroenabled.12';
                break;
            case '.pptx':
                // Microsoft Office - OOXML - Presentation
                mimetype = 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
                break;
            case '.sldx':
                // Microsoft Office - OOXML - Presentation (Slide)
                mimetype = 'application/vnd.openxmlformats-officedocument.presentationml.slide';
                break;
            case '.ppsx':
                // Microsoft Office - OOXML - Presentation (Slideshow)
                mimetype = 'application/vnd.openxmlformats-officedocument.presentationml.slideshow';
                break;
            case '.potx':
                // Microsoft Office - OOXML - Presentation Template
                mimetype = 'application/vnd.openxmlformats-officedocument.presentationml.template';
                break;
            case '.xlsx':
                // Microsoft Office - OOXML - Spreadsheet
                mimetype = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
                break;
            case '.xltx':
                // Microsoft Office - OOXML - Spreadsheet Teplate
                mimetype = 'application/vnd.openxmlformats-officedocument.spreadsheetml.template';
                break;
            case '.docx':
                // Microsoft Office - OOXML - Word Document
                mimetype = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
                break;
            case '.dotx':
                // Microsoft Office - OOXML - Word Document Template
                mimetype = 'application/vnd.openxmlformats-officedocument.wordprocessingml.template';
                break;
            case '.ppt':
                // Microsoft PowerPoint
                mimetype = 'application/vnd.ms-powerpoint';
                break;
            case '.ppam':
                // Microsoft PowerPoint - Add-in file
                mimetype = 'application/vnd.ms-powerpoint.addin.macroenabled.12';
                break;
            case '.sldm':
                // Microsoft PowerPoint - Macro-Enabled Open XML Slide
                mimetype = 'application/vnd.ms-powerpoint.slide.macroenabled.12';
                break;
            case '.pptm':
                // Microsoft PowerPoint - Macro-Enabled Presentation File
                mimetype = 'application/vnd.ms-powerpoint.presentation.macroenabled.12';
                break;
            case '.ppsm':
                // Microsoft PowerPoint - Macro-Enabled Slide Show File
                mimetype = 'application/vnd.ms-powerpoint.slideshow.macroenabled.12';
                break;
            case '.mpp':
                // Microsoft Project
                mimetype = 'application/vnd.ms-project';
                break;
            case '.doc':
                // Microsoft Word
                mimetype = 'application/msword';
                break;
            case '.wri':
                // Microsoft Wordpad
                mimetype = 'application/x-mswrite';
                break;
            case '.wps':
                // Microsoft Works
                mimetype = 'application/vnd.ms-works';
                break;
            case '.pdf':
                // Adobe Portable Document Format
                mimetype = 'application/pdf';
                break;
            case '.txt':
                // Text File
                mimetype = 'text/plain';
                break;
            default:
                break;
        }

        if (mimetype) {
            return mimetype;
        }

        switch (extension) {
            case '.x3d':
                // 3D Crossword Plugin
                mimetype = 'application/vnd.hzn-3d-crossword';
                break;
            case '.3gp':
                // 3GP
                mimetype = 'video/3gpp';
                break;
            case '.3g2':
                // 3GP2
                mimetype = 'video/3gpp2';
                break;
            case '.mseq':
                // 3GPP MSEQ File
                mimetype = 'application/vnd.mseq';
                break;
            case '.pwn':
                // 3M Post It Notes
                mimetype = 'application/vnd.3m.post-it-notes';
                break;
            case '.plb':
                // 3rd Generation Partnership Project - Pic Large
                mimetype = 'application/vnd.3gpp.pic-bw-large';
                break;
            case '.psb':
                // 3rd Generation Partnership Project - Pic Small
                mimetype = 'application/vnd.3gpp.pic-bw-small';
                break;
            case '.pvb':
                // 3rd Generation Partnership Project - Pic Var
                mimetype = 'application/vnd.3gpp.pic-bw-var';
                break;
            case '.tcap':
                // 3rd Generation Partnership Project - Transaction Capabilities Application Part
                mimetype = 'application/vnd.3gpp2.tcap';
                break;
            case '.7z':
                // 7-Zip
                mimetype = 'application/x-7z-compressed';
                break;
            case '.abw':
                // AbiWord
                mimetype = 'application/x-abiword';
                break;
            case '.ace':
                // Ace Archive
                mimetype = 'application/x-ace-compressed';
                break;
            case '.acc':
                // Active Content Compression
                mimetype = 'application/vnd.americandynamics.acc';
                break;
            case '.acu':
                // ACU Cobol
                mimetype = 'application/vnd.acucobol';
                break;
            case '.atc':
                // ACU Cobol
                mimetype = 'application/vnd.acucorp';
                break;
            case '.adp':
                // Adaptive differential pulse-code modulation
                mimetype = 'audio/adpcm';
                break;
            case '.aab':
                // Adobe (Macropedia) Authorware - Binary File
                mimetype = 'application/x-authorware-bin';
                break;
            case '.aam':
                // Adobe (Macropedia) Authorware - Map
                mimetype = 'application/x-authorware-map';
                break;
            case '.aas':
                // Adobe (Macropedia) Authorware - Segment File
                mimetype = 'application/x-authorware-seg';
                break;
            case '.air':
                // Adobe AIR Application
                mimetype = 'application/vnd.adobe.air-application-installer-package+zip';
                break;
            case '.swf':
                // Adobe Flash
                mimetype = 'application/x-shockwave-flash';
                break;
            case '.fxp':
                // Adobe Flex Project
                mimetype = 'application/vnd.adobe.fxp';
                break;
            case '.ppd':
                // Adobe PostScript Printer Description File Format
                mimetype = 'application/vnd.cups-ppd';
                break;
            case '.dir':
                // Adobe Shockwave Player
                mimetype = 'application/x-director';
                break;
            case '.xdp':
                // Adobe XML Data Package
                mimetype = 'application/vnd.adobe.xdp+xml';
                break;
            case '.xfdf':
                // Adobe XML Forms Data Format
                mimetype = 'application/vnd.adobe.xfdf';
                break;
            case '.aac':
                // Advanced Audio Coding (AAC)
                mimetype = 'audio/x-aac';
                break;
            case '.ahead':
                // Ahead AIR Application
                mimetype = 'application/vnd.ahead.space';
                break;
            case '.azf':
                // AirZip FileSECURE
                mimetype = 'application/vnd.airzip.filesecure.azf';
                break;
            case '.azs':
                // AirZip FileSECURE
                mimetype = 'application/vnd.airzip.filesecure.azs';
                break;
            case '.azw':
                // Amazon Kindle eBook format
                mimetype = 'application/vnd.amazon.ebook';
                break;
            case '.ami':
                // AmigaDE
                mimetype = 'application/vnd.amiga.ami';
                break;
            case 'N/A':
                // Andrew Toolkit
                mimetype = 'application/andrew-inset';
                break;
            case '.apk':
                // Android Package Archive
                mimetype = 'application/vnd.android.package-archive';
                break;
            case '.cii':
                // ANSER-WEB Terminal Client - Certificate Issue
                mimetype = 'application/vnd.anser-web-certificate-issue-initiation';
                break;
            case '.fti':
                // ANSER-WEB Terminal Client - Web Funds Transfer
                mimetype = 'application/vnd.anser-web-funds-transfer-initiation';
                break;
            case '.atx':
                // Antix Game Player
                mimetype = 'application/vnd.antix.game-component';
                break;
            case '.mpkg':
                // Apple Installer Package
                mimetype = 'application/vnd.apple.installer+xml';
                break;
            case '.aw':
                // Applixware
                mimetype = 'application/applixware';
                break;
            case '.les':
                // Archipelago Lesson Player
                mimetype = 'application/vnd.hhe.lesson-player';
                break;
            case '.swi':
                // Arista Networks Software Image
                mimetype = 'application/vnd.aristanetworks.swi';
                break;
            case '.s':
                // Assembler Source File
                mimetype = 'text/x-asm';
                break;
            case '.atomcat':
                // Atom Publishing Protocol
                mimetype = 'application/atomcat+xml';
                break;
            case '.atomsvc':
                // Atom Publishing Protocol Service Document
                mimetype = 'application/atomsvc+xml';
                break;
            case '.atom, .xml':
                // Atom Syndication Format
                mimetype = 'application/atom+xml';
                break;
            case '.ac':
                // Attribute Certificate
                mimetype = 'application/pkix-attr-cert';
                break;
            case '.aif':
                // Audio Interchange File Format
                mimetype = 'audio/x-aiff';
                break;
            case '.avi':
                // Audio Video Interleave (AVI)
                mimetype = 'video/x-msvideo';
                break;
            case '.aep':
                // Audiograph
                mimetype = 'application/vnd.audiograph';
                break;
            case '.dxf':
                // AutoCAD DXF
                mimetype = 'image/vnd.dxf';
                break;
            case '.dwf':
                // Autodesk Design Web Format (DWF)
                mimetype = 'model/vnd.dwf';
                break;
            case '.par':
                // BAS Partitur Format
                mimetype = 'text/plain-bas';
                break;
            case '.bcpio':
                // Binary CPIO Archive
                mimetype = 'application/x-bcpio';
                break;
            case '.bin':
                // Binary Data
                mimetype = 'application/octet-stream';
                break;
            case '.torrent':
                // BitTorrent
                mimetype = 'application/x-bittorrent';
                break;
            case '.cod':
                // Blackberry COD File
                mimetype = 'application/vnd.rim.cod';
                break;
            case '.bmi':
                // BMI Drawing Data Interchange
                mimetype = 'application/vnd.bmi';
                break;
            case '.sh':
                // Bourne Shell Script
                mimetype = 'application/x-sh';
                break;
            case '.btif':
                // BTIF
                mimetype = 'image/prs.btif';
                break;
            case '.rep':
                // BusinessObjects
                mimetype = 'application/vnd.businessobjects';
                break;
            case '.bz':
                // Bzip Archive
                mimetype = 'application/x-bzip';
                break;
            case '.bz2':
                // Bzip2 Archive
                mimetype = 'application/x-bzip2';
                break;
            case '.csh':
                // C Shell Script
                mimetype = 'application/x-csh';
                break;
            case '.c':
                // C Source File
                mimetype = 'text/x-c';
                break;
            case '.cdxml':
                // CambridgeSoft Chem Draw
                mimetype = 'application/vnd.chemdraw+xml';
                break;
            case '.css':
                // Cascading Style Sheets (CSS)
                mimetype = 'text/css';
                break;
            case '.cdx':
                // ChemDraw eXchange file
                mimetype = 'chemical/x-cdx';
                break;
            case '.cml':
                // Chemical Markup Language
                mimetype = 'chemical/x-cml';
                break;
            case '.csml':
                // Chemical Style Markup Language
                mimetype = 'chemical/x-csml';
                break;
            case '.cdbcmsg':
                // CIM Database
                mimetype = 'application/vnd.contact.cmsg';
                break;
            case '.cla':
                // Claymore Data Files
                mimetype = 'application/vnd.claymore';
                break;
            case '.c4g':
                // Clonk Game
                mimetype = 'application/vnd.clonk.c4group';
                break;
            case '.sub':
                // Close Captioning - Subtitle
                mimetype = 'image/vnd.dvb.subtitle';
                break;
            case '.cdmia':
                // Cloud Data Management Interface (CDMI) - Capability
                mimetype = 'application/cdmi-capability';
                break;
            case '.cdmic':
                // Cloud Data Management Interface (CDMI) - Contaimer
                mimetype = 'application/cdmi-container';
                break;
            case '.cdmid':
                // Cloud Data Management Interface (CDMI) - Domain
                mimetype = 'application/cdmi-domain';
                break;
            case '.cdmio':
                // Cloud Data Management Interface (CDMI) - Object
                mimetype = 'application/cdmi-object';
                break;
            case '.cdmiq':
                // Cloud Data Management Interface (CDMI) - Queue
                mimetype = 'application/cdmi-queue';
                break;
            case '.c11amc':
                // ClueTrust CartoMobile - Config
                mimetype = 'application/vnd.cluetrust.cartomobile-config';
                break;
            case '.c11amz':
                // ClueTrust CartoMobile - Config Package
                mimetype = 'application/vnd.cluetrust.cartomobile-config-pkg';
                break;
            case '.ras':
                // CMU Image
                mimetype = 'image/x-cmu-raster';
                break;
            case '.csv':
                // Comma-Seperated Values
                mimetype = 'text/csv';
                break;
            case '.cpt':
                // Compact Pro
                mimetype = 'application/mac-compactpro';
                break;
            case '.wmlc':
                // Compiled Wireless Markup Language (WMLC)
                mimetype = 'application/vnd.wap.wmlc';
                break;
            case '.cgm':
                // Computer Graphics Metafile
                mimetype = 'image/cgm';
                break;
            case '.ice':
                // CoolTalk
                mimetype = 'x-conference/x-cooltalk';
                break;
            case '.cmx':
                // Corel Metafile Exchange (CMX)
                mimetype = 'image/x-cmx';
                break;
            case '.xar':
                // CorelXARA
                mimetype = 'application/vnd.xara';
                break;
            case '.cmc':
                // CosmoCaller
                mimetype = 'application/vnd.cosmocaller';
                break;
            case '.cpio':
                // CPIO Archive
                mimetype = 'application/x-cpio';
                break;
            case '.clkx':
                // CrickSoftware - Clicker
                mimetype = 'application/vnd.crick.clicker';
                break;
            case '.clkk':
                // CrickSoftware - Clicker - Keyboard
                mimetype = 'application/vnd.crick.clicker.keyboard';
                break;
            case '.clkp':
                // CrickSoftware - Clicker - Palette
                mimetype = 'application/vnd.crick.clicker.palette';
                break;
            case '.clkt':
                // CrickSoftware - Clicker - Template
                mimetype = 'application/vnd.crick.clicker.template';
                break;
            case '.clkw':
                // CrickSoftware - Clicker - Wordbank
                mimetype = 'application/vnd.crick.clicker.wordbank';
                break;
            case '.wbs':
                // Critical Tools - PERT Chart EXPERT
                mimetype = 'application/vnd.criticaltools.wbs+xml';
                break;
            case '.cryptonote':
                // CryptoNote
                mimetype = 'application/vnd.rig.cryptonote';
                break;
            case '.cif':
                // Crystallographic Interchange Format
                mimetype = 'chemical/x-cif';
                break;
            case '.cmdf':
                // CrystalMaker Data Format
                mimetype = 'chemical/x-cmdf';
                break;
            case '.cu':
                // CU-SeeMe
                mimetype = 'application/cu-seeme';
                break;
            case '.cww':
                // CU-Writer
                mimetype = 'application/prs.cww';
                break;
            case '.dcurl':
                // Curl - Detached Applet
                mimetype = 'text/vnd.curl.dcurl';
                break;
            case '.mcurl':
                // Curl - Manifest File
                mimetype = 'text/vnd.curl.mcurl';
                break;
            case '.scurl':
                // Curl - Source Code
                mimetype = 'text/vnd.curl.scurl';
                break;
            case '.car':
                // CURL Applet
                mimetype = 'application/vnd.curl.car';
                break;
            case '.pcurl':
                // CURL Applet
                mimetype = 'application/vnd.curl.pcurl';
                break;
            case '.cmp':
                // CustomMenu
                mimetype = 'application/vnd.yellowriver-custom-menu';
                break;
            case '.dssc':
                // Data Structure for the Security Suitability of Cryptographic Algorithms
                mimetype = 'application/dssc+der';
                break;
            case '.xdssc':
                // Data Structure for the Security Suitability of Cryptographic Algorithms
                mimetype = 'application/dssc+xml';
                break;
            case '.deb':
                // Debian Package
                mimetype = 'application/x-debian-package';
                break;
            case '.uva':
                // DECE Audio
                mimetype = 'audio/vnd.dece.audio';
                break;
            case '.uvi':
                // DECE Graphic
                mimetype = 'image/vnd.dece.graphic';
                break;
            case '.uvh':
                // DECE High Definition Video
                mimetype = 'video/vnd.dece.hd';
                break;
            case '.uvm':
                // DECE Mobile Video
                mimetype = 'video/vnd.dece.mobile';
                break;
            case '.uvu':
                // DECE MP4
                mimetype = 'video/vnd.uvvu.mp4';
                break;
            case '.uvp':
                // DECE PD Video
                mimetype = 'video/vnd.dece.pd';
                break;
            case '.uvs':
                // DECE SD Video
                mimetype = 'video/vnd.dece.sd';
                break;
            case '.uvv':
                // DECE Video
                mimetype = 'video/vnd.dece.video';
                break;
            case '.dvi':
                // Device Independent File Format (DVI)
                mimetype = 'application/x-dvi';
                break;
            case '.seed':
                // Digital Siesmograph Networks - SEED Datafiles
                mimetype = 'application/vnd.fdsn.seed';
                break;
            case '.dtb':
                // Digital Talking Book
                mimetype = 'application/x-dtbook+xml';
                break;
            case '.res':
                // Digital Talking Book - Resource File
                mimetype = 'application/x-dtbresource+xml';
                break;
            case '.ait':
                // Digital Video Broadcasting
                mimetype = 'application/vnd.dvb.ait';
                break;
            case '.svc':
                // Digital Video Broadcasting
                mimetype = 'application/vnd.dvb.service';
                break;
            case '.eol':
                // Digital Winds Music
                mimetype = 'audio/vnd.digital-winds';
                break;
            case '.djvu':
                // DjVu
                mimetype = 'image/vnd.djvu';
                break;
            case '.dtd':
                // Document Type Definition
                mimetype = 'application/xml-dtd';
                break;
            case '.mlp':
                // Dolby Meridian Lossless Packing
                mimetype = 'application/vnd.dolby.mlp';
                break;
            case '.wad':
                // Doom Video Game
                mimetype = 'application/x-doom';
                break;
            case '.dpg':
                // DPGraph
                mimetype = 'application/vnd.dpgraph';
                break;
            case '.dra':
                // DRA Audio
                mimetype = 'audio/vnd.dra';
                break;
            case '.dfac':
                // DreamFactory
                mimetype = 'application/vnd.dreamfactory';
                break;
            case '.dts':
                // DTS Audio
                mimetype = 'audio/vnd.dts';
                break;
            case '.dtshd':
                // DTS High Definition Audio
                mimetype = 'audio/vnd.dts.hd';
                break;
            case '.dwg':
                // DWG Drawing
                mimetype = 'image/vnd.dwg';
                break;
            case '.geo':
                // DynaGeo
                mimetype = 'application/vnd.dynageo';
                break;
            case '.es':
                // ECMAScript
                mimetype = 'application/ecmascript';
                break;
            case '.mag':
                // EcoWin Chart
                mimetype = 'application/vnd.ecowin.chart';
                break;
            case '.mmr':
                // EDMICS 2000
                mimetype = 'image/vnd.fujixerox.edmics-mmr';
                break;
            case '.rlc':
                // EDMICS 2000
                mimetype = 'image/vnd.fujixerox.edmics-rlc';
                break;
            case '.exi':
                // Efficient XML Interchange
                mimetype = 'application/exi';
                break;
            case '.mgz':
                // EFI Proteus
                mimetype = 'application/vnd.proteus.magazine';
                break;
            case '.epub':
                // Electronic Publication
                mimetype = 'application/epub+zip';
                break;
            case '.eml':
                // Email Message
                mimetype = 'message/rfc822';
                break;
            case '.nml':
                // Enliven Viewer
                mimetype = 'application/vnd.enliven';
                break;
            case '.xpr':
                // Express by Infoseek
                mimetype = 'application/vnd.is-xpr';
                break;
            case '.xif':
                // eXtended Image File Format (XIFF)
                mimetype = 'image/vnd.xiff';
                break;
            case '.xfdl':
                // Extensible Forms Description Language
                mimetype = 'application/vnd.xfdl';
                break;
            case '.emma':
                // Extensible MultiModal Annotation
                mimetype = 'application/emma+xml';
                break;
            case '.ez2':
                // EZPix Secure Photo Album
                mimetype = 'application/vnd.ezpix-album';
                break;
            case '.ez3':
                // EZPix Secure Photo Album
                mimetype = 'application/vnd.ezpix-package';
                break;
            case '.fst':
                // FAST Search & Transfer ASA
                mimetype = 'image/vnd.fst';
                break;
            case '.fvt':
                // FAST Search & Transfer ASA
                mimetype = 'video/vnd.fvt';
                break;
            case '.fbs':
                // FastBid Sheet
                mimetype = 'image/vnd.fastbidsheet';
                break;
            case '.fe_launch':
                // FCS Express Layout Link
                mimetype = 'application/vnd.denovo.fcselayout-link';
                break;
            case '.f4v':
                // Flash Video
                mimetype = 'video/x-f4v';
                break;
            case '.flv':
                // Flash Video
                mimetype = 'video/x-flv';
                break;
            case '.fpx':
                // FlashPix
                mimetype = 'image/vnd.fpx';
                break;
            case '.npx':
                // FlashPix
                mimetype = 'image/vnd.net-fpx';
                break;
            case '.flx':
                // FLEXSTOR
                mimetype = 'text/vnd.fmi.flexstor';
                break;
            case '.fli':
                // FLI/FLC Animation Format
                mimetype = 'video/x-fli';
                break;
            case '.ftc':
                // FluxTime Clip
                mimetype = 'application/vnd.fluxtime.clip';
                break;
            case '.fdf':
                // Forms Data Format
                mimetype = 'application/vnd.fdf';
                break;
            case '.f':
                // Fortran Source File
                mimetype = 'text/x-fortran';
                break;
            case '.mif':
                // FrameMaker Interchange Format
                mimetype = 'application/vnd.mif';
                break;
            case '.fm':
                // FrameMaker Normal Format
                mimetype = 'application/vnd.framemaker';
                break;
            case '.fh':
                // FreeHand MX
                mimetype = 'image/x-freehand';
                break;
            case '.fsc':
                // Friendly Software Corporation
                mimetype = 'application/vnd.fsc.weblaunch';
                break;
            case '.fnc':
                // Frogans Player
                mimetype = 'application/vnd.frogans.fnc';
                break;
            case '.ltf':
                // Frogans Player
                mimetype = 'application/vnd.frogans.ltf';
                break;
            case '.ddd':
                // Fujitsu - Xerox 2D CAD Data
                mimetype = 'application/vnd.fujixerox.ddd';
                break;
            case '.xdw':
                // Fujitsu - Xerox DocuWorks
                mimetype = 'application/vnd.fujixerox.docuworks';
                break;
            case '.xbd':
                // Fujitsu - Xerox DocuWorks Binder
                mimetype = 'application/vnd.fujixerox.docuworks.binder';
                break;
            case '.oas':
                // Fujitsu Oasys
                mimetype = 'application/vnd.fujitsu.oasys';
                break;
            case '.oa2':
                // Fujitsu Oasys
                mimetype = 'application/vnd.fujitsu.oasys2';
                break;
            case '.oa3':
                // Fujitsu Oasys
                mimetype = 'application/vnd.fujitsu.oasys3';
                break;
            case '.fg5':
                // Fujitsu Oasys
                mimetype = 'application/vnd.fujitsu.oasysgp';
                break;
            case '.bh2':
                // Fujitsu Oasys
                mimetype = 'application/vnd.fujitsu.oasysprs';
                break;
            case '.spl':
                // FutureSplash Animator
                mimetype = 'application/x-futuresplash';
                break;
            case '.fzs':
                // FuzzySheet
                mimetype = 'application/vnd.fuzzysheet';
                break;
            case '.g3':
                // G3 Fax Image
                mimetype = 'image/g3fax';
                break;
            case '.gmx':
                // GameMaker ActiveX
                mimetype = 'application/vnd.gmx';
                break;
            case '.gtw':
                // Gen-Trix Studio
                mimetype = 'model/vnd.gtw';
                break;
            case '.txd':
                // Genomatix Tuxedo Framework
                mimetype = 'application/vnd.genomatix.tuxedo';
                break;
            case '.ggb':
                // GeoGebra
                mimetype = 'application/vnd.geogebra.file';
                break;
            case '.ggt':
                // GeoGebra
                mimetype = 'application/vnd.geogebra.tool';
                break;
            case '.gdl':
                // Geometric Description Language (GDL)
                mimetype = 'model/vnd.gdl';
                break;
            case '.gex':
                // GeoMetry Explorer
                mimetype = 'application/vnd.geometry-explorer';
                break;
            case '.gxt':
                // GEONExT and JSXGraph
                mimetype = 'application/vnd.geonext';
                break;
            case '.g2w':
                // GeoplanW
                mimetype = 'application/vnd.geoplan';
                break;
            case '.g3w':
                // GeospacW
                mimetype = 'application/vnd.geospace';
                break;
            case '.gsf':
                // Ghostscript Font
                mimetype = 'application/x-font-ghostscript';
                break;
            case '.bdf':
                // Glyph Bitmap Distribution Format
                mimetype = 'application/x-font-bdf';
                break;
            case '.gtar':
                // GNU Tar Files
                mimetype = 'application/x-gtar';
                break;
            case '.texinfo':
                // GNU Texinfo Document
                mimetype = 'application/x-texinfo';
                break;
            case '.gnumeric':
                // Gnumeric
                mimetype = 'application/x-gnumeric';
                break;
            case '.kml':
                // Google Earth - KML
                mimetype = 'application/vnd.google-earth.kml+xml';
                break;
            case '.kmz':
                // Google Earth - Zipped KML
                mimetype = 'application/vnd.google-earth.kmz';
                break;
            case '.gqf':
                // GrafEq
                mimetype = 'application/vnd.grafeq';
                break;
            case '.gv':
                // Graphviz
                mimetype = 'text/vnd.graphviz';
                break;
            case '.gac':
                // Groove - Account
                mimetype = 'application/vnd.groove-account';
                break;
            case '.ghf':
                // Groove - Help
                mimetype = 'application/vnd.groove-help';
                break;
            case '.gim':
                // Groove - Identity Message
                mimetype = 'application/vnd.groove-identity-message';
                break;
            case '.grv':
                // Groove - Injector
                mimetype = 'application/vnd.groove-injector';
                break;
            case '.gtm':
                // Groove - Tool Message
                mimetype = 'application/vnd.groove-tool-message';
                break;
            case '.tpl':
                // Groove - Tool Template
                mimetype = 'application/vnd.groove-tool-template';
                break;
            case '.vcg':
                // Groove - Vcard
                mimetype = 'application/vnd.groove-vcard';
                break;
            case '.h261':
                // H.261
                mimetype = 'video/h261';
                break;
            case '.h263':
                // H.263
                mimetype = 'video/h263';
                break;
            case '.h264':
                // H.264
                mimetype = 'video/h264';
                break;
            case '.hpid':
                // Hewlett Packard Instant Delivery
                mimetype = 'application/vnd.hp-hpid';
                break;
            case '.hps':
                // Hewlett-Packard's WebPrintSmart
                mimetype = 'application/vnd.hp-hps';
                break;
            case '.hdf':
                // Hierarchical Data Format
                mimetype = 'application/x-hdf';
                break;
            case '.rip':
                // Hit'n'Mix
                mimetype = 'audio/vnd.rip';
                break;
            case '.hbci':
                // Homebanking Computer Interface (HBCI)
                mimetype = 'application/vnd.hbci';
                break;
            case '.jlt':
                // HP Indigo Digital Press - Job Layout Languate
                mimetype = 'application/vnd.hp-jlyt';
                break;
            case '.pcl':
                // HP Printer Command Language
                mimetype = 'application/vnd.hp-pcl';
                break;
            case '.hpgl':
                // HP-GL/2 and HP RTL
                mimetype = 'application/vnd.hp-hpgl';
                break;
            case '.hvs':
                // HV Script
                mimetype = 'application/vnd.yamaha.hv-script';
                break;
            case '.hvd':
                // HV Voice Dictionary
                mimetype = 'application/vnd.yamaha.hv-dic';
                break;
            case '.hvp':
                // HV Voice Parameter
                mimetype = 'application/vnd.yamaha.hv-voice';
                break;
            case '.sfd-hdstx':
                // Hydrostatix Master Suite
                mimetype = 'application/vnd.hydrostatix.sof-data';
                break;
            case '.stk':
                // Hyperstudio
                mimetype = 'application/hyperstudio';
                break;
            case '.hal':
                // Hypertext Application Language
                mimetype = 'application/vnd.hal+xml';
                break;
            case '.html':
                // HyperText Markup Language (HTML)
                mimetype = 'text/html';
                break;
            case '.irm':
                // IBM DB2 Rights Manager
                mimetype = 'application/vnd.ibm.rights-management';
                break;
            case '.sc':
                // IBM Electronic Media Management System - Secure Container
                mimetype = 'application/vnd.ibm.secure-container';
                break;
            case '.ics':
                // iCalendar
                mimetype = 'text/calendar';
                break;
            case '.icc':
                // ICC profile
                mimetype = 'application/vnd.iccprofile';
                break;
            case '.ico':
                // Icon Image
                mimetype = 'image/x-icon';
                break;
            case '.igl':
                // igLoader
                mimetype = 'application/vnd.igloader';
                break;
            case '.ief':
                // Image Exchange Format
                mimetype = 'image/ief';
                break;
            case '.ivp':
                // ImmerVision PURE Players
                mimetype = 'application/vnd.immervision-ivp';
                break;
            case '.ivu':
                // ImmerVision PURE Players
                mimetype = 'application/vnd.immervision-ivu';
                break;
            case '.rif':
                // IMS Networks
                mimetype = 'application/reginfo+xml';
                break;
            case '.spot':
                // In3D - 3DML
                mimetype = 'text/vnd.in3d.spot';
                break;
            case '.igs':
                // Initial Graphics Exchange Specification (IGES)
                mimetype = 'model/iges';
                break;
            case '.i2g':
                // Interactive Geometry Software
                mimetype = 'application/vnd.intergeo';
                break;
            case '.cdy':
                // Interactive Geometry Software Cinderella
                mimetype = 'application/vnd.cinderella';
                break;
            case '.xpw':
                // Intercon FormNet
                mimetype = 'application/vnd.intercon.formnet';
                break;
            case '.fcs':
                // International Society for Advancement of Cytometry
                mimetype = 'application/vnd.isac.fcs';
                break;
            case '.ipfix':
                // Internet Protocol Flow Information Export
                mimetype = 'application/ipfix';
                break;
            case '.cer':
                // Internet Public Key Infrastructure - Certificate
                mimetype = 'application/pkix-cert';
                break;
            case '.pki':
                // Internet Public Key Infrastructure - Certificate Management Protocole
                mimetype = 'application/pkixcmp';
                break;
            case '.crl':
                // Internet Public Key Infrastructure - Certificate Revocation Lists
                mimetype = 'application/pkix-crl';
                break;
            case '.pkipath':
                // Internet Public Key Infrastructure - Certification Path
                mimetype = 'application/pkix-pkipath';
                break;
            case '.igm':
                // IOCOM Visimeet
                mimetype = 'application/vnd.insors.igm';
                break;
            case '.rcprofile':
                // IP Unplugged Roaming Client
                mimetype = 'application/vnd.ipunplugged.rcprofile';
                break;
            case '.irp':
                // iRepository / Lucidoc Editor
                mimetype = 'application/vnd.irepository.package+xml';
                break;
            case '.jad':
                // J2ME App Descriptor
                mimetype = 'text/vnd.sun.j2me.app-descriptor';
                break;
            case '.jar':
                // Java Archive
                mimetype = 'application/java-archive';
                break;
            case '.class':
                // Java Bytecode File
                mimetype = 'application/java-vm';
                break;
            case '.jnlp':
                // Java Network Launching Protocol
                mimetype = 'application/x-java-jnlp-file';
                break;
            case '.ser':
                // Java Serialized Object
                mimetype = 'application/java-serialized-object';
                break;
            case '.java':
                // Java Source File
                mimetype = 'text/x-java-source,java';
                break;
            case '.js':
                // JavaScript
                mimetype = 'application/javascript';
                break;
            case '.json':
                // JavaScript Object Notation (JSON)
                mimetype = 'application/json';
                break;
            case '.joda':
                // Joda Archive
                mimetype = 'application/vnd.joost.joda-archive';
                break;
            case '.ktz':
                // Kahootz
                mimetype = 'application/vnd.kahootz';
                break;
            case '.mmd':
                // Karaoke on Chipnuts Chipsets
                mimetype = 'application/vnd.chipnuts.karaoke-mmd';
                break;
            case '.karbon':
                // KDE KOffice Office Suite - Karbon
                mimetype = 'application/vnd.kde.karbon';
                break;
            case '.chrt':
                // KDE KOffice Office Suite - KChart
                mimetype = 'application/vnd.kde.kchart';
                break;
            case '.kfo':
                // KDE KOffice Office Suite - Kformula
                mimetype = 'application/vnd.kde.kformula';
                break;
            case '.flw':
                // KDE KOffice Office Suite - Kivio
                mimetype = 'application/vnd.kde.kivio';
                break;
            case '.kon':
                // KDE KOffice Office Suite - Kontour
                mimetype = 'application/vnd.kde.kontour';
                break;
            case '.kpr':
                // KDE KOffice Office Suite - Kpresenter
                mimetype = 'application/vnd.kde.kpresenter';
                break;
            case '.ksp':
                // KDE KOffice Office Suite - Kspread
                mimetype = 'application/vnd.kde.kspread';
                break;
            case '.kwd':
                // KDE KOffice Office Suite - Kword
                mimetype = 'application/vnd.kde.kword';
                break;
            case '.htke':
                // Kenamea App
                mimetype = 'application/vnd.kenameaapp';
                break;
            case '.kia':
                // Kidspiration
                mimetype = 'application/vnd.kidspiration';
                break;
            case '.kne':
                // Kinar Applications
                mimetype = 'application/vnd.kinar';
                break;
            case '.sse':
                // Kodak Storyshare
                mimetype = 'application/vnd.kodak-descriptor';
                break;
            case '.lasxml':
                // Laser App Enterprise
                mimetype = 'application/vnd.las.las+xml';
                break;
            case '.latex':
                // LaTeX
                mimetype = 'application/x-latex';
                break;
            case '.lbd':
                // Life Balance - Desktop Edition
                mimetype = 'application/vnd.llamagraphics.life-balance.desktop';
                break;
            case '.lbe':
                // Life Balance - Exchange Format
                mimetype = 'application/vnd.llamagraphics.life-balance.exchange+xml';
                break;
            case '.jam':
                // Lightspeed Audio Lab
                mimetype = 'application/vnd.jam';
                break;
            case '.123':
                // Lotus 1-2-3
                mimetype = 'application/vnd.lotus-1-2-3';
                break;
            case '.apr':
                // Lotus Approach
                mimetype = 'application/vnd.lotus-approach';
                break;
            case '.pre':
                // Lotus Freelance
                mimetype = 'application/vnd.lotus-freelance';
                break;
            case '.nsf':
                // Lotus Notes
                mimetype = 'application/vnd.lotus-notes';
                break;
            case '.org':
                // Lotus Organizer
                mimetype = 'application/vnd.lotus-organizer';
                break;
            case '.scm':
                // Lotus Screencam
                mimetype = 'application/vnd.lotus-screencam';
                break;
            case '.lwp':
                // Lotus Wordpro
                mimetype = 'application/vnd.lotus-wordpro';
                break;
            case '.lvp':
                // Lucent Voice
                mimetype = 'audio/vnd.lucent.voice';
                break;
            case '.m3u':
                // M3U (Multimedia Playlist)
                mimetype = 'audio/x-mpegurl';
                break;
            case '.m4v':
                // M4v
                mimetype = 'video/x-m4v';
                break;
            case '.hqx':
                // Macintosh BinHex 4.0
                mimetype = 'application/mac-binhex40';
                break;
            case '.portpkg':
                // MacPorts Port System
                mimetype = 'application/vnd.macports.portpkg';
                break;
            case '.mgp':
                // MapGuide DBXML
                mimetype = 'application/vnd.osgeo.mapguide.package';
                break;
            case '.mrc':
                // MARC Formats
                mimetype = 'application/marc';
                break;
            case '.mrcx':
                // MARC21 XML Schema
                mimetype = 'application/marcxml+xml';
                break;
            case '.mxf':
                // Material Exchange Format
                mimetype = 'application/mxf';
                break;
            case '.nbp':
                // Mathematica Notebook Player
                mimetype = 'application/vnd.wolfram.player';
                break;
            case '.ma':
                // Mathematica Notebooks
                mimetype = 'application/mathematica';
                break;
            case '.mathml':
                // Mathematical Markup Language
                mimetype = 'application/mathml+xml';
                break;
            case '.mbox':
                // Mbox database files
                mimetype = 'application/mbox';
                break;
            case '.mc1':
                // MedCalc
                mimetype = 'application/vnd.medcalcdata';
                break;
            case '.mscml':
                // Media Server Control Markup Language
                mimetype = 'application/mediaservercontrol+xml';
                break;
            case '.cdkey':
                // MediaRemote
                mimetype = 'application/vnd.mediastation.cdkey';
                break;
            case '.mwf':
                // Medical Waveform Encoding Format
                mimetype = 'application/vnd.mfer';
                break;
            case '.mfm':
                // Melody Format for Mobile Platform
                mimetype = 'application/vnd.mfmp';
                break;
            case '.msh':
                // Mesh Data Type
                mimetype = 'model/mesh';
                break;
            case '.mads':
                // Metadata Authority Description Schema
                mimetype = 'application/mads+xml';
                break;
            case '.mets':
                // Metadata Encoding and Transmission Standard
                mimetype = 'application/mets+xml';
                break;
            case '.mods':
                // Metadata Object Description Schema
                mimetype = 'application/mods+xml';
                break;
            case '.meta4':
                // Metalink
                mimetype = 'application/metalink4+xml';
                break;
            case '.potm':
                // Micosoft PowerPoint - Macro-Enabled Template File
                mimetype = 'application/vnd.ms-powerpoint.template.macroenabled.12';
                break;
            case '.docm':
                // Micosoft Word - Macro-Enabled Document
                mimetype = 'application/vnd.ms-word.document.macroenabled.12';
                break;
            case '.dotm':
                // Micosoft Word - Macro-Enabled Template
                mimetype = 'application/vnd.ms-word.template.macroenabled.12';
                break;
            case '.mcd':
                // Micro CADAM Helix D&D
                mimetype = 'application/vnd.mcd';
                break;
            case '.flo':
                // Micrografx
                mimetype = 'application/vnd.micrografx.flo';
                break;
            case '.igx':
                // Micrografx iGrafx Professional
                mimetype = 'application/vnd.micrografx.igx';
                break;
            case '.es3':
                // MICROSEC e-Szign??
                mimetype = 'application/vnd.eszigno3+xml';
                break;
            case '.asf':
                // Microsoft Advanced Systems Format (ASF)
                mimetype = 'video/x-ms-asf';
                break;
            case '.exe':
                // Microsoft Application
                mimetype = 'application/x-msdownload';
                break;
            case '.cil':
                // Microsoft Artgalry
                mimetype = 'application/vnd.ms-artgalry';
                break;
            case '.cab':
                // Microsoft Cabinet File
                mimetype = 'application/vnd.ms-cab-compressed';
                break;
            case '.ims':
                // Microsoft Class Server
                mimetype = 'application/vnd.ms-ims';
                break;
            case '.application':
                // Microsoft ClickOnce
                mimetype = 'application/x-ms-application';
                break;
            case '.clp':
                // Microsoft Clipboard Clip
                mimetype = 'application/x-msclip';
                break;
            case '.mdi':
                // Microsoft Document Imaging Format
                mimetype = 'image/vnd.ms-modi';
                break;
            case '.eot':
                // Microsoft Embedded OpenType
                mimetype = 'application/vnd.ms-fontobject';
                break;
            case '.chm':
                // Microsoft Html Help File
                mimetype = 'application/vnd.ms-htmlhelp';
                break;
            case '.crd':
                // Microsoft Information Card
                mimetype = 'application/x-mscardfile';
                break;
            case '.lrm':
                // Microsoft Learning Resource Module
                mimetype = 'application/vnd.ms-lrm';
                break;
            case '.mvb':
                // Microsoft MediaView
                mimetype = 'application/x-msmediaview';
                break;
            case '.mny':
                // Microsoft Money
                mimetype = 'application/x-msmoney';
                break;
            case '.obd':
                // Microsoft Office Binder
                mimetype = 'application/x-msbinder';
                break;
            case '.thmx':
                // Microsoft Office System Release Theme
                mimetype = 'application/vnd.ms-officetheme';
                break;
            case '.onetoc':
                // Microsoft OneNote
                mimetype = 'application/onenote';
                break;
            case '.pya':
                // Microsoft PlayReady Ecosystem
                mimetype = 'audio/vnd.ms-playready.media.pya';
                break;
            case '.pyv':
                // Microsoft PlayReady Ecosystem Video
                mimetype = 'video/vnd.ms-playready.media.pyv';
                break;
            case '.pub':
                // Microsoft Publisher
                mimetype = 'application/x-mspublisher';
                break;
            case '.scd':
                // Microsoft Schedule+
                mimetype = 'application/x-msschedule';
                break;
            case '.xap':
                // Microsoft Silverlight
                mimetype = 'application/x-silverlight-app';
                break;
            case '.stl':
                // Microsoft Trust UI Provider - Certificate Trust Link
                mimetype = 'application/vnd.ms-pki.stl';
                break;
            case '.cat':
                // Microsoft Trust UI Provider - Security Catalog
                mimetype = 'application/vnd.ms-pki.seccat';
                break;
            case '.vsd':
                // Microsoft Visio
                mimetype = 'application/vnd.visio';
                break;
            case '.wm':
                // Microsoft Windows Media
                mimetype = 'video/x-ms-wm';
                break;
            case '.wma':
                // Microsoft Windows Media Audio
                mimetype = 'audio/x-ms-wma';
                break;
            case '.wax':
                // Microsoft Windows Media Audio Redirector
                mimetype = 'audio/x-ms-wax';
                break;
            case '.wmx':
                // Microsoft Windows Media Audio/Video Playlist
                mimetype = 'video/x-ms-wmx';
                break;
            case '.wmd':
                // Microsoft Windows Media Player Download Package
                mimetype = 'application/x-ms-wmd';
                break;
            case '.wpl':
                // Microsoft Windows Media Player Playlist
                mimetype = 'application/vnd.ms-wpl';
                break;
            case '.wmz':
                // Microsoft Windows Media Player Skin Package
                mimetype = 'application/x-ms-wmz';
                break;
            case '.wmv':
                // Microsoft Windows Media Video
                mimetype = 'video/x-ms-wmv';
                break;
            case '.wvx':
                // Microsoft Windows Media Video Playlist
                mimetype = 'video/x-ms-wvx';
                break;
            case '.wmf':
                // Microsoft Windows Metafile
                mimetype = 'application/x-msmetafile';
                break;
            case '.trm':
                // Microsoft Windows Terminal Services
                mimetype = 'application/x-msterminal';
                break;
            case '.xbap':
                // Microsoft XAML Browser Application
                mimetype = 'application/x-ms-xbap';
                break;
            case '.xps':
                // Microsoft XML Paper Specification
                mimetype = 'application/vnd.ms-xpsdocument';
                break;
            case '.mid':
                // MIDI - Musical Instrument Digital Interface
                mimetype = 'audio/midi';
                break;
            case '.mpy':
                // MiniPay
                mimetype = 'application/vnd.ibm.minipay';
                break;
            case '.afp':
                // MO:DCA-P
                mimetype = 'application/vnd.ibm.modcap';
                break;
            case '.rms':
                // Mobile Information Device Profile
                mimetype = 'application/vnd.jcp.javame.midlet-rms';
                break;
            case '.tmo':
                // MobileTV
                mimetype = 'application/vnd.tmobile-livetv';
                break;
            case '.prc':
                // Mobipocket
                mimetype = 'application/x-mobipocket-ebook';
                break;
            case '.mbk':
                // Mobius Management Systems - Basket file
                mimetype = 'application/vnd.mobius.mbk';
                break;
            case '.dis':
                // Mobius Management Systems - Distribution Database
                mimetype = 'application/vnd.mobius.dis';
                break;
            case '.plc':
                // Mobius Management Systems - Policy Definition Language File
                mimetype = 'application/vnd.mobius.plc';
                break;
            case '.mqy':
                // Mobius Management Systems - Query File
                mimetype = 'application/vnd.mobius.mqy';
                break;
            case '.msl':
                // Mobius Management Systems - Script Language
                mimetype = 'application/vnd.mobius.msl';
                break;
            case '.txf':
                // Mobius Management Systems - Topic Index File
                mimetype = 'application/vnd.mobius.txf';
                break;
            case '.daf':
                // Mobius Management Systems - UniversalArchive
                mimetype = 'application/vnd.mobius.daf';
                break;
            case '.fly':
                // mod_fly / fly.cgi
                mimetype = 'text/vnd.fly';
                break;
            case '.mpc':
                // Mophun Certificate
                mimetype = 'application/vnd.mophun.certificate';
                break;
            case '.mpn':
                // Mophun VM
                mimetype = 'application/vnd.mophun.application';
                break;
            case '.mj2':
                // Motion JPEG 2000
                mimetype = 'video/mj2';
                break;
            case '.mpga':
                // MPEG Audio
                mimetype = 'audio/mpeg';
                break;
            case '.mxu':
                // MPEG Url
                mimetype = 'video/vnd.mpegurl';
                break;
            case '.mpeg':
                // MPEG Video
                mimetype = 'video/mpeg';
                break;
            case '.m21':
                // MPEG-21
                mimetype = 'application/mp21';
                break;
            case '.mp4a':
                // MPEG-4 Audio
                mimetype = 'audio/mp4';
                break;
            case '.mp4':
                // MPEG-4 Video
                mimetype = 'video/mp4';
                break;
            case '.mp4':
                // MPEG4
                mimetype = 'application/mp4';
                break;
            case '.m3u8':
                // Multimedia Playlist Unicode
                mimetype = 'application/vnd.apple.mpegurl';
                break;
            case '.mus':
                // MUsical Score Interpreted Code Invented for the ASCII designation of Notation
                mimetype = 'application/vnd.musician';
                break;
            case '.msty':
                // Muvee Automatic Video Editing
                mimetype = 'application/vnd.muvee.style';
                break;
            case '.mxml':
                // MXML
                mimetype = 'application/xv+xml';
                break;
            case '.ngdat':
                // N-Gage Game Data
                mimetype = 'application/vnd.nokia.n-gage.data';
                break;
            case '.n-gage':
                // N-Gage Game Installer
                mimetype = 'application/vnd.nokia.n-gage.symbian.install';
                break;
            case '.ncx':
                // Navigation Control file for XML (for ePub)
                mimetype = 'application/x-dtbncx+xml';
                break;
            case '.nc':
                // Network Common Data Form (NetCDF)
                mimetype = 'application/x-netcdf';
                break;
            case '.nlu':
                // neuroLanguage
                mimetype = 'application/vnd.neurolanguage.nlu';
                break;
            case '.dna':
                // New Moon Liftoff/DNA
                mimetype = 'application/vnd.dna';
                break;
            case '.nnd':
                // NobleNet Directory
                mimetype = 'application/vnd.noblenet-directory';
                break;
            case '.nns':
                // NobleNet Sealer
                mimetype = 'application/vnd.noblenet-sealer';
                break;
            case '.nnw':
                // NobleNet Web
                mimetype = 'application/vnd.noblenet-web';
                break;
            case '.rpst':
                // Nokia Radio Application - Preset
                mimetype = 'application/vnd.nokia.radio-preset';
                break;
            case '.rpss':
                // Nokia Radio Application - Preset
                mimetype = 'application/vnd.nokia.radio-presets';
                break;
            case '.n3':
                // Notation3
                mimetype = 'text/n3';
                break;
            case '.edm':
                // Novadigm's RADIA and EDM products
                mimetype = 'application/vnd.novadigm.edm';
                break;
            case '.edx':
                // Novadigm's RADIA and EDM products
                mimetype = 'application/vnd.novadigm.edx';
                break;
            case '.ext':
                // Novadigm's RADIA and EDM products
                mimetype = 'application/vnd.novadigm.ext';
                break;
            case '.gph':
                // NpGraphIt
                mimetype = 'application/vnd.flographit';
                break;
            case '.ecelp4800':
                // Nuera ECELP 4800
                mimetype = 'audio/vnd.nuera.ecelp4800';
                break;
            case '.ecelp7470':
                // Nuera ECELP 7470
                mimetype = 'audio/vnd.nuera.ecelp7470';
                break;
            case '.ecelp9600':
                // Nuera ECELP 9600
                mimetype = 'audio/vnd.nuera.ecelp9600';
                break;
            case '.oda':
                // Office Document Architecture
                mimetype = 'application/oda';
                break;
            case '.ogx':
                // Ogg
                mimetype = 'application/ogg';
                break;
            case '.oga':
                // Ogg Audio
                mimetype = 'audio/ogg';
                break;
            case '.ogv':
                // Ogg Video
                mimetype = 'video/ogg';
                break;
            case '.dd2':
                // OMA Download Agents
                mimetype = 'application/vnd.oma.dd2+xml';
                break;
            case '.oth':
                // Open Document Text Web
                mimetype = 'application/vnd.oasis.opendocument.text-web';
                break;
            case '.opf':
                // Open eBook Publication Structure
                mimetype = 'application/oebps-package+xml';
                break;
            case '.qbo':
                // Open Financial Exchange
                mimetype = 'application/vnd.intu.qbo';
                break;
            case '.oxt':
                // Open Office Extension
                mimetype = 'application/vnd.openofficeorg.extension';
                break;
            case '.osf':
                // Open Score Format
                mimetype = 'application/vnd.yamaha.openscoreformat';
                break;
            case '.weba':
                // Open Web Media Project - Audio
                mimetype = 'audio/webm';
                break;
            case '.webm':
                // Open Web Media Project - Video
                mimetype = 'video/webm';
                break;
            case '.odc':
                // OpenDocument Chart
                mimetype = 'application/vnd.oasis.opendocument.chart';
                break;
            case '.otc':
                // OpenDocument Chart Template
                mimetype = 'application/vnd.oasis.opendocument.chart-template';
                break;
            case '.odb':
                // OpenDocument Database
                mimetype = 'application/vnd.oasis.opendocument.database';
                break;
            case '.odf':
                // OpenDocument Formula
                mimetype = 'application/vnd.oasis.opendocument.formula';
                break;
            case '.odft':
                // OpenDocument Formula Template
                mimetype = 'application/vnd.oasis.opendocument.formula-template';
                break;
            case '.odg':
                // OpenDocument Graphics
                mimetype = 'application/vnd.oasis.opendocument.graphics';
                break;
            case '.otg':
                // OpenDocument Graphics Template
                mimetype = 'application/vnd.oasis.opendocument.graphics-template';
                break;
            case '.odi':
                // OpenDocument Image
                mimetype = 'application/vnd.oasis.opendocument.image';
                break;
            case '.oti':
                // OpenDocument Image Template
                mimetype = 'application/vnd.oasis.opendocument.image-template';
                break;
            case '.odp':
                // OpenDocument Presentation
                mimetype = 'application/vnd.oasis.opendocument.presentation';
                break;
            case '.otp':
                // OpenDocument Presentation Template
                mimetype = 'application/vnd.oasis.opendocument.presentation-template';
                break;
            case '.ods':
                // OpenDocument Spreadsheet
                mimetype = 'application/vnd.oasis.opendocument.spreadsheet';
                break;
            case '.ots':
                // OpenDocument Spreadsheet Template
                mimetype = 'application/vnd.oasis.opendocument.spreadsheet-template';
                break;
            case '.odt':
                // OpenDocument Text
                mimetype = 'application/vnd.oasis.opendocument.text';
                break;
            case '.odm':
                // OpenDocument Text Master
                mimetype = 'application/vnd.oasis.opendocument.text-master';
                break;
            case '.ott':
                // OpenDocument Text Template
                mimetype = 'application/vnd.oasis.opendocument.text-template';
                break;
            case '.ktx':
                // OpenGL Textures (KTX)
                mimetype = 'image/ktx';
                break;
            case '.sxc':
                // OpenOffice - Calc (Spreadsheet)
                mimetype = 'application/vnd.sun.xml.calc';
                break;
            case '.stc':
                // OpenOffice - Calc Template (Spreadsheet)
                mimetype = 'application/vnd.sun.xml.calc.template';
                break;
            case '.sxd':
                // OpenOffice - Draw (Graphics)
                mimetype = 'application/vnd.sun.xml.draw';
                break;
            case '.std':
                // OpenOffice - Draw Template (Graphics)
                mimetype = 'application/vnd.sun.xml.draw.template';
                break;
            case '.sxi':
                // OpenOffice - Impress (Presentation)
                mimetype = 'application/vnd.sun.xml.impress';
                break;
            case '.sti':
                // OpenOffice - Impress Template (Presentation)
                mimetype = 'application/vnd.sun.xml.impress.template';
                break;
            case '.sxm':
                // OpenOffice - Math (Formula)
                mimetype = 'application/vnd.sun.xml.math';
                break;
            case '.sxw':
                // OpenOffice - Writer (Text - HTML)
                mimetype = 'application/vnd.sun.xml.writer';
                break;
            case '.sxg':
                // OpenOffice - Writer (Text - HTML)
                mimetype = 'application/vnd.sun.xml.writer.global';
                break;
            case '.stw':
                // OpenOffice - Writer Template (Text - HTML)
                mimetype = 'application/vnd.sun.xml.writer.template';
                break;
            case '.otf':
                // OpenType Font File
                mimetype = 'application/x-font-otf';
                break;
            case '.osfpvg':
                // OSFPVG
                mimetype = 'application/vnd.yamaha.openscoreformat.osfpvg+xml';
                break;
            case '.dp':
                // OSGi Deployment Package
                mimetype = 'application/vnd.osgi.dp';
                break;
            case '.pdb':
                // PalmOS Data
                mimetype = 'application/vnd.palm';
                break;
            case '.p':
                // Pascal Source File
                mimetype = 'text/x-pascal';
                break;
            case '.paw':
                // PawaaFILE
                mimetype = 'application/vnd.pawaafile';
                break;
            case '.pclxl':
                // PCL 6 Enhanced (Formely PCL XL)
                mimetype = 'application/vnd.hp-pclxl';
                break;
            case '.efif':
                // Pcsel eFIF File
                mimetype = 'application/vnd.picsel';
                break;
            case '.pcx':
                // PCX Image
                mimetype = 'image/x-pcx';
                break;
            case '.psd':
                // Photoshop Document
                mimetype = 'image/vnd.adobe.photoshop';
                break;
            case '.prf':
                // PICSRules
                mimetype = 'application/pics-rules';
                break;
            case '.pic':
                // PICT Image
                mimetype = 'image/x-pict';
                break;
            case '.chat':
                // pIRCh
                mimetype = 'application/x-chat';
                break;
            case '.p10':
                // PKCS #10 - Certification Request Standard
                mimetype = 'application/pkcs10';
                break;
            case '.p12':
                // PKCS #12 - Personal Information Exchange Syntax Standard
                mimetype = 'application/x-pkcs12';
                break;
            case '.p7m':
                // PKCS #7 - Cryptographic Message Syntax Standard
                mimetype = 'application/pkcs7-mime';
                break;
            case '.p7s':
                // PKCS #7 - Cryptographic Message Syntax Standard
                mimetype = 'application/pkcs7-signature';
                break;
            case '.p7r':
                // PKCS #7 - Cryptographic Message Syntax Standard (Certificate Request Response)
                mimetype = 'application/x-pkcs7-certreqresp';
                break;
            case '.p7b':
                // PKCS #7 - Cryptographic Message Syntax Standard (Certificates)
                mimetype = 'application/x-pkcs7-certificates';
                break;
            case '.p8':
                // PKCS #8 - Private-Key Information Syntax Standard
                mimetype = 'application/pkcs8';
                break;
            case '.plf':
                // PocketLearn Viewers
                mimetype = 'application/vnd.pocketlearn';
                break;
            case '.pnm':
                // Portable Anymap Image
                mimetype = 'image/x-portable-anymap';
                break;
            case '.pbm':
                // Portable Bitmap Format
                mimetype = 'image/x-portable-bitmap';
                break;
            case '.pcf':
                // Portable Compiled Format
                mimetype = 'application/x-font-pcf';
                break;
            case '.pfr':
                // Portable Font Resource
                mimetype = 'application/font-tdpfr';
                break;
            case '.pgn':
                // Portable Game Notation (Chess Games)
                mimetype = 'application/x-chess-pgn';
                break;
            case '.pgm':
                // Portable Graymap Format
                mimetype = 'image/x-portable-graymap';
                break;
            case '.pskcxml':
                // Portable Symmetric Key Container
                mimetype = 'application/pskc+xml';
                break;
            case '.pml':
                // PosML
                mimetype = 'application/vnd.ctc-posml';
                break;
            case '.ai':
                // PostScript
                mimetype = 'application/postscript';
                break;
            case '.pfa':
                // PostScript Fonts
                mimetype = 'application/x-font-type1';
                break;
            case '.pbd':
                // PowerBuilder
                mimetype = 'application/vnd.powerbuilder6';
                break;
            case '':
                // Pretty Good Privacy
                mimetype = 'application/pgp-encrypted';
                break;
            case '.pgp':
                // Pretty Good Privacy - Signature
                mimetype = 'application/pgp-signature';
                break;
            case '.box':
                // Preview Systems ZipLock/VBox
                mimetype = 'application/vnd.previewsystems.box';
                break;
            case '.ptid':
                // Princeton Video Image
                mimetype = 'application/vnd.pvi.ptid1';
                break;
            case '.pls':
                // Pronunciation Lexicon Specification
                mimetype = 'application/pls+xml';
                break;
            case '.str':
                // Proprietary P&G Standard Reporting System
                mimetype = 'application/vnd.pg.format';
                break;
            case '.ei6':
                // Proprietary P&G Standard Reporting System
                mimetype = 'application/vnd.pg.osasli';
                break;
            case '.dsc':
                // PRS Lines Tag
                mimetype = 'text/prs.lines.tag';
                break;
            case '.psf':
                // PSF Fonts
                mimetype = 'application/x-font-linux-psf';
                break;
            case '.qps':
                // PubliShare Objects
                mimetype = 'application/vnd.publishare-delta-tree';
                break;
            case '.wg':
                // Qualcomm's Plaza Mobile Internet
                mimetype = 'application/vnd.pmi.widget';
                break;
            case '.qxd':
                // QuarkXpress
                mimetype = 'application/vnd.quark.quarkxpress';
                break;
            case '.esf':
                // QUASS Stream Player
                mimetype = 'application/vnd.epson.esf';
                break;
            case '.msf':
                // QUASS Stream Player
                mimetype = 'application/vnd.epson.msf';
                break;
            case '.ssf':
                // QUASS Stream Player
                mimetype = 'application/vnd.epson.ssf';
                break;
            case '.qam':
                // QuickAnime Player
                mimetype = 'application/vnd.epson.quickanime';
                break;
            case '.qfx':
                // Quicken
                mimetype = 'application/vnd.intu.qfx';
                break;
            case '.qt':
                // Quicktime Video
                mimetype = 'video/quicktime';
                break;
            case '.rar':
                // RAR Archive
                mimetype = 'application/x-rar-compressed';
                break;
            case '.ram':
                // Real Audio Sound
                mimetype = 'audio/x-pn-realaudio';
                break;
            case '.rmp':
                // Real Audio Sound
                mimetype = 'audio/x-pn-realaudio-plugin';
                break;
            case '.rsd':
                // Really Simple Discovery
                mimetype = 'application/rsd+xml';
                break;
            case '.rm':
                // RealMedia
                mimetype = 'application/vnd.rn-realmedia';
                break;
            case '.mxl':
                // Recordare Applications
                mimetype = 'application/vnd.recordare.musicxml';
                break;
            case '.musicxml':
                // Recordare Applications
                mimetype = 'application/vnd.recordare.musicxml+xml';
                break;
            case '.rnc':
                // Relax NG Compact Syntax
                mimetype = 'application/relax-ng-compact-syntax';
                break;
            case '.rdz':
                // RemoteDocs R-Viewer
                mimetype = 'application/vnd.data-vision.rdz';
                break;
            case '.rdf':
                // Resource Description Framework
                mimetype = 'application/rdf+xml';
                break;
            case '.rp9':
                // RetroPlatform Player
                mimetype = 'application/vnd.cloanto.rp9';
                break;
            case '.jisp':
                // RhymBox
                mimetype = 'application/vnd.jisp';
                break;
            case '.rtf':
                // Rich Text Format
                mimetype = 'application/rtf';
                break;
            case '.rtx':
                // Rich Text Format (RTF)
                mimetype = 'text/richtext';
                break;
            case '.link66':
                // ROUTE 66 Location Based Services
                mimetype = 'application/vnd.route66.link66+xml';
                break;
            case '.rss, .xml':
                // RSS - Really Simple Syndication
                mimetype = 'application/rss+xml';
                break;
            case '.shf':
                // S Hexdump Format
                mimetype = 'application/shf+xml';
                break;
            case '.st':
                // SailingTracker
                mimetype = 'application/vnd.sailingtracker.track';
                break;
            case '.sus':
                // ScheduleUs
                mimetype = 'application/vnd.sus-calendar';
                break;
            case '.sru':
                // Search/Retrieve via URL Response Format
                mimetype = 'application/sru+xml';
                break;
            case '.setpay':
                // Secure Electronic Transaction - Payment
                mimetype = 'application/set-payment-initiation';
                break;
            case '.setreg':
                // Secure Electronic Transaction - Registration
                mimetype = 'application/set-registration-initiation';
                break;
            case '.sema':
                // Secured eMail
                mimetype = 'application/vnd.sema';
                break;
            case '.semd':
                // Secured eMail
                mimetype = 'application/vnd.semd';
                break;
            case '.semf':
                // Secured eMail
                mimetype = 'application/vnd.semf';
                break;
            case '.see':
                // SeeMail
                mimetype = 'application/vnd.seemail';
                break;
            case '.snf':
                // Server Normal Format
                mimetype = 'application/x-font-snf';
                break;
            case '.spq':
                // Server-Based Certificate Validation Protocol - Validation Policies - Request
                mimetype = 'application/scvp-vp-request';
                break;
            case '.spp':
                // Server-Based Certificate Validation Protocol - Validation Policies - Response
                mimetype = 'application/scvp-vp-response';
                break;
            case '.scq':
                // Server-Based Certificate Validation Protocol - Validation Request
                mimetype = 'application/scvp-cv-request';
                break;
            case '.scs':
                // Server-Based Certificate Validation Protocol - Validation Response
                mimetype = 'application/scvp-cv-response';
                break;
            case '.sdp':
                // Session Description Protocol
                mimetype = 'application/sdp';
                break;
            case '.etx':
                // Setext
                mimetype = 'text/x-setext';
                break;
            case '.movie':
                // SGI Movie
                mimetype = 'video/x-sgi-movie';
                break;
            case '.ifm':
                // Shana Informed Filler
                mimetype = 'application/vnd.shana.informed.formdata';
                break;
            case '.itp':
                // Shana Informed Filler
                mimetype = 'application/vnd.shana.informed.formtemplate';
                break;
            case '.iif':
                // Shana Informed Filler
                mimetype = 'application/vnd.shana.informed.interchange';
                break;
            case '.ipk':
                // Shana Informed Filler
                mimetype = 'application/vnd.shana.informed.package';
                break;
            case '.tfi':
                // Sharing Transaction Fraud Data
                mimetype = 'application/thraud+xml';
                break;
            case '.shar':
                // Shell Archive
                mimetype = 'application/x-shar';
                break;
            case '.rgb':
                // Silicon Graphics RGB Bitmap
                mimetype = 'image/x-rgb';
                break;
            case '.slt':
                // SimpleAnimeLite Player
                mimetype = 'application/vnd.epson.salt';
                break;
            case '.aso':
                // Simply Accounting
                mimetype = 'application/vnd.accpac.simply.aso';
                break;
            case '.imp':
                // Simply Accounting - Data Import
                mimetype = 'application/vnd.accpac.simply.imp';
                break;
            case '.twd':
                // SimTech MindMapper
                mimetype = 'application/vnd.simtech-mindmapper';
                break;
            case '.csp':
                // Sixth Floor Media - CommonSpace
                mimetype = 'application/vnd.commonspace';
                break;
            case '.saf':
                // SMAF Audio
                mimetype = 'application/vnd.yamaha.smaf-audio';
                break;
            case '.mmf':
                // SMAF File
                mimetype = 'application/vnd.smaf';
                break;
            case '.spf':
                // SMAF Phrase
                mimetype = 'application/vnd.yamaha.smaf-phrase';
                break;
            case '.teacher':
                // SMART Technologies Apps
                mimetype = 'application/vnd.smart.teacher';
                break;
            case '.svd':
                // SourceView Document
                mimetype = 'application/vnd.svd';
                break;
            case '.rq':
                // SPARQL - Query
                mimetype = 'application/sparql-query';
                break;
            case '.srx':
                // SPARQL - Results
                mimetype = 'application/sparql-results+xml';
                break;
            case '.gram':
                // Speech Recognition Grammar Specification
                mimetype = 'application/srgs';
                break;
            case '.grxml':
                // Speech Recognition Grammar Specification - XML
                mimetype = 'application/srgs+xml';
                break;
            case '.ssml':
                // Speech Synthesis Markup Language
                mimetype = 'application/ssml+xml';
                break;
            case '.skp':
                // SSEYO Koan Play File
                mimetype = 'application/vnd.koan';
                break;
            case '.sgml':
                // Standard Generalized Markup Language (SGML)
                mimetype = 'text/sgml';
                break;
            case '.sdc':
                // StarOffice - Calc
                mimetype = 'application/vnd.stardivision.calc';
                break;
            case '.sdd':
                // StarOffice - Impress
                mimetype = 'application/vnd.stardivision.impress';
                break;
            case '.sdw':
                // StarOffice - Writer
                mimetype = 'application/vnd.stardivision.writer';
                break;
            case '.sm':
                // StepMania
                mimetype = 'application/vnd.stepmania.stepchart';
                break;
            case '.sit':
                // Stuffit Archive
                mimetype = 'application/x-stuffit';
                break;
            case '.sitx':
                // Stuffit Archive
                mimetype = 'application/x-stuffitx';
                break;
            case '.sdkm':
                // SudokuMagic
                mimetype = 'application/vnd.solent.sdkm+xml';
                break;
            case '.xo':
                // Sugar Linux Application Bundle
                mimetype = 'application/vnd.olpc-sugar';
                break;
            case '.au':
                // Sun Audio - Au file format
                mimetype = 'audio/basic';
                break;
            case '.wqd':
                // SundaHus WQ
                mimetype = 'application/vnd.wqd';
                break;
            case '.sis':
                // Symbian Install Package
                mimetype = 'application/vnd.symbian.install';
                break;
            case '.smi':
                // Synchronized Multimedia Integration Language
                mimetype = 'application/smil+xml';
                break;
            case '.xsm':
                // SyncML
                mimetype = 'application/vnd.syncml+xml';
                break;
            case '.bdm':
                // SyncML - Device Management
                mimetype = 'application/vnd.syncml.dm+wbxml';
                break;
            case '.xdm':
                // SyncML - Device Management
                mimetype = 'application/vnd.syncml.dm+xml';
                break;
            case '.sv4cpio':
                // System V Release 4 CPIO Archive
                mimetype = 'application/x-sv4cpio';
                break;
            case '.sv4crc':
                // System V Release 4 CPIO Checksum Data
                mimetype = 'application/x-sv4crc';
                break;
            case '.sbml':
                // Systems Biology Markup Language
                mimetype = 'application/sbml+xml';
                break;
            case '.tsv':
                // Tab Seperated Values
                mimetype = 'text/tab-separated-values';
                break;
            case '.tao':
                // Tao Intent
                mimetype = 'application/vnd.tao.intent-module-archive';
                break;
            case '.tar':
                // Tar File (Tape Archive)
                mimetype = 'application/x-tar';
                break;
            case '.tcl':
                // Tcl Script
                mimetype = 'application/x-tcl';
                break;
            case '.tex':
                // TeX
                mimetype = 'application/x-tex';
                break;
            case '.tfm':
                // TeX Font Metric
                mimetype = 'application/x-tex-tfm';
                break;
            case '.tei':
                // Text Encoding and Interchange
                mimetype = 'application/tei+xml';
                break;
            case '.dxp':
                // TIBCO Spotfire
                mimetype = 'application/vnd.spotfire.dxp';
                break;
            case '.sfs':
                // TIBCO Spotfire
                mimetype = 'application/vnd.spotfire.sfs';
                break;
            case '.tsd':
                // Time Stamped Data Envelope
                mimetype = 'application/timestamped-data';
                break;
            case '.tpt':
                // TRI Systems Config
                mimetype = 'application/vnd.trid.tpt';
                break;
            case '.mxs':
                // Triscape Map Explorer
                mimetype = 'application/vnd.triscape.mxs';
                break;
            case '.t':
                // troff
                mimetype = 'text/troff';
                break;
            case '.tra':
                // True BASIC
                mimetype = 'application/vnd.trueapp';
                break;
            case '.ttf':
                // TrueType Font
                mimetype = 'application/x-font-ttf';
                break;
            case '.ttl':
                // Turtle (Terse RDF Triple Language)
                mimetype = 'text/turtle';
                break;
            case '.umj':
                // UMAJIN
                mimetype = 'application/vnd.umajin';
                break;
            case '.uoml':
                // Unique Object Markup Language
                mimetype = 'application/vnd.uoml+xml';
                break;
            case '.unityweb':
                // Unity 3d
                mimetype = 'application/vnd.unity';
                break;
            case '.ufd':
                // Universal Forms Description Language
                mimetype = 'application/vnd.ufdl';
                break;
            case '.uri':
                // URI Resolution Services
                mimetype = 'text/uri-list';
                break;
            case '.utz':
                // User Interface Quartz - Theme (Symbian)
                mimetype = 'application/vnd.uiq.theme';
                break;
            case '.ustar':
                // Ustar (Uniform Standard Tape Archive)
                mimetype = 'application/x-ustar';
                break;
            case '.uu':
                // UUEncode
                mimetype = 'text/x-uuencode';
                break;
            case '.vcs':
                // vCalendar
                mimetype = 'text/x-vcalendar';
                break;
            case '.vcf':
                // vCard
                mimetype = 'text/x-vcard';
                break;
            case '.vcd':
                // Video CD
                mimetype = 'application/x-cdlink';
                break;
            case '.vsf':
                // Viewport+
                mimetype = 'application/vnd.vsf';
                break;
            case '.wrl':
                // Virtual Reality Modeling Language
                mimetype = 'model/vrml';
                break;
            case '.vcx':
                // VirtualCatalog
                mimetype = 'application/vnd.vcx';
                break;
            case '.mts':
                // Virtue MTS
                mimetype = 'model/vnd.mts';
                break;
            case '.vtu':
                // Virtue VTU
                mimetype = 'model/vnd.vtu';
                break;
            case '.vis':
                // Visionary
                mimetype = 'application/vnd.visionary';
                break;
            case '.viv':
                // Vivo
                mimetype = 'video/vnd.vivo';
                break;
            case '.ccxml':
                // Voice Browser Call Control
                mimetype = 'application/ccxml+xml,';
                break;
            case '.vxml':
                // VoiceXML
                mimetype = 'application/voicexml+xml';
                break;
            case '.src':
                // WAIS Source
                mimetype = 'application/x-wais-source';
                break;
            case '.wbxml':
                // WAP Binary XML (WBXML)
                mimetype = 'application/vnd.wap.wbxml';
                break;
            case '.wbmp':
                // WAP Bitamp (WBMP)
                mimetype = 'image/vnd.wap.wbmp';
                break;
            case '.wav':
                // Waveform Audio File Format (WAV)
                mimetype = 'audio/x-wav';
                break;
            case '.davmount':
                // Web Distributed Authoring and Versioning
                mimetype = 'application/davmount+xml';
                break;
            case '.woff':
                // Web Open Font Format
                mimetype = 'application/x-font-woff';
                break;
            case '.wspolicy':
                // Web Services Policy
                mimetype = 'application/wspolicy+xml';
                break;
            case '.webp':
                // WebP Image
                mimetype = 'image/webp';
                break;
            case '.wtb':
                // WebTurbo
                mimetype = 'application/vnd.webturbo';
                break;
            case '.wgt':
                // Widget Packaging and XML Configuration
                mimetype = 'application/widget';
                break;
            case '.hlp':
                // WinHelp
                mimetype = 'application/winhlp';
                break;
            case '.wml':
                // Wireless Markup Language (WML)
                mimetype = 'text/vnd.wap.wml';
                break;
            case '.wmls':
                // Wireless Markup Language Script (WMLScript)
                mimetype = 'text/vnd.wap.wmlscript';
                break;
            case '.wmlsc':
                // WMLScript
                mimetype = 'application/vnd.wap.wmlscriptc';
                break;
            case '.wpd':
                // Wordperfect
                mimetype = 'application/vnd.wordperfect';
                break;
            case '.stf':
                // Worldtalk
                mimetype = 'application/vnd.wt.stf';
                break;
            case '.wsdl':
                // WSDL - Web Services Description Language
                mimetype = 'application/wsdl+xml';
                break;
            case '.der':
                // X.509 Certificate
                mimetype = 'application/x-x509-ca-cert';
                break;
            case '.fig':
                // Xfig
                mimetype = 'application/x-xfig';
                break;
            case '.xhtml':
                // XHTML - The Extensible HyperText Markup Language
                mimetype = 'application/xhtml+xml';
                break;
            case '.xml':
                // XML - Extensible Markup Language
                mimetype = 'application/xml';
                break;
            case '.xdf':
                // XML Configuration Access Protocol - XCAP Diff
                mimetype = 'application/xcap-diff+xml';
                break;
            case '.xenc':
                // XML Encryption Syntax and Processing
                mimetype = 'application/xenc+xml';
                break;
            case '.xer':
                // XML Patch Framework
                mimetype = 'application/patch-ops-error+xml';
                break;
            case '.rl':
                // XML Resource Lists
                mimetype = 'application/resource-lists+xml';
                break;
            case '.rs':
                // XML Resource Lists
                mimetype = 'application/rls-services+xml';
                break;
            case '.rld':
                // XML Resource Lists Diff
                mimetype = 'application/resource-lists-diff+xml';
                break;
            case '.xslt':
                // XML Transformations
                mimetype = 'application/xslt+xml';
                break;
            case '.xop':
                // XML-Binary Optimized Packaging
                mimetype = 'application/xop+xml';
                break;
            case '.xpi':
                // XPInstall - Mozilla
                mimetype = 'application/x-xpinstall';
                break;
            case '.xspf':
                // XSPF - XML Shareable Playlist Format
                mimetype = 'application/xspf+xml';
                break;
            case '.xul':
                // XUL - XML User Interface Language
                mimetype = 'application/vnd.mozilla.xul+xml';
                break;
            case '.xyz':
                // XYZ File Format
                mimetype = 'chemical/x-xyz';
                break;
            case '.yaml':
                // YAML Ain't Markup Language / Yet Another Markup Language
                mimetype = 'text/yaml';
                break;
            case '.yang':
                // YANG Data Modeling Language
                mimetype = 'application/yang';
                break;
            case '.yin':
                // YIN (YANG - XML)
                mimetype = 'application/yin+xml';
                break;
            case '.zir':
                // Z.U.L. Geometry
                mimetype = 'application/vnd.zul';
                break;
            case '.zip':
                // Zip Archive
                mimetype = 'application/zip';
                break;
            case '.zmm':
                // ZVUE Media Manager
                mimetype = 'application/vnd.handheld-entertainment+xml';
                break;
            case '.zaz':
                // Zzazz Deck
                mimetype = 'application/vnd.zzazz.deck+xml';
                break;
            default:
                // Binary Data
                mimetype = 'application/octet-stream';
                break;
        }

        return mimetype;
    }

    getUserAccessRights(pageType: string): any {
        if (localStorage.getItem('userAccessRights')) {
            let getData: any = JSON.parse(localStorage.getItem('userAccessRights'));
            // console.log("getData",getData)
            // console.log("getData",getData.data[0].attributes.accessrights)
            for (let data of getData.data[0].attributes.accessrights) {
                // console.log("data in get user access rights",data)
                if (data.constantname == pageType) {
                    return data;
                }
            }
        }
    }

    // login user is client user or not
    isClient(): any {
        // uData.role.id == ROLES.SuccessManager || uData.role.id == ROLES.Master ||
        // (uData.role.id == ROLES.BD && uData.parent.id != 232) || (uData.role.id == ROLES.TeamHead && uData.parent.id != 232)
        let uData = this.storageService.getUser();
        // console.log(uData)
        if (
            uData.role.id == ROLES.ContractorSuperAdmin ||
            uData.role.id == ROLES.ContractorAdmin ||
            uData.role.id == ROLES.Analyst ||
            uData.role.id == ROLES.Designer ||
            uData.role.id == ROLES.SuccessManager ||
            uData.role.id == ROLES.Surveyor ||
            (uData.role.id == ROLES.BD &&
                uData.parent.id != 232) ||
            (uData.role.id == ROLES.TeamHead &&
                uData.parent.id != 232)
        ) {
            return true;
        } else {
            return false;
        }
    }

    // login user is wattmonk user or not
    isWattmonkUser(): any {
        let uData = this.storageService.getUser();
        if (
            uData.role.id == ROLES.SuperAdmin ||
            uData.role.id == ROLES.Admin ||
            ((uData.role.id == ROLES.TeamHead || uData.role.id == ROLES.BD) &&
                uData.parent.id == 232)
        ) {
            return true;
        } else {
            return false;
        }
    }

    // login user role is designer  or not
    isUserDesigner(): any {
        let uData = this.storageService.getUser();
        if (uData.role.id == ROLES.Designer) {
            return true;
        } else {
            return false;
        }
    }

    isUserAnalyst(): any {
        let uData = this.storageService.getUser();
        if (uData.role.id == ROLES.Analyst) {
            return true;
        } else {
            return false;
        }
    }

    isVAAgent(): any {
        let uData = this.storageService.getUser();
        if (uData.role.id == ROLES.VAAgent) {
            return true;
        } else {
            return false;
        }
    }
    // if previous page not found
    onRedirectIfPreviousPageNotFound(): void {
        if (this.storageService.isUserPresent()) {
            // this.apiService.refreshHeader();
            let userData = JSON.parse(localStorage.getItem('user'));
            if (userData.role.type == 'surveyors') {
                this.navCtrl.navigateRoot('surveyoroverview');
            } else if (userData.role.type == 'designer') {
                let permitAccess = this.getUserAccessRights('permit');
                let prelimAccess = this.getUserAccessRights('prelim');
                if (permitAccess?.visibility) {
                    this.navCtrl.navigateRoot(['permitdesignoverview']);
                } else if (prelimAccess?.visibility) {
                    this.navCtrl.navigateRoot(['designoverview']);
                }
            } else if (userData.role.type === 'qcinspector') {
                let permitAccess = this.getUserAccessRights('permit');
                let prelimAccess = this.getUserAccessRights('prelim');
                let surveyAccess = this.getUserAccessRights('survey');
                if (permitAccess?.visibility) {
                    this.navCtrl.navigateRoot(['analystoverview/permitdesign']);
                } else if (prelimAccess?.visibility) {
                    this.navCtrl.navigateRoot(['analystoverview/design']);
                } else if (surveyAccess?.visibility) {
                    this.navCtrl.navigateRoot(['analystoverview/survey']);
                }
            } else if (
                userData.role.type === 'clientsuperadmin' &&
                (userData.isonboardingcompleted === null || userData.isonboardingcompleted === false)
            ) {
                this.navCtrl.navigateRoot('onboarding');
            } else if (userData.role.type === 'peengineer') {
                this.navCtrl.navigateRoot('peengineer');
            } else if (userData.role.type === 'pesuperadmin' || userData.role.type === 'peadmin') {
                this.navCtrl.navigateRoot('pestamp-homepage');
            } else {
                let dashboardAccess = this.getUserAccessRights('dashboard');
                let permitAccess = this.getUserAccessRights('permit');
                let prelimAccess = this.getUserAccessRights('prelim');
                let pestampAccess = this.getUserAccessRights('pestamp');
                let surveyAccess = this.getUserAccessRights('survey');

                if (dashboardAccess?.visibility) {
                    this.navCtrl.navigateRoot(['/dashboard']);
                } else  if (permitAccess?.visibility) {
                    this.navCtrl.navigateRoot(['permit-home']);
                } else if (prelimAccess?.visibility) {
                    this.navCtrl.navigateRoot(['home/design']);
                } else if (pestampAccess?.visibility) {
                    this.navCtrl.navigateRoot(['pestamp-home']);
                } else if (surveyAccess?.visibility) {
                    this.navCtrl.navigateRoot(['home/survey']);
                } else {
                    this.navCtrl.navigateRoot(['/dashboard']);
                }
                // this.navCtrl.navigateRoot(???dashboard???);
            }
        }
    }

    socialShare(file) {
        console.log("socialShare", file)

        var options = {
            message: 'I have shared a survey PDF with you. Survey address is ' + file.address + '.',
            url: file.url
        }
        console.log('options', options);

        this.socialsharing.shareWithOptions(options);
    }

    fileDownload(file) {
        console.log("fileDownload => ", file.url);
        if (this.platform.is('ios')) {
            this.showLoading('Please wait...').then(() => {
                let dir_name = 'WattMonk';
                let path = '';
                const url = file.url;
                const fileTransfer: FileTransferObject = this.transfer.create();

                let result = this.file.createDir(this.file.documentsDirectory, dir_name, true);
                console.log('result', result);

                result.then((resp) => {
                    console.log('resp', resp);

                    path = resp.toURL();
                    console.log('path', path);

                    fileTransfer.download(url, path + file.hash + file.ext).then((entry) => {
                        console.log('entry', entry);
                        this.hideLoading().then(() => {
                            this.fileOpener.open(entry.nativeURL, 'application/pdf')
                                .then(() => console.log('File is opened'))
                                .catch(e => console.log('Error opening file', e));
                        });
                    }, (error) => {
                        // handle error
                        this.hideLoading();
                    });
                }, (error) => {
                    this.hideLoading();
                });
            }, (error) => {
                console.log('error', error);
                this.hideLoading();
            });
        } else if (this.platform.is('android')) {
            const request: DownloadRequest = {
                uri: file.url,
                title: file.name,
                mimeType: file.mime,
                visibleInDownloadsUi: true,
                notificationVisibility: NotificationVisibility.VisibleNotifyCompleted,
                destinationInExternalFilesDir: {
                    dirType: 'Downloads',
                    subPath: file.name + '.pdf'
                }
            };

            this.downloader.download(request)
                .then((location: string) => {
                    console.log('File downloaded at:' + location);
                    this.showSnackBar("Survey File Downloaded Successfully");
                }).catch((error: any) => console.log(error));
        }
    }
}

// getcount(){
//   return this.unreadCount.next(count);
// }
