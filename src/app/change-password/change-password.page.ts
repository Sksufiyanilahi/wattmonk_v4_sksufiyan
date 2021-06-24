import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { StorageService } from '../storage.service';
import { UtilitiesService } from '../utilities.service';
import { MenuController, NavController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { ErrorModel } from '../model/error.model';
import { FIELD_REQUIRED, INVALID_EMAIL_MESSAGE } from '../model/constants';
import { MixpanelService } from '../utilities/mixpanel.service';
import {Plugins,PushNotification, PushNotificationActionPerformed, PushNotificationToken } from '@capacitor/core';
import { ROLES } from '../constants';

const {PushNotifications} = Plugins;


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
  isActiveToggleTextPassword: boolean=false;
  isActiveToggleTextnewPassword: boolean=false;
  changepassword: FormGroup;
  password: string;
  confirmpassword :string="newpassword";
  username:any;

 constructor(
   private formBuilder: FormBuilder,
   private utils: UtilitiesService,
   private navController: NavController,
   private apiService: ApiService,
   private storageService: StorageService,
   private deviceStorage: Storage,
   private menu: MenuController,
   private mixpanelService:MixpanelService
 ) {
 }

 ngOnInit() {
  this.menu.enable(false)
   this.password= localStorage.getItem('password');
  this.changepassword = this.formBuilder.group({
    newpassword: new FormControl('', [Validators.required, Validators.minLength(3)] ),
    oldpassword: new FormControl('',Validators.minLength(3)),
    confirmpassword: new FormControl('',[Validators.required, Validators.minLength(3), this.matchValidator(this.confirmpassword)])
  })
 }

 ngOnDestroy(){
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

   let data={
    newpassword:this.changepassword.controls.newpassword.value,
    confirmpassword:this.changepassword.controls.confirmpassword.value,
    oldpassword:this.password
   }



   if (this.changepassword.status === 'VALID') {

     this.utils.showLoading('Resetting password').then(() => {
       this.apiService.changepassword(data).subscribe((response:any) => {

         let postdata={
          isdefaultpassword:false
         }
         this.utils.hideLoading().then(() => {
           this.utils.showSnackBar('Your password has been changed successfully!');
           console.log(response)
           this.username = localStorage.getItem('username');
           console.log(this.username)
          //  this.utils.showSuccessModal('User password changed successfully!').then((modal) => {
            //  this.apiService.updateresetpassword(response.user.id,postdata).subscribe(res=>{



            //  },err=>{


            //  })
            //  modal.present();
            //  modal.onWillDismiss().then((dismissed) => {
              // this.goBack();
              
              this.deviceStorage.clear();
              this.login();
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
    //  this.utils.errorSnackBar('Invalid Password entered.');
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

 ionViewWillLeave(){
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

login() {
  // if (!this.netSwitch) {
  //   this.utils.errorSnackBar('No internet connection');
  // } else {

    // if (this.loginForm.status === 'VALID') {
      const data={
        identifier : this.username,
        password : this.changepassword.get('newpassword').value
      }
      this.utils.showLoading('Logging In').then(() => {
        this.apiService.login(data).subscribe(response => {
          this.registerAPNS(response.user);
          this.utils.hideLoading().then(() => {


            this.mixpanelService.track("USER_LOGIN", {
              $id: response.user.id,
              $email: response.user.email,
              $name: response.user.firstname + response.user.lastname
            });
            if (response.user.role.id == ROLES.Surveyor) {
              this.storageService.setUserName(this.username);
              this.storageService.setPassword(this.changepassword.get('newpassword').value);

              this.storageService.setUser(response.user, response.jwt);
                // this.storageService.setUser(response.user, response.jwt);
                this.apiService.refreshHeader();
                // this.navController.navigateRoot(['homepage']);
                this.navController.navigateRoot(['surveyoroverview']);
                if (response.user) {
                  this.utils.doCometUserLogin();

              }
            } else if (response.user.role.id == ROLES.Designer) {
              // this.utils.errorSnackBar("Access Denied!! Soon we will be coming up with our platform accessibility.");
              this.storageService.setUserName(this.username);
              this.storageService.setPassword(this.changepassword.get('newpassword').value);

                this.storageService.setUser(response.user, response.jwt);
                this.apiService.refreshHeader();
                this.navController.navigateRoot(['permitdesignoverview']);
                if (response.user) {
                  this.utils.doCometUserLogin();
                }
            } else if (response.user.role.id == ROLES.Analyst) {
              this.storageService.setUserName(this.username);
              this.storageService.setPassword(this.changepassword.get('newpassword').value);

                this.storageService.setUser(response.user, response.jwt);
                this.apiService.refreshHeader();
                this.navController.navigateRoot(['analystoverview']);
                if (response.user) {
                  this.utils.doCometUserLogin();
                }

            } else if (response.user.role.id == ROLES.Peengineer) {
              this.storageService.setUserName(this.username);
              this.storageService.setPassword(this.changepassword.get('newpassword').value);

                this.storageService.setUser(response.user, response.jwt);
                this.apiService.refreshHeader();
                this.navController.navigateRoot(['peengineer']);
                if (response.user) {
                  this.utils.doCometUserLogin();
                }

            } else {

              // this.utils.errorSnackBar("Access Denied!! Soon we will be coming up with our platform accessibility.");
              this.storageService.setUserName(this.username);
              this.storageService.setPassword(this.changepassword.get('newpassword').value);
              this.storageService.setUser(response.user, response.jwt);
              this.apiService.refreshHeader();

                if (response.user.role.type === 'clientsuperadmin' && (response.user.isonboardingcompleted == null || response.user.isonboardingcompleted == false)) {

                  this.navController.navigateRoot('onboarding');
                  if (response.user) {
                    this.utils.doCometUserLogin();
                  }
                } else {
                  // this.getuserSettings(response.user.parent.id)
                  this.navController.navigateRoot(['/dashboard'])
                  if (response.user) {
                    this.utils.doCometUserLogin();
                  }
                }
            }
          });
          this.apiService.emitUserNameAndRole(response.user);

        }, responseError => {
          this.utils.hideLoading().then(() => {
            this.apiService.resetHeaders();
            const error: ErrorModel = responseError.error;
            // this.utils.errorSnackBar(error);
            this.utils.errorSnackBar("Entered email and password combination doesn't match any of our records. Please try again.");
          });

        });
      });

    // } else {
    //   this.apiService.resetHeaders();
    //   this.utils.errorSnackBar("Entered email and password combination doesn't match any of our records. Please try again.");
    // }
  // }
}

registerAPNS(user) {
  PushNotifications.requestPermission().then(result => {
    if (result.granted) {
      PushNotifications.register();
    }
  });

  PushNotifications.addListener('registration',
    (token: PushNotificationToken) => {
      localStorage.setItem('pushtoken', token.value);

    }
  );

  PushNotifications.addListener('registrationError',
    (error: any) => {

    }
  );

  PushNotifications.addListener('pushNotificationReceived',
    (notification: PushNotification) => {

    }
  );

  PushNotifications.addListener('pushNotificationActionPerformed',
    (notification: PushNotificationActionPerformed) => {

    }
  );

  this.apiService.pushtoken(user.id, {newpushtoken: localStorage.getItem('pushtoken')});
}


}
