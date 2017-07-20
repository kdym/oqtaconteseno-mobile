import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {CloudSettings, CloudModule} from '@ionic/cloud-angular';

import {MyApp} from './app.component';
import {Geolocation} from "@ionic-native/geolocation";
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {HttpModule, Http} from '@angular/http';
import {NativeStorage} from "@ionic-native/native-storage";
import {LoginPage} from "../pages/login/login";
import {HomePage} from "../pages/home/home";
import {Facebook} from "@ionic-native/facebook";
import {ProfilePage} from "../pages/profile/profile";
import {AuthProvider} from '../providers/auth/auth';
import {DebugServerProvider} from '../providers/debug-server/debug-server';
import {UserProvider} from '../providers/user/user';
import {GlobalConstantsProvider} from '../providers/global-constants/global-constants';
import {GoogleMapsProvider} from '../providers/google-maps/google-maps';
import {AddEventPage} from "../pages/add-event/add-event";

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'cf8277a6'
  },
  'auth': {
    'facebook': {
      'scope': []
    }
  }
};

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    ProfilePage,
    AddEventPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    ProfilePage,
    AddEventPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    Facebook,
    NativeStorage,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    DebugServerProvider,
    UserProvider,
    GlobalConstantsProvider,
    GoogleMapsProvider
  ]
})
export class AppModule {
}

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
