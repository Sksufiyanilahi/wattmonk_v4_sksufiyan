import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FilterpagePageRoutingModule } from './filterpage-routing.module';

import { FilterpagePage } from './filterpage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FilterpagePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [FilterpagePage]
})
export class FilterpagePageModule {}
