import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermitInreviewDesignComponent } from './permit-inreview-design/permit-inreview-design.component';

import { PermitcompleteddesignComponent } from './permitcompleteddesign/permitcompleteddesign.component';
import { PermitdeliverDesignComponent } from './permitdeliver-design/permitdeliver-design.component';

import { PermitdesignoverviewPage } from './permitdesignoverview.page';
import { PermitnewdesignComponent } from './permitnewdesign/permitnewdesign.component';

const routes: Routes = [
  {
    path: '',
    component: PermitdesignoverviewPage,
    children:[
      {
        path:'permitnewdesign',
        component:PermitnewdesignComponent
      },
      {
        path:'permitcompleted',
        component:PermitcompleteddesignComponent
      },
      {
        path:'permitdelivered',
        component:PermitdeliverDesignComponent
      },
      {
        path:'permitInreview',
        component:PermitInreviewDesignComponent
      }
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PermitdesignoverviewPageRoutingModule {}
