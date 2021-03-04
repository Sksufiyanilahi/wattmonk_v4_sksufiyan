import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SurveyoroverviewPage } from './surveyoroverview.page';
import { NewsurveysComponent } from './newsurveys/newsurveys.component';
import { CompletedsurveysComponent } from './completedsurveys/completedsurveys.component';
import { InreviewsurveysComponent } from './inreviewsurveys/inreviewsurveys.component';
import { DeliveredsurveysComponent } from './deliveredsurveys/deliveredsurveys.component';

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
      },
      {
        path: 'inreviewsurveys',
        component: InreviewsurveysComponent
      },
      // {
      //   path: 'deliveredsurveys',
      //   component: DeliveredsurveysComponent
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SurveyoroverviewPageRoutingModule {}
