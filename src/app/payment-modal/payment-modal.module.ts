import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentModalPageRoutingModule } from './payment-modal-routing.module';

import { PaymentModalPage } from './payment-modal.page';

@NgModule({
  entryComponents:[PaymentModalPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentModalPageRoutingModule
  ],
  declarations: [PaymentModalPage]
})
export class PaymentModalPageModule {}
