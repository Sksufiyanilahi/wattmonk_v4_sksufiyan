import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { NavController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { ROLES } from '../contants';
import { INVALID_EMAIL_MESSAGE, INVALID_NAME_MESSAGE } from '../model/constants';
import { ErrorModel } from '../model/error.model';
import { LoginModel } from '../model/login.model';
import { User } from '../model/user.model';
import { NetworkdetectService } from '../networkdetect.service';
import { StorageService } from '../storage.service';
import { UtilitiesService } from '../utilities.service';
import { MixpanelService } from '../utilities/mixpanel.service';

@Component({
  selector: 'app-userregistration',
  templateUrl: './userregistration.page.html',
  styleUrls: ['./userregistration.page.scss'],
})
export class UserregistrationPage implements OnInit {
  userregistrationForm: FormGroup;
  user:LoginModel;
  isTermsSelect:boolean=false;

  nameError = INVALID_NAME_MESSAGE;
  emailError = INVALID_EMAIL_MESSAGE;
  netSwitch:any;
  //countries:Country[]=(countriesjson as any).default
  countries:any;
  constructor(
    private formBuilder: FormBuilder,
    private http:HttpClient,
    private utils:UtilitiesService,
    private apiService:ApiService,
    private router:Router,
    private iab: InAppBrowser,
    private storageService:StorageService,
  ) { 
    const EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    this.userregistrationForm = this.formBuilder.group({
      email: new FormControl("", [Validators.required, Validators.pattern(EMAILPATTERN)]),
      firstname: new FormControl("", [Validators.required, Validators.pattern("^[a-zA-Z. ]{3,}$")]),
      lastname: new FormControl("", [Validators.required, Validators.pattern("^[a-zA-Z. ]{3,}$")]),
      country: new FormControl("", [Validators.required]),
      password:new FormControl(this.utils.randomPass()),
      username:new FormControl(null),
      role:new FormControl(6)
    }
    );
  }

  ngOnInit() {
    this.fetchCountry();
    
  }

  fetchCountry(){
    console.log("user");
    this.http.get("assets/country/country.json").subscribe((res)=>{
      console.log(res);
      this.countries = res;
    })
  }

  registerUser()
  {
    if(this.userregistrationForm.status=='VALID'){
    if(this.isTermsSelect)
    {
    this.utils.showLoading("Saving").then(()=>{
      var postData = {
        email:this.userregistrationForm.get('email').value,
        password:this.userregistrationForm.get('password').value,
        username:this.userregistrationForm.get('email').value
      }
      this.apiService.registerUser(postData).subscribe((res:any)=>{
        console.log(res);
        this.user = res;
        // console.log(this.user.jwt)
        // this.storage.setJWTToken(this.user.jwt);
         this.storageService.setUser(this.user.user,this.user.jwt);
        if(res){
        this.updateUser();
        }
        
        // const postData = {
        //   firstname: this.userregistrationForm.get("firstname").value,
        //   lastname: this.userregistrationForm.get("lastname").value,
        //   country: this.userregistrationForm.get("country").value,
        //   source: "android",
        //   isdefaultpassword: true,
        //   parent: this.user.user.id,
        //   resetPasswordToken: this.userregistrationForm.get('password').value,
        //   role: this.userregistrationForm.get('role').value
        // };
        // if(res){
        //   this.apiservice.updateUser(this.user.user.id,postData).subscribe((response)=>{
        //     console.log(response,"jj");
        //     this.router.navigate(['/login']);
        //     this.utils.showSnackBar("User Registered Successfully");
        //   })
        // }
      },
      responseError => {
        this.utils.hideLoading().then(() => {
          const error: ErrorModel = responseError.error;
          this.utils.errorSnackBar(error.message[0].messages[0].message);
        });
        //
      })
    })
  }
  else{
    this.utils.errorSnackBar("Please select Terms and Conditions");
  }
}else
{
  if(this.userregistrationForm.value.firstname == '' || this.userregistrationForm.get('firstname').hasError('pattern'))
  {
    this.utils.errorSnackBar("Please check the field first name");
  }
  else if(this.userregistrationForm.value.lastname == '' || this.userregistrationForm.get('lastname').hasError('pattern'))
  {
    this.utils.errorSnackBar("Please check the field last name");
  }
  else if(this.userregistrationForm.value.email == '' || this.userregistrationForm.get('email').hasError('pattern'))
  {
    this.utils.errorSnackBar("Please check the field email");
  }
  else
  {
    this.utils.errorSnackBar("Please check the field country");
  }
}
  }

  updateUser()
  {
    console.log(this.user.user.id);
    const postData = {
      firstname: this.userregistrationForm.get("firstname").value,
      lastname: this.userregistrationForm.get("lastname").value,
      country: this.userregistrationForm.get("country").value,
      source: "android",
      isdefaultpassword: true,
      parent: this.user.user.id,
      resetPasswordToken: this.userregistrationForm.get('password').value,
      role: this.userregistrationForm.get('role').value
    };
    this.apiService.updateUser(this.user.user.id,postData).subscribe((response)=>{
      console.log(response,"jj");
      this.utils.hideLoading();
      //this.login();
       this.router.navigate(['/login']);
       this.utils.showSnackBar("User Registered Successfully");
    },
      responseError => {
        this.utils.hideLoading().then(() => {
          const error: ErrorModel = responseError.error;
          this.utils.errorSnackBar(error.message[0].messages[0].message);
        })
  })
}

  change(event)
  {
    console.log(event.detail.checked);
    this.isTermsSelect = event.detail.checked;
  }

  gotoSignIn(){
    this.router.navigate(['/login'])
  }

  showTermsAggrement(){
    const browser = this.iab.create(" https://www.wattmonk.com/service-agreement" ,'_system', 'location=yes,hardwareback=yes,hidden=yes');
  }

  showPrivacyPolicy(){
    const browser = this.iab.create("https://www.wattmonk.com/privacy-policy  " ,'_system', 'location=yes,hardwareback=yes,hidden=yes');
  }


}