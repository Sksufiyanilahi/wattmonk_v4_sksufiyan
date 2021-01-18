import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PestampSchedulePage } from './pestamp-schedule.page';

const routes: Routes = [
  {
    path: '',
    component: PestampSchedulePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PestampSchedulePageRoutingModule {}
