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
    long: 0
  });
  saveScheduleForm = new BehaviorSubject<ScheduleFormEvent>(ScheduleFormEvent.NO_EVENT);
  homepageDesignRefresh = new BehaviorSubject<boolean>(false);
  homepageSurveyRefresh = new BehaviorSubject<boolean>(false);
  surveyDetailsRefresh = new BehaviorSubject<boolean>(false);
  designDetailsRefresh = new BehaviorSubject<boolean>(false);

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

  sethomepageDesignRefresh(refresh: boolean) {
    this.homepageDesignRefresh.next(refresh);
  }

  getHomepageSurveyRefresh(): BehaviorSubject<boolean> {
    return this.homepageSurveyRefresh;
  }

  sethomepageSurveyRefresh(refresh: boolean) {
    this.homepageSurveyRefresh.next(refresh);
  }


  getSurveyDetailsRefresh(): BehaviorSubject<boolean> {
    return this.surveyDetailsRefresh;
  }

  setSurveyDetailsRefresh(refresh: boolean) {
    this.surveyDetailsRefresh.next(refresh);
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

  hideLoading(): Promise<boolean> {
    return this.loading.dismiss();
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
    toast.present();
  }

  getDefaultAssignee(userId: string): AssigneeModel {
    return {
      firstname: '',
      lastname: '',
      logo: {
        url: '/assets/images/wattmonk_logo.png'
      },
      selected: false,
      id: +userId
    };
  }


}
