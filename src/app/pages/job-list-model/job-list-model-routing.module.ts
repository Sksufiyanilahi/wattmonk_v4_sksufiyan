import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobListModelPage } from './job-list-model.page';

const routes: Routes = [
  {
    path: '',
    component: JobListModelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobListModelPageRoutingModule {}
