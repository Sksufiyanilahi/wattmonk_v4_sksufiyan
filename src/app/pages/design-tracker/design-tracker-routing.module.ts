import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DesignTrackerPage } from './design-tracker.page';

const routes: Routes = [
  {
    path: '',
    component: DesignTrackerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DesignTrackerPageRoutingModule {}
