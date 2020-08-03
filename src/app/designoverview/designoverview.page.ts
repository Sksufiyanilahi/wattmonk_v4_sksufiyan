import { Component, OnInit } from '@angular/core';
import { CometChat } from '@cometchat-pro/cordova-ionic-chat';
import { StorageService } from '../storage.service';
import { COMET_CHAT_AUTH_KEY, COMET_CHAT_APP_ID, COMET_CHAT_REGION } from '../model/constants';
import { ApiService } from '../api.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-designoverview',
  templateUrl: './designoverview.page.html',
  styleUrls: ['./designoverview.page.scss'],
})
export class DesignoverviewPage implements OnInit {

  private subscription: Subscription;

  constructor(public route: Router,
    private storage: StorageService,
    private apiService: ApiService) { }

  ngOnInit() {
    this.setupCometChatUser();
    this.updateUserPushToken();
    this.route.navigate(['designoverview/newdesigns']);
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
    this.apiService.updateUser(this.storage.getUserID(), {"pushtoken":localStorage.getItem("pushtoken")}).subscribe((data) => {
    console.log(data, "fcm data");
    
    }, (error) => {
    });
  }

}
