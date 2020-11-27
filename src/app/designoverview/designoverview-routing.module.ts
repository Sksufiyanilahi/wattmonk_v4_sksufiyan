import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DesignoverviewPage } from './designoverview.page';
import { NewdesignComponent } from './newdesign/newdesign.component';
import { CompleteddesignComponent } from './completeddesign/completeddesign.component';
import { InreviewDesignComponent } from './inreview-design/inreview-design.component';
import { DelievereddesignComponent } from './delievereddesign/delievereddesign.component';
import { PermitnewdesignComponent } from './permitDesign/permitnewdesign/permitnewdesign.component';
import { PermitInreviewDesignComponent } from './permitDesign/permit-inreview-design/permit-inreview-design.component';
import { PermitDeliverDesignComponent } from './permitDesign/permit-deliver-design/permit-deliver-design.component';
import { PermitCompletedDesignComponent } from './permitDesign/permit-completed-design/permit-completed-design.component';
import { PrelimComponent } from './prelim/prelim.component';
import { PermitComponent } from './permit/permit.component';

const routes: Routes = [
  {
    path: '',
    component: DesignoverviewPage,
    children: [
     
      {
        path: 'prelim',
        component: PrelimComponent
      },
      {
        path: 'permit',
        component: PermitComponent
      }
    ]
  }
];
  

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DesignoverviewPageRoutingModule {}
