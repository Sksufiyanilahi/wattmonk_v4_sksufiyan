import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { ProfileNotificationComponent } from './profile-notification/profile-notification.component';
import { ProfileHistoryComponent } from './profile-history/profile-history.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule
  ],
  declarations: [ProfilePage,ProfileNotificationComponent,ProfileHistoryComponent]
})
export class ProfilePageModule {}
