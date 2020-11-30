import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PermitdesignoverviewPageRoutingModule } from './permitdesignoverview-routing.module';

import { PermitdesignoverviewPage } from './permitdesignoverview.page';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { LaunchNavigator } from '@ionic-native/launch-navigator/ngx';
import { SharedModule } from '../shared/shared.module';

import { PermitdeliverDesignComponent } from './permitdeliver-design/permitdeliver-design.component';
import { PermitcompleteddesignComponent } from './permitcompleteddesign/permitcompleteddesign.component';
import { PermitnewdesignComponent } from './permitnewdesign/permitnewdesign.component';
import { PermitInreviewDesignComponent } from './permit-inreview-design/permit-inreview-design.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PermitdesignoverviewPageRoutingModule
  ],
  declarations: [PermitdesignoverviewPage,PermitInreviewDesignComponent,PermitdeliverDesignComponent,PermitcompleteddesignComponent,PermitnewdesignComponent],
  providers: [
    DatePipe,
    Diagnostic,
    NativeGeocoder,
    LaunchNavigator
  ]
})
export class PermitdesignoverviewPageModule {}
