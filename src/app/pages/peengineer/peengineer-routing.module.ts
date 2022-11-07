import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PeengineerPage } from './peengineer.page';
import { PeengineerDesignComponent } from './peengineer-design/peengineer-design.component';
const routes: Routes = [
  {
    path: '',
    component: PeengineerPage,
    children: [
      {
        path: 'peengineer-design',
        component: PeengineerDesignComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PeengineerPageRoutingModule {}
