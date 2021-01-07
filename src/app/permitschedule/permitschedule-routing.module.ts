import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PermitschedulePage } from './permitschedule.page';

const routes: Routes = [
  {
    path: '',
    component: PermitschedulePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PermitschedulePageRoutingModule {}
