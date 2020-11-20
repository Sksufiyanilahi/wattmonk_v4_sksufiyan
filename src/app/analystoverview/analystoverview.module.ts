import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnalystoverviewPageRoutingModule } from './analystoverview-routing.module';

import { AnalystoverviewPage } from './analystoverview.page';
import { SurveyComponent } from './survey/survey.component';
import { DesignComponent } from './design/design.component';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { LaunchNavigator } from '@ionic-native/launch-navigator/ngx';
import { IonBottomDrawerModule } from 'ion-bottom-drawer';
import { UtilitiesModule } from '../utilities/utilities.module';
import { CometChat } from '@cometchat-pro/cordova-ionic-chat';
import { PendingComponent } from './design/pending/pending.component';
import { CompletedComponent } from './design/completed/completed.component';
import { DeliveredComponent } from './design/delivered/delivered.component';
import { InreviewComponent } from './design/inreview/inreview.component';
import { DeclinepagePage } from '../declinepage/declinepage.page';
import { Chooser } from '@ionic-native/chooser/ngx';
import { File } from '@ionic-native/file/ngx';
import { Network } from '@ionic-native/network/ngx';
import { SharedModule } from '../shared/shared.module';
import { EmailModelPageModule } from '../email-model/email-model.module';
import { EmailModelPage } from '../email-model/email-model.page';



@NgModule({
  
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnalystoverviewPageRoutingModule,
    IonBottomDrawerModule,
    ReactiveFormsModule,
    UtilitiesModule,
    SharedModule
  ],
  declarations: [AnalystoverviewPage,SurveyComponent, DesignComponent,PendingComponent,CompletedComponent,InreviewComponent,DeliveredComponent],
  providers: [
    DatePipe,
    Diagnostic,
    NativeGeocoder,
    LaunchNavigator,
    Chooser,
    File,
    Network
  ]
  
})
export class AnalystoverviewPageModule {}
