import { Component, OnInit } from '@angular/core';
import { MenuModel } from '../camera/menu.model';
import { MenuPopupComponent } from './menu-popup/menu-popup.component';
import { NavController, PopoverController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { UtilitiesService } from '../utilities.service';
import { ApiService } from '../api.service';
import { SurveyDataModel } from '../model/survey.model';
import { Image } from '../model/user.model';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
})
export class GalleryPage implements OnInit {

  currentPosition = 0;
  surveyId: number;
  survey: SurveyDataModel;
  listOfImages: Image[] = [];
  image: Image;
  menuName = 'MSP Images';

  constructor(
    private popoverController: PopoverController,
    private navController: NavController,
    private route: ActivatedRoute,
    private utilities: UtilitiesService,
    private apiService: ApiService,
    private storage: Storage
  ) {
    this.surveyId = +this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.getSurveyDetails();
  }

  setDataToDataModel(data: MenuModel[]) {
    console.log(this.survey);
    data.forEach((mainMenu) => {
      if (mainMenu.imageModel !== null && mainMenu.imageModel !== undefined) {
        mainMenu.imageModel.forEach((imageModel) => {
          if (imageModel.image !== '') {
            const image = new Image();
            image.url = imageModel.image;
            this.survey[imageModel.imageUploadTag].push(image);
          }
        });
      }
      if (mainMenu.subMenu !== null && mainMenu.subMenu !== undefined) {
        mainMenu.subMenu.forEach((submenu) => {
          submenu.images.forEach((imageModel) => {
            if (imageModel.image !== '') {
              const image = new Image();
              image.url = imageModel.image;
              this.survey[imageModel.imageUploadTag].push(image);
            }
          });
        });
      }
    });
    this.listOfImages = this.survey.mspimages;
    this.setImage();
  }

  getSurveyDetails() {
    this.utilities.showLoading('Getting Survey Details').then((success) => {
      this.apiService.getSurveyDetail(this.surveyId).subscribe((result) => {
        this.utilities.hideLoading().then(() => {
          this.survey = result;
          this.storage.get(this.surveyId + '').then((data: MenuModel[]) => {
            console.log(data);
            if (data !== null) {
              this.setDataToDataModel(data);
            } else {
              this.listOfImages = this.survey.mspimages;
              this.currentPosition = 0;
              this.setImage();
            }
          }, (error) => {
            console.log(error);

          });
        });
      }, (error) => {
        this.utilities.hideLoading();
      });
    });
  }

  previousImage() {
    if (this.currentPosition > 0) {
      this.currentPosition--;
      this.setImage();
    }

  }

  nextImage() {
    if (this.currentPosition < this.listOfImages.length - 1) {
      this.currentPosition++;
      this.setImage();
    }
  }

  showMenu(event: any) {
    this.presentPopover(event);
  }

  async presentPopover(buttonEvent: any) {
    const popover = await this.popoverController.create({
      component: MenuPopupComponent,
      event: buttonEvent,
      translucent: true
    });
    popover.onWillDismiss().then((data) => {
      switch (data.data) {
        case 'mspimages':
          this.menuName = 'MSP Images';
          break;
        case 'pvinverterimages':
          this.menuName = 'PV Inverter';
          break;
        case 'pvmeterimages':
          this.menuName = 'PV Meter';
          break;
        case 'utilitymeterimages':
          this.menuName = 'Utility Meter';
          break;
        case 'roofimages':
          this.menuName = 'Roof Images';
          break;
        case 'acdisconnectimages':
          this.menuName = 'Ac Disconnect Images';
          break;
      }
      this.listOfImages = this.survey[data.data];
      this.currentPosition = 0;
      this.setImage();
    });
    return await popover.present();
  }

  goBack() {
    this.navController.pop();
  }

  private setImage() {
    this.image = this.listOfImages[this.currentPosition];
    console.log(this.image);
  }
}
