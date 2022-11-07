import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
@Component({
  selector: 'app-profile-notification',
  templateUrl: './profile-notification.component.html',
  styleUrls: ['./profile-notification.component.scss'],
})

export class ProfileNotificationComponent implements OnInit {
  notification: any=[];
  showLoader:boolean= false;
  disableContent:boolean=false;

  constructor(
    private apiservice:ApiService,
    private utilities:UtilitiesService
  ) { }

  ngOnInit() {

    this.getNotification();
  }

    getNotification(){

        this.apiservice.profileNotification().subscribe(res=>{
            this.notification = res;
            this.showLoader=true;
            if(res !==[]){
              this.disableContent=true;
            }
        })

    }

}
