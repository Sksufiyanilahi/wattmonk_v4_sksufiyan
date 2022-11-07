import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PestampDeliverModalPageRoutingModule } from './pestamp-deliver-modal-routing.module';

import { PestampDeliverModalPage } from './pestamp-deliver-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PestampDeliverModalPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [PestampDeliverModalPage]
})
export class PestampDeliverModalPageModule {}
