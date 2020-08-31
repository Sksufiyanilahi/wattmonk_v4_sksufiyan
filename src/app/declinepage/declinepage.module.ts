import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeclinepagePageRoutingModule } from './declinepage-routing.module';

import { DeclinepagePage } from './declinepage.page';
// import { Chooser } from '@ionic-native/chooser/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeclinepagePageRoutingModule
  ],
  declarations: [],
  // providers:[Chooser]
})
export class DeclinepagePageModule {}
