import { Component } from '@angular/core';

import { NavController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { StorageService } from './storage.service';
import { FCM } from '@ionic-native/fcm/ngx';
import { ApiService } from './api.service';
import { UtilitiesService } from './utilities.service';

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
    private fcm: FCM,
    private apiservice: ApiService,
    private utilitiesService: UtilitiesService,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.getFcmToken();
      this.getNotification();
    });
    if (this.storageService.isUserPresent()) {
      this.apiservice.refreshHeader();
      this.navController.navigateRoot('homepage');
    }
  }

  getFcmToken() {
    this.fcm.getToken().then(token => {
      console.log(token);
    });
  }

  getNotification() {
    this.fcm.onNotification().subscribe(data => {
      console.log(data);
      if (data.wasTapped) {
        console.log('Received in background');
      } else {
        console.log('Received in foreground');
      }
    });
  }

}
