import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchBar1PageRoutingModule } from './search-bar1-routing.module';

import { SearchBar1Page } from './search-bar1.page';
import { IonBottomDrawerModule } from 'ion-bottom-drawer';



import { UtilitiesModule } from '../utilities/utilities.module';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { LaunchNavigator } from '@ionic-native/launch-navigator/ngx';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchBar1PageRoutingModule,
    IonBottomDrawerModule,
    ReactiveFormsModule,
    UtilitiesModule
  
  ],
  declarations: [SearchBar1Page],
  providers: [
    Diagnostic,
    NativeGeocoder,
    LaunchNavigator
  ]
})
export class SearchBar1PageModule {}
