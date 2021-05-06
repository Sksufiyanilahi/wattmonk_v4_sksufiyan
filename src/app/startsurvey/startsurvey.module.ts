import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StartsurveyPageRoutingModule } from './startsurvey-routing.module';

import { StartsurveyPage } from './startsurvey.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StartsurveyPageRoutingModule
  ],
  declarations: [StartsurveyPage]
})
export class StartsurveyPageModule {}
