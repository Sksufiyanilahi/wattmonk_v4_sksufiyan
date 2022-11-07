import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { DrawerState } from 'ion-bottom-drawer';
import { ApiService } from 'src/app/services/api/api.service';
import { MixpanelService } from 'src/app/services/mixpanel/mixpanel.service';
import { NetworkDetectService } from 'src/app/services/network-detect/network-detect.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { AssigneeModel } from 'src/app/models/assignee.model';
import { Pestamp, PEstampCount } from 'src/app/models/pestamp.model';
import { Company } from 'src/app/models/company.model';

import { NavigationExtras, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CometChat } from '@cometchat-pro/cordova-ionic-chat';
import { identity, Subscription } from 'rxjs';
import { FileTransfer, FileTransferObject } from '@awesome-cordova-plugins/file-transfer/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { LaunchNavigator, LaunchNavigatorOptions } from '@awesome-cordova-plugins/launch-navigator/ngx';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { AlertController, IonContent, ModalController, Platform } from '@ionic/angular';
import { filter } from 'rxjs/operators';
import { COMETCHAT_CONSTANTS } from 'src/app/services/constants';
import { FilterPage } from '../../filter/filter.page';
import { SortingFilterPage } from '../../sorting-filter/sorting-filter.page';
import { peengineerFilterpagePage } from '../../peengineerfilterpage/peengineerfilterpage.page';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { EmailModelPage } from '../../email-model/email-model.page';
import { ErrorModel } from 'src/app/models/error.model';
import { DeclinePage } from '../../decline/decline.page';
import { ResendDialogPage } from '../../resend-dialog/resend-dialog.page';
import { ROLES } from 'src/app/services/constants';
@Component({
  selector: 'app-pestamp-design',
  templateUrl: './pestamp-design.component.html',
  styleUrls: ['./pestamp-design.component.scss'],
})



export class PestampDesignComponent implements OnInit {
  @ViewChild('content', { static: false }) content: IonContent;
  assignForm: FormGroup
  drawerState = DrawerState.Bottom;
  userData: any;
  segments: any;

  listOfDesigns: Pestamp[];
  listOfDesignsHelper: any[];
  overdue: any;

  noDesignFound: string = '';
  showBottomDraw: boolean = false;
  private PeStampRefreshSubscription: Subscription;

  designerData: any;
  assigneeData: any;
  //assignedTo:any;

  listOfAssignees: AssigneeModel[] = [];
  //listOfAssignees:any[];
  designId = 0;
  selectedPeEngineer: any;
  skip: number = 0;
  limit: number = 20;
  deactivateNetworkSwitch: Subscription;
  netSwitch: boolean;
  acceptid: any;
  storageDirectory: string;

  updatechat_id: boolean = false;
  isclientassigning: boolean = false;
  requesttype: String
  today: any;
  todaysdate: string;
  options: LaunchNavigatorOptions = {
      start: '',
      app: this.launchNavigator.APP.GOOGLE_MAPS
  };
  PEstampCounts: PEstampCount = <PEstampCount>{};

  memberId: string;
  engineerId: string;

  memberValue: string;
  isFilterApplied: boolean = false;
  isengFilterApplied: boolean =false;
  assignedId: any;
  assignedAnalystId: any;

  segmentValue: string;

  //showLoader= true;
  clientList: Company[];

  public userAccessRights: any = {};
  public isClient: boolean = true;
  public getFilterData: any = {};
  public getengFilterData: any ={};
  public isPeSuperadmin: boolean = false;

  /* sort variable*/
  public sorting: boolean = false;
  public orderbyfilterstatus = null;
  public ordertypefilterstatus = null;
  public sortingdata: string;
  public showdesign: boolean = false;
  public sortdelive: string = 'newDesign';
  public Type = 'orderbyfilterstatus';
  public statusfilter : string = 'newDesign'
  /* sort variable*/

  public priority: boolean = false;
  isPrestamp: boolean = false;
  public getsortFilterData: any ={};
  public issortingApplied: boolean = false;
    userRoleID: any;
    peStamppageCount: any;
    pestampSegment: any;
    userId: any;
    role: string;
    pestampData: any;
    sortby: string;
    filterbyId: string;
    filterID: any;
    sortorder: any;
  constructor(private storageService: StorageService,
      private utils: UtilitiesService,
      private apiService: ApiService,
      private datePipe: DatePipe,
      private cdr: ChangeDetectorRef,
      private launchNavigator: LaunchNavigator,
      private formBuilder: FormBuilder,
      private route: Router,
      private network: NetworkDetectService,
      public modalController: ModalController,
      private socialsharing: SocialSharing,
      private platform: Platform,
      private androidPermissions: AndroidPermissions,
      //private localnotification: LocalNotifications,
      private file: File,
      private transfer: FileTransfer,
      public alertController: AlertController,
      private mixpanelService: MixpanelService) {


      this.userData = this.storageService.getUser();
      this.userRoleID = this.storageService.getUser().role.id
      console.log(this.userRoleID)

      if (this.userData.role.type == 'wattmonkadmins' || this.userData.role.name == 'Admin' || this.userData.role.name == 'ContractorAdmin' || this.userData.role.name == 'BD' || this.userData.role.name == 'Team Head' || this.userData.role.name == 'SuccessManager' || this.userData.role.name == 'Master' || this.userData.role.name == 'PESuperAdmin' || this.userData.role.name == 'PEAdmin') {
          this.segments = 'status=created&status=outsourced&status=accepted&status=pesuperadminassigned&isonpriority=false';
          this.segmentValue = 'newpestamp';
      } else if (this.userData.role.type == 'clientsuperadmin' || this.userData.role.name == 'SuperAdmin' || this.userData.role.name == 'ContractorSuperAdmin') {
          this.segments = 'status=created&status=outsourced&status=accepted&&status=pesuperadminassigned&isonpriority=false';
          this.segmentValue = 'newpestamp';
      }
      const latestDate = new Date();
      this.today = datePipe.transform(latestDate, 'M/dd/yy');

      this.todaysdate = datePipe.transform(latestDate, 'yyyy-MM-dd');
      this.assignForm = this.formBuilder.group({
          assignedto: new FormControl('', [Validators.required]),
          comment: new FormControl('')
      });
      //this.mixpanelService.setUserDetails(this.userData.email,this.userData.firstname+" "+this.userData.lastname,this.userData.id)

      // get access right permission data
      this.userAccessRights = this.utils.getUserAccessRights('pestamp');

      this.isClient = this.utils.isClient();
      if (this.userData.role.id == ROLES.PESuperAdmin || this.userData.role.id == ROLES.PeAdmin) {
          this.isPeSuperadmin = true;
      }
  }

  ionViewDidEnter() {
   
      this.apiService.emitUserNameAndRole(this.userData);
      this.deactivateNetworkSwitch = this.network.networkSwitch.subscribe(data => {
          this.netSwitch = data;

          //this.newpermitsRef.update({ count: 0 });

      })

      this.network.networkDisconnect();
      this.network.networkConnect();
      this.deactivateNetworkSwitch.unsubscribe();

  }

  ionViewWillEnter(){
    this.userRoleID = this.storageService.getUser().role.id
    console.log("USERROLE ID",this.userRoleID)
}


  segmentChanged(event) {
    // this.listOfDesignsHelper = [];
    // console.log(  this.listOfDesignsHelper);
    //   console.log('segmentChanged', event.target.value);
    this.getsortFilterData = '';
    this.skip = 0;
    this.issortingApplied = false;
    // this.getsortFilterData = '';
      let stsus: string = '';
      if (!this.isClient && !this.isPeSuperadmin) {
          if (this.statusfilter === 'revision') {
              stsus = '&isinrevisionstate=true';
          }else{

              stsus = '&isinrevisionstate=false';
          }
      }else if(this.isPeSuperadmin){

          console.log('hye');
          stsus= '';

      }

      this.sortdelive = event.target.value;
      console.log("SORTDELIVE",this.sortdelive);
      
    //   if (this.ordertypefilterstatus != null && this.orderbyfilterstatus != "null"
    //       && this.orderbyfilterstatus != null) {
    //       this.sorting = true;
    //       this.sortingdata = "&orderby=" + this.orderbyfilterstatus + "&ordertype=" + this.ordertypefilterstatus;

    //       let showLoader = true;
    //       if (event != null && event !== undefined) {
    //           showLoader = false;
    //       }
    //   } else {
    //       this.sorting = false;
    //       this.sortingdata = "";
    //       this.ordertypefilterstatus = null;
    //       this.orderbyfilterstatus = null;
    //   }
      // this.skip=0;
      this.segmentValue = event.target.value;
      if (this.userData.role.type == 'wattmonkadmins' || this.userData.role.name == 'Admin' || this.userData.role.name == 'ContractorAdmin' || this.userData.role.name == 'BD' || this.userData.role.name == 'Team Head' || this.userData.role.name == 'SuccessManager' || this.userData.role.name == 'Master' || this.userData.role.name == 'PESuperAdmin' || this.userData.role.name == 'PEAdmin') {
          if (event.target.value == 'newpestamp') {
              this.segments = 'status=created&status=outsourced&status=accepted&status=pesuperadminassigned' + this.sortingdata + stsus + "&isonpriority=" + this.priority;
              this.isFilterApplied = false;
              // return this.segments;
              
          }
          else if (event.target.value == 'InStamping') {
              this.segments = "status=assigned" + this.sortingdata + stsus + "&isonpriority=" + this.priority;
              this.isFilterApplied = false;
              // return this.segments;
          }
          else if (event.target.value == 'OnHold') {
              this.segments = "status=declined" + this.sortingdata + stsus + "&isonpriority=" + this.priority;
              this.isFilterApplied = false;
              // return this.segments;
          }
          else if (event.target.value == 'completed') {
              this.segments = "status=completed" + this.sortingdata + stsus + "&isonpriority=" + this.priority;
              this.isFilterApplied = false;
              // return this.segments;
          }
          //  else if(event.target.value=='InReview'){
          //    this.segments ="requesttype=permit&status=reviewassigned&status=reviewfailed&status=reviewpassed";
          //    // return this.segments;
          //  }
          else if (event.target.value == 'delivered') {
              this.segments = "status=delivered" + this.sortingdata + stsus + "&isonpriority=" + this.priority;
              this.isFilterApplied = false;
          }



let useid;
          if(this.engineerId != null && this.engineerId != ''){
              useid = this.engineerId;
          }else{
              useid =  this.storageService.getUser().id
      
          }
          this.getDesigns(null, this.getFilterData.id,useid);
          // return this.segments;
          this.getPEstampcounts('',stsus,this.priority);



      } else if (this.userData.role.type == 'clientsuperadmin' || this.userData.role.name == 'SuperAdmin' || this.userData.role.name == 'ContractorSuperAdmin') {
          if (event.target.value == 'newpestamp') {
              this.segments = 'status=created&status=outsourced&status=accepted&&status=pesuperadminassigned' + this.sortingdata + stsus;
              this.isFilterApplied = false;
              // return this.segments;
          }
          else if (event.target.value == 'OnHold') {
              this.segments = "status=declined" + this.sortingdata + stsus;
              this.isFilterApplied = false;
              // return this.segments;
          }
          else if (event.target.value == 'InStamping') {
              this.segments = "status=assigned" + this.sortingdata + stsus;
              this.isFilterApplied = false;
              // return this.segments;
          }
          else if (event.target.value == 'completed') {
              this.segments = "status=completed" + this.sortingdata + stsus;
              this.isFilterApplied = false;
              // return this.segments;
          }
          //  else if(event.target.value=='InReview'){
          //    this.segments ="requesttype=permit&status=reviewassigned&status=reviewfailed&status=reviewpassed";
          //    // return this.segments;
          //  }
          else if (event.target.value == 'delivered') {
              this.segments = "status=delivered" + this.sortingdata + stsus;
              this.isFilterApplied = false;
          }
          let useid;
          if(this.engineerId != null && this.engineerId != ''){
              useid = this.engineerId;
          }else{
              useid =  this.storageService.getUser().id
      
          }
           this.getDesigns(null, this.getFilterData.id,useid);

      }
      // this.getsegmentdata(event.target.value);

      // this.segments = event.target.value;
      // this.DesignRefreshSubscription = this.utils.getHomepageDesignRefresh().subscribe((result) => {
      // });

      // this.dataRefreshSubscription = this.utils.getDataRefresh().subscribe((result) => {
      //   if(this.listOfDesigns != null && this.listOfDesigns.length > 0){
      //     this.formatDesignData(this.listOfDesigns);
      //   }
      // });

  }

  filtersortvalue(ordertypefilterstatus,orderbyfilterstatus,statusfilter,priority) {

      console.log('ordertypefilterstatus' , ordertypefilterstatus);
      console.log('orderbyfilterstatus' , orderbyfilterstatus);

      this.ordertypefilterstatus = ordertypefilterstatus;
      this.orderbyfilterstatus = orderbyfilterstatus;

      this.sortorder = this.ordertypefilterstatus;
      console.log('SORT ORDER IN FILTERSORT',this.sortorder);
      
    return  this.getPeStampData(this.sortorder)

      if(statusfilter !=null){

          this.filterStatusvalue(statusfilter,'');
      }

      if(priority == 'true'){
         this.prioritycheck(priority,'',''); 
      }
      if (this.ordertypefilterstatus != null && this.orderbyfilterstatus != "null"
          && this.orderbyfilterstatus != null) {
          this.sorting = true;
          this.sortingdata = "&orderby=" + this.orderbyfilterstatus + "&ordertype=" + this.ordertypefilterstatus;

          let showLoader = true;
          if (event != null && event !== undefined) {
              showLoader = false;
          }

          if (this.sortdelive == 'newpestamp') {
              this.segments = 'status=created&status=outsourced&status=accepted&&status=pesuperadminassigned' + this.sortingdata;
          } else if (this.sortdelive == 'OnHold') {
              this.segments = "status=declined" + this.sortingdata;
          } else if (this.sortdelive == 'InStamping') {
              this.segments = "status=assigned" + this.sortingdata;
          } else if (this.sortdelive == 'completed') {
              this.segments = "status=completed" + this.sortingdata;
          } else if (this.sortdelive == 'delivered') {
              this.segments = "status=delivered" + this.sortingdata;
          } else {
              this.segments = 'status=created&status=outsourced&status=accepted&&status=pesuperadminassigned' + this.sortingdata;
          }
          let useid;
          if(this.engineerId != null && this.engineerId != ''){
              useid = this.engineerId;
          }else{
              useid =  this.storageService.getUser().id
      
          }
           this.getDesigns(null, this.getFilterData.id,useid);

      }
      
      else if (this.ordertypefilterstatus != null && this.orderbyfilterstatus != "null"
      && statusfilter != null) {
      this.sorting = true;
      this.sortingdata = "&orderby=" + this.orderbyfilterstatus + "&ordertype=" + this.ordertypefilterstatus;
      console.log('segment' + this.segments + this.sortingdata);
     

      this.filterStatusvalue(statusfilter,this.sortingdata);

  }  else if (this.ordertypefilterstatus != null && this.orderbyfilterstatus != "null"
  && statusfilter != null &&  priority == 'true') {
  this.sorting = true;
  this.sortingdata = "&orderby=" + this.orderbyfilterstatus + "&ordertype=" + this.ordertypefilterstatus;
  console.log('segment' + this.segments + this.sortingdata);
 
  this.prioritycheck(priority,statusfilter,this.sortingdata); 
  //this.filterStatusvalue(statusfilter,this.sortingdata);

}
  
  
  
  
  
  else {
          this.sorting = false;

          if  (ordertypefilterstatus == "null" || orderbyfilterstatus == "null"){
              this.sortingdata = "";

              this.ordertypefilterstatus = null;
              this.orderbyfilterstatus = null;
              if (this.sortdelive == 'newpestamp') {
                  this.segments = 'status=created&status=outsourced&status=accepted&&status=pesuperadminassigned' + this.sortingdata;
              } else if (this.sortdelive == 'OnHold') {
                  this.segments = "status=declined" + this.sortingdata;
              } else if (this.sortdelive == 'InStamping') {
                  this.segments = "status=assigned" + this.sortingdata;
              } else if (this.sortdelive == 'completed') {
                  this.segments = "status=completed" + this.sortingdata;
              } else if (this.sortdelive == 'delivered') {
                  this.segments = "status=delivered" + this.sortingdata;
              } else {
                  this.segments = 'status=created&status=outsourced&status=accepted&&status=pesuperadminassigned' + this.sortingdata;
              }
              let useid;
          if(this.engineerId != null && this.engineerId != ''){
              useid = this.engineerId;
          }else{
              useid =  this.storageService.getUser().id
      
          }
               this.getDesigns(null, this.getFilterData.id,useid);

          }
      }

  }

  filterStatusvalue(statusfilter,sortingdata) {
      console.log('statusfilter',statusfilter);
              this.statusfilter = statusfilter;
      let stsus;
      let stuscountdata;
      if (this.statusfilter === 'newdesign') {
          stsus = '&isinrevisionstate=false';
          stuscountdata = 'notinrevisionstate';
      } else if (this.statusfilter === 'revision') {
          stsus = '&isinrevisionstate=true';
          stuscountdata = 'isinrevisionstate';
      } else if (this.statusfilter == "null") {
          stsus = '&isinrevisionstate=false';
          stuscountdata = '';
      }else{

          stsus = '&isinrevisionstate=false';
      }
      var creatorParentId = this.getFilterData.id;
      console.log("event" + creatorParentId);
      console.log("event" + stuscountdata);
      this.getPEstampcounts(creatorParentId, stuscountdata);

      if (this.sortdelive == 'newpestamp') {
          this.segments = 'status=created&status=outsourced&status=accepted&&status=pesuperadminassigned' + stsus +sortingdata;

      } else if (this.sortdelive == 'OnHold') {
          this.segments = "status=declined" + stsus+sortingdata;

      } else if (this.sortdelive == 'InStamping') {
          this.segments = "status=assigned" + stsus+sortingdata;

      } else if (this.sortdelive == 'completed') {
          this.segments = "status=completed" + stsus+sortingdata;

      } else if (this.sortdelive == 'delivered') {
          this.segments = "status=delivered" + stsus+sortingdata;
      } else {
          this.segments = 'status=created&status=outsourced&status=accepted&&status=pesuperadminassigned' + stsus+sortingdata;
      }
      let useid;
      if(this.engineerId != null && this.engineerId != ''){
          useid = this.engineerId;
      }else{
          useid =  this.storageService.getUser().id
  
      }
       this.getDesigns(null, this.getFilterData.id,useid);

  }

  prioritycheck(priority,statusfilter,sortingdata) {
     
      if (this.sortdelive == 'newpestamp') {
          this.segments = 'status=created&status=outsourced&status=accepted&&status=pesuperadminassigned&isonpriority=' + priority+statusfilter+sortingdata;

      } else if (this.sortdelive == 'OnHold') {
          this.segments = "status=declined&isonpriority=" + priority+statusfilter+sortingdata;

      } else if (this.sortdelive == 'InStamping') {
          this.segments = "status=assigned&isonpriority=" + priority+statusfilter+sortingdata;

      } else if (this.sortdelive == 'completed') {
          this.segments = "status=completed&isonpriority=" + priority+statusfilter+sortingdata;

      } else if (this.sortdelive == 'delivered') {
          this.segments = "status=delivered&isonpriority=" + priority+statusfilter+sortingdata;
      } else {
          this.segments = 'status=created&status=outsourced&status=accepted&&status=pesuperadminassigned&isonpriority=' + priority+statusfilter+sortingdata;
      }

      this.getPEstampcounts('', '', priority);
      let useid;
          if(this.engineerId != null && this.engineerId != ''){
              useid = this.engineerId;
          }else{
              useid =  this.storageService.getUser().id
      
          }
       this.getDesigns(null, this.getFilterData.id,useid);

  }

  ngOnInit() {
    this.userRoleID = this.storageService.getUser().role.id
    console.log("USERROLE ID",this.userRoleID)    
    this.getPEstampcounts('','',this.priority);
      //this.userData = this.storageService.getUser();
      this.mixpanelService.track("PESTAMP_PAGE_OPEN", {
      });
      this.makeDirectory();
      this.setupCometChat();
      this.PeStampRefreshSubscription = this.utils.getPeStampRefresh().subscribe((result) => {
          this.getDesigns(null);
      })

      this.userRoleID = this.storageService.getUser().role.id
      console.log(this.userRoleID)
  }

  getPEstampcounts(creatorParentId = null, stuscountdata?: string , priority?: boolean) {
      let userId = this.storageService.getUserID();

    //   this.apiService.getPEstampcounts(userId, creatorParentId ? creatorParentId: '', stuscountdata, priority).subscribe(res => {
    //       this.PEstampCounts = res;
    //   });
      this.apiService.getPestampc(userId, this.requesttype, this.userRoleID).subscribe(res => {
        // this.PEstampCounts = res;
        this.peStamppageCount = res['data']['attributes']
        console.log("this.pestamppageCount",this.peStamppageCount);
    });
  }

  getDesigns(event, creatorParentId?: string , id?: string) {

      console.log('id',id);
      this.skip = 0;
      let showLoader = true;
      if (event != null && event !== undefined) {
          showLoader = false;
      }
      this.fetchPendingDesigns(event, showLoader, creatorParentId,id);
      this.getPeStampData('');
  }

  ngOnDestroy() {
      this.PeStampRefreshSubscription.unsubscribe();
  }

  fetchPendingDesigns(event, showLoader: boolean, creatorParentId?: string ,engineerId?:string ) {
      console.log('this.segments', this.segments);

      this.noDesignFound = "";

      this.listOfDesigns = [];
      this.listOfDesignsHelper = [];
      //this.newpermitsRef.update({ count: 0 });
    //   this.isPrestamp = false;
      let use= this.storageService.getUser().id;
          this.apiService.getFilteredDesigns(this.segments, creatorParentId, this.limit, this.skip , engineerId ? engineerId : '').subscribe((response: any) => {
              this.content.scrollToTop(10);

            //   this.isPrestamp = true;
            console.log("RESP.LENGTH IS",response);

                  if (response.length) {
                    
                      this.formatDesignData(response);
                  } else {
                      this.noDesignFound = "No PE Stamp Found"
                  }
                  if (event !== null) {
                      event.target.complete();
                  }
              
          }, responseError => {
              this.utils.hideLoadingWithPullRefreshSupport(showLoader).then(() => {
                  if (event !== null) {
                      event.target.complete();
                  }
                  const error: ErrorModel = responseError.error;
                  this.utils.errorSnackBar(error.message);
              });
          });
     
  }

//   fetchPEstamp(){
//     let userID = this.storageService.getUser().id;
//      console.log("this.sortdelive",this.sortdelive)
//     //  let seg:any = this.sortdelive

//     this.apiService.getPEstampData(userID,this.limit,this.skip,this.userRoleID,this.sortdelive).subscribe((res)=>{
//         console.log(res)
//     })

//   }

getPeStampData(sortorder,filterid = null){
    console.log('id from filter in pestampdata',filterid);
    console.log("SORTING ORDER", sortorder);
    
    if (sortorder !== '') {
        this.sortby = '&orderby=' + sortorder
        console.log(this.sortby);
        
    } else {
        this.sortby = ''
    }

    if (filterid !== null ) {
        this.filterbyId = '&creatorparentids=' + "["+filterid+"]"
        console.log(this.filterbyId);

    } else {
        this.filterbyId = ''
    }
    // this.filterID = filterid
    this.userData = this.storageService.getUser();
    console.log(  "this.userData",this.userData);
    
    this.userId = this.userData.id;
  
    if(this.userRoleID == ROLES.SuperAdmin){
        this.role = 'masterrole'

         if(this.sortdelive == 'newDesign' ){
           this.pestampSegment = this.role +'/new/'+ this.userId  + this.filterbyId +  this.sortby
             console.log ("IN NEW TAB",this.sortdelive)

       }else if(this.sortdelive == 'OnHold'){
        this.pestampSegment = this.role + '/onhold/' + this.userId  + this.filterbyId +  this.sortby
        console.log ("IN ONHOLD TAB",this.sortdelive)

        }
    //     else if(this.sortdelive == 'Revision'){
    //        this.pestampSegment = this.role + '/inrevision/' + this.userId  + this.filterbyId +  this.sortby

    //    }
       else if(this.sortdelive == 'InStamping'){
           this.pestampSegment = this.role + '/assigned/' + this.userId  + this.filterbyId +  this.sortby
           console.log ("INSTAMPING",this.sortdelive)

        }
        // else if(this.sortdelive == 'completed'){
        //    this.pestampSegment = this.role + '/completed/' + this.userId  + this.filterbyId +  this.sortby
        
        // }
        else if(this.sortdelive == 'delivered'){
           this.pestampSegment = this.role + '/delivered/' + this.userId  + this.filterbyId +  this.sortby
        }
    }else if(this.userRoleID !== ROLES.SuperAdmin){
        this.role = 'slaverole/'  

        if(this.sortdelive == 'newDesign'){
           this.pestampSegment = this.role + '/new/'+ this.userId  + this.filterbyId +  this.sortby

       }
    //    else if(this.sortdelive == 'Revision'){
    //        this.pestampSegment =  this.role + '/inrevision/' + this.userId  + this.filterbyId +  this.sortby

    //    }
       else if(this.sortdelive == 'OnHold'){
           this.pestampSegment =  this.role + '/onhold/' + this.userId  + this.filterbyId +  this.sortby

        }else if(this.sortdelive == 'InDesign'){
        this.pestampSegment = this.role + '/indesigning/' + this.userId  + this.filterbyId +  this.sortby

        }else if(this.sortdelive == 'completed'){
            //this.pestampSegment = 'designcompleted/'   
            // no api available
        }
        // else if(this.sortdelive == 'InReview'){
        //     //this.pestampSegment = 'inreview/'
        //     // no api available

        // }
        else if(this.sortdelive == 'delivered'){
           this.pestampSegment = this.role + '/delivered/' + this.userId  + this.filterbyId +  this.sortby
        }
    }
   console.log (this.pestampSegment)
  
    this.isPrestamp = false;
    this.listOfDesignsHelper = [];

    this.apiService.getPeStampData(this.pestampSegment,this.skip,this.limit).subscribe((res:any)=>{
       console.log(res);
       this.pestampData = res.data;
       this.isPrestamp = true;

       this.content.scrollToTop(10);
console.log("RES.LENTH IS",res.length);

       if (this.pestampData.length) {
        console.log("in if loop");

        console.log("this.pestampData",this.pestampData);
        this.formatDesignData(this.pestampData);    } 
        else {
        this.noDesignFound = "No PE Stamp Found"
    }

      
    
    })
}



  doInfinite(event, creatorParentId?: string) {

      this.skip = this.skip + 20;
    //   this.apiService.getFilteredDesigns(this.segments, this.getFilterData.id ? this.getFilterData.id : '', this.limit, this.skip, this.engineerId ? this.engineerId : '').subscribe((response: any) => {


    console.log("IN DO INFINITE");
    
      this.apiService.getPeStampData(this.pestampSegment,this.skip,this.limit).subscribe
      ((response: any) => {
       console.log('res in doinfinte',response.data);
       
    if (response.data.length) {
              this.formatDesignData(response.data);
          } else {
              this.noDesignFound = "No PE Stamp Found"
          }
          if (event !== null) {
              event.target.complete();
          }
      }, responseError => {
          if (event !== null) {
              event.target.complete();
          }
          const error: ErrorModel = responseError.error;
          this.utils.errorSnackBar(error.message);
      });
  }

  formatDesignData(records: Pestamp[]) {
        console.log('REC IN FORMATDESIGN', records);
        
      this.overdue = [];
      let list: Pestamp[];

      list = this.fillinDynamicData(records);
      console.log('list', list);

      list.forEach(element => {
          this.listOfDesigns.push(element);
      })
      if (list.length > 0) {
          list.forEach((designItem: any, i) => {
              this.sDatePassed(designItem.updated_at, i);
              const listOfDesign = new DesginDataHelper();
              listOfDesign.date = this.datePipe.transform(designItem.updated_at, 'M/dd/yy');
              listOfDesign.lateby = this.overdue;
              listOfDesign.listOfDesigns.push(designItem);
              this.listOfDesignsHelper.push(listOfDesign);
          });

          this.chatIcon(list);
          this.cdr.detectChanges();

      }
      // comment on 20220310
      // this.overdue = [];
      // let list: Pestamp[];

      // list = this.fillinDynamicData(records);
      // list.forEach(element => {
      //     this.listOfDesigns.push(element);
      // })
      // const tempData: DesginDataHelper[] = [];
      // this.listOfDesigns.forEach((designItem: any, i) => {
      //     if (tempData.length === 0) {
      //         this.sDatePassed(designItem.updated_at, i);
      //         const listOfDesign = new DesginDataHelper();
      //         listOfDesign.date = this.datePipe.transform(designItem.updated_at, 'M/dd/yy');
      //         listOfDesign.lateby = this.overdue;
      //         listOfDesign.listOfDesigns.push(designItem);
      //         tempData.push(listOfDesign);
      //         ;
      //     } else {
      //         let added = false;
      //         tempData.forEach((DesignList) => {
      //             // DesignList['listOfDesigns'].forEach(element=>{



      //             //   this.sDatePassed(element.deliverydate);
      //             // })
      //             if (!added) {
      //                 if (DesignList.date === this.datePipe.transform(designItem.updated_at, 'M/dd/yy')) {
      //                     DesignList.listOfDesigns.push(designItem);
      //                     this.sDatePassed(designItem.updated_at, i);
      //                     added = true;
      //                 }
      //             }
      //         });
      //         if (!added) {
      //             ;
      //             this.sDatePassed(designItem.updated_at, i);
      //             const listOfDesign = new DesginDataHelper();
      //             listOfDesign.date = this.datePipe.transform(designItem.updated_at, 'M/dd/yy');
      //             listOfDesign.lateby = this.overdue;
      //             listOfDesign.listOfDesigns.push(designItem);
      //             tempData.push(listOfDesign);
      //             added = true;
      //         }
      //     }
      // });
      // this.listOfDesignsHelper = tempData.sort(function (a, b) {
      //     var dateA = new Date(a.date).getTime(),
      //         dateB = new Date(b.date).getTime();
      //     return dateB - dateA;
      // });

      // this.chatIcon(list);
      // this.cdr.detectChanges();
  }
  ///chat icon
  chatIcon(list: Pestamp[]) {

      list.forEach(element => {

          var groupMembersRequest = new CometChat.GroupMembersRequestBuilder(element.chatid)
              .setLimit(10)
              .build();
          groupMembersRequest.fetchNext().then(
              groupMembers => {

                  element.addedtogroupchat = true;

              },
              error => {

              }
          );
      })
      // setTimeout(() => {

      // this.utils.hideLoadingWithPullRefreshSupport(this.showLoader);
      // }, 2000);

  }

  fillinDynamicData(records: Pestamp[]): Pestamp[] {
      records.forEach((element: any) => {
          if (element.status != "delivered") {
              element.isoverdue = this.utils.isDatePassed(element.actualdelivereddate);
          } else {
              element.isoverdue = false;
          }
          // var reviewdate = new Date(element.reviewstarttime)
          // reviewdate.setHours(reviewdate.getHours()+2)
          // element.reviewremainingtime = this.utils.getRemainingTime(reviewdate.toString());
          element.lateby = this.utils.getTheLatebyString(element.actualdelivereddate);
          element.recordupdatedon = this.utils.formatDateInTimeAgo(element.updated_at);
          element.formattedpestamptype = this.utils.getPestampTypeName(element.type);
          // var acceptancedate = new Date(element.designacceptancestarttime);
          // element.designacceptanceremainingtime = this.utils.getRemainingTime(acceptancedate.toString());
          // var indesigndate = new Date(element.designstarttime);
          // indesigndate.setHours(indesigndate.getHours() + 6);
          // element.designremainingtime = this.utils.getRemainingTime(indesigndate.toString());

          if (element.email != null && element.hardcopies != null && element.type != null && element.shippingaddress != null && element.roofphotos.length > 0 && element.atticphotos.length > 0 && element.permitplan.length > 0) {
              element.isrecordcomplete = true;
          }
          //Setting acceptance timer
          if (element.status == "outsourced") {
              var acceptancedate = new Date(element.pestampacceptancestarttime);
              element.pestampacceptanceremainingtime = this.utils.getRemainingTime(acceptancedate.toString());


              if (element.pestampacceptanceremainingtime == "0h : 0m") {
                  element.isoverdue = true;
              }
          }

          //Setting design timer
          if (element.status == "assigned" || element.status == "declined" || element.status == "completed") {

              var acceptancedate = new Date(element.pestampstarttime);
              acceptancedate.setHours(acceptancedate.getHours() + 2);
              element.designremainingtime = this.utils.getRemainingTime(acceptancedate.toString());

              if (element.designremainingtime == "0h : 0m") {
                  element.isoverdue = true;
              }
          }

      });

      return records;
  }

  openAddressOnMap(address: string,event,latitude,longitude) {
      event.stopPropagation();
  
  
      if (this.platform.is('ios')) {
        //try google maps first
        this.launchNavigator.isAppAvailable(this.launchNavigator.APP.GOOGLE_MAPS).then(
            response => {
                if (response) {
                    this.launchNavigator.navigate(address, this.options);
                } else {
                    window.open('maps://?q=' + latitude + ',' + longitude, '_system');
                }
            },
            failure => {
                //check failed;
            }
        );
    } else {
        this.launchNavigator.navigate(address, this.options);
    }
  
      //this.launchNavigator.navigate(address, this.options);
    }

  dismissBottomSheet() {
      this.showBottomDraw = false;

      this.drawerState = DrawerState.Bottom;
      this.utils.setBottomBarHomepage(true);
      this.assignForm.get('comment').setValue("");
      this.listOfAssignees = [];


  }

  assignToPeEngineer() {
      //if(this.assignForm.status === 'INVALID' && (  this.designerData.status === 'designcompleted' ||this.designerData.status === 'reviewassigned' || this.designerData.status === 'reviewfailed' || this.designerData.status === 'reviewpassed')){
      if (this.assignForm.status === 'INVALID') {
          this.utils.errorSnackBar('Please select a pe engineer');
      }
      // else if( this.assignedTo!=null && (this.selectedPeEngineer.id==this.assignedTo.id)){
      //   this.utils.errorSnackBar("This design request has been already assigned to"+" "+this.selectedPeEngineer.firstname+" "+this.selectedPeEngineer.lastname)

      // }
      else {
          var pestampstarttime = new Date();
          var pestampacceptancestarttime = new Date();
          var additonalhours = 0;
          additonalhours = this.selectedPeEngineer.jobcount * 2;
          pestampstarttime.setHours(pestampstarttime.getHours() + additonalhours);
          pestampacceptancestarttime.setMinutes(pestampacceptancestarttime.getMinutes() + 15);

          var postData = {};
          if (this.designerData.type != 'both') {
              postData = {
                  assignedto: this.selectedPeEngineer.id,
                  status: "assigned",
                  pestampstarttime: pestampstarttime
              }
          }
          else {

              if (this.requesttype == 'electrical') {
                  postData = {
                      electricalassignedto: this.selectedPeEngineer.id,
                      iselectricalassigned: true,
                      status: "assigned",
                      pestampstarttime: pestampstarttime
                  };
              }
              else if (this.requesttype == 'structural') {
                  postData = {
                      structuralassignedto: this.selectedPeEngineer.id,
                      isstructuralassigned: true,
                      status: "assigned",
                      pestampstarttime: pestampstarttime
                  };
              }

          };
          this.utils.showLoading('assigning').then(() => {
              this.apiService.assignPestamps(this.designId, postData).subscribe(res => {

                  this.utils.hideLoading().then(() => {
                      this.addUserToGroupChat(res.chatid);
                      this.utils.showSnackBar('successfully assigned to' + ' ' + this.selectedPeEngineer.firstname + ' ' + this.selectedPeEngineer.lastname);
                      this.route.navigate(["pestamp-home/pestamp-design"]);
                      this.dismissBottomSheet();
                      this.showBottomDraw = false;
                      this.utils.setPeStampRefresh(true);
                  })
              }, (error) => {
                  this.utils.hideLoading().then(() => {
                      this.utils.errorSnackBar('Some error occurred. Please try again later');
                      this.dismissBottomSheet();
                      this.showBottomDraw = false;
                  });
              }
              )
          })
      }
  }

  accept(id, data: string, event) {
      event.stopPropagation();
      this.mixpanelService.track("ACCEPT_PESTAMP_DESIGN_PAGE_OPEN", {
      });
      this.acceptid = id;
      let status = {
          status: data
      }
      this.utils.showLoading("accepting").then(() => {
          this.apiService.assignPestamps(id, status).subscribe((res: any) => {
              this.createNewDesignChatGroup(res);
              this.utils.hideLoading().then(() => {
                  if (this.updatechat_id) {
                      this.utils.setPeStampRefresh(true);
                  } else {
                      this.utils.setPeStampRefresh(true);
                  }

                  // this.utils.showSnackBar("Design request has been accepted successfully.")
                  // this.utils.setPeStampRefresh(true);
              })
          })
      })

  }

  openDesigners(id: number, designData, event) {
      event.stopPropagation();
      ;
      this.mixpanelService.track("ASSIGN_PESTAMP_DESIGN_PAGE_OPEN", {
      });
      this.listOfAssignees = [];

      this.designerData = designData;
      //this.assignedTo=designData.assignedto;
      if ((this.userData.role.type == 'clientsuperadmin' || this.userData.role.type == 'clientadmin') && this.designerData.status == 'created') {
          //this.route.navigate(["pestamp-payment-modal",{id:id,designData:this.designerData.requesttype}])
          let objToSend: NavigationExtras = {
              queryParams: {
                  designData: designData,
                  value: 'assign'
              },
              skipLocationChange: false,
              fragment: 'top'
          };


          this.route.navigate(['/pestamp-payment-modal'], {
              state: { productdetails: objToSend }
          });


      }

      else {
          if (this.listOfAssignees.length === 0) {
              this.utils.showLoading('Getting Pe Engineers').then(() => {
                  this.apiService.getPeEngineers(designData.type).subscribe((assignees: any) => {
                      this.utils.hideLoading().then(() => {
                          this.listOfAssignees = [];
                          //   // this.listOfAssignees.push(this.utils.getDefaultAssignee(this.storage.getUserID()));
                          assignees.forEach(item => this.listOfAssignees.push(item));

                          this.showBottomDraw = true;
                          this.designId = id;
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
              this.designId = id;
              this.utils.setBottomBarHomepage(false);
              this.drawerState = DrawerState.Docked;
              this.assignForm.patchValue({
                  assignedto: ''
              });
          }
      }
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

  refreshDesigns(event) {
      this.skip=0;
      let showLoader = true;
      if (event !== null && event !== undefined) {
          showLoader = false;
      }
      this.getPEstampcounts();
      this.fetchPendingDesigns(event, showLoader, this.getFilterData.id ? this.getFilterData.id : '' , this.engineerId ? this.engineerId : '');
      this.getPeStampData('');
    }

  /*async OpenPaymentmodal(id){

  const modal = await this.modalController.create({
    component: PaymentModalPage,
    cssClass: 'my-custom-modal-css',
    componentProps: {
      id:id,
      designData:this.designerData
    },
    backdropDismiss:false
  });
  modal.onDidDismiss().then((data) => {

    if(data.data.cancel=='cancel'){
    }else{
      this.getDesigns(null)
    }
});
  // modal.dismiss(() => {
  //   ;
  //   this.getDesigns(null);
  // });
  return await modal.present();

  }
*/

  async decline(id, e, event) {
      event.stopPropagation();
      this.mixpanelService.track("DECLINE_PESTAMP_DESIGN_PAGE_OPEN", {
      });
      let status = e;

      const modal = await this.modalController.create({
          component: DeclinePage,
          cssClass: 'my-custom-modal-css',
          componentProps: {
              id: id,
              value: status

          },
          backdropDismiss: false
      });
      modal.onDidDismiss().then((data) => {

          if (data.data.cancel == 'cancel') {
          } else {
              this.getDesigns(null, this.getFilterData.id)
          }
      });
      // modal.dismiss(() => {
      //   ;
      //   this.getDesigns(null);
      // });
      return await modal.present();
  }


  async Resend(id, type, event) {
      event.stopPropagation();
      this.mixpanelService.track("RESEND_PESTAMP_DESIGN_PAGE_OPEN", {
      });

      const modal = await this.modalController.create({
          component: ResendDialogPage,
          cssClass: 'my-custom-modal-css',
          componentProps: {
              id: id,
              requesttype: type

          },
          backdropDismiss: false
      });
      modal.onDidDismiss().then((data) => {

          if (data.data.cancel == 'cancel') {
          } else {
              this.getDesigns(null, this.getFilterData.id)
          }
      });
      // modal.dismiss(() => {
      //   ;
      //   this.getDesigns(null);
      // });
      return await modal.present();
  }

  sDatePassed(datestring: string, i) {
      var checkdate = moment(datestring, "YYYYMMDD");
      var todaydate = moment(new Date(), "YYYYMMDD");
      var lateby = todaydate.diff(checkdate, "days");
      this.overdue = lateby;

  }



  // pending(value){
  //   ;
  //   if(this.userData.role.type=='SuperAdmin'){
  //       value= "requesttype=permit&status=created&status=outsourced&status=accepted&status=declined"
  //   }else{
  //     value= "requesttype=permit&status=created&status=outsourced&status=accepted"
  //   }
  // }

  getassignedata(asssignedata) {
      this.selectedPeEngineer = asssignedata;

  }

  shareWhatsapp(designData) {
      this.socialsharing.share(designData.permitdesign.url);
  }

  async shareViaEmails(id, designData) {
      const modal = await this.modalController.create({
          component: EmailModelPage,
          cssClass: 'email-modal-css',
          componentProps: {
              id: id,
              designData: designData
          },

      });
      modal.onDidDismiss().then((data) => {

          if (data.data.cancel == 'cancel') {
          } else {
              this.getDesigns(null, this.getFilterData.id)
          }
      });
      return await modal.present();
  }

  makeDirectory() {
      this.platform.ready().then(() => {
          if (this.platform.is('ios')) {
              this.storageDirectory = this.file.externalRootDirectory + '/Wattmonk/';
          } else if (this.platform.is('android')) {
              this.storageDirectory = this.file.externalRootDirectory + '/Wattmonk/';
          } else {
              this.storageDirectory = this.file.cacheDirectory;
          }
      });
  }

  designDownload(designData, event) {
      event.stopPropagation();
      this.mixpanelService.track("DOWNLOAD_PESTAMP_PAGE_OPEN", {
      });
      this.platform.ready().then(() => {
          this.file.resolveDirectoryUrl(this.storageDirectory).then(resolvedDirectory => {
              this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then(

                  err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE)
              );
              this.file.checkFile(resolvedDirectory.nativeURL, designData.stampedfiles.hash).then(data => {


                  if (data == true) {

                  } else {

                      throw { code: 1, message: 'NOT_FOUND_ERR' };
                  }

              }).catch(async err => {


                  if (err.code == 1) {
                      const fileTransfer: FileTransferObject = this.transfer.create();
                      this.utils.showLoading('Downloading').then(() => {
                          fileTransfer.download(url, this.storageDirectory + designData.stampedfiles.hash + designData.stampedfiles.ext).then((entry) => {
                              this.utils.hideLoading().then(() => {

                                  this.utils.showSnackBar("Stamped File Downloaded Successfully");

                                  // this.clickSub = this.localnotification.on('click').subscribe(data => {

                                  //   path;
                                  // })
                                 /* this.localnotification.schedule({ text: 'Stamped File Downloaded Successfully', foreground: true, vibrate: true })*/
                              }, (error) => {
                                  // handle error


                              });
                          })
                      })
                  }
              })
          })
      })

      let dir_name = 'WattMonk';
      let path = '';
      const url = designData.stampedfiles.url;
      const fileTransfer: FileTransferObject = this.transfer.create();


      let result = this.file.createDir(this.file.externalRootDirectory, dir_name, true);
      result.then((resp) => {
          path = resp.toURL();


          fileTransfer.download(url, path + designData.stampedfiles.hash + designData.stampedfiles.ext).then((entry) => {

              this.utils.showSnackBar("Stamped File Downloaded Successfully");

              // this.clickSub = this.localnotification.on('click').subscribe(data => {

              //   path;
              // })
              /*this.localnotification.schedule({ text: 'Downloaded Successfully', foreground: true, vibrate: true })*/
          }, (error) => {
              // handle error
          });
      })


  }

  // async openreviewPassed(id,designData){
  //   const modal = await this.modalController.create({
  //     component: PestampdelivermodalPage,
  //     cssClass: 'deliver-modal-css',
  //     componentProps: {
  //       id:id,
  //       designData:designData
  //     },
  //     backdropDismiss:false
  //   });
  //   modal.onDidDismiss().then((data) => {

  //     if(data.data.cancel=='cancel'){
  //     }else{
  //       this.getDesigns(null)
  //     }
  // });
  //   // modal.dismiss(() => {
  //   //   ;
  //   //   this.getDesigns(null);
  //   // });
  //   return await modal.present();
  // this.designId=id
  // const alert = await this.alertController.create({
  //   cssClass: 'alertClass',
  //   header: 'Confirm!',
  //  // message:'Would you like to  Add Comments!!',
  //   inputs:
  //    [
  //      {name:'charges',
  //    id:'charges',
  //    type:'text',
  //    placeholder:'Enter Delivery Charges'
  //     },
  //      {name:'comment',
  //    id:'comment',
  //       type:'textarea',
  //       //label:'Would you like to  Add Comments!!',
  //     placeholder:'Enter Comment'}
  //     ] ,
  //   buttons: [
  //     {
  //       text: 'Cancel',
  //       role: 'cancel',
  //       cssClass: 'secondary',
  //       handler: (blah) => {

  //       }
  //     }, {
  //       text: 'deliver',
  //       handler: (alertData) => {
  //         var postData= {};
  //         var deliverycharges;
  // if(designData.modeofstamping == 'hardcopy' || designData.modeofstamping =='both' ){

  //   if(alertData.charges ==='undefined' || alertData.charges ==='' || alertData.charges === null){

  //     //alertData.deliverycharges.setValidators([Validators.required]);
  //     this.utils.errorSnackBar("Please Enter Delivery Charges");
  //     return;
  //   }

  //   deliverycharges = alertData.charges;
  // } else {
  //   deliverycharges = 0;
  // }

  //         if(alertData.comment!=""){
  //          postData = {
  //           status: "delivered",
  //           deliverycharges: deliverycharges,
  //           comments: alertData.comment ,
  //            };}
  //            else{
  //             postData = {
  //               status: "delivered",
  //               deliverycharges: deliverycharges
  //                };
  //            }

  //            this.apiService.updatePestamps(this.designId,postData).subscribe((value) => {
  //             this.utils.hideLoading().then(()=>{
  //               ;

  //              this.utils.showSnackBar('Pe Stamp request has been delivered successfully');

  //               this.utils.setPeStampRefresh(true);
  //             })
  //           }, (error) => {
  //             this.utils.hideLoading();
  //             ;
  //           });
  //       }
  //     }
  //   ]
  // });

  // await alert.present();



  //}

  clearPendingPayments(designData, event) {
      event.stopPropagation();
      this.mixpanelService.track("PESTAMP_PENDING_PAYMENTS_PAGE_OPEN", {
      });
      let objToSend: NavigationExtras = {
          queryParams: {
              designData: designData,
              value: 'clearDues'
          },
          skipLocationChange: false,
          fragment: 'top'
      };


      this.route.navigate(['/pestamp-payment-modal'], {
          state: { productdetails: objToSend }
      });
  }

  //createChatGroup(design:DesginDataModel){
  // var GUID = 'permit' + "_" + new Date().getTime();

  // var address = design.address.substring(0, 90);
  // var groupName = design.name + "_" + address;

  // var groupType = CometChat.GROUP_TYPE.PASSWORD;
  // var password = design.groupchatpassword;

  // var group = new CometChat.Group(GUID, groupName, groupType, password);

  // CometChat.createGroup(group).then(group=>{
  //   let membersList = [
  //     new CometChat.GroupMember("" + design.createdby.id, CometChat.GROUP_MEMBER_SCOPE.ADMIN)
  //   ];
  //   CometChat.addMembersToGroup(group.getGuid(),membersList,[]).then(response=>{
  //     this.cdr.detectChanges();
  //   })
  // })
  //}

  createNewDesignChatGroup(design: Pestamp) {
      var GUID = 'pestamp' + "_" + new Date().getTime();
      //var address = design.deliveryaddress.substring(0, 60);
      var groupName = design.type + "_" + design.personname + "_" + design.email;

      var groupType = CometChat.GROUP_TYPE.PASSWORD;
      var password = design.groupchatpassword;

      var group = new CometChat.Group(GUID, groupName, groupType, password);

      CometChat.createGroup(group).then(
          group => {
              let membersList = [
                  new CometChat.GroupMember("" + design.createdby.id, CometChat.GROUP_MEMBER_SCOPE.ADMIN),
                  new CometChat.GroupMember("" + this.userData.id, CometChat.GROUP_MEMBER_SCOPE.ADMIN)
              ];
              CometChat.addMembersToGroup(group.getGuid(), membersList, []).then(
                  response => {
                      //if(design.requesttype == "permit"){
                      ;
                      let postdata = {
                          chatid: GUID
                      }

                      this.apiService.assignPestamps(this.acceptid, postdata).subscribe(res => {
                          this.updatechat_id = true;
                      })
                      // this.updateItemInList(LISTTYPE.NEW, design);
                      // }else{
                      //   // this.updateItemInPermitList(LISTTYPE.NEW, design);
                      // }
                  },
                  error => {
                  }
              );
          },
          error => {

          }
      );
  }

  addUserToGroupChat(chatid) {
      ;
      var GUID = chatid;
      var userscope = CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT;
      // if (this.isclientassigning) {
      //   userscope = CometChat.GROUP_MEMBER_SCOPE.ADMIN;
      // }
      let membersList = [
          new CometChat.GroupMember("" + this.selectedPeEngineer.id, userscope)
      ];
      CometChat.addMembersToGroup(GUID, membersList, []).then(
          response => {

          },
          error => {

          }
      );
  }


  setupCometChat() {
      let userId = this.storageService.getUserID()
      const user = new CometChat.User(userId);
      user.setName(this.storageService.getUser().firstname + ' ' + this.storageService.getUser().lastname);
      const appSetting = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(COMETCHAT_CONSTANTS.REGION).build();
      CometChat.init(COMETCHAT_CONSTANTS.APP_ID, appSetting).then(
          () => {

              // if(this.utilities.currentUserValue != null){
              // You can now call login function.
              CometChat.login(userId, COMETCHAT_CONSTANTS.API_KEY).then(
                  (user) => {

                  },
                  error => {

                  }
              );
              // }
          },
          error => {

          }
      );
  }


  directAssignToWattmonk(id: number, design, event) {
      event.stopPropagation();
      this.mixpanelService.track("REASSIGN_PESTAMP_DESIGN_PAGE_OPEN", {
      });
      this.designId = id;

      var postData = {};
      var pestampacceptancestarttime = new Date();
      pestampacceptancestarttime.setMinutes(pestampacceptancestarttime.getMinutes() + 15);
      if (design.declinedbypeengineer == true) {
          postData = {
              isoutsourced: "true",
              status: "assigned",
              declinedbypeengineer: 'false'
          }
      }
      else {
          postData = {
              //outsourcedto: 232,
              isoutsourced: "true",
              status: "outsourced",
              pestampacceptancestarttime: pestampacceptancestarttime
          };
      }
      this.utils.showLoading('Assigning').then(() => {
          this.apiService.updatePestamps(this.designId, postData).subscribe((value) => {
              this.utils.hideLoading().then(() => {
                  ;


                  //   if(this.userData.role.type==='clientsuperadmin' && this.designerData.status==='created')
                  //  {
                  //   this.utils.showSnackBar('Design request has been assigned to wattmonk successfully');
                  //  }else{
                  this.utils.showSnackBar('Pe Stamp request has been reassigned to WattMonk successfully');

                  //this.dismissBottomSheet();
                  //this.showBottomDraw = false;
                  this.utils.setPeStampRefresh(true);

              })
          }, (error) => {
              this.utils.hideLoading();
              // this.dismissBottomSheet();
              // this.showBottomDraw = false;
          });
      })
  }
  trackdesign(index, design) {
      return design.id;
  }

  gotoActivity(designData, event) {

      event.stopPropagation();
      this.route.navigate(['/activity-details' + '/' + designData.id + '/pestamp'])

  }

  gotoDetails(designData, $event) {
      // $event.preventDefault();
      // $event.stopPropagation();
      // this.route.navigate(['/pestamp-design-details/' + designData.id])
      this.utils.setPrelimId(designData);
      this.utils.setRequestType('pestamp')
      this.route.navigate(['/master-details/pestamp-details/' + designData.id])
  }

  gotoChats(designData, event) {
      event.stopPropagation();
      this.route.navigate(['/chat/' + designData.chatid])
  }

  structuralAssign(id, designData, event) {
      event.stopPropagation();

      ;
      this.mixpanelService.track("ASSIGN_PESTAMP_DESIGN_PAGE_OPEN", {
      });
      this.listOfAssignees = [];

      this.designerData = designData;
      this.requesttype = "structural"
      //this.assignedTo=designData.assignedto;
      if ((this.userData.role.type == 'clientsuperadmin' || this.userData.role.type == 'clientadmin') && this.designerData.status == 'created') {
          //this.route.navigate(["pestamp-payment-modal",{id:id,designData:this.designerData.requesttype}])
          let objToSend: NavigationExtras = {
              queryParams: {
                  designData: designData,
                  value: 'assign'
              },
              skipLocationChange: false,
              fragment: 'top'
          };


          this.route.navigate(['/pestamp-payment-modal'], {
              state: { productdetails: objToSend }
          });


      }

      else {
          if (this.listOfAssignees.length === 0) {
              this.utils.showLoading('Getting Pe Engineers').then(() => {
                  this.apiService.getPeEngineers("structural").subscribe((assignees: any) => {
                      this.utils.hideLoading().then(() => {
                          this.listOfAssignees = [];
                          //   // this.listOfAssignees.push(this.utils.getDefaultAssignee(this.storage.getUserID()));
                          assignees.forEach(item => this.listOfAssignees.push(item));

                          this.showBottomDraw = true;
                          this.designId = id;
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
              this.designId = id;
              this.utils.setBottomBarHomepage(false);
              this.drawerState = DrawerState.Docked;
              this.assignForm.patchValue({
                  assignedto: ''
              });
          }
      }

  }

  electricalAssign(id, designData, event) {
      event.stopPropagation();


      ;
      this.mixpanelService.track("ASSIGN_PESTAMP_DESIGN_PAGE_OPEN", {
      });

      this.listOfAssignees = [];

      this.designerData = designData;
      this.requesttype = "electrical"
      //this.assignedTo=designData.assignedto;
      if ((this.userData.role.type == 'clientsuperadmin' || this.userData.role.type == 'clientadmin') && this.designerData.status == 'created') {
          //this.route.navigate(["pestamp-payment-modal",{id:id,designData:this.designerData.requesttype}])
          let objToSend: NavigationExtras = {
              queryParams: {
                  designData: designData,
                  value: 'assign'
              },
              skipLocationChange: false,
              fragment: 'top'
          };


          this.route.navigate(['/pestamp-payment-modal'], {
              state: { productdetails: objToSend }
          });


      }

      else {
          if (this.listOfAssignees.length === 0) {
              this.utils.showLoading('Getting Pe Engineers').then(() => {
                  this.apiService.getPeEngineers("electrical").subscribe((assignees: any) => {
                      this.utils.hideLoading().then(() => {
                          this.listOfAssignees = [];
                          //   // this.listOfAssignees.push(this.utils.getDefaultAssignee(this.storage.getUserID()));
                          assignees.forEach(item => this.listOfAssignees.push(item));

                          this.showBottomDraw = true;
                          this.designId = id;
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
              this.designId = id;
              this.utils.setBottomBarHomepage(false);
              this.drawerState = DrawerState.Docked;
              this.assignForm.patchValue({
                  assignedto: ''
              });
          }
      }

  }



  async sort_model(t,f,p) {
      console.log("hello")
      console.log("hello",t);
        console.log("heo",f);
      const modal = await this.modalController.create({
          component: SortingFilterPage,
          cssClass: 'small-modal',
          componentProps: {
              requesttype: 'pestamp',
              issortingApplied: this.issortingApplied,
              sort:t,
                rev:f,
                prio:p
          },
          backdropDismiss: true
      });
      modal.onDidDismiss().then((data) => {
          console.log('filter data', data)
          this.getsortFilterData = data.data;
          if (this.getsortFilterData != null || this.getsortFilterData != undefined) {
              if (this.getsortFilterData.value != null) {
                  this.issortingApplied = true;
                   let create= this.getsortFilterData.value;
                   this.ordertypefilterstatus= this.getsortFilterData.ordertypefilterstatus;
                  this.orderbyfilterstatus= this.getsortFilterData.orderbyfilterstatus;
                  this.statusfilter= this.getsortFilterData.statusfilter;
                  this.priority=this.getsortFilterData.priority;
                  this.shotfilterApplied(this.getsortFilterData,this.ordertypefilterstatus,this.orderbyfilterstatus,this.statusfilter,this.priority);
              } else {
                  this.removesorting();
              }
          } else {
              this.removesorting();
          }
      })
      return await modal.present();
  }
  
  
  shotfilterApplied(sortfilterData ,ordertypefilterstatus ,orderbyfilterstatus,statusfilter,priority){
  
  
    if(sortfilterData.value != ''){
      this.filtersortvalue(ordertypefilterstatus,orderbyfilterstatus,statusfilter,priority);
      
    }
  }
  
  removesorting(): void {
      this.getsortFilterData = '';
      this.skip = 0;
      this.issortingApplied = false;
    //   if (this.sortdelive == 'newpestamp') {
    //       this.segments = 'status=created&status=outsourced&status=accepted&&status=pesuperadminassigned' ;
    //   } else if (this.sortdelive == 'OnHold') {
    //       this.segments = "status=declined" ;
    //   } else if (this.sortdelive == 'InStamping') {
    //       this.segments = "status=assigned";
    //   } else if (this.sortdelive == 'completed') {
    //       this.segments = "status=completed";
    //   } else if (this.sortdelive == 'delivered') {
    //       this.segments = "status=delivered";
    //   } else {
    //       this.segments = 'status=created&status=outsourced&status=accepted&&status=pesuperadminassigned';
    //   }
      this.getDesigns(null);
      this.getPEstampcounts();
  }

  async presentFilterModal() {
      console.log("hello")
      const modal = await this.modalController.create({
          component: FilterPage,
          cssClass: 'small-modal',
          componentProps: {
              requesttype: 'pestamp',
              isFilterApplied: this.isFilterApplied,
              memberid: this.memberId
          },
          backdropDismiss: true
      });
      modal.onDidDismiss().then((data) => {
          console.log('filter data', data)
          this.getFilterData = data.data;
          if (this.getFilterData != null || this.getFilterData != undefined) {
              if (this.getFilterData.id != null) {
                  this.isFilterApplied = true;
                  this.memberId = this.getFilterData.id;
                  this.filterApplied(this.getFilterData);
              } else {
                  this.removeFilter();
              }
          } else {
              this.removeFilter();
          }
      })
      return await modal.present();
  }



  async presentengineerFilterModal() {
      console.log("hello")
      const modal = await this.modalController.create({
          component: peengineerFilterpagePage,
          cssClass: 'small-modal',
          componentProps: {
              requesttype: 'pestamp',
              isengFilterApplied: this.isengFilterApplied,
              memberid: this.memberId
          },
          backdropDismiss: true
      });
      modal.onDidDismiss().then((data) => {
          console.log('filter data', data)
          this.getengFilterData = data.data;
          if (this.getengFilterData != null || this.getengFilterData != undefined) {
              if (this.getengFilterData.id != null) {
                  this.isengFilterApplied = true;
                  this.engineerId = this.getengFilterData.id;
                  this.engineerfilterApplied(this.getFilterData);
              } else {
                  this.removeengFilter();
              }
          } else {
              this.removeengFilter();
          }
      })
      return await modal.present();
  }

  engineerfilterApplied(filterData) {
      this.skip = 0;
      if (this.engineerId !== null && this.engineerId !== '') {
          const creatorParentId = this.engineerId;
console.log('this.engineerId',this.engineerId);

let userId = this.engineerId;

this.apiService.getPEstampcounts(userId).subscribe(res => {
  this.PEstampCounts = res;
});




this.getDesigns(null, '',creatorParentId);
      }
  }


  filterApplied(filterData) {
    console.log('FILTERDATA IN FILTER APPLIED',filterData);
        
      this.skip = 0;
      if (this.memberId !== null && this.memberId !== '') {
          let creatorParentId = this.memberId;

        //   this.getPEstampcounts(creatorParentId,this.statusfilter,this.priority);
        //   this.getDesigns(null, filterData.id);
        this.getPeStampData('',filterData.id)

      }
  }

  // remove filter when click on filtered data
  removeengFilter(): void {
      this.getengFilterData = '';
      this.skip = 0;
      this.isengFilterApplied = false;
      
      this.getDesigns(null);
      this.getPEstampcounts();
  }
  removeFilter(): void {
      this.getFilterData = '';
      this.skip = 0;
      this.isFilterApplied = false;
      this.memberId = null;
      this.getDesigns(null);
      this.getPEstampcounts();
  }

  // open mail click on email id
  onMailClick(email: string, event): void {
      event.stopPropagation();
      window.location.href = "mailto:" + email;
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
      this.route.navigate(['pestamp-schedule']);
      // const toast = await this.toastController.create({
      //     message: 'Kindly use web platform for adding a new request.',
      //     cssClass: 'my-custom-class',
      //     duration: 4000
      //   });
      //   await toast.present();
      //}

  }

  
}

export class DesginDataHelper {
  listOfDesigns: Pestamp[];
  date: any;
  lateby: any;

  constructor() {
      this.listOfDesigns = [];
  }

  shareDesign() {

  }


}
