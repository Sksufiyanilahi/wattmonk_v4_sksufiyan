import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SurveyProcessPageRoutingModule } from './survey-process-routing.module';

import { SurveyProcessPage } from './survey-process.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SurveyProcessPageRoutingModule
  ],
  declarations: [SurveyProcessPage]
})
export class SurveyProcessPageModule {}
