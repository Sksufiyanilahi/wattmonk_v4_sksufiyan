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
import { DateTimeComponent } from './date-time/date-time.component';

@NgModule({
  declarations: [AppComponent, DateTimeComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    HttpClient,
    StorageService,
    AuthGuardService
  ],
  exports: [
    DateTimeComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
