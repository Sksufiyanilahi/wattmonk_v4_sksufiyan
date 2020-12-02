import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, ModalController } from '@ionic/angular';
import { StorageService } from '../storage.service';
import { ApiService } from '../api.service';
import { Storage } from '@ionic/storage';
import { SurveyStorageModel } from '../model/survey-storage.model';
import { ImageUploadModel } from '../model/constants';
import { UtilitiesService } from '../utilities.service';
import { User } from '../model/user.model';
import { PaymentgatewayPageModule } from '../paymentgateway/paymentgateway.module';
import { PaymentgatewayPage } from '../paymentgateway/paymentgateway.page';
import { AddMoneyPage } from '../add-money/add-money.page';
import { Router } from '@angular/router';
import { Intercom } from 'ng-intercom';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  imageUploadIndex = 1;
  totalImagesToUpload = 0;
  totalSurveys = 0;
  surveyIndex = 1;
  listOfSurveysToSave: SurveyStorageModel[] = [];
  enableDisable:boolean=false;
profile:any;
  user: User;

  constructor(
    private navController: NavController,
    private apiService: ApiService,
    private storage: StorageService,
    private deviceStorage: Storage,
    private utilities: UtilitiesService,
    private toastController: ToastController,
    public modalController: ModalController,
    public router:Router,
    private intercom:Intercom
  ) {
  }

  ngOnInit() {
    this.enableDisable= false;
    this.user = this.storage.getUser();
    console.log(this.user);
    this.getProfileData();

  }
  ionViewDidEnter(){
    this.intercom.hide();
   this.getProfileData();
  }
  goBack() {
    this.navController.pop();
  }

getProfileData(){
this.apiService.getProfileDetails().subscribe(res=>{
  console.log(res);
  this.profile=res;
  console.log(this.profile)
})
}

AddWallet()
 {
   this.router.navigate(['add-money',{mode:'wallet'}]);

}

  async logout() {
    this.enableDisable= true;
    const toast = await this.toastController.create({
      header: 'Please confirm',
      message: 'Are you sure you want to logout?',
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.storage.logout();
            this.deviceStorage.clear();
            this.intercom.hide();
            this.apiService.resetHeaders();
            this.navController.navigateRoot('login');
          }
        }, {
          text: 'No',
          handler:()=>{
            this.enableDisable= false;
          }
        }
      ]
    });
    await toast.present();

  }

  syncSurvey() {
    this.listOfSurveysToSave = [];
    this.deviceStorage.keys().then((listOfKeys) => {
      listOfKeys.forEach((item) => {
        this.deviceStorage.get(item).then((data: SurveyStorageModel) => {
          if (data.saved) {
            this.listOfSurveysToSave.push(data);
          }
        });
      });
    });
    this.utilities.showLoading('Uploading Images').then(() => {
      this.totalSurveys = this.listOfSurveysToSave.length;
      this.uploadAllSurveys();
    });
  }

  uploadAllSurveys() {
    if (this.listOfSurveysToSave.length !== 0) {
      this.uploadAllImagesOfSurvey(this.listOfSurveysToSave[0]);
    } else {
      this.utilities.hideLoading().then(() => {
        this.utilities.showSuccessModal('Survey images have been uploaded').then((modal) => {
          modal.present();
        });
      });
    }
  }

  uploadAllImagesOfSurvey(surveyData: SurveyStorageModel) {
    const mapOfImages: ImageUploadModel[] = [];
    surveyData.surveyMenu.forEach((mainMenu) => {
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
    image.imageData = surveyData.canvasImage;
    image.imagename = 'electricalslocation';
    mapOfImages.push(image);

    this.imageUploadIndex = 1;
    this.totalImagesToUpload = mapOfImages.length;
    this.uploadImageByIndex(mapOfImages, surveyData.surveyid);

  }

  uploadImageByIndex(mapOfImages: ImageUploadModel[], surveyId: number) {
    if (mapOfImages.length !== 0) {
      const imageToUpload = mapOfImages[0];
      const blob = this.utilities.getBlobFromImageData(imageToUpload.imageData);
      let filename = '';
      if (imageToUpload.imagename === '') {
        filename = Date.now().toString() + '.png';
      } else {
        filename = imageToUpload.imagename + '.png';
      }
      this.utilities.setLoadingMessage('Uploading Image ' + this.imageUploadIndex + '/' + this.totalImagesToUpload + ' of survey ' + this.surveyIndex + '/' + this.totalSurveys);
      this.apiService.uploadImage(surveyId, imageToUpload.key, blob, filename).subscribe((data) => {
        this.imageUploadIndex++;
        mapOfImages.splice(0, 1);
        this.uploadImageByIndex(mapOfImages, surveyId);
      }, (error) => {
        this.imageUploadIndex++;
        mapOfImages.splice(0, 1);
        this.uploadImageByIndex(mapOfImages, surveyId);
      });
    } else {
      this.deviceStorage.remove(surveyId + '');
      this.surveyIndex++;
      this.listOfSurveysToSave.splice(0, 1);
      this.uploadAllSurveys();
    }
  }

  async addPoints(){
    this.navController.navigateForward('/paymentgateway');
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
   this.intercom.hide();
  }
}
