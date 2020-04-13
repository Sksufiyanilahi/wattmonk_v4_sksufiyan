import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DesignDetailsPage } from './design-details.page';

const routes: Routes = [
  {
    path: '',
    component: DesignDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DesignDetailsPageRoutingModule {}
