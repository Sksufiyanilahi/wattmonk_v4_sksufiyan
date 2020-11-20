import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResendpagedialogPage } from './resendpagedialog.page';

const routes: Routes = [
  {
    path: '',
    component: ResendpagedialogPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResendpagedialogPageRoutingModule {}
