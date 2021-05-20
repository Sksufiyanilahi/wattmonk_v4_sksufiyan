import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {SurveyDataModel} from 'src/app/model/survey.model';
import {SurveyDataHelper} from 'src/app/homepage/survey/survey.component';
import {Subscription} from 'rxjs';
import {LaunchNavigator, LaunchNavigatorOptions} from '@ionic-native/launch-navigator/ngx';
import {DatePipe} from '@angular/common';
import {UtilitiesService} from 'src/app/utilities.service';
import {ApiService} from 'src/app/api.service';
import {ErrorModel} from 'src/app/model/error.model';
import {SurveyStorageModel} from 'src/app/model/survey-storage.model';
import {Storage} from '@ionic/storage';
import * as moment from 'moment';
import {NavigationExtras, Router} from '@angular/router';
import {ActionSheetController, Platform, IonContent} from "@ionic/angular";

@Component({
  selector: 'app-completedsurveys',
  templateUrl: './completedsurveys.component.html',
  styleUrls: ['./completedsurveys.component.scss'],
})
export class CompletedsurveysComponent implements OnInit {
  @ViewChild(IonContent, {static: false}) content: IonContent;
  indexoftodayrow = -1;
  listOfSurveyData: SurveyDataModel[] = [];
  listOfSurveyDataHelper: SurveyDataHelper[] = [];
  private surveyRefreshSubscription: Subscription;
  private dataRefreshSubscription: Subscription;
  routeSubscription: Subscription;

  today: any;
  options: LaunchNavigatorOptions = {
    start: '',
    app: this.launchNavigator.APP.GOOGLE_MAPS
  };
  overdue: number;

  constructor(
    private launchNavigator: LaunchNavigator,
    private datePipe: DatePipe,
    private cdr: ChangeDetectorRef,
    public utils: UtilitiesService,
    private storage: Storage,
    private apiService: ApiService,
    private router: Router,
    private actionSheetController: ActionSheetController,
    private platform: Platform
  ) {

    const latestDate = new Date();
    this.today = datePipe.transform(latestDate, 'M/dd/yy');

  }

  ngOnInit() {
    this.surveyRefreshSubscription = this.utils.getHomepageSurveyRefresh().subscribe((result) => {
      this.getSurveys(null);
    });

    this.dataRefreshSubscription = this.utils.getDataRefresh().subscribe((result) => {
      if (this.listOfSurveyData != null && this.listOfSurveyData.length > 0) {
        this.formatSurveyData(this.listOfSurveyData);
      }
    });
  }


  getSurveys(event) {
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
      this.apiService.getSurveyorSurveys("status=completed").subscribe(response => {
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

  scrollTo() {
    setTimeout(() => {
      let todaytitleElement = document.getElementById(''+this.indexoftodayrow);
      this.content.scrollToPoint(0, todaytitleElement.offsetTop, 1000);
    }, 2000)

  }


  formatSurveyData(records: SurveyDataModel[]) {
    this.listOfSurveyData = this.fillinDynamicData(records);
    const tempData: SurveyDataHelper[] = [];
    this.listOfSurveyData.forEach((surveyItem, i) => {
      this.sDatePassed(surveyItem.datetime, i);
      surveyItem.lateby = this.overdue;
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
    this.listOfSurveyDataHelper = tempData.sort(function (a, b) {
      var dateA = new Date(a.date).getTime(),
        dateB = new Date(b.date).getTime();
      return dateA - dateB;
    });

    this.listOfSurveyDataHelper.forEach((element, index) => {
      if(element.date == this.today){
        this.indexoftodayrow = index;
      }
    });

    this.scrollTo();
    this.cdr.detectChanges();
  }

  fillinDynamicData(records: SurveyDataModel[]): SurveyDataModel[] {
    records.forEach(element => {
      element.formattedjobtype = this.utils.getJobTypeName(element.jobtype);
      element.recordupdatedon = this.utils.formatDateInTimeAgo(element.updated_at);
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

  sDatePassed(datestring: any, i) {
    var checkdate = moment(datestring, "YYYYMMDD");
    var todaydate = moment(new Date(), "YYYYMMDD");
    var lateby = todaydate.diff(checkdate, "days");
    this.overdue = lateby;


  }

  ngOnDestroy(): void {
    // this.refreshSubscription.unsubscribe();
    // this.routeSubscription.unsubscribe();
    this.dataRefreshSubscription.unsubscribe();
    this.surveyRefreshSubscription.unsubscribe();
    this.cdr.detach();
  }

  resumeSurvey(surveyData, event) {
    event.stopPropagation();
    this.router.navigate(['/camera/' + surveyData.id + '/' + surveyData.jobtype + '/' + surveyData.city + '/' + surveyData.state]);
  }

  gotoActivity(surveyData, event) {

    event.stopPropagation();
    this.router.navigate(['/activity' + '/' + surveyData.id + '/survey'])

  }

  gotoDetails(surveyData, $event) {
    // $event.preventDefault();
    // $event.stopPropagation();
    this.router.navigate(['/survey-detail/' + surveyData.id])
  }

  gotoChats(surveyData,event){

    event.stopPropagation();
    this.router.navigate(['/chat/' + surveyData.chatid])
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
