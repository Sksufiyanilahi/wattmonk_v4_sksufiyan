import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClienthomepagePageRoutingModule } from './clienthomepage-routing.module';

import { ClienthomepagePage } from './clienthomepage.page';
import { MatMenu, MatMenuItem } from '@angular/material/menu';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClienthomepagePageRoutingModule,
    MatMenu,
    MatMenuItem
  ],
  declarations: [ClienthomepagePage]
})
export class ClienthomepagePageModule {}
