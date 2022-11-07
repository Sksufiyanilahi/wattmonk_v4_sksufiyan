import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SurveyorOverviewPageRoutingModule } from './surveyor-overview-routing.module';

import { SurveyorOverviewPage } from './surveyor-overview.page';
import { CompletedSurveysComponent } from './completed-surveys/completed-surveys.component';
import { NewSurveysComponent } from './new-surveys/new-surveys.component';
import { Diagnostic } from '@awesome-cordova-plugins/diagnostic/ngx';
import { NativeGeocoder } from '@awesome-cordova-plugins/native-geocoder/ngx';
import { LaunchNavigator } from '@awesome-cordova-plugins/launch-navigator/ngx';
import { UnassignedComponent } from './unassigned/unassigned.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SurveyorOverviewPageRoutingModule
  ],
  declarations: [
    SurveyorOverviewPage,
    NewSurveysComponent,
    CompletedSurveysComponent,
    UnassignedComponent

  ],
  providers: [
    DatePipe,
    Diagnostic,
    NativeGeocoder,
    LaunchNavigator
  ]
})
export class SurveyorOverviewPageModule {}
