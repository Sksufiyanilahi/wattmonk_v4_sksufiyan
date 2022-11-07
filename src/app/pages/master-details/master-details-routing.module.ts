import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MasterDetailsPage } from './master-details.page';
import { PermitDetailsComponent } from './permit-details/permit-details.component';
import { PestampDetailsComponent } from './pestamp-details/pestamp-details.component';
import { PrelimDetailsComponent } from './prelim-details/prelim-details.component';
import { SurveyDetailsComponent } from './survey-details/survey-details.component';

const routes: Routes = [
  {
    path: '',
    component: MasterDetailsPage,
    children: [
      {
        path: 'prelim-details/:id',
        component: PrelimDetailsComponent
      },
      {
        path: 'survey-details/:id',
        component: SurveyDetailsComponent
      },
      {
        path: 'permit-details/:id',
        component: PermitDetailsComponent
      },
      {
        path: 'pestamp-details/:id',
        component: PestampDetailsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MasterDetailsPageRoutingModule {}
