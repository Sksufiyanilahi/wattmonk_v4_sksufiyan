import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../api.service';
import { version } from '../contants';
import { User } from '../model/user.model';
import { NetworkdetectService } from '../networkdetect.service';
import { StorageService } from '../storage.service';
import { UtilitiesService } from '../utilities.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teammodule',
  templateUrl: './teammodule.page.html',
  styleUrls: ['./teammodule.page.scss'],
})
export class TeammodulePage implements OnInit {

  private version = version;

  showSearchBar = false;
  update_version: string;
  teamData:User[];
  netSwitch:any;
  private subscription: Subscription;
  deactivateNetworkSwitch: Subscription;
  showFooter=true;

  constructor(private apiService : ApiService,
              private utils:UtilitiesService,
              private storageservice:StorageService,
              private network:NetworkdetectService,
              private iab:InAppBrowser,
              private platform:Platform,
              private route:Router) { }

  ngOnInit() {
    this.subscription = this.utils.getBottomBarHomepage().subscribe((value) => {
      this.showFooter = value;
    });
    console.log("hello team")
    this.getTeamData();
  }

  getTeamData()
  {
    this.utils.showLoading("Getting Data").then(()=>{
    this.apiService.getTeamData().subscribe((res)=>{
      console.log(res);
      this.utils.hideLoading().then(()=>{
      if(res.length>0)
      {
        // res.forEach(element=>{
        //   this.teamData.push(element);
        //   console.log(this.teamData)
        // })
      this.teamData = res;
      console.log(this.teamData);

      }
    })
    })
  })
  }

  ionViewDidEnter() {
    // debugger;
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
      console.log(this.netSwitch);
      let user= this.storageservice.getUser();
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

  teamScheduledPage(){
    // this.mixpanelService.track("ADD_PERMITDESIGN_PAGE_OPEN", {
    // });
    this.route.navigate(['/teamschedule']);

    }


}
