import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StartsurveyPageRoutingModule } from './startsurvey-routing.module';

import { StartsurveyPage } from './startsurvey.page';
import { Insomnia } from '@ionic-native/insomnia/ngx';
import { UtilitiesModule } from '../utilities/utilities.module';
import { Camera } from '@ionic-native/Camera/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    UtilitiesModule,
    StartsurveyPageRoutingModule
  ],
  declarations: [StartsurveyPage],
  providers: [
    Insomnia,
    Camera
  ]
})
export class StartsurveyPageModule {}
