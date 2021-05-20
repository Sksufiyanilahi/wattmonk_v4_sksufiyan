import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ModalController, Platform, ToastController } from '@ionic/angular';
import { DrawerState } from 'ion-bottom-drawer';
import { Subscription } from 'rxjs';
import { ApiService } from '../api.service';
import { User } from '../model/user.model';
import { NetworkdetectService } from '../networkdetect.service';
import { StorageService } from '../storage.service';
import { UtilitiesService } from '../utilities.service';
import { MixpanelService } from '../utilities/mixpanel.service';
import { TeamdetailsPage } from '../teamdetails/teamdetails.page';

@Component({
  selector: 'app-teamhomepage',
  templateUrl: './teamhomepage.page.html',
  styleUrls: ['./teamhomepage.page.scss'],
})
export class TeamhomepagePage implements OnInit {

  slideOpts = {
    initialSlide: 1,
    slidesPerView: 3,
    speed:400,
    centeredSlides: true,
    spaceBetween: 2
  };
  drawerState = DrawerState.Bottom;

  private TeamRefreshSubscription: Subscription;
  assignForm:FormGroup
  showSearchBar = false;
  update_version: string;
  teamData: User[];
  listOfteamData: any;
  overdue: any;
  id: number;
  netSwitch: any;
  length: any;
  noMemberFound:any;
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

  teamDesigner:User[]=[];
  teamAnalyst:User[]=[]
  teamPeengineer:User[]=[];
  teamSurveyor:User[]=[];


  user: any
  unreadCount;
  roles: any;
  isTeamData:boolean=false;

  constructor(private router: Router,
    private storage: StorageService,
    private apiService: ApiService,
    public utils: UtilitiesService,
    private network: NetworkdetectService,
    private iab: InAppBrowser,
    private platform: Platform,
    public modalController: ModalController,
    private mixpanelService: MixpanelService,
    private toastController:ToastController){
    // private formBuilder: FormBuilder,
    // private cdr:ChangeDetectorRef) {
    const url = this.router.url;
    console.log(url);
  }

  segmentChanged(event){
    // this.skip=0;
    console.log(event)
    this.isTeamData = false;
     if(event.target.value=='member'){
      this.TeamRefreshSubscription = this.utils.getteamModuleRefresh().subscribe((result) => {
        this.getTeams(null);
      })
     }
     else if(event.target.value == 'groups')
     {
      this.isTeamData = false;
     }

 }

  ngOnInit() {
    this.user = this.storage.getUser();
    console.log(this.user)
    this.isTeamData=false;
    this.getNotificationCount();
   this.getRoles();
    this.TeamRefreshSubscription = this.utils.getteamModuleRefresh().subscribe((result) => {
      this.getTeams(null);
    })

  }

  getNotificationCount() {
    this.apiService.getCountOfUnreadNotifications().subscribe((count) => {

      this.unreadCount = count;
    });


  }

  scheduledPage() {
    if (this.router.url == '/teamhomepage/team') {
      this.router.navigate(['/teamschedule']);
    }
    else {
      this.router.navigate(['/groupschedule']);
    }
  }

  searchbar() {
    this.router.navigate(['/search-bar1']);
  }

  setzero() {
    this.unreadCount = 0;
  }

  isEmptyObject(obj) {
    return obj && Object.keys(obj).length === 0;
  }

  /** FOR TEAM SECTION **/
  getTeams(event) {

    let showLoader = true;
    if (event != null && event !== undefined) {
      showLoader = false;
    }
    this.getTeamData(event,showLoader);
  }

  getRoles()
  {
    var parentId = this.user.parent.id;
    var roleId = this.user.role.id;
    this.apiService.getDynamicRoles(parentId,roleId).subscribe((res)=>{
      console.log(res)
      this.roles = res;
    })
  }

  getTeamData(event,showLoader:boolean) {
    //this.utils.showLoading("Getting Team Data").then(() => {
      console.log(showLoader)
      this.teamData=[];
      this.listOfteamData = [];
      this.bd = 0;
      this.admin = 0;
      this.designers = 0;
      this.analysts = 0;
      this.surveyor=0;
      this.peengineer = 0;
      this.all = 0;
      // this.utils.showLoadingWithPullRefreshSupport(showLoader, 'Getting Team Data').then((success) => {
      this.apiService.getTeamData().subscribe((res) => {
         console.log(res);
         this.isTeamData=true;
            this.teamData = res;
            console.log(this.teamData);
            this.listOfteamData = res;
        //  this.utils.hideLoadingWithPullRefreshSupport(showLoader).then(() => {
          if (res.length > 0) {
            console.log(res.length)
            res.forEach(element=>{
              if(element.role.id==3)
              {
                this.teamBd.push(element);
                ++this.bd;

              }
              else if(element.role.id==5)
              {
                this.teamAdmin.push(element);
                ++this.admin;

              }
              else if(element.role.id==8)
              {
                this.teamDesigner.push(element);
                ++this.designers;

              }
              else if(element.role.id==10)
              {
                this.teamAnalyst.push(element);
                ++this.analysts;
              }
              else if(element.role.id==9)
              {
                this.teamSurveyor.push(element);
                ++this.surveyor;
              }
              else if(element.role.id==11)
              {
                this.teamPeengineer.push(element);
                ++this.peengineer;
                console.log(this.peengineer)
              }
            })

            res.forEach(element=>{
              if(element.role.id==7)
              {
                this.teamAdmin.push(element);
                ++this.admin;
                console.log(this.admin)
              }
            })
            this.all = res.length;

          }
          else {
            this.noMemberFound = "No Result Found"
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

  filterAdmin(value)
  {
    if(value=='admin')
    {
    this.teamData = [];
    this.teamData = this.teamAdmin;
    }
    else if(value=='bd')
    {
      this.teamData = [];
      this.teamData = this.teamBd;
    }
    else if(value == 'designers')
    {
      this.teamData = [];
      this.teamData = this.teamDesigner;
    }
    else if(value =='analysts')
    {
      this.teamData = [];
      this.teamData = this.teamAnalyst;
    }
    else if(value == 'peengineer')
    {
      this.teamData = [];
      this.teamData = this.teamPeengineer;
    }
    else if(value == 'surveyor')
    {
      this.teamData=[];
      this.teamData = this.teamSurveyor;
    }
    else if(value == 'all')
    {
      this.teamData = [];
      this.teamData=this.listOfteamData;
    }
  }

  async teamdetail(data, event) {
    event.stopPropagation();
    this.mixpanelService.track("DECLINE_TEAM_DETAIL_PAGE_OPEN", {
    });
    const modal = await this.modalController.create({
      component: TeamdetailsPage,
      cssClass: 'my-custom-modal-css',
      componentProps: {
        teamData: data
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
      let user = this.storage.getUser();
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
    this.router.navigate(['/teamschedule']);

  }

  edit(data){
    this.modalController.dismiss({'dismissed':true})

   // this.route.navigate(['/teamschedule/'+this.designData.id])
   let objToSend: NavigationExtras = {
    queryParams: {
     teamData:data,


    },
    skipLocationChange: false,
    fragment: 'top'
  };



  this.router.navigate(['/teamschedule/'+data.id], {
  state: { productdetails: objToSend }
  });
  }

  async deleteTeam(data) {

    // this.enableDisable = true;
    const toast = await this.toastController.create({
      header: 'Delete Team Member',
      message: 'Are you sure you want to delete this Team Member ?',
      cssClass: 'my-custom-delete-class',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.deleteTeamFromServer(data);
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
  deleteTeamFromServer(data) {
    console.log(data)
    this.utils.showLoading('Deleting Team Member').then((success) => {
      this.apiService.deleteTeam(data.id).subscribe((result) => {
        console.log('result', result);
        this.utils.hideLoading().then(() => {
          this.utils.showSnackBar(data.firstname + " " + 'has been deleted successfully');
        //  this.navController.pop();
        this.modalController.dismiss({'dismissed':true})


        this.router.navigate(['/teamhomepage'])
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
  console.log(this.selectedDesigner)
  }

  assign()
  {
    console.log(this.id);
    this.utils.showLoading("Assigning").then(()=>{
    let postData={
      addedby:this.selectedDesigner.id
    }
    this.apiService.updateContractorsData(this.id,postData).subscribe((res)=>{
      console.log(res);
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
