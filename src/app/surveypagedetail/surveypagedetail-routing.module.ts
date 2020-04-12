import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SurveypagedetailPage } from './surveypagedetail.page';

const routes: Routes = [
  {
    path: ':id',
    component: SurveypagedetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SurveypagedetailPageRoutingModule {}
