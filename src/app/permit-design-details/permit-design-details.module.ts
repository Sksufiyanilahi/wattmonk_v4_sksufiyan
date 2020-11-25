import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PermitDesignDetailsPageRoutingModule } from './permit-design-details-routing.module';

import { PermitDesignDetailsPage } from './permit-design-details.page';
import { UtilitiesModule } from '../utilities/utilities.module';
import { LaunchNavigator } from '@ionic-native/launch-navigator/ngx';
import { NgxTimerModule } from 'ngx-timer';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    UtilitiesModule,
    NgxTimerModule,
    PermitDesignDetailsPageRoutingModule
  ],
  declarations: [PermitDesignDetailsPage],
  providers: [
    LaunchNavigator
  ]
})
export class PermitDesignDetailsPageModule {}
