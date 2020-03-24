import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { NavController } from "@ionic/angular";

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss'],
})
export class SurveyComponent implements OnInit {

  surveyForm: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private navController: NavController
  ) {
    this.surveyForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      comment: new FormControl(''),
      assignedTo: new FormControl('')
    });
  }

  ngOnInit() {}

  submitSurveyForm() {

  }

  startSurvey() {
    this.navController.navigateForward('camera');
  }
}
