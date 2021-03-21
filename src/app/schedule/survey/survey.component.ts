import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NavController, Platform} from '@ionic/angular';
import {AssigneeModel} from '../../model/assignee.model';
import {UtilitiesService} from '../../utilities.service';
import {
  FIELD_REQUIRED,
  INVALID_EMAIL_MESSAGE,
  INVALID_NAME_MESSAGE,
  INVALID_PHONE_NUMBER,
  ScheduleFormEvent
} from '../../model/constants';
import {ApiService} from '../../api.service';
import {Subscription} from 'rxjs';
import {StorageService} from '../../storage.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SurveyDataModel} from '../../model/survey.model';
import {ErrorModel} from 'src/app/model/error.model';
import { AddressModel } from 'src/app/model/address.model';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss'],
})
export class SurveyComponent implements OnInit, OnDestroy {

  surveyForm: FormGroup;
  listOfAssignees: AssigneeModel[] = [];
  private subscription: Subscription;
  private addressSubscription: Subscription;

  nameError = INVALID_NAME_MESSAGE;
  emailError = INVALID_EMAIL_MESSAGE;
  phoneError = INVALID_PHONE_NUMBER;
  fieldRequired = FIELD_REQUIRED;

  surveyId = 0;
  private survey: SurveyDataModel;
  address: string;
  userData: any;

  GoogleAutocomplete: google.maps.places.AutocompleteService;
  autocompleteItems: any[];
  map: any;

  geoEncoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };

  geocoder = new google.maps.Geocoder();
  autoCompleteOff:boolean = false;
  isSelectSearchResult:boolean = false;


  constructor(
    private formBuilder: FormBuilder,
    private navController: NavController,
    private utilities: UtilitiesService,
    private platform: Platform,
    private apiService: ApiService,
    private storage: StorageService,
    private route: ActivatedRoute,
    private router:Router,
    private zone: NgZone,
    private nativeGeocoder: NativeGeocoder,
  ) {

    this.surveyId = +this.route.snapshot.paramMap.get('id');
    const NAMEPATTERN = /^[a-zA-Z. ]{3,}$/;
    const EMAILPATTERN = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const mydate: any = new Date().getTime();
    this.surveyForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.pattern(NAMEPATTERN)]),
      email: new FormControl('', [Validators.pattern(EMAILPATTERN)]),
      phonenumber: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(15), Validators.pattern('^[0-9]{8,15}$')]),
      jobtype: new FormControl('', [Validators.required]),
      surveydatetime: new FormControl(mydate),
      datetime: new FormControl(''),
      comments: new FormControl(''),
      address: new FormControl('', [Validators.required]),
      source: new FormControl('android', [Validators.required]),
      assignedto: new FormControl(null),
      createdby: new FormControl(this.storage.getUserID(), [Validators.required]),
      latitude: new FormControl(''),
      longitude: new FormControl(''),
      country: new FormControl(''),
      state: new FormControl(''),
      city: new FormControl(''),
      postalcode: new FormControl(''),
      status: new FormControl('created'),
      chatid: new FormControl(null),
      oldcommentid: new FormControl(''),
    });

    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocompleteItems = [];
  }


  ngOnInit() {
    this.userData = this.storage.getUser();
    // this.address= this.storage.getData();
    this.subscription = this.utilities.getScheduleFormEvent().subscribe((event) => {
      switch (event) {
        case ScheduleFormEvent.SAVE_SURVEY_FORM:
          this.saveSurvey();
          break;
        case ScheduleFormEvent.START_SURVEY:
          this.startSurvey();
          break;
      }
    });

    if (this.surveyId !== 0) {
      this.getSurveyDetails();
    }
    // else {
    //   this.addressSubscription = this.utilities.getAddressObservable().subscribe((address) => {
    //      // this.surveyForm.get('address').setValue("sdck");
    //      // this.surveyForm.get('latitude').setValue('1111111');
    //      // this.surveyForm.get('longitude').setValue('222222222');
    //      // this.surveyForm.get('country').setValue('India');
    //      // this.surveyForm.get('city').setValue('delhi');
    //     // this.surveyForm.get('state').setValue('up');
    //     //  this.surveyForm.get('postalcode').setValue(777777777);
    //    this.surveyForm.get('address').setValue(address.address);
    //    this.surveyForm.get('latitude').setValue(address.lat);
    //     this.surveyForm.get('longitude').setValue(address.long);
    //     this.surveyForm.get('country').setValue(address.country);
    //     this.surveyForm.get('city').setValue(address.city);
    //     this.surveyForm.get('state').setValue(address.state);
    //     this.surveyForm.get('postalcode').setValue(address.postalcode);
    //   }, (error) => {
    //     this.surveyForm.get('address').setValue('');
    //     this.surveyForm.get('latitude').setValue('');
    //     this.surveyForm.get('longitude').setValue('');
    //     this.surveyForm.get('country').setValue('');
    //     this.surveyForm.get('city').setValue('');
    //     this.surveyForm.get('state').setValue('');
    //     this.surveyForm.get('postalcode').setValue('');
    //   });
    // }

    this.getAssignees();
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
    if (this.surveyId === 0) {
      this.addressSubscription.unsubscribe();
    }
    // this.utilities.getScheduleFormEvent().unsubscribe();
  }

  startSurvey() {
    if (this.surveyForm.status === 'INVALID') {
      this.showInvalidFormAlert();
    } else {
      this.utilities.showLoading('Saving Survey').then(() => {
        this.surveyForm.get('status').setValue('surveyinprocess');
        if (this.surveyId !== 0) {
          this.surveyForm.get('chatid').setValue(this.survey.chatid);
          this.apiService.updateSurveyForm(this.surveyForm.value, this.surveyId).subscribe(survey => {
              this.utilities.hideLoading().then(() => {
                this.utilities.setDesignDetailsRefresh(true);
                this.navController.navigateForward('camera/' + survey.id + '/' + survey.jobtype + '/' + survey.city + '/' + survey.state + '/' + survey.latitude + '/' + survey.longitude);
              });
            },
            responseError => {
              this.utilities.hideLoading().then(() => {
                const error: ErrorModel = responseError.error;
                this.utilities.errorSnackBar(error.message);
              });
              //
            });
        } else {

          // if starting survey directly, assign the survey to yourself
          this.surveyForm.get('assignedto').setValue(this.storage.getUserID());
          this.surveyForm.get('status').setValue('surveyinprocess');
          console.log(this.surveyForm.value);
          this.surveyForm.get('chatid').setValue('survey' + "_" + new Date().getTime());
          this.apiService.saveSurvey(this.surveyForm.value).subscribe(survey => {
              this.utilities.hideLoading().then(() => {
                this.utilities.setDesignDetailsRefresh(true);
                this.navController.navigateForward('camera/' + survey.id + '/' + survey.jobtype + '/' + survey.city + '/' + survey.state + '/' + survey.latitude + '/' + survey.longitude);
              });
            },
            responseError => {
              this.utilities.hideLoading().then(() => {
                const error: ErrorModel = responseError.error;
                this.utilities.errorSnackBar(error.message);
              });
              //
            }
          );
        }
      });
    }
  }

  saveSurvey() {
    const invalid = [];
    const controls = this.surveyForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }

    }
    console.log(invalid);
    if (this.surveyForm.status === 'INVALID') {
      console.log(this.surveyForm.value);
      if (this.surveyForm.value.name == '') {
        this.utilities.errorSnackBar('Please enter name.');
      } else if (this.surveyForm.value.phonenumber == '') {
        this.utilities.errorSnackBar('Please enter phone number.');
      } else if (this.surveyForm.value.jobtype == '') {
        this.utilities.errorSnackBar('Please enter job type.');
      } else {
        this.utilities.errorSnackBar('Address not found. Make sure your location is on in device.');
      }
    } else {
      this.utilities.showLoading('Saving Survey').then(() => {
        this.surveyForm.get('datetime').setValue(this.utilities.formatDate(this.surveyForm.get('surveydatetime').value));
        if (this.surveyId !== 0) {
          this.surveyForm.get('chatid').setValue(this.survey.chatid);
          this.apiService.updateSurveyForm(this.surveyForm.value, this.surveyId).subscribe(survey => {
              this.utilities.hideLoading().then(() => {
                this.utilities.showSnackBar('Survey has been updated');
                this.utilities.setSurveyDetailsRefresh(true);
                // this.navController.navigateRoot('homepage/survey');
                this.navController.pop();
              });
            },
            responseError => {
              this.utilities.hideLoading().then(() => {
                const error: ErrorModel = responseError.error;
                this.utilities.errorSnackBar(error.message);
              });
              //
            });

        } else {
          if (this.surveyForm.get('assignedto').value !== ''
            && this.surveyForm.get('assignedto').value !== null
            && this.surveyForm.get('assignedto').value !== undefined
            && this.surveyForm.get('assignedto').value !== 0
          ) {
            this.surveyForm.get('status').setValue('surveyassigned');
          }
          console.log(this.surveyForm.value);
          this.surveyForm.get('chatid').setValue('survey' + "_" + new Date().getTime());
          this.apiService.saveSurvey(this.surveyForm.value).subscribe(survey => {
              this.utilities.showSuccessModal('Survey have been saved').then((modal) => {
                this.utilities.hideLoading();
                // this.navController.pop();
                modal.present();
                modal.onWillDismiss().then((dismissed) => {
                  this.utilities.sethomepageSurveyRefresh(true);
                  this.navController.navigateRoot('homepage/survey');

                });
                // });
              });

            },
            responseError => {
              this.utilities.hideLoading().then(() => {
                const error: ErrorModel = responseError.error;
                this.utilities.errorSnackBar(error.message);
              });
              //
            }
          );
        }
      });

    }
  }

  showInvalidFormAlert() {
    let error = '';
    Object.keys(this.surveyForm.controls).forEach((key: string) => {
      const control: AbstractControl = this.surveyForm.get(key);
      if (control.invalid) {
        if (error !== '') {
          error = error + '<br/>';
        }
        if (control.errors.required === true) {
          error = error + this.utilities.capitalizeWord(key) + ' is required';
        }
        if (control.errors.email === true) {
          error = error + 'Invalid email';
        }
        if (control.errors.error !== null && control.errors.error !== undefined) {
          error = error + control.errors.error;
        }
      }
    });
    console.log(this.surveyForm.value);
    this.utilities.showAlert(error);
  }

  getAssignees() {
    this.apiService.getSurveyors().subscribe(assignees => {
      this.listOfAssignees = [];
      assignees.forEach(item => this.listOfAssignees.push(item));
      console.log(this.listOfAssignees);
    });
  }

  getSurveyDetails() {
    this.utilities.showLoading('Getting Survey Details').then((success) => {
      this.apiService.getSurveyDetail(this.surveyId).subscribe((result) => {
        this.utilities.hideLoading().then(() => {
          this.survey = result;

          const date = new Date(this.survey.datetime);
          this.surveyForm.patchValue({
            name: this.survey.name,
            email: this.survey.email,
            jobtype: this.survey.jobtype,
            phonenumber: this.survey.phonenumber,
            surveydatetime: date.getTime(),
            datetime: date,
            comments: this.survey.comments == '' ? '' : this.survey.comments[0].message,
            address: this.survey.address,
            source: this.survey.source,
            createdby: this.survey.createdby.id,
            latitude: this.survey.latitude,
            longitude: this.survey.longitude,
            country: this.survey.country,
            state: this.survey.state,
            city: this.survey.city,
            postalcode: this.survey.postalcode,
            oldcommentid: this.survey.comments[0].id
          });
          if (this.survey.assignedto !== null && this.survey.assignedto !== undefined) {
            this.surveyForm.patchValue({
              assignedto: this.survey.assignedto.id,
              status: 'surveyassigned'
            });
          }
          this.utilities.setStaticAddress(this.survey.address);

        });
      }, (error) => {
        this.utilities.hideLoading();
      });
    });
  }

  assignedTo(surveyData) {

    let postData = {
      assignedto: this.userData.id,
      status: "surveyassigned"
    };
    this.apiService.updateSurveyForm(postData, surveyData.id).subscribe(res => {
      console.log(res);
      this.router.navigate(['/camera/' + surveyData.id + '/' + surveyData.jobtype + '/' + surveyData.city + '/' + surveyData.state + '/' + surveyData.latitude + '/' + surveyData.longitude]);
    })


  }

    /* FOR SEARCH SHIPPING ADDRESS */
    updateSearchResults(event) {
      //this.autoCompleteOff = true;
      console.log(this.autoCompleteOff);
      if(this.surveyId == 0){
      const input = event.detail.value;
      console.log(input)
      if (input === '') {
        this.autocompleteItems = [];
        return;
      }
      this.GoogleAutocomplete.getPlacePredictions({ input, componentRestrictions: {
        country: 'us'
      }  },
        (predictions, status) => {
          this.autocompleteItems = [];
          this.zone.run(() => {
            predictions.forEach((prediction) => {
              this.autocompleteItems.push(prediction);
            });
          });
        });
      }
    }

    forAutoComplete(e){
      console.log("hello",e);
      this.autoCompleteOff = true;

    }

  //   /* FOR SELECT SEARCH SHIPPING ADDRESS*/
    selectSearchResult(item) {
      console.log(item);
      this.isSelectSearchResult = true;
      this.geocoder.geocode({
        placeId: item.place_id
      }, (responses, status) => {
        console.log('respo', responses);
        this.getGeoEncoder(responses[0].geometry.location.lat(), responses[0].geometry.location.lng(), responses[0].formatted_address);
      });
      this.autocompleteItems = []
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

      this.utilities.showLoading('Loading').then(() => {
        this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geoEncoderOptions)
          .then((result: NativeGeocoderResult[]) => {
            console.log(result)
            let add = '';
            if (formattedAddress === '') {
              add = this.generateAddress(result[0]);
            } else {
              add = formattedAddress;
            }
            this.utilities.hideLoading().then(() => {
              console.log('resu', result);
              const address: AddressModel = {
                address: add,
                lat: latitude,
                long: longitude,
                country: result[0].countryName,
                state: result[0].administrativeArea,
                city: result[0].locality,
                postalcode: result[0].postalCode
              };
              this.utilities.setAddress(address);
              this.addressValue();
              //this.goBack();
            });

          })
          .catch((error: any) => {
            this.utilities.hideLoading().then(() => {
              alert('Error getting location' + JSON.stringify(error));
            });

          });
      });
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
      console.log("hello");
      this.autocompleteItems = [];
      console.log(this.autocompleteItems)
    }

    addressValue(){
      // }
      this.addressSubscription = this.utilities.getAddressObservable().subscribe((address) => {
        console.log(address,">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

          // this.firstFormGroup.get('address').setValue('124/345');
          // this.firstFormGroup.get('latitude').setValue('24.553333');
          // this.firstFormGroup.get('longitude').setValue('80.5555555555');
          // this.firstFormGroup.get('country').setValue('india');
          // this.firstFormGroup.get('city').setValue('Lucknow');
          // this.firstFormGroup.get('state').setValue('UP');
          // this.firstFormGroup.get('postalcode').setValue(3232343);
         this.surveyForm.get('address').setValue(address.address);
           this.surveyForm.get('latitude').setValue(address.lat);
           this.surveyForm.get('longitude').setValue(address.long);
           this.surveyForm.get('country').setValue(address.country);
         this.surveyForm.get('city').setValue(address.city);
           this.surveyForm.get('state').setValue(address.state);
           this.surveyForm.get('postalcode').setValue(address.postalcode);
      }, (error) => {
        this.surveyForm.get('address').setValue('');
        this.surveyForm.get('latitude').setValue(null);
        this.surveyForm.get('longitude').setValue(null);
        this.surveyForm.get('country').setValue('');
        this.surveyForm.get('city').setValue('');
        this.surveyForm.get('state').setValue('');
        this.surveyForm.get('postalcode').setValue(null);
      });
      // this.firstFormGroup.patchValue({
      //   createdby: this.storage.getUserID()
      // });
   // this.autocompleteItems = [];
      this.autoCompleteOff = false;
      console.log(this.autoCompleteOff);
      //this.getSolarMake();

      }

      onBlur()
      {
        setTimeout(() => {
          this.autocompleteItems = [];
        }, 100);
      }
}
