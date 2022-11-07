import { NgModule } from '@angular/core';
import { CommonModule,DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DesignOverviewPageRoutingModule } from './design-overview-routing.module';

import { DesignOverviewPage } from './design-overview.page';
import { Diagnostic } from '@awesome-cordova-plugins/diagnostic/ngx';
import { NativeGeocoder } from '@awesome-cordova-plugins/native-geocoder/ngx';
import { LaunchNavigator } from '@awesome-cordova-plugins/launch-navigator/ngx';
import { SharedModule } from 'src/app/shared.module';
import { NewDesignComponent } from './new-design/new-design.component';
import { CompletedDesignComponent } from './completed-design/completed-design.component';
import { InreviewDesignComponent } from './inreview-design/inreview-design.component';
import { DelieveredDesignComponent } from './delievered-design/delievered-design.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DesignOverviewPageRoutingModule,SharedModule
  ],
  declarations: [DesignOverviewPage,NewDesignComponent,InreviewDesignComponent,DelieveredDesignComponent,CompletedDesignComponent],
  providers: [
    DatePipe,
    Diagnostic,
    NativeGeocoder,
    LaunchNavigator
  ]
})
export class DesignOverviewPageModule {}
