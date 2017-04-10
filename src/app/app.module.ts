import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ApplicationsPage } from '../pages/applications/applications';
import { AlertsPage } from '../pages/alerts/alerts';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { MenuPage } from '../pages/menu/menu';

import { ProfilePage } from '../pages/profile/profile';
import { SubmitApplicationPage } from '../pages/profile/submit-application';

import { TabsPage } from '../pages/tabs/tabs';
import { DocumentsPage } from '../pages/documents/documents';
import { IncomePage } from '../pages/income/income';

import { MyAccountPage } from '../pages/my-account/my-account';
import { EmergencyPage } from '../pages/my-account/emergency';
import { EmergencyAddPage } from '../pages/my-account/emergency-add';
// import { EmergencyPage } from '../pages/emergency/emergency';

import { OccupantsPage } from '../pages/occupants/occupants';
import { RentalCheckPage } from '../pages/rental-check/rental-check';

import { RentalHistoryPage } from '../pages/rental-history/rental-history';
import { RentalHistoryAddPage } from '../pages/rental-history/rental-history-add';

import { SettingsPage } from '../pages/settings/settings';
import { UtilitiesPage } from '../pages/utilities/utilities';
import { OffersPage } from '../pages/offers/offers';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { LandingPage } from '../pages/landing/landing';

import { BackandService } from '@backand/angular2-sdk'; // Add BackandService
import { IonicStorageModule } from '@ionic/storage'; // Storage for storing data on users phone



@NgModule({
  declarations: [
    MyApp,
    AlertsPage,
    DashboardPage,
    MenuPage,
    ProfilePage,
    SubmitApplicationPage,
    TabsPage,
    DocumentsPage,
    IncomePage,
    MyAccountPage,
    EmergencyPage,
    EmergencyAddPage,
    OccupantsPage,
    RentalCheckPage,
    RentalHistoryPage,
    RentalHistoryAddPage,
    SettingsPage,
    UtilitiesPage,
    ApplicationsPage,
    OffersPage,
    LoginPage,
    SignupPage,
    LandingPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot() // Storage also imported here
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AlertsPage,
    DashboardPage,
    MenuPage,
    ProfilePage,
    SubmitApplicationPage,
    TabsPage,
    DocumentsPage,
    IncomePage,
    MyAccountPage,
    EmergencyPage,
    EmergencyAddPage,
    OccupantsPage,
    RentalCheckPage,
    RentalHistoryPage,
    RentalHistoryAddPage,
    SettingsPage,
    UtilitiesPage,
    ApplicationsPage,
    OffersPage,
    LoginPage,
    SignupPage,
    LandingPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BackandService // Again add BackandService
  ]
})
export class AppModule {}
