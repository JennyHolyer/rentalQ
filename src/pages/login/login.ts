import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Observable} from "RxJS/Rx"; // import 'rxjs/Rx';
import { BackandService } from '@backand/angular2-sdk'; // Add BackandService
import { Http } from '@angular/http';
import { DashboardPage } from '../dashboard/dashboard';
import { SignupPage } from '../signup/signup';
import { TabsPage } from '../tabs/tabs';
import { Storage } from '@ionic/storage'; // Storage imported here after declaration in app.module.ts
import { MenuPage } from '../menu/menu';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  username:string = 'jack@test.com';
  password:string = 'password';
  auth_type:string = "N/A";
  is_auth_error:boolean = false;
  auth_status:string = null;
  loggedInUser: string = '';
  oldPassword: string = '';
  newPassword: string = '';
  confirmNewPassword: string = '';


  constructor(public navCtrl: NavController, public navParams: NavParams, private backand: BackandService, public http: Http, storage: Storage) {
    // this.auth_type = backand.getAuthType();
    // this.auth_status = backand.getAuthStatus();
    // this.loggedInUser = backand.getUsername();

    storage.ready().then(() => {
       // set a key/value
       storage.set('name', 'Max');
       // Or to get a key/value pair
       storage.get('age').then((val) => {
         console.log('Your age is', val);
       })
     }); // End of storage

  } // End of constructor

  public getAuthTokenSimple() {

    this.auth_type = 'Token';
    this.backand.signin(this.username, this.password)
    .then(res => {
      console.log('signin succeeded with user:' + res.data.firstName);
      this.auth_status = 'OK';
      this.is_auth_error = false;
      this.loggedInUser = res.data.userId;
      // this.navCtrl.setRoot(DashboardPage, {loggedInUser: res.data.userId});
      this.navCtrl.setRoot(MenuPage, {loggedInUser: res.data.userId});
      this.navCtrl.setRoot(TabsPage, {loggedInUser: res.data.userId});
      this.username = '';
      this.password = '';
    })
    .catch(err => {
        console.log("Error Message!")
      console.log(err);

      // this.auth_status = `Error: ${errorMessage}`;
      console.log("Another error message in login!")
      this.is_auth_error = true;
      console.log("Error message that couldn't be extracted!")
      // this.backand.logError(err)

    });
  }

      public useAnonymousAuth() {
          this.backand.useAnonymousAuth();
          this.auth_status = 'OK';
          this.is_auth_error = false;
          this.auth_type = 'Anonymous';
          this.loggedInUser = 'Anonymous';
      }





      public changePassword() {
          if (this.newPassword != this.confirmNewPassword){
              alert('Passwords should match');
              return;
          }
          var $obs = this.backand.changePassword(this.oldPassword, this.newPassword);
          $obs.subscribe(
              data => {
                  alert('Password changed');
                  this.oldPassword = this.newPassword = this.confirmNewPassword = '';
              },
              err => {
                console.log("Error message that couldn't be extracted!")
                  // this.backand.logError(err)
              },
              () => console.log('Finish change password'));
      }



  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  public signUp() {
    this.navCtrl.setRoot(SignupPage);
  }


}
