import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MasterdetailpagePageRoutingModule } from './masterdetailpage-routing.module';

import { MasterdetailpagePage } from './masterdetailpage.page';
import { SharedModule } from '../shared/shared.module';
import { NgxTimerModule } from 'ngx-timer';
import { UtilitiesModule } from '../utilities/utilities.module';
import { PrelimdetailpageComponent } from './prelimdetailpage/prelimdetailpage.component';
import { PermitdetailpageComponent } from './permitdetailpage/permitdetailpage.component';
import { PestampdetailpageComponent } from './pestampdetailpage/pestampdetailpage.component';
import { SurveydetailpageComponent } from './surveydetailpage/surveydetailpage.component';
import { LaunchNavigator } from '@ionic-native/launch-navigator/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    MasterdetailpagePageRoutingModule,
    UtilitiesModule,
    NgxTimerModule,
    SharedModule
  ],
  declarations: [MasterdetailpagePage, PrelimdetailpageComponent, PermitdetailpageComponent, PestampdetailpageComponent, SurveydetailpageComponent],
  providers: [
    LaunchNavigator,
    PhotoViewer
  ]
})
export class MasterdetailpagePageModule {}
