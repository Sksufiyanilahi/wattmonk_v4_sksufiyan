import { Component, OnInit, Input } from '@angular/core';
import { CometChat } from '@cometchat-pro/cordova-ionic-chat';
import { StorageService } from '../storage.service';
import { COMET_CHAT_AUTH_KEY, COMET_CHAT_APP_ID, COMET_CHAT_REGION } from '../model/constants';
import { ApiService } from '../api.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenType } from '@angular/compiler/src/ml_parser/lexer';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { EmailModelPage } from 'src/app/email-model/email-model.page';
import { MenuController, ModalController, Platform } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { UtilitiesService } from '../utilities.service';
import { NetworkdetectService } from '../networkdetect.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { UserData } from '../model/userData.model';
import { COMETCHAT_CONSTANTS } from '../constants';

import { Appversion } from '../appversion';

@Component({
  selector: 'app-permitdesignoverview',
  templateUrl: './permitdesignoverview.page.html',
  styleUrls: ['./permitdesignoverview.page.scss'],
})
export class PermitdesignoverviewPage implements OnInit {

  private version = Appversion.version;
  private subscription: Subscription;
  update_version: string;
  netSwitch:any;
  showSearchBar = false;
  unreadCount: any;
  userData: UserData
  deactivateNetworkSwitch: Subscription;
  //showSearchBar = false;


  constructor(public route: Router,
    private storage: StorageService,
    public modalController: ModalController,
    private apiService: ApiService,
    private socialSharing:SocialSharing,
    private utilities: UtilitiesService,
    private network: NetworkdetectService,
    private platform: Platform,
    private iab:InAppBrowser,
    private router:ActivatedRoute
    ) {
      let data = localStorage.getItem('type');

    }

  ngOnInit() {
    this.userData = this.storage.getUser();
    this.apiService.emitUserNameAndRole(this.userData);
    this.apiService.version.subscribe(versionInfo=>{
      this.update_version = versionInfo;
    })
    this.getNotificationCount();
    if(this.userData){
      this.setupCometChatUser();
    }
    this.updateUserPushToken();
    this.route.navigate(['permitdesignoverview/permitnewdesign']);
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
  this.route.navigate(['/search-bar1']);
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


  if(this.version !== this.update_version && this.update_version !==''){

    setTimeout(()=>{

      this.utilities.showAlertBox('Update App','New version of app is available on Play Store. Please update now to get latest features and bug fixes.',[{
        text:'Ok',

        handler:()=>{
          this.iab.create('https://play.google.com/store/apps/details?id=com.solar.wattmonk',"_system");
         this.ionViewDidEnter();
        }
      }]);
    },2000)
  }
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
  this.route.navigate(['/joblisting']);
}
}
