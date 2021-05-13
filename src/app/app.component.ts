import {ChangeDetectorRef, Component} from '@angular/core';

import {AlertController, NavController, Platform, MenuController} from '@ionic/angular';
import {StorageService} from './storage.service';
import {ApiService} from './api.service';
import {UtilitiesService} from './utilities.service';
import {CometChat} from '@cometchat-pro/cordova-ionic-chat';
import {FirebaseX} from '@ionic-native/firebase-x/ngx';
import {NetworkdetectService} from './networkdetect.service';
import {COMETCHAT_CONSTANTS} from './contants';
import {UserData} from './model/userData.model';
import {from, Observable, Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {AngularFireDatabase, AngularFireObject} from '@angular/fire/database';
import {MixpanelService} from './utilities/mixpanel.service';
import {BackgroundMode} from '@ionic-native/background-mode/ngx';
import {Plugins, StatusBarStyle, PushNotification, PushNotificationToken, PushNotificationActionPerformed} from '@capacitor/core';

const {StatusBar, SplashScreen, PushNotifications} = Plugins;

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
  getclientsrole:any;
  userrole:string;
  specificclientid: any;
  joyrideTitle="Design"
  joyridetext ="Consolidated dashboard for all your  design requests with real-time status tracking."

  constructor(
    private platform: Platform,
    private storageService: StorageService,
    private navController: NavController,
    // private fcm: FCM,
    private apiservice: ApiService,
    private utilitiesService: UtilitiesService,
    private firebase: FirebaseX,
    public utilities: UtilitiesService,
    private network: NetworkdetectService,
    private router: Router,
    private db: AngularFireDatabase,
    public menuCtrl: MenuController,
    private changeDetectorRef: ChangeDetectorRef,
    private mix: MixpanelService,
    private backgroundMode: BackgroundMode,
    private alertController: AlertController,
    public menu : MenuController
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

        changeDetectorRef.detectChanges();
      },
      


    );
    this.newpermitsRef = db.object('newpermitdesigns');
    this.newpermits = this.newpermitsRef.valueChanges();
    this.newpermits.subscribe(
      (res) => {
        this.newpermitscounts = res.count;
        changeDetectorRef.detectChanges();
      },


    );

    //For Pestamp Badges
    this.newpestampRef = db.object('newpestamp');
    this.newpestamp = this.newpestampRef.valueChanges();
    this.newpestamp.subscribe(
      (res) => {
        this.newpestampscount = res.count;

        changeDetectorRef.detectChanges();
      },


    );
    // this.db.doc('/newprelimdesigns/1').valueChanges().subscribe((res:any)=>{
    //   this.newprelimscounts = res;

    // })
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.getFcmToken();
      this.handleBackbutton();
      this.getNotification();
      this.utilities.setupCometChat();
      this.mix.initializeMixPanel();
      this.backgroundMode.enable();
      if (this.user !== null || this.user !== '') {
        this.registerAPNS();
      }
      SplashScreen.hide();
      StatusBar.setStyle({
        style: StatusBarStyle.Light
      });
      StatusBar.setOverlaysWebView({
        overlay: true
      });
      // StatusBar.hide();
    });
  }

  registerAPNS() {
    console.log("Inside register");
    PushNotifications.requestPermission().then(result => {
      if (result.granted) {
        PushNotifications.register();
      }
    });

    PushNotifications.addListener('registration',
      (token: PushNotificationToken) => {
        localStorage.setItem('pushtoken', token.value);
        console.log('Push registration success, token: ' + token.value);
        this.apiservice.pushtoken(this.user.id, {newpushtoken: localStorage.getItem('pushtoken')});
      }
    );

    PushNotifications.addListener('registrationError',
      (error: any) => {

      }
    );

    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotification) => {

      }
    );

    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: PushNotificationActionPerformed) => {

      }
    );
  }

  isEmptyObject(obj) {
    return obj && Object.keys(obj).length === 0;
  }

  ngOnInit() {
    this.deactivateNetworkSwitch = this.network.networkSwitch.subscribe((data) => {
      this.netSwitch = data;

    });

    this.network.networkDisconnect();
    this.network.networkConnect();

    if (this.storageService.isUserPresent()) {
      this.apiservice.refreshHeader();
      this.user = JSON.parse(localStorage.getItem('user'));



      if (this.user.role.type == 'surveyors') {
        this.navController.navigateRoot('surveyoroverview');
      } else if (this.user.role.type == 'designer') {
        this.navController.navigateRoot('permitdesignoverview');
      } else if (this.user.role.type === 'qcinspector') {

        this.navController.navigateRoot('analystoverview');
      } else if (
        this.user.role.type === 'clientsuperadmin' &&
        (this.user.isonboardingcompleted === null || this.user.isonboardingcompleted === false)
      ) {
        this.navController.navigateRoot('onboarding');
      } else if (this.user.role.type === 'peengineer') {
        this.navController.navigateRoot('peengineer');
      } else {
        if (this.user.role.type === 'clientsuperadmin' || this.user.role.type === 'wattmonkadmins') {
          this.navController.navigateRoot('dashboard');
        } else {
          this.navController.navigateRoot('permithomepage');
        }
      }
    }
    const path = window.location.pathname.split('/')[1];

    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex((page) => page.title.toLowerCase() === path.toLowerCase());
    }

    this.deactivateGetUserData = this.apiservice.getUserName().subscribe((res: any) => {
      console.log(res)
      this.userData = res;
      if (res.role.name == 'ContractorSuperAdmin') {
        this.userData.role.name = 'SuperAdmin';
      } else if (res.role.name == 'WattmonkAdmin') {
        this.userData.role.name = 'Admin';
      }
      this.getClientRole();
    });

  }

  getClientRole(){
    let parentId = this.userData.parent.id;
    let roleId = this.userData.role.id;
    console.log(parentId,roleId)
  this.apiservice.getDynamicRoles(parentId,roleId).subscribe(
    (response:any) => {
      console.log(this.userData)
      console.log(response)
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
          this.userData.role.id == 3 &&
          this.userData.parent.id == this.specificclientid
        ) {
          this.userrole = "Sales Manager";
        } else if (
          this.userData.role.id == 9 &&
          this.userData.parent.id == this.specificclientid
        ) {
          this.userrole = "Sales Representative";
        } else if (
          this.userData.role.id == 15 &&
          this.userData.parent.id == this.specificclientid
        ) {
          this.userrole = "Master Electrician";
        } else if (
          this.userData.role.id == 6 &&
          this.userData.parent.id == this.specificclientid
        ) {
          this.userrole = "Super Admin";
        } else if (
          this.userData.role.id == 7 &&
          this.userData.parent.id == this.specificclientid
        ) {
          this.userrole = "Admin";
        } else {
          this.userrole = this.userData.role.name;
        }
      } else {
        this.utilities.isspecificClient = false;
        this.changeDetectorRef.detectChanges();
        if (this.userData.role.id == 10) {
          this.userrole = "Analyst";
        } else if (this.userData.role.id == 9) {
          this.userrole = "Surveyor";
        } else if (this.userData.role.id == 4 || this.userData.role.id == 6) {
          this.userrole = "Super Admin";
        } else if (this.userData.role.id == 5 || this.userData.role.id == 7) {
          this.userrole = "Admin";
        } else if (this.userData.role.id == 3) {
          this.userrole = "Design Manager";
        } else {
          this.userrole = this.userData.role.name;
        }
      }
      console.log(this.userrole);
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
    } else if (this.userData.role.type !== 'clientsuperadmin' && type == 'statistics') {
      this.router.navigate(['/statistics']);
    } else if (this.userData.role.type !== 'designer' && this.userData.role.type !== 'qcinspector' && this.userData.role.type !== 'peengineer' && type == 'team') {
      this.router.navigate(['/teamhomepage'])
    }
    else if (this.userData.role.type !== 'designer' && this.userData.role.type !== 'qcinspector' && this.userData.role.type !== 'peengineer' && type == 'client') {
      this.router.navigate(['/clienthomepage'])
    }
  }

  getFcmToken() {
    this.firebase
      .getToken()
      .then((token) => {

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
    this.firebase.onMessageReceived().subscribe((data) => {

      this.apiservice.emitMessageReceived('pushNotification');
    });
  }
  openMenu(){
    if(this.user.usertype=='individual'){
      this.menu.close();
    }
    else{}
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

        // if(this.utilities.currentUserValue != null){
        // You can now call login function.

        // }
      },
      (error) => {

      }
    ));
  }

  ngOndestroy() {
    this.deactivateGetUserData.unsubscribe();
    this.deactivateNetworkSwitch.unsubscribe();
  }

  handleBackbutton() {
    // this.platform.backButton.subscribeWithPriority(10, () => {

    //     this.alertController.getTop().then(r => {
    //       if (r) {
    //         navigator['app'].exitApp();
    //       }
    //     }).catch(e => {

    //     })
    //   });
  }

  updateMenuState() {

    this.userData = this.storageService.getUser();
    // this.apiservice.emitUserNameAndRole(this.userData);
  }
}
