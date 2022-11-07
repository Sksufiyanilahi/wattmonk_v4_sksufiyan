import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WaitingForAcceptancePageRoutingModule } from './waiting-for-acceptance-routing.module';

import { WaitingForAcceptancePage } from './waiting-for-acceptance.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WaitingForAcceptancePageRoutingModule
  ],
  declarations: [WaitingForAcceptancePage]
})
export class WaitingForAcceptancePageModule {}
