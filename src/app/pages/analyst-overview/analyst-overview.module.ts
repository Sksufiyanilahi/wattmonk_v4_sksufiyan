import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnalystOverviewPageRoutingModule } from './analyst-overview-routing.module';

import { AnalystOverviewPage } from './analyst-overview.page';
import { IonBottomDrawerModule } from 'ion-bottom-drawer';
import { UtilitiesModule } from 'src/app/components/utilities/utilities.module';
import { SharedModule } from 'src/app/shared.module';
import { SurveyComponent } from './survey/survey.component';
import { DesignComponent } from './design/design.component';
import { PermitDesignComponent } from './permit-design/permit-design.component';
import { Diagnostic } from '@awesome-cordova-plugins/diagnostic/ngx';
import { NativeGeocoder } from '@awesome-cordova-plugins/native-geocoder/ngx';
import { LaunchNavigator } from '@awesome-cordova-plugins/launch-navigator/ngx';
import { Chooser } from '@awesome-cordova-plugins/chooser/ngx';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnalystOverviewPageRoutingModule,
    IonBottomDrawerModule,
    ReactiveFormsModule,
    UtilitiesModule,
    SharedModule
  ],
  declarations: [
    AnalystOverviewPage,
    SurveyComponent,
    DesignComponent,
    PermitDesignComponent
  ],
  providers: [
    DatePipe,
    Diagnostic,
    NativeGeocoder,
    LaunchNavigator,
    Chooser,
    File,
    Network
  ]
  
})
export class AnalystOverviewPageModule {}
