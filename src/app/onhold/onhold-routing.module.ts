import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OnholdPage } from './onhold.page';

const routes: Routes = [
  {
    path: '',
    component: OnholdPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnholdPageRoutingModule {}
