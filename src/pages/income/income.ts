import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AlertController} from 'ionic-angular';
import {ToastController} from 'ionic-angular';
import { BackandService } from '@backand/angular2-sdk'; // Add BackandService
import { Http } from '@angular/http';
import { LoadingController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { EmploymentsAddPage } from './employments-add';
import { SelfEmployedAddPage } from './self-employed-add';
import { RetiredAddPage } from './retired-add';


/*
  Generated class for the Income page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-income',
  templateUrl: 'income.html'
})
export class IncomePage {
  user = {};
  loggedUser:string = '';
  public incomeemployment: any[] = [];
  public incomeselfemployed: any[] = [];
  public incomeretired: any[] = [];

  constructor(public modalCtrl: ModalController, navCtrl: NavController, public navParams: NavParams, private backand: BackandService, private alertController: AlertController, private toastCtrl: ToastController, public http: Http, public loadingCtrl: LoadingController) {

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
          this.incomeemployment = res.data.incomeemployment
          this.incomeselfemployed = res.data.incomeselfemployed
          this.incomeretired = res.data.incomeretired
          console.log(this.incomeemployment, "<==== Users incomeemployment");
          console.log(this.incomeselfemployed, "<==== Users incomeselfemployed");
          console.log(this.incomeretired, "<==== Users incomeretired");
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
    console.log('ionViewDidLoad IncomePage');
  }

  addEmployment() {
      let modal = this.modalCtrl.create(EmploymentsAddPage);
      modal.present();
  }

  addSelfEmployed() {
      let modal = this.modalCtrl.create(SelfEmployedAddPage);
      modal.present();
  }
  addRetired() {
      let modal = this.modalCtrl.create(RetiredAddPage);
      modal.present();
  }



}
