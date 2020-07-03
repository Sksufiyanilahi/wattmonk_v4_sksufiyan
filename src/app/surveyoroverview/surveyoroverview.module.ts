import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SurveyoroverviewPageRoutingModule } from './surveyoroverview-routing.module';

import { SurveyoroverviewPage } from './surveyoroverview.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SurveyoroverviewPageRoutingModule
  ],
  declarations: [SurveyoroverviewPage]
})
export class SurveyoroverviewPageModule {}
