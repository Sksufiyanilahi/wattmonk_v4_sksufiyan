import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserRegistrationPageRoutingModule } from './user-registration-routing.module';

import { UserRegistrationPage } from './user-registration.page';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from 'src/app/shared.module';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserRegistrationPageRoutingModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    SharedModule,
    MatSelectModule
  ],
  declarations: [UserRegistrationPage]
})
export class UserRegistrationPageModule {}
