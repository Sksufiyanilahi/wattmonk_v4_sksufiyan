import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserregistrationPageRoutingModule } from './userregistration-routing.module';

import { UserregistrationPage } from './userregistration.page';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserregistrationPageRoutingModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule
  ],
  declarations: [UserregistrationPage]
})
export class UserregistrationPageModule {}
