import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CameraPreview, CameraPreviewOptions} from '@ionic-native/camera-preview/ngx';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {AlertController, IonRouterOutlet, IonSlides, NavController, Platform} from '@ionic/angular';
import {Diagnostic} from '@ionic-native/diagnostic/ngx';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {UtilitiesService} from '../utilities.service';
import {ApiService} from '../api.service';
import {InverterMakeModel} from '../model/inverter-make.model';
import {ErrorModel} from '../model/error.model';
import {InverterMadeModel} from '../model/inverter-made.model';
import {SolarMake} from '../model/solar-make.model';
import {SolarMadeModel} from '../model/solar-made.model';
import {CdkDragEnd} from '@angular/cdk/drag-drop';
import html2canvas from 'html2canvas';
import {SurveyStorageModel} from '../model/survey-storage.model';
import {Storage} from '@ionic/storage';
import {AutoCompleteComponent} from '../utilities/auto-complete/auto-complete.component';
import {StorageService} from '../storage.service';
import {Insomnia} from '@ionic-native/insomnia/ngx';
import * as domtoimage from 'dom-to-image';
import {RoofMaterial} from '../model/roofmaterial.model';

export interface MAINMENU {
    name: string;
    isactive: boolean;
    ispending: boolean;
    isvisible: boolean;
    viewmode: number;
    children: CHILDREN[];
}

export interface CHILDREN {
    name: string;
    isactive: boolean;
    ispending: boolean;
    isvisible: boolean;
    checkexistence: boolean;
    isexistencechecked: boolean;
    inputformcontrol: string;
    shotscount: number;
    allowmultipleshots: boolean;
    capturedshots: CAPTUREDSHOT[];
    shots: SHOT[];
}

export interface SHOT {
    isactive: boolean;
    ispending: boolean;
    shotinfo: string;
    questioninfo: string;
    shotstatus: boolean;
    promptquestion: boolean;
    question: string;
    actions: string[];
    result: string;
    questionstatus: boolean;
    questiontype: QUESTIONTYPE;
    inputformcontrol: string;
    imagekey: string;
    imagename: string;
}

export interface CAPTUREDSHOT {
    menuindex: number;
    submenuindex: number;
    shotindex: number;
    shotimage: string;
    imagekey: string;
    imagename: string;
}

export interface Equipment {
    id: number;
    name: string;
    color: string;
    disabledcolor: string;
    enabled: boolean;
    event: CdkDragEnd;
}

export enum QUESTIONTYPE {
    NONE = 0,
    OPTIONS = 1,
    INPUT_NUMBER = 2,
    INPUT_UTILITIES_AUTOCOMPLETE = 3,
    INPUT_INVERTER_AUTOCOMPLETE = 4,
    INPUT_SHOT_NAME = 5,
    INPUT_ROOF_MATERIAL_AUTOCOMPLETE = 6,
    INPUT_TEXT = 7,
    INPUT_TWO_DIMENSIONS = 8
}

export enum VIEWMODE {
    NONE = -1,
    CAMERA = 0,
    FORM = 1,
    MAP = 2,
    GALLERY = 3
}

export interface PENDING_MENU {
    index: number;
    name: string;
    pendingchilds: PENDING_CHILD[];
}

export interface PENDING_CHILD {
    index: number;
    name: string;
    pendingshots: PENDING_SHOT[];
}

export interface PENDING_SHOT {
    index: number;
    name: string;
}

@Component({
    selector: 'app-surveyprocess',
    templateUrl: './surveyprocess.page.html',
    styleUrls: ['./surveyprocess.page.scss']
})
export class SurveyprocessPage implements OnInit {

    @ViewChild('screen', {static: false}) screen: ElementRef;
    @ViewChild('slides', {static: false}) slider: IonSlides;
    @ViewChild('utility', {static: false}) utility: AutoCompleteComponent;
    @ViewChild('roofmaterial', {static: false}) roofmaterial: AutoCompleteComponent;
    @ViewChild('mainscroll', {static: false}) mainscroll: any;
    @ViewChild('submenuscroll', {static: false}) submenuscroll: any;

    QuestionTypes = QUESTIONTYPE;
    ViewModes = VIEWMODE;

    slideOpts = {
        speed: 400
    };

    protected sliderIndex = 0;

    surveystoreddata = {};

    mainmenuitems: MAINMENU[];
    originalmainmenuitems: MAINMENU[];
    selectedmainmenuindex = 0;
    selectedsubmenuindex = 0;
    selectedshotindex = 0;

    previousmainmenuindex = 0;
    previoussubmenuindex = 0;
    previousshotindex = 0;
    previousviewmode = 0;

    pendingmenuitems: PENDING_MENU[];
    viewpendingitems = false;
    ispendingitemsmode = false;

    cameraPreviewOpts: CameraPreviewOptions;
    capturedImage: string;

    iscapturingallowed = true;
    currentzoom = 1;
    maxzoom = 0;
    displayflashrow = false;
    hardwareCameraEnabled = true;
    issidemenucollapsed = true;
    isgallerymenucollapsed = true;
    isdataloaded = false;
    surveyid: number;
    surveytype: string;
    surveycity: string;
    surveystate: string;
    latitude: number;
    longitude: number;
    platformname: string;
    // googleimageurl = 'https://maps.googleapis.com/maps/api/staticmap?zoom=19&maptype=satellite&size=1200x1600&scale=2&key=' + GOOGLE_API_KEY;

    batteryForm: FormGroup;
    pvbatteryForm: FormGroup;
    pvForm: FormGroup;
    activeForm: FormGroup;
    activeFormKeysMap;

    archFiles: string[] = [];

    totalpercent = 0;
    shotcompletecount = 0;
    totalstepcount: number;
    totalimagestoupload = 1;
    imageuploadindex = 1;

    utilities: InverterMakeModel[] = [];
    selectedutilityid: number;
    invertermodels: InverterMadeModel[] = [];
    invertermakes: InverterMakeModel[] = [];
    solarmakes: SolarMake[] = [];
    solarmodels: SolarMadeModel[] = [];
    roofmaterials: RoofMaterial[] = [];
    selectedroofmaterialid: number;

    galleryshots: CAPTUREDSHOT[];

    equipments: Equipment[] = [{
        id: 3,
        name: 'MSP',
        color: '#ff0000',
        disabledcolor: '#ff000080',
        enabled: true,
        event: null
    }, {
        id: 4,
        name: 'INV',
        color: '#6d9eeb',
        disabledcolor: '#6d9eeb80',
        enabled: true,
        event: null
    }, {
        id: 5,
        name: 'BT',
        color: '#ff00ff',
        disabledcolor: '#ff00ff80',
        enabled: true,
        event: null
    }, {
        id: 6,
        name: 'GP',
        color: '#00ffff',
        disabledcolor: '#00ffff80',
        enabled: true,
        event: null
    }, {
        id: 7,
        name: 'EEQ',
        color: '#ffff00',
        disabledcolor: '#ffff0080',
        enabled: true,
        event: null
    }
    ]

    acdisconnectequipment: Equipment = {
        id: 1,
        name: 'ACD',
        color: '#fec412',
        disabledcolor: '#fec41280',
        enabled: true,
        event: null
    }

    pvmeterequipment: Equipment = {
        id: 2,
        name: 'PVM',
        color: '#6aa84f',
        disabledcolor: '#6aa84f80',
        enabled: true,
        event: null
    }

    equipmentscanvasimage: string;
    sitelocationimage: any;
    hasExistingSolarSystem: boolean;
    user: any
    hasBatterySystem: boolean;
    reviewForm = false;
    isSaveFormCalled = false;

    constructor(
        private cameraPreview: CameraPreview,
        private route: ActivatedRoute,
        private http: HttpClient,
        private diagnostic: Diagnostic,
        private navController: NavController,
        private alertController: AlertController,
        private storage: Storage,
        private storageuserdata: StorageService,
        private utilitieservice: UtilitiesService,
        private apiService: ApiService,
        private changedetectorref: ChangeDetectorRef,
        private platform: Platform,
        private routeroutlet: IonRouterOutlet,
        private storageService: StorageService,
        private insomnia: Insomnia) {
        this.user = this.storageuserdata.getUser();
        this.surveyid = +this.route.snapshot.paramMap.get('id');
        this.surveytype = this.route.snapshot.paramMap.get('type');
        this.surveycity = this.route.snapshot.paramMap.get('city');
        this.surveystate = this.route.snapshot.paramMap.get('state');
        this.latitude = +this.route.snapshot.paramMap.get('lat');
        this.longitude = +this.route.snapshot.paramMap.get('long');

        if (this.platform.is('ios')) {
            this.platformname = 'iphone'
        } else if (this.platform.is('android')) {
            this.platformname = 'android'
        } else {
            this.platformname = 'other'
        }

        this.platform.backButton.subscribeWithPriority(100, () => {
            if (!this.isSaveFormCalled) {
                this.handleSurveyExit();
                navController.pop();
            }
        });

        if (this.surveytype == 'battery') {
            this.batterySurveyProcess();
        } else if (this.surveytype == 'pvbattery') {
            this.pvBatterySurveyProcess();
        } else if (this.surveytype == 'pv') {
            this.pvSurveyProcess();
        }
    }

    pvSurveyProcess() {
        this.pvForm = new FormGroup({
            existingsolarsystem: new FormControl('', [Validators.required]),
            batterysystem: new FormControl('', [Validators.required]),
            detailsofbatterysystem: new FormControl('', []),
            interconnection: new FormControl('', [Validators.required]),
            interconnection_input: new FormControl('', []),
            servicefeedsource: new FormControl('', [Validators.required]),
            mainbreakersize: new FormControl('', [Validators.required]),
            msprating: new FormControl('', [Validators.required]),
            msplocation: new FormControl('', [Validators.required]),
            mspbreaker: new FormControl('', [Validators.required]),
            architecturaldesign: new FormControl('', []),
            utilitymeter: new FormControl('', [Validators.required]),
            framing: new FormControl('', [Validators.required]),
            framingsize: new FormControl('', [Validators.required]),
            distancebetweentworafts: new FormControl('', [Validators.required]),
            pvinverterlocation: new FormControl('', []),
            invertermanufacturerandmodel: new FormControl('', []),
            additionalnotes: new FormControl('', []),
            rooftilt: new FormControl('', []),
            dimensionA: new FormControl('', []),
            dimensionB: new FormControl('', []),
            shotname: new FormControl('', [])
        });

        this.activeForm = this.pvForm;
        this.activeFormKeysMap = {
            existingsolarsystem: 'Existing Solar System',
            batterysystem: 'Battery System',
            detailsofbatterysystem: 'Details of Battery System',
            interconnection: 'Interconnection',
            interconnection_input: 'Interconnection Name',
            servicefeedsource: 'Service Feed Source',
            mainbreakersize: 'Main Breaker Size',
            msprating: 'MSP Rating',
            msplocation: 'MSP Location',
            mspbreaker: 'MSP Breaker',
            architecturaldesign: 'Architectural Design',
            utilitymeter: 'Utility Meter',
            framing: 'Framing',
            framingsize: 'Framing Size',
            distancebetweentworafts: 'Distance between Two Rafts',
            pvinverterlocation: 'PV Inverter Location',
            invertermanufacturerandmodel: 'PV Inverter Manufacturer and Model',
            additionalnotes: 'Additional Notes',
            rooftilt: 'Roof Tilt',
            shotname: 'Shot Name'
        };

        // this.storage.clear();
        this.storage.get(this.surveyid + '').then((data: SurveyStorageModel) => {
            console.log(data);
            if (data) {
                this.mainmenuitems = data.menuitems;
                this.totalpercent = data.currentprogress;
                this.selectedmainmenuindex = data.selectedmainmenuindex;
                this.selectedsubmenuindex = data.selectedsubmenuindex;
                this.selectedshotindex = data.selectedshotindex;
                this.shotcompletecount = data.shotcompletecount;
                this.previousmainmenuindex = data.previousmainmenuindex;
                this.previoussubmenuindex = data.previoussubmenuindex;
                this.previousshotindex = data.previousshotindex;

                this.surveyid = data.surveyid;
                this.surveytype = data.surveytype;
                this.surveycity = data.city;
                this.surveystate = data.state;
                this.latitude = data.latitude;
                this.longitude = data.longitude;

                // restore form
                Object.keys(data.formdata).forEach((key: string) => {
                    let control: AbstractControl = null;
                    control = this.activeForm.get(key);
                    control.setValue(data.formdata[key]);
                });

                this.isdataloaded = true;
                this.setTotalStepCount();

                this.handleViewModeSwitch();
            } else {
                this.http
                    .get('assets/surveyprocessjson/pv.json')
                    // tslint:disable-next-line:no-shadowed-variable
                    .subscribe((data) => {
                        this.mainmenuitems = JSON.parse(JSON.stringify(data));
                        this.originalmainmenuitems = JSON.parse(JSON.stringify(data));
                        this.isdataloaded = true;

                        this.mainmenuitems.forEach(element => {
                            if (element.isactive) {
                                this.selectedmainmenuindex = this.mainmenuitems.indexOf(element);
                            }
                        });
                        this.setTotalStepCount();
                    });
            }
        });
        this.getSiteLocationGoogleImageFromService();
    }

    setTotalStepCount() {
        let totalSteps = 0;
        this.mainmenuitems.map(mainmenuitem => {
            mainmenuitem.children.map(child => {
                totalSteps += child.shots.length;
            });
        });
        this.totalstepcount = totalSteps;
    }

    batterySurveyProcess() {
        this.totalstepcount = 16;
        this.batteryForm = new FormGroup({
            modulemake: new FormControl('', [Validators.required]),
            modulemodel: new FormControl('', [Validators.required]),
            invertermake: new FormControl('', [Validators.required]),
            invertermodel: new FormControl('', [Validators.required]),
            numberofmodules: new FormControl('', [Validators.required]),
            additionalnotes: new FormControl('', []),
            batterybackup: new FormControl('', [Validators.required]),
            servicefeedsource: new FormControl('', [Validators.required]),
            mainbreakersize: new FormControl('', [Validators.required]),
            msprating: new FormControl('', [Validators.required]),
            msplocation: new FormControl('', [Validators.required]),
            mspbreaker: new FormControl('', [Validators.required]),
            utilitymeter: new FormControl('', [Validators.required]),
            utility: new FormControl('', [Validators.required]),
            pvinverterlocation: new FormControl('', [Validators.required]),
            pvmeter: new FormControl('', [Validators.required]),
            acdisconnect: new FormControl('', [Validators.required]),
            interconnection: new FormControl('', [Validators.required]),
            shotname: new FormControl('', [])
        });

        this.activeForm = this.batteryForm;

        // this.storage.clear();
        this.storage.get(this.surveyid + '').then((data: SurveyStorageModel) => {
            if (data) {
                this.mainmenuitems = data.menuitems;
                this.totalpercent = data.currentprogress;
                this.selectedmainmenuindex = data.selectedmainmenuindex;
                this.selectedsubmenuindex = data.selectedsubmenuindex;
                this.selectedshotindex = data.selectedshotindex;
                this.shotcompletecount = data.shotcompletecount;
                this.previousmainmenuindex = data.previousmainmenuindex;
                this.previoussubmenuindex = data.previoussubmenuindex;
                this.previousshotindex = data.previousshotindex;

                this.surveyid = data.surveyid;
                this.surveytype = data.surveytype;
                this.surveycity = data.city;
                this.surveystate = data.state;
                this.latitude = data.latitude;
                this.longitude = data.longitude;

                // restore form
                Object.keys(data.formdata).forEach((key: string) => {
                    let control: AbstractControl = null;
                    control = this.activeForm.get(key);
                    control.setValue(data.formdata[key]);
                });

                this.isdataloaded = true;

                this.handleViewModeSwitch();

                this.activeForm.get('invertermake').valueChanges.subscribe(val => {
                    this.getInverterModels(this.activeForm.get('invertermake').value.id);
                });

                this.activeForm.get('modulemake').valueChanges.subscribe(val => {
                    this.getSolarModels(this.activeForm.get('modulemake').value.id);
                });
            } else {
                this.http
                    .get('assets/surveyprocessjson/battery.json')
                    .subscribe((data) => {
                        this.mainmenuitems = JSON.parse(JSON.stringify(data));
                        this.isdataloaded = true;

                        this.mainmenuitems.forEach(element => {
                            if (element.isactive) {
                                this.selectedmainmenuindex = this.mainmenuitems.indexOf(element);
                            }
                        });

                        this.activeForm.get('invertermake').valueChanges.subscribe(val => {
                            this.getInverterModels(this.activeForm.get('invertermake').value.id);
                        });

                        this.activeForm.get('modulemake').valueChanges.subscribe(val => {
                            this.getSolarModels(this.activeForm.get('modulemake').value.id);
                        });
                    });
            }
        });

        this.getSiteLocationGoogleImageFromService();
    }

    pvBatterySurveyProcess() {
        this.totalstepcount = 13;
        this.pvbatteryForm = new FormGroup({
            msplocation: new FormControl('', [Validators.required]),
            msprating: new FormControl('', [Validators.required]),
            mainbreakersize: new FormControl('', [Validators.required]),
            mspbreaker: new FormControl('', [Validators.required]),
            utilitymeter: new FormControl('', [Validators.required]),
            framing: new FormControl('', [Validators.required]),
            framingsize: new FormControl('', [Validators.required]),
            distancebetweentworafts: new FormControl('', [Validators.required]),
            utility: new FormControl('', [Validators.required]),
            batterybackup: new FormControl('', [Validators.required]),
            servicefeedsource: new FormControl('', [Validators.required]),
            interconnection: new FormControl('', [Validators.required]),
            mountingtype: new FormControl('', [Validators.required]),
            rooftype: new FormControl('', [Validators.required]),
            roofmaterial: new FormControl('', [Validators.required]),
            shotname: new FormControl('', []),
            additionalnotes: new FormControl('', [])
        });

        this.activeForm = this.pvbatteryForm;

        // this.storage.clear();
        this.storage.get(this.surveyid + '').then((data: SurveyStorageModel) => {
            if (data) {
                this.mainmenuitems = data.menuitems;
                this.totalpercent = data.currentprogress;
                this.selectedmainmenuindex = data.selectedmainmenuindex;
                this.selectedsubmenuindex = data.selectedsubmenuindex;
                this.selectedshotindex = data.selectedshotindex;
                this.shotcompletecount = data.shotcompletecount;
                this.previousmainmenuindex = data.previousmainmenuindex;
                this.previoussubmenuindex = data.previoussubmenuindex;
                this.previousshotindex = data.previousshotindex;

                this.surveyid = data.surveyid;
                this.surveytype = data.surveytype;
                this.surveycity = data.city;
                this.surveystate = data.state;
                this.latitude = data.latitude;
                this.longitude = data.longitude;

                // restore form
                Object.keys(data.formdata).forEach((key: string) => {
                    let control: AbstractControl = null;
                    control = this.activeForm.get(key);
                    control.setValue(data.formdata[key]);
                });

                this.isdataloaded = true;

                this.handleViewModeSwitch();
            } else {
                this.http
                    .get('assets/surveyprocessjson/pvbattery.json')
                    .subscribe((data) => {
                        this.mainmenuitems = JSON.parse(JSON.stringify(data));
                        this.isdataloaded = true;

                        this.mainmenuitems.forEach(element => {
                            if (element.isactive) {
                                this.selectedmainmenuindex = this.mainmenuitems.indexOf(element);
                            }
                        });
                    });
            }
        });

        this.getSiteLocationGoogleImageFromService();
    }

    formatDateInBackendFormat() {
        const d = new Date()
        const ye = new Intl.DateTimeFormat('en', {year: 'numeric'}).format(d)
        const mo = new Intl.DateTimeFormat('en', {month: '2-digit'}).format(d)
        const da = new Intl.DateTimeFormat('en', {day: '2-digit'}).format(d)

        return (`${ye}-${mo}-${da}`)
    }

    ngOnInit() {

        this.routeroutlet.swipeGesture = false;
        // camera options (Size and location). In the following example, the preview uses the rear camera and display the preview in the back of the webview
        this.startCameraWithOpts();
    }

    startCameraWithOpts() {
        this.cameraPreviewOpts = {
            x: 0,
            y: 0,
            width: window.screen.width,
            height: window.screen.height,
            camera: 'rear',
            tapPhoto: true,
            tapToFocus: true,
            previewDrag: true,
            toBack: true,
            alpha: 1
        }

        this.startCamera();

        setTimeout(() => {
            this.cameraPreview.getMaxZoom().then((value) => {
                this.maxzoom = value;
                if (this.maxzoom > 5) {
                    this.maxzoom = 5;
                }
            }, (error) => {
            });
        }, 2000);
    }

    ngOnDestroy() {
        this.stopCamera();
    }

    getUtilities() {
        this.utilitieservice.showLoading('Loading').then(() => {
            this.apiService.getUtilities().subscribe(response => {
                this.utilitieservice.hideLoading().then(() => {
                    this.utilities = response;
                    this.changedetectorref.detectChanges();
                });

            }, responseError => {
                this.utilitieservice.hideLoading().then(() => {
                    const error: ErrorModel = responseError.error;
                    this.utilitieservice.errorSnackBar(error.message[0].messages[0].message);
                });

            });
        });
    }

    getRoofMaterials() {
        this.utilitieservice.showLoading('Loading').then(() => {
            this.apiService.getRoofMaterials().subscribe(response => {
                this.utilitieservice.hideLoading().then(() => {
                    this.roofmaterials = response;
                    this.changedetectorref.detectChanges();
                });

            }, responseError => {
                this.utilitieservice.hideLoading().then(() => {
                    const error: ErrorModel = responseError.error;
                    this.utilitieservice.errorSnackBar(error.message[0].messages[0].message);
                });
            });
        });
    }

    getInverterModels(selectedmakeid: string) {
        this.utilitieservice.showLoading('Getting inverter models').then((success) => {
            this.apiService.getInverterMade(selectedmakeid).subscribe(response => {
                this.utilitieservice.hideLoading();
                this.invertermodels = response;
            }, responseError => {
                this.utilitieservice.hideLoading();
                const error: ErrorModel = responseError.error;
                this.utilitieservice.errorSnackBar(error.message[0].messages[0].message);
            });
        });
    }

    getInverterMakes() {
        this.utilitieservice.showLoading('Loading').then(() => {
            this.apiService.getInverterMake().subscribe(response => {
                this.utilitieservice.hideLoading().then(() => {
                    this.invertermakes = response;
                    this.changedetectorref.detectChanges();
                });
            }, responseError => {
                this.utilitieservice.hideLoading().then(() => {
                    const error: ErrorModel = responseError.error;
                    this.utilitieservice.errorSnackBar(error.message[0].messages[0].message);
                });
            });
        });
    }

    getSolarModels(selectedsolarmakeid: number) {
        this.utilitieservice.showLoading('Getting solar models').then((success) => {
            this.apiService.getSolarMade(selectedsolarmakeid).subscribe(response => {
                this.utilitieservice.hideLoading().then(() => {
                    this.solarmodels = response;
                });
            }, responseError => {
                this.utilitieservice.hideLoading().then(() => {
                    const error: ErrorModel = responseError.error;
                    this.utilitieservice.errorSnackBar(error.message[0].messages[0].message);
                });
            });
        });
    }

    getSolarMakes() {
        this.utilitieservice.showLoading('Loading').then(() => {
            this.apiService.getSolarMake().subscribe(response => {
                this.utilitieservice.hideLoading().then(() => {
                    this.solarmakes = response;
                    this.changedetectorref.detectChanges();
                    this.getUtilities();
                });
            }, responseError => {
                this.utilitieservice.hideLoading().then(() => {
                    const error: ErrorModel = responseError.error;
                    this.utilitieservice.errorSnackBar(error.message[0].messages[0].message);
                });
            });
        });
    }

    dragEnded(event: CdkDragEnd, item: Equipment) {
        item.enabled = false;
        item.event = event;
    }

    reverttoOriginalPosition(item: Equipment) {
        item.event.source.element.nativeElement.style.transform = 'none'; // visually reset element to its origin
        const source: any = item.event.source;
        source._passiveTransform = {x: 0, y: 0};
        item.enabled = true;
    }

    toggleSidebar(isopen: boolean) {
        this.isgallerymenucollapsed = true;
        this.issidemenucollapsed = isopen;
    }

    toggleGallerybar(isopen: boolean) {
        this.issidemenucollapsed = true;
        this.isgallerymenucollapsed = isopen;
    }

    toggleMainMenuSelection(index) {
        this.issidemenucollapsed = true;
        this.isgallerymenucollapsed = true;

        // Retaining previous state
        this.previousmainmenuindex = this.selectedmainmenuindex;
        this.previoussubmenuindex = this.selectedsubmenuindex;
        this.previousshotindex = this.selectedshotindex;

        // Set questionstatus true for question type 5
        if (this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].capturedshots.length > 0 && this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].questiontype == this.QuestionTypes.INPUT_SHOT_NAME) {
            this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].questionstatus = true;
            this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].ispending = false;
        }

        // Unset previous menu and select new one
        this.mainmenuitems[this.selectedmainmenuindex].isactive = false;
        this.selectedmainmenuindex = index;
        this.mainmenuitems[this.selectedmainmenuindex].isactive = true;

        if (this.mainmenuitems[this.selectedmainmenuindex].children.length > 0) {
            let issubmenuset = false;
            this.mainmenuitems[this.selectedmainmenuindex].children.forEach(element => {
                if (element.ispending && !issubmenuset) {
                    element.isactive = true;
                    issubmenuset = true;
                    this.selectedsubmenuindex = this.mainmenuitems[this.selectedmainmenuindex].children.indexOf(element);
                    let isshotmenuset = false;
                    element.shots.forEach(shot => {
                        if (shot.ispending && !isshotmenuset) {
                            shot.isactive = true;
                            isshotmenuset = true
                            this.selectedshotindex = element.shots.indexOf(shot);
                        }
                    });
                }
            });
        }

        this.handleViewModeSwitch();
    }

    toggleSubMenuSelection(index) {
        this.issidemenucollapsed = true;
        this.isgallerymenucollapsed = true;
        this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].isactive = false;
        this.selectedsubmenuindex = index;
        this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].isactive = true;
        this.selectedshotindex = 0;
    }

    startCamera() {
        if (this.hardwareCameraEnabled) {
            this.diagnostic.requestCameraAuthorization(true).then((mode) => {
                switch (mode) {
                    case this.diagnostic.permissionStatus.NOT_REQUESTED:
                        this.showCameraDenied();
                        break;
                    case this.diagnostic.permissionStatus.DENIED_ALWAYS:
                        this.showCameraDenied();
                        break;
                    case this.diagnostic.permissionStatus.DENIED_ONCE:
                        this.showCameraDenied();
                        break;
                    case this.diagnostic.permissionStatus.GRANTED:
                        this.startCameraAfterPermission();
                        break;
                    case 'authorized_when_in_use':
                        this.startCameraAfterPermission();
                        break;
                }
            }, (error) => {

            });
        } else {
            this.startCameraAfterPermission();
        }
    }

    async showCameraDenied() {
        const alert = await this.alertController.create({
            header: 'Error',
            subHeader: 'Camera permission denied',
            buttons: [
                {
                    text: 'OK',
                    handler: () => {
                        this.navController.navigateRoot('homepage');
                    }
                }
            ],
            backdropDismiss: false
        });
        await alert.present();
    }

    startCameraAfterPermission() {
        if (this.hardwareCameraEnabled) {
            this.cameraPreview.startCamera(this.cameraPreviewOpts).then(
                (res) => {

                },
                (err) => {
                });
        } else {
        }
    }

    stopCamera() {
        if (this.hardwareCameraEnabled) {
            this.cameraPreview.stopCamera().then(result => {
            });
        }
    }

    switchCamera() {
        this.cameraPreview.switchCamera();
    }

    changeFlashMode(flashmode) {
        this.cameraPreview.setFlashMode(flashmode);
        this.displayflashrow = !this.displayflashrow;
    }

    changeZoom() {
        if (this.currentzoom < this.maxzoom) {
            this.currentzoom = this.currentzoom + 1;
        } else {
            this.currentzoom = 1;
        }
        this.cameraPreview.setZoom(this.currentzoom);
    }

    takePicture() {
        this.issidemenucollapsed = true;
        this.isgallerymenucollapsed = true;
        if (this.hardwareCameraEnabled && this.iscapturingallowed) {
            this.cameraPreview.takePicture({
                width: 0,
                height: 0,
                quality: 0
            }).then((photo) => {
                    this.capturedImage = 'data:image/png;base64,' + photo;
                    const currentIndex = this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex];
                    if (!currentIndex.allowmultipleshots) {
                        const captureshot: CAPTUREDSHOT = {
                            menuindex: this.selectedmainmenuindex,
                            submenuindex: this.selectedsubmenuindex,
                            shotindex: this.selectedshotindex,
                            shotimage: this.capturedImage,
                            imagekey: currentIndex.shots[this.selectedshotindex].imagekey,
                            imagename: currentIndex.shots[this.selectedshotindex].imagename
                        }
                        currentIndex.capturedshots.push(captureshot);
                    } else {
                        const captureshot: CAPTUREDSHOT = {
                            menuindex: this.selectedmainmenuindex,
                            submenuindex: this.selectedsubmenuindex,
                            shotindex: this.selectedshotindex,
                            shotimage: this.capturedImage,
                            imagekey: currentIndex.shots[this.selectedshotindex].imagekey,
                            imagename: currentIndex.shots[this.selectedshotindex].imagename + (currentIndex.capturedshots.length + 1)
                        }
                        currentIndex.capturedshots.push(captureshot);
                    }
                    currentIndex.shots[this.selectedshotindex].shotstatus = true;
                    if (currentIndex.shots[this.selectedshotindex].questiontype != QUESTIONTYPE.NONE) {
                        if (!currentIndex.shots[this.selectedshotindex].questionstatus) {
                            currentIndex.shots[this.selectedshotindex].promptquestion = true;
                            this.iscapturingallowed = false;
                            if (currentIndex.shots[this.selectedshotindex].questiontype === QUESTIONTYPE.INPUT_UTILITIES_AUTOCOMPLETE) {
                                this.getUtilities();
                            } else if (currentIndex.shots[this.selectedshotindex].questiontype === QUESTIONTYPE.INPUT_INVERTER_AUTOCOMPLETE) {
                                this.getInverterMakes();
                            } else if (currentIndex.shots[this.selectedshotindex].questiontype === QUESTIONTYPE.INPUT_ROOF_MATERIAL_AUTOCOMPLETE) {
                                this.getRoofMaterials();
                            }
                        } else {
                            this.markShotCompletion(this.selectedshotindex);
                        }
                    } else {
                        if (!currentIndex.allowmultipleshots) {
                            currentIndex.shots[this.selectedshotindex].questionstatus = true;
                            this.handleMenuSwitch();
                        } else {
                            if (!currentIndex.shots[this.selectedshotindex].questionstatus) {
                                currentIndex.shots[this.selectedshotindex].questionstatus = true;
                                this.markShotCompletion(this.selectedshotindex);
                                this.updateProgressStatus();
                            }
                        }
                    }
                },
                (error) => {

                }
            );
        } else {
        }
    }

    architecturalfiles(event) {
        for (let i = 0; i < event.target.files.length; i++) {
            this.archFiles.push(event.target.files[i])
        }
    }

    handleAnswerSubmission(result) {
        this.iscapturingallowed = true;
        this.issidemenucollapsed = true;
        this.isgallerymenucollapsed = true;
        const currentIndex = this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex];
        this.activeForm.get(currentIndex.shots[this.selectedshotindex].inputformcontrol).setValue(result);
        currentIndex.shots[this.selectedshotindex].result = result;
        currentIndex.shots[this.selectedshotindex].promptquestion = false;
        currentIndex.shots[this.selectedshotindex].questionstatus = true;

        if (this.surveytype == 'pvbattery' && this.selectedmainmenuindex == 1 && this.selectedsubmenuindex == 0 && this.selectedshotindex == 0) {
            this.handleGroundShotsVisibility();
        } else if (this.surveytype == 'pvbattery' && this.selectedmainmenuindex == 1 && this.selectedsubmenuindex == 0 && this.selectedshotindex == 1) {
            this.handleAtticSectionVisibility();
        }

        this.handleMenuSwitch();
    }

    handleGroundShotsVisibility() {
        const mountingtypecontrol = this.activeForm.get('mountingtype');
        if (mountingtypecontrol.value == 'both' || mountingtypecontrol.value == 'ground') {
            this.mainmenuitems[this.selectedmainmenuindex].children[1].isvisible = true;
            this.mainmenuitems[this.selectedmainmenuindex].children[1].ispending = true;
            this.mainmenuitems[this.selectedmainmenuindex].children[1].shots[0].ispending = true;
            this.mainmenuitems[this.selectedmainmenuindex].children[1].shots[0].shotstatus = false;
        } else {
            this.mainmenuitems[this.selectedmainmenuindex].children[1].isvisible = false;
            this.mainmenuitems[this.selectedmainmenuindex].children[1].ispending = false;
            this.mainmenuitems[this.selectedmainmenuindex].children[1].shots[0].ispending = false;
            this.mainmenuitems[this.selectedmainmenuindex].children[1].shots[0].shotstatus = true;
        }
    }

    handleAtticSectionVisibility() {
        const mountingtypecontrol = this.activeForm.get('rooftype');
        if (mountingtypecontrol.value == 'both' || mountingtypecontrol.value == 'pitch') {
            this.mainmenuitems[2].isvisible = true;
            this.mainmenuitems[2].ispending = true;
            this.mainmenuitems[2].children[0].ispending = true;
            this.mainmenuitems[2].children[0].shots.forEach(element => {
                element.ispending = true;
                element.questionstatus = false;
                element.shotstatus = false;
            });
            this.activeForm.get('framing').setValidators([Validators.required]);
            this.activeForm.get('framingsize').setValidators([Validators.required]);
            this.activeForm.get('distancebetweentworafts').setValidators([Validators.required]);
        } else {
            this.mainmenuitems[2].isvisible = false;
            this.mainmenuitems[2].ispending = false;
            this.mainmenuitems[2].children[0].ispending = false;
            this.mainmenuitems[2].children[0].shots.forEach(element => {
                element.ispending = false;
                element.questionstatus = true;
                element.shotstatus = true;
            });
            this.activeForm.get('framing').clearValidators();
            this.activeForm.get('framingsize').clearValidators();
            this.activeForm.get('distancebetweentworafts').clearValidators();
        }
    }

    handleInputSubmission(form: FormGroup) {
        const currentIndex = this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex];
        const control = form.get(currentIndex.shots[this.selectedshotindex].inputformcontrol);
        if (currentIndex.shots[this.selectedshotindex].questiontype === QUESTIONTYPE.INPUT_TWO_DIMENSIONS) {
            console.log('------------------------------------------');
            console.log(form.get('dimensionA').value);
            console.log(form.get('dimensionB').value);
            console.log(form.get('dimensionA').value != '' && form.get('dimensionB').value != '');
            console.log('------------------------------------------');
            if (form.get('dimensionA').value != '' && form.get('dimensionB').value != '') {
                this.handleAnswerSubmission(`${form.get('dimensionA').value}x${form.get('dimensionB').value}`);
                form.get('dimensionA').setValue('');
                form.get('dimensionB').setValue('');
            } else {
                control.markAsTouched();
                control.markAsDirty();
            }
        } else {
            if (control.value != '') {
                this.handleAnswerSubmission(control.value);
            } else {
                control.markAsTouched();
                control.markAsDirty();
            }
        }
    }

    handleInputTextSubmission(form: FormGroup) {
        const currentIndex = this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex];
        const control = form.get(currentIndex.shots[this.selectedshotindex].inputformcontrol);
        if (control.value != '') {
            this.handleAnswerSubmission(control.value);
        } else {
            control.markAsTouched();
            control.markAsDirty();
        }
    }

    handleShotNameSubmission(form: FormGroup) {
        const shotnameformcontrol = form.get('shotname');
        if (shotnameformcontrol.value != '') {
            const currentIndex = this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex];
            const shots = currentIndex.capturedshots;
            shots[shots.length - 1].imagename = shotnameformcontrol.value;
            this.iscapturingallowed = true;
            this.issidemenucollapsed = true;
            this.isgallerymenucollapsed = true;
            currentIndex.shots[this.selectedshotindex].promptquestion = false;
            form.get('shotname').setValue('');

            if (currentIndex.capturedshots.length == 1) {
                currentIndex.ispending = false;
                this.mainmenuitems[this.selectedmainmenuindex].ispending = false;
                this.updateProgressStatus();
            }
        } else {
            shotnameformcontrol.markAsTouched();
            shotnameformcontrol.markAsDirty();
        }
    }

    handleInverterFieldsSubmission() {
        const invertermakecontrol = this.activeForm.get('invertermake');
        const invertermodelcontrol = this.activeForm.get('invertermodel');
        if (invertermakecontrol.value != '' && invertermodelcontrol.value != '') {
            const currentIndex = this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex];
            currentIndex.shots[this.selectedshotindex].promptquestion = false;
            currentIndex.shots[this.selectedshotindex].questionstatus = true;
            this.handleMenuSwitch();
        } else {
            invertermakecontrol.markAsTouched();
            invertermakecontrol.markAsDirty();
            invertermodelcontrol.markAsTouched();
            invertermodelcontrol.markAsDirty();
        }
    }

    handleUtilitySubmission() {
        const utilitycontrol = this.activeForm.get('utility');
        if (utilitycontrol.value != '') {
            const currentIndex = this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex];
            currentIndex.shots[this.selectedshotindex].promptquestion = false;
            currentIndex.shots[this.selectedshotindex].questionstatus = true;
            this.handleMenuSwitch();
        } else {
            utilitycontrol.markAsTouched();
            utilitycontrol.markAsDirty();
        }
    }

    handleRoofMaterialSubmission() {
        const roofmaterialcontrol = this.activeForm.get('roofmaterial');
        if (roofmaterialcontrol.value != '') {
            const currentIndex = this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex];
            currentIndex.allowmultipleshots = true;
            currentIndex.shots[this.selectedshotindex].promptquestion = false;
            currentIndex.shots[this.selectedshotindex].questionstatus = true;
            this.handleMenuSwitch();
        } else {
            roofmaterialcontrol.markAsTouched();
            roofmaterialcontrol.markAsDirty();
        }
    }

    handleSurveyExit() {
        this.cameraPreview.stopCamera();
        this.stopCamera();

        const data = this.preparesurveystorage();
        data.saved = true;
        this.storage.set(this.surveyid + '', data);

        if (this.user.role.type == 'surveyors') {

            this.utilitieservice.setDataRefresh(true);
            this.navController.navigateBack('surveyoroverview');
        } else {
            this.utilitieservice.sethomepageSurveyRefresh(true);
            this.navController.navigateBack('/homepage/survey');
        }
    }

    preparesurveystorage(): SurveyStorageModel {
        const surveyStorageModel = new SurveyStorageModel();
        surveyStorageModel.menuitems = this.mainmenuitems;
        surveyStorageModel.currentprogress = this.totalpercent;
        surveyStorageModel.formdata = this.activeForm.value;
        surveyStorageModel.selectedmainmenuindex = this.selectedmainmenuindex;
        surveyStorageModel.selectedsubmenuindex = this.selectedsubmenuindex;
        surveyStorageModel.selectedshotindex = this.selectedshotindex;
        surveyStorageModel.shotcompletecount = this.shotcompletecount;
        surveyStorageModel.previousmainmenuindex = this.previousmainmenuindex;
        surveyStorageModel.previoussubmenuindex = this.previoussubmenuindex;
        surveyStorageModel.previousshotindex = this.previousshotindex;

        surveyStorageModel.surveyid = this.surveyid;
        surveyStorageModel.surveytype = this.surveytype;
        surveyStorageModel.city = this.surveycity;
        surveyStorageModel.state = this.surveystate;
        surveyStorageModel.latitude = this.latitude;
        surveyStorageModel.longitude = this.longitude;

        return surveyStorageModel;
    }

    handleExistence(doesexist: boolean) {
        this.issidemenucollapsed = true;
        this.isgallerymenucollapsed = true;
        this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].isexistencechecked = true;
        if (doesexist) {
            this.activeForm.get(this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].inputformcontrol).setValue(true);
            this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots = this.originalmainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots;
        } else {
            this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots.forEach(element => {
                element.ispending = false;
                element.shotstatus = true;
                element.questionstatus = true;
                this.updateProgressStatus();
            });
            this.activeForm.get(this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].inputformcontrol).setValue(false);
            this.handleMenuSwitch(false);
        }
    }

    handleMenuSwitch(selectedSubMenuDoesNotExist?) {
        this.iscapturingallowed = true;

        // Retaining previous shots
        this.previousmainmenuindex = this.selectedmainmenuindex;
        this.previoussubmenuindex = this.selectedsubmenuindex;
        this.previousshotindex = this.selectedshotindex;

        if (!this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].allowmultipleshots) {
            this.markShotCompletion(this.selectedshotindex);
            this.updateProgressStatus();
            if (this.selectedshotindex < this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots.length - 1 && selectedSubMenuDoesNotExist != false) {
                this.selectedshotindex += 1;
            } else {
                if (this.selectedsubmenuindex < this.mainmenuitems[this.selectedmainmenuindex].children.length - 1) {
                    this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].isactive = false;
                    let nextvisibleitemfound = false;
                    for (let index = this.selectedsubmenuindex; index < this.mainmenuitems[this.selectedmainmenuindex].children.length - 1; index++) {
                        const element = this.mainmenuitems[this.selectedmainmenuindex].children[index + 1];
                        if (element.isvisible && !nextvisibleitemfound) {
                            nextvisibleitemfound = true;
                            this.selectedsubmenuindex = index + 1;
                            this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].isactive = true;
                            this.selectedshotindex = 0;
                            this.scrollToSubmenuElement(this.selectedsubmenuindex);
                        }
                    }

                    if (!nextvisibleitemfound) {
                        if (this.selectedmainmenuindex < this.mainmenuitems.length - 1) {
                            // Unset previous menu and select new one
                            this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].isactive = false;
                            this.mainmenuitems[this.selectedmainmenuindex].isactive = false;
                            let nextvisiblemainitemfound = false;
                            for (let index = this.selectedmainmenuindex; index < this.mainmenuitems.length - 1; index++) {
                                const element = this.mainmenuitems[index + 1];
                                if (element.isvisible && !nextvisiblemainitemfound) {
                                    nextvisiblemainitemfound = true;
                                    this.selectedmainmenuindex = index + 1;
                                    this.mainmenuitems[this.selectedmainmenuindex].isactive = true;
                                    this.selectedshotindex = 0;
                                    this.selectedsubmenuindex = 0;
                                    this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].isactive = true;
                                    this.scrollToMainmenuElement(this.selectedmainmenuindex);
                                    this.handleViewModeSwitch();
                                }
                            }
                        }
                    }
                } else {
                    if (this.selectedmainmenuindex < this.mainmenuitems.length - 1) {
                        // Unset previous menu and select new one
                        this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].isactive = false;
                        this.mainmenuitems[this.selectedmainmenuindex].isactive = false;
                        let nextvisiblemainitemfound = false;
                        for (let index = this.selectedmainmenuindex; index < this.mainmenuitems.length - 1; index++) {
                            const element = this.mainmenuitems[index + 1];
                            if (element.isvisible && !nextvisiblemainitemfound) {
                                nextvisiblemainitemfound = true;
                                this.selectedmainmenuindex = index + 1;
                                this.mainmenuitems[this.selectedmainmenuindex].isactive = true;
                                this.selectedshotindex = 0;
                                this.selectedsubmenuindex = 0;
                                this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].isactive = true;
                                this.scrollToMainmenuElement(this.selectedmainmenuindex);
                                this.handleViewModeSwitch();
                            }
                        }

                        if (!nextvisiblemainitemfound) {

                        }
                    }
                }
            }
        } else {
            if (this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].capturedshots.length > 0) {
                this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].questionstatus = true;
                this.markShotCompletion(this.selectedshotindex);
                this.updateProgressStatus();
            }
        }
    }

    scrollToSubmenuElement(index) {
        const el = document.getElementById('submenu' + index);
        const rect = el.getBoundingClientRect();
        // scrollLeft as 0px, scrollTop as "topBound"px, move in 800 milliseconds

        this.submenuscroll.nativeElement.scrollLeft = rect.left;
    }

    scrollToMainmenuElement(index) {
        const el = document.getElementById('mainmenu' + index);
        const rect = el.getBoundingClientRect();
        // scrollLeft as 0px, scrollTop as "topBound"px, move in 800 milliseconds

        this.mainscroll.nativeElement.scrollLeft = rect.left;
    }

    markShotCompletion(index) {
        if (this.mainmenuitems[this.selectedmainmenuindex].children.length > 0) {
            if (this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[index].shotstatus && this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[index].questionstatus) {
                this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[index].ispending = false;

                let ispendingset = false;
                this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].ispending = false;
                this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots.forEach(element => {
                    if (element.ispending && !ispendingset) {
                        ispendingset = true;
                        this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].ispending = true;
                    }
                });

                this.markMainMenuCompletion();
            }
        } else {
            this.markMainMenuCompletion();
        }
    }

    markMainMenuCompletion() {
        let ispendingset = false;
        if (this.mainmenuitems[this.selectedmainmenuindex].children.length > 0) {
            this.mainmenuitems[this.selectedmainmenuindex].ispending = false;
            this.mainmenuitems[this.selectedmainmenuindex].children.forEach(element => {
                if (element.ispending && !ispendingset) {
                    ispendingset = true;
                    this.mainmenuitems[this.selectedmainmenuindex].ispending = true;
                }
            });
        } else {
            this.mainmenuitems[this.selectedmainmenuindex].ispending = false;
        }
    }

    updateProgressStatus() {
        this.shotcompletecount += 1;
        this.totalpercent = (this.shotcompletecount / this.totalstepcount);
    }

    checkProcessCompletion(): boolean {
        let ispendingset = false;
        let checkstatus = true;
        this.mainmenuitems.forEach(element => {
            if (element.ispending && !ispendingset) {
                ispendingset = true;
                checkstatus = false;
                this.preparePendingItemsList();
            }
        });
        return checkstatus;
    }

    preparePendingItemsList() {
        this.pendingmenuitems = [];
        for (let mainindex = 0; mainindex < this.mainmenuitems.length; mainindex++) {
            const element = this.mainmenuitems[mainindex];

            if (element.ispending) {
                if (element.children.length > 0) {
                    const menu: PENDING_MENU = {
                        index: mainindex,
                        pendingchilds: [],
                        name: element.name
                    }
                    for (let childindex = 0; childindex < element.children.length; childindex++) {
                        const child = element.children[childindex];
                        if (child.ispending) {
                            if (child.shots.length > 0) {
                                const childitem: PENDING_CHILD = {
                                    index: childindex,
                                    pendingshots: [],
                                    name: child.name
                                }
                                for (let shotindex = 0; shotindex < child.shots.length; shotindex++) {
                                    const shot = child.shots[shotindex];
                                    if (shot.ispending) {
                                        const shotitem: PENDING_SHOT = {
                                            index: shotindex,
                                            name: shot.shotinfo
                                        }
                                        childitem.pendingshots.push(shotitem);
                                    }
                                }
                                menu.pendingchilds.push(childitem);
                            } else {
                                const childitem: PENDING_CHILD = {
                                    index: childindex,
                                    pendingshots: [],
                                    name: child.name
                                }
                                menu.pendingchilds.push(childitem);
                            }
                        }
                    }
                    this.pendingmenuitems.push(menu);
                } else {
                    const menu: PENDING_MENU = {
                        index: mainindex,
                        pendingchilds: [],
                        name: element.name
                    }
                    this.pendingmenuitems.push(menu);
                }
            }
        }
    }

    handleCompleteSurveyDataSubmission() {
        // Code to save current status
        const data = this.preparesurveystorage();
        data.saved = true;
        this.storage.set(this.surveyid + '', data);
        this.utilitieservice.setDataRefresh(true);
        this.reviewFormData();
        if (this.activeForm.status == 'INVALID') {
            this.displayIncompleteFormAlert();
        }
    }

    saveFormData() {
        const data = {
            modulemake: this.batteryForm.get('modulemake').value.id,
            modulemodel: this.batteryForm.get('modulemodel').value.id,
            invertermake: this.batteryForm.get('invertermake').value.name,
            invertermodel: this.batteryForm.get('invertermodel').value.name,
            numberofmodules: parseInt(this.batteryForm.get('numberofmodules').value),
            additionalnotes: this.batteryForm.get('additionalnotes').value,
            batterybackup: this.batteryForm.get('batterybackup').value,
            servicefeedsource: this.batteryForm.get('servicefeedsource').value,
            mainbreakersize: parseInt(this.batteryForm.get('mainbreakersize').value),
            msprating: parseInt(this.batteryForm.get('msprating').value),
            msplocation: this.batteryForm.get('msplocation').value,
            mspbreaker: this.batteryForm.get('mspbreaker').value,
            utilitymeter: this.batteryForm.get('utilitymeter').value,
            utility: this.selectedutilityid,
            pvinverterlocation: this.batteryForm.get('pvinverterlocation').value,
            pvmeter: JSON.parse(this.batteryForm.get('pvmeter').value),
            acdisconnect: JSON.parse(this.batteryForm.get('acdisconnect').value),
            interconnection: this.batteryForm.get('interconnection').value,
            status: 'surveycompleted'
        }
        this.apiService.updateSurveyForm(data, this.surveyid).subscribe((data) => {
            this.utilitieservice.hideLoading().then(() => {
                this.insomnia.keepAwake()
                    .then(
                        () => {
                            console.log('success')
                        },
                        () => console.log('error')
                    );
                this.uploadImagesToServer();

            });
        }, (error) => {
            this.utilitieservice.hideLoading().then(() => {
                this.utilitieservice.errorSnackBar(JSON.stringify(error));
            });
        });
    }

    handleReviewFormBack() {
        this.reviewForm = false;
        this.startCameraAfterPermission();
        this.selectedmainmenuindex = this.previousmainmenuindex;
        this.selectedsubmenuindex = this.previoussubmenuindex;
        this.selectedshotindex = this.previousshotindex;
        this.mainmenuitems[this.selectedmainmenuindex].viewmode = this.previousviewmode;
        this.mainmenuitems[this.selectedmainmenuindex].isactive = true;
        this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].isactive = true;
    }

    reviewFormData() {
        this.reviewForm = true;
        this.cameraPreview.stopCamera();
        this.previousviewmode = this.mainmenuitems[this.selectedmainmenuindex].viewmode;
        this.previousmainmenuindex = this.selectedmainmenuindex;
        this.previoussubmenuindex = this.selectedsubmenuindex;
        this.previousshotindex = this.selectedshotindex;
        this.mainmenuitems[this.selectedmainmenuindex].viewmode = VIEWMODE.FORM;
    }

    savePVFormData() {
        this.utilitieservice.showLoading('Please wait...');
        const data = {
            existingsolarsystem: this.pvForm.get('existingsolarsystem').value,
            batterysystem: this.pvForm.get('batterysystem').value,
            detailsofbatterysystem: this.pvForm.get('detailsofbatterysystem').value,
            interconnection: this.pvForm.get('interconnection').value,
            interconnectiondetails: this.pvForm.get('interconnection_input').value,
            servicefeedsource: this.pvForm.get('servicefeedsource').value,
            additionalnotes: this.pvForm.get('additionalnotes').value,
            status: 'surveycompleted',
            mainbreakersize: this.pvForm.get('mainbreakersize').value,
            msprating: this.pvForm.get('msprating').value,
            msplocation: this.pvForm.get('msplocation').value,
            mspbreaker: this.pvForm.get('mspbreaker').value,
            architecturaldesign: this.pvForm.get('architecturaldesign').value,
            utilitymeter: this.pvForm.get('utilitymeter').value,
            framing: this.pvForm.get('framing').value,
            framingsize: this.pvForm.get('framingsize').value,
            distancebetweentworafts: this.pvForm.get('distancebetweentworafts').value,
            pvinverterlocation: this.pvForm.get('pvinverterlocation').value == '' ? null : this.pvForm.get('pvinverterlocation').value,
            invertermanufacturerandmodel: this.pvForm.get('invertermanufacturerandmodel').value == '' ? null : this.pvForm.get('invertermanufacturerandmodel').value,
            rooftilt: this.pvForm.get('rooftilt').value,
            shotname: this.pvForm.get('shotname').value,

        }

        this.apiService.updateSurveyForm(data, this.surveyid).subscribe((data) => {

            this.utilitieservice.hideLoading().then(() => {
                this.insomnia.keepAwake()
                    .then(
                        () => {
                            console.log('success')
                        },
                        () => console.log('error')
                    );
                this.uploadImagesToServer();
            });
        }, (error) => {
            this.utilitieservice.hideLoading().then(() => {
                console.log(error);
                // this.utilitieservice.errorSnackBar(JSON.stringify(error));
                this.utilitieservice.errorSnackBar('There was some error in processing the request');
            });
        });
    }

    savePVBatteryFormData() {
        const data = {
            msplocation: this.activeForm.get('msplocation').value,
            msprating: parseInt(this.activeForm.get('msprating').value),
            mainbreakersize: parseInt(this.activeForm.get('mainbreakersize').value),
            mspbreaker: this.activeForm.get('mspbreaker').value,
            utilitymeter: this.activeForm.get('utilitymeter').value,
            framing: this.activeForm.get('framing').value,
            framingsize: this.activeForm.get('framingsize').value,
            distancebetweentworafts: this.activeForm.get('distancebetweentworafts').value,
            utility: this.selectedutilityid,
            batterybackup: this.activeForm.get('batterybackup').value,
            servicefeedsource: this.activeForm.get('servicefeedsource').value,
            interconnection: this.activeForm.get('interconnection').value,
            mountingtype: this.activeForm.get('mountingtype').value,
            rooftype: this.activeForm.get('rooftype').value,
            roofmaterial: this.activeForm.get('roofmaterial').value.id,
            additionalnotes: this.activeForm.get('additionalnotes').value,
            status: 'surveycompleted'
        }
        this.apiService.updateSurveyForm(data, this.surveyid).subscribe((data) => {
            this.utilitieservice.hideLoading().then(() => {
                this.insomnia.keepAwake()
                    .then(
                        () => {
                            console.log('success')
                        },
                        () => console.log('error')
                    );
                this.uploadImagesToServer();

            });
        }, (error) => {
            this.utilitieservice.hideLoading().then(() => {
                this.utilitieservice.errorSnackBar(JSON.stringify(error));
            });
        });
    }

    async displayIncompleteFormAlert() {
        let error = '';
        Object.keys(this.activeForm.controls).forEach((key: string) => {
            const control: AbstractControl = this.activeForm.get(key);
            if (control.invalid) {
                if (error !== '') {
                    error = error + '<br/>';
                }
                if (control.errors.required === true) {
                    error = error + 'Input for field ' + this.activeFormKeysMap[key] + ' is missing.';
                }
                if (control.errors.email === true) {
                    error = error + 'Invalid email';
                }
                if (control.errors.error !== null && control.errors.error !== undefined) {
                    error = error + control.errors.error;
                }
                if (control.errors.pattern !== null && control.errors.pattern !== undefined) {
                    error = error + 'Invalid pattern for field ' + this.activeFormKeysMap[key] + '. Use the specified pattern only';
                }
            }
        });
        this.utilitieservice.showAlert(error);
    }

    async displayAlertForRemainingShots() {
        const alert = await this.alertController.create({
            header: 'Incomplete',
            subHeader: 'Please check list of pending items and try submitting the survey once all required information is filled.',
            buttons: [
                {
                    text: 'VIEW PENDING ITEMS',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        this.viewpendingitems = true;
                        this.ispendingitemsmode = true;
                        this.cameraPreview.stopCamera();
                        this.previousviewmode = this.mainmenuitems[this.selectedmainmenuindex].viewmode;
                        this.previousmainmenuindex = this.selectedmainmenuindex;
                        this.previoussubmenuindex = this.selectedsubmenuindex;
                        this.previousshotindex = this.selectedshotindex;
                        this.mainmenuitems[this.selectedmainmenuindex].viewmode = VIEWMODE.NONE;
                    }
                }
            ],
            backdropDismiss: false
        });
        await alert.present();
    }

    saveForm() {
        if (this.activeForm.status == 'INVALID') {
            this.displayIncompleteFormAlert();
        } else {
            this.isSaveFormCalled = true;
            this.markMainMenuCompletion();
            if (!this.checkProcessCompletion()) {
                this.displayAlertForRemainingShots();
                return;
            }
            if (this.surveytype == 'pv') {
                this.savePVFormData();
            } else {
                let isutilitymanualinput = false;
                if (this.activeForm.get('utility').value == null || this.activeForm.get('utility').value == '') {
                    if (this.utility.manualinput != '') {
                        isutilitymanualinput = true;
                        this.activeForm.get('utility').setValue(this.utility.manualinput);
                    }
                }
                this.utilitieservice.showLoading('Saving Survey').then(() => {
                    // const isutilityfound = this.utilities.some(el => el.name === this.batteryForm.get("utility").value.name);
                    if (isutilitymanualinput) {
                        const data = {
                            name: this.utility.manualinput,
                            source: this.platformname,
                            lastused: this.formatDateInBackendFormat(),
                            city: this.surveycity,
                            state: this.surveystate,
                            addedby: this.storageService.getUserID()
                        }
                        this.apiService.addUtility(data).subscribe((data) => {
                            this.selectedutilityid = data.id;
                            if (this.surveytype == 'battery') {
                                this.saveFormData();
                            } else if (this.surveytype == 'pvbattery') {
                                this.savePVBatteryFormData();
                            }
                        }, (error) => {
                            this.utilitieservice.hideLoading().then(() => {
                                this.utilitieservice.errorSnackBar(JSON.stringify(error));
                            });
                        });
                    } else {
                        this.selectedutilityid = this.activeForm.get('utility').value.id;
                        if (this.surveytype == 'battery') {
                            this.saveFormData();
                        } else if (this.surveytype == 'pvbattery') {
                            this.savePVBatteryFormData();
                        }
                    }
                });
            }
        }
    }

    uploadImagesToServer() {
        const imagesArray = [];
        this.mainmenuitems.forEach(mainmenu => {
            mainmenu.children.forEach(child => {
                child.capturedshots.forEach(shot => {
                    imagesArray.push(shot);
                });
            });
        });

        if (this.equipmentscanvasimage && this.equipmentscanvasimage !== '') {
            const captureshot: CAPTUREDSHOT = {
                menuindex: -1,
                submenuindex: -1,
                shotindex: imagesArray.length + 1,
                shotimage: this.equipmentscanvasimage,
                imagekey: 'electricalslocation',
                imagename: 'electricalslocation'
            }
            imagesArray.push(captureshot);
        }

        this.utilitieservice.showLoading('Uploading Images').then(() => {
            this.totalimagestoupload = imagesArray.length;
            this.uploadImageByIndex(imagesArray);
        });
    }

    uploadImageByIndex(mapOfImages) {
        console.log(mapOfImages);

        if (mapOfImages.length > 0 && mapOfImages.length <= this.totalimagestoupload) {
            const imageToUpload = mapOfImages[0];
            console.log(imageToUpload);
            if (imageToUpload.shotimage) {
                const blob = this.utilitieservice.getBlobFromImageData(imageToUpload.shotimage);
                let filename = '';
                if (imageToUpload.imagename === '') {
                    filename = Date.now().toString() + '.png';
                } else {
                    filename = imageToUpload.imagename + '.png';
                }
                this.utilitieservice.setLoadingMessage('Uploading image ' + this.imageuploadindex + ' of ' + this.totalimagestoupload);
                this.apiService.uploadImage(this.surveyid, imageToUpload.imagekey, blob, filename).subscribe((data) => {
                    this.imageuploadindex++;
                    mapOfImages.splice(0, 1);
                    this.uploadImageByIndex(mapOfImages);
                }, (error) => {
                    this.imageuploadindex++;
                    mapOfImages.splice(0, 1);
                    this.uploadImageByIndex(mapOfImages);
                });
            } else {
                this.imageuploadindex++;
                mapOfImages.splice(0, 1);
                this.uploadImageByIndex(mapOfImages);
            }
        } else {
            this.utilitieservice.hideLoading().then(() => {
                this.utilitieservice.showSuccessModal('Survey has been Submitted').then((modal) => {
                    modal.present();
                    modal.onWillDismiss().then((dismissed) => {
                        this.storage.remove('' + this.surveyid);
                        if (this.user.role.type == 'surveyors') {
                            this.utilitieservice.sethomepageSurveyRefresh(true);
                            this.navController.navigateRoot('surveyoroverview');
                        } else {
                            this.utilitieservice.sethomepageSurveyRefresh(true);
                            this.navController.navigateRoot('homepage/survey');
                        }
                        this.insomnia.allowSleepAgain()
                            .then(
                                () => console.log('success'),
                                () => console.log('error')
                            );
                    });
                });
            });
        }
    }

    handleViewModeSwitch() {
        if (this.mainmenuitems[this.selectedmainmenuindex].viewmode == VIEWMODE.CAMERA) {
            this.startCameraAfterPermission();
        } else if (this.mainmenuitems[this.selectedmainmenuindex].viewmode == VIEWMODE.FORM) {
            this.cameraPreview.stopCamera();
            if (this.surveytype == 'battery') {
                this.getSolarMakes();
            } else if (this.surveytype == 'pvbattery') {
                this.getUtilities();
            }
        } else if (this.mainmenuitems[this.selectedmainmenuindex].viewmode == VIEWMODE.MAP) {
            this.cameraPreview.stopCamera();
            if (JSON.parse(this.activeForm.get('acdisconnect').value)) {
                this.equipments.splice(0, 0, this.acdisconnectequipment);
            }
            if (JSON.parse(this.activeForm.get('pvmeter').value)) {
                this.equipments.splice(1, 0, this.pvmeterequipment);
            }
        }
    }

    handlePendingItemsSwitch() {
        this.preparePendingItemsList();
        if (this.pendingmenuitems.length > 0) {
            this.ispendingitemsmode = true;
        } else {
            this.ispendingitemsmode = false;
        }
        this.viewpendingitems = true;
        this.cameraPreview.stopCamera();
        this.previousviewmode = this.mainmenuitems[this.selectedmainmenuindex].viewmode;
        this.previousmainmenuindex = this.selectedmainmenuindex;
        this.previoussubmenuindex = this.selectedsubmenuindex;
        this.previousshotindex = this.selectedshotindex;
        this.mainmenuitems[this.selectedmainmenuindex].viewmode = VIEWMODE.NONE;
    }

    handlePendingItemsBack() {
        this.viewpendingitems = false;
        this.startCameraAfterPermission();
        this.selectedmainmenuindex = this.previousmainmenuindex;
        this.selectedsubmenuindex = this.previoussubmenuindex;
        this.selectedshotindex = this.previousshotindex;
        this.mainmenuitems[this.selectedmainmenuindex].viewmode = this.previousviewmode;
        this.mainmenuitems[this.selectedmainmenuindex].isactive = true;
        this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].isactive = true;
    }

    handlePendingShotClick(menuindex: number, childindex: number, shotindex: number) {
        this.mainmenuitems[this.previousmainmenuindex].isactive = false;
        this.mainmenuitems[this.previousmainmenuindex].viewmode = this.previousviewmode;
        if (this.mainmenuitems[this.previousmainmenuindex].children.length > 0) {
            this.mainmenuitems[this.previousmainmenuindex].children[this.previoussubmenuindex].isactive = false;
        }
        this.viewpendingitems = false;
        this.startCameraAfterPermission();
        this.selectedmainmenuindex = menuindex;
        this.selectedsubmenuindex = childindex;
        this.selectedshotindex = shotindex;
        this.mainmenuitems[this.selectedmainmenuindex].isactive = true;
        if (this.mainmenuitems[this.selectedmainmenuindex].children.length > 0) {
            this.mainmenuitems[this.selectedmainmenuindex].children[childindex].isactive = true;
        }
    }

    handleEquipmentMarkingBack() {
        this.startCameraAfterPermission();
        this.mainmenuitems[this.selectedmainmenuindex].isactive = false;
        this.selectedmainmenuindex = this.previousmainmenuindex;
        this.selectedsubmenuindex = this.previoussubmenuindex;
        this.selectedshotindex = this.previousshotindex;
        this.mainmenuitems[this.selectedmainmenuindex].isactive = true;
    }

    handleEquipmentMarkingSave() {
        this.handleCanvasImageSaveOfMap();
    }

    getSiteLocationGoogleImageFromService() {
        this.apiService.getGoogleImage(this.latitude,
            this.longitude).subscribe(data => {
            this.createImageFromBlob(data);
        }, error => {
            console.log(error);
        });
    }

    createImageFromBlob(image: Blob) {
        const reader = new FileReader();
        if (image) {
            reader.readAsDataURL(image);
        }
        reader.onloadend = (e) => {
            this.sitelocationimage = reader.result;
        };
    }

    handleCanvasImageSaveOfMap() {
        const canvasarea = document.getElementById('canvasarea');
        if (this.platform.is('ios')) {
            html2canvas(canvasarea, {
                width: this.platform.width(),
                height: this.platform.height(),
                scrollX: 0,
                scrollY: 0,
                x: 0
            }).then(canvas => {
                this.equipmentscanvasimage = canvas.toDataURL('image/jpeg');
                this.updateProgressStatus();
                this.markShotCompletion(this.selectedshotindex);
                this.startCameraAfterPermission();
                this.mainmenuitems[this.selectedmainmenuindex].isactive = false;
                this.selectedmainmenuindex = this.previousmainmenuindex;
                this.selectedsubmenuindex = this.previoussubmenuindex;
                this.selectedshotindex = this.previousshotindex;
                this.mainmenuitems[this.selectedmainmenuindex].isactive = true;
            });
        } else {
            domtoimage.toPng(canvasarea)
                .then((dataUrl) => {
                    this.equipmentscanvasimage = dataUrl;
                    this.updateProgressStatus();
                    this.markShotCompletion(this.selectedshotindex);
                    this.startCameraAfterPermission();
                    this.mainmenuitems[this.selectedmainmenuindex].isactive = false;
                    this.selectedmainmenuindex = this.previousmainmenuindex;
                    this.selectedsubmenuindex = this.previoussubmenuindex;
                    this.selectedshotindex = this.previousshotindex;
                    this.mainmenuitems[this.selectedmainmenuindex].isactive = true;
                })
                .catch((error) => {
                    console.error('oops, something went wrong!', error);
                });
        }
    }

    handleGalleryViewSwitch(shot: CAPTUREDSHOT) {
        this.stopCamera();
        this.isgallerymenucollapsed = true;
        this.issidemenucollapsed = true;
        this.previousviewmode = this.mainmenuitems[this.selectedmainmenuindex].viewmode;
        this.mainmenuitems[this.selectedmainmenuindex].viewmode = VIEWMODE.GALLERY;
        setTimeout(() => {
            const activeshot = this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].capturedshots.indexOf(shot);
            this.slider.slideTo(activeshot, 0);
        });
    }

    handleGalleryBack() {
        this.mainmenuitems[this.selectedmainmenuindex].viewmode = this.previousviewmode;
        this.startCameraAfterPermission();
    }

    handleShotDelete() {
        if (this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].capturedshots.length > 0) {
            if (this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].capturedshots.length == 1) {
                this.sliderIndex = 0;
            }
            this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].capturedshots.splice(this.sliderIndex, 1);
            const imagename = this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedmainmenuindex].capturedshots[this.sliderIndex].imagename;
            const shots = this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedmainmenuindex].shots;
            const filteredShot = shots.filter(shot => shot.imagename === imagename)[0];
            if (filteredShot.inputformcontrol != '') {
                this.activeForm[filteredShot.inputformcontrol].value = '';
            }
            this.slideDidChange();
        }
        if (this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].capturedshots.length == 0) {
            this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].shotstatus = false;
            if (this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].questiontype == QUESTIONTYPE.NONE) {
                this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].questionstatus = false;
            }
            this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].ispending = true;
            this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].ispending = true;

            this.handleGalleryBack();
        }
    }

    async slideDidChange(): Promise<void> {
        this.sliderIndex = await this.slider.getActiveIndex();
        return Promise.resolve();
    }

    handleFormBack() {
        this.mainmenuitems[this.selectedmainmenuindex].isactive = false;
        this.selectedmainmenuindex = this.previousmainmenuindex;
        this.selectedsubmenuindex = this.previoussubmenuindex;
        this.selectedshotindex = this.previousshotindex;
        this.mainmenuitems[this.selectedmainmenuindex].isactive = true;
        this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].isactive = true;
        this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].isactive = true;
        this.startCameraWithOpts();
    }

    changeBatterySystem() {
        this.hasBatterySystem = eval(this.pvForm.value.batterysystem);
        console.log(this.hasBatterySystem);
    }

    handleEditQuestionInput(childShot) {
        console.log(childShot);
    }
}
