import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { ProfileNotificationComponent } from './profile-notification/profile-notification.component';
import { ProfileHistoryComponent } from './profile-history/profile-history.component';
import { PaymentgatewayPageModule } from '../paymentgateway/paymentgateway.module';
import { PaymentgatewayPage } from '../paymentgateway/paymentgateway.page';
import { AddMoneyPage } from '../add-money/add-money.page';

@NgModule({
   entryComponents:[],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    PaymentgatewayPageModule,
    
  ],
  declarations: [ProfilePage,ProfileNotificationComponent,ProfileHistoryComponent,]
})
export class ProfilePageModule {}
