import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupdetailsPage } from './groupdetails.page';

const routes: Routes = [
  {
    path: '',
    component: GroupdetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupdetailsPageRoutingModule {}
