import {
  Component,
  OnInit
} from '@angular/core';

import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder
}

  from '@angular/forms';

import {
  ApiService
}

  from '../api.service';

import {
  UtilitiesService
}

  from '../utilities.service';

import {
  NavController
}

  from '@ionic/angular';

import {
  StorageService
}

  from '../storage.service';

import {
  ErrorModel
}

  from '../model/error.model';
import { INVALID_EMAIL_MESSAGE, FIELD_REQUIRED } from '../model/constants';

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

  constructor(
    private formBuilder: FormBuilder,
    private utils: UtilitiesService,
    private apiService: ApiService,
    private storageService: StorageService,
    private navController: NavController) {
    this.isLoggedInOnce = this.storageService.isLoggedInOnce();
  }

  ngOnInit() {
    const EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    this.loginForm = this.formBuilder.group({
        identifier: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)])
      }
    );
  }

  login() {
    console.log(this.loginForm);
    if (this.loginForm.status === 'VALID') {
      this.utils.showLoading('Logging In').then(() => {
        this.apiService.login(this.loginForm.value).subscribe(response => {
          this.utils.hideLoading().then(() => {
            console.log('Res', response);
            this.storageService.setUser(response.user, response.jwt);
            this.apiService.refreshHeader();
            this.navController.navigateRoot(['homepage']);
          });
        }, responseError => {
          this.utils.hideLoading().then(() => {
            const error: ErrorModel = responseError.error;
            this.utils.errorSnackBar(error.message[0].messages[0].message);
          });

        });
      });

    } else {
      this.utils.showAlert('Invalid Credentials');
    }
  }

  public toggleTextPassword() {
    this.isActiveToggleTextPassword = (this.isActiveToggleTextPassword == true) ? false : true;
  }

  public getType() {
    return this.isActiveToggleTextPassword ? 'password' : 'text';
  }

  get password() {
    return this.loginForm.get('password');
  }


}
