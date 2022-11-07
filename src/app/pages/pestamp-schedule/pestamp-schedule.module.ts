import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PestampSchedulePageRoutingModule } from './pestamp-schedule-routing.module';

import { PestampSchedulePage } from './pestamp-schedule.page';
import { Diagnostic } from '@awesome-cordova-plugins/diagnostic/ngx';
import { NativeGeocoder } from '@awesome-cordova-plugins/native-geocoder/ngx';
import { NgxDropzoneModule } from "ngx-dropzone";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PestampSchedulePageRoutingModule,ReactiveFormsModule,NgxDropzoneModule
  ],
  declarations: [PestampSchedulePage],
  providers: [
    Diagnostic,
    NativeGeocoder,
  ],schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class PestampSchedulePageModule {}
