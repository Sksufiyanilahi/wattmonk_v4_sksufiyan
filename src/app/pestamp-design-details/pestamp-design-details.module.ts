import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PestampDesignDetailsPageRoutingModule } from './pestamp-design-details-routing.module';

import { PestampDesignDetailsPage } from './pestamp-design-details.page';
import { LaunchNavigator } from '@ionic-native/launch-navigator/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PestampDesignDetailsPageRoutingModule
  ],
  declarations: [PestampDesignDetailsPage],
  providers: [
    LaunchNavigator
  ]
})
export class PestampDesignDetailsPageModule {}
