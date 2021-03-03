import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentModalPageRoutingModule } from './payment-modal-routing.module';

import { PaymentModalPage } from './payment-modal.page';
import { SharedModule } from '../shared/shared.module';
import { CouponOffersModalPage } from '../coupon-offers-modal/coupon-offers-modal.page';
import { NgxPayPalModule } from 'ngx-paypal';


@NgModule({
  entryComponents:[PaymentModalPage,CouponOffersModalPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentModalPageRoutingModule,
    SharedModule,
    NgxPayPalModule
  ],
  declarations: [PaymentModalPage]
})
export class PaymentModalPageModule {}
