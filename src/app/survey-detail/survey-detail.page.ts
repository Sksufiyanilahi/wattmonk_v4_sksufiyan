import { Component, OnDestroy, OnInit } from '@angular/core';
import { UtilitiesService } from '../utilities.service';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { SurveyDataModel } from '../model/survey.model';
import { UserRoles } from '../model/constants';
import { AssigneeModel } from '../model/assignee.model';
import { StorageService } from '../storage.service';
import { DrawerState } from 'ion-bottom-drawer';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorModel } from '../model/error.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-survey-detail',
  templateUrl: './survey-detail.page.html',
  styleUrls: ['./survey-detail.page.scss'],
})
export class SurveyDetailPage implements OnInit, OnDestroy {

  surveyId: number;
  survey: SurveyDataModel;
  listOfAssignees: AssigneeModel[] = [];
  drawerState = DrawerState.Bottom;
  date: Date;
  rescheduleForm: FormGroup;
  assigned = false;
  assigneeForm: FormGroup;
  dataSubscription: Subscription;
  refreshDataOnPreviousPage = 0;

  constructor(
    private utilities: UtilitiesService,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private navController: NavController,
    private alertController: AlertController,
    private storage: StorageService,
    private datePicker: DatePicker,
    private formBuilder: FormBuilder
  ) {
    this.surveyId = +this.route.snapshot.paramMap.get('id');
    this.rescheduleForm = this.formBuilder.group({
      datetime: new FormControl('', [Validators.required]),
      comments: new FormControl('', [Validators.required])
    });
    this.assigneeForm = this.formBuilder.group({
      assignto: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
    this.dataSubscription = this.utilities.getSurveyDetailsRefresh().subscribe((result) => {
      this.refreshDataOnPreviousPage++;
      this.getSurveyDetails();
      this.getAssignees();
    });
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
    if (this.refreshDataOnPreviousPage > 1) {
      this.utilities.setHomepageDesignRefresh(true);
    }
  }

  getSurveyDetails() {
    this.utilities.showLoading('Getting Survey Details').then((success) => {
      this.apiService.getSurveyDetail(this.surveyId).subscribe((result) => {
        this.utilities.hideLoading().then(() => {
          this.setData(result);
        });
      }, (error) => {
        this.utilities.hideLoading();
      });
    });
  }

  setData(result: SurveyDataModel) {
    this.survey = result;
    this.assigned = this.survey.assignto.id !== null && this.survey.assignto.id !== undefined;
    this.rescheduleForm.patchValue({
      datetime: this.survey.datetime
    });
  }

  chat() {

  }

  goBack() {
    this.navController.pop();
  }

  getSurveyImages() {
    return this.survey.mspimages.length
      + this.survey.utilitymeterimages.length
      + this.survey.pvinverterimages.length
      + this.survey.pvmeterimages.length
      + this.survey.roofimages.length;
  }

  async deleteSurvey() {
    const alert = await this.alertController.create({
      header: 'Delete Survey',
      subHeader: 'Are you sure you want to delete this survey?',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.deleteSurveyFromServer();
          }
        },
        {
          text: 'Cancel'
        }
      ],
      backdropDismiss: false
    });
    await alert.present();
  }

  deleteSurveyFromServer() {
    this.utilities.showLoading('Deleting Survey').then((success) => {
      this.apiService.deleteSurvey(this.surveyId).subscribe((result) => {
        this.utilities.hideLoading();
        this.navController.pop();
      }, (error) => {
        this.utilities.hideLoading();
      });
    });
  }

  getAssignees() {
    this.apiService.getAssignees(UserRoles.SURVEYOR).subscribe(assignees => {
      this.listOfAssignees = [];
      this.listOfAssignees.push(this.utilities.getDefaultAssignee(this.storage.getUserID()));
      assignees.forEach(item => this.listOfAssignees.push(item));
      console.log(this.listOfAssignees);
    });
  }

  reschedule() {
    this.drawerState = DrawerState.Docked;
    this.date = this.survey.datetime;
  }

  changeDate() {
    const currentDate = new Date(this.date);
    console.log(currentDate);
    this.datePicker.show({
      date: new Date(this.date),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
    }).then(
      date => {
        this.date = date;
        this.rescheduleForm.patchValue({
          datetime: this.date.getTime()
        });
      },
      err => console.log('Error occurred while getting date: ', err)
    );
  }

  changeTime() {
    const currentDate = new Date(this.date);
    console.log(currentDate);
    this.datePicker.show({
      date: new Date(this.date),
      mode: 'time',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
    }).then(
      date => {
        const oldDate = new Date(this.date);
        oldDate.setHours(date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
        this.date = oldDate;
        this.rescheduleForm.patchValue({
          datetime: this.date.getTime()
        });
      },
      err => console.log('Error occurred while getting date: ', err)
    );
  }

  rescheduleSurvey() {
    if (this.rescheduleForm.status === 'INVALID') {
      this.utilities.showSnackBar('Invalid Data');
    } else {
      this.utilities.showLoading('Updating').then(() => {
        this.apiService.updateSurveyForm(this.rescheduleForm.value, this.surveyId).subscribe(response => {
          this.utilities.hideLoading().then(() => {
            this.survey = response;
            this.drawerState = DrawerState.Bottom;
          });
        }, responseError => {
          this.utilities.hideLoading().then(() => {
            const error: ErrorModel = responseError.error;
            if (error.message instanceof String) {
              this.utilities.showSnackBar(error.message);
            } else if (error.message instanceof Array) {
              this.utilities.showSnackBar(error.message[0].messages[0].message);
            }
          });
        });
      });
    }
  }

  dismissBottomSheet() {
    this.drawerState = DrawerState.Bottom;
  }

  updateAssignee() {
    if (this.assigneeForm.status === 'INVALID') {
      this.utilities.showAlert('Please select an assignee');
    } else {
      this.utilities.showLoading('Updating').then(() => {
        this.apiService.updateSurveyForm(this.assigneeForm.value, this.surveyId).subscribe((success) => {
          this.utilities.hideLoading().then(() => {
            this.setData(success);
            this.refreshDataOnPreviousPage++;
          });
        }, (error) => {
          this.utilities.hideLoading().then(() => {
            this.utilities.showSnackBar('Some Error Occurred');
          });
        });
      });

    }
  }
}
