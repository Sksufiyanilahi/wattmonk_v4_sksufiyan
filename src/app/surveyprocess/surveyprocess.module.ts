import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SurveyprocessPageRoutingModule } from './surveyprocess-routing.module';

import { SurveyprocessPage } from './surveyprocess.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SurveyprocessPageRoutingModule
  ],
  declarations: [SurveyprocessPage]
})
export class SurveyprocessPageModule {}
