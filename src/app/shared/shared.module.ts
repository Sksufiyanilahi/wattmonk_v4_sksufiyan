import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailModelPageModule } from '../email-model/email-model.module';
import { EmailModelPage } from '../email-model/email-model.page';
import {DeclinepagePageModule } from '../declinepage/declinepage.module';
import { PaymentModalPageModule } from '../payment-modal/payment-modal.module';
import { StatisticsDetailsPageModule } from '../statistics-details/statistics-details.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EmailModelPageModule,
    DeclinepagePageModule,
    PaymentModalPageModule,
    StatisticsDetailsPageModule
  ],
  exports:[
    EmailModelPageModule,
    DeclinepagePageModule ,
    PaymentModalPageModule,
    StatisticsDetailsPageModule
  ]
})
export class SharedModule { }
