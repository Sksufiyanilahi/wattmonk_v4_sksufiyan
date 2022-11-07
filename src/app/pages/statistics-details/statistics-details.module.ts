import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StatisticsDetailsPageRoutingModule } from './statistics-details-routing.module';

import { StatisticsDetailsPage } from './statistics-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StatisticsDetailsPageRoutingModule
  ],
  declarations: [StatisticsDetailsPage]
})
export class StatisticsDetailsPageModule {}
