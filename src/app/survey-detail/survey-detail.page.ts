import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from '../utilities.service';
import { ApiService } from '../api.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NavController } from '@ionic/angular';
import { switchMap } from 'rxjs/operators';
import { SurveyDataModel } from '../model/survey.model';

@Component({
  selector: 'app-survey-detail',
  templateUrl: './survey-detail.page.html',
  styleUrls: ['./survey-detail.page.scss'],
})
export class SurveyDetailPage implements OnInit {

  surveyId: number;
  survey: SurveyDataModel;

  constructor(
    private utilities: UtilitiesService,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private navController: NavController
  ) {
    this.surveyId = +this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.getSurveyDetails();
  }

  getSurveyDetails() {
    this.utilities.showLoading('Getting Survey Details').then((success) => {
      this.apiService.getSurveyDetail(this.surveyId).subscribe((result) => {
        this.utilities.hideLoading();
        this.survey = result;
      }, (error) => {
        this.utilities.hideLoading();
      });
    });
  }

  chat() {

  }

  goBack() {
    this.navController.pop();
  }

  getSurveyImages() {
    return this.survey.mspimages.length
      + this.survey.utilitymeterimages.length
      + this.survey.pvinverterimages.length
      + this.survey.pvmeterimages.length
      + this.survey.roofimages.length;
  }
}
