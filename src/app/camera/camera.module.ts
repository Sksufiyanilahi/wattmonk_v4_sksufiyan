import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { CameraPreview } from "@ionic-native/camera-preview/ngx";

import { CameraPageRoutingModule } from './camera-routing.module';

import { CameraPage } from './camera.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CameraPageRoutingModule
  ],
  declarations: [CameraPage],
  providers: [CameraPreview]
})
export class CameraPageModule {
}
