import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PEengineerPage } from './peengineer.page';
import { PEengineerdesignComponent } from './peengineerdesign/peengineerdesign.component';

const routes: Routes = [
  {
    path: '',
    component: PEengineerPage,
    children: [
      {
        path: 'engineer',
        component: PEengineerdesignComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PEengineerPageRoutingModule {}
