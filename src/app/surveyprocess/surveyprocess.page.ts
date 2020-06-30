import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview/ngx';
import { ActivatedRoute } from '@angular/router';
import { GOOGLE_API_KEY } from '../model/constants';
import { HttpClient } from '@angular/common/http';
import { NavController, AlertController } from '@ionic/angular';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UtilitiesService } from '../utilities.service';
import { ApiService } from '../api.service';
import { InverterMakeModel } from '../model/inverter-make.model';
import { ErrorModel } from '../model/error.model';
import { InverterMadeModel } from '../model/inverter-made.model';

export interface MAINMENU {
  name: string;
  isactive: boolean;
  children: CHILDREN[];
}

export interface CHILDREN {
  name: string;
  isactive: boolean;
  ispending: boolean;
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
}

export interface CAPTUREDSHOT {
  shotindex: number;
  shotimage: string;
}

export enum QUESTIONTYPE {
  NONE = 0,
  OPTIONS = 1,
  INPUT_NUMBER = 2,
  INPUT_UTILITIES_AUTOCOMPLETE = 3,
  INPUT_INVERTER_AUTOCOMPLETE = 4,
}

@Component({
  selector: 'app-surveyprocess',
  templateUrl: './surveyprocess.page.html',
  styleUrls: ['./surveyprocess.page.scss'],
})
export class SurveyprocessPage implements OnInit {

  QuestionTypes = QUESTIONTYPE;

  mainmenuitems: MAINMENU[];
  selectedmainmenuindex = 0;
  selectedsubmenuindex = 0;
  selectedshotindex = 0;

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
  totalPercent = 0;
  surveyid: number;
  surveytype: string;
  latitude: number;
  longitude: number;
  googleimageurl = 'https://maps.googleapis.com/maps/api/staticmap?zoom=24&maptype=satellite&size=900x1600&scale=2&key=' + GOOGLE_API_KEY;

  batteryForm: FormGroup;
  activeForm: FormGroup;

  utilities: InverterMakeModel[] = [];
  invertermodels: InverterMadeModel[] = [];
  invertermakes: InverterMakeModel[] = [];

  selectedInverterMakeID: number;
  selectedInverterModelID: number;

  constructor(
    private cameraPreview: CameraPreview,
    private route: ActivatedRoute,
    private http: HttpClient,
    private diagnostic: Diagnostic,
    private navController: NavController,
    private alertController: AlertController,
    private utilitieservice: UtilitiesService,
    private apiService: ApiService,
    private changedetectorref: ChangeDetectorRef) {
    this.surveyid = +this.route.snapshot.paramMap.get('id');
    this.surveytype = this.route.snapshot.paramMap.get('type');
    this.latitude = +this.route.snapshot.paramMap.get('lat');
    this.longitude = +this.route.snapshot.paramMap.get('long');
    this.googleimageurl = this.googleimageurl + '&center=' + this.latitude + ',' + this.longitude;
    this.googleimageurl = this.googleimageurl + '&&markers=size:normal|color:red|' + this.latitude + ',' + this.longitude;

    if (this.surveytype == "battery") {
      console.log("is battery");
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
        status: new FormControl('surveycompleted', [Validators.required])
      });
      this.http
        .get("assets/surveyprocessjson/battery.json")
        .subscribe((data) => {
          this.mainmenuitems = JSON.parse(JSON.stringify(data));
          this.isdataloaded = true;
        });

      this.activeForm = this.batteryForm;

      this.activeForm.get('invertermake').valueChanges.subscribe(val => {
        this.getInverterModels(this.activeForm.get('invertermake').value.id);
      });
    }
  }

  ngOnInit() {
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
  }

  getUtilities() {
    this.utilitieservice.showLoading('Loading').then(() => {
      this.apiService.getUtilities().subscribe(response => {
        this.utilitieservice.hideLoading().then(() => {
          console.log(response);
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

  getInverterModels(selectedmakeid: string) {
    console.log(selectedmakeid);
    this.utilitieservice.showLoading('Getting inverter models').then((success) => {
      this.apiService.getInverterMade(selectedmakeid).subscribe(response => {
        this.utilitieservice.hideLoading();
        console.log(response);
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
          console.log(response);
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
    //Unset previous menu and select new one
    this.mainmenuitems[this.selectedmainmenuindex].isactive = false;
    this.selectedmainmenuindex = index;
    this.mainmenuitems[this.selectedmainmenuindex].isactive = true;

    var issubmenuset = false;
    this.mainmenuitems[this.selectedmainmenuindex].children.forEach(element => {
      if (element.ispending && !issubmenuset) {
        console.log(element.name);
        element.isactive = true;
        issubmenuset = true;
        this.selectedsubmenuindex = this.mainmenuitems[this.selectedmainmenuindex].children.indexOf(element);
        this.selectedshotindex = 0;
      }
    });
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
        console.log(mode);
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
      console.log("starting camera");
      this.cameraPreview.startCamera(this.cameraPreviewOpts).then(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        });
      this.cameraPreview.getMaxZoom().then((value) => {
        this.maxzoom = value;
        if (this.maxzoom > 5) {
          this.maxzoom = 5;
        }
      }, (error) => {
      })
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
        quality: 85
      }).then((photo) => {
        this.capturedImage = 'data:image/png;base64,' + photo;
        var captureshot : CAPTUREDSHOT = {
          shotindex : this.selectedshotindex,
          shotimage : this.capturedImage
        }
        this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].capturedshots.push(captureshot);
        this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].shotstatus = true;
        if (this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].questiontype != QUESTIONTYPE.NONE) {
          if(!this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].questionstatus){
            this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].promptquestion = true;
            this.iscapturingallowed = false;
            if (this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].questiontype === QUESTIONTYPE.INPUT_UTILITIES_AUTOCOMPLETE) {
              this.getUtilities();
            } else if (this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].questiontype === QUESTIONTYPE.INPUT_INVERTER_AUTOCOMPLETE) {
              this.getInverterMakes();
            }
          }
        } else {
          if (!this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].allowmultipleshots) {
            this.handleMenuSwitch();
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
    console.log(result);
    this.iscapturingallowed = true;
    this.issidemenucollapsed = true;
    this.isgallerymenucollapsed = true;
    this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].result = result;
    this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].promptquestion = false;
    this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].questionstatus = true;
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

  handleInverterFieldsSubmission() {
    var invertermakecontrol = this.activeForm.get("invertermake");
    var invertermodelcontrol = this.activeForm.get("invertermodel");
    if (invertermakecontrol.value != "" && invertermodelcontrol.value != "") {
      this.selectedInverterMakeID = invertermakecontrol.value.id;
      this.selectedInverterModelID = invertermodelcontrol.value.id;
      this.handleMenuSwitch();
    } else {
      invertermakecontrol.markAsTouched();
      invertermakecontrol.markAsDirty();
      invertermodelcontrol.markAsTouched();
      invertermodelcontrol.markAsDirty();
    }
  }

  handleSurveyExit() {

  }

  handleExistence(doesexist: boolean) {
    this.issidemenucollapsed = true;
    this.isgallerymenucollapsed = true;
    this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].isexistencechecked = true;
    if (doesexist) {
      this.activeForm.get(this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].inputformcontrol).setValue(true);
    } else {
      this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].ispending = false;
      this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots.forEach(element => {
        element.ispending = false;
      });
      this.activeForm.get(this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].inputformcontrol).setValue(false);
      this.handleMenuSwitch();
    }
  }

  handleMenuSwitch() {
    this.iscapturingallowed = true;
    if (!this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].allowmultipleshots) {
      if (this.selectedshotindex < this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots.length - 1) {
        this.selectedshotindex += 1;
      } else {
        if (this.selectedsubmenuindex < this.mainmenuitems[this.selectedmainmenuindex].children.length - 1) {
          this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].isactive = false;
          this.selectedsubmenuindex += 1;
          this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].isactive = true;
          this.selectedshotindex = 0;
        } else {
          if (this.selectedmainmenuindex < this.mainmenuitems.length - 1) {
            //Unset previous menu and select new one
            this.mainmenuitems[this.selectedmainmenuindex].isactive = false;
            this.selectedmainmenuindex += 1;
            this.mainmenuitems[this.selectedmainmenuindex].isactive = true;
            this.selectedshotindex = 0;
            this.selectedsubmenuindex = 0;
          }
        }
      }
    }
  }
}
