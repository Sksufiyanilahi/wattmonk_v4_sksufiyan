import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UtilitiesService } from '../utilities.service';
import { NavController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { ErrorModel } from '../model/error.model';
import { FIELD_REQUIRED, INVALID_EMAIL_MESSAGE } from '../model/constants';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  // error messages from constants
  emailError = INVALID_EMAIL_MESSAGE;
  fieldRequired = FIELD_REQUIRED;

  forgotPasswordForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private utils: UtilitiesService,
    private navController: NavController,
    private apiService: ApiService
  ) {
  }

  ngOnInit() {
    const EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    this.forgotPasswordForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)]),
    });
  }

  resendPassword() {
    if (this.forgotPasswordForm.status === 'VALID') {
      this.utils.showLoading('Sending password Link').then(() => {
        this.apiService.sendForgotPasswordLink(this.forgotPasswordForm.value).subscribe((response) => {
          this.utils.hideLoading().then(() => {
            this.utils.showSnackBar('Password link sent successfully');
            this.goBack();
          });
        }, (responseError) => {
          const error: ErrorModel = responseError.error;
          this.utils.hideLoading().then(() => {
            this.utils.showSnackBar(error.message[0].messages[0].message);
          });
        });
      });
    } else {
      this.utils.showSnackBar('Invalid Email address');
    }
  }

  goBack() {
    this.navController.pop();
  }

}
