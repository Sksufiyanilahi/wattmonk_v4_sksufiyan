import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AssigneeModel, LIST_OF_ASSIGNEES } from '../../model/assignee.model';
import { UtilitiesService } from '../../utilities.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss'],
})
export class SurveyComponent implements OnInit {

  surveyForm: FormGroup;
  listOfAssignees: AssigneeModel[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private navController: NavController,
    private utilities: UtilitiesService
  ) {
    this.surveyForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      phonenumber: new FormControl('', [Validators.required]),
      datetime: new FormControl(new Date().getTime(), [Validators.required]),
      comments: new FormControl(''),
      address: new FormControl('', [Validators.required]),
      source: new FormControl('', [Validators.required]),
      assignedTo: new FormControl(0, [Validators.required])
    });
    this.listOfAssignees = LIST_OF_ASSIGNEES;
    this.utilities.getAddressObservable().subscribe((address) => {
      this.surveyForm.get('address').setValue(address);
    }, (error) => {
      this.surveyForm.get('address').setValue('');
    });
  }

  ngOnInit() {
  }

  submitSurveyForm() {

  }

  startSurvey() {
    if (this.surveyForm.status === 'INVALID') {
      this.utilities.showAlert('Invalid Data');
    } else {
      this.utilities.showSuccessModal('Survey have been saved').then((modal) => {
        modal.present();
        modal.onWillDismiss().then((dismissed) => {
          this.navController.navigateForward('camera');
        });
      }, (error) => {

      });
    }
  }

  saveSurvey() {
    if (this.surveyForm.status === 'INVALID') {
      this.utilities.showAlert('Invalid Data');
    } else {
      this.utilities.showSuccessModal('Survey have been saved').then((modal) => {
        modal.present();
        modal.onWillDismiss().then((dismissed) => {
          this.navController.pop();
        });
      }, (error) => {

      });
    }
  }
}
