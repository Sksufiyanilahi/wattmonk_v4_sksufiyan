import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { DesginDataModel } from '../../model/design.model';
import { ApiService } from 'src/app/api.service';
import { UtilitiesService } from 'src/app/utilities.service';
import { ErrorModel } from 'src/app/model/error.model';
import { DatePipe } from '@angular/common';
import { StorageService } from 'src/app/storage.service';
import { Subscription, Subject } from 'rxjs';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';
import { DrawerState } from 'ion-bottom-drawer';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AssigneeModel } from '../../model/assignee.model';
import { UserRoles } from '../../model/constants';
import { Router, ActivatedRoute, NavigationEnd, NavigationStart } from '@angular/router';
import { takeUntil, take } from 'rxjs/operators';

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.scss'],
})
export class DesignComponent implements OnInit {

  listOfDesignDataHelper: DesginDataHelper[] = [];
  listOfDesignsData: DesginDataModel[] = [];
  private refreshSubscription: Subscription;
  private routeSubscription: Subscription;
  today: any;
  options: LaunchNavigatorOptions = {
    start: '',
    app: this.launchNavigator.APP.GOOGLE_MAPS
  };
  drawerState = DrawerState.Bottom;
  assignForm: FormGroup;
  listOfAssignees: AssigneeModel[] = [];

  designId = 0;
  showBottomDraw: boolean = false;
  roleType: any;
  myFiles: string[] = [];  
  @Input()
  parentSubject:Subject<any>;
  isRequest= false;

  constructor(
    private utils: UtilitiesService,
    private apiService: ApiService,
    private datePipe: DatePipe,
    private storage: StorageService,
    private cdr: ChangeDetectorRef,
    private launchNavigator: LaunchNavigator,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    const latestDate = new Date();
    this.today = datePipe.transform(latestDate, 'M/dd/yy');
    console.log('date', this.today);
    this.assignForm = this.formBuilder.group({
      assignedto: new FormControl('', [Validators.required]),
      comment: new FormControl('')
    });

  }

  ionViewDidEnter() {
    // this.routeSubscription.unsubscribe();  
  }


  ngOnInit() {
    
    // this.parentSubject.subscribe(event=>{
    //   this.filterData(event.serchTermData.id);
    // })
    // this.getDesign(event);
    this.routeSubscription = this.router.events.subscribe((event) => {
      console.log("//",event);
      console.log(this.router.url.indexOf('page'));
      if (event instanceof NavigationEnd) {
        console.log(event.url);
        
        // Trick the Router into believing it's last link wasn't previously loaded
        if (this.router.url.indexOf('page') >= -1) {
          this.router.navigated = false;
          let data = this.route.queryParams.subscribe((_res: any) => {
            console.log('Serach Term', _res);
            if (Object.keys(_res).length !== 0) {
              //  this.ApplysearchDesginAndSurvey(_res.serchTerm)

              this.filterData(_res.serchTerm);
            } else {
              // this.refreshSubscription = this.utils.getHomepageDesignRefresh().subscribe((result) => {
           
                  this.getDesign(null, false);
                
              // });
            }
          });
        }
      }
    });
     this.getDesign(null, true);
  }

  ngOnDestroy(): void {
  //  this.refreshSubscription.unsubscribe();
    // this.routeSubscription.unsubscribe();
  }

  filterData(serchTerm: any) {
    console.log(this.listOfDesignsData);
    let filterDataArray: any = this.listOfDesignsData.filter(x => x.id == serchTerm);
    const tempData: DesginDataHelper[] = [];
    filterDataArray.forEach((desginItem) => {
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
          this.listOfDesignDataHelper.push(listOfDesign);
          console.log(this.listOfDesignDataHelper);
        }
      }
    });
    this.listOfDesignDataHelper = tempData;
    this.cdr.detectChanges();
  }

  getDesign(event, showLoader?: boolean) {
this.isRequest= true;
    this.listOfDesignsData = [];
    this.listOfDesignDataHelper = [];
    
    this.utils.showLoadingWithPullRefreshSupport(showLoader, 'Getting designs').then((success) => {
      // debugger;
      this.apiService.getDesgin().subscribe((response:any) => {
        this.utils.hideLoadingWithPullRefreshSupport(showLoader).then((loaderHidden) => {
          // debugger;
          if (event !== null) {
            event.target.complete();
          }
          console.log(response, '>>');
          this.listOfDesignsData = response;
           response.forEach(element => {
              this.roleType = element.type;            
          });;
          console.log(this.roleType);
          
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
                this.listOfDesignDataHelper.push(listOfDesign);
                console.log(this.listOfDesignDataHelper,"<<<<>>>>");
              }
            }
          });
          this.listOfDesignDataHelper = tempData;
          this.cdr.detectChanges();
        },responseError=>{
          this.utils.hideLoadingWithPullRefreshSupport(showLoader).then((loaderHidden) => {
            if (event !== null) {
              event.target.complete();
            }
            const error: ErrorModel = responseError.error;
            this.utils.errorSnackBar(error.message[0].messages[0].message);
          });
        });
      }, responseError => {
        this.utils.hideLoadingWithPullRefreshSupport(showLoader).then((loaderHidden) => {
          if (event !== null) {
            event.target.complete();
          }
          const error: ErrorModel = responseError.error;
          this.utils.errorSnackBar(error.message[0].messages[0].message);
        });

      });
    }, (apiError) => {
      this.utils.hideLoadingWithPullRefreshSupport(showLoader).then(() => {
        if (event !== null) {
          event.target.complete();
        }
      });

    });
  }

  openAddressOnMap(address: string) {
    this.launchNavigator.navigate(address, this.options);
  }

  dismissBottomSheet() {
    console.log('this', this.drawerState);
    this.drawerState = DrawerState.Bottom;
    this.utils.setBottomBarHomepage(true);
  }

  assignToDesigner() {
    if (this.assignForm.status === 'INVALID') {
      this.utils.errorSnackBar('Please select a designer');
    } else {
      this.apiService.updateDesignForm(this.assignForm.value, this.designId).subscribe((value) => {
        console.log('reach ', value);
        this.utils.showSnackBar('Design request has been assigned to' + ' ' + value.name + ' ' + 'successfully');
        this.dismissBottomSheet();
        this.showBottomDraw = false;
        this.utils.setHomepageDesignRefresh(true);
      }, (error) => {
        this.dismissBottomSheet();
        this.showBottomDraw = false;
      });
    }

  }

  openDesigners(id: number) {
    if (this.listOfAssignees.length === 0) {
      this.utils.showLoading('Getting Designers').then(() => {
        this.apiService.getSurveyors().subscribe(assignees => {
          this.utils.hideLoading().then(() => {
            this.listOfAssignees = [];
            // this.listOfAssignees.push(this.utils.getDefaultAssignee(this.storage.getUserID()));
            assignees.forEach(item => this.listOfAssignees.push(item));
            console.log(this.listOfAssignees);
            this.showBottomDraw = true;
            this.designId = id;
            this.utils.setBottomBarHomepage(false);
            this.drawerState = DrawerState.Docked;
            this.assignForm.patchValue({
              assignedto: 0
            });
          });
        }, (error) => {
          this.utils.hideLoading().then(() => {
            this.utils.errorSnackBar('Some error occurred. Please try again later');
          });
        });
      });

    } else {
      this.designId = id;
      this.utils.setBottomBarHomepage(false);
      this.drawerState = DrawerState.Docked;
      this.assignForm.patchValue({
        assignedto: 0
      });
    }
  }

  close() {
    if (this.showBottomDraw === true) {
      this.showBottomDraw = false;
      this.drawerState = DrawerState.Bottom;
      this.utils.setBottomBarHomepage(true);
    } else {
      this.showBottomDraw = true;
    }
  }

  refreshDesigns(event: CustomEvent) {
    let showLoader = true;
    if (event !== null && event !== undefined) {
      showLoader = false;
    }
    this.getDesign(event, showLoader);
  }
}


export class DesginDataHelper {
  listOfDesigns: DesginDataModel[];
  date: any;

  constructor() {
    this.listOfDesigns = [];
  }
}
