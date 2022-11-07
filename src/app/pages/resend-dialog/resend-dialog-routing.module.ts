import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResendDialogPage } from './resend-dialog.page';

const routes: Routes = [
  {
    path: '',
    component: ResendDialogPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResendDialogPageRoutingModule {}
