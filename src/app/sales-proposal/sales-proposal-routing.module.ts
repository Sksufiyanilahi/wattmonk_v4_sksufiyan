import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalesProposalPage } from './sales-proposal.page';

const routes: Routes = [
  {
    path: '',
    component: SalesProposalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalesProposalPageRoutingModule {}
