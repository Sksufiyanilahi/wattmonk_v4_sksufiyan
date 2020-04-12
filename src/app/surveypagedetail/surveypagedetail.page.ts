import { Component, OnInit } from '@angular/core';
import { SurveyDataModel } from '../model/survey.model';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { UtilitiesService } from '../utilities.service';
import { DesginDataModel } from '../model/design.model';
import { ErrorModel } from '../model/error.model';

@Component({
  selector: 'app-surveypagedetail',
  templateUrl: './surveypagedetail.page.html',
  styleUrls: ['./surveypagedetail.page.scss'],
})
export class SurveypagedetailPage implements OnInit {

  myId = null;
  surveyData:SurveyDataModel;

  constructor(
    private route:ActivatedRoute,
    private apiservice: ApiService,
    private utils: UtilitiesService
  ) { }

  ngOnInit() {
    this.myId = this.route.snapshot.paramMap.get('id');
    console.log(this.myId);
    this.surveyData = new SurveyDataModel();
    this.getSurveyDetail();
  }

  getSurveyDetail(){
    this.utils.showLoading('loading').then((success) => {
      this.apiservice.getSurveyDetail(this.myId).subscribe(response => {
        this.utils.hideLoading();
        this.surveyData = response[0];
        console.log("reach", this.surveyData);
      }, responseError => {
        this.utils.hideLoading();
        const error: ErrorModel = responseError.error;
        this.utils.showAlert(error.message[0].messages[0].message);
      });   
  });
  }

}
