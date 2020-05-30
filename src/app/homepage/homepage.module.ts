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

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomepagePageRoutingModule,
    IonBottomDrawerModule,
    ReactiveFormsModule,
    UtilitiesModule,
  ],
  declarations: [HomepagePage, SurveyComponent, DesignComponent],
  providers: [
    DatePipe,
    Diagnostic,
    NativeGeocoder,
    LaunchNavigator
  ]
})
export class HomepagePageModule {
}
