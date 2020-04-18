import { Component, OnDestroy, OnInit } from '@angular/core';
import { UtilitiesService } from 'src/app/utilities.service';
import { ApiService } from 'src/app/api.service';
import { SurveyDataModel } from 'src/app/model/survey.model';
import { ErrorModel } from 'src/app/model/error.model';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss'],
})
export class SurveyComponent implements OnInit, OnDestroy {

  listOfSurveyData: SurveyDataModel[] = [];
  listOfSurveyDataHelper: SurveyDataHelper[] = [];
  private surveyRefreshSubscription: Subscription;

  constructor(
    private utils: UtilitiesService,
    private apiService: ApiService,
    private datePipe: DatePipe,
  ) {
  }

  ngOnInit() {
    this.surveyRefreshSubscription = this.utils.getHomepageSurveyRefresh().subscribe((result) => {
      this.getSurvey();
    });
  }

  ngOnDestroy(): void {
    this.surveyRefreshSubscription.unsubscribe();
  }

  getSurvey() {
    this.listOfSurveyData = [];
    this.listOfSurveyDataHelper = [];
    this.utils.showLoading('Getting Surveys').then((success) => {
      this.apiService.getSurvey().subscribe(response => {
        this.utils.hideLoading();
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
      }, responseError => {
        this.utils.hideLoading();
        const error: ErrorModel = responseError.error;
        this.utils.showAlert(error.message[0].messages[0].message);
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

