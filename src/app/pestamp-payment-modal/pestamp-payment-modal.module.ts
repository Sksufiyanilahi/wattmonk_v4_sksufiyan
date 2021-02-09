import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PestampPaymentModalPageRoutingModule } from './pestamp-payment-modal-routing.module';

import { PestampPaymentModalPage } from './pestamp-payment-modal.page';
import { SharedModule } from '../shared/shared.module';
// import { PaymentModalPage } from '../payment-modal/payment-modal.page';

@NgModule({
  entryComponents:[PestampPaymentModalPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PestampPaymentModalPageRoutingModule,
    SharedModule
  ],
  declarations: [PestampPaymentModalPage]
})
export class PestampPaymentModalPageModule {}
