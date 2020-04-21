import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DesignDetailsPageRoutingModule } from './design-details-routing.module';

import { DesignDetailsPage } from './design-details.page';
import { UtilitiesModule } from '../utilities/utilities.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    DesignDetailsPageRoutingModule,
    UtilitiesModule
  ],
  declarations: [DesignDetailsPage]
})
export class DesignDetailsPageModule {
}
