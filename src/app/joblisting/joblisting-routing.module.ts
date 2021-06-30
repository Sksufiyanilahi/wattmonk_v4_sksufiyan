import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JoblistingPage } from './joblisting.page';

const routes: Routes = [
  {
    path: '',
    component: JoblistingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JoblistingPageRoutingModule {}
