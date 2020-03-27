import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'homepage',
    loadChildren: () => import('./homepage/homepage.module').then(m => m.HomepagePageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'schedule',
    loadChildren: () => import('./schedule/schedule.module').then(m => m.SchedulePageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'camera',
    loadChildren: () => import('./camera/camera.module').then(m => m.CameraPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule)
  },
  {
    path: 'notification',
    loadChildren: () => import('./notification/notification.module').then(m => m.NotificationPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
