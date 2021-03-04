import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeammodulePageRoutingModule } from './teammodule-routing.module';

import { TeammodulePage } from './teammodule.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeammodulePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [TeammodulePage]
})
export class TeammodulePageModule {}
