import { NgModule } from '@angular/core';
import { CommonModule ,DatePipe} from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PestampHomePageRoutingModule } from './pestamp-home-routing.module';

import { PestampHomePage } from './pestamp-home.page';
import { PestampDesignComponent } from './pestamp-design/pestamp-design.component';
import { IonBottomDrawerModule } from 'ion-bottom-drawer';
import { UtilitiesModule } from 'src/app/components/utilities/utilities.module';
import { SharedModule } from 'src/app/shared.module';
import { LaunchNavigator } from '@awesome-cordova-plugins/launch-navigator/ngx';
import { DeclinePage } from '../decline/decline.page';
import { EmailModelPage } from '../email-model/email-model.page';
import { Chooser } from '@awesome-cordova-plugins/chooser/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { FileTransfer } from '@awesome-cordova-plugins/file-transfer/ngx';
@NgModule({
  entryComponents:[DeclinePage, EmailModelPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PestampHomePageRoutingModule, IonBottomDrawerModule,
    ReactiveFormsModule,
    UtilitiesModule,
    SharedModule
  ],
  declarations: [PestampHomePage,PestampDesignComponent],
  providers: [
    DatePipe,
    LaunchNavigator,
    Chooser,
    File,
    Network,
    FileTransfer,
    
  ]
})
export class PestampHomePageModule {}
