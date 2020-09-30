import { Component, OnInit, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview/ngx';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NavController, AlertController, Platform, IonSlides, IonRouterOutlet } from '@ionic/angular';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { UtilitiesService } from '../utilities.service';
import { ApiService } from '../api.service';
import { InverterMakeModel } from '../model/inverter-make.model';
import { ErrorModel } from '../model/error.model';
import { InverterMadeModel } from '../model/inverter-made.model';
import { SolarMake } from '../model/solar-make.model';
import { SolarMadeModel } from '../model/solar-made.model';
import { CdkDragEnd } from '@angular/cdk/drag-drop';
import html2canvas from 'html2canvas';
import { SurveyStorageModel } from '../model/survey-storage.model';
import { Storage } from '@ionic/storage';
import { AutoCompleteComponent } from '../utilities/auto-complete/auto-complete.component';
import { StorageService } from '../storage.service';
import { Insomnia } from '@ionic-native/insomnia/ngx';
import * as domtoimage from 'dom-to-image';
import { RoofMaterial } from '../model/roofmaterial.model';

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
  isexistencechecked: boolean,
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
  styleUrls: ['./surveyprocess.page.scss'],
})
export class SurveyprocessPage implements OnInit {

  @ViewChild('screen', { static: false }) screen: ElementRef;
  @ViewChild('slides', { static: false }) slider: IonSlides;
  @ViewChild('utility', { static: false }) utility: AutoCompleteComponent;
  @ViewChild('roofmaterial', { static: false }) roofmaterial: AutoCompleteComponent;
  @ViewChild('mainscroll', { static: false }) mainscroll: any;
  @ViewChild('submenuscroll', { static: false }) submenuscroll: any;

  QuestionTypes = QUESTIONTYPE;
  ViewModes = VIEWMODE;

  slideOpts = {
    speed: 400
  };

  protected sliderIndex: number = 0;

  surveystoreddata = {};

  mainmenuitems: MAINMENU[];
  selectedmainmenuindex = 0;
  selectedsubmenuindex = 0;
  selectedshotindex = 0;

  previousmainmenuindex = 0;
  previoussubmenuindex = 0;
  previousshotindex = 0;
  previousviewmode = 0;

  pendingmenuitems: PENDING_MENU[];
  viewpendingitems: boolean = false;
  ispendingitemsmode: boolean = false;

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

  galleryshots: CAPTUREDSHOT[];

  equipments: Equipment[] = [{
    id: 3,
    name: "MSP",
    color: "#ff0000",
    disabledcolor: "#ff000080",
    enabled: true,
    event: null
  }, {
    id: 4,
    name: "INV",
    color: "#6d9eeb",
    disabledcolor: "#6d9eeb80",
    enabled: true,
    event: null
  }, {
    id: 5,
    name: "BT",
    color: "#ff00ff",
    disabledcolor: "#ff00ff80",
    enabled: true,
    event: null
  }, {
    id: 6,
    name: "GP",
    color: "#00ffff",
    disabledcolor: "#00ffff80",
    enabled: true,
    event: null
  }, {
    id: 7,
    name: "EEQ",
    color: "#ffff00",
    disabledcolor: "#ffff0080",
    enabled: true,
    event: null
  }
  ]

  acdisconnectequipment: Equipment = {
    id: 1,
    name: "ACD",
    color: "#fec412",
    disabledcolor: "#fec41280",
    enabled: true,
    event: null
  }

  pvmeterequipment: Equipment = {
    id: 2,
    name: "PVM",
    color: "#6aa84f",
    disabledcolor: "#6aa84f80",
    enabled: true,
    event: null
  }

  equipmentscanvasimage: string;
  sitelocationimage: any;

  constructor(
    private cameraPreview: CameraPreview,
    private route: ActivatedRoute,
    private http: HttpClient,
    private diagnostic: Diagnostic,
    private navController: NavController,
    private alertController: AlertController,
    private storage: Storage,
    private utilitieservice: UtilitiesService,
    private apiService: ApiService,
    private changedetectorref: ChangeDetectorRef,
    private platform: Platform,
    private routeroutlet: IonRouterOutlet,
    private storageService: StorageService,
    private insomnia: Insomnia) {
    this.surveyid = +this.route.snapshot.paramMap.get('id');
    this.surveytype = this.route.snapshot.paramMap.get('type');
    this.surveycity = this.route.snapshot.paramMap.get('city');
    this.surveystate = this.route.snapshot.paramMap.get('state');
    this.latitude = +this.route.snapshot.paramMap.get('lat');
    this.longitude = +this.route.snapshot.paramMap.get('long');

    if (this.platform.is('ios')) {
      this.platformname = "iphone"
    } else if (this.platform.is('android')) {
      this.platformname = "android"
    } else {
      this.platformname = "other"
    }

    this.platform.backButton.subscribeWithPriority(10, () => {
      console.log('Handler was called!');
      this.handleSurveyExit();
      navController.pop();
    });

    if (this.surveytype == "battery") {
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

          this.handleViewModeSwitch();

          this.activeForm.get('invertermake').valueChanges.subscribe(val => {
            this.getInverterModels(this.activeForm.get('invertermake').value.id);
          });

          this.activeForm.get('modulemake').valueChanges.subscribe(val => {
            this.getSolarModels(this.activeForm.get('modulemake').value.id);
          });
        } else {
          this.http
            .get("assets/surveyprocessjson/battery.json")
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
    } else if (this.surveytype == "pvbattery") {
      this.totalstepcount = 13;
      this.pvbatteryForm = new FormGroup({
        msplocation: new FormControl('', [Validators.required]),
        msprating: new FormControl('', [Validators.required]),
        mainbreakersize: new FormControl('', [Validators.required]),
        mspbreaker: new FormControl('', [Validators.required]),
        utilitymeter: new FormControl('', [Validators.required]),
        framing: new FormControl('', [Validators.required]),
        framingsize: new FormControl('', [Validators.required]),
        utility: new FormControl('', [Validators.required]),
        batterybackup: new FormControl('', [Validators.required]),
        servicefeedsource: new FormControl('', [Validators.required]),
        interconnection: new FormControl('', [Validators.required]),
        mountingtype: new FormControl('', [Validators.required]),
        rooftype: new FormControl('', [Validators.required]),
        roofmaterial: new FormControl('', [Validators.required])
      });

      this.activeForm = this.pvbatteryForm;

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

          this.handleViewModeSwitch();
        } else {
          this.http
            .get("assets/surveyprocessjson/pvbattery.json")
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
    } else if (this.surveytype == "pv") {

    }
  }

  formatDateInBackendFormat() {
    const d = new Date()
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)
    const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d)
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)

    return (`${ye}-${mo}-${da}`)
  }

  ngOnInit() {

    this.routeroutlet.swipeGesture = false;
    // camera options (Size and location). In the following example, the preview uses the rear camera and display the preview in the back of the webview
    this.cameraPreviewOpts = {
      x: 0,
      y: 0,
      width: window.screen.width,
      height: window.screen.height,
      camera: 'rear',
      tapPhoto: true,
      tapFocus: true,
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
    source._passiveTransform = { x: 0, y: 0 };
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

    //Retaining previous state
    this.previousmainmenuindex = this.selectedmainmenuindex;
    this.previoussubmenuindex = this.selectedsubmenuindex;
    this.previousshotindex = this.selectedshotindex;

    //Set questionstatus true for question type 5
    if (this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].capturedshots.length > 0 && this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].questiontype == this.QuestionTypes.INPUT_SHOT_NAME) {
      this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].questionstatus = true;
      this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].ispending = false;
    }

    //Unset previous menu and select new one
    this.mainmenuitems[this.selectedmainmenuindex].isactive = false;
    this.selectedmainmenuindex = index;
    this.mainmenuitems[this.selectedmainmenuindex].isactive = true;

    if (this.mainmenuitems[this.selectedmainmenuindex].children.length > 0) {
      var issubmenuset = false;
      this.mainmenuitems[this.selectedmainmenuindex].children.forEach(element => {
        if (element.ispending && !issubmenuset) {
          element.isactive = true;
          issubmenuset = true;
          this.selectedsubmenuindex = this.mainmenuitems[this.selectedmainmenuindex].children.indexOf(element);
          var isshotmenuset = false;
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
    console.log(this.currentzoom);
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
        if (!this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].allowmultipleshots) {
          var captureshot: CAPTUREDSHOT = {
            menuindex: this.selectedmainmenuindex,
            submenuindex: this.selectedsubmenuindex,
            shotindex: this.selectedshotindex,
            shotimage: this.capturedImage,
            imagekey: this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].imagekey,
            imagename: this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].imagename
          }
          this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].capturedshots.push(captureshot);
        } else {
          var captureshot: CAPTUREDSHOT = {
            menuindex: this.selectedmainmenuindex,
            submenuindex: this.selectedsubmenuindex,
            shotindex: this.selectedshotindex,
            shotimage: this.capturedImage,
            imagekey: this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].imagekey,
            imagename: this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].imagename + (this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].capturedshots.length + 1)
          }
          this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].capturedshots.push(captureshot);
        }
        this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].shotstatus = true;
        if (this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].questiontype != QUESTIONTYPE.NONE) {
          if (!this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].questionstatus) {
            this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].promptquestion = true;
            this.iscapturingallowed = false;
            if (this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].questiontype === QUESTIONTYPE.INPUT_UTILITIES_AUTOCOMPLETE) {
              this.getUtilities();
            } else if (this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].questiontype === QUESTIONTYPE.INPUT_INVERTER_AUTOCOMPLETE) {
              this.getInverterMakes();
            } else if (this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].questiontype === QUESTIONTYPE.INPUT_ROOF_MATERIAL_AUTOCOMPLETE) {
              this.getRoofMaterials();
            }
          } else {
            this.markShotCompletion(this.selectedshotindex);
          }
        } else {
          if (!this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].allowmultipleshots) {
            this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].questionstatus = true;
            this.handleMenuSwitch();
          } else {
            if (!this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].questionstatus) {
              this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].questionstatus = true;
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

  handleAnswerSubmission(result) {
    this.iscapturingallowed = true;
    this.issidemenucollapsed = true;
    this.isgallerymenucollapsed = true;
    this.activeForm.get(this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].inputformcontrol).setValue(result);
    this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].result = result;
    this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].promptquestion = false;
    this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].questionstatus = true;

    if (this.surveytype == "pvbattery" && this.selectedmainmenuindex == 1 && this.selectedsubmenuindex == 0 && this.selectedshotindex == 0) {
      var mountingtypecontrol = this.activeForm.get("mountingtype");
      if (mountingtypecontrol.value == "both" || mountingtypecontrol.value == "ground") {
        this.mainmenuitems[this.selectedmainmenuindex].children[1].isvisible = true;
      } else {
        this.mainmenuitems[this.selectedmainmenuindex].children[1].isvisible = false;
      }
    } else if (this.surveytype == "pvbattery" && this.selectedmainmenuindex == 1 && this.selectedsubmenuindex == 0 && this.selectedshotindex == 1) {
      var mountingtypecontrol = this.activeForm.get("rooftype");
      if (mountingtypecontrol.value == "both" || mountingtypecontrol.value == "pitch") {
        this.mainmenuitems[2].isvisible = true;
      } else {
        this.mainmenuitems[2].isvisible = false;
      }
    }

    this.handleMenuSwitch();
  }

  handleInputSubmission(form: FormGroup) {
    var control = form.get(this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].inputformcontrol);
    if (control.value != "") {
      this.handleAnswerSubmission(control.value);
    } else {
      control.markAsTouched();
      control.markAsDirty();
    }
  }

  handleShotNameSubmission(form: FormGroup) {
    var shotnameformcontrol = form.get("shotname");
    if (shotnameformcontrol.value != "") {
      var shots = this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].capturedshots;
      shots[shots.length - 1].imagename = shotnameformcontrol.value;
      this.iscapturingallowed = true;
      this.issidemenucollapsed = true;
      this.isgallerymenucollapsed = true;
      this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].promptquestion = false;
      form.get("shotname").setValue("");

      if (this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].capturedshots.length == 1) {
        this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].ispending = false;
        this.mainmenuitems[this.selectedmainmenuindex].ispending = false;
        this.updateProgressStatus();
      }
    } else {
      shotnameformcontrol.markAsTouched();
      shotnameformcontrol.markAsDirty();
    }
  }

  handleInverterFieldsSubmission() {
    var invertermakecontrol = this.activeForm.get("invertermake");
    var invertermodelcontrol = this.activeForm.get("invertermodel");
    if (invertermakecontrol.value != "" && invertermodelcontrol.value != "") {
      this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].promptquestion = false;
      this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].questionstatus = true;
      this.handleMenuSwitch();
    } else {
      invertermakecontrol.markAsTouched();
      invertermakecontrol.markAsDirty();
      invertermodelcontrol.markAsTouched();
      invertermodelcontrol.markAsDirty();
    }
  }

  handleUtilitySubmission() {
    var utilitycontrol = this.activeForm.get("utility");
    if (utilitycontrol.value != "") {
      this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].promptquestion = false;
      this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].questionstatus = true;
      this.handleMenuSwitch();
    } else {
      utilitycontrol.markAsTouched();
      utilitycontrol.markAsDirty();
    }
  }

  handleRoofMaterialSubmission() {
    var roofmaterialcontrol = this.activeForm.get("roofmaterial");
    if (roofmaterialcontrol.value != "") {
      this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].allowmultipleshots = true;
      this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].promptquestion = false;
      this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].questionstatus = true;
      this.handleMenuSwitch();
    } else {
      roofmaterialcontrol.markAsTouched();
      roofmaterialcontrol.markAsDirty();
    }
  }

  handleSurveyExit() {
    this.cameraPreview.stopCamera();

    const data = this.preparesurveystorage();
    data.saved = true;
    this.storage.set(this.surveyid + '', data);

    this.utilitieservice.setDataRefresh(true);
    this.navController.navigateBack('surveyoroverview');
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
    } else {
      this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots.forEach(element => {
        element.ispending = false;
        element.shotstatus = true;
        element.questionstatus = true;
      });
      this.activeForm.get(this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].inputformcontrol).setValue(false);
      this.handleMenuSwitch();
    }
  }

  handleMenuSwitch() {
    this.iscapturingallowed = true;

    //Retaining previous shots
    this.previousmainmenuindex = this.selectedmainmenuindex;
    this.previoussubmenuindex = this.selectedsubmenuindex;
    this.previousshotindex = this.selectedshotindex;

    if (!this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].allowmultipleshots) {
      this.markShotCompletion(this.selectedshotindex);
      this.updateProgressStatus();
      if (this.selectedshotindex < this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots.length - 1) {
        this.selectedshotindex += 1;
      } else {
        if (this.selectedsubmenuindex < this.mainmenuitems[this.selectedmainmenuindex].children.length - 1) {
          this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].isactive = false;
          var nextvisibleitemfound = false;
          for (let index = this.selectedsubmenuindex; index < this.mainmenuitems[this.selectedmainmenuindex].children.length - 1; index++) {
            const element = this.mainmenuitems[this.selectedmainmenuindex].children[index];
            if (element.isvisible) {
              nextvisibleitemfound = true;
              this.selectedsubmenuindex = index + 1;
              this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].isactive = true;
              this.selectedshotindex = 0;
              this.scrollToSubmenuElement(this.selectedsubmenuindex);
            }
          }

          if (!nextvisibleitemfound) {
            if (this.selectedmainmenuindex < this.mainmenuitems.length - 1) {
              //Unset previous menu and select new one
              this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].isactive = false;
              this.mainmenuitems[this.selectedmainmenuindex].isactive = false;
              var nextvisiblemainitemfound = false;
              for (let index = this.selectedmainmenuindex + 1; index < this.mainmenuitems.length - 1; index++) {
                const element = this.mainmenuitems[index];
                if (element.isvisible) {
                  nextvisiblemainitemfound = true;
                  this.selectedmainmenuindex = index;
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
            //Unset previous menu and select new one
            this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].isactive = false;
            this.mainmenuitems[this.selectedmainmenuindex].isactive = false;
            var nextvisiblemainitemfound = false;
            for (let index = this.selectedmainmenuindex + 1; index < this.mainmenuitems.length - 1; index++) {
              const element = this.mainmenuitems[index];
              if (element.isvisible) {
                nextvisiblemainitemfound = true;
                this.selectedmainmenuindex = index;
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
    var el = document.getElementById("submenu" + index);
    var rect = el.getBoundingClientRect();
    // scrollLeft as 0px, scrollTop as "topBound"px, move in 800 milliseconds

    this.submenuscroll.nativeElement.scrollLeft = rect.left;
  }

  scrollToMainmenuElement(index) {
    var el = document.getElementById("mainmenu" + index);
    var rect = el.getBoundingClientRect();
    // scrollLeft as 0px, scrollTop as "topBound"px, move in 800 milliseconds

    this.mainscroll.nativeElement.scrollLeft = rect.left;
  }

  markShotCompletion(index) {
    if (this.mainmenuitems[this.selectedmainmenuindex].children.length > 0) {
      if (this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[index].shotstatus && this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[index].questionstatus) {
        this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[index].ispending = false;

        var ispendingset = false;
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
    var ispendingset = false;
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
    var ispendingset = false;
    var checkstatus = true;
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
          var menu: PENDING_MENU = {
            index: mainindex,
            pendingchilds: [],
            name: element.name
          }
          for (let childindex = 0; childindex < element.children.length; childindex++) {
            const child = element.children[childindex];
            if (child.ispending) {
              if (child.shots.length > 0) {
                var childitem: PENDING_CHILD = {
                  index: childindex,
                  pendingshots: [],
                  name: child.name
                }
                for (let shotindex = 0; shotindex < child.shots.length; shotindex++) {
                  const shot = child.shots[shotindex];
                  if (shot.ispending) {
                    var shotitem: PENDING_SHOT = {
                      index: shotindex,
                      name: shot.shotinfo
                    }
                    childitem.pendingshots.push(shotitem);
                  }
                }
                menu.pendingchilds.push(childitem);
              } else {
                var childitem: PENDING_CHILD = {
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
          var menu: PENDING_MENU = {
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
    //Code to save current status
    const data = this.preparesurveystorage();
    data.saved = true;
    this.storage.set(this.surveyid + '', data);
    this.utilitieservice.setDataRefresh(true);

    var isutilitymanualinput = false;
    if (this.batteryForm.get("utility").value == null || this.batteryForm.get("utility").value == "") {
      if (this.utility.manualinput != "") {
        isutilitymanualinput = true;
        this.batteryForm.get("utility").setValue(this.utility.manualinput);
      }
    }

    if (this.batteryForm.status == 'INVALID') {
      this.displayIncompleteFormAlert();
    } else {
      this.markMainMenuCompletion();
      if (this.checkProcessCompletion()) {
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
              this.saveFormData();
            }, (error) => {
              this.utilitieservice.hideLoading().then(() => {
                this.utilitieservice.errorSnackBar(JSON.stringify(error));
              });
            });
          } else {
            this.selectedutilityid = this.batteryForm.get("utility").value.id;
            this.saveFormData();
          }
        });
      } else {
        this.displayAlertForRemainingShots();
      }
    }
  }

  saveFormData() {
    const data = {
      modulemake: this.batteryForm.get("modulemake").value.id,
      modulemodel: this.batteryForm.get("modulemodel").value.id,
      invertermake: this.batteryForm.get("invertermake").value.name,
      invertermodel: this.batteryForm.get("invertermodel").value.name,
      numberofmodules: parseInt(this.batteryForm.get("numberofmodules").value),
      additionalnotes: this.batteryForm.get("additionalnotes").value,
      batterybackup: this.batteryForm.get("batterybackup").value,
      servicefeedsource: this.batteryForm.get("servicefeedsource").value,
      mainbreakersize: parseInt(this.batteryForm.get("mainbreakersize").value),
      msprating: parseInt(this.batteryForm.get("msprating").value),
      msplocation: this.batteryForm.get("msplocation").value,
      mspbreaker: this.batteryForm.get("mspbreaker").value,
      utilitymeter: this.batteryForm.get("utilitymeter").value,
      utility: this.selectedutilityid,
      pvinverterlocation: this.batteryForm.get("pvinverterlocation").value,
      pvmeter: JSON.parse(this.batteryForm.get("pvmeter").value),
      acdisconnect: JSON.parse(this.batteryForm.get("acdisconnect").value),
      interconnection: this.batteryForm.get("interconnection").value,
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
    Object.keys(this.batteryForm.controls).forEach((key: string) => {
      const control: AbstractControl = this.batteryForm.get(key);
      if (control.invalid) {
        if (error !== '') {
          error = error + '<br/>';
        }
        if (control.errors.required === true) {
          error = error + "Input for field " + key + ' is missing.';
        }
        if (control.errors.email === true) {
          error = error + 'Invalid email';
        }
        if (control.errors.error !== null && control.errors.error !== undefined) {
          error = error + control.errors.error;
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

  uploadImagesToServer() {
    var imagesArray = [];
    this.mainmenuitems.forEach(mainmenu => {
      mainmenu.children.forEach(child => {
        child.capturedshots.forEach(shot => {
          imagesArray.push(shot);
        });
      });
    });

    if (this.equipmentscanvasimage != "") {
      var captureshot: CAPTUREDSHOT = {
        menuindex: -1,
        submenuindex: -1,
        shotindex: imagesArray.length + 1,
        shotimage: this.equipmentscanvasimage,
        imagekey: "electricalslocation",
        imagename: "electricalslocation"
      }
      imagesArray.push(captureshot);
    }

    this.utilitieservice.showLoading('Uploading Images').then(() => {
      this.totalimagestoupload = imagesArray.length;
      this.uploadImageByIndex(imagesArray);
    });
  }

  uploadImageByIndex(mapOfImages) {
    if (mapOfImages.length !== 0) {
      const imageToUpload = mapOfImages[0];
      const blob = this.utilitieservice.getBlobFromImageData(imageToUpload.shotimage);
      let filename = '';
      if (imageToUpload.imagename === '') {
        filename = Date.now().toString() + '.png';
      } else {
        filename = imageToUpload.imagename + '.png';
      }
      this.utilitieservice.setLoadingMessage('Uploading ' + this.imageuploadindex + ' of ' + this.totalimagestoupload);
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
      this.utilitieservice.hideLoading().then(() => {
        this.utilitieservice.showSuccessModal('Survey have been saved').then((modal) => {
          modal.present();
          modal.onWillDismiss().then((dismissed) => {
            this.storage.remove("" + this.surveyid);
            this.utilitieservice.sethomepageSurveyRefresh(true);
            this.navController.navigateRoot('surveyoroverview');
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
      }
    } else if (this.mainmenuitems[this.selectedmainmenuindex].viewmode == VIEWMODE.MAP) {
      this.cameraPreview.stopCamera();
      if (JSON.parse(this.activeForm.get("acdisconnect").value)) {
        this.equipments.splice(0, 0, this.acdisconnectequipment);
      }
      if (JSON.parse(this.activeForm.get("pvmeter").value)) {
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
    let reader = new FileReader();
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
      html2canvas(canvasarea, { width: this.platform.width(), height: this.platform.height(), scrollX: 0, scrollY: 0, x: 0 }).then(canvas => {
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
      var activeshot = this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].capturedshots.indexOf(shot);
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

  protected async slideDidChange(): Promise<void> {
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
    this.startCameraAfterPermission();
  }
}
