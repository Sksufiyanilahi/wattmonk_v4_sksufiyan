import {ChangeDetectorRef, Component} from '@angular/core';

import {NavController, Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {StorageService} from './storage.service';
import {ApiService} from './api.service';
import {UtilitiesService} from './utilities.service';
import {CometChat} from '@cometchat-pro/cordova-ionic-chat';
import {Firebase} from '@ionic-native/firebase/ngx';
import {NetworkdetectService} from './networkdetect.service';
import {COMETCHAT_CONSTANTS} from './contants';
import {UserData} from './model/userData.model';
import {from, Observable, Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {AngularFireDatabase, AngularFireObject} from '@angular/fire/database';
import {MixpanelService} from './utilities/mixpanel.service';
import {BackgroundMode} from "@ionic-native/background-mode/ngx";

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {
    homeimage: any;
    public selectedIndex = 0;
    public appPages = [
        {
            title: 'Home',
            url: '/homepage/design'
            //icon: 'home'
        },
        {
            title: 'Statistics',
            url: '/statistics'
            //icon: 'statistic'
        }
    ];
    user: any;
    ischatuserloggedin = false;
    public onlineOffline: boolean = navigator.onLine;
    netSwitch: boolean;
    retryattempt = 2;
    totalcountsforallgroups: number;
    firebaseToken: string;
    userData: UserData;
    deactivateGetUserData: Subscription;
    deactivateNetworkSwitch: Subscription;
    newprelims: Observable<any>;
    newprelimsRef: AngularFireObject<any>;
    //newprelimsRef:any;
    newprelimscounts = 0;
    newpermits: Observable<any>;
    newpermitsRef: AngularFireObject<any>;
    //newpermitsRef:any;
    newpermitscounts = 0;
    //for pestamp badges
    newpestamp: Observable<any>;
    newpestampRef: AngularFireObject<any>;
    newpestampscount = 0;

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private storageService: StorageService,
        private navController: NavController,
        // private fcm: FCM,
        private apiservice: ApiService,
        private utilitiesService: UtilitiesService,
        private firebase: Firebase,
        private utilities: UtilitiesService,
        private network: NetworkdetectService,
        private router: Router,
        private db: AngularFireDatabase,
        private changeDetectorRef: ChangeDetectorRef,
        private mix: MixpanelService,
        private backgroundMode: BackgroundMode
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
                console.log(res);
                this.newprelimscounts = res.count;
                console.log(this.newprelimscounts);
                changeDetectorRef.detectChanges();
            },
            (err) => console.log(err),
            () => console.log('done!')
        );
        this.newpermitsRef = db.object('newpermitdesigns');
        this.newpermits = this.newpermitsRef.valueChanges();
        this.newpermits.subscribe(
            (res) => {
                this.newpermitscounts = res.count;
                changeDetectorRef.detectChanges();
            },
            (err) => console.log(err),
            () => console.log('done!')
        );

        //For Pestamp Badges
        this.newpestampRef = db.object('newpestamp');
        this.newpestamp = this.newpestampRef.valueChanges();
        this.newpestamp.subscribe(
            (res) => {
                this.newpestampscount = res.count;
                console.log(res.count);
                changeDetectorRef.detectChanges();
            },
            (err) => console.log(err),
            () => console.log('done!')
        );
        // this.db.doc('/newprelimdesigns/1').valueChanges().subscribe((res:any)=>{
        //   this.newprelimscounts = res;
        //   console.log(this.newprelimscounts)
        // })
    }

    initializeApp() {
        this.platform.ready().then(() => {
            setTimeout(() => {
                this.splashScreen.hide();
            }, 1000);
            this.getFcmToken();
            if (this.platform.is('ios')) {
                this.statusBar.overlaysWebView(false);
                this.statusBar.backgroundColorByHexString('#fffff');
                this.statusBar.styleDefault();
            } else if (this.platform.is('android')) {
                this.statusBar.overlaysWebView(false);
                this.statusBar.styleDefault();
                this.statusBar.backgroundColorByHexString('#fffff');
                this.statusBar.styleLightContent();
            } else {
            }

            this.getNotification();
            this.setupCometChat();
            this.mix.initializeMixPanel();
			this.backgroundMode.enable();
        });
    }

    isEmptyObject(obj) {
        return obj && Object.keys(obj).length === 0;
    }

    ngOnInit() {
        this.deactivateNetworkSwitch = this.network.networkSwitch.subscribe((data) => {
            this.netSwitch = data;
            console.log(this.netSwitch);
        });

        this.network.networkDisconnect();
        this.network.networkConnect();

        if (this.storageService.isUserPresent()) {
            this.apiservice.refreshHeader();
            this.user = JSON.parse(localStorage.getItem('user'));
            // console.log("???",this.user.role);
            console.log(this.user.role.type);

            if (this.user.role.type == 'surveyors') {
                this.navController.navigateRoot('surveyoroverview');
            } else if (this.user.role.type == 'designer') {
                this.navController.navigateRoot('permitdesignoverview');
            } else if (this.user.role.type === 'qcinspector') {
                console.log(this.user.role.type);
                this.navController.navigateRoot('analystoverview');
            } else if (
                this.user.role.type === 'clientsuperadmin' &&
                (this.user.isonboardingcompleted === null || this.user.isonboardingcompleted === false)
            ) {
                this.navController.navigateRoot('onboarding');
            } else if (this.user.role.type === 'peengineer') {
                this.navController.navigateRoot('peengineer');
            } else {
                this.navController.navigateRoot('permithomepage');
            }
        }
        const path = window.location.pathname.split('/')[1];
        console.log(path);
        if (path !== undefined) {
            this.selectedIndex = this.appPages.findIndex((page) => page.title.toLowerCase() === path.toLowerCase());
        }

        this.deactivateGetUserData = this.apiservice.getUserName().subscribe((res: any) => {
            this.userData = res;
            debugger;
            if (res.role.name == 'ContractorSuperAdmin') {
                this.userData.role.name = 'SuperAdmin';
            } else if (res.role.name == 'WattmonkAdmin') {
                this.userData.role.name = 'Admin';
            }
        });
    }

    SwitchMenuAccordingtoRoles(type) {
        if (this.userData.role.type !== 'designer' && this.userData.role.type !== 'qcinspector' && type == 'prelim') {
            if (this.userData.role.type == 'wattmonkadmins' || this.userData.role.type == 'superadmin') {
                this.changeDetectorRef.detectChanges();
                this.newprelimsRef.update({count: 0});
            }
            this.router.navigate(['/homepage/design']);
        } else if (this.userData.role.type == 'designer' && type == 'prelim') {
            this.router.navigate(['/designoverview/newdesigns']);
        } else if (this.userData.role.type == 'qcinspector' && type == 'prelim') {
            this.router.navigate(['/analystoverview/design']);
        } else if (
            this.userData.role.type !== 'designer' &&
            this.userData.role.type !== 'qcinspector' &&
            type == 'permit'
        ) {
            if (this.userData.role.type == 'wattmonkadmins' || this.userData.role.type == 'superadmin') {
                this.changeDetectorRef.detectChanges();
                this.newpermitsRef.update({count: 0});
            }
            this.router.navigate(['/permithomepage/permitdesign']);
        } else if (this.userData.role.type == 'designer' && type == 'permit') {
            this.router.navigate(['/permitdesignoverview/permitnewdesign']);
        } else if (this.userData.role.type == 'qcinspector' && type == 'permit') {
            this.router.navigate(['/analystoverview/permitdesign']);
        } else if (
            this.userData.role.type !== 'designer' &&
            this.userData.role.type !== 'qcinspector' &&
            type == 'survey'
        ) {
            this.router.navigate(['/homepage/survey']);
        } else if (type == 'pestamp') {
            debugger;
            if (this.userData.role.type == 'peengineer') {
                this.router.navigate(['/peengineer']);
                //this.router.navigate(['/comingsoon']);
            } else {
                if (this.userData.role.type == 'wattmonkadmins' || this.userData.role.type == 'superadmin') {
                    this.changeDetectorRef.detectChanges();
                    this.newpestampRef.update({count: 0});
                }
                this.router.navigate(['/pestamp-homepage']);
                //this.router.navigate(['/comingsoon'])
            }
        } else if (this.userData.role.type == 'qcinspector' && type == 'survey') {
            this.router.navigate(['/analystoverview/survey']);
        } else if (this.userData.role.type !== 'clientsuperadmin') {
            this.router.navigate(['/statistics']);
        }
    }

    getFcmToken() {
        this.firebase
            .getToken()
            .then((token) => {
                console.log(`The token is ${token}`);
                this.firebaseToken = token;
                localStorage.setItem('pushtoken', token);
            })
            .catch((error) => {
                //  console.error('Error getting token', error)
            });
    }


    updateApp() {
        setTimeout(() => {
            alert("hello")
        }, 2000)
    }

    getNotification() {
        this.firebase.onNotificationOpen().subscribe((data) => {
            console.log(`User opened a notification ${data}`, data);
            this.apiservice.emitMessageReceived('pushNotification');
        });
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
                console.log('Initialization completed successfully');
                // if(this.utilities.currentUserValue != null){
                // You can now call login function.

                // }
            },
            (error) => {
                console.log('Initialization failed with error:', error);
            }
        ));
    }

    ngOndestroy() {
        this.deactivateGetUserData.unsubscribe();
        this.deactivateNetworkSwitch.unsubscribe();
    }
}
