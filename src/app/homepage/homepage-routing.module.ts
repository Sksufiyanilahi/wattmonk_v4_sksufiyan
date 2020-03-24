import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomepagePage } from './homepage.page';
import { DesignComponent } from "./design/design.component";
import { SurveyComponent } from "./survey/survey.component";

const routes: Routes = [
  {
    path: '',
    component: HomepagePage,
    children: [
      {
        path: 'design',
        component: DesignComponent
      },
      {
        path: 'survey',
        component: SurveyComponent
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
})
export class HomepagePageRoutingModule {}
