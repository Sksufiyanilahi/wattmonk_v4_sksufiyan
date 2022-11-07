import {CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SortingFilterPageRoutingModule } from './sorting-filter-routing.module';

import { SortingFilterPage } from './sorting-filter.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SortingFilterPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [SortingFilterPage],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SortingFilterPageModule {}
