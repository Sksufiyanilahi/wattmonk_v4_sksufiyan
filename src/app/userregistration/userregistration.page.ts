import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { ROLES } from '../contants';
import {FIELD_REQUIRED, INVALID_EMAIL_MESSAGE, INVALID_NAME_MESSAGE} from '../model/constants';
import { ErrorModel } from '../model/error.model';
import { LoginModel } from '../model/login.model';
import { User } from '../model/user.model';
import { NetworkdetectService } from '../networkdetect.service';
import { StorageService } from '../storage.service';
import { UtilitiesService } from '../utilities.service';
import { MixpanelService } from '../utilities/mixpanel.service';

export interface Country {
  country: string;
  calling_code: string;

}

@Component({
  selector: 'app-userregistration',
  templateUrl: './userregistration.page.html',
  styleUrls: ['./userregistration.page.scss'],
})
export class UserregistrationPage implements OnInit {
  userregistrationForm: FormGroup;
  user:LoginModel;
  isTermsSelect:boolean=false;

  firstNameError = "Invalid First Name";
  fieldRequired = FIELD_REQUIRED;
  emailError = INVALID_EMAIL_MESSAGE;
  lastNameError = "Invalid Last Name";
  netSwitch:any;
  //countries:Country[]=(countriesjson as any).default
  countries:Country[];
  filteredCountries: Observable<Country[]>;
  selectedcountry: any;

  constructor(
    private formBuilder: FormBuilder,
    private http:HttpClient,
    private utils:UtilitiesService,
    private apiService:ApiService,
    private router:Router,
    private iab: InAppBrowser,
    private storageService:StorageService,
    private navController:NavController,
    private mixpanelService:MixpanelService,
    private network:NetworkdetectService
  ) { const EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
  this.userregistrationForm = this.formBuilder.group({
    email: new FormControl("", [Validators.required, Validators.pattern(EMAILPATTERN)]),
    firstname: new FormControl("", [Validators.required, Validators.pattern("^[a-zA-Z. ]{3,}$")]),
    lastname: new FormControl("", [Validators.required, Validators.pattern("^[a-zA-Z. ]{3,}$")]),
    country: new FormControl("", [Validators.required]),
    password:new FormControl(this.utils.randomPass()),
    username:new FormControl(null),
    role:new FormControl(6)
  }
  );}

  ngOnInit() {
    this.fetchCountry();

  }

  fetchCountry(){

    this.http.get("assets/country/country.json").subscribe((res:any)=>{

      this.countries = res;
      this.country();
      this.selectedcountry=this.countries.find(c=> c.country=='United States');

    this.userregistrationForm.get('country').setValue(this.selectedcountry.country);
    this.setSelectedCountry(this.selectedcountry);
    })
  }

  displayFn(country: Country): string {
    return country && country.country ? country.country : "";
  }

  private _filter(name: string): Country[] {
    const filterValue = name.toLowerCase();

    return this.countries.filter(
      country => country.country.toLowerCase().indexOf(filterValue) != -1
    );
  }

  setSelectedCountry(item: Country) {
    this.selectedcountry = item;

  }

  country()
  {
    this.filteredCountries = this.userregistrationForm.get('country').valueChanges.pipe(
      startWith(""),
      map(value => (typeof value === "string" ? value : value.name)),
      map(name => (name ? this._filter(name) : this.countries.slice()))
    );
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

        this.user = res;
        //
         this.storageService.setJWTToken(this.user.jwt);
        // this.storageService.setUser(this.user.user,this.user.jwt);
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
        //
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

    const postData = {
      firstname: this.userregistrationForm.get("firstname").value,
      lastname: this.userregistrationForm.get("lastname").value,
      country: this.userregistrationForm.get("country").value,
      source: this.utils.checkPlatform(),
      isdefaultpassword: true,
      parent: this.user.user.id,
      resetPasswordToken: this.userregistrationForm.get('password').value,
      role: this.userregistrationForm.get('role').value
    };
    this.apiService.updateUser(this.user.user.id,postData).subscribe((response:any)=>{

      //this.
     // this.storageService.setUser(response);
     // this.apiService.refreshHeader();
      this.utils.hideLoading();
      this.utils.showSnackBar("Congrats!! Let's get started. We have sent you default login credentials on your registered email.")
     // this.login();
     setTimeout(() => {
      this.router.navigate(['/login']);
      this.utils.showSnackBar("User Registered Successfully");
     },3000)
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

  ionViewDidEnter(){
    this.network.networkSwitch.subscribe(data=>{
      this.netSwitch = data;


    })

this.network.networkDisconnect();
this.network.networkConnect();
  }

  // login() {
  //   if(!this.netSwitch){
  //     this.utils.errorSnackBar('No internet connection');
  //   }else{
  //
  //     if (this.userregistrationForm.status === 'VALID') {
  //       this.utils.showLoading('Logging In').then(() => {
  //         const postData ={
  //           identifier : this.storageService.getUser().username,
  //           password : this.userregistrationForm.get('password').value
  //         }
  //         this.apiService.login(postData).subscribe(response => {
  //           this.utils.hideLoading().then(() => {
  //
  //
  //             this.mixpanelService.track("USER_LOGIN", {
  //               $id: response.user.id,
  //               $email: response.user.email,
  //               $name: response.user.firstname + response.user.lastname
  //             });

  //                // this.utils.errorSnackBar("Access Denied!! Soon we will be coming up with our platform accessibility.");
  //                this.storageService.setUserName(this.userregistrationForm.get('username').value);
  //                this.storageService.setPassword(this.userregistrationForm.get('password').value);
  //                this.storageService.setUser(response.user, response.jwt);
  //                this.apiService.refreshHeader();
  //               //  if (response.user.isdefaultpassword) {
  //               //   this.storageService.setJWTToken(response.jwt);
  //               //   this.apiService.refreshHeader();
  //               //    this.navController.navigateRoot(['changepassword'])
  //               //  } else {
  //                 if(response.user.role.type==='clientsuperadmin' && (response.user.isonboardingcompleted == null || response.user.isonboardingcompleted == false)){

  //                   this.navController.navigateRoot('onboarding');
  //                   if(response.user){
  //                     this.utils.doCometUserLogin();
  //                   }
  //                 }
  //                 else{
  //                  this.navController.navigateRoot(['/dashboard'])
  //                  if(response.user){
  //                   this.utils.doCometUserLogin();
  //                 }
  //                }
  //               //}

  //           });
  //           this.apiService.emitUserNameAndRole(response.user);

  //         }, responseError => {
  //           this.utils.hideLoading().then(() => {
  //             this.apiService.resetHeaders();
  //             const error: ErrorModel = responseError.error;
  //             // this.utils.errorSnackBar(error);
  //             this.utils.errorSnackBar("Entered email and password combination doesn't match any of our records. Please try again.");
  //           });

  //         });
  //       });

  //     } else {
  //       this.apiService.resetHeaders();
  //       this.utils.errorSnackBar("Entered email and password combination doesn't match any of our records. Please try again.");
  //     }
  //   }
  // }


}
