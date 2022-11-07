import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatTabsPage } from './chat-tabs.page';


const routes: Routes = [
  {
    path: 'chat',
    component: ChatTabsPage,
    children: [
      // {
      //   path: 'message',
      //   loadChildren: () => import(`./../message/message.module`).then(m => m.MessagePageModule)
      // },
      {
        path: 'groups',
        loadChildren: () => import('./groups/groups.module').then(m => m.GroupsPageModule)
      },
    ]
  }, {
    path: '',
    redirectTo: 'chat/groups',
    pathMatch: 'full'
  },
  // { path: 'redirectToTabs', redirectTo: 'chat/message', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatTabsPageRoutingModule { }
