import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DesignDetailsPageRoutingModule } from './design-details-routing.module';

import { DesignDetailsPage } from './design-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DesignDetailsPageRoutingModule
  ],
  declarations: [DesignDetailsPage]
})
export class DesignDetailsPageModule {
}
