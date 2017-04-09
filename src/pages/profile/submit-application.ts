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
  Generated class for the Emergency page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  selector: 'page-submit-application',
  templateUrl: 'submit-application.html'
})
export class SubmitApplicationPage {

  loggedUser:string = '';
  emergency = {};
  user = {};
  fullName:string = '';
  relationship:string = '';
  streetAddress:string = '';
  unitNumber:string = '';
  city:string = '';
  state:string = '';
  postCode:string = '';
  phoneNumber:string = '';

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
      console.log(res.data, "<==== 14. SUBMIT APPLICATION GET USER DETAILS");
    })
    .catch(err => {
      console.log(err);
    }); // End of user object fetch


    this.backand.object.getOne("users", this.loggedUser, {
      "deep" : true })
      .then(res => {
        this.user = res.data
        this.emergency = res.data.emergency[1]
    })
    .catch(err => {
      console.log(err);
    }); // End of user object fetch

  } // End of contstructor

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubmitApplicationPage');
  }


  save() {
    console.log("Save Method Entered")
    this.backand.object.create('emergency', {
     'fullName': this.fullName, 'relationship': this.relationship, 'streetAddress': this.streetAddress, 'unitNumber': this.unitNumber, 'city': this.city, 'state': this.state, 'postCode': this.postCode, 'phoneNumber': this.phoneNumber, 'user': 1
    })
    .then(data => {
     alert('Emergency Successfully Added');
      this.fullName = this.relationship = this.streetAddress = this.unitNumber = this.city = this.state = this.postCode = this.phoneNumber = '';
      this.dismiss();
    })
    .catch(error => {
     console.log(error, '<===== data from backend save handler')
    })
 } // End Submit Application Function

 dismiss() {
  this.viewCtrl.dismiss();
}


}
