import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompletedSurveysComponent } from './completed-surveys/completed-surveys.component';
import { NewSurveysComponent } from './new-surveys/new-surveys.component';
import {UnassignedComponent} from './unassigned/unassigned.component'

import { SurveyorOverviewPage } from './surveyor-overview.page';

const routes: Routes = [
  {
    path: '',
    component: SurveyorOverviewPage,
    children: [
      {
        path: 'new-surveys',
        component: NewSurveysComponent
      },
      {
        path: 'completed-surveys',
        component: CompletedSurveysComponent
      },
      {
        path:'unassigned',
        component:UnassignedComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SurveyorOverviewPageRoutingModule {}
