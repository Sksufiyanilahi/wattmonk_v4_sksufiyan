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
import { UtilitiesModule } from '../utilities/utilities.module';
import { InverterSelectionPage } from './inverter-selection/inverter-selection.page';
import { UtilitiesSelectionComponent } from './utilities-selection/utilities-selection.component';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { ImageErrorListComponent } from './image-error-list/image-error-list.component';
import { AngularDraggableModule } from 'angular2-draggable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CameraPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    UtilitiesModule,
    AngularDraggableModule
  ],
  declarations: [CameraPage, InverterSelectionPage, UtilitiesSelectionComponent, ImageErrorListComponent],
  entryComponents: [InverterSelectionPage, UtilitiesSelectionComponent, ImageErrorListComponent],
  providers: [
    CameraPreview,
    Base64ToGallery,
    File,
    Diagnostic,
    FileChooser
  ]
})
export class CameraPageModule {
}
