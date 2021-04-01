import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DesginDataModel } from '../model/design.model';
import { ApiService } from '../api.service';
import { UtilitiesService } from '../utilities.service';
import { ErrorModel } from '../model/error.model';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-homepagedetail',
  templateUrl: './homepagedetail.page.html',
  styleUrls: ['./homepagedetail.page.scss'],
})
export class HomepagedetailPage implements OnInit {

  myId = null;
  desginData:DesginDataModel;

  constructor(
    private route:ActivatedRoute,
    private apiservice: ApiService,
    private utils: UtilitiesService,
    private navController: NavController
  ) { }

  ngOnInit() {
    this.myId = this.route.snapshot.paramMap.get('id');

    this.desginData = new DesginDataModel();
    this.getDesginDetail();

  }

  getDesginDetail(){
    this.utils.showLoading('loading').then((success) => {
      this.apiservice.getDesginDetail(this.myId).subscribe(response => {
        this.utils.hideLoading();
        this.desginData = response[0];

      }, responseError => {
        this.utils.hideLoading();
        const error: ErrorModel = responseError.error;
        this.utils.errorSnackBar(error.message[0].messages[0].message);
      });
  });
  }

  goBack() {
    this.navController.pop()
  }

}
