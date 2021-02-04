import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ApiService } from '../api.service';
import { version } from '../contants';
import { NetworkdetectService } from '../networkdetect.service';
import { UtilitiesService } from '../utilities.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { StorageService } from '../storage.service';
import { MixpanelService } from '../utilities/mixpanel.service';

@Component({
  selector: 'app-pestamp-homepage',
  templateUrl: './pestamp-homepage.page.html',
  styleUrls: ['./pestamp-homepage.page.scss'],
})
export class PestampHomepagePage implements OnInit {
  private version = version;
  private subscription: Subscription;

  showSearchBar = false;
  unreadCount;
  showFooter = true;
  update_version: string;
  netSwitch: any;
  deactivateNetworkSwitch: Subscription;
  userData:any;

  constructor(
              private network:NetworkdetectService,
              private platform: Platform,
              private route: Router,
              private apiService: ApiService,
              private utils:UtilitiesService,
              private iab:InAppBrowser,
              private storageService:StorageService,
              private mixpanelService:MixpanelService
  ) { 
    this.userData = this.storageService.getUser();
  }

  getNotificationCount(){
    this.apiService.getCountOfUnreadNotifications().subscribe( (count)=>{
      console.log("count",count);
     this.unreadCount= count;
    });


  }

  ngOnInit() {
    this.getNotificationCount();
    this.apiService.version.subscribe(versionInfo=>{
      this.update_version = versionInfo;
       });
    this.route.navigate(['pestamp-homepage/pestamp-design']);
    this.subscription = this.utils.getBottomBarHomepage().subscribe((value) => {
      this.showFooter = value;
    });
  }

  ionViewDidEnter() {
    if(this.version !== this.update_version && this.update_version !==''){

      setTimeout(()=>{

        this.utils.showAlertBox('Update App','New version of app is available on Play Store. Please update now to get latest features and bug fixes.',[{
          text:'Ok',

          handler:()=>{
            this.iab.create('https://play.google.com/store/apps/details?id=com.solar.wattmonk',"_system");
           this.ionViewDidEnter();
          }
        }]);
      },2000)
    }
    this.deactivateNetworkSwitch=  this.network.networkSwitch.subscribe(data=>{
      this.netSwitch = data;
      this.utils.showHideIntercom(false);
      console.log(this.netSwitch);
      let user= this.storageService.getUser();
      this.apiService.emitUserNameAndRole(user);

    })

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
    // if(this.userData.ispaymentmodeprepay){
    //   this.apiService.getPendingPaymentstatus().subscribe((res:any)=>{
    //     console.log(res);
    //     if(res.length>0){
    //       this.utils.errorSnackBar("Please clear your pending dues from the delivered section");
    //     } 
    //     else{
    //       this.route.navigate(['/pestamp-schedule']);
    //     }
    //   },
    //     error => {
    //       this.utils.errorSnackBar("Error");
    //     })
    
    // }
    // else{
      this.mixpanelService.track("Add_PE stamp add _PAGE_OPEN", {
      });
      this.route.navigate(['/pestamp-schedule']);
    //}

    }
    ngOndestroy(){
      this.deactivateNetworkSwitch.unsubscribe();
    }
}
