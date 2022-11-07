import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DesignOverviewPage } from './design-overview.page';
import { NewDesignComponent } from './new-design/new-design.component';
import { CompletedDesignComponent } from './completed-design/completed-design.component';
import { InreviewDesignComponent } from './inreview-design/inreview-design.component';
import { DelieveredDesignComponent } from './delievered-design/delievered-design.component';
const routes: Routes = [
  {
    path: '',
    component: DesignOverviewPage,
    children: [
      {
        path: 'new-design',
        component: NewDesignComponent
      },
      {
        path: 'completed-design',
        component: CompletedDesignComponent
      },
      {
        path: 'inreview-design',
        component: InreviewDesignComponent
      },
      {
        path: 'delievered-design',
        component: DelieveredDesignComponent
      }
   
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DesignOverviewPageRoutingModule {}
