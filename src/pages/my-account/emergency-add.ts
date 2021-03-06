import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AlertController} from 'ionic-angular';
import {ToastController} from 'ionic-angular';
import { BackandService } from '@backand/angular2-sdk'; // Add BackandService
import { Http } from '@angular/http';
import { LoadingController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/*
  Generated class for the Emergency page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  selector: 'page-emergency-add',
  templateUrl: 'emergency-add.html'
})
export class EmergencyAddPage {

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
  public emergencyForm:any;


  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public navParams: NavParams, private backand: BackandService, private alertController: AlertController, private toastCtrl: ToastController, public http: Http, public loadingCtrl: LoadingController, public actionSheetCtrl: ActionSheetController, public viewCtrl: ViewController) {

      this.emergencyForm = this.formBuilder.group({
            "fullName": ['', Validators.required],
            "relationship": ['', Validators.required],
            "streetAddress": ['', Validators.required],
            "unitNumber": ['', Validators.required],
            "city": ['', Validators.required],
            "state": ['', Validators.required],
            "postCode": ['', Validators.required],
            "phoneNumber": ['', Validators.required]
      });

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
          this.emergency = res.data.emergency[1]
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
    console.log('ionViewDidLoad EmergencyPage');
  }



  save() {
    console.log(this.loggedUser, "%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
    console.log("Save Method Entered")
    this.backand.object.create('emergency', {
     'fullName': this.emergencyForm.value.fullName, 'relationship': this.emergencyForm.value.relationship, 'streetAddress': this.emergencyForm.value.streetAddress, 'unitNumber': this.emergencyForm.value.unitNumber, 'city': this.emergencyForm.value.city, 'state': this.emergencyForm.value.state, 'postCode': this.emergencyForm.value.postCode, 'phoneNumber': this.phoneNumber, 'user': this.loggedUser
    })
    .then(data => {
     alert('Emergency Successfully Added');
      this.fullName = this.relationship = this.streetAddress = this.unitNumber = this.city = this.state = this.postCode = this.phoneNumber = '';
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
