import { Injectable } from '@angular/core';
import { LoadingController, ToastController, AlertController, ModalController } from '@ionic/angular';
import { SuccessModalComponent } from './utilities/success-modal/success-modal.component';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  loading: HTMLIonLoadingElement;
  isLoading = false;

  constructor(
    public loadingController: LoadingController,
    private toastController: ToastController,
    private alertController: AlertController,
    private modalController: ModalController
  ) {
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


}
