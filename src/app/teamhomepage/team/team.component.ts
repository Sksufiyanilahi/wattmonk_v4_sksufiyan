import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/model/user.model';
import { NetworkdetectService } from 'src/app/networkdetect.service';
import { StorageService } from 'src/app/storage.service';
import { UtilitiesService } from 'src/app/utilities.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AngularDelegate, Platform, ToastController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { MixpanelService } from 'src/app/utilities/mixpanel.service';
import { TeamdetailsPage } from 'src/app/teamdetails/teamdetails.page';
import { ApiService } from 'src/app/api.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DrawerState } from 'ion-bottom-drawer';
import { AssigneeModel } from 'src/app/model/assignee.model';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
})
export class TeamComponent implements OnInit {
  drawerState = DrawerState.Bottom;

  private TeamRefreshSubscription: Subscription;
  assignForm:FormGroup
  showSearchBar = false;
  update_version: string;
  teamData: User[];
  listOfteamData: any[];
  designData: any;
  overdue: any;
  id: number;
  netSwitch: any;
  noDesignFound: string;
  length: any;
  private subscription: Subscription;
  deactivateNetworkSwitch: Subscription;
  showFooter = true;
  userData:any;
  SalesManager:User[]=[];
  showBottomDraw: boolean = false;
  selectedDesigner:any;
  teamBd:User[]=[];
  isTeamBdAssign:boolean = false;
  isTeamAdminAssign:boolean = false;
  teamAdmin:User[]=[]
  isTeamBd:boolean = false
  isTeamAdmin:boolean = false;

  admin:number=0;
  bd:number=0;
  designers:number=0;
  analysts:number=0;
  surveyor:number=0;
  peengineer:number=0;
  all:number=0;

  isTeamData:boolean=false;

  constructor(private apiService: ApiService,
    public utils: UtilitiesService,
    private storageservice: StorageService,
    private network: NetworkdetectService,
    private iab: InAppBrowser,
    private platform: Platform,
    private route: Router,
    public modalController: ModalController,
    private mixpanelService: MixpanelService,
    private formBuilder: FormBuilder,
    private cdr:ChangeDetectorRef,
    private modalCtrl:ModalController,
    private toastController:ToastController) {
    }

    @Output() public data =
        new EventEmitter<{admin:number,bd:number,designers:number,analysts:number,surveyor:number,peengineer:number,all:number}>();

  ngOnInit() {
    this.userData = this.storageservice.getUser();

    this.TeamRefreshSubscription = this.utils.getteamModuleRefresh().subscribe((result) => {
      this.getTeams(null);
    })

  }

  send_counts()
  {

  /* we will wrap the parameters
     to be sent inside the curly brackets.*/

    this.data.emit({admin:this.admin, bd:this.bd,designers:this.designers,analysts:this.analysts,surveyor:this.surveyor,peengineer:this.peengineer,all:this.all});
  }

  getTeams(event) {

    let showLoader = true;
    if (event != null && event !== undefined) {
      showLoader = false;
    }
    this.getTeamData(event,showLoader);
  }

  getTeamData(event,showLoader:boolean) {
    //this.utils.showLoading("Getting Team Data").then(() => {

      this.teamData=[];
      this.listOfteamData = [];
      var count=0;
      // this.utils.showLoadingWithPullRefreshSupport(showLoader, 'Getting Team Data').then((success) => {
      this.apiService.getTeamData().subscribe((res) => {

         this.isTeamData=true;
         this.send_counts();
            this.teamData = res;

            this.listOfteamData = res;
        //  this.utils.hideLoadingWithPullRefreshSupport(showLoader).then(() => {
          if (res.length > 0) {

            res.forEach(element=>{
              if(element.role.id==3)
              {
                this.teamBd.push(element);
                ++this.bd;

              }
              else if(element.role.id==5)
              {
                ++this.admin;

              }
              else if(element.role.id==8)
              {

                ++this.designers;
                count=0;
              }
              else if(element.role.id==10)
              {

                ++this.analysts;
              }
              else if(element.role.id==9)
              {
                ++this.surveyor;
              }
              else if(element.role.id==11)
              {

                ++this.peengineer;

              }
            })

            res.forEach(element=>{
              if(element.role.id==7)
              {
                this.teamAdmin.push(element);
                ++this.admin;

              }
            })
            this.all = res.length;

          }
          else {
            this.noDesignFound = "No Result Found"
          }
          if (event !== null) {
            event.target.complete();
          }
        // })
      }, (error) => {
        // this.utils.hideLoadingWithPullRefreshSupport(showLoader).then(() => {
        if (event !== null) {
          event.target.complete();
        }
      // })
      })
    // })
  }

  // formatDesignData(records : teamData[]){
  //     this.overdue=[];
  //     let list:teamData[];
  //    list=this.fillinDynamicData(records);
  //    list.forEach(element =>{
  //      this.listOfteamData.push(element);
  //    })

  //

  //     const tempData: teamData[] = [];



  //       this.listOfteamData.forEach((designItem:any,i) => {
  //

  //         if (tempData.length === 0) {
  //           this.sDatePassed(designItem.updated_at,i);
  //           const listOfDesign = new DesginDataHelper();
  //           listOfDesign.date = this.datePipe.transform(designItem.updated_at, 'M/dd/yy');
  //             listOfDesign.lateby = this.overdue;
  //           listOfDesign.listOfDesigns.push(designItem);
  //           tempData.push(listOfDesign);
  //


  // ;
  //         } else {

  //           let added = false;
  //           tempData.forEach((DesignList) => {
  //             // DesignList['listOfDesigns'].forEach(element=>{

  //             //

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
  //         //
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
      //
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

  edit(){
    this.modalCtrl.dismiss({'dismissed':true})

   // this.route.navigate(['/teamschedule/'+this.designData.id])
   let objToSend: NavigationExtras = {
    queryParams: {
     designData:this.designData,


    },
    skipLocationChange: false,
    fragment: 'top'
  };



  this.route.navigate(['/teamschedule/'+this.designData.id], {
  state: { productdetails: objToSend }
  });
  }

  async deleteDesign() {

    // this.enableDisable = true;
    const toast = await this.toastController.create({
      header: 'Delete Design',
      message: 'Are you sure you want to delete this Team Member ?',
      cssClass: 'my-custom-delete-class',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.deleteDesignFromServer();
          }
        }, {
          text: 'No',
          handler: () => {
            // this.enableDisable = false;
          }
        }
      ]
    });
    toast.present();
  }
  deleteDesignFromServer() {

    this.utils.showLoading('Deleting Design').then((success) => {
      this.apiService.deleteTeam(this.designData.id).subscribe((result) => {

        this.utils.hideLoading().then(() => {
          this.utils.showSnackBar(this.designData.firstname + " " + 'has been deleted successfully');
        //  this.navController.pop();
        this.modalCtrl.dismiss({'dismissed':true})


        this.route.navigate(['/teamhomepage/team'])
        // this.utils.setteamModuleRefresh(true);
         // this.utils.setteamModuleRefresh(true);
        });
      }, (error) => {
        this.utils.hideLoading().then(() => {
          this.utils.errorSnackBar('Some Error Occurred');
        });
      });
    });
  }

  isEmptyObject(obj) {
    return obj && Object.keys(obj).length === 0;
  }

  refreshDesigns(event) {
    // this.skip=0;
    let showLoader = true;
    if (event !== null && event !== undefined) {
      showLoader = false;
    }

    this.getTeamData(event,showLoader);
  }
  //   segmentChanged(event){

  //     if(this.designData.role.type=='wattmonkadmins' || this.designData.role.name=='Admin'  ){
  //       if(event.target.value=='groups')


  //   }
  // }
  // segmentChanged(event){
  // }

  openAssignSalesManager(id,data,event)
  {
    this.SalesManager=[];
    event.stopPropagation();
    this.id = id;
    this.isTeamBdAssign = true;
    this.SalesManager = this.teamBd;
      this.showBottomDraw=true;
     // this.designId = id;
            this.utils.setBottomBarHomepage(false);
            this.drawerState = DrawerState.Docked;
  }

  getassignedata(asssignedata){
    this.selectedDesigner = asssignedata;

  }

  assign()
  {

    this.utils.showLoading("Assigning").then(()=>{
    let postData={
      addedby:this.selectedDesigner.id
    }
    this.apiService.updateContractorsData(this.id,postData).subscribe((res)=>{

      this.utils.hideLoading().then(()=>{
        // if(this.isTeamBdAssign)
        // {
        //   this.isTeamBd = true;
        // }
        // else if(this.isTeamAdminAssign){
        //   this.isTeamAdmin = true;
        // }

        this.dismissBottomSheet();
        this.showBottomDraw = false;
        //this.utils.showSnackBar("");
        this.utils.setteamModuleRefresh(true);
      })
    })
  })
  }

  close() {
    if (this.showBottomDraw === true) {
      this.showBottomDraw = false;
      this.drawerState = DrawerState.Bottom;
      this.utils.setBottomBarHomepage(true);
    } else {
      this.showBottomDraw = true;
    }
  }

  dismissBottomSheet() {
    this.showBottomDraw = false;

    this.drawerState = DrawerState.Bottom;
    this.utils.setBottomBarHomepage(true);
    this.SalesManager=[];
  }

  openAssignAdmin(data,event)
  {
    this.SalesManager=[]
    event.stopPropagation();
    this.id = data.id;
    this.isTeamAdminAssign = true;
    this.SalesManager = this.teamAdmin;
    this.showBottomDraw=true;
     // this.designId = id;
            this.utils.setBottomBarHomepage(false);
            this.drawerState = DrawerState.Docked;
  }

}
