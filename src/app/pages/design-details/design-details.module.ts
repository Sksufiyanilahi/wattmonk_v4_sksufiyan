import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DesignDetailsPageRoutingModule } from './design-details-routing.module';

import { DesignDetailsPage } from './design-details.page';
import { SharedModule } from 'src/app/shared.module';
import { UtilitiesModule } from 'src/app/components/utilities/utilities.module';
import { LaunchNavigator } from '@awesome-cordova-plugins/launch-navigator/ngx';
import { NgxTimerModule } from 'ngx-timer';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DesignDetailsPageRoutingModule,
    ReactiveFormsModule,
    NgxTimerModule,
    UtilitiesModule,
    SharedModule
  ],
  declarations: [DesignDetailsPage],
  providers: [
    LaunchNavigator
  ]
})
export class DesignDetailsPageModule {}
