import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-survey-required-model',
  templateUrl: './survey-required-model.page.html',
  styleUrls: ['./survey-required-model.page.scss'],
})
export class SurveyRequiredModelPage implements OnInit {

  public getSurveyRequiredData: any = [];

  constructor(
    private modalCtrl: ModalController,
    private nav: NavParams,
  ) { }

  ngOnInit() {
    this.getSurveyRequiredData = this.nav.get('data');
  }

  dismiss(data = null) {
    this.modalCtrl.dismiss({
      'dismissed': true,
      viewData: data
    });
  }

}
