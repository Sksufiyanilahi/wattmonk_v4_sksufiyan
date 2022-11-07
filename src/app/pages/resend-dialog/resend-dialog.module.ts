import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResendDialogPageRoutingModule } from './resend-dialog-routing.module';

import { ResendDialogPage } from './resend-dialog.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResendDialogPageRoutingModule
  ],
  declarations: [ResendDialogPage]
})
export class ResendDialogPageModule {}
