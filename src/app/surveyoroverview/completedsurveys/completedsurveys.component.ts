import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SurveyDataModel } from 'src/app/model/survey.model';
import { SurveyDataHelper } from 'src/app/homepage/survey/survey.component';
import { Subscription } from 'rxjs';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';
import { DatePipe } from '@angular/common';
import { UtilitiesService } from 'src/app/utilities.service';
import { ApiService } from 'src/app/api.service';
import { ErrorModel } from 'src/app/model/error.model';
import { SurveyStorageModel } from 'src/app/model/survey-storage.model';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-completedsurveys',
  templateUrl: './completedsurveys.component.html',
  styleUrls: ['./completedsurveys.component.scss'],
})
export class CompletedsurveysComponent implements OnInit {

  listOfSurveyData: SurveyDataModel[] = [];
  listOfSurveyDataHelper: SurveyDataHelper[] = [];
  private surveyRefreshSubscription: Subscription;
  routeSubscription: Subscription;

  today: any;
  options: LaunchNavigatorOptions = {
    start: '',
    app: this.launchNavigator.APP.GOOGLE_MAPS
  };

  constructor(private launchNavigator: LaunchNavigator,
    private datePipe: DatePipe,
    private cdr: ChangeDetectorRef,
    private utils: UtilitiesService,
    private storage: Storage,
    private apiService: ApiService) {
      console.log("inside new surveys");
    const latestDate = new Date();
    this.today = datePipe.transform(latestDate, 'M/dd/yy');
    console.log('date', this.today);
  }

  ngOnInit() {
    this.getSurveys(null);
  }

  ionViewDidEnter(){
    console.log("got back");
    if(this.listOfSurveyData != null && this.listOfSurveyData.length > 0){
      console.log("reloading data");
      this.formatSurveyData(this.listOfSurveyData);
    }
  }

  getSurveys(event: CustomEvent) {
    let showLoader = true;
    if (event != null && event !== undefined) {
      showLoader = false;
    }
    this.fetchPendingSurveys(event, showLoader);
  }

  fetchPendingSurveys(event, showLoader: boolean) {
    console.log("inside fetch surveys");
    this.listOfSurveyData = [];
    this.listOfSurveyDataHelper = [];
    this.utils.showLoadingWithPullRefreshSupport(showLoader, 'Getting Surveys').then((success) => {
      this.apiService.getSurveyorSurveys("status=surveycompleted").subscribe(response => {
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

  openAddressOnMap(address: string) {
    this.launchNavigator.navigate(address, this.options);
  }

  formatSurveyData(records : SurveyDataModel[]){
    this.listOfSurveyData = this.fillinDynamicData(records);
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

}