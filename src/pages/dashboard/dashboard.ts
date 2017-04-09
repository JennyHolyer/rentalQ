import { Component } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import { ApplicationsPage } from '../applications/applications';
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
import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';
import { LandingPage } from '../landing/landing';
import { SubmitApplicationPage } from '../profile/submit-application';
import { ModalController } from 'ionic-angular';
import { BackandService } from '@backand/angular2-sdk'; // Add BackandService
import { TabsPage } from '../tabs/tabs';


@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class DashboardPage {
  applicationsPage = ApplicationsPage;
  profilePage = ProfilePage;
  documentsPage = DocumentsPage;
  incomePage = IncomePage;
  myAccountPage = MyAccountPage;
  occupantsPage = OccupantsPage;
  rentalCheckPage = RentalCheckPage;
  rentalHistoryPage = RentalHistoryPage;
  settingsPage = SettingsPage;
  utilitiesPage = UtilitiesPage;
  offersPage = OffersPage;
  loginPage = LoginPage;
  signupPage = SignupPage;
  landingPage = LandingPage;
  loggedUser: string = '';
  user = {};

constructor(public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, private backand: BackandService) {

  let loader = this.loadingCtrl.create({
    content: "Loading...",
    duration: 600
    });
    loader.present();
   // End of loader

   backand.user.getUserDetails(false)
  .then(res => {
    this.user = res.data
    this.loggedUser = res.data.userId
    console.log(res.data, "<==== 3. DASHBOARD GET USER DETAILS");
  })
  .catch(err => {
    console.log(err);
  }); // End of user object fetch

} // End of constructor




  public login() {
    this.navCtrl.setRoot(LoginPage);
  }

  public signUp() {
    this.navCtrl.setRoot(SignupPage)
  }

  public tourApp() {
    this.navCtrl.setRoot(LandingPage)
  }

  newApplicationModal() {
    let modal = this.modalCtrl.create(SubmitApplicationPage);
    modal.present();
  }


}
