import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { DesignComponent } from './design/design.component';
import { SalesProposalComponent } from './sales-proposal/sales-proposal.component';

import { SchedulePage } from './schedule.page';
import { SurveyComponent } from './survey/survey.component';

const routes: Routes = [
  {
    path: '',
    component: SchedulePage,
    children: [
      {
        path: 'design/:id',
        component: DesignComponent
      },
      {
        path: 'design',
        component: DesignComponent
      },
      {
        path: 'survey/:id',
        component: SurveyComponent
      },
      {
        path: 'survey',
        component: SurveyComponent
      },
      {
        path: 'sales-proposal',
        component: SalesProposalComponent
      },
      {
        path: 'sales-proposal/:id',
        component: SalesProposalComponent
      },
      {
        path: '',
        redirectTo: 'design',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    Geolocation
  ]
})
export class SchedulePageRoutingModule {}
