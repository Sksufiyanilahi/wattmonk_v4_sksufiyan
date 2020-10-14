import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmailModelPageRoutingModule } from './email-model-routing.module';

import { EmailModelPage } from './email-model.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmailModelPageRoutingModule
  ],
  declarations: [EmailModelPage]
})
export class EmailModelPageModule {}
