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
  selector: 'page-self-employed-edit',
  templateUrl: 'self-employed-edit.html'
})
export class SelfEmployedEditPage {
  selfEmployed= {};
  user = {};
  loggedUser:string = '';
  selfEmployedID = '';

  selfEmployedInfo = {
      businessName: '',
      position: '',
      abnNumber: '',
      acnNumber: '',
      salary: '',
      startDate: ''

  };

  private todo : FormGroup;

      constructor(public navCtrl: NavController, public navParams: NavParams, private backand: BackandService, private alertController: AlertController, private toastCtrl: ToastController, public http: Http, public loadingCtrl: LoadingController, public actionSheetCtrl: ActionSheetController, public viewCtrl: ViewController) {

        this.selfEmployedID = this.navParams.get('id'); // <=== GRABBING ID FROM PARAMETER BEING PASSED FROM MODAL IN PREVIOUS PAGE

        let loader = this.loadingCtrl.create({
          content: "Loading...",
          duration: 800
          });
          loader.present();
         // End of loader

         backand.user.getUserDetails(false)
        .then(res => {
          this.loggedUser = res.data.userId

          this.backand.object.getOne("incomeSelfEmployed", this.selfEmployedID, {
            "deep" : false })
            .then(res => {
              this.selfEmployed = res.data
              console.log(res, "selfEmployed data")
              this.selfEmployedInfo.businessName = res.data.businessName
              this.selfEmployedInfo.position = res.data.position
              this.selfEmployedInfo.abnNumber = res.data.abnNumber
              this.selfEmployedInfo.acnNumber = res.data.acnNumber
              this.selfEmployedInfo.salary = res.data.salary
              this.selfEmployedInfo.startDate = res.data.startDate
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
        console.log('ionViewDidLoad SelfEmployedEditPage');
      }


      // Update Emergency Object!
      saveForm(id) {
        console.log("Save Method Entered")
        let options = {
          returnObject: true
        };

        let data = {

         businessName: this.selfEmployedInfo.businessName,
         position: this.selfEmployedInfo.position,
         abnNumber: this.selfEmployedInfo.abnNumber,
         acnNumber: this.selfEmployedInfo.acnNumber,
         salary: this.selfEmployedInfo.salary,
         startDate: this.selfEmployedInfo.startDate,
         user: this.loggedUser



        };

        console.log(data, "<###### OBJECT PARAMETERS");

        this.backand.object.update("incomeSelfEmployed", id, data, options)
        .then(data => {
         alert('selfEmployedInfo Successfully Updated');

         this.selfEmployedInfo.abnNumber = this.selfEmployedInfo.position = this.selfEmployedInfo.acnNumber = this.selfEmployedInfo.salary = this.selfEmployedInfo.businessName  = this.selfEmployedInfo.startDate =  '';

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
