import {
  Component,
  OnInit
}

  from '@angular/core';

import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder
}

  from "@angular/forms";

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

  from "../storage.service";

import {
  ErrorModel
}

  from "../model/error.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
}

) export class LoginPage implements OnInit {

  loginForm: FormGroup;
  isActiveToggleTextPassword: Boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private utils: UtilitiesService,
    private apiService: ApiService,
    private storageService: StorageService,
    private navController: NavController) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      identifier: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    }

    );
  }

  login() {
    if (this.loginForm.status === 'VALID') {
      this.utils.showLoading('Logging In').then(() => {
        this.apiService.login(this.loginForm.value).subscribe(response => {
          this.utils.hideLoading().then(() => {
            console.log("Res",response);
            this.storageService.setUser(response.user);
            this.storageService.setJWTToken(response.jwt);
            this.apiService.refreshHeader();
            this.navController.navigateRoot(['homepage']);
          });
        }, responseError => {
          this.utils.hideLoading().then(() => {
            const error: ErrorModel = responseError.error;
            this.utils.showAlert(error.message[0].messages[0].message);
          });

        })
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


}