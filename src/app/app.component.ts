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

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storageService: StorageService,
    private navController: NavController,
    // private fcm: FCM,
    private apiservice: ApiService,
    private utilitiesService: UtilitiesService,
    private firebase: Firebase
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if(this.platform.is('ios')){
        this.statusBar.overlaysWebView(false);
        // this.statusBar.styleDefault();
        this.statusBar.backgroundColorByHexString("#666666");
      }else if(this.platform.is('android')){
        this.statusBar.styleDefault();
        this.statusBar.styleLightContent();
      }else{
      }
      this.splashScreen.hide();
      this.getFcmToken();
      this.getNotification();
      this.setupCometChat();
    });
    if (this.storageService.isUserPresent()) {
      this.apiservice.refreshHeader();
      this.navController.navigateRoot('homepage');
    }
  }

  getFcmToken() {
  this.firebase.getToken()
  .then(token => {
    console.log(`The token is ${token}`)})
  .catch(error => {
   console.error('Error getting token', error)});
  }

  getNotification() {
    this.firebase.onNotificationOpen()
   .subscribe(data => {
     console.log(`User opened a notification ${data}`)
    });

  }

  setupCometChat() {
    const appSetting = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(COMET_CHAT_REGION).build();
    CometChat.init(COMET_CHAT_APP_ID, appSetting).then(
      () => {
        console.log('Initialization completed successfully');
      },
      error => {
        console.log('Initialization failed with error:', error);
      }
    );
  }

}
