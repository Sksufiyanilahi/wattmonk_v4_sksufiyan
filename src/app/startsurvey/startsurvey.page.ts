import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { SurveyStorageModel } from '../model/survey-storage.model';
import { User } from '../model/user.model';
import { StorageService } from '../storage.service';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { ErrorModel } from '../model/error.model';
import { ApiService } from '../api.service';
import { UtilitiesService } from '../utilities.service';
import { InverterMakeModel } from '../model/inverter-make.model';
import { InverterMadeModel } from '../model/inverter-made.model';
import { SolarMake } from '../model/solar-make.model';
import { SolarMadeModel } from '../model/solar-made.model';
import { RoofMaterial } from '../model/roofmaterial.model';

const { Camera } = Plugins;

export interface MAINMENU {
  name: string;
  isactive: boolean;
  ispending: boolean;
  isvisible: boolean;
  viewmode: number;
  children: CHILDREN[];
  formelements?: FORMELEMENTS[];
}

export interface CHILDREN {
  name: string;
  isactive: boolean;
  ispending: boolean;
  isvisible: boolean;
  checkexistence: boolean;
  isexistencechecked: boolean;
  inputformcontrol: string;
  placeholder?: string;
  shotscount: number;
  allowmultipleshots: boolean;
  multipleshotslimit?: number;
  capturedshots: CAPTUREDSHOT[];
  shots: SHOT[];
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
  inputformcontrol: string;
  inputformcontrol2?: string;
  placeholder?: string;
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
  required: boolean;
}

export enum CONTROLTYPE {
  CONTROL_INPUT_TEXT = 1,
  CONTROL_INPUT_NUMBER = 2,
  CONTROL_INPUT_SELECT = 3,
  CONTROL_INPUT_AUTOCOMPLETE = 4,
  CONTROL_INPUT_RADIO = 5,
  CONTROL_INPUT_CHECKBOX = 6,
  CONTROL_INPUT_TEXTAREA = 7,
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
  INPUT_FRAMING_SIZE = 8,
  INPUT_INVERTER_DETAILS = 9
}

export enum VIEWMODE {
  NONE = -1,
  CAMERA = 0,
  FORM = 1,
  MAP = 2,
  GALLERY = 3
}

@Component({
  selector: 'app-startsurvey',
  templateUrl: './startsurvey.page.html',
  styleUrls: ['./startsurvey.page.scss'],
})
export class StartsurveyPage implements OnInit {

  @ViewChild('mainscroll', { static: false }) mainscroll: any;
  @ViewChild('submenuscroll', { static: false }) submenuscroll: any;

  QuestionTypes = QUESTIONTYPE;
  ViewModes = VIEWMODE;
  ControlTypes = CONTROLTYPE;

  user: User;
  surveyid: number;
  surveytype: string;
  surveycity: string;
  surveystate: string;

  utilities: InverterMakeModel[] = [];
  selectedutilityid: number;
  invertermodels: InverterMadeModel[] = [];
  invertermakes: InverterMakeModel[] = [];
  solarmakes: SolarMake[] = [];
  solarmodels: SolarMadeModel[] = [];
  roofmaterials: RoofMaterial[] = [];
  selectedroofmaterialid: number;

  activeFormElementsArray;
  activeForm: FormGroup;
  activeFormKeysMap;

  isdataloaded = false;
  mainmenuitems: MAINMENU[];
  selectedmainmenuindex = 0;
  selectedsubmenuindex = 0;
  selectedshotindex = 0;

  capturedImage: string = '';

  constructor(private datastorage: Storage,
    private storageuserdata: StorageService,
    private route: ActivatedRoute,
    private changedetectorref: ChangeDetectorRef,
    private utilitieservice: UtilitiesService,
    private apiService: ApiService) { }

  ngOnInit() {
    this.user = this.storageuserdata.getUser();
    this.surveyid = +this.route.snapshot.paramMap.get('id');
    this.surveytype = this.route.snapshot.paramMap.get('type');
    this.surveycity = this.route.snapshot.paramMap.get('city');
    this.surveystate = this.route.snapshot.paramMap.get('state');

    this.loadSurveyJSON('pvsurveyjson');
  }

  loadSurveyJSON(type) {
    this.datastorage.get(type).then((data) => {
      console.log(data);
      this.createSurveyForm(data[0]);
    });
  }

  createSurveyForm(data) {
    this.activeFormElementsArray = [];
    let surveydata = data.sequence;
    const formData = {};
    this.activeFormKeysMap = {};
    surveydata.map(item => {
      if (item.children) {
        item.children.map(child => {
          if (child.inputformcontrol !== '') {
            this.activeFormElementsArray.push(child.inputformcontrol);
            this.activeFormKeysMap[child.inputformcontrol] = child.placeholder == '' ? child.label : child.placeholder;
            formData[child.inputformcontrol] = new FormControl('', [Validators.required]);
          }
          child.shots.map(shot => {
            if (shot.inputformcontrol !== '') {
              this.activeFormElementsArray.push(shot.inputformcontrol);
              this.activeFormKeysMap[shot.inputformcontrol] = shot.placeholder;
              if (child.inputformcontrol !== '') {
                formData[shot.inputformcontrol] = new FormControl('', []);
              } else {
                formData[shot.inputformcontrol] = new FormControl('', [Validators.required]);
              }
              if (shot.questiontype === 9) {
                this.activeFormElementsArray.push(shot.inputformcontrol2);
                formData[shot.inputformcontrol2] = new FormControl('', []);
              }
            }
          });
        });
      }
      if (item.formelements) {
        item.formelements.map(formElement => {
          this.activeFormElementsArray.push(formElement.inputformcontrol);
          this.activeFormKeysMap[formElement.inputformcontrol] = formElement.placeholder;
          if (formElement.required) {
            formData[formElement.inputformcontrol] = new FormControl('', [Validators.required]);
          } else {
            formData[formElement.inputformcontrol] = new FormControl('', []);
          }
        });
      }
    });
    formData['dimensionA'] = new FormControl('', []);
    this.activeFormElementsArray.push('dimensionA');
    formData['dimensionB'] = new FormControl('', []);
    this.activeFormElementsArray.push('dimensionB');
    formData['shotname'] = new FormControl('', []);
    this.activeFormElementsArray.push('shotname');
    this.activeForm = new FormGroup(formData);

    //Fillin data from storage if data exists
    this.restoreSurveyStoredData(surveydata);
  }

  restoreSurveyStoredData(surveydata) {
    this.datastorage.get(this.user.id + '-' + this.surveyid).then((data: SurveyStorageModel) => {
      if (data) {
      } else {
        this.mainmenuitems = JSON.parse(JSON.stringify(surveydata));

        this.mainmenuitems.forEach(element => {
          if (element.isactive) {
            this.selectedmainmenuindex = this.mainmenuitems.indexOf(element);
          }
        });

        this.isdataloaded = true;
      }
    });
  }

  //------------------------------------------------------------------------------------------------------------------
  //Scrolling Methods
  //------------------------------------------------------------------------------------------------------------------

  scrollToMainmenuElement(index) {
    const el = document.getElementById('mainmenu' + index);
    const rect = el.getBoundingClientRect();
    // scrollLeft as 0px, scrollTop as "topBound"px, move in 800 milliseconds

    this.mainscroll.nativeElement.scrollLeft = rect.left;
  }

  scrollToSubmenuElement(index) {
    const el = document.getElementById('submenu' + index);
    const rect = el.getBoundingClientRect();
    // scrollLeft as 0px, scrollTop as "topBound"px, move in 800 milliseconds

    this.submenuscroll.nativeElement.scrollLeft = rect.left;
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

  //------------------------------------------------------------------------------------------------------------------
  //Camera Picture Taking Methods
  //------------------------------------------------------------------------------------------------------------------

  async openCameraToCapturePic(event) {
    event.preventDefault();
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera
    });

    this.capturedImage = "data:image/jpeg;base64," + image.base64String;
    this.renderSelectedImage();
  }

  async openPhotoGalleryToSelectPic(event) {
    event.preventDefault();
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos
    });

    this.capturedImage = "data:image/jpeg;base64," + image.base64String;
    this.renderSelectedImage();
  }

  renderSelectedImage() {
    const currentIndex = this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex];
    const captureshot: CAPTUREDSHOT = {
      menuindex: this.selectedmainmenuindex,
      submenuindex: this.selectedsubmenuindex,
      shotindex: this.selectedshotindex,
      shotimage: this.capturedImage,
      imagekey: currentIndex.shots[this.selectedshotindex].imagekey,
      imagename: currentIndex.shots[this.selectedshotindex].imagename
    };
    currentIndex.capturedshots.push(captureshot);
    currentIndex.shots[this.selectedshotindex].shotstatus = true;

    if (currentIndex.shots[this.selectedshotindex].questiontype != QUESTIONTYPE.NONE) {
      console.log("got question type");
      if (!currentIndex.shots[this.selectedshotindex].questionstatus) {
        console.log("got prompt question");
        currentIndex.shots[this.selectedshotindex].promptquestion = true;
        // this.iscapturingallowed = false;
        if (currentIndex.shots[this.selectedshotindex].questiontype === QUESTIONTYPE.INPUT_UTILITIES_AUTOCOMPLETE) {
          this.getUtilities();
        } else if (currentIndex.shots[this.selectedshotindex].questiontype === QUESTIONTYPE.INPUT_INVERTER_AUTOCOMPLETE) {
          this.getInverterMakes();
        } else if (currentIndex.shots[this.selectedshotindex].questiontype === QUESTIONTYPE.INPUT_ROOF_MATERIAL_AUTOCOMPLETE) {
          this.getRoofMaterials();
        }
      } else {
        console.log("inside else");
        this.markShotCompletion(this.selectedshotindex);
      }
    } else {
      if (!currentIndex.allowmultipleshots) {
        currentIndex.shots[this.selectedshotindex].questionstatus = true;
        this.handleMenuSwitch();
      } else {
        if (!currentIndex.shots[this.selectedshotindex].questionstatus) {
          currentIndex.shots[this.selectedshotindex].questionstatus = true;
          // this.markShotCompletion(this.selectedshotindex);
          // this.updateProgressStatus();
        }
      }
    }

    this.changedetectorref.detectChanges();
  }

  handleMenuSwitch(selectedSubMenuDoesNotExist?) {
    // this.iscapturingallowed = true;

    // Retaining previous shots
    // this.previousmainmenuindex = this.selectedmainmenuindex;
    // this.previoussubmenuindex = this.selectedsubmenuindex;
    // this.previousshotindex = this.selectedshotindex;

    if (
      !this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].allowmultipleshots ||
      (
        this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].allowmultipleshots &&
        this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].multipleshotslimit !== -1 &&
        this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].capturedshots.length === this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].multipleshotslimit
      )
    ) {
      this.markShotCompletion(this.selectedshotindex);
      // if (!this.editingMode) {
      //   this.updateProgressStatus();
      // }
      if (this.selectedshotindex < this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots.length - 1 && selectedSubMenuDoesNotExist != false) {
        this.selectedshotindex += 1;
        // if (this.editingMode) {
        //   this.selectedshotindex = this.editingModePreviousIndex;
        // }
      } else {
        if (this.selectedsubmenuindex < this.mainmenuitems[this.selectedmainmenuindex].children.length - 1) {
          this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].isactive = false;
          let nextvisibleitemfound = false;
          for (let index = this.selectedsubmenuindex; index < this.mainmenuitems[this.selectedmainmenuindex].children.length - 1; index++) {
            const element = this.mainmenuitems[this.selectedmainmenuindex].children[index + 1];
            if (element.isvisible && !nextvisibleitemfound) {
              nextvisibleitemfound = true;
              this.selectedsubmenuindex = index + 1;
              // if (this.mainmenuitems[this.selectedmainmenuindex].viewmode != VIEWMODE.CAMERA) {
              //   CameraPreview.stop();
              //   this.stopCamera();
              // }
              if (this.mainmenuitems[this.selectedmainmenuindex].viewmode == VIEWMODE.CAMERA) {
                this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].isactive = true;
                this.selectedshotindex = 0;
              }
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
                  // if (this.mainmenuitems[this.selectedmainmenuindex].viewmode != VIEWMODE.CAMERA) {
                  //   CameraPreview.stop();
                  //   this.stopCamera();
                  // }
                  if (this.mainmenuitems[this.selectedmainmenuindex].viewmode == VIEWMODE.CAMERA) {
                    this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].isactive = true;
                  }
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
                // if (this.mainmenuitems[this.selectedmainmenuindex].viewmode != VIEWMODE.CAMERA) {
                //   CameraPreview.stop();
                //   this.stopCamera();
                // }
                if (this.mainmenuitems[this.selectedmainmenuindex].viewmode == VIEWMODE.CAMERA) {
                  this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].isactive = true;
                }
                this.scrollToMainmenuElement(this.selectedmainmenuindex);
                this.handleViewModeSwitch();
              }
            }
          }
        }
      }
    } else {
      if (this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].capturedshots.length > 0) {
        this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].questionstatus = true;
        this.markShotCompletion(this.selectedshotindex);
        // if (!this.editingMode) {
        //   this.updateProgressStatus();
        // }
      }
    }
    // if (this.editingMode) {
    //   this.editingMode = false;
    //   this.editingModePreviousIndex = '';
    // }
  }

  handleViewModeSwitch() {
    if (this.mainmenuitems[this.selectedmainmenuindex].viewmode == VIEWMODE.CAMERA) {
      // this.startCameraAfterPermission();
    } else if (this.mainmenuitems[this.selectedmainmenuindex].viewmode == VIEWMODE.FORM) {
      // CameraPreview.stop();
      // this.stopCamera();
      if (this.surveytype == 'battery') {
        this.getSolarMakes();
      } else if (this.surveytype == 'pvbattery') {
        this.getUtilities();
      }
    }
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

  //------------------------------------------------------------------------------------------------------------------
  // Answer Submissions for Shot Questions Code
  //------------------------------------------------------------------------------------------------------------------
   handleAnswerSubmission(result) {
    // this.iscapturingallowed = true;
    // this.issidemenucollapsed = true;
    // this.isgallerymenucollapsed = true;
    const currentIndex = this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex];
    const shotDetail = currentIndex.shots[this.selectedshotindex];
    shotDetail.result = result;
    shotDetail.promptquestion = false;
    shotDetail.questionstatus = true;
    this.activeForm.get(shotDetail.inputformcontrol).setValue(result);
    // if (this.surveytype == 'pvbattery' && this.selectedmainmenuindex == 1 && this.selectedsubmenuindex == 0 && this.selectedshotindex == 0) {
    //   this.handleGroundShotsVisibility();
    // } else if (this.surveytype == 'pvbattery' && this.selectedmainmenuindex == 1 && this.selectedsubmenuindex == 0 && this.selectedshotindex == 1) {
    //   this.handleAtticSectionVisibility();
    // }
    this.handleMenuSwitch();
  }

  handleInputSubmission(form: FormGroup) {
    const currentIndex = this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex];
    const control = form.get(currentIndex.shots[this.selectedshotindex].inputformcontrol);
    if (currentIndex.shots[this.selectedshotindex].questiontype === QUESTIONTYPE.INPUT_FRAMING_SIZE) {
      if (form.get('dimensionA').value != '' && form.get('dimensionB').value != '') {
        this.handleAnswerSubmission(`${form.get('dimensionA').value}x${form.get('dimensionB').value}`);
      } else {
        if (form.get('dimensionA').value == '' || form.get('dimensionA').value == undefined) {
          form.get('dimensionA').markAsTouched();
          form.get('dimensionA').markAsDirty();
        }
        if (form.get('dimensionB').value == '' || form.get('dimensionB').value == undefined) {
          form.get('dimensionB').markAsTouched();
          form.get('dimensionB').markAsDirty();
        }
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
    if (currentIndex.shots[this.selectedshotindex].questiontype === QUESTIONTYPE.INPUT_INVERTER_DETAILS) {
      const inverterMake = form.get('invertermake');
      const inverterModel = form.get('invertermodel');
      if (inverterMake.value != '' && inverterModel.value != '') {
        this.handleAnswerSubmission(`${inverterMake.value},${inverterModel.value}`);
      } else {
        if (inverterMake.value == '' || inverterMake.value == undefined) {
          inverterMake.markAllAsTouched();
          inverterMake.markAsDirty();
        }
        if (inverterModel.value == '' || inverterModel.value == undefined) {
          inverterModel.markAllAsTouched();
          inverterModel.markAsDirty();
        }
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

  handleShotNameSubmission(form: FormGroup) {
    const shotnameformcontrol = form.get('shotname');
    if (shotnameformcontrol.value != '') {
      const currentIndex = this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex];
      const shots = currentIndex.capturedshots;
      shots[shots.length - 1].imagename = shotnameformcontrol.value;
      // this.iscapturingallowed = true;
      // this.issidemenucollapsed = true;
      // this.isgallerymenucollapsed = true;
      currentIndex.shots[this.selectedshotindex].promptquestion = false;
      form.get('shotname').setValue('');

      if (currentIndex.capturedshots.length == 1) {
        currentIndex.ispending = false;
        this.mainmenuitems[this.selectedmainmenuindex].ispending = false;
        // this.updateProgressStatus();
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

}
