import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WaitingforacceptancePageRoutingModule } from './waitingforacceptance-routing.module';

import { WaitingforacceptancePage } from './waitingforacceptance.page';
import { IonBottomDrawerModule } from 'ion-bottom-drawer';
import { UtilitiesModule } from '../utilities/utilities.module';
import { SharedModule } from '../shared/shared.module';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { LaunchNavigator } from '@ionic-native/launch-navigator/ngx';
import { Chooser } from '@ionic-native/chooser/ngx';
import { File } from '@ionic-native/file/ngx';
import { Network } from '@ionic-native/network/ngx';
import { EmailModelPage } from '../email-model/email-model.page';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { DeclinepagePage } from '../declinepage/declinepage.page';

@NgModule({
  entryComponents:[DeclinepagePage, EmailModelPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WaitingforacceptancePageRoutingModule,
    IonBottomDrawerModule,
    UtilitiesModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [WaitingforacceptancePage],
  providers: [
    DatePipe,
    Diagnostic,
    NativeGeocoder,
    LaunchNavigator,
    Chooser,
    File,
    Network,
    FileTransfer,
    LocalNotifications
  ]
})
export class WaitingforacceptancePageModule {}
