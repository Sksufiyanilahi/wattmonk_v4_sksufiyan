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
import { PendingComponent } from './design/pending/pending.component';
import { CompletedComponent } from './design/completed/completed.component';
import { DeliveredComponent } from './design/delivered/delivered.component';
import { InreviewComponent } from './design/inreview/inreview.component';
import { DeclinepagePage } from '../declinepage/declinepage.page';
import { Chooser } from '@ionic-native/chooser/ngx';
import { File } from '@ionic-native/file/ngx';
import { Network } from '@ionic-native/network/ngx';

@NgModule({
  entryComponents:[DeclinepagePage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomepagePageRoutingModule,
    IonBottomDrawerModule,
    ReactiveFormsModule,
    UtilitiesModule
  ],
  declarations: [HomepagePage, SurveyComponent,DesignComponent,PendingComponent,CompletedComponent,InreviewComponent,DeliveredComponent,DeclinepagePage],
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
export class HomepagePageModule {
}
