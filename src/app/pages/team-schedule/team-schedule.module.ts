import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeamSchedulePageRoutingModule } from './team-schedule-routing.module';

import { TeamSchedulePage } from './team-schedule.page';
import { IonBottomDrawerModule } from 'ion-bottom-drawer';
import { UtilitiesModule } from 'src/app/components/utilities/utilities.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeamSchedulePageRoutingModule,
    ReactiveFormsModule,
    IonBottomDrawerModule,
    UtilitiesModule
  ],
  declarations: [TeamSchedulePage]
})
export class TeamSchedulePageModule {}
