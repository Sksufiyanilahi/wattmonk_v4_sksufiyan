import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PestampHomepagePageRoutingModule } from './pestamp-homepage-routing.module';

import { PestampHomepagePage } from './pestamp-homepage.page';
import { PestampDesignComponent } from './pestamp-design/pestamp-design.component';
import { IonBottomDrawerModule } from 'ion-bottom-drawer';
import { UtilitiesModule } from '../utilities/utilities.module';
import { SharedModule } from '../shared/shared.module';
import { LaunchNavigator } from '@ionic-native/launch-navigator/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PestampHomepagePageRoutingModule,
    IonBottomDrawerModule,
    ReactiveFormsModule,
    UtilitiesModule,
    SharedModule
  ],
  declarations: [PestampHomepagePage, PestampDesignComponent],
  providers: [
    DatePipe,
    LaunchNavigator
  ]
})
export class PestampHomepagePageModule {}
