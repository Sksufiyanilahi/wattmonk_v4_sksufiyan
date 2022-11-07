import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";

import { MatStepperModule } from '@angular/material/stepper';
import { IonicModule } from "@ionic/angular";
import { NgxTimerModule } from 'ngx-timer';

import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/header/header.component";
import { PopoverComponent } from "./components/popover/popover.component";
import { SuccessModalComponent } from "./components/utilities/success-modal/success-modal.component";
import { CouponOffersModalPageModule } from "./pages/coupon-offers-modal/coupon-offers-modal.module";
import { DeclinePageModule } from "./pages/decline/decline.module";
import { EmailModelPageModule } from "./pages/email-model/email-model.module";
import { PestampDeliverModalPage } from "./pages/pestamp-deliver-modal/pestamp-deliver-modal.page";
import { ResendDialogPageModule } from "./pages/resend-dialog/resend-dialog.module";
import { StatisticsDetailsPageModule } from "./pages/statistics-details/statistics-details.module";
import { LinkifyPipe } from "./pipes/linkify/linkify.pipe";

@NgModule({
  declarations: [
    LinkifyPipe,
    FooterComponent,
    HeaderComponent,
    SuccessModalComponent,
    PopoverComponent
  ],
  imports: [
    CommonModule,
    EmailModelPageModule,
    CouponOffersModalPageModule,
    DeclinePageModule,
    MatStepperModule,
    IonicModule,
    StatisticsDetailsPageModule,
    ResendDialogPageModule,
    NgxTimerModule
    // PestampDeliverModalPage,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  exports: [
    EmailModelPageModule,
    DeclinePageModule,
    // PestampDeliverModalPage,
    StatisticsDetailsPageModule,
    ResendDialogPageModule,
    CouponOffersModalPageModule,
    LinkifyPipe,
    MatStepperModule,
    FooterComponent,
    HeaderComponent,
    SuccessModalComponent,
    PopoverComponent
  ]
})
export class SharedModule { }
