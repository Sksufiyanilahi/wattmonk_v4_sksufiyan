import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PestampDesignComponent } from './pestamp-design/pestamp-design.component';

import { PestampHomepagePage } from './pestamp-homepage.page';

const routes: Routes = [
  {
    path: '',
    component: PestampHomepagePage,
    children: [
      // { path: 'design', loadChildren: () => import(`./design/design.module`).then(m => m.DesignModule) },
      {
        path:'pestamp-design',
        component:PestampDesignComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PestampHomepagePageRoutingModule {}
