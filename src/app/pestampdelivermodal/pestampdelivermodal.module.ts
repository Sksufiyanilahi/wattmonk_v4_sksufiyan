import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PestampdelivermodalPageRoutingModule } from './pestampdelivermodal-routing.module';

import { PestampdelivermodalPage } from './pestampdelivermodal.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PestampdelivermodalPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [PestampdelivermodalPage]
})
export class PestampdelivermodalPageModule {}
