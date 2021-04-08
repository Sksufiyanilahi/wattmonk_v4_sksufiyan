import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { version } from 'src/app/contants';
import { User } from 'src/app/model/user.model';
import { NetworkdetectService } from 'src/app/networkdetect.service';
import { StorageService } from 'src/app/storage.service';
import { UtilitiesService } from 'src/app/utilities.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { MixpanelService } from 'src/app/utilities/mixpanel.service';
import { TeamdetailsPage } from 'src/app/teamdetails/teamdetails.page';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
})
export class TeamComponent implements OnInit {

  private version = version;

  private TeamRefreshSubscription: Subscription;
  showSearchBar = false;
  update_version: string;
  teamData: User[];
  listOfteamData: any[];
  designData: any;
  overdue: any;
  id: any;
  netSwitch: any;
  noDesignFound: string;
  length: any;
  private subscription: Subscription;
  deactivateNetworkSwitch: Subscription;
  showFooter = true;
  constructor(private apiService: ApiService,
    private utils: UtilitiesService,
    private storageservice: StorageService,
    private network: NetworkdetectService,
    private iab: InAppBrowser,
    private platform: Platform,
    private route: Router,
    public modalController: ModalController,
    private mixpanelService: MixpanelService) { }

  ngOnInit() {
    this.subscription = this.utils.getBottomBarHomepage().subscribe((value) => {
      this.showFooter = value;
    });
    console.log("hello team")
    this.TeamRefreshSubscription = this.utils.getteamModuleRefresh().subscribe((result) => {
      this.getTeamData();
    })

  }

  getTeamData() {
    this.utils.showLoading("Getting Team Data").then(() => {
      this.apiService.getTeamData().subscribe((res) => {
         console.log(res);
        this.utils.hideLoading().then(() => {
          if (res.length > 0) {
            // res.forEach(element=>{
            //   this.teamData.push(element);
            //   console.log(this.teamData)
            // })
            this.teamData = res;
            console.log(this.teamData);
            this.listOfteamData = res;

          }
          else {
            this.noDesignFound = "No Result Found"
          }
        })
      }, (error) => {
        this.utils.hideLoading();
      })
    })
  }

  // formatDesignData(records : teamData[]){
  //     this.overdue=[];
  //     let list:teamData[];
  //    list=this.fillinDynamicData(records);
  //    list.forEach(element =>{
  //      this.listOfteamData.push(element);
  //    })

  //     console.log(this.listOfteamData);

  //     const tempData: teamData[] = [];



  //       this.listOfteamData.forEach((designItem:any,i) => {
  //         console.log(i);

  //         if (tempData.length === 0) {
  //           this.sDatePassed(designItem.updated_at,i);
  //           const listOfDesign = new DesginDataHelper();
  //           listOfDesign.date = this.datePipe.transform(designItem.updated_at, 'M/dd/yy');
  //             listOfDesign.lateby = this.overdue;
  //           listOfDesign.listOfDesigns.push(designItem);
  //           tempData.push(listOfDesign);
  //           console.log(tempData);


  // ;
  //         } else {

  //           let added = false;
  //           tempData.forEach((DesignList) => {
  //             // DesignList['listOfDesigns'].forEach(element=>{

  //             //   console.log(element.deliverydate,":::::::::::::");

  //             //   this.sDatePassed(element.deliverydate);
  //             // })
  //             if (!added) {
  //               if (DesignList.date === this.datePipe.transform(designItem.updated_at, 'M/dd/yy')) {
  //                 DesignList.listOfDesigns.push(designItem);
  //                 this.sDatePassed(designItem.updated_at,i);
  //                 added = true;
  //               }
  //             }
  //           });
  //           if (!added) {
  //             ;
  //             this.sDatePassed(designItem.updated_at,i);
  //             const listOfDesign = new DesginDataHelper();
  //             listOfDesign.date = this.datePipe.transform(designItem.updated_at, 'M/dd/yy');
  //             listOfDesign.lateby = this.overdue;
  //             listOfDesign.listOfDesigns.push(designItem);
  //             tempData.push(listOfDesign);
  //             added = true;
  //           }
  //         }
  //       });
  //         this.listOfteamData = tempData.sort(function (a, b) {
  //           var dateA = new Date(a.date).getTime(),
  //             dateB = new Date(b.date).getTime();
  //           return dateB - dateA;
  //         // });
  //         // this.chatIcon(list);
  //         // console.log(list);
  //         // this.cdr.detectChanges();
  // }
  async teamdetail(data, event) {
    event.stopPropagation();
    this.mixpanelService.track("DECLINE_TEAM_DETAIL_PAGE_OPEN", {
    });
    const modal = await this.modalController.create({
      component: TeamdetailsPage,
      cssClass: 'my-custom-modal-css',
      componentProps: {
        designData: data
      },
      backdropDismiss: false
    });
    modal.onDidDismiss().then((data) => {
      console.log(data)

      if (data.data.cancel == 'cancel') {
      } else {
        // this.getDesignDetail(null)
      }
    });
    // modal.dismiss(() => {
    //   ;
    //   this.getDesigns(null);
    // });
    return await modal.present();
  }

  ionViewDidEnter() {
    //  ;
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
      // console.log(this.netSwitch);
      let user = this.storageservice.getUser();
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
    // this.mixpanelService.setUserDetails(this.userData.email,this.userData.firstname+" "+this.userData.lastname,this.userData.id)
    // this.mixpanelService.track("PERMITDESIGN_PAGE_OPEN", {
    //   $id: this.userData.id,
    //   $email: this.userData.email,
    //   $name: this.userData.firstname + this.userData.lastname
    // });
  }

  teamScheduledPage() {
    // this.mixpanelService.track("ADD_PERMITDESIGN_PAGE_OPEN", {
    // });
    this.route.navigate(['/teamschedule']);

  }
  //   segmentChanged(event){

  //     if(this.designData.role.type=='wattmonkadmins' || this.designData.role.name=='Admin'  ){
  //       if(event.target.value=='groups')


  //   }
  // }
  // segmentChanged(event){
  // }

}
