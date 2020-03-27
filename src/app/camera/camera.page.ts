import { Component, OnInit } from '@angular/core';
import {
  CameraPreview,
  CameraPreviewOptions
} from '@ionic-native/camera-preview/ngx';
import { NavController, Platform } from '@ionic/angular';
import { MenuModel } from './menu.model';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';
import { File } from '@ionic-native/file/ngx';

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

  mainMenu: MenuModel[] = [
    {
      name: 'Electricals',
      isSelected: true,
      surveyCompleted: false,
      subMenu: [
        {
          name: 'MSP',
          isSelected: true,
          surveyCompleted: false,
          subMenu: []
        },
        {
          name: 'PV Meter',
          isSelected: false,
          surveyCompleted: false,
          subMenu: []
        },
        {
          name: 'Utility Meter',
          isSelected: false,
          surveyCompleted: false,
          subMenu: []
        }
      ]
    },
    {
      name: 'Solar',
      isSelected: false,
      surveyCompleted: false,
      subMenu: [
        {
          name: 'Panels',
          isSelected: true,
          surveyCompleted: false,
          subMenu: []
        },
        {
          name: 'Inverter',
          isSelected: false,
          surveyCompleted: false,
          subMenu: []
        },
        {
          name: 'Obstacles',
          isSelected: false,
          surveyCompleted: false,
          subMenu: []
        }
      ]
    },
    {
      name: 'Roof',
      isSelected: false,
      surveyCompleted: false,
      subMenu: []
    },
    {
      name: 'Appliances',
      isSelected: false,
      surveyCompleted: false,
      subMenu: []
    },
    {
      name: 'Details',
      isSelected: false,
      surveyCompleted: false,
      subMenu: []
    }
  ];

  subMenu: MenuModel[] = [];

  constructor(
    private cameraPreview: CameraPreview,
    private navController: NavController,
    private base64ToGallery: Base64ToGallery,
    private platform: Platform,
    private file: File
  ) {
    this.mainMenu[0].isSelected = true;
    this.subMenu = this.mainMenu[0].subMenu;
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

  startCamera() {
    this.cameraPreview.startCamera(this.cameraPreviewOpts).then(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      });
  }

  takePicture() {
    this.file.resolveDirectoryUrl(this.file.externalApplicationStorageDirectory).then((directory) => {
      console.log('Directory exists ' + directory.name);
      console.log('Directory path ' + directory.fullPath);
      this.cameraPreview.takePicture({
        width: 0,
        height: 0,
        quality: 80
      }).then((photo) => {
        let imageDir = '';
        if (this.selectedSubMenu === '') {
          imageDir = directory.fullPath + 'survey/' + this.surveyId + '/' + this.selectedMenu + '/';
        } else {
          imageDir = directory.fullPath + 'survey/' + this.surveyId + '/' + this.selectedMenu + '/' + this.selectedSubMenu + '/';
        }
        console.log('Saving to ' + imageDir);
        const UUID = 'img_' + (new Date().getTime()).toString(16);
        const blob = this.b64toBlob(photo[0], 'image/png');
        this.file.writeFile(imageDir, UUID, blob).then(() => {
          console.log('Saved');
        }).catch((err) => {
          console.log('Error writing blob');
          console.log(err);
        });

        const picName = 'img_' + this.selectedMenu + '_' + this.selectedSubMenu + '_' + 1;
        this.base64ToGallery.base64ToGallery(photo[0], { prefix: picName, mediaScanner: true }).then((result) => {
          console.log('Saved to gallery ', result);
        }, (error) => {
          console.log('Error', error);
        });
        console.log(photo);
      }, error => {
        console.log(error);
      });
    }).catch((error) => {
      console.log('No Directory');
    });

  }

  b64toBlob(b64Data, contentType) {
    contentType = contentType || '';
    const sliceSize = 512;
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

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
    return blob;
  }

  goBack() {
    this.cameraPreview.stopCamera().then(() => {
      this.navController.pop();
    }, (error) => {
    });
  }

  selectMenu(menu: MenuModel) {
    this.mainMenu.forEach((menuItem) => {
      menuItem.isSelected = false;
    });
    menu.isSelected = true;
    this.selectedMenu = menu.name;
    this.subMenu = menu.subMenu;
    if (menu.subMenu.length !== 0) {
      this.selectSubMenu(menu.subMenu[0]);
    } else {
      this.selectedSubMenu = '';
    }

  }

  selectSubMenu(menu: MenuModel) {
    this.subMenu.forEach((menuItem) => {
      menuItem.isSelected = false;
    });
    menu.isSelected = true;
    this.selectedSubMenu = menu.name;
    this.itemName = menu.name;
  }

}
