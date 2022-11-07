import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DesignComponent } from './design/design.component';

import { HomePage } from './home.page';
import { SurveyComponent } from './survey/survey.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      // { path: 'design', loadChildren: () => import(`./design/design.module`).then(m => m.DesignModule) },
      {
        path:'design',
        component: DesignComponent
      },
      {
        path: 'survey',
        component: SurveyComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
