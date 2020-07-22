import { NgModule } from '@angular/core';
import { CommonModule,DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DesignoverviewPageRoutingModule } from './designoverview-routing.module';

import { DesignoverviewPage } from './designoverview.page';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { LaunchNavigator } from '@ionic-native/launch-navigator/ngx';
import { NewdesignComponent } from './newdesign/newdesign.component';
import { CompleteddesignComponent } from './completeddesign/completeddesign.component';
import { InreviewDesignComponent } from './inreview-design/inreview-design.component';
import { DelievereddesignComponent } from './delievereddesign/delievereddesign.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DesignoverviewPageRoutingModule
  ],
  declarations: [DesignoverviewPage,NewdesignComponent,CompleteddesignComponent,InreviewDesignComponent,DelievereddesignComponent],
  providers: [
    DatePipe,
    Diagnostic,
    NativeGeocoder,
    LaunchNavigator
  ]
})
export class DesignoverviewPageModule {}
