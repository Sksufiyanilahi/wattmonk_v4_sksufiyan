import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import { ActionPerformed, PushNotificationSchema, PushNotifications, Token } from '@capacitor/push-notifications';
import { AlertController, MenuController, ModalController, NavController, Platform } from '@ionic/angular';

import { CometChat } from '@cometchat-pro/cordova-ionic-chat/CometChat';

import { from, Observable, Subscription } from 'rxjs';
import { UserData } from './models/userData.model';
import { DrawerState } from 'ion-bottom-drawer';
import { StorageService } from './services/storage/storage.service';
import { ApiService } from './services/api/api.service';
import { FirebaseX } from '@awesome-cordova-plugins/firebase-x/ngx';
import { UtilitiesService } from './services/utilities/utilities.service';
import { NetworkDetectService } from './services/network-detect/network-detect.service';
import { NavigationExtras, Router } from '@angular/router';
import { MixpanelService } from './services/mixpanel/mixpanel.service';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { Storage } from '@ionic/storage';
import { CustomEventsService } from './services/custom-events/custom-events.service';
import { COMETCHAT_CONSTANTS } from './services/constants';
import { LogoutPage } from './pages/logout/logout.page';

import { SplashScreen } from '@capacitor/splash-screen';
import { PaypalPaymentPage } from './pages/paypal-payment/paypal-payment.page';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent {
    public homeimage: any;
    public selectedIndex = 0;
    public appPages = [];
    public isLoggedInOnce: any;
    public getuser_one: any;

    public user: any = '';
    public ischatuserloggedin = false;
    public onlineOffline: boolean = navigator.onLine;
    public netSwitch: boolean;
    public retryattempt = 2;
    public totalcountsforallgroups: number;
    public firebaseToken: string;
    public userData: UserData;
    public deactivateGetUserData: Subscription;
    public deactivateNetworkSwitch: Subscription;
    public newprelims: Observable<any>;
    public newprelimsRef: AngularFireObject<any>;
    //newprelimsRef:any;
    public newprelimscounts = 0;
    public newpermits: Observable<any>;
    public newpermitsRef: AngularFireObject<any>;
    //newpermitsRef:any;
    public newpermitscounts = 0;
    //for pestamp badges
    public newpestamp: Observable<any>;
    public newpestampRef: AngularFireObject<any>;
    public newpestampscount = 0;
    public menuwidth = 0;
    public getclientsrole: any;
    public userrole: string;
    public specificclientid: any;
    public joyrideTitle = "Design"
    public joyridetext = "Consolidated dashboard for all your  design requests with real-time status tracking."
    public getUserAccessRightsData: any;
    public logoutUsersRef: AngularFireObject<any>;
    public unreadMessageCount: number = 0;
    public isClient: boolean = true;
    public isTapNotification: boolean = false;
    public enableDisable: boolean = false;
    public showBottomDraw: boolean = false;
    public drawerState = DrawerState.Bottom;
    public accessRightCount: number = 0;
    public sourceType: string = '';
    userprofile: any;
    accessrightData: any;
    sourcetype: string;

    constructor(
        private platform: Platform,
        private storageService: StorageService,
        private navController: NavController,
        // private fcm: FCM,
        private apiservice: ApiService,
        private firebase: FirebaseX,
        public utilities: UtilitiesService,
        private network: NetworkDetectService,
        public router: Router,
        private db: AngularFireDatabase,
        public menuCtrl: MenuController,
        private changeDetectorRef: ChangeDetectorRef,
        private mix: MixpanelService,
        private alertController: AlertController,
        private networkPlugin: Network,
        private deviceStorage: Storage,
        private eventService: CustomEventsService,
        private zone: NgZone,
        public modalController: ModalController,
    ) {
        this.initializeApp();

        if (!navigator.onLine) {
            // this.utilities.showSnackBar('No internet connection');
            //Do task when no internet connection
        }
        window.addEventListener('online', () => {
            //Do task when internet connection returns
        });

        window.addEventListener('offline', () => {
            //Do task when no internet connection
            setTimeout(() => {
                this.utilities.errorSnackBar('No internet connection');
            }, 2000);
        });
        //Counts in Sidemenu
        this.newprelimsRef = db.object('newprelimdesigns');
        this.newprelims = this.newprelimsRef.valueChanges();
        this.newprelims.subscribe(
            (res) => {
                this.newprelimscounts = res.count;
                // this.changeDetectorRef.detectChanges();
            },
        );
        this.newpermitsRef = db.object('newpermitdesigns');
        this.newpermits = this.newpermitsRef.valueChanges();
        this.newpermits.subscribe(
            (res) => {
                this.newpermitscounts = res.count;
                // this.changeDetectorRef.detectChanges();
            },
        );

        //For Pestamp Badges
        this.newpestampRef = db.object('newpestamp');
        this.newpestamp = this.newpestampRef.valueChanges();
        this.newpestamp.subscribe(
            (res) => {
                this.newpestampscount = res.count;
                // this.changeDetectorRef.detectChanges();
            },
        );
        // this.db.doc('/newprelimdesigns/1').valueChanges().subscribe((res:any)=>{
        //   this.newprelimscounts = res;
        // })

        // auto logout for access rights
        this.logoutUsersRef = this.db.object("hard_logout");

        let logoutUsers = this.logoutUsersRef.valueChanges();

        logoutUsers.subscribe((res) => {
            if (res?.hard_logout) {
                this.apiservice.getUserData(this.user.id).subscribe((response: any) => {
                    if (response != null && response.hard_logout) {
                        const postData = {
                            hard_logout: false,
                        };
                        // update use api call here
                        this.apiservice.editProfile(postData, this.user.id).subscribe((res) => {

                        }, (error) => {

                        });

                        // user logout
                        this.storageService.logout();
                        CometChat.logout().then(
                            (loggedOut: Object) => {
                                console.log("Logout completed successfully");
                            }, (error: CometChat.CometChatException) => {
                                console.log("Logout failed with exception:", { error });
                            }
                        );
                        this.deviceStorage.remove('pvsurveyjson');
                        this.deviceStorage.remove('uploadSurveyUsingMobileNetwork');
                        this.apiservice.resetHeaders();
                        this.navController.navigateRoot('login');
                    }
                }, (error) => {
                    console.log('error', error);
                });
            }
        });
    }

    initializeApp() {
        this.isLoggedInOnce = this.storageService.getUser();

        this.platform.ready().then(() => {
            this.handleBackbutton();
            this.utilities.setupCometChat();
            this.mix.initializeMixPanel();
            localStorage.setItem('networkType', this.networkPlugin.type);
            if (this.user !== null || this.user !== '') {
                this.registerAPNS(this.user);
            }
            // this.splashScreen.hide();
            this.unreadMessageCount = 0;
            console.log('this.unreadMessageCount', this.unreadMessageCount);
            
            setTimeout(() => {
                SplashScreen.hide({
                    fadeOutDuration: 2000
                });
            }, 2000)
        });
    }

    handleBackbutton() {
        this.platform.backButton.subscribeWithPriority(9999, () => {
            console.log('Handler was called!');
            navigator['app'].exitApp();
        });
        // this.platform.backButton.subscribeWithPriority(10, () => {

        //     this.alertController.getTop().then(r => {
        //       if (r) {
        //         navigator['app'].exitApp();
        //       }
        //     }).catch(e => {

        //     })
        //   });
    }

    registerAPNS(user): void {
        // Request permission to use push notifications
        // iOS will prompt user and return if they granted permission or not
        // Android will just grant without prompting
        PushNotifications.requestPermissions().then(result => {
            if (result.receive === 'granted') {
                // Register with Apple / Google to receive push via APNS/FCM
                PushNotifications.register();
            } else {
                // Show some error
            }
        });

        // On success, we should be able to receive notifications
        PushNotifications.addListener('registration',
            (token: Token) => {
                console.log('Push registration success, token: ' + token.value);
                localStorage.setItem('pushtoken', token.value);
                let id = user ? user.id : this.storageService.getUserID();
                this.apiservice.pushtoken(id, { newpushtoken: localStorage.getItem('pushtoken') }).subscribe((success) => {
                    console.log('success', success);
                }, (error) => {
                    console.log('error', error);
                });
            }
        );

        // Some issue with our setup and push will not work
        PushNotifications.addListener('registrationError',
            (error: any) => {
                console.log('Error on registration: ' + JSON.stringify(error));
            }
        );

        // Show us the notification payload if the app is open on our device
        PushNotifications.addListener('pushNotificationReceived',
            (notification: PushNotificationSchema) => {
                console.log('Push received: ' + JSON.stringify(notification));
            }
        );

        // Method called when tapping on a notification
        PushNotifications.addListener('pushNotificationActionPerformed',
            (notification: ActionPerformed) => {
                let getMessage: any = notification.notification.data;
                console.log('getMessage', getMessage);

                // this.presentAlert('pushNotificationActionPerformed 1', notification.actionId);
                if (notification.actionId == "tap") {
                    this.isTapNotification = true;
                    console.log('notification.actionId', notification.actionId);
                    this.notificationRedirect(getMessage);
                }
            }
        );
    }

    isEmptyObject(obj) {
        return obj && Object.keys(obj).length === 0;
    }

    ngOnInit() {
        this.sourcetype = 'web'

        this.accessRightCount = 0;
        this.menuwidth = (this.platform.width() * 0.80) - 32;
        if (localStorage.getItem('newpasswordrequested')) {
            this.router.navigate(['/reset-password'])
            return;
        }
        this.deactivateNetworkSwitch = this.network.networkSwitch.subscribe((data) => {
            this.netSwitch = data;

        });

        this.network.networkDisconnect();
        this.network.networkConnect();

        if (this.storageService.isUserPresent()) {
            this.apiservice.refreshHeader();
            this.user = JSON.parse(localStorage.getItem('user'));
            console.log('this.user.source', this.user.source);
            this.unreadMessageCount = 0;
            this.getData();

            if (this.user.source == 'android' || this.user.source == 'iphone') {
                if (this.user.isdefaultpassword) {
                    this.navController.navigateRoot(['change-password']);
                } else {
                    if (this.user.role.type == 'surveyors') {
                        this.navController.navigateRoot(['surveyor-overview']);
                    } else {
                        if (this.user.role.type === 'clientsuperadmin' && (this.user.isonboardingcompleted == null || this.user.isonboardingcompleted == false)) {
                            this.navController.navigateRoot('onboarding');
                        } else {
                            this.navController.navigateRoot(['home/survey']);
                        }
                    }
                }
            } else if (this.user.source == 'web') {
                if (this.user.role.type == 'surveyors') {
                    this.navController.navigateRoot('surveyor-overview');
                    // comment on 20220201
                } else if (this.user.role.type == 'designer') {
                    let permitAccess = this.utilities.getUserAccessRights('permit');
                    let prelimAccess = this.utilities.getUserAccessRights('prelim');
                    if (permitAccess?.visibility) {
                        this.navController.navigateRoot(['permit-design-overview']);
                    } else if (prelimAccess?.visibility) {
                        this.navController.navigateRoot(['design-overview']);
                    }
                } else if (this.user.role.type === 'qcinspector') {
                    // this.navController.navigateRoot('analyst-overview');
                    let permitAccess = this.utilities.getUserAccessRights('permit');
                    let prelimAccess = this.utilities.getUserAccessRights('prelim');
                    let surveyAccess = this.utilities.getUserAccessRights('survey');
                    if (permitAccess?.visibility) {
                        this.navController.navigateRoot(['analyst-overview/permit-design']);
                    } else if (prelimAccess?.visibility) {
                        this.navController.navigateRoot(['analyst-overview/design']);
                    } else if (surveyAccess?.visibility) {
                        this.navController.navigateRoot(['analyst-overview/survey']);
                    }
                } else if (
                    this.user.role.type === 'clientsuperadmin' &&
                    (this.user.isonboardingcompleted === null || this.user.isonboardingcompleted === false)
                ) {
                    this.navController.navigateRoot('onboarding');
                } else if (this.user.role.type === 'peengineer') {
                    this.navController.navigateRoot('peengineer');
                } else if (this.user.role.type === 'pesuperadmin' || this.user.role.type === 'peadmin') {
                    this.navController.navigateRoot('pestamp-home');
                } else {
                    // this.utilities.errorSnackBar("Access Denied!! Soon we will be coming up with our platform accessibility.");
                    // comment on 20220506
                    // this.navController.navigateRoot('dashboard');

                    let dashboardAccess = this.utilities.getUserAccessRights('dashboard');
                    let permitAccess = this.utilities.getUserAccessRights('permit');
                    let prelimAccess = this.utilities.getUserAccessRights('prelim');
                    let pestampAccess = this.utilities.getUserAccessRights('pestamp');
                    let surveyAccess = this.utilities.getUserAccessRights('survey');

                    if (dashboardAccess?.visibility) {
                        this.navController.navigateRoot(['/dashboard']);
                    } else if (permitAccess?.visibility) {
                        this.navController.navigateRoot(['permit-home']);
                    } else if (prelimAccess?.visibility) {
                        this.navController.navigateRoot(['home/design']);
                    } else if (pestampAccess?.visibility) {
                        this.navController.navigateRoot(['pestamp-home']);
                    } else if (surveyAccess?.visibility) {
                        this.navController.navigateRoot(['home/survey']);
                    } else {
                        this.navController.navigateRoot(['/dashboard']);
                    }
                    // comment on 20220131
                    // if (this.user.role.type === 'clientsuperadmin' || this.user.role.type === 'wattmonkadmins' || this.user.role.type === 'superadmin') {
                    //     this.navController.navigateRoot('dashboard');
                    // } else {
                    //     this.navController.navigateRoot('permit-home');
                    // }
                }
            }
        }
        const path = window.location.pathname.split('/')[1];

        if (path !== undefined) {
            this.selectedIndex = this.appPages.findIndex((page) => page.title.toLowerCase() === path.toLowerCase());
        }

        this.deactivateGetUserData = this.apiservice.getUserName().subscribe((res: any) => {
            console.log(res);
            
            this.userData = res;
            this.userprofile = this.userData['userprofile'];
            console.log(this.userprofile.lastname);
             
        
            console.log('getUserName this.userData', this.userData);

            if (res.role.name == 'ContractorSuperAdmin') {
                this.userData.role.name = 'SuperAdmin';
            } else if (res.role.name == 'WattmonkAdmin') {
                this.userData.role.name = 'Admin';
            }
            this.getClientRole();
            console.log('this.accessRightCount', this.accessRightCount);

            if (this.accessRightCount == 0) {
                console.log(res.id)
                this.getUserAccessRights(res.id);
            }
            this.isClient = this.utilities.isClient();
        }, (error) => {
            console.log('getUserName error', error);
        });

        // subscribe unread message count
        this.eventService.subscribe('foo:update-unread-msg-count', (data: any) => {
            this.unreadMessageCount = data.unreadMessageCount;
        });
        setInterval(async () => {
            await this.getData();
        }, 1000);
    }

    async getData() {
        await this.utilities.getUnreadMessageCountForGroupsAsyc();
        this.changeDetectorRef.detectChanges();
    }

    getClientRole() {
        const uData = this.storageService.getUser();

        if (uData) {
            let parentId = uData.parent.id;
            let roleId = uData.role.id;
            this.apiservice.getDynamicRoles(parentId, roleId).subscribe(
                (response: any) => {
                    this.getclientsrole = response.length;
                    if (response.length > 0 && response[0].client.id !== 232) {
                        this.specificclientid;
                        if (response[0].id && response[0].client.id !== 232) {
                            this.specificclientid = response[0].client.id;
                            this.utilities.isspecificClient = true;
                            this.changeDetectorRef.detectChanges();
                        } else {
                            this.specificclientid = '';
                            this.utilities.isspecificClient = false;
                            this.changeDetectorRef.detectChanges();
                        }
                        if (
                            uData.role.id == 3 &&
                            uData.parent.id == this.specificclientid
                        ) {
                            this.userrole = "Sales Manager";
                            this.changeDetectorRef.detectChanges();
                        } else if (
                            uData.role.id == 9 &&
                            uData.parent.id == this.specificclientid
                        ) {
                            this.userrole = "Sales Representative";
                            this.changeDetectorRef.detectChanges();
                        } else if (
                            uData.role.id == 15 &&
                            uData.parent.id == this.specificclientid
                        ) {
                            this.userrole = "Master Electrician";
                            this.changeDetectorRef.detectChanges();
                        } else if (
                            uData.role.id == 6 &&
                            uData.parent.id == this.specificclientid
                        ) {
                            this.userrole = "Super Admin";
                            this.changeDetectorRef.detectChanges();
                        } else if (
                            uData.role.id == 7 &&
                            uData.parent.id == this.specificclientid
                        ) {
                            this.userrole = "Admin";
                            this.changeDetectorRef.detectChanges();
                        } else {
                            this.userrole = uData.role.name;
                            this.changeDetectorRef.detectChanges();
                        }
                    } else {
                        this.utilities.isspecificClient = false;
                        this.changeDetectorRef.detectChanges();
                        if (uData.role.id == 10) {
                            this.userrole = "Analyst";
                            this.changeDetectorRef.detectChanges();
                        } else if (uData.role.id == 9) {
                            this.userrole = "Surveyor";
                            this.changeDetectorRef.detectChanges();
                        } else if (uData.role.id == 4 || uData.role.id == 6) {
                            this.userrole = "Super Admin";
                            this.changeDetectorRef.detectChanges();
                        } else if (uData.role.id == 5 || uData.role.id == 7) {
                            this.userrole = "Admin";
                            this.changeDetectorRef.detectChanges();
                        } else if (uData.role.id == 3) {
                            this.userrole = "Design Manager";
                            this.changeDetectorRef.detectChanges();
                        } else {
                            this.userrole = uData.role.name;
                            this.changeDetectorRef.detectChanges();
                        }
                    }
                },
                error => {
                    //this.notifyService.showError(error, "Error");
                }
            );
        }
    }

    getUserAccessRights(userId) {
        console.log("getUserAccessRights userId",userId)

        this.getuser_one = this.storageService.getUser();
        console.log('this.getuser_one', this.getuser_one);

        this.sourceType = this.getuser_one.userprofile.source;
        // console.log("this.sourceType",this.sourceType)
        this.accessRightCount = this.accessRightCount + 1;
        // console.log(userId);
        this.apiservice.getUserAccessRights(userId).subscribe(

            
            (response: any) => {
                console.log("response",response);
                
                this.getUserAccessRightsData = response
                console.log(this.getUserAccessRightsData);
                
                // this.accessrightData = this.getUserAccessRightsData['data'][0]['attributes'].accessrights
                // console.log( this.getUserAccessRightsData[0].attributes.accessrights)
                localStorage.setItem('userAccessRights', JSON.stringify(this.getUserAccessRightsData));
                this.changeDetectorRef.detectChanges();
                this.changeDetectorRef.markForCheck();
            },
            error => {
                //this.notifyService.showError(error, "Error");
            }
        );
    }

    SwitchMenuAccordingtoRoles(type) {
        if (this.userData.role.type !== 'designer' && this.userData.role.type !== 'qcinspector' && type == 'prelim') {
            if (this.userData.role.type == 'wattmonkadmins' || this.userData.role.type == 'superadmin') {
                this.changeDetectorRef.detectChanges();
                this.newprelimsRef.update({ count: 0 });
            }
            this.router.navigate(['/home/design']);
        } else if (this.userData.role.type == 'designer' && type == 'prelim') {
            this.router.navigate(['/design-overview/new-design']);
        } else if (this.userData.role.type == 'qcinspector' && type == 'prelim') {
            this.router.navigate(['/analyst-overview/design']);
        } else if (
            this.userData.role.type !== 'designer' &&
            this.userData.role.type !== 'qcinspector' &&
            type == 'permit'
        ) {
            if (this.userData.role.type == 'wattmonkadmins' || this.userData.role.type == 'superadmin') {
                this.changeDetectorRef.detectChanges();
                this.newpermitsRef.update({ count: 0 });
            }
            this.router.navigate(['/permit-home/permit-design']);
        } else if (this.userData.role.type == 'designer' && type == 'permit') {
            this.router.navigate(['/permit-design-overview/permit-new-design']);
        } else if (this.userData.role.type == 'qcinspector' && type == 'permit') {
            this.router.navigate(['/analyst-overview/permit-design']);
        } else if (
            this.userData.role.type !== 'designer' &&
            this.userData.role.type !== 'qcinspector' &&
            type == 'survey'
        ) {
            this.userData.role.type == 'surveyors' ? this.router.navigate(['surveyor-overview']) : this.router.navigate(['/home/survey']);
        } else if (type == 'pestamp') {
            if (this.userData.role.type == 'peengineer') {
                this.router.navigate(['/peengineer']);
                //this.router.navigate(['/coming-soon']);
            } else {
                if (this.userData.role.type == 'wattmonkadmins' || this.userData.role.type == 'superadmin') {
                    this.changeDetectorRef.detectChanges();
                    this.newpestampRef.update({ count: 0 });
                }
                this.router.navigate(['/pestamp-home']);
            }
        } else if (this.userData.role.type == 'qcinspector' && type == 'survey') {
            this.router.navigate(['/analyst-overview/survey']);
        } else if (this.userData.role.type !== 'clientsuperadmin' && type == 'statistics') {
            this.router.navigate(['/statistics']);
        } else if (this.userData.role.type !== 'designer' && this.userData.role.type !== 'qcinspector' && this.userData.role.type !== 'peengineer' && type == 'team') {
            this.router.navigate(['/team-home']);
        } else if (this.userData.role.type !== 'designer' && this.userData.role.type !== 'qcinspector' && this.userData.role.type !== 'peengineer' && type == 'client') {
            this.router.navigate(['/client-home']);
        } else if (this.userData.role.type !== 'designer' && this.userData.role.type !== 'qcinspector' && this.userData.role.type !== 'peengineer' && type == 'report') {
            this.router.navigate(['/coming-soon']);
        }
    }

    updateApp() {
        setTimeout(() => {
            alert("hello")
        }, 2000)
    }

    openMenu() {
        if (this.user.usertype == 'individual') {
            this.menuCtrl.close();
        }
        else { }
    }

    setupCometChat(): Observable<any> {
        const appSetting = new CometChat.AppSettingsBuilder()
            .subscribePresenceForAllUsers()
            .setRegion(COMETCHAT_CONSTANTS.REGION)
            .build();

        return from(CometChat.init(COMETCHAT_CONSTANTS.APP_ID, appSetting).then(
            () => {
                if (this.storageService.getUserID() !== '') {
                    this.utilities.doCometUserLogin();
                }
            },
            (error) => {

            }
        ));
    }

    ngOndestroy() {
        this.deactivateGetUserData.unsubscribe();
        this.deactivateNetworkSwitch.unsubscribe();
    }

    updateMenuState() {
        this.userData = this.storageService.getUser();
    }
    ionViewWillEnter(){
        this.updateMenuState();
    }

    // notification redirect when click on it
    notificationRedirect(data): void {
        if (this.isTapNotification) {
            let getMsgData: any;
            console.log('getMsgData', getMsgData);
            if (data.message) {
                getMsgData = JSON.parse(data.message);
            } else {
                getMsgData = data;
            }

            if (data.message && getMsgData.category == 'message') {
                let objToSend: NavigationExtras = {
                    queryParams: {
                        name: data.title,
                        guid: getMsgData.receiver
                    },
                    skipLocationChange: false,
                    fragment: 'top'
                };

                this.router.navigate(['chat/' + getMsgData.receiver], {
                    state: { productdetails: objToSend }
                });
            } else if (getMsgData.type === 'sales-proposal') {
                let id = parseInt(getMsgData.recordid);
                this.utilities.setRequestType('prelim');
                this.router.navigate(['/master-details/prelim-details/' + id]);
            } else if (getMsgData.type === 'permit') {
                let id = parseInt(getMsgData.recordid);
                this.utilities.setRequestType('permit');
                this.router.navigate(['/master-details/permit-details/' + id]);
            } else if (getMsgData.type === 'pestamp') {
                let id = parseInt(getMsgData.recordid);
                this.utilities.setRequestType('pestamp');
                this.router.navigate(['/master-details/pestamp-details/' + id]);
            } else if (getMsgData.type === 'survey') {
                let id = parseInt(getMsgData.recordid);
                this.utilities.setRequestType('survey');
                this.router.navigate(['/master-details/survey-details/' + id]);
            }

            this.isTapNotification = false;
        }

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

    dismissBottomSheet() {
        this.showBottomDraw = false;
        this.enableDisable = false;
        this.drawerState = DrawerState.Bottom;
        this.utilities.setBottomBarHomepage(true);
    }

    async logout() {
        this.mix.track("SIGNOUT", {
            $id: this.user.id,
            $email: this.user.email,
            $name: this.user.firstname + this.user.lastname
        });
        this.enableDisable = true;
        //this.showBottomDraw = true;

        this.changeDetectorRef.detectChanges();

        console.log("hello")
        const modal = await this.modalController.create({
            component: LogoutPage,
            cssClass: 'small-modal logout-modal',
            mode: 'md',
            backdropDismiss: false,
            showBackdrop: true,
        });
        modal.onDidDismiss().then((data) => {
            console.log('filter data', data)

        })
        return await modal.present();
    }

    log_ou() {
        this.utilities.showLoading('Logging Out').then(() => {
            let data: any = {
                userid: JSON.parse(this.storageService.getUserID()),
                pushtoken: this.storageService.getPushToken()
            }

            console.log('data', data);

            this.apiservice.updatePushToken(data).subscribe((success) => {
                console.log('success', success);
            }, (error) => {
                console.log('error', error);
            });

            CometChat.logout().then(() => {
                this.utilities.hideLoading().then(() => {
                    this.storageService.logout();
                    this.deviceStorage.remove('pvsurveyjson');
                    this.deviceStorage.remove('uploadSurveyUsingMobileNetwork');
                    // this.deviceStorage.clear();
                    this.apiservice.resetHeaders();
                    this.navController.navigateRoot('login');
                })
            }, err => {
                this.storageService.logout();
                this.deviceStorage.remove('pvsurveyjson');
                this.deviceStorage.remove('uploadSurveyUsingMobileNetwork');
                // this.deviceStorage.clear();
                this.apiservice.resetHeaders();
                this.utilities.hideLoading();
                this.navController.navigateRoot('login');
            });
            this.showBottomDraw = false;

        }, err => {
            this.showBottomDraw = false;

            this.utilities.hideLoading();
        })
    }

    menu_active(type) {
        console.log('hy' + type);
    }
}