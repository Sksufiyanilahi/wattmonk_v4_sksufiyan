import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DesignDetailsPageRoutingModule } from './design-details-routing.module';

import { DesignDetailsPage } from './design-details.page';
import { UtilitiesModule } from '../utilities/utilities.module';
import { LaunchNavigator } from '@ionic-native/launch-navigator/ngx';
import { NgxTimerModule } from 'ngx-timer';
import { LinkifyPipe } from '../linkify.pipe';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    DesignDetailsPageRoutingModule,
    UtilitiesModule,
    NgxTimerModule,
    SharedModule
  ],
  declarations: [DesignDetailsPage],
  providers: [
    LaunchNavigator
  ]
})
export class DesignDetailsPageModule {
}
