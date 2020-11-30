import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DesignoverviewPage } from './designoverview.page';
import { NewdesignComponent } from './newdesign/newdesign.component';
import { CompleteddesignComponent } from './completeddesign/completeddesign.component';
import { InreviewDesignComponent } from './inreview-design/inreview-design.component';
import { DelievereddesignComponent } from './delievereddesign/delievereddesign.component';

const routes: Routes = [
  {
    path: '',
    component: DesignoverviewPage,
    children: [
      {
        path: 'newdesigns',
        component: NewdesignComponent
      },
      {
        path: 'completeddesigns',
        component: CompleteddesignComponent
      },
      {
        path: 'inreviewdesigns',
        component: InreviewDesignComponent
      },
      {
        path: 'delivereddesigns',
        component: DelievereddesignComponent
      }
   
    ]
  }
];
  

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DesignoverviewPageRoutingModule {}
