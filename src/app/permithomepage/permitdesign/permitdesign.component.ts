import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, ModalController, Platform } from '@ionic/angular';
import { ApiService } from 'src/app/api.service';
import { NetworkdetectService } from 'src/app/networkdetect.service';
import { StorageService } from 'src/app/storage.service';
import { UtilitiesService } from 'src/app/utilities.service';
import {Storage} from '@ionic/storage';
import{SocialSharing} from '@ionic-native/social-sharing/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';
import { environment } from 'src/environments/environment';
import { Observable, Subscription } from 'rxjs';
import { DrawerState } from 'ion-bottom-drawer';
//import { DesginDataHelper } from 'src/app/homepage/design/design.component';
import { DesginDataModel, permitCounts, prelimCounts } from 'src/app/model/design.model';
import { AssigneeModel } from 'src/app/model/assignee.model';
import { ErrorModel } from 'src/app/model/error.model';
import { DeclinepagePage } from 'src/app/declinepage/declinepage.page';
import { ResendpagedialogPage } from 'src/app/resendpagedialog/resendpagedialog.page';
import * as moment from 'moment';
import { EmailModelPage } from 'src/app/email-model/email-model.page';

import { COMETCHAT_CONSTANTS } from '../../constants';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import {File } from '@ionic-native/file/ngx';
import { LocalNotifications} from '@ionic-native/local-notifications/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { CometChat } from '@cometchat-pro/cordova-ionic-chat';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { MixpanelService } from 'src/app/utilities/mixpanel.service';

//import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';

@Component({
  selector: 'app-permitdesign',
  templateUrl: './permitdesign.component.html',
  styleUrls: ['./permitdesign.component.scss'],
})
export class PermitdesignComponent implements OnInit {

  drawerState = DrawerState.Bottom;
  showSearchBar = false;
  update_version: string;
  //netSwitch: any;
  unreadCount;
  hide=true;

  listOfDesignDataHelper: DesginDataHelper[] = [];
  listOfDesignsData: DesginDataModel[] = [];
  today: any;
  options: LaunchNavigatorOptions = {
    start: '',
    app: this.launchNavigator.APP.GOOGLE_MAPS
  };
  assignForm: FormGroup;
  listOfAssignees: AssigneeModel[] = [];
  listOfAssignees2: AssigneeModel[] = [];
  designId = 0;
  disableAccept="true"
  showBottomDraw: boolean = false;
  roleType: any;
  myFiles: string[] = [];
  segments:any;
  listOfDesigns: DesginDataModel[];
  private DesignRefreshSubscription: Subscription;
  private dataRefreshSubscription: Subscription;
  listOfDesignsHelper: any[];
  overdue:any;
  todaysdate: string;
  userData: any;
  designerData: any;
  assigneeData: any;
  selectedDesigner: any;
  netSwitch: boolean;
 reviewAssignedTo:any;
 clickSub:any;
 skip:number=0;
  acceptid: any;
  limit:number=10;
  isclientassigning: boolean=false;
  deactivateNetworkSwitch: Subscription;
  noDesignFound: string='';
  storageDirectory: string;
  infinitescroll:boolean=false
 //counts
//  newpermits: Observable<any>;
//  newpermitsRef: AngularFireObject<any>;
//  newpermitscount = 0;
  updatechat_id: boolean=false;
  permitCounts: permitCounts=<permitCounts>{};

  constructor(private apiService:ApiService,
    private utils:UtilitiesService,
    private network:NetworkdetectService,
    private route:Router,
    private launchNavigator: LaunchNavigator,
    private datePipe: DatePipe,
    private cdr: ChangeDetectorRef,
    private storageservice:StorageService,
    private storage:Storage,
    private storageService:StorageService,
    public alertController: AlertController,
    public modalController: ModalController,
    private socialsharing: SocialSharing,
    private formBuilder: FormBuilder,
    private transfer : FileTransfer,
    private file: File,
    private platform:Platform,
    private androidPermissions: AndroidPermissions,
    private localnotification: LocalNotifications,
    private router:ActivatedRoute,
    private mixpanel:MixpanelService,
   // private db:AngularFireDatabase,

   // private fileopener:FileOpener
   ) {

    this.userData =this.storageservice.getUser(); // get data from resolver


    if(this.userData.role.type=='wattmonkadmins' || this.userData.role.name=='Admin'  || this.userData.role.name=='ContractorAdmin' || this.userData.role.name=='BD' ){
      this.segments= 'requesttype=permit&status=created&status=outsourced&status=requestaccepted&status=requestdeclined';
    }else if(this.userData.role.type=='clientsuperadmin' || this.userData.role.name=='SuperAdmin' || this.userData.role.name=='ContractorSuperAdmin'){
      this.segments ='requesttype=permit&status=created&status=outsourced&status=requestaccepted&&status=requestdeclined';
    }
    const latestDate = new Date();
    this.today = datePipe.transform(latestDate, 'M/dd/yy');

    this.todaysdate = datePipe.transform(latestDate, 'yyyy-MM-dd');
    this.assignForm = this.formBuilder.group({
      assignedto: new FormControl('', [Validators.required]),
      comment: new FormControl('')
    });
     //For Counts
    //  this.newpermitsRef = db.object('newpermitdesigns');
    //  this.newpermits = this.newpermitsRef.valueChanges();
    //  this.newpermits.subscribe(
    //    (res) => {

    //      this.newpermitscount = res.count;
    //      cdr.detectChanges();
    //    },


    //  )
  }



  ionViewDidEnter() {
    this.apiService.emitUserNameAndRole(this.userData);
    this.deactivateNetworkSwitch = this.network.networkSwitch.subscribe(data=>{
      this.netSwitch = data;

      //this.newpermitsRef.update({ count: 0 });
      // this.mixpanel.track("PERMITDESIGN_PAGE_OPEN", {
      //   $id: this.userData.id,
      //   $email: this.userData.email,
      //   $name: this.userData.firstname + this.userData.lastname
      // });

    })

this.network.networkDisconnect();
this.network.networkConnect();
this.deactivateNetworkSwitch.unsubscribe();

  }

  segmentChanged(event){

    if(this.userData.role.type=='wattmonkadmins' || this.userData.role.name=='Admin'  || this.userData.role.name=='ContractorAdmin' || this.userData.role.name=='BD' ){
      if(event.target.value=='newDesign'){
        this.segments ='requesttype=permit&status=created&status=outsourced&status=requestaccepted&status=requestdeclined';
        // return this.segments;
      }
      else if(event.target.value=='InDesign'){
        this.segments ="requesttype=permit&status=designassigned";
        // return this.segments;
      }
      else if(event.target.value=='completed'){
        this.segments ="requesttype=permit&status=designcompleted";
        // return this.segments;
      }
      else if(event.target.value=='InReview'){
        this.segments ="requesttype=permit&status=reviewassigned&status=reviewfailed&status=reviewpassed";
        // return this.segments;
      }
      else if(event.target.value=='delivered'){
        this.segments ="requesttype=permit&status=delivered";
      }
      this.getDesigns(null);
      // return this.segments;

    }else if(this.userData.role.type=='clientsuperadmin' || this.userData.role.name=='SuperAdmin' || this.userData.role.name=='ContractorSuperAdmin' ){
      if(event.target.value=='newDesign'){
        this.segments ='requesttype=permit&status=created&status=outsourced&status=requestaccepted&&status=requestdeclined';
        // return this.segments;
      }
      else if(event.target.value=='InDesign'){
        this.segments ="requesttype=permit&status=designassigned";
        // return this.segments;
      }
      else if(event.target.value=='completed'){
        this.segments ="requesttype=permit&status=designcompleted";
        // return this.segments;
      }
      else if(event.target.value=='InReview'){
        this.segments ="requesttype=permit&status=reviewassigned&status=reviewfailed&status=reviewpassed";
        // return this.segments;
      }
      else if(event.target.value=='delivered'){
        this.segments ="requesttype=permit&status=delivered";
      }
      this.getDesigns(null);
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

  ngOnInit() {
    let userId = this.storageService.getUserID()
    let requesttype = "permit"

      this.apiService.getPermitcounts(userId,requesttype).subscribe(res=>{this.permitCounts =res;
      })
    this.makeDirectory();
    this.setupCometChat();
    this.DesignRefreshSubscription = this.utils.getHomepagePermitRefresh().subscribe((result) => {
    this.getDesigns(null);
    });

    // this.dataRefreshSubscription = this.utils.getDataRefresh().subscribe((result) => {
    //   if(this.listOfDesigns != null && this.listOfDesigns.length > 0){
    //     this.formatDesignData(this.listOfDesigns);

    //   }
    // });
  }

  getDesigns(event) {
    this.skip=0;
    let showLoader = true;
    if (event != null && event !== undefined) {
      showLoader = false;
    }
    this.fetchPendingDesigns(event, showLoader);
  }

     accept(id,data:any,event){
       event.stopPropagation();
      this.mixpanel.track("ACCEPT_PERMIT_DESIGN_PAGE_OPEN", {
      });
      this.acceptid= id;

      var tomorrow = new Date();
     tomorrow.setHours(tomorrow.getHours() + parseInt(data.slabname));
       let status={
        status:"requestaccepted",
        deliverydate:tomorrow
      }
      this.utils.showLoading("accepting").then(()=>{
         this.apiService.updateDesignForm(status,id).subscribe((res:any)=>{
          // this.createNewDesignChatGroup(res);
           this.utils.hideLoading().then(()=>{
                if(this.updatechat_id){

                  this.utils.setHomepagePermitRefresh(true);
                }else{
                  this.utils.setHomepagePermitRefresh(true);
                }
          })})
          })

       }


   fetchPendingDesigns(event, showLoader: boolean) {
    // this.infinitescroll=false;
    this.noDesignFound="";

    this.listOfDesigns = [];
    this.listOfDesignsHelper = [];
    //this.newpermitsRef.update({ count: 0 });
    this.utils.showLoadingWithPullRefreshSupport(showLoader, 'Getting Designs').then((success) => {
      this.apiService.getDesignSurveys(this.segments,this.limit,this.skip).subscribe((response:any) => {
        this.utils.hideLoadingWithPullRefreshSupport(showLoader).then(() => {

          if(response.length){

            this.formatDesignData(response);
          }else{
            this.noDesignFound= "No Designs Found"
          }
          if (event !== null) {
            event.target.complete();
          }
        });
      }, responseError => {
        this.utils.hideLoadingWithPullRefreshSupport(showLoader).then(() => {
          if (event !== null) {
            event.target.complete();
          }
          const error: ErrorModel = responseError.error;
          this.utils.errorSnackBar(error.message[0].messages[0].message);
        });
      });
    });
  }

  formatDesignData(records : DesginDataModel[]){
    this.overdue=[];
    let list:DesginDataModel[];
   list=this.fillinDynamicData(records);
   list.forEach(element =>{
     this.listOfDesigns.push(element);
   })



    const tempData: DesginDataHelper[] = [];



      this.listOfDesigns.forEach((designItem:any,i) => {


        if (tempData.length === 0) {
          this.sDatePassed(designItem.updated_at,i);
          const listOfDesign = new DesginDataHelper();
          listOfDesign.date = this.datePipe.transform(designItem.updated_at, 'M/dd/yy');
            listOfDesign.lateby = this.overdue;
          listOfDesign.listOfDesigns.push(designItem);
          tempData.push(listOfDesign);



;
        } else {

          let added = false;
          tempData.forEach((DesignList) => {
            // DesignList['listOfDesigns'].forEach(element=>{



            //   this.sDatePassed(element.deliverydate);
            // })
            if (!added) {
              if (DesignList.date === this.datePipe.transform(designItem.updated_at, 'M/dd/yy')) {
                DesignList.listOfDesigns.push(designItem);
                this.sDatePassed(designItem.updated_at,i);
                added = true;
              }
            }
          });
          if (!added) {
            ;
            this.sDatePassed(designItem.updated_at,i);
            const listOfDesign = new DesginDataHelper();
            listOfDesign.date = this.datePipe.transform(designItem.updated_at, 'M/dd/yy');
            listOfDesign.lateby = this.overdue;
            listOfDesign.listOfDesigns.push(designItem);
            tempData.push(listOfDesign);
            added = true;
          }
        }
      });
          this.listOfDesignsHelper = tempData.sort(function (a, b) {
            var dateA = new Date(a.date).getTime(),
              dateB = new Date(b.date).getTime();
            return dateB - dateA;
          });
          this.chatIcon(list);

          this.cdr.detectChanges();
  }

  ///chat icon
  chatIcon(list:DesginDataModel[]){
    list.forEach(element => {

      var groupMembersRequest = new CometChat.GroupMembersRequestBuilder(element.chatid)
        .setLimit(10)
        .build();
      groupMembersRequest.fetchNext().then(
        groupMembers => {

          element.addedtogroupchat=true;
        },
        error => {
          // this.utils.hideLoadingWithPullRefreshSupport(this.showLoader).then(() => {
          // })

        }
      );
     // this.utils.hideLoadingWithPullRefreshSupport(this.showLoader).then(() => {
      //})
    })
  }

  ngOnDestroy(): void {
   // this.refreshSubscription.unsubscribe();
    // this.routeSubscription.unsubscribe();
 // this.dataRefreshSubscription.unsubscribe();
  this.DesignRefreshSubscription.unsubscribe();
  }

  // filterData(records : DesginDataModel[]) {

  //   this.listOfDesigns = this.fillinDynamicData(records);
  //   // let filterDataArray: any = this.listOfDesignsData.filter(x => x.id == serchTerm);
  //   const tempData: DesginDataHelper[] = [];
  //   this.listOfDesigns.forEach((desginItem) => {
  //     if (tempData.length === 0) {
  //       const listOfDesign = new DesginDataHelper();
  //       listOfDesign.date = this.datePipe.transform(desginItem.updated_at, 'M/d/yy');
  //       listOfDesign.listOfDesigns.push(desginItem);
  //       tempData.push(listOfDesign);
  //     } else {
  //       let added = false;
  //       tempData.forEach((desginList) => {
  //         if (!added) {
  //           if (desginList.date === this.datePipe.transform(desginItem.updated_at, 'M/d/yy')) {
  //             desginList.listOfDesigns.push(desginItem);
  //             added = true;
  //           }
  //         }
  //       });
  //       if (!added) {
  //         const listOfDesign = new DesginDataHelper();
  //         listOfDesign.date = this.datePipe.transform(desginItem.updated_at, 'M/d/yy');
  //         listOfDesign.listOfDesigns.push(desginItem);
  //         tempData.push(listOfDesign);
  //         added = true;
  //         this.listOfDesignDataHelper.push(listOfDesign);

  //       }
  //     }
  //   });
  //   this.listOfDesignDataHelper = tempData;
  //   this.cdr.detectChanges();
  // }

  fillinDynamicData(records : DesginDataModel[]) : DesginDataModel[]{
    records.forEach((element:any) => {
      if(element.status != "delivered"){
        element.isoverdue = this.utils.isDatePassed(element.deliverydate);
      }else{
        element.isoverdue = false;
      }
      var reviewdate = new Date(element.reviewstarttime)
      reviewdate.setHours(reviewdate.getHours()+2)
      element.reviewremainingtime = this.utils.getRemainingTime(reviewdate.toString());
      element.lateby = this.utils.getTheLatebyString(element.deliverydate);
      element.recordupdatedon = this.utils.formatDateInTimeAgo(element.updated_at);
      element.formattedjobtype = this.utils.getJobTypeName(element.jobtype);
      var acceptancedate = new Date(element.designacceptancestarttime);
      element.designacceptanceremainingtime = this.utils.getRemainingTime(acceptancedate.toString());
      var indesigndate = new Date(element.designstarttime);
      indesigndate.setHours(indesigndate.getHours() + 6);
      element.designremainingtime = this.utils.getRemainingTime(indesigndate.toString());
           //Setting acceptance timer
    if(element.status == "outsourced"){
      if(element.requesttype == "permit"){
        var acceptancedate = new Date(element.designacceptancestarttime);
        element.designacceptanceremainingtime = this.utils.getRemainingTime(acceptancedate.toString());
      }else{
        var acceptancedate = new Date(element.designacceptancestarttime);
        element.designacceptanceremainingtime = this.utils.getRemainingTime(acceptancedate.toString());
      }

      if(element.designacceptanceremainingtime == "0h : 0m"){
        element.isoverdue = true;
      }
    }

    //Setting design timer
    if(element.status == "designassigned" || element.status == "designcompleted"){
      if(element.requesttype == "permit"){
        var acceptancedate = new Date(element.designstarttime);
        acceptancedate.setHours(acceptancedate.getHours() + 6);
        element.designremainingtime = this.utils.getRemainingTime(acceptancedate.toString());
      }else{
        var acceptancedate = new Date(element.designstarttime);
        acceptancedate.setHours(acceptancedate.getHours() + 2);
        element.designremainingtime = this.utils.getRemainingTime(acceptancedate.toString());
      }
      if(element.designremainingtime == "0h : 0m"){
        element.isoverdue = true;
      }
    }

    //Setting review timer
    if(element.status == "reviewassigned" || element.status == "reviewpassed" || element.status == "reviewfailed"){
      if(element.requesttype == "permit"){
        var reviewdate = new Date(element.reviewstarttime);
        reviewdate.setHours(reviewdate.getHours() + 2);
        element.reviewremainingtime = this.utils.getRemainingTime(reviewdate.toString());
      }else{
        var reviewdate = new Date(element.reviewstarttime);
        reviewdate.setMinutes(reviewdate.getMinutes() + 15);
        element.reviewremainingtime = this.utils.getRemainingTime(reviewdate.toString());
      }
      if(element.reviewremainingtime == "0h : 0m"){
        element.isoverdue = true;
      }
    }
      // this.storage.get(''+element.id).then((data: any) => {

      //   if (data) {
      //     element.totalperceznt = data.currentprogress;
      //   }else{
      //     element.totalpercent = 0;
      //   }
      // });

    });

    return records;
  }



  // getDesign(event, showLoader: boolean) {

  //   this.listOfDesignsData = [];
  //   this.listOfDesignDataHelper = [];

  //   this.utils.showLoadingWithPullRefreshSupport(showLoader, 'Getting designs').then((success) => {
  //     // ;
  //     this.apiService.getDesignSurveys(this.segments).subscribe((response:any) => {
  //       this.utils.hideLoadingWithPullRefreshSupport(showLoader).then((loaderHidden) => {
  //         // ;
  //         if (event !== null) {
  //           event.target.complete();
  //         }

  //         this.listOfDesignsData = response;
  //          response.forEach(element => {
  //             this.roleType = element.type;
  //         });;


  //         const tempData: DesginDataHelper[] = [];
  //         this.listOfDesignsData.forEach((desginItem) => {
  //           if (tempData.length === 0) {
  //             const listOfDesign = new DesginDataHelper();
  //             listOfDesign.date = this.datePipe.transform(desginItem.updated_at, 'M/d/yy');
  //             listOfDesign.listOfDesigns.push(desginItem);
  //             tempData.push(listOfDesign);
  //           } else {
  //             let added = false;
  //             tempData.forEach((desginList) => {
  //               if (!added) {
  //                 if (desginList.date === this.datePipe.transform(desginItem.updated_at, 'M/d/yy')) {
  //                   desginList.listOfDesigns.push(desginItem);
  //                   added = true;
  //                 }
  //               }
  //             });
  //             if (!added) {
  //               const listOfDesign = new DesginDataHelper();
  //               listOfDesign.date = this.datePipe.transform(desginItem.updated_at, 'M/d/yy');
  //               listOfDesign.listOfDesigns.push(desginItem);
  //               tempData.push(listOfDesign);
  //               added = true;
  //               this.listOfDesignDataHelper.push(listOfDesign);

  //             }
  //           }
  //         });
  //         this.listOfDesignDataHelper = tempData;
  //         this.cdr.detectChanges();
  //       },responseError=>{
  //         this.utils.hideLoadingWithPullRefreshSupport(showLoader).then((loaderHidden) => {
  //           if (event !== null) {
  //             event.target.complete();
  //           }
  //           const error: ErrorModel = responseError.error;
  //           this.utils.errorSnackBar(error.message[0].messages[0].message);
  //         });
  //       });
  //     }, responseError => {
  //       this.utils.hideLoadingWithPullRefreshSupport(showLoader).then((loaderHidden) => {
  //         if (event !== null) {
  //           event.target.complete();
  //         }
  //         const error: ErrorModel = responseError.error;
  //         this.utils.errorSnackBar(error.message);
  //       });

  //     });
  //   }, (apiError) => {
  //     this.utils.hideLoadingWithPullRefreshSupport(showLoader).then(() => {
  //       if (event !== null) {
  //         event.target.complete();
  //       }
  //     });

  //   });
  // }

  openAddressOnMap(address: string,event) {
    event.stopPropagation();
    this.launchNavigator.navigate(address, this.options);
  }


  dismissBottomSheet() {
    this.hide= false;
    this.showBottomDraw = false;

    this.drawerState = DrawerState.Bottom;

    this.utils.setBottomBarHomepage(true);
    this.assignForm.get('comment').setValue("");
    this.listOfAssignees=[];


  }

  assignToDesigner() {


    if(this.assignForm.status === 'INVALID' && (  this.designerData.status === 'designcompleted' ||this.designerData.status === 'reviewassigned' || this.designerData.status === 'reviewfailed' || this.designerData.status === 'reviewpassed')){
      this.utils.errorSnackBar('Please select a analyst');
    }
    else if (this.assignForm.status === 'INVALID' && ( this.designerData.status === 'created'|| this.designerData.status === 'requestaccepted'|| this.designerData.status === 'designassigned')) {
      if(this.userData.role.type=='clientsuperadmin'){
        this.utils.errorSnackBar('Please select the WattMonk admin');
      }
      else{this.utils.errorSnackBar('Please select a designer');}
    }
    else if( this.reviewAssignedTo!=null && (this.selectedDesigner.id==this.reviewAssignedTo.id)){
      this.utils.errorSnackBar("This design request has been already assigned to"+" "+this.selectedDesigner.firstname+" "+this.selectedDesigner.lastname)

    }
    else {


      var designstarttime = new Date();
      var milisecond = designstarttime.getTime();
    var additonalhours = 0;
    if(this.designerData.requesttype == "prelim"){
      // if(this.designerData.requesttype == "permit"){

      additonalhours = parseInt(this.selectedDesigner.jobcount) * 2;

      designstarttime.setHours( designstarttime.getHours() + additonalhours );
    }else{
      additonalhours = parseInt(this.selectedDesigner.jobcount) * 6;
      designstarttime.setHours( designstarttime.getHours() + additonalhours );
    }

    var postData = {};
    if (this.designerData.createdby.id == this.userData.id) {
       ;

      // if (this.selectedDesigner.company == this.userData.company) {
        if (this.selectedDesigner.parent.id == this.userData.parent.id) {
        if(this.selectedDesigner.role.type=="qcinspector"){
          postData = {
            reviewassignedto: this.selectedDesigner.id,
            status: "reviewassigned",
            reviewstarttime: milisecond
          };
        }
       if(this.selectedDesigner.role.type=="designer") { postData = {
          designassignedto: this.selectedDesigner.id,

          isoutsourced: "false",
          status: "designassigned",
          designstarttime: designstarttime
        };

      }

     }
      else {
        var designacceptancestarttime = new Date();
      designacceptancestarttime.setMinutes(designacceptancestarttime.getMinutes() + 30);
        postData = {
          outsourcedto: this.selectedDesigner.id,
          isoutsourced: "true",
          status: "outsourced",
          designacceptancestarttime: designacceptancestarttime
        };
      }
    } else {
      if(this.selectedDesigner.role.type=="designer"){ postData = {
        designassignedto: this.selectedDesigner.id,
        status: "designassigned",
        designstarttime: designstarttime
      };}
      if(this.selectedDesigner.role.type=="qcinspector"){
        postData = {
          reviewassignedto: this.selectedDesigner.id,
          status: "reviewassigned",
          reviewstarttime: milisecond
        };
      }
    }
    this.utils.showLoading('Assigning').then(()=>{
      this.apiService.updateDesignForm(postData, this.designId).subscribe((value) => {
        this.utils.hideLoading().then(()=>{
          ;


          if(this.userData.role.type==='clientsuperadmin' && this.designerData.status==='created')
         {
          this.isclientassigning= true;
          this.utils.showSnackBar('Design request has been assigned to WattMonk successfully');
          this.addUserToGroupChat();
         }else{
          this.addUserToGroupChat();
          this.utils.showSnackBar('Design request has been assigned to' + ' ' + this.selectedDesigner.firstname +" "+this.selectedDesigner.lastname + ' ' + 'successfully');
         }
          this.dismissBottomSheet();
          this.showBottomDraw = false;
          this.utils.setHomepagePermitRefresh(true);

        })
      }, (error) => {
        this.utils.hideLoading();
        this.dismissBottomSheet();
        this.showBottomDraw = false;
      });
    })
    }

  }

  doInfinite($event){

  this.skip=this.skip+10;
  this.apiService.getDesignSurveys(this.segments,this.limit,this.skip).subscribe((response:any) => {

        if(response.length){

          this.formatDesignData(response);
        }else{
          this.noDesignFound= "No Designs Found"
        }
        // if(response.length<10){
        //   this.infinitescroll=true
        // }else{this.infinitescroll=false}
        if ($event !== null) {
          $event.target.complete();
        }
      },
   (responseError:any) => {
      if ($event !== null) {
          $event.target.complete();
        }
        const error: ErrorModel = responseError.error;
        this.utils.errorSnackBar(error.message[0].messages[0].message);

    });

  }


  openDesigners(id: number,designData,event) {
    this.hide= true;
    event.stopPropagation();
    this.mixpanel.track("ASSIGN_PERMIT_DESIGN_PAGE_OPEN", {
    });
    this.listOfAssignees=[];

    this.designerData = designData;
    this.reviewAssignedTo=designData.designassignedto;
    if((this.userData.role.type=='clientsuperadmin' || this.userData.role.type=='clientadmin')&& this.designerData.status=='created'){
      //this.route.navigate(["payment-modal",{id:id,designData:this.designerData.requesttype}])
      let objToSend: NavigationExtras = {
        queryParams: {
          id:id,
          designData:this.designerData.requesttype,
          fulldesigndata:this.designerData
        },
        skipLocationChange: false,
        fragment: 'top'
    };


this.route.navigate(['/payment-modal'], {
  state: { productdetails: objToSend }
});
    }

   else{ if (this.listOfAssignees.length === 0) {
      this.utils.showLoading('Getting Designers').then(() => {
        this.apiService.getDesigners().subscribe(assignees => {
          this.utils.hideLoading().then(() => {
            this.listOfAssignees = [];
            // this.listOfAssignees.push(this.utils.getDefaultAssignee(this.storage.getUserID()));
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
    }}
  }

  openAnalysts(id: number,designData,event) {
    event.stopPropagation();
    this.listOfAssignees=[];

    this.designerData = designData;
    this.reviewAssignedTo=designData.reviewassignedto;

    if (this.listOfAssignees.length === 0) {
      this.utils.showLoading('Getting Analysts').then(() => {
        this.apiService.getAnalysts().subscribe(assignees => {
          this.utils.hideLoading().then(() => {
            this.listOfAssignees = [];
            // this.listOfAssignees.push(this.utils.getDefaultAssignee(this.storage.getUserID()));
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

  close() {
    if (this.showBottomDraw === true) {
      this.showBottomDraw = false;
      this.drawerState = DrawerState.Bottom;
      this.utils.setBottomBarHomepage(true);
    } else {
      this.showBottomDraw = true;
    }
  }




  async openreviewPassed(id,designData,event){
    event.stopPropagation();
    this.mixpanel.track("DELIVER_PERMIT_PAGE_OPEN", {
    });
    this.designId=id
    const alert = await this.alertController.create({
      cssClass: 'alertClass',
      header: 'Confirm!',
      message:'Would you like to  Add Comments!!',
      inputs:
       [ {name:'comment',
       id:'comment',
          type:'textarea',
        placeholder:'Enter Comment'}
        ] ,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {

          }
        }, {
          text: 'deliver',
          handler: (alertData) => {
            var postData= {};
            if(alertData.comment!=""){
             postData = {
              status: "delivered",
              comments: alertData.comment ,
               };}
               else{
                postData = {
                  status: "delivered",
                   };
               }

               this.apiService.updateDesignForm(postData, this.designId).subscribe((value) => {
                this.utils.hideLoading().then(()=>{
                  ;

                 this.utils.showSnackBar('Design request has been delivered successfully');
                 this.utils.setHomepagePermitRefresh(true);
                })
              }, (error) => {
                this.utils.hideLoading();
                ;
              });
          }
        }
      ]
    });

    await alert.present();



  }


  refreshDesigns(event) {
    this.skip=0;
    let showLoader = true;
    if (event !== null && event !== undefined) {
      showLoader = false;
    }
    this.fetchPendingDesigns(event, showLoader);
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

async decline(id,event){
  event.stopPropagation();
  this.mixpanel.track("DECLINE_PERMIT_DESIGN_PAGE_OPEN", {
  });
  const modal = await this.modalController.create({
    component: DeclinepagePage,
    cssClass: 'my-custom-modal-css',
    componentProps: {
      id:id
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


async Resend(id, type,event){
  event.stopPropagation();
  this.mixpanel.track("RESEND_PERMIT_DESIGN_PAGE_OPEN", {
  });
  const modal = await this.modalController.create({
    component: ResendpagedialogPage,
    cssClass: 'my-custom-modal-css',
    componentProps: {
      id:id,
      requesttype:type

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

sDatePassed(datestring: string,i){
  var checkdate = moment(datestring, "YYYYMMDD");
  var todaydate = moment(new Date(), "YYYYMMDD");
  var lateby = todaydate.diff(checkdate, "days");
  this.overdue = lateby;

}

selfAssign(id,designData,event){
  event.stopPropagation();
  // this.mixpanel.track("SelfAssign_Permit_Design_PAGE_OPEN", {
  // });
  var designstarttime = new Date();
      var milisecond = designstarttime.getTime();
  var postData={}
  postData = {
    reviewassignedto: this.userData.id,
    status: "reviewassigned",
    reviewstarttime: milisecond
  };
  this.utils.showLoading('Assigning').then(()=>{
    this.apiService.updateDesignForm(postData,id).subscribe((value) => {
      this.utils.hideLoading().then(()=>{
        ;

      this.utils.showSnackBar('Design request has been assigned to you successfully');
      this.utils.setHomepagePermitRefresh(true);

      })
    }, (error) => {
      this.utils.hideLoading();

    });
})}



pending(value){
  ;
  if(this.userData.role.type=='SuperAdmin'){
      value= "requesttype=permit&status=created&status=outsourced&status=requestaccepted&status=requestdeclined"
  }else{
    value= "requesttype=permit&status=created&status=outsourced&status=requestaccepted"
  }
}

getassignedata(asssignedata){
  this.selectedDesigner = asssignedata;

}

shareWhatsapp(designData,event){
  event.stopPropagation();
  this.socialsharing.share(designData.permitdesign.url);
}

 async shareViaEmails(id,designData,event){
   event.stopPropagation();
  const modal = await this.modalController.create({
    component: EmailModelPage,
    cssClass: 'email-modal-css',
    componentProps: {
      id:id,
      designData:designData
    },

  });
  modal.onDidDismiss().then((data) => {

    if(data.data.cancel=='cancel'){
    }else{
      this.getDesigns(null)
    }
});
    return await modal.present();
 }

 makeDirectory(){
  this.platform.ready().then(() => {
    if (this.platform.is('ios')) {
      this.storageDirectory = this.file.externalRootDirectory+'/Wattmonk/';
    } else if (this.platform.is('android')) {
      this.storageDirectory = this.file.externalRootDirectory+'/Wattmonk/';
    } else {
      this.storageDirectory = this.file.cacheDirectory;
    }
  });
}

designDownload(designData,event){
  event.stopPropagation();
  this.mixpanel.track("DOWNLOAD_PERMIT_PAGE_OPEN", {
  });
  this.platform.ready().then(()=>{
    this.file.resolveDirectoryUrl(this.storageDirectory).then(resolvedDirectory=>{
      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then(

        err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE)
      );
      this.file.checkFile(resolvedDirectory.nativeURL,designData.permitdesign.hash).then(data=>{


        if(data==true){

        }else{

          throw { code: 1, message: 'NOT_FOUND_ERR' };
        }

      }).catch(async err=>{


        if (err.code == 1) {
          const fileTransfer: FileTransferObject = this.transfer.create();
          this.utils.showLoading('Downloading').then(()=>{
            fileTransfer.download(url, this.storageDirectory + designData.permitdesign.hash + designData.permitdesign.ext).then((entry) => {
              this.utils.hideLoading().then(()=>{

                this.utils.showSnackBar("Permit Design Downloaded Successfully");

                // this.clickSub = this.localnotification.on('click').subscribe(data => {

                //   path;
                // })
                this.localnotification.schedule({text:'Permit Design Downloaded Successfully', foreground:true, vibrate:true })
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
    const url = designData.permitdesign.url;
   const fileTransfer: FileTransferObject = this.transfer.create();


   let result = this.file.createDir(this.file.externalRootDirectory, dir_name, true);
  result.then((resp) => {
   path = resp.toURL();


   fileTransfer.download(url, path + designData.permitdesign.hash + designData.permitdesign.ext).then((entry) => {

     this.utils.showSnackBar("Permit Design Downloaded Successfully");

     // this.clickSub = this.localnotification.on('click').subscribe(data => {

     //   path;
     // })
     this.localnotification.schedule({text:'Downloaded Successfully', foreground:true, vibrate:true })
   }, (error) => {
     // handle error
   });
  })


  }

createChatGroup(design:DesginDataModel){
  var GUID = 'permit' + "_" + new Date().getTime();

  var address = design.address.substring(0, 90);
  var groupName = design.name + "_" + address;

  var groupType = CometChat.GROUP_TYPE.PRIVATE;
  var password = "";

  var group = new CometChat.Group(GUID, groupName, groupType, password);

  CometChat.createGroup(group).then(group=>{
    let membersList = [
      new CometChat.GroupMember("" + design.createdby.id, CometChat.GROUP_MEMBER_SCOPE.ADMIN)
    ];
    CometChat.addMembersToGroup(group.getGuid(),membersList,[]).then(response=>{
      this.cdr.detectChanges();
    })
  })
}

createNewDesignChatGroup(design:DesginDataModel) {
  var GUID = 'permit' + "_" + new Date().getTime();
  var address = design.address.substring(0, 60);
  var groupName = design.name + "_" + address;

  var groupType = CometChat.GROUP_TYPE.PRIVATE;
  var password = "";

  var group = new CometChat.Group(GUID, groupName, groupType, password);

  CometChat.createGroup(group).then(
    group => {
      let membersList = [
        new CometChat.GroupMember("" + design.createdby.id, CometChat.GROUP_MEMBER_SCOPE.ADMIN),
        new CometChat.GroupMember("" + this.userData.id, CometChat.GROUP_MEMBER_SCOPE.ADMIN)
      ];
      CometChat.addMembersToGroup(group.getGuid(), membersList, []).then(
        response => {
          if(design.requesttype == "permit"){
            let postdata={
              chatid:GUID
            }

            this.apiService.updateDesignForm(postdata,this.acceptid).subscribe(res=>{
              this.updatechat_id=true;
            })
            // this.updateItemInList(LISTTYPE.NEW, design);
          }else{
            // this.updateItemInPermitList(LISTTYPE.NEW, design);
          }
        },
        error => {
        }
      );
    },
    error => {

    }
  );
}

      addUserToGroupChat() {
         ;
      var GUID = this.designerData.chatid;
      var userscope = CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT;
      if (this.isclientassigning) {
        userscope = CometChat.GROUP_MEMBER_SCOPE.ADMIN;
      }
      let membersList = [
        new CometChat.GroupMember("" + this.selectedDesigner.id, userscope)
      ];
      CometChat.addMembersToGroup(GUID, membersList, []).then(
        response => {

        },
        error => {

        }
      );
      }


      setupCometChat() {
        let userId = this.storageservice.getUserID()
        const user = new CometChat.User(userId);
        user.setName(this.storageservice.getUser().firstname + ' ' + this.storageservice.getUser().lastname);
        const appSetting = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(COMETCHAT_CONSTANTS.REGION).build();
        CometChat.init(COMETCHAT_CONSTANTS.APP_ID, appSetting).then(
          () => {

            // if(this.utilities.currentUserValue != null){
              // You can now call login function.
              CometChat.login(userId,  COMETCHAT_CONSTANTS.API_KEY).then(
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


directAssignToWattmonk(id:number,event){
  event.stopPropagation();
  this.mixpanel.track("REASSIGN_PERMIT_DESIGN_PAGE_OPEN", {
  });
  this.designId = id;
  var postData = {};
  var designacceptancestarttime = new Date();
      designacceptancestarttime.setMinutes(designacceptancestarttime.getMinutes() + 30);
        postData = {
          //outsourcedto: 232,
          isoutsourced: "true",
          status: "outsourced",
          designacceptancestarttime: designacceptancestarttime
        };
        this.utils.showLoading('Assigning').then(()=>{
          this.apiService.updateDesignForm(postData, this.designId).subscribe((value) => {
            this.utils.hideLoading().then(()=>{
              ;


            //   if(this.userData.role.type==='clientsuperadmin' && this.designerData.status==='created')
            //  {
            //   this.utils.showSnackBar('Design request has been assigned to wattmonk successfully');
            //  }else{
              this.utils.showSnackBar('Design request has been reassigned to wattmonk successfully');

              //this.dismissBottomSheet();
              //this.showBottomDraw = false;
              this.utils.setHomepagePermitRefresh(true);

            })
          }, (error) => {
            this.utils.hideLoading();
           // this.dismissBottomSheet();
           // this.showBottomDraw = false;
          });
        })
}
trackdesign(index,design){
  return design.id;
}

gotoActivity(designData,event){

      event.stopPropagation();
    this.route.navigate(['/activity' + '/' + designData.id + '/design'])

  }

  gotoDetails(designData,$event){
    // $event.preventDefault();
    // $event.stopPropagation();
    // this.route.navigate(['/permit-design-details/' + designData.id])
    this.utils.setPrelimId(designData)
      this.utils.setRequestType('permit')
      this.route.navigate(['/masterdetailpage/permit/' + designData.id])
  }

  gotoChats(designData,event){
    event.stopPropagation();
     let objToSend: NavigationExtras = {
      queryParams: {
       name:designData.name +'_'+designData.address,
       guid:designData.chatid
      },
      skipLocationChange: false,
      fragment: 'top'
  };


  this.route.navigate(['chat/'+ designData.chatid], {
  state: { productdetails: objToSend }
  });
  }

  raisePestampRequest(design, event)
  {
    event.stopPropagation();
    let objToSend: NavigationExtras = {
      queryParams: {
        designData:design
      },
      skipLocationChange: false,
      fragment: 'top'
  };

    this.route.navigate(['/pestamp-schedule'], {
    state: { productdetails: objToSend }
    });
  }

}

export class DesginDataHelper {
  listOfDesigns: DesginDataModel[];
  date: any;
  lateby:any;

  constructor() {
    this.listOfDesigns = [];
  }

  shareDesign(){

  }



}
