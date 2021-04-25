import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeamhomepagePageRoutingModule } from './teamhomepage-routing.module';

import { TeamhomepagePage } from './teamhomepage.page';
import { TeamComponent } from './team/team.component';
import { GroupComponent } from './group/group.component';
import { IonBottomDrawerModule } from 'ion-bottom-drawer';
import { SharedModule } from '../shared/shared.module';
import { UtilitiesModule } from '../utilities/utilities.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeamhomepagePageRoutingModule,
    ReactiveFormsModule,
    IonBottomDrawerModule,
    SharedModule,
    UtilitiesModule
  ],
  declarations: [TeamhomepagePage,TeamComponent,GroupComponent]
})
export class TeamhomepagePageModule {}
