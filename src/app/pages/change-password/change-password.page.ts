import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { FIELD_REQUIRED, INVALID_EMAIL_MESSAGE } from 'src/app/models/constants';
import { ErrorModel } from 'src/app/models/error.model';
import { ApiService } from 'src/app/services/api/api.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.page.html',
    styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {

    // error messages from constants
    emailError = INVALID_EMAIL_MESSAGE;
    fieldRequired = FIELD_REQUIRED;

    forgotPasswordForm: FormGroup;
    isActiveToggleTextPassword: boolean = false;
    isActiveToggleTextnewPassword: boolean = false;
    changepassword: FormGroup;
    password: string;
    confirmpassword: string = "newpassword";

    constructor(
        private formBuilder: FormBuilder,
        private utils: UtilitiesService,
        private navController: NavController,
        private apiService: ApiService,
        private storage: StorageService,
        private deviceStorage: Storage,
        private menu: MenuController,
        private router: Router
    ) { }


    ngOnInit() {
        this.menu.enable(false)
        this.password = localStorage.getItem('password');
        this.changepassword = this.formBuilder.group({
            newpassword: new FormControl('', [Validators.required, Validators.minLength(3)]),
            // oldpassword: new FormControl('', Validators.minLength(3)),
            confirmpassword: new FormControl('', [Validators.required, Validators.minLength(3), this.matchValidator(this.confirmpassword)])
        });
    }

    ngOnDestroy() {
        this.menu.enable(true)
    }

    public toggleTextPassword() {
        this.isActiveToggleTextPassword = (this.isActiveToggleTextPassword == true) ? false : true;
    }
    public toggleTextnewPassword() {
        this.isActiveToggleTextnewPassword = (this.isActiveToggleTextnewPassword == true) ? false : true;
    }

    getType() {
        return this.isActiveToggleTextPassword ? 'text' : 'password';
    }
    getnewType() {
        return this.isActiveToggleTextnewPassword ? 'text' : 'password';
    }


    resetPassword() {
        let data = {
            password: this.changepassword.controls.newpassword.value,
            passwordConfirmation: this.changepassword.controls.confirmpassword.value,
            code: this.password
        }
        if (this.changepassword.status === 'VALID') {
            this.utils.showLoading('Resetting password').then(() => {
                this.apiService.resetpassword(data).subscribe((response: any) => {
                    console.log('response', response);
                    this.utils.hideLoading().then(() => {
                        this.utils.showSnackBar('Your password has been changed successfully!');
                        //  this.utils.showSuccessModal(‘User password changed successfully!').then((modal) => {
                        const postData: any = {
                            isdefaultpassword: false,
                            resetPasswordToken: "",
                        };
                        this.apiService.updateresetpassword(this.storage.getUserID(), postData).subscribe(res => {
                            // this.router.navigate(['/onboarding’]);
                            localStorage.setItem('user', JSON.stringify(res));
                            
                            let user = this.storage.getUser();
                            
                            // this.storage.setUser(res, );
                            if (user.role.type === 'clientsuperadmin' && (user.isonboardingcompleted == null || user.isonboardingcompleted == false)) {
                                this.navController.navigateRoot('onboarding');
                            } else {
                                if (user.role.type == "surveyors") {
                                    this.navController.navigateRoot(['surveyor-overview']);
                                } else {
                                    this.navController.navigateRoot(['home/survey']);
                                }
                            }
                        }, err => {
                            this.utils.errorSnackBar(err.message[0].messages[0].message);
                        });
                        //  modal.present();
                        //  modal.onWillDismiss().then((dismissed) => {
                        // this.goBack();
                        // this.storage.logout();
                        // this.deviceStorage.clear();
                        // this.navController.navigateBack(‘login’);
                        //  });
                        //  }, (responseError) => {
                        //   const error: ErrorModel = responseError.error;
                        //   this.utils.errorSnackBar(error.message[0].messages[0].message);
                        //  });
                    });
                }, (responseError) => {
                    const error: ErrorModel = responseError.error;
                    this.utils.hideLoading().then(() => {
                        this.utils.errorSnackBar(error.message[0].messages[0].message);
                    });
                });
            });
        } else {
            //  this.utils.errorSnackBar(‘Invalid Password entered.’);
            this.changepassword.get('newpassword').markAsDirty();
            this.changepassword.get('confirmpassword').markAsDirty();
        }
    }

    goBack() {
        this.navController.pop();
    }

    getErrorMessage(control: AbstractControl) {
        var newpassword = this.changepassword.get('newpassword');
        var confirmpassword = this.changepassword.get('confirmpassword');

        if (control.hasError("required")) {
            return "You must enter a value";
        }
        if (control == newpassword) {
            return newpassword.hasError("minlength")
                ? "Password must be at least 3 characters"
                : "";
        } else if (control == confirmpassword) {
            return confirmpassword.hasError("minlength")
                ? "Password must be at least 3 characters"
                : "New and confirm password does not match each other. Please try again.";
        }
        // } else if (control == this.company) {
        //   return this.company.hasError("pattern")
        //     ? "Please enter a valid company name."
        //     : "";
        // } else if (control == this.phone) {
        //   return this.phone.hasError("pattern")
        //     ? "Please enter a valid phone number."
        //     : "";
        // }
    }

    ionViewWillLeave() {
    }

    matchValidator(fieldName: string) {
        let fcfirst: FormControl;
        let fcSecond: FormControl;

        return function matchValidator(control: FormControl) {

            if (!control.parent) {
                return null;
            }

            // INITIALIZING THE VALIDATOR.
            if (!fcfirst) {
                //INITIALIZING FormControl first
                fcfirst = control;
                fcSecond = control.parent.get(fieldName) as FormControl;

                //FormControl Second
                if (!fcSecond) {
                    throw new Error('matchValidator(): Second control is not found in the parent group!');
                }

                fcSecond.valueChanges.subscribe(() => {
                    fcfirst.updateValueAndValidity();
                });
            }

            if (!fcSecond) {
                return null;
            }

            if (fcSecond.value !== fcfirst.value) {
                return {
                    matchOther: true
                };
            }

            return null;
        }
    }

    gotoSignIn() {
        this.router.navigate(['/login'])
    }
}
