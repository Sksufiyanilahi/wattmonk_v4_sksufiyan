import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatisticsDetailsPage } from './statistics-details.page';

const routes: Routes = [
  {
    path: '',
    component: StatisticsDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatisticsDetailsPageRoutingModule {}
