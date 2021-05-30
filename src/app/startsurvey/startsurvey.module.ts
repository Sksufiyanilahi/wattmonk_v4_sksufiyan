import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StartsurveyPageRoutingModule } from './startsurvey-routing.module';

import { StartsurveyPage } from './startsurvey.page';
import { UtilitiesModule } from '../utilities/utilities.module';

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
  ]
})
export class StartsurveyPageModule {}