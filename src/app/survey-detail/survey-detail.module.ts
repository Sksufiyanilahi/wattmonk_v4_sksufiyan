import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SurveyDetailPageRoutingModule } from './survey-detail-routing.module';

import { SurveyDetailPage } from './survey-detail.page';
import { IonBottomDrawerModule } from 'ion-bottom-drawer';
import { UtilitiesModule } from '../utilities/utilities.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    IonBottomDrawerModule,
    SurveyDetailPageRoutingModule,
    UtilitiesModule
  ],
  declarations: [SurveyDetailPage]
})
export class SurveyDetailPageModule {}
