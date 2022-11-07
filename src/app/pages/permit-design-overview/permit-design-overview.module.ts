import { NgModule } from '@angular/core';
import { CommonModule,DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PermitDesignOverviewPageRoutingModule } from './permit-design-overview-routing.module';

import { PermitDesignOverviewPage } from './permit-design-overview.page';
import { Diagnostic } from '@awesome-cordova-plugins/diagnostic/ngx';
import { NativeGeocoder } from '@awesome-cordova-plugins/native-geocoder/ngx';
import { LaunchNavigator } from '@awesome-cordova-plugins/launch-navigator/ngx';
import { SharedModule } from 'src/app/shared.module';

import { PermitDeliverDesignComponent } from './permit-deliver-design/permit-deliver-design.component';
import { PermitCompletedDesignComponent } from './permit-completed-design/permit-completed-design.component';
import { PermitNewDesignComponent } from './permit-new-design/permit-new-design.component';
import { PermitInreviewDesignComponent } from './permit-inreview-design/permit-inreview-design.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PermitDesignOverviewPageRoutingModule
  ],
  declarations: [PermitDesignOverviewPage,PermitNewDesignComponent,PermitInreviewDesignComponent,PermitDeliverDesignComponent,PermitCompletedDesignComponent],
  providers: [
    DatePipe,
    Diagnostic,
    NativeGeocoder,
    LaunchNavigator
  ]
})
export class PermitDesignOverviewPageModule {}
