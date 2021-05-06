import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CometChat } from '@cometchat-pro/cordova-ionic-chat';
import { StorageService } from '../storage.service';
import { COMET_CHAT_AUTH_KEY, COMET_CHAT_APP_ID, COMET_CHAT_REGION } from '../model/constants';
import { ApiService } from '../api.service';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { UtilitiesService } from '../utilities.service';
import { Platform } from '@ionic/angular';
import { NetworkdetectService } from '../networkdetect.service';
import { User } from '../model/user.model';
import { UserData } from '../model/userData.model';
import { COMETCHAT_CONSTANTS } from '../constants';
import { Appversion } from '../appversion';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-surveyoroverview',
  templateUrl: './surveyoroverview.page.html',
  styleUrls: ['./surveyoroverview.page.scss'],
})
export class SurveyoroverviewPage implements OnInit {
  private version = Appversion.version;
  private subscription: Subscription;
  update_version: string;
  netSwitch: any;
  showSearchBar = false;
  userData: UserData;
  deactivateNetworkSwitch: Subscription;
  unreadCount: Object;


  constructor(public route: Router,
    private storage: StorageService,
    private apiService: ApiService,
    private utilities: UtilitiesService,
    private platform: Platform,
    private iab: InAppBrowser,
    private network: NetworkdetectService,
    private datastorage: Storage) { }

  ngOnInit() {
    this.fetchsurveyprocessjsons();
    this.userData = this.storage.getUser();
    this.apiService.version.subscribe(versionInfo => {
      this.update_version = versionInfo;
    })
    this.apiService.emitUserNameAndRole(this.userData);
    this.setupCometChat();
    this.updateUserPushToken();
    this.getNotificationCount();
    this.route.navigate(['surveyoroverview/newsurveys']);
  }

  searchbar() {
    this.route.navigate(['/search-bar1']);
  }

  fetchsurveyprocessjsons() {
    this.datastorage.get('pvsurveyjson').then((data) => {
      console.log(data);
      if (!data) {
        this.apiService.fetchJSON(this.storage.getParentId(), 'pv').subscribe((response: any) => {
          console.log(response);
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

}
