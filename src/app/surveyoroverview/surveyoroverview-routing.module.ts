import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SurveyoroverviewPage } from './surveyoroverview.page';
import { NewsurveysComponent } from './newsurveys/newsurveys.component';
import { CompletedsurveysComponent } from './completedsurveys/completedsurveys.component';

const routes: Routes = [
  {
    path: '',
    component: SurveyoroverviewPage,
    children: [
      {
        path: 'newsurveys',
        component: NewsurveysComponent
      },
      {
        path: 'completedsurveys',
        component: CompletedsurveysComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SurveyoroverviewPageRoutingModule {}
