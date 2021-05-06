import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-startsurvey',
  templateUrl: './startsurvey.page.html',
  styleUrls: ['./startsurvey.page.scss'],
})
export class StartsurveyPage implements OnInit {

  constructor(private datastorage: Storage) { }

  ngOnInit() {
    this.loadSurveyJSON('pvsurveyjson');
  }

  loadSurveyJSON(type){
    this.datastorage.get(type).then((data) => {
      console.log(data);
    });
  }

}
