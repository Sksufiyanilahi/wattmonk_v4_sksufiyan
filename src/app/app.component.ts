import { Component } from '@angular/core';

import { NavController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { StorageService } from './storage.service';
// import { FCM } from '@ionic-native/fcm/ngx';
import { ApiService } from './api.service';
import { UtilitiesService } from './utilities.service';
import { CometChat } from '@cometchat-pro/cordova-ionic-chat';
import { COMET_CHAT_APP_ID, COMET_CHAT_REGION } from './model/constants';
import { Firebase } from '@ionic-native/firebase/ngx';
import { NetworkdetectService } from './networkdetect.service';
import { ROLES,COMETCHAT_CONSTANTS } from './contants';
import { UserData } from './model/userData.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  homeimage:any;
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Home',
      url: '/homepage/design',
      //icon: 'home'
    },
    {
      title: 'Statistics',
      url: '/statistics',
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
  userData:UserData;
  deactivateGetUserData: Subscription;
  deactivateNetworkSwitch: Subscription;

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
    private utilities:UtilitiesService,
    private network:NetworkdetectService
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
          setTimeout(()=>{
            this.utilities.errorSnackBar('No internet connection');
          },2000)
          });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      setTimeout(()=>{
        this.splashScreen.hide();
      },1000)
      this.getFcmToken();
      if(this.platform.is('ios')){
        this.statusBar.overlaysWebView(false);
        this.statusBar.backgroundColorByHexString("#fffff");
        this.statusBar.styleDefault();
      }else if(this.platform.is('android')){
        this.statusBar.overlaysWebView(false);
        this.statusBar.styleDefault();
        this.statusBar.backgroundColorByHexString("#fffff");
        this.statusBar.styleLightContent();
      }else{
      }
      
      this.getNotification();
      this.setupCometChat();
    });
  
  }

  ngOnInit() {
   this.deactivateNetworkSwitch=  this.network.networkSwitch.subscribe(data=>{
      this.netSwitch = data;
      console.log(this.netSwitch);
    })
    
    
this.network.networkDisconnect();
this.network.networkConnect();
 
    if (this.storageService.isUserPresent()) {
      this.apiservice.refreshHeader();
      this.user= JSON.parse(localStorage.getItem('user'));
      // console.log("???",this.user.role);
      console.log(this.user.role.type);
      
        if(this.user.role.type=='surveyors'){
          this.navController.navigateRoot('surveyoroverview');
        }else if(this.user.role.type=='designer'){
          this.navController.navigateRoot('permitdesignoverview');
        }else if(this.user.role.type==='qcinspector'){
          console.log(this.user.role.type);
          this.navController.navigateRoot('analystoverview');
          
        }
        else{
          this.navController.navigateRoot('permithomepage');
        }
    }
    const path = window.location.pathname.split('/')[1];
    console.log(path)
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }

   this.deactivateGetUserData=  this.apiservice.getUserName().subscribe((res:any)=>{
      this.userData = res;
      console.log(this.userData)
    })
    
  }

  getFcmToken() {
  this.firebase.getToken()
  .then(token => {
    console.log(`The token is ${token}`)
    this.firebaseToken= token;
    localStorage.setItem('pushtoken', token);
  })
  .catch(error => {
  //  console.error('Error getting token', error)
  });
  }

  getNotification() {
    this.firebase.onNotificationOpen()
   .subscribe(data => {
     console.log(`User opened a notification ${data}`,data)
     this.apiservice.emitMessageReceived("pushNotification");
    });

  }

  setupCometChat() {
    const appSetting = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(COMETCHAT_CONSTANTS.REGION).build();
    CometChat.init(COMETCHAT_CONSTANTS.APP_ID, appSetting).then(
      () => {
        console.log('Initialization completed successfully');
        // if(this.utilities.currentUserValue != null){
          // You can now call login function.
      
      // }
      },
      error => {
        console.log('Initialization failed with error:', error);
      }
    );
  }

  ngOndestroy(){
    this.deactivateGetUserData.unsubscribe();
    this.deactivateNetworkSwitch.unsubscribe();
  }

 

}
