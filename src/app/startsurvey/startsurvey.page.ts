import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { SurveyStorageModel } from '../model/survey-storage.model';
import { User } from '../model/user.model';
import { StorageService } from '../storage.service';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';

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

  user: User;
  surveyid: number;
  surveytype: string;
  surveycity: string;
  surveystate: string;

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
    private changedetectorref: ChangeDetectorRef) { }

  ngOnInit() {
    this.user = this.storageuserdata.getUser();
    this.surveyid = +this.route.snapshot.paramMap.get('id');
    this.surveytype = this.route.snapshot.paramMap.get('type');
    this.surveycity = this.route.snapshot.paramMap.get('city');
    this.surveystate = this.route.snapshot.paramMap.get('state');

    this.loadSurveyJSON('pvsurveyjson');
  }

  loadSurveyJSON(type){
    this.datastorage.get(type).then((data) => {
      console.log(data);
      this.createSurveyForm(data[0]);
    });
  }

  createSurveyForm(data){
    this.activeFormElementsArray = [];
    let surveydata = data.sequence;
    const formData = {};
      this.activeFormKeysMap = {};
      surveydata.map(item => {
        if (item.children) {
          item.children.map(child => {
            if (child.inputformcontrol !== '') {
              this.activeFormElementsArray.push(child.inputformcontrol);
              this.activeFormKeysMap[child.inputformcontrol] = child.placeholder =='' ? child.label:child.placeholder;
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
  //Camera Picture Taking Methods
  //------------------------------------------------------------------------------------------------------------------

  async openCameraToCapturePic(event){
    event.preventDefault();
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera
    });

    this.capturedImage = "data:image/jpeg;base64," + image.base64String;

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

    this.changedetectorref.detectChanges();
  }

  async openPhotoGalleryToSelectPic(event){
    event.preventDefault();
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos
    });

    this.capturedImage = "data:image/jpeg;base64," + image.base64String;

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

    this.changedetectorref.detectChanges();
  }

}
