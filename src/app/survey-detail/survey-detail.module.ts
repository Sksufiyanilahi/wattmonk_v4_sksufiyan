import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SurveyDetailPageRoutingModule } from './survey-detail-routing.module';

import { SurveyDetailPage } from './survey-detail.page';
import { IonBottomDrawerModule } from 'ion-bottom-drawer';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    IonBottomDrawerModule,
    SurveyDetailPageRoutingModule
  ],
  declarations: [SurveyDetailPage]
})
export class SurveyDetailPageModule {}
