import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SurveyRequiredModelPageRoutingModule } from './survey-required-model-routing.module';

import { SurveyRequiredModelPage } from './survey-required-model.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SurveyRequiredModelPageRoutingModule
  ],
  declarations: [SurveyRequiredModelPage]
})
export class SurveyRequiredModelPageModule {}
