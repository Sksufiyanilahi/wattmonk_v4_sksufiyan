import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatsoverviewdetailsPage } from './statsoverviewdetails.page';

const routes: Routes = [
  {
    path: '',
    component: StatsoverviewdetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatsoverviewdetailsPageRoutingModule {}
