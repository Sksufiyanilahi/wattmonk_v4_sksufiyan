import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeamHomePageRoutingModule } from './team-home-routing.module';

import { TeamHomePage } from './team-home.page';
import { IonBottomDrawerModule } from 'ion-bottom-drawer';
import { SharedModule } from 'src/app/shared.module';
import { UtilitiesModule } from 'src/app/components/utilities/utilities.module';
import { TeamComponent } from './team/team.component';
import { GroupComponent } from './group/group.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeamHomePageRoutingModule,
    ReactiveFormsModule,
    IonBottomDrawerModule,
    SharedModule,
    UtilitiesModule
  ],
  declarations: [
    TeamHomePage,
    TeamComponent,
    GroupComponent
  ]
})
export class TeamHomePageModule { }
