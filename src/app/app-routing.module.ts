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
    path: 'gallery/:id',
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
    path: 'activity/:id',
    loadChildren: () => import('./activity-details/activity-details.module').then(m => m.ActivityDetailsPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'message',
    loadChildren: () => import('./message/message.module').then( m => m.MessagePageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'chat/:id',
    loadChildren: () => import('./chat/chat.module').then( m => m.ChatPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'changepassword',
    loadChildren: () => import('./change-password/change-password.module').then( m => m.ChangePasswordPageModule),
    // canActivate: [AuthGuardService]
  },
  {
    path: 'surveyprocess/:id/:type/:lat/:long/:city/:state',
    loadChildren: () => import('./surveyprocess/surveyprocess.module').then( m => m.SurveyprocessPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'surveyoroverview',
    loadChildren: () => import('./surveyoroverview/surveyoroverview.module').then( m => m.SurveyoroverviewPageModule)
  },
  {
    path: 'designoverview',
    loadChildren: () => import('./designoverview/designoverview.module').then( m => m.DesignoverviewPageModule)
  },
  {
    path: 'searchbar',
    loadChildren: () => import('./searchbar/searchbar.module').then( m => m.SearchbarPageModule)
  },
  {
    path: 'declinepage',
    loadChildren: () => import('./declinepage/declinepage.module').then( m => m.DeclinepagePageModule)
  },
  {
    path: 'paymentgateway',
    loadChildren: () => import('./paymentgateway/paymentgateway.module').then( m => m.PaymentgatewayPageModule)
  },
  {
    path: 'activity-details',
    loadChildren: () => import('./activity-details/activity-details.module').then( m => m.ActivityDetailsPageModule)
  },  {
    path: 'stripe',
    loadChildren: () => import('./stripe/stripe.module').then( m => m.StripePageModule)
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
