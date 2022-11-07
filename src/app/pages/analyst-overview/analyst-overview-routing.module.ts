import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnalystOverviewPage } from './analyst-overview.page';
import { DesignComponent } from './design/design.component';
import { PermitDesignComponent } from './permit-design/permit-design.component';
import { SurveyComponent } from './survey/survey.component';

const routes: Routes = [
  {
    path: '',
    component: AnalystOverviewPage,
    children: [{
      path: 'design',
      component: DesignComponent
    },
    {
      path: 'survey',
      component: SurveyComponent
    },
    {
      path: 'permit-design',
      component: PermitDesignComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnalystOverviewPageRoutingModule { }
