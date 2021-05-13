import {ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AssigneeModel} from 'src/app/model/assignee.model';
import {SolarMake} from 'src/app/model/solar-make.model';
import {ApiService} from 'src/app/api.service';
import {UtilitiesService} from 'src/app/utilities.service';
import {ErrorModel} from 'src/app/model/error.model';
import {SolarMadeModel} from 'src/app/model/solar-made.model';
import {InverterMakeModel} from 'src/app/model/inverter-make.model';
import {IonSlides, NavController} from '@ionic/angular';
import {InverterMadeModel} from 'src/app/model/inverter-made.model';
import {
  FIELD_REQUIRED,
  INVALID_ANNUAL_UNIT,
  INVALID_COMPANY_NAME,
  INVALID_EMAIL_MESSAGE,
  INVALID_NAME_MESSAGE,
  INVALID_TILT_FOR_GROUND_MOUNT,
  ScheduleFormEvent,
  INVALID_ADDRESS
} from '../../model/constants';
import {Observable, Subscription} from 'rxjs';
import {StorageService} from '../../storage.service';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {DesginDataModel} from '../../model/design.model';
import {Camera, CameraOptions} from '@ionic-native/Camera/ngx';
// import {File} from '@ionic-native/file/ngx';

import {CometChat} from '@cometchat-pro/cordova-ionic-chat';
import {Clients} from 'src/app/model/clients.model';
import {map, startWith} from "rxjs/operators";
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { AddressModel } from 'src/app/model/address.model';
//import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
//import { AngularFirestore} from '@angular/fire/firestore';

export function getFileReader(): FileReader {
  const fileReader = new FileReader();
  const zoneOriginalInstance = (fileReader as any)["__zone_symbol__originalInstance"];
  return zoneOriginalInstance || fileReader;
}


@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.scss'],
})
export class DesignComponent implements OnInit, OnDestroy {
  @ViewChild('slideWithNav', { static: false }) slideWithNav: IonSlides;
  @ViewChild('slideWithNav2', { static: false }) slideWithNav2: IonSlides;
  @ViewChild('slideWithNav3', { static: false }) slideWithNav3: IonSlides;

  sliderOne: any;
  sliderTwo: any;
  sliderThree: any;


  //Configuration for each Slider
  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true
  };
  slideOptsTwo = {
    initialSlide: 1,
    slidesPerView: 2,
    loop: true,
    centeredSlides: true,
    spaceBetween: 20
  };
  slideOptsThree = {
    initialSlide: 1,
    slidesPerView: 2,
    loop: true,
    centeredSlides: true,
    spaceBetween: 20
  };

  isBeginningSlide: true;
  isEndSlide: false;

  desginForm: FormGroup;

  listOfAssignees: AssigneeModel[] = [];

  listOfSolarMake: SolarMake[] = [];
  listOfSolarMade: SolarMadeModel[] = [];

  listOfInverterMade: InverterMadeModel[] = [];
  listOfInverterMake: InverterMakeModel[] = [];
  attachmentData: any;
  private subscription: Subscription;
  private addressSubscription: Subscription;

  getCompanies: Clients[] = [];
  filteredCompanies: Observable<Clients[]>;
  designCreatedBy;
  designCreatedByUserParent;

  emailError = INVALID_EMAIL_MESSAGE;
  nameError = INVALID_NAME_MESSAGE;
  annualunitError = INVALID_ANNUAL_UNIT;
  tiltforgroundError = INVALID_TILT_FOR_GROUND_MOUNT;
  companyError = INVALID_COMPANY_NAME;
  addressError = INVALID_ADDRESS;

  fieldRequired = FIELD_REQUIRED;

  designId = 0;
  design: DesginDataModel = null;
  address: string;
  showValue: any;
  uploadbox: any;
  archFiles: any = [];
  prelimFiles: any = [];
  imageName: any;
  oldcommentid: String
  indexOfArcFiles = []
  indexOfAttachmentFile = [];
  isArcFileDelete: boolean = false;

  //attachmentName = this.desginForm.get('attachments').value;

  options: CameraOptions = {
    quality: 30,
    targetWidth: 600,
    targetHeight: 300,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.PNG,
    mediaType: this.camera.MediaType.PICTURE
  }
  fileName: any;
  moduledata: any;
  // solarmake:string='solarmake';
  // solarmade:string='solarmade';
  // invertermake:string='invertermake';
  // invertermade:string='invertermade';
  filterrecord: SolarMake[];
  modulename: any;
  solarmake: string;
  solarmade: string;
  invertermake: string;
  invertermade: string;
  onFormSubmit: boolean = true;
  solarMakeDisposable: Subscription;
  send: any;
  value: number;
  architecturalData: any;
  fieldDisabled = false;
  userdata: any;

isArchitecturalFileUpload: boolean = false;
  attachmentFileUpload: boolean= false;
  imageurls: any=[];
  arcFileUrl: any=[];

  // newprelims: Observable<any>;
  // newprelimsRef: AngularFireObject<any>;
  // //newprelimsRef:any;
  // newprelimscount = 0;

  //for address
  //user: User
  isEditMode:boolean=false;
  formatted_address:string;

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
    private apiService: ApiService,
    private utils: UtilitiesService,
    private navController: NavController,
    private storage: StorageService,
    private route: ActivatedRoute,
    private camera: Camera,
    // private file: File,
    public router:Router,
    private cdr:ChangeDetectorRef,
    private zone: NgZone,
    private nativeGeocoder: NativeGeocoder,
    //private db: AngularFireDatabase
  ) {
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var d_date = tomorrow.toISOString();
    const EMAILPATTERN = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z]+(?:\.[a-zA-Z]+)*$/;
    const NAMEPATTERN = /^[a-zA-Z. ]{3,}$/;
    const NUMBERPATTERN = '^[0-9]*$';
    const COMPANYFORMAT = '[a-zA-Z0-9. ]{3,}';
    const ADDRESSFORMAT = /^[#.0-9a-zA-Z\u00C0-\u1FFF\u2800-\uFFFD &_*#/'\s,-]+$/;
    this.desginForm = this.formBuilder.group({
      companyname: new FormControl(''),
      name: new FormControl('', [Validators.required, Validators.pattern(NAMEPATTERN)]),
      email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)]),
      solarmake: new FormControl('', [Validators.required]),
      solarmodel: new FormControl('', [Validators.required]),
      invertermake: new FormControl('', [Validators.required]),
      invertermodel: new FormControl('', [Validators.required]),
      monthlybill: new FormControl('', [Validators.required, Validators.min(0), Validators.pattern(NUMBERPATTERN)]),
      inverterscount: new FormControl('1', [Validators.required, Validators.minLength(1), Validators.maxLength(3), Validators.pattern('[0-9]{1,3}')]),
      address: new FormControl('', [Validators.required]),
      createdby: new FormControl(''),
      assignedto: new FormControl(''),
      rooftype: new FormControl(''),
      //prelimdesign: new FormControl(null),
      architecturaldesign: new FormControl(''),
      tiltofgroundmountingsystem: new FormControl(''),
      mountingtype: new FormControl('', [Validators.required]),
      // jobtype: new FormControl('', [Validators.required]),
      projecttype: new FormControl('', [Validators.required]),
      newconstruction: new FormControl('false'),
      source: new FormControl(this.utils.checkPlatform(), [Validators.required]),
      comments: new FormControl(''),
      requesttype: new FormControl('prelim'),
      latitude: new FormControl(null),
      longitude: new FormControl(null),
      country: new FormControl(''),
      state: new FormControl(''),
      city: new FormControl(''),
      postalcode: new FormControl(null),
      status: new FormControl('created'),
      attachments: new FormControl([]),
      deliverydate: new FormControl(),
      outsourcedto: new FormControl(null),
      isoutsourced: new FormControl('false'),
      designacceptancestarttime: new FormControl(null),
      creatorparentid: new FormControl(this.storage.getParentId()),
      //isonpriority:new FormControl('false'),
      paymentstatus: new FormControl(null),
      paymenttype: new FormControl(null),
      requirementtype: new FormControl('assessment'),
      oldcommentid: new FormControl(''),
      // uploadbox:new FormControl('')
    });

    // this.newprelimsRef = db.object('newprelimdesigns');
    // this.newprelims = this.newprelimsRef.valueChanges();
    // this.newprelims.subscribe(
    //   (res) => {

    //     this.newprelimscount = res.count;
    //     cdr.detectChanges();
    //   },


    // )
    //this.newprelims = this.newprelimsRef.valueChanges();
    // this.db.doc('newprelimdesigns').valueChanges().subscribe((res:any)=>{
    //   this.newprelimscount = res;

    // })
    // this.newprelims.subscribe(
    //   (res) => {

    //     this.newprelimscount = res.count;
    //   },


    // )

    this.designId = +this.route.snapshot.paramMap.get('id');
    this.getAssignees();

    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocompleteItems = [];

  }

  numberfield(event) {


  }

  ionViewDidEnter() {
    this.autocompleteItems=[];
  }



  //Move to Next slide
  slideNext(object, slideView) {
    slideView.slideNext(500).then(() => {
      this.checkIfNavDisabled(object, slideView);
    });
  }

  //Move to previous slide
  slidePrev(object, slideView) {
    slideView.slidePrev(500).then(() => {
      this.checkIfNavDisabled(object, slideView);
    });;
  }

  //Method called when slide is changed by drag or navigation
  SlideDidChange(object, slideView) {
    this.checkIfNavDisabled(object, slideView);
  }

  //Call methods to check if slide is first or last to enable disbale navigation
  checkIfNavDisabled(object, slideView) {
    this.checkisBeginning(object, slideView);
    this.checkisEnd(object, slideView);
  }

  checkisBeginning(object, slideView) {
    slideView.isBeginning().then((istrue) => {
      object.isBeginningSlide = istrue;
    });
  }
  checkisEnd(object, slideView) {
    slideView.isEnd().then((istrue) => {
      object.isEndSlide = istrue;
    });
  }


  // getmodulename(event){

  //     this.modulename= event;


  // }


  // logScrolling(e){

  // }

  // record(){
  //   this.filterrecord= this.listOfSolarMake.filter(x=>
  // }

  ngOnInit() {
    this.fieldDisabled = false;
    this.userdata = this.storage.getUser();
    // this.utils.manualInput.subscribe(data=>{
    //     if(this.modulename=='solarmake'){
    //       this.solarmake=data;
    // this.solarMakeDisposable.unsubscribe();
    // this.desginForm.patchValue({
    //   solarmake:data
    // });
    // this.solarMakeDisposable = this.desginForm.get('solarmake').valueChanges.subscribe(val => {
    //   this.getSolarMade();
    // });

    // }else if(this.modulename=='solarmade'){
    // this.solarmade=data;
    // }else if(this.modulename=='invertermake'){
    //   this.invertermake = data;
    // }else if(this.modulename=='invertermade'){
    //   this.invertermade= data;
    // }


    // })
    this.address = this.storage.getData();
    this.subscription = this.utils.getScheduleFormEvent().subscribe((event) => {
      if (event === ScheduleFormEvent.SAVE_DESIGN_FORM || event === ScheduleFormEvent.SEND_DESIGN_FORM) {
        this.send = event;
        this.addForm();

      }
      if (event === ScheduleFormEvent.PAY_EVENT) {
        this.sendtowattmonk();
      }
    });
    this.gettingClients();

    if (this.designId !== 0) {
      setTimeout(() => {
        this.getDesignDetails();
      }, 1000)

    } else {
      // if(this.onFormSubmit){
      this.solarMakeDisposable = this.desginForm.get('solarmake').valueChanges.subscribe(val => {
        this.getSolarMade();
      });
      this.desginForm.get('invertermake').valueChanges.subscribe(val => {
        this.getInverterMade();
      });
      // }
      // this.addressSubscription = this.utils.getAddressObservable().subscribe((address) => {


      //    // this.desginForm.get('address').setValue('124/345');
      //    // this.desginForm.get('latitude').setValue('24.553333');
      //    // this.desginForm.get('longitude').setValue('80.5555555555');
      //    // this.desginForm.get('country').setValue('india');
      //    // this.desginForm.get('city').setValue('Lucknow');
      //    // this.desginForm.get('state').setValue('UP');
      //    // this.desginForm.get('postalcode').setValue(3232343);
      //    this.desginForm.get('address').setValue(address.address);
      //      this.desginForm.get('latitude').setValue(address.lat);
      //      this.desginForm.get('longitude').setValue(address.long);
      //      this.desginForm.get('country').setValue(address.country);
      //    this.desginForm.get('city').setValue(address.city);
      //      this.desginForm.get('state').setValue(address.state);
      //      this.desginForm.get('postalcode').setValue(address.postalcode);
      // }, (error) => {
      //   this.desginForm.get('address').setValue('');
      //   this.desginForm.get('latitude').setValue('');
      //   this.desginForm.get('longitude').setValue('');
      //   this.desginForm.get('country').setValue('');
      //   this.desginForm.get('city').setValue('');
      //   this.desginForm.get('state').setValue('');
      //   this.desginForm.get('postalcode').setValue('');
      // });
      this.desginForm.patchValue({
        createdby: this.storage.getUserID()
      });
      this.getSolarMake();


    }
    this.formControlValueChanged();
    this.uploadcontrolvalidation();

  }

  formControlValueChanged() {
    const NUMBERPATTERN = '^[0-9]*$';
    const tiltControl = this.desginForm.get('tiltofgroundmountingsystem');
    const roofcontrol = this.desginForm.get('rooftype');
    this.desginForm.get('mountingtype').valueChanges.subscribe(
      (mode: string) => {

        if (mode === 'ground') {
          tiltControl.setValidators([Validators.required, Validators.pattern(NUMBERPATTERN)]);
          roofcontrol.clearValidators();
          roofcontrol.reset();
        } else if (mode === 'both') {
          tiltControl.setValidators([Validators.required, , Validators.min(0), Validators.pattern(NUMBERPATTERN)]);
          roofcontrol.setValidators([Validators.required]);
        } else if (mode === 'roof') {
          roofcontrol.setValidators([Validators.required]);
          tiltControl.clearValidators();
          tiltControl.reset();
        } else {
          tiltControl.clearValidators();
          roofcontrol.clearValidators();
        }
        tiltControl.updateValueAndValidity();
        roofcontrol.updateValueAndValidity();
      });

  }

  uploadcontrolvalidation() {
    const uploadboxcontrol = this.desginForm.get('architecturaldesign');
    this.desginForm.get('newconstruction').valueChanges.subscribe(
      (uploadmode: any) => {

        if (uploadmode == 'true') {
          uploadboxcontrol.setValidators([Validators.required]);
        } else if (uploadmode == 'false') {
          uploadboxcontrol.clearValidators();
          uploadboxcontrol.reset();
        }
        uploadboxcontrol.updateValueAndValidity();
      })
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    // if (this.designId === 0) {
    //   this.addressSubscription.unsubscribe();
    // }
  }

  getDesignDetails() {

    this.utils.showLoading('Getting Design Details').then(() => {
      this.apiService.getDesginDetail(this.designId).subscribe(async (result) => {
        await this.utils.hideLoading().then(() => {
          this.design = result;

          this.fieldDisabled = true;
          this.attachmentData = this.design.attachments;
          this.architecturalData = this.design.architecturaldesign;

          this.desginForm.patchValue({
            name: this.design.name,
            email: this.design.email,
            monthlybill: this.design.monthlybill,
            address: this.design.address,
            createdby: this.design.createdby,
            rooftype: this.design.rooftype,
            mountingtype: this.design.mountingtype,
            architecturaldesign: this.design.architecturaldesign,
            // jobtype: this.design.jobtype,
            tiltofgroundmountingsystem: this.design.tiltofgroundmountingsystem,
            comments: this.design.comments == '' ? '' : this.design.comments[0].message,
            projecttype: this.design.projecttype,
            latitude: this.design.latitude,
            longitude: this.design.longitude,
            country: this.design.country,
            state: this.design.state,
            city: this.design.city,
            postalcode: this.design.postalcode,
            newconstruction: this.design.newconstruction + '',
            prelimdesign: null,
            //attachments:this.design.attachments,

            attachments: this.design.attachments,
            solarmake: this.design.solarmake,
            solarmodel: this.design.solarmodel,
            invertermake: this.design.invertermake,
            invertermodel: this.design.invertermodel,
            inverterscount: this.design.inverterscount,
            status: this.design.status,
            oldcommentid: ''
          });

          this.utils.setStaticAddress(this.design.address);
          this.oldcommentid =this.design.comments == '' ? '' : this.design.comments[0].id;
          //  this.attachmentData=this.design.attachments.length==1 ? this.design.attachments[0].name + this.design.attachments[0].ext : this.design.attachments.length;
          if (this.design.assignedto !== null && this.design.assignedto !== undefined) {
            this.desginForm.patchValue({
              assignedto: this.design.assignedto.id
            });
          }
          setTimeout(() => {
            this.getSolarMakeForForm();
            this.getInverterMakeForForm();
          }, 500)
        });

      }, (error) => {
        this.utils.hideLoading();
      });
    });
  }

  getSolarMakeForForm() {

    this.apiService.getSolarMake().subscribe(response => {
      this.listOfSolarMake = response;

      this.apiService.getSolarMade(this.design.solarmake.id).subscribe(solarresponse => {
        // this.utils.hideLoading().then(()=>{
        this.listOfSolarMade = solarresponse;


        setTimeout(() => {
          this.desginForm.patchValue({
            solarmake: this.design.solarmake.id,
            solarmodel: this.design.solarmodel.id
          });
          // if(this.onFormSubmit){
          this.desginForm.get('solarmake').valueChanges.subscribe(val => {
            this.getSolarMade();
          });
          // }
        }, 500);
        // });
      }, solarResponseError => {

        const error: ErrorModel = solarResponseError.error;
        if (error.message instanceof String) {
          this.utils.errorSnackBar(error.message);
        } else if (error.message instanceof Array) {
          this.utils.errorSnackBar(error.message[0].messages[0].message);
        }
      });

    }, responseError => {
      const error: ErrorModel = responseError.error;
      if (error.message instanceof String) {
        this.utils.errorSnackBar(error.message);
      } else if (error.message instanceof Array) {
        this.utils.errorSnackBar(error.message[0].messages[0].message);
      }
    });
  }

  getInverterMakeForForm() {
    this.apiService.getInverterMake().subscribe(response => {

      this.listOfInverterMake = response;
      this.apiService.getInverterMade(this.design.invertermake.id).subscribe(makeResponse => {
        // this.utils.hideLoading();

        this.listOfInverterMade = makeResponse;

        setTimeout(() => {
          this.desginForm.patchValue({
            invertermake: this.design.invertermake.id,
            invertermodel: this.design.invertermodel.id
          });
          // if(this.onFormSubmit){
          this.desginForm.get('invertermake').valueChanges.subscribe(val => {
            this.getInverterMade();
          });
          // }
        }, 500);


      }, makeResponseError => {

        const error: ErrorModel = makeResponseError.error;
        if (error.message instanceof String) {
          this.utils.errorSnackBar(error.message);
        } else if (error.message instanceof Array) {
          this.utils.errorSnackBar(error.message[0].messages[0].message);
        }
      });
    }, responseError => {
      const error: ErrorModel = responseError.error;
      if (error.message instanceof String) {
        this.utils.errorSnackBar(error.message);
      } else if (error.message instanceof Array) {
        this.utils.errorSnackBar(error.message[0].messages[0].message);
      }
    });
  }

  saveModuleMake() {
    const found = this.listOfSolarMake.some((el: any) =>
      el.name === this.solarmake
    );



    if (!found) {
      let solarmakedata = {
        name: this.solarmake
      }
      this.apiService.postSolarMake(solarmakedata).subscribe((response: any) => {
        this.desginForm.patchValue({
          solarmake: response.id
        })
        this.saveModuleModel();
      }, err => {


      })

    } else {
      this.saveModuleModel();
    }
  }

  saveModuleModel() {
    const ismakefound = this.listOfSolarMake.some(el => el.name === this.solarmake);
    const found = this.listOfSolarMade.some((el: any) =>
      el.name === this.solarmade
    );

    if (!ismakefound || !found) {
      let solarmadedata = {
        solarmade: this.solarmade,
        solarmake: this.desginForm.get('solarmake').value
      }


      this.apiService.postSolarMade(solarmadedata).subscribe((response: any) => {
        this.desginForm.patchValue({
          solarmade: response.id

        })
        this.saveInvertermake();
      })
    } else {
      this.saveInvertermake();
    }
  }

  saveInvertermake() {
    const found = this.listOfInverterMake.some(el => el.name === this.invertermake);
    if (!found) {
      let invertermakedata = {
        invertermake: this.invertermake
      }
      this.apiService.postInverterMake(invertermakedata).subscribe((response: any) => {
        this.desginForm.patchValue({
          invertermake: response.id
        })
        this.saveInverterMade();
      })
    } else {
      this.saveInverterMade();
    }

  }

  saveInverterMade() {
    const ismakefound = this.listOfInverterMake.some(el => el.name === this.invertermake);
    const found = this.listOfInverterMade.some(el => el.name === this.invertermade)

    if (!ismakefound || !found) {
      let invertermadedata = {
        invertermade: this.invertermade,
        invertermake: this.desginForm.get('invertermake').value
      }


      this.apiService.postInverterMade(invertermadedata).subscribe((response: any) => {
        this.desginForm.patchValue({
          invertermade: response.id
        })
        this.submitform();
      })
    } else {
      this.submitform();
    }

  }

  remove(arc, i) {
    //   this.utils.showLoading('Deleting Architecture Design').then((success)=>{

    //   this.utils.hideLoading().then(()=>{
    //     this.utils.showSnackBar('File deleted successfully');
    //     this.navController.navigateRoot(["/schedule/design/",{id:this.designId}]);
    //     //this.utils.setHomepageDesignRefresh(true);
    //   });
    //   },
    // (error)=>{
    //   this.utils.hideLoading().then(()=> {
    //     this.utils.errorSnackBar('some Error Occured');
    //   });

    // });
    // });

    this.indexOfArcFiles.push(arc.id);

    this.isArcFileDelete = true;




    this.architecturalData.splice(i, 1);
    this.deleteArcFile(this.indexOfArcFiles);
  }

  removeattachment(attachment, i) {

    this.indexOfAttachmentFile.push(attachment.id);

    this.isArcFileDelete = true;





    this.attachmentData.splice(i, 1);
    this.deleteAttachmentFile(this.indexOfAttachmentFile)
  }

  deleteArcFile(index) {


    // this.utils.showLoading('Deleting Architecture Design').then((success)=>{
    for (var i = 0; i < index.length; i++) {
      var id = index[i];
      this.utils.showLoading("Deleting Architectural File").then(() => {
        this.apiService.deletePrelimImage(id).subscribe(res => {

          this.indexOfArcFiles = []
        })
      });

      // this.utils.hideLoading().then(()=>{
      //   //   this.utils.showSnackBar('File deleted successfully');
      //     // this.navController.navigateRoot(["/permitschedule",{id:this.designId}]);

      //    // this.utils.setPermitDesignDetailsRefresh(true);
      //  // });
      //   },
      (error) => {
        this.utils.hideLoading().then(() => {
          this.utils.errorSnackBar('some Error Occured');
        });
      }
    }

    // });
    //this.utils.setHomepageDesignRefresh(true);


  }

  deleteAttachmentFile(index) {

    // this.utils.showLoading('Deleting Architecture Design').then((success)=>{
    for (var i = 0; i < index.length; i++) {

      var id = index[i];
      this.utils.showLoading("Deleting Attachment File").then(() => {
        this.apiService.deletePrelimImage(id).subscribe(res => {
          this.utils.hideLoading().then(() => {

            this.indexOfAttachmentFile = []
          });
        })
      });
      (error) => {
        this.utils.hideLoading().then(() => {
          this.utils.errorSnackBar('some Error Occured');
        });
      }
    }

    // })
  }

  addForm() {
    this.onFormSubmit = false;
    // this.saveModuleMake();
     ;

    //  ;
    // this.saveModuleMake();
    // if(!this.isSelectSearchResult)
    // {
    //   this.desginForm.get('latitude').setValue(null);
    //   this.desginForm.get('longitude').setValue(null);
    //   this.desginForm.get('postalcode').setValue(null);
    // }
    this.submitform();

  }

  submitform() {
    if (this.desginForm.status === 'VALID') {
      var newConstruction = this.desginForm.get("newconstruction").value;
      this.desginForm.get("architecturaldesign").setValue('');
      if (this.designId === 0) {

        if (this.send === ScheduleFormEvent.SAVE_DESIGN_FORM) {
           ;
          this.utils.showLoading('Saving').then(() => {
            this.apiService.addDesginForm(this.desginForm.value).subscribe((response) => {
              // this.uploaarchitecturedesign(response.id,'architecturaldesign');
              // this.uploadpreliumdesign(response.id,'attachments')
              this.utils.hideLoading().then(() => {
                if (newConstruction == 'true') {
                  // if(this.architecturalFileUpload){
                  this.uploaarchitecturedesign(response, 'architecturaldesign', this.archFiles[0], 0);
                  // }
                }
                else {
                  if (this.attachmentFileUpload) {
                    this.uploadpreliumdesign(response, 'attachments', this.prelimFiles[0], 0)
                  }
                  else {
                    this.router.navigate(['/homepage/design'])
                    // this.utils.showSnackBar('Design have been saved');
                    this.utils.setHomepageDesignRefresh(true);
                  }
                }
                // this.utils.hideLoading().then(() => {

                //   this.createChatGroup(response);
                //   this.router.navigate(['/homepage/design'])
                //   // this.utils.showSnackBar('Design have been saved');
                //   this.utils.setHomepageDesignRefresh(true);
                //   // this.navController.pop();
                //   // this.utils.showSuccessModal('Desgin have been saved').then((modal) => {
                //   //   modal.present();
                //   //   modal.onWillDismiss().then((dismissed) => {
                //       // this.utils.setHomepageDesignRefresh(true);
                //   //     this.navController.pop();
                //   //   });
                //   // });

              });
            }, responseError => {
              this.utils.hideLoading();
              const error: ErrorModel = responseError.error;
              this.utils.errorSnackBar(error.message);
            });
          });
        } else if (this.send === ScheduleFormEvent.SEND_DESIGN_FORM) {
          this.apiService.addDesginForm(this.desginForm.value).subscribe((response) => {

            this.utils.hideLoading().then(() => {
              if (newConstruction == 'true') {
                this.uploaarchitecturedesign(response, 'architecturaldesign', this.archFiles[0], 0);
              } else {
                if (this.attachmentFileUpload) {
                  this.uploadpreliumdesign(response, 'attachments', this.prelimFiles[0], 0)
                } else {
                  let objToSend: NavigationExtras = {
                    queryParams: {
                      id: response.id,
                      designData: "prelim",
                      fulldesigndata: response,
                      designType: "siteassesment"
                    },
                    skipLocationChange: false,
                    fragment: 'top'
                  };


                  this.router.navigate(['/payment-modal'], {
                    state: { productdetails: objToSend }
                  });
                }
              }
            })
          }
            , responseError => {
              this.utils.hideLoading();
              const error: ErrorModel = responseError.error;
              this.utils.errorSnackBar(error.message);
            });
        }


      } else {
        if (this.send === ScheduleFormEvent.SAVE_DESIGN_FORM) {
          this.utils.showLoading('Saving').then(() => {
            this.apiService.updateDesignForm(this.desginForm.value, this.designId).subscribe(response => {
              this.utils.hideLoading().then(() => {
                if (newConstruction == 'true') {
                  this.uploaarchitecturedesign(response, 'architecturaldesign', this.archFiles[0], 0);
                }
                else {
                  if (this.attachmentFileUpload) {
                    this.uploadpreliumdesign(response, 'attachments', this.prelimFiles[0], 0)
                  }
                  else {
                    this.utils.showSnackBar('Design have been updated');
                    this.utils.setDesignDetailsRefresh(true);
                    this.navController.pop();
                  }
                }

              });
            },
              responseError => {
                this.utils.hideLoading().then(() => {
                  const error: ErrorModel = responseError.error;
                  this.utils.errorSnackBar(error.message[0].messages[0].message);
                });

              });
          });
        } else if (this.send === ScheduleFormEvent.SEND_DESIGN_FORM) {
          this.apiService.updateDesignForm(this.desginForm.value, this.designId).subscribe(response => {
            this.utils.hideLoading().then(() => {
              if (newConstruction == 'true') {
                this.uploaarchitecturedesign(response, 'architecturaldesign', this.archFiles[0], 0);
              }
              else {
                if (this.attachmentFileUpload) {
                  this.uploadpreliumdesign(response, 'attachments', this.prelimFiles[0], 0);
                }
                else {
                  let objToSend: NavigationExtras = {
                    queryParams: {
                      id: response.id,
                      designData: "prelim",
                      fulldesigndata: response
                    },
                    skipLocationChange: false,
                    fragment: 'top'
                  };


                  this.router.navigate(['/payment-modal'], {
                    state: { productdetails: objToSend }
                  });
                }
              }
            })
            // this.utils.hideLoading().then(() => {

            //   this.value=response.id;

            //   this.utils.showSnackBar('Design have been updated');
            //   //this.router.navigate(["payment-modal",{id:response.id,designData:"prelim"}]);

            //   this.utils.showSnackBar('Design have been updated');
            //   //this.router.navigate(["payment-modal",{id:response.id,designData:"prelim"}]);


          });
          responseError => {
            this.utils.hideLoading().then(() => {
              const error: ErrorModel = responseError.error;
              this.utils.errorSnackBar(error.message[0].messages[0].message);
            });

          }
        }
      }
    }

    else {
      if (this.desginForm.value.name == '' || this.desginForm.get('name').hasError('pattern')) {

        this.utils.errorSnackBar('Please check the field name.');
      } else if (this.desginForm.value.email == '' || this.desginForm.get('email').hasError('pattern')) {
        this.utils.errorSnackBar('Please check the field email.');
      } else if (this.desginForm.value.monthlybill == '' || this.desginForm.get('monthlybill').hasError('pattern')) {
        this.utils.errorSnackBar('Please check the field annual units.');
      } else if (this.desginForm.value.solarmake == '' || this.desginForm.get('solarmake').hasError('pattern')) {
        this.utils.errorSnackBar('Please check the field module make.');
      } else if (this.desginForm.value.solarmodel == '' || this.desginForm.get('solarmodel').hasError('pattern')) {
        this.utils.errorSnackBar('Please check the field module model.');
      } else if (this.desginForm.value.invertermake == '' || this.desginForm.get('invertermake').hasError('pattern')) {
        this.utils.errorSnackBar('Please check the field inverter make.');
      } else if (this.desginForm.value.invertermodel == '' || this.desginForm.get('invertermodel').hasError('pattern')) {
        this.utils.errorSnackBar('Please check the field inverter model.');
      } else if (this.desginForm.value.mountingtype == '') {
        this.utils.errorSnackBar('Please fill the mounting type.');
      } else if (this.desginForm.value.projecttype == '') {
        this.utils.errorSnackBar('Please fill the project type.');
      } else if (this.desginForm.value.tiltofgroundmountingsystem == '' || this.desginForm.get('tiltofgroundmountingsystem').hasError('pattern')) {
        this.utils.errorSnackBar('Please check the field tilt for ground mount.');
      } else if (this.desginForm.value.rooftype == '') {
        this.utils.errorSnackBar('Please fill the rooftype.');
      }
      else if (this.desginForm.value.inverterscount == '' || this.desginForm.get('inverterscount').hasError('pattern')) {
        this.utils.errorSnackBar('Please check the field inverters count.');}

       else if (this.desginForm.value.architecturaldesign == '') {
        this.utils.errorSnackBar('Please attach architectural design.');
      } else {
        this.utils.errorSnackBar('Address not found. Make sure location is on on device.');
      }
    }
  }

  showInvalidFormAlert() {
    let error = '';
    Object.keys(this.desginForm.controls).forEach((key: string) => {
      const control: AbstractControl = this.desginForm.get(key);
      if (control.invalid) {
        if (error !== '') {
          error = error + '<br/>';
        }
        if (control.errors.required === true) {
          error = error + this.utils.capitalizeWord(key) + ' is required';
        }
        if (control.errors.email === true) {
          error = error + 'Invalid email';
        }
        if (control.errors.error !== null && control.errors.error !== undefined) {
          error = error + control.errors.error;
        }
      }
    });

    this.utils.showAlert(error);
  }


  getAssignees() {
    this.apiService.getDesigners().subscribe(assignees => {
      this.listOfAssignees = [];
      // this.listOfAssignees.push(this.utils.getDefaultAssignee(this.storage.getUserID()));
      assignees.forEach(item => this.listOfAssignees.push(item));

    });
  }

  getSolarMade() {
    this.utils.showLoading('Getting module models').then((success) => {
      this.apiService.getSolarMade(this.desginForm.get('solarmake').value).subscribe(response => {
        this.utils.hideLoading().then(() => {

          this.listOfSolarMade = response;
          this.desginForm.patchValue({
            solarmodel: ''
          });
        });
      }, responseError => {
        this.utils.hideLoading();
        const error: ErrorModel = responseError.error;
        this.utils.errorSnackBar(error.message[0].messages[0].message);
      });
      // }, (error) => {

    });


  }

  ioniViewDidEnter() {


  }

  getSolarMake() {
    this.getInverterMake();

    this.apiService.getSolarMake().subscribe(response => {
      this.listOfSolarMake = response;

    }, responseError => {
      const error: ErrorModel = responseError.error;

      this.utils.errorSnackBar(error.message[0].messages[0].message);
    });
  }

  getInverterMade() {

    this.utils.showLoading('Getting inverter models').then((success) => {
      this.apiService.getInverterMade(this.desginForm.get('invertermake').value).subscribe(response => {
        this.utils.hideLoading().then(() => {

          this.listOfInverterMade = response;
          this.desginForm.patchValue({
            invertermodel: ''
          });
        });
      }, responseError => {
        this.utils.hideLoading();
        const error: ErrorModel = responseError.error;
        this.utils.errorSnackBar(error.message[0].messages[0].message);
      });
      // }, (reject) => {

    });

  }

  getInverterMake() {
    this.apiService.getInverterMake().subscribe(response => {

      this.listOfInverterMake = response;
    }, responseError => {
      const error: ErrorModel = responseError.error;
      this.utils.errorSnackBar(error.message[0].messages[0].message);
    });
  }

  // onProjectChange(event){

  // }

  getclass = () => {
    return this.address == "" ? "0px" : "50px";
  }

  eventcheck(e) {
    this.showValue = e.target.value;


  }

  showUpload(e) {
    this.uploadbox = e.target.value;


  }


  files(ev) {
    this.isArchitecturalFileUpload = true;
    for (let i = 0; i < ev.target.files.length; i++) {
      // this.archFiles.push(ev.target.files[i])
      this.getFiletype(ev.target.files[i]);
      var reader = getFileReader();
      reader.onload = (e: any) => {

        if(ev.target.files[i].name.includes('.png') || ev.target.files[i].name.includes('.jpeg') || ev.target.files[i].name.includes('.jpg') || ev.target.files[i].name.includes('.gif')){
          this.arcFileUrl.push(e.target.result);
        }else{
          this.arcFileUrl.push('/assets/icon/file.png');
        }
      }
      reader.readAsDataURL(ev.target.files[i]);
    }
    

  }

  prelimfiles(event){
    this.attachmentFileUpload = true;
    for(let i=0; i< event.target.files.length;i++){

      this.getFiletype(event.target.files[i]);
      // this.prelimFiles.push(event.target.files[i])
      var reader = getFileReader();
      reader.onload = (e: any) => {
        if (event.target.files[i].name.includes('.png') || event.target.files[i].name.includes('.jpeg') || event.target.files[i].name.includes('.jpg') || event.target.files[i].name.includes('.gif')) {

          this.imageurls.push(e.target.result);
        } else {
          this.imageurls.push('/assets/icon/file.png');
        }

      }
      reader.readAsDataURL(event.target.files[i]);
    }
    
    if (this.prelimFiles.length == 1) {
      this.fileName = event.target.files[0].name;


    } else if (this.prelimFiles.length > 1) {
      this.fileName = this.prelimFiles.length;
    } else {
      this.fileName = '';
    }


  }

   getFiletype( file){
    console.log(file)
    var extension = file.name.substring(file.name.lastIndexOf('.'));
    var mimetype = this.utils.getMimetype(extension);
    window.console.log(extension, mimetype);
    console.log([file])
    var data= new Blob([file], {
      type: mimetype,

    });
  console.log(data);
  var replaceFile = new File([data], file.name, { type: mimetype })
   if(this.attachmentFileUpload)
   {
    this.prelimFiles.push(replaceFile);
    console.log(this.prelimFiles)
   }
   else if(this.isArchitecturalFileUpload)
   {
    this.archFiles.push(replaceFile)
   }
  }


  uploaarchitecturedesign(response?: any, key?: string, fileObj?: string, index?: number) {


    if (!this.isArchitecturalFileUpload) {
      this.uploadpreliumdesign(response, key, this.prelimFiles[0], 0);
    }
    else {

      const imageData = new FormData();
      //for(var i=0; i< this.archFiles.length;i++){
      imageData.append("files", fileObj);
      // if(i ==0){
      imageData.append('path', 'designs/' + response.id);
      imageData.append('refId', response.id + '');
      imageData.append('ref', 'design');
      imageData.append('field', key);
      // }
      // }
      this.utils.showLoading("Uploading architecture" + " " + (index + 1) + " of" + " " + this.archFiles.length).then(() => {
        this.apiService.uploaddesign(imageData).subscribe(res => {

          if (index < this.archFiles.length - 1) {

            this.utils.hideLoading();
            var newIndex = index + 1;
            this.uploaarchitecturedesign(response, key, this.archFiles[newIndex], newIndex);
          } else {
            this.utils.hideLoading();
            if (this.attachmentFileUpload) {
              this.uploadpreliumdesign(response, 'attachments', this.prelimFiles[0], 0);
            }
            else {
              if (this.send === ScheduleFormEvent.SAVE_DESIGN_FORM) {
                this.router.navigate(['/homepage/design'])
                if (this.designId == 0) {
                  this.utils.showSnackBar('Design have been saved');
                }
                else {
                  this.utils.showSnackBar('Design have been updated')
                }
                this.utils.setHomepageDesignRefresh(true);
              }
              else {
                let objToSend: NavigationExtras = {
                  queryParams: {
                    id: response.id,
                    designData: "prelim",
                    fulldesigndata: response
                  },
                  skipLocationChange: false,
                  fragment: 'top'
                };


                this.router.navigate(['/payment-modal'], {
                  state: { productdetails: objToSend }
                });
              }
            }
          }
        })
      }, responseError => {
        this.utils.hideLoading();
        const error: ErrorModel = responseError.error;
        this.utils.errorSnackBar(error.message[0].messages[0].message);
      })

    }
  }

  uploadpreliumdesign(response?: any, key?: string, fileObj?: string, index?: number) {
    console.log(fileObj)
    const imageData = new FormData();
    // for(var i=0; i< this.prelimFiles.length;i++){
    imageData.append("files", fileObj);
    // if(i ==0){
    imageData.append('path', 'designs/' + response.id);
    imageData.append('refId', response.id + '');
    imageData.append('ref', 'design');
    imageData.append('field', key);
    //}
    // }
    this.utils.showLoading("Uploading attachment" + " " + (index + 1) + " of" + " " + this.prelimFiles.length).then(() => {
      this.apiService.uploaddesign(imageData).subscribe(res => {

        if (index < this.prelimFiles.length - 1) {

          this.utils.hideLoading();
          var newIndex = index + 1;
          this.uploadpreliumdesign(response, key, this.prelimFiles[newIndex], newIndex);
        } else {
          this.utils.hideLoading();
          if (this.send === ScheduleFormEvent.SAVE_DESIGN_FORM) {
            this.router.navigate(['/homepage/design'])
            if (this.designId == 0) {
              this.utils.showSnackBar('Design have been saved');
            }
            else {
              this.utils.showSnackBar('Design have been updated');
            }
            this.utils.setHomepageDesignRefresh(true);
          }
          else {
            let objToSend: NavigationExtras = {
              queryParams: {
                id: response.id,
                designData: "prelim",
                fulldesigndata: response
              },
              skipLocationChange: false,
              fragment: 'top'
            };


            this.router.navigate(['/payment-modal'], {
              state: { productdetails: objToSend }
            });
          }
        }
      }, responseError => {
        this.utils.hideLoading();
        //this.utils.hideUploadingLoading();
        const error: ErrorModel = responseError.error;
        this.utils.errorSnackBar(error.message[0].messages[0].message);
      })
    })
  }

  // pickarchitecturaldesign(){
  //   this.camera.getPicture(this.options).then((imageData) => {
  //     let base64Image = 'data:image/jpeg;base64,' + imageData;
  //     let blob = this.utils.b64tBlob(base64Image);
  //     let filename = Date.now().toString() + '.png';
  //     this.utils.showLoading('Uploading').then(()=>{
  //       this.apiService.uploaddesign(designId, key, blob, filename).subscribe(()=>{

  //       })
  //     })
  //   })

  // }

  removeArc(i) {
    this.archFiles.splice(i, 1);
    this.arcFileUrl.splice(i, 1);
  }

  removePrelim(i) {

    this.imageurls.splice(i, 1);
    this.prelimFiles.splice(i, 1);
  }

  sendtowattmonk() {
    var designacceptancestarttime = new Date();
    designacceptancestarttime.setMinutes(designacceptancestarttime.getMinutes() + 15);
    const postData = {
      outsourcedto: 232,
      isoutsourced: "true",
      status: "outsourced",
      designacceptancestarttime: designacceptancestarttime,
      paymenttype: this.utils.getPaymentMode().value,
      couponid: this.utils.getCouponId().value
    };

    this.utils.showLoading('Assigning').then(() => {
      //this.newprelimsRef.update({ count: this.newprelimscount + 1});
      this.apiService.updateDesignForm(postData, /*this.desginForm.get('id').value*/this.value).subscribe((value) => {
        this.utils.hideLoading().then(() => {
          ;


          this.utils.showSnackBar('Design request has been assigned to wattmonk successfully');//.firstname +" "+this.selectedDesigner.lastname + ' ' + 'successfully');
          this.router.navigate(['/homepage/design'])
          this.utils.setHomepageDesignRefresh(true);
        })
      }, (error) => {
        this.utils.hideLoading();
      });
    })
  }

  Pay() {
    if (this.desginForm.status === 'VALID') {
      //this.router.navigate(["payment-modal",{designData:"prelim"}]);
      let objToSend: NavigationExtras = {
        queryParams: {
          //id:response.id,
          designData: "prelim"
        },
        skipLocationChange: false,
        fragment: 'top'
      };


      this.router.navigate(['/payment-modal'], {
        state: { productdetails: objToSend }
      });
    } else {
      if (this.desginForm.value.name == '' || this.desginForm.get('name').hasError('pattern')) {

        this.utils.errorSnackBar('Please check the field name.');
      } else if (this.desginForm.value.email == '' || this.desginForm.get('email').hasError('pattern')) {
        this.utils.errorSnackBar('Please check the field email.');
      } else if (this.desginForm.value.monthlybill == '' || this.desginForm.get('monthlybill').hasError('pattern')) {
        this.utils.errorSnackBar('Please check the field annual units.');
      }else if(this.desginForm.value.address=='' || this.desginForm.value.address==null){
        this.utils.errorSnackBar('Please check the field address')
      } else if (this.desginForm.value.inverterscount == '' || this.desginForm.get('inverterscount').hasError('pattern')) {
        this.utils.errorSnackBar('Please check the field inverters count.');
      } else if (this.desginForm.value.modulemake == '' || this.desginForm.get('modulemake').hasError('pattern')) {
        this.utils.errorSnackBar('Please check the field module make.');
      } else if (this.desginForm.value.modulemodel == '' || this.desginForm.get('modulemodel').hasError('pattern')) {
        this.utils.errorSnackBar('Please check the field module model.');
      } else if (this.desginForm.value.invertermake == '' || this.desginForm.get('invertermake').hasError('pattern')) {
        this.utils.errorSnackBar('Please check the field inverter make.');
      } else if (this.desginForm.value.invertermodel == '' || this.desginForm.get('invertermodel').hasError('pattern')) {
        this.utils.errorSnackBar('Please check the field inverter model.');
      } else if (this.desginForm.value.mountingtype == '') {
        this.utils.errorSnackBar('Please fill the mounting type.');
      } else if (this.desginForm.value.projecttype == '') {
        this.utils.errorSnackBar('Please fill the project type.');
      } else if (this.desginForm.value.tiltofgroundmountingsystem == '' || this.desginForm.get('tiltofgroundmountingsystem').hasError('pattern')) {
        this.utils.errorSnackBar('Please check the field tilt for ground mount.');
      } else if (this.desginForm.value.rooftype == '') {
        this.utils.errorSnackBar('Please fill the rooftype.');
      } else if (this.desginForm.value.architecturaldesign == []) {
        this.utils.errorSnackBar('Please attach architectural design.');
      } else {
        this.utils.errorSnackBar('Address not found. Make sure location is on on device.');
      }
    }
  }

  createChatGroup(design: DesginDataModel) {
    var GUID = 'prelim' + "_" + new Date().getTime();

    var address = design.address.substring(0, 60);
    var groupName = design.name + "_" + address;

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

  gettingClients() {
    this.apiService.getClients().subscribe(res => {
      this.getCompanies = res;

      this.filteredCompanies = this.desginForm.get('companyname').valueChanges.pipe(
        startWith(""),
        map(value => (typeof value === "string" ? value : value.companyid)),
        map(companyname => (companyname ? this._filterCompanies(companyname) : this.getCompanies.slice()))
      );
    },
      error => {
        // this.utils.errorSnackBar("Error");
      }
    );
  }

  proxyValue: any;

  onCompanyChanged(event$) {

    this.proxyValue = event$.detail.value.companyname;
    this.designCreatedBy = event$.detail.value.companyid;
    this.designCreatedByUserParent = event$.detail.value.parentid;
    if (this.designCreatedBy !== null && this.designCreatedByUserParent !== null) {
      var designacceptancestarttime = new Date();
      designacceptancestarttime.setMinutes(designacceptancestarttime.getMinutes() + 15);
      var tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      var d_date = tomorrow.toISOString();
      this.desginForm.patchValue({
        createdby: this.designCreatedBy,
        creatorparentid: this.designCreatedByUserParent,
        status: "requestaccepted",
        outsourcedto: "232",
        isoutsourced: "true",
        designacceptancestarttime: designacceptancestarttime,
        deliverydate:d_date
      })
    }
  }

  private _filterCompanies(companyname: string): Clients[] {
    return this.getCompanies.filter(
      company => company.companyname.toLowerCase().indexOf(companyname) != -1
    );
  }

   //// For Address
    /* FOR SEARCH SHIPPING ADDRESS */
    updateSearchResults(event) {
      //this.autoCompleteOff = true;

     // if(this.designId == 0 || !this.isSelectSearchResult)
    //  {
      const input = event.detail.value;

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
        if(!this.isSelectSearchResult)
        {
          const address: AddressModel = {
            address: this.desginForm.get("address").value,
            lat: null,
            long: null,
            country: '',
            state: '',
            city: '',
            postalcode: null
          };
          this.utils.setAddress(address);
          this.addressValue();
        }
   //   }
    }

    forAutoComplete(e){

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
        this.autocompleteItems = [];
      });
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

    addressValue(){
      // }
      this.addressSubscription = this.utils.getAddressObservable().subscribe((address) => {


          // this.firstFormGroup.get('address').setValue('124/345');
          // this.firstFormGroup.get('latitude').setValue('24.553333');
          // this.firstFormGroup.get('longitude').setValue('80.5555555555');
          // this.firstFormGroup.get('country').setValue('india');
          // this.firstFormGroup.get('city').setValue('Lucknow');
          // this.firstFormGroup.get('state').setValue('UP');
          // this.firstFormGroup.get('postalcode').setValue(3232343);
         this.desginForm.get('address').setValue(address.address);
           this.desginForm.get('latitude').setValue(address.lat);
           this.desginForm.get('longitude').setValue(address.long);
           this.desginForm.get('country').setValue(address.country);
         this.desginForm.get('city').setValue(address.city);
           this.desginForm.get('state').setValue(address.state);
           this.desginForm.get('postalcode').setValue(address.postalcode);
      }, (error) => {
        this.desginForm.get('address').setValue('');
        this.desginForm.get('latitude').setValue(null);
        this.desginForm.get('longitude').setValue(null);
        this.desginForm.get('country').setValue('');
        this.desginForm.get('city').setValue('');
        this.desginForm.get('state').setValue('');
        this.desginForm.get('postalcode').setValue(null);
      });
      // this.firstFormGroup.patchValue({
      //   createdby: this.storage.getUserID()
      // });
   // this.autocompleteItems = [];
      this.autoCompleteOff = false;

      //this.getSolarMake();

      }

      onBlur()
      {
        setTimeout(() => {
          this.autocompleteItems = [];
        }, 100);
      }
}

