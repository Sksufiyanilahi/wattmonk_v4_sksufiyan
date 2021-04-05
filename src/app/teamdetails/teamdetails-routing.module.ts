import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeamdetailsPage } from './teamdetails.page';

const routes: Routes = [
  {
    path: '',
    component: TeamdetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeamdetailsPageRoutingModule {}
