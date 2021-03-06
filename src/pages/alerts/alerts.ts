import { Component } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import { BackandService } from '@backand/angular2-sdk'; // Add BackandService
import { TabsPage } from '../tabs/tabs'; // So we have access to the loggedUser data e.g. ID


@Component({
  selector: 'page-alerts',
  templateUrl: 'alerts.html'
})

export class AlertsPage {

  user = {};
  alerts = [];
  loggedUser:string = '';
  applicationnotes = [];
  alertsCount = '';

  constructor(public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams, private backand: BackandService) {

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


  } // END CONSTRUCTOR

} // END EXPORT CLASS
