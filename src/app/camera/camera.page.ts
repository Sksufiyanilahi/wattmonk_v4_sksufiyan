import { Component, OnInit } from '@angular/core';
import {
  CameraPreview,
  CameraPreviewOptions
} from '@ionic-native/camera-preview/ngx';
import { NavController, Platform } from '@ionic/angular';
import { MenuModel } from './menu.model';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage implements OnInit {

  surveyTime = new Date().getTime();
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
    private platform: Platform
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
    this.cameraPreview.takePicture({
      width: 0,
      height: 0,
      quality: 80
    }).then((photo) => {
      this.base64ToGallery.base64ToGallery(photo, { prefix: 'img', mediaScanner: true }).then((result) => {
        console.log('Saved to gallery ', result);
      }, (error) => {
        console.log('Error', error);
      });
      console.log(photo);
    }, error => {
      console.log(error);
    });
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
