import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {NavController, Platform, ToastController} from '@ionic/angular';
import {Observable, Subscription} from 'rxjs';
import {ApiService} from '../api.service';
import {AssigneeModel} from '../model/assignee.model';
import {
  FIELD_REQUIRED,
  INVALID_ANNUAL_UNIT,
  INVALID_COMPANY_NAME,
  INVALID_EMAIL_MESSAGE,
  INVALID_MODULE_AND_INVERTER,
  INVALID_NAME_MESSAGE,
  INVALID_PHONE_NUMBER,
  INVALID_TILT_FOR_GROUND_MOUNT,
  ScheduleFormEvent
} from '../model/constants';
import {DesginDataModel} from '../model/design.model';
import {Invertermake} from '../model/inverter-made.model';
import {InverterMakeModel} from '../model/inverter-make.model';
import {Modulemake} from '../model/solar-made.model';
import {SolarMake} from '../model/solar-make.model';
import {StorageService} from '../storage.service';
import {UtilitiesService} from '../utilities.service';
import {map, startWith} from "rxjs/operators";
import {ErrorModel} from '../model/error.model';
import {NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult} from '@ionic-native/native-geocoder/ngx';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {AddressModel} from '../model/address.model';
import {Diagnostic} from '@ionic-native/diagnostic/ngx';
import {CometChat} from '@cometchat-pro/cordova-ionic-chat';
import {NetworkdetectService} from '../networkdetect.service';
import {Clients} from '../model/clients.model';
import {MixpanelService} from '../utilities/mixpanel.service';
//import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';


// export interface DesignFormData {
//   isEditMode: boolean;
//   isDataUpdated: boolean;
//   generateAutocad: boolean;
//   user: User;
//   design: DesginDataModel;
// }

@Component({
  selector: 'app-permitschedule',
  templateUrl: './permitschedule.page.html',
  styleUrls: ['./permitschedule.page.scss'],
})

export class PermitschedulePage implements OnInit {
  desginForm: FormGroup

  listOfAssignees: AssigneeModel[] = [];

//  listOfSolarMake: SolarMake[] = [];
//  listOfSolarMade: SolarMadeModel[] = [];

//   listOfInverterMade: InverterMadeModel[] = [];
//  listOfInverterMake: InverterMakeModel[] = [];

  modulemakes: SolarMake[] = [];
  filteredModuleMakes: Observable<SolarMake[]>;
  selectedModuleMakeID: number;

  modulemodels: Modulemake[] = [];
  filteredModuleModels: Observable<Modulemake[]>;
  selectedModuleModelID: number;

  invertermakes: InverterMakeModel[] = [];
  filteredInverterMakes: Observable<InverterMakeModel[]>;
  selectedInverterMakeID: number;

  invertermodels: Invertermake[] = [];
  filteredInverterModels: Observable<Invertermake[]>;
  selectedInverterModelID: number;

  //filteredCompanies: Clients[] = [];
  getCompanies: Clients[] = [];
  filteredCompanies: Observable<Clients[]>;
  designCreatedBy;
  designCreatedByUserParent;
  oldcommentid: any

  private subscription: Subscription;
  private addressSubscription: Subscription;

  emailError = INVALID_EMAIL_MESSAGE;
  nameError = INVALID_NAME_MESSAGE;
  annualunitError = INVALID_ANNUAL_UNIT;
  tiltforgroundError = INVALID_TILT_FOR_GROUND_MOUNT;
  phoneError = INVALID_PHONE_NUMBER;
  moduleAndInverterError = INVALID_MODULE_AND_INVERTER;
  companyError = INVALID_COMPANY_NAME;

  fieldRequired = FIELD_REQUIRED;

  fileName: any;
  archFiles: any = [];
  permitFiles: any = [];
  designId = 0;
  design: DesginDataModel = null;
  onFormSubmit: boolean = true;
  address = '';
  showValue: any;
  uploadbox: any;
  value: number;
  formValue: string;
  fieldDisabled = false;
  attachmentData: any;
  architecturalData: any;
  send: any;
  tabsDisabled = false;
  //user: User
  isEditMode: boolean = false;
  isArcFileDelete: boolean = false;
  indexOfArcFiles = [];
  indexOfAttachmentFiles = [];
  isAttachememtDelete: boolean = false;
  //data:DesignFormData;

  userdata: any;
  isEdit: boolean = true
  data: any;
  surveydata: any
  surveydatapresent: boolean = false

  solarMakeDisposable: Subscription;
  imageurls: any=[];
  arcFileUrl: any=[];

  // Geocoder configuration
  geoEncoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };
  architecturalFileUpload: boolean = false;
  attachmentFileUpload: boolean = false;
  netSwitch: any;
  deactivateNetworkSwitch: Subscription;
  nonEditableField: any;
  // newpermits: Observable<any>;
  // newpermitsRef: AngularFireObject<any>;
  // newpermitscount = 0;


  constructor(private formBuilder: FormBuilder,
              private apiService: ApiService,
              private utils: UtilitiesService,
              private navController: NavController,
              private storage: StorageService,
              private route: ActivatedRoute,
              private router: Router,
              private nativeGeocoder: NativeGeocoder,
              private diagnostic: Diagnostic,
              private geolocation: Geolocation,
              private platform: Platform,
              private toastController: ToastController,
              private cdr: ChangeDetectorRef,
              private network: NetworkdetectService,
              private mixpanelService: MixpanelService
              //private db:AngularFireDatabase
              //private data: DesignFormData
  ) {


    const ADDRESSFORMAT = /^[#.0-9a-zA-Z\u00C0-\u1FFF\u2800-\uFFFD \s,-]+$/;
    const EMAILPATTERN = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z]+(?:\.[a-zA-Z]+)*$/;
    const NAMEPATTERN = /^[a-zA-Z. ]{3,}$/;
    const NUMBERPATTERN = '^[0-9]+$';
    const COMPANYFORMAT = '[a-zA-Z0-9. ]{3,}';
    this.desginForm = this.formBuilder.group({
      companyname: new FormControl(''),
      name: new FormControl('', [Validators.required, Validators.pattern(NAMEPATTERN)]),
      email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)]),
      phone: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(15), Validators.pattern('^[0-9]{8,15}$')]),
      inverterscount: new FormControl('1', [Validators.required, Validators.minLength(1), Validators.maxLength(3), Validators.pattern('[0-9]{1,3}')]),
      modulemake: new FormControl("", [
        Validators.required,
        Validators.pattern("^[a-zA-Z-_ ]{3,}$")
      ]),
      modulemodel: new FormControl("", [
        Validators.required,
        Validators.pattern("^[a-z0-9A-Z-_([)/. {\\]}]{5,}$")
      ]),
      invertermake: new FormControl("", [
        Validators.required,
        Validators.pattern("^[a-zA-Z-_ ]{3,}$")
      ]),
      invertermodel: new FormControl("", [
        Validators.required,
        // Validators.pattern("^[a-z0-9A-Z-_([)/. {\\]}]{5,}$")
        Validators.pattern("^[a-z0-9A-Z+-_([)/. {\\]}]{3,}$")
      ]),
      monthlybill: new FormControl('', [Validators.required, Validators.min(0), Validators.pattern(NUMBERPATTERN)]),
      address: new FormControl('', [Validators.required]),
      createdby: new FormControl(this.storage.getUserID()),
      assignedto: new FormControl(''),
      rooftype: new FormControl(''),
      architecturaldesign: new FormControl(''),
      tiltofgroundmountingsystem: new FormControl(''),
      mountingtype: new FormControl('', [Validators.required]),
      jobtype: new FormControl('', [Validators.required]),
      projecttype: new FormControl('', [Validators.required]),
      newconstruction: new FormControl('false'),
      source: new FormControl('android', [Validators.required]),
      comments: new FormControl(''),
      requesttype: new FormControl('permit'),
      latitude: new FormControl(''),
      longitude: new FormControl(''),
      country: new FormControl(''),
      state: new FormControl(''),
      city: new FormControl(''),
      postalcode: new FormControl(''),
      status: new FormControl('created'),
      attachments: new FormControl([]),
      issurveycompleted: new FormControl('false'),
      creatorparentid: new FormControl(this.storage.getParentId()),
    })
    // //For Counts
    // this.newpermitsRef = db.object('newpermitdesigns');
    //   this.newpermits = this.newpermitsRef.valueChanges();
    //   this.newpermits.subscribe(
    //     (res) => {
    //       console.log(res);
    //       this.newpermitscount = res.count;
    //       cdr.detectChanges();
    //     },
    //     (err) => console.log(err),
    //     () => console.log('done!')
    //   )

    this.designId = +this.route.snapshot.paramMap.get('id');

    // const url = this.router.url;
    //   const splittedUrl = url.split('/');
    //   console.log(splittedUrl);
    //   this.tabsDisabled = splittedUrl.length === 4;
    //   this.currentTab = splittedUrl[2];
    // }
  }

  ionViewDidEnter() {
    this.deactivateNetworkSwitch = this.network.networkSwitch.subscribe(data => {
      this.netSwitch = data;
      console.log(this.netSwitch);
    })
  }


  ngOnInit() {
    this.surveydatapresent = false
    this.data = this.router.getCurrentNavigation().extras.state;
    console.log(this.data)
    if (this.data != undefined) {
      this.surveydata = this.data.productdetails.queryParams.surveyData;
      this.tabsDisabled = this.data.productdetails.queryParams.tabsDisabled;
      this.nonEditableField = this.data.productdetails.queryParams.nonEditableField;
      console.log(this.surveydata)
      this.surveydatapresent = true


    }

    this.fieldDisabled = false;
    this.userdata = this.storage.getUser();
    console.log(this.userdata)
    this.requestLocationPermission();
    if (this.designId != 0) {
      this.tabsDisabled = true;
      this.subscription = this.utils.getStaticAddress().subscribe((address) => {
        this.address = address;
        this.storage.setData(this.address);
      });
    } else if (this.surveydatapresent) {
      this.subscription = this.utils.getStaticAddress().subscribe((address) => {
        this.address = address;
        this.storage.setData(this.address);
      });
    } else {
      // await this.getGeoLocation();
      this.subscription = this.utils.getAddressObservable().subscribe((address) => {
        console.log(address);
        this.address = address.address;
        this.storage.setData(this.address);
      });
    }

    this.subscription = this.utils.getScheduleFormEvent().subscribe((event) => {
      if (event === ScheduleFormEvent.SAVE_PERMIT_FORM) {
        this.send = event;
        this.saveModuleMake();

      }
      if (event === ScheduleFormEvent.SEND_PERMIT_FORM) {
        this.sendtowattmonk();
      }
    });


    //this.addressValue();
    this.gettingClients();
    if (this.designId !== 0) {
      setTimeout(() => {
        this.getDesignDetails();
      }, 1000)

    } else if (this.surveydatapresent) {
      this.getsurveydata();
    } else {
      this.addressValue();
    }

    setTimeout(() => {
      this.fetchModuleMakesData();
      this.fetchInverterMakesData();
      if (this.designId !== 0) {
        this.loadModuleModelsData();
        this.loadInverterModelsData();
      }
    });
    // else{
    //   this.data.isEditMode=false;
    // }


    this.formControlValueChanged();
    this.uploadcontrolvalidation();
  }

  formControlValueChanged() {
    const NUMBERPATTERN = '^[0-9]*$';
    const tiltControl = this.desginForm.get('tiltofgroundmountingsystem');
    const roofcontrol = this.desginForm.get('rooftype');
    this.desginForm.get('mountingtype').valueChanges.subscribe(
      (mode: string) => {
        console.log(mode);
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


  getsurveydata() {

    this.desginForm.patchValue({
      name: this.surveydata.name,
      email: this.surveydata.email,
      monthlybill: this.surveydata.monthlybill,
      address: this.surveydata.address,
      phone: this.surveydata.phonenumber,
      createdby: this.surveydata.createdby.id,
      rooftype: this.surveydata.rooftype,
      mountingtype: this.surveydata.mountingtype,
      architecturaldesign: this.surveydata.architecturaldesign,
      jobtype: this.surveydata.jobtype,
      tiltofgroundmountingsystem: this.surveydata.tiltofgroundmountingsystem,

      projecttype: this.surveydata.projecttype,
      latitude: this.surveydata.latitude,
      longitude: this.surveydata.longitude,
      country: this.surveydata.country,
      state: this.surveydata.state,
      city: this.surveydata.city,
      postalcode: this.surveydata.postalCode,
      issurveycompleted: true,
      //attachments:this.design.attachments,

      attachments: this.surveydata.attachments,

    });
    this.utils.setStaticAddress(this.surveydata.address);
    if (this.desginForm.get('email').value == '') {
      this.fieldDisabled = false;
    } else {
      this.fieldDisabled = true;
    }
  }

  uploadcontrolvalidation() {
    const uploadboxcontrol = this.desginForm.get('architecturaldesign');
    this.desginForm.get('newconstruction').valueChanges.subscribe(
      (uploadmode: any) => {
        console.log(uploadmode);
        if (uploadmode == 'true') {
          uploadboxcontrol.setValidators([Validators.required]);
        } else if (uploadmode == 'false') {
          uploadboxcontrol.clearValidators();
          uploadboxcontrol.reset();
        }
        uploadboxcontrol.updateValueAndValidity();
      })
  }

  displayFnModuleMake(modulemake: SolarMake): string {
    return modulemake && modulemake.name ? modulemake.name : "";
  }

  private _filterModuleMake(name: string): SolarMake[] {
    const filterValue = name.toLowerCase();

    return this.modulemakes.filter(
      modulemake => modulemake.name.toLowerCase().indexOf(filterValue) != -1
    );
  }

  displayFnModuleModel(modulemodel: Modulemake): string {
    return modulemodel && modulemodel.name ? modulemodel.name : "";
  }

  private _filterModuleModel(name: string): Modulemake[] {
    const filterValue = name.toLowerCase();

    return this.modulemodels.filter(
      modulemodel => modulemodel.name.toLowerCase().indexOf(filterValue) != -1
    );
  }

  displayFnInverterMake(invertermake: InverterMakeModel): string {
    return invertermake && invertermake.name ? invertermake.name : "";
  }

  private _filterInverterMake(name: string): InverterMakeModel[] {
    const filterValue = name.toLowerCase();

    return this.invertermakes.filter(
      invertermake => invertermake.name.toLowerCase().indexOf(filterValue) != -1
    );
  }

  displayFnInverterModel(invertermodel: Invertermake): string {
    return invertermodel && invertermodel.name ? invertermodel.name : "";
  }

  private _filterInverterModel(name: string): Invertermake[] {
    const filterValue = name.toLowerCase();

    return this.invertermodels.filter(
      invertermodel => invertermodel.name.toLowerCase().indexOf(filterValue) != -1
    );
  }


  fetchModuleMakesData() {
    this.apiService.getSolarMake().subscribe(
      response => {
        console.log("Hiii");
        this.modulemakes = response;
        this.filteredModuleMakes = this.desginForm.get('modulemake').valueChanges.pipe(
          startWith(""),
          map(value => (typeof value === "string" ? value : value.name)),
          map(name => (name ? this._filterModuleMake(name) : this.modulemakes.slice()))
        );
      },
      error => {
        this.utils.errorSnackBar("Error");
      }
    );
  }

  fetchModuleModelsData(_event: any, make) {
    this.desginForm.patchValue({modulemodel: " "})
    if (_event.isUserInput) {
      this.desginForm.get('modulemodel').setValue("");
      if (this.isEditMode) {
        this.selectedModuleModelID = null;
      }
      this.modulemodels = [];
      this.selectedModuleMakeID = make.id;
      this.apiService.getSolarMade(make.id).subscribe(
        response => {
          console.log("Hiii");
          this.modulemodels = response;
          this.filteredModuleModels = this.desginForm.get('modulemodel').valueChanges.pipe(
            startWith(""),
            map(value => (typeof value === "string" ? value : value.name)),
            map(name => (name ? this._filterModuleModel(name) : this.modulemodels.slice()))
          );
        },
        error => {
          this.utils.errorSnackBar("Error");
        }
      );
    }
  }

  loadModuleModelsData() {
    this.modulemodels = [];
    this.apiService.getSolarMade(this.selectedModuleMakeID).subscribe(
      response => {
        console.log("Hiii");
        this.modulemodels = response;
        this.filteredModuleModels = this.desginForm.get('modulemodel').valueChanges.pipe(
          startWith(""),
          map(value => (typeof value === "string" ? value : value.name)),
          map(name => (name ? this._filterModuleModel(name) : this.modulemodels.slice()))
        );
      },
      error => {
        this.utils.errorSnackBar("Error");
      }
    );
  }

  setSelectedModuleModel(model) {
    this.selectedModuleModelID = model.id;
  }

  fetchInverterMakesData() {
    this.apiService.getInverterMake().subscribe(
      response => {
        console.log("Hiii");
        this.invertermakes = response;
        this.filteredInverterMakes = this.desginForm.get('invertermake').valueChanges.pipe(
          startWith(""),
          map(value => (typeof value === "string" ? value : value.name)),
          map(name => (name ? this._filterInverterMake(name) : this.invertermakes.slice()))
        );
      },
      error => {
        this.utils.errorSnackBar("Error");
      }
    );
  }

  fetchInverterModelsData(_event: any, make) {
    this.desginForm.patchValue({invertermodel: " "})
    if (_event.isUserInput) {
      this.desginForm.get('invertermodel').setValue("");
      if (this.isEditMode) {
        this.selectedInverterModelID = null;
      }
      this.invertermodels = [];
      this.selectedInverterMakeID = make.id;
      this.apiService.getInverterMade(make.id).subscribe(
        response => {
          console.log("Hiii");
          this.invertermodels = response;
          this.filteredInverterModels = this.desginForm.get('invertermodel').valueChanges.pipe(
            startWith(""),
            map(value => (typeof value === "string" ? value : value.name)),
            map(name => (name ? this._filterInverterModel(name) : this.invertermodels.slice()))
          );
        },
        error => {
          this.utils.errorSnackBar("Error");
        }
      );
    }
  }

  loadInverterModelsData() {
    this.invertermodels = [];
    this.apiService.getInverterMade(this.selectedInverterMakeID).subscribe(
      response => {
        console.log("Hiii");
        this.invertermodels = response;
        this.filteredInverterModels = this.desginForm.get('invertermodel').valueChanges.pipe(
          startWith(""),
          map(value => (typeof value === "string" ? value : value.name)),
          map(name => (name ? this._filterInverterModel(name) : this.invertermodels.slice()))
        );
      },
      error => {
        this.utils.errorSnackBar("Error");
      }
    );
  }

  setSelectedInverterModel(model) {
    this.selectedInverterModelID = model.id;
  }

  goBack() {
    this.mixpanelService.track("PERMITDESIGN_PAGE_CLOSE", {});
    this.navController.pop();

  }

  eventcheck(e) {
    this.showValue = e.target.value;
    console.log(this.showValue);

  }


  addressValue() {
    // }
    this.addressSubscription = this.utils.getAddressObservable().subscribe((address) => {
      console.log(address, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

      // this.desginForm.get('address').setValue('124/345');
      // this.desginForm.get('latitude').setValue('24.553333');
      // this.desginForm.get('longitude').setValue('80.5555555555');
      // this.desginForm.get('country').setValue('india');
      // this.desginForm.get('city').setValue('Lucknow');
      // this.desginForm.get('state').setValue('UP');
      // this.desginForm.get('postalcode').setValue(3232343);
      this.desginForm.get('address').setValue(address.address);
      this.desginForm.get('latitude').setValue(address.lat);
      this.desginForm.get('longitude').setValue(address.long);
      this.desginForm.get('country').setValue(address.country);
      this.desginForm.get('city').setValue(address.city);
      this.desginForm.get('state').setValue(address.state);
      this.desginForm.get('postalcode').setValue(address.postalcode);
    }, (error) => {
      this.desginForm.get('address').setValue('');
      this.desginForm.get('latitude').setValue('');
      this.desginForm.get('longitude').setValue('');
      this.desginForm.get('country').setValue('');
      this.desginForm.get('city').setValue('');
      this.desginForm.get('state').setValue('');
      this.desginForm.get('postalcode').setValue('');
    });
    this.desginForm.patchValue({
      createdby: this.storage.getUserID()
    });
    //this.getSolarMake();

  }

  getDesignDetails() {

    this.utils.showLoading('Getting Design Details').then(() => {
      this.apiService.getDesginDetail(this.designId).subscribe(async (result) => {
        await this.utils.hideLoading().then(() => {
          this.design = result;
          console.log(this.design);
          this.fieldDisabled = true;
          this.attachmentData = this.design.attachments;
          this.architecturalData = this.design.architecturaldesign;
          console.log("hello", this.design.attachments);
          this.desginForm.patchValue({
            name: this.design.name,
            email: this.design.email,
            monthlybill: this.design.monthlybill,
            address: this.design.address,
            phone: this.design.phonenumber,
            createdby: this.design.createdby,
            rooftype: this.design.rooftype,
            mountingtype: this.design.mountingtype,
            architecturaldesign: this.design.architecturaldesign,
            jobtype: this.design.jobtype,
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
            modulemake: this.design.solarmake.name,
            modulemodel: this.design.solarmodel.name,
            invertermake: this.design.invertermake.name,
            invertermodel: this.design.invertermodel.name,
            status: this.design.status,
            inverterscount: this.design.inverterscount
          });
          console.log("gg", this.design.solarmake.name);
          this.oldcommentid = this.design.comments[0].id;
          //console.log("attachments",this.desginForm.get('attachments').value)
          this.utils.setStaticAddress(this.design.address);
          //  this.attachmentData=this.design.attachments.length==1 ? this.design.attachments[0].name + this.design.attachments[0].ext : this.design.attachments.length;
          if (this.design.assignedto !== null && this.design.assignedto !== undefined) {
            this.desginForm.patchValue({
              assignedto: this.design.assignedto.id
            });
          }

          // setTimeout(() => {
          //   this.fetchModuleMakesData();
          //   this.fetchInverterMakesData();
          //   if(this.isEditMode){
          //     console.log("hello")
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


  showUpload(e) {
    this.uploadbox = e.target.value;
    console.log(this.uploadbox)


  }

  saveModuleMake() {
    console.log("g", this.desginForm.get("modulemake").value);
    const found = this.modulemakes.some(el => el.name === this.desginForm.get("modulemake").value);
    if (!found) {
      console.log("hello");
      let solarmadedata = {


        name: this.desginForm.get('modulemake').value
      }
      this.apiService
        .postSolarMake(
          solarmadedata
        )
        .subscribe(
          (response: any) => {
            this.selectedModuleMakeID = response.id;
            this.saveModuleModel();
          },
          error => {
            this.utils.errorSnackBar(
              "Error"
            );
          }
        );
    } else {
      this.saveModuleModel();
    }
  }

  saveModuleModel() {
    const ismakefound = this.modulemakes.some(el => el.name === this.desginForm.get("modulemake").value);
    console.log(ismakefound);
    const found = this.modulemodels.some(el => el.name === this.desginForm.get("modulemodel").value);
    console.log(found);
    if (!ismakefound || !found) {
      let solarmadedata = {
        modulemake: this.selectedModuleMakeID,
        name: this.desginForm.get('modulemodel').value

      }
      this.apiService
        .postSolarMade(
          solarmadedata
        )
        .subscribe(
          (response: any) => {
            this.selectedModuleModelID = response.id;
            this.saveInverterMake();
          },
          error => {
            this.utils.errorSnackBar(
              "Error"
            );
          }
        );
    } else {
      this.saveInverterMake();
    }
  }

  saveInverterMake() {
    const found = this.invertermakes.some(el => el.name === this.desginForm.get("invertermake").value);
    if (!found) {
      console.log("Hello");
      let invertermakedata = {
        name: this.desginForm.get("invertermake").value
      }
      this.apiService
        .postInverterMake(
          invertermakedata
        )
        .subscribe(
          (response: any) => {
            this.selectedInverterMakeID = response.id;
            this.saveInverterModel();
          },
          error => {
            this.utils.errorSnackBar(
              "Error"
            );
          }
        );
    } else {
      this.saveInverterModel();
    }
  }

  saveInverterModel() {
    const ismakefound = this.invertermakes.some(el => el.name === this.desginForm.get("invertermake").value);
    const found = this.invertermodels.some(el => el.name === this.desginForm.get("invertermodel").value);
    if (!ismakefound || !found) {
      let invertermadedata = {
        invertermake: this.selectedInverterMakeID,
        name: this.desginForm.get('invertermodel').value
      }
      this.apiService
        .postInverterMade(
          invertermadedata
        )
        .subscribe(
          (response: any) => {
            this.selectedInverterModelID = response.id;
            // if (this.data.isEditMode) {
            //   this.editDesignOnServer();
            // } else {
            {
              this.submitform();
            }
          },
          error => {
            this.utils.errorSnackBar(
              "Error"
            );
          }
        );
    } else {

      this.submitform();
    }
  }


  addForm(e) {
    this.onFormSubmit = false;
    // this.saveModuleMake();
    this.formValue = e;
    console.log(this.formValue);
    console.log('Reach', this.desginForm.value);

    // debugger;
    // this.saveModuleMake();

    if (this.desginForm.status === 'VALID') {
      if (this.formValue == 'send') {
        this.saveModuleMake();
      } else {
        this.saveModuleMake();
      }
    } else {
      this.error();
    }

  }

  submitform() {
    var pnumber = this.desginForm.get("phone").value;
    if (this.desginForm.status === 'VALID') {
      var designstatus;
      var designoutsourcedto;
      var isoutsourced;
      var newConstruction = this.desginForm.get("newconstruction").value;
      if (this.designCreatedBy) {
        designstatus = "requestaccepted";
        designoutsourcedto = "232";
        isoutsourced = "true";
        var designacceptancestarttime = new Date();
        designacceptancestarttime.setMinutes(designacceptancestarttime.getMinutes() + 30);
        console.log(designacceptancestarttime)
      } else {
        designstatus = "created";
        designoutsourcedto = null;
        isoutsourced = "false"
      }
      var tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 2);
      console.log(this.formValue);
      if (this.designId === 0) {
        if (this.formValue === 'save' || this.send === ScheduleFormEvent.SAVE_PERMIT_FORM) {
          this.mixpanelService.track("SAVE_PERMITDESIGN_PAGE", {});
          let data
          if (this.surveydatapresent) {
            data = {
              name: this.desginForm.get('name').value,
              email: this.desginForm.get('email').value,
              phonenumber: pnumber.toString(),
              address: this.desginForm.get('address').value,
              monthlybill: this.desginForm.get('monthlybill').value,
              solarmake: this.selectedModuleMakeID,
              solarmodel: this.selectedModuleModelID,
              invertermake: this.selectedInverterMakeID,
              invertermodel: this.selectedInverterModelID,
              //createdby: this.storage.getUserID(),
              createdby: this.desginForm.get('createdby').value,
              //assignedto: this.desginForm.get('assignedto').value,
              rooftype: this.desginForm.get('rooftype').value,
              //architecturaldesign: this.desginForm.get('architecturaldesign').value,
              tiltofgroundmountingsystem: this.desginForm.get('tiltofgroundmountingsystem').value,
              mountingtype: this.desginForm.get('mountingtype').value,
              jobtype: this.desginForm.get('jobtype').value,
              projecttype: this.desginForm.get('projecttype').value,
              newconstruction: this.desginForm.get('newconstruction').value,
              source: this.desginForm.get('source').value,
              comments: this.desginForm.get('comments').value,
              requesttype: this.desginForm.get('requesttype').value,
              latitude: this.desginForm.get('latitude').value,
              longitude: this.desginForm.get('longitude').value,
              country: this.desginForm.get('country').value,
              state: this.desginForm.get('state').value,
              city: this.desginForm.get('city').value,
              postalcode: this.desginForm.get('postalcode').value,
              status: designstatus,
              //attachments: this.desginForm.get('attachments').value,
              deliverydate: tomorrow.toISOString(),
              //creatorparentid:this.storage.getParentId()
              creatorparentid: this.desginForm.get('creatorparentid').value,
              outsourcedto: designoutsourcedto,
              designacceptancestarttime: designacceptancestarttime,
              isoutsourced: isoutsourced,
              issurveycompleted: this.desginForm.get('issurveycompleted').value,
              survey: this.surveydata.id,
              isdesignraised: true

            }
          } else {
            data = {
              name: this.desginForm.get('name').value,
              email: this.desginForm.get('email').value,
              phonenumber: pnumber.toString(),
              address: this.desginForm.get('address').value,
              monthlybill: this.desginForm.get('monthlybill').value,
              solarmake: this.selectedModuleMakeID,
              solarmodel: this.selectedModuleModelID,
              invertermake: this.selectedInverterMakeID,
              invertermodel: this.selectedInverterModelID,
              //createdby: this.storage.getUserID(),
              createdby: this.desginForm.get('createdby').value,
              //assignedto: this.desginForm.get('assignedto').value,
              rooftype: this.desginForm.get('rooftype').value,
              //architecturaldesign: this.desginForm.get('architecturaldesign').value,
              tiltofgroundmountingsystem: this.desginForm.get('tiltofgroundmountingsystem').value,
              mountingtype: this.desginForm.get('mountingtype').value,
              jobtype: this.desginForm.get('jobtype').value,
              projecttype: this.desginForm.get('projecttype').value,
              newconstruction: this.desginForm.get('newconstruction').value,
              source: this.desginForm.get('source').value,
              comments: this.desginForm.get('comments').value,
              requesttype: this.desginForm.get('requesttype').value,
              latitude: this.desginForm.get('latitude').value,
              longitude: this.desginForm.get('longitude').value,
              country: this.desginForm.get('country').value,
              state: this.desginForm.get('state').value,
              city: this.desginForm.get('city').value,
              postalcode: this.desginForm.get('postalcode').value,
              status: designstatus,
//attachments: this.desginForm.get('attachments').value,
              deliverydate: tomorrow.toISOString(),
              //creatorparentid:this.storage.getParentId()
              creatorparentid: this.desginForm.get('creatorparentid').value,
              outsourcedto: designoutsourcedto,
              designacceptancestarttime: designacceptancestarttime,
              isoutsourced: isoutsourced,
              isdesignraised: true,
              inverterscount: this.desginForm.get('inverterscount').value

            }
          }


          // this.apiService.addDesginForm(this.desginForm.value).subscribe(response => {
          this.utils.showLoading('Saving').then(() => {
            this.apiService.addDesginForm(data).subscribe(response => {
              this.utils.hideLoading().then(() => {
                if (newConstruction == 'true') {
                  // if(this.architecturalFileUpload){
                  this.uploaarchitecturedesign(response, 'architecturaldesign');
                  // }
                } else if (newConstruction == 'false') {
                  if (this.attachmentFileUpload) {
                    this.uploadAttachmentDesign(response, 'attachments')
                  } else {
                    this.router.navigate(['/permithomepage'])
                    this.utils.showSnackBar('Design have been Created');
                    // this.utils.showSnackBar('Design have been saved');
                    this.utils.setHomepagePermitRefresh(true);
                  }
                }
                // setTimeout(()=>{
                //   this.utils.hideLoading().then(() => {
                //     console.log('Res', response);
                //     // this.createChatGroup(response);
                //     this.router.navigate(['/permithomepage'])
                //     this.utils.showSnackBar('Design have been Created');
                //     // this.utils.showSnackBar('Design have been saved');
                //     this.utils.setHomepagePermitRefresh(true);
                //     // this.navController.pop();
                //     // this.utils.showSuccessModal('Desgin have been saved').then((modal) => {
                //     //   modal.present();
                //     //   modal.onWillDismiss().then((dismissed) => {
                //         // this.utils.setHomepageDesignRefresh(true);
                //     //     this.navController.pop();
                //     //   });
                //     // });

              });
              // },2000)
            }, responseError => {
              this.utils.hideLoading();
              const error: ErrorModel = responseError.error;
              this.utils.errorSnackBar(error.message);
            });


          });

        } else if (this.formValue === 'send') {
          this.mixpanelService.track("ORDER_PERMITDESIGN_PAGE", {});

          var postData = {
            name: this.desginForm.get('name').value,
            email: this.desginForm.get('email').value,
            phonenumber: pnumber.toString(),
            address: this.desginForm.get('address').value,
            monthlybill: this.desginForm.get('monthlybill').value,
            solarmake: this.selectedModuleMakeID,
            solarmodel: this.selectedModuleModelID,
            invertermake: this.selectedInverterMakeID,
            invertermodel: this.selectedInverterModelID,
            createdby: this.storage.getUserID(),
            //assignedto: this.desginForm.get('assignedto').value,
            rooftype: this.desginForm.get('rooftype').value,
            //architecturaldesign: this.desginForm.get('architecturaldesign').value,
            tiltofgroundmountingsystem: this.desginForm.get('tiltofgroundmountingsystem').value,
            mountingtype: this.desginForm.get('mountingtype').value,
            jobtype: this.desginForm.get('jobtype').value,
            projecttype: this.desginForm.get('projecttype').value,
            newconstruction: this.desginForm.get('newconstruction').value,
            source: this.desginForm.get('source').value,
            comments: this.desginForm.get('comments').value,
            requesttype: this.desginForm.get('requesttype').value,
            latitude: this.desginForm.get('latitude').value,
            longitude: this.desginForm.get('longitude').value,
            country: this.desginForm.get('country').value,
            state: this.desginForm.get('state').value,
            city: this.desginForm.get('city').value,
            postalcode: this.desginForm.get('postalcode').value,
            status: this.desginForm.get('status').value,
            //attachments: this.desginForm.get('attachments').value,
            deliverydate: tomorrow.toISOString(),
            creatorparentid: this.storage.getParentId(),
            isdesignraised: true,
            inverterscount: this.desginForm.get('inverterscount').value


          }


          // this.apiService.addDesginForm(this.desginForm.value).subscribe(response => {
          this.apiService.addDesginForm(postData).subscribe(response => {
            // if(this.architecturalFileUpload){
            //   this.uploaarchitecturedesign(response.id,'architecturaldesign');
            // }
            // if(this.attachmentFileUpload){
            //   this.uploadAttachmentDesign(response.id,'attachments')
            // }
            this.utils.hideLoading().then(() => {
              this.value = response.id;
              if (newConstruction == 'true') {
                // if(this.architecturalFileUpload){
                this.uploaarchitecturedesign(response, 'architecturaldesign');
                // }
              } else if (newConstruction == 'false') {
                if (this.attachmentFileUpload) {
                  this.uploadAttachmentDesign(response, 'attachments')
                } else {
                  let objToSend: NavigationExtras = {
                    queryParams: {
                      id: response.id,
                      designData: "permit",
                      fulldesigndata: response
                    },
                    skipLocationChange: false,
                    fragment: 'top'
                  };


                  this.router.navigate(['/payment-modal'], {
                    state: {productdetails: objToSend}
                  });
                }
              }
              // this.utils.hideLoading().then(() => {
              //   // this.createChatGroup(response);
              //   console.log('Res', response);
              //   this.value = response.id;
              //this.router.navigate(['payment-modal',{id:response.id,designData:"permit"}]);
              //       let objToSend: NavigationExtras = {
              //         queryParams: {
              //           id:response.id,
              //           designData:"permit",
              //           fulldesigndata:response
              //         },
              //         skipLocationChange: false,
              //         fragment: 'top'
              //     };


              // this.router.navigate(['/payment-modal'], {
              //   state: { productdetails: objToSend }
              // });
              // this.sendtowattmonk();

              // this.router.navigate(['/homepage'])
              // this.utils.showSnackBar('Design have been Created');
              // this.utils.showSnackBar('Design have been saved');
              // this.utils.setHomepageDesignRefresh(true);
              // this.navController.pop();
              // this.utils.showSuccessModal('Desgin have been saved').then((modal) => {
              //   modal.present();
              //   modal.onWillDismiss().then((dismissed) => {
              // this.utils.setHomepageDesignRefresh(true);
              //     this.navController.pop();
              //   });
              // });

            });
          }, responseError => {
            this.utils.hideLoading();
            const error: ErrorModel = responseError.error;
            this.utils.errorSnackBar(error.message);
          });


        }

      } else {
        if (this.formValue === 'save') {
          this.utils.showLoading('Saving').then(() => {
            var data = {
              name: this.desginForm.get('name').value,
              email: this.desginForm.get('email').value,
              phonenumber: pnumber.toString(),
              address: this.desginForm.get('address').value,
              monthlybill: this.desginForm.get('monthlybill').value,
              solarmake: this.selectedModuleMakeID,
              solarmodel: this.selectedModuleModelID,
              invertermake: this.selectedInverterMakeID,
              invertermodel: this.selectedInverterModelID,
              createdby: this.desginForm.get('createdby').value,
              //assignedto: this.desginForm.get('assignedto').value,
              rooftype: this.desginForm.get('rooftype').value,
              //architecturaldesign: this.desginForm.get('architecturaldesign').value,
              tiltofgroundmountingsystem: this.desginForm.get('tiltofgroundmountingsystem').value,
              mountingtype: this.desginForm.get('mountingtype').value,
              jobtype: this.desginForm.get('jobtype').value,
              projecttype: this.desginForm.get('projecttype').value,
              newconstruction: this.desginForm.get('newconstruction').value,
              source: this.desginForm.get('source').value,
              comments: this.desginForm.get('comments').value,
              requesttype: this.desginForm.get('requesttype').value,
              latitude: this.desginForm.get('latitude').value,
              longitude: this.desginForm.get('longitude').value,
              country: this.desginForm.get('country').value,
              state: this.desginForm.get('state').value,
              city: this.desginForm.get('city').value,
              postalcode: this.desginForm.get('postalcode').value,
              status: this.desginForm.get('status').value,
              //attachments: this.desginForm.get('attachments').value,
              deliverydate: tomorrow.toISOString(),
              creatorparentid: this.desginForm.get('creatorparentid').value,
              outsourcedto: designoutsourcedto,
              designacceptancestarttime: designacceptancestarttime,
              isoutsourced: isoutsourced,
              isdesignraised: true,
              oldcommentid: this.oldcommentid,
              inverterscount: this.desginForm.get('inverterscount').value


            }
            this.apiService.updateDesignForm(data, this.designId).subscribe(response => {
                // if(this.architecturalFileUpload){
                //   this.uploaarchitecturedesign(response.id,'architecturaldesign');
                // }
                // if(this.attachmentFileUpload){
                //   this.uploadAttachmentDesign(response.id,'attachments')
                // }
                this.utils.hideLoading().then(() => {
                  if (newConstruction == 'true') {
                    // if(this.architecturalFileUpload){
                    this.uploaarchitecturedesign(response, 'architecturaldesign');
                    // }
                  } else if (newConstruction == 'false') {
                    if (this.attachmentFileUpload) {
                      this.uploadAttachmentDesign(response, 'attachments')
                    } else {
                      this.router.navigate(['/permithomepage'])
                      this.utils.showSnackBar('Design have been Created');
                      // this.utils.showSnackBar('Design have been saved');
                      this.utils.setHomepagePermitRefresh(true);
                    }
                  }
                  // if(this.isArcFileDelete){
                  //   this.deleteArcFile(this.indexOfArcFiles);
                  // }

                  // this.utils.hideLoading().then(() => {
                  //   console.log('Res', response);
                  //   this.utils.showSnackBar('Design have been updated');
                  //   if(!this.isArcFileDelete){
                  //     this.utils.setPermitDesignDetailsRefresh(true);
                  //   }
                  //   //this.navController.pop();
                  //   // this.router.navigate(['/permit-design-details/',this.designId])

                });
              },
              responseError => {
                this.utils.hideLoading().then(() => {
                  const error: ErrorModel = responseError.error;
                  this.utils.errorSnackBar(error.message[0].messages[0].message);
                });

              });

          });

        } else if (this.formValue === 'send') {
          this.isEdit = false;
          const postData = {
            name: this.desginForm.get('name').value,
            email: this.desginForm.get('email').value,
            phonenumber: pnumber.toString(),
            address: this.desginForm.get('address').value,
            monthlybill: this.desginForm.get('monthlybill').value,
            solarmake: this.selectedModuleMakeID,
            solarmodel: this.selectedModuleModelID,
            invertermake: this.selectedInverterMakeID,
            invertermodel: this.selectedInverterModelID,
            createdby: this.storage.getUserID(),
            //assignedto: this.desginForm.get('assignedto').value,
            rooftype: this.desginForm.get('rooftype').value,
            //architecturaldesign: this.desginForm.get('architecturaldesign').value,
            tiltofgroundmountingsystem: this.desginForm.get('tiltofgroundmountingsystem').value,
            mountingtype: this.desginForm.get('mountingtype').value,
            jobtype: this.desginForm.get('jobtype').value,
            projecttype: this.desginForm.get('projecttype').value,
            newconstruction: this.desginForm.get('newconstruction').value,
            source: this.desginForm.get('source').value,
            comments: this.desginForm.get('comments').value,
            requesttype: this.desginForm.get('requesttype').value,
            latitude: this.desginForm.get('latitude').value,
            longitude: this.desginForm.get('longitude').value,
            country: this.desginForm.get('country').value,
            state: this.desginForm.get('state').value,
            city: this.desginForm.get('city').value,
            postalcode: this.desginForm.get('postalcode').value,
            status: this.desginForm.get('status').value,
            //attachments: this.desginForm.get('attachments').value,
            deliverydate: tomorrow.toISOString(),
            creatorparentid: this.storage.getParentId(),
            isdesignraised: true,
            oldcommentid: this.oldcommentid,
            inverterscount: this.desginForm.get('inverterscount').value


          }
          this.apiService.updateDesignForm(postData, this.designId).subscribe(response => {
              // if(this.architecturalFileUpload){
              //   this.uploaarchitecturedesign(response.id,'architecturaldesign');
              // }
              // if(this.attachmentFileUpload){
              //   this.uploadAttachmentDesign(response.id,'attachments')
              // }
              this.utils.hideLoading().then(() => {
                this.value = response.id;
                if (newConstruction == 'true') {
                  // if(this.architecturalFileUpload){
                  this.uploaarchitecturedesign(response, 'architecturaldesign');
                  // }
                } else if (newConstruction == 'false') {
                  if (this.attachmentFileUpload) {
                    this.uploadAttachmentDesign(response, 'attachments')
                  } else {
                    let objToSend: NavigationExtras = {
                      queryParams: {
                        id: response.id,
                        designData: "permit",
                        fulldesigndata: response
                      },
                      skipLocationChange: false,
                      fragment: 'top'
                    };


                    this.router.navigate(['/payment-modal'], {
                      state: {productdetails: objToSend}
                    });
                  }
                }
                // if(this.isArcFileDelete){
                //   console.log("hello");
                //   this.deleteArcFile(this.indexOfArcFiles);
                // }
                //       this.utils.hideLoading().then(() => {
                //         console.log('Res', response);

                //         this.utils.showSnackBar('Design have been updated');
                //        // this.router.navigate(['payment-modal',{id:response.id,designData:"permit"}]);
                //        let objToSend: NavigationExtras = {
                //         queryParams: {
                //           id:response.id,
                //           designData:"permit",
                //           fulldesigndata:response
                //         },
                //         skipLocationChange: false,
                //         fragment: 'top'
                //     };


                // this.router.navigate(['/payment-modal'], {
                //   state: { productdetails: objToSend }
                // });

              });
            },
            responseError => {
              this.utils.hideLoading().then(() => {
                const error: ErrorModel = responseError.error;
                this.utils.errorSnackBar(error.message[0].messages[0].message);
              });
              //
            });

        }
      }


    } else {
      this.error();
    }
  }

  error() {
    // if(this.desginForm.value.name == '' || this.desginForm.get('companyname').hasError('pattern'))
    // {
    //   this.utils.errorSnackBar('please check the field name');
    // }
    if (this.desginForm.value.name == '' || this.desginForm.get('name').hasError('pattern')) {

      this.utils.errorSnackBar('Please check the field name.');
    } else if (this.desginForm.value.email == '' || this.desginForm.get('email').hasError('pattern') || this.desginForm.value.email == undefined) {
      this.utils.errorSnackBar('Please check the field email.');
    } else if (this.desginForm.value.phone == '' || this.desginForm.get('phone').hasError('pattern') || this.desginForm.value.phone == undefined) {
      this.utils.errorSnackBar('Please check the field phone number');
    } else if (this.desginForm.value.monthlybill == '' || this.desginForm.get('monthlybill').hasError('pattern') || this.desginForm.value.monthlybill == undefined) {
      this.utils.errorSnackBar('Please check the field annual units.');
    } else if (this.desginForm.value.inverterscount == '' || this.desginForm.get('inverterscount').hasError('pattern') || this.desginForm.value.inverterscount == undefined) {
      this.utils.errorSnackBar('Please check the field inverters count.');
    } else if (this.desginForm.value.modulemake == '' || this.desginForm.get('modulemake').hasError('pattern') || this.desginForm.value.modulemake == undefined) {
      this.utils.errorSnackBar('Please check the field module make.');
    } else if (this.desginForm.value.modulemodel == '' || this.desginForm.get('modulemodel').hasError('pattern') || this.desginForm.value.modulemodel == undefined) {
      this.utils.errorSnackBar('Please check the field module model.');
    } else if (this.desginForm.value.invertermake == '' || this.desginForm.get('invertermake').hasError('pattern') || this.desginForm.value.invertermake == undefined) {
      this.utils.errorSnackBar('Please check the field inverter make.');
    } else if (this.desginForm.value.invertermodel == '' || this.desginForm.get('invertermodel').hasError('pattern') || this.desginForm.value.invertermodel == undefined) {
      this.utils.errorSnackBar('Please check the field inverter model.');
    } else if (this.desginForm.get('mountingtype').value == '' || this.desginForm.get('mountingtype').value == undefined) {
      this.utils.errorSnackBar('Please fill the mounting type.');
    } else if (this.desginForm.value.projecttype == '' || this.desginForm.value.projecttype == undefined) {
      this.utils.errorSnackBar('Please fill the project type.');
    } else if (this.desginForm.value.tiltofgroundmountingsystem == '' || this.desginForm.get('tiltofgroundmountingsystem').hasError('pattern') || this.desginForm.value.tiltofgroundmountingsystem == undefined) {
      this.utils.errorSnackBar('Please check the field tilt for ground mount.');
    } else if (this.desginForm.value.rooftype == '' || this.desginForm.value.rooftype == undefined) {
      this.utils.errorSnackBar('Please fill the rooftype.');
    } else if (this.desginForm.value.architecturaldesign == '' || this.desginForm.value.architecturaldesign == undefined) {
      this.utils.errorSnackBar('Please attach architectural design.');
    } else {
      this.utils.errorSnackBar('Address not found. Make sure location is on on device.');
    }
  }


  files(ev) {
    console.log(ev.target.files,this.arcFileUrl);
    for (let i = 0; i < ev.target.files.length; i++) {
      this.archFiles.push(ev.target.files[i])
      var reader = new FileReader();
      reader.onload = (e: any) => {
        console.log(ev.target.files[i],this.arcFileUrl);
        if(ev.target.files[i].name.includes('.png') || ev.target.files[i].name.includes('.jpeg') || ev.target.files[i].name.includes('.jpg') || ev.target.files[i].name.includes('.gif')){
          this.arcFileUrl.push(e.target.result);
        }else{
          this.arcFileUrl.push('/assets/icon/file.png');
        }
      }
      reader.readAsDataURL(ev.target.files[i]);
    }
    console.log(this.archFiles);
  }

  permitfiles(event) {
    console.log(event);
    for(let i=0; i< event.target.files.length;i++){
      console.log(i);

      this.permitFiles.push(event.target.files[i])
      var reader = new FileReader();
      reader.onload = (e: any) => {
        if(event.target.files[i].name.includes('.png') || event.target.files[i].name.includes('.jpeg') || event.target.files[i].name.includes('.jpg') || event.target.files[i].name.includes('.gif')){
          // console.log(event.target.files[i].name);
          this.imageurls.push(e.target.result);
        }else{
          this.imageurls.push('/assets/icon/file.png');
        }
        console.log(this.imageurls)
      }
      reader.readAsDataURL(event.target.files[i]);
    }
    this.attachmentFileUpload = true;
    if (this.permitFiles.length == 1) {
      this.fileName = event.target.files[0].name;
      console.log(this.fileName);

    } else if (this.permitFiles.length > 1) {
      this.fileName = this.permitFiles.length;
    } else {
      this.fileName = '';
    }

  }

  uploaarchitecturedesign(response?: any, key?: string) {
    // console.log(this.archFiles);
    const imageData = new FormData();
    for (var i = 0; i < this.archFiles.length; i++) {
      imageData.append("files", this.archFiles[i]);
      if (i == 0) {
        imageData.append('path', 'designs/' + response.id);
        imageData.append('refId', response.id + '');
        imageData.append('ref', 'design');
        imageData.append('field', key);
      }
    }
    this.utils.showLoading("Architectural File Uploading...").then(() => {
      this.apiService.uploaddesign(imageData).subscribe(res => {
        console.log(res);
        this.utils.hideLoading();
        if (this.attachmentFileUpload) {
          this.uploadAttachmentDesign(response, 'attachments')
        } else {
          if (this.formValue === 'save' || this.send === ScheduleFormEvent.SAVE_PERMIT_FORM) {
            if (this.designId == 0) {
              this.router.navigate(['/permithomepage'])
              this.utils.showSnackBar('Design have been Created');
              // this.utils.showSnackBar('Design have been saved');
              this.utils.setHomepagePermitRefresh(true);
            } else {
              this.router.navigate(['/permithomepage'])
              this.utils.showSnackBar('Design have been updated');
              this.utils.setHomepagePermitRefresh(true);
            }
          } else {
            let objToSend: NavigationExtras = {
              queryParams: {
                id: response.id,
                designData: "permit",
                fulldesigndata: response
              },
              skipLocationChange: false,
              fragment: 'top'
            };


            this.router.navigate(['/payment-modal'], {
              state: {productdetails: objToSend}
            });
          }
        }

      }, responseError => {
        this.utils.hideLoading();
        const error: ErrorModel = responseError.error;
        this.utils.errorSnackBar(error.message[0].messages[0].message);
      })
    })

  }

  uploadAttachmentDesign(response?: any, key?: string, filearray?: File[]) {
    console.log(this.permitFiles);
    const imageData = new FormData();
    for (var i = 0; i < this.permitFiles.length; i++) {
      imageData.append("files", this.permitFiles[i]);
      if (i == 0) {
        imageData.append('path', 'designs/' + response.id);
        imageData.append('refId', response.id + '');
        imageData.append('ref', 'design');
        imageData.append('field', key);
      }
    }
    this.utils.showLoading("Attachment File Uploading").then(() => {
      this.apiService.uploaddesign(imageData).subscribe(res => {
        console.log(res);
        this.utils.hideLoading();
        if (this.formValue === 'save' || this.send === ScheduleFormEvent.SAVE_PERMIT_FORM) {
          if (this.designId == 0) {
            this.router.navigate(['/permithomepage'])
            this.utils.showSnackBar('Design have been Created');
            // this.utils.showSnackBar('Design have been saved');
            this.utils.setHomepagePermitRefresh(true);
          } else {
            this.router.navigate(['/permithomepage'])
            this.utils.showSnackBar('Design have been updated');
            this.utils.setHomepagePermitRefresh(true);
          }
        } else {
          let objToSend: NavigationExtras = {
            queryParams: {
              id: response.id,
              designData: "permit",
              fulldesigndata: response
            },
            skipLocationChange: false,
            fragment: 'top'
          };


          this.router.navigate(['/payment-modal'], {
            state: {productdetails: objToSend}
          });
        }
      }, responseError => {
        this.utils.hideLoading();
        //this.utils.hideUploadingLoading();
        const error: ErrorModel = responseError.error;
        this.utils.errorSnackBar(error.message[0].messages[0].message);
      })
    })
  }

  numberfield(event) {
    console.log(event);

  }

  removeArc(i) {
    this.archFiles.splice(i, 1);
    this.arcFileUrl.splice(i, 1);
  }

  removePermit(i) {
    this.permitFiles.splice(i, 1);
    this.imageurls.splice(i, 1);
  }

  remove(arc, i) {
    // this.utils.showLoading('Deleting Architecture Design').then((success)=>{
    //   this.apiService.deletePrelimImage(index).subscribe(res=>{console.log("hello",res)
    // this.utils.hideLoading().then(()=>{
    //   this.utils.showSnackBar('File deleted successfully');
    //   this.navController.navigateRoot(["/permitschedule",{id:this.designId}]);
    // this.utils.setHomepagePermitRefresh(true);

    //   });
    //   },
    // (error)=>{
    //   this.utils.hideLoading().then(()=> {
    //     this.utils.errorSnackBar('some Error Occured');
    //   });

    // });
    // });
    console.log(arc);
    this.indexOfArcFiles.push(arc.id);

    this.isArcFileDelete = true;
    console.log(this.isArcFileDelete);
    console.log(this.indexOfArcFiles);
    console.log(this.architecturalData);
    console.log(i);

    this.architecturalData.splice(i, 1);
    this.deleteArcFile(this.indexOfArcFiles);

  }

  removeattachment(attachment, i) {

    this.indexOfAttachmentFiles.push(attachment.id);

    this.isArcFileDelete = true;
    console.log(this.isArcFileDelete);
    console.log(this.indexOfAttachmentFiles);
    console.log(this.attachmentData);
    console.log(i);

    this.attachmentData.splice(i, 1);
    this.deleteAttachmentFile(this.indexOfAttachmentFiles);
  }


  deleteArcFile(index) {

    // this.utils.showLoading('Deleting Architecture Design').then((success)=>{
    for (var i = 0; i < index.length; i++) {
      var id = index[i];
      this.utils.showLoading("Deleting Architectural File").then(() => {
        this.apiService.deletePrelimImage(id).subscribe(res => {
          this.utils.hideLoading().then(() => {
            console.log("hello", res)
            this.indexOfArcFiles = []
          })
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

  deleteAttachmentFile(index) {

    // this.utils.showLoading('Deleting Architecture Design').then((success)=>{
    for (var i = 0; i < index.length; i++) {

      var id = index[i];
      this.utils.showLoading("Deleting Attachment File").then(() => {
        this.apiService.deletePrelimImage(id).subscribe(res => {
          this.utils.hideLoading().then(() => {
            console.log("hello", res)
            this.indexOfAttachmentFiles = []
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

  sendtowattmonk() {
    var designacceptancestarttime = new Date();
    designacceptancestarttime.setMinutes(designacceptancestarttime.getMinutes() + 30);
    console.log(this.utils.getPaymentMode().value);
    const postData = {
      outsourcedto: 232,
      isoutsourced: "true",
      status: "outsourced",
      designacceptancestarttime: designacceptancestarttime,
      paymenttype: this.utils.getPaymentMode().value,
      couponid: this.utils.getCouponId().value
    };

    this.utils.showLoading('Assigning').then(() => {
      //this.newpermitsRef.update({ count: this.newpermitscount + 1});
      this.apiService.updateDesignForm(postData, /*this.desginForm.get('id').value*/this.value).subscribe((value) => {
        this.utils.hideLoading().then(() => {
          ;
          console.log('reach ', value);

          this.utils.showSnackBar('Design request has been assigned to wattmonk successfully');//.firstname +" "+this.selectedDesigner.lastname + ' ' + 'successfully');
          this.router.navigate(['/permithomepage'])

          this.utils.setHomepagePermitRefresh(this.isEdit);
        })
      }, (error) => {
        this.utils.hideLoading();
      });
    })
  }

  // Location

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.utils.setStaticAddress('');
    this.deactivateNetworkSwitch.unsubscribe();
  }

  // segmentChanged(event) {
  //   console.log(event);
  //   this.currentTab = event.detail.value;
  //   this.tabs.select(event.detail.value);
  // }

  getGeoLocation() {
    // this.utilities.showLoading('Getting Location').then(()=>{
    // setTimeout(()=>{
    //   this.utilities.hideLoading();
    // },1000)
    this.geolocation.getCurrentPosition().then((resp) => {
      this.utils.hideLoading();
      // .then(()=>{
      console.log('resp', resp);
      this.getGeoEncoder(resp.coords.latitude, resp.coords.longitude);
      this.utils.hideLoading();
      // });
    }, err => {
      this.utils.hideLoading();
      this.utils.errorSnackBar('Unable to get location');
    }).catch((error) => {
      this.utils.hideLoading();
      this.utils.errorSnackBar('Unable to get location');

      console.log('Error getting location', error);
      this.showNoLocation();
    });
    // },err=>{
    //   this.utilities.hideLoading();
    // });
  }

  async showNoLocation() {
    const toast = await this.toastController.create({
      header: 'Error',
      message: 'Unable to get location',
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.goBack();
          }
        }
      ]
    });
    toast.present();
  }


  async showLocationDenied() {
    const toast = await this.toastController.create({
      header: 'Error',
      message: 'Location services denied, please enable them manually',
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.goBack();
          }
        }
      ]
    });
    toast.present();
  }


  getGeoEncoder(latitude, longitude) {
    // this.utilities.hideLoading().then((success) => {
    this.utils.showLoading('Getting Location').then(() => {
      this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geoEncoderOptions)
        .then((result: NativeGeocoderResult[]) => {
          console.log(result);
          this.utils.hideLoading();
          const address: AddressModel = {
            address: this.generateAddress(result[0]),
            lat: latitude,
            long: longitude,
            country: result[0].countryName,
            state: result[0].administrativeArea,
            city: result[0].locality,
            postalcode: result[0].postalCode
          };
          this.utils.setAddress(address);
        })
        .catch((error: any) => {
          this.showNoLocation();
          this.utils.hideLoading();
          alert('Error getting location' + JSON.stringify(error));
        });
    });
    // }, (error) => {

    // }
    // );
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

  requestLocationPermission() {
    this.diagnostic.requestLocationAuthorization(this.diagnostic.locationAuthorizationMode.WHEN_IN_USE).then((mode) => {
      console.log(mode);
      switch (mode) {
        case this.diagnostic.permissionStatus.NOT_REQUESTED:
          this.goBack();
          break;
        case this.diagnostic.permissionStatus.DENIED_ALWAYS:
          this.showLocationDenied();
          break;
        case this.diagnostic.permissionStatus.DENIED_ONCE:
          this.goBack();
          break;
        case this.diagnostic.permissionStatus.GRANTED:
          this.fetchLocation();
          break;
        case this.diagnostic.permissionStatus.GRANTED_WHEN_IN_USE:
          this.fetchLocation();
          break;
        case 'authorized_when_in_use':
          this.fetchLocation();
          break;
      }
    }, (rejection) => {
      console.log(rejection);
      // this.goBack();
    });

    // if (this.platform.is('ios')) {
    //   if (this.storage.isLocationAllowedOnIOS()) {
    //     this.fetchLocation();
    //   } else {
    //     if (!this.storage.isLocationCheckedOnIOS()) {
    //       this.storage.setLocationCheckedOnIOS(true);
    //       this.diagnostic.requestLocationAuthorization(this.diagnostic.locationAuthorizationMode.WHEN_IN_USE).then((mode) => {
    //         switch (mode) {
    //           case this.diagnostic.permissionStatus.NOT_REQUESTED:
    //             this.storage.setLocationAllowedOnIOS(false);
    //             break;
    //           case this.diagnostic.permissionStatus.DENIED_ALWAYS:
    //             this.storage.setLocationAllowedOnIOS(false);
    //             break;
    //           case this.diagnostic.permissionStatus.GRANTED:
    //             this.storage.setLocationAllowedOnIOS(true);
    //             this.fetchLocation();
    //             break;
    //           case this.diagnostic.permissionStatus.GRANTED_WHEN_IN_USE:
    //             this.storage.setLocationAllowedOnIOS(true);
    //             this.fetchLocation();
    //             break;
    //           case 'authorized_when_in_use':
    //             this.storage.setLocationAllowedOnIOS(true);
    //             this.fetchLocation();
    //             break;
    //         }
    //       }, (rejection) => {
    //         this.locationAllowed = false;
    //         this.storage.setLocationAllowedOnIOS(false);
    //       });
    //     }
    //   }
    // } else {
    //
    // }

  }

  fetchLocation() {
    if (this.platform.is('ios')) {
      this.getGeoLocation();
    } else {
      this.diagnostic.isGpsLocationEnabled().then((status) => {
        if (status === true) {
          this.getGeoLocation();
          // this.utilities.showLoading('Getting Location').then(() => {

          // });
        } else {
          this.askToChangeSettings();
        }
      });
    }

  }

  async askToChangeSettings() {
    const toast = await this.toastController.create({
      header: 'Location Disabled',
      message: 'Please enable location services',
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.changeLocationSettings();
          }
        }, {
          text: 'Cancel',
          handler: () => {
            this.goBack();
          }
        }
      ]
    });
    toast.present();
  }

  changeLocationSettings() {
    this.diagnostic.switchToLocationSettings();
    this.diagnostic.registerLocationStateChangeHandler((state) => {
      if ((this.platform.is('android') && state !== this.diagnostic.locationMode.LOCATION_OFF) ||
        (this.platform.is('ios')) && (state === this.diagnostic.permissionStatus.GRANTED ||
          state === this.diagnostic.permissionStatus.GRANTED_WHEN_IN_USE
        )) {
        this.checkLocationAccess();
      }

    });
  }

  checkLocationAccess() {
    this.diagnostic.isLocationAuthorized().then((success) => {
      this.fetchLocation();
    }, (error) => {
      this.utils.showSnackBar('GPS Not Allowed');
    });

  }

  ionViewWillLeave() {
  }

  createChatGroup(design: DesginDataModel) {
    var GUID = 'permit' + "_" + new Date().getTime();

    var address = design.address.substring(0, 90);
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
        console.log(this.getCompanies);
        this.filteredCompanies = this.desginForm.get('companyname').valueChanges.pipe(
          startWith(""),
          map(value => (typeof value === "string" ? value : value.companyid)),
          map(companyname => (companyname ? this._filterCompanies(companyname) : this.getCompanies.slice()))
        );
      },
      error => {
        this.utils.errorSnackBar("Error");
      }
    );
  }

  proxyValue: any;

  onCompanyChanged(event$) {
    console.log(event$);
    this.proxyValue = event$.detail.value.companyname;
    this.designCreatedBy = event$.detail.value.companyid;
    this.designCreatedByUserParent = event$.detail.value.parentid;
    if (this.designCreatedBy !== null && this.designCreatedByUserParent !== null) {
      this.desginForm.patchValue({
        createdby: this.designCreatedBy,
        creatorparentid: this.designCreatedByUserParent,
      })
    }
  }

  private _filterCompanies(companyname: string): Clients[] {
    return this.getCompanies.filter(
      company => company.companyname.toLowerCase().indexOf(companyname) != -1
    );
  }

}
