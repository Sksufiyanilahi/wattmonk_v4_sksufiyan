import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroupdetailsPageRoutingModule } from './groupdetails-routing.module';

import { GroupdetailsPage } from './groupdetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GroupdetailsPageRoutingModule
  ],
  declarations: [GroupdetailsPage]
})
export class GroupdetailsPageModule {}
