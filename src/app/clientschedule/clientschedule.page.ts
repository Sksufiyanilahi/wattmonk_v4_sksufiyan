import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { ApiService } from '../api.service';
import { AssigneeModel } from '../model/assignee.model';
import { FIELD_REQUIRED, INVALID_ANNUAL_UNIT, INVALID_EMAIL_MESSAGE, INVALID_NAME_MESSAGE, INVALID_TILT_FOR_GROUND_MOUNT, INVALID_PHONE_NUMBER, ScheduleFormEvent, INVALID_MODULE_AND_INVERTER, INVALID_COMPANY_NAME, INVALID_ADDRESS, INVALID_REGISTRATION_NUMBER } from '../model/constants';
import { DesginDataModel } from '../model/design.model';

import { Modulemake } from '../model/solar-made.model';
import { StorageService } from '../storage.service';
import { UtilitiesService } from '../utilities.service';
import { map, startWith } from "rxjs/operators";
import { ErrorModel } from '../model/error.model';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AddressModel } from '../model/address.model';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { CometChat } from '@cometchat-pro/cordova-ionic-chat';
import { NetworkdetectService } from '../networkdetect.service';
import { Clients } from '../model/clients.model';
import { MixpanelService } from '../utilities/mixpanel.service';
import { User } from '../model/user.model';
import { ROLES } from '../contants';
import { HttpClient } from '@angular/common/http';

export interface Country {
  country: string;
  calling_code: string;
}

@Component({
  selector: 'app-clientschedule',
  templateUrl: './clientschedule.page.html',
  styleUrls: ['./clientschedule.page.scss'],
})

export class ClientschedulePage implements OnInit {

  firstFormGroup: FormGroup;
  user: User;
  //secondFormGroup:FormGroup;

  private addressSubscription: Subscription;

  fieldRequired = FIELD_REQUIRED;
  firstnameError = INVALID_NAME_MESSAGE;
  lastnameError = INVALID_NAME_MESSAGE;
  emailError = INVALID_EMAIL_MESSAGE;
  contactError = INVALID_PHONE_NUMBER;
  addressError = INVALID_ADDRESS;
  registrationError = INVALID_REGISTRATION_NUMBER;

  GoogleAutocomplete: google.maps.places.AutocompleteService;
  autocompleteItems: any[];
  map: any;

  geocoder = new google.maps.Geocoder();
  autoCompleteOff: boolean = false;

  // Geocoder configuration
  geoEncoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };
  isSelectSearchResult: boolean = false;
  designData: any;
  id: number;
  design: any;
  isEditMode: boolean = false;
  countries:Country[];
  filteredCountries: Observable<Country[]>;
  selectedcountry: any;

  constructor(private formBuilder: FormBuilder,
    private apiservices: ApiService,
    private utils: UtilitiesService,
    private storageService: StorageService,
    private route: ActivatedRoute,
    private network: NetworkdetectService,
    private navController: NavController,
    private router: Router,
    private zone: NgZone,
    private nativeGeocoder: NativeGeocoder,
    private http:HttpClient,
  ) {
    const MAILFORMAT = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z]+(?:\.[a-zA-Z]+)*$/;
    this.firstFormGroup = this.formBuilder.group({
      firstname: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z. ]{3,}$")]),
      lastname: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z. ]{3,}$")]),
      email: new FormControl('', [Validators.required, Validators.pattern(MAILFORMAT)]),
      address: new FormControl(null),
      contactnumber: new FormControl(null),
      lic: new FormControl(null),
      // countrycode : new FormControl(null), 
      // //company : new FormControl(null),
      password: new FormControl(null),
      resetPasswordToken: new FormControl(null),
      source: new FormControl("android"),
      username: new FormControl(null),
      confirmed: new FormControl(true),
      isdefaultpassword: new FormControl(true),
      provider: new FormControl("local"),
      parent: new FormControl(null),
      company: new FormControl('', [Validators.required]),//user.company,
      addedby: new FormControl(this.storageService.getUser().id),//.currentUserValue.user.id
      country:new FormControl('',[Validators.required])
    })

    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocompleteItems = [];
    this.designData = this.router.getCurrentNavigation().extras.state;
    this.id = this.designData.productdetails.queryParams.id;
  }
  ngOnInit() {
    this.user = this.storageService.getUser();
    console.log(this.user);
    this.fetchCountry();
    if (this.id !== 0) {
      this.isEditMode = true;
      setTimeout(() => {
        this.getclientDetails();
      }, 1000)

    }
  }

  fetchCountry(){

    this.http.get("assets/country/country.json").subscribe((res:any)=>{

      this.countries = res;
      this.country();
      this.selectedcountry=this.countries.find(c=> c.country=='United States');

    this.firstFormGroup.get('country').setValue(this.selectedcountry.country);
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
    this.filteredCountries = this.firstFormGroup.get('country').valueChanges.pipe(
      startWith(""),
      map(value => (typeof value === "string" ? value : value.name)),
      map(name => (name ? this._filter(name) : this.countries.slice()))
    );
  }

  getclientDetails() {
    this.utils.showLoading('Getting Client Details').then(() => {
      this.apiservices.getContractorsData(this.id).subscribe(async (result) => {
        await this.utils.hideLoading().then(() => {
          this.design = result;
          console.log(result)
          // this.fieldDisabled = true;
          // this.attachmentData = this.design.attachments;
          // this.architecturalData = this.design.architecturaldesign;

          this.firstFormGroup.patchValue({
            firstname: this.design.firstname,
            lastname: this.design.lastname,
            email: this.design.email,
            address: this.design.address,
            contactnumber: this.design.phone,
            company: this.design.company,
            createdby: this.design.createdby,
            lic: this.design.registrationnumber,
            // comments: this.design.comments == '' ? '' : this.design.comments[0].message,
            latitude: this.design.latitude,
            longitude: this.design.longitude,
            country: this.design.country,
            state: this.design.state,
            city: this.design.city,
            postalcode: this.design.postalcode,
          });

          // this.oldcommentid = this.design.comments == '' ? '' : this.design.comments[0].id;

          // this.utils.setStaticAddress(this.design.address);
          // //  this.attachmentData=this.design.attachments.length==1 ? this.design.attachments[0].name + this.design.attachments[0].ext : this.design.attachments.length;
          // if (this.design.assignedto !== null && this.design.assignedto !== undefined) {
          //   this.desginForm.patchValue({
          //     assignedto: this.design.assignedto.id
          //   });
          // }

          // setTimeout(() => {
          //   this.fetchModuleMakesData();
          //   this.fetchInverterMakesData();
          //   if(this.isEditMode){

          //     this.loadModuleModelsData();
          //     this.loadInverterModelsData();

          //   }

          // });
          // setTimeout(()=>{
          //   this.fetchModuleMakesData();
          //   this.fetchInverterMakesData();
          // },500)
        });

      }, (error) => {
        this.utils.hideLoading();
      });
    });
  }


  submitForm(e) {
    // let data={firstname:this.firstFormGroup.get('firstname').value,
    // lastname:this.firstFormGroup.get('lastname').value,
    // firstname:this.firstFormGroup.get('firstname').value}
    var reset = this.utils.randomPass();
    if (this.firstFormGroup.status === 'VALID') {
      this.utils.showLoading("Saving").then(() => {
        var parentid = 0;
        if (this.user.role.id == ROLES.SuperAdmin || this.user.role.id == ROLES.ContractorSuperAdmin) {
          parentid = this.user.id;
        }
        else {
          parentid = this.user.parent.id;
        }
        console.log(parentid);
        if (this.id == 0) {
          //  this.firstFormGroup.get('password').setValue(reset);
          //  this.firstFormGroup.get('resetPasswordToken').setValue(reset);
          //  this.firstFormGroup.get('username').setValue(this.firstFormGroup.get('email').value);
          const postData = {
            firstname: this.firstFormGroup.get('firstname').value,
            lastname: this.firstFormGroup.get('lastname').value,
            email: this.firstFormGroup.get('email').value,
            address: this.firstFormGroup.get('address').value,
            phone: this.firstFormGroup.get('contactnumber').value,
            registrationnumber: this.firstFormGroup.get('lic').value,
            country:this.firstFormGroup.get('country').value,
            password: reset,
            resetPasswordToken: reset,
            username: this.firstFormGroup.get('email').value,
            source: this.firstFormGroup.get('source').value,
            confirmed: this.firstFormGroup.get('confirmed').value,
            isdefaultpassword: this.firstFormGroup.get('isdefaultpassword').value,
            provider: this.firstFormGroup.get('provider').value,
            parent: parentid,
            company: this.firstFormGroup.get('company').value,
            addedby: this.firstFormGroup.get('addedby').value
          }
          this.apiservices.addContractor(postData).subscribe(response => {
            console.log(response)
            this.utils.hideLoading().then(() => {
              //})


              setTimeout(() => {
                this.utils.hideLoading().then(() => {
                  //this.createChatGroup(response);
                  // this.router.navigate(['/client'])
                  this.utils.showSnackBar('Client have been Added');
                  // this.utils.showSnackBar('Design have been saved');
                  this.utils.setHomepageDesignRefresh(true);

                });
              }, 2000)
            })
          },
            responseError => {
              this.utils.hideLoading().then(() => {
                const error: ErrorModel = responseError.error;
                this.utils.errorSnackBar(error.message[0].messages[0].message);
              });
            })
        }
        else if (this.id != 0) {
          const postData = {
            firstname: this.firstFormGroup.get('firstname').value,
            lastname: this.firstFormGroup.get('lastname').value,
            email: this.firstFormGroup.get('email').value,
            address: this.firstFormGroup.get('address').value,
            phone: this.firstFormGroup.get('contactnumber').value,
            registrationnumber: this.firstFormGroup.get('lic').value,
            company: this.firstFormGroup.get('company').value,
            country:this.firstFormGroup.get('country').value
          }

          this.apiservices.updateContractorsData(this.id,postData).subscribe(response => {
            console.log(response)
            this.utils.hideLoading().then(() => {
              //})


              setTimeout(() => {
                this.utils.hideLoading().then(() => {
                  //this.createChatGroup(response);
                   this.router.navigate(['/clienthomepage'])
                  this.utils.showSnackBar('Client have been updated');
                  // this.utils.showSnackBar('Design have been saved');
                  this.utils.setHomepageDesignRefresh(true);

                });
              }, 2000)
            })
          },
            responseError => {
              this.utils.hideLoading().then(() => {
                const error: ErrorModel = responseError.error;
                this.utils.errorSnackBar(error.message[0].messages[0].message);
              });
            })

        }
      })
    }


    else {
      if (this.firstFormGroup.value.firstname == '' || this.firstFormGroup.get('firstname').hasError('pattern')) {
        this.utils.errorSnackBar("Please check the field first name")
      }
      else if (this.firstFormGroup.value.lastname == '' || this.firstFormGroup.get('lastname').hasError('pattern')) {
        this.utils.errorSnackBar("Please check the field last name")
      }
      else if (this.firstFormGroup.value.email == '' || this.firstFormGroup.get('email').hasError('pattern')) {
        this.utils.errorSnackBar("Please check the field email");
      }


    }
  }

  //// For Address
  /* FOR SEARCH SHIPPING ADDRESS */
  updateSearchResults(event) {
    //this.autoCompleteOff = true;

    const input = event.detail.value;
    console.log(input)
    if (input === '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({
      input, componentRestrictions: {
        country: 'us'
      }
    },
      (predictions, status) => {
        this.autocompleteItems = [];
        this.zone.run(() => {
          predictions.forEach((prediction) => {
            this.autocompleteItems.push(prediction);
          });
        });
      });
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

    // // TODO remove later
    // const address: AddressModel = {
    //   address: 'Vasant Kunj, New Delhi, Delhi',
    //   lat: 28.5200491,
    //   long: 77.158687,
    //   country: 'India',
    //   state: 'Delhi',
    //   city: 'New Delhi',
    //   postalcode: '110070'
    // };
    // this.utilities.setAddress(address);
    // this.goBack();
    // return;

    // this.utils.showLoading('Loading').then(() => {
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
    // });
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
      this.firstFormGroup.get('address').setValue(address.address);
      this.firstFormGroup.get('latitude').setValue(address.lat);
      this.firstFormGroup.get('longitude').setValue(address.long);
      this.firstFormGroup.get('country').setValue(address.country);
      this.firstFormGroup.get('city').setValue(address.city);
      this.firstFormGroup.get('state').setValue(address.state);
      this.firstFormGroup.get('postalcode').setValue(address.postalcode);
    }, (error) => {
      this.firstFormGroup.get('address').setValue('');
      this.firstFormGroup.get('latitude').setValue(null);
      this.firstFormGroup.get('longitude').setValue(null);
      this.firstFormGroup.get('country').setValue('');
      this.firstFormGroup.get('city').setValue('');
      this.firstFormGroup.get('state').setValue('');
      this.firstFormGroup.get('postalcode').setValue(null);
    });
    // this.firstFormGroup.patchValue({
    //   createdby: this.storage.getUserID()
    // });
    // this.autocompleteItems = [];
    this.autoCompleteOff = false;

    //this.getSolarMake();

  }

  onBlur() {
    setTimeout(() => {
      this.autocompleteItems = [];
    }, 100);
  }

  goBack() {
    // this.mixpanelService.track("TEAM_PAGE_CLOSE", {
    // });
    this.navController.pop();

  }





  //  else{
  //   if(this.firstFormGroup.value.name == '' || this.firstFormGroup.get('name').hasError('pattern')){
  //     this.utils.errorSnackBar("Please check the field name")
  // }
  //   else if(this.firstFormGroup.value.email == '' || this.firstFormGroup.get('email').hasError('pattern')){
  //     this.utils.errorSnackBar("Please check the field email");
  //   }


}


