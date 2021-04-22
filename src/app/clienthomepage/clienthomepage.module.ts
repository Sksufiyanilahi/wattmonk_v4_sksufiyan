import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClienthomepagePageRoutingModule } from './clienthomepage-routing.module';

import { ClienthomepagePage } from './clienthomepage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClienthomepagePageRoutingModule,
  ],
  declarations: [ClienthomepagePage]
})
export class ClienthomepagePageModule {}
