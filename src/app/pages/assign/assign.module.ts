import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssignPageRoutingModule } from './assign-routing.module';

import { AssignPage } from './assign.page';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssignPageRoutingModule,    
    ReactiveFormsModule

  ],
  declarations: [AssignPage]
})
export class AssignPageModule {}
