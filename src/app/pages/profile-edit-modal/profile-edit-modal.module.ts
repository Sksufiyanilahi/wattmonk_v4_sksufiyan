import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileEditModalPageRoutingModule } from './profile-edit-modal-routing.module';

import { ProfileEditModalPage } from './profile-edit-modal.page';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule
  ],
  declarations: [ProfileEditModalPage],
  providers: [
    MatAutocompleteModule
  ]
})
export class ProfileEditModalPageModule {}
