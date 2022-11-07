import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataResolverService } from 'src/app/services/data-resolver/data-resolver.service';
import { PermitDesignComponent } from './permit-design/permit-design.component';

import { PermitHomePage } from './permit-home.page';

const routes: Routes = [
  {
    path: '',
    component: PermitHomePage,
    // resolve: {
    //   userdata: DataResolverService
    // },
    children: [
      // { path: 'design', loadChildren: () => import(`./design/design.module`).then(m => m.DesignModule) },
      {
        path: 'permit-design',
        component: PermitDesignComponent,
        // resolve: {
        //   userdata: DataResolverService
        // },
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PermitHomePageRoutingModule { }
