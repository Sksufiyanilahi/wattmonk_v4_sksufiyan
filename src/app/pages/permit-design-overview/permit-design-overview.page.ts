import { Component, OnInit, Input } from '@angular/core';
import { CometChat } from '@cometchat-pro/cordova-ionic-chat';
import { StorageService } from 'src/app/services/storage/storage.service';
import { COMET_CHAT_AUTH_KEY, COMET_CHAT_APP_ID, COMET_CHAT_REGION } from 'src/app/models/constants';
import { ApiService } from 'src/app/services/api/api.service';

import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { EmailModelPage } from '../email-model/email-model.page';
import { MenuController, ModalController, Platform } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { NetworkDetectService } from 'src/app/services/network-detect/network-detect.service';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { UserData } from 'src/app/models/userData.model';
import { COMETCHAT_CONSTANTS } from 'src/app/services/constants';

import { Appversion } from 'src/app/services/appversion';
import { permitCounts } from 'src/app/models/design.model';
import { CustomEventsService } from 'src/app/services/custom-events/custom-events.service';
@Component({
  selector: 'app-permit-design-overview',
  templateUrl: './permit-design-overview.page.html',
  styleUrls: ['./permit-design-overview.page.scss'],
})

export class PermitDesignOverviewPage implements OnInit {

  private version = Appversion.version;
  private subscription: Subscription;
  update_version: string;
  netSwitch: any;
  showSearchBar = false;
  unreadCount: any;
  userData: UserData
  deactivateNetworkSwitch: Subscription;
  //showSearchBar = false;
  permitCounts: permitCounts = <permitCounts>{};
  public userAccessRights: any = {
      viewonly: true
  };

  constructor(public route: Router,
      private storage: StorageService,
      public modalController: ModalController,
      private apiService: ApiService,
      private socialSharing: SocialSharing,
      private utilities: UtilitiesService,
      private network: NetworkDetectService,
      private platform: Platform,
      private iab: InAppBrowser,
      private router: ActivatedRoute,
      private eventService: CustomEventsService
  ) {
      let data = localStorage.getItem('type');


      this.eventService.subscribe('foo:update-count', (data: any) => {
          console.log('data', data);
          if (data.isUpdateCount) {
              let userId = this.storage.getUserID();
              let requesttype = "permit"
              this.apiService.getPermitcounts(userId, requesttype).subscribe(res => {
                  console.log('getPermitcounts res', res);
                  this.permitCounts = res;
              })
          }
      });

  }

  ngOnInit() {
      this.userData = this.storage.getUser();
      let userId = this.storage.getUserID();
      let requesttype = "permit"

      this.apiService.getPermitcounts(userId, requesttype).subscribe(res => {
          console.log('getPermitcounts res', res);
        //   this.permitCounts = res;
      })

      this.apiService.emitUserNameAndRole(this.userData);
      this.apiService.version.subscribe(versionInfo => {
          this.update_version = versionInfo;
      })
      this.getNotificationCount();
      if (this.userData) {
          this.setupCometChatUser();
      }
      this.updateUserPushToken();
      this.route.navigate(['permit-design-overview/permit-new-design']);

      // get access right permission data
      setTimeout(() => {
          this.userAccessRights = this.utilities.getUserAccessRights('permit');
      }, 1000);
  }


  ngOnDestroy() {
      this.deactivateNetworkSwitch.unsubscribe();
  }

  setupCometChatUser() {
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
      let token = localStorage.getItem('pushtoken');

      let userid = this.storage.getUserID();
      let tokendata = {
          pushtokens: token
      }
      this.apiService.pushtoken(userid, { "newpushtoken": token }).subscribe((data) => {


      }, (error) => {
      });
  }

  getDesigns(event) {

      let showLoader = true;
      if (event != null && event !== undefined) {
          showLoader = false;
      }

  }

  shareWhatsapp(designData) {
      this.socialSharing.share(designData.prelimdesign.url);
  }

  searchbar() {
      this.route.navigate(['/search-bar']);
  }

  async shareViaEmails(id, designData) {
      const modal = await this.modalController.create({
          component: EmailModelPage,
          cssClass: 'email-modal-css',
          componentProps: {
              id: id,
              designData: designData
          },

      });
      modal.onDidDismiss().then((data) => {

          if (data.data.cancel == 'cancel') {
          } else {
              this.getDesigns(null)
          }
      });
      return await modal.present();
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

  getNotificationCount() {
      this.apiService.getCountOfUnreadNotifications().subscribe((count) => {

          this.unreadCount = count;
      });


  }

  setzero() {
      this.unreadCount = 0;
  }

  ionViewWillLeave() {
  }

  goToJobListing() {
      this.route.navigate(['/job-list']);
  }
}

