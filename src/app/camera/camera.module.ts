import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { CameraPreview } from '@ionic-native/camera-preview/ngx';

import { CameraPageRoutingModule } from './camera-routing.module';

import { CameraPage } from './camera.page';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';
import { File } from '@ionic-native/file/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CameraPageRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [CameraPage],
  providers: [
    CameraPreview,
    Base64ToGallery,
    File,
    Diagnostic
  ]
})
export class CameraPageModule {
}
