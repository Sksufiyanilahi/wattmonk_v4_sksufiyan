import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupschedulePage } from './groupschedule.page';

const routes: Routes = [
  {
    path: '',
    component: GroupschedulePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupschedulePageRoutingModule {}
