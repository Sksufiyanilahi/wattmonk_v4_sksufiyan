import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientschedulePage } from './clientschedule.page';

const routes: Routes = [
  {
    path: '',
    component: ClientschedulePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientschedulePageRoutingModule {}
