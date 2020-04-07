import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GalleryPageRoutingModule } from './gallery-routing.module';

import { GalleryPage } from './gallery.page';
import { MenuPopupComponent } from './menu-popup/menu-popup.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GalleryPageRoutingModule
  ],
  declarations: [GalleryPage, MenuPopupComponent]
})
export class GalleryPageModule {}
