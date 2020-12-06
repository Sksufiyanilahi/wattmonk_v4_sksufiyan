import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StatsoverviewdetailsPageRoutingModule } from './statsoverviewdetails-routing.module';

import { StatsoverviewdetailsPage } from './statsoverviewdetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StatsoverviewdetailsPageRoutingModule
  ],
  declarations: [StatsoverviewdetailsPage]
})
export class StatsoverviewdetailsPageModule {}
