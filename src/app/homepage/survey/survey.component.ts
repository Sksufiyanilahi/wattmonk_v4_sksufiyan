import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from 'src/app/utilities.service';
import { ApiService } from 'src/app/api.service';
import { SurveyDataModel } from 'src/app/model/survey.model';
import { ErrorModel } from 'src/app/model/error.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss'],
})
export class SurveyComponent implements OnInit {

  listOfSurveyData: SurveyDataModel[] = [];
  listofSurveyDataHelper: SurveyDataHelper[] = [];

  constructor(
    private utils:UtilitiesService,
    private apiService: ApiService,
    private datePipe: DatePipe,
  ) { 
    this.getSurvey();
  }

  ngOnInit() {}

  getSurvey() {
    this.utils.showLoading('Getting Surveys').then((success) => {
      this.apiService.getSurvey().subscribe(response => {
        this.utils.hideLoading();
        console.log(response);
        this.listOfSurveyData = response;
        this.listOfSurveyData.forEach((surveyItem) => {
          if (this.listofSurveyDataHelper.length === 0) {
            const listOfSurvey = new SurveyDataHelper();
            listOfSurvey.date = this.datePipe.transform(surveyItem.created_at, 'M/d/yy');
            listOfSurvey.listOfSurveys.push(surveyItem);
            this.listofSurveyDataHelper.push(listOfSurvey);
          } else {
            this.listofSurveyDataHelper.forEach((surveyList) => {
              if(surveyList.date === this.datePipe.transform(surveyItem.created_at,'M/d/yy')) {
                surveyList.listOfSurveys.push(surveyItem);
              }else{
                const listOfSurvey = new SurveyDataHelper();
                listOfSurvey.date = this.datePipe.transform(surveyItem.created_at, 'M/d/yy');
                listOfSurvey.listOfSurveys.push(surveyItem);
                this.listofSurveyDataHelper.push(listOfSurvey);
              }
            });
          }
        });
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

