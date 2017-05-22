import { Component } from '@angular/core';
import {Deploy} from '@ionic/cloud-angular';
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
  applications = [];
  applicationsCount:string = '';
  approved = [];
  approvedCount:number = 0;
  status:string = '';
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
  dashboard = '';

  // {
  //   applications: '',
  //   approved: '',
  //   offers: ''
  // }



constructor(public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, private backand: BackandService) {
// , public deploy: Deploy
  this.dashboard = "applications";

  let loader = this.loadingCtrl.create({
    content: "Loading...",
    duration: 600
    });
    loader.present();
   // End of loader

   backand.user.getUserDetails(false)
  .then(res => {
    this.loggedUser = res.data.userId
    // console.log(res.data, "<==== 3. DASHBOARD GET USER DETAILS");
    this.backand.object.getOne("users", this.loggedUser, {
      "deep" : true })
      .then(res => {
        this.user = res.data
        this.applications = res.data.applicationinformation
        this.applicationsCount = res.data.applicationinformation.length
        this.approved = res.data.applicationinformation
        // console.log(res.data, "<==== 5. APPLICATION GET USER DETAILS");
        // console.log(this.applications, "<======== Logged Users Applications")

        // this.approved = []
        // console.log(this.approved, "<=== APPROVED: Outside for loop");
        // console.log(this.approved[0].status, "<=== STATUS: Outside for loop");


        /////////////////////////////////////////////////////
        //   GRAB ALL APPLICATIONS WITH STATUS APPROVED! ///
        ///////////////////////////////////////////////////
        let approvedArr = []
        for(let i = 0; i < this.approved.length; i++) {
          if (this.approved[i].status == "Approved") {
            approvedArr.push(this.approved[i])
          }
        }
        console.log(approvedArr.length, "LENGTH")
        console.log(this.approved, "approvedArr")
        this.approvedCount = approvedArr.length
        this.approved = approvedArr
        return approvedArr;
    })
    .catch(err => {
      console.log(err);
    }); // End of user object fetch
    // Show user's applications in order of submission
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
