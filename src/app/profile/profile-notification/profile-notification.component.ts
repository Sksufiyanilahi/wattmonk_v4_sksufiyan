import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-profile-notification',
  templateUrl: './profile-notification.component.html',
  styleUrls: ['./profile-notification.component.scss'],
})
export class ProfileNotificationComponent implements OnInit {
  notification: Object;

  constructor(
    private apiservice:ApiService
  ) { }

  ngOnInit() {

    this.getNotification();
  }

    getNotification(){
      this.apiservice.profileNotification().subscribe(res=>{
        this.notification = res;
        console.log(this.notification);
        
      })
    }

}
