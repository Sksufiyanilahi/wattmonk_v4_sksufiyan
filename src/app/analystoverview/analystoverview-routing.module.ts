import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnalystoverviewPage } from './analystoverview.page';
import { DesignComponent } from './design/design.component';
import { SurveyComponent } from './survey/survey.component';
import {PermitdesignComponent} from 'src/app/analystoverview/permitdesign/permitdesign.component'


const routes: Routes = [
  {
    path: '',
    component: AnalystoverviewPage, 
    children:
  [
  {
    path: 'design',
    //loadChildren: () => import('./design/design.component').then( m => m.DesignComponent)
    component:DesignComponent
  },
  {
    path: 'survey',
    //loadChildren: () => import('./survey/survey.component').then( m => m.SurveyComponent)
    component: SurveyComponent
  },
  {
    path: 'permitdesign',
    //loadChildren: () => import('./survey/survey.component').then( m => m.SurveyComponent)
    component: PermitdesignComponent
  }]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnalystoverviewPageRoutingModule {}
