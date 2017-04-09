import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AlertController} from 'ionic-angular';
import {ToastController} from 'ionic-angular';
import { BackandService } from '@backand/angular2-sdk'; // Add BackandService
import { Http } from '@angular/http';
import { LoadingController } from 'ionic-angular';



/*
  Generated class for the RentalHistory page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-rental-history',
  templateUrl: 'rental-history.html'
})
export class RentalHistoryPage {

  rentalHistory: any[] = [];
  user = {};
  loggedUser:string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private backand: BackandService, private alertController: AlertController, private toastCtrl: ToastController, public http: Http, public loadingCtrl: LoadingController) {

    let loader = this.loadingCtrl.create({
      content: "Loading...",
      duration: 800
      });
      loader.present();
     // End of loader

     backand.user.getUserDetails(false)
    .then(res => {
      this.user = res.data
      this.loggedUser = res.data.userId
      
      this.backand.object.getOne("users", this.loggedUser, {
        "deep" : true })
        .then(res => {
          this.user = res.data
          this.rentalHistory = res.data.rentalhistory
      })
      .catch(err => {
        console.log(err);
      }); // End of user object fetch


    })
    .catch(err => {
      console.log(err);
    }); // End of user object fetch



  } // END OF CONSTRUCTOR

  ionViewDidLoad() {
    console.log('ionViewDidLoad RentalHistoryPage');
  }

}
