import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { UtilitiesService } from 'src/app/utilities.service';

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
            console.log(this.notification);
            console.log(this.notification.length);
            if(res !==[]){
              this.disableContent=true;
            }
        })

    }

}
