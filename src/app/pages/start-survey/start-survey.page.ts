import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Diagnostic } from '@awesome-cordova-plugins/diagnostic/ngx';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@awesome-cordova-plugins/native-geocoder/ngx';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController, Animation, AnimationController, IonContent, IonInput, IonSlides, ModalController, NavController, Platform, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Subscription } from 'rxjs';
import { AutoCompleteComponent } from 'src/app/components/utilities/auto-complete/auto-complete.component';
import { AddressModel } from 'src/app/models/address.model';
import { ErrorModel } from 'src/app/models/error.model';
import { InverterMadeModel } from 'src/app/models/inverter-made.model';
import { InverterMakeModel } from 'src/app/models/inverter-make.model';
import { RoofMaterial } from 'src/app/models/roofmaterial.model';
import { SolarMadeModel } from 'src/app/models/solar-made.model';
import { SolarMake } from 'src/app/models/solar-make.model';
import { SurveyStorageModel } from 'src/app/models/survey-storage.model';
import { User } from 'src/app/models/user.model';
import { ApiService } from 'src/app/services/api/api.service';
import { BaseUrl } from 'src/app/services/constants';
import { CustomEventsService } from 'src/app/services/custom-events/custom-events.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { SurveyRequiredModelPage } from '../survey-required-model/survey-required-model.page';
import { AwsService } from "src/app/services/aws/aws.service";


export interface MAINMENU {
    name: string;
    isactive: boolean;
    ispending: boolean;
    isvisible: boolean;
    viewmode: number;
    visitedonce: boolean;
    children: CHILDREN[];
}

export interface CHILDREN {
    name: string;
    isactive: boolean;
    ispending: boolean;
    isvisible: boolean;
    checkexistence: boolean;
    isexistencechecked: boolean;
    existenceresult: boolean;
    inputformcontrol: string;
    placeholder?: string;
    shotscount: number;
    capturedshots: CAPTUREDSHOT[];
    shotscapturedcount: number;
    shots: SHOT[];
    formelements?: FORMELEMENTS[];
    requiredshotscount: number;
    capturedshotscount: number;
}

export interface SHOT {
    isactive: boolean;
    ispending: boolean;
    shotinfo: string;
    capturedshotinfo?: string;
    questioninfo: string;
    shotstatus: boolean;
    promptquestion: boolean;
    question: string;
    actions: string[];
    result: string;
    questionstatus: boolean;
    questiontype: QUESTIONTYPE;
    inputformcontrol: string[];
    placeholder?: string;
    imagekey: string;
    imagename: string;
    imagequality: number;
    imageuploadname: string;
    required: boolean;
    visitedonce: boolean;
    forminputfields: string[];
    formfieldvalidations: VALIDATION[];
}

export interface CAPTUREDSHOT {
    menuindex: number;
    submenuindex: number;
    shotindex: number;
    shotimage: string;
    imagekey: string;
    imagename: string;
    imageuploadname: string;
    imagecleared: boolean;
    uploadstatus: boolean;
}

export interface FORMELEMENTS {
    inputformcontrol: string;
    placeholder: string;
    label: string;
    visibility: boolean;
    controltype: CONTROLTYPE;
    options: any;
    controlselement: {
        inputformcontrol: string;
        onvalueselection: any;
    } | {};
    attachments: FILE_ATTACHMENTS[];
    fileurls: any;
    fileurlspostarray:any;
    required: boolean;
    formfieldvalidations: VALIDATION[];
}

export interface VALIDATION {
    minlength: number;
    maxlength: number;
    regextype: number;
}

export enum REGEXTYPE {
    NUMERIC = 0,
    ALPHANUMERIC = 1,
    ALLCHARACTERS = 2,
    MAKE = 3,
    MODEL = 4
}

export interface FILE_ATTACHMENTS {
    file: File;
    fileurl: any;
    uploadstatus: boolean;
    controlname: string;
}

export enum CONTROLTYPE {
    CONTROL_INPUT_TEXT = 1,
    CONTROL_INPUT_NUMBER = 2,
    CONTROL_INPUT_SELECT = 3,
    CONTROL_INPUT_AUTOCOMPLETE = 4,
    CONTROL_INPUT_RADIO = 5,
    CONTROL_INPUT_CHECKBOX = 6,
    CONTROL_INPUT_TEXTAREA = 7,
    CONTROL_MULTIPLE_FILE_UPLOAD = 8,
    CONTROL_SINGLE_FILE_UPLOAD = 9
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
    INPUT_MULTI_NUMBER = 8,
    INPUT_INVERTER_DETAILS = 9
}

export enum VIEWMODE {
    NONE = -1,
    CAMERA = 0,
    FORM = 1
}

export function getFileReader(): FileReader {
    const fileReader = new FileReader();
    const zoneOriginalInstance = (fileReader as any)["__zone_symbol__originalInstance"];
    return zoneOriginalInstance || fileReader;
}


@Component({
    selector: 'app-start-survey',
    templateUrl: './start-survey.page.html',
    styleUrls: ['./start-survey.page.scss'],
})
export class StartSurveyPage implements OnInit {
    @ViewChild('mainscroll', { static: false }) mainscroll: any;
    @ViewChild('submenuscroll', { static: false }) submenuscroll: any;
    @ViewChild('slideWithNav2', { static: false }) slideWithNav2: IonSlides;
    @ViewChild('infoslider', { static: false }) infoslider: IonSlides;
    @ViewChild('singlefileuploadinput') singlefileuploadinput: ElementRef;
    @ViewChild('multiplefileuploadinput') multiplefileuploadinput: ElementRef;
    @ViewChild('watermarkedimage') waterMarkImage: ElementRef;
    @ViewChild('utility', { static: false }) utility: AutoCompleteComponent;
    @ViewChild('roofmaterial', { static: false }) roofmaterial: AutoCompleteComponent;
    @ViewChild('invertermake', { static: false }) invertermake: AutoCompleteComponent;
    @ViewChild('invertermodel', { static: false }) invertermodel: AutoCompleteComponent;
    @ViewChild('content', { static: false }) content: IonContent;
    @ViewChild('questionTypeNumber', { static: false }) questionTypeNumber: IonInput;
    @ViewChild('questionTypeText', { static: false }) questionTypeText: IonInput;
    @ViewChild('questionInputShotName', { static: false }) questionInputShotName: IonInput;
    @ViewChild('questionInputMultiNumber', { static: false }) questionInputMultiNumber: IonInput;

    sliderTwo: any;

    slideOptsTwo = {
        initialSlide: 1,
        slidesPerView: 2,
        loop: true,
        centeredSlides: false,
        spaceBetween: 20
    };

    isBeginningSlide: true;
    isEndSlide: false;

    QuestionTypes = QUESTIONTYPE;
    ViewModes = VIEWMODE;
    ControlTypes = CONTROLTYPE;

    user: User;
    surveyid: number;
    surveytype: string;

    utilities: InverterMakeModel[] = [];
    selectedutilityid: number;
    invertermodels: InverterMadeModel[] = [];
    selectedinvertermodelid: number;
    invertermakes: InverterMakeModel[] = [];
    selectedinvertermakeid: number;
    solarmakes: SolarMake[] = [];
    solarmodels: SolarMadeModel[] = [];
    roofmaterials: RoofMaterial[] = [];
    selectedroofmaterialid: number;

    activeFormElementsArray;
    activeForm: FormGroup;

    isdataloaded = false;
    mainmenuitems: MAINMENU[];
    selectedmainmenuindex = 0;
    selectedsubmenuindex = 0;
    selectedshotindex = 0;
    nextfoundshotindex = 0;
    nextfoundchildindex = 0;
    nextfoundmainindex = 0;

    totalimagestoupload = 0;
    totalfilestoupload = 0;
    blurcaptureview = false;
    showinfodetailsview = false;
    isactivesteppending = true;
hash:any;

    infoslideoptions = {
        initialSlide: 0,
        speed: 400
    };

    //Progress Slider Values
    totalpercent = 0;
    shotcompletecount = 0;
    totalstepcount: number;
    remainingfilestoupload = 0;
    menuwidth = 0;
    submenuwidth = 0;
    cameraspaceremainingheight = 0;
    noviewremainingheight = 0;
    detailsviewremainingheight = 0;

    blobimagedata: any;

    latitude: any = 0; //latitude
    longitude: any = 0; //longitude

    fetchinvertermodels = true;
    platformname: string;
    surveycity: string = "";
    surveystate: string = "";

    invertermakesubscriptions: Subscription;

    filesarray: FILE_ATTACHMENTS[] = [];
    imagesArray: CAPTUREDSHOT[] = [];

    geoEncoderOptions: NativeGeocoderOptions = {
        useLocale: true,
        maxResults: 5
    };
    public valueforngif: boolean = true;
    public isShowKeyboard: boolean = false;
    public isLoaded: boolean = false;
    gallerywidth = 0;
    cameraspaceremainingheightroof =0;
    public numberOfroof: any = [];

    constructor(
        private datastorage: Storage,
        private storageuserdata: StorageService,
        private route: ActivatedRoute,
        private changedetectorref: ChangeDetectorRef,
        private utilitieservice: UtilitiesService,
        private apiService: ApiService,
        private animationCtrl: AnimationController,
        private http: HttpClient,
        private navController: NavController,
        private storage: Storage,
        public toastController: ToastController,
        private platform: Platform,
        private geolocation: Geolocation,
        private db: AngularFireDatabase,
        private alertCtrl: AlertController,
        private modalCtrl: ModalController,
        private nativeGeocoder: NativeGeocoder,
        private diagnostic: Diagnostic,
        // private s3Service: S3Service,
        private eventService: CustomEventsService,
        private uploadaws: AwsService,
        private router: Router
    ) {

        this.numberOfroof.push({
            buttonname:"Roof 1",
            isactive:true
        });
        this.utilitieservice.showLoading('Loading').then(() => {
            setTimeout(() => {
                this.isLoaded = true;
                this.utilitieservice.hideLoading().then(() => {
                    window.addEventListener('keyboardDidShow', () => {
                        console.log('keyboardDidShow');
                        this.valueforngif = false;
                        this.isShowKeyboard = true;
                        this.changedetectorref.detectChanges();
                    });

                    window.addEventListener('keyboardDidHide', () => {
                        console.log('keyboardDidHide');
                        this.valueforngif = true;
                        this.isShowKeyboard = false;
                        this.changedetectorref.detectChanges();
                    });

                    this.content.getScrollElement().then(scrollElement => {
                        this.menuwidth = this.platform.width() - 22;
                        this.submenuwidth = this.platform.width() - 22;
                        this.gallerywidth = this.platform.width() - 19;

                        this.cameraspaceremainingheight = scrollElement.clientHeight - 98 - 54 - 66;
                        this.cameraspaceremainingheightroof = scrollElement.clientHeight - 98 - 64 - 90;
                        this.noviewremainingheight = scrollElement.clientHeight - 66 - 54 - 60;
                        this.detailsviewremainingheight = scrollElement.clientHeight - 66 - 66 - 4;
                    });

                });
            }, 1000);
        });
        /* window.addEventListener('keyboardWillShow', (event) => {
             // Describe your logic which will be run each time when keyboard is about to be shown.
             this.valueforngif=false;
         });
         window.addEventListener('keyboardWillHide', () => {
             // Describe your logic which will be run each time when keyboard is about to be closed.
             this.valueforngif=true;
         });*/
    }

    ngOnInit() {
        console.log('this.platform.height()', this.platform.height());
        console.log('this.platform.width()', this.platform.width());

        try {
            // this.menuwidth = this.platform.width() - 22;
            // this.submenuwidth = this.platform.width() - 22;

            // this.cameraspaceremainingheight = this.platform.height() - 98 - 54 - 66;
            // this.noviewremainingheight = this.platform.height() - 66 - 54;
            // this.detailsviewremainingheight = this.platform.height() - 66 - 66 - 4;
            this.user = this.storageuserdata.getUser();
            this.surveyid = +this.route.snapshot.paramMap.get('id');
            this.surveytype = this.route.snapshot.paramMap.get('type');

            if (this.platform.is('ios')) {
                this.platformname = 'iphone';
            } else if (this.platform.is('android')) {
                this.platformname = 'android';
            } else {
                this.platformname = 'web';
            }
            console.log('this.activeForm', this.activeForm);
            if (this.activeForm) {
                this.activeForm.reset();
            }
            this.loadSurveyJSON('pvsurveyjson');
            this.loadLocalJSON();
            this.getdiagonstic();
           this.getCurrentCoordinates();
        } catch (error) {
            // console.log("ngOnInit---" + error);
        }
    }

    loadSurveyJSON(type) {
        this.datastorage.get(type).then((data) => {
            this.restoreSurveyStoredData(data[0].sequence);
        }).catch((error) => {
            // console.log('Error loading json', error);
            this.loadLocalJSON();
        });
    }

    loadLocalJSON() {
        this.http
            .get('assets/surveyprocessjson/pv.json')
            .subscribe((data) => {
                this.restoreSurveyStoredData(data[0].sequence);
            });
    }

    restoreSurveyStoredData(surveydata) {
        console.log('restoreSurveyStoredData(surveydata)', surveydata);

        this.changedetectorref.detectChanges();
        try {
            this.datastorage.get(this.user.id + '-' + this.surveyid).then((data: SurveyStorageModel) => {
                if (data) {
                    console.log('data.menuitems', data.menuitems);
                    this.mainmenuitems = data.menuitems;
                    this.selectedmainmenuindex = data.selectedmainmenuindex;
                    this.selectedsubmenuindex = data.selectedsubmenuindex;
                    this.selectedshotindex = data.selectedshotindex;
                    this.totalpercent = data.currentprogress;
                    this.shotcompletecount = data.shotcompletecount;

                    this.surveyid = data.surveyid;
                    this.surveytype = data.surveytype;

                    this.restoreStoredForm();

                    Object.keys(data.formdata).forEach((key: string) => {
                        let control: AbstractControl = null;
                        control = this.activeForm.get(key);
                        control.setValue(data.formdata[key]);
                    });

                    //Check for formelements fields visibility
                    this.mainmenuitems.forEach(mainelement => {
                        if (mainelement.viewmode == VIEWMODE.FORM) {
                            mainelement.children.forEach(childelement => {
                                if (childelement.formelements.length > 0) {
                                    childelement.formelements.forEach(formelement => {
                                        if (formelement.controltype == CONTROLTYPE.CONTROL_INPUT_RADIO) {
                                            this.toggleElementVisibility(formelement.inputformcontrol, formelement.controlselement);
                                        }
                                    });
                                }
                            });
                        }
                    });
                    this.isdataloaded = true;
                    this.changedetectorref.detectChanges();
                    this.setTotalStepCount();
                } else {
                    this.mainmenuitems = JSON.parse(JSON.stringify(surveydata));

                    this.mainmenuitems.forEach(element => {
                        if (element.isactive) {
                            this.selectedmainmenuindex = this.mainmenuitems.indexOf(element);
                        }
                    });
                    this.mainmenuitems[this.selectedmainmenuindex].visitedonce = true;
                    if (this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots.length > 0) {
                        this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].visitedonce = true;
                    }
                    this.createSurveyForm(surveydata);

                    this.isdataloaded = true;
                    this.setTotalStepCount();

                    this.changedetectorref.detectChanges();

                    // //Adding data to firebase for first time
                    // const surveysobjRef = this.db.object("surveys");
                    // var keyword = FIREBASE_DB_CONSTANTS.SURVEY_KEYWORD + this.surveyid;
                    // surveysobjRef.set(this.mainmenuitems);
                }
            });
        } catch (error) {
            // console.log("restoreSurveyStoredData---" + error);
        }
    }

    createSurveyForm(surveydata) {
        try {
            this.activeFormElementsArray = [];
            // let surveydata = data.sequence;
            const formData = {};
            surveydata.map((item, mainindex) => {
                if (item.children) {
                    item.children.map((child, childindex) => {
                        this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].requiredshotscount = 0;
                        this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].capturedshotscount = 0;
                        if (child.inputformcontrol[0] !== '') {
                            this.activeFormElementsArray.push(child.inputformcontrol[0]);
                            formData[child.inputformcontrol[0]] = new FormControl('', [Validators.required]);
                        }
                        if (child.shots) {
                            child.shots.map((shot, shotindex) => {
                                this.createcapturedshotofitem(shot, mainindex, childindex, shotindex);

                                if (shot.questiontype != QUESTIONTYPE.INPUT_MULTI_NUMBER) {
                                    shot.inputformcontrol.forEach((control, controlindex) => {
                                        this.activeFormElementsArray.push(control);
                                        this.addformfieldvalidations(shot.formfieldvalidations[controlindex], formData, control, shot.required)
                                    });
                                } else {
                                    if (shot.inputformcontrol[0] !== '') {
                                        this.activeFormElementsArray.push(shot.inputformcontrol[0]);
                                        if (shot.required) {
                                            formData[shot.inputformcontrol[0]] = new FormControl('', [Validators.required]);
                                        } else {
                                            formData[shot.inputformcontrol[0]] = new FormControl('', []);
                                        }
                                    }
                                    if (shot.forminputfields.length > 0) {
                                        shot.forminputfields.forEach((control, controlindex) => {
                                            this.addformfieldvalidations(shot.formfieldvalidations[controlindex], formData, control, shot.required)
                                        });
                                    }
                                }
                            });
                        }
                        if (child.formelements) {
                            child.formelements.map(formElement => {
                                formElement.fileurls = [];
                                formElement.fileurlspostarray = [];

                                formElement.attachments = [];
                                if (formElement.controltype != CONTROLTYPE.CONTROL_SINGLE_FILE_UPLOAD && formElement.controltype != CONTROLTYPE.CONTROL_MULTIPLE_FILE_UPLOAD) {
                                    this.activeFormElementsArray.push(formElement.inputformcontrol[0]);
                                }
                                this.addformfieldvalidations(formElement.formfieldvalidations[0], formData, formElement.inputformcontrol[0], formElement.required)
                            });
                        }
                    });
                }
            });
            formData['shotname'] = new FormControl('', []);
            this.activeFormElementsArray.push('shotname');
            this.activeForm = new FormGroup(formData);

            // console.log(this.activeForm);
        } catch (error) {
            // console.log("createSurveyForm---" + error);
        }
    }

    restoreStoredForm() {
        try {
            this.activeFormElementsArray = [];
            const formData = {};
            this.mainmenuitems.map(item => {
                if (item.children) {
                    item.children.map(child => {
                        if (child.inputformcontrol[0] !== '') {
                            this.activeFormElementsArray.push(child.inputformcontrol[0]);
                            formData[child.inputformcontrol[0]] = new FormControl('', [Validators.required]);
                        }
                        if (child.shots) {
                            child.shots.map(shot => {
                                if (shot.questiontype != QUESTIONTYPE.INPUT_MULTI_NUMBER) {
                                    shot.inputformcontrol.forEach((control, controlindex) => {
                                        this.activeFormElementsArray.push(control);
                                        this.addformfieldvalidations(shot.formfieldvalidations[controlindex], formData, control, shot.required)
                                    });
                                } else {
                                    if (shot.inputformcontrol[0] !== '') {
                                        this.activeFormElementsArray.push(shot.inputformcontrol[0]);
                                        if (shot.required) {
                                            formData[shot.inputformcontrol[0]] = new FormControl('', [Validators.required]);
                                        } else {
                                            formData[shot.inputformcontrol[0]] = new FormControl('', []);
                                        }
                                    }
                                    if (shot.forminputfields.length > 0) {
                                        shot.forminputfields.forEach((control, controlindex) => {
                                            this.addformfieldvalidations(shot.formfieldvalidations[controlindex], formData, control, shot.required)
                                        });
                                    }
                                }
                            });
                        }
                        if (child.formelements) {
                            child.formelements.map(formElement => {
                                formElement.fileurls = formElement.fileurls;
                                formElement.fileurlspostarray=formElement.fileurlspostarray;
                                formElement.attachments = formElement.attachments;
                                if (formElement.controltype != CONTROLTYPE.CONTROL_SINGLE_FILE_UPLOAD && formElement.controltype != CONTROLTYPE.CONTROL_MULTIPLE_FILE_UPLOAD) {
                                    this.activeFormElementsArray.push(formElement.inputformcontrol[0]);
                                }
                                this.addformfieldvalidations(formElement.formfieldvalidations[0], formData, formElement.inputformcontrol[0], formElement.required)
                            });
                        }

                        this.changedetectorref.detectChanges();
                    });
                }
            });
            formData['shotname'] = new FormControl('', []);
            this.activeFormElementsArray.push('shotname');
            this.activeForm = new FormGroup(formData);

            // console.log(this.activeForm);
        } catch (error) {
            // console.log("restoreStoredForm---" + error);
        }
    }

    createcapturedshotofitem(shot: SHOT, mainindex, childindex, shotindex) {
        const captureshot: CAPTUREDSHOT = {
            menuindex: mainindex,
            submenuindex: childindex,
            shotindex: shotindex,
            shotimage: '',
            imagekey: shot.imagekey,
            imagename: shot.imagename,
            imageuploadname: shot.imageuploadname,
            imagecleared: true,
            uploadstatus: false
        };

        this.mainmenuitems[mainindex].children[childindex].capturedshots.push(captureshot);
        if (shot.required) {
            this.mainmenuitems[mainindex].children[childindex].requiredshotscount += 1;
        }
    }

    addformfieldvalidations(validations, formData, control, isrequired) {
        if (control != "") {

           
            
            // console.log(control + "-----" + isrequired);
            if (validations != undefined && isrequired) {
                let regex = this.getFieldRegex(validations.regextype, validations.minlength, validations.maxlength);
                formData[control] = new FormControl('', Validators.compose([Validators.required, Validators.pattern(regex)]));
            } else if (validations != undefined && !isrequired) {
                let regex = this.getFieldRegex(validations.regextype, validations.minlength, validations.maxlength);
                formData[control] = new FormControl('', Validators.compose([Validators.pattern(regex)]));
            } else {
                if (isrequired) {
                    formData[control] = new FormControl('', [Validators.required]);
                } else {
                    formData[control] = new FormControl('', []);
                }
            }
        }
    }

    getFieldRegex(regextype, minlength, maxlength) {
        switch (regextype) {
            case REGEXTYPE.NUMERIC:
                return "^[0-9]{" + minlength + "," + maxlength + "}$";
            case REGEXTYPE.ALPHANUMERIC:
                return "^[a-zA-Z0-9]{" + minlength + "," + maxlength + "}$";
            case REGEXTYPE.ALLCHARACTERS:
                return "^.{" + minlength + "," + maxlength + "}$";
            case REGEXTYPE.MAKE:
                return "^[a-z0-9A-Z+-_([)/. {\\]}]{" + minlength + "," + maxlength + "}$";
            case REGEXTYPE.MODEL:
                return "^[a-z0-9A-Z+-_([)/. {\\]}]{" + minlength + "," + maxlength + "}$";
            default:
                return "^.{" + minlength + "," + maxlength + "}$";
        }
    }

    getErrorMessage(control: AbstractControl) {
        if (control.hasError("required")) {
            return "Field input is required";
        }

        if (control.hasError('pattern')) {
            let validations = this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].formfieldvalidations[0];
            switch (validations.regextype) {
                case REGEXTYPE.NUMERIC:
                    return "Field can have only numeric values and min: " + validations.minlength + " max: " + validations.maxlength + " length";
                case REGEXTYPE.ALPHANUMERIC:
                    return "Field cannot have any special characters and min: " + validations.minlength + " max: " + validations.maxlength + " length";
                case REGEXTYPE.ALLCHARACTERS:
                    return "Min: " + validations.minlength + " max: " + validations.maxlength + " length";
                case REGEXTYPE.MAKE:
                    return "Please enter valid format";
                case REGEXTYPE.MODEL:
                    return "Please enter valid format";
                default:
                    return "Min: " + validations.minlength + " max: " + validations.maxlength + " length";
            }
        }
    }

    getInputFormErrorMessage(control: AbstractControl, element: FORMELEMENTS) {
        if (control.hasError("required")) {
            return "Field input is required";
        }

        if (control.hasError('pattern')) {
            let validations = element.formfieldvalidations[0];
            switch (validations.regextype) {
                case REGEXTYPE.NUMERIC:
                    return "Field can have only numeric values and min: " + validations.minlength + " max: " + validations.maxlength + " length";
                case REGEXTYPE.ALPHANUMERIC:
                    return "Field cannot have any special characters and min: " + validations.minlength + " max: " + validations.maxlength + " length";
                case REGEXTYPE.ALLCHARACTERS:
                    return "Min: " + validations.minlength + " max: " + validations.maxlength + " length";
                case REGEXTYPE.MAKE:
                    return "Please enter valid format";
                case REGEXTYPE.MODEL:
                    return "Please enter valid format";
                default:
                    return "Min: " + validations.minlength + " max: " + validations.maxlength + " length";
            }
        }
    }

    preparesurveystorage(): SurveyStorageModel {
        this.getcountoffiletoupload();

        const surveyStorageModel = new SurveyStorageModel();
        surveyStorageModel.menuitems = this.mainmenuitems;
        surveyStorageModel.formdata = this.activeForm.value;
        surveyStorageModel.selectedmainmenuindex = this.selectedmainmenuindex;
        surveyStorageModel.selectedsubmenuindex = this.selectedsubmenuindex;
        surveyStorageModel.selectedshotindex = this.selectedshotindex;
        surveyStorageModel.currentprogress = this.totalpercent;
        surveyStorageModel.shotcompletecount = this.shotcompletecount;
        surveyStorageModel.remainingfilestoupload = this.remainingfilestoupload;

        surveyStorageModel.surveyid = this.surveyid;
        surveyStorageModel.surveytype = this.surveytype;

        return surveyStorageModel;
    }

    handleSurveyExit() {
        const data = this.preparesurveystorage();
        data.saved = true;
        this.storage.set(this.user.id + '-' + this.surveyid, data);

        if (this.user.role.type == 'surveyors') {
            this.utilitieservice.sethomepageSurveyRefresh(true);
            this.navController.navigateBack('surveyor-overview');
        } else {
            this.utilitieservice.sethomepageSurveyRefresh(true);
            this.navController.navigateBack('/home/survey');
        }
    }

    saveintermediatesurveydata() {
        const data = this.preparesurveystorage();
        data.saved = true;
        this.storage.set(this.user.id + '-' + this.surveyid, data);
    }

    // use geolocation to get user's device coordinates
    getCurrentCoordinates() {
        this.geolocation.getCurrentPosition().then((resp) => {
            this.latitude = resp.coords.latitude;
            this.longitude = resp.coords.longitude;
            console.log(this.latitude + "----" + this.longitude);
            let address = this.utilitieservice.getAddressFromLatLng(this.latitude, this.longitude);
            this.surveystate = address.state;
            this.surveycity = address.city;
        }).catch((error) => {
            // console.log('Error getting location', error);
        });
    }

    getcountoffiletoupload() {
        try {
            this.remainingfilestoupload = 0;
            this.mainmenuitems.forEach(mainmenu => {
                mainmenu.children.forEach(child => {
                    child.capturedshots.forEach(shot => {
                        if (!shot.imagecleared && !shot.uploadstatus) {
                            this.remainingfilestoupload += 1;
                        }
                    });
                });
            });

            this.mainmenuitems.forEach(mainmenu => {
                if (mainmenu.viewmode == VIEWMODE.FORM) {
                    mainmenu.children.forEach(child => {
                        if (child.formelements.length > 0) {
                            child.formelements.forEach(formelement => {
                                if (formelement.controltype == CONTROLTYPE.CONTROL_SINGLE_FILE_UPLOAD || formelement.controltype == CONTROLTYPE.CONTROL_MULTIPLE_FILE_UPLOAD) {
                                    formelement.attachments.forEach(attachment => {
                                        if (!attachment.uploadstatus) {
                                            this.remainingfilestoupload += 1;
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        } catch (error) {
            // console.log("getcountoffiletoupload---" + error);
        }
    }

    subscribeInverterMake() {
        this.invertermakesubscriptions = this.activeForm.get('invertermake').valueChanges.subscribe(val => {
            if (this.fetchinvertermodels) {
                if (val != "") {
                    this.getInverterModels(this.activeForm.get('invertermake').value.id);
                } else {
                    this.activeForm.get('invertermodel').setValue('');
                }
            }
        });
    }

    unsubscribeInverterMake() {
        this.invertermakesubscriptions.unsubscribe();
    }

    //------------------------------------------------------------------------------------------------------------------
    //Animation Methods
    //------------------------------------------------------------------------------------------------------------------

    animateElementOpacity(element) {
        setTimeout(() => {
            let opacityanimation: Animation = this.animationCtrl.create()
                .addElement(element)
                .duration(500)
                .easing('ease-in')
                .fromTo('opacity', '0', '1')
            opacityanimation.play();
        }, 10);
    }

    animateViewFromTop(element) {
        setTimeout(() => {
            let moveinanimation: Animation = this.animationCtrl.create()
                .addElement(element)
                .duration(600)
                .fromTo('transform', 'translateY(-150px)', 'translateY(0px)')
            moveinanimation.play();
        }, 10);
    }

    //------------------------------------------------------------------------------------------------------------------
    // File Selection Methods
    //------------------------------------------------------------------------------------------------------------------

   /* addselectedfiles(ev, formelementindex) {

        console.log('formelementindex',formelementindex);
        console.log('event',ev);
        try {
            for (let i = 0; i < ev.target.files.length; i++) {
                let reader = getFileReader();
                reader.onload = (e: any) => {
                    // console.log(ev.target.files[i]);
                    var fileobjurl = '/assets/icon/file.png';
                    if (ev.target.files[i].name.includes('.png') || ev.target.files[i].name.includes('.jpeg') || ev.target.files[i].name.includes('.jpg') || ev.target.files[i].name.includes('.gif')) {
                        fileobjurl = e.target.result;
                    }
                    // var object = this.getfileobject(ev.target.files[i]);
                    const selectedfile: FILE_ATTACHMENTS = {
                        file: ev.target.files[i],
                        fileurl: fileobjurl,
                        uploadstatus: false,
                        controlname: this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].formelements[formelementindex].inputformcontrol[0]
                    };
                    this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].formelements[formelementindex].fileurls.push(fileobjurl);
                    this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].formelements[formelementindex].attachments.push(selectedfile);
                    this.saveintermediatesurveydata();
                }
                reader.readAsDataURL(ev.target.files[i]);
            }
        } catch (error) {
            // console.log("addselectedfiles---" + error);
        }
    }
*/


 //------------------------------------------------------------------------------------------------------------------
    // File Selection Methods
    //------------------------------------------------------------------------------------------------------------------

    addselectedfiles(event, formelementindex) {
        try {

            console.log('event',event);
            this.utilitieservice.showLoading("Processing").then(() => {

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
                                    this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].formelements[formelementindex].fileurlspostarray.push(replacedfile);
                                    this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].formelements[formelementindex].fileurlspostarray.forEach(
                                        (item) => {
                                            if (item.name == replacedfile.name)
                                                item["isImage"] = true
                                        }
                                    );
                                    setTimeout(() => {
                                        this.changedetectorref.detectChanges();
                                    }, 300);
                                    this.changedetectorref.detectChanges();
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
    
                        const mimetype = this.utilitieservice.getMimetype(extension);
                        // window.console.log(extension, mimetype);
                        const data = new Blob([element], {
                            type: mimetype,
                        });
    
                        const replacedfile = new File([data], element.name, {
                            type: mimetype,
                        });
                        //this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].formelements[formelementindex].fileurlspostarray.push(replacedfile);
                        const selectedfile: FILE_ATTACHMENTS = {
                            file: event.addedFiles[index],                       
                            fileurl: replacedfile,
                            uploadstatus: false,
                            controlname: this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].formelements[formelementindex].inputformcontrol[0]
                        };
                        this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].formelements[formelementindex].attachments.push(selectedfile);

                    }
                }
                let date = new Date();
                this.hash = date.getTime();
                console.log('att');


                this.uploadaws
                .fileEvent(
                    event.addedFiles[index],
                    "survey/" + this.surveyid
                )
                .then((res) => {

                    console.log('res', res);
                    if (res.url) {
                        let postData = {
                            name: event.addedFiles[index].name,
                            ext: "." + event.addedFiles[index].name.split(".").reverse()[0],
                            mime: event.addedFiles[index].type,
                            hash: res.timestamp,
                            size: event.addedFiles[index].size,
                            path: "survey/" + this.surveyid,
                            provider: "aws-s3",
                            url: res.url,
                            field: this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].formelements[formelementindex].inputformcontrol[0],
                            order: index + 1,
                            ref: "survey",
                            refId: this.surveyid,
                            height: res.height,
                            width: res.width,
                        };
                        this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].formelements[formelementindex].fileurls.push(postData);

                        console.log('fileurlspostarray', this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].formelements[formelementindex].fileurls);
                        uploadedfiles = uploadedfiles + 1;
                        if (uploadedfiles == event.addedFiles.length) {
                            this.utilitieservice.hideLoading();
                            this.changedetectorref.detectChanges();
                        }
                    } else {
                       
                        this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].formelements[formelementindex].fileurls.splice(
                            this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].formelements[formelementindex].fileurls.indexOf(event.addedFiles[index]),
                            1
                        );
                        // that.attachmentpostarray.splice(index, 1);
                        if (this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].formelements[formelementindex].fileurlspostarray.length === this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].formelements[formelementindex].fileurls.length) {
                            this.utilitieservice.hideLoading();
                             this.changedetectorref.detectChanges();
                        }
                        if (this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].formelements[formelementindex].fileurls.length == 0) {
                            //this.architecturalFileUpload = false;
                        }
                        this.changedetectorref.detectChanges();
                    }
                });


              /*  

                let reader = getFileReader();
                reader.onload = (e: any) => {
                    // console.log(event.addedFiles[index]);
                    var fileobjurl = '/assets/icon/file.png';
                    if (event.addedFiles[index].name.includes('.png') || event.addedFiles[index].name.includes('.jpeg') || event.addedFiles[index].name.includes('.jpg') || event.addedFiles[index].name.includes('.gif')) {
                        fileobjurl = e.target.result;
                    }
                    // var object = this.getfileobject(event.addedFiles[index]);
                    const selectedfile: FILE_ATTACHMENTS = {
                        file: event.addedFiles[index],
                        fileurl: fileobjurl,
                        uploadstatus: false,
                        controlname: this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].formelements[formelementindex].inputformcontrol[0]
                    };
                    this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].formelements[formelementindex].fileurls.push(fileobjurl);
                    this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].formelements[formelementindex].attachments.push(selectedfile);
                    this.saveintermediatesurveydata();
                }
                reader.readAsDataURL(event.addedFiles[index]);*/
            }




        });
        } catch (error) {
            // console.log("addselectedfiles---" + error);
        }
    }
    getfileobject(file) {
        var extension = file.name.substring(file.name.lastIndexOf('.'));
        // console.log(extension);
        var mimetype = this.utilitieservice.getMimetype(extension);
        var data = new Blob([file], {
            type: mimetype
        });
        // console.log(data);
        return new File([data], file.name, { type: mimetype });
    }

    removeselectedfile(event, i, formelementindex) : void{
        let path =
        this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].formelements[formelementindex].fileurls[i].path +
        "/" +
        event.name.split(".")[0] +
        "_" +
        this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].formelements[formelementindex].fileurls[i].hash +
        "." +
        event.name.split(".")[1];
    //   let data = path + "/" + file.name.split(".")[0] + "_" + file.hash + "." + file.name.split(".")[1]
    this.uploadaws.deleteAwsFile(path).then((res) => {
        this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].formelements[formelementindex].attachments.splice(i, 1);
        this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].formelements[formelementindex].fileurls.splice(i, 1);
        this.remainingfilestoupload -= 1;


        
        this.changedetectorref.detectChanges();
        if (this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].formelements[formelementindex].fileurls.length == 0) {
            this.multiplefileuploadinput.nativeElement.value = '';
        }

        this.saveintermediatesurveydata();
        this.changedetectorref.detectChanges();
    });
    }

    addfile(event, formelementindex) {
        try {
          /*  let reader = getFileReader();
            reader.onload = (e: any) => {
                // console.log(ev.target.files[0]);
                var fileobjurl = '/assets/icon/file.png';
                if (ev.target.files[0].name.includes('.png') || ev.target.files[0].name.includes('.jpeg') || ev.target.files[0].name.includes('.jpg') || ev.target.files[0].name.includes('.gif')) {
                    fileobjurl = e.target.result;
                }
                // var object = this.getfileobject(ev.target.files[0]);
                const selectedfile: FILE_ATTACHMENTS = {
                    file: ev.target.files[0],
                    fileurl: fileobjurl,
                    uploadstatus: false,
                    controlname: this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].formelements[formelementindex].inputformcontrol[0]
                };
                this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].formelements[formelementindex].fileurls.push(fileobjurl);
                this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].formelements[formelementindex].attachments.push(selectedfile);
                this.saveintermediatesurveydata();
            }
            reader.readAsDataURL(ev.target.files[0]);

*/

            console.log('event',event);
            this.utilitieservice.showLoading("Processing").then(() => {



                const element = event.addedFiles[0];
                element.isImage = false;
                if (element.type.includes("image")) {
                    element.isImage = true;
                }
                const type = element.name.split(".");
                // WEB ARCHIVE EXT NOT SUPPORTED CODE
                if (type[1] == "webarchive") {
    
                } else {
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
                                    this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].formelements[formelementindex].fileurlspostarray.push(replacedfile);
                                    this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].formelements[formelementindex].fileurlspostarray.forEach(
                                        (item) => {
                                            if (item.name == replacedfile.name)
                                                item["isImage"] = true
                                        }
                                    );
                                    setTimeout(() => {
                                        this.changedetectorref.detectChanges();
                                    }, 300);
                                    this.changedetectorref.detectChanges();
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
    
                        const mimetype = this.utilitieservice.getMimetype(extension);
                        // window.console.log(extension, mimetype);
                        const data = new Blob([element], {
                            type: mimetype,
                        });
    
                        const replacedfile = new File([data], element.name, {
                            type: mimetype,
                        });
                        //this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].formelements[formelementindex].fileurlspostarray.push(replacedfile);
                        const selectedfile: FILE_ATTACHMENTS = {
                            file: event.addedFiles[0],                       
                            fileurl: replacedfile,
                            uploadstatus: false,
                            controlname: this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].formelements[formelementindex].inputformcontrol[0]
                        };
                        this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].formelements[formelementindex].attachments.push(selectedfile);

                    }
                }
                let date = new Date();
                this.hash = date.getTime();
                console.log('att');


                this.uploadaws
                .fileEvent(
                    event.addedFiles[0],
                    "survey/" + this.surveyid
                )
                .then((res) => {

                    console.log('res', res);
                    if (res.url) {
                        let postData = {
                            name: event.addedFiles[0].name,
                            ext: "." + event.addedFiles[0].name.split(".").reverse()[0],
                            mime: event.addedFiles[0].type,
                            hash: res.timestamp,
                            size: event.addedFiles[0].size,
                            path: "survey/" + this.surveyid,
                            provider: "aws-s3",
                            url: res.url,
                            field: this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].formelements[formelementindex].inputformcontrol[0],
                            order: 0 + 1,
                            ref: "survey",
                            refId: this.surveyid,
                            height: res.height,
                            width: res.width,
                        };
                        this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].formelements[formelementindex].fileurls.push(postData);

                        console.log('fileurlspostarray', this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].formelements[formelementindex].fileurls);
                       
                            this.utilitieservice.hideLoading();
                            this.changedetectorref.detectChanges();
                            this.saveintermediatesurveydata();
                        
                    } else {
                       
                        this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].formelements[formelementindex].fileurls.splice(
                            this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].formelements[formelementindex].fileurls.indexOf(event.addedFiles[0]),
                            1
                        );
                        // that.attachmentpostarray.splice(index, 1);
                        if (this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].formelements[formelementindex].fileurlspostarray.length === this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].formelements[formelementindex].fileurls.length) {
                            this.utilitieservice.hideLoading();
                             this.changedetectorref.detectChanges();
                        }
                        if (this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].formelements[formelementindex].fileurls.length == 0) {
                            //this.architecturalFileUpload = false;
                        }
                        this.changedetectorref.detectChanges();
                    }
                });
            });
        } catch (error) {
            // console.log("addselectedfiles---" + error);
        }
    }

    removefile(event ,formelementindex) : void{

        let path =
        this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].formelements[formelementindex].fileurls[0].path +
        "/" +
        event.name.split(".")[0] +
        "_" +
        this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].formelements[formelementindex].fileurls[0].hash +
        "." +
        event.name.split(".")[1];
    //   let data = path + "/" + file.name.split(".")[0] + "_" + file.hash + "." + file.name.split(".")[1]
    this.uploadaws.deleteAwsFile(path).then((res) => {
        this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].formelements[formelementindex].attachments.splice(0, 1);
        this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].formelements[formelementindex].fileurls.splice(0, 1);
        this.remainingfilestoupload -= 1;


        
        if (this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].formelements[formelementindex].fileurls.length == 0) {
            this.singlefileuploadinput.nativeElement.value = '';
        }
        this.saveintermediatesurveydata();
        this.changedetectorref.detectChanges();
    });
    }

    //Method called when slide is changed by drag or navigation
    SlideDidChange(object, slideView) {
        if (object != undefined) {
            this.checkIfNavDisabled(object, slideView);
        }
    }

    //Call methods to check if slide is first or last to enable disbale navigation
    checkIfNavDisabled(object, slideView) {
        if (object != undefined) {
            this.checkisBeginning(object, slideView);
            this.checkisEnd(object, slideView);
        }
    }

    checkisBeginning(object, slideView) {
        if (object != undefined) {
            slideView.isBeginning().then((istrue) => {
                object.isBeginningSlide = istrue;
            });
        }
    }
    checkisEnd(object, slideView) {
        if (object != undefined) {
            slideView.isEnd().then((istrue) => {
                object.isEndSlide = istrue;
            });
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    //Scrolling Methods
    //------------------------------------------------------------------------------------------------------------------

    scrollToMainmenuElement(index) {
        const el = document.getElementById('mainmenu' + index);
        if (el && el !== null && el !== undefined) {
            const rect = el.getBoundingClientRect();
            this.mainscroll.nativeElement.scrollLeft = rect.left;
        }
    }

    scrollToSubmenuElement(index) {
        const el = document.getElementById('submenu' + index);
        if (el && el !== null && el !== undefined) {
            const rect = el.getBoundingClientRect();
            this.submenuscroll.nativeElement.scrollLeft = rect.left;
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // API Calls for Autocomplete Code Starts Here
    //------------------------------------------------------------------------------------------------------------------
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
                    this.utilitieservice.errorSnackBar(responseError.error.message[0].messages[0].message);
                });

            });
        });
    }

    addutility(name: string) {
        const data = {
            name: name,
            source: this.platformname,
            lastused: this.formatDateInBackendFormat(),
            city: this.surveycity,
            state: this.surveystate,
            addedby: this.user.id
        };
        this.utilitieservice.showLoading('Saving').then(() => {
            this.apiService.addUtility(data).subscribe((data) => {
                this.utilitieservice.hideLoading().then(() => {
                    this.selectedutilityid = data.id;
                    this.activeForm.get('utility').setValue(data);
                    this.markshotcompletion();
                });
            }, (error) => {
                this.utilitieservice.hideLoading().then(() => {

                    
                    this.utilitieservice.errorSnackBar(JSON.stringify(error));
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
                    this.utilitieservice.errorSnackBar(responseError.error.message[0].messages[0].message);
                });
            });
        });
    }

    addroofmaterial(name: string) {
        const data = {
            name: name
        };
        this.utilitieservice.showLoading('Saving').then(() => {
            this.apiService.addRoofMaterial(data).subscribe((data) => {
                this.utilitieservice.hideLoading().then(() => {
                    this.selectedroofmaterialid = data.id;
                    this.activeForm.get('roofmaterial').setValue(data);
                    this.markshotcompletion();
                });
            }, (error) => {
                this.utilitieservice.hideLoading().then(() => {
                    this.utilitieservice.errorSnackBar(JSON.stringify(error));
                });
            });
        });
    }

    getInverterModels(selectedmakeid: string) {
        this.utilitieservice.showLoading('Getting inverter models').then((success) => {
            this.apiService.getInverterMade(selectedmakeid).subscribe(response => {
                this.utilitieservice.hideLoading().then(() => {
                    this.invertermodels = response;
                    this.changedetectorref.detectChanges();
                });
            }, responseError => {
                this.utilitieservice.hideLoading().then(() => {
                    const error: ErrorModel = responseError.error;
                    this.utilitieservice.errorSnackBar(responseError.error.message[0].messages[0].message);
                });
            });
        });
    }

    getInverterMakes() {

        
        this.utilitieservice.showLoading('Loading').then(() => {
            this.apiService.getInverterMake().subscribe(response => {
                this.utilitieservice.hideLoading().then(() => {
                    this.invertermakes = response;
                });
            }, responseError => {
                this.utilitieservice.hideLoading().then(() => {
                    const error: ErrorModel = responseError.error;
                    this.utilitieservice.errorSnackBar(responseError.error.message[0].messages[0].message);
                });
            });
        });
    }

    addinvertermake(name: string) {

        const data = {
            name: name
        };

        if(name === undefined){

            this.utilitieservice.errorSnackBar('Please fill required field');
            this.getInverterMakes();
        }else{
        
        this.utilitieservice.showLoading('Saving').then(() => {
            alert('Saving'+name);
            this.apiService.addInverterMake(data).subscribe((data) => {
                this.utilitieservice.hideLoading().then(() => {
                    this.selectedinvertermakeid = data.id;
                    this.addinvertermodel(this.invertermodel.manualinput, this.selectedinvertermakeid);
                    this.activeForm.get('invertermake').setValue(data);
                });
            }, (responseError) => {
                this.utilitieservice.hideLoading().then(() => {

                    const error: ErrorModel = responseError.error;
                    this.utilitieservice.errorSnackBar(responseError.error.message[0].messages[0].message);
                    
                });
            });
        });
    }
    }

    addinvertermodel(name: string, makeid: number) {

        
        
        const data = {
            name: name,
            invertermake: makeid
        };

        if( name === undefined)
        {

           this.utilitieservice.errorSnackBar('Please fill required field');
           this.getInverterModels(this.activeForm.get('invertermake').value.id);
       }else{
        this.utilitieservice.showLoading('Saving').then(() => {
            this.apiService.addInverterModel(data).subscribe((data) => {
                this.utilitieservice.hideLoading().then(() => {
                    this.selectedinvertermodelid = data.id;
                    this.activeForm.get('invertermodel').setValue(data);
                    this.markshotcompletion();
                });
            }, (responseError) => {
                this.utilitieservice.hideLoading().then(() => {

                    const error: ErrorModel = responseError.error;
                    this.utilitieservice.errorSnackBar(responseError.error.message[0].messages[0].message);
                    
                });
            });
        });


    }
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
                    this.utilitieservice.errorSnackBar(responseError.error.message[0].messages[0].message);
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
                    this.utilitieservice.errorSnackBar(responseError.error.message[0].messages[0].message);
                });
            });
        });
    }

    formatDateInBackendFormat() {
        const d = new Date();
        const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
        const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
        const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);

        return (`${ye}-${mo}-${da}`);
    }

    //------------------------------------------------------------------------------------------------------------------
    // API Calls to save Survey data at backend
    //------------------------------------------------------------------------------------------------------------------

    async navigatetoincompletestep(shotindex, childindex, mainindex) {
        try {
            this.deactivateallmenuitems();
            this.selectedmainmenuindex = mainindex;
            this.selectedsubmenuindex = childindex;
            this.selectedshotindex = shotindex;
            this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].isactive = true;
            this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].isactive = true;
            this.mainmenuitems[this.selectedmainmenuindex].isactive = true;
            const toast = await this.toastController.create({
                message: 'Please complete the following step.',
                duration: 2000
            });
            toast.present();
        } catch (error) {
            // console.log("navigatetoincompletestep---" + error);
        }
    }

    async savedataandclose() {
        const toast = await this.toastController.create({
            message: 'Your survey data is stored locally. You can sync completed surveys data later also.',
            duration: 4000
        });
        toast.present();
        this.handleSurveyExit();
    }

    async saveFormData() {
        console.log('saveFormData');
        let surveyRequiredData: any = [];
        try {
            this.saveintermediatesurveydata();
            //Code to check incomplete items
            let nopendingshotfound = true;
            this.mainmenuitems.forEach((mainmenuitem, mainindex) => {
                if (mainmenuitem.ispending && nopendingshotfound) {
                    mainmenuitem.children.forEach((childelement, childindex) => {
                        if (childelement.ispending && nopendingshotfound) {
                            childelement.shots.forEach((shot, shotindex) => {
                                if (shot.required && shot.ispending && nopendingshotfound) {
                                    let data: any = shot;
                                    data.shotindex = shotindex;
                                    data.childindex = childindex;
                                    data.mainindex = mainindex;

                                    surveyRequiredData.push(data);
                                    // comment on 20220303 becuase change functionality(show required images in modal)
                                    // nopendingshotfound = false;
                                    // this.navigatetoincompletestep(shotindex, childindex, mainindex);
                                }
                            });
                        }
                    });
                }
            });
            console.log('surveyRequiredData', surveyRequiredData);

            if (surveyRequiredData.length > 0) {
                // show required images in modal
                this.surveyRequiredModel(surveyRequiredData);
                nopendingshotfound = false;
            }

            if (nopendingshotfound) {
                if (this.activeForm.status == 'VALID') {
                    this.utilitieservice.showLoading('Please Wait...').then(() => {
                        // wifi connected then upload files
                        this.uploadfilestoserver();
                    });
                }
                else {
                    this.activeForm.markAllAsTouched();
                    this.activeForm.markAsDirty();
                    var invalidcontrols = this.utilitieservice.findInvalidControls(this.activeForm);
                    var toastmessage = 'Please input missing information of ';
                    invalidcontrols.forEach((invalidcontrol, index) => {
                        toastmessage += invalidcontrol.toUpperCase();
                        if (index < invalidcontrols.length - 1) {
                            toastmessage += ", ";
                        }
                    });
                    const toast = await this.toastController.create({
                        message: toastmessage,
                        duration: 3000
                    });
                    toast.present();
                }
            }
        } catch (error) {
            // console.log("saveFormData---" + error);
        }
    }

    async surveyRequiredModel(surveyRequiredData) {
        const modal = await this.modalCtrl.create({
            component: SurveyRequiredModelPage,
            cssClass: 'my-custom-modal-css',
            componentProps: {
                data: surveyRequiredData
            },
        });
        modal.onDidDismiss().then((data) => {
            if (data.data.dismissed && data.data.viewData !== null) {
                this.navigatetoincompletestep(data.data.viewData.shotindex, data.data.viewData.childindex, data.data.viewData.mainindex);
            }
        });
        return await modal.present();
    }

    surveyAlert(type) {
        this.datastorage.get('uploadSurveyUsingMobileNetwork').then((data) => {
            if (data == null) {
                this.openSurveyAlert(type);
            } else {
                if (type == 'savedataandclose') {
                    this.savedataandclose();
                } else if (type == 'saveFormData') {
                    this.saveFormData();
                }
            }
        });
    }

    async openSurveyAlert(type) {
        const alert = await this.alertCtrl.create({
            header: 'Confirm!',
            message: 'Are you sure want you upload survey data using mobile network?',
            buttons: [
                {
                    text: 'Yes',
                    handler: () => {
                        this.datastorage.set('uploadSurveyUsingMobileNetwork', true);
                        if (type == 'savedataandclose') {
                            this.savedataandclose();
                        } else if (type == 'saveFormData') {
                            this.saveFormData();
                        }
                    }
                }, {
                    text: 'No',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: (blah) => {
                        this.datastorage.set('uploadSurveyUsingMobileNetwork', false);
                        console.log('Confirm Cancel');
                        if (type == 'savedataandclose') {
                            this.savedataandclose();
                        } else if (type == 'saveFormData') {
                            this.saveFormData();
                        }
                    }
                }
            ]
        });

        await alert.present();
    }

    uploadfilestoserver() {
        this.saveintermediatesurveydata();
        this.filesarray = [];
        this.mainmenuitems.forEach(mainmenu => {
            if (mainmenu.viewmode == VIEWMODE.FORM) {
                mainmenu.children.forEach(child => {
                    if (child.formelements.length > 0) {
                        child.formelements.forEach(formelement => {
                            if (formelement.controltype == CONTROLTYPE.CONTROL_SINGLE_FILE_UPLOAD || formelement.controltype == CONTROLTYPE.CONTROL_MULTIPLE_FILE_UPLOAD) {
                                formelement.attachments.forEach(attachment => {
                                    if (!attachment.uploadstatus) {
                                        console.log(attachment);
                                        this.filesarray.push(attachment);
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });

        this.totalfilestoupload = this.filesarray.length;
        // console.log(this.filesarray);
        if (this.totalfilestoupload > 0) {
            this.uploadfileattachment(0);
        } else {
            this.uploadImagesToServer();
        }
    }

    uploadfileattachment(index) {
        try {
            this.utilitieservice.setLoadingMessage('Uploading file ' + (index + 1) + ' of ' + this.filesarray.length);

            const filedata = new FormData();
            filedata.append("files", this.filesarray[index].file);
            filedata.append('path', 'survey/' + this.surveyid);
            filedata.append('refId', this.surveyid + '');
            filedata.append('ref', 'survey');
            filedata.append('field', this.filesarray[index].controlname);
            this.apiService.uploaddesign(filedata).subscribe((data) => {
                this.filesarray[index].uploadstatus = true;
                this.saveintermediatesurveydata();
                if (index < this.filesarray.length - 1) {
                    this.uploadfileattachment(index + 1);
                } else {
                    this.uploadImagesToServer();
                }
            }, (error) => {
                this.utilitieservice.hideLoading().then(() => {
                    this.saveintermediatesurveydata();
                    this.handleuploadfailure();
                });
            });
        } catch (error) {
            // console.log("uploadfileattachment--"+error);
        }
    }

    uploadImagesToServer() {
        try {
            this.saveintermediatesurveydata();

            this.imagesArray = [];
            this.mainmenuitems.forEach(mainmenu => {
                mainmenu.children.forEach(child => {
                    child.capturedshots.forEach(shot => {
                        shot.imageuploadname ? shot.imageuploadname : shot.imageuploadname = shot.imagename;
                        if (!shot.imagecleared && !shot.uploadstatus) {


                            this.imagesArray.push(shot);
                        }

                        
                        // window.console.log(extension, mimetype);
                      
    
                        
                    });
                });
            });

            this.totalimagestoupload = this.imagesArray.length;
            if (this.totalimagestoupload > 0) {
                this.uploadimages(0);
            } else {
                this.savedetailsformdata();
            }
        } catch (error) {
            // console.log("uploadImagesToServer---" + error);
        }
    }

    uploadimages(index) {
        try {
            const blob = this.utilitieservice.getBlobFromImageData(this.imagesArray[index].shotimage);
            console.log('blob', this.imagesArray[index].shotimage);

            let filename = '';
            if (this.imagesArray[index].imageuploadname === '') {
                filename = Date.now().toString() + '.png';
            } else {
                filename = this.imagesArray[index].imageuploadname + '.png';
            }

            let currentTime = new Date().getTime();

            // this.s3Service.fileEvent(this.imagesArray[index], "survey/" + currentTime.toString() + "/attachments").then((res) => {
            //     console.log('res', res);
            // }, (error) => {
            //     console.log('error', error);
            // });

          
           


            this.utilitieservice.setLoadingMessage('Uploading image ' + (index + 1) + ' of ' + this.imagesArray.length);
            this.apiService.uploadImage(this.surveyid, this.imagesArray[index].imagekey, blob, filename).subscribe((data) => {
                this.imagesArray[index].uploadstatus = true;
                this.saveintermediatesurveydata();
                if (index < this.imagesArray.length - 1) {
                    this.uploadimages(index + 1);
/*
                    this.uploadaws
                    .fileEvent(
                        this.imagesArray[index],
                        "survey/" + this.surveyid
                    )
                    .then((res) => {
        
                        console.log('res', res);
                        if (res.url) {
                            let postData = {
                                name: filename,
                                ext: "." + filename.split(".").reverse()[0],
                                mime: 'image/png',
                                hash: res.timestamp,
                                size: 1,
                                path: "survey/" + this.surveyid,
                                provider: "aws-s3",
                                url: res.url,
                                field: this.imagesArray[index].imagekey,
                                order: index + 1,
                                ref: "survey",
                                refId: this.surveyid,
                                height: res.height,
                                width: res.width,
                            };
        
                            console.log('fileurlspostarray', postData);
                           
                                this.utilitieservice.hideLoading();
                                this.changedetectorref.detectChanges();
                            
                        } 
                    });

*/

                } else {
                    this.savedetailsformdata();
                }
            }, (error) => {
                this.utilitieservice.hideLoading().then(() => {
                    this.saveintermediatesurveydata();
                    this.handleuploadfailure();
                });
            });
        } catch (error) {
            // console.log("uploadimages---" + error);
        }
    }

    async handleuploadfailure() {
        const toast = await this.toastController.create({
            message: 'Unable to upload data due to network failure. Please try after sometime.',
            duration: 3000
        });
        toast.present();
        this.handleSurveyExit();
    }

    savedetailsformdata() {
        let tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate());
        let d_date = tomorrow.toISOString();
        try {
            this.utilitieservice.setLoadingMessage('Saving form data');
            this.saveintermediatesurveydata();
            const data = {};

            this.activeFormElementsArray.map(element => {
                if (element === 'batterysystem') {
                    data[element] = this.activeForm.get('batterysystem').value.toString();
                } else if (element === 'existingsolarsystem') {
                    data[element] = this.activeForm.get('existingsolarsystem').value.toString();
                } else if (element === 'esid_number') {
                    data['esid'] = this.activeForm.get('esid_number').value;
                }

                if (element != '' && this.activeForm.get(element).value != '') {
                    data[element] = this.activeForm.get(element).value;
                    if (element === 'batterysystem') {
                        data[element] = this.activeForm.get('batterysystem').value.toString();
                    } else if (element === 'roofmaterial' || element === 'invertermake' || element === 'invertermodel') {
                        data[element] = this.activeForm.get(element).value.id;
                    }
                }
            });
            data['status'] = 'completed';
            data['latitude'] = this.latitude;
            data['longitude'] = this.longitude;
            data['deliverydate'] = d_date;

            this.apiService.updateSurveyForm(data, this.surveyid).subscribe((response) => {
                console.log('response', response);
                let setData: any = response;
                this.utilitieservice.hideLoading().then(() => {
                    this.utilitieservice.showSuccessModal('Survey completed successfully').then((modal) => {
                        modal.present();
                        modal.onWillDismiss().then((dismissed) => {
                            this.storage.remove(this.user.id + '-' + this.surveyid);
                            this.utilitieservice.setPrelimId(setData);
                            this.utilitieservice.setRequestType('survey');
                            localStorage.setItem('redirectHome', 'true');
                            this.router.navigate(['/master-details/survey-details/' + this.surveyid]);
                            // if (this.user.role.type == 'surveyors') {
                            //     this.utilitieservice.sethomepageSurveyRefresh(true);
                            //     this.navController.navigateRoot('surveyor-overview');
                            // } else {
                            //     this.utilitieservice.sethomepageSurveyRefresh(true);
                            //     this.navController.navigateRoot('home/survey');
                            // }
                            // this.eventService.publish('foo:get-survey', {
                            //     getSurvey: true
                            // });
                        });
                    });
                });
            }, (error) => {
                this.utilitieservice.hideLoading().then(() => {
                    this.utilitieservice.errorSnackBar('There was some error in processing the request');
                });
            });
        } catch (error) {
            // console.log("savedetailsformdata---" + error);
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // Switch Menus Manually Methods
    //------------------------------------------------------------------------------------------------------------------

    selectmainmenu(index) {
        this.isShowKeyboard = false;
        this.changedetectorref.detectChanges();
        try {
            // Unset previous menu and select new one
            this.deactivateallmenuitems();
            this.selectedmainmenuindex = index;
            this.mainmenuitems[this.selectedmainmenuindex].isactive = true;
            this.mainmenuitems[this.selectedmainmenuindex].visitedonce = true;
            this.selectedsubmenuindex = 0;
            this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].isactive = true;
            this.selectedshotindex = 0;
            if (this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots.length > 0) {
                this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].isactive = true;
            }
            this.markallpreviousoptionalstepsnotpending(this.selectedmainmenuindex, this.selectedsubmenuindex);
        } catch (error) {
            // console.log("selectmainmenu---" + error);
        }
    }

    selectsubmenu(index) {
        this.isShowKeyboard = false;
        this.changedetectorref.detectChanges();
        try {
            this.deactivateallmenuitems();
            this.mainmenuitems[this.selectedmainmenuindex].isactive = true;
            this.selectedsubmenuindex = index;
            this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].isactive = true;
            this.selectedshotindex = 0;
            if (this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots.length > 0) {
                this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].isactive = true;
            }
            this.markallpreviousoptionalstepsnotpending(this.selectedmainmenuindex, this.selectedsubmenuindex);
        } catch (error) {
            // console.log("selectsubmenu---" + error);
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    //Camera Picture Taking Methods
    //------------------------------------------------------------------------------------------------------------------

    async openCameraToCapturePic(event) {
        event.preventDefault();
        this.isShowKeyboard = false;
        this.changedetectorref.detectChanges();
        const image = await Camera.getPhoto({
            quality: this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].imagequality,
            allowEditing: false,
            resultType: CameraResultType.Base64,
            source: CameraSource.Camera
        });

        let capturedImage = "data:image/jpeg;base64," + image.base64String;
        this.handleshotimage(capturedImage);
    }

    async openPhotoGalleryToSelectPic(event) {

console.log("gallery",event)
/*
  this.uploadaws
            .fileEvent(
                this.imagesArray[index],
                "survey/" + this.surveyid
            )
            .then((res) => {

                console.log('res', res);
                if (res.url) {
                    let postData = {
                        name: event.addedFiles[index].name,
                        ext: "." + event.addedFiles[index].name.split(".").reverse()[0],
                        mime: event.addedFiles[index].type,
                        hash: res.timestamp,
                        size: event.addedFiles[index].size,
                        path: "survey/" + this.surveyid,
                        provider: "aws-s3",
                        url: res.url,
                        field: this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].formelements[formelementindex].inputformcontrol[0],
                        order: 1,
                        ref: "survey",
                        refId: this.surveyid,
                        height: res.height,
                        width: res.width,
                    };

                    console.log('fileurlspostarray', postData);
                   
                        this.utilitieservice.hideLoading();
                        this.changedetectorref.detectChanges();
                    
                } 
            });
*/
        event.preventDefault();
        this.isShowKeyboard = false;
        this.changedetectorref.detectChanges();
        const image = await Camera.getPhoto({
            quality: this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].imagequality,
            allowEditing: false,
            resultType: CameraResultType.Base64,
            source: CameraSource.Photos
        });

        let capturedImage = "data:image/jpeg;base64," + image.base64String;
        this.handleshotimage(capturedImage);
    }

    handleshotimage(capturedImage) {
        try {


            this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].capturedshots[this.selectedshotindex].shotimage = capturedImage;

console.log("cap",capturedImage);





            this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].capturedshots[this.selectedshotindex].imagecleared = false;
            this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].shotstatus = true;
            this.updateshotscapturedcount();
            this.handleshotquestion();
        } catch (error) {
            // console.log("handleshotimage---" + error);
        }
    }

    updateshotscapturedcount() {
        try {
            var capturedshots = 0;
            this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].capturedshots.forEach(element => {
                if (!element.imagecleared) {
                    capturedshots += 1;
                }
            });

            this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shotscapturedcount = capturedshots;
        } catch (error) {
            // console.log("updateshotscapturedcount---" + error);
        }
    }

    handleshotquestion() {
        console.log('handleshotquestion');
        window.addEventListener('keyboardWillShow', (event) => {
        });
        console.log('keyboardWillShow');
        try {
            const activechild = this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex];
            if (activechild.shots[this.selectedshotindex].questiontype != QUESTIONTYPE.NONE) {
                if (!activechild.shots[this.selectedshotindex].questionstatus) {
                    activechild.shots[this.selectedshotindex].promptquestion = true;
                    this.blurcaptureview = true;
                    if (activechild.shots[this.selectedshotindex].questiontype === QUESTIONTYPE.INPUT_UTILITIES_AUTOCOMPLETE) {
                        window.addEventListener('keyboardWillShow', (event) => {
                        });
                        setTimeout(() => {
                            this.getUtilities();
                        }, 100);
                        
                    } else if (activechild.shots[this.selectedshotindex].questiontype === QUESTIONTYPE.INPUT_INVERTER_AUTOCOMPLETE) {
                        window.addEventListener('keyboardWillShow', (event) => {
                        });

                        setTimeout(() => {
                            this.subscribeInverterMake();
                            this.getInverterMakes();
                        }, 100);
                        
                    } else if (activechild.shots[this.selectedshotindex].questiontype === QUESTIONTYPE.INPUT_ROOF_MATERIAL_AUTOCOMPLETE) {
                        window.addEventListener('keyboardWillShow', (event) => {
                        });
                        setTimeout(() => {
                            this.getRoofMaterials();
                        }, 100);
                        
                    }
                } else {
                    //Move to next possible step
                    this.markshotcompletion();
                }
            } else {
                if (!activechild.shots[this.selectedshotindex].questionstatus) {
                    activechild.shots[this.selectedshotindex].questionstatus = true;
                }
                //Move to next possible step
                this.markshotcompletion();
            }

            this.changedetectorref.detectChanges();
            this.animateElementOpacity(document.querySelector('.questionaireview'));
            setTimeout(() => {
                if (activechild.shots[this.selectedshotindex].questiontype === QUESTIONTYPE.INPUT_NUMBER) {
                   
                    window.addEventListener('keyboardWillShow', (event) => {
                    });
                    this.questionTypeNumber.setFocus();
                } else if (activechild.shots[this.selectedshotindex].questiontype === QUESTIONTYPE.INPUT_TEXT) {
                    window.addEventListener('keyboardWillShow', (event) => {
                    });
                    this.questionTypeText.setFocus();
                } else if (activechild.shots[this.selectedshotindex].questiontype === QUESTIONTYPE.INPUT_SHOT_NAME) {
                    window.addEventListener('keyboardWillShow', (event) => {
                    });
                    this.questionInputShotName.setFocus();
                } else if (activechild.shots[this.selectedshotindex].questiontype === QUESTIONTYPE.INPUT_MULTI_NUMBER) {
                    
                    window.addEventListener('keyboardWillShow', (event) => {
                    });
                    this.questionInputMultiNumber.setFocus();
                }
            }, 100);
        } catch (error) {
            // console.log("handleshotquestion---" + error);
        }
    }

    handleShotNameSubmission() {
        try {
            const shotnameformcontrol = this.activeForm.get('shotname');
            if (shotnameformcontrol.value === '' || shotnameformcontrol.value === null) {
                shotnameformcontrol.markAsTouched();
                shotnameformcontrol.markAsDirty();
            } else {
                this.blurcaptureview = false;
                this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].capturedshots[this.selectedshotindex].imageuploadname = shotnameformcontrol.value;
                this.activeForm.get('shotname').setValue('');
                this.markshotcompletion();
            }
        } catch (error) {
            // console.log("handleShotNameSubmission---" + error);
        }
    }

    markshotcompletion() {
        try {
            this.fetchinvertermodels = true;
            if (this.invertermakesubscriptions != undefined || this.invertermakesubscriptions != null) {
                this.unsubscribeInverterMake();
            }
            // console.log("inside markshotcompletion");
            this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].promptquestion = false;
            this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].questionstatus = true;
            this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].shotstatus = true;
            this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].isactive = false;
            this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].ispending = false;
            this.blurcaptureview = false;
            if (this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].required && !this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].shotstatus) {
                this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].capturedshotscount += 1;
                this.updateProgressStatus();
            }

            //Check for more pending shots in same child if found activate that
            if (this.checkallrequiredshotscaptured()) {
                // console.log("marking child completion--" + this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].name);
                this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].ispending = false;
                this.selectedsubmenuindex = 0;
                this.markchildcompletion();
            } else {
                if (this.findnextpossibleshot(this.selectedmainmenuindex, this.selectedsubmenuindex, this.selectedshotindex)) {
                    // console.log("moving to next step");
                    this.activateshot();
                } else {
                    for (let shot of this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots) {
                        if (shot.ispending && shot.required) {
                            this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].ispending = true;
                            break;
                        } else {
                            this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].ispending = false;
                        }
                    }

                    this.markchildcompletion();
                }
            }
        } catch (error) {
            // console.log("markshotcompletion---" + error);
        }
    }

    checkallrequiredshotscaptured() {
        let allshotscaptured = true;
        this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots.forEach(shot => {
            if (shot.required && !shot.shotstatus) {
                allshotscaptured = false;
                return allshotscaptured;
            }
        });
        return allshotscaptured;
    }

    markchildcompletion() {
        try {
            //Check for more pending child in same menu
            let nextpendingshotfound = this.findnextpossibleshot(this.selectedmainmenuindex, this.selectedsubmenuindex, 0);
            if (nextpendingshotfound) {
                this.activateshot();
            } else {
                this.mainmenuitems[this.selectedmainmenuindex].ispending = false;
                this.markmaincompletion();
            }
        } catch (error) {
            // console.log("markchildcompletion---" + error);
        }
    }

    markmaincompletion() {
        try {
            //Check for more pending main menus
            let nextpendingshotfound = this.findnextpossibleshot(this.selectedmainmenuindex, 0, 0);
            if (nextpendingshotfound) {
                // console.log("moving to next step");
                this.activateshot();
            } else {
                this.nextfoundmainindex = this.mainmenuitems.length - 1;
                this.nextfoundchildindex = 0;
                this.nextfoundshotindex = 0;
                this.activateshot();
            }
        } catch (error) {
            // console.log("markmainmenucompletion---" + error);
        }
    }

    findnextpossibleshot(startmainmenuindex, startchildmenuindex, startshotindex) {
        // console.log("finding---" + startmainmenuindex + "---" + startchildmenuindex + "----" + startshotindex);
        try {
            let pendingshotfound = false;
            for (let mainmenuindex = startmainmenuindex; mainmenuindex < this.mainmenuitems.length; mainmenuindex++) {
                const mainmenu = this.mainmenuitems[mainmenuindex];
                if (!pendingshotfound) {
                    // console.log(mainmenu.name);
                    for (let childindex = startchildmenuindex; childindex < mainmenu.children.length; childindex++) {
                        const child = mainmenu.children[childindex];
                        if (!pendingshotfound) {
                            // console.log(child.name);
                            for (let shotindex = startshotindex; shotindex < child.shots.length; shotindex++) {
                                const shot = child.shots[shotindex];
                                if (!pendingshotfound && shot.ispending && (shot.required || (!shot.required && !shot.visitedonce))) {
                                    // console.log(shot.shotinfo);
                                    pendingshotfound = true;
                                    this.nextfoundshotindex = shotindex;
                                    this.nextfoundchildindex = childindex;
                                    this.nextfoundmainindex = mainmenuindex;
                                    return pendingshotfound;
                                }
                            }
                            if (!pendingshotfound) {
                                startchildmenuindex = 0;
                                startshotindex = 0;
                            }
                        }
                    }
                }
            }
            return pendingshotfound;
        } catch (error) {
            // console.log("findnextpossibleshot---" + error);
        }
    }

    activateshot() {
        try {
            this.deactivateallmenuitems();
            this.selectedshotindex = this.nextfoundshotindex;
            this.selectedsubmenuindex = this.nextfoundchildindex;
            this.selectedmainmenuindex = this.nextfoundmainindex;
            // console.log(this.selectedmainmenuindex + "---" + this.selectedsubmenuindex + "----" + this.selectedshotindex);
            if (this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots.length > 0) {
                this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].isactive = true;
                this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].visitedonce = true;
            }
            this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].isactive = true;
            this.mainmenuitems[this.selectedmainmenuindex].isactive = true;
            this.mainmenuitems[this.selectedmainmenuindex].visitedonce = true;
            this.markallpreviousoptionalstepsnotpending(this.selectedmainmenuindex, this.selectedsubmenuindex);
        } catch (error) {
            // console.log("activateshot---" + error);
        }
    }

    markallpreviousoptionalstepsnotpending(maxmainindex, maxchildindex) {
        for (let mainindex = 0; mainindex <= maxmainindex; mainindex++) {
            const mainmenu = this.mainmenuitems[mainindex];
            if (mainmenu.visitedonce) {
                // console.log(mainmenu.name+" main visited once");
                if (mainindex == maxmainindex) {
                    for (let childindex = 0; childindex < maxchildindex; childindex++) {
                        const child = mainmenu.children[childindex];
                        // console.log(child.name);
                        for (let shotindex = 0; shotindex < child.shots.length; shotindex++) {
                            const shot = child.shots[shotindex];
                            if (!shot.required) {
                                // console.log(shot.shotinfo+" is not required shot so setting visited once true");
                                this.mainmenuitems[mainindex].children[childindex].shots[shotindex].visitedonce = true;
                            }
                        }
                    }
                } else {
                    for (let childindex = 0; childindex < mainmenu.children.length; childindex++) {
                        const child = mainmenu.children[childindex];
                        // console.log(child.name);
                        for (let shotindex = 0; shotindex < child.shots.length; shotindex++) {
                            const shot = child.shots[shotindex];
                            if (!shot.required) {
                                // console.log(shot.shotinfo+" is not required shot so setting visited once true");
                                this.mainmenuitems[mainindex].children[childindex].shots[shotindex].visitedonce = true;
                            }
                        }
                    }
                }
            }
        }
        this.saveintermediatesurveydata();
    }

    deactivateallmenuitems() {
        this.mainmenuitems.map(mainmenuitem => {
            mainmenuitem.isactive = false;
            mainmenuitem.children.map(child => {
                child.isactive = false;
                if (child.shots.length > 0) {
                    child.shots.forEach(shot => {
                        shot.isactive = false;
                    });
                }
            });
        });
    }

    //------------------------------------------------------------------------------------------------------------------
    // Progress Code
    //------------------------------------------------------------------------------------------------------------------

    updateProgressStatus() {
        this.shotcompletecount += 1;
        this.totalpercent = (this.shotcompletecount / this.totalstepcount);
    }

    setTotalStepCount() {
        let totalSteps = 0;
        this.mainmenuitems.map(mainmenuitem => {
            mainmenuitem.children.map(child => {
                if (child.shots.length > 0) {
                    child.shots.forEach(shot => {
                        if (shot.required) {
                            totalSteps += 1;
                        }
                    });
                }
                if (child.formelements.length > 0) {
                    totalSteps += 1;
                }
            });
        });
        this.totalstepcount = totalSteps;
    }

    //------------------------------------------------------------------------------------------------------------------
    // Answer Submissions for Shot Questions Code
    //------------------------------------------------------------------------------------------------------------------
     handleAnswerSubmission(result) {
        console.log('result',result);
        if (result === '' || result === null) {
            result.markAsTouched();
            result.markAsDirty();
            
        } else {


            try {
                const shotDetail = this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex];
                shotDetail.result = result;
                // console.log(shotDetail.inputformcontrol);
                this.activeForm.get(shotDetail.inputformcontrol).setValue(result);
                this.markshotcompletion();
            } catch (error) {
               
            }

            
        }
       
    }

    handleInputSubmission(form: FormGroup) {
        try {
            const activechild = this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex];
            const control = form.get(activechild.shots[this.selectedshotindex].inputformcontrol);
            if (activechild.shots[this.selectedshotindex].questiontype === QUESTIONTYPE.INPUT_MULTI_NUMBER) {
                let anyemptyfieldfound = false;
                let preparedresult = "";
                activechild.shots[this.selectedshotindex].forminputfields.forEach((field, index) => {
                    if (form.get(field).value === '' || form.get(field).value === null) {
                        preparedresult = "";
                        anyemptyfieldfound = true;
                        form.get(field).markAsTouched();
                        form.get(field).markAsDirty();
                    } else {
                        preparedresult += form.get(field).value;
                    }
                    if (index < activechild.shots[this.selectedshotindex].forminputfields.length - 1) {
                        preparedresult += 'X';
                    }
                });
                if (!anyemptyfieldfound) {
                    this.handleAnswerSubmission(preparedresult);
                }
            } else {
                if (control.value === '' || control.value === null) {
                    control.markAsTouched();
                    control.markAsDirty();
                } else {
                    this.handleAnswerSubmission(control.value);
                }
            }

        } catch (error) {
            // console.log("handleInputSubmission---" + error);
        }
    }

    handleInputTextSubmission(form: FormGroup) {
        try {
            const activechild = this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex];
            const control = form.get(activechild.shots[this.selectedshotindex].inputformcontrol);
            if (control.value === '' || control.value === null) {
                control.markAsTouched();
                control.markAsDirty();
            } else {
                this.handleAnswerSubmission(control.value);
            }
        } catch (error) {
            // console.log("handleInputTextSubmission---" + error);
        }
    }

    handleInverterFieldsSubmission() {

        console.log('inverter');
        try {
            const invertermakecontrol = this.activeForm.get('invertermake');
            const invertermodelcontrol = this.activeForm.get('invertermodel');
            this.fetchinvertermodels = false;
            if (this.invertermake.manualinput != '') {
                const ismakefound = this.invertermakes.some(el => el.name === this.invertermake.manualinput);
                if (ismakefound) {
                    if (this.invertermodel.manualinput != '') {
                        const ismodelfound = this.invertermodels.some(el => el.name === this.invertermodel.manualinput);
                        if (ismodelfound) {
                            let modelobj = this.invertermodels.find(el => el.name === this.invertermodel.manualinput);
                            this.activeForm.get('invertermodel').setValue(modelobj);
                            this.markshotcompletion();
                        } else {
                            this.addinvertermodel(this.invertermodel.manualinput, invertermakecontrol.value.id);
                        }
                    } else {
                        let makeobj = this.invertermakes.find(el => el.name === this.invertermake.manualinput);
                        this.activeForm.get('invertermake').setValue(makeobj);
                        this.markshotcompletion();
                    }
                } else {
                    this.addinvertermake(this.invertermake.manualinput);
                }
            } else if (this.invertermodel.manualinput != '') {
                const ismodelfound = this.invertermodels.some(el => el.name === this.invertermodel.manualinput);
                if (ismodelfound) {
                    this.markshotcompletion();
                } else {
                    this.addinvertermodel(this.invertermodel.manualinput, invertermakecontrol.value.id);
                }
            } else {
                if (invertermakecontrol.value === '' || invertermodelcontrol.value === '' || invertermakecontrol.value === null || invertermodelcontrol.value === null) {
                    invertermakecontrol.markAsTouched();
                    invertermakecontrol.markAsDirty();
                    invertermodelcontrol.markAsTouched();
                    invertermodelcontrol.markAsDirty();
                } else {
                    this.markshotcompletion();
                }
            }
        } catch (error) {
            // console.log("handleInverterFieldsSubmission---" + error);
        }
    }

    handleUtilitySubmission() {
        try {
            const utilitycontrol = this.activeForm.get('utility');
            if (this.utility.manualinput != '') {
                const isfound = this.utilities.some(el => el.name === this.utility.manualinput);
                if (isfound) {
                    let obj = this.utilities.find(el => el.name === this.utility.manualinput);
                    this.activeForm.get('utility').setValue(obj);
                    this.markshotcompletion();
                }
                else {
                    this.addutility(this.utility.manualinput);
                }
            } else {
                if (utilitycontrol.value === '' || utilitycontrol.value === null) {
                    utilitycontrol.markAsTouched();
                    utilitycontrol.markAsDirty();
                } else {
                    this.markshotcompletion();
                }
            }
        } catch (error) {
            // console.log("handleUtilitySubmission---" + error);
        }
    }

    handleRoofMaterialSubmission() {
        try {
            const roofmaterialcontrol = this.activeForm.get('roofmaterial');
            if (this.roofmaterial.manualinput != '') {
                const isfound = this.roofmaterials.some(el => el.name === this.roofmaterial.manualinput);
                if (isfound) {
                    let obj = this.roofmaterials.find(el => el.name === this.roofmaterial.manualinput);
                    this.activeForm.get('roofmaterial').setValue(obj);
                    this.markshotcompletion();
                }
                else {
                    this.addroofmaterial(this.roofmaterial.manualinput);
                }
            } else {
                if (roofmaterialcontrol.value === '' || roofmaterialcontrol.value === null) {
                    roofmaterialcontrol.markAsTouched();
                    roofmaterialcontrol.markAsDirty();
                } else {
                    this.markshotcompletion();
                }
            }
        } catch (error) {
            // console.log("handleRoofMaterialSubmission---" + error);
        }
    }

    handleExistence(doesexist: boolean) {
        try {
            this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].isexistencechecked = true;
            this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].existenceresult = doesexist;
            this.blurcaptureview = false;
            this.showinfodetailsview = false;
            if (doesexist) {
                this.activeForm.get(this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].inputformcontrol).setValue(true);
                this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].capturedshotscount = 0;
                this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].requiredshotscount = 0;
                this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shotscapturedcount = 0;
                this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].capturedshots = [];
                this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots.forEach((element, index) => {
                    this.createcapturedshotofitem(element, this.selectedmainmenuindex, this.selectedsubmenuindex, index);
                    element.ispending = true;
                    element.shotstatus = false;
                    element.questionstatus = false;
                    element.required = true;
                    // console.log(element.inputformcontrol[0]);
                    if (element.inputformcontrol[0] !== '' && element.required) {
                        this.activeForm.get(element.inputformcontrol[0]).setValidators([Validators.required]);
                        if (element.inputformcontrol.length > 1 && element.required) {
                            this.activeForm.get(element.inputformcontrol[1]).setValidators([Validators.required]);
                        }
                    }
                    if (element.forminputfields.length > 0) {
                        element.forminputfields.forEach(fielditem => {
                            this.activeForm.get(fielditem).setValidators([Validators.required]);
                        });
                    }
                });
                this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].ispending = true;
            } else {
                //Mark shots as completed and required false
                this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots.forEach(element => {
                    element.ispending = false;
                    element.shotstatus = true;
                    element.questionstatus = true;
                    element.required = false;
                    // console.log(element.inputformcontrol[0]);
                    if (element.inputformcontrol[0] !== '') {
                        this.activeForm.get(element.inputformcontrol[0]).clearValidators();
                    }
                    if (element.inputformcontrol.length > 1) {
                        this.activeForm.get(element.inputformcontrol[1]).clearValidators();
                    }
                    if (element.forminputfields.length > 0) {
                        element.forminputfields.forEach(fielditem => {
                            this.activeForm.get(fielditem).clearValidators();
                        });
                    }
                });
                this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].capturedshots = [];
                this.activeForm.get(this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].inputformcontrol).setValue(false);
                this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].ispending = false;
                console.log('handleExistence if else');

                this.markchildcompletion();
            }
        } catch (error) {
            // console.log("handleExistence---" + error);
        }
    }

    onchildmodechange(event) {
        try {
            event.preventDefault();
            this.handleExistence(event.target.checked);
        } catch (error) {
            // console.log("onchildmodechanged---" + error);
        }
    }

    selectcapturedshot(event, shotindex) {
        event.preventDefault();
        this.showinfodetailsview = false;
        this.blurcaptureview = false;
        this.selectedshotindex = shotindex;
    }

    allowusertorecaptureshot(event) {
        try {
            event.preventDefault();
            this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].shotstatus = false;
            this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].ispending = true;
            this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].isactive = true;
            this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].ispending = true;
            this.mainmenuitems[this.selectedmainmenuindex].ispending = true;
            this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].capturedshots[this.selectedshotindex].shotimage = "";
            this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].capturedshots[this.selectedshotindex].imagecleared = true;
            this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shotscapturedcount -= 1;
        } catch (error) {
            // console.log("allowusertorecaptureshot---" + error);
        }
    }

    toggleshotdetailsview(isvisible) {
        this.showinfodetailsview = isvisible;
        this.blurcaptureview = isvisible;

        if (isvisible) {
            this.changedetectorref.detectChanges();
            this.animateViewFromTop(document.querySelector('.infodetailsview'));
        }
    }

    infoslidechange() {
        this.infoslider.getActiveIndex().then(
            (index) => {
                this.isactivesteppending = this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[index].ispending
            });
    }

    promptstepquestion(event, index) {
        try {
            event.preventDefault();
            this.fetchinvertermodels = true;
            this.subscribeInverterMake();
            if (this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[index].questionstatus && this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].existenceresult) {
                this.showinfodetailsview = false;
                this.blurcaptureview = true;
                this.selectedshotindex = index;
                if (this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].questiontype == QUESTIONTYPE.INPUT_SHOT_NAME) {
                    this.activeForm.get('shotname').setValue(this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].capturedshots[this.selectedshotindex].imageuploadname);
                }
                this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].promptquestion = true;
                window.addEventListener('keyboardWillShow', (event) => {
                });
                console.log('keyboardWillShow');
                if (this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].questiontype === QUESTIONTYPE.INPUT_UTILITIES_AUTOCOMPLETE) {
                    this.getUtilities();
                } else if (this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].questiontype === QUESTIONTYPE.INPUT_INVERTER_AUTOCOMPLETE) {
                    this.getInverterMakes();
                } else if (this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].questiontype === QUESTIONTYPE.INPUT_ROOF_MATERIAL_AUTOCOMPLETE) {
                    this.getRoofMaterials();
                }
            }
        } catch (error) {
            // console.log("promptstepquestion---" + error);
        }
    }

    toggleElementVisibility(element, controlsElement) {
        try {
            if (Object.keys(controlsElement).length > 0) {
                const elementToControl = this.activeForm.get(controlsElement.inputformcontrol);
                if (this.activeForm.get(element).value === controlsElement.onvalueselection) {
                    setTimeout(function () {
                        document.getElementById('input_' + controlsElement.inputformcontrol).classList.remove('hideElement');
                    }, 300);
                    elementToControl.enable();
                    elementToControl.setValidators([Validators.required]);
                } else {
                    setTimeout(function () {
                        document.getElementById('input_' + controlsElement.inputformcontrol).classList.add('hideElement');
                    }, 300);
                    elementToControl.setValue('');
                    elementToControl.clearValidators();
                    elementToControl.disable();
                }
                this.changedetectorref.detectChanges();
            }
        } catch (error) {
            // console.log("toggleElementVisibility---" + error);
        }
    }

    getGeoLocation() {
        // this.utilitieservice.showLoading('Getting Location').then(()=>{
        // setTimeout(()=>{
        //   this.utilitieservice.hideLoading();
        // },1000)
        this.geolocation.getCurrentPosition().then((resp) => {
            this.getGeoEncoder(resp.coords.latitude, resp.coords.longitude);
        }, err => {
            this.utilitieservice.errorSnackBar('Unable to get location');
        }).catch((error) => {
            this.utilitieservice.errorSnackBar('Unable to get location');
            this.showNoLocation();
        });
        // },err=>{
        //   this.utilitieservice.hideLoading();
        // });
    }
    goBack() {
        this.navController.pop();
        // this.location.back();
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
    fetchLocation() {
        if (this.platform.is('ios')) {
            this.getGeoLocation();
        } else {
            this.diagnostic.isGpsLocationEnabled().then((status) => {
                if (status === true) {
                    this.getGeoLocation();
                    // this.utilitieservice.showLoading('Getting Location').then(() => {
                    // });
                } else {
                    this.askToChangeSettings();
                }
            });
        }
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
    getdiagonstic() {
        this.diagnostic.requestLocationAuthorization(this.diagnostic.locationAuthorizationMode.WHEN_IN_USE).then((mode) => {
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
            this.goBack();
        });
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
            this.utilitieservice.showSnackBar('GPS Not Allowed');
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

    getGeoEncoder(latitude, longitude) {
        // Geocoder configuration
        // this.utilitieservice.hideLoading().then((success) => {
        this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geoEncoderOptions)
            .then((result: NativeGeocoderResult[]) => {
                const address: AddressModel = {
                    address: this.generateAddress(result[0]),
                    lat: latitude,
                    long: longitude,
                    country: result[0].countryName,
                    state: result[0].administrativeArea,
                    city: result[0].locality,
                    postalcode: result[0].postalCode
                };
                this.utilitieservice.setAddress(address);
            })
            .catch((error: any) => {
                this.showNoLocation();
                alert('Error getting location' + JSON.stringify(error));
            });
        // }, (error) => {
        // }
        // );
    }

    addroofbutton(){
        this.numberOfroof.push({
            buttonname:"Roof " + Number(this.numberOfroof.length + 1),
            isactive:false
        });
    }
    removeroof(index){
        this.numberOfroof.splice(index, 1);
        console.log(this.numberOfroof.length);
    }
    selectroof(index){
        this.isShowKeyboard = false;
        this.changedetectorref.detectChanges();
        try {
            this.deactivateallroofbutton();
            this.numberOfroof[index].isactive = true;
         } catch (error) {
            // console.log("selectsubmenu---" + error);
        }
    }
    deactivateallroofbutton() {
        this.numberOfroof.map(roof => {
            roof.isactive = false;
          
        });
    }
}
