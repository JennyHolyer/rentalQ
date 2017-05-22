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
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



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
  public signupForm:any;
  errorMessage: string = '';



  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public navParams: NavParams, private backand: BackandService, public http: Http, private statusBar: StatusBar) {

    this.statusBar.overlaysWebView(true);
    this.statusBar.backgroundColorByHexString('#ffffff');

    this.signupForm = this.formBuilder.group({
        "email": ['', Validators.required],
        "firstName": ['', Validators.required],
        "lastName": ['', Validators.required],
        "password": ['', Validators.required],
        "confirmPassword": ['', Validators.required]
    });

  } // End of constructor

  public signUp() {
  // console.log("Entered Sign Up Method")
  // if (this.signupForm.value.password != this.signupForm.value.confirmPassword){
  //   alert('Passwords should match');
  //   return;
  // }
  this.backand.signup(this.signupForm.value.firstName, this.signupForm.value.lastName, this.signupForm.value.email, this.signupForm.value.password, this.signupForm.value.confirmPassword)
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
    this.errorMessage = err.data;
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
