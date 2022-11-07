import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroupSchedulePageRoutingModule } from './group-schedule-routing.module';

import { GroupSchedulePage } from './group-schedule.page';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GroupSchedulePageRoutingModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule
  ],
  declarations: [GroupSchedulePage]
})
export class GroupSchedulePageModule {}
