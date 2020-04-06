import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController, Platform } from '@ionic/angular';
import { AssigneeModel, LIST_OF_ASSIGNEES } from '../../model/assignee.model';
import { UtilitiesService } from '../../utilities.service';
import { ScheduleFormEvent } from '../../model/constants';
import { ApiService } from '../../api.service';
import { Subscription } from 'rxjs';

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
    private apiService: ApiService
  ) {
    this.surveyForm = this.formBuilder.group({
      name: new FormControl('Ravi', [Validators.required]),
      email: new FormControl('ravimail26@gmail.com', [Validators.required]),
      phonenumber: new FormControl('9711302357', [Validators.required]),
      datetime: new FormControl(new Date().getTime(), [Validators.required]),
      comments: new FormControl('Comments'),
      address: new FormControl('Vasant Kunj, New Delhi', [Validators.required]),
      source: new FormControl('android', [Validators.required]),
      assignedTo: new FormControl(0)
    });
    this.listOfAssignees = LIST_OF_ASSIGNEES;
    this.utilities.getAddressObservable().subscribe((address) => {
      // this.surveyForm.get('address').setValue(address);
    }, (error) => {
      // this.surveyForm.get('address').setValue('');
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
}
