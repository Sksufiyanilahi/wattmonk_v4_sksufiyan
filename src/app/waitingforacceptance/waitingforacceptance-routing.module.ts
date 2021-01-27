import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WaitingforacceptancePage } from './waitingforacceptance.page';

const routes: Routes = [
  {
    path: '',
    component: WaitingforacceptancePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WaitingforacceptancePageRoutingModule {}
