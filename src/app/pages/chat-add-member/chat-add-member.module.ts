import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatAddMemberPageRoutingModule } from './chat-add-member-routing.module';

import { ChatAddMemberPage } from './chat-add-member.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatAddMemberPageRoutingModule
  ],
  declarations: [ChatAddMemberPage]
})
export class ChatAddMemberPageModule {}
