import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditDesignPage } from './edit-design.page';

const routes: Routes = [
  {
    path: '',
    component: EditDesignPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditDesignPageRoutingModule {}
