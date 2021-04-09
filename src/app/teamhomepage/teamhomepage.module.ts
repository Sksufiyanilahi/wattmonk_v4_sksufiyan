import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeamhomepagePageRoutingModule } from './teamhomepage-routing.module';

import { TeamhomepagePage } from './teamhomepage.page';
import { TeamComponent } from './team/team.component';
import { GroupComponent } from './group/group.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeamhomepagePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [TeamhomepagePage,TeamComponent,GroupComponent]
})
export class TeamhomepagePageModule {}
