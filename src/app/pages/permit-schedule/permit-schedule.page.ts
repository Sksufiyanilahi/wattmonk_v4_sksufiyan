import { ChangeDetectorRef, Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Diagnostic } from '@awesome-cordova-plugins/diagnostic/ngx';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@awesome-cordova-plugins/native-geocoder/ngx';
import { IonSlides, NavController, Platform, ToastController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CometChat } from '@cometchat-pro/cordova-ionic-chat';
import { AddressModel } from 'src/app/models/address.model';
import { AssigneeModel } from 'src/app/models/assignee.model';
import { Clients } from 'src/app/models/clients.model';
import { FIELD_REQUIRED, INVALID_ADDRESS, INVALID_ANNUAL_UNIT, INVALID_COMPANY_NAME, INVALID_EMAIL_MESSAGE, INVALID_MODULE_AND_INVERTER, INVALID_NAME_MESSAGE, INVALID_PHONE_NUMBER, INVALID_TILT_FOR_GROUND_MOUNT, ScheduleFormEvent } from 'src/app/models/constants';
import { DesginDataModel, Invertermake } from 'src/app/models/design.model';
import { ErrorModel } from 'src/app/models/error.model';
import { InverterMadeModel } from 'src/app/models/inverter-made.model';
import { InverterMakeModel } from 'src/app/models/inverter-make.model';
import { Modulemake } from 'src/app/models/solar-made.model';
import { SolarMake } from 'src/app/models/solar-make.model';
import { Utility } from 'src/app/models/utility.model';
import { ApiService } from 'src/app/services/api/api.service';
import { MixpanelService } from 'src/app/services/mixpanel/mixpanel.service';
import { NetworkDetectService } from 'src/app/services/network-detect/network-detect.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';

import * as _ from 'lodash';
import { google } from "google-maps";
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { ADDRESSFORMAT, MAILFORMAT, NAME, ROLES, NUMBERPATTERN, COMPANYFORMAT, MOBILEPATTERN } from "src/app/services/constants";

import { AwsService } from "src/app/services/aws/aws.service";

import { BatteryMake } from 'src/app/models/batterymake.model';
//import { InverterMakeModel } from 'src/app/models/inverter-make.model';
import {BatteryModel} from 'src/app/models/batterymodel.model';


export function getFileReader(): FileReader {
    const fileReader = new FileReader();
    const zoneOriginalInstance = (fileReader as any)["__zone_symbol__originalInstance"];
    return zoneOriginalInstance || fileReader;
}

@Component({
    selector: 'app-permit-schedule',
    templateUrl: './permit-schedule.page.html',
    styleUrls: ['./permit-schedule.page.scss'],
})

export class PermitSchedulePage implements OnInit {

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
        loop: false,
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

    desginForm: FormGroup

    listOfAssignees: AssigneeModel[] = [];

    //  listOfSolarMake: SolarMake[] = [];
    //  listOfSolarMade: SolarMadeModel[] = [];

    listOfInverterMade: InverterMadeModel[] = [];
    listOfInverterMake: InverterMakeModel[] = [];

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
    addressError = INVALID_ADDRESS;

    fieldRequired = FIELD_REQUIRED;

    fileName: any;
    archFiles: any = [];
    permitFiles: any = [];
    designId = 0;
    design: DesginDataModel = null;
    onFormSubmit: boolean = true;
    address = '';
    showValue: any;
    firebox: any;
    uploadbox: any;
    meterlessor: any;
    financ: any;
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
    imageurls: any = [];
    arcFileUrl: any = [];
    architecturalpostarray: any = [];
    attachmentpostarray: any = [];
    uploadattachmentfailedfiles: any = [];
    uploadarchitecturalfailedfiles: any = [];
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

    formatted_address: string;

    GoogleAutocomplete: google.maps.places.AutocompleteService;
    autocompleteItems: any[];
    map: any;

    geocoder = new google.maps.Geocoder();
    autoCompleteOff: boolean = false;
    isSelectSearchResult: boolean = false;

    invertermake = new FormControl("", [

        Validators.pattern("^[a-zA-Z-_ ]{3,}$")
    ])


    Servicecharges: AngularFireObject<any>;
    servicechargedata: Observable<any>;
    amount: any;
    slabname: any
    res: any;

    utilitymakes: Utility[] = [];
    filteredUtilityMakes: Observable<any>;
    ahjsmakes: Utility[] = [];
    filteredahjsMakes: Observable<any>;
    firemakes: Utility[] = [];
    filteredfireMakes: Observable<any>;
    selectedahjsID: number;
    selectedutilityID: number;
    batterymakes: BatteryMake[] = [];
    batterymodels: BatteryModel[] = [];

    public shsolarmake: any;
    public shsolarmade: any;
    public shsoinvertmade: any;
    public invertermakedisable: boolean = true;
    public solarmakedisable: boolean = true;
    public invertercountdisable: boolean = false;
    public modulecountdisable: boolean = false;
    public commentrequi: boolean = false;
    public companyrequi: boolean = false;
    public place: any;
    public propertytypevalue: any;
    public numberOfInverters: any = [];
    public addextrainverters = true;

    public isClient: boolean = false;
    public isVAAgent: boolean = false;

    moduleFiles: any = [];

    moduleFileUrl: any = [];

    indexOfmoduleAttachmentFiles = [];
    modulelayoutdesurl: any = [];
    attachmentmoduleFileUpload: boolean = false;
    sendDesignGeneralInfoupload:boolean = false;
    modulelayoutdesignData: any;
    selectedmalke = '';


    hash: any;
    modulelayoutpostarray: any = [];
    uploadmodulelayoutfailedfiles: any = [];
    modulesfileuploaded = true;
public designbattries : any = [];
batterycombinerboxshow: boolean = false;
public isinvertertypestring: boolean = false;
optimizerslist:any =[];
selectedOptimizerID: any = null;
isoptimizeraddedval:any;
isoutsourced = false;
userGroup;
searchedValue :any;
    searchedValueModel: any;
    constructor(private formBuilder: FormBuilder,
        private apiService: ApiService,
        public utils: UtilitiesService,
        private navController: NavController,
        private storage: StorageService,
        private route: ActivatedRoute,
        private router: Router,
        private nativeGeocoder: NativeGeocoder,
        private diagnostic: Diagnostic,
        private geolocation: Geolocation,
        private platform: Platform,
        private toastController: ToastController,
        private db: AngularFireDatabase,
        private cdr: ChangeDetectorRef,
        private network: NetworkDetectService,
        private mixpanelService: MixpanelService,
        private zone: NgZone,
        private uploadaws: AwsService,
        //private db:AngularFireDatabase
        //private data: DesignFormData
    ) {

        this.desginForm = this.formBuilder.group({
            companyname: new FormControl(''),
            name: new FormControl('', [Validators.required, Validators.pattern(NAME)]),
            email: new FormControl('', [Validators.required, Validators.pattern(MAILFORMAT)]),
            phone: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(15), Validators.pattern(MOBILEPATTERN)]),
            inverterscount: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(3), Validators.pattern('[0-9]{1,3}')]),
            modulemake: new FormControl("", [
                Validators.required,
                Validators.pattern("^[a-zA-Z-_ ]{3,}$")
            ]),
            modulemodel: new FormControl("", [
                Validators.required,
                Validators.pattern("^[a-z0-9A-Z+-_([)/. {\\]}]{3,}$")
            ]),
            invertermake: this.invertermake,
            invertermodel: new FormControl("", [
                // Validators.pattern("^[a-z0-9A-Z-_([)/. {\\]}]{5,}$")
                Validators.pattern("^[a-z0-9A-Z+-_([)/. {\\]}]{3,}$")
            ]),
            monthlybill: new FormControl('', [ Validators.min(1), Validators.pattern('[0-9]{1,15}')]),
            state: new FormControl('', [Validators.required]),
            city: new FormControl('', [Validators.required]),
            esiid: new FormControl(''),
            modulecount: new FormControl('1', [Validators.required, Validators.minLength(1), Validators.maxLength(3), Validators.pattern('[0-9]{1,3}')]),
            batterybackup: new FormControl(null, []),
            fire: new FormControl('', [Validators.required]),
            financing: new FormControl('', [Validators.required]),
            Utility: new FormControl(''), // [Validators.required]
            Utilityreq: new FormControl(''), // [Validators.required]
            ahjname: new FormControl(''), // [Validators.required]
            ahjreq: new FormControl(''), // [Validators.required]
            riskcat: new FormControl('II', [Validators.required]),
            setbackdetails: new FormControl(''),
            address: new FormControl('', [Validators.required, Validators.pattern(ADDRESSFORMAT)]),
            
            createdby: new FormControl(this.storage.getUserID()),
            assignedto: new FormControl(''),
            rooftype: new FormControl(''),
            architecturaldesign: new FormControl(''),
            tiltofgroundmountingsystem: new FormControl(''),
            mountingtype: new FormControl('', [Validators.required]),
            jobtype: new FormControl('pv', [Validators.required]),
            projecttype: new FormControl('', [Validators.required]),
            newconstruction: new FormControl('false'),
            source: new FormControl(utils.checkPlatform(), [Validators.required]),
            comments: new FormControl(''),
            requesttype: new FormControl('permit'),
            latitude: new FormControl(''),
            longitude: new FormControl(''),
            country: new FormControl(''),

            postalcode: new FormControl(''),
            status: new FormControl('created'),
            attachments: new FormControl([]),
            issurveycompleted: new FormControl('false'),
            creatorparentid: new FormControl(this.storage.getParentId()),
            mpurequired: new FormControl(false),
            sameemailconfirmed: new FormControl(null),
            // designinverters: this.formBuilder.array([]),
            meterlessor: new FormControl('false', [Validators.required]),
            propertysubtype: new FormControl('house'),
            designinverters: new FormControl([]),
           
            moduleslayoutdesign: new FormControl(''),
            modulemakefilter: new FormControl(""),
            modulemodelfilter: new FormControl(""),
            invertermakefilter : new FormControl(""),
             invertermodelfilter : new FormControl(""),

            typingaddress: new FormControl('', [ ]),
            apnnumber : new FormControl(null),
            raiserequestreason : new FormControl(""),
            exposurecategory : new FormControl("B", [Validators.required]),
            nec : new FormControl("", [Validators.required]),
            irc : new FormControl("", [Validators.required]),
            governingcode : new FormControl("", [Validators.required]),
            isoptimizeradded : new FormControl("false"),
            optimizer: new FormControl(null),
            jobnumber: new FormControl(''),
            utilityaccnumber: new FormControl(''),
            pestamprequired : new FormControl("false"),
            batterymake : new FormControl("", []),
            batterymodel : new FormControl("", []),
            batteriescount : new FormControl(null, []),

            batterycombinerbox : new FormControl(false, []),
            

        })
        // //For Counts
        // this.newpermitsRef = db.object('newpermitdesigns');
        //   this.newpermits = this.newpermitsRef.valueChanges();
        //   this.newpermits.subscribe(
        //     (res) => {

        //       this.newpermitscount = res.count;
        //       cdr.detectChanges();
        //     },


        //   )

        this.designId = +this.route.snapshot.paramMap.get('id');
        this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
        this.autocompleteItems = [];

        //code for company payment

        this.Servicecharges = db.object("service_charges");
        this.servicechargedata = this.Servicecharges.valueChanges();
        this.servicechargedata.subscribe(
            (res) => {
                this.res = res
            });

        this.numberOfInverters.push({
            invertermake: "invertermake",
            invertermodel: "invertermodel",
            inverterscount: "inverterscount",
            selectedInverterMakeID: null,
            selectedInverterModelID: null,
            invertermakefilter: "invertermakefilter",
            invertermodelfilter: "invertermodelfilter",
            isSaved: true,
            newEntry: false,
            invertercount: null,
        });
        this.designbattries.push({ 
            batterymake: "batterymake" ,
            batterymodel: "batterymodel",
            batteriescount:"batteriescount" ,          
              batterycombinerbox:"batterycombinerbox",

            id: null,  selectedBatteryMakeID: null, selectedBatteryModelID: null })
        this.isClient = this.utils.isClient();
        this.isVAAgent = this.utils.isVAAgent();

        if (!this.isClient) {
            this.companyrequi = true;

            console.log('com', this.companyrequi);
        }
        else {

            this.companyrequi = false;
            console.log('com', this.companyrequi);

        }
        // const url = this.router.url;
        //   const splittedUrl = url.split('/');

        //   this.tabsDisabled = splittedUrl.length === 4;
        //   this.currentTab = splittedUrl[2];
        // }
    }

    designinverters(): FormArray {
        return this.desginForm.get("designinverters") as FormArray
    }

    newdesigninverters(): FormGroup {
        return this.formBuilder.group({
            invertermake: '',
            invertermodel: '',
            invertercount: '',
        })
    }

    adddesigninverters() {
        // this.desginForm.get('invertermakefilter').setValue("");
        // this.desginForm.get('invertermodelfilter').setValue("");

        this.numberOfInverters.push({
            invertermake: "invertermake" + Number(this.numberOfInverters.length + 1),
            invertermodel:
                "invertermodel" + Number(this.numberOfInverters.length + 1),
            inverterscount:
                "inverterscount" + Number(this.numberOfInverters.length + 1),
            invertermodellist: [],
            disabledinvertermodel: true,
            invertermodelfilter:
            "invertermodelfilter" + Number(this.numberOfInverters.length + 1),
            invertermakefilter:
                "invertermakefilter" + Number(this.numberOfInverters.length + 1),
            selectedInverterMakeID: null,
            selectedInverterModelID: null,
            isSaved: false,
            newEntry: true,
            invertercount: null,
        });

        this.desginForm.addControl(
            "invertermake" + this.numberOfInverters.length,
            new FormControl("", Validators.required)
        );
        this.desginForm.addControl(
            "invertermodel" + this.numberOfInverters.length,
            new FormControl("", Validators.required)
        );
        this.desginForm.addControl(
            "inverterscount" + this.numberOfInverters.length,
            new FormControl("", Validators.required)
        );

        this.fetchInverterMakesData(Number(this.numberOfInverters.length - 1));
        this.desginForm.addControl(
    "invertermodelfilter" + this.numberOfInverters.length,
            new FormControl("")
        );
        this.desginForm.addControl(
            "invertermakefilter" + this.numberOfInverters.length,
            new FormControl("")
        );
    }

    removedesigninverters(index) {
        this.desginForm.removeControl("invertermake" + Number(index + 1));
        this.desginForm.removeControl("invertermodel" + Number(index + 1));
        this.desginForm.removeControl(
            "inverterscount" + Number(index + 1)
        );
         this.desginForm.removeControl(
             "invertermodelfilter" + Number(index + 1)
         );
 this.desginForm.removeControl(
        "invertermakefilter" + Number(index + 1)
        );
        this.numberOfInverters.splice(index, 1);
    }

    ionViewDidEnter() {
        this.deactivateNetworkSwitch = this.network.networkSwitch.subscribe(data => {
            this.netSwitch = data;

        })
        this.autocompleteItems = [];
    }


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



    ngOnInit() {
        this.surveydatapresent = false
        this.data = this.router.getCurrentNavigation().extras.state;

        if (this.data != undefined) {
            this.surveydata = this.data.productdetails.queryParams.surveyData;
            // this.tabsDisabled = this.data.productdetails.queryParams.tabsDisabled;
            // this.nonEditableField = this.data.productdetails.queryParams.nonEditableField;

            this.surveydatapresent = true


        }

        this.fieldDisabled = false;
        this.userdata = this.storage.getUser();

        //this.requestLocationPermission();
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
        }
        // else {
        //   // await this.getGeoLocation();
        //   this.subscription = this.utils.getAddressObservable().subscribe((address) => {

        //     this.address = address.address;
        //     this.storage.setData(this.address);
        //   });
        // }

        this.subscription = this.utils.getScheduleFormEvent().subscribe((event) => {
            if (event === ScheduleFormEvent.SAVE_PERMIT_FORM) {
                this.send = event;
                // this.saveModuleMake();
                this.submitform();

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
            this.desginForm.patchValue({
                createdby: this.storage.getUserID()
            });
        }

        setTimeout(() => {
            this.fetchModuleMakesData();
            this.fetchInverterMakesData();
            if (this.desginForm.get('jobtype').value == "pvbattery") {
                this.fetchBatteryMakesData();
            
            
            }
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

                if (mode === 'ground') {
                    tiltControl.setValidators([Validators.required, Validators.pattern(NUMBERPATTERN)]);
                    roofcontrol.clearValidators();
                    roofcontrol.reset();
                } else if (mode === 'both') {
                    tiltControl.setValidators([Validators.required, Validators.min(0), Validators.pattern(NUMBERPATTERN)]);
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
        // this.utils.setStaticAddress(this.surveydata.address);
        // if (this.desginForm.get('email').value == '') {
        //   this.fieldDisabled = false;
        // } else {
        //   this.fieldDisabled = true;
        // }
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
                    this.desginForm.get("architecturaldesign").setValue('false');
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
       console.log(name)
        const filterValue = name.toLowerCase();
       console.log(filterValue)
            
        return this.invertermakes.filter(
            invertermake => invertermake.name.toLowerCase().indexOf(filterValue) != -1,
        console.log(this.invertermakes),

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
        console.log('fetchModuleMakesData');
        this.apiService.getSolarMake().subscribe(
             (response:any) => {
                this.modulemakes = response.data;
                console.log("this.modulemakes",this.modulemakes);
                
                this.filteredModuleMakes = this.desginForm.get('modulemakefilter').valueChanges.pipe(
                    startWith(""),
                    map(value => (typeof value === "string" ? value : value.name)),
                    map(name => (name ? this._filterModuleMake(name) : this.modulemakes.slice()))
                );
                // console.log("this.filteredModuleMakes9",this.filteredModuleMakes);
                // var obj = {
                //     id: 0, name: "Others",
                //     created_at: null,
                //     updated_at: null
                // };
                // this.modulemakes.push(obj);
            },
            error => {
                this.utils.errorSnackBar("Error");
            }
        );
    }

    fetchModuleModelsData(_event: any, make) {

        console.log('fetchModuleModelsData', _event);

        //this.desginForm.patchValue({ modulemodel: " " });
        if (_event.isUserInput) {
            this.desginForm.get('modulemodel').setValue("");
            if (this.isEditMode) {
                this.selectedModuleModelID = null;
            }
            this.modulemodels = [];
            this.selectedModuleMakeID = make.id;
            console.log('d' + make.name);
            if (make.name === 'None') {
                this.modulecountdisable = true;
                this.desginForm.get('modulecount').setValue('0');
                this.desginForm.get('modulemodel').setValue('None');
                this.commentrequi = false;
            } else if (make.name === 'others') {
                this.modulecountdisable = true;
                this.desginForm.get('modulecount').setValue('0');
                this.desginForm.get('modulemodel').setValue('others');
                console.log('Please enter module make / module make in comment');
                this.commentrequi = true;
                this.place = 'Please enter module make,module model,inverter make,inverter model and inverterscount here..';

            } else {
                this.modulecountdisable = false;
                this.place = 'Start typing here';
                this.commentrequi = false;

            }
            this.apiService.getSolarMade(make.id).subscribe(
                (response:any) => {

                    this.modulemodels = response.data;
                    console.log(this.modulemodels)
                    if (make.name === 'Others') {
                        // var obj = {
                        //     id: 0, name: "Others",
                        //     created_at: null,
                        //     updated_at: null
                        // };
                        // this.modulemodels.push(obj);
                    }
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
            (response:any) => {

                this.modulemodels = response.data;
                console.log("this.modulemodels",this.modulemodels);
                
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

    fetchInverterMakesData(index = 0) {

        console.log('fetchInverterMake', index);

        this.apiService.getInverterMake().subscribe(
            (response:any) => {
                console.log(response);
                
                this.invertermakes = response.data;
                // var obj = {
                //     id: 0, name: "Others",
                //     created_at: null,
                //     updated_at: null
                // };
                // this.invertermakes.push(obj);
                this.numberOfInverters[index].filteredInverterMakes = this.desginForm.get(this.numberOfInverters[index].invertermake).valueChanges.pipe(
                    startWith(""),
                    map(value => (typeof value === "string" ? value : value.name)),
                    map(name => (name ? this._filterInverterMake(name) : this.invertermakes.slice()))
                );
                    console.log("numberOfInverters",this.numberOfInverters);
                    
                this.numberOfInverters[index].tempFilteredInverterMakes = _.cloneDeep(this.invertermakes);

            },
            error => {
                this.utils.errorSnackBar("Error");
            }
        );
    }

    fetchInverterModelsData(_event: any, make, index) {

        console.log('fetchInverterModelsData', index, make);
        //this.desginForm.patchValue({ invertermodel: " " })
        if (_event.isUserInput) {
            
            // this.desginForm.get(this.numberOfInverters[index].invertermodel).setValue("");
            if (this.isEditMode) {
                this.numberOfInverters[index].selectedInverterModelID = null;
            }
            this.invertermodels = [];
            this.numberOfInverters[index].selectedInverterMakeID = make.id;
            if (make.name === 'None') {
                this.numberOfInverters[index].invertercountdisable = true;
                this.numberOfInverters[index].invertermakedisable = true;
                this.numberOfInverters[index].inveretereror = false;
                this.addextrainverters = false;
                this.desginForm.get(this.numberOfInverters[index].inverterscount).setValue('0');
                this.desginForm.get(this.numberOfInverters[index].invertermodel).setValue('None');
                this.commentrequi = false;
            } else if (make.name === 'others') {
                this.numberOfInverters[index].invertercountdisable = false;
                this.numberOfInverters[index].invertermakedisable = false;
                this.numberOfInverters[index].inveretereror = true;
                this.desginForm.get(this.numberOfInverters[index].inverterscount).setValue('');
                this.desginForm.get(this.numberOfInverters[index].invertermodel).setValue('others');
                this.addextrainverters = true;
                this.commentrequi = true;
                this.place = 'Please enter module make,module model,inverter make,inverter model and inverterscount here..';
            } else {
                this.numberOfInverters[index].invertercountdisable = false;
                this.numberOfInverters[index].invertermakedisable = false;
                this.numberOfInverters[index].inveretereror = false;
                this.addextrainverters = false;
                this.place = 'Start typing here';
                this.commentrequi = false;
            }
            this.apiService.getInverterMade(make.id).subscribe(
                (response:any) => {


                    // this.numberOfInverters[index].invertermodellist = response;

                    this.invertermodels = response.data;
                    if (make.name === 'Others') {
                        // var obj = {
                        //     id: 0,
                        //     name: "Others",
                        //     created_at: null,
                        //     updated_at: null
                        // };
                        // this.invertermodels.push(obj);
                    }
                    this.numberOfInverters[index].filteredInverterModels =
                        this.desginForm.get(this.numberOfInverters[index].invertermodel).valueChanges.pipe(
                            startWith(""),
                            map(value => (typeof value === "string" ? value : value.name)),
                            map(name => (name ? this._filterInverterModel(name) : this.invertermodels.slice()))
                        );

                    console.log(this.numberOfInverters);
                    // this.filteredInverterModels=this.invertermodels;
                    this.numberOfInverters[index].tempFilteredInverterModels = _.cloneDeep(this.invertermodels);
                },
                error => {
                    this.utils.errorSnackBar("Error");
                }
            );

            console.log('this.numberOfInverters', this.numberOfInverters);
        }
    }

    loadInverterModelsData() {
        // console.log("loadinveretrsmodel");
        
        this.invertermodels = [];
        this.apiService.getInverterMade(this.selectedInverterMakeID).subscribe(
            (response:any) => {
                // console.log("load",response);
                
                this.invertermodels = response.data;
                // console.log(this.invertermodels);
                
                this.filteredInverterModels = this.desginForm.get('invertermodel').valueChanges.pipe(
                    startWith(""),
                    map(value => (typeof value === "string" ? value : value.name)),
                    map(name => (name ? this._filterInverterModel(name) : this.invertermodels.slice()))
                );
                    console.log(this.invertermodels);
                    
            },
            error => {
                this.utils.errorSnackBar("Error");
            }
        );
    }

    setSelectedInverterModel(model, index) {
        console.log('setSelectedInverterModel', model, index);

        //console.log('model');

        //console.log('model'+this.numberOfInverters[index].invertermodellist);

        /* const toSelect = this.numberOfInverters[index].invertermodellist.find(
        (c) => c.name == model?.value
        );*/
        //this.numberOfInverters[index].selectedInverterModelID = model.id;

        this.numberOfInverters[index].selectedInverterModelID = model.id;

        this.numberOfInverters[index].filteredInverterModels =
            this.desginForm.get(this.numberOfInverters[index].invertermodel).valueChanges.pipe(
                startWith(""),
                map(value => (typeof value === "string" ? value : value.name)),
                map(name => (name ? this._filterInverterModel(name) : this.numberOfInverters[index].tempFilteredInverterModels.slice()))
            );
                    console.log(this.numberOfInverters);
                    
            this.isinvertertypestring = true;
    }




    goBack() {
        this.mixpanelService.track("PERMITDESIGN_PAGE_CLOSE", {});
        this.navController.pop();

    }

    eventcheck(e) {
        this.showValue = e.target.value;
        console.log('show' + this.showValue);

    }

    // addressValue(){
    // // }
    // this.addressSubscription = this.utils.getAddressObservable().subscribe((address) => {


    //     // this.desginForm.get('address').setValue('124/345');
    //     // this.desginForm.get('latitude').setValue('24.553333');
    //     // this.desginForm.get('longitude').setValue('80.5555555555');
    //     // this.desginForm.get('country').setValue('india');
    //     // this.desginForm.get('city').setValue('Lucknow');
    //     // this.desginForm.get('state').setValue('UP');
    //     // this.desginForm.get('postalcode').setValue(3232343);
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

    // //this.getSolarMake();

    // }
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

                    this.oldcommentid = this.design.comments == '' ? '' : this.design.comments[0].id;

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

        if (this.uploadbox != 'true') {
          //  this.arcFileUrl = [];
           // this.archFiles = [];
           this.architecturalFileUpload = false;
           

        }else{

            
        }
        this.uploadcontrolvalidation();


    }

    

    showfire(e) {
        this.firebox = e.target.value;



    }

    saveModuleMake() {

        const found = this.modulemakes.some(el => el.name === this.desginForm.get("modulemake").value);
        if (!found) {

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

        const found = this.modulemodels.some(el => el.name === this.desginForm.get("modulemodel").value);

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
        var inverter = this.desginForm.get("invertermake").value;
        if ((!ismakefound || !found) && inverter != '') {
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



        //  ;
        // this.saveModuleMake();

        if (this.desginForm.status === 'VALID') {

            //console.log("res service charges", this.res.assessment_residential);

            if (this.desginForm.get('projecttype').value == 'residential') {
                if (this.desginForm.get('jobtype').value == 'pv') {
                    this.amount = this.res.permit_pv_residential.price
                    this.slabname = this.res.permit_pv_residential.turnaroundtime
                }
                else if (this.desginForm.get('jobtype').value == 'battery') {
                    this.amount = this.res.permit_battery_residential.price
                    this.slabname = this.res.permit_battery_residential.turnaroundtime
                }
                else if (this.desginForm.get('jobtype').value == 'pvbattery') {
                    this.amount = this.res.permit_pvbattery_residential.price
                    this.slabname = this.res.permit_pvbattery_residential.turnaroundtime
                }
            }
            else if (this.desginForm.get('projecttype').value == 'commercial' || this.desginForm.get('projecttype').value == 'detachedbuildingorshop' || this.desginForm.get('projecttype').value == 'carport') {
                let solarCapcity = this.desginForm.get('monthlybill').value / 1150
                if (solarCapcity > 0 && solarCapcity <= 49) {
                    this.amount = this.res.permit_0_49commercial.price
                    this.slabname = this.res.permit_0_49commercial.turnaroundtime
                }
                else if (solarCapcity > 49 && solarCapcity <= 99) {
                    this.amount = this.res.permit_50_99commercial.price
                    this.slabname = this.res.permit_50_99commercial.turnaroundtime
                }
                else if (solarCapcity > 99 && solarCapcity <= 199) {
                    this.amount = this.res.permit_100_199commercial.price
                    this.slabname = this.res.permit_100_199commercial.turnaroundtime
                }
                else if (solarCapcity > 199 && solarCapcity <= 299) {
                    this.amount = this.res.permit_200_299commercial.price
                    this.slabname = this.res.permit_200_299commercial.turnaroundtime
                }
                else if (solarCapcity > 299) {
                    this.amount = this.res.permit_200_299commercial.price
                    this.slabname = this.res.permit_200_299commercial.turnaroundtime
                    for (let i = 300; i <= solarCapcity; i = i + 100) {
                        this.amount += this.res.permit_above_299_commercial.price
                    }
                }
            }

            console.log(this.amount);


            if (this.formValue == 'send') {
                // this.saveModuleMake();
                this.submitform();
            } else {
                this.submitform();
                //this.saveModuleMake();
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
            var paymentstatus;
            var isoutsourced;
            var deliverydate;

            var newConstruction = this.desginForm.get("newconstruction").value;
            var creatorparentid;
            var createdby;
            if (this.designCreatedBy) {
                createdby = this.designCreatedBy;
                creatorparentid = this.designCreatedByUserParent;
                var tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 2);
                designstatus = "requestaccepted";
                designoutsourcedto = "232";
                isoutsourced = "true";
                var designacceptancestarttime = new Date();
                designacceptancestarttime.setMinutes(designacceptancestarttime.getMinutes() + 30);
                deliverydate = tomorrow.toISOString();
                console.log('create by ' + createdby + 'creatorparentid' + creatorparentid);
            } else {
                designstatus = "created";
                designoutsourcedto = null;
                isoutsourced = "false";
                deliverydate = null;
                createdby = this.userdata.id;
                creatorparentid = this.userdata.parent.id;
            }
            var designinverters = [];
            if (this.numberOfInverters.length > 0) {
                this.numberOfInverters.forEach((element, index) => {
                    designinverters.push({
                        invertermake: this.numberOfInverters[index].selectedInverterMakeID,
                        invertermodel: this.numberOfInverters[index].selectedInverterModelID,
                        invertercount: this.desginForm.get(this.numberOfInverters[index].inverterscount).value.toString(),
                    });
                });
            }

            var designbatteries = [];
            if (this.designbattries.length > 0) {
                this.designbattries.forEach((element, index) => {
                    designbatteries.push({
                        batterymake: this.designbattries[index].selectedBatteryMakeID,
                        batterymodel: this.designbattries[index].selectedBatteryModelID,
                        batteriescount: parseInt(this.desginForm.get(this.designbattries[index].batteriescount).value),
                        batterycombinerbox: this.desginForm.get(this.designbattries[index].batterycombinerbox).value.toString() });
                });
            }
            
            var newConstruction = this.desginForm.get("newconstruction").value;

            if(newConstruction == 'true' && this.archFiles.length>0){

                this.desginForm.get("architecturaldesign").setValue('true');
            }else{
            this.desginForm.get("architecturaldesign").setValue('false');

            }
            console.log('newConstruction',this.desginForm.get("newconstruction").value);
            console.log('architecturaldesign',this.desginForm.get("architecturaldesign").value);
            console.log('archfiles',this.archFiles.length);
            if (this.designId === 0) {

                if (this.formValue === 'save' || this.send === ScheduleFormEvent.SAVE_PERMIT_FORM) {
                    this.mixpanelService.track("SAVE_PERMITDESIGN_PAGE", {});
                    let data
                    if (this.surveydatapresent) {
                        data = {
                            address: this.desginForm.get('address').value,
                            amount: this.amount,
                            apnnumber: null,
                            chatid: this.desginForm.get('requesttype').value + "_" + new Date().getTime(),
                            city: this.desginForm.get('city').value,
                            comments: this.desginForm.get('comments').value,
                            country: this.desginForm.get('country').value,
                            createdby:createdby,
                            creatorparentid: creatorparentid,
                            dataentry: false,
                            design: null,
                            designacceptancestarttime: deliverydate,
                            designbatteries:designbatteries,
                            designgoverningcode: this.desginForm.get('governingcode').value,
                            designinverters: designinverters,
                            email: this.desginForm.get('email').value,
                            esiid: this.desginForm.get('esiid').value.toString(),
                            expecteddeliverydate: deliverydate,
                            exposurecategory: this.desginForm.get('exposurecategory').value,
                            groupchatpassword: "wattmonk" + new Date().getTime(),
                            hashkey:  "" + new Date().getTime() + "",
                            irc: this.desginForm.get('irc').value,
                            isdesigncompleted: false,
                            isonpriority: false,
                            isoptimizeradded: this.desginForm.get('isoptimizeradded').value,
                            isoutsourced: true,
                            issurveycompleted: false,
                            jobnumber: "",
                            jobtype: this.desginForm.get('jobtype').value,
                            latitude: this.desginForm.get('latitude').value,
                            longitude: this.desginForm.get('longitude').value,
                            leadid: null,
                            modulecount: parseInt(this.desginForm.get('modulecount').value),
                            mountingtype: this.desginForm.get('mountingtype').value,
                            name: this.desginForm.get('name').value,
                            nec:  this.desginForm.get('nec').value,
                            newconstruction: JSON.parse(this.desginForm.get('newconstruction').value),
                            optimizer: this.desginForm.get('optimizer').value,
                            outsourcedto: null,
                            paymentstatus: null,
                            pestamprequired: false,
                            phonenumber: pnumber.toString(),
                            postalcode: parseInt(this.desginForm.get('postalcode').value),
                            projectsubtype: this.desginForm.get('propertysubtype').value,
                            projecttype: this.desginForm.get('projecttype').value,
                            raiserequestreason: "",
                            recordidsf: "",
                            requesttype: this.desginForm.get('requesttype').value,
                            sameemailconfirmed: null,
                            solarcapacity: parseInt(this.desginForm.get('monthlybill').value),
                            solarmake: this.selectedModuleMakeID,
                            solarmodel: this.selectedModuleModelID,
                            source: this.desginForm.get('source').value,
                            state: this.desginForm.get('state').value,
                            status: designstatus,
                            survey: null,
                            tasktype: "fulljob",
                            typingaddress: this.desginForm.get('typingaddress').value,
                            utilityaccnumber: ""  ,
                            rooftype: this.desginForm.get('rooftype').value,
                            mpurequired: this.desginForm.get('mpurequired').value,
                            tiltofgroundmountingsystem: this.desginForm.get('tiltofgroundmountingsystem').value,                        
                        }
                    } else {
                        data = {
                            address: this.desginForm.get('address').value,
                            amount: this.amount,
                            apnnumber: null,
                            chatid: this.desginForm.get('requesttype').value + "_" + new Date().getTime(),
                            city: this.desginForm.get('city').value,
                            comments: this.desginForm.get('comments').value,
                            country: this.desginForm.get('country').value,
                            createdby:createdby,
                            creatorparentid: creatorparentid,
                            dataentry: false,
                            design: null,
                            designacceptancestarttime: deliverydate,
                            designbatteries:designbatteries,
                            designgoverningcode: this.desginForm.get('governingcode').value,
                            designinverters: designinverters,
                            email: this.desginForm.get('email').value,
                            esiid: this.desginForm.get('esiid').value.toString(),
                            expecteddeliverydate: deliverydate,
                            exposurecategory: this.desginForm.get('exposurecategory').value,
                            groupchatpassword: "wattmonk" + new Date().getTime(),
                            hashkey:  "" + new Date().getTime() + "",
                            irc: this.desginForm.get('irc').value,
                            isdesigncompleted: false,
                            isonpriority: false,
                            isoptimizeradded: this.desginForm.get('isoptimizeradded').value,
                            isoutsourced: true,
                            issurveycompleted: false,
                            jobnumber: "",
                            jobtype: this.desginForm.get('jobtype').value,
                            latitude: this.desginForm.get('latitude').value,
                            longitude: this.desginForm.get('longitude').value,
                            leadid: null,
                            modulecount: parseInt(this.desginForm.get('modulecount').value),
                            mountingtype: this.desginForm.get('mountingtype').value,
                            name: this.desginForm.get('name').value,
                            nec:  this.desginForm.get('nec').value,
                            newconstruction: JSON.parse(this.desginForm.get('newconstruction').value),
                            optimizer: this.desginForm.get('optimizer').value,
                            outsourcedto: null,
                            paymentstatus: null,
                            pestamprequired: false,
                            phonenumber: pnumber.toString(),
                            postalcode: parseInt(this.desginForm.get('postalcode').value),
                            projectsubtype: this.desginForm.get('propertysubtype').value,
                            projecttype: this.desginForm.get('projecttype').value,
                            raiserequestreason: "",
                            recordidsf: "",
                            requesttype: this.desginForm.get('requesttype').value,
                            sameemailconfirmed: null,
                            solarcapacity: parseInt(this.desginForm.get('monthlybill').value),
                            solarmake: this.selectedModuleMakeID,
                            solarmodel: this.selectedModuleModelID,
                            source: this.desginForm.get('source').value,
                            state: this.desginForm.get('state').value,
                            status: designstatus,
                            survey: null,
                            tasktype: "fulljob",
                            typingaddress: this.desginForm.get('typingaddress').value,
                            utilityaccnumber: ""  ,
                            rooftype: this.desginForm.get('rooftype').value,
                            mpurequired: this.desginForm.get('mpurequired').value,
                            tiltofgroundmountingsystem: this.desginForm.get('tiltofgroundmountingsystem').value,   
                        }
                    }


                    // this.apiService.addDesginForm(this.desginForm.value).subscribe(response => {
                    this.utils.showLoading('Saving').then(() => {
                        this.apiService.addPermitForm(data).subscribe(response => {
                           
                            this.utils.hideLoading().then(() => {
                               // this.getClientsadmins(creatorparentid,data);
                               this.sendDesignGeneralInfoupload =true;
                                if (newConstruction == 'true') {

                                    // if(this.architecturalFileUpload){
                                    this.uploaarchitecturedesign(response.id, 'architecturaldesign', this.archFiles[0], 0);
                                    // }
                                } else if (newConstruction == 'false') {

                                    if (this.attachmentFileUpload) {
                                        this.uploadAttachmentDesign(response.id, 'attachments', this.permitFiles[0], 0)
                                    }else if (this.sendDesignGeneralInfoupload) {
                                        this.utils.hideLoading();
                                        this.sendDesignGeneralInfo(response.id);
                                    } else {
                                        
                                       
                                        this.router.navigate(['/permit-home'])
                                        this.utils.showSnackBar('Design have been Created');
                                        // this.utils.showSnackBar('Design have been saved');
                                        this.utils.setHomepagePermitRefresh(true);
                                        
                                    }
                                }
                                // setTimeout(()=>{
                                //   this.utils.hideLoading().then(() => {

                                //     // this.createChatGroup(response);
                                //     this.router.navigate(['/permit-home'])
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
                            console.log(error)
                            if (responseError.error.status == "alreadyexist") {
                                var message = responseError.error.message.message;
                                this.confirmEmail(message);
                            }
                            else {
                                this.utils.errorSnackBar(error.message);
                            }
                        });


                    });

                }
                 else if (this.formValue === 'send') {
                    let postData
                    this.mixpanelService.track("ORDER_PERMITDESIGN_PAGE", {});

                     postData = {


                        /*
                                    chatid : this.desginForm.get('requesttype').value + "_" + new Date().getTime(),
                                    groupchatpassword: "wattmonk" + new Date().getTime(),
                                    email: this.desginForm.get('email').value,
                                    name: this.desginForm.get('name').value,
                                    phonenumber: pnumber.toString(),
                                    address: this.desginForm.get('address').value,
                                    solarmake: this.selectedModuleMakeID,
                                    solarmodel: this.selectedModuleModelID,
                                    rooftype: this.desginForm.get('rooftype').value,
                                    jobtype: this.desginForm.get('jobtype').value,
                                    mountingtype: this.desginForm.get('mountingtype').value,
                                    tiltofgroundmountingsystem: this.desginForm.get('tiltofgroundmountingsystem').value,
                                    projecttype: this.desginForm.get('projecttype').value,
                                    newconstruction: this.desginForm.get('newconstruction').value,
                                    comments: this.desginForm.get('comments').value,
                                    city: this.desginForm.get('city').value,
                                    state: this.desginForm.get('state').value,
                                    postalcode: this.desginForm.get('postalcode').value,
                                    requesttype: this.desginForm.get('requesttype').value,
                                    latitude: this.desginForm.get('latitude').value,
                                    longitude: this.desginForm.get('longitude').value,
                                    isonpriority: false,
                                    source: this.desginForm.get('source').value,
                                    status: this.desginForm.get('status').value,
                                    createdby: this.storage.getUserID(),
                                    creatorparentid: this.storage.getParentId(),
                                    outsourcedto: designoutsourcedto,
                                    paymentstatus:paymentstatus,
                                    isoutsourced: isoutsourced,
                                    designacceptancestarttime: designacceptancestarttime,
                                    issurveycompleted: this.desginForm.get('issurveycompleted').value,
                                    survey:null,
                                    design: null,
                                    amount:this.amount,
                                    mpurequired:this.desginForm.get('mpurequired').value,
                                    sameemailconfirmed:this.desginForm.get('sameemailconfirmed').value,
                                    expecteddeliverydate: deliverydate,
                                    isdesigncompleted: false,
                                    modulecount: this.desginForm.get('modulecount').value,
                                    solarcapacity: this.desginForm.get('monthlybill').value,
                                    esiid: this.desginForm.get('esiid').value.toString(),
                                    //assignedto: this.desginForm.get('assignedto').value,
                                    
                                    
                                    //architecturaldesign: this.desginForm.get('architecturaldesign').value,
                                    designinverters : [ { invertermake: this.selectedInverterMakeID,
                                    invertermodel: this.selectedInverterModelID,
                                    inverterscount: this.desginForm.get('inverterscount').value
                                  }],
                                    dataentry: false,
                                      raiserequestreason: "",
                                      
                                      typingaddress: this.desginForm.get('typingaddress').value,
                                      leadid : null,
                                      apnnumber: null
                                    
                                    */


                        //country: this.desginForm.get('country').value,


                        //attachments: this.desginForm.get('attachments').value,


                        //


                        address: this.desginForm.get('address').value,
                        amount: this.amount,
                        apnnumber: null,
                        chatid: this.desginForm.get('requesttype').value + "_" + new Date().getTime(),
                        city: this.desginForm.get('city').value,
                        comments: this.desginForm.get('comments').value,
                        country: this.desginForm.get('country').value,
                        createdby: createdby,
                        creatorparentid: creatorparentid,
                        dataentry: false,
                        design: null,
                        designacceptancestarttime: deliverydate,
                        designinverters: designinverters,
                        // designinverters: [
                        //   {
                        //     invertercount: this.desginForm.get('inverterscount').value.toString(),
                        //     invertermake: this.desginForm.get('invertermake').value,
                        //     invertermodel: this.desginForm.get('invertermodel').value
                        //   }
                        // ],
                        email: this.desginForm.get('email').value,
                        esiid: this.desginForm.get('esiid').value.toString(),
                        expecteddeliverydate: deliverydate,
                        groupchatpassword: "wattmonk" + new Date().getTime(),
                        hashkey: "" + new Date().getTime() + "",
                        isdesigncompleted: false,
                        isonpriority: false,
                        isoutsourced: false,
                        issurveycompleted: false,
                        jobtype: this.desginForm.get('jobtype').value,
                        latitude: this.desginForm.get('latitude').value,
                        longitude: this.desginForm.get('longitude').value,
                        modulecount: parseInt(this.desginForm.get('modulecount').value),
                        mountingtype: this.desginForm.get('mountingtype').value,
                        mpurequired: this.desginForm.get('mpurequired').value,
                        name: this.desginForm.get('name').value,
                        newconstruction: JSON.parse(this.desginForm.get('newconstruction').value),
                        outsourcedto: null,
                        paymentstatus: null,
                        phonenumber: pnumber.toString(),
                        postalcode: parseInt(this.desginForm.get('postalcode').value),
                        projecttype: this.desginForm.get('projecttype').value,
                        raiserequestreason: "",
                        requesttype: this.desginForm.get('requesttype').value,
                        rooftype: this.desginForm.get('rooftype').value,
                        sameemailconfirmed: null,
                        solarcapacity: parseInt(this.desginForm.get('monthlybill').value),
                        solarmake: this.selectedModuleMakeID,
                        solarmodel: this.selectedModuleModelID,
                        source: this.desginForm.get('source').value,
                        state: this.desginForm.get('state').value,
                        status: this.desginForm.get('status').value,
                        survey: null,
                        tiltofgroundmountingsystem: this.desginForm.get('tiltofgroundmountingsystem').value,
                        typingaddress: this.desginForm.get('typingaddress').value,
                        leadid : null,
                        projectsubtype: this.desginForm.get('propertysubtype').value,
                        designbatteries:designbatteries,
                        designgoverningcode: this.desginForm.get('governingcode').value,
                        exposurecategory: this.desginForm.get('exposurecategory').value,
                        irc: this.desginForm.get('irc').value,
                        isoptimizeradded:this.desginForm.get('isoptimizeradded').value,
                        jobnumber: this.desginForm.get('jobnumber').value,
                        nec: this.desginForm.get('nec').value,
                        optimizer: this.desginForm.get('optimizer').value,
                        pestamprequired: this.desginForm.get('pestamprequired').value,
                        recordidsf: "",
                        tasktype: "fulljob",
                        utilityaccnumber: this.desginForm.get('utilityaccnumber').value,      
                    }


                    // this.apiService.addDesginForm(this.desginForm.value).subscribe(response => {
                    this.apiService.addPermitForm(postData).subscribe(response => {
                       // this.createChatGroup(postData);
                        this.utils.hideLoading().then(() => {
                           // this.getClientsadmins(creatorparentid,postData);
                            this.value = response.id;
                            this.sendDesignGeneralInfoupload = true;
                            //this.sendDesignGeneralInfo(this.value);
                            if (newConstruction == 'true') {
                                // if(this.architecturalFileUpload){
                                this.uploaarchitecturedesign(response.id, 'architecturaldesign', this.archFiles[0], 0);
                                // }
                            } else if (newConstruction == 'false') {
                                if (this.attachmentFileUpload) {
                                    this.uploadAttachmentDesign(response.id, 'attachments', this.permitFiles[0], 0);
                                }else if (this.sendDesignGeneralInfoupload) {
                                    this.utils.hideLoading();
                                    this.sendDesignGeneralInfo(response.id);
                                }
                                else {
                                    
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
                                        state: { productdetails: objToSend }
                                    });
                                }
                            }
                            // this.utils.hideLoading().then(() => {
                            //   // this.createChatGroup(response);

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

                            // this.router.navigate(['/home'])
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
                        console.log(error)
                        if (responseError.error.status == "alreadyexist") {
                            var message = responseError.error.message.message;
                            this.confirmEmail(message);
                        }
                        else {
                            this.utils.errorSnackBar(error.message);
                        }
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
                            createdby: createdby,
                            //assignedto: this.desginForm.get('assignedto').value,
                            rooftype: this.desginForm.get('rooftype').value,
                            
                            tiltofgroundmountingsystem: this.desginForm.get('tiltofgroundmountingsystem').value,
                            mountingtype: this.desginForm.get('mountingtype').value,
                            jobtype: this.desginForm.get('jobtype').value,
                            projecttype: this.desginForm.get('projecttype').value,
                            newconstruction: JSON.parse(this.desginForm.get('newconstruction').value),
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
                            deliverydate: deliverydate,
                            creatorparentid: creatorparentid,
                            outsourcedto: designoutsourcedto,
                            designacceptancestarttime: designacceptancestarttime,
                            isoutsourced: isoutsourced,
                            // isdesignraised: false,
                            oldcommentid: this.oldcommentid,
                            invertercount: this.desginForm.get('inverterscount').value,
                            sameemailconfirmed: this.desginForm.get('sameemailconfirmed').value,
                            projectsubtype: this.desginForm.get('propertysubtype').value,
                            designbatteries:designbatteries,
                            designgoverningcode: this.desginForm.get('governingcode').value,
                            exposurecategory: this.desginForm.get('exposurecategory').value,
                            irc: this.desginForm.get('irc').value,
                            isoptimizeradded:this.desginForm.get('isoptimizeradded').value,
                            jobnumber: this.desginForm.get('jobnumber').value,
                            nec: this.desginForm.get('nec').value,
                            optimizer: this.desginForm.get('optimizer').value,
                            pestamprequired: JSON.parse(this.desginForm.get('pestamprequired').value),
                            recordidsf: "",
                            tasktype: "fulljob",
                            utilityaccnumber: this.desginForm.get('utilityaccnumber').value,      
                        }

                        this.apiService.updateDesignForm(data, this.designId).subscribe(response => {
                            this.sendDesignGeneralInfoupload = true;
                            this.utils.hideLoading().then(() => {
                                //this.getClientsadmins(creatorparentid,data);
                                if (newConstruction == 'true') {
                                    // if(this.architecturalFileUpload){

                                    this.uploaarchitecturedesign(response.id, 'architecturaldesign', this.archFiles[0], 0);
                                    // }
                                } else if (newConstruction == 'false') {
                                    if (this.attachmentFileUpload) {


                                        this.uploadAttachmentDesign(response.id, 'attachments', this.permitFiles[0], 0)
                                    } else if (this.sendDesignGeneralInfoupload) {
                                        this.utils.hideLoading();
                                        this.sendDesignGeneralInfo(response.id);
                                    }else {
                                        
                                        this.router.navigate(['/permit-home'])
                                        this.utils.showSnackBar('Design have been Created');
                                        // this.utils.showSnackBar('Design have been saved');
                                        this.utils.setHomepagePermitRefresh(true);
                                    }
                                }
                                // if(this.isArcFileDelete){
                                //   this.deleteArcFile(this.indexOfArcFiles);
                                // }

                                // this.utils.hideLoading().then(() => {

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
                        invertercount: this.desginForm.get('inverterscount').value,
                        createdby: createdby,
                        //assignedto: this.desginForm.get('assignedto').value,
                        rooftype: this.desginForm.get('rooftype').value,
                       
                        tiltofgroundmountingsystem: this.desginForm.get('tiltofgroundmountingsystem').value,
                        mountingtype: this.desginForm.get('mountingtype').value,
                        jobtype: this.desginForm.get('jobtype').value,
                        projecttype: this.desginForm.get('projecttype').value,
                        newconstruction: JSON.parse(this.desginForm.get('newconstruction').value),
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
                        expecteddeliverydate: deliverydate,
                        creatorparentid: creatorparentid,
                        // isdesignraised: false,
                        oldcommentid: this.oldcommentid,
                        inverterscount: this.desginForm.get('inverterscount').value,
                        projectsubtype: this.desginForm.get('propertysubtype').value,
                        designbatteries:designbatteries,
                            designgoverningcode: this.desginForm.get('governingcode').value,
                            exposurecategory: this.desginForm.get('exposurecategory').value,
                            irc: this.desginForm.get('irc').value,
                            isoptimizeradded:this.desginForm.get('isoptimizeradded').value,
                            jobnumber: this.desginForm.get('jobnumber').value,
                            nec: this.desginForm.get('nec').value,
                            optimizer: this.desginForm.get('optimizer').value,
                            pestamprequired: JSON.parse(this.desginForm.get('pestamprequired').value),
                            recordidsf: "",
                            tasktype: "fulljob",
                            utilityaccnumber: this.desginForm.get('utilityaccnumber').value,       

                    }
                    this.apiService.updateDesignForm(postData, this.designId).subscribe(response => {

                        this.utils.hideLoading().then(() => {
                            this.value = response.id;
                            this.sendDesignGeneralInfoupload = true;
                            if (newConstruction == 'true') {
                                // if(this.architecturalFileUpload){
                                this.uploaarchitecturedesign(response.id, 'architecturaldesign', this.archFiles[0], 0);
                                // }
                            } else if (newConstruction == 'false') {
                                if (this.attachmentFileUpload) {
                                    this.uploadAttachmentDesign(response.id, 'attachments', this.permitFiles[0], 0)
                                } else if (this.sendDesignGeneralInfoupload) {
                                    this.utils.hideLoading();
                                    this.sendDesignGeneralInfo(response.id);
                                }else {
                                    let objToSend: NavigationExtras = {
                                        queryParams: {
                                            id: response.id,
                                            designData: "permit",
                                            fulldesigndata: response
                                        },
                                        skipLocationChange: false,
                                        fragment: 'top'
                                    };


                                }
                                this.apiService.updateDesignForm(postData, this.designId).subscribe(response => {

                                    this.utils.hideLoading().then(() => {
                                       // this.getClientsadmins(creatorparentid,postData);
                                        this.value = response.id;
                                        if (newConstruction == 'true') {
                                            // if(this.architecturalFileUpload){
                                            this.uploaarchitecturedesign(response.id, 'architecturaldesign', this.archFiles[0], 0);
                                            // }
                                        }
                                        else if (newConstruction == 'false') {
                                            if (this.attachmentFileUpload) {
                                                this.uploadAttachmentDesign(response.id, 'attachments', this.permitFiles[0], 0)
                                            }
                                            else {
                                                
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
                                                    state: { productdetails: objToSend }
                                                });
                                            }
                                        }
                                        // if(this.isArcFileDelete){

                                        //   this.deleteArcFile(this.indexOfArcFiles);
                                        // }
                                        //       this.utils.hideLoading().then(() => {


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
                        })


                    });
                }
            }
        } else {
            this.error();
        }
    }

    // send deisgn general information after design submitted
    sendDesignGeneralInfo(designId) {
        var genedat = {
            batterybackup: this.desginForm.get('batterybackup').value,
            riskcategory: this.desginForm.get('riskcat').value,
            financingtype: this.desginForm.get('financing').value,
            lessormeter: this.desginForm.get('meterlessor').value,
            ahjdetails: this.selectedahjsID,
            utilitydetails: this.selectedutilityID,
            firesetbackdetails: {
                firesetback: this.desginForm.get('fire').value,
                setbackdetails: this.desginForm.get('setbackdetails').value
            },
            design: designId,
            source: this.desginForm.get('source').value,
            addedby: parseInt(this.desginForm.get('createdby').value),
            state: this.desginForm.get('state').value,
            city: this.desginForm.get('city').value,
            ahjaddress: null,
            ahjcontactnumber: null
        }

        console.log('genedat', genedat);


        this.apiService.addgeneralinfoDesginForm(genedat).subscribe(response => {
            console.log(genedat);

            if (this.moduleFiles.length > 0) {


                this.uploamoduledesign(response.id, this.moduleFiles[0], "moduleslayoutdesign",
                    "designgeneralinformation");

            }else{

                if (this.formValue === 'save' || this.send === ScheduleFormEvent.SAVE_PERMIT_FORM) {
                    if (this.designId == 0) {
                        this.router.navigate(['/permit-home'])
                        this.utils.showSnackBar('Design have been Created');
                        // this.utils.showSnackBar('Design have been saved');
                        this.utils.setHomepagePermitRefresh(true);
                    } else {
                        this.router.navigate(['/permit-home'])
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
                        state: { productdetails: objToSend }
                    });
                }


            }

        });
    }


    error() {
        if (this.desginForm.value.name == '' || this.desginForm.get('name').hasError('pattern')) {

            this.utils.errorSnackBar('Please check the field name.');
        } else if (this.desginForm.value.email == '' || this.desginForm.get('email').hasError('pattern') || this.desginForm.value.email == undefined) {
            this.utils.errorSnackBar('Please check the field email.');
        } else if (this.desginForm.value.phone == '' || this.desginForm.get('phone').hasError('pattern') || this.desginForm.value.phone == undefined) {
            this.utils.errorSnackBar('Please check the field phone number');
        } else if ((this.desginForm.value.monthlybill == '' || this.desginForm.get('monthlybill').hasError('pattern') || this.desginForm.value.monthlybill == undefined)&& this.desginForm.value.projecttype == 'commercial') {
            this.utils.errorSnackBar('Please check the field annual units.');
        } else if (this.desginForm.value.address == '' || this.desginForm.value.address == null) {
            this.utils.errorSnackBar('Please check the field address.');
        } else if (this.desginForm.value.inverterscount == '' || this.desginForm.get('inverterscount').hasError('pattern') || this.desginForm.value.inverterscount == undefined) {
            this.utils.errorSnackBar('Please check the field inverters count.');
        } else if (this.desginForm.value.modulemake == '' || this.desginForm.get('modulemake').hasError('pattern') || this.desginForm.value.modulemake == undefined) {
            this.utils.errorSnackBar('Please check the field module make.');
        } else if (this.desginForm.value.modulemodel == '' || this.desginForm.get('modulemodel').hasError('pattern') || this.desginForm.value.modulemodel == undefined) {
            this.utils.errorSnackBar('Please check the field module model.');
        } else if (this.desginForm.value.projecttype == '' || this.desginForm.value.projecttype == undefined) {
            this.utils.errorSnackBar('Please fill the Property Type.');
        } else if (this.desginForm.value.jobtype == '' || this.desginForm.value.jobtype == undefined) {
            this.utils.errorSnackBar('Please fill the job type.');
        } else if (this.desginForm.get('mountingtype').value == '' || this.desginForm.get('mountingtype').value == undefined) {
            this.utils.errorSnackBar('Please fill the mounting type.');
        } else if (this.desginForm.get('mountingtype').value == 'both' && (this.desginForm.value.rooftype == '' || this.desginForm.value.tiltofgroundmountingsystem == '')) {
            this.utils.errorSnackBar('Please fill the rooftype / tilt for ground mount.');
        } else if (this.desginForm.get('mountingtype').value == 'ground' && (this.desginForm.value.tiltofgroundmountingsystem == ''  || this.desginForm.value.tiltofgroundmountingsystem == undefined)) {
            this.utils.errorSnackBar('Please check the field tilt for ground mount.');
        } else if (this.desginForm.get('mountingtype').value == 'roof' && (this.desginForm.value.rooftype == '' || this.desginForm.value.rooftype == undefined)) {
            this.utils.errorSnackBar('Please fill the rooftype.');
        } 
        else if (this.desginForm.get('newconstruction').value == 'true' && this.archFiles.length == 0 && (this.desginForm.get('architecturaldesign').value == 'false' || this.desginForm.get('architecturaldesign').value == '' || this.desginForm.get('architecturaldesign').hasError('pattern') || this.desginForm.value.architecturaldesign == undefined )) {

            this.utils.errorSnackBar('Please attach architectural design.');
            


        }
        else if (this.desginForm.value.comments == '' && this.commentrequi == true) {
            this.utils.errorSnackBar('Please add comment.');
        } else {
            this.utils.errorSnackBar("Please Fill all Required information");
        }
    }


    files(event) {


        this.utils.showLoading("Processing").then(() => {

        this.architecturalFileUpload = true;
        let uploadedfiles = 0;
        for (let index = 0; index < event.addedFiles.length; index++) {
            //this.archFiles.push(event.addedFiles[i])

            const element = event.addedFiles[index];
           
            const type = element.name.split(".");
            // WEB ARCHIVE EXT NOT SUPPORTED CODE
            
                this.architecturalFileUpload = true;
                element.isImage = false;
                if (element.type.includes("image")) {
                    element.isImage = true;
                }
                if (type[1] == "heic" || type[1] == "HEIC") {
                    element.isImage = true;
                    const reader = new FileReader();
                    reader.onload = (event: any) => {
                        fetch(event.target.result)
                            .then((res) => res.blob())
                            .then((jpgBlob: Blob) => {
                                let replacedfile;
                                if (type[1] == "HEIC") {
                                    replacedfile = new File(
                                        [jpgBlob],
                                        element.name.replace("HEIC", "jpeg"),
                                        { type: "image/jpeg" }
                                    );
                                } else {
                                    replacedfile = new File(
                                        [jpgBlob],
                                        element.name.replace("heic", "jpeg"),
                                        { type: "image/jpeg" }
                                    );
                                }
                                this.archFiles.push(replacedfile);
                                this.archFiles.forEach(
                                    (item) => {
                                        if (item.name == replacedfile.name)
                                            item["isImage"] = true
                                    }
                                );
                                setTimeout(() => {
                                    this.cdr.detectChanges();
                                }, 300);
                                this.cdr.detectChanges();
                            })
                            .catch(() => {
                                // see error handling section
                            });
                    };
                    reader.readAsDataURL(element);
                } else {
                   /* const extension = element.name.substring(
                        element.name.lastIndexOf(".")
                    );

                    const mimetype = this.utils.getMimetype(extension);
                    // window.console.log(extension, mimetype);
                    const data = new Blob([element], {
                        type: mimetype,
                    });

                    const replacedfile = new File([data], element.name, {
                        type: mimetype,
                    });*/
                    this.archFiles.push(element);
                }
            
            let date = new Date();
            this.hash = date.getTime();
            this.uploadaws
                .fileEvent(
                    event.addedFiles[index],
                    "designs/" + this.hash.toString() + "/architectural"
                )
                .then((res) => {
                    if (res.url) {
                        let postData = {
                            name: event.addedFiles[index].name,
                            ext: "." + event.addedFiles[index].name.split(".").reverse()[0],
                            mime: event.addedFiles[index].type,
                            hash: res.timestamp,
                            size: event.addedFiles[index].size,
                            path: "designs/" + this.hash.toString() + "/architectural",
                            provider: "aws-s3",
                            url: res.url,
                            field: "architecturaldesign",
                            order: index + 1,
                            ref: "designs",
                            refid: null,
                            height: res.height,
                            width: res.width,
                        };
                        this.architecturalpostarray.push(postData);
                        uploadedfiles = uploadedfiles + 1;
                        if (uploadedfiles == event.addedFiles.length) {
                            this.utils.hideLoading();
                            this.cdr.detectChanges();
                        }
                    } else {
                        this.uploadarchitecturalfailedfiles.push(
                            event.addedFiles[index].name
                        );
                        this.archFiles.splice(
                            this.archFiles.indexOf(event.addedFiles[index]),
                            1
                        );
                        // that.attachmentpostarray.splice(index, 1);
                        if (this.architecturalpostarray.length === this.archFiles.length) {
                            this.utils.hideLoading();
                             this.cdr.detectChanges();
                        }
                        if (this.archFiles.length == 0) {
                            this.architecturalFileUpload = false;
                        }
                        this.cdr.detectChanges();
                    }
                });





/*
            //this.getFiletype(event.addedFiles[index]);
            let reader = getFileReader();
            reader.onload = (e: any) => {

                if (event.addedFiles[index].name.includes('.png') || event.addedFiles[index].name.includes('.jpeg') || event.addedFiles[index].name.includes('.jpg') || event.addedFiles[index].name.includes('.gif')) {
                    this.arcFileUrl.push(e.target.result);
                } else {
                    this.arcFileUrl.push('/assets/icon/file.png');
                }
                this.cdr.detectChanges();
            }
            reader.readAsDataURL(event.addedFiles[index]);*/
        }



    });
    }

    permitfiles(event) {

        this.utils.showLoading("Processing").then(() => {

        this.attachmentFileUpload = false;
        let uploadedfiles = 0;

        console.log('per',event);

        for (let index = 0; index < event.addedFiles.length; index++) {


            const element = event.addedFiles[index];
            element.isImage = false;
            if (element.type.includes("image")) {
                element.isImage = true;
            }
            const type = element.name.split(".");
          
                this.attachmentFileUpload = true;
                element.isImage = false;
                if (element.type.includes("image")) {
                    element.isImage = true;
                }

                if (type[1] == "heic" || type[1] == "HEIC") {
                    element.isImage = true;
                    const reader = new FileReader();
                    reader.onload = (event: any) => {
                        fetch(event.target.result)
                            .then((res) => res.blob())
                            .then((jpgBlob: Blob) => {
                                let replacedfile;
                                if (type[1] == "HEIC") {
                                    replacedfile = new File(
                                        [jpgBlob],
                                        element.name.replace("HEIC", "jpeg"),
                                        { type: "image/jpeg" }
                                    );
                                } else {
                                    replacedfile = new File(
                                        [jpgBlob],
                                        element.name.replace("heic", "jpeg"),
                                        { type: "image/jpeg" }
                                    );
                                }
                                this.permitFiles.push(replacedfile);
                                this.permitFiles.forEach(
                                    (item) => {
                                        if (item.name == replacedfile.name)
                                            item["isImage"] = true
                                    }
                                );
                                setTimeout(() => {
                                    this.cdr.detectChanges();
                                }, 300);
                                this.cdr.detectChanges();
                            })
                            .catch(() => {
                                // see error handling section
                            });
                    };
                    reader.readAsDataURL(element);
                } else {
                    const extension = element.name.substring(
                        element.name.lastIndexOf(".")
                    );

                    const mimetype = this.utils.getMimetype(extension);
                    // window.console.log(extension, mimetype);
                    const data = new Blob([element], {
                        type: mimetype,
                    });
                    const replacedfile = new File([data], element.name, {
                        type: mimetype,
                    });
                    replacedfile["isImage"] = element.isImage;
                    this.permitFiles.push(element);
                }
            

            let date = new Date();
            this.hash = date.getTime();

            this.uploadaws.fileEvent(event.addedFiles[index],
                "designs/" + this.hash.toString() + "/attachments"
            )
                .then((res) => {
                    // console.log(res);
                    if (res.url) {
                        let postData = {
                            name: event.addedFiles[index].name,
                            ext: "." + event.addedFiles[index].name.split(".").reverse()[0],
                            mime: event.addedFiles[index].type,
                            hash: res.timestamp,
                            size: event.addedFiles[index].size,
                            path: "designs/" + this.hash.toString() + "/attachments",
                            provider: "aws-s3",
                            url: res.url,
                            field: "attachments",
                            order: index + 1,
                            ref: "designs",
                            refid: null,
                            height: res.height,
                            width: res.width,
                        };
                        this.attachmentpostarray.push(postData);
                        uploadedfiles = uploadedfiles + 1;
                        if (uploadedfiles == event.addedFiles.length) {
                            this.utils.hideLoading();
                            this.cdr.detectChanges();
                        }
                    } else {
                        this.uploadattachmentfailedfiles.push(event.addedFiles[index].name);
                        this.permitFiles.splice(this.permitFiles.indexOf(event.addedFiles[index]), 1);
                        // that.attachmentpostarray.splice(index, 1);
                        if (this.attachmentpostarray.length === this.permitFiles.length) {
                            this.utils.hideLoading();
                            this.cdr.detectChanges();
                        }
                        if (this.permitFiles.length == 0) {
                            this.attachmentFileUpload = false;
                        }
                        this.cdr.detectChanges();
                    }
                });



            //this.getFiletype(event.addedFiles[index]);
            // this.permitFiles.push(event.addedFiles[i])
            // var reader = new FileReader();
           /* let reader = getFileReader();
            reader.onload = (e: any) => {
                if (event.addedFiles[index].name.includes('.png') || event.addedFiles[index].name.includes('.jpeg') || event.addedFiles[index].name.includes('.jpg') || event.addedFiles[index].name.includes('.gif')) {

                    this.imageurls.push(e.target.result);
                } else {
                    this.imageurls.push('/assets/icon/file.png');
                }
                this.cdr.detectChanges();
            }
            reader.readAsDataURL(event.addedFiles[index]);*/
        }
        if (this.permitFiles.length == 1) {
            this.fileName = event.addedFiles[0].name;


        } else if (this.permitFiles.length > 1) {
            this.fileName = this.permitFiles.length;
        } else {
            this.fileName = '';
        }



    });

    }




    getFiletype(file) {
        var extension = file.name.substring(file.name.lastIndexOf('.'));
        var mimetype = this.utils.getMimetype(extension);
        window.console.log(extension, mimetype);
        // var data = new Blob([file], {
        //   type: mimetype
        // });
        // console.log(data);
        // let replaceFile = new File([data], file.name, { type: mimetype })
        if (this.attachmentFileUpload) {
            this.permitFiles.push(file);
        } else if (this.architecturalFileUpload) {
            this.archFiles.push(file)
        }
        this.cdr.detectChanges();
    }

    uploaarchitecturedesign(response?: any, key?: string, fileObj?: File, index?: number) {

        if (!this.architecturalFileUpload) {
            this.uploadAttachmentDesign(response, key, this.permitFiles[0], 0)
        }
        else {

            let date = new Date();
            this.hash = date.getTime();


            this.architecturalpostarray.forEach((element) => {
                element.refid = response;
            });
            this.utils.showLoading("Uploading architecture").then(() => {
                this.apiService.uploadawsdesign(this.architecturalpostarray).subscribe(res => {

                    this.utils.hideLoading();
                    if (this.attachmentFileUpload) {
                        this.utils.hideLoading();

                        this.uploadAttachmentDesign(response, 'attachments', this.permitFiles[0], 0);
                    }
                    else {
                        this.utils.hideLoading();

                        if (this.formValue === 'save' || this.send === ScheduleFormEvent.SAVE_PERMIT_FORM) {
                            if (this.designId == 0) {
                                this.router.navigate(['/permit-home'])
                                this.utils.showSnackBar('Design have been Created');
                                // this.utils.showSnackBar('Design have been saved');
                                this.utils.setHomepagePermitRefresh(true);
                            }
                            else {
                                this.router.navigate(['/permit-home'])
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
                                state: { productdetails: objToSend }
                            });
                        }
                    }

                }, responseError => {
                    this.utils.hideLoading();
                    const error: ErrorModel = responseError.error;
                    this.utils.errorSnackBar(error.message[0].messages[0].message);
                })
            })
            // })
        }
    }


    ionViewWillLeave() {
        this.utils.hideLoading();
        console.log('ionViewWillLeave');  // <- Not in console when leaving
    }

    uploadAttachmentDesign(response?: any, key?: string, fileObj?: File, index?: number) {

        this.attachmentpostarray.forEach((element) => {
            element.refid = response;
        });


        let date = new Date();
        this.hash = date.getTime();

        this.utils.showLoading("Uploading attachment").then(() => {
            this.apiService.uploadawsdesign(this.attachmentpostarray).subscribe(res => {

                //  this.utils.hideLoading();

                this.utils.hideLoading().then(() => {



                   
                    if (this.sendDesignGeneralInfoupload) {
                        this.utils.hideLoading();
                        this.sendDesignGeneralInfo(response);
                    }
                    else {
                        this.utils.hideLoading();

                    if (this.formValue === 'save' || this.send === ScheduleFormEvent.SAVE_PERMIT_FORM) {
                        if (this.designId == 0) {
                            this.router.navigate(['/permit-home'])
                            this.utils.showSnackBar('Design have been Created');
                            // this.utils.showSnackBar('Design have been saved');
                            this.utils.setHomepagePermitRefresh(true);
                        } else {
                            this.router.navigate(['/permit-home'])
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
                            state: { productdetails: objToSend }
                        });
                    }



                }
                });

            }, responseError => {
                //this.utils.hideLoading();

                this.utils.hideLoading().then(() => {
                    const error: ErrorModel = responseError.error;
                    this.utils.errorSnackBar(error.message[0].messages[0].message);
                });
                //this.utils.hideUploadingLoading();

            })
        });



        this.cdr.detectChanges();

    }

    numberfield(event) {


    }

    removeArc(event, i): void {
        this.archFiles.splice(i, 1);
        this.arcFileUrl.splice(i, 1);
        this.cdr.detectChanges();




        let path =
            this.architecturalpostarray[i].path +
            "/" +
            event.name.split(".")[0] +
            "_" +
            this.architecturalpostarray[i].hash +
            "." +
            event.name.split(".")[1];
        //   let data = path + "/" + file.name.split(".")[0] + "_" + file.hash + "." + file.name.split(".")[1]
        this.uploadaws.deleteAwsFile(path).then((res) => {
            this.archFiles.splice(this.archFiles.indexOf(event), 1);
            this.architecturalpostarray.splice(
                this.archFiles.indexOf(event),
                1
            );
            this.cdr.detectChanges();
            if (this.archFiles.length == 0) {
                this.architecturalFileUpload = false;
            }
        });
    }

    removePermit(event, i): void {
        this.permitFiles.splice(i, 1);
        this.imageurls.splice(i, 1);
        this.cdr.detectChanges();
        let path =
            this.attachmentpostarray[i].path +
            "/" +
            event.name.split(".")[0] +
            "_" +
            this.attachmentpostarray[i].hash +
            "." +
            event.name.split(".")[1];
        //   let data = path + "/" + file.name.split(".")[0] + "_" + file.hash + "." + file.name.split(".")[1]
        this.uploadaws.deleteAwsFile(path).then((res) => {
            this.permitFiles.splice(this.permitFiles.indexOf(event), 1);
            this.attachmentpostarray.splice(this.permitFiles.indexOf(event), 1);
            this.cdr.detectChanges();
            if (this.permitFiles.length == 0) {
                this.attachmentFileUpload = false;
            }
        });
    }

    remove(file, i) {
        // this.utils.showLoading('Deleting Architecture Design').then((success)=>{

        // this.utils.hideLoading().then(()=>{
        //   this.utils.showSnackBar('File deleted successfully');
        //   this.navController.navigateRoot(["/permit-schedule",{id:this.designId}]);
        // this.utils.setHomepagePermitRefresh(true);

        //   });
        //   },
        // (error)=>{
        //   this.utils.hideLoading().then(()=> {
        //     this.utils.errorSnackBar('some Error Occured');
        //   });

        // });
        // });

        this.indexOfArcFiles.push(file.id);

        this.isArcFileDelete = true;





        this.architecturalData.splice(i, 1);
        this.deleteArcFile(this.indexOfArcFiles);
        this.cdr.detectChanges();


        let data = "";
        if (file.path == null) {
            data =
                "designs/" +
                this.data.design.id +
                "/" +
                file.name.split(".")[0] +
                "_" +
                file.hash +
                "." +
                file.name.split(".")[1];
        } else {
            data =
                file.path +
                "/" +
                file.name.split(".")[0] +
                "_" +
                file.hash +
                "." +
                file.name.split(".")[1];
        }
        this.uploadaws.deleteAwsFile(data).then((res) => {
            this.apiService.deleteFileAws(file.id).subscribe(
                () => {
                    this.data.design.architecturaldesign.splice(i, 1);
                    this.data.design.architecturaldesign = [...this.data.design.architecturaldesign];

                    this.cdr.detectChanges();
                }, responseError => {
                    this.utils.hideLoading();
                    const error: ErrorModel = responseError.error;
                    this.utils.errorSnackBar(error.message[0].messages[0].message);
                }
            );
        });









    }


    removeattachment(file, i) {

        let data = "";
        if (file.path == null) {
            data =
                "designs/" +
                this.data.design.id +
                "/" +
                file.name.split(".")[0] +
                "_" +
                file.hash +
                "." +
                file.name.split(".")[1];
        } else {
            data =
                file.path +
                "/" +
                file.name.split(".")[0] +
                "_" +
                file.hash +
                "." +
                file.name.split(".")[1];
        }
        this.uploadaws.deleteAwsFile(data).then((res) => {
            this.apiService.deleteFileAws(file.id).subscribe(
                () => {
                    this.data.design.attachments.splice(i, 1);
                    this.data.design.attachments = [...this.data.design.attachments];
                    this.cdr.detectChanges();
                }, responseError => {
                    this.utils.hideLoading();
                    const error: ErrorModel = responseError.error;
                    this.utils.errorSnackBar(error.message[0].messages[0].message);
                }
            );
        });


        this.indexOfAttachmentFiles.push(file.id);

        this.isArcFileDelete = true;





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

        const postData = {
            outsourcedto: 232,
            isoutsourced: "true",
            status: "outsourced",
            designacceptancestarttime: designacceptancestarttime,
            paymenttype: this.utils.getPaymentMode().value,
            couponid: this.utils.getCouponId().value
        };
        var creatorparentid = this.userdata.parent.id;

        this.utils.showLoading('Assigning').then(() => {
            //this.newpermitsRef.update({ count: this.newpermitscount + 1});
            this.apiService.updateDesignForm(postData, /*this.desginForm.get('id').value*/this.value).subscribe((value) => {
                this.utils.hideLoading().then(() => {

                  //  this.getClientsadmins(creatorparentid,value);

                    this.utils.showSnackBar('Design request has been assigned to WattMonk successfully');//.firstname +" "+this.selectedDesigner.lastname + ' ' + 'successfully');
                    this.router.navigate(['/permit-home'])

                    this.utils.setHomepagePermitRefresh(this.isEdit);
                })
            }, (error) => {
                this.utils.hideLoading();
            });
        })
    }

    // getGeoLocation() {
    //   // this.utilities.showLoading('Getting Location').then(()=>{
    //         // setTimeout(()=>{
    //         //   this.utilities.hideLoading();
    //         // },1000)
    //     this.geolocation.getCurrentPosition().then((resp) => {
    //       this.utils.hideLoading();
    //       // .then(()=>{

    //         this.getGeoEncoder(resp.coords.latitude, resp.coords.longitude);
    //         this.utils.hideLoading();
    //       // });
    //     },err=>{
    //       this.utils.hideLoading();
    //       this.utils.errorSnackBar('Unable to get location');
    //     }).catch((error) => {
    //       this.utils.hideLoading();
    //       this.utils.errorSnackBar('Unable to get location');


    //       this.showNoLocation();
    //     });
    //   // },err=>{
    //   //   this.utilities.hideLoading();
    //   // });
    // }

    // async  showNoLocation() {
    //   const toast = await this.toastController.create({
    //     header: 'Error',
    //     message: 'Unable to get location',
    //     cssClass: 'my-custom-class',
    //     buttons: [
    //       {
    //         text: 'OK',
    //         handler: () => {
    //           this.goBack();
    //         }
    //       }
    //     ]
    //   });
    //   toast.present();
    // }



    // async showLocationDenied() {
    //   const toast = await this.toastController.create({
    //     header: 'Error',
    //     message: 'Location services denied, please enable them manually',
    //     cssClass: 'my-custom-class',
    //     buttons: [
    //       {
    //         text: 'OK',
    //         handler: () => {
    //           this.goBack();
    //         }
    //       }
    //     ]
    //   });
    //   toast.present();
    // }


    // getGeoEncoder(latitude, longitude) {
    //   // this.utilities.hideLoading().then((success) => {
    //         this.utils.showLoading('Getting Location').then(()=>{
    //     this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geoEncoderOptions)
    //     .then((result: NativeGeocoderResult[]) => {

    //       this.utils.hideLoading();
    //           const address: AddressModel = {
    //             address: this.generateAddress(result[0]),
    //             lat: latitude,
    //             long: longitude,
    //             country:result[0].countryName,
    //             state: result[0].administrativeArea,
    //             city:result[0].locality,
    //             postalcode:result[0].postalCode
    //           };
    //           this.utils.setAddress(address);
    //         })
    //         .catch((error: any) => {
    //           this.showNoLocation();
    //           this.utils.hideLoading();
    //           alert('Error getting location' + JSON.stringify(error));
    //         });
    //       });
    //     // }, (error) => {

    //     // }
    //   // );
    // }

    // generateAddress(addressObj) {
    //   const obj = [];
    //   let address = '';
    //   for (const key in addressObj) {
    //     obj.push(addressObj[key]);
    //   }
    //   obj.reverse();
    //   for (const val in obj) {
    //     if (obj[val].length) {
    //       address += obj[val] + ', ';
    //     }
    //   }
    //   return address.slice(0, -2);
    // }

    // requestLocationPermission() {
    //   this.diagnostic.requestLocationAuthorization(this.diagnostic.locationAuthorizationMode.WHEN_IN_USE).then((mode) => {

    //     switch (mode) {
    //       case this.diagnostic.permissionStatus.NOT_REQUESTED:
    //         this.goBack();
    //         break;
    //       case this.diagnostic.permissionStatus.DENIED_ALWAYS:
    //         this.showLocationDenied();
    //         break;
    //       case this.diagnostic.permissionStatus.DENIED_ONCE:
    //         this.goBack();
    //         break;
    //       case this.diagnostic.permissionStatus.GRANTED:
    //         this.fetchLocation();
    //         break;
    //       case this.diagnostic.permissionStatus.GRANTED_WHEN_IN_USE:
    //         this.fetchLocation();
    //         break;
    //       case 'authorized_when_in_use':
    //         this.fetchLocation();
    //         break;
    //     }
    //   }, (rejection) => {

    //     // this.goBack();
    //   });

    //   // if (this.platform.is('ios')) {
    //   //   if (this.storage.isLocationAllowedOnIOS()) {
    //   //     this.fetchLocation();
    //   //   } else {
    //   //     if (!this.storage.isLocationCheckedOnIOS()) {
    //   //       this.storage.setLocationCheckedOnIOS(true);
    //   //       this.diagnostic.requestLocationAuthorization(this.diagnostic.locationAuthorizationMode.WHEN_IN_USE).then((mode) => {
    //   //         switch (mode) {
    //   //           case this.diagnostic.permissionStatus.NOT_REQUESTED:
    //   //             this.storage.setLocationAllowedOnIOS(false);
    //   //             break;
    //   //           case this.diagnostic.permissionStatus.DENIED_ALWAYS:
    //   //             this.storage.setLocationAllowedOnIOS(false);
    //   //             break;
    //   //           case this.diagnostic.permissionStatus.GRANTED:
    //   //             this.storage.setLocationAllowedOnIOS(true);
    //   //             this.fetchLocation();
    //   //             break;
    //   //           case this.diagnostic.permissionStatus.GRANTED_WHEN_IN_USE:
    //   //             this.storage.setLocationAllowedOnIOS(true);
    //   //             this.fetchLocation();
    //   //             break;
    //   //           case 'authorized_when_in_use':
    //   //             this.storage.setLocationAllowedOnIOS(true);
    //   //             this.fetchLocation();
    //   //             break;
    //   //         }
    //   //       }, (rejection) => {
    //   //         this.locationAllowed = false;
    //   //         this.storage.setLocationAllowedOnIOS(false);
    //   //       });
    //   //     }
    //   //   }
    //   // } else {
    //   //
    //   // }

    // }

    // fetchLocation() {
    //   if (this.platform.is('ios')) {
    //     this.getGeoLocation();
    //   } else {
    //     this.diagnostic.isGpsLocationEnabled().then((status) => {
    //       if (status === true) {
    //         this.getGeoLocation();
    //         // this.utilities.showLoading('Getting Location').then(() => {

    //         // });
    //       } else {
    //         this.askToChangeSettings();
    //       }
    //     });
    //   }

    // }

    // async askToChangeSettings() {
    //   const toast = await this.toastController.create({
    //     header: 'Location Disabled',
    //     message: 'Please enable location services',
    //     cssClass: 'my-custom-class',
    //     buttons: [
    //       {
    //         text: 'OK',
    //         handler: () => {
    //           this.changeLocationSettings();
    //         }
    //       }, {
    //         text: 'Cancel',
    //         handler: () => {
    //           this.goBack();
    //         }
    //       }
    //     ]
    //   });
    //   toast.present();
    // }

    // changeLocationSettings() {
    //   this.diagnostic.switchToLocationSettings();
    //   this.diagnostic.registerLocationStateChangeHandler((state) => {
    //     if ((this.platform.is('android') && state !== this.diagnostic.locationMode.LOCATION_OFF) ||
    //       (this.platform.is('ios')) && (state === this.diagnostic.permissionStatus.GRANTED ||
    //         state === this.diagnostic.permissionStatus.GRANTED_WHEN_IN_USE
    //       )) {
    //       this.checkLocationAccess();
    //     }

    //   });
    // }

    // checkLocationAccess() {
    //   this.diagnostic.isLocationAuthorized().then((success) => {
    //     this.fetchLocation();
    //   }, (error) => {
    //     this.utils.showSnackBar('GPS Not Allowed');
    //   });

    // }



    createChatGroup(design: DesginDataModel) {
        var GUID = 'permit' + "_" + new Date().getTime();

        var address = design.address.substring(0, 90);
        var groupName = design.name + "_" + address;

        var groupType = CometChat.GROUP_TYPE.PASSWORD;
        var password = design.groupchatpassword;

        var group = new CometChat.Group(GUID, groupName, groupType, password);

        CometChat.createGroup(group).then(group => {
            let membersList = [
                new CometChat.GroupMember("" + design.createdby.cometchatuid, CometChat.GROUP_MEMBER_SCOPE.ADMIN)
            ];
            CometChat.addMembersToGroup(group.getGuid(), membersList, []).then(response => {
                this.cdr.detectChanges();
            })
        })
    }

    gettingClients() {
        this.apiService.getClients().subscribe((res:any) => {
            this.getCompanies = res.data;
            console.log("this.getCompanies",this.getCompanies);
            
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

    //// For Address
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
        if (!this.isSelectSearchResult) {
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
                console.log('selectSearchResult responses', responses);

                this.getGeoEncoder(responses[0].geometry.location.lat(), responses[0].geometry.location.lng(), responses[0].formatted_address, responses[0].address_components);
            });
            this.autocompleteItems = []
        })
    }

    getGeoEncoder(latitude, longitude, formattedAddress, address_components = null) {

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
        console.log('address_components', address_components);

        // this.utils.showLoading('Loading').then(() => {
        this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geoEncoderOptions)
            .then((result: NativeGeocoderResult[]) => {
                console.log('getGeoEncoder result', result);

                let add = '';
                if (formattedAddress === '') {
                    add = this.generateAddress(result[0]);
                } else {
                    add = formattedAddress;
                }
                this.utils.hideLoading().then(() => {
                    let administrativeArea: string = '';
                    for (let data of address_components) {
                        console.log('data', data);
                        if (data.types[0] === 'administrative_area_level_1' && data.short_name == result[0].administrativeArea) {
                            administrativeArea = data.long_name;
                        }
                    }

                    const address: AddressModel = {
                        address: add,
                        lat: latitude,
                        long: longitude,
                        country: result[0].countryName,
                        state: administrativeArea ? administrativeArea : result[0].administrativeArea,
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

    mpucheckbox(event) {
        let checked = event.detail.checked
        if (checked) {
            this.desginForm.get('mpurequired').setValue(true)
        }
        else {
            this.desginForm.get('mpurequired').setValue(false)
        }
    }


    addressValue() {
        // }

        this.addressSubscription = this.utils.getAddressObservable().subscribe((address) => {
            console.log('addressValue address', address);


            // this.firstFormGroup.get('address').setValue('124/345');
            // this.firstFormGroup.get('latitude').setValue('24.553333');
            // this.firstFormGroup.get('longitude').setValue('80.5555555555');
            // this.firstFormGroup.get('country').setValue('india');
            // this.firstFormGroup.get('city').setValue('Lucknow');
            // this.firstFormGroup.get('state').setValue('UP');
            // this.firstFormGroup.get('postalcode').setValue(3232343);
            this.desginForm.get('address').setValue(address.address);
            this.desginForm.get('typingaddress').setValue(address.address);

            this.desginForm.get('latitude').setValue(address.lat);
            this.desginForm.get('longitude').setValue(address.long);
            this.desginForm.get('country').setValue(address.country);
            this.desginForm.get('city').setValue(address.city);
            this.desginForm.get('postalcode').setValue(address.postalcode);

            this.desginForm.get('state').setValue(address.state);

            this.fetchajhsData(address.state);
            this.fetchUtilityMakesData(address.state);
            this.fetchfiresetbackData(address.state);

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

    onBlur() {
        setTimeout(() => {
            this.autocompleteItems = [];
        }, 100);
    }

    async confirmEmail(message) {

        const toast = await this.toastController.create({
            header: message,
            message: 'Do you want to create again?',
            cssClass: 'my-custom-confirm-class',
            buttons: [
                {
                    text: 'Yes',
                    handler: () => {
                        this.desginForm.get('sameemailconfirmed').setValue(true);
                        this.submitform();
                    }
                }, {
                    text: 'No',
                    handler: () => {

                    }
                }
            ]
        });
        toast.present();
    }

    financing(e) {
        this.financ = e.target.value;
    }
    showMeterLessor(e) {
        this.meterlessor = e.target.value;
    }

    PropertyTypeOption(e) {
        this.propertytypevalue = e.target.value;

        
    }

    // check inverters Count value valid or not for particular object
    invertersCountError(event, data, index): void {
        let value = event.detail.value;
        if (value) {
            let form = this.formBuilder.group({
                inverterscount: new FormControl(value, [Validators.required, Validators.minLength(1), Validators.maxLength(3), Validators.pattern('[0-9]{1,3}')]),
            });
            if (form.status === 'VALID') {
                data.isCountError = false;
            } else {
                data.isCountError = true;
            }
        } else {
            data.isCountError = false;
        }
    }

    fetchajhsData(city) {
        this.apiService.ahjs(city).subscribe(
            (response: any) => {
                this.ahjsmakes = response;
                this.filteredahjsMakes = this.desginForm.get('ahjname').valueChanges.pipe(
                    startWith(""),
                    map(value => (typeof value === "string" ? value : value.name)),
                    map(name => (name ? this._filterahjMake(name) : this.ahjsmakes.slice()))
                );
            },
            error => {
                this.utils.errorSnackBar("Error");
            }
        );
    }
    fetchUtilityMakesData(city) {
        this.apiService.utilitiescity(city).subscribe(
            (response: any) => {
                this.utilitymakes = response;
                this.filteredUtilityMakes = this.desginForm.get('Utility').valueChanges.pipe(
                    startWith(""),
                    map(value => (typeof value === "string" ? value : value.name)),
                    map(name => (name ? this._filterUtilityMake(name) : this.utilitymakes.slice()))
                );
            },
            error => {
                this.utils.errorSnackBar("Error");
            }
        );
    }
    fetchfiresetbackData(city) {
        this.apiService.firesetbacks(city).subscribe(
            (response: any) => {
                this.firemakes = response;
                this.filteredfireMakes = this.desginForm.get('setbackdetails').valueChanges.pipe(
                    startWith(""),
                    map(value => (typeof value === "string" ? value : value.name)),
                    map(name => (name ? this._filterfireMake(name) : this.firemakes.slice()))
                );
            },
            error => {
                this.utils.errorSnackBar("Error");
            }
        );
    }
    private _filterahjMake(name: string) {
        const filterValue = name.toLowerCase();
        return this.ahjsmakes.filter(
            ahjsmake => ahjsmake.name.toLowerCase().indexOf(filterValue) != -1
        );
    }
    private _filterUtilityMake(name: string) {
        const filterValue = name.toLowerCase();
        return this.utilitymakes.filter(
            utilitymake => utilitymake.name.toLowerCase().indexOf(filterValue) != -1
        );
    }
    private _filterfireMake(name: string) {
        const filterValue = name.toLowerCase();
        return this.utilitymakes.filter(
            firemake => firemake.name.toLowerCase().indexOf(filterValue) != -1
        );
    }

    setSelectedahjs(model) {
        this.selectedahjsID = model.id;
    }

    fetchUtilityData(model) {
        this.selectedutilityID = model.id;
    }

    searchModuleInverter(event, type): void {
        console.log('searchModuleInverter event', event.detail.value);
        console.log('searchModuleInverter type', type);
    }

    uploamoduledesign(response?: any, fileObj?: File, index?: string, dat?: string) {

        let date = new Date();
        this.hash = date.getTime();



        this.modulelayoutpostarray.forEach((element) => {
            element.refid = response;
            console.log('id', element.refid);
        });


        console.log('data', this.modulelayoutpostarray);

        this.cdr.detectChanges();

        // } // }
        this.utils.showLoading("Uploading Module Layout Design").then(() => {

            this.apiService.uploadawsdesign(this.modulelayoutpostarray).subscribe(res => {

                this.utils.hideLoading();
            
                if (this.formValue === 'save' || this.send === ScheduleFormEvent.SAVE_PERMIT_FORM) {
                    if (this.designId == 0) {
                        this.router.navigate(['/permit-home'])
                        this.utils.showSnackBar('Design have been Created');
                        // this.utils.showSnackBar('Design have been saved');
                        this.utils.setHomepagePermitRefresh(true);
                    } else {
                        this.router.navigate(['/permit-home'])
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
                        state: { productdetails: objToSend }
                    });
                }
            
            
            }, responseError => {
                this.utils.hideLoading();
                const error: ErrorModel = responseError.error;
                this.utils.errorSnackBar(error.message[0].messages[0].message);
            })
        })
        // })

    }


    removemodulelayout(event, i): void {
        let path =
            this.modulelayoutpostarray[i].path +
            "/" +
            event.name.split(".")[0] +
            "_" +
            this.modulelayoutpostarray[i].hash +
            "." +
            event.name.split(".")[1];
        //   let data = path + "/" + file.name.split(".")[0] + "_" + file.hash + "." + file.name.split(".")[1]
        this.uploadaws.deleteAwsFile(path).then((res) => {
            this.moduleFiles.splice(this.moduleFiles.indexOf(event), 1);
            this.modulelayoutpostarray.splice(this.permitFiles.indexOf(event), 1);
            if (this.moduleFiles.length == 0) {
                this.modulesfileuploaded = false;
                // this.modulescount.setValidators([Validators.required]);
                // this.modulescount.updateValueAndValidity();
            }
            this.cdr.detectChanges();
        })
    }



    removemodulelayoutdesign(file, index): void {
        let data = "";
        if (file.path == null) {
            data =
                "designs/" +
                this.data.design.id +
                "/" +
                file.name.split(".")[0] +
                "_" +
                file.hash +
                "." +
                file.name.split(".")[1];
        } else {
            data =
                file.path +
                "/" +
                file.name.split(".")[0] +
                "_" +
                file.hash +
                "." +
                file.name.split(".")[1];
        }
        this.uploadaws.deleteAwsFile(data).then((res) => {
            this.apiService.deleteFileAws(file.id).subscribe(
                () => {

                    this.data.design.designgeneralinformation.moduleslayoutdesign.splice(index, 1);
                    this.data.design.designgeneralinformation.moduleslayoutdesign = [...this.data.design.designgeneralinformation.moduleslayoutdesign];
                    this.cdr.detectChanges();
                }, responseError => {
                    this.utils.hideLoading();
                    const error: ErrorModel = responseError.error;
                    this.utils.errorSnackBar(error.message[0].messages[0].message);
                }
            );
        })
    }








    deletemoduleAttachmentFile(index) {




        // this.utils.showLoading('Deleting Architecture Design').then((success)=>{
        for (var i = 0; i < index.length; i++) {
            var id = index[i];
            this.utils.showLoading("Deleting Module Layout Design File").then(() => {
                this.apiService.deletePrelimImage(id).subscribe(res => {
                    this.utils.hideLoading().then(() => {
                        this.indexOfmoduleAttachmentFiles = [];
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

    modulelayoutdesign(event): void {
       
        this.utils.showLoading("Processing").then(() => {
        this.modulesfileuploaded = true;
        let uploadedfiles = 0;
        for (let i = 0; i < event.addedFiles.length; i++) {

            const element = event.addedFiles[i];
            element.isImage = false;
            if (element.type.includes("image")) {
                element.isImage = true;
            }
            const type = element.name.split(".");
            // WEB ARCHIVE EXT NOT SUPPORTED CODE
            

            this.attachmentmoduleFileUpload = true;

            if (type[1] == "heic" || type[1] == "HEIC") {
                element.isImage = true;
                const reader = new FileReader();
                reader.onload = (event: any) => {
                    fetch(event.target.result)
                        .then((res) => res.blob())
                        .then((jpgBlob: Blob) => {
                            let replacedfile;
                            if (type[1] == "HEIC") {
                                replacedfile = new File(
                                    [jpgBlob],
                                    element.name.replace("HEIC", "jpeg"),
                                    { type: "image/jpeg" }
                                );
                            } else {
                                replacedfile = new File(
                                    [jpgBlob],
                                    element.name.replace("heic", "jpeg"),
                                    { type: "image/jpeg" }
                                );
                            }

                            this.moduleFiles.push(replacedfile);
                            this.moduleFiles.forEach((item) => {
                                if (item.name == replacedfile.name)
                                    item["isImage"] = true
                            });
                            setTimeout(() => {
                                this.cdr.detectChanges();
                            }, 300);
                            this.cdr.detectChanges();
                        })
                        .catch(() => {
                            // see error handling section
                        });
                };
                reader.readAsDataURL(element);
            } else {
                this.moduleFiles.push(element);
                this.cdr.detectChanges();
            }

            let date = new Date();
            this.hash = date.getTime();


            this.uploadaws.fileEvent(event.addedFiles[i], "designs/" + this.hash.toString() + "/moduleslayoutdesign").then((res) => {
                if (res.url) {

                    console.log('url', res.url);
                    let postData = {
                        name: event.addedFiles[i].name,
                        ext: "." + event.addedFiles[i].name.split(".").reverse()[0],
                        mime: event.addedFiles[i].type,
                        hash: res.timestamp,
                        size: event.addedFiles[i].size,
                        path: "designs/" + this.hash.toString() + "/moduleslayoutdesign",
                        provider: "aws-s3",
                        url: res.url,
                        field: "moduleslayoutdesign",
                        order: i + 1,
                        ref: "designgeneralinformations",
                        refid: null,
                        height: res.height,
                        width: res.width,
                    };
                    this.modulelayoutpostarray.push(postData);
                    console.log('modd', this.modulelayoutpostarray);
                    uploadedfiles = uploadedfiles + 1;
                    if (uploadedfiles == event.addedFiles.length) {
                        //this.isLoading = false;
                        this.utils.hideLoading();
                        this.cdr.detectChanges();
                    }
                } else {
                    this.uploadmodulelayoutfailedfiles.push(
                        event.addedFiles[i].name
                    );
                    this.moduleFiles.splice(
                        this.moduleFiles.indexOf(event.addedFiles[i]),
                        1
                    );
                    // that.attachmentpostarray.splice(index, 1);
                    if (this.modulelayoutpostarray.length == this.moduleFiles.length) {
                        // this.isLoading = false;
                        this.utils.hideLoading();
                        this.cdr.detectChanges();
                    }
                    if (this.moduleFiles.length == 0) {
                        this.modulesfileuploaded = false;
                    }
                    this.cdr.detectChanges();
                }
            });


        }




    });
        /*
                setTimeout(() => {
                    this.cdr.detectChanges();
                  }, 300);*/
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



    invertercou(i) {

        //console.log('data');
        //this.numberOfInverters[i].selectedInverterMakeID = this.desginForm.get(this.numberOfInverters[i].invertermake).setValue('');

        //console.log('data' + this.numberOfInverters[i].selectedInverterMakeID);


        this.fetchInverterMakesData(i);

    }




    fetchahjname() {

        //this.desginForm.get('ahjname').setValue('');
        //this.addressValue();


        let state = this.desginForm.get('state').value;

        this.fetchajhsData(state);
        //this.fetchfiresetbackData(address.state);
    }
    fetchUtilityname() {

        //this.desginForm.get('Utility').setValue('');

        let state = this.desginForm.get('state').value;
        this.fetchUtilityMakesData(state);

        //  this.addressValue();
    }



    updateTNVal(event) {
        let value = event.target.value;
        var newVal = "";
        value = value.replace(/\D/g, "");
        if (0 < value.length && value.length <= 3) {
            newVal = value;
        } else if (3 < value.length && value.length <= 6) {
            newVal = value.slice(0, 3) + "-" + value.slice(3);
        } else if (6 < value.length) {
            newVal = value.slice(0, 3) + "-" + value.slice(3, 6) + "-" + value.slice(6, 10);
        }

        this.desginForm.get('phone').setValue(newVal);

    }

    filterByTN(startTn) {

        var actualphonenumber = "";
        if (startTn) {
            actualphonenumber = startTn.split("-");
        }
        if (startTn && actualphonenumber.length == 1) {

            actualphonenumber = "1" + actualphonenumber[0];
        }
        else if (startTn && actualphonenumber.length == 2) {
            actualphonenumber = "1" + actualphonenumber[0] + actualphonenumber[1];
        }
        else if (startTn && actualphonenumber.length == 3) {
            actualphonenumber = "1" + actualphonenumber[0] + actualphonenumber[1] + actualphonenumber[2];
        }

    }





    //battery add 


    
    

    fetchBatteryMakesData(index = 0): void {
        this.apiService.getBatteryMakes().subscribe(
          (response) => {
            if (response.length > 0) {
                this.designbattries[index].batterymakes = response;
            }
          },
          (error) => {
            this.utils.errorSnackBar("Error");
          }
        );
      }
      setSelectedBatteryMake(record, event, index): void {
        if (event.isUserInput) {
    
          this.designbattries[index].selectedBatteryMakeID = record.id;
          this.fetchBatteryModelsData(record, event, index);
          
        }
      }
    
      setSelectedBatteryModel(record, event, index): void {
        if (event.isUserInput) {
          this.designbattries[index].selectedBatteryModelID = record.id;
        }
      }
    
    
    
      fetchBatteryModelsData(record, event, index): void {
        this.designbattries[index].selectedBatteryMakeID = record.id;
        console.log('fetchbattryModelsData', index, record);
        this.apiService.getBatteryModels(this.designbattries[index].selectedBatteryMakeID).subscribe(
          (response) => {
            if (response.length > 0) {
              this.designbattries[index].batterymodels = response;
              console.log('fetchbattryModelsre', index, response);
            }
          },
          (error) => {
            this.utils.errorSnackBar("Error");
          }
        );
      }
     
      
      addMoreBatteries() {
        // this.desginForm.get('invertermakefilter').setValue("");
        // this.desginForm.get('invertermodelfilter').setValue("");

        this.designbattries.push({
            batterymake: "batterymake" + Number(this.designbattries.length + 1),
            batterymodel:
                "batterymodel" + Number(this.designbattries.length + 1),
                batteriescount:
                "batteriescount" + Number(this.designbattries.length + 1),
           
            selectedBatteryMakeID: null,
            selectedBatteryModelID: null,
            id: null, 
            batterycombinerbox:"batterycombinerbox"+ Number(this.designbattries.length + 1),
           
        });

        this.desginForm.addControl(
            "batterymake" + this.designbattries.length,
            new FormControl("", Validators.required)
        );
        this.desginForm.addControl(
            "batterymodel" + this.designbattries.length,
            new FormControl("", Validators.required)
        );
        this.desginForm.addControl(
            "batteriescount" + this.designbattries.length,
            new FormControl("", Validators.required)
        );
        this.desginForm.addControl(
            "batterycombinerbox" + this.designbattries.length,
            new FormControl("", Validators.required)
        );

        this.fetchBatteryMakesData(Number(this.designbattries.length - 1));
        // this.desginForm.addControl(
        //     "invertermodelfilter" + this.numberOfInverters.length,
        //     new FormControl("")
        // );
    }

    DeleteBattries(index) {
        this.desginForm.removeControl("batterymake" + Number(index + 1));
        this.desginForm.removeControl("batterymodel" + Number(index + 1));
        this.desginForm.removeControl(
            "batteriescount" + Number(index + 1)
        );
        this.desginForm.removeControl(
            "batterycombinerbox" + Number(index + 1)
        );
        // this.desginForm.removeControl(
        //     "invertermodelfilter" + Number(index + 1)
        // );

        this.designbattries.splice(index, 1);
    }



    getControlValue(controlname, index) {
        const batterycontrol = <FormArray>this.desginForm.controls['batteryformArray'];
        const batteryform = <FormGroup>batterycontrol.controls[index];
        return batteryform.controls[controlname].value;
      }


      batterycou(i) {

        console.log('data');
        this.designbattries[i].selectedBatteryMakeID = this.desginForm.get(this.designbattries[i].batterymake).setValue('');

        console.log('data' + this.designbattries[i].selectedBatteryMakeID);


        this.fetchBatteryMakesData(i);

    }

    batteriescountChange(event, data, index): void {
        let value = event.detail.value;
        /*if (value) {
            let form = this.formBuilder.group({
                batteriescount: new FormControl(value, [Validators.required, Validators.minLength(1), Validators.maxLength(3), Validators.pattern('[0-9]{1,3}')]),
            });
            if (form.status === 'VALID') {
                data.isCountError1 = false;
            } else {
                data.isCountError1 = true;
            }
        } else {
            data.isCountError1 = false;
        }
*/
  
         const countbatt = parseInt(this.desginForm.get(this.designbattries[index].batteriescount).value);
          console.log(value);
        if(countbatt > 1){

console.log('show');
this.batterycombinerboxshow = true;

        }else{


this.batterycombinerboxshow=false;

            console.log('hide');


        }
    }

    isoptimizeradded(e) {
        this.isoptimizeraddedval = e.target.value;
        console.log(this.isoptimizeraddedval);
        if (this.isoptimizeraddedval == "true") {
            this.getOptimizers();
          }

    }
    getOptimizers() {
        this.apiService.getFilteredOptimizers(this.numberOfInverters[0].selectedInverterMakeID).subscribe(
          (response) => {
            this.optimizerslist = response;
          
            this.cdr.detectChanges();
          },
          (error) => {
            this.utils.errorSnackBar("Error");
          }
        );
      }
      setSelectedoptimizerId(optimizer) {
        this.selectedOptimizerID = optimizer.id;
      }



      getClientsadmins(id,datvar): void {
       
    
        this.apiService.getUserGroup(id, this.isoutsourced).subscribe(
          (response) => {
            this.userGroup = response;
            this.createNewDesignChatGroup(datvar);
          },
          (error) => {
            this.createNewDesignChatGroup(datvar);
            
          }
        );
      }

      createNewDesignChatGroup(design) {
        var GUID = 'permit' + "_" + new Date().getTime();

        var address = design.address.substring(0, 60);
        var groupName = design.name + "_" + address;

        var groupType = CometChat.GROUP_TYPE.PASSWORD;
        var password = design.groupchatpassword;

        var group = new CometChat.Group(GUID, groupName, groupType, password);
        const adminsid = [];
        CometChat.createGroup(group).then(
            (group) => {
              const membersList = [
                new CometChat.GroupMember(
                  "" + design.createdby.cometchatuid,
                  CometChat.GROUP_MEMBER_SCOPE.ADMIN
                ),
              ];
              adminsid.forEach((element) => {
                membersList.push(
                  new CometChat.GroupMember(
                    "" + element,
                    CometChat.GROUP_MEMBER_SCOPE.ADMIN
                  )
                );
              });
              CometChat.addMembersToGroup(group.getGuid(), membersList, []).then(
                () => {
                  const chatgroupusers = adminsid;
                  chatgroupusers.push(design.createdby.cometchatuid);
      
                  const inputData = {
                    title: groupName,
                    guid: GUID,
                    parentid: design.createdby.parent.id,
                    chatgroupusers: chatgroupusers,
                  };
                  this.apiService.addChatGroup(inputData).subscribe(
                    () => {
                      // do nothing.
                    },
                    (error) => {
                        this.utils.hideLoading();
                    }
                  );
                  
                  
                  this.cdr.detectChanges();
                  
                  
                },
                () => {
                    this.utils.showSnackBar('Design request has been assigned to WattMonk successfully');
                
                }
              );
            },
            () => {
                this.utils.showSnackBar('Design request has been assigned to WattMonk successfully');
      
              this.cdr.detectChanges();
            }
          );
    }



///sha//
    openedChange(opened: boolean) {
        console.log( opened)
          if(opened == false){
            this.searchedValue = this.desginForm.get('modulemakefilter').setValue('')
            console.log("In if",this.searchedValue);
          }else if(opened == true){
            // this.searchedValue = this.desginForm.get('modulemakefilter')
            // this.searchedValue = opened
            console.log("In else",opened);
          }
        // console.log(opened ? 'opened' : 'closed');
    }


    openedChangeMM(opened: boolean) {
        console.log( opened)
          if(opened == false){
            this.searchedValueModel = this.desginForm.get('modulemodelfilter').setValue('')
            console.log("In if",this.searchedValueModel);
          }else if(opened == true){
            // this.searchedValue = this.desginForm.get('modulemakefilter')
            // this.searchedValue = opened
            console.log("In else",opened);
          }
        // console.log(opened ? 'opened' : 'closed');
    }



    openedChangeInverter(opened: boolean,i) {
        console.log( opened)
          if(opened == false){
            this.numberOfInverters[i].invertermakefilter = this.desginForm.get(this.numberOfInverters[i].invertermakefilter).setValue('');
            console.log("In if",this.numberOfInverters[i].invertermakefilter);
          }else if(opened == true){
            // this.numberOfInverters[i].invertermakefilter = this.desginForm.get(this.numberOfInverters[i].invertermakefilter);
            // this.searchedValue = opened
            console.log("In else",opened);
          }
        // console.log(opened ? 'opened' : 'closed');
    }
    openedChangeInverterM(opened: boolean,i) {
        console.log( opened)
          if(opened == false){
            this.numberOfInverters[i].invertermodelfilter = this.desginForm.get(this.numberOfInverters[i].invertermodelfilter).setValue('');
            console.log("In if",this.numberOfInverters[i].invertermodelfilter);
          }else if(opened == true){
            // this.numberOfInverters[i].invertermakefilter = this.desginForm.get(this.numberOfInverters[i].invertermakefilter);
            // this.searchedValue = opened
            console.log("In else",opened);
          }
        // console.log(opened ? 'opened' : 'closed');
    }
   

}
