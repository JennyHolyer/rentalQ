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
  selector: 'page-rental-history-add',
  templateUrl: 'rental-history-add.html'
})
export class RentalHistoryAddPage {

  user = {};
  streetAddress:string = '456 W Arlington Lane';
  unitNumber:string = '848';
  city:string = 'Rancho';
  state:string = 'CA';
  postCode:string = '85548';
  rentAmount = '8000';
  isCurrent:boolean = false;

  public date = {
    moveInDate: '',
    moveOutDate: ''
  }

  pmFirstName:string = 'Rudy';
  pmLastName:string = 'Jensen';
  email:string = 'tim@stancebranding.com';
  phoneNumber:string = '8789874878';
  faxNumber:string = '2547898789';
  loggedUser:string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private backand: BackandService, private alertController: AlertController, private toastCtrl: ToastController, public http: Http, public loadingCtrl: LoadingController, public actionSheetCtrl: ActionSheetController, public viewCtrl: ViewController) {

    let loader = this.loadingCtrl.create({
      content: "Loading...",
      duration: 800
      });
      loader.present();
     // End of loader

     backand.user.getUserDetails(false)
    .then(res => {
      this.loggedUser = res.data.userId

      this.backand.object.getOne("users", this.loggedUser, {
        "deep" : true })
        .then(res => {
          this.user = res.data
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
    console.log('ionViewDidLoad Rental History Add Page');
  }



  save() {
    console.log(this.loggedUser, "%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
    console.log("Save Method Entered in Renta History")
    console.log(this.date.moveInDate, "MOVE IN", this.date.moveOutDate, "<== MOVE OUT")
    this.backand.object.create('rentalHistory', {
     'streetAddress': this.streetAddress, 'unitNumber': this.unitNumber, 'city': this.city, 'state': this.state, 'postCode': this.postCode, 'moveInDate': this.date.moveInDate, 'moveOutDate': this.date.moveOutDate, 'rentAmount': this.rentAmount, 'isCurrent': this.isCurrent, 'pmFirstName': this.pmFirstName, 'pmLastName': this.pmLastName, 'email': this.email, 'phoneNumber': this.phoneNumber, 'faxNumber': this.faxNumber, 'user': this.loggedUser
    })
    .then(data => {
     alert('Rental History Successfully Added');
     this.streetAddress = this.unitNumber = this.city = this.state = this.postCode = this.date.moveInDate = this.date.moveOutDate = this.rentAmount = this.pmFirstName = this.pmLastName = this.phoneNumber = this.faxNumber = '';

     this.dismiss();

    })
    .catch(error => {
     console.log(error, '<===== data from backend save handler')
    })
 }

 dismiss() {
  this.viewCtrl.dismiss();
}


}
