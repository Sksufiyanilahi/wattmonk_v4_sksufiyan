import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DesignTrackerPageRoutingModule } from './design-tracker-routing.module';

import { DesignTrackerPage } from './design-tracker.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DesignTrackerPageRoutingModule
  ],
  declarations: [DesignTrackerPage]
})
export class DesignTrackerPageModule {}
