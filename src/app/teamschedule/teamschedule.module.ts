import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeamschedulePageRoutingModule } from './teamschedule-routing.module';

import { TeamschedulePage } from './teamschedule.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeamschedulePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [TeamschedulePage]
})
export class TeamschedulePageModule {}
