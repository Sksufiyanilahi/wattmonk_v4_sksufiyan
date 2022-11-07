import { IonContent ,Platform,ModalController} from '@ionic/angular';
import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { DesginDataModel } from '../../models/design.model';
import { Subscription } from 'rxjs';
import { LaunchNavigator, LaunchNavigatorOptions } from '@awesome-cordova-plugins/launch-navigator/ngx';
import { DatePipe } from '@angular/common';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { ErrorModel } from 'src/app/models/error.model';
import { ApiService } from 'src/app/services/api/api.service';

// import { DesignStorageModel } from '../../model/Design-storage.model';
import { Storage } from '@ionic/storage';
import { DesginDataHelper } from '../home/design/design.component';
import * as moment from 'moment';
import { StorageService } from 'src/app/services/storage/storage.service';
import { CometChat } from '@cometchat-pro/cordova-ionic-chat';
import { CustomEventsService } from 'src/app/services/custom-events/custom-events.service';

import { COMET_CHAT_AUTH_KEY, COMET_CHAT_APP_ID, COMET_CHAT_REGION } from 'src/app/models/constants';
import { ActivatedRoute, Router } from '@angular/router';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { EmailModelPage } from 'src/app/pages/email-model/email-model.page';
import { environment } from 'src/environments/environment';
import { NetworkDetectService } from 'src/app/services/network-detect/network-detect.service';import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { UserData } from 'src/app/models/userData.model';
import { COMETCHAT_CONSTANTS } from 'src/app/services/constants';

import { Appversion } from 'src/app/services/appversion';
import { prelimCounts } from 'src/app/models/design.model';
@Component({
  selector: 'app-design-overview',
  templateUrl: './design-overview.page.html',
  styleUrls: ['./design-overview.page.scss'],
})

export class DesignOverviewPage implements OnInit {
  private subscription: Subscription;
  update_version: string;
  netSwitch:any;
  showSearchBar = false;
  unreadCount: any;
  userData: UserData
  deactivateNetworkSwitch: Subscription;
  //showSearchBar = false;
  prelimCounts: prelimCounts = <prelimCounts>{};
  public userAccessRights: any = {
    viewonly: true
};

  constructor(public route: Router,
    private storage: StorageService,
    public modalController: ModalController,
    private apiService: ApiService,
    private socialSharing:SocialSharing,
    private utilities: UtilitiesService,
    private network: NetworkDetectService,
    private platform: Platform,
    private iab:InAppBrowser,
    private router:ActivatedRoute, private eventService: CustomEventsService
    ) {

      let data = localStorage.getItem('type');


      this.eventService.subscribe('foo:update-count', (data: any) => {
        console.log('data', data);
        if (data.isUpdateCount) {
            let userId = this.storage.getUserID();
            let requesttype = "prelim"
            this.apiService.getPrelimcounts(userId, requesttype).subscribe(res => {
                console.log('getPermitcounts res', res);
                this.prelimCounts = res;
            })
        }
    });
      // get access right permission data
      setTimeout(() => {
        this.userAccessRights = this.utilities.getUserAccessRights('prelim');
      }, 1000);
    }

  ngOnInit() {

    this.userData = this.storage.getUser();
    let userId = this.storage.getUserID()
    let requesttype = "prelim"

    this.apiService.getPrelimcounts(userId, requesttype).subscribe(res => {
      this.prelimCounts = res;
    })





    this.apiService.emitUserNameAndRole(this.userData);
    this.apiService.version.subscribe(versionInfo=>{
      this.update_version = versionInfo;
    })
    this.getNotificationCount();
    this.setupCometChat();
    this.updateUserPushToken();
    this.route.navigate(['design-overview/new-design']);
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
          CometChat.login(userId,  COMETCHAT_CONSTANTS.API_KEY).then(
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

  updateUserPushToken(){
  let token=   localStorage.getItem('pushtoken');

  let userid= this.storage.getUserID();
  let tokendata={
    pushtokens:token
  }
    this.apiService.pushtoken(userid, {"newpushtoken":token}).subscribe((data) => {


    }, (error) => {
    });
  }

  getDesigns(event) {

    let showLoader = true;
    if (event != null && event !== undefined) {
      showLoader = false;
    }

  }

shareWhatsapp(designData){
  this.socialSharing.share(designData.prelimdesign.url);
}

searchbar(){
  this.route.navigate(['/search-bar']);
}

 async shareViaEmails(id,designData){
  const modal = await this.modalController.create({
    component: EmailModelPage,
    cssClass: 'email-modal-css',
    componentProps: {
      id:id,
      designData:designData
    },

  });
  modal.onDidDismiss().then((data) => {

    if(data.data.cancel=='cancel'){
    }else{
      this.getDesigns(null)
    }
});
    return await modal.present();
 }

 ionViewDidEnter() {



  this.deactivateNetworkSwitch = this.network.networkSwitch.subscribe(data=>{
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

getNotificationCount(){
  this.apiService.getCountOfUnreadNotifications().subscribe( (count)=>{

   this.unreadCount= count;
  });


}

setzero(){
  this.unreadCount= 0;
}

ionViewWillLeave(){
}

goToJobListing()
{
  this.route.navigate(['/job-list']);
}
}

