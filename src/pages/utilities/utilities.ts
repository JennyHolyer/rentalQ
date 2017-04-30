import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AlertController} from 'ionic-angular';
import {ToastController} from 'ionic-angular';
import { BackandService } from '@backand/angular2-sdk'; // Add BackandService
import { Http } from '@angular/http';
import { LoadingController } from 'ionic-angular';


/*
  Generated class for the Utilities page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-utilities',
  templateUrl: 'utilities.html'
})
export class UtilitiesPage {

  user = {};
  loggedUser: string = '';
  utilities: any[] = [];
  electricity: boolean = false;
  gas: boolean = false;
  cable: boolean = false;
  water: boolean = false;
  terms: boolean = false;

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
         this.utilities = res.data.utilities
         this.electricity = res.data.utilities[0].electricity
         this.gas = res.data.utilities[0].gas
         this.cable = res.data.utilities[0].cable
         this.water = res.data.utilities[0].water
         this.terms = res.data.utilities[0].termsAgree
         console.log(this.water, "<==== Users water");
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
    console.log('ionViewDidLoad UtilitiesPage');
  }

}
