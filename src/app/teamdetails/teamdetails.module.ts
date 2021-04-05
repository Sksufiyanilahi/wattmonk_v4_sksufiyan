import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeamdetailsPageRoutingModule } from './teamdetails-routing.module';

import { TeamdetailsPage } from './teamdetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeamdetailsPageRoutingModule
  ],
  declarations: [TeamdetailsPage]
})
export class TeamdetailsPageModule {}
