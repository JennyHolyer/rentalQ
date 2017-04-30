import { Component } from '@angular/core';

import { DashboardPage } from '../dashboard/dashboard';
import { AlertsPage } from '../alerts/alerts';
import { ProfilePage } from '../profile/profile';
import { MenuPage } from '../menu/menu';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = DashboardPage;
  tab2Root: any = AlertsPage;
  tab3Root: any = ProfilePage;
  tab4Root: any = MenuPage;

  constructor() {

  }
}
