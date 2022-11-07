import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SurveyRequiredModelPage } from './survey-required-model.page';

const routes: Routes = [
  {
    path: '',
    component: SurveyRequiredModelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SurveyRequiredModelPageRoutingModule {}
