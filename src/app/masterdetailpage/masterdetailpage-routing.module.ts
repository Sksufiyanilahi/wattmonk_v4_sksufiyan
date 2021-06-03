import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MasterdetailpagePage } from './masterdetailpage.page';
import { PermitdetailpageComponent } from './permitdetailpage/permitdetailpage.component';
import { PestampdetailpageComponent } from './pestampdetailpage/pestampdetailpage.component';
import { PrelimdetailpageComponent } from './prelimdetailpage/prelimdetailpage.component';
import { SurveydetailpageComponent } from './surveydetailpage/surveydetailpage.component';

const routes: Routes = [
  {
    path: '',
    component: MasterdetailpagePage,
    children: [
      {
        path: 'prelim/:id',
        component: PrelimdetailpageComponent
      },
      {
        path: 'survey/:id',
        component: SurveydetailpageComponent
      },
      {
        path: 'permit/:id',
        component: PermitdetailpageComponent
      },
      {
        path: 'pestamp/:id',
        component: PestampdetailpageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MasterdetailpagePageRoutingModule {}
