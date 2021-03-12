import { Component, OnInit, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { SurveyDataModel } from 'src/app/model/survey.model';
import { SurveyDataHelper } from 'src/app/homepage/survey/survey.component';
import { Subscription } from 'rxjs';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';
import { DatePipe } from '@angular/common';
import { UtilitiesService } from 'src/app/utilities.service';
import { ApiService } from 'src/app/api.service';
import { ErrorModel } from 'src/app/model/error.model';
import { SurveyStorageModel } from 'src/app/model/survey-storage.model';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';
import { StorageService } from 'src/app/storage.service';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-inreviewsurveys',
  templateUrl: './inreviewsurveys.component.html',
  styleUrls: ['./inreviewsurveys.component.scss'],
})
export class InreviewsurveysComponent implements OnInit {

  @ViewChild(IonContent,{static:false}) content: IonContent;
  listOfSurveyData: SurveyDataModel[] = [];
  listOfSurveyDataHelper: SurveyDataHelper[] = [];
  private surveyRefreshSubscription: Subscription;
  private dataRefreshSubscription: Subscription;

  today: any;
  options: LaunchNavigatorOptions = {
    start: '',
    app: this.launchNavigator.APP.GOOGLE_MAPS
  };
  overdue: number;
  userData:any;

  constructor(private launchNavigator: LaunchNavigator,
    private datePipe: DatePipe,
    private cdr: ChangeDetectorRef,
    public utils: UtilitiesService,
    private storage: Storage,
    private storageService:StorageService,
    private el:ElementRef,
    private router:Router,
    private apiService: ApiService) {

    }

    ngOnInit() {

      this.userData= this.storageService.getUser();
      const latestDate = new Date();
    this.today = this.datePipe.transform(latestDate, 'M/dd/yy');
    console.log('date', this.today);
    this.apiService._OnMessageReceivedSubject.subscribe((r) => {
      console.log('message received! ', r);
      this.getSurveys();
    });
  }
  scrollTo(offsetTop,date) {
    setTimeout(() => {
      let sectionOffset = this.el.nativeElement.getElementsByTagName('ion-grid')[date].offsetTop;
      console.log("sectionOffset == ", sectionOffset);
      this.content.scrollToPoint(0, sectionOffset, 1000);
    }, 500);
  }


  ionViewDidEnter(){

    this.surveyRefreshSubscription = this.utils.getHomepageSurveyRefresh().subscribe((result) => {
      this.getSurveys(null);
    });

    this.dataRefreshSubscription = this.utils.getDataRefresh().subscribe((result) => {
      if(this.listOfSurveyData != null && this.listOfSurveyData.length > 0){
        this.formatSurveyData(this.listOfSurveyData);
      }
    });
  }

  getSurveys(event?) {
    let showLoader = true;
    if (event != null && event !== undefined) {
      showLoader = false;
    }
    this.fetchPendingSurveys(event);
  }

  fetchPendingSurveys(event?, showLoader?: boolean) {
    this.listOfSurveyData = [];
    this.listOfSurveyDataHelper = [];
    this.utils.showLoadingWithPullRefreshSupport(showLoader, 'Getting Surveys').then((success) => {
      // this.utils.showLoading('Getting Surveys').then(()=>{
        this.apiService.getSurveyorSurveys("status=surveyinprocess").subscribe(response => {
          // this.utils.hideLoading().then(()=>{
            this.utils.hideLoadingWithPullRefreshSupport(showLoader).then(() => {
              console.log(response);
              this.formatSurveyData(response);
              if (event !== null) {
                event.target.complete();
              }
            });
          // })
        }, responseError => {
          this.utils.hideLoading();
          this.utils.hideLoadingWithPullRefreshSupport(showLoader).then(() => {
            if (event !== null) {
              event.target.complete();
            }
            const error: ErrorModel = responseError.error;
            this.utils.errorSnackBar(error.message[0].messages[0].message);
          });
        });
      // });
      })
  }

  openAddressOnMap(address: string,event) {
    event.stopPropagation();
    this.launchNavigator.navigate(address, this.options);
  }

  formatSurveyData(records : SurveyDataModel[]){
    this.listOfSurveyData = this.fillinDynamicData(records);

    const tempData: SurveyDataHelper[] = [];
          this.listOfSurveyData.forEach((surveyItem,i) => {
            this.sDatePassed(surveyItem.datetime,i);
            surveyItem.lateby = this.overdue;
            if (tempData.length === 0) {
              const listOfSurvey = new SurveyDataHelper();
              listOfSurvey.date = this.datePipe.transform(surveyItem.datetime, 'M/dd/yy');
              listOfSurvey.listOfSurveys.push(surveyItem);
              tempData.push(listOfSurvey);
              console.log(tempData);

            } else {
              let added = false;
              tempData.forEach((surveyList) => {
                if (!added) {
                  if (surveyList.date === this.datePipe.transform(surveyItem.datetime, 'M/dd/yy')) {
                    surveyList.listOfSurveys.push(surveyItem);
                    added = true;
                    console.log(surveyList.listOfSurveys);

                  }
                }
              });
              if (!added) {

                const listOfSurvey = new SurveyDataHelper();
                listOfSurvey.date = this.datePipe.transform(surveyItem.datetime, 'M/dd/yy');
                listOfSurvey.listOfSurveys.push(surveyItem);
                tempData.push(listOfSurvey);
                added = true;
                console.log(tempData);

              }
            }
          });
          this.listOfSurveyDataHelper = tempData.sort(function (a, b) {
            var dateA = new Date(a.date).getTime(),
              dateB = new Date(b.date).getTime();
            return dateB - dateA;
          });
          this.cdr.detectChanges();
  }

  fillinDynamicData(records : SurveyDataModel[]) : SurveyDataModel[]{
    records.forEach(element => {
      element.formattedjobtype = this.utils.getJobTypeName(element.jobtype);
      element.recordupdatedon = this.utils.formatDateInTimeAgo(element.updated_at);
      this.storage.get(''+element.id).then((data: SurveyStorageModel) => {
        console.log(data);
        if (data) {
          element.totalpercent = data.currentprogress;
           console.log(element);
        }else{
          element.totalpercent = 0;
          console.log(element);
        }

      });
    });

    return records;
  }

  sDatePassed(datestring: any,i){
    var checkdate = moment(datestring, "YYYYMMDD");
    var todaydate = moment(new Date(), "YYYYMMDD");
    var lateby = todaydate.diff(checkdate, "days");
    this.overdue = lateby;
    console.log(this.overdue,">>>>>>>>>>>>>>>>>.");

  }

  ngOnDestroy(): void {
    // this.refreshSubscription.unsubscribe();
     // this.routeSubscription.unsubscribe();
     this.dataRefreshSubscription.unsubscribe();
   this.surveyRefreshSubscription.unsubscribe();
   this.cdr.detach();
   }


   setupCometChat() {
    // let userId = this.storageService.getUserID();
    // const user = new CometChat.User(userId);
    // user.setName(this.storageService.getUser().firstname + ' ' + this.storageService.getUser().lastname);
    // const appSetting = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(COMETCHAT_CONSTANTS.REGION).build();
    // CometChat.init(COMETCHAT_CONSTANTS.APP_ID, appSetting).then(
    //   () => {
    //     console.log('Initialization completed successfully');
    //     // if(this.utilities.currentUserValue != null){
    //       // You can now call login function.
    //       CometChat.login(userId,  COMETCHAT_CONSTANTS.API_KEY).then(
    //         (user) => {
    //           console.log('Login Successful:', { user });
    //         },
    //         error => {
    //           console.log('Login failed with exception:', { error });
    //         }
    //       );
    //   // }
    //   },
    //   error => {
    //     console.log('Initialization failed with error:', error);
    //   }
    // );
  }

  assignedTo(surveyData){

    let postData = {
      assignedto: this.userData.id,
      status: "surveyinprocess"
    };
    this.apiService.updateSurveyForm(postData,surveyData.id).subscribe(res=>{
      console.log(res);
    })
    this.router.navigate(['/camera/' + surveyData.id + '/' + surveyData.jobtype + '/' + surveyData.city + '/' + surveyData.state + '/' + surveyData.latitude + '/' + surveyData.longitude]);


  }
  resumeSurvey(surveyData,event){
    event.stopPropagation();
    this.router.navigate(['/camera/' + surveyData.id + '/' + surveyData.jobtype + '/' + surveyData.city + '/' + surveyData.state + '/' + surveyData.latitude + '/' + surveyData.longitude]);
  }

  gotoActivity(surveyData,event){
    console.log(event)
        event.stopPropagation();
      this.router.navigate(['/activity' + '/' + surveyData.id + '/survey'])
    
    }
    
    gotoDetails(surveyData,$event){
      // $event.preventDefault();
      // $event.stopPropagation();
      this.router.navigate(['/survey-detail/' + surveyData.id])
    }

}
