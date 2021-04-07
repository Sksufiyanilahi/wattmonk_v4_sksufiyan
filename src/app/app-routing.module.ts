import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuardService} from './auth-guard.service';

const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
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
        loadChildren: () => import('./message/message.module').then(m => m.MessagePageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'chat/:id',
        loadChildren: () => import('./chat/chat.module').then(m => m.ChatPageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'changepassword',
        loadChildren: () => import('./change-password/change-password.module').then(m => m.ChangePasswordPageModule),
        // canActivate: [AuthGuardService]
    },
    {
        path: 'surveyoroverview',
        loadChildren: () => import('./surveyoroverview/surveyoroverview.module').then(m => m.SurveyoroverviewPageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'designoverview',
        loadChildren: () => import('./designoverview/designoverview.module').then(m => m.DesignoverviewPageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'searchbar',
        loadChildren: () => import('./searchbar/searchbar.module').then(m => m.SearchbarPageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'declinepage',
        loadChildren: () => import('./declinepage/declinepage.module').then(m => m.DeclinepagePageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'paymentgateway',
        loadChildren: () => import('./paymentgateway/paymentgateway.module').then(m => m.PaymentgatewayPageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'activity/:id/:name',
        loadChildren: () => import('./activity-details/activity-details.module').then(m => m.ActivityDetailsPageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'search-bar1',
        loadChildren: () => import('./search-bar1/search-bar1.module').then(m => m.SearchBar1PageModule),
        canActivate: [AuthGuardService]
    }, {
        path: 'stripe',
        loadChildren: () => import('./stripe/stripe.module').then(m => m.StripePageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'activity-details',
        loadChildren: () => import('./activity-details/activity-details.module').then(m => m.ActivityDetailsPageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'analystoverview',
        loadChildren: () => import('./analystoverview/analystoverview.module').then(m => m.AnalystoverviewPageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'add-money',
        loadChildren: () => import('./add-money/add-money.module').then(m => m.AddMoneyPageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'email-model',
        loadChildren: () => import('./email-model/email-model.module').then(m => m.EmailModelPageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'resendpagedialog',
        loadChildren: () => import('./resendpagedialog/resendpagedialog.module').then(m => m.ResendpagedialogPageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'chat-tabs',
        loadChildren: () => import('./chat-tabs/chat-tabs.module').then(m => m.ChatTabsPageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'groupchat',
        loadChildren: () => import('./groupchat/groupchat.module').then(m => m.GroupchatPageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'groups',
        loadChildren: () => import('./chat-tabs/groups/groups.module').then(m => m.GroupsPageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'payment-modal',
        loadChildren: () => import('./payment-modal/payment-modal.module').then(m => m.PaymentModalPageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'statistics',
        loadChildren: () => import('./statistics/statistics.module').then(m => m.StatisticsPageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'statistics-details',
        loadChildren: () => import('./statistics-details/statistics-details.module').then(m => m.StatisticsDetailsPageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'permit-design-details/:id',
        loadChildren: () => import('./permit-design-details/permit-design-details.module').then(m => m.PermitDesignDetailsPageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'permitschedule',
        loadChildren: () => import('./permitschedule/permitschedule.module').then(m => m.PermitschedulePageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'permitschedule/:id',
        loadChildren: () => import('./permitschedule/permitschedule.module').then(m => m.PermitschedulePageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'permithomepage',
        loadChildren: () => import('./permithomepage/permithomepage.module').then(m => m.PermithomepagePageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'permitdesignoverview',
        loadChildren: () => import('./permitdesignoverview/permitdesignoverview.module').then(m => m.PermitdesignoverviewPageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'statsoverviewdetails',
        loadChildren: () => import('./statsoverviewdetails/statsoverviewdetails.module').then(m => m.StatsoverviewdetailsPageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'coupon-offers-modal',
        loadChildren: () => import('./coupon-offers-modal/coupon-offers-modal.module').then(m => m.CouponOffersModalPageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'onboarding',
        loadChildren: () => import('./onboarding/onboarding.module').then(m => m.OnboardingPageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardPageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'onhold',
        loadChildren: () => import('./onhold/onhold.module').then(m => m.OnholdPageModule)
    },
    {
        path: 'waitingforacceptance',
        loadChildren: () => import('./waitingforacceptance/waitingforacceptance.module').then(m => m.WaitingforacceptancePageModule)
    },
    {
        path: 'unassigned',
        loadChildren: () => import('./unassigned/unassigned.module').then(m => m.UnassignedPageModule)
    },
    {
        path: 'revision',
        loadChildren: () => import('./revision/revision.module').then(m => m.RevisionPageModule)
    },
    {
        path: 'pestamp-schedule',
        loadChildren: () => import('./pestamp-schedule/pestamp-schedule.module').then(m => m.PestampSchedulePageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'pestamp-schedule/:id',
        loadChildren: () => import('./pestamp-schedule/pestamp-schedule.module').then(m => m.PestampSchedulePageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'pestamp-homepage',
        loadChildren: () => import('./pestamp-homepage/pestamp-homepage.module').then(m => m.PestampHomepagePageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'pestamp-design-details/:id',
        loadChildren: () => import('./pestamp-design-details/pestamp-design-details.module').then(m => m.PestampDesignDetailsPageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'pestamp-payment-modal',
        loadChildren: () => import('./pestamp-payment-modal/pestamp-payment-modal.module').then(m => m.PestampPaymentModalPageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'camera/:id/:type/:city/:state/:lat/:long',
        loadChildren: () => import('./surveyprocess/surveyprocess.module').then(m => m.SurveyprocessPageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'peengineer',
        loadChildren: () => import('./peengineer/peengineer.module').then(m => m.PEengineerPageModule)
    },
    {
        path: 'comingsoon',
        loadChildren: () => import('./comingsoon/comingsoon.module').then(m => m.ComingsoonPageModule)
    },
    {
        path: 'pestampdelivermodal',
        loadChildren: () => import('./pestampdelivermodal/pestampdelivermodal.module').then(m => m.PestampdelivermodalPageModule)
    },
    {
        path: 'callingscreen',
        loadChildren: () => import('./callingscreen/callingscreen.module').then(m => m.CallingscreenPageModule)
    },
  {
    path: 'teammodule',
    loadChildren: () => import('./teammodule/teammodule.module').then( m => m.TeammodulePageModule)
  },
  {
    path: 'teamschedule',
    loadChildren: () => import('./teamschedule/teamschedule.module').then( m => m.TeamschedulePageModule)
  },
  {
    path: 'teamschedule/:id',
    loadChildren: () => import('./teamschedule/teamschedule.module').then( m => m.TeamschedulePageModule)
  },
  {
    path: 'sales-proposal',
    loadChildren: () => import('./sales-proposal/sales-proposal.module').then( m => m.SalesProposalPageModule)
  },
  {
    path: 'userregistration',
    loadChildren: () => import('./userregistration/userregistration.module').then( m => m.UserregistrationPageModule)
  },
  {
    path: 'profile-edit-modal',
    loadChildren: () => import('./profile-edit-modal/profile-edit-modal.module').then( m => m.ProfileEditModalPageModule)
  },
  {
    path: 'teamdetails/:id',
    loadChildren: () => import('./teamdetails/teamdetails.module').then( m => m.TeamdetailsPageModule)
  },
  {
    path: 'teamhomepage',
    loadChildren: () => import('./teamhomepage/teamhomepage.module').then( m => m.TeamhomepagePageModule)
  },
  {
    path: 'groupschedule',
    loadChildren: () => import('./groupschedule/groupschedule.module').then( m => m.GroupschedulePageModule)
  },
  {
    path: 'groupschedule/:id',
    loadChildren: () => import('./groupschedule/groupschedule.module').then( m => m.GroupschedulePageModule)
  },
  {
    path: 'groupdetails',
    loadChildren: () => import('./groupdetails/groupdetails.module').then( m => m.GroupdetailsPageModule)
  },




];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

