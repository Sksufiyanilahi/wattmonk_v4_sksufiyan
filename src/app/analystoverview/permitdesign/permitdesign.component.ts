import { Component, OnInit , ChangeDetectorRef } from '@angular/core';
import { DesginDataModel } from '../../model/design.model';
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
import { ModalController } from '@ionic/angular';
import { DeclinepagePage } from 'src/app/declinepage/declinepage.page';
import * as moment from 'moment';
import { StorageService } from 'src/app/storage.service';
import { NetworkdetectService } from 'src/app/networkdetect.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { EmailModelPage } from 'src/app/email-model/email-model.page';

@Component({
  selector: 'app-permitdesign',
  templateUrl: './permitdesign.component.html',
  styleUrls: ['./permitdesign.component.scss'],
})
export class PermitdesignComponent implements OnInit { listOfDesignDataHelper: DesginDataHelper[] = [];
  listOfDesignsData: DesginDataModel[] = [];
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

  designId = 0;
  showBottomDraw: boolean = false;
  roleType: any;
  myFiles: string[] = [];  
  segments:any;
  listOfDesigns: DesginDataModel[];
  private PermitRefreshSubscription: Subscription;
  private dataRefreshSubscription: Subscription;
  listOfDesignsHelper: any[];
  overdue:any;
  todaysdate: string;
  userData: any;
  designerData: any;
  assigneeData: any;
  skip:number=0;
  limit:number=10;
  selectedDesigner: any;
  netSwitch: boolean;
  deactivateNetworkSwitch: Subscription;
  noDesignsFound: string;

  constructor(private utils: UtilitiesService,
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
    private socialsharing: SocialSharing,
    private social: SocialSharing) { 
      this.segments ='requesttype=permit&status=reviewassigned&status=reviewfailed&status=reviewpassed';
      const latestDate = new Date();
      this.today = datePipe.transform(latestDate, 'M/dd/yy');
      console.log('date', this.today);
      this.todaysdate = datePipe.transform(latestDate, 'yyyy-MM-dd');
      this.assignForm = this.formBuilder.group({
        assignedto: new FormControl('', [Validators.required]),
        comment: new FormControl('')
      });
  }

  ionViewDidEnter() {
    this.deactivateNetworkSwitch = this.network.networkSwitch.subscribe(data=>{
      this.netSwitch = data;
      console.log(this.netSwitch);
      
    })

this.network.networkDisconnect();
this.network.networkConnect();
    
  }

  segmentChanged(event){
    
    if(this.userData.role.type=='qcinspector'){ 
     if(event.target.value=='InReview'){
        this.segments ="requesttype=permit&status=reviewassigned&status=reviewfailed&status=reviewpassed";
        // return this.segments;
      }
      else if(event.target.value=='delivered'){
        this.segments ="requesttype=permit&status=delivered";
      }
      this.getDesigns(null);
      // return this.segments;
  
    }
    // this.getsegmentdata(event.target.value);
    console.log((event.target.value));
   // console.log((event.target.value));
   // this.pending(event.target.value);
    
   // this.segments = event.target.value;
    //this.DesignRefreshSubscription = this.utils.getHomepageDesignRefresh().subscribe((result) => {
    //  this.getDesigns(null);
    //});

    //this.dataRefreshSubscription = this.utils.getDataRefresh().subscribe((result) => {
     // if(this.listOfDesigns != null && this.listOfDesigns.length > 0){
      //  this.formatDesignData(this.listOfDesigns);
     // }
    //});
    
  }

  ngOnInit() {this.userData = this.storageService.getUser();
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
    //             // debugger;
    //             this.getDesign(null, true);
    //           // });
    //         }
    //       });
    //     }
    //   }
    // });

    this.PermitRefreshSubscription = this.utils.getHomepagePermitRefresh().subscribe((result) => {
      this.getDesigns(null);
    });

    this.dataRefreshSubscription = this.utils.getDataRefresh().subscribe((result) => {
      if(this.listOfDesigns != null && this.listOfDesigns.length > 0){
        this.formatDesignData(this.listOfDesigns);
      }
    });}


  getDesigns(event: CustomEvent) {
    //debugger;
    let showLoader = true;
    if (event != null && event !== undefined) {
      showLoader = false;
    }
    this.fetchPendingDesigns(event, showLoader);
  }

  fetchPendingDesigns(event, showLoader: boolean) {
    this.noDesignsFound="";
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
            this.noDesignsFound= "No Designs Found";
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

  // formatDesignData(records : DesginDataModel[]){
  //   this.overdue=[];
  //   this.listOfDesigns = this.fillinDynamicData(records);
  //   console.log(this.listOfDesigns);
    
  //   const tempData: DesginDataHelper[] = [];
  //         this.listOfDesigns.forEach((designItem:any,i) => { 
  //           console.log(i);
            
  //           if (tempData.length === 0) {
  //             this.sDatePassed(designItem.deliverydate,i);
  //             const listOfDesign = new DesginDataHelper();
  //             listOfDesign.date = this.datePipe.transform(designItem.deliverydate, 'M/dd/yy');
  //               listOfDesign.lateby = this.overdue;
  //             listOfDesign.listOfDesigns.push(designItem);
  //             tempData.push(listOfDesign);
  //             console.log(tempData);
              
              
  //           } else {
             
  //             let added = false;
  //             tempData.forEach((DesignList) => {
  //               // DesignList['listOfDesigns'].forEach(element=>{
                  
  //               //   console.log(element.deliverydate,":::::::::::::");
                  
  //               //   this.sDatePassed(element.deliverydate);
  //               // })
  //               if (!added) {
  //                 if (DesignList.date === this.datePipe.transform(designItem.deliverydate, 'M/dd/yy')) {
  //                   DesignList.listOfDesigns.push(designItem);
  //                   this.sDatePassed(designItem.deliverydate,i);
  //                   added = true;
  //                 }
  //               }
  //             });
  //             if (!added) {
  //               //debugger;
  //               this.sDatePassed(designItem.deliverydate,i);
  //               const listOfDesign = new DesginDataHelper();
  //               listOfDesign.date = this.datePipe.transform(designItem.deliverydate, 'M/dd/yy');
  //               listOfDesign.lateby = this.overdue;
  //               listOfDesign.listOfDesigns.push(designItem);
  //               tempData.push(listOfDesign);
  //               added = true;
  //             }
  //           }
  //         });
  //         this.listOfDesignsHelper = tempData.sort(function (a, b) {
  //           var dateA = new Date(a.date).getTime(),
  //             dateB = new Date(b.date).getTime();
  //           return dateB - dateA;
  //         });
  //         this.cdr.detectChanges();
  // }

  formatDesignData(records : DesginDataModel[]){
    this.overdue=[];
    this.listOfDesigns = this.fillinDynamicData(records);

    console.log(this.listOfDesigns);
    
    const tempData: DesginDataHelper[] = [];
          this.listOfDesigns.forEach((designItem:any,i) => { 
            console.log(i);
            designItem.lateby = this.utils.getTheLatebyString(designItem.deliverydate)
            if (tempData.length === 0) {
              const listOfDesign = new DesginDataHelper();
              listOfDesign.date = this.datePipe.transform(designItem.updated_at, 'M/dd/yy');
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
                    // this.sDatePassed(designItem.updated_at,i);
                    added = true;
                  }
                }
              });
              if (!added) {
                ;
                // this.sDatePassed(designItem.updated_at,i);
                const listOfDesign = new DesginDataHelper();
                listOfDesign.date = this.datePipe.transform(designItem.updated_at, 'M/dd/yy');
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
  this.PermitRefreshSubscription.unsubscribe();
  this.deactivateNetworkSwitch.unsubscribe();
  this.cdr.detach();
  }

  // filterData(records : DesginDataModel[]) {
  //   console.log(this.listOfDesignsData);
  //   this.listOfDesigns = this.fillinDynamicData(records);
  //   // let filterDataArray: any = this.listOfDesignsData.filter(x => x.id == serchTerm);
  //   const tempData: DesginDataHelper[] = [];
  //   this.listOfDesigns.forEach((desginItem) => {
  //     if (tempData.length === 0) {
  //       const listOfDesign = new DesginDataHelper();
  //       listOfDesign.date = this.datePipe.transform(desginItem.created_at, 'M/d/yy');
  //       listOfDesign.listOfDesigns.push(desginItem);
  //       tempData.push(listOfDesign);
  //     } else {
  //       let added = false;
  //       tempData.forEach((desginList) => {
  //         if (!added) {
  //           if (desginList.date === this.datePipe.transform(desginItem.created_at, 'M/d/yy')) {
  //             desginList.listOfDesigns.push(desginItem);
  //             added = true;
  //           }
  //         }
  //       });
  //       if (!added) {
  //         const listOfDesign = new DesginDataHelper();
  //         listOfDesign.date = this.datePipe.transform(desginItem.created_at, 'M/d/yy');
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
      reviewdate.setHours(reviewdate.getHours()+2)
      element.reviewremainingtime = this.utils.getRemainingTime(reviewdate.toString());
      element.lateby = this.utils.getTheLatebyString(element.deliverydate);
      element.formattedjobtype = this.utils.getJobTypeName(element.jobtype);
      this.storage.get(''+element.id).then((data: any) => {
        console.log(data);
        if (data) {
          element.totalpercent = data.currentprogress;
        }else{
          element.totalpercent = 0;
        }
      });
    });

    return records;
  }

  // getDesign(event, showLoader: boolean) {

  //   this.listOfDesignsData = [];
  //   this.listOfDesignDataHelper = [];
    
  //   this.utils.showLoadingWithPullRefreshSupport(showLoader, 'Getting designs').then((success) => {
  //     // debugger;
  //     this.apiService.getDesignSurveys(this.segments).subscribe((response:any) => {
  //       this.utils.hideLoadingWithPullRefreshSupport(showLoader).then((loaderHidden) => {
  //         // debugger;
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
  //             listOfDesign.date = this.datePipe.transform(desginItem.created_at, 'M/d/yy');
  //             listOfDesign.listOfDesigns.push(desginItem);
  //             tempData.push(listOfDesign);
  //           } else {
  //             let added = false;
  //             tempData.forEach((desginList) => {
  //               if (!added) {
  //                 if (desginList.date === this.datePipe.transform(desginItem.created_at, 'M/d/yy')) {
  //                   desginList.listOfDesigns.push(desginItem);
  //                   added = true;
  //                 }
  //               }
  //             });
  //             if (!added) {
  //               const listOfDesign = new DesginDataHelper();
  //               listOfDesign.date = this.datePipe.transform(desginItem.created_at, 'M/d/yy');
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
  }

  assignToDesigner() {
      console.log(this.designerData.createdby.id);
      
    if (this.assignForm.status === 'INVALID') {
      this.utils.errorSnackBar('Please select a designer');
    } else {
      
     
      var designstarttime = new Date();
    var additonalhours = 0;
    if(this.designerData.requesttype == "permit"){
      additonalhours = this.selectedDesigner.jobcount * 2;
      designstarttime.setHours( designstarttime.getHours() + additonalhours );
    }else{
      additonalhours = this.selectedDesigner.jobcount * 6;
      designstarttime.setHours( designstarttime.getHours() + additonalhours );
    }
    var postData = {};
    if (this.designerData.createdby.id == this.userData.id) {
      if (this.selectedDesigner.company == this.userData.company) {
        postData = {
          designassignedto: this.selectedDesigner.id,
          isoutsourced: "false",
          status: "designassigned",
          designstarttime: designstarttime
        };
      } else {
        postData = {
          outsourcedto: this.selectedDesigner.id,
          isoutsourced: "true",
          status: "outsourced"
        };
      }
    } else {
      postData = {
        designassignedto: this.selectedDesigner.id,
        status: "designassigned",
        designstarttime: designstarttime
      };
    }
    this.utils.showLoading('Assigning').then(()=>{
      this.apiService.updateDesignForm(postData, this.designId).subscribe((value) => {
        this.utils.hideLoading().then(()=>{
          debugger; 
          console.log('reach ', value);
          this.utils.showSnackBar('Design request has been assigned to' + ' ' + value.name + ' ' + 'successfully');
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
    console.log(designData);
    this.designerData = designData;
    if (this.listOfAssignees.length === 0) {
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
              assignedto: 0
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
        assignedto: 0
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

  refreshDesigns(event: CustomEvent) {
    let showLoader = true;
    if (event !== null && event !== undefined) {
      showLoader = false;
    }
    this.fetchPendingDesigns(event, showLoader);
  }

  accept(id,data:string){

    let status={
      status:data
    }
    this.apiService.updateDesignForm(status,id).subscribe((res:any)=>{
      this.getDesigns(null);
    })
  }


async decline(id){
  const modal = await this.modalController.create({
    component: DeclinepagePage,
    cssClass: 'my-custom-modal-css',
    componentProps: {
      id:id
    },
  });
  modal.onDidDismiss().then((data) => {
    console.log(data)
    if(data.data.cancel=='cancel'){
    }else{
      this.getDesigns(null)
    }
});
  // modal.dismiss(() => {
  //   debugger;
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



pending(value){
  //debugger;
  if(this.userData.role.type=='SuperAdmin'){
      value= "requesttype=permit&status=created&status=outsourced&status=requestaccepted&status=requestdeclined"
  }else{
    value= "requesttype=permit&status=created&status=outsourced&status=requestaccepted"
  }
}

getassignedata(asssignedata){
  this.selectedDesigner = asssignedata;
  
}

shareWhatsapp(designData){
  this.socialsharing.share(designData.permitdesign.url);
}

doInfinite($event){
  this.skip=this.skip+10;
  this.apiService.getDesignSurveys(this.segments,this.limit,this.skip).subscribe((response:any) => {
       console.log(response);
        if(response.length){
     
          this.formatDesignData(response);
        }else{
          this.noDesignsFound= "No Designs Found"
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

 trackdesign(index,design){
  return design.id;
}


}




export class DesginDataHelper {
  listOfDesigns: DesginDataModel[];
  date: any;
  lateby:any;

  constructor() {
    this.listOfDesigns = [];
  }

 

}
