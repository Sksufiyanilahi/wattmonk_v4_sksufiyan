import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentgatewayPageRoutingModule } from './paymentgateway-routing.module';

import { PaymentgatewayPage } from './paymentgateway.page';
import { NgxPayPalModule } from 'ngx-paypal';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    PaymentgatewayPageRoutingModule,
    NgxPayPalModule
  ],
  declarations: [PaymentgatewayPage]
})
export class PaymentgatewayPageModule {}
