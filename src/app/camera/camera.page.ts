import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage implements OnInit {

  surveyId = 12;
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
    private diagnostic: Diagnostic
  ) {
    this.selectMenu(this.mainMenu[0], 0);
    this.selectSubMenu(this.mainMenu[0].subMenu[0], 0);

    this.detailsForm = this.formBuilder.group({
      electricityStorage: new FormControl('', [Validators.required]),
      solarModel: new FormControl('', [Validators.required]),
      inverterMake: new FormControl('', [Validators.required]),
      noOfPanelsInstalled: new FormControl('', [Validators.required]),
      permitDesign: new FormControl('', []),
      additionalNotes: new FormControl('', []),
      appliances: this.formBuilder.array([])
    });
    this.addNewAppliance();

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
    this.startCameraAfterPermission();
    // TODO uncomment on device
    // this.diagnostic.requestCameraAuthorization(true).then((mode) => {
    //   console.log(mode);
    //   switch (mode) {
    //     case this.diagnostic.permissionStatus.NOT_REQUESTED:
    //       this.goBack();
    //       break;
    //     case this.diagnostic.permissionStatus.DENIED_ALWAYS:
    //       this.showCameraDenied();
    //       break;
    //     case this.diagnostic.permissionStatus.DENIED_ONCE:
    //       this.showCameraDenied();
    //       break;
    //     case this.diagnostic.permissionStatus.GRANTED:
    //       this.startCameraAfterPermission();
    //       break;
    //     case 'authorized_when_in_use':
    //       this.startCameraAfterPermission();
    //       break;
    //   }
    // }, (error) => {
    //
    // });
  }

  startCameraAfterPermission() {
    this.showCameraInterface = true;
    // TODO uncomment on device
    // this.cameraPreview.startCamera(this.cameraPreviewOpts).then(
    //   (res) => {
    //     console.log(res);
    //   },
    //   (err) => {
    //     console.log(err);
    //   });
  }

  stopCamera() {
    this.showCameraInterface = false;
    // TODO uncomment on device
    // this.cameraPreview.stopCamera().then(result => {
    //   this.showCameraInterface = false;
    // });

  }

  takePicture() {
    this.cameraPreview.takePicture({
      width: 0,
      height: 0,
      quality: 80
    }).then((photo) => {
        this.stopCamera();
        this.selectedImageModel.image = 'data:image/png;base64,' + photo[0];
        this.saveToRootDirectory(photo[0]);
        // this.saveFileToAppDirectory(photo[0]);

        this.listOfImages.push(this.selectedImageModel.image);

        switch (this.selectedImageModel.questionType) {
          case QuestionType.NONE:
            this.captureNextImage();
            break;
          case QuestionType.YES_NO:
            this.showAlertQuestion();
            break;
          case QuestionType.AUTOCOMPLETE:
            this.captureNextImage();
            break;
          case QuestionType.RADIO_BUTTON:
            this.captureNextImage();
            break;
          case QuestionType.STRING:
            this.captureNextImage();
            break;
          case QuestionType.INPUT:
            this.captureNextImage();
            break;
        }
      },
      (error) => {

      }
    );
  }

  captureNextImage() {
    this.shiftToNextImage();
    this.calculateImagePercentage();
    this.startCamera();
  }

  async showAlertQuestion() {
    const buttonOptions = [];
    this.selectedImageModel.questionOptions.forEach(option => {
      const buttonOption = {
        text: option,
        handler: () => {
          this.selectedImageModel.givenAnswer = option;
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

  saveToRootDirectory(base64: string) {
    const UUID = 'img_' + (new Date().getTime()).toString(16);
    this.base64ToGallery.base64ToGallery(base64, { prefix: UUID, mediaScanner: true }).then((result: string) => {
      console.log('Saved to gallery ', result);
      let imageDir = '';
      if (this.selectedSubMenu === '') {
        imageDir = this.file.externalApplicationStorageDirectory + 'files/survey/' + this.surveyId + '/' + this.selectedMenu + '/';
      } else {
        imageDir = this.file.externalApplicationStorageDirectory + 'files/survey/' + this.surveyId + '/' + this.selectedMenu + '/' + this.selectedSubMenu + '/';
      }
      const fileData = result.split('/');
      const fileName = fileData[fileData.length - 1];
      console.log(fileName, ', filename');
      this.file.moveFile('file://storage/emulated/0/', fileName, imageDir, UUID).then((copyResult) => {
        console.log('file copied');
      }, (error) => {
        console.log('error copying file');
      });
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
    if (menu.subMenu != null) {
      if (menu.subMenu.length !== 0) {
        this.selectSubMenu(menu.subMenu[0], 0);
      } else {
        this.selectedSubMenuModel = null;
        this.selectedSubMenu = menu.name;
        this.itemName = menu.name;
      }
    }

    if (menu.imageModel === null && menu.subMenu === null) {
      this.showForm = true;
      // this.showCameraInterface = false;
      this.startCamera();
    } else {
      // this.showCameraInterface = true;
      this.showForm = false;
      this.startCamera();
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
  }

  checkAlreadyExistingImage() {
    if (this.selectedImageModel.image !== '') {
      this.shiftToNextImage();
    }
  }

  saveSurvey() {
    if (this.detailsForm.status === 'INVALID') {
      this.showInvalidFormAlert();
    } else {
      this.utilities.showSuccessModal('Survey have been saved').then((modal) => {
        modal.present();
        modal.onWillDismiss().then((dismissed) => {
          this.navController.navigateRoot('homepage');
        });
      }, (error) => {

      });
    }
  }

  showInvalidFormAlert() {
    let error = 'Invalid Data';
    // Object.keys(this.detailsForm.controls).forEach((key: string) => {
    //   const control: AbstractControl = this.detailsForm.get(key);
    //   if (control.invalid) {
    //     if (error !== '') {
    //       error = error + '<br/>';
    //     }
    //     if (control.errors.required === true) {
    //       error = error + this.utilities.capitalizeWord(key) + ' is required';
    //     }
    //     if (control.errors.email === true) {
    //       error = error + 'Invalid email';
    //     }
    //     if (control.errors.error !== null && control.errors.error !== undefined) {
    //       error = error + control.errors.error;
    //     }
    //   }
    // });
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
}
