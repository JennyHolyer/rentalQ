import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AlertController} from 'ionic-angular';
import {ToastController} from 'ionic-angular';
import { BackandService } from '@backand/angular2-sdk'; // Add BackandService
import { Http } from '@angular/http';
import { LoadingController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { ViewController } from 'ionic-angular';



/*
  Generated class for the RentalCheck page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-rental-check',
  templateUrl: 'rental-check.html'
})
export class RentalCheckPage {

  loggedUser:string = '';
  user = {};
  rentalHistory: any[] = [];
  pmFirstName:string = '';
  pmLastName:string = '';
  email:string = '';
  phoneNumber:string = '';
  applicantsEmail = '';
  agencyEmail = '';
  applicantID = '';
  propertyAddress = '';


  constructor(public navCtrl: NavController, public navParams: NavParams, private backand: BackandService, private alertController: AlertController, private toastCtrl: ToastController, public http: Http, public loadingCtrl: LoadingController, public actionSheetCtrl: ActionSheetController, public viewCtrl: ViewController) {

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
          this.email = res.data.email
          this.rentalHistory = res.data.rentalhistory
      })
      .catch(err => {
        console.log(err);
      }); // End of user object fetch

    })
    .catch(err => {
      console.log(err);
    }); // End of user object fetch

  }// END CONSTUCTOR

// Submit rental check reqeust
  requestRentalCheck(id) {
  this.backand.object.getOne("rentalHistory", id, {
    "deep" : true })
    .then(res => {
      this.propertyAddress = id
      this.applicantsEmail = this.email
      this.agencyEmail = res.data.email
      this.applicantID = this.loggedUser

      let options = {
        returnObject: true
      }

      let data = {
        'propertyAddress': this.propertyAddress, 'applicantsEmail': this.applicantsEmail, 'agencyEmail': this.agencyEmail, 'applicantID': this.loggedUser
      }
      this.backand.object.create('tenantCheck', data, options)
      .then(res => {
        console.log(res.data, "created object")
       alert('Rental Check Successfully Submitted');
      //  this.dismiss();

      })
      .catch(error => {
       console.log(error, '<===== data from backend save handler')
      })

  })
  .catch(err => {
    console.log(err);
  }); // End of user object fetch

} // END OF REQUEST METHOD


  ionViewDidLoad() {
    console.log('ionViewDidLoad RentalCheckPage');
  }

}
