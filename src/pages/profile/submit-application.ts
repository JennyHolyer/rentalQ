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
  user = {};

  streetAddress:string = '456 W Arlington Lane';
  unitNumber:string = '848';
  city:string = 'Rancho';
  state:string = 'CA';
  postCode:string = '85548';

  fullName:string = 'Linda Johnson';
  email:string = 'tim@stancebranding.com';
  phoneNumber:string = '8789874878';
  faxNumber:string = '2547898789';
  status:string = 'Approved';
  rentalCheckComplete:boolean = true;
  hasInspectedProperty = {
      true: 'true',
      false: 'false'
  }

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
    })
    .catch(err => {
      console.log(err);
    }); // End of user object fetch

  } // End of contstructor

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubmitApplicationPage');
  }


  // Submit New Application
  public submitApplication(){
    console.log(this.loggedUser, "%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
    console.log("Save Method Entered in Application Submission")
    this.backand.object.create('applicationInformation', {
     'streetAddress': this.streetAddress, 'unitNumber': this.unitNumber, 'city': this.city, 'state': this.state, 'postCode': this.postCode, 'fullName': this.fullName, 'email': this.email, 'phoneNumber': this.phoneNumber, 'faxNumber': this.faxNumber, 'rentalCheckComplete': this.rentalCheckComplete, 'status': this.status, 'user': 10})
    .then(data => {
     alert('Application Successfully Submitted');
     this.streetAddress = this.unitNumber = this.city = this.state = this.postCode = this.fullName = this.email = this.phoneNumber = this.faxNumber = '';

     this.dismiss();

    })
    .catch(error => {
     console.log(error, '<===== data from backend save handler')
    })
 } // End application submit

 dismiss() {
  this.viewCtrl.dismiss();
}



}
