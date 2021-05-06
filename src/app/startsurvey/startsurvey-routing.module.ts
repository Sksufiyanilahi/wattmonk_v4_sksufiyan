import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StartsurveyPage } from './startsurvey.page';

const routes: Routes = [
  {
    path: '',
    component: StartsurveyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StartsurveyPageRoutingModule {}
