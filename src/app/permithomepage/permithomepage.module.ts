import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PermithomepagePageRoutingModule } from './permithomepage-routing.module';

import { PermithomepagePage } from './permithomepage.page';
import { IonBottomDrawerModule } from 'ion-bottom-drawer';
import { SharedModule } from '../shared/shared.module';
import { UtilitiesModule } from '../utilities/utilities.module';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { LaunchNavigator } from '@ionic-native/launch-navigator/ngx';
import { Chooser } from '@ionic-native/chooser/ngx';
import { Network } from '@ionic-native/network/ngx';
import { DeclinepagePage } from '../declinepage/declinepage.page';
import { EmailModelPage } from '../email-model/email-model.page';
//import { ResendpagedialogPage } from '../resendpagedialog/resendpagedialog.page';
import { File } from '@ionic-native/file/ngx';
import { PermitdesignComponent } from './permitdesign/permitdesign.component';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { LocalNotifications} from '@ionic-native/local-notifications/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';

@NgModule({
  entryComponents:[DeclinepagePage, EmailModelPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PermithomepagePageRoutingModule,
    IonBottomDrawerModule,
    ReactiveFormsModule,
    UtilitiesModule,
    SharedModule
  ],
  declarations: [PermithomepagePage, PermitdesignComponent],
  providers: [
    DatePipe,
    Diagnostic,
    NativeGeocoder,
    LaunchNavigator,
    Chooser,
    File,
    Network,
    FileTransfer,
    LocalNotifications,
    FileOpener
  ]
})
export class PermithomepagePageModule {}
