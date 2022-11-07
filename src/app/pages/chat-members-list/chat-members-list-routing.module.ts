import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatMembersListPage } from './chat-members-list.page';

const routes: Routes = [
  {
    path: '',
    component: ChatMembersListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatMembersListPageRoutingModule {}
