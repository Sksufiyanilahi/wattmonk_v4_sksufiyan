import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomepagePageRoutingModule } from './homepage-routing.module';

import { HomepagePage } from './homepage.page';
import { SurveyComponent } from './survey/survey.component';
import { DesignComponent } from './design/design.component';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { LaunchNavigator } from '@ionic-native/launch-navigator/ngx';
import { IonBottomDrawerModule } from 'ion-bottom-drawer';
import { UtilitiesModule } from '../utilities/utilities.module';
import { CometChat } from '@cometchat-pro/cordova-ionic-chat';
import { DeclinepagePage } from '../declinepage/declinepage.page';
import { Chooser } from '@ionic-native/chooser/ngx';
import { File } from '@ionic-native/file/ngx';
import { Network } from '@ionic-native/network/ngx';
import { EmailModelPage } from '../email-model/email-model.page';
import { EmailModelPageModule } from '../email-model/email-model.module';
import { SharedModule } from '../shared/shared.module';
import { ResendpagedialogPage } from 'src/app/resendpagedialog/resendpagedialog.page';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';



@NgModule({
  entryComponents:[DeclinepagePage, EmailModelPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomepagePageRoutingModule,
    IonBottomDrawerModule,
    ReactiveFormsModule,
    UtilitiesModule,
    SharedModule
  ],
  declarations: [HomepagePage, SurveyComponent,DesignComponent],
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
export class HomepagePageModule {
}
