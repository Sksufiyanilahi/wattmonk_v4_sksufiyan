import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CometChat } from '@cometchat-pro/cordova-ionic-chat';
import { StorageService } from '../storage.service';
import { COMET_CHAT_AUTH_KEY, COMET_CHAT_APP_ID, COMET_CHAT_REGION } from '../model/constants';
import { ApiService } from '../api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-surveyoroverview',
  templateUrl: './surveyoroverview.page.html',
  styleUrls: ['./surveyoroverview.page.scss'],
})
export class SurveyoroverviewPage implements OnInit {

  private subscription: Subscription;

  constructor(public route: Router,
    private storage: StorageService,
    private apiService: ApiService) { }

  ngOnInit() {
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
    this.apiService.updateUser(this.storage.getUserID(), {"pushtoken":localStorage.getItem("pushtoken")}).subscribe((data) => {
    }, (error) => {
    });
  }

}
