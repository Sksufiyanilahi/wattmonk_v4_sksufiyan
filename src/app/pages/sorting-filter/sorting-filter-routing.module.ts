import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SortingFilterPage } from './sorting-filter.page';

const routes: Routes = [
  {
    path: '',
    component: SortingFilterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SortingFilterPageRoutingModule {}
