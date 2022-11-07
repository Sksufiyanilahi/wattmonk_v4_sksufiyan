import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeamSchedulePage } from './team-schedule.page';

const routes: Routes = [
  {
    path: '',
    component: TeamSchedulePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeamSchedulePageRoutingModule {}
