import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeamschedulePage } from './teamschedule.page';

const routes: Routes = [
  {
    path: '',
    component: TeamschedulePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeamschedulePageRoutingModule {}
