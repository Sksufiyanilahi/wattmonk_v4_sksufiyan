import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ApiService } from '../api.service';
import { NetworkdetectService } from '../networkdetect.service';

@Component({
  selector: 'app-pestamp-homepage',
  templateUrl: './pestamp-homepage.page.html',
  styleUrls: ['./pestamp-homepage.page.scss'],
})
export class PestampHomepagePage implements OnInit {

  private subscription: Subscription;

  showSearchBar = false;
  unreadCount;
  constructor(
              private network:NetworkdetectService,
              private platform: Platform,
              private route: Router,
              private apiService: ApiService
  ) { }

  getNotificationCount(){
    this.apiService.getCountOfUnreadNotifications().subscribe( (count)=>{
      console.log("count",count);
     this.unreadCount= count;
    });


  }

  ngOnInit() {
    this.getNotificationCount();
    this.route.navigate(['pestamp-homepage/pestamp-design']);
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

  searchbar(){
    this.route.navigate(['/search-bar1']);
  }

  setzero(){
    this.unreadCount= 0;
  }

  scheduledPage(){
    this.route.navigate(['/pestamp-schedule']);

    }
}
