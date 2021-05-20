import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NavController, Platform, PopoverController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ApiService } from '../api.service';
import { NetworkdetectService } from '../networkdetect.service';
import { UtilitiesService } from '../utilities.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { StorageService } from '../storage.service';
import { MixpanelService } from '../utilities/mixpanel.service';
import { User } from '../model/user.model';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-clienthomepage',
  templateUrl: './clienthomepage.page.html',
  styleUrls: ['./clienthomepage.page.scss'],
})
export class ClienthomepagePage implements OnInit {
  displayedColumns: string[] = [
    "name",
    "company",
    "email",
    "amount",
    "prelimdesigncount",
    "permitdesigncount",
    "manage"
  ];
  clientData: any[];
  // clients: any[] = [];
  length: number;
  dataSubscription: Subscription;
  showSearchBar = false;
  unreadCount;
  showFooter = true;
  update_version: string;
  netSwitch: any;
  noDesignFound: string;

  isClientData:boolean=false;


  constructor(
    private network: NetworkdetectService,
    private platform: Platform,
    private route: Router,
    private apiService: ApiService,
    private utils: UtilitiesService,
    private iab: InAppBrowser,
    private storageService: StorageService,
    private mixpanelService: MixpanelService,
    private router: Router,
    private toastController: ToastController,
    private navController:NavController,
    private popoverController: PopoverController
  ) {

  }
  ngOnInit() {
    this.getNotificationCount();
    this.dataSubscription = this.utils.getHomepageDesignRefresh().subscribe((result) => {
     this.getDesigns(null);
    });
  }

  getDesigns(event) {

    let showLoader = true;
    if (event != null && event !== undefined) {
      showLoader = false;
    }
    this.fetchAllContractorsList(event, showLoader);
  }

  fetchAllContractorsList(event,showLoader:boolean) {
    this.clientData=[];
   // this.utils.showLoadingWithPullRefreshSupport(showLoader, 'Getting Clients').then((success) => {
    this.apiService.getContractorsList().subscribe(
      (response:any) => {
      //  this.utils.hideLoadingWithPullRefreshSupport(showLoader).then(() => {
        console.log("response", response);
        this.isClientData = true;
        //if (response.length > 0) {
        // this.clients = this.fillinDynamicData(response);

        //}
        if(response.length){
          this.clientData = response;
        }else{
          this.noDesignFound= "No Designs Found";
        }
        if (event !== null) {
          event.target.complete();
        }
        console.log(this.clientData);
       // });
      },


      error => {
        this.utils.hideLoadingWithPullRefreshSupport(showLoader).then(() => {
        this.utils.errorSnackBar("errors");
        });
      }
    );
   // });

  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }

  getNotificationCount() {
    this.apiService.getCountOfUnreadNotifications().subscribe((count) => {

      this.unreadCount = count;
    });
  }
  trackdesign(index, design) {
    return design.id;
  }

  scheduledPage() {
    this.mixpanelService.track("ADD_CLIENT_PAGE_OPEN", {
    });
    this.route.navigate(['/clientschedule']);

  }

  isEmptyObject(obj) {
    return obj && Object.keys(obj).length === 0;
  }
  setzero() {
    this.unreadCount = 0;
  }

  edit(id, event) {
    event.stopPropagation();
    let objToSend: NavigationExtras = {
      queryParams: {
        id: id
      },
      skipLocationChange: false,
      fragment: 'top'
    };


    this.router.navigate(['/clientschedule'], {
      state: { productdetails: objToSend }
    });
  }

  async blockUser(data,event) {
    //this.enableDisable= true;
    event.stopPropagation();
    const toast = await this.toastController.create({
      header: 'Block Client',
      message: 'Are you sure you want to blocked this user '+data.firstname.toUpperCase()+data.lastname.toUpperCase()+'?',
      cssClass: 'my-custom-delete-class',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.blockUserFromServer(data);
          }
        }, {
          text: 'No',
          handler: () => {
            //this.enableDisable=false;
          }
        }
      ]
    });
    toast.present();
  }

  blockUserFromServer(clientData) {
    var data={
      blocked:false
    }
    this.utils.showLoading('Blocking Client').then((success) => {
      this.apiService.updateContractorsData(clientData.id,data).subscribe((result) => {
        this.utils.hideLoading().then(() => {
          this.utils.showSnackBar('Client has been activated successfully');
         // this.navController.pop();
          this.utils.setHomepageDesignRefresh(true);
        });
      }, (error) => {
        this.utils.hideLoading().then(() => {
          this.utils.errorSnackBar('Some Error Occurred');
        });

      });
    });
  }

  refreshClients(event)
  {
    let showLoader = true;
    if (event !== null && event !== undefined) {
      showLoader = false;
    }
    this.fetchAllContractorsList(event, showLoader);
  }

  switchPaymentModeCustomer(event,data,j)
  {
    event.stopPropagation();
    console.log(event)
    console.log(event.target.value,data.id)
    let chipValue = event.target.value;
    var postData={
      ispaymentmodeprepay : chipValue
    }
    this.apiService.updateContractorsData(data.id,postData).subscribe((res)=>{
      console.log(res);
      })
  }

  searchbar() {
		this.route.navigate([ '/search-bar1' ]);
	}


}
