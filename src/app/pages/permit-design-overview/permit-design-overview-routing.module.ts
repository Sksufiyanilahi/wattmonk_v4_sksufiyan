import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PermitDesignOverviewPage } from './permit-design-overview.page';
import { PermitDeliverDesignComponent } from './permit-deliver-design/permit-deliver-design.component';
import { PermitCompletedDesignComponent } from './permit-completed-design/permit-completed-design.component';
import { PermitNewDesignComponent } from './permit-new-design/permit-new-design.component';
import { PermitInreviewDesignComponent } from './permit-inreview-design/permit-inreview-design.component';
const routes: Routes = [
  {
    path: '',
    component: PermitDesignOverviewPage,
    children:[
      {
        path:'permit-new-design',
        component:PermitNewDesignComponent
      },
      {
        path:'permit-completed-design',
        component:PermitCompletedDesignComponent
      },
      {
        path:'permit-deliver-design',
        component:PermitDeliverDesignComponent
      },
      {
        path:'permit-inreview-design',
        component:PermitInreviewDesignComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PermitDesignOverviewPageRoutingModule {}
