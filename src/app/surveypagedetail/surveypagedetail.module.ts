import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SurveypagedetailPageRoutingModule } from './surveypagedetail-routing.module';

import { SurveypagedetailPage } from './surveypagedetail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SurveypagedetailPageRoutingModule
  ],
  declarations: [SurveypagedetailPage]
})
export class SurveypagedetailPageModule {}
