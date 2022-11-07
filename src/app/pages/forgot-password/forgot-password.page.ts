import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, MenuController, NavController } from '@ionic/angular';
import { FIELD_REQUIRED, INVALID_EMAIL_MESSAGE } from 'src/app/models/constants';
import { ErrorModel } from 'src/app/models/error.model';
import { ApiService } from 'src/app/services/api/api.service';
import { MAILFORMAT } from 'src/app/services/constants';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';

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
        private menu: MenuController,
        private alert : AlertController,
        private route : Router
    ) { }

    ngOnInit() {
        this.menu.enable(false)
        this.forgotPasswordForm = this.formBuilder.group({
            email: new FormControl('', [Validators.required, Validators.pattern(MAILFORMAT)]),
            source: new FormControl('mobile', [Validators.required]),
        });
    }

    ngOnDestroy() {
        this.menu.enable(true)
    }

    resendPassword() {
        if (this.forgotPasswordForm.status === 'VALID') {
            this.utils.showLoading('Sending password Link').then(() => {
                this.apiService.sendForgotPasswordLink(this.forgotPasswordForm.value).subscribe((response) => {
                    console.log(response);
                    
                    localStorage.setItem('newpasswordrequested', 'true');
                    this.utils.hideLoading().then(() => {
                        // this.utils.showSuccessModal('Password link sent successfully').then((modal) => {
                        //   modal.present();
                        //   modal.onWillDismiss().then((dismissed) => {
                        //    this.resetPassword();
                        //   });
                        // }, (error) => {

                        // });
                        // this.utils.showAlertBoxForForgot('We have sent a 6 digit code on your registered email. Please use that to reset your password.', [{
                        //     text: 'Go to Reset Password',
                        //     handler: () => {
                        //         // this.resetPassword();
                        //         console.log("reset Handler")
                        //         this.navController.navigateForward('/reset-password')
                        //     }
                        // }])
                        this.presentAlert();
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

    async presentAlert() {
        const alert = await this.alert.create({
          header: 'We have sent a 6 digit code on your registered email. Please use that to reset your password.',
          buttons: [
            {
                text: 'Go to Reset Password',
                // role: 'cancel',
                handler: () => {
                    this.route.navigate(['reset-password'])
                },
              },
          ],
        });
    
        await alert.present();
      }

    goBack() {
        this.navController.navigateBack('login');
    }

    resetPassword() {
        this.navController.navigateForward('reset-password')
    }

    ionVieWillLeave() {
    }

}
