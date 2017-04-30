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
import { EmploymentsAddPage } from '../pages/income/employments-add';
import { SelfEmployedAddPage } from '../pages/income/self-employed-add';
import { RetiredAddPage } from '../pages/income/retired-add';

import { MyAccountPage } from '../pages/my-account/my-account';
import { EmergencyEditPage } from '../pages/my-account/emergency-edit';
import { EmergencyAddPage } from '../pages/my-account/emergency-add';
import { PersonalInformationEditPage } from '../pages/my-account/personal-information-edit';

// import { EmergencyEditPage } from '../pages/emergency/emergency';

import { OccupantsPage } from '../pages/occupants/occupants';
import { CoApplicantsAddPage } from '../pages/occupants/coapplicants-add';
import { DependentsAddPage } from '../pages/occupants/dependents-add';
import { PetsAddPage } from '../pages/occupants/pets-add';



import { RentalCheckPage } from '../pages/rental-check/rental-check';

import { RentalHistoryPage } from '../pages/rental-history/rental-history';
import { RentalHistoryAddPage } from '../pages/rental-history/rental-history-add';
import { RentalHistoryEditPage } from '../pages/rental-history/rental-history-edit';


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
    EmploymentsAddPage,
    SelfEmployedAddPage,
    RetiredAddPage,
    MyAccountPage,
    EmergencyEditPage,
    EmergencyAddPage,
    PersonalInformationEditPage,
    OccupantsPage,
    CoApplicantsAddPage,
    DependentsAddPage,
    PetsAddPage,
    RentalCheckPage,
    RentalHistoryPage,
    RentalHistoryAddPage,
    RentalHistoryEditPage,
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
    EmploymentsAddPage,
    SelfEmployedAddPage,
    RetiredAddPage,
    MyAccountPage,
    PersonalInformationEditPage,
    EmergencyEditPage,
    EmergencyAddPage,
    OccupantsPage,
    CoApplicantsAddPage,
    DependentsAddPage,
    PetsAddPage,
    RentalCheckPage,
    RentalHistoryPage,
    RentalHistoryAddPage,
    RentalHistoryEditPage,
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
