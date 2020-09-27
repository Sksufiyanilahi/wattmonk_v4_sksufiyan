import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActivityDetailsPageRoutingModule } from './activity-details-routing.module';

import { ActivityDetailsPage } from './activity-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActivityDetailsPageRoutingModule
  ],
  declarations: [ActivityDetailsPage],
  providers:[DatePipe]
})
export class ActivityDetailsPageModule {}
