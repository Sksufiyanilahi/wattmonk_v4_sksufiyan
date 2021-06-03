import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DrawerState } from 'ion-bottom-drawer';
import { ApiService } from 'src/app/api.service';
import { ErrorModel } from 'src/app/model/error.model';
import { Pestamp, PEstampCount } from 'src/app/model/pestamp.model';
import { StorageService } from 'src/app/storage.service';
import { UtilitiesService } from 'src/app/utilities.service';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DesginDataModel } from 'src/app/model/design.model';
import { NavigationExtras, Router } from '@angular/router';
import { AssigneeModel } from 'src/app/model/assignee.model';
import { identity, Subscription } from 'rxjs';
import { NetworkdetectService } from 'src/app/networkdetect.service';
import { AlertController, ModalController, Platform } from '@ionic/angular';
import { DeclinepagePage } from 'src/app/declinepage/declinepage.page';
import{SocialSharing} from '@ionic-native/social-sharing/ngx';
import { EmailModelPage } from 'src/app/email-model/email-model.page';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import {File } from '@ionic-native/file/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { ResendpagedialogPage } from 'src/app/resendpagedialog/resendpagedialog.page';
import { PestampdelivermodalPage } from 'src/app/pestampdelivermodal/pestampdelivermodal.page';
import { CometChat } from '@cometchat-pro/cordova-ionic-chat';
import { COMETCHAT_CONSTANTS } from 'src/app/constants';
import { MixpanelService } from 'src/app/utilities/mixpanel.service';

@Component({
  selector: 'app-pestamp-design',
  templateUrl: './pestamp-design.component.html',
  styleUrls: ['./pestamp-design.component.scss'],
})
export class PestampDesignComponent implements OnInit {

  assignForm:FormGroup
  drawerState = DrawerState.Bottom;
  userData: any;
  segments:any;

  listOfDesigns: Pestamp[];
  listOfDesignsHelper: any[];
  overdue:any;

  noDesignFound: string='';
  showBottomDraw:boolean = false;
  private PeStampRefreshSubscription: Subscription;

  designerData: any;
  assigneeData: any;
  //assignedTo:any;

  listOfAssignees: AssigneeModel[] = [];
  //listOfAssignees:any[];
  designId = 0;
  selectedPeEngineer: any;
  skip:number=0;
  limit:number=10;
  deactivateNetworkSwitch: Subscription;
  netSwitch: boolean;
  acceptid: any;
  storageDirectory: string;

  updatechat_id: boolean=false;
  isclientassigning: boolean=false;
 requesttype:String
  today: any;
  todaysdate:string;
  options: LaunchNavigatorOptions = {
    start: '',
    app: this.launchNavigator.APP.GOOGLE_MAPS
  };
  PEstampCounts: PEstampCount=<PEstampCount>{};

  //showLoader= true;

  constructor(private storageService: StorageService,
              private utils: UtilitiesService,
              private apiService:ApiService,
              private datePipe: DatePipe,
              private cdr: ChangeDetectorRef,
              private launchNavigator: LaunchNavigator,
              private formBuilder:FormBuilder,
              private route: Router,
              private network:NetworkdetectService,
              public modalController: ModalController,
              private socialsharing: SocialSharing,
              private platform:Platform,
               private androidPermissions: AndroidPermissions,
               private localnotification: LocalNotifications,
               private file: File,
               private transfer : FileTransfer,
               public alertController: AlertController,
               private mixpanelService:MixpanelService) {
                this.userData = this.storageService.getUser();


    if(this.userData.role.type=='wattmonkadmins' || this.userData.role.name=='Admin'  || this.userData.role.name=='ContractorAdmin' || this.userData.role.name=='BD' ){
      this.segments= 'status=created&status=outsourced&status=accepted&status=declined';
    }else if(this.userData.role.type=='clientsuperadmin' || this.userData.role.name=='SuperAdmin' || this.userData.role.name=='ContractorSuperAdmin'){
      this.segments ='status=created&status=outsourced&status=accepted&&status=declined';
    }
                const latestDate = new Date();
    this.today = datePipe.transform(latestDate, 'M/dd/yy');

    this.todaysdate = datePipe.transform(latestDate, 'yyyy-MM-dd');
    this.assignForm = this.formBuilder.group({
      assignedto: new FormControl('', [Validators.required]),
      comment: new FormControl('')
    });
    //this.mixpanelService.setUserDetails(this.userData.email,this.userData.firstname+" "+this.userData.lastname,this.userData.id)
               }

               ionViewDidEnter() {
                this.apiService.emitUserNameAndRole(this.userData);
                this.deactivateNetworkSwitch = this.network.networkSwitch.subscribe(data=>{
                  this.netSwitch = data;

                  //this.newpermitsRef.update({ count: 0 });

                })

            this.network.networkDisconnect();
            this.network.networkConnect();
            this.deactivateNetworkSwitch.unsubscribe();

              }

               segmentChanged(event){
                // this.skip=0;
                  if(this.userData.role.type=='wattmonkadmins' || this.userData.role.name=='Admin'  || this.userData.role.name=='ContractorAdmin' || this.userData.role.name=='BD' ){
                    if(event.target.value=='newpestamp'){
                      this.segments ='status=created&status=outsourced&status=accepted&status=declined';
                      // return this.segments;
                    }
                    else if(event.target.value=='InStamping'){
                      this.segments ="status=assigned";
                      // return this.segments;
                    }
                    else if(event.target.value=='completed'){
                      this.segments ="status=completed";
                      // return this.segments;
                    }
                   //  else if(event.target.value=='InReview'){
                   //    this.segments ="requesttype=permit&status=reviewassigned&status=reviewfailed&status=reviewpassed";
                   //    // return this.segments;
                   //  }
                    else if(event.target.value=='delivered'){
                      this.segments ="status=delivered";
                    }
                    this.getDesigns(null);
                    // return this.segments;

                  }else if(this.userData.role.type=='clientsuperadmin' || this.userData.role.name=='SuperAdmin' || this.userData.role.name=='ContractorSuperAdmin' ){
                    if(event.target.value=='newpestamp'){
                      this.segments ='status=created&status=outsourced&status=accepted&&status=declined';
                      // return this.segments;
                    }
                    else if(event.target.value=='InStamping'){
                      this.segments ="status=assigned";
                      // return this.segments;
                    }
                    else if(event.target.value=='completed'){
                      this.segments ="status=completed";
                      // return this.segments;
                    }
                   //  else if(event.target.value=='InReview'){
                   //    this.segments ="requesttype=permit&status=reviewassigned&status=reviewfailed&status=reviewpassed";
                   //    // return this.segments;
                   //  }
                    else if(event.target.value=='delivered'){
                      this.segments ="status=delivered";
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
    
    this.apiService.getPEstampcounts(userId).subscribe(res => {
      this.PEstampCounts = res;
      console.log(this.PEstampCounts
      )
    })
    //this.userData = this.storageService.getUser();
    this.mixpanelService.track("PESTAMP_PAGE_OPEN", {
    });
    this.makeDirectory();
    this.setupCometChat();
    this.PeStampRefreshSubscription = this.utils.getPeStampRefresh().subscribe((result)=>{
    this.getDesigns(null);
  })
  }



   getDesigns(event) {
     this.skip = 0;
    let showLoader = true;
    if (event != null && event !== undefined) {
      showLoader = false;
    }
    this.fetchPendingDesigns(event, showLoader);
  }

  ngOnDestroy()
  {
    this.PeStampRefreshSubscription.unsubscribe();
  }

  fetchPendingDesigns(event, showLoader: boolean) {
    this.noDesignFound="";

    this.listOfDesigns = [];
    this.listOfDesignsHelper = [];
    //this.newpermitsRef.update({ count: 0 });
    this.utils.showLoadingWithPullRefreshSupport(showLoader, 'Getting Requests').then((success) => {
      this.apiService.getFilteredDesigns(this.segments).subscribe((response:any) => {

        this.utils.hideLoadingWithPullRefreshSupport(showLoader).then(() => {

          if(response.length){

            this.formatDesignData(response);
          }else{
            this.noDesignFound= "No PE Stamp Found"
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
          this.utils.errorSnackBar(error.message);
        });
      });
    });
  }

  formatDesignData(records : Pestamp[]){
    this.overdue=[];
    let list:Pestamp[];

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
  chatIcon(list:Pestamp[]){

    list.forEach(element => {

      var groupMembersRequest = new CometChat.GroupMembersRequestBuilder(element.chatid)
        .setLimit(10)
        .build();
      groupMembersRequest.fetchNext().then(
        groupMembers => {

          element.addedtogroupchat=true;

        },
        error => {

        }
      );
  })
  // setTimeout(() => {

   // this.utils.hideLoadingWithPullRefreshSupport(this.showLoader);
  // }, 2000);

  }

  fillinDynamicData(records : Pestamp[]) : Pestamp[]{
    records.forEach((element:any) => {
      if(element.status != "delivered"){
        element.isoverdue = this.utils.isDatePassed(element.actualdelivereddate);
      }else{
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

      if(element.email != null && element.hardcopies != null && element.type != null && element.shippingaddress != null && element.roofphotos.length > 0  &&  element.atticphotos.length > 0 && element.permitplan.length > 0){
        element.isrecordcomplete = true;
      }
           //Setting acceptance timer
    if(element.status == "outsourced"){
      var acceptancedate = new Date(element.pestampacceptancestarttime);
      element.pestampacceptanceremainingtime = this.utils.getRemainingTime(acceptancedate.toString());


      if(element.pestampacceptanceremainingtime == "0h : 0m"){
        element.isoverdue = true;
      }
    }

    //Setting design timer
    if(element.status == "assigned" || element.status == "completed"){

      var acceptancedate = new Date(element.pestampstarttime);
      acceptancedate.setHours(acceptancedate.getHours() + 2);
      element.designremainingtime = this.utils.getRemainingTime(acceptancedate.toString());

      if(element.designremainingtime == "0h : 0m"){
        element.isoverdue = true;
      }
    }

    });

    return records;
  }

  openAddressOnMap(address: string,event) {
    event.stopPropagation();
    this.launchNavigator.navigate(address, this.options);
  }

  dismissBottomSheet() {
    this.showBottomDraw = false;

    this.drawerState = DrawerState.Bottom;
    this.utils.setBottomBarHomepage(true);
    this.assignForm.get('comment').setValue("");
    this.listOfAssignees=[];


  }

  assignToPeEngineer() {


    //if(this.assignForm.status === 'INVALID' && (  this.designerData.status === 'designcompleted' ||this.designerData.status === 'reviewassigned' || this.designerData.status === 'reviewfailed' || this.designerData.status === 'reviewpassed')){
    if(this.assignForm.status === 'INVALID') {
    this.utils.errorSnackBar('Please select a pe engineer');
    }
    // else if( this.assignedTo!=null && (this.selectedPeEngineer.id==this.assignedTo.id)){
    //   this.utils.errorSnackBar("This design request has been already assigned to"+" "+this.selectedPeEngineer.firstname+" "+this.selectedPeEngineer.lastname)

    // }
    else{
      var pestampstarttime = new Date();
      var pestampacceptancestarttime = new Date();
      var additonalhours = 0;
        additonalhours = this.selectedPeEngineer.jobcount * 2;
        pestampstarttime.setHours(pestampstarttime.getHours() + additonalhours);
        pestampacceptancestarttime.setMinutes(pestampacceptancestarttime.getMinutes() + 15);

        var postData={};
        if(this.designerData.type!='both'){
         postData = {
          assignedto: this.selectedPeEngineer.id,
          status: "assigned",
          pestampstarttime: pestampstarttime
        }}
        else{

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
        this.apiService.assignPestamps(this.designId,postData).subscribe(res=>{

          this.utils.hideLoading().then(()=>{
            this.addUserToGroupChat(res.chatid);
            this.utils.showSnackBar('successfully assigned to'+' '+this.selectedPeEngineer.firstname+' '+this.selectedPeEngineer.lastname);
            this.route.navigate(["pestamp-homepage/pestamp-design"]);
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

  accept(id,data:string,event){
    event.stopPropagation();
    this.mixpanelService.track("ACCEPT_PESTAMP_DESIGN_PAGE_OPEN", {
    });
    this.acceptid= id;
     let status={
      status:data
    }
    this.utils.showLoading("accepting").then(()=>{
       this.apiService.assignPestamps(id,status).subscribe((res:any)=>{
        this.createNewDesignChatGroup(res);
         this.utils.hideLoading().then(()=>{
              if(this.updatechat_id){
                this.utils.setPeStampRefresh(true);
              }else{
                this.utils.setPeStampRefresh(true);
              }

              // this.utils.showSnackBar("Design request has been accepted successfully.")
              // this.utils.setPeStampRefresh(true);
        })})
        })

     }

  openDesigners(id: number,designData,event) {
    event.stopPropagation();
     ;
    this.mixpanelService.track("ASSIGN_PESTAMP_DESIGN_PAGE_OPEN", {
    });
    this.listOfAssignees=[];

     this.designerData = designData;
     //this.assignedTo=designData.assignedto;
    if((this.userData.role.type=='clientsuperadmin' || this.userData.role.type=='clientadmin')&& this.designerData.status=='created'){
      //this.route.navigate(["pestamp-payment-modal",{id:id,designData:this.designerData.requesttype}])
      let objToSend: NavigationExtras = {
        queryParams: {
        designData:designData,
        value:'assign'
        },
        skipLocationChange: false,
        fragment: 'top'
    };


this.route.navigate(['/pestamp-payment-modal'], {
  state: { productdetails: objToSend }
});


    }

   else{ if (this.listOfAssignees.length === 0) {
      this.utils.showLoading('Getting Pe Engineers').then(() => {
        this.apiService.getPeEngineers(designData.type).subscribe((assignees:any) => {
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
    }}
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
    //this.skip=0;
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

async decline(id,e,event){
  event.stopPropagation();
  this.mixpanelService.track("DECLINE_PESTAMP_DESIGN_PAGE_OPEN", {
  });
  let status = e;

  const modal = await this.modalController.create({
    component: DeclinepagePage,
    cssClass: 'my-custom-modal-css',
    componentProps: {
      id:id,
      value:status

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
  this.mixpanelService.track("RESEND_PESTAMP_DESIGN_PAGE_OPEN", {
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



// pending(value){
//   ;
//   if(this.userData.role.type=='SuperAdmin'){
//       value= "requesttype=permit&status=created&status=outsourced&status=accepted&status=declined"
//   }else{
//     value= "requesttype=permit&status=created&status=outsourced&status=accepted"
//   }
// }

getassignedata(asssignedata){
  this.selectedPeEngineer = asssignedata;

}

shareWhatsapp(designData){
  this.socialsharing.share(designData.permitdesign.url);
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
  this.mixpanelService.track("DOWNLOAD_PESTAMP_PAGE_OPEN", {
  });
  this.platform.ready().then(()=>{
    this.file.resolveDirectoryUrl(this.storageDirectory).then(resolvedDirectory=>{
      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then(

        err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE)
      );
      this.file.checkFile(resolvedDirectory.nativeURL,designData.stampedfiles.hash).then(data=>{

        
        if(data==true){

        }else{

          throw { code: 1, message: 'NOT_FOUND_ERR' };
        }

      }).catch(async err=>{


        if (err.code == 1) {
          const fileTransfer: FileTransferObject = this.transfer.create();
          this.utils.showLoading('Downloading').then(()=>{
            fileTransfer.download(url, this.storageDirectory + designData.stampedfiles.hash + designData.stampedfiles.ext).then((entry) => {
              this.utils.hideLoading().then(()=>{

                this.utils.showSnackBar("Stamped File Downloaded Successfully");

                // this.clickSub = this.localnotification.on('click').subscribe(data => {

                //   path;
                // })
                this.localnotification.schedule({text:'Stamped File Downloaded Successfully', foreground:true, vibrate:true })
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
     this.localnotification.schedule({text:'Downloaded Successfully', foreground:true, vibrate:true })
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

  clearPendingPayments(designData,event){
    event.stopPropagation();
    this.mixpanelService.track("PESTAMP_PENDING_PAYMENTS_PAGE_OPEN", {
    });
    let objToSend: NavigationExtras = {
      queryParams: {
      designData:designData,
      value:'clearDues'
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

  // var groupType = CometChat.GROUP_TYPE.PRIVATE;
  // var password = "";

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

createNewDesignChatGroup(design:Pestamp) {
  var GUID = 'pestamp' + "_" + new Date().getTime();
  //var address = design.deliveryaddress.substring(0, 60);
  var groupName = design.type + "_" +design.personname + "_" + design.email;

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
          //if(design.requesttype == "permit"){
             ;
            let postdata={
              chatid:GUID
            }

            this.apiService.assignPestamps(this.acceptid,postdata).subscribe(res=>{
              this.updatechat_id=true;
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


directAssignToWattmonk(id:number,design,event){
  event.stopPropagation();
  this.mixpanelService.track("REASSIGN_PESTAMP_DESIGN_PAGE_OPEN", {
  });
  this.designId = id;

  var postData = {};
  var pestampacceptancestarttime = new Date();
  pestampacceptancestarttime.setMinutes(pestampacceptancestarttime.getMinutes() + 15);
  if(design.declinedbypeengineer == true)
  {
    postData = {
      isoutsourced: "true",
      status:"assigned",
      declinedbypeengineer:'false'
    }
  }
  else{
        postData = {
          //outsourcedto: 232,
          isoutsourced: "true",
          status: "outsourced",
          pestampacceptancestarttime: pestampacceptancestarttime
        };
      }
        this.utils.showLoading('Assigning').then(()=>{
          this.apiService.updatePestamps(this.designId,postData).subscribe((value) => {
            this.utils.hideLoading().then(()=>{
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
trackdesign(index,design){
  return design.id;
}

gotoActivity(designData,event){

      event.stopPropagation();
    this.route.navigate(['/activity' + '/' + designData.id + '/pestamp'])

  }

  gotoDetails(designData,$event){
    // $event.preventDefault();
    // $event.stopPropagation();
    // this.route.navigate(['/pestamp-design-details/' + designData.id])
    this.utils.setPrelimId(designData);
    this.utils.setRequestType('pestamp')
    this.route.navigate(['/masterdetailpage/pestamp/' + designData.id])
  }

gotoChats(designData,event){
  event.stopPropagation();
  this.route.navigate(['/chat/' + designData.chatid])
}

structuralAssign(id,designData,event){
  event.stopPropagation();

   ;
  this.mixpanelService.track("ASSIGN_PESTAMP_DESIGN_PAGE_OPEN", {
  });
  this.listOfAssignees=[];

   this.designerData = designData;
   this.requesttype="structural"
   //this.assignedTo=designData.assignedto;
  if((this.userData.role.type=='clientsuperadmin' || this.userData.role.type=='clientadmin')&& this.designerData.status=='created'){
    //this.route.navigate(["pestamp-payment-modal",{id:id,designData:this.designerData.requesttype}])
    let objToSend: NavigationExtras = {
      queryParams: {
      designData:designData,
      value:'assign'
      },
      skipLocationChange: false,
      fragment: 'top'
  };


this.route.navigate(['/pestamp-payment-modal'], {
state: { productdetails: objToSend }
});


  }

 else{ if (this.listOfAssignees.length === 0) {
    this.utils.showLoading('Getting Pe Engineers').then(() => {
      this.apiService.getPeEngineers("structural").subscribe((assignees:any) => {
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
  }}

}

electricalAssign(id,designData,event){
  event.stopPropagation();


   ;
  this.mixpanelService.track("ASSIGN_PESTAMP_DESIGN_PAGE_OPEN", {
  });

  this.listOfAssignees=[];

   this.designerData = designData;
   this.requesttype="electrical"
   //this.assignedTo=designData.assignedto;
  if((this.userData.role.type=='clientsuperadmin' || this.userData.role.type=='clientadmin')&& this.designerData.status=='created'){
    //this.route.navigate(["pestamp-payment-modal",{id:id,designData:this.designerData.requesttype}])
    let objToSend: NavigationExtras = {
      queryParams: {
      designData:designData,
      value:'assign'
      },
      skipLocationChange: false,
      fragment: 'top'
  };


this.route.navigate(['/pestamp-payment-modal'], {
state: { productdetails: objToSend }
});


  }

 else{ if (this.listOfAssignees.length === 0) {
    this.utils.showLoading('Getting Pe Engineers').then(() => {
      this.apiService.getPeEngineers("electrical").subscribe((assignees:any) => {
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
  }}

}

}

export class DesginDataHelper {
  listOfDesigns: Pestamp[];
  date: any;
  lateby:any;

  constructor() {
    this.listOfDesigns = [];
  }

  shareDesign(){

  }


}
