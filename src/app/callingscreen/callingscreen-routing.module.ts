import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CallingscreenPage } from './callingscreen.page';

const routes: Routes = [
  {
    path: '',
    component: CallingscreenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CallingscreenPageRoutingModule {}
