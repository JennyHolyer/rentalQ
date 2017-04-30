import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Observable} from "RxJS/Rx"; // import 'rxjs/Rx';
import { BackandService } from '@backand/angular2-sdk'; // Add BackandService
import { Http } from '@angular/http';
import { SignupPage } from '../signup/signup'
// import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Landing page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html'
})
export class LandingPage {

  slides = [
    {
      title: "Welcome to Rental Q!",
      description: "The <b>renters app</b> that has revolutionalized the way you apply for rental property.",
      image: "https://ionicframework.com/dist/preview-app/www/assets/img/ica-slidebox-img-1.png",
    },
    {
      title: "What is Rental Q?",
      description: "<b>We are a small team of dedicated </b> is an open source SDK that enables developers to build high quality mobile apps with web technologies like HTML, CSS, and JavaScript.",
      image: "https://ionicframework.com/dist/preview-app/www/assets/img/ica-slidebox-img-2.png",
    },
    {
      title: "What is Rental Check?",
      description: "The <b>Rental Q</b> approach aims to take away as much time as possible in everything that you do a cloud platform for managing and scaling Ionic apps with integrated services like push notifications.",
      image: "https://ionicframework.com/dist/preview-app/www/assets/img/ica-slidebox-img-3.png",
    },
    // {
    //   title: "Ready to Play?",
    //   description: "<h2>Continue?</h2>",
    //   image: "https://ionicframework.com/dist/preview-app/www/assets/img/ica-slidebox-img-2.png",
    // }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams, private backand: BackandService, public http: Http) {}
  // constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LandingPage');
  }

  public signUp() {
  this.navCtrl.setRoot(SignupPage);
  }

}
