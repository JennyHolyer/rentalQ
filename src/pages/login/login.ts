import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Observable} from "RxJS/Rx"; // import 'rxjs/Rx';
import { BackandService } from '@backand/angular2-sdk'; // Add BackandService
import { Http } from '@angular/http';
import { DashboardPage } from '../dashboard/dashboard';
import { SignupPage } from '../signup/signup';
import { TabsPage } from '../tabs/tabs';
import { Storage } from '@ionic/storage'; // Storage imported here after declaration in app.module.ts
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


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
  errorMessage: string = '';
  public loginForm:any;

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public navParams: NavParams, private backand: BackandService, public http: Http, storage: Storage) {
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

     this.loginForm = this.formBuilder.group({
         "username": ['', Validators.required],
         "password": ['', Validators.required]

     });
  } // End of constructor



  public getAuthTokenSimple() {

    this.auth_type = 'Token';
    this.backand.signin(this.loginForm.value.username, this.loginForm.value.password)
    .then(res => {
      console.log('signin succeeded with user:' + res.data.firstName);
      this.auth_status = 'OK';
      this.is_auth_error = false;
      this.loggedInUser = res.data.userId;
      this.navCtrl.setRoot(DashboardPage, {loggedInUser: res.data.userId});
      this.navCtrl.setRoot(TabsPage, {loggedInUser: res.data.userId});
      console.log(res.data.userId, "<==== 1. LOGIN USER ID FOR LOGGED IN USER")
      console.log(res.data, "<*********** 2. LOGIN USER DATA")
      this.username = '';
      this.password = '';
    })
    .catch(err => {
        this.errorMessage = "Your email & password don't match!"
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
