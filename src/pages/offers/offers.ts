import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BackandService } from '@backand/angular2-sdk'; // Add BackandService
import { LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import {ToastController} from 'ionic-angular';
import {AlertController} from 'ionic-angular';


/*
  Generated class for the Offers page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-offers',
  templateUrl: 'offers.html'
})
export class OffersPage {
  loggedUser:string = '';
  user = {};
  approved = [];
  applications = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private backand: BackandService, private alertController: AlertController, private toastCtrl: ToastController, public http: Http, public loadingCtrl: LoadingController) {

    let loader = this.loadingCtrl.create({
      content: "Loading...",
      duration: 800
      });
      loader.present();
     // End of loader

    backand.user.getUserDetails(false)
   .then(res => {
     this.loggedUser = res.data.userId
     console.log(res.data, "<==== 12. OFFERS GET USER DETAILS");
     this.backand.object.getOne("users", this.loggedUser, {
       "deep" : true })
       .then(res => {
         this.user = res.data
         this.applications = res.data.applicationinformation
         /////////////////////////////////////////////////////
         //   GRAB ALL APPLICATIONS WITH STATUS APPROVED! ///
         ///////////////////////////////////////////////////
         this.approved = []
         for(let i = 0; i < this.applications.length; i++) {
           console.log(this.applications[i].status, "$$$$$$$$$$$$$$$");
           if (this.applications[i].status == "Approved") {
             this.approved.push(this.applications[i])
           }
         }
         return this.approved;
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad OffersPage');
  }

}
