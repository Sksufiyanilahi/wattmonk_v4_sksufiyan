import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import {
  RoundProgressModule,
  ROUND_PROGRESS_DEFAULTS
  } from 'angular-svg-round-progressbar';
import { NgxChartsModule } from '@swimlane/ngx-charts';
// import { NgxChartsModule } from '@swimlane/ngx-charts';

  @NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
        NgxChartsModule,
        RoundProgressModule,
  ],
  providers: [{
    provide: ROUND_PROGRESS_DEFAULTS,
    useValue: {
      color: '#FBB814',
      background: '#E8E8E8'
    }
  }],
  declarations: [DashboardPage]
})
export class DashboardPageModule {

  
}
