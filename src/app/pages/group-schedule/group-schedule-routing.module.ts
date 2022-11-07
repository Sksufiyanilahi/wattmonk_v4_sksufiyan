import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupSchedulePage } from './group-schedule.page';

const routes: Routes = [
  {
    path: '',
    component: GroupSchedulePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupSchedulePageRoutingModule {}
