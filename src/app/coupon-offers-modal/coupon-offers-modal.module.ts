import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CouponOffersModalPageRoutingModule } from './coupon-offers-modal-routing.module';

import { CouponOffersModalPage } from './coupon-offers-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CouponOffersModalPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CouponOffersModalPage]
})
export class CouponOffersModalPageModule {}
