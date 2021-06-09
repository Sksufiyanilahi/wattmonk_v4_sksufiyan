import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UtilitiesService } from '../utilities.service';
import { MenuController, NavController } from '@ionic/angular';
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
    private apiService: ApiService,
    private menu: MenuController
  ) {
  }

  ngOnInit() {
    this.menu.enable(false)
    const EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    this.forgotPasswordForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)]),
      source: new FormControl('mobile', [Validators.required]),
    });
  }

  ngOnDestroy(){
    this.menu.enable(true)
  }

  resendPassword() {
    if (this.forgotPasswordForm.status === 'VALID') {
      this.utils.showLoading('Sending password Link').then(() => {
        this.apiService.sendForgotPasswordLink(this.forgotPasswordForm.value).subscribe((response) => {
          localStorage.setItem('newpasswordrequested','true');
          this.utils.hideLoading().then(() => {
            // this.utils.showSuccessModal('Password link sent successfully').then((modal) => {
            //   modal.present();
            //   modal.onWillDismiss().then((dismissed) => {
            //    this.resetPassword();
            //   });
            // }, (error) => {

            // });
            this.utils.showAlertBoxForForgot('We have sent a 6 digit code on your registered email. Please use that to reset your password.',[{
              text:'Go to Reset Password',
              handler:()=>{
                this.resetPassword();
                      }
            }])

          });
        }, (responseError) => {
          const error: ErrorModel = responseError.error;
          this.utils.hideLoading().then(() => {
            this.utils.errorSnackBar(error.message[0].messages[0].message);
          });
        });
      });
    } else {
      // this.utils.errorSnackBar('Invalid Email address');
      this.forgotPasswordForm.get('email').markAsDirty();
    }
  }

  goBack() {
    this.navController.navigateBack('login');
  }

  resetPassword(){
    this.navController.navigateForward("resetpassword")
  }

  ionVieWillLeave(){
  }


}
