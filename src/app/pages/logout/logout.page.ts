import { Component, OnInit } from '@angular/core';
import { NavController,NavParams, ToastController, ModalController } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CometChat } from '@cometchat-pro/cordova-ionic-chat';
import { Storage } from '@ionic/storage';
import { ApiService } from 'src/app/services/api/api.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { Company } from 'src/app/models/company.model';
import { CustomEventsService } from 'src/app/services/custom-events/custom-events.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})

export class LogoutPage implements OnInit {

  
  constructor(public modalController: ModalController,
    private apiservice: ApiService,
    private nav: NavParams,
    private storageService: StorageService,
    private navController: NavController,
    public utilities: UtilitiesService,
    private deviceStorage: Storage,
    private eventService: CustomEventsService,
    private formBuilder: FormBuilder) {
   
  }

  ngOnInit() {
   
   
  }

  

  dismiss() {
    this.modalController.dismiss();
  }

  ionViewDidLeave() {
    
  }


  





  
  log_ou(){

    this.utilities.showLoading('Logging Out').then(() => {
        let data: any = {
            userid: JSON.parse(this.storageService.getUserID()),
            pushtoken: this.storageService.getPushToken()
        }
        

        console.log('data', data);

        this.apiservice.updatePushToken(data).subscribe((success) => {
            console.log('success', success);
        }, (error) => {
            console.log('error', error);
        });

        this.eventService.publish('foo:update-unread-msg-count', {
          unreadMessageCount: 0
        });

        CometChat.logout().then(() => {
            this.utilities.hideLoading().then(() => {
                this.storageService.logout();
                this.deviceStorage.remove('pvsurveyjson');
                this.deviceStorage.remove('uploadSurveyUsingMobileNetwork');
                // this.deviceStorage.clear();
                this.apiservice.resetHeaders();
                this.navController.navigateRoot('login');
                this.dismiss();
            })
        }, err => {
            this.storageService.logout();
            this.deviceStorage.remove('pvsurveyjson');
            this.deviceStorage.remove('uploadSurveyUsingMobileNetwork');
            // this.deviceStorage.clear();
            this.apiservice.resetHeaders();
            this.utilities.hideLoading();
            this.navController.navigateRoot('login');
            this.dismiss();
        });
        this.dismiss();

    }, err => {
        
      this.dismiss();
        this.utilities.hideLoading();
    })


}
 

 

 

 

}
