import { Component, OnInit } from '@angular/core';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview/ngx';
import { ActivatedRoute } from '@angular/router';
import { GOOGLE_API_KEY } from '../model/constants';
import { HttpClient } from '@angular/common/http';
import { NavController, AlertController } from '@ionic/angular';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';

export interface MAINMENU {
  name : string;
  isselected : boolean;
  children : CHILDREN[];
}

export interface CHILDREN {
  name : string;
  isselected : boolean;
  shotscount : number;
  shots : SHOT[];
}

export interface SHOT{
  shotinfo : string;
  question : string;
  positiveaction : string;
  negativeaction : string;
  result : string;
}

@Component({
  selector: 'app-surveyprocess',
  templateUrl: './surveyprocess.page.html',
  styleUrls: ['./surveyprocess.page.scss'],
})
export class SurveyprocessPage implements OnInit {

  mainmenuitems : MAINMENU[];
  submenuitems : CHILDREN[];
  selectedmenu : MAINMENU;
  selectedchild : CHILDREN;
  currentshots : SHOT[];

  cameraPreviewOpts: CameraPreviewOptions;

  hardwareCameraEnabled = true;
  issidemenucollapsed = true;
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

    if(this.surveytype == "battery"){
      console.log("is battery");
      this.http
        .get("assets/surveyprocessjson/battery.json")
        .subscribe((data) => {
           this.mainmenuitems = JSON.parse(JSON.stringify(data));
           this.selectedmenu = this.mainmenuitems[0];
           this.submenuitems = this.selectedmenu.children;
           this.selectedchild = this.selectedmenu.children[0];
          this.currentshots = this.selectedchild.shots;
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

  toggleSidebar(isopen : boolean){
    this.issidemenucollapsed = isopen;
  }

  startCamera() {
    console.log("inside start camera");
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
}
