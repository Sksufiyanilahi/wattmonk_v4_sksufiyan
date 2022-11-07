import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientSchedulePageRoutingModule } from './client-schedule-routing.module';

import { ClientSchedulePage } from './client-schedule.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientSchedulePageRoutingModule
  ],
  declarations: [ClientSchedulePage]
})
export class ClientSchedulePageModule {}
