import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthGuardService } from './auth-guard.service';
import { StorageService } from './storage.service';
import { UtilitiesModule } from './utilities/utilities.module';
import { SuccessModalComponent } from './utilities/success-modal/success-modal.component';
import { CometChat } from '@cometchat-pro/cordova-ionic-chat';
// import { FCM } from '@ionic-native/fcm/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { Firebase } from '@ionic-native/firebase/ngx';
import {NgxImageCompressService} from 'ngx-image-compress';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Network } from '@ionic-native/network/ngx';
import { Stripe } from '@ionic-native/stripe/ngx';
import {SocialSharing} from '@ionic-native/social-sharing/ngx';
import { Dialogs} from '@ionic-native/dialogs/ngx';
import { Keyboard } from '@ionic-native/keyboard/ngx';

@NgModule({
  declarations: [AppComponent, SuccessModalComponent],
  entryComponents: [SuccessModalComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    UtilitiesModule,
    IonicStorageModule.forRoot()
  ],
  providers: [
    StatusBar,
    SplashScreen,
    // FCM,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    HttpClient,
    StorageService,
    AuthGuardService,
    Geolocation,
    Firebase,
    NgxImageCompressService,
    Camera,
    InAppBrowser,
    Network,
    Stripe,
    SocialSharing,
    Dialogs,
    Keyboard
    ],
  exports: [
    UtilitiesModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
