import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AlertController, ModalController, Platform, ToastController } from '@ionic/angular';
import { DrawerState } from 'ion-bottom-drawer';
import { Subscription } from 'rxjs';
import { ApiService } from '../api.service';
import { User } from '../model/user.model';
import { NetworkdetectService } from '../networkdetect.service';
import { StorageService } from '../storage.service';
import { UtilitiesService } from '../utilities.service';
import { MixpanelService } from '../utilities/mixpanel.service';
import { TeamdetailsPage } from '../teamdetails/teamdetails.page';
import { ROLES } from '../constants';

export interface overview{
  roleName:string;
  rolecount:number;
  active:boolean;
}

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
  master:number=0;
  teamheads:number=0;

  teamDesigner:User[]=[];
  teamAnalyst:User[]=[]
  teamPeengineer:User[]=[];
  teamSurveyor:User[]=[];


  user: any
  unreadCount;
  roles: any;
  isTeamData:boolean=false;
  activedesignjobs: any;

  listOfAssignees: User[] = [];
  data: any;
  overviewData:overview[]=[];

  filterTeamData:User[];

  constructor(private router: Router,
    private storage: StorageService,
    private apiService: ApiService,
    public utils: UtilitiesService,
    private network: NetworkdetectService,
    private iab: InAppBrowser,
    private platform: Platform,
    public modalController: ModalController,
    private mixpanelService: MixpanelService,
    private toastController:ToastController,
    private alertController:AlertController){
    // private formBuilder: FormBuilder,
    // private cdr:ChangeDetectorRef) {
    const url = this.router.url;

    this.user = this.storage.getUser();

    this.getRoles();
  }

  segmentChanged(event){
    // this.skip=0;

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
    this.isTeamData=false;
    this.getNotificationCount();
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
    this.apiService.getDynamicRoles(parentId,roleId).subscribe((res:any)=>{

      if (res.length == 0) {
        this.apiService.getDefaultRoles(roleId).subscribe((response) => {
          this.roles = response;
          this.TeamRefreshSubscription = this.utils.getteamModuleRefresh().subscribe((result) => {
            this.getTeams(null);
          })
        })
      }
      else{
        res.forEach((element , i)=>{
          if(element.role.id == ROLES.PeAdmin){
            res.splice(i,1);
          }
         })
         this.roles = res;
         this.TeamRefreshSubscription = this.utils.getteamModuleRefresh().subscribe((result) => {
          this.getTeams(null);
        })
      }
    })
  }

  getTeamData(event,showLoader:boolean) {
    //this.utils.showLoading("Getting Team Data").then(() => {
      // this.roles = [];
    this.overviewData = [];
    this.isTeamData=false;

      this.teamData=[];
      this.listOfteamData = [];
      this.bd = 0;
      this.admin = 0;
      this.designers = 0;
      this.analysts = 0;
      this.surveyor=0;
      this.peengineer = 0;
      this.teamheads = 0;
      this.master = 0;
      this.all = 0;
      // this.utils.showLoadingWithPullRefreshSupport(showLoader, 'Getting Team Data').then((success) => {
      this.apiService.getTeamData().subscribe((res) => {

         this.isTeamData=true;
            this.teamData = res;
            this.filterTeamData = this.teamData;

            this.listOfteamData = res;
        //  this.utils.hideLoadingWithPullRefreshSupport(showLoader).then(() => {
          if (res.length > 0) {

            res.forEach(element=>{
              // if(element.role.id==3)
              // {
              //   this.teamBd.push(element);
              //   ++this.bd;

              // }
              // else if(element.role.id==5)
              // {
              //   this.teamAdmin.push(element);
              //   ++this.admin;

              // }
              // else if(element.role.id==8)
              // {
              //   this.teamDesigner.push(element);
              //   ++this.designers;

              // }
              // else if(element.role.id==10)
              // {
              //   this.teamAnalyst.push(element);
              //   ++this.analysts;
              // }
              // else if(element.role.id==9)
              // {
              //   this.teamSurveyor.push(element);
              //   ++this.surveyor;
              // }
              // else if(element.role.id==11)
              // {
              //   this.teamPeengineer.push(element);
              //   ++this.peengineer;
              //
              // }
              // else if(element.role.id==24)
              // {
              //   ++this.teamheads;
              // }
              switch (element.role.displayname) {
                case "Admin":
                  this.teamAdmin.push(element);
                  ++this.admin;
                  break;
                case "Design Manager":
                  this.teamBd.push(element);
                  ++this.bd;
                  break;
                case  "BD" :
                  this.teamBd.push(element);
                  ++this.bd;
                    break;
                case  "Sales Manager" :
                  this.teamBd.push(element);
                  ++this.bd
                      break;
                case "Master":
                  ++this.master;
                  break;
                case "Team Head":
                  ++this.teamheads;
                  break;
                case "Designer":
                  this.teamDesigner.push(element);
                  ++this.designers;
                  break;
                case "Surveyor":
                  this.teamSurveyor.push(element);
                  ++this.surveyor ;
                  break;
                case "Sales Representative":
                  this.teamSurveyor.push(element);
                  ++this.surveyor ;
                    break;
                case "Analyst":
                  this.teamAnalyst.push(element);
                  ++this.analysts;
                  break;
                case "PE Engineer":
                  this.teamPeengineer.push(element);
                  ++this.peengineer ;
                  break;
                case ("Master Electrician"):
                  ++this.master ;
                    break;
              }
            })

            // res.forEach(element=>{
            //   if(element.role.id==7)
            //   {
            //     this.teamAdmin.push(element);
            //     ++this.admin;
            //
            //   }
            // })
            this.all = res.length;
            this.roles.forEach(element=>{
              let roleCount;
              switch (element.displayname) {
                case "Admin":
                  roleCount = this.admin;
                  break;
                case "Design Manager":
                  roleCount = this.bd;
                  break;
                case  "BD" :
                  roleCount = this.bd;
                    break;
                case  "Sales Manager" :
                  roleCount = this.bd
                      break;
                case "Master":
                  roleCount = this.master;
                  break;
                case "Team Head":
                  roleCount = this.teamheads;
                  break;
                case "Designer":
                  roleCount = this.designers;
                  break;
                case "Surveyor":
                  roleCount = this.surveyor ;
                  break;
                case "Sales Representative":
                  roleCount = this.surveyor ;
                    break;
                case "Analyst":
                  roleCount = this.analysts;
                  break;
                case "PE Engineer":
                  roleCount = this.peengineer ;
                  break;
                case ("Master Electrician"):
                  roleCount = this.master ;
                    break;
              }
              this.overviewData.push({roleName:element.displayname,rolecount:roleCount,active:false})
            })
            let AllOverviewCount = 0
            this.overviewData.forEach(element=>{
            AllOverviewCount += element.rolecount
            })
            this.overviewData.push({roleName:"All",rolecount:AllOverviewCount,active:true})

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

  filterAdmin(value,index)
  {
    if(value=="All")
    {
      value = '';
    }

    for(let i=0; i<this.overviewData.length; i++){
      if(i === index){
         this.overviewData[i].active = true;
       } else{
         this.overviewData[i].active = false;
       }
     }
     value = value.trim().toLowerCase();
      this.teamData = this.filterTeamData.filter(function (tag) {
        let searchResult;
        let searchbyrole = tag.role.displayname.toLowerCase().indexOf(value) >= 0;
        searchResult = searchbyrole;
        return searchResult;
      });
    // if(value=='admin')
    // {
    // this.teamData = [];
    // this.teamData = this.teamAdmin;
    // }
    // else if(value=='bd')
    // {
    //   this.teamData = [];
    //   this.teamData = this.teamBd;
    // }
    // else if(value == 'designers')
    // {
    //   this.teamData = [];
    //   this.teamData = this.teamDesigner;
    // }
    // else if(value =='analysts')
    // {
    //   this.teamData = [];
    //   this.teamData = this.teamAnalyst;
    // }
    // else if(value == 'peengineer')
    // {
    //   this.teamData = [];
    //   this.teamData = this.teamPeengineer;
    // }
    // else if(value == 'surveyor')
    // {
    //   this.teamData=[];
    //   this.teamData = this.teamSurveyor;
    // }
    // else if(value == 'all')
    // {
    //   this.teamData = [];
    //   this.teamData=this.listOfteamData;
    // }
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

    let objToSend: NavigationExtras = {
      queryParams: {
       teamRoles:this.roles,


      },
      skipLocationChange: false,
      fragment: 'top'
    };



    this.router.navigate(['/teamschedule'], {
    state: { productdetails: objToSend }
    });

  }

  edit(data){
    this.modalController.dismiss({'dismissed':true})

   // this.route.navigate(['/teamschedule/'+this.designData.id])
   let objToSend: NavigationExtras = {
    queryParams: {
     teamData:data,
     teamRoles:this.roles


    },
    skipLocationChange: false,
    fragment: 'top'
  };



  this.router.navigate(['/teamschedule/'+data.id], {
  state: { productdetails: objToSend }
  });
  }

  async deleteTeam(data) {
    this.data = data;
    // this.enableDisable = true;
    const toast = await this.toastController.create({
      header: 'Delete Team Member',
      message: 'Are you sure you want to delete this Team Member ?',
      cssClass: 'my-custom-delete-class',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.getStatusCount(data)
            // this.deleteTeamFromServer(data);
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

    this.utils.showLoading('Deleting Team Member').then((success) => {
      this.apiService.deleteTeam(data.id).subscribe((result) => {

        this.utils.hideLoading().then(() => {
          this.utils.showSnackBar(data.firstname + " " + 'has been deleted successfully');
        //  this.navController.pop();
        this.modalController.dismiss({'dismissed':true})


        this.router.navigate(['/teamhomepage'])
         this.utils.setteamModuleRefresh(true);
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

  getStatusCount(data) {
    // let statuscount:any
    this.apiService.getActiveJobsCount(data.id).subscribe(
      response => {
        this.activedesignjobs = response;
        // this.activedesignjobs = statuscount.waitingforassigned + statuscount.waitingforacceptance + statuscount.requestaccepted + statuscount.designassigned
        //   + statuscount.reviewassigned + statuscount.reviewpassed + statuscount.reviewfailed;
        //
        // ++this.activedesignjobs;
        if(!this.activedesignjobs){
          this.deleteTeamFromServer(data);

        }else{
          this.openreviewPassed(data);
        }
            }
      ,
      error => {
        this.utils.errorSnackBar("Error");
      })
  }

  async openreviewPassed(data:any){


    // this.designId=id
    const alert = await this.alertController.create({
      cssClass: 'alertClass',
      header: 'Confirm!',
      message: 'Selected user is having active jobs in the account, either move all jobs to unassigned stage or transfer them to another user.',
      inputs: [
        // {
        //   name: 'radio1',
        //   type: 'radio',
        //   label: 'Unassign jobs',
        //   value: 'unassignedjobs',
        //   handler: () => {
        //
        //   },
        //   checked: true
        // },
        {
          name: 'radio2',
          type: 'radio',
          label: 'Transfer jobs',
          value: 'transferjobs',
          handler: () => {

          },
          checked: true
        },
        ] ,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {

          }
        }, {
          text: 'Move',
          handler: (alertData) => {

            var postData= {};
            // if(alertData == 'unassignedjobs')
            // {
            //   postData = {blocked: true }
            //   this.utils.showLoading("Unassigning Jobs").then(()=>{
            //   this.apiService.unassignedJobs(data.id,postData).subscribe((res)=>{
            //
            //     this.utils.hideLoading().then(()=>{
            //       this.utils.showSnackBar("Jobs Unassigned Successfully");
            //       // this.router.navigate(['/teamhomepage']);
            //       this.modalController.dismiss({ 'dismissed': true })
            //     this.router.navigate(['/teamhomepage'])
            //       this.utils.setteamModuleRefresh(true);
            //     })
            //   },(error)=>{
            //     this.utils.hideLoading();
            //   })
            // })
            // }
            // else if(alertData == 'transferjobs')
            // {
              // this.apiservices.getCompanyUsers(this.data.parent.id,this.data.role.id).subscribe((res)=>{
              //
              // })

              if (this.listOfAssignees.length === 0) {
                this.utils.showLoading('Getting Users').then(() => {
                  this.apiService.getCompanyUsers(data.parent.id,data.role.id).subscribe((assignees:any)=>{
                    this.utils.hideLoading().then(() => {
                      this.listOfAssignees = [];
                      // this.listOfAssignees.push(this.utils.getDefaultAssignee(this.storage.getUserID()));
                      assignees.forEach(item => this.listOfAssignees.push(item));


                      this.showBottomDraw = true;
                      // this.designId = id;
                      this.utils.setBottomBarHomepage(false);
                      this.drawerState = DrawerState.Docked;
                      this.assignForm.patchValue({
                        assignedto: ''
                      });
                    });
                  }, (error) => {
                    this.utils.hideLoading().then(() => {
                      this.utils.errorSnackBar('Some error occurred. Please try again later');
                    });
                  });
                });

              } else {
                // this.designId = id;
                this.utils.setBottomBarHomepage(false);
                this.drawerState = DrawerState.Docked;
                this.assignForm.patchValue({
                  assignedto: ''
                });
              }

            // }

          }
        }
      ]
    });

    await alert.present();
    }

    transferJobs()
    {
      var postData = {
        blocked: true }
              this.utils.showLoading("Transfering Jobs").then(()=>{
              this.apiService.transferJobs(this.data.id,this.selectedDesigner.id,postData).subscribe((res)=>{

                this.utils.hideLoading().then(()=>{
                  this.utils.showSnackBar("Jobs Transfered Successfully");
                  this.modalController.dismiss({ 'dismissed': true })
                 this.router.navigate(['/teamhomepage'])
           this.utils.setteamModuleRefresh(true);

                })
              },(error)=>{
                this.utils.hideLoading();
              })
            })
    }
}
