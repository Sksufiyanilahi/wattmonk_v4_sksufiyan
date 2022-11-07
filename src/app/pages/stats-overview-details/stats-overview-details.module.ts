import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StatsOverviewDetailsPageRoutingModule } from './stats-overview-details-routing.module';

import { StatsOverviewDetailsPage } from './stats-overview-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StatsOverviewDetailsPageRoutingModule
  ],
  declarations: [StatsOverviewDetailsPage]
})
export class StatsOverviewDetailsPageModule {}
