import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { UtilitiesService } from '../utilities.service';


export interface Country{
  country:string;
  calling_code:string;
}

@Component({
  selector: 'app-userregistration',
  templateUrl: './userregistration.page.html',
  styleUrls: ['./userregistration.page.scss'],
})
export class UserregistrationPage implements OnInit {

  userregistrationForm: FormGroup;
  user:any;
  isTermsSelect:boolean=false;

  //countries:Country[]=(countriesjson as any).default
  countries:any;
  constructor(
    private formBuilder: FormBuilder,
    private http:HttpClient,
    private utils:UtilitiesService,
    private apiservice:ApiService,
    private router:Router
  ) { }

  ngOnInit() {
    this.fetchCountry();
    const EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    this.userregistrationForm = this.formBuilder.group({
      email: new FormControl("", [Validators.required, Validators.pattern(EMAILPATTERN)]),
      firstname: new FormControl("", [Validators.required]),
      lastname: new FormControl("", [Validators.required]),
      country: new FormControl("", [Validators.required]),
      password:new FormControl(this.utils.randomPass()),
      username:new FormControl(null),
      role:new FormControl(6)
    }
    );
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
    if(this.isTermsSelect)
    {
    this.utils.showLoading("Saving").then(()=>{
      var postData = {
        email:this.userregistrationForm.get('email').value,
        password:this.userregistrationForm.get('password').value,
        username:this.userregistrationForm.get('email').value
      }
      this.apiservice.registerUser(postData).subscribe((res:any)=>{
        console.log(res);
        this.user = res;
        this.utils.hideLoading();
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
        if(res){
          this.apiservice.updateUser(this.user.user.id,postData).subscribe((response)=>{
            console.log(response,"jj");
            this.router.navigate(['/login']);
          })
        }
      })
    })
  }
  else{
    this.utils.errorSnackBar("Please select Terms and Conditions");
  }
  }

  change(event)
  {
    console.log(event.target.value);
    this.isTermsSelect = event.target.value
  }

  gotoSignIn(){
    this.router.navigate(['/login'])
  }



}
