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
  selector: 'page-coapplicants-add',
  templateUrl: 'coapplicants-add.html'
})
export class CoApplicantsAddPage {

  user = {};
  loggedUser:string = '';
  age:string = '';
  firstName:string = '456 W Arlington Lane';
  lastName:string = '848';
  phoneNumber:string = 'Rancho';
  relationship:string = 'CA';
  public coapplicantsForm:any;



  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public navParams: NavParams, private backand: BackandService, private alertController: AlertController, private toastCtrl: ToastController, public http: Http, public loadingCtrl: LoadingController, public actionSheetCtrl: ActionSheetController, public viewCtrl: ViewController) {

      this.coapplicantsForm = this.formBuilder.group({
            "age": ['', Validators.required],
            "firstName": ['', Validators.required],
            "lastName": ['', Validators.required],
            "phoneNumber": ['', Validators.required],
            "relationship": ['', Validators.required]

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
    console.log('ionViewDidLoad CoApplicants Add Page');
  }

// save method
  save() {
    console.log(this.loggedUser, "%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
    console.log("Save Method Entered in CoApplicants")
    this.backand.object.create('coApplicants', {
     'age': this.coapplicantsForm.value.age, 'firstName':this.coapplicantsForm.value.firstName, 'lastName': this.coapplicantsForm.value.lastName, 'phoneNumber':this.coapplicantsForm.value.phoneNumber, 'relationship':this.coapplicantsForm.value.relationship, 'user': this.loggedUser
    })
    .then(data => {
     alert('CoApplicant Successfully Added');
     this.age = this.firstName = this.lastName = this.phoneNumber = this.relationship = this.loggedUser = '';

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
