import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JoblistingmodelPage } from './joblistingmodel.page';

const routes: Routes = [
  {
    path: '',
    component: JoblistingmodelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JoblistingmodelPageRoutingModule {}
