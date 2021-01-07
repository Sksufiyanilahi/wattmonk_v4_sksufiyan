import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { DesginDataModel, PrelimDesign } from '../../model/design.model';
import { ApiService } from 'src/app/api.service';
import { UtilitiesService } from 'src/app/utilities.service';
import { ErrorModel } from 'src/app/model/error.model';
import { DatePipe } from '@angular/common';
import { Subscription,BehaviorSubject } from 'rxjs';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';
import { DrawerState } from 'ion-bottom-drawer';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AssigneeModel } from '../../model/assignee.model';
import { Router, ActivatedRoute, NavigationEnd, RoutesRecognized } from '@angular/router';
import {Storage} from '@ionic/storage';
import { ModalController, AlertController, Platform } from '@ionic/angular';
import { DeclinepagePage } from 'src/app/declinepage/declinepage.page';
import * as moment from 'moment';
import { StorageService } from 'src/app/storage.service';
import { NetworkdetectService } from 'src/app/networkdetect.service';
import{SocialSharing} from '@ionic-native/social-sharing/ngx';
import { Dialogs } from '@ionic-native/dialogs/ngx';
import { EmailSelectorComponent } from 'src/app/utilities/email-selector/email-selector.component'
import { EmailModelPage } from 'src/app/email-model/email-model.page';
import { ResendpagedialogPage } from 'src/app/resendpagedialog/resendpagedialog.page';
import { PaymentModalPage } from 'src/app/payment-modal/payment-modal.page';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import {File } from '@ionic-native/file/ngx';
import { LocalNotifications} from '@ionic-native/local-notifications/ngx';
import { Intercom } from 'ng-intercom';
import { CometChat } from '@cometchat-pro/cordova-ionic-chat';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';


@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.scss'],
})
export class DesignComponent implements OnInit, OnDestroy {

  listOfDesignDataHelper: DesginDataHelper[] = [];
  private refreshSubscription: Subscription;
  private routeSubscription: Subscription;
  today: any;
  options: LaunchNavigatorOptions = {
    start: '',
    app: this.launchNavigator.APP.GOOGLE_MAPS
  };
  drawerState = DrawerState.Bottom;
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
  skip:number=0;
  limit:number=10;
 reviewAssignedTo:any;
  isclientassigning: boolean=false;
  acceptid: any;
  deactivateNetworkSwitch: Subscription;
  noDesignFound: string;
  storageDirectory: string;


  constructor(
    private utils: UtilitiesService,
    private apiService: ApiService,
    private datePipe: DatePipe,
    private storage: Storage,
    private cdr: ChangeDetectorRef,
    private launchNavigator: LaunchNavigator,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public modalController: ModalController,
    private storageService:StorageService,
    private network:NetworkdetectService,
    public alertController: AlertController,
    private socialsharing: SocialSharing,
    private file:File,
    private localnotification:LocalNotifications,
    private intercom:Intercom,
    private platform:Platform,
    private androidPermissions: AndroidPermissions,
    private transfer: FileTransfer

  ) {
    this.userData = this.storageService.getUser();

    if(this.userData.role.type=='wattmonkadmins' || this.userData.role.name=='Admin'  || this.userData.role.name=='ContractorAdmin' || this.userData.role.name=='BD' ){
      this.segments= 'requesttype=prelim&status=created&status=outsourced&status=requestaccepted&status=requestdeclined';
    }else if(this.userData.role.type=='clientsuperadmin' || this.userData.role.name=='SuperAdmin' || this.userData.role.name=='ContractorSuperAdmin'){
      this.segments ='requesttype=prelim&status=created&status=outsourced&status=requestaccepted&status=requestdeclined';
    }
    const latestDate = new Date();
    this.today = datePipe.transform(latestDate, 'M/dd/yy');
    console.log('date', this.today);
    this.todaysdate = datePipe.transform(latestDate, 'yyyy-MM-dd');
    this.assignForm = this.formBuilder.group({
      assignedto: new FormControl('', [Validators.required]),
      comment: new FormControl('')
    });

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

  createChatGroup(design:DesginDataModel){
    var GUID = 'prelim' + "_" + new Date().getTime();

    var address = design.address.substring(0, 60);
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

  ionViewDidEnter() {
    this.makeDirectory();
    this.deactivateNetworkSwitch =this.network.networkSwitch.subscribe(data=>{
      this.netSwitch = data;
      console.log(this.netSwitch);

    })

this.network.networkDisconnect();
this.network.networkConnect();

  }


  
  segmentChanged(event){
     this.skip=0;
    if(this.userData.role.type=='wattmonkadmins' || this.userData.role.name=='Admin'  || this.userData.role.name=='ContractorAdmin' || this.userData.role.name=='BD' ){
      if(event.target.value=='newDesign'){
        this.segments ='requesttype=prelim&status=created&status=outsourced&status=requestaccepted&status=requestdeclined';
        // return this.segments;
      }
      else if(event.target.value=='InDesign'){
        this.segments ="requesttype=prelim&status=designassigned";
        // return this.segments;
      }
      else if(event.target.value=='completed'){
        this.segments ="requesttype=prelim&status=designcompleted";
        // return this.segments;
      }
      else if(event.target.value=='InReview'){
        this.segments ="requesttype=prelim&status=reviewassigned&status=reviewfailed&status=reviewpassed";
        // return this.segments;
      }
      else if(event.target.value=='delivered'){
        this.segments ="requesttype=prelim&status=delivered";
      }
      this.getDesigns(null);
      // return this.segments;

    }else if(this.userData.role.type=='clientsuperadmin' || this.userData.role.name=='SuperAdmin' || this.userData.role.name=='ContractorSuperAdmin' ){
      if(event.target.value=='newDesign'){
        this.segments ='requesttype=prelim&status=created&status=outsourced&status=requestaccepted&&status=requestdeclined';
        // return this.segments;
      }
      else if(event.target.value=='InDesign'){
        this.segments ="requesttype=prelim&status=designassigned";
        // return this.segments;
      }
      else if(event.target.value=='completed'){
        this.segments ="requesttype=prelim&status=designcompleted";
        // return this.segments;
      }
      else if(event.target.value=='InReview'){
        this.segments ="requesttype=prelim&status=reviewassigned&status=reviewfailed&status=reviewpassed";
        // return this.segments;
      }
      else if(event.target.value=='delivered'){
        this.segments ="requesttype=prelim&status=delivered";
      }
      this.getDesigns(null);
    }
    // this.getsegmentdata(event.target.value);
    console.log((event.target.value));
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

    this.apiService.emitUserNameAndRole(this.userData);
    // this.userData = this.storageService.getUser();
    console.log(this.userData);

    // this.router.navigate(['homepage/design/pending']);
    // this.routeSubscription = this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationEnd) {
    //     // Trick the Router into believing it's last link wasn't previously loaded
    //     if (this.router.url.indexOf('page') > -1) {
    //       this.router.navigated = false;
    //       let data = this.route.queryParams.subscribe((_res: any) => {
    //         console.log('Serach Term', _res);
    //         if (Object.keys(_res).length !== 0) {
    //           //  this.ApplysearchDesginAndSurvey(_res.serchTerm)

    //           this.filterData(_res.serchTerm);
    //         } else {
    //           // this.refreshSubscription = this.utils.getHomepageDesignRefresh().subscribe((result) => {
    //             // ;
    //             this.getDesign(null, true);
    //           // });
    //         }
    //       });
    //     }
    //   }
    // });

    this.DesignRefreshSubscription = this.utils.getHomepageDesignRefresh().subscribe((result) => {
      this.getDesigns(null);

    });
    

    this.dataRefreshSubscription = this.utils.getDataRefresh().subscribe((result) => {
      if(this.listOfDesigns != null && this.listOfDesigns.length > 0){
        this.formatDesignData(this.listOfDesigns);

      }
    });
  }

  getDesigns(event: CustomEvent) {

    let showLoader = true;
    if (event != null && event !== undefined) {
      showLoader = false;
    }
    this.fetchPendingDesigns(event, showLoader);
  }

     accept(id,data:string){
        this.acceptid = id;
       let status={
        status:data
      }
      this.utils.showLoading("accepting").then(()=>{
         this.apiService.updateDesignForm(status,id).subscribe((res:any)=>{
           if(!res.isinrevisionstate){
             this.createNewDesignChatGroup(res);
            }
            debugger;
           this.utils.hideLoading().then(()=>{
            this.utils.setHomepageDesignRefresh(true);})})
          })

       }


       addUserToGroupChat() {
         debugger;
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


   fetchPendingDesigns(event, showLoader: boolean) {
     this.noDesignFound= "";
    console.log("inside fetch Designs");
    this.listOfDesigns = [];
    this.listOfDesignsHelper = [];
    this.utils.showLoadingWithPullRefreshSupport(showLoader, 'Getting Designs').then((success) => {
      this.apiService.getDesignSurveys(this.segments,this.limit,this.skip).subscribe((response:any) => {
        this.utils.hideLoadingWithPullRefreshSupport(showLoader).then(() => {
          console.log(response);
          if(response.length){
            this.formatDesignData(response);
          }else{
            this.noDesignFound= "No Designs Found";
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

    console.log(this.listOfDesigns);

    const tempData: DesginDataHelper[] = [];
          this.listOfDesigns.forEach((designItem:any,i) => {
            console.log(i);

            if (tempData.length === 0) {
              this.sDatePassed(designItem.updated_at,i);
              const listOfDesign = new DesginDataHelper();
              listOfDesign.date = this.datePipe.transform(designItem.updated_at, 'M/dd/yy');
                listOfDesign.lateby = this.overdue;
              listOfDesign.listOfDesigns.push(designItem);
              tempData.push(listOfDesign);
              console.log(tempData);


;
            } else {

              let added = false;
              tempData.forEach((DesignList) => {
                // DesignList['listOfDesigns'].forEach(element=>{

                //   console.log(element.deliverydate,":::::::::::::");

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
          this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
   // this.refreshSubscription.unsubscribe();
    // this.routeSubscription.unsubscribe();

  this.dataRefreshSubscription.unsubscribe();
  this.DesignRefreshSubscription.unsubscribe();
  }

  // filterData(records : DesginDataModel[]) {
  //   console.log(this.listOfDesignsData);
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
  //         console.log(this.listOfDesignDataHelper);
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
      reviewdate.setMinutes(reviewdate.getMinutes()+15)
      element.reviewremainingtime = this.utils.getRemainingTime(reviewdate.toString());
      element.lateby = this.utils.getTheLatebyString(element.deliverydate);
      element.recordupdatedon = this.utils.formatDateInTimeAgo(element.updated_at);
      element.formattedjobtype = this.utils.getJobTypeName(element.jobtype);
      var acceptancedate = new Date(element.designacceptancestarttime);
      element.designacceptanceremainingtime = this.utils.getRemainingTime(acceptancedate.toString());
      var indesigndate = new Date(element.designstarttime);
      indesigndate.setHours(indesigndate.getHours() + 2);
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
      //   console.log(data,">>>");
      //   if (data) {
      //     element.totalpercent = data.currentprogress;
      //   }else{
      //     element.totalpercent = 0;
      //   }
      // });
    });

    return records;
  }

  trackdesign(index,design){
    return design.id;
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
  //         console.log(response, '>>');
  //         this.listOfDesignsData = response;
  //          response.forEach(element => {
  //             this.roleType = element.type;
  //         });;
  //         console.log(this.roleType);

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
  //               console.log(this.listOfDesignDataHelper,"<<<<>>>>");
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

  openAddressOnMap(address: string) {
    this.launchNavigator.navigate(address, this.options);
  }

  dismissBottomSheet() {
    console.log('this', this.drawerState);
    this.drawerState = DrawerState.Bottom;
    this.utils.setBottomBarHomepage(true);
    this.utils.showHideIntercom(false);
    this.assignForm.get('comment').setValue("");
    this.listOfAssignees=[];

   // console.log("this works",this.listOfAssignees)
  }

  assignToDesigner() {
      console.log(this.designerData.createdby.id);

    if(this.assignForm.status === 'INVALID' && (  this.designerData.status === 'designcompleted' ||this.designerData.status === 'reviewassigned' || this.designerData.status === 'reviewfailed' || this.designerData.status === 'reviewpassed')){
      this.utils.errorSnackBar('Please select a analyst');
    }
    else if (this.assignForm.status === 'INVALID' && ( this.designerData.status === 'created'|| this.designerData.status === 'requestaccepted'|| this.designerData.status === 'designassigned')) {
      if(this.userData.role.type=='clientsuperadmin'){
        this.utils.errorSnackBar('Please select the wattmonk admin');
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
      console.log(parseInt(this.selectedDesigner.jobcount) );
      additonalhours = parseInt(this.selectedDesigner.jobcount) * 2;

      designstarttime.setHours( designstarttime.getHours() + additonalhours );
    }else{
      additonalhours = parseInt(this.selectedDesigner.jobcount) * 6;
      designstarttime.setHours( designstarttime.getHours() + additonalhours );
    }
    console.log(this.selectedDesigner);
    var postData = {};
    if (this.designerData.createdby.id == this.userData.id) {
      debugger;
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
      designacceptancestarttime.setMinutes(designacceptancestarttime.getMinutes() + 15);
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
          console.log('reach ', value);

          if(this.userData.role.type==='clientsuperadmin' && this.designerData.status==='created')
         {
           this.isclientassigning= true;
          this.utils.showSnackBar('Design request has been assigned to wattmonk successfully');
          this.addUserToGroupChat();
         }else{
          this.addUserToGroupChat();
          this.utils.showSnackBar('Design request has been assigned to' + ' ' + this.selectedDesigner.firstname +" "+this.selectedDesigner.lastname + ' ' + 'successfully');
         }
          this.dismissBottomSheet();
          this.showBottomDraw = false;
          this.utils.setHomepageDesignRefresh(true);

        })
      }, (error) => {
        this.utils.hideLoading();
        this.dismissBottomSheet();
        this.showBottomDraw = false;
      });
    })
    }

  }




  openDesigners(id: number,designData) {
    this.listOfAssignees=[];
 this.utils.showHideIntercom(true);
    console.log("this is",designData);
    this.designerData = designData;
    this.reviewAssignedTo=designData.designassignedto;
    if(this.userData.role.type=='clientsuperadmin'&& this.designerData.status=='created'){
      this.router.navigate(["payment-modal",{id:id,designData:this.designerData.requesttype}])

    }

   else{ if (this.listOfAssignees.length === 0) {
      this.utils.showLoading('Getting Designers').then(() => {
        this.apiService.getDesigners().subscribe(assignees => {
          this.utils.hideLoading().then(() => {
            this.listOfAssignees = [];
            // this.listOfAssignees.push(this.utils.getDefaultAssignee(this.storage.getUserID()));
            assignees.forEach(item => this.listOfAssignees.push(item));
            console.log(this.listOfAssignees);
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

  openAnalysts(id: number,designData) {
    this.listOfAssignees=[];
    this.utils.showHideIntercom(true);
    console.log("this is",designData);
    this.designerData = designData;
    this.reviewAssignedTo=designData.reviewassignedto;

    if (this.listOfAssignees.length === 0) {
      this.utils.showLoading('Getting Analysts').then(() => {
        this.apiService.getAnalysts().subscribe(assignees => {
          this.utils.hideLoading().then(() => {
            this.listOfAssignees = [];
            // this.listOfAssignees.push(this.utils.getDefaultAssignee(this.storage.getUserID()));
            assignees.forEach(item => this.listOfAssignees.push(item));
            console.log(this.listOfAssignees);
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




  async openreviewPassed(id,designData){
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
            console.log('Confirm Cancel: blah');
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
               console.log(postData);
               this.apiService.updateDesignForm(postData, this.designId).subscribe((value) => {
                this.utils.hideLoading().then(()=>{
                  ;
                  console.log('reach ', value);
                 this.utils.showSnackBar('Design request has been delivered successfully');

                  this.utils.setHomepageDesignRefresh(true);
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


  doInfinite($event){
    this.skip=this.skip+10;
    this.apiService.getDesignSurveys(this.segments,this.limit,this.skip).subscribe((response:any) => {
         console.log(response);
          if(response.length){
       
            this.formatDesignData(response);
          }else{
            this.noDesignFound= "No Designs Found"
          }
          if (event !== null) {
            $event.target.complete();
          }
        },
     (responseError:any) => {
        if (event !== null) {
            $event.target.complete();
          }
          const error: ErrorModel = responseError.error;
          this.utils.errorSnackBar(error.message[0].messages[0].message);
      
      });
      
    }

  refreshDesigns(event: CustomEvent) {
    this.skip=0;
    let showLoader = true;
    if (event !== null && event !== undefined) {
      showLoader = false;
    }
    this.fetchPendingDesigns(event, showLoader);
  }

  async OpenPaymentmodal(id){

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
    console.log(data)
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


async decline(id){
  const modal = await this.modalController.create({
    component: DeclinepagePage,
    cssClass: 'my-custom-modal-css',
    componentProps: {
      id:id
    },
    backdropDismiss:false
  });
  modal.onDidDismiss().then((data) => {
    console.log(data)
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


async Resend(id, type){
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
    console.log(data)
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

selfAssign(id,designData){
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
        console.log('reach ', value);
      this.utils.showSnackBar('Design request has been assigned to you successfully');
      this.utils.setHomepageDesignRefresh(true);

      })
    }, (error) => {
      this.utils.hideLoading();

    });
})}



pending(value){
  ;
  if(this.userData.role.type=='SuperAdmin'){
      value= "requesttype=prelim&status=created&status=outsourced&status=requestaccepted&status=requestdeclined"
  }else{
    value= "requesttype=prelim&status=created&status=outsourced&status=requestaccepted"
  }
}

getassignedata(asssignedata){
  this.selectedDesigner = asssignedata;
  console.log("dholak is",this.selectedDesigner);

}

shareWhatsapp(designData){
  this.socialsharing.share(designData.prelimdesign.url);
}

 async shareViaEmails(id,designData){
  const modal = await this.modalController.create({
    component: EmailModelPage,
    cssClass: 'email-modal-css',
    componentProps: {
      id:id,
      designData:designData
    },

  });
  modal.onDidDismiss().then((data) => {
    console.log(data)
    if(data.data.cancel=='cancel'){
    }else{
      this.getDesigns(null)
    }
});
    return await modal.present();
 }

 designDownload(designData){



this.platform.ready().then(()=>{
  this.file.resolveDirectoryUrl(this.storageDirectory).then(resolvedDirectory=>{
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then(
      result => console.log('Has permission?',result.hasPermission),
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE)
    );
    this.file.checkFile(resolvedDirectory.nativeURL,designData.prelimdesign.hash).then(data=>{
      console.log(data);

      if(data==true){

      }else{
        console.log('not found!');
        throw { code: 1, message: 'NOT_FOUND_ERR' };
      }
      
    }).catch(async err=>{
      console.log('Error occurred while checking local files:');
      console.log(err);
      if (err.code == 1) {
        const fileTransfer: FileTransferObject = this.transfer.create();
        this.utils.showLoading('Downloading').then(()=>{
          fileTransfer.download(url, this.storageDirectory + designData.prelimdesign.hash + designData.prelimdesign.ext).then((entry) => {
            this.utils.hideLoading().then(()=>{
              console.log('download complete: ' + entry.toURL());
              this.utils.showSnackBar("Prelim Design Downloaded Successfully");
              
              // this.clickSub = this.localnotification.on('click').subscribe(data => {
              //   console.log(data)
              //   path;
              // })
              this.localnotification.schedule({text:'Prelim Design Downloaded Successfully', foreground:true, vibrate:true })
            }, (error) => {
              // handle error
              console.log(error);
              
            });
            })
        })
      }
    })
  })
})

























  let dir_name = 'Wattmonk';
  let path = '';
  const url = designData.prelimdesign.url;
 const fileTransfer: FileTransferObject = this.transfer.create();
 
 
 let result = this.file.createDir(this.file.externalRootDirectory, dir_name, true);
result.then((resp) => {
 path = resp.toURL();
 console.log(path); 
 
 fileTransfer.download(url, path + designData.prelimdesign.hash + designData.prelimdesign.ext).then((entry) => {
   console.log('download complete: ' + entry.toURL());
   this.utils.showSnackBar("Prelim Design Downloaded Successfully");
   
   // this.clickSub = this.localnotification.on('click').subscribe(data => {
   //   console.log(data)
   //   path;
   // })
   this.localnotification.schedule({text:'Downloaded Successfully', foreground:true, vibrate:true })
 }, (error) => {
   // handle error
 });
})


}

createNewDesignChatGroup(design:DesginDataModel) {
  var GUID = 'prelim' + "_" + new Date().getTime();
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
          if(design.requesttype == "prelim"){
            let postdata={
              chatid:GUID
            }

            this.apiService.updateDesignForm(postdata,this.acceptid).subscribe(res=>{})
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

directAssignToWattmonk(id:number){
  this.designId = id;
  var postData = {};
  var designacceptancestarttime = new Date();
      designacceptancestarttime.setMinutes(designacceptancestarttime.getMinutes() + 15);
        postData = {
          outsourcedto: 232,
          isoutsourced: "true",
          status: "outsourced",
          designacceptancestarttime: designacceptancestarttime
        };
        this.utils.showLoading('Assigning').then(()=>{
          this.apiService.updateDesignForm(postData, this.designId).subscribe((value) => {
            this.utils.hideLoading().then(()=>{
              ;
              console.log('reach ', value);
    
            //   if(this.userData.role.type==='clientsuperadmin' && this.designerData.status==='created')
            //  {
            //   this.utils.showSnackBar('Design request has been assigned to wattmonk successfully');
            //  }else{
              this.utils.showSnackBar('Design request has been reassigned to wattmonk successfully');
             
              //this.dismissBottomSheet();
              //this.showBottomDraw = false;
              this.utils.setHomepageDesignRefresh(true);
    
            })
          }, (error) => {
            this.utils.hideLoading();
           // this.dismissBottomSheet();
           // this.showBottomDraw = false;
          });
        })
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
