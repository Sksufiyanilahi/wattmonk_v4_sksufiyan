import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController, Platform } from '@ionic/angular';
import { AssigneeModel } from '../../model/assignee.model';
import { UtilitiesService } from '../../utilities.service';
import { ScheduleFormEvent, UserRoles } from '../../model/constants';
import { ApiService } from '../../api.service';
import { Subscription } from 'rxjs';
import { StorageService } from '../../storage.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss'],
})
export class SurveyComponent implements OnInit, OnDestroy {

  surveyForm: FormGroup;
  listOfAssignees: AssigneeModel[] = [];
  private subscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private navController: NavController,
    private utilities: UtilitiesService,
    private platform: Platform,
    private apiService: ApiService,
    private storage: StorageService
  ) {
    this.surveyForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      phonenumber: new FormControl('', [Validators.required]),
      datetime: new FormControl(new Date().getTime(), [Validators.required]),
      comments: new FormControl(''),
      address: new FormControl('', [Validators.required]),
      source: new FormControl('android', [Validators.required]),
      assignedTo: new FormControl(0)
    });
    // this.listOfAssignees = LIST_OF_ASSIGNEES;
    this.utilities.getAddressObservable().subscribe((address) => {
      this.surveyForm.get('address').setValue(address);
    }, (error) => {
      this.surveyForm.get('address').setValue('');
    });
    console.log(this.platform);
    // this.platform.ready().then(value => this.surveyForm.get('source').setValue(value));

  }

  ngOnInit() {
    console.log('subscribing');
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

    this.getAssignees();
  }

  ngOnDestroy() {
    console.log('unsubscribed');
    this.subscription.unsubscribe();
    // this.utilities.getScheduleFormEvent().unsubscribe();
  }

  startSurvey() {
    if (this.surveyForm.status === 'INVALID') {
      this.showInvalidFormAlert();
    } else {
      this.apiService.saveSurvey(this.surveyForm.value).subscribe(survey => {
        this.utilities.showSuccessModal('Survey have been saved').then((modal) => {
          modal.present();
          modal.onWillDismiss().then((dismissed) => {
            this.navController.navigateForward('camera');
          });
        }, (error) => {

        });
      });
    }
  }

  saveSurvey() {
    if (this.surveyForm.status === 'INVALID') {
      this.showInvalidFormAlert();
    } else {
      this.apiService.saveSurvey(this.surveyForm.value).subscribe(survey => {
        this.utilities.showSuccessModal('Survey have been saved').then((modal) => {
          modal.present();
          modal.onWillDismiss().then((dismissed) => {
            this.navController.pop();
          });
        }, (error) => {

        });
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
    this.apiService.getAssignees(UserRoles.SURVEYOR).subscribe(assignees => {
      this.listOfAssignees = [];
      this.listOfAssignees.push({
        firstname: '',
        logo: {
          url: '/assets/images/wattmonk_logo.png'
        },
        selected: false,
        id: this.storage.getUser().id
      });
      assignees.forEach(item => this.listOfAssignees.push(item));
      console.log(this.listOfAssignees);
    });
  }
}
