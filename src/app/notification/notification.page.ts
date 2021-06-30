import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

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
  isNotification:boolean=false;
   today = new Date().toISOString();
  constructor(  private apiservice:ApiService,
    private utilities:UtilitiesService,
    private mixpanelService:MixpanelService,
    private router:Router,
    private navController:NavController
    ) { }
  ngOnInit() {
    this.mixpanelService.track("NOTIFICATION_PAGE_OPEN", {
    });
    this.getNotification();
  }
  getNotification(){
    this.isNotification=false;
    this.apiservice.profileNotification().subscribe(res=>{
        this.notification = res;
        this.showLoader=true;
        this.isNotification=true;
        console.log(this.notification.length);
      //  console.log("type",this.notification.design.requesttype);
        if(res !==[]){
          // this.isNotification=true;
          this.disableContent=true;
        }
    })
}
updateNotificationStatus(id,notification:any){
  console.log(notification)
if(notification.type=='survey'){
  console.log(notification)
  this.utilities.setPrelimId(notification.survey);
  this.utilities.setRequestType(notification.type);
  this.router.navigate(['masterdetailpage/survey/' + notification.survey.id])
}
if(notification.type=='design'){
  console.log(notification.design.id,id)
  this.utilities.setPrelimId(notification.design);
  this.utilities.setRequestType(notification.design.requesttype);
if(notification.design.requesttype=='prelim'){
  this.router.navigate(['masterdetailpage/prelim/' + notification.design.id])
}
if(notification.design.requesttype=='permit'){
  this.router.navigate(['masterdetailpage/permit/' + notification.design.id])
}
}
if(notification.type=='pestamp'){
  console.log(notification)
  this.utilities.setPrelimId(notification.pestamp);
  this.utilities.setRequestType(notification.type);
  this.router.navigate(['masterdetailpage/pestamp/' + notification.pestamp.id])
}
  let Notificationstatus={
    status:'read'
  }
  this.apiservice.updateNotification(id,Notificationstatus).subscribe(()=>{
    // this.getNotification();
  })
}
ionViewWillLeave(){
}
onReturn() {
  this.navController.pop();
}
goToSearch(){
  this.router.navigate([ '/search-bar1' ]);
}
markAllAsRead(){
  this.apiservice.markAllAsRead().subscribe(res=>{
    console.log(res);
    this.getNotification();
  })
}
}