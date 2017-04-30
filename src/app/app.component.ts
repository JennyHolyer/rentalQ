import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BackandService } from '@backand/angular2-sdk'
import { TabsPage } from '../pages/tabs/tabs';
import { LandingPage } from '../pages/landing/landing';
import { LoginPage } from '../pages/login/login';
// import * as io from "socket.io-client";



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = LoginPage;
  auth_status:string = null;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private backand:BackandService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      // Initialize Back&
      backand.init({
      appName: 'rentalq',
      signUpToken: '4ce62fa3-9d0f-4257-b235-1688890fb67b',
      anonymousToken: 'fce792db-2f1b-4d37-9d77-76d0ff0a49f2',
      // runSocket: true,
      mobilePlatform: 'ionic'
      });

    });
  }
}
