import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailModelPageModule } from '../email-model/email-model.module';
import { EmailModelPage } from '../email-model/email-model.page';
import {DeclinepagePageModule } from '../declinepage/declinepage.module';
import { PaymentModalPageModule } from '../payment-modal/payment-modal.module';
import { StatisticsDetailsPageModule } from '../statistics-details/statistics-details.module';
import { ResendpagedialogPageModule } from '../resendpagedialog/resendpagedialog.module';
import { IntercomModule } from 'ng-intercom';
import { intercomId } from '../contants';
import { CouponOffersModalPageModule } from '../coupon-offers-modal/coupon-offers-modal.module';
import { PestampdelivermodalPageModule } from '../pestampdelivermodal/pestampdelivermodal.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EmailModelPageModule,
    CouponOffersModalPageModule,
    DeclinepagePageModule,
    
    StatisticsDetailsPageModule,
    ResendpagedialogPageModule,
    PestampdelivermodalPageModule,
    IntercomModule.forRoot({
      appId: intercomId, // from your Intercom config
      updateOnRouterChange: true // will automatically run `update` on router event changes. Default: `false`
    })
  ],
  exports:[
    EmailModelPageModule,
    DeclinepagePageModule ,
    PestampdelivermodalPageModule,
    StatisticsDetailsPageModule,
    ResendpagedialogPageModule,
    CouponOffersModalPageModule
  ]
})
export class SharedModule { }
