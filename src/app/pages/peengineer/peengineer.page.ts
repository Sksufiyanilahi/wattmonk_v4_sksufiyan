import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { NetworkDetectService } from 'src/app/services/network-detect/network-detect.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { StorageService } from 'src/app/services/storage/storage.service';
@Component({
  selector: 'app-peengineer',
  templateUrl: './peengineer.page.html',
  styleUrls: ['./peengineer.page.scss'],
})

export class PeengineerPage implements OnInit {
  private subscription: Subscription;

  showSearchBar = false;
  unreadCount;
  showFooter = true;
  update_version: string;
  netSwitch: any;
  deactivateNetworkSwitch: Subscription;

  constructor(
              private network:NetworkDetectService,
              private platform: Platform,
              private route: Router,
              private apiService: ApiService,
              private utils:UtilitiesService,
              private iab:InAppBrowser,
              private storageService:StorageService
  ) { }

  getNotificationCount(){
    this.apiService.getCountOfUnreadNotifications().subscribe( (count)=>{
     this.unreadCount= count;
    });


  }

  ngOnInit() {
    this.getNotificationCount();
    this.apiService.version.subscribe(versionInfo=>{
      this.update_version = versionInfo;
       });
    this.route.navigate(['peengineer/peengineer-design']);
    this.subscription = this.utils.getBottomBarHomepage().subscribe((value) => {
      this.showFooter = value;
    });
  }

  ionViewDidEnter() {
    // if(this.version !== this.update_version && this.update_version !==''){

    //   setTimeout(()=>{

    //     this.utils.showAlertBox('Update App','New version of app is available on Play Store. Please update now to get latest features and bug fixes.',[{
    //       text:'Ok',

    //       handler:()=>{
    //         this.iab.create('https://play.google.com/store/apps/details?id=com.solar.wattmonk',"_system");
    //        this.ionViewDidEnter();
    //       }
    //     }]);
    //   },2000)
    // }
    this.deactivateNetworkSwitch=  this.network.networkSwitch.subscribe(data=>{
      this.netSwitch = data;
      let user= this.storageService.getUser();
      this.apiService.emitUserNameAndRole(user);

    })

this.network.networkDisconnect();
this.network.networkConnect();
    // this.subscription = this.platform.backButton.subscribe(() => {
    //   if (this.showSearchBar === true) {
    //     this.showSearchBar = false;
    //   } else {
    //     (navigator as any).app.exitApp();
    //   }
    // });
  }


  searchbar(){
    this.route.navigate(['/search-bar']);
  }

  setzero(){
    this.unreadCount= 0;
  }

  scheduledPage(){
    this.route.navigate(['/pestamp-schedule']);

    }
    ngOndestroy(){
      this.deactivateNetworkSwitch.unsubscribe();
    }

}

