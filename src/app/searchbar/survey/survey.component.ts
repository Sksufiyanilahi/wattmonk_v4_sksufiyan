import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { UtilitiesService } from 'src/app/utilities.service';
import { ApiService } from 'src/app/api.service';
import { SurveyDataModel } from 'src/app/model/survey.model';
import { ErrorModel } from 'src/app/model/error.model';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { NavController } from '@ionic/angular';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';
import { DrawerState } from 'ion-bottom-drawer';
import { AssigneeModel } from '../../model/assignee.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserRoles } from '../../model/constants';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/storage.service';
import { ROLES } from 'src/app/contants';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss'],
})
export class SurveyComponent implements OnInit {

  listOfSurveyData: SurveyDataModel[] = [];
  listOfSurveyDataHelper: SurveyDataHelper[] = [];
  private surveyRefreshSubscription: Subscription;

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
    private storage: StorageService
  ) {
    const latestDate = new Date();
    this.today = datePipe.transform(latestDate, 'M/dd/yy');
    console.log('date', this.today);
    this.assignForm = this.formBuilder.group({
      assignedto: new FormControl('', [Validators.required]),
      status: new FormControl('surveyassigned', [Validators.required])
    });
  }

  ionViewDidEnter() {
    // this.routeSubscription.unsubscribe();
    this.getSurveys(null);
  }

  // ngOnInit() {
  //   this.surveyRefreshSubscription = this.utils.getHomepageSurveyRefresh().subscribe((result) => {
  //     this.getSurvey();
  //   });
  // }
  ngOnInit() {

    this.filterData(this.filterDataArray);
    this.routeSubscription = this.router.events.subscribe((event) => {
      console.log("//",event);
      console.log(this.router.url.indexOf('page'));
      if (event instanceof NavigationEnd) {
        console.log(event.url);

        // Trick the Router into believing it's last link wasn't previously loaded
        if (this.router.url.indexOf('page') >= -1) {
          this.router.navigated = false;
          let data = this.route.queryParams.subscribe((_res: any) => {
            console.log('Serach Term', _res);
            if (Object.keys(_res).length !== 0) {
              //  this.ApplysearchDesginAndSurvey(_res.serchTerm)

              this.filterData(_res.serchTerm);
            } else {
              // this.surveyRefreshSubscription = this.utils.getHomepageSurveyRefresh().subscribe((result) => {
                // this.getSurveys(null);

              // });
            }
          });
        }
      }
    });
    // console.log('inside init');
    // this.routeSubscription = this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationEnd) {
    //     // Trick the Router into believing it's last link wasn't previously loaded
    //     if (this.router.url.indexOf('page') > -1) {
    //       this.router.navigated = false;
    //       const data = this.route.queryParams.subscribe((_res: any) => {
    //         console.log('Search Term', _res);
    //         if (Object.keys(_res).length !== 0) {
    //           //  this.ApplysearchDesginAndSurvey(_res.serchTerm)
    //           this.filterData(_res.serchTerm);
    //         } else {
    //           this.surveyRefreshSubscription = this.utils.getHomepageSurveyRefresh().subscribe((result) => {
    //             this.getSurveys(null);
    //           });
    //         }
    //       });
    //     }
    //   }
    // });
    // this.getSurveys(null);

  }


  filterData(serchTerm: any) {
    console.log(this.listOfSurveyData);
    this.filterDataArray = this.listOfSurveyData.filter(x => x.id == serchTerm);
    const tempData: SurveyDataHelper[] = [];
    this.filterDataArray.forEach((surveyItem) => {
      if (tempData.length === 0) {
        const listOfSurvey = new SurveyDataHelper();
        listOfSurvey.date = this.datePipe.transform(surveyItem.created_at, 'M/d/yy');
        listOfSurvey.listOfSurveys.push(surveyItem);
        tempData.push(listOfSurvey);
      } else {
        let added = false;
        tempData.forEach((surveyList) => {
          if (!added) {
            if (surveyList.date === this.datePipe.transform(surveyItem.created_at, 'M/d/yy')) {
              surveyList.listOfSurveys.push(surveyItem);
              added = true;
            }
          }
        });
        if (!added) {
          const listOfSurvey = new SurveyDataHelper();
          listOfSurvey.date = this.datePipe.transform(surveyItem.created_at, 'M/d/yy');
          listOfSurvey.listOfSurveys.push(surveyItem);
          tempData.push(listOfSurvey);
          added = true;
        }
      }
    });
    this.listOfSurveyDataHelper = tempData;
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.surveyRefreshSubscription.unsubscribe();
  }

  getSurvey(event, showLoader: boolean) {
    this.listOfSurveyData = [];
    this.listOfSurveyDataHelper = [];
    this.utils.showLoadingWithPullRefreshSupport(showLoader, 'Getting Surveys').then((success) => {
      this.apiService.getSurvey().subscribe(response => {
        this.utils.hideLoadingWithPullRefreshSupport(showLoader).then(() => {
          if (event !== null) {
            event.target.complete();
          }
          console.log(response);
          this.listOfSurveyData = response;
          const tempData: SurveyDataHelper[] = [];
          this.listOfSurveyData.forEach((surveyItem) => {
            if (tempData.length === 0) {
              const listOfSurvey = new SurveyDataHelper();
              listOfSurvey.date = this.datePipe.transform(surveyItem.datetime, 'M/d/yy');
              listOfSurvey.listOfSurveys.push(surveyItem);
              tempData.push(listOfSurvey);
            } else {
              let added = false;
              tempData.forEach((surveyList) => {
                if (!added) {
                  if (surveyList.date === this.datePipe.transform(surveyItem.datetime, 'M/d/yy')) {
                    surveyList.listOfSurveys.push(surveyItem);
                    added = true;
                  }
                }
              });
              if (!added) {
                const listOfSurvey = new SurveyDataHelper();
                listOfSurvey.date = this.datePipe.transform(surveyItem.datetime, 'M/d/yy');
                listOfSurvey.listOfSurveys.push(surveyItem);
                tempData.push(listOfSurvey);
                added = true;
              }
            }
          });
          this.listOfSurveyDataHelper = tempData;
          this.cdr.detectChanges();
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

  getSurveyorSurveys(event, showLoader: boolean) {
    this.listOfSurveyData = [];
    this.listOfSurveyDataHelper = [];
    this.utils.showLoadingWithPullRefreshSupport(showLoader, 'Getting Surveys').then((success) => {
      this.apiService.getSurveyorSurveys("").subscribe(response => {
        this.utils.hideLoadingWithPullRefreshSupport(showLoader).then(() => {
          if (event !== null) {
            event.target.complete();
          }
          console.log(response);
          this.listOfSurveyData = response;
          const tempData: SurveyDataHelper[] = [];
          this.listOfSurveyData.forEach((surveyItem) => {
            if (tempData.length === 0) {
              const listOfSurvey = new SurveyDataHelper();
              listOfSurvey.date = this.datePipe.transform(surveyItem.datetime, 'M/d/yy');
              listOfSurvey.listOfSurveys.push(surveyItem);
              tempData.push(listOfSurvey);
            } else {
              let added = false;
              tempData.forEach((surveyList) => {
                if (!added) {
                  if (surveyList.date === this.datePipe.transform(surveyItem.datetime, 'M/d/yy')) {
                    surveyList.listOfSurveys.push(surveyItem);
                    added = true;
                  }
                }
              });
              if (!added) {
                const listOfSurvey = new SurveyDataHelper();
                listOfSurvey.date = this.datePipe.transform(surveyItem.datetime, 'M/d/yy');
                listOfSurvey.listOfSurveys.push(surveyItem);
                tempData.push(listOfSurvey);
                added = true;
              }
            }
          });
          this.listOfSurveyDataHelper = tempData;
          this.cdr.detectChanges();
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

  openAddressOnMap(address: string) {
    this.launchNavigator.navigate(address, this.options);
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
          console.log(this.listOfAssignees);
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

  getSurveys(event) {
    let showLoader = true;
    if (event != null && event !== undefined) {
      showLoader = false;
    }
    if (this.storage.getUser().role.id === ROLES.Surveyor) {
      this.getSurveyorSurveys(event, showLoader);
    } else {
      this.getSurvey(event, showLoader);
    }
  }

}

export class SurveyDataHelper {
  listOfSurveys: SurveyDataModel[];
  date: any;

  constructor() {
    this.listOfSurveys = [];
  }

}
