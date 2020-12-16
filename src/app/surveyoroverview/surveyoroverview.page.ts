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

@Component({
  selector: 'app-surveyoroverview',
  templateUrl: './surveyoroverview.page.html',
  styleUrls: ['./surveyoroverview.page.scss'],
})
export class SurveyoroverviewPage implements OnInit {
  private version = environment.version;
  private subscription: Subscription;
  update_version:string;
  netSwitch:any;
  showSearchBar=false;
  userData:UserData;


  constructor(public route: Router,
    private storage: StorageService,
    private apiService: ApiService,
    private utilities: UtilitiesService,
    private platform : Platform,
    private iab: InAppBrowser,
    private network: NetworkdetectService) { }

  ngOnInit() {
    this.userData = this.storage.getUser();
    this.apiService.version.subscribe(versionInfo=>{
      this.update_version = versionInfo;
    })
    this.apiService.emitUserNameAndRole(this.userData);
    this.setupCometChatUser();
    this.updateUserPushToken();
    this.route.navigate(['surveyoroverview/newsurveys']);
    
  }

  ngOnDestroy() {
  }

  setupCometChatUser() {
    const appSetting = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(COMET_CHAT_REGION).build();
    CometChat.init(COMET_CHAT_APP_ID, appSetting).then(
      () => {
        console.log('Initialization completed successfully');
        CometChat.login(this.storage.getUserID(), COMET_CHAT_AUTH_KEY).then(
          (user) => {
            console.log('Login Successful:', { user });
          },
          error => {
            console.log('Login failed with exception:', { error });
          }
        );
      },
      error => {
        console.log('Initialization failed with error:', error);
      }
    );
  }

  updateUserPushToken(){
    this.apiService.pushtoken(this.storage.getUserID(), {"newpushtoken":localStorage.getItem("pushtoken")}).subscribe((data) => {
    console.log(data, "fcm data");
    
    }, (error) => {
    });
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
    this.network.networkSwitch.subscribe(data=>{
      this.netSwitch = data;
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
  

}
