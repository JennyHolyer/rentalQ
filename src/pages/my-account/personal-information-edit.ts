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
  firstName:string = '';
  lastName:string = '';
  phoneNumber:string = '';
  gender:string = '';
  maritalStatus:string = '';
  smokingHabits:string = '';
  // dateOfBirth:datetime = 04/08/1987 16:50:10;
  loggedUser:string = '';

  private todo : FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private backand: BackandService, private alertController: AlertController, private toastCtrl: ToastController, public http: Http, public loadingCtrl: LoadingController, public actionSheetCtrl: ActionSheetController, public viewCtrl: ViewController, private formBuilder: FormBuilder) {

        this.personalInformationID = this.navParams.get('id'); // <=== GRABBING ID FROM PARAMETER BEING PASSED FROM MODAL IN PREVIOUS PAGE
        // console.log(this.personalInformationID, "ID from params")
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

        // grabbing the user to edit
          this.backand.object.getOne("users", this.personalInformationID, {
            "deep" : false })
            .then(res => {
              this.user = res.data
              console.log(this.emergency, "<==== SINGLE Users emergency OBJECT")
            })
            .catch(err => {
              console.log(err);
            }); // End of fetch emergency object

        })
        .catch(err => {
          console.log(err);
        });// End of user object fetch


        this.todo = this.formBuilder.group({
         title: ['Test', Validators.required],
         description: [''],
       });




      } // END OF CONSTRUCTOR

      ionViewDidLoad() {
        console.log('ionViewDidLoad PersonalInformationEditPage');
      }

      logForm(){
          console.log(this.todo.value, "TO DO VALUE")
        }



      // Update User Object!
      public save(id) {
          console.log(this.firstName, this.lastName, this.phoneNumber, this.maritalStatus, this.smokingHabits, "FORM DATA")
        console.log("Save Method Entered")

        let options = {
          returnObject: true
        }

        let data = {

            'firstName': this.firstName,
            'lastName': this.lastName,
            'phoneNumber': this.phoneNumber,
            'gender': this.gender,
            'maritalStatus': this.maritalStatus,
            'smokingHabits': this.smokingHabits,
            'id': this.loggedUser

        };

        console.log(data, "<###### OBJECT PARAMETERS");
        this.backand.object.update("users", id, data, options)

        .then(data => {
         alert('Personal Information Successfully Updated');
            //   this.firstName = this.lastName = this.phoneNumber = this.gender = this.maritalStatus = this.smokingHabits = '';
          this.dismiss();
        })
        .catch(error => {
         console.log(error, '<===== data from backend save handler')
        })
      } // End of save method



 dismiss() {
  this.viewCtrl.dismiss();
}


}
