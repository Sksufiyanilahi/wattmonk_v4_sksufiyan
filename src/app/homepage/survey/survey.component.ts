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

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss'],
})
export class SurveyComponent implements OnInit, OnDestroy {

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

  constructor(
    private utils: UtilitiesService,
    private apiService: ApiService,
    private datePipe: DatePipe,
    private navController: NavController,
    private launchNavigator: LaunchNavigator,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const latestDate = new Date();
    this.today = datePipe.transform(latestDate, 'M/dd/yy');
    console.log('date', this.today);
    this.assignForm = this.formBuilder.group({
      assignedto: new FormControl('', [Validators.required])
    });
  }

  ionViewDidEnter() {
    this.routeSubscription.unsubscribe()
  }

  // ngOnInit() {
  //   this.surveyRefreshSubscription = this.utils.getHomepageSurveyRefresh().subscribe((result) => {
  //     this.getSurvey();
  //   });
  // }
  ngOnInit() {
    console.log("inside init");
    this.routeSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        if (this.router.url.indexOf('page') > -1) {
          this.router.navigated = false;
          let data = this.route.queryParams.subscribe((_res: any) => {
            console.log("Serach Term", _res)
            if (Object.keys(_res).length !== 0) {
              //  this.ApplysearchDesginAndSurvey(_res.serchTerm)

              this.filterData(_res.serchTerm);
            } else {
              this.surveyRefreshSubscription = this.utils.getHomepageDesignRefresh().subscribe((result) => {
                this.getSurvey();
              });
            }
          })
        }
      }
    });
  }

  filterData(serchTerm: any) {
    console.log(this.listOfSurveyData)
    let filterDataArray: any = this.listOfSurveyData.filter(x => x.id == serchTerm)
    const tempData: SurveyDataHelper[] = [];
    this.listOfSurveyData.forEach((surveyItem) => {
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

  getSurvey() {
    this.listOfSurveyData = [];
    this.listOfSurveyDataHelper = [];
    this.utils.showLoading('Getting Surveys').then((success) => {
      this.apiService.getSurvey().subscribe(response => {
        this.utils.hideLoading().then(() => {
          console.log(response);
          this.listOfSurveyData = response;
          const tempData: SurveyDataHelper[] = [];
          this.listOfSurveyData.forEach((surveyItem) => {
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
        });
      }, responseError => {
        this.utils.hideLoading().then(() => {
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
      this.apiService.getDesigners(UserRoles.SURVEYOR).subscribe(assignees => {
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
}

export class SurveyDataHelper {
  listOfSurveys: SurveyDataModel[];
  date: any;

  constructor() {
    this.listOfSurveys = [];
  }
}

