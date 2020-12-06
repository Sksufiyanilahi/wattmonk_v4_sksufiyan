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


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EmailModelPageModule,
    DeclinepagePageModule,
    PaymentModalPageModule,
    StatisticsDetailsPageModule,
    ResendpagedialogPageModule,
    IntercomModule.forRoot({
      appId: intercomId, // from your Intercom config
      updateOnRouterChange: true // will automatically run `update` on router event changes. Default: `false`
    })
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
