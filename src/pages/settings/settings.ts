import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AlertController} from 'ionic-angular';
import {ToastController} from 'ionic-angular';
import { BackandService } from '@backand/angular2-sdk'; // Add BackandService
import { Http } from '@angular/http';
import { LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';


/*
  Generated class for the Settings page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  auth_type:string = "N/A";
  is_auth_error:boolean = false;
  auth_status:string = null;
  loggedUser: string = '';
  user = {};
  access_token = null;

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
     this.access_token = res.data.access_token
     this.loggedUser = res.data.userId
     console.log(res.data, "<==== 17. SETTINGS GET USER DETAILS");
   })
   .catch(err => {
     console.log(err);
   }); // End of user object fetch

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  public signOut() {
      this.loggedUser = '';
      this.backand.signout();
      console.log(this.access_token, "<=====Access Token");
      this.access_token = null;
      console.log(this.access_token, "<=====After Deletion");
      console.log("Successfully logged out!")
      this.navCtrl.setRoot(LoginPage);
  }

}
