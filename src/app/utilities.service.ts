import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { SuccessModalComponent } from './utilities/success-modal/success-modal.component';
import { BehaviorSubject } from 'rxjs';
import { ScheduleFormEvent } from './model/constants';
import { AddressModel } from './model/address.model';
import { AssigneeModel } from './model/assignee.model';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  loading: HTMLIonLoadingElement;
  isLoading = false;
  address = new BehaviorSubject<AddressModel>({
    address: '',
    lat: 0,
    long: 0,
    country: '',
    state: '',
    city: '',
    postalcode: ''
  });
  staticAddress = new BehaviorSubject<string>('');
  saveScheduleForm = new BehaviorSubject<ScheduleFormEvent>(ScheduleFormEvent.NO_EVENT);
  homepageDesignRefresh = new BehaviorSubject<boolean>(false);
  homepageSurveyRefresh = new BehaviorSubject<boolean>(false);
  surveyDetailsRefresh = new BehaviorSubject<boolean>(false);
  designDetailsRefresh = new BehaviorSubject<boolean>(false);
  showBottomBarHomepage = new BehaviorSubject<boolean>(true);
  uploadfile = new BehaviorSubject<string>('');
  manualInput= new BehaviorSubject<string>('');

  dataRefresh = new BehaviorSubject<boolean>(false);

  constructor(
    public loadingController: LoadingController,
    private toastController: ToastController,
    private alertController: AlertController,
    private modalController: ModalController
  ) {
  }

  getAddressObservable(): BehaviorSubject<AddressModel> {
    return this.address;
  }

  setAddress(address: AddressModel) {
    this.address.next(address);
  }

  getHomepageDesignRefresh(): BehaviorSubject<boolean> {
    return this.homepageDesignRefresh;
  }

  setHomepageDesignRefresh(refresh: boolean) {
    this.homepageDesignRefresh.next(refresh);
  }

  getHomepageSurveyRefresh(): BehaviorSubject<boolean> {
    return this.homepageSurveyRefresh;
  }

  sethomepageSurveyRefresh(refresh: boolean) {
    this.homepageSurveyRefresh.next(refresh);
  }

  getDataRefresh() : BehaviorSubject<boolean>{
    return this.dataRefresh;
  }

  setDataRefresh(refresh: boolean){
    this.dataRefresh.next(refresh);
  }

  getSurveyDetailsRefresh(): BehaviorSubject<boolean> {
    return this.surveyDetailsRefresh;
  }

  setSurveyDetailsRefresh(refresh: boolean) {
    this.surveyDetailsRefresh.next(refresh);
  }

  getBottomBarHomepage(): BehaviorSubject<boolean> {
    return this.showBottomBarHomepage;
  }

  setBottomBarHomepage(value: boolean) {
    this.showBottomBarHomepage.next(value);
  }

  getDesignDetailsRefresh(): BehaviorSubject<boolean> {
    return this.designDetailsRefresh;
  }

  setDesignDetailsRefresh(value: boolean) {
    this.designDetailsRefresh.next(value);
  }

  getScheduleFormEvent(): BehaviorSubject<ScheduleFormEvent> {
    return this.saveScheduleForm;
  }

  setScheduleFormEvent(event: ScheduleFormEvent) {
    this.saveScheduleForm.next(event);
    this.saveScheduleForm.next(ScheduleFormEvent.NO_EVENT);
  }

  async showLoading(message?: string) {
    let finalMessage = '';
    if (message) {
      finalMessage = message;
    } else {
      finalMessage = 'Please Wait';
    }
    this.loading = await this.loadingController.create({
      message: finalMessage
    });
    return this.loading.present();
  }

  async showLoadingWithPullRefreshSupport(showPopup: boolean, message?: string) {
    if (showPopup) {
      let finalMessage = '';
      if (message) {
        finalMessage = message;
      } else {
        finalMessage = 'Please Wait';
      }
      this.loading = await this.loadingController.create({
        message: finalMessage
      });
      return this.loading.present();
    } else {
      return Promise.resolve();
    }

  }

  setLoadingMessage(message: string) {
    this.loading.message = message;
  }

  hideLoading(): Promise<boolean> {
    return this.loading.dismiss();
  }

  hideLoadingWithPullRefreshSupport(showPopup: boolean): Promise<boolean> {
    if (showPopup) {
      return this.loading.dismiss();
    } else {
      return Promise.resolve(true);
    }

  }

  async showAlert(message) {
    const alert = await this.alertController.create({
      header: 'Error',
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async showSuccessModal(successMessage: string): Promise<HTMLIonModalElement> {
    const modal = await this.modalController.create({
      component: SuccessModalComponent,
      componentProps: {
        message: successMessage
      }
    });
    return modal;
  }

  capitalizeWord(word: string): string {
    if (!word) {
      return word;
    }
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
  }

  async showSnackBar(message) {
    this.hideLoading();
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      cssClass: 'my-custom-class'
    });
    await toast.present();
  }

  async errorSnackBar(message) {
    this.hideLoading();
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      cssClass: 'my-custom-error-class'
    });
    await toast.present();
  }


  setStaticAddress(address: string) {
    this.staticAddress.next(address);
  }

  getStaticAddress(): BehaviorSubject<string> {
    return this.staticAddress;
  }

  getBlobFromImageData(dataURI): Blob {
    // convert base64 to raw binary data held in a string
    const byteString = atob(dataURI.split(',')[1]);
    // separate out the mime component
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to an ArrayBuffer
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: mimeString });
  }

  getJobTypeName(type) {
    if (type == "pvbattery") {
      return "PV + Battery";
    } else if (type == "battery") {
      return "Battery";
    } else {
      return "PV";
    }
  }

  b64toBlob(b64Data) {
    let contentType = b64Data.split(',')[0].split(':')[1].split(';')[0] || '';
    var sliceSize = 256;

    var byteCharacters = atob(b64Data.split(',')[1]);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);
      var byteNumbers = new Array(slice.length);

      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
  }

  b64tBlob(b64Data) {
    let contentType ='image/jpg';
    let sliceSize = 512;    
    b64Data = b64Data.replace(/data\:image\/(jpeg|jpg|png)\;base64\,/gi,'');    
     let byteCharacters = atob(b64Data);
    let byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);
      var byteNumbers = new Array(slice.length);

      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
  }

   async showAlertBox(header,message,button?){
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: button,
      backdropDismiss: false
    });

    await alert.present();
  }
  


}
