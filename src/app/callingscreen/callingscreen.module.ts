import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CallingscreenPageRoutingModule } from './callingscreen-routing.module';

import { CallingscreenPage } from './callingscreen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CallingscreenPageRoutingModule
  ],
  declarations: [CallingscreenPage]
})
export class CallingscreenPageModule {}
