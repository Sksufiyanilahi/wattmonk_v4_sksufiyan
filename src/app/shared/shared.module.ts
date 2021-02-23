import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailModelPageModule } from '../email-model/email-model.module';
import { EmailModelPage } from '../email-model/email-model.page';
import {DeclinepagePageModule } from '../declinepage/declinepage.module';
import { PaymentModalPageModule } from '../payment-modal/payment-modal.module';
import { StatisticsDetailsPageModule } from '../statistics-details/statistics-details.module';
import { ResendpagedialogPageModule } from '../resendpagedialog/resendpagedialog.module';
import { CouponOffersModalPageModule } from '../coupon-offers-modal/coupon-offers-modal.module';
import { PestampdelivermodalPageModule } from '../pestampdelivermodal/pestampdelivermodal.module';
import { LinkifyPipe } from '../linkify.pipe';


@NgModule({
  declarations: [LinkifyPipe],
  imports: [
    CommonModule,
    EmailModelPageModule,
    CouponOffersModalPageModule,
    DeclinepagePageModule,
    
    StatisticsDetailsPageModule,
    ResendpagedialogPageModule,
    PestampdelivermodalPageModule,
  ],
  exports:[
    EmailModelPageModule,
    DeclinepagePageModule ,
    PestampdelivermodalPageModule,
    StatisticsDetailsPageModule,
    ResendpagedialogPageModule,
    CouponOffersModalPageModule,
    LinkifyPipe
  ]
})
export class SharedModule { }
