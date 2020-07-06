import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SurveyoroverviewPageRoutingModule } from './surveyoroverview-routing.module';

import { SurveyoroverviewPage } from './surveyoroverview.page';
import { NewsurveysComponent } from './newsurveys/newsurveys.component';
import { CompletedsurveysComponent } from './completedsurveys/completedsurveys.component';
import { InreviewsurveysComponent } from './inreviewsurveys/inreviewsurveys.component';
import { DeliveredsurveysComponent } from './deliveredsurveys/deliveredsurveys.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SurveyoroverviewPageRoutingModule
  ],
  declarations: [SurveyoroverviewPage, NewsurveysComponent, CompletedsurveysComponent, InreviewsurveysComponent, DeliveredsurveysComponent]
})
export class SurveyoroverviewPageModule {}
