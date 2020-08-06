import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SurveyDataModel } from 'src/app/model/survey.model';
import { DesginDataHelper } from 'src/app/homepage/design/design.component';
import { Subscription } from 'rxjs';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';
import { DatePipe } from '@angular/common';
import { UtilitiesService } from 'src/app/utilities.service';
import { ApiService } from 'src/app/api.service';
import { ErrorModel } from 'src/app/model/error.model';
// import { SurveyStorageModel } from 'src/app/model/survey-storage.model';
import { Storage } from '@ionic/storage';
import { DesginDataModel } from 'src/app/model/design.model';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.scss'],
})
export class PendingComponent implements OnInit {

  listOfDesignData: DesginDataModel[] = [];
  listOfDesignDataHelper: DesginDataHelper[] = [];
  private designRefreshSubscription: Subscription;
  private dataRefreshSubscription: Subscription;
  currentDate:any=new Date()

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
    const latestDate = new Date();
    this.today = datePipe.transform(latestDate, 'M/dd/yy');
    console.log('date', this.today);
    this.apiService._OnMessageReceivedSubject.subscribe((r) => {
      console.log('message received! ', r);
      this.getDesigns();
    });
  }

  ngOnInit() {
 console.log("ngoninit");
console.log(this.currentDate.toISOString());

 
  }


  ionViewDidEnter(event){
    
    this.getDesigns(event);
    this.designRefreshSubscription = this.utils.getHomepageDesignRefresh().subscribe((result) => {
      this.getDesigns(null);
    });

    this.dataRefreshSubscription = this.utils.getDataRefresh().subscribe((result) => {
      if(this.listOfDesignData != null && this.listOfDesignData.length > 0){
        this.formatDesignData(this.listOfDesignData);
      }
    });
  }

  getDesigns(event?: CustomEvent) {
    let showLoader = true;
    if (event != null && event !== undefined) {
      showLoader = false;
    }
    this.fetchPendingDesigns(event);
  }

  fetchPendingDesigns(event?, showLoader?: boolean) {
    this.listOfDesignData = [];
    this.listOfDesignDataHelper = [];
    this.utils.showLoadingWithPullRefreshSupport(showLoader, 'Getting Designs').then((success) => {
      this.apiService.getDesignSurveys("status=designassigned&status=designinprocess").subscribe((response:any) => {
        this.utils.hideLoadingWithPullRefreshSupport(showLoader).then(() => {
          console.log(response);
          this.formatDesignData(response);
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

  formatDesignData(records : DesginDataModel[]){
    this.listOfDesignData = this.fillinDynamicData(records);
    console.log(this.listOfDesignData);
    
    const tempData: DesginDataHelper[] = [];
          this.listOfDesignData.forEach((designItem) => {
            if (tempData.length === 0) {
              const listOfDesigns = new DesginDataHelper();
              listOfDesigns.date = this.datePipe.transform(designItem.deliverydate, 'M/d/yy');
              listOfDesigns.listOfDesigns.push(designItem);
              tempData.push(listOfDesigns);
            } else {
              let added = false;
              tempData.forEach((designList:any) => {
                if (!added) {
                  if (designList.date === this.datePipe.transform(designList.deliverydate, 'M/d/yy')) {
                    designList.listOfDesigns.push(designList);
                    added = true;
                  }
                }
              });
              if (!added) {
                const listOfDesigns = new DesginDataHelper();
                listOfDesigns.date = this.datePipe.transform(designItem.deliverydate, 'M/d/yy');
                listOfDesigns.listOfDesigns.push(designItem);
                tempData.push(listOfDesigns);
                added = true;
              }
            }
          });
          this.listOfDesignDataHelper = tempData.sort(function (a, b) {
            var dateA = new Date(a.date).getTime(),
              dateB = new Date(b.date).getTime();
            return dateA - dateB;
          });
          this.cdr.detectChanges();
  }

  fillinDynamicData(records : DesginDataModel[]) : DesginDataModel[]{
    records.forEach(element => {
      element.formattedjobtype = this.utils.getJobTypeName(element.jobtype);
      this.storage.get(''+element.id).then((data: any) => {
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
