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
import { Animation, AnimationController, IonSlides, NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Insomnia } from '@ionic-native/insomnia/ngx';

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
  imagecleared: boolean;
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
  attachments: any;
  fileurls: any
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
  @ViewChild('singlefileuploadinput') singlefileuploadinput: ElementRef;
  @ViewChild('multiplefileuploadinput') multiplefileuploadinput: ElementRef;

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

  isdataloaded = false;
  mainmenuitems: MAINMENU[];
  originalmainmenuitems: MAINMENU[];
  selectedmainmenuindex = 0;
  selectedsubmenuindex = 0;
  selectedshotindex = 0;

  totalimagestoupload = 0;
  blurcaptureview = false;
  recapturingmode = false;

  constructor(private datastorage: Storage,
    private storageuserdata: StorageService,
    private route: ActivatedRoute,
    private changedetectorref: ChangeDetectorRef,
    private utilitieservice: UtilitiesService,
    private apiService: ApiService,
    private animationCtrl: AnimationController,
    private http: HttpClient,
    private insomnia: Insomnia,
    private navController: NavController,
    private storage: Storage) { }

  ngOnInit() {
    this.user = this.storageuserdata.getUser();
    this.surveyid = +this.route.snapshot.paramMap.get('id');
    this.surveytype = this.route.snapshot.paramMap.get('type');
    this.surveycity = this.route.snapshot.paramMap.get('city');
    this.surveystate = this.route.snapshot.paramMap.get('state');

    // this.loadSurveyJSON('pvsurveyjson');

    this.http
      .get('assets/surveyprocessjson/pv.json')
      .subscribe((data) => {
        console.log(data);
        this.createSurveyForm(data[0]);
      });

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
    surveydata.map(item => {
      if (item.children) {
        item.children.map(child => {
          if (child.inputformcontrol[0] !== '') {
            this.activeFormElementsArray.push(child.inputformcontrol[0]);
            formData[child.inputformcontrol[0]] = new FormControl('', [Validators.required]);
          }
          child.shots.map(shot => {
            if (shot.inputformcontrol[0] !== '') {
              this.activeFormElementsArray.push(shot.inputformcontrol[0]);
              formData[shot.inputformcontrol[0]] = new FormControl('', [Validators.required]);
              if (shot.inputformcontrol.length > 1) {
                this.activeFormElementsArray.push(shot.inputformcontrol[1]);
                formData[shot.inputformcontrol[1]] = new FormControl('', [Validators.required]);
              }
            }
          });
        });
      }
      if (item.formelements) {
        item.formelements.map(formElement => {
          formElement.attachments = [];
          formElement.fileurls = [];
          this.activeFormElementsArray.push(formElement.inputformcontrol[0]);
          if (formElement.required) {
            formData[formElement.inputformcontrol[0]] = new FormControl('', [Validators.required]);
          } else {
            formData[formElement.inputformcontrol[0]] = new FormControl('', []);
          }
        });
      }
    });
    console.log(formData);
    this.activeForm = new FormGroup(formData);

    //Fillin data from storage if data exists
    this.restoreSurveyStoredData(surveydata);
  }

  restoreSurveyStoredData(surveydata) {
    this.datastorage.get(this.user.id + '-' + this.surveyid).then((data: SurveyStorageModel) => {
      if (data) {
        this.mainmenuitems = data.menuitems;
        this.originalmainmenuitems = data.menuitems;
        this.selectedmainmenuindex = data.selectedmainmenuindex;
        this.selectedsubmenuindex = data.selectedsubmenuindex;
        this.selectedshotindex = data.selectedshotindex;

        this.surveyid = data.surveyid;
        this.surveytype = data.surveytype;
        this.surveycity = data.city;
        this.surveystate = data.state;
        Object.keys(data.formdata).forEach((key: string) => {
          let control: AbstractControl = null;
          control = this.activeForm.get(key);
          control.setValue(data.formdata[key]);
        });
        this.isdataloaded = true;
        // this.handleMenuSwitch(false);
      } else {
        this.mainmenuitems = JSON.parse(JSON.stringify(surveydata));
        this.originalmainmenuitems = JSON.parse(JSON.stringify(surveydata));

        this.mainmenuitems.forEach(element => {
          if (element.isactive) {
            this.selectedmainmenuindex = this.mainmenuitems.indexOf(element);
          }
        });

        this.isdataloaded = true;
      }
    });
  }

  preparesurveystorage(): SurveyStorageModel {
    const surveyStorageModel = new SurveyStorageModel();
    surveyStorageModel.menuitems = this.mainmenuitems;
    surveyStorageModel.formdata = this.activeForm.value;
    surveyStorageModel.selectedmainmenuindex = this.selectedmainmenuindex;
    surveyStorageModel.selectedsubmenuindex = this.selectedsubmenuindex;
    surveyStorageModel.selectedshotindex = this.selectedshotindex;

    surveyStorageModel.surveyid = this.surveyid;
    surveyStorageModel.surveytype = this.surveytype;
    surveyStorageModel.city = this.surveycity;
    surveyStorageModel.state = this.surveystate;

    return surveyStorageModel;
  }

  handleSurveyExit() {
    const data = this.preparesurveystorage();
    data.saved = true;
    this.storage.set(this.user.id + '-' + this.surveyid + '', data);

    if (this.user.role.type == 'surveyors') {
      this.utilitieservice.setDataRefresh(true);
      this.navController.navigateBack('surveyoroverview');
    } else {
      this.utilitieservice.sethomepageSurveyRefresh(true);
      this.navController.navigateBack('/homepage/survey');
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

  //------------------------------------------------------------------------------------------------------------------
  // File Selection Methods
  //------------------------------------------------------------------------------------------------------------------

  addselectedfiles(ev, formelementindex) {
    for (let i = 0; i < ev.target.files.length; i++) {
      this.getFiletype(ev.target.files[i], formelementindex);
      let reader = getFileReader();
      reader.onload = (e: any) => {
        if (ev.target.files[i].name.includes('.png') || ev.target.files[i].name.includes('.jpeg') || ev.target.files[i].name.includes('.jpg') || ev.target.files[i].name.includes('.gif')) {
          this.mainmenuitems[this.selectedmainmenuindex].formelements[formelementindex].fileurls.push(e.target.result);
        } else {
          this.mainmenuitems[this.selectedmainmenuindex].formelements[formelementindex].fileurls.push('/assets/icon/file.png');
        }
        console.log(this.mainmenuitems[this.selectedmainmenuindex].formelements[formelementindex].fileurls);
      }
      reader.readAsDataURL(ev.target.files[i]);
    }
  }

  getFiletype(file, formelementindex) {
    console.log(file)
    console.log(formelementindex);
    var extension = file.name.substring(file.name.lastIndexOf('.'));
    var mimetype = this.utilitieservice.getMimetype(extension);
    window.console.log(extension, mimetype);
    var data = new Blob([file], {
      type: mimetype
    });
    console.log(data);
    let replaceFile = new File([data], file.name, { type: mimetype });
    this.mainmenuitems[this.selectedmainmenuindex].formelements[formelementindex].attachments.push(replaceFile);
    console.log(this.mainmenuitems[this.selectedmainmenuindex].formelements[formelementindex].attachments);
  }

  removeselectedfile(i, formelementindex) {
    this.mainmenuitems[this.selectedmainmenuindex].formelements[formelementindex].attachments.splice(i, 1);
    this.mainmenuitems[this.selectedmainmenuindex].formelements[formelementindex].fileurls.splice(i, 1);

    if (this.mainmenuitems[this.selectedmainmenuindex].formelements[formelementindex].fileurls.length == 0) {
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
            this.getInverterModels(this.activeForm.get('invertermake').value.id);
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

  savePVFormData() {
    this.utilitieservice.showLoading('Please wait...');
    const data = {};
    this.activeFormElementsArray.map(element => {
      data[element] = this.activeForm.get(element).value;
      if (element === 'pvinverterlocation') {
        data[element] = this.activeForm.get('pvinverterlocation').value === '' ? null : this.activeForm.get('pvinverterlocation').value;
      }
      if (element === 'batterysystem') {
        data[element] = this.activeForm.get('batterysystem').value.toString();
      }
      if (element === 'framing') {
        data[element] = this.activeForm.get('framing').value === '' ? null : this.activeForm.get('framing').value;
      }
      if (element === 'distancebetweentworafts') {
        data[element] = this.activeForm.get('distancebetweentworafts').value === '' ? 0 : this.activeForm.get('distancebetweentworafts').value;
      }
    });
    data['status'] = 'surveycompleted';
    this.apiService.updateSurveyForm(data, this.surveyid).subscribe((response) => {
      this.utilitieservice.hideLoading().then(() => {
        this.insomnia.keepAwake()
          .then(
            () => {

            },

          );
        this.uploadImagesToServer();
      });
    }, (error) => {

      this.utilitieservice.hideLoading().then(() => {
        this.utilitieservice.errorSnackBar('There was some error in processing the request');
      });
    });
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

    this.utilitieservice.showLoading('Uploading Images').then(() => {
      this.totalimagestoupload = imagesArray.length;
      this.uploadImageByIndex(imagesArray, 0);
    });
  }

  uploadImageByIndex(mapOfImages, index) {
    if (mapOfImages.length > 0 && mapOfImages.length <= this.totalimagestoupload) {
      const imageToUpload = mapOfImages[0];
      if (imageToUpload.shotimage) {
        const blob = this.utilitieservice.getBlobFromImageData(imageToUpload.shotimage);
        let filename = '';
        if (imageToUpload.imagename === '') {
          filename = Date.now().toString() + '.png';
        } else {
          filename = imageToUpload.imagename + '.png';
        }
        this.utilitieservice.setLoadingMessage('Uploading image ' + index + ' of ' + this.totalimagestoupload);
        this.apiService.uploadImage(this.surveyid, imageToUpload.imagekey, blob, filename).subscribe((data) => {
          index++;
          mapOfImages.splice(0, 1);
          this.uploadImageByIndex(mapOfImages, index);
        }, (error) => {
          index++;
          mapOfImages.splice(0, 1);
          this.uploadImageByIndex(mapOfImages, index);
        });
      } else {
        index++;
        mapOfImages.splice(0, 1);
        this.uploadImageByIndex(mapOfImages, index);
      }
    } else {
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
            this.insomnia.allowSleepAgain()
              .then(
              );
          });
        });
      });
    }
  }

  //------------------------------------------------------------------------------------------------------------------
  // Switch Menus Manually Methods
  //------------------------------------------------------------------------------------------------------------------

  selectemainmenu(index){
    // Unset previous menu and select new one
    this.mainmenuitems[this.selectedmainmenuindex].isactive = false;
    this.selectedmainmenuindex = index;
    this.mainmenuitems[this.selectedmainmenuindex].isactive = true;
  }

  selectsubmenu(index){
    this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].isactive = false;
    this.selectedsubmenuindex = index;
    this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].isactive = true;
    this.selectedshotindex = 0;
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

    let capturedImage = "data:image/jpeg;base64," + image.base64String;
    this.handleshotimage(capturedImage);
  }

  async openPhotoGalleryToSelectPic(event) {
    event.preventDefault();
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos
    });

    let capturedImage = "data:image/jpeg;base64," + image.base64String;
    this.handleshotimage(capturedImage);
  }

  handleshotimage(capturedImage){
    const activechild = this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex];
    const captureshot: CAPTUREDSHOT = {
      menuindex: this.selectedmainmenuindex,
      submenuindex: this.selectedsubmenuindex,
      shotindex: this.selectedshotindex,
      shotimage: capturedImage,
      imagekey: activechild.shots[this.selectedshotindex].imagekey,
      imagename: activechild.shots[this.selectedshotindex].imagename,
      imagecleared: false
    };
    activechild.capturedshots.push(captureshot);
    this.handleshotquestion();
  }

  handleshotquestion(){
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
      }else{
        //Move to next possible step
        this.markshotcompletion();
      }
    } else {
      if (!activechild.allowmultipleshots) {
        if (!activechild.shots[this.selectedshotindex].questionstatus) {
          activechild.shots[this.selectedshotindex].questionstatus = true;
        }
        //Move to next possible step
        this.markshotcompletion();
      } else {
        if (!activechild.shots[this.selectedshotindex].questionstatus) {
          activechild.shots[this.selectedshotindex].questionstatus = true;
        }
        //Allow capturing more pics
      }
    }

    this.changedetectorref.detectChanges();
    this.animateElementOpacity(document.querySelector('.questionaireview'));
  }

  markshotcompletion(){
    this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].promptquestion = false;
    this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].questionstatus = true;
    this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].shotstatus = true;
    this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].isactive = false;
    this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].ispending = false;
    this.blurcaptureview = false;
    this.markchildcompletion();
  }

  markchildcompletion(){
    this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].ispending = false;
    this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].isactive = false;
    this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots.forEach(shotelement => {
      if(shotelement.ispending){
        this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].ispending = true;
      }
    });

    if(!this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].ispending){
      this.markmainmenucompletion();
    }else{
      this.movetonextpossibleactionablestep();
    }
  }

  markmainmenucompletion(){
    this.mainmenuitems[this.selectedmainmenuindex].ispending = false;
    this.mainmenuitems[this.selectedmainmenuindex].isactive = false;
    this.mainmenuitems[this.selectedmainmenuindex].children.forEach(childelement => {
      if(childelement.ispending){
        this.mainmenuitems[this.selectedmainmenuindex].ispending = true;
      }
    });

    this.movetonextpossibleactionablestep();
  }

  movetonextpossibleactionablestep(){
    let nextactiveshotfound = false;
    this.mainmenuitems.forEach((mainmenu, mainindex) => {
      if(!nextactiveshotfound){
        this.selectedmainmenuindex = mainindex;
        console.log(this.mainmenuitems[this.selectedmainmenuindex].name);
        if(mainmenu.children.length > 0){
          mainmenu.children.forEach((child, childindex) => {
            if(!nextactiveshotfound){
              this.selectedsubmenuindex = childindex;
              console.log(this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].name);
              if(child.shots.length > 0){
                child.shots.forEach((shot, shotindex) => {
                  if(shot.ispending && !nextactiveshotfound){
                    this.selectedshotindex = shotindex;
                    console.log(this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].shotinfo);
                    this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].isactive = true;
                    this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].isactive = true;
                    this.mainmenuitems[this.selectedmainmenuindex].isactive = true;
                    nextactiveshotfound = true;
                    console.log(this.mainmenuitems);
                  }
                });
              }
            }
          });
        }
      }
    });
  }

  // renderSelectedImage(capturedImage) {
  //   const currentIndex = this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex];
  //   //Check if the shot image has been recaptured
  //   if (this.recapturingmode) {
  //     currentIndex.capturedshots[this.selectedshotindex].shotimage = capturedImage;
  //     currentIndex.capturedshots[this.selectedshotindex].imagecleared = false;
  //     currentIndex.shots[this.selectedshotindex].ispending = false;
  //     this.recapturingmode = false;
  //     this.markShotCompletion(this.selectedshotindex);
  //     // this.lookForNextPendingItem();
  //   } else {
  //     const captureshot: CAPTUREDSHOT = {
  //       menuindex: this.selectedmainmenuindex,
  //       submenuindex: this.selectedsubmenuindex,
  //       shotindex: this.selectedshotindex,
  //       shotimage: capturedImage,
  //       imagekey: currentIndex.shots[this.selectedshotindex].imagekey,
  //       imagename: currentIndex.shots[this.selectedshotindex].imagename,
  //       imagecleared: false
  //     };
  //     currentIndex.capturedshots.push(captureshot);

  //     currentIndex.shots[this.selectedshotindex].shotstatus = true;

  //     if (currentIndex.shots[this.selectedshotindex].questiontype != QUESTIONTYPE.NONE) {
  //       if (!currentIndex.shots[this.selectedshotindex].questionstatus) {
  //         currentIndex.shots[this.selectedshotindex].promptquestion = true;
  //         this.blurcaptureview = true;
  //         if (currentIndex.shots[this.selectedshotindex].questiontype === QUESTIONTYPE.INPUT_UTILITIES_AUTOCOMPLETE) {
  //           this.getUtilities();
  //         } else if (currentIndex.shots[this.selectedshotindex].questiontype === QUESTIONTYPE.INPUT_INVERTER_AUTOCOMPLETE) {
  //           this.getInverterMakes();
  //         } else if (currentIndex.shots[this.selectedshotindex].questiontype === QUESTIONTYPE.INPUT_ROOF_MATERIAL_AUTOCOMPLETE) {
  //           this.getRoofMaterials();
  //         }
  //       } else {
  //         this.markShotCompletion(this.selectedshotindex);
  //       }
  //     } else {
  //       if (!currentIndex.allowmultipleshots) {
  //         currentIndex.shots[this.selectedshotindex].questionstatus = true;
  //         this.handleMenuSwitch();
  //       } else {
  //         if (!currentIndex.shots[this.selectedshotindex].questionstatus) {
  //           currentIndex.shots[this.selectedshotindex].questionstatus = true;
  //         }
  //       }
  //     }

  //     this.changedetectorref.detectChanges();

  //     this.animateElementOpacity(document.querySelector('.questionaireview'));
  //   }
  // }

  // handleMenuSwitch(selectedSubMenuDoesNotExist?) {
  //   if (
  //     !this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].allowmultipleshots ||
  //     (
  //       this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].allowmultipleshots &&
  //       this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].multipleshotslimit !== -1 &&
  //       this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].capturedshots.length === this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].multipleshotslimit
  //     )
  //   ) {
  //     this.markShotCompletion(this.selectedshotindex);
  //     //Looking for next shot if found
  //     if (this.selectedshotindex < this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots.length - 1 && selectedSubMenuDoesNotExist != false) {
  //       this.selectedshotindex += 1;
  //     } else {
  //       //Looking for next children if found
  //       if (this.selectedsubmenuindex < this.mainmenuitems[this.selectedmainmenuindex].children.length - 1) {
  //         this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].isactive = false;
  //         let nextvisibleitemfound = false;
  //         for (let index = this.selectedsubmenuindex; index < this.mainmenuitems[this.selectedmainmenuindex].children.length - 1; index++) {
  //           const element = this.mainmenuitems[this.selectedmainmenuindex].children[index + 1];
  //           if (element.isvisible && !nextvisibleitemfound) {
  //             nextvisibleitemfound = true;
  //             this.selectedsubmenuindex = index + 1;
  //             if (this.mainmenuitems[this.selectedmainmenuindex].viewmode == VIEWMODE.CAMERA) {
  //               this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].isactive = true;
  //               this.selectedshotindex = 0;
  //             }
  //             this.scrollToSubmenuElement(this.selectedsubmenuindex);
  //           }
  //         }

  //         if (!nextvisibleitemfound) {
  //           if (this.selectedmainmenuindex < this.mainmenuitems.length - 1) {
  //             // Unset previous menu and select new one
  //             this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].isactive = false;
  //             this.mainmenuitems[this.selectedmainmenuindex].isactive = false;
  //             let nextvisiblemainitemfound = false;
  //             for (let index = this.selectedmainmenuindex; index < this.mainmenuitems.length - 1; index++) {
  //               const element = this.mainmenuitems[index + 1];
  //               if (element.isvisible && !nextvisiblemainitemfound) {
  //                 nextvisiblemainitemfound = true;
  //                 this.selectedmainmenuindex = index + 1;
  //                 this.mainmenuitems[this.selectedmainmenuindex].isactive = true;
  //                 this.selectedshotindex = 0;
  //                 this.selectedsubmenuindex = 0;
  //                 if (this.mainmenuitems[this.selectedmainmenuindex].viewmode == VIEWMODE.CAMERA) {
  //                   this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].isactive = true;
  //                 }
  //                 this.scrollToMainmenuElement(this.selectedmainmenuindex);
  //                 this.changedetectorref.detectChanges();
  //               }
  //             }
  //           }
  //         }
  //       }
  //       //Looking for next main menu as children is not found
  //       else {
  //         if (this.selectedmainmenuindex < this.mainmenuitems.length - 1) {
  //           // Unset previous menu and select new one
  //           this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].isactive = false;
  //           this.mainmenuitems[this.selectedmainmenuindex].isactive = false;
  //           let nextvisiblemainitemfound = false;
  //           for (let index = this.selectedmainmenuindex; index < this.mainmenuitems.length - 1; index++) {
  //             const element = this.mainmenuitems[index + 1];
  //             if (element.isvisible && !nextvisiblemainitemfound) {
  //               nextvisiblemainitemfound = true;
  //               this.selectedmainmenuindex = index + 1;
  //               element.isactive = true;
  //               this.selectedshotindex = 0;
  //               this.selectedsubmenuindex = 0;

  //               if (element.children.length > 0 && element.children[this.selectedsubmenuindex].checkexistence && !element.children[this.selectedsubmenuindex].isexistencechecked) {
  //                 this.blurcaptureview = true;
  //               }
  //               if (this.mainmenuitems[this.selectedmainmenuindex].viewmode == VIEWMODE.CAMERA) {
  //                 this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].isactive = true;
  //               }
  //               this.scrollToMainmenuElement(this.selectedmainmenuindex);
  //               this.changedetectorref.detectChanges();
  //             }
  //           }
  //         }
  //       }
  //     }
  //   } else {
  //     if (this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].capturedshots.length > 0) {
  //       this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex].questionstatus = true;
  //       this.markShotCompletion(this.selectedshotindex);
  //     }
  //   }
  // }

  // markShotCompletion(index) {
  //   if (this.mainmenuitems[this.selectedmainmenuindex].children.length > 0) {
  //     if (this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[index].shotstatus && this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[index].questionstatus) {
  //       this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[index].ispending = false;

  //       let ispendingset = false;
  //       this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].ispending = false;
  //       this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots.forEach(element => {
  //         if (element.ispending && !ispendingset) {
  //           ispendingset = true;
  //           this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].ispending = true;
  //         }
  //       });
  //       this.markMainMenuCompletion();
  //     }
  //   } else {
  //     this.markMainMenuCompletion();
  //   }
  // }

  // markMainMenuCompletion() {
  //   let ispendingset = false;
  //   if (this.mainmenuitems[this.selectedmainmenuindex].children.length > 0) {
  //     this.mainmenuitems[this.selectedmainmenuindex].ispending = false;
  //     this.mainmenuitems[this.selectedmainmenuindex].children.forEach(element => {
  //       if (element.ispending && !ispendingset) {
  //         ispendingset = true;
  //         this.mainmenuitems[this.selectedmainmenuindex].ispending = true;
  //       }
  //     });
  //   } else {
  //     this.mainmenuitems[this.selectedmainmenuindex].ispending = false;
  //   }
  // }

  //------------------------------------------------------------------------------------------------------------------
  // Answer Submissions for Shot Questions Code
  //------------------------------------------------------------------------------------------------------------------
  handleAnswerSubmission(result) {
    const shotDetail = this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots[this.selectedshotindex];
    shotDetail.result = result;
    this.activeForm.get(shotDetail.inputformcontrol).setValue(result);
    this.markshotcompletion();
  }

  handleInputSubmission(form: FormGroup) {
    const activechild = this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex];
    const control = form.get(activechild.shots[this.selectedshotindex].inputformcontrol);
    if (control.value != '') {
      this.handleAnswerSubmission(control.value);
    } else {
      control.markAsTouched();
      control.markAsDirty();
    }
  }

  handleInputTextSubmission(form: FormGroup) {
    const activechild = this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex];
    const control = form.get(activechild.shots[this.selectedshotindex].inputformcontrol);
    if (activechild.shots[this.selectedshotindex].questiontype === QUESTIONTYPE.INPUT_INVERTER_DETAILS) {
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

  handleInverterFieldsSubmission() {
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
  }

  handleUtilitySubmission() {
    const utilitycontrol = this.activeForm.get('utility');
    if (utilitycontrol.value != '') {
      this.markshotcompletion();
    } else {
      utilitycontrol.markAsTouched();
      utilitycontrol.markAsDirty();
    }
  }

  handleRoofMaterialSubmission() {
    const roofmaterialcontrol = this.activeForm.get('roofmaterial');
    if (roofmaterialcontrol.value != '') {
      this.markshotcompletion();
    } else {
      roofmaterialcontrol.markAsTouched();
      roofmaterialcontrol.markAsDirty();
    }
  }

  handleExistence(doesexist: boolean) {
    this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].isexistencechecked = true;
    this.blurcaptureview = false;
    if (doesexist) {
      this.activeForm.get(this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].inputformcontrol).setValue(true);
      this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots = this.originalmainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots;
    } else {
      this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].shots.forEach(element => {
        element.ispending = false;
        element.shotstatus = true;
        element.questionstatus = true;
      });
      this.activeForm.get(this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].inputformcontrol).setValue(false);
      // this.handleMenuSwitch(false);
    }
  }

  selectcapturedshot(shotindex) {
    this.selectedshotindex = shotindex;
  }

  allowusertorecaptureshot(event) {
    event.preventDefault();
    let currentmainmenu = this.mainmenuitems[this.selectedmainmenuindex];
    let currentsubmenu = this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex];
    let shot = currentsubmenu.shots[this.selectedshotindex];
    shot.shotstatus = false;
    shot.ispending = true;
    shot.isactive = true;
    currentsubmenu.ispending = true;
    currentmainmenu.ispending = true;
    currentsubmenu.capturedshots[this.selectedshotindex].shotimage = "";
    currentsubmenu.capturedshots[this.selectedshotindex].imagecleared = true;
    this.recapturingmode = true;
  }

  //------------------------------------------------------------------------------------------------------------------
  // Toggle Menus Manually Methods
  //------------------------------------------------------------------------------------------------------------------

  // toggleMainMenuSelection(index) {
  //   // Unset previous menu and select new one
  //   this.mainmenuitems[this.selectedmainmenuindex].isactive = false;
  //   this.selectedmainmenuindex = index;
  //   this.mainmenuitems[this.selectedmainmenuindex].isactive = true;

  //   this.lookForNextPendingItem();

  //   this.changedetectorref.detectChanges();
  // }

  // toggleSubMenuSelection(index) {
  //   this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].isactive = false;
  //   this.selectedsubmenuindex = index;
  //   this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].isactive = true;
  //   this.selectedshotindex = 0;

  //   if (this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].checkexistence && !this.mainmenuitems[this.selectedmainmenuindex].children[this.selectedsubmenuindex].isexistencechecked) {
  //     this.blurcaptureview = true;
  //     this.changedetectorref.detectChanges();
  //     this.animateElementOpacity(document.querySelector('.checkexistenceview'));
  //   }
  // }

  // lookForNextPendingItem(){
  //   if (this.mainmenuitems[this.selectedmainmenuindex].children.length > 0) {
  //     let issubmenuset = false;
  //     this.mainmenuitems[this.selectedmainmenuindex].children.forEach(element => {
  //       element.isactive = false;
  //     });
  //     this.mainmenuitems[this.selectedmainmenuindex].children.forEach(element => {
  //       if (element.ispending && !issubmenuset) {
  //         console.log("next pending item---"+element.name);
  //         element.isactive = true;
  //         issubmenuset = true;
  //         this.selectedsubmenuindex = this.mainmenuitems[this.selectedmainmenuindex].children.indexOf(element);
  //         let isshotmenuset = false;
  //         element.shots.forEach(shot => {
  //           if (shot.ispending && !isshotmenuset) {
  //             console.log("next pending shot---"+shot.shotinfo);
  //             shot.isactive = true;
  //             isshotmenuset = true;
  //             this.selectedshotindex = element.shots.indexOf(shot);
  //           }
  //         });

  //         if (element.checkexistence && !element.isexistencechecked) {
  //           this.blurcaptureview = true;
  //           this.changedetectorref.detectChanges();
  //           this.animateElementOpacity(document.querySelector('.checkexistenceview'));
  //         }
  //       }
  //     });
  //   }
  //   this.changedetectorref.detectChanges();
  // }
}
