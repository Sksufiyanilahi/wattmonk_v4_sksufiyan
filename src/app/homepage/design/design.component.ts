import { Component, OnDestroy, OnInit } from '@angular/core';
import { DesignModel, DesginDataModel } from '../../model/design.model';
import { ApiService } from 'src/app/api.service';
import { UtilitiesService } from 'src/app/utilities.service';
import { ErrorModel } from 'src/app/model/error.model';
import { DatePipe } from '@angular/common';
import { StorageService } from 'src/app/storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.scss'],
})
export class DesignComponent implements OnInit, OnDestroy {

  listOfDesignDataHelper: DesginDataHelper[] = [];
  listOfDesignsData: DesginDataModel[] = [];
  private refreshSubscription: Subscription;


  constructor(
    private utils: UtilitiesService,
    private apiService: ApiService,
    private datePipe: DatePipe,
    private storage: StorageService
  ) {

  }

  ngOnInit() {
    this.refreshSubscription = this.utils.getHomepageDesignRefresh().subscribe((result) => {
      this.getDesign();
    });
  }

  ngOnDestroy(): void {
    this.refreshSubscription.unsubscribe();
  }

  getDesign() {
    this.listOfDesignsData = [];
    this.listOfDesignDataHelper = [];
    this.utils.showLoading('Getting designs').then((success) => {
      this.apiService.getDesgin().subscribe(response => {
        this.utils.hideLoading().then((loaderHidden) => {
          console.log(response);
          this.listOfDesignsData = response;
          const tempData: DesginDataHelper[] = [];
          this.listOfDesignsData.forEach((desginItem) => {
            if (tempData.length === 0) {
              const listOfDesign = new DesginDataHelper();
              listOfDesign.date = this.datePipe.transform(desginItem.created_at, 'M/d/yy');
              listOfDesign.listOfDesigns.push(desginItem);
              tempData.push(listOfDesign);
            } else {
              let added = false;
              tempData.forEach((desginList) => {
                if (!added) {
                  if (desginList.date === this.datePipe.transform(desginItem.created_at, 'M/d/yy')) {
                    desginList.listOfDesigns.push(desginItem);
                    added = true;
                  }
                }
              });
              if (!added) {
                const listOfDesign = new DesginDataHelper();
                listOfDesign.date = this.datePipe.transform(desginItem.created_at, 'M/d/yy');
                listOfDesign.listOfDesigns.push(desginItem);
                tempData.push(listOfDesign);
                added = true;
              }
            }
          });
          this.listOfDesignDataHelper = tempData;
          console.log(this.listOfDesignDataHelper);
        });
      }, responseError => {
        this.utils.hideLoading().then((loaderHidden) => {
          const error: ErrorModel = responseError.error;
          this.utils.showAlert(error.message[0].messages[0].message);
        });

      });
    }, (apiError) => {
      this.utils.hideLoading();
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
