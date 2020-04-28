import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { DesginDataModel } from '../../model/design.model';
import { ApiService } from 'src/app/api.service';
import { UtilitiesService } from 'src/app/utilities.service';
import { ErrorModel } from 'src/app/model/error.model';
import { DatePipe } from '@angular/common';
import { StorageService } from 'src/app/storage.service';
import { Subscription } from 'rxjs';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';
import { DrawerState } from 'ion-bottom-drawer';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AssigneeModel } from '../../model/assignee.model';
import { UserRoles } from '../../model/constants';

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.scss'],
})
export class DesignComponent implements OnInit, OnDestroy {

  listOfDesignDataHelper: DesginDataHelper[] = [];
  listOfDesignsData: DesginDataModel[] = [];
  private refreshSubscription: Subscription;

  today: any;
  options: LaunchNavigatorOptions = {
    start: '',
    app: this.launchNavigator.APP.GOOGLE_MAPS
  };
  drawerState = DrawerState.Bottom;
  assignForm: FormGroup;
  listOfAssignees: AssigneeModel[] = [];

  designId = 0;

  constructor(
    private utils: UtilitiesService,
    private apiService: ApiService,
    private datePipe: DatePipe,
    private storage: StorageService,
    private cdr: ChangeDetectorRef,
    private launchNavigator: LaunchNavigator,
    private formBuilder: FormBuilder
  ) {
    const latestDate = new Date();
    this.today = datePipe.transform(latestDate, 'M/dd/yy');
    console.log('date', this.today);
    this.assignForm = this.formBuilder.group({
      assignedto: new FormControl('', [Validators.required])
    });
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
                this.listOfDesignDataHelper.push(listOfDesign);
              }
            }
          });
          this.listOfDesignDataHelper = tempData;
          this.cdr.detectChanges();
        });
      }, responseError => {
        this.utils.hideLoading().then((loaderHidden) => {
          const error: ErrorModel = responseError.error;
          this.utils.errorSnackBar(error.message[0].messages[0].message);
        });

      });
    }, (apiError) => {
      this.utils.hideLoading();
    });
  }

  openAddressOnMap(address: string) {
    this.launchNavigator.navigate(address, this.options);
  }

  dismissBottomSheet() {
    this.drawerState = DrawerState.Bottom;
    this.utils.setBottomBarHomepage(true);
  }

  assignToDesigner() {
    if (this.assignForm.status === 'INVALID') {
      this.utils.errorSnackBar('Please select a designer');
    } else {
      this.apiService.updateDesignForm(this.assignForm.value, this.designId).subscribe((value) => {
        this.dismissBottomSheet();
        this.utils.setHomepageDesignRefresh(true);
      }, (error) => {
        this.dismissBottomSheet();
      });
    }

  }

  openDesigners(id: number) {
    this.designId = id;
    this.utils.setBottomBarHomepage(false);
    this.drawerState = DrawerState.Docked;
    this.apiService.getSurveyors(UserRoles.DESIGNER).subscribe(assignees => {
      this.listOfAssignees = [];
      // this.listOfAssignees.push(this.utils.getDefaultAssignee(this.storage.getUserID()));
      assignees.forEach(item => this.listOfAssignees.push(item));
      console.log(this.listOfAssignees);
      this.assignForm.patchValue({
        assignto: 0
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
