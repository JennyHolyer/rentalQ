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


/*
  Generated class for the Emergency page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  selector: 'page-personal-information-edit',
  templateUrl: 'personal-information-edit.html'
})
export class PersonalInformationEditPage {
  personalInformationID = {};
  emergency = {};
  user = {};
  loggedUser:string = '';


  personalInfo = {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      gender: '',
      maritalStatus: '',
      smokingHabits: '',
      bio: '',
      dateOfBirth:''

  };

  private todo : FormGroup;

      constructor(public navCtrl: NavController, public navParams: NavParams, private backand: BackandService, private alertController: AlertController, private toastCtrl: ToastController, public http: Http, public loadingCtrl: LoadingController, public actionSheetCtrl: ActionSheetController, public viewCtrl: ViewController) {

        this.personalInformationID = this.navParams.get('id'); // <=== GRABBING ID FROM PARAMETER BEING PASSED FROM MODAL IN PREVIOUS PAGE

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
              console.log(res.data, "Users data")
              this.personalInfo.firstName = res.data.firstName
              this.personalInfo.lastName = res.data.lastName,
              this.personalInfo.phoneNumber = res.data.phoneNumber,
              this.personalInfo.gender = res.data.gender,
              this.personalInfo.smokingHabits = res.data.smokingHabits,
              this.personalInfo.maritalStatus = res.data.maritalStatus,
              this.personalInfo.dateOfBirth = res.data.dateOfBirth,
              this.personalInfo.bio = res.data.bio


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
        console.log('ionViewDidLoad PersonalInformationEditPage');
      }


      // Update Emergency Object!
      saveForm(id) {
        console.log("Save Method Entered")
        let options = {
          returnObject: true
        };

        let data = {
         firstName: this.personalInfo.firstName,
         lastName: this.personalInfo.lastName,
         phoneNumber : this.personalInfo.phoneNumber,
         gender: this.personalInfo.gender,
         smokingHabits: this.personalInfo.smokingHabits,
         maritalStatus: this.personalInfo.maritalStatus,
         dateOfBirth: this.personalInfo.dateOfBirth,
         bio: this.personalInfo.bio,
         user: this.loggedUser

        };

        console.log(data, "<###### OBJECT PARAMETERS");

        this.backand.object.update("users", id, data, options)
        .then(data => {
         alert('personalInfo Successfully Updated');

         this.personalInfo.firstName = this.personalInfo.lastName = this.personalInfo.phoneNumber = this.personalInfo.gender = this.personalInfo.smokingHabits = this.personalInfo.dateOfBirth = this.personalInfo.bio = this.personalInfo.maritalStatus = '';

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
