import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { SuccessModalComponent } from './utilities/success-modal/success-modal.component';
import { BehaviorSubject } from 'rxjs';
import { ScheduleFormEvent } from './model/constants';
import { DesginDataModel } from './model/design.model';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  loading: HTMLIonLoadingElement;
  isLoading = false;
  address = new BehaviorSubject<string>('');
  saveScheduleForm = new BehaviorSubject<ScheduleFormEvent>(ScheduleFormEvent.NO_EVENT);

  constructor(
    public loadingController: LoadingController,
    private toastController: ToastController,
    private alertController: AlertController,
    private modalController: ModalController
  ) {
  }

  getAddressObservable(): BehaviorSubject<string> {
    return this.address;
  }

  setAddress(address: string) {
    this.address.next(address);
  }

  getScheduleFormEvent(): BehaviorSubject<ScheduleFormEvent> {
    return this.saveScheduleForm;
  }

  setScheduleFormEvent(event: ScheduleFormEvent) {
    this.saveScheduleForm.next(event);
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
      message: message,
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
      message: message,
      duration: 2000
    });
    toast.present();
  }


}
