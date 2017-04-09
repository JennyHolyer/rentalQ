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
  selector: 'page-emergency',
  templateUrl: 'emergency.html'
})
export class EmergencyPage {
  objectVariableToPassID; // <=== Got from the other page that has the Modal
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
  loggedUser:string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private backand: BackandService, private alertController: AlertController, private toastCtrl: ToastController, public http: Http, public loadingCtrl: LoadingController, public actionSheetCtrl: ActionSheetController, public viewCtrl: ViewController) {

    this.objectVariableToPassID = this.navParams.get('id'); // <=== GRABBING ID FROM PARAMETER BEING PASSED FROM MODAL IN PREVIOUS PAGE

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


      this.backand.object.getOne("emergency", this.objectVariableToPassID, {
        "deep" : false })
        .then(res => {
          this.emergency = res.data
          console.log(this.emergency, "<==== SINGLE Users emergency OBJECT")
        })
        .catch(err => {
          console.log(err);
        }); // End of fetch emergency object

    })
    .catch(err => {
      console.log(err);
    }); // End of user object fetch




  } // END OF CONSTRUCTOR

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmergencyPage');
  }


  // Update Emergency Object!
  save(id) {
    console.log("Save Method Entered")
    let options = {
      returnObject: true
    };

    let data = {
     fullName: this.fullName,
     relationship: this.relationship,
     streetAddress: this.streetAddress,
     unitNumber: this.unitNumber,
     city: this.city,
     state: this.state,
     postCode: this.postCode,
     phoneNumber: this.phoneNumber,
     user: this.loggedUser
    };

    console.log(data, "<###### OBJECT PARAMETERS");

    this.backand.object.update("emergency", id, data, options)
    .then(data => {
     alert('Emergency Successfully Updated');
      this.fullName = this.relationship = this.streetAddress = this.unitNumber = this.city = this.state = this.postCode = this.phoneNumber = '';
      this.dismiss();
    })
    .catch(error => {
     console.log(error, '<===== data from backend save handler')
    })
 }




  //
  //   // Emergency Edit or Delete
  //   editEmergency() {
  //   console.log("Emergency Button Clicked")
  //   let actionSheet = this.actionSheetCtrl.create({
  //     title: '',
  //     buttons: [
  //       {
  //         text: 'Delete',
  //         role: 'destructive',
  //         handler: () => {
  //           console.log('Delete');
  //         }
  //       },{
  //         text: 'Edit',
  //         handler: () => {
  //           console.log('Edit Clicked');
  //         }
  //       },{
  //         text: 'Cancel',
  //         role: 'cancel',
  //         handler: () => {
  //           console.log('Cancel clicked');
  //         }
  //       }
  //     ]
  //   });
  //   actionSheet.present();
  // }

  dismiss() {
   this.viewCtrl.dismiss();
 }

}
