import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SalesProposalPageRoutingModule } from './sales-proposal-routing.module';

import { SalesProposalPage } from './sales-proposal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SalesProposalPageRoutingModule
  ],
  declarations: [SalesProposalPage]
})
export class SalesProposalPageModule {}
