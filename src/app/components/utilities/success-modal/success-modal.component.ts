import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-success-modal',
  templateUrl: './success-modal.component.html',
  styleUrls: ['./success-modal.component.scss'],
})
export class SuccessModalComponent implements OnInit {

  @Input('message') message = '';

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  closeModal() {
    this.modalController.dismiss();
  }

}
