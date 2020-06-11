import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CameraPreview, CameraPreviewOptions } from '@ionic-native/camera-preview/ngx';
import { AlertController, IonGrid, ModalController, NavController, Platform } from '@ionic/angular';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { ImageModel, MenuModel, MenuSubModel, QuestionType } from './menu.model';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';
import {
  CAMERA_MODULE_MENU_BATTERY,
  CAMERA_MODULE_MENU_PV,
  CAMERA_MODULE_MENU_PV_BATTERY,
  GOOGLE_API_KEY,
  ImageUploadModel,
  MapPageType
} from '../model/constants';
import { Storage } from '@ionic/storage';
import { UtilitiesService } from '../utilities.service';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SolarMake } from '../model/solar-make.model';
import { SolarMadeModel } from '../model/solar-made.model';
import { ErrorModel } from '../model/error.model';
import { ApiService } from '../api.service';
import { InverterSelectionPage } from './inverter-selection/inverter-selection.page';
import { UtilitiesSelectionComponent } from './utilities-selection/utilities-selection.component';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { SurveyStorageModel } from '../model/survey-storage.model';
import { LeftoverImagesModel } from '../model/leftover-images.model';
import { ImageErrorListComponent } from './image-error-list/image-error-list.component';
import html2canvas from 'html2canvas';

// import * as html2canvas from 'html2canvas';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage implements OnInit {

  // @ViewChild('contentArea', { static: true }) content: IonContent;
  @ViewChild('header', { static: true }) header: IonGrid;

  page: MapPageType = MapPageType.NONE;
  PageType = MapPageType;

  surveyId: number;
  itemName = 'MSP';

  cameraPreviewOpts: CameraPreviewOptions;

  selectedMenu = 'Electricals';
  selectedSubMenu = 'MSP';

  mainMenu: MenuModel[] = [];
  subMenu: MenuSubModel[] = [];

  selectedMenuModel: MenuModel;
  selectedSubMenuModel: MenuSubModel;
  selectedImageModel: ImageModel;
  listOfImages: string[] = [];
  totalPercent = 0;
  selectedMenuIndex = 0;
  selectedSubMenuIndex = 0;
  selectedImageModelIndex = 0;
  detailsForm: FormGroup;
  pvDetailsForm: FormGroup;
  listOfSolarMake: SolarMake[] = [];
  listOfRoofMaterial: SolarMake[] = [];
  listOfSolarMade: SolarMadeModel[] = [];

  hardwareCameraEnabled = false;
  imageAreaHeight = 600;
  imageUploadIndex = 1;
  totalImagesToUpload = 1;
  surveyType: string;
  prelimUrl = '';
  latitude: number;
  longitude: number;
  googleImageUrl = 'https://maps.googleapis.com/maps/api/staticmap?zoom=24&maptype=satellite&size=900x1600&scale=2&key=' + GOOGLE_API_KEY;

  obstacles: any[] = [];
  selectedObstacleIndex = -1;
  private mapCanvas: HTMLCanvasElement;

  constructor(
    private cameraPreview: CameraPreview,
    private navController: NavController,
    private base64ToGallery: Base64ToGallery,
    private platform: Platform,
    private storage: Storage,
    private alertController: AlertController,
    private utilities: UtilitiesService,
    private formBuilder: FormBuilder,
    private diagnostic: Diagnostic,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private apiService: ApiService,
    private modalController: ModalController,
    private fileChooser: FileChooser
  ) {
    this.surveyId = +this.route.snapshot.paramMap.get('id');
    this.surveyType = this.route.snapshot.paramMap.get('type');
    this.latitude = +this.route.snapshot.paramMap.get('lat');
    this.longitude = +this.route.snapshot.paramMap.get('long');
    this.googleImageUrl = this.googleImageUrl + '&center=' + this.latitude + ',' + this.longitude;
    this.googleImageUrl = this.googleImageUrl + '&&markers=size:normal|color:red|' + this.latitude + ',' + this.longitude;

    if (this.isBatterySurvey()) {
      this.detailsForm = this.formBuilder.group({
        modulemake: new FormControl('', [Validators.required]),
        modulemodel: new FormControl('', [Validators.required]),
        invertermake: new FormControl('', [Validators.required]),
        invertermodel: new FormControl('', [Validators.required]),
        numberofmodules: new FormControl('', [Validators.required]),
        additionalNotes: new FormControl('', []),
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

      this.detailsForm.get('modulemake').valueChanges.subscribe(val => {
        this.getSolarMade();
      });

    } else {
      this.pvDetailsForm = this.formBuilder.group({
        additionalNotes: new FormControl('', []),
        servicefeedsource: new FormControl('', [Validators.required]),
        mainbreakersize: new FormControl('', [Validators.required]),
        msprating: new FormControl('', [Validators.required]),
        msplocation: new FormControl('', [Validators.required]),
        mspbreaker: new FormControl('', [Validators.required]),
        utilitymeter: new FormControl('', [Validators.required]),
        utility: new FormControl('', [Validators.required]),
        roofMaterial: new FormControl('', [Validators.required]),
        existingSolarSystem: new FormControl('', [Validators.required]),
        existingSolarSystemDetails: new FormControl(''),
        newConstruction: new FormControl('', [Validators.required]),
        newConstructionplans: new FormControl(''),
        backupsystem: new FormControl(''),
        loadnotbackedup: new FormControl(''),
        status: new FormControl('surveycompleted', [Validators.required])
      });
    }

    this.storage.get(this.surveyId + '').then((data: SurveyStorageModel) => {
      console.log(data);
      if (data) {
        this.mainMenu = data.surveyMenu;
        // calculate progressbar, and position of image to be captured
        this.calculateImagePercentageAndListOfImages();
        // restore form
        Object.keys(data.formData).forEach((key: string) => {
          let control: AbstractControl = null;
          if (this.isBatterySurvey()) {
            control = this.detailsForm.get(key);
          } else {
            control = this.pvDetailsForm.get(key);
          }
          control.setValue(data.formData[key]);
        });

      } else {
        if (this.isBatterySurvey()) {
          this.mainMenu = JSON.parse(JSON.stringify(CAMERA_MODULE_MENU_BATTERY));
        } else if (this.surveyType === 'pv') {
          this.mainMenu = JSON.parse(JSON.stringify(CAMERA_MODULE_MENU_PV));
        } else if (this.surveyType === 'pvbattery') {
          this.mainMenu = JSON.parse(JSON.stringify(CAMERA_MODULE_MENU_PV_BATTERY));
        }
        this.selectMenu(this.mainMenu[0], 0);
        this.selectSubMenu(this.mainMenu[0].subMenu[0], 0);
      }

    });

  }

  ngOnInit() {
    this.platform.backButton.subscribe(() => {
      if (this.hardwareCameraEnabled) {
        this.cameraPreview.stopCamera();
      }
    });

    this.cameraPreviewOpts = {
      x: 0,
      y: 0,
      width: window.screen.width,
      height: window.screen.height,
      camera: 'rear',
      tapPhoto: false,
      tapToFocus: true,
      previewDrag: true,
      toBack: true,
      alpha: 1
    };


  }

  getSolarMade() {
    this.utilities.showLoading('Getting solar models').then((success) => {
      this.apiService.getSolarMade(this.detailsForm.get('modulemake').value).subscribe(response => {
        this.utilities.hideLoading().then(() => {
          console.log(response);
          this.listOfSolarMade = response;
          // this.detailsForm.patchValue({
          //   modulemodel: ''
          // });
        });
      }, responseError => {
        this.utilities.hideLoading().then(() => {
          const error: ErrorModel = responseError.error;
          this.utilities.errorSnackBar(error.message[0].messages[0].message);
        });
      });
    });


  }

  getSolarMake() {
    this.apiService.getSolarMake().subscribe(response => {
      this.listOfSolarMake = response;
      console.log(this.listOfSolarMake);
    }, responseError => {
      const error: ErrorModel = responseError.error;
      console.log(error);
      this.utilities.errorSnackBar(error.message[0].messages[0].message);
    });
  }

  getRoofMaterial() {
    this.utilities.showLoading('Loading').then(() => {
      this.apiService.getRoofMaterial().subscribe(response => {
        this.utilities.hideLoading().then(() => {
          this.listOfRoofMaterial = response;
          console.log(this.listOfRoofMaterial);
        });
      }, responseError => {
        this.utilities.hideLoading().then(() => {
          const error: ErrorModel = responseError.error;
          console.log(error);
          this.utilities.errorSnackBar(error.message[0].messages[0].message);
        });
      });
    });

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

  startCamera() {
    if (this.hardwareCameraEnabled) {
      this.diagnostic.requestCameraAuthorization(true).then((mode) => {
        console.log(mode);
        switch (mode) {
          case this.diagnostic.permissionStatus.NOT_REQUESTED:
            this.goBack();
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

  startCameraAfterPermission() {
    if (this.hardwareCameraEnabled) {
      this.cameraPreview.startCamera(this.cameraPreviewOpts).then(
        (res) => {
          this.page = MapPageType.CAMERA_INTERFACE;
          console.log(res);
        },
        (err) => {
          console.log(err);
        });
    } else {
      this.page = MapPageType.CAMERA_INTERFACE;
    }
  }

  stopCamera() {
    if (this.hardwareCameraEnabled) {
      this.cameraPreview.stopCamera().then(result => {
      });
    }

  }

  takePicture() {
    if (this.hardwareCameraEnabled) {
      this.cameraPreview.takePicture({
        width: 0,
        height: 0,
        quality: 70
      }).then((photo) => {
          this.stopCamera();
          this.page = MapPageType.IMAGE_PREVIEW;
          this.handleSaveImage(photo[0]);
        },
        (error) => {

        }
      );
    } else {
      this.handleSaveImage('iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEXMzMyWlpaqqqq3t7fFxcW+vr6xsbGjo6OcnJyLKnDGAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABAElEQVRoge3SMW+DMBiE4YsxJqMJtHOTITPeOsLQnaodGImEUMZEkZhRUqn92f0MaTubtfeMh/QGHANEREREREREREREtIJJ0xbH299kp8l8FaGtLdTQ19HjofxZlJ0m1+eBKZcikd9PWtXC5DoDotRO04B9YOvFIXmXLy2jEbiqE6Df7DTleA5socLqvEFVxtJyrpZFWz/pHM2CVte0lS8g2eDe6prOyqPglhzROL+Xye4tmT4WvRcQ2/m81p+/rdguOi8Hc5L/8Qk4vhZzy08DduGt9eVQyP2qoTM1zi0/uf4hvBWf5c77e69Gf798y08L7j0RERERERERERH9P99ZpSVRivB/rgAAAABJRU5ErkJggg==');
    }
  }

  handleSaveImage(photo: string) {
    this.selectedImageModel.image = 'data:image/png;base64,' + photo;
    if (this.hardwareCameraEnabled) {
      this.saveToRootDirectory(photo);
      // this.saveFileToAppDirectory(photo[0]);
    }
    this.listOfImages.push(this.selectedImageModel.image);

    switch (this.selectedImageModel.questionType) {
      case QuestionType.NONE:
        this.captureNextImage();
        break;
      case QuestionType.YES_NO:
        this.showAlertQuestion();
        break;
      case QuestionType.RADIO_BUTTON:
        this.showAlertWithRadioButtons();
        break;
      case QuestionType.STRING:
        this.showAlertWithInputString();
        break;
      case QuestionType.INPUT_NUMBER:
        this.showAlertWithInputNumber();
        break;
      case QuestionType.INVERTER_MODEL:
        this.showAlertWithInverterModel();
        break;
      case QuestionType.UTILITIES:
        this.showAlertWithUtilitiesModel();
        break;
      case QuestionType.MORE_PHOTOS:
        this.showAlertForMorePhoto();
        break;
    }
  }

  captureNextImage() {
    // this.startCamera();
    this.shiftToNextImage();
    this.calculateImagePercentage();
  }


  saveToRootDirectory(base64: string) {
    const UUID = 'img_' + (new Date().getTime()).toString(16);
    this.base64ToGallery.base64ToGallery(base64, { prefix: UUID, mediaScanner: true }).then((result: string) => {
      console.log('Saved to gallery ', result);
      // TODO moving to directory
      // let imageDir = '';
      // if (this.selectedSubMenu === '') {
      //   imageDir = this.file.externalApplicationStorageDirectory + 'files/survey/' + this.surveyId + '/' + this.selectedMenu + '/';
      // } else {
      //   imageDir = this.file.externalApplicationStorageDirectory + 'files/survey/' + this.surveyId + '/' + this.selectedMenu + '/' + this.selectedSubMenu + '/';
      // }
      // const fileData = result.split('/');
      // const fileName = fileData[fileData.length - 1];
      // console.log(fileName, ', filename');
      // this.file.moveFile('file://storage/emulated/0/', fileName, imageDir, UUID).then((copyResult) => {
      //   console.log('file copied');
      // }, (error) => {
      //   console.log('error copying file');
      // });
    }, (error) => {
      console.log('Error', error);
    });
  }

  saveFileToAppDirectory(image: string) {
    // this.file.resolveDirectoryUrl(this.file.externalApplicationStorageDirectory).then((directory) => {
    //   let imageDir = '';
    //   if (this.selectedSubMenu === '') {
    //     imageDir = directory.fullPath + 'files/survey/' + this.surveyId + '/' + this.selectedMenu + '/';
    //   } else {
    //     imageDir = directory.fullPath + 'files/survey/' + this.surveyId + '/' + this.selectedMenu + '/' + this.selectedSubMenu + '/';
    //   }
    //   console.log('Saving to ' + imageDir);
    //   const UUID = 'img_' + (new Date().getTime()).toString(16) + '.png';
    //   console.log(UUID);
    //   const blob = this.b64toBlob(image, 'image/png');
    //   this.file.writeFile(imageDir, UUID, blob, { replace: true }).then(() => {
    //     console.log('Saved');
    //   }).catch((err) => {
    //     console.log('Error writing blob');
    //     console.log(err);
    //   });
    //   //
    //   // const picName = 'img_' + this.selectedMenu + '_' + this.selectedSubMenu + '_' + 1;
    //   this.base64ToGallery.base64ToGallery(image, { prefix: UUID, mediaScanner: true }).then((result) => {
    //     console.log('Saved to gallery ', result);
    //     this.file.moveFile(this.file.externalDataDirectory, UUID, imageDir, UUID).then((copyResult) => {
    //       console.log('file copied');
    //     }, (error) => {
    //       console.log('error copying file');
    //     });
    //   }, (error) => {
    //     console.log('Error', error);
    //   });
    //   // console.log(photo);
    // }).catch((error) => {
    //   console.log('No Directory');
    // });
  }

  b64toBlob(b64Data, contentType) {
    contentType = contentType || '';
    const sliceSize = 512;
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
    console.log(b64Data);

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    console.log(blob);
    return blob;
  }

  goBack() {
    if (this.hardwareCameraEnabled) {
      this.cameraPreview.stopCamera().then(() => {
        this.navigateHome(false);
      }, (error) => {
        this.navigateHome(false);
      });
    } else {
      this.navigateHome(false);
    }
  }

  navigateHome(saveData: boolean) {
    if (saveData) {
      const data = this.makeSurveyStorageData();
      data.saved = false;
      this.storage.set(this.surveyId + '', data).then(() => {
        this.utilities.sethomepageSurveyRefresh(true);
        this.navController.navigateRoot('homepage');
      });
    } else {
      this.utilities.sethomepageSurveyRefresh(true);
      this.navController.navigateRoot('homepage');
    }
  }

  makeSurveyStorageData(): SurveyStorageModel {
    const surveyStorageModel = new SurveyStorageModel();
    surveyStorageModel.surveyMenu = this.mainMenu;
    surveyStorageModel.surveyId = this.surveyId;
    if (this.mapCanvas !== null && this.mapCanvas !== undefined) {
      surveyStorageModel.canvasImage = this.mapCanvas.toDataURL();
    }
    if (this.isBatterySurvey()) {
      surveyStorageModel.formData = this.detailsForm.value;
    } else {
      surveyStorageModel.formData = this.pvDetailsForm.value;
    }
    return surveyStorageModel;
  }

  isBatterySurvey(): boolean {
    if (this.surveyType === 'battery') {
      return true;
    } else {
      return false;
    }
  }

  saveForLater() {
    if (this.hardwareCameraEnabled) {
      this.cameraPreview.stopCamera().then(() => {
        this.navigateHome(true);
      }, (error) => {
        this.navigateHome(true);
      });
    } else {
      this.navigateHome(true);
    }
  }

  selectMenu(menu: MenuModel, index: number) {
    this.mainMenu.forEach((menuItem) => {
      menuItem.isSelected = false;
    });
    menu.isSelected = true;
    this.selectedMenuIndex = index;
    this.selectedMenuModel = menu;
    this.selectedMenu = menu.name;
    this.subMenu = menu.subMenu;
    this.itemName = menu.name;
    // if both submenu and imagemodel are null, then it is details form
    if (menu.subMenu === null && menu.imageModel === null) {
      this.stopCamera();
      this.page = MapPageType.DETAILS_FORM;
      this.selectedImageModel = null;
      if (this.isBatterySurvey()) {
        this.getSolarMake();
      } else {
        this.getRoofMaterial();
      }
      this.cd.detectChanges();
    } else {
      if (menu.subMenu !== null && this.subMenu.length !== 0) {
        this.selectSubMenu(menu.subMenu[0], 0);
      } else {
        this.selectedSubMenuIndex = -1;
        this.selectedImageModelIndex = 0;
        this.selectedImageModel = menu.imageModel[0];
        this.selectedSubMenuModel = null;
        this.selectedSubMenu = menu.name;
        this.itemName = menu.name;
        this.checkAlreadyExistingImage();
      }
    }

  }

  selectMenuWithImageIndex(menu: MenuModel, index: number, imageIndex: number) {
    this.mainMenu.forEach((menuItem) => {
      menuItem.isSelected = false;
    });
    menu.isSelected = true;
    this.selectedMenuIndex = index;
    this.selectedMenuModel = menu;
    this.selectedMenu = menu.name;
    this.subMenu = menu.subMenu;
    this.itemName = menu.name;
    this.startCamera();
    this.selectedImageModel = menu.imageModel[imageIndex];
  }

  selectSubMenu(menu: MenuSubModel, index: number) {
    this.subMenu.forEach((menuItem) => {
      menuItem.isSelected = false;
    });
    this.selectedSubMenuModel = menu;
    this.selectedSubMenuIndex = index;
    menu.isSelected = true;
    this.selectedSubMenu = menu.name;
    this.itemName = menu.name;
    this.selectedImageModel = this.selectedSubMenuModel.images[0];
    this.selectedImageModelIndex = 0;
    if (this.selectedImageModel.image !== '') {
      this.stopCamera();
      this.page = MapPageType.IMAGE_PREVIEW_WITH_OPTIONS;
    } else {
      if (this.selectedSubMenuModel.askBeforeImage) {
        this.stopCamera();
        this.page = MapPageType.IMAGE_PREVIEW;
        this.askBeforeCapture();
      } else {
        this.startCamera();
      }
    }
  }

  selectSubMenuWithSubImage(menu: MenuSubModel, index: number, subMenuIndex: number) {
    this.subMenu.forEach((menuItem) => {
      menuItem.isSelected = false;
    });
    this.selectedSubMenuModel = menu;
    this.selectedSubMenuIndex = index;
    menu.isSelected = true;
    this.selectedSubMenu = menu.name;
    this.itemName = menu.name;
    this.selectedImageModel = this.selectedSubMenuModel.images[subMenuIndex];
    this.selectedImageModelIndex = subMenuIndex;
    if (this.selectedImageModel.image !== '') {
      this.stopCamera();
      this.page = MapPageType.IMAGE_PREVIEW_WITH_OPTIONS;
    } else {
      if (this.selectedSubMenuModel.askBeforeImage) {
        this.stopCamera();
        this.page = MapPageType.IMAGE_PREVIEW;
        this.askBeforeCapture();
      } else {
        this.startCamera();
      }
    }
  }


  calculateImagePercentage() {
    let total = 0;
    let existing = 0;
    this.mainMenu.forEach((mainMenu) => {
      if (mainMenu.subMenu !== null && mainMenu.imageModel !== null) {
        if (mainMenu.subMenu.length !== 0) {
          mainMenu.subMenu.forEach((submenu) => {
            if (submenu.askBeforeImage === true) {
              if (submenu.answered === true) {
                if (submenu.images.length !== 0) {
                  submenu.images.forEach(image => {
                    total++;
                    if (image.image !== '') {
                      existing++;
                    }
                  });
                }
              }
            } else {
              if (submenu.images.length !== 0) {
                submenu.images.forEach(image => {
                  total++;
                  if (image.image !== '') {
                    existing++;
                  }
                });
              }
            }

          });
        }
        if (mainMenu.imageModel.length !== 0) {
          mainMenu.imageModel.forEach(image => {
            total++;
            if (image.image !== '') {
              existing++;
            }
          });
        }
      }
    });
    this.totalPercent = existing / total;
  }

  calculateImagePercentageAndListOfImages() {
    this.listOfImages = [];
    let total = 0;
    let existing = 0;
    let mainMenuIndex = -1;
    let subMenuIndex = -1;
    let subMenuImageIndex = -1;
    let mainMenuImageIndex = -1;
    this.mainMenu.forEach((mainMenu, mainMenuPosition) => {
      if (mainMenu.subMenu !== null && mainMenu.imageModel !== null) {

        // check submenu first
        if (mainMenu.subMenu.length !== 0) {
          mainMenu.subMenu.forEach((submenu, subMenuPosition) => {
            if (submenu.images.length !== 0) {
              submenu.images.forEach((image, subMenuImagePosition) => {
                total++;
                if (image.image !== '') {
                  existing++;
                  this.listOfImages.push(image.image);
                } else {
                  if (mainMenuIndex === -1) {
                    mainMenuIndex = mainMenuPosition;
                  }
                  if (subMenuIndex === -1) {
                    subMenuIndex = subMenuPosition;
                  }
                  if (subMenuImageIndex === -1) {
                    subMenuImageIndex = subMenuImagePosition;
                  }
                }
              });
            }
          });
        }
        // check images for main menu
        if (mainMenu.imageModel.length !== 0) {
          mainMenu.imageModel.forEach((image, mainMenuImagePosition) => {
            total++;
            if (image.image !== '') {
              existing++;
              this.listOfImages.push(image.image);
            } else {
              if (mainMenuIndex === -1) {
                mainMenuIndex = mainMenuPosition;
              }
              if (subMenuIndex === -1) {
                if (mainMenuImageIndex === -1) {
                  mainMenuImageIndex = mainMenuImagePosition;
                }
              }
            }
          });
        }
      } else {
        // images and submenu both are null, this is details form
        if (mainMenuIndex === -1) {
          mainMenuIndex = this.mainMenu.length - 1;
        }

      }
    });
    this.totalPercent = existing / total;
    if (mainMenuImageIndex === -1) {
      this.selectMenu(this.mainMenu[mainMenuIndex], mainMenuIndex);
      if (subMenuIndex !== -1) {
        if (subMenuImageIndex !== -1) {
          this.selectSubMenuWithSubImage(this.mainMenu[mainMenuIndex].subMenu[subMenuIndex], subMenuIndex, subMenuImageIndex);
        } else {
          this.selectSubMenu(this.mainMenu[mainMenuIndex].subMenu[subMenuIndex], subMenuIndex);
        }
      }
    } else {
      this.selectMenuWithImageIndex(this.mainMenu[mainMenuIndex], mainMenuIndex, mainMenuImageIndex);
    }
  }

  shiftToNextImage() {
    console.log('Reaching Here');
    // move to next image
    if (this.selectedSubMenuIndex === -1) {
      // this image was not of submenu but main menu
      this.shiftMainMenu();
    } else {
      if (this.selectedSubMenuModel.images.length - 1 > this.selectedImageModelIndex) {
        // submodel has more images to go
        this.selectedImageModelIndex++;
        this.selectedImageModel = this.selectedSubMenuModel.images[this.selectedImageModelIndex];
        this.checkAlreadyExistingImage();
      } else {
        // submodel has no images to go, get next submodel
        this.selectedSubMenuModel.allCaptured = true;
        this.selectedImageModelIndex = -1;
        if (this.mainMenu[this.selectedMenuIndex].subMenu.length - 1 > this.selectedSubMenuIndex) {
          this.selectedSubMenuIndex++;
          this.selectSubMenu(this.mainMenu[this.selectedMenuIndex].subMenu[this.selectedSubMenuIndex], this.selectedSubMenuIndex);
          this.cd.detectChanges();
        } else {
          this.shiftMainMenu();
        }
      }
    }

  }

  shiftMainMenu() {
    if (this.mainMenu.length - 1 > this.selectedMenuIndex) {
      this.selectedMenuIndex++;
      this.selectMenu(this.mainMenu[this.selectedMenuIndex], this.selectedMenuIndex);
      if (this.mainMenu[this.selectedMenuIndex].subMenu != null) {
        if (this.mainMenu[this.selectedMenuIndex].subMenu.length === 0) {
          if (this.mainMenu[this.selectedMenuIndex].imageModel !== null) {
            this.selectedImageModelIndex = 0;
            this.selectedSubMenuIndex = -1;
            this.selectedImageModel = this.mainMenu[this.selectedMenuIndex].imageModel[0];
            this.checkAlreadyExistingImage();
          }
        } else {
          this.selectedSubMenuIndex = 0;
          this.selectSubMenu(this.mainMenu[this.selectedMenuIndex].subMenu[this.selectedSubMenuIndex], this.selectedSubMenuIndex);
        }
      }

    } else {
      this.selectedMenuIndex = -1;
    }
    this.cd.detectChanges();
  }

  checkAlreadyExistingImage() {
    if (this.selectedImageModel.image !== '') {
      this.stopCamera();
      this.page = MapPageType.IMAGE_PREVIEW_WITH_OPTIONS;
    } else {
      this.startCamera();
    }
  }

  checkLeftImages(): LeftoverImagesModel[] {
    const leftOverImages: LeftoverImagesModel[] = [];
    this.mainMenu.forEach((mainMenu, mainMenuPosition) => {
      if (mainMenu.subMenu !== null && mainMenu.imageModel !== null) {

        // check submenu first
        if (mainMenu.subMenu.length !== 0) {
          mainMenu.subMenu.forEach((submenu, subMenuPosition) => {
            if (submenu.images.length !== 0) {
              submenu.images.forEach((image, subMenuImagePosition) => {
                if (image.image === '') {
                  const leftOverImage = new LeftoverImagesModel();
                  if (image.imageTitle === '') {
                    leftOverImage.title = mainMenu.name + ' - ' + submenu.name;
                  } else {
                    leftOverImage.title = mainMenu.name + ' - ' + submenu.name + ' - ' + image.imageTitle;
                  }
                  leftOverImage.mainMenuIndex = mainMenuPosition;
                  leftOverImage.mainMenuImageIndex = -1;
                  leftOverImage.subMenuIndex = subMenuPosition;
                  leftOverImage.subMenuImageIndex = subMenuImagePosition;
                  leftOverImages.push(leftOverImage);
                }
              });
            }
          });
        }
        // check images for main menu
        if (mainMenu.imageModel.length !== 0) {
          mainMenu.imageModel.forEach((image, mainMenuImagePosition) => {
            if (image.image === '') {
              const leftOverImage = new LeftoverImagesModel();
              if (image.imageTitle === '') {
                leftOverImage.title = mainMenu.name;
              } else {
                leftOverImage.title = mainMenu.name + ' - ' + image.imageTitle;
              }
              leftOverImage.mainMenuIndex = mainMenuPosition;
              leftOverImage.mainMenuImageIndex = mainMenuImagePosition;
              leftOverImage.subMenuIndex = -1;
              leftOverImage.subMenuImageIndex = -1;
              leftOverImages.push(leftOverImage);
              this.listOfImages.push(image.image);
            }
          });
        }
      }
    });
    return leftOverImages;
  }

  saveSurvey() {
    if (this.totalPercent !== 1) {
      const imagesLeft = this.checkLeftImages();
      this.showLeftOverImagesAlert(imagesLeft);
    } else {
      if (this.isBatterySurvey()) {
        if (this.detailsForm.status === 'INVALID') {
          this.showInvalidFormAlert();
        } else {
          this.utilities.showLoading('Saving Survey').then(() => {
            this.apiService.updateSurveyForm(this.detailsForm.value, this.surveyId).subscribe((data) => {
              this.utilities.hideLoading().then(() => {
                this.showUpdateImagesAlert();
              });
            }, (error) => {
              this.utilities.hideLoading().then(() => {
                this.utilities.errorSnackBar('Some error occurred');
              });
            });
          });
        }
      } else {
        if (this.pvDetailsForm.status === 'INVALID') {
          this.showInvalidFormAlert();
        } else {
          this.utilities.showLoading('Saving Survey').then(() => {
            this.apiService.updateSurveyForm(this.pvDetailsForm.value, this.surveyId).subscribe((data) => {
              this.utilities.hideLoading().then(() => {
                this.showUpdateImagesAlert();

              });
            }, (error) => {
              this.utilities.hideLoading().then(() => {
                this.utilities.errorSnackBar('Some error occurred');
              });
            });
          });
        }
      }
    }

  }

  async showUpdateImagesAlert() {
    const alert = await this.alertController.create({
      header: 'Save Images',
      subHeader: 'Upload images to server now?',
      buttons: [
        {
          text: 'Later',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            const data = this.makeSurveyStorageData();
            data.saved = true;
            this.storage.set(this.surveyId + '', data);
            this.utilities.showSuccessModal('Survey have been saved').then((modal) => {
              modal.present();
              modal.onWillDismiss().then((dismissed) => {
                this.navController.navigateRoot('homepage');
                this.utilities.sethomepageSurveyRefresh(true);
              });
            });
          }
        }, {
          text: 'Now',
          handler: (data) => {
            this.uploadAllImages();
          }
        }
      ]
    });
    await alert.present();
  }

  uploadAllImages() {
    const mapOfImages: ImageUploadModel[] = [];
    this.mainMenu.forEach((mainMenu) => {
      if (mainMenu.imageModel !== null && mainMenu.imageModel !== undefined) {
        mainMenu.imageModel.forEach((imageModel) => {
          if (imageModel.image !== '') {
            const image = new ImageUploadModel();
            image.key = imageModel.imageUploadTag;
            image.imageData = imageModel.image;
            image.imagename = imageModel.imageName;
            mapOfImages.push(image);
          }

        });
      }
      if (mainMenu.subMenu !== null && mainMenu.subMenu !== undefined) {
        mainMenu.subMenu.forEach((submenu) => {
          submenu.images.forEach((imageModel) => {
            if (imageModel.image !== '') {
              const image = new ImageUploadModel();
              image.key = imageModel.imageUploadTag;
              image.imageData = imageModel.image;
              image.imagename = imageModel.imageName;
              mapOfImages.push(image);
            }
          });
        });
      }
    });
    const image = new ImageUploadModel();
    image.key = 'electricalslocation';
    image.imageData = this.mapCanvas.toDataURL();
    image.imagename = 'electricalslocation';
    mapOfImages.push(image);
    this.utilities.showLoading('Uploading Images').then(() => {
      this.totalImagesToUpload = mapOfImages.length;
      this.uploadImageByIndex(mapOfImages);
    });
  }

  uploadImageByIndex(mapOfImages: ImageUploadModel[]) {
    if (mapOfImages.length !== 0) {
      const imageToUpload = mapOfImages[0];
      const blob = this.utilities.getBlobFromImageData(imageToUpload.imageData);
      let filename = '';
      if (imageToUpload.imagename === '') {
        filename = Date.now().toString() + '.png';
      } else {
        filename = imageToUpload.imagename + '.png';
      }
      this.utilities.setLoadingMessage('Uploading ' + this.imageUploadIndex + ' of ' + this.totalImagesToUpload);
      this.apiService.uploadImage(this.surveyId, imageToUpload.key, blob, filename).subscribe((data) => {
        this.imageUploadIndex++;
        mapOfImages.splice(0, 1);
        this.uploadImageByIndex(mapOfImages);
      }, (error) => {
        this.imageUploadIndex++;
        mapOfImages.splice(0, 1);
        this.uploadImageByIndex(mapOfImages);
      });
    } else {
      this.utilities.hideLoading().then(() => {
        this.utilities.showSuccessModal('Survey have been saved').then((modal) => {
          modal.present();
          modal.onWillDismiss().then((dismissed) => {
            this.storage.remove(this.surveyId + '');
            this.navController.navigateRoot('homepage');
            this.utilities.sethomepageSurveyRefresh(true);
          });
        });
      });
    }
  }

  showInvalidFormAlert() {
    let error = '';
    if (this.isBatterySurvey()) {
      Object.keys(this.detailsForm.controls).forEach((key: string) => {
        const control: AbstractControl = this.detailsForm.get(key);
        if (control.invalid) {
          if (error !== '') {
            error = error + '<br/>';
          }
          console.log(this.detailsForm.get(key));
          if (control.errors.required === true) {
            error = error + this.utilities.capitalizeWord(key) + ' is required';
          }
          if (control.errors.email === true) {
            error = error + 'Invalid email';
          }
          if (control.errors.error !== null && control.errors.error !== undefined) {
            error = error + control.errors.error;
          }
        }
      });
      console.log(this.detailsForm.value);
      this.utilities.showAlert(error);
    } else {
      Object.keys(this.pvDetailsForm.controls).forEach((key: string) => {
        const control: AbstractControl = this.pvDetailsForm.get(key);
        if (control.invalid) {
          if (error !== '') {
            error = error + '<br/>';
          }
          console.log(this.pvDetailsForm.get(key));
          if (control.errors.required === true) {
            error = error + this.utilities.capitalizeWord(key) + ' is required';
          }
          if (control.errors.email === true) {
            error = error + 'Invalid email';
          }
          if (control.errors.error !== null && control.errors.error !== undefined) {
            error = error + control.errors.error;
          }
        }
      });
      console.log(this.pvDetailsForm.value);
      this.utilities.showAlert(error);
    }

  }

  addNewAppliance() {
    const formGroup = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      amp: new FormControl('', [Validators.required])
    });
    this.getAppliances().push(formGroup);
  }

  getAppliances(): FormArray {
    return this.detailsForm.get('appliances') as FormArray;
  }

  removeAppliance(i: number) {
    this.getAppliances().controls.splice(i, 1);
  }

  openGallery() {
    const data = this.makeSurveyStorageData();
    data.saved = false;
    this.storage.set(this.surveyId + '', data);
    this.navController.navigateForward('/gallery/' + this.surveyId);
  }

  async showAlertForMorePhoto() {
    this.stopCamera();
    this.page = MapPageType.IMAGE_PREVIEW;
    const alert = await this.alertController.create({
      header: 'Capture More Photos',
      subHeader: 'Do you want to take more photos?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.shiftToNextImage();
            this.calculateImagePercentage();
          }
        }, {
          text: 'Yes',
          handler: () => {
            this.selectedImageModel.questionType = QuestionType.NONE;
            const subMenuImage: ImageModel = JSON.parse(JSON.stringify(this.selectedSubMenuModel.images[this.selectedSubMenuModel.images.length - 1]));
            const imageName = subMenuImage.imageName.slice(0, subMenuImage.imageName.length - 2) + (this.selectedSubMenuModel.images.length + 1);
            subMenuImage.imageName = imageName;
            subMenuImage.image = '';
            subMenuImage.questionType = QuestionType.MORE_PHOTOS;
            this.selectedSubMenuModel.images.push(subMenuImage);
            this.shiftToNextImage();
            this.calculateImagePercentage();
          }
        }
      ],
      backdropDismiss: false
    });
    await alert.present();
  }

  async showAlertQuestion() {
    this.stopCamera();
    this.page = MapPageType.IMAGE_PREVIEW;
    const buttonOptions = [];
    this.selectedImageModel.questionOptions.forEach(option => {
      const buttonOption = {
        text: option,
        handler: () => {
          if (this.selectedImageModel.formValueToUpdate !== '') {
            if (this.isBatterySurvey()) {
              this.detailsForm.get(this.selectedImageModel.formValueToUpdate).setValue(option.toLowerCase());
            } else {
              this.pvDetailsForm.get(this.selectedImageModel.formValueToUpdate).setValue(option.toLowerCase());
            }
          }
          this.selectedImageModel.givenAnswer = option.toLowerCase();
          this.captureNextImage();
        }
      };
      buttonOptions.push(buttonOption);
    });
    const alert = await this.alertController.create({
      header: this.selectedImageModel.imageTitle,
      subHeader: this.selectedImageModel.popupQuestion,
      buttons: buttonOptions,
      backdropDismiss: false
    });
    await alert.present();
  }

  async askBeforeCapture() {
    const alert = await this.alertController.create({
      header: this.selectedSubMenuModel.questionToAsk,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.selectedSubMenuModel.answered = false;
            this.selectedSubMenuModel.allCaptured = true;
            this.detailsForm.get(this.selectedSubMenuModel.formControlToUpdate).setValue(false);
            this.selectedImageModelIndex = -1;
            if (this.mainMenu[this.selectedMenuIndex].subMenu.length - 1 > this.selectedSubMenuIndex) {
              this.selectedSubMenuIndex++;
              this.selectSubMenu(this.mainMenu[this.selectedMenuIndex].subMenu[this.selectedSubMenuIndex], this.selectedSubMenuIndex);
              this.cd.detectChanges();
            } else {
              this.shiftMainMenu();
            }
          }
        }, {
          text: 'Yes',
          handler: () => {
            this.selectedSubMenuModel.answered = true;
            this.selectedSubMenuModel.allCaptured = true;
            if (this.isBatterySurvey()) {
              this.detailsForm.get(this.selectedSubMenuModel.formControlToUpdate).setValue(true);
            } else {
              this.pvDetailsForm.get(this.selectedSubMenuModel.formControlToUpdate).setValue(true);
            }
            this.startCamera();
          }
        }
      ]
    });
    await alert.present();
  }

  async showAlertWithInputNumber() {
    this.stopCamera();
    this.page = MapPageType.IMAGE_PREVIEW;
    const alert = await this.alertController.create({
      header: this.selectedImageModel.popupTitle,
      subHeader: this.selectedImageModel.popupQuestion,
      inputs: [
        {
          name: 'input',
          type: 'number',
          placeholder: this.selectedImageModel.popupQuestion
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.startCamera();
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            if (data.input === '') {
              this.showAlertWithInputNumber();
            } else {
              if (this.selectedImageModel.formValueToUpdate !== '') {
                if (this.isBatterySurvey()) {
                  this.detailsForm.get(this.selectedImageModel.formValueToUpdate).setValue(data.input.toLowerCase());
                } else {
                  this.pvDetailsForm.get(this.selectedImageModel.formValueToUpdate).setValue(data.input.toLowerCase());
                }
              }
              this.selectedImageModel.givenAnswer = data.input.toLowerCase();
              this.captureNextImage();
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async showAlertWithInverterModel() {
    this.stopCamera();
    this.page = MapPageType.IMAGE_PREVIEW;
    const modal = await this.modalController.create({
      component: InverterSelectionPage
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    console.log(data);
    if (this.isBatterySurvey()) {
      this.detailsForm.patchValue({
        invertermake: data.invertermake,
        invertermodel: data.invertermodel
      });
    } else {
      this.pvDetailsForm.patchValue({
        invertermake: data.invertermake,
        invertermodel: data.invertermodel
      });
    }
    this.captureNextImage();
  }

  async showAlertWithUtilitiesModel() {
    this.stopCamera();
    this.page = MapPageType.IMAGE_PREVIEW;
    const modal = await this.modalController.create({
      component: UtilitiesSelectionComponent
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    console.log(data);
    if (this.isBatterySurvey()) {
      this.detailsForm.patchValue({
        utility: data.utilities
      });
    } else {
      this.pvDetailsForm.patchValue({
        utility: data.utilities
      });
    }

    this.captureNextImage();
  }

  async showAlertWithInputString() {
    this.stopCamera();
    this.page = MapPageType.IMAGE_PREVIEW;
    const alert = await this.alertController.create({
      header: this.selectedImageModel.popupTitle,
      subHeader: this.selectedImageModel.popupQuestion,
      inputs: [
        {
          name: 'input',
          type: 'text',
          placeholder: this.selectedImageModel.popupQuestion
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.startCamera();
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            if (data.input === '') {
              this.showAlertWithInputString();
            } else {
              if (this.selectedImageModel.formValueToUpdate !== '') {
                if (this.isBatterySurvey()) {
                  this.detailsForm.get(this.selectedImageModel.formValueToUpdate).setValue(data.input.toLowerCase());
                } else {
                  this.pvDetailsForm.get(this.selectedImageModel.formValueToUpdate).setValue(data.input.toLowerCase());
                }
              }
              this.selectedImageModel.givenAnswer = data.input.toLowerCase();
              this.captureNextImage();
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async showAlertWithRadioButtons() {
    this.stopCamera();
    this.page = MapPageType.IMAGE_PREVIEW;
    const inputList = [];
    this.selectedImageModel.questionOptions.forEach((item) => {
      const buttonOption = {
        name: 'input',
        type: 'radio',
        label: item,
        value: item.toLowerCase()
      };
      inputList.push(buttonOption);
    });
    const alert = await this.alertController.create({
      header: this.selectedImageModel.popupTitle,
      subHeader: this.selectedImageModel.popupQuestion,
      inputs: inputList,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.startCamera();
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            if (data.input === '') {
              this.showAlertWithRadioButtons();
            } else {
              if (this.selectedImageModel.formValueToUpdate !== '') {
                if (this.isBatterySurvey()) {
                  this.detailsForm.get(this.selectedImageModel.formValueToUpdate).setValue(data.toLowerCase());
                } else {
                  this.pvDetailsForm.get(this.selectedImageModel.formValueToUpdate).setValue(data.toLowerCase());
                }
              }
              this.selectedImageModel.givenAnswer = data.toLowerCase();
              this.captureNextImage();
            }
          }
        }
      ]
    });
    await alert.present();
  }

  retakeImage() {
    this.selectedImageModel.image = '';
    this.selectedImageModel.givenAnswer = '';
    this.startCamera();
  }

  selectFile() {
    this.fileChooser.open()
      .then(uri => this.prelimUrl = uri)
      .catch(e => console.log(e));
  }

  removeFile() {
    this.prelimUrl = '';
  }

  async showLeftOverImagesAlert(imagesLeft: LeftoverImagesModel[]) {
    console.log(imagesLeft);
    const modal = await this.modalController.create({
      component: ImageErrorListComponent,
      componentProps: {
        listOfImages: imagesLeft
      }
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    const image: LeftoverImagesModel = data.imageToLoad;

    if (image.mainMenuImageIndex === -1) {
      this.selectMenu(this.mainMenu[image.mainMenuIndex], image.mainMenuIndex);
      if (image.subMenuIndex !== -1) {
        if (image.subMenuImageIndex !== -1) {
          this.selectSubMenuWithSubImage(this.mainMenu[image.mainMenuIndex].subMenu[image.subMenuIndex], image.subMenuIndex, image.subMenuImageIndex);
        } else {
          this.selectSubMenu(this.mainMenu[image.mainMenuIndex].subMenu[image.subMenuIndex], image.subMenuIndex);
        }
      }
    } else {
      this.selectMenuWithImageIndex(this.mainMenu[image.mainMenuIndex], image.mainMenuIndex, image.mainMenuImageIndex);
    }
    console.log('test');
    console.log(this.listOfImages);
  }

  showMapViewForSurvey() {
    this.stopCamera();
    this.page = MapPageType.MAP_PAGE;
  }

  showCameraViewForSurvey() {
    this.calculateImagePercentageAndListOfImages();
  }

  addObstacle() {
    this.obstacles.push({});
    this.selectedObstacleIndex = this.obstacles.length - 1;
  }

  removeObstacle(index: number) {
    this.obstacles.splice(index, 1);
  }

  saveMap() {
    html2canvas(document.getElementById('mapImageArea'), { allowTaint: true }).then(canvas => {
      this.mapCanvas = canvas;
    });
  }
}
