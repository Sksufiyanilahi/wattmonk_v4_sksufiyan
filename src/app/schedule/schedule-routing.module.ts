import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SchedulePage } from './schedule.page';
import { DesignComponent } from './design/design.component';
import { SurveyComponent } from './survey/survey.component';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';

const routes: Routes = [
  {
    path: '',
    component: SchedulePage,
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
  providers: [
    Geolocation,
    NativeGeocoder
  ]
})
export class SchedulePageRoutingModule { }
