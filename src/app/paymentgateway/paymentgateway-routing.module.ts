import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentgatewayPage } from './paymentgateway.page';

const routes: Routes = [
  {
    path: '',
    component: PaymentgatewayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentgatewayPageRoutingModule {}
