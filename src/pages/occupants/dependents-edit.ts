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
  selector: 'page-dependents-edit',
  templateUrl: 'dependents-edit.html'
})
export class DependentsEditPage {
  dependent= {};
  user = {};
  loggedUser:string = '';
  dependentID = '';

  dependentInfo = {
      fullName: '',
      age: ''

  };

  private todo : FormGroup;

      constructor(public navCtrl: NavController, public navParams: NavParams, private backand: BackandService, private alertController: AlertController, private toastCtrl: ToastController, public http: Http, public loadingCtrl: LoadingController, public actionSheetCtrl: ActionSheetController, public viewCtrl: ViewController) {

        this.dependentID = this.navParams.get('id'); // <=== GRABBING ID FROM PARAMETER BEING PASSED FROM MODAL IN PREVIOUS PAGE

        let loader = this.loadingCtrl.create({
          content: "Loading...",
          duration: 800
          });
          loader.present();
         // End of loader

         backand.user.getUserDetails(false)
        .then(res => {
          this.loggedUser = res.data.userId

          this.backand.object.getOne("dependents", this.dependentID, {
            "deep" : false })
            .then(res => {
              this.dependent = res.data
              console.log(res, "dependent data")
              this.dependentInfo.fullName = res.data.fullName
              this.dependentInfo.age = res.data.age
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
        console.log('ionViewDidLoad dependentInformationEditPage');
      }


      // Update Emergency Object!
      saveForm(id) {
        console.log("Save Method Entered")
        let options = {
          returnObject: true
        };

        let data = {
         fullName: this.dependentInfo.fullName,
         age: this.dependentInfo.age,
         user: this.loggedUser

        };

        console.log(data, "<###### OBJECT PARAMETERS");

        this.backand.object.update("dependents", id, data, options)
        .then(data => {
         alert('dependentInfo Successfully Updated');

         this.dependentInfo.fullName = this.dependentInfo.age = '';

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
