import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../api.service';
import {UtilitiesService} from '../utilities.service';
import {MenuController, NavController} from '@ionic/angular';
import {StorageService} from '../storage.service';
import {ErrorModel} from '../model/error.model';
import {FIELD_REQUIRED, INVALID_EMAIL_MESSAGE} from '../model/constants';
import {Router} from '@angular/router';
import {ROLES} from '../constants';
import {NetworkdetectService} from '../networkdetect.service';
import {MixpanelService} from '../utilities/mixpanel.service';

import {Plugins, PushNotification, PushNotificationActionPerformed, PushNotificationToken} from '@capacitor/core';

const {PushNotifications} = Plugins;

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
  }
)
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  isActiveToggleTextPassword = true;

  emailError = INVALID_EMAIL_MESSAGE;
  fieldRequired = FIELD_REQUIRED;
  isLoggedInOnce = false;
  netSwitch: any;
  buttonTitle ='Sign in'

  constructor(
    private formBuilder: FormBuilder,
    private utils: UtilitiesService,
    private apiService: ApiService,
    private storageService: StorageService,
    private router: Router,
    private menu: MenuController,
    private network: NetworkdetectService,
    private navController: NavController,
    private mixpanelService: MixpanelService) {
    this.isLoggedInOnce = this.storageService.isLoggedInOnce();

  }

  ngOnInit() {
    this.menu.enable(false)
    const EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    this.loginForm = this.formBuilder.group({
        identifier: new FormControl(this.storageService.getUserName(), [Validators.required, Validators.pattern(EMAILPATTERN)]),
        password: new FormControl(this.storageService.getPassword(), [Validators.required, Validators.minLength(3)])
      }
    );

  }

  ngOnDestroy(){
    this.menu.enable(true)
  }

  ionViewDidEnter() {
    this.network.networkSwitch.subscribe(data => {
      this.netSwitch = data;


    })

    this.network.networkDisconnect();
    this.network.networkConnect();
  }

  login() {
    if (!this.netSwitch) {
      this.utils.errorSnackBar('No internet connection');
    } else {

      if (this.loginForm.status === 'VALID') {
        this.utils.showLoading('Logging In').then(() => {
          this.apiService.login(this.loginForm.value).subscribe(response => {
            localStorage.removeItem('newpasswordrequested');
            this.registerAPNS(response.user);
            this.utils.hideLoading().then(() => {


              this.mixpanelService.track("USER_LOGIN", {
                $id: response.user.id,
                $email: response.user.email,
                $name: response.user.firstname + response.user.lastname
              });
              if (response.user.role.id == ROLES.Surveyor) {
                this.storageService.setUserName(this.loginForm.get('identifier').value);
                this.storageService.setPassword(this.loginForm.get('password').value);

                this.storageService.setUser(response.user, response.jwt);

                if (response.user.isdefaultpassword) {
                  this.storageService.setJWTToken(response.jwt);
                  this.apiService.refreshHeader();
                  this.navController.navigateRoot(['changepassword'])
                } else {
                  // this.storageService.setUser(response.user, response.jwt);
                  this.apiService.refreshHeader();
                  // this.navController.navigateRoot(['homepage']);
                  this.navController.navigateRoot(['surveyoroverview']);
                  if (response.user) {
                    this.utils.doCometUserLogin();
                  }
                }
              } else if (response.user.role.id == ROLES.Designer) {
                // this.utils.errorSnackBar("Access Denied!! Soon we will be coming up with our platform accessibility.");
                this.storageService.setUserName(this.loginForm.get('identifier').value);
                this.storageService.setPassword(this.loginForm.get('password').value);


                if (response.user.isdefaultpassword) {
                  this.storageService.setJWTToken(response.jwt);
                  this.apiService.refreshHeader();
                  this.navController.navigateRoot(['changepassword'])
                } else {
                  this.storageService.setUser(response.user, response.jwt);
                  this.apiService.refreshHeader();
                  this.navController.navigateRoot(['permitdesignoverview']);
                  if (response.user) {
                    this.utils.doCometUserLogin();
                  }
                }
              } else if (response.user.role.id == ROLES.Analyst) {
                this.storageService.setUserName(this.loginForm.get('identifier').value);
                this.storageService.setPassword(this.loginForm.get('password').value);

                if (response.user.isdefaultpassword) {
                  this.storageService.setJWTToken(response.jwt);
                  this.apiService.refreshHeader();
                  this.navController.navigateRoot(['changepassword'])
                } else {
                  this.storageService.setUser(response.user, response.jwt);
                  this.apiService.refreshHeader();
                  this.navController.navigateRoot(['analystoverview']);
                  if (response.user) {
                    this.utils.doCometUserLogin();
                  }
                }
              } else if (response.user.role.id == ROLES.Peengineer) {
                this.storageService.setUserName(this.loginForm.get('identifier').value);
                this.storageService.setPassword(this.loginForm.get('password').value);

                if (response.user.isdefaultpassword) {
                  this.storageService.setJWTToken(response.jwt);
                  this.apiService.refreshHeader();
                  this.navController.navigateRoot(['changepassword'])
                } else {
                  this.storageService.setUser(response.user, response.jwt);
                  this.apiService.refreshHeader();
                  this.navController.navigateRoot(['peengineer']);
                  if (response.user) {
                    this.utils.doCometUserLogin();
                  }
                }
              } else {

                // this.utils.errorSnackBar("Access Denied!! Soon we will be coming up with our platform accessibility.");
                this.storageService.setUserName(this.loginForm.get('identifier').value);
                this.storageService.setPassword(this.loginForm.get('password').value);
                this.storageService.setUser(response.user, response.jwt);
                this.apiService.refreshHeader();
                if (response.user.isdefaultpassword) {
                  this.storageService.setJWTToken(response.jwt);
                  this.apiService.refreshHeader();
                  this.navController.navigateRoot(['changepassword'])
                } else {
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

      } else {
        this.apiService.resetHeaders();
        // this.utils.errorSnackBar("Entered email and password combination doesn't match any of our records. Please try again.");
        this.loginForm.get('identifier').markAsDirty();
        this.loginForm.get('password').markAsDirty();
      }
    }
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

  public toggleTextPassword() {
    this.isActiveToggleTextPassword = (this.isActiveToggleTextPassword == true) ? false : true;
  }

  getType() {
    return this.isActiveToggleTextPassword ? 'password' : 'text';
  }

  get password() {
    return this.loginForm.get('password');
  }

  changepassword() {


    this.router.navigate(['/changepassword'])
  }

  gotoSignup() {
    this.router.navigate(['/userregistration'])
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
