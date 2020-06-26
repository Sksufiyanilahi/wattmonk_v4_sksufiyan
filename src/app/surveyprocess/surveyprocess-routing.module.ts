import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SurveyprocessPage } from './surveyprocess.page';

const routes: Routes = [
  {
    path: '',
    component: SurveyprocessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SurveyprocessPageRoutingModule {}
