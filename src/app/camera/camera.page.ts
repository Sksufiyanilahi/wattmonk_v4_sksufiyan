import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CameraPreview, CameraPreviewOptions } from '@ionic-native/camera-preview/ngx';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { ImageModel, MenuModel, MenuSubModel, QuestionType } from './menu.model';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';
import { File } from '@ionic-native/file/ngx';
import { CAMERA_MODULE_MENU } from '../model/constants';
import { Storage } from '@ionic/storage';
import { UtilitiesService } from '../utilities.service';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SolarMake } from '../model/solar-make.model';
import { SolarMadeModel } from '../model/solar-made.model';
import { InverterMadeModel } from '../model/inverter-made.model';
import { InverterMakeModel } from '../model/inverter-make.model';
import { ErrorModel } from '../model/error.model';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage implements OnInit {

  surveyId: number;
  itemName = 'MSP';

  cameraPreviewOpts: CameraPreviewOptions;

  selectedMenu = 'Electricals';
  selectedSubMenu = 'MSP';

  mainMenu: MenuModel[] = JSON.parse(JSON.stringify(CAMERA_MODULE_MENU));

  subMenu: MenuSubModel[] = [];

  selectedMenuModel: MenuModel;
  selectedSubMenuModel: MenuSubModel;
  selectedImageModel: ImageModel;
  showCameraInterface = true;
  showForm = true;
  listOfImages: string[] = [];
  totalPercent = 0;
  selectedMenuIndex = 0;
  selectedSubMenuIndex = 0;
  selectedImageModelIndex = 0;
  detailsForm: FormGroup;
  listOfSolarMake: SolarMake[] = [];
  listOfSolarMade: SolarMadeModel[] = [];

  listOfInverterMade: InverterMadeModel[] = [];
  listOfInverterMake: InverterMakeModel[] = [];

  constructor(
    private cameraPreview: CameraPreview,
    private navController: NavController,
    private base64ToGallery: Base64ToGallery,
    private platform: Platform,
    private file: File,
    private storage: Storage,
    private alertController: AlertController,
    private utilities: UtilitiesService,
    private formBuilder: FormBuilder,
    private diagnostic: Diagnostic,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private apiService: ApiService
  ) {
    this.surveyId = +this.route.snapshot.paramMap.get('id');
    this.selectMenu(this.mainMenu[0], 0);
    this.selectSubMenu(this.mainMenu[0].subMenu[0], 0);

    this.detailsForm = this.formBuilder.group({
      modulemake: new FormControl('', [Validators.required]),
      modulemodel: new FormControl('', [Validators.required]),
      invertermake: new FormControl('', [Validators.required]),
      invertermodel: new FormControl('', [Validators.required]),
      numberofmodules: new FormControl('', [Validators.required]),
      permitDesign: new FormControl('', []),
      additionalNotes: new FormControl('', []),
      // appliances: this.formBuilder.array([]),
      batterybackup: new FormControl('', [Validators.required]),
      servicefeedsource: new FormControl('', [Validators.required]),
      mainbreakersize: new FormControl('', [Validators.required]),
      msprating: new FormControl('', [Validators.required]),
      msplocation: new FormControl('', [Validators.required]),
      mspbreaker: new FormControl('', [Validators.required]),
      utilitymeter: new FormControl('', [Validators.required]),
      pvinverterlocation: new FormControl('', [Validators.required]),
      pvmeter: new FormControl('', [Validators.required]),
      acdisconnect: new FormControl('', [Validators.required])
    });

    this.detailsForm.get('modulemake').valueChanges.subscribe(val => {
      this.getSolarMade();
    });
    this.detailsForm.get('invertermake').valueChanges.subscribe(val => {
      this.getInverterMade();
    });
    this.getSolarMake();
    this.getInverterMake();
    // this.addNewAppliance();

  }


  ngOnInit() {
    this.platform.backButton.subscribe(() => {
      this.cameraPreview.stopCamera();
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


    this.startCamera();

  }

  getSolarMade() {
    this.utilities.showLoading('Getting solar models').then((success) => {
      this.apiService.getSolarMade(this.detailsForm.get('modulemake').value).subscribe(response => {
        this.utilities.hideLoading();
        console.log(response);
        this.listOfSolarMade = response;
        this.detailsForm.patchValue({
          modulemodel: ''
        });
      }, responseError => {
        this.utilities.hideLoading();
        const error: ErrorModel = responseError.error;
        this.utilities.errorSnackBar(error.message[0].messages[0].message);
      });
    }, (error) => {

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

  getInverterMade() {
    console.log(this.detailsForm.get('invertermake').value);
    this.utilities.showLoading('Getting inverter models').then((success) => {
      this.apiService.getInverterMade(this.detailsForm.get('invertermake').value).subscribe(response => {
        this.utilities.hideLoading();
        console.log(response);
        this.listOfInverterMade = response;
        this.detailsForm.patchValue({
          invertermodel: ''
        });
      }, responseError => {
        this.utilities.hideLoading();
        const error: ErrorModel = responseError.error;
        this.utilities.errorSnackBar(error.message[0].messages[0].message);
      });
    }, (reject) => {

    });

  }

  getInverterMake() {
    this.apiService.getInverterMake().subscribe(response => {
      console.log(response);
      this.listOfInverterMake = response;
      console.log(this.listOfInverterMake);
      this.cd.detectChanges();
    }, responseError => {
      const error: ErrorModel = responseError.error;
      this.utilities.errorSnackBar(error.message[0].messages[0].message);
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
            this.navController.pop();
          }
        }
      ],
      backdropDismiss: false
    });
    await alert.present();
  }

  startCamera() {
    // this.startCameraAfterPermission();
    // return;
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
  }

  startCameraAfterPermission() {
    this.showCameraInterface = true;
    this.cameraPreview.startCamera(this.cameraPreviewOpts).then(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      });
  }

  stopCamera() {
    this.showCameraInterface = false;
    this.cameraPreview.stopCamera().then(result => {
      this.showCameraInterface = false;
    });

  }

  takePicture() {
    // this.handleSaveImage('iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEXMzMyWlpaqqqq3t7fFxcW+vr6xsbGjo6OcnJyLKnDGAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABAElEQVRoge3SMW+DMBiE4YsxJqMJtHOTITPeOsLQnaodGImEUMZEkZhRUqn92f0MaTubtfeMh/QGHANEREREREREREREtIJJ0xbH299kp8l8FaGtLdTQ19HjofxZlJ0m1+eBKZcikd9PWtXC5DoDotRO04B9YOvFIXmXLy2jEbiqE6Df7DTleA5socLqvEFVxtJyrpZFWz/pHM2CVte0lS8g2eDe6prOyqPglhzROL+Xye4tmT4WvRcQ2/m81p+/rdguOi8Hc5L/8Qk4vhZzy08DduGt9eVQyP2qoTM1zi0/uf4hvBWf5c77e69Gf798y08L7j0RERERERERERH9P99ZpSVRivB/rgAAAABJRU5ErkJggg==');
    this.cameraPreview.takePicture({
      width: 0,
      height: 0,
      quality: 80
    }).then((photo) => {
        this.stopCamera();
        this.handleSaveImage(photo[0]);
      },
      (error) => {

      }
    );
  }

  handleSaveImage(photo: string) {
    this.selectedImageModel.image = 'data:image/png;base64,' + photo;
    this.saveToRootDirectory(photo);
    // this.saveFileToAppDirectory(photo[0]);

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
    this.file.resolveDirectoryUrl(this.file.externalApplicationStorageDirectory).then((directory) => {
      let imageDir = '';
      if (this.selectedSubMenu === '') {
        imageDir = directory.fullPath + 'files/survey/' + this.surveyId + '/' + this.selectedMenu + '/';
      } else {
        imageDir = directory.fullPath + 'files/survey/' + this.surveyId + '/' + this.selectedMenu + '/' + this.selectedSubMenu + '/';
      }
      console.log('Saving to ' + imageDir);
      const UUID = 'img_' + (new Date().getTime()).toString(16) + '.png';
      console.log(UUID);
      const blob = this.b64toBlob(image, 'image/png');
      this.file.writeFile(imageDir, UUID, blob, { replace: true }).then(() => {
        console.log('Saved');
      }).catch((err) => {
        console.log('Error writing blob');
        console.log(err);
      });
      //
      // const picName = 'img_' + this.selectedMenu + '_' + this.selectedSubMenu + '_' + 1;
      this.base64ToGallery.base64ToGallery(image, { prefix: UUID, mediaScanner: true }).then((result) => {
        console.log('Saved to gallery ', result);
        this.file.moveFile(this.file.externalDataDirectory, UUID, imageDir, UUID).then((copyResult) => {
          console.log('file copied');
        }, (error) => {
          console.log('error copying file');
        });
      }, (error) => {
        console.log('Error', error);
      });
      // console.log(photo);
    }).catch((error) => {
      console.log('No Directory');
    });
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
    this.cameraPreview.stopCamera().then(() => {
      this.navController.pop();
    }, (error) => {
    });
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
    if (menu.subMenu != null) {
      if (menu.subMenu.length !== 0) {
        this.selectSubMenu(menu.subMenu[0], 0);
      } else {
        this.selectedSubMenuIndex = -1;
        this.selectedImageModelIndex = 0;
        this.selectedImageModel = menu.imageModel[0];
        this.selectedSubMenuModel = null;
        this.selectedSubMenu = menu.name;
        this.itemName = menu.name;
      }
    }

    if (menu.imageModel === null && menu.subMenu === null) {
      // setTimeout(() => {
      this.stopCamera();
      this.showForm = true;
      this.getSolarMake();
      this.getInverterMake();
      this.cd.detectChanges();
      // }, 200);
    } else {
      this.startCamera();
      this.showForm = false;
    }
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
    let imageIndex = 0;
    for (let i = 0; i < this.selectedSubMenuModel.images.length; i++) {
      const image = this.selectedSubMenuModel.images[i];
      console.log(image);
      if (image.image === '') {
        this.selectedImageModel = image;
        this.selectedImageModelIndex = imageIndex;
        break;
      }
      imageIndex++;
    }
    if (this.selectedImageModelIndex === -1) {
      this.shiftToNextImage();
    }

    if (this.selectedSubMenuModel.askBeforeImage) {
      this.stopCamera();
      this.askBeforeCapture();
    } else {
      this.startCamera();
    }
  }


  calculateImagePercentage() {
    let total = 0;
    let existing = 0;
    this.mainMenu.forEach((mainMenu) => {
      if (mainMenu.subMenu !== null && mainMenu.imageModel !== null) {
        if (mainMenu.subMenu.length !== 0) {
          mainMenu.subMenu.forEach(submenu => {
            if (submenu.images.length !== 0) {
              submenu.images.forEach(image => {
                total++;
                if (image.image !== '') {
                  existing++;
                }
              });
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

  shiftToNextImage() {
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
      this.shiftToNextImage();
    } else {
      this.startCamera();
    }
  }

  saveSurvey() {
    if (this.detailsForm.status === 'INVALID') {
      this.showInvalidFormAlert();
    } else {
      if (this.totalPercent !== 1) {
        this.utilities.showAlert('Please take all images');
      } else {
        this.utilities.showLoading('Saving Survey').then(() => {
          this.apiService.updateSurveyForm(this.detailsForm.value, this.surveyId).subscribe((data) => {
            this.utilities.hideLoading().then(() => {
              this.utilities.showSuccessModal('Survey have been saved').then((modal) => {
                modal.present();
                modal.onWillDismiss().then((dismissed) => {
                  this.navController.navigateRoot('homepage');
                  this.utilities.sethomepageSurveyRefresh(true);
                });
              });
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

  showInvalidFormAlert() {
    let error = '';
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
    // this.navController.navigateForward('gallery');
  }


  async showAlertQuestion() {
    const buttonOptions = [];
    this.selectedImageModel.questionOptions.forEach(option => {
      const buttonOption = {
        text: option,
        handler: () => {
          if (this.selectedImageModel.formValueToUpdate !== '') {
            this.detailsForm.get(this.selectedImageModel.formValueToUpdate).setValue(option.toLowerCase());
          }
          console.log(this.detailsForm.value);
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
      header: this.selectedSubMenuModel.name,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.detailsForm.get(this.selectedSubMenuModel.formControlToUpdate).setValue(false);
            this.shiftToNextImage();
            console.log(this.detailsForm.value);
          }
        }, {
          text: 'Yes',
          handler: () => {
            this.detailsForm.get(this.selectedSubMenuModel.formControlToUpdate).setValue(true);
            this.startCamera();
            console.log(this.detailsForm.value);
          }
        }
      ]
    });

    await alert.present();
  }

  async showAlertWithInputNumber() {
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
                this.detailsForm.get(this.selectedImageModel.formValueToUpdate).setValue(data.input.toLowerCase());
              }
              console.log(this.detailsForm.value);
              this.selectedImageModel.givenAnswer = data.input.toLowerCase();
              this.captureNextImage();
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async showAlertWithInputString() {
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
                this.detailsForm.get(this.selectedImageModel.formValueToUpdate).setValue(data.input.toLowerCase());
              }
              console.log(this.detailsForm.value);
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
                this.detailsForm.get(this.selectedImageModel.formValueToUpdate).setValue(data.toLowerCase());
              }
              console.log(this.detailsForm.value);
              console.log(data);
              this.selectedImageModel.givenAnswer = data.toLowerCase();
              this.captureNextImage();
            }
          }
        }
      ]
    });

    await alert.present();
  }
}
