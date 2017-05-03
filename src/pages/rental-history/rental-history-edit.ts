import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AlertController} from 'ionic-angular';
import {ToastController} from 'ionic-angular';
import { BackandService } from '@backand/angular2-sdk'; // Add BackandService
import { Http } from '@angular/http';
import { LoadingController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'page-rental-history-edit',
  templateUrl: 'rental-history-edit.html'
})
export class RentalHistoryEditPage {

  user = {};
  rentalHistoryID = {};
  loggedUser:string = '';
  address = {}; //see line 62, use in front-end to display data

  addressInfo = {
      streetAddress: '',
      unitNumber: '',
      city: '',
      state: '',
      postCode: '',
      rentAmount: '',
      isCurrent:'',
      moveInDate:'',
      moveOutDate:'',
      pmstreetAddress:'',
      pmunitNumber:'',
      email:'',
      faxNumber:''
};



 todo : FormGroup;

    constructor(public navCtrl: NavController, public navParams: NavParams, private backand: BackandService, private alertController: AlertController, private toastCtrl: ToastController, public http: Http, public loadingCtrl: LoadingController, public actionSheetCtrl: ActionSheetController, public viewCtrl: ViewController) {

      this.rentalHistoryID = this.navParams.get('id'); // <=== GRABBING ID FROM PARAMETER BEING PASSED FROM MODAL IN PREVIOUS PAGE

      let loader = this.loadingCtrl.create({
        content: "Loading...",
        duration: 800
        });
        loader.present();
       // End of loader

       backand.user.getUserDetails(false)
      .then(res => {
        this.loggedUser = res.data.userId

        this.backand.object.getOne("rentalHistory", this.rentalHistoryID, {
          "deep" : true })
          .then(res => {
            this.address = res.data
            console.log(res.data, "rentalHistory data")
            this.addressInfo.streetAddress = res.data.streetAddress
            this.addressInfo.unitNumber = res.data.unitNumber,
            this.addressInfo.city = res.data.city,
            this.addressInfo.state = res.data.state,
            this.addressInfo.postCode = res.data.postCode,
            this.addressInfo.rentAmount = res.data.rentAmount,
            this.addressInfo.isCurrent = res.data.isCurrent,
            this.addressInfo.moveInDate = res.data.moveInDate,
            this.addressInfo.moveOutDate = res.data.moveOutDate,
            this.addressInfo.pmstreetAddress = res.data.pmstreetAddress,
            this.addressInfo.pmunitNumber = res.data.pmunitNumber,
            this.addressInfo.email = res.data.email,
            this.addressInfo.email = res.data.faxNumber
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
      console.log('ionViewDidLoad addressInformationEditPage');
    }


    // Update Emergency Object!
    saveForm(id) {
      console.log("Save Method Entered")
      let options = {
        returnObject: true
      };

      let data = {
       streetAddress: this.addressInfo.streetAddress,
       unitNumber: this.addressInfo.unitNumber,
       city: this.addressInfo.city,
       state: this.addressInfo.state,
       postCode: this.addressInfo.postCode,
       rentAmount: this.addressInfo.rentAmount,
       isCurrent: this.addressInfo.isCurrent,
       moveInDate: this.addressInfo.moveInDate,
       moveOutDate: this.addressInfo.moveOutDate,
       pmstreetAddress: this.addressInfo.pmstreetAddress,
       pmunitNumber: this.addressInfo.pmunitNumber,
       email: this.addressInfo.email,
       faxNumber: this.addressInfo.faxNumber,
       user: this.loggedUser

      };

      console.log(data, "<###### OBJECT PARAMETERS");

      this.backand.object.update("rentalHistory", id, data, options)
      .then(data => {
       alert('addressInfo Successfully Updated');

       this.addressInfo.streetAddress = this.addressInfo.unitNumber = this.addressInfo.city = this.addressInfo.state = this.addressInfo.postCode = this.addressInfo.isCurrent = this.addressInfo.rentAmount = this.addressInfo.moveInDate = this.addressInfo.moveOutDate = this.addressInfo.pmstreetAddress  = this.addressInfo.email  = this.addressInfo.faxNumber  = '';

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
