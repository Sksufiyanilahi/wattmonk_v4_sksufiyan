import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeamschedulePageRoutingModule } from './teamschedule-routing.module';

import { TeamschedulePage } from './teamschedule.page';
import { IonBottomDrawerModule } from 'ion-bottom-drawer';
import { UtilitiesModule } from '../utilities/utilities.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeamschedulePageRoutingModule,
    ReactiveFormsModule,
    IonBottomDrawerModule,
    UtilitiesModule
  ],
  declarations: [TeamschedulePage]
})
export class TeamschedulePageModule {}
