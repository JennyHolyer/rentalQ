import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { DashboardPage } from '../dashboard/dashboard';
import { AlertsPage } from '../alerts/alerts';
import { ProfilePage } from '../profile/profile';
import { DocumentsPage } from '../documents/documents';
import { IncomePage } from '../income/income';
import { MyAccountPage } from '../my-account/my-account';
import { OccupantsPage } from '../occupants/occupants';
import { RentalCheckPage } from '../rental-check/rental-check';
import { RentalHistoryPage } from '../rental-history/rental-history';
import { SettingsPage } from '../settings/settings';
import { UtilitiesPage } from '../utilities/utilities';
import { OffersPage } from '../offers/offers';
import { BackandService } from '@backand/angular2-sdk'; // Add BackandService



@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {

  items = [];
  dashboardPage = DashboardPage;
  profilePage = ProfilePage;
  tabsPage = TabsPage;
  documentsPage = DocumentsPage;
  incomePage = IncomePage;
  myAccountPage = MyAccountPage;
  occupantsPage = OccupantsPage;
  rentalCheckPage = RentalCheckPage;
  rentalHistoryPage = RentalHistoryPage;
  settingsPage = SettingsPage;
  utilitiesPage = UtilitiesPage;
  offersPage = OffersPage;

  constructor(public navCtrl: NavController) {
    this.profilePage = ProfilePage;
    this.dashboardPage = DashboardPage;
    this.rentalHistoryPage = RentalHistoryPage;
    this.rentalCheckPage = RentalCheckPage;
    this.occupantsPage = OccupantsPage;
    this.incomePage = IncomePage;
    this.documentsPage = DocumentsPage;
    this.utilitiesPage = UtilitiesPage;
    this.myAccountPage = MyAccountPage;
    this.settingsPage = SettingsPage;


    this.items = [
      {
        'title': 'Rental Check',
        'icon': 'ios-checkmark-circle',
        'link': this.rentalCheckPage,
      },
      {
        'title': 'Rental History',
        'icon': 'ios-refresh-circle',
        'link': this.rentalHistoryPage,
      },
      {
        'title': 'Occupants',
        'icon': 'ios-people',
        'link': this.occupantsPage,
      },
      {
        'title': 'Employment History',
        'icon': 'logo-usd',
        'link': this.incomePage,
      },
      {
        'title': 'Suporting Documents',
        'icon': 'ios-paper',
        'link': this.documentsPage,
      },
      {
        'title': 'Utilities Connection',
        'icon': 'ios-bulb',
        'link': this.utilitiesPage,
      },
      {
        'title': 'My Account',
        'icon': 'ios-person',
        'link': this.myAccountPage,
      },
      {
        'title': 'Settings',
        'icon': 'ios-settings',
        'link': this.settingsPage,
      },
    ]

  }

}
