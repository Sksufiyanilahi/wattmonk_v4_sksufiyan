import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserregistrationPage } from './userregistration.page';

const routes: Routes = [
  {
    path: '',
    component: UserregistrationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserregistrationPageRoutingModule {}
