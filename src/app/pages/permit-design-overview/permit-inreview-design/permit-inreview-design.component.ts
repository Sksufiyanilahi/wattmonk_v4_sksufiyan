import { IonContent ,Platform} from '@ionic/angular';
import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { DesginDataModel } from '../../../models/design.model';
import { Subscription } from 'rxjs';
import { LaunchNavigator, LaunchNavigatorOptions } from '@awesome-cordova-plugins/launch-navigator/ngx';
import { DatePipe } from '@angular/common';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { ErrorModel } from 'src/app/models/error.model';
import { ApiService } from 'src/app/services/api/api.service';

// import { DesignStorageModel } from '../../model/Design-storage.model';
import { Storage } from '@ionic/storage';
import { DesginDataHelper } from '../../home/design/design.component';
import * as moment from 'moment';
import { StorageService } from 'src/app/services/storage/storage.service';
import { CometChat } from '@cometchat-pro/cordova-ionic-chat';
import { Router, NavigationExtras } from '@angular/router';
import { CustomEventsService } from 'src/app/services/custom-events/custom-events.service';
@Component({
  selector: 'app-permit-inreview-design',
  templateUrl: './permit-inreview-design.component.html',
  styleUrls: ['./permit-inreview-design.component.scss'],
})

export class PermitInreviewDesignComponent implements OnInit {
  @ViewChild('content', { static: false }) content: IonContent;
  listOfDesigns: DesginDataModel[] = [];
  listOfDesignsHelper: DesginDataHelper[] = [];
  private DesignRefreshSubscription: Subscription;
  private dataRefreshSubscription: Subscription;
  skip: number = 0;
  limit: number = 10;
  userData: any
  today: any;
  options: LaunchNavigatorOptions = {
      start: '',
      app: this.launchNavigator.APP.GOOGLE_MAPS
  };
  overdue: number;
  noDesignsFound: string;
  public userAccessRights: any = {};

  isinreviewpermit: boolean = false;
  public isClient: boolean = true;
  public isUserDesigner: boolean = false;
  public isUserAnalyst: boolean = false;
  constructor(private launchNavigator: LaunchNavigator,
      private datePipe: DatePipe,
      private cdr: ChangeDetectorRef,
      private utils: UtilitiesService,
      private storage: Storage,
      private apiService: ApiService,
      private router: Router,    private platform:Platform,

      private storageservice: StorageService,
      private eventService: CustomEventsService) {
          this.isClient = this.utils.isClient();
          this.isUserDesigner = this.utils.isUserDesigner();this.isUserAnalyst = this.utils.isUserAnalyst();

      this.userData = this.storageservice.getUser();
      const latestDate = new Date();
      this.today = datePipe.transform(latestDate, 'M/dd/yy');
      // get access right permission data
      this.userAccessRights = this.utils.getUserAccessRights('permit');
  }

  ngOnInit() {
      this.DesignRefreshSubscription = this.utils.getHomepagePermitRefresh().subscribe((result) => {
          this.skip = 0;
          this.getDesigns(null);
      });

      this.dataRefreshSubscription = this.utils.getDataRefresh().subscribe((result) => {
          if (this.listOfDesigns != null && this.listOfDesigns.length > 0) {
              this.formatDesignData(this.listOfDesigns);
          }
      });
  }
  ngOnDestroy(): void {
      //Called once, before the instance is destroyed.
      //Add 'implements OnDestroy' to the class.
      this.DesignRefreshSubscription.unsubscribe();
      this.dataRefreshSubscription.unsubscribe();
      this.cdr.detach();
  }

  getDesigns(event) {
      this.skip = 0;
      let showLoader = true;
      if (event != null && event !== undefined) {
          showLoader = false;
      }this.eventService.publish('foo:update-count', {
          isUpdateCount: true
      });
      this.fetchPendingDesigns(event, showLoader);
  }

  fetchPendingDesigns(event, showLoader: boolean) {
      this.noDesignsFound = "";

      this.listOfDesigns = [];
      this.listOfDesignsHelper = [];

      this.isinreviewpermit=false;
          this.apiService.getDesignSurveys("requesttype=permit&status=reviewassigned&status=reviewfailed&status=reviewpassed", this.limit, this.skip).subscribe((response: any) => {
              this.content.scrollToTop(10);
              this.isinreviewpermit=true;

                  if (response.length) {
                      this.formatDesignData(response);
                  } else {
                      this.noDesignsFound = "No Designs Found";
                  }
                  if (event !== null) {
                      event.target.complete();
                  }
             
          }, responseError => {
              this.utils.hideLoadingWithPullRefreshSupport(showLoader).then(() => {
                  if (event !== null) {
                      event.target.complete();
                  }
                  const error: ErrorModel = responseError.error;
                  this.utils.errorSnackBar(error.message[0].messages[0].message);
              });
          });
     
  }

  openAddressOnMap(address: string,event,latitude,longitude) {
      event.stopPropagation();
  
  
      if (this.platform.is('ios')) {
        //try google maps first
        this.launchNavigator.isAppAvailable(this.launchNavigator.APP.GOOGLE_MAPS).then(
            response => {
                if (response) {
                    this.launchNavigator.navigate(address, this.options);
                } else {
                    window.open('maps://?q=' + latitude + ',' + longitude, '_system');
                }
            },
            failure => {
                //check failed;
            }
        );
    } else {
        this.launchNavigator.navigate(address, this.options);
    }
  
      //this.launchNavigator.navigate(address, this.options);
    }

  formatDesignData(records: DesginDataModel[]) {
      let list: DesginDataModel[];

      list = this.fillinDynamicData(records);
      console.log('list', list);
      
      list.forEach(element => {
          this.listOfDesigns.push(element);
      })
      if (list.length > 0) {
          list.forEach((designItem: any, i) => {
              this.sDatePassed(designItem.updated_at);
              const listOfDesigns = new DesginDataHelper();
              listOfDesigns.date = this.datePipe.transform(designItem.updated_at, 'M/dd/yy');
              listOfDesigns.lateby = this.overdue;
              listOfDesigns.listOfDesigns.push(designItem);
              this.listOfDesignsHelper.push(listOfDesigns);
          });

          this.chatIcon(list);
          this.cdr.detectChanges();
          
      }
      // comment on 20220311
      // let list: DesginDataModel[];
      // list = this.fillinDynamicData(records);
      // list.forEach(element => {
      //     this.listOfDesigns.push(element);
      // })
      // const tempData: DesginDataHelper[] = [];
      // this.listOfDesigns.forEach((designItem: any) => {
      //     if (tempData.length === 0) {
      //         this.sDatePassed(designItem.updated_at);
      //         const listOfDesign = new DesginDataHelper();
      //         listOfDesign.date = this.datePipe.transform(designItem.updated_at, 'M/dd/yy');
      //         listOfDesign.lateby = this.overdue;
      //         listOfDesign.listOfDesigns.push(designItem);
      //         tempData.push(listOfDesign);
      //     } else {
      //         let added = false;
      //         tempData.forEach((DesignList) => {
      //             if (!added) {
      //                 if (DesignList.date === this.datePipe.transform(designItem.updated_at, 'M/dd/yy')) {
      //                     DesignList.listOfDesigns.push(designItem);
      //                     this.sDatePassed(designItem.updated_at);
      //                     added = true;
      //                 }
      //             }
      //         });
      //         if (!added) {
      //             this.sDatePassed(designItem.updated_at);
      //             const listOfDesign = new DesginDataHelper();
      //             listOfDesign.date = this.datePipe.transform(designItem.updated_at, 'M/dd/yy');
      //             listOfDesign.lateby = this.overdue;
      //             listOfDesign.listOfDesigns.push(designItem);
      //             tempData.push(listOfDesign);
      //             added = true;
      //         }
      //     }
      // });
      // this.listOfDesignsHelper = tempData.sort(function (a, b) {
      //     var dateA = new Date(a.date).getTime(),
      //         dateB = new Date(b.date).getTime();
      //     return dateB - dateA;
      // });
      // this.chatIcon(list);
      // this.cdr.detectChanges();
  }

  ///chat icon
  chatIcon(list: DesginDataModel[]) {
      list.forEach(element => {
          var groupMembersRequest = new CometChat.GroupMembersRequestBuilder(element.chatid)
              .setLimit(10)
              .build();
          groupMembersRequest.fetchNext().then(
              groupMembers => {

                  element.addedtogroupchat = true;
              },
              error => {

              }
          );
      })
  }

  fillinDynamicData(records: DesginDataModel[]): DesginDataModel[] {
      records.forEach((element: any) => {
          if (element.status != "delivered") {
              element.isoverdue = this.utils.isDatePassed(element.deliverydate);
          } else {
              element.isoverdue = false;
          }            element.recordupdatedon = this.utils.formatDateInTimeAgo(element.updated_at);

          element.lateby = this.utils.getTheLatebyString(element.deliverydate);
          element.formattedjobtype = this.utils.getJobTypeName(element.jobtype);
          this.storage.get('' + element.id).then((data: any) => {

              if (data) {
                  element.totalpercent = data.currentprogress;
              } else {
                  element.totalpercent = 0;
              }
          });
      });

      return records;
  }

  doInfinite($event) {
      this.skip = this.skip + 10;
      this.apiService.getDesignSurveys("requesttype=permit&status=reviewassigned&status=reviewfailed&status=reviewpassed", this.limit, this.skip).subscribe((response: any) => {

          if (response.length) {

              this.formatDesignData(response);
          } else {
              this.noDesignsFound = "No Designs Found"
          }
          if (event !== null) {
              $event.target.complete();
          }
      },
          (responseError: any) => {
              if (event !== null) {
                  $event.target.complete();
              }
              const error: ErrorModel = responseError.error;
              this.utils.errorSnackBar(error.message[0].messages[0].message);

          });

  }

  gotoActivity(designData, event) {

      event.stopPropagation();
      this.router.navigate(['/activity-details' + '/' + designData.id + '/design'])

  }

  gotoDetails(designData, $event) {
      // $event.preventDefault();
      // $event.stopPropagation();
      // this.router.navigate(['/permit-design-details/' + designData.id])
      this.utils.setPrelimId(designData)
      this.utils.setRequestType('permit')
      this.router.navigate(['/master-details/permit-details/' + designData.id])
  }

  gotoChats(designData, event) {
      event.stopPropagation();
      let objToSend: NavigationExtras = {
          queryParams: {
              name: designData.name + '_' + designData.address,
              guid: designData.chatid
          },
          skipLocationChange: false,
          fragment: 'top'
      };


      this.router.navigate(['chat/' + designData.chatid], {
          state: { productdetails: objToSend }
      });
  }

  sDatePassed(datestring: string) {
      var checkdate = moment(datestring, "YYYYMMDD");
      var todaydate = moment(new Date(), "YYYYMMDD");
      var lateby = todaydate.diff(checkdate, "days");
      this.overdue = lateby;
  }

  trackdesign(index, design) {
      return design.id;
  }


}

