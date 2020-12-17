import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder
} from '@angular/forms';
import {
  ApiService
} from '../api.service';
import {
  UtilitiesService
} from '../utilities.service';
import {
  NavController
} from '@ionic/angular';
import {
  StorageService
} from '../storage.service';
import {
  ErrorModel
} from '../model/error.model';
import { INVALID_EMAIL_MESSAGE, FIELD_REQUIRED } from '../model/constants';
import { Router } from '@angular/router';
import { ROLES } from '../contants';
import { NetworkdetectService } from '../networkdetect.service';
import { Intercom } from 'ng-intercom';

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

  constructor(
    private formBuilder: FormBuilder,
    private utils: UtilitiesService,
    private apiService: ApiService,
    private storageService: StorageService,
    private router: Router,
    private network:NetworkdetectService,
    private intercom:Intercom,
    private navController: NavController) {
    this.isLoggedInOnce = this.storageService.isLoggedInOnce();
  }

  ngOnInit() {
 this.utils.showHideIntercom(true);
    this.intercom.shutdown();
    const EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    this.loginForm = this.formBuilder.group({
      identifier: new FormControl(this.storageService.getUserName(), [Validators.required, Validators.pattern(EMAILPATTERN)]),
      password: new FormControl(this.storageService.getPassword(), [Validators.required, Validators.minLength(6)])
    }
    );

  }

  ionViewDidEnter(){
    this.utils.showHideIntercom(true);
    this.network.networkSwitch.subscribe(data=>{
      this.netSwitch = data;
      console.log(this.netSwitch);

    })

this.network.networkDisconnect();
this.network.networkConnect();
  }

  login() {
    if(!this.netSwitch){
      this.utils.errorSnackBar('No internet connection');
    }else{
      console.log(this.loginForm);
      if (this.loginForm.status === 'VALID') {
        this.utils.showLoading('Logging In').then(() => {
          this.apiService.login(this.loginForm.value).subscribe(response => {
            this.utils.hideLoading().then(() => {
              console.log('Res', response);
              if (response.user.role.id == ROLES.Surveyor) {
                this.storageService.setUserName(this.loginForm.get('identifier').value);
                this.storageService.setPassword(this.loginForm.get('password').value);

                // this.storageService.setUser(response.user, response.jwt);

                if (response.user.isdefaultpassword) {
                  this.storageService.setJWTToken(response.jwt);
                  this.apiService.refreshHeader();
                  this.navController.navigateRoot(['changepassword'])
                } else {
                  this.storageService.setUser(response.user, response.jwt);
                  this.apiService.refreshHeader();
                  // this.navController.navigateRoot(['homepage']);
                  this.navController.navigateRoot(['surveyoroverview']);
                }
              } else if(response.user.role.id == ROLES.Designer){
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
                }
              }

              else if(response.user.role.id == ROLES.Analyst)
              {
                 this.storageService.setUserName(this.loginForm.get('identifier').value);
                  this.storageService.setPassword(this.loginForm.get('password').value);

                  if(response.user.isdefaultpassword){
                      this.storageService.setJWTToken(response.jwt);
                      this.apiService.refreshHeader();
                      this.navController.navigateRoot(['changepassword'])
                  } else{
                    this.storageService.setUser(response.user, response.jwt);
                    this.apiService.refreshHeader();
                    this.navController.navigateRoot(['analystoverview']);
                  }
              }
              else{

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
                   this.navController.navigateRoot(['permithomepage/permitdesign']);
                 }
              }
            });
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
        this.utils.errorSnackBar("Entered email and password combination doesn't match any of our records. Please try again.");
      }
    }
  }

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
    console.log('rrrrrrrrrrrrrrr');

    this.router.navigate(['/changepassword'])
  }
}
