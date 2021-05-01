import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController, Platform } from '@ionic/angular';
import { AssigneeModel } from '../../model/assignee.model';
import { UtilitiesService } from '../../utilities.service';
import {
  FIELD_REQUIRED,
  INVALID_EMAIL_MESSAGE,
  INVALID_NAME_MESSAGE,
  INVALID_PHONE_NUMBER,
  ScheduleFormEvent
} from '../../model/constants';
import { ApiService } from '../../api.service';
import { Subscription } from 'rxjs';
import { StorageService } from '../../storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SurveyDataModel } from '../../model/survey.model';
import { ErrorModel } from 'src/app/model/error.model';
import { AddressModel } from 'src/app/model/address.model';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

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
  fieldDisabled = false;

  geoEncoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };

  geocoder = new google.maps.Geocoder();
  autoCompleteOff: boolean = false;
  isSelectSearchResult: boolean = false;
  surveydatapresent:boolean = false;
  data:any;
  surveydata:any;
  browser: any;

  constructor(
    private formBuilder: FormBuilder,
    private navController: NavController,
    private utilities: UtilitiesService,
    private platform: Platform,
    private apiService: ApiService,
    private storage: StorageService,
    private route: ActivatedRoute,
    private router: Router,
    private zone: NgZone,
    private nativeGeocoder: NativeGeocoder,
    private iab: InAppBrowser,
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
      projecttype: new FormControl('', [Validators.required]),
      surveydatetime: new FormControl(mydate),
      datetime: new FormControl(''),
      comments: new FormControl(''),
      address: new FormControl('', [Validators.required]),
      source: new FormControl(this.utilities.checkPlatform(), [Validators.required]),
      assignedto: new FormControl(null),
      createdby: new FormControl(this.storage.getUserID(), [Validators.required]),
      latitude: new FormControl(null),
      longitude: new FormControl(null),
      country: new FormControl(''),
      state: new FormControl(''),
      city: new FormControl(''),
      postalcode: new FormControl(null),
      status: new FormControl('created'),
      chatid: new FormControl(null),
      oldcommentid: new FormControl(''),
      prelimdesignsurvey : new FormControl(null),
      isdesigndelivered : new FormControl(null)
    });
    this.surveyForm.get('jobtype').setValue('pv');

    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocompleteItems = [];
  }


  ngOnInit() {
    this.surveydatapresent = false
    this.data = this.router.getCurrentNavigation().extras.state;
    console.log(this.data);
    if (this.data != undefined) {
      this.surveydata = this.data.productdetails.queryParams.designData;
      console.log(this.surveydata)
     // this.tabsDisabled = this.data.productdetails.queryParams.tabsDisabled;
     // this.nonEditableField = this.data.productdetails.queryParams.nonEditableField;

      this.surveydatapresent = true


    }
    this.fieldDisabled = false;
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
    } else if (this.surveydatapresent) {
      this.getsurveydata();
    }
    this.getAssignees();
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
    // if (this.surveyId === 0) {
    //   this.addressSubscription.unsubscribe();
    // }
    // this.utilities.getScheduleFormEvent().unsubscribe();
  }

  startSurvey() {
    if (this.surveyForm.status === 'INVALID') {
      this.showInvalidFormAlert();
    } else {
      this.utilities.showLoading('Saving Survey').then(() => {
        // if(this.userData.role.type=== 'surveyors'){
        //   this.surveyForm.get('status').setValue('surveyassigned');
        // }else{
        //   this.surveyForm.get('status').setValue('surveyinprocess');
        // }
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
          // if(this.userData.role.type === 'surveyors'){
          this.surveyForm.get('datetime').setValue(this.utilities.formatDate(this.surveyForm.get('surveydatetime').value));
          this.surveyForm.get('status').setValue('surveyinprocess');
          // }else{
          this.surveyForm.get('status').setValue('surveyinprocess');
          // }

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

  getsurveydata() {

    this.surveyForm.patchValue({
      prelimdesignsurvey : this.surveydata.id,
      name: this.surveydata.name,
      email: this.surveydata.email,

      address: this.surveydata.address,
      phonenumber: this.surveydata.phonenumber,
      createdby: this.surveydata.createdby.id,
     // architecturaldesign: this.surveydata.architecturaldesign,
      jobtype: this.surveydata.formattedjobtype,
      projecttype: this.surveydata.projecttype,
      latitude: this.surveydata.latitude,
      longitude: this.surveydata.longitude,
      country: this.surveydata.country,
      state: this.surveydata.state,
      city: this.surveydata.city,
      postalcode: this.surveydata.postalCode,
      isdesigndelivered:true
     // issurveycompleted: true,
      //attachments:this.design.attachments,

     // attachments: this.surveydata.attachments,

    });
    this.surveyForm.get("jobtype").setValue("pv");
    this.utilities.setStaticAddress(this.surveydata.address);
    if (this.surveyForm.get('email').value == '') {
      this.fieldDisabled = false;
    } else {
      this.fieldDisabled = true;
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

    if (this.surveyForm.status === 'INVALID') {

      if (this.surveyForm.value.name == '') {
        this.utilities.errorSnackBar('Please enter name.');
      } else if (this.surveyForm.value.phonenumber == '') {
        this.utilities.errorSnackBar('Please enter phone number.');
      } else if (this.surveyForm.value.jobtype == '') {
        this.utilities.errorSnackBar('Please enter job type.');
      }
      else if (this.surveyForm.value.projecttype == '') {
        this.utilities.errorSnackBar('Please fill the project type.');
      } else {
        this.utilities.errorSnackBar('Address not found. Make sure your location is on in device.');
      }
      return;
    } else {
      this.utilities.showLoading('Saving Survey').then(() => {
        this.surveyForm.get('datetime').setValue(this.utilities.formatDate(this.surveyForm.get('surveydatetime').value));
        if (this.userData.role.type === 'surveyors') {
          this.surveyForm.get('assignedto').setValue(this.storage.getUserID());
          this.surveyForm.get('status').setValue('surveyassigned');
        }
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

          this.surveyForm.get('chatid').setValue('survey' + "_" + new Date().getTime());
          this.apiService.saveSurvey(this.surveyForm.value).subscribe(survey => {
            this.utilities.showSuccessModal('Survey have been saved').then((modal) => {
              this.utilities.hideLoading();
              // this.navController.pop();
              modal.present();
              modal.onWillDismiss().then((dismissed) => {
                this.utilities.sethomepageSurveyRefresh(true);
                if (this.userData.role.type === 'surveyors') {
                  this.navController.navigateRoot('surveyoroverview/newsurveys');
                } else {
                  this.navController.navigateRoot('homepage/survey');
                }

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

    this.utilities.showAlert(error);
  }

  getAssignees() {
    this.apiService.getSurveyors().subscribe(assignees => {
      this.listOfAssignees = [];
      assignees.forEach(item => this.listOfAssignees.push(item));

    });
  }

  getSurveyDetails() {
    this.utilities.showLoading('Getting Survey Details').then((success) => {
      this.apiService.getSurveyDetail(this.surveyId).subscribe((result) => {
        this.utilities.hideLoading().then(() => {
          this.survey = result;
          this.fieldDisabled = true;
          var date = new Date(this.survey.datetime);
          var userTimezoneOffset = date.getTimezoneOffset();
         date= new Date(userTimezoneOffset - date.getTime() );
          console.log(date)
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
            projecttype: this.survey.projecttype,
            country: this.survey.country,
            state: this.survey.state,
            city: this.survey.city,
            postalcode: this.survey.postalcode,
            oldcommentid: this.survey.comments == '' ? '' : this.survey.comments[0].id
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

      this.router.navigate(['/camera/' + surveyData.id + '/' + surveyData.jobtype + '/' + surveyData.city + '/' + surveyData.state + '/' + surveyData.latitude + '/' + surveyData.longitude]);
    })


  }

  ionViewDidEnter() {
    this.autocompleteItems=[];
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
    this.utilities.showLoading('Loading').then(() => {
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
        this.utilities.hideLoading().then(() => {

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
    this.addressSubscription = this.utilities.getAddressObservable().subscribe((address) => {


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

    this.autoCompleteOff = false;



  }

  onBlur() {
    setTimeout(() => {
      this.autocompleteItems = [];
    }, 100);
  }

  // showurl(i){
  //     this.browser = this.iab.create(this.surveydata.prelimdesign[i].url,'_system', 'location=yes,hardwareback=yes,hidden=yes');

  // }
}
