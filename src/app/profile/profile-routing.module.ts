import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilePage } from './profile.page';
import { ProfileNotificationComponent } from './profile-notification/profile-notification.component';
import { ProfileHistoryComponent } from './profile-history/profile-history.component';
import { DataResolverService } from '../data-resolver.service';
const routes: Routes = [
  {
    path: '',
    component: ProfilePage,
    resolve: {
      userdata: DataResolverService
    },
  children: [
    {
      path: 'profile-notification',
      component: ProfileNotificationComponent,
   
    },
    {
      path: 'history',
      component: ProfileHistoryComponent
    },
    {
      path: '',
      redirectTo: 'profile-notification',
      pathMatch: 'full'
    }
  ],
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePageRoutingModule {}
