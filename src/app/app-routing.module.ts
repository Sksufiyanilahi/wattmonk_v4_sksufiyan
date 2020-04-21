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
    path: 'camera/:id',
    loadChildren: () => import('./camera/camera.module').then(m => m.CameraPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'notification',
    loadChildren: () => import('./notification/notification.module').then(m => m.NotificationPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'map-page',
    loadChildren: () => import('./map-page/map-page.module').then(m => m.MapPagePageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'gallery',
    loadChildren: () => import('./gallery/gallery.module').then(m => m.GalleryPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'homepagedetail',
    loadChildren: () => import('./homepagedetail/homepagedetail.module').then(m => m.HomepagedetailPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'survey-detail/:id',
    loadChildren: () => import('./survey-detail/survey-detail.module').then(m => m.SurveyDetailPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'design-details/:id',
    loadChildren: () => import('./design-details/design-details.module').then(m => m.DesignDetailsPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'edit-design/:id',
    loadChildren: () => import('./edit-design/edit-design.module').then(m => m.EditDesignPageModule),
    canActivate: [AuthGuardService]
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
