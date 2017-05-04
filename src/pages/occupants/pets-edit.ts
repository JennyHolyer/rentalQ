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
  selector: 'page-pets-edit',
  templateUrl: 'pets-edit.html'
})
export class PetsEditPage {
  pet= {};
  user = {};
  loggedUser:string = '';
  petID = '';

  petInfo = {
      name: '',
      registrationNumber: ''

  };

  private todo : FormGroup;

      constructor(public navCtrl: NavController, public navParams: NavParams, private backand: BackandService, private alertController: AlertController, private toastCtrl: ToastController, public http: Http, public loadingCtrl: LoadingController, public actionSheetCtrl: ActionSheetController, public viewCtrl: ViewController) {

        this.petID = this.navParams.get('id'); // <=== GRABBING ID FROM PARAMETER BEING PASSED FROM MODAL IN PREVIOUS PAGE

        let loader = this.loadingCtrl.create({
          content: "Loading...",
          duration: 800
          });
          loader.present();
         // End of loader

         backand.user.getUserDetails(false)
        .then(res => {
          this.loggedUser = res.data.userId

          this.backand.object.getOne("pets", this.petID, {
            "deep" : false })
            .then(res => {
              this.pet = res.data
              console.log(res, "pet data")
              this.petInfo.name = res.data.name
              this.petInfo.registrationNumber = res.data.registrationNumber
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
        console.log('ionViewDidLoad petInformationEditPage');
      }


      // Update Emergency Object!
      saveForm(id) {
        console.log("Save Method Entered")
        let options = {
          returnObject: true
        };

        let data = {
         name: this.petInfo.name,
         registrationNumber: this.petInfo.registrationNumber,
         user: this.loggedUser

        };

        console.log(data, "<###### OBJECT PARAMETERS");

        this.backand.object.update("pets", id, data, options)
        .then(data => {
         alert('petInfo Successfully Updated');

         this.petInfo.name = this.petInfo.registrationNumber = '';

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
