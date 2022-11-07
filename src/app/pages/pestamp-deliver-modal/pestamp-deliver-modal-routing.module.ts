import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PestampDeliverModalPage } from './pestamp-deliver-modal.page';

const routes: Routes = [
  {
    path: '',
    component: PestampDeliverModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PestampDeliverModalPageRoutingModule {}
