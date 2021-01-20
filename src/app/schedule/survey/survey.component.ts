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
  address: string;

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
      assignedto: new FormControl(null),
      createdby: new FormControl(this.storage.getUserID(), [Validators.required]),
      latitude: new FormControl(''),
      longitude: new FormControl(''),
      country: new FormControl(''),
      state: new FormControl(''),
      city: new FormControl(''),
      postalcode: new FormControl(''),
      status: new FormControl('created')
    });

  }


  ngOnInit() {
    // this.address= this.storage.getData();
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
         this.surveyForm.get('address').setValue("sdck");
         this.surveyForm.get('latitude').setValue('1111111');
         this.surveyForm.get('longitude').setValue('222222222');
         this.surveyForm.get('country').setValue('India');
         this.surveyForm.get('city').setValue('delhi');
        this.surveyForm.get('state').setValue('up');
         this.surveyForm.get('postalcode').setValue(777777777);
      //  this.surveyForm.get('address').setValue(address.address);
      //  this.surveyForm.get('latitude').setValue(address.lat);
      //   this.surveyForm.get('longitude').setValue(address.long);
      //   this.surveyForm.get('country').setValue(address.country);
      //   this.surveyForm.get('city').setValue(address.city);
      //   this.surveyForm.get('state').setValue(address.state);
      //   this.surveyForm.get('postalcode').setValue(address.postalcode);
      }, (error) => {
        this.surveyForm.get('address').setValue('');
        this.surveyForm.get('latitude').setValue('');
        this.surveyForm.get('longitude').setValue('');
        this.surveyForm.get('country').setValue('');
        this.surveyForm.get('city').setValue('');
        this.surveyForm.get('state').setValue('');
        this.surveyForm.get('postalcode').setValue('');
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
              this.navController.navigateForward('camera/' + survey.id + '/' + survey.jobtype + '/' + survey.latitude + '/' + survey.longitude);
            });
          });
        } else {

          // if starting survey directly, assign the survey to yourself
          this.surveyForm.get('assignedto').setValue(this.storage.getUserID());
          this.surveyForm.get('status').setValue('surveyassigned');

          this.apiService.saveSurvey(this.surveyForm.value).subscribe(survey => {
            this.utilities.hideLoading().then(() => {
              this.utilities.setDesignDetailsRefresh(true);
              this.navController.navigateForward('camera/' + survey.id + '/' + survey.jobtype + '/' + survey.latitude + '/' + survey.longitude);
            });
          });
        }
      });
    }
  }

  saveSurvey() {
    if (this.surveyForm.status === 'INVALID') {
      console.log(this.surveyForm.value);
      if(this.surveyForm.value.name==''){
        this.utilities.errorSnackBar('Please enter name.');
      }
      else if(this.surveyForm.value.email==''){
        this.utilities.errorSnackBar('Please enter email.');
      }
      else if(this.surveyForm.value.phonenumber==''){
        this.utilities.errorSnackBar('Please enter phone number.');
      }
      else if(this.surveyForm.value.jobtype==''){
        this.utilities.errorSnackBar('Please enter job type.');
      }
      else {
        this.utilities.errorSnackBar('Address not found. Make sure your location is on in device.');
      }
    } else {
      this.utilities.showLoading('Saving Survey').then(() => {
        if (this.surveyId !== 0) {
          this.apiService.updateSurveyForm(this.surveyForm.value, this.surveyId).subscribe(survey => {
            this.utilities.hideLoading().then(() => {
              this.utilities.showSnackBar('Survey has been updated');
              this.utilities.setSurveyDetailsRefresh(true);
              // this.navController.navigateRoot('homepage/survey');
              this.navController.pop();
            });
          });

        } else {
          if (this.surveyForm.get('assignedto').value !== ''
            && this.surveyForm.get('assignedto').value !== null
            && this.surveyForm.get('assignedto').value !== undefined
            && this.surveyForm.get('assignedto').value !== 0
          ) {
            this.surveyForm.get('status').setValue('surveyassigned');
          }
          console.log(this.surveyForm.value);
          debugger;
          this.apiService.saveSurvey(this.surveyForm.value).subscribe(survey => {
            this.utilities.showSuccessModal('Survey have been saved').then((modal) => {
              this.utilities.hideLoading();
              // this.navController.pop();
                modal.present();
                modal.onWillDismiss().then((dismissed) => {
                  this.utilities.sethomepageSurveyRefresh(true);
                  this.navController.navigateRoot('homepage/survey');

                });
              // });
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
    this.apiService.getSurveyors().subscribe(assignees => {
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
            comments: this.survey.comments==[] ? this.survey.comments : this.survey.comments[0].message,
            address: this.survey.address,
            source: this.survey.source,
            createdby: this.survey.createdby.id,
            latitude: this.survey.latitude,
            longitude: this.survey.longitude,
            country: this.survey.country,
            state: this.survey.state,
            city: this.survey.city,
            postalcode:this.survey.postalcode,
          });
          if (this.survey.assignedto !== null && this.survey.assignedto !== undefined) {
            this.surveyForm.patchValue({
              assignedto: this.survey.assignedto.id,
              status: 'surveyassigned'
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
