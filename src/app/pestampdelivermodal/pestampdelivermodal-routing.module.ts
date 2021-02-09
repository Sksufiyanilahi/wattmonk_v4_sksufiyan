import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PestampdelivermodalPage } from './pestampdelivermodal.page';

const routes: Routes = [
  {
    path: '',
    component: PestampdelivermodalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PestampdelivermodalPageRoutingModule {}
