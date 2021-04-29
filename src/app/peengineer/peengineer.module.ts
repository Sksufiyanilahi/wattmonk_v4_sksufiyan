import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PEengineerPageRoutingModule } from './peengineer-routing.module';

import { PEengineerPage } from './peengineer.page';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { LaunchNavigator } from '@ionic-native/launch-navigator/ngx';
import { SharedModule } from '../shared/shared.module';
import { PEengineerdesignComponent } from './peengineerdesign/peengineerdesign.component';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Chooser } from '@ionic-native/chooser/ngx';
import { File} from '@ionic-native/file/ngx';
import { Network } from '@ionic-native/network/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PEengineerPageRoutingModule,
    SharedModule
  ],
  declarations: [PEengineerPage,PEengineerdesignComponent],
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
export class PEengineerPageModule {}
