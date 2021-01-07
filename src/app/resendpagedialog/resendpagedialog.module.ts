import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResendpagedialogPageRoutingModule } from './resendpagedialog-routing.module';

import { ResendpagedialogPage } from './resendpagedialog.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResendpagedialogPageRoutingModule
  ],
  declarations: [ResendpagedialogPage]
})
export class ResendpagedialogPageModule {}
