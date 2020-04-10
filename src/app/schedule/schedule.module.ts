import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SchedulePageRoutingModule } from './schedule-routing.module';
import { SchedulePage } from './schedule.page';
import { SurveyComponent } from './survey/survey.component';
import { DesignComponent } from './design/design.component';
import { UtilitiesModule } from '../utilities/utilities.module';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SchedulePageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    UtilitiesModule
  ],
  declarations: [
    SchedulePage,
    SurveyComponent,
    DesignComponent,
  ],
  providers: [
    Diagnostic
  ]
})
export class SchedulePageModule {}
