import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentgatewayPageRoutingModule } from './paymentgateway-routing.module';

import { PaymentgatewayPage } from './paymentgateway.page';
import { NgxPayPalModule } from 'ngx-paypal';
// import { Stripe } from '@ionic-native/stripe/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    PaymentgatewayPageRoutingModule,
    NgxPayPalModule
  ],
  declarations: [PaymentgatewayPage],
  providers:[
    // Stripe
  ]
})
export class PaymentgatewayPageModule {}
