import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupComponent } from './group/group.component';

import { TeamHomePage } from './team-home.page';
import { TeamComponent } from './team/team.component';

const routes: Routes = [
  {
    path: '',
    component: TeamHomePage,
    children: [
      // { path: 'design', loadChildren: () => import(`./design/design.module`).then(m => m.DesignModule) },
      {
        path:'team',
        component: TeamComponent
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
export class TeamHomePageRoutingModule {}
