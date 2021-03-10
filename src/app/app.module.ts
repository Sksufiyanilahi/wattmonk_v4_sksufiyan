import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HttpClient, HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthGuardService} from './auth-guard.service';
import {StorageService} from './storage.service';
import {UtilitiesModule} from './utilities/utilities.module';
import {SuccessModalComponent} from './utilities/success-modal/success-modal.component';
// import { FCM } from '@ionic-native/fcm/ngx';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {IonicStorageModule} from '@ionic/storage';
import {Firebase} from '@ionic-native/firebase/ngx';
import {NgxImageCompressService} from 'ngx-image-compress';
import {Camera} from '@ionic-native/camera/ngx';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';
import {Network} from '@ionic-native/network/ngx';
import {Stripe} from '@ionic-native/stripe/ngx';
import {SocialSharing} from '@ionic-native/social-sharing/ngx';
import {Dialogs} from '@ionic-native/dialogs/ngx';
import {Keyboard} from '@ionic-native/keyboard/ngx';
import {ChartsModule} from 'ng2-charts';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {Intercom, IntercomConfig, IntercomModule} from 'ng-intercom';
import {intercomId} from './contants';
import {AndroidPermissions} from '@ionic-native/android-permissions/ngx';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireModule} from '@angular/fire';
import {environment} from 'src/environments/environment';
import {Mixpanel, MixpanelPeople} from '@ionic-native/mixpanel/ngx';
import {BackgroundMode} from '@ionic-native/background-mode/ngx';
import { MyLoaderComponent } from './components/my-loader/my-loader.component';
import { LoaderInterceptorService } from './interceptors/loader-interceptor.service';
import { PopoverComponentComponent } from './popover-component/popover-component.component';

// import { LinkifyPipe } from './linkify.pipe';


@NgModule({
    declarations: [AppComponent, SuccessModalComponent,MyLoaderComponent,PopoverComponentComponent],
    entryComponents: [SuccessModalComponent,PopoverComponentComponent],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        HttpClientModule,
        UtilitiesModule,
        IonicStorageModule.forRoot(),
        ChartsModule,
        FormsModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatProgressBarModule,
        MatDialogModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        IntercomModule.forRoot({
            appId: intercomId
        }),
        AngularFireDatabaseModule,
        AngularFireModule.initializeApp(environment.firebase)

    ],
    providers: [
        StatusBar,
        SplashScreen,
        // FCM,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        // { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptorService, multi: true },
        HttpClient,
        StorageService,
        AuthGuardService,
        Geolocation,
        Firebase,
        NgxImageCompressService,
        BackgroundMode,
        Camera,
        InAppBrowser,
        Network,
        Stripe,
        SocialSharing,
        Dialogs,
        Keyboard,
        Intercom,
        IntercomConfig,
        AndroidPermissions,
        Mixpanel,
        MixpanelPeople
    ],
    exports: [
        UtilitiesModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
