import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
// import 'rxjs/Rx';
import {Observable} from "RxJS/Rx";
import { BackandService } from '@backand/angular2-sdk'; // Add BackandService
import { Http } from '@angular/http';
import { DashboardPage } from '../dashboard/dashboard';
import { LoginPage } from '../login/login';
import { TabsPage } from '../tabs/tabs';
import { StatusBar } from '@ionic-native/status-bar';


/*
  Generated class for the Signup page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  email:string = '';
  firstName:string = '';
  lastName:string = '';
  password: string = '';
  confirmPassword: string = '';
  loggedInUser: string = '';
  signup = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: ''
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private backand: BackandService, public http: Http, private statusBar: StatusBar) {

    this.statusBar.overlaysWebView(true);
    this.statusBar.backgroundColorByHexString('#ffffff');

  }



  // public signUp() {
  //   console.log("Entered Sign Up Method")
  //   if (this.password != this.confirmPassword){
  //     alert('Passwords should match');
  //     return;
  //   }
  //   let $obs = this.backand.signup(this.email, this.password, this.confirmPassword, this.firstName, this.lastName);
  //   $obs.subscribe(
  //     data => {
  //         alert('Sign up succeeded');
  //         console.log(data);
  //         this.email = this.password = this.confirmPassword = this.firstName = this.lastName = '';
  //     },
  //     err => {
  //         // this.backand.logError(err)
  //         console.log("Error Signing Up!")
  //     },
  // }


  public signUp() {
  console.log("Entered Sign Up Method")
  if (this.password != this.confirmPassword){
    alert('Passwords should match');
    return;
  }
  this.backand.signup(this.signup.firstName, this.signup.lastName, this.signup.email, this.signup.password, this.signup.confirmPassword)
  .then(res => {
    console.log(res, "RES");
    console.log(res.data, "RES.DATA");
    alert('Sign up succeeded');
    this.loggedInUser = res.data.userId;
    this.navCtrl.setRoot(DashboardPage, {loggedInUser: res.data.userId});
    this.navCtrl.setRoot(TabsPage, {loggedInUser: res.data.userId});

    this.email = this.password = this.confirmPassword = this.firstName = this.lastName = '';
  })
  .catch(err => {
    console.log("Error Signing Up!")
    console.log(err);
  });

}

  public socialSignin(provider) {
    console.log("Entered Sign Up Method- with FACEBOOK")
    this.backand.socialSignin(provider)
    .then(res => {
      console.log('Sign up succeeded with:' + provider);
    })
    .catch(err => {
      console.log(err);
      console.log("Error with Social Sign In")
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  public login() {
    this.navCtrl.setRoot(LoginPage);
  }


}
