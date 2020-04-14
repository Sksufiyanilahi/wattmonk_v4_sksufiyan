import { Component, OnInit } from '@angular/core';
import { DesignModel, DesginDataModel } from '../../model/design.model';
import { ApiService } from 'src/app/api.service';
import { UtilitiesService } from 'src/app/utilities.service';
import { ErrorModel } from 'src/app/model/error.model';
import { DatePipe } from '@angular/common';
import { StorageService } from 'src/app/storage.service';

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.scss'],
})
export class DesignComponent implements OnInit {

  listOfDesignDataHelper: DesginDataHelper[] = [];
  listOfDesignsData: DesginDataModel[] = [];


  constructor(
    private utils: UtilitiesService,
    private apiService: ApiService,
    private datePipe: DatePipe,
    private storage: StorageService
  ) {

  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.getDesign();
  }

  getDesign() {
    this.listOfDesignsData = [];
    this.listOfDesignDataHelper = [];
    this.utils.showLoading('Getting designs').then((success) => {
      this.apiService.getDesgin().subscribe(response => {
        this.utils.hideLoading();
        console.log(response);
        this.listOfDesignsData = response;
        this.listOfDesignsData.forEach((desginItem) => {
          if (this.listOfDesignDataHelper.length === 0) {
            const listOfDesign = new DesginDataHelper();
            listOfDesign.date = this.datePipe.transform(desginItem.created_at, 'M/d/yy');
            listOfDesign.listOfDesigns.push(desginItem);
            this.listOfDesignDataHelper.push(listOfDesign);
          } else {
            this.listOfDesignDataHelper.forEach((desginList) => {
              if (desginList.date === this.datePipe.transform(desginItem.created_at, 'M/d/yy')) {
                desginList.listOfDesigns.push(desginItem);
              } else {
                const listOfDesign = new DesginDataHelper();
                listOfDesign.date = this.datePipe.transform(desginItem.created_at, 'M/d/yy');
                listOfDesign.listOfDesigns.push(desginItem);
                this.listOfDesignDataHelper.push(listOfDesign);
              }
            });
          }
        }, responseError => {
          this.utils.hideLoading();
          const error: ErrorModel = responseError.error;
          this.utils.showAlert(error.message[0].messages[0].message);
        });
      }, (apiError) => {
        this.utils.hideLoading();
      });
    });
  }
}


export class DesginDataHelper {
  listOfDesigns: DesginDataModel[];
  date: any;

  constructor() {
    this.listOfDesigns = [];
  }
}
