import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatTabsPageRoutingModule } from './chat-tabs-routing.module';

import { ChatTabsPage } from './chat-tabs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatTabsPageRoutingModule
  ],
  declarations: [ChatTabsPage]
})
export class ChatTabsPageModule {}
