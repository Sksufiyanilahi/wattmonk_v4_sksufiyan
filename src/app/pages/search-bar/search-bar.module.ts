import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchBarPageRoutingModule } from './search-bar-routing.module';

import { SearchBarPage } from './search-bar.page';
import { IonBottomDrawerModule } from 'ion-bottom-drawer';
import { UtilitiesModule } from 'src/app/components/utilities/utilities.module';
import { SharedModule } from 'src/app/shared.module';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { Chooser } from '@awesome-cordova-plugins/chooser/ngx';
import { LaunchNavigator } from '@awesome-cordova-plugins/launch-navigator/ngx';
import { NativeGeocoder } from '@awesome-cordova-plugins/native-geocoder/ngx';
import { Diagnostic } from '@awesome-cordova-plugins/diagnostic/ngx';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchBarPageRoutingModule,
    IonBottomDrawerModule,
    ReactiveFormsModule,
    UtilitiesModule,
    SharedModule,Ng2SearchPipeModule,
  ],
  declarations: [
    SearchBarPage
  ],
  providers: [
    Diagnostic,
    NativeGeocoder,
    LaunchNavigator,
    Chooser,
    File
  ]
})
export class SearchBarPageModule {}
