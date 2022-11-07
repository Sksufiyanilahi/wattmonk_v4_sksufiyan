import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatAddMemberPage } from './chat-add-member.page';

const routes: Routes = [
  {
    path: '',
    component: ChatAddMemberPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatAddMemberPageRoutingModule {}
