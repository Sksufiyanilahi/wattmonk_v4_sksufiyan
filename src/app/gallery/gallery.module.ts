import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GalleryPageRoutingModule } from './gallery-routing.module';

import { GalleryPage } from './gallery.page';
import { MenuPopupComponent } from './menu-popup/menu-popup.component';
import { PinchZoomModule } from 'ngx-pinch-zoom';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GalleryPageRoutingModule,
    PinchZoomModule
  ],
  declarations: [GalleryPage, MenuPopupComponent],
  entryComponents: [GalleryPage, MenuPopupComponent]
})
export class GalleryPageModule {}
