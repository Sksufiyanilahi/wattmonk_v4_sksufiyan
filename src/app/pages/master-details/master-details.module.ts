import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MasterDetailsPageRoutingModule } from './master-details-routing.module';

import { MasterDetailsPage } from './master-details.page';
import { UtilitiesModule } from 'src/app/components/utilities/utilities.module';
import { NgxTimerModule } from 'ngx-timer';
import { SharedModule } from 'src/app/shared.module';
import { PrelimDetailsComponent } from './prelim-details/prelim-details.component';
import { PermitDetailsComponent } from './permit-details/permit-details.component';
import { PestampDetailsComponent } from './pestamp-details/pestamp-details.component';
import { SurveyDetailsComponent } from './survey-details/survey-details.component';
import { LaunchNavigator } from '@awesome-cordova-plugins/launch-navigator/ngx';
import { PhotoViewer } from '@awesome-cordova-plugins/photo-viewer/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { FileTransfer } from '@awesome-cordova-plugins/file-transfer/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MasterDetailsPageRoutingModule,
    ReactiveFormsModule,
    UtilitiesModule,
    NgxTimerModule,
    SharedModule,
  ],
  declarations: [
    MasterDetailsPage,
    PrelimDetailsComponent,
    PermitDetailsComponent,
    PestampDetailsComponent,
    SurveyDetailsComponent
  ],
  providers: [
    LaunchNavigator,
    PhotoViewer,
    File,
    FileTransfer
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class MasterDetailsPageModule {}
