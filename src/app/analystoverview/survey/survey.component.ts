import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {UtilitiesService} from 'src/app/utilities.service';
import {ApiService} from 'src/app/api.service';
import {SurveyDataModel} from 'src/app/model/survey.model';
import {ErrorModel} from 'src/app/model/error.model';
import {DatePipe} from '@angular/common';
import {Subscription} from 'rxjs';
import {ActionSheetController, NavController, Platform} from '@ionic/angular';
import {LaunchNavigator, LaunchNavigatorOptions} from '@ionic-native/launch-navigator/ngx';
import {DrawerState} from 'ion-bottom-drawer';
import {AssigneeModel} from '../../model/assignee.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {StorageService} from 'src/app/storage.service';
import {Storage} from '@ionic/storage';
import {SurveyStorageModel} from 'src/app/model/survey-storage.model';
import * as moment from 'moment';
import {NetworkdetectService} from 'src/app/networkdetect.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss'],
})
export class SurveyComponent implements OnInit {

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
  assignForm: FormGroup;
  listOfAssignees: AssigneeModel[] = [];
  routeSubscription: Subscription;
  filterDataArray: SurveyDataModel[];
  segments: any;
  overdue: number;
  userData: any;
  netSwitch: any;
  deactivateNetworkSwitch: Subscription;

  constructor(
    private utils: UtilitiesService,
    private apiService: ApiService,
    private datePipe: DatePipe,
    private navController: NavController,
    private launchNavigator: LaunchNavigator,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
    private storage: Storage,
    private storageService: StorageService,
    private network: NetworkdetectService,
    private actionSheetController: ActionSheetController,
    private platform: Platform
  ) {
    this.segments = 'status=reviewassigned&status=reviewpassed&status=reviewfailed';
    const latestDate = new Date();
    this.today = datePipe.transform(latestDate, 'M/dd/yy');

    this.assignForm = this.formBuilder.group({
      assignedto: new FormControl('', [Validators.required]),
      status: new FormControl('assigned', [Validators.required])
    });
  }

  segmentChanged(event) {

    if (this.userData.role.type == 'qcinspector') {
      if (event.target.value == 'InReview') {
        this.segments = "status=reviewassigned&status=reviewpassed&status=reviewfailed";
        // return this.segments;
      } else if (event.target.value == 'delivered') {
        this.segments = "status=delivered";
      }
      this.getSurveys(null);
      // return this.segments;

    }
    // this.getsegmentdata(event.target.value);

    // this.segments= event.target.value;
    // this.getSurveys(event);

    // this.surveyRefreshSubscription = this.utils.getHomepageSurveyRefresh().subscribe((result) => {
    //   this.getSurveys(null);
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
    this.deactivateNetworkSwitch = this.network.networkSwitch.subscribe(data => {
      this.netSwitch = data;


    })
    this.surveyRefreshSubscription = this.utils.getHomepageSurveyRefresh().subscribe((result) => {

      this.getSurveys(null);
    });

    this.dataRefreshSubscription = this.utils.getDataRefresh().subscribe((result) => {
      if (this.listOfSurveyData != null && this.listOfSurveyData.length > 0) {
        this.formatSurveyData(this.listOfSurveyData);
      }
    });
    //  ;
    // this.routeSubscription.unsubscribe();
  }

  ngOnInit() {
    this.userData = this.storageService.getUser();

  }

  getSurveys(event?) {
    let showLoader = true;
    if (event != null && event !== undefined) {
      showLoader = false;
    }
    this.fetchPendingSurveys(event, showLoader);
  }

  fetchPendingSurveys(event?, showLoader?: boolean) {

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

  fillinDynamicData(records: SurveyDataModel[]): SurveyDataModel[] {
    records.forEach(element => {
      element.formattedjobtype = this.utils.getJobTypeName(element.jobtype);
      this.storage.get('' + element.id).then((data: SurveyStorageModel) => {

        if (data) {
          element.totalpercent = data.currentprogress;
        } else {
          element.totalpercent = 0;
        }
      });
    });

    return records;
  }

  ngOnDestroy(): void {
    this.surveyRefreshSubscription.unsubscribe();
    this.deactivateNetworkSwitch.unsubscribe();
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

  openAddressOnMap(address: string) {
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
          icon: 'logo-apple',
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
          icon: 'logo-google',
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
          icon: 'close',
          role: 'cancel',
          handler: () => {

          }
        }
      ]
    });
    await actionSheet.present();
  }

  dismissBottomSheet() {
    this.drawerState = DrawerState.Bottom;
    this.utils.setBottomBarHomepage(true);
  }

  assignToSurveyor() {
    if (this.assignForm.status === 'INVALID') {
      this.utils.errorSnackBar('Please select a surveyor');
    } else {
      this.apiService.updateSurveyForm(this.assignForm.value, this.surveyId).subscribe((value) => {
        this.dismissBottomSheet();
        this.utils.sethomepageSurveyRefresh(true);
      }, (error) => {
        this.dismissBottomSheet();
      });
    }

  }

  openSurveyors(id: number) {
    this.utils.showLoading('Getting Surveyors').then(() => {
      this.apiService.getSurveyors().subscribe(assignees => {
        this.utils.hideLoading().then(() => {
          this.listOfAssignees = [];
          assignees.forEach(item => this.listOfAssignees.push(item));
          this.surveyId = id;
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
     ;


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
