import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PestampSchedulePageRoutingModule } from './pestamp-schedule-routing.module';

import { PestampSchedulePage } from './pestamp-schedule.page';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PestampSchedulePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [PestampSchedulePage],
  providers: [
    Diagnostic,
    NativeGeocoder,
  ]
})
export class PestampSchedulePageModule {}
