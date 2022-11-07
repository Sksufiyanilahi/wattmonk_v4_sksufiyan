import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SurveyDetailsPageRoutingModule } from './survey-details-routing.module';

import { SurveyDetailsPage } from './survey-details.page';
import { SharedModule } from 'src/app/shared.module';
import { UtilitiesModule } from 'src/app/components/utilities/utilities.module';
import { IonBottomDrawerModule } from 'ion-bottom-drawer';
import { ModalPageComponent } from './modal-page/modal-page.component';
import { LaunchNavigator } from '@awesome-cordova-plugins/launch-navigator/ngx';
import { PhotoViewer } from '@awesome-cordova-plugins/photo-viewer/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SurveyDetailsPageRoutingModule,
    ReactiveFormsModule,
    IonBottomDrawerModule,
    UtilitiesModule,
    SharedModule
  ],
  declarations: [
    SurveyDetailsPage,
    ModalPageComponent
  ],
  providers: [
    LaunchNavigator,
    PhotoViewer
  ],
  entryComponents: [ModalPageComponent],
})
export class SurveyDetailsPageModule { }
