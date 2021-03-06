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
  selector: 'page-retired-edit',
  templateUrl: 'retired-edit.html'
})
export class RetiredEditPage {
  retired= {};
  user = {};
  loggedUser:string = '';
  retiredID = '';

  retiredInfo = {
      pensionName: '',
      pensionNumber: ''

  };

  private todo : FormGroup;

      constructor(public navCtrl: NavController, public navParams: NavParams, private backand: BackandService, private alertController: AlertController, private toastCtrl: ToastController, public http: Http, public loadingCtrl: LoadingController, public actionSheetCtrl: ActionSheetController, public viewCtrl: ViewController) {

        this.retiredID = this.navParams.get('id'); // <=== GRABBING ID FROM PARAMETER BEING PASSED FROM MODAL IN PREVIOUS PAGE

        let loader = this.loadingCtrl.create({
          content: "Loading...",
          duration: 800
          });
          loader.present();
         // End of loader

         backand.user.getUserDetails(false)
        .then(res => {
          this.loggedUser = res.data.userId

          this.backand.object.getOne("incomeRetired", this.retiredID, {
            "deep" : false })
            .then(res => {
              this.retired = res.data
              console.log(res, "retired data")

              this.retiredInfo.pensionName = res.data.pensionName
              this.retiredInfo.pensionNumber = res.data.pensionNumber

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
        console.log('ionViewDidLoad retiredEditPage');
      }


      // Update Emergency Object!
      saveForm(id) {
        console.log("Save Method Entered")
        let options = {
          returnObject: true
        };

        let data = {

         pensionName: this.retiredInfo.pensionName,
         pensionNumber: this.retiredInfo.pensionNumber,
         user: this.loggedUser



        };

        console.log(data, "<###### OBJECT PARAMETERS");

        this.backand.object.update("incomeRetired", id, data, options)
        .then(data => {
         alert('retiredInfo Successfully Updated');

         this.retiredInfo.pensionName  = this.retiredInfo.pensionNumber =  '';

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
