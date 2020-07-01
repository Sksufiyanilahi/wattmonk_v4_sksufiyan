import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SurveyprocessPageRoutingModule } from './surveyprocess-routing.module';

import { SurveyprocessPage } from './surveyprocess.page';
import { CameraPreview } from '@ionic-native/camera-preview/ngx';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { UtilitiesModule } from '../utilities/utilities.module';

import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    UtilitiesModule,
    DragDropModule,
    SurveyprocessPageRoutingModule
  ],
  declarations: [SurveyprocessPage],
  providers: [
    CameraPreview,
    Diagnostic
  ]
})
export class SurveyprocessPageModule {}
