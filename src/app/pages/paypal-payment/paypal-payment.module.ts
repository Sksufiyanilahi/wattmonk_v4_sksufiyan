import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaypalPaymentPageRoutingModule } from './paypal-payment-routing.module';

import { PaypalPaymentPage } from './paypal-payment.page';
import { NgxPayPalModule } from 'ngx-paypal';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaypalPaymentPageRoutingModule,
    NgxPayPalModule
  ],
  declarations: [PaypalPaymentPage],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class PaypalPaymentPageModule {}
