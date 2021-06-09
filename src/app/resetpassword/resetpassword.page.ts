import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { StorageService } from '../storage.service';
import { UtilitiesService } from '../utilities.service';
import { NavController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { ErrorModel } from '../model/error.model';
import { FIELD_REQUIRED, INVALID_EMAIL_MESSAGE, INVALID_PASSWORD } from '../model/constants';
import {Plugins, PushNotification, PushNotificationActionPerformed, PushNotificationToken} from '@capacitor/core';
import { MixpanelService } from '../utilities/mixpanel.service';
import { ROLES } from '../constants';
import { Router } from '@angular/router';

const {PushNotifications} = Plugins;

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.page.html',
  styleUrls: ['./resetpassword.page.scss'],
})
export class ResetpasswordPage implements OnInit {

   // error messages from constants
 emailError = INVALID_EMAIL_MESSAGE;
 fieldRequired = FIELD_REQUIRED;
 invalidPassword = INVALID_PASSWORD

 forgotPasswordForm: FormGroup;
  isActiveToggleTextPassword: boolean=false;
  isActiveToggleTextnewPassword: boolean=false;
  resetpassword: FormGroup;
  password: string = 'newpassword';
  username:any;
  newPassword:string;

  constructor(
    private formBuilder: FormBuilder,
   private utils: UtilitiesService,
   private navController: NavController,
   private apiService: ApiService,
   private storageService: StorageService,
   private deviceStorage: Storage,
   private mixpanelService:MixpanelService,
   private router:Router
  ) { 
    this.resetpassword = this.formBuilder.group({
      newpassword: new FormControl('', [Validators.required, Validators.minLength(3)] ),
      // oldpassword: new FormControl('',Validators.minLength(6)),
      confirmpassword: new FormControl('',[Validators.required, Validators.minLength(3), this.matchValidator(this.password)]),
      emailcode:new FormControl('',[Validators.required, Validators.minLength(6)])
    })
  }

  ngOnInit() {
    this.password= localStorage.getItem('password');
   
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

 getEmailCodeErrorMessage(){
   if(this.resetpassword.get('emailcode').hasError('required')){
     return this.fieldRequired;
   }
   else if(this.resetpassword.get('emailcode').hasError('minlength')){
     return 'Email code must be at least 6 characters';
   }
 }

 getPasswordErrorMessage() {
  if (this.resetpassword.get('newpassword').hasError('required')) {
    return this.fieldRequired;
  }
  else if(this.resetpassword.get('newpassword').hasError('minlength'))
  {
    return 'Password must be at least 3 characters';
  }

  return this.invalidPassword;
}

getConfirmPasswordErrorMessage() {
  if (this.resetpassword.get('confirmpassword').hasError('required')) {
    return this.fieldRequired;
  }
  console.log("hello")
  return this.resetpassword.get('confirmpassword').hasError('minlength') ?'Password must be at least 3 characters':'New and confirm password does not match each other. Please try again.';
}
 
 
  resetPassword() {
 
    // let data={
    //  newpassword:this.resetpassword.controls.newpassword.value,
    //  confirmpassword:this.resetpassword.controls.confirmpassword.value,
    //  oldpassword:this.password
    // }
    if (this.resetpassword.status === 'VALID') {
      const postData = {
        password: this.resetpassword.get('newpassword').value,
        code: this.resetpassword.get('emailcode').value,
        passwordConfirmation: this.resetpassword.get('confirmpassword').value,
        isdefaultpassword: false,
        };

      this.utils.showLoading('Resetting password').then(() => {
        this.apiService.resetpassword(postData).subscribe((response:any) => {
          console.log(response.user.username)
          this.utils.hideLoading().then(() => {
            localStorage.removeItem('newpasswordrequested');
            this.utils.showSnackBar('Your password has been changed successfully!');
            this.username = response.user.username;
            // console.log(this.user.user.username);
           //  this.utils.showSuccessModal('User password changed successfully!').then((modal) => {
             //  this.apiService.updateresetpassword(response.user.id,postdata).subscribe(res=>{
 
 
 
             //  },err=>{
 
 
             //  })
             //  modal.present();
             //  modal.onWillDismiss().then((dismissed) => {
               // this.goBack();
              //  this.storageService.logout();
               this.deviceStorage.clear();
              //  this.navController.navigateBack('login');
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
            this.utils.errorSnackBar(error.message);
          });
        });
      });
    } else {
      // this.utils.errorSnackBar('Invalid Password entered.');
      this.resetpassword.get('emailcode').markAsDirty();
      this.resetpassword.get('newpassword').markAsDirty();
      this.resetpassword.get('confirmpassword').markAsDirty();
    }
  }
 
  goBack() {
    this.navController.pop();
  }
 
  ionViewWillLeave(){
  }

  login() {
    // if (!this.netSwitch) {
    //   this.utils.errorSnackBar('No internet connection');
    // } else {

      // if (this.loginForm.status === 'VALID') {
        const data={
          identifier : this.username,
          password : this.resetpassword.get('newpassword').value
        }
        this.utils.showLoading('Logging In').then(() => {
          this.apiService.login(data).subscribe(response => {
            this.registerAPNS(response.user);
            console.log(response.user.parent.id)
            this.utils.hideLoading().then(() => {


              this.mixpanelService.track("USER_LOGIN", {
                $id: response.user.id,
                $email: response.user.email,
                $name: response.user.firstname + response.user.lastname
              });
              if (response.user.role.id == ROLES.Surveyor) {
                this.storageService.setUserName(this.username);
                this.storageService.setPassword(this.resetpassword.get('newpassword').value);

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
                this.storageService.setPassword(this.resetpassword.get('newpassword').value);

                  this.storageService.setUser(response.user, response.jwt);
                  this.apiService.refreshHeader();
                  this.navController.navigateRoot(['permitdesignoverview']);
                  if (response.user) {
                    this.utils.doCometUserLogin();
                  }
              } else if (response.user.role.id == ROLES.Analyst) {
                this.storageService.setUserName(this.username);
                this.storageService.setPassword(this.resetpassword.get('newpassword').value);

                  this.storageService.setUser(response.user, response.jwt);
                  this.apiService.refreshHeader();
                  this.navController.navigateRoot(['analystoverview']);
                  if (response.user) {
                    this.utils.doCometUserLogin();
                  }
                
              } else if (response.user.role.id == ROLES.Peengineer) {
                this.storageService.setUserName(this.username);
                this.storageService.setPassword(this.resetpassword.get('newpassword').value);

                  this.storageService.setUser(response.user, response.jwt);
                  this.apiService.refreshHeader();
                  this.navController.navigateRoot(['peengineer']);
                  if (response.user) {
                    this.utils.doCometUserLogin();
                  }
                
              } else {

                // this.utils.errorSnackBar("Access Denied!! Soon we will be coming up with our platform accessibility.");
                this.storageService.setUserName(this.username);
                this.storageService.setPassword(this.resetpassword.get('newpassword').value);
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

  // getuserSettings(data){
  //   //UserSettings Name's API
  //   var parentId = data;
  //   this.apiService.getUserSettings(parentId)
  //     .subscribe((res: any) => {
  //       this.utils.setPrelimName(res[0].nameprelim)
  //       this.utils.setPermitName(res[0].namepermit)
  //       this.utils.setSurveyName(res[0].namesurvey)
  //       this.utils.setPeStampName(res[0].namepestamp)
  //       this.utils.setDashboardName(res[0].namedashboard)
  //       this.utils.setInboxName(res[0].nameinbox)
  //       this.utils.setTeamName(res[0].nameteam)
  //       this.utils.setPrelimVisibility(res[0].visibilityprelim)
  //       this.utils.setPermitVisibility(res[0].visibilitypermit)
  //       this.utils.setSurveyVisibility(res[0].visibilitysurvey)
  //       this.utils.setPestampVisibility(res[0].visibilitypestamp)

        
  //     })
  // }

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
