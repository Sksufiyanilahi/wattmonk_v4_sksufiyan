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
import { MatStepperModule } from '@angular/material/stepper';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';


@NgModule({
  declarations: [LinkifyPipe,FooterComponent,HeaderComponent],
  imports: [
    CommonModule,
    EmailModelPageModule,
    CouponOffersModalPageModule,
    DeclinepagePageModule,
    MatStepperModule,

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
    LinkifyPipe,
    MatStepperModule,
    FooterComponent,
    HeaderComponent
  ]
})
export class SharedModule { }
