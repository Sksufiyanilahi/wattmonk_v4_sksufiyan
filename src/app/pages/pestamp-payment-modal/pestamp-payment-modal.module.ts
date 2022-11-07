import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PestampPaymentModalPageRoutingModule } from './pestamp-payment-modal-routing.module';

import { PestampPaymentModalPage } from './pestamp-payment-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PestampPaymentModalPageRoutingModule
  ],
  declarations: [PestampPaymentModalPage]
})
export class PestampPaymentModalPageModule {}
