import { Component, OnInit } from '@angular/core';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview/ngx';
import { ActivatedRoute } from '@angular/router';
import { GOOGLE_API_KEY } from '../model/constants';
import { HttpClient } from '@angular/common/http';
import { NavController, AlertController } from '@ionic/angular';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';

export interface MAINMENU {
  name: string;
  isactive: boolean;
  children: CHILDREN[];
}

export interface CHILDREN {
  name: string;
  isactive: boolean;
  ispending: boolean;
  shotscount: number;
  shots: SHOT[];
}

export interface SHOT {
  isactive: boolean;
  ispending: boolean;
  shotinfo: string;
  questioninfo: string;
  question: string;
  positiveaction: string;
  negativeaction: string;
  result: string;
  capturedimages: string[];
}

@Component({
  selector: 'app-surveyprocess',
  templateUrl: './surveyprocess.page.html',
  styleUrls: ['./surveyprocess.page.scss'],
})
export class SurveyprocessPage implements OnInit {

  mainmenuitems: MAINMENU[];
  selectedmainmenuindex = 0;
  selectedsubmenuindex = 0;

  cameraPreviewOpts: CameraPreviewOptions;
  capturedImage: string;

  currentzoom = 2;
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

  constructor(
    private cameraPreview: CameraPreview,
    private route: ActivatedRoute,
    private http: HttpClient,
    private diagnostic: Diagnostic,
    private navController: NavController,
    private alertController: AlertController) {
    this.surveyid = +this.route.snapshot.paramMap.get('id');
    this.surveytype = this.route.snapshot.paramMap.get('type');
    this.latitude = +this.route.snapshot.paramMap.get('lat');
    this.longitude = +this.route.snapshot.paramMap.get('long');
    this.googleimageurl = this.googleimageurl + '&center=' + this.latitude + ',' + this.longitude;
    this.googleimageurl = this.googleimageurl + '&&markers=size:normal|color:red|' + this.latitude + ',' + this.longitude;

    if (this.surveytype == "battery") {
      console.log("is battery");
      this.http
        .get("assets/surveyprocessjson/battery.json")
        .subscribe((data) => {
          this.mainmenuitems = JSON.parse(JSON.stringify(data));
          this.isdataloaded = true;
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

  toggleSidebar(isopen: boolean) {
    this.issidemenucollapsed = isopen;
  }

  toggleGallerybar(isopen: boolean) {
    this.isgallerymenucollapsed = isopen;
  }

  toggleMainMenuSelection(index){
    //Unset previous menu and select new one
    this.mainmenuitems[this.selectedmainmenuindex].isactive = false;
    this.selectedmainmenuindex = index;
    this.mainmenuitems[this.selectedmainmenuindex].isactive = true;

    var issubmenuset = false;
    this.mainmenuitems[this.selectedmainmenuindex].children.forEach(element => {
      if (element.ispending && !issubmenuset){
        console.log(element.name);
        element.isactive = true;
        issubmenuset = true;
        this.selectedsubmenuindex = this.mainmenuitems[this.selectedmainmenuindex].children.indexOf(element);
      }
    });
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
    this.cameraPreview.setZoom(this.currentzoom);
  }

  takePicture() {
    if (this.hardwareCameraEnabled) {
      this.cameraPreview.takePicture({
        width: 0,
        height: 0,
        quality: 85
      }).then((photo) => {
        this.capturedImage = 'data:image/png;base64,' + photo;
      },
        (error) => {

        }
      );
    } else {
    }
  }
}
