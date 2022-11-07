import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WaitingForAcceptancePage } from './waiting-for-acceptance.page';

const routes: Routes = [
  {
    path: '',
    component: WaitingForAcceptancePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WaitingForAcceptancePageRoutingModule {}
