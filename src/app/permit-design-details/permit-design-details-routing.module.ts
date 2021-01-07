import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PermitDesignDetailsPage } from './permit-design-details.page';

const routes: Routes = [
  {
    path: '',
    component: PermitDesignDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PermitDesignDetailsPageRoutingModule {}
