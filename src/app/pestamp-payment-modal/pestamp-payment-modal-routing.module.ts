import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PestampPaymentModalPage } from './pestamp-payment-modal.page';

const routes: Routes = [
  {
    path: '',
    component: PestampPaymentModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PestampPaymentModalPageRoutingModule {}
