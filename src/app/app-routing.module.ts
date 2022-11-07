import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {
        path: 'login',
        loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
    },
    {
        path: 'activity-details',
        loadChildren: () => import('./pages/activity-details/activity-details.module').then(m => m.ActivityDetailsPageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'activity-details/:id',
        loadChildren: () => import('./pages/activity-details/activity-details.module').then(m => m.ActivityDetailsPageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'activity-details/:id/:name',
        loadChildren: () => import('./pages/activity-details/activity-details.module').then(m => m.ActivityDetailsPageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'add-money',
        loadChildren: () => import('./pages/add-money/add-money.module').then(m => m.AddMoneyPageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'assign',
        loadChildren: () => import('./pages/assign/assign.module').then(m => m.AssignPageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'calling-screen',
        loadChildren: () => import('./pages/calling-screen/calling-screen.module').then(m => m.CallingScreenPageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'analyst-overview',
        loadChildren: () => import('./pages/analyst-overview/analyst-overview.module').then(m => m.AnalystOverviewPageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'change-password',
        loadChildren: () => import('./pages/change-password/change-password.module').then(m => m.ChangePasswordPageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'chat/:id',
        loadChildren: () => import('./pages/chat/chat.module').then(m => m.ChatPageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'chat-add-member/:id',
        loadChildren: () => import('./pages/chat-add-member/chat-add-member.module').then(m => m.ChatAddMemberPageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'chat-members-list/:id',
        loadChildren: () => import('./pages/chat-members-list/chat-members-list.module').then(m => m.ChatMembersListPageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'chat-tabs',
        loadChildren: () => import('./pages/chat-tabs/chat-tabs.module').then(m => m.ChatTabsPageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'client-home',
        loadChildren: () => import('./pages/client-home/client-home.module').then(m => m.ClientHomePageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'client-schedule',
        loadChildren: () => import('./pages/client-schedule/client-schedule.module').then(m => m.ClientSchedulePageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'coming-soon',
        loadChildren: () => import('./pages/coming-soon/coming-soon.module').then(m => m.ComingSoonPageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'coupon-offers-modal',
        loadChildren: () => import('./pages/coupon-offers-modal/coupon-offers-modal.module').then(m => m.CouponOffersModalPageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'dashboard',
        loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardPageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'decline',
        loadChildren: () => import('./pages/decline/decline.module').then(m => m.DeclinePageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'design-details/:id',
        loadChildren: () => import('./pages/design-details/design-details.module').then(m => m.DesignDetailsPageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'design-tracker',
        loadChildren: () => import('./pages/design-tracker/design-tracker.module').then(m => m.DesignTrackerPageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'design-overview',
        loadChildren: () => import('./pages/design-overview/design-overview.module').then(m => m.DesignOverviewPageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'email-model',
        loadChildren: () => import('./pages/email-model/email-model.module').then(m => m.EmailModelPageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'filter',
        loadChildren: () => import('./pages/filter/filter.module').then(m => m.FilterPageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'forgot-password',
        loadChildren: () => import('./pages/forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule)
    },
    {
        path: 'gallery/:id',
        loadChildren: () => import('./pages/gallery/gallery.module').then(m => m.GalleryPageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'group-chat',
        loadChildren: () => import('./pages/group-chat/group-chat.module').then(m => m.GroupChatPageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'groups',
        loadChildren: () => import('./pages/chat-tabs/groups/groups.module').then(m => m.GroupsPageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'group-details/:id',
        loadChildren: () => import('./pages/group-details/group-details.module').then(m => m.GroupDetailsPageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'group-schedule/:id',
        loadChildren: () => import('./pages/group-schedule/group-schedule.module').then(m => m.GroupSchedulePageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'home',
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'home-details',
        loadChildren: () => import('./pages/home-details/home-details.module').then(m => m.HomeDetailsPageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'job-list',
        loadChildren: () => import('./pages/job-list/job-list.module').then(m => m.JobListPageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'job-list-model',
        loadChildren: () => import('./pages/job-list-model/job-list-model.module').then(m => m.JobListModelPageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'logout',
        loadChildren: () => import('./pages/logout/logout.module').then(m => m.LogoutPageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'map',
        loadChildren: () => import('./pages/map/map.module').then(m => m.MapPageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'master-details',
        loadChildren: () => import('./pages/master-details/master-details.module').then(m => m.MasterDetailsPageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'messages',
        loadChildren: () => import('./pages/messages/messages.module').then(m => m.MessagesPageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'notification',
        loadChildren: () => import('./pages/notification/notification.module').then(m => m.NotificationPageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'onboarding',
        loadChildren: () => import('./pages/onboarding/onboarding.module').then(m => m.OnboardingPageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'onhold',
        loadChildren: () => import('./pages/onhold/onhold.module').then(m => m.OnholdPageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'payment-modal',
        loadChildren: () => import('./pages/payment-modal/payment-modal.module').then(m => m.PaymentModalPageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'payment-gateway',
        loadChildren: () => import('./pages/payment-gateway/payment-gateway.module').then(m => m.PaymentGatewayPageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'peengineer',
        loadChildren: () => import('./pages/peengineer/peengineer.module').then(m => m.PeengineerPageModule),
        canActivate: [AuthGuardService]
    },{
        path: 'peengineerfilterpage',
        loadChildren: () => import('./pages/peengineerfilterpage/peengineerfilterpage.module').then(m => m.peengineerFilterpagePageModule)
    },
    {
        path: 'permit-design-details/:id',
        loadChildren: () => import('./pages/permit-design-details/permit-design-details.module').then(m => m.PermitDesignDetailsPageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'permit-design-overview',
        loadChildren: () => import('./pages/permit-design-overview/permit-design-overview.module').then(m => m.PermitDesignOverviewPageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'permit-home',
        loadChildren: () => import('./pages/permit-home/permit-home.module').then(m => m.PermitHomePageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'permit-schedule/:id',
        loadChildren: () => import('./pages/permit-schedule/permit-schedule.module').then(m => m.PermitSchedulePageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'permit-schedule',
        loadChildren: () => import('./pages/permit-schedule/permit-schedule.module').then(m => m.PermitSchedulePageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'pestamp-design-details/:id',
        loadChildren: () => import('./pages/pestamp-design-details/pestamp-design-details.module').then(m => m.PestampDesignDetailsPageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'pestamp-home',
        loadChildren: () => import('./pages/pestamp-home/pestamp-home.module').then(m => m.PestampHomePageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'pestamp-payment-modal',
        loadChildren: () => import('./pages/pestamp-payment-modal/pestamp-payment-modal.module').then(m => m.PestampPaymentModalPageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'pestamp-schedule',
        loadChildren: () => import('./pages/pestamp-schedule/pestamp-schedule.module').then(m => m.PestampSchedulePageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'pestamp-schedule/:id',
        loadChildren: () => import('./pages/pestamp-schedule/pestamp-schedule.module').then(m => m.PestampSchedulePageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'pestamp-deliver-modal',
        loadChildren: () => import('./pages/pestamp-deliver-modal/pestamp-deliver-modal.module').then(m => m.PestampDeliverModalPageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'profile',
        loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfilePageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'profile-edit-modal',
        loadChildren: () => import('./pages/profile-edit-modal/profile-edit-modal.module').then(m => m.ProfileEditModalPageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'resend-dialog',
        loadChildren: () => import('./pages/resend-dialog/resend-dialog.module').then(m => m.ResendDialogPageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'reset-password',
        loadChildren: () => import('./pages/reset-password/reset-password.module').then(m => m.ResetPasswordPageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'revision',
        loadChildren: () => import('./pages/revision/revision.module').then(m => m.RevisionPageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'sales-proposal',
        loadChildren: () => import('./pages/sales-proposal/sales-proposal.module').then(m => m.SalesProposalPageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'schedule',
        loadChildren: () => import('./pages/schedule/schedule.module').then(m => m.SchedulePageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'search-bar',
        loadChildren: () => import('./pages/search-bar/search-bar.module').then(m => m.SearchBarPageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'settings',
        loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsPageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'sorting-filter',
        loadChildren: () => import('./pages/sorting-filter/sorting-filter.module').then(m => m.SortingFilterPageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'start-survey/:id/:type',
        loadChildren: () => import('./pages/start-survey/start-survey.module').then(m => m.StartSurveyPageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'statistics',
        loadChildren: () => import('./pages/statistics/statistics.module').then(m => m.StatisticsPageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'statistics-details',
        loadChildren: () => import('./pages/statistics-details/statistics-details.module').then(m => m.StatisticsDetailsPageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'stats-overview-details',
        loadChildren: () => import('./pages/stats-overview-details/stats-overview-details.module').then(m => m.StatsOverviewDetailsPageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'stripe',
        loadChildren: () => import('./pages/stripe/stripe.module').then(m => m.StripePageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'survey-details/:id',
        loadChildren: () => import('./pages/survey-details/survey-details.module').then(m => m.SurveyDetailsPageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'survey-required-model',
        loadChildren: () => import('./pages/survey-required-model/survey-required-model.module').then(m => m.SurveyRequiredModelPageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'surveyor-overview',
        loadChildren: () => import('./pages/surveyor-overview/surveyor-overview.module').then(m => m.SurveyorOverviewPageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'survey-process',
        loadChildren: () => import('./pages/survey-process/survey-process.module').then(m => m.SurveyProcessPageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'team-details/:id',
        loadChildren: () => import('./pages/team-details/team-details.module').then(m => m.TeamDetailsPageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'team-home',
        loadChildren: () => import('./pages/team-home/team-home.module').then(m => m.TeamHomePageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'team-schedule',
        loadChildren: () => import('./pages/team-schedule/team-schedule.module').then(m => m.TeamSchedulePageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'team-schedule/:id',
        loadChildren: () => import('./pages/team-schedule/team-schedule.module').then(m => m.TeamSchedulePageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'unassigned',
        loadChildren: () => import('./pages/unassigned/unassigned.module').then(m => m.UnassignedPageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'user-registration',
        loadChildren: () => import('./pages/user-registration/user-registration.module').then(m => m.UserRegistrationPageModule)
    },
    {
        path: 'waiting-for-acceptance',
        loadChildren: () => import('./pages/waiting-for-acceptance/waiting-for-acceptance.module').then(m => m.WaitingForAcceptancePageModule),
        canActivate: [AuthGuardService]
    }
    ,
    {
        path: 'paypal-payment',
        loadChildren: () => import('./pages/paypal-payment/paypal-payment.module').then(m => m.PaypalPaymentPageModule),
        canActivate: [AuthGuardService]
    },{
        path: 'unassigned',
        loadChildren: () => import('./pages/unassigned/unassigned.module').then(m => m.UnassignedPageModule),
        canActivate: [AuthGuardService]
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
