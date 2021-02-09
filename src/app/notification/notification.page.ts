import { Component, OnInit } from '@angular/core';
import { Intercom } from 'ng-intercom';
import { ApiService } from '../api.service';
import { UtilitiesService } from '../utilities.service';
import { MixpanelService } from '../utilities/mixpanel.service';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
  notification: any=[];
  showLoader:boolean= false;
  disableContent:boolean=false;


  constructor(  private apiservice:ApiService,
    private utilities:UtilitiesService,
    private intercom:Intercom,
    private mixpanelService:MixpanelService    
    ) { }

  ngOnInit() {
    this.mixpanelService.track("NOTIFICATION_PAGE_OPEN", {
    });
    this.utilities.showHideIntercom(true);
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

updateNotificationStatus(id){
  let Notificationstatus={
    status:'read'
  }
  this.apiservice.updateNotification(id,Notificationstatus).subscribe(()=>{
    this.getNotification();
  })
}

ionViewWillLeave(){
  this.utilities.showHideIntercom(false);
}

}
