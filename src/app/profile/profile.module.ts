import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';


import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { ProfileNotificationComponent } from './profile-notification/profile-notification.component';
import { ProfileHistoryComponent } from './profile-history/profile-history.component';
import { PaymentgatewayPageModule } from '../paymentgateway/paymentgateway.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
   entryComponents:[],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    PaymentgatewayPageModule,
    SharedModule

  ],
  declarations: [ProfilePage,ProfileNotificationComponent,ProfileHistoryComponent,]
})
export class ProfilePageModule {}
