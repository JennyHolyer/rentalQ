import { Component } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import { BackandService } from '@backand/angular2-sdk'; // Add BackandService
import { DashboardPage } from '../dashboard/dashboard';
import { AlertsPage } from '../alerts/alerts';
import { ProfilePage } from '../profile/profile';
import { MenuPage } from '../menu/menu';
import { Badge } from '@ionic-native/badge';

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

  user = {};
  alerts = [];
  loggedUser:string = '';
  applicationnotes = [];
  alertsCount = '';
  alertBadgeCount = 0;

  constructor(private badge: Badge, public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams, private backand: BackandService) {

    backand.user.getUserDetails(false)
    .then(res => {
     this.user = res.data
     this.loggedUser = res.data.userId
     console.log(res.data, "<==== 4. ALERTS GET USER DETAILS");

     this.backand.object.getOne("users", this.loggedUser, {
       "deep" : true })
       .then(res => {
         this.applicationnotes = res.data.applicationnotes
         /////////////////////////////////////////////////////
         //   GRAB ALL APPLICATIONS WITH STATUS APPROVED! ///
         ///////////////////////////////////////////////////
         this.alerts = []
         for(let i = 0; i < this.applicationnotes.length; i++) {
           console.log(this.applicationnotes[i].notify_user, "$$$$$$$$$$$$$$$");
           if (this.applicationnotes[i].notify_user == true) {
             this.alerts.push(this.applicationnotes[i])
           }
         }
         this.alertBadgeCount = this.alerts.length
         return this.alerts;
     })
     .catch(err => {
       console.log(err);
     }); // End of user object fetch

   })
   .catch(err => {
     console.log(err);
   }); // End of user object fetch

   //  this.loggedUser = this.navParams.get('loggedUser');
   // console.log(this.loggedUser, "<==== ALERTS USER ID FOR LOGGED IN USER");


  }
}
