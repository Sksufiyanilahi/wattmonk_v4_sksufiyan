import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { INVALID_EMAIL_MESSAGE, FIELD_REQUIRED, INVALID_PHONE_NUMBER } from '../model/constants';
import { startWith ,map} from 'rxjs/operators';
import { ApiService } from '../api.service';
import { StorageService } from '../storage.service';
import { UtilitiesService } from '../utilities.service';
export interface Country {
  country: string;
  calling_code: string;

}

@Component({
  selector: 'app-profile-edit-modal',
  templateUrl: './profile-edit-modal.page.html',
  styleUrls: ['./profile-edit-modal.page.scss'],
})
export class ProfileEditModalPage implements OnInit {

  profileEdit : FormGroup;
  user:any;
  countries:Country[];
  filteredCountries: Observable<Country[]>;
  selectedcountry: any;
  firstNameError = "Invalid First Name";
  fieldRequired = FIELD_REQUIRED;
  emailError = INVALID_EMAIL_MESSAGE;
  lastNameError = "Invalid Last Name";
  phoneError = INVALID_PHONE_NUMBER;

  constructor(
    private formBuilder: FormBuilder,
    private modalCtrl:ModalController,
    private nav:NavParams,
    private http:HttpClient,
    private apiservice:ApiService,
    private storageService:StorageService,
    private utils:UtilitiesService
  ) {
    const EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    this.profileEdit = this.formBuilder.group({
      firstName: new FormControl('',[Validators.required, Validators.pattern("^[a-zA-Z. ]{3,}$")]),
      lastName:  new FormControl('',[Validators.required, Validators.pattern("^[a-zA-Z. ]{3,}$")]),
      email:  new FormControl('',[Validators.required, Validators.pattern(EMAILPATTERN)]),
      country:  new FormControl('',[Validators.required]),
      phone:  new FormControl('',[ Validators.minLength(8), Validators.maxLength(15), Validators.pattern('^[0-9]{8,15}$')]),
      address:  new FormControl(''),
    })


   }

  ngOnInit() {
    this.user = this.nav.get('user');
    this.profileEdit.patchValue({
      firstName:this.user.firstname,
      lastName: this.user.lastname,
      email: this.user.email,
      country: this.user.country,
      phone: this.user.phone,
      address: this.user.address,
    })
    this.fetchCountry();
  }

  fetchCountry(){
    console.log("user");
    this.http.get("assets/country/country.json").subscribe((res:any)=>{
      console.log(res);
      this.countries = res;
      this.country();
      this.selectedcountry=this.countries.find(c=> c.country=='United States');

    this.profileEdit.get('country').setValue(this.selectedcountry.country);
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
    this.filteredCountries = this.profileEdit.get('country').valueChanges.pipe(
      startWith(""),
      map(value => (typeof value === "string" ? value : value.name)),
      map(name => (name ? this._filter(name) : this.countries.slice()))
    );
  }

  updateProfile(){
if(this.profileEdit.status=='VALID'){
  var postdata={
    firstname:this.profileEdit.get('firstName').value,
    lastname:this.profileEdit.get('lastName').value,
    email:this.profileEdit.get('email').value,
    address:this.profileEdit.get('address').value,
    country:this.profileEdit.get('country').value,
  }
  this.apiservice.editProfile(postdata,this.user.id).subscribe((res) => {
console.log(res);
let token=  this.storageService.getJWTToken();
 this.storageService.setUser(res,token);
 this.apiservice.refreshHeader();
 this.modalCtrl.dismiss({
  'dismissed' : true
})

  })

}
else{
  if(this.profileEdit.value.firstName == '' || this.profileEdit.get('firstName').hasError('pattern')){
    this.utils.errorSnackBar("Please check first name");
  }
  else if(this.profileEdit.value.lastName == '' || this.profileEdit.get('lastName').hasError('pattern')){
    this.utils.errorSnackBar("Please check last name");
  }
  else if(this.profileEdit.value.country == '' ){
    this.utils.errorSnackBar("Please check country");
  }
}
  }

  dismiss(){
    this.modalCtrl.dismiss({
      'dismissed': true,
      cancel:'cancel'
    });
  }

}
