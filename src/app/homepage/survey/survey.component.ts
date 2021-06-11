import {ChangeDetectorRef, Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {UtilitiesService} from 'src/app/utilities.service';
import {ApiService} from 'src/app/api.service';
import {SurveyCount, SurveyDataModel} from 'src/app/model/survey.model';
import {ErrorModel} from 'src/app/model/error.model';
import {DatePipe} from '@angular/common';
import {Subscription} from 'rxjs';
import {
  ActionSheetController,
  AlertController,
  IonContent,
  ModalController,
  NavController,
  Platform
} from '@ionic/angular';
import {LaunchNavigator, LaunchNavigatorOptions} from '@ionic-native/launch-navigator/ngx';
import {DrawerState} from 'ion-bottom-drawer';
import {AssigneeModel} from '../../model/assignee.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {COMETCHAT_CONSTANTS} from '../../constants';
import {StorageService} from 'src/app/storage.service';
import {Storage} from '@ionic/storage';
import {SurveyStorageModel} from 'src/app/model/survey-storage.model';
import * as moment from 'moment';
import {NetworkdetectService} from 'src/app/networkdetect.service';
import {CometChat} from '@cometchat-pro/cordova-ionic-chat';
import {EmailModelPage} from 'src/app/email-model/email-model.page';
import {SocialSharing} from '@ionic-native/social-sharing/ngx';
import {User} from 'src/app/model/user.model';
import {FileTransfer, FileTransferObject} from '@ionic-native/file-transfer/ngx';
import {File} from '@ionic-native/file/ngx';
import {AndroidPermissions} from '@ionic-native/android-permissions/ngx';
import {LocalNotifications} from '@ionic-native/local-notifications/ngx';


@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss'],
})
export class SurveyComponent {

  @ViewChild(IonContent, {static: false}) content: IonContent;
  indexoftodayrow = -1;


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
  selectedDesigner: any
  assignForm: FormGroup;
  listOfAssignees: AssigneeModel[] = [];
  routeSubscription: Subscription;
  filterDataArray: SurveyDataModel[];
  segments: any = 'status=created&status=outsourced&status=requestaccepted';
  overdue: number;
  userData: User;
  netSwitch: any;
  reviewAssignedTo: any;
  chatid: any

  updatechat_id: boolean = false;
  deactivateNetworkSwitch: Subscription;
  storageDirectory: string;
  SurveyCounts: SurveyCount=<SurveyCount>{};

  constructor(
    public utils: UtilitiesService,
    private alertController: AlertController,
    private socialsharing: SocialSharing,
    public modalController: ModalController,
    private apiService: ApiService,
    private datePipe: DatePipe,
    private navController: NavController,
    private launchNavigator: LaunchNavigator,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2,
    private router: Router,
    private route: ActivatedRoute,
    private storage: Storage,
    private storageService: StorageService,
    private network: NetworkdetectService,
    private platform: Platform,
    private file: File,
    private androidPermissions: AndroidPermissions,
    private transfer: FileTransfer,
    private localnotification: LocalNotifications,
    private el: ElementRef,
    private actionSheetController: ActionSheetController,
  ) {
    const latestDate = new Date();
    this.today = moment(latestDate).utc().format('M/D/YY');
    // this.today = datePipe.transform(latestDate, 'M/dd/yy','0');

    this.assignForm = this.formBuilder.group({
      assignedto: new FormControl(0, [Validators.required]),
      status: new FormControl('assigned', [Validators.required])
    });
  }

  segmentChanged(event?) {
    this.segments = event.target.value;
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
    this.makeDirectory();
    this.network.networkDisconnect();
    this.network.networkConnect();
    this.deactivateNetworkSwitch = this.network.networkSwitch.subscribe(data => {
      this.netSwitch = data;

    })
    // this.surveyRefreshSubscription = this.utils.getHomepageSurveyRefresh().subscribe((result) => {

    //   this.getSurveys(null);
    // });

    // this.dataRefreshSubscription = this.utils.getDataRefresh().subscribe((result) => {
    //   if(this.listOfSurveyData != null && this.listOfSurveyData.length > 0){
    //     this.formatSurveyData(this.listOfSurveyData);
    //   }
    // });
    //  ;
    // this.routeSubscription.unsubscribe();
  }

  ngOnInit() {
    this.userData = this.storageService.getUser();
    let userId = this.storageService.getUserID()
    
     

    this.setupCometChat();

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

  //   //         if (Object.keys(_res).length !== 0) {
  //   //           //  this.ApplysearchDesginAndSurvey(_res.serchTerm)

  //   //           this.filterData(_res.serchTerm);
  //   //         } else {
  //   //           // this.refreshSubscription = this.utils.getHomepageDesignRefresh().subscribe((result) => {
  //   //             //  ;
  //   //             this.getSurveys(null);
  //   //           // });
  //   //         }
  //   //       });
  //   //     }
  //   //   }
  //   // });

  //   // this.routeSubscription = this.router.events.subscribe((event) => {
  //   //   if (event instanceof NavigationEnd) {
  //   //     // Trick the Router into believing it's last link wasn't previously loaded
  //   //     if (this.router.url.indexOf('page') > -1) {
  //   //       this.router.navigated = false;
  //   //       const data = this.route.queryParams.subscribe((_res: any) => {

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
  getSurveys(event?) {
    this.apiService.getSurveycounts(this.userData.id).subscribe(res=>{this.SurveyCounts =res;
    })

    let showLoader = true;
    if (event != null && event !== undefined) {
      showLoader = false;
    }
    this.fetchPendingSurveys(event, showLoader);
  }

  fetchPendingSurveys(event, showLoader: boolean) {
    this.listOfSurveyData = [];
    this.listOfSurveyDataHelper = [];

    this.utils.showLoadingWithPullRefreshSupport(showLoader, 'Getting Surveys').then((success) => {
      this.apiService.getSurveyorSurveys(this.segments).subscribe(response => {
        this.utils.hideLoadingWithPullRefreshSupport(showLoader).then(() => {

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


  scrollTo() {
    setTimeout(() => {
      let todaytitleElement = document.getElementById(''+this.indexoftodayrow);
      this.content.scrollToPoint(0, todaytitleElement.offsetTop, 500);
    }, 2000)

  }


  // filterData(serchTerm: any) {

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

  formatSurveyData(records: SurveyDataModel[]) {
    this.listOfSurveyData = this.fillinDynamicData(records);

    const tempData: SurveyDataHelper[] = [];
    this.listOfSurveyData.forEach((surveyItem, i) => {
      this.sDatePassed(surveyItem.datetime, i);
      surveyItem.lateby = this.overdue;
      if(this.segments=='status=completed'){
        const listOfSurvey = new SurveyDataHelper();
        listOfSurvey.listOfSurveys.push(surveyItem);
        tempData.push(listOfSurvey);
      }
     else if (tempData.length === 0) {
        const listOfSurvey = new SurveyDataHelper();
        listOfSurvey.date = moment(surveyItem.datetime).utc().format('M/D/YY');
        // listOfSurvey.date = this.datePipe.transform(surveyItem.datetime, 'M/dd/yy','0');
        listOfSurvey.listOfSurveys.push(surveyItem);
        tempData.push(listOfSurvey);
      } else {
        let added = false;
        tempData.forEach((surveyList) => {
          if (!added) {
            if (surveyList.date === moment(surveyItem.datetime).utc().format('M/D/YY')) {
              surveyList.listOfSurveys.push(surveyItem);
              added = true;
            }
          }
        });
        if (!added) {
          const listOfSurvey = new SurveyDataHelper();
          listOfSurvey.date = moment(surveyItem.datetime).utc().format('M/D/YY');
          listOfSurvey.listOfSurveys.push(surveyItem);
          tempData.push(listOfSurvey);
          added = true;
        }
      }
    });
    //  this.listOfSurveyDataHelper = tempData;
  if(this.segments=='status=completed'){
    this.listOfSurveyDataHelper = tempData;
    }
    else{
    
     this.listOfSurveyDataHelper = tempData.sort(function (a, b) {
      var dateA = new Date(a.date).getTime(),
        dateB = new Date(b.date).getTime();
      return dateA - dateB;
    });

    //Code to get index of today date element
    this.listOfSurveyDataHelper.forEach((element, index) => {
      if(element.date == this.today){
        this.indexoftodayrow = index;
      }
    });
    }

    this.cdr.detectChanges();
    this.scrollTo();
  }

  fillinDynamicData(records: SurveyDataModel[]): SurveyDataModel[] {
    records.forEach(element => {
      element.formattedjobtype = this.utils.getJobTypeName(element.jobtype);
      element.recordupdatedon = this.utils.formatDateInTimeAgo(element.updated_at);
      this.storage.get(this.storageService.getUserID() + '-' + element.id).then((data: SurveyStorageModel) => {
        if (data) {
          console.log(data.currentprogress);
          element.remainingfilestoupload = data.remainingfilestoupload;
          element.totalpercent = data.currentprogress;
        } else {
          element.totalpercent = 0;
        }
      });

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
    });

    return records;
  }

  ngOnDestroy(): void {
    this.deactivateNetworkSwitch.unsubscribe();
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

  openAddressOnMap(address: string, event) {
    event.stopPropagation();
    if (this.platform.is('ios')) {
      this.presentActionSheet(address);
    } else {
      this.launchNavigator.navigate(address, this.options);
    }
  }

  async presentActionSheet(address) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Launch Directions',
      buttons: [
        {
          text: 'Apple Maps',
          role: 'apple-maps',
          handler: () => {
            this.options = {
              start: '',
              app: this.launchNavigator.APP.APPLE_MAPS
            };
            this.launchNavigator.navigate(address, this.options);
          }
        },
        {
          text: 'Google Maps',
          role: 'google-maps',
          handler: () => {
            this.options = {
              start: '',
              app: this.launchNavigator.APP.GOOGLE_MAPS
            };
            this.launchNavigator.navigate(address, this.options);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {

          }
        }
      ]
    });
    await actionSheet.present();
  }

  dismissBottomSheet() {
    this.showBottomDraw = false;

    this.drawerState = DrawerState.Bottom;
    this.utils.setBottomBarHomepage(true);
    this.listOfAssignees = [];
    // this.assignForm.get('comment').setValue("");
  }

  assignToSurveyor() {
     ;



    if (this.assignForm.status === 'INVALID' && (this.surveyData.status === 'reviewassigned' || this.surveyData.status === 'reviewfailed' || this.surveyData.status === 'reviewpassed')) {
      this.utils.errorSnackBar('Please select a analyst');
    } else if (this.assignForm.status === 'INVALID') {
      this.utils.errorSnackBar('Please select a surveyor');
    } else if (this.reviewAssignedTo != null && (this.selectedDesigner.id == this.reviewAssignedTo.id)) {
      this.utils.errorSnackBar("This survey request has been already assigned to" + " " + this.selectedDesigner.firstname + " " + this.selectedDesigner.lastname)

    } else {


      var surveystarttime = new Date();
      var milisecond = surveystarttime.getTime();
      var additonalhours = 0;
      if (this.surveyData.requesttype == "prelim") {

        additonalhours = parseInt(this.selectedDesigner.jobcount) * 2;

        surveystarttime.setHours(surveystarttime.getHours() + additonalhours);
      } else {
        additonalhours = parseInt(this.selectedDesigner.jobcount) * 6;
        surveystarttime.setHours(surveystarttime.getHours() + additonalhours);
      }

      var postData = {};
      if (this.surveyData.createdby.id == this.userData.id) {
         ;
        if (this.selectedDesigner.parent.id == this.userData.parent.id) {
          if (this.selectedDesigner.role.type == "qcinspector") {
            postData = {
              reviewassignedto: this.selectedDesigner.id,
              status: "reviewassigned",
              reviewstarttime: milisecond
            };
          }
          if (this.selectedDesigner.role.type == "surveyors") {
            postData = {
              assignedto: this.selectedDesigner.id,
              isoutsourced: "false",
              status: "assigned",
              surveystarttime: surveystarttime
            };

          }

        } else {
          postData = {
            outsourcedto: this.selectedDesigner.id,
            isoutsourced: "true",
            status: "outsourced"
          };
        }
      } else {
        if (this.selectedDesigner.role.type == "surveyors") {
          postData = {
            assignedto: this.selectedDesigner.id,
            status: "assigned",
            surveystarttime: surveystarttime
          };
        }
        if (this.selectedDesigner.role.type == "qcinspector") {
          postData = {
            reviewassignedto: this.selectedDesigner.id,
            status: "reviewassigned",
            reviewstarttime: milisecond
          };
        }
      }
      this.utils.showLoading('Assigning').then(() => {
        this.apiService.updateSurveyForm(postData, this.surveyId).subscribe((value) => {
          this.utils.hideLoading().then(() => {
            ;
            this.createNewDesignChatGroup(value);


            this.utils.showSnackBar('Survey request has been assigned to' + ' ' + this.selectedDesigner.firstname + " " + this.selectedDesigner.lastname + ' ' + 'successfully');

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

  generatePdf(id, event) {
    event.stopPropagation();
    this.utils.showLoading('Generating PDF').then(() => {
      this.apiService.generatePdf(id).subscribe(res => {
        this.utils.hideLoading();

        this.utils.sethomepageSurveyRefresh(true);

      }, err => {
        this.utils.hideLoading();
        this.utils.showSnackBar('Error in generating PDF');
      })
    });
  }


  openAnalysts(id: number, surveyData) {
    this.listOfAssignees = [];

    this.surveyData = surveyData;

    this.reviewAssignedTo = surveyData.reviewassignedto;

    if (this.listOfAssignees.length === 0) {
      this.utils.showLoading('Getting Analysts').then(() => {
        this.apiService.getAnalysts().subscribe(assignees => {
          this.utils.hideLoading().then(() => {
            this.listOfAssignees = [];
            // this.listOfAssignees.push(this.utils.getDefaultAssignee(this.storage.getUserID()));
            assignees.forEach(item => this.listOfAssignees.push(item));

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


  openSurveyors(id: number, surveyData, event) {
    event.stopPropagation();
    this.listOfAssignees = [];


    this.surveyData = surveyData;
    this.reviewAssignedTo = surveyData.assignedto;
    if (this.listOfAssignees.length === 0) {
      this.utils.showLoading('Getting Surveyors').then(() => {
        this.apiService.getSurveyors().subscribe(assignees => {
          this.utils.hideLoading().then(() => {
            this.listOfAssignees = [];
            // this.listOfAssignees.push(this.utils.getDefaultAssignee(this.storage.getUserID()));
            assignees.forEach(item => this.listOfAssignees.push(item));

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

  selfAssign(id: number, surveyData) {
    var designstarttime = new Date();
    var milisecond = designstarttime.getTime();
    var postData = {}
    postData = {
      reviewassignedto: this.userData.id,
      status: "reviewassigned",
      reviewstarttime: milisecond
    };
    this.utils.showLoading('Assigning').then(() => {
      this.apiService.updateSurveyForm(postData, id).subscribe((value) => {
        this.utils.hideLoading().then(() => {
          ;

          this.utils.showSnackBar('Design request has been assigned to you successfully');
          this.utils.sethomepageSurveyRefresh(true);

        })
      }, (error) => {
        this.utils.hideLoading();

      });
    })

  }

  // getSurveys(event) {
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

  sDatePassed(datestring: any, i) {
    var checkdate = moment(datestring, "YYYYMMDD");
    var todaydate = moment(new Date(), "YYYYMMDD");
    var lateby = todaydate.diff(checkdate, "days");
    this.overdue = lateby;


  }

  getassignedata(asssignedata) {
    this.selectedDesigner = asssignedata;

  }


  raisepermit(data: any, event) {
    event.stopPropagation();
    let objToSend: NavigationExtras = {
      queryParams: {
        surveyData: data,
        // tabsDisabled: true,
        // nonEditableField: true
      },
      skipLocationChange: false,
      fragment: 'top'
    };


    this.router.navigate(['/permitschedule/'], {
      state: {productdetails: objToSend}
    });
  }

  async openreviewPassed(id, designData) {
    this.surveyId = id
    const alert = await this.alertController.create({
      cssClass: 'alertClass',
      header: 'Confirm!',
      message: 'Would you like to  Add Comments!!',
      inputs:
        [{
          name: 'comment',
          id: 'comment',
          type: 'textarea',
          placeholder: 'Enter Comment'
        }
        ],
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
            var postData = {};
            if (alertData.comment != "") {
              postData = {
                status: "delivered",
                comments: alertData.comment,
              };
            } else {
              postData = {
                status: "delivered",
              };
            }

            this.apiService.updateSurveyForm(postData, this.surveyId).subscribe((value) => {
              this.utils.hideLoading().then(() => {
                ;

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

  createNewDesignChatGroup(survey: SurveyDataModel) {
    var GUID = survey.chatid;
    var address = survey.address.substring(0, 60);
    var groupName = survey.name + "_" + address;

    var groupType = CometChat.GROUP_TYPE.PRIVATE;
    var password = "";

    var group = new CometChat.Group(GUID, groupName, groupType, password);

    CometChat.createGroup(group).then(
      group => {
        let membersList = [
          new CometChat.GroupMember("" + survey.createdby.id, CometChat.GROUP_MEMBER_SCOPE.ADMIN),
          new CometChat.GroupMember("" + this.userData.id, CometChat.GROUP_MEMBER_SCOPE.ADMIN)
        ];
        CometChat.addMembersToGroup(group.getGuid(), membersList, []).then(
          response => {
            // if(design.requesttype == "permit"){
            //   let postdata={
            //     chatid:GUID
            //   // }
            // }

            // this.apiService.updateSurveyForm(postdata,this.surveyId).subscribe(res=>{

            // this.chatid=res.chatid;

            this.updatechat_id = true;
            this.addUserToGroupChat(GUID);

            // })
            // this.updateItemInList(LISTTYPE.NEW, design);
            // }else{
            // this.updateItemInPermitList(LISTTYPE.NEW, design);
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

  addUserToGroupChat(GUID) {

    var userscope = CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT;

    // userscope = CometChat.GROUP_MEMBER_SCOPE.ADMIN;

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


  close() {
    if (this.showBottomDraw === true) {
      this.showBottomDraw = false;
      this.drawerState = DrawerState.Bottom;
      this.utils.setBottomBarHomepage(true);
    } else {
      this.showBottomDraw = true;
    }
  }

  shareWhatsapp(designData) {
    this.socialsharing.share(designData.prelimdesign.url);
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
        this.getSurveys(null)
      }
    });
    return await modal.present();
  }

  assignedTo(surveyData, event) {
    event.stopPropagation();
    let postData = {
      assignedto: this.userData.id,
      status: "assigned"
    };
    this.apiService.updateSurveyForm(postData, surveyData.id).subscribe(res => {

    })
    this.router.navigate(['/startsurvey/' + surveyData.id + '/' + surveyData.jobtype]);
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

  designDownload(designData,event) {
    event.stopPropagation();
    let pdf = designData.surveypdf == null ? '' : designData.surveypdf;
    this.platform.ready().then(() => {
      this.file.resolveDirectoryUrl(this.storageDirectory).then(resolvedDirectory => {
        this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then(

          err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE)
        );
        this.file.checkFile(resolvedDirectory.nativeURL, pdf.url).then(data => {


          if (data == true) {

          } else {

            throw {code: 1, message: 'NOT_FOUND_ERR'};
          }

        }).catch(async err => {


          if (err.code == 1) {
            const fileTransfer: FileTransferObject = this.transfer.create();
            // this.utils.showLoading('Downloading').then(()=>{
            fileTransfer.download(url, this.storageDirectory + pdf.url).then((entry) => {
              // this.utils.hideLoading().then(()=>{

              this.utils.showSnackBar("Survey File Downloaded Successfully");

              // this.clickSub = this.localnotification.on('click').subscribe(data => {

              //   path;
              // })
              this.localnotification.schedule({
                text: 'Survey File Downloaded Successfully',
                foreground: true,
                vibrate: true
              })
              // }, (error) => {
              //   // handle error


              // });
            })
            // })
          }
        })
      })
    })


    let dir_name = 'WattMonk';
    let path = '';
    const url = designData.surveypdf.url;
    const fileTransfer: FileTransferObject = this.transfer.create();


    let result = this.file.createDir(this.file.externalRootDirectory, dir_name, true);
    result.then((resp) => {
      path = resp.toURL();


      fileTransfer.download(url, path + designData.surveypdf.hash + designData.surveypdf.ext).then((entry) => {

        this.utils.showSnackBar("Survey File Downloaded Successfully");

        // this.clickSub = this.localnotification.on('click').subscribe(data => {

        //   path;
        // })
        this.localnotification.schedule({text: 'Downloaded Successfully', foreground: true, vibrate: true})
      }, (error) => {
        // handle error
      });
    })


  }

  resumeSurvey(surveyData, event) {
    event.stopPropagation();
    this.router.navigate(['/startsurvey/' + surveyData.id + '/' + surveyData.jobtype]);
  }

  gotoActivity(surveyData, event) {

    event.stopPropagation();
    this.router.navigate(['/activity' + '/' + surveyData.id + '/survey'])

  }

  gotoDetails(surveyData, $event) {
    // $event.preventDefault();
    // $event.stopPropagation();
    // this.router.navigate(['/survey-detail/' + surveyData.id])
    this.utils.setPrelimId(surveyData)
    this.utils.setRequestType('survey')
    this.router.navigate(['/masterdetailpage/survey/' + surveyData.id])
  }

  gotoChats(surveyData,event){
    event.stopPropagation();
     let objToSend: NavigationExtras = {
      queryParams: {
       name:surveyData.name +'_'+surveyData.address,
       guid:surveyData.chatid
      },
      skipLocationChange: false,
      fragment: 'top'
  };


  this.router.navigate(['chat/'+ surveyData.chatid], {
  state: { productdetails: objToSend }
  });
  }

}

export class SurveyDataHelper {
  listOfSurveys: SurveyDataModel[];
  date: any;
  lateby: any;

  constructor() {
    this.listOfSurveys = [];
  }
}
