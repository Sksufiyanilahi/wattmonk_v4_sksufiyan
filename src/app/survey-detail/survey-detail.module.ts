import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SurveyDetailPageRoutingModule } from './survey-detail-routing.module';

import { SurveyDetailPage } from './survey-detail.page';
import { IonBottomDrawerModule } from 'ion-bottom-drawer';
import { UtilitiesModule } from '../utilities/utilities.module';
import { LaunchNavigator } from '@ionic-native/launch-navigator/ngx';
import { ModalPageComponent } from './modal-page/modal-page.component';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { LinkifyPipe } from '../linkify.pipe';

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
  declarations: [SurveyDetailPage,ModalPageComponent,LinkifyPipe],
  providers: [
    LaunchNavigator,
    PhotoViewer
  ],
  entryComponents: [ModalPageComponent],
})
export class SurveyDetailPageModule {}
