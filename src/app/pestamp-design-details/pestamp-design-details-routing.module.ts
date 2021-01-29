import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PestampDesignDetailsPage } from './pestamp-design-details.page';

const routes: Routes = [
  {
    path: '',
    component: PestampDesignDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PestampDesignDetailsPageRoutingModule {}
