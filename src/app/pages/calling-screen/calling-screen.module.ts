import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CallingScreenPageRoutingModule } from './calling-screen-routing.module';

import { CallingScreenPage } from './calling-screen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CallingScreenPageRoutingModule
  ],
  declarations: [CallingScreenPage]
})
export class CallingScreenPageModule {}
