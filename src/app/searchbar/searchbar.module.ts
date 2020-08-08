import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchbarPageRoutingModule } from './searchbar-routing.module';

import { SearchbarPage } from './searchbar.page';
import { UtilitiesModule } from '../utilities/utilities.module';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { LaunchNavigator } from '@ionic-native/launch-navigator/ngx';
import { DesignComponent } from './design/design.component';
import { SurveyComponent } from './survey/survey.component';
import { IonBottomDrawerModule } from 'ion-bottom-drawer';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchbarPageRoutingModule,
    ReactiveFormsModule,
    UtilitiesModule,
    IonBottomDrawerModule,
  ],
  declarations: [SearchbarPage,DesignComponent,SurveyComponent],
  providers: [
    DatePipe,
    Diagnostic,
    NativeGeocoder,
    LaunchNavigator
  ]
})
export class SearchbarPageModule {}
