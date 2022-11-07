import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StartSurveyPage } from './start-survey.page';

const routes: Routes = [
  {
    path: '',
    component: StartSurveyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StartSurveyPageRoutingModule {}
