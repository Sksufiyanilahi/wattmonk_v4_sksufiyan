import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermitdesignComponent } from './permitdesign/permitdesign.component';

import { PermithomepagePage } from './permithomepage.page';

const routes: Routes = [
  {
    path: '',
    component: PermithomepagePage,
    children: [
      // { path: 'design', loadChildren: () => import(`./design/design.module`).then(m => m.DesignModule) },
      {
        path:'permitdesign',
        component:PermitdesignComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PermithomepagePageRoutingModule {}
