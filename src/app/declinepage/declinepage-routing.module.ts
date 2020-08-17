import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeclinepagePage } from './declinepage.page';

const routes: Routes = [
  {
    path: '',
    component: DeclinepagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeclinepagePageRoutingModule {}
