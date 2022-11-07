import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { SharedModule } from 'src/app/shared.module';
import { UtilitiesModule } from 'src/app/components/utilities/utilities.module';
import { IonBottomDrawerModule } from 'ion-bottom-drawer';
import { EmailModelPage } from '../email-model/email-model.page';
import { DeclinePage } from '../decline/decline.page';
import { DesignComponent } from './design/design.component';
import { SurveyComponent } from './survey/survey.component';
import { Diagnostic } from '@awesome-cordova-plugins/diagnostic/ngx';
import { NativeGeocoder } from '@awesome-cordova-plugins/native-geocoder/ngx';
import { LaunchNavigator } from '@awesome-cordova-plugins/launch-navigator/ngx';
import { Chooser } from '@awesome-cordova-plugins/chooser/ngx';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { FileTransfer } from '@awesome-cordova-plugins/file-transfer/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';

@NgModule({
  entryComponents:[
    DeclinePage,
    EmailModelPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    IonBottomDrawerModule,
    ReactiveFormsModule,
    UtilitiesModule,
    SharedModule
  ],
  providers: [
    DatePipe,
    Diagnostic,
    NativeGeocoder,
    LaunchNavigator,
    Chooser,
    File,
    Network,
    FileTransfer,
    // LocalNotifications
  ],
  declarations: [
    HomePage,
    SurveyComponent,
    DesignComponent
  ]
})
export class HomePageModule {}
