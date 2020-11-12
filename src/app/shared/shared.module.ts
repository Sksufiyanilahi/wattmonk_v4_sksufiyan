import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailModelPageModule } from '../email-model/email-model.module';
import { EmailModelPage } from '../email-model/email-model.page';
import {DeclinepagePageModule } from '../declinepage/declinepage.module';
import { PaymentModalPageModule } from '../payment-modal/payment-modal.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EmailModelPageModule,
    DeclinepagePageModule,
    PaymentModalPageModule 
  ],
  exports:[
    EmailModelPageModule,
    DeclinepagePageModule ,
    PaymentModalPageModule 
  ]
})
export class SharedModule { }
