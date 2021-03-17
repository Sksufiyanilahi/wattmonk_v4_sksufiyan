import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserregistrationPageRoutingModule } from './userregistration-routing.module';

import { UserregistrationPage } from './userregistration.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserregistrationPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [UserregistrationPage]
})
export class UserregistrationPageModule {}
