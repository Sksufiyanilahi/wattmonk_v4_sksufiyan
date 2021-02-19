import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PestampDesignDetailsPageRoutingModule } from './pestamp-design-details-routing.module';

import { PestampDesignDetailsPage } from './pestamp-design-details.page';
import { LaunchNavigator } from '@ionic-native/launch-navigator/ngx';
import { LinkifyPipe } from '../linkify.pipe';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    PestampDesignDetailsPageRoutingModule,
    SharedModule
  ],
  declarations: [PestampDesignDetailsPage],
  providers: [
    LaunchNavigator
  ]
})
export class PestampDesignDetailsPageModule {}
