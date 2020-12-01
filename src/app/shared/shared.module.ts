import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailModelPageModule } from '../email-model/email-model.module';
import { EmailModelPage } from '../email-model/email-model.page';
import {DeclinepagePageModule } from '../declinepage/declinepage.module';
import { PaymentModalPageModule } from '../payment-modal/payment-modal.module';
import { StatisticsDetailsPageModule } from '../statistics-details/statistics-details.module';
import { ResendpagedialogPageModule } from '../resendpagedialog/resendpagedialog.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EmailModelPageModule,
    DeclinepagePageModule,
    PaymentModalPageModule,
    StatisticsDetailsPageModule,
    ResendpagedialogPageModule
  ],
  exports:[
    EmailModelPageModule,
    DeclinepagePageModule ,
    PaymentModalPageModule,
    StatisticsDetailsPageModule,
    ResendpagedialogPageModule
  ]
})
export class SharedModule { }
