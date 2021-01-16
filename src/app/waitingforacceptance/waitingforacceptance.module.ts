import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WaitingforacceptancePageRoutingModule } from './waitingforacceptance-routing.module';

import { WaitingforacceptancePage } from './waitingforacceptance.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WaitingforacceptancePageRoutingModule
  ],
  declarations: [WaitingforacceptancePage]
})
export class WaitingforacceptancePageModule {}
