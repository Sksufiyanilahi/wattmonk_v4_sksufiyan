import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SurveyProcessPage } from './survey-process.page';

const routes: Routes = [
  {
    path: '',
    component: SurveyProcessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SurveyProcessPageRoutingModule {}
