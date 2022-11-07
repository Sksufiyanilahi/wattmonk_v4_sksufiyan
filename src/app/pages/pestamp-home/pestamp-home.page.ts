import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { MixpanelService } from 'src/app/services/mixpanel/mixpanel.service';
import { NetworkDetectService } from 'src/app/services/network-detect/network-detect.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { ROLES } from 'src/app/services/constants';

@Component({
  selector: 'app-pestamp-home',
  templateUrl: './pestamp-home.page.html',
  styleUrls: ['./pestamp-home.page.scss'],
})

export class PestampHomePage implements OnInit {
  private subscription: Subscription;

  showSearchBar = false;
  unreadCount;
  showFooter = true;
  update_version: string;
  netSwitch: any;
  deactivateNetworkSwitch: Subscription;
  userData: any;
  public userAccessRights: any = {};
  public isClient: boolean = true;
  public isPeSuperadmin: boolean = false;

  constructor(
      private network: NetworkDetectService,
      private platform: Platform,
      private route: Router,
      private apiService: ApiService,
      private utils: UtilitiesService,
      private iab: InAppBrowser,
      private storageService: StorageService,
      private mixpanelService: MixpanelService,
      private toastController: ToastController
  ) {
      this.userData = this.storageService.getUser();

      // get access right permission data
      this.userAccessRights = this.utils.getUserAccessRights('pestamp');
      this.isClient = this.utils.isClient();

      if (this.userData.role.id == ROLES.PESuperAdmin || this.userData.role.id == ROLES.PeAdmin) {
          this.isPeSuperadmin = true;
      }

  }

  getNotificationCount() {
      this.apiService.getCountOfUnreadNotifications().subscribe((count) => {
          this.unreadCount = count;
      });
  }

  ngOnInit() {
      this.getNotificationCount();
      this.apiService.version.subscribe(versionInfo => {
          this.update_version = versionInfo;
      });
      this.route.navigate(['pestamp-home/pestamp-design']);
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
      this.deactivateNetworkSwitch = this.network.networkSwitch.subscribe(data => {
          this.netSwitch = data;
          let user = this.storageService.getUser();
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


  searchbar() {
      this.route.navigate(['/search-bar']);
  }

  setzero() {
      this.unreadCount = 0;
  }

  async scheduledPage() {
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
      // comment on 20220128
      this.mixpanelService.track("ADD_PESTAMP_PAGE_OPEN", {
      });
      this.route.navigate(['/pestamp-schedule']);
      // const toast = await this.toastController.create({
      //     message: 'Kindly use web platform for adding a new request.',
      //     cssClass: 'my-custom-class',
      //     duration: 4000
      //   });
      //   await toast.present();
      //}

  }
  ngOndestroy() {
      this.deactivateNetworkSwitch.unsubscribe();
  }
}
