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
import { DeclinepagePage } from '../declinepage/declinepage.page';
import { EmailModelPage } from '../email-model/email-model.page';
import { Chooser } from '@ionic-native/chooser/ngx';
import { File } from '@ionic-native/file/ngx';
import { Network } from '@ionic-native/network/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@NgModule({
  entryComponents:[DeclinepagePage, EmailModelPage],
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
    LaunchNavigator,
    Chooser,
    File,
    Network,
    FileTransfer,
    LocalNotifications
  ]
})
export class PestampHomepagePageModule {}
