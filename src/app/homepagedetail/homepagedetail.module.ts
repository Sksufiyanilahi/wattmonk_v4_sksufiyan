import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomepagedetailPageRoutingModule } from './homepagedetail-routing.module';

import { HomepagedetailPage } from './homepagedetail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomepagedetailPageRoutingModule
  ],
  declarations: [HomepagedetailPage]
})
export class HomepagedetailPageModule {}
