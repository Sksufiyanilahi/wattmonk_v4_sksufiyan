import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupComponent } from './group/group.component';
import { TeamComponent } from './team/team.component';

import { TeamhomepagePage } from './teamhomepage.page';

const routes: Routes = [
  {
    path: '',
    component: TeamhomepagePage,
    children: [
      // { path: 'design', loadChildren: () => import(`./design/design.module`).then(m => m.DesignModule) },
      {
        path:'team',
        component:TeamComponent
      },
      {
        path: 'group',
        component: GroupComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeamhomepagePageRoutingModule {}
