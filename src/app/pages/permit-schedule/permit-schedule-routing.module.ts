import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermitSchedulePage } from './permit-schedule.page';

const routes: Routes = [
  {
    path: '',
    component: PermitSchedulePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PermitSchedulePageRoutingModule {}
