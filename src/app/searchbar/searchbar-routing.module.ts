import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchbarPage } from './searchbar.page';
import { DesignComponent } from './design/design.component';
import { SurveyComponent } from './survey/survey.component';

const routes: Routes = [
  {
    path: '',
    component: SearchbarPage,
    children:[
      {
        path:'design',
        component:DesignComponent
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
export class SearchbarPageRoutingModule {}
