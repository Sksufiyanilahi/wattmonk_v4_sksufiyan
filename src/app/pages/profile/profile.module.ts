import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ProfileNotificationComponent } from './profile-notification/profile-notification.component';
import { ProfileHistoryComponent } from './profile-history/profile-history.component';
import { PaymentGatewayPageModule } from 'src/app/pages/payment-gateway/payment-gateway.module';
import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { SharedModule } from 'src/app/shared.module';

@NgModule({entryComponents:[],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,ReactiveFormsModule,PaymentGatewayPageModule,
    SharedModule
  ],
  declarations: [ProfilePage,ProfileNotificationComponent,ProfileHistoryComponent]
})
export class ProfilePageModule {}
