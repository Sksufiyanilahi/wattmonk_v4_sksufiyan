import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController, Platform } from '@ionic/angular';
import { AssigneeModel } from '../../model/assignee.model';
import { UtilitiesService } from '../../utilities.service';
import { ScheduleFormEvent, UserRoles, INVALID_EMAIL_MESSAGE, FIELD_REQUIRED } from '../../model/constants';
import { ApiService } from '../../api.service';
import { Subscription } from 'rxjs';
import { StorageService } from '../../storage.service';
import { ActivatedRoute } from '@angular/router';
import { SurveyDataModel } from '../../model/survey.model';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss'],
})
export class SurveyComponent implements OnInit, OnDestroy {

  surveyForm: FormGroup;
  listOfAssignees: AssigneeModel[] = [];
  private subscription: Subscription;
  private addressSubscription: Subscription;


  emailError = INVALID_EMAIL_MESSAGE;
  fieldRequired = FIELD_REQUIRED;

  surveyId = 0;
  private survey: SurveyDataModel;

  constructor(
    private formBuilder: FormBuilder,
    private navController: NavController,
    private utilities: UtilitiesService,
    private platform: Platform,
    private apiService: ApiService,
    private storage: StorageService,
    private route: ActivatedRoute
  ) {

    this.surveyId = +this.route.snapshot.paramMap.get('id');

    const EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    this.surveyForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)]),
      phonenumber: new FormControl('', [Validators.required]),
      jobtype: new FormControl('', [Validators.required]),
      datetime: new FormControl(new Date().getTime(), [Validators.required]),
      comments: new FormControl(''),
      address: new FormControl('', [Validators.required]),
      source: new FormControl('android', [Validators.required]),
      assignto: new FormControl(null),
      createdby: new FormControl(this.storage.getUserID(), [Validators.required])
    });

  }


  ngOnInit() {
    this.subscription = this.utilities.getScheduleFormEvent().subscribe((event) => {
      switch (event) {
        case ScheduleFormEvent.SAVE_SURVEY_FORM:
          this.saveSurvey();
          break;
        case ScheduleFormEvent.START_SURVEY:
          this.startSurvey();
          break;
      }
    });

    if (this.surveyId !== 0) {
      this.getSurveyDetails();
    } else {
      this.addressSubscription = this.utilities.getAddressObservable().subscribe((address) => {
        this.surveyForm.get('address').setValue(address.address);
      }, (error) => {
        this.surveyForm.get('address').setValue('');
      });
    }

    this.getAssignees();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    if (this.surveyId === 0) {
      this.addressSubscription.unsubscribe();
    }
    // this.utilities.getScheduleFormEvent().unsubscribe();
  }

  startSurvey() {
    if (this.surveyForm.status === 'INVALID') {
      this.showInvalidFormAlert();
    } else {
      this.utilities.showLoading('Saving Survey').then(() => {
        if (this.surveyId !== 0) {
          this.apiService.updateSurveyForm(this.surveyForm.value, this.surveyId).subscribe(survey => {
            this.utilities.hideLoading().then(() => {
              this.utilities.setDesignDetailsRefresh(true);
              this.navController.navigateForward('camera/' + survey.id);
            });
          });
        } else {
          this.apiService.saveSurvey(this.surveyForm.value).subscribe(survey => {
            this.utilities.hideLoading().then(() => {
              this.utilities.setDesignDetailsRefresh(true);
              this.navController.navigateForward('camera/' + survey.id);
            });
          });
        }
      });
    }
  }

  saveSurvey() {
    if (this.surveyForm.status === 'INVALID') {
      console.log(this.surveyForm.value);
      this.utilities.errorSnackBar('Invalid form detail');
    } else {
      this.utilities.showLoading('Saving Survey').then(() => {
        if (this.surveyId !== 0) {
          this.apiService.updateSurveyForm(this.surveyForm.value, this.surveyId).subscribe(survey => {
            this.utilities.hideLoading().then(() => {
              this.utilities.showSnackBar('Survey has been updated');
              this.navController.pop();
              this.utilities.setSurveyDetailsRefresh(true);
            });
          });

        } else {
          this.apiService.saveSurvey(this.surveyForm.value).subscribe(survey => {
            this.utilities.showSuccessModal('Survey have been saved').then((modal) => {
              this.utilities.hideLoading().then(() => {
                modal.present();
                modal.onWillDismiss().then((dismissed) => {
                  this.navController.pop();
                  this.utilities.sethomepageSurveyRefresh(true);

                });
              });
            });

          });
        }
      });

    }
  }

  showInvalidFormAlert() {
    let error = '';
    Object.keys(this.surveyForm.controls).forEach((key: string) => {
      const control: AbstractControl = this.surveyForm.get(key);
      if (control.invalid) {
        if (error !== '') {
          error = error + '<br/>';
        }
        if (control.errors.required === true) {
          error = error + this.utilities.capitalizeWord(key) + ' is required';
        }
        if (control.errors.email === true) {
          error = error + 'Invalid email';
        }
        if (control.errors.error !== null && control.errors.error !== undefined) {
          error = error + control.errors.error;
        }
      }
    });
    console.log(this.surveyForm.value);
    this.utilities.showAlert(error);
  }

  getAssignees() {
    this.apiService.getSurveyors(UserRoles.SURVEYOR).subscribe(assignees => {
      this.listOfAssignees = [];
      assignees.forEach(item => this.listOfAssignees.push(item));
      console.log(this.listOfAssignees);
    });
  }

  getSurveyDetails() {
    this.utilities.showLoading('Getting Survey Details').then((success) => {
      this.apiService.getSurveyDetail(this.surveyId).subscribe((result) => {
        this.utilities.hideLoading().then(() => {
          this.survey = result;

          const date = new Date(this.survey.datetime);
          this.surveyForm.patchValue({
            name: this.survey.name,
            email: this.survey.email,
            jobtype: this.survey.jobtype,
            phonenumber: this.survey.phonenumber,
            datetime: date.getTime(),
            comments: this.survey.comments,
            address: this.survey.comments,
            source: this.survey.source,
            createdby: this.survey.createdby.id
          });
          if (this.survey.assignto !== null && this.survey.assignto !== undefined) {
            this.surveyForm.patchValue({
              assignto: this.survey.assignto.id
            });
          }
          this.utilities.setStaticAddress(this.survey.address);

        });
      }, (error) => {
        this.utilities.hideLoading();
      });
    });
  }
}
