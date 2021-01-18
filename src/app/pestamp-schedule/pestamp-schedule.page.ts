import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { AddressModel } from '../model/address.model';
import { StorageService } from '../storage.service';
import { UtilitiesService } from '../utilities.service';
import { Subscription } from 'rxjs';
import { ApiService } from '../api.service';
import { FIELD_REQUIRED, INVALID_ADDRESS, INVALID_EMAIL_MESSAGE, INVALID_NAME_MESSAGE, INVALID_PHONE_NUMBER } from '../model/constants';
import { ErrorModel } from '../model/error.model';

@Component({
  selector: 'app-pestamp-schedule',
  templateUrl: './pestamp-schedule.page.html',
  styleUrls: ['./pestamp-schedule.page.scss'],
})
export class PestampSchedulePage implements OnInit {
  firstFormGroup:FormGroup;
  //secondFormGroup:FormGroup;

  private addressSubscription: Subscription;

  fieldRequired = FIELD_REQUIRED;
  nameError = INVALID_NAME_MESSAGE;
  emailError = INVALID_EMAIL_MESSAGE;
  addressError = INVALID_ADDRESS;
  contactError = INVALID_PHONE_NUMBER;
  
  atticPhotosList: string[]=[];
  roofPhotosList:string[]=[];
  permitPlanList:string[]=[];

  stampingTypeValue:any;
  isElectrical:boolean = false;
  
  stampingModeValue:any;
  isECopy:boolean = false;

  userdata:any;

  GoogleAutocomplete: google.maps.places.AutocompleteService;
  autocompleteItems: any[];

  autoCompleteOff:boolean = false;
  isAtticFileUpload:boolean = false;
  isRoofFileUpload:boolean = false;
  isPermitPlanFileUpload:boolean = false;

  // map: any;

  geoEncoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };

  geocoder = new google.maps.Geocoder();

  constructor(private formBuilder:FormBuilder,
              private storage:StorageService,
              private utils:UtilitiesService,
              private zone: NgZone,
              private nativeGeocoder: NativeGeocoder,
              private apiService: ApiService) 
              { 
    const MAILFORMAT = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z]+(?:\.[a-zA-Z]+)*$/;
    this.firstFormGroup = this.formBuilder.group({
      name:new FormControl('',[Validators.required, Validators.pattern("^[a-zA-Z. ]{3,}$")]),
      email:new FormControl('',[Validators.required, Validators.pattern(MAILFORMAT)]),
      stampingmode:new FormControl(null,[Validators.required]),
      numberofhardcopy:new FormControl(''),
      shippingaddress:new FormControl(''),
      contactnumber : new FormControl(''),
      stampingtype:new FormControl(null,[Validators.required]),
      atticphotos:new FormControl(''),
      roofphotos:new FormControl(''),
      permitplanphotos:new FormControl(''),
      comment:new FormControl(''),
      latitude: new FormControl(''),
    longitude: new FormControl(''),
    country: new FormControl(''),
    state: new FormControl(''),
    city: new FormControl(''),
    postalcode: new FormControl(''),
    mountingtype:new FormControl('',[Validators.required])
    // })
    // this.secondFormGroup = this.formBuilder.group({
     
    })
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocompleteItems = [];
  }

  ngOnInit() {
    this.userdata = this.storage.getUser();
    console.log(this.userdata);
  }

  /* FOR SELECT ATTIC FILES FROM DEVICE */
  atticFiles(event){
    console.log(event);
    console.log(event.target.files);
    this.isAtticFileUpload = true;
     for(var i=0; i< event.target.files.length;i++){
       this.atticPhotosList.push(event.target.files[i])
     }
     //this.architecturalFileUpload= true;
     console.log(this.atticPhotosList);
   }

   /* FOR UPLOAD ATTIC PHOTOS OR FILES */
   uploadAtticFiles(recordid: number,file: string){
    // console.log(this.archFiles);
    console.log(file);
     const data = new FormData();
     for(var i=0; i< this.atticPhotosList.length;i++){
       data.append("files",this.atticPhotosList[i]);
       if(i ==0){
        //data.append('files', file);
        data.append('path', "pestamp/" + recordid);
        data.append('refId', ""+recordid);
        data.append('ref', "pestamp");
        data.append('field', "atticphotos");
        
        console.log("file upload data---"+data);
       }
     }
     this.apiService.uploadFile(data).subscribe(res=>{
       console.log(res);

     })


   }
  
   /* FOR SELECT ROOF FILES OR PHOTOS FROM DEVICE */
   roofFiles(event){
    console.log(event);
    console.log(event.target.files);
    this.isRoofFileUpload = true;
     for(var i=0; i< event.target.files.length;i++){
       this.roofPhotosList.push(event.target.files[i])
     }
     //this.architecturalFileUpload= true;
     console.log(this.roofPhotosList);
   }

   /* FOR UPLOAD ROOF PHOTOS OR FILES */
   uploadRoofFiles(recordid: number,file: string){
    // console.log(this.archFiles);
    console.log(file);
     const data = new FormData();
     for(var i=0; i< this.roofPhotosList.length;i++){
       data.append("files",this.roofPhotosList[i]);
       if(i ==0){
        //data.append('files', file);
        data.append('path', "pestamp/" + recordid);
        data.append('refId', ""+recordid);
        data.append('ref', "pestamp");
        data.append('field', "roofphotos");
        
        console.log("file upload data---"+data);
       }
     }
     this.apiService.uploadFile(data).subscribe(res=>{
       console.log(res);

     })


   }

   /* FOR SELECT PHOTOS OR FILES FOR PERMIT PLAN FROM DEVICE */
   permitPlanFiles(event){
    console.log(event);
    console.log(event.target.files);
    this.isPermitPlanFileUpload = true;
     for(var i=0; i< event.target.files.length;i++){
       this.permitPlanList.push(event.target.files[i])
     }
     //this.architecturalFileUpload= true;
     console.log(this.permitPlanList);
   }

   /* FOR UPLOAD PERMIT PLAN PHOTOS OR FILES */
   uploadPermitPlanFiles(recordid: number,file: string){
    // console.log(this.archFiles);
    console.log(file);
     const data = new FormData();
     for(var i=0; i< this.permitPlanList.length;i++){
       data.append("files",this.permitPlanList[i]);
       if(i ==0){
        //data.append('files', file);
        data.append('path', "pestamp/" + recordid);
        data.append('refId', ""+recordid);
        data.append('ref', "pestamp");
        data.append('field', "permitplan");
        
        console.log("file upload data---"+data);
       }
     }
     this.apiService.uploadFile(data).subscribe(res=>{
       console.log(res);

     })


   }

   /* FOR REMOVE SELECTED PHOTOS OR FILES */
   removeArc(i,value) {
     console.log(value);
     if(value=='attic'){
    this.atticPhotosList.splice(i, 1);
     }
     else if(value=='roof'){
       this.roofPhotosList.splice(i, 1);
     }
     else{
       this.permitPlanList.splice(i, 1);
     }
  }

  /* FOR TYPE OF STAMPING RADIO BUTTONS */
  stampingTypeOption(e){
    console.log(e.target.value);
    this.stampingTypeValue = e.target.value;
    const attic = this.firstFormGroup.get('atticphotos');
    const roof = this.firstFormGroup.get('roofphotos');
    const permitplan = this.firstFormGroup.get('permitplanphotos');
    if(this.stampingTypeValue == 'structural' || this.stampingTypeValue == 'both')
    {
      attic.setValidators([Validators.required]);
      roof.setValidators([Validators.required]);
      permitplan.setValidators([Validators.required]);
    }
    else if(this.stampingTypeValue == 'electrical')
    {
      attic.clearValidators();
      attic.reset();
      roof.clearValidators();
      roof.reset();
      permitplan.setValidators([Validators.required]);
      
    }
    else{
      attic.clearValidators();
      attic.updateValueAndValidity();
      roof.clearValidators();
      roof.updateValueAndValidity();
      permitplan.clearValidators();
      permitplan.updateValueAndValidity();
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
  //   //this.utils.showHideIntercom(false);
  //   //this.subscription.unsubscribe();
  //   // if (this.designId === 0) {
  //     this.addressSubscription.unsubscribe();
  //   //}
  // }

  /* FOR MODE OF STAMPING RADIO BUTTONS*/
  stampingModeOption(e){
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
    const shipping = this.firstFormGroup.get('shippingaddress');
    const contact = this.firstFormGroup.get('contactnumber');
    const hardcopy = this.firstFormGroup.get('numberofhardcopy');
    if(this.stampingModeValue == 'hardcopy' || this.stampingModeValue == 'both')
    {
     console.log("hello")
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
        Validators.pattern("^[0-4]+$")]);
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
    else{
      shipping.clearValidators();
      shipping.updateValueAndValidity();
      contact.clearValidators();
      contact.updateValueAndValidity();
      hardcopy.clearValidators();
      hardcopy.updateValueAndValidity();
    }
  }

  /* FOR SUBMIT FORM */
  submitForm(e){
    console.log(e)
    if(this.firstFormGroup.status=='VALID')
    {
      var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
      if(e=='save'){
        console.log("hii")
        //this.utils.showLoading('Saving').then(() => {
          var data = {
            personname:this.firstFormGroup.get('name').value,
            email: this.firstFormGroup.get('email').value,
            contactnumber : this.firstFormGroup.get('contactnumber').value,
            hardcopies: parseInt(this.firstFormGroup.get('numberofhardcopy').value),
            modeofstamping:this.firstFormGroup.get('stampingmode').value,
            type: this.firstFormGroup.get('stampingtype').value,
            mountingtype:this.firstFormGroup.get('mountingtype').value,
            deliveryaddress: this.firstFormGroup.get('shippingaddress').value,
           // comments: this.firstFormGroup.get('comment').value,
            latitude: this.firstFormGroup.get('latitude').value,
            longitude: this.firstFormGroup.get('longitude').value,
            actualdelivereddate: tomorrow.toISOString(),
            source: "android",
            createdby: this.userdata.id,
            creatorparentid: this.userdata.parent.id,
             status: "created",
            outsourcedto:null,
            //paymenttype: null,
            paymentstatus:null
    }
    this.utils.showLoading('Saving').then(() => {
      this.apiService.addSiteAssessment(data).subscribe(res => {
        console.log(res);
        if(this.isAtticFileUpload)
          {
            console.log("hello",this.isAtticFileUpload)
            this.uploadAtticFiles(res.id,this.atticPhotosList[0])
          }
          if(this.isRoofFileUpload)
          {
            this.uploadRoofFiles(res.id,this.roofPhotosList[0])
          }
          if(this.isPermitPlanFileUpload)
          {
            this.uploadPermitPlanFiles(res.id,this.permitPlanList[0]);
            console.log(this.permitPlanList[0]);
          }
          setTimeout(()=>{
            this.utils.hideLoading().then(()=>{
          
        })
      },2000)
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
    else if(e == 'send')
    {
      var postData = {
        personname:this.firstFormGroup.get('name').value,
        email: this.firstFormGroup.get('email').value,
        contactnumber : this.firstFormGroup.get('contactnumber').value,
        hardcopies: parseInt(this.firstFormGroup.get('numberofhardcopy').value),
        modeofstamping:this.firstFormGroup.get('stampingmode').value,
        type: this.firstFormGroup.get('stampingtype').value,
        mountingtype:this.firstFormGroup.get('mountingtype').value,
        deliveryaddress: this.firstFormGroup.get('shippingaddress').value,
        //comments: this.firstFormGroup.get('comment').value,
        latitude: this.firstFormGroup.get('latitude').value,
        longitude: this.firstFormGroup.get('longitude').value,
        actualdelivereddate: tomorrow.toISOString(),
        source: "android",
        createdby: this.userdata.id,
        creatorparentid: this.userdata.parent.id,
         status: "outsourced",
        outsourcedto:'232',
        //paymenttype: null,
        paymentstatus:null
}
  this.apiService.addSiteAssessment(postData).subscribe(res => {
    console.log(res);
      if(this.isAtticFileUpload)
      {
        console.log("hello",this.isAtticFileUpload)
        this.uploadAtticFiles(res.id,this.atticPhotosList[0])
      }
      if(this.isRoofFileUpload)
          {
            this.uploadRoofFiles(res.id,this.roofPhotosList[0])
          }
          if(this.isPermitPlanFileUpload)
          {
            this.uploadPermitPlanFiles(res.id,this.permitPlanList[0]);
            console.log(this.permitPlanList[0]);
          }
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
    else{
      if(this.firstFormGroup.value.name == '' || this.firstFormGroup.get('name').hasError('pattern')){
        this.utils.errorSnackBar("Please check the field name")
      }
      else if(this.firstFormGroup.value.email == '' || this.firstFormGroup.get('email').hasError('pattern')){
        this.utils.errorSnackBar("Please check the field email");
      }
      else if(this.firstFormGroup.value.stampingmode == null){
            this.utils.errorSnackBar("Please select mode of stamping");
      }
      else if(this.firstFormGroup.value.stampingtype == null){
        this.utils.errorSnackBar("Please select type of stamping");
      }
      else{
        this.utils.errorSnackBar("Error");
      }
    }

  }

  //// For Address
  /* FOR SEARCH SHIPPING ADDRESS */
  updateSearchResults(event: CustomEvent) {
    //this.autoCompleteOff = true;
    console.log(this.autoCompleteOff);
    const input = event.detail.value;
    if (input === '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input },
      (predictions, status) => {
        this.autocompleteItems = [];
        this.zone.run(() => {
          predictions.forEach((prediction) => {
            this.autocompleteItems.push(prediction);
          });
        });
      });
  }

  forAutoComplete(e){
    console.log("hello",e);
    this.autoCompleteOff = true;
    
  }

  /* FOR SELECT SEARCH SHIPPING ADDRESS*/
  selectSearchResult(item) {
    console.log(item);
    this.geocoder.geocode({
      placeId: item.place_id
    }, (responses, status) => {
      console.log('respo', responses);
      this.getGeoEncoder(responses[0].geometry.location.lat(), responses[0].geometry.location.lng(), responses[0].formatted_address);
    });
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

    this.utils.showLoading('Loading').then(() => {
      this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geoEncoderOptions)
        .then((result: NativeGeocoderResult[]) => {
          let add = '';
          if (formattedAddress === '') {
            add = this.generateAddress(result[0]);
          } else {
            add = formattedAddress;
          }
          this.utils.hideLoading().then(() => {
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

  // onCancel() {
  //   console.log("hello");
  //   this.autocompleteItems = [];
  //   console.log(this.autocompleteItems)
  // }

  addressValue(){
    // }
    this.addressSubscription = this.utils.getAddressObservable().subscribe((address) => {
      console.log(address,">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
  
        // this.firstFormGroup.get('address').setValue('124/345');
        // this.firstFormGroup.get('latitude').setValue('24.553333');
        // this.firstFormGroup.get('longitude').setValue('80.5555555555');
        // this.firstFormGroup.get('country').setValue('india');
        // this.firstFormGroup.get('city').setValue('Lucknow');
        // this.firstFormGroup.get('state').setValue('UP');
        // this.firstFormGroup.get('postalcode').setValue(3232343);
       this.firstFormGroup.get('shippingaddress').setValue(address.address);
         this.firstFormGroup.get('latitude').setValue(address.lat);
         this.firstFormGroup.get('longitude').setValue(address.long);
         this.firstFormGroup.get('country').setValue(address.country);
       this.firstFormGroup.get('city').setValue(address.city);
         this.firstFormGroup.get('state').setValue(address.state);
         this.firstFormGroup.get('postalcode').setValue(address.postalcode);
    }, (error) => {
      this.firstFormGroup.get('address').setValue('');
      this.firstFormGroup.get('latitude').setValue('');
      this.firstFormGroup.get('longitude').setValue('');
      this.firstFormGroup.get('country').setValue('');
      this.firstFormGroup.get('city').setValue('');
      this.firstFormGroup.get('state').setValue('');
      this.firstFormGroup.get('postalcode').setValue('');
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

    uploadAtticphotos(recordid: number, fileobj: File, index){

    }
}
