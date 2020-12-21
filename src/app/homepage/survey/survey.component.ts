import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { UtilitiesService } from 'src/app/utilities.service';
import { ApiService } from 'src/app/api.service';
import { SurveyDataModel } from 'src/app/model/survey.model';
import { ErrorModel } from 'src/app/model/error.model';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { NavController, AlertController, ModalController } from '@ionic/angular';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';
import { DrawerState } from 'ion-bottom-drawer';
import { AssigneeModel } from '../../model/assignee.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserRoles } from '../../model/constants';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/storage.service';
import { ROLES } from 'src/app/contants';
import {Storage} from '@ionic/storage';
import { SurveyStorageModel } from 'src/app/model/survey-storage.model';
import * as moment from 'moment';
import { NetworkdetectService } from 'src/app/networkdetect.service';
import { EmailModelPage } from 'src/app/email-model/email-model.page';
import{SocialSharing} from '@ionic-native/social-sharing/ngx';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss'],
})
export class SurveyComponent implements OnInit, OnDestroy {

  listOfSurveyData: SurveyDataModel[] = [];
  listOfSurveyDataHelper: SurveyDataHelper[] = [];
  private surveyRefreshSubscription: Subscription;
  private dataRefreshSubscription: Subscription;

  today: any;

  options: LaunchNavigatorOptions = {
    start: '',
    app: this.launchNavigator.APP.GOOGLE_MAPS
  };
  drawerState = DrawerState.Bottom;
  surveyId = 0;
  showBottomDraw: boolean = false;
  surveyData: any;
  selectedDesigner:any
  assignForm: FormGroup;
  listOfAssignees: AssigneeModel[] = [];
  routeSubscription: Subscription;
  filterDataArray: SurveyDataModel[];
  segments:any='status=created&status=outsourced&status=requestaccepted';
  overdue: number;
  userData: User;
  netSwitch: any;
  reviewAssignedTo:any;

  constructor(
    private utils: UtilitiesService,
    private alertController:AlertController,
    private socialsharing: SocialSharing,
    public modalController: ModalController,
    private apiService: ApiService,
    private datePipe: DatePipe,
    private navController: NavController,
    private launchNavigator: LaunchNavigator,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
    private storage: Storage,
    private storageService:StorageService,
    private network:NetworkdetectService
  ) {
    const latestDate = new Date();
    this.today = datePipe.transform(latestDate, 'M/dd/yy');
    console.log('date', this.today);
    this.assignForm = this.formBuilder.group({
      assignedto: new FormControl(0, [Validators.required]),
      status: new FormControl('surveyassigned', [Validators.required])
    });
  }

  segmentChanged(event?){
    this.segments= event.target.value;
    // this.getSurveys(event);

    // this.surveyRefreshSubscription = this.utils.getHomepageSurveyRefresh().subscribe((result) => {
      this.getSurveys(null);
    // });

    // this.dataRefreshSubscription = this.utils.getDataRefresh().subscribe((result) => {
    //   if(this.listOfSurveyData != null && this.listOfSurveyData.length > 0){
    //     this.formatSurveyData(this.listOfSurveyData);
    //   }
    // });
  }

  ionViewDidEnter() {
    this.network.networkDisconnect();
this.network.networkConnect();
    this.network.networkSwitch.subscribe(data=>{
      this.netSwitch = data;
      console.log(this.netSwitch);
      
    })
    // this.surveyRefreshSubscription = this.utils.getHomepageSurveyRefresh().subscribe((result) => {

    //   this.getSurveys(null);
    // });

    // this.dataRefreshSubscription = this.utils.getDataRefresh().subscribe((result) => {
    //   if(this.listOfSurveyData != null && this.listOfSurveyData.length > 0){
    //     this.formatSurveyData(this.listOfSurveyData);
    //   }
    // });
    // debugger;
    // this.routeSubscription.unsubscribe();
  }

  ngOnInit() {
    this.userData = this.storageService.getUser();
    console.log(this.userData);
    
    this.surveyRefreshSubscription = this.utils.getHomepageSurveyRefresh().subscribe((result) => {
      this.getSurveys(null);
    });
  }
  // ngOnInit() {
  //   // this.filterData(this.filterDataArray);
  //   // this.routeSubscription = this.router.events.subscribe((event) => {
  //   //   if (event instanceof NavigationEnd) {
  //   //     // Trick the Router into believing it's last link wasn't previously loaded
  //   //     if (this.router.url.indexOf('page') > -1) {
  //   //       this.router.navigated = false;
  //   //       let data = this.route.queryParams.subscribe((_res: any) => {
  //   //         console.log('Serach Term', _res);
  //   //         if (Object.keys(_res).length !== 0) {
  //   //           //  this.ApplysearchDesginAndSurvey(_res.serchTerm)

  //   //           this.filterData(_res.serchTerm);
  //   //         } else {
  //   //           // this.refreshSubscription = this.utils.getHomepageDesignRefresh().subscribe((result) => {
  //   //             // debugger;
  //   //             this.getSurveys(null);
  //   //           // });
  //   //         }
  //   //       });
  //   //     }
  //   //   }
  //   // });
  //   // console.log('inside init');
  //   // this.routeSubscription = this.router.events.subscribe((event) => {
  //   //   if (event instanceof NavigationEnd) {
  //   //     // Trick the Router into believing it's last link wasn't previously loaded
  //   //     if (this.router.url.indexOf('page') > -1) {
  //   //       this.router.navigated = false;
  //   //       const data = this.route.queryParams.subscribe((_res: any) => {
  //   //         console.log('Search Term', _res);
  //   //         if (Object.keys(_res).length !== 0) {
  //   //           //  this.ApplysearchDesginAndSurvey(_res.serchTerm)
  //   //           this.filterData(_res.serchTerm);
  //   //         } else {
  //   //           this.surveyRefreshSubscription = this.utils.getHomepageSurveyRefresh().subscribe((result) => {
  //   //             this.getSurveys(null);
  //   //           });
  //   //         }
  //   //       });
  //   //     }
  //   //   }
  //   // });
  // }
  getSurveys(event?: CustomEvent) {
    let showLoader = true;
    if (event != null && event !== undefined) {
      showLoader = false;
    }
    this.fetchPendingSurveys(event,showLoader);
  }

  fetchPendingSurveys(event, showLoader: boolean) {
    this.listOfSurveyData = [];
    this.listOfSurveyDataHelper = [];
    console.log("data",this.segments);
    this.utils.showLoadingWithPullRefreshSupport(showLoader, 'Getting Surveys').then((success) => {
      this.apiService.getSurveyorSurveys(this.segments).subscribe(response => {
        this.utils.hideLoadingWithPullRefreshSupport(showLoader).then(() => {
          console.log(response);
          this.formatSurveyData(response);
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

  // filterData(serchTerm: any) {
  //   console.log(this.listOfSurveyData);
  //   this.filterDataArray = this.listOfSurveyData.filter(x => x.id == serchTerm);
  //   const tempData: SurveyDataHelper[] = [];
  //   this.filterDataArray.forEach((surveyItem) => {
  //     if (tempData.length === 0) {
  //       const listOfSurvey = new SurveyDataHelper();
  //       listOfSurvey.date = this.datePipe.transform(surveyItem.created_at, 'M/d/yy');
  //       listOfSurvey.listOfSurveys.push(surveyItem);
  //       tempData.push(listOfSurvey);
  //     } else {
  //       let added = false;
  //       tempData.forEach((surveyList) => {
  //         if (!added) {
  //           if (surveyList.date === this.datePipe.transform(surveyItem.created_at, 'M/d/yy')) {
  //             surveyList.listOfSurveys.push(surveyItem);
  //             added = true;
  //           }
  //         }
  //       });
  //       if (!added) {
  //         const listOfSurvey = new SurveyDataHelper();
  //         listOfSurvey.date = this.datePipe.transform(surveyItem.created_at, 'M/d/yy');
  //         listOfSurvey.listOfSurveys.push(surveyItem);
  //         tempData.push(listOfSurvey);
  //         added = true;
  //       }
  //     }
  //   });
  //   this.listOfSurveyDataHelper = tempData;
  //   this.cdr.detectChanges();
  // }

  formatSurveyData(records : SurveyDataModel[]){
    this.listOfSurveyData = this.fillinDynamicData(records);
    console.log(this.listOfSurveyData);
    
    const tempData: SurveyDataHelper[] = [];
          this.listOfSurveyData.forEach((surveyItem,i) => {
            this.sDatePassed(surveyItem.datetime,i);
            surveyItem.lateby = this.overdue;
            if (tempData.length === 0) {
              const listOfSurvey = new SurveyDataHelper();
              listOfSurvey.date = this.datePipe.transform(surveyItem.datetime, 'M/dd/yy');
              listOfSurvey.listOfSurveys.push(surveyItem);
              tempData.push(listOfSurvey);
            } else {
              let added = false;
              tempData.forEach((surveyList) => {
                if (!added) {
                  if (surveyList.date === this.datePipe.transform(surveyItem.datetime, 'M/dd/yy')) {
                    surveyList.listOfSurveys.push(surveyItem);
                    added = true;
                  }
                }
              });
              if (!added) {
                const listOfSurvey = new SurveyDataHelper();
                listOfSurvey.date = this.datePipe.transform(surveyItem.datetime, 'M/dd/yy');
                listOfSurvey.listOfSurveys.push(surveyItem);
                tempData.push(listOfSurvey);
                added = true;
              }
            }
          });
          this.listOfSurveyDataHelper = tempData.sort(function (a, b) {
            var dateA = new Date(a.date).getTime(),
              dateB = new Date(b.date).getTime();
            return dateB - dateA;
          });
          this.cdr.detectChanges();
  }

  fillinDynamicData(records : SurveyDataModel[]) : SurveyDataModel[]{
    records.forEach(element => {
      element.formattedjobtype = this.utils.getJobTypeName(element.jobtype);
      this.storage.get(''+element.id).then((data: SurveyStorageModel) => {
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

  ngOnDestroy(): void {
    this.surveyRefreshSubscription.unsubscribe();
  }

  // getSurvey(event, showLoader: boolean) {
  //   this.listOfSurveyData = [];
  //   this.listOfSurveyDataHelper = [];
  //   this.utils.showLoadingWithPullRefreshSupport(showLoader, 'Getting Surveys').then((success) => {
  //     this.apiService.getSurvey().subscribe(response => {
  //       this.utils.hideLoadingWithPullRefreshSupport(showLoader).then(() => {
  //         if (event !== null) {
  //           event.target.complete();
  //         }
  //         console.log(response);
  //         this.listOfSurveyData = response;
  //         const tempData: SurveyDataHelper[] = [];
  //         this.listOfSurveyData.forEach((surveyItem) => {
  //           if (tempData.length === 0) {
  //             const listOfSurvey = new SurveyDataHelper();
  //             listOfSurvey.date = this.datePipe.transform(surveyItem.datetime, 'M/d/yy');
  //             listOfSurvey.listOfSurveys.push(surveyItem);
  //             tempData.push(listOfSurvey);
  //           } else {
  //             let added = false;
  //             tempData.forEach((surveyList) => {
  //               if (!added) {
  //                 if (surveyList.date === this.datePipe.transform(surveyItem.datetime, 'M/d/yy')) {
  //                   surveyList.listOfSurveys.push(surveyItem);
  //                   added = true;
  //                 }
  //               }
  //             });
  //             if (!added) {
  //               const listOfSurvey = new SurveyDataHelper();
  //               listOfSurvey.date = this.datePipe.transform(surveyItem.datetime, 'M/d/yy');
  //               listOfSurvey.listOfSurveys.push(surveyItem);
  //               tempData.push(listOfSurvey);
  //               added = true;
  //             }
  //           }
  //         });
  //         this.listOfSurveyDataHelper = tempData;
  //         this.cdr.detectChanges();
  //       });
  //     }, responseError => {
  //       this.utils.hideLoadingWithPullRefreshSupport(showLoader).then(() => {
  //         if (event !== null) {
  //           event.target.complete();
  //         }
  //         const error: ErrorModel = responseError.error;
  //         this.utils.errorSnackBar(error.message[0].messages[0].message);
  //       });
  //     });
  //   });
  // }

  // getSurveyorSurveys(event, showLoader: boolean) {
  //   this.listOfSurveyData = [];
  //   this.listOfSurveyDataHelper = [];
  //   this.utils.showLoadingWithPullRefreshSupport(showLoader, 'Getting Surveys').then((success) => {
  //     this.apiService.getSurveyorSurveys("").subscribe(response => {
  //       this.utils.hideLoadingWithPullRefreshSupport(showLoader).then(() => {
  //         if (event !== null) {
  //           event.target.complete();
  //         }
  //         console.log(response);
  //         this.listOfSurveyData = response;
  //         const tempData: SurveyDataHelper[] = [];
  //         this.listOfSurveyData.forEach((surveyItem) => {
  //           if (tempData.length === 0) {
  //             const listOfSurvey = new SurveyDataHelper();
  //             listOfSurvey.date = this.datePipe.transform(surveyItem.datetime, 'M/d/yy');
  //             listOfSurvey.listOfSurveys.push(surveyItem);
  //             tempData.push(listOfSurvey);
  //           } else {
  //             let added = false;
  //             tempData.forEach((surveyList) => {
  //               if (!added) {
  //                 if (surveyList.date === this.datePipe.transform(surveyItem.datetime, 'M/d/yy')) {
  //                   surveyList.listOfSurveys.push(surveyItem);
  //                   added = true;
  //                 }
  //               }
  //             });
  //             if (!added) {
  //               const listOfSurvey = new SurveyDataHelper();
  //               listOfSurvey.date = this.datePipe.transform(surveyItem.datetime, 'M/d/yy');
  //               listOfSurvey.listOfSurveys.push(surveyItem);
  //               tempData.push(listOfSurvey);
  //               added = true;
  //             }
  //           }
  //         });
  //         this.listOfSurveyDataHelper = tempData;
  //         this.cdr.detectChanges();
  //       });
  //     }, responseError => {
  //       this.utils.hideLoadingWithPullRefreshSupport(showLoader).then(() => {
  //         if (event !== null) {
  //           event.target.complete();
  //         }
  //         const error: ErrorModel = responseError.error;
  //         this.utils.errorSnackBar(error.message[0].messages[0].message);
  //       });
  //     });
  //   });
  // }

  openAddressOnMap(address: string) {
    this.launchNavigator.navigate(address, this.options);
  }

  dismissBottomSheet() {
    console.log("hello cancel");
    this.drawerState = DrawerState.Bottom;
    this.utils.setBottomBarHomepage(true);
    this.listOfAssignees=[];
   // this.assignForm.get('comment').setValue("");
  }

  assignToSurveyor() {
    debugger;
    console.log("hello");
    console.log(this.surveyData.createdby.id);
      
    if(this.assignForm.status === 'INVALID' && (this.surveyData.status === 'reviewassigned' || this.surveyData.status === 'reviewfailed' || this.surveyData.status === 'reviewpassed')){
      this.utils.errorSnackBar('Please select a analyst');
    }
    else if (this.assignForm.status === 'INVALID' && this.surveyData.status === 'requestaccepted') {
      this.utils.errorSnackBar('Please select a surveyor');
    }
    else if( this.reviewAssignedTo!=null && (this.selectedDesigner.id==this.reviewAssignedTo.id)){
      this.utils.errorSnackBar("This design request has been already assigned to"+" "+this.selectedDesigner.firstname+" "+this.selectedDesigner.lastname)

    } 
    else {
      
     
      var surveystarttime = new Date();
      var milisecond = surveystarttime.getTime();
    var additonalhours = 0;
    if(this.surveyData.requesttype == "prelim"){
      console.log(parseInt(this.selectedDesigner.jobcount) );
      additonalhours = parseInt(this.selectedDesigner.jobcount) * 2;
      
      surveystarttime.setHours( surveystarttime.getHours() + additonalhours );
    }else{
      additonalhours = parseInt(this.selectedDesigner.jobcount) * 6;
      surveystarttime.setHours( surveystarttime.getHours() + additonalhours );
    }
    console.log(this.selectedDesigner);
    var postData = {};
    if (this.surveyData.createdby.id == this.userData.id) {
      debugger;
      if (this.selectedDesigner.parent.id == this.userData.parent.id) {
        if(this.selectedDesigner.role.type=="qcinspector"){
          postData = {
            reviewassignedto: this.selectedDesigner.id,
            status: "reviewassigned",
            reviewstarttime: milisecond
          }; 
        }
       if(this.selectedDesigner.role.type=="surveyors") { postData = {
          assignedto: this.selectedDesigner.id,
          isoutsourced: "false",
          status: "surveyassigned",
          surveystarttime: surveystarttime
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
      if(this.selectedDesigner.role.type=="surveyors"){ postData = {
        assignedto: this.selectedDesigner.id,
        status: "surveyassigned",
        surveystarttime: surveystarttime
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
      this.apiService.updateSurveyForm(postData, this.surveyId).subscribe((value) => {
        this.utils.hideLoading().then(()=>{
          ; 
          console.log('reach ', value);
         
          this.utils.showSnackBar('Survey request has been assigned to' + ' ' + this.selectedDesigner.firstname +" "+this.selectedDesigner.lastname + ' ' + 'successfully');
         
          this.dismissBottomSheet();
          this.showBottomDraw = false;
          this.utils.sethomepageSurveyRefresh(true);
          
        })
      }, (error) => {
        this.utils.hideLoading();
        this.dismissBottomSheet();
        this.showBottomDraw = false;
      });
    })
    }


  }


  
  openAnalysts(id:number,surveyData){
    this.listOfAssignees=[];
    console.log(this.listOfAssignees);
    this.surveyData=surveyData;
    console.log(surveyData);
    this.reviewAssignedTo = surveyData.reviewassignedto;
    console.log(this.reviewAssignedTo);
    if (this.listOfAssignees.length === 0) {
      this.utils.showLoading('Getting Analysts').then(() => {
        this.apiService.getAnalysts().subscribe(assignees => {
          this.utils.hideLoading().then(() => {
            this.listOfAssignees = [];
            // this.listOfAssignees.push(this.utils.getDefaultAssignee(this.storage.getUserID()));
            assignees.forEach(item => this.listOfAssignees.push(item));
            console.log(this.listOfAssignees);
            this.showBottomDraw = true;
            this.surveyId = id;
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
      this.surveyId = id;
      this.utils.setBottomBarHomepage(false);
      this.drawerState = DrawerState.Docked;
      this.assignForm.patchValue({
        assignedto: ''
      });
    }
  
    }
  

  openSurveyors(id: number,surveyData) {
    this.listOfAssignees=[];
    console.log(surveyData);
    console.log(this.listOfAssignees);
    this.surveyData=surveyData;
    this.reviewAssignedTo = surveyData.assignedto;
    if (this.listOfAssignees.length === 0) {
      this.utils.showLoading('Getting Surveyors').then(() => {
        this.apiService.getSurveyors().subscribe(assignees => {
          this.utils.hideLoading().then(() => {
            this.listOfAssignees = [];
            // this.listOfAssignees.push(this.utils.getDefaultAssignee(this.storage.getUserID()));
            assignees.forEach(item => this.listOfAssignees.push(item));
            console.log(this.listOfAssignees);
            this.showBottomDraw = true;
            this.surveyId = id;
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
      this.surveyId = id;
      this.utils.setBottomBarHomepage(false);
      this.drawerState = DrawerState.Docked;
      this.assignForm.patchValue({
        assignedto: ''
      });
    }
  

  }

  selfAssign(id: number,surveyData){
    var designstarttime = new Date();
    var milisecond = designstarttime.getTime();
var postData={}
postData = {
  reviewassignedto: this.userData.id,
  status: "reviewassigned",
  reviewstarttime: milisecond
};
this.utils.showLoading('Assigning').then(()=>{
  this.apiService.updateSurveyForm(postData,id).subscribe((value) => {
    this.utils.hideLoading().then(()=>{
      ;
      console.log('reach ', value);
    this.utils.showSnackBar('Design request has been assigned to you successfully');
    this.utils.sethomepageSurveyRefresh(true);

    })
  }, (error) => {
    this.utils.hideLoading();

  });
})

  }

  // getSurveys(event: CustomEvent) {
  //   let showLoader = true;
  //   if (event != null && event !== undefined) {
  //     showLoader = false;
  //   }
  //   if (this.storage.getUser().role.id === ROLES.Surveyor) {
  //     this.getSurveyorSurveys(event, showLoader);
  //   } else {
  //     this.getSurvey(event, showLoader);
  //   }
  // }

  sDatePassed(datestring: any,i){
    var checkdate = moment(datestring, "YYYYMMDD");
    var todaydate = moment(new Date(), "YYYYMMDD");
    var lateby = todaydate.diff(checkdate, "days");
    this.overdue = lateby;  
    console.log(this.overdue,">>>>>>>>>>>>>>>>>.");
    
  }
  getassignedata(asssignedata){
    this.selectedDesigner = asssignedata;
    
  }

  
  async openreviewPassed(id,designData){ 
    this.surveyId=id
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
               this.apiService.updateSurveyForm(postData, this.surveyId).subscribe((value) => {
                this.utils.hideLoading().then(()=>{
                  ; 
                  console.log('reach ', value);
                 this.utils.showSnackBar('Survey request has been delivered successfully');
                 
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

  close() {
    if (this.showBottomDraw === true) {
      this.showBottomDraw = false;
      this.drawerState = DrawerState.Bottom;
      this.utils.setBottomBarHomepage(true);
    } else {
      this.showBottomDraw = true;
    }
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
        this.getSurveys(null)
      }
  });
      return await modal.present();
   }

}

export class SurveyDataHelper {
  listOfSurveys: SurveyDataModel[];
  date: any;
  lateby:any;

  constructor() {
    this.listOfSurveys = [];
  }
}

