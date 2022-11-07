import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OnholdPageRoutingModule } from './onhold-routing.module';

import { OnholdPage } from './onhold.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OnholdPageRoutingModule
  ],
  declarations: [OnholdPage]
})
export class OnholdPageModule {}
