import { NgModule } from '@angular/core';
import { CommonModule,DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PeengineerPageRoutingModule } from './peengineer-routing.module';

import { PeengineerPage } from './peengineer.page';
import { Diagnostic } from '@awesome-cordova-plugins/diagnostic/ngx';
import { NativeGeocoder } from '@awesome-cordova-plugins/native-geocoder/ngx';
import { LaunchNavigator } from '@awesome-cordova-plugins/launch-navigator/ngx';
import { SharedModule } from 'src/app/shared.module';
import { PeengineerDesignComponent } from './peengineer-design/peengineer-design.component';
import { Chooser } from '@awesome-cordova-plugins/chooser/ngx';
import { File} from '@awesome-cordova-plugins/file/ngx';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { FileTransfer } from '@awesome-cordova-plugins/file-transfer/ngx';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PeengineerPageRoutingModule,SharedModule
  ],
  declarations: [PeengineerPage,PeengineerDesignComponent],
  providers: [
    DatePipe,
    LaunchNavigator,
    Chooser,
    File,
    Network,
    FileTransfer,
  ]
})
export class PeengineerPageModule {}
