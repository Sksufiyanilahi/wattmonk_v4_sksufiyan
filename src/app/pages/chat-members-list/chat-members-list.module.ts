import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatMembersListPageRoutingModule } from './chat-members-list-routing.module';

import { ChatMembersListPage } from './chat-members-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatMembersListPageRoutingModule
  ],
  declarations: [ChatMembersListPage]
})
export class ChatMembersListPageModule {}
