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
import * as moment from 'moment';
import { StorageService } from 'src/app/storage.service';
import { version } from 'src/app/contants.prod';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { CometChat } from '@cometchat-pro/cordova-ionic-chat';

@Component({
  selector: 'app-newdesign',
  templateUrl: './newdesign.component.html',
  styleUrls: ['./newdesign.component.scss'],
})
export class NewdesignComponent implements OnInit {
  private version = version;
  listOfDesignData: DesginDataModel[] = [];
  listOfDesignDataHelper: DesginDataHelper[] = [];
  private designRefreshSubscription: Subscription;
  private dataRefreshSubscription: Subscription;
  skip:number=0;
  limit:number=10;
  user:any
  currentDate:any=new Date()

  today: any;
  options: LaunchNavigatorOptions = {
    start: '',
    app: this.launchNavigator.APP.GOOGLE_MAPS
  };
  overdue: any;
  unsubscribeMessage: Subscription;
  noDesignsFound: string;
  update_version: string;

  constructor(private launchNavigator: LaunchNavigator,
    private datePipe: DatePipe,
    private cdr: ChangeDetectorRef,
    private utils: UtilitiesService,
    private storage: Storage,
    private apiService: ApiService,
    private iab:InAppBrowser,
     private storageservice :StorageService) {

      this.user=this.storageservice.getUser();

    const latestDate = new Date();
    this.today = datePipe.transform(latestDate, 'M/dd/yy');
    console.log('date', this.today);
  //  this.unsubscribeMessage=  this.apiService._OnMessageReceivedSubject.subscribe((r) => {
  //     console.log('message received! ', r);
  //     this.getDesigns();
  //   });
  }

  ngOnInit() {
    localStorage.setItem('type','prelim');
 console.log("ngoninit");
console.log(this.currentDate.toISOString());
this.apiService.version.subscribe(versionInfo=>{
  this.update_version = versionInfo;
})

  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.designRefreshSubscription.unsubscribe();
    this.dataRefreshSubscription.unsubscribe();
    // this.unsubscribeMessage.unsubscribe();
    this.cdr.detach();
  }


  ionViewDidEnter(){
    // if(this.version !== this.update_version && this.update_version !==''){

    //   setTimeout(()=>{

    //     this.utils.showAlertBox('Update App','New version of app is available on Play Store. Please update now to get latest features and bug fixes.',[{
    //       text:'Ok',

    //       handler:()=>{
    //         this.iab.create('https://play.google.com/store/apps/details?id=com.solar.wattmonk',"_system");
    //        this.ionViewDidEnter();
    //       }
    //     }]);
    //   },2000)
    // }

    this.designRefreshSubscription = this.utils.getHomepageDesignRefresh().subscribe((result) => {
      this.skip=0;
      this.getDesigns(null);
    });

    this.dataRefreshSubscription = this.utils.getDataRefresh().subscribe((result) => {
      if(this.listOfDesignData != null && this.listOfDesignData.length > 0){
        this.formatDesignData(this.listOfDesignData);
      }
    });
  }

  getDesigns(event?) {
    this.skip=0;
    let showLoader = true;
    if (event != null && event !== undefined) {
      showLoader = false;
    }
    this.fetchPendingDesigns(event);
  }

  fetchPendingDesigns(event?, showLoader?: boolean) {
    this.noDesignsFound= "";
    this.listOfDesignData = [];
    this.listOfDesignDataHelper = [];
    this.utils.showLoadingWithPullRefreshSupport(showLoader, 'Getting Designs').then((success) => {
      this.apiService.getDesignSurveys("requesttype=prelim&status=designassigned&status=designinprocess",this.limit,this.skip).subscribe((response:any) => {
        this.utils.hideLoadingWithPullRefreshSupport(showLoader).then(() => {
          console.log(response);
          if(response.length){
            this.formatDesignData(response);
          }else{
            this.noDesignsFound= "No Design Found"
          }
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
    this.overdue=[];
    let list:DesginDataModel[];
    list=this.fillinDynamicData(records);
    list.forEach(element =>{
      this.listOfDesignData.push(element);
    })
    console.log(this.listOfDesignData);

    const tempData: DesginDataHelper[] = [];
          this.listOfDesignData.forEach((designItem:any) => {
            if (tempData.length === 0) {
              this.sDatePassed(designItem.updated_at);
              const listOfDesigns = new DesginDataHelper();
              listOfDesigns.date = this.datePipe.transform(designItem.updated_at, 'M/dd/yy');
              listOfDesigns.lateby = this.overdue;
              listOfDesigns.listOfDesigns.push(designItem);
              tempData.push(listOfDesigns);
            } else {
              let added = false;
              tempData.forEach((designList:any) => {
                if (!added) {
                  if (designList.date === this.datePipe.transform(designItem.updated_at, 'M/dd/yy')) {
                    designList.listOfDesigns.push(designItem);
                    this.sDatePassed(designItem.updated_at);
                    added = true;
                  }
                }
              });
              if (!added) {
                this.sDatePassed(designItem.updated_at);
                const listOfDesigns = new DesginDataHelper();
                listOfDesigns.date = this.datePipe.transform(designItem.updated_at, 'M/dd/yy');
                listOfDesigns.lateby = this.overdue;
                listOfDesigns.listOfDesigns.push(designItem);
                tempData.push(listOfDesigns);
                added = true;
              }
            }
          });
          this.listOfDesignDataHelper = tempData.sort(function (a, b) {
            var dateA = new Date(a.date).getTime(),
              dateB = new Date(b.date).getTime();
            return dateB - dateA;
          });
          this.chatIcon(list);
          this.cdr.detectChanges();
          console.log(this.listOfDesignDataHelper)
  }

  ///chat icon
  chatIcon(list:DesginDataModel[]){
    list.forEach(element => {
      var groupMembersRequest = new CometChat.GroupMembersRequestBuilder(element.chatid)
        .setLimit(10)
        .build();
      groupMembersRequest.fetchNext().then(
        groupMembers => {
          console.log(groupMembers);
          element.addedtogroupchat=true;
        },
        error => {
          console.log("Group Member list fetching failed with exception:", error);
        }
      );
    })
  }

  fillinDynamicData(records : DesginDataModel[]) : DesginDataModel[]{
    records.forEach((element:any) => {
      if(element.status != "delivered"){
        element.isoverdue = this.utils.isDatePassed(element.deliverydate);
      }else{
        element.isoverdue = false;
      }
      element.lateby = this.utils.getTheLatebyString(element.deliverydate);
      element.formattedjobtype = this.utils.getJobTypeName(element.jobtype);
      var acceptancedate = new Date(element.designacceptancestarttime);
      element.designacceptanceremainingtime = this.utils.getRemainingTime(acceptancedate.toString());
             //Setting acceptance timer
    if(element.status == "outsourced"){
      if(element.requesttype == "permit"){
        var acceptancedate = new Date(element.designacceptancestarttime);
        element.designacceptanceremainingtime = this.utils.getRemainingTime(acceptancedate.toString());
      }else{
        var acceptancedate = new Date(element.designacceptancestarttime);
        element.designacceptanceremainingtime = this.utils.getRemainingTime(acceptancedate.toString());
      }

      if(element.designacceptanceremainingtime == "0h : 0m"){
        element.isoverdue = true;
      }
    }

    //Setting design timer
    if(element.status == "designassigned" || element.status == "designcompleted"){
      if(element.requesttype == "permit"){
        var acceptancedate = new Date(element.designstarttime);
        acceptancedate.setHours(acceptancedate.getHours() + 6);
        element.designremainingtime = this.utils.getRemainingTime(acceptancedate.toString());
      }else{
        var acceptancedate = new Date(element.designstarttime);
        acceptancedate.setHours(acceptancedate.getHours() + 2);
        element.designremainingtime = this.utils.getRemainingTime(acceptancedate.toString());
      }
      if(element.designremainingtime == "0h : 0m"){
        element.isoverdue = true;
      }
    }

    //Setting review timer
    if(element.status == "reviewassigned" || element.status == "reviewpassed" || element.status == "reviewfailed"){
      if(element.requesttype == "permit"){
        var reviewdate = new Date(element.reviewstarttime);
        reviewdate.setHours(reviewdate.getHours() + 2);
        element.reviewremainingtime = this.utils.getRemainingTime(reviewdate.toString());
      }else{
        var reviewdate = new Date(element.reviewstarttime);
        reviewdate.setMinutes(reviewdate.getMinutes() + 15);
        element.reviewremainingtime = this.utils.getRemainingTime(reviewdate.toString());
      }
      if(element.reviewremainingtime == "0h : 0m"){
        element.isoverdue = true;
      }
    }
      this.storage.get(''+element.id).then((data: any) => {
        console.log(data);
        if (data) {
          element.totalpercent = data.currentprogress;
        }else{
          element.totalpercent = 0;
        }
        this.startAllTimers();
      });


    });

    return records;
  }

  doInfinite($event){
    this.skip=this.skip+10;
    this.apiService.getDesignSurveys("requesttype=prelim&status=designassigned&status=designinprocess",this.limit,this.skip).subscribe((response:any) => {
         console.log(response);
          if(response.length){

            this.formatDesignData(response);
          }else{
            this.noDesignsFound= "No Designs Found"
          }
          if (event !== null) {
            $event.target.complete();
          }
        },
     (responseError:any) => {
        if (event !== null) {
            $event.target.complete();
          }
          const error: ErrorModel = responseError.error;
          this.utils.errorSnackBar(error.message[0].messages[0].message);

      });

    }
  sDatePassed(datestring: string){
    var checkdate = moment(datestring, "YYYYMMDD");
    var todaydate = moment(new Date(), "YYYYMMDD");
    var lateby = todaydate.diff(checkdate, "days");
    this.overdue = lateby;
  }

  startAllTimers(){
    this.listOfDesignData.forEach(element => {

      var reviewdate = new Date(element.designstarttime);
      reviewdate.setHours(reviewdate.getHours() + 2);
      element.designremainingtime = this.utils.getRemainingTime(reviewdate.toString());
    });
  }

  trackdesign(index,design){
    return design.id;
  }
}
