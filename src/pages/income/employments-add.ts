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
  selector: 'page-employments-add',
  templateUrl: 'employments-add.html'
})
export class EmploymentsAddPage {

  user = {};
  loggedUser:string = '';
  companyName:string = 'Google';
  position:string = 'CEO';
  employmentType:string = 'Full-Time';
  salary:number = 500000;
  managerFullName:string = 'Jimmy Kimmel';
  phoneNumber:string = '555-777-3333';
  startDate:string = '04/29/2007';
  endDate:string = 'N/A';




  constructor(public navCtrl: NavController, public navParams: NavParams, private backand: BackandService, private alertController: AlertController, private toastCtrl: ToastController, public http: Http, public loadingCtrl: LoadingController, public actionSheetCtrl: ActionSheetController, public viewCtrl: ViewController) {

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
    console.log('ionViewDidLoad Employment Add Page');
  }

// save method
  save() {
    console.log(this.loggedUser, "%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
    console.log("Save Method Entered in Employment")
    this.backand.object.create('incomeEmployment', {
     'companyName': this.companyName, 'position':this.position,
     'employmentType': this.employmentType, 'salary': this.salary,'managerFullName': this.managerFullName, 'phoneNumber': this.phoneNumber, 'startDate': this.startDate, 'user': this.loggedUser
    })
    .then(data => {
     alert('Employment Successfully Added');
     this.companyName = this.position = this.employmentType = this.managerFullName = this.phoneNumber = this.startDate = this.loggedUser = '';

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
