import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { peengineerFilterpagePage } from './peengineerfilterpage.page';

const routes: Routes = [
  {
    path: '',
    component: peengineerFilterpagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class peengineerFilterpagePageRoutingModule {}
