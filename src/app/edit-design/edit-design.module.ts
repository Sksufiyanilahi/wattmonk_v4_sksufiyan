import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditDesignPageRoutingModule } from './edit-design-routing.module';

import { EditDesignPage } from './edit-design.page';
import { UtilitiesModule } from '../utilities/utilities.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditDesignPageRoutingModule,
    UtilitiesModule,
    ReactiveFormsModule
  ],
  declarations: [EditDesignPage]
})
export class EditDesignPageModule {}
