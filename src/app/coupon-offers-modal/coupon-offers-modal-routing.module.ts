import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CouponOffersModalPage } from './coupon-offers-modal.page';

const routes: Routes = [
  {
    path: '',
    component: CouponOffersModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CouponOffersModalPageRoutingModule {}
