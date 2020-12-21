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
import { COMETCHAT_CONSTANTS, intercomId } from '../contants';
import { Intercom } from 'ng-intercom';


@Component({
  selector: 'app-designoverview',
  templateUrl: './designoverview.page.html',
  styleUrls: ['./designoverview.page.scss'],
})
export class DesignoverviewPage implements OnInit {
  private version = environment.version;
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
    private router:ActivatedRoute,
    private intercom : Intercom
    ) { 
      this.intercomModule();
      let data = localStorage.getItem('type');
      console.log(data,"dataa");
    }

  ngOnInit() {
    // this.intercom.update({
    //   "hide_default_launcher": true
    // });
    
    this.userData = this.storage.getUser();
    this.apiService.emitUserNameAndRole(this.userData);
    this.apiService.version.subscribe(versionInfo=>{
      this.update_version = versionInfo;
    })
    this.getNotificationCount();
    this.setupCometChat();
    this.updateUserPushToken();
    this.route.navigate(['designoverview/newdesigns']);
  }

  intercomModule(){
    this.intercom.boot({
      app_id: intercomId,
      // Supports all optional configuration.
      widget: {
        "activator": "#intercom"
      }
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
        console.log('Initialization completed successfully');
        // if(this.utilities.currentUserValue != null){
          // You can now call login function.
          CometChat.login(userId,  COMETCHAT_CONSTANTS.API_KEY).then(
            (user) => {
              console.log('Login Successful:', { user });
            },
            error => {
              console.log('Login failed with exception:', { error });
            }
          );
      // }
      },
      error => {
        console.log('Initialization failed with error:', error);
      }
    );
  }

  updateUserPushToken(){
  let token=   localStorage.getItem('pushtoken');
  console.log(token);
  let userid= this.storage.getUserID();
  let tokendata={
    pushtokens:token
  }
    this.apiService.pushtoken(userid, {"newpushtoken":token}).subscribe((data) => {
    console.log(data, "fcm data");
    
    }, (error) => {
    });
  }
  
  getDesigns(event: CustomEvent) {
    
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
    console.log(data)
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
    this.utilities.showHideIntercom(false);
    console.log(this.netSwitch);
    
  })

this.network.networkDisconnect();
this.network.networkConnect();
  this.subscription = this.platform.backButton.subscribe(() => {
    if (this.showSearchBar === true) {
      this.showSearchBar = false;
    } else {
      (navigator as any).app.exitApp();
    }
  });
}

getNotificationCount(){
  this.apiService.getCountOfUnreadNotifications().subscribe( (count)=>{
    console.log("count",count);
   this.unreadCount= count;
  });

 
}

setzero(){
  this.unreadCount= 0;
}

ionViewWillLeave(){
  this.intercom.update({
    "hide_default_launcher": true
  });
}
}
