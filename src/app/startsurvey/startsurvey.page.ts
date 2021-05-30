import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
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
import { Animation, AnimationController, IonSlides, NavController, Platform, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

const { Camera } = Plugins;

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
  existenceresult: boolean;
  inputformcontrol: string;
  placeholder?: string;
  shotscount: number;
  capturedshots: CAPTUREDSHOT[];
  shotscapturedcount: number;
  shots: SHOT[];
  formelements?: FORMELEMENTS[];
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
  capturedonce: boolean;
  forminputfields: string[];
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
  required: boolean;
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
  selector: 'app-startsurvey',
  templateUrl: './startsurvey.page.html',
  styleUrls: ['./startsurvey.page.scss'],
})
export class StartsurveyPage implements OnInit {

  @ViewChild('mainscroll', { static: false }) mainscroll: any;
  @ViewChild('submenuscroll', { static: false }) submenuscroll: any;
  @ViewChild('slideWithNav2', { static: false }) slideWithNav2: IonSlides;
  @ViewChild('infoslider', { static: false }) infoslider: IonSlides;
  @ViewChild('singlefileuploadinput') singlefileuploadinput: ElementRef;
  @ViewChild('multiplefileuploadinput') multiplefileuploadinput: ElementRef;
  @ViewChild('watermarkedimage') waterMarkImage: ElementRef;

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
  invertermakes: InverterMakeModel[] = [];
  solarmakes: SolarMake[] = [];
  solarmodels: SolarMadeModel[] = [];
  roofmaterials: RoofMaterial[] = [];
  selectedroofmaterialid: number;

  activeFormElementsArray;
  activeForm: FormGroup;

  isdataloaded = false;
  mainmenuitems: MAINMENU[];
  originalmainmenuitems: MAINMENU[];
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


  infoslideoptions = {
    initialSlide: 0,
    speed: 400
  };

  //Progress Slider Values
  totalpercent = 0;
  shotcompletecount = 0;
  totalstepcount: number;
  remainingfilestoupload = 0;
  failedshotstoupload: CAPTUREDSHOT[] = [];
  failedattachmentstoupload: FILE_ATTACHMENTS[] = [];

  cameraspaceremainingheight = 0;
  noviewremainingheight = 0;
  detailsviewremainingheight = 0;

  blobimagedata: any;

  latitude: any = 0; //latitude
  longitude: any = 0; //longitude

  constructor(private datastorage: Storage,
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
    private platform: Platform) { }

  ngOnInit() {
    try {
      this.cameraspaceremainingheight = this.platform.height() - 66 - 54 - 66;
      this.noviewremainingheight = this.platform.height() - 66 - 54;
      this.detailsviewremainingheight = this.platform.height() - 66 - 66 - 4;
      this.user = this.storageuserdata.getUser();
      this.surveyid = +this.route.snapshot.paramMap.get('id');
      this.surveytype = this.route.snapshot.paramMap.get('type');

      // this.loadSurveyJSON('pvsurveyjson');
      this.loadLocalJSON();
      // this.getCurrentCoordinates();
    } catch (error) {
      console.log("ngOnInit---"+error);
    }
  }

  loadSurveyJSON(type) {
    this.datastorage.get(type).then((data) => {
      this.restoreSurveyStoredData(data[0].sequence);
    }).catch((error) => {
      console.log('Error loading json', error);
      this.loadLocalJSON();
    });
  }

  loadLocalJSON() {
    this.http
      .get('assets/surveyprocessjson/defaultpv.json')
      .subscribe((data) => {
        this.restoreSurveyStoredData(data[0].sequence);
      });
  }

  createSurveyForm(surveydata) {
    try {
      this.activeFormElementsArray = [];
      // let surveydata = data.sequence;
      const formData = {};
      surveydata.map((item, mainindex) => {
        if (item.children) {
          item.children.map((child, childindex) => {
            if (child.inputformcontrol[0] !== '') {
              this.activeFormElementsArray.push(child.inputformcontrol[0]);
              formData[child.inputformcontrol[0]] = new FormControl('', [Validators.required]);
            }
            if (child.shots) {
              child.shots.map((shot, shotindex) => {
                this.createcapturedshotofitem(shot, mainindex, childindex, shotindex);
                if (shot.inputformcontrol[0] !== '') {
                  this.activeFormElementsArray.push(shot.inputformcontrol[0]);
                  if (shot.required) {
                    formData[shot.inputformcontrol[0]] = new FormControl('', [Validators.required]);
                  } else {
                    formData[shot.inputformcontrol[0]] = new FormControl('', []);
                  }
                  if (shot.inputformcontrol.length > 1) {
                    this.activeFormElementsArray.push(shot.inputformcontrol[1]);
                    if (shot.required) {
                      formData[shot.inputformcontrol[1]] = new FormControl('', [Validators.required]);
                    } else {
                      formData[shot.inputformcontrol[1]] = new FormControl('', []);
                    }
                  }
                }

                if (shot.forminputfields.length > 0) {
                  shot.forminputfields.forEach(element => {
                    if (shot.required) {
                      formData[element] = new FormControl('', [Validators.required]);
                    } else {
                      formData[element] = new FormControl('', []);
                    }
                  });
                }
              });
            }
            if (child.formelements) {
              child.formelements.map(formElement => {
                formElement.fileurls = [];
                formElement.attachments = [];
                if (formElement.controltype != CONTROLTYPE.CONTROL_SINGLE_FILE_UPLOAD && formElement.controltype != CONTROLTYPE.CONTROL_MULTIPLE_FILE_UPLOAD) {
                  this.activeFormElementsArray.push(formElement.inputformcontrol[0]);
                }
                if (formElement.required) {
                  formData[formElement.inputformcontrol[0]] = new FormControl('', [Validators.required]);
                } else {
                  formData[formElement.inputformcontrol[0]] = new FormControl('', []);
                }
              });
            }
          });
        }
      });
      formData['shotname'] = new FormControl('', []);
      // console.log(formData);
      this.activeFormElementsArray.push('shotname');
      // console.log(this.activeFormElementsArray);
      this.activeForm = new FormGroup(formData);
    } catch (error) {
      console.log("createSurveyForm---"+error);
    }
  }

  restoreStoredForm() {
    try {
      this.activeFormElementsArray = [];
      // let surveydata = data.sequence;
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
                if (shot.inputformcontrol[0] !== '') {
                  this.activeFormElementsArray.push(shot.inputformcontrol[0]);
                  if (shot.required) {
                    formData[shot.inputformcontrol[0]] = new FormControl('', [Validators.required]);
                  } else {
                    formData[shot.inputformcontrol[0]] = new FormControl('', []);
                  }
                  if (shot.inputformcontrol.length > 1) {
                    this.activeFormElementsArray.push(shot.inputformcontrol[1]);
                    if (shot.required) {
                      formData[shot.inputformcontrol[1]] = new FormControl('', [Validators.required]);
                    } else {
                      formData[shot.inputformcontrol[1]] = new FormControl('', []);
                    }
                  }
                }
                if (shot.forminputfields.length > 0) {
                  shot.forminputfields.forEach(element => {
                    if (shot.required) {
                      formData[element] = new FormControl('', [Validators.required]);
                    } else {
                      formData[element] = new FormControl('', []);
                    }
                  });
                }
              });
            }
            if (child.formelements) {
              child.formelements.map(formElement => {
                formElement.fileurls = formElement.fileurls;
                formElement.attachments = formElement.attachments;
                if (formElement.controltype != CONTROLTYPE.CONTROL_SINGLE_FILE_UPLOAD && formElement.controltype != CONTROLTYPE.CONTROL_MULTIPLE_FILE_UPLOAD) {
                  this.activeFormElementsArray.push(formElement.inputformcontrol[0]);
                }
                if (formElement.required) {
                  formData[formElement.inputformcontrol[0]] = new FormControl('', [Validators.required]);
                } else {
                  formData[formElement.inputformcontrol[0]] = new FormControl('', []);
                }
              });
            }
          });
        }
      });
      formData['shotname'] = new FormControl('', []);
      this.activeFormElementsArray.push('shotname');
      this.activeForm = new FormGroup(formData);
    } catch (error) {
      console.log("restoreStoredForm---"+error);
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
  }

  restoreSurveyStoredData(surveydata) {
    try {
      this.datastorage.get(this.user.id + '-' + this.surveyid).then((data: SurveyStorageModel) => {
        if (data) {
          this.mainmenuitems = data.menuitems;
          this.originalmainmenuitems = data.menuitems;
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
          this.setTotalStepCount();
        } else {
          this.mainmenuitems = JSON.parse(JSON.stringify(surveydata));
          this.originalmainmenuitems = JSON.parse(JSON.stringify(surveydata));

          this.mainmenuitems.forEach(element => {
            if (element.isactive) {
              this.selectedmainmenuindex = this.mainmenuitems.indexOf(element);
            }
          });
          this.createSurveyForm(surveydata);

          this.isdataloaded = true;
          this.setTotalStepCount();
        }
      });
    } catch (error) {
      console.log("restoreSurveyStoredData---"+error);
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
      this.navController.navigateBack('surveyoroverview');
    } else {
      this.utilitieservice.sethomepageSurveyRefresh(true);
      this.navController.navigateBack('/homepage/survey');
    }
  }

  saveintermediatesurveydata() {
    const data = this.preparesurveystorage();
    data.saved = true;
    this.storage.set(this.user.id + '-' + this.surveyid, data);
  }

  // use geolocation to get user's device coordinates
  // getCurrentCoordinates() {
  //   this.geolocation.getCurrentPosition().then((resp) => {
  //     this.latitude = resp.coords.latitude;
  //     this.longitude = resp.coords.longitude;
  //     console.log(this.latitude + "----" + this.longitude);
  //    }).catch((error) => {
  //      console.log('Error getting location', error);
  //    });
  // }

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
      console.log("getcountoffiletoupload---"+error);
    }
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

  addselectedfiles(ev, formelementindex) {
    try {
      for (let i = 0; i < ev.target.files.length; i++) {
        let reader = getFileReader();
        reader.onload = (e: any) => {
          var fileobjurl = '/assets/icon/file.png';
          if (ev.target.files[i].name.includes('.png') || ev.target.files[i].name.includes('.jpeg') || ev.target.files[i].name.includes('.jpg') || ev.target.files[i].name.includes('.gif')) {
            fileobjurl = e.target.result;
          }
          var object = this.getfileobject(ev.target.files[i]);
          const selectedfile: FILE_ATTACHMENTS = {
            file: object,
            fileurl: fileobjurl,
            uploadstatus: false,
            controlname: this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].formelements[formelementindex].inputformcontrol[0]
          };
          this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].formelements[formelementindex].fileurls.push(fileobjurl);
          this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].formelements[formelementindex].attachments.push(selectedfile);
        }
        reader.readAsDataURL(ev.target.files[i]);
      }
    } catch (error) {
      console.log("addselectedfiles---"+error);
    }
  }

  getfileobject(file) {
    var extension = file.name.substring(file.name.lastIndexOf('.'));
    var mimetype = this.utilitieservice.getMimetype(extension);
    var data = new Blob([file], {
      type: mimetype
    });
    return new File([data], file.name, { type: mimetype });
  }

  removeselectedfile(i, formelementindex) {
    this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].formelements[formelementindex].attachments.splice(i, 1);
    this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].formelements[formelementindex].fileurls.splice(i, 1);
    this.remainingfilestoupload -= 1;

    if (this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].formelements[formelementindex].fileurls.length == 0) {
      this.singlefileuploadinput.nativeElement.value = '';
      this.multiplefileuploadinput.nativeElement.value = '';
    }
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
          this.activeForm.get('invertermake').valueChanges.subscribe(val => {
            if (val != "") {
              this.getInverterModels(this.activeForm.get('invertermake').value.id);
            } else {
              this.activeForm.get('invertermodel').setValue('');
            }
          });
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
  // API Calls to save Survey data at backend
  //------------------------------------------------------------------------------------------------------------------

  async navigatetoincompletestep(shotindex, childindex, mainindex) {
    try {
      this.mainmenuitems[this.selectedmainmenuindex].isactive = false;
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
      console.log("navigatetoincompletestep---"+error);
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
                nopendingshotfound = false;
                this.navigatetoincompletestep(shotindex, childindex, mainindex);
              }
            });
          }
        });
      }
    });

    if (nopendingshotfound) {
      if (this.activeForm.status == 'VALID') {
        this.uploadfilestoserver();
      }
      else {
        const toast = await this.toastController.create({
          message: 'Please input required field details.',
          duration: 2000
        });
        toast.present();
        console.log(this.utilitieservice.findInvalidControls(this.activeForm));
      }
    }
    } catch (error) {
      console.log("saveFormData---"+error);
    }
  }

  uploadfilestoserver() {
    this.saveintermediatesurveydata();
    const filesarray: FILE_ATTACHMENTS[] = [];
    this.mainmenuitems.forEach(mainmenu => {
      if (mainmenu.viewmode == VIEWMODE.FORM) {
        mainmenu.children.forEach(child => {
          if (child.formelements.length > 0) {
            child.formelements.forEach(formelement => {
              if (formelement.controltype == CONTROLTYPE.CONTROL_SINGLE_FILE_UPLOAD || formelement.controltype == CONTROLTYPE.CONTROL_MULTIPLE_FILE_UPLOAD) {
                formelement.attachments.forEach(attachment => {
                  filesarray.push(attachment);
                });
              }
            });
          }
        });
      }
    });

    this.utilitieservice.showLoading('Uploading Files').then(() => {
      this.totalfilestoupload = filesarray.length;
      this.uploadattachmentbyindex(filesarray, 0, this.totalfilestoupload, false);
    });
  }

  uploadattachmentbyindex(files: FILE_ATTACHMENTS[], index, totalfiles, isfailedfile) {
    try {
      if (files.length > 0 && files.length <= this.totalfilestoupload) {
        const fileToUpload = files[0];
        if (fileToUpload.uploadstatus) {
          if (isfailedfile) {
            this.utilitieservice.setLoadingMessage('Uploading failed file ' + (index + 1) + ' of ' + totalfiles);
          } else {
            this.utilitieservice.setLoadingMessage('Uploading file ' + (index + 1) + ' of ' + totalfiles);
          }

          const filedata = new FormData();
          filedata.append("files", fileToUpload.file);
          filedata.append('path', 'survey/' + this.surveyid);
          filedata.append('refId', this.surveyid + '');
          filedata.append('ref', 'survey');
          filedata.append('field', fileToUpload.controlname);
          this.apiService.uploaddesign(filedata).subscribe((data) => {
            fileToUpload.uploadstatus = true;
            index++;
            files.splice(0, 1);
            this.saveintermediatesurveydata();
            this.uploadattachmentbyindex(files, index, totalfiles, isfailedfile);
          }, (error) => {
            fileToUpload.uploadstatus = false;
            this.failedattachmentstoupload.push(fileToUpload);
            this.displayfileuploadfailuretoast(index);
            index++;
            files.splice(0, 1);
            this.saveintermediatesurveydata();
            this.uploadattachmentbyindex(files, index, totalfiles, isfailedfile);
          });
        } else {
          index++;
          files.splice(0, 1);
          this.saveintermediatesurveydata();
          this.uploadattachmentbyindex(files, index, totalfiles, isfailedfile);
        }
      } else {
        this.utilitieservice.hideLoading().then(() => {
          if (this.failedattachmentstoupload.length > 0) {
            //Code to upload failed files
            this.uploadattachmentbyindex(this.failedattachmentstoupload, 0, this.failedattachmentstoupload.length, true);
          } else {
            this.uploadImagesToServer();
          }
        });
      }
    } catch (error) {
      console.log("uploadattachmentbyindex---"+error);
    }
  }

  uploadImagesToServer() {
    try {
      this.saveintermediatesurveydata();

      const imagesArray: CAPTUREDSHOT[] = [];
      this.mainmenuitems.forEach(mainmenu => {
        mainmenu.children.forEach(child => {
          child.capturedshots.forEach(shot => {
            if (!shot.imagecleared) {
              imagesArray.push(shot);
            }
          });
        });
      });

      this.utilitieservice.showLoading('Uploading Images').then(() => {
        this.totalimagestoupload = imagesArray.length;
        this.uploadImageByIndex(imagesArray, 0, this.totalimagestoupload, false);
      });
    } catch (error) {
      console.log("uploadImagesToServer---"+error);
    }
  }

  uploadImageByIndex(mapOfImages: CAPTUREDSHOT[], index, totalimages, isfailedimage) {
    try {
      if (mapOfImages.length > 0 && mapOfImages.length <= this.totalimagestoupload) {
        const imageToUpload = mapOfImages[0];
        if (imageToUpload.shotimage && !imageToUpload.uploadstatus) {
          const blob = this.utilitieservice.getBlobFromImageData(imageToUpload.shotimage);
          let filename = '';
          if (imageToUpload.imageuploadname === '') {
            filename = Date.now().toString() + '.png';
          } else {
            filename = imageToUpload.imageuploadname + '.png';
          }
          // this.blobimagedata = this.watermarkImage(blob);
          if (isfailedimage) {
            this.utilitieservice.setLoadingMessage('Uploading failed image ' + (index + 1) + ' of ' + totalimages);
          } else {
            this.utilitieservice.setLoadingMessage('Uploading image ' + (index + 1) + ' of ' + totalimages);
          }
          this.apiService.uploadImage(this.surveyid, imageToUpload.imagekey, blob, filename).subscribe((data) => {
            imageToUpload.uploadstatus = true;
            index++;
            mapOfImages.splice(0, 1);
            this.saveintermediatesurveydata();
            this.uploadImageByIndex(mapOfImages, index, totalimages, isfailedimage);
          }, (error) => {
            imageToUpload.uploadstatus = false;
            this.failedshotstoupload.push(imageToUpload);
            this.displayuploadfailuretoast(index);
            index++;
            mapOfImages.splice(0, 1);
            this.saveintermediatesurveydata();
            this.uploadImageByIndex(mapOfImages, index, totalimages, isfailedimage);
          });
        } else {
          index++;
          mapOfImages.splice(0, 1);
          this.saveintermediatesurveydata();
          this.uploadImageByIndex(mapOfImages, index, totalimages, isfailedimage);
        }
      } else {
        this.utilitieservice.hideLoading().then(() => {
          if (this.failedshotstoupload.length > 0) {
            //Code to upload failed files
            this.uploadImageByIndex(this.failedshotstoupload, 0, this.failedshotstoupload.length, true);
          } else {
            this.savedetailsformdata();
          }
        });
      }
    } catch (error) {
      console.log("uploadImageByIndex---"+error);
    }
  }

  async displayuploadfailuretoast(imageindex) {
    const toast = await this.toastController.create({
      message: 'Failed to upload image ' + imageindex,
      duration: 2000
    });
    toast.present();
  }

  async displayfileuploadfailuretoast(fileindex) {
    const toast = await this.toastController.create({
      message: 'Failed to upload file ' + fileindex,
      duration: 2000
    });
    toast.present();
  }

  savedetailsformdata() {
    try {
      this.saveintermediatesurveydata();
      this.utilitieservice.showLoading('Please wait...');
      const data = {};
      this.activeFormElementsArray.map(element => {
        if (this.activeForm.get(element).value != '') {
          data[element] = this.activeForm.get(element).value;
          if (element === 'batterysystem') {
            data[element] = this.activeForm.get('batterysystem').value.toString();
          }
          else if (element === 'roofmaterial' || element === 'invertermake' || element === 'invertermodel') {
            data[element] = this.activeForm.get(element).value.id;
          }
        }
      });
      data['status'] = 'completed';
      this.apiService.updateSurveyForm(data, this.surveyid).subscribe((response) => {
        this.utilitieservice.hideLoading().then(() => {
          this.utilitieservice.showSuccessModal('Survey completed successfully').then((modal) => {
            modal.present();
            modal.onWillDismiss().then((dismissed) => {
              this.storage.remove(this.user.id + '-' + this.surveyid);
              if (this.user.role.type == 'surveyors') {
                this.utilitieservice.sethomepageSurveyRefresh(true);
                this.navController.navigateRoot('surveyoroverview');
              } else {
                this.utilitieservice.sethomepageSurveyRefresh(true);
                this.navController.navigateRoot('homepage/survey');
              }
            });
          });
        });
      }, (error) => {
        this.utilitieservice.hideLoading().then(() => {
          this.utilitieservice.errorSnackBar('There was some error in processing the request');
        });
      });
    } catch (error) {
      console.log("savedetailsformdata---"+error);
    }
  }

  //------------------------------------------------------------------------------------------------------------------
  // Switch Menus Manually Methods
  //------------------------------------------------------------------------------------------------------------------

  selectmainmenu(index) {
    try {
      // Unset previous menu and select new one
      this.mainmenuitems[this.selectedmainmenuindex].isactive = false;
      if (this.mainmenuitems[this.selectedmainmenuindex].children.length > 0) {
        this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].isactive = false;
      }
      this.selectedmainmenuindex = index;
      this.mainmenuitems[this.selectedmainmenuindex].isactive = true;
      this.selectedsubmenuindex = 0;
      this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].isactive = true;
      this.selectedshotindex = 0;
      if (this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots.length > 0) {
        this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].isactive = true;
      }
    } catch (error) {
      console.log("selectmainmenu---"+error);
    }
  }

  selectsubmenu(index) {
    try {
      this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].isactive = false;
      this.selectedsubmenuindex = index;
      this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].isactive = true;
      this.selectedshotindex = 0;
      if (this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots.length > 0) {
        this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].isactive = true;
      }
    } catch (error) {
      console.log("selectsubmenu---"+error);
    }
  }

  //------------------------------------------------------------------------------------------------------------------
  //Camera Picture Taking Methods
  //------------------------------------------------------------------------------------------------------------------

  async openCameraToCapturePic(event) {
    event.preventDefault();
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
    event.preventDefault();
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
      this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].capturedshots[this.selectedshotindex].imagecleared = false;
      this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].capturedonce = true;
      this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].shotstatus = true;
      this.updateshotscapturedcount();
      this.handleshotquestion();
    } catch (error) {
      console.log("handleshotimage---"+error);
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
      console.log("updateshotscapturedcount---"+error);
    }
  }

  handleshotquestion() {
    try {
      const activechild = this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex];
      if (activechild.shots[this.selectedshotindex].questiontype != QUESTIONTYPE.NONE) {
        if (!activechild.shots[this.selectedshotindex].questionstatus) {
          activechild.shots[this.selectedshotindex].promptquestion = true;
          this.blurcaptureview = true;
          if (activechild.shots[this.selectedshotindex].questiontype === QUESTIONTYPE.INPUT_UTILITIES_AUTOCOMPLETE) {
            this.getUtilities();
          } else if (activechild.shots[this.selectedshotindex].questiontype === QUESTIONTYPE.INPUT_INVERTER_AUTOCOMPLETE) {
            this.getInverterMakes();
          } else if (activechild.shots[this.selectedshotindex].questiontype === QUESTIONTYPE.INPUT_ROOF_MATERIAL_AUTOCOMPLETE) {
            this.getRoofMaterials();
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
    } catch (error) {
      console.log("handleshotquestion---"+error);
    }
  }

  handleShotNameSubmission() {
    try {
      const shotnameformcontrol = this.activeForm.get('shotname');
      if (shotnameformcontrol.value != '') {
        this.blurcaptureview = false;
        this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].capturedshots[this.selectedshotindex].imageuploadname = shotnameformcontrol.value;
        this.activeForm.get('shotname').setValue('');
        this.markshotcompletion();
      } else {
        shotnameformcontrol.markAsTouched();
        shotnameformcontrol.markAsDirty();
      }
    } catch (error) {
      console.log("handleShotNameSubmission---"+error);
    }
  }

  markshotcompletion() {
    try {
      this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].promptquestion = false;
      this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].questionstatus = true;
      this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].shotstatus = true;
      this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].isactive = false;
      this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].ispending = false;
      this.blurcaptureview = false;
      if (this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].required) {
        this.updateProgressStatus();
      }

      //Check for more pending shots in same child
      var ispendingelementfound = false;
      this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots.forEach((shotelement, shotindex) => {
        if (shotelement.ispending && !ispendingelementfound) {
          ispendingelementfound = true;
          this.selectedshotindex = shotindex;
          this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].ispending = true;
        }
      });

      if (ispendingelementfound) {
        this.movetonextpossibleactionablestep(this.selectedmainmenuindex, this.selectedsubmenuindex, this.selectedshotindex);
      } else {
        this.markchildcompletion();
      }
    } catch (error) {
      console.log("markshotcompletion---"+error);
    }
  }

  markchildcompletion() {
    try {
      this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].ispending = false;
      this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].isactive = false;

      //Check for more pending child in same menu
      var ispendingelementfound = false;
      this.mainmenuitems[this.selectedmainmenuindex].children.forEach((childelement, childindex) => {
        if (childelement.ispending && !ispendingelementfound) {
          ispendingelementfound = true;
          this.selectedsubmenuindex = childindex;
          this.selectedshotindex = 0;
          this.mainmenuitems[this.selectedmainmenuindex].ispending = true;
        }
      });

      if (ispendingelementfound) {
        this.movetonextpossibleactionablestep(this.selectedmainmenuindex, this.selectedsubmenuindex, this.selectedshotindex);
      } else {
        this.markmainmenucompletion();
      }
    } catch (error) {
      console.log("markchildcompletion---"+error);
    }
  }

  markmainmenucompletion() {
    try {
      this.mainmenuitems[this.selectedmainmenuindex].ispending = false;
      this.mainmenuitems[this.selectedmainmenuindex].isactive = false;

      //Check for more pending main menus
      var ispendingelementfound = false;
      this.mainmenuitems.forEach((mainelement, mainindex) => {
        if (mainelement.ispending && !ispendingelementfound) {
          ispendingelementfound = true;
          this.selectedmainmenuindex = mainindex;
          this.selectedsubmenuindex = 0;
          this.selectedshotindex = 0;
        }
      });

      if (ispendingelementfound) {
        this.movetonextpossibleactionablestep(this.selectedmainmenuindex, this.selectedsubmenuindex, this.selectedshotindex);
      }
    } catch (error) {
      console.log("markmainmenucompletion---"+error);
    }
  }

  movetonextpossibleactionablestep(startmainmenuindex, startchildmenuindex, startshotindex) {
    try {
      if (this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots.length > 0) {
        if (this.findnextpossibleshot(startmainmenuindex, startchildmenuindex, startshotindex)) {
          this.activateshot();
        } else {
          if (this.findnextpossibleshot(0, 0, 0)) {
            this.activateshot();
          }
        }
      }
      this.saveintermediatesurveydata();
    } catch (error) {
      console.log("movetonextpossibleactionablestep---"+error);
    }
  }

  findnextpossibleshot(startmainmenuindex, startchildmenuindex, startshotindex) {
    try {
      let nextactiveshotfound = false;
      for (let mainmenuindex = startmainmenuindex; mainmenuindex < this.mainmenuitems.length; mainmenuindex++) {
        const mainmenu = this.mainmenuitems[mainmenuindex];
        if (!nextactiveshotfound) {
          for (let childindex = startchildmenuindex; childindex < mainmenu.children.length; childindex++) {
            const child = mainmenu.children[childindex];
            if (!nextactiveshotfound) {
              for (let shotindex = startshotindex; shotindex < child.shots.length; shotindex++) {
                const shot = child.shots[shotindex];
                if (!nextactiveshotfound && shot.ispending) {
                  nextactiveshotfound = true;
                  this.nextfoundshotindex = shotindex;
                  this.nextfoundchildindex = childindex;
                  this.nextfoundmainindex = mainmenuindex;
                  return nextactiveshotfound;
                }
              }
            }
          }
        }
      }
      return false;
    } catch (error) {
      console.log("findnextpossibleshot---"+error);
    }
  }

  activateshot() {
    try {
      this.selectedshotindex = this.nextfoundshotindex;
      this.selectedsubmenuindex = this.nextfoundchildindex;
      this.selectedmainmenuindex = this.nextfoundmainindex;
      this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].isactive = true;
      this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].isactive = true;
      this.mainmenuitems[this.selectedmainmenuindex].isactive = true;
    } catch (error) {
      console.log("activateshot---"+error);
    }
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
    try {
      const shotDetail = this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex];
      shotDetail.result = result;
      this.activeForm.get(shotDetail.inputformcontrol).setValue(result);
      this.markshotcompletion();
    } catch (error) {
      console.log("handleAnswerSubmission---"+error);
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
          if (form.get(field).value != '') {
            preparedresult += form.get(field).value;
          } else {
            preparedresult = "";
            anyemptyfieldfound = true;
            form.get(field).markAsTouched();
            form.get(field).markAsDirty();
          }
          if (index < activechild.shots[this.selectedshotindex].forminputfields.length - 1) {
            preparedresult += 'X';
          }
        });
        if (!anyemptyfieldfound) {
          this.handleAnswerSubmission(preparedresult);
        }
      } else {
        if (control.value != '') {
          this.handleAnswerSubmission(control.value);
        } else {
          control.markAsTouched();
          control.markAsDirty();
        }
      }
    } catch (error) {
      console.log("handleInputSubmission---"+error);
    }
  }

  handleInputTextSubmission(form: FormGroup) {
    try {
      const activechild = this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex];
      const control = form.get(activechild.shots[this.selectedshotindex].inputformcontrol);
      if (control.value != '') {
        this.handleAnswerSubmission(control.value);
      } else {
        control.markAsTouched();
        control.markAsDirty();
      }
    } catch (error) {
      console.log("handleInputTextSubmission---"+error);
    }
  }

  handleInverterFieldsSubmission() {
    try {
      const invertermakecontrol = this.activeForm.get('invertermake');
      const invertermodelcontrol = this.activeForm.get('invertermodel');
      if (invertermakecontrol.value != '' && invertermodelcontrol.value != '') {
        this.markshotcompletion();
      } else {
        invertermakecontrol.markAsTouched();
        invertermakecontrol.markAsDirty();
        invertermodelcontrol.markAsTouched();
        invertermodelcontrol.markAsDirty();
      }
    } catch (error) {
      console.log("handleInverterFieldsSubmission---"+error);
    }
  }

  handleUtilitySubmission() {
    try {
      const utilitycontrol = this.activeForm.get('utility');
      if (utilitycontrol.value != '') {
        this.markshotcompletion();
      } else {
        utilitycontrol.markAsTouched();
        utilitycontrol.markAsDirty();
      }
    } catch (error) {
      console.log("handleUtilitySubmission---"+error);
    }
  }

  handleRoofMaterialSubmission() {
    try {
      const roofmaterialcontrol = this.activeForm.get('roofmaterial');
      if (roofmaterialcontrol.value != '') {
        this.markshotcompletion();
      } else {
        roofmaterialcontrol.markAsTouched();
        roofmaterialcontrol.markAsDirty();
      }
    } catch (error) {
      console.log("handleRoofMaterialSubmission---"+error);
    }
  }

  handleExistence(doesexist: boolean) {
    try {
      this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].isexistencechecked = true;
      this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].existenceresult = doesexist;
      this.blurcaptureview = false;
      if (doesexist) {
        this.activeForm.get(this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].inputformcontrol).setValue(true);
        this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots = this.originalmainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots;
        this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots.forEach(element => {
          if (element.inputformcontrol[0] !== '' && element.required) {
            this.activeForm.get(element.inputformcontrol[0]).setValidators([Validators.required]);
            if (element.inputformcontrol.length > 1 && element.required) {
              this.activeForm.get(element.inputformcontrol[1]).setValidators([Validators.required]);
            }
          }
        });
      } else {
        //Mark shots as completed and required false
        this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots.forEach(element => {
          element.ispending = false;
          element.shotstatus = true;
          element.questionstatus = true;
          element.required = false;
          if (element.inputformcontrol[0] !== '') {
            this.activeForm.get(element.inputformcontrol[0]).clearValidators();
          }
          if (element.inputformcontrol.length > 1) {
            this.activeForm.get(element.inputformcontrol[1]).clearValidators();
          }
        });

        this.activeForm.get(this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].inputformcontrol).setValue(false);
        this.markchildcompletion();
      }
    } catch (error) {
      console.log("handleExistence---"+error);
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
      console.log("allowusertorecaptureshot---"+error);
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
      if (this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[index].questionstatus && this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].existenceresult) {
        this.showinfodetailsview = false;
        this.blurcaptureview = true;
        this.selectedshotindex = index;
        if (this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].questiontype == QUESTIONTYPE.INPUT_SHOT_NAME) {
          this.activeForm.get('shotname').setValue(this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].capturedshots[this.selectedshotindex].imageuploadname);
        }
        this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].promptquestion = true;
        if (this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].questiontype === QUESTIONTYPE.INPUT_UTILITIES_AUTOCOMPLETE) {
          this.getUtilities();
        } else if (this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].questiontype === QUESTIONTYPE.INPUT_INVERTER_AUTOCOMPLETE) {
          this.getInverterMakes();
        } else if (this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].questiontype === QUESTIONTYPE.INPUT_ROOF_MATERIAL_AUTOCOMPLETE) {
          this.getRoofMaterials();
        }
      }
    } catch (error) {
      console.log("promptstepquestion---"+error);
    }
  }

  onchildmodechange(event) {
    try {
      event.preventDefault();
      this.showinfodetailsview = false;
      let doesexist = event.target.checked;
      this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].isexistencechecked = true;
      this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].existenceresult = doesexist;
      this.blurcaptureview = false;
      if (doesexist) {
        this.activeForm.get(this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].inputformcontrol).setValue(true);
        this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots.forEach(element => {
          element.ispending = true;
          element.shotstatus = false;
          element.required = true;
          if (element.questiontype != QUESTIONTYPE.NONE) {
            element.questionstatus = false;
          }
          if (element.inputformcontrol[0] !== '' && element.required) {
            this.activeForm.get(element.inputformcontrol[0]).setValidators([Validators.required]);
          }
          if (element.inputformcontrol.length > 1 && element.required) {
            this.activeForm.get(element.inputformcontrol[1]).setValidators([Validators.required]);
          }
        });
      } else {
        this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots.forEach(element => {
          element.ispending = false;
          element.shotstatus = true;
          element.questionstatus = true;
          element.required = false;
          if (element.inputformcontrol[0] !== '') {
            this.activeForm.get(element.inputformcontrol[0]).clearValidators();
          }
          if (element.inputformcontrol.length > 1) {
            this.activeForm.get(element.inputformcontrol[1]).clearValidators();
          }
        });
        this.activeForm.get(this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].inputformcontrol).setValue(false);
        this.markchildcompletion();
      }
    } catch (error) {
      console.log("onchildmodechanged---"+error);
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
      console.log("toggleElementVisibility---"+error);
    }
  }
}
