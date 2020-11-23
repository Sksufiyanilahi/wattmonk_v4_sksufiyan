import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnalystsComponent } from './analysts/analysts.component';
import { DesignersComponent } from './designers/designers.component';
import { DesignsComponent } from './designs/designs.component';

import { StatisticsPage } from './statistics.page';

const routes: Routes = [
  {
    path: '',
    component: StatisticsPage,
    children: [
      // { path: 'design', loadChildren: () => import(`./design/design.module`).then(m => m.DesignModule) },
      {
        path:'designs',
        component: DesignsComponent
      },
      {
        path: 'designers',
        component: DesignersComponent
      },
      {
        path:'analysts',
        component:AnalystsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatisticsPageRoutingModule {}
