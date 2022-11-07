import { Component, OnInit,NgZone,OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Observable , Subscription } from 'rxjs';
import { INVALID_EMAIL_MESSAGE, FIELD_REQUIRED, INVALID_PHONE_NUMBER, INVALID_COMPANY_NAME } from 'src/app/models/constants';
import { ApiService } from 'src/app/services/api/api.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { ADDRESSFORMAT , MAILFORMAT , NAME  , COMPANYFORMAT } from "src/app/services/constants";
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@awesome-cordova-plugins/native-geocoder/ngx';
import { AddressModel } from 'src/app/models/address.model';
import { map, startWith } from 'rxjs/operators';


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
  public enableDisable: boolean = false;

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
  companyError = INVALID_COMPANY_NAME;

  GoogleAutocomplete: google.maps.places.AutocompleteService;
  autocompleteItems: any[];
  map: any;
  fieldDisabled = false;

  geoEncoderOptions: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
  };

  geocoder = new google.maps.Geocoder();
  autoCompleteOff: boolean = false;
  // isSelectSearchResult: boolean = false;
  isSelectSearchResult: boolean = true;
  private addressSubscription: Subscription;
  userlogo: any;
  EditedValues: any;

  constructor(
    private formBuilder: FormBuilder,
    private modalCtrl:ModalController,
    private nav:NavParams,
    private http:HttpClient,
    private apiservice:ApiService,
    private storageService:StorageService,
    private utils:UtilitiesService, private zone: NgZone,
    private nativeGeocoder: NativeGeocoder,
  ) {
    this.profileEdit = this.formBuilder.group({
      firstname: new FormControl('',[Validators.required, Validators.pattern(NAME)]),
      lastname:  new FormControl('',[Validators.required, Validators.pattern(NAME)]),
      // email:  new FormControl('',[Validators.required, Validators.pattern(MAILFORMAT)]),
      // country:  new FormControl('',[Validators.required]),
      phone:  new FormControl('',[ Validators.minLength(8), Validators.maxLength(15), Validators.pattern('^[0-9]{8,15}$')]),
      address:  new FormControl('',[Validators.required,Validators.pattern(ADDRESSFORMAT)]),
      // company: new FormControl('',[Validators.pattern(COMPANYFORMAT)]),
      // latitude: new FormControl(null),
      //       longitude: new FormControl(null),
            
      //       state: new FormControl(''),
      //       city: new FormControl(''),
      //       postalcode: new FormControl(null),
    })

    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocompleteItems = [];
   }

  ngOnInit() {
    this.user = this.nav.get('user');
    console.log(this.user)
    this.profileEdit.patchValue({
      firstname:this.user.userprofile.firstname,
      lastname: this.user.userprofile.lastname,
      // email: this.user.email,
      // country: this.user.userprofile.country,
      phone: this.user.userprofile.phone,
      address: this.user.userprofile.address,
      // company:this.user.userprofile.company
    })
    
    this.fetchCountry();
  }

  fetchCountry(){

    this.http.get("assets/country/country.json").subscribe((res:any)=>{

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



getDirtyValues(profileEdit) {
  const dirtyValues = {};
  Object.keys(profileEdit.controls).forEach(c => {
    const currentControl = profileEdit.get(c);

    if (currentControl.dirty) {
      dirtyValues[c] = currentControl.value;
    }
  });
  console.log(dirtyValues)
  this.EditedValues = dirtyValues
  console.log(this.EditedValues)
   // return dirtyValues;
}

  updateProfile(){
    this.getDirtyValues(this.profileEdit);

    let userId = this.user.userprofile.id
if(this.EditedValues){

  console.log("in if",this.EditedValues)
  var postdata={ 
    'data': this.EditedValues
}

// console.log("this.postdata",postdata);
  // console.log(userId)
  this.apiservice.editProfile(postdata,userId).subscribe((res) => {
   console.log("Edit profile",res);
   var userprofile = res['userprofile']
   console.log(userprofile)
   let newfirstname = userprofile.firstname; 
   console.log('fisrtname',newfirstname)
   let newlastname = userprofile.lastname; 
   console.log('lastname',newlastname)
   let newAddress = userprofile.address
   console.log('newAddress',newAddress)
   let newPhone = userprofile.phone
   console.log('newAddress',newPhone)
   let user = this.storageService.getUser()
      console.log("user",user)
      user.userprofile.firstname = newfirstname;
      user.userprofile.lastname = newlastname;
      user.userprofile.address = newAddress;
      user.userprofile.phone = newPhone;
      let token=  this.storageService.getJWTToken();
       
       this.storageService.setUser(user,token);

//  this.storageService.setUser(token);
//   let old = this.user;
//   Object.keys(userprofile).forEach(function (key) {
//     var val = userprofile[key];
//      console.log(val);
//      const o3 = {...old, val};
//  console.log(o3);
//      // use val
//  });
  // const newUser = {...old , userprofile}
  // console.log(newUser) 
 this.apiservice.refreshHeader();
 this.modalCtrl.dismiss({
  'dismissed' : true
})

  })

}
else{
  if(this.profileEdit.value.firstname == '' || this.profileEdit.get('firstname').hasError('pattern')){
    this.utils.errorSnackBar("Please check first name");
  }
  else if(this.profileEdit.value.lastname == '' || this.profileEdit.get('lastname').hasError('pattern')){
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




  
  ionViewDidEnter() {
    this.autocompleteItems = [];
}

/* FOR SEARCH SHIPPING ADDRESS */
updateSearchResults(event) {
    //this.autoCompleteOff = true;
    const input = event.detail.value;

    if (input === '') {
        this.autocompleteItems = [];
        return;
    }
    this.GoogleAutocomplete.getPlacePredictions({
        input, componentRestrictions: {
            country: 'us'
        }
    }, (predictions, status) => {
        this.autocompleteItems = [];
        this.zone.run(() => {
            predictions.forEach((prediction) => {
                this.autocompleteItems.push(prediction);
            });
        });
    });

    console.log('this.autocompleteItems', this.autocompleteItems);
    
}

forAutoComplete(e) {
    this.autoCompleteOff = true;
    this.isSelectSearchResult = false;

}

//   /* FOR SELECT SEARCH SHIPPING ADDRESS*/
selectSearchResult(item) {
    this.utils.showLoading('Loading').then(() => {
        this.isSelectSearchResult = true;
        this.geocoder.geocode({
            placeId: item.place_id
        }, (responses, status) => {

            this.getGeoEncoder(responses[0].geometry.location.lat(), responses[0].geometry.location.lng(), responses[0].formatted_address);
        });
        this.autocompleteItems = []
    })
}

getGeoEncoder(latitude, longitude, formattedAddress) {

    // this.utilities.showLoading('Loading').then(() => {
    this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geoEncoderOptions)
        .then((result: NativeGeocoderResult[]) => {

            let add = '';
            if (formattedAddress === '') {
                add = this.generateAddress(result[0]);
            } else {
                add = formattedAddress;
            }
            this.utils.hideLoading().then(() => {

                const address: AddressModel = {
                    address: add,
                    lat: latitude,
                    long: longitude,
                    country: result[0].countryName,
                    state: result[0].administrativeArea,
                    city: result[0].locality,
                    postalcode: result[0].postalCode
                };
                this.utils.setAddress(address);
                this.addressValue();
                //this.goBack();
            });

        })
        .catch((error: any) => {
            this.utils.hideLoading().then(() => {
                alert('Error getting location' + JSON.stringify(error));
            });

        });
    //  });
}

generateAddress(addressObj) {
    const obj = [];
    let address = '';
    for (const key in addressObj) {
        obj.push(addressObj[key]);
    }
    obj.reverse();
    for (const val in obj) {
        if (obj[val].length) {
            address += obj[val] + ', ';
        }
    }
    return address.slice(0, -2);
}

onCancel() {

    this.autocompleteItems = [];

}

addressValue() {
    // }
    this.addressSubscription = this.utils.getAddressObservable().subscribe((address) => {


        // this.firstFormGroup.get('address').setValue('124/345');
        // this.firstFormGroup.get('latitude').setValue('24.553333');
        // this.firstFormGroup.get('longitude').setValue('80.5555555555');
        // this.firstFormGroup.get('country').setValue('india');
        // this.firstFormGroup.get('city').setValue('Lucknow');
        // this.firstFormGroup.get('state').setValue('UP');
        // this.firstFormGroup.get('postalcode').setValue(3232343);
        this.profileEdit.get('address').setValue(address.address);
        this.profileEdit.get('latitude').setValue(address.lat);
        this.profileEdit.get('longitude').setValue(address.long);
        this.profileEdit.get('country').setValue(address.country);
        this.profileEdit.get('city').setValue(address.city);
        this.profileEdit.get('state').setValue(address.state);
        this.profileEdit.get('postalcode').setValue(address.postalcode);
    }, (error) => {
        this.profileEdit.get('address').setValue('');
        this.profileEdit.get('latitude').setValue(null);
        this.profileEdit.get('longitude').setValue(null);
        this.profileEdit.get('country').setValue('');
        this.profileEdit.get('city').setValue('');
        this.profileEdit.get('state').setValue('');
        this.profileEdit.get('postalcode').setValue(null);
    });

    this.autoCompleteOff = false;



}

onBlur() {
    setTimeout(() => {
        this.autocompleteItems = [];
    }, 100);
}

NumbersOnly(event): boolean {
  let charCode = event.which ? event.which : event.keyCode;
  if (charCode < 48 || charCode > 57) {
    event.preventDefault();
    return false;
  } else {
    return true;
  }
}

}
