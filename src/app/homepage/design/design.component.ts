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
import { ModalController, AlertController } from '@ionic/angular';
import { DeclinepagePage } from 'src/app/declinepage/declinepage.page';
import * as moment from 'moment';
import { StorageService } from 'src/app/storage.service';
import { NetworkdetectService } from 'src/app/networkdetect.service';
import{SocialSharing} from '@ionic-native/social-sharing/ngx';
import { Dialogs } from '@ionic-native/dialogs/ngx';
import { EmailSelectorComponent } from 'src/app/utilities/email-selector/email-selector.component'
import { EmailModelPage } from 'src/app/email-model/email-model.page';


@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.scss'],
})
export class DesignComponent implements OnInit, OnDestroy {

  listOfDesignDataHelper: DesginDataHelper[] = [];
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
  listOfAssignees2: AssigneeModel[] = [];
  designId = 0;
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
    private socialsharing: SocialSharing
  ) {
    this.segments= 'requesttype=prelim&status=created&status=outsourced&status=requestaccepted';
    const latestDate = new Date();
    this.today = datePipe.transform(latestDate, 'M/dd/yy');
    console.log('date', this.today);
    this.todaysdate = datePipe.transform(latestDate, 'yyyy-MM-dd');
    this.assignForm = this.formBuilder.group({
      assignedto: new FormControl(0, [Validators.required]),
      comment: new FormControl('')
    });

  }

  ionViewDidEnter() {
    this.network.networkSwitch.subscribe(data=>{
      this.netSwitch = data;
      console.log(this.netSwitch);
      
    })

this.network.networkDisconnect();
this.network.networkConnect();
    
  }
  segmentChanged(event){
    if(this.userData.role.type=='wattmonkadmins' || this.userData.role.name=='Admin'  || this.userData.role.name=='ContractorAdmin' || this.userData.role.name=='BD' ){
      if(event.target.value=='newDesign'){
        this.segments ='requesttype=prelim&status=created&status=outsourced&status=requestaccepted';
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
    this.userData = this.storageService.getUser();
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

  fetchPendingDesigns(event, showLoader: boolean) {
    console.log("inside fetch Designs");
    this.listOfDesigns = [];
    this.listOfDesignsHelper = [];
    this.utils.showLoadingWithPullRefreshSupport(showLoader, 'Getting Designs').then((success) => {
      this.apiService.getDesignSurveys(this.segments).subscribe((response:any) => {
        this.utils.hideLoadingWithPullRefreshSupport(showLoader).then(() => {
          console.log(response);
          this.formatDesignData(response);
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
    this.listOfDesigns = this.fillinDynamicData(records);
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
    records.forEach(element => {
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
    this.listOfAssignees=[];
    console.log("this works",this.listOfAssignees)
  }

  assignToDesigner() {
      console.log(this.designerData.createdby.id);
      ;
    if (this.assignForm.status === 'INVALID') {
      this.utils.errorSnackBar('Please select a designer');
    } else {
      
     
      var designstarttime = new Date();
    var additonalhours = 0;
    if(this.designerData.requesttype == "prelim"){
      additonalhours = this.selectedDesigner.jobcount * 2;
      designstarttime.setHours( designstarttime.getHours() + additonalhours );
    }else{
      additonalhours = this.selectedDesigner.jobcount * 6;
      designstarttime.setHours( designstarttime.getHours() + additonalhours );
    }
    console.log(this.selectedDesigner);
    var postData = {};
    if (this.designerData.createdby.id == this.userData.id) {
      if (this.selectedDesigner.company == this.userData.company) {
        if(this.selectedDesigner.role.type=="qcinspector"){
          postData = {
            designassignedto: this.selectedDesigner.id,
            isoutsourced: "false",
            status: "reviewassigned",
            designstarttime: designstarttime
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
        postData = {
          outsourcedto: this.selectedDesigner.id,
          isoutsourced: "true",
          status: "outsourced"
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
          designassignedto: this.selectedDesigner.id,
          status: "reviewassigned",
          designstarttime: designstarttime
        };
      }
    }
    this.utils.showLoading('Assigning').then(()=>{
      this.apiService.updateDesignForm(postData, this.designId).subscribe((value) => {
        this.utils.hideLoading().then(()=>{
          ; 
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
    console.log("this is",designData);
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

  openAnalysts(id: number,designData) {
    console.log("this is",designData);
    this.designerData = designData;
    
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
            postData = {
              status: "delivered",
              comments: alertData.comment ,
               };
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
  
}

shareWhatsapp(designData){
  this.socialsharing.share(designData.PrelimDesign.url);
}

 async shareViaEmails(id){
  const modal = await this.modalController.create({
    component: EmailModelPage,
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
    return await modal.present();
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
