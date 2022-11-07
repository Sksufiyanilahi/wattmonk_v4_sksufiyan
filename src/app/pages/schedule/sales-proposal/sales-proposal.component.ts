import { ChangeDetectorRef, Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { AssigneeModel } from 'src/app/models/assignee.model';
import { SolarMake } from 'src/app/models/solar-make.model';
import { ApiService } from 'src/app/services/api/api.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { ErrorModel } from 'src/app/models/error.model';
import { Modulemake, SolarMadeModel } from 'src/app/models/solar-made.model';
import { InverterMakeModel } from 'src/app/models/inverter-make.model';
import { NavController, IonSlides, ToastController } from '@ionic/angular';
import { InverterMadeModel } from 'src/app/models/inverter-made.model';
import { FIELD_REQUIRED, INVALID_ADDRESS, INVALID_ANNUAL_UNIT, INVALID_COMPANY_NAME, INVALID_EMAIL_MESSAGE, INVALID_MODULE_AND_INVERTER, INVALID_NAME_MESSAGE, INVALID_PHONE_NUMBER, INVALID_TILT_FOR_GROUND_MOUNT, ScheduleFormEvent } from 'src/app/models/constants';
import { Observable, Subscription } from 'rxjs';
import { StorageService } from 'src/app/services/storage/storage.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { DesginDataModel, Invertermake } from 'src/app/models/design.model';

import { CometChat } from '@cometchat-pro/cordova-ionic-chat';
import { Clients } from 'src/app/models/clients.model';
import { map, startWith } from "rxjs/operators";
import { UtilityRates } from 'src/app/models/utilityrate.model';
import { Incentive } from 'src/app/models/incentive.model';
import { Utility } from 'src/app/models/utility.model';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@awesome-cordova-plugins/native-geocoder/ngx';
import { AddressModel } from 'src/app/models/address.model';

import * as _ from 'lodash';
import { ADDRESSFORMAT, MAILFORMAT, NAME, ROLES, NUMBERPATTERN, COMPANYFORMAT } from "src/app/services/constants";
import { AwsService } from "src/app/services/aws/aws.service";

export function getFileReader(): FileReader {
    const fileReader = new FileReader();
    const zoneOriginalInstance = (fileReader as any)["__zone_symbol__originalInstance"];
    return zoneOriginalInstance || fileReader;
}
@Component({
    selector: 'app-sales-proposal',
    templateUrl: './sales-proposal.component.html',
    styleUrls: ['./sales-proposal.component.scss'],
})


export class SalesProposalComponent implements OnInit {

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
    utilitiesName: any;
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

    utilitymakes: Utility[] = [];
    UtilityRates: UtilityRates[] = [];
    filteredUtilityMakes: Observable<any>;
    filteredUtilityRates: Observable<any>;
    filterUtilityRate: Observable<any>;
    selectedUtilityId: number;
    selectedUtilityRateId: number;
    emailError = INVALID_EMAIL_MESSAGE;
    nameError = INVALID_NAME_MESSAGE;
    annualunitError = INVALID_ANNUAL_UNIT;
    tiltforgroundError = INVALID_TILT_FOR_GROUND_MOUNT;
    companyError = INVALID_COMPANY_NAME;
    addressError = INVALID_ADDRESS;

    fieldRequired = FIELD_REQUIRED;

    designId = 0;
    design: DesginDataModel = null;
    address: any;
    showValue: any;
    uploadbox: any;
    archFiles: any = [];
    prelimFiles: any = [];
    imageName: any;
    oldcommentid: String
    indexOfArcFiles = []
    indexOfAttachmentFile = [];
    isArcFileDelete: boolean = false;

    moduleAndInverterError = INVALID_MODULE_AND_INVERTER;

    //attachmentName = this.desginForm.get('attachments').value;

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
    invertermakess: string;
    invertermade: string;
    onFormSubmit: boolean = true;
    solarMakeDisposable: Subscription;
    send: any;
    value: number;
    architecturalData: any;
    fieldDisabled = false;
    userdata: any;

    isArchitecturalFileUpload: boolean = false;
    attachmentFileUpload: boolean = false;
    imageurls: any = [];
    arcFileUrl: any = [];

    // newprelims: Observable<any>;
    // newprelimsRef: AngularFireObject<any>;
    // //newprelimsRef:any;
    // newprelimscount = 0;

    //for address
    //user: User
    isEditMode: boolean = false;
    formatted_address: string;

    GoogleAutocomplete: google.maps.places.AutocompleteService;
    autocompleteItems: any[];
    map: any;

    geoEncoderOptions: NativeGeocoderOptions = {
        useLocale: true,
        maxResults: 5
    };
    logoSelected: boolean = false;
    logo: any;
    blob: Blob;
    userId: string;
    uploadLogo: any;
    geocoder = new google.maps.Geocoder();
    autoCompleteOff: boolean = false;
    isSelectSearchResult: boolean = false;

    invertermake = new FormControl("", [

        Validators.pattern("^[a-zA-Z-_ ]{3,}$")
    ])
    incentives: Incentive[] = [];
    filterIncentive: Observable<any>;
    public shsolarmake: any;
    public shsolarmade: any;
    public shsoinvertmade: any;
    public invertermakedisable: boolean = true;
    public solarmakedisable: boolean = true;
    public invertercountdisable: boolean = false;
    public modulecountdisable: boolean = false;
    public commentrequi: boolean = false;
    public place: any = 'Start typing here';
    public numberOfInverters: any = [];
    public addextrainverters = true;
    public propertytypevalue: any;

    public isClient: boolean = true;
    attachmentpostarray: any = [];
    architecturalpostarray: any = [];
    hash: any;
    public companyrequi: boolean = false;
    isoutsourced = false;
    userGroup;
    data: any;
    searchedValue :any;
    searchedValueModel: any;
    isPanelOpen : boolean = false;
    constructor(
        private formBuilder: FormBuilder,
        private apiService: ApiService,
        private utils: UtilitiesService,
        private navController: NavController,
        private storage: StorageService,
        private route: ActivatedRoute,
        public router: Router,
        private cdr: ChangeDetectorRef,
        private zone: NgZone,
        private nativeGeocoder: NativeGeocoder,
        private toastController: ToastController, private uploadaws: AwsService,
        //private db: AngularFireDatabase
    ) {
        // this.utils.showHideIntercom(true);
        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var d_date = tomorrow.toISOString();

        // this.firstFormGroup = this.formBuilder.group({})

        this.desginForm = this.formBuilder.group({
            company: new FormControl('', [Validators.pattern(COMPANYFORMAT)]),
            companyname: new FormControl(''),
            name: new FormControl('', [Validators.required, Validators.pattern(NAME)]),
            email: new FormControl('', [Validators.required, Validators.pattern(MAILFORMAT)]),
            solarmake: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z-_ ]{3,}$")]),
            solarmodel: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9A-Z-_([)/. {\\]}]{5,}$")]),
            invertermake: this.invertermake,
            invertermodel: new FormControl('', [Validators.pattern("^[a-z0-9A-Z+-_([)/. {\\]}]{3,}$")]),
            monthlybill: new FormControl('', [Validators.required, Validators.min(0), Validators.pattern("^[0-9]+$")]),
            inverterscount: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(3), Validators.pattern('[0-9]{1,3}')]),
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
            isoutsourced: new FormControl(false),
            designacceptancestarttime: new FormControl(null),
            creatorparentid: new FormControl(this.storage.getParentId()),
            //isonpriority:new FormControl('false'),
            paymentstatus: new FormControl(null),
            paymenttype: new FormControl(null),
            requirementtype: new FormControl('proposal'),
            propertysubtype: new FormControl(''),
            annualutilityescalation: new FormControl('3.5', [Validators.required]),
            incentive: new FormControl('', [Validators.required]),
            costofsystem: new FormControl(null, [Validators.required]),
            personname: new FormControl(null, [Validators.required, Validators.pattern(NAME)]),
            oldcommentid: new FormControl(''),
            sameemailconfirmed: new FormControl(null),
            designinverters: new FormControl([]),
            utility: new FormControl("", [Validators.required]),
            utilityrate: new FormControl('',[Validators.required]),
            modulemakefilter: new FormControl(""),
            modulemodelfilter: new FormControl(""),
            invertermakefilter : new FormControl(""),
             invertermodelfilter : new FormControl(""),

            // uploadbox:new FormControl('')
        });

        this.numberOfInverters.push({
            invertermake: "invertermake",
            invertermodel: "invertermodel",
            inverterscount: "inverterscount",
            invertermakefilter: "invertermakefilter",
            invertermodelfilter: "invertermodelfilter",
            selectedInverterMakeID: null,
            selectedInverterModelID: null,
            isSaved: true,
            newEntry: false,
            invertercount: null,

        });

        this.designId = +this.route.snapshot.paramMap.get('id');
        this.getAssignees();

        this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
        this.autocompleteItems = [];

        this.isClient = this.utils.isClient();
        if (!this.isClient) {
            this.companyrequi = true;

            console.log('com', this.companyrequi);
        }
        else {

            this.companyrequi = false;
            console.log('com', this.companyrequi);

        }
    }
    // add new inverters
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

    numberfield(event) {


    }

    ionViewDidEnter() {
        this.fetchIncentive();
        this.autocompleteItems = [];
    }

    fetchIncentive() {
        this.apiService.salesIncentives().subscribe(
            (response: any) => {
                this.incentives = response;
            },
            error => {
                this.utils.errorSnackBar("Error");
            }
        );
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
        this.fieldDisabled = false;
        this.userdata = this.storage.getUser();
        this.byDefaultData();
        this.address = this.storage.getData();
        console.log("dxx", this.address);

        this.subscription = this.utils.getScheduleFormEvent().subscribe((event) => {
            if (event === ScheduleFormEvent.SAVE_SALES_FORM || event === ScheduleFormEvent.SEND_SALES_FORM) {
                this.send = event;
                // this.addForm();
                this.submitform();

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

            this.desginForm.patchValue({
                createdby: this.storage.getUserID()
            });



        }
        setTimeout(() => {
            this.fetchModuleMakesData();
            this.fetchInverterMakesData();
            //this.fetchUtilityMakesData();
            this.addressValue();
            if (this.designId !== 0) {
                this.loadModuleModelsData();
                this.loadInverterModelsData();
                this.byDefaultData();
            }
        });
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

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    displayFnModuleMake(modulemake: SolarMake): string {
        return modulemake && modulemake.name ? modulemake.name : "";
    }

    private _filterModuleMake(name: string) {
        const filterValue = name.toLowerCase();
        return this.modulemakes.filter(
            modulemake => modulemake.name.toLowerCase().indexOf(filterValue) != -1
        );
    }

    displayFnModuleModel(modulemodel: any): string {
        return modulemodel && modulemodel.name ? modulemodel.name : "";
    }

    private _filterModuleModel(rate: string) {
        const filterValue = rate.toLowerCase();

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
        console.log('fetchModuleMakesData');
        this.apiService.getSolarMake().subscribe(
            response => {

                this.modulemakes = response;
                this.filteredModuleMakes = this.desginForm.get('modulemakefilter').valueChanges.pipe(
                    startWith(""),
                    map(value => (typeof value === "string" ? value : value.name)),
                    map(name => (name ? this._filterModuleMake(name) : this.modulemakes.slice()))
                );
                console.log('this.filteredModuleMakes', this.filteredModuleMakes);

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


        if (_event.isUserInput) {
            this.desginForm.get('solarmodel').setValue("");
            if (this.isEditMode) {
                this.selectedModuleModelID = null;
            }
            this.modulemodels = [];
            this.selectedModuleMakeID = make.id;
            if (make.name === 'None') {
                this.desginForm.get('solarmodel').setValue('None');
                this.commentrequi = false;
            } else if (make.name === 'others') {
                this.desginForm.get('solarmodel').setValue('others');
                console.log('Please enter module make / module make in comment');
                this.commentrequi = true;
                this.place = 'Please enter module make,module model,inverter make,inverter model and inverterscount here..';

            } else {
                this.commentrequi = false;
                this.modulecountdisable = false;
                this.place = 'Start typing here';
            }

            this.apiService.getSolarMade(make.id).subscribe(
                response => {

                    this.modulemodels = response;
                    this.filteredModuleModels = this.desginForm.get('modulemodelfilter').valueChanges.pipe(
                        startWith(""),
                        map(value => (typeof value === "string" ? value : value.name)),
                        map(name => (name ? this._filterModuleModel(name) : this.modulemodels.slice()))
                    );
                },
                error => {
                    this.utils.errorSnackBar("Error");
                });

            if (make.name === 'others') {

                // var obj = {
                //     id: 0, name: "Others",
                //     created_at: null,
                //     updated_at: null
                // };
                // this.modulemodels.push(obj);
            }
        }
    }

    loadModuleModelsData() {
        this.modulemodels = [];
        this.apiService.getSolarMade(this.selectedModuleMakeID).subscribe(
            response => {

                this.modulemodels = response;
                this.filteredModuleModels = this.desginForm.get('solarmodel').valueChanges.pipe(
                    startWith(""),
                    map(value => (typeof value === "string" ? value : value.name)),
                    map(name => (name ? this._filterModuleModel(name) : this.modulemodels.slice()))
                );
                // var obj = {
                //     id: 0, name: "Others",
                //     created_at: null,
                //     updated_at: null
                // };
                // this.modulemodels.push(obj);
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
            response => {
                  console.log(response)
                this.invertermakes = response['data'];
                console.log(this.invertermakes)

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
                this.desginForm.get(this.numberOfInverters[index].inverterscount).setValue('0');
                this.desginForm.get(this.numberOfInverters[index].invertermodel).setValue('others');
                this.addextrainverters = true;
                this.commentrequi = true;
                this.place = 'Please enter module make,module model,inverter make,inverter model and inverterscount here..';
            } else {
                this.commentrequi = false;
                this.numberOfInverters[index].invertercountdisable = false;
                this.numberOfInverters[index].invertermakedisable = false;
                this.numberOfInverters[index].inveretereror = false;
                this.addextrainverters = false;
                this.place = 'Start typing here';

            }
            this.apiService.getInverterMade(make.id).subscribe(
                response => {


                    // this.numberOfInverters[index].invertermodellist = response;

                    this.invertermodels = response;
                    if (make.name === 'others') {
                        // var obj = {
                        //     id: 0,
                        //     name: "Others",
                        //     created_at: null,
                        //     updated_at: null
                        // };
                        // this.invertermodels.push(obj);
                    }
                    this.numberOfInverters[index].filteredInverterModels = this.desginForm.get(this.numberOfInverters[index].invertermodel).valueChanges.pipe(
                        startWith(""),
                        map(value => (typeof value === "string" ? value : value.name)),
                        map(name => (name ? this._filterInverterModel(name) : this.invertermodels.slice()))
                    );

                    // console.log(this.invertermodels);
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
        this.invertermodels = [];
        this.apiService.getInverterMade(this.selectedInverterMakeID).subscribe(
            response => {

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

    setSelectedInverterModel(model, index) {
        //console.log('model');

        //console.log('model'+this.numberOfInverters[index].invertermodellist);

        /*  const toSelect = this.numberOfInverters[index].invertermodellist.find(
              (c) => c.name == model?.value
            );*/
        //this.numberOfInverters[index].selectedInverterModelID = model.id;

        this.numberOfInverters[index].selectedInverterModelID = model.id;

        this.numberOfInverters[index].filteredInverterModels = this.desginForm.get(this.numberOfInverters[index].invertermodel).valueChanges.pipe(
            startWith(""),
            map(value => (typeof value === "string" ? value : value.name)),
            map(name => (name ? this._filterInverterModel(name) : this.numberOfInverters[index].tempFilteredInverterModels.slice()))
        );

    }

    saveModuleMake() {

        const found = this.modulemakes.some(el => el.name === this.desginForm.get("solarmake").value);
        if (!found) {

            let solarmadedata = {


                name: this.desginForm.get('solarmake').value
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
        const ismakefound = this.modulemakes.some(el => el.name === this.desginForm.get("solarmake").value);

        const found = this.modulemodels.some(el => el.name === this.desginForm.get("solarmodel").value);

        if (!ismakefound || !found) {
            let solarmadedata = {
                modulemake: this.selectedModuleMakeID,
                name: this.desginForm.get('solarmodel').value

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
                        solarmake: this.design.solarmake.name,
                        solarmodel: this.design.solarmodel.name,
                        invertermake: this.design.invertermake.name,
                        invertermodel: this.design.invertermodel.name,
                        inverterscount: this.design.inverterscount,
                        status: this.design.status,
                        oldcommentid: ''
                    });

                    this.utils.setStaticAddress(this.design.address);
                    this.oldcommentid = this.design.comments == '' ? '' : this.design.comments[0].id;
                    //  this.attachmentData=this.design.attachments.length==1 ? this.design.attachments[0].name + this.design.attachments[0].ext : this.design.attachments.length;
                    if (this.design.assignedto !== null && this.design.assignedto !== undefined) {
                        this.desginForm.patchValue({
                            assignedto: this.design.assignedto.id
                        });
                    }
                    // setTimeout(() => {
                    //   this.getSolarMakeForForm();
                    //   this.getInverterMakeForForm();
                    // }, 500)
                });

            }, (error) => {
                this.utils.hideLoading();
            });
        });
    }


    remove(file, i) {


        this.indexOfArcFiles.push(file.id);

        this.isArcFileDelete = true;




        let data = "";
        if (file.path == null) {
            data =
                "designs/" + this.designId +
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
                    this.architecturalData.splice(i, 1);
                    this.architecturalData = [...this.architecturalData];

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
                this.designId +
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
                    this.attachmentData.splice(i, 1);
                    this.attachmentData = [...this.attachmentData];
                    this.cdr.detectChanges();
                }, responseError => {
                    this.utils.hideLoading();
                    const error: ErrorModel = responseError.error;
                    this.utils.errorSnackBar(error.message[0].messages[0].message);
                }
            );
        });


        this.cdr.detectChanges();
    }

    deleteArcFile(index) {


        // this.utils.showLoading('Deleting Architecture Design').then((success)=>{
        for (var i = 0; i < index.length; i++) {
            var id = index[i];
            this.utils.showLoading("Deleting Architectural File").then(() => {
                this.apiService.deletePrelimImage(id).subscribe(res => {

                    this.indexOfArcFiles = [];
                    this.cdr.detectChanges();
                });
            });
            // this.utils.hideLoading().then(()=>{
            //   //   this.utils.showSnackBar('File deleted successfully');
            //     // this.navController.navigateRoot(["/permit-schedule",{id:this.designId}]);

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

                        this.indexOfAttachmentFile = [];
                        this.cdr.detectChanges();
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
        if (this.desginForm.status === 'VALID') {
            this.saveModuleMake();

        } else {
            this.submitform();
        }

    }

    submitform() {

        // const invalid = [];
        // const controls = this.desginForm.controls;
        // for (const name in controls) {
        //     if (controls[name].invalid) {
        //         invalid.push(name);
        //     }
        // }

        // return invalid;

        console.log('this.desginForm', this.desginForm);

        if (this.desginForm.status === 'VALID') {
            var designstatus;
            var designoutsourcedto;
            var isoutsourced;
            var deliverydate;

            var creatorparentid;
            var createdby;
            if (this.designCreatedBy) {
                createdby = this.designCreatedBy;
                creatorparentid = this.designCreatedByUserParent;
                var tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 2);
                designstatus = "requestaccepted";
                designoutsourcedto = "232";
                isoutsourced = true;
                var designacceptancestarttime = new Date();
                designacceptancestarttime.setMinutes(designacceptancestarttime.getMinutes() + 30);
                deliverydate = tomorrow.toISOString();
                console.log('create by ' + createdby + 'creatorparentid' + creatorparentid);
            } else {
                designstatus = "created";
                designoutsourcedto = null;
                isoutsourced = false;
                deliverydate = null;
                createdby = this.userdata.id;
                creatorparentid = this.userdata.parent.id;
                designacceptancestarttime = new Date();
            }

            var newConstruction = this.desginForm.get("newconstruction").value;
           
            var designinverters = [];
            console.log("nnnn", this.numberOfInverters);
            if (this.numberOfInverters.length > 0) {
                this.numberOfInverters.forEach((element, index) => {
                    designinverters.push({
                        invertermake: this.numberOfInverters[index].selectedInverterMakeID,
                        invertermodel: this.numberOfInverters[index].selectedInverterModelID,
                        invertercount: this.desginForm.get(this.numberOfInverters[index].inverterscount).value.toString(),
                    });
                });
            } else {

                designinverters.push({
                    invertercount: this.desginForm.get('inverterscount').value.toString(),
                    invertermake: this.selectedInverterMakeID,
                    invertermodel: this.selectedInverterModelID,
                });
            }

            console.log("designinverters", designinverters);
            var newConstruction = this.desginForm.get("newconstruction").value;

            if(newConstruction == 'true' && this.archFiles.length>0){

                this.desginForm.get("architecturaldesign").setValue('true');
            }else{
            this.desginForm.get("architecturaldesign").setValue('false');

            }
            if (this.designId === 0) {

                if (this.send === ScheduleFormEvent.SAVE_SALES_FORM) {

                    this.utils.showLoading('Saving').then(() => {
                        let data = {
                            company: this.desginForm.get('company').value,
                            name: this.desginForm.get('name').value,
                            email: this.desginForm.get('email').value,
                            address: this.desginForm.get('address').value,
                            monthlybill: parseInt(this.desginForm.get('monthlybill').value),
                            solarmake: this.selectedModuleMakeID,
                            solarmodel: this.selectedModuleModelID,

                            //createdby: this.storage.getUserID(),
                            createdby: createdby,
                            //assignedto: this.desginForm.get('assignedto').value,
                            rooftype: this.desginForm.get('rooftype').value,
                           
                            tiltofgroundmountingsystem: this.desginForm.get('tiltofgroundmountingsystem').value,
                            mountingtype: this.desginForm.get('mountingtype').value,
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
                            postalcode: parseInt(this.desginForm.get('postalcode').value),
                            status: designstatus,
                            //attachments: this.desginForm.get('attachments').value,
                            expecteddeliverydate:deliverydate,
                            //creatorparentid:this.storage.getParentId()
                            creatorparentid: creatorparentid,
                            outsourcedto: designoutsourcedto,
                            designacceptancestarttime: designacceptancestarttime,
                            isoutsourced: isoutsourced,
                            // isdesignraised: false,
                            utility: this.desginForm.get('utility').value,
                            utilityrate: this.desginForm.get('utilityrate').value,
                            annualutilityescalation: this.desginForm.get('annualutilityescalation').value.toString(),
                            incentive: this.desginForm.get('incentive').value,
                            costofsystem: this.desginForm.get('costofsystem').value,
                            personname: this.desginForm.get('personname').value,
                            projectsubtype: this.desginForm.get('propertysubtype').value,

                            sameemailconfirmed: this.desginForm.get('sameemailconfirmed').value,
                            designinverters: designinverters,
                            hashkey: "" + new Date().getTime() + "",
                            oldcommentid: this.desginForm.get('oldcommentid').value,
                            requirementtype: this.desginForm.get('requirementtype').value,
                            chatid: this.desginForm.get('requesttype').value + "_" + new Date().getTime(),
                            groupchatpassword: "wattmonk" + new Date().getTime(),
                            recordidsf:"",
                            dataentry: false,
                            isonpriority: false,
                            paymentstatus: null,
                            amount: null,
                            sourcefrom: "",
                        }
                        this.apiService.addDesginForm(data).subscribe((response) => {
                            // this.uploaarchitecturedesign(response.id,'architecturaldesign');
                            // this.uploadpreliumdesign(response.id,'attachments')
                            this.utils.hideLoading().then(() => {
                                //this.getClientsadmins(creatorparentid,data);
                                if (this.logoSelected) {
                                    this.updateLogo();
                                }
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
                                       
                                        this.router.navigate(['/home/design'])
                                        // this.utils.showSnackBar('Design have been saved');
                                        this.utils.setHomepageDesignRefresh(true);
                                    }
                                }
                                // this.utils.hideLoading().then(() => {

                                //   this.createChatGroup(response);
                                //   this.router.navigate(['/home/design'])
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
                } else if (this.send === ScheduleFormEvent.SEND_SALES_FORM) {
                    let data = {
                        company: this.desginForm.get('company').value,
                        name: this.desginForm.get('name').value,
                        email: this.desginForm.get('email').value,
                        address: this.desginForm.get('address').value,
                        monthlybill: parseInt(this.desginForm.get('monthlybill').value),
                        solarmake: this.selectedModuleMakeID,
                        solarmodel: this.selectedModuleModelID,

                        //createdby: this.storage.getUserID(),
                        createdby: createdby,
                        //assignedto: this.desginForm.get('assignedto').value,
                        rooftype: this.desginForm.get('rooftype').value,
                       
                        tiltofgroundmountingsystem: this.desginForm.get('tiltofgroundmountingsystem').value,
                        mountingtype: this.desginForm.get('mountingtype').value,
                        projecttype: this.desginForm.get('projecttype').value,
                        newconstruction:  JSON.parse(this.desginForm.get('newconstruction').value),
                        source: this.desginForm.get('source').value,
                        comments: this.desginForm.get('comments').value,
                        requesttype: this.desginForm.get('requesttype').value,
                        latitude: this.desginForm.get('latitude').value,
                        longitude: this.desginForm.get('longitude').value,
                        country: this.desginForm.get('country').value,
                        state: this.desginForm.get('state').value,
                        city: this.desginForm.get('city').value,
                        postalcode: parseInt(this.desginForm.get('postalcode').value),
                        status: designstatus,
                        //attachments: this.desginForm.get('attachments').value,
                        expecteddeliverydate:deliverydate,
                        //creatorparentid:this.storage.getParentId()
                        creatorparentid: creatorparentid,
                        outsourcedto: designoutsourcedto,
                        designacceptancestarttime: designacceptancestarttime,
                        isoutsourced: isoutsourced,
                        utility: this.desginForm.get('utility').value,
                        utilityrate: this.desginForm.get('utilityrate').value,
                        annualutilityescalation: this.desginForm.get('annualutilityescalation').value.toString(),
                        incentive: this.desginForm.get('incentive').value,
                        costofsystem: this.desginForm.get('costofsystem').value,
                        personname: this.desginForm.get('personname').value,
                        requirementtype: this.desginForm.get('requirementtype').value,
                        // isdesignraised: false,         
                        projectsubtype: this.desginForm.get('propertysubtype').value,

                        designinverters: designinverters,
                        hashkey: "" + new Date().getTime() + "",
                        sameemailconfirmed: this.desginForm.get('sameemailconfirmed').value,
                        oldcommentid: this.desginForm.get('oldcommentid').value,
                        chatid: this.desginForm.get('requesttype').value + "_" + new Date().getTime(),
                        groupchatpassword: "wattmonk" + new Date().getTime(),
                        recordidsf:"",
                        dataentry: false,
                        isonpriority: false,
                        paymentstatus: null,
                        amount: null,
                        sourcefrom: "",
                    }
                    this.apiService.addDesginForm(data).subscribe((response) => {

                        this.utils.hideLoading().then(() => {
                            //this.getClientsadmins(creatorparentid,data);
                            if (this.logoSelected) {
                                this.updateLogo();
                            }
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
                if (this.send === ScheduleFormEvent.SAVE_SALES_FORM) {
                    let data = {
                        company: this.desginForm.get('company').value,
                        name: this.desginForm.get('name').value,
                        email: this.desginForm.get('email').value,
                        address: this.desginForm.get('address').value,
                        monthlybill: parseInt(this.desginForm.get('monthlybill').value),
                        solarmake: this.selectedModuleMakeID,
                        solarmodel: this.selectedModuleModelID,
                        designinverters: designinverters,
                        hashkey: "" + new Date().getTime() + "",//createdby: this.storage.getUserID(),
                        createdby: createdby,
                        //assignedto: this.desginForm.get('assignedto').value,
                        rooftype: this.desginForm.get('rooftype').value,
                       
                        tiltofgroundmountingsystem: this.desginForm.get('tiltofgroundmountingsystem').value,
                        mountingtype: this.desginForm.get('mountingtype').value,
                        projecttype: this.desginForm.get('projecttype').value,
                        newconstruction:  JSON.parse(this.desginForm.get('newconstruction').value),
                        source: this.desginForm.get('source').value,
                        comments: this.desginForm.get('comments').value,
                        requesttype: this.desginForm.get('requesttype').value,
                        latitude: this.desginForm.get('latitude').value,
                        longitude: this.desginForm.get('longitude').value,
                        country: this.desginForm.get('country').value,
                        state: this.desginForm.get('state').value,
                        city: this.desginForm.get('city').value,
                        postalcode: parseInt(this.desginForm.get('postalcode').value),
                        status: designstatus,
                        assignedto: this.desginForm.get('assignedto').value,
                        //attachments: this.desginForm.get('attachments').value,
                        expecteddeliverydate:deliverydate,
                        //creatorparentid:this.storage.getParentId()
                        creatorparentid: creatorparentid,
                        outsourcedto: designoutsourcedto,
                        designacceptancestarttime: designacceptancestarttime,
                        isoutsourced: isoutsourced,
                        // isdesignraised: false,
                        utility: this.desginForm.get('utility').value,
                        utilityrate: this.desginForm.get('utilityrate').value,
                        annualutilityescalation: this.desginForm.get('annualutilityescalation').value.toString(),
                        incentive: this.desginForm.get('incentive').value,
                        costofsystem: this.desginForm.get('costofsystem').value,
                        personname: this.desginForm.get('personname').value,
                        sameemailconfirmed: this.desginForm.get('sameemailconfirmed').value,
                        projectsubtype: this.desginForm.get('propertysubtype').value,

                        oldcommentid: this.desginForm.get('oldcommentid').value,
                        requirementtype: this.desginForm.get('requirementtype').value,
                        chatid: this.desginForm.get('requesttype').value + "_" + new Date().getTime(),
                            groupchatpassword: "wattmonk" + new Date().getTime(),
                            recordidsf:"",
                            dataentry: false,
                            isonpriority: false,
                            paymentstatus: null,
                            amount: null,
                            sourcefrom: "",
                    }
                    this.utils.showLoading('Saving').then(() => {
                        this.apiService.updateDesignForm(data, this.designId).subscribe(response => {
                            this.utils.hideLoading().then(() => {
                               // this.getClientsadmins(creatorparentid,data);
                                if (this.logoSelected) {
                                    this.updateLogo();
                                }
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
                } else if (this.send === ScheduleFormEvent.SEND_SALES_FORM) {
                    let data = {
                        company: this.desginForm.get('company').value,
                        name: this.desginForm.get('name').value,
                        email: this.desginForm.get('email').value,
                        address: this.desginForm.get('address').value,
                        monthlybill: parseInt(this.desginForm.get('monthlybill').value),
                        solarmake: this.selectedModuleMakeID,
                        solarmodel: this.selectedModuleModelID,
                        designinverters: designinverters,
                        hashkey: "" + new Date().getTime() + "",//createdby: this.storage.getUserID(),
                        createdby: createdby,
                        assignedto: this.desginForm.get('assignedto').value,
                        rooftype: this.desginForm.get('rooftype').value,
                        
                        tiltofgroundmountingsystem: this.desginForm.get('tiltofgroundmountingsystem').value,
                        mountingtype: this.desginForm.get('mountingtype').value,
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
                        postalcode: parseInt(this.desginForm.get('postalcode').value),
                        status: designstatus,
                        //attachments: this.desginForm.get('attachments').value,
                        expecteddeliverydate:deliverydate,
                        //creatorparentid:this.storage.getParentId()
                        creatorparentid: creatorparentid,
                        outsourcedto: designoutsourcedto,
                        designacceptancestarttime: designacceptancestarttime,
                        isoutsourced: isoutsourced,
                        utility: this.desginForm.get('utility').value,
                        utilityrate: this.desginForm.get('utilityrate').value,
                        annualutilityescalation: this.desginForm.get('annualutilityescalation').value.toString(),
                        incentive: this.desginForm.get('incentive').value,
                        costofsystem: this.desginForm.get('costofsystem').value,
                        personname: this.desginForm.get('personname').value,
                        projectsubtype: this.desginForm.get('propertysubtype').value,

                        // isdesignraised: false,
                        sameemailconfirmed: this.desginForm.get('sameemailconfirmed').value,
                        oldcommentid: this.desginForm.get('oldcommentid').value,
                        requirementtype: this.desginForm.get('requirementtype').value,
                        chatid: this.desginForm.get('requesttype').value + "_" + new Date().getTime(),
                            groupchatpassword: "wattmonk" + new Date().getTime(),
                            recordidsf:"",
                            dataentry: false,
                            isonpriority: false,
                            paymentstatus: null,
                            amount: null,
                            sourcefrom: "",
                    }
                    this.apiService.updateDesignForm(data, this.designId).subscribe(response => {
                        this.utils.hideLoading().then(() => {

                            //this.getClientsadmins(creatorparentid,data);
                            if (this.logoSelected) {
                                this.updateLogo();
                            } if (newConstruction == 'true') {
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
        } else {
            if (this.desginForm.value.name == '' || this.desginForm.get('name').hasError('pattern')) {

                this.utils.errorSnackBar('Please check the field name.');
            } else if (this.desginForm.value.email == '' || this.desginForm.get('email').hasError('pattern')) {
                this.utils.errorSnackBar('Please check the field email.');
            } else if (this.desginForm.value.monthlybill == '' || this.desginForm.get('monthlybill').hasError('pattern')) {
                this.utils.errorSnackBar('Please check the field annual units.');
            } else if (this.desginForm.value.inverterscount == '' || this.desginForm.get('inverterscount').hasError('pattern')) {
                this.utils.errorSnackBar('Please check the field inverterscount.');
            } else if (this.desginForm.value.address == '' || this.desginForm.value.address == null) {
                this.utils.errorSnackBar('Please check the field address.');
            } else if (this.desginForm.value.solarmake == '' || this.desginForm.get('solarmake').hasError('pattern')) {
                this.utils.errorSnackBar('Please check the field module make.');
            } else if (this.desginForm.value.solarmodel == '' || this.desginForm.get('solarmodel').hasError('pattern')) {
                this.utils.errorSnackBar('Please check the field module model.');
            } else if (this.desginForm.value.invertermake != '' && this.desginForm.get('invertermake').hasError('pattern')) {
                this.utils.errorSnackBar('Please check the field inverter make.');
            } else if (this.desginForm.value.invertermodel != '' && this.desginForm.get('invertermodel').hasError('pattern')) {
                this.utils.errorSnackBar('Please check the field inverter model.');
            } else if (this.desginForm.value.utility == '' || this.desginForm.get('utility').hasError('pattern')) {
                this.utils.errorSnackBar('Please check the field utility name.');
            } /*else if (this.desginForm.value.utilityrate == '' || this.desginForm.get('utilityrate').hasError('pattern')) {
                this.utils.errorSnackBar('Please check the field utility rate.');
            }*/ else if (this.desginForm.value.mountingtype == '') {
                this.utils.errorSnackBar('Please fill the mounting type.');
            } else if (this.desginForm.value.annualutilityescalation == '') {
                this.utils.errorSnackBar('Please fill the annual utility escalation.');
            } else if (this.desginForm.value.incentive == '') {
                this.utils.errorSnackBar('Please fill the incentive.');
            } else if (this.desginForm.value.costofsystem == '') {
                this.utils.errorSnackBar('Please fill the cost of system');
            } else if (this.desginForm.value.personname == '') {
                this.utils.errorSnackBar('Please fill the representative name.');
            } else if (this.desginForm.value.mountingtype == '') {
                this.utils.errorSnackBar('Please fill the mounting type.');
            } else if (this.desginForm.value.projecttype == '') {
                this.utils.errorSnackBar('Please fill the Property Type.');
            } else if (this.desginForm.get('mountingtype').value == 'both' && (this.desginForm.value.rooftype == '' || this.desginForm.value.tiltofgroundmountingsystem == '')) {
                this.utils.errorSnackBar('Please fill the rooftype / tilt for ground mount.');
            } else if (this.desginForm.get('mountingtype').value == 'ground' && (this.desginForm.value.tiltofgroundmountingsystem == '' || this.desginForm.get('tiltofgroundmountingsystem').hasError('pattern') || this.desginForm.value.tiltofgroundmountingsystem == undefined)) {
                this.utils.errorSnackBar('Please check the field tilt for ground mount.');
            } else if (this.desginForm.get('mountingtype').value == 'roof' && (this.desginForm.value.rooftype == '' || this.desginForm.value.rooftype == undefined)) {
                this.utils.errorSnackBar('Please fill the rooftype.');
            }  else if (this.desginForm.get('newconstruction').value == 'true' && this.archFiles.length == 0 && (this.desginForm.get('architecturaldesign').value == 'false' || this.desginForm.get('architecturaldesign').value == '' || this.desginForm.get('architecturaldesign').hasError('pattern') || this.desginForm.value.architecturaldesign == undefined )) {
                this.utils.errorSnackBar('Please attach architectural design.');
            } else if (this.desginForm.value.comments == '' && this.commentrequi == true) {
                this.utils.errorSnackBar('Please add comment.');
            } else {
                this.utils.errorSnackBar("Please Fill all Required information");
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

    // getmodulename(event){

    //     this.modulename= event;


    // }


    // logScrolling(e){

    // }

    // record(){
    //   this.filterrecord= this.listOfSolarMake.filter(x=>
    // }

    // getSolarMakeForForm() {

    //     this.apiService.getSolarMake().subscribe(response => {
    //         this.listOfSolarMake = response;

    //         this.apiService.getSolarMade(this.design.solarmake.id).subscribe(solarresponse => {
    //             // this.utils.hideLoading().then(()=>{
    //             this.listOfSolarMade = solarresponse;


    //             setTimeout(() => {
    //                 this.desginForm.patchValue({
    //                     solarmake: this.design.solarmake.id,
    //                     solarmodel: this.design.solarmodel.id
    //                 });
    //                 // if(this.onFormSubmit){
    //                 this.desginForm.get('solarmake').valueChanges.subscribe(val => {
    //                     this.getSolarMade();
    //                 });
    //                 // }
    //             }, 500);
    //             // });
    //         }, solarResponseError => {

    //             const error: ErrorModel = solarResponseError.error;
    //             if (error.message instanceof String) {
    //                 this.utils.errorSnackBar(error.message);
    //             } else if (error.message instanceof Array) {
    //                 this.utils.errorSnackBar(error.message[0].messages[0].message);
    //             }
    //         });

    //     }, responseError => {
    //         const error: ErrorModel = responseError.error;
    //         if (error.message instanceof String) {
    //             this.utils.errorSnackBar(error.message);
    //         } else if (error.message instanceof Array) {
    //             this.utils.errorSnackBar(error.message[0].messages[0].message);
    //         }
    //     });
    // }

    // getInverterMakeForForm() {
    //     this.apiService.getInverterMake().subscribe(response => {

    //         // this.listOfInverterMake = response;
    //         this.apiService.getInverterMade(this.design.invertermake.id).subscribe(makeResponse => {
    //             // this.utils.hideLoading();

    //             this.listOfInverterMade = makeResponse;

    //             setTimeout(() => {
    //                 this.desginForm.patchValue({
    //                     invertermake: this.design.invertermake.id,
    //                     invertermodel: this.design.invertermodel.id
    //                 });
    //                 // if(this.onFormSubmit){
    //                 this.desginForm.get('invertermake').valueChanges.subscribe(val => {
    //                     this.getInverterMade();
    //                 });
    //                 // }
    //             }, 500);


    //         }, makeResponseError => {

    //             const error: ErrorModel = makeResponseError.error;
    //             if (error.message instanceof String) {
    //                 this.utils.errorSnackBar(error.message);
    //             } else if (error.message instanceof Array) {
    //                 this.utils.errorSnackBar(error.message[0].messages[0].message);
    //             }
    //         });
    //     }, responseError => {
    //         const error: ErrorModel = responseError.error;
    //         if (error.message instanceof String) {
    //             this.utils.errorSnackBar(error.message);
    //         } else if (error.message instanceof Array) {
    //             this.utils.errorSnackBar(error.message[0].messages[0].message);
    //         }
    //     });
    // }

    // getSolarMade() {
    //     this.utils.showLoading('Getting module models').then((success) => {
    //         this.apiService.getSolarMade(this.desginForm.get('solarmake').value).subscribe(response => {
    //             this.utils.hideLoading().then(() => {
    //                 this.listOfSolarMade = response;
    //                 var obj =
    //                 {
    //                     id: 0,
    //                     name: "Others",
    //                     modulemodel: null,
    //                     created_at: null,
    //                     updated_at: null,
    //                     description: "",
    //                     nameplatepmax: null,
    //                     ptc: null,
    //                     numberofcells: null,
    //                     isc: null,
    //                     voc: null,
    //                     ipmax: null,
    //                     vpmax: null,
    //                     tempcoefofvoc: null,
    //                     fuserating: null,
    //                     length: null,
    //                     width: null,
    //                     area: null,
    //                     weight: null,
    //                     modulemake: {
    //                         id: 0,
    //                         name: "Others",
    //                         created_at: null,
    //                         updated_at: null,

    //                         cataloguesuploaded: false
    //                     },
    //                     modellength: null,
    //                     modelwidth: null,
    //                     cataloguesuploaded: false

    //                 };

    //                 this.listOfSolarMade.push(obj);
    //                 if (this.desginForm.get('solarmake').value == '0') {
    //                     this.desginForm.get('solarmodel').setValue('Others');
    //                     this.commentrequi = true;
    //                     this.place = 'Please enter module make,module model,inverter make,inverter model and inverterscount here..';
    //                 } else {
    //                     this.place = 'Start typing here';
    //                 }
    //                 this.desginForm.patchValue({
    //                     solarmodel: ''
    //                 });
    //             });
    //         }, responseError => {
    //             this.utils.hideLoading();
    //             const error: ErrorModel = responseError.error;
    //             this.utils.errorSnackBar(error.message[0].messages[0].message);
    //         });
    //         // }, (error) => {

    //     });
    // }

    ioniViewDidEnter() {


    }

    // getSolarMake() {
    //     this.getInverterMake();

    //     this.apiService.getSolarMake().subscribe(response => {
    //         this.listOfSolarMake = response;
    //         var obj = {
    //             id: 0, name: "Others",
    //             created_at: null,
    //             updated_at: null
    //         };
    //         this.listOfSolarMake.push(obj);

    //     }, responseError => {
    //         const error: ErrorModel = responseError.error;

    //         this.utils.errorSnackBar(error.message[0].messages[0].message);
    //     });
    // }

    // getInverterMade() {

    //     if (this.desginForm.get('invertermake').value == '') {
    //         this.invertermakedisable = true
    //     }
    //     else {
    //         this.invertermakedisable = false;
    //         this.utils.showLoading('Getting inverter models').then((success) => {
    //             this.apiService.getInverterMade(this.desginForm.get('invertermake').value).subscribe(response => {
    //                 this.utils.hideLoading().then(() => {

    //                     this.listOfInverterMade = response;
    //                     this.desginForm.patchValue({
    //                         invertermodel: ''
    //                     });
    //                 });
    //             }, responseError => {
    //                 this.utils.hideLoading();
    //                 const error: ErrorModel = responseError.error;
    //                 this.utils.errorSnackBar(error.message[0].messages[0].message);
    //                 // });
    //                 // });
    //             });
    //             // }, (reject) => {

    //         })
    //     }
    // }

    // getInverterMake() {
    //     this.apiService.getInverterMake().subscribe(response => {

    //         this.listOfInverterMake = response;
    //         var obj = {
    //             id: 0, name: "Others",
    //             created_at: null,
    //             updated_at: null
    //         };
    //         this.listOfInverterMake.push(obj);
    //     }, responseError => {
    //         const error: ErrorModel = responseError.error;
    //         this.utils.errorSnackBar(error.message[0].messages[0].message);
    //     });
    // }

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

        if (this.uploadbox != 'true') {
          //  this.arcFileUrl = [];
           // this.archFiles = [];
           this.isArchitecturalFileUpload = false;
          

        }else{

           
        }
        this.uploadcontrolvalidation();


    }

    files(event) {
        this.utils.showLoading("Processing").then(() => {
        this.isArchitecturalFileUpload = true;
        let uploadedfiles = 0;
        for (let index = 0; index < event.addedFiles.length; index++) {
            //this.archFiles.push(event.addedFiles[i])

            const element = event.addedFiles[index];
            element.isImage = false;
            if (element.type.includes("image")) {
                element.isImage = true;
            }
            const type = element.name.split(".");
            // WEB ARCHIVE EXT NOT SUPPORTED CODE
            if (type[1] == "webarchive") {

            } else {
                this.isArchitecturalFileUpload = true;
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
                    this.archFiles.push(element);
                }
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
                            this.isArchitecturalFileUpload = false;
                        }
                        this.cdr.detectChanges();
                    }
                });






           /* this.getFiletype(event.addedFiles[index]);
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

  
        console.log(this.architecturalpostarray);  });
    }




    prelimfiles(event) {
      
        this.utils.showLoading("Processing").then(() => {
      
        this.attachmentFileUpload = true;
        let uploadedfiles = 0;

        for (let index = 0; index < event.addedFiles.length; index++) {

            const element = event.addedFiles[index];
             element.isImage = false;
            if (element.type.includes("image")) {
                element.isImage = true;
            }
            const type = element.name.split(".");
            // WEB ARCHIVE EXT NOT SUPPORTED CODE
            if (type[1] == "webarchive") {

            } else {
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
                                this.prelimFiles.push(replacedfile);
                                this.prelimFiles.forEach(
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
                    this.prelimFiles.push(element);
                }
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
                        // this.uploadattachmentfailedfiles.push(event.addedFiles[index].name);
                        this.prelimFiles.splice(this.prelimFiles.indexOf(event.addedFiles[index]), 1);
                        // that.attachmentpostarray.splice(index, 1);
                        if (this.attachmentpostarray.length === this.prelimFiles.length) {
                            this.utils.hideLoading();
                             this.cdr.detectChanges();
                        }
                        if (this.prelimFiles.length == 0) {
                            this.attachmentFileUpload = false;
                        }
                        this.cdr.detectChanges();
                    }
                });

           /* this.getFiletype(event.addedFiles[index]);
            // this.prelimFiles.push(event.addedFiles[i])
            var reader = getFileReader();
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

        if (this.prelimFiles.length == 1) {
            this.fileName = event.addedFiles[0].name;
        } else if (this.prelimFiles.length > 1) {
            this.fileName = this.prelimFiles.length;
        } else {
            this.fileName = '';
        }



    });


    }

    getFiletype(file) {
        var extension = file.name.substring(file.name.lastIndexOf('.'));
        var mimetype = this.utils.getMimetype(extension);
        // window.console.log(extension, mimetype);
        // var data = new Blob([file], {
        //   type: mimetype
        // });
        // console.log(data);
        // let replaceFile = new File([data], file.name, { type: mimetype })
        if (this.attachmentFileUpload) {
            this.prelimFiles.push(file);
        } else if (this.isArchitecturalFileUpload) {
            this.archFiles.push(file)
        }
        this.cdr.detectChanges();
    }

    uploaarchitecturedesign(response?: any, key?: string, fileObj?: string, index?: number) {
        if (!this.isArchitecturalFileUpload) {
            this.uploadpreliumdesign(response, key, this.prelimFiles[0], 0)
        }
        else {

            this.architecturalpostarray.forEach((element) => {
                element.refid = response.id;
            });
            this.utils.showLoading("Uploading architecture").then(() => {
                this.apiService.uploadawsdesign(this.architecturalpostarray).subscribe(res => {

                    this.utils.hideLoading();
                    if (this.attachmentFileUpload) {
                        this.uploadpreliumdesign(response, 'attachments', this.prelimFiles[0], 0);
                    }
                    else {
                        if (this.send === ScheduleFormEvent.SAVE_SALES_FORM) {
                            this.router.navigate(['/home/design'])
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

                })
            }, responseError => {
                this.utils.hideLoading();
                const error: ErrorModel = responseError.error;
                this.utils.errorSnackBar(error.message[0].messages[0].message);
            })
        }

    }

    uploadpreliumdesign(response?: any, key?: string, fileObj?: string, index?: number) {

        this.attachmentpostarray.forEach((element) => {
            element.refid = response.id;
        });
        this.utils.showLoading("Uploading attachment").then(() => {
            this.apiService.uploadawsdesign(this.attachmentpostarray).subscribe(res => {

                this.utils.hideLoading();
                if (this.send === ScheduleFormEvent.SAVE_SALES_FORM) {
                    this.router.navigate(['/home/design'])
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

            }, responseError => {
                this.utils.hideLoading();
                //this.utils.hideUploadingLoading();
                const error: ErrorModel = responseError.error;
                this.utils.errorSnackBar(error.message[0].messages[0].message);
            })
        })
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
                this.isArchitecturalFileUpload = false;
            }
        });
    }

    removePrelim(event, i) {


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
            this.prelimFiles.splice(this.prelimFiles.indexOf(event), 1);
            this.attachmentpostarray.splice(
                this.attachmentpostarray.indexOf(event),
                1
            );

            this.cdr.detectChanges();
            if (this.prelimFiles.length == 0) {
                this.attachmentFileUpload = false;
            }
        });
    }

    sendtowattmonk() {
        var designacceptancestarttime = new Date();
        designacceptancestarttime.setMinutes(designacceptancestarttime.getMinutes() + 15);
        const postData = {
            outsourcedto: 232,
            isoutsourced: true,
            status: "outsourced",
            designacceptancestarttime: designacceptancestarttime,
            paymenttype: this.utils.getPaymentMode().value,
            couponid: this.utils.getCouponId().value
        };
        var creatorparentid = this.userdata.parent.id;

        this.utils.showLoading('Assigning').then(() => {
            //this.newprelimsRef.update({ count: this.newprelimscount + 1});
            this.apiService.updateDesignForm(postData, /*this.desginForm.get('id').value*/this.value).subscribe((value) => {
                this.utils.hideLoading().then(() => {
                    ;
                   // this.getClientsadmins(creatorparentid,value);
                    this.utils.showSnackBar('Design request has been assigned to WattMonk successfully');//.firstname +" "+this.selectedDesigner.lastname + ' ' + 'successfully');
                    this.router.navigate(['/home/design'])
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
                this.utils.errorSnackBar('Please fill the Property Type.');
            } else if (this.desginForm.value.tiltofgroundmountingsystem == '' || this.desginForm.get('tiltofgroundmountingsystem').hasError('pattern')) {
                this.utils.errorSnackBar('Please check the field tilt for ground mount.');
            } else if (this.desginForm.value.rooftype == '') {
                this.utils.errorSnackBar('Please fill the rooftype.');
            }  else if (this.desginForm.get('newconstruction').value == 'true' && this.archFiles.length == 0 && (this.desginForm.get('architecturaldesign').value == 'false' || this.desginForm.get('architecturaldesign').value == '' || this.desginForm.get('architecturaldesign').hasError('pattern') || this.desginForm.value.architecturaldesign == undefined )) {
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
        this.apiService.getClients().subscribe(res => {
            this.getCompanies = res;

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
        this.desginForm.get('company').setValue(this.proxyValue);
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
                isoutsourced: true,
                designacceptancestarttime: designacceptancestarttime,
                deliverydate: d_date
            });
        }
    }

    private _filterCompanies(companyname: string): Clients[] {
        return this.getCompanies.filter(
            company => company.companyname.toLowerCase().indexOf(companyname) != -1
        );
    }

    // pickarchitecturaldesign(){
    //   this.camera.getPicture(this.options).then((imageData) => {
    //     let base64Image = 'data:image/jpeg;base64,' + imageData;
    //     let blob = this.utils.b64tBlob(base64Image);
    //     let filename = Date.now().toString() + '.png';
    //     this.utils.showLoading('Uploading').then(()=>{
    //       this.apiService.uploadawsdesign(designId, key, blob, filename).subscribe(()=>{

    //       })
    //     })
    //   })

    // }

    // onRangeChangeHandler() {
    //     this.number = this.desginForm.get('annualutilityescalation').value;



    //     if (this.desginForm.get('annualutilityescalation').value > 0 && this.desginForm.get('annualutilityescalation').value < 1) {
    //         this.color = 'dark';
    //     } else if (this.desginForm.get('annualutilityescalation').value > 2 && this.desginForm.get('annualutilityescalation').value < 3) {
    //         this.color = 'primary';
    //     } else if (this.desginForm.get('annualutilityescalation').value > 3 && this.desginForm.get('annualutilityescalation').value < 4) {
    //         this.color = 'secondary';
    //     } else {
    //         this.color = 'danger';
    //     }
    // }

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
                postalcode: ''
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

                this.getGeoEncoder(responses[0].geometry.location.lat(), responses[0].geometry.location.lng(), responses[0].formatted_address, responses[0].address_components);
                this.autocompleteItems = [];
            });
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
            this.desginForm.get('address').setValue(address.address);
            this.desginForm.get('latitude').setValue(address.lat);
            this.desginForm.get('longitude').setValue(address.long);
            this.desginForm.get('country').setValue(address.country);
            this.desginForm.get('city').setValue(address.city);
            this.desginForm.get('state').setValue(address.state);
            this.desginForm.get('postalcode').setValue(address.postalcode);
        }, (error) => {
            this.desginForm.get('address').setValue(null);
            this.desginForm.get('latitude').setValue(null);
            this.desginForm.get('longitude').setValue(null);
            this.desginForm.get('country').setValue(null);
            this.desginForm.get('city').setValue(null);
            this.desginForm.get('state').setValue(null);
            this.desginForm.get('postalcode').setValue(null);
        });
        // this.firstFormGroup.patchValue({
        //   createdby: this.storage.getUserID()
        // });
        // this.autocompleteItems = [];
        this.autoCompleteOff = false;

        //this.getSolarMake();
        this.fetchUtilityMakesData(this.desginForm.get('state').value, this.desginForm.get('city').value);
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

    adddesigninverters() {
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
        this.desginForm.addControl(
            "invertermodelfilter" + this.numberOfInverters.length,
            new FormControl("")
        );
        this.desginForm.addControl(
            "invertermodelfilter" + this.numberOfInverters.length,
                    new FormControl("")
                );
                this.desginForm.addControl(
                    "invertermakefilter" + this.numberOfInverters.length,
                    new FormControl("")
                );
        this.fetchInverterMakesData(Number(this.numberOfInverters.length - 1));
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

    PropertyTypeOption(e) {
        this.propertytypevalue = e.target.value;
    }


    fetchUtilityMakesData(state, city) {



        this.apiService.utilitiesNames(state, city).subscribe(
            (response: any) => {
                this.utilitymakes = response;
                this.filteredUtilityMakes = this.desginForm.get('utility').valueChanges.pipe(
                    startWith(""),
                    map(value => (typeof value === "string" ? value : value.name)),
                    map(name => (name ? this._filterUtilityMake(name) : this.utilitymakes.slice()))
                );

                console.log('this.filteredUtilityMakes' ,this.utilitymakes);
            },
            error => {
                this.utils.errorSnackBar("Error");
            }
        );
    }

    private _filterUtilityMake(name: string) {
        const filterValue = name.toLowerCase();
        return this.utilitymakes.filter(
            utilitymake => utilitymake.name.toLowerCase().indexOf(filterValue) != -1
        );
    }
    displayFnPrelimutility(utilitymake: any): string {
        return utilitymake && utilitymake.name ? utilitymake.name : "";
    }
    fetchUtilityData(_event: any, make) {
        //this.desginForm.patchValue({ uti: " " })

        this.desginForm.get('utility').setValue(make.name);
        this.isPanelOpen = false;
        this.desginForm.patchValue({ utilityrate: " " })
        if (_event.isUserInput) {
            this.desginForm.get('utilityrate').setValue("");
            if (this.isEditMode) {
                this.selectedUtilityRateId = null;
            }
            this.UtilityRates = [];
            this.selectedUtilityId = make.id;
            this.apiService.utilitiesRate(make.id).subscribe(
                (response: any) => {
                    this.UtilityRates = response;
                    this.filteredUtilityRates = this.desginForm.get('utilityrate').valueChanges.pipe(
                        startWith(""),
                        map(value => (typeof value === "string" ? value : value.rate)),
                        map(rate => (rate ? this._filterUtilityRate(rate) : this.UtilityRates.slice()))
                    );
                },
                error => {
                    this.utils.errorSnackBar("Error");
                }
            );
        }
    }

    setSelectedUtilityRate(module) {
        this.selectedUtilityRateId = module.id;
        this.isPanelOpen = false;
    }

    displayFnUtilityRate(UtilityRate: any): string {
        return UtilityRate && UtilityRate.name ? UtilityRate.name : "";
    }

    private _filterUtilityRate(rate: string) {
        const filterValue = rate.toLowerCase();

        return this.UtilityRates.filter(
            UtilityRate => UtilityRate.rate.toLowerCase().indexOf(filterValue) != -1
        );
    }

    saveUtilityName() {


        const found = this.modulemakes.some(el => el.name === this.desginForm.get("utility").value);
        if (!found) {

            let data = {


                name: this.desginForm.get('utility').value
            }
            this.apiService
                .postUtilitiesNames(
                    data
                )
                .subscribe(
                    (response: any) => {

                        this.selectedUtilityId = response.id;
                        this.saveUtilityRate();
                    },
                    error => {
                        this.utils.errorSnackBar(
                            "Error"
                        );
                    }
                );
        } else {
            this.saveUtilityRate();
        }
    }

    saveUtilityRate() {
        const ismakefound = this.utilitymakes.some(el => el.name === this.desginForm.get("utility").value);
        const found = this.UtilityRates.some(el => el.rate === this.desginForm.get("utilityrate").value);

        if (!ismakefound || !found) {
            let data = {
                utility: this.selectedUtilityId,
                rate: this.desginForm.get('utilityrate').value
            }
            this.apiService
                .postUtilitiesRate(
                    data
                )
                .subscribe(
                    (response: any) => {
                        this.selectedUtilityRateId = response.id;
                        this.submitform();
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

    byDefaultData() {

        this.desginForm.patchValue({
            company: this.userdata.company
        })
        if (this.userdata.logo != null) {
            this.logo = this.userdata.logo.url
        }
    }

    loadUtilityRatesData() {
        this.modulemodels = [];
        this.apiService.utilitiesRate(this.selectedUtilityId).subscribe(
            (response: any) => {
                this.UtilityRates = response;
                this.filteredUtilityRates = this.desginForm.get('utilityrate').valueChanges.pipe(
                    startWith(""),
                    map(value => (typeof value === "string" ? value : value.rate)),
                    map(rate => (rate ? this._filterUtilityRate(rate) : this.UtilityRates.slice()))
                );
            },
            error => {
                this.utils.errorSnackBar("Error");
            }
        );
    }

    updateLogo() {

        this.apiService.uploadlogo(this.blob, this.uploadLogo).subscribe(res => {

            this.apiService.updateUser(this.userId, this.uploadLogo).subscribe((res: any) => {


                let token = this.storage.getJWTToken();
                this.storage.setUser(res, token);
            })
        })
    }

    uploadFile(event) {
        this.logoSelected = true;
        this.uploadLogo = event.addedFiles[0].name;


        let reader = new FileReader(); // HTML5 FileReader API
        let file = event.addedFiles[0];
        if (event.addedFiles && event.addedFiles[0]) {
            reader.readAsDataURL(file);

            // When file uploads set it to file formcontrol
            reader.onload = () => {
                this.logo = reader.result;
                this.blob = this.utils.b64toBlob(this.logo);


                this.desginForm.patchValue({
                    logo: this.uploadLogo
                });
            }
            // ChangeDetectorRef since file is loading outside the zone
            this.cdr.markForCheck();
        }
    }

    // check inverters Count value valid or not for particular object
    invertersCountError(event, data, index): void {
        let value = event.detail.value;
        if (value) {
            let form = this.formBuilder.group({
                inverterscount: new FormControl(value, [Validators.required, Validators.minLength(1), Validators.maxLength(3), Validators.pattern('[0-9]{1,3}')]),
            });
            if (form.status === "VALID") {
                data.isCountError = false;
            } else {
                data.isCountError = true;
            }
        } else {
            data.isCountError = false;
        }
    }

    // showinvertmake(e) {
    //     this.shsoinvertmade = e.target.value;
    //     if (this.shsoinvertmade === 'None') {
    //         this.invertercountdisable = true;
    //         this.invertermakedisable = false;
    //         this.desginForm.get('inverterscount').setValue('0');
    //         this.desginForm.get('invertermodel').setValue('None');
    //         console.log("count 0 ");
    //     } else if (this.shsoinvertmade === 'Others') {
    //         this.invertercountdisable = true;
    //         this.invertermakedisable = false;
    //         this.desginForm.get('inverterscount').setValue('0');
    //         this.desginForm.get('invertermodel').setValue('Others');
    //         console.log("count 0 ");

    //     }
    //     this.cdr.detectChanges();
    // }



    invertercou(i) {

        //console.log('data');
      //  this.numberOfInverters[i].selectedInverterMakeID = this.desginForm.get(this.numberOfInverters[i].invertermake).setValue('');

        //console.log('data' + this.numberOfInverters[i].selectedInverterMakeID);


        this.fetchInverterMakesData(i);

    }


    fetchUtilityname() {

        //this.desginForm.get('utility').setValue('');
        this.addressValue();
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
        var GUID = 'prelim' + "_" + new Date().getTime();

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


openAutocompletePanel(){
    console.log("panel open");
	if(this.utilitymakes.length>0){
    this.isPanelOpen = true;
	}else{
		
		this.isPanelOpen = false;
		}
    console.log(this.isPanelOpen);
    // if (this.desginForm.controls.utility != null) {
    // this.isPanelOpen = true;
    // }
    // this.content.addCssClass("no-scroll");
    }
    openAutocompleteratePanel(){
        console.log("panel open" + this.UtilityRates.length);
		
	if(this.UtilityRates.length>0){
        this.isPanelOpen = true;
		}else{
		
		this.isPanelOpen = false;
		}
		
        console.log(this.isPanelOpen);
        // if (this.desginForm.controls.utility != null) {
        // this.isPanelOpen = true;
        // }
        // this.content.addCssClass("no-scroll");
        }

}

