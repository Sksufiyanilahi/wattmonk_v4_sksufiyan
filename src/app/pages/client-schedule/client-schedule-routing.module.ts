import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientSchedulePage } from './client-schedule.page';

const routes: Routes = [
  {
    path: '',
    component: ClientSchedulePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientSchedulePageRoutingModule {}
