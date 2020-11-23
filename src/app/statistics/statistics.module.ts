import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StatisticsPageRoutingModule } from './statistics-routing.module';

import { StatisticsPage } from './statistics.page';
import { SharedModule } from '../shared/shared.module';
import { UtilitiesModule } from '../utilities/utilities.module';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { DesignsComponent } from './designs/designs.component';
import { DesignersComponent } from './designers/designers.component';
import { AnalystsComponent } from './analysts/analysts.component';
import { ChartsModule, ThemeService } from 'ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StatisticsPageRoutingModule,
    ChartsModule,
    ReactiveFormsModule,
    SharedModule,
    UtilitiesModule
  ],
  providers: [ ThemeService,DatePicker],
  declarations: [StatisticsPage, DesignsComponent, DesignersComponent, AnalystsComponent]
})
export class StatisticsPageModule {}
