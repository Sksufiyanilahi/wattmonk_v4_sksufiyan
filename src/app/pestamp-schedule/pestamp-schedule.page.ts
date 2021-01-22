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
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Pestamp } from '../model/pestamp.model';
import { NetworkdetectService } from '../networkdetect.service';
import { NavController } from '@ionic/angular';

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

  deactivateNetworkSwitch: Subscription;
  netSwitch: any;

  userdata:any;
  designId=0;
  design:Pestamp=null;

  atticData:any;
  roofData:any;
  permitPlanData:any;

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
              private apiService: ApiService,
              private route: ActivatedRoute,
              private network:NetworkdetectService,
              private navController:NavController,
              private router:Router) 
              { 
    const MAILFORMAT = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z]+(?:\.[a-zA-Z]+)*$/;
    this.firstFormGroup = this.formBuilder.group({
      name:new FormControl('',[Validators.required, Validators.pattern("^[a-zA-Z. ]{3,}$")]),
      email:new FormControl('',[Validators.required, Validators.pattern(MAILFORMAT)]),
      stampingmode:new FormControl(null,[Validators.required]),
      numberofhardcopy:new FormControl(''),
      shippingaddress:new FormControl(''),
      contactnumber : new FormControl(null),
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
    mountingtype:new FormControl('',[Validators.required]),
    propertytype:new FormControl('',[Validators.required])
    // })
    // this.secondFormGroup = this.formBuilder.group({
     
    })
    this.designId = +this.route.snapshot.paramMap.get('id');

   
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocompleteItems = [];
  }

  ionViewDidEnter(){
    this.deactivateNetworkSwitch = this.network.networkSwitch.subscribe(data=>{
      this.netSwitch = data;
      console.log(this.netSwitch);
      this.utils.showHideIntercom(true);
    })
  }

  ngOnInit() {
    this.userdata = this.storage.getUser();
    console.log(this.userdata);

    if (this.designId !== 0) {
      setTimeout(()=>{
        this.getDesignDetails();
      },1000)

    }else{
      this.addressValue();
    }
  }

  /* Getting Design Details */
  getDesignDetails()
  {
    this.utils.showLoading('Getting Design Details').then(() => {
      this.apiService.getPestampDetails(this.designId).subscribe(async (result) => {
        await this.utils.hideLoading().then(()=>{
          this.design = result;
          console.log(this.design);
          this.atticData = this.design.atticphotos;
          this.roofData = this.design.roofphotos;
          this.permitPlanData = this.design.permitplan;
          console.log(this.permitPlanData)
          this.firstFormGroup.patchValue({
            name: this.design.personname,
            email: this.design.email,
            stampingmode : this.design.modeofstamping,
            atticphotos : this.design.atticphotos,
            roofphotos : this.design.roofphotos,
            permitplanphotos : this.design.permitplan,
            stampingtype : this.design.type,
            numberofhardcopy : this.design.hardcopies,
            shippingaddress: this.design.deliveryaddress,
            contactnumber:this.design.contactnumber,
            createdby: this.design.createdby,
            mountingtype:this.design.mountingtype,
            propertytype:this.design.propertytype,
            // architecturaldesign:this.design.architecturaldesign,
            comment:this.design.comments==''?'': this.design.comments[0].message,
            // type: this.design.type,
            latitude: this.design.latitude,
            longitude: this.design.longitude,
            country: this.design.country,
            state: this.design.state,
            city: this.design.city,
            postalcode:this.design.postalcode,
            //attachments:this.design.attachments,
          });
        })
      }, (error) => {
        this.utils.hideLoading();
      })
    })
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

  goBack() {
    this.navController.pop();
    
   }

  /* FOR SUBMIT FORM */
  submitForm(e){
    console.log(e)
    if(this.firstFormGroup.status=='VALID')
    {
      var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    let contactnumber = this.firstFormGroup.get('contactnumber').value;
    if(this.designId === 0){
      if(e=='save'){
        console.log("hii")
        //this.utils.showLoading('Saving').then(() => {
          var data = {
            personname:this.firstFormGroup.get('name').value,
            email: this.firstFormGroup.get('email').value,
            contactnumber : contactnumber,
            hardcopies: parseInt(this.firstFormGroup.get('numberofhardcopy').value),
            modeofstamping:this.firstFormGroup.get('stampingmode').value,
            type: this.firstFormGroup.get('stampingtype').value,
            mountingtype:this.firstFormGroup.get('mountingtype').value,
            deliveryaddress: this.firstFormGroup.get('shippingaddress').value,
            propertytype:this.firstFormGroup.get('propertytype').value,
            comments: this.firstFormGroup.get('comment').value,
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
            this.utils.hideLoading().then(() => {
              console.log('Res', res);
              //this.createChatGroup(response);
              this.router.navigate(['/pestamp-homepage'])
              this.utils.showSnackBar('Pe Stamp have been Created');
              // this.utils.showSnackBar('Design have been saved');
              this.utils.setPeStampRefresh(true);
              // this.navController.pop();
              // this.utils.showSuccessModal('Desgin have been saved').then((modal) => {
              //   modal.present();
              //   modal.onWillDismiss().then((dismissed) => {
                  // this.utils.setHomepageDesignRefresh(true);
              //     this.navController.pop();
              //   });
              // });

            });
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
        propertytype:this.firstFormGroup.get('propertytype').value,
        deliveryaddress: this.firstFormGroup.get('shippingaddress').value,
        comments: this.firstFormGroup.get('comment').value,
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
  this.apiService.addSiteAssessment(postData).subscribe((res:any) => {
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
          //this.router.navigate(['pestamp-payment-modal',{isConfirmed: false, isLater: false, ispestamp: true, pestampid: res.id}]);
          let objToSend: NavigationExtras = {
            queryParams: {
            designData:res
            },
            skipLocationChange: false,
            fragment: 'top' 
        };
    
    
    this.router.navigate(['/pestamp-payment-modal'], { 
      state: { productdetails: objToSend }
    });
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
      if(e=='save'){
      var data = {
        personname:this.firstFormGroup.get('name').value,
        email: this.firstFormGroup.get('email').value,
        contactnumber : contactnumber,
        hardcopies: parseInt(this.firstFormGroup.get('numberofhardcopy').value),
        modeofstamping:this.firstFormGroup.get('stampingmode').value,
        type: this.firstFormGroup.get('stampingtype').value,
        mountingtype:this.firstFormGroup.get('mountingtype').value,
        deliveryaddress: this.firstFormGroup.get('shippingaddress').value,
        propertytype:this.firstFormGroup.get('propertytype').value,
        comments: this.firstFormGroup.get('comment').value,
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
  this.apiService.updatePestamps(this.designId,data).subscribe(res => {
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
        this.utils.hideLoading().then(() => {
          console.log('Res', res);
          //this.createChatGroup(response);
          this.router.navigate(['/pestamp-homepage'])
          this.utils.showSnackBar('Pe Stamp have been updated');
          // this.utils.showSnackBar('Design have been saved');
          this.utils.setPeStampRefresh(true);
          // this.navController.pop();
          // this.utils.showSuccessModal('Desgin have been saved').then((modal) => {
          //   modal.present();
          //   modal.onWillDismiss().then((dismissed) => {
              // this.utils.setHomepageDesignRefresh(true);
          //     this.navController.pop();
          //   });
          // });

        });
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
    else if(e == 'send'){
      var postData = {
        personname:this.firstFormGroup.get('name').value,
        email: this.firstFormGroup.get('email').value,
        contactnumber : this.firstFormGroup.get('contactnumber').value,
        hardcopies: parseInt(this.firstFormGroup.get('numberofhardcopy').value),
        modeofstamping:this.firstFormGroup.get('stampingmode').value,
        type: this.firstFormGroup.get('stampingtype').value,
        mountingtype:this.firstFormGroup.get('mountingtype').value,
        deliveryaddress: this.firstFormGroup.get('shippingaddress').value,
        propertytype:this.firstFormGroup.get('propertytype').value,
        comments: this.firstFormGroup.get('comment').value,
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
  this.apiService.updatePestamps(this.designId,postData).subscribe(res => {
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
          let objToSend: NavigationExtras = {
            queryParams: {
            designData:res
            },
            skipLocationChange: false,
            fragment: 'top' 
        };
    
    
    this.router.navigate(['/pestamp-payment-modal'], { 
      state: { productdetails: objToSend }
    });
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
      else if(this.firstFormGroup.value.mountingtype == '')
      {
        this.utils.errorSnackBar("Please select mounting type");
      }
      else if(this.firstFormGroup.value.propertytype == '')
      {
        this.utils.errorSnackBar("Please select property type");
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

  onCancel() {
    console.log("hello");
    this.autocompleteItems = [];
    console.log(this.autocompleteItems)
  }

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
