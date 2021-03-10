
import { Component, NgZone, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { AddressModel } from '../model/address.model';
import { StorageService } from '../storage.service';
import { UtilitiesService } from '../utilities.service';
import { Subscription } from 'rxjs';
import { ApiService } from '../api.service';
import { FIELD_REQUIRED, INVALID_ADDRESS, INVALID_EMAIL_MESSAGE, INVALID_NAME_MESSAGE, INVALID_PHONE_NUMBER } from '../model/constants';
import { ErrorModel } from '../model/error.model';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Pestamp } from '../model/pestamp.model';
import { NetworkdetectService } from '../networkdetect.service';
import { NavController } from '@ionic/angular';
import { CometChat } from '@cometchat-pro/cordova-ionic-chat';
import { MixpanelService } from '../utilities/mixpanel.service';

@Component({
  selector: 'app-pestamp-schedule',
  templateUrl: './pestamp-schedule.page.html',
  styleUrls: ['./pestamp-schedule.page.scss'],
})
export class PestampSchedulePage implements OnInit {
  firstFormGroup: FormGroup;
  //secondFormGroup:FormGroup;

  private addressSubscription: Subscription;

  fieldRequired = FIELD_REQUIRED;
  nameError = INVALID_NAME_MESSAGE;
  emailError = INVALID_EMAIL_MESSAGE;
  addressError = INVALID_ADDRESS;
  contactError = INVALID_PHONE_NUMBER;
  hardCopiesError = "Maximum value of hardcopy cannot exceed 10";
  hardCopiesPatternError = "Value of hardcopy should be a valid number";

  atticPhotosList: any = [];
  roofPhotosList: any = [];
  permitPlanList: any = [];

  stampingTypeValue: any;
  isElectrical: boolean = false;

  stampingModeValue: any;
  isECopy: boolean = false;

  deactivateNetworkSwitch: Subscription;
  netSwitch: any;

  userdata: any;
  designId = 0;
  design: Pestamp = null;
  fieldDisabled = false;
  atticData: any;
  roofData: any;
  permitPlanData: any;
  tabsDisabled = false;
  buttonValueCheck: string;

  indexOfatticphotos = [];
  indexOfroofphotos = [];
  indexOfpermitPlanphotos = [];

  isRoofFileDelete: boolean = false;
  isAtticFileDelete: boolean = false;
  isPermitPlanFileDelete: boolean = false;

  // GoogleAutocomplete: google.maps.places.AutocompleteService;
  // autocompleteItems: any[];

  isAtticFileUpload: boolean = false;
  isRoofFileUpload: boolean = false;
  isPermitPlanFileUpload: boolean = false;
  nonEditableField: boolean = false;
  //user: User
  // isEditMode:boolean=false;
  // formatted_address:string;

  // map: any;

  // geoEncoderOptions: NativeGeocoderOptions = {
  //   useLocale: true,
  //   maxResults: 5
  // };

  // geocoder = new google.maps.Geocoder();

  constructor(private formBuilder: FormBuilder,
    private storage: StorageService,
    private utils: UtilitiesService,
    private zone: NgZone,
    private nativeGeocoder: NativeGeocoder,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private network: NetworkdetectService,
    private navController: NavController,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private mixpanelService: MixpanelService) {
    const MAILFORMAT = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z]+(?:\.[a-zA-Z]+)*$/;
    this.firstFormGroup = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z. ]{3,}$")]),
      email: new FormControl('', [Validators.required, Validators.pattern(MAILFORMAT)]),
      stampingmode: new FormControl(null, [Validators.required]),
      numberofhardcopy: new FormControl(null),
      shippingaddress: new FormControl(null),
      contactnumber: new FormControl(null),
      stampingtype: new FormControl(null, [Validators.required]),
      atticphotos: new FormControl(''),
      roofphotos: new FormControl(''),
      permitplanphotos: new FormControl(''),
      comment: new FormControl(''),
      latitude: new FormControl(''),
      longitude: new FormControl(''),
      country: new FormControl(''),
      state: new FormControl(''),
      city: new FormControl(''),
      postalcode: new FormControl(''),
      mountingtype: new FormControl('', [Validators.required]),
      propertytype: new FormControl('', [Validators.required]),
      jobtype: new FormControl('')
      // })
      // this.secondFormGroup = this.formBuilder.group({

    })
    this.designId = +this.route.snapshot.paramMap.get('id');


    // this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    // this.autocompleteItems = [];
  }

  ionViewDidEnter() {
    this.deactivateNetworkSwitch = this.network.networkSwitch.subscribe(data => {
      this.netSwitch = data;
      console.log(this.netSwitch);
    })
  }

  ngOnInit() {
    this.fieldDisabled = false;
    this.userdata = this.storage.getUser();
    console.log(this.userdata);

    if (this.designId !== 0) {
      setTimeout(() => {
        this.getDesignDetails();
      }, 1000)

    }
  }

  /* Getting Design Details */
  getDesignDetails() {
    console.log(this.isAtticFileUpload);
    this.utils.showLoading('Getting Design Details').then(() => {
      this.apiService.getPestampDetails(this.designId).subscribe(async (result) => {
        await this.utils.hideLoading().then(() => {
          this.design = result;
          console.log(this.design);
          this.fieldDisabled = true;
          this.atticData = this.design.atticphotos;
          this.roofData = this.design.roofphotos;
          this.permitPlanData = this.design.permitplan;
          console.log(this.permitPlanData)
          this.firstFormGroup.patchValue({
            name: this.design.personname,
            email: this.design.email,
            stampingmode: this.design.modeofstamping,
            atticphotos: this.design.atticphotos,
            roofphotos: this.design.roofphotos,
            permitplanphotos: this.design.permitplan,
            stampingtype: this.design.type,
            numberofhardcopy: this.design.hardcopies,
            shippingaddress: this.design.deliveryaddress,
            contactnumber: this.design.contactnumber,
            createdby: this.design.createdby,
            mountingtype: this.design.mountingtype,
            propertytype: this.design.propertytype,
            jobtype:this.design.jobtype,
            // architecturaldesign:this.design.architecturaldesign,
            comment: this.design.comments == '' ? '' : this.design.comments[0].message,
            // type: this.design.type,
            latitude: this.design.latitude,
            longitude: this.design.longitude,
            country: this.design.country,
            state: this.design.state,
            city: this.design.city,
            postalcode: this.design.postalcode,
            //attachments:this.design.attachments,
          });
        })
      }, (error) => {
        this.utils.hideLoading();
      })
    })
  }

  /* FOR SELECT ATTIC FILES FROM DEVICE */
  atticFiles(event) {
    this.isAtticFileUpload = true;
    for (var i = 0; i < event.target.files.length; i++) {
      this.atticPhotosList.push(event.target.files[i])
    }
    //this.architecturalFileUpload= true;
  }

  /* FOR UPLOAD ATTIC PHOTOS OR FILES */
  uploadAtticFiles(response: any) {
    console.log(this.isAtticFileUpload, "attic");

    if (!this.isAtticFileUpload) {
      this.uploadRoofFiles(response);
    }
    else {
      console.log("hello", response)
      const data = new FormData();
      for (var i = 0; i < this.atticPhotosList.length; i++) {
        data.append("files", this.atticPhotosList[i]);
        if (i == 0) {
          //data.append('files', file);
          data.append('path', "pestamp/" + response.id);
          data.append('refId', "" + response.id);
          data.append('ref', "pestamp");
          data.append('field', "atticphotos");

          console.log("file upload data---" + data);
        }
      }
      this.utils.showLoading("Attic File Uploading").then(() => {
        this.apiService.uploadFile(data).subscribe(res => {
          this.utils.hideLoading();
            this.uploadRoofFiles(response)

          // else if(!this.isRoofFileUpload || (!this.isRoofFileUpload && !this.isPermitPlanFileUpload))
          // {

          // }
        }, responseError => {
          this.utils.hideLoading();
          const error: ErrorModel = responseError.error;
          this.utils.errorSnackBar(error.message[0].messages[0].message);
        })
      })
    }
  }

  /* FOR SELECT ROOF FILES OR PHOTOS FROM DEVICE */
  roofFiles(event) {
    console.log(event);
    console.log(event.target.files);
    this.isRoofFileUpload = true;
    for (var i = 0; i < event.target.files.length; i++) {
      this.roofPhotosList.push(event.target.files[i])
    }
    //this.architecturalFileUpload= true;
    console.log(this.roofPhotosList);
  }

  /* FOR UPLOAD ROOF PHOTOS OR FILES */
  uploadRoofFiles(response: any) {
    console.log(this.isRoofFileUpload, "roof");
    if (!this.isRoofFileUpload) {
      this.uploadPermitPlanFiles(response);

    }
    else {
      const data = new FormData();
      for (var i = 0; i < this.roofPhotosList.length; i++) {
        data.append("files", this.roofPhotosList[i]);
        if (i == 0) {
          //data.append('files', file);
          data.append('path', "pestamp/" + response.id);
          data.append('refId', "" + response.id);
          data.append('ref', "pestamp");
          data.append('field', "roofphotos");

          console.log("file upload data---" + data);
        }
      }
      this.utils.showLoading("Roof File Uploading").then(() => {
        this.apiService.uploadFile(data).subscribe(res => {
          this.utils.hideLoading();

            this.uploadPermitPlanFiles(response);

        }, responseError => {
          this.utils.hideLoading();
          const error: ErrorModel = responseError.error;
          this.utils.errorSnackBar(error.message[0].messages[0].message);
        })
      })
    }
  }

  /* FOR SELECT PHOTOS OR FILES FOR PERMIT PLAN FROM DEVICE */
  permitPlanFiles(event) {
    console.log(event);
    console.log(event.target.files);
    this.isPermitPlanFileUpload = true;
    for (var i = 0; i < event.target.files.length; i++) {
      this.permitPlanList.push(event.target.files[i])
    }
    //this.architecturalFileUpload= true;
    console.log(this.permitPlanList);
  }

  /* FOR UPLOAD PERMIT PLAN PHOTOS OR FILES */
  uploadPermitPlanFiles(response: any) {
    console.log(this.isPermitPlanFileUpload, 'permit');
    if (!this.isPermitPlanFileUpload) {
      console.log("checking...")
      this.router.navigate(['/pestamp-homepage'])
      this.utils.showSnackBar('Pe Stamp have been updated');
      this.utils.setPeStampRefresh(true);

    } else {
      const data = new FormData();
      for (var i = 0; i < this.permitPlanList.length; i++) {
        data.append("files", this.permitPlanList[i]);
        if (i == 0) {
          //data.append('files', file);
          data.append('path', "pestamp/" + response.id);
          data.append('refId', "" + response.id);
          data.append('ref', "pestamp");
          data.append('field', "permitplan");

          console.log("file upload data---" + data);
        }
      }
      this.utils.showLoading("Permit Plan Uploading").then(() => {
        this.apiService.uploadFile(data).subscribe(res => {
          this.utils.hideLoading();
          if (this.buttonValueCheck == 'save') {
            this.router.navigate(['/pestamp-homepage'])
            if (this.designId == 0) {
              this.utils.showSnackBar('Pe Stamp have been Created');
            }
            else {
              this.utils.showSnackBar('Pe Stamp have been updated');
            }
            // this.utils.showSnackBar('Design have been saved');
            this.utils.setPeStampRefresh(true);
          } else {
            let objToSend: NavigationExtras = {
              queryParams: {
                designData: response,
                value: 'assign'
              },
              skipLocationChange: false,
              fragment: 'top'
            };


            this.router.navigate(['/pestamp-payment-modal'], {
              state: { productdetails: objToSend }
            });
          }
        }, responseError => {
          this.utils.hideLoading();
          const error: ErrorModel = responseError.error;
          this.utils.errorSnackBar(error.message[0].messages[0].message);
        })
      })
    }
  }

  /* FOR REMOVE SELECTED PHOTOS OR FILES */
  removeArc(i, value) {
    console.log(value);
    if (value == 'attic') {
      this.atticPhotosList.splice(i, 1);
    }
    else if (value == 'roof') {
      this.roofPhotosList.splice(i, 1);
    }
    else {
      this.permitPlanList.splice(i, 1);
    }
  }

  /* FOR TYPE OF STAMPING RADIO BUTTONS */
  stampingTypeOption(e) {
    console.log(e.target.value);
    this.stampingTypeValue = e.target.value;
    const attic = this.firstFormGroup.get('atticphotos');
    const roof = this.firstFormGroup.get('roofphotos');
    const permitplan = this.firstFormGroup.get('permitplanphotos');
    const job=this.firstFormGroup.get('jobtype');
    if (this.stampingTypeValue == 'structural' || this.stampingTypeValue == 'both') {
      attic.setValidators([Validators.required]);
      roof.setValidators([Validators.required]);
      permitplan.setValidators([Validators.required]);
      job.clearValidators();
      job.reset();
    }
    else if (this.stampingTypeValue == 'electrical') {
      attic.clearValidators();
      attic.reset();
      roof.clearValidators();
      roof.reset();
      permitplan.setValidators([Validators.required]);
      job.setValidators([Validators.required]);

    }
    else {
      attic.clearValidators();
      attic.updateValueAndValidity();
      roof.clearValidators();
      roof.updateValueAndValidity();
      permitplan.clearValidators();
      permitplan.updateValueAndValidity();
      job.clearValidators();
      job.updateValueAndValidity();
    }
    // if(this.stampingTypeValue == 'electrical')
    // {
    //   this.isElectrical = true;
    // }
    // else{
    //   this.isElectrical = false;
    // }

  }

  // ngOnDestroy(): void {
  //   //this.subscription.unsubscribe();
  //   // if (this.designId === 0) {
  //     this.addressSubscription.unsubscribe();
  //   //}
  // }

  /* FOR MODE OF STAMPING RADIO BUTTONS*/
  stampingModeOption(e) {
    console.log(e)
    console.log(e.target.value);
    this.stampingModeValue = e.target.value;
    console.log(this.stampingModeValue)
    // if(this.stampingModeValue == 'ecopy')
    // {
    //   this.isECopy = true;
    // }
    // else{
    //   this.isECopy = false;
    // }
    const ADDRESSFORMAT = /^[#.0-9a-zA-Z\u00C0-\u1FFF\u2800-\uFFFD &_*#/'\s,-]+$/;
    const NUMBERPATTERN = '^[0-9]+$';
    const shipping = this.firstFormGroup.get('shippingaddress');
    const contact = this.firstFormGroup.get('contactnumber');
    const hardcopy = this.firstFormGroup.get('numberofhardcopy');
    console.log(shipping);
    console.log(contact);
    console.log(hardcopy);
    if (this.stampingModeValue == 'hardcopy' || this.stampingModeValue == 'both') {
      shipping.setValidators([
        Validators.required,
        Validators.pattern(ADDRESSFORMAT)
      ]);
      // this.name.setValidators([
      //   Validators.required,
      //   Validators.min(1),
      //   Validators.pattern("^[a-zA-Z. ]{3,}$")]);
      contact.setValidators([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(15),
        Validators.pattern("^[0-9]{8,15}$")]);
      hardcopy.setValidators([
        Validators.required,
        Validators.min(1),
        Validators.max(10),
        //Validators.pattern("^[0-4]+$")]);
        Validators.pattern(NUMBERPATTERN)]);
    }
    // else if(this.stampingModeValue == 'ecopy'){
    //   console.log("hello")
    //   contact.setValidators([
    //     Validators.required,
    //     Validators.minLength(8),
    //     Validators.maxLength(15),
    //     Validators.pattern("^[0-9]{8,15}$")]);

    //     shipping.clearValidators();
    //     shipping.reset();
    //     hardcopy.clearValidators();
    //     hardcopy.reset();
    // }
    else {
      shipping.clearValidators();
      shipping.updateValueAndValidity();
      contact.clearValidators();
      contact.updateValueAndValidity();
      hardcopy.clearValidators();
      hardcopy.updateValueAndValidity();
    }
  }

  goBack() {
    this.mixpanelService.track("PESTAMP_PAGE_CLOSE", {
    });
    this.navController.pop();

  }

  /* FOR SUBMIT FORM */
  submitForm(e) {
    console.log(e)
    this.buttonValueCheck = e;
    if (this.firstFormGroup.status == 'VALID') {
      var tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      let contactnumber = this.firstFormGroup.get('contactnumber').value;
      var stampingType = this.firstFormGroup.get('stampingtype').value;
      if (this.designId === 0) {
        if (e == 'save') {
          this.mixpanelService.track("SAVEPESTAMP_PAGE", {
          });
          //this.utils.showLoading('Saving').then(() => {
          var data = {
            personname: this.firstFormGroup.get('name').value,
            email: this.firstFormGroup.get('email').value,
            contactnumber: contactnumber,
            hardcopies: parseInt(this.firstFormGroup.get('numberofhardcopy').value),
            modeofstamping: this.firstFormGroup.get('stampingmode').value,
            type: this.firstFormGroup.get('stampingtype').value,
            mountingtype: this.firstFormGroup.get('mountingtype').value,
            deliveryaddress: this.firstFormGroup.get('shippingaddress').value,
            propertytype: this.firstFormGroup.get('propertytype').value,
            comments: this.firstFormGroup.get('comment').value,
            latitude: this.firstFormGroup.get('latitude').value,
            longitude: this.firstFormGroup.get('longitude').value,
            actualdelivereddate: tomorrow.toISOString(),
            jobtype:this.firstFormGroup.get('jobtype').value,
            source: "android",
            createdby: this.userdata.id,
            creatorparentid: this.userdata.parent.id,
            status: "created",
            outsourcedto: null,
            //paymenttype: null,
            paymentstatus: null
          }
          this.utils.showLoading('Saving').then(() => {
            this.apiService.addSiteAssessment(data).subscribe(res => {
              this.utils.hideLoading();
              if (stampingType == 'structural' || stampingType == 'both') {
                this.uploadAtticFiles(res)
              }
              //if(stampingType=='electrical')
              else {
                this.uploadPermitPlanFiles(res);
              }
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
        else if (e == 'send') {
          this.mixpanelService.track("ORDER_PESTAMP_PAGE", {
          });
          var postData = {
            personname: this.firstFormGroup.get('name').value,
            email: this.firstFormGroup.get('email').value,
            contactnumber: this.firstFormGroup.get('contactnumber').value,
            hardcopies: parseInt(this.firstFormGroup.get('numberofhardcopy').value),
            modeofstamping: this.firstFormGroup.get('stampingmode').value,
            type: this.firstFormGroup.get('stampingtype').value,
            mountingtype: this.firstFormGroup.get('mountingtype').value,
            propertytype: this.firstFormGroup.get('propertytype').value,
            deliveryaddress: this.firstFormGroup.get('shippingaddress').value,
            comments: this.firstFormGroup.get('comment').value,
            latitude: this.firstFormGroup.get('latitude').value,
            longitude: this.firstFormGroup.get('longitude').value,
            actualdelivereddate: tomorrow.toISOString(),
            jobtype:this.firstFormGroup.get('jobtype').value,
            source: "android",
            createdby: this.userdata.id,
            creatorparentid: this.userdata.parent.id,
            status: "created",
            outsourcedto: null,
            //paymenttype: null,
            paymentstatus: null
          }
          this.apiService.addSiteAssessment(postData).subscribe((res: any) => {
            console.log(res);
            if (stampingType == 'structural' || stampingType == 'both') {
              this.uploadAtticFiles(res)
            }
            //if(stampingType=='electrical')
            else {
              this.uploadPermitPlanFiles(res);
            }
            //this.router.navigate(['pestamp-payment-modal',{isConfirmed: false, isLater: false, ispestamp: true, pestampid: res.id}]);
            //       let objToSend: NavigationExtras = {
            //         queryParams: {
            //         designData:res,
            //         value:'assign'
            //         },
            //         skipLocationChange: false,
            //         fragment: 'top'
            //     };


            // this.router.navigate(['/pestamp-payment-modal'], {
            //   state: { productdetails: objToSend }
            // });
          },
            responseError => {
              this.utils.hideLoading().then(() => {
                const error: ErrorModel = responseError.error;
                this.utils.errorSnackBar(error.message[0].messages[0].message);
              });
              //
            })
        }
      }
      else {
        if (e == 'save') {
          var data = {
            personname: this.firstFormGroup.get('name').value,
            email: this.firstFormGroup.get('email').value,
            contactnumber: contactnumber,
            hardcopies: parseInt(this.firstFormGroup.get('numberofhardcopy').value),
            modeofstamping: this.firstFormGroup.get('stampingmode').value,
            type: this.firstFormGroup.get('stampingtype').value,
            mountingtype: this.firstFormGroup.get('mountingtype').value,
            deliveryaddress: this.firstFormGroup.get('shippingaddress').value,
            propertytype: this.firstFormGroup.get('propertytype').value,
            comments: this.firstFormGroup.get('comment').value,
            latitude: this.firstFormGroup.get('latitude').value,
            longitude: this.firstFormGroup.get('longitude').value,
            actualdelivereddate: tomorrow.toISOString(),
            jobtype:this.firstFormGroup.get('jobtype').value,
            source: "android",
            createdby: this.userdata.id,
            creatorparentid: this.userdata.parent.id,
            status: "created",
            outsourcedto: null,
            //paymenttype: null,
            paymentstatus: null
          }
          this.utils.showLoading('Saving').then(() => {
            console.log(this.isAtticFileUpload);
            this.apiService.updatePestamps(this.designId, data).subscribe(res => {
              this.utils.hideLoading();
              // if(stampingType=='structural' || stampingType == 'both')
              console.log(this.isAtticFileUpload);
              //  if(this.isAtticFileUploadEdit)
              //         {
              this.uploadAtticFiles(res)
              // }
              //if(stampingType=='electrical')
              /*  if(this.isRoofFileUploadEdit)
                 {
                   this.uploadRoofFiles(res);
                 }
                if(this.isPermitPlanFileUploadEdit){
                   this.uploadPermitPlanFiles(res);
                 }
                 if(!this.isAtticFileUploadEdit && !this.isRoofFileUploadEdit && !this.isPermitPlanFileUploadEdit){
                   this.router.navigate(['/pestamp-homepage'])
                  this.utils.showSnackBar('Pe Stamp have been updated');
             //     // this.utils.showSnackBar('Design have been saved');
                  this.utils.setPeStampRefresh(true);
                 }*/
              // setTimeout(()=>{
              //   this.utils.hideLoading().then(() => {
              //     console.log('Res', res);
              //     //this.createChatGroup(response);
              //     this.router.navigate(['/pestamp-homepage'])
              //     this.utils.showSnackBar('Pe Stamp have been updated');
              //     // this.utils.showSnackBar('Design have been saved');
              //     this.utils.setPeStampRefresh(true);
              //     // this.navController.pop();
              //     // this.utils.showSuccessModal('Desgin have been saved').then((modal) => {
              //     //   modal.present();
              //     //   modal.onWillDismiss().then((dismissed) => {
              //         // this.utils.setHomepageDesignRefresh(true);
              //     //     this.navController.pop();
              //     //   });
              //     // });

              //   });
              // },2000)
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
        else if (e == 'send') {
          var postData = {
            personname: this.firstFormGroup.get('name').value,
            email: this.firstFormGroup.get('email').value,
            contactnumber: this.firstFormGroup.get('contactnumber').value,
            hardcopies: parseInt(this.firstFormGroup.get('numberofhardcopy').value),
            modeofstamping: this.firstFormGroup.get('stampingmode').value,
            type: this.firstFormGroup.get('stampingtype').value,
            mountingtype: this.firstFormGroup.get('mountingtype').value,
            deliveryaddress: this.firstFormGroup.get('shippingaddress').value,
            propertytype: this.firstFormGroup.get('propertytype').value,
            comments: this.firstFormGroup.get('comment').value,
            latitude: this.firstFormGroup.get('latitude').value,
            longitude: this.firstFormGroup.get('longitude').value,
            actualdelivereddate: tomorrow.toISOString(),
            jobtype:this.firstFormGroup.get('jobtype').value,
            source: "android",
            createdby: this.userdata.id,
            creatorparentid: this.userdata.parent.id,
            status: "created",
            outsourcedto: null,
            //paymenttype: null,
            paymentstatus: null
          }
          this.apiService.updatePestamps(this.designId, postData).subscribe(res => {
            console.log(res);
            if (stampingType == 'structural' || stampingType == 'both') {
              this.uploadAtticFiles(res)
            }
            //if(stampingType=='electrical')
            else {
              this.uploadPermitPlanFiles(res);
            }
            //       let objToSend: NavigationExtras = {
            //         queryParams: {
            //         designData:res,
            //         value:'assign'
            //         },
            //         skipLocationChange: false,
            //         fragment: 'top'
            //     };


            // this.router.navigate(['/pestamp-payment-modal'], {
            //   state: { productdetails: objToSend }
            // });
          },
            responseError => {
              this.utils.hideLoading().then(() => {
                const error: ErrorModel = responseError.error;
                this.utils.errorSnackBar(error.message[0].messages[0].message);
              });
              //
            })

        }
      }
    }
    else {
      if (this.firstFormGroup.value.name == '' || this.firstFormGroup.get('name').hasError('pattern')) {
        this.utils.errorSnackBar("Please check the field name")
      }
      else if (this.firstFormGroup.value.email == '' || this.firstFormGroup.get('email').hasError('pattern')) {
        this.utils.errorSnackBar("Please check the field email");
      }
      else if (this.firstFormGroup.value.stampingmode == null) {
        this.utils.errorSnackBar("Please select mode of stamping");
      }
      else if ((this.firstFormGroup.value.numberofhardcopy == null || this.firstFormGroup.value.numberofhardcopy == '') && (this.stampingModeValue == 'hardcopy' || this.stampingModeValue == 'both')) {
        this.utils.errorSnackBar("Please check the field no of hardcopies")
        console.log(this.stampingModeValue)
      }
      else if ((this.firstFormGroup.value.shippingaddress == null || this.firstFormGroup.value.shippingaddress == '' || this.firstFormGroup.get('shippingaddress').hasError('pattern')) && (this.stampingModeValue == 'hardcopy' || this.stampingModeValue == 'both')) {
        this.utils.errorSnackBar("Please check the field address");
      }
      else if ((this.firstFormGroup.value.contactnumber == null || this.firstFormGroup.get('contactnumber').hasError('pattern')) && (this.stampingModeValue == 'hardcopy' || this.stampingModeValue == 'both')) {
        this.utils.errorSnackBar("Please check the field contact number")
      }
      else if (this.firstFormGroup.value.propertytype == '') {
        this.utils.errorSnackBar("Please select property type");
      }
      else if (this.firstFormGroup.value.mountingtype == '') {
        this.utils.errorSnackBar("Please select mounting type");
      }
      else if (this.firstFormGroup.value.jobtype == '') {
        this.utils.errorSnackBar("Please select job type");
      }

      else if (this.firstFormGroup.value.atticphotos == '' && (this.stampingTypeValue == 'structural' || this.stampingTypeValue == 'both')) {
        this.utils.errorSnackBar("Please check the field attic photos")
      }
      else if (this.firstFormGroup.value.roofphotos == '' && (this.stampingTypeValue == 'structural' || this.stampingTypeValue == 'both')) {
        this.utils.errorSnackBar("Please check the field roof photos");
      }
      else if (this.firstFormGroup.value.permitplanphotos == '') {
        this.utils.errorSnackBar("Please check the field permit plan");
      }
      else {
        this.utils.errorSnackBar("Error");
      }
    }

  }

  //// For Address
  //   /* FOR SEARCH SHIPPING ADDRESS */
  //   updateSearchResults(event) {
  //     //this.autoCompleteOff = true;
  //     console.log(this.autoCompleteOff);
  //     const input = event.detail.value;
  //     if (input === '') {
  //       this.autocompleteItems = [];
  //       return;
  //     }
  //     this.GoogleAutocomplete.getPlacePredictions({ input, componentRestrictions: {
  //       country: 'us'
  //     }  },
  //       (predictions, status) => {
  //         this.autocompleteItems = [];
  //         this.zone.run(() => {
  //           predictions.forEach((prediction) => {
  //             this.autocompleteItems.push(prediction);
  //           });
  //         });
  //       });
  //   }

  //   forAutoComplete(e){
  //     console.log("hello",e);
  //     this.autoCompleteOff = true;

  //   }

  //   /* FOR SELECT SEARCH SHIPPING ADDRESS*/
  //   selectSearchResult(item) {
  //     console.log(item);
  //     this.geocoder.geocode({
  //       placeId: item.place_id
  //     }, (responses, status) => {
  //       console.log('respo', responses);
  //       this.getGeoEncoder(responses[0].geometry.location.lat(), responses[0].geometry.location.lng(), responses[0].formatted_address);
  //     });
  //   }

  //   getGeoEncoder(latitude, longitude, formattedAddress) {

  //     // // TODO remove later
  //     // const address: AddressModel = {
  //     //   address: 'Vasant Kunj, New Delhi, Delhi',
  //     //   lat: 28.5200491,
  //     //   long: 77.158687,
  //     //   country: 'India',
  //     //   state: 'Delhi',
  //     //   city: 'New Delhi',
  //     //   postalcode: '110070'
  //     // };
  //     // this.utilities.setAddress(address);
  //     // this.goBack();
  //     // return;

  //     this.utils.showLoading('Loading').then(() => {
  //       this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geoEncoderOptions)
  //         .then((result: NativeGeocoderResult[]) => {
  //           console.log(result)
  //           let add = '';
  //           if (formattedAddress === '') {
  //             add = this.generateAddress(result[0]);
  //           } else {
  //             add = formattedAddress;
  //           }
  //           this.utils.hideLoading().then(() => {
  //             console.log('resu', result);
  //             const address: AddressModel = {
  //               address: add,
  //               lat: latitude,
  //               long: longitude,
  //               country: result[0].countryName,
  //               state: result[0].administrativeArea,
  //               city: result[0].locality,
  //               postalcode: result[0].postalCode
  //             };
  //             this.utils.setAddress(address);
  //             this.addressValue();
  //             //this.goBack();
  //           });

  //         })
  //         .catch((error: any) => {
  //           this.utils.hideLoading().then(() => {
  //             alert('Error getting location' + JSON.stringify(error));
  //           });

  //         });
  //     });
  //   }

  //   generateAddress(addressObj) {
  //     const obj = [];
  //     let address = '';
  //     for (const key in addressObj) {
  //       obj.push(addressObj[key]);
  //     }
  //     obj.reverse();
  //     for (const val in obj) {
  //       if (obj[val].length) {
  //         address += obj[val] + ', ';
  //       }
  //     }
  //     return address.slice(0, -2);
  //   }

  //   onCancel() {
  //     console.log("hello");
  //     this.autocompleteItems = [];
  //     console.log(this.autocompleteItems)
  //   }

  //   addressValue(){
  //     // }
  //     this.addressSubscription = this.utils.getAddressObservable().subscribe((address) => {
  //       console.log(address,">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

  //         // this.firstFormGroup.get('address').setValue('124/345');
  //         // this.firstFormGroup.get('latitude').setValue('24.553333');
  //         // this.firstFormGroup.get('longitude').setValue('80.5555555555');
  //         // this.firstFormGroup.get('country').setValue('india');
  //         // this.firstFormGroup.get('city').setValue('Lucknow');
  //         // this.firstFormGroup.get('state').setValue('UP');
  //         // this.firstFormGroup.get('postalcode').setValue(3232343);
  //        this.firstFormGroup.get('shippingaddress').setValue(address.address);
  //          this.firstFormGroup.get('latitude').setValue(address.lat);
  //          this.firstFormGroup.get('longitude').setValue(address.long);
  //          this.firstFormGroup.get('country').setValue(address.country);
  //        this.firstFormGroup.get('city').setValue(address.city);
  //          this.firstFormGroup.get('state').setValue(address.state);
  //          this.firstFormGroup.get('postalcode').setValue(address.postalcode);
  //     }, (error) => {
  //       this.firstFormGroup.get('address').setValue('');
  //       this.firstFormGroup.get('latitude').setValue('');
  //       this.firstFormGroup.get('longitude').setValue('');
  //       this.firstFormGroup.get('country').setValue('');
  //       this.firstFormGroup.get('city').setValue('');
  //       this.firstFormGroup.get('state').setValue('');
  //       this.firstFormGroup.get('postalcode').setValue('');
  //     });
  //     // this.firstFormGroup.patchValue({
  //     //   createdby: this.storage.getUserID()
  //     // });
  //  // this.autocompleteItems = [];
  //     this.autoCompleteOff = false;
  //     console.log(this.autoCompleteOff);
  //     //this.getSolarMake();

  //     }

  //     onBlur()
  //     {
  //       setTimeout(() => {
  //         this.autocompleteItems = [];
  //       }, 100);
  //     }

  //     uploadAtticphotos(recordid: number, fileobj: File, index){

  //     }

  removeattachment(arc, i, value) {
    console.log(arc, i, value)
    if (value == 'attic') {
      this.indexOfatticphotos.push(arc.id)
      console.log(this.indexOfatticphotos)
      this.atticData.splice(i, 1);
      // this.isAtticFileDelete=true;
      // console.log(this.isAtticFileDelete)
      this.deleteAtticFile(this.indexOfatticphotos);
    }
    else if (value == 'roof') {
      this.indexOfroofphotos.push(arc.id)
      console.log(this.indexOfroofphotos)
      this.roofData.splice(i, 1);
      // this.isRoofFileDelete=true;
      this.deleteRoofFile(this.indexOfroofphotos);

    }
    else {
      this.indexOfpermitPlanphotos.push(arc.id)
      console.log(this.indexOfpermitPlanphotos)
      this.permitPlanData.splice(i, 1);
      // this.isPermitPlanFileDelete=true;
      this.deletePermitPlan(this.indexOfpermitPlanphotos);
    }
  }

  deleteAtticFile(index) {
    for (var i = 0; i < index.length; i++) {
      var id = index[i];
      this.utils.showLoading("Deleting Attic File").then(() => {
        this.apiService.deletePestamp(id).subscribe(res => {
          this.utils.hideLoading().then(() => {
            console.log("hello", res)
          });
        })
      });
      (error) => {
        this.utils.hideLoading().then(() => {
          this.utils.errorSnackBar('some Error Occured');
        });
      }
    }
    //this.utils.setPermitDesignDetailsRefresh(true);
  }

  deleteRoofFile(index) {
    console.log(index)
    for (var i = 0; i < index.length; i++) {
      var id = index[i];
      console.log(id);
      this.utils.showLoading("Deleting Roof File").then(() => {
        this.apiService.deletePestamp(id).subscribe(res => {
          this.utils.hideLoading().then(() => {
            console.log("hello", res)
          });
        })
      });
      (error) => {
        this.utils.hideLoading().then(() => {
          this.utils.errorSnackBar('some Error Occured');
        });
      }
    }
    //this.utils.setPermitDesignDetailsRefresh(true);
  }

  deletePermitPlan(index) {
    console.log(index);
    for (var i = 0; i < index.length; i++) {
      var id = index[i];
      console.log(id);
      this.utils.showLoading("Deleting Permit Plan").then(() => {
        this.apiService.deletePestamp(id).subscribe(res => {
          this.utils.hideLoading().then(() => {
            console.log("hello", res)
          });
        })
      });
      (error) => {
        this.utils.hideLoading().then(() => {
          this.utils.errorSnackBar('some Error Occured');
        });
      }
    }
    //this.utils.setPermitDesignDetailsRefresh(true);
  }

  createChatGroup(design: Pestamp) {
    var GUID = 'permit' + "_" + new Date().getTime();

    // var address = design.address.substring(0, 90);
    var groupName = design.name

    var groupType = CometChat.GROUP_TYPE.PRIVATE;
    var password = "";

    var group = new CometChat.Group(GUID, groupName, groupType, password);

    CometChat.createGroup(group).then(group => {
      let membersList = [
        new CometChat.GroupMember("" + design.createdby.id, CometChat.GROUP_MEMBER_SCOPE.ADMIN)
      ];
      CometChat.addMembersToGroup(group.getGuid(), membersList, []).then(response => {
        this.cdr.detectChanges();
      })
    })
  }
}
