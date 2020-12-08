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
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { NumberOnlyDirective } from './number.directive';
import { Camera } from '@ionic-native/Camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SchedulePageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    UtilitiesModule,
    SharedModule
  ],
  declarations: [
    SchedulePage,
    SurveyComponent,
    DesignComponent,
    NumberOnlyDirective
  ],
  providers: [
    Diagnostic,
    NativeGeocoder,
    Camera,
    File
  ]
})
export class SchedulePageModule {}
