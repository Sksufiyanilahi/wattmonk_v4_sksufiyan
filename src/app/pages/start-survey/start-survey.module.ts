import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StartSurveyPageRoutingModule } from './start-survey-routing.module';

import { StartSurveyPage } from './start-survey.page';
import { UtilitiesModule } from 'src/app/components/utilities/utilities.module';
import { Diagnostic } from '@awesome-cordova-plugins/diagnostic/ngx';
import { NativeGeocoder } from '@awesome-cordova-plugins/native-geocoder/ngx';
import { NgxDropzoneModule } from "ngx-dropzone";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StartSurveyPageRoutingModule,
    ReactiveFormsModule, NgxDropzoneModule,
    UtilitiesModule
  ],
  declarations: [StartSurveyPage],
  providers: [
    Diagnostic,
    NativeGeocoder,
  ]
})
export class StartSurveyPageModule { }
